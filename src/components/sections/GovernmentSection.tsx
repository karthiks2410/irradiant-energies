"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
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

// TODO: replace with brand logos (with permission)
const EMI_BANKS = ["Bajaj Finserv", "HDFC", "ICICI", "SBI", "Axis", "Kotak"];

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
