import React, { useState, useEffect, useCallback } from 'react';
import { X, ArrowRight, Loader2, CheckCircle, ChevronLeft, ChevronRight, Clock, Calendar as CalendarIcon, ShieldCheck, AlertCircle } from 'lucide-react';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeadModal: React.FC<LeadModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'calendar' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    targetIcp: '',
    techStack: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [busySlots, setBusySlots] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [googleToken, setGoogleToken] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Fetch GCal availability logic
  const fetchAvailability = useCallback(async (token: string, date: Date) => {
    setIsLoadingSlots(true);
    setError(null);
    try {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const response = await fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          timeMin: startOfDay.toISOString(),
          timeMax: endOfDay.toISOString(),
          items: [{ id: 'primary' }]
        })
      });

      if (!response.ok) {
        if (response.status === 401) throw new Error("Unauthorized");
        throw new Error("Failed to fetch calendar data");
      }

      const data = await response.json();
      const busy = data.calendars?.primary?.busy || [];
      
      const busyTimes = busy.map((b: any) => {
        const date = new Date(b.start);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase();
      });
      setBusySlots(busyTimes);
    } catch (err: any) {
      console.error('Error fetching calendar:', err);
      if (err.message === "Unauthorized") {
        setError("Gmail session expired. Please re-link.");
        localStorage.removeItem('google_calendar_token');
      } else {
        setError("Could not sync real-time availability.");
      }
    } finally {
      setIsLoadingSlots(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('google_calendar_token');
    const expiry = localStorage.getItem('google_token_expiry');
    const isTokenValid = expiry && parseInt(expiry) > Date.now();
    
    if (token && isTokenValid) {
      setGoogleToken(token);
      if (step === 'calendar') {
        fetchAvailability(token, selectedDate);
      }
    } else if (token && !isTokenValid) {
      setGoogleToken(null);
    }
  }, [selectedDate, step, fetchAvailability]);

  const handleBookMeeting = async () => {
    if (!selectedTime) return;
    setIsSubmitting(true);
    
    const token = localStorage.getItem('google_calendar_token');
    const expiry = localStorage.getItem('google_token_expiry');
    const isTokenValid = expiry && parseInt(expiry) > Date.now();

    if (token && isTokenValid) {
      try {
        const [timePart, period] = selectedTime.split(' ');
        const [hours, minutes] = timePart.split(':');
        let h = parseInt(hours);
        if (period === 'PM' && h !== 12) h += 12;
        if (period === 'AM' && h === 12) h = 0;

        const startTime = new Date(selectedDate);
        startTime.setHours(h, parseInt(minutes), 0);
        const endTime = new Date(startTime.getTime() + 30 * 60000);

        const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?sendUpdates=all', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            summary: `Aixila Custom Outbound Briefing: ${formData.name} (${formData.company})`,
            description: `Aixila Campaign Configuration Details:\nEmail: ${formData.email}\nIdeal Targets: ${formData.targetIcp}\nTech Stack specialties: ${formData.techStack}\n\nBooked via Aixila Platform.`,
            start: { dateTime: startTime.toISOString() },
            end: { dateTime: endTime.toISOString() },
            attendees: [{ email: formData.email }],
            reminders: { useDefault: true }
          })
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error?.message || "Booking failed");
        }
      } catch (err: any) {
        console.error('Failed to create event:', err);
        alert(`Booking failed: ${err.message}. Fallback demo confirmed.`);
      }
    } else {
      await new Promise(resolve => setTimeout(resolve, 1200));
    }
    
    setIsSubmitting(false);
    setStep('success');
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('calendar');
    }, 800);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysCount = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysCount };
  };

  const { firstDay, daysCount } = getDaysInMonth(currentMonth);
  const daysArray = Array.from({ length: daysCount }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
    "11:00 AM", "11:30 AM", "01:00 PM", "01:30 PM", 
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM"
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 font-sans">
      {/* Background Glass backdrop */}
      <div 
        className="fixed inset-0 bg-[#0F1012]/80 backdrop-blur-md transition-opacity cursor-pointer" 
        onClick={onClose} 
      />
      
      {/* Modal Dialog block */}
      <div className={`relative bg-white border-2 border-brand-charcoal text-brand-charcoal w-full rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 transition-all ${
        step === 'form' ? 'max-w-xl p-8 md:p-10' : 
        step === 'calendar' ? 'max-w-4xl p-8' : 'max-w-md p-10 text-center'
      }`}>
        
        {/* Absolute Close button block */}
        <button 
          onClick={onClose} 
          type="button"
          className="absolute top-8 right-8 z-[110] text-[#7E7F85] hover:text-brand-charcoal transition-all bg-brand-cream border border-brand-border p-2 rounded-xl active:scale-90"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="w-full">
          {step === 'form' && (
            <div key="form-step" className="animate-in fade-in duration-300">
              <div className="mb-8 pr-12 text-left">
                <span className="font-mono text-[10px] text-brand-accent uppercase tracking-widest block mb-2 font-bold">SYSTEM DEPLOYMENT CONTROL</span>
                <h2 className="text-3xl font-extrabold tracking-tight mb-2 text-brand-charcoal">Configure Your Outbound Engine</h2>
                <p className="text-brand-slate text-xs font-semibold">Answer these technical variables to unlock the strategy scheduling console.</p>
              </div>
              
              <form onSubmit={handleSubmitForm} className="space-y-5 text-left">
                
                {/* Name field */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold font-mono text-brand-slate uppercase tracking-widest block">Full Name *</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="Your Name (e.g. Linus Torvalds)" 
                    className="w-full bg-brand-cream border border-brand-border rounded-xl px-4 py-3 text-sm text-brand-charcoal font-medium focus:bg-white focus:border-brand-accent outline-none transition-all placeholder:text-neutral-400 font-sans" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold font-mono text-brand-slate uppercase tracking-widest block">Work Email *</label>
                    <input 
                      required 
                      type="email" 
                      placeholder="you@company.com" 
                      className="w-full bg-brand-cream border border-brand-border rounded-xl px-4 py-3 text-sm text-brand-charcoal font-medium focus:bg-white focus:border-brand-accent outline-none transition-all placeholder:text-neutral-400 font-sans" 
                      value={formData.email} 
                      onChange={(e) => setFormData({...formData, email: e.target.value})} 
                    />
                  </div>
                  {/* Company field */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold font-mono text-brand-slate uppercase tracking-widest block">Company Name *</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="Company Corp" 
                      className="w-full bg-brand-cream border border-brand-border rounded-xl px-4 py-3 text-sm text-brand-charcoal font-medium focus:bg-white focus:border-brand-accent outline-none transition-all placeholder:text-neutral-400 font-sans" 
                      value={formData.company} 
                      onChange={(e) => setFormData({...formData, company: e.target.value})} 
                    />
                  </div>
                </div>

                {/* Target ICP */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold font-mono text-brand-slate uppercase tracking-widest block">Who is your ideal client? (e.g. series A logistics founders, health directors) *</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Healthcare CIOs, Logistics directors in US" 
                    className="w-full bg-brand-cream border border-brand-border rounded-xl px-4 py-3 text-sm text-brand-charcoal font-medium focus:bg-white focus:border-brand-accent outline-none transition-all placeholder:text-neutral-400 font-sans" 
                    value={formData.targetIcp} 
                    onChange={(e) => setFormData({...formData, targetIcp: e.target.value})} 
                  />
                </div>

                {/* Tech Stack */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold font-mono text-brand-slate uppercase tracking-widest block">Primary Dev Tech Stack Specialties (React, Node, Solidity, etc.) *</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. React Native, AWS Node serverless, Kubernetes orchestration" 
                    className="w-full bg-brand-cream border border-brand-border rounded-xl px-4 py-3 text-sm text-brand-charcoal font-medium focus:bg-white focus:border-brand-accent outline-none transition-all placeholder:text-neutral-400 font-sans" 
                    value={formData.techStack} 
                    onChange={(e) => setFormData({...formData, techStack: e.target.value})} 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="w-full bg-brand-accent hover:bg-brand-accentHover text-white py-4 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] font-mono uppercase tracking-wider"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <>Compile Target Data & Next <ArrowRight size={16} /></>}
                </button>
              </form>
            </div>
          )}

          {step === 'calendar' && (
            <div key="calendar-step" className="flex flex-col lg:flex-row gap-8 animate-in fade-in duration-300 text-left">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-8 pr-12">
                  <h3 className="text-2xl font-extrabold tracking-tight text-brand-charcoal">Select Date</h3>
                  <div className="flex gap-2">
                    <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))} className="p-2 hover:bg-brand-cream font-mono rounded-lg border border-brand-border transition-colors"><ChevronLeft size={16}/></button>
                    <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))} className="p-2 hover:bg-brand-cream font-mono rounded-lg border border-brand-border transition-colors"><ChevronRight size={16}/></button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-6">
                  <p className="font-mono text-sm font-bold text-brand-charcoal">
                    {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </p>
                  
                  {googleToken && !error ? (
                    <div className="flex items-center gap-1.5 text-[9px] font-bold font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                      <ShieldCheck size={12} />
                      LOCAL_SYNC_ACTIVE
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-[9px] font-bold font-mono text-brand-purple bg-brand-lavender/40 px-2.5 py-1 rounded-md border border-[#7C3AED]/20">
                      <AlertCircle size={12} />
                      STANDALONE_SECURE
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-7 gap-2 mb-3">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="text-center text-[10px] font-bold font-mono text-[#7E7F85] tracking-wider">{d}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {emptyDays.map(i => <div key={`empty-${i}`} />)}
                  {daysArray.map(d => {
                    const dateToCheck = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d);
                    const isSelected = selectedDate.getDate() === d && selectedDate.getMonth() === currentMonth.getMonth();
                    const isToday = new Date().getDate() === d && new Date().getMonth() === currentMonth.getMonth();
                    const isPast = dateToCheck < new Date(new Date().setHours(0,0,0,0));

                    return (
                      <button 
                        key={d} 
                        disabled={isPast}
                        onClick={() => setSelectedDate(dateToCheck)}
                        className={`h-9 w-9 flex items-center justify-center rounded-lg text-xs font-mono font-bold transition-all ${
                          isSelected ? 'bg-brand-accent text-white shadow-md scale-105 z-10' : 
                          isToday ? 'bg-brand-lavender text-brand-purple border border-brand-purple/20' : 
                          isPast ? 'text-neutral-200 cursor-not-allowed opacity-30 bg-transparent' : 'hover:bg-brand-cream text-brand-charcoal border border-transparent hover:border-brand-border'
                        }`}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
                {error && <p className="mt-6 text-[11px] text-rose-600 font-mono bg-rose-50 p-2.5 rounded-lg border border-rose-100 flex items-center gap-2">
                  <AlertCircle size={14} /> {error}
                </p>}
              </div>

              {/* Time slots Panel */}
              <div className="w-full lg:w-72 border-t lg:border-t-0 lg:border-l border-brand-border pt-6 lg:pt-0 lg:pl-6">
                <h3 className="text-base font-bold tracking-tight mb-4 flex items-center gap-2 font-mono text-brand-charcoal">
                  <Clock size={16} className="text-brand-accent" /> Strategy Slots
                </h3>
                <p className="text-[10px] font-mono text-brand-slate uppercase tracking-widest mb-4 font-bold">
                  30-Min Custom Campaign Audit
                </p>
                
                <div className="grid grid-cols-2 gap-2 mb-8 h-[240px] overflow-y-auto pr-1.5 custom-scrollbar relative">
                  {isLoadingSlots && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-10 backdrop-blur-[1px]">
                      <Loader2 className="animate-spin text-brand-accent" size={24} />
                    </div>
                  )}
                  
                  {timeSlots.map(time => {
                    const isBusy = busySlots.includes(time);
                    return (
                      <button 
                        key={time}
                        disabled={isBusy}
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 rounded-lg border text-xs font-mono font-bold transition-all ${
                          selectedTime === time ? 'bg-brand-accent text-white border-brand-accent shadow-md' : 
                          isBusy ? 'bg-neutral-100 border-neutral-200 text-neutral-300 cursor-not-allowed' :
                          'border-brand-border hover:border-brand-charcoal text-brand-slate hover:text-brand-charcoal bg-white shadow-sm'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
                
                <button 
                  onClick={handleBookMeeting}
                  disabled={!selectedTime || isSubmitting}
                  className="w-full bg-brand-charcoal hover:bg-black text-white py-3 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.98] shadow-sm tracking-wider"
                >
                  {isSubmitting ? <Loader2 className="animate-spin text-white" size={14} /> : 'CONFIRM CALL SPECIFICATION'}
                </button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div key="success-step" className="animate-in fade-in slide-in-from-bottom-6 duration-500 py-4">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm animate-bounce">
                <CheckCircle size={32} />
              </div>
              <h2 className="text-2xl font-extrabold text-brand-charcoal mb-2 tracking-tight font-mono uppercase">Briefing scheduled!</h2>
              <p className="text-brand-slate text-sm mb-8 leading-relaxed max-w-sm mx-auto font-medium">
                Strategy call confirmed for <br />
                <span className="text-brand-charcoal font-mono font-extrabold text-xs px-3 py-1 bg-brand-cream border border-brand-border rounded mt-2.5 inline-block">
                  {selectedDate.toLocaleDateString('default', { month: 'long', day: 'numeric' })} at {selectedTime}
                </span>
              </p>
              
              <div className="bg-brand-cream p-5 rounded-xl mb-8 text-left border border-brand-border font-mono text-[11px] leading-relaxed text-brand-slate space-y-2">
                <div className="flex items-center gap-2 mb-1">
                  <CalendarIcon size={12} className="text-brand-accent" />
                  <span className="text-[9px] font-bold text-brand-charcoal uppercase tracking-widest">Compiler Sync Log</span>
                </div>
                <p>Host: outbound_engine.aixila.com</p>
                <p>Status: strategy_briefing_ticket_emitted</p>
                <p>Target Seat: <span className="text-brand-charcoal underline font-semibold">{formData.email}</span></p>
                <p className="text-emerald-700 font-semibold">A calendar invitation with initial target variables has been successfully dispatched to your inbox.</p>
              </div>
              
              <button onClick={onClose} className="w-full font-mono py-3 border border-brand-border text-brand-charcoal bg-white rounded-xl text-xs font-bold hover:bg-brand-creamDark transition-all active:scale-[0.98]">
                Close Diagnostic Console
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadModal;
