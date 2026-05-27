import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { calculateReadingTime, deriveExcerpt, serializeTags, slugify } from "@/lib/blog";
import { uniqueSlug } from "@/lib/blog-server";

async function requireAdmin() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  return await verifySessionToken(token);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;

  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found." }, { status: 404 });

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const title = typeof body.title === "string" ? body.title.trim() : existing.title;
  const content = typeof body.content === "string" ? body.content : existing.content;
  const slugInput = typeof body.slug === "string" ? body.slug.trim() : existing.slug;
  const published = typeof body.published === "boolean" ? body.published : existing.published;
  const excerptInput =
    typeof body.excerpt === "string" ? body.excerpt.trim() : existing.excerpt ?? "";
  const coverImage =
    typeof body.coverImage === "string"
      ? body.coverImage.trim() || null
      : body.coverImage === null
        ? null
        : existing.coverImage;
  const tagsInput = typeof body.tags === "string" ? body.tags : existing.tags;

  if (!title) return NextResponse.json({ error: "Title is required." }, { status: 400 });
  if (!content) return NextResponse.json({ error: "Content is required." }, { status: 400 });

  const desiredSlugBase = slugify(slugInput || title) || "post";
  const slug =
    desiredSlugBase === existing.slug
      ? existing.slug
      : await uniqueSlug(desiredSlugBase, existing.id);

  const excerpt = excerptInput || deriveExcerpt(content);
  const tags = serializeTags(tagsInput);
  const readingTime = calculateReadingTime(content);

  // First-time publish stamp; later edits keep original publishedAt.
  const publishedAt =
    published && !existing.publishedAt
      ? new Date()
      : !published
        ? null
        : existing.publishedAt;

  try {
    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage,
        tags,
        readingTime,
        published,
        publishedAt,
      },
    });
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
    if (existing.slug !== post.slug) revalidatePath(`/blog/${existing.slug}`);
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ ok: true, post });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return NextResponse.json(
        { error: "A post with that slug already exists." },
        { status: 409 },
      );
    }
    return NextResponse.json({ error: "Failed to update the post." }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  try {
    const deleted = await prisma.post.delete({ where: { id } });
    revalidatePath("/blog");
    revalidatePath(`/blog/${deleted.slug}`);
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }
    return NextResponse.json({ error: "Failed to delete." }, { status: 500 });
  }
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ post });
}
