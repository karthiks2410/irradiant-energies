import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Your Solar Quote | Irradiant Energie",
  description:
    "See exactly what solar can do for you — system size, monthly savings, BESCOM export earnings, and 25-year value. No salesperson required.",
  openGraph: {
    title: "Get Your Solar Quote | Irradiant Energie",
    description:
      "Personalized solar recommendation in 90 seconds. System size, monthly savings, BESCOM exports, 25-year value — all from your electricity bill.",
    siteName: "Irradiant Energie",
    locale: "en_IN",
    type: "website",
  },
  robots: "index, follow",
};

export default function GetQuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
