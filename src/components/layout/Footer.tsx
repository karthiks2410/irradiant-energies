import Link from "next/link";
import { Sun, Zap, Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { COMPANY } from "@/lib/constants";

const footerLinks = {
  products: [
    { name: "Solar Panels", href: "#solar" },
    { name: "Smart Energy Box", href: "#smartbox" },
    { name: "P2P Trading", href: "#p2p" },
    { name: "Enterprise Solutions", href: "#enterprise" },
  ],
  company: [
    { name: "About Us", href: "#about" },
    { name: "Our Mission", href: "#mission" },
    { name: "Careers", href: "#careers" },
    { name: "Blog", href: "#blog" },
  ],
  support: [
    { name: "Contact Us", href: "#contact" },
    { name: "FAQs", href: "#faq" },
    { name: "Installation Guide", href: "#guide" },
    { name: "Warranty", href: "#warranty" },
  ],
};

const socialLinks = [
  {
    name: "Instagram",
    href: "#",
    logo: "https://img.logo.dev/instagram.com?token=pk_HTrnQ1UQST6HmLe5roSfjg",
  },
  {
    name: "LinkedIn",
    href: "#",
    logo: "https://img.logo.dev/linkedin.com?token=pk_HTrnQ1UQST6HmLe5roSfjg",
  },
  {
    name: "Facebook",
    href: "#",
    logo: "https://img.logo.dev/facebook.com?token=pk_HTrnQ1UQST6HmLe5roSfjg",
  },
];

export function Footer() {
  return (
    <footer className="bg-white border-t border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="relative w-10 h-10">
                <Sun className="w-10 h-10 text-orange-500" />
                <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-orange-600" />
              </div>
              <span className="text-xl font-bold text-[#1d1d1f]">Irradiant Energies</span>
            </Link>
            <p className="text-[#6e6e73] mb-6 max-w-sm">
              Powering India's clean energy future with innovative solar solutions and smart energy management systems.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors overflow-hidden"
                  aria-label={social.name}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={social.logo}
                    alt={social.name}
                    width={20}
                    height={20}
                    className="rounded-sm"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-[#1d1d1f] font-semibold mb-4">Products</h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[#6e6e73] hover:text-orange-500 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[#1d1d1f] font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[#6e6e73] hover:text-orange-500 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-[#1d1d1f] font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[#6e6e73] hover:text-orange-500 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-black/5" />

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap gap-6 text-sm">
            <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 text-[#6e6e73] hover:text-orange-500">
              <Mail className="w-4 h-4" />
              {COMPANY.email}
            </a>
            <a href={`tel:${COMPANY.whatsapp}`} className="flex items-center gap-2 text-[#6e6e73] hover:text-orange-500">
              <Phone className="w-4 h-4" />
              {COMPANY.phone}
            </a>
            <span className="flex items-center gap-2 text-[#6e6e73]">
              <MapPin className="w-4 h-4" />
              {COMPANY.address}
            </span>
          </div>
          <p className="text-sm text-[#86868b]">
            &copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
