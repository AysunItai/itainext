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
import { buildAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "ITAI — Websites, SEO & AI for Small Businesses",
  description:
    "Websites, SEO setup, Google visibility, booking forms, WhatsApp integration, and practical AI automation for small businesses. Free website review available.",
  alternates: buildAlternates("en", "home"),
};

export default function Home() {
  return (
    <main id="main" className="flex flex-col">
      <Hero />
      <FreeWebsiteReview />
      <WhoIHelp />
      <FounderTrust />
      <ReviewCTA
        variant="soft"
        eyebrow="No obligation"
        heading="Send me your website and I’ll show you what may be stopping visitors from becoming leads."
        description="I’ll reply with practical notes — what to fix first, what can wait, and whether a quick fix or full refresh makes sense."
        location="homepage_after_hero"
      />
      <Work />
      <Services />
      <ReviewCTA
        variant="bold"
        eyebrow="Next step"
        heading="Ready to get more leads from your website?"
        description="Start with a free review. If it makes sense to work together, I’ll suggest a clear package and timeline."
        location="homepage_after_services"
      />
      <Showcase />
      <WhyWorkWithMe />
      <Process />
      <Pricing />
      <LibraryTeaser />
      <CTA />
    </main>
  );
}
