import "server-only";
import { randomBytes } from "node:crypto";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function newToken(): string {
  return randomBytes(24).toString("base64url");
}

export function normalizeEmail(input: string): string {
  return input.trim().toLowerCase().slice(0, 254);
}
