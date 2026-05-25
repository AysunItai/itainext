import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Supports both GET (link click) and POST (RFC 8058 one-click unsubscribe).
// Both redirect to /blog?status=unsubscribed for GET; POST returns JSON.

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  const blogUrl = new URL("/blog", url.origin);

  if (!token) {
    blogUrl.searchParams.set("status", "invalid");
    return NextResponse.redirect(blogUrl);
  }

  const sub = await prisma.subscriber.findUnique({
    where: { unsubToken: token },
  });

  if (!sub) {
    blogUrl.searchParams.set("status", "invalid");
    return NextResponse.redirect(blogUrl);
  }

  if (!sub.unsubscribedAt) {
    await prisma.subscriber.update({
      where: { id: sub.id },
      data: { unsubscribedAt: new Date(), confirmed: false },
    });
  }

  blogUrl.searchParams.set("status", "unsubscribed");
  return NextResponse.redirect(blogUrl);
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Missing token." }, { status: 400 });
  }

  const sub = await prisma.subscriber.findUnique({
    where: { unsubToken: token },
  });

  if (!sub) {
    return NextResponse.json({ error: "Invalid token." }, { status: 404 });
  }

  if (!sub.unsubscribedAt) {
    await prisma.subscriber.update({
      where: { id: sub.id },
      data: { unsubscribedAt: new Date(), confirmed: false },
    });
  }

  return NextResponse.json({ ok: true });
}
