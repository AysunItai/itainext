import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Checkout cancelled",
  description: "No charge was made.",
  robots: { index: false, follow: false },
};

/**
 * Where the payment provider can return buyers who back out of the
 * hosted checkout. Not actively used by the current Lemon Squeezy
 * direct-link flow (Lemon Squeezy doesn't fire a cancel redirect), but
 * kept around as a useful landing target for support links.
 *
 * Accepts a `?slug=` query so the "Try again" CTA can drop the buyer
 * straight back onto the same product page. If slug is missing, we send
 * them back to the catalog.
 */
export default async function CheckoutCancelledPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
  const { slug } = await searchParams;
  // Defensive: the slug came back through a query param, so treat it as
  // untrusted display data. A simple slug shape (letters, digits,
  // dash) — anything else, send the buyer to the catalog.
  const safeSlug =
    typeof slug === "string" && /^[a-z0-9-]{1,80}$/.test(slug) ? slug : null;
  const productHref = safeSlug ? `/shop/${safeSlug}` : "/shop";
  const productLabel = safeSlug ? "Return to the product" : "Browse the library";

  return (
    <main
      id="main"
      className="relative isolate flex min-h-[80vh] items-center px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-muted">
          Checkout cancelled
        </p>

        <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-5xl">
          No charge was made.
        </h1>

        <p className="mt-6 text-pretty text-base leading-7 text-muted sm:text-lg">
          You stepped away from the payment page, so nothing was billed.
          Want to give it another shot?
        </p>

        <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
          <Link
            href={productHref}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-soft hover:shadow-lifted"
          >
            <ChevronLeft aria-hidden className="h-4 w-4" strokeWidth={2} />
            {productLabel}
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-paper px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-mist"
          >
            Browse the library
            <ArrowUpRight aria-hidden className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </main>
  );
}
