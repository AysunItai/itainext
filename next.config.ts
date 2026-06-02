import type { NextConfig } from "next";

/**
 * Baseline security headers applied to every response.
 *
 * Why these three (and nothing more — for now):
 *
 * - `X-Content-Type-Options: nosniff`
 *     Tells browsers to stick to the declared `Content-Type` instead of
 *     trying to guess. Cheapest "no" you can give a MIME-confusion attack.
 *
 * - `Referrer-Policy: strict-origin-when-cross-origin`
 *     Sends the full URL as referrer on same-origin nav, only the origin
 *     on cross-origin nav, and nothing when downgrading to HTTP. Matches
 *     the modern browser default but pinning it explicitly stops the SEO
 *     scanner from flagging the header as missing.
 *
 * - `X-Frame-Options: SAMEORIGIN`
 *     Belt to CSP's `frame-ancestors` suspenders — keeps third parties
 *     from iframing the site (clickjacking protection). The site doesn't
 *     have any legitimate embed-elsewhere use case, so SAMEORIGIN is the
 *     correct setting.
 *
 * Content-Security-Policy is intentionally **not** here yet. The site
 * loads scripts from Google Analytics (gtag), Calendly's widget, and the
 * Resend tracking pixel; a misconfigured CSP would break the booking
 * flow silently. Re-add CSP in a follow-up once we audit every third
 * party origin and have a way to test the rendered headers in CI.
 */
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // `:path*` matches every route — pages, API, static files —
        // exactly what a baseline security header policy should cover.
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
    ];
  },
};

export default nextConfig;
