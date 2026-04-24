export const COMPANY = {
  name: "IRRADIANT ENERGIES",
  tagline: "Power. Intelligently.",
  description: "India's first complete solar ecosystem — from rooftop to revenue.",
  phone: "+91 98765 43210",
  email: "hello@irradiantenergies.in",
  address: "Bangalore, Karnataka, India",
  whatsapp: "919876543210",
};

export const NAV_LINKS = {
  solutions: [
    { name: "Solar Panels", href: "/solar-panels", description: "Capture sunlight. Cut bills." },
    { name: "Water Heaters", href: "/solar-water-heater", description: "Hot water, zero guilt." },
    { name: "Smart Box", href: "/smart-box", description: "Coming Soon", badge: "New" },
    { name: "P2P Trading", href: "/p2p-trading", description: "Sell what you don't use." },
  ],
  discover: [
    { name: "Why Solar", href: "/why-solar" },
    { name: "Government Schemes", href: "/government-schemes" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
};

export const PRODUCTS = [
  {
    id: "solar-panels",
    name: "Solar Panels",
    tagline: "Capture sunlight. Cut bills.",
    description: "Premium panels with professional installation. Government subsidies handled.",
    image: "/solar-panel.jpg",
    href: "/solar-panels",
  },
  {
    id: "smart-box",
    name: "Smart Box",
    tagline: "Your home's energy brain.",
    description: "Intelligence that learns your home and optimizes every watt.",
    image: "/smart-box.jpg",
    href: "/smart-box",
    badge: "Coming Soon",
  },
  {
    id: "p2p-trading",
    name: "P2P Trading",
    tagline: "Sell what you don't use.",
    description: "India's peer-to-peer energy trading — coming to Karnataka first.",
    image: "/p2p-trading.jpg",
    href: "/p2p-trading",
  },
];

export const STATS = [
  { value: "78,000", label: "Subsidy Amount (₹)", suffix: "+" },
  { value: "50.9", label: "Solar Growth Since 2014", suffix: "x" },
  { value: "1", label: "Crore Households Target", suffix: "Cr" },
  { value: "25", label: "Year Warranty", suffix: "Yrs" },
];
