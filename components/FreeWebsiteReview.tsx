import {
  Gauge,
  Globe,
  MessageCircle,
  Search,
  Smartphone,
  ShieldCheck,
  CalendarCheck,
} from "lucide-react";
import ReviewCTAButton from "./ReviewCTAButton";
import { getHomeCopy } from "@/lib/home-copy";
import type { Locale } from "@/lib/i18n";

const CHECKPOINT_ICONS = [
  Smartphone,
  Search,
  Globe,
  MessageCircle,
  CalendarCheck,
  Gauge,
  ShieldCheck,
  Search,
] as const;

export default function FreeWebsiteReview({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const copy = getHomeCopy(locale).freeReview;

  return (
    <section
      id="free-review"
      aria-labelledby="free-review-title"
      className="relative scroll-mt-24 border-b border-line bg-paper-soft px-5 py-16 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <header className="lg:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
              {copy.eyebrow}
            </p>
            <h2
              id="free-review-title"
              className="mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl lg:text-[2.5rem] lg:leading-[1.08]"
            >
              {copy.title}
            </h2>
            <p className="mt-5 text-pretty text-base leading-7 text-muted sm:text-lg">
              {copy.intro}
            </p>
            <p className="mt-4 text-pretty text-[15px] leading-7 text-muted">
              {copy.detail}
            </p>
            <div className="mt-8">
              <ReviewCTAButton
                locale={locale}
                location="homepage_review_section"
                label={copy.cta}
              />
            </div>
          </header>

          <ul
            role="list"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7"
          >
            {copy.checkpoints.map((item, i) => {
              const Icon = CHECKPOINT_ICONS[i] ?? Search;
              return (
                <li
                  key={item.title}
                  className="rounded-2xl border border-line bg-paper p-5 sm:p-6"
                >
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-mist text-ink"
                    aria-hidden
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 text-base font-semibold tracking-tight text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-6 text-muted">
                    {item.detail}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
