"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

/**
 * Full-viewport section with parallax background
 * Text positioned on RIGHT side for layout variety
 */
export function P2PTradingSection() {
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
      id="p2p-trading"
      className="h-screen relative overflow-hidden"
    >
      {/* Full-bleed background image with parallax */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-[-15%]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/p2p-trading.jpg')" }}
        />
      </motion.div>

      {/* Gradient overlay for text readability - dark on RIGHT */}
      <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/40 to-transparent" />

      {/* Text content overlaid on image - positioned RIGHT */}
      <div className="absolute inset-0 flex items-center justify-end">
        <div className="max-w-xl px-8 md:px-16 text-white text-right">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm uppercase tracking-wider mb-4 text-green-400"
          >
            P2P Trading
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6"
          >
            Your Energy. Your Market.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 mb-8"
          >
            Generate more than you need? Sell it to your neighbors. Coming to Karnataka first.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex gap-4 justify-end"
          >
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white bg-transparent hover:bg-white hover:text-black px-8 py-6 text-lg rounded-full"
            >
              Learn More
            </Button>
            <Button
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg rounded-full"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
