export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function calculateReadingTime(markdown: string): number {
  const text = markdown.replace(/```[\s\S]*?```/g, " ").replace(/[#>*_`~\-\[\]\(\)!]/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

/**
 * Trim a plain string to a max length without breaking words.
 *
 * Used for SEO meta tags — Google truncates descriptions at ~155 chars
 * and titles at ~60. Anything longer gets cut off mid-word in the SERP.
 * This lets us cap them at the source so they never get truncated by
 * the crawler.
 *
 * Returns `undefined` when the input is empty so we can spread it into
 * `Metadata` without producing an empty string tag.
 */
export function truncateForMeta(
  text: string | null | undefined,
  maxLen: number,
): string | undefined {
  if (!text) return undefined;
  const trimmed = text.trim();
  if (trimmed.length <= maxLen) return trimmed;
  // Cut, then walk back to the last whitespace so we don't end mid-word.
  const slice = trimmed.slice(0, maxLen - 1);
  const lastSpace = slice.lastIndexOf(" ");
  const safe = lastSpace > maxLen * 0.5 ? slice.slice(0, lastSpace) : slice;
  return `${safe}…`;
}

export function deriveExcerpt(markdown: string, maxLen = 180): string {
  const stripped = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (stripped.length <= maxLen) return stripped;
  return stripped.slice(0, maxLen).replace(/\s+\S*$/, "") + "…";
}

export function parseTags(tags: string | null | undefined): string[] {
  if (!tags) return [];
  return tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export function serializeTags(input: string | string[]): string {
  const arr = Array.isArray(input)
    ? input
    : input.split(",");
  return arr.map((t) => t.trim()).filter(Boolean).join(",");
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
