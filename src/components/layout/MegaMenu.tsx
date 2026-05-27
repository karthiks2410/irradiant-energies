"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
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

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  const [hoveredSolution, setHoveredSolution] = useState<string>("solar");
  const [selectedSegment, setSelectedSegment] = useState<string>("home");

  const currentSolution = solutions.find((s) => s.id === hoveredSolution);

  return (
    <div
      className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-200 ${
        isOpen
          ? "opacity-100 visible translate-y-0"
          : "opacity-0 invisible -translate-y-2"
      }`}
    >
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex min-w-[920px]">
        {/* Left Panel - Solution Categories */}
        <div className="w-[280px] bg-gray-50/50 p-5 border-r border-gray-100">
          <p className="text-[10px] uppercase tracking-wider text-[#6F6F6F] font-medium px-3 py-2 mb-1">
            Solutions
          </p>
          <div className="space-y-1">
            {solutions.map((solution) => (
              <SolutionItem
                key={solution.id}
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
            ))}
          </div>
        </div>

        {/* Right Panel - Dynamic Content */}
        <div className="flex-1 p-8 min-h-[400px]">
          {currentSolution?.hasSegments && currentSolution.segments && (
            <SolarPanel
              segments={currentSolution.segments}
              selectedSegment={selectedSegment}
              onSegmentChange={setSelectedSegment}
              onClose={onClose}
            />
          )}

          {currentSolution?.children && (
            <ChildrenPanel
              solution={currentSolution}
              onClose={onClose}
            />
          )}

          {currentSolution?.href && !currentSolution.children && !currentSolution.hasSegments && (
            <DirectLinkPanel solution={currentSolution} onClose={onClose} />
          )}
        </div>
      </div>
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
        <ChevronRight className={`w-4 h-4 transition-colors ${isActive ? "text-[#8EBE34]" : "text-gray-300"}`} />
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
      {/* Segment Tabs */}
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

      {/* Segment Description */}
      {currentSegment && (
        <div className="mb-7">
          <div className="flex items-center gap-2 mb-2">
            <currentSegment.icon className="w-4 h-4 text-[#8EBE34]" />
            <h3 className="text-base font-semibold text-[#1d1d1f]">
              {currentSegment.name}
            </h3>
          </div>
          <p className="text-sm text-[#6F6F6F]">{currentSegment.description}</p>
        </div>
      )}

      {/* Solution Type Cards */}
      <div className="grid grid-cols-3 gap-4">
        {solutionTypes.map((type) => (
          <Link
            key={type.id}
            href={getSolarHref(selectedSegment, type.id)}
            onClick={onClose}
            className="group p-5 rounded-xl border border-gray-100 hover:border-[#8EBE34]/30 hover:bg-[#8EBE34]/5 transition-all"
          >
            <div className="p-2.5 rounded-lg bg-gray-100 group-hover:bg-[#8EBE34]/10 w-fit mb-4 transition-colors">
              <type.icon className="w-5 h-5 text-[#6F6F6F] group-hover:text-[#8EBE34] transition-colors" />
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
            className="group p-5 rounded-xl border border-gray-100 hover:border-[#8EBE34]/30 hover:bg-[#8EBE34]/5 transition-all"
          >
            {child.icon && (
              <div className="p-2.5 rounded-lg bg-gray-100 group-hover:bg-[#8EBE34]/10 w-fit mb-4 transition-colors">
                <child.icon className="w-5 h-5 text-[#6F6F6F] group-hover:text-[#8EBE34] transition-colors" />
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
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#8EBE34] text-white rounded-full text-sm font-medium hover:bg-[#7AA82D] transition-colors"
        >
          Learn More
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}
