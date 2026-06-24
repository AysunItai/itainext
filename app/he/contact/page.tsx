import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { buildAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: {
    absolute: "יצירת קשר | ITAI Web Solutions",
  },
  description:
    "צרי קשר עם ITAI Web Solutions לבניית אתר, שדרוג אתר, SEO, טפסים, הזמנות ואוטומציות AI.",
  alternates: buildAlternates("he", "contact"),
  openGraph: {
    title: "יצירת קשר · ITAI",
    description:
      "צרי קשר לבניית אתר, שדרוג, SEO, טפסים ואוטומציות AI.",
    url: "/he/contact",
    type: "website",
    locale: "he_IL",
  },
};

const BUSINESS_EMAIL = "info@itaiwebsolutions.com";

export default function HebrewContactPage() {
  return (
    <main id="main" className="relative">
      <section
        aria-labelledby="he-contact-hero"
        className="relative isolate overflow-hidden px-5 pt-32 pb-16 sm:px-8 sm:pt-44 sm:pb-20"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(30,58,138,0.08),transparent_70%)]"
        />

        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
            יצירת קשר
          </p>
          <h1
            id="he-contact-hero"
            className="mt-5 text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
          >
            בואי נדבר על האתר שלך
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
            אם את רוצה לבנות אתר, לשדרג אתר קיים, לשפר נראות בגוגל או להוסיף
            טפסים ואוטומציות — שלחי לי הודעה.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-xl px-5 pb-24 sm:px-8">
        <div className="rounded-3xl border border-line bg-paper-soft p-8 sm:p-10">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mist text-ink">
              <Mail className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </span>
            <div className="text-right">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                אימייל
              </p>
              <a
                href={`mailto:${BUSINESS_EMAIL}`}
                className="mt-1 block text-base font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
                dir="ltr"
              >
                {BUSINESS_EMAIL}
              </a>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3">
            <Link
              href="/book"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper shadow-soft transition-all hover:-translate-y-0.5 hover:bg-ink-soft"
            >
              קביעת שיחת היכרות
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-px group-hover:-translate-y-px"
              />
            </Link>
            <Link
              href="/he/free-website-review"
              className="inline-flex items-center justify-center rounded-full border border-line bg-paper px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-mist"
            >
              בדיקת אתר בחינם
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
