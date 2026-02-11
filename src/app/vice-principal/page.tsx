'use client';

import React, { useState } from 'react';
import BlueprintLayout from '@/components/BlueprintLayout';
import { StatCard, TabBar, StatusBadge, SearchBar, DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  Home, Users, UserCheck, Calendar, Clock, Shield, Search, Plus, Filter, Download,
  Eye, Edit, AlertTriangle, FileText, Send, BookOpen, ArrowRight,
  ClipboardCheck, Bell, CheckCircle, XCircle, Repeat, Gavel,
  LayoutGrid, Megaphone, UserMinus, MapPin, Coffee, Award
} from 'lucide-react';

// ─── MODULE SIDEBAR ────────────────────────────────
const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'substitutions', label: 'Substitutions', icon: Repeat },
  { id: 'discipline', label: 'Discipline', icon: Gavel },
  { id: 'timetable', label: 'Timetable', icon: LayoutGrid },
  { id: 'examinations', label: 'Examinations', icon: BookOpen },
  { id: 'staff-duties', label: 'Staff Duties', icon: ClipboardCheck },
  { id: 'circulars', label: 'Circulars', icon: Megaphone },
];

// ─── MOCK DATA ──────────────────────────────────────

const mockSubstitutions = [
  { id: 'SUB001', absentTeacher: 'Mrs. Sunita Sharma', reason: 'Medical Leave', substitute: 'Mr. Rajeev Nair', period: '3rd Period', class: 'Class 10-A', subject: 'Mathematics', date: '12 Feb 2026', status: 'Assigned' },
  { id: 'SUB002', absentTeacher: 'Mr. Arvind Patel', reason: 'Personal Leave', substitute: 'Ms. Kavita Desai', period: '1st Period', class: 'Class 8-B', subject: 'Science', date: '12 Feb 2026', status: 'Assigned' },
  { id: 'SUB003', absentTeacher: 'Ms. Priya Mehta', reason: 'Training Workshop', substitute: 'Mr. Vikram Singh', period: '5th Period', class: 'Class 12-A', subject: 'English', date: '12 Feb 2026', status: 'Pending' },
  { id: 'SUB004', absentTeacher: 'Mr. Deepak Joshi', reason: 'Emergency Leave', substitute: '—', period: '2nd Period', class: 'Class 9-C', subject: 'Hindi', date: '12 Feb 2026', status: 'Pending' },
  { id: 'SUB005', absentTeacher: 'Mrs. Anita Kulkarni', reason: 'Casual Leave', substitute: 'Ms. Reema Gupta', period: '4th Period', class: 'Class 7-A', subject: 'Social Science', date: '12 Feb 2026', status: 'Assigned' },
  { id: 'SUB006', absentTeacher: 'Mr. Suresh Reddy', reason: 'Medical Leave', substitute: 'Mr. Manoj Tiwari', period: '6th Period', class: 'Class 11-B', subject: 'Physics', date: '11 Feb 2026', status: 'Completed' },
];

const mockDisciplineCases = [
  { id: 'DC001', student: 'Arjun Malhotra', class: 'Class 9-B', incident: 'Bullying complaint in playground', reportedBy: 'Mrs. Sunita Sharma', date: '11 Feb 2026', action: 'Parent meeting scheduled', status: 'Open' },
  { id: 'DC002', student: 'Rohit Verma', class: 'Class 10-A', incident: 'Mobile phone found during exam', reportedBy: 'Mr. Arvind Patel', date: '10 Feb 2026', action: 'Phone confiscated, warning issued', status: 'Warning' },
  { id: 'DC003', student: 'Sneha Agarwal', class: 'Class 8-C', incident: 'Repeated late coming (5 times this month)', reportedBy: 'Class Teacher', date: '09 Feb 2026', action: 'Detention + parent notification', status: 'Warning' },
  { id: 'DC004', student: 'Vikash Kumar', class: 'Class 11-A', incident: 'Defacing school property — lab bench', reportedBy: 'Mr. Deepak Joshi', date: '07 Feb 2026', action: 'Fine ₹500 + community service', status: 'Resolved' },
  { id: 'DC005', student: 'Priya Nair', class: 'Class 7-B', incident: 'Verbal altercation with classmate', reportedBy: 'Ms. Kavita Desai', date: '11 Feb 2026', action: 'Counselling session', status: 'Open' },
  { id: 'DC006', student: 'Amit Choudhary', class: 'Class 12-B', incident: 'Unauthorized leave from campus', reportedBy: 'Security Guard', date: '06 Feb 2026', action: 'Suspension — 2 days + parent meeting', status: 'Resolved' },
];

