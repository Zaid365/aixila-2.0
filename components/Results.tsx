import React, { useState } from 'react';
import { TrendingUp, ShieldCheck } from 'lucide-react';

const Results: React.FC = () => {
  // Simulator State variables
  const [dealLtv, setDealLtv] = useState<number>(35000);
  const [monthlyMeetings, setMonthlyMeetings] = useState<number>(4);
  const [demoCloseRate, setDemoCloseRate] = useState<number>(15);

  // Math Calculations
  const expectedMonthlyCloses = monthlyMeetings * (demoCloseRate / 100);
  const expectedAnnualCloses = expectedMonthlyCloses * 12;
  
  const estimatedMonthlyRevenue = expectedMonthlyCloses * dealLtv;
  const estimatedAnnualRevenue = expectedAnnualCloses * dealLtv;

  // Saved founder hours calculated
  const developerHourlyRate = 125;
  const savedHoursMonthly = monthlyMeetings * 18;
  const savedFounderCapital = savedHoursMonthly * developerHourlyRate;

  // Format currency helpers
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="simulator" className="py-28 bg-[#FAF8F5] border-t border-brand-border relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Module Header */}
        <div className="max-w-3xl mb-16 animate-fade-in">
          <div className="font-mono text-xs font-bold text-brand-accent uppercase tracking-widest mb-3">
            Outbound Math & Metrics
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-brand-charcoal tracking-tight mb-4">
            Simulate your outbound performance.
          </h2>
          <p className="text-brand-slate text-sm sm:text-base leading-relaxed">
            Move the parameters below to calculate your expected returns with Aixila. No hand-waving estimates. Pure technical equations based on average Dev Shop & SaaS conversion matrices.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs Section */}
          <div className="lg:col-span-6 bg-white border border-brand-border rounded-2xl p-6 sm:p-8 space-y-8 shadow-sm">
            <h3 className="text-base font-bold text-brand-charcoal font-mono flex items-center gap-2 pb-4 border-b border-brand-border">
              <span className="text-brand-accent">&lt;</span> Input System Parameters <span className="text-brand-accent">/&gt;</span>
            </h3>

            {/* Input 1: LTV */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-mono font-bold text-brand-slate uppercase tracking-wider">
                  Average Deal size / Client LTV:
                </label>
                <span className="text-brand-charcoal font-extrabold font-mono text-sm px-2.5 py-1 bg-brand-cream border border-brand-border rounded">
                  {formatCurrency(dealLtv)}
                </span>
              </div>
              <input 
                type="range" 
                min="5000" 
                max="150000" 
                step="5000"
                value={dealLtv}
                onChange={(e) => setDealLtv(Number(e.target.value))}
                className="w-full h-1.5 bg-brand-cream border border-brand-border rounded-lg appearance-none cursor-pointer accent-brand-accent"
              />
              <div className="flex justify-between text-[10px] font-mono text-brand-slate">
                <span>$5,000 (Small Pilot)</span>
                <span>$150,000+ (Enterprise Retainer)</span>
              </div>
            </div>

            {/* Input 2: Monthly Meetings */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-mono font-bold text-brand-slate uppercase tracking-wider">
                  Target Monthly Meetings Booked:
                </label>
                <span className="text-brand-charcoal font-extrabold font-mono text-sm px-2.5 py-1 bg-brand-cream border border-brand-border rounded">
                  {monthlyMeetings} / Month
                </span>
              </div>
              <input 
                type="range" 
                min="2" 
                max="10" 
                step="1"
                value={monthlyMeetings}
                onChange={(e) => setMonthlyMeetings(Number(e.target.value))}
                className="w-full h-1.5 bg-brand-cream border border-brand-border rounded-lg appearance-none cursor-pointer accent-brand-accent"
              />
              <div className="flex justify-between text-[10px] font-mono text-brand-slate">
                <span>2 (Niche Outbound)</span>
                <span>10 (Full Capacity)</span>
              </div>
            </div>

            {/* Input 3: Close Rate */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-mono font-bold text-brand-slate uppercase tracking-wider">
                  Your Meeting-to-Close rate:
                </label>
                <span className="text-brand-charcoal font-extrabold font-mono text-sm px-2.5 py-1 bg-brand-cream border border-brand-border rounded">
                  {demoCloseRate}% Close Rate
                </span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="40" 
                step="2.5"
                value={demoCloseRate}
                onChange={(e) => setDemoCloseRate(Number(e.target.value))}
                className="w-full h-1.5 bg-brand-cream border border-brand-border rounded-lg appearance-none cursor-pointer accent-brand-accent"
              />
              <div className="flex justify-between text-[10px] font-mono text-brand-slate">
                <span>5% (Conservative)</span>
                <span>40% (Highly Conversational)</span>
              </div>
            </div>

          </div>

          {/* Real-time Compiled UI */}
          <div className="lg:col-span-6 bg-brand-charcoal border border-brand-charcoal rounded-2xl overflow-hidden shadow-lg text-white">
            
            <div className="bg-white/5 py-4 px-5 border-b border-white/10 flex items-center justify-between">
              <span className="text-xs text-neutral-300 font-mono">dashboard_compiler: calculation_valid</span>
              <div className="flex h-2.5 w-2.5 rounded-full bg-brand-accent pulse-neon"></div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Output 1: Added ARR */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
                <span className="text-neutral-400 block text-[10px] uppercase font-mono tracking-wider">
                  Expected Annually Added ARR
                </span>
                <p className="text-2xl sm:text-4xl font-extrabold font-mono text-white mt-1">
                  {formatCurrency(estimatedAnnualRevenue)}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-[#34D399] font-mono mt-2">
                  <TrendingUp size={14} />
                  <span>+{formatCurrency(estimatedMonthlyRevenue)}/mo run-rate</span>
                </div>
              </div>

              {/* Grid Metrics */}
              <div className="grid grid-cols-2 gap-4">
                
                {/* Metric A */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <span className="text-[#A1A1AA] block text-[9.5px] uppercase font-mono font-bold tracking-wider">EXPECTED CLOSES</span>
                  <span className="text-xl sm:text-2xl font-bold font-mono text-white block mt-1.5">
                    {expectedAnnualCloses.toFixed(1)} / year
                  </span>
                  <span className="text-[10px] font-mono text-brand-lavender font-bold block mt-1">
                    {expectedMonthlyCloses.toFixed(2)} contracts / mo
                  </span>
                </div>

                {/* Metric B */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <span className="text-[#A1A1AA] block text-[9.5px] uppercase font-mono font-bold tracking-wider">FOUNDER VALUE SAVED</span>
                  <span className="text-xl sm:text-2xl font-bold font-mono text-white block mt-1.5">
                    {savedHoursMonthly} Hours / mo
                  </span>
                  <span className="text-[10px] font-mono text-brand-accent font-bold block mt-1">
                    Saving {formatCurrency(savedFounderCapital)} / mo
                  </span>
                </div>

              </div>

              {/* Dev Shop Health Check Box */}
              <div className="border border-brand-accent/20 bg-brand-accent/5 rounded-xl p-4.5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-accent/10 text-brand-accent flex items-center justify-center font-mono text-sm shrink-0">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <h4 className="text-white text-xs font-bold font-mono uppercase tracking-wider">FEAST-FAMINE RISK REDUCED: 100%</h4>
                  <p className="text-[#D1D1D6] text-[11px] leading-relaxed mt-1 font-medium">
                    Instead of sales dying out while you code, your outbound remains active 24/7/365. Aixila maintains a consistent input rate of fresh targets, keeping your client roster stable.
                  </p>
                </div>
              </div>

              <div className="text-[10px] font-mono text-neutral-400 text-center leading-relaxed">
                * Based on typical outbound operations. We absorb all domain, list gathering, and processing costs. <br />
                <span className="text-brand-accent font-bold mt-1 block">Retainer: $0. You only pay for qualified booked client calls.</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Results;
