"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Play, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "50MW+", label: "Capacity Installed" },
  { value: "10,000+", label: "Happy Customers" },
  { value: "25%", label: "Energy Savings" },
  { value: "15+", label: "Cities Covered" },
];

// Sun ray animation - rays emanate outward
const SunRays = () => {
  const rays = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none">
      {rays.map((i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 w-1 bg-gradient-to-t from-orange-500/30 to-transparent"
          style={{
            height: "50%",
            transformOrigin: "bottom center",
            rotate: `${i * 30}deg`,
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{
            duration: 1.5,
            delay: 0.5 + i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
      {/* Center sun circle */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 blur-xl"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      />
    </div>
  );
};

export function HeroSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Parallax: background moves slower than scroll
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Fade out content as user scrolls down
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], ["0%", "10%"]);
  const contentScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Sun rays rotate slowly as you scroll
  const raysRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Clean white/light gray background - Apple style */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-white via-white to-[#f5f5f7]"
      />

      {/* Animated sun rays background */}
      <motion.div
        style={{ rotate: raysRotate, opacity: contentOpacity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <SunRays />
      </motion.div>

      {/* Content with fade-out and scale on scroll */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY, scale: contentScale }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32"
      >
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-8"
          >
            <Sun className="w-4 h-4 text-orange-500" />
            <span className="text-orange-600 text-sm font-medium">India's Leading Solar Energy Provider</span>
          </motion.div>

          {/* Headline - staggered letter reveal */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.7 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-[#1d1d1f] mb-6 leading-tight tracking-tight"
          >
            Power Your Future
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              With Solar Energy
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.9 }}
            className="text-lg sm:text-xl text-[#6e6e73] max-w-2xl mx-auto mb-10"
          >
            Join thousands of Indian homes and businesses saving money while building a sustainable future.
            Premium solar panels, smart energy management, and peer-to-peer energy trading.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-orange-500/25"
            >
              Get Free Quote
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#1d1d1f]/20 text-[#1d1d1f] hover:bg-[#1d1d1f]/5 px-8 py-6 text-lg rounded-full"
            >
              <Play className="mr-2 w-5 h-5" />
              Watch Video
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.4 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-semibold text-[#1d1d1f] mb-1">{stat.value}</div>
                <div className="text-sm text-[#6e6e73]">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.6 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-[#1d1d1f]/20 rounded-full flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-[#1d1d1f]/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
