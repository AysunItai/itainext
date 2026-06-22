import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  generateContactReply,
  type ContactReply,
} from "@/lib/ai/contact-reply";

const CONTACT_TO = process.env.CONTACT_EMAIL_TO ?? "aysun.itai@gmail.com";
const CONTACT_FROM =
  process.env.CONTACT_EMAIL_FROM ??
  "ITAI Web Solutions <contact@itaiwebsolutions.com>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function urgencyColor(urgency: ContactReply["urgency"]): string {
  if (urgency === "High") return "#b91c1c";
  if (urgency === "Low") return "#15803d";
  return "#1e3a8a";
}

type EmailArgs = {
  name: string;
  email: string;
  topic: string;
  message: string;
  ai: ContactReply | null;
};

// ───────── HTML email ─────────
// Table-based layout, inline styles only — built for max compatibility with
// Bluehost webmail (Roundcube), Gmail, Apple Mail, and mobile clients.
// Single-column with width="600" + max-width:600px shrinks gracefully on phones.

function row(label: string, valueHtml: string): string {
  return `<tr><td style="padding:14px 24px 0;">
<p style="margin:0;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#6b7280;">${escapeHtml(label)}</p>
<p style="margin:4px 0 0;font-size:15px;line-height:1.55;color:#0a0a0a;">${valueHtml}</p>
</td></tr>`;
}

function multilineRow(label: string, value: string): string {
  const html = escapeHtml(value).replace(/\n/g, "<br/>");
  return `<tr><td style="padding:18px 24px 0;">
<p style="margin:0;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#6b7280;">${escapeHtml(label)}</p>
<p style="margin:6px 0 0;font-size:15px;line-height:1.65;color:#0a0a0a;">${html}</p>
</td></tr>`;
}

function dividerRow(): string {
  return `<tr><td style="padding:22px 24px 0;">
<div style="height:1px;line-height:1px;font-size:1px;background:#e5e5e5;">&nbsp;</div>
</td></tr>`;
}

function buildEmailHtml(a: EmailArgs): string {
  const { name, email, topic, message, ai } = a;

  const replyHtml = ai?.reply
    ? escapeHtml(ai.reply).replace(/\n/g, "<br/>")
    : "";

  const aiSection = ai
    ? `${dividerRow()}
${row("AI summary", escapeHtml(ai.summary))}
${row("Lead type", escapeHtml(ai.leadType))}
${row(
  "Urgency",
  `<span style="color:${urgencyColor(ai.urgency)};font-weight:600;">${escapeHtml(ai.urgency)}</span>`,
)}
${
  replyHtml
    ? `<tr><td style="padding:18px 24px 0;">
<p style="margin:0 0 8px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#6b7280;">Suggested reply</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border:1px solid #e5e5e5;border-radius:8px;background:#fafafa;">
<tr><td style="padding:14px 16px;font-size:15px;line-height:1.65;color:#0a0a0a;">${replyHtml}</td></tr>
</table>
</td></tr>`
    : ""
}`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="light only" />
<meta name="supported-color-schemes" content="light" />
<title>New website enquiry</title>
</head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;color:#0a0a0a;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:24px 12px;">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid #e5e5e5;border-radius:12px;">
<tr><td style="padding:24px 24px 4px;">
<p style="margin:0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#6b7280;">itaiwebsolutions.com</p>
<h1 style="margin:6px 0 0;font-size:20px;font-weight:600;color:#0a0a0a;">New website enquiry</h1>
</td></tr>
${row("From", escapeHtml(name))}
${row(
  "Customer email",
  `<a href="mailto:${escapeHtml(email)}" style="color:#1e3a8a;text-decoration:none;">${escapeHtml(email)}</a>`,
)}
${topic ? row("Topic", escapeHtml(topic)) : ""}
${multilineRow("Message", message)}
${aiSection}
<tr><td style="padding:22px 24px 24px;">
<p style="margin:18px 0 0;font-size:12px;color:#9ca3af;">Reply to this email — your reply will go directly to ${escapeHtml(email)}.</p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

// ───────── Plain-text fallback ─────────
// Clean and flat: single space after each label, blank line between sections,
// no tabs, no fixed-width padding.

function buildEmailText(a: EmailArgs): string {
  const { name, email, topic, message, ai } = a;
  const sections: string[] = [];

  sections.push(["New website enquiry", "itaiwebsolutions.com"].join("\n"));

  const meta = [`From: ${name}`, `Customer email: ${email}`];
  if (topic) meta.push(`Topic: ${topic}`);
  sections.push(meta.join("\n"));

  sections.push(`Message:\n${message}`);

  if (ai) {
    const aiMeta = [
      `AI summary: ${ai.summary}`,
      `Lead type: ${ai.leadType}`,
      `Urgency: ${ai.urgency}`,
    ];
    sections.push(aiMeta.join("\n"));

    if (ai.reply) {
      sections.push(`Suggested reply:\n${ai.reply}`);
    }
  }

  sections.push(`Reply to this email — your reply will go directly to ${email}.`);

  return sections.join("\n\n");
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
          "Email is not configured yet. Please email aysun.itai@gmail.com directly.",
      },
      { status: 503 },
    );
  }

  // Generate AI reply, but never let it block the inquiry email.
  // generateContactReply is non-throwing — any failure returns FALLBACK,
  // and we belt-and-suspenders it with try/catch here too.
  let ai: ContactReply | null = null;
  try {
    const result = await generateContactReply({
      name: safeName,
      email: safeEmail,
      topic: safeTopic,
      message: safeMessage,
    });
    if (result.reply || result.summary) ai = result;
  } catch (err) {
    console.error("[contact] Unexpected AI error", err);
    ai = null;
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
        ai,
      }),
      text: buildEmailText({
        name: safeName,
        email: safeEmail,
        topic: safeTopic,
        message: safeMessage,
        ai,
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
