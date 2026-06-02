import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatDate, parseTags, truncateForMeta } from "@/lib/blog";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";
import SubscribeForm from "@/components/blog/SubscribeForm";
import { blogPostingLd, jsonLdScriptProps } from "@/lib/structured-data";

export const revalidate = 3600;

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post || !post.published) {
    return { title: "Not found", robots: { index: false, follow: false } };
  }
  const path = `/blog/${post.slug}`;
  // Defensive truncation: post excerpts are authored freely in the
  // admin UI and easily exceed Google's ~155-char SERP limit. Likewise
  // post titles need to clear the ~60-char limit AFTER the root
  // layout's `· ITAI` suffix (so cap the source at 53). OG/Twitter
  // can hold a touch more text since they're for social previews, but
  // we cap them too so the cards don't get cropped.
  const metaTitle = truncateForMeta(post.title, 53) ?? post.title;
  const metaDescription = truncateForMeta(post.excerpt, 155);
  const socialDescription = truncateForMeta(post.excerpt, 200);

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: metaTitle,
      description: socialDescription,
      url: path,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt?.toISOString(),
      authors: ["Aysun Itai"],
    },
    twitter: {
      card: post.coverImage ? "summary_large_image" : "summary",
      title: metaTitle,
      description: socialDescription,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post || !post.published) notFound();

  const tags = parseTags(post.tags);

  const [more, subscriberCount] = await Promise.all([
    prisma.post.findMany({
      where: { published: true, NOT: { id: post.id } },
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
    prisma.subscriber.count({
      where: { confirmed: true, unsubscribedAt: null },
    }),
  ]);

  return (
    <main id="main" className="relative">
      <script
        {...jsonLdScriptProps(
          blogPostingLd({
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            coverImage: post.coverImage,
            publishedAt: post.publishedAt,
            updatedAt: post.updatedAt,
            tags,
          }),
        )}
      />
      <article>
        <header className="mx-auto max-w-3xl px-6 pt-28 pb-10 sm:pt-36">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/45">
            <Link
              href="/blog"
              className="underline-offset-4 transition hover:text-ink hover:underline"
            >
              ← All notes
            </Link>
          </p>
          {tags.length > 0 ? (
            <div className="mt-8 flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-ink/10 bg-ink/[0.03] px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-[0.16em] text-ink/55"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>
          {post.excerpt ? (
            <p className="mt-6 text-pretty text-lg leading-relaxed text-ink/65 sm:text-xl">
              {post.excerpt}
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-ink/10 pt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
            <span>By Aysun Itai</span>
            <span className="text-ink/20">·</span>
            <span>{formatDate(post.publishedAt)}</span>
            <span className="text-ink/20">·</span>
            <span>{post.readingTime} min read</span>
          </div>
        </header>

        {post.coverImage ? (
          <figure className="relative mx-auto mb-12 w-full max-w-5xl overflow-hidden rounded-3xl border border-ink/10 bg-mist sm:px-6">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
              <Image
                src={post.coverImage}
                alt={`${post.title} — cover image`}
                fill
                priority
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover"
              />
            </div>
          </figure>
        ) : null}

        <div className="mx-auto max-w-3xl px-6 pb-16">
          <MarkdownRenderer source={post.content} />
        </div>

        <div className="mx-auto max-w-3xl px-6 pb-20">
          <SubscribeForm
            count={subscriberCount}
            eyebrow="Liked this?"
            heading="Get the next essay in your inbox."
            description="One thoughtful note when something new is published. No threads, no promotions, no follow-ups."
            source={`blog:${post.slug}`}
          />
        </div>
      </article>

      <footer className="border-t border-ink/10 bg-paper-soft">
        <div className="mx-auto max-w-3xl px-6 py-12 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/45">
            Thanks for reading.
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Have a project that needs this kind of care?
          </h2>
          <Link
            href="/contact"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-ink px-5 text-sm font-medium text-paper transition hover:bg-ink/90"
          >
            Start a conversation →
          </Link>
        </div>

        {more.length > 0 ? (
          <div className="mx-auto max-w-6xl px-6 pb-20">
            <h3 className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/45">
              Continue reading
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              {more.map((m) => (
                <Link
                  key={m.id}
                  href={`/blog/${m.slug}`}
                  className="group rounded-2xl border border-ink/10 bg-paper p-5 transition hover:border-ink/20 hover:shadow-soft"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45">
                    {formatDate(m.publishedAt)} · {m.readingTime} min
                  </p>
                  <h4 className="mt-2 text-base font-semibold tracking-tight text-ink transition group-hover:text-ink/75">
                    {m.title}
                  </h4>
                  {m.excerpt ? (
                    <p className="mt-2 line-clamp-2 text-sm text-ink/60">
                      {m.excerpt}
                    </p>
                  ) : null}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </footer>
    </main>
  );
}
