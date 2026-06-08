import React from 'react';
import { ArrowRight, Terminal, Mail, Calendar, Sparkles, CheckCircle } from 'lucide-react';

interface HeroProps {
  onOpenModal: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  return (
    <section id="home" className="relative pt-36 pb-20 overflow-hidden tech-grid min-h-screen flex items-center">
      {/* Background radial glow */}
      <div className="absolute inset-0 radial-glow pointer-events-none opacity-80"></div>
      
      <div className="container mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Pitch Panel */}
          <div className="lg:col-span-7 flex flex-col items-start pr-0 lg:pr-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-brand-creamDark border border-brand-border mb-6 animate-fade-in shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-brand-accent pulse-neon"></span>
              <span className="text-[10px] sm:text-xs font-bold font-mono text-brand-slate uppercase tracking-wider">
                The Pay-Per-Meeting Outbound Model
              </span>
            </div>
            
            {/* Emotional and Impactful Typography */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold text-brand-charcoal tracking-tight leading-[1.05] mb-6">
              You built standard-setting tech.<br />
              <span className="text-brand-accent">
                So why are you begging for pipeline on LinkedIn?
              </span>
            </h1>
            
            {/* The Raw Truth Copy */}
            <p className="text-base sm:text-lg text-brand-slate max-w-2xl mb-8 leading-relaxed">
              For technical founders and CTOs of software dev agencies and B2B SaaS startups, client acquisition is an active nightmare. You cycle through the <span className="text-brand-charcoal font-semibold">feast-famine loop</span>—focusing on delivery till sales dry up, then panic-writing cold emails that get ignored. You can't justify a full-time, fast-talking SDR who doesn't even know what Docker is.
            </p>
            
            {/* Cure Container - Elegant Lavender Card */}
            <div className="bg-brand-lavender/30 border border-brand-accent/10 rounded-2xl p-6 mb-10 text-brand-charcoal max-w-2xl leading-relaxed shadow-sm">
              <span className="text-brand-accent font-mono text-xs font-bold uppercase tracking-wider block mb-1">Aixila is the cure:</span> 
              <span>We engineer high-precision targeted outbound to land qualified meetings straight onto your calendar. No retainer, no massive ramp times. </span>
              <strong className="text-brand-charcoal underline decoration-brand-accent decoration-2 underline-offset-4">You pay strictly per qualified meeting booked.</strong>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button 
                onClick={onOpenModal}
                className="bg-brand-accent hover:bg-brand-accentHover text-white px-8 py-4.5 rounded-xl font-extrabold flex items-center justify-center gap-2.5 transition-all duration-300 shadow-[0_4px_20px_rgba(255,79,0,0.2)] hover:shadow-[0_6px_25px_rgba(255,79,0,0.3)] active:scale-98 text-base group"
              >
                <span>Deploy My Outbound Pipeline</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <a 
                href="#pain" 
                className="bg-white hover:bg-brand-creamDark border border-brand-border text-brand-charcoal px-8 py-4.5 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-98 shadow-sm"
              >
                <span>Read technical overview</span>
              </a>
            </div>

            {/* Quick Credibility Signals */}
            <div className="flex flex-wrap items-center gap-x-10 gap-y-4 mt-12 pt-8 border-t border-brand-border w-full">
              <div>
                <span className="font-mono text-xl sm:text-2xl font-bold text-brand-charcoal block">UK + US</span>
                <span className="text-[10px] text-brand-slate font-bold uppercase tracking-wider">PRIMARY MARKETS SERVED</span>
              </div>
              <div className="h-8 w-[1px] bg-brand-border hidden sm:block"></div>
              <div>
                <span className="font-mono text-xl sm:text-2xl font-bold text-brand-charcoal block">480+</span>
                <span className="text-[10px] text-brand-slate font-bold uppercase tracking-wider font-mono">QUALIFIED MEETINGS BOOKED</span>
              </div>
              <div className="h-8 w-[1px] bg-brand-border hidden sm:block"></div>
              <div>
                <span className="font-mono text-xl sm:text-2xl font-bold text-brand-charcoal block">0.0% Retainer</span>
                <span className="text-[10px] text-brand-slate font-bold uppercase tracking-wider">PAY-ON-RESULT MODEL</span>
              </div>
            </div>

          </div>
          
          {/* Engine Preview Canvas */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-white border-2 border-brand-charcoal rounded-2xl overflow-hidden shadow-xl">
              
              {/* Header bar */}
              <div className="bg-brand-creamDark px-4 py-3.5 border-b-2 border-brand-charcoal flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-brand-accent/20 border border-brand-accent/40"></div>
                  <div className="w-3 h-3 rounded-full bg-brand-slate/20 border border-brand-slate/40"></div>
                  <div className="w-3 h-3 rounded-full bg-brand-charcoal/20 border border-brand-charcoal/40"></div>
                </div>
                <div className="text-[11px] font-mono text-brand-slate flex items-center gap-1.5">
                  <Terminal size={12} className="text-brand-accent" />
                  <span>outbound_pipeline: idle</span>
                </div>
                <div className="w-6"></div>
              </div>
              
              {/* Canvas Preview Body */}
              <div className="p-5 space-y-4 text-brand-charcoal">
                
                {/* Active Setup Row */}
                <div className="bg-brand-cream border border-brand-border rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-brand-slate block text-[10px] font-bold uppercase tracking-wider">Target Segments</span>
                    <span className="text-brand-charcoal font-bold text-xs flex items-center gap-1.5 mt-0.5">
                      UK + US software dev and tech agencies
                    </span>
                  </div>
                  <div className="px-2 py-0.5 rounded bg-brand-lavender text-brand-purple text-[10px] font-bold uppercase font-mono border border-brand-purple/10">
                    B2B IDEAL ICP
                  </div>
                </div>

                {/* Strategy highlights */}
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between py-1.5 border-b border-brand-border/60">
                    <span className="text-brand-slate">Target technology stacks:</span>
                    <span className="text-brand-charcoal font-bold text-right">React, NextJS, AWS, Kubernetes</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-brand-border/60">
                    <span className="text-brand-slate">Outreach standard:</span>
                    <span className="text-brand-accent font-bold">Peer-to-Peer Tech Audit</span>
                  </div>
                  <div className="flex justify-between py-1.5 text-xs">
                    <span className="text-brand-slate">Financial Risk profile:</span>
                    <span className="text-emerald-600 font-bold">100% Risk Free Performance Model</span>
                  </div>
                </div>

                {/* Example of warm outreach preview */}
                <div className="bg-brand-creamDark rounded-xl p-4 border border-brand-border text-[11px] text-brand-slate space-y-2.5 font-mono leading-relaxed">
                  <div className="flex gap-2">
                    <span className="text-brand-accent font-bold">&gt;</span>
                    <span>loading campaign snippet prototype...</span>
                  </div>
                  <div className="bg-white border border-brand-border p-3.5 rounded-lg text-brand-charcoal text-[11px] whitespace-pre-line leading-relaxed shadow-sm">
                    {`Subject: Quick NextJS edge feedback
                    Hey [CTO_Name], noticed you're deploying raw EC2 clusters for Next.js builds instead of localized edge functions. Must be pushing response latency over 500ms on European queries. We compile zero-fluff custom tech audits to hook your best accounts...`}
                  </div>
                </div>

                {/* Booking Trigger confirmation */}
                <div className="bg-brand-accent/5 border border-brand-accent/20 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
                      <Mail size={16} />
                    </div>
                    <div>
                      <span className="text-[10px] text-brand-slate font-bold uppercase tracking-wider block">Direct Response</span>
                      <p className="text-brand-charcoal text-xs font-bold mt-0.5">"I'd love to chat. Booked direct via calendar."</p>
                    </div>
                  </div>
                  <span className="text-[9px] text-brand-accent font-bold font-mono">1m ago</span>
                </div>

              </div>
              
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
