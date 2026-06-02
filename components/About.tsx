"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Code2, Globe, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const META = [
  { label: "Studio", value: "ITAI Web Solutions", icon: Globe },
  { label: "Specialty", value: "AI · Dashboards · Booking", icon: Sparkles },
  { label: "Stack", value: "Next.js · TypeScript", icon: Code2 },
];

export default function About() {
  const reduce = useReducedMotion();
  const [imageOk, setImageOk] = useState(true);

  const fade = (delay = 0) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.7, ease: easeOut, delay },
  });

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative scroll-mt-24 px-5 py-16 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <motion.p
              {...fade(0)}
              className="text-xs font-medium uppercase tracking-[0.32em] text-muted"
            >
              About
            </motion.p>

            <motion.h2
              {...fade(0.05)}
              id="about-title"
              className="mt-5 text-balance text-4xl font-semibold tracking-[-0.035em] text-ink sm:text-5xl"
            >
              Building practical digital solutions
              <br className="hidden sm:block" />
              for modern businesses.
            </motion.h2>

            <motion.div
              {...fade(0.15)}
              className="mt-10 max-w-xl space-y-5 text-pretty text-base leading-7 text-muted sm:text-lg"
            >
              <p>
                Hi, I&apos;m{" "}
                <span className="font-semibold text-ink">Aysun Itai</span> — a
                full-stack developer and founder of ITAI Web Solutions.
              </p>
              <p>
                I started this studio to help small businesses and entrepreneurs
                ship professional websites and digital systems — without paying
                agency overhead for it.
              </p>
              <p>
                I believe technology should help businesses grow, save time, and
                communicate better with customers — never create unnecessary
                complexity.
              </p>
            </motion.div>

            <motion.dl
              {...fade(0.25)}
              className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4"
            >
              {META.map((m) => (
                <div
                  key={m.label}
                  className="rounded-2xl border border-line bg-paper-soft px-4 py-3.5 transition-colors hover:border-ink/20"
                >
                  <dt className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
                    <m.icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                    {m.label}
                  </dt>
                  <dd className="mt-1.5 text-sm font-semibold text-ink">
                    {m.value}
                  </dd>
                </div>
              ))}
            </motion.dl>

            <motion.div
              {...fade(0.35)}
              className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
            >
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper shadow-soft transition-all hover:-translate-y-0.5 hover:bg-ink-soft hover:shadow-lifted"
              >
                Read my full story
                <ArrowUpRight
                  aria-hidden
                  className="h-4 w-4 transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
                  strokeWidth={2}
                />
              </Link>
              <span className="text-base italic text-muted">— Aysun</span>
            </motion.div>
          </div>

          <motion.div
            {...fade(0.1)}
            className="relative lg:col-span-5"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-8 -z-10 bg-[radial-gradient(circle_at_60%_40%,rgba(30,58,138,0.18),transparent_60%)] blur-2xl"
              />

              <div className="group relative aspect-[4/5] overflow-hidden rounded-[28px] border border-line bg-mist shadow-soft">
                {imageOk ? (
                  <Image
                    src="/about-portrait.jpg"
                    alt="Portrait of Aysun Itai"
                    fill
                    sizes="(min-width: 1024px) 512px, (min-width: 640px) 448px, 100vw"
                    quality={80}
                    onError={() => setImageOk(false)}
                    className="object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.04]"
                  />
                ) : (
                  <PortraitPlaceholder />
                )}

                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink/15 via-transparent to-transparent transition-opacity duration-500 group-hover:opacity-0"
                />
              </div>

              <div className="absolute -bottom-5 -left-4 rounded-2xl border border-line bg-paper px-4 py-3 shadow-lifted sm:-bottom-6 sm:-left-6">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="relative flex h-2 w-2 items-center justify-center"
                  >
                    {!reduce && (
                      <motion.span
                        aria-hidden
                        animate={{ scale: [1, 2.4, 2.4], opacity: [0.5, 0, 0] }}
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                        className="absolute inset-0 rounded-full bg-emerald-500"
                      />
                    )}
                    <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
                      Status
                    </p>
                    <p className="text-sm font-semibold text-ink">
                      Available for work
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PortraitPlaceholder() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-blue-50 to-paper transition-transform duration-[700ms] ease-out group-hover:scale-[1.04]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(30,58,138,0.22),transparent_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(circle,black,transparent_75%)]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-mono text-7xl font-semibold tracking-tight text-ink/20 sm:text-8xl">
          AI
        </span>
      </div>
    </div>
  );
}
