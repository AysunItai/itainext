import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MailCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Thanks for your purchase",
  description: "Your download link is on the way.",
  robots: { index: false, follow: false },
};

/**
 * Where the payment provider redirects buyers after a successful
 * hosted checkout. Purely presentational — does not provision the
 * download itself. The buyer receives their download link by email
 * (sent by the provider in the current minimal setup).
 */
export default function CheckoutSuccessPage() {
  return (
    <main
      id="main"
      className="relative isolate flex min-h-[80vh] items-center px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper">
          <MailCheck aria-hidden className="h-6 w-6" strokeWidth={2} />
        </div>

        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.32em] text-muted">
          Payment received
        </p>

        <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-5xl">
          Thanks for your purchase.
        </h1>

        <p className="mt-6 text-pretty text-base leading-7 text-muted sm:text-lg">
          Your download link will arrive by email shortly. Check your
          inbox (and the spam folder, just in case). If nothing has shown
          up after a few minutes, get in touch and I&apos;ll sort it out.
        </p>

        <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-soft hover:shadow-lifted"
          >
            Back to the library
            <ArrowUpRight aria-hidden className="h-4 w-4" strokeWidth={2} />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-paper px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-mist"
          >
            Email never arrived? Get in touch
          </Link>
        </div>
      </div>
    </main>
  );
}
