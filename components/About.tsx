import React from 'react';
import { ShieldAlert, RefreshCw, Zap, TrendingUp, Sliders } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="pain" className="py-28 bg-[#FAF8F5] border-t border-brand-border relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20 animate-fade-in">
          <div className="font-mono text-xs font-bold text-brand-accent uppercase tracking-widest mb-3">
            The Chronic Dev Agency Disease
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-brand-charcoal tracking-tight leading-tight mb-6">
            The Feast-Famine Cycle is killing your engineering velocity.
          </h2>
          <p className="text-brand-slate text-base sm:text-lg leading-relaxed">
            Most custom dev shops and tech agencies rely strictly on referrals and organic networks. It works great—until it doesn't. When your network dries up, you are forced to make a binary trade-off between coding and sales.
          </p>
        </div>

        {/* The Pain Loop Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          
          {/* Card 1 */}
          <div className="bg-white border border-brand-border rounded-2xl p-8 hover:border-brand-accent/30 hover:shadow-md transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mb-6 font-mono text-sm font-bold">
              01
            </div>
            <h3 className="text-xl font-bold text-brand-charcoal mb-4 flex items-center gap-2">
              The False Security
            </h3>
            <p className="text-brand-slate text-sm leading-relaxed mb-6">
              You land 2 large client projects. Your developers are fully booked. Your bank account is healthy. Because you have "no bandwidth," you shut off all marketing, sales, or lead generation efforts. You focus 100% on delivery.
            </p>
            <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
              STATE: FEAST
            </span>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-brand-border rounded-2xl p-8 hover:border-amber-500/30 hover:shadow-md transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center mb-6 font-mono text-sm font-bold">
              02
            </div>
            <h3 className="text-xl font-bold text-brand-charcoal mb-4 flex items-center gap-2">
              The Sudden Cliff
            </h3>
            <p className="text-brand-slate text-sm leading-relaxed mb-6">
              It is Month 4. The client project is concluding. You deliver the final milestone. Suddenly, you look at your active sales pipeline and realize... <span className="text-brand-charcoal font-semibold">there is absolutely nothing there.</span> Cold sweat sets in.
            </p>
            <span className="text-[10px] font-mono font-bold text-amber-700 uppercase tracking-widest bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100">
              STATE: DRIFTING
            </span>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-brand-border rounded-2xl p-8 hover:border-brand-accent/30 hover:shadow-md transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-brand-accent/5 border border-brand-accent/10 text-brand-accent flex items-center justify-center mb-6 font-mono text-sm font-bold">
              03
            </div>
            <h3 className="text-xl font-bold text-brand-charcoal mb-4 flex items-center gap-2">
              The Desperate Spam
            </h3>
            <p className="text-brand-slate text-sm leading-relaxed mb-6">
              You panic-scroll LinkedIn. You copy-paste fluffy "hire-us" templates from Google. You spend 15 hours blasting 400 CTOs. They label you as spam. You end up wasting precious hours, getting zero meetings, and losing your sanity.
            </p>
            <span className="text-[10px] font-mono font-bold text-brand-accent uppercase tracking-widest bg-brand-accent/5 px-2.5 py-1 rounded-md border border-brand-accent/10">
              STATE: FAMINE
            </span>
          </div>

        </div>

        {/* The Permanent Solution Pitch */}
        <div className="bg-brand-charcoal text-white rounded-2xl p-8 md:p-12 shadow-lg border border-brand-charcoal">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 tracking-tight leading-snug">
                How Aixila breaks this infinite loop forever
              </h3>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6">
                While you are writing code, managing deploys, and talking to active clients, our outbound machine runs silently in the background. We continuously scrape, clean, personalize, and sequence custom campaigns. When your current client wraps up, you don't panic. You already have <span className="text-brand-accent font-bold">5-6 qualified enterprise sales calls</span> waiting in your calendar. 
              </p>
              <div className="flex flex-wrap gap-3">
                {['No Upfront Retainer', 'We handle list research', 'We write developer-fluent copy', 'You pay on performance'].map((tag) => (
                  <span key={tag} className="px-3.5 py-1.5 bg-white/10 border border-white/10 rounded-xl text-xs font-mono font-semibold text-neutral-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center">
              <ShuffleIcon className="text-brand-accent h-8 w-8 mb-4 animate-spin-slow" />
              <div className="text-2xl font-mono font-bold text-white">0% Friction</div>
              <p className="text-neutral-400 text-[11px] font-mono uppercase tracking-wider mt-1">NO HOURLY OR RAMP FEES</p>
              <div className="w-full h-[1px] bg-white/15 my-4"></div>
              <p className="text-brand-accent text-xs font-semibold">We swallow the customer acquisition cost. You simply close the deals.</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

// SVG spinner helper icon matching the theme
const ShuffleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M20 9V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4" />
    <path d="m18 12 3-3-3-3" />
    <path d="M12 18H8" />
    <path d="M16 14H8" />
    <path d="M10 10H8" />
  </svg>
);

export default About;
