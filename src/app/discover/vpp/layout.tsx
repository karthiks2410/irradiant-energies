import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What is a Virtual Power Plant (VPP)? | Irradiant Energies",
  description:
    "Learn how Virtual Power Plants connect solar panels, batteries, and smart devices to create a smarter, cleaner grid. Discover the future of solar energy in India.",
  keywords: [
    "virtual power plant",
    "VPP India",
    "solar energy storage",
    "home battery storage",
    "smart grid India",
    "prosumer energy",
    "distributed energy resources",
    "solar battery system",
    "renewable energy India",
    "rooftop solar",
    "energy management system",
    "grid connected solar",
    "solar investment India",
    "clean energy future",
  ],
  openGraph: {
    title: "Virtual Power Plant (VPP): The Future of Solar Energy in India",
    description:
      "Your home can not only use solar power—but also support the grid and earn benefits from it. Learn how VPPs are transforming energy in India.",
    type: "article",
    publishedTime: "2026-05-04",
  },
};

export default function VPPArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
