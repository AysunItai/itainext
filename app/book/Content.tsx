"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Calendar, Check } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { WhatsAppGlyph } from "@/components/library/brand-icons";
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
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
const WHATSAPP_MESSAGE =
  "Hi! I'd like to ask about a free website consultation.";

const BOOK_ANCHOR = "book-now";

const IN_THE_CALL = [
  "What kind of website your business needs",
  "How to improve your current website",
  "How to get more leads from Google, Facebook, and WhatsApp",
] as const;

const WHO_THIS_IS_FOR = [
  "You own a small business and need a professional website",
  "Your current website looks old or doesn't bring leads",
  "You want WhatsApp, booking, contact forms, or SEO setup",
  "You want a developer who explains things clearly",
] as const;

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

function buildWhatsAppUrl(): string | null {
  if (!WHATSAPP_NUMBER) return null;
  const cleaned = WHATSAPP_NUMBER.replace(/\D/g, "");
  if (!cleaned) return null;
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
}

export default function BookContent() {
  const reduce = useReducedMotion();
  const params = useSearchParams();
  const planKey = params.get("plan");
  const plan =
    planKey && PLAN_LABELS[planKey] ? PLAN_LABELS[planKey] : null;

  const calendlyUrl = buildCalendlyUrl();
  const whatsappUrl = buildWhatsAppUrl();

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
          <motion.div
            {...fade(0)}
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-paper/70 px-3.5 py-1.5 text-[12px] backdrop-blur-md"
          >
            <span aria-hidden className="relative flex h-2 w-2 flex-none">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent/70 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="font-mono uppercase tracking-[0.2em] text-ink/55">
              Free · 15 min
            </span>
            <span aria-hidden className="h-3 w-px flex-none bg-line" />
            <span className="text-ink/80">Zoom or Google Meet</span>
          </motion.div>

          <motion.h1
            {...fade(0.1)}
            id="book-hero-title"
            className="mt-8 text-balance text-[clamp(2.25rem,6.5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink"
          >
            Free 15-Minute Website Consultation
          </motion.h1>

          <motion.p
            {...fade(0.2)}
            className="mt-6 max-w-2xl text-pretty text-base leading-7 text-muted sm:text-lg sm:leading-8"
          >
            I help small businesses build clean, modern websites with
            WhatsApp, booking, SEO setup, and contact forms.
          </motion.p>

          {plan ? (
            <motion.div
              {...fade(0.28)}
              className="mt-7 inline-flex items-center gap-3 rounded-full border border-line bg-paper-soft px-4 py-2 text-sm shadow-soft"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/40">
                Booking for
              </span>
              <span className="font-medium text-ink">{plan.name}</span>
              <span className="text-muted">·</span>
              <span className="font-medium text-accent">{plan.price}</span>
            </motion.div>
          ) : null}

          <motion.div
            {...fade(0.34)}
            className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <BookCtaAnchor
              location="book_page_hero"
              plan={planKey}
              variant="primary"
            >
              Book a Free 15-Minute Consultation
            </BookCtaAnchor>
            {whatsappUrl ? (
              <WhatsAppLink
                href={whatsappUrl}
                location="book_page_hero"
                variant="ghost"
              />
            ) : null}
          </motion.div>

          <motion.p {...fade(0.44)} className="mt-5 text-[13px] text-muted">
            No signup required. No sales pressure. Just a friendly conversation.
          </motion.p>
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
                Pick a time
              </p>
              <h2 className="mt-3 text-balance text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
                Choose a slot that works for you.
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
                Or message me on WhatsApp
              </a>
            ) : null}
          </div>

          <div className="overflow-hidden rounded-3xl border border-line bg-paper">
            {calendlyUrl ? (
              <CalendlyEmbed url={calendlyUrl} />
            ) : (
              <CalendlyFallback />
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
          <motion.p
            {...reveal(0)}
            className="font-mono text-xs uppercase tracking-[0.32em] text-muted"
          >
            What we&apos;ll cover
          </motion.p>
          <motion.h2
            {...reveal(0.06)}
            id="in-the-call-title"
            className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-[-0.025em] text-ink sm:text-[2.5rem] sm:leading-[1.1]"
          >
            In the call we can discuss:
          </motion.h2>

          <ul className="mt-10 grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
            {IN_THE_CALL.map((point, i) => (
              <motion.li
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
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── TRUST PARAGRAPH ───────── */}
      <section
        aria-label="What to expect"
        className="relative border-t border-line bg-paper-soft px-5 py-20 sm:px-8 sm:py-24"
      >
        <motion.div
          {...reveal(0)}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-muted">
            No pressure
          </p>
          <p className="mt-5 text-balance text-xl leading-8 text-ink/85 sm:text-2xl sm:leading-9">
            No pressure, no complicated tech talk. We&apos;ll look at your
            business, your current online presence, and what small
            improvements could help you get more leads.
          </p>
        </motion.div>
      </section>

      {/* ───────── WHO THIS IS FOR ───────── */}
      <section
        aria-labelledby="who-its-for-title"
        className="relative border-t border-line px-5 py-20 sm:px-8 sm:py-24"
      >
        <div className="mx-auto max-w-5xl">
          <motion.p
            {...reveal(0)}
            className="font-mono text-xs uppercase tracking-[0.32em] text-muted"
          >
            A good fit
          </motion.p>
          <motion.h2
            {...reveal(0.06)}
            id="who-its-for-title"
            className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-[-0.025em] text-ink sm:text-[2.5rem] sm:leading-[1.1]"
          >
            This is for you if:
          </motion.h2>

          <ul className="mt-10 grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
            {WHO_THIS_IS_FOR.map((point, i) => (
              <motion.li
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
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── CLOSING CTA ───────── */}
      <section
        aria-label="Book now"
        className="relative border-t border-line px-5 py-20 sm:px-8 sm:py-28"
      >
        <motion.div
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
              Ready when you are
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">
              Let&apos;s figure out what your business needs.
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-base leading-7 text-paper/70">
              Pick a time that works for you, or send a quick WhatsApp message
              and I&apos;ll get back today.
            </p>

            <div className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <BookCtaAnchor
                location="book_page_closing_cta"
                plan={planKey}
                variant="inverted"
              >
                Book a Free 15-Minute Consultation
              </BookCtaAnchor>
              {whatsappUrl ? (
                <WhatsAppLink
                  href={whatsappUrl}
                  location="book_page_closing_cta"
                  variant="ghost-dark"
                />
              ) : null}
            </div>

            <p className="mt-6 text-[12px] text-paper/55">
              Prefer email?{" "}
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
        </motion.div>
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
};

function WhatsAppLink({ href, location, variant }: WhatsAppLinkProps) {
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
      aria-label="Open WhatsApp chat with ITAI Web Solutions"
      onClick={() => trackWhatsAppClick({ button_location: location })}
      className={classes}
    >
      <WhatsAppGlyph className="h-4 w-4 text-[#25D366]" aria-hidden />
      <span className="sm:hidden">WhatsApp me</span>
      <span className="hidden sm:inline">
        Prefer WhatsApp? Message me here.
      </span>
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

function CalendlyFallback() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 px-6 py-20 text-center sm:py-28">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-mist">
        <Calendar className="h-6 w-6 text-ink/60" strokeWidth={1.5} />
      </div>
      <h2 className="text-balance text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
        Calendar setup is in progress.
      </h2>
      <p className="max-w-md text-pretty text-base leading-7 text-muted">
        While the booking widget is being configured, send a quick note and
        I&apos;ll find a time that works.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link
          href="/contact"
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper shadow-soft transition-all hover:-translate-y-0.5 hover:bg-ink-soft hover:shadow-lifted"
        >
          Send a note
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
