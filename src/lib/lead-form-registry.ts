/**
 * Maps segment id → LeadCaptureForm content. Mirrors faq-registry.ts.
 */

import type { LeadFormContent } from "./segment-content-types";
import { homeLeadForm } from "./home-segment-content";
import { housingSocietyLeadForm } from "./housing-society-segment-content";
import { commercialLeadForm } from "./commercial-segment-content";

const registry: Record<string, LeadFormContent> = {
  home: homeLeadForm,
  "housing-society": housingSocietyLeadForm,
  commercial: commercialLeadForm,
};

export function getLeadFormContent(segmentId: string): LeadFormContent | undefined {
  return registry[segmentId];
}
