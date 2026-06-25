"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";
import { EASE_OUT_EXPO, SPRING_PRESS, PRESS_HOVER, PRESS_TAP } from "@/lib/motion";

export function AboutCTA() {
  const prefersReducedMotion = useReducedMotion();

  const whatsappHref = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
    "Hi Irradiant Energie — I'd like to talk about going solar."
  )}`;

  return (
    <section className="relative overflow-hidden bg-[#f5f5f7] py-24 md:py-32">
      {/* Time-based ambient pulses — not scroll-driven. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          aria-hidden
          animate={
            prefersReducedMotion
              ? undefined
              : { scale: [1, 1.25, 1], opacity: [0.04, 0.09, 0.04] }
          }
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-1/4 top-1/4 h-1/2 w-1/2 rounded-full bg-[#52842D]/20 blur-3xl"
        />
        <motion.div
          aria-hidden
          animate={
            prefersReducedMotion
              ? undefined
              : { scale: [1.2, 1, 1.2], opacity: [0.03, 0.07, 0.03] }
          }
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-1/4 bottom-1/4 h-1/2 w-1/2 rounded-full bg-[#52842D]/15 blur-3xl"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        >
          <h2 className="font-display text-3xl font-bold tracking-tight text-[#1d1d1f] sm:text-4xl md:text-5xl">
            Let&apos;s power your space.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-[#6F6F6F] sm:text-lg">
            Free site visit anywhere in India. Transparent quote in rupees, no
            pressure. We&apos;ll design the right system for your roof and your bill.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.div
              whileHover={PRESS_HOVER}
              whileTap={PRESS_TAP}
              transition={SPRING_PRESS}
            >
              <Link href="/get-quote">
                <Button className="rounded-full bg-[#52842D] px-8 py-6 text-base font-semibold text-white shadow-lg shadow-[#52842D]/25 hover:bg-[#446F26]">
                  Get a free quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-[#446F26] transition-colors hover:text-[#52842D]"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
