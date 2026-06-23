import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import ConversionTracker from "./ConversionTracker";

export const metadata: Metadata = {
  title: {
    absolute: "Thank You | Free Website Review | ITAI Web Solutions",
  },
  description:
    "Thank you for requesting a free website review from ITAI Web Solutions.",
  alternates: { canonical: "/free-website-review/thank-you" },
  robots: { index: false, follow: false },
};

export default function FreeWebsiteReviewThankYouPage() {
  return (
    <main
      id="main"
      className="relative isolate flex min-h-[80vh] items-center px-5 py-24 sm:px-8 sm:py-32"
    >
      <ConversionTracker />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(30,58,138,0.08),transparent_70%)]"
      />

      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper">
          <Check aria-hidden className="h-6 w-6" strokeWidth={2.25} />
        </div>

        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.32em] text-muted">
          Request received
        </p>

        <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-5xl">
          Thank you — I received your website review request
        </h1>

        <p className="mt-6 text-pretty text-base leading-7 text-muted sm:text-lg">
          Thanks for sending your website. I&apos;ll review it and send back
          practical suggestions about what may be stopping visitors from
          contacting you, usually within one working day.
        </p>

        <p className="mt-4 text-pretty text-[15px] leading-7 text-muted">
          If you want to speak sooner, you can also book a free 15-minute
          consultation.
        </p>

        <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
          <Link
            href="/book"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-soft hover:shadow-lifted"
          >
            Book a Free Consultation
            <ArrowUpRight
              aria-hidden
              className="h-4 w-4 transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
              strokeWidth={2}
            />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-paper px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-mist"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
