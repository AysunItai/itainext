import type { Metadata } from "next";
import { listPublications } from "@/lib/library";
import ShopContent from "./ShopContent";

export const metadata: Metadata = {
  title: "Shop — Field manuals for engineering teams",
  description:
    "A small, deliberate library of ebooks for working engineers. Free this season — designed to live on your second monitor, not your shelf.",
  alternates: { canonical: "/shop" },
  openGraph: {
    type: "website",
    title: "Shop · ITAI",
    description:
      "Field manuals for engineering teams — practical ebooks on database performance, system design, and shipping software that lasts.",
    url: "/shop",
  },
};

export default function ShopPage() {
  const publications = listPublications();
  return <ShopContent publications={publications} />;
}
