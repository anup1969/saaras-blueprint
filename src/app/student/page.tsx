'use client';

import React, { useState } from 'react';
import BlueprintLayout from '@/components/BlueprintLayout';
import { StatCard, TabBar, StatusBadge, SearchBar, DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  Home, Calendar, BookOpen, Award, ClipboardCheck, Banknote, BookMarked, Megaphone,
  Search, Bell, Clock, FileText, CheckCircle, XCircle, AlertTriangle,
  Download, ChevronDown, ChevronUp, Eye, Upload, Star, TrendingUp,
  BarChart3, Timer, Library, BookOpenCheck, IndianRupee, Receipt, CreditCard,
  GraduationCap, User, ArrowRight,
  PanelLeftClose, PanelLeftOpen
} from 'lucide-react';
import StakeholderProfile from '@/components/StakeholderProfile';
import TaskTrackerPanel from '@/components/TaskTrackerPanel';

// ─── STUDENT PROFILE ────────────────────────────────
const studentProfile = {
  name: 'Aarav Patel',
  class: '10-A',
  rollNo: 1,
  board: 'CBSE',
  admissionNo: 'SAR-2022-0101',
  house: 'Shivaji House',
  section: 'A',
  dob: '15 Mar 2011',
  bloodGroup: 'B+',
  fatherName: 'Rajesh Patel',
  motherName: 'Sunita Patel',
  contact: '+91 98765 43210',
};

// ─── MOCK: TODAY'S CLASSES ──────────────────────────
const todaysClasses = [
  { period: 1, time: '8:00 - 8:40', subject: 'Mathematics', teacher: 'Mr. Sharma', room: 'Room 201' },
  { period: 2, time: '8:40 - 9:20', subject: 'Science', teacher: 'Mrs. Iyer', room: 'Lab 3' },
  { period: 3, time: '9:20 - 10:00', subject: 'English', teacher: 'Ms. D\'Souza', room: 'Room 201' },
  { period: 4, time: '10:20 - 11:00', subject: 'Hindi', teacher: 'Mrs. Mishra', room: 'Room 201' },
  { period: 5, time: '11:00 - 11:40', subject: 'Social Science', teacher: 'Mr. Reddy', room: 'Room 201' },
  { period: 6, time: '11:40 - 12:20', subject: 'Computer Science', teacher: 'Mr. Joshi', room: 'Comp Lab 1' },
  { period: 7, time: '1:00 - 1:40', subject: 'Physical Education', teacher: 'Mr. Singh', room: 'Ground' },
  { period: 8, time: '1:40 - 2:20', subject: 'Art', teacher: 'Mrs. Kulkarni', room: 'Art Room' },
];

// ─── MOCK: TIMETABLE ────────────────────────────────
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const periods = ['P1\n8:00', 'P2\n8:40', 'P3\n9:20', 'P4\n10:20', 'P5\n11:00', 'P6\n11:40', 'P7\n1:00', 'P8\n1:40'];

const subjectColors: Record<string, string> = {
  'Maths': 'bg-blue-100 text-blue-700 border-blue-200',
  'Science': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'English': 'bg-purple-100 text-purple-700 border-purple-200',
  'Hindi': 'bg-orange-100 text-orange-700 border-orange-200',
  'SST': 'bg-amber-100 text-amber-700 border-amber-200',
  'CS': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  'PE': 'bg-teal-100 text-teal-700 border-teal-200',
  'Art': 'bg-pink-100 text-pink-700 border-pink-200',
  'Library': 'bg-cyan-100 text-cyan-700 border-cyan-200',
  'Music': 'bg-rose-100 text-rose-700 border-rose-200',
  'GK': 'bg-lime-100 text-lime-700 border-lime-200',
  'Moral Sc.': 'bg-violet-100 text-violet-700 border-violet-200',
  'BREAK': 'bg-gray-100 text-gray-500 border-gray-200',
  'LUNCH': 'bg-gray-100 text-gray-500 border-gray-200',
};

const timetableData: Record<string, string[]> = {
  Monday:    ['Maths', 'Science', 'English', 'Hindi', 'SST', 'CS', 'PE', 'Art'],
  Tuesday:   ['English', 'Maths', 'Hindi', 'Science', 'CS', 'SST', 'Library', 'Music'],
  Wednesday: ['Science', 'English', 'Maths', 'SST', 'Hindi', 'PE', 'Art', 'GK'],
  Thursday:  ['Hindi', 'Science', 'SST', 'Maths', 'English', 'CS', 'Music', 'Moral Sc.'],
  Friday:    ['Maths', 'Hindi', 'Science', 'English', 'PE', 'SST', 'CS', 'Library'],
  Saturday:  ['English', 'Maths', 'Science', 'GK', 'Art', 'Hindi', '', ''],
};

// ─── MOCK: HOMEWORK ─────────────────────────────────
const homeworkData = [
  { id: 1, subject: 'Mathematics', title: 'Ch-12: Surface Areas & Volumes — Ex 12.2', assignedBy: 'Mr. Sharma', assignedDate: '10 Feb 2026', dueDate: '13 Feb 2026', status: 'Pending', marks: null },
  { id: 2, subject: 'Science', title: 'Write experiment report on Magnetic Effects of Current', assignedBy: 'Mrs. Iyer', assignedDate: '09 Feb 2026', dueDate: '12 Feb 2026', status: 'Pending', marks: null },
  { id: 3, subject: 'English', title: 'Essay on "Digital India" (500 words)', assignedBy: 'Ms. D\'Souza', assignedDate: '08 Feb 2026', dueDate: '11 Feb 2026', status: 'Submitted', marks: null },
  { id: 4, subject: 'Hindi', title: 'Complete Surdas ke Pad exercises', assignedBy: 'Mrs. Mishra', assignedDate: '07 Feb 2026', dueDate: '10 Feb 2026', status: 'Graded', marks: '18/20' },
  { id: 5, subject: 'Social Science', title: 'Map work: Major Soil Types of India', assignedBy: 'Mr. Reddy', assignedDate: '06 Feb 2026', dueDate: '09 Feb 2026', status: 'Graded', marks: '15/20' },
  { id: 6, subject: 'Computer Science', title: 'Python program: Stack implementation', assignedBy: 'Mr. Joshi', assignedDate: '05 Feb 2026', dueDate: '08 Feb 2026', status: 'Graded', marks: '20/20' },
  { id: 7, subject: 'Mathematics', title: 'Ch-11: Constructions — Practice set', assignedBy: 'Mr. Sharma', assignedDate: '03 Feb 2026', dueDate: '06 Feb 2026', status: 'Graded', marks: '17/20' },
  { id: 8, subject: 'Science', title: 'Diagram: Human eye with labelling', assignedBy: 'Mrs. Iyer', assignedDate: '02 Feb 2026', dueDate: '05 Feb 2026', status: 'Graded', marks: '19/20' },
];

