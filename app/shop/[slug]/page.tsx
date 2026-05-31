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
  return {
    title: `${pub.title} — ${pub.subtitle.replace(/\.$/, "")}`,
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
