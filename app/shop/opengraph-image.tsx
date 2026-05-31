import { ImageResponse } from "next/og";
import { listPublications, type Publication } from "@/lib/library";

export const alt = "The ITAI Library — practical ebooks for builders";
export const size = { width: 1200, height: 630 } as const;
export const contentType = "image/png";

const FONT_FAMILY =
  "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

/** Three teaser palettes used for the upcoming-volume placeholder spines. */
const PLACEHOLDER_PALETTES: Array<[string, string, string]> = [
  ["#1f2937", "#0f172a", "#020617"], // graphite
  ["#3b0764", "#1e1b4b", "#020617"], // plum
  ["#064e3b", "#0f172a", "#020617"], // forest
];

export default function OgImage() {
  const pubs = listPublications();
  const first = pubs[0];

  // Always render three spines on the right — pad with placeholders so the
  // composition reads as "a library", not "one book".
  const spines: Array<{
    title: string;
    palette: [string, string, string];
    label: string;
    real: boolean;
  }> = [];

  if (first) {
    spines.push({
      title: first.cover.coverTitle.join(" "),
      palette: first.cover.gradient,
      label: first.issue,
      real: true,
    });
  }

  const placeholders = [
    { title: "TypeScript Reliability Handbook", label: "Vol. 02" },
    { title: "Next.js in Production", label: "Vol. 03" },
  ];

  for (let i = 0; spines.length < 3 && i < placeholders.length; i++) {
    spines.push({
      title: placeholders[i].title,
      palette: PLACEHOLDER_PALETTES[i + 1],
      label: placeholders[i].label,
      real: false,
    });
  }

  return new ImageResponse(<LibraryCard spines={spines} first={first} />, {
    ...size,
  });
}

/* ─────────────────────────────────────────────────────────── */

function LibraryCard({
  spines,
  first,
}: {
  spines: Array<{
    title: string;
    palette: [string, string, string];
    label: string;
    real: boolean;
  }>;
  first?: Publication;
}) {
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
          opacity: 0.6,
          display: "flex",
        }}
      />
      {/* Center glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "30%",
          width: 700,
          height: 360,
          borderRadius: 9999,
          background:
            "radial-gradient(ellipse, rgba(30,64,175,0.35) 0%, transparent 70%)",
          filter: "blur(20px)",
          display: "flex",
        }}
      />

      {/* Top row */}
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
          <span style={{ fontWeight: 500 }}>The Library</span>
        </div>

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
          <span>Free this season</span>
        </div>
      </div>

      {/* Middle: title + spines */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 48,
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
            maxWidth: 600,
          }}
        >
          <h1
            style={{
              fontSize: 96,
              lineHeight: 0.98,
              letterSpacing: "-0.045em",
              fontWeight: 600,
              margin: 0,
              color: "#ffffff",
            }}
          >
            Field manuals
          </h1>
          <h1
            style={{
              fontSize: 96,
              lineHeight: 0.98,
              letterSpacing: "-0.045em",
              fontWeight: 600,
              margin: 0,
              color: "rgba(255,255,255,0.55)",
            }}
          >
            for builders.
          </h1>
          <p
            style={{
              fontSize: 24,
              lineHeight: 1.45,
              color: "rgba(255,255,255,0.7)",
              margin: 0,
              marginTop: 6,
            }}
          >
            Practical ebooks for engineering teams. Read in an afternoon. Keep
            on your second monitor forever.
          </p>
        </div>

        {/* Spines */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 14,
            marginLeft: "auto",
          }}
        >
          {spines.map((s, i) => (
            <Spine key={i} index={i} {...s} />
          ))}
        </div>
      </div>

      {/* Bottom row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          paddingTop: 28,
          borderTop: "1px solid rgba(255,255,255,0.12)",
          fontSize: 19,
          color: "rgba(255,255,255,0.6)",
        }}
      >
        <span style={{ color: "#ffffff", fontWeight: 500 }}>
          itaiwebsolutions.com/shop
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 15,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          {first ? (
            <>
              <span>{first.issue} · Out now</span>
              <span
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: 9999,
                  background: "rgba(255,255,255,0.25)",
                  display: "flex",
                }}
              />
              <span style={{ color: "#a7f3d0", fontWeight: 600 }}>
                Free download
              </span>
            </>
          ) : (
            <span>New volumes shipping in 2026</span>
          )}
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */

function Spine({
  title,
  palette,
  label,
  real,
  index,
}: {
  title: string;
  palette: [string, string, string];
  label: string;
  real: boolean;
  index: number;
}) {
  // Slight tilt for visual rhythm, middle one stands tallest.
  const tilts = [-4, 1.5, -1.5];
  const heights = [310, 360, 320];
  const widths = [78, 92, 78];

  const [g1, g2, g3] = palette;

  return (
    <div
      style={{
        position: "relative",
        width: widths[index],
        height: heights[index],
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "18px 12px",
        borderRadius: 4,
        background: `linear-gradient(180deg, ${g1} 0%, ${g2} 55%, ${g3} 100%)`,
        boxShadow:
          "0 20px 40px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.08)",
        transform: `rotate(${tilts[index]}deg) translateY(${index === 1 ? -8 : 0}px)`,
        transformOrigin: "bottom center",
        overflow: "hidden",
        opacity: real ? 1 : 0.92,
      }}
    >
      {/* Gloss */}
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
          inset: 6,
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: 2,
          display: "flex",
        }}
      />

      <span
        style={{
          fontSize: 10,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.7)",
          position: "relative",
        }}
      >
        {label}
      </span>

      {/* Vertical title text */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          position: "relative",
        }}
      >
        <span
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "center center",
            whiteSpace: "nowrap",
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "#ffffff",
            maxWidth: heights[index] - 70,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "flex",
          }}
        >
          {title}
        </span>
      </div>

      <span
        style={{
          fontSize: 9,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.55)",
          position: "relative",
          textAlign: "center",
        }}
      >
        ITAI
      </span>
    </div>
  );
}
