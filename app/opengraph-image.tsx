import { ImageResponse } from "next/og";

export const alt = "ITAI — Modern Digital Systems";
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
          <span
            style={{ width: 56, height: 1, background: "#d4d4d4" }}
          />
          <span>Studio</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <h1
            style={{
              fontSize: 96,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
              margin: 0,
              maxWidth: 980,
            }}
          >
            Modern digital systems for growing businesses.
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
            Custom websites, AI automation, booking systems, and dashboards —
            engineering depth, design restraint.
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
          <span>itaiwebsolutions.com</span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                background: "#1e3a8a",
              }}
            />
            <span style={{ color: "#0a0a0a", fontWeight: 500 }}>
              An independent studio
            </span>
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
