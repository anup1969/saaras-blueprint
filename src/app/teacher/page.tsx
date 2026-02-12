'use client';

import React, { useState } from 'react';
import BlueprintLayout from '@/components/BlueprintLayout';
import { StatCard, TabBar, StatusBadge, SearchBar, DataTable, Toggle } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  Home, BookOpen, ClipboardCheck, FileText, Award, Calendar, Clock, BarChart3,
  Search, Bell, Plus, Check, X, Eye, Edit, Download, Filter, ChevronDown,
  Users, CheckCircle, XCircle, AlertTriangle, Send, Star, ArrowRight,
  PenTool, BookMarked, GraduationCap, Notebook, CalendarDays, Timer, TrendingUp,
  Pencil, Upload, ChevronLeft, ChevronRight, Minus, User
} from 'lucide-react';
import StakeholderProfile from '@/components/StakeholderProfile';

// ─── MOCK DATA ──────────────────────────────────────

const teacherProfile = {
  name: 'Ms. Priya Sharma',
  empId: 'EMP042',
  subject: 'Mathematics',
  department: 'Science & Mathematics',
  classes: ['10-A', '10-B', '8-A', '8-B', '6-A', '6-B'],
};

const myClasses = [
  { id: 'CLS001', class: '10-A', subject: 'Mathematics', students: 42, classTeacher: true, room: 'Room 301', schedule: 'Mon, Wed, Fri — Period 1' },
  { id: 'CLS002', class: '10-B', subject: 'Mathematics', students: 40, classTeacher: false, room: 'Room 302', schedule: 'Mon, Tue, Thu — Period 2' },
  { id: 'CLS003', class: '8-A', subject: 'Mathematics', students: 38, classTeacher: false, room: 'Room 204', schedule: 'Tue, Thu, Sat — Period 3' },
  { id: 'CLS004', class: '8-B', subject: 'Mathematics', students: 36, classTeacher: false, room: 'Room 205', schedule: 'Wed, Fri, Sat — Period 4' },
  { id: 'CLS005', class: '6-A', subject: 'Mathematics', students: 35, classTeacher: false, room: 'Room 106', schedule: 'Mon, Wed, Fri — Period 5' },
  { id: 'CLS006', class: '6-B', subject: 'Mathematics', students: 34, classTeacher: false, room: 'Room 107', schedule: 'Tue, Thu, Sat — Period 6' },
];

const studentsOf10A = [
  { roll: 1, name: 'Aarav Mehta', present: true },
  { roll: 2, name: 'Ananya Iyer', present: true },
  { roll: 3, name: 'Arjun Nair', present: true },
  { roll: 4, name: 'Diya Kulkarni', present: false },
  { roll: 5, name: 'Harsh Patel', present: true },
  { roll: 6, name: 'Isha Reddy', present: true },
  { roll: 7, name: 'Karan Singh', present: true },
  { roll: 8, name: 'Meera Joshi', present: true },
  { roll: 9, name: 'Nikhil Verma', present: false },
  { roll: 10, name: 'Pooja Sharma', present: true },
  { roll: 11, name: 'Rahul Gupta', present: true },
  { roll: 12, name: 'Riya Desai', present: true },
  { roll: 13, name: 'Rohan Thakur', present: true },
  { roll: 14, name: 'Saanvi Pillai', present: false },
  { roll: 15, name: 'Siddharth Rao', present: true },
  { roll: 16, name: 'Sneha Bhatia', present: true },
  { roll: 17, name: 'Tanvi Chopra', present: true },
  { roll: 18, name: 'Varun Kapoor', present: true },
  { roll: 19, name: 'Yashika Agarwal', present: true },
  { roll: 20, name: 'Zoya Khan', present: true },
];

const homeworkList = [
  { id: 'HW001', title: 'Ch 7 — Coordinate Geometry Exercise', class: '10-A', subject: 'Mathematics', assigned: '08 Feb 2026', due: '12 Feb 2026', status: 'Assigned', submitted: 28, total: 42 },
  { id: 'HW002', title: 'Ch 5 — Quadratic Equations Worksheet', class: '10-B', subject: 'Mathematics', assigned: '06 Feb 2026', due: '10 Feb 2026', status: 'Graded', submitted: 40, total: 40 },
  { id: 'HW003', title: 'Ch 3 — Linear Equations Practice', class: '8-A', subject: 'Mathematics', assigned: '07 Feb 2026', due: '11 Feb 2026', status: 'Submitted', submitted: 35, total: 38 },
  { id: 'HW004', title: 'Ch 12 — Areas & Volumes Problems', class: '8-B', subject: 'Mathematics', assigned: '05 Feb 2026', due: '09 Feb 2026', status: 'Graded', submitted: 36, total: 36 },
  { id: 'HW005', title: 'Ch 2 — Fractions & Decimals', class: '6-A', subject: 'Mathematics', assigned: '09 Feb 2026', due: '13 Feb 2026', status: 'Assigned', submitted: 10, total: 35 },
  { id: 'HW006', title: 'Ch 1 — Number System Revision', class: '6-B', subject: 'Mathematics', assigned: '04 Feb 2026', due: '08 Feb 2026', status: 'Graded', submitted: 34, total: 34 },
  { id: 'HW007', title: 'Ch 8 — Trigonometry Introduction', class: '10-A', subject: 'Mathematics', assigned: '10 Feb 2026', due: '14 Feb 2026', status: 'Assigned', submitted: 5, total: 42 },
];

const gradebookStudents = [
  { roll: 1, name: 'Aarav Mehta', ut1: 18, ut2: 20, halfYearly: 72, ut3: 19, ut4: 17, annual: 0 },
  { roll: 2, name: 'Ananya Iyer', ut1: 20, ut2: 19, halfYearly: 85, ut3: 20, ut4: 20, annual: 0 },
  { roll: 3, name: 'Arjun Nair', ut1: 15, ut2: 16, halfYearly: 61, ut3: 14, ut4: 15, annual: 0 },
  { roll: 4, name: 'Diya Kulkarni', ut1: 19, ut2: 20, halfYearly: 78, ut3: 18, ut4: 19, annual: 0 },
  { roll: 5, name: 'Harsh Patel', ut1: 12, ut2: 14, halfYearly: 55, ut3: 13, ut4: 12, annual: 0 },
  { roll: 6, name: 'Isha Reddy', ut1: 20, ut2: 20, halfYearly: 92, ut3: 20, ut4: 20, annual: 0 },
  { roll: 7, name: 'Karan Singh', ut1: 16, ut2: 17, halfYearly: 68, ut3: 15, ut4: 16, annual: 0 },
  { roll: 8, name: 'Meera Joshi', ut1: 17, ut2: 18, halfYearly: 74, ut3: 18, ut4: 17, annual: 0 },
  { roll: 9, name: 'Nikhil Verma', ut1: 10, ut2: 11, halfYearly: 42, ut3: 11, ut4: 10, annual: 0 },
  { roll: 10, name: 'Pooja Sharma', ut1: 19, ut2: 19, halfYearly: 80, ut3: 19, ut4: 18, annual: 0 },
];

