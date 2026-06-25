"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  BadgeCheck,
  Building2,
  Factory,
  FileCheck,
  Home,
  ShieldCheck,
  Sun,
  Wrench,
} from "lucide-react";
import { BusinessHoursBadge } from "@/components/ui/BusinessHoursBadge";
import { WhatsAppInlineButton } from "@/components/ui/WhatsAppInlineButton";
import {
  EASE_OUT_EXPO,
  SPRING_PRESS,
  PRESS_HOVER,
  PRESS_TAP,
} from "@/lib/motion";
const HEADLINE_WORDS = ["Power", "Your", "Future", "With", "Solar", "Energy"];

type AudienceTile = {
  label: string;
  href: string;
  Icon: typeof Home;
  sub: string;
};

const AUDIENCE_TILES: AudienceTile[] = [
  {
    label: "Home",
    href: "/solutions/solar/home",
    Icon: Home,
    sub: "Rooftop for your house",
  },
  {
    label: "Society",
    href: "/solutions/solar/housing-society",
    Icon: Building2,
    sub: "Common-area & towers",
  },
  {
    label: "Commercial",
    href: "/solutions/solar/commercial",
    Icon: Factory,
    sub: "Factories & businesses",
  },
];

type TrustPill = {
  label: string;
  Icon: typeof BadgeCheck;
};

const TRUST_PILLS: TrustPill[] = [
  { label: "MNRE-empanelled", Icon: BadgeCheck },
  { label: "Tier-1 panels", Icon: ShieldCheck },
  { label: "25-yr warranty", Icon: Sun },
  { label: "5-yr free maintenance", Icon: Wrench },
  { label: "Subsidy handled by us", Icon: FileCheck },
];

function AudiencePicker({ disableMotion }: { disableMotion: boolean }) {
  return (
    <div className="grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
      {AUDIENCE_TILES.map(({ label, href, Icon, sub }, i) => {
        const tileInitial = disableMotion
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 16 };
        return (
          <motion.div
            key={label}
            initial={tileInitial}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: 0.6,
              delay: 1.0 + i * 0.08,
              ease: EASE_OUT_EXPO,
            }}
          >
            <motion.div
              whileHover={PRESS_HOVER}
              whileTap={PRESS_TAP}
              transition={SPRING_PRESS}
            >
              <Link
                href={href}
                className="group flex items-center gap-3 rounded-2xl border bg-white p-4 transition-colors hover:border-[#52842D] sm:flex-col sm:items-center sm:gap-2 sm:p-5 sm:text-center"
                style={{ borderColor: "#e5e7eb" }}
              >
                <span
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors group-hover:bg-[#52842D] group-hover:text-white sm:h-11 sm:w-11"
                  style={{ backgroundColor: "#f5f5f7", color: "#52842D" }}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="flex min-w-0 flex-1 flex-col text-left sm:mt-1 sm:items-center sm:text-center">
                  <span
                    className="text-[15px] font-semibold sm:text-base"
                    style={{ color: "#1d1d1f" }}
                  >
                    {label}
                  </span>
                  <span
                    className="mt-0.5 text-xs sm:text-[13px]"
                    style={{ color: "#6F6F6F" }}
                  >
                    {sub}
                  </span>
                </span>
              </Link>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

function TrustStrip({ disableMotion }: { disableMotion: boolean }) {
  const initial = disableMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 };
  return (
    <motion.ul
      initial={initial}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, delay: 1.3, ease: EASE_OUT_EXPO }}
      className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:gap-x-6"
      aria-label="Trust signals"
    >
      {TRUST_PILLS.map(({ label, Icon }, i) => (
        <li
          key={label}
          className="flex items-center gap-1.5 text-sm"
          style={{ color: "#1d1d1f" }}
        >
          <Icon
            className="h-4 w-4 shrink-0"
            style={{ color: "#52842D" }}
            aria-hidden
          />
          <span>{label}</span>
          {i < TRUST_PILLS.length - 1 && (
            <span
              aria-hidden
              className="ml-3 hidden sm:inline"
              style={{ color: "#d4d4d8" }}
            >
              ·
            </span>
          )}
        </li>
      ))}
    </motion.ul>
  );
}

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const disableMotion = !!prefersReducedMotion;
  const wordInitial = disableMotion
    ? { y: 0, opacity: 1 }
    : { y: 30, opacity: 0 };
  const subInitial = disableMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 20 };

  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div
        className="absolute z-0"
        style={{
          top: "260px",
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <Image
          src="/assets/solar-panel.jpg"
          alt="Solar panels on rooftop"
          fill
          priority
          className="object-cover"
          style={{ opacity: 0.85 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/70 to-white/95" />
      </div>

      <div
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 text-center"
        style={{
          paddingTop: "calc(6rem + 20px)",
          paddingBottom: "5rem",
        }}
      >
        <h1
          className="max-w-7xl font-[family-name:var(--font-display)] bg-clip-text text-transparent"
          style={{
            fontSize: "clamp(2.75rem, 7vw, 5.5rem)",
            lineHeight: 1.04,
            letterSpacing: "-0.035em",
            fontWeight: 800,
            backgroundImage:
              "linear-gradient(110deg, #1d1d1f 0%, #1d1d1f 22%, #2d4a1a 55%, #3f6a25 78%, #52842D 100%)",
          }}
        >
          {HEADLINE_WORDS.map((word, i) => (
            <motion.span
              key={`word-${i}`}
              initial={wordInitial}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: i * 0.06,
                ease: EASE_OUT_EXPO,
              }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={subInitial}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: EASE_OUT_EXPO }}
          className="mt-7 max-w-2xl text-base leading-relaxed sm:text-lg"
          style={{ color: "#1d1d1f" }}
        >
          India&apos;s complete solar ecosystem — from rooftop to revenue. Premium
          panels, smart energy management, and peer-to-peer trading.
        </motion.p>

        <div className="mt-10 w-full">
          <AudiencePicker disableMotion={disableMotion} />
        </div>

        <motion.div
          initial={disableMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 1.25, ease: EASE_OUT_EXPO }}
          className="mt-5 flex flex-col items-center gap-2 text-sm sm:flex-row sm:gap-3"
          style={{ color: "#6F6F6F" }}
        >
          <span>Prefer to chat?</span>
          <WhatsAppInlineButton size="default" />
          <BusinessHoursBadge />
        </motion.div>

        <div className="mt-10 w-full">
          <TrustStrip disableMotion={disableMotion} />
        </div>
      </div>
    </section>
  );
}
