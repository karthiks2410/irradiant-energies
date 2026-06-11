/**
 * Registry mapping segment id → FAQ content. Used by SegmentLandingPage
 * (a client component) so server-rendered page wrappers can request a
 * specific FAQ by string id, avoiding the React Server Component → Client
 * Component serialization boundary (Lucide icons can't be passed across).
 */

import type { FAQContent } from "./faq-types";
import { homeFAQ } from "./home-segment-content";
import { housingSocietyFAQ } from "./housing-society-segment-content";
import { commercialFAQ } from "./commercial-segment-content";

export const faqRegistry: Record<string, FAQContent> = {
  home: homeFAQ,
  "housing-society": housingSocietyFAQ,
  commercial: commercialFAQ,
};

export function getFAQContent(segmentId: string): FAQContent | undefined {
  return faqRegistry[segmentId];
}