// ─── MOCK: RESULTS ──────────────────────────────────
const examTypes = ['Unit Test 1', 'Unit Test 2', 'Unit Test 3', 'Half Yearly', 'Annual'];

const resultsData: Record<string, { subject: string; maxMarks: number; obtained: number; grade: string }[]> = {
  'Unit Test 1': [
    { subject: 'Mathematics', maxMarks: 25, obtained: 23, grade: 'A+' },
    { subject: 'Science', maxMarks: 25, obtained: 22, grade: 'A+' },
    { subject: 'English', maxMarks: 25, obtained: 20, grade: 'A' },
    { subject: 'Hindi', maxMarks: 25, obtained: 21, grade: 'A' },
    { subject: 'Social Science', maxMarks: 25, obtained: 19, grade: 'A' },
    { subject: 'Computer Science', maxMarks: 25, obtained: 25, grade: 'A+' },
  ],
  'Unit Test 2': [
    { subject: 'Mathematics', maxMarks: 25, obtained: 24, grade: 'A+' },
    { subject: 'Science', maxMarks: 25, obtained: 21, grade: 'A' },
    { subject: 'English', maxMarks: 25, obtained: 22, grade: 'A+' },
    { subject: 'Hindi', maxMarks: 25, obtained: 20, grade: 'A' },
    { subject: 'Social Science', maxMarks: 25, obtained: 21, grade: 'A' },
    { subject: 'Computer Science', maxMarks: 25, obtained: 24, grade: 'A+' },
  ],
  'Unit Test 3': [
    { subject: 'Mathematics', maxMarks: 25, obtained: 22, grade: 'A+' },
    { subject: 'Science', maxMarks: 25, obtained: 23, grade: 'A+' },
    { subject: 'English', maxMarks: 25, obtained: 21, grade: 'A' },
    { subject: 'Hindi', maxMarks: 25, obtained: 22, grade: 'A+' },
    { subject: 'Social Science', maxMarks: 25, obtained: 20, grade: 'A' },
    { subject: 'Computer Science', maxMarks: 25, obtained: 25, grade: 'A+' },
  ],
  'Half Yearly': [
    { subject: 'Mathematics', maxMarks: 80, obtained: 72, grade: 'A+' },
    { subject: 'Science', maxMarks: 80, obtained: 68, grade: 'A' },
    { subject: 'English', maxMarks: 80, obtained: 65, grade: 'A' },
    { subject: 'Hindi', maxMarks: 80, obtained: 70, grade: 'A+' },
    { subject: 'Social Science', maxMarks: 80, obtained: 63, grade: 'A' },
    { subject: 'Computer Science', maxMarks: 80, obtained: 76, grade: 'A+' },
  ],
  'Annual': [
    { subject: 'Mathematics', maxMarks: 80, obtained: 75, grade: 'A+' },
    { subject: 'Science', maxMarks: 80, obtained: 71, grade: 'A+' },
    { subject: 'English', maxMarks: 80, obtained: 69, grade: 'A' },
    { subject: 'Hindi', maxMarks: 80, obtained: 72, grade: 'A+' },
    { subject: 'Social Science', maxMarks: 80, obtained: 67, grade: 'A' },
    { subject: 'Computer Science', maxMarks: 80, obtained: 78, grade: 'A+' },
  ],
};

const rankData: Record<string, { classRank: number; sectionStrength: number }> = {
  'Unit Test 1': { classRank: 3, sectionStrength: 42 },
  'Unit Test 2': { classRank: 2, sectionStrength: 42 },
  'Unit Test 3': { classRank: 2, sectionStrength: 42 },
  'Half Yearly': { classRank: 4, sectionStrength: 42 },
  'Annual': { classRank: 3, sectionStrength: 42 },
};

// ─── MOCK: ATTENDANCE ───────────────────────────────
// Feb 2026 attendance (1-12 so far)
const attendanceRecords: Record<number, 'P' | 'A' | 'L' | 'H'> = {
  1: 'H', 2: 'P', 3: 'P', 4: 'P', 5: 'P', 6: 'P', 7: 'P',
  8: 'H', 9: 'P', 10: 'L', 11: 'P', 12: 'P',
};

const monthlyAttendance = [
  { month: 'Apr 2025', present: 22, absent: 1, late: 1, holidays: 2, total: 26, percentage: 92.3 },
  { month: 'May 2025', present: 20, absent: 0, late: 2, holidays: 3, total: 25, percentage: 88.0 },
  { month: 'Jun 2025', present: 18, absent: 2, late: 0, holidays: 6, total: 26, percentage: 90.0 },
  { month: 'Jul 2025', present: 23, absent: 1, late: 1, holidays: 2, total: 27, percentage: 92.0 },
  { month: 'Aug 2025', present: 20, absent: 0, late: 2, holidays: 4, total: 26, percentage: 90.9 },
  { month: 'Sep 2025', present: 21, absent: 1, late: 0, holidays: 3, total: 25, percentage: 95.5 },
  { month: 'Oct 2025', present: 18, absent: 0, late: 1, holidays: 8, total: 27, percentage: 94.7 },
  { month: 'Nov 2025', present: 22, absent: 1, late: 0, holidays: 3, total: 26, percentage: 95.7 },
  { month: 'Dec 2025', present: 17, absent: 0, late: 1, holidays: 7, total: 25, percentage: 94.4 },
  { month: 'Jan 2026', present: 22, absent: 1, late: 1, holidays: 3, total: 27, percentage: 91.7 },
  { month: 'Feb 2026', present: 9, absent: 0, late: 1, holidays: 2, total: 12, percentage: 90.0 },
];

