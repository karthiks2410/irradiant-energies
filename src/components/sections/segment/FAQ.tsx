"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { Accordion, type AccordionItem } from "@/components/ui/accordion";
import { homeFAQ } from "@/lib/home-segment-content";
import { COMPANY } from "@/lib/constants";

/**
 * FAQ section. Category tabs (Costs / Installation / Maintenance / The system)
 * inspired by Arkahub's tabbed approach but with our own grouping. Below the
 * accordion sits a "Still have questions?" footer card pointing the visitor
 * straight to WhatsApp + phone — better than a dead-end "Learn" link.
 */
export function FAQ() {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(homeFAQ.categories[0].id);

  const activeCategory = homeFAQ.categories.find((c) => c.id === activeId) ?? homeFAQ.categories[0];

  // The Accordion expects { id, question, answer } — answers can carry line
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

  const whatsappLink = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
    "Hi! I have a question about home solar — could you help?",
  )}`;
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
            {homeFAQ.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1d1d1f] mb-4 leading-tight">
            {homeFAQ.heading}
          </h2>
          <p className="text-base text-[#6F6F6F] leading-relaxed">{homeFAQ.subheading}</p>
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
          {homeFAQ.categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = cat.id === activeId;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(cat.id)}
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
            <h3 className="text-lg font-semibold text-[#1d1d1f] mb-1.5">
              {homeFAQ.stillHaveQuestions.heading}
            </h3>
            <p className="text-sm text-[#6F6F6F] leading-relaxed max-w-md">
              {homeFAQ.stillHaveQuestions.body}
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
              {homeFAQ.stillHaveQuestions.whatsappLabel}
            </a>
            <a
              href={phoneLink}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-gray-200 text-[#1d1d1f] text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#52842D]" />
              {homeFAQ.stillHaveQuestions.callLabel}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
