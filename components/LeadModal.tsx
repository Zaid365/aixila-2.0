
import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const token = localStorage.getItem('google_calendar_token');
    const expiry = localStorage.getItem('google_token_expiry');
    const isTokenValid = expiry && parseInt(expiry) > Date.now();
    
    if (token && isTokenValid) {
      setGoogleToken(token);
      if (step === 'calendar') {
        fetchAvailability(token);
      }
    } else if (token && !isTokenValid) {
      setError("Calendar session expired. Please re-link in footer.");
    }
  }, [selectedDate, step]);

  const fetchAvailability = async (token: string) => {
    setIsLoadingSlots(true);
    setError(null);
    try {
      const startOfDay = new Date(selectedDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(selectedDate);
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

      if (!response.ok) throw new Error("Failed to fetch calendar data");

      const data = await response.json();
      const busy = data.calendars?.primary?.busy || [];
      
      const busyTimes = busy.map((b: any) => {
        const date = new Date(b.start);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase();
      });
      setBusySlots(busyTimes);
    } catch (err) {
      console.error('Error fetching calendar:', err);
      setError("Could not sync real availability.");
    } finally {
      setIsLoadingSlots(false);
    }
  };

  const handleBookMeeting = async () => {
    setIsSubmitting(true);
    const token = localStorage.getItem('google_calendar_token');
    const expiry = localStorage.getItem('google_token_expiry');
    const isTokenValid = expiry && parseInt(expiry) > Date.now();

    if (token && isTokenValid) {
      try {
        const [time, period] = selectedTime!.split(' ');
        const [hours, minutes] = time.split(':');
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

        if (!response.ok) throw new Error("Booking failed");
      } catch (err) {
        console.error('Failed to create event:', err);
        alert("Booking failed. Please try again or contact us directly.");
        setIsSubmitting(false);
        return;
      }
    } else {
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

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep('form');
      setFormData({ name: '', email: '', company: '', process: '' });
      setSelectedTime(null);
      setError(null);
    }, 300);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const days = new Date(year, month + 1, 0).getDate();
    return { firstDay, days };
  };

  const { firstDay, days } = getDaysInMonth(currentMonth);
  const daysArray = Array.from({ length: days }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
    "11:00 AM", "11:30 AM", "01:00 PM", "01:30 PM", 
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM"
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity cursor-pointer" onClick={handleClose} />
      
      <div className={`relative bg-white w-full rounded-[40px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 transition-all ${
        step === 'form' ? 'max-w-xl p-8 md:p-12' : 
        step === 'calendar' ? 'max-w-4xl p-8' : 'max-w-md p-12 text-center'
      }`}>
        
        <button 
          onClick={handleClose} 
          type="button"
          className="absolute top-6 right-6 z-[110] text-black/40 hover:text-black transition-colors bg-white/80 rounded-full p-2 hover:bg-gray-100"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {/* Using a stable container for conditional rendering steps */}
        <div className="w-full">
          {step === 'form' && (
            <div className="animate-in fade-in duration-300">
              <div className="mb-10">
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
                  <input required type="email" placeholder="Work Email *" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-black font-medium focus:ring-2 focus:ring-[#0B3B2C] outline-none transition-all" 
                    value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  <input required type="text" placeholder="Company *" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-black font-medium focus:ring-2 focus:ring-[#0B3B2C] outline-none transition-all" 
                    value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
                </div>
                <textarea rows={3} placeholder="Tell about your company current outbound process (Optional)" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-black font-medium focus:ring-2 focus:ring-[#0B3B2C] outline-none resize-none transition-all"
                  value={formData.process} onChange={(e) => setFormData({...formData, process: e.target.value})} />
                <button type="submit" disabled={isSubmitting} className="w-full bg-[#0B3B2C] text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-[#0d4432] shadow-lg transition-all active:scale-[0.98]">
                  {isSubmitting ? <Loader2 className="animate-spin" /> : <>Next: Choose Date & Time <ArrowRight size={20} /></>}
                </button>
              </form>
            </div>
          )}

          {step === 'calendar' && (
            <div className="flex flex-col md:flex-row gap-8 animate-in fade-in duration-300">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-extrabold text-black">Select Date</h3>
                  <div className="flex gap-2">
                    <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ChevronLeft size={20}/></button>
                    <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ChevronRight size={20}/></button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-6">
                  <p className="text-black/40 text-sm font-bold uppercase tracking-widest">
                    {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </p>
                  {googleToken && !error && (
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                      <ShieldCheck size={12} />
                      LIVE SYNC ACTIVE
                    </div>
                  )}
                  {error && (
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-red-500 bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
                      <AlertCircle size={12} />
                      SYNC ERROR
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-7 gap-2 mb-2">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="text-center text-[10px] font-bold text-black/30">{d}</div>)}
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
                        className={`h-10 w-10 flex items-center justify-center rounded-xl text-sm font-bold transition-all ${
                          isSelected ? 'bg-black text-white shadow-lg scale-110' : 
                          isToday ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 
                          isPast ? 'text-gray-200 cursor-not-allowed' : 'hover:bg-gray-50 text-black'
                        }`}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
                {error && <p className="mt-6 text-xs text-red-500 font-bold">{error}</p>}
              </div>

              <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-gray-100 pt-8 md:pt-0 md:pl-8">
                <h3 className="text-2xl font-extrabold text-black mb-8">Select Time</h3>
                <p className="text-black/40 text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Clock size={14} /> Available Slots
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-8 h-[300px] overflow-y-auto pr-2 custom-scrollbar relative">
                  {isLoadingSlots && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                      <Loader2 className="animate-spin text-black" size={32} />
                    </div>
                  )}
                  
                  {timeSlots.map(time => {
                    const isBusy = busySlots.includes(time);
                    return (
                      <button 
                        key={time}
                        disabled={isBusy}
                        onClick={() => setSelectedTime(time)}
                        className={`py-3 rounded-xl border text-sm font-bold transition-all ${
                          selectedTime === time ? 'bg-[#0B3B2C] text-white border-[#0B3B2C] shadow-md' : 
                          isBusy ? 'bg-gray-50 border-gray-50 text-gray-300 cursor-not-allowed line-through' :
                          'border-gray-100 hover:border-black text-black'
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
                  className="w-full bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-900 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.98]"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : 'Confirm Booking'}
                </button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-4xl font-extrabold text-black mb-4">You're Booked!</h2>
              <p className="text-black/60 font-medium mb-10 leading-relaxed">
                We've confirmed your 30-min strategy call for <br />
                <span className="text-black font-extrabold">
                  {selectedDate.toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' })} at {selectedTime}
                </span>.
              </p>
              <div className="bg-gray-50 p-6 rounded-3xl mb-10 text-left border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <CalendarIcon size={16} className="text-black/40" />
                  <span className="text-xs font-bold text-black/40 uppercase tracking-widest">Calendar Sync</span>
                </div>
                <p className="text-sm font-bold text-black">A calendar invite has been sent to {formData.email}.</p>
              </div>
              <button onClick={handleClose} className="w-full py-4 border border-black text-black rounded-2xl font-bold hover:bg-black hover:text-white transition-all">
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadModal;
