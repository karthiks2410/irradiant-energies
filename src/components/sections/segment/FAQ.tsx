"use client";

import { useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { Accordion, type AccordionItem } from "@/components/ui/accordion";
import { homeFAQ } from "@/lib/home-segment-content";
import type { FAQContent } from "@/lib/faq-types";
import { COMPANY } from "@/lib/constants";

/**
 * FAQ section. Category tabs (e.g. Costs / Installation / Maintenance / The system)
 * inspired by Arkahub's tabbed approach but with our own grouping per segment.
 * Below the accordion sits a "Still have questions?" footer card pointing the
 * visitor straight to WhatsApp + phone — better than a dead-end "Learn" link.
 *
 * Pass a `content` object to swap in segment-specific Q&As (Society, Commercial).
 * Defaults to the Home segment's FAQ.
 */
export function FAQ({ content = homeFAQ }: { content?: FAQContent }) {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(content.categories[0]?.id ?? "");

  const activeCategory = content.categories.find((c) => c.id === activeId) ?? content.categories[0];
  if (!activeCategory) return null;

  /**
   * Arrow-key navigation across the tab strip — Left/Right move focus to the
   * neighbouring tab and activate it (manual activation would also be valid;
   * automatic feels right for this content where the panel renders instantly).
   * Home/End jump to the first/last tab. Matches the WAI-ARIA tab pattern.
   */
  const handleTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const cats = content.categories;
    const idx = cats.findIndex((c) => c.id === activeId);
    if (idx < 0) return;

    let nextIdx: number | null = null;
    if (e.key === "ArrowRight") nextIdx = (idx + 1) % cats.length;
    else if (e.key === "ArrowLeft") nextIdx = (idx - 1 + cats.length) % cats.length;
    else if (e.key === "Home") nextIdx = 0;
    else if (e.key === "End") nextIdx = cats.length - 1;

    if (nextIdx !== null) {
      e.preventDefault();
      const nextId = cats[nextIdx].id;
      setActiveId(nextId);
      // Move focus to the newly active tab so the user knows where they are.
      requestAnimationFrame(() => {
        document.getElementById(`faq-tab-${nextId}`)?.focus();
      });
    }
  };

  // The Accordion expects { id, question, answer } — answers can carry blank-line
  // breaks that we render as paragraph splits.
  const accordionItems: AccordionItem[] = activeCategory.items.map((item) => ({
    id: item.id,
    question: item.question,
    answer: (
      <div className="space-y-2">
        {item.answer.split("\n\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    ),
  }));

  const whatsappPrompt =
    content.stillHaveQuestions.whatsappPrompt ?? "Hi! I have a question — could you help?";
  const whatsappLink = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(whatsappPrompt)}`;
  const phoneLink = `tel:${COMPANY.phone.replace(/\s+/g, "")}`;

  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
          className="max-w-2xl mb-10"
        >
          <p className="text-xs uppercase tracking-wider text-[#52842D] font-medium mb-3">
            {content.eyebrow}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0a0a0a] mb-4 leading-tight">
            {content.heading}
          </h2>
          <p className="text-base text-[#1d1d1f] leading-relaxed">{content.subheading}</p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
          className="flex flex-wrap gap-2 mb-8"
          role="tablist"
        >
          {content.categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = cat.id === activeId;
            const tabId = `faq-tab-${cat.id}`;
            const panelId = `faq-panel-${cat.id}`;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                id={tabId}
                aria-selected={isActive}
                aria-controls={panelId}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveId(cat.id)}
                onKeyDown={handleTabKeyDown}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#52842D] text-white shadow-sm"
                    : "bg-[#f5f5f7] text-[#6F6F6F] hover:text-[#1d1d1f] hover:bg-gray-200/70"
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </motion.div>

        {/* Accordion — re-keyed when the active tab changes so it cleanly resets open state. */}
        <motion.div
          key={activeCategory.id}
          role="tabpanel"
          id={`faq-panel-${activeCategory.id}`}
          aria-labelledby={`faq-tab-${activeCategory.id}`}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
        >
          <Accordion items={accordionItems} />
        </motion.div>

        {/* Still have questions? footer card */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
          className="mt-12 rounded-2xl bg-gradient-to-br from-[#52842D]/5 via-white to-white border border-gray-100 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5"
        >
          <div>
            <h3 className="text-lg font-semibold text-[#0a0a0a] mb-1.5">
              {content.stillHaveQuestions.heading}
            </h3>
            <p className="text-sm text-[#1d1d1f] leading-relaxed max-w-md">
              {content.stillHaveQuestions.body}
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#52842D] hover:bg-[#446F26] text-white text-sm font-medium transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              {content.stillHaveQuestions.whatsappLabel}
            </a>
            <a
              href={phoneLink}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-gray-200 text-[#1d1d1f] text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#52842D]" />
              {content.stillHaveQuestions.callLabel}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
