"use client";

/**
 * Mid-page conversion band — drops between content sections to keep the
 * primary booking action visible without forcing the visitor to scroll all
 * the way back to the hero or down to the footer CTA.
 *
 * Two visual variants:
 *   - "soft"  : Light-bg compact card. Use right after the hero where a
 *               loud CTA would feel redundant.
 *   - "bold"  : Dark-ink card with grid backdrop. Use after a heavy
 *               content block (Work, Services) to re-engage scrollers.
 *
 * Both render the same primary + WhatsApp action pair as everywhere else,
 * keeping the funnel single-purpose: book a free 15-minute call.
 */

import { m, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { WhatsAppGlyph } from "@/components/library/brand-icons";
import {
  trackBookConsultationClick,
  trackWhatsAppClick,
  type BookButtonLocation,
} from "@/lib/analytics";

const easeOut = [0.22, 1, 0.36, 1] as const;

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
const WHATSAPP_MESSAGE =
  "Hi! I'd like to ask about a free website consultation.";

function buildWhatsAppUrl(): string | null {
  if (!WHATSAPP_NUMBER) return null;
  const cleaned = WHATSAPP_NUMBER.replace(/\D/g, "");
  if (!cleaned) return null;
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
}

type Variant = "soft" | "bold";

type InlineCTAProps = {
  variant?: Variant;
  eyebrow?: string;
  heading: string;
  description?: string;
  /** Used as the analytics button_location for the booking CTA. */
  location: BookButtonLocation;
};

export default function InlineCTA({
  variant = "bold",
  eyebrow,
  heading,
  description,
  location,
}: InlineCTAProps) {
  const reduce = useReducedMotion();
  const whatsappUrl = buildWhatsAppUrl();

  const reveal = {
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, ease: easeOut },
  };

  const isBold = variant === "bold";

  return (
    <section
      aria-label={heading}
      className="relative px-5 py-12 sm:px-8 sm:py-20"
    >
      <m.div
        {...reveal}
        className={[
          "relative mx-auto max-w-4xl overflow-hidden rounded-[24px] p-6 sm:rounded-[28px] sm:p-10",
          isBold
            ? "bg-ink text-paper"
            : "border border-line bg-paper-soft text-ink",
        ].join(" ")}
      >
        {isBold ? (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent_75%)]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px]" />
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent/30 blur-3xl" />
          </div>
        ) : null}

        {/* Vertical-stacked layout: text on top, buttons in a row below.
            Avoids the cramped side-by-side layout where the long
            "Book a Free 15-Minute Consultation" label would wrap and turn
            the rounded-full pill into an almond shape. */}
        <div className="relative flex flex-col gap-7 sm:gap-8">
          <div className="max-w-2xl">
            {eyebrow ? (
              <p
                className={[
                  "font-mono text-[11px] uppercase tracking-[0.28em]",
                  isBold ? "text-paper/55" : "text-muted",
                ].join(" ")}
              >
                {eyebrow}
              </p>
            ) : null}
            <h2
              className={[
                "text-balance text-2xl font-semibold tracking-[-0.02em] sm:text-3xl",
                eyebrow ? "mt-3" : "",
                isBold ? "text-paper" : "text-ink",
              ].join(" ")}
            >
              {heading}
            </h2>
            {description ? (
              <p
                className={[
                  "mt-4 text-pretty text-[15px] leading-7 sm:text-base sm:leading-7",
                  isBold ? "text-paper/70" : "text-muted",
                ].join(" ")}
              >
                {description}
              </p>
            ) : null}
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/book"
              onClick={() =>
                trackBookConsultationClick({ button_location: location })
              }
              className={[
                "group inline-flex min-h-[48px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 py-3.5 text-sm font-medium transition-all sm:w-auto",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                isBold
                  ? "bg-paper text-ink hover:-translate-y-0.5 hover:shadow-lifted focus-visible:ring-paper focus-visible:ring-offset-ink"
                  : "bg-ink text-paper hover:-translate-y-0.5 hover:bg-ink-soft hover:shadow-lifted focus-visible:ring-ink",
              ].join(" ")}
            >
              Book a Free 15-Minute Consultation
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
                strokeWidth={2}
              />
            </Link>

            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open WhatsApp chat with ITAI Web Solutions"
                onClick={() =>
                  trackWhatsAppClick({ button_location: location })
                }
                className={[
                  "group inline-flex min-h-[48px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3.5 text-sm font-medium transition-all sm:w-auto",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                  isBold
                    ? "border border-paper/25 text-paper hover:bg-paper/5 focus-visible:ring-paper focus-visible:ring-offset-ink"
                    : "border border-line bg-paper text-ink hover:bg-mist focus-visible:ring-ink",
                ].join(" ")}
              >
                <WhatsAppGlyph
                  className="h-4 w-4 text-[#25D366]"
                  aria-hidden
                />
                <span className="sm:hidden">WhatsApp me</span>
                <span className="hidden sm:inline">
                  Prefer WhatsApp? Message me here.
                </span>
              </a>
            ) : null}
          </div>
        </div>
      </m.div>
    </section>
  );
}
