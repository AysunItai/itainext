# Stripe Digital Products — Implementation Plan

> Project: Itai Web Solutions (Next.js 16.2.6, App Router, Prisma + Postgres, Resend)
> Scope: Sell **digital products** (PDF today; courses/templates/audio tomorrow) via **Stripe Checkout (hosted)**, **no cart**, **no customer accounts**, **anonymous email-only checkout**, with **protected downloads** delivered by **signed, expiring links** in email.

---

## 0. Why this plan looks the way it does

Stripe has two very different integration shapes:

- **Stripe Checkout (hosted)** — you redirect the buyer to a Stripe-hosted page; Stripe collects card details, runs 3DS/wallets, and bounces them back. You never touch a card number, so PCI scope is minimal.
- **Stripe Elements / Payment Element** — you embed Stripe UI components into your own page. More control, more code, more responsibility.

For a small digital store with one product today and a few products tomorrow, **hosted Checkout is the right tool**. We can revisit Elements later if you ever want an embedded multi-item cart or upsells.

Everything else in this plan (webhook fulfillment, signed download links, server-side price lookup) is a direct consequence of two ideas:

1. **Never trust the browser** with anything that decides what was paid or what gets delivered.
2. **Stripe's webhook is the source of truth** for "this payment really happened."

---

## 1. Current project findings

### What already exists

- **Next.js 16.2.6, App Router**, React 19, TypeScript, Tailwind v4.
- **Prisma 6** on Postgres (Neon). Two models so far: `Post`, `Subscriber`.
- **Shop area** under `app/shop/`:
  - `app/shop/page.tsx` — catalog listing
  - `app/shop/[slug]/page.tsx` — product detail page
  - `app/shop/[slug]/ProductContent.tsx` — client UI with a "Download" button
- **Catalog** is in-memory in `lib/library.ts` as `PUBLICATIONS: Publication[]`. The type already reserves `priceCents`, `listPriceCents`, and `stripePriceId` for "future paid mode" — but nothing is wired to Stripe yet.
- **One product today**: `sql-performance-masterclass` (PDF), currently free.
- **The PDF lives in `public/publications/sqlmasterclass.pdf`** — publicly downloadable by anyone who guesses or shares the URL.
- **Resend** is already installed and used by `lib/email.ts` for newsletter confirmation + broadcast. There is a shared HTML email shell we can reuse for purchase receipts.
- **API routes** under `app/api/` follow a clean convention: `contact`, `subscribe`, `subscribe/confirm`, `subscribe/unsubscribe`, `admin/*`. We'll follow the same convention.
- **Env conventions**: secrets live in `.env`. Public site URL comes from `SITE_ORIGIN` (in `lib/site-url.ts`) and is reused by `lib/email.ts` as `SITE_URL`.

### What's missing for Stripe

- No `stripe` package installed.
- No Stripe env vars.
- No Prisma model for `Order` or `Download`.
- No checkout / webhook / download API routes.
- No private file storage — the PDF is in `public/` and would remain freely downloadable even after we add a paywall.
- The "Download" button on the product page is unconditional — there's no notion of "paid" yet.
- The product catalog is **publication-shaped** (`pages`, `format: "PDF" | "EPUB" | "Course"`, `toc`, etc.). It works for the ebook but isn't generic enough for arbitrary digital products. We'll either generalize it or keep the publication shape as a *specific type* of digital product (see §3).

---

## 2. Recommended architecture

End-to-end flow:

```
Product page (server-rendered, shows price + Buy button)
        │
        │ user clicks "Buy"
        ▼
POST /api/checkout                       ← receives { slug } only
        │   • looks up product server-side
        │   • reads stripePriceId from server catalog
        │   • creates Stripe Checkout Session with metadata { productSlug }
        ▼
Stripe-hosted Checkout page              ← Stripe collects email + card
        │
        │ on success: Stripe redirects → /shop/success?session_id=...
        │ in parallel: Stripe POSTs → /api/stripe/webhook
        ▼
POST /api/stripe/webhook                 ← signed event, server-only
        │   • verify signature with STRIPE_WEBHOOK_SECRET
        │   • on checkout.session.completed:
        │       - idempotent upsert of Order row
        │       - generate Download token (random, single-use-ish)
        │       - send receipt email with signed download URL via Resend
        ▼
Customer's inbox: "Your download is ready" → https://site/api/download/<token>
        │
        ▼
GET /api/download/[token]                ← validates token + expiry + counter
        │   • streams the PDF from a PRIVATE folder (outside /public)
        │   • increments downloadCount, updates lastDownloadedAt
        │   • refuses if expired / over limit
```

