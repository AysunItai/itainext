import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Editor from "@/components/admin/Editor";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Edit post" };
export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [post, subscriberCount] = await Promise.all([
    prisma.post.findUnique({ where: { id } }),
    prisma.subscriber.count({
      where: { confirmed: true, unsubscribedAt: null },
    }),
  ]);
  if (!post) notFound();

  return (
    <Editor
      mode="edit"
      subscriberCount={subscriberCount}
      initial={{
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt ?? "",
        content: post.content,
        coverImage: post.coverImage ?? "",
        tags: post.tags,
        published: post.published,
        notifiedAt: post.notifiedAt ? post.notifiedAt.toISOString() : null,
      }}
    />
  );
}
