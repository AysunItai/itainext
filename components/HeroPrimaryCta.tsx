"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { trackBookConsultationClick } from "@/lib/analytics";

/**
 * Small client island for the hero's booking CTA. We extract just the
 * onClick analytics here so the rest of the Hero can render as a server
 * component (no framer-motion bundle blocking the LCP paint).
 */
export default function HeroPrimaryCta() {
  return (
    <Link
      href="/book"
      onClick={() => trackBookConsultationClick({ button_location: "hero" })}
      className="group inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-soft hover:shadow-lifted sm:w-auto"
    >
      Book a Free 15-Minute Consultation
      <ArrowUpRight
        aria-hidden
        className="h-4 w-4 transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
      />
    </Link>
  );
}
