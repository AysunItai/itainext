"use client";

import { m, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Publication } from "@/lib/library";

type Variant = "card" | "showcase";

/**
 * CSS/SVG-rendered hardcover book, no asset required. The card variant is
 * compact and used in listings; the showcase variant is large and gets a
 * subtle parallax tilt that tracks the mouse.
 */
export default function BookCover({
  pub,
  variant = "card",
  className = "",
}: {
  pub: Publication;
  variant?: Variant;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const showcase = variant === "showcase";

  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!showcase || reduce) return;
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      setTilt({ rx: -dy * 6, ry: dx * 10 });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [showcase, reduce]);

  const [g1, g2, g3] = pub.cover.gradient;

  return (
    <div
      className={[
        "relative select-none",
        showcase ? "[perspective:1600px]" : "[perspective:1200px]",
        className,
      ].join(" ")}
      style={{ transformStyle: "preserve-3d" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <m.div
        className="relative aspect-[2/3] w-full"
        animate={
          reduce
            ? {}
            : showcase
              ? {
                  rotateX: tilt.rx,
                  rotateY: tilt.ry || -14,
                  rotateZ: 0,
                }
              : {
                  rotateY: hover ? -8 : -14,
                  rotateX: hover ? 2 : 6,
                }
        }
        transition={{ type: "spring", stiffness: 80, damping: 18 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Page edge — back / right side */}
        <div
          aria-hidden
          className="absolute inset-y-0 right-0 w-[14px] rounded-r-[3px] bg-gradient-to-b from-[#f6f3ec] via-[#e9e2cf] to-[#d8cfb5]"
          style={{
            transform: "rotateY(90deg) translateZ(-7px)",
            transformOrigin: "right center",
            boxShadow: "inset -1px 0 0 rgba(0,0,0,0.25)",
          }}
        />

        {/* Top page edge */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[6px] bg-gradient-to-r from-[#e7e0cd] via-[#f3eddc] to-[#cfc4a5]"
          style={{
            transform: "rotateX(90deg) translateZ(-3px)",
            transformOrigin: "top center",
          }}
        />

        {/* Spine (slight darker strip on the left) */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 w-[16px] rounded-l-[3px]"
          style={{
            background: `linear-gradient(180deg, ${g1}, ${g3})`,
            transform: "rotateY(-90deg) translateZ(-8px)",
            transformOrigin: "left center",
            boxShadow: "inset 1px 0 0 rgba(255,255,255,0.06)",
          }}
        />

        {/* Front cover */}
        <div
          className="relative h-full w-full overflow-hidden rounded-[6px] ring-1 ring-black/40"
          style={{
            background: `linear-gradient(160deg, ${g1} 0%, ${g2} 55%, ${g3} 100%)`,
            boxShadow: showcase
              ? "0 60px 80px -30px rgba(8,12,40,0.55), 0 30px 50px -25px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.05)"
              : "0 30px 50px -25px rgba(8,12,40,0.5), 0 12px 24px -16px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.06)",
          }}
        >
          {/* Subtle grid texture */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              maskImage:
                "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 75%)",
            }}
          />

          {/* Soft accent glow */}
          <div
            aria-hidden
            className="absolute -right-12 -top-12 h-44 w-44 rounded-full blur-3xl"
            style={{ background: "rgba(255,255,255,0.25)" }}
          />
          <div
            aria-hidden
            className="absolute -bottom-16 -left-10 h-56 w-56 rounded-full blur-3xl"
            style={{ background: "rgba(80,120,255,0.35)" }}
          />

          {/* Gloss sweep */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(115deg, transparent 38%, rgba(255,255,255,0.18) 50%, transparent 62%)",
              mixBlendMode: "screen",
            }}
          />

          {/* Inner border */}
          <div
            aria-hidden
            className="absolute inset-3 rounded-[3px] border border-white/10"
          />

          {/* Content */}
          <div className="relative flex h-full flex-col justify-between p-5 sm:p-7">
            <div className="flex items-center justify-between">
              <span
                className={[
                  "font-mono uppercase tracking-[0.32em] text-white/70",
                  showcase ? "text-[10px]" : "text-[8px]",
                ].join(" ")}
              >
                {pub.issue}
              </span>
              <span
                className={[
                  "rounded-full border border-white/25 px-2 py-0.5 font-mono uppercase tracking-[0.2em] text-white/80",
                  showcase ? "text-[9px]" : "text-[7px]",
                ].join(" ")}
              >
                {pub.format}
              </span>
            </div>

            <div className="-mt-2 flex-1 flex flex-col justify-center">
              <p
                className={[
                  "font-mono uppercase tracking-[0.32em] text-white/60",
                  showcase ? "text-[10px]" : "text-[8px]",
                ].join(" ")}
              >
                {pub.cover.captionTop}
              </p>
              <h3
                className={[
                  "mt-3 font-semibold leading-[0.92] tracking-[-0.04em] text-white",
                  showcase
                    ? "text-[clamp(1.6rem,4vw,2.8rem)]"
                    : "text-[clamp(0.95rem,3.4vw,1.45rem)]",
                ].join(" ")}
              >
                {pub.cover.coverTitle[0]}
                <br />
                {pub.cover.coverTitle[1]}
                <br />
                <span className="text-white/85">
                  {pub.cover.coverTitle[2]}
                </span>
              </h3>
              <p
                className={[
                  "mt-4 font-mono uppercase tracking-[0.28em] text-white/55",
                  showcase ? "text-[10px]" : "text-[7.5px]",
                ].join(" ")}
              >
                {pub.cover.captionBottom}
              </p>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <p
                  className={[
                    "font-mono uppercase tracking-[0.22em] text-white/55",
                    showcase ? "text-[9px]" : "text-[7px]",
                  ].join(" ")}
                >
                  By
                </p>
                <p
                  className={[
                    "mt-1 font-medium tracking-tight text-white",
                    showcase ? "text-sm" : "text-[10px]",
                  ].join(" ")}
                >
                  {pub.author}
                </p>
              </div>
              <span
                className={[
                  "font-mono uppercase tracking-[0.22em] text-white/55",
                  showcase ? "text-[9px]" : "text-[7px]",
                ].join(" ")}
              >
                {pub.cover.badge}
              </span>
            </div>
          </div>
        </div>

        {/* Cast shadow on the ground */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-6 left-[8%] right-[8%] h-12 rounded-[50%] opacity-50 blur-2xl"
          style={{
            background:
              "radial-gradient(ellipse, rgba(8,12,40,0.55), transparent 70%)",
          }}
        />
      </m.div>
    </div>
  );
}
