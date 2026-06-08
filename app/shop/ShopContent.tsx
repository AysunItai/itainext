"use client";

import { m, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import SubscribeForm from "@/components/blog/SubscribeForm";
import BookCover from "@/components/library/BookCover";
import { formatPrice, type Publication } from "@/lib/library";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function ShopContent({
  publications,
  subscriberCount,
}: {
  publications: Publication[];
  subscriberCount?: number;
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

  const featured = publications[0];
  // Show every published title in the catalog grid (including the featured one).
  // The featured section above is editorial; the catalog is the complete list.
  const catalog = publications;

  return (
    <main id="main" className="relative">
      {/* ──────────────── Hero ──────────────── */}
      <section
        aria-labelledby="shop-hero-title"
        className="relative isolate overflow-hidden px-5 pt-32 pb-16 sm:px-8 sm:pt-44 sm:pb-24"
      >
        <ShopBackdrop reduce={!!reduce} />

        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <m.div
            {...fade(0)}
            className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium uppercase tracking-[0.32em] text-muted"
          >
            <span>The ITAI Library</span>
            <span aria-hidden className="h-px w-12 bg-line" />
            <span className="font-mono normal-case tracking-normal text-ink/50">
              Launch discount
            </span>
          </m.div>

          <m.h1
            {...fade(0.08)}
            id="shop-hero-title"
            className="text-balance text-[clamp(2.5rem,8vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-ink"
          >
            Field manuals
            <br />
            <span className="bg-[linear-gradient(110deg,#0a0a0a,#1e40af,#0f172a,#2563eb,#0a0a0a)] bg-[length:240%_240%] bg-clip-text text-transparent">
              for builders
            </span>
            .
          </m.h1>

          <m.p
            {...fade(0.18)}
            className="max-w-2xl text-pretty text-lg leading-8 text-muted sm:text-xl"
          >
            A small, slowly-growing library of practical ebooks. Each one
            written from real production work — the kind you keep open in a
            second tab, not on a shelf.
          </m.p>

          <m.div
            {...fade(0.3)}
            className="mt-2 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.2em] text-muted"
          >
            <span>Practical</span>
            <span className="h-1 w-1 rounded-full bg-line" />
            <span>Opinionated</span>
            <span className="h-1 w-1 rounded-full bg-line" />
            <span>Production-tested</span>
            <span className="h-1 w-1 rounded-full bg-line" />
            <span>Beautifully typeset</span>
          </m.div>
        </div>
      </section>

      {/* ──────────────── Featured release ──────────────── */}
      {featured && (
        <section
          aria-labelledby="featured-title"
          className="relative border-t border-line px-5 py-24 sm:px-8 sm:py-32"
        >
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-20">
            <m.div
              {...reveal(0)}
              className="relative order-1 lg:order-2 lg:col-span-5"
            >
              <Link
                href={`/shop/${featured.slug}`}
                aria-label={`Open ${featured.title}`}
                className="group block"
              >
                <BookCover
                  pub={featured}
                  variant="showcase"
                  className="mx-auto w-[min(380px,80vw)]"
                />
              </Link>
            </m.div>

            <div className="order-2 lg:order-1 lg:col-span-7">
              <m.p
                {...reveal(0.05)}
                className="font-mono text-xs uppercase tracking-[0.32em] text-muted"
              >
                Featured release · {featured.issue}
              </m.p>

              <m.h2
                {...reveal(0.12)}
                id="featured-title"
                className="mt-5 text-balance text-4xl font-semibold tracking-[-0.035em] text-ink sm:text-5xl lg:text-[3.4rem]"
              >
                {featured.title}.
              </m.h2>

              <m.p
                {...reveal(0.2)}
                className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-muted"
              >
                {featured.subtitle} {featured.description}
              </m.p>

              <m.dl
                {...reveal(0.28)}
                className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4"
              >
                {[
                  { label: "Pages", value: `${featured.pages}` },
                  { label: "Format", value: featured.format },
                  { label: "Read", value: featured.readingTime.replace("≈ ", "") },
                  { label: "Price", value: formatPrice(featured.priceCents) },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="bg-paper px-5 py-5 text-left"
                  >
                    <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                      {s.label}
                    </dt>
                    <dd className="mt-1.5 text-lg font-semibold tracking-tight text-ink">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </m.dl>

              <m.div
                {...reveal(0.36)}
                className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4"
              >
                <Link
                  href={`/shop/${featured.slug}`}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-soft hover:shadow-lifted sm:w-auto"
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
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-line bg-paper px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-mist sm:w-auto"
                >
                  Download the PDF
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                    {featured.fileSize}
                  </span>
                </a>
              </m.div>

              <m.div
                {...reveal(0.44)}
                className="mt-8 flex flex-wrap gap-2"
              >
                {featured.topics.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line bg-paper-soft px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-ink/65"
                  >
                    {t}
                  </span>
                ))}
              </m.div>
            </div>
          </div>
        </section>
      )}

      {/* ──────────────── Catalog ──────────────── */}
      <section
        aria-labelledby="catalog-title"
        className="relative border-t border-line px-5 py-24 sm:px-8 sm:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-12">
            <m.div {...reveal(0)} className="md:col-span-5">
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-muted">
                Catalog · {publications.length.toString().padStart(2, "0")} /{" "}
                {publications.length.toString().padStart(2, "0")}
              </p>
              <h2
                id="catalog-title"
                className="mt-4 text-balance text-4xl font-semibold tracking-[-0.035em] text-ink sm:text-5xl"
              >
                Every title.{" "}
                <span className="text-muted">Slowly written, fast to read.</span>
              </h2>
            </m.div>
            <m.p
              {...reveal(0.1)}
              className="md:col-span-6 md:col-start-7 max-w-2xl text-pretty text-lg leading-8 text-muted sm:text-xl"
            >
              I publish slowly. Each one is the book I wish I&apos;d had open
              in a second tab when I was learning the topic the hard way —
              short, opinionated, and meant to be read in a single sitting.
            </m.p>
          </div>

          <ul
            role="list"
            className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {catalog.map((pub, i) => (
              <CatalogCard
                key={pub.slug}
                pub={pub}
                index={i}
                reduce={!!reduce}
              />
            ))}

            <ComingSoonCard
              issue="Vol. 02"
              title="The TypeScript Reliability Handbook"
              eta="Drops · Summer 2026"
              index={catalog.length}
              reduce={!!reduce}
            />
            <ComingSoonCard
              issue="Vol. 03"
              title="Next.js in Production"
              eta="Drops · Late 2026"
              index={catalog.length + 1}
              reduce={!!reduce}
            />
          </ul>
        </div>
      </section>

      {/* ──────────────── Subscribe strip ──────────────── */}
      <section
        aria-label="Subscribe for new releases"
        className="relative border-t border-line px-5 py-24 sm:px-8 sm:py-32"
      >
        <div className="mx-auto max-w-3xl text-center">
          <m.p
            {...reveal(0)}
            className="font-mono text-xs uppercase tracking-[0.32em] text-muted"
          >
            New releases
          </m.p>
          <m.h2
            {...reveal(0.08)}
            className="mt-5 text-balance text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl"
          >
            First dibs on the next one.
          </m.h2>
          <m.p
            {...reveal(0.16)}
            className="mt-5 text-pretty text-base leading-7 text-muted sm:text-lg"
          >
            I&apos;ll send one short email when a new ebook lands in the shop —
            or when something on the blog is worth reading. That&apos;s it. No
            threads, no promotions, no follow-ups.
          </m.p>

          <m.div
            {...reveal(0.24)}
            className="mx-auto mt-10 max-w-md text-left"
          >
            <SubscribeForm
              variant="inline"
              count={subscriberCount}
              source="shop"
            />
          </m.div>

          <m.p
            {...reveal(0.34)}
            className="mt-6 text-[12px] text-muted"
          >
            Prefer to browse first?{" "}
            <Link
              href="/blog"
              className="text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
            >
              Read recent notes
            </Link>
            .
          </m.p>
        </div>
      </section>
    </main>
  );
}

function CatalogCard({
  pub,
  index,
  reduce,
}: {
  pub: Publication;
  index: number;
  reduce: boolean;
}) {
  return (
    <m.li
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: easeOut, delay: index * 0.08 }}
      className="group relative"
    >
      <Link
        href={`/shop/${pub.slug}`}
        aria-label={`Open ${pub.title}`}
        className="flex h-full flex-col rounded-3xl border border-line bg-paper-soft p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink/20 hover:shadow-soft sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            {pub.issue}
          </p>
          {pub.ribbon && (
            <span className="rounded-full bg-ink px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-paper">
              {pub.ribbon}
            </span>
          )}
        </div>

        <div className="relative mx-auto my-7 w-[180px]">
          <BookCover pub={pub} />
        </div>

        <h3 className="text-pretty text-xl font-semibold tracking-tight text-ink">
          {pub.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted line-clamp-2">
          {pub.tagline}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          <span>{pub.pages} pages · {pub.format}</span>
          <span className="inline-flex items-center gap-1.5 text-ink">
            {formatPrice(pub.priceCents)}
            <ArrowUpRight
              aria-hidden
              className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
              strokeWidth={2}
            />
          </span>
        </div>
      </Link>
    </m.li>
  );
}

function ComingSoonCard({
  issue,
  title,
  eta,
  index,
  reduce,
}: {
  issue: string;
  title: string;
  eta: string;
  index: number;
  reduce: boolean;
}) {
  return (
    <m.li
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: easeOut, delay: index * 0.08 }}
      className="relative"
    >
      <div className="flex h-full flex-col rounded-3xl border border-dashed border-line bg-paper p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            {issue}
          </p>
          <span className="rounded-full border border-line bg-paper-soft px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
            In progress
          </span>
        </div>

        <div className="relative mx-auto my-7 w-[180px]">
          <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[6px] border border-dashed border-line bg-mist">
            <div
              aria-hidden
              className="absolute inset-0 [background:repeating-linear-gradient(135deg,transparent_0_18px,rgba(10,10,10,0.04)_18px_19px)]"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/30">
                Coming soon
              </span>
            </div>
          </div>
        </div>

        <h3 className="text-pretty text-xl font-semibold tracking-tight text-ink/55">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted line-clamp-2">
          Working title — I&apos;m writing it now.
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          <span>{eta}</span>
          <span>—</span>
        </div>
      </div>
    </m.li>
  );
}

function ShopBackdrop({ reduce }: { reduce: boolean }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,rgba(30,58,138,0.09),transparent_70%)]" />
      <div className="absolute left-1/2 top-1/2 h-[820px] w-[820px] -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(to_right,rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle,black,transparent_70%)]" />

      {!reduce && (
        <m.div
          animate={{
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-[36%] h-[320px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-3xl"
        />
      )}

      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-paper" />
    </div>
  );
}
