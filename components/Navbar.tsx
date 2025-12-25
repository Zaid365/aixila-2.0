
import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

interface NavbarProps {
  onOpenModal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-8 h-8 bg-black flex items-center justify-center rounded-md">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18M7 12h10M11 18h2" />
            </svg>
          </div>
          <span className="font-bold text-xl tracking-tight uppercase text-black">PIPELINE</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#home" className="text-[15px] font-medium text-black hover:text-black/70 transition-colors">Home</a>
          <a href="#about" className="text-[15px] font-medium text-black hover:text-black/70 transition-colors">About</a>
          <a href="#services" className="text-[15px] font-medium text-black hover:text-black/70 transition-colors">Services</a>
          <a href="#results" className="text-[15px] font-medium text-black hover:text-black/70 transition-colors">Results</a>
          <a href="#testimonials" className="text-[15px] font-medium text-black hover:text-black/70 transition-colors">Testimonials</a>
        </div>

        <button 
          onClick={onOpenModal}
          className="flex items-center gap-2 border border-gray-200 bg-white px-6 py-2.5 rounded-full text-[15px] font-semibold text-black hover:border-black transition-all"
        >
          <span>Let's Talk</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
