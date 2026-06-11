/**
 * Maps segment id → WhyTrustGrid content. Mirrors faq-registry.ts.
 */

import type { TrustContent } from "./segment-content-types";
import { homeTrustCards } from "./home-segment-content";
import { housingSocietyTrustCards } from "./housing-society-segment-content";
import { commercialTrustCards } from "./commercial-segment-content";

const registry: Record<string, TrustContent> = {
  home: homeTrustCards,
  "housing-society": housingSocietyTrustCards,
  commercial: commercialTrustCards,
};

export function getTrustContent(segmentId: string): TrustContent | undefined {
  return registry[segmentId];
}
