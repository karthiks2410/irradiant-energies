/**
 * Editable copy for /solutions/solar/commercial. Currently only the FAQ is
 * wired up — the rest of the page (lead form, journey, trust grid, stats)
 * stays lean until each section's copy is signed off for the commercial
 * audience (factories, offices, warehouses, hotels, schools, etc).
 */

import { Banknote, Receipt, Cog } from "lucide-react";
import type { FAQContent } from "./faq-types";

export const commercialFAQ: FAQContent = {
  eyebrow: "Business questions, answered",
  heading: "Commercial Solar FAQs",
  subheading:
    "What CFOs and facility heads ask us before signing off — financing models, tax treatment, payback, GST, and how it actually changes the books.",
  categories: [
    /* ─────────────────────────────────────────────────────────── */
    {
      id: "costs",
      label: "Costs & financing",
      icon: Banknote,
      items: [
        {
          id: "com-payback",
          question: "What's the payback period for a commercial solar system?",
          answer:
            "For commercial customers paying industrial / commercial tariffs (typically ₹8–₹12/kWh), payback under CAPEX with accelerated depreciation claimed is 3–4 years. Without depreciation it's 4–5 years.\n\nAfter payback, the system continues generating for another 20+ years at near-zero variable cost — turning a fixed-tariff exposure into a near-fixed-cost asset on the books.",
        },
        {
          id: "com-models",
          question: "CAPEX or OPEX (PPA) — which is right for my business?",
          answer:
            "CAPEX (you own the system): Highest savings, full ownership, you claim accelerated depreciation. Best for cash-rich businesses or companies that value the asset on the balance sheet. Capital outlay required.\n\nOPEX / PPA / RESCO (we own, you buy power): A third party invests, owns, and operates the system on your roof. You sign a 15–25 year power purchase agreement at a fixed tariff (typically 30–40% below your discom rate). Zero capex, no maintenance liability, fully off-balance-sheet.\n\nHybrid (deferred CAPEX): EMI-financed CAPEX where the savings cover the EMI from month one. Owned at the end of the loan tenure. We model all three for your specific load profile and tariff.",
        },
        {
          id: "com-financing",
          question: "Can we finance the system through a bank?",
          answer:
            "Yes. SBI, Canara, IREDA, Tata Capital, and most major banks have specific rooftop solar products for MSMEs and corporates. Typical terms: 70–80% loan-to-value, 8–11% interest, 5–10 year tenure, with the system itself as collateral.\n\nUnder PM Surya Ghar and various MNRE schemes, MSMEs get concessional rates. We help compile the financial dossier (system DPR, savings projection, payback model) the bank will need to approve.",
        },
      ],
    },
    /* ─────────────────────────────────────────────────────────── */
    {
      id: "tax",
      label: "Tax & GST",
      icon: Receipt,
      items: [
        {
          id: "com-depreciation",
          question: "What's accelerated depreciation, and how does it help?",
          answer:
            "Under Section 32 of the Income Tax Act, solar power generating systems qualify for 40% accelerated depreciation in the first year (down from 80% pre-2017). On a ₹1 crore solar system, that's a ₹40 lakh deduction in year one — which at a 25–30% effective corporate tax rate translates to a real tax saving of ₹10–12 lakh in cash, on top of the bill savings.\n\nThis is why CAPEX often beats OPEX on NPV for a profitable Indian business. Talk to your CA — depreciation is the single biggest reason commercial solar payback is so quick.",
        },
        {
          id: "com-gst",
          question: "What GST applies to a commercial solar installation?",
          answer:
            "Solar PV modules, cells, and inverters are taxed at 12% GST (a special concessional rate for renewable equipment). Mounting structures, cables, and balance-of-system components are at standard slabs (18%). Installation services are at 18%.\n\nFor businesses, the GST paid is fully eligible for input tax credit (ITC) since the system is used for business operations. Practically that means a registered business pays GST on the system and claims it back — net cost is GST-neutral.",
        },
      ],
    },
    /* ─────────────────────────────────────────────────────────── */
    {
      id: "system",
      label: "Operations & system",
      icon: Cog,
      items: [
        {
          id: "com-roof-vs-ground",
          question: "Rooftop or ground-mount — what suits our facility?",
          answer:
            "Rooftop is the default — uses unutilised roof area, no land cost, shorter approval cycle. Best for offices, factories, warehouses, schools, hospitals, hotels.\n\nGround-mount makes sense when (a) roof load capacity is limited, (b) the building has a lot of unused ground / parking area, or (c) the required system size exceeds what the roof can hold. Typical for larger industrial campuses (>500 kW) or facilities with adjacent open land.\n\nMany of our larger commercial customers do hybrid: roof + parking-shed solar (which doubles as covered parking) + a ground array. We design what fits the load curve and the available area together.",
        },
        {
          id: "com-downtime",
          question: "Will installation disrupt our business operations?",
          answer:
            "Almost never. The actual install is done in 7–14 days for systems up to 500 kW, mostly on the roof with no impact on ground-floor operations. The grid-tie / commissioning step needs a single 2–4 hour planned shutdown, which we schedule on a weekend or off-peak window of your choice.\n\nWe coordinate the entire timeline with your facility manager — including discom inspection, net-metering changeover, and final go-live — so business-as-usual is the plan, not the exception.",
        },
        {
          id: "com-monitoring",
          question: "How do we monitor and audit the system once it's running?",
          answer:
            "Every commercial install ships with a real-time monitoring portal — live generation, daily/monthly/yearly summaries, fault alerts, panel-string-level diagnostics. Your facility team and finance team get separate dashboards.\n\nFor accounting purposes the dashboard exports monthly generation reports (kWh) and rupee-savings reports (kWh × your tariff slab) in formats your CA / auditor can drop into Tally or SAP. We also provide an annual 3rd-party generation audit certificate if you need it for ISO, GRI, or BRSR sustainability reporting.",
        },
      ],
    },
  ],
  stillHaveQuestions: {
    heading: "Still have questions?",
    body: "Commercial decisions deserve real numbers. Tell us your average monthly bill and roof area, and we'll send a detailed CAPEX-vs-OPEX comparison your CFO can actually use.",
    whatsappPrompt:
      "Hi! We're a business exploring rooftop solar — can you share a CAPEX vs OPEX comparison for our facility?",
    whatsappLabel: "Chat on WhatsApp",
    callLabel: "Call us",
  },
};
