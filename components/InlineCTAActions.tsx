"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { WhatsAppGlyph } from "@/components/library/brand-icons";
import {
  trackBookConsultationClick,
  trackWhatsAppClick,
  type BookButtonLocation,
} from "@/lib/analytics";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
const WHATSAPP_MESSAGE =
  "Hi! I'd like to ask about a free website consultation.";

function buildWhatsAppUrl(): string | null {
  if (!WHATSAPP_NUMBER) return null;
  const cleaned = WHATSAPP_NUMBER.replace(/\D/g, "");
  if (!cleaned) return null;
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
}

/**
 * Small client island for the InlineCTA's two analytics-bound CTAs
 * (book + WhatsApp). Extracted so the surrounding <InlineCTA /> can
 * render as a server component — these two onClick handlers were the
 * only reason any of that section needed to hydrate.
 */
export default function InlineCTAActions({
  location,
  isBold,
}: {
  location: BookButtonLocation;
  isBold: boolean;
}) {
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
      <Link
        href="/book"
        onClick={() =>
          trackBookConsultationClick({ button_location: location })
        }
        className={[
          "group inline-flex min-h-[48px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 py-3.5 text-sm font-medium transition-all sm:w-auto",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          isBold
            ? "bg-paper text-ink hover:-translate-y-0.5 hover:shadow-lifted focus-visible:ring-paper focus-visible:ring-offset-ink"
            : "bg-ink text-paper hover:-translate-y-0.5 hover:bg-ink-soft hover:shadow-lifted focus-visible:ring-ink",
        ].join(" ")}
      >
        Book a Free 15-Minute Consultation
        <ArrowUpRight
          aria-hidden
          className="h-4 w-4 transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
          strokeWidth={2}
        />
      </Link>

      {whatsappUrl ? (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open WhatsApp chat with ITAI Web Solutions"
          onClick={() => trackWhatsAppClick({ button_location: location })}
          className={[
            "group inline-flex min-h-[48px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3.5 text-sm font-medium transition-all sm:w-auto",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
            isBold
              ? "border border-paper/25 text-paper hover:bg-paper/5 focus-visible:ring-paper focus-visible:ring-offset-ink"
              : "border border-line bg-paper text-ink hover:bg-mist focus-visible:ring-ink",
          ].join(" ")}
        >
          <WhatsAppGlyph
            className="h-4 w-4 text-[#25D366]"
            aria-hidden
          />
          <span className="sm:hidden">WhatsApp me</span>
          <span className="hidden sm:inline">
            Prefer WhatsApp? Message me here.
          </span>
        </a>
      ) : null}
    </div>
  );
}
