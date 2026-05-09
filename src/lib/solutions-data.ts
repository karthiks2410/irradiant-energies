import { Sun, Battery, Car, Users, Zap, PlugZap, BatteryCharging, Merge, Home, Building2, Warehouse, Factory, Globe } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SolutionTypeId = "on-grid" | "off-grid" | "hybrid";

export interface SolutionType {
  id: SolutionTypeId;
  name: string;
  description: string;
  icon: LucideIcon;
}

export interface SolarSegment {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: LucideIcon;
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
    description: "Connected to utility grid, export excess power",
    icon: PlugZap,
  },
  {
    id: "off-grid",
    name: "Off-Grid",
    description: "Independent system with battery backup",
    icon: BatteryCharging,
  },
  {
    id: "hybrid",
    name: "Hybrid",
    description: "Best of both - grid + battery storage",
    icon: Merge,
  },
];

export const solarSegments: SolarSegment[] = [
  {
    id: "home",
    name: "Home",
    shortName: "Home",
    description: "Residential rooftop solar for individual homes",
    icon: Home,
  },
  {
    id: "housing-society",
    name: "Housing Society",
    shortName: "Society",
    description: "Shared solar systems for apartments & gated communities",
    icon: Building2,
  },
  {
    id: "roof-rental",
    name: "Roof Rental",
    shortName: "Roof Rental",
    description: "Lease your rooftop and earn passive income",
    icon: Warehouse,
  },
  {
    id: "utility-scale",
    name: "Utility Scale",
    shortName: "Utility",
    description: "Large-scale solar farms for power generation",
    icon: Globe,
  },
  {
    id: "industrial",
    name: "Industrial",
    shortName: "Industrial",
    description: "High-capacity systems for factories & warehouses",
    icon: Factory,
  },
];

export const solutions: Solution[] = [
  {
    id: "solar",
    name: "Solar",
    icon: Sun,
    iconColor: "text-[#8EBE34]",
    iconBg: "bg-[#8EBE34]/10",
    description: "Rooftop solar solutions for every need",
    hasSegments: true,
    segments: solarSegments,
  },
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

export function getSolarHref(segmentId: string, typeId: SolutionTypeId): string {
  return `/solutions/solar/${segmentId}/${typeId}`;
}

export function getSolutionById(id: string): Solution | undefined {
  return solutions.find((s) => s.id === id);
}

export function getSegmentById(id: string): SolarSegment | undefined {
  return solarSegments.find((s) => s.id === id);
}

export function getSolutionTypeById(id: SolutionTypeId): SolutionType | undefined {
  return solutionTypes.find((t) => t.id === id);
}