const mockTimetable = {
  classWise: [
    { class: 'Class 10-A', p1: 'Maths (Mrs. Sharma)', p2: 'English (Ms. Mehta)', p3: 'Science (Mr. Patel)', p4: 'Hindi (Mr. Joshi)', p5: 'S.St (Mrs. Kulkarni)', p6: 'PT (Mr. Singh)', p7: 'Computer (Ms. Gupta)', p8: 'Art (Ms. Desai)' },
    { class: 'Class 10-B', p1: 'English (Ms. Mehta)', p2: 'Science (Mr. Patel)', p3: 'Maths (Mrs. Sharma)', p4: 'S.St (Mrs. Kulkarni)', p5: 'Hindi (Mr. Joshi)', p6: 'Computer (Ms. Gupta)', p7: 'Music (Mr. Tiwari)', p8: 'PT (Mr. Singh)' },
    { class: 'Class 9-A', p1: 'Science (Mr. Reddy)', p2: 'Maths (Mr. Nair)', p3: 'Hindi (Mr. Joshi)', p4: 'English (Ms. Mehta)', p5: 'S.St (Mrs. Kulkarni)', p6: 'Art (Ms. Desai)', p7: 'PT (Mr. Singh)', p8: 'Computer (Ms. Gupta)' },
    { class: 'Class 9-B', p1: 'Hindi (Mr. Joshi)', p2: 'Maths (Mr. Nair)', p3: 'English (Ms. Mehta)', p4: 'Science (Mr. Reddy)', p5: 'Computer (Ms. Gupta)', p6: 'S.St (Mrs. Kulkarni)', p7: 'Music (Mr. Tiwari)', p8: 'PT (Mr. Singh)' },
    { class: 'Class 8-A', p1: 'Maths (Mrs. Sharma)', p2: 'Hindi (Mr. Joshi)', p3: 'S.St (Mrs. Kulkarni)', p4: 'Science (Mr. Patel)', p5: 'English (Ms. Mehta)', p6: 'PT (Mr. Singh)', p7: 'Art (Ms. Desai)', p8: 'Computer (Ms. Gupta)' },
    { class: 'Class 8-B', p1: 'Science (Mr. Patel)', p2: 'English (Ms. Mehta)', p3: 'Maths (Mrs. Sharma)', p4: 'Hindi (Mr. Joshi)', p5: 'Music (Mr. Tiwari)', p6: 'S.St (Mrs. Kulkarni)', p7: 'PT (Mr. Singh)', p8: 'Computer (Ms. Gupta)' },
  ],
  teacherWise: [
    { teacher: 'Mrs. Sunita Sharma', subject: 'Mathematics', p1: '10-A', p2: '—', p3: '8-B', p4: '—', p5: '8-A', p6: '—', p7: '12-A', p8: '—', total: 4 },
    { teacher: 'Mr. Arvind Patel', subject: 'Science', p1: '—', p2: '10-A', p3: '—', p4: '8-A', p5: '—', p6: '9-A', p7: '—', p8: '10-B', total: 4 },
    { teacher: 'Ms. Priya Mehta', subject: 'English', p1: '10-B', p2: '—', p3: '9-B', p4: '9-A', p5: '10-A', p6: '—', p7: '—', p8: '8-A', total: 5 },
    { teacher: 'Mr. Deepak Joshi', subject: 'Hindi', p1: '9-B', p2: '8-A', p3: '—', p4: '10-A', p5: '10-B', p6: '—', p7: '—', p8: '9-A', total: 5 },
    { teacher: 'Mrs. Anita Kulkarni', subject: 'Social Science', p1: '—', p2: '—', p3: '8-A', p4: '10-B', p5: '9-A', p6: '8-B', p7: '—', p8: '10-A', total: 5 },
    { teacher: 'Mr. Vikram Singh', subject: 'Physical Education', p1: '—', p2: '—', p3: '—', p4: '—', p5: '—', p6: '10-A', p7: '9-A', p8: '10-B', total: 3 },
  ],
  rooms: [
    { room: 'Room 101', class: '10-A', capacity: 40, type: 'Classroom', floor: 'Ground' },
    { room: 'Room 102', class: '10-B', capacity: 40, type: 'Classroom', floor: 'Ground' },
    { room: 'Room 201', class: '9-A', capacity: 38, type: 'Classroom', floor: 'First' },
    { room: 'Room 202', class: '9-B', capacity: 38, type: 'Classroom', floor: 'First' },
    { room: 'Physics Lab', class: '—', capacity: 30, type: 'Laboratory', floor: 'Second' },
    { room: 'Computer Lab', class: '—', capacity: 35, type: 'Laboratory', floor: 'Second' },
  ],
};

const mockExams = [
  { id: 'EX001', type: 'Unit Test - 3', subject: 'Mathematics', class: 'Class 10-A', date: '18 Feb 2026', time: '09:00 - 10:30', room: 'Room 101', invigilator: 'Mr. Rajeev Nair', maxMarks: 40, status: 'Scheduled' },
  { id: 'EX002', type: 'Unit Test - 3', subject: 'Science', class: 'Class 10-A', date: '19 Feb 2026', time: '09:00 - 10:30', room: 'Room 101', invigilator: 'Mrs. Kulkarni', maxMarks: 40, status: 'Scheduled' },
  { id: 'EX003', type: 'Unit Test - 3', subject: 'English', class: 'Class 10-B', date: '18 Feb 2026', time: '11:00 - 12:30', room: 'Room 102', invigilator: 'Mr. Deepak Joshi', maxMarks: 40, status: 'Scheduled' },
  { id: 'EX004', type: 'Pre-Board Exam', subject: 'Physics', class: 'Class 12-A', date: '24 Feb 2026', time: '09:00 - 12:00', room: 'Physics Lab', invigilator: 'Mr. Suresh Reddy', maxMarks: 70, status: 'Pending' },
  { id: 'EX005', type: 'Pre-Board Exam', subject: 'Chemistry', class: 'Class 12-A', date: '26 Feb 2026', time: '09:00 - 12:00', room: 'Room 201', invigilator: 'Ms. Kavita Desai', maxMarks: 70, status: 'Pending' },
  { id: 'EX006', type: 'Half Yearly', subject: 'Hindi', class: 'Class 8-A', date: '20 Feb 2026', time: '09:00 - 11:00', room: 'Room 201', invigilator: 'Mr. Manoj Tiwari', maxMarks: 80, status: 'Scheduled' },
];

