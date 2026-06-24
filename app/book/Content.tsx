"use client";

import { m, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Calendar, Check } from "lucide-react";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { WhatsAppGlyph } from "@/components/library/brand-icons";
import { BOOK_COPY, type BookCopy } from "@/lib/book-copy";
import type { Locale } from "@/lib/i18n";
import {
  buildWhatsAppUrl,
  getConsultationWhatsAppMessage,
} from "@/lib/whatsapp";
import {
  trackBookConsultationClick,
  trackEvent,
  trackWhatsAppClick,
} from "@/lib/analytics";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: {
        url: string;
        parentElement: HTMLElement;
        prefill?: Record<string, unknown>;
        utm?: Record<string, unknown>;
      }) => void;
    };
  }
}

const easeOut = [0.22, 1, 0.36, 1] as const;

const PLAN_LABELS: Record<string, { name: string; price: string }> = {
  starter: { name: "Starter Website", price: "$699" },
  pro: { name: "Business Website Pro", price: "$1,499" },
  custom: { name: "Custom Development", price: "Tailored" },
};

const CALENDLY_BASE_URL = process.env.NEXT_PUBLIC_CALENDLY_URL;

const BOOK_ANCHOR = "book-now";

function buildCalendlyUrl(): string | null {
  if (!CALENDLY_BASE_URL) return null;
  try {
    const url = new URL(CALENDLY_BASE_URL);
    url.searchParams.set("hide_gdpr_banner", "1");
    url.searchParams.set("hide_event_type_details", "1");
    url.searchParams.set("primary_color", "1e3a8a");
    url.searchParams.set("text_color", "0a0a0a");
    url.searchParams.set("background_color", "ffffff");
    return url.toString();
  } catch {
    return CALENDLY_BASE_URL;
  }
}

