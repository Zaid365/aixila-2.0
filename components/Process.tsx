
import React from 'react';
import { Search, PenTool, Rocket, Calendar } from 'lucide-react';

const Process: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-black mb-4">Process</h2>
          <p className="text-black font-bold">From research to qualified meetings in as little as 4 days.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Day 1 */}
          <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm transition-all hover:shadow-md">
            <div className="inline-flex border border-black rounded-md px-2 py-1 mb-10">
               <span className="text-[10px] font-bold text-black uppercase tracking-wider">Day 1</span>
            </div>
            <div className="w-12 h-12 bg-[#F0FDF4] text-[#166534] rounded-xl flex items-center justify-center mb-8">
              <Search size={22} />
            </div>
            <h4 className="text-xl font-bold mb-4 text-black">ICP Research</h4>
            <p className="text-black text-sm leading-relaxed font-medium">
              Deep-dive into your ideal customer profile, target verticals, and decision-makers.
            </p>
          </div>

          {/* Day 2 */}
          <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm transition-all hover:shadow-md">
            <div className="inline-flex border border-black rounded-md px-2 py-1 mb-10">
               <span className="text-[10px] font-bold text-black uppercase tracking-wider">Day 2</span>
            </div>
            <div className="w-12 h-12 bg-[#EFF6FF] text-[#1E40AF] rounded-xl flex items-center justify-center mb-8">
              <PenTool size={22} />
            </div>
            <h4 className="text-xl font-bold mb-4 text-black">Assets & Tools</h4>
            <p className="text-black text-sm leading-relaxed font-medium">
              Craft sales copy, email sequences, and select the right outreach channels.
            </p>
          </div>

          {/* Day 3 */}
          <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm transition-all hover:shadow-md">
            <div className="inline-flex border border-black rounded-md px-2 py-1 mb-10">
               <span className="text-[10px] font-bold text-black uppercase tracking-wider">Day 3</span>
            </div>
            <div className="w-12 h-12 bg-[#FEF3C7] text-[#92400E] rounded-xl flex items-center justify-center mb-8">
              <Rocket size={22} />
            </div>
            <h4 className="text-xl font-bold mb-4 text-black">Launch & Report</h4>
            <p className="text-black text-sm leading-relaxed font-medium">
              Execute campaigns with frequent reporting and real-time optimization.
            </p>
          </div>

          {/* Day 4+ */}
          <div className="bg-[#0B3B2C] p-10 rounded-[32px] shadow-xl relative overflow-hidden flex flex-col">
            <div className="absolute top-8 right-8 text-white/10 pointer-events-none">
              <Calendar size={80} />
            </div>
            <div className="inline-flex border border-white/20 bg-white/10 rounded-md px-2 py-1 mb-10 self-start">
               <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Day 4+</span>
            </div>
            <div className="w-12 h-12 bg-white/10 text-white rounded-xl flex items-center justify-center mb-8 border border-white/10">
              <Calendar size={22} />
            </div>
            <h4 className="text-xl font-bold mb-4 text-white">Qualified Meetings</h4>
            <p className="text-white/60 text-sm leading-relaxed">
              Start receiving meetings with prospects who have budget, need, and authority.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;