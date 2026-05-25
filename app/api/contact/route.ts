import { NextResponse } from "next/server";
import { Resend } from "resend";

const CONTACT_TO = process.env.CONTACT_EMAIL_TO ?? "info@itaiwebsolutions.com";
const CONTACT_FROM =
  process.env.CONTACT_EMAIL_FROM ?? "ITAI Contact <onboarding@resend.dev>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildEmailHtml(args: {
  name: string;
  email: string;
  topic: string;
  message: string;
}) {
  const { name, email, topic, message } = args;
  return `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:32px;background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;color:#0a0a0a;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e5e5e5;border-radius:16px;overflow:hidden;">
      <div style="padding:28px 32px;border-bottom:1px solid #e5e5e5;">
        <p style="margin:0;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#6b7280;">New inquiry · itaiwebsolutions.com</p>
        <h1 style="margin:8px 0 0;font-size:22px;font-weight:600;letter-spacing:-0.01em;color:#0a0a0a;">${escapeHtml(name)}</h1>
      </div>
      <table role="presentation" style="width:100%;border-collapse:collapse;padding:8px 32px;">
        <tr>
          <td style="padding:18px 32px 8px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#6b7280;width:120px;vertical-align:top;">Email</td>
          <td style="padding:18px 32px 8px;font-size:15px;color:#0a0a0a;vertical-align:top;">
            <a href="mailto:${escapeHtml(email)}" style="color:#1e3a8a;text-decoration:none;">${escapeHtml(email)}</a>
          </td>
        </tr>
        ${
          topic
            ? `<tr>
          <td style="padding:8px 32px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#6b7280;vertical-align:top;">Topic</td>
          <td style="padding:8px 32px;font-size:15px;color:#0a0a0a;vertical-align:top;">${escapeHtml(topic)}</td>
        </tr>`
            : ""
        }
      </table>
      <div style="padding:24px 32px 32px;border-top:1px solid #e5e5e5;margin-top:16px;">
        <p style="margin:0 0 12px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#6b7280;">Message</p>
        <p style="margin:0;font-size:16px;line-height:1.7;color:#0a0a0a;white-space:pre-wrap;">${escapeHtml(message)}</p>
      </div>
    </div>
    <p style="max-width:600px;margin:16px auto 0;font-size:11px;color:#9ca3af;text-align:center;">Reply directly to this email to respond to ${escapeHtml(name)}.</p>
  </body>
</html>`;
}

function buildEmailText(args: {
  name: string;
  email: string;
  topic: string;
  message: string;
}) {
  const { name, email, topic, message } = args;
  return [
    "NEW INQUIRY",
    "",
    `Name:    ${name}`,
    `Email:   ${email}`,
    topic ? `Topic:   ${topic}` : null,
    "",
    "Message:",
    message,
    "",
    "—",
    "Reply directly to this email to respond.",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, email, topic, message, website } = body as Record<
    string,
    unknown
  >;

  if (typeof website === "string" && website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (typeof name !== "string" || name.trim().length < 2) {
    return NextResponse.json(
      { error: "Please enter your name." },
      { status: 400 },
    );
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }
  if (typeof message !== "string" || message.trim().length < 10) {
    return NextResponse.json(
      { error: "Tell me a bit more — at least a sentence or two." },
      { status: 400 },
    );
  }

  const safeName = name.trim().slice(0, 200);
  const safeEmail = email.trim().slice(0, 254);
  const safeTopic =
    typeof topic === "string" ? topic.trim().slice(0, 200) : "";
  const safeMessage = message.trim().slice(0, 5000);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "[contact] Missing RESEND_API_KEY — set it in .env.local to send mail.",
    );
    return NextResponse.json(
      {
        error:
          "Email is not configured yet. Please email info@itaiwebsolutions.com directly.",
      },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);

  const subject = safeTopic
    ? `New inquiry — ${safeTopic} · ${safeName}`
    : `New inquiry from ${safeName}`;

  try {
    const { error } = await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: safeEmail,
      subject,
      html: buildEmailHtml({
        name: safeName,
        email: safeEmail,
        topic: safeTopic,
        message: safeMessage,
      }),
      text: buildEmailText({
        name: safeName,
        email: safeEmail,
        topic: safeTopic,
        message: safeMessage,
      }),
    });

    if (error) {
      console.error("[contact] Resend error", error);
      return NextResponse.json(
        { error: "Failed to send. Please try again in a moment." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error", err);
    return NextResponse.json(
      { error: "Unexpected error. Please try again." },
      { status: 500 },
    );
  }
}
