import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <Image src="/boostra-logo.svg" alt="Boostra Logo" width={100} height={24} className="h-6 w-auto" />
            </Link>
            <p className="text-boostra-gray mb-6">
              Helping Shopify stores convert more visitors into customers through data-driven optimization.
            </p>
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-boostra-gray hover:text-boostra-blue transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-boostra-gray hover:text-boostra-blue transition-colors">
                  Case Studies
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services" className="text-boostra-gray hover:text-boostra-blue transition-colors">
                  CRO Audits
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-boostra-gray hover:text-boostra-blue transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/benchmarks" className="text-boostra-gray hover:text-boostra-blue transition-colors">
                  Benchmarks
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-boostra-gray">
                <Mail size={18} />
                <a href="mailto:byron@boostra.agency" className="hover:text-boostra-blue transition-colors">
                  byron@boostra.agency
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-boostra-gray text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Boostra. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-boostra-gray hover:text-boostra-blue transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-boostra-gray hover:text-boostra-blue transition-colors text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
