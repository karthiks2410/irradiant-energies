"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MapPin, ShieldCheck, Sparkles, Sun } from "lucide-react";
import { EASE_OUT_EXPO } from "@/lib/motion";

// TODO: replace placeholder credibility numbers with real ones once finalised
// (years operating, installations done, etc.).
const credibility = [
  {
    icon: MapPin,
    label: "Bangalore HQ",
    detail: "Karnataka · Tamil Nadu · Telangana",
  },
  {
    icon: ShieldCheck,
    label: "MNRE-empanelled",
    detail: "Vendor-grade installers",
  },
  {
    icon: Sun,
    label: "Tier-1 panels",
    detail: "Bloomberg-rated modules",
  },
  {
    icon: Sparkles,
    label: "1,000+ rooftops",
    detail: "5 years on the ground",
  },
];

const fadeInOnce = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT_EXPO } },
};

export function AboutHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-white pt-32 pb-20 sm:pt-36 sm:pb-24">
      {/* Soft brand-green wash from top, fading to white — matches segment-page hero. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#52842D]/5 via-white to-white" />

      {/* Decorative softened brand-green orb in the top-right corner.
          Opacity capped at 0.08 per brand guardrails — no dark canvas, no glassmorphism. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-[#52842D] opacity-[0.08] blur-[140px]"
      />

      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInOnce}
          className="max-w-3xl"
        >
          {/* Pill chip — solid brand-green tint, no white/10, no backdrop-blur. */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#52842D]/10 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#52842D]" />
            <span className="text-xs font-medium text-[#52842D] tracking-wide">
              Our Mission
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-[#0a0a0a] leading-[1.02] mb-6">
            Powering a <span className="text-[#52842D]">Greener</span> Tomorrow
          </h1>
        </motion.div>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO, delay: 0.08 }}
          className="text-lg sm:text-xl text-[#1d1d1f] leading-relaxed max-w-2xl"
        >
          Built in Bangalore to accelerate India&apos;s shift to clean energy. From
          the first site visit to the last installation screw, we make rooftop
          solar simple, transparent, and built to last.
        </motion.p>

        {/* Credibility row — restrained, editorial. No card chrome. */}
        <motion.ul
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO, delay: 0.16 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 max-w-5xl border-t border-[#e5e7eb] pt-8"
        >
          {credibility.map(({ icon: Icon, label, detail }) => (
            <li key={label} className="flex items-start gap-3">
              <span className="flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#52842D]/10">
                <Icon className="w-4 h-4 text-[#52842D]" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#1d1d1f] leading-snug">
                  {label}
                </p>
                <p className="text-xs text-[#6F6F6F] leading-snug mt-0.5">
                  {detail}
                </p>
              </div>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
