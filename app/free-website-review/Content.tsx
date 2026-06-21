"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import {
  Check,
  Clock,
  Globe,
  Loader2,
  Send,
} from "lucide-react";
import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { trackEvent } from "@/lib/analytics";

const easeOut = [0.22, 1, 0.36, 1] as const;

const REVIEW_POINTS = [
  "Mobile experience & page speed",
  "SEO titles & Google indexing",
  "Contact, booking & WhatsApp flows",
  "Trust signals & Google Business Profile",
] as const;

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE =
  /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/i;

export default function FreeWebsiteReviewContent() {
  const reduce = useReducedMotion();
  const nameId = useId();
  const emailId = useId();
  const websiteId = useId();
  const notesId = useId();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const fade = (delay = 0) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, ease: easeOut, delay },
  });

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedWebsite = websiteUrl.trim();
  const trimmedNotes = notes.trim();

  const nameValid = trimmedName.length >= 2;
  const emailValid = EMAIL_RE.test(trimmedEmail);
  const websiteValid =
    trimmedWebsite.length >= 4 && URL_RE.test(trimmedWebsite);
  const isValid = nameValid && emailValid && websiteValid;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValid || status === "submitting") return;

    setStatus("submitting");
    setErrorMsg("");

    const messageParts = [
      `Website: ${trimmedWebsite}`,
      trimmedNotes ? `\nNotes: ${trimmedNotes}` : "",
    ];

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          topic: "Free website review",
          message: messageParts.join("").trim(),
          website: honeypot,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data?.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      trackEvent("free_website_review_submit", {
        event_category: "lead",
        event_label: "free_review_form",
      });
    } catch {
      setStatus("error");
      setErrorMsg(
        "Couldn't reach the server. Check your connection and try again.",
      );
    }
  }

  return (
    <main id="main" className="relative">
      <section
        aria-labelledby="review-hero-title"
        className="relative isolate overflow-hidden px-5 pt-32 pb-12 sm:px-8 sm:pt-44 sm:pb-16"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(30,58,138,0.08),transparent_70%)]"
        />

        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
            Free review
          </p>
          <h1
            id="review-hero-title"
            className="mt-5 text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            Free Website &amp; Google Visibility Review
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
            Share your site and I&apos;ll send back a short, practical review —
            what&apos;s working, what may be costing you leads, and what to fix
            first. Warm, direct, no hard sell.
          </p>
          <p className="mt-4 flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            <Clock aria-hidden className="h-3.5 w-3.5" strokeWidth={2} />
            Usually within one working day
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <m.aside
            {...fade(0)}
            className="lg:col-span-5"
          >
            <h2 className="text-xl font-semibold tracking-tight text-ink">
              What I review
            </h2>
            <ul role="list" className="mt-6 space-y-4">
              {REVIEW_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-mist text-ink"
                    aria-hidden
                  >
                    <Check className="h-3 w-3" strokeWidth={2.5} />
                  </span>
                  <span className="text-[15px] leading-6 text-muted">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-pretty text-[15px] leading-7 text-muted">
              Based in Israel, working with local and international clients.
              Haifa-area consultations available by appointment; remote projects
              worldwide.
            </p>
            <p className="mt-4 text-pretty text-sm text-muted">
              Prefer a call instead?{" "}
              <Link
                href="/book"
                className="font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
              >
                Book a free 15-minute consultation
              </Link>
            </p>
          </m.aside>

          <m.div
            {...fade(0.08)}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl border border-line bg-paper-soft p-6 sm:p-8">
              <h2 className="text-lg font-semibold tracking-tight text-ink">
                Request your review
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted">
                Your details go directly to me — not a sales team.
              </p>

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <m.div
                    key="success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 rounded-2xl border border-line bg-paper p-6 text-center"
                  >
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                      Received
                    </p>
                    <p className="mt-3 text-lg font-semibold text-ink">
                      Thanks — I&apos;ll review your site soon.
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      Watch your inbox. I&apos;ll reply with notes and suggested
                      next steps.
                    </p>
                  </m.div>
                ) : (
                  <m.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                    noValidate
                  >
                    <div>
                      <label
                        htmlFor={nameId}
                        className="text-sm font-medium text-ink"
                      >
                        Your name
                      </label>
                      <input
                        id={nameId}
                        name="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-line bg-paper px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-ink/30"
                        placeholder="Sarah Cohen"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor={emailId}
                        className="text-sm font-medium text-ink"
                      >
                        Email
                      </label>
                      <input
                        id={emailId}
                        name="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-line bg-paper px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-ink/30"
                        placeholder="you@business.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor={websiteId}
                        className="text-sm font-medium text-ink"
                      >
                        Website URL
                      </label>
                      <div className="relative mt-2">
                        <Globe
                          aria-hidden
                          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                          strokeWidth={2}
                        />
                        <input
                          id={websiteId}
                          name="website_url"
                          type="url"
                          required
                          value={websiteUrl}
                          onChange={(e) => setWebsiteUrl(e.target.value)}
                          className="w-full rounded-xl border border-line bg-paper py-3 pl-11 pr-4 text-[15px] text-ink outline-none transition-colors focus:border-ink/30"
                          placeholder="https://yourbusiness.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor={notesId}
                        className="text-sm font-medium text-ink"
                      >
                        Anything else?{" "}
                        <span className="font-normal text-muted">(optional)</span>
                      </label>
                      <textarea
                        id={notesId}
                        name="notes"
                        rows={4}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="mt-2 w-full resize-y rounded-xl border border-line bg-paper px-4 py-3 text-[15px] leading-6 text-ink outline-none transition-colors focus:border-ink/30"
                        placeholder="What you sell, what isn't working, or what you'd like to improve…"
                      />
                    </div>

                    <input
                      type="text"
                      name="website"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      className="absolute -left-[9999px] -top-[9999px] h-px w-px overflow-hidden"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden
                    />

                    {status === "error" && errorMsg ? (
                      <p className="text-sm text-red-700" role="alert">
                        {errorMsg}
                      </p>
                    ) : null}

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="group inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-all hover:bg-ink-soft disabled:opacity-70"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2
                            aria-hidden
                            className="h-4 w-4 animate-spin"
                            strokeWidth={2}
                          />
                          Sending…
                        </>
                      ) : (
                        <>
                          Get Free Website Review
                          <Send
                            aria-hidden
                            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                            strokeWidth={2}
                          />
                        </>
                      )}
                    </button>
                  </m.form>
                )}
              </AnimatePresence>
            </div>
          </m.div>
        </div>
      </section>
    </main>
  );
}
