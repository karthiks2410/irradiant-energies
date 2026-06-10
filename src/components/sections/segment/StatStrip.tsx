"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { homeStats } from "@/lib/home-segment-content";

/**
 * "Powering homes across India" — 4 KPI tiles. Numbers are placeholders
 * (TODO: replace with verified ops numbers). Even SolarSquare ships this
 * section with "0" placeholders, so we're in good company shipping it
 * with skeleton numbers while real ones get sourced.
 */
export function StatStrip() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1d1d1f] mb-4 leading-tight">
            {homeStats.heading}
          </h2>
          <p className="text-base text-[#6F6F6F] leading-relaxed">
            {homeStats.subheading}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {homeStats.stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.4,
                  ease: EASE_OUT_EXPO,
                  delay: idx * 0.05,
                }}
                className="rounded-2xl bg-[#f5f5f7]/60 border border-gray-100 p-6 sm:p-8"
              >
                <div className="p-2 rounded-lg bg-[#52842D]/10 w-fit mb-4">
                  <Icon className="w-5 h-5 text-[#52842D]" />
                </div>
                <p className="text-3xl sm:text-4xl font-semibold text-[#1d1d1f] tracking-tight">
                  {stat.value}
                </p>
                <p className="text-sm text-[#6F6F6F] mt-1.5">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
