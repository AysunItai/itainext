import Image from "next/image";
import ReviewCTAButton from "./ReviewCTAButton";
import { getHomeCopy } from "@/lib/home-copy";
import type { Locale } from "@/lib/i18n";

export default function FounderTrust({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const copy = getHomeCopy(locale).founder;
  const isHe = locale === "he";

  return (
    <section
      id="founder"
      aria-labelledby="founder-title"
      className="relative scroll-mt-24 px-5 py-12 sm:px-8 sm:py-16"
    >
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-line bg-paper-soft p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            <figure className="mx-auto shrink-0 sm:mx-0">
              <div className="relative h-28 w-28 overflow-hidden rounded-2xl border border-line bg-mist shadow-soft sm:h-32 sm:w-32">
                <Image
                  src="/me2.jpg"
                  alt={copy.imageAlt}
                  width={640}
                  height={640}
                  sizes="128px"
                  quality={85}
                  className="h-full w-full object-cover object-[center_15%]"
                />
              </div>
            </figure>

            <div
              className={[
                "min-w-0 text-center",
                isHe ? "sm:text-right" : "sm:text-left",
              ].join(" ")}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted">
                {copy.eyebrow}
              </p>
              <h2
                id="founder-title"
                className="mt-2 text-balance text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-[1.65rem]"
              >
                {copy.title}
              </h2>

              <div className="mt-4 space-y-3 text-pretty text-[15px] leading-6 text-muted sm:text-base sm:leading-7">
                <p>{copy.p1}</p>
                <p>{copy.p2}</p>
              </div>

              <div
                className={[
                  "mt-6 flex",
                  isHe ? "justify-center sm:justify-end" : "justify-center sm:justify-start",
                ].join(" ")}
              >
                <ReviewCTAButton
                  locale={locale}
                  location="homepage_founder"
                  label={copy.cta}
                  className="group inline-flex min-h-[44px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper shadow-soft transition-all hover:-translate-y-0.5 hover:bg-ink-soft hover:shadow-lifted sm:w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
