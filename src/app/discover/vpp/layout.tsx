import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Virtual Power Plant (VPP) in India | Future of Solar Energy",
  description:
    "Learn about Virtual Power Plants (VPP) in India. Discover how smart solar systems, batteries, and EVs can reduce electricity bills and power the future.",
  keywords: [
    // Primary Keywords
    "Virtual Power Plant India",
    "VPP solar India",
    "Smart solar systems India",
    "Future of solar energy India",
    "Distributed energy India",
    // Secondary Keywords
    "Rooftop solar with battery India",
    "Solar energy savings India",
    "Smart grid India",
    "Solar battery system India",
    "Reduce electricity bill India",
    "Solar energy future India",
    // Long-tail Keywords
    "What is virtual power plant in India",
    "How VPP works in solar systems",
    "Benefits of virtual power plant for homes",
    "Is VPP available in India",
    "Future of solar energy with battery storage",
    "Solar plus battery India",
    "Home energy storage India",
    "Prosumer energy India",
    "Grid connected solar India",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Virtual Power Plant (VPP) in India | Future of Solar Energy",
    description:
      "The future of solar energy is here. Turn your home into a smart energy system that saves money, stores power, and supports the grid.",
    type: "article",
    publishedTime: "2026-05-04",
    locale: "en_IN",
    siteName: "Irradiant Energie",
  },
  twitter: {
    card: "summary_large_image",
    title: "Virtual Power Plant (VPP) in India",
    description:
      "Learn how smart solar systems, batteries, and EVs can reduce electricity bills and power the future of energy in India.",
  },
  alternates: {
    canonical: "https://irradiantenergie.com/discover/vpp",
  },
};

export default function VPPArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
