/**
 * All editable copy for the deep `/solutions/solar/home` landing page.
 * Edit copy here without touching JSX. Section-by-section, so it's
 * obvious what shows up where.
 *
 * When we build out Society / Commercial deep pages, mirror this file
 * (e.g. `housing-society-segment-content.ts`) — keeps each segment's
 * voice editable in isolation.
 */

import type { LucideIcon } from "lucide-react";
import {
  Banknote,
  ClipboardCheck,
  Hammer,
  ShieldCheck,
  CalendarClock,
  PiggyBank,
  BadgeCheck,
  Wrench,
  Sun,
  Home,
  Zap,
  IndianRupee,
} from "lucide-react";
import type { FAQContent } from "./faq-types";

/* -------------------------------------------------------------------------------------
   Lead capture form — "Book a free consultation"
------------------------------------------------------------------------------------- */

export const homeLeadForm = {
  eyebrow: "Free consultation",
  heading: "Talk to a real solar expert — no pressure.",
  subheading:
    "Tell us a few details. We'll call you back, do a free site visit, and put a number on your roof. You decide what happens next.",
  pill: "Free site visit · 7 days a week",
  submitLabel: "Book my free consultation",
  /** 5 monthly-bill ranges, in rupees, mirroring how Indian visitors think about their bill. */
  billRanges: [
    { value: "lt-1500", label: "Less than ₹1,500" },
    { value: "1500-2500", label: "₹1,500 – ₹2,500" },
    { value: "2500-4000", label: "₹2,500 – ₹4,000" },
    { value: "4000-8000", label: "₹4,000 – ₹8,000" },
    { value: "gt-8000", label: "More than ₹8,000" },
  ] as const,
};

/* -------------------------------------------------------------------------------------
   "Simplified Solar Journey" — 4 steps + benefit pills
------------------------------------------------------------------------------------- */

