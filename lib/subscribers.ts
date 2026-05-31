import "server-only";
import { randomBytes } from "node:crypto";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function newToken(): string {
  return randomBytes(24).toString("base64url");
}

export function normalizeEmail(input: string): string {
  return input.trim().toLowerCase().slice(0, 254);
}

/**
 * Normalise a free-form acquisition source string.
 *
 * Accepts ASCII letters, digits, colons, hyphens, underscores, and dots.
 * Caps at 64 chars so we never have to defend against pathological input.
 * Returns `null` if the result is empty or invalid — the column is nullable,
 * which means "we don't know" rather than corrupt data.
 */
export function normalizeSource(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const cleaned = input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9:_\-.]/g, "")
    .slice(0, 64);
  return cleaned.length > 0 ? cleaned : null;
}
