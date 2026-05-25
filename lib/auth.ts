import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "itai_admin";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

type SessionPayload = {
  sub: "admin";
  iat?: number;
  exp?: number;
};

function getSecret(): Uint8Array {
  const raw = process.env.ADMIN_JWT_SECRET;
  if (!raw || raw.length < 16) {
    throw new Error(
      "ADMIN_JWT_SECRET is not configured. Set it in .env (>= 32 random characters).",
    );
  }
  return new TextEncoder().encode(raw);
}

export async function createSessionToken(): Promise<string> {
  const secret = getSecret();
  return await new SignJWT({ sub: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(secret);
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  try {
    const secret = getSecret();
    const { payload } = await jwtVerify<SessionPayload>(token, secret, {
      algorithms: ["HS256"],
    });
    return payload.sub === "admin";
  } catch {
    return false;
  }
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_TTL_SECONDS,
};
