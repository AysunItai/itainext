import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createSessionToken, sessionCookieOptions, SESSION_COOKIE } from "@/lib/auth";

export async function POST(request: Request) {
  let body: { password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const password = typeof body.password === "string" ? body.password : "";

  if (!password) {
    return NextResponse.json({ error: "Password is required." }, { status: 400 });
  }

  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash) {
    return NextResponse.json(
      {
        error:
          "Admin is not configured. Set ADMIN_PASSWORD_HASH (and ADMIN_JWT_SECRET) in .env, then restart the server.",
      },
      { status: 503 },
    );
  }

  const ok = await bcrypt.compare(password, hash);
  if (!ok) {
    // Constant-ish delay to slow brute force attempts
    await new Promise((r) => setTimeout(r, 350));
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  let token: string;
  try {
    token = await createSessionToken();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create session.";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: SESSION_COOKIE,
    value: token,
    ...sessionCookieOptions,
  });
  return response;
}
