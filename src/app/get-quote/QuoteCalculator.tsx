"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { buildRecommendation, type PropertyType, type QuoteInputs } from "@/lib/solar-calc";
import { BillSlider, type BillMode } from "./components/BillSlider";
import { ContactPanel } from "./components/ContactPanel";
import { PropertyTypeCards } from "./components/PropertyTypeCards";
import { ResultPanel } from "./components/ResultPanel";

const PINCODE_REGEX = /^[1-9][0-9]{5}$/;

export function QuoteCalculator() {
  const [propertyType, setPropertyType] = useState<PropertyType>("home");
  const [pincode, setPincode] = useState<string>("560001");
  const [billMode, setBillMode] = useState<BillMode>("rupees");
  const [billRupees, setBillRupees] = useState<number>(3500);
  const [billKwh, setBillKwh] = useState<number>(350);
  const [debouncedBillRupees, setDebouncedBillRupees] = useState<number>(3500);
  const [debouncedBillKwh, setDebouncedBillKwh] = useState<number>(350);
  const [hasRevealed, setHasRevealed] = useState<boolean>(false);

  const validPincode = PINCODE_REGEX.test(pincode);

  // Debounce slider-driven values so the recommendation doesn't churn during drag.
  useEffect(() => {
    const t = setTimeout(() => setDebouncedBillRupees(billRupees), 180);
    return () => clearTimeout(t);
  }, [billRupees]);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedBillKwh(billKwh), 180);
    return () => clearTimeout(t);
  }, [billKwh]);

  const inputs = useMemo<QuoteInputs>(
    () => ({
      propertyType,
      pincode,
      ...(billMode === "rupees"
        ? { monthlyBillRupees: debouncedBillRupees }
        : { monthlyKwh: debouncedBillKwh }),
    }),
    [propertyType, pincode, billMode, debouncedBillRupees, debouncedBillKwh],
  );

  const recommendation = useMemo(() => {
    if (!validPincode) return null;
    return buildRecommendation(inputs);
  }, [inputs, validPincode]);

  // Trigger the one-time 3D flip the first time a valid recommendation appears.
  useEffect(() => {
    if (recommendation && !hasRevealed) {
      setHasRevealed(true);
    }
  }, [recommendation, hasRevealed]);

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Soft brand-tinted background wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(82,132,45,0.06),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-32 lg:pb-32 lg:pt-40">
        {/* Eyebrow + title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#52842D]/20 bg-[#52842D]/5 px-3 py-1">
            <Sparkles className="h-3.5 w-3.5 text-[#52842D]" />
            <span className="text-xs font-medium tracking-wide text-[#446F26]">
              Solar quote calculator
            </span>
          </div>
          <h1 className="mt-5 font-display text-4xl tracking-tight text-[#1d1d1f] sm:text-5xl">
            See your solar future,{" "}
            <span className="text-[#52842D]">in seconds.</span>
          </h1>
          <p className="mt-4 text-base text-[#6F6F6F] sm:text-lg">
            No forms. No calls. Just adjust your bill — we'll show you the system, savings,
            and 15-year value live.
          </p>
        </motion.div>

        {/* Calculator: input ⬌ result */}
        <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-[1fr_1.1fr] lg:gap-8">
          {/* Input panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.1 }}
            className="rounded-3xl border border-[#e5e7eb] bg-white p-6 sm:p-8"
          >
            <div className="space-y-7">
              {/* Property */}
              <div>
                <label className="mb-3 block text-sm font-medium text-[#1d1d1f]">
                  What kind of property?
                </label>
                <PropertyTypeCards
                  value={propertyType}
                  onChange={setPropertyType}
                />
              </div>

              {/* Pincode */}
              <div>
                <label
                  htmlFor="pincode"
                  className="mb-2 block text-sm font-medium text-[#1d1d1f]"
                >
                  Pincode
                </label>
                <input
                  id="pincode"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                  placeholder="560001"
                  className="w-full rounded-xl border border-[#e5e7eb] bg-white px-4 py-3 text-base text-[#1d1d1f] outline-none transition-colors focus:border-[#52842D] focus:ring-2 focus:ring-[#52842D]/20"
                />
                {!validPincode && pincode.length > 0 && (
                  <p className="mt-2 text-xs text-[#6F6F6F]">
                    Enter a valid 6-digit Indian pincode.
                  </p>
                )}
              </div>

              {/* Bill slider */}
              <BillSlider
                mode={billMode}
                onModeChange={setBillMode}
                value={billMode === "rupees" ? billRupees : billKwh}
                onValueChange={(next) =>
                  billMode === "rupees" ? setBillRupees(next) : setBillKwh(next)
                }
              />

              {/* Footer hint */}
              <div className="flex items-start gap-2 rounded-xl bg-[#f5f5f7] p-4">
                <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#52842D]" />
                <p className="text-xs leading-relaxed text-[#6F6F6F]">
                  When you're ready, share your details
                  and we'll send the full report to your inbox.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Result panel — flips into view first time only */}
          <motion.div
            style={{ perspective: 1400 }}
            className="relative"
          >
            <motion.div
              initial={
                hasRevealed
                  ? false
                  : { opacity: 0, rotateY: -14, y: 20 }
              }
              animate={{ opacity: 1, rotateY: 0, y: 0 }}
              transition={{
                duration: 0.85,
                ease: EASE_OUT_EXPO,
                delay: 0.2,
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {recommendation ? (
                <ResultPanel
                  key="result"
                  recommendation={recommendation}
                />
              ) : (
                <div className="rounded-3xl border border-dashed border-[#e5e7eb] bg-[#f5f5f7] p-10 text-center">
                  <p className="text-sm text-[#6F6F6F]">
                    Enter a valid pincode to see your recommendation.
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Contact form — sends email + WhatsApp link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.4 }}
          className="mx-auto mt-10 max-w-3xl lg:mt-14"
        >
          <ContactPanel inputs={inputs} ready={!!recommendation} />
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-[#6F6F6F]"
        >
          Estimates use BESCOM 2024 domestic tariff slabs, ₹3.05/kWh net-metering export
          rate, PM Surya Ghar subsidy schedule, and Karnataka generation benchmarks.
          Actual numbers vary with shading, roof orientation, and DISCOM policy. We'll
          confirm with a free site survey.
        </motion.p>
      </div>
    </section>
  );
}
