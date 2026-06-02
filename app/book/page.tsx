import type { Metadata } from "next";
import { Suspense } from "react";
import BookContent from "./Content";

// Title is rendered through the root layout's `%s · ITAI` template, so
// what lands in <title> is "Free 15-Minute Website Consultation · ITAI"
// — 42 chars, comfortably inside Google's ~60 char SERP window. The
// previous title ("Free Website Consultation for Small Businesses |
// Itai Web Solutions") was 67 chars on its own and pushed to 74 with
// the template — both Screaming Frog and Google were truncating it.
const TITLE = "Free 15-Minute Website Consultation";

// Trimmed from 159 to 152 chars to clear the 155 ceiling without losing
// the key terms (small business, SEO, WhatsApp, booking, leads).
const DESCRIPTION =
  "Book a free 15-minute consultation. Talk through your small business website, SEO setup, WhatsApp, booking, and how to get more leads online.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/book" },
  openGraph: {
    title: "Free 15-Minute Website Consultation",
    description: DESCRIPTION,
    url: "/book",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free 15-Minute Website Consultation",
    description: DESCRIPTION,
  },
};

export default function BookPage() {
  return (
    <Suspense fallback={null}>
      <BookContent />
    </Suspense>
  );
}
