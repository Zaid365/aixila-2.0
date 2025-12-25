
import React, { useState, useEffect, useCallback } from 'react';
import { X, ArrowRight, Loader2, CheckCircle2, ChevronLeft, ChevronRight, Clock, Calendar as CalendarIcon, ShieldCheck, AlertCircle } from 'lucide-react';

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
    process: ''
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

  // Fetch availability logic
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
        setError("Gmail session expired. Please re-link in footer.");
        localStorage.removeItem('google_calendar_token');
      } else {
        setError("Could not sync real availability.");
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
      setError("Calendar session expired. Please re-link in footer.");
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
            summary: `Strategy Call: ${formData.name} (${formData.company})`,
            description: `Lead Details:\nEmail: ${formData.email}\nProcess Notes: ${formData.process || 'None provided'}\n\nBooked via Pipeline App.`,
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
        alert(`Booking failed: ${err.message}. Ensure your calendar is linked correctly.`);
        setIsSubmitting(false);
        return;
      }
    } else {
      // Demo mode fallback
      await new Promise(resolve => setTimeout(resolve, 1500));
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity cursor-pointer" 
        onClick={onClose} 
      />
      
      <div className={`relative bg-white w-full rounded-[40px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 transition-all ${
        step === 'form' ? 'max-w-xl p-8 md:p-12' : 
        step === 'calendar' ? 'max-w-4xl p-8' : 'max-w-md p-12 text-center'
      }`}>
        
        {/* Reinforced Close Button */}
        <button 
          onClick={onClose} 
          type="button"
          className="absolute top-8 right-8 z-[110] text-black/40 hover:text-black transition-all bg-gray-50 hover:bg-gray-100 rounded-full p-2.5 active:scale-90"
          aria-label="Close"
        >
          <X size={24} strokeWidth={2.5} />
        </button>

        <div className="w-full">
          {step === 'form' && (
            <div key="form-step" className="animate-in fade-in duration-300">
              <div className="mb-10 pr-12">
                <h2 className="text-4xl font-extrabold text-black tracking-tighter mb-4">Let's build your pipeline</h2>
                <p className="text-black/60 font-medium">Enter your details to unlock our real-time strategy call calendar.</p>
              </div>
              <form onSubmit={handleSubmitForm} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-black uppercase tracking-widest ml-1">Full Name *</label>
                  <input required type="text" placeholder="Your name" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-black font-medium focus:ring-2 focus:ring-[#0B3B2C] outline-none transition-all" 
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-black uppercase tracking-widest ml-1">Work Email *</label>
                    <input required type="email" placeholder="email@company.com" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-black font-medium focus:ring-2 focus:ring-[#0B3B2C] outline-none transition-all" 
                      value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-black uppercase tracking-widest ml-1">Company *</label>
                    <input required type="text" placeholder="Company Name" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-black font-medium focus:ring-2 focus:ring-[#0B3B2C] outline-none transition-all" 
                      value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-black uppercase tracking-widest ml-1">Current Process (Optional)</label>
                  <textarea rows={3} placeholder="Tell us about your current outbound efforts..." className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-black font-medium focus:ring-2 focus:ring-[#0B3B2C] outline-none resize-none transition-all"
                    value={formData.process} onChange={(e) => setFormData({...formData, process: e.target.value})} />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-[#0B3B2C] text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-[#0d4432] shadow-lg transition-all active:scale-[0.98]">
                  {isSubmitting ? <Loader2 className="animate-spin" /> : <>Next: Choose Date & Time <ArrowRight size={20} /></>}
                </button>
              </form>
            </div>
          )}

          {step === 'calendar' && (
            <div key="calendar-step" className="flex flex-col md:flex-row gap-12 animate-in fade-in duration-300">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-10 pr-12">
                  <h3 className="text-3xl font-extrabold text-black tracking-tighter">Select Date</h3>
                  <div className="flex gap-2">
                    <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))} className="p-2.5 hover:bg-gray-100 rounded-full transition-colors"><ChevronLeft size={22}/></button>
                    <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))} className="p-2.5 hover:bg-gray-100 rounded-full transition-colors"><ChevronRight size={22}/></button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-8">
                  <p className="text-black font-extrabold text-lg">
                    {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </p>
                  {googleToken && !error && (
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                      <ShieldCheck size={12} />
                      LIVE CALENDAR SYNC
                    </div>
                  )}
                  {error && (
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded-full border border-red-100">
                      <AlertCircle size={12} />
                      OFFLINE MODE
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-7 gap-3 mb-4">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="text-center text-xs font-bold text-black/30 tracking-widest">{d}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-3">
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
                        className={`h-11 w-11 flex items-center justify-center rounded-2xl text-sm font-bold transition-all ${
                          isSelected ? 'bg-[#0B3B2C] text-white shadow-xl scale-110 z-10' : 
                          isToday ? 'bg-emerald-50 text-emerald-700 border border-emerald-100 ring-2 ring-emerald-500/20' : 
                          isPast ? 'text-gray-200 cursor-not-allowed' : 'hover:bg-gray-50 text-black border border-transparent hover:border-gray-200'
                        }`}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
                {error && <p className="mt-8 text-xs text-red-500 font-bold bg-red-50 p-3 rounded-xl border border-red-100 flex items-center gap-2">
                  <AlertCircle size={14} /> {error}
                </p>}
              </div>

              <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-gray-100 pt-8 md:pt-0 md:pl-12">
                <h3 className="text-3xl font-extrabold text-black tracking-tighter mb-10">Time</h3>
                <p className="text-black/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <Clock size={14} /> 30-Min Strategy Call
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-10 h-[300px] overflow-y-auto pr-3 custom-scrollbar relative">
                  {isLoadingSlots && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10 backdrop-blur-[2px]">
                      <Loader2 className="animate-spin text-[#0B3B2C]" size={32} />
                    </div>
                  )}
                  
                  {timeSlots.map(time => {
                    const isBusy = busySlots.includes(time);
                    return (
                      <button 
                        key={time}
                        disabled={isBusy}
                        onClick={() => setSelectedTime(time)}
                        className={`py-3.5 rounded-2xl border text-sm font-bold transition-all ${
                          selectedTime === time ? 'bg-[#0B3B2C] text-white border-[#0B3B2C] shadow-lg' : 
                          isBusy ? 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed line-through' :
                          'border-gray-100 hover:border-black text-black bg-white shadow-sm hover:shadow-md'
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
                  className="w-full bg-black text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-900 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.98] shadow-xl"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : 'Confirm Call'}
                </button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div key="success-step" className="animate-in fade-in slide-in-from-bottom-6 duration-700 py-6">
              <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[32px] flex items-center justify-center mx-auto mb-10 shadow-inner">
                <CheckCircle2 size={48} />
              </div>
              <h2 className="text-5xl font-extrabold text-black mb-6 tracking-tighter">You're Booked!</h2>
              <p className="text-black/60 text-lg font-medium mb-12 leading-relaxed">
                Strategy call confirmed for <br />
                <span className="text-black font-extrabold px-2 py-1 bg-emerald-50 rounded-lg">
                  {selectedDate.toLocaleDateString('default', { month: 'long', day: 'numeric' })} at {selectedTime}
                </span>.
              </p>
              <div className="bg-gray-50 p-8 rounded-[32px] mb-12 text-left border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <CalendarIcon size={18} className="text-[#0B3B2C]" />
                  <span className="text-xs font-bold text-black uppercase tracking-widest">Calendar Sync</span>
                </div>
                <p className="text-sm font-bold text-black/80 leading-relaxed">
                  A calendar invitation and strategy brief has been sent to <span className="text-[#0B3B2C] underline">{formData.email}</span>.
                </p>
              </div>
              <button onClick={onClose} className="w-full py-5 border-2 border-black text-black rounded-2xl font-bold text-lg hover:bg-black hover:text-white transition-all active:scale-[0.98]">
                Close Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadModal;
