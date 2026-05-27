/**
 * JSON-LD structured-data builders for SEO rich results.
 *
 * Each builder returns a plain JS object that should be JSON.stringify'd into
 * a <script type="application/ld+json"> tag. Validate with
 * https://search.google.com/test/rich-results before deploying changes.
 */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://itaiwebsolutions.com";

const BRAND = {
  name: "ITAI",
  legalName: "ITAI Web Solutions",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  email: "info@itaiwebsolutions.com",
  founder: "Aysun Itai",
  // Add real profile URLs here once available; empty array is preferable to
  // guessed URLs that may 404 (Google penalises wrong sameAs entries).
  sameAs: [] as string[],
} as const;

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: BRAND.name,
    legalName: BRAND.legalName,
    url: BRAND.url,
    logo: {
      "@type": "ImageObject",
      url: BRAND.logo,
      width: 512,
      height: 512,
    },
    email: BRAND.email,
    founder: {
      "@type": "Person",
      name: BRAND.founder,
    },
    sameAs: BRAND.sameAs,
    description:
      "Independent software studio building custom websites, AI automation, booking systems, and dashboards for growing businesses.",
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: BRAND.name,
    description:
      "Independent software studio building modern digital systems.",
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
  };
}

export function personLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#aysun-itai`,
    name: BRAND.founder,
    url: `${SITE_URL}/about`,
    image: `${SITE_URL}/icon.png`,
    jobTitle: "Full-stack engineer & studio founder",
    worksFor: { "@id": `${SITE_URL}/#organization` },
    sameAs: BRAND.sameAs,
    knowsAbout: [
      "Web development",
      "AI automation",
      "Booking systems",
      "Dashboards",
      "Next.js",
      "TypeScript",
      "React",
      "Node.js",
      "PostgreSQL",
      "Cloud infrastructure",
    ],
  };
}

export type BlogPostingLdInput = {
  title: string;
  slug: string;
  excerpt?: string | null;
  coverImage?: string | null;
  publishedAt?: Date | string | null;
  updatedAt?: Date | string | null;
  tags?: string[];
};

export function blogPostingLd(post: BlogPostingLdInput) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const datePublished = toIso(post.publishedAt);
  const dateModified = toIso(post.updatedAt) ?? datePublished;
  const image = post.coverImage
    ? post.coverImage.startsWith("http")
      ? post.coverImage
      : `${SITE_URL}${post.coverImage}`
    : `${SITE_URL}/blog/${post.slug}/opengraph-image`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.excerpt ?? undefined,
    image: [image],
    datePublished: datePublished ?? undefined,
    dateModified: dateModified ?? undefined,
    author: { "@id": `${SITE_URL}/#aysun-itai`, "@type": "Person", name: BRAND.founder },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: post.tags && post.tags.length > 0 ? post.tags.join(", ") : undefined,
    inLanguage: "en-US",
  };
}

export function blogLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/blog#blog`,
    url: `${SITE_URL}/blog`,
    name: "ITAI Notes",
    description:
      "Field notes from ITAI on engineering depth and design restraint.",
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
  };
}

function toIso(value: Date | string | null | undefined): string | undefined {
  if (!value) return undefined;
  return value instanceof Date ? value.toISOString() : value;
}

export function jsonLdScriptProps(data: unknown) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(data).replace(/</g, "\\u003c"),
    },
  };
}
