"use client";

import { motion, useScroll, useSpring } from "framer-motion";

interface ScrollProgressProps {
  position?: "top" | "bottom";
  color?: string;
  height?: number;
}

export function ScrollProgress({
  position = "top",
  color = "bg-[#8EBE34]",
  height = 3,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={`fixed ${position === "top" ? "top-0" : "bottom-0"} left-0 right-0 z-50 origin-left ${color}`}
      style={{ scaleX, height }}
    />
  );
}
