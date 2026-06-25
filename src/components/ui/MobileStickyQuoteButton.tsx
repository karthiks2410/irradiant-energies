"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { EASE_OUT_EXPO, PRESS_HOVER, PRESS_TAP, SPRING_PRESS } from "@/lib/motion";

/**
 * Mobile-only sticky "Get Quote" CTA. Always reachable in the user's
 * thumb-zone on small screens, where the header CTA scrolls out of view.
 *
 * Hidden on desktop because the fixed Header already keeps Get Quote
 * permanently visible. Hidden on /get-quote itself (it would be silly
 * to ask the user to "Get Quote" while they're literally on the quote
 * page) and on /get-quote/result (they've already submitted).
 *
 * Anchored to the bottom-LEFT on mobile, on purpose:
 *   - The WhatsAppButton owns bottom-right (bottom-6 right-6, h-14).
 *   - Inline CTAs ("Calculate Your Subsidy", "Get a free quote", form
 *     submit buttons) are centered or right-aligned in their containers
 *     and on a 390px viewport their tap-targets reach within ~6px of the
 *     right edge — that's why a right-anchored sticky pill clipped them
 *     ("Calculate Your S…idy"). Anchoring left keeps the pill in the
 *     thumb zone without ever sitting on top of inline page CTAs.
 *   - bottom uses env(safe-area-inset-bottom) so the pill clears the
 *     iOS home indicator on notched devices.
 */
export function MobileStickyQuoteButton() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  // Don't show the button on the page it would link to.
  const onQuoteRoute = pathname.startsWith("/get-quote");
  if (onQuoteRoute) return null;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.9 }}
      animate={
        reduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: 0.4, ease: EASE_OUT_EXPO, delay: 0.6 },
            }
      }
      // Mobile only — desktop has the header CTA always visible.
      // Bottom-LEFT so it never sits on inline page CTAs that hug the right
      // edge on a 390px viewport. WhatsApp keeps bottom-right.
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)" }}
      className="lg:hidden fixed left-4 z-40"
    >
      <motion.div
        whileHover={reduceMotion ? undefined : PRESS_HOVER}
        whileTap={reduceMotion ? undefined : PRESS_TAP}
        transition={SPRING_PRESS}
      >
        <Link
          href="/get-quote"
          aria-label="Get a free solar quote"
          className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-[#52842D] hover:bg-[#446F26] text-white text-sm font-medium shadow-xl shadow-[#52842D]/30 hover:shadow-2xl hover:shadow-[#52842D]/40 transition-shadow"
        >
          Get Quote
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </motion.div>
  );
}
