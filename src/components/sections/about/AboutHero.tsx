"use client";

import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { EASE_OUT_EXPO } from "@/lib/motion";

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-[#1b4332] py-24 md:py-40 text-white">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
        <svg
          className="w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <defs>
            <pattern
              id="about-grid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#about-grid)" />
        </svg>
      </div>

      {/* Decorative blur */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#52842D] rounded-full blur-[120px] opacity-20" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#52842D] rounded-full blur-[100px] opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6"
          >
            <Leaf className="w-4 h-4 text-[#a5d0b9]" />
            <span className="text-sm font-semibold tracking-wide text-[#a5d0b9]">
              Our Mission
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT_EXPO }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6"
          >
            Powering a{" "}
            <span className="text-[#fdd404]">Greener</span> Tomorrow
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT_EXPO }}
            className="text-lg sm:text-xl text-white/80 max-w-2xl"
          >
            We are dedicated to accelerating India&apos;s transition to sustainable
            energy. Our mission is to make high-efficiency solar power accessible
            and affordable for every home and business.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
