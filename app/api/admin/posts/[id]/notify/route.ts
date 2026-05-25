import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { sendPostBroadcast } from "@/lib/email";

async function requireAdmin() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  return await verifySessionToken(token);
}

// POST /api/admin/posts/[id]/notify
// Body: { force?: boolean }  — if true, allow re-sending after notifiedAt is set.
//
// Sends the published post to every confirmed, non-unsubscribed subscriber.
// Stamps notifiedAt on success so the UI can disable the button.

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;

  let body: { force?: boolean } = {};
  try {
    body = (await request.json()) as { force?: boolean };
  } catch {
    // empty body is fine
  }

  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) {
    return NextResponse.json({ error: "Post not found." }, { status: 404 });
  }
  if (!post.published) {
    return NextResponse.json(
      { error: "Publish the post before sending it to subscribers." },
      { status: 400 },
    );
  }
  if (post.notifiedAt && !body.force) {
    return NextResponse.json(
      {
        error: `Already sent on ${post.notifiedAt.toISOString().slice(0, 10)}. Pass {force:true} to re-send.`,
      },
      { status: 409 },
    );
  }

  const recipients = await prisma.subscriber.findMany({
    where: { confirmed: true, unsubscribedAt: null },
    select: { email: true, unsubToken: true },
  });

  if (recipients.length === 0) {
    return NextResponse.json(
      { error: "No confirmed subscribers yet." },
      { status: 400 },
    );
  }

  try {
    const result = await sendPostBroadcast({
      post: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage,
        readingTime: post.readingTime,
      },
      recipients,
    });

    if (result.sent > 0) {
      await prisma.post.update({
        where: { id: post.id },
        data: { notifiedAt: new Date() },
      });
    }

    return NextResponse.json({ ok: true, ...result, recipients: recipients.length });
  } catch (err) {
    console.error("[notify] broadcast error", err);
    const message = err instanceof Error ? err.message : "Failed to send.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
