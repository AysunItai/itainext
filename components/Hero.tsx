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
 *  - The gradient shimmer on "digital systems" is also a CSS keyframe.
 *  - The decorative background is pure CSS with a mobile-light variant.
 *  - Only the booking CTA is a small client island (for GA tracking).
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
        <div
          className="mb-6 flex justify-center sm:mb-8 motion-safe:[animation:hero-fade-in_0.8s_cubic-bezier(0.22,1,0.36,1)_both]"
          style={{ animationDelay: "0ms" }}
        >
          <Link
            href="/shop/sql-performance-masterclass"
            aria-label="SQL Performance Masterclass — shop"
            className="group inline-flex max-w-full items-center gap-2.5 rounded-full border border-line bg-paper/70 px-3.5 py-1.5 text-[12px] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/25 hover:bg-paper hover:shadow-soft focus-visible:outline-none"
          >
            <span aria-hidden className="relative flex h-2 w-2 flex-none">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent/70 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="font-mono uppercase tracking-[0.2em] text-ink/55">
              Vol. 01
            </span>
            <span aria-hidden className="h-3 w-px flex-none bg-line" />
            <span className="truncate text-ink/85">
              <span className="sm:hidden">SQL Performance ebook</span>
              <span className="hidden sm:inline">
                The SQL Performance ebook
              </span>
            </span>
            <ArrowUpRight
              aria-hidden
              className="h-3.5 w-3.5 flex-none text-ink/50 transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
              strokeWidth={2}
            />
          </Link>
        </div>

        <p
          className="mb-5 text-xs font-medium uppercase tracking-[0.36em] text-muted sm:mb-7 motion-safe:[animation:hero-fade-in_0.8s_cubic-bezier(0.22,1,0.36,1)_both]"
          style={{ animationDelay: "60ms" }}
        >
          ITAI WEB SOLUTIONS
        </p>

        {/* H1 has NO entry animation: it must paint with FCP so LCP
            matches FCP. The gradient shimmer on the inner span is a
            separate, continuous CSS animation (no impact on first paint). */}
        <h1
          id="hero-title"
          className="text-balance text-[clamp(3rem,7.4vw,6.4rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-ink"
        >
          Engineering modern{" "}
          <span className="relative inline-block whitespace-nowrap">
            {/* Was previously animated `infinite` with a moving
              `background-position`. That kept the page repainting on
              the main thread every frame (PSI flagged the only
              non-composited animation on the page). Switched to a
              static gradient — visually almost identical, zero
              ongoing main-thread cost. */}
            <span className="bg-[linear-gradient(110deg,#0a0a0a_0%,#1e40af_35%,#2563eb_55%,#0f172a_75%,#0a0a0a_100%)] bg-clip-text text-transparent">
              digital systems
            </span>
          </span>
          .
        </h1>

        <p
          className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-7 text-muted sm:mt-7 sm:text-xl sm:leading-8 motion-safe:[animation:hero-fade-in_0.8s_cubic-bezier(0.22,1,0.36,1)_both]"
          style={{ animationDelay: "220ms" }}
        >
          Custom websites, booking systems, WhatsApp contact, SEO-ready pages,
          dashboards, and practical AI automation for small businesses and
          founders.
        </p>

        <div
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4 motion-safe:[animation:hero-fade-in_0.8s_cubic-bezier(0.22,1,0.36,1)_both]"
          style={{ animationDelay: "320ms" }}
        >
          <HeroPrimaryCta />

          <Link
            href="#work"
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full border border-line bg-paper/80 px-7 py-3.5 text-sm font-medium text-ink backdrop-blur transition-colors hover:bg-mist sm:w-auto"
          >
            View work
          </Link>
        </div>

        <p
          className="mx-auto mt-4 max-w-md text-pretty text-[13px] leading-6 text-muted sm:mt-5 motion-safe:[animation:hero-fade-in_0.8s_cubic-bezier(0.22,1,0.36,1)_both]"
          style={{ animationDelay: "400ms" }}
        >
          Not sure what you need? Book a free 15-minute call and we&apos;ll
          figure it out together.
        </p>

        {/* Tech badges are aspirational/decorative. Hide them on small
            phones so the hero stays focused on the CTA. */}
        <div
          className="mt-10 hidden flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.2em] text-muted sm:mt-12 sm:flex motion-safe:[animation:hero-fade-in_0.8s_cubic-bezier(0.22,1,0.36,1)_both]"
          style={{ animationDelay: "500ms" }}
        >
          <span>Next.js</span>
          <span className="h-1 w-1 rounded-full bg-line" />
          <span>TypeScript</span>
          <span className="h-1 w-1 rounded-full bg-line" />
          <span>AI Workflows</span>
          <span className="h-1 w-1 rounded-full bg-line" />
          <span>Edge Infra</span>
        </div>
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
