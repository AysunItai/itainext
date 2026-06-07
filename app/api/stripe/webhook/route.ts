import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { Prisma } from "@prisma/client";
import { getStripe } from "@/lib/stripe";
import { getProduct } from "@/lib/products";
import { prisma } from "@/lib/prisma";
import { sendPurchaseReceipt } from "@/lib/email";
import { SITE_ORIGIN } from "@/lib/site-url";
import type Stripe from "stripe";

/**
 * POST /api/stripe/webhook
 *
 * Stripe-signed events. The webhook — not the /shop/success page — is the
 * source of truth for fulfillment, because:
 *   • the browser may never reach the success page (closed tab, lost net),
 *   • the browser can be replayed or faked,
 *   • Stripe retries the webhook until we 2xx it.
 *
 * For v1 we handle ONLY `checkout.session.completed`. Every other event
 * type is acknowledged with 200 so Stripe doesn't keep retrying.
 *
 * Idempotency: Stripe may deliver the same event more than once. We use
 * the unique constraint on Order.stripeSessionId as the canonical guard —
 * a duplicate delivery hits a P2002, which we treat as silent success.
 */

const DOWNLOAD_WINDOW_DAYS = 7;
const MAX_DOWNLOADS = 5;
const TOKEN_LENGTH = 40;

export async function POST(req: Request) {
  // ─── Webhook secret ─────────────────────────────────────────────────
  // Missing secret is a server-side misconfiguration. Return 500 so the
  // failure is loud in logs; Stripe will retry, giving us time to fix it.
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error(
      "[stripe-webhook] STRIPE_WEBHOOK_SECRET is not set — refusing to process events.",
    );
    return NextResponse.json(
      { error: "Webhook not configured." },
      { status: 500 },
    );
  }

  // ─── Signature header ───────────────────────────────────────────────
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header." },
      { status: 400 },
    );
  }

  // ─── Raw body ───────────────────────────────────────────────────────
  // constructEvent verifies the HMAC over the exact bytes Stripe sent.
  // We MUST NOT use req.json() here — JSON.parse + re-stringify would
  // change whitespace and invalidate the signature.
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      rawBody,
      signature,
      webhookSecret,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown";
    console.error("[stripe-webhook] Signature verification failed:", message);
    return NextResponse.json(
      { error: "Invalid signature." },
      { status: 400 },
    );
  }

  // ─── Route by event type ────────────────────────────────────────────
  if (event.type !== "checkout.session.completed") {
    // Acknowledged but unhandled. Returning 200 stops Stripe's retry loop.
    return NextResponse.json({ received: true, handled: false });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // ─── Pull what we need off the session ──────────────────────────────
  const productSlug = session.metadata?.productSlug;
  if (!productSlug) {
    // Our checkout route always sets this. A missing slug means either an
    // out-of-band session was created (someone hit the Stripe API directly)
    // or our route was changed and shipped without metadata. Either way,
    // retries won't help — log loud, ack, move on.
    console.error(
      "[stripe-webhook] checkout.session.completed without productSlug metadata",
      { sessionId: session.id },
    );
    return NextResponse.json({ received: true, handled: false });
  }

  const product = getProduct(productSlug);
  if (!product) {
    console.error(
      "[stripe-webhook] Unknown productSlug — order paid but not fulfillable",
      { sessionId: session.id, productSlug },
    );
    return NextResponse.json({ received: true, handled: false });
  }

  const email =
    session.customer_details?.email ?? session.customer_email ?? null;
  if (!email) {
    // Stripe Checkout always collects an email by default, but guard anyway.
    console.error("[stripe-webhook] No email on session", {
      sessionId: session.id,
    });
    return NextResponse.json({ received: true, handled: false });
  }

  const amountCents = session.amount_total ?? product.priceCents;
  const currency = session.currency ?? product.currency;
  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : (session.payment_intent?.id ?? null);
  const customerId =
    typeof session.customer === "string"
      ? session.customer
      : (session.customer?.id ?? null);

  // ─── Atomic create: Order + Download ────────────────────────────────
  // We try to create the Order outright. A duplicate webhook delivery
  // hits the @unique(stripeSessionId) constraint and throws P2002, which
  // we treat as "already processed, ack and move on" — crucially BEFORE
  // the email send so retries can't re-email the buyer.
  let created: { downloadToken: string; expiresAt: Date };
  try {
    created = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          productSlug: product.slug,
          productTitle: product.title,
          productType: product.productType,
          amountCents,
          currency,
          email,
          stripeSessionId: session.id,
          stripePaymentIntentId: paymentIntentId,
          stripeCustomerId: customerId,
          status: "paid",
          paidAt: new Date(),
        },
      });

      const expiresAt = new Date(
        Date.now() + DOWNLOAD_WINDOW_DAYS * 24 * 60 * 60 * 1000,
      );

      const download = await tx.download.create({
        data: {
          token: nanoid(TOKEN_LENGTH),
          orderId: order.id,
          productSlug: product.slug,
          privateFilePath: product.privateFilePath,
          expiresAt,
          maxDownloads: MAX_DOWNLOADS,
        },
      });

      return { downloadToken: download.token, expiresAt };
    });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      // Duplicate delivery — Order already exists for this session.
      // No email sent here on purpose: the first delivery already sent it.
      return NextResponse.json({ received: true, handled: true, duplicate: true });
    }
    console.error("[stripe-webhook] Failed to persist order", err);
    // Return 500 so Stripe retries — this is likely a transient DB issue.
    return NextResponse.json(
      { error: "Failed to persist order." },
      { status: 500 },
    );
  }

  // ─── Receipt email ──────────────────────────────────────────────────
  // Email send is OUTSIDE the transaction. If it fails we still ack 200
  // — the order is paid + persisted, and a retry would just hit P2002
  // and skip the email anyway. Loud log → operator re-issues the link
  // from the Download row in the DB.
  try {
    await sendPurchaseReceipt({
      to: email,
      productTitle: product.title,
      downloadUrl: `${SITE_ORIGIN}/api/download/${created.downloadToken}`,
      expiresAt: created.expiresAt,
    });
  } catch (err) {
    console.error(
      "[stripe-webhook] Receipt email failed — order is paid; support must re-issue download link",
      {
        sessionId: session.id,
        email,
        downloadToken: created.downloadToken,
        err,
      },
    );
  }

  return NextResponse.json({ received: true, handled: true });
}