// `plan` is passed from the server (see `app/book/page.tsx`) so the
// whole component — including the <h1> — ends up in the initial HTML.
// We previously read this via `useSearchParams()`, which forced the
// page into a Suspense boundary and meant crawlers saw an empty
// prerender.
export default function BookContent({
  plan: planKey,
  locale = "en",
}: {
  plan: string | null;
  locale?: Locale;
}) {
  const copy = BOOK_COPY[locale];
  const reduce = useReducedMotion();
  const plan =
    planKey && PLAN_LABELS[planKey] ? PLAN_LABELS[planKey] : null;

  const calendlyUrl = buildCalendlyUrl();
  const whatsappUrl = buildWhatsAppUrl(getConsultationWhatsAppMessage(locale));

  const fade = (delay = 0) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, ease: easeOut, delay },
  });

  const reveal = (delay = 0) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, ease: easeOut, delay },
  });

  return (
    <main id="main" className="relative">
      {/* ───────── HERO ───────── */}
      <section
        aria-labelledby="book-hero-title"
        className="relative isolate overflow-hidden px-5 pt-32 pb-16 sm:px-8 sm:pt-40 sm:pb-20"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(30,58,138,0.08),transparent_70%)]"
        />

        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <m.div
            {...fade(0)}
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-paper/70 px-3.5 py-1.5 text-[12px] backdrop-blur-md"
          >
            <span aria-hidden className="relative flex h-2 w-2 flex-none">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent/70 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="font-mono uppercase tracking-[0.2em] text-ink/55">
              {copy.badgeFree}
            </span>
            <span aria-hidden className="h-3 w-px flex-none bg-line" />
            <span className="text-ink/80">{copy.badgeMeet}</span>
          </m.div>

          <m.h1
            {...fade(0.1)}
            id="book-hero-title"
            className="mt-8 text-balance text-[clamp(2.25rem,6.5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink"
          >
            {copy.title}
          </m.h1>

          <m.p
            {...fade(0.2)}
            className="mt-6 max-w-2xl text-pretty text-base leading-7 text-muted sm:text-lg sm:leading-8"
          >
            {copy.subtitle}
          </m.p>

          {plan ? (
            <m.div
              {...fade(0.28)}
              className="mt-7 inline-flex items-center gap-3 rounded-full border border-line bg-paper-soft px-4 py-2 text-sm shadow-soft"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/40">
                {copy.bookingFor}
              </span>
              <span className="font-medium text-ink">{plan.name}</span>
              <span className="text-muted">·</span>
              <span className="font-medium text-accent">{plan.price}</span>
            </m.div>
          ) : null}

          <m.div
            {...fade(0.34)}
            className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <BookCtaAnchor
              location="book_page_hero"
              plan={planKey}
              variant="primary"
            >
              {copy.primaryCta}
            </BookCtaAnchor>
            {whatsappUrl ? (
              <WhatsAppLink
                href={whatsappUrl}
                location="book_page_hero"
                variant="ghost"
                copy={copy}
              />
            ) : null}
          </m.div>

          <m.p {...fade(0.44)} className="mt-5 text-[13px] text-muted">
            {copy.heroNote}
          </m.p>
        </div>
      </section>

      {/* ───────── INLINE BOOKING WIDGET ─────────
          Full-width, full-page experience — replaces the modal so the flow
          works the same on every device: scroll, pick a time, confirm. */}
      <section
        id={BOOK_ANCHOR}
        aria-label="Pick a time for the consultation"
        className="relative scroll-mt-24 border-t border-line bg-paper-soft px-5 py-16 sm:px-8 sm:py-20"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-muted">
                {copy.pickTimeLabel}
              </p>
              <h2 className="mt-3 text-balance text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
                {copy.pickTimeTitle}
              </h2>
            </div>
            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackWhatsAppClick({ button_location: "book_page_hero" })
                }
                className="inline-flex items-center gap-2 text-sm text-muted underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
              >
                <WhatsAppGlyph
                  className="h-3.5 w-3.5 text-[#25D366]"
                  aria-hidden
                />
                {copy.pickTimeWhatsApp}
              </a>
            ) : null}
          </div>

          <div className="overflow-hidden rounded-3xl border border-line bg-paper">
            {calendlyUrl ? (
              <CalendlyEmbed url={calendlyUrl} />
            ) : (
              <CalendlyFallback copy={copy} />
            )}
          </div>
        </div>
      </section>

      {/* ───────── IN THE CALL WE CAN DISCUSS ───────── */}
      <section
        aria-labelledby="in-the-call-title"
        className="relative border-t border-line px-5 py-20 sm:px-8 sm:py-24"
      >
        <div className="mx-auto max-w-5xl">
          <m.p
            {...reveal(0)}
            className="font-mono text-xs uppercase tracking-[0.32em] text-muted"
          >
            {copy.coverLabel}
          </m.p>
          <m.h2
            {...reveal(0.06)}
            id="in-the-call-title"
            className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-[-0.025em] text-ink sm:text-[2.5rem] sm:leading-[1.1]"
          >
            {copy.coverTitle}
          </m.h2>

          <ul className="mt-10 grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
            {copy.inTheCall.map((point, i) => (
              <m.li
                key={point}
                {...reveal(0.12 + i * 0.06)}
                className="group flex items-start gap-3 rounded-2xl border border-line bg-paper p-5 transition-colors hover:border-ink/20 sm:p-6"
              >
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-ink text-paper">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
                <span className="text-pretty text-[15px] leading-6 text-ink/90 sm:text-base">
                  {point}
                </span>
              </m.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── TRUST PARAGRAPH ───────── */}
      <section
        aria-label="What to expect"
        className="relative border-t border-line bg-paper-soft px-5 py-20 sm:px-8 sm:py-24"
      >
        <m.div
          {...reveal(0)}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-muted">
            {copy.noPressureLabel}
          </p>
          <p className="mt-5 text-balance text-xl leading-8 text-ink/85 sm:text-2xl sm:leading-9">
            {copy.trustParagraph}
          </p>
        </m.div>
      </section>

      {/* ───────── WHO THIS IS FOR ───────── */}
      <section
        aria-labelledby="who-its-for-title"
        className="relative border-t border-line px-5 py-20 sm:px-8 sm:py-24"
      >
        <div className="mx-auto max-w-5xl">
          <m.p
            {...reveal(0)}
            className="font-mono text-xs uppercase tracking-[0.32em] text-muted"
          >
            {copy.goodFitLabel}
          </m.p>
          <m.h2
            {...reveal(0.06)}
            id="who-its-for-title"
            className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-[-0.025em] text-ink sm:text-[2.5rem] sm:leading-[1.1]"
          >
            {copy.goodFitTitle}
          </m.h2>

          <ul className="mt-10 grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
            {copy.whoThisIsFor.map((point, i) => (
              <m.li
                key={point}
                {...reveal(0.12 + i * 0.05)}
                className="flex items-start gap-3 rounded-2xl border border-line bg-paper p-5 transition-colors hover:border-ink/20 sm:p-6"
              >
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full border border-ink/15 bg-paper-soft text-ink">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
                <span className="text-pretty text-[15px] leading-6 text-ink/90 sm:text-base">
                  {point}
                </span>
              </m.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── CLOSING CTA ───────── */}
      <section
        aria-label="Book now"
        className="relative border-t border-line px-5 py-20 sm:px-8 sm:py-28"
      >
        <m.div
          {...reveal(0)}
          className="relative mx-auto max-w-4xl overflow-hidden rounded-[28px] border border-line bg-ink p-10 text-paper sm:rounded-[32px] sm:p-14"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent_75%)]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/40 blur-3xl" />
          </div>

          <div className="relative flex flex-col items-center text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-paper/55">
              {copy.closingLabel}
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">
              {copy.closingTitle}
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-base leading-7 text-paper/70">
              {copy.closingSubtitle}
            </p>

            <div className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <BookCtaAnchor
                location="book_page_closing_cta"
                plan={planKey}
                variant="inverted"
              >
                {copy.primaryCta}
              </BookCtaAnchor>
              {whatsappUrl ? (
                <WhatsAppLink
                  href={whatsappUrl}
                  location="book_page_closing_cta"
                  variant="ghost-dark"
                  copy={copy}
                />
              ) : null}
            </div>

            <p className="mt-6 text-[12px] text-paper/55">
              {copy.preferEmail}{" "}
              <Link
                href="mailto:info@itaiwebsolutions.com"
                onClick={() =>
                  trackEvent("email_click", {
                    event_category: "lead",
                    event_label: "Book page — closing CTA",
                  })
                }
                className="underline decoration-paper/30 underline-offset-4 transition-colors hover:decoration-paper"
              >
                info@itaiwebsolutions.com
              </Link>
            </p>
          </div>
        </m.div>
      </section>
    </main>
  );
}

