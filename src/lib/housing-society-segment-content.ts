/**
 * Editable copy for /solutions/solar/housing-society. Voice tuned for the
 * RWA chairman / society committee / facility manager audience.
 *
 * Stat strip section is intentionally omitted across segments until ops
 * has verified numbers — see homeStats notes.
 */

import {
  Banknote,
  ClipboardCheck,
  Wrench,
  Cog,
  ShieldCheck,
  Hammer,
  FileText,
  Users,
  Zap,
  Sun,
  IndianRupee,
} from "lucide-react";
import type { FAQContent } from "./faq-types";
import type {
  JourneyContent,
  TrustContent,
  LeadFormContent,
} from "./segment-content-types";

/* ───────────────────────────── Lead capture form ───────────────────────────── */

export const housingSocietyLeadForm: LeadFormContent = {
  eyebrow: "AGM-ready proposal",
  heading: "Get a proposal your committee can sign off on.",
  subheading:
    "Tell us about your society. We'll send a detailed savings + payback proposal — formatted exactly for your AGM circulation, including draft resolution language.",
  pill: "Free site visit + draft AGM resolution",
  submitLabel: "Get the AGM proposal",
  billLabel: "Average monthly common-area bill",
  organisationField: {
    label: "Society name",
    placeholder: "e.g. Brigade Gardenia CHS",
    paramName: "society",
  },
  /** Society common-area bills run higher than household bills — adjust ranges. */
  billRanges: [
    { value: "lt-15k", label: "Less than ₹15,000" },
    { value: "15k-30k", label: "₹15,000 – ₹30,000" },
    { value: "30k-60k", label: "₹30,000 – ₹60,000" },
    { value: "60k-1L", label: "₹60,000 – ₹1,00,000" },
    { value: "gt-1L", label: "More than ₹1,00,000" },
  ],
};

/* ───────────────────────────── Solar Journey ───────────────────────────── */

export const housingSocietyJourney: JourneyContent = {
  eyebrow: "How it works",
  heading: "From first conversation to switch-on, in five clear steps.",
  subheading:
    "We've done this with dozens of societies. The flow is predictable, the paperwork is on us, and the committee always stays in the loop.",
  benefitPills: [
    "Draft AGM resolution included",
    "Subsidy + paperwork handled",
    "5-year free maintenance",
    "Single point of contact",
  ],
  steps: [
    {
      number: "01",
      title: "Free site visit & energy audit",
      description:
        "We visit the society, study the rooftop layout, common-area load profile, and last 12 months of electricity bills. You get a sized proposal — not a brochure.",
      icon: ClipboardCheck,
    },
    {
      number: "02",
      title: "Proposal & AGM-ready package",
      description:
        "We share a detailed proposal — savings, payback, financing options, plus a draft resolution your committee can circulate ahead of the AGM. No legalese.",
      icon: FileText,
    },
    {
      number: "03",
      title: "Approval, financing & subsidy filing",
      description:
        "Once the AGM passes, we file the discom paperwork, structural NOCs, and PM Surya Ghar subsidy claim in parallel. Bank financing options handled if you're going EMI.",
      icon: Banknote,
    },
    {
      number: "04",
      title: "Install with minimal disruption",
      description:
        "Tier-1 panels, certified installers, scheduled to avoid resident inconvenience. Lift access, water tank routing, and parking — coordinated with your facility manager.",
      icon: Hammer,
    },
    {
      number: "05",
      title: "Switch on. Save. We maintain.",
      description:
        "System goes live, common-area bills drop the same month, and we handle 5 years of cleaning + monitoring + parts. Society gets transparent monthly generation reports.",
      icon: ShieldCheck,
    },
  ],
};

/* ───────────────────────────── Why Trust Grid ───────────────────────────── */

export const housingSocietyTrustCards: TrustContent = {
  eyebrow: "Why us",
  heading: "Why society committees pick Irradiant.",
  subheading:
    "Society decisions are committee decisions. Our process is built around transparency, AGM-readiness, and giving every flat owner a clear answer.",
  cards: [
    {
      title: "Committee-ready proposals",
      description:
        "Detailed savings model, payback timeline, and financing comparison — formatted to circulate to all flat owners ahead of your AGM. Includes a draft resolution.",
      icon: FileText,
    },
    {
      title: "Fair to every flat",
      description:
        "Common-area solar benefits everyone proportionally — we model the per-flat impact on monthly maintenance so committees can show it transparently.",
      icon: Users,
    },
    {
      title: "Subsidy + paperwork on us",
      description:
        "PM Surya Ghar registration, discom approval, structural NOCs, net-metering changeover — every form, every visit, our team handles it.",
      icon: ShieldCheck,
    },
    {
      title: "Built for shared rooftops",
      description:
        "Water tanks, AC condensers, lift machine rooms, cell towers — we design around them with elevated mounts, not despite them.",
      icon: Wrench,
    },
  ],
};

