import ReviewCTAButton from "./ReviewCTAButton";
import type { ReviewButtonLocation } from "@/lib/analytics";

type Variant = "soft" | "bold";

type ReviewCTAProps = {
  variant?: Variant;
  eyebrow?: string;
  heading: string;
  description?: string;
  location: ReviewButtonLocation;
  buttonLabel?: string;
};

/**
 * Repeated lead CTA band — points visitors to the free website review flow.
 */
export default function ReviewCTA({
  variant = "bold",
  eyebrow,
  heading,
  description,
  location,
  buttonLabel,
}: ReviewCTAProps) {
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

          <ReviewCTAButton
            location={location}
            label={buttonLabel}
            className={[
              "group inline-flex min-h-[48px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 py-3.5 text-sm font-medium transition-all sm:w-auto",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              isBold
                ? "bg-paper text-ink hover:-translate-y-0.5 hover:shadow-lifted focus-visible:ring-paper focus-visible:ring-offset-ink"
                : "bg-ink text-paper hover:-translate-y-0.5 hover:bg-ink-soft hover:shadow-lifted focus-visible:ring-ink",
            ].join(" ")}
          />
        </div>
      </div>
    </section>
  );
}