// ─── MOCK: FEES ─────────────────────────────────────
const feeStructure = [
  { head: 'Tuition Fee', amount: 4500, frequency: 'Monthly' },
  { head: 'Lab Fee', amount: 500, frequency: 'Monthly' },
  { head: 'Library Fee', amount: 300, frequency: 'Monthly' },
  { head: 'Computer Fee', amount: 400, frequency: 'Monthly' },
  { head: 'Activity Fee', amount: 300, frequency: 'Monthly' },
  { head: 'Annual Charges', amount: 8000, frequency: 'Annual' },
  { head: 'Exam Fee', amount: 3000, frequency: 'Half-Yearly' },
];

const feePayments = [
  { id: 'REC-2026-0187', date: '05 Feb 2026', amount: 6000, mode: 'UPI', month: 'Feb 2026', status: 'Paid' },
  { id: 'REC-2026-0098', date: '04 Jan 2026', amount: 6000, mode: 'Online', month: 'Jan 2026', status: 'Paid' },
  { id: 'REC-2025-1201', date: '03 Dec 2025', amount: 6000, mode: 'UPI', month: 'Dec 2025', status: 'Paid' },
  { id: 'REC-2025-1105', date: '05 Nov 2025', amount: 6000, mode: 'Cash', month: 'Nov 2025', status: 'Paid' },
  { id: 'REC-2025-1002', date: '04 Oct 2025', amount: 6000, mode: 'Cheque', month: 'Oct 2025', status: 'Paid' },
  { id: 'REC-2025-0903', date: '03 Sep 2025', amount: 9000, mode: 'Online', month: 'Sep 2025 + Exam Fee', status: 'Paid' },
];

const currentDues = {
  monthlyDue: 6000,
  dueMonth: 'March 2026',
  dueDate: '10 Mar 2026',
  annualPending: 0,
  totalPaid: 69000,
};

// ─── MOCK: LIBRARY ──────────────────────────────────
const issuedBooks = [
  { id: 'LIB-4521', title: 'NCERT Mathematics Class 10', author: 'NCERT', issueDate: '01 Feb 2026', dueDate: '15 Feb 2026', status: 'Active' },
  { id: 'LIB-4522', title: 'Wings of Fire', author: 'A.P.J. Abdul Kalam', issueDate: '28 Jan 2026', dueDate: '11 Feb 2026', status: 'Overdue' },
  { id: 'LIB-4389', title: 'The Story of My Experiments with Truth', author: 'M.K. Gandhi', issueDate: '15 Jan 2026', dueDate: '29 Jan 2026', status: 'Returned' },
  { id: 'LIB-4301', title: 'Malgudi Days', author: 'R.K. Narayan', issueDate: '01 Jan 2026', dueDate: '15 Jan 2026', status: 'Returned' },
  { id: 'LIB-4198', title: 'Ignited Minds', author: 'A.P.J. Abdul Kalam', issueDate: '10 Dec 2025', dueDate: '24 Dec 2025', status: 'Returned' },
];

const libraryCatalog = [
  { title: 'The Discovery of India', author: 'Jawaharlal Nehru', category: 'History', available: true },
  { title: 'India After Gandhi', author: 'Ramachandra Guha', category: 'History', available: true },
  { title: 'Lakhmir Singh Science Class 10', author: 'Lakhmir Singh', category: 'Textbook', available: false },
  { title: 'R.D. Sharma Mathematics', author: 'R.D. Sharma', category: 'Reference', available: true },
  { title: 'The Room on the Roof', author: 'Ruskin Bond', category: 'Fiction', available: true },
  { title: 'Godan', author: 'Munshi Premchand', category: 'Hindi Literature', available: true },
];

// ─── MOCK: NOTICES ──────────────────────────────────
const notices = [
  { id: 1, title: 'Annual Day Celebration 2026', date: '12 Feb 2026', category: 'Event', content: 'Dear students, our school Annual Day will be held on 28th February 2026. All students must participate in at least one cultural activity. Rehearsals begin from 15th February during 7th and 8th periods. Contact your class teacher for registrations. Chief Guest: Dr. Ramesh Agarwal, IAS. Dress code: School uniform with house color badge.', isNew: true },
  { id: 2, title: 'Pre-Board Examination Schedule', date: '10 Feb 2026', category: 'Exam', content: 'Class 10 Pre-Board examinations will commence from 20th February 2026. Timetable: 20 Feb - English, 22 Feb - Hindi, 24 Feb - Mathematics, 26 Feb - Science, 28 Feb - Social Science, 1 Mar - Computer Science. Reporting time: 9:00 AM. Hall tickets to be collected from class teachers. Students must bring their own stationery.', isNew: true },
  { id: 3, title: 'PTM — Parent Teacher Meeting', date: '08 Feb 2026', category: 'Meeting', content: 'Parent Teacher Meeting scheduled for 15th February (Saturday) from 9:00 AM to 1:00 PM. Parents are requested to bring the student diary. Discussion topics: Pre-Board preparation, attendance review, career counselling for Class 10. Report cards of Unit Test 3 will be distributed.', isNew: false },
  { id: 4, title: 'Science Exhibition — Project Submission', date: '05 Feb 2026', category: 'Academic', content: 'Inter-house Science Exhibition will be held on 5th March 2026. Theme: "Sustainable Development Goals". Each team (2-3 students) must submit a project synopsis to the Science department by 20th February. Selected projects will represent the school at CBSE Regional Science Exhibition. Prizes: 1st - Rs. 5000, 2nd - Rs. 3000, 3rd - Rs. 2000.', isNew: false },
  { id: 5, title: 'Library Book Return Reminder', date: '03 Feb 2026', category: 'General', content: 'All students with overdue library books are requested to return them by 10th February to avoid late fees. Fine: Rs. 2 per day per book. Students with pending books will not be issued hall tickets for Pre-Board examinations. Check your library account on the student portal for due dates.', isNew: false },
  { id: 6, title: 'Inter-School Cricket Tournament', date: '01 Feb 2026', category: 'Sports', content: 'Our school cricket team has been selected for the District-level Inter-School Cricket Tournament. Matches will be held from 10-14 March at Rajiv Gandhi Stadium. Selected players will be excused from regular classes during tournament days. Team list displayed on sports notice board. Coach: Mr. Vikram Singh.', isNew: false },
  { id: 7, title: 'Republic Day Celebration Photos', date: '27 Jan 2026', category: 'Event', content: 'Photos from the Republic Day celebration held on 26th January are now available on the school website. Students who participated in the march past and cultural program can collect certificates from the Admin office during lunch break. Special mention: Aarav Patel (10-A) for the winning patriotic speech.', isNew: false },
];

