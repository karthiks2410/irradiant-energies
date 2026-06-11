"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { homeTrustCards } from "@/lib/home-segment-content";
import type { TrustContent } from "@/lib/segment-content-types";

/**
 * "Why families/societies/businesses trust Irradiant" — 4-card grid.
 * Content-driven (each segment passes its own cards); falls back to Home.
 */
export function WhyTrustGrid({ content = homeTrustCards }: { content?: TrustContent }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="py-20 sm:py-24 bg-[#f5f5f7]/40">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
          className="max-w-2xl mb-12"
        >
          <p className="text-xs uppercase tracking-wider text-[#52842D] font-medium mb-3">
            {content.eyebrow}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0a0a0a] mb-4 leading-tight">
            {content.heading}
          </h2>
          <p className="text-base text-[#1d1d1f] leading-relaxed">{content.subheading}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {content.cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  ease: EASE_OUT_EXPO,
                  delay: idx * 0.06,
                }}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-sm transition-shadow"
              >
                <div className="p-3 rounded-xl bg-[#52842D]/10 w-fit mb-5">
                  <Icon className="w-5 h-5 text-[#52842D]" />
                </div>
                <h3 className="text-base font-semibold text-[#0a0a0a] mb-2 leading-snug">
                  {card.title}
                </h3>
                <p className="text-sm text-[#6F6F6F] leading-relaxed">{card.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
