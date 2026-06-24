import { getHomeCopy } from "@/lib/home-copy";
import type { Locale } from "@/lib/i18n";

export default function Process({ locale = "en" }: { locale?: Locale }) {
  const copy = getHomeCopy(locale).process;

  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="relative scroll-mt-24 bg-ink px-5 py-16 text-paper sm:px-8 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_30%,black,transparent_75%)]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:56px_56px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-paper/60">
            {copy.eyebrow}
          </p>
          <h2
            id="process-title"
            className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            {copy.title}
          </h2>
          <p className="mt-5 text-pretty text-base leading-7 text-paper/70 sm:text-lg">
            {copy.subtitle}
          </p>
        </header>

        <ol
          role="list"
          className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {copy.steps.map((step) => (
            <li
              key={step.n}
              className="relative overflow-hidden rounded-3xl border border-paper/10 bg-paper/[0.04] p-7 backdrop-blur-sm sm:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm tabular-nums text-paper/50">
                  {step.n}
                </span>
                <span className="h-px flex-1 bg-paper/10" aria-hidden />
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 text-[15px] leading-7 text-paper/70">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
