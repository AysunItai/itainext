"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

/**
 * Small client island for the homepage CTA's mailto link. Pulled out
 * so the surrounding <CTA /> can be a server component — analytics is
 * the only reason any of that section needed to ship JS.
 */
export default function CTAEmailLink() {
  return (
    <Link
      href="mailto:info@itaiwebsolutions.com"
      onClick={() =>
        trackEvent("email_click", {
          event_category: "lead",
          event_label: "Homepage CTA",
        })
      }
      className="inline-flex items-center justify-center gap-2 rounded-full border border-paper/20 px-7 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-paper/5"
    >
      info@itaiwebsolutions.com
    </Link>
  );
}
