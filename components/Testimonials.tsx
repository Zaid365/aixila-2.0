import React from 'react';
import { AlertTriangle, Zap } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <section id="comparison" className="py-28 bg-[#FAF8F5] border-t border-brand-border relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Module Header */}
        <div className="max-w-3xl mb-20 text-left animate-fade-in">
          <div className="font-mono text-xs font-bold text-brand-accent uppercase tracking-widest mb-3">
            Architectural Alternatives
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-brand-charcoal tracking-tight mb-4">
            Why traditional SDRs fail to sell technical products.
          </h2>
          <p className="text-brand-slate text-sm sm:text-base leading-relaxed font-medium">
            Hiring a junior salesperson to sell high-ticket custom development is an expensive mistake. If they don't understand the complex tech stacks they are discussing, decision-makers filter them out as automated noise instantly.
          </p>
        </div>

        {/* Side-by-Side Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* Option A: Standard Sales Rep */}
          <div className="bg-white border border-brand-border rounded-2xl p-6 sm:p-10 space-y-8 relative shadow-sm">
            <div className="absolute top-4 right-4 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-lg text-[9px] sm:text-[10px] font-mono text-rose-600 font-bold uppercase tracking-wider">
              High Risk / Retainer Model
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 border border-rose-100 flex items-center justify-center shrink-0">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h4 className="text-brand-charcoal font-bold font-mono">Traditional Sales Rep (SDR)</h4>
                <p className="text-brand-slate text-xs mt-0.5">Salary: $5,000 - $8,000 / month flat rate</p>
              </div>
            </div>

            <div className="space-y-5 pt-4">
              
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-rose-600 uppercase">1. Slow Ramp Time (3 Month minimum)</span>
                <p className="text-brand-slate text-xs leading-relaxed font-medium">
                  You spend Month 1 and Month 2 onboarding them, explaining your tech stacks, writing their scripts, and buying their data accounts. You absorb $12,000+ in baseline salary before they book their first call.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-rose-600 uppercase">2. No Technical Fluency</span>
                <p className="text-brand-slate text-xs leading-relaxed font-medium">
                  They write generic B2B pitches about "speed and efficiency." When they get on a call with a VP of Engineering, they stumble on terms like "serverless architecture" or "Postgres cluster", killing the agency's credibility.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-rose-600 uppercase">3. High Tool Friction overhead</span>
                <p className="text-brand-slate text-xs leading-relaxed font-medium">
                  You pay for cold email sequencers, custom domain hosting, data scrapers, and CRM seat integrations. That's another $800/mo flat in structural software overhead, completely on your payroll.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-rose-600 uppercase">4. Brand Risk</span>
                <p className="text-brand-slate text-xs leading-relaxed font-medium">
                  They spray mass lists hoping to hit quotas, using templates that get your corporate domain flagged, blacklisted, or marked as low-value, leaving a trail of spam behind your core brand.
                </p>
              </div>

            </div>
          </div>

          {/* Option B: Aixila Outbound Engine - Custom Charcoal Block */}
          <div className="bg-brand-charcoal text-white border-2 border-brand-charcoal rounded-2xl p-6 sm:p-10 space-y-8 relative shadow-lg">
            <div className="absolute top-4 right-4 bg-brand-accent/20 border border-brand-accent/30 px-2.5 py-1 rounded-lg text-[9px] sm:text-[10px] font-mono text-brand-accent font-bold uppercase tracking-wider pulse-neon">
              Pay Per Meeting
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-accent/10 border border-brand-accent/20 text-[#FF5500] flex items-center justify-center shrink-0">
                <Zap size={20} className="fill-current" />
              </div>
              <div>
                <h4 className="text-white font-bold font-mono">The Aixila Outbound System</h4>
                <p className="text-brand-accent text-xs font-mono font-bold mt-0.5">$0 Retainer / Strictly Pay-Per-Meeting</p>
              </div>
            </div>

            <div className="space-y-5 pt-4">

              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-brand-accent uppercase">1. Immediate Zero-Lag launch</span>
                <p className="text-neutral-300 text-xs leading-relaxed">
                  We deploy our calibrated sending servers and warming architectures in 48 hours. No extensive onboarding required. We are active, optimized, and capturing targets within less than a week.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-brand-accent uppercase">2. Native Tech-fluent copywriting</span>
                <p className="text-neutral-300 text-xs leading-relaxed">
                  We discuss actual engineering patterns—K8s loads, React render optimizations, Docker containers, multi-tenant databases. VPs of Engineering read our messages and treat us like peer experts, not salespeople.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-brand-accent uppercase">3. We cover all technical costs</span>
                <p className="text-neutral-300 text-xs leading-relaxed">
                  We absorb the cost of scrapers, supplementary domain licensing, heating integrations, cleaning databases, and manual data validations out of our pocket. Your overhead sheet remains at flat zero.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-brand-accent uppercase">4. Hyper-Qualified Guarding</span>
                <p className="text-neutral-300 text-xs leading-relaxed">
                  Each appointment on your calendar is vetted. If a lead doesn't have budget, doesn't match your tech stack parameters, or simply fails to show up on the call—you pay nothing. Wasted outreach is our budget loss, not yours.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Testimonials;
