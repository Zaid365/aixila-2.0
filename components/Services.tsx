
import React from 'react';
import { Target, Share2, ShieldCheck, Database, FileText, BarChart3, ArrowRight } from 'lucide-react';

interface ServicesProps {
  onOpenModal: () => void;
}

const services = [
  {
    icon: <Target className="text-[#111827]" size={22} />,
    title: "Lead Research & ICP Targeting",
    description: "AI-powered prospect identification in your target verticals—logistics, healthcare, manufacturing."
  },
  {
    icon: <Share2 className="text-[#111827]" size={22} />,
    title: "Multi-Channel Outreach",
    description: "Strategic email, LinkedIn, and cold calling sequences designed for enterprise B2B decision-makers."
  },
  {
    icon: <ShieldCheck className="text-[#111827]" size={22} />,
    title: "Meeting Qualification",
    description: "Every meeting booked has budget, need, and authority. Zero wasted conversations."
  },
  {
    icon: <Database className="text-[#111827]" size={22} />,
    title: "Account-Based Campaigns",
    description: "Targeted campaigns for high-value accounts with persistent, personalized engagement."
  },
  {
    icon: <FileText className="text-[#111827]" size={22} />,
    title: "Sales Collateral & Scripts",
    description: "Custom scripts and templates tailored to your software solutions and target industries."
  },
  {
    icon: <BarChart3 className="text-[#111827]" size={22} />,
    title: "Pipeline Analytics",
    description: "Transparent reporting on outreach performance, meeting quality, and pipeline value."
  }
];

const Services: React.FC<ServicesProps> = ({ onOpenModal }) => {
  return (
    <section id="services" className="bg-white pt-10 pb-20">
      <div className="container mx-auto px-4">
        <div className="bg-[#0B3B2C] rounded-[60px] p-12 md:p-20 relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-8 relative z-10">
            <div className="max-w-2xl">
              <h2 className="text-6xl font-bold text-white mb-8 tracking-tighter">Services</h2>
              <h3 className="text-2xl font-bold text-emerald-400 mb-4">What we deliver</h3>
              <p className="text-white/60 text-lg leading-relaxed max-w-lg">
                End-to-end outbound that fills your calendar with qualified meetings.
              </p>
            </div>
            <button 
              onClick={onOpenModal}
              className="bg-[#1b4b3c] hover:bg-[#235d4b] text-white px-8 py-3.5 rounded-full border border-white/10 transition-all flex items-center gap-2 font-bold group"
            >
              Schedule a Call
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {services.map((service, index) => (
              <div key={index} className="bg-[#134939] p-10 rounded-[32px] border border-white/5 transition-all group hover:bg-[#165a46]">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-10 shadow-lg">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 leading-tight">{service.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-8">{service.description}</p>
                <div className="h-[1px] w-full bg-white/5 mb-6"></div>
                <div className="flex items-center gap-2 text-white/60 font-bold text-sm cursor-pointer hover:text-white transition-colors">
                  Learn more
                  <ArrowRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
