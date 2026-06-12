import "server-only";

/**
 * Generic digital-product catalog.
 *
 * Every paid item flows through the same pipeline (checkout → webhook →
 * order → signed download), regardless of whether it's a PDF, a course,
 * an audio pack, or a template. This file is the single source of truth
 * the *server-side* payment code reads — separate from `lib/library.ts`,
 * which keeps the rich, publication-shaped data the marketing UI needs.
 *
 * Why split:
 *   • Adding a non-publication product (e.g. a Figma template) shouldn't
 *     require inventing fake TOC/cover fields.
 *   • Changing the marketing layout shouldn't risk breaking payments.
 *
 * server-only: nothing here should ever be imported from a client
 * component. `privateFilePath` and `stripePriceId` are not for the
 * browser.
 */

export type ProductType = "publication" | "template" | "audio" | "course";

// ISO 4217, lowercase — Stripe expects e.g. "usd", not "USD".
export type Currency = "usd" | "eur";

export type DigitalProduct = {
  /** Stable URL + DB key. Matches `Publication.slug` when both exist. */
  slug: string;
  /** Display title — used in Stripe metadata, receipts, support. */
  title: string;
  /** Short marketing line — used in receipt email + Stripe line-item. */
  description: string;
  /** Price in the smallest currency unit (cents). 0 = free (skip Stripe). */
  priceCents: number;
  currency: Currency;
  /**
   * Stripe Price ID (e.g. `price_1Ab2...`). Null while the product is
   * still being authored. The checkout route refuses to sell a product
   * with a null priceId.
   */
  stripePriceId: string | null;
  productType: ProductType;
  /**
   * Path relative to PRIVATE_FILES_ROOT (e.g. `./private-files`).
   * MUST NOT live under `/public`. The download route resolves and
   * range-checks this against PRIVATE_FILES_ROOT before streaming.
   */
  privateFilePath: string;
  /** HTTP Content-Type sent on download (e.g. `application/pdf`). */
  contentType: string;
  /** What the buyer's browser saves the file as. */
  downloadFileName: string;
};

const PRODUCTS: DigitalProduct[] = [
  {
    slug: "sql-performance-masterclass",
    title: "SQL Performance Masterclass",
    description:
      "A practical ebook for writing fast, scalable SQL on PostgreSQL and MySQL.",
    priceCents: 399,
    currency: "usd",
    stripePriceId: null,
    productType: "publication",
    privateFilePath: "publications/sqlmasterclass.pdf",
    contentType: "application/pdf",
    downloadFileName: "sql-performance-masterclass.pdf",
  },
];

export function listProducts(): DigitalProduct[] {
  return PRODUCTS;
}

export function getProduct(slug: string): DigitalProduct | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

/**
 * Look up a product or throw. Use this in routes where "no such product"
 * is an error, not a normal branch (checkout, webhook fulfillment,
 * download streaming). Callers should catch and translate to the right
 * HTTP status.
 */
export function requireProduct(slug: string): DigitalProduct {
  const product = getProduct(slug);
  if (!product) {
    throw new Error(`Unknown product slug: ${slug}`);
  }
  return product;
}
