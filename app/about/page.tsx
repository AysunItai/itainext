import type { Metadata } from "next";
import AboutContent from "./Content";
import { jsonLdScriptProps, personLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "About",
  description:
    "ITAI is an independent software studio focused on modern digital systems, automation, and web infrastructure for growing businesses. Founded by full-stack engineer Aysun Itai.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About · ITAI",
    description:
      "An independent software studio. Engineering depth, design restraint.",
    url: "/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <script {...jsonLdScriptProps(personLd())} />
      <AboutContent />
    </>
  );
}