const timetableData: Record<string, string[]> = {
  Mon: ['10-A Math', '10-B Math', 'Free', '8-A Math', '6-A Math', 'Free', 'Staff Meeting', 'Free'],
  Tue: ['Free', '10-B Math', '8-A Math', 'Free', 'Free', '6-B Math', '8-B Math', 'Free'],
  Wed: ['10-A Math', 'Free', 'Free', '8-B Math', '6-A Math', 'Free', 'Lab Duty', 'Free'],
  Thu: ['Free', '10-B Math', '8-A Math', 'Free', 'Free', '6-B Math', 'Free', 'PTM Slot'],
  Fri: ['10-A Math', 'Free', 'Free', '8-B Math', '6-A Math', 'Free', 'Free', 'Free'],
  Sat: ['Free', 'Free', '8-A Math', '8-B Math', 'Free', '6-B Math', 'Free', 'Free'],
};

const periodTimings = [
  '8:00 - 8:40', '8:40 - 9:20', '9:20 - 10:00', '10:20 - 11:00',
  '11:00 - 11:40', '11:40 - 12:20', '1:00 - 1:40', '1:40 - 2:20',
];

const leaveBalance = [
  { type: 'Casual Leave', code: 'CL', used: 4, total: 12, color: 'bg-blue-500' },
  { type: 'Sick Leave', code: 'SL', used: 2, total: 6, color: 'bg-amber-500' },
  { type: 'Earned Leave', code: 'EL', used: 0, total: 15, color: 'bg-emerald-500' },
  { type: 'Maternity Leave', code: 'ML', used: 0, total: 180, color: 'bg-purple-500' },
];

const leaveHistory = [
  { id: 'LV001', type: 'CL', from: '15 Jan 2026', to: '16 Jan 2026', days: 2, reason: 'Family function', status: 'Approved', appliedOn: '12 Jan 2026' },
  { id: 'LV002', type: 'SL', from: '22 Jan 2026', to: '23 Jan 2026', days: 2, reason: 'Fever & cold', status: 'Approved', appliedOn: '22 Jan 2026' },
  { id: 'LV003', type: 'CL', from: '01 Feb 2026', to: '02 Feb 2026', days: 2, reason: 'Personal work', status: 'Approved', appliedOn: '28 Jan 2026' },
  { id: 'LV004', type: 'CL', from: '20 Feb 2026', to: '20 Feb 2026', days: 1, reason: 'Doctor appointment', status: 'Pending', appliedOn: '10 Feb 2026' },
];

const diaryEntries = [
  { id: 'D001', date: '12 Feb 2026', class: '10-A', subject: 'Mathematics', message: 'Completed Ch 7 Coordinate Geometry. Homework assigned — Exercise 7.2, Q1-Q10. Students must bring graph sheets tomorrow.' },
  { id: 'D002', date: '12 Feb 2026', class: '8-A', subject: 'Mathematics', message: 'Started Ch 4 Practical Geometry. Students need compass and protractor from tomorrow.' },
  { id: 'D003', date: '11 Feb 2026', class: '10-B', subject: 'Mathematics', message: 'Revised Quadratic Equations. Unit Test 4 on 15 Feb — syllabus: Ch 4 & Ch 5.' },
  { id: 'D004', date: '11 Feb 2026', class: '6-A', subject: 'Mathematics', message: 'Fractions & Decimals practice. Weak students to attend extra class on Saturday.' },
  { id: 'D005', date: '10 Feb 2026', class: '8-B', subject: 'Mathematics', message: 'Areas & Volumes — completed mensuration problems. Worksheets distributed.' },
  { id: 'D006', date: '10 Feb 2026', class: '6-B', subject: 'Mathematics', message: 'Number system revision complete. Chapter test next Monday.' },
];

const classReports = [
  { class: '10-A', students: 42, avgScore: 72.5, topStudent: 'Isha Reddy', topScore: 92, passPercent: 95.2, trend: 'up' },
  { class: '10-B', students: 40, avgScore: 68.3, topStudent: 'Kavya Menon', topScore: 88, passPercent: 90.0, trend: 'up' },
  { class: '8-A', students: 38, avgScore: 74.1, topStudent: 'Aditi Das', topScore: 95, passPercent: 97.4, trend: 'up' },
  { class: '8-B', students: 36, avgScore: 65.7, topStudent: 'Raj Malhotra', topScore: 82, passPercent: 86.1, trend: 'down' },
  { class: '6-A', students: 35, avgScore: 78.9, topStudent: 'Anika Sinha', topScore: 96, passPercent: 100, trend: 'up' },
  { class: '6-B', students: 34, avgScore: 71.2, topStudent: 'Vivaan Choudhary', topScore: 89, passPercent: 94.1, trend: 'down' },
];

// ─── MODULE SIDEBAR ─────────────────────────────────
const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'classes', label: 'My Classes', icon: BookOpen },
  { id: 'attendance', label: 'Attendance', icon: ClipboardCheck },
  { id: 'homework', label: 'Homework', icon: FileText },
  { id: 'gradebook', label: 'Gradebook', icon: Award },
  { id: 'timetable', label: 'Timetable', icon: Calendar },
  { id: 'leave', label: 'Leave', icon: CalendarDays },
  { id: 'diary', label: 'Diary', icon: Notebook },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'profile', label: 'My Profile', icon: User },
];

