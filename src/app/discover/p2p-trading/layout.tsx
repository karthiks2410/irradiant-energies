import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peer-to-Peer Energy Trading in India | Earn from Solar Power",
  description:
    "Learn how Peer-to-Peer (P2P) energy trading in India allows you to buy and sell solar electricity directly. Earn from excess solar power and reduce electricity bills.",
  keywords: [
    // Primary Keywords
    "Peer to peer energy trading India",
    "P2P energy trading India",
    "Sell solar electricity India",
    "Solar energy trading India",
    "Rooftop solar income India",
    // Secondary Keywords
    "Smart meter solar India",
    "Net metering vs P2P trading",
    "Earn money from solar India",
    "Blockchain energy trading India",
    "Buy solar power locally India",
    // Long-tail Keywords
    "How to sell excess solar power in India",
    "What is peer to peer energy trading India",
    "Can I earn money from rooftop solar India",
    "P2P energy trading benefits for homeowners",
    "Future of solar income in India",
    "BSES P2P trading",
    "Tata Power P2P trading",
    "Prosumer solar India",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Peer-to-Peer Energy Trading in India | Earn from Solar Power",
    description:
      "Turn your solar system into an income-generating asset. Buy and sell electricity directly with others using smart digital platforms.",
    type: "article",
    publishedTime: "2026-05-04",
    locale: "en_IN",
    siteName: "Irradiant Energies",
  },
  twitter: {
    card: "summary_large_image",
    title: "P2P Energy Trading in India",
    description:
      "Learn how to sell excess solar power and earn money from your rooftop solar system in India.",
  },
  alternates: {
    canonical: "https://irradiantenergie.com/discover/p2p-trading",
  },
};

export default function P2PTradingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
