"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Fires the free-review conversion event only when the visitor arrived
 * from a successful form submit (sessionStorage flag). Direct visits to
 * the thank-you URL do not count.
 */
export default function ConversionTracker() {
  useEffect(() => {
    if (sessionStorage.getItem("free_review_submitted") !== "1") return;
    sessionStorage.removeItem("free_review_submitted");
    trackEvent("free_website_review_submit", {
      event_category: "lead",
      event_label: "free_review_thank_you",
    });
  }, []);

  return null;
}
