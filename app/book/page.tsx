import type { Metadata } from "next";
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

// `searchParams` is read on the server here (rather than via the
// `useSearchParams()` client hook inside <BookContent />) so the whole
// page — including the <h1> — is rendered in the initial HTML.
//
// Before this change, BookContent used `useSearchParams()`, which forced
// Next.js to wrap the entire page in a Suspense boundary with a `null`
// fallback during prerender. Crawlers (including Screaming Frog) only
// see the prerendered HTML, so they saw an empty page and reported
// "H1 Missing" for /book.
export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string | string[] }>;
}) {
  const params = await searchParams;
  const rawPlan = params.plan;
  const plan =
    typeof rawPlan === "string"
      ? rawPlan
      : Array.isArray(rawPlan) && typeof rawPlan[0] === "string"
        ? rawPlan[0]
        : null;

  return <BookContent plan={plan} />;
}
