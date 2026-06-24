"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { BILINGUAL_PATHS, getLocaleFromPathname } from "@/lib/i18n";

const EN_NAV = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Shop", href: "/shop" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

const HE_NAV = [
  { label: "שירותים", href: "/he/services" },
  { label: "בדיקת אתר", href: "/he/free-website-review" },
  { label: "יצירת קשר", href: "/he/contact" },
] as const;

export default function Header() {
  const pathname = usePathname() ?? "/";
  const locale = getLocaleFromPathname(pathname);
  const isHe = locale === "he";
  const homeHref = isHe ? BILINGUAL_PATHS.he.home : BILINGUAL_PATHS.en.home;
  const navLinks = isHe ? HE_NAV : EN_NAV;
  const ctaHref = isHe ? "/book" : "/contact";
  const ctaLabel = isHe ? "שיחת היכרות" : "Start a project";

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line/70 bg-paper/80 backdrop-blur-xl supports-[backdrop-filter]:bg-paper/60"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-5 sm:h-20 sm:px-8">
        <Link
          href={homeHref}
          aria-label="ITAI Web Solutions — home"
          className="flex shrink-0 items-center rounded-md focus-visible:outline-none"
        >
          <Image
            src="/logo.png"
            alt="ITAI Web Solutions"
            width={605}
            height={185}
            sizes="96px"
            fetchPriority="high"
            loading="eager"
            className="h-6 w-auto object-contain"
          />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 md:flex"
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative rounded-full px-4 py-2 text-sm text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />

          <Link
            href={ctaHref}
            className="group hidden items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-ink-soft md:inline-flex"
          >
            {ctaLabel}
            <ArrowUpRight
              aria-hidden
              className={[
                "h-4 w-4 transition-transform group-hover:-translate-y-px",
                isHe
                  ? "group-hover:-translate-x-px rotate-180"
                  : "group-hover:translate-x-px",
              ].join(" ")}
              strokeWidth={2}
            />
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper text-ink transition-colors hover:bg-mist md:hidden"
          >
            {open ? (
              <X aria-hidden className="h-5 w-5" strokeWidth={1.75} />
            ) : (
              <Menu aria-hidden className="h-5 w-5" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="border-b border-line bg-paper/95 backdrop-blur-xl md:hidden"
          >
            <nav
              aria-label="Mobile primary"
              className="mx-auto flex max-w-7xl flex-col gap-1 px-5 pb-6 pt-2"
            >
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-4 text-lg font-medium text-ink transition-colors hover:bg-mist"
                >
                  {l.label}
                  <ArrowUpRight
                    aria-hidden
                    className={[
                      "h-4 w-4 text-muted",
                      isHe ? "rotate-180" : "",
                    ].join(" ")}
                    strokeWidth={1.75}
                  />
                </Link>
              ))}
              <Link
                href={ctaHref}
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3.5 text-base font-medium text-paper"
              >
                {ctaLabel}
                <ArrowUpRight
                  aria-hidden
                  className={["h-4 w-4", isHe ? "rotate-180" : ""].join(" ")}
                  strokeWidth={2}
                />
              </Link>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
