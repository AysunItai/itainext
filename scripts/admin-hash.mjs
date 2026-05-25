#!/usr/bin/env node
// Generate a bcrypt hash + a JWT secret for the admin login.
// Usage: npm run admin:hash <password>

import bcrypt from "bcryptjs";
import { randomBytes } from "node:crypto";

const password = process.argv[2];

if (!password) {
  console.error("\nUsage: npm run admin:hash <password>\n");
  process.exit(1);
}

if (password.length < 8) {
  console.error("\n✗ Password should be at least 8 characters.\n");
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);
const secret = randomBytes(48).toString("base64");

// Important: Next.js loads .env through dotenv-expand, which treats every
// `$` as a variable reference (even inside single quotes). bcrypt hashes
// always contain `$`, so we must escape each `$` as `\$` and wrap the value
// in DOUBLE quotes so dotenv keeps the backslash escapes literal.
const escapedHash = hash.replace(/\$/g, "\\$");

console.log("");
console.log("──────────────────────────────────────────────────────────────");
console.log(" Paste these into your .env file (and restart `npm run dev`):");
console.log("──────────────────────────────────────────────────────────────");
console.log("");
console.log(`ADMIN_PASSWORD_HASH="${escapedHash}"`);
console.log(`ADMIN_JWT_SECRET="${secret}"`);
console.log("");
console.log(" Note: The backslashes in the hash are intentional — they");
console.log(" prevent Next.js's env loader from expanding $ as variables.");
console.log(" Keep these secret. Do NOT commit your .env file.");
console.log("");
