import type { Metadata } from "next";
import Link from "next/link";

/**
 * Custom 404. Without this file, Next falls back to a built-in default that
 * has no <h1>, no canonical, no nav, and ships as a generic page —
 * exactly what Screaming Frog reported as "H1: Missing" and
 * "Canonicals: Missing". A real 404 page should:
 *
 *  1. Render a proper <h1> so accessibility tools / SEO crawlers can parse it.
 *  2. Return 404 (Next handles this automatically for any file named
 *     `not-found.tsx`).
 *  3. Be `noindex` — it's not a real page, Google shouldn't index it.
 *  4. NOT declare a canonical. A 404 shouldn't claim to be a canonical
 *     version of anything; SF skips canonical checks on noindex pages,
 *     which removes both warnings.
 *  5. Help the visitor recover — link to the main entry points.
 */

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The page you tried to open doesn't exist. Head back home or pick a section below.",
  robots: { index: false, follow: false },
};

const RESCUE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/blog", label: "Notes" },
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
