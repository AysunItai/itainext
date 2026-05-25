import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  const blogUrl = new URL("/blog", url.origin);

  if (!token) {
    blogUrl.searchParams.set("status", "invalid");
    return NextResponse.redirect(blogUrl);
  }

  const sub = await prisma.subscriber.findUnique({
    where: { confirmToken: token },
  });

  if (!sub) {
    blogUrl.searchParams.set("status", "invalid");
    return NextResponse.redirect(blogUrl);
  }

  if (!sub.confirmed) {
    await prisma.subscriber.update({
      where: { id: sub.id },
      data: {
        confirmed: true,
        confirmedAt: new Date(),
        unsubscribedAt: null,
      },
    });
  }

  blogUrl.searchParams.set("status", "confirmed");
  return NextResponse.redirect(blogUrl);
}
