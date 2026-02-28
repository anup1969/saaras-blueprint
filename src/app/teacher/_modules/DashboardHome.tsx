'use client';

import React, { useState, useRef, useEffect } from 'react';
import { StatCard } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  BookOpen, ClipboardCheck, FileText, Award, Calendar, Clock,
  Bell, Users, CheckCircle, AlertTriangle, ArrowRight,
  PenTool, BookMarked, CalendarDays, TrendingUp,
  Pencil, ListTodo, CircleDot, Mail, Megaphone, MessageSquare, Notebook
} from 'lucide-react';
import TaskTrackerPanel from '@/components/TaskTrackerPanel';

// ─── MOCK DATA ──────────────────────────────────────

const teacherProfile = {
  name: 'Ms. Priya Sharma',
  empId: 'EMP042',
  subjects: ['Mathematics', 'Science'],
  department: 'Science & Mathematics',
  classes: ['10-A', '10-B', '9-A', '9-B', '8-A', '6-A'],
};

const timetableData: Record<string, string[]> = {
  Mon: ['10-A Math', '10-B Math', 'Free', '9-A Science', '6-A Math', 'Free', 'Staff Meeting', 'Free'],
  Tue: ['Free', '10-B Math', '9-A Science', 'Free', 'Free', '8-A Math', '9-B Science', 'Free'],
  Wed: ['10-A Math', 'Free', 'Free', '9-B Science', '6-A Math', 'Free', 'Lab Duty', 'Free'],
  Thu: ['Free', '10-B Math', '9-A Science', 'Free', 'Free', '8-A Math', 'Free', 'PTM Slot'],
  Fri: ['10-A Math', 'Free', 'Free', '9-B Science', '6-A Math', 'Free', 'Free', 'Free'],
  Sat: ['8-A Math', '9-A Science', '6-A Math', 'Free', '', '', '', ''],
};

const periodTimings = [
  '7:50 - 8:30', '8:30 - 9:10', '9:10 - 9:50', '10:05 - 10:45',
  '10:45 - 11:25', '12:00 - 12:40', '12:40 - 1:20', '1:20 - 2:00',
];

const upcomingEvents = [
  { title: 'Science Fair — Judge Panel', date: '15 Feb 2026', type: 'Event' },
  { title: 'PTM — Class 10-A', date: '20 Feb 2026', type: 'PTM' },
  { title: 'Annual Day Rehearsal', date: '25 Feb 2026', type: 'Event' },
  { title: 'Inter-house Quiz — Coordinator', date: '28 Feb 2026', type: 'Competition' },
];

const pendingDeadlines = [
  { title: 'UT-3 Marks Entry — All Classes', due: '12 Feb 2026', status: 'Overdue' },
  { title: 'Homework Grading — 10-A Ch.7', due: '13 Feb 2026', status: 'Due Today' },
  { title: 'Lesson Plan Submission — March', due: '15 Feb 2026', status: 'Upcoming' },
  { title: 'Lab Report Review — 8-A', due: '18 Feb 2026', status: 'Upcoming' },
];

const myTasksList = [
  { title: 'Prepare UT-3 question paper — 10-A & 10-B', status: 'In Progress', priority: 'High', due: '14 Feb 2026', icon: Pencil, priorityColor: 'bg-amber-500', statusColor: 'text-amber-600' },
  { title: 'Submit Science Fair project list to HOD', status: 'Not Started', priority: 'Medium', due: '15 Feb 2026', icon: FileText, priorityColor: 'bg-blue-500', statusColor: 'text-slate-500' },
  { title: 'Complete lesson plan — Ch 8 Trigonometry', status: 'In Progress', priority: 'High', due: '16 Feb 2026', icon: BookMarked, priorityColor: 'bg-amber-500', statusColor: 'text-amber-600' },
  { title: 'Review lab report submissions — Class 8-A', status: 'Not Started', priority: 'Low', due: '18 Feb 2026', icon: ClipboardCheck, priorityColor: 'bg-emerald-500', statusColor: 'text-slate-500' },
];

