import { Handshake, MessageSquare, Rocket } from "lucide-react";

const REASONS = [
  {
    title: "Developer-led, not template-based",
    description:
      "Custom code and thoughtful design — not a generic theme with your logo pasted on top.",
    icon: Rocket,
  },
  {
    title: "Clear process and honest communication",
    description:
      "You always know what's happening, what it costs, and what comes next.",
    icon: MessageSquare,
  },
  {
    title: "Websites built for leads, speed, and trust",
    description:
      "Every page is shaped around contact flows, Google visibility, and fast mobile performance.",
    icon: Handshake,
  },
] as const;

export default function WhyWorkWithMe() {
  return (
    <section
      id="why-work-with-me"
      aria-labelledby="why-work-with-me-title"
      className="relative scroll-mt-24 border-t border-line px-5 py-16 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted">
            Why work with me
          </p>
          <h2
            id="why-work-with-me-title"
            className="mt-4 text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
          >
            A small studio, focused on your results.
          </h2>
        </header>

        <ul
          role="list"
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
        >
          {REASONS.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl border border-line bg-paper-soft p-6 sm:p-7"
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-mist text-ink"
                aria-hidden
              >
                <item.icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 text-base font-semibold tracking-tight text-ink sm:text-lg">
                {item.title}
              </h3>
              <p className="mt-2 text-[15px] leading-6 text-muted">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
