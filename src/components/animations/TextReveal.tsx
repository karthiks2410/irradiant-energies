"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

/**
 * Word-by-word fade-in. Visual is the same as the previous useScroll
 * implementation (each word fades + lifts in sequence), but the trigger
 * is whileInView once-per-entry — no continuous scroll subscription, no
 * collision with Lenis smooth-scroll.
 *
 * The previous useScroll + useTransform version caused the "stuck →
 * jerk" trackpad bug at section boundaries (CLAUDE.md called this out
 * for ProductShowcaseSection / CTASection / GovernmentSection — the
 * pattern resurfaced here, where TextReveal is consumed by
 * GovernmentSection).
 */
export function TextReveal({ children, className = "", as: Component = "p" }: TextRevealProps) {
  const reduceMotion = useReducedMotion();
  const words = children.split(" ");

  return (
    <Component className={`${className} flex flex-wrap`}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="mr-[0.25em] mt-[0.1em]"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.5,
            ease: EASE_OUT_EXPO,
            // Stagger each word — same effect as the per-word scroll mapping
            // but driven by an entrance trigger instead of scroll position.
            delay: i * 0.04,
          }}
        >
          {word}
        </motion.span>
      ))}
    </Component>
  );
}

interface MaskRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function MaskReveal({ children, className = "", delay = 0 }: MaskRevealProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.33, 1, 0.68, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
