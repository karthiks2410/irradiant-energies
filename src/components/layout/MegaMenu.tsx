"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";
import {
  solutions,
  solutionTypes,
  getSolarHref,
  type Solution,
  type SolarSegment,
} from "@/lib/solutions-data";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: EASE_OUT_EXPO },
  },
};

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  const [hoveredSolution, setHoveredSolution] = useState<string>("solar");
  const [selectedSegment, setSelectedSegment] = useState<string>("home");

  const currentSolution = solutions.find((s) => s.id === hoveredSolution);

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98, transition: { duration: 0.15 } }}
            transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex min-w-[920px]"
          >
            <div className="w-[280px] bg-gray-50/50 p-5 border-r border-gray-100">
              <p className="text-[10px] uppercase tracking-wider text-[#6F6F6F] font-medium px-3 py-2 mb-1">
                Solutions
              </p>
              <motion.div
                className="space-y-1"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {solutions.map((solution) => (
                  <motion.div key={solution.id} variants={itemVariants}>
                    <SolutionItem
                      solution={solution}
                      isActive={hoveredSolution === solution.id}
                      onHover={() => {
                        setHoveredSolution(solution.id);
                        if (solution.hasSegments) {
                          setSelectedSegment("home");
                        }
                      }}
                      onClose={onClose}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div className="flex-1 p-8 min-h-[400px]">
              <AnimatePresence mode="wait">
                {currentSolution?.hasSegments && currentSolution.segments && (
                  <motion.div
                    key={`${currentSolution?.id}-solar`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
                  >
                    <SolarPanel
                      segments={currentSolution.segments}
                      selectedSegment={selectedSegment}
                      onSegmentChange={setSelectedSegment}
                      onClose={onClose}
                    />
                  </motion.div>
                )}

                {currentSolution?.children && (
                  <motion.div
                    key={`${currentSolution?.id}-children`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
                  >
                    <ChildrenPanel
                      solution={currentSolution}
                      onClose={onClose}
                    />
                  </motion.div>
                )}

                {currentSolution?.href && !currentSolution.children && !currentSolution.hasSegments && (
                  <motion.div
                    key={`${currentSolution?.id}-direct`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
                    className="h-full"
                  >
                    <DirectLinkPanel solution={currentSolution} onClose={onClose} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SolutionItem({
  solution,
  isActive,
  onHover,
  onClose,
}: {
  solution: Solution;
  isActive: boolean;
  onHover: () => void;
  onClose: () => void;
}) {
  const hasSubMenu = solution.hasSegments || solution.children;

  if (solution.href && !hasSubMenu) {
    return (
      <Link
        href={solution.href}
        onClick={onClose}
        onMouseEnter={onHover}
        className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
          isActive ? "bg-white shadow-sm" : "hover:bg-white/60"
        }`}
      >
        <div className={`p-2 rounded-lg ${solution.iconBg}`}>
          <solution.icon className={`w-4 h-4 ${solution.iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[#1d1d1f] truncate">
              {solution.name}
            </span>
            {solution.badge && (
              <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-medium">
                {solution.badge}
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div
      onMouseEnter={onHover}
      className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all cursor-pointer ${
        isActive ? "bg-white shadow-sm" : "hover:bg-white/60"
      }`}
    >
      <div className={`p-2 rounded-lg ${solution.iconBg}`}>
        <solution.icon className={`w-4 h-4 ${solution.iconColor}`} />
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-sm font-medium text-[#1d1d1f] truncate block">
          {solution.name}
        </span>
      </div>
      {hasSubMenu && (
        <ChevronRight className={`w-4 h-4 transition-colors ${isActive ? "text-[#52842D]" : "text-gray-300"}`} />
      )}
    </div>
  );
}

function SolarPanel({
  segments,
  selectedSegment,
  onSegmentChange,
  onClose,
}: {
  segments: SolarSegment[];
  selectedSegment: string;
  onSegmentChange: (id: string) => void;
  onClose: () => void;
}) {
  const currentSegment = segments.find((s) => s.id === selectedSegment);

  return (
    <div>
      <div className="flex gap-1 mb-7 p-1 bg-gray-100 rounded-xl">
        {segments.map((segment) => (
          <button
            key={segment.id}
            onClick={() => onSegmentChange(segment.id)}
            className={`px-4 py-2.5 text-xs font-medium rounded-lg transition-all ${
              selectedSegment === segment.id
                ? "bg-white text-[#1d1d1f] shadow-sm"
                : "text-[#6F6F6F] hover:text-[#1d1d1f]"
            }`}
          >
            {segment.shortName}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedSegment}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
        >
          {currentSegment && (
            <div className="mb-7">
              <div className="flex items-center gap-2 mb-2">
                <currentSegment.icon className="w-4 h-4 text-[#52842D]" />
                <h3 className="text-base font-semibold text-[#1d1d1f]">
                  {currentSegment.name}
                </h3>
              </div>
              <p className="text-sm text-[#6F6F6F]">{currentSegment.description}</p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4">
            {solutionTypes.map((type) => (
              <Link
                key={type.id}
                href={getSolarHref(selectedSegment, type.id)}
                onClick={onClose}
                className="group p-5 rounded-xl border border-gray-100 hover:border-[#52842D]/30 hover:bg-[#52842D]/5 transition-all"
              >
                <div className="p-2.5 rounded-lg bg-gray-100 group-hover:bg-[#52842D]/10 w-fit mb-4 transition-colors">
                  <type.icon className="w-5 h-5 text-[#6F6F6F] group-hover:text-[#52842D] transition-colors" />
                </div>
                <h4 className="text-sm font-medium text-[#1d1d1f] mb-1.5">
                  {type.name}
                </h4>
                <p className="text-xs text-[#6F6F6F] leading-relaxed">
                  {type.description}
                </p>
              </Link>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ChildrenPanel({
  solution,
  onClose,
}: {
  solution: Solution;
  onClose: () => void;
}) {
  return (
    <div>
      <div className="mb-7">
        <div className="flex items-center gap-2 mb-2">
          <solution.icon className={`w-4 h-4 ${solution.iconColor}`} />
          <h3 className="text-base font-semibold text-[#1d1d1f]">
            {solution.shortName || solution.name}
          </h3>
        </div>
        {solution.description && (
          <p className="text-sm text-[#6F6F6F]">{solution.description}</p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {solution.children?.map((child) => (
          <Link
            key={child.id}
            href={child.href}
            onClick={onClose}
            className="group p-5 rounded-xl border border-gray-100 hover:border-[#52842D]/30 hover:bg-[#52842D]/5 transition-all"
          >
            {child.icon && (
              <div className="p-2.5 rounded-lg bg-gray-100 group-hover:bg-[#52842D]/10 w-fit mb-4 transition-colors">
                <child.icon className="w-5 h-5 text-[#6F6F6F] group-hover:text-[#52842D] transition-colors" />
              </div>
            )}
            <h4 className="text-sm font-medium text-[#1d1d1f] mb-1.5">
              {child.name}
            </h4>
            <p className="text-xs text-[#6F6F6F] leading-relaxed">
              {child.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function DirectLinkPanel({
  solution,
  onClose,
}: {
  solution: Solution;
  onClose: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className={`p-4 rounded-2xl ${solution.iconBg} mb-4`}>
        <solution.icon className={`w-8 h-8 ${solution.iconColor}`} />
      </div>
      <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">
        {solution.shortName || solution.name}
      </h3>
      {solution.description && (
        <p className="text-sm text-[#6F6F6F] mb-4 max-w-xs">
          {solution.description}
        </p>
      )}
      {solution.badge && (
        <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-medium mb-4">
          {solution.badge}
        </span>
      )}
      {solution.href && (
        <Link
          href={solution.href}
          onClick={onClose}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#52842D] text-white rounded-full text-sm font-medium hover:bg-[#446F26] transition-colors"
        >
          Learn More
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}
