"use client";

import { motion, useScroll, useSpring } from "framer-motion";

interface ScrollProgressProps {
  position?: "top" | "bottom";
  color?: string;
  height?: number;
}

export function ScrollProgress({
  position = "top",
  color = "bg-orange-500",
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

interface SectionDotsProps {
  sections: { id: string; label: string }[];
  activeSection: string;
  onSectionClick?: (id: string) => void;
}

export function SectionDots({
  sections,
  activeSection,
  onSectionClick,
}: SectionDotsProps) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSectionClick?.(section.id)}
          className="group flex items-center gap-3"
        >
          <span
            className={`text-xs uppercase tracking-wider transition-all duration-300 opacity-0 group-hover:opacity-100 ${
              activeSection === section.id ? "text-orange-500" : "text-gray-400"
            }`}
          >
            {section.label}
          </span>
          <motion.div
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeSection === section.id
                ? "bg-orange-500 scale-150"
                : "bg-gray-300 group-hover:bg-orange-300"
            }`}
            whileHover={{ scale: 1.5 }}
          />
        </button>
      ))}
    </div>
  );
}
