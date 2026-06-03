"use client";

import { m, useReducedMotion } from "framer-motion";
import {
  BarChart3,
  Bot,
  CalendarCheck,
  Globe,
  Layers,
  Workflow,
  type LucideIcon,
} from "lucide-react";

type Service = {
   icon: LucideIcon;
  title: string;
  description: string;
  bullets: string[];
};

const SERVICES: Service[] = [
  {
    icon: Globe,
    title: "Custom websites",
    description:
      "Conversion-focused marketing sites engineered with Next.js, designed to feel fast everywhere.",
    bullets: ["Performance budgets", "CMS-ready", "SEO baseline"],
  },
  {
    icon: Bot,
    title: "AI automation",
    description:
      "Workflows, agents, and intake systems that quietly take repetitive work off your plate.",
    bullets: ["LLM integrations", "RAG pipelines", "Human-in-the-loop"],
  },
  {
    icon: CalendarCheck,
    title: "Booking systems",
    description:
      "Reliable scheduling with calendar sync, payments, reminders, and cancellation rules.",
    bullets: ["Stripe-ready", "Calendar sync", "Notifications"],
  },
  {
    icon: BarChart3,
    title: "Dashboards",
    description:
      "Operational and analytics dashboards that turn raw data into decisions your team trusts.",
    bullets: ["Realtime data", "Role-based access", "Exportable views"],
  },
  {
    icon: Workflow,
    title: "Internal tools",
    description:
      "Custom CRMs, admin panels, and ops tools that fit how your business actually works.",
    bullets: ["Auth & roles", "Audit trails", "Workflow design"],
  },
  {
    icon: Layers,
    title: "Web infrastructure",
    description:
      "Edge-deployed, type-safe stacks built to scale without rewrites a year from now.",
    bullets: ["Edge runtime", "Observability", "CI/CD"],
  },
];

export default function Services() {
  const reduce = useReducedMotion();

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="relative scroll-mt-24 px-5 py-16 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted">
            What I build
          </p>
          <h2
            id="services-title"
            className="mt-4 text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
          >
            One engineer, end to end.
          </h2>
          <p className="mt-5 text-pretty text-base leading-7 text-muted sm:text-lg">
            From the first pixel to the last deploy, I ship work that looks
            premium and behaves like infrastructure.
          </p>
        </header>

        <ul
          role="list"
          className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((s, i) => (
            <m.li
              key={s.title}
              initial={
                reduce ? { opacity: 0 } : { opacity: 0, y: 16 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.55,
                delay: reduce ? 0 : i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative bg-paper p-7 transition-colors hover:bg-paper-soft sm:p-8"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-ink transition-colors group-hover:bg-ink group-hover:text-paper">
                <s.icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="mt-6 text-lg font-semibold tracking-tight text-ink">
                {s.title}
              </h3>
              <p className="mt-2.5 text-[15px] leading-7 text-muted">
                {s.description}
              </p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {s.bullets.map((b) => (
                  <li
                    key={b}
                    className="rounded-full border border-line bg-paper px-2.5 py-1 text-xs font-medium text-muted"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </m.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
