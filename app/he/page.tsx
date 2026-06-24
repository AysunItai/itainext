import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Bot,
  CalendarCheck,
  Globe,
  RefreshCw,
  Search,
} from "lucide-react";
import HeroAnimatedBackground from "@/components/HeroAnimatedBackground";
import { buildAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: {
    absolute: "בניית אתרים לעסקים קטנים | ITAI Web Solutions",
  },
  description:
    "בניית אתרים מודרניים, שיפור נראות בגוגל, טפסי יצירת קשר, מערכות הזמנה ואוטומציות AI לעסקים קטנים בישראל.",
  alternates: buildAlternates("he", "home"),
  openGraph: {
    title: "בניית אתרים לעסקים קטנים · ITAI",
    description:
      "בניית אתרים מודרניים, SEO, טפסים, הזמנות ואוטומציות AI לעסקים קטנים.",
    url: "/he",
    type: "website",
    locale: "he_IL",
  },
};

const SERVICES = [
  {
    title: "בניית אתרים",
    description:
      "אתרים מודרניים, מהירים וברורים שמציגים את העסק בצורה מקצועית ועוזרים להפוך מבקרים לפניות.",
    icon: Globe,
  },
  {
    title: "שדרוג אתרים קיימים",
    description:
      "שיפור עיצוב, מובייל, מהירות, טפסים, מסרים וקריאות לפעולה באתר שכבר קיים.",
    icon: RefreshCw,
  },
  {
    title: "נראות בגוגל",
    description:
      "הגדרת SEO בסיסית, מבנה נכון לעמודים, כותרות, תיאורים, Sitemap וחיבור ל-Google Search Console.",
    icon: Search,
  },
  {
    title: "טפסים והזמנות",
    description:
      "טפסי יצירת קשר, וואטסאפ, קביעת פגישות וזרימת פניות פשוטה וברורה.",
    icon: CalendarCheck,
  },
  {
    title: "אוטומציות AI",
    description:
      "כלים פשוטים לעסק: עוזר AI, מענה ראשוני, סיכום פניות, שאלות נפוצות ותהליכים שחוסכים זמן.",
    icon: Bot,
  },
] as const;

export default function HebrewHomePage() {
  return (
    <main id="main" className="flex flex-col">
      <section
        aria-labelledby="he-hero-title"
        className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pt-20 pb-14 sm:px-8 sm:pt-24 sm:pb-20"
      >
        <HeroAnimatedBackground />

        <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
          <p
            className="mb-5 text-xs font-medium uppercase tracking-[0.36em] text-muted sm:mb-7 motion-safe:[animation:hero-fade-in_0.8s_cubic-bezier(0.22,1,0.36,1)_both]"
            style={{ animationDelay: "0ms" }}
          >
            ITAI WEB SOLUTIONS
          </p>
          <h1
            id="he-hero-title"
            className="text-balance text-[clamp(2.35rem,6.2vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-ink motion-safe:[animation:hero-fade-in_0.8s_cubic-bezier(0.22,1,0.36,1)_both]"
            style={{ animationDelay: "60ms" }}
          >
            אתרים חכמים לעסקים קטנים
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-7 text-muted sm:mt-7 sm:text-xl sm:leading-8 motion-safe:[animation:hero-fade-in_0.8s_cubic-bezier(0.22,1,0.36,1)_both]"
            style={{ animationDelay: "180ms" }}
          >
            בניית אתרים מודרניים, שיפור נראות בגוגל, טפסי יצירת קשר, מערכות
            הזמנה ואוטומציות AI פשוטות לעסק שלך.
          </p>

          <div
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4 motion-safe:[animation:hero-fade-in_0.8s_cubic-bezier(0.22,1,0.36,1)_both]"
            style={{ animationDelay: "280ms" }}
          >
            <Link
              href="/he/free-website-review"
              className="group inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper shadow-soft transition-all hover:-translate-y-0.5 hover:bg-ink-soft sm:w-auto"
            >
              קבלי בדיקת אתר בחינם
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-px group-hover:-translate-y-px"
              />
            </Link>
            <Link
              href="/he/book"
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full border border-line bg-paper/80 px-7 py-3.5 text-sm font-medium text-ink backdrop-blur transition-colors hover:bg-mist sm:w-auto"
            >
              קביעת שיחת היכרות
            </Link>
          </div>

          <p
            className="mx-auto mt-4 max-w-md text-pretty text-[13px] leading-6 text-muted sm:mt-5 motion-safe:[animation:hero-fade-in_0.8s_cubic-bezier(0.22,1,0.36,1)_both]"
            style={{ animationDelay: "360ms" }}
          >
            לא בטוחה מאיפה להתחיל? בקשי בדיקת אתר בחינם ואכוון אותך לשיפורים
            החשובים ביותר קודם.
          </p>
        </div>
      </section>

      <section
        id="services"
        aria-labelledby="he-services-title"
        className="scroll-mt-24 border-t border-line px-5 py-16 sm:px-8 sm:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <header className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted">
              מה אני עושה
            </p>
            <h2
              id="he-services-title"
              className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
            >
              שירותים לעסק שלך
            </h2>
          </header>

          <ul
            role="list"
            className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {SERVICES.map((s) => (
              <li
                key={s.title}
                className="rounded-2xl border border-line bg-paper-soft p-6 sm:p-7"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-ink">
                  <s.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-7 text-muted">
                  {s.description}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-10 text-center">
            <Link
              href="/he/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
            >
              כל השירותים
              <ArrowUpRight className="h-4 w-4 rotate-180" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="he-audience-title"
        className="border-t border-line bg-paper-soft px-5 py-16 sm:px-8 sm:py-20"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="he-audience-title"
            className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
          >
            למי זה מתאים
          </h2>
          <p className="mt-5 text-pretty text-base leading-8 text-muted sm:text-lg">
            השירות מתאים לעסקים קטנים, קליניקות, יועצים, מאמנים, נותני שירותים,
            עסקים מקומיים וכל מי שרוצה אתר מקצועי שמביא יותר פניות.
          </p>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-3xl rounded-3xl border border-line bg-ink p-8 text-center text-paper sm:p-12">
          <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            רוצה לדעת מה אפשר לשפר באתר שלך?
          </h2>
          <Link
            href="/he/free-website-review"
            className="group mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-paper px-7 py-3.5 text-sm font-medium text-ink transition-all hover:-translate-y-0.5 hover:shadow-lifted"
          >
            בדיקת אתר בחינם
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
