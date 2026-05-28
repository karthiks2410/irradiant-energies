"use client";

import { motion, type Variants } from "framer-motion";
import { Sun, IndianRupee, Banknote, Hourglass, TreePine } from "lucide-react";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { formatINR, type QuoteRecommendation } from "@/lib/solar-calc";
import { TickerNumber } from "./TickerNumber";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT_EXPO },
  },
};

type ResultPanelProps = {
  recommendation: QuoteRecommendation;
};

export function ResultPanel({ recommendation }: ResultPanelProps) {
  const {
    systemSizeKw,
    panelCount,
    roofAreaSqftRequired,
    monthlySavingsRupees,
    monthlyExportEarningsRupees,
    paybackYears,
    pmSuryaGharSubsidyRupees,
    estimatedInstallCostRupees,
    twentyFiveYearSavingsRupees,
    monthlyGenerationKwh,
  } = recommendation;

  // Rough environmental impact figures — 0.82 kg CO2 / kWh grid avoided, ~22 kg CO2 / tree-year.
  const annualKwh = monthlyGenerationKwh * 12;
  const annualCo2KgAvoided = Math.round(annualKwh * 0.82);
  const equivalentTrees = Math.round(annualCo2KgAvoided / 22);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {/* Headline tile — system size */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-[#52842D]/20 bg-gradient-to-br from-[#52842D]/8 to-[#52842D]/3 p-6"
      >
        <div className="flex items-center gap-2">
          <Sun className="h-4 w-4 text-[#52842D]" />
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#52842D]">
            Recommended system
          </p>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <TickerNumber
            value={systemSizeKw}
            format={(n) => n.toFixed(1)}
            className="font-display text-5xl text-[#1d1d1f] tabular-nums"
          />
          <span className="font-display text-2xl text-[#52842D]">kWp</span>
        </div>
        <p className="mt-2 text-sm text-[#6F6F6F]">
          {panelCount} panels · ~{roofAreaSqftRequired} sq ft of roof
        </p>
      </motion.div>

      {/* Three financial tiles */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <motion.div
          variants={itemVariants}
          className="rounded-2xl border border-[#e5e7eb] bg-white p-5"
        >
          <div className="flex items-center gap-1.5">
            <IndianRupee className="h-3.5 w-3.5 text-[#6F6F6F]" />
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#6F6F6F]">
              Monthly savings
            </p>
          </div>
          <TickerNumber
            value={monthlySavingsRupees}
            format={(n) => formatINR(Math.round(n))}
            className="mt-2 block font-display text-2xl text-[#52842D] tabular-nums"
          />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="rounded-2xl border border-[#e5e7eb] bg-white p-5"
        >
          <div className="flex items-center gap-1.5">
            <Banknote className="h-3.5 w-3.5 text-[#6F6F6F]" />
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#6F6F6F]">
              Export earnings / mo
            </p>
          </div>
          <TickerNumber
            value={monthlyExportEarningsRupees}
            format={(n) => formatINR(Math.round(n))}
            className="mt-2 block font-display text-2xl text-[#1d1d1f] tabular-nums"
          />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="rounded-2xl border border-[#e5e7eb] bg-white p-5"
        >
          <div className="flex items-center gap-1.5">
            <Hourglass className="h-3.5 w-3.5 text-[#6F6F6F]" />
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#6F6F6F]">
              Payback
            </p>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <TickerNumber
              value={paybackYears}
              format={(n) => n.toFixed(1)}
              className="font-display text-2xl text-[#1d1d1f] tabular-nums"
            />
            <span className="text-sm text-[#6F6F6F]">yrs</span>
          </div>
        </motion.div>
      </div>

      {/* Subsidy + cost row */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-[#e5e7eb] bg-[#f5f5f7] p-5"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#6F6F6F]">
              Estimated install cost (after subsidy)
            </p>
            <TickerNumber
              value={estimatedInstallCostRupees}
              format={(n) => formatINR(Math.round(n))}
              className="mt-1 block font-display text-2xl text-[#1d1d1f] tabular-nums"
            />
          </div>
          {pmSuryaGharSubsidyRupees > 0 && (
            <div className="rounded-full border border-[#52842D]/30 bg-white px-3 py-1.5">
              <p className="text-xs font-medium text-[#446F26]">
                PM Surya Ghar subsidy ·{" "}
                <span className="tabular-nums">
                  {formatINR(pmSuryaGharSubsidyRupees)}
                </span>
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* 25-year + impact */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-[#1d1d1f]/8 bg-[#1d1d1f] p-6 text-white"
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/60">
          25-year cumulative value
        </p>
        <TickerNumber
          value={twentyFiveYearSavingsRupees}
          format={(n) => formatINR(Math.round(n), { compact: true })}
          className="mt-2 block font-display text-4xl tabular-nums"
        />
        <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-4 text-xs text-white/70">
          <TreePine className="h-3.5 w-3.5 text-[#9DC97A]" />
          <span>
            ~{annualCo2KgAvoided.toLocaleString("en-IN")} kg CO₂ avoided/yr · equal to {equivalentTrees} trees planted annually
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
