"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Status = "confirmed" | "unsubscribed" | "invalid";

const COPY: Record<
  Status,
  { eyebrow: string; title: string; body: string; tone: "good" | "neutral" | "bad" }
> = {
  confirmed: {
    eyebrow: "Welcome",
    title: "You're subscribed.",
    body: "New essays will land in your inbox. Thank you for reading.",
    tone: "good",
  },
  unsubscribed: {
    eyebrow: "Done",
    title: "You're unsubscribed.",
    body: "We'll miss you. Resubscribe anytime — no hard feelings.",
    tone: "neutral",
  },
  invalid: {
    eyebrow: "Hmm",
    title: "That link didn't work.",
    body: "It may have expired. Try subscribing again below.",
    tone: "bad",
  },
};

export default function SubscribeStatusBanner() {
  const router = useRouter();
  const params = useSearchParams();
  const reduce = useReducedMotion();
  const status = params.get("status") as Status | null;
  const validStatus = status && COPY[status] ? status : null;
  // Track which status was dismissed (rather than a boolean) so a fresh
  // status (e.g. confirm → unsubscribe) re-shows the banner without an effect.
  const [dismissedStatus, setDismissedStatus] = useState<Status | null>(null);

  // Auto-strip the URL param after a beat so it doesn't survive refreshes/shares.
  useEffect(() => {
    if (!validStatus) return;
    const t = setTimeout(() => {
      const url = new URL(window.location.href);
      url.searchParams.delete("status");
      router.replace(url.pathname + url.search, { scroll: false });
    }, 8000);
    return () => clearTimeout(t);
  }, [validStatus, router]);

  const visible = Boolean(validStatus) && validStatus !== dismissedStatus;
  const copy = validStatus ? COPY[validStatus] : null;

  const toneClass = !copy
    ? ""
    : copy.tone === "good"
      ? "border-accent/30 bg-accent/[0.06]"
      : copy.tone === "bad"
        ? "border-red-500/30 bg-red-500/[0.05]"
        : "border-ink/15 bg-ink/[0.03]";
  const eyebrowColor = !copy
    ? ""
    : copy.tone === "good"
      ? "text-accent-soft"
      : copy.tone === "bad"
        ? "text-red-700"
        : "text-ink/55";

  return (
    <AnimatePresence>
      {visible && copy ? (
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          aria-live="polite"
          className={`relative mx-auto mt-6 max-w-3xl rounded-2xl border px-5 py-4 sm:px-6 ${toneClass}`}
        >
          <button
            type="button"
            onClick={() => setDismissedStatus(validStatus)}
            aria-label="Dismiss"
            className="absolute right-3 top-3 rounded-full p-1 text-ink/35 transition hover:text-ink"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M3 3l8 8M11 3l-8 8" />
            </svg>
          </button>
          <p
            className={`font-mono text-[11px] uppercase tracking-[0.18em] ${eyebrowColor}`}
          >
            {copy.eyebrow}
          </p>
          <p className="mt-1 text-base font-semibold tracking-tight text-ink sm:text-lg">
            {copy.title}
          </p>
          <p className="mt-1 text-[14px] leading-relaxed text-ink/65">
            {copy.body}
          </p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
