/**
 * Library / Shop catalog.
 *
 * Every publication is currently free, but the schema is built for a paid
 * future: `price` is the source of truth, and a Stripe price ID can sit on
 * `stripePriceId` once checkout is wired in.
 */

export type PublicationFormat = "PDF" | "EPUB" | "Course";

export type PublicationTOC = {
  number: string;
  title: string;
  blurb: string;
};

export type Publication = {
  slug: string;
  /** Short order/issue label, e.g. "Vol. 01". */
  issue: string;
  /** Display title. */
  title: string;
  /** Marketing subtitle. */
  subtitle: string;
  /** One-sentence pitch for cards / OG. */
  tagline: string;
  /** Long description for the detail page hero. */
  description: string;
  /** Author display string. */
  author: string;
  /** Edition or year label. */
  edition: string;
  /** Page count, used as a quick credibility marker. */
  pages: number;
  /** Format(s) available. */
  format: PublicationFormat;
  /** Approximate reading time (in hours). */
  readingTime: string;
  /** Topical tags for filtering and SEO. */
  topics: string[];
  /** Engines or systems covered (DB, framework, etc.). */
  systems?: string[];
  /** What the reader will be able to do after finishing. */
  outcomes: string[];
  /** Who this is for. */
  audience: string[];
  /** Cover palette used by the CSS-rendered book cover. */
  cover: {
    /** Accent gradient stops, top to bottom. */
    gradient: [string, string, string];
    /** Bottom badge text rendered on the cover. */
    badge: string;
    /** Three-line title rendered on the spine/face. */
    coverTitle: [string, string, string];
    /** Small caption rendered below the title block. */
    captionTop: string;
    captionBottom: string;
  };
  /** Table of contents preview. */
  toc: PublicationTOC[];
  /** Public path to the downloadable file. */
  file: string;
  /** Human file size, e.g. "2.4 MB". */
  fileSize: string;
  /** Price in USD cents. 0 = free. */
  priceCents: number;
  /** Original / list price for "Free this season" framing. */
  listPriceCents?: number;
  /** Stripe price id (filled in later). */
  stripePriceId?: string;
  /** Display ribbon, e.g. "Free this season". */
  ribbon?: string;
  /** Hide the publication from the listing while drafting. */
  draft?: boolean;
  /** Publication date (ISO string). Used in sitemap + metadata. */
  publishedAt: string;
};

export const PUBLICATIONS: Publication[] = [
  {
    slug: "sql-performance-masterclass",
    issue: "Vol. 01",
    title: "SQL Performance Masterclass",
    subtitle: "A practical ebook for writing fast, scalable SQL.",
    tagline:
      "Field-tested EXPLAIN, index, join, pagination, and aggregation patterns for PostgreSQL and MySQL.",
    description:
      "Fifty pages, pulled from years of staring at slow queries in production. It's tight, opinionated, and written to be read in a single afternoon — then kept open on a second monitor every time you touch a query plan.",
    author: "Aysun Itai",
    edition: "2026 Edition",
    pages: 50,
    format: "PDF",
    readingTime: "≈ 2h read",
    topics: [
      "EXPLAIN",
      "Indexes",
      "Joins",
      "Pagination",
      "Aggregation",
      "Query plans",
    ],
    systems: ["PostgreSQL", "MySQL"],
    outcomes: [
      "Read query plans with confidence and spot the real bottleneck on the first pass.",
      "Design indexes that the planner actually picks — and know when an index is making things slower.",
      "Choose the right join strategy (nested loop, hash, merge) for the data and the hardware.",
      "Paginate huge tables without OFFSET pitfalls — keyset pagination, done properly.",
      "Aggregate millions of rows without dragging the server down.",
    ],
    audience: [
      "Backend engineers shipping production features.",
      "Tech leads onboarding a team to a new database.",
      "Instructors teaching practical SQL performance.",
    ],
    cover: {
      gradient: ["#0b1227", "#1e3a8a", "#020617"],
      badge: "ITAI · 2026",
      coverTitle: ["SQL", "Performance", "Masterclass"],
      captionTop: "EXPLAIN · INDEXES · JOINS",
      captionBottom: "PostgreSQL & MySQL",
    },
    toc: [
      {
        number: "01",
        title: "Reading EXPLAIN like a query planner",
        blurb:
          "Cost, rows, width, and the difference between a sequential scan that's fine and one that isn't.",
      },
      {
        number: "02",
        title: "Indexes that actually get picked",
        blurb:
          "B-tree vs. hash vs. GIN, covering indexes, partial indexes, and why the planner ignored yours.",
      },
      {
        number: "03",
        title: "Joins, properly",
        blurb:
          "Nested loop, hash, and merge joins — when each is fast, when each is a trap, and how the optimizer chooses.",
      },
      {
        number: "04",
        title: "Pagination at scale",
        blurb:
          "Why OFFSET is a tax on every page, and how to switch a paged endpoint to keyset pagination in an afternoon.",
      },
      {
        number: "05",
        title: "Aggregation without surprises",
        blurb:
          "GROUP BY, window functions, materialized views, and the surprisingly common mistakes around DISTINCT.",
      },
      {
        number: "06",
        title: "A production checklist",
        blurb:
          "What to run before a release, what to monitor after, and the one query you should always have at hand.",
      },
    ],
    file: "/publications/sqlmasterclass.pdf",
    fileSize: "245 KB",
    priceCents: 0,
    listPriceCents: 3900,
    ribbon: "Free this season",
    publishedAt: "2026-01-01",
  },
];

export function getPublication(slug: string): Publication | undefined {
  return PUBLICATIONS.find((p) => p.slug === slug && !p.draft);
}

export function listPublications(): Publication[] {
  return PUBLICATIONS.filter((p) => !p.draft);
}

export function formatPrice(cents: number): string {
  if (cents === 0) return "Free";
  return `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;
}
