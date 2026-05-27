import type { Easing, Transition } from "framer-motion";

// Use these everywhere instead of inventing new ease curves per file.
export const EASE_OUT_EXPO: Easing = [0.16, 1, 0.3, 1];
export const EASE_OUT_EXPRESSIVE: Easing = [0.25, 0.1, 0.25, 1];
export const EASE_OUT_QUART: Easing = [0.33, 1, 0.68, 1];

export const SPRING_SOFT: Transition = {
  type: "spring",
  damping: 25,
  stiffness: 250,
  mass: 0.8,
};

export const SPRING_PRESS: Transition = {
  type: "spring",
  damping: 20,
  stiffness: 400,
  mass: 0.6,
};

export const SPRING_BOUNCY: Transition = {
  type: "spring",
  damping: 18,
  stiffness: 300,
};

// Standard whileHover / whileTap presets for primary CTAs.
export const PRESS_HOVER = { scale: 1.04 };
export const PRESS_TAP = { scale: 0.97 };
