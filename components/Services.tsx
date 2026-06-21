import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import ServiceIcon from "@/components/ServiceIcon";
import type { IconKey } from "@/lib/services";

type HomepageService = {
  name: string;
  summary: string;
  href: string;
  icon: IconKey;
};

/**
 * Homepage service grid — business-outcome copy for small business owners.
 * Links into dedicated SEO service pages where they exist.
 */
const HOMEPAGE_SERVICES: HomepageService[] = [
  {
    name: "Small Business Website Design",
    summary:
      "A modern site that explains what you do, builds trust, and makes it easy to contact you.",
    href: "/services/small-business-website-design",
    icon: "globe",
  },
  {
    name: "Website Redesign",
    summary:
      "Refresh an outdated site so it looks current, loads fast, and converts more visitors into leads.",
    href: "/services/website-redesign",
    icon: "refresh",
  },
  {
    name: "SEO & Google Visibility Setup",
    summary:
      "Titles, structure, and technical basics so Google understands your business and sends the right traffic.",
    href: "/services/seo-setup-for-small-business",
    icon: "search",
  },
  {
    name: "Google Business Profile Setup",
    summary:
      "Profile setup and optimization so local customers find you on Maps and search.",
    href: "/services/seo-setup-for-small-business",
    icon: "map",
  },
  {
    name: "Booking & Contact Forms",
    summary:
      "Clear inquiry and appointment flows — fewer missed leads and less manual follow-up.",
    href: "/services/website-with-booking-system",
    icon: "calendar",
  },
  {
    name: "WhatsApp Integration",
    summary:
      "One-tap WhatsApp buttons so mobile visitors can message you without hunting for a number.",
    href: "/services/website-with-whatsapp-integration",
    icon: "whatsapp",
  },
  {
    name: "AI Chatbots & Automation",
    summary:
      "Practical AI tools that answer common questions, capture leads, and cut repetitive admin work.",
    href: "/services/ai-automation-for-small-business",
    icon: "bot",
  },
  {
    name: "Website Speed Optimization",
    summary:
      "Faster load times on mobile — better Google scores and fewer visitors leaving before they act.",
    href: "/services/website-redesign",
    icon: "zap",
  },
];

export default function Services() {
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
            More leads. Less manual work.
          </h2>
          <p className="mt-5 text-pretty text-base leading-7 text-muted sm:text-lg">
            Websites, SEO, Google visibility, booking flows, WhatsApp, and
            practical AI — built for small businesses that need results, not
            jargon.
          </p>
        </header>

        <ul
          role="list"
          className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
        >
          {HOMEPAGE_SERVICES.map((s) => (
            <li key={s.name}>
              <Link
                href={s.href}
                className="group flex h-full flex-col bg-paper p-6 transition-colors hover:bg-paper-soft sm:p-7"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-ink transition-colors group-hover:bg-ink group-hover:text-paper">
                  <ServiceIcon icon={s.icon} className="h-5 w-5" />
                </span>
                <span className="mt-5 flex items-center gap-1.5 text-base font-semibold tracking-tight text-ink sm:text-[17px]">
                  {s.name}
                  <ArrowUpRight
                    aria-hidden
                    className="h-4 w-4 flex-none text-muted transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
                    strokeWidth={2}
                  />
                </span>
                <span className="mt-2 text-[15px] leading-6 text-muted">
                  {s.summary}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 rounded-full border border-line bg-paper px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-mist"
          >
            Explore all services
            <ArrowRight
              aria-hidden
              className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
