
import React from 'react';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

const Results: React.FC = () => {
  return (
    <section id="results" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-4">
          <div>
            <h2 className="text-6xl font-bold tracking-tighter text-black mb-6">Real Results</h2>
            <p className="text-black font-bold text-lg">Software companies closing deals in hard-to-reach industries.</p>
          </div>
          <button className="bg-white border border-gray-100 shadow-sm px-8 py-3 rounded-xl text-sm font-bold text-black flex items-center gap-2 hover:border-black transition-all">
            View All Cases
            <ArrowUpRight size={18} />
          </button>
        </div>

        {/* Main Case Study */}
        <div className="bg-[#F9FAFB] rounded-[40px] p-8 md:p-16 mb-8 border border-gray-50 flex flex-col lg:flex-row gap-16 group transition-all hover:shadow-xl">
          <div className="lg:w-1/2 flex flex-col justify-center">
            <div className="inline-block bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm mb-10 w-fit">
              <span className="text-[10px] font-bold text-black uppercase tracking-widest">HEALTHCARE SOFTWARE</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-extrabold text-black mb-8 leading-tight">MedTech Solutions fills pipeline with hospital CIOs</h3>
            <p className="text-black text-lg leading-relaxed mb-12 font-medium">
              Booked 24 qualified meetings in 6 months with healthcare IT decision-makers. Average deal size: $180K. Pipeline value generated: $4.3M.
            </p>
            <div className="flex gap-16">
              <div>
                <span className="text-5xl font-extrabold text-black block mb-2">$4.3M</span>
                <span className="text-[10px] font-bold text-black tracking-widest uppercase">PIPELINE GENERATED</span>
              </div>
              <div>
                <span className="text-5xl font-extrabold text-black block mb-2">24</span>
                <span className="text-[10px] font-bold text-black tracking-widest uppercase">MEETINGS BOOKED</span>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 relative rounded-[32px] overflow-hidden">
            <div className="absolute top-8 left-8 z-10 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl flex items-center gap-4 border border-white">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-black leading-none">250%</p>
                <p className="text-[10px] font-bold text-black uppercase tracking-tight">ROI ACHIEVED</p>
              </div>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200" 
              alt="Medical professional with tablet" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
          </div>
        </div>

        {/* Secondary Case Studies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#F9FAFB] rounded-[40px] p-8 md:p-12 border border-gray-50 group hover:shadow-lg transition-all">
            <div className="inline-block bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm mb-8">
              <span className="text-[10px] font-bold text-black uppercase tracking-widest">LOGISTICS PLATFORM</span>
            </div>
            <div className="text-5xl font-extrabold text-black mb-4">+50%</div>
            <p className="text-black font-bold mb-12">Pipeline growth in first quarter targeting supply chain VPs.</p>
            <div className="rounded-3xl overflow-hidden h-64 border-[6px] border-white shadow-sm">
              <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Logistics warehouse" />
            </div>
          </div>

          <div className="bg-[#F9FAFB] rounded-[40px] p-8 md:p-12 border border-gray-50 group hover:shadow-lg transition-all">
            <div className="inline-block bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm mb-8">
              <span className="text-[10px] font-bold text-black uppercase tracking-widest">MANUFACTURING ERP</span>
            </div>
            <div className="text-5xl font-extrabold text-black mb-4">8 <span className="text-2xl font-bold text-black uppercase ml-2">FORTUNE 500 MEETINGS</span></div>
            <p className="text-black font-bold mb-12">Secured meetings with VP-level manufacturing executives through targeted ABM campaigns.</p>
            <div className="rounded-3xl overflow-hidden h-64 border-[6px] border-white shadow-sm">
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Modern factory" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;