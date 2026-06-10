import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import InlineCTA from "@/components/InlineCTA";
import InlineCTAActions from "@/components/InlineCTAActions";
import ServiceIcon from "@/components/ServiceIcon";
import { SERVICES, getRelatedServices, getService } from "@/lib/services";
import {
  breadcrumbLd,
  faqPageLd,
  jsonLdScriptProps,
  serviceLd,
} from "@/lib/structured-data";
import { SITE_URL } from "@/lib/site-url";

// Statically generate one page per service at build time — no runtime DB or
// API work, so these pages are as light as a static file (keeps PageSpeed
// untouched). Unlisted slugs fall through to notFound().
export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  const canonical = `/services/${service.slug}`;
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: `${service.metaTitle} · ITAI`,
      description: service.metaDescription,
      url: canonical,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.metaTitle} · ITAI`,
      description: service.metaDescription,
    },
  };
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = getRelatedServices(service);
  const pageUrl = `${SITE_URL}/services/${service.slug}`;

  return (
    <main id="main" className="relative">
      <script
        {...jsonLdScriptProps(
          serviceLd({
            name: service.name,
            slug: service.slug,
            description: service.metaDescription,
          }),
        )}
      />
      <script
        {...jsonLdScriptProps(faqPageLd(service.faqs, pageUrl))}
      />
      <script
        {...jsonLdScriptProps(
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.name, path: `/services/${service.slug}` },
          ]),
        )}
      />

      {/* Hero */}
      <section
        aria-labelledby="service-title"
        className="relative isolate overflow-hidden px-5 pt-32 pb-16 sm:px-8 sm:pt-40 sm:pb-20"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(30,58,138,0.07),transparent_70%)]"
        />
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs current={service.name} />

          <div className="mt-8 flex h-12 w-12 items-center justify-center rounded-xl bg-mist text-ink">
            <ServiceIcon icon={service.icon} className="h-5 w-5" />
          </div>

          <h1
            id="service-title"
            className="mt-6 text-balance text-4xl font-semibold tracking-[-0.035em] text-ink sm:text-5xl"
          >
            {service.h1}
          </h1>
          <p className="mt-5 text-pretty text-lg leading-8 text-muted">
            {service.intro}
          </p>

          <div className="mt-8">
            <InlineCTAActions location="service_page" isBold={false} />
          </div>
        </div>
      </section>

      {/* Problem + Solution */}
      <section className="relative border-t border-line px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-3xl gap-12 sm:gap-16">
          <Block eyebrow="The problem" heading="What's getting in the way">
            <p>{service.problem}</p>
          </Block>
          <Block eyebrow="The solution" heading="How I help">
            <p>{service.solution}</p>
          </Block>
        </div>
      </section>

      {/* What's included */}
      <section className="relative border-t border-line px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>What's included</Eyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
            Everything you get
          </h2>
          <ul role="list" className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {service.includes.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-line bg-paper-soft px-4 py-3.5 text-[15px] leading-6 text-ink"
              >
                <Check
                  aria-hidden
                  className="mt-0.5 h-4 w-4 flex-none text-accent"
                  strokeWidth={2.25}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Who it's best for */}
      <section className="relative border-t border-line px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>Who it's best for</Eyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
            A good fit if you&apos;re&hellip;
          </h2>
          <ul role="list" className="mt-8 space-y-3">
            {service.bestFor.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[15px] leading-7 text-muted"
              >
                <ArrowRight
                  aria-hidden
                  className="mt-1 h-4 w-4 flex-none text-ink/40"
                  strokeWidth={2}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process / timeline */}
      <section className="relative border-t border-line px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
            A simple, transparent process
          </h2>
          <ol className="mt-8 space-y-px overflow-hidden rounded-2xl border border-line bg-line">
            {service.process.map((step, i) => (
              <li
                key={step.title}
                className="flex gap-5 bg-paper p-6 sm:p-7"
              >
                <span className="font-mono text-sm tabular-nums text-ink/35">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-7 text-muted">
                    {step.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section
        aria-labelledby="service-faq-title"
        className="relative border-t border-line px-5 py-16 sm:px-8 sm:py-24"
      >
        <div className="mx-auto max-w-3xl">
          <Eyebrow>FAQ</Eyebrow>
          <h2
            id="service-faq-title"
            className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl"
          >
            Common questions
          </h2>
          <dl className="mt-8 divide-y divide-line border-y border-line">
            {service.faqs.map((faq) => (
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

      {/* Related services */}
      {related.length > 0 ? (
        <section className="relative border-t border-line px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <Eyebrow>Related services</Eyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
              You might also need
            </h2>
            <ul role="list" className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/services/${r.slug}`}
                    className="group flex h-full items-start gap-4 rounded-2xl border border-line bg-paper p-5 transition-colors hover:border-ink/20 hover:bg-paper-soft"
                  >
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-mist text-ink transition-colors group-hover:bg-ink group-hover:text-paper">
                      <ServiceIcon icon={r.icon} className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="flex items-center gap-1 text-[15px] font-semibold text-ink">
                        {r.name}
                        <ArrowUpRight
                          aria-hidden
                          className="h-3.5 w-3.5 text-muted transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
                          strokeWidth={2}
                        />
                      </span>
                      <span className="mt-1 block text-[13px] leading-6 text-muted">
                        {r.cardSummary}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">
              See the full{" "}
              <Link
                href="/services"
                className="font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
              >
                services overview
              </Link>
              .
            </p>
          </div>
        </section>
      ) : null}

      {/* Closing CTA */}
      <InlineCTA
        variant="bold"
        eyebrow="Let's talk"
        heading="Book a free consultation"
        description="I work remotely with small businesses, consultants, and founders in the US, UK, Europe, Israel, and beyond. Tell me what you need and I'll tell you honestly how I can help."
        location="service_page"
      />
    </main>
  );
}

function Breadcrumbs({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-xs text-muted">
        <li>
          <Link href="/" className="transition-colors hover:text-ink">
            Home
          </Link>
        </li>
        <li aria-hidden className="text-line">
          /
        </li>
        <li>
          <Link href="/services" className="transition-colors hover:text-ink">
            Services
          </Link>
        </li>
        <li aria-hidden className="text-line">
          /
        </li>
        <li aria-current="page" className="text-ink">
          {current}
        </li>
      </ol>
    </nav>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted">
      {children}
    </p>
  );
}

function Block({
  eyebrow,
  heading,
  children,
}: {
  eyebrow: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
        {heading}
      </h2>
      <div className="mt-5 text-pretty text-lg leading-8 text-muted">
        {children}
      </div>
    </div>
  );
}
