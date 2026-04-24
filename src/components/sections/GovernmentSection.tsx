"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

const subsidyStats = [
  {
    amount: "78,000",
    prefix: "",
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
    prefix: "",
    label: "State Subsidies",
    description: "Additional incentives",
  },
];

export function GovernmentSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect for background gradient elements
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={sectionRef}
      id="government"
      className="min-h-screen relative overflow-hidden"
    >
      {/* Light gradient background - Apple style */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f5f5f7] via-white to-[#f5f5f7]" />

      {/* Subtle animated gradient orbs */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 scale-110"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.06, 0.12, 0.06],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl"
        />
      </motion.div>

      {/* Content overlay */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-8 md:px-16 py-20">
        <div className="max-w-7xl mx-auto w-full">
          {/* Header - centered */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-emerald-600 text-sm uppercase tracking-wider mb-4 text-center font-medium"
          >
            Government Support
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1d1d1f] mb-6 text-center tracking-tight"
          >
            Maximize Your Savings
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-[#6e6e73] max-w-2xl mx-auto mb-16 text-center"
          >
            Take advantage of central and state government subsidies to reduce
            your solar investment cost by up to 40%.
          </motion.p>

          {/* Stats Grid - Clean cards with subtle shadows */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16"
          >
            {subsidyStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-white rounded-2xl p-6 shadow-lg shadow-black/5 border border-black/5 hover:shadow-xl hover:shadow-black/10 transition-all"
              >
                <p className="text-3xl md:text-4xl font-bold text-[#1d1d1f] mb-2">
                  {stat.prefix}{stat.amount}
                </p>
                <p className="text-[#1d1d1f] font-medium mb-1">{stat.label}</p>
                <p className="text-[#6e6e73] text-sm">{stat.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom section - Paperwork CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <p className="text-[#6e6e73] text-lg mb-6 max-w-xl mx-auto">
              We handle all government paperwork - from documentation to
              disbursement. Zero hassle for you.
            </p>

            <Button
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-emerald-500/25"
            >
              <Calculator className="mr-2 w-5 h-5" />
              Calculate Your Subsidy
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