Two important properties of this design:

1. **The browser never sees price, file path, or product internals.** It only sends a `slug`.
2. **The webhook — not the browser's "thanks" page — creates the order.** A user could close their browser before the redirect, or refresh `/shop/success` ten times, but Stripe's webhook fires exactly once and is signed.

---

## 3. Product catalog design (generic)

The current `Publication` type in `lib/library.ts` is rich and ebook-specific (`pages`, `toc`, `format: "PDF"|"EPUB"|"Course"`, cover gradients). Rather than rip it out, we add a **generic digital-product shape** that the shop/checkout layer talks to. Today, `Publication` will simply *be* one kind of `DigitalProduct`; tomorrow you can add `Template`, `AudioPack`, etc., and they all flow through the same checkout/webhook/download pipe.

Recommended generic shape (new file `lib/products.ts`):

```ts
export type ProductType = "publication" | "template" | "audio" | "course";

export type DigitalProduct = {
  slug: string;                // stable URL + DB key
  title: string;
  description: string;         // short, used in receipt email + Stripe metadata
  priceCents: number;          // 0 = free (skip Stripe, direct download still gated)
  currency: "usd" | "eur";     // ISO 4217 lowercase, as Stripe expects
  stripePriceId: string | null;// null while drafting; required to sell
  productType: ProductType;
  privateFilePath: string;     // path relative to PRIVATE_FILES_ROOT, e.g. "publications/sqlmasterclass.pdf"
  contentType: string;         // e.g. "application/pdf"
  downloadFileName: string;    // what the browser saves it as
};
```

Where it lives:

- `lib/products.ts` — single source of truth for `DigitalProduct`s, with `getProduct(slug)` and `listProducts()`.
- `lib/library.ts` — keeps the rich `Publication` type for the **marketing/landing page UI** (TOC, cover gradients, etc.). It can re-export the same `slug`s so a `Publication` and its `DigitalProduct` line up 1:1 by slug.
- The shop pages keep using `Publication` for presentation. The **checkout/webhook/download** routes only ever look at `DigitalProduct`. This separation means changing the marketing layout never risks breaking payments, and adding a non-publication product (say, a Figma template) doesn't require inventing fake `toc` data.

**Why server-side lookup matters**: the frontend sends `{ slug: "sql-performance-masterclass" }`. The backend translates that into `stripePriceId` and `priceCents` itself. A malicious user editing the request can only swap one valid slug for another — they cannot inject `priceCents: 1`.

---

## 4. Database design

Two new Prisma models. Names use the generic `product*` vocabulary so this works for any digital product, not just publications.

```prisma
model Order {
  id                    String   @id @default(cuid())
  // What was sold (snapshotted at purchase time so changing the catalog later
  // does not rewrite history).
  productSlug           String
  productTitle          String
  productType           String   // matches DigitalProduct.productType

  // Money, in the smallest currency unit (cents), as Stripe stores it.
  amountCents           Int
  currency              String   // e.g. "usd"

  // Buyer (anonymous — just the email Stripe collected).
  email                 String

  // Stripe references — used for support, refunds, idempotency.
  stripeSessionId       String   @unique
  stripePaymentIntentId String?
  stripeCustomerId      String?  // Stripe may create a Customer even without an account

  status                String   // "paid" | "refunded" | "failed"
  createdAt             DateTime @default(now())
  paidAt                DateTime?

  downloads             Download[]

  @@index([email])
  @@index([productSlug])
}

model Download {
  id                 String   @id @default(cuid())
  token              String   @unique          // random, URL-safe (nanoid)
  orderId            String
  order              Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)

  // Snapshot the path so a later catalog edit cannot retarget an old link.
  productSlug        String
  privateFilePath    String

  expiresAt          DateTime                  // e.g. 7 days after purchase
  maxDownloads       Int      @default(5)
  downloadCount      Int      @default(0)
  lastDownloadedAt   DateTime?

  createdAt          DateTime @default(now())

  @@index([orderId])
}
```

