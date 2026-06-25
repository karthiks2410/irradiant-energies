"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Award,
  BadgeCheck,
  ShieldCheck,
  Star,
} from "lucide-react";
import { EASE_OUT_EXPO } from "@/lib/motion";

// ---------------------------------------------------------------------------
// 1. Installations counter strip
// ---------------------------------------------------------------------------

// TODO: replace with real installation counts
const counters = [
  {
    target: 1200,
    suffix: "+",
    label: "Rooftops powered",
    format: (n: number) => n.toLocaleString("en-IN"),
  },
  {
    target: 4.2,
    suffix: " MW",
    label: "Total installed capacity",
    format: (n: number) => n.toFixed(1),
  },
  {
    target: 18,
    suffix: "",
    label: "Cities served",
    format: (n: number) => Math.round(n).toString(),
  },
];

function CountUp({
  target,
  format,
  suffix,
  duration = 1600,
}: {
  target: number;
  format: (n: number) => string;
  suffix: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (reduceMotion) {
      setValue(target);
      return;
    }

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // ease-out-expo for a confident finish
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setValue(target * eased);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduceMotion, target, duration]);

  return (
    <span ref={ref}>
      {format(value)}
      {suffix}
    </span>
  );
}

function CountersStrip() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
      className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 max-w-5xl mx-auto"
    >
      {counters.map((c) => (
        <div
          key={c.label}
          className="text-center sm:text-left sm:border-l sm:border-[#e5e7eb] sm:pl-6 first:sm:border-l-0 first:sm:pl-0"
        >
          <p className="font-display text-5xl md:text-6xl font-bold tracking-tight text-[#1d1d1f] leading-none tabular-nums">
            <CountUp target={c.target} format={c.format} suffix={c.suffix} />
          </p>
          <p className="mt-3 text-sm text-[#6F6F6F] uppercase tracking-wider font-medium">
            {c.label}
          </p>
        </div>
      ))}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// 2. Testimonial marquee
// ---------------------------------------------------------------------------

