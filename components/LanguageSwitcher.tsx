"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getLocaleFromPathname,
  switchLocalePath,
  type Locale,
} from "@/lib/i18n";

export default function LanguageSwitcher() {
  const pathname = usePathname() ?? "/";
  const locale = getLocaleFromPathname(pathname);
  const enHref = switchLocalePath(pathname, "en");
  const heHref = switchLocalePath(pathname, "he");

  const enLabel = locale === "en" ? "EN" : "English";

  return (
    <div
      className="flex items-center gap-1 rounded-full border border-line bg-paper/80 p-0.5 text-[11px] font-medium backdrop-blur-sm"
      role="navigation"
      aria-label="Language"
    >
      <LangPill locale="en" active={locale === "en"} href={enHref} label={enLabel} />
      <span aria-hidden className="text-muted/40">
        |
      </span>
      <LangPill locale="he" active={locale === "he"} href={heHref} label="עברית" />
    </div>
  );
}

function LangPill({
  locale,
  active,
  href,
  label,
}: {
  locale: Locale;
  active: boolean;
  href: string;
  label: string;
}) {
  const ariaLabel = locale === "en" ? "English" : "Hebrew";
  return (
    <Link
      href={href}
      hrefLang={locale}
      aria-label={ariaLabel}
      aria-current={active ? "page" : undefined}
      className={[
        "rounded-full px-2.5 py-1 transition-colors",
        active ? "bg-ink text-paper" : "text-muted hover:text-ink",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}
