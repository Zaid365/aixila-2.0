
import React from 'react';

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-6xl font-extrabold tracking-tighter text-black mb-6">What our clients say</h2>
          <p className="text-black font-bold text-lg">Real results from software companies we've helped break into hard-to-reach markets.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-[#F9FAFB] p-16 rounded-[40px] border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
            <div className="mb-12">
               <span className="text-6xl text-emerald-300 font-serif leading-none">“</span>
               <p className="text-xl text-black font-bold italic leading-relaxed -mt-4">
                 "PIPELINE transformed our outbound completely. We went from struggling to get meetings with healthcare CIOs to having 5-6 qualified calls monthly. Their understanding of the healthcare vertical is exceptional."
               </p>
            </div>
            <div className="flex items-center gap-4">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150" className="w-14 h-14 rounded-full object-cover grayscale" alt="Michael Chen" />
              <div>
                <h4 className="font-bold text-black">Michael Chen</h4>
                <p className="text-xs font-bold text-black uppercase tracking-widest">CEO, HealthSync Solutions</p>
              </div>
            </div>
          </div>

          <div className="bg-[#F9FAFB] p-16 rounded-[40px] border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
            <div className="mb-12">
               <span className="text-6xl text-emerald-300 font-serif leading-none">“</span>
               <p className="text-xl text-black font-bold italic leading-relaxed -mt-4">
                 "We've seen incredible growth thanks to their targeted outreach strategies. The team's expertise in logistics and supply chain has been invaluable. Every meeting they book is truly qualified."
               </p>
            </div>
            <div className="flex items-center gap-4">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" className="w-14 h-14 rounded-full object-cover grayscale" alt="Sarah Rodriguez" />
              <div>
                <h4 className="font-bold text-black">Sarah Rodriguez</h4>
                <p className="text-xs font-bold text-black uppercase tracking-widest">VP Sales, LogiFlow Software</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;