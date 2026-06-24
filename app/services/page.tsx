import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import InlineCTA from "@/components/InlineCTA";
import ServiceIcon from "@/components/ServiceIcon";
import { SERVICES, SERVICES_FAQ } from "@/lib/services";
import {
  breadcrumbLd,
  faqPageLd,
  jsonLdScriptProps,
  professionalServiceLd,
} from "@/lib/structured-data";
import { SITE_URL } from "@/lib/site-url";
import { buildAlternates } from "@/lib/i18n";

const DESCRIPTION =
  "Websites, booking systems, WhatsApp contact, SEO setup, and practical AI automation for small businesses. Work remotely with clients in the US, UK, Europe, and Israel.";

export const metadata: Metadata = {
  title: "Services",
  description: DESCRIPTION,
  alternates: buildAlternates("en", "services"),
  openGraph: {
    title: "Services · ITAI",
    description: DESCRIPTION,
    url: "/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services · ITAI",
    description: DESCRIPTION,
  },
};

export default function ServicesPage() {
  const pageUrl = `${SITE_URL}/services`;

  return (
    <main id="main" className="relative">
      <script {...jsonLdScriptProps(professionalServiceLd())} />
      <script {...jsonLdScriptProps(faqPageLd(SERVICES_FAQ, pageUrl))} />
      <script
        {...jsonLdScriptProps(
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        )}
      />

      {/* Hero */}
      <section
        aria-labelledby="services-hero-title"
        className="relative isolate overflow-hidden px-5 pt-32 pb-16 sm:px-8 sm:pt-40 sm:pb-20"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(30,58,138,0.07),transparent_70%)]"
        />
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted">
            Services
          </p>
          <h1
            id="services-hero-title"
            className="mt-5 text-balance text-4xl font-semibold tracking-[-0.035em] text-ink sm:text-5xl"
          >
            Modern digital systems for small businesses.
          </h1>
          <p className="mt-6 text-pretty text-lg leading-8 text-muted">
            ITAI Web Solutions helps small businesses build modern websites,
            booking systems, WhatsApp contact flows, SEO-ready pages,
            dashboards, and practical AI automation — so you get more leads and
            spend less time on manual work.
          </p>
          <p className="mt-4 text-pretty text-[15px] leading-7 text-muted">
            I work remotely with small businesses, consultants, and founders in
            the US, UK, Europe, Israel, and beyond.
          </p>
        </div>
      </section>

      {/* Service menu */}
      <section
        aria-label="All services"
        className="relative border-t border-line px-5 py-16 sm:px-8 sm:py-20"
      >
        <div className="mx-auto max-w-5xl">
          <ul
            role="list"
            className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2"
          >
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col bg-paper p-7 transition-colors hover:bg-paper-soft sm:p-8"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-ink transition-colors group-hover:bg-ink group-hover:text-paper">
                    <ServiceIcon icon={s.icon} className="h-5 w-5" />
                  </span>
                  <span className="mt-6 flex items-center gap-1.5 text-lg font-semibold tracking-tight text-ink">
                    {s.name}
                    <ArrowUpRight
                      aria-hidden
                      className="h-4 w-4 text-muted transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
                      strokeWidth={2}
                    />
                  </span>
                  <span className="mt-2.5 text-[15px] leading-7 text-muted">
                    {s.cardSummary}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section
        aria-labelledby="services-faq-title"
        className="relative border-t border-line px-5 py-16 sm:px-8 sm:py-24"
      >
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted">
            FAQ
          </p>
          <h2
            id="services-faq-title"
            className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl"
          >
            Questions small businesses ask
          </h2>
          <dl className="mt-8 divide-y divide-line border-y border-line">
            {SERVICES_FAQ.map((faq) => (
              <div key={faq.question} className="py-5">
                <dt className="text-base font-semibold text-ink">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-[15px] leading-7 text-muted">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Closing CTA */}
      <InlineCTA
        variant="bold"
        eyebrow="Ready when you are"
        heading="Not sure which service you need?"
        description="Book a free 15-minute consultation and we'll figure out the right fit together — no pressure, no jargon."
        location="services_hub"
      />
    </main>
  );
}
