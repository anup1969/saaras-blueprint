'use client';

import { useState } from 'react';
import { type Theme } from '@/lib/themes';
import {
  Calendar, Plus, X, Save, Edit2,
  ChevronRight, ChevronLeft, Trash2,
} from 'lucide-react';

interface CalendarEvent {
  label: string;
  time: string;
  type: string;
  color: string;
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

  const daysInMonth = 28;
  const startDay = 0; // Feb 2026 starts on Sunday
  const today = 13;
  const currentMonth = 'February 2026';

  // Events data — keyed by day of month
  const [eventsData, setEventsData] = useState<Record<number, CalendarEvent[]>>({
    1: [{ label: 'Fee Due Date', time: '9:00 AM', type: 'Finance', color: 'bg-amber-400' }],
    5: [{ label: 'Staff Meeting', time: '9:00 AM', type: 'Meeting', color: 'bg-blue-400' }],
    10: [
      { label: 'Staff meeting', time: '9:00 AM', type: 'Meeting', color: 'bg-blue-400' },
      { label: 'PTM', time: '2:00 PM', type: 'Meeting', color: 'bg-purple-400' },
    ],
    12: [{ label: 'Board Review', time: '11:00 AM', type: 'Meeting', color: 'bg-blue-400' }],
    14: [
      { label: "Valentine's Day celebration", time: '10:00 AM', type: 'Event', color: 'bg-pink-400' },
      { label: 'PTM (Classes VI-X)', time: '2:00 PM', type: 'Meeting', color: 'bg-purple-400' },
    ],
    15: [
      { label: 'Mid-term exams begin', time: '8:00 AM', type: 'Exam', color: 'bg-red-400' },
      { label: 'Fee Payment Deadline', time: '5:00 PM', type: 'Finance', color: 'bg-red-400' },
    ],
    20: [
      { label: 'Annual Day rehearsal', time: '10:00 AM', type: 'Event', color: 'bg-pink-400' },
      { label: 'POCSO Awareness Training', time: '2:00 PM', type: 'Training', color: 'bg-indigo-400' },
    ],
    25: [{ label: 'Inter-School Science Exhibition', time: '9:00 AM', type: 'Event', color: 'bg-teal-400' }],
    28: [{ label: 'Annual Day Celebration', time: '9:00 AM', type: 'Event', color: 'bg-pink-400' }],
  });

  const upcomingEvents = [
    { date: '14-Feb', label: 'Parent-Teacher Meeting (Classes VI-X)', type: 'Meeting', color: 'bg-purple-500' },
    { date: '15-Feb', label: 'Fee Payment Deadline', type: 'Finance', color: 'bg-red-500' },
    { date: '20-Feb', label: 'POCSO Awareness Training — All Staff', type: 'Training', color: 'bg-indigo-500' },
    { date: '25-Feb', label: 'Inter-School Science Exhibition', type: 'Event', color: 'bg-teal-500' },
    { date: '28-Feb', label: 'Annual Day Celebration', type: 'Event', color: 'bg-pink-500' },
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
      Meeting: 'bg-blue-400', Event: 'bg-pink-400', Exam: 'bg-red-400',
      Finance: 'bg-amber-400', Training: 'bg-indigo-400', Holiday: 'bg-emerald-400',
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
                <option value="Event">Event</option>
                <option value="Exam">Exam</option>
                <option value="Finance">Finance</option>
                <option value="Training">Training</option>
                <option value="Holiday">Holiday</option>
              </select>
            </div>
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>School Calendar</h1>
        <div className="flex items-center gap-2">
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
    </div>
  );
}
