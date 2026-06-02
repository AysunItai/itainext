/**
 * Canonical production origin for the marketing site.
 *
 * Hardcoded on purpose. This is the URL Google indexes, and the value
 * `metadataBase` resolves relative canonical paths against. A stray env
 * var (or a missing one) silently shifting canonicals to a different
 * host is exactly what produced the "Non-Indexable Canonical" warnings
 * we just had to clean up.
 *
 * If you ever need a different host for preview deploys, override the
 * sitemap/structured-data origin via `NEXT_PUBLIC_SITE_URL` — but the
 * canonical metadata always stays on the line below.
 */
export const SITE_URL = "https://www.itaiwebsolutions.com" as const;

/**
 * Origin used for absolute URLs that aren't canonical declarations —
 * sitemap entries, JSON-LD `@id`s, transactional email links, share URLs.
 *
 * Falls back to the canonical host so production is always consistent,
 * but allows `NEXT_PUBLIC_SITE_URL` to override for local dev / previews
 * (where the share-bar wants `localhost:3000`, for example).
 */
export const SITE_ORIGIN: string =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || SITE_URL;
