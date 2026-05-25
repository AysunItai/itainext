import { NextResponse } from "next/server";
import { cookies } from "next/headers";
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

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const title = typeof body.title === "string" ? body.title.trim() : "";
  const content = typeof body.content === "string" ? body.content : "";
  const slugInput = typeof body.slug === "string" ? body.slug.trim() : "";
  const published = body.published === true;
  const excerptInput = typeof body.excerpt === "string" ? body.excerpt.trim() : "";
  const coverImage =
    typeof body.coverImage === "string" && body.coverImage.trim().length > 0
      ? body.coverImage.trim()
      : null;
  const tagsInput = typeof body.tags === "string" ? body.tags : "";

  if (!title) return NextResponse.json({ error: "Title is required." }, { status: 400 });
  if (!content) return NextResponse.json({ error: "Content is required." }, { status: 400 });

  const baseSlug = slugify(slugInput || title) || "post";
  const slug = await uniqueSlug(baseSlug);
  const excerpt = excerptInput || deriveExcerpt(content);
  const tags = serializeTags(tagsInput);
  const readingTime = calculateReadingTime(content);

  try {
    const post = await prisma.post.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage,
        tags,
        readingTime,
        published,
        publishedAt: published ? new Date() : null,
      },
    });
    return NextResponse.json({ ok: true, post });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return NextResponse.json(
        { error: "A post with that slug already exists." },
        { status: 409 },
      );
    }
    return NextResponse.json({ error: "Failed to create the post." }, { status: 500 });
  }
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const posts = await prisma.post.findMany({ orderBy: { updatedAt: "desc" } });
  return NextResponse.json({ posts });
}
