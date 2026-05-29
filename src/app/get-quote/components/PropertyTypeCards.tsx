"use client";

import { motion } from "framer-motion";
import { Home, Building2, Factory } from "lucide-react";
import {
  PRESS_HOVER,
  PRESS_TAP,
  SPRING_PRESS,
} from "@/lib/motion";
import type { PropertyType } from "@/lib/solar-calc";

const OPTIONS: { id: PropertyType; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "society", label: "Society", icon: Building2 },
  { id: "industrial", label: "Industrial", icon: Factory },
];

type PropertyTypeCardsProps = {
  value: PropertyType;
  onChange: (next: PropertyType) => void;
};

export function PropertyTypeCards({ value, onChange }: PropertyTypeCardsProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {OPTIONS.map((opt) => {
        const Icon = opt.icon;
        const selected = opt.id === value;
        return (
          <motion.button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            whileHover={PRESS_HOVER}
            whileTap={PRESS_TAP}
            transition={SPRING_PRESS}
            aria-pressed={selected}
            className={`flex flex-col items-center justify-center gap-2 rounded-xl border p-4 text-sm transition-colors ${
              selected
                ? "border-[#52842D] bg-[#52842D]/5 text-[#1d1d1f]"
                : "border-[#e5e7eb] bg-white text-[#6F6F6F] hover:border-[#52842D]/40 hover:text-[#1d1d1f]"
            }`}
          >
            <Icon
              className={`h-5 w-5 ${selected ? "text-[#52842D]" : "text-[#6F6F6F]"}`}
            />
            <span className="font-medium">{opt.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
