'use client';

import { useState } from 'react';
import { type Theme } from '@/lib/themes';
import {
  Calendar, Plus, X, Save, Edit2,
  ChevronRight, ChevronLeft, Trash2,
  Repeat, Users, Upload, MapPin, Bus, DollarSign,
  ClipboardCheck, AlertTriangle, Clock, CheckCircle,
  FileText, Send, Eye, ChevronDown, Shield, History,
} from 'lucide-react';

interface CalendarEvent {
  label: string;
  time: string;
  type: string;
  color: string;
}

interface RsvpEntry {
  name: string;
  role: string;
  status: 'Accepted' | 'Declined' | 'Pending';
  date: string;
}

interface FieldTrip {
  id: string;
  name: string;
  date: string;
  destination: string;
  classes: string;
  buses: number;
  budget: number;
  status: 'Planning' | 'Approved' | 'Completed';
  consentGiven: number;
  consentTotal: number;
  consentRequired: boolean;
  consentDeadline: string;
  riskNotes: string;
}

interface AuditEntry {
  timestamp: string;
  user: string;
  action: string;
  eventName: string;
}

interface ImportedEvent {
  title: string;
  date: string;
  time: string;
  conflict: boolean;
}

type CalendarView = 'yearly' | 'monthly' | 'weekly' | 'today';