// TODO: replace with real customer testimonials (with consent)
const testimonials = [
  {
    name: "Ramesh Iyer",
    city: "Bangalore",
    system: "5.4 kWp · ₹52,000/yr saved",
    quote:
      "6 months in, my bill went from ₹4,800 to ₹400. Team handled all the BESCOM paperwork too.",
  },
  {
    name: "Priya Krishnan",
    city: "Chennai",
    system: "3.2 kWp · ₹34,000/yr saved",
    quote:
      "Installation took 3 days, no mess. EMI was approved the same evening I asked.",
  },
  {
    name: "Arjun Reddy",
    city: "Hyderabad",
    system: "6.6 kWp · ₹61,000/yr saved",
    quote:
      "Switched our villa to solar last summer. App shows real-time generation — kids check it more than I do.",
  },
  {
    name: "Lakshmi Narayanan",
    city: "Coimbatore",
    system: "4.0 kWp · ₹41,000/yr saved",
    quote:
      "Honest pricing, no hidden charges. They even came back twice for free panel cleaning after the monsoon.",
  },
  {
    name: "Vikram Shetty",
    city: "Mysuru",
    system: "5.0 kWp · ₹48,000/yr saved",
    quote:
      "Subsidy hit my account in 8 weeks exactly as promised. Best decision for our family home in 10 years.",
  },
  {
    name: "Sneha Deshpande",
    city: "Pune",
    system: "4.2 kWp · ₹38,000/yr saved",
    quote:
      "Bought my battery backup add-on a year later — same team, same price, zero confusion. Highly recommend.",
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

function TestimonialCard({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <article
      className="flex-shrink-0 w-[320px] md:w-[380px] bg-white rounded-2xl border border-[#e5e7eb] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
      aria-label={`Testimonial from ${t.name}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="flex-shrink-0 w-11 h-11 rounded-full bg-[#52842D] text-white font-display font-semibold text-base flex items-center justify-center select-none"
          aria-hidden="true"
        >
          {getInitials(t.name)}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#1d1d1f] leading-tight truncate">
            {t.name}
          </p>
          <p className="text-xs text-[#6F6F6F] leading-tight mt-0.5">
            {t.city}
          </p>
        </div>
      </div>

      <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#52842D]/10 text-[#52842D] text-xs font-medium mb-4">
        {t.system}
      </div>

      <p className="text-sm text-[#1d1d1f] leading-relaxed mb-4">
        &ldquo;{t.quote}&rdquo;
      </p>

      <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="w-3.5 h-3.5 fill-[#52842D] text-[#52842D]"
            aria-hidden="true"
          />
        ))}
      </div>
    </article>
  );
}

function MarqueeRow({
  items,
  direction = "left",
  durationSec = 50,
  pause,
}: {
  items: typeof testimonials;
  direction?: "left" | "right";
  durationSec?: number;
  pause: boolean;
}) {
  // Duplicate the list so we can translate by -50% for a seamless loop.
  const doubled = [...items, ...items];
  const distance = direction === "left" ? "-50%" : "0%";
  const start = direction === "left" ? "0%" : "-50%";

  return (
    <div className="group relative overflow-hidden">
      {/* Edge fades — keep canvas clean, no dark band. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-[#f5f5f7] to-transparent z-10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-[#f5f5f7] to-transparent z-10"
      />

      <motion.div
        className="flex gap-4 md:gap-6 w-max group-hover:[animation-play-state:paused]"
        initial={{ x: start }}
        animate={pause ? { x: start } : { x: [start, distance] }}
        transition={
          pause
            ? { duration: 0 }
            : {
                duration: durationSec,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
              }
        }
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} t={t} />
        ))}
      </motion.div>
    </div>
  );
}

function TestimonialMarquee() {
  const reduceMotion = useReducedMotion();
  const rowA = testimonials;
  const rowB = [...testimonials].reverse();

  return (
    <div className="mt-20 space-y-4 md:space-y-6">
      <MarqueeRow
        items={rowA}
        direction="left"
        durationSec={55}
        pause={!!reduceMotion}
      />
      <MarqueeRow
        items={rowB}
        direction="right"
        durationSec={65}
        pause={!!reduceMotion}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// 3. Certifications logo row
// ---------------------------------------------------------------------------

const certifications = [
  { icon: ShieldCheck, label: "MNRE-empanelled" },
  { icon: BadgeCheck, label: "BIS-certified" },
  { icon: Award, label: "IEC 61215" },
  { icon: BadgeCheck, label: "ALMM-listed" },
  { icon: ShieldCheck, label: "ISO 9001:2015" },
  { icon: Award, label: "25-yr panel warranty" },
];

function CertificationsRow() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.ul
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
      className="mt-20 border-t border-[#e5e7eb] pt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-5"
    >
      {certifications.map(({ icon: Icon, label }) => (
        <li key={label} className="flex items-center gap-3 min-w-0">
          <span
            className="flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#52842D]/10"
            aria-hidden="true"
          >
            <Icon className="w-4 h-4 text-[#52842D]" />
          </span>
          <p className="text-sm font-semibold text-[#1d1d1f] leading-snug truncate">
            {label}
          </p>
        </li>
      ))}
    </motion.ul>
  );
}

// ---------------------------------------------------------------------------
// Section wrapper
// ---------------------------------------------------------------------------

export function SocialProofSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="social-proof"
      aria-labelledby="social-proof-heading"
      className="relative bg-[#f5f5f7] py-24 md:py-28"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
          className="text-center mb-14 md:mb-16"
        >
          <p className="text-[#52842D] text-sm uppercase tracking-wider font-medium mb-3">
            Trusted Across South India
          </p>
          <h2
            id="social-proof-heading"
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#1d1d1f] leading-[1.05]"
          >
            Real homes. Real savings.
          </h2>
          <p className="mt-5 text-lg text-[#6F6F6F] max-w-2xl mx-auto leading-relaxed">
            From Bangalore terraces to Coimbatore villas — here&apos;s what
            families are saying after switching to Irradiant.
          </p>
        </motion.div>

        <CountersStrip />

        <TestimonialMarquee />

        <CertificationsRow />
      </div>
    </section>
  );
}
