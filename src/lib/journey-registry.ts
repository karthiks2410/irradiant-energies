/**
 * Maps segment id → SolarJourney content. Mirrors faq-registry.ts.
 * Used by SegmentLandingPage so server-component page wrappers don't
 * have to ship Lucide icons across the RSC boundary.
 */

import type { JourneyContent } from "./segment-content-types";
import { homeJourney } from "./home-segment-content";
import { housingSocietyJourney } from "./housing-society-segment-content";
import { commercialJourney } from "./commercial-segment-content";

const registry: Record<string, JourneyContent> = {
  home: homeJourney,
  "housing-society": housingSocietyJourney,
  commercial: commercialJourney,
};

export function getJourneyContent(segmentId: string): JourneyContent | undefined {
  return registry[segmentId];
}
