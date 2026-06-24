import type { Metadata } from "next";

export type Locale = "en" | "he";

export type BilingualPage = "home" | "services" | "freeReview" | "contact" | "book";

/** Paired routes — English default, Hebrew under /he. */
export const BILINGUAL_PATHS = {
  en: {
    home: "/",
    services: "/services",
    freeReview: "/free-website-review",
    contact: "/contact",
    book: "/book",
  },
  he: {
    home: "/he",
    services: "/he/services",
    freeReview: "/he/free-website-review",
    contact: "/he/contact",
    book: "/he/book",
  },
} as const;

const PATH_TO_PAGE: Record<string, BilingualPage> = {
  "/": "home",
  "/services": "services",
  "/free-website-review": "freeReview",
  "/contact": "contact",
  "/book": "book",
  "/he": "home",
  "/he/services": "services",
  "/he/free-website-review": "freeReview",
  "/he/contact": "contact",
  "/he/book": "book",
};

export function getLocaleFromPathname(pathname: string): Locale {
  return pathname === "/he" || pathname.startsWith("/he/") ? "he" : "en";
}

export function getBilingualPage(pathname: string): BilingualPage | null {
  const bare = pathname.split("?")[0]?.replace(/\/$/, "") || "/";
  const normalized = bare === "" ? "/" : bare;
  return PATH_TO_PAGE[normalized] ?? null;
}

/** Map the current path to the equivalent page in the target locale. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const page = getBilingualPage(pathname);
  if (page) return BILINGUAL_PATHS[target][page];
  return target === "he" ? BILINGUAL_PATHS.he.home : BILINGUAL_PATHS.en.home;
}

export function buildAlternates(
  locale: Locale,
  page: BilingualPage,
): NonNullable<Metadata["alternates"]> {
  const en = BILINGUAL_PATHS.en[page];
  const he = BILINGUAL_PATHS.he[page];
  return {
    canonical: locale === "en" ? en : he,
    languages: {
      en,
      he,
      "x-default": en,
    },
  };
}
