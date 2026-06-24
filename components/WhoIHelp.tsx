import {
  Briefcase,
  Cpu,
  HeartPulse,
  Scissors,
  Sparkles,
  Users,
  Wrench,
  Monitor,
} from "lucide-react";
import { getHomeCopy } from "@/lib/home-copy";
import type { Locale } from "@/lib/i18n";

const AUDIENCE_ICONS = [
  HeartPulse,
  Sparkles,
  Briefcase,
  Scissors,
  Wrench,
  Cpu,
  Users,
  Monitor,
] as const;

export default function WhoIHelp({ locale = "en" }: { locale?: Locale }) {
  const copy = getHomeCopy(locale).whoIHelp;

  return (
    <section
      id="who-i-help"
      aria-labelledby="who-i-help-title"
      className="relative scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted">
            {copy.eyebrow}
          </p>
          <h2
            id="who-i-help-title"
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
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
        >
          {copy.audiences.map((label, i) => {
            const Icon = AUDIENCE_ICONS[i] ?? Users;
            return (
              <li
                key={label}
                className="flex flex-col items-center rounded-2xl border border-line bg-paper-soft px-4 py-6 text-center transition-colors hover:border-ink/15 hover:bg-paper sm:px-5 sm:py-8"
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-ink"
                  aria-hidden
                >
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <span className="mt-4 text-sm font-medium leading-snug text-ink sm:text-[15px]">
                  {label}
                </span>
              </li>
            );
          })}
        </ul>

        <p className="mx-auto mt-12 max-w-3xl text-center text-pretty text-[15px] leading-7 text-muted sm:text-base">
          {copy.footnote}
        </p>
      </div>
    </section>
  );
}
