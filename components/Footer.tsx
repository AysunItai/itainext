"use client";

import Image from "next/image";
import Link from "next/link";
import { trackBookConsultationClick, trackEvent } from "@/lib/analytics";

const FOOTER_LINKS = {
  Solutions: [
    { label: "Website design", href: "/services/small-business-website-design" },
    { label: "AI automation", href: "/services/ai-automation-for-small-business" },
    { label: "Booking systems", href: "/services/website-with-booking-system" },
    { label: "WhatsApp integration", href: "/services/website-with-whatsapp-integration" },
    { label: "Website redesign", href: "/services/website-redesign" },
    { label: "SEO setup", href: "/services/seo-setup-for-small-business" },
    { label: "All services", href: "/services" },
  ],
  Studio: [
    { label: "Work", href: "/#work" },
    { label: "Process", href: "/#process" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Shop", href: "/shop" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Book a call", href: "/book" },
    { label: "Contact", href: "/contact" },
  ],
  // Real social profiles haven't been published yet; surfacing placeholder
  // `href="#"` links here just generated broken outbound links in
  // Screaming Frog. We'll re-add each row once it has a destination.
  Connect: [{ label: "Email", href: "mailto:info@itaiwebsolutions.com" }],
} as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative mt-auto border-t border-line bg-paper px-5 pb-10 pt-20 sm:px-8 sm:pt-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Link href="/" aria-label="ITAI Web Solutions — home" className="inline-block">
              <Image
                src="/logo.png"
                alt="ITAI Web Solutions"
                width={605}
                height={185}
                sizes="96px"
                className="h-6 w-auto object-contain"
              />
            </Link>
            <p className="mt-5 max-w-sm text-pretty text-[15px] leading-7 text-muted">
              ITAI is a small studio engineering modern digital systems —
              websites, automations, and tools that help growing businesses
              scale.
            </p>

            <Link
              href="mailto:info@itaiwebsolutions.com"
              onClick={() =>
                trackEvent("email_click", {
                  event_category: "lead",
                  event_label: "Footer — primary email",
                })
              }
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
            >
              info@itaiwebsolutions.com
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink">
                  {title}
                </h3>
                <ul className="mt-5 space-y-3 text-sm">
                  {links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        onClick={() => handleFooterLinkClick(l.label, l.href)}
                        className="text-muted transition-colors hover:text-ink"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 text-xs text-muted sm:flex-row sm:items-center">
          <p>© {year} ITAI. All rights reserved.</p>
          {/* Privacy & Terms used to be `href="#"` placeholders. Real pages
              haven't been written yet, so we drop them rather than ship
              broken outbound links. Replace this with real links once
              the legal pages exist. */}
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="transition-colors hover:text-ink"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}

/**
 * Tracks the high-intent footer link clicks (booking + email). Plain
 * navigations like "Privacy" or "Work" intentionally aren't tracked —
 * the goal is lead funnel events, not pageview duplication.
 */
function handleFooterLinkClick(label: string, href: string) {
  if (href.startsWith("mailto:")) {
    trackEvent("email_click", {
      event_category: "lead",
      event_label: `Footer — ${label}`,
    });
    return;
  }
  if (href === "/book" || href.startsWith("/book?")) {
    // Pull a `plan` query param out of the href if one is present, so the
    // analytics event mirrors the URL the visitor is about to land on.
    let plan: string | null = null;
    const q = href.indexOf("?");
    if (q !== -1) {
      try {
        plan = new URLSearchParams(href.slice(q + 1)).get("plan");
      } catch {
        plan = null;
      }
    }
    trackBookConsultationClick({
      button_location: "footer",
      plan,
    });
  }
}
