import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import BookCover from "@/components/library/BookCover";
import { getHomeCopy } from "@/lib/home-copy";
import type { Locale } from "@/lib/i18n";
import { listPublications } from "@/lib/library";

/**
 * LibraryTeaser is a server component. The layout, copy, and links are
 * all static — the only thing that genuinely needs client JS in this
 * section is the <BookCover /> hover tilt, which already runs as its
 * own small client island. Removed framer-motion entry animations to
 * cut hydration cost on the homepage (PSI desktop TBT was 1s, partly
 * from per-element whileInView observers).
 */
export default function LibraryTeaser({ locale = "en" }: { locale?: Locale }) {
  const copy = getHomeCopy(locale).library;
  const isHe = locale === "he";
  const publications = listPublications();
  const featured = publications[0];

  if (!featured) return null;

  return (
    <section
      id="library"
      aria-labelledby="library-teaser-title"
      className="relative scroll-mt-24 overflow-hidden px-5 py-16 sm:px-8 sm:py-28"
    >
      {/* Subtle background — same vocabulary as the shop hero, dialed down */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_70%_50%,rgba(30,58,138,0.07),transparent_72%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-20">
        {/* ────────── Text column ────────── */}
        <div className="order-2 lg:order-1 lg:col-span-7">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="font-mono text-xs uppercase tracking-[0.32em] text-muted">
              {copy.eyebrow}
            </span>
            <span aria-hidden className="h-px w-10 bg-line" />
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-paper">
              {copy.badge}
            </span>
          </div>

          <h2
            id="library-teaser-title"
            className="mt-6 text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-ink sm:text-5xl lg:text-[3.4rem]"
          >
            {copy.title}{" "}
            <span className="bg-[linear-gradient(110deg,#0a0a0a,#1e40af,#0f172a,#2563eb,#0a0a0a)] bg-[length:240%_240%] bg-clip-text text-transparent">
              {copy.titleAccent}
            </span>
            .{" "}
            <span className="text-muted">{copy.titleMuted}</span>
          </h2>

          <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted">
            {copy.description}
          </p>

          <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href={`/shop/${featured.slug}`}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-soft hover:shadow-lifted"
            >
              {copy.cta}
              <ArrowUpRight
                aria-hidden
                className={[
                  "h-4 w-4 transition-transform",
                  isHe
                    ? "rotate-180 group-hover:-translate-x-px group-hover:-translate-y-px"
                    : "group-hover:-translate-y-px group-hover:translate-x-px",
                ].join(" ")}
                strokeWidth={2}
              />
            </Link>
          </div>

          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            {featured.format} · {featured.pages} pages · {featured.edition}{" "}
            <span aria-hidden className="mx-1 text-ink/20">
              /
            </span>{" "}
            <Link
              href="/shop"
              className="text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
            >
              {copy.browse}
            </Link>
          </p>
        </div>

        {/* ────────── Book column ────────── */}
        <div className="order-1 lg:order-2 lg:col-span-5">
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
        </div>
      </div>
    </section>
  );
}
