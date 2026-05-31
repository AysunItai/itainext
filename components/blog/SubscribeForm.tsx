"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

type Variant = "card" | "inline";

type Props = {
  variant?: Variant;
  count?: number;
  eyebrow?: string;
  heading?: string;
  description?: string;
  /**
   * First-touch acquisition tag stored with the subscriber.
   * Short, free-form, e.g. "blog", "blog:slow-sql", "shop",
   * "shop:sql-performance-masterclass". Normalised server-side.
   */
  source?: string;
};

export default function SubscribeForm({
  variant = "card",
  count,
  eyebrow,
  heading,
  description,
  source,
}: Props) {
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting" || status === "success") return;
    if (!email.trim()) {
      setError("Please enter your email.");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setError(null);
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website, source }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Couldn't subscribe right now.");
      }
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't subscribe.");
      setStatus("error");
    }
  }

  const showCount = typeof count === "number" && count >= 25;

  if (variant === "inline") {
    return (
      <div className="w-full">
        <FormCore
          email={email}
          setEmail={setEmail}
          website={website}
          setWebsite={setWebsite}
          status={status}
          error={error}
          onSubmit={handleSubmit}
          reduce={!!reduce}
          tone="inline"
        />
        {status !== "success" ? (
          <p className="mt-2 text-[11px] font-mono uppercase tracking-[0.16em] text-ink/40">
            {showCount ? `Join ${count} readers` : "Be among the first readers"}
            <span className="mx-1.5 text-ink/20">·</span>
            No spam. Unsubscribe in one click.
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-paper-soft p-8 sm:p-10">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/[0.05] blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-ink/[0.04] blur-3xl" />
      </div>
      <div className="relative">
        {eyebrow ? (
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/45">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {heading ?? "Get new essays in your inbox."}
        </h2>
        {description ? (
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink/65">
            {description}
          </p>
        ) : (
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink/65">
            One thoughtful note when something new is published. No threads, no
            promotions, no follow-ups. Unsubscribe in one click.
          </p>
        )}

        <div className="mt-6 max-w-md">
          <FormCore
            email={email}
            setEmail={setEmail}
            website={website}
            setWebsite={setWebsite}
            status={status}
            error={error}
            onSubmit={handleSubmit}
            reduce={!!reduce}
            tone="card"
          />
          {status !== "success" ? (
            <p className="mt-3 text-[11px] font-mono uppercase tracking-[0.16em] text-ink/40">
              {showCount
                ? `Join ${count} readers`
                : "Be among the first readers"}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function FormCore({
  email,
  setEmail,
  website,
  setWebsite,
  status,
  error,
  onSubmit,
  reduce,
  tone,
}: {
  email: string;
  setEmail: (v: string) => void;
  website: string;
  setWebsite: (v: string) => void;
  status: "idle" | "submitting" | "success" | "error";
  error: string | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  reduce: boolean;
  tone: "card" | "inline";
}) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "success" ? (
        <motion.div
          key="success"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl border border-accent/30 bg-accent/[0.06] p-5"
          role="status"
          aria-live="polite"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-soft">
            Almost there
          </p>
          <p className="mt-1.5 text-[15px] leading-relaxed text-ink">
            Check your inbox for a confirmation email — click the link inside
            and you&apos;re in. (Peek in spam if you don&apos;t see it within a
            minute.)
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={onSubmit}
          initial={false}
          className="flex flex-col gap-2"
          noValidate
        >
          <label htmlFor="subscribe-email" className="sr-only">
            Email address
          </label>
          <div
            className={`flex flex-col gap-2 sm:flex-row ${
              tone === "card" ? "" : ""
            }`}
          >
            <input
              id="subscribe-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              disabled={status === "submitting"}
              className="h-11 flex-1 rounded-full border border-ink/15 bg-paper px-4 text-[14px] text-ink outline-none transition focus:border-ink/40 focus:ring-2 focus:ring-accent/20 disabled:opacity-60"
            />
            {/* Honeypot — visually hidden, robots love it */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              aria-hidden
              className="absolute left-[-9999px] top-[-9999px] h-0 w-0"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-full bg-ink px-5 text-[13px] font-medium text-paper transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="relative z-10">
                {status === "submitting" ? "Sending…" : "Subscribe"}
              </span>
              <span
                aria-hidden
                className="absolute inset-0 translate-x-[-110%] bg-gradient-to-r from-transparent via-paper/15 to-transparent transition-transform duration-700 group-hover:translate-x-[110%]"
              />
            </button>
          </div>
          {status === "error" && error ? (
            <p className="text-[12px] text-red-700" role="alert">
              {error}
            </p>
          ) : null}
        </motion.form>
      )}
    </AnimatePresence>
  );
}