// ─── MODULE SIDEBAR ────────────────────────────────
const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'timetable', label: 'Timetable', icon: Calendar },
  { id: 'homework', label: 'Homework', icon: BookOpen },
  { id: 'results', label: 'Results', icon: Award },
  { id: 'attendance', label: 'Attendance', icon: ClipboardCheck },
  { id: 'fees', label: 'Fees', icon: Banknote },
  { id: 'library', label: 'Library', icon: BookMarked },
  { id: 'notices', label: 'Notices', icon: Megaphone },
];

// ─── MAIN COMPONENT ────────────────────────────────
function StudentDashboard({ theme, themeIdx, onThemeChange }: { theme?: Theme; themeIdx?: number; onThemeChange?: (idx: number) => void }) {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  if (!theme) return null;

  return (
    <div className="flex gap-4 -m-6">
      {/* Module sidebar */}
      <div className={`${sidebarCollapsed ? 'w-14' : 'w-48'} ${theme.cardBg} border-r ${theme.border} min-h-screen p-2 space-y-0.5 shrink-0 transition-all duration-200`}>
        <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} px-2 py-2`}>
          {!sidebarCollapsed && <p className={`text-[10px] font-bold ${theme.iconColor} uppercase px-1`}>Modules</p>}
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className={`p-1 rounded-lg ${theme.buttonHover} ${theme.iconColor} transition-all`}>
            {sidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={14} />}
          </button>
        </div>
        {modules.map(m => (
          <button
            key={m.id}
            onClick={() => setActiveModule(m.id)}
            title={sidebarCollapsed ? m.label : undefined}
            className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2 py-2.5' : 'gap-2 px-3 py-2'} rounded-lg text-xs font-medium transition-all ${
              activeModule === m.id ? `${theme.primary} text-white` : `${theme.iconColor} ${theme.buttonHover}`
            }`}
          >
            <m.icon size={sidebarCollapsed ? 18 : 14} /> {!sidebarCollapsed && m.label}
          </button>
        ))}
      </div>

      {/* Module content */}
      <div className="flex-1 p-6 space-y-4 overflow-x-hidden">
        {activeModule === 'dashboard' && <DashboardHome theme={theme} onProfileClick={() => setActiveModule('profile')} />}
        {activeModule === 'timetable' && <TimetableModule theme={theme} />}
        {activeModule === 'homework' && <HomeworkModule theme={theme} />}
        {activeModule === 'results' && <ResultsModule theme={theme} />}
        {activeModule === 'attendance' && <AttendanceModule theme={theme} />}
        {activeModule === 'fees' && <FeesModule theme={theme} />}
        {activeModule === 'library' && <LibraryModule theme={theme} />}
        {activeModule === 'notices' && <NoticesModule theme={theme} />}
        {activeModule === 'profile' && <StakeholderProfile role="student" theme={theme} onClose={() => setActiveModule('dashboard')} themeIdx={themeIdx} onThemeChange={onThemeChange} />}
      </div>
    </div>
  );
}

