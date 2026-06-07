import "server-only";
import { Resend } from "resend";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

// ───────── Config ─────────

export const NEWSLETTER_FROM =
  process.env.NEWSLETTER_FROM_EMAIL ??
  process.env.CONTACT_EMAIL_FROM ??
  "ITAI Notes <notes@itaiwebsolutions.com>";

// Purchase receipts come from here. Keeping the transactional sender
// distinct from the newsletter sender lets buyers' inboxes (and reputation
// systems) treat receipts as transactional mail, not marketing.
export const RECEIPT_FROM =
  process.env.RECEIPT_FROM_EMAIL ?? NEWSLETTER_FROM;

// Where customers should reply if a purchase goes sideways. Matches the
// contact form's destination so support follow-ups land in the same place.
const SUPPORT_EMAIL = "info@itaiwebsolutions.com";

// Email links need an absolute origin. In dev the env override points at
// localhost; in prod we fall back to the canonical www host so emails
// never ship with a wrong domain even if the env var is missing.
import { SITE_ORIGIN } from "@/lib/site-url";
export const SITE_URL = SITE_ORIGIN;

const BRAND_NAME = "ITAI";
const NEWSLETTER_NAME = "ITAI Notes";

let _resend: Resend | null = null;
function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!_resend) _resend = new Resend(key);
  return _resend;
}

// ───────── Markdown → email-safe HTML ─────────
// No shiki, no fancy classes — basic HAST stringification with inline styles
// applied as simple element wrappers.

let _emailMd: ((md: string) => Promise<string>) | null = null;
function getEmailRenderer() {
  if (_emailMd) return _emailMd;
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: false })
    .use(rehypeStringify, { allowDangerousHtml: false });
  _emailMd = async (md: string) => String(await processor.process(md));
  return _emailMd;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ───────── Shared layout ─────────

