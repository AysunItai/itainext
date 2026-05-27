import type { Metadata } from "next";
import { Suspense } from "react";
import BookContent from "./Content";

export const metadata: Metadata = {
  title: "Book a consultation",
  description:
    "Pick a time for a free 20-minute consultation. We'll cover your goals, scope, and timeline — and you'll leave with a clear next step.",
  alternates: { canonical: "/book" },
  openGraph: {
    title: "Book a consultation · ITAI",
    description:
      "Free 20-minute call. Bring your goal, leave with a clear next step.",
    url: "/book",
    type: "website",
  },
};

export default function BookPage() {
  return (
    <Suspense fallback={null}>
      <BookContent />
    </Suspense>
  );
}
