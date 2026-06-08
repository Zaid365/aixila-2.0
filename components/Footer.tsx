import React from 'react';
import { ArrowRight, Terminal } from 'lucide-react';

interface FooterProps {
  onOpenModal: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenModal }) => {
  return (
    <footer className="bg-brand-creamDark border-t border-brand-border pt-20 pb-12">
      <div className="container mx-auto px-6">
        
        {/* Massive Final CTA Section */}
        <div className="bg-brand-charcoal text-white rounded-2xl p-10 md:p-16 text-center mb-20 relative overflow-hidden shadow-xl border border-brand-charcoal">
          <div className="absolute inset-0 radial-glow opacity-30 pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-none">
              Ready to terminate the Feast-Famine loop?
            </h2>
            <p className="text-brand-accent tracking-widest uppercase font-mono text-xs font-bold mb-6">
              $0 retainer. Strict pay-per-meeting performance alignment.
            </p>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-12 max-w-2xl mx-auto font-medium">
              We absorb 100% of the customer acquisition risk. You only talk to pre-vetted CTOs and founders in the US and UK who actively want to hire custom developers or buy premium SaaS solutions.
            </p>
            
            <button 
              onClick={onOpenModal}
              className="bg-brand-accent hover:bg-brand-accentHover text-white px-10 py-5 rounded-xl font-extrabold text-base sm:text-lg transition-all duration-300 flex items-center gap-3.5 mx-auto active:scale-95 group shadow-lg shadow-brand-accent/20"
            >
              <span>Secure My Campaign Deployment</span>
              <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          </div>
          
        </div>

        {/* Footer Meta */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16 px-2">
          
          {/* Col 1 */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-white border border-brand-border flex items-center justify-center rounded-lg shadow-sm">
                <Terminal size={14} className="text-brand-accent" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-brand-charcoal font-mono">AIXILA</span>
            </div>
            <p className="text-brand-slate text-xs sm:text-sm max-w-md leading-relaxed font-semibold">
              We compile and scale hyper-targeted cold outreach ecosystems for custom software agencies, digital dev houses, and tech startups. Built by young developers, operating with absolute engineering transparency.
            </p>
          </div>

          {/* Col 2 */}
          <div className="md:col-span-6 md:text-right flex flex-col justify-end space-y-4">
            <div className="space-y-1">
              <p className="text-xs font-mono font-bold text-brand-slate uppercase tracking-widest">Active nodes</p>
              <p className="text-brand-charcoal font-bold text-xs sm:text-sm">London, UK & Austin, TX (Serving US + UK Markets)</p>
            </div>
            <div className="flex gap-4 md:justify-end text-xs font-mono text-brand-slate font-bold">
              <a href="#pain" className="hover:text-brand-accent transition-colors">The Pain Loop</a>
              <span className="text-neutral-300 font-normal">//</span>
              <a href="#process" className="hover:text-brand-accent transition-colors">Engine Pipeline</a>
              <span className="text-neutral-300 font-normal">//</span>
              <a href="#simulator" className="hover:text-brand-accent transition-colors">ROI Simulator</a>
            </div>
          </div>

        </div>

        {/* Copyrights and Sync status */}
        <div className="pt-8 border-t border-brand-border flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-brand-slate px-2">
          <p>© 2026 AIXILA. No sales fluff. All engine code compiled locally.</p>
          <div className="flex items-center gap-1.5 bg-white border border-brand-border px-2.5 py-1 rounded text-brand-charcoal shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent pulse-neon"></span>
            <span className="font-bold uppercase text-[9px]">SYSTEM CONDUIT ACTIVE (UK/US VERIFIED)</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
