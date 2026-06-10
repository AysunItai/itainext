import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import ServiceIcon from "@/components/ServiceIcon";
import { SERVICES } from "@/lib/services";

/**
 * Homepage services section.
 *
 * Server component (no state, no event handlers) so it ships zero JS. The
 * cards are real links into the individual SEO service pages, which both
 * helps visitors navigate and gives Google clear internal links to the
 * service pages from the homepage.
 *
 * The intro carries the plain-language positioning sentence (who I help +
 * what I build) so the page reads clearly within a few seconds — and so
 * search engines get an honest summary of the services without keyword
 * stuffing.
 */
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
            Services for small businesses.
          </h2>
          <p className="mt-5 text-pretty text-base leading-7 text-muted sm:text-lg">
            ITAI Web Solutions helps small businesses build modern websites,
            booking systems, WhatsApp contact flows, SEO-ready pages,
            dashboards, and practical AI automation — so you get more leads and
            spend less time on manual work.
          </p>
          <p className="mt-3 text-pretty text-[15px] leading-7 text-muted">
            I work remotely with small businesses, consultants, and founders in
            the US, UK, Europe, Israel, and beyond.
          </p>
        </header>

        <ul
          role="list"
          className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
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
