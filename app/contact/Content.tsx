"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Clock,
  Loader2,
  Mail,
  Send,
} from "lucide-react";
import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { trackEvent } from "@/lib/analytics";

const easeOut = [0.22, 1, 0.36, 1] as const;

const TOPICS = [
  "a new website",
  "an automation system",
  "a booking platform",
  "a dashboard or internal tool",
  "something else",
] as const;

type Topic = (typeof TOPICS)[number];
type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_MAX = 1500;
const BUSINESS_EMAIL = "aysun.itai@gmail.com";

export default function ContactContent() {
  const reduce = useReducedMotion();
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();
  const topicLabelId = useId();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<Topic | "">("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });

  const fade = (delay = 0) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, ease: easeOut, delay },
  });

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  const nameValid = trimmedName.length >= 2;
  const emailValid = EMAIL_RE.test(trimmedEmail);
  const messageValid = trimmedMessage.length >= 10;
  const isValid = nameValid && emailValid && messageValid;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!isValid || status === "submitting") return;

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          topic,
          message: trimmedMessage,
          website,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
      };
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data?.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      trackEvent("contact_form_submit", {
        event_category: "lead",
        event_label: topic || "no topic selected",
        topic: topic || undefined,
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
        aria-labelledby="contact-hero-title"
        className="relative isolate overflow-hidden px-5 pt-32 pb-16 sm:px-8 sm:pt-44 sm:pb-24"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(30,58,138,0.08),transparent_70%)]"
        />

        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <m.div
            {...fade(0)}
            className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium uppercase tracking-[0.32em] text-muted"
          >
            <span>Contact</span>
            <span aria-hidden className="h-px w-12 bg-line" />
            <span className="font-mono tabular-nums normal-case tracking-normal text-ink/50">
              Direct line · No middlemen
            </span>
          </m.div>

          <m.h1
            {...fade(0.1)}
            id="contact-hero-title"
            className="text-balance text-[clamp(2.5rem,8vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-ink"
          >
            Let&apos;s start a
            <br />
            conversation.
          </m.h1>

          <m.p
            {...fade(0.2)}
            className="max-w-2xl text-pretty text-lg leading-8 text-muted sm:text-xl"
          >
            Tell me a little about what you&apos;re building. Replies come
            straight from me — usually within a day, often sooner.
          </m.p>
        </div>
      </section>

      <section
        aria-label="Contact form"
        className="relative border-t border-line px-5 pb-32 pt-16 sm:px-8 sm:pb-40 sm:pt-24"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait" initial={false}>
              {status !== "success" ? (
                <m.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: easeOut }}
                  className="space-y-14"
                >
                  <div
                    className="text-pretty text-2xl font-medium leading-relaxed text-ink sm:text-3xl"
                    style={{ lineHeight: 1.7 }}
                  >
                    <span className="mr-2 text-muted">Hi,</span>
                    <span className="mr-2">my name is</span>
                    <InlineField
                      id={nameId}
                      label="Your name"
                      value={name}
                      onChange={setName}
                      onBlur={() =>
                        setTouched((t) => ({ ...t, name: true }))
                      }
                      placeholder="your name"
                      autoComplete="name"
                      required
                      invalid={touched.name && !nameValid}
                      minWidthCh={10}
                    />
                    <span className="mr-2">.</span>
                    <span className="mr-2">You can reach me at</span>
                    <InlineField
                      id={emailId}
                      label="Your email"
                      type="email"
                      value={email}
                      onChange={setEmail}
                      onBlur={() =>
                        setTouched((t) => ({ ...t, email: true }))
                      }
                      placeholder="you@company.com"
                      autoComplete="email"
                      required
                      invalid={touched.email && !emailValid}
                      minWidthCh={18}
                    />
                    <span>.</span>
                  </div>

                  <fieldset>
                    <legend
                      id={topicLabelId}
                      className="text-xs font-medium uppercase tracking-[0.22em] text-muted"
                    >
                      What can I help with?
                    </legend>
                    <div
                      role="radiogroup"
                      aria-labelledby={topicLabelId}
                      className="mt-5 flex flex-wrap gap-2"
                    >
                      {TOPICS.map((t) => {
                        const selected = topic === t;
                        return (
                          <button
                            key={t}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            onClick={() => setTopic(selected ? "" : t)}
                            className={[
                              "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2",
                              selected
                                ? "border-ink bg-ink text-paper shadow-soft"
                                : "border-line bg-paper text-ink hover:border-ink/40 hover:bg-paper-soft",
                            ].join(" ")}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div className="space-y-3">
                    <div className="flex items-baseline justify-between">
                      <label
                        htmlFor={messageId}
                        className="text-xs font-medium uppercase tracking-[0.22em] text-muted"
                      >
                        Here&apos;s what I&apos;m thinking
                      </label>
                      <span className="font-mono text-xs tabular-nums text-ink/40">
                        {message.length} / {MESSAGE_MAX}
                      </span>
                    </div>
                    <textarea
                      id={messageId}
                      value={message}
                      onChange={(e) =>
                        setMessage(e.target.value.slice(0, MESSAGE_MAX))
                      }
                      onBlur={() =>
                        setTouched((t) => ({ ...t, message: true }))
                      }
                      placeholder="A few sentences about the goal, timeline, and anything you've already tried…"
                      rows={7}
                      required
                      aria-invalid={touched.message && !messageValid}
                      className={[
                        "w-full resize-y rounded-2xl border bg-paper px-5 py-4 text-base leading-7 text-ink",
                        "placeholder:text-muted/60",
                        "transition-colors focus:outline-none focus:ring-0",
                        touched.message && !messageValid
                          ? "border-red-400 focus:border-red-500"
                          : "border-line focus:border-ink",
                      ].join(" ")}
                    />
                    {touched.message && !messageValid && (
                      <p className="text-sm text-red-600">
                        Tell me a bit more — at least a sentence or two.
                      </p>
                    )}
                  </div>

                  <div
                    aria-hidden="true"
                    className="absolute -left-[9999px] -top-[9999px] h-px w-px overflow-hidden"
                  >
                    <label htmlFor="website-trap">
                      Don&apos;t fill this out if you&apos;re human:
                    </label>
                    <input
                      id="website-trap"
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className={[
                        "group inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-medium transition-all",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2",
                        "disabled:cursor-not-allowed disabled:opacity-60",
                        "bg-ink text-paper shadow-soft hover:-translate-y-0.5 hover:bg-ink-soft hover:shadow-lifted",
                      ].join(" ")}
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2
                            className="h-4 w-4 animate-spin"
                            strokeWidth={2}
                          />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" strokeWidth={2} />
                          Send message
                          <ArrowUpRight
                            className="h-4 w-4 transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
                            strokeWidth={2}
                          />
                        </>
                      )}
                    </button>
                    <p className="text-sm text-muted">
                      Or email{" "}
                      <a
                        href={`mailto:${BUSINESS_EMAIL}`}
                        onClick={() =>
                          trackEvent("email_click", {
                            event_category: "lead",
                            event_label: "Contact form — inline fallback",
                          })
                        }
                        className="font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
                      >
                        {BUSINESS_EMAIL}
                      </a>{" "}
                      directly.
                    </p>
                  </div>

                  <AnimatePresence>
                    {status === "error" && (
                      <m.div
                        key="error"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        role="alert"
                        className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700"
                      >
                        {errorMsg ||
                          "Something went wrong. Please try again."}
                      </m.div>
                    )}
                  </AnimatePresence>
                </m.form>
              ) : (
                <m.div
                  key="success"
                  initial={
                    reduce
                      ? { opacity: 0 }
                      : { opacity: 0, y: 16, scale: 0.98 }
                  }
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, ease: easeOut }}
                  className="relative overflow-hidden rounded-3xl border border-line bg-paper-soft p-10 sm:p-14"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-accent-soft/10 blur-3xl"
                  />
                  <div className="relative flex flex-col gap-6">
                    <m.div
                      initial={
                        reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6 }
                      }
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.6,
                        ease: easeOut,
                        delay: 0.1,
                      }}
                      className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper"
                    >
                      <Check className="h-6 w-6" strokeWidth={2.25} />
                    </m.div>
                    <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl">
                      Message received,{" "}
                      <span className="text-muted">{trimmedName}.</span>
                    </h2>
                    <p className="max-w-xl text-pretty text-base leading-7 text-muted sm:text-lg">
                      I&apos;ll be in touch within a day, usually sooner. In
                      the meantime, take a look around — there&apos;s more to
                      see.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper shadow-soft transition-all hover:-translate-y-0.5 hover:bg-ink-soft hover:shadow-lifted"
                      >
                        Back to home
                        <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                      </Link>
                      <Link
                        href="/about"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-paper px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-mist"
                      >
                        Read about the studio
                      </Link>
                    </div>
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>

          <aside className="lg:col-span-4">
            <div className="space-y-px overflow-hidden rounded-3xl border border-line bg-line lg:sticky lg:top-28">
              <SidebarRow
                eyebrow="Direct"
                icon={<Mail className="h-4 w-4" strokeWidth={1.75} />}
              >
                <a
                  href={`mailto:${BUSINESS_EMAIL}`}
                  onClick={() =>
                    trackEvent("email_click", {
                      event_category: "lead",
                      event_label: "Contact page — sidebar",
                    })
                  }
                  className="block text-base font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink sm:text-lg"
                >
                  {BUSINESS_EMAIL}
                </a>
              </SidebarRow>
              <SidebarRow
                eyebrow="Response"
                icon={<Clock className="h-4 w-4" strokeWidth={1.75} />}
              >
                <p className="text-base font-medium text-ink sm:text-lg">
                  Within 24 hours
                </p>
                <p className="text-sm text-muted">Mon — Fri</p>
              </SidebarRow>
              <SidebarRow eyebrow="Status">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2.5 w-2.5">
                    {!reduce && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                    )}
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                  <p className="text-base font-medium text-ink sm:text-lg">
                    Currently accepting projects
                  </p>
                </div>
                <p className="text-sm text-muted">
                  Booking new work for the next quarter.
                </p>
              </SidebarRow>
            </div>

            <div className="mt-6 rounded-3xl border border-line bg-paper-soft p-6">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted">
                What happens next
              </p>
              <ol className="mt-4 space-y-3 text-sm text-muted">
                <li className="flex gap-3">
                  <span className="font-mono tabular-nums text-ink/40">
                    01
                  </span>
                  <span>I read every message personally.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono tabular-nums text-ink/40">
                    02
                  </span>
                  <span>
                    You get a thoughtful reply, not a templated form letter.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono tabular-nums text-ink/40">
                    03
                  </span>
                  <span>
                    If it&apos;s a fit, I&apos;ll set up a short call to dig in.
                  </span>
                </li>
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function InlineField({
  id,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  type = "text",
  autoComplete,
  required,
  invalid,
  minWidthCh = 10,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  type?: "text" | "email";
  autoComplete?: string;
  required?: boolean;
  invalid?: boolean;
  minWidthCh?: number;
}) {
  return (
    <span className="relative inline-block align-baseline">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={invalid}
        spellCheck={false}
        style={{ minWidth: `${minWidthCh}ch` }}
        className={[
          "inline-block max-w-full bg-transparent px-1 pb-1 align-baseline outline-none",
          "border-b-2 transition-colors",
          "placeholder:text-muted/40",
          invalid
            ? "border-red-400 focus:border-red-500"
            : "border-line focus:border-ink",
        ].join(" ")}
      />
    </span>
  );
}

function SidebarRow({
  eyebrow,
  icon,
  children,
}: {
  eyebrow: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-paper p-6 sm:p-7">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-muted">
        {icon ? <span className="text-ink/60">{icon}</span> : null}
        <span>{eyebrow}</span>
      </div>
      <div className="mt-3 space-y-1">{children}</div>
    </div>
  );
}
