"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="py-5 bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container px-4 mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/boostra-logo.svg" alt="Boostra Logo" width={120} height={40} className="h-10 w-auto" />
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-boostra-dark font-medium hover:text-boostra-blue transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-boostra-dark font-medium hover:text-boostra-blue transition-colors">
            About Us
          </Link>
          <Link href="/services" className="text-boostra-dark font-medium hover:text-boostra-blue transition-colors">
            Services
          </Link>
          <Link href="/pricing" className="text-boostra-dark font-medium hover:text-boostra-blue transition-colors">
            Pricing
          </Link>
          <Link href="/benchmarks" className="text-boostra-dark font-medium hover:text-boostra-blue transition-colors">
            Benchmarks
          </Link>
          <a href="mailto:byron@boostra.agency">
            <Button className="bg-boostra-blue text-white rounded-full hover:bg-boostra-blue/90">
              Contact Us
            </Button>
          </a>
        </div>

        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-[72px] left-0 right-0 bg-white border-b border-gray-100 py-4 px-4 z-50">
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              className="text-boostra-dark font-medium hover:text-boostra-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-boostra-dark font-medium hover:text-boostra-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/services"
              className="text-boostra-dark font-medium hover:text-boostra-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/pricing"
              className="text-boostra-dark font-medium hover:text-boostra-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/benchmarks"
              className="text-boostra-dark font-medium hover:text-boostra-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Benchmarks
            </Link>
            <a href="mailto:byron@boostra.agency">
              <Button className="bg-boostra-blue text-white rounded-full hover:bg-boostra-blue/90 w-full">
                Contact Us
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