/* ───────────────────────────── FAQ ───────────────────────────── */

export const housingSocietyFAQ: FAQContent = {
  eyebrow: "Society questions, answered",
  heading: "Housing Society FAQs",
  subheading:
    "Things RWAs and society committees ask us most often — costs, AGM approval, subsidy, maintenance, and how it actually works in a multi-flat building.",
  categories: [
    {
      id: "costs",
      label: "Costs & subsidy",
      icon: Banknote,
      items: [
        {
          id: "soc-savings",
          question: "How much can our society save with solar?",
          answer:
            "With solar covering common-area loads — lifts, pumps, lobby and corridor lights, parking — most societies see their common-area electricity bill drop by 70–90%. The exact savings depend on your society's monthly consumption, sanctioned load, and the rooftop area we can install on.\n\nFor a typical mid-size society with a ₹40,000–₹60,000/month common-area bill, savings work out to ₹3.5–6 lakh per year, with payback in 3.5–5 years and 20+ years of near-zero bills after that.",
        },
        {
          id: "soc-govt-subsidy",
          question: "Is there a government subsidy for housing societies?",
          answer:
            "Yes — under PM Surya Ghar Muft Bijli Yojana, group housing societies are eligible for subsidy on common-area / shared-use solar installations. The central subsidy is ₹18,000/kW (capped at the relevant slab) for the society's qualifying capacity. Some states stack additional subsidies on top.\n\nNote: the subsidy structure for societies works slightly differently from individual homes — it's tied to the society's total approved capacity rather than per-flat. We figure out the exact eligibility for your society during the site visit.",
        },
        {
          id: "soc-apply-subsidy",
          question: "How do we apply for the subsidy?",
          answer:
            "We handle the entire application — society registration on the National Portal (pmsuryaghar.gov.in), document submission, technical feasibility check, vendor empanelment, and post-installation claim filing. The society only needs to provide standard paperwork (registration certificate, electricity bill, AGM resolution, building approval).\n\nOnce installation is complete and inspected by the discom, the subsidy is credited to the society's bank account within 30 days. You don't chase a single form.",
        },
        {
          id: "soc-financing",
          question: "What are the different financing options available?",
          answer:
            "Three main routes:\n\n1. CAPEX (society pays): Society funds the system upfront from corpus or maintenance, claims subsidy, and gets 100% of the savings. Best ROI, full ownership.\n\n2. EMI / loan: Bank-financed at 8–11% interest, 5–10 year tenure. Many banks (SBI, Canara, HDFC) have dedicated rooftop solar products that pre-approve societies.\n\n3. RESCO / OPEX (PPA model): A third party (us or a financier) owns the system, the society buys the solar power at a fixed lower tariff for 15–25 years. Zero upfront cost. Lower savings than CAPEX but no capital outlay.\n\nWe walk you through which fits your society's books and corpus position.",
        },
        {
          id: "soc-payback",
          question: "What is the typical payback period for a solar system?",
          answer:
            "For a society going CAPEX with subsidy claimed, payback is typically 3.5–5 years. After that, every kWh the panels generate is essentially free for the next 20+ years.\n\nIn RESCO / PPA mode there is no payback to calculate — the savings start day one because there's no upfront investment.",
        },
      ],
    },
    {
      id: "approval",
      label: "Approval & process",
      icon: ClipboardCheck,
      items: [
        {
          id: "soc-agm-approval",
          question: "Does our society need an AGM approval to install solar?",
          answer:
            "Yes. As a structural change to the building and a corpus / common-area decision, solar installation requires a formal resolution passed in the Annual General Meeting (or a duly-convened Special General Meeting). The resolution should specify the capacity, financing model, and authorisation for the society committee to sign the contract on behalf of the society.\n\nWe provide a draft resolution template you can circulate to members ahead of the AGM. Most societies pass it on the first vote once they see the savings projection.",
        },
        {
          id: "soc-permission-procedure",
          question: "What is the procedure to get permission from society to build solar?",
          answer:
            "Standard steps in order:\n\n1. Initial committee discussion based on our preliminary site survey + savings estimate.\n\n2. We share a detailed proposal: system size, financial model, savings forecast, vendor credentials.\n\n3. Society committee circulates the proposal to all members (typically 2–4 weeks notice).\n\n4. AGM / SGM passes the resolution authorising installation.\n\n5. Society signs the agreement with us.\n\n6. We file for discom approval, structural NOC (where required), and subsidy registration in parallel.\n\nThe whole approval-to-signed-contract phase usually takes 30–60 days depending on how quickly the society can convene the AGM.",
        },
        {
          id: "soc-pm-surya-ghar",
          question: "What is the PM Surya Ghar Yojana for a housing society?",
          answer:
            "PM Surya Ghar Muft Bijli Yojana is the central government's flagship rooftop solar scheme launched in 2024. For housing societies it provides:\n\n• Capital subsidy of ₹18,000/kW for the society's qualifying common-area capacity (subject to scheme caps and updates).\n\n• A simplified single-window registration on the National Portal.\n\n• Empanelled vendors with verified credentials (we are listed there).\n\n• Concessional bank loans at lower interest rates for societies opting for EMI.\n\nSocieties have to register the proposed system, get a technical feasibility approval from the local discom, install via an empanelled vendor, and the subsidy is disbursed post-inspection. We handle every step of this for our society customers.",
        },
        {
          id: "soc-rooftop-space",
          question: "How much rooftop space is needed for a solar installation?",
          answer:
            "Rough rule: about 100 sq ft per kW of installed solar. So a 50 kW system (a typical mid-size society's common-area requirement) needs ~5,000 sq ft of unshaded roof area.\n\nIf the rooftop is shared between water tanks, pump rooms, AC condensers, and so on, we use elevated mounting structures that recover the area underneath — so the practical 'lost' rooftop is much smaller than people assume. The free site visit gives you an exact map of what fits.",
        },
      ],
    },
    {
      id: "maintenance",
      label: "Maintenance & operations",
      icon: Wrench,
      items: [
        {
          id: "soc-maintenance",
          question: "What maintenance does a solar system require?",
          answer:
            "Routine maintenance is minimal but important:\n\n• Panel cleaning every 4–6 weeks (dust + bird droppings cut output by 5–15% otherwise).\n• Quarterly inspection of inverters, cables, junction boxes, and earthing.\n• Annual generation audit + thermal scan of the array.\n\nFor our society customers all of this is bundled into a 5-year free maintenance plan. After year 5, an extendable AMC keeps everything running. The society sees the same generation in year 10 as in year 1.",
        },
        {
          id: "soc-safety-longevity",
          question: "How do we ensure the safety and longevity of the solar installation?",
          answer:
            "On the design side: panels are mounted on engineered structures rated for high wind speed (we use ≥150 kmph rated mounts in Indian conditions), proper earthing and lightning protection, and inverters with surge protection.\n\nOn the operations side: an online monitoring dashboard flags any panel underperformance the same day, scheduled cleaning + inspection visits, and a 24×7 incident response line for the society manager.\n\nLifespan: tier-1 panels carry a 25-year linear performance warranty (panels still produce ≥80% of original after 25 years), inverters last 10–12 years and are covered/replaced under our service plan.",
        },
        {
          id: "soc-low-generation",
          question: "What happens if solar generation is lower than expected?",
          answer:
            "Our quote includes a generation guarantee — a kWh number we commit to per year, calculated using your specific roof orientation, shading, and tilt. If the system underperforms the guarantee for any reason that's on us (panel defect, soiling neglect, inverter issue), we make it right at our cost.\n\nIf the shortfall is due to factors clearly outside the system (extended power outages, abnormal weather year), we still investigate transparently and share the full generation logs from the monitoring app.",
        },
      ],
    },
    {
      id: "system",
      label: "The system",
      icon: Cog,
      items: [
        {
          id: "soc-best-panel",
          question: "Which solar panel is best for residential societies?",
          answer:
            "For Indian residential societies we typically recommend tier-1 mono-PERC or TOPCon panels in the 540–580 Wp range. Reasons:\n\n• Higher efficiency means more kW from the same rooftop area — important for societies where roof space is shared with tanks and AC units.\n\n• Better high-temperature performance (real Indian summers stress lower-tier panels).\n\n• 25-year linear performance warranty + 12-year product warranty as standard.\n\nWe stick to 5 vetted panel brands and never use unbranded or grey-market modules. The brand we recommend for your society depends on availability + price at the time of installation, but we always share the exact spec sheet for sign-off before purchase.",
        },
      ],
    },
  ],
  stillHaveQuestions: {
    heading: "Still have questions?",
    body: "Society decisions deserve thorough answers. Talk to our team on WhatsApp — we'll send you a detailed proposal you can circulate to your committee.",
    whatsappPrompt:
      "Hi! Our society is exploring rooftop solar — could you share a proposal we can take to the AGM?",
    whatsappLabel: "Chat on WhatsApp",
    callLabel: "Call us",
  },
};
