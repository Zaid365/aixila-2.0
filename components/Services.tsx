import React from 'react';
import { Target, MessageSquare, BadgeCent, Database, ArrowRight } from 'lucide-react';

interface ServicesProps {
  onOpenModal: () => void;
}

const Services: React.FC<ServicesProps> = ({ onOpenModal }) => {
  return (
    <section id="services-details" className="py-28 bg-[#FAF8F5] border-t border-brand-border relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Module Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="font-mono text-xs font-bold text-brand-accent uppercase tracking-widest mb-3">
              The Technology Stack
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-brand-charcoal tracking-tight leading-tight">
              A sales machine engineered for high-end tech services.
            </h2>
          </div>
          
          <button 
            onClick={onOpenModal}
            className="flex items-center gap-2 bg-brand-charcoal hover:bg-black px-6 py-4 rounded-xl text-xs font-bold text-white transition-all duration-300 shadow-sm active:scale-95 whitespace-nowrap self-stretch lg:self-auto justify-center uppercase tracking-widest font-mono"
          >
            <span>Book Strategy Session</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Pillar 1 */}
          <div className="bg-white border border-brand-border rounded-2xl p-8 hover:border-brand-accent/30 hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 bg-brand-accent/5 text-brand-accent rounded-xl flex items-center justify-center mb-6 border border-brand-accent/10">
              <Database size={20} />
            </div>
            <h3 className="text-xl font-bold text-brand-charcoal mb-3">Custom Technology Sourcing</h3>
            <p className="text-brand-slate text-sm leading-relaxed mb-6 font-medium">
              We don't search basic keywords like "Software." We scrape package JSON files, DNS records, and GitHub activities to find companies utilizing specific stacks (e.g. migrating from legacy PHP to React/NextJS), ensuring they are active, well-funded, and ready to hire structural development assistance.
            </p>
            <div className="h-[1px] w-full bg-brand-border/60 mb-4"></div>
            <span className="text-[11px] font-mono text-brand-slate font-semibold">Includes: SPF audits, GitHub scanning, API lookups</span>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white border border-brand-border rounded-2xl p-8 hover:border-brand-accent/30 hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 bg-brand-accent/5 text-brand-accent rounded-xl flex items-center justify-center mb-6 border border-brand-accent/10">
              <MessageSquare size={20} />
            </div>
            <h3 className="text-xl font-bold text-brand-charcoal mb-3">Developer-fluent Copywriting</h3>
            <p className="text-brand-slate text-sm leading-relaxed mb-6 font-medium">
              Nothing turns off a CTO faster than sales reps who don't know the difference between Java and Javascript. We draft clean, crisp emails written in your natural technical dialect. We write about latency, technical debt, modular deployments, and database loads—conversations that earn professional respect.
            </p>
            <div className="h-[1px] w-full bg-brand-border/60 mb-4"></div>
            <span className="text-[11px] font-mono text-brand-slate font-semibold">Includes: Custom copywriting logs, strict peer review</span>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white border border-brand-border rounded-2xl p-8 hover:border-brand-accent/30 hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 bg-brand-accent/5 text-brand-accent rounded-xl flex items-center justify-center mb-6 border border-brand-accent/10">
              <BadgeCent size={20} />
            </div>
            <h3 className="text-xl font-bold text-brand-charcoal mb-3">Pure Pay-Per-Meeting Model</h3>
            <p className="text-brand-slate text-sm leading-relaxed mb-6 font-medium">
              No retainer. No setup charges. No 3-month contract commitments. You only pay for meetings that actually happen with accounts that match your exact filters. If a lead isn't qualified, doesn't show up, or isn't actually looking for developers, you pay zero dollars. This forces us to focus solely on high-value, high-intent targets.
            </p>
            <div className="h-[1px] w-full bg-brand-border/60 mb-4"></div>
            <span className="text-[11px] font-mono text-brand-slate font-semibold">Includes: 100% money-back check, secure billing</span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Services;
