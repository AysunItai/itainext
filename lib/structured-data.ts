/**
 * JSON-LD structured-data builders for SEO rich results.
 *
 * Each builder returns a plain JS object that should be JSON.stringify'd into
 * a <script type="application/ld+json"> tag. Validate with
 * https://search.google.com/test/rich-results before deploying changes.
 */

import { SITE_ORIGIN } from "@/lib/site-url";

const SITE_URL = SITE_ORIGIN;

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

/**
 * ProfessionalService — a richer description of the business itself, suited
 * to the services hub. Reuses the Organization @id so the two nodes are
 * understood as the same entity rather than duplicates.
 */
export function professionalServiceLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#professionalservice`,
    name: BRAND.legalName,
    url: `${SITE_URL}/services`,
    image: BRAND.logo,
    email: BRAND.email,
    founder: { "@type": "Person", name: BRAND.founder },
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    description:
      "ITAI Web Solutions helps small businesses build modern websites, booking systems, WhatsApp contact flows, SEO-ready pages, dashboards, and practical AI automation.",
    // Remote studio — serves clients internationally rather than from a
    // single storefront, so we describe the area served rather than a
    // physical address.
    areaServed: [
      "United States",
      "United Kingdom",
      "Europe",
      "Israel",
      "Worldwide",
    ],
    serviceType: [
      "Small business website design",
      "AI automation for small business",
      "Website with booking system",
      "Website with WhatsApp integration",
      "Website redesign",
      "SEO setup for small business",
    ],
  };
}

export type ServiceLdInput = {
  name: string;
  slug: string;
  description: string;
};

/**
 * Service node for an individual service page. Kept deliberately lean —
 * `provider` points back to the shared Organization @id.
 */
export function serviceLd(input: ServiceLdInput) {
  const url = `${SITE_URL}/services/${input.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: input.name,
    serviceType: input.name,
    url,
    description: input.description,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [
      "United States",
      "United Kingdom",
      "Europe",
      "Israel",
      "Worldwide",
    ],
    audience: {
      "@type": "Audience",
      audienceType:
        "Small businesses, consultants, service providers, and founders",
    },
  };
}

export type FaqLdItem = { question: string; answer: string };

/**
 * FAQPage node. Google only renders FAQ rich results when the same
 * questions/answers are visible on the page, so always pair this with a
 * real, visible FAQ section.
 */
export function faqPageLd(items: FaqLdItem[], pageUrl?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(pageUrl ? { "@id": `${pageUrl}#faq` } : {}),
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export type BreadcrumbItem = { name: string; path: string };

/**
 * BreadcrumbList node. `path` values are site-relative (e.g. "/services")
 * and resolved against the canonical origin here.
 */
export function breadcrumbLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
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