/* ─────────────────────────── BookCtaAnchor ───────────────────────────
   On the /book page itself, the primary CTA scrolls to the embedded
   booking widget (`#book-now`) instead of opening a modal. This keeps the
   flow identical on every device: click → see widget → pick time. */

type BookCtaAnchorProps = {
  location: "book_page_hero" | "book_page_closing_cta";
  plan: string | null;
  variant: "primary" | "inverted";
  children: ReactNode;
};

function BookCtaAnchor({
  location,
  plan,
  variant,
  children,
}: BookCtaAnchorProps) {
  const isInverted = variant === "inverted";
  const classes = [
    "group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-all w-full sm:w-auto",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    isInverted
      ? "bg-paper text-ink hover:-translate-y-0.5 hover:shadow-lifted focus-visible:ring-paper focus-visible:ring-offset-ink"
      : "bg-ink text-paper hover:-translate-y-0.5 hover:bg-ink-soft hover:shadow-lifted focus-visible:ring-ink",
  ].join(" ");

  return (
    <a
      href={`#${BOOK_ANCHOR}`}
      onClick={() =>
        trackBookConsultationClick({
          button_location: location,
          plan: plan ?? undefined,
        })
      }
      className={classes}
    >
      {children}
      <ArrowDown
        aria-hidden
        className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
        strokeWidth={2}
      />
    </a>
  );
}

