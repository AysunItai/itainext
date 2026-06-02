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

/**
 * Canonical surfaces from which a "Book consultation" CTA can be clicked.
 * Keep this list closed so GA4 reports group cleanly — adding new locations
 * is fine, just make sure you're not silently introducing a new spelling
 * for an existing surface ("hero" vs "Hero" vs "homepage_hero").
 */
export type BookButtonLocation =
  | "hero"
  | "pricing_card"
  | "footer"
  | "book_page_hero"
  | "book_page_closing_cta"
  | "homepage_teaser"
  | "homepage_after_hero"
  | "homepage_after_services";

export type WhatsAppButtonLocation =
  | "floating_button"
  | "book_page_hero"
  | "book_page_closing_cta"
  | "shop_share"
  | string;

/**
 * Returns the current document path on the client, or `undefined` during
 * SSR. Centralised so every analytics call attaches `source_page`
 * consistently.
 */
function currentPath(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return window.location.pathname + window.location.search;
}

/**
 * Cheap, reliable device classification based on viewport width — matches
 * Tailwind's `sm` (640px) and `lg` (1024px) breakpoints so the bucket
 * lines up with the responsive design rules.
 */
export type DeviceType = "mobile" | "tablet" | "desktop";

export function getDeviceType(): DeviceType {
  if (typeof window === "undefined") return "desktop";
  const w = window.innerWidth;
  if (w < 640) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

/**
 * Specialised wrapper around `trackEvent("book_consultation_click")` that
 * enforces the standard parameter shape:
 *   - button_location: where the CTA lives in the UI
 *   - plan: the plan slug if the CTA came from a pricing/payment card
 *   - source_page: pathname (+ query) of the page that hosted the click
 */
export function trackBookConsultationClick(opts: {
  button_location: BookButtonLocation;
  plan?: string | null;
  source_page?: string;
}): void {
  trackEvent("book_consultation_click", {
    event_category: "lead",
    button_location: opts.button_location,
    ...(opts.plan ? { plan: opts.plan } : {}),
    source_page: opts.source_page ?? currentPath(),
    device_type: getDeviceType(),
  });
}

/**
 * Specialised wrapper around `trackEvent("whatsapp_click")` that attaches
 * `button_location`, `source_page`, and `device_type` for cleaner GA4
 * reporting and mobile-vs-desktop breakdowns.
 */
export function trackWhatsAppClick(opts: {
  button_location: WhatsAppButtonLocation;
  source_page?: string;
}): void {
  trackEvent("whatsapp_click", {
    event_category: "lead",
    button_location: opts.button_location,
    source_page: opts.source_page ?? currentPath(),
    device_type: getDeviceType(),
  });
}

export {};
