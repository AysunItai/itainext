import { ImageResponse } from "next/og";
import { getPublication, formatPrice, type Publication } from "@/lib/library";

export const alt = "ITAI Library — a practical ebook";
export const size = { width: 1200, height: 630 } as const;
export const contentType = "image/png";

const FONT_FAMILY =
  "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pub = getPublication(slug);

  if (!pub) {
    return new ImageResponse(<FallbackCard />, { ...size });
  }

  return new ImageResponse(<PublicationCard pub={pub} />, { ...size });
}

/* ─────────────────────────────────────────────────────────── */

function PublicationCard({ pub }: { pub: Publication }) {
  const [g1, g2] = pub.cover.gradient;
  const priceLabel = formatPrice(pub.priceCents);
  const isFree = pub.priceCents === 0;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#070b1a",
        color: "#ffffff",
        fontFamily: FONT_FAMILY,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          opacity: 0.7,
          display: "flex",
        }}
      />
      {/* Accent radial glow (top-right) */}
      <div
        style={{
          position: "absolute",
          top: -180,
          right: -160,
          width: 600,
          height: 600,
          borderRadius: 9999,
          background: `radial-gradient(circle, ${g2}55 0%, transparent 65%)`,
          display: "flex",
        }}
      />
      {/* Accent radial glow (bottom-left) */}
      <div
        style={{
          position: "absolute",
          bottom: -180,
          left: -120,
          width: 520,
          height: 520,
          borderRadius: 9999,
          background: `radial-gradient(circle, ${g1}66 0%, transparent 65%)`,
          display: "flex",
        }}
      />
      {/* Soft top vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(30,58,138,0.18), transparent 70%)",
          display: "flex",
        }}
      />

      {/* ────── Top row: brand + ribbon ────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 20,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          <span style={{ fontWeight: 600, color: "#ffffff" }}>ITAI</span>
          <span
            style={{
              width: 56,
              height: 1,
              background: "rgba(255,255,255,0.25)",
              display: "flex",
            }}
          />
          <span style={{ fontWeight: 500 }}>{pub.issue}</span>
        </div>

        {pub.ribbon && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 18px",
              borderRadius: 9999,
              background: "#ffffff",
              color: "#070b1a",
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 9999,
                background: "#1e3a8a",
                display: "flex",
              }}
            />
            <span>{pub.ribbon}</span>
          </div>
        )}
      </div>

      {/* ────── Middle: title + cover ────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 56,
          position: "relative",
          marginTop: 8,
        }}
      >
        {/* Left: text block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
            maxWidth: 680,
          }}
        >
          <h1
            style={{
              fontSize: 88,
              lineHeight: 1.02,
              letterSpacing: "-0.045em",
              fontWeight: 600,
              margin: 0,
              color: "#ffffff",
            }}
          >
            {pub.title}.
          </h1>
          <p
            style={{
              fontSize: 26,
              lineHeight: 1.45,
              color: "rgba(255,255,255,0.72)",
              margin: 0,
            }}
          >
            {pub.tagline}
          </p>
        </div>

        {/* Right: book cover */}
        <BookCoverGraphic pub={pub} />
      </div>

      {/* ────── Bottom: url + meta ────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          paddingTop: 28,
          borderTop: "1px solid rgba(255,255,255,0.12)",
          fontSize: 19,
          letterSpacing: "0.05em",
          color: "rgba(255,255,255,0.6)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <span style={{ color: "#ffffff", fontWeight: 500 }}>
            itaiwebsolutions.com
          </span>
          <span style={{ color: "rgba(255,255,255,0.25)" }}>/</span>
          <span>shop / {pub.slug}</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontFamily: FONT_FAMILY,
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            fontSize: 15,
          }}
        >
          <span>
            {pub.pages} pages · {pub.format}
          </span>
          <span
            style={{
              width: 4,
              height: 4,
              borderRadius: 9999,
              background: "rgba(255,255,255,0.25)",
              display: "flex",
            }}
          />
          <span>{pub.edition}</span>
          <span
            style={{
              width: 4,
              height: 4,
              borderRadius: 9999,
              background: "rgba(255,255,255,0.25)",
              display: "flex",
            }}
          />
          <span
            style={{
              color: isFree ? "#a7f3d0" : "#ffffff",
              fontWeight: 600,
              letterSpacing: "0.22em",
            }}
          >
            {priceLabel}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */

function BookCoverGraphic({ pub }: { pub: Publication }) {
  const [g1, g2, g3] = pub.cover.gradient;
  const w = 290;
  const h = 430;

  return (
    <div
      style={{
        position: "relative",
        width: w,
        height: h,
        display: "flex",
        transform: "rotate(-3deg)",
        transformOrigin: "center center",
        marginLeft: 8,
      }}
    >
      {/* Cast shadow */}
      <div
        style={{
          position: "absolute",
          inset: "auto -12px -22px -12px",
          height: 60,
          borderRadius: 9999,
          background:
            "radial-gradient(ellipse, rgba(0,0,0,0.55), transparent 70%)",
          filter: "blur(8px)",
          display: "flex",
        }}
      />

      {/* Page edge (right) */}
      <div
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          right: -10,
          width: 12,
          background: "linear-gradient(180deg, #f3eedb, #d8cfb5)",
          borderRadius: "0 3px 3px 0",
          boxShadow: "inset -1px 0 0 rgba(0,0,0,0.25)",
          display: "flex",
        }}
      />
      {/* Page edge (bottom) */}
      <div
        style={{
          position: "absolute",
          left: 4,
          right: -10,
          bottom: -6,
          height: 8,
          background: "linear-gradient(90deg, #e9e0c8, #cfc4a5)",
          borderRadius: "0 0 3px 3px",
          display: "flex",
        }}
      />

      {/* Front cover */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "26px 24px",
          borderRadius: 6,
          background: `linear-gradient(160deg, ${g1} 0%, ${g2} 55%, ${g3} 100%)`,
          boxShadow:
            "0 30px 50px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.08)",
          overflow: "hidden",
        }}
      >
        {/* Gloss sweep */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(115deg, transparent 38%, rgba(255,255,255,0.18) 50%, transparent 62%)",
            display: "flex",
          }}
        />
        {/* Inner border */}
        <div
          style={{
            position: "absolute",
            inset: 12,
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 3,
            display: "flex",
          }}
        />
        {/* Accent corner glows */}
        <div
          style={{
            position: "absolute",
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: 9999,
            background: "rgba(255,255,255,0.15)",
            filter: "blur(40px)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -40,
            width: 220,
            height: 220,
            borderRadius: 9999,
            background: "rgba(80,120,255,0.35)",
            filter: "blur(50px)",
            display: "flex",
          }}
        />

        {/* Header row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.72)",
            }}
          >
            {pub.issue}
          </span>
          <span
            style={{
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.82)",
              padding: "4px 10px",
              border: "1px solid rgba(255,255,255,0.28)",
              borderRadius: 9999,
            }}
          >
            {pub.format}
          </span>
        </div>

        {/* Title block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.62)",
              marginBottom: 14,
            }}
          >
            {pub.cover.captionTop}
          </span>
          <span
            style={{
              fontSize: 34,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              fontWeight: 600,
              color: "#ffffff",
            }}
          >
            {pub.cover.coverTitle[0]}
          </span>
          <span
            style={{
              fontSize: 34,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              fontWeight: 600,
              color: "#ffffff",
              marginTop: 2,
            }}
          >
            {pub.cover.coverTitle[1]}
          </span>
          <span
            style={{
              fontSize: 34,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              fontWeight: 600,
              color: "rgba(255,255,255,0.85)",
              marginTop: 2,
            }}
          >
            {pub.cover.coverTitle[2]}
          </span>
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
              marginTop: 18,
            }}
          >
            {pub.cover.captionBottom}
          </span>
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 9,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)",
              }}
            >
              By
            </span>
            <span
              style={{
                marginTop: 4,
                fontSize: 13,
                color: "#ffffff",
                fontWeight: 500,
              }}
            >
              {pub.author}
            </span>
          </div>
          <span
            style={{
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            {pub.cover.badge}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */

function FallbackCard() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#070b1a",
        color: "#ffffff",
        fontFamily: FONT_FAMILY,
      }}
    >
      <span
        style={{
          fontSize: 18,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.6)",
        }}
      >
        ITAI · Library
      </span>
      <h1
        style={{
          fontSize: 88,
          fontWeight: 600,
          letterSpacing: "-0.04em",
          margin: "20px 0 0",
        }}
      >
        Publication not found.
      </h1>
    </div>
  );
}
