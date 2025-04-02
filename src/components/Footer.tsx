
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Linkedin, Mail, PhoneCall } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-boostra-blue to-boostra-pink flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="font-bold text-2xl text-boostra-dark">Boostra</span>
            </Link>
            <p className="text-boostra-gray mb-6">
              Helping Shopify stores convert more visitors into customers through data-driven optimization.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-boostra-gray hover:text-boostra-blue transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-boostra-gray hover:text-boostra-blue transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-boostra-gray hover:text-boostra-blue transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-boostra-gray hover:text-boostra-blue transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-boostra-gray hover:text-boostra-blue transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-boostra-gray hover:text-boostra-blue transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-boostra-gray hover:text-boostra-blue transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services/cro" className="text-boostra-gray hover:text-boostra-blue transition-colors">
                  Conversion Optimization
                </Link>
              </li>
              <li>
                <Link to="/services/analytics" className="text-boostra-gray hover:text-boostra-blue transition-colors">
                  Analytics Setup
                </Link>
              </li>
              <li>
                <Link to="/services/audits" className="text-boostra-gray hover:text-boostra-blue transition-colors">
                  Store Audits
                </Link>
              </li>
              <li>
                <Link to="/services/growth" className="text-boostra-gray hover:text-boostra-blue transition-colors">
                  Growth Strategy
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-boostra-gray">
                <Mail size={18} />
                <a href="mailto:hello@boostra.com" className="hover:text-boostra-blue transition-colors">
                  hello@boostra.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-boostra-gray">
                <PhoneCall size={18} />
                <a href="tel:+1234567890" className="hover:text-boostra-blue transition-colors">
                  (123) 456-7890
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
            <Link to="/privacy" className="text-boostra-gray hover:text-boostra-blue transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-boostra-gray hover:text-boostra-blue transition-colors text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
