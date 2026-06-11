import { Sun, Battery, Car, Users, Zap, PlugZap, BatteryCharging, Merge, Home, Building2, Warehouse, Factory, Globe, Briefcase } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SolutionTypeId = "on-grid" | "off-grid" | "hybrid";

export interface SolutionType {
  id: SolutionTypeId;
  name: string;
  /** Technical one-liner — used inside segment landing pages where the visitor has context. */
  description: string;
  /** Plain-language headline for the audience-first cards on segment landing pages. */
  plainName: string;
  /** Plain-language explanation for non-experts. No jargon. */
  plainDescription: string;
  icon: LucideIcon;
}

export interface SolarSegment {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: LucideIcon;
  /** Top-level audience landing page. Set on primary segments only (Home/Society/Commercial). */
  href?: string;
  /** Primary segments are surfaced as audience-first nav items; secondary are kept as small footer-row links. */
  tier: "primary" | "secondary";
  /** Hero copy for the segment's own landing page. */
  landing?: {
    eyebrow: string;
    heading: string;
    subheading: string;
  };
}

export interface SolutionChild {
  id: string;
  name: string;
  description: string;
  href: string;
  icon?: LucideIcon;
}

export interface Solution {
  id: string;
  name: string;
  shortName?: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  description?: string;
  href?: string;
  hasSegments?: boolean;
  segments?: SolarSegment[];
  children?: SolutionChild[];
  badge?: string;
}

export const solutionTypes: SolutionType[] = [
  {
    id: "on-grid",
    name: "On-Grid",
    plainName: "Stay connected, sell extra power",
    description: "Connected to utility grid, export excess power",
    plainDescription:
      "Your roof powers the home. Whatever's left over goes to the grid and the bill drops or turns into a credit. Most popular for homes with steady electricity.",
    icon: PlugZap,
  },
  {
    id: "off-grid",
    name: "Off-Grid",
    plainName: "Be fully independent with batteries",
    description: "Independent system with battery backup",
    plainDescription:
      "Your roof + a battery pack. Zero dependence on the grid, even during outages. Right for places with bad supply or remote properties.",
    icon: BatteryCharging,
  },
  {
    id: "hybrid",
    name: "Hybrid",
    plainName: "Best of both — power + backup",
    description: "Best of both - grid + battery storage",
    plainDescription:
      "Grid-connected and battery-backed. Run on solar by day, store extra in batteries, fall back to the grid only if you need to. The most resilient option.",
    icon: Merge,
  },
];

export const solarSegments: SolarSegment[] = [
  {
    id: "home",
    name: "Home",
    shortName: "Home",
    description: "Rooftop solar for individual homes and villas",
    icon: Home,
    href: "/solutions/solar/home",
    tier: "primary",
    landing: {
      eyebrow: "For homeowners",
      heading: "Solar for your home — designed end-to-end.",
      subheading:
        "From the first site visit to the last installation screw, we handle it. You see the savings every month on your bill.",
    },
  },
  {
    id: "housing-society",
    name: "Housing Society",
    shortName: "Society",
    description: "Shared rooftop solar for apartments and gated communities",
    icon: Building2,
    href: "/solutions/solar/housing-society",
    tier: "primary",
    landing: {
      eyebrow: "For RWAs and society committees",
      heading: "Cut the society's common-area electricity bill — together.",
      subheading:
        "Lifts, pumps, lobby, parking lights — solar covers it all. Lower society maintenance for every flat.",
    },
  },
  {
    id: "commercial",
    name: "Commercial",
    shortName: "Commercial",
    description: "Solar for shops, offices, factories and warehouses",
    icon: Briefcase,
    href: "/solutions/solar/commercial",
    tier: "primary",
    landing: {
      eyebrow: "For businesses",
      heading: "Solar for your business — predictable energy costs, lower bills.",
      subheading:
        "Shops, offices, schools, factories, warehouses. We design for your roof, your load curve, and your tariff.",
    },
  },
  {
    id: "roof-rental",
    name: "Roof Rental",
    shortName: "Roof Rental",
    description: "Lease your rooftop and earn passive income",
    icon: Warehouse,
    tier: "secondary",
  },
  {
    id: "utility-scale",
    name: "Utility Scale",
    shortName: "Utility",
    description: "Large-scale solar farms for power generation",
    icon: Globe,
    tier: "secondary",
  },
  {
    id: "industrial",
    name: "Industrial",
    shortName: "Industrial",
    description: "High-capacity systems for factories & warehouses",
    icon: Factory,
    tier: "secondary",
  },
];

/** Audience-first solar entries — the primary three segments that get top-level menu items + landing pages. */
export const primarySolarSegments = solarSegments.filter((s) => s.tier === "primary");

/** Roof Rental, Utility, Industrial — kept reachable but de-emphasized in the menu. */
export const secondarySolarSegments = solarSegments.filter((s) => s.tier === "secondary");

/** Solar (the audience-first product) — only used by the new "Solar Solutions" desktop+mobile menu. */
export const solarSolution: Solution = {
  id: "solar",
  name: "Solar",
  icon: Sun,
  iconColor: "text-[#52842D]",
  iconBg: "bg-[#52842D]/10",
  description: "Rooftop solar solutions for every need",
  hasSegments: true,
  segments: solarSegments,
};

/** Everything that isn't rooftop solar — surfaced under the second "Other Offerings" menu. */
export const otherOfferings: Solution[] = [
  {
    id: "ess",
    name: "ESS",
    shortName: "Energy Storage",
    icon: Battery,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10",
    description: "Energy Storage Systems",
    children: [
      {
        id: "bess",
        name: "BESS",
        description: "Battery Energy Storage System",
        href: "/solutions/ess/bess",
        icon: Battery,
      },
    ],
  },
  {
    id: "ev-charging",
    name: "EV Charging",
    icon: Car,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-500/10",
    description: "Electric vehicle charging infrastructure",
    children: [
      {
        id: "grid-dependent",
        name: "Grid Dependent",
        description: "Standard EV charging from utility grid",
        href: "/solutions/ev-charging/grid-dependent",
      },
      {
        id: "solar-grid",
        name: "Solar + Grid",
        description: "Solar-powered with grid backup",
        href: "/solutions/ev-charging/solar-grid",
      },
      {
        id: "hybrid",
        name: "Hybrid",
        description: "Solar + Battery + Grid integration",
        href: "/solutions/ev-charging/hybrid",
      },
    ],
  },
  {
    id: "p2p",
    name: "P2P Trading",
    icon: Users,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
    description: "Sell excess energy to neighbors",
    href: "/discover/p2p-trading",
  },
  {
    id: "vpp",
    name: "VPP",
    shortName: "Virtual Power Plant",
    icon: Zap,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10",
    description: "Join the distributed energy network",
    href: "/discover/vpp",
    badge: "Coming Soon",
  },
];

/**
 * @deprecated Kept for backward-compat with anything still importing the flat `solutions` list.
 * New code should import `solarSolution` + `otherOfferings` separately so the audience-first
 * "Solar Solutions" / "Other Offerings" split stays clean.
 */
export const solutions: Solution[] = [solarSolution, ...otherOfferings];

export function getSolarHref(segmentId: string, typeId: SolutionTypeId): string {
  return `/solutions/solar/${segmentId}/${typeId}`;
}

export function getSegmentById(id: string): SolarSegment | undefined {
  return solarSegments.find((s) => s.id === id);
}

export function getSolutionTypeById(id: SolutionTypeId): SolutionType | undefined {
  return solutionTypes.find((t) => t.id === id);
}
