import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { CookieConsentProvider } from "@/components/providers/CookieConsentProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Irradiant Energies | Solar & Smart Energy Solutions",
  description: "Powering India's clean energy future with solar panels, smart energy systems, and peer-to-peer energy trading.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <LenisProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </LenisProvider>
        <CookieConsentProvider />
        <Analytics />
      </body>
    </html>
  );
}