// ─── MAIN COMPONENT ─────────────────────────────────
function TeacherDashboard({ theme }: { theme?: Theme }) {
  const [activeModule, setActiveModule] = useState('dashboard');
  if (!theme) return null;

  return (
    <div className="flex gap-4 -m-6">
      {/* Module sidebar */}
      <div className={`w-48 ${theme.cardBg} border-r ${theme.border} min-h-screen p-2 space-y-0.5 shrink-0`}>
        <p className={`text-[10px] font-bold ${theme.iconColor} uppercase px-3 py-2`}>Modules</p>
        {modules.map(m => (
          <button
            key={m.id}
            onClick={() => setActiveModule(m.id)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activeModule === m.id ? `${theme.primary} text-white` : `${theme.iconColor} ${theme.buttonHover}`
            }`}
          >
            <m.icon size={14} /> {m.label}
          </button>
        ))}
      </div>

      {/* Module content */}
      <div className="flex-1 p-6 space-y-4 overflow-x-hidden">
        {activeModule === 'dashboard' && <DashboardHome theme={theme} />}
        {activeModule === 'classes' && <MyClassesModule theme={theme} />}
        {activeModule === 'attendance' && <AttendanceModule theme={theme} />}
        {activeModule === 'homework' && <HomeworkModule theme={theme} />}
        {activeModule === 'gradebook' && <GradebookModule theme={theme} />}
        {activeModule === 'timetable' && <TimetableModule theme={theme} />}
        {activeModule === 'leave' && <LeaveModule theme={theme} />}
        {activeModule === 'diary' && <DiaryModule theme={theme} />}
        {activeModule === 'reports' && <ReportsModule theme={theme} />}
        {activeModule === 'profile' && <StakeholderProfile role="teacher" theme={theme} />}
      </div>
    </div>
  );
}

// ─── DASHBOARD HOME ─────────────────────────────────
function DashboardHome({ theme }: { theme: Theme }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${theme.highlight}`}>Good Morning, Ms. Priya</h1>
          <p className={`text-xs ${theme.iconColor} mt-1`}>Wednesday, 12 February 2026 | Employee ID: {teacherProfile.empId}</p>
        </div>
        <div className="flex gap-2">
          <button className={`p-2.5 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} relative`}>
            <Bell size={16} className={theme.iconColor} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">3</span>
          </button>
        </div>
      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={BookOpen} label="Classes Today" value="5" color="bg-blue-500" sub="of 6 total" theme={theme} />
        <StatCard icon={ClipboardCheck} label="Attendance Pending" value="2" color="bg-amber-500" sub="10-A, 8-A" theme={theme} />
        <StatCard icon={FileText} label="Homework Due" value="3" color="bg-purple-500" sub="submissions today" theme={theme} />
        <StatCard icon={Users} label="Total Students" value="225" color="bg-emerald-500" sub="6 sections" theme={theme} />
      </div>

      {/* Today's Schedule */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Today&apos;s Schedule (Wednesday)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {['10-A Math', 'Free', 'Free', '8-B Math', '6-A Math', 'Free', 'Lab Duty', 'Free'].map((period, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl border ${theme.border} ${
                i === 3 ? `${theme.primary} text-white` : period === 'Free' ? theme.accentBg : theme.secondaryBg
              }`}
            >
              <p className={`text-[10px] ${i === 3 ? 'text-white/70' : theme.iconColor}`}>Period {i + 1} | {periodTimings[i]}</p>
              <p className={`text-xs font-bold ${i === 3 ? 'text-white' : period === 'Free' ? theme.iconColor : theme.highlight} mt-1`}>
                {period}
              </p>
              {i === 3 && <p className="text-[10px] mt-1 text-white/80">Current Period</p>}
            </div>
          ))}
        </div>
      </div>

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

      {/* Recent Homework Submissions */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className={`text-sm font-bold ${theme.highlight}`}>Recent Homework Submissions</h3>
          <button className={`text-xs ${theme.primaryText} font-bold flex items-center gap-1`}>View All <ArrowRight size={12} /></button>
        </div>
        <div className="space-y-2">
          {[
            { student: 'Aarav Mehta', class: '10-A', hw: 'Ch 7 — Coordinate Geometry', time: '5 min ago' },
            { student: 'Kavya Menon', class: '10-B', hw: 'Ch 5 — Quadratic Equations', time: '20 min ago' },
            { student: 'Aditi Das', class: '8-A', hw: 'Ch 3 — Linear Equations', time: '1 hour ago' },
            { student: 'Vivaan Choudhary', class: '6-B', hw: 'Ch 1 — Number System', time: '2 hours ago' },
            { student: 'Raj Malhotra', class: '8-B', hw: 'Ch 12 — Areas & Volumes', time: '3 hours ago' },
          ].map((s, i) => (
            <div key={i} className={`flex items-center gap-3 p-2 rounded-xl ${theme.accentBg}`}>
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <p className={`text-xs ${theme.highlight} flex-1`}>
                <span className="font-bold">{s.student}</span> ({s.class}) submitted &quot;{s.hw}&quot;
              </p>
              <span className={`text-[10px] ${theme.iconColor}`}>{s.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events / Notices */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Upcoming</h3>
        <div className="space-y-2">
          {[
            { text: 'Unit Test 4 — Class 10-B (Ch 4 & Ch 5)', date: '15 Feb', type: 'exam' },
            { text: 'PTM for Class 10-A', date: '18 Feb', type: 'meeting' },
            { text: 'Science Exhibition preparations', date: '22 Feb', type: 'event' },
            { text: 'Half-yearly report cards submission deadline', date: '25 Feb', type: 'deadline' },
          ].map((e, i) => (
            <div key={i} className={`flex items-center gap-3 p-2 rounded-xl ${theme.accentBg}`}>
              <div className={`w-2 h-2 rounded-full ${
                e.type === 'exam' ? 'bg-red-500' : e.type === 'meeting' ? 'bg-blue-500' : e.type === 'event' ? 'bg-purple-500' : 'bg-amber-500'
              }`} />
              <p className={`text-xs ${theme.highlight} flex-1`}>{e.text}</p>
              <span className={`text-[10px] ${theme.iconColor} font-bold`}>{e.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MY CLASSES MODULE ──────────────────────────────
function MyClassesModule({ theme }: { theme: Theme }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>My Classes</h1>
        <p className={`text-xs ${theme.iconColor}`}>Academic Year 2025-26 | Subject: Mathematics</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard icon={BookOpen} label="Total Classes" value="6" color="bg-blue-500" theme={theme} />
        <StatCard icon={Users} label="Total Students" value="225" color="bg-emerald-500" theme={theme} />
        <StatCard icon={Star} label="Class Teacher" value="10-A" color="bg-amber-500" theme={theme} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {myClasses.map(c => (
          <div key={c.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-3`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-xl ${c.classTeacher ? 'bg-amber-500' : 'bg-blue-500'} flex items-center justify-center text-white`}>
                  <BookOpen size={18} />
                </div>
                <div>
                  <p className={`text-sm font-bold ${theme.highlight}`}>Class {c.class}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{c.subject}</p>
                </div>
              </div>
              {c.classTeacher && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold">Class Teacher</span>
              )}
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className={`text-xs ${theme.iconColor}`}>Students</span>
                <span className={`text-xs font-bold ${theme.highlight}`}>{c.students}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-xs ${theme.iconColor}`}>Room</span>
                <span className={`text-xs font-bold ${theme.highlight}`}>{c.room}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-xs ${theme.iconColor}`}>Schedule</span>
                <span className={`text-[10px] font-bold ${theme.highlight}`}>{c.schedule}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className={`flex-1 text-xs font-bold py-2 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} ${theme.highlight}`}>View Students</button>
              <button className={`flex-1 text-xs font-bold py-2 rounded-xl ${theme.primary} text-white`}>Take Attendance</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ATTENDANCE MODULE ──────────────────────────────
function AttendanceModule({ theme }: { theme: Theme }) {
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [attendanceDate, setAttendanceDate] = useState('2026-02-12');
  const [attendanceData, setAttendanceData] = useState(
    studentsOf10A.map(s => ({ ...s, status: (s.present ? 'P' : 'A') as 'P' | 'A' | 'L' }))
  );
  const [tab, setTab] = useState('Mark Attendance');

  const presentCount = attendanceData.filter(s => s.status === 'P').length;
  const absentCount = attendanceData.filter(s => s.status === 'A').length;
  const lateCount = attendanceData.filter(s => s.status === 'L').length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Attendance</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Download size={14} /> Export Report</button>
      </div>
      <TabBar tabs={['Mark Attendance', 'Calendar View', 'Reports']} active={tab} onChange={setTab} theme={theme} />

      {tab === 'Mark Attendance' && (
        <>
          <div className="flex gap-3 flex-wrap">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg}`}>
              <span className={`text-xs font-bold ${theme.iconColor}`}>Class:</span>
              <select
                value={selectedClass}
                onChange={e => setSelectedClass(e.target.value)}
                className={`text-xs font-bold ${theme.highlight} bg-transparent outline-none`}
              >
                {teacherProfile.classes.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg}`}>
              <span className={`text-xs font-bold ${theme.iconColor}`}>Date:</span>
              <input
                type="date"
                value={attendanceDate}
                onChange={e => setAttendanceDate(e.target.value)}
                className={`text-xs font-bold ${theme.highlight} bg-transparent outline-none`}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={Users} label="Total Students" value={attendanceData.length} color="bg-blue-500" theme={theme} />
            <StatCard icon={CheckCircle} label="Present" value={presentCount} color="bg-emerald-500" theme={theme} />
            <StatCard icon={XCircle} label="Absent" value={absentCount} color="bg-red-500" theme={theme} />
            <StatCard icon={Clock} label="Late" value={lateCount} color="bg-amber-500" theme={theme} />
          </div>

          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden`}>
            <div className={`flex items-center justify-between p-3 ${theme.secondaryBg}`}>
              <p className={`text-xs font-bold ${theme.highlight}`}>Class {selectedClass} — Mathematics | {attendanceDate}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setAttendanceData(prev => prev.map(s => ({ ...s, status: 'P' as const })))}
                  className="text-[10px] font-bold px-2 py-1 rounded-lg bg-emerald-100 text-emerald-700"
                >
                  Mark All Present
                </button>
                <button
                  onClick={() => setAttendanceData(prev => prev.map(s => ({ ...s, status: 'A' as const })))}
                  className="text-[10px] font-bold px-2 py-1 rounded-lg bg-red-100 text-red-700"
                >
                  Mark All Absent
                </button>
              </div>
            </div>
            <table className="w-full text-sm">
              <thead className={theme.secondaryBg}>
                <tr>
                  <th className={`text-left px-4 py-2 text-xs font-bold ${theme.iconColor} uppercase`}>Roll</th>
                  <th className={`text-left px-4 py-2 text-xs font-bold ${theme.iconColor} uppercase`}>Student Name</th>
                  <th className={`text-center px-4 py-2 text-xs font-bold ${theme.iconColor} uppercase`}>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((s, i) => (
                  <tr key={s.roll} className={`border-t ${theme.border}`}>
                    <td className={`px-4 py-2 text-xs ${theme.iconColor}`}>{s.roll}</td>
                    <td className={`px-4 py-2 text-xs font-bold ${theme.highlight}`}>{s.name}</td>
                    <td className="px-4 py-2">
                      <div className="flex items-center justify-center gap-1">
                        {(['P', 'L', 'A'] as const).map(status => (
                          <button
                            key={status}
                            onClick={() => {
                              setAttendanceData(prev => prev.map((st, idx) =>
                                idx === i ? { ...st, status } : st
                              ));
                            }}
                            className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                              s.status === status
                                ? status === 'P'
                                  ? 'bg-emerald-500 text-white'
                                  : status === 'L'
                                    ? 'bg-amber-500 text-white'
                                    : 'bg-red-500 text-white'
                                : `${theme.secondaryBg} ${theme.iconColor}`
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={`p-3 flex items-center justify-between border-t ${theme.border}`}>
              <p className={`text-xs ${theme.iconColor}`}>
                Present: {presentCount} | Absent: {absentCount} | Late: {lateCount} | Total: {attendanceData.length}
              </p>
              <button className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}>
                <Send size={14} /> Submit Attendance
              </button>
            </div>
          </div>
        </>
      )}

      {tab === 'Calendar View' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>February 2026 — Class {selectedClass}</h3>
            <div className="flex gap-2">
              <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><ChevronLeft size={14} className={theme.iconColor} /></button>
              <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><ChevronRight size={14} className={theme.iconColor} /></button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} className={`text-center text-[10px] font-bold ${theme.iconColor} py-1 uppercase`}>{d}</div>
            ))}
            {/* Empty cells for Feb 2026 starting on Sunday */}
            {Array.from({ length: 28 }, (_, i) => {
              const day = i + 1;
              const isSunday = (day % 7) === 1;
              const isToday = day === 12;
              const attendance = day <= 11 ? (day % 7 !== 1 ? Math.floor(Math.random() * 4 + 38) : null) : null;
              return (
                <div
                  key={day}
                  className={`p-2 rounded-xl text-center border ${theme.border} ${
                    isToday ? `ring-2 ring-blue-400 ${theme.secondaryBg}` :
                    isSunday ? theme.accentBg : theme.cardBg
                  }`}
                >
                  <p className={`text-xs font-bold ${isToday ? theme.primaryText : theme.highlight}`}>{day}</p>
                  {attendance !== null && !isSunday && (
                    <p className="text-[9px] text-emerald-600 font-bold">{attendance}/42</p>
                  )}
                  {isSunday && <p className={`text-[9px] ${theme.iconColor}`}>Holiday</p>}
                </div>
              );
            })}
          </div>
          <div className="flex gap-4 mt-3">
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500" /><span className={`text-[10px] ${theme.iconColor}`}>Marked</span></div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500" /><span className={`text-[10px] ${theme.iconColor}`}>Pending</span></div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-300" /><span className={`text-[10px] ${theme.iconColor}`}>Holiday</span></div>
          </div>
        </div>
      )}

      {tab === 'Reports' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={TrendingUp} label="Avg Attendance" value="93.2%" color="bg-emerald-500" sub="this month" theme={theme} />
            <StatCard icon={AlertTriangle} label="Chronic Absentees" value="3" color="bg-red-500" sub=">5 days absent" theme={theme} />
            <StatCard icon={CheckCircle} label="100% Attendance" value="12" color="bg-blue-500" sub="students" theme={theme} />
            <StatCard icon={Clock} label="Late Arrivals" value="8" color="bg-amber-500" sub="this week" theme={theme} />
          </div>
          <DataTable
            headers={['Class', 'Total', 'Avg Present', 'Avg Absent', 'Avg %', 'Lowest Day']}
            rows={[
              ['10-A', '42', '39.5', '2.5', '94.0%', 'Mon (37/42)'],
              ['10-B', '40', '37.2', '2.8', '93.0%', 'Fri (35/40)'],
              ['8-A', '38', '36.1', '1.9', '95.0%', 'Sat (34/38)'],
              ['8-B', '36', '33.5', '2.5', '93.1%', 'Wed (31/36)'],
              ['6-A', '35', '33.8', '1.2', '96.6%', 'Thu (32/35)'],
              ['6-B', '34', '31.9', '2.1', '93.8%', 'Tue (30/34)'],
            ].map(row => row.map((cell, j) => (
              <span key={j} className={j === 0 ? `font-bold ${theme.highlight}` : theme.iconColor}>{cell}</span>
            )))}
            theme={theme}
          />
        </div>
      )}
    </div>
  );
}

