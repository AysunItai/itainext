"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { getHomeCopy } from "@/lib/home-copy";
import type { Locale } from "@/lib/i18n";
import {
  trackFreeReviewClick,
  type ReviewButtonLocation,
} from "@/lib/analytics";

export default function ReviewCTAButton({
  location,
  label,
  className,
  locale = "en",
}: {
  location: ReviewButtonLocation;
  label?: string;
  className?: string;
  locale?: Locale;
}) {
  const home = getHomeCopy(locale);
  const href = home.reviewHref;
  const text = label ?? home.reviewButton;
  const isHe = locale === "he";

  return (
    <Link
      href={href}
      onClick={() => trackFreeReviewClick({ button_location: location })}
      className={
        className ??
        "group inline-flex min-h-[48px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper shadow-soft transition-all hover:-translate-y-0.5 hover:bg-ink-soft hover:shadow-lifted sm:w-auto"
      }
    >
      {text}
      <ArrowUpRight
        aria-hidden
        className={[
          "h-4 w-4 transition-transform",
          isHe
            ? "rotate-180 group-hover:-translate-x-px group-hover:-translate-y-px"
            : "group-hover:-translate-y-px group-hover:translate-x-px",
        ].join(" ")}
        strokeWidth={2}
      />
    </Link>
  );
}
