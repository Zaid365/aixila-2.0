
import React, { useState } from 'react';
import { X, ArrowRight, Loader2 } from 'lucide-react';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeadModal: React.FC<LeadModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    process: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Redirect to booking page (Calendly placeholder)
    // In a real app, replace this with your actual Calendly link
    window.location.href = 'https://calendly.com/d/cp97-mhs-47d/30-minute-strategy-call';
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-xl rounded-[40px] shadow-2xl p-8 md:p-12 overflow-hidden animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-black/40 hover:text-black transition-colors"
        >
          <X size={24} />
        </button>

        <div className="mb-10">
          <h2 className="text-4xl font-extrabold text-black tracking-tighter mb-4">Let's build your pipeline</h2>
          <p className="text-black/60 font-medium">Enter your details to unlock a 30-min strategy call.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-black uppercase tracking-widest ml-1">Full Name *</label>
            <input 
              required
              type="text"
              placeholder="Your name"
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-black font-medium focus:outline-none focus:ring-2 focus:ring-[#0B3B2C] focus:border-transparent transition-all"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-black uppercase tracking-widest ml-1">Work Email *</label>
              <input 
                required
                type="email"
                placeholder="email@company.com"
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-black font-medium focus:outline-none focus:ring-2 focus:ring-[#0B3B2C] focus:border-transparent transition-all"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-black uppercase tracking-widest ml-1">Company *</label>
              <input 
                required
                type="text"
                placeholder="Company name"
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-black font-medium focus:outline-none focus:ring-2 focus:ring-[#0B3B2C] focus:border-transparent transition-all"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-black uppercase tracking-widest ml-1">Tell about your company current outbound process (Optional)</label>
            <textarea 
              rows={3}
              placeholder="How are you currently booking meetings?"
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-black font-medium focus:outline-none focus:ring-2 focus:ring-[#0B3B2C] focus:border-transparent transition-all resize-none"
              value={formData.process}
              onChange={(e) => setFormData({...formData, process: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-[#0B3B2C] text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-[#0d4432] transition-all disabled:opacity-70 group shadow-lg"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <>
                Next: Book Strategy Call
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
        
        <p className="mt-8 text-center text-[10px] text-black/40 font-bold uppercase tracking-widest">
          No spam. Just qualified meetings.
        </p>
      </div>
    </div>
  );
};

export default LeadModal;
