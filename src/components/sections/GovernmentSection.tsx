"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calculator, Landmark, ChevronDown } from "lucide-react";
import { TextReveal, MaskReveal } from "@/components/animations/TextReveal";
import { EASE_OUT_EXPO, PRESS_HOVER, PRESS_TAP, SPRING_PRESS } from "@/lib/motion";

const subsidyStats = [
  {
    amount: "78,000",
    prefix: "₹",
    label: "PM Surya Ghar",
    description: "Central subsidy",
  },
  {
    amount: "40%",
    prefix: "",
    label: "Tax Depreciation",
    description: "Commercial benefit",
  },
  {
    amount: "100%",
    prefix: "",
    label: "Net Metering",
    description: "Export credit",
  },
  {
    amount: "30,000/kW",
    prefix: "₹",
    label: "State Subsidies",
    description: "Additional incentives",
  },
];

// TODO: verify slabs against current MNRE/state schemes
const STATE_SUBSIDY: Record<string, { central: number; state: number }> = {
  // South
  "Karnataka": { central: 78000, state: 0 },
  "Tamil Nadu": { central: 78000, state: 0 },
  "Telangana": { central: 78000, state: 0 },
  "Kerala": { central: 78000, state: 10000 },
  "Andhra Pradesh": { central: 78000, state: 0 },
  // West
  "Maharashtra": { central: 78000, state: 6000 }, // ₹6k/kW state top-up
  "Gujarat": { central: 78000, state: 40000 }, // strong state policy
  "Goa": { central: 78000, state: 0 },
  // North
  "Delhi": { central: 78000, state: 30000 }, // strong NCT policy
  "Uttar Pradesh": { central: 78000, state: 30000 },
  "Rajasthan": { central: 78000, state: 0 },
  "Punjab": { central: 78000, state: 0 },
  "Haryana": { central: 78000, state: 0 },
  "Himachal Pradesh": { central: 78000, state: 0 },
  "Uttarakhand": { central: 78000, state: 0 },
  "Jammu & Kashmir": { central: 78000, state: 0 },
  // Central
  "Madhya Pradesh": { central: 78000, state: 0 },
  "Chhattisgarh": { central: 78000, state: 0 },
  // East
  "West Bengal": { central: 78000, state: 0 },
  "Bihar": { central: 78000, state: 0 },
  "Jharkhand": { central: 78000, state: 0 },
  "Odisha": { central: 78000, state: 0 },
  // Northeast
  "Assam": { central: 78000, state: 0 },
  "Arunachal Pradesh": { central: 78000, state: 0 },
  "Manipur": { central: 78000, state: 0 },
  "Meghalaya": { central: 78000, state: 0 },
  "Mizoram": { central: 78000, state: 0 },
  "Nagaland": { central: 78000, state: 0 },
  "Sikkim": { central: 78000, state: 0 },
  "Tripura": { central: 78000, state: 0 },
  // UTs
  "Chandigarh": { central: 78000, state: 0 },
  "Puducherry": { central: 78000, state: 0 },
  "Andaman & Nicobar Islands": { central: 78000, state: 0 },
  "Dadra & Nagar Haveli and Daman & Diu": { central: 78000, state: 0 },
  "Lakshadweep": { central: 78000, state: 0 },
  "Ladakh": { central: 78000, state: 0 },
};

const STATES = Object.keys(STATE_SUBSIDY).sort((a, b) => a.localeCompare(b));

const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function formatINR(n: number): string {
  return inrFormatter.format(n);
}

// TODO: replace with brand logos (with permission)
const EMI_BANKS = ["Bajaj Finserv", "HDFC", "ICICI", "SBI", "Axis", "Kotak"];

