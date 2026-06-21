import ReviewCTAButton from "./ReviewCTAButton";
import CTAEmailLink from "./CTAEmailLink";

/**
 * CTA is now a server component. The whole section used to hydrate as
 * a client component just for one onClick analytics call on the mailto
 * link; that work is now contained in <CTAEmailLink />, a tiny client
 * island. The framer-motion `whileInView` entry animation was dropped
 * — by the time you scroll here the animation would have completed
 * anyway, and it was contributing to the desktop TBT problem.
 */
export default function CTA() {
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
            Start here
          </p>
          <h2
            id="cta-title"
            className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            Send me your website and I&apos;ll show you what may be stopping
            visitors from becoming leads.
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-paper/70 sm:text-lg">
            A short, honest review — mobile experience, Google visibility,
            contact flows, and trust signals. Then we can talk about the right
            fix if you want help implementing it.
          </p>

          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <ReviewCTAButton
              location="homepage_footer_cta"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-paper px-7 py-3.5 text-sm font-medium text-ink transition-all hover:-translate-y-0.5 hover:shadow-lifted"
            />
            <CTAEmailLink />
          </div>
        </div>
      </div>
    </section>
  );
}
