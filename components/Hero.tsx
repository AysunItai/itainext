import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
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
      <AnimatedBackground />

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

/**
 * Pure-CSS animated background.
 *
 * Why: the previous version used 6 simultaneous framer-motion infinite
 * animations, which (1) contributed to the initial JS bundle and (2)
 * raised CPU usage on mobile (hurts Speed Index). CSS keyframes are
 * cheaper and need no JS to start.
 *
 * Mobile-light: the two horizontal streaks and the 3D-tilted ring are
 * hidden on phones (`hidden sm:block`) so the most expensive moving
 * elements never run on small screens.
 */
function AnimatedBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_50%,rgba(30,58,138,0.1),transparent_68%)]" />

      <div className="absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(to_right,rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle,black,transparent_68%)]" />

      {/* Outer ring — slow rotation, kept on all viewports (cheap). */}
      <div
        className="absolute left-1/2 top-1/2 h-[680px] w-[680px] rounded-full border border-ink/[0.045] motion-safe:[animation:hero-spin-slow_80s_linear_infinite]"
        style={{ transform: "translate(-50%, -50%)" }}
      />

      {/* Inner accent ring — slow reverse rotation, kept on all viewports. */}
      <div
        className="absolute left-1/2 top-1/2 h-[460px] w-[460px] rounded-full border border-accent/10 motion-safe:[animation:hero-spin-reverse_110s_linear_infinite]"
        style={{ transform: "translate(-50%, -50%)" }}
      />

      {/* 3D-tilted ring — desktop only. The 3D transform is the most
          GPU-intensive piece, so we hide it on phones. */}
      <div
        className="absolute left-1/2 top-1/2 hidden h-[560px] w-[560px] rounded-[42%] border border-accent/15 sm:block motion-safe:[animation:hero-spin-reverse_44s_linear_infinite]"
        style={{
          transform: "translate(-50%, -50%) rotateX(64deg)",
          transformStyle: "preserve-3d",
        }}
      />

      {/* Pulsing glow — cheap, kept everywhere. */}
      <div
        className="absolute left-1/2 top-1/2 h-[280px] w-[460px] rounded-full bg-accent blur-3xl motion-safe:[animation:hero-pulse_8s_ease-in-out_infinite]"
        style={{ transform: "translate(-50%, -50%)", opacity: 0.18 }}
      />

      {/* Horizontal streak lines — desktop only. Sliding wide elements
          can be expensive to repaint on phones; the design still reads
          fine without them. */}
      <div className="absolute left-0 top-1/2 hidden h-px w-96 -translate-y-1/2 bg-gradient-to-r from-transparent via-accent/55 to-transparent sm:block motion-safe:[animation:hero-streak-right_9s_ease-in-out_infinite]" />

      <div className="absolute left-0 top-[54%] hidden h-px w-80 bg-gradient-to-r from-transparent via-ink/25 to-transparent sm:block motion-safe:[animation:hero-streak-left_12s_ease-in-out_infinite]" />

      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-paper" />
    </div>
  );
}
