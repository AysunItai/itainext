import type { Metadata } from "next";
import FreeWebsiteReviewContent from "./Content";
import { buildAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Free Website & Google Visibility Review",
  description:
    "Request a free website review for your small business — mobile experience, SEO, Google visibility, contact flows, and trust signals. Reply within one working day.",
  alternates: buildAlternates("en", "freeReview"),
  openGraph: {
    title: "Free Website Review · ITAI",
    description:
      "Send your website and get a practical review — what may be stopping visitors from becoming leads.",
    url: "/free-website-review",
    type: "website",
  },
};

export default function FreeWebsiteReviewPage() {
  return <FreeWebsiteReviewContent />;
}
