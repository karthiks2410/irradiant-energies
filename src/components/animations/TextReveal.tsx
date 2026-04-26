"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function TextReveal({ children, className = "", as: Component = "p" }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = children.split(" ");

  return (
    <div ref={containerRef} className={className}>
      <Component className="flex flex-wrap">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          );
        })}
      </Component>
    </div>
  );
}

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

function Word({ children, progress, range }: WordProps) {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [20, 0]);

  return (
    <span className="relative mr-[0.25em] mt-[0.1em]">
      <span className="opacity-20">{children}</span>
      <motion.span
        style={{ opacity, y }}
        className="absolute left-0 top-0"
      >
        {children}
      </motion.span>
    </span>
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

interface CharRevealProps {
  children: string;
  className?: string;
  staggerDelay?: number;
}

export function CharReveal({ children, className = "", staggerDelay = 0.02 }: CharRevealProps) {
  const chars = children.split("");

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                delay: i * staggerDelay,
                ease: [0.33, 1, 0.68, 1],
              },
            },
          }}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}
