"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Calendar, Mail, Video } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";

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

export default function BookContent() {
  const reduce = useReducedMotion();
  const params = useSearchParams();
  const planKey = params.get("plan");
  const plan =
    planKey && PLAN_LABELS[planKey] ? PLAN_LABELS[planKey] : null;
  const calendlyUrl = buildCalendlyUrl();

  const fade = (delay = 0) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, ease: easeOut, delay },
  });

  return (
    <main id="main" className="relative">
      <section
        aria-labelledby="book-hero-title"
        className="relative isolate overflow-hidden px-5 pt-32 pb-12 sm:px-8 sm:pt-44 sm:pb-20"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(30,58,138,0.08),transparent_70%)]"
        />

        <div className="mx-auto flex max-w-7xl flex-col gap-8">
          <motion.div
            {...fade(0)}
            className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium uppercase tracking-[0.32em] text-muted"
          >
            <span>Book</span>
            <span aria-hidden className="h-px w-12 bg-line" />
            <span className="font-mono normal-case tracking-normal text-ink/50">
              20-minute consultation · Free
            </span>
          </motion.div>

          <motion.h1
            {...fade(0.1)}
            id="book-hero-title"
            className="text-balance text-[clamp(2.5rem,8vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-ink"
          >
            Pick a time
            <br />
            that works.
          </motion.h1>

          <motion.p
            {...fade(0.2)}
            className="max-w-2xl text-pretty text-lg leading-8 text-muted sm:text-xl"
          >
            We&apos;ll meet on Zoom. Just bring your goal and any examples
            that inspire you — I&apos;ll handle the rest.
          </motion.p>

          {plan && (
            <motion.div
              {...fade(0.3)}
              className="inline-flex w-fit items-center gap-3 rounded-full border border-line bg-paper-soft px-4 py-2 text-sm shadow-soft"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/40">
                Booking for
              </span>
              <span className="font-medium text-ink">{plan.name}</span>
              <span className="text-muted">·</span>
              <span className="font-medium text-accent">{plan.price}</span>
            </motion.div>
          )}
        </div>
      </section>

      <section
        aria-label="Booking"
        className="relative border-t border-line px-5 pb-32 pt-16 sm:px-8 sm:pb-40 sm:pt-24"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-28">
              <ContextCard
                eyebrow="What to expect"
                icon={<Video className="h-4 w-4" strokeWidth={1.75} />}
                items={[
                  "A 20-minute video call on Zoom",
                  "We'll cover your goal, scope, and timeline",
                  "You leave with a clear next step + estimate",
                ]}
              />
              <ContextCard
                eyebrow="What to bring"
                items={[
                  "Your goal in one sentence",
                  "Examples of products you admire",
                  "Any technical or budget constraints",
                ]}
              />
              <div className="rounded-3xl border border-line bg-paper-soft p-6 sm:p-7">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted">
                  Prefer email?
                </p>
                <Link
                  href="mailto:info@itaiwebsolutions.com"
                  className="mt-3 inline-flex items-center gap-2 text-base font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
                >
                  <Mail className="h-4 w-4" strokeWidth={1.75} />
                  info@itaiwebsolutions.com
                </Link>
                <p className="mt-3 text-sm text-muted">
                  Or use the{" "}
                  <Link
                    href="/contact"
                    className="text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
                  >
                    contact form
                  </Link>
                  .
                </p>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-3xl border border-line bg-paper">
              {calendlyUrl ? (
                <CalendlyEmbed url={calendlyUrl} />
              ) : (
                <CalendlyFallback />
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ContextCard({
  eyebrow,
  icon,
  items,
}: {
  eyebrow: string;
  icon?: React.ReactNode;
  items: string[];
}) {
  return (
    <div className="rounded-3xl border border-line bg-paper p-6 sm:p-7">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-muted">
        {icon ? <span className="text-ink/60">{icon}</span> : null}
        <span>{eyebrow}</span>
      </div>
      <ol className="mt-4 space-y-3.5">
        {items.map((item, i) => (
          <li key={item} className="flex gap-3 text-sm leading-6">
            <span className="font-mono tabular-nums text-ink/40">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-ink/85">{item}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function CalendlyEmbed({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.Calendly) {
      setScriptReady(true);
    }
  }, []);

  useEffect(() => {
    if (!scriptReady || !ref.current || !window.Calendly) return;

    ref.current.innerHTML = "";
    window.Calendly.initInlineWidget({
      url,
      parentElement: ref.current,
    });
  }, [scriptReady, url]);

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
        we&apos;ll find a time that works.
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
          className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-paper px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-mist"
        >
          info@itaiwebsolutions.com
        </Link>
      </div>
    </div>
  );
}
