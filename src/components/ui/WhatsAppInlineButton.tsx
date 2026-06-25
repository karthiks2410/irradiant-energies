"use client";

import { motion } from "framer-motion";
import { COMPANY } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { PRESS_HOVER, PRESS_TAP, SPRING_PRESS } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Inline WhatsApp CTA — pairs next to "Get Quote" primary buttons site-wide
 * so Indian buyers (who overwhelmingly convert on WhatsApp) get a one-tap
 * channel without having to find the floating bubble.
 *
 * Separate from `WhatsAppButton` (the always-on floating bubble at
 * bottom-right, kept untouched) — that's the persistent channel, this is
 * the contextual partner to every quote CTA.
 *
 * Visual: outline variant in brand-green so it sits beside the solid green
 * "Get Quote" without competing. Sizing tokens mirror the heights of the
 * adjacent solid CTAs in `HeroSection`, `CTASection`, and
 * `SegmentLandingPage` so the pair reads as one unit.
 */

const SIZE_CLASSES: Record<NonNullable<WhatsAppInlineButtonProps["size"]>, string> = {
  // Matches the segment landing "Get a free quote" (`px-7 py-6 text-sm`).
  default: "rounded-full px-7 py-6 text-sm",
  // Matches the homepage hero CTA (`px-14 py-6 text-base`). We pull the
  // horizontal padding in slightly so the two pills wrap nicely on mobile.
  lg: "rounded-full px-10 py-6 text-base",
  // Matches the CTASection form submit (`w-full ... py-6 rounded-xl`).
  block: "w-full py-6 rounded-xl text-sm",
};

const APPEARANCE_CLASSES: Record<NonNullable<WhatsAppInlineButtonProps["appearance"]>, string> = {
  // Default: outline brand-green on white — pairs with solid green primary CTAs.
  onLight:
    "border-[#52842D] bg-white text-[#52842D] hover:bg-[#52842D]/5 hover:text-[#446F26] focus-visible:ring-[#52842D]/20",
  // Inverse: outline white on a brand-green band — pairs with white primary CTAs.
  onGreen:
    "border-white/70 bg-transparent text-white hover:bg-white/10 hover:text-white focus-visible:ring-white/30",
};

export interface WhatsAppInlineButtonProps {
  /** Prefilled WhatsApp message. Encoded automatically. */
  message?: string;
  /** Visual size — match the adjacent primary CTA's variant. */
  size?: "default" | "lg" | "block";
  /** Light (default) for white/neutral backgrounds, onGreen for the brand-green CTA bands. */
  appearance?: "onLight" | "onGreen";
  /** Optional override / extension classes. */
  className?: string;
  /** Override label. Defaults to "WhatsApp us". */
  label?: string;
}

const DEFAULT_MESSAGE = "Hi! I'd like a free solar quote for my home.";

export function WhatsAppInlineButton({
  message = DEFAULT_MESSAGE,
  size = "default",
  appearance = "onLight",
  className,
  label = "WhatsApp us",
}: WhatsAppInlineButtonProps) {
  const href = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <motion.div
      whileHover={PRESS_HOVER}
      whileTap={PRESS_TAP}
      transition={SPRING_PRESS}
      className={size === "block" ? "block" : "inline-block"}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className={size === "block" ? "block" : "inline-block"}
      >
        <Button
          type="button"
          variant="outline"
          className={cn(
            SIZE_CLASSES[size],
            "gap-2",
            APPEARANCE_CLASSES[appearance],
            className,
          )}
        >
          <WhatsAppGlyph className="w-4 h-4" />
          {label}
        </Button>
      </a>
    </motion.div>
  );
}

/**
 * WhatsApp brand glyph. Inlined here (vs. lucide `MessageCircle`) because
 * the bubble-with-handset is the recognized brand mark — users scan for it,
 * not a generic chat icon. Pulled from the existing floating-button SVG.
 */
function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
