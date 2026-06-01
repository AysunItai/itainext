"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();

  const fade = (delay = 0) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: easeOut, delay },
  });

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pt-24 pb-20 sm:px-8"
    >
      <AnimatedBackground reduce={!!reduce} />

      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
        <motion.div {...fade(0)} className="mb-8 flex justify-center">
          <Link
            href="/shop/sql-performance-masterclass"
            aria-label="Free this season — SQL Performance Masterclass"
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
              <span className="sm:hidden">A free SQL ebook</span>
              <span className="hidden sm:inline">
                A free SQL Performance ebook
              </span>
            </span>
            <ArrowUpRight
              aria-hidden
              className="h-3.5 w-3.5 flex-none text-ink/50 transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
              strokeWidth={2}
            />
          </Link>
        </motion.div>

        <motion.p
          {...fade(0.06)}
          className="mb-7 text-xs font-medium uppercase tracking-[0.36em] text-muted"
        >
          ITAI WEB SOLUTIONS
        </motion.p>

        <motion.h1
          {...fade(0.12)}
          id="hero-title"
          className="text-balance text-[clamp(3rem,7.4vw,6.4rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-ink"
        >
          Engineering modern{" "}
          <span className="relative inline-block whitespace-nowrap">
            <motion.span
              animate={
                reduce
                  ? {}
                  : {
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }
              }
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="bg-[linear-gradient(110deg,#0a0a0a,#1e40af,#0f172a,#2563eb,#0a0a0a)] bg-[length:240%_240%] bg-clip-text text-transparent"
            >
              digital systems
            </motion.span>
          </span>
          .
        </motion.h1>

        <motion.p
          {...fade(0.22)}
          className="mx-auto mt-7 max-w-2xl text-pretty text-lg leading-8 text-muted sm:text-xl"
        >
          Custom websites, AI automation, booking systems, dashboards, and
          scalable web infrastructure for growing businesses.
        </motion.p>

        <motion.div
          {...fade(0.32)}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <Link
            href="/contact"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-soft hover:shadow-lifted sm:w-auto"
          >
            Start a project
            <ArrowUpRight
              aria-hidden
              className="h-4 w-4 transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
            />
          </Link>

          <Link
            href="#work"
            className="inline-flex w-full items-center justify-center rounded-full border border-line bg-paper/80 px-7 py-3.5 text-sm font-medium text-ink backdrop-blur transition-colors hover:bg-mist sm:w-auto"
          >
            View work
          </Link>
        </motion.div>

        <motion.div
          {...fade(0.48)}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.2em] text-muted"
        >
          <span>Next.js</span>
          <span className="h-1 w-1 rounded-full bg-line" />
          <span>TypeScript</span>
          <span className="h-1 w-1 rounded-full bg-line" />
          <span>AI Workflows</span>
          <span className="h-1 w-1 rounded-full bg-line" />
          <span>Edge Infra</span>
        </motion.div>
      </div>
    </section>
  );
}

function AnimatedBackground({ reduce }: { reduce: boolean }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_50%,rgba(30,58,138,0.1),transparent_68%)]" />

      <div className="absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(to_right,rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle,black,transparent_68%)]" />

      {!reduce && (
        <>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 top-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/[0.045]"
          />

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 110, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/10"
          />

          <motion.div
            animate={{ rotateX: [62, 68, 62], rotateZ: [0, 360] }}
            transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-[42%] border border-accent/15"
            style={{ transformStyle: "preserve-3d" }}
          />

          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.18, 0.34, 0.18],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-1/2 h-[280px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent blur-3xl"
          />

          <motion.div
            animate={{ x: ["-30%", "130%"], opacity: [0, 0.8, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 top-1/2 h-px w-96 -translate-y-1/2 bg-gradient-to-r from-transparent via-accent/55 to-transparent"
          />

          <motion.div
            animate={{ x: ["130%", "-30%"], opacity: [0, 0.45, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 top-[54%] h-px w-80 bg-gradient-to-r from-transparent via-ink/25 to-transparent"
          />
        </>
      )}

      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-paper" />
    </div>
  );
}