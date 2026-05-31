"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownToLine,
  ArrowUpRight,
  Check,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import BookCover from "@/components/library/BookCover";
import ShareBar from "@/components/library/ShareBar";
import { formatPrice, type Publication } from "@/lib/library";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function ProductContent({
  pub,
  others,
}: {
  pub: Publication;
  others: Publication[];
}) {
  const reduce = useReducedMotion();

  const fade = (delay = 0) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: easeOut, delay },
  });

  const reveal = (delay = 0) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, ease: easeOut, delay },
  });

  const isFree = pub.priceCents === 0;
  const hasList =
    pub.listPriceCents !== undefined && pub.listPriceCents > pub.priceCents;

  return (
    <main id="main" className="relative">
      {/* ──────────────── Hero ──────────────── */}
      <section
        aria-labelledby="product-title"
        className="relative isolate overflow-hidden px-5 pt-28 pb-16 sm:px-8 sm:pt-40 sm:pb-24"
      >
        <ProductBackdrop reduce={!!reduce} />

        <div className="mx-auto max-w-7xl">
          <motion.div
            {...fade(0)}
            className="mb-10 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/45"
          >
            <Link
              href="/shop"
              className="inline-flex items-center gap-1 underline-offset-4 transition hover:text-ink hover:underline"
            >
              <ChevronLeft className="h-3.5 w-3.5" strokeWidth={2} />
              The library
            </Link>
            <span aria-hidden className="text-ink/20">
              /
            </span>
            <span className="text-ink/70">{pub.issue}</span>
          </motion.div>

          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="order-2 lg:order-1 lg:col-span-7">
              <motion.div
                {...fade(0.05)}
                className="flex flex-wrap items-center gap-2"
              >
                {pub.ribbon && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-paper">
                    {pub.ribbon}
                  </span>
                )}
                <span className="rounded-full border border-line bg-paper-soft px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-ink/65">
                  {pub.edition}
                </span>
                <span className="rounded-full border border-line bg-paper-soft px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-ink/65">
                  {pub.format} · {pub.pages} pages
                </span>
              </motion.div>

              <motion.h1
                {...fade(0.12)}
                id="product-title"
                className="mt-7 text-balance text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-ink"
              >
                {pub.title}.
              </motion.h1>

              <motion.p
                {...fade(0.2)}
                className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted sm:text-xl"
              >
                {pub.subtitle} {pub.description}
              </motion.p>

              <motion.div
                {...fade(0.28)}
                className="mt-10 flex flex-wrap items-end gap-x-6 gap-y-3"
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-semibold tracking-[-0.04em] text-ink sm:text-6xl">
                    {formatPrice(pub.priceCents)}
                  </span>
                  {hasList && (
                    <span className="text-xl font-medium text-ink/30 line-through sm:text-2xl">
                      {formatPrice(pub.listPriceCents!)}
                    </span>
                  )}
                </div>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                  {isFree ? "Until checkout opens" : "USD · One-time"}
                </p>
              </motion.div>

              <motion.div
                {...fade(0.36)}
                className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4"
              >
                <a
                  href={pub.file}
                  download
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-soft hover:shadow-lifted"
                >
                  <ArrowDownToLine
                    aria-hidden
                    className="h-4 w-4 transition-transform group-hover:translate-y-px"
                    strokeWidth={2}
                  />
                  Download the {pub.format}
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/60">
                    · {pub.fileSize}
                  </span>
                </a>
                <a
                  href={pub.file}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-paper px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-mist"
                >
                  Preview in browser
                  <ArrowUpRight
                    aria-hidden
                    className="h-4 w-4"
                    strokeWidth={2}
                  />
                </a>
              </motion.div>

              <motion.p
                {...fade(0.44)}
                className="mt-5 text-[13px] text-muted"
              >
                No signup. No email gate. If it&apos;s useful, send it to a
                teammate.
              </motion.p>

              <motion.div {...fade(0.52)} className="mt-8">
                <ShareBar
                  path={`/shop/${pub.slug}`}
                  title={`${pub.title} — ${pub.subtitle}`}
                  text={`Free read: ${pub.title}. ${pub.tagline}`}
                  eyebrow="Share this volume"
                />
              </motion.div>
            </div>

            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: easeOut, delay: 0.1 }}
              className="order-1 lg:order-2 lg:col-span-5"
            >
              <BookCover
                pub={pub}
                variant="showcase"
                className="mx-auto w-[min(420px,82vw)]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────── Facts strip ──────────────── */}
      <section
        aria-label="At a glance"
        className="relative border-y border-line bg-paper-soft px-5 py-12 sm:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {[
              { label: "Pages", value: `${pub.pages}` },
              { label: "Format", value: pub.format },
              { label: "Read", value: pub.readingTime.replace("≈ ", "") },
              {
                label: "Covers",
                value: pub.systems?.join(" & ") ?? "Practical",
              },
            ].map((s) => (
              <div key={s.label}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                  {s.label}
                </dt>
                <dd className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ──────────────── What you'll learn ──────────────── */}
      <section
        aria-labelledby="outcomes-title"
        className="relative px-5 py-24 sm:px-8 sm:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
            <motion.div {...reveal(0)} className="md:col-span-5">
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-muted">
                Inside this volume
              </p>
              <h2
                id="outcomes-title"
                className="mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl"
              >
                What you&apos;ll be able to do{" "}
                <span className="text-muted">by the last page.</span>
              </h2>
            </motion.div>

            <motion.ul
              {...reveal(0.12)}
              className="md:col-span-7 md:col-start-6 space-y-4"
            >
              {pub.outcomes.map((o) => (
                <li
                  key={o}
                  className="flex items-start gap-4 rounded-2xl border border-line bg-paper p-5 sm:p-6"
                >
                  <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-ink text-paper">
                    <Check aria-hidden className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-[15px] leading-7 text-ink/85">
                    {o}
                  </span>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      {/* ──────────────── Table of contents ──────────────── */}
      <section
        aria-labelledby="toc-title"
        className="relative border-t border-line px-5 py-24 sm:px-8 sm:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
            <motion.div {...reveal(0)} className="md:col-span-5">
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-muted">
                Contents · {pub.toc.length.toString().padStart(2, "0")} parts
              </p>
              <h2
                id="toc-title"
                className="mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl"
              >
                Read it cover to cover{" "}
                <span className="text-muted">in an afternoon.</span>
              </h2>
              <p className="mt-5 text-pretty text-base leading-7 text-muted">
                Every chapter is short on purpose — no padding, no theory for
                theory&apos;s sake. Each one ends with the smallest experiment
                you can run on a real database tonight.
              </p>
            </motion.div>

            <motion.ol
              {...reveal(0.12)}
              className="md:col-span-7 md:col-start-6 divide-y divide-line overflow-hidden rounded-3xl border border-line bg-paper"
            >
              {pub.toc.map((c, i) => (
                <motion.li
                  key={c.number}
                  initial={
                    reduce
                      ? { opacity: 0 }
                      : { opacity: 0, y: 12 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.05,
                    ease: easeOut,
                  }}
                  className="grid grid-cols-[auto_1fr] items-start gap-5 px-6 py-6 transition-colors hover:bg-paper-soft sm:px-8 sm:py-7"
                >
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink/40">
                    {c.number}
                  </span>
                  <div>
                    <h3 className="text-pretty text-lg font-semibold tracking-tight text-ink sm:text-xl">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-7 text-muted">
                      {c.blurb}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </div>
      </section>

      {/* ──────────────── Audience ──────────────── */}
      <section
        aria-labelledby="audience-title"
        className="relative border-t border-line px-5 py-24 sm:px-8 sm:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal(0)} className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-muted">
              Who this is for
            </p>
            <h2
              id="audience-title"
              className="mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl"
            >
              Written for working engineers.
            </h2>
          </motion.div>

          <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {pub.audience.map((a, i) => (
              <motion.li
                key={a}
                initial={
                  reduce ? { opacity: 0 } : { opacity: 0, y: 18 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.06,
                  ease: easeOut,
                }}
                className="rounded-3xl border border-line bg-paper-soft p-7"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                  Profile · {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-4 text-[17px] leading-8 text-ink/85">
                  {a}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ──────────────── Closing CTA ──────────────── */}
      <section
        aria-label="Get the book"
        className="relative border-t border-line px-5 py-24 sm:px-8 sm:py-32"
      >
        <div className="mx-auto max-w-5xl">
          <motion.div
            {...reveal(0)}
            className="relative isolate overflow-hidden rounded-[2rem] bg-ink p-10 text-paper sm:p-16"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent_75%)]"
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
              <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
              <div className="absolute -bottom-24 -left-12 h-72 w-72 rounded-full bg-accent-soft/20 blur-3xl" />
            </div>

            <div className="relative">
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-paper/60">
                {pub.issue} · {pub.edition}
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
                Take it. It&apos;s yours.
              </h2>
              <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-paper/75 sm:text-lg">
                {isFree
                  ? "Free this season — no email, no checkout, no friction. If it saves you an afternoon of debugging, send it forward."
                  : "Download immediately. Read on any device. Yours forever."}
              </p>

              <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <a
                  href={pub.file}
                  download
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-paper px-7 py-3.5 text-sm font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lifted"
                >
                  <ArrowDownToLine
                    aria-hidden
                    className="h-4 w-4 transition-transform group-hover:translate-y-px"
                    strokeWidth={2}
                  />
                  Download {formatPrice(pub.priceCents)}
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
                    · {pub.fileSize}
                  </span>
                </a>
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-paper/20 bg-transparent px-7 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-paper/10"
                >
                  Browse the library
                  <ArrowUpRight
                    aria-hidden
                    className="h-4 w-4"
                    strokeWidth={2}
                  />
                </Link>
              </div>

              <div className="mt-10 border-t border-paper/10 pt-8">
                <ShareBar
                  variant="dark"
                  path={`/shop/${pub.slug}`}
                  title={`${pub.title} — ${pub.subtitle}`}
                  text={`Free read: ${pub.title}. ${pub.tagline}`}
                  eyebrow="Pass it along"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ──────────────── More from the library ──────────────── */}
      {others.length > 0 && (
        <section
          aria-labelledby="more-title"
          className="relative border-t border-line px-5 py-24 sm:px-8 sm:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.32em] text-muted">
                  Continue browsing
                </p>
                <h2
                  id="more-title"
                  className="mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl"
                >
                  More from the library.
                </h2>
              </div>
              <Link
                href="/shop"
                className="hidden items-center gap-1.5 font-mono text-xs uppercase tracking-[0.22em] text-ink underline-offset-4 hover:underline sm:inline-flex"
              >
                All titles
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
              </Link>
            </div>

            <ul
              role="list"
              className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/shop/${o.slug}`}
                    className="group flex h-full flex-col rounded-3xl border border-line bg-paper-soft p-6 transition-all hover:-translate-y-1 hover:border-ink/20 hover:shadow-soft sm:p-7"
                  >
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                      {o.issue}
                    </p>
                    <div className="relative mx-auto my-6 w-[160px]">
                      <BookCover pub={o} />
                    </div>
                    <h3 className="text-pretty text-lg font-semibold tracking-tight text-ink">
                      {o.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted line-clamp-2">
                      {o.tagline}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
}

function ProductBackdrop({ reduce }: { reduce: boolean }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_70%_30%,rgba(30,58,138,0.08),transparent_70%)]" />
      <div className="absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(to_right,rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle,black,transparent_68%)]" />

      {!reduce && (
        <motion.div
          animate={{ opacity: [0.18, 0.4, 0.18] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[14%] top-[36%] h-[280px] w-[420px] -translate-y-1/2 rounded-full bg-accent/25 blur-3xl"
        />
      )}

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-paper" />
    </div>
  );
}