// Room mapping for timetable entries
const roomMap: Record<string, string> = {
  '10-A Math': 'Room 301',
  '10-B Math': 'Room 302',
  '9-A Science': 'Lab 1',
  '9-B Science': 'Lab 2',
  '8-A Math': 'Room 204',
  '6-A Math': 'Room 106',
  'Staff Meeting': 'Staff Room',
  'Lab Duty': 'Lab 2',
  'PTM Slot': 'Room 301',
};

export default function DashboardHome({ theme, isPreschool }: { theme: Theme; isPreschool?: boolean }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    }
    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNotifications]);

  const notifications = [
    { id: 1, icon: ClipboardCheck, title: 'Attendance not marked for 10-A', time: '10 min ago', color: 'border-amber-500', read: false },
    { id: 2, icon: FileText, title: 'Homework submissions: Ch 7 Coordinate Geometry (28/42)', time: '25 min ago', color: 'border-blue-500', read: false },
    { id: 3, icon: MessageSquare, title: 'New message from Vice Principal regarding PTM schedule', time: '1 hour ago', color: 'border-purple-500', read: false },
    { id: 4, icon: Calendar, title: 'Staff meeting today at 1:00 PM — Agenda updated', time: '2 hours ago', color: 'border-teal-500', read: true },
    { id: 5, icon: CheckCircle, title: 'Leave request approved — 20 Feb (1 day CL)', time: '3 hours ago', color: 'border-emerald-500', read: true },
    { id: 6, icon: AlertTriangle, title: 'Gradebook deadline: UT-3 marks entry by 15 Feb', time: '5 hours ago', color: 'border-red-500', read: true },
  ];

  // ── Determine today's timetable dynamically ──
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const now = new Date();
  const todayKey = dayNames[now.getDay()];
  const todaySchedule = timetableData[todayKey] || timetableData['Wed']; // fallback to Wed for demo
  const todayDayLabel = now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  // Determine current period based on time
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const periodRanges = periodTimings.map(t => {
    const [startStr, endStr] = t.split(' - ');
    const [sh, sm] = startStr.split(':').map(Number);
    const [eh, em] = endStr.split(':').map(Number);
    return { start: sh * 60 + sm, end: eh * 60 + em };
  });

  let currentPeriodIdx = -1;
  let nextPeriodIdx = -1;
  for (let i = 0; i < periodRanges.length; i++) {
    if (currentMinutes >= periodRanges[i].start && currentMinutes < periodRanges[i].end) {
      currentPeriodIdx = i;
    }
    if (nextPeriodIdx === -1 && currentMinutes < periodRanges[i].start) {
      nextPeriodIdx = i;
    }
  }

  return (
    <div className="space-y-4">
      {isPreschool && (
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800">
          <AlertTriangle size={14} className="text-amber-500 shrink-0" />
          <p className="text-xs font-medium">Preschool Mode — Activity-based approach: daily logs, meals, naps, milestones</p>
        </div>
      )}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${theme.highlight}`}>Good Morning, Ms. Priya</h1>
          <p className={`text-xs ${theme.iconColor} mt-1`}>{todayDayLabel} | Employee ID: {teacherProfile.empId}</p>
        </div>
        <div className="flex gap-2 items-center">
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setShowNotifications(prev => !prev)}
              className={`p-2.5 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} relative`}
            >
              <Bell size={16} className={theme.iconColor} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">3</span>
            </button>

            {showNotifications && (
              <div className={`absolute right-0 top-12 w-80 ${theme.cardBg} rounded-2xl border ${theme.border} shadow-2xl z-50 overflow-hidden`}>
                <div className={`px-4 py-3 border-b ${theme.border} flex items-center justify-between`}>
                  <h4 className={`text-sm font-bold ${theme.highlight}`}>Notifications</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500 text-white font-bold">3 new</span>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map(n => (
                    <div
                      key={n.id}
                      className={`px-4 py-3 border-l-[3px] ${n.color} ${!n.read ? theme.accentBg : ''} hover:${theme.secondaryBg} transition-colors cursor-pointer border-b ${theme.border}`}
                    >
                      <div className="flex items-start gap-3">
                        <n.icon size={14} className={`${theme.iconColor} mt-0.5 shrink-0`} />
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs ${!n.read ? `font-bold ${theme.highlight}` : theme.iconColor} leading-relaxed`}>{n.title}</p>
                          <p className={`text-[10px] ${theme.iconColor} mt-1`}>{n.time}</p>
                        </div>
                        {!n.read && <div className="w-2 h-2 rounded-full bg-blue-500 mt-1 shrink-0" />}
                      </div>
                    </div>
                  ))}
                </div>
                <div className={`px-4 py-2.5 border-t ${theme.border} text-center`}>
                  <button className={`text-xs font-bold ${theme.primaryText} hover:underline`}>View All Notifications</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Gap 20: All Caught Up success card */}
      <div className={`flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200`}>
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
          <CheckCircle size={20} className="text-emerald-600" />
        </div>
        <div>
          <p className="text-sm font-bold text-emerald-800">All Caught Up!</p>
          <p className="text-xs text-emerald-600">No pending submissions, approvals, or overdue tasks. Great work!</p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          SECTION 1: TODAY'S TIMETABLE — Period-wise schedule
          This is the FIRST thing a teacher sees on their dashboard.
          ══════════════════════════════════════════════════════ */}
      <div className={`${theme.cardBg} rounded-2xl border-2 ${theme.border} p-4 ring-1 ring-blue-200`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white shrink-0">
              <Clock size={16} />
            </div>
            <div>
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Today&apos;s Timetable</h3>
              <p className={`text-[10px] ${theme.iconColor}`}>{todayKey === 'Sun' ? 'No classes on Sunday' : `${todayKey} — ${todaySchedule.filter(s => s && s !== 'Free').length} teaching periods`}</p>
            </div>
          </div>
          <button className={`text-xs ${theme.primaryText} font-bold flex items-center gap-1`}>Full Timetable <ArrowRight size={12} /></button>
        </div>
        {todayKey === 'Sun' ? (
          <div className={`p-6 rounded-xl ${theme.secondaryBg} text-center`}>
            <CalendarDays size={24} className={`${theme.iconColor} mx-auto mb-2`} />
            <p className={`text-xs font-bold ${theme.highlight}`}>It&apos;s Sunday — Enjoy your day off!</p>
          </div>
        ) : (
          <div className="space-y-1.5">
            {todaySchedule.map((entry, i) => {
              if (!entry && !periodTimings[i]) return null; // skip empty Saturday slots
              const isCurrent = i === currentPeriodIdx;
              const isNext = i === nextPeriodIdx;
              const isCompleted = i < (currentPeriodIdx >= 0 ? currentPeriodIdx : nextPeriodIdx >= 0 ? nextPeriodIdx : 999);
              const isFree = !entry || entry === 'Free';
              const room = !isFree ? (roomMap[entry] || '—') : '—';

              // Extract class and subject for display
              let displaySubject = entry || 'Free Period';
              let displayClass = '';
              if (entry && entry !== 'Free' && entry.includes(' ')) {
                const parts = entry.split(' ');
                displayClass = parts[0]; // e.g., "10-A"
                const subjectCode = parts.slice(1).join(' '); // e.g., "Math" or "Science"
                displaySubject = subjectCode === 'Math' ? 'Mathematics' : subjectCode === 'Science' ? 'Science' : subjectCode;
                if (entry === 'Staff Meeting' || entry === 'Lab Duty' || entry === 'PTM Slot') {
                  displaySubject = entry;
                  displayClass = '';
                }
              }

              return (
                <div
                  key={i}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                    isCurrent
                      ? `${theme.primary} text-white ring-2 ring-blue-300 shadow-lg`
                      : isNext
                      ? `border-2 border-dashed border-blue-400 ${theme.secondaryBg}`
                      : isCompleted
                      ? `${theme.secondaryBg} opacity-60`
                      : isFree
                      ? `${theme.secondaryBg} opacity-50`
                      : theme.secondaryBg
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isCurrent ? 'bg-white/20' : isNext ? theme.accentBg : theme.accentBg
                  }`}>
                    <span className={`text-sm font-bold ${isCurrent ? 'text-white' : theme.primaryText}`}>P{i + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`text-xs font-bold ${isCurrent ? 'text-white' : isCompleted ? theme.iconColor : theme.highlight}`}>
                        {isFree ? 'Free Period' : displaySubject}
                      </p>
                      {displayClass && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                          isCurrent ? 'bg-white/20 text-white' : `${theme.accentBg} ${theme.iconColor}`
                        }`}>{displayClass}</span>
                      )}
                      {isNext && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold animate-pulse">UP NEXT</span>}
                    </div>
                    <p className={`text-[10px] mt-0.5 ${isCurrent ? 'text-white/70' : theme.iconColor}`}>
                      {periodTimings[i]}{!isFree ? ` | ${room}` : ''}
                    </p>
                  </div>
                  {isCurrent && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white font-bold">NOW</span>
                      <CircleDot size={14} className="text-white animate-pulse" />
                    </div>
                  )}
                  {isCompleted && !isCurrent && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 bg-emerald-100 text-emerald-700`}>Done</span>
                  )}
                </div>
              );
            })}
            {/* Break indicators */}
            {todayKey !== 'Sat' && (
              <div className="flex items-center gap-2 px-3 py-1">
                <div className={`flex-1 h-px ${theme.border} border-t border-dashed`} />
                <span className={`text-[9px] ${theme.iconColor} font-medium`}>Break: 9:50-10:05 | Lunch: 11:25-12:00</span>
                <div className={`flex-1 h-px ${theme.border} border-t border-dashed`} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════
          SECTION 2: EVENTS & DEADLINES
          Upcoming events where teacher is participating + pending submissions
          ══════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Upcoming Events */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-purple-500" />
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Upcoming Events</h3>
            </div>
            <button className={`text-xs ${theme.primaryText} font-bold flex items-center gap-1`}>View All <ArrowRight size={12} /></button>
          </div>
          <div className="space-y-2">
            {upcomingEvents.map((ev, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} transition-all`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0 ${
                  ev.type === 'Event' ? 'bg-purple-500' : ev.type === 'PTM' ? 'bg-blue-500' : 'bg-teal-500'
                }`}>
                  <Calendar size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{ev.title}</p>
                  <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>{ev.date}</p>
                </div>
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                  ev.type === 'Event' ? 'bg-purple-100 text-purple-700' : ev.type === 'PTM' ? 'bg-blue-100 text-blue-700' : 'bg-teal-100 text-teal-700'
                }`}>{ev.type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Deadlines / Submissions */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-red-500" />
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Pending Submissions</h3>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-500 text-white font-bold">{pendingDeadlines.filter(d => d.status === 'Overdue').length} overdue</span>
            </div>
          </div>
          <div className="space-y-2">
            {pendingDeadlines.map((dl, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${
                dl.status === 'Overdue' ? 'bg-red-50 border border-red-200' : theme.secondaryBg
              } transition-all`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0 ${
                  dl.status === 'Overdue' ? 'bg-red-500' : dl.status === 'Due Today' ? 'bg-amber-500' : 'bg-blue-500'
                }`}>
                  <Clock size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-bold ${dl.status === 'Overdue' ? 'text-red-800' : theme.highlight}`}>{dl.title}</p>
                  <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>Due: {dl.due}</p>
                </div>
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                  dl.status === 'Overdue' ? 'bg-red-500 text-white' : dl.status === 'Due Today' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                }`}>{dl.status}{dl.status === 'Overdue' ? '!' : ''}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          SECTION 3: MY TASKS (from Task Tracker)
          Shows 4 pending tasks prominently on dashboard + full Task Tracker panel
          ══════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* My Tasks Card */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <ListTodo size={16} className="text-teal-500" />
              <h3 className={`text-sm font-bold ${theme.highlight}`}>My Tasks</h3>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-teal-500 text-white font-bold">{myTasksList.length} pending</span>
            </div>
            <button className={`text-xs ${theme.primaryText} font-bold flex items-center gap-1`}>All Tasks <ArrowRight size={12} /></button>
          </div>
          <div className="space-y-2">
            {myTasksList.map((task, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} transition-all`}>
                <div className={`w-8 h-8 rounded-lg ${task.priorityColor} flex items-center justify-center text-white shrink-0`}>
                  <task.icon size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{task.title}</p>
                  <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>Due: {task.due}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[10px] font-bold ${task.statusColor}`}>{task.status}</span>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold text-white ${task.priorityColor}`}>{task.priority}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Task Tracker Panel (full component) */}
        <TaskTrackerPanel theme={theme} role="teacher" />
      </div>

      {/* ══════════════════════════════════════════════════════
          SECTION 3B: LESSON PLAN REMINDER
          ══════════════════════════════════════════════════════ */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex items-center gap-4`}>
        <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center text-white shrink-0">
          <BookMarked size={18} />
        </div>
        <div className="flex-1">
          <p className={`text-sm font-bold ${theme.highlight}`}>Lesson Plans Due</p>
          <p className={`text-xs ${theme.iconColor} mt-0.5`}>3 lesson plans pending for this week -- Ch 8 Trigonometry (10-A), Force & Motion (9-A), Algebraic Expressions (8-A)</p>
        </div>
        <button className={`text-xs ${theme.primaryText} font-bold flex items-center gap-1 shrink-0`}>
          View Plans <ArrowRight size={12} />
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════
          SECTION 4: QUICK STATS
          ══════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={BookOpen} label="Classes Today" value="5" color="bg-blue-500" sub="of 6 total" theme={theme} />
        <StatCard icon={ClipboardCheck} label="Attendance Pending" value="2" color="bg-amber-500" sub="10-A, 8-A" theme={theme} />
        <StatCard icon={FileText} label="Homework Due" value="3" color="bg-purple-500" sub="submissions today" theme={theme} />
        <StatCard icon={Users} label="Total Students" value="225" color="bg-emerald-500" sub="6 sections" theme={theme} />
      </div>

      {isPreschool && (
        <div className="mt-4 space-y-4">
          <p className="text-xs font-bold text-amber-600">Preschool Activities</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard icon={Notebook} label="Daily Activity Logs" value="12/15" color="bg-amber-500" sub="completed" theme={theme} />
            <StatCard icon={ClipboardCheck} label="Meal Tracking" value="28/30" color="bg-emerald-500" sub="Lunch served" theme={theme} />
            <StatCard icon={Clock} label="Nap Status" value="18 / 7" color="bg-blue-500" sub="sleeping / awake" theme={theme} />
            <StatCard icon={Award} label="Milestones Due" value="5" color="bg-purple-500" sub="assessments this week" theme={theme} />
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          SECTION 5: TO-DO / REMINDERS
          ══════════════════════════════════════════════════════ */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <ListTodo size={16} className="text-amber-500" />
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Important To-Dos</h3>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500 text-white font-bold">4 pending</span>
          </div>
          <button className={`text-xs ${theme.primaryText} font-bold flex items-center gap-1`}>Manage Tasks <ArrowRight size={12} /></button>
        </div>
        <div className="space-y-2">
          {[
            { task: 'Mark attendance for 10-A & 8-A (today)', due: 'Today by 9:30 AM', priority: 'Urgent', priorityColor: 'bg-red-500', status: 'Overdue', statusColor: 'text-red-600', icon: ClipboardCheck },
            { task: 'Enter UT-3 marks for Class 10-B — Ch 4 & Ch 5', due: 'Due: 17 Feb 2026', priority: 'High', priorityColor: 'bg-amber-500', status: 'Pending', statusColor: 'text-amber-600', icon: PenTool },
            { task: 'Review & grade homework — Ch 3 Linear Equations (8-A)', due: 'Due: 13 Feb 2026', priority: 'Medium', priorityColor: 'bg-blue-500', status: 'In Progress', statusColor: 'text-blue-600', icon: FileText },
            { task: 'Prepare question paper for UT-3 — Class 10-A & 10-B', due: 'Due: 14 Feb 2026', priority: 'High', priorityColor: 'bg-amber-500', status: 'Not Started', statusColor: 'text-slate-500', icon: Pencil },
          ].map((todo, i) => (
            <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} transition-all`}>
              <div className={`w-8 h-8 rounded-lg ${todo.priorityColor} flex items-center justify-center text-white shrink-0`}>
                <todo.icon size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-bold ${theme.highlight}`}>{todo.task}</p>
                <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>{todo.due}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-[10px] font-bold ${todo.statusColor}`}>{todo.status}</span>
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold text-white ${todo.priorityColor}`}>{todo.priority}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          SECTION 6: RECENT ACTIVITY — Messages, Circulars, Quick Actions
          ══════════════════════════════════════════════════════ */}

      {/* Quick Actions */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { label: 'Mark Attendance', icon: ClipboardCheck, color: 'bg-teal-500' },
            { label: 'Assign Homework', icon: FileText, color: 'bg-blue-500' },
            { label: 'Enter Marks', icon: PenTool, color: 'bg-purple-500' },
            { label: 'Apply Leave', icon: CalendarDays, color: 'bg-amber-500' },
          ].map(a => (
            <button key={a.label} className={`flex items-center gap-2 p-3 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} transition-all`}>
              <div className={`w-8 h-8 rounded-lg ${a.color} flex items-center justify-center text-white`}><a.icon size={14} /></div>
              <span className={`text-xs font-bold ${theme.highlight}`}>{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Two-column layout: Messages + Circulars */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Unread Messages */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-blue-500" />
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Unread Messages</h3>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500 text-white font-bold">3</span>
            </div>
            <button className={`text-xs ${theme.primaryText} font-bold flex items-center gap-1`}>View All <ArrowRight size={12} /></button>
          </div>
          <div className="space-y-2">
            {[
              { sender: 'Mr. Rajesh Kapoor (Vice Principal)', subject: 'PTM schedule change — Class 10-A moved to 19 Feb', time: '9:15 AM', avatar: 'RK', avatarColor: 'bg-indigo-500' },
              { sender: 'Ms. Sunita Deshmukh (HOD Science)', subject: 'Lab equipment request for Science Exhibition — need your math models', time: '8:42 AM', avatar: 'SD', avatarColor: 'bg-teal-500' },
              { sender: 'Mr. Anil Mehta (Parent — Aarav, 10-A)', subject: 'Request for extra coaching — son struggling with trigonometry', time: 'Yesterday, 6:30 PM', avatar: 'AM', avatarColor: 'bg-amber-500' },
            ].map((msg, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} cursor-pointer transition-all`}>
                <div className={`w-8 h-8 rounded-full ${msg.avatarColor} text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5`}>{msg.avatar}</div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-bold ${theme.highlight} truncate`}>{msg.sender}</p>
                  <p className={`text-[11px] ${theme.iconColor} mt-0.5 line-clamp-1`}>{msg.subject}</p>
                </div>
                <div className="flex flex-col items-end shrink-0 gap-1">
                  <span className={`text-[10px] ${theme.iconColor}`}>{msg.time}</span>
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Circulars */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Megaphone size={16} className="text-purple-500" />
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Today&apos;s Circulars</h3>
            </div>
            <button className={`text-xs ${theme.primaryText} font-bold flex items-center gap-1`}>View All <ArrowRight size={12} /></button>
          </div>
          <div className="space-y-2">
            {[
              { title: 'Annual Day rehearsal schedule — all class teachers to release students at 1:00 PM on 14 Feb', priority: 'Important', priorityColor: 'bg-red-100 text-red-700', from: 'Principal Office', time: '8:00 AM' },
              { title: 'Reminder: UT-3 marks entry deadline extended to 17 Feb — submit via ERP portal only', priority: 'Action Required', priorityColor: 'bg-amber-100 text-amber-700', from: 'Exam Cell', time: '7:45 AM' },
              { title: 'Staff wellness session this Saturday 15 Feb, 10:00 AM — Yoga & stress management in auditorium', priority: 'General', priorityColor: 'bg-blue-100 text-blue-700', from: 'HR Department', time: '7:30 AM' },
            ].map((circ, i) => (
              <div key={i} className={`p-3 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} cursor-pointer transition-all`}>
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-[11px] font-bold ${theme.highlight} flex-1 leading-relaxed`}>{circ.title}</p>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold shrink-0 ${circ.priorityColor}`}>{circ.priority}</span>
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className={`text-[10px] ${theme.iconColor}`}>{circ.from}</span>
                  <span className={`text-[10px] ${theme.iconColor}`}>|</span>
                  <span className={`text-[10px] ${theme.iconColor}`}>{circ.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
