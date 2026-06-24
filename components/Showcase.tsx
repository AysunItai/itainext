import { Gauge, ShieldCheck, Timer, Zap } from "lucide-react";
import { getHomeCopy } from "@/lib/home-copy";
import type { Locale } from "@/lib/i18n";

const PILLAR_ICONS = [Zap, ShieldCheck, Gauge, Timer] as const;

export default function Showcase({ locale = "en" }: { locale?: Locale }) {
  const copy = getHomeCopy(locale).showcase;

  return (
    <section
      id="principles"
      aria-labelledby="showcase-title"
      className="relative scroll-mt-24 px-5 py-16 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted">
            {copy.eyebrow}
          </p>
          <h2
            id="showcase-title"
            className="mt-4 text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
          >
            {copy.title}
          </h2>
          <p className="mt-5 text-pretty text-base leading-7 text-muted sm:text-lg">
            {copy.subtitle}
          </p>
        </header>

        <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
          {copy.stats.map((s) => (
            <div
              key={s.label}
              className="bg-paper px-6 py-8 text-center sm:px-8 sm:py-10"
            >
              <dt className="order-2 mt-2 text-xs uppercase tracking-[0.18em] text-muted">
                {s.label}
              </dt>
              <dd className="order-1 font-semibold tracking-tight text-ink">
                <span className="text-4xl sm:text-5xl">{s.value}</span>
                <span className="text-2xl text-accent sm:text-3xl">
                  {s.suffix}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {copy.pillars.map((p, i) => {
            const Icon = PILLAR_ICONS[i] ?? Zap;
            return (
              <article
                key={p.title}
                className="rounded-3xl border border-line bg-paper-soft p-7 sm:p-8"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-paper text-ink shadow-soft">
                    <Icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-ink">
                    {p.title}
                  </h3>
                </div>
                <p className="mt-5 text-[15px] leading-7 text-muted">{p.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
