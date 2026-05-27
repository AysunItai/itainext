import { ImageResponse } from "next/og";

export const alt = "Field notes from ITAI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          <span>Notes</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <h1
            style={{
              fontSize: 112,
              fontWeight: 600,
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
              margin: 0,
              maxWidth: 1000,
            }}
          >
            Field notes from a small studio.
          </h1>
          <p
            style={{
              fontSize: 28,
              lineHeight: 1.5,
              color: "#6b7280",
              margin: 0,
              maxWidth: 880,
            }}
          >
            Essays on engineering depth, design restraint, and the systems I
            build for ambitious teams.
          </p>
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
          <span style={{ color: "#0a0a0a", fontWeight: 500 }}>
            Published occasionally
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
