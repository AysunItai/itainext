import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Showcase from "@/components/Showcase";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" className="flex flex-col">
        <Hero />
        <Services />
        <Showcase />
        <Process />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
