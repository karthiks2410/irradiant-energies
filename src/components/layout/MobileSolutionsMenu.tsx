"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  primarySolarSegments,
  secondarySolarSegments,
  otherOfferings,
  type Solution,
} from "@/lib/solutions-data";

interface MobileSolutionsMenuProps {
  onLinkClick: () => void;
}

type Section = "solar" | "other" | null;

export function MobileSolutionsMenu({ onLinkClick }: MobileSolutionsMenuProps) {
  const [openSection, setOpenSection] = useState<Section>("solar");

  const toggle = (s: Section) =>
    setOpenSection((prev) => (prev === s ? null : s));

  return (
    <div className="border-t border-gray-100 pt-4 space-y-2">
      {/* Solar Solutions */}
      <button
        type="button"
        onClick={() => toggle("solar")}
        aria-expanded={openSection === "solar"}
        aria-controls="mobile-solar-solutions"
        className="flex items-center justify-between w-full py-2 px-1"
      >
        <span className="text-base font-medium text-[#1d1d1f]">
          Solar for You
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[#6F6F6F] transition-transform duration-200 ${
            openSection === "solar" ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        id="mobile-solar-solutions"
        className={`overflow-hidden transition-all duration-300 ${
          openSection === "solar" ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pl-2 pb-2 space-y-1">
          {primarySolarSegments.map((segment) => (
            <Link
              key={segment.id}
              href={segment.href ?? "#"}
              onClick={onLinkClick}
              className="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-gray-50"
            >
              <div className="p-2 rounded-lg bg-[#52842D]/10">
                <segment.icon className="w-4 h-4 text-[#52842D]" />
              </div>
              <div>
                <span className="text-sm font-medium text-[#1d1d1f]">
                  {segment.name}
                </span>
                <p className="text-[11px] text-[#6F6F6F] mt-0.5">
                  {segment.description}
                </p>
              </div>
            </Link>
          ))}

          {secondarySolarSegments.length > 0 && (
            <div className="mt-2 pt-2 border-t border-gray-100">
              <p className="text-[10px] uppercase tracking-wider text-[#6F6F6F] mb-1.5 px-2">
                Also available
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 px-2">
                {secondarySolarSegments.map((segment) => (
                  <Link
                    key={segment.id}
                    href={`/solutions/solar/${segment.id}/on-grid`}
                    onClick={onLinkClick}
                    className="inline-flex items-center gap-1.5 text-xs text-[#6F6F6F]"
                  >
                    <segment.icon className="w-3.5 h-3.5" />
                    {segment.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Other Offerings */}
      <button
        type="button"
        onClick={() => toggle("other")}
        aria-expanded={openSection === "other"}
        aria-controls="mobile-other-offerings"
        className="flex items-center justify-between w-full py-2 px-1"
      >
        <span className="text-base font-medium text-[#1d1d1f]">
          Beyond Solar
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[#6F6F6F] transition-transform duration-200 ${
            openSection === "other" ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        id="mobile-other-offerings"
        className={`overflow-hidden transition-all duration-300 ${
          openSection === "other" ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pl-2 pb-2 space-y-1">
          {otherOfferings.map((offering) => (
            <OfferingRow
              key={offering.id}
              solution={offering}
              onLinkClick={onLinkClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function OfferingRow({
  solution,
  onLinkClick,
}: {
  solution: Solution;
  onLinkClick: () => void;
}) {
  if (solution.href && !solution.children) {
    return (
      <Link
        href={solution.href}
        onClick={onLinkClick}
        className="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-gray-50"
      >
        <div className={`p-2 rounded-lg ${solution.iconBg}`}>
          <solution.icon className={`w-4 h-4 ${solution.iconColor}`} />
        </div>
        <span className="text-sm text-[#1d1d1f] flex-1">{solution.name}</span>
        {solution.badge && (
          <span className="text-[9px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
            {solution.badge}
          </span>
        )}
      </Link>
    );
  }

  return (
    <div className="py-2 px-2">
      <div className="flex items-center gap-3 mb-1.5">
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
            onClick={onLinkClick}
            className="block px-2 py-1.5 rounded-md text-xs text-[#6F6F6F] hover:text-[#1d1d1f] hover:bg-gray-50"
          >
            {child.name}
            <span className="text-[#9CA3AF] ml-1.5">— {child.description}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
