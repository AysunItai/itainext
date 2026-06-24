import type { Metadata } from "next";
import BookContent from "@/app/book/Content";
import { buildAlternates } from "@/lib/i18n";

const TITLE = "שיחת ייעוץ חינמית של 15 דקות לאתר";

const DESCRIPTION =
  "קביעת שיחת ייעוץ חינמית לבניית אתר, SEO, וואטסאפ, הזמנות וטפסי יצירת קשר לעסקים קטנים.";

export const metadata: Metadata = {
  title: {
    absolute: `${TITLE} | ITAI Web Solutions`,
  },
  description: DESCRIPTION,
  alternates: buildAlternates("he", "book"),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/he/book",
    type: "website",
    locale: "he_IL",
  },
};

export default async function HebrewBookPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string | string[] }>;
}) {
  const params = await searchParams;
  const rawPlan = params.plan;
  const plan =
    typeof rawPlan === "string"
      ? rawPlan
      : Array.isArray(rawPlan) && typeof rawPlan[0] === "string"
        ? rawPlan[0]
        : null;

  return <BookContent plan={plan} locale="he" />;
}
