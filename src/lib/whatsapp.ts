import { COMPANY } from "./constants";
import { formatINR, type QuoteRecommendation } from "./solar-calc";
import type { QuoteContact } from "./quote-schema";

/**
 * Build a wa.me deep link for handing the conversation off to WhatsApp.
 * The number on the link is COMPANY.whatsapp; the prefilled message
 * summarizes the recommendation so the sales rep has full context the
 * moment the user taps "Continue on WhatsApp".
 */
export function buildWhatsappLink(
  contact: QuoteContact,
  recommendation: QuoteRecommendation,
): string {
  const lines = [
    `Hi! I just got my solar recommendation from Irradiant Energie.`,
    ``,
    `${recommendation.systemSizeKw} kWp system · ~${formatINR(recommendation.monthlySavingsRupees)}/mo savings · ${recommendation.paybackYears}-year payback`,
    ``,
    `Looking forward to discussing next steps.`,
    `— ${contact.name} (${contact.phone})`,
  ].join("\n");
  return `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(lines)}`;
}
