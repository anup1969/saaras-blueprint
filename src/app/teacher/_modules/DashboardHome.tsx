'use client';

import React, { useState, useRef, useEffect } from 'react';
import { StatCard } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  BookOpen, ClipboardCheck, FileText, Award, Calendar, Clock,
  Bell, Users, CheckCircle, AlertTriangle, ArrowRight,
  PenTool, BookMarked, CalendarDays, TrendingUp,
  Pencil, ListTodo, CircleDot, Mail, Megaphone, MessageSquare, Notebook, X,
  User, ChevronDown
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


// ─── ASSIGNMENT OVERVIEW (Remark #5 — visual bracelet/widget) ──────
const assignmentOverview = {
  homework: { given: 7, submitted: 5, graded: 3, pending: 2 },
  tests: { given: 4, submitted: 4, graded: 2, pending: 0 },
  assignments: { given: 3, submitted: 2, graded: 1, pending: 1 },
};

// ─── ATTENDANCE MOCK DATA (Remark #3 — functional take attendance) ──
const classStudents: Record<string, { name: string; roll: number; present?: boolean }[]> = {
  '10-A': [
    { name: 'Aarav Mehta', roll: 1 }, { name: 'Ananya Iyer', roll: 2 }, { name: 'Arjun Nair', roll: 3 },
    { name: 'Diya Kulkarni', roll: 4 }, { name: 'Harsh Patel', roll: 5 }, { name: 'Isha Reddy', roll: 6 },
    { name: 'Karan Singh', roll: 7 }, { name: 'Meera Joshi', roll: 8 }, { name: 'Nikhil Verma', roll: 9 },
    { name: 'Pooja Sharma', roll: 10 }, { name: 'Rahul Deshmukh', roll: 11 }, { name: 'Sneha Patil', roll: 12 },
  ],
  '10-B': [
    { name: 'Aditya Gupta', roll: 1 }, { name: 'Bhavna Reddy', roll: 2 }, { name: 'Chirag Modi', roll: 3 },
    { name: 'Deepa Nair', roll: 4 }, { name: 'Esha Kapoor', roll: 5 }, { name: 'Farhan Khan', roll: 6 },
  ],
};

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

