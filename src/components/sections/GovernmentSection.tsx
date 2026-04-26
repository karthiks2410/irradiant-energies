"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
import { TextReveal, MaskReveal } from "@/components/animations/TextReveal";

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

export function GovernmentSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const orbScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.9]);

  return (
    <section
      ref={sectionRef}
      id="government"
      className="min-h-screen relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#f5f5f7] via-white to-[#f5f5f7]" />

      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 scale-110"
      >
        <motion.div
          style={{ scale: orbScale }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{ scale: orbScale }}
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl"
        />
      </motion.div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center px-8 md:px-16 py-20">
        <div className="max-w-7xl mx-auto w-full">
          <MaskReveal className="text-center mb-4">
            <p className="text-emerald-600 text-sm uppercase tracking-wider font-medium">
              Government Support
            </p>
          </MaskReveal>

          <div className="text-center mb-6">
            <TextReveal
              as="h2"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1d1d1f] tracking-tight justify-center"
            >
              Maximize Your Savings
            </TextReveal>
          </div>

          <MaskReveal delay={0.2} className="text-center mb-16">
            <p className="text-xl text-[#6e6e73] max-w-2xl mx-auto">
              Take advantage of central and state government subsidies to reduce
              your solar investment cost by up to 40%.
            </p>
          </MaskReveal>

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
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="bg-white rounded-2xl p-6 shadow-lg shadow-black/5 border border-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300"
              >
                <p className="text-3xl md:text-4xl font-bold text-[#1d1d1f] mb-2">
                  {stat.prefix}
                  {stat.amount}
                </p>
                <p className="text-[#1d1d1f] font-medium mb-1">{stat.label}</p>
                <p className="text-[#6e6e73] text-sm">{stat.description}</p>
              </motion.div>
            ))}
          </motion.div>

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

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-emerald-500/25 transition-all duration-300"
              >
                <Calculator className="mr-2 w-5 h-5" />
                Calculate Your Subsidy
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
