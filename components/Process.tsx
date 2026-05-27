"use client";

import { motion, useReducedMotion } from "framer-motion";

const STEPS = [
  {
    n: "01",
    title: "Discovery",
    body: "I map your goals, users, and constraints, then translate them into a focused build plan with clear milestones.",
  },
  {
    n: "02",
    title: "Design & build",
    body: "Iterative cycles in Figma and code. You see real product every week — never a slideshow, never a surprise.",
  },
  {
    n: "03",
    title: "Launch & evolve",
    body: "I ship to production behind a CDN, watch the metrics, and keep iterating once the site is live.",
  },
] as const;

export default function Process() {
  const reduce = useReducedMotion();

  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="relative scroll-mt-24 bg-ink px-5 py-24 text-paper sm:px-8 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_30%,black,transparent_75%)]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:56px_56px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-paper/60">
            How I work
          </p>
          <h2
            id="process-title"
            className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            A simple, transparent process.
          </h2>
          <p className="mt-5 text-pretty text-base leading-7 text-paper/70 sm:text-lg">
            Three phases. Weekly check-ins. No black boxes — you&apos;ll
            always know what I&apos;m building and why.
          </p>
        </header>

        <ol
          role="list"
          className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {STEPS.map((step, i) => (
            <motion.li
              key={step.n}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: reduce ? 0 : i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative overflow-hidden rounded-3xl border border-paper/10 bg-paper/[0.04] p-7 backdrop-blur-sm sm:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm tabular-nums text-paper/50">
                  {step.n}
                </span>
                <span className="h-px flex-1 bg-paper/10" aria-hidden />
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 text-[15px] leading-7 text-paper/70">
                {step.body}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