const mockStaffDuties = [
  { id: 'SD001', duty: 'Morning Assembly — Supervision', assignedTo: 'Mr. Vikram Singh', date: '12 Feb 2026', time: '07:30 - 08:00', location: 'Main Ground', status: 'Active' },
  { id: 'SD002', duty: 'Morning Assembly — Supervision', assignedTo: 'Ms. Reema Gupta', date: '12 Feb 2026', time: '07:30 - 08:00', location: 'Main Ground', status: 'Active' },
  { id: 'SD003', duty: 'Exam Invigilation — Unit Test 3', assignedTo: 'Mr. Rajeev Nair', date: '18 Feb 2026', time: '09:00 - 10:30', location: 'Room 101', status: 'Upcoming' },
  { id: 'SD004', duty: 'PTM Coordination', assignedTo: 'Mrs. Sunita Sharma', date: '22 Feb 2026', time: '09:00 - 13:00', location: 'School Hall', status: 'Upcoming' },
  { id: 'SD005', duty: 'Sports Day — Arrangement', assignedTo: 'Mr. Vikram Singh', date: '28 Feb 2026', time: '08:00 - 14:00', location: 'Sports Ground', status: 'Upcoming' },
  { id: 'SD006', duty: 'Library Period Supervision', assignedTo: 'Ms. Kavita Desai', date: '12 Feb 2026', time: '11:00 - 11:45', location: 'Library', status: 'Active' },
];

const mockCirculars = [
  { id: 'CIR001', title: 'Unit Test 3 Schedule — Classes 8 to 10', category: 'Academic', author: 'VP — Dr. Meena Iyer', date: '10 Feb 2026', audience: 'All Teachers', readCount: 38, totalRecipients: 42, status: 'Published' },
  { id: 'CIR002', title: 'PTM Notice — 22nd February 2026', category: 'Event', author: 'VP — Dr. Meena Iyer', date: '09 Feb 2026', audience: 'All Staff + Parents', readCount: 210, totalRecipients: 850, status: 'Published' },
  { id: 'CIR003', title: 'Revised Assembly Timing from March 2026', category: 'Administrative', author: 'VP — Dr. Meena Iyer', date: '08 Feb 2026', audience: 'All Staff', readCount: 40, totalRecipients: 42, status: 'Published' },
  { id: 'CIR004', title: 'Pre-Board Exam Guidelines — Class 12', category: 'Academic', author: 'VP — Dr. Meena Iyer', date: '07 Feb 2026', audience: 'Class 12 Teachers', readCount: 8, totalRecipients: 10, status: 'Published' },
  { id: 'CIR005', title: 'Sports Day Duty Roster', category: 'Event', author: 'VP — Dr. Meena Iyer', date: '06 Feb 2026', audience: 'All Staff', readCount: 35, totalRecipients: 42, status: 'Published' },
  { id: 'CIR006', title: 'Annual Day Rehearsal Schedule', category: 'Event', author: 'VP — Dr. Meena Iyer', date: '12 Feb 2026', audience: 'Selected Teachers', readCount: 0, totalRecipients: 15, status: 'Draft' },
];

// ─── MAIN COMPONENT ─────────────────────────────────

function VicePrincipalDashboard({ theme }: { theme?: Theme }) {
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
        {activeModule === 'substitutions' && <SubstitutionsModule theme={theme} />}
        {activeModule === 'discipline' && <DisciplineModule theme={theme} />}
        {activeModule === 'timetable' && <TimetableModule theme={theme} />}
        {activeModule === 'examinations' && <ExaminationsModule theme={theme} />}
        {activeModule === 'staff-duties' && <StaffDutiesModule theme={theme} />}
        {activeModule === 'circulars' && <CircularsModule theme={theme} />}
      </div>
    </div>
  );
}

// ─── DASHBOARD HOME ─────────────────────────────────

