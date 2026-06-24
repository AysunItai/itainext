import ReviewCTAButton from "./ReviewCTAButton";
import CTAEmailLink from "./CTAEmailLink";
import { getHomeCopy } from "@/lib/home-copy";
import type { Locale } from "@/lib/i18n";

export default function CTA({ locale = "en" }: { locale?: Locale }) {
  const copy = getHomeCopy(locale).cta;

  return (
    <section
      id="contact"
      aria-labelledby="cta-title"
      className="relative scroll-mt-24 px-5 py-16 sm:px-8 sm:py-28"
    >
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[28px] border border-line bg-ink p-10 text-paper sm:rounded-[32px] sm:p-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent_75%)]"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/40 blur-3xl" />
          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-accent-soft/30 blur-3xl" />
        </div>

        <div className="relative max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-paper/60">
            {copy.eyebrow}
          </p>
          <h2
            id="cta-title"
            className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            {copy.title}
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-paper/70 sm:text-lg">
            {copy.description}
          </p>

          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <ReviewCTAButton
              locale={locale}
              location="homepage_footer_cta"
              label={copy.button}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-paper px-7 py-3.5 text-sm font-medium text-ink transition-all hover:-translate-y-0.5 hover:shadow-lifted"
            />
            {locale === "en" ? <CTAEmailLink /> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
