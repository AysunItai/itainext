import type { Metadata } from "next";
import { Suspense } from "react";
import BookContent from "./Content";

const TITLE =
  "Free Website Consultation for Small Businesses | Itai Web Solutions";
const DESCRIPTION =
  "Book a free 15-minute consultation to discuss your small business website, SEO setup, WhatsApp integration, booking system, and ways to get more leads online.";

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
