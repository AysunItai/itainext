"use client";

import { m, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

export default function CTA() {
  const reduce = useReducedMotion();

  return (
    <section
      id="contact"
      aria-labelledby="cta-title"
      className="relative scroll-mt-24 px-5 py-16 sm:px-8 sm:py-28"
    >
      <m.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-[28px] border border-line bg-ink p-10 text-paper sm:rounded-[32px] sm:p-16"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent_75%)]"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/40 blur-3xl" />
          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-accent-soft/30 blur-3xl" />
        </div>

        <div className="relative max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-paper/60">
            Let&apos;s build
          </p>
          <h2
            id="cta-title"
            className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            Have a project in mind? <br className="hidden sm:block" />
            <span className="text-paper/70">Let&apos;s talk.</span>
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-paper/70 sm:text-lg">
            Tell me about your business and what you&apos;d like to build.
            I&apos;ll get back within one working day with thoughts and a
            clear next step.
          </p>

          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-paper px-7 py-3.5 text-sm font-medium text-ink transition-all hover:-translate-y-0.5 hover:shadow-lifted"
            >
              <Mail aria-hidden className="h-4 w-4" strokeWidth={2} />
              Start a conversation
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
                strokeWidth={2}
              />
            </Link>
            <Link
              href="mailto:info@itaiwebsolutions.com"
              onClick={() =>
                trackEvent("email_click", {
                  event_category: "lead",
                  event_label: "Homepage CTA",
                })
              }
              className="inline-flex items-center justify-center gap-2 rounded-full border border-paper/20 px-7 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-paper/5"
            >
              info@itaiwebsolutions.com
            </Link>
          </div>
        </div>
      </m.div>
    </section>
  );
}
