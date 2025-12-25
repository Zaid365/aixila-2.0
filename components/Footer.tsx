
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FooterProps {
  onOpenModal: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenModal }) => {
  return (
    <footer className="bg-white pt-12 pb-12">
      <div className="container mx-auto px-4">
        {/* Massive CTA Section */}
        <div className="bg-[#0B3B2C] rounded-[60px] p-12 md:p-32 text-center mb-24 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none"></div>
          <h2 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter relative z-10">
            Start Filling Your Pipeline
          </h2>
          <p className="text-emerald-400 text-2xl font-bold mb-10 relative z-10">
            Ready to book meetings that actually close?
          </p>
          <p className="text-white/40 text-lg mb-16 max-w-2xl mx-auto relative z-10 font-medium">
            Let's talk about getting you 4-6 qualified meetings monthly with decision-makers in healthcare, logistics, and manufacturing.
          </p>
          <button 
            onClick={onOpenModal}
            className="bg-[#1b5e4a] text-white px-12 py-5 rounded-2xl font-bold text-xl hover:bg-emerald-700 transition-all flex items-center gap-2 mx-auto relative z-10 shadow-2xl active:scale-95"
          >
            Let's Talk
            <ArrowRight size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-24 px-6">
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-black flex items-center justify-center rounded-md">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18M7 12h10M11 18h2" />
                </svg>
              </div>
              <span className="font-bold text-2xl tracking-tighter uppercase text-black">PIPELINE</span>
            </div>
            <p className="text-black font-bold leading-relaxed max-w-xs">
              End-to-end outbound for custom software companies selling into complex B2B verticals.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-black mb-8 uppercase tracking-widest text-xs">Services</h4>
            <ul className="space-y-4">
              <li><a href="#services" className="text-black font-bold hover:text-black/70 transition-colors">Lead Research</a></li>
              <li><a href="#services" className="text-black font-bold hover:text-black/70 transition-colors">Multi-Channel Outreach</a></li>
              <li><a href="#services" className="text-black font-bold hover:text-black/70 transition-colors">Meeting Qualification</a></li>
              <li><a href="#services" className="text-black font-bold hover:text-black/70 transition-colors">ABM Campaigns</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-black mb-8 uppercase tracking-widest text-xs">Industries</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-black font-bold hover:text-black/70 transition-colors">Healthcare</a></li>
              <li><a href="#" className="text-black font-bold hover:text-black/70 transition-colors">Logistics</a></li>
              <li><a href="#" className="text-black font-bold hover:text-black/70 transition-colors">Manufacturing</a></li>
              <li><a href="#" className="text-black font-bold hover:text-black/70 transition-colors">Supply Chain</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 px-6">
          <p className="text-xs text-black font-bold">© 2024 PIPELINE. Built by <span className="text-black font-extrabold underline">Gen Z.</span></p>
          <div className="flex gap-8">
            <a href="#" className="text-xs text-black font-bold hover:text-black/70 transition-colors">Privacy</a>
            <a href="#" className="text-xs text-black font-bold hover:text-black/70 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
