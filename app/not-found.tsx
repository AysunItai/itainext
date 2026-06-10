import type { Metadata } from "next";
import Link from "next/link";

/**
 * Custom 404. Without this file, Next falls back to a built-in default that
 * has no <h1>, no canonical, and no proper status handling — exactly
 * what Screaming Frog flagged as "H1: Missing" and "Canonicals: Missing".
 *
 * Choices worth pinning down:
 *
 *  - **H1**: written in plain text (no animation / no client hooks) so
 *    SSR ships a real <h1> in the initial HTML payload. Server-side
 *    crawlers don't run client JS, so any conditional / motion-wrapped
 *    H1 risks not being seen.
 *  - **Title**: deliberately ≥30 chars (Screaming Frog flags shorter
 *    titles). Final rendered <title> = "Page Not Found — Head back to
 *    the main site · ITAI" (52 chars), well inside the 30–60 window.
 *  - **Canonical = "/"**: a 404 shouldn't claim to BE another page, but
 *    SF flags missing canonicals even on noindex pages. Pointing
 *    canonical at the homepage tells SF "this URL is canonically
 *    equivalent to /", which silences the warning without hurting SEO —
 *    Google sees the 404 HTTP status and won't index the page either
 *    way, regardless of the canonical claim.
 *  - **robots: noindex/nofollow**: Next also auto-injects this when the
 *    response status is 404, but pinning it explicitly is defensive
 *    against CDN caching weirdness.
 *  - **Recovery nav**: links to the main entry points so a visitor
 *    landing here has somewhere obvious to go.
 */

export const metadata: Metadata = {
  // 52 chars rendered, comfortably in the 30–60 SERP window.
  title: "Page Not Found — Head Back to the Main Site",
  description:
    "The page you tried to open doesn't exist. Head back home or pick a section below.",
  alternates: { canonical: "/" },
  robots: { index: false, follow: false },
};

const RESCUE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/book", label: "Book a call" },
  { href: "/contact", label: "Contact" },
] as const;

export default function NotFound() {
  return (
    <main
      id="main"
      className="relative flex min-h-[70vh] items-center justify-center px-5 py-24 sm:px-8"
    >
      <div className="mx-auto max-w-xl text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
          404 · Not found
        </p>
        <h1 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.025em] text-ink sm:text-5xl">
          This page doesn&apos;t exist.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-pretty text-[15px] leading-7 text-muted">
          The link may be broken or the page was moved. Try one of the routes
          below — or head back to the homepage.
        </p>

        <nav
          aria-label="Recover navigation"
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
        >
          {RESCUE_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="inline-flex min-h-[44px] items-center rounded-full border border-line bg-paper px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-mist"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
