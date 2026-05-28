"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { COMPANY } from "@/lib/constants";
import { EASE_OUT_EXPO } from "@/lib/motion";

const footerLinks = {
  solutions: [
    { name: "Solar", href: "/solutions/solar/home/on-grid" },
    { name: "Energy Storage", href: "/solutions/ess/bess" },
    { name: "EV Charging", href: "/solutions/ev-charging/grid-dependent" },
    { name: "Virtual Power Plant", href: "/discover/vpp" },
    { name: "P2P Trading", href: "/discover/p2p-trading" },
  ],
  company: [
    { name: "About Us", href: "/#about" },
    { name: "Discover", href: "/discover" },
  ],
  support: [
    { name: "Get a Quote", href: "/get-quote" },
    { name: "Contact Us", href: "/#contact" },
  ],
};

const socialLinks = [
  {
    name: "Instagram",
    href: "",
    logo: "https://img.logo.dev/instagram.com?token=pk_HTrnQ1UQST6HmLe5roSfjg",
  },
  {
    name: "LinkedIn",
    href: "",
    logo: "https://img.logo.dev/linkedin.com?token=pk_HTrnQ1UQST6HmLe5roSfjg",
  },
  {
    name: "Facebook",
    href: "",
    logo: "https://img.logo.dev/facebook.com?token=pk_HTrnQ1UQST6HmLe5roSfjg",
  },
  {
    name: "X",
    href: "",
    logo: "https://img.logo.dev/x.com?token=pk_HTrnQ1UQST6HmLe5roSfjg",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

export function Footer() {
  return (
    <footer className="bg-white border-t border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {/* Brand */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <Image
                src="/logo.svg"
                alt="Irradiant Energie"
                width={40}
                height={47}
                className="h-10 w-auto"
              />
              <Image
                src="/logo-text.svg"
                alt="Irradiant Energie"
                width={150}
                height={50}
                className="h-7 w-auto"
              />
            </Link>
            <p className="text-[#6e6e73] mb-6 max-w-sm">
              Powering India's clean energy future with innovative solar solutions and smart energy management systems.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors overflow-hidden"
                  aria-label={`${social.name} (opens in new tab)`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={social.logo}
                    alt=""
                    aria-hidden="true"
                    width={20}
                    height={20}
                    loading="lazy"
                    className="rounded-sm"
                  />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Solutions */}
          <motion.div variants={itemVariants}>
            <h3 className="text-[#1d1d1f] font-semibold mb-4">Solutions</h3>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[#6e6e73] hover:text-[#52842D] transition-colors hover:translate-x-1 transition-transform duration-200 inline-block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants}>
            <h3 className="text-[#1d1d1f] font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[#6e6e73] hover:text-[#52842D] transition-colors hover:translate-x-1 transition-transform duration-200 inline-block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div variants={itemVariants}>
            <h3 className="text-[#1d1d1f] font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[#6e6e73] hover:text-[#52842D] transition-colors hover:translate-x-1 transition-transform duration-200 inline-block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <Separator className="my-8 bg-black/5" />

        {/* Contact Info */}
        <motion.div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT_EXPO }}
        >
          <div className="flex flex-wrap gap-6 text-sm">
            <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 text-[#6e6e73] hover:text-[#52842D]">
              <Mail className="w-4 h-4" />
              {COMPANY.email}
            </a>
            <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-2 text-[#6e6e73] hover:text-[#52842D]">
              <Phone className="w-4 h-4" />
              {COMPANY.phone} / {COMPANY.phoneSecondary}
            </a>
            <span className="flex items-center gap-2 text-[#6e6e73]">
              <MapPin className="w-4 h-4" />
              {COMPANY.address}
            </span>
          </div>
          <p className="text-sm text-[#86868b]">
            &copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
