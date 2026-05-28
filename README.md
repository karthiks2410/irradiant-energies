# Irradiant Energie

Marketing site + solar quote calculator for [irradiantenergie.com](https://www.irradiantenergie.com), built on Next.js 16 (App Router, Turbopack), React 19, Tailwind v4, and framer-motion.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quote form setup (Resend + WhatsApp)

The `/get-quote` page is a stateless lead-capture flow: the visitor adjusts their bill, sees their recommended system live, then submits name + phone + email. The `POST /api/quote` route emails them a branded receipt, alerts the sales inbox, and hands them off to WhatsApp via a prefilled deep-link. There is no database — the result page is rendered from a base64-encoded URL token.

The form **ships and works without any setup**: with `RESEND_API_KEY` unset, the API returns `{ ok: true, emailDelivered: false, whatsappLink, resultUrl }` and the success card just routes the user to WhatsApp directly. To turn on email delivery, do the four steps below.

### 1. Sign up for Resend

1. Create a free account at [resend.com](https://resend.com).
2. **Domains** → **Add domain** → enter `irradiantenergie.com`.
3. Resend gives you 3 DNS records to add at your registrar (one TXT for SPF, one TXT for DKIM, one TXT for DMARC). Add them and click **Verify**. Verification usually takes a few minutes.
4. **API Keys** → **Create API key** → **Sending access** scope → copy the `re_…` key.

### 2. Set up the `leads@` alias

On your email host (Google Workspace / Zoho / cPanel / wherever `info@irradiantenergie.com` lives), create an alias `leads@irradiantenergie.com` that forwards to the inbox(es) of whoever handles sales. This is where the lead-alert email lands when a quote comes in.

> The customer-facing email is sent from `do-not-reply@irradiantenergie.com`. **You do not need to create this as a real mailbox** — it's a sender-only address. Replies bounce by design; that's the intent. All real conversations happen via WhatsApp / phone / in person, which is what the email copy tells the customer.

### 3. Set the env vars

In Vercel: **Project** → **Settings** → **Environment Variables**. Add for **Production** (and Preview if you want previews to send real email):

| Name              | Value                                     |
| ----------------- | ----------------------------------------- |
| `RESEND_API_KEY`  | the `re_…` key from step 1                |
| `EMAIL_FROM`      | `do-not-reply@irradiantenergie.com`       |
| `LEAD_EMAIL`      | `leads@irradiantenergie.com`              |

For local development, copy `.env.example` to `.env.local` and fill in the values.

### 4. Redeploy

Trigger a redeploy so the new env vars get picked up. Submit a test quote — you should receive the user receipt at the email you typed and the lead alert at `leads@`.

### What the API returns

```ts
// success (with email delivered):
{ ok: true, emailDelivered: true,  whatsappLink: "https://wa.me/…", resultUrl: "https://…", resultToken: "…" }

// success (no API key configured — graceful fallback):
{ ok: true, emailDelivered: false, whatsappLink: "https://wa.me/…", resultUrl: "https://…", resultToken: "…" }

// validation failure:
{ ok: false, error: "Validation failed", issues: [{ path: "contact.phone", message: "…" }, …] }
```

## Project structure

```
src/
  app/
    get-quote/                 # 1-page calculator + contact form
    api/quote/route.ts         # Resend + WhatsApp deep-link
    solutions/                 # Solar / ESS / EV solution pages
    discover/                  # VPP, P2P trading
  lib/
    solar-calc.ts              # Pure recommendation math (used by UI + API + emails)
    solar-constants.ts         # BESCOM tariffs, subsidy table, generation benchmarks
    quote-schema.ts            # Zod schemas shared by client + server
    quote-token.ts             # URL-safe base64 result tokens
    whatsapp.ts                # wa.me deep-link builder
    emails/                    # React Email templates (user receipt + lead alert)
    motion.ts                  # Shared easing curves and press transitions
  components/
    layout/                    # Header, Footer
    sections/                  # Marketing sections (hero, products, CTA…)
    ui/                        # Buttons, primitives
```

## Deploying on Vercel

The site is configured for Vercel out of the box. Push to `main` for production, or open a PR for a preview deployment. The `/api/quote` route runs on the Node.js runtime (Fluid Compute).
