"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";
import {
  primarySolarSegments,
  secondarySolarSegments,
  otherOfferings,
  type Solution,
} from "@/lib/solutions-data";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  /** Which menu to render — they share styling but show different content. */
  kind: "solar" | "other";
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: EASE_OUT_EXPO } },
};

export function MegaMenu({ isOpen, onClose, kind }: MegaMenuProps) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98, transition: { duration: 0.15 } }}
            transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
          >
            {kind === "solar" ? (
              <SolarMenu onClose={onClose} />
            ) : (
              <OtherOfferingsMenu onClose={onClose} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------------------------- Solar Solutions ---------------------------------- */

function SolarMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="w-[640px] max-w-[min(640px,calc(100vw-32px))] p-7">
      <p className="text-[10px] uppercase tracking-wider text-[#6F6F6F] font-medium mb-4">
        Solar Solutions
      </p>

      <motion.div
        className="grid grid-cols-3 gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {primarySolarSegments.map((segment) => (
          <motion.div key={segment.id} variants={itemVariants}>
            <Link
              href={segment.href ?? "#"}
              onClick={onClose}
              className="group block h-full p-5 rounded-xl border border-gray-100 hover:border-[#52842D]/30 hover:bg-[#52842D]/5 transition-all"
            >
              <div className="p-2.5 rounded-lg bg-gray-100 group-hover:bg-[#52842D]/10 w-fit mb-4 transition-colors">
                <segment.icon className="w-5 h-5 text-[#6F6F6F] group-hover:text-[#52842D] transition-colors" />
              </div>
              <h4 className="text-sm font-semibold text-[#1d1d1f] mb-1.5">
                {segment.name}
              </h4>
              <p className="text-xs text-[#6F6F6F] leading-relaxed mb-3">
                {segment.description}
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-[#52842D] opacity-0 group-hover:opacity-100 transition-opacity">
                Explore
                <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Secondary row — Roof Rental, Utility, Industrial. De-emphasized. */}
      {secondarySolarSegments.length > 0 && (
        <div className="mt-5 pt-4 border-t border-gray-100">
          <p className="text-[10px] uppercase tracking-wider text-[#6F6F6F] mb-2">
            Also available
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {secondarySolarSegments.map((segment) => (
              <Link
                key={segment.id}
                href={`/solutions/solar/${segment.id}/on-grid`}
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-xs text-[#6F6F6F] hover:text-[#52842D] transition-colors"
              >
                <segment.icon className="w-3.5 h-3.5" />
                {segment.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* --------------------------------- Other Offerings --------------------------------- */

function OtherOfferingsMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="w-[420px] max-w-[min(420px,calc(100vw-32px))] p-5">
      <p className="text-[10px] uppercase tracking-wider text-[#6F6F6F] font-medium mb-3 px-2">
        Other Offerings
      </p>
      <motion.div
        className="space-y-1"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {otherOfferings.map((offering) => (
          <motion.div key={offering.id} variants={itemVariants}>
            <OfferingItem solution={offering} onClose={onClose} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function OfferingItem({
  solution,
  onClose,
}: {
  solution: Solution;
  onClose: () => void;
}) {
  // Direct-link offering (P2P, VPP).
  if (solution.href && !solution.children) {
    return (
      <Link
        href={solution.href}
        onClick={onClose}
        className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors group"
      >
        <div className={`p-2 rounded-lg ${solution.iconBg}`}>
          <solution.icon className={`w-4 h-4 ${solution.iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[#1d1d1f]">
              {solution.name}
            </span>
            {solution.badge && (
              <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-medium">
                {solution.badge}
              </span>
            )}
          </div>
          {solution.description && (
            <p className="text-xs text-[#6F6F6F] mt-0.5">{solution.description}</p>
          )}
        </div>
        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#52842D] transition-colors" />
      </Link>
    );
  }

  // Offering with children (ESS, EV Charging) — flatten the children inline.
  return (
    <div className="px-3 py-2.5">
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-lg ${solution.iconBg}`}>
          <solution.icon className={`w-4 h-4 ${solution.iconColor}`} />
        </div>
        <span className="text-sm font-medium text-[#1d1d1f]">{solution.name}</span>
      </div>
      <div className="ml-11 space-y-0.5">
        {solution.children?.map((child) => (
          <Link
            key={child.id}
            href={child.href}
            onClick={onClose}
            className="block px-2 py-1.5 rounded-md text-xs text-[#6F6F6F] hover:text-[#1d1d1f] hover:bg-gray-50 transition-colors"
          >
            {child.name}
            <span className="text-[#9CA3AF] ml-1.5">— {child.description}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
