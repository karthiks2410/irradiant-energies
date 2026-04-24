"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Sun, Zap, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Products dropdown content - with images
const productsDropdown = {
  products: [
    {
      name: "Solar Panels",
      href: "#products",
      image: "/solar-panel.jpg",
      subtext: "Learn | Order",
      available: true,
    },
    {
      name: "Smart Box",
      href: "#smart-box",
      image: "/smart-box.jpg",
      subtext: "Coming Soon",
      available: false,
    },
    {
      name: "P2P Trading",
      href: "#p2p-trading",
      image: "/p2p-trading.jpg",
      subtext: "Learn",
      available: true,
    },
  ],
};

// Discover dropdown content - 3 columns with text links
// Government is now part of Discover (not a separate nav item)
const discoverDropdown = {
  columns: [
    {
      title: "Resources",
      links: [
        { name: "Why Solar", href: "#why-solar" },
        { name: "Blog", href: "#blog" },
        { name: "FAQs", href: "#faqs" },
        { name: "Video Guides", href: "#guides" },
      ],
    },
    {
      title: "Government",
      links: [
        { name: "PM Surya Ghar", href: "#government" },
        { name: "State Subsidies", href: "#state-subsidies" },
        { name: "Net Metering", href: "#net-metering" },
        { name: "Tax Benefits", href: "#tax-benefits" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#about" },
        { name: "Careers", href: "#careers" },
        { name: "Contact", href: "#contact" },
        { name: "Press", href: "#press" },
      ],
    },
  ],
};

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle dropdown hover with delay to prevent flickering
  const handleMouseEnter = (dropdown: string) => {
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const toggleMobileSection = (section: string) => {
    setMobileExpandedSection(mobileExpandedSection === section ? null : section);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-10 h-10">
              <Sun className="w-10 h-10 text-orange-500" />
              <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-orange-600" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#1d1d1f]">
              Irradiant
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("products")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="flex items-center gap-1 text-sm font-medium transition-colors text-[#1d1d1f]/80 hover:text-orange-500"
              >
                Products
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "products" ? "rotate-180" : ""}`} />
              </button>

              {/* Products Mega Menu */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${
                  activeDropdown === "products"
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                }`}
              >
                <div className="bg-white rounded-2xl shadow-2xl p-8 min-w-[650px] border border-gray-100">
                  {/* Product Images Row */}
                  <div className="grid grid-cols-3 gap-6">
                    {productsDropdown.products.map((product) => (
                      <Link
                        key={product.name}
                        href={product.href}
                        className="text-center group/item"
                      >
                        <div className="relative h-36 mb-3 rounded-xl overflow-hidden bg-gray-100">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover/item:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <p className="font-semibold text-gray-900 group-hover/item:text-orange-600 transition-colors">
                          {product.name}
                        </p>
                        <p className={`text-sm ${product.available ? "text-gray-500" : "text-orange-500 font-medium"}`}>
                          {product.subtext}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Discover Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("discover")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="flex items-center gap-1 text-sm font-medium transition-colors text-[#1d1d1f]/80 hover:text-orange-500"
              >
                Discover
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "discover" ? "rotate-180" : ""}`} />
              </button>

              {/* Discover Mega Menu - 3 columns: Resources, Government, Company */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${
                  activeDropdown === "discover"
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                }`}
              >
                <div className="bg-white rounded-2xl shadow-2xl p-8 min-w-[550px] border border-gray-100">
                  <div className="grid grid-cols-3 gap-8">
                    {discoverDropdown.columns.map((column) => (
                      <div key={column.title}>
                        <p className="text-xs uppercase tracking-wider text-gray-400 mb-3 font-semibold">
                          {column.title}
                        </p>
                        {column.links.map((link) => (
                          <Link
                            key={link.name}
                            href={link.href}
                            className="block py-2 text-gray-700 hover:text-orange-600 transition-colors"
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* CTA Button - Get Quote */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white border-orange-500 transition-all duration-300"
            >
              Get Quote
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger
              className="md:hidden"
              render={
                <button className="p-2 rounded-md transition-colors text-[#1d1d1f] hover:bg-gray-100">
                  <Menu className="w-6 h-6" />
                </button>
              }
            />
            <SheetContent side="right" className="w-[300px] bg-white">
              <div className="flex flex-col space-y-2 mt-8">
                {/* Mobile Products Section */}
                <div className="border-b border-gray-100 pb-4">
                  <button
                    onClick={() => toggleMobileSection("products")}
                    className="flex items-center justify-between w-full py-2 text-lg font-medium text-gray-900"
                  >
                    Products
                    <ChevronDown className={`w-5 h-5 transition-transform ${mobileExpandedSection === "products" ? "rotate-180" : ""}`} />
                  </button>
                  {mobileExpandedSection === "products" && (
                    <div className="pl-4 mt-2 space-y-2">
                      {productsDropdown.products.map((product) => (
                        <Link
                          key={product.name}
                          href={product.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block py-2 text-gray-700 hover:text-orange-500 transition-colors"
                        >
                          {product.name}
                          {!product.available && <span className="ml-2 text-xs text-orange-500">(Coming Soon)</span>}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Mobile Discover Section - includes Resources, Government, Company */}
                <div className="border-b border-gray-100 pb-4">
                  <button
                    onClick={() => toggleMobileSection("discover")}
                    className="flex items-center justify-between w-full py-2 text-lg font-medium text-gray-900"
                  >
                    Discover
                    <ChevronDown className={`w-5 h-5 transition-transform ${mobileExpandedSection === "discover" ? "rotate-180" : ""}`} />
                  </button>
                  {mobileExpandedSection === "discover" && (
                    <div className="pl-4 mt-2 space-y-4">
                      {discoverDropdown.columns.map((column) => (
                        <div key={column.title}>
                          <p className="text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">
                            {column.title}
                          </p>
                          {column.links.map((link) => (
                            <Link
                              key={link.name}
                              href={link.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block py-1.5 text-gray-700 hover:text-orange-500 transition-colors"
                            >
                              {link.name}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Mobile CTA Button */}
                <Button className="bg-orange-500 hover:bg-orange-600 text-white w-full mt-4">
                  Get Quote
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
