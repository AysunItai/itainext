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

const CHECKPOINTS = [
  {
    icon: Smartphone,
    title: "Mobile experience",
    detail:
      "How your site feels on phones — layout, tap targets, and whether visitors can act quickly.",
  },
  {
    icon: Search,
    title: "SEO titles & indexing",
    detail:
      "Page titles, meta descriptions, and whether Google can find and understand your pages.",
  },
  {
    icon: Globe,
    title: "Google visibility",
    detail:
      "Search presence basics — what shows up when someone looks for your business online.",
  },
  {
    icon: MessageCircle,
    title: "Contact & WhatsApp flow",
    detail:
      "Whether visitors can reach you in one tap — forms, click-to-call, and WhatsApp buttons.",
  },
  {
    icon: CalendarCheck,
    title: "Booking flow",
    detail:
      "Appointment or inquiry paths — clear steps, fewer drop-offs, less back-and-forth.",
  },
  {
    icon: Gauge,
    title: "Page speed",
    detail:
      "Load time on mobile and desktop — slow pages quietly cost you leads every day.",
  },
  {
    icon: ShieldCheck,
    title: "Trust signals",
    detail:
      "Reviews, credentials, clear offers, and the small details that make people feel safe.",
  },
  {
    icon: Search,
    title: "Google Business Profile",
    detail:
      "Profile completeness, categories, photos, and readiness to show up in local search.",
  },
] as const;

export default function FreeWebsiteReview() {
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
              Free review
            </p>
            <h2
              id="free-review-title"
              className="mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl lg:text-[2.5rem] lg:leading-[1.08]"
            >
              Free Website &amp; Google Visibility Review
            </h2>
            <p className="mt-5 text-pretty text-base leading-7 text-muted sm:text-lg">
              Send me your website and I&apos;ll record a short, practical
              review — what&apos;s working, what may be blocking leads, and
              what to fix first. No sales script. Just clear next steps for a
              small business owner.
            </p>
            <p className="mt-4 text-pretty text-[15px] leading-7 text-muted">
              I look at the full picture: how you show up on Google, how easy
              it is to contact or book you, and whether your site feels modern
              and trustworthy on mobile.
            </p>
            <div className="mt-8">
              <ReviewCTAButton location="homepage_review_section" />
            </div>
          </header>

          <ul
            role="list"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7"
          >
            {CHECKPOINTS.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-line bg-paper p-5 sm:p-6"
              >
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-mist text-ink"
                  aria-hidden
                >
                  <item.icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 text-base font-semibold tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-[15px] leading-6 text-muted">
                  {item.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
