"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight, ChevronDown, Sun, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  {
    name: "Solar Panels",
    href: "#products",
    description: "Premium panels with installation",
    icon: Sun,
    iconColor: "text-[#8EBE34]",
    iconBg: "bg-[#8EBE34]/10",
  },
  {
    name: "Smart Box",
    href: "#products",
    description: "Coming Soon",
    icon: Zap,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10",
    badge: "Soon",
  },
  {
    name: "P2P Trading",
    href: "#products",
    description: "Sell your excess energy",
    icon: Users,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
  },
];

const navLinks = [
  { name: "Home", href: "/", active: true },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between py-5">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.svg"
              alt="Irradiant Energies"
              width={32}
              height={38}
              className="h-9 w-auto"
            />
            <Image
              src="/logo-text.svg"
              alt="Irradiant Energies"
              width={120}
              height={40}
              className="h-6 w-auto hidden sm:block"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  link.active
                    ? "text-[#000000]"
                    : "text-[#6F6F6F] hover:text-[#000000]"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsProductsOpen(true)}
              onMouseLeave={() => setIsProductsOpen(false)}
            >
              <button
                className="flex items-center gap-1 text-sm font-medium text-[#6F6F6F] hover:text-[#000000] transition-colors"
              >
                Products
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isProductsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-200 ${
                  isProductsOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                }`}
              >
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 min-w-[280px]">
                  {products.map((product) => (
                    <Link
                      key={product.name}
                      href={product.href}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                    >
                      <div className={`p-2 rounded-lg ${product.iconBg}`}>
                        <product.icon className={`w-5 h-5 ${product.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-[#1d1d1f] group-hover:text-[#8EBE34] transition-colors">
                            {product.name}
                          </span>
                          {product.badge && (
                            <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full font-medium">
                              {product.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-[#6F6F6F]">
                          {product.description}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <Button
              className="bg-[#8EBE34] hover:bg-[#7AA82D] text-white rounded-full px-6 py-2.5 text-sm transition-all duration-300 hover:scale-[1.03]"
            >
              Get Quote
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md transition-colors text-[#1d1d1f] hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-6 border-t border-gray-100">
            <nav className="flex flex-col space-y-4 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-base font-medium transition-colors ${
                    link.active
                      ? "text-[#000000]"
                      : "text-[#6F6F6F] hover:text-[#000000]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile Products */}
              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs uppercase tracking-wider text-[#6F6F6F] mb-3">Products</p>
                {products.map((product) => (
                  <Link
                    key={product.name}
                    href={product.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-2"
                  >
                    <div className={`p-1.5 rounded-lg ${product.iconBg}`}>
                      <product.icon className={`w-4 h-4 ${product.iconColor}`} />
                    </div>
                    <span className="text-sm text-[#1d1d1f]">{product.name}</span>
                    {product.badge && (
                      <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full font-medium">
                        {product.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>

              <Button
                className="bg-[#8EBE34] hover:bg-[#7AA82D] text-white rounded-full px-6 py-2.5 text-sm w-full mt-2"
              >
                Get Quote
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
