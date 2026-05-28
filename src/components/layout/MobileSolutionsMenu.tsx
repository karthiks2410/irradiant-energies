"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  solutions,
  solutionTypes,
  getSolarHref,
  type Solution,
  type SolarSegment,
} from "@/lib/solutions-data";

interface MobileSolutionsMenuProps {
  onLinkClick: () => void;
}

export function MobileSolutionsMenu({ onLinkClick }: MobileSolutionsMenuProps) {
  const [expandedSolution, setExpandedSolution] = useState<string | null>(null);
  const [expandedSegment, setExpandedSegment] = useState<string | null>(null);

  const toggleSolution = (id: string) => {
    setExpandedSolution(expandedSolution === id ? null : id);
    setExpandedSegment(null);
  };

  const toggleSegment = (id: string) => {
    setExpandedSegment(expandedSegment === id ? null : id);
  };

  return (
    <div className="border-t border-gray-100 pt-4">
      <p className="text-xs uppercase tracking-wider text-[#6F6F6F] mb-3 px-1">
        Solutions
      </p>
      <div className="space-y-1">
        {solutions.map((solution) => (
          <SolutionAccordion
            key={solution.id}
            solution={solution}
            isExpanded={expandedSolution === solution.id}
            onToggle={() => toggleSolution(solution.id)}
            expandedSegment={expandedSegment}
            onSegmentToggle={toggleSegment}
            onLinkClick={onLinkClick}
          />
        ))}
      </div>
    </div>
  );
}

function SolutionAccordion({
  solution,
  isExpanded,
  onToggle,
  expandedSegment,
  onSegmentToggle,
  onLinkClick,
}: {
  solution: Solution;
  isExpanded: boolean;
  onToggle: () => void;
  expandedSegment: string | null;
  onSegmentToggle: (id: string) => void;
  onLinkClick: () => void;
}) {
  const hasChildren = solution.hasSegments || solution.children;

  if (solution.href && !hasChildren) {
    return (
      <Link
        href={solution.href}
        onClick={onLinkClick}
        className="flex items-center gap-3 py-3 px-1"
      >
        <div className={`p-2 rounded-lg ${solution.iconBg}`}>
          <solution.icon className={`w-4 h-4 ${solution.iconColor}`} />
        </div>
        <span className="text-sm font-medium text-[#1d1d1f] flex-1">
          {solution.name}
        </span>
        {solution.badge && (
          <span className="text-[9px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
            {solution.badge}
          </span>
        )}
      </Link>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={`mobile-solution-${solution.id}`}
        className="flex items-center gap-3 py-3 px-1 w-full"
      >
        <div className={`p-2 rounded-lg ${solution.iconBg}`}>
          <solution.icon className={`w-4 h-4 ${solution.iconColor}`} />
        </div>
        <span className="text-sm font-medium text-[#1d1d1f] flex-1 text-left">
          {solution.name}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[#6F6F6F] transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Expanded Content */}
      <div
        id={`mobile-solution-${solution.id}`}
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pl-6 pb-2 space-y-1">
          {/* Solar Segments */}
          {solution.hasSegments && solution.segments && (
            <>
              {solution.segments.map((segment) => (
                <SegmentAccordion
                  key={segment.id}
                  segment={segment}
                  isExpanded={expandedSegment === segment.id}
                  onToggle={() => onSegmentToggle(segment.id)}
                  onLinkClick={onLinkClick}
                />
              ))}
            </>
          )}

          {/* Direct Children (ESS, EV Charging) */}
          {solution.children && (
            <>
              {solution.children.map((child) => (
                <Link
                  key={child.id}
                  href={child.href}
                  onClick={onLinkClick}
                  className="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-gray-50"
                >
                  {child.icon && (
                    <child.icon className="w-4 h-4 text-[#6F6F6F]" />
                  )}
                  <div>
                    <span className="text-sm text-[#1d1d1f]">{child.name}</span>
                    <p className="text-[11px] text-[#6F6F6F]">
                      {child.description}
                    </p>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function SegmentAccordion({
  segment,
  isExpanded,
  onToggle,
  onLinkClick,
}: {
  segment: SolarSegment;
  isExpanded: boolean;
  onToggle: () => void;
  onLinkClick: () => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={`mobile-segment-${segment.id}`}
        className="flex items-center gap-3 py-2.5 px-2 w-full rounded-lg hover:bg-gray-50"
      >
        <segment.icon className="w-4 h-4 text-[#6F6F6F]" />
        <span className="text-sm text-[#1d1d1f] flex-1 text-left">
          {segment.name}
        </span>
        <ChevronDown
          className={`w-3 h-3 text-[#6F6F6F] transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Solution Types */}
      <div
        id={`mobile-segment-${segment.id}`}
        className={`overflow-hidden transition-all duration-200 ${
          isExpanded ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pl-6 py-1 space-y-0.5">
          {solutionTypes.map((type) => (
            <Link
              key={type.id}
              href={getSolarHref(segment.id, type.id)}
              onClick={onLinkClick}
              className="flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-gray-50"
            >
              <type.icon className="w-3.5 h-3.5 text-[#52842D]" />
              <span className="text-sm text-[#6F6F6F]">{type.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
