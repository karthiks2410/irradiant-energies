"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";

/**
 * Full-viewport section with parallax background
 */
export function SmartBoxSection() {
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
      id="smart-box"
      className="h-screen relative overflow-hidden"
    >
      {/* Full-bleed background image with parallax */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-[-15%]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/smart-box.jpg')" }}
        />
      </motion.div>

      {/* Gradient overlay for text readability - dark on left */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />

      {/* Text content overlaid on image - positioned LEFT */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-xl px-8 md:px-16 text-white">
          {/* Coming Soon Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-1.5 text-sm">
              Coming Soon
            </Badge>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm uppercase tracking-wider mb-4 text-blue-400"
          >
            Smart Box
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6"
          >
            Intelligence That Pays for Itself
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-300 mb-8"
          >
            Our Smart Box learns your home. It knows when to store, when to use, when to sell.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg rounded-full"
            >
              <Bell className="mr-2 w-5 h-5" />
              Join Waitlist
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