Why this shape:

- **Snapshotting `productTitle`, `amountCents`, `privateFilePath`** at purchase time: if you raise the price next month or rename a file, the buyer's receipt and link still reflect what they actually bought. This is the same reason invoices don't rewrite themselves.
- **`stripeSessionId @unique`**: turns the webhook into an idempotent upsert. Stripe may retry a webhook — we must not create two orders.
- **`Download` separate from `Order`**: lets you re-issue a link later ("hey, my link expired, can you resend it?") without touching the order, and lets one order have multiple links if you ever bundle products.

---

## 5. Environment variables

Add to `.env` (and document in `.env.example`):

| Variable | Why |
| --- | --- |
| `STRIPE_SECRET_KEY` | Server-side Stripe SDK auth. **Never** exposed to the browser. Starts with `sk_test_` in test mode, `sk_live_` in prod. |
| `STRIPE_WEBHOOK_SECRET` | Used to verify that an incoming webhook actually came from Stripe and wasn't forged. Starts with `whsec_`. |
| `NEXT_PUBLIC_APP_URL` | Public base URL of your site, used to build the Stripe `success_url`, `cancel_url`, and the absolute download link in emails. (You already have `SITE_ORIGIN` in `lib/site-url.ts` — we can reuse that and skip adding a new var. Noted here in case you want an explicit Stripe-facing name.) |
| `PRIVATE_FILES_ROOT` | Absolute path to the private-files directory on the server (e.g. `./private-files` in dev, an absolute path in prod). The download route reads from here. |

Reuse, do not duplicate:

- `RESEND_API_KEY` — already used by `lib/email.ts`.
- `NEWSLETTER_FROM_EMAIL` / `CONTACT_EMAIL_FROM` — already used; we'll add a sibling `RECEIPT_FROM_EMAIL` if you want receipts to come from a different address, otherwise fall back to `NEWSLETTER_FROM`.
- `DATABASE_URL` — already used.

Explicitly **not** adding:

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — only needed if we mount Stripe.js in the browser (Elements, embedded Checkout). Hosted Checkout via redirect does not require it.

---

## 6. Stripe Dashboard setup (manual, you do this once)

In Stripe Dashboard → **Test mode** first:

1. **Create a Product**
   - Name: `SQL Performance Masterclass`
   - Description: short marketing line.
   - (Optional) upload a thumbnail — appears on the hosted Checkout page.

2. **Create a Price** under that product
   - Type: **One time**
   - Amount: `$39.00` USD (or whatever you decide).
   - Save it. You'll get a `price_…` ID like `price_1Ab2Cd3eF…`.

3. **Paste the price ID** into `lib/products.ts` as the `stripePriceId` for `sql-performance-masterclass`. (For now we keep it hardcoded; later you could move products to the DB.)

