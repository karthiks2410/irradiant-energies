"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  IndianRupee,
  Leaf,
  MessageCircle,
  PanelTop,
  Sun,
  TrendingUp,
} from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { EASE_OUT_EXPO, PRESS_HOVER, PRESS_TAP, SPRING_PRESS } from "@/lib/motion";
import {
  formatINR,
  projectionCurve,
  type QuoteRecommendation,
} from "@/lib/solar-calc";

type ResultStoryProps = {
  recommendation: QuoteRecommendation;
};

export function ResultStory({ recommendation }: ResultStoryProps) {
  const {
    systemSizeKw,
    panelCount,
    roofAreaSqftRequired,
    monthlySavingsRupees,
    monthlyExportEarningsRupees,
    breakevenYears,
    pmSuryaGharSubsidyRupees,
    cumulativeSavingsRupees,
    monthlyKwh,
    region,
  } = recommendation;

  const yearOneMonthlyBenefit = monthlySavingsRupees + monthlyExportEarningsRupees;

  const whatsappMessage = encodeURIComponent(
    [
      "Hi! I just reviewed my solar report from Irradiant Energie.",
      "",
      `${systemSizeKw} kWp system · ~${formatINR(monthlySavingsRupees)}/mo savings · ${breakevenYears}-year breakeven`,
      "",
      "Looking forward to discussing next steps.",
    ].join("\n"),
  );
  const whatsappLink = `https://wa.me/${COMPANY.whatsapp}?text=${whatsappMessage}`;

  return (
    <>
      <HeroAct
        systemSizeKw={systemSizeKw}
        panelCount={panelCount}
        roofAreaSqftRequired={roofAreaSqftRequired}
        monthlyKwh={monthlyKwh}
        region={region}
      />

      <MathAct
        monthlySavingsRupees={monthlySavingsRupees}
        monthlyExportEarningsRupees={monthlyExportEarningsRupees}
        breakevenYears={breakevenYears}
        pmSuryaGharSubsidyRupees={pmSuryaGharSubsidyRupees}
      />

      <FutureAct
        yearOneMonthlyBenefit={yearOneMonthlyBenefit}
        cumulativeSavingsRupees={cumulativeSavingsRupees}
      />

      <ClosingCta whatsappLink={whatsappLink} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* ACT 1 — The system                                                  */
/* ------------------------------------------------------------------ */

type HeroActProps = {
  systemSizeKw: number;
  panelCount: number;
  roofAreaSqftRequired: number;
  monthlyKwh: number;
  region: string;
};

function HeroAct({
  systemSizeKw,
  panelCount,
  roofAreaSqftRequired,
  monthlyKwh,
  region,
}: HeroActProps) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(82,132,45,0.08),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-4xl px-6 pb-20 pt-32 lg:pb-28 lg:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#52842D]/20 bg-[#52842D]/5 px-3 py-1">
            <Sun className="h-3.5 w-3.5 text-[#52842D]" />
            <span className="text-xs font-medium tracking-wide text-[#446F26]">
              Your personalised solar plan
            </span>
          </div>
          <h1 className="mt-5 font-display text-4xl tracking-tight text-[#1d1d1f] sm:text-5xl lg:text-6xl">
            Here&rsquo;s the system{" "}
            <span className="text-[#52842D]">we&rsquo;d build for you.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-[#6F6F6F] sm:text-lg">
            Sized to match your roof, your bill, and the way Karnataka&rsquo;s
            sunlight actually falls — with PM Surya Ghar subsidies factored in.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.85, ease: EASE_OUT_EXPO, delay: 0.15 }}
          className="mt-14 rounded-3xl border border-[#52842D]/15 bg-gradient-to-b from-[#52842D]/5 to-transparent p-8 sm:p-12"
        >
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#52842D] text-white shadow-lg shadow-[#52842D]/30">
              <PanelTop className="h-7 w-7" />
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#446F26]">
              Recommended system
            </p>
            <CountUp
              to={systemSizeKw}
              decimals={1}
              suffix=" kWp"
              className="mt-3 font-display text-6xl font-semibold leading-none text-[#1d1d1f] sm:text-7xl lg:text-8xl"
            />
            <p className="mt-4 max-w-md text-sm text-[#6F6F6F] sm:text-base">
              {panelCount} high-efficiency panels covering ~{roofAreaSqftRequired} sq ft
              of roof — designed for your{" "}
              <span className="font-medium text-[#1d1d1f]">~{monthlyKwh} kWh/month</span>{" "}
              demand in <span className="uppercase tracking-wide">{region}</span>.
            </p>

            <div className="mt-8 grid w-full max-w-md grid-cols-3 gap-3 text-center sm:gap-4">
              <SystemFact label="Panels" value={panelCount.toString()} />
              <SystemFact label="Roof needed" value={`${roofAreaSqftRequired} ft²`} />
              <SystemFact label="Region" value={region.toUpperCase()} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SystemFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[#e5e7eb] bg-white px-2 py-3 sm:px-3 sm:py-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#6F6F6F]">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-[#1d1d1f] sm:text-base">{value}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ACT 2 — The math                                                    */
/* ------------------------------------------------------------------ */

type MathActProps = {
  monthlySavingsRupees: number;
  monthlyExportEarningsRupees: number;
  breakevenYears: number;
  pmSuryaGharSubsidyRupees: number;
};

function MathAct({
  monthlySavingsRupees,
  monthlyExportEarningsRupees,
  breakevenYears,
  pmSuryaGharSubsidyRupees,
}: MathActProps) {
  return (
    <section className="relative bg-[#f5f5f7]">
      <div className="mx-auto max-w-5xl px-6 py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#446F26]">
            Act 2 — the math
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-tight text-[#1d1d1f] sm:text-4xl lg:text-5xl">
            Every month, the system{" "}
            <span className="text-[#52842D]">pays you back two ways.</span>
          </h2>
          <p className="mt-4 text-base text-[#6F6F6F]">
            What you don&rsquo;t draw from BESCOM is money you keep. What you push
            back into the grid is money they pay <em>you</em>.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6">
          <StatBlock
            icon={<IndianRupee className="h-5 w-5" />}
            label="Monthly savings"
            value={monthlySavingsRupees}
            highlight
            delay={0}
          />
          <StatBlock
            icon={<TrendingUp className="h-5 w-5" />}
            label="Export earnings / month"
            value={monthlyExportEarningsRupees}
            delay={0.12}
          />
          <StatBlock
            icon={<Sun className="h-5 w-5" />}
            label="Breakeven"
            value={breakevenYears}
            decimals={1}
            suffix=" yrs"
            isCurrency={false}
            delay={0.24}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.3 }}
          className="mt-8"
        >
          <div className="rounded-2xl border border-[#52842D]/25 bg-gradient-to-br from-[#52842D]/8 to-[#52842D]/3 p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#446F26]">
              Estimated government subsidy
            </p>
            <p className="mt-3 font-display text-4xl text-[#1d1d1f] sm:text-5xl">
              {pmSuryaGharSubsidyRupees > 0
                ? formatINR(pmSuryaGharSubsidyRupees)
                : "Not eligible at this scale"}
            </p>
            <p className="mt-3 max-w-xl text-sm text-[#6F6F6F] sm:text-base">
              {pmSuryaGharSubsidyRupees > 0
                ? "Direct benefit transfer under PM Surya Ghar — paid straight to your bank account after your system is installed and inspected."
                : "Commercial & industrial installs aren't covered by PM Surya Ghar — but you typically save more on the higher tariff slabs."}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

type StatBlockProps = {
  icon: React.ReactNode;
  label: string;
  value: number;
  highlight?: boolean;
  decimals?: number;
  suffix?: string;
  isCurrency?: boolean;
  delay?: number;
};

function StatBlock({
  icon,
  label,
  value,
  highlight = false,
  decimals = 0,
  suffix,
  isCurrency = true,
  delay = 0,
}: StatBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay }}
      className={`rounded-2xl border bg-white p-6 sm:p-7 ${
        highlight
          ? "border-[#52842D]/20 shadow-lg shadow-[#52842D]/10"
          : "border-[#e5e7eb]"
      }`}
    >
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-lg ${
          highlight ? "bg-[#52842D] text-white" : "bg-[#f5f5f7] text-[#446F26]"
        }`}
      >
        {icon}
      </div>
      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6F6F6F]">
        {label}
      </p>
      <CountUp
        to={value}
        decimals={decimals}
        suffix={suffix}
        isCurrency={isCurrency}
        className={`mt-2 font-display text-3xl sm:text-4xl ${
          highlight ? "text-[#52842D]" : "text-[#1d1d1f]"
        }`}
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* ACT 3 — The 15-year future                                          */
/* ------------------------------------------------------------------ */

type FutureActProps = {
  yearOneMonthlyBenefit: number;
  cumulativeSavingsRupees: number;
};

function FutureAct({
  yearOneMonthlyBenefit,
  cumulativeSavingsRupees,
}: FutureActProps) {
  const curve = useMemo(
    () => projectionCurve(yearOneMonthlyBenefit, 15),
    [yearOneMonthlyBenefit],
  );

  return (
    <section className="relative bg-[#1d1d1f] text-white">
      <div className="mx-auto max-w-5xl px-6 py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#86C955]">
            Act 3 — the 15-year future
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl lg:text-5xl">
            And the curve only{" "}
            <span className="text-[#86C955]">bends in your favour.</span>
          </h2>
          <p className="mt-4 text-base text-white/70">
            Tariffs go up roughly 4% a year. Your panels degrade just 0.5% a year.
            Compounded over 15 years, that gap is where the real value lives.
          </p>
        </motion.div>

        <SavingsCurve curve={curve} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.4 }}
          className="mt-10 flex flex-col items-start gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
              Cumulative value, year 15
            </p>
            <p className="mt-2 font-display text-4xl text-white sm:text-5xl">
              {formatINR(cumulativeSavingsRupees, { compact: true })}
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/70">
            <Leaf className="h-4 w-4 text-[#86C955]" />
            That&rsquo;s the cleanest, most reliable yield available to a roof in
            India today.
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* The line chart                                                      */
/* ------------------------------------------------------------------ */

function SavingsCurve({
  curve,
}: {
  curve: Array<{ year: number; cumulative: number }>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  // Chart dimensions in viewBox units; container scales responsively.
  const width = 800;
  const height = 320;
  const padding = { top: 16, right: 24, bottom: 36, left: 12 };

  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  const maxValue = curve[curve.length - 1].cumulative;
  const minYear = curve[0].year;
  const maxYear = curve[curve.length - 1].year;

  const xFor = (year: number) =>
    padding.left + ((year - minYear) / (maxYear - minYear)) * innerW;
  const yFor = (value: number) =>
    padding.top + innerH - (value / maxValue) * innerH;

  const linePath = curve
    .map((p, i) => `${i === 0 ? "M" : "L"} ${xFor(p.year)} ${yFor(p.cumulative)}`)
    .join(" ");

  const areaPath = `${linePath} L ${xFor(maxYear)} ${padding.top + innerH} L ${xFor(minYear)} ${padding.top + innerH} Z`;

  // Marker years
  const markerYears = [5, 10, 15];
  const markers = markerYears
    .map((year) => curve.find((p) => p.year === year))
    .filter((p): p is { year: number; cumulative: number } => p !== undefined);

  return (
    <div ref={ref} className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-6">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-[320px] w-full"
        role="img"
        aria-label="15-year cumulative savings projection"
      >
        <defs>
          <linearGradient id="savings-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#86C955" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#86C955" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Y-axis baseline */}
        <line
          x1={padding.left}
          x2={width - padding.right}
          y1={padding.top + innerH}
          y2={padding.top + innerH}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={1}
        />

        {/* Area under curve */}
        <motion.path
          d={areaPath}
          fill="url(#savings-area)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.6 }}
        />

        {/* Line */}
        <motion.path
          d={linePath}
          fill="none"
          stroke="#86C955"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 2.4, ease: EASE_OUT_EXPO, delay: 0.2 }}
        />

        {/* Markers */}
        {markers.map((m, i) => (
          <motion.g
            key={m.year}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
            transition={{
              duration: 0.5,
              ease: EASE_OUT_EXPO,
              delay: 1.5 + i * 0.18,
            }}
            style={{ transformOrigin: `${xFor(m.year)}px ${yFor(m.cumulative)}px` }}
          >
            <circle
              cx={xFor(m.year)}
              cy={yFor(m.cumulative)}
              r={5}
              fill="#86C955"
              stroke="#1d1d1f"
              strokeWidth={2}
            />
            <text
              x={xFor(m.year)}
              y={yFor(m.cumulative) - 14}
              textAnchor="middle"
              fontSize="12"
              fontWeight="600"
              fill="#fff"
            >
              {formatINR(m.cumulative, { compact: true })}
            </text>
            <text
              x={xFor(m.year)}
              y={padding.top + innerH + 22}
              textAnchor="middle"
              fontSize="11"
              fill="rgba(255,255,255,0.5)"
            >
              Year {m.year}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Closing CTA                                                         */
/* ------------------------------------------------------------------ */

function ClosingCta({ whatsappLink }: { whatsappLink: string }) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-3xl px-6 py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="text-center"
        >
          <h2 className="font-display text-3xl tracking-tight text-[#1d1d1f] sm:text-4xl">
            Ready to make this real?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[#6F6F6F]">
            Continue the conversation on WhatsApp — your numbers are already pre-filled,
            and one of our solar advisors will pick up from here.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <motion.a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={PRESS_HOVER}
              whileTap={PRESS_TAP}
              transition={SPRING_PRESS}
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-[#25D366]/30"
            >
              <MessageCircle className="h-4 w-4" />
              Continue on WhatsApp
            </motion.a>
            <Link
              href="/get-quote"
              className="group inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-6 py-3.5 text-sm font-medium text-[#1d1d1f] transition-colors hover:border-[#52842D]/30 hover:text-[#446F26]"
            >
              Adjust the numbers
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* CountUp — animates a number from 0 to target on first view         */
/* ------------------------------------------------------------------ */

type CountUpProps = {
  to: number;
  decimals?: number;
  suffix?: string;
  isCurrency?: boolean;
  className?: string;
};

function CountUp({
  to,
  decimals = 0,
  suffix,
  isCurrency = false,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: 1600,
    bounce: 0,
  });
  const display = useTransform(springValue, (v) => {
    if (isCurrency) {
      return formatINR(Math.round(v));
    }
    return `${v.toFixed(decimals)}${suffix ?? ""}`;
  });

  const [text, setText] = useState(() =>
    isCurrency ? formatINR(0) : `${(0).toFixed(decimals)}${suffix ?? ""}`,
  );

  useEffect(() => {
    const unsubscribe = display.on("change", (next) => setText(next));
    return unsubscribe;
  }, [display]);

  useEffect(() => {
    if (inView) {
      motionValue.set(to);
    }
  }, [inView, motionValue, to]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
