"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MegaMenu } from "./MegaMenu";
import { MobileSolutionsMenu } from "./MobileSolutionsMenu";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled || isMobileMenuOpen
          ? "bg-white border-b border-gray-200/50 shadow-sm"
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
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Home Link */}
            <Link
              href="/"
              className="nav-link text-sm font-medium transition-colors text-[#000000]"
            >
              Home
            </Link>

            {/* Solutions Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setIsSolutionsOpen(true)}
              onMouseLeave={() => setIsSolutionsOpen(false)}
            >
              <button
                className="nav-link flex items-center gap-1 text-sm font-medium text-[#6F6F6F] hover:text-[#000000] transition-colors"
              >
                Solutions
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isSolutionsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <MegaMenu
                isOpen={isSolutionsOpen}
                onClose={() => setIsSolutionsOpen(false)}
              />
            </div>

            {/* Other Nav Links */}
            <Link
              href="/discover"
              className="nav-link text-sm font-medium transition-colors text-[#6F6F6F] hover:text-[#000000]"
            >
              Discover
            </Link>
            <Link
              href="#about"
              className="nav-link text-sm font-medium transition-colors text-[#6F6F6F] hover:text-[#000000]"
            >
              About
            </Link>
            <Link
              href="#contact"
              className="nav-link text-sm font-medium transition-colors text-[#6F6F6F] hover:text-[#000000]"
            >
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center">
            <Button
              className="bg-[#8EBE34] hover:bg-[#7AA82D] text-white rounded-full px-6 py-2.5 text-sm transition-all duration-300 hover:scale-[1.03]"
            >
              Get Quote
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md transition-colors text-[#1d1d1f] hover:bg-gray-100"
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
          <div className="lg:hidden pb-6 border-t border-gray-100 bg-white">
            <nav className="flex flex-col space-y-4 pt-4">
              {/* Home */}
              <Link
                href="/"
                onClick={closeMobileMenu}
                className="text-base font-medium transition-colors text-[#000000]"
              >
                Home
              </Link>

              {/* Mobile Solutions Menu */}
              <MobileSolutionsMenu onLinkClick={closeMobileMenu} />

              {/* Other Links */}
              <Link
                href="/discover"
                onClick={closeMobileMenu}
                className="text-base font-medium transition-colors text-[#6F6F6F] hover:text-[#000000]"
              >
                Discover
              </Link>
              <Link
                href="#about"
                onClick={closeMobileMenu}
                className="text-base font-medium transition-colors text-[#6F6F6F] hover:text-[#000000]"
              >
                About
              </Link>
              <Link
                href="#contact"
                onClick={closeMobileMenu}
                className="text-base font-medium transition-colors text-[#6F6F6F] hover:text-[#000000]"
              >
                Contact
              </Link>

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
