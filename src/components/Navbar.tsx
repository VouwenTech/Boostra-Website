
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import boostraLogo from '@/assets/boostra-logo.svg';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="py-5 bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container px-4 mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img src={boostraLogo} alt="Boostra Logo" className="h-10 w-auto" />
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-boostra-dark font-medium hover:text-boostra-blue transition-colors">
            Home
          </Link>
          <Link to="/about" className="text-boostra-dark font-medium hover:text-boostra-blue transition-colors">
            About Us
          </Link>
          <Link to="/services" className="text-boostra-dark font-medium hover:text-boostra-blue transition-colors">
            Services
          </Link>
          <Link to="/pricing" className="text-boostra-dark font-medium hover:text-boostra-blue transition-colors">
            Pricing
          </Link>
          <Button className="bg-boostra-blue text-white rounded-full hover:bg-boostra-blue/90">
            Contact Us
          </Button>
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
              to="/" 
              className="text-boostra-dark font-medium hover:text-boostra-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-boostra-dark font-medium hover:text-boostra-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/services" 
              className="text-boostra-dark font-medium hover:text-boostra-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/pricing" 
              className="text-boostra-dark font-medium hover:text-boostra-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Button className="bg-boostra-blue text-white rounded-full hover:bg-boostra-blue/90 w-full">
              Contact Us
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
