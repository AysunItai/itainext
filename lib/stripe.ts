import "server-only";
import Stripe from "stripe";

/**
 * Server-side Stripe client.
 *
 * Lazy singleton — instantiated on first use so importing this module in
 * a build context (e.g. type-checking) doesn't require the secret to be
 * set. Throws a clear error at call time if STRIPE_SECRET_KEY is missing.
 *
 * NEVER import this from a client component. It carries the secret key.
 */

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (_stripe) return _stripe;

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it to .env (see .env.example).",
    );
  }

  _stripe = new Stripe(key, {
    // Pin the SDK's bundled API version. Pinning means future SDK upgrades
    // won't silently change request/response shapes; you opt in by bumping
    // here after reviewing Stripe's changelog.
    apiVersion: "2026-05-27.dahlia",
    typescript: true,
    appInfo: {
      name: "itai-web-solutions",
      url: "https://www.itaiwebsolutions.com",
    },
  });

  return _stripe;
}