function shell(args: {
  title: string;
  preheader: string;
  body: string;
  unsubUrl?: string;
}): string {
  const { title, preheader, body, unsubUrl } = args;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="light only" />
<meta name="supported-color-schemes" content="light" />
<title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;color:#1a1a1c;-webkit-font-smoothing:antialiased;">
  <span style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;mso-hide:all;">${escapeHtml(preheader)}</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;padding:40px 16px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #e5e5e5;border-radius:18px;overflow:hidden;">
        <tr><td style="padding:32px 40px 0;">
          <p style="margin:0;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#6b7280;">${escapeHtml(NEWSLETTER_NAME)}</p>
        </td></tr>
        <tr><td style="padding:24px 40px 40px;">
          ${body}
        </td></tr>
        ${
          unsubUrl
            ? `<tr><td style="padding:24px 40px 28px;border-top:1px solid #ececf0;">
                <p style="margin:0;font-size:12px;line-height:1.7;color:#9ca3af;text-align:center;">
                  You're receiving this because you subscribed to ${escapeHtml(NEWSLETTER_NAME)}.<br/>
                  <a href="${unsubUrl}" style="color:#6b7280;text-decoration:underline;">Unsubscribe</a> · <a href="${SITE_URL}/blog" style="color:#6b7280;text-decoration:underline;">Read on the web</a>
                </p>
              </td></tr>`
            : ""
        }
      </table>
      <p style="margin:16px 0 0;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#9ca3af;">${escapeHtml(BRAND_NAME)} · Studio</p>
    </td></tr>
  </table>
</body>
</html>`;
}

// ───────── Confirmation email ─────────

export async function sendConfirmationEmail(args: {
  to: string;
  confirmUrl: string;
}) {
  const { to, confirmUrl } = args;
  const resend = getResend();
  if (!resend) {
    console.error("[email] RESEND_API_KEY missing — cannot send confirmation");
    throw new Error("Email service not configured.");
  }

  const subject = `Confirm your subscription to ${NEWSLETTER_NAME}`;
  const preheader = "One click to confirm and you're in.";
  const body = `
    <h1 style="margin:0 0 16px;font-size:28px;line-height:1.25;letter-spacing:-0.02em;color:#0a0a0a;font-weight:600;">Confirm your subscription</h1>
    <p style="margin:0 0 12px;font-size:16px;line-height:1.7;color:#2a2a2c;">Thanks for subscribing to ${escapeHtml(NEWSLETTER_NAME)} — field notes from a small studio on engineering depth and design restraint.</p>
    <p style="margin:0 0 24px;font-size:16px;line-height:1.7;color:#2a2a2c;">Click the button below to confirm. New essays will land here occasionally — never spam.</p>
    <p style="margin:0 0 28px;">
      <a href="${confirmUrl}" style="display:inline-block;background:#0a0a0a;color:#ffffff;text-decoration:none;font-weight:500;font-size:15px;padding:14px 26px;border-radius:999px;">Confirm subscription →</a>
    </p>
    <p style="margin:0 0 8px;font-size:13px;line-height:1.6;color:#6b7280;">If the button doesn't work, paste this link into your browser:</p>
    <p style="margin:0;font-size:12px;line-height:1.5;color:#6b7280;word-break:break-all;"><a href="${confirmUrl}" style="color:#1e3a8a;text-decoration:none;">${escapeHtml(confirmUrl)}</a></p>
    <p style="margin:32px 0 0;font-size:13px;line-height:1.6;color:#9ca3af;">If you didn't sign up, ignore this email and you won't be added to the list.</p>
  `;

  const html = shell({ title: subject, preheader, body });

  const text = [
    `Confirm your subscription to ${NEWSLETTER_NAME}`,
    "",
    `Click this link to confirm:`,
    confirmUrl,
    "",
    "If you didn't sign up, ignore this email.",
  ].join("\n");

  const { error } = await resend.emails.send({
    from: NEWSLETTER_FROM,
    to,
    subject,
    html,
    text,
  });
  if (error) {
    console.error("[email] confirmation send error", error);
    throw new Error(error.message ?? "Failed to send confirmation.");
  }
}

// ───────── Broadcast (a published post) ─────────

export type BroadcastPost = {
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  readingTime: number;
};

type BroadcastResult = {
  sent: number;
  failed: number;
  errors: string[];
};

export async function sendPostBroadcast(args: {
  post: BroadcastPost;
  recipients: Array<{ email: string; unsubToken: string }>;
}): Promise<BroadcastResult> {
  const { post, recipients } = args;
  const resend = getResend();
  if (!resend) {
    console.error("[email] RESEND_API_KEY missing — cannot broadcast");
    throw new Error("Email service not configured.");
  }
  if (recipients.length === 0) return { sent: 0, failed: 0, errors: [] };

  const renderer = getEmailRenderer();
  const renderedBody = await renderer(post.content);
  const subject = post.title;
  const preheader = post.excerpt ?? `New essay from ${NEWSLETTER_NAME}`;

  const postUrl = `${SITE_URL}/blog/${post.slug}`;

  // Build email body once. The unsub URL is per-recipient, swapped in below.
  const sharedBody = `
    ${
      post.coverImage
        ? `<img src="${post.coverImage}" alt="" style="display:block;width:100%;max-width:520px;height:auto;border-radius:12px;border:1px solid #e5e5e5;margin:0 0 28px;" />`
        : ""
    }
    <h1 style="margin:0 0 12px;font-size:32px;line-height:1.18;letter-spacing:-0.02em;color:#0a0a0a;font-weight:600;">${escapeHtml(post.title)}</h1>
    ${post.excerpt ? `<p style="margin:0 0 24px;font-size:17px;line-height:1.6;color:#4a4a4c;">${escapeHtml(post.excerpt)}</p>` : ""}
    <p style="margin:0 0 28px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#9ca3af;">${post.readingTime} min read</p>
    <div style="font-size:16px;line-height:1.78;color:#2a2a2c;">
      ${renderedBody}
    </div>
    <p style="margin:36px 0 0;padding-top:24px;border-top:1px solid #ececf0;font-size:14px;color:#6b7280;">
      <a href="${postUrl}" style="color:#0a0a0a;text-decoration:underline;text-underline-offset:3px;">Read on the web →</a>
    </p>
  `;

  // Resend's batch API supports up to 100 emails per call.
  const result: BroadcastResult = { sent: 0, failed: 0, errors: [] };
  const chunks: typeof recipients[] = [];
  for (let i = 0; i < recipients.length; i += 100) {
    chunks.push(recipients.slice(i, i + 100));
  }

  for (const chunk of chunks) {
    const items = chunk.map((r) => {
      const unsubUrl = `${SITE_URL}/api/subscribe/unsubscribe?token=${encodeURIComponent(r.unsubToken)}`;
      return {
        from: NEWSLETTER_FROM,
        to: r.email,
        subject,
        html: shell({ title: subject, preheader, body: sharedBody, unsubUrl }),
        text: buildBroadcastText({ post, postUrl, unsubUrl }),
        // RFC 8058 one-click unsubscribe headers — required by Gmail/Yahoo.
        headers: {
          "List-Unsubscribe": `<${unsubUrl}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
      };
    });

    try {
      const { data, error } = await resend.batch.send(items);
      if (error) {
        result.failed += chunk.length;
        result.errors.push(error.message ?? "Resend batch error");
        console.error("[email] broadcast batch error", error);
      } else {
        result.sent += data?.data?.length ?? chunk.length;
      }
    } catch (err) {
      result.failed += chunk.length;
      const msg = err instanceof Error ? err.message : "Unknown send error";
      result.errors.push(msg);
      console.error("[email] broadcast batch exception", err);
    }
  }

  return result;
}