/* ─────────────────────────── WhatsAppLink ─────────────────────────── */

type WhatsAppLinkProps = {
  href: string;
  location: "book_page_hero" | "book_page_closing_cta";
  variant: "ghost" | "ghost-dark";
  copy: BookCopy;
};

function WhatsAppLink({ href, location, variant, copy }: WhatsAppLinkProps) {
  const isDark = variant === "ghost-dark";
  const classes = [
    "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-all w-full sm:w-auto",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    isDark
      ? "border border-paper/20 text-paper hover:bg-paper/5 focus-visible:ring-paper focus-visible:ring-offset-ink"
      : "border border-line bg-paper text-ink hover:bg-mist focus-visible:ring-ink",
  ].join(" ");

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={copy.whatsappAria}
      onClick={() => trackWhatsAppClick({ button_location: location })}
      className={classes}
    >
      <WhatsAppGlyph className="h-4 w-4 text-[#25D366]" aria-hidden />
      <span className="sm:hidden">{copy.whatsappShort}</span>
      <span className="hidden sm:inline">{copy.whatsappLong}</span>
    </a>
  );
}

/* ─────────────────────────── Calendly embed ─────────────────────────── */

function CalendlyEmbed({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);
  // If Calendly's script was cached from a prior page mount, `window.Calendly`
  // is already defined on first render — compute the initial value lazily
  // instead of setting it from an effect (which the React 19 lint warns
  // against).
  const [scriptReady, setScriptReady] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return typeof window.Calendly !== "undefined";
  });

  useEffect(() => {
    if (!scriptReady || !ref.current || !window.Calendly) return;
    ref.current.innerHTML = "";
    window.Calendly.initInlineWidget({
      url,
      parentElement: ref.current,
    });
  }, [scriptReady, url]);

  // Calendly broadcasts lifecycle events to the parent window via
  // postMessage. The "calendly.event_scheduled" message means a booking
  // was actually confirmed — the real conversion signal for the embed.
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      const data: unknown = e.data;
      if (
        typeof data === "object" &&
        data !== null &&
        "event" in data &&
        typeof (data as { event: unknown }).event === "string" &&
        (data as { event: string }).event === "calendly.event_scheduled"
      ) {
        trackEvent("calendly_event_scheduled", {
          event_category: "lead",
          event_label: "Calendly inline widget",
        });
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <>
      <div ref={ref} style={{ minWidth: "320px", height: "720px" }} />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      />
    </>
  );
}

function CalendlyFallback({ copy }: { copy: BookCopy }) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 px-6 py-20 text-center sm:py-28">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-mist">
        <Calendar className="h-6 w-6 text-ink/60" strokeWidth={1.5} />
      </div>
      <h2 className="text-balance text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
        {copy.calendlyFallbackTitle}
      </h2>
      <p className="max-w-md text-pretty text-base leading-7 text-muted">
        {copy.calendlyFallbackBody}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link
          href={copy.contactHref}
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper shadow-soft transition-all hover:-translate-y-0.5 hover:bg-ink-soft hover:shadow-lifted"
        >
          {copy.calendlyFallbackCta}
          <ArrowUpRight
            className="h-4 w-4 transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
            strokeWidth={2}
          />
        </Link>
        <Link
          href="mailto:info@itaiwebsolutions.com"
          onClick={() =>
            trackEvent("email_click", {
              event_category: "lead",
              event_label: "Book page — Calendly fallback",
            })
          }
          className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-paper px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-mist"
        >
          info@itaiwebsolutions.com
        </Link>
      </div>
    </div>
  );
}
