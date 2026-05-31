import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublication, listPublications } from "@/lib/library";
import ProductContent from "./ProductContent";

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

  return <ProductContent pub={pub} others={others} />;
}
