import { z } from "zod";

/**
 * Shared schema for the quote API and the calculator's contact form.
 * Server re-validates this on POST so the client can't bypass.
 */

export const PROPERTY_TYPES = ["home", "society", "commercial", "industrial"] as const;

export const quoteInputsSchema = z
  .object({
    propertyType: z.enum(PROPERTY_TYPES),
    pincode: z
      .string()
      .regex(/^[1-9][0-9]{5}$/, "Enter a valid 6-digit Indian pincode"),
    monthlyKwh: z.number().positive().optional(),
    monthlyBillRupees: z.number().positive().optional(),
  })
  .refine(
    (v) => v.monthlyKwh !== undefined || v.monthlyBillRupees !== undefined,
    { message: "Provide monthly bill or kWh" },
  );

// Stricter than zod's built-in `.email()` — requires a TLD of at least 2 chars,
// rejects whitespace, repeated dots, and obvious junk like `a@b`. Still
// syntax-only — true validity (does the mailbox exist?) requires the MX-record
// check we do server-side in `/api/quote`.
const EMAIL_REGEX =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/;

export const quoteContactSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^(\+91[\s-]?)?[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(120)
    .regex(EMAIL_REGEX, "Enter a valid email address"),
  whatsappOptIn: z.boolean().default(true),
  consent: z.literal(true, { message: "Consent is required" }),
});

export const quoteRequestSchema = z.object({
  inputs: quoteInputsSchema,
  contact: quoteContactSchema,
});

export type QuoteRequest = z.infer<typeof quoteRequestSchema>;
export type QuoteContact = z.infer<typeof quoteContactSchema>;

/**
 * Soft typo nudge for the contact form — catches `gmial.com`, `yaho.com`,
 * `hotmial.com`, etc. Returns a suggestion or null. Cheap, no network.
 *
 * Used for a non-blocking "Did you mean …?" hint, not a hard error.
 */
const COMMON_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "yahoo.co.in",
  "outlook.com",
  "hotmail.com",
  "icloud.com",
  "rediffmail.com",
  "live.com",
  "protonmail.com",
];

export function suggestEmailFix(email: string): string | null {
  const trimmed = email.trim().toLowerCase();
  const at = trimmed.lastIndexOf("@");
  if (at < 1 || at === trimmed.length - 1) return null;

  const local = trimmed.slice(0, at);
  const domain = trimmed.slice(at + 1);
  if (COMMON_DOMAINS.includes(domain)) return null;

  let best: { domain: string; distance: number } | null = null;
  for (const candidate of COMMON_DOMAINS) {
    const d = levenshtein(domain, candidate);
    if (d > 0 && d <= 2 && (!best || d < best.distance)) {
      best = { domain: candidate, distance: d };
    }
  }

  return best ? `${local}@${best.domain}` : null;
}

// Tiny Levenshtein — fine at our scale (we compare against ~9 short strings).
function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const prev = new Array<number>(b.length + 1);
  const curr = new Array<number>(b.length + 1);
  for (let j = 0; j <= b.length; j++) prev[j] = j;

  for (let i = 1; i <= a.length; i++) {
    curr[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    for (let j = 0; j <= b.length; j++) prev[j] = curr[j];
  }
  return prev[b.length];
}
