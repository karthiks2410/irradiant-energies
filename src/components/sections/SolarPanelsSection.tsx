"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * Full-viewport section with parallax background
 */
export function SolarPanelsSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Background parallax - subtle movement
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section
      ref={sectionRef}
      id="solar-panels"
      className="h-screen relative overflow-hidden"
    >
      {/* Full-bleed background image with parallax */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-[-15%]"
      >
        <Image
          src="/solar-panel.jpg"
          fill
          className="object-cover"
          alt="Solar panels on residential rooftop"
          priority
        />
      </motion.div>

      {/* Gradient overlay for text readability - dark on left */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* Text content overlaid on image - positioned LEFT */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-xl px-8 md:px-16 text-white">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm uppercase tracking-wider mb-4 opacity-80"
          >
            Solar Energy
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6"
          >
            Harness the Sun
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl opacity-90 mb-8"
          >
            Premium panels with professional installation. We handle all government
            subsidies and paperwork for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex gap-4"
          >
            <Link
              href="#solar-learn-more"
              className="inline-flex items-center justify-center px-8 py-3 text-lg rounded-full border border-white text-white hover:bg-white hover:text-black transition-colors"
            >
              Learn More
            </Link>
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center px-8 py-3 text-lg rounded-full bg-white text-black hover:bg-gray-100 transition-colors"
            >
              Get Quote
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
