"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

type TickerNumberProps = {
  value: number;
  /** How to format the spring value into display text. */
  format: (n: number) => string;
  className?: string;
};

/**
 * Number that springs from old → new value when `value` changes.
 * Reduced-motion users see the value snap instantly.
 */
export function TickerNumber({ value, format, className }: TickerNumberProps) {
  const reduce = useReducedMotion();
  const motionValue = useMotionValue(value);
  const spring = useSpring(motionValue, {
    stiffness: 40,
    damping: 24,
    mass: 1,
  });
  const display = useTransform(reduce ? motionValue : spring, (latest) =>
    format(latest),
  );

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  return <motion.span className={className}>{display}</motion.span>;
}
