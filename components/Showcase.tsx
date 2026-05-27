"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Gauge, ShieldCheck, Timer, Zap } from "lucide-react";

const STATS = [
  { value: "99", suffix: "+", label: "Lighthouse score, average" },
  { value: "<1.2", suffix: "s", label: "Median LCP across builds" },
  { value: "30", suffix: "%", label: "Faster ops, post-automation" },
  { value: "100", suffix: "%", label: "Type-safe codebases" },
] as const;

const PILLARS = [
  {
    icon: Zap,
    title: "Built for speed",
    body: "Edge rendering, image and font optimization, and zero hydration waste by default.",
  },
  {
    icon: ShieldCheck,
    title: "Quietly secure",
    body: "Modern auth, tight CSP, and validated inputs end-to-end — security as a posture, not a panic.",
  },
  {
    icon: Gauge,
    title: "Observable",
    body: "Logs, metrics, and Web Vitals wired in from day one so you always know how the system feels.",
  },
  {
    icon: Timer,
    title: "Maintainable",
    body: "Code that reads like a memo to your future self — well-typed, well-tested, well-documented.",
  },
] as const;

export default function Showcase() {
  const reduce = useReducedMotion();

  return (
    <section
      id="principles"
      aria-labelledby="showcase-title"
      className="relative scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted">
            Engineering principles
          </p>
          <h2
            id="showcase-title"
            className="mt-4 text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
          >
            Premium feel, infrastructure underneath.
          </h2>
          <p className="mt-5 text-pretty text-base leading-7 text-muted sm:text-lg">
            Every project I ship is judged against the same bar — the kind of
            polish you&apos;d expect from a flagship product team.
          </p>
        </header>

        <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.55,
                delay: reduce ? 0 : i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-paper px-6 py-8 text-center sm:px-8 sm:py-10"
            >
              <dt className="order-2 mt-2 text-xs uppercase tracking-[0.18em] text-muted">
                {s.label}
              </dt>
              <dd className="order-1 font-semibold tracking-tight text-ink">
                <span className="text-4xl sm:text-5xl">{s.value}</span>
                <span className="text-2xl text-accent sm:text-3xl">
                  {s.suffix}
                </span>
              </dd>
            </motion.div>
          ))}
        </dl>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {PILLARS.map((p, i) => (
            <motion.article
              key={p.title}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.55,
                delay: reduce ? 0 : i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="rounded-3xl border border-line bg-paper-soft p-7 sm:p-8"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-paper text-ink shadow-soft">
                  <p.icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-ink">
                  {p.title}
                </h3>
              </div>
              <p className="mt-5 text-[15px] leading-7 text-muted">{p.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