// ─── DASHBOARD HOME ─────────────────────────────────
function DashboardHome({ theme, onProfileClick }: { theme: Theme; onProfileClick: () => void }) {
  return (
    <div className="space-y-4">
      {/* Profile header */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 flex items-center gap-4`}>
        <div className={`w-14 h-14 rounded-2xl bg-blue-500 flex items-center justify-center text-white text-xl font-bold shadow-sm`}>
          AP
        </div>
        <div className="flex-1">
          <h1 className={`text-xl font-bold ${theme.highlight}`}>{studentProfile.name}</h1>
          <p className={`text-xs ${theme.iconColor} mt-0.5`}>
            Class {studentProfile.class} | Roll No. {studentProfile.rollNo} | {studentProfile.board} | Adm. No: {studentProfile.admissionNo}
          </p>
          <p className={`text-xs ${theme.iconColor}`}>{studentProfile.house}</p>
        </div>
        <div className="text-right">
          <p className={`text-xs ${theme.iconColor}`}>Academic Year</p>
          <p className={`text-sm font-bold ${theme.highlight}`}>2025-26</p>
        </div>
        <button onClick={onProfileClick} title="My Profile" className={`w-9 h-9 rounded-full ${theme.primary} text-white flex items-center justify-center text-xs font-bold hover:opacity-90 transition-opacity`}>AM</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={ClipboardCheck} label="Today's Classes" value={8} color="bg-blue-500" sub="2 complete" theme={theme} />
        <StatCard icon={BookOpen} label="Pending Homework" value={2} color="bg-amber-500" sub="due this week" theme={theme} />
        <StatCard icon={Award} label="Upcoming Exams" value="Pre-Board" color="bg-purple-500" sub="20 Feb 2026" theme={theme} />
        <StatCard icon={TrendingUp} label="Attendance" value="93.2%" color="bg-emerald-500" sub="this session" theme={theme} />
      </div>

      {/* Today's Schedule */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Today&apos;s Schedule &mdash; Thursday, 12 Feb 2026</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {todaysClasses.map((cls, i) => (
            <div key={i} className={`p-3 rounded-xl border ${theme.border} ${i < 2 ? theme.secondaryBg : theme.accentBg}`}>
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[10px] font-bold ${theme.iconColor}`}>Period {cls.period}</span>
                <span className={`text-[10px] ${theme.iconColor}`}>{cls.time}</span>
              </div>
              <p className={`text-xs font-bold ${theme.highlight}`}>{cls.subject}</p>
              <p className={`text-[10px] ${theme.iconColor}`}>{cls.teacher} &bull; {cls.room}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Info Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recent Homework */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Pending Homework</h3>
          <div className="space-y-2">
            {homeworkData.filter(h => h.status === 'Pending').map(hw => (
              <div key={hw.id} className={`flex items-center gap-3 p-2.5 rounded-xl ${theme.accentBg}`}>
                <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white">
                  <AlertTriangle size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-bold ${theme.highlight} truncate`}>{hw.subject}: {hw.title}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Due: {hw.dueDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Notices */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Latest Notices</h3>
          <div className="space-y-2">
            {notices.slice(0, 3).map(n => (
              <div key={n.id} className={`flex items-center gap-3 p-2.5 rounded-xl ${theme.accentBg}`}>
                <div className={`w-8 h-8 rounded-lg ${n.isNew ? 'bg-red-500' : 'bg-indigo-500'} flex items-center justify-center text-white`}>
                  {n.isNew ? <Bell size={14} /> : <Megaphone size={14} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-bold ${theme.highlight} truncate`}>{n.title}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{n.date} &bull; {n.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions + Task Tracker — Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Quick Actions */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Submit Homework', icon: Upload, color: 'bg-blue-500' },
              { label: 'View Results', icon: Award, color: 'bg-emerald-500' },
              { label: 'Pay Fees', icon: CreditCard, color: 'bg-indigo-500' },
              { label: 'Library Catalog', icon: BookMarked, color: 'bg-purple-500' },
            ].map(a => (
              <button key={a.label} className={`flex items-center gap-2 p-3 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} transition-all`}>
                <div className={`w-8 h-8 rounded-lg ${a.color} flex items-center justify-center text-white`}><a.icon size={14} /></div>
                <span className={`text-xs font-bold ${theme.highlight}`}>{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Task Tracker */}
        <TaskTrackerPanel theme={theme} role="student" />
      </div>
    </div>
  );
}

// ─── TIMETABLE MODULE ───────────────────────────────
function TimetableModule({ theme }: { theme: Theme }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Weekly Timetable</h1>
        <span className={`text-xs px-3 py-1.5 rounded-lg ${theme.secondaryBg} ${theme.iconColor} font-bold`}>
          Class 10-A | 2025-26
        </span>
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden overflow-x-auto`}>
        <table className="w-full text-sm">
          <thead className={theme.secondaryBg}>
            <tr>
              <th className={`text-left px-3 py-3 text-xs font-bold ${theme.iconColor} uppercase w-24`}>Day</th>
              {periods.map((p, i) => (
                <th key={i} className={`text-center px-2 py-3 text-[10px] font-bold ${theme.iconColor} uppercase whitespace-pre-line`}>{p}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map(day => (
              <tr key={day} className={`border-t ${theme.border}`}>
                <td className={`px-3 py-2 text-xs font-bold ${theme.highlight} whitespace-nowrap`}>{day}</td>
                {timetableData[day].map((subj, i) => {
                  if (!subj) return <td key={i} className="px-2 py-2 text-center"><span className="text-[10px] text-gray-400">--</span></td>;
                  const color = subjectColors[subj] || 'bg-gray-100 text-gray-700 border-gray-200';
                  return (
                    <td key={i} className="px-1 py-1.5 text-center">
                      <span className={`inline-block px-2 py-1.5 rounded-lg text-[11px] font-bold border ${color}`}>
                        {subj}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Break info */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-2`}>Break Schedule</h3>
        <div className="flex gap-4">
          <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${theme.secondaryBg}`}>
            <Clock size={14} className={theme.iconColor} />
            <span className={`text-xs ${theme.highlight} font-bold`}>Short Break: 10:00 - 10:20</span>
          </div>
          <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${theme.secondaryBg}`}>
            <Clock size={14} className={theme.iconColor} />
            <span className={`text-xs ${theme.highlight} font-bold`}>Lunch Break: 12:20 - 1:00</span>
          </div>
          <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${theme.secondaryBg}`}>
            <Clock size={14} className={theme.iconColor} />
            <span className={`text-xs ${theme.highlight} font-bold`}>Dismissal: 2:20 PM</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-2`}>Subject Color Legend</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(subjectColors).filter(([k]) => !['BREAK', 'LUNCH'].includes(k)).map(([subj, color]) => (
            <span key={subj} className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${color}`}>{subj}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── HOMEWORK MODULE ────────────────────────────────
function HomeworkModule({ theme }: { theme: Theme }) {
  const [filter, setFilter] = useState('All');
  const subjects = ['All', 'Mathematics', 'Science', 'English', 'Hindi', 'Social Science', 'Computer Science'];
  const [statusFilter, setStatusFilter] = useState('All');
  const statuses = ['All', 'Pending', 'Submitted', 'Graded'];

  const filtered = homeworkData.filter(h => {
    const matchSubject = filter === 'All' || h.subject === filter;
    const matchStatus = statusFilter === 'All' || h.status === statusFilter;
    return matchSubject && matchStatus;
  });

  const hwStatusColors: Record<string, string> = {
    Pending: 'bg-amber-100 text-amber-700',
    Submitted: 'bg-blue-100 text-blue-700',
    Graded: 'bg-emerald-100 text-emerald-700',
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Homework</h1>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2.5 py-1 rounded-lg bg-amber-100 text-amber-700 font-bold`}>
            {homeworkData.filter(h => h.status === 'Pending').length} Pending
          </span>
          <span className={`text-xs px-2.5 py-1 rounded-lg bg-blue-100 text-blue-700 font-bold`}>
            {homeworkData.filter(h => h.status === 'Submitted').length} Submitted
          </span>
          <span className={`text-xs px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-700 font-bold`}>
            {homeworkData.filter(h => h.status === 'Graded').length} Graded
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div>
          <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1`}>Subject</p>
          <TabBar tabs={subjects} active={filter} onChange={setFilter} theme={theme} />
        </div>
        <div>
          <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1`}>Status</p>
          <TabBar tabs={statuses} active={statusFilter} onChange={setStatusFilter} theme={theme} />
        </div>
      </div>

      {/* Homework List */}
      <div className="space-y-3">
        {filtered.map(hw => (
          <div key={hw.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${hwStatusColors[hw.status]}`}>{hw.status}</span>
                  <span className={`text-xs font-bold ${theme.primaryText}`}>{hw.subject}</span>
                </div>
                <p className={`text-sm font-bold ${theme.highlight} mb-1`}>{hw.title}</p>
                <div className="flex items-center gap-4">
                  <p className={`text-[10px] ${theme.iconColor}`}>Assigned by: {hw.assignedBy}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Assigned: {hw.assignedDate}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Due: {hw.dueDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {hw.marks && (
                  <span className={`text-sm font-bold ${theme.highlight} px-3 py-1.5 rounded-xl ${theme.secondaryBg}`}>
                    {hw.marks}
                  </span>
                )}
                {hw.status === 'Pending' && (
                  <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}>
                    <Upload size={12} /> Submit
                  </button>
                )}
                {hw.status === 'Submitted' && (
                  <span className={`text-xs ${theme.iconColor} italic`}>Awaiting review</span>
                )}
                {hw.status === 'Graded' && (
                  <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${theme.secondaryBg} ${theme.highlight} text-xs font-bold ${theme.buttonHover}`}>
                    <Eye size={12} /> View Feedback
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── RESULTS MODULE ─────────────────────────────────
function ResultsModule({ theme }: { theme: Theme }) {
  const [selectedExam, setSelectedExam] = useState('Unit Test 1');
  const results = resultsData[selectedExam] || [];
  const rank = rankData[selectedExam];

  const totalObtained = results.reduce((s, r) => s + r.obtained, 0);
  const totalMax = results.reduce((s, r) => s + r.maxMarks, 0);
  const percentage = ((totalObtained / totalMax) * 100).toFixed(1);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Exam Results</h1>
        <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${theme.secondaryBg} ${theme.highlight} text-xs font-bold ${theme.buttonHover}`}>
          <Download size={12} /> Download Report Card
        </button>
      </div>

      {/* Exam Selector */}
      <TabBar tabs={examTypes} active={selectedExam} onChange={setSelectedExam} theme={theme} />

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Award} label="Total Marks" value={`${totalObtained}/${totalMax}`} color="bg-blue-500" theme={theme} />
        <StatCard icon={TrendingUp} label="Percentage" value={`${percentage}%`} color="bg-emerald-500" theme={theme} />
        <StatCard icon={Star} label="Class Rank" value={`${rank.classRank}/${rank.sectionStrength}`} color="bg-amber-500" theme={theme} />
        <StatCard icon={BarChart3} label="Grade" value={Number(percentage) >= 90 ? 'A+' : Number(percentage) >= 75 ? 'A' : 'B'} color="bg-purple-500" theme={theme} />
      </div>

      {/* Marks Table */}
      <DataTable
        headers={['Subject', 'Max Marks', 'Obtained', 'Percentage', 'Grade']}
        rows={results.map(r => [
          <span key="sub" className={`text-xs font-bold ${theme.highlight}`}>{r.subject}</span>,
          <span key="max" className={`text-xs ${theme.iconColor}`}>{r.maxMarks}</span>,
          <span key="obt" className={`text-xs font-bold ${theme.highlight}`}>{r.obtained}</span>,
          <span key="pct" className={`text-xs ${theme.iconColor}`}>{((r.obtained / r.maxMarks) * 100).toFixed(1)}%</span>,
          <span key="grd" className={`text-xs px-2 py-0.5 rounded-full font-bold ${
            r.grade === 'A+' ? 'bg-emerald-100 text-emerald-700' : r.grade === 'A' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
          }`}>{r.grade}</span>,
        ])}
        theme={theme}
      />

      {/* Performance Comparison */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Subject-wise Performance</h3>
        <div className="space-y-2">
          {results.map(r => {
            const pct = (r.obtained / r.maxMarks) * 100;
            return (
              <div key={r.subject} className="flex items-center gap-3">
                <span className={`text-xs ${theme.highlight} w-32 font-medium`}>{r.subject}</span>
                <div className={`flex-1 h-5 rounded-full ${theme.secondaryBg} overflow-hidden`}>
                  <div
                    className={`h-full rounded-full ${pct >= 90 ? 'bg-emerald-500' : pct >= 75 ? 'bg-blue-500' : 'bg-amber-500'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className={`text-xs font-bold ${theme.highlight} w-12 text-right`}>{pct.toFixed(0)}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── ATTENDANCE MODULE ──────────────────────────────
function AttendanceModule({ theme }: { theme: Theme }) {
  const [selectedMonth, setSelectedMonth] = useState('Feb 2026');
  const monthTabs = monthlyAttendance.map(m => m.month);

  // Calendar for Feb 2026
  const daysInMonth = 28;
  const firstDayOffset = 6; // Feb 1, 2026 is Sunday (0-indexed: 6 for Saturday grid starting Mon)
  // Actually let's use a simple Mon-start grid. Feb 1 2026 is a Sunday => offset 6
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const attendanceColorMap: Record<string, string> = {
    P: 'bg-emerald-500 text-white',
    A: 'bg-red-500 text-white',
    L: 'bg-amber-400 text-white',
    H: 'bg-gray-300 text-gray-600',
  };

  const attendanceLabelMap: Record<string, string> = {
    P: 'Present', A: 'Absent', L: 'Late', H: 'Holiday',
  };

  const overallPresent = monthlyAttendance.reduce((s, m) => s + m.present, 0);
  const overallTotal = monthlyAttendance.reduce((s, m) => s + m.present + m.absent + m.late, 0);
  const overallPct = ((overallPresent / overallTotal) * 100).toFixed(1);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Attendance</h1>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-700 font-bold`}>
            Overall: {overallPct}%
          </span>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={CheckCircle} label="Total Present" value={overallPresent} color="bg-emerald-500" theme={theme} />
        <StatCard icon={XCircle} label="Total Absent" value={monthlyAttendance.reduce((s, m) => s + m.absent, 0)} color="bg-red-500" theme={theme} />
        <StatCard icon={Clock} label="Total Late" value={monthlyAttendance.reduce((s, m) => s + m.late, 0)} color="bg-amber-500" theme={theme} />
        <StatCard icon={TrendingUp} label="Attendance %" value={`${overallPct}%`} color="bg-blue-500" theme={theme} />
      </div>

      {/* February Calendar */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>February 2026 &mdash; Daily Attendance</h3>
        <div className="grid grid-cols-7 gap-1 mb-3">
          {dayNames.map(d => (
            <div key={d} className={`text-center text-[10px] font-bold ${theme.iconColor} uppercase py-1`}>{d}</div>
          ))}
          {/* Empty cells for offset (Feb 1 2026 = Sunday, so offset 6 cells from Mon) */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`empty-${i}`} className="h-10" />
          ))}
          {/* Days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const record = attendanceRecords[day];
            const isFuture = day > 12;
            const colorClass = record ? attendanceColorMap[record] : '';
            return (
              <div
                key={day}
                className={`h-10 rounded-lg flex items-center justify-center text-xs font-bold ${
                  isFuture
                    ? `${theme.accentBg} ${theme.iconColor}`
                    : record
                    ? colorClass
                    : `${theme.secondaryBg} ${theme.iconColor}`
                }`}
                title={record ? attendanceLabelMap[record] : isFuture ? 'Upcoming' : ''}
              >
                {day}
              </div>
            );
          })}
        </div>
        {/* Legend */}
        <div className="flex gap-3">
          {Object.entries(attendanceLabelMap).map(([key, label]) => (
            <div key={key} className="flex items-center gap-1.5">
              <div className={`w-4 h-4 rounded ${attendanceColorMap[key]}`} />
              <span className={`text-[10px] ${theme.iconColor} font-bold`}>{label}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5">
            <div className={`w-4 h-4 rounded ${theme.accentBg} border ${theme.border}`} />
            <span className={`text-[10px] ${theme.iconColor} font-bold`}>Upcoming</span>
          </div>
        </div>
      </div>

      {/* Monthly Breakdown */}
      <DataTable
        headers={['Month', 'Present', 'Absent', 'Late', 'Holidays', 'Working Days', 'Attendance %']}
        rows={monthlyAttendance.map(m => [
          <span key="mo" className={`text-xs font-bold ${theme.highlight}`}>{m.month}</span>,
          <span key="pr" className="text-xs text-emerald-600 font-bold">{m.present}</span>,
          <span key="ab" className="text-xs text-red-600 font-bold">{m.absent}</span>,
          <span key="lt" className="text-xs text-amber-600 font-bold">{m.late}</span>,
          <span key="hol" className={`text-xs ${theme.iconColor}`}>{m.holidays}</span>,
          <span key="tot" className={`text-xs ${theme.iconColor}`}>{m.total}</span>,
          <span key="pct" className={`text-xs px-2 py-0.5 rounded-full font-bold ${
            m.percentage >= 90 ? 'bg-emerald-100 text-emerald-700' : m.percentage >= 75 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
          }`}>{m.percentage}%</span>,
        ])}
        theme={theme}
      />
    </div>
  );
}

// ─── FEES MODULE ────────────────────────────────────
function FeesModule({ theme }: { theme: Theme }) {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Fee Details</h1>
        <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}>
          <CreditCard size={12} /> Pay Now
        </button>
      </div>

      <TabBar tabs={['Overview', 'Fee Structure', 'Payment History']} active={activeTab} onChange={setActiveTab} theme={theme} />

      {activeTab === 'Overview' && (
        <div className="space-y-4">
          {/* Fee Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={IndianRupee} label="Current Dues" value={`Rs. ${currentDues.monthlyDue.toLocaleString()}`} color="bg-amber-500" sub={currentDues.dueMonth} theme={theme} />
            <StatCard icon={Calendar} label="Due Date" value={currentDues.dueDate} color="bg-red-500" theme={theme} />
            <StatCard icon={CheckCircle} label="Total Paid" value={`Rs. ${currentDues.totalPaid.toLocaleString()}`} color="bg-emerald-500" sub="this session" theme={theme} />
            <StatCard icon={Receipt} label="Last Payment" value="Rs. 6,000" color="bg-blue-500" sub="05 Feb 2026" theme={theme} />
          </div>

          {/* Current Due Card */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-sm font-bold ${theme.highlight} mb-1`}>Next Payment Due</h3>
                <p className={`text-xs ${theme.iconColor}`}>Monthly fee for {currentDues.dueMonth}</p>
                <p className={`text-2xl font-bold ${theme.highlight} mt-2`}>Rs. {currentDues.monthlyDue.toLocaleString()}</p>
                <p className={`text-xs ${theme.iconColor} mt-1`}>Due by: {currentDues.dueDate}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button className={`flex items-center gap-1.5 px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>
                  <CreditCard size={14} /> Pay Online
                </button>
                <button className={`flex items-center gap-1.5 px-4 py-2 rounded-xl ${theme.secondaryBg} ${theme.highlight} text-xs font-bold ${theme.buttonHover}`}>
                  <Download size={14} /> Fee Challan
                </button>
              </div>
            </div>
          </div>

          {/* Recent Payments */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Recent Payments</h3>
            <div className="space-y-2">
              {feePayments.slice(0, 3).map(p => (
                <div key={p.id} className={`flex items-center justify-between p-3 rounded-xl ${theme.accentBg}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                      <CheckCircle size={14} />
                    </div>
                    <div>
                      <p className={`text-xs font-bold ${theme.highlight}`}>{p.month}</p>
                      <p className={`text-[10px] ${theme.iconColor}`}>{p.date} &bull; {p.mode}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${theme.highlight}`}>Rs. {p.amount.toLocaleString()}</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>{p.id}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Fee Structure' && (
        <div className="space-y-4">
          <DataTable
            headers={['Fee Head', 'Amount (Rs.)', 'Frequency']}
            rows={feeStructure.map(f => [
              <span key="head" className={`text-xs font-bold ${theme.highlight}`}>{f.head}</span>,
              <span key="amt" className={`text-xs font-bold ${theme.highlight}`}>Rs. {f.amount.toLocaleString()}</span>,
              <span key="freq" className={`text-xs ${theme.iconColor}`}>{f.frequency}</span>,
            ])}
            theme={theme}
          />
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex justify-between items-center">
              <span className={`text-sm font-bold ${theme.highlight}`}>Monthly Total</span>
              <span className={`text-lg font-bold ${theme.highlight}`}>
                Rs. {feeStructure.filter(f => f.frequency === 'Monthly').reduce((s, f) => s + f.amount, 0).toLocaleString()}
              </span>
            </div>
            <div className={`flex justify-between items-center mt-2 pt-2 border-t ${theme.border}`}>
              <span className={`text-sm font-bold ${theme.highlight}`}>Annual Fee (approx.)</span>
              <span className={`text-lg font-bold ${theme.primaryText}`}>
                Rs. {(
                  feeStructure.filter(f => f.frequency === 'Monthly').reduce((s, f) => s + f.amount, 0) * 12 +
                  feeStructure.filter(f => f.frequency === 'Annual').reduce((s, f) => s + f.amount, 0) +
                  feeStructure.filter(f => f.frequency === 'Half-Yearly').reduce((s, f) => s + f.amount, 0) * 2
                ).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Payment History' && (
        <DataTable
          headers={['Receipt No.', 'Date', 'Amount', 'Mode', 'For Month', 'Status', 'Action']}
          rows={feePayments.map(p => [
            <span key="id" className={`text-xs font-bold ${theme.primaryText}`}>{p.id}</span>,
            <span key="dt" className={`text-xs ${theme.iconColor}`}>{p.date}</span>,
            <span key="amt" className={`text-xs font-bold ${theme.highlight}`}>Rs. {p.amount.toLocaleString()}</span>,
            <span key="mode" className={`text-xs ${theme.iconColor}`}>{p.mode}</span>,
            <span key="mon" className={`text-xs ${theme.highlight}`}>{p.month}</span>,
            <StatusBadge key="st" status={p.status} theme={theme} />,
            <button key="dl" className={`flex items-center gap-1 text-xs ${theme.primaryText} font-bold`}>
              <Download size={12} /> Receipt
            </button>,
          ])}
          theme={theme}
        />
      )}
    </div>
  );
}

// ─── LIBRARY MODULE ─────────────────────────────────
function LibraryModule({ theme }: { theme: Theme }) {
  const [activeTab, setActiveTab] = useState('My Books');

  const bookStatusColors: Record<string, string> = {
    Active: 'bg-emerald-100 text-emerald-700',
    Overdue: 'bg-red-100 text-red-700',
    Returned: 'bg-slate-100 text-slate-600',
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Library</h1>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-700 font-bold`}>
            {issuedBooks.filter(b => b.status === 'Active').length} Active
          </span>
          <span className={`text-xs px-2.5 py-1 rounded-lg bg-red-100 text-red-700 font-bold`}>
            {issuedBooks.filter(b => b.status === 'Overdue').length} Overdue
          </span>
        </div>
      </div>

      <TabBar tabs={['My Books', 'Search Catalog']} active={activeTab} onChange={setActiveTab} theme={theme} />

      {activeTab === 'My Books' && (
        <div className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={BookOpenCheck} label="Books Issued" value={issuedBooks.filter(b => b.status === 'Active').length} color="bg-blue-500" theme={theme} />
            <StatCard icon={AlertTriangle} label="Overdue Books" value={issuedBooks.filter(b => b.status === 'Overdue').length} color="bg-red-500" theme={theme} />
            <StatCard icon={BookMarked} label="Total Borrowed" value={issuedBooks.length} color="bg-indigo-500" sub="this session" theme={theme} />
            <StatCard icon={Star} label="Reading Score" value="A+" color="bg-emerald-500" sub="top 10%" theme={theme} />
          </div>

          {/* Issued Books */}
          <DataTable
            headers={['Book ID', 'Title', 'Author', 'Issue Date', 'Due Date', 'Status']}
            rows={issuedBooks.map(b => [
              <span key="id" className={`text-xs font-bold ${theme.primaryText}`}>{b.id}</span>,
              <span key="title" className={`text-xs font-bold ${theme.highlight}`}>{b.title}</span>,
              <span key="author" className={`text-xs ${theme.iconColor}`}>{b.author}</span>,
              <span key="issue" className={`text-xs ${theme.iconColor}`}>{b.issueDate}</span>,
              <span key="due" className={`text-xs ${b.status === 'Overdue' ? 'text-red-600 font-bold' : theme.iconColor}`}>{b.dueDate}</span>,
              <span key="st" className={`text-xs px-2 py-0.5 rounded-full font-bold ${bookStatusColors[b.status]}`}>{b.status}</span>,
            ])}
            theme={theme}
          />
        </div>
      )}

      {activeTab === 'Search Catalog' && (
        <div className="space-y-4">
          <SearchBar placeholder="Search books by title, author, or category..." theme={theme} icon={Search} />

          <div className="space-y-3">
            {libraryCatalog.map((book, i) => (
              <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${book.available ? 'bg-emerald-500' : 'bg-gray-400'} flex items-center justify-center text-white`}>
                    <BookOpen size={16} />
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${theme.highlight}`}>{book.title}</p>
                    <p className={`text-xs ${theme.iconColor}`}>{book.author} &bull; {book.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    book.available ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {book.available ? 'Available' : 'Issued'}
                  </span>
                  {book.available && (
                    <button className={`text-xs px-3 py-1.5 rounded-xl ${theme.primary} text-white font-bold`}>
                      Request
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── NOTICES MODULE ─────────────────────────────────
function NoticesModule({ theme }: { theme: Theme }) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const categories = ['All', 'Event', 'Exam', 'Meeting', 'Academic', 'General', 'Sports'];

  const categoryColors: Record<string, string> = {
    Event: 'bg-purple-100 text-purple-700',
    Exam: 'bg-red-100 text-red-700',
    Meeting: 'bg-blue-100 text-blue-700',
    Academic: 'bg-indigo-100 text-indigo-700',
    General: 'bg-slate-100 text-slate-600',
    Sports: 'bg-teal-100 text-teal-700',
  };

  const filtered = categoryFilter === 'All' ? notices : notices.filter(n => n.category === categoryFilter);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Notices & Announcements</h1>
        <span className={`text-xs px-2.5 py-1 rounded-lg bg-red-100 text-red-700 font-bold`}>
          {notices.filter(n => n.isNew).length} New
        </span>
      </div>

      <TabBar tabs={categories} active={categoryFilter} onChange={setCategoryFilter} theme={theme} />

      <div className="space-y-3">
        {filtered.map(notice => (
          <div key={notice.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden`}>
            <button
              onClick={() => setExpandedId(expandedId === notice.id ? null : notice.id)}
              className={`w-full p-4 flex items-center justify-between text-left ${theme.buttonHover} transition-all`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={`w-10 h-10 rounded-xl ${notice.isNew ? 'bg-red-500' : 'bg-indigo-500'} flex items-center justify-center text-white shrink-0`}>
                  {notice.isNew ? <Bell size={16} /> : <Megaphone size={16} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${categoryColors[notice.category]}`}>{notice.category}</span>
                    {notice.isNew && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-500 text-white font-bold">NEW</span>}
                  </div>
                  <p className={`text-sm font-bold ${theme.highlight} truncate`}>{notice.title}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{notice.date}</p>
                </div>
              </div>
              {expandedId === notice.id ? (
                <ChevronUp size={16} className={theme.iconColor} />
              ) : (
                <ChevronDown size={16} className={theme.iconColor} />
              )}
            </button>
            {expandedId === notice.id && (
              <div className={`px-4 pb-4 pt-0 border-t ${theme.border}`}>
                <p className={`text-xs ${theme.highlight} leading-relaxed mt-3`}>{notice.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── EXPORT ─────────────────────────────────────────
export default function Page() {
  return (
    <BlueprintLayout>
      <StudentDashboard />
    </BlueprintLayout>
  );
}
