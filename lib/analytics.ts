/**
 * Lightweight wrapper around Google Analytics 4 (gtag.js).
 *
 * Designed to be:
 *   - Safe: never throws if gtag isn't loaded (ad blockers, SSR, DNT, dev).
 *   - Cheap: a single function, no abstraction tax.
 *   - Typed: window.gtag is augmented globally so call sites can rely on it.
 *
 * GA4's recommended convention is to send custom parameters alongside the
 * event name. We keep `event_category` and `event_label` (familiar from
 * Universal Analytics) because they still show up as custom dimensions in
 * GA4 reports and read well in exploration tables.
 */

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "set" | "consent",
      ...args: unknown[]
    ) => void;
  }
}

export type EventParams = {
  /** High-level grouping, e.g. "lead", "engagement", "share". */
  event_category?: string;
  /** Human-readable label for the specific instance. */
  event_label?: string;
  /** Optional numeric value (revenue, score, etc.). */
  value?: number;
  /** Any additional GA4 custom parameter. */
  [key: string]: unknown;
};

/**
 * Fires a GA4 event. No-ops silently when gtag isn't available — analytics
 * failures must never break the user experience.
 */
export function trackEvent(name: string, params: EventParams = {}): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  try {
    window.gtag("event", name, params);
  } catch {
    // Intentional swallow. If GA throws we'd rather lose the event than
    // crash the click handler that invoked us.
  }
}

export {};
