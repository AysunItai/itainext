import type { Metadata } from "next";
import AboutContent from "./Content";
import { jsonLdScriptProps, personLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  // Was just "About" (12 chars with template) — too short for SEO and
  // tells search engines nothing about who runs this page. Adding the
  // founder name + studio role is genuinely searched-for context.
  title: "About Aysun Itai — Founder & Full-Stack Engineer",
  // Was 176 chars (over the 155 limit). Tightened to remove the
  // redundant "modern digital systems, automation, and web
  // infrastructure" run-on and keep the core: who runs it + what they do.
  description:
    "ITAI is an independent software studio building modern digital systems for growing businesses. Founded by full-stack engineer Aysun Itai.",
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
