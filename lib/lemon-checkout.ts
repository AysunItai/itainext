/**
 * Central lookup: product slug → hosted-checkout URL on Lemon Squeezy.
 *
 * NOT server-only — this is read from the client-side BuyButton too.
 * The URLs themselves are public (Lemon Squeezy designs them to be
 * shared), so they're safe to bake into the client bundle.
 *
 * Why an env var (NEXT_PUBLIC_*) and not a hardcoded constant:
 *   • Different stores per environment (e.g., a test store URL locally
 *     vs the live store URL in prod) can be swapped without code edits.
 *   • Keeps the URL out of git history, which makes rotating it later
 *     (broken link, store migration) a one-line .env change.
 *
 * ⚠ TEST MODE: the URL currently in env points at the Lemon Squeezy
 * TEST store. After store activation for live payments, replace
 * NEXT_PUBLIC_LEMON_SQUEEZY_SQL_EBOOK_CHECKOUT_URL in both .env (local)
 * and Vercel (Production + Preview) with the LIVE checkout URL. The
 * code does not need to change — only the env var. Remember to redeploy
 * after updating Vercel so the new value bakes into the client bundle.
 */

const URLS: Record<string, string | undefined> = {
  "sql-performance-masterclass":
    process.env.NEXT_PUBLIC_LEMON_SQUEEZY_SQL_EBOOK_CHECKOUT_URL,
};

/**
 * Returns the hosted-checkout URL for a slug, or null if the slug has
 * no mapping or the underlying env var is unset. Callers should fall
 * back to a disabled-button UI when null.
 */
export function getLemonCheckoutUrl(slug: string): string | null {
  const url = URLS[slug];
  return typeof url === "string" && url.length > 0 ? url : null;
}
