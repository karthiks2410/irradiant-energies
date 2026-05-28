"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { StepIndicator } from "./components/StepIndicator";
import { StepProperty } from "./steps/StepProperty";
import { StepUsage } from "./steps/StepUsage";
import { StepContact } from "./steps/StepContact";

const STEPS = [
  { id: 1, label: "Space" },
  { id: 2, label: "Usage" },
  { id: 3, label: "Contact" },
] as const;

export function QuoteForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const reduce = useReducedMotion();

  const goNext = () => setCurrentStep((s) => Math.min(STEPS.length, s + 1));
  const goBack = () => setCurrentStep((s) => Math.max(1, s - 1));

  const offset = reduce ? 0 : 24;

  return (
    <div className="relative mx-auto max-w-3xl px-6 pt-32 pb-24 sm:px-8">
      {/* Soft accent halo behind the form, on-palette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-24 -z-0 mx-auto h-64 max-w-2xl rounded-full bg-[#52842D]/8 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        className="relative space-y-3 text-center"
      >
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#52842D]">
          Personalized recommendation
        </p>
        <h1 className="font-display text-4xl text-[#1d1d1f] sm:text-5xl">
          Your solar story, in <em className="italic">90 seconds</em>.
        </h1>
        <p className="mx-auto max-w-xl text-base text-[#6F6F6F]">
          Three short questions. We&apos;ll tell you the system you need, what you&apos;ll save,
          and what you&apos;ll earn from BESCOM exports — no salesperson, no pressure.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.1 }}
        className="relative mt-12"
      >
        <StepIndicator steps={[...STEPS]} currentStep={currentStep} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.2 }}
        className="relative mt-10 overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white p-8 shadow-sm sm:p-10"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: offset }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -offset }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
          >
            {currentStep === 1 && <StepProperty onNext={goNext} />}
            {currentStep === 2 && <StepUsage onNext={goNext} onBack={goBack} />}
            {currentStep === 3 && <StepContact onBack={goBack} />}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
