import type { Metadata } from "next";
import About from "@/components/About";
import CTA from "@/components/CTA";
import Hero from "@/components/Hero";
import InlineCTA from "@/components/InlineCTA";
import LibraryTeaser from "@/components/LibraryTeaser";
import Pricing from "@/components/Pricing";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Showcase from "@/components/Showcase";
import Work from "@/components/Work";

export const metadata: Metadata = {
  title: "ITAI — Modern Digital Systems",
  // Previously 166 chars (over Google's ~155 char SERP limit). Trimmed by
  // dropping the duplicative second sentence — the core pitch already
  // covers it. Reads better and fits the snippet preview.
  description:
    "Independent studio building custom websites, AI automation, booking systems, and dashboards for growing businesses. Engineering depth, design restraint.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main id="main" className="flex flex-col">
      <Hero />
      <LibraryTeaser />
      {/* Soft mid-page CTA — keeps the action visible right after the hero
          area, before the visitor disappears into a long scroll. */}
      <InlineCTA
        variant="soft"
        eyebrow="Quick start"
        heading="Not sure what your business needs?"
        description="Hop on a free 15-minute call and let's figure it out together — no pressure, no sales pitch."
        location="homepage_after_hero"
      />
      <Work />
      <Services />
      {/* Bold mid-page CTA — they've now seen the work and the services;
          this is the moment to push toward booking. */}
      <InlineCTA
        variant="bold"
        eyebrow="Ready when you are"
        heading="Ready to improve your website?"
        description="Book a free 15-minute consultation and let's see what your business needs."
        location="homepage_after_services"
      />
      <Showcase />
      <About />
      <Process />
      <Pricing />
      <CTA />
    </main>
  );
}