function DashboardHome({ theme }: { theme: Theme }) {
  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Vice Principal Dashboard</h1>
      <p className={`text-xs ${theme.iconColor}`}>Good morning, Dr. Meena Iyer &mdash; Wednesday, 12 February 2026</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Repeat} label="Today's Substitutions" value={4} color="bg-blue-500" sub="2 pending" theme={theme} />
        <StatCard icon={Gavel} label="Open Discipline Cases" value={3} color="bg-red-500" theme={theme} />
        <StatCard icon={BookOpen} label="Upcoming Exams" value={6} color="bg-purple-500" sub="this week" theme={theme} />
        <StatCard icon={ClipboardCheck} label="Today Attendance" value="94.2%" color="bg-emerald-500" theme={theme} />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={UserMinus} label="Teachers Absent" value={3} color="bg-amber-500" sub="today" theme={theme} />
        <StatCard icon={Megaphone} label="Active Circulars" value={5} color="bg-indigo-500" theme={theme} />
        <StatCard icon={Calendar} label="PTM Scheduled" value="22 Feb" color="bg-teal-500" theme={theme} />
        <StatCard icon={Bell} label="Notifications" value={7} color="bg-orange-500" sub="unread" theme={theme} />
      </div>

      {/* Today's Substitutions Summary */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Today&apos;s Substitutions</h3>
        <div className="space-y-2">
          {mockSubstitutions.filter(s => s.date === '12 Feb 2026').slice(0, 4).map((s, i) => (
            <div key={i} className={`flex items-center gap-3 p-2 rounded-xl ${theme.accentBg}`}>
              <div className={`w-2 h-2 rounded-full ${s.status === 'Assigned' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              <p className={`text-xs ${theme.highlight} flex-1`}>
                <span className="font-bold">{s.absentTeacher}</span> &rarr; {s.substitute !== '—' ? s.substitute : <span className="text-red-500 font-bold">Unassigned</span>} | {s.period} | {s.class} ({s.subject})
              </p>
              <StatusBadge status={s.status === 'Assigned' ? 'Active' : 'Pending'} theme={theme} />
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { label: 'Assign Substitute', icon: Repeat, color: 'bg-blue-500' },
            { label: 'New Discipline Case', icon: Gavel, color: 'bg-red-500' },
            { label: 'Create Circular', icon: Send, color: 'bg-indigo-500' },
            { label: 'Assign Duty', icon: ClipboardCheck, color: 'bg-teal-500' },
          ].map(a => (
            <button key={a.label} className={`flex items-center gap-2 p-3 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} transition-all`}>
              <div className={`w-8 h-8 rounded-lg ${a.color} flex items-center justify-center text-white`}><a.icon size={14} /></div>
              <span className={`text-xs font-bold ${theme.highlight}`}>{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Recent Activity</h3>
        <div className="space-y-2">
          {[
            { text: 'Substitution assigned: Mr. Rajeev Nair covering Maths for Mrs. Sharma (Class 10-A, P3)', time: '15 min ago', type: 'sub' },
            { text: 'Discipline case opened: Arjun Malhotra (9-B) — Bullying complaint', time: '1 hour ago', type: 'discipline' },
            { text: 'Circular published: Unit Test 3 Schedule — Classes 8 to 10', time: '2 hours ago', type: 'circular' },
            { text: 'Exam schedule finalized: Pre-Board Exams Class 12 (24-28 Feb)', time: '3 hours ago', type: 'exam' },
            { text: 'Duty roster updated: Sports Day assignments for 28 Feb', time: '5 hours ago', type: 'duty' },
          ].map((a, i) => (
            <div key={i} className={`flex items-center gap-3 p-2 rounded-xl ${theme.accentBg}`}>
              <div className={`w-2 h-2 rounded-full ${a.type === 'sub' ? 'bg-blue-500' : a.type === 'discipline' ? 'bg-red-500' : a.type === 'circular' ? 'bg-indigo-500' : a.type === 'exam' ? 'bg-purple-500' : 'bg-teal-500'}`} />
              <p className={`text-xs ${theme.highlight} flex-1`}>{a.text}</p>
              <span className={`text-[10px] ${theme.iconColor}`}>{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SUBSTITUTIONS MODULE ───────────────────────────

function SubstitutionsModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Today');
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Teacher Substitutions</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> Assign Substitute</button>
      </div>
      <TabBar tabs={['Today', 'This Week', 'Pending', 'History']} active={tab} onChange={setTab} theme={theme} />
      <div className="flex gap-3">
        <SearchBar placeholder="Search by teacher name, class, subject..." theme={theme} icon={Search} />
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Filter size={12} /> Filter</button>
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Download size={12} /> Export</button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={UserMinus} label="Absent Today" value={3} color="bg-red-500" theme={theme} />
        <StatCard icon={CheckCircle} label="Substitutes Assigned" value={3} color="bg-emerald-500" theme={theme} />
        <StatCard icon={AlertTriangle} label="Pending Assignment" value={1} color="bg-amber-500" theme={theme} />
        <StatCard icon={Clock} label="Free Teachers Available" value={4} color="bg-blue-500" theme={theme} />
      </div>

      <DataTable
        headers={['ID', 'Absent Teacher', 'Reason', 'Substitute', 'Period', 'Class', 'Subject', 'Date', 'Status', '']}
        rows={mockSubstitutions.map(s => [
          <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{s.id}</span>,
          <span key="abs" className={`font-bold ${theme.highlight}`}>{s.absentTeacher}</span>,
          <span key="reason" className={theme.iconColor}>{s.reason}</span>,
          <span key="sub" className={s.substitute === '—' ? 'text-red-500 font-bold' : theme.highlight}>{s.substitute}</span>,
          <span key="period" className={theme.iconColor}>{s.period}</span>,
          <span key="class" className={theme.iconColor}>{s.class}</span>,
          <span key="subject" className={theme.iconColor}>{s.subject}</span>,
          <span key="date" className={theme.iconColor}>{s.date}</span>,
          <StatusBadge key="status" status={s.status === 'Assigned' ? 'Active' : s.status === 'Completed' ? 'Cleared' : 'Pending'} theme={theme} />,
          <div key="actions" className="flex gap-1">
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Edit size={12} className={theme.iconColor} /></button>
          </div>
        ])}
        theme={theme}
      />
      <div className={`flex items-center justify-between text-xs ${theme.iconColor} px-2`}>
        <span>Showing 1-{mockSubstitutions.length} of {mockSubstitutions.length} substitutions</span>
        <div className="flex gap-1">
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Previous</button>
          <button className={`px-3 py-1.5 rounded-lg ${theme.primary} text-white`}>1</button>
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Next</button>
        </div>
      </div>
    </div>
  );
}

// ─── DISCIPLINE MODULE ──────────────────────────────

function DisciplineModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All Cases');
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Student Discipline</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> Log Incident</button>
      </div>
      <TabBar tabs={['All Cases', 'Open', 'Warning', 'Resolved']} active={tab} onChange={setTab} theme={theme} />
      <div className="flex gap-3">
        <SearchBar placeholder="Search by student name, class, incident..." theme={theme} icon={Search} />
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Filter size={12} /> Filter</button>
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Download size={12} /> Export</button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={AlertTriangle} label="Open Cases" value={2} color="bg-red-500" theme={theme} />
        <StatCard icon={Shield} label="Warnings Issued" value={2} color="bg-amber-500" sub="this month" theme={theme} />
        <StatCard icon={CheckCircle} label="Resolved" value={2} color="bg-emerald-500" sub="this month" theme={theme} />
        <StatCard icon={Gavel} label="Total This Term" value={14} color="bg-indigo-500" theme={theme} />
      </div>

      <DataTable
        headers={['ID', 'Student', 'Class', 'Incident', 'Reported By', 'Date', 'Action Taken', 'Status', '']}
        rows={mockDisciplineCases.map(d => [
          <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{d.id}</span>,
          <span key="name" className={`font-bold ${theme.highlight}`}>{d.student}</span>,
          <span key="class" className={theme.iconColor}>{d.class}</span>,
          <span key="incident" className={`${theme.highlight} max-w-[200px] truncate block`}>{d.incident}</span>,
          <span key="reported" className={theme.iconColor}>{d.reportedBy}</span>,
          <span key="date" className={theme.iconColor}>{d.date}</span>,
          <span key="action" className={`${theme.iconColor} max-w-[180px] truncate block`}>{d.action}</span>,
          <StatusBadge key="status" status={d.status === 'Open' ? 'Urgent' : d.status === 'Warning' ? 'Pending' : 'Approved'} theme={theme} />,
          <div key="actions" className="flex gap-1">
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Edit size={12} className={theme.iconColor} /></button>
          </div>
        ])}
        theme={theme}
      />
      <div className={`flex items-center justify-between text-xs ${theme.iconColor} px-2`}>
        <span>Showing 1-{mockDisciplineCases.length} of {mockDisciplineCases.length} cases</span>
        <div className="flex gap-1">
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Previous</button>
          <button className={`px-3 py-1.5 rounded-lg ${theme.primary} text-white`}>1</button>
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Next</button>
        </div>
      </div>
    </div>
  );
}

// ─── TIMETABLE MODULE ───────────────────────────────

function TimetableModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Class-wise');
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Timetable Management</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Download size={14} /> Export Timetable</button>
      </div>
      <TabBar tabs={['Class-wise', 'Teacher-wise', 'Room Allocation']} active={tab} onChange={setTab} theme={theme} />

      {tab === 'Class-wise' && (
        <>
          <div className="flex gap-3">
            <SearchBar placeholder="Search by class..." theme={theme} icon={Search} />
            <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Filter size={12} /> Filter</button>
          </div>
          <DataTable
            headers={['Class', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8']}
            rows={mockTimetable.classWise.map(t => [
              <span key="cls" className={`font-bold ${theme.highlight}`}>{t.class}</span>,
              <span key="p1" className={`text-xs ${theme.iconColor}`}>{t.p1}</span>,
              <span key="p2" className={`text-xs ${theme.iconColor}`}>{t.p2}</span>,
              <span key="p3" className={`text-xs ${theme.iconColor}`}>{t.p3}</span>,
              <span key="p4" className={`text-xs ${theme.iconColor}`}>{t.p4}</span>,
              <span key="p5" className={`text-xs ${theme.iconColor}`}>{t.p5}</span>,
              <span key="p6" className={`text-xs ${theme.iconColor}`}>{t.p6}</span>,
              <span key="p7" className={`text-xs ${theme.iconColor}`}>{t.p7}</span>,
              <span key="p8" className={`text-xs ${theme.iconColor}`}>{t.p8}</span>,
            ])}
            theme={theme}
          />
        </>
      )}

      {tab === 'Teacher-wise' && (
        <>
          <div className="flex gap-3">
            <SearchBar placeholder="Search by teacher name..." theme={theme} icon={Search} />
          </div>
          <DataTable
            headers={['Teacher', 'Subject', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'Total']}
            rows={mockTimetable.teacherWise.map(t => [
              <span key="name" className={`font-bold ${theme.highlight}`}>{t.teacher}</span>,
              <span key="sub" className={theme.primaryText}>{t.subject}</span>,
              <span key="p1" className={`text-xs ${t.p1 !== '—' ? theme.highlight : theme.iconColor}`}>{t.p1}</span>,
              <span key="p2" className={`text-xs ${t.p2 !== '—' ? theme.highlight : theme.iconColor}`}>{t.p2}</span>,
              <span key="p3" className={`text-xs ${t.p3 !== '—' ? theme.highlight : theme.iconColor}`}>{t.p3}</span>,
              <span key="p4" className={`text-xs ${t.p4 !== '—' ? theme.highlight : theme.iconColor}`}>{t.p4}</span>,
              <span key="p5" className={`text-xs ${t.p5 !== '—' ? theme.highlight : theme.iconColor}`}>{t.p5}</span>,
              <span key="p6" className={`text-xs ${t.p6 !== '—' ? theme.highlight : theme.iconColor}`}>{t.p6}</span>,
              <span key="p7" className={`text-xs ${t.p7 !== '—' ? theme.highlight : theme.iconColor}`}>{t.p7}</span>,
              <span key="p8" className={`text-xs ${t.p8 !== '—' ? theme.highlight : theme.iconColor}`}>{t.p8}</span>,
              <span key="total" className={`font-bold ${theme.primaryText}`}>{t.total}</span>,
            ])}
            theme={theme}
          />
        </>
      )}

      {tab === 'Room Allocation' && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard icon={MapPin} label="Total Rooms" value={24} color="bg-blue-500" theme={theme} />
            <StatCard icon={Users} label="Classrooms" value={18} color="bg-indigo-500" theme={theme} />
            <StatCard icon={Award} label="Laboratories" value={6} color="bg-purple-500" theme={theme} />
          </div>
          <DataTable
            headers={['Room', 'Assigned Class', 'Capacity', 'Type', 'Floor', '']}
            rows={mockTimetable.rooms.map(r => [
              <span key="room" className={`font-bold ${theme.highlight}`}>{r.room}</span>,
              <span key="cls" className={r.class !== '—' ? theme.highlight : theme.iconColor}>{r.class}</span>,
              <span key="cap" className={theme.iconColor}>{r.capacity}</span>,
              <StatusBadge key="type" status={r.type === 'Classroom' ? 'Active' : 'New'} theme={theme} />,
              <span key="floor" className={theme.iconColor}>{r.floor} Floor</span>,
              <div key="actions" className="flex gap-1">
                <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
              </div>
            ])}
            theme={theme}
          />
        </>
      )}
    </div>
  );
}

// ─── EXAMINATIONS MODULE ────────────────────────────

function ExaminationsModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Schedule');
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Examination Management</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> Schedule Exam</button>
      </div>
      <TabBar tabs={['Schedule', 'Room Allotment', 'Invigilators', 'Date Sheet']} active={tab} onChange={setTab} theme={theme} />
      <div className="flex gap-3">
        <SearchBar placeholder="Search by exam type, subject, class..." theme={theme} icon={Search} />
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Filter size={12} /> Filter</button>
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Download size={12} /> Export</button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={BookOpen} label="Exams Scheduled" value={4} color="bg-blue-500" sub="this month" theme={theme} />
        <StatCard icon={AlertTriangle} label="Pending Scheduling" value={2} color="bg-amber-500" theme={theme} />
        <StatCard icon={MapPin} label="Rooms Allocated" value={4} color="bg-indigo-500" theme={theme} />
        <StatCard icon={UserCheck} label="Invigilators Assigned" value={6} color="bg-emerald-500" theme={theme} />
      </div>

      {tab === 'Schedule' && (
        <DataTable
          headers={['ID', 'Exam Type', 'Subject', 'Class', 'Date', 'Time', 'Room', 'Invigilator', 'Max Marks', 'Status', '']}
          rows={mockExams.map(e => [
            <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{e.id}</span>,
            <span key="type" className={`font-bold ${theme.highlight}`}>{e.type}</span>,
            <span key="sub" className={theme.highlight}>{e.subject}</span>,
            <span key="cls" className={theme.iconColor}>{e.class}</span>,
            <span key="date" className={theme.iconColor}>{e.date}</span>,
            <span key="time" className={theme.iconColor}>{e.time}</span>,
            <span key="room" className={theme.iconColor}>{e.room}</span>,
            <span key="inv" className={theme.iconColor}>{e.invigilator}</span>,
            <span key="marks" className={`font-bold ${theme.highlight}`}>{e.maxMarks}</span>,
            <StatusBadge key="status" status={e.status === 'Scheduled' ? 'Active' : 'Pending'} theme={theme} />,
            <div key="actions" className="flex gap-1">
              <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
              <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Edit size={12} className={theme.iconColor} /></button>
            </div>
          ])}
          theme={theme}
        />
      )}

      {tab === 'Room Allotment' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Exam Room Allocation — Feb 2026</h3>
          <div className="space-y-2">
            {mockExams.map((e, i) => (
              <div key={i} className={`flex items-center justify-between p-3 rounded-xl ${theme.accentBg}`}>
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>{e.subject} — {e.class}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{e.date} | {e.time}</p>
                </div>
                <div className="text-right">
                  <p className={`text-xs font-bold ${theme.primaryText}`}>{e.room}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{e.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'Invigilators' && (
        <DataTable
          headers={['Invigilator', 'Exam', 'Subject', 'Class', 'Date', 'Time', 'Room']}
          rows={mockExams.map(e => [
            <span key="inv" className={`font-bold ${theme.highlight}`}>{e.invigilator}</span>,
            <span key="type" className={theme.primaryText}>{e.type}</span>,
            <span key="sub" className={theme.iconColor}>{e.subject}</span>,
            <span key="cls" className={theme.iconColor}>{e.class}</span>,
            <span key="date" className={theme.iconColor}>{e.date}</span>,
            <span key="time" className={theme.iconColor}>{e.time}</span>,
            <span key="room" className={theme.iconColor}>{e.room}</span>,
          ])}
          theme={theme}
        />
      )}

      {tab === 'Date Sheet' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Date Sheet — Unit Test 3 &amp; Pre-Board</h3>
          <div className="space-y-3">
            <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-xs font-bold ${theme.primaryText} mb-2`}>Unit Test 3 — Classes 8 to 10 (18-20 Feb)</p>
              <div className="space-y-1">
                {mockExams.filter(e => e.type === 'Unit Test - 3' || e.type === 'Half Yearly').map((e, i) => (
                  <p key={i} className={`text-xs ${theme.iconColor}`}>{e.date} — {e.subject} ({e.class}) — {e.time}</p>
                ))}
              </div>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-xs font-bold ${theme.primaryText} mb-2`}>Pre-Board Exams — Class 12 (24-28 Feb)</p>
              <div className="space-y-1">
                {mockExams.filter(e => e.type === 'Pre-Board Exam').map((e, i) => (
                  <p key={i} className={`text-xs ${theme.iconColor}`}>{e.date} — {e.subject} ({e.class}) — {e.time}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`flex items-center justify-between text-xs ${theme.iconColor} px-2`}>
        <span>Showing 1-{mockExams.length} of {mockExams.length} exams</span>
        <div className="flex gap-1">
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Previous</button>
          <button className={`px-3 py-1.5 rounded-lg ${theme.primary} text-white`}>1</button>
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Next</button>
        </div>
      </div>
    </div>
  );
}

// ─── STAFF DUTIES MODULE ────────────────────────────

function StaffDutiesModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All Duties');
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Staff Duty Roster</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> Assign Duty</button>
      </div>
      <TabBar tabs={['All Duties', 'Active Today', 'Upcoming', 'By Category']} active={tab} onChange={setTab} theme={theme} />
      <div className="flex gap-3">
        <SearchBar placeholder="Search by teacher name, duty type..." theme={theme} icon={Search} />
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Filter size={12} /> Filter</button>
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Download size={12} /> Export</button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={ClipboardCheck} label="Active Today" value={3} color="bg-emerald-500" theme={theme} />
        <StatCard icon={Calendar} label="Upcoming Duties" value={3} color="bg-blue-500" sub="next 7 days" theme={theme} />
        <StatCard icon={Users} label="Staff Assigned" value={5} color="bg-indigo-500" theme={theme} />
        <StatCard icon={Coffee} label="Duty Categories" value={4} color="bg-amber-500" theme={theme} />
      </div>

      <DataTable
        headers={['ID', 'Duty', 'Assigned To', 'Date', 'Time', 'Location', 'Status', '']}
        rows={mockStaffDuties.map(d => [
          <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{d.id}</span>,
          <span key="duty" className={`font-bold ${theme.highlight}`}>{d.duty}</span>,
          <span key="teacher" className={theme.highlight}>{d.assignedTo}</span>,
          <span key="date" className={theme.iconColor}>{d.date}</span>,
          <span key="time" className={theme.iconColor}>{d.time}</span>,
          <span key="loc" className={theme.iconColor}>{d.location}</span>,
          <StatusBadge key="status" status={d.status === 'Active' ? 'Active' : 'Pending'} theme={theme} />,
          <div key="actions" className="flex gap-1">
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Edit size={12} className={theme.iconColor} /></button>
          </div>
        ])}
        theme={theme}
      />

      {/* Upcoming Events */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Upcoming Events Requiring Duty Assignment</h3>
        <div className="space-y-2">
          {[
            { event: 'Parent-Teacher Meeting', date: '22 Feb 2026', staff: '8 teachers needed', type: 'ptm' },
            { event: 'Pre-Board Exam Invigilation', date: '24-28 Feb 2026', staff: '12 teachers needed', type: 'exam' },
            { event: 'Annual Sports Day', date: '28 Feb 2026', staff: '15 teachers needed', type: 'sports' },
            { event: 'Republic Day Rehearsal', date: '24 Jan 2026', staff: '6 teachers needed', type: 'event' },
          ].map((e, i) => (
            <div key={i} className={`flex items-center justify-between p-3 rounded-xl ${theme.accentBg}`}>
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${e.type === 'ptm' ? 'bg-blue-500' : e.type === 'exam' ? 'bg-purple-500' : e.type === 'sports' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>{e.event}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{e.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] ${theme.iconColor}`}>{e.staff}</span>
                <button className={`px-2 py-1 text-[10px] rounded-lg ${theme.primary} text-white font-bold`}>Assign</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`flex items-center justify-between text-xs ${theme.iconColor} px-2`}>
        <span>Showing 1-{mockStaffDuties.length} of {mockStaffDuties.length} duties</span>
        <div className="flex gap-1">
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Previous</button>
          <button className={`px-3 py-1.5 rounded-lg ${theme.primary} text-white`}>1</button>
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Next</button>
        </div>
      </div>
    </div>
  );
}

