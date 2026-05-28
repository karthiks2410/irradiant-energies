"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  EASE_OUT_EXPO,
  SPRING_PRESS,
  PRESS_HOVER,
  PRESS_TAP,
} from "@/lib/motion";

const PLAIN_WORDS = ["Power", "Your", "Future"];
const ACCENT_WORDS = ["With", "Solar", "Energy"];

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const wordInitial = prefersReducedMotion ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 };
  return (
    <section className="relative min-h-[85vh] w-full overflow-hidden bg-white">
      <div
        className="absolute z-0"
        style={{
          top: "200px",
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <Image
          src="/solar-panel.jpg"
          alt="Solar panels on rooftop"
          fill
          priority
          className="object-cover"
          style={{ opacity: 0.9 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/60 to-white/90" />
      </div>

      <div
        className="relative z-10 flex flex-col items-center justify-center text-center px-6"
        style={{
          paddingTop: "calc(6rem + 20px)",
          paddingBottom: "6rem",
          minHeight: "85vh",
        }}
      >
        <h1
          className="max-w-7xl font-[family-name:var(--font-display)]"
          style={{
            fontSize: "clamp(3.25rem, 8.5vw, 6.5rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.035em",
            fontWeight: 800,
            color: "#1d1d1f",
          }}
        >
          {PLAIN_WORDS.map((word, i) => (
            <motion.span
              key={`plain-${i}`}
              initial={wordInitial}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: i * 0.06,
                ease: EASE_OUT_EXPO,
              }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
          {ACCENT_WORDS.map((word, i) => (
            <motion.span
              key={`accent-${i}`}
              initial={wordInitial}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: (PLAIN_WORDS.length + i) * 0.06,
                ease: EASE_OUT_EXPO,
              }}
              className="inline-block mr-[0.25em]"
              style={{ color: "#52842D" }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: EASE_OUT_EXPO }}
          className="text-base sm:text-lg max-w-2xl mt-8 leading-relaxed"
          style={{ color: "#6F6F6F" }}
        >
          India's complete solar ecosystem — from rooftop to revenue. Premium
          panels, smart energy management, and peer-to-peer trading.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: EASE_OUT_EXPO }}
          className="mt-12"
        >
          <motion.div
            whileHover={PRESS_HOVER}
            whileTap={PRESS_TAP}
            transition={SPRING_PRESS}
            className="inline-block"
          >
            <Link href="/get-quote">
              <Button
                size="lg"
                className="rounded-full px-14 py-6 text-base bg-[#52842D] hover:bg-[#446F26] text-white shadow-lg shadow-[#52842D]/25"
              >
                Get Free Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