// ─── HOMEWORK MODULE ────────────────────────────────
function HomeworkModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All Homework');
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Homework Management</h1>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}
        >
          <Plus size={14} /> Create Homework
        </button>
      </div>
      <TabBar tabs={['All Homework', 'Assigned', 'Submitted', 'Graded']} active={tab} onChange={setTab} theme={theme} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={FileText} label="Total Assignments" value={homeworkList.length} color="bg-blue-500" theme={theme} />
        <StatCard icon={Send} label="Assigned" value={homeworkList.filter(h => h.status === 'Assigned').length} color="bg-amber-500" theme={theme} />
        <StatCard icon={Upload} label="Submitted" value={homeworkList.filter(h => h.status === 'Submitted').length} color="bg-purple-500" theme={theme} />
        <StatCard icon={CheckCircle} label="Graded" value={homeworkList.filter(h => h.status === 'Graded').length} color="bg-emerald-500" theme={theme} />
      </div>

      {/* Create Homework Form */}
      {showCreate && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-3`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Create New Homework</h3>
            <button onClick={() => setShowCreate(false)} className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><X size={14} className={theme.iconColor} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Class</label>
              <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`}>
                {teacherProfile.classes.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Subject</label>
              <input defaultValue="Mathematics" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`} readOnly />
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Due Date</label>
              <input type="date" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`} />
            </div>
          </div>
          <div>
            <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Title</label>
            <input placeholder="e.g., Ch 8 — Trigonometry Exercise 8.1" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`} />
          </div>
          <div>
            <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Description / Instructions</label>
            <textarea
              rows={3}
              placeholder="Enter homework description, page numbers, question numbers..."
              className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none resize-none`}
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={() => setShowCreate(false)} className={`px-4 py-2 rounded-xl ${theme.secondaryBg} text-sm font-bold ${theme.iconColor}`}>Cancel</button>
            <button className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Send size={14} /> Assign</button>
          </div>
        </div>
      )}

      {/* Homework Table */}
      <DataTable
        headers={['ID', 'Title', 'Class', 'Assigned', 'Due', 'Submissions', 'Status', '']}
        rows={homeworkList
          .filter(h => tab === 'All Homework' || h.status === tab.replace('ed', 'ed'))
          .map(h => [
            <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{h.id}</span>,
            <span key="title" className={`font-bold ${theme.highlight} text-xs`}>{h.title}</span>,
            <span key="class" className={theme.iconColor}>{h.class}</span>,
            <span key="assigned" className={theme.iconColor}>{h.assigned}</span>,
            <span key="due" className={theme.iconColor}>{h.due}</span>,
            <div key="sub" className="flex items-center gap-2">
              <div className={`w-16 h-1.5 rounded-full ${theme.secondaryBg}`}>
                <div
                  className={`h-1.5 rounded-full ${h.submitted === h.total ? 'bg-emerald-500' : 'bg-blue-500'}`}
                  style={{ width: `${(h.submitted / h.total) * 100}%` }}
                />
              </div>
              <span className={`text-xs ${theme.iconColor}`}>{h.submitted}/{h.total}</span>
            </div>,
            <StatusBadge key="status" status={h.status} theme={theme} />,
            <div key="actions" className="flex gap-1">
              <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
              <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Edit size={12} className={theme.iconColor} /></button>
            </div>,
          ])}
        theme={theme}
      />
    </div>
  );
}

