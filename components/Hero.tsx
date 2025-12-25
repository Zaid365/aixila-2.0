
import React from 'react';
import { ArrowUpRight, ChevronDown, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenModal: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  return (
    <section id="home" className="pt-40 pb-20 hero-gradient">
      <div className="container mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-[1px] w-12 bg-black"></div>
          <span className="text-black text-xs font-bold tracking-[0.3em] uppercase">AI-Powered Outbound</span>
          <div className="h-[1px] w-12 bg-black"></div>
        </div>
        
        <h1 className="text-6xl md:text-[90px] font-bold leading-[0.9] tracking-tighter mb-8 text-black">
          WE BOOK <br /> MEETINGS THAT CLOSE
        </h1>
        
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-black mb-12 leading-relaxed font-medium">
          End-to-end outbound for custom software companies. <span className="text-black font-extrabold">4-6 qualified meetings monthly</span> with decision-makers in healthcare, logistics & manufacturing.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24">
          <button 
            onClick={onOpenModal}
            className="bg-[#0B3B2C] text-white px-10 py-4 rounded-lg font-bold flex items-center gap-2 hover:bg-[#082d21] transition-all group"
          >
            Get Started
            <ArrowUpRight size={20} />
          </button>
          <a href="#process" className="bg-white border border-gray-100 shadow-sm px-10 py-4 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-50 transition-all text-black">
            See How It Works
            <ChevronDown size={20} className="text-black" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
          {[
            { value: "4-6", label: "QUALIFIED MEETINGS / MONTH" },
            { value: "100%", label: "QUALIFIED WITH BUDGET & AUTHORITY" },
            { value: "B2B", label: "ENTERPRISE VERTICALS FOCUS" }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-12 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center justify-center">
              <span className="text-5xl font-extrabold text-black mb-2">{stat.value}</span>
              <span className="text-[10px] font-bold text-black tracking-widest uppercase text-center">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto rounded-[40px] overflow-hidden shadow-2xl border-[12px] border-white bg-white">
          <div className="absolute top-10 left-10 z-10 pill-status px-6 py-3 rounded-2xl border border-white/20 flex items-center gap-3 shadow-lg">
            <div className="w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle2 size={18} className="text-white" />
            </div>
            <div className="text-left">
              <p className="text-white/60 text-[10px] font-bold uppercase leading-none mb-1">STATUS</p>
              <p className="text-white text-sm font-bold leading-none">Meetings Booked</p>
            </div>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&q=80&w=2400" 
            alt="Sales pipeline calendar full of meetings" 
            className="w-full h-[600px] object-cover opacity-90 transition-opacity duration-500 hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
