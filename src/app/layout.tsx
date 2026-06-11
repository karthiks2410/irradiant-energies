import type { Metadata, Viewport } from "next";
import { DM_Sans, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { CookieConsentProvider } from "@/components/providers/CookieConsentProvider";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { MobileStickyQuoteButton } from "@/components/ui/MobileStickyQuoteButton";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Irradiant Energie | Solar & Smart Energy Solutions",
  description: "Powering India's clean energy future with solar panels, smart energy systems, and peer-to-peer energy trading.",
  metadataBase: new URL("https://irradiantenergie.com"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "solar panels India",
    "rooftop solar Bangalore",
    "BESCOM net metering",
    "PM Surya Ghar subsidy",
    "P2P energy trading",
    "virtual power plant India",
    "EV charging solar",
  ],
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

export const viewport: Viewport = {
  themeColor: "#52842D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Irradiant Energie",
    url: "https://irradiantenergie.com",
    logo: "https://irradiantenergie.com/logo.svg",
    description:
      "India's complete solar ecosystem — solar panels, energy storage, EV charging, and peer-to-peer energy trading.",
    areaServed: { "@type": "Country", name: "India" },
  };

  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <LenisProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </LenisProvider>
        <WhatsAppButton />
        <MobileStickyQuoteButton />
        <CookieConsentProvider />
        <Analytics />
      </body>
    </html>
  );
}
