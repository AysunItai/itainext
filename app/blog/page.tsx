import type { Metadata } from "next";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import PostCard from "@/components/blog/PostCard";
import SubscribeForm from "@/components/blog/SubscribeForm";
import SubscribeStatusBanner from "@/components/blog/SubscribeStatusBanner";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Field notes from ITAI on engineering, design restraint, and the systems I build for ambitious teams.",
  openGraph: {
    title: "Notes · ITAI",
    description:
      "Field notes from ITAI on engineering, design restraint, and the systems I build for ambitious teams.",
  },
};

export const dynamic = "force-dynamic";

export default async function BlogIndexPage() {
  const [posts, subscriberCount] = await Promise.all([
    prisma.post.findMany({
      where: { published: true },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    }),
    prisma.subscriber.count({
      where: { confirmed: true, unsubscribedAt: null },
    }),
  ]);

  const [feature, ...rest] = posts;
  const grid = rest.slice(0, 5);
  const overflow = rest.slice(5);

  return (
    <main id="main" className="relative">
      <Hero count={posts.length} />

      <Suspense fallback={null}>
        <SubscribeStatusBanner />
      </Suspense>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        {posts.length === 0 ? (
          <EmptyState subscriberCount={subscriberCount} />
        ) : (
          <>
            {feature ? (
              <div className="mb-16">
                <PostCard post={feature} variant="feature" index={0} />
              </div>
            ) : null}

            {grid.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {grid.map((post, idx) => (
                  <PostCard key={post.id} post={post} index={idx + 1} />
                ))}
              </div>
            ) : null}

            {overflow.length > 0 ? (
              <div className="mt-20">
                <h2 className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/45">
                  More
                </h2>
                <div>
                  {overflow.map((post, idx) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      variant="compact"
                      index={idx}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-20">
              <SubscribeForm
                count={subscriberCount}
                eyebrow="Stay in the loop"
                heading="One note when something new lands."
              />
            </div>
          </>
        )}
      </section>
    </main>
  );
}

function Hero({ count }: { count: number }) {
  return (
    <section className="relative isolate overflow-hidden border-b border-ink/10 bg-paper-soft px-6 pt-32 pb-20 sm:pt-40 sm:pb-24">
      <BackgroundField />
      <div className="relative mx-auto max-w-4xl text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/45">
          ITAI · Notes
        </p>
        <h1 className="mt-5 text-balance text-5xl font-semibold tracking-tight text-ink sm:text-6xl lg:text-7xl">
          Field notes from a small studio.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink/60 sm:text-xl">
          Essays on engineering depth, design restraint, and the practical
          systems I build for ambitious teams. No frameworks-of-the-week,
          no hot takes — just durable ideas.
        </p>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/40">
          {count} {count === 1 ? "essay" : "essays"} · published occasionally
        </p>
      </div>
    </section>
  );
}

function BackgroundField() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-accent/[0.05] blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "32px 32px",
          color: "var(--color-ink, #0a0a0a)",
        }}
      />
    </div>
  );
}

function EmptyState({ subscriberCount }: { subscriberCount: number }) {
  return (
    <div className="mx-auto max-w-2xl py-12">
      <div className="rounded-3xl border border-dashed border-ink/15 bg-paper p-10 text-center sm:p-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/40">
          Coming soon
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          First essays in the works.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink/60">
          Drop your email below and you&apos;ll get the first one when it
          publishes — and nothing else until the next.
        </p>
      </div>
      <div className="mt-8">
        <SubscribeForm
          count={subscriberCount}
          eyebrow="Be the first to read"
          heading="Get notes in your inbox."
        />
      </div>
    </div>
  );
}
