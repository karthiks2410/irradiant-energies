"use client";

import { motion } from "framer-motion";
import { TickerNumber } from "./TickerNumber";

export type BillMode = "rupees" | "kwh";

type BillSliderProps = {
  mode: BillMode;
  onModeChange: (next: BillMode) => void;
  /** When mode = rupees, the value is in INR. When kWh, the value is in kWh/month. */
  value: number;
  onValueChange: (next: number) => void;
};

const MIN_RUPEES = 500;
const MAX_RUPEES = 50000;
const MIN_KWH = 50;
const MAX_KWH = 5000;

export function BillSlider({
  mode,
  onModeChange,
  value,
  onValueChange,
}: BillSliderProps) {
  const min = mode === "rupees" ? MIN_RUPEES : MIN_KWH;
  const max = mode === "rupees" ? MAX_RUPEES : MAX_KWH;
  const step = mode === "rupees" ? 100 : 10;
  const unit = mode === "rupees" ? "₹/month" : "kWh/month";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-[#1d1d1f]">
          Monthly electricity {mode === "rupees" ? "bill" : "usage"}
        </label>
        <div className="inline-flex rounded-full bg-[#f5f5f7] p-1 text-xs">
          <button
            type="button"
            onClick={() => onModeChange("rupees")}
            className={`rounded-full px-3 py-1.5 transition-colors ${
              mode === "rupees"
                ? "bg-white text-[#1d1d1f] shadow-sm"
                : "text-[#6F6F6F]"
            }`}
          >
            ₹ Bill
          </button>
          <button
            type="button"
            onClick={() => onModeChange("kwh")}
            className={`rounded-full px-3 py-1.5 transition-colors ${
              mode === "kwh"
                ? "bg-white text-[#1d1d1f] shadow-sm"
                : "text-[#6F6F6F]"
            }`}
          >
            kWh Units
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-[#e5e7eb] bg-white p-5">
        <div className="flex items-baseline gap-2">
          <TickerNumber
            value={value}
            format={(n) =>
              mode === "rupees"
                ? `₹${Math.round(n).toLocaleString("en-IN")}`
                : `${Math.round(n).toLocaleString("en-IN")}`
            }
            className="font-display text-4xl text-[#1d1d1f] tabular-nums"
          />
          <span className="text-sm text-[#6F6F6F]">{unit}</span>
        </div>

        <div className="relative mt-5">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onValueChange(Number(e.target.value))}
            aria-label={`Monthly electricity ${mode === "rupees" ? "bill in rupees" : "usage in kWh"}`}
            className="quote-slider w-full"
            style={
              {
                // Filled portion left of the thumb, in palette green
                "--fill": `${((value - min) / (max - min)) * 100}%`,
              } as React.CSSProperties
            }
          />
          <motion.div
            initial={false}
            className="mt-2 flex justify-between text-[11px] text-[#6F6F6F]"
          >
            <span>
              {mode === "rupees" ? `₹${MIN_RUPEES}` : `${MIN_KWH}`}
            </span>
            <span>
              {mode === "rupees" ? `₹${MAX_RUPEES.toLocaleString("en-IN")}` : `${MAX_KWH.toLocaleString("en-IN")}`}
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
