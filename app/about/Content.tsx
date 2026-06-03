"use client";

import {
  m,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import {
  ArrowUpRight,
  Gauge,
  Layers,
  Mail,
  Wrench,
  Zap,
} from "lucide-react";
import Link from "next/link";

const easeOut = [0.22, 1, 0.36, 1] as const;

const PRINCIPLES = [
  {
    label: "Clarity",
    description:
      "Interfaces that make their job obvious — no decoration that doesn't serve the user.",
    icon: Layers,
  },
  {
    label: "Performance",
    description:
      "Fast everywhere by default, with budgets enforced from the first commit.",
    icon: Zap,
  },
  {
    label: "Usability",
    description:
      "Built to be picked up and used immediately — by everyone on the team, not just the experts.",
    icon: Gauge,
  },
  {
    label: "Maintainability",
    description:
      "Code that reads like a memo to your future self — well-typed, documented, and tested.",
    icon: Wrench,
  },
] as const;

const CAPABILITIES = [
  "Custom web development",
  "AI-assisted workflows",
  "Booking systems",
  "Dashboards",
  "Integrations",
  "Modern frontend engineering",
];

const STACK = [
  "Next.js",
  "TypeScript",
  "React",
  "Node.js",
  "PHP",
  "APIs",
  "Cloud infrastructure",
];

const RANGE = [
  "Modern business websites",
  "Client acquisition flows",
  "Automation infrastructure",
  "Custom internal platforms",
];

export default function AboutContent() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  const fade = (delay = 0) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.8, ease: easeOut, delay },
  });

  return (
    <main id="main" className="relative">
      {!reduce && (
        <m.div
          aria-hidden
          style={{ scaleX }}
          className="fixed left-0 right-0 top-0 z-[60] h-px origin-left bg-accent"
        />
      )}

      <section
        aria-labelledby="about-hero-title"
        className="relative isolate overflow-hidden px-5 pt-32 pb-20 sm:px-8 sm:pt-44 sm:pb-32"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(30,58,138,0.08),transparent_70%)]"
        />

        <div className="mx-auto flex max-w-7xl flex-col gap-12">
          <m.div
            {...fade(0)}
            className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium uppercase tracking-[0.32em] text-muted"
          >
            <span>About</span>
            <span aria-hidden className="h-px w-12 bg-line" />
            <span className="font-mono tabular-nums normal-case tracking-normal text-ink/50">
              Vol. 01 · 2026
            </span>
          </m.div>

          <m.h1
            {...fade(0.1)}
            id="about-hero-title"
            className="text-balance text-[clamp(3rem,9vw,7.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-ink"
          >
            An independent
            <br />
            software studio.
          </m.h1>

          <m.p
            {...fade(0.2)}
            className="max-w-2xl text-pretty text-lg leading-8 text-muted sm:text-xl"
          >
            Engineering depth, design restraint. Modern digital systems for
            growing businesses — built by one person who designs and ships
            them.
          </m.p>

          <m.div
            {...fade(0.3)}
            className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-muted/70"
          >
            <span>Reading time</span>
            <span className="font-mono tabular-nums text-ink/60">3 min</span>
          </m.div>
        </div>
      </section>

      <section
        aria-labelledby="studio-title"
        className="relative border-t border-line px-5 py-24 sm:px-8 sm:py-32"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-[0.5fr_1.5fr] md:gap-16">
          <m.div {...fade(0)} className="flex flex-col gap-1">
            <span className="font-mono text-xs tabular-nums text-ink/40">
              01
            </span>
            <h2
              id="studio-title"
              className="text-xs font-medium uppercase tracking-[0.25em] text-muted"
            >
              The studio
            </h2>
          </m.div>
          <m.div
            {...fade(0.1)}
            className="space-y-7 text-pretty text-lg leading-loose text-muted sm:text-xl"
          >
            <p className="first-letter:float-left first-letter:mr-3 first-letter:font-semibold first-letter:text-7xl first-letter:leading-[0.85] first-letter:text-ink">
              ITAI is an independent software studio focused on modern digital
              systems, automation, and web infrastructure for growing
              businesses.
            </p>
            <p>
              The company was founded by{" "}
              <span className="font-semibold text-ink">Aysun Itai</span>, a
              full-stack engineer with experience building both public-facing
              platforms and internal operational systems across modern web
              technologies, APIs, automation workflows, databases, and
              scalable frontend architecture.
            </p>
          </m.div>
        </div>
      </section>

      <section
        aria-labelledby="philosophy-title"
        className="relative border-t border-line px-5 py-24 sm:px-8 sm:py-32"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-[0.5fr_1.5fr] md:gap-16">
          <m.div {...fade(0)} className="flex flex-col gap-1">
            <span className="font-mono text-xs tabular-nums text-ink/40">
              02
            </span>
            <h2
              id="philosophy-title"
              className="text-xs font-medium uppercase tracking-[0.25em] text-muted"
            >
              Approach to work
            </h2>
          </m.div>
          <m.div {...fade(0.1)} className="space-y-7">
            <p className="text-pretty text-2xl font-medium leading-relaxed tracking-[-0.02em] text-ink sm:text-3xl">
              Rather than approaching projects as &ldquo;just websites,&rdquo;
              ITAI focuses on building systems that solve practical business
              problems.
            </p>
            <p className="text-pretty text-lg leading-loose text-muted sm:text-xl">
              Whether that means improving customer experience, reducing
              repetitive work, streamlining operations, or creating tools that
              help businesses scale more efficiently.
            </p>
          </m.div>
        </div>
      </section>

      <section
        aria-labelledby="capabilities-title"
        className="relative border-t border-line px-5 py-24 sm:px-8 sm:py-32"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-[0.5fr_1.5fr] md:gap-16">
          <m.div {...fade(0)} className="flex flex-col gap-1">
            <span className="font-mono text-xs tabular-nums text-ink/40">
              03
            </span>
            <h2
              id="capabilities-title"
              className="text-xs font-medium uppercase tracking-[0.25em] text-muted"
            >
              Capabilities
            </h2>
          </m.div>
          <m.div {...fade(0.1)} className="space-y-12">
            <p className="text-pretty text-lg leading-loose text-muted sm:text-xl">
              The studio works across custom web development, AI-assisted
              workflows, booking systems, dashboards, integrations, and modern
              frontend engineering — using technologies such as Next.js,
              TypeScript, React, Node.js, PHP, APIs, and cloud-based
              infrastructure.
            </p>
            <div className="space-y-5">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                Areas of work
              </p>
              <ul
                role="list"
                className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2"
              >
                {CAPABILITIES.map((c, i) => (
                  <li
                    key={c}
                    className="flex items-center gap-4 bg-paper px-5 py-4 text-base font-medium text-ink sm:text-lg"
                  >
                    <span className="font-mono text-xs tabular-nums text-ink/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                Stack
              </p>
              <ul className="flex flex-wrap gap-2">
                {STACK.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-line bg-paper-soft px-3 py-1.5 text-sm font-medium text-muted"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </m.div>
        </div>
      </section>

      <section
        aria-label="On the work"
        className="relative border-t border-line bg-paper-soft px-5 py-32 sm:px-8 sm:py-40"
      >
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 text-center">
          <m.div
            {...fade(0)}
            className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-muted"
          >
            <span aria-hidden className="h-px w-10 bg-line" />
            <span>On the work</span>
            <span aria-hidden className="h-px w-10 bg-line" />
          </m.div>
          <m.blockquote
            {...fade(0.1)}
            className="text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.035em] text-ink sm:text-5xl lg:text-6xl"
          >
            What makes the work different is the balance between{" "}
            <span className="bg-gradient-to-br from-accent via-accent-soft to-ink bg-clip-text text-transparent">
              engineering depth
            </span>{" "}
            and{" "}
            <span className="bg-gradient-to-br from-ink via-accent-soft to-accent bg-clip-text text-transparent">
              design restraint
            </span>
            .
          </m.blockquote>
        </div>
      </section>

      <section
        aria-labelledby="approach-title"
        className="relative border-t border-line px-5 py-24 sm:px-8 sm:py-32"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-[0.5fr_1.5fr] md:gap-16">
          <m.div {...fade(0)} className="flex flex-col gap-1">
            <span className="font-mono text-xs tabular-nums text-ink/40">
              04
            </span>
            <h2
              id="approach-title"
              className="text-xs font-medium uppercase tracking-[0.25em] text-muted"
            >
              Approach
            </h2>
          </m.div>
          <div className="space-y-12">
            <m.p
              {...fade(0.1)}
              className="text-pretty text-lg leading-loose text-muted sm:text-xl"
            >
              Every project is approached with a strong emphasis on clarity,
              performance, usability, and long-term maintainability. The goal
              is not to overload products with unnecessary complexity, but to
              create systems that feel modern, fast, intuitive, and
              dependable.
            </m.p>

            <m.ul
              {...fade(0.2)}
              role="list"
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              {PRINCIPLES.map((p, i) => (
                <li
                  key={p.label}
                  className="rounded-2xl border border-line bg-paper p-7 transition-colors hover:border-ink/20"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs tabular-nums text-ink/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span aria-hidden className="h-px flex-1 bg-line" />
                    <p.icon
                      className="h-4 w-4 text-ink/60"
                      strokeWidth={1.75}
                    />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold tracking-[-0.02em] text-ink">
                    {p.label}
                  </h3>
                  <p className="mt-3 text-[15px] leading-7 text-muted">
                    {p.description}
                  </p>
                </li>
              ))}
            </m.ul>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="problem-title"
        className="relative border-t border-line px-5 py-24 sm:px-8 sm:py-32"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-[0.5fr_1.5fr] md:gap-16">
          <m.div {...fade(0)} className="flex flex-col gap-1">
            <span className="font-mono text-xs tabular-nums text-ink/40">
              05
            </span>
            <h2
              id="problem-title"
              className="text-xs font-medium uppercase tracking-[0.25em] text-muted"
            >
              Why ITAI
            </h2>
          </m.div>
          <m.div
            {...fade(0.1)}
            className="space-y-7 text-pretty text-lg leading-loose text-muted sm:text-xl"
          >
            <p>
              Many businesses today operate with disconnected tools, manual
              processes, and outdated digital experiences.
            </p>
            <p>
              ITAI helps bridge that gap by designing systems that feel
              cohesive — technically solid underneath while remaining simple
              and elegant for the people using them.
            </p>
          </m.div>
        </div>
      </section>

      <section
        aria-labelledby="studio-model-title"
        className="relative border-t border-line px-5 py-24 sm:px-8 sm:py-32"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-[0.5fr_1.5fr] md:gap-16">
          <m.div {...fade(0)} className="flex flex-col gap-1">
            <span className="font-mono text-xs tabular-nums text-ink/40">
              06
            </span>
            <h2
              id="studio-model-title"
              className="text-xs font-medium uppercase tracking-[0.25em] text-muted"
            >
              Studio model
            </h2>
          </m.div>
          <div className="space-y-7">
            <m.p
              {...fade(0)}
              className="text-pretty text-2xl font-medium leading-tight tracking-[-0.025em] text-ink sm:text-4xl"
            >
              The studio intentionally remains small and focused.
            </m.p>
            <m.p
              {...fade(0.1)}
              className="text-pretty text-lg leading-loose text-muted sm:text-xl"
            >
              That allows for direct collaboration, faster execution, and a
              more thoughtful level of attention throughout the process.
              Instead of layers of management and outsourcing, clients work
              directly with the person designing and building the system.
            </m.p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="range-title"
        className="relative border-t border-line px-5 py-24 sm:px-8 sm:py-32"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-[0.5fr_1.5fr] md:gap-16">
          <m.div {...fade(0)} className="flex flex-col gap-1">
            <span className="font-mono text-xs tabular-nums text-ink/40">
              07
            </span>
            <h2
              id="range-title"
              className="text-xs font-medium uppercase tracking-[0.25em] text-muted"
            >
              The work
            </h2>
          </m.div>
          <m.div {...fade(0.1)} className="space-y-8">
            <p className="text-pretty text-lg leading-loose text-muted sm:text-xl">
              The work spans a range of industries and project types — from
              modern business websites and client acquisition flows to
              automation infrastructure and custom internal platforms.
            </p>
            <ul className="flex flex-wrap gap-2">
              {RANGE.map((r) => (
                <li
                  key={r}
                  className="rounded-full border border-line bg-paper-soft px-4 py-2 text-sm font-medium text-ink"
                >
                  {r}
                </li>
              ))}
            </ul>
          </m.div>
        </div>
      </section>

      <section
        aria-label="Closing manifesto"
        className="relative overflow-hidden bg-ink px-5 py-32 text-paper sm:px-8 sm:py-44"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent_75%)]"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:56px_56px]" />
          <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-accent-soft/20 blur-3xl" />
        </div>

        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-10 text-center">
          <m.div
            {...fade(0)}
            className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-paper/50"
          >
            <span aria-hidden className="h-px w-10 bg-paper/20" />
            <span>At its core</span>
            <span aria-hidden className="h-px w-10 bg-paper/20" />
          </m.div>

          <m.blockquote
            {...fade(0.1)}
            className="text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-6xl"
          >
            ITAI is about building digital systems with{" "}
            <span className="text-paper/60">clarity</span>,{" "}
            <span className="text-paper/60">purpose</span>, and{" "}
            <span className="text-paper/60">strong technical foundations</span>
            .
          </m.blockquote>

          <m.p
            {...fade(0.2)}
            className="text-base italic text-paper/60"
          >
            — Aysun Itai, founder
          </m.p>
        </div>
      </section>

      <section
        aria-label="Get in touch"
        className="relative px-5 py-24 sm:px-8 sm:py-32"
      >
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
          <m.h2
            {...fade(0)}
            className="text-balance text-4xl font-semibold tracking-[-0.035em] text-ink sm:text-5xl"
          >
            Have a project in mind?
          </m.h2>
          <m.p
            {...fade(0.1)}
            className="max-w-xl text-pretty text-base leading-7 text-muted sm:text-lg"
          >
            Tell me what you&apos;re building and what you&apos;d like to ship
            next.
          </m.p>
          <m.div
            {...fade(0.2)}
            className="flex flex-col items-stretch gap-3 sm:flex-row"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper shadow-soft transition-all hover:-translate-y-0.5 hover:bg-ink-soft hover:shadow-lifted"
            >
              <Mail className="h-4 w-4" strokeWidth={2} />
              Start a conversation
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
                strokeWidth={2}
              />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-paper px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-mist"
            >
              Back to home
            </Link>
          </m.div>
        </div>
      </section>
    </main>
  );
}
