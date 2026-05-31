import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

async function requireAdmin() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  return await verifySessionToken(token);
}

export async function GET(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  if (url.searchParams.get("format") === "csv") {
    const subs = await prisma.subscriber.findMany({
      orderBy: { createdAt: "desc" },
    });
    const rows = [
      [
        "email",
        "confirmed",
        "unsubscribed",
        "createdAt",
        "confirmedAt",
        "source",
      ].join(","),
      ...subs.map((s) =>
        [
          quoteCsv(s.email),
          s.confirmed ? "yes" : "no",
          s.unsubscribedAt ? s.unsubscribedAt.toISOString() : "",
          s.createdAt.toISOString(),
          s.confirmedAt ? s.confirmedAt.toISOString() : "",
          quoteCsv(s.source ?? ""),
        ].join(","),
      ),
    ];
    const csv = rows.join("\n") + "\n";
    const filename = `itai-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    return new Response(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  }

  const subs = await prisma.subscriber.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      confirmed: true,
      createdAt: true,
      confirmedAt: true,
      unsubscribedAt: true,
      source: true,
    },
  });
  return NextResponse.json({ subscribers: subs });
}

function quoteCsv(value: string): string {
  if (/[,"\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
