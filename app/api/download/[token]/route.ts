import { NextResponse } from "next/server";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import type { ReadableStream as NodeWebReadableStream } from "node:stream/web";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/download/[token]
 *
 * Streams a paid digital product to the buyer. The token is the only
 * credential — issued by the webhook fulfillment path (Phase 7) and
 * delivered to the customer by email (Phase 9, not yet wired).
 *
 * Responses:
 *   200            — file stream
 *   404            — unknown token, unpaid order, or file missing on disk
 *   410 Gone       — token expired or over the download limit
 *   500            — unexpected
 *
 * 404 vs 410: 404 means "we won't tell you whether this token ever
 * existed." 410 is reserved for tokens we recognize but that are out of
 * runway, so customer support can distinguish "wrong link" from "your
 * link timed out, here's a fresh one."
 */

// Resolve once at module load. Absolute path simplifies the traversal check.
const PRIVATE_FILES_ROOT = path.resolve(
  process.cwd(),
  process.env.PRIVATE_FILES_ROOT ?? "./private-files",
);

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;

  if (!token || typeof token !== "string") {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  // ─── Look up the token ──────────────────────────────────────────────
  const download = await prisma.download.findUnique({
    where: { token },
    include: { order: true },
  });

  if (!download) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  // Order must be paid. We deliberately collapse "missing order" and
  // "unpaid order" into 404 — no need to leak why the link is invalid.
  if (download.order.status !== "paid") {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  // ─── Expired? ───────────────────────────────────────────────────────
  if (Date.now() >= download.expiresAt.getTime()) {
    return NextResponse.json(
      { error: "This download link has expired." },
      { status: 410 },
    );
  }

  // ─── Over limit? ────────────────────────────────────────────────────
  if (download.downloadCount >= download.maxDownloads) {
    return NextResponse.json(
      { error: "This download link has reached its download limit." },
      { status: 410 },
    );
  }

  // ─── Resolve + traversal guard ──────────────────────────────────────
  // Defense in depth: the path comes from our own server-side catalog,
  // but a future bug (string concat, slug injection elsewhere) shouldn't
  // be able to read /etc/passwd via this route.
  const resolved = path.resolve(PRIVATE_FILES_ROOT, download.privateFilePath);
  const rel = path.relative(PRIVATE_FILES_ROOT, resolved);
  if (rel.startsWith("..") || path.isAbsolute(rel)) {
    console.error("[download] Path traversal attempt blocked", {
      token: download.token,
      privateFilePath: download.privateFilePath,
      resolved,
    });
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  // ─── Stat (existence + size for Content-Length) ─────────────────────
  let size: number;
  try {
    const stats = await stat(resolved);
    if (!stats.isFile()) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }
    size = stats.size;
  } catch {
    // ENOENT or any read error — treat as not found to avoid leaking
    // server filesystem layout in error messages.
    console.error("[download] File missing on disk", {
      token: download.token,
      resolved,
    });
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  // Look up the product to pick a download filename + content type.
  // We deliberately don't snapshot these on the Download row — they're
  // presentational, and re-reading them lets you fix a typo in the
  // download filename without invalidating outstanding links.
  const { getProduct } = await import("@/lib/products");
  const product = getProduct(download.productSlug);
  const contentType = product?.contentType ?? "application/octet-stream";
  const downloadFileName =
    product?.downloadFileName ?? path.basename(download.privateFilePath);

  // ─── Count this download BEFORE streaming ───────────────────────────
  // Conservative — a half-finished stream still consumes a slot. Easier
  // to forgive (re-issue a token) than to forget (the buyer downloads
  // 200 times in a script and we never noticed).
  try {
    await prisma.download.update({
      where: { id: download.id },
      data: {
        downloadCount: { increment: 1 },
        lastDownloadedAt: new Date(),
      },
    });
  } catch (err) {
    console.error("[download] Failed to update download counter", err);
    // Soft-fail: still serve the file. Counter drift is a smaller bug
    // than blocking a legitimate paid download because of a transient
    // DB hiccup.
  }

  // ─── Stream the file ────────────────────────────────────────────────
  const nodeStream = createReadStream(resolved);
  const webStream = Readable.toWeb(nodeStream) as NodeWebReadableStream<Uint8Array>;

  return new Response(webStream as unknown as ReadableStream<Uint8Array>, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Length": String(size),
      "Content-Disposition": `attachment; filename="${encodeFilename(downloadFileName)}"`,
      // Don't let a CDN or browser cache a per-token URL.
      "Cache-Control": "private, no-store",
    },
  });
}

/**
 * RFC 5987-ish filename encoding for Content-Disposition. Keeps ASCII
 * filenames untouched and percent-encodes anything else. Avoids the
 * classic quoting bugs when titles contain commas, semicolons, or
 * non-Latin characters.
 */
function encodeFilename(name: string): string {
  return name.replace(/[^\x20-\x7E]/g, (c) => encodeURIComponent(c));
}
