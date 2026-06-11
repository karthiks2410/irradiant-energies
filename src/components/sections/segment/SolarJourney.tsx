"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { homeJourney } from "@/lib/home-segment-content";
import type { JourneyContent } from "@/lib/segment-content-types";

/**
 * "Simplified Solar Journey" — numbered steps + benefit pills. Content-driven
 * (each segment passes its own steps); falls back to the Home segment.
 *
 * Pure whileInView entrance, no scroll subscription.
 */
export function SolarJourney({ content = homeJourney }: { content?: JourneyContent }) {
  const reduceMotion = useReducedMotion();
  const stepsCount = content.steps.length;

  // Up to 4 steps look great in 4 cols; 5 steps look better in a 5-col grid
  // on lg+ so each step gets the same width. Below lg we always wrap nicely.
  const lgCols = stepsCount === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4";

  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
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
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1d1d1f] mb-4 leading-tight">
            {content.heading}
          </h2>
          <p className="text-base text-[#6F6F6F] leading-relaxed">{content.subheading}</p>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
          className="flex flex-wrap gap-2 sm:gap-3 mb-12"
        >
          {content.benefitPills.map((pill) => (
            <span
              key={pill}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#52842D]/8 border border-[#52842D]/15 text-xs font-medium text-[#446F26]"
            >
              <Check className="w-3.5 h-3.5 text-[#52842D]" />
              {pill}
            </span>
          ))}
        </motion.div>

        <div className={`grid grid-cols-1 md:grid-cols-2 ${lgCols} gap-5`}>
          {content.steps.map((step, idx) => {
            const StepIcon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  ease: EASE_OUT_EXPO,
                  delay: idx * 0.08,
                }}
                className="relative"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#52842D] text-white text-sm font-semibold shrink-0">
                    {step.number}
                  </div>
                  <div className="p-2 rounded-lg bg-[#52842D]/10">
                    <StepIcon className="w-4 h-4 text-[#52842D]" />
                  </div>
                </div>
                <h3 className="text-base font-semibold text-[#1d1d1f] mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="text-sm text-[#6F6F6F] leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
