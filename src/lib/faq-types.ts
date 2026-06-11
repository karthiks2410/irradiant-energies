/**
 * Shared types for segment-level FAQ content. Each segment (Home, Society,
 * Commercial) ships its own FAQ data file matching this contract; the FAQ
 * component reads any of them via prop.
 */

import type { LucideIcon } from "lucide-react";

export interface FAQItem {
  id: string;
  question: string;
  /** Plain-text answer. Use `\n\n` between paragraphs — they're rendered as <p> splits. */
  answer: string;
}

export interface FAQCategory {
  id: string;
  label: string;
  icon: LucideIcon;
  items: FAQItem[];
}

export interface FAQContent {
  eyebrow: string;
  heading: string;
  subheading: string;
  categories: FAQCategory[];
  /** Footer card after the accordion — points to WhatsApp + phone. */
  stillHaveQuestions: {
    heading: string;
    body: string;
    /** Optional override for the WhatsApp message — defaults to a generic prompt. */
    whatsappPrompt?: string;
    whatsappLabel: string;
    callLabel: string;
  };
}
