import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate, parseTags } from "@/lib/blog";
import AdminNav from "@/components/admin/AdminNav";
import PostRowActions from "@/components/admin/PostRowActions";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [posts, subscriberCount] = await Promise.all([
    prisma.post.findMany({ orderBy: [{ updatedAt: "desc" }] }),
    prisma.subscriber.count({
      where: { confirmed: true, unsubscribedAt: null },
    }),
  ]);

  const drafts = posts.filter((p) => !p.published).length;
  const published = posts.length - drafts;

  return (
    <>
      <AdminNav current="dashboard" />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">
              Studio · Editorial
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Posts
            </h1>
            <p className="mt-3 text-sm text-ink/60">
              {posts.length === 0
                ? "Nothing here yet. Write the first one."
                : `${published} published · ${drafts} draft${drafts === 1 ? "" : "s"}`}
              <span className="mx-2 text-ink/25">·</span>
              <Link
                href="/admin/subscribers"
                className="underline-offset-4 transition hover:text-ink hover:underline"
              >
                {subscriberCount} subscriber
                {subscriberCount === 1 ? "" : "s"}
              </Link>
            </p>
          </div>
          <Link
            href="/admin/posts/new"
            className="inline-flex h-11 items-center justify-center rounded-full bg-ink px-5 text-sm font-medium text-paper transition hover:bg-ink/90"
          >
            New post
          </Link>
        </header>

        {posts.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="overflow-hidden rounded-3xl border border-ink/10 bg-paper">
            {posts.map((post, idx) => {
              const tags = parseTags(post.tags);
              return (
                <li
                  key={post.id}
                  className={`flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:gap-6 ${
                    idx === 0 ? "" : "border-t border-ink/10"
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="truncate text-base font-medium text-ink underline-offset-4 hover:underline"
                      >
                        {post.title || "Untitled"}
                      </Link>
                      <StatusPill published={post.published} />
                    </div>
                    <p className="mt-1 truncate text-xs text-ink/55">
                      <span className="font-mono uppercase tracking-[0.14em]">
                        /{post.slug}
                      </span>
                      <span className="mx-2 text-ink/25">·</span>
                      Updated {formatDate(post.updatedAt)}
                      {post.published && post.publishedAt ? (
                        <>
                          <span className="mx-2 text-ink/25">·</span>
                          Published {formatDate(post.publishedAt)}
                        </>
                      ) : null}
                    </p>
                    {tags.length > 0 ? (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {tags.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-ink/10 bg-ink/[0.03] px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.12em] text-ink/55"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {post.published ? (
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-ink/15 px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.16em] text-ink/65 transition hover:border-ink/30 hover:text-ink"
                      >
                        View ↗
                      </Link>
                    ) : null}
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="rounded-full border border-ink/15 px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.16em] text-ink/65 transition hover:border-ink/30 hover:text-ink"
                    >
                      Edit
                    </Link>
                    <PostRowActions id={post.id} title={post.title || "Untitled"} />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </>
  );
}

function StatusPill({ published }: { published: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.14em] ${
        published
          ? "bg-accent/15 text-accent-soft"
          : "bg-ink/[0.05] text-ink/60"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          published ? "bg-accent" : "bg-ink/40"
        }`}
      />
      {published ? "Live" : "Draft"}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="rounded-3xl border border-dashed border-ink/15 bg-paper p-12 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/40">
        Empty studio
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink">
        No posts yet.
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-ink/60">
        Write your first essay. Drafts stay private until you publish — feel
        free to start messy.
      </p>
      <Link
        href="/admin/posts/new"
        className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-ink px-5 text-sm font-medium text-paper transition hover:bg-ink/90"
      >
        Write the first post
      </Link>
    </div>
  );
}