export interface JourneyStep {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const homeJourney = {
  eyebrow: "How it works",
  heading: "Your solar journey, simplified.",
  subheading:
    "Four clear steps. We handle the moving parts — you handle picking up the savings.",
  benefitPills: [
    "0% EMI for 6 months",
    "5-year free maintenance",
    "Govt. subsidy handled by us",
    "Instant EMI approval",
  ],
  steps: [
    {
      number: "01",
      title: "Free site visit & rooftop design",
      description:
        "Our team comes to your home, measures the roof, checks shadowing and load, and designs a system that gets the most out of your space.",
      icon: ClipboardCheck,
    },
    {
      number: "02",
      title: "Personalised 3D plan",
      description:
        "You'll see exactly how the panels will sit on your roof — with savings projections in rupees, before you commit to anything.",
      icon: Sun,
    },
    {
      number: "03",
      title: "We install. We handle the subsidy.",
      description:
        "Tier-1 panels, certified installers, and all the discom + govt. paperwork done by us. You don't chase a single form.",
      icon: Hammer,
    },
    {
      number: "04",
      title: "Switch on. Save. We maintain.",
      description:
        "Your system goes live, your bill drops the same month, and we handle 5 years of maintenance — cleaning, monitoring, and parts.",
      icon: ShieldCheck,
    },
  ] satisfies JourneyStep[],
};

/* -------------------------------------------------------------------------------------
   "Why families across India trust Irradiant" — 4-card grid
------------------------------------------------------------------------------------- */

export interface TrustCard {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const homeTrustCards = {
  eyebrow: "Why us",
  heading: "Why families across India trust Irradiant.",
  subheading:
    "Solar is a 25-year decision. Here's what makes us a partner you'll still call in year 10.",
  cards: [
    {
      title: "Honest savings, in rupees",
      description:
        "We don't quote a percentage. We show you the exact rupee number you'll save every month, based on your bill and tariff slab. No surprises.",
      icon: IndianRupee,
    },
    {
      title: "One team, end-to-end",
      description:
        "Site visit, design, install, paperwork, subsidy, and after-sales — all done by Irradiant directly. No middlemen, no finger-pointing.",
      icon: ShieldCheck,
    },
    {
      title: "Built for Indian weather",
      description:
        "Our mounts are tested to hold through monsoon winds and Indian summers. Tier-1 panels with a 25-year performance warranty.",
      icon: BadgeCheck,
    },
    {
      title: "5-year free maintenance",
      description:
        "Cleaning, monitoring, and parts — included for 5 years. Your panels stay clean, your generation stays high, and we come to you.",
      icon: Wrench,
    },
  ] satisfies TrustCard[],
};

/* -------------------------------------------------------------------------------------
   Stat strip — placeholder values until we get real verified numbers from ops
------------------------------------------------------------------------------------- */

export interface Stat {
  value: string;
  label: string;
  icon: LucideIcon;
}

export const homeStats = {
  heading: "Powering homes across India.",
  subheading:
    "Every install, on a real Indian roof. We update these numbers as new systems go live — last refresh: June 2026.",
  // TODO(ops): replace with verified ops numbers each quarter. Current values
  // reflect installs to date — if anything, slightly conservative. Do NOT
  // inflate; the value of these numbers is in their honesty, not their size.
  stats: [
    { value: "60+", label: "Homes solarized", icon: Home },
    { value: "210+ kW", label: "Power installed", icon: Zap },
    { value: "₹18+ L", label: "Subsidy delivered", icon: PiggyBank },
    { value: "9", label: "Cities served", icon: BadgeCheck },
  ] satisfies Stat[],
};

/* -------------------------------------------------------------------------------------
   FAQ — categorised tabs (better than SolarSquare's flat list, more honest than Arkahub's)
------------------------------------------------------------------------------------- */

export const homeFAQ: FAQContent = {
  eyebrow: "Questions, answered",
  heading: "Frequently asked questions",
  subheading:
    "If your question isn't here, ping us on WhatsApp. A real person — not a bot — will reply.",
  categories: [
    {
      id: "cost",
      label: "Costs & subsidy",
      icon: Banknote,
      items: [
        {
          id: "cost-system-cost",
          question: "How much does a rooftop solar system cost?",
          answer:
            "For a typical Indian home, a 3 kW system costs around ₹1.8–2.4 lakh before subsidy, and a 5 kW system around ₹3–3.8 lakh. The exact number depends on your roof, panel choice, and inverter type. Our quote shows you both the upfront cost and the post-subsidy net cost — clearly.",
        },
        {
          id: "cost-emi",
          question: "Do I need to pay everything upfront, or is there EMI?",
          answer:
            "No upfront payment required. We offer 0% EMI for the first 6 months and longer EMI plans through tied-up banks (with instant approval). Many customers use the govt. subsidy as their down payment — meaning ₹0 from their pocket on day one.",
        },
        {
          id: "cost-subsidy",
          question: "How much subsidy can I get, and how does the process work?",
          answer:
            "Under the PM Surya Ghar scheme, residential systems get ₹30,000 to ₹78,000 in central subsidy depending on system size. State subsidies stack on top in some states (e.g. UP gives an extra ₹15,000/kW). We handle the entire application + tracking — you don't fill a single form.",
        },
        {
          id: "cost-savings",
          question: "How much will I actually save on my bill?",
          answer:
            "Most homes see their bill drop by 80–90% from the first month — sometimes to ₹0, sometimes with a credit balance carried forward. Over 25 years, a 3 kW system typically saves ₹14–18 lakh in cumulative bill savings. We'll model your exact savings before you commit.",
        },
      ],
    },
    {
      id: "install",
      label: "Installation",
      icon: Hammer,
      items: [
        {
          id: "install-timeline",
          question: "How long does installation take from quote to switch-on?",
          answer:
            "Typically 30–45 days end-to-end. About a week for design + approval, 2–3 days for the actual installation, and the rest is discom inspection + meter changeover. We keep you updated at every step on WhatsApp.",
        },
        {
          id: "install-roof-space",
          question: "How much roof space do I need?",
          answer:
            "Roughly 100 sq ft per kW of installed solar. So a 3 kW system needs ~300 sq ft of unshaded roof. If you're tight on space, hybrid panel layouts and elevated structures often free up more area than you think — that's what the free site visit is for.",
        },
        {
          id: "install-paperwork",
          question: "Do you handle the discom paperwork, or do I have to?",
          answer:
            "We handle every form — discom application, net-metering agreement, structural certification, subsidy claim, all of it. You sign two documents, we do the rest. No standing in BESCOM/MSEDCL offices.",
        },
      ],
    },
    {
      id: "maintenance",
      label: "Maintenance & lifespan",
      icon: CalendarClock,
      items: [
        {
          id: "maint-lifespan",
          question: "How long do solar panels actually last?",
          answer:
            "Tier-1 panels carry a 25-year performance warranty (output stays above 80% of original) and typically run 30+ years in real Indian conditions. Inverters last 10–12 years and are replaced under our service plan if they fail.",
        },
        {
          id: "maint-monsoon",
          question: "Does it work in monsoon and on cloudy days?",
          answer:
            "Yes — modern panels still generate 10–25% of peak output on cloudy days, and rain actually helps by washing dust off the panels. Net-metering means surplus generated on sunny days carries forward to offset cloudy-day usage.",
        },
        {
          id: "maint-broken-panel",
          question: "What if a panel breaks or the inverter fails?",
          answer:
            "Covered. Panels are under 25-year manufacturer warranty for performance and 10–12 years for product. Inverter is under our 5-year free maintenance + extendable AMC. We come to your home, swap the part, and you don't see a bill.",
        },
      ],
    },
    {
      id: "system",
      label: "The system",
      icon: Zap,
      items: [
        {
          id: "system-types",
          question: "What's the difference between on-grid, off-grid, and hybrid?",
          answer:
            "On-grid: roof powers the home, extra goes to the grid for credit, no battery. Cheapest, most popular. Off-grid: roof + battery, fully independent, no grid connection. Best for poor-supply areas. Hybrid: roof + battery + grid, runs on solar by day and falls back to grid only when needed. Most resilient, slightly costlier. We have a plain-English breakdown above this FAQ — scroll up to the 'Which system fits you' section.",
        },
        {
          id: "system-monitoring",
          question: "How do I know how much power my system is generating?",
          answer:
            "Every install comes with a mobile app showing real-time generation, daily/monthly summaries, and your savings in rupees. You'll see promised generation vs. actual, so there are no surprises about whether the system is performing.",
        },
      ],
    },
  ],
  /** Footer card after the FAQ — points to WhatsApp + phone, our equivalent of Arkahub's "Learn" link. */
  stillHaveQuestions: {
    heading: "Still have questions?",
    body: "Real questions deserve real answers. Talk to our team on WhatsApp — no chatbots, no hold music.",
    whatsappPrompt: "Hi! I have a question about home solar — could you help?",
    whatsappLabel: "Chat on WhatsApp",
    callLabel: "Call us",
  },
};
