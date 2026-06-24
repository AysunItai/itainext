import type { Metadata } from "next";
import HebrewFreeReviewContent from "./Content";
import { buildAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: {
    absolute: "בדיקת אתר בחינם לעסק שלך | ITAI Web Solutions",
  },
  description:
    "שלחי לי את כתובת האתר שלך ואחזיר לך הצעות מעשיות לשיפור האתר, המובייל, הנראות בגוגל והיכולת לקבל יותר פניות.",
  alternates: buildAlternates("he", "freeReview"),
  openGraph: {
    title: "בדיקת אתר בחינם · ITAI",
    description:
      "בדיקת אתר חינמית לעסקים קטנים — מובייל, SEO, טפסים ואמון.",
    url: "/he/free-website-review",
    type: "website",
    locale: "he_IL",
  },
};

export default function HebrewFreeReviewPage() {
  return <HebrewFreeReviewContent />;
}
