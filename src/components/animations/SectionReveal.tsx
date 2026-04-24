"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Wraps a section and fades it up smoothly as it enters the viewport
 * with a subtle scale effect for that Tesla-style reveal
 */
export function SectionReveal({ children, className, delay = 0 }: SectionRevealProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Fade in as section enters viewport (0 -> 0.3 of progress)
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [60, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, y }}
      className={className}
      initial={{ opacity: 0, y: 60 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
