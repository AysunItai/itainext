import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import HeroAnimatedBackground from "./HeroAnimatedBackground";
import HeroPrimaryCta from "./HeroPrimaryCta";
import { getHomeCopy } from "@/lib/home-copy";
import type { Locale } from "@/lib/i18n";

export default function Hero({ locale = "en" }: { locale?: Locale }) {
  const copy = getHomeCopy(locale).hero;
  const isHe = locale === "he";

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pt-20 pb-14 sm:px-8 sm:pt-24 sm:pb-20"
    >
      <HeroAnimatedBackground />

      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
        <p
          className="mb-5 text-xs font-medium uppercase tracking-[0.36em] text-muted sm:mb-7 motion-safe:[animation:hero-fade-in_0.8s_cubic-bezier(0.22,1,0.36,1)_both]"
          style={{ animationDelay: "0ms" }}
        >
          {copy.eyebrow}
        </p>

        <h1
          id="hero-title"
          className="text-balance text-[clamp(2.35rem,6.2vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-ink motion-safe:[animation:hero-fade-in_0.8s_cubic-bezier(0.22,1,0.36,1)_both]"
          style={{ animationDelay: "60ms" }}
        >
          {copy.title}
        </h1>

        <p
          className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-7 text-muted sm:mt-7 sm:text-xl sm:leading-8 motion-safe:[animation:hero-fade-in_0.8s_cubic-bezier(0.22,1,0.36,1)_both]"
          style={{ animationDelay: "180ms" }}
        >
          {copy.subtitle}
        </p>

        <div
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4 motion-safe:[animation:hero-fade-in_0.8s_cubic-bezier(0.22,1,0.36,1)_both]"
          style={{ animationDelay: "280ms" }}
        >
          {isHe ? (
            <Link
              href="/he/free-website-review"
              className="group inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper shadow-soft transition-all hover:-translate-y-0.5 hover:bg-ink-soft sm:w-auto"
            >
              {copy.primaryCta}
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-px group-hover:-translate-y-px"
              />
            </Link>
          ) : (
            <HeroPrimaryCta />
          )}

          <Link
            href={copy.secondaryHref}
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full border border-line bg-paper/80 px-7 py-3.5 text-sm font-medium text-ink backdrop-blur transition-colors hover:bg-mist sm:w-auto"
          >
            {copy.secondaryCta}
          </Link>
        </div>

        <p
          className="mx-auto mt-4 max-w-md text-pretty text-[13px] leading-6 text-muted sm:mt-5 motion-safe:[animation:hero-fade-in_0.8s_cubic-bezier(0.22,1,0.36,1)_both]"
          style={{ animationDelay: "360ms" }}
        >
          {copy.note}
        </p>
      </div>
    </section>
  );
}
