"use client";

import { m, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { trackFreeReviewClick } from "@/lib/analytics";

type Plan = {
  id: string;
  name: string;
  description: string;
  price: string;
  priceNote: string;
  features: string[];
  cta: string;
  badge?: string;
  featured?: boolean;
};

const PLANS: Plan[] = [
  {
    id: "quick-fix",
    name: "Quick Website Fix",
    description:
      "Targeted fixes when something specific is broken or hurting leads.",
    price: "$300–$500",
    priceNote: "USD · Scoped to the issue",
    features: [
      "Mobile layout or contact-form fixes",
      "WhatsApp or click-to-call setup",
      "Speed tweaks on key pages",
      "SEO title & description cleanup",
      "Small copy or trust-signal updates",
    ],
    cta: "Get Free Website Review",
  },
  {
    id: "refresh",
    name: "Landing Page / Website Refresh",
    description:
      "A sharper first impression — modern design, clearer offer, better conversion.",
    price: "$750–$1,200",
    priceNote: "USD · One-time project",
    features: [
      "Homepage or landing page redesign",
      "Mobile-first responsive layout",
      "Contact & WhatsApp integration",
      "Basic SEO setup",
      "Fast delivery — typically 2–3 weeks",
    ],
    cta: "Get Free Website Review",
    badge: "Most popular",
    featured: true,
  },
  {
    id: "full",
    name: "Full Website + SEO Setup",
    description:
      "A complete lead-generation site with Google visibility built in from day one.",
    price: "$1,500–$3,000",
    priceNote: "USD · Depends on scope",
    features: [
      "Multi-page custom website",
      "Booking or inquiry flows",
      "SEO & Google visibility setup",
      "Google Business Profile guidance",
      "AI chatbot or automation (if needed)",
      "Post-launch support window",
    ],
    cta: "Get Free Website Review",
  },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function Pricing() {
  const reduce = useReducedMotion();

  const fade = (delay = 0) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, ease: easeOut, delay },
  });

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="relative scroll-mt-24 px-5 py-16 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-12">
          <m.div {...fade(0)} className="md:col-span-5">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-muted">
              Packages · Starting points
            </p>
            <h2
              id="pricing-title"
              className="mt-4 text-balance text-4xl font-semibold tracking-[-0.035em] text-ink sm:text-5xl"
            >
              Simple packages.{" "}
              <span className="text-muted">Clear ranges.</span>
            </h2>
          </m.div>
          <m.p
            {...fade(0.1)}
            className="md:col-span-6 md:col-start-7 max-w-2xl text-pretty text-lg leading-8 text-muted sm:text-xl"
          >
            Every business is different — these are typical starting ranges. After
            a free review, I&apos;ll recommend the smallest fix that actually moves
            the needle.
          </m.p>
        </div>

        <ul
          role="list"
          className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch"
        >
          {PLANS.map((plan, i) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              index={i}
              reduce={Boolean(reduce)}
            />
          ))}
        </ul>

        <m.p
          {...fade(0.4)}
          className="mt-10 text-center text-sm text-muted"
        >
          Final price depends on pages, integrations, and content. You always
          get a clear quote before any work begins.
        </m.p>
      </div>
    </section>
  );
}

function PricingCard({
  plan,
  index,
  reduce,
}: {
  plan: Plan;
  index: number;
  reduce: boolean;
}) {
  const isFeatured = plan.featured;

  return (
    <m.li
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: easeOut, delay: index * 0.08 }}
      className={[
        "relative flex flex-col overflow-hidden rounded-3xl p-8 sm:p-10",
        "transition-all duration-300",
        isFeatured
          ? "bg-ink text-paper shadow-lifted lg:-translate-y-2"
          : "border border-line bg-paper-soft text-ink hover:-translate-y-1 hover:border-ink/20 hover:shadow-soft",
      ].join(" ")}
    >
      {isFeatured && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent_75%)]"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-accent-soft/20 blur-3xl" />
        </div>
      )}

      <div className="relative">
        <div className="flex flex-wrap items-center gap-3">
          <h3
            className={[
              "text-xl font-semibold tracking-[-0.02em] sm:text-2xl",
              isFeatured ? "text-paper" : "text-ink",
            ].join(" ")}
          >
            {plan.name}
          </h3>
          {plan.badge && (
            <span
              className={[
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em]",
                isFeatured
                  ? "bg-paper/10 text-paper ring-1 ring-paper/20"
                  : "bg-accent/10 text-accent ring-1 ring-accent/20",
              ].join(" ")}
            >
              <Sparkles aria-hidden className="h-3 w-3" strokeWidth={2} />
              {plan.badge}
            </span>
          )}
        </div>

        <p
          className={[
            "mt-3 text-pretty text-sm leading-6",
            isFeatured ? "text-paper/70" : "text-muted",
          ].join(" ")}
        >
          {plan.description}
        </p>
      </div>

      <div className="relative mt-8">
        <span
          className={[
            "text-3xl font-semibold tracking-[-0.03em] sm:text-4xl",
            isFeatured ? "text-paper" : "text-ink",
          ].join(" ")}
        >
          {plan.price}
        </span>
        <p
          className={[
            "mt-2 font-mono text-xs uppercase tracking-[0.18em]",
            isFeatured ? "text-paper/70" : "text-muted",
          ].join(" ")}
        >
          {plan.priceNote}
        </p>
      </div>

      <div
        className={[
          "my-8 h-px",
          isFeatured ? "bg-paper/15" : "bg-line",
        ].join(" ")}
      />

      <ul role="list" className="relative space-y-3.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <span
              className={[
                "mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full",
                isFeatured
                  ? "bg-paper/10 text-paper"
                  : "bg-ink/5 text-ink/70",
              ].join(" ")}
            >
              <Check aria-hidden className="h-3 w-3" strokeWidth={2.75} />
            </span>
            <span
              className={[
                "text-[15px] leading-6",
                isFeatured ? "text-paper/85" : "text-ink/80",
              ].join(" ")}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <div className="relative flex-1" aria-hidden />

      <Link
        href="/free-website-review"
        aria-label={`${plan.cta} for ${plan.name}`}
        onClick={() =>
          trackFreeReviewClick({ button_location: "pricing_card" })
        }
        className={[
          "group relative mt-10 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-all",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          isFeatured
            ? "bg-paper text-ink hover:-translate-y-0.5 hover:shadow-lifted focus-visible:ring-paper focus-visible:ring-offset-ink"
            : "bg-ink text-paper hover:-translate-y-0.5 hover:bg-ink-soft hover:shadow-lifted focus-visible:ring-ink",
        ].join(" ")}
      >
        {plan.cta}
        <ArrowUpRight
          aria-hidden
          className="h-4 w-4 transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
          strokeWidth={2}
        />
      </Link>
    </m.li>
  );
}
