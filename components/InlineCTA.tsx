import InlineCTAActions from "./InlineCTAActions";
import type { BookButtonLocation } from "@/lib/analytics";

/**
 * Mid-page conversion band — drops between content sections to keep the
 * primary booking action visible without forcing the visitor to scroll
 * all the way back to the hero or down to the footer CTA.
 *
 * Two visual variants:
 *   - "soft"  : Light-bg compact card. Use right after the hero where a
 *               loud CTA would feel redundant.
 *   - "bold"  : Dark-ink card with grid backdrop. Use after a heavy
 *               content block (Work, Services) to re-engage scrollers.
 *
 * This file is a server component now. The framer-motion entry
 * animation was removed (it required a `whileInView` observer per
 * placement, and there are two of these on the homepage). The
 * analytics-bound buttons live in <InlineCTAActions />, a small client
 * island, so the surrounding text and layout ship zero JS.
 */

type Variant = "soft" | "bold";

type InlineCTAProps = {
  variant?: Variant;
  eyebrow?: string;
  heading: string;
  description?: string;
  /** Used as the analytics button_location for the booking CTA. */
  location: BookButtonLocation;
};

export default function InlineCTA({
  variant = "bold",
  eyebrow,
  heading,
  description,
  location,
}: InlineCTAProps) {
  const isBold = variant === "bold";

  return (
    <section
      aria-label={heading}
      className="relative px-5 py-12 sm:px-8 sm:py-20"
    >
      <div
        className={[
          "relative mx-auto max-w-4xl overflow-hidden rounded-[24px] p-6 sm:rounded-[28px] sm:p-10",
          isBold
            ? "bg-ink text-paper"
            : "border border-line bg-paper-soft text-ink",
        ].join(" ")}
      >
        {isBold ? (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent_75%)]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px]" />
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent/30 blur-3xl" />
          </div>
        ) : null}

        {/* Vertical-stacked layout: text on top, buttons in a row below.
            Avoids the cramped side-by-side layout where the long
            "Book a Free 15-Minute Consultation" label would wrap and turn
            the rounded-full pill into an almond shape. */}
        <div className="relative flex flex-col gap-7 sm:gap-8">
          <div className="max-w-2xl">
            {eyebrow ? (
              <p
                className={[
                  "font-mono text-[11px] uppercase tracking-[0.28em]",
                  isBold ? "text-paper/55" : "text-muted",
                ].join(" ")}
              >
                {eyebrow}
              </p>
            ) : null}
            <h2
              className={[
                "text-balance text-2xl font-semibold tracking-[-0.02em] sm:text-3xl",
                eyebrow ? "mt-3" : "",
                isBold ? "text-paper" : "text-ink",
              ].join(" ")}
            >
              {heading}
            </h2>
            {description ? (
              <p
                className={[
                  "mt-4 text-pretty text-[15px] leading-7 sm:text-base sm:leading-7",
                  isBold ? "text-paper/70" : "text-muted",
                ].join(" ")}
              >
                {description}
              </p>
            ) : null}
          </div>

          <InlineCTAActions location={location} isBold={isBold} />
        </div>
      </div>
    </section>
  );
}
