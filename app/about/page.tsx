import type { Metadata } from "next";
import AboutContent from "./Content";

export const metadata: Metadata = {
  title: "About",
  description:
    "ITAI is an independent software studio focused on modern digital systems, automation, and web infrastructure for growing businesses. Founded by full-stack engineer Aysun Itai.",
  openGraph: {
    title: "About · ITAI",
    description:
      "An independent software studio. Engineering depth, design restraint.",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