function StateSubsidyLookup() {
  const [stateName, setStateName] = useState("Karnataka");
  const reduceMotion = useReducedMotion();

  const { central, state } = STATE_SUBSIDY[stateName];
  const total = central + state;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
      className="mb-12 md:mb-14"
    >
      <div className="mx-auto max-w-3xl rounded-2xl bg-white border border-[#e5e7eb] shadow-lg shadow-black/5 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#52842D]/10 text-[#52842D]">
              <Landmark className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-display text-xl md:text-2xl font-semibold text-[#1d1d1f] tracking-tight">
                See subsidy in your state
              </h3>
              <p className="text-sm text-[#6F6F6F]">
                Pick a state to estimate your combined subsidy.
              </p>
            </div>
          </div>

          <div className="relative w-full md:w-64">
            <label htmlFor="state-subsidy-select" className="sr-only">
              Select your state
            </label>
            <select
              id="state-subsidy-select"
              value={stateName}
              onChange={(e) => setStateName(e.target.value)}
              className="w-full appearance-none rounded-full border border-[#e5e7eb] bg-white px-4 py-2.5 pr-10 text-sm font-medium text-[#1d1d1f] shadow-sm transition-colors hover:border-[#52842D]/40 focus:border-[#52842D] focus:outline-none focus:ring-2 focus:ring-[#52842D]/20"
            >
              {STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6F6F6F]"
              aria-hidden="true"
            />
          </div>
        </div>

        <div
          aria-live="polite"
          className="rounded-xl bg-[#f5f5f7] px-5 py-4 text-[#1d1d1f]"
        >
          <p className="text-sm md:text-base leading-relaxed">
            <span className="font-semibold text-[#1d1d1f]">{stateName}</span>
            {" — Central PM Surya Ghar "}
            <span className="font-semibold">{formatINR(central)}</span>
            {" + State top-up "}
            <span className="font-semibold">{formatINR(state)}</span>
            {" = "}
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={total}
                initial={
                  reduceMotion ? { opacity: 1 } : { opacity: 0, y: -6 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
                transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                className="inline-block font-bold text-[#52842D]"
              >
                {formatINR(total)} total
              </motion.span>
            </AnimatePresence>
            {" for a 3kW system."}
          </p>
        </div>

        <p className="mt-3 text-xs text-[#6F6F6F]">
          These are typical slabs — actual subsidy depends on system size and
          current MNRE schedule.
        </p>
      </div>
    </motion.div>
  );
}

function EMIStrip() {
  const pills = ["From ₹3,500/month", "No-cost EMI", "Instant approval"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
      className="mt-12 md:mt-14"
    >
      <div className="mx-auto max-w-5xl rounded-2xl bg-white border border-[#e5e7eb] shadow-lg shadow-black/5 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
          <div>
            <h3 className="font-display text-xl md:text-2xl font-semibold text-[#1d1d1f] tracking-tight">
              Pay over time, not upfront
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {pills.map((p) => (
                <span
                  key={p}
                  className="inline-flex items-center rounded-full bg-[#52842D]/10 px-3 py-1 text-xs font-semibold text-[#52842D]"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          <motion.div
            whileHover={PRESS_HOVER}
            whileTap={PRESS_TAP}
            transition={SPRING_PRESS}
            className="inline-block"
          >
            <Link href="/get-quote">
              <Button
                size="lg"
                className="rounded-full px-6 py-5 text-base bg-[#52842D] hover:bg-[#446F26] text-white shadow-md shadow-[#52842D]/20"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calculate my EMI
                <span aria-hidden="true" className="ml-1">
                  →
                </span>
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* TODO: replace with brand logos (with permission) */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
          {EMI_BANKS.map((bank) => (
            <div
              key={bank}
              className="flex items-center justify-center rounded-md border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-[#6F6F6F] font-semibold tracking-wide"
            >
              {bank}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function GovernmentSection() {
  return (
    <section
      id="government"
      className="min-h-screen relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#f5f5f7] via-white to-[#f5f5f7]" />

      {/* Static glow orbs — no scroll-driven scale, just ambient atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#52842D]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#52842D]/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center px-8 md:px-16 py-20">
        <div className="max-w-7xl mx-auto w-full">
          <MaskReveal className="text-center mb-4">
            <p className="text-[#52842D] text-sm uppercase tracking-wider font-medium">
              Government Support
            </p>
          </MaskReveal>

          <div className="text-center mb-6">
            <TextReveal
              as="h2"
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#0a0a0a] tracking-tight justify-center"
            >
              Maximize Your Savings
            </TextReveal>
          </div>

          <MaskReveal delay={0.2} className="text-center mb-12">
            <p className="text-xl text-[#1d1d1f] max-w-2xl mx-auto">
              Take advantage of central and state government subsidies to reduce
              your solar investment cost by up to 40%.
            </p>
          </MaskReveal>

          <StateSubsidyLookup />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {subsidyStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="min-w-0 bg-white rounded-2xl p-4 md:p-6 shadow-lg shadow-black/5 border border-black/5 hover:shadow-xl hover:shadow-black/10"
              >
                <p className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-2 leading-tight break-words">
                  {stat.prefix}
                  {stat.amount}
                </p>
                <p className="text-[#1d1d1f] font-medium mb-1">{stat.label}</p>
                <p className="text-[#6e6e73] text-sm">{stat.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <EMIStrip />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-14"
          >
            <p className="text-[#6e6e73] text-lg max-w-xl mx-auto">
              We handle all government paperwork - from documentation to
              disbursement. Zero hassle for you.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