// ─── CIRCULARS MODULE ───────────────────────────────

function CircularsModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All Circulars');
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Circulars & Memos</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> Create Circular</button>
      </div>
      <TabBar tabs={['All Circulars', 'Published', 'Drafts', 'By Category']} active={tab} onChange={setTab} theme={theme} />
      <div className="flex gap-3">
        <SearchBar placeholder="Search by title, category, audience..." theme={theme} icon={Search} />
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Filter size={12} /> Filter</button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Megaphone} label="Total Circulars" value={6} color="bg-indigo-500" sub="this month" theme={theme} />
        <StatCard icon={Send} label="Published" value={5} color="bg-emerald-500" theme={theme} />
        <StatCard icon={FileText} label="Drafts" value={1} color="bg-amber-500" theme={theme} />
        <StatCard icon={Eye} label="Avg. Read Rate" value="82%" color="bg-blue-500" theme={theme} />
      </div>

      <DataTable
        headers={['ID', 'Title', 'Category', 'Author', 'Date', 'Audience', 'Read Status', 'Status', '']}
        rows={mockCirculars.map(c => [
          <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{c.id}</span>,
          <span key="title" className={`font-bold ${theme.highlight} max-w-[200px] truncate block`}>{c.title}</span>,
          <span key="cat" className={theme.iconColor}>{c.category}</span>,
          <span key="author" className={theme.iconColor}>{c.author}</span>,
          <span key="date" className={theme.iconColor}>{c.date}</span>,
          <span key="aud" className={theme.iconColor}>{c.audience}</span>,
          <span key="read" className={`text-xs ${theme.highlight}`}>
            <span className="font-bold">{c.readCount}</span>
            <span className={theme.iconColor}>/{c.totalRecipients}</span>
            <span className={`ml-1 text-[10px] ${c.readCount / c.totalRecipients > 0.8 ? 'text-emerald-600' : c.readCount / c.totalRecipients > 0.5 ? 'text-amber-600' : 'text-red-500'} font-bold`}>
              ({Math.round(c.readCount / c.totalRecipients * 100)}%)
            </span>
          </span>,
          <StatusBadge key="status" status={c.status === 'Published' ? 'Active' : 'Pending'} theme={theme} />,
          <div key="actions" className="flex gap-1">
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Edit size={12} className={theme.iconColor} /></button>
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Send size={12} className={theme.iconColor} /></button>
          </div>
        ])}
        theme={theme}
      />

      {/* Recent Circular Preview */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Latest Circular Preview</h3>
        <div className={`p-4 rounded-xl ${theme.accentBg}`}>
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className={`text-sm font-bold ${theme.highlight}`}>{mockCirculars[0].title}</p>
              <p className={`text-[10px] ${theme.iconColor} mt-1`}>Published on {mockCirculars[0].date} | By {mockCirculars[0].author}</p>
            </div>
            <StatusBadge status="Active" theme={theme} />
          </div>
          <div className={`mt-3 text-xs ${theme.iconColor} space-y-1`}>
            <p>Dear Teachers,</p>
            <p>Please note that Unit Test 3 for Classes 8 to 10 will be conducted from 18th to 20th February 2026. The detailed subject-wise schedule is attached. Kindly ensure question papers are submitted to the Examination Cell by 15th February.</p>
            <p className="font-bold mt-2">Key Instructions:</p>
            <p>1. Syllabus coverage as per the academic calendar</p>
            <p>2. Question paper format: 40 marks (as per CBSE pattern)</p>
            <p>3. Answer sheet evaluation to be completed within 5 working days</p>
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-dashed" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
            <span className={`text-[10px] ${theme.iconColor}`}>Audience: {mockCirculars[0].audience}</span>
            <span className={`text-[10px] font-bold text-emerald-600`}>Read by {mockCirculars[0].readCount}/{mockCirculars[0].totalRecipients} ({Math.round(mockCirculars[0].readCount / mockCirculars[0].totalRecipients * 100)}%)</span>
          </div>
        </div>
      </div>

      <div className={`flex items-center justify-between text-xs ${theme.iconColor} px-2`}>
        <span>Showing 1-{mockCirculars.length} of {mockCirculars.length} circulars</span>
        <div className="flex gap-1">
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Previous</button>
          <button className={`px-3 py-1.5 rounded-lg ${theme.primary} text-white`}>1</button>
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Next</button>
        </div>
      </div>
    </div>
  );
}

// ─── EXPORT ─────────────────────────────────────────
export default function Page() {
  return (
    <BlueprintLayout>
      <VicePrincipalDashboard />
    </BlueprintLayout>
  );
}
