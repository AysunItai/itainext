"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { trackFreeReviewClick } from "@/lib/analytics";

/**
 * Small client island for the hero's primary lead CTA.
 */
export default function HeroPrimaryCta() {
  return (
    <Link
      href="/free-website-review"
      onClick={() => trackFreeReviewClick({ button_location: "hero" })}
      className="group inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-soft hover:shadow-lifted sm:w-auto"
    >
      Get a Free Website Review
      <ArrowUpRight
        aria-hidden
        className="h-4 w-4 transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
      />
    </Link>
  );
}
