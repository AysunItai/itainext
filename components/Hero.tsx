import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import HeroAnimatedBackground from "./HeroAnimatedBackground";
import HeroPrimaryCta from "./HeroPrimaryCta";

/**
 * Hero is intentionally a server component. The previous version was a
 * client component using framer-motion, which meant the H1 (LCP element)
 * was rendered with `opacity: 0` in the SSR HTML and only became visible
 * after the framer-motion bundle loaded and hydrated. That was the single
 * biggest mobile LCP regression on this page (~4.6s).
 *
 * The new approach:
 *  - The H1 paints immediately (no entry animation) so LCP fires at FCP.
 *  - The surrounding elements use CSS keyframes (declared in
 *    `app/globals.css`) staggered via inline `animation-delay`.
 *  - The decorative background is pure CSS with a mobile-light variant.
 *  - Only the primary CTA is a small client island (for GA tracking).
 *  - `prefers-reduced-motion: reduce` is honored via the global CSS rule.
 */
export default function Hero() {
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
          ITAI WEB SOLUTIONS
        </p>

        <h1
          id="hero-title"
          className="text-balance text-[clamp(2.35rem,6.2vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-ink motion-safe:[animation:hero-fade-in_0.8s_cubic-bezier(0.22,1,0.36,1)_both]"
          style={{ animationDelay: "60ms" }}
        >
          Websites, SEO &amp; AI automation for small businesses.
        </h1>

        <p
          className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-7 text-muted sm:mt-7 sm:text-xl sm:leading-8 motion-safe:[animation:hero-fade-in_0.8s_cubic-bezier(0.22,1,0.36,1)_both]"
          style={{ animationDelay: "180ms" }}
        >
          I help small businesses turn outdated websites into fast, modern
          lead-generation systems with Google visibility, booking/contact forms,
          WhatsApp, and practical AI tools.
        </p>

        <div
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4 motion-safe:[animation:hero-fade-in_0.8s_cubic-bezier(0.22,1,0.36,1)_both]"
          style={{ animationDelay: "280ms" }}
        >
          <HeroPrimaryCta />

          <Link
            href="/services"
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full border border-line bg-paper/80 px-7 py-3.5 text-sm font-medium text-ink backdrop-blur transition-colors hover:bg-mist sm:w-auto"
          >
            See Services
          </Link>
        </div>

        <p
          className="mx-auto mt-4 max-w-md text-pretty text-[13px] leading-6 text-muted sm:mt-5 motion-safe:[animation:hero-fade-in_0.8s_cubic-bezier(0.22,1,0.36,1)_both]"
          style={{ animationDelay: "360ms" }}
        >
          Not sure where to start? Request a free review and I&apos;ll point
          you to the highest-impact fixes first.
        </p>
      </div>
    </section>
  );
}
