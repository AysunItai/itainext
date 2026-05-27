import OpenAI from "openai";

const TIMEOUT_MS = 12_000;
const MAX_OUTPUT_TOKENS = 700;
// gpt-4.1-mini — cheap, fast, more than enough for short reply drafting.
const MODEL = "gpt-4.1-mini";

export type ContactReply = {
  summary: string;
  leadType: string;
  urgency: "Low" | "Medium" | "High";
  reply: string;
};

type ContactReplyInput = {
  name: string;
  email: string;
  topic?: string;
  message: string;
};

// ───────── Business context ─────────
// Single source of truth for what the model knows about Itai Web Solutions.
// Keep this descriptive (no opinions, no marketing fluff) so the model can
// ground its replies without being pushed into a sales tone.

const BUSINESS_CONTEXT = `
Business name: Itai Web Solutions
Owner / contact person: Aysun, owner of Itai Web Solutions
Website: itaiwebsolutions.com

What the business does:
- Builds modern business websites
- Redesigns old WordPress websites
- Builds fast Next.js websites
- Improves contact forms and lead capture
- Helps small businesses with basic SEO setup
- Creates AI automation for small businesses
- Creates contact-form automation that prepares ready-to-send replies
- Helps businesses look more professional online

Typical customers:
- Small business owners
- Consultants
- Service providers
- Real estate agents
- Coaches
- Therapists
- Local businesses
- Small agencies

Voice and tone:
- Warm, professional, clear
- Plain English — no jargon, no buzzwords
- Not too corporate, not pushy, not salesy
- Helpful and practical — concrete next steps over abstract pitches
`.trim();

// ───────── System prompt ─────────
// The prompt embeds BUSINESS_CONTEXT and explicit reply rules. The model is
// instructed to return ONLY a JSON object so it pairs cleanly with the
// Responses API json_object format (set below in the request).

const SYSTEM_PROMPT = `
You are drafting a ready-to-send email reply for the owner of a small web
studio. The reply will be inserted directly into an email — the owner reads
it, may edit lightly, and hits send.

Use the business context below as the only source of truth about the studio.
If a fact is not in the context, do not invent it.

──────── BUSINESS CONTEXT ────────
${BUSINESS_CONTEXT}
──────────────────────────────────

Reply rules:
- Write as Aysun from Itai Web Solutions, in first person ("I"). Never refer
  to a "team" or "we".
- Do NOT mention or imply that AI wrote the reply, that you are an
  assistant, or that this is a draft. The reply must read like Aysun wrote it.
- Do NOT promise fixed prices, hourly rates, package deals, or discounts.
- Do NOT invent availability, calendar slots, dates, deadlines, or
  turnaround times.
- Do NOT invent technical details, integrations, brand-name partnerships,
  certifications, or case studies.
- Acknowledge what the customer wrote in 1–2 sentences before moving on.
- Ask only 1–3 useful follow-up questions, and only when they genuinely help
  scope the work. Skip questions if the message is already specific.
- Keep the reply short enough to copy-paste and send (3–6 short paragraphs,
  ideally under 180 words). Use blank lines between paragraphs.
- Topic-specific behavior:
    • Website work → if relevant, ask for the link to their current site so
      Aysun can review it before replying further.
    • Automation → ask which repetitive task they want to automate, and
      roughly how often it happens (daily, weekly, etc.).
    • SEO → ask what their main goal is (more local visits, more leads,
      etc.) and whether they already track Google Search Console.
    • Urgent-sounding messages → acknowledge the urgency briefly and offer
      a short call to talk it through.
- Tone: warm, professional, clear, plain English. Not too corporate, not
  pushy, not salesy.
- End the reply EXACTLY with this sign-off, on three lines, with no extra
  punctuation, no role title, and no contact details:

Best,
Aysun
Itai Web Solutions

Output rules:
- Return ONLY a single valid JSON object. No prose, no code fences, no
  comments, no trailing text.
- Use this exact shape (all four keys required):

{
  "summary": "1–2 sentence summary of what the customer wants",
  "leadType": "one short label: 'New website', 'Redesign', 'Automation', 'SEO', 'Lead capture', 'Support', 'Other'",
  "urgency": "Low" | "Medium" | "High",
  "reply": "the full ready-to-send email body as plain text, including the sign-off, with \\n line breaks between paragraphs"
}
`.trim();

const FALLBACK: ContactReply = {
  summary: "AI reply was not generated.",
  leadType: "Unknown",
  urgency: "Medium",
  reply: "",
};

export async function generateContactReply(
  input: ContactReplyInput,
): Promise<ContactReply> {
  if (!process.env.OPENAI_API_KEY) {
    return {
      ...FALLBACK,
      summary: "OPENAI_API_KEY missing — AI reply skipped.",
    };
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    timeout: TIMEOUT_MS,
    maxRetries: 1,
  });

  try {
    const response = await openai.responses.create({
      model: MODEL,
      max_output_tokens: MAX_OUTPUT_TOKENS,
      text: { format: { type: "json_object" } },
      input: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: [
            `Customer name: ${input.name}`,
            `Customer email: ${input.email}`,
            `Topic: ${input.topic?.trim() || "Not provided"}`,
            "",
            "Customer message:",
            input.message,
          ].join("\n"),
        },
      ],
    });

    const raw = stripCodeFence(response.output_text ?? "");
    if (!raw) return FALLBACK;

    const parsed = JSON.parse(raw) as Partial<ContactReply>;

    return {
      summary: pickString(parsed.summary, FALLBACK.summary),
      leadType: pickString(parsed.leadType, FALLBACK.leadType),
      urgency: normalizeUrgency(parsed.urgency),
      reply: pickString(parsed.reply, FALLBACK.reply),
    };
  } catch (err) {
    console.error("[ai/contact-reply] generation failed", err);
    return FALLBACK;
  }
}

function stripCodeFence(s: string): string {
  return s
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();
}

function pickString(v: unknown, fallback: string): string {
  return typeof v === "string" && v.trim() !== "" ? v : fallback;
}

function normalizeUrgency(v: unknown): "Low" | "Medium" | "High" {
  if (v === "Low" || v === "Medium" || v === "High") return v;
  return "Medium";
}
