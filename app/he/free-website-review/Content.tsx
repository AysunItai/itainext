"use client";

import { m, useReducedMotion } from "framer-motion";
import { Check, Globe, Loader2, Send } from "lucide-react";
import Link from "next/link";
import { useId, useState, type FormEvent } from "react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const REVIEW_POINTS = [
  "רושם ראשוני ומסר מרכזי",
  "מובייל וחוויית משתמש",
  "טפסי יצירת קשר ווואטסאפ",
  "נראות בסיסית בגוגל",
  "אמון, מקצועיות וקריאה לפעולה",
] as const;

const GOAL_OPTIONS = [
  "יותר פניות",
  "עיצוב טוב יותר",
  "נראות בגוגל",
  "טופס יצירת קשר / הזמנות",
  "אוטומציה או AI",
  "לא בטוחה עדיין",
] as const;

type Goal = (typeof GOAL_OPTIONS)[number];
type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE =
  /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/i;

export default function HebrewFreeReviewContent() {
  const reduce = useReducedMotion();
  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const websiteId = useId();
  const goalId = useId();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [goal, setGoal] = useState<Goal | "">("");
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
  const trimmedPhone = phone.trim();
  const trimmedWebsite = websiteUrl.trim();

  const isValid =
    trimmedName.length >= 2 &&
    EMAIL_RE.test(trimmedEmail) &&
    trimmedWebsite.length >= 4 &&
    URL_RE.test(trimmedWebsite);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValid || status === "submitting") return;

    setStatus("submitting");
    setErrorMsg("");

    const messageParts = [
      `Website: ${trimmedWebsite}`,
      trimmedPhone ? `Phone/WhatsApp: ${trimmedPhone}` : "",
      goal ? `Goal: ${goal}` : "",
    ].filter(Boolean);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          topic: "Hebrew free website review",
          message: messageParts.join("\n"),
          website: honeypot,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data?.error ?? "משהו השתבש. נסי שוב בעוד רגע.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("לא הצלחנו להתחבר לשרת. בדקי את החיבור ונסי שוב.");
    }
  }

  if (status === "success") {
    return (
      <main id="main" className="relative">
        <section className="flex min-h-[70vh] items-center px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper">
              <Check className="h-6 w-6" strokeWidth={2.25} aria-hidden />
            </div>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
              התקבל
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              תודה — קיבלתי את הבקשה שלך
            </h1>
            <p className="mt-5 text-pretty text-base leading-7 text-muted">
              אבדוק את האתר ואחזור אלייך עם הצעות מעשיות לשיפור, בדרך כלל תוך
              יום עסקים אחד.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/he/book"
                className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-paper"
              >
                קביעת שיחת היכרות
              </Link>
              <Link
                href="/he"
                className="inline-flex items-center justify-center rounded-full border border-line px-6 py-3.5 text-sm font-medium text-ink hover:bg-mist"
              >
                חזרה לדף הבית
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main id="main" className="relative">
      <section
        aria-labelledby="he-review-hero"
        className="relative isolate overflow-hidden px-5 pt-32 pb-12 sm:px-8 sm:pt-44 sm:pb-16"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(30,58,138,0.08),transparent_70%)]"
        />

        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
            בדיקה בחינם
          </p>
          <h1
            id="he-review-hero"
            className="mt-5 text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
          >
            בדיקת אתר בחינם לעסק שלך
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
            שלחי לי את כתובת האתר שלך ואחזיר לך הצעות מעשיות לשיפור — מה יכול
            למנוע מאנשים לפנות אלייך, איך האתר נראה במובייל, ומה כדאי לתקן
            קודם.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <m.aside {...fade(0)} className="lg:col-span-5">
            <h2 className="text-xl font-semibold tracking-tight text-ink">
              הבדיקה כוללת:
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
                  <span className="text-[15px] leading-6 text-muted">{point}</span>
                </li>
              ))}
            </ul>
          </m.aside>

          <m.div {...fade(0.08)} className="lg:col-span-7">
            <div className="rounded-3xl border border-line bg-paper-soft p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <Field label="שם" id={nameId}>
                  <input
                    id={nameId}
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-line bg-paper px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-ink/30"
                    placeholder="השם שלך"
                  />
                </Field>

                <Field label="אימייל" id={emailId}>
                  <input
                    id={emailId}
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-line bg-paper px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-ink/30"
                    placeholder="you@business.com"
                    dir="ltr"
                  />
                </Field>

                <Field label="טלפון / וואטסאפ" id={phoneId}>
                  <input
                    id={phoneId}
                    name="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-line bg-paper px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-ink/30"
                    placeholder="050-0000000"
                    dir="ltr"
                  />
                </Field>

                <Field label="כתובת האתר" id={websiteId}>
                  <div className="relative mt-2">
                    <Globe
                      aria-hidden
                      className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                      strokeWidth={2}
                    />
                    <input
                      id={websiteId}
                      name="website_url"
                      type="url"
                      required
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      className="w-full rounded-xl border border-line bg-paper py-3 pl-4 pr-11 text-[15px] text-ink outline-none transition-colors focus:border-ink/30"
                      placeholder="https://yourbusiness.com"
                      dir="ltr"
                    />
                  </div>
                </Field>

                <Field label="מה תרצי לשפר?" id={goalId}>
                  <select
                    id={goalId}
                    name="goal"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value as Goal | "")}
                    className="mt-2 w-full rounded-xl border border-line bg-paper px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-ink/30"
                  >
                    <option value="">בחרי אפשרות</option>
                    {GOAL_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </Field>

                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="absolute -left-[9999px] h-px w-px overflow-hidden"
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
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                      שולחת…
                    </>
                  ) : (
                    <>
                      שליחת האתר לבדיקה
                      <Send
                        aria-hidden
                        className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-0.5"
                      />
                    </>
                  )}
                </button>
              </form>
            </div>
          </m.div>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      {children}
    </div>
  );
}