function buildBroadcastText(args: {
  post: BroadcastPost;
  postUrl: string;
  unsubUrl: string;
}): string {
  const { post, postUrl, unsubUrl } = args;
  return [
    post.title,
    "",
    post.excerpt ?? "",
    "",
    `Read on the web: ${postUrl}`,
    "",
    "—",
    `Unsubscribe: ${unsubUrl}`,
  ]
    .filter((line) => line !== null && line !== undefined)
    .join("\n");
}

// ───────── Purchase receipt ─────────
// Sent from the Stripe webhook after a successful checkout. Carries the
// signed download link — no PDF attachment, no private file path, no
// price (Stripe already sent its own card receipt for the money side).

const MAX_DOWNLOADS_HUMAN = 5;

function formatExpiryDate(d: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

export async function sendPurchaseReceipt(args: {
  to: string;
  productTitle: string;
  downloadUrl: string;
  expiresAt: Date;
}) {
  const { to, productTitle, downloadUrl, expiresAt } = args;
  const resend = getResend();
  if (!resend) {
    console.error("[email] RESEND_API_KEY missing — cannot send receipt");
    throw new Error("Email service not configured.");
  }

  const expires = formatExpiryDate(expiresAt);
  const subject = `Your download — ${productTitle}`;
  const preheader = `Tap to download. Link valid until ${expires}.`;

  const body = `
    <h1 style="margin:0 0 16px;font-size:28px;line-height:1.25;letter-spacing:-0.02em;color:#0a0a0a;font-weight:600;">Thanks for your purchase</h1>
    <p style="margin:0 0 12px;font-size:16px;line-height:1.7;color:#2a2a2c;">Your copy of <strong>${escapeHtml(productTitle)}</strong> is ready. Use the button below to download it.</p>
    <p style="margin:24px 0 28px;">
      <a href="${downloadUrl}" style="display:inline-block;background:#0a0a0a;color:#ffffff;text-decoration:none;font-weight:500;font-size:15px;padding:14px 26px;border-radius:999px;">Download →</a>
    </p>
    <p style="margin:0 0 8px;font-size:13px;line-height:1.6;color:#6b7280;">If the button doesn't work, paste this link into your browser:</p>
    <p style="margin:0 0 24px;font-size:12px;line-height:1.5;color:#6b7280;word-break:break-all;"><a href="${downloadUrl}" style="color:#1e3a8a;text-decoration:none;">${escapeHtml(downloadUrl)}</a></p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0 0;border-collapse:separate;border:1px solid #e5e5e5;border-radius:8px;background:#fafafa;">
      <tr><td style="padding:14px 16px;font-size:13px;line-height:1.6;color:#4a4a4c;">
        <strong style="color:#0a0a0a;">A couple of details:</strong><br/>
        • This link is valid until <strong>${escapeHtml(expires)}</strong>.<br/>
        • You can use it for up to <strong>${MAX_DOWNLOADS_HUMAN} downloads</strong> — save the file locally after the first one.
      </td></tr>
    </table>
    <p style="margin:32px 0 0;font-size:13px;line-height:1.6;color:#6b7280;">If something doesn't work or you need a fresh link, reply to this email or write to <a href="mailto:${SUPPORT_EMAIL}" style="color:#1e3a8a;text-decoration:none;">${SUPPORT_EMAIL}</a>. I'll sort it out.</p>
  `;

  const html = shell({ title: subject, preheader, body });

  const text = [
    `Thanks for your purchase.`,
    "",
    `Your copy of ${productTitle} is ready. Download it here:`,
    downloadUrl,
    "",
    `This link is valid until ${expires} and works for up to ${MAX_DOWNLOADS_HUMAN} downloads — save the file locally after the first one.`,
    "",
    `If something doesn't work or you need a fresh link, reply to this email or write to ${SUPPORT_EMAIL}.`,
  ].join("\n");

  const { error } = await resend.emails.send({
    from: RECEIPT_FROM,
    to,
    subject,
    html,
    text,
    replyTo: SUPPORT_EMAIL,
  });
  if (error) {
    console.error("[email] receipt send error", error);
    throw new Error(error.message ?? "Failed to send receipt.");
  }
}
