import Image from "next/image";
import { Home } from "lucide-react";

type House = {
  id: number;
  x: number;
  y: number;
  producer: boolean;
  label: string;
};

const HOUSES: House[] = [
  { id: 1, x: 18, y: 38, producer: true, label: "A" },
  { id: 2, x: 42, y: 60, producer: false, label: "B" },
  { id: 3, x: 64, y: 36, producer: true, label: "C" },
  { id: 4, x: 84, y: 62, producer: false, label: "D" },
];

// Static "hero" trade — A → B (producer to consumer)
const FROM = HOUSES[0];
const TO = HOUSES[1];
const MID_X = (FROM.x + TO.x) / 2;
const MID_Y = (FROM.y + TO.y) / 2;
const TRADE_AMOUNT = 5.3;

export function P2PTradingAnimation() {
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

        <line
          x1={FROM.x}
          y1={FROM.y}
          x2={TO.x}
          y2={TO.y}
          stroke="url(#p2p-flow)"
          strokeWidth={0.6}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {HOUSES.map((house) => (
        <div
          key={house.id}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${house.x}%`, top: `${house.y}%` }}
        >
          <div className="relative">
            {house.producer && (
              <div
                aria-hidden="true"
                className="absolute inset-0 scale-150 rounded-full bg-emerald-400/50 blur-md"
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
        </div>
      ))}

      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${MID_X}%`, top: `${MID_Y}%` }}
      >
        <div className="rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
          {TRADE_AMOUNT} kWh →
        </div>
      </div>
    </div>
  );
}
