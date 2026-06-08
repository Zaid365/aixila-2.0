
import React, { useState, useEffect } from 'react';
import { ChevronRight, Terminal } from 'lucide-react';

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-brand-cream/90 backdrop-blur-md border-b border-brand-border py-3.5' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5 cursor-pointer group">
          <div className="w-9 h-9 bg-white border border-brand-border flex items-center justify-center rounded-xl group-hover:border-brand-accent transition-all duration-300 shadow-sm">
            <Terminal size={16} className="text-brand-accent" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight uppercase text-brand-charcoal font-mono flex items-center gap-1.5 leading-none">
              AIXILA
              <span className="w-2 h-2 rounded-full bg-brand-accent pulse-neon"></span>
            </span>
            <span className="text-[9px] text-brand-slate font-bold uppercase tracking-wider leading-none mt-1">Outbound Engine</span>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-8">
          <a href="#home" className="text-xs font-bold text-brand-slate hover:text-brand-charcoal transition-colors uppercase tracking-wider font-mono">Home</a>
          <a href="#pain" className="text-xs font-bold text-brand-slate hover:text-brand-charcoal transition-colors uppercase tracking-wider font-mono">The Pain Loop</a>
          <a href="#process" className="text-xs font-bold text-brand-slate hover:text-brand-charcoal transition-colors uppercase tracking-wider font-mono">The Engine</a>
          <a href="#simulator" className="text-xs font-bold text-brand-slate hover:text-brand-charcoal transition-colors uppercase tracking-wider font-mono">ROI Simulator</a>
          <a href="#comparison" className="text-xs font-bold text-brand-slate hover:text-brand-charcoal transition-colors uppercase tracking-wider font-mono">The Alternative</a>
        </div>

        <button 
          onClick={onOpenModal}
          className="flex items-center gap-2 bg-brand-charcoal hover:bg-black px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all duration-300 shadow-sm active:scale-95 border border-brand-charcoal"
        >
          <span className="font-mono uppercase tracking-wider">Book a call</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
