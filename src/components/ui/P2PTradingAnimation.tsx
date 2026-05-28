"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Home } from "lucide-react";

type House = {
  id: number;
  x: number; // % within card
  y: number; // % within card
  producer: boolean;
  label: string;
};

type Route = {
  from: number;
  to: number;
  amount: number;
};

const HOUSES: House[] = [
  { id: 1, x: 18, y: 38, producer: true, label: "A" },
  { id: 2, x: 42, y: 60, producer: false, label: "B" },
  { id: 3, x: 64, y: 36, producer: true, label: "C" },
  { id: 4, x: 84, y: 62, producer: false, label: "D" },
];

const ROUTES: Route[] = [
  { from: 1, to: 2, amount: 5.3 },
  { from: 3, to: 4, amount: 8.0 },
  { from: 1, to: 4, amount: 3.2 },
];

const CYCLE_MS = 4000;

export function P2PTradingAnimation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ROUTES.length);
    }, CYCLE_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [prefersReducedMotion]);

  const activeRoute = ROUTES[activeIndex];
  const fromHouse = HOUSES.find((h) => h.id === activeRoute.from)!;
  const toHouse = HOUSES.find((h) => h.id === activeRoute.to)!;
  const midX = (fromHouse.x + toHouse.x) / 2;
  const midY = (fromHouse.y + toHouse.y) / 2;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src="/p2p-trading.jpg"
        alt="Neighborhood with rooftop solar"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/20 to-slate-900/70" />

      {/* SVG overlay for trading lines + particles */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="p2p-flow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        <motion.line
          key={`line-${activeIndex}`}
          x1={fromHouse.x}
          y1={fromHouse.y}
          x2={toHouse.x}
          y2={toHouse.y}
          stroke="url(#p2p-flow)"
          strokeWidth={0.6}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {!prefersReducedMotion &&
          [0, 1, 2, 3].map((i) => (
            <motion.circle
              key={`particle-${activeIndex}-${i}`}
              r={0.9}
              fill="#fde047"
              initial={{ cx: fromHouse.x, cy: fromHouse.y, opacity: 0 }}
              animate={{
                cx: [fromHouse.x, toHouse.x],
                cy: [fromHouse.y, toHouse.y],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 1.6,
                delay: 0.3 + i * 0.35,
                repeat: Infinity,
                repeatDelay: 0.4,
                ease: "easeInOut",
                times: [0, 0.1, 0.9, 1],
              }}
            />
          ))}
      </svg>

      {/* Houses */}
      {HOUSES.map((house, i) => (
        <motion.div
          key={house.id}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${house.x}%`, top: `${house.y}%` }}
          initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            damping: 18,
            stiffness: 280,
            delay: i * 0.12,
          }}
        >
          <div className="relative">
            {house.producer && !prefersReducedMotion && (
              <motion.div
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-emerald-400/60 blur-md"
                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            <div
              className={`relative flex h-7 w-7 items-center justify-center rounded-full border-2 shadow-lg sm:h-8 sm:w-8 ${
                house.producer
                  ? "border-emerald-200 bg-emerald-500"
                  : "border-orange-200 bg-orange-500"
              }`}
            >
              <Home className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" strokeWidth={2.4} />
            </div>
            <div className="absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-white/95 px-1.5 py-0.5 text-[10px] font-semibold text-slate-800 shadow-sm backdrop-blur-sm sm:text-xs">
              {house.label}
            </div>
          </div>
        </motion.div>
      ))}

      {/* Active trade badge */}
      <motion.div
        key={`badge-${activeIndex}`}
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${midX}%`, top: `${midY}%` }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
      >
        <div className="rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
          {activeRoute.amount} kWh →
        </div>
      </motion.div>

      {/* Title pill */}
      <div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-md backdrop-blur-sm">
        Live: P2P Energy Trade
      </div>
    </div>
  );
}
