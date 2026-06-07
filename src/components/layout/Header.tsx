"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MegaMenu } from "./MegaMenu";
import { MobileSolutionsMenu } from "./MobileSolutionsMenu";
import { SPRING_PRESS, PRESS_HOVER, PRESS_TAP } from "@/lib/motion";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const pathname = usePathname();

  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255,255,255,0)", "rgba(255,255,255,1)"]
  );
  const borderBottomColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(229,231,235,0)", "rgba(229,231,235,0.5)"]
  );
  const boxShadow = useTransform(
    scrollY,
    [0, 100],
    ["0 1px 2px 0 rgba(0,0,0,0)", "0 1px 2px 0 rgba(0,0,0,0.06)"]
  );

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleHomeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      event.preventDefault();
      if (window.location.hash) {
        history.replaceState(null, "", "/");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const isHomePage = pathname === "/";

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 border-b ${
        isMobileMenuOpen
          ? "bg-white border-gray-200/50 shadow-sm"
          : !isHomePage
            ? "bg-white border-gray-200/50 shadow-sm"
            : ""
      }`}
      style={
        isMobileMenuOpen || !isHomePage
          ? undefined
          : { backgroundColor, borderBottomColor, boxShadow }
      }
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between py-5">
          {/* Logo */}
          <Link href="/" onClick={handleHomeClick} className="flex items-center space-x-2.5">
            <Image
              src="/logo.svg"
              alt="Irradiant Energie"
              width={44}
              height={52}
              className="h-11 w-auto sm:h-12"
            />
            <Image
              src="/logo-text.svg"
              alt="Irradiant Energie"
              width={160}
              height={52}
              className="h-7 w-auto sm:h-8"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Home Link */}
            <Link
              href="/"
              onClick={handleHomeClick}
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
                type="button"
                aria-haspopup="menu"
                aria-expanded={isSolutionsOpen}
                onClick={() => setIsSolutionsOpen((prev) => !prev)}
                onFocus={() => setIsSolutionsOpen(true)}
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
              href="/about"
              className="nav-link text-sm font-medium transition-colors text-[#6F6F6F] hover:text-[#000000]"
            >
              About
            </Link>
            <Link
              href="/#contact"
              className="nav-link text-sm font-medium transition-colors text-[#6F6F6F] hover:text-[#000000]"
            >
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center">
            <motion.div
              whileHover={PRESS_HOVER}
              whileTap={PRESS_TAP}
              transition={SPRING_PRESS}
            >
              <Link href="/get-quote">
                <Button
                  className="bg-[#52842D] hover:bg-[#446F26] text-white rounded-full px-6 py-2.5 text-sm"
                >
                  Get Quote
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
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
          <div id="mobile-nav" className="lg:hidden pb-6 border-t border-gray-100 bg-white">
            <nav className="flex flex-col space-y-4 pt-4">
              {/* Home */}
              <Link
                href="/"
                onClick={(e) => {
                  handleHomeClick(e);
                  closeMobileMenu();
                }}
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
                href="/about"
                onClick={closeMobileMenu}
                className="text-base font-medium transition-colors text-[#6F6F6F] hover:text-[#000000]"
              >
                About
              </Link>
              <Link
                href="/#contact"
                onClick={closeMobileMenu}
                className="text-base font-medium transition-colors text-[#6F6F6F] hover:text-[#000000]"
              >
                Contact
              </Link>

              <motion.div
                whileHover={PRESS_HOVER}
                whileTap={PRESS_TAP}
                transition={SPRING_PRESS}
                className="w-full mt-2"
              >
                <Link href="/get-quote" onClick={closeMobileMenu} className="block">
                  <Button
                    className="bg-[#52842D] hover:bg-[#446F26] text-white rounded-full px-6 py-2.5 text-sm w-full"
                  >
                    Get Quote
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            </nav>
          </div>
        )}
      </div>
    </motion.header>
  );
}
