"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import BookCover from "@/components/library/BookCover";
import { listPublications } from "@/lib/library";

const easeOut = [0.22, 1, 0.36, 1] as const;

/**
 * A restrained homepage strip introducing the free ebook library. Anchored
 * around the most recent publication — currently the SQL Performance
 * Masterclass — with a single clear primary CTA and a quiet "browse the
 * rest" escape hatch.
 */
export default function LibraryTeaser() {
  const reduce = useReducedMotion();
  const publications = listPublications();
  const featured = publications[0];

  if (!featured) return null;

  const reveal = (delay = 0) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, ease: easeOut, delay },
  });

  return (
    <section
      id="library"
      aria-labelledby="library-teaser-title"
      className="relative scroll-mt-24 overflow-hidden px-5 py-24 sm:px-8 sm:py-32"
    >
      {/* Subtle background — same vocabulary as the shop hero, dialed down */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_70%_50%,rgba(30,58,138,0.07),transparent_72%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-20">
        {/* ────────── Text column ────────── */}
        <div className="order-2 lg:order-1 lg:col-span-7">
          <motion.div
            {...reveal(0)}
            className="flex flex-wrap items-center gap-x-3 gap-y-2"
          >
            <span className="font-mono text-xs uppercase tracking-[0.32em] text-muted">
              From the library
            </span>
            <span aria-hidden className="h-px w-10 bg-line" />
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-paper">
              Free this season
            </span>
          </motion.div>

          <motion.h2
            {...reveal(0.08)}
            id="library-teaser-title"
            className="mt-6 text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-ink sm:text-5xl lg:text-[3.4rem]"
          >
            A free ebook on{" "}
            <span className="bg-[linear-gradient(110deg,#0a0a0a,#1e40af,#0f172a,#2563eb,#0a0a0a)] bg-[length:240%_240%] bg-clip-text text-transparent">
              SQL performance
            </span>
            .{" "}
            <span className="text-muted">And more on the way.</span>
          </motion.h2>

          <motion.p
            {...reveal(0.16)}
            className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted"
          >
            Fifty pages pulled from years of staring at slow queries in
            production — EXPLAIN, indexes, joins, pagination, aggregation.
            Yours to download. No signup, no email gate.
          </motion.p>

          <motion.div
            {...reveal(0.24)}
            className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <Link
              href={`/shop/${featured.slug}`}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-soft hover:shadow-lifted"
            >
              Read the overview
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
                strokeWidth={2}
              />
            </Link>
            <a
              href={featured.file}
              download
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-line bg-paper px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-mist"
            >
              <ArrowDownToLine
                aria-hidden
                className="h-4 w-4 transition-transform group-hover:translate-y-px"
                strokeWidth={2}
              />
              Download the PDF
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                · {featured.fileSize}
              </span>
            </a>
          </motion.div>

          <motion.p
            {...reveal(0.32)}
            className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-muted"
          >
            {featured.format} · {featured.pages} pages · {featured.edition}{" "}
            <span aria-hidden className="mx-1 text-ink/20">
              /
            </span>{" "}
            <Link
              href="/shop"
              className="text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
            >
              Browse the library
            </Link>
          </motion.p>
        </div>

        {/* ────────── Book column ────────── */}
        <motion.div
          {...reveal(0.1)}
          className="order-1 lg:order-2 lg:col-span-5"
        >
          <Link
            href={`/shop/${featured.slug}`}
            aria-label={`Open ${featured.title}`}
            className="group block"
          >
            <BookCover
              pub={featured}
              variant="showcase"
              className="mx-auto w-[min(340px,72vw)]"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