// ─── GRADEBOOK MODULE ───────────────────────────────
function GradebookModule({ theme }: { theme: Theme }) {
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [selectedExam, setSelectedExam] = useState('Half Yearly');
  const [tab, setTab] = useState('Enter Marks');

  const maxMarks: Record<string, number> = { 'UT-1': 20, 'UT-2': 20, 'Half Yearly': 100, 'UT-3': 20, 'UT-4': 20, 'Annual': 100 };
  const currentMax = maxMarks[selectedExam] || 100;

  const getMarks = (s: typeof gradebookStudents[0]) => {
    switch (selectedExam) {
      case 'UT-1': return s.ut1;
      case 'UT-2': return s.ut2;
      case 'Half Yearly': return s.halfYearly;
      case 'UT-3': return s.ut3;
      case 'UT-4': return s.ut4;
      case 'Annual': return s.annual;
      default: return 0;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Gradebook</h1>
        <div className="flex gap-2">
          <button className={`px-4 py-2.5 rounded-xl border ${theme.border} ${theme.cardBg} text-sm font-bold ${theme.iconColor} flex items-center gap-1`}><Download size={14} /> Export</button>
          <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Check size={14} /> Save Marks</button>
        </div>
      </div>
      <TabBar tabs={['Enter Marks', 'Overview', 'Analytics']} active={tab} onChange={setTab} theme={theme} />

      <div className="flex gap-3 flex-wrap">
        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg}`}>
          <span className={`text-xs font-bold ${theme.iconColor}`}>Class:</span>
          <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className={`text-xs font-bold ${theme.highlight} bg-transparent outline-none`}>
            {teacherProfile.classes.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg}`}>
          <span className={`text-xs font-bold ${theme.iconColor}`}>Exam:</span>
          <select value={selectedExam} onChange={e => setSelectedExam(e.target.value)} className={`text-xs font-bold ${theme.highlight} bg-transparent outline-none`}>
            {['UT-1', 'UT-2', 'Half Yearly', 'UT-3', 'UT-4', 'Annual'].map(e => <option key={e} value={e}>{e}</option>)}
          </select>
        </div>
        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg}`}>
          <span className={`text-xs font-bold ${theme.iconColor}`}>Max Marks:</span>
          <span className={`text-xs font-bold ${theme.highlight}`}>{currentMax}</span>
        </div>
      </div>

      {tab === 'Enter Marks' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden`}>
          <table className="w-full text-sm">
            <thead className={theme.secondaryBg}>
              <tr>
                <th className={`text-left px-4 py-3 text-xs font-bold ${theme.iconColor} uppercase`}>Roll</th>
                <th className={`text-left px-4 py-3 text-xs font-bold ${theme.iconColor} uppercase`}>Student Name</th>
                <th className={`text-center px-4 py-3 text-xs font-bold ${theme.iconColor} uppercase`}>Marks ({currentMax})</th>
                <th className={`text-center px-4 py-3 text-xs font-bold ${theme.iconColor} uppercase`}>%</th>
                <th className={`text-center px-4 py-3 text-xs font-bold ${theme.iconColor} uppercase`}>Grade</th>
              </tr>
            </thead>
            <tbody>
              {gradebookStudents.map(s => {
                const marks = getMarks(s);
                const pct = currentMax > 0 ? Math.round((marks / currentMax) * 100) : 0;
                const grade = pct >= 90 ? 'A+' : pct >= 80 ? 'A' : pct >= 70 ? 'B+' : pct >= 60 ? 'B' : pct >= 50 ? 'C' : pct >= 33 ? 'D' : 'F';
                return (
                  <tr key={s.roll} className={`border-t ${theme.border}`}>
                    <td className={`px-4 py-2 text-xs ${theme.iconColor}`}>{s.roll}</td>
                    <td className={`px-4 py-2 text-xs font-bold ${theme.highlight}`}>{s.name}</td>
                    <td className="px-4 py-2 text-center">
                      <input
                        type="number"
                        defaultValue={marks}
                        min={0}
                        max={currentMax}
                        className={`w-16 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-sm text-center outline-none focus:ring-2 focus:ring-blue-300`}
                      />
                    </td>
                    <td className={`px-4 py-2 text-center text-xs font-bold ${
                      pct >= 80 ? 'text-emerald-600' : pct >= 50 ? 'text-amber-600' : 'text-red-600'
                    }`}>{pct}%</td>
                    <td className="px-4 py-2 text-center">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        grade === 'A+' || grade === 'A' ? 'bg-emerald-100 text-emerald-700' :
                        grade === 'B+' || grade === 'B' ? 'bg-blue-100 text-blue-700' :
                        grade === 'C' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>{grade}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className={`p-3 flex items-center justify-between border-t ${theme.border} ${theme.secondaryBg}`}>
            <div className="flex gap-4">
              <span className={`text-xs ${theme.iconColor}`}>Class Average: <span className={`font-bold ${theme.highlight}`}>
                {Math.round(gradebookStudents.reduce((a, s) => a + getMarks(s), 0) / gradebookStudents.length)}/{currentMax}
              </span></span>
              <span className={`text-xs ${theme.iconColor}`}>Highest: <span className="font-bold text-emerald-600">
                {Math.max(...gradebookStudents.map(s => getMarks(s)))}/{currentMax}
              </span></span>
              <span className={`text-xs ${theme.iconColor}`}>Lowest: <span className="font-bold text-red-600">
                {Math.min(...gradebookStudents.map(s => getMarks(s)))}/{currentMax}
              </span></span>
            </div>
            <button className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-sm font-bold`}>Save All</button>
          </div>
        </div>
      )}

      {tab === 'Overview' && (
        <DataTable
          headers={['Roll', 'Name', 'UT-1 (20)', 'UT-2 (20)', 'Half Yearly (100)', 'UT-3 (20)', 'UT-4 (20)', 'Total', '%']}
          rows={gradebookStudents.map(s => {
            const total = s.ut1 + s.ut2 + s.halfYearly + s.ut3 + s.ut4;
            const pct = Math.round((total / 180) * 100);
            return [
              <span key="r" className={theme.iconColor}>{s.roll}</span>,
              <span key="n" className={`font-bold ${theme.highlight}`}>{s.name}</span>,
              <span key="u1" className={theme.iconColor}>{s.ut1}</span>,
              <span key="u2" className={theme.iconColor}>{s.ut2}</span>,
              <span key="hy" className={`font-bold ${theme.highlight}`}>{s.halfYearly}</span>,
              <span key="u3" className={theme.iconColor}>{s.ut3}</span>,
              <span key="u4" className={theme.iconColor}>{s.ut4}</span>,
              <span key="t" className={`font-bold ${theme.highlight}`}>{total}/180</span>,
              <span key="p" className={`font-bold ${pct >= 80 ? 'text-emerald-600' : pct >= 50 ? 'text-amber-600' : 'text-red-600'}`}>{pct}%</span>,
            ];
          })}
          theme={theme}
        />
      )}

      {tab === 'Analytics' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={TrendingUp} label="Class Average" value="69.4%" color="bg-blue-500" theme={theme} />
            <StatCard icon={Star} label="Class Topper" value="Isha Reddy" color="bg-amber-500" sub="92/100" theme={theme} />
            <StatCard icon={CheckCircle} label="Pass Rate" value="90%" color="bg-emerald-500" sub="9/10 passed" theme={theme} />
            <StatCard icon={AlertTriangle} label="Below 40%" value="1" color="bg-red-500" sub="needs attention" theme={theme} />
          </div>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Grade Distribution — {selectedExam}</h3>
            <div className="flex items-end gap-2 h-32">
              {[
                { grade: 'A+ (90+)', count: 2, color: 'bg-emerald-500' },
                { grade: 'A (80-89)', count: 2, color: 'bg-emerald-400' },
                { grade: 'B+ (70-79)', count: 2, color: 'bg-blue-500' },
                { grade: 'B (60-69)', count: 2, color: 'bg-blue-400' },
                { grade: 'C (50-59)', count: 1, color: 'bg-amber-500' },
                { grade: 'D (33-49)', count: 1, color: 'bg-red-400' },
                { grade: 'F (<33)', count: 0, color: 'bg-red-600' },
              ].map(g => (
                <div key={g.grade} className="flex-1 flex flex-col items-center gap-1">
                  <span className={`text-[10px] font-bold ${theme.highlight}`}>{g.count}</span>
                  <div className={`w-full ${g.color} rounded-t-lg transition-all`} style={{ height: `${Math.max(g.count * 25, 4)}px` }} />
                  <span className={`text-[9px] ${theme.iconColor} text-center leading-tight`}>{g.grade}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── TIMETABLE MODULE ───────────────────────────────
function TimetableModule({ theme }: { theme: Theme }) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDay = 'Wed';
  const currentPeriod = 3; // 0-indexed, Period 4

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>My Timetable</h1>
        <div className="flex gap-2">
          <button className={`px-4 py-2.5 rounded-xl border ${theme.border} ${theme.cardBg} text-sm font-bold ${theme.iconColor} flex items-center gap-1`}><Download size={14} /> Download</button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={BookOpen} label="Classes/Week" value="18" color="bg-blue-500" theme={theme} />
        <StatCard icon={Clock} label="Free Periods" value="14" color="bg-emerald-500" theme={theme} />
        <StatCard icon={Timer} label="Current" value="Period 4" color="bg-purple-500" sub="8-B Math" theme={theme} />
        <StatCard icon={Calendar} label="Next" value="Period 5" color="bg-amber-500" sub="6-A Math" theme={theme} />
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden overflow-x-auto`}>
        <table className="w-full text-sm">
          <thead className={theme.secondaryBg}>
            <tr>
              <th className={`text-left px-3 py-3 text-xs font-bold ${theme.iconColor} uppercase sticky left-0 ${theme.secondaryBg} z-10`}>Day</th>
              {periodTimings.map((t, i) => (
                <th key={i} className={`text-center px-2 py-3 text-xs font-bold ${theme.iconColor}`}>
                  <div>P{i + 1}</div>
                  <div className="text-[9px] font-normal">{t}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map(day => (
              <tr key={day} className={`border-t ${theme.border}`}>
                <td className={`px-3 py-2 text-xs font-bold sticky left-0 ${theme.cardBg} z-10 ${
                  day === currentDay ? theme.primaryText : theme.highlight
                }`}>
                  {day}
                  {day === currentDay && <span className="text-[9px] block text-blue-500">Today</span>}
                </td>
                {timetableData[day].map((period, i) => {
                  const isCurrent = day === currentDay && i === currentPeriod;
                  const isClass = period !== 'Free' && period !== 'Staff Meeting' && period !== 'Lab Duty' && period !== 'PTM Slot';
                  const isSpecial = period === 'Staff Meeting' || period === 'Lab Duty' || period === 'PTM Slot';
                  return (
                    <td key={i} className={`px-2 py-2 text-center`}>
                      <div className={`px-2 py-1.5 rounded-lg text-xs font-medium ${
                        isCurrent
                          ? `${theme.primary} text-white ring-2 ring-blue-400`
                          : isClass
                            ? `${theme.secondaryBg} ${theme.highlight}`
                            : isSpecial
                              ? 'bg-purple-50 text-purple-700'
                              : `${theme.accentBg} ${theme.iconColor}`
                      }`}>
                        {period}
                        {isCurrent && <div className="text-[9px] mt-0.5 text-white/80">Now</div>}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-3`}>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded ${theme.secondaryBg}`} />
            <span className={`text-xs ${theme.iconColor}`}>Teaching Period</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded ${theme.accentBg} border ${theme.border}`} />
            <span className={`text-xs ${theme.iconColor}`}>Free Period</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-purple-50" />
            <span className={`text-xs ${theme.iconColor}`}>Special Duty</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded ${theme.primary}`} />
            <span className={`text-xs ${theme.iconColor}`}>Current Period</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── LEAVE MODULE ───────────────────────────────────
function LeaveModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Leave Balance');
  const [showApply, setShowApply] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Leave Management</h1>
        <button
          onClick={() => setShowApply(!showApply)}
          className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}
        >
          <Plus size={14} /> Apply Leave
        </button>
      </div>
      <TabBar tabs={['Leave Balance', 'History', 'Calendar']} active={tab} onChange={setTab} theme={theme} />

      {/* Apply Leave Form */}
      {showApply && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-3`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Apply for Leave</h3>
            <button onClick={() => setShowApply(false)} className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><X size={14} className={theme.iconColor} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Leave Type</label>
              <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`}>
                <option>Casual Leave (CL)</option>
                <option>Sick Leave (SL)</option>
                <option>Earned Leave (EL)</option>
              </select>
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>From Date</label>
              <input type="date" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`} />
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>To Date</label>
              <input type="date" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`} />
            </div>
          </div>
          <div>
            <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Reason</label>
            <textarea
              rows={2}
              placeholder="Enter reason for leave..."
              className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none resize-none`}
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={() => setShowApply(false)} className={`px-4 py-2 rounded-xl ${theme.secondaryBg} text-sm font-bold ${theme.iconColor}`}>Cancel</button>
            <button className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Send size={14} /> Submit</button>
          </div>
        </div>
      )}

      {tab === 'Leave Balance' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {leaveBalance.map(l => (
              <div key={l.code} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${l.color} flex items-center justify-center text-white`}>
                    <CalendarDays size={18} />
                  </div>
                  <span className={`text-lg font-bold ${theme.highlight}`}>{l.total - l.used}/{l.total}</span>
                </div>
                <p className={`text-xs font-bold ${theme.highlight}`}>{l.type}</p>
                <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>{l.used} used | {l.total - l.used} remaining</p>
                <div className={`mt-2 w-full h-1.5 rounded-full ${theme.secondaryBg}`}>
                  <div className={`h-1.5 rounded-full ${l.color}`} style={{ width: `${(l.used / l.total) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-2`}>Leave Policy Summary</h3>
            <div className="space-y-1.5">
              {[
                'Casual Leave must be applied 2 days in advance (except emergency)',
                'Sick Leave beyond 2 days requires medical certificate',
                'Earned Leave can be encashed at end of year (max 10 days)',
                'Half-day leave allowed for CL only (before/after lunch)',
                'No leave during exam duty periods without Principal approval',
              ].map((rule, i) => (
                <div key={i} className={`flex items-start gap-2 text-xs ${theme.iconColor}`}>
                  <CheckCircle size={12} className="text-emerald-500 mt-0.5 shrink-0" />
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'History' && (
        <DataTable
          headers={['ID', 'Type', 'From', 'To', 'Days', 'Reason', 'Applied On', 'Status']}
          rows={leaveHistory.map(l => [
            <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{l.id}</span>,
            <span key="type" className={`text-xs font-bold ${theme.highlight}`}>{l.type}</span>,
            <span key="from" className={theme.iconColor}>{l.from}</span>,
            <span key="to" className={theme.iconColor}>{l.to}</span>,
            <span key="days" className={`font-bold ${theme.highlight}`}>{l.days}</span>,
            <span key="reason" className={`text-xs ${theme.iconColor}`}>{l.reason}</span>,
            <span key="applied" className={theme.iconColor}>{l.appliedOn}</span>,
            <StatusBadge key="status" status={l.status} theme={theme} />,
          ])}
          theme={theme}
        />
      )}

      {tab === 'Calendar' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Leave Calendar — 2026</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => {
              const hasLeave = i === 0 || i === 1;
              return (
                <div key={m} className={`p-3 rounded-xl border ${theme.border} text-center ${hasLeave ? 'ring-1 ring-amber-300' : ''}`}>
                  <p className={`text-xs font-bold ${theme.highlight}`}>{m}</p>
                  {i === 0 && <p className="text-[9px] text-amber-600 font-bold mt-1">4 days</p>}
                  {i === 1 && <p className="text-[9px] text-amber-600 font-bold mt-1">2 days + 1 pending</p>}
                  {!hasLeave && <p className={`text-[9px] ${theme.iconColor} mt-1`}>No leave</p>}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── DIARY MODULE ───────────────────────────────────
function DiaryModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All Entries');
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Class Diary</h1>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}
        >
          <Plus size={14} /> New Entry
        </button>
      </div>
      <TabBar tabs={['All Entries', 'Today', 'This Week']} active={tab} onChange={setTab} theme={theme} />

      <div className="flex gap-3">
        <SearchBar placeholder="Search diary entries..." theme={theme} icon={Search} />
        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg}`}>
          <span className={`text-xs font-bold ${theme.iconColor}`}>Class:</span>
          <select className={`text-xs font-bold ${theme.highlight} bg-transparent outline-none`}>
            <option>All Classes</option>
            {teacherProfile.classes.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Create Entry Form */}
      {showCreate && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-3`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>New Diary Entry</h3>
            <button onClick={() => setShowCreate(false)} className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><X size={14} className={theme.iconColor} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Class</label>
              <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`}>
                {teacherProfile.classes.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Subject</label>
              <input defaultValue="Mathematics" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`} readOnly />
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Date</label>
              <input type="date" defaultValue="2026-02-12" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`} />
            </div>
          </div>
          <div>
            <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Message / Notes</label>
            <textarea
              rows={3}
              placeholder="Today's classwork, homework, notes for parents..."
              className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none resize-none`}
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={() => setShowCreate(false)} className={`px-4 py-2 rounded-xl ${theme.secondaryBg} text-sm font-bold ${theme.iconColor}`}>Cancel</button>
            <button className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Send size={14} /> Publish</button>
          </div>
        </div>
      )}

      {/* Diary Entries */}
      <div className="space-y-3">
        {diaryEntries
          .filter(d => {
            if (tab === 'Today') return d.date === '12 Feb 2026';
            if (tab === 'This Week') return ['10 Feb 2026', '11 Feb 2026', '12 Feb 2026'].includes(d.date);
            return true;
          })
          .map(d => (
          <div key={d.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white">
                  <Notebook size={18} />
                </div>
                <div>
                  <p className={`text-sm font-bold ${theme.highlight}`}>Class {d.class} — {d.subject}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{d.date} | ID: {d.id}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Edit size={12} className={theme.iconColor} /></button>
                <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
              </div>
            </div>
            <p className={`text-xs ${theme.iconColor} leading-relaxed`}>{d.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── REPORTS MODULE ─────────────────────────────────
function ReportsModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Class Performance');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Reports & Analytics</h1>
        <button className={`px-4 py-2.5 rounded-xl border ${theme.border} ${theme.cardBg} text-sm font-bold ${theme.iconColor} flex items-center gap-1`}><Download size={14} /> Export All</button>
      </div>
      <TabBar tabs={['Class Performance', 'Subject Toppers', 'Attendance Summary', 'Progress Tracker']} active={tab} onChange={setTab} theme={theme} />

      {tab === 'Class Performance' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard icon={TrendingUp} label="Overall Average" value="71.8%" color="bg-blue-500" sub="across all classes" theme={theme} />
            <StatCard icon={Star} label="Best Performing" value="6-A" color="bg-emerald-500" sub="78.9% avg" theme={theme} />
            <StatCard icon={AlertTriangle} label="Needs Attention" value="8-B" color="bg-red-500" sub="65.7% avg" theme={theme} />
          </div>
          <DataTable
            headers={['Class', 'Students', 'Avg Score', 'Topper', 'Top Score', 'Pass %', 'Trend']}
            rows={classReports.map(r => [
              <span key="c" className={`font-bold ${theme.highlight}`}>{r.class}</span>,
              <span key="s" className={theme.iconColor}>{r.students}</span>,
              <span key="a" className={`font-bold ${r.avgScore >= 75 ? 'text-emerald-600' : r.avgScore >= 60 ? 'text-amber-600' : 'text-red-600'}`}>{r.avgScore}%</span>,
              <span key="t" className={`font-bold ${theme.highlight}`}>{r.topStudent}</span>,
              <span key="ts" className="font-bold text-emerald-600">{r.topScore}</span>,
              <span key="p" className={`font-bold ${r.passPercent >= 95 ? 'text-emerald-600' : 'text-amber-600'}`}>{r.passPercent}%</span>,
              <span key="tr" className={`text-xs font-bold ${r.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                {r.trend === 'up' ? 'Improving' : 'Declining'}
              </span>,
            ])}
            theme={theme}
          />
        </div>
      )}

      {tab === 'Subject Toppers' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classReports.map(r => (
              <div key={r.class} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white">
                    <Award size={18} />
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${theme.highlight}`}>Class {r.class}</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>Mathematics — Half Yearly</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className={`flex items-center justify-between p-2 rounded-xl ${theme.accentBg}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">1st</span>
                      <span className={`text-xs font-bold ${theme.highlight}`}>{r.topStudent}</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-600">{r.topScore}/100</span>
                  </div>
                  <div className={`flex items-center justify-between p-2 rounded-xl ${theme.accentBg}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">2nd</span>
                      <span className={`text-xs font-bold ${theme.highlight}`}>
                        {r.class === '10-A' ? 'Ananya Iyer' : r.class === '10-B' ? 'Shreya Nambiar' : r.class === '8-A' ? 'Prateek Jain' : r.class === '8-B' ? 'Tanuja Hegde' : r.class === '6-A' ? 'Rohan Mehra' : 'Sakshi Tiwari'}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-blue-600">{r.topScore - 7}/100</span>
                  </div>
                  <div className={`flex items-center justify-between p-2 rounded-xl ${theme.accentBg}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">3rd</span>
                      <span className={`text-xs font-bold ${theme.highlight}`}>
                        {r.class === '10-A' ? 'Diya Kulkarni' : r.class === '10-B' ? 'Aryan Khanna' : r.class === '8-A' ? 'Nidhi Rao' : r.class === '8-B' ? 'Aman Dubey' : r.class === '6-A' ? 'Tanya Sethi' : 'Kartik Bhatt'}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-purple-600">{r.topScore - 14}/100</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'Attendance Summary' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={ClipboardCheck} label="Overall Attendance" value="93.6%" color="bg-emerald-500" sub="Feb 2026" theme={theme} />
            <StatCard icon={Users} label="Total Students" value="225" color="bg-blue-500" theme={theme} />
            <StatCard icon={CheckCircle} label="100% Attendance" value="34" color="bg-teal-500" sub="students" theme={theme} />
            <StatCard icon={XCircle} label="Below 75%" value="5" color="bg-red-500" sub="at risk" theme={theme} />
          </div>
          <DataTable
            headers={['Class', 'Students', 'Working Days', 'Avg Present', 'Avg %', 'Below 75%']}
            rows={[
              ['10-A', '42', '20', '39.5', '94.0%', '1'],
              ['10-B', '40', '20', '37.2', '93.0%', '2'],
              ['8-A', '38', '20', '36.1', '95.0%', '0'],
              ['8-B', '36', '20', '33.5', '93.1%', '1'],
              ['6-A', '35', '20', '33.8', '96.6%', '0'],
              ['6-B', '34', '20', '31.9', '93.8%', '1'],
            ].map(row => row.map((cell, j) => (
              <span key={j} className={j === 0 ? `font-bold ${theme.highlight}` : j === 5 && cell !== '0' ? 'font-bold text-red-600' : theme.iconColor}>{cell}</span>
            )))}
            theme={theme}
          />
        </div>
      )}

      {tab === 'Progress Tracker' && (
        <div className="space-y-4">
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Syllabus Completion — Class 10-A</h3>
            <div className="space-y-3">
              {[
                { chapter: 'Ch 1 — Real Numbers', progress: 100 },
                { chapter: 'Ch 2 — Polynomials', progress: 100 },
                { chapter: 'Ch 3 — Pair of Linear Equations', progress: 100 },
                { chapter: 'Ch 4 — Quadratic Equations', progress: 100 },
                { chapter: 'Ch 5 — Arithmetic Progressions', progress: 85 },
                { chapter: 'Ch 6 — Triangles', progress: 70 },
                { chapter: 'Ch 7 — Coordinate Geometry', progress: 60 },
                { chapter: 'Ch 8 — Trigonometry', progress: 30 },
                { chapter: 'Ch 9 — Applications of Trigonometry', progress: 0 },
                { chapter: 'Ch 10 — Circles', progress: 0 },
                { chapter: 'Ch 11 — Constructions', progress: 0 },
                { chapter: 'Ch 12 — Areas Related to Circles', progress: 0 },
                { chapter: 'Ch 13 — Surface Areas & Volumes', progress: 0 },
                { chapter: 'Ch 14 — Statistics', progress: 0 },
                { chapter: 'Ch 15 — Probability', progress: 0 },
              ].map(ch => (
                <div key={ch.chapter} className="flex items-center gap-3">
                  <span className={`text-xs ${theme.iconColor} w-64 shrink-0`}>{ch.chapter}</span>
                  <div className={`flex-1 h-2 rounded-full ${theme.secondaryBg}`}>
                    <div
                      className={`h-2 rounded-full ${ch.progress === 100 ? 'bg-emerald-500' : ch.progress > 0 ? 'bg-blue-500' : theme.secondaryBg}`}
                      style={{ width: `${ch.progress}%` }}
                    />
                  </div>
                  <span className={`text-xs font-bold w-10 text-right ${ch.progress === 100 ? 'text-emerald-600' : ch.progress > 0 ? theme.primaryText : theme.iconColor}`}>
                    {ch.progress}%
                  </span>
                </div>
              ))}
            </div>
            <div className={`mt-3 pt-3 border-t ${theme.border} flex items-center justify-between`}>
              <span className={`text-xs ${theme.iconColor}`}>Overall Syllabus Completion</span>
              <span className={`text-sm font-bold ${theme.primaryText}`}>
                {Math.round([100, 100, 100, 100, 85, 70, 60, 30, 0, 0, 0, 0, 0, 0, 0].reduce((a, b) => a + b, 0) / 15)}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── EXPORT ─────────────────────────────────────────
export default function Page() {
  return (
    <BlueprintLayout>
      <TeacherDashboard />
    </BlueprintLayout>
  );
}
