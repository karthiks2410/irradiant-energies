import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { CookieConsentProvider } from "@/components/providers/CookieConsentProvider";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
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
  title: "Irradiant Energie | Solar & Smart Energy Solutions",
  description: "Powering India's clean energy future with solar panels, smart energy systems, and peer-to-peer energy trading.",
  metadataBase: new URL("https://irradiantenergie.com"),
  openGraph: {
    title: "Irradiant Energie | Solar & Smart Energy Solutions",
    description: "India's complete solar ecosystem — from rooftop to revenue. Premium solar panels, energy storage, and EV charging solutions.",
    siteName: "Irradiant Energie",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Irradiant Energie | Solar & Smart Energy Solutions",
    description: "India's complete solar ecosystem — from rooftop to revenue. Premium solar panels, energy storage, and EV charging solutions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${instrumentSerif.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <LenisProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </LenisProvider>
        <WhatsAppButton />
        <CookieConsentProvider />
        <Analytics />
      </body>
    </html>
  );
}
