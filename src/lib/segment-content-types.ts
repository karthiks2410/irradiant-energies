/**
 * Shared types for segment-level content sections (journey, trust grid,
 * lead form). Each segment ships content matching these contracts; the
 * section components consume them via prop or registry lookup.
 *
 * FAQ types live separately in faq-types.ts since they were the first
 * to be extracted.
 */

import type { LucideIcon } from "lucide-react";

/* ─── Solar Journey ─────────────────────────────────────────────────── */

export interface JourneyStep {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface JourneyContent {
  eyebrow: string;
  heading: string;
  subheading: string;
  /** 4 short pills surfaced above the steps. */
  benefitPills: string[];
  steps: JourneyStep[];
}

/* ─── Why Trust Grid ────────────────────────────────────────────────── */

export interface TrustCard {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface TrustContent {
  eyebrow: string;
  heading: string;
  subheading: string;
  cards: TrustCard[];
}

/* ─── Lead Capture Form ─────────────────────────────────────────────── */

export interface BillRange {
  value: string;
  label: string;
}

export interface LeadFormContent {
  eyebrow: string;
  heading: string;
  subheading: string;
  /** Small chip near the heading, e.g. "Free site visit · 7 days a week". */
  pill: string;
  submitLabel: string;
  /** Bill range bracket options for the dropdown. */
  billRanges: readonly BillRange[];
  /** Bill dropdown label, e.g. "Monthly electricity bill" or
   *  "Average monthly common-area bill". */
  billLabel: string;
  /** Optional secondary field — e.g. "Society name" / "Company name".
   *  When omitted, the form skips it entirely. */
  organisationField?: {
    label: string;
    placeholder: string;
    /** Param name forwarded to /get-quote. */
    paramName: string;
  };
}
