import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getProduct } from "@/lib/products";
import { SITE_ORIGIN } from "@/lib/site-url";

/**
 * POST /api/checkout
 *
 * Creates a Stripe Checkout Session for a single digital product and
 * returns its hosted-page URL. The client redirects there.
 *
 * Request body (the ONLY thing trusted from the browser):
 *   { slug: string }
 *
 * Response:
 *   200 { url: string }                      — caller redirects to url
 *   400 { error: string }                    — bad body, free product, or unconfigured
 *   404 { error: string }                    — unknown slug
 *   502 { error: string }                    — Stripe call failed
 *
 * Trust model:
 *   • Price, currency, title, file path: read server-side from
 *     lib/products.ts. The browser cannot influence them.
 *   • A malicious caller can at worst swap one valid slug for another;
 *     they will be charged exactly what that product costs.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { slug } = body as { slug?: unknown };

  if (typeof slug !== "string" || slug.trim().length === 0) {
    return NextResponse.json(
      { error: "Missing product slug." },
      { status: 400 },
    );
  }

  const product = getProduct(slug.trim());
  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  if (product.priceCents <= 0) {
    return NextResponse.json(
      { error: "This product is free and not sold through checkout." },
      { status: 400 },
    );
  }

  if (!product.stripePriceId) {
    return NextResponse.json(
      { error: "This product is not connected to Stripe yet." },
      { status: 400 },
    );
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: product.stripePriceId, quantity: 1 }],
      // {CHECKOUT_SESSION_ID} is Stripe's literal placeholder — it's
      // substituted by Stripe at redirect time, not by us.
      success_url: `${SITE_ORIGIN}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      // Slug round-trips so the cancelled page can offer a one-click
      // retry back to the same product.
      cancel_url: `${SITE_ORIGIN}/shop/cancelled?slug=${encodeURIComponent(product.slug)}`,
      // Anonymous checkout: don't create a persistent Stripe Customer
      // unless Stripe absolutely needs one (e.g. for a saved payment
      // method, which we don't use).
      customer_creation: "if_required",
      // The webhook reads `productSlug` from metadata to know which
      // product to fulfill. We do NOT trust it from the browser — it
      // round-trips through Stripe under our own server-issued session.
      metadata: { productSlug: product.slug },
    });

    if (!session.url) {
      console.error("[checkout] Stripe returned a session with no url", {
        sessionId: session.id,
      });
      return NextResponse.json(
        { error: "Could not start checkout. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout] Stripe session creation failed", err);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 502 },
    );
  }
}
