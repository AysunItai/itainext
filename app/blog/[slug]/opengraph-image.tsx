import { ImageResponse } from "next/og";
import { prisma } from "@/lib/prisma";
import { parseTags } from "@/lib/blog";

export const alt = "ITAI — Field notes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Params = { slug: string };

export default async function OpengraphImage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });

  const title = post?.title ?? "Field notes";
  const tags = post ? parseTags(post.tags) : [];
  const primaryTag = tags[0] ?? "Note";

  const titleSize = title.length > 64 ? 72 : title.length > 36 ? 88 : 104;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#fafafa",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          color: "#0a0a0a",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 22,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#6b7280",
          }}
        >
          <span style={{ fontWeight: 600, color: "#0a0a0a" }}>ITAI</span>
          <span style={{ width: 56, height: 1, background: "#d4d4d4" }} />
          <span>{primaryTag}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <h1
            style={{
              fontSize: titleSize,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
              margin: 0,
              maxWidth: 1040,
            }}
          >
            {title}
          </h1>
          {post?.excerpt && (
            <p
              style={{
                fontSize: 26,
                lineHeight: 1.5,
                color: "#6b7280",
                margin: 0,
                maxWidth: 920,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {post.excerpt}
            </p>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 20,
            color: "#6b7280",
          }}
        >
          <span>itaiwebsolutions.com/blog</span>
          <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                background: "#1e3a8a",
              }}
            />
            <span style={{ color: "#0a0a0a", fontWeight: 500 }}>
              Field notes from a studio
            </span>
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
