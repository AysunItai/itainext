import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  EMAIL_RE,
  newToken,
  normalizeEmail,
  normalizeSource,
} from "@/lib/subscribers";
import { sendConfirmationEmail, SITE_URL } from "@/lib/email";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — silently succeed for bots
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const rawEmail = typeof body.email === "string" ? body.email : "";
  const email = normalizeEmail(rawEmail);
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  // First-touch attribution: store the source on first sign-up and on
  // re-engagement of dead rows — but never overwrite a source that's
  // already set. This keeps the acquisition channel honest.
  const source = normalizeSource(body.source);

  // Always respond identically whether or not the address already exists,
  // so the form can't be used to enumerate subscribers.
  // Behavior:
  //   - new email → create + send confirmation
  //   - existing unconfirmed → rotate confirmToken + resend confirmation
  //   - existing confirmed → no-op (user thinks they re-subscribed; that's fine)
  //   - previously unsubscribed → restore as unconfirmed + send confirmation

  try {
    const existing = await prisma.subscriber.findUnique({ where: { email } });

    if (!existing) {
      const sub = await prisma.subscriber.create({
        data: {
          email,
          confirmToken: newToken(),
          unsubToken: newToken(),
          source,
        },
      });
      await trySendConfirmation(sub.email, sub.confirmToken);
    } else if (existing.unsubscribedAt) {
      const updated = await prisma.subscriber.update({
        where: { id: existing.id },
        data: {
          confirmed: false,
          confirmedAt: null,
          unsubscribedAt: null,
          confirmToken: newToken(),
          unsubToken: newToken(),
          // Only backfill source if we never captured one originally.
          ...(existing.source ? {} : { source }),
        },
      });
      await trySendConfirmation(updated.email, updated.confirmToken);
    } else if (!existing.confirmed) {
      const updated = await prisma.subscriber.update({
        where: { id: existing.id },
        data: {
          confirmToken: newToken(),
          ...(existing.source ? {} : { source }),
        },
      });
      await trySendConfirmation(updated.email, updated.confirmToken);
    }
    // else: confirmed → silent no-op

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[subscribe] error", err);
    return NextResponse.json(
      { error: "Something went wrong. Try again in a moment." },
      { status: 500 },
    );
  }
}

async function trySendConfirmation(email: string, confirmToken: string) {
  const confirmUrl = `${SITE_URL}/api/subscribe/confirm?token=${encodeURIComponent(confirmToken)}`;
  try {
    await sendConfirmationEmail({ to: email, confirmUrl });
  } catch (err) {
    // Don't fail the whole request if email service is down — the row is
    // already in the DB with a token. The user gets a generic success and
    // we log the issue. They can re-submit to trigger another send.
    console.error("[subscribe] confirmation email failed", err);
  }
}
