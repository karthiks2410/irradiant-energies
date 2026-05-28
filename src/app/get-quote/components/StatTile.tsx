"use client";

import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";
import type { ReactNode } from "react";

type StatTileProps = {
  label: string;
  value: ReactNode;
  hint?: string;
  /** When true, this is the headline savings tile — gets the green accent. */
  highlight?: boolean;
};

export function StatTile({ label, value, hint, highlight = false }: StatTileProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
      }}
      className={`rounded-2xl border p-5 ${
        highlight
          ? "border-[#52842D]/20 bg-[#52842D]/5"
          : "border-[#e5e7eb] bg-white"
      }`}
    >
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#6F6F6F]">
        {label}
      </p>
      <p
        className={`mt-2 font-display text-3xl ${
          highlight ? "text-[#52842D]" : "text-[#1d1d1f]"
        }`}
      >
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-[#6F6F6F]">{hint}</p>}
    </motion.div>
  );
}
