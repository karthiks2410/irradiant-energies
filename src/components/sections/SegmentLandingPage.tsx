"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BadgeCheck, ShieldCheck, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EASE_OUT_EXPO, PRESS_HOVER, PRESS_TAP, SPRING_PRESS } from "@/lib/motion";
import { solutionTypes, getSegmentById } from "@/lib/solutions-data";

interface SegmentLandingPageProps {
  /** Segment id (e.g. "home", "housing-society", "commercial"). Looked up client-side
   *  so we never try to serialize Lucide icon components across the server boundary. */
  segmentId: string;
  /** Optional hero image path under /public — leave undefined for the placeholder gradient. */
  heroImage?: string;
}

// TODO(content): replace with real, third-party-verified numbers when we have them.
const TRUST_BADGES: Array<{ icon: LucideIcon; label: string; sublabel: string }> = [
  { icon: BadgeCheck, label: "MNRE", sublabel: "Approved channel partner" },
  { icon: ShieldCheck, label: "End-to-end", sublabel: "Site visit → install → after-sales" },
  { icon: Sparkles, label: "Tier-1 panels", sublabel: "25-year performance warranty" },
];

const fadeInOnce = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
};

export function SegmentLandingPage({ segmentId, heroImage }: SegmentLandingPageProps) {
  const reduceMotion = useReducedMotion();
  const segment = getSegmentById(segmentId);

  if (!segment) {
    // Defensive fallback — should never hit since the page-level wrappers pass known ids.
    return null;
  }

  const SegmentIcon = segment.icon;
  const landing = segment.landing;

  // Segment-specific WhatsApp / quote prefill so the lead lands segmented.
  const quoteHref = `/get-quote?segment=${segment.id}`;

  return (
    <main className="min-h-screen bg-white">
      {/* ──────────────────────────────────────────────────────────────────────
         Hero
      ────────────────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Soft brand-green ambient wash — time-based, not scroll-driven. */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#52842D]/5 via-white to-white" />

        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={fadeInOnce}
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "show"}
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#52842D]/10 mb-6">
              <SegmentIcon className="w-3.5 h-3.5 text-[#52842D]" />
              <span className="text-xs font-medium text-[#52842D] tracking-wide">
                {landing?.eyebrow ?? segment.description}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#1d1d1f] leading-[1.05] mb-6">
              {landing?.heading ?? segment.description}
            </h1>

            {landing?.subheading && (
              <p className="text-lg sm:text-xl text-[#6F6F6F] leading-relaxed mb-10 max-w-2xl">
                {landing.subheading}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <motion.div whileHover={PRESS_HOVER} whileTap={PRESS_TAP} transition={SPRING_PRESS}>
                <Link href={quoteHref}>
                  <Button className="bg-[#52842D] hover:bg-[#446F26] text-white rounded-full px-7 py-6 text-sm">
                    Get a free quote
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={PRESS_HOVER} whileTap={PRESS_TAP} transition={SPRING_PRESS}>
                <Link href="#system-types">
                  <Button
                    variant="outline"
                    className="rounded-full px-7 py-6 text-sm border-[#e5e7eb] text-[#1d1d1f] hover:bg-[#f5f5f7]"
                  >
                    See which system fits you
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Hero visual — placeholder block for now. Swap to <Image> once branded asset is ready. */}
          <motion.div
            variants={fadeInOnce}
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "show"}
            viewport={{ once: true, amount: 0.2 }}
            className="mt-14"
          >
            <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-gradient-to-br from-[#52842D]/15 via-[#52842D]/5 to-[#f5f5f7] border border-gray-100 flex items-center justify-center">
              {heroImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={heroImage}
                  alt={`${segment.name} solar installation`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <div className="inline-flex p-5 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 mb-3">
                    <SegmentIcon className="w-10 h-10 text-[#52842D]" />
                  </div>
                  <p className="text-xs text-[#6F6F6F]">
                    {/* TODO: replace with branded {segment.name} hero photo */}
                    Branded photo coming soon
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
         Trust strip
      ────────────────────────────────────────────────────────────────────── */}
      <section className="py-10 border-y border-gray-100 bg-[#f5f5f7]/40">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {TRUST_BADGES.map(({ icon: Icon, label, sublabel }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white border border-gray-100">
                  <Icon className="w-5 h-5 text-[#52842D]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1d1d1f]">{label}</p>
                  <p className="text-xs text-[#6F6F6F]">{sublabel}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
         "Which system fits you?" — plain-English type cards
      ────────────────────────────────────────────────────────────────────── */}
      <section id="system-types" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            className="max-w-2xl mb-12"
          >
            <p className="text-xs uppercase tracking-wider text-[#52842D] font-medium mb-3">
              Choose what fits
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1d1d1f] mb-4">
              Which solar system suits your {segment.name.toLowerCase()}?
            </h2>
            <p className="text-base text-[#6F6F6F] leading-relaxed">
              Not sure which one is right? Don&apos;t worry — pick what sounds closest to your
              situation, or skip ahead and our team will help you decide on the call.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {solutionTypes.map((type, idx) => {
              const TypeIcon = type.icon;
              return (
                <motion.div
                  key={type.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, ease: EASE_OUT_EXPO, delay: idx * 0.06 }}
                >
                  <Link
                    href={`/solutions/solar/${segment.id}/${type.id}`}
                    className="group flex flex-col h-full p-7 rounded-2xl border border-gray-100 hover:border-[#52842D]/30 hover:shadow-sm hover:bg-[#52842D]/[0.02] transition-all"
                  >
                    <div className="p-3 rounded-xl bg-[#52842D]/10 w-fit mb-5">
                      <TypeIcon className="w-6 h-6 text-[#52842D]" />
                    </div>
                    <p className="text-[10px] uppercase tracking-wider text-[#6F6F6F] font-medium mb-2">
                      {type.name}
                    </p>
                    <h3 className="text-lg font-semibold text-[#1d1d1f] mb-3 leading-snug">
                      {type.plainName}
                    </h3>
                    <p className="text-sm text-[#6F6F6F] leading-relaxed flex-1 mb-5">
                      {type.plainDescription}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#52842D] mt-auto">
                      Learn more
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
         CTA band
      ────────────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-[#52842D] to-[#446F26]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
          >
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-4 leading-tight">
              Ready to see your savings?
            </h2>
            <p className="text-base sm:text-lg text-white/85 mb-8 max-w-xl mx-auto">
              Free site visit. Free quote. Zero pressure. We&apos;ll show you exactly what
              you&apos;ll save — in rupees, on your bill.
            </p>
            <motion.div
              whileHover={PRESS_HOVER}
              whileTap={PRESS_TAP}
              transition={SPRING_PRESS}
              className="inline-block"
            >
              <Link href={quoteHref}>
                <Button className="bg-white hover:bg-white/95 text-[#1d1d1f] rounded-full px-8 py-6 text-sm">
                  Get a free quote
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
