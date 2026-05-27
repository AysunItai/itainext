"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import Link from "next/link";

type Plan = {
  id: string;
  name: string;
  description: string;
  price: string;
  priceUnit?: string;
  priceNote: string;
  features: string[];
  cta: string;
  href: string;
  badge?: string;
  featured?: boolean;
};

const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter Website",
    description:
      "For small businesses needing a modern, professional online presence.",
    price: "699",
    priceUnit: "$",
    priceNote: "USD · One-time",
    features: [
      "3–5 custom-designed pages",
      "Mobile-first responsive design",
      "Contact form + WhatsApp integration",
      "Basic SEO setup",
      "Fast delivery — 2 to 3 weeks",
    ],
    cta: "Book consultation",
    href: "/book?plan=starter",
  },
  {
    id: "pro",
    name: "Business Website Pro",
    description:
      "For businesses needing bookings, automation, and a stronger online presence.",
    price: "1,499",
    priceUnit: "$",
    priceNote: "USD · One-time",
    features: [
      "Custom website design",
      "Booking & calendar integration",
      "Advanced forms & lead capture",
      "Analytics & SEO optimization",
      "Blog setup",
      "Priority support",
    ],
    cta: "Book consultation",
    href: "/book?plan=pro",
    badge: "Most popular",
    featured: true,
  },
  {
    id: "custom",
    name: "Custom Development",
    description:
      "Bespoke systems, dashboards, automation, and AI-powered workflows.",
    price: "Tailored",
    priceNote: "Quote on call",
    features: [
      "Custom backend systems",
      "API integrations",
      "Automation workflows",
      "Dashboards & internal portals",
      "AI integrations",
      "Scalable architecture",
    ],
    cta: "Book consultation",
    href: "/book?plan=custom",
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
      className="relative scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-12">
          <motion.div {...fade(0)} className="md:col-span-5">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-muted">
              Pricing · 03 / 03
            </p>
            <h2
              id="pricing-title"
              className="mt-4 text-balance text-4xl font-semibold tracking-[-0.035em] text-ink sm:text-5xl"
            >
              Clear pricing.{" "}
              <span className="text-muted">No surprises.</span>
            </h2>
          </motion.div>
          <motion.p
            {...fade(0.1)}
            className="md:col-span-6 md:col-start-7 max-w-2xl text-pretty text-lg leading-8 text-muted sm:text-xl"
          >
            Three starting points designed for clarity. Every plan can be
            tailored — you only pay for what you actually need.
          </motion.p>
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

        <motion.p
          {...fade(0.4)}
          className="mt-10 text-center text-sm text-muted"
        >
          All plans include code ownership, hosting setup guidance, and a
          30-day post-launch support window.
        </motion.p>
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
  const isTailored = plan.price === "Tailored";

  return (
    <motion.li
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
              "text-2xl font-semibold tracking-[-0.02em]",
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
        <div className="flex items-baseline gap-1">
          {plan.priceUnit && (
            <span
              className={[
                "text-2xl font-medium",
                isFeatured ? "text-paper/80" : "text-ink/60",
              ].join(" ")}
            >
              {plan.priceUnit}
            </span>
          )}
          <span
            className={[
              "font-semibold tracking-[-0.04em]",
              isTailored ? "text-5xl italic sm:text-6xl" : "text-6xl sm:text-7xl",
              isFeatured ? "text-paper" : "text-ink",
            ].join(" ")}
          >
            {plan.price}
          </span>
        </div>
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
        href={plan.href}
        aria-label={`${plan.cta} for ${plan.name}`}
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
    </motion.li>
  );
}
