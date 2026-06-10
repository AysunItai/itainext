"use client";

import Image from "next/image";
import Link from "next/link";
import { m, type Variants } from "framer-motion";
import { formatDate, parseTags } from "@/lib/blog";

export type PostCardData = {
  slug: string;
  title: string;
  excerpt: string | null;
  coverImage: string | null;
  publishedAt: Date | string | null;
  readingTime: number;
  tags: string;
};

type Props = {
  post: PostCardData;
  variant?: "feature" | "default" | "compact";
  index?: number;
};

const reveal: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: 0.06 * i,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function PostCard({ post, variant = "default", index = 0 }: Props) {
  const tags = parseTags(post.tags);
  const href = `/blog/${post.slug}`;

  if (variant === "feature") {
    return (
      <m.article
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        custom={index}
        className="group relative overflow-hidden rounded-3xl border border-ink/10 bg-paper shadow-soft"
      >
        <Link href={href} className="block">
          <div className="grid lg:grid-cols-2">
            <Cover post={post} className="aspect-[16/10] lg:aspect-auto lg:h-full" />
            <div className="flex flex-col justify-between gap-8 p-8 sm:p-10 lg:p-12">
              <div>
                <Meta post={post} />
                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-ink transition group-hover:text-ink/80 sm:text-4xl">
                  {post.title}
                </h2>
                {post.excerpt ? (
                  <p className="mt-4 text-base leading-relaxed text-ink/65">
                    {post.excerpt}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <Tags tags={tags} />
                <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-ink/55 transition group-hover:text-ink">
                  Read essay
                  <span className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </div>
            </div>
          </div>
        </Link>
      </m.article>
    );
  }

  if (variant === "compact") {
    return (
      <m.article
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        custom={index}
        className="group border-t border-ink/10 py-7 first:border-t-0"
      >
        <Link href={href} className="block">
          <Meta post={post} />
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink transition group-hover:text-ink/75 sm:text-[26px]">
            {post.title}
          </h3>
          {post.excerpt ? (
            <p className="mt-2 text-[15px] leading-relaxed text-ink/60">
              {post.excerpt}
            </p>
          ) : null}
          <div className="mt-3">
            <Tags tags={tags} />
          </div>
        </Link>
      </m.article>
    );
  }

  return (
    <m.article
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      custom={index}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-ink/10 bg-paper transition hover:border-ink/20 hover:shadow-soft"
    >
      <Link href={href} className="flex flex-1 flex-col">
        <Cover post={post} className="aspect-[16/10]" />
        <div className="flex flex-1 flex-col gap-3 p-6">
          <Meta post={post} />
          <h3 className="text-xl font-semibold tracking-tight text-ink transition group-hover:text-ink/80">
            {post.title}
          </h3>
          {post.excerpt ? (
            <p className="line-clamp-3 text-sm leading-relaxed text-ink/60">
              {post.excerpt}
            </p>
          ) : null}
          <div className="mt-auto pt-2">
            <Tags tags={tags} />
          </div>
        </div>
      </Link>
    </m.article>
  );
}

function Cover({
  post,
  className = "",
}: {
  post: PostCardData;
  className?: string;
}) {
  if (post.coverImage) {
    return (
      <div className={`relative overflow-hidden bg-mist ${className}`}>
        <Image
          src={post.coverImage}
          alt={`${post.title} — cover image`}
          fill
          sizes="(min-width: 1024px) 600px, 100vw"
          className="object-cover transition duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/[0.06] to-transparent" />
      </div>
    );
  }
  return <PlaceholderCover className={className} title={post.title} />;
}

function PlaceholderCover({
  className,
  title,
}: {
  className?: string;
  title: string;
}) {
  const seed = (title.charCodeAt(0) || 0) % 360;
  return (
    <div
      className={`relative overflow-hidden ${className ?? ""}`}
      style={{
        background: `radial-gradient(120% 80% at 30% 20%, hsl(${seed} 30% 92%), hsl(${
          (seed + 60) % 360
        } 25% 96%) 60%, var(--color-paper))`,
      }}
    >
      <div className="absolute inset-0 grid place-items-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/30">
          ITAI · Blog
        </span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/[0.04] to-transparent" />
    </div>
  );
}

function Meta({ post }: { post: PostCardData }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45">
      {post.publishedAt ? <span>{formatDate(post.publishedAt)}</span> : null}
      {post.publishedAt ? <span className="text-ink/20">·</span> : null}
      <span>{post.readingTime} min read</span>
    </p>
  );
}

function Tags({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.slice(0, 3).map((t) => (
        <span
          key={t}
          className="rounded-full border border-ink/10 bg-ink/[0.03] px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-[0.14em] text-ink/55"
        >
          {t}
        </span>
      ))}
    </div>
  );
}
