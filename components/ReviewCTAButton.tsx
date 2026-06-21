"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import {
  trackFreeReviewClick,
  type ReviewButtonLocation,
} from "@/lib/analytics";

export default function ReviewCTAButton({
  location,
  label = "Get Free Website Review",
  className,
}: {
  location: ReviewButtonLocation;
  label?: string;
  className?: string;
}) {
  return (
    <Link
      href="/free-website-review"
      onClick={() => trackFreeReviewClick({ button_location: location })}
      className={
        className ??
        "group inline-flex min-h-[48px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper shadow-soft transition-all hover:-translate-y-0.5 hover:bg-ink-soft hover:shadow-lifted sm:w-auto"
      }
    >
      {label}
      <ArrowUpRight
        aria-hidden
        className="h-4 w-4 transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
        strokeWidth={2}
      />
    </Link>
  );
}