export default function CalendarModule({ theme }: { theme: Theme }) {
  const [calendarView, setCalendarView] = useState<CalendarView>('monthly');
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventTime, setNewEventTime] = useState('09:00');
  const [newEventType, setNewEventType] = useState('Meeting');

  // Recurring event state
  const [recurringEnabled, setRecurringEnabled] = useState(false);
  const [recurringFrequency, setRecurringFrequency] = useState('Weekly');
  const [recurringEndDate, setRecurringEndDate] = useState('2026-06-30');
  const [recurringOccurrences, setRecurringOccurrences] = useState(10);
  const [recurringEndMode, setRecurringEndMode] = useState<'date' | 'occurrences'>('date');

  // RSVP state
  const [requireRsvp, setRequireRsvp] = useState(false);
  const [rsvpDeadline, setRsvpDeadline] = useState('2026-02-20');
  const [showRsvpDetails, setShowRsvpDetails] = useState(false);
  const [rsvpData] = useState<RsvpEntry[]>([
    { name: 'Ramesh Patel', role: 'Teacher', status: 'Accepted', date: '10 Feb 2026' },
    { name: 'Sunita Sharma', role: 'Teacher', status: 'Accepted', date: '10 Feb 2026' },
    { name: 'Anil Mehta', role: 'HOD', status: 'Accepted', date: '11 Feb 2026' },
    { name: 'Priya Joshi', role: 'Teacher', status: 'Declined', date: '11 Feb 2026' },
    { name: 'Deepak Singh', role: 'Coordinator', status: 'Pending', date: '-' },
    { name: 'Kavita Rao', role: 'Teacher', status: 'Pending', date: '-' },
    { name: 'Manoj Verma', role: 'Teacher', status: 'Accepted', date: '12 Feb 2026' },
    { name: 'Neha Gupta', role: 'Lab Assistant', status: 'Pending', date: '-' },
  ]);

  // Calendar Import state
  const [showImportModal, setShowImportModal] = useState(false);
  const [importMethod, setImportMethod] = useState<'file' | 'url'>('file');
  const [importUrl, setImportUrl] = useState('');
  const [importedEvents, setImportedEvents] = useState<ImportedEvent[]>([
    { title: 'Board Meeting', date: '2026-02-15', time: '10:00 AM', conflict: true },
    { title: 'Workshop on NEP', date: '2026-02-19', time: '9:00 AM', conflict: false },
    { title: 'School Inspection', date: '2026-02-22', time: '11:00 AM', conflict: true },
    { title: 'Cultural Exchange', date: '2026-02-26', time: '10:00 AM', conflict: false },
  ]);
  const [showImportPreview, setShowImportPreview] = useState(false);

  // Field Trip state
  const [showFieldTrips, setShowFieldTrips] = useState(false);
  const [showTripForm, setShowTripForm] = useState(false);
  const [tripName, setTripName] = useState('');
  const [tripDest, setTripDest] = useState('');
  const [tripDate, setTripDate] = useState('2026-03-10');
  const [tripClasses, setTripClasses] = useState('Class V, VI');
  const [tripBuses, setTripBuses] = useState(2);
  const [tripBudgetTransport, setTripBudgetTransport] = useState(15000);
  const [tripBudgetEntry, setTripBudgetEntry] = useState(5000);
  const [tripBudgetMeals, setTripBudgetMeals] = useState(8000);
  const [tripBudgetMisc, setTripBudgetMisc] = useState(2000);
  const [tripConsentRequired, setTripConsentRequired] = useState(true);
  const [tripConsentDeadline, setTripConsentDeadline] = useState('2026-03-07');
  const [tripRiskNotes, setTripRiskNotes] = useState('');
  const [fieldTrips, setFieldTrips] = useState<FieldTrip[]>([
    { id: 'FT-1', name: 'Science Museum Visit', date: '5 Mar 2026', destination: 'Science City, Ahmedabad', classes: 'Class VII, VIII', buses: 3, budget: 45000, status: 'Approved', consentGiven: 72, consentTotal: 90, consentRequired: true, consentDeadline: '28 Feb 2026', riskNotes: 'First aid kit mandatory, 1:15 teacher ratio' },
    { id: 'FT-2', name: 'Nature Trail Excursion', date: '18 Mar 2026', destination: 'Polo Forest, Sabarkantha', classes: 'Class IX, X', buses: 2, budget: 35000, status: 'Planning', consentGiven: 0, consentTotal: 60, consentRequired: true, consentDeadline: '12 Mar 2026', riskNotes: 'Outdoor activity, carry insect repellent' },
    { id: 'FT-3', name: 'Heritage Walk', date: '12 Jan 2026', destination: 'Old City, Ahmedabad', classes: 'Class XI, XII', buses: 2, budget: 20000, status: 'Completed', consentGiven: 55, consentTotal: 55, consentRequired: true, consentDeadline: '8 Jan 2026', riskNotes: 'Walking tour, comfortable footwear required' },
  ]);

  // Audit Trail
  const [showAuditLog, setShowAuditLog] = useState(false);
  const [auditLog] = useState<AuditEntry[]>([
    { timestamp: '13 Feb 2026, 4:30 PM', user: 'Principal', action: 'Created event', eventName: 'Annual Day Celebration' },
    { timestamp: '13 Feb 2026, 3:15 PM', user: 'Admin', action: 'Updated venue for', eventName: 'PTM (Classes VI-X)' },
    { timestamp: '12 Feb 2026, 11:00 AM', user: 'Principal', action: 'Approved field trip', eventName: 'Science Museum Visit' },
    { timestamp: '12 Feb 2026, 9:45 AM', user: 'Vice Principal', action: 'Added RSVP requirement to', eventName: 'Staff Meeting' },
    { timestamp: '11 Feb 2026, 2:30 PM', user: 'Admin', action: 'Deleted event', eventName: 'Cancelled Workshop' },
    { timestamp: '10 Feb 2026, 10:00 AM', user: 'Principal', action: 'Created recurring event', eventName: 'Weekly Assembly' },
    { timestamp: '9 Feb 2026, 4:00 PM', user: 'Admin', action: 'Imported 4 events from', eventName: 'iCal file' },
    { timestamp: '8 Feb 2026, 11:30 AM', user: 'Coordinator', action: 'Updated budget for', eventName: 'Inter-House Cricket' },
  ]);

  const daysInMonth = 28;
  const startDay = 0; // Feb 2026 starts on Sunday
  const today = 13;
  const currentMonth = 'February 2026';

  // Events data — keyed by day of month
  // Color legend: Exam=blue, Holiday=red, Event/Function=purple, Sports=green, PTM=amber, Meeting=sky, Finance=orange, Training=indigo
  const [eventsData, setEventsData] = useState<Record<number, CalendarEvent[]>>({
    1: [{ label: 'Fee Due Date', time: '9:00 AM', type: 'Finance', color: 'bg-orange-400' }],
    5: [{ label: 'Staff Meeting', time: '9:00 AM', type: 'Meeting', color: 'bg-sky-400' }],
    8: [{ label: 'Inter-House Cricket', time: '10:00 AM', type: 'Sports', color: 'bg-green-400' }],
    10: [
      { label: 'Staff meeting', time: '9:00 AM', type: 'Meeting', color: 'bg-sky-400' },
      { label: 'PTM', time: '2:00 PM', type: 'PTM', color: 'bg-amber-400' },
    ],
    12: [{ label: 'Board Review', time: '11:00 AM', type: 'Meeting', color: 'bg-sky-400' }],
    14: [
      { label: "Valentine's Day celebration", time: '10:00 AM', type: 'Event', color: 'bg-purple-400' },
      { label: 'PTM (Classes VI-X)', time: '2:00 PM', type: 'PTM', color: 'bg-amber-400' },
    ],
    15: [
      { label: 'Mid-term exams begin', time: '8:00 AM', type: 'Exam', color: 'bg-blue-400' },
      { label: 'Fee Payment Deadline', time: '5:00 PM', type: 'Finance', color: 'bg-orange-400' },
    ],
    18: [{ label: 'Annual Sports Day', time: '9:00 AM', type: 'Sports', color: 'bg-green-400' }],
    20: [
      { label: 'Annual Day rehearsal', time: '10:00 AM', type: 'Event', color: 'bg-purple-400' },
      { label: 'POCSO Awareness Training', time: '2:00 PM', type: 'Training', color: 'bg-indigo-400' },
    ],
    22: [{ label: 'Republic Day (Observed)', time: '9:00 AM', type: 'Holiday', color: 'bg-red-400' }],
    25: [{ label: 'Inter-School Science Exhibition', time: '9:00 AM', type: 'Event', color: 'bg-purple-400' }],
    28: [{ label: 'Annual Day Celebration', time: '9:00 AM', type: 'Event', color: 'bg-purple-400' }],
  });

  const upcomingEvents = [
    { date: '14-Feb', label: 'Parent-Teacher Meeting (Classes VI-X)', type: 'PTM', color: 'bg-amber-500' },
    { date: '15-Feb', label: 'Fee Payment Deadline', type: 'Finance', color: 'bg-orange-500' },
    { date: '18-Feb', label: 'Annual Sports Day', type: 'Sports', color: 'bg-green-500' },
    { date: '20-Feb', label: 'POCSO Awareness Training — All Staff', type: 'Training', color: 'bg-indigo-500' },
    { date: '22-Feb', label: 'Republic Day (Observed)', type: 'Holiday', color: 'bg-red-500' },
    { date: '25-Feb', label: 'Inter-School Science Exhibition', type: 'Event', color: 'bg-purple-500' },
    { date: '28-Feb', label: 'Annual Day Celebration', type: 'Event', color: 'bg-purple-500' },
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const viewButtons: { id: CalendarView; label: string }[] = [
    { id: 'yearly', label: 'Yearly' },
    { id: 'monthly', label: 'Monthly' },
    { id: 'weekly', label: 'Weekly' },
    { id: 'today', label: 'Today' },
  ];

  const handleDateClick = (day: number) => {
    if (editMode) {
      setSelectedDate(day);
      setShowAddForm(true);
      setNewEventTitle('');
      setNewEventTime('09:00');
      setNewEventType('Meeting');
    } else {
      setSelectedDate(selectedDate === day ? null : day);
    }
  };

  const handleAddEvent = () => {
    if (!newEventTitle.trim() || selectedDate === null) return;
    const typeColors: Record<string, string> = {
      Exam: 'bg-blue-400', Holiday: 'bg-red-400', Event: 'bg-purple-400',
      Sports: 'bg-green-400', PTM: 'bg-amber-400', Meeting: 'bg-sky-400',
      Finance: 'bg-orange-400', Training: 'bg-indigo-400',
    };
    const newEvent: CalendarEvent = {
      label: newEventTitle,
      time: new Date(`2026-02-${String(selectedDate).padStart(2, '0')}T${newEventTime}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      type: newEventType,
      color: typeColors[newEventType] || 'bg-blue-400',
    };
    setEventsData(prev => ({
      ...prev,
      [selectedDate]: [...(prev[selectedDate] || []), newEvent],
    }));
    setShowAddForm(false);
    setNewEventTitle('');
  };

  const handleDeleteEvent = (day: number, idx: number) => {
    setEventsData(prev => {
      const updated = { ...prev };
      const dayEvents = [...(updated[day] || [])];
      dayEvents.splice(idx, 1);
      if (dayEvents.length === 0) {
        delete updated[day];
      } else {
        updated[day] = dayEvents;
      }
      return updated;
    });
  };

  // Get the week that contains today (Sun-Sat)
  const getTodayWeekDays = () => {
    // Feb 2026 starts on Sunday. today=13 means Feb 13
    // Day of week for day d: (startDay + d - 1) % 7
    const todayDow = (startDay + today - 1) % 7; // 0=Sun
    const weekStart = today - todayDow;
    const days: number[] = [];
    for (let i = 0; i < 7; i++) {
      const d = weekStart + i;
      if (d >= 1 && d <= daysInMonth) days.push(d);
      else days.push(-1); // out of month
    }
    return days;
  };

  const timeSlots = [
    '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
  ];

  // Get events for a specific time slot on a given day
  const getEventsAtTime = (day: number, slot: string) => {
    const dayEvents = eventsData[day] || [];
    return dayEvents.filter(e => e.time === slot);
  };

  // Month data for yearly view — all months of 2026
  const monthsData = [
    { name: 'January', days: 31, start: 4 }, // Jan 2026 starts on Thu
    { name: 'February', days: 28, start: 0 }, // Sun
    { name: 'March', days: 31, start: 0 }, // Sun
    { name: 'April', days: 30, start: 3 }, // Wed
    { name: 'May', days: 31, start: 5 }, // Fri
    { name: 'June', days: 30, start: 1 }, // Mon
    { name: 'July', days: 31, start: 3 }, // Wed
    { name: 'August', days: 31, start: 6 }, // Sat
    { name: 'September', days: 30, start: 2 }, // Tue
    { name: 'October', days: 31, start: 4 }, // Thu
    { name: 'November', days: 30, start: 0 }, // Sun
    { name: 'December', days: 31, start: 2 }, // Tue
  ];

  // Selected date detail panel
  const renderDateDetail = () => {
    if (selectedDate === null || editMode) return null;
    const dayEvents = eventsData[selectedDate] || [];
    const dayOfWeek = dayNames[(startDay + selectedDate - 1) % 7];
    return (
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 mt-4`}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className={`text-sm font-bold ${theme.highlight}`}>
              {dayOfWeek}, February {selectedDate}, 2026
            </h3>
            <p className={`text-[10px] ${theme.iconColor}`}>
              {dayEvents.length} event{dayEvents.length !== 1 ? 's' : ''} scheduled
            </p>
          </div>
          <button onClick={() => setSelectedDate(null)} className={`p-1.5 rounded-lg ${theme.buttonHover}`}>
            <X size={14} className={theme.iconColor} />
          </button>
        </div>
        {dayEvents.length === 0 ? (
          <div className={`text-center py-6 ${theme.secondaryBg} rounded-xl`}>
            <Calendar size={24} className={`${theme.iconColor} mx-auto mb-2`} />
            <p className={`text-xs ${theme.iconColor}`}>No events scheduled</p>
          </div>
        ) : (
          <div className="space-y-2">
            {dayEvents.map((ev, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${theme.secondaryBg}`}>
                <div className={`w-1.5 h-8 rounded-full ${ev.color} shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{ev.label}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{ev.time} &middot; {ev.type}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Add event form
  const renderAddEventForm = () => {
    if (!showAddForm || selectedDate === null) return null;
    const dayOfWeek = dayNames[(startDay + selectedDate - 1) % 7];
    return (
      <div className={`${theme.cardBg} rounded-2xl border-2 border-dashed ${theme.border} p-4 mt-4`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className={`text-sm font-bold ${theme.highlight}`}>
            Add Event — {dayOfWeek}, Feb {selectedDate}
          </h3>
          <button onClick={() => setShowAddForm(false)} className={`p-1.5 rounded-lg ${theme.buttonHover}`}>
            <X size={14} className={theme.iconColor} />
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Event Title</label>
            <input
              type="text"
              value={newEventTitle}
              onChange={e => setNewEventTitle(e.target.value)}
              placeholder="Enter event title..."
              className={`w-full px-3 py-2 rounded-lg text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight} outline-none focus:ring-2 focus:ring-purple-400`}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Time</label>
              <input
                type="time"
                value={newEventTime}
                onChange={e => setNewEventTime(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight} outline-none focus:ring-2 focus:ring-purple-400`}
              />
            </div>
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Type</label>
              <select
                value={newEventType}
                onChange={e => setNewEventType(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight} outline-none cursor-pointer focus:ring-2 focus:ring-purple-400`}
              >
                <option value="Meeting">Meeting</option>
                <option value="Event">Event / Function</option>
                <option value="Exam">Exam</option>
                <option value="PTM">PTM</option>
                <option value="Sports">Sports</option>
                <option value="Holiday">Holiday</option>
                <option value="Finance">Finance</option>
                <option value="Training">Training</option>
              </select>
            </div>
          </div>
          {/* Recurring Events Toggle */}
          <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Repeat size={12} className={theme.iconColor} />
                <label className={`text-[10px] font-bold ${theme.highlight} uppercase`}>Recurring Event</label>
              </div>
              <button
                onClick={() => setRecurringEnabled(!recurringEnabled)}
                className={`w-9 h-5 rounded-full transition-all relative ${recurringEnabled ? 'bg-emerald-500' : 'bg-gray-300'}`}
              >
                <div className="w-3.5 h-3.5 rounded-full bg-white shadow absolute top-[3px] transition-all"
                  style={{ left: recurringEnabled ? '18px' : '3px' }} />
              </button>
            </div>
            {recurringEnabled && (
              <div className="space-y-2 mt-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className={`text-[10px] ${theme.iconColor} block mb-1`}>Frequency</label>
                    <select value={recurringFrequency} onChange={e => setRecurringFrequency(e.target.value)}
                      className={`w-full px-2 py-1.5 rounded-lg text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight}`}>
                      <option>Daily</option><option>Weekly</option><option>Monthly</option><option>Custom</option>
                    </select>
                  </div>
                  <div>
                    <label className={`text-[10px] ${theme.iconColor} block mb-1`}>End</label>
                    <select value={recurringEndMode} onChange={e => setRecurringEndMode(e.target.value as 'date' | 'occurrences')}
                      className={`w-full px-2 py-1.5 rounded-lg text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight}`}>
                      <option value="date">By Date</option><option value="occurrences">After X times</option>
                    </select>
                  </div>
                </div>
                {recurringEndMode === 'date' ? (
                  <input type="date" value={recurringEndDate} onChange={e => setRecurringEndDate(e.target.value)}
                    className={`w-full px-2 py-1.5 rounded-lg text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight}`} />
                ) : (
                  <input type="number" value={recurringOccurrences} onChange={e => setRecurringOccurrences(Number(e.target.value))} min={1} max={52}
                    className={`w-full px-2 py-1.5 rounded-lg text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight}`} />
                )}
                <p className={`text-[10px] ${theme.iconColor} italic`}>
                  This event will repeat every {recurringFrequency === 'Daily' ? 'day' : recurringFrequency === 'Weekly' ? dayNames[(startDay + (selectedDate || 1) - 1) % 7] : 'month'}{' '}
                  {recurringEndMode === 'date' ? `until ${new Date(recurringEndDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}` : `for ${recurringOccurrences} occurrences`}
                </p>
              </div>
            )}
          </div>

          {/* RSVP Toggle */}
          <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Users size={12} className={theme.iconColor} />
                <label className={`text-[10px] font-bold ${theme.highlight} uppercase`}>Require RSVP</label>
              </div>
              <button
                onClick={() => setRequireRsvp(!requireRsvp)}
                className={`w-9 h-5 rounded-full transition-all relative ${requireRsvp ? 'bg-emerald-500' : 'bg-gray-300'}`}
              >
                <div className="w-3.5 h-3.5 rounded-full bg-white shadow absolute top-[3px] transition-all"
                  style={{ left: requireRsvp ? '18px' : '3px' }} />
              </button>
            </div>
            {requireRsvp && (
              <div className="mt-2">
                <label className={`text-[10px] ${theme.iconColor} block mb-1`}>RSVP Deadline</label>
                <input type="date" value={rsvpDeadline} onChange={e => setRsvpDeadline(e.target.value)}
                  className={`w-full px-2 py-1.5 rounded-lg text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight}`} />
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAddEvent}
              disabled={!newEventTitle.trim()}
              className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold flex items-center gap-1.5 disabled:opacity-50`}
            >
              <Save size={12} /> Save Event
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className={`px-4 py-2 rounded-xl border ${theme.border} text-xs font-bold ${theme.highlight}`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ─── MONTHLY VIEW ─────────────────────────
  const renderMonthlyView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className={`lg:col-span-2 ${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center justify-between mb-4">
          <button className={`p-1.5 rounded-lg ${theme.buttonHover}`}><ChevronLeft size={14} className={theme.iconColor} /></button>
          <h3 className={`text-sm font-bold ${theme.highlight}`}>{currentMonth}</h3>
          <button className={`p-1.5 rounded-lg ${theme.buttonHover}`}><ChevronRight size={14} className={theme.iconColor} /></button>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {dayNames.map(d => (
            <div key={d} className={`text-center text-[10px] font-bold ${theme.iconColor} uppercase py-1`}>{d}</div>
          ))}
          {Array.from({ length: startDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isToday = day === today;
            const isSelected = day === selectedDate && !isToday;
            const dayEvents = eventsData[day] || [];
            return (
              <div
                key={day}
                onClick={() => handleDateClick(day)}
                className={`relative p-1.5 rounded-lg text-center min-h-[48px] cursor-pointer transition-all ${
                  isToday
                    ? `${theme.primary} text-white`
                    : isSelected
                    ? 'ring-2 ring-purple-400 bg-purple-50'
                    : theme.secondaryBg
                } ${!isToday && !isSelected ? theme.buttonHover : ''}`}
              >
                <span className={`text-xs font-bold ${isToday ? 'text-white' : isSelected ? 'text-purple-700' : theme.highlight}`}>{day}</span>
                {dayEvents.length > 0 && (
                  <div className="flex justify-center gap-0.5 mt-0.5">
                    {dayEvents.map((e, ei) => (
                      <span key={ei} className={`w-1.5 h-1.5 rounded-full ${e.color}`} title={e.label} />
                    ))}
                  </div>
                )}
                {editMode && (
                  <div className="absolute top-0.5 right-0.5">
                    <Plus size={8} className={`${isToday ? 'text-white/70' : theme.iconColor} opacity-60`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {/* Date detail panel or add event form */}
        {renderDateDetail()}
        {renderAddEventForm()}
      </div>

      {/* Upcoming Events List */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Upcoming Events</h3>
        <div className="space-y-2">
          {upcomingEvents.map((e, i) => (
            <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className={`w-8 h-8 rounded-lg ${e.color} text-white flex items-center justify-center shrink-0`}>
                <Calendar size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-bold ${theme.highlight} truncate`}>{e.label}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{e.date} &middot; {e.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ─── WEEKLY VIEW ─────────────────────────
  const renderWeeklyView = () => {
    const weekDays = getTodayWeekDays();
    return (
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-4`}>
          Week of February {weekDays.find(d => d > 0) || '?'} - {weekDays.filter(d => d > 0).pop() || '?'}, 2026
        </h3>
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day, i) => {
            const isToday = day === today;
            const isSelected = day === selectedDate && !isToday;
            const dayEvents = day > 0 ? (eventsData[day] || []) : [];
            return (
              <div key={i} className="space-y-1">
                <div
                  onClick={() => day > 0 && handleDateClick(day)}
                  className={`text-center p-2 rounded-xl cursor-pointer transition-all ${
                    isToday ? `${theme.primary} text-white` : isSelected ? 'ring-2 ring-purple-400 bg-purple-50' : theme.secondaryBg
                  } ${!isToday && !isSelected ? theme.buttonHover : ''}`}
                >
                  <p className={`text-[10px] font-bold uppercase ${isToday ? 'text-white/80' : theme.iconColor}`}>{dayNames[i]}</p>
                  <p className={`text-lg font-bold ${isToday ? 'text-white' : isSelected ? 'text-purple-700' : theme.highlight}`}>
                    {day > 0 ? day : ''}
                  </p>
                </div>
                {day > 0 && dayEvents.length === 0 && (
                  <div className={`p-2 rounded-lg ${theme.accentBg} text-center`}>
                    <p className={`text-[9px] ${theme.iconColor}`}>No events</p>
                  </div>
                )}
                {dayEvents.map((ev, ei) => (
                  <div key={ei} className={`p-2 rounded-lg border-l-2 ${ev.color.replace('bg-', 'border-')} ${theme.accentBg}`}>
                    <p className={`text-[10px] font-bold ${theme.highlight} truncate`}>{ev.label}</p>
                    <p className={`text-[9px] ${theme.iconColor}`}>{ev.time}</p>
                    {editMode && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDeleteEvent(day, ei); }}
                        className="mt-1 p-0.5 rounded hover:bg-red-100"
                      >
                        <Trash2 size={9} className="text-red-400" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
        {renderDateDetail()}
        {renderAddEventForm()}
      </div>
    );
  };

  // ─── TODAY VIEW ─────────────────────────
  const renderTodayView = () => {
    const todayEvents = eventsData[today] || [];
    const dayOfWeek = dayNames[(startDay + today - 1) % 7];
    return (
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className={`text-lg font-bold ${theme.highlight}`}>
              {dayOfWeek}, February {today}, 2026
            </h3>
            <p className={`text-xs ${theme.iconColor}`}>
              {todayEvents.length} event{todayEvents.length !== 1 ? 's' : ''} today
            </p>
          </div>
          <div className={`w-12 h-12 rounded-2xl ${theme.primary} text-white flex flex-col items-center justify-center`}>
            <span className="text-lg font-bold leading-none">{today}</span>
            <span className="text-[8px] uppercase">Feb</span>
          </div>
        </div>
        <div className="space-y-1">
          {timeSlots.map((slot) => {
            const slotEvents = getEventsAtTime(today, slot);
            return (
              <div key={slot} className={`flex items-stretch gap-3 min-h-[44px]`}>
                <div className={`w-16 shrink-0 py-2 text-right`}>
                  <span className={`text-[10px] font-bold ${theme.iconColor}`}>{slot}</span>
                </div>
                <div className={`w-px ${theme.border} border-l shrink-0`} />
                <div className="flex-1 py-1">
                  {slotEvents.length > 0 ? (
                    <div className="space-y-1">
                      {slotEvents.map((ev, i) => (
                        <div key={i} className={`flex items-center gap-2 p-2 rounded-lg ${ev.color} bg-opacity-20`}>
                          <div className={`w-1.5 h-6 rounded-full ${ev.color} shrink-0`} />
                          <div className="flex-1">
                            <p className={`text-xs font-bold ${theme.highlight}`}>{ev.label}</p>
                            <p className={`text-[10px] ${theme.iconColor}`}>{ev.type}</p>
                          </div>
                          {editMode && (
                            <button
                              onClick={() => handleDeleteEvent(today, (eventsData[today] || []).indexOf(ev))}
                              className="p-1 rounded hover:bg-red-100"
                            >
                              <Trash2 size={10} className="text-red-400" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={`h-full rounded-lg ${theme.accentBg} border border-dashed ${theme.border} opacity-40`} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ─── YEARLY VIEW ─────────────────────────
  const renderYearlyView = () => (
    <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
      <h3 className={`text-sm font-bold ${theme.highlight} mb-4 text-center`}>2026 — Yearly Overview</h3>
      <div className="grid grid-cols-4 gap-4">
        {monthsData.map((m, mi) => {
          const isCurrentMonth = mi === 1; // February is index 1
          return (
            <div key={m.name} className={`p-3 rounded-xl ${isCurrentMonth ? 'ring-2 ring-purple-400' : ''} ${theme.secondaryBg}`}>
              <p className={`text-[10px] font-bold ${isCurrentMonth ? 'text-purple-600' : theme.highlight} text-center mb-2 uppercase`}>{m.name}</p>
              <div className="grid grid-cols-7 gap-px">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, di) => (
                  <div key={di} className={`text-center text-[7px] ${theme.iconColor} font-bold`}>{d}</div>
                ))}
                {Array.from({ length: m.start }).map((_, i) => (
                  <div key={`e-${i}`} />
                ))}
                {Array.from({ length: m.days }).map((_, i) => {
                  const day = i + 1;
                  const isToday2 = isCurrentMonth && day === today;
                  const hasEvents = isCurrentMonth && eventsData[day] && eventsData[day].length > 0;
                  return (
                    <div
                      key={day}
                      className={`text-center text-[8px] py-0.5 rounded-sm relative ${
                        isToday2 ? `${theme.primary} text-white font-bold` : theme.highlight
                      }`}
                    >
                      {day}
                      {hasEvents && !isToday2 && (
                        <span className="absolute -bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-400" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ─── RSVP DETAILS PANEL ─────────────────────────
  const renderRsvpPanel = () => {
    if (!showRsvpDetails) return null;
    const accepted = rsvpData.filter(r => r.status === 'Accepted').length;
    const declined = rsvpData.filter(r => r.status === 'Declined').length;
    const pending = rsvpData.filter(r => r.status === 'Pending').length;
    return (
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className={`text-sm font-bold ${theme.highlight} flex items-center gap-2`}>
            <Users size={14} /> RSVP Status — Staff Meeting (Feb 5)
          </h3>
          <button onClick={() => setShowRsvpDetails(false)} className={`p-1.5 rounded-lg ${theme.buttonHover}`}>
            <X size={14} className={theme.iconColor} />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className={`p-3 rounded-xl bg-emerald-50 text-center`}>
            <p className="text-lg font-bold text-emerald-600">{accepted}</p>
            <p className="text-[10px] text-emerald-700 font-medium">Accepted</p>
          </div>
          <div className={`p-3 rounded-xl bg-red-50 text-center`}>
            <p className="text-lg font-bold text-red-600">{declined}</p>
            <p className="text-[10px] text-red-700 font-medium">Declined</p>
          </div>
          <div className={`p-3 rounded-xl bg-amber-50 text-center`}>
            <p className="text-lg font-bold text-amber-600">{pending}</p>
            <p className="text-[10px] text-amber-700 font-medium">Pending</p>
          </div>
        </div>
        <div className={`border ${theme.border} rounded-xl overflow-hidden`}>
          <div className={`grid grid-cols-4 gap-2 px-3 py-2 ${theme.secondaryBg}`}>
            <p className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>Name</p>
            <p className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>Role</p>
            <p className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>Status</p>
            <p className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>Response</p>
          </div>
          {rsvpData.map((r, i) => (
            <div key={i} className={`grid grid-cols-4 gap-2 px-3 py-2 border-t ${theme.border}`}>
              <p className={`text-xs ${theme.highlight}`}>{r.name}</p>
              <p className={`text-xs ${theme.iconColor}`}>{r.role}</p>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full w-fit ${
                r.status === 'Accepted' ? 'bg-emerald-100 text-emerald-700' :
                r.status === 'Declined' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
              }`}>{r.status}</span>
              <p className={`text-xs ${theme.iconColor}`}>{r.date}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-3">
          <button className={`px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold flex items-center gap-1`}>
            <Send size={10} /> Remind Pending ({pending})
          </button>
          <p className={`text-[10px] ${theme.iconColor} flex items-center gap-1`}>
            <Clock size={10} /> Deadline: {new Date(rsvpDeadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        </div>
      </div>
    );
  };

  // ─── CALENDAR IMPORT MODAL ─────────────────────────
  const renderImportModal = () => {
    if (!showImportModal) return null;
    return (
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 w-full max-w-lg`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-sm font-bold ${theme.highlight} flex items-center gap-2`}>
              <Upload size={14} /> Import Calendar
            </h3>
            <button onClick={() => { setShowImportModal(false); setShowImportPreview(false); }} className={`p-1.5 rounded-lg ${theme.buttonHover}`}>
              <X size={14} className={theme.iconColor} />
            </button>
          </div>

          {!showImportPreview ? (
            <div className="space-y-4">
              <div className={`flex gap-1 p-1 rounded-xl ${theme.secondaryBg} w-fit`}>
                <button onClick={() => setImportMethod('file')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${importMethod === 'file' ? `${theme.primary} text-white` : theme.iconColor}`}>
                  Upload File
                </button>
                <button onClick={() => setImportMethod('url')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${importMethod === 'url' ? `${theme.primary} text-white` : theme.iconColor}`}>
                  iCal URL
                </button>
              </div>

              {importMethod === 'file' ? (
                <div className={`border-2 border-dashed ${theme.border} rounded-xl p-8 text-center`}>
                  <Upload size={24} className={`${theme.iconColor} mx-auto mb-2`} />
                  <p className={`text-xs ${theme.highlight} font-bold mb-1`}>Drop .ics or .xlsx file here</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>or click to browse files</p>
                  <button onClick={() => setShowImportPreview(true)}
                    className={`mt-3 px-4 py-2 rounded-xl border ${theme.border} text-xs font-bold ${theme.highlight}`}>
                    Select File
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <input type="url" value={importUrl} onChange={e => setImportUrl(e.target.value)}
                    placeholder="https://calendar.google.com/...ical"
                    className={`w-full px-3 py-2 rounded-lg text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight}`} />
                  <button onClick={() => setShowImportPreview(true)}
                    className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>
                    Fetch Events
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <p className={`text-xs ${theme.iconColor}`}>Preview: {importedEvents.length} events found</p>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {importedEvents.map((ev, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${ev.conflict ? 'bg-amber-50 border border-amber-200' : theme.secondaryBg}`}>
                    <div className={`w-1.5 h-8 rounded-full ${ev.conflict ? 'bg-amber-400' : 'bg-emerald-400'} shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold ${theme.highlight}`}>{ev.title}</p>
                      <p className={`text-[10px] ${theme.iconColor}`}>{ev.date} at {ev.time}</p>
                    </div>
                    {ev.conflict && (
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold flex items-center gap-1">
                        <AlertTriangle size={8} /> Conflict
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setShowImportModal(false); setShowImportPreview(false); }}
                  className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold flex items-center gap-1`}>
                  <Upload size={12} /> Import {importedEvents.length} Events
                </button>
                <button onClick={() => setShowImportPreview(false)}
                  className={`px-4 py-2 rounded-xl border ${theme.border} text-xs font-bold ${theme.highlight}`}>
                  Back
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── FIELD TRIPS SECTION ─────────────────────────
  const renderFieldTrips = () => {
    if (!showFieldTrips) return null;
    const tripStatusColors: Record<string, string> = { Planning: 'bg-amber-100 text-amber-700', Approved: 'bg-emerald-100 text-emerald-700', Completed: 'bg-gray-100 text-gray-600' };
    const tripChecklist = [
      { item: 'First aid kit packed', done: true },
      { item: 'Emergency contacts list', done: true },
      { item: 'Headcount sheets printed', done: false },
      { item: 'Bus inspection completed', done: true },
      { item: 'Parent consent forms collected', done: false },
      { item: 'Teacher supervisors assigned', done: true },
    ];

    return (
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-sm font-bold ${theme.highlight} flex items-center gap-2`}>
            <MapPin size={14} /> Field Trips
          </h3>
          <div className="flex gap-2">
            <button onClick={() => setShowTripForm(!showTripForm)}
              className={`px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold flex items-center gap-1`}>
              <Plus size={12} /> Plan Trip
            </button>
            <button onClick={() => setShowFieldTrips(false)} className={`p-1.5 rounded-lg ${theme.buttonHover}`}>
              <X size={14} className={theme.iconColor} />
            </button>
          </div>
        </div>

        {/* Trip Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-4">
          {fieldTrips.map(trip => (
            <div key={trip.id} className={`p-4 rounded-xl border ${theme.border} ${theme.secondaryBg}`}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>{trip.name}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{trip.date}</p>
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${tripStatusColors[trip.status]}`}>{trip.status}</span>
              </div>
              <div className="space-y-1.5">
                <p className={`text-[10px] ${theme.iconColor} flex items-center gap-1`}><MapPin size={9} /> {trip.destination}</p>
                <p className={`text-[10px] ${theme.iconColor} flex items-center gap-1`}><Users size={9} /> {trip.classes}</p>
                <p className={`text-[10px] ${theme.iconColor} flex items-center gap-1`}><Bus size={9} /> {trip.buses} buses</p>
                <p className={`text-[10px] ${theme.iconColor} flex items-center gap-1`}><DollarSign size={9} /> INR {trip.budget.toLocaleString()}</p>
              </div>
              {trip.consentRequired && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className={`text-[10px] font-bold ${theme.iconColor}`}>Consent: {trip.consentGiven}/{trip.consentTotal}</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>{Math.round((trip.consentGiven / trip.consentTotal) * 100)}%</p>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
                    <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${(trip.consentGiven / trip.consentTotal) * 100}%` }} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Plan Trip Form */}
        {showTripForm && (
          <div className={`p-4 rounded-xl border-2 border-dashed ${theme.border} space-y-3`}>
            <h4 className={`text-xs font-bold ${theme.highlight}`}>Plan New Trip</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Trip Name</label>
                <input type="text" value={tripName} onChange={e => setTripName(e.target.value)} placeholder="e.g., Zoo Visit"
                  className={`w-full px-2 py-1.5 rounded-lg text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight}`} />
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Destination</label>
                <input type="text" value={tripDest} onChange={e => setTripDest(e.target.value)} placeholder="e.g., Kamla Nehru Zoo"
                  className={`w-full px-2 py-1.5 rounded-lg text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight}`} />
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Date</label>
                <input type="date" value={tripDate} onChange={e => setTripDate(e.target.value)}
                  className={`w-full px-2 py-1.5 rounded-lg text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight}`} />
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Classes Involved</label>
                <input type="text" value={tripClasses} onChange={e => setTripClasses(e.target.value)}
                  className={`w-full px-2 py-1.5 rounded-lg text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight}`} />
              </div>
            </div>

            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Transport</label>
              <div className="flex items-center gap-2">
                <span className={`text-xs ${theme.iconColor}`}>Buses needed:</span>
                <input type="number" value={tripBuses} onChange={e => setTripBuses(Number(e.target.value))} min={1} max={10}
                  className={`w-16 px-2 py-1.5 rounded-lg text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight}`} />
              </div>
            </div>

            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-2`}>Budget Breakdown (INR)</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: 'Transport', val: tripBudgetTransport, set: setTripBudgetTransport },
                  { label: 'Entry Fees', val: tripBudgetEntry, set: setTripBudgetEntry },
                  { label: 'Meals', val: tripBudgetMeals, set: setTripBudgetMeals },
                  { label: 'Misc', val: tripBudgetMisc, set: setTripBudgetMisc },
                ].map(b => (
                  <div key={b.label}>
                    <p className={`text-[9px] ${theme.iconColor} mb-1`}>{b.label}</p>
                    <input type="number" value={b.val} onChange={e => b.set(Number(e.target.value))}
                      className={`w-full px-2 py-1 rounded-lg text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight}`} />
                  </div>
                ))}
              </div>
              <p className={`text-[10px] font-bold ${theme.highlight} mt-1`}>
                Total: INR {(tripBudgetTransport + tripBudgetEntry + tripBudgetMeals + tripBudgetMisc).toLocaleString()}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button onClick={() => setTripConsentRequired(!tripConsentRequired)}
                  className={`w-9 h-5 rounded-full transition-all relative ${tripConsentRequired ? 'bg-emerald-500' : 'bg-gray-300'}`}>
                  <div className="w-3.5 h-3.5 rounded-full bg-white shadow absolute top-[3px] transition-all"
                    style={{ left: tripConsentRequired ? '18px' : '3px' }} />
                </button>
                <span className={`text-xs ${theme.highlight}`}>Require Parent Consent</span>
              </div>
              {tripConsentRequired && (
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] ${theme.iconColor}`}>Deadline:</span>
                  <input type="date" value={tripConsentDeadline} onChange={e => setTripConsentDeadline(e.target.value)}
                    className={`px-2 py-1 rounded-lg text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight}`} />
                </div>
              )}
            </div>

            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Risk Assessment / Safety Notes</label>
              <textarea value={tripRiskNotes} onChange={e => setTripRiskNotes(e.target.value)}
                placeholder="Safety considerations, medical concerns, emergency protocols..."
                rows={2}
                className={`w-full px-2 py-1.5 rounded-lg text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight} resize-none`} />
            </div>

            <div className="flex gap-2">
              <button onClick={() => {
                if (!tripName.trim() || !tripDest.trim()) return;
                setFieldTrips(prev => [...prev, {
                  id: `FT-${prev.length + 1}`, name: tripName, date: new Date(tripDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
                  destination: tripDest, classes: tripClasses, buses: tripBuses,
                  budget: tripBudgetTransport + tripBudgetEntry + tripBudgetMeals + tripBudgetMisc,
                  status: 'Planning', consentGiven: 0, consentTotal: 60, consentRequired: tripConsentRequired,
                  consentDeadline: tripConsentDeadline, riskNotes: tripRiskNotes,
                }]);
                setShowTripForm(false); setTripName(''); setTripDest(''); setTripRiskNotes('');
              }} className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold flex items-center gap-1`}>
                <Save size={12} /> Save Trip
              </button>
              <button onClick={() => setShowTripForm(false)}
                className={`px-4 py-2 rounded-xl border ${theme.border} text-xs font-bold ${theme.highlight}`}>Cancel</button>
            </div>
          </div>
        )}

        {/* Trip Checklist */}
        <div className={`mt-4 p-3 rounded-xl ${theme.secondaryBg}`}>
          <h4 className={`text-xs font-bold ${theme.highlight} mb-2 flex items-center gap-1`}>
            <ClipboardCheck size={12} /> Trip Checklist (Next Trip)
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {tripChecklist.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${item.done ? 'border-emerald-500 bg-emerald-500' : theme.border}`}>
                  {item.done && <CheckCircle size={10} className="text-white" />}
                </div>
                <span className={`text-[10px] ${item.done ? 'line-through ' + theme.iconColor : theme.highlight}`}>{item.item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ─── AUDIT TRAIL ─────────────────────────
  const renderAuditTrail = () => (
    <div className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden`}>
      <button onClick={() => setShowAuditLog(!showAuditLog)}
        className={`w-full flex items-center justify-between p-4 ${theme.buttonHover}`}>
        <div className="flex items-center gap-2">
          <History size={14} className={theme.iconColor} />
          <h3 className={`text-sm font-bold ${theme.highlight}`}>Activity Log</h3>
          <span className={`text-[9px] px-2 py-0.5 rounded-full ${theme.secondaryBg} ${theme.iconColor} font-bold`}>{auditLog.length}</span>
        </div>
        <ChevronDown size={14} className={`${theme.iconColor} transition-transform ${showAuditLog ? 'rotate-180' : ''}`} />
      </button>
      {showAuditLog && (
        <div className={`px-4 pb-4 space-y-2`}>
          {auditLog.map((entry, i) => (
            <div key={i} className={`flex items-start gap-3 p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className={`w-6 h-6 rounded-full ${theme.primary} flex items-center justify-center shrink-0 mt-0.5`}>
                <FileText size={10} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs ${theme.highlight}`}>
                  <strong>{entry.user}</strong> {entry.action} <strong>&ldquo;{entry.eventName}&rdquo;</strong>
                </p>
                <p className={`text-[10px] ${theme.iconColor} flex items-center gap-1`}>
                  <Clock size={9} /> {entry.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>School Calendar</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowImportModal(true)}
            className={`px-3 py-1.5 rounded-xl border ${theme.border} text-xs font-bold ${theme.highlight} ${theme.buttonHover} flex items-center gap-1.5`}>
            <Upload size={12} /> Import
          </button>
          <button onClick={() => setShowFieldTrips(!showFieldTrips)}
            className={`px-3 py-1.5 rounded-xl border ${theme.border} text-xs font-bold ${theme.highlight} ${theme.buttonHover} flex items-center gap-1.5 ${showFieldTrips ? 'ring-2 ring-purple-400' : ''}`}>
            <MapPin size={12} /> Field Trips
          </button>
          <button onClick={() => setShowRsvpDetails(!showRsvpDetails)}
            className={`px-3 py-1.5 rounded-xl border ${theme.border} text-xs font-bold ${theme.highlight} ${theme.buttonHover} flex items-center gap-1.5`}>
            <Users size={12} /> RSVP
          </button>
          {/* Edit toggle */}
          <button
            onClick={() => { setEditMode(!editMode); setShowAddForm(false); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              editMode
                ? 'bg-purple-500 text-white'
                : `border ${theme.border} ${theme.highlight} ${theme.buttonHover}`
            }`}
          >
            <Edit2 size={12} /> {editMode ? 'Editing' : 'Edit'}
          </button>
        </div>
      </div>

      {/* View Toggle Buttons */}
      <div className={`flex gap-1 p-1 rounded-xl ${theme.secondaryBg} w-fit`}>
        {viewButtons.map(v => (
          <button
            key={v.id}
            onClick={() => { setCalendarView(v.id); setSelectedDate(null); setShowAddForm(false); }}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              calendarView === v.id
                ? `${theme.primary} text-white`
                : `${theme.iconColor} ${theme.buttonHover}`
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* Render active view */}
      {calendarView === 'monthly' && renderMonthlyView()}
      {calendarView === 'weekly' && renderWeeklyView()}
      {calendarView === 'today' && renderTodayView()}
      {calendarView === 'yearly' && renderYearlyView()}

      {/* RSVP Details Panel */}
      {renderRsvpPanel()}

      {/* Field Trips Section */}
      {renderFieldTrips()}

      {/* Activity Log / Audit Trail */}
      {renderAuditTrail()}

      {/* Import Modal (rendered as overlay) */}
      {renderImportModal()}
    </div>
  );
}