4. **Create a webhook endpoint**
   - URL (prod): `https://YOUR-DOMAIN/api/stripe/webhook`
   - Events to send: **`checkout.session.completed`** (that's the only one we need for v1).
   - Stripe shows you a `whsec_…` signing secret. Copy it into `STRIPE_WEBHOOK_SECRET`.

5. For **local dev**, you do *not* create a webhook in the dashboard. Instead you run `stripe listen --forward-to localhost:3000/api/stripe/webhook` (see §11) and use the `whsec_` it prints.

When you flip to live mode, repeat steps 1–4 in live mode and swap the env vars. Test-mode `price_…` IDs do not work with live keys and vice versa.

---

## 7. API routes to implement

All three live under `app/api/` and follow the existing project convention.

### 7.1 `POST /api/checkout`

**Receives**: `{ slug: string }` in JSON body. **Nothing else.**

**Validates**:
- `slug` is a non-empty string and resolves to a product in `lib/products.ts`.
- That product has `priceCents > 0` and a non-null `stripePriceId` (else 400 — "not for sale yet").

**Does**:
- Creates a Stripe Checkout Session server-side using `stripe.checkout.sessions.create({ mode: "payment", line_items: [{ price: product.stripePriceId, quantity: 1 }], success_url: "$APP/shop/success?session_id={CHECKOUT_SESSION_ID}", cancel_url: "$APP/shop/<slug>", metadata: { productSlug: slug } })`.
- The `metadata.productSlug` is how the webhook later knows which product to fulfill.
- Sets `customer_creation: "if_required"` and `payment_intent_data: { receipt_email: ... }` so Stripe sends its own card receipt too (separate from our download email).

**Returns**: `{ url: string }` (the Checkout Session's hosted URL). The client redirects via `window.location = url`.

**Why this shape**: the only piece of data crossing the trust boundary is a `slug`. Even if someone reverse-engineers the route and POSTs `{ slug: "secret-product" }`, they get exactly what your server-side catalog says that product costs.

### 7.2 `POST /api/stripe/webhook`

**Receives**: A raw POST body from Stripe with a `stripe-signature` header.

**Validates**:
- Reads the raw body (not parsed JSON — signature must match bytes).
- Calls `stripe.webhooks.constructEvent(rawBody, sig, STRIPE_WEBHOOK_SECRET)`. If this throws, return 400.

**Does** (only for `event.type === "checkout.session.completed"`):
- Pulls `session.metadata.productSlug`, `session.id`, `session.payment_intent`, `session.customer_details.email`, `session.amount_total`, `session.currency`.
- Looks up the `DigitalProduct` again server-side.
- `prisma.order.upsert` by `stripeSessionId` (idempotency: Stripe will retry).
- Creates a `Download` row: `token = nanoid(40)`, `expiresAt = now + 7 days`, `maxDownloads = 5`, snapshotted `privateFilePath`.
- Sends the receipt email via Resend with the signed link `https://APP/api/download/<token>`.

**Returns**: `200 OK` quickly. Anything other than 2xx tells Stripe to retry — which is fine, but slow webhooks delay retries for *every* event.

**Why webhook and not success page**: see §10.

**Next.js 16 specifics**: the route must read the **raw** request body for signature verification. In App Router this is `await req.text()` (not `req.json()`). I'll consult `node_modules/next/dist/docs/01-app/` for the exact route handler conventions in 16.x before writing.

### 7.3 `GET /api/download/[token]`

**Receives**: `token` from the URL.

**Validates**:
- Token exists in `Download` table.
- `expiresAt > now`.
- `downloadCount < maxDownloads`.
- Linked `Order.status === "paid"`.

**Does**:
- Resolves the absolute path: `path.join(PRIVATE_FILES_ROOT, download.privateFilePath)`, then **verifies** the resolved path is still inside `PRIVATE_FILES_ROOT` (defense against `..` in stored paths — belt-and-braces).
- Streams the file with `Content-Type: <product.contentType>` and `Content-Disposition: attachment; filename="<product.downloadFileName>"`.
- Increments `downloadCount`, sets `lastDownloadedAt`.

**Returns**:
- `200` with the file stream on success.
- `404` for unknown token (don't reveal whether it ever existed).
- `410 Gone` for expired or over-limit (so customer support can distinguish).

---

## 8. Frontend changes

Minimal — most of the work is on the server.

In `app/shop/[slug]/ProductContent.tsx`:

- **Replace** the unconditional "Download" button with a price-aware button:
  - If `priceCents === 0`: keep "Download" but make it hit `/api/download/<freeToken>` — or, simplest first pass, link to the public file (we can lock down free items in a later phase).
  - If `priceCents > 0`: render a "Buy — $39" button.
- The Buy button is a small client component:
  ```ts
  async function onBuy() {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: product.slug }),
    });
    const { url } = await res.json();
    window.location.assign(url);
  }
  ```
- Show a loading spinner; disable the button while waiting (prevents double-charges from double-clicks).

Two new tiny pages:

- `app/shop/success/page.tsx` — "Thanks for your purchase. Check your email for the download link." Optionally reads `session_id` and pings a thin `/api/order/lookup` (not in v1) to show the title. For v1, a static message is fine. **Do not** trigger fulfillment from this page.
- `app/shop/cancelled/page.tsx` — "No charge made. Want to try again?" with a link back to the product. Stripe sends users here if they hit the back arrow on the hosted page.

The marketing-y product page (`app/shop/[slug]/page.tsx`) keeps working from `Publication`. Only the Buy button reads from `DigitalProduct` (by slug).

---

## 9. File protection plan

Today: `public/publications/sqlmasterclass.pdf` is served by Next as a static asset to anyone who knows the URL. That has to change before money is involved.

Plan:

1. Create a `private-files/` directory at the project root, **outside `public/`**, and add it to `.gitignore` if the files are large or sensitive. (Small PDFs you authored can stay in git — your call.)
2. Move `public/publications/sqlmasterclass.pdf` → `private-files/publications/sqlmasterclass.pdf`.
3. Add `PRIVATE_FILES_ROOT=./private-files` to `.env` (and an absolute path on the production host).
4. The download route reads files via `fs/promises` from `PRIVATE_FILES_ROOT + privateFilePath` and streams them. Nothing under `private-files/` is ever served by Next's static handler.
5. Path-traversal guard: after `path.resolve(root, privateFilePath)`, assert the result `startsWith(root)`. This is cheap insurance against a future bug that lets a path string slip in from outside our catalog.
6. **Update any existing links** that pointed at `/publications/*.pdf` (check `lib/library.ts` `file` field and any anchor tags). The free-PDF link, if you want to keep one product free, can either move to a dedicated free-download route or stay public — but be consistent.

Hosting note: on Vercel, the file system is read-only at runtime but files committed to the repo are available to server code. If files get large, a follow-up move to S3/R2 with signed URLs is a clean upgrade — the `DigitalProduct.privateFilePath` field becomes an object key instead of a local path. No other code changes needed.

---

## 10. Webhook fulfillment plan (why webhook, not success page)

It's tempting to put the "create order + send email" logic on `/shop/success` because that's where the user lands. **Don't.** Reasons:

1. **The browser might never reach `/shop/success`.** User closes the tab, loses WiFi, or pays via Apple Pay on mobile where the redirect is flaky.
2. **The browser can lie.** Anyone can hit `/shop/success?session_id=anything`. If that page provisioned access, you'd ship free downloads to anyone who could guess a URL.
3. **The browser can hit it many times.** Refreshing the success page must not send three receipt emails or create three download tokens.

The webhook fixes all three:

1. Stripe retries the webhook until you 2xx it, so fulfillment happens even if the user disappears.
2. The webhook is signed with `STRIPE_WEBHOOK_SECRET`. Forged requests fail signature verification.
3. The webhook uses `stripeSessionId @unique` + `prisma.upsert`, so retries are idempotent.

The `/shop/success` page is just a **confirmation UI**, not a fulfillment trigger.

(A nice optional polish later: the success page polls `/api/order/lookup?session_id=...` for a few seconds to show "your email is on its way" once the webhook lands. Not needed for v1.)

---

## 10b. Manual Stripe setup before Phase 11

Implementation paused after Phase 10. Before Phase 11 (end-to-end testing) can run, the following must be done by hand — most of it in Stripe's dashboard.

- [ ] **Create a Stripe account.** Use the same email that will receive support / receipts.
- [ ] **Stay in Test mode** in the Stripe Dashboard for now — the toggle is top-right. Test-mode keys, products, and prices are completely isolated from live. We'll do live separately when everything works.
- [ ] **Create a Product** in Test mode → Products → "+ Add product". Name: `SQL Performance Masterclass`. Description: copy from `lib/products.ts` (or shorter — Stripe shows this on the hosted Checkout page).
- [ ] **Create a one-time Price** under that product. Type: **One-time**. Amount: **`$39.00 USD`**. Save.
- [ ] **Copy the resulting `price_…` ID** (looks like `price_1Ab2Cd3eF…`) and paste it into `lib/products.ts` → `sql-performance-masterclass` entry → `stripePriceId: "price_…"` (replacing the current `null`).
- [ ] **Copy the test `sk_test_…` secret key** from Stripe Dashboard → Developers → API keys, and paste it into `.env` as `STRIPE_SECRET_KEY=sk_test_…`. Restart `npm run dev` after editing `.env`.
- [ ] **In a second terminal, run** `stripe listen --forward-to localhost:3000/api/stripe/webhook`. The CLI will prompt you to `stripe login` the first time. It prints a `whsec_…` value — this is the **CLI's** webhook secret, which is different from any dashboard webhook secret. Use this one for local dev.
- [ ] **Copy that CLI `whsec_…`** into `.env` as `STRIPE_WEBHOOK_SECRET=whsec_…`. Restart `npm run dev`.
- [ ] **Run a local checkout test**: visit `http://localhost:3000/shop/sql-performance-masterclass`, click **Buy — $39**, complete Stripe's hosted page with test card **`4242 4242 4242 4242`**, any future expiry, any CVC, any ZIP.
- [ ] **Verify the four things landed**:
  1. **Order row** in `Order` table (check `npx prisma studio`) with `status: "paid"`, your email, `stripeSessionId`, `amountCents: 3900`.
  2. **Download row** in `Download` table linked to that Order, with a `token`, `expiresAt` ~7 days out, `downloadCount: 0`.
  3. **Receipt email** in your inbox (sender = `RECEIPT_FROM_EMAIL` if set, else `NEWSLETTER_FROM_EMAIL`). Until you verify a sender domain in Resend, the email only delivers to your own Resend-account email.
  4. **Download link** in the email opens the PDF and increments `Download.downloadCount` to 1.

The dashboard webhook endpoint (`https://www.itaiwebsolutions.com/api/stripe/webhook`) is for **production only** — do not create it now. We add it in Phase 12 when flipping to live mode.

If any step fails, capture the failing terminal output before retrying — `stripe listen` shows webhook deliveries with HTTP status codes, and that's the fastest way to spot which side broke.

---

## 11. Testing plan

### Local setup

1. `npm i stripe` (server SDK only; no client SDK needed for hosted Checkout).
2. Install the Stripe CLI (`brew install stripe/stripe-cli/stripe`) and `stripe login` once.
3. In one terminal: `npm run dev`.
4. In another terminal: `stripe listen --forward-to localhost:3000/api/stripe/webhook`. Copy the `whsec_…` it prints into `.env` as `STRIPE_WEBHOOK_SECRET`. **The CLI's secret is different from the dashboard's** — that's expected; use the CLI one for local dev.

### Happy path

1. Visit `/shop/sql-performance-masterclass`, click Buy.
2. On hosted Checkout, use test card **`4242 4242 4242 4242`**, any future expiry, any CVC, any ZIP.
3. Verify:
   - Redirected to `/shop/success`.
   - `stripe listen` shows `checkout.session.completed [evt_…] → 200`.
   - `prisma studio` shows one new `Order` (status `paid`) and one `Download` row with a token and `expiresAt` ~7 days out.
   - Resend dashboard shows the receipt email was sent. Inbox shows it.
   - Clicking the link in the email downloads the PDF. `Download.downloadCount` is now 1.

### 3DS / auth-required path

Test card **`4000 0027 6000 3184`** triggers a 3DS challenge. Confirm the order is created only after the challenge completes.

### Failure paths

- Card `4000 0000 0000 0002` → declined. No `Order` row should be created. Stripe redirects to `cancel_url`.
- Hit `/shop/success?session_id=cs_fake` directly. Page renders the static message; no order created, no email sent (because nothing is provisioned here).
- POST to `/api/stripe/webhook` with a garbage body → 400 (signature verification fails).

### Token rules

- Visit a valid download link twice → both work, counter increments to 2.
- Manually set `Download.expiresAt` to a past timestamp in Prisma Studio → link returns 410.
- Manually set `downloadCount = maxDownloads` → link returns 410.
- Random token `/api/download/abc123` → 404.

### Idempotency

- In `stripe listen`, find a `checkout.session.completed` event and `stripe events resend evt_…`. The webhook should return 200 again and **not** create a second order (upsert hit) and **not** send a second email (guard with `if (created) sendEmail()`).

### Path traversal sanity check

- Temporarily set a `DigitalProduct.privateFilePath` to `../package.json`. The route should refuse to serve it. (Revert after.)

---

## 12. Implementation phases (small, reviewable commits)

Each phase ends in a working commit. Stop after each one if you want to review.

1. **Planning doc** — this file. ✅ (you're reading it)
2. **Install Stripe SDK + env wiring** — `npm i stripe nanoid` (nanoid is already in deps), add `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `PRIVATE_FILES_ROOT` to `.env` and `.env.example`. Add `lib/stripe.ts` (singleton). No behavior change yet.
3. **Prisma models** — add `Order` and `Download`, run `prisma migrate dev --name add_orders_and_downloads`. Commit migration + updated client.
4. **Generic product catalog** — add `lib/products.ts` with `DigitalProduct`, `getProduct`, `listProducts`, and one entry pointing at the existing publication's slug. Leave `lib/library.ts` alone for now (Publication still drives marketing UI).
5. **File protection** — create `private-files/`, move the PDF, set `PRIVATE_FILES_ROOT`, update any links that referenced `/publications/*.pdf` (be careful, this is the breaking change). Keep this commit small and easy to revert.
6. **Checkout route** — `app/api/checkout/route.ts`. Manually test by `curl`'ing it and following the returned URL in a browser.
7. **Webhook route** — `app/api/stripe/webhook/route.ts`. Test with `stripe trigger checkout.session.completed` and `stripe listen`. At this point: orders land in DB, but no email/download yet.
8. **Download route** — `app/api/download/[token]/route.ts`. Manually create a `Download` row in Prisma Studio to test in isolation before wiring email.
9. **Receipt email** — extend `lib/email.ts` with `sendPurchaseReceipt({ to, productTitle, downloadUrl, expiresAt })` reusing the existing `shell()` layout. Call it from the webhook.
10. **Frontend buy button + success/cancel pages** — update `ProductContent.tsx`, add `app/shop/success/page.tsx` and `app/shop/cancelled/page.tsx`. Set `stripePriceId` and `priceCents` on the product.
11. **End-to-end test pass** — run through the checklist in §11. Fix issues. Take screenshots for your own records.
12. **Production rollout** — flip Stripe to live mode, repeat dashboard setup (§6) with live keys, set the production webhook URL, set live env vars on the host. Buy your own product with a real card, refund yourself.

---

## 13. Out of scope (explicitly, for v1)

- Stripe Connect / marketplace splits.
- Shopping cart / multi-item checkout.
- Subscriptions / recurring billing.
- Customer accounts, login, "my downloads" page.
- Stripe Elements / embedded Checkout.
- Tax automation beyond what Stripe Checkout offers by default (revisit Stripe Tax if you start selling internationally at volume).
- Refund automation (handle refunds manually in the Stripe Dashboard for now; we can add a `charge.refunded` webhook later that flips `Order.status` and invalidates download tokens).

---

## 14. Open questions to confirm before coding

1. **Price + currency** for SQL Masterclass? (Plan assumes USD; `listPriceCents` in the catalog suggests $39.00 was the intended price.)
2. **Download window**: 7 days / 5 downloads max — OK as defaults?
3. **"Free this season" handling**: keep the current free flow exactly as-is, just gated behind a free token, or remove the ribbon and make it $39 in the same go?
4. **Receipt email sender**: reuse `NEWSLETTER_FROM_EMAIL`, or set up `RECEIPT_FROM_EMAIL`?
5. **Production domain** for the live webhook URL? (Needed for §6 step 4 in live mode.)
