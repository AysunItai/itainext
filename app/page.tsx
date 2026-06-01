import type { Metadata } from "next";
import About from "@/components/About";
import CTA from "@/components/CTA";
import Hero from "@/components/Hero";
import LibraryTeaser from "@/components/LibraryTeaser";
import Pricing from "@/components/Pricing";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Showcase from "@/components/Showcase";
import Work from "@/components/Work";

export const metadata: Metadata = {
  title: "ITAI — Modern Digital Systems",
  description:
    "Independent software studio building custom websites, AI automation, booking systems, and dashboards for growing businesses. Engineering depth, design restraint.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main id="main" className="flex flex-col">
      <Hero />
      <Work />
      <Services />
      <Showcase />
      <LibraryTeaser />
      <About />
      <Process />
      <Pricing />
      <CTA />
    </main>
  );
}
