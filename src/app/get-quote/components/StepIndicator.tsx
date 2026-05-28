"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { EASE_OUT_EXPO } from "@/lib/motion";

type StepIndicatorProps = {
  steps: { id: number; label: string }[];
  currentStep: number;
};

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full">
      <ol className="flex items-center justify-between gap-2 sm:gap-4">
        {steps.map((step, index) => {
          const isComplete = step.id < currentStep;
          const isActive = step.id === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <li key={step.id} className="flex flex-1 items-center">
              <div className="flex items-center gap-3">
                <motion.div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium transition-colors ${
                    isComplete
                      ? "bg-[#52842D] text-white"
                      : isActive
                      ? "bg-[#52842D] text-white"
                      : "bg-white text-[#6F6F6F] ring-1 ring-inset ring-[#e5e7eb]"
                  }`}
                  initial={false}
                  animate={{
                    scale: isActive ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                >
                  {isComplete ? <Check className="h-4 w-4" /> : step.id}
                </motion.div>
                <span
                  className={`hidden text-sm font-medium sm:inline ${
                    isActive
                      ? "text-[#1d1d1f]"
                      : isComplete
                      ? "text-[#52842D]"
                      : "text-[#6F6F6F]"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {!isLast && (
                <div className="relative mx-3 h-px flex-1 overflow-hidden rounded-full bg-[#e5e7eb] sm:mx-4">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-[#52842D]"
                    initial={false}
                    animate={{
                      width: isComplete ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
