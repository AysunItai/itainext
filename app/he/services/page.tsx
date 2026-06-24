import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Bot, CalendarCheck, Globe, RefreshCw, Search } from "lucide-react";
import { buildAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: {
    absolute: "שירותים | בניית אתרים, SEO ואוטומציות AI | ITAI Web Solutions",
  },
  description:
    "שירותי בניית אתרים, שדרוג אתרים, SEO, טפסי יצירת קשר, מערכות הזמנה ואוטומציות AI לעסקים קטנים.",
  alternates: buildAlternates("he", "services"),
  openGraph: {
    title: "שירותים · ITAI",
    description:
      "בניית אתרים, שדרוג, SEO, טפסים, הזמנות ואוטומציות AI לעסקים קטנים.",
    url: "/he/services",
    type: "website",
    locale: "he_IL",
  },
};

const SERVICES = [
  {
    title: "בניית אתר לעסק קטן",
    description:
      "אתר מקצועי שמסביר מי את, מה את מציעה ולמה כדאי לפנות אלייך.",
    icon: Globe,
  },
  {
    title: "שדרוג אתר קיים",
    description:
      "אם האתר נראה ישן, לא עובד טוב במובייל או לא מביא פניות — אפשר לשפר אותו בלי להתחיל הכל מחדש.",
    icon: RefreshCw,
  },
  {
    title: "SEO בסיסי ונראות בגוגל",
    description:
      "מבנה עמודים נכון, כותרות, תיאורים, Sitemap, Search Console ושיפור תוכן.",
    icon: Search,
  },
  {
    title: "טפסים, וואטסאפ והזמנות",
    description:
      "יצירת דרך פשוטה וברורה ללקוחות לפנות, לשלוח פרטים או לקבוע שיחה.",
    icon: CalendarCheck,
  },
  {
    title: "אוטומציות AI לעסק",
    description:
      "פתרונות קטנים וחכמים שחוסכים זמן: שאלות נפוצות, סיכום פניות, מענה ראשוני וכלים פנימיים.",
    icon: Bot,
  },
] as const;

export default function HebrewServicesPage() {
  return (
    <main id="main" className="relative">
      <section
        aria-labelledby="he-services-hero"
        className="relative isolate overflow-hidden px-5 pt-32 pb-12 sm:px-8 sm:pt-44 sm:pb-16"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(30,58,138,0.08),transparent_70%)]"
        />

        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
            שירותים
          </p>
          <h1
            id="he-services-hero"
            className="mt-5 text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
          >
            שירותים לעסקים קטנים
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
            אתרים, שדרוגים, SEO, טפסים, הזמנות ואוטומציות AI — הכל בצורה
            פשוטה, ברורה ומעשית.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-16 sm:px-8">
        <ul role="list" className="space-y-4">
          {SERVICES.map((s, i) => (
            <li
              key={s.title}
              className="flex flex-col gap-4 rounded-2xl border border-line bg-paper-soft p-6 sm:flex-row sm:items-start sm:gap-6 sm:p-8"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-mist text-ink">
                <s.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </span>
              <div className="text-right">
                <p className="font-mono text-[11px] tabular-nums text-muted">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-1 text-xl font-semibold tracking-tight text-ink">
                  {s.title}
                </h2>
                <p className="mt-2 text-[15px] leading-7 text-muted">
                  {s.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-line px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            לא בטוחה מה העסק שלך צריך?
          </h2>
          <Link
            href="/he/free-website-review"
            className="group mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper shadow-soft transition-all hover:-translate-y-0.5 hover:bg-ink-soft"
          >
            קבלי בדיקת אתר בחינם
            <ArrowUpRight
              aria-hidden
              className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-px group-hover:-translate-y-px"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}
