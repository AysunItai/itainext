import type { Metadata } from "next";
import { listPublications } from "@/lib/library";
import { prisma } from "@/lib/prisma";
import ShopContent from "./ShopContent";

export const metadata: Metadata = {
  title: "Shop — Field manuals for engineering teams",
  description:
    "A small, deliberate library of ebooks for working engineers. Designed to live on your second monitor, not your shelf.",
  alternates: { canonical: "/shop" },
  openGraph: {
    type: "website",
    title: "Shop · ITAI",
    description:
      "Field manuals for engineering teams — practical ebooks on database performance, system design, and shipping software that lasts.",
    url: "/shop",
  },
};

// Re-fetch subscriber count at most every 10 minutes — it's a vanity number,
// not a real-time metric. Page stays fast and mostly static.
export const revalidate = 600;

async function getConfirmedSubscriberCount(): Promise<number | undefined> {
  try {
    return await prisma.subscriber.count({
      where: { confirmed: true, unsubscribedAt: null },
    });
  } catch {
    // DB unavailable at build/request time → just hide the count.
    return undefined;
  }
}

export default async function ShopPage() {
  const publications = listPublications();
  const subscriberCount = await getConfirmedSubscriberCount();
  return (
    <ShopContent
      publications={publications}
      subscriberCount={subscriberCount}
    />
  );
}