export default function DashboardHome({ theme, isPreschool, onNavigate }: { theme: Theme; isPreschool?: boolean; onNavigate?: (id: string) => void }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [caughtUpDismissed, setCaughtUpDismissed] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [activeView, setActiveView] = useState<'dashboard' | 'attendance' | 'students'>('dashboard');
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [attendanceMarked, setAttendanceMarked] = useState<Record<string, Record<number, boolean>>>({});
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    }
    if (showProfileMenu) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfileMenu]);

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
          {/* All Caught Up — compact inline badge */}
          {!caughtUpDismissed && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
              <CheckCircle size={14} className="text-emerald-500 shrink-0" />
              <span className="text-xs font-semibold text-emerald-700 whitespace-nowrap">All Caught Up!</span>
              <button onClick={() => setCaughtUpDismissed(true)}
                className="p-0.5 rounded-full hover:bg-emerald-100 text-emerald-400 hover:text-emerald-600 transition-colors"
                title="Dismiss">
                <X size={12} />
              </button>
            </div>
          )}
          {/* Bell */}
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
          {/* Profile pic + My Profile dropdown (#32) */}
          <div ref={profileRef} className="relative">
            <button onClick={() => setShowProfileMenu(prev => !prev)}
              className={`w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold ring-2 ring-blue-200 hover:ring-blue-400 transition-all`}
              title="My Profile">
              PS
            </button>
            {showProfileMenu && (
              <div className={`absolute right-0 top-11 w-48 ${theme.cardBg} rounded-xl border ${theme.border} shadow-2xl z-50 overflow-hidden`}>
                <div className={`px-4 py-3 border-b ${theme.border}`}>
                  <p className={`text-xs font-bold ${theme.highlight}`}>{teacherProfile.name}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{teacherProfile.empId} | {teacherProfile.department}</p>
                </div>
                <div className="py-1">
                  {[
                    { label: 'My Profile', icon: User },
                    { label: 'Edit Profile', icon: Pencil },
                    { label: 'Settings', icon: Calendar },
                  ].map(item => (
                    <button key={item.label} className={`w-full flex items-center gap-2 px-4 py-2 text-xs ${theme.highlight} hover:${theme.secondaryBg} transition-colors`}>
                      <item.icon size={12} className={theme.iconColor} /> {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── ATTENDANCE / STUDENT VIEW (Remark #3) ── */}
      {activeView === 'attendance' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-3`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClipboardCheck size={16} className="text-teal-500" />
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Take Attendance</h3>
            </div>
            <div className="flex items-center gap-2">
              <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)}
                className={`px-3 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight}`}>
                {teacherProfile.classes.map(c => <option key={c}>{c}</option>)}
              </select>
              <button onClick={() => setActiveView('dashboard')} className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><X size={14} className={theme.iconColor} /></button>
            </div>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <button onClick={() => {
              const all: Record<number, boolean> = {};
              (classStudents[selectedClass] || []).forEach(s => { all[s.roll] = true; });
              setAttendanceMarked(prev => ({ ...prev, [selectedClass]: all }));
            }} className="text-[10px] px-3 py-1 rounded-lg bg-emerald-100 text-emerald-700 font-bold">Mark All Present</button>
            <button onClick={() => setAttendanceMarked(prev => ({ ...prev, [selectedClass]: {} }))}
              className="text-[10px] px-3 py-1 rounded-lg bg-red-100 text-red-700 font-bold">Mark All Absent</button>
            <span className={`text-[10px] ${theme.iconColor} ml-auto`}>
              {Object.values(attendanceMarked[selectedClass] || {}).filter(Boolean).length} / {(classStudents[selectedClass] || []).length} present
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {(classStudents[selectedClass] || []).map(s => {
              const isPresent = attendanceMarked[selectedClass]?.[s.roll] ?? true;
              return (
                <button key={s.roll}
                  onClick={() => setAttendanceMarked(prev => ({
                    ...prev,
                    [selectedClass]: { ...(prev[selectedClass] || {}), [s.roll]: !isPresent }
                  }))}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all ${
                    isPresent ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'
                  }`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${isPresent ? 'bg-emerald-500' : 'bg-red-500'}`}>
                    {s.roll}
                  </div>
                  <div className="text-left">
                    <p className={`text-[11px] font-bold ${isPresent ? 'text-emerald-800' : 'text-red-800'}`}>{s.name}</p>
                    <p className={`text-[9px] ${isPresent ? 'text-emerald-600' : 'text-red-600'}`}>{isPresent ? 'Present' : 'Absent'}</p>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="flex justify-end">
            <button onClick={() => { alert('Attendance saved (Blueprint demo)'); setActiveView('dashboard'); }}
              className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>Save Attendance</button>
          </div>
        </div>
      )}

      {activeView === 'students' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-3`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-blue-500" />
              <h3 className={`text-sm font-bold ${theme.highlight}`}>View Students — Class {selectedClass}</h3>
            </div>
            <div className="flex items-center gap-2">
              <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)}
                className={`px-3 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight}`}>
                {teacherProfile.classes.map(c => <option key={c}>{c}</option>)}
              </select>
              <button onClick={() => setActiveView('dashboard')} className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><X size={14} className={theme.iconColor} /></button>
            </div>
          </div>
          <div className={`rounded-xl border ${theme.border} overflow-hidden`}>
            <table className="w-full text-sm">
              <thead className={theme.secondaryBg}>
                <tr>
                  <th className={`text-left px-3 py-2 text-[10px] font-bold ${theme.iconColor} uppercase`}>Roll</th>
                  <th className={`text-left px-3 py-2 text-[10px] font-bold ${theme.iconColor} uppercase`}>Name</th>
                  <th className={`text-center px-3 py-2 text-[10px] font-bold ${theme.iconColor} uppercase`}>Attendance %</th>
                  <th className={`text-center px-3 py-2 text-[10px] font-bold ${theme.iconColor} uppercase`}>Homework</th>
                  <th className={`text-center px-3 py-2 text-[10px] font-bold ${theme.iconColor} uppercase`}>Last Active</th>
                </tr>
              </thead>
              <tbody>
                {(classStudents[selectedClass] || []).map(s => (
                  <tr key={s.roll} className={`border-t ${theme.border}`}>
                    <td className={`px-3 py-2 text-xs font-mono ${theme.primaryText}`}>{s.roll}</td>
                    <td className={`px-3 py-2 text-xs font-bold ${theme.highlight}`}>{s.name}</td>
                    <td className={`px-3 py-2 text-xs text-center ${theme.iconColor}`}>{85 + (s.roll % 12)}%</td>
                    <td className={`px-3 py-2 text-xs text-center ${theme.iconColor}`}>{5 + (s.roll % 3)}/7</td>
                    <td className={`px-3 py-2 text-xs text-center ${theme.iconColor}`}>Today</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeView === 'dashboard' && (<>

      {/* ══════════════════════════════════════════════════════
          SECTION 1: TODAY'S TIMETABLE — Period-wise schedule
          This is the FIRST thing a teacher sees on their dashboard.
          ══════════════════════════════════════════════════════ */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-3`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-blue-500 shrink-0" />
            <div>
              <h3 className={`text-xs font-bold ${theme.highlight}`}>Today&apos;s Timetable</h3>
              <p className={`text-[9px] ${theme.iconColor}`}>{todayKey === 'Sun' ? 'No classes on Sunday' : `${todayKey} — ${todaySchedule.filter(s => s && s !== 'Free').length} teaching periods`}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setActiveView('students')} className={`text-[10px] px-2.5 py-1 rounded-lg ${theme.secondaryBg} ${theme.buttonHover} font-bold ${theme.iconColor} flex items-center gap-1`}>
              <Users size={10} /> View Students
            </button>
            <button onClick={() => setActiveView('attendance')} className={`text-[10px] px-2.5 py-1 rounded-lg bg-teal-500 text-white font-bold flex items-center gap-1`}>
              <ClipboardCheck size={10} /> Take Attendance
            </button>
            <button onClick={() => onNavigate?.('timetable')} className={`text-[10px] ${theme.primaryText} font-bold flex items-center gap-1`}>Full <ArrowRight size={10} /></button>
          </div>
        </div>
        {todayKey === 'Sun' ? (
          <div className={`p-6 rounded-xl ${theme.secondaryBg} text-center`}>
            <CalendarDays size={24} className={`${theme.iconColor} mx-auto mb-2`} />
            <p className={`text-xs font-bold ${theme.highlight}`}>It&apos;s Sunday — Enjoy your day off!</p>
          </div>
        ) : (
          <div className="space-y-1">
            {todaySchedule.map((entry, i) => {
              if (!entry && !periodTimings[i]) return null;
              const isCurrent = i === currentPeriodIdx;
              const isNext = i === nextPeriodIdx;
              const isCompleted = i < (currentPeriodIdx >= 0 ? currentPeriodIdx : nextPeriodIdx >= 0 ? nextPeriodIdx : 999);
              const isFree = !entry || entry === 'Free';
              const room = !isFree ? (roomMap[entry] || '—') : '—';

              let displaySubject = entry || 'Free';
              let displayClass = '';
              if (entry && entry !== 'Free' && entry.includes(' ')) {
                const parts = entry.split(' ');
                displayClass = parts[0];
                const subjectCode = parts.slice(1).join(' ');
                displaySubject = subjectCode === 'Math' ? 'Mathematics' : subjectCode === 'Science' ? 'Science' : subjectCode;
                if (entry === 'Staff Meeting' || entry === 'Lab Duty' || entry === 'PTM Slot') {
                  displaySubject = entry; displayClass = '';
                }
              }

              return (
                <div key={i} className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-all ${
                  isCurrent ? `${theme.primary} text-white shadow-md` : isNext ? `border border-dashed border-blue-400 ${theme.secondaryBg}` : isCompleted ? `${theme.secondaryBg} opacity-50` : isFree ? `${theme.secondaryBg} opacity-40` : theme.secondaryBg
                }`}>
                  <span className={`text-[10px] font-bold w-5 shrink-0 ${isCurrent ? 'text-white' : theme.primaryText}`}>P{i + 1}</span>
                  <span className={`text-[10px] w-16 shrink-0 ${isCurrent ? 'text-white/70' : theme.iconColor}`}>{periodTimings[i]}</span>
                  <span className={`text-[11px] font-bold flex-1 ${isCurrent ? 'text-white' : isCompleted ? theme.iconColor : theme.highlight}`}>
                    {isFree ? 'Free' : displaySubject}
                  </span>
                  {displayClass && <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${isCurrent ? 'bg-white/20 text-white' : `${theme.accentBg} ${theme.iconColor}`}`}>{displayClass}</span>}
                  {!isFree && <span className={`text-[9px] ${isCurrent ? 'text-white/60' : theme.iconColor}`}>{room}</span>}
                  {isCurrent && <CircleDot size={10} className="text-white animate-pulse shrink-0" />}
                  {isNext && <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold shrink-0">NEXT</span>}
                </div>
              );
            })}
            {todayKey !== 'Sat' && (
              <div className="flex items-center gap-2 px-2 py-0.5">
                <div className={`flex-1 h-px ${theme.border} border-t border-dashed`} />
                <span className={`text-[8px] ${theme.iconColor}`}>Break: 9:50-10:05 | Lunch: 11:25-12:00</span>
                <div className={`flex-1 h-px ${theme.border} border-t border-dashed`} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════
          SECTION 1B: ASSIGNMENT PROGRESS OVERVIEW (Remark #5)
          Visual bracelet showing homework/test/assignment given vs submitted
          ══════════════════════════════════════════════════════ */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-3`}>
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp size={14} className="text-indigo-500" />
          <h3 className={`text-xs font-bold ${theme.highlight}`}>Assignment Progress Overview</h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {([
            { label: 'Homework', data: assignmentOverview.homework, color: 'blue' },
            { label: 'Tests', data: assignmentOverview.tests, color: 'purple' },
            { label: 'Assignments', data: assignmentOverview.assignments, color: 'teal' },
          ] as const).map(item => {
            const submitPct = item.data.given > 0 ? Math.round((item.data.submitted / item.data.given) * 100) : 0;
            const gradePct = item.data.given > 0 ? Math.round((item.data.graded / item.data.given) * 100) : 0;
            return (
              <div key={item.label} className={`${theme.secondaryBg} rounded-xl p-3`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[11px] font-bold ${theme.highlight}`}>{item.label}</span>
                  <span className={`text-[10px] font-bold text-${item.color}-600`}>{item.data.given} given</span>
                </div>
                <div className="space-y-1.5">
                  <div>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className={`text-[9px] ${theme.iconColor}`}>Submitted</span>
                      <span className={`text-[9px] font-bold ${theme.highlight}`}>{item.data.submitted}/{item.data.given}</span>
                    </div>
                    <div className={`h-1.5 rounded-full ${theme.cardBg} border ${theme.border}`}>
                      <div className={`h-1.5 rounded-full bg-${item.color}-500`} style={{ width: `${submitPct}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className={`text-[9px] ${theme.iconColor}`}>Graded</span>
                      <span className={`text-[9px] font-bold ${theme.highlight}`}>{item.data.graded}/{item.data.given}</span>
                    </div>
                    <div className={`h-1.5 rounded-full ${theme.cardBg} border ${theme.border}`}>
                      <div className={`h-1.5 rounded-full bg-emerald-500`} style={{ width: `${gradePct}%` }} />
                    </div>
                  </div>
                </div>
                {item.data.pending > 0 && (
                  <p className="text-[9px] text-amber-600 font-bold mt-1.5">{item.data.pending} pending review</p>
                )}
              </div>
            );
          })}
        </div>
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
          SECTION 3: TASK TRACKER (Remark #1 — removed duplicate My Tasks card)
          ══════════════════════════════════════════════════════ */}
      <TaskTrackerPanel theme={theme} role="teacher" />

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
        <StatCard icon={BookOpen} label="Classes Today" value="5" color="bg-blue-500" sub="of 6 total" theme={theme} onClick={() => onNavigate?.('timetable')} />
        <StatCard icon={ClipboardCheck} label="Attendance Pending" value="2" color="bg-amber-500" sub="10-A, 8-A" theme={theme} onClick={() => onNavigate?.('attendance')} />
        <StatCard icon={FileText} label="Homework Due" value="3" color="bg-purple-500" sub="submissions today" theme={theme} onClick={() => onNavigate?.('homework')} />
        <StatCard icon={Users} label="Total Students" value="225" color="bg-emerald-500" sub="6 sections" theme={theme} onClick={() => onNavigate?.('classes')} />
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
          SECTION 5: QUICK ACTIONS + MESSAGES + CIRCULARS
          ══════════════════════════════════════════════════════ */}

      {/* Quick Actions */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { label: 'Mark Attendance', icon: ClipboardCheck, color: 'bg-teal-500', action: () => setActiveView('attendance') },
            { label: 'Assign Homework', icon: FileText, color: 'bg-blue-500', action: () => onNavigate?.('homework') },
            { label: 'Enter Marks', icon: PenTool, color: 'bg-purple-500', action: () => onNavigate?.('gradebook') },
            { label: 'Apply Leave', icon: CalendarDays, color: 'bg-amber-500', action: () => onNavigate?.('leave') },
          ].map(a => (
            <button key={a.label} onClick={a.action} className={`flex items-center gap-2 p-3 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} transition-all`}>
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
      </>)}
    </div>
  );
}
