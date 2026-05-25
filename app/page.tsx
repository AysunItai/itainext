import About from "@/components/About";
import CTA from "@/components/CTA";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Showcase from "@/components/Showcase";
import Work from "@/components/Work";

export default function Home() {
  return (
    <main id="main" className="flex flex-col">
      <Hero />
      <Work />
      <Services />
      <Showcase />
      <About />
      <Process />
      <Pricing />
      <CTA />
    </main>
  );
}
