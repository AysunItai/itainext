import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import ServiceIcon from "@/components/ServiceIcon";
import { getHomeCopy } from "@/lib/home-copy";
import type { Locale } from "@/lib/i18n";
import type { IconKey } from "@/lib/services";

const SERVICE_ICONS: IconKey[] = [
  "globe",
  "refresh",
  "search",
  "map",
  "calendar",
  "whatsapp",
  "bot",
  "zap",
];

export default function Services({ locale = "en" }: { locale?: Locale }) {
  const copy = getHomeCopy(locale).services;
  const isHe = locale === "he";

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="relative scroll-mt-24 px-5 py-16 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted">
            {copy.eyebrow}
          </p>
          <h2
            id="services-title"
            className="mt-4 text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
          >
            {copy.title}
          </h2>
          <p className="mt-5 text-pretty text-base leading-7 text-muted sm:text-lg">
            {copy.subtitle}
          </p>
        </header>

        <ul
          role="list"
          className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
        >
          {copy.items.map((s, i) => (
            <li key={s.name}>
              <Link
                href={s.href}
                className="group flex h-full flex-col bg-paper p-6 transition-colors hover:bg-paper-soft sm:p-7"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-ink transition-colors group-hover:bg-ink group-hover:text-paper">
                  <ServiceIcon
                    icon={SERVICE_ICONS[i] ?? "globe"}
                    className="h-5 w-5"
                  />
                </span>
                <span className="mt-5 flex items-center gap-1.5 text-base font-semibold tracking-tight text-ink sm:text-[17px]">
                  {s.name}
                  <ArrowUpRight
                    aria-hidden
                    className={[
                      "h-4 w-4 flex-none text-muted transition-transform",
                      isHe
                        ? "rotate-180 group-hover:-translate-x-px group-hover:-translate-y-px"
                        : "group-hover:-translate-y-px group-hover:translate-x-px",
                    ].join(" ")}
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
            href={copy.exploreHref}
            className="group inline-flex items-center gap-2 rounded-full border border-line bg-paper px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-mist"
          >
            {copy.exploreAll}
            <ArrowRight
              aria-hidden
              className={[
                "h-4 w-4 text-muted transition-transform",
                isHe ? "rotate-180 group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5",
              ].join(" ")}
              strokeWidth={2}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
