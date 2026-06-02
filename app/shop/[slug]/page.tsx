import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublication, listPublications } from "@/lib/library";
import { prisma } from "@/lib/prisma";
import ProductContent from "./ProductContent";

export const revalidate = 600;

type Params = { slug: string };

export function generateStaticParams() {
  return listPublications().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pub = getPublication(slug);
  if (!pub) {
    return { title: "Not found", robots: { index: false, follow: false } };
  }
  const path = `/shop/${pub.slug}`;
  // Title was `${pub.title} — ${pub.subtitle}` which produced strings
  // like "SQL Performance Masterclass — A practical ebook for writing
  // fast, scalable SQL" (78 chars before the `· ITAI` template — 85
  // after). Using `pub.title` alone (e.g. "SQL Performance Masterclass")
  // renders as "SQL Performance Masterclass · ITAI" — 34 chars, dead
  // centre of the optimal SERP range. The subtitle still appears in
  // both the visible H1 area of the page and the meta description,
  // so we lose nothing for users.
  return {
    title: pub.title,
    description: pub.tagline,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: `${pub.title} · ITAI`,
      description: pub.tagline,
      url: path,
      authors: [pub.author],
    },
    twitter: {
      card: "summary_large_image",
      title: `${pub.title} · ITAI`,
      description: pub.tagline,
    },
  };
}

async function getConfirmedSubscriberCount(): Promise<number | undefined> {
  try {
    return await prisma.subscriber.count({
      where: { confirmed: true, unsubscribedAt: null },
    });
  } catch {
    return undefined;
  }
}

export default async function PublicationPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const pub = getPublication(slug);
  if (!pub) notFound();

  const all = listPublications();
  const others = all.filter((p) => p.slug !== pub.slug).slice(0, 3);
  const subscriberCount = await getConfirmedSubscriberCount();

  return (
    <ProductContent
      pub={pub}
      others={others}
      subscriberCount={subscriberCount}
    />
  );
}
