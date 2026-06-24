import type { Metadata } from "next";
import CTA from "@/components/CTA";
import FreeWebsiteReview from "@/components/FreeWebsiteReview";
import FounderTrust from "@/components/FounderTrust";
import Hero from "@/components/Hero";
import LibraryTeaser from "@/components/LibraryTeaser";
import Pricing from "@/components/Pricing";
import Process from "@/components/Process";
import ReviewCTA from "@/components/ReviewCTA";
import Services from "@/components/Services";
import Showcase from "@/components/Showcase";
import WhoIHelp from "@/components/WhoIHelp";
import WhyWorkWithMe from "@/components/WhyWorkWithMe";
import Work from "@/components/Work";
import { getHomeCopy } from "@/lib/home-copy";
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

export default function HebrewHomePage() {
  const copy = getHomeCopy("he");

  return (
    <main id="main" className="flex flex-col">
      <Hero locale="he" />
      <FreeWebsiteReview locale="he" />
      <WhoIHelp locale="he" />
      <FounderTrust locale="he" />
      <ReviewCTA
        locale="he"
        variant="soft"
        eyebrow={copy.reviewCta.soft.eyebrow}
        heading={copy.reviewCta.soft.heading}
        description={copy.reviewCta.soft.description}
        location="homepage_after_hero"
        buttonLabel={copy.reviewCta.soft.button}
      />
      <Work locale="he" />
      <Services locale="he" />
      <ReviewCTA
        locale="he"
        variant="bold"
        eyebrow={copy.reviewCta.bold.eyebrow}
        heading={copy.reviewCta.bold.heading}
        description={copy.reviewCta.bold.description}
        location="homepage_after_services"
        buttonLabel={copy.reviewCta.bold.button}
      />
      <Showcase locale="he" />
      <WhyWorkWithMe locale="he" />
      <Process locale="he" />
      <Pricing locale="he" />
      <LibraryTeaser locale="he" />
      <CTA locale="he" />
    </main>
  );
}
