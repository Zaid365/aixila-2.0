import React from 'react';
import { Cpu, Code2, Disc, Play } from 'lucide-react';

const Process: React.FC = () => {
  return (
    <section id="process" className="py-28 bg-brand-creamDark border-t border-brand-border relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="mb-20 animate-fade-in">
          <div className="font-mono text-xs font-bold text-brand-accent uppercase tracking-widest mb-3">
            The Campaign Compilation Process
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-brand-charcoal tracking-tight leading-tight">
            The Aixila Outbound Compiler Pipeline
          </h2>
          <p className="text-brand-slate mt-4 max-w-2xl text-base sm:text-lg">
            We don't buy dirty lists and blast them with Mailchimp. We compile campaigns using specific technical parameters, ensuring your email lands in the primary tab and reads like it was written by an expert peer.
          </p>
        </div>

        {/* Pipeline Schema */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Stage 1 */}
          <div className="bg-white border border-brand-border rounded-2xl p-8 flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="font-mono text-[10px] text-brand-slate font-bold uppercase tracking-widest bg-brand-creamDark border border-brand-border px-2 py-1 rounded">
                  STAGE_01
                </span>
                <span className="text-xs text-brand-accent font-mono font-bold">LEXICAL_QUERY</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-brand-accent/5 border border-brand-accent/10 flex items-center justify-center text-brand-accent mb-6">
                <Cpu size={18} />
              </div>
              <h4 className="text-lg font-bold text-brand-charcoal mb-3">Precision Filtering</h4>
              <p className="text-brand-slate text-xs leading-relaxed">
                We query custom data layers to extract companies running specific software (e.g. Postgres, Next.js, FastAPI). We trace funding events and verify they actually have budget and open engineering pipelines in the UK + US.
              </p>
            </div>
            <div className="h-[1px] w-full bg-brand-border/60 my-6"></div>
            <span className="text-[10px] font-mono text-brand-slate font-semibold">INPUT: Developer Tech Footprints</span>
          </div>

          {/* Stage 2 */}
          <div className="bg-white border border-brand-border rounded-2xl p-8 flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="font-mono text-[10px] text-brand-slate font-bold uppercase tracking-widest bg-brand-creamDark border border-brand-border px-2 py-1 rounded">
                  STAGE_02
                </span>
                <span className="text-xs text-brand-accent font-mono font-bold">AST_REWRITE</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-brand-accent/5 border border-brand-accent/10 flex items-center justify-center text-brand-accent mb-6">
                <Code2 size={18} />
              </div>
              <h4 className="text-lg font-bold text-brand-charcoal mb-3">Liquid Personalization</h4>
              <p className="text-brand-slate text-xs leading-relaxed">
                Zero AI slop. We write hyper-focused templates detailing exact performance bottlenecks, cloud spending leaks, or UI inconsistencies. Each email reads as an educational tech audit, not a sales pitch.
              </p>
            </div>
            <div className="h-[1px] w-full bg-brand-border/60 my-6"></div>
            <span className="text-[10px] font-mono text-brand-slate font-semibold">OUTPUT: Human-to-Human Logs</span>
          </div>

          {/* Stage 3 */}
          <div className="bg-white border border-brand-border rounded-2xl p-8 flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="font-mono text-[10px] text-brand-slate font-bold uppercase tracking-widest bg-brand-creamDark border border-brand-border px-2 py-1 rounded">
                  STAGE_03
                </span>
                <span className="text-xs text-brand-accent font-mono font-bold">DELIVERY_EMIT</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-brand-accent/5 border border-brand-accent/10 flex items-center justify-center text-brand-accent mb-6">
                <Disc size={18} />
              </div>
              <h4 className="text-lg font-bold text-brand-charcoal mb-3">Domain Compilation</h4>
              <p className="text-brand-slate text-xs leading-relaxed">
                We purchase and warm up supplementary domains with fully aligned SPF, DKIM, DMARC, and custom tracking nodes. No risk of damaging your primary corporate brand or falling into promo boxes.
              </p>
            </div>
            <div className="h-[1px] w-full bg-brand-border/60 my-6"></div>
            <span className="text-[10px] font-mono text-brand-slate font-semibold">DMARC Strict Enforcement: YES</span>
          </div>

          {/* Stage 4 - Pop Lavender Card */}
          <div className="bg-[#E9E5FC] border border-[#7C3AED]/20 rounded-2xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="font-mono text-[10px] text-[#7C3AED] font-bold uppercase tracking-widest bg-white/65 border border-[#7C3AED]/20 px-2 py-1 rounded">
                  STAGE_04
                </span>
                <span className="text-xs text-[#7C3AED] font-mono font-bold">RUNTIME_CALLED</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#7C3AED] mb-6 shadow-sm">
                <Play size={18} className="fill-current" />
              </div>
              <h4 className="text-lg font-bold text-brand-charcoal mb-3">Qualified Calendar Hooks</h4>
              <p className="text-brand-slate text-xs leading-relaxed">
                Your calendar fills up with qualified B2B directors, technical project managers, or SaaS CEOs who explicitly asked for a call. If they show up and match your profile, you are charged. Otherwise, it's $0.
              </p>
            </div>
            <div className="h-[1px] w-full bg-[#7C3AED]/10 my-6"></div>
            <span className="text-[10px] font-mono text-[#7C3AED] font-bold">RETAINER REQUIREMENT: $0.00</span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Process;
