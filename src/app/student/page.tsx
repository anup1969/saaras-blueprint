'use client';

import React, { useState } from 'react';
import BlueprintLayout from '@/components/BlueprintLayout';
import { StatCard, TabBar, StatusBadge, SearchBar, DataTable, MobileFrame, MobilePreviewToggle } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  Home, Calendar, BookOpen, Award, ClipboardCheck, Banknote, BookMarked, Megaphone,
  Search, Bell, Clock, FileText, CheckCircle, XCircle, AlertTriangle,
  Download, ChevronDown, ChevronUp, Eye, Upload, Star, TrendingUp,
  BarChart3, Timer, Library, BookOpenCheck, IndianRupee, Receipt, CreditCard,
  GraduationCap, User, ArrowRight, MessageSquare,
  PanelLeftClose, PanelLeftOpen, Headphones,
  CalendarOff, FileBadge, LayoutGrid, X, Send, Copy,
  FolderOpen, Trophy, Medal, Plus, Pencil, Trash2, Shield,
  FileCheck, Info, Smartphone, Play, ChevronLeft,
  Camera, Share2, QrCode, Fingerprint, Wifi, MapPin,
  Heart, Flame, Brain, Smile, Frown, Meh, ThumbsUp, ThumbsDown,
  Target, Zap, Lock, Unlock, Sparkles, NotebookPen,
} from 'lucide-react';
import StakeholderProfile from '@/components/StakeholderProfile';
import TaskTrackerPanel from '@/components/TaskTrackerPanel';
import { ChatsView } from '@/components/ChatModule';
import SupportModule from '@/components/SupportModule';
import YourInputsModule from '@/components/YourInputsModule';
import { type TeamMember } from '@/lib/auth';

// ─── STUDENT PROFILE ────────────────────────────────
const studentProfile = {
  name: 'Aarav Patel',
  class: '10-A',
  rollNo: 1,
  board: 'CBSE',
  admissionNo: 'SAR-2022-0101',
  house: 'Red House',
  section: 'A',
  dob: '15 Mar 2011',
  bloodGroup: 'B+',
  fatherName: 'Rajesh Patel',
  motherName: 'Sunita Patel',
  contact: '+91 98765 43210',
};

// ─── MOCK: TODAY'S CLASSES ──────────────────────────
const todaysClasses = [
  { period: 1, time: '7:50 - 8:30', subject: 'Mathematics', teacher: 'Mr. Sharma', room: 'Room 201' },
  { period: 2, time: '8:30 - 9:10', subject: 'Science', teacher: 'Mrs. Iyer', room: 'Lab 3' },
  { period: 3, time: '9:10 - 9:50', subject: 'English', teacher: 'Ms. D\'Souza', room: 'Room 201' },
  { period: 4, time: '10:05 - 10:45', subject: 'Hindi', teacher: 'Mrs. Mishra', room: 'Room 201' },
  { period: 5, time: '10:45 - 11:25', subject: 'Social Science', teacher: 'Mr. Reddy', room: 'Room 201' },
  { period: 6, time: '12:00 - 12:40', subject: 'Computer Science', teacher: 'Mr. Joshi', room: 'Comp Lab 1' },
  { period: 7, time: '12:40 - 1:20', subject: 'Physical Education', teacher: 'Mr. Singh', room: 'Ground' },
  { period: 8, time: '1:20 - 2:00', subject: 'Art', teacher: 'Mrs. Kulkarni', room: 'Art Room' },
];

// ─── MOCK: TIMETABLE ────────────────────────────────
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const periods = ['P1\n7:50', 'P2\n8:30', 'P3\n9:10', 'P4\n10:05', 'P5\n10:45', 'P6\n12:00', 'P7\n12:40', 'P8\n1:20'];

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
  Saturday:  ['English', 'Maths', 'Science', 'GK', '', '', '', ''],
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
const examTypes = ['Unit Test 1', 'Unit Test 2', 'Half Yearly', 'Unit Test 3', 'Annual'];

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
  { head: 'Admission Fee', amount: 5000, frequency: 'Annual' },
  { head: 'Annual Charges', amount: 8000, frequency: 'Annual' },
  { head: 'Transport Fee', amount: 1500, frequency: 'Monthly' },
  { head: 'Activity Fee', amount: 300, frequency: 'Monthly' },
  { head: 'Lab Fee', amount: 500, frequency: 'Monthly' },
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

// ─── MOCK: LEAVE RECORDS ──────────────────────────
const leaveRecords = [
  { id: 1, type: 'Sick Leave', from: '15 Jan 2026', to: '16 Jan 2026', reason: 'Fever and cold', status: 'Approved', appliedOn: '14 Jan 2026' },
  { id: 2, type: 'Family Emergency', from: '28 Nov 2025', to: '29 Nov 2025', reason: 'Family function — grandmother\'s birthday', status: 'Approved', appliedOn: '25 Nov 2025' },
  { id: 3, type: 'Casual Leave', from: '18 Feb 2026', to: '18 Feb 2026', reason: 'Personal work — passport appointment', status: 'Pending', appliedOn: '12 Feb 2026' },
  { id: 4, type: 'Sick Leave', from: '05 Oct 2025', to: '07 Oct 2025', reason: 'Stomach infection', status: 'Rejected', appliedOn: '04 Oct 2025' },
];

const leaveBalance = { total: 12, used: 4, remaining: 8 };

// ─── MOCK: CERTIFICATES & DOCUMENTS ──────────────
const certificatesList = [
  { id: 1, name: 'Bonafide Certificate', status: 'Ready to Download', action: 'download' },
  { id: 2, name: 'Character Certificate', status: 'Ready to Download', action: 'download' },
  { id: 3, name: 'Transfer Certificate', status: 'Not Requested', action: 'request-tc' },
  { id: 4, name: 'Duplicate Marksheet', status: 'Not Available', action: 'request' },
  { id: 5, name: 'Student ID Card', status: 'Ready', action: 'download' },
];

const recentDocRequests = [
  { certificate: 'Bonafide Certificate', requestedOn: '20 Jan 2026', status: 'Completed', remarks: 'Collected from office' },
  { certificate: 'Character Certificate', requestedOn: '25 Jan 2026', status: 'Completed', remarks: 'Ready for collection' },
  { certificate: 'Transfer Certificate', requestedOn: '10 Feb 2026', status: 'Processing', remarks: 'Under principal review' },
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
  { id: 'leave', label: 'Leave', icon: CalendarOff },
  { id: 'documents', label: 'Documents', icon: FileBadge },
  { id: 'notices', label: 'Notices', icon: Megaphone },
  { id: 'portfolio', label: 'Portfolio', icon: FolderOpen },
  { id: 'my-exams', label: 'My Exams', icon: FileCheck },
  { id: 'electives', label: 'Electives', icon: BookMarked },
  { id: 'achievements', label: 'Achievements', icon: Trophy },
  { id: 'study-planner', label: 'Study Planner', icon: Calendar },
  { id: 'wellness', label: 'Wellness', icon: Heart },
  { id: 'communication', label: 'Communication', icon: MessageSquare },
  { id: 'your-inputs', label: 'Your Inputs', icon: ClipboardCheck },
  { id: 'support', label: 'Support', icon: Headphones },
];

// ─── MAIN COMPONENT ────────────────────────────────
function StudentDashboard({ theme, themeIdx, onThemeChange, currentUser }: { theme?: Theme; themeIdx?: number; onThemeChange?: (idx: number) => void; currentUser?: TeamMember }) {
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
        {activeModule === 'dashboard' && <DashboardHome theme={theme} onProfileClick={() => setActiveModule('profile')} onNavigate={setActiveModule} />}
        {activeModule === 'timetable' && <TimetableModule theme={theme} />}
        {activeModule === 'homework' && <HomeworkModule theme={theme} />}
        {activeModule === 'results' && <ResultsModule theme={theme} />}
        {activeModule === 'attendance' && <AttendanceModule theme={theme} />}
        {activeModule === 'fees' && <FeesModule theme={theme} />}
        {activeModule === 'library' && <LibraryModule theme={theme} />}
        {activeModule === 'leave' && <LeaveModule theme={theme} />}
        {activeModule === 'documents' && <DocumentsModule theme={theme} />}
        {activeModule === 'notices' && <NoticesModule theme={theme} />}
        {activeModule === 'my-exams' && <MyExamsModule theme={theme} />}
        {activeModule === 'portfolio' && <PortfolioModule theme={theme} />}
        {activeModule === 'electives' && <ElectivesModule theme={theme} />}
        {activeModule === 'achievements' && <AchievementsModule theme={theme} />}
        {activeModule === 'study-planner' && <StudyPlannerModule theme={theme} />}
        {activeModule === 'wellness' && <WellnessModule theme={theme} />}
        {activeModule === 'communication' && <CommunicationModule theme={theme} />}
        {activeModule === 'your-inputs' && <YourInputsModule theme={theme} userName={currentUser?.name || ''} />}
        {activeModule === 'support' && <SupportModule theme={theme} role="student" />}
        {activeModule === 'profile' && <StakeholderProfile role="student" theme={theme} onClose={() => setActiveModule('dashboard')} themeIdx={themeIdx} onThemeChange={onThemeChange} />}
      </div>
    </div>
  );
}

// ─── DASHBOARD HOME ─────────────────────────────────
function DashboardHome({ theme, onProfileClick, onNavigate }: { theme: Theme; onProfileClick: () => void; onNavigate?: (id: string) => void }) {
  const [showCustomize, setShowCustomize] = useState(false);
  const [widgetConfig, setWidgetConfig] = useState<Record<string, boolean>>({
    'Attendance': true, 'Timetable': true, 'Homework': true, 'Fee Status': true,
    'Results': true, 'Notices': true, 'Events Calendar': false, 'Library Books': false,
  });

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
        <button onClick={() => setShowCustomize(true)} title="Customize Dashboard" className={`w-9 h-9 rounded-full ${theme.secondaryBg} ${theme.iconColor} flex items-center justify-center ${theme.buttonHover} transition-all`}>
          <LayoutGrid size={16} />
        </button>
        <button onClick={onProfileClick} title="My Profile" className={`w-9 h-9 rounded-full ${theme.primary} text-white flex items-center justify-center text-xs font-bold hover:opacity-90 transition-opacity`}>AM</button>
      </div>

      {/* Mobile App Preview */}
      <MobilePreviewToggle theme={theme} mobileContent={
        <MobileFrame title="Student Home" theme={theme}>
          <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white text-[11px] font-bold">AP</div>
                <div>
                  <p className="text-[11px] font-bold text-gray-800">Hi, Aarav!</p>
                  <p className="text-[8px] text-gray-500">Class 10-A | Roll No. 1</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="relative">
                  <Bell size={16} className="text-gray-600" />
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 text-white text-[7px] font-bold flex items-center justify-center">3</span>
                </div>
                <Fingerprint size={16} className="text-emerald-500" />
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-2.5 mb-2">
              <p className="text-[9px] font-bold text-blue-700 mb-1">Today &mdash; Thu, 12 Feb 2026</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-gray-800">Next: English &mdash; P3</p>
                  <p className="text-[8px] text-gray-500">Ms. D&apos;Souza | Room 201 | 9:10 AM</p>
                </div>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-200 text-blue-800 font-bold">In 12 min</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-amber-50 rounded-lg p-2">
                <p className="text-[8px] text-amber-600 font-bold">Homework Due</p>
                <p className="text-[12px] font-bold text-amber-700">2 pending</p>
                <p className="text-[7px] text-amber-500">Due tomorrow</p>
              </div>
              <div className="bg-emerald-50 rounded-lg p-2">
                <p className="text-[8px] text-emerald-600 font-bold">Attendance</p>
                <p className="text-[12px] font-bold text-emerald-700">93.2%</p>
                <p className="text-[7px] text-emerald-500">Present today</p>
              </div>
            </div>
          </div>
          {/* Quick Action Grid */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: 'Timetable', icon: Calendar, color: 'bg-blue-500' },
              { label: 'Homework', icon: BookOpen, color: 'bg-amber-500' },
              { label: 'Results', icon: Award, color: 'bg-emerald-500' },
              { label: 'Exams', icon: FileCheck, color: 'bg-purple-500' },
            ].map((action, i) => (
              <button key={i} className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-white border border-gray-200 shadow-sm">
                <div className={`w-9 h-9 rounded-xl ${action.color} flex items-center justify-center text-white`}>
                  <action.icon size={16} />
                </div>
                <span className="text-[8px] font-bold text-gray-700">{action.label}</span>
              </button>
            ))}
          </div>
          {/* Today Classes */}
          <div className="bg-white rounded-xl border border-gray-200 p-2.5 shadow-sm">
            <p className="text-[10px] font-bold text-gray-800 mb-1.5">Today&apos;s Classes</p>
            <div className="space-y-1">
              {[
                { p: 'P1', subj: 'Hindi', time: '7:50', done: true, current: false },
                { p: 'P2', subj: 'Science', time: '8:30', done: true, current: false },
                { p: 'P3', subj: 'English', time: '9:10', done: false, current: true },
                { p: 'P4', subj: 'Maths', time: '10:05', done: false, current: false },
              ].map((cls, i) => (
                <div key={i} className={`flex items-center gap-2 px-2 py-1.5 rounded-lg ${cls.current ? 'bg-blue-50 border border-blue-200' : cls.done ? 'bg-gray-50 opacity-60' : ''}`}>
                  <span className={`text-[8px] font-bold w-5 ${cls.done ? 'text-gray-400' : 'text-gray-700'}`}>{cls.p}</span>
                  <span className={`text-[9px] font-bold flex-1 ${cls.done ? 'text-gray-400' : 'text-gray-800'}`}>{cls.subj}</span>
                  <span className="text-[8px] text-gray-400">{cls.time}</span>
                  {cls.done && <CheckCircle size={9} className="text-emerald-500" />}
                  {cls.current && <span className="text-[7px] px-1 py-0.5 rounded bg-blue-500 text-white font-bold">NOW</span>}
                </div>
              ))}
              <p className="text-[8px] text-gray-400 text-center">+ 4 more periods</p>
            </div>
          </div>
          {/* Recent Notice */}
          <div className="bg-white rounded-xl border border-gray-200 p-2.5 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-red-500 flex items-center justify-center text-white"><Bell size={10} /></div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] font-bold text-gray-800 truncate">Annual Day Celebration 2026</p>
                <p className="text-[8px] text-gray-500">12 Feb 2026 | Event</p>
              </div>
              <span className="text-[7px] px-1 py-0.5 rounded bg-red-100 text-red-600 font-bold">NEW</span>
            </div>
          </div>
        </MobileFrame>
      } />

      {/* Widget Customization Modal */}
      {showCustomize && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowCustomize(false)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 w-full max-w-md shadow-xl`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-bold ${theme.highlight}`}>Customize Dashboard Widgets</h3>
              <button onClick={() => setShowCustomize(false)} className={`p-1.5 rounded-lg ${theme.buttonHover} ${theme.iconColor}`}><X size={16} /></button>
            </div>
            <p className={`text-xs ${theme.iconColor} mb-4`}>Select which widgets to display on your dashboard home.</p>
            <div className="space-y-2.5">
              {Object.entries(widgetConfig).map(([name, checked]) => (
                <label key={name} className={`flex items-center gap-3 p-2.5 rounded-xl ${theme.accentBg} cursor-pointer ${theme.buttonHover} transition-all`}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => setWidgetConfig(prev => ({ ...prev, [name]: !prev[name] }))}
                    className="w-4 h-4 rounded accent-blue-600"
                  />
                  <span className={`text-xs font-bold ${theme.highlight}`}>{name}</span>
                </label>
              ))}
            </div>
            <button
              onClick={() => { window.alert('Dashboard layout saved! (Blueprint demo)'); setShowCustomize(false); }}
              className={`w-full mt-5 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}
            >
              <CheckCircle size={14} /> Save Layout
            </button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={ClipboardCheck} label="Today's Classes" value={8} color="bg-blue-500" sub="2 complete" theme={theme} onClick={() => onNavigate?.('timetable')} />
        <StatCard icon={BookOpen} label="Pending Homework" value={2} color="bg-amber-500" sub="due this week" theme={theme} onClick={() => onNavigate?.('homework')} />
        <StatCard icon={Award} label="Upcoming Exams" value="Pre-Board" color="bg-purple-500" sub="20 Feb 2026" theme={theme} onClick={() => onNavigate?.('my-exams')} />
        <StatCard icon={TrendingUp} label="Attendance" value="93.2%" color="bg-emerald-500" sub="this session" theme={theme} onClick={() => onNavigate?.('attendance')} />
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

      {/* Mobile App Preview */}
      <MobilePreviewToggle theme={theme} mobileContent={
        <MobileFrame title="Timetable" theme={theme}>
          <div className="bg-blue-50 rounded-xl border border-blue-200 p-2.5">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] font-bold text-blue-700">Now: Period 3</p>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-200 text-blue-800 font-bold">12 min left</span>
            </div>
            <p className="text-[11px] font-bold text-gray-800">English &mdash; Ms. D&apos;Souza</p>
            <p className="text-[10px] text-gray-600 font-medium">Room 201</p>
          </div>
          <div className="flex items-center gap-1 overflow-x-auto pb-1">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, i) => (
              <button key={d} className={`px-2.5 py-1.5 rounded-lg text-[9px] font-bold whitespace-nowrap ${i === 3 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{d}</button>
            ))}
          </div>
          <p className="text-center text-[8px] text-gray-400">&larr; Swipe &rarr;</p>
          <div className="space-y-1.5">
            {[
              { p: 1, time: '7:50 - 8:30', subj: 'Hindi', teacher: 'Mrs. Mishra', room: 'Room 201', done: true, current: false },
              { p: 2, time: '8:30 - 9:10', subj: 'Science', teacher: 'Mrs. Iyer', room: 'Lab 3', done: true, current: false },
              { p: 3, time: '9:10 - 9:50', subj: 'English', teacher: "Ms. D'Souza", room: 'Room 201', done: false, current: true },
              { p: 4, time: '10:05 - 10:45', subj: 'Maths', teacher: 'Mr. Sharma', room: 'Room 201', done: false, current: false },
              { p: 5, time: '10:45 - 11:25', subj: 'SST', teacher: 'Mr. Reddy', room: 'Room 201', done: false, current: false },
              { p: 6, time: '12:00 - 12:40', subj: 'CS', teacher: 'Mr. Joshi', room: 'Comp Lab 1', done: false, current: false },
              { p: 7, time: '12:40 - 1:20', subj: 'Music', teacher: 'Mrs. Kapoor', room: 'Music Room', done: false, current: false },
              { p: 8, time: '1:20 - 2:00', subj: 'Moral Sc.', teacher: 'Mrs. Devi', room: 'Room 201', done: false, current: false },
            ].map((cls, i) => (
              <div key={i} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border ${cls.current ? 'bg-blue-50 border-blue-300 shadow-sm' : cls.done ? 'bg-gray-50 border-gray-200 opacity-60' : 'bg-white border-gray-200'}`}>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[9px] font-bold ${cls.current ? 'bg-blue-500 text-white' : cls.done ? 'bg-gray-300 text-white' : 'bg-gray-100 text-gray-600'}`}>P{cls.p}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-gray-800">{cls.subj}</span>
                    {cls.current && <span className="text-[8px] px-1 py-0.5 rounded bg-blue-500 text-white font-bold">NOW</span>}
                    {cls.done && <CheckCircle size={9} className="text-emerald-500" />}
                  </div>
                  <p className="text-[8px] text-gray-500">{cls.teacher}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[9px] font-bold text-gray-700">{cls.room}</p>
                  <p className="text-[8px] text-gray-400">{cls.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-3 pt-1">
            <span className="text-[8px] text-gray-400 flex items-center gap-0.5"><Clock size={7} /> Break 9:50</span>
            <span className="text-[8px] text-gray-400 flex items-center gap-0.5"><Clock size={7} /> Lunch 11:25</span>
            <span className="text-[8px] text-gray-400 flex items-center gap-0.5"><Clock size={7} /> Out 2:00</span>
          </div>
        </MobileFrame>
      } />

      <p className="text-[10px] text-amber-600 mb-1">📋 Bell schedule per SSA config · Saturday: Half-day</p>
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
            <span className={`text-xs ${theme.highlight} font-bold`}>Short Break: 9:50 - 10:05</span>
          </div>
          <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${theme.secondaryBg}`}>
            <Clock size={14} className={theme.iconColor} />
            <span className={`text-xs ${theme.highlight} font-bold`}>Lunch Break: 11:25 - 12:00</span>
          </div>
          <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${theme.secondaryBg}`}>
            <Clock size={14} className={theme.iconColor} />
            <span className={`text-xs ${theme.highlight} font-bold`}>Dismissal: 2:00 PM</span>
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

      {/* Mobile App Preview */}
      <MobilePreviewToggle theme={theme} mobileContent={
        <MobileFrame title="Homework" theme={theme}>
          <div className="bg-amber-50 rounded-xl border border-amber-200 p-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle size={14} className="text-amber-600" />
              <span className="text-[10px] font-bold text-amber-700">2 Pending Assignments</span>
            </div>
            <span className="text-[9px] text-amber-600">Due this week</span>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold">Pending</span>
              <span className="text-[9px] text-red-600 font-bold flex items-center gap-0.5"><Clock size={8} /> Due in 1 day</span>
            </div>
            <p className="text-[11px] font-bold text-gray-800 mb-0.5">Mathematics</p>
            <p className="text-[9px] text-gray-600 mb-2">Ch-12: Surface Areas &amp; Volumes &mdash; Ex 12.2</p>
            <p className="text-[8px] text-gray-400 mb-2">Assigned by Mr. Sharma | Due: 13 Feb 2026</p>
            <div className="flex items-center gap-2">
              <button className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl bg-blue-500 text-white text-[10px] font-bold"><Upload size={10} /> Submit</button>
              <button className="flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-[10px] font-bold"><Camera size={10} /> Photo</button>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold">Pending</span>
              <span className="text-[9px] text-amber-600 font-bold flex items-center gap-0.5"><Clock size={8} /> Due in 3 days</span>
            </div>
            <p className="text-[11px] font-bold text-gray-800 mb-0.5">Science</p>
            <p className="text-[9px] text-gray-600 mb-2">Write experiment report on Magnetic Effects</p>
            <p className="text-[8px] text-gray-400 mb-2">Assigned by Mrs. Iyer | Due: 12 Feb 2026</p>
            <div className="flex items-center gap-2">
              <button className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl bg-blue-500 text-white text-[10px] font-bold"><Upload size={10} /> Submit</button>
              <button className="flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-[10px] font-bold"><Camera size={10} /> Photo</button>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-emerald-200 p-3 shadow-sm">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">Graded</span>
              <span className="text-[10px] font-bold text-emerald-700">18/20</span>
            </div>
            <p className="text-[11px] font-bold text-gray-800 mb-0.5">Hindi</p>
            <p className="text-[9px] text-gray-600">Complete Surdas ke Pad exercises</p>
            <button className="mt-2 w-full py-2 rounded-lg bg-gray-50 border border-gray-200 text-[9px] font-bold text-gray-700 flex items-center justify-center gap-1"><Eye size={9} /> View Feedback</button>
          </div>
          <div className="flex justify-center pt-1">
            <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-blue-600 text-white text-[10px] font-bold shadow-lg"><Camera size={12} /> Snap &amp; Submit</button>
          </div>
        </MobileFrame>
      } />

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

      {/* Mobile App Preview */}
      <MobilePreviewToggle theme={theme} mobileContent={
        <MobileFrame title="Attendance" theme={theme}>
          <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm flex items-center gap-3">
            <div className="relative w-16 h-16 shrink-0">
              <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
                <circle cx="18" cy="18" r="15" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                <circle cx="18" cy="18" r="15" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="87.8 94.2" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[12px] font-bold text-emerald-600">93.2%</span>
              </div>
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-800">Overall Attendance</p>
              <p className="text-[9px] text-gray-500">212 present / 228 working days</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">Good</span>
                <span className="text-[9px] text-gray-500">Min: 75% required</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] font-bold text-gray-800">February 2026</p>
              <p className="text-[9px] text-gray-500">&larr; Swipe &rarr;</p>
            </div>
            <div className="grid grid-cols-7 gap-0.5 mb-1">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                <div key={i} className="text-center text-[8px] font-bold text-gray-400 py-0.5">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-0.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={`e-${i}`} className="h-7" />
              ))}
              {Array.from({ length: 28 }).map((_, i) => {
                const day = i + 1;
                const status: Record<number, string> = { 1: 'H', 2: 'P', 3: 'P', 4: 'P', 5: 'P', 6: 'P', 7: 'P', 8: 'H', 9: 'P', 10: 'L', 11: 'P', 12: 'P' };
                const s = status[day];
                const dotColor = s === 'P' ? 'bg-emerald-500' : s === 'A' ? 'bg-red-500' : s === 'L' ? 'bg-amber-400' : s === 'H' ? 'bg-gray-300' : '';
                return (
                  <div key={day} className="h-7 flex flex-col items-center justify-center">
                    <span className={`text-[8px] ${day > 12 ? 'text-gray-300' : 'text-gray-700'} font-medium`}>{day}</span>
                    {dotColor && <div className={`w-1.5 h-1.5 rounded-full ${dotColor} mt-0.5`} />}
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-center gap-3 mt-2 pt-2 border-t border-gray-100">
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500" /><span className="text-[8px] text-gray-500">Present</span></div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500" /><span className="text-[8px] text-gray-500">Absent</span></div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-400" /><span className="text-[8px] text-gray-500">Late</span></div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-gray-300" /><span className="text-[8px] text-gray-500">Holiday</span></div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
            <p className="text-[10px] font-bold text-gray-800 mb-2">Month-wise Summary</p>
            <div className="space-y-1.5">
              {[
                { month: 'Feb 2026', pct: 90.0 },
                { month: 'Jan 2026', pct: 91.7 },
                { month: 'Dec 2025', pct: 94.4 },
              ].map((m, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-[9px] text-gray-600 w-14">{m.month}</span>
                  <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${m.pct >= 90 ? 'bg-emerald-500' : m.pct >= 75 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${m.pct}%` }} />
                  </div>
                  <span className="text-[9px] font-bold text-gray-700 w-10 text-right">{m.pct}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-3 flex items-center gap-2">
            <CheckCircle size={14} className="text-emerald-600" />
            <div>
              <p className="text-[10px] font-bold text-emerald-700">Today: Present</p>
              <p className="text-[8px] text-emerald-600">Marked at 7:48 AM</p>
            </div>
          </div>
        </MobileFrame>
      } />

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
      <p className="text-[10px] text-amber-600 mb-2">📋 Fee structure configured by SSA · Due date: 10th · Late fee: ₹50/day after 7-day grace · Max: ₹500</p>

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

// ─── LEAVE MODULE ──────────────────────────────────
function LeaveModule({ theme }: { theme: Theme }) {
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [leaveType, setLeaveType] = useState('Sick Leave');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  const [parentAck, setParentAck] = useState(false);

  const leaveStatusColors: Record<string, string> = {
    Approved: 'bg-emerald-100 text-emerald-700',
    Pending: 'bg-amber-100 text-amber-700',
    Rejected: 'bg-red-100 text-red-700',
  };

  const handleSubmitLeave = () => {
    if (!fromDate || !toDate || !reason) { window.alert('Please fill all required fields.'); return; }
    if (!parentAck) { window.alert('Please confirm parent/guardian acknowledgment.'); return; }
    window.alert('Leave application submitted for approval! (Blueprint demo)');
    setShowApplyForm(false);
    setLeaveType('Sick Leave'); setFromDate(''); setToDate(''); setReason(''); setParentAck(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Leave Management</h1>
        <button onClick={() => setShowApplyForm(true)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}>
          <Send size={12} /> Apply Leave
        </button>
      </div>

      {/* Leave Balance */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard icon={CalendarOff} label="Total Allowed" value={leaveBalance.total} color="bg-blue-500" theme={theme} />
        <StatCard icon={XCircle} label="Used" value={leaveBalance.used} color="bg-amber-500" theme={theme} />
        <StatCard icon={CheckCircle} label="Remaining" value={leaveBalance.remaining} color="bg-emerald-500" theme={theme} />
      </div>

      {/* Apply Leave Modal */}
      {showApplyForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowApplyForm(false)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 w-full max-w-lg shadow-xl`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-bold ${theme.highlight}`}>Apply for Leave</h3>
              <button onClick={() => setShowApplyForm(false)} className={`p-1.5 rounded-lg ${theme.buttonHover} ${theme.iconColor}`}><X size={16} /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Leave Type</label>
                <select value={leaveType} onChange={e => setLeaveType(e.target.value)} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                  <option>Sick Leave</option>
                  <option>Casual Leave</option>
                  <option>Family Emergency</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>From Date</label>
                  <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`} />
                </div>
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>To Date</label>
                  <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`} />
                </div>
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Reason</label>
                <textarea value={reason} onChange={e => setReason(e.target.value)} rows={3} placeholder="Explain your reason for leave..." className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} resize-none`} />
              </div>
              <label className={`flex items-center gap-2.5 p-3 rounded-xl ${theme.accentBg} cursor-pointer`}>
                <input type="checkbox" checked={parentAck} onChange={() => setParentAck(!parentAck)} className="w-4 h-4 rounded accent-blue-600" />
                <span className={`text-xs ${theme.highlight}`}>My parent/guardian is aware of this leave</span>
              </label>
              <button onClick={handleSubmitLeave} className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}>
                <Send size={14} /> Submit Leave Application
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Leave History */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Leave History</h3>
        <DataTable
          headers={['Type', 'Date Range', 'Reason', 'Status', 'Applied On']}
          rows={leaveRecords.map(lr => [
            <span key="type" className={`text-xs font-bold ${theme.highlight}`}>{lr.type}</span>,
            <span key="range" className={`text-xs ${theme.iconColor}`}>{lr.from} — {lr.to}</span>,
            <span key="reason" className={`text-xs ${theme.iconColor}`}>{lr.reason}</span>,
            <span key="status" className={`text-xs px-2 py-0.5 rounded-full font-bold ${leaveStatusColors[lr.status]}`}>{lr.status}</span>,
            <span key="applied" className={`text-xs ${theme.iconColor}`}>{lr.appliedOn}</span>,
          ])}
          theme={theme}
        />
      </div>
    </div>
  );
}

// ─── DOCUMENTS MODULE ──────────────────────────────
function DocumentsModule({ theme }: { theme: Theme }) {
  const [activeTab, setActiveTab] = useState('Certificates');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [docType, setDocType] = useState('Bonafide');
  const [purpose, setPurpose] = useState('Higher Studies');
  const [copies, setCopies] = useState(1);
  const [urgency, setUrgency] = useState('Normal');
  const [notes, setNotes] = useState('');

  const certStatusColors: Record<string, string> = {
    'Ready to Download': 'bg-emerald-100 text-emerald-700',
    'Ready': 'bg-emerald-100 text-emerald-700',
    'Not Requested': 'bg-slate-100 text-slate-600',
    'Not Available': 'bg-red-100 text-red-700',
    'Processing': 'bg-amber-100 text-amber-700',
    'Completed': 'bg-emerald-100 text-emerald-700',
    'Requested': 'bg-blue-100 text-blue-700',
  };

  const handleCertAction = (cert: typeof certificatesList[0]) => {
    if (cert.action === 'download') {
      window.alert(`${cert.name} downloaded! (Blueprint demo)`);
    } else {
      window.alert('Request submitted! Admin will process within 3-5 working days. (Blueprint demo)');
    }
  };

  const handleSubmitRequest = () => {
    window.alert('Document request submitted! Admin will process your request. (Blueprint demo)');
    setShowRequestForm(false);
    setDocType('Bonafide'); setPurpose('Higher Studies'); setCopies(1); setUrgency('Normal'); setNotes('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Certificates & Documents</h1>
        <button onClick={() => setShowRequestForm(true)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}>
          <FileText size={12} /> Request Document
        </button>
      </div>

      <TabBar tabs={['Certificates', 'Recent Requests']} active={activeTab} onChange={setActiveTab} theme={theme} />

      {/* Request Document Modal */}
      {showRequestForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowRequestForm(false)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 w-full max-w-lg shadow-xl`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-bold ${theme.highlight}`}>Request Document</h3>
              <button onClick={() => setShowRequestForm(false)} className={`p-1.5 rounded-lg ${theme.buttonHover} ${theme.iconColor}`}><X size={16} /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Document Type</label>
                <select value={docType} onChange={e => setDocType(e.target.value)} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                  <option>Bonafide</option>
                  <option>Transfer Certificate</option>
                  <option>Marksheet</option>
                  <option>Character Certificate</option>
                  <option>Custom</option>
                </select>
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Purpose</label>
                <select value={purpose} onChange={e => setPurpose(e.target.value)} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                  <option>Higher Studies</option>
                  <option>Bank</option>
                  <option>Passport</option>
                  <option>Scholarship</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Number of Copies</label>
                  <select value={copies} onChange={e => setCopies(Number(e.target.value))} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                    {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Urgency</label>
                  <select value={urgency} onChange={e => setUrgency(e.target.value)} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                    <option>Normal (5 days)</option>
                    <option>Urgent (2 days)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Additional Notes</label>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2} placeholder="Any special instructions..." className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} resize-none`} />
              </div>
              <button onClick={handleSubmitRequest} className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}>
                <Send size={14} /> Submit Request
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Certificates' && (
        <div className="space-y-3">
          {certificatesList.map(cert => (
            <div key={cert.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${cert.action === 'download' ? 'bg-emerald-500' : 'bg-slate-400'} flex items-center justify-center text-white`}>
                  <FileBadge size={16} />
                </div>
                <div>
                  <p className={`text-sm font-bold ${theme.highlight}`}>{cert.name}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${certStatusColors[cert.status]}`}>{cert.status}</span>
                </div>
              </div>
              <button
                onClick={() => handleCertAction(cert)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${
                  cert.action === 'download'
                    ? `${theme.primary} text-white`
                    : `${theme.secondaryBg} ${theme.highlight} ${theme.buttonHover}`
                }`}
              >
                {cert.action === 'download' ? <><Download size={12} /> Download</> :
                 cert.action === 'request-tc' ? <><FileText size={12} /> Request TC</> :
                 <><FileText size={12} /> Request</>}
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'Recent Requests' && (
        <DataTable
          headers={['Certificate', 'Requested On', 'Status', 'Remarks']}
          rows={recentDocRequests.map((r, i) => [
            <span key="cert" className={`text-xs font-bold ${theme.highlight}`}>{r.certificate}</span>,
            <span key="date" className={`text-xs ${theme.iconColor}`}>{r.requestedOn}</span>,
            <span key="status" className={`text-xs px-2 py-0.5 rounded-full font-bold ${certStatusColors[r.status]}`}>{r.status}</span>,
            <span key="rem" className={`text-xs ${theme.iconColor}`}>{r.remarks}</span>,
          ])}
          theme={theme}
        />
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

// ─── PORTFOLIO MODULE ─────────────────────────────────
function PortfolioModule({ theme }: { theme: Theme }) {
  const portfolioItems = [
    { title: 'Science Fair Project — Solar Water Purifier', type: 'Project', date: 'Nov 2025', endorsement: 'Excellent innovation! — Mrs. Iyer', thumbnail: 'bg-emerald-500', skills: ['Critical Thinking', 'Creativity', 'Problem Solving'] },
    { title: 'Art Competition Winner — Landscape Painting', type: 'Artwork', date: 'Oct 2025', endorsement: 'Beautiful composition! — Mrs. Kulkarni', thumbnail: 'bg-pink-500', skills: ['Creativity', 'Communication'] },
    { title: 'Basketball Tournament — District MVP', type: 'Certificate', date: 'Sep 2025', endorsement: 'Outstanding performance! — Mr. Singh', thumbnail: 'bg-amber-500', skills: ['Leadership', 'Collaboration'] },
    { title: 'Coding Workshop — Python Web Scraping', type: 'Certificate', date: 'Aug 2025', endorsement: 'Great learning spirit! — Mr. Joshi', thumbnail: 'bg-indigo-500', skills: ['Critical Thinking', 'Problem Solving'] },
    { title: 'Essay Competition — Digital India', type: 'Project', date: 'Jul 2025', endorsement: 'Well-articulated thoughts — Ms. D\'Souza', thumbnail: 'bg-purple-500', skills: ['Communication', 'Critical Thinking', 'Creativity'] },
    { title: 'Community Service — Tree Plantation Drive', type: 'Certificate', date: 'Jun 2025', endorsement: 'Wonderful initiative! — Mr. Reddy', thumbnail: 'bg-teal-500', skills: ['Collaboration', 'Leadership'] },
  ];

  const typeBadgeColors: Record<string, string> = {
    Artwork: 'bg-pink-100 text-pink-700',
    Project: 'bg-blue-100 text-blue-700',
    Certificate: 'bg-emerald-100 text-emerald-700',
    Video: 'bg-purple-100 text-purple-700',
  };

  const skillColors: Record<string, string> = {
    'Critical Thinking': 'bg-blue-100 text-blue-700',
    'Creativity': 'bg-pink-100 text-pink-700',
    'Collaboration': 'bg-emerald-100 text-emerald-700',
    'Communication': 'bg-purple-100 text-purple-700',
    'Problem Solving': 'bg-amber-100 text-amber-700',
    'Leadership': 'bg-indigo-100 text-indigo-700',
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>My Portfolio</h1>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2.5 py-1 rounded-lg ${theme.secondaryBg} ${theme.iconColor} font-bold`}>{portfolioItems.length} items</span>
          <button onClick={() => alert('Add New Portfolio Item (Blueprint demo)')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}>
            <Plus size={12} /> Add New Item
          </button>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {portfolioItems.map((item, i) => (
          <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden hover:shadow-md transition-all`}>
            <div className={`h-24 ${item.thumbnail} flex items-center justify-center text-white relative`}>
              <FolderOpen size={28} />
              {/* Edit / Delete buttons */}
              <div className="absolute top-2 right-2 flex gap-1">
                <button onClick={() => alert(`Edit "${item.title}" (Blueprint demo)`)} className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-all" title="Edit">
                  <Pencil size={12} className="text-white" />
                </button>
                <button onClick={() => alert(`Delete "${item.title}" (Blueprint demo)`)} className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-red-500/60 transition-all" title="Delete">
                  <Trash2 size={12} className="text-white" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${typeBadgeColors[item.type] || 'bg-slate-100 text-slate-600'}`}>{item.type}</span>
                <span className={`text-[10px] ${theme.iconColor}`}>{item.date}</span>
              </div>
              <p className={`text-xs font-bold ${theme.highlight} mb-2`}>{item.title}</p>
              <div className={`flex items-start gap-1.5 p-2 rounded-lg ${theme.accentBg} mb-2`}>
                <Star size={10} className="text-amber-500 mt-0.5 shrink-0" />
                <p className={`text-[10px] ${theme.iconColor} italic`}>{item.endorsement}</p>
              </div>
              {/* Skill Tags */}
              <div className="flex flex-wrap gap-1">
                {item.skills.map(skill => (
                  <span key={skill} className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${skillColors[skill] || 'bg-slate-100 text-slate-600'}`}>{skill}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Self-Reflection Section */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>My Reflection</h3>
        <textarea
          placeholder="Write your self-reflection here... What did you learn this month? What are your goals?"
          rows={4}
          defaultValue="This month I worked really hard on my science project about solar water purification. I learned about renewable energy and how simple technology can solve real-world problems. My goal for next month is to prepare well for pre-boards and also practice basketball regularly for the state tournament."
          className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} resize-none`}
        />
        <p className={`text-[10px] ${theme.iconColor} mt-1`}>Last entry: Feb 20, 2026</p>
      </div>

      {/* NEP Skills Section */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>NEP 2020 — Skill Assessment</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { skill: 'Cognitive', level: 3, maxLevel: 4 },
            { skill: 'Social', level: 2, maxLevel: 4 },
            { skill: 'Creative', level: 4, maxLevel: 4 },
            { skill: 'Physical', level: 2, maxLevel: 4 },
          ].map(s => (
            <div key={s.skill} className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
              <p className={`text-xs font-bold ${theme.highlight} mb-2`}>{s.skill}</p>
              <div className="flex justify-center gap-1">
                {Array.from({ length: s.maxLevel }).map((_, i) => (
                  <div key={i} className={`w-4 h-4 rounded-full ${i < s.level ? 'bg-blue-500' : theme.accentBg} border ${theme.border}`} />
                ))}
              </div>
              <p className={`text-[10px] ${theme.iconColor} mt-1`}>{s.level}/{s.maxLevel}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ACHIEVEMENTS MODULE ────────────────────────────
// ─── ELECTIVES MODULE ───────────────────────────────
function ElectivesModule({ theme }: { theme: Theme }) {
  const [showConfirm, setShowConfirm] = useState<string | null>(null);

  const availableElectives = [
    { id: 'E1', name: 'French (Foreign Language)', area: 'Language', teacher: 'Ms. Dubois', schedule: 'Mon & Wed, P7', seats: { available: 8, total: 30 }, status: 'Open' as const, prereq: '', desc: 'Basic French language — greetings, grammar, conversation.' },
    { id: 'E2', name: 'Artificial Intelligence', area: 'Computer Science', teacher: 'Mr. Joshi', schedule: 'Tue & Thu, P7', seats: { available: 3, total: 25 }, status: 'Open' as const, prereq: 'Computer Science', desc: 'Introduction to AI, ML concepts with Python.' },
    { id: 'E3', name: 'Hindustani Classical Music', area: 'Performing Arts', teacher: 'Pt. Shukla', schedule: 'Fri, P7-P8', seats: { available: 12, total: 20 }, status: 'Open' as const, prereq: '', desc: 'Learn ragas, taals, and vocal techniques in Indian classical music.' },
    { id: 'E4', name: 'Robotics & IoT Lab', area: 'STEM', teacher: 'Mr. Mehta', schedule: 'Wed & Fri, P7', seats: { available: 0, total: 20 }, status: 'Closed' as const, prereq: 'Science, CS', desc: 'Build robots and IoT projects with Arduino and Raspberry Pi.' },
    { id: 'E5', name: 'Creative Writing Workshop', area: 'Language', teacher: 'Ms. D\'Souza', schedule: 'Tue, P7-P8', seats: { available: 5, total: 20 }, status: 'Open' as const, prereq: '', desc: 'Short stories, poetry, screenwriting, and journaling.' },
  ];

  const enrolledElectives = [
    { id: 'E2', name: 'Artificial Intelligence', teacher: 'Mr. Joshi', schedule: 'Tue & Thu, P7', status: 'Enrolled' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Elective Selection</h1>
        <span className={`text-xs px-2.5 py-1 rounded-lg bg-blue-100 text-blue-700 font-bold`}>Selection Window: Feb 15 - Mar 1, 2026</span>
      </div>

      {/* Currently Enrolled */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Currently Enrolled Electives</h3>
        {enrolledElectives.length > 0 ? (
          <div className="space-y-2">
            {enrolledElectives.map(e => (
              <div key={e.id} className={`flex items-center gap-3 p-3 rounded-xl ${theme.secondaryBg} border ${theme.border}`}>
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white"><CheckCircle size={14} /></div>
                <div className="flex-1">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{e.name}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{e.teacher} | {e.schedule}</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">Enrolled</span>
                <button onClick={() => alert('Elective dropped (Blueprint demo)')} className="text-[10px] px-2 py-1 rounded-lg bg-red-100 text-red-600 font-bold">Drop</button>
              </div>
            ))}
          </div>
        ) : (
          <p className={`text-xs ${theme.iconColor}`}>No electives enrolled yet.</p>
        )}
      </div>

      {/* Available Electives */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Available Electives</h3>
        <div className="space-y-3">
          {availableElectives.map(el => (
            <div key={el.id} className={`p-4 rounded-xl ${theme.secondaryBg} border ${theme.border}`}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>{el.name}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{el.area} | {el.teacher} | {el.schedule}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${el.status === 'Open' ? 'bg-emerald-100 text-emerald-700' : el.status === 'Closed' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{el.status}</span>
                  {el.status === 'Open' ? (
                    <button onClick={() => setShowConfirm(el.id)} className={`text-[10px] px-3 py-1.5 rounded-lg ${theme.primary} text-white font-bold`}>Enroll</button>
                  ) : (
                    <button disabled className="text-[10px] px-3 py-1.5 rounded-lg bg-gray-200 text-gray-400 font-bold cursor-not-allowed">Full</button>
                  )}
                </div>
              </div>
              <p className={`text-[10px] ${theme.iconColor} mb-1`}>{el.desc}</p>
              <div className="flex items-center gap-3">
                <span className={`text-[10px] ${theme.iconColor}`}>Seats: <span className={`font-bold ${el.seats.available < 5 ? 'text-red-600' : 'text-emerald-600'}`}>{el.seats.available}</span>/{el.seats.total}</span>
                {el.prereq && <span className={`text-[10px] ${theme.iconColor}`}>Prereq: <span className="font-bold">{el.prereq}</span></span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enrollment Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowConfirm(null)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 w-full max-w-sm shadow-xl`} onClick={e => e.stopPropagation()}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-2`}>Confirm Enrollment</h3>
            <p className={`text-xs ${theme.iconColor} mb-4`}>Are you sure you want to enroll in <span className="font-bold">{availableElectives.find(e => e.id === showConfirm)?.name}</span>?</p>
            <div className="flex gap-2">
              <button onClick={() => { alert('Enrolled successfully! (Blueprint demo)'); setShowConfirm(null); }} className={`flex-1 text-xs py-2 rounded-xl ${theme.primary} text-white font-bold`}>Confirm</button>
              <button onClick={() => setShowConfirm(null)} className={`flex-1 text-xs py-2 rounded-xl ${theme.secondaryBg} ${theme.iconColor} font-bold`}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ACHIEVEMENTS MODULE ────────────────────────────
function AchievementsModule({ theme }: { theme: Theme }) {
  const achievements = [
    { title: 'Science Fair — 1st Prize (Solar Water Purifier)', level: 'School', date: 'Nov 2025', medal: 'Gold' as const },
    { title: 'Inter-School Cricket Tournament — MVP', level: 'District', date: 'Sep 2025', medal: 'Gold' as const },
    { title: 'Debate Competition — 2nd Place', level: 'State', date: 'Aug 2025', medal: 'Silver' as const },
    { title: 'Painting Competition — 3rd Place', level: 'School', date: 'Jul 2025', medal: 'Bronze' as const },
    { title: 'Republic Day Patriotic Speech — Winner', level: 'School', date: 'Jan 2026', medal: 'Gold' as const },
  ];

  const medalColors: Record<string, string> = {
    Gold: 'bg-amber-100 text-amber-700 border-amber-300',
    Silver: 'bg-slate-100 text-slate-600 border-slate-300',
    Bronze: 'bg-orange-100 text-orange-700 border-orange-300',
  };

  const medalIcons: Record<string, string> = {
    Gold: 'text-amber-500',
    Silver: 'text-slate-400',
    Bronze: 'text-orange-500',
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>My Achievements</h1>
        <span className={`text-xs px-2.5 py-1 rounded-lg ${theme.secondaryBg} ${theme.iconColor} font-bold`}>{achievements.length} achievements</span>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard icon={Trophy} label="Gold Medals" value={achievements.filter(a => a.medal === 'Gold').length} color="bg-amber-500" theme={theme} />
        <StatCard icon={Award} label="Silver Medals" value={achievements.filter(a => a.medal === 'Silver').length} color="bg-slate-400" theme={theme} />
        <StatCard icon={Award} label="Bronze Medals" value={achievements.filter(a => a.medal === 'Bronze').length} color="bg-orange-500" theme={theme} />
      </div>

      {/* Achievement List */}
      <div className="space-y-3">
        {achievements.map((ach, i) => (
          <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex items-center gap-4`}>
            <div className={`w-12 h-12 rounded-xl border-2 ${medalColors[ach.medal]} flex items-center justify-center`}>
              <Medal size={20} className={medalIcons[ach.medal]} />
            </div>
            <div className="flex-1">
              <p className={`text-sm font-bold ${theme.highlight}`}>{ach.title}</p>
              <p className={`text-[10px] ${theme.iconColor}`}>{ach.date} | {ach.level} Level</p>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full font-bold border ${medalColors[ach.medal]}`}>{ach.medal}</span>
          </div>
        ))}
      </div>

      {/* ── NCC / Scouts / NSS Activity Log ── */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 space-y-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-emerald-600" />
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Activity Log (NCC / Scouts / NSS)</h3>
          </div>
          <button onClick={() => alert('Log New Activity (Blueprint demo)')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}>
            <Plus size={12} /> Log New Activity
          </button>
        </div>

        <div className={`overflow-hidden rounded-xl border ${theme.border}`}>
          <table className="w-full text-xs">
            <thead>
              <tr className={theme.secondaryBg}>
                <th className={`p-2.5 text-left font-bold ${theme.iconColor} uppercase`}>Date</th>
                <th className={`p-2.5 text-left font-bold ${theme.iconColor} uppercase`}>Activity</th>
                <th className={`p-2.5 text-center font-bold ${theme.iconColor} uppercase`}>Program</th>
                <th className={`p-2.5 text-center font-bold ${theme.iconColor} uppercase`}>Hours</th>
                <th className={`p-2.5 text-left font-bold ${theme.iconColor} uppercase`}>Instructor</th>
                <th className={`p-2.5 text-center font-bold ${theme.iconColor} uppercase`}>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: '2026-02-22', activity: 'Republic Day Parade Rehearsal', program: 'NCC', hours: 3, instructor: 'Lt. Col. Rathore', status: 'Completed' },
                { date: '2026-02-15', activity: 'Community Clean-up Drive', program: 'NSS', hours: 4, instructor: 'Mr. Reddy', status: 'Completed' },
                { date: '2026-02-08', activity: 'First Aid Training Camp', program: 'Scouts', hours: 6, instructor: 'Mr. Singh', status: 'Completed' },
                { date: '2026-01-26', activity: 'Republic Day Flag Hoisting & Parade', program: 'NCC', hours: 4, instructor: 'Lt. Col. Rathore', status: 'Completed' },
                { date: '2026-01-18', activity: 'Tree Plantation at Village School', program: 'NSS', hours: 5, instructor: 'Mr. Reddy', status: 'Verified' },
              ].map((a, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className={`p-2.5 ${theme.iconColor}`}>{a.date}</td>
                  <td className={`p-2.5 font-bold ${theme.highlight}`}>{a.activity}</td>
                  <td className="p-2.5 text-center">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      a.program === 'NCC' ? 'bg-blue-100 text-blue-700' : a.program === 'Scouts' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>{a.program}</span>
                  </td>
                  <td className={`p-2.5 text-center font-bold ${theme.highlight}`}>{a.hours}h</td>
                  <td className={`p-2.5 ${theme.iconColor}`}>{a.instructor}</td>
                  <td className="p-2.5 text-center">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${a.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>{a.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Hours Summary */}
        <div className="flex gap-4">
          {[
            { program: 'NCC', hours: 7, color: 'bg-blue-500' },
            { program: 'Scouts', hours: 6, color: 'bg-amber-500' },
            { program: 'NSS', hours: 9, color: 'bg-emerald-500' },
          ].map(p => (
            <div key={p.program} className={`flex items-center gap-2 px-3 py-2 rounded-xl ${theme.secondaryBg}`}>
              <div className={`w-2.5 h-2.5 rounded-full ${p.color}`} />
              <span className={`text-[10px] font-bold ${theme.highlight}`}>{p.program}: {p.hours} hours</span>
            </div>
          ))}
          <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${theme.secondaryBg} border ${theme.border}`}>
            <span className={`text-[10px] font-bold ${theme.highlight}`}>Total: 22 hours</span>
          </div>
        </div>
      </div>

      {/* ── Gamification / XP System ── */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 space-y-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight}`}>Gamification &amp; Badges</h3>

        {/* Profile Card */}
        <div className={`${theme.secondaryBg} rounded-xl p-4 flex items-center gap-4`}>
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xl font-bold shadow">5</div>
          <div className="flex-1">
            <p className={`text-sm font-bold ${theme.highlight}`}>Scholar Level 5</p>
            <div className="flex items-center gap-2 mt-1">
              <div className={`flex-1 h-2.5 rounded-full ${theme.accentBg}`}>
                <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500" style={{ width: '72%' }} />
              </div>
              <span className={`text-[10px] font-bold ${theme.iconColor}`}>720/1000 XP</span>
            </div>
            <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>280 XP to Level 6 | Total Badges: 7/10</p>
          </div>
          <div className="flex items-center gap-1 text-amber-500">
            <Flame size={16} />
            <span className="text-sm font-bold">12</span>
            <span className={`text-[10px] ${theme.iconColor}`}>day streak</span>
          </div>
        </div>

        {/* Badges Grid */}
        <div>
          <p className={`text-xs font-bold ${theme.highlight} mb-2`}>Badges</p>
          <div className="grid grid-cols-5 gap-2">
            {[
              { name: 'First Homework', icon: '📝', earned: true, date: 'Apr 5, 2025', desc: 'Submit your first homework' },
              { name: 'Perfect Week', icon: '🌟', earned: true, date: 'Sep 15, 2025', desc: 'Full attendance for a week' },
              { name: 'Top Scorer', icon: '🏆', earned: true, date: 'Oct 22, 2025', desc: 'Score highest in any exam' },
              { name: 'Library Lover', icon: '📚', earned: true, date: 'Nov 10, 2025', desc: 'Issue 10+ books in a term' },
              { name: 'Sports Star', icon: '⚽', earned: true, date: 'Sep 25, 2025', desc: 'Win a sports competition' },
              { name: 'Helping Hand', icon: '🤝', earned: true, date: 'Dec 5, 2025', desc: 'Help classmates in studies' },
              { name: 'Science Whiz', icon: '🔬', earned: true, date: 'Nov 28, 2025', desc: 'Win Science Fair' },
              { name: 'Math Master', icon: '🧮', earned: false, date: '', desc: 'Score 95%+ in 3 math tests' },
              { name: 'Consistent', icon: '📈', earned: false, date: '', desc: 'Maintain 90%+ attendance all year' },
              { name: '30-Day Streak', icon: '🔥', earned: false, date: '', desc: '30 consecutive active days' },
            ].map((b, i) => (
              <div key={i} title={b.earned ? `Earned: ${b.date}` : `Keep going! — ${b.desc}`} className={`p-2.5 rounded-xl border ${theme.border} text-center ${b.earned ? theme.secondaryBg : 'opacity-40 grayscale'}`}>
                <div className="text-2xl mb-1">{b.icon}</div>
                <p className={`text-[9px] font-bold ${theme.highlight} leading-tight`}>{b.name}</p>
                <p className={`text-[8px] ${theme.iconColor} mt-0.5`}>{b.earned ? b.date : 'Keep going!'}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Streaks */}
        <div className="flex gap-3">
          <div className={`flex-1 ${theme.secondaryBg} rounded-xl p-3 text-center border ${theme.border}`}>
            <Flame size={20} className="text-amber-500 mx-auto mb-1" />
            <p className={`text-lg font-bold ${theme.highlight}`}>12</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Current Streak</p>
          </div>
          <div className={`flex-1 ${theme.secondaryBg} rounded-xl p-3 text-center border ${theme.border}`}>
            <Flame size={20} className="text-red-500 mx-auto mb-1" />
            <p className={`text-lg font-bold ${theme.highlight}`}>21</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Longest Streak</p>
          </div>
          <div className={`flex-1 ${theme.secondaryBg} rounded-xl p-3 text-center border ${theme.border}`}>
            <Zap size={20} className="text-blue-500 mx-auto mb-1" />
            <p className={`text-lg font-bold ${theme.highlight}`}>720</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Total XP</p>
          </div>
        </div>

        {/* Class Leaderboard */}
        <div>
          <p className={`text-xs font-bold ${theme.highlight} mb-2`}>Class Leaderboard — Top 10</p>
          <div className={`overflow-hidden rounded-xl border ${theme.border}`}>
            <table className="w-full text-xs">
              <thead>
                <tr className={theme.secondaryBg}>
                  <th className={`p-2 text-center font-bold ${theme.iconColor}`}>Rank</th>
                  <th className={`p-2 text-left font-bold ${theme.iconColor}`}>Student</th>
                  <th className={`p-2 text-center font-bold ${theme.iconColor}`}>Level</th>
                  <th className={`p-2 text-center font-bold ${theme.iconColor}`}>XP</th>
                  <th className={`p-2 text-center font-bold ${theme.iconColor}`}>Badges</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { rank: 1, name: 'Priya Nair', level: 7, xp: 1250, badges: 9 },
                  { rank: 2, name: 'Rohan Desai', level: 6, xp: 1100, badges: 8 },
                  { rank: 3, name: 'Aarav Patel (You)', level: 5, xp: 720, badges: 7 },
                  { rank: 4, name: 'Siya Mehta', level: 5, xp: 680, badges: 6 },
                  { rank: 5, name: 'Vivaan Shah', level: 4, xp: 520, badges: 5 },
                ].map((s, i) => (
                  <tr key={i} className={`border-t ${theme.border} ${s.rank === 3 ? 'bg-amber-50/50' : ''}`}>
                    <td className="p-2 text-center">
                      <span className={`w-5 h-5 inline-flex items-center justify-center rounded-full text-white text-[9px] font-bold ${s.rank <= 3 ? 'bg-amber-500' : 'bg-gray-300'}`}>{s.rank}</span>
                    </td>
                    <td className={`p-2 font-bold ${s.rank === 3 ? theme.primaryText : theme.highlight}`}>{s.name}</td>
                    <td className={`p-2 text-center font-bold ${theme.highlight}`}>{s.level}</td>
                    <td className={`p-2 text-center ${theme.iconColor}`}>{s.xp}</td>
                    <td className={`p-2 text-center ${theme.iconColor}`}>{s.badges}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <p className={`text-xs font-bold ${theme.highlight} mb-2`}>Recent Activity</p>
          <div className="space-y-1.5">
            {[
              { text: 'Earned "Science Whiz" badge', time: '2 days ago', xp: '+100 XP', icon: '🔬' },
              { text: 'Moved to Level 5', time: '5 days ago', xp: '', icon: '⬆️' },
              { text: '+50 XP for homework submission', time: '1 day ago', xp: '+50 XP', icon: '📝' },
              { text: 'Perfect attendance week bonus', time: '3 days ago', xp: '+30 XP', icon: '🌟' },
              { text: '12-day streak milestone', time: 'Today', xp: '+20 XP', icon: '🔥' },
            ].map((a, i) => (
              <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-lg ${theme.secondaryBg}`}>
                <span className="text-sm">{a.icon}</span>
                <span className={`text-[10px] flex-1 ${theme.highlight}`}>{a.text}</span>
                {a.xp && <span className="text-[10px] font-bold text-emerald-600">{a.xp}</span>}
                <span className={`text-[9px] ${theme.iconColor}`}>{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MY EXAMS MODULE ────────────────────────────────
function MyExamsModule({ theme }: { theme: Theme }) {
  const [examTab, setExamTab] = useState('Upcoming');
  const [showAdmitCard, setShowAdmitCard] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [expandedResult, setExpandedResult] = useState<number | null>(null);

  // Helper: Info tooltip icon
  const InfoTip = ({ tip }: { tip: string }) => (
    <span title={tip} className="inline-block ml-1 cursor-help"><Info size={14} className={theme.iconColor} /></span>
  );

  // Helper: Mobile badge
  const MobileBadge = () => (
    <span className="inline-flex items-center gap-0.5 ml-1.5 text-[9px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold">
      <Smartphone size={9} /> Mobile
    </span>
  );

  // Upcoming exams data
  const upcomingExams = [
    { id: 1, name: 'Term 2 - Mathematics', date: 'Mar 15, 2026', time: '10:00 AM', duration: '2 hours', marks: 80, hall: 'Hall A', countdown: 14, hasAdmitCard: true },
    { id: 2, name: 'Science Practical', date: 'Mar 18, 2026', time: '2:00 PM', duration: '1 hour', marks: 20, hall: 'Lab A', countdown: 17, hasAdmitCard: true },
    { id: 3, name: 'English Literature', date: 'Mar 20, 2026', time: '10:00 AM', duration: '3 hours', marks: 100, hall: 'Hall B', countdown: 19, hasAdmitCard: false },
  ];

  // Online tests data
  const onlineTests = [
    { id: 1, name: 'Math Chapter Test - Trigonometry', duration: '30 min', marks: 25 },
    { id: 2, name: 'Science Quiz - Chemical Reactions', duration: '15 min', marks: 10 },
  ];

  // Test questions data
  const testQuestions = [
    { q: 'What is the value of sin(30\u00b0)?', options: ['0', '1/2', '1', '\u221a3/2'], correct: 1 },
    { q: 'What is cos(60\u00b0)?', options: ['0', '1/2', '\u221a3/2', '1'], correct: 1 },
    { q: 'tan(45\u00b0) equals?', options: ['0', '1/\u221a2', '1', '\u221a3'], correct: 2 },
    { q: 'sin\u00b2\u03b8 + cos\u00b2\u03b8 = ?', options: ['0', '1', '2', 'sin2\u03b8'], correct: 1 },
    { q: 'What is sec(0\u00b0)?', options: ['0', '1', '\u221e', 'Undefined'], correct: 1 },
    { q: 'cot(90\u00b0) equals?', options: ['0', '1', '\u221e', 'Undefined'], correct: 0 },
    { q: 'What is the period of sin(x)?', options: ['\u03c0', '2\u03c0', '\u03c0/2', '3\u03c0'], correct: 1 },
    { q: 'cos(180\u00b0) = ?', options: ['0', '1', '-1', '\u221a2'], correct: 2 },
    { q: 'sin(90\u00b0) = ?', options: ['0', '1', '-1', '1/2'], correct: 1 },
    { q: 'tan(0\u00b0) = ?', options: ['0', '1', '\u221e', 'Undefined'], correct: 0 },
  ];

  // Results data
  const resultsDataExams = [
    { id: 1, name: 'Unit Test 2', subject: 'Mathematics', date: 'Jan 10, 2026', obtained: 22, max: 25, grade: 'A1', rank: 3, status: 'Pass', details: [
      { q: 'Q1: Solve for x: 2x+3=7', correct: true, yourAnswer: 'x=2', correctAnswer: 'x=2' },
      { q: 'Q2: Simplify: (a+b)\u00b2', correct: true, yourAnswer: 'a\u00b2+2ab+b\u00b2', correctAnswer: 'a\u00b2+2ab+b\u00b2' },
      { q: 'Q3: Value of \u221a144', correct: false, yourAnswer: '14', correctAnswer: '12' },
    ]},
    { id: 2, name: 'Unit Test 2', subject: 'Science', date: 'Jan 12, 2026', obtained: 20, max: 25, grade: 'A2', rank: 5, status: 'Pass', details: [
      { q: 'Q1: Define photosynthesis', correct: true, yourAnswer: 'Process by which plants make food using sunlight', correctAnswer: 'Process by which plants make food using sunlight' },
      { q: 'Q2: Chemical formula of water', correct: true, yourAnswer: 'H\u2082O', correctAnswer: 'H\u2082O' },
    ]},
    { id: 3, name: 'Unit Test 2', subject: 'English', date: 'Jan 14, 2026', obtained: 19, max: 25, grade: 'B1', rank: 8, status: 'Pass', details: [
      { q: 'Q1: Identify the noun', correct: true, yourAnswer: 'dog', correctAnswer: 'dog' },
      { q: 'Q2: Past tense of "go"', correct: false, yourAnswer: 'gone', correctAnswer: 'went' },
    ]},
    { id: 4, name: 'Unit Test 2', subject: 'Hindi', date: 'Jan 16, 2026', obtained: 17, max: 25, grade: 'B2', rank: 12, status: 'Pass', details: [] },
    { id: 5, name: 'Unit Test 2', subject: 'Computer Science', date: 'Jan 18, 2026', obtained: 24, max: 25, grade: 'A1', rank: 1, status: 'Pass', details: [] },
  ];

  // Practice tests data
  const practiceTests = [
    { id: 1, name: 'Math Practice - Algebra', questions: 20, attempts: 3, bestScore: 85 },
    { id: 2, name: 'Science Mock - Full Syllabus', questions: 30, attempts: 1, bestScore: 72 },
    { id: 3, name: 'English Grammar Practice', questions: 25, attempts: 2, bestScore: 90 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>My Exams</h1>
        <span className={`text-xs px-3 py-1.5 rounded-lg ${theme.secondaryBg} ${theme.iconColor} font-bold`}>
          Academic Year 2025-26
        </span>
      </div>

      {/* Mobile App Preview */}
      <MobilePreviewToggle theme={theme} mobileContent={
        <MobileFrame title="My Exams" theme={theme}>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold text-gray-800">Upcoming Exams</p>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold">3 exams</span>
            </div>
            {[
              { subject: 'Mathematics', date: 'Mon, 17 Feb', time: '9:00 AM', room: 'Hall A', days: 5 },
              { subject: 'Science', date: 'Wed, 19 Feb', time: '9:00 AM', room: 'Hall B', days: 7 },
              { subject: 'English', date: 'Fri, 21 Feb', time: '11:00 AM', room: 'Room 12', days: 9 },
            ].map((exam, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[11px] font-bold text-gray-800">{exam.subject}</p>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold">{exam.days}d left</span>
                </div>
                <div className="flex items-center gap-3 text-[9px] text-gray-500">
                  <span className="flex items-center gap-0.5"><Calendar size={8} /> {exam.date}</span>
                  <span className="flex items-center gap-0.5"><Clock size={8} /> {exam.time}</span>
                  <span className="flex items-center gap-0.5"><MapPin size={8} /> {exam.room}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-900 rounded-xl p-3 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] font-bold text-white">Online Test Mode</p>
              <div className="flex items-center gap-1">
                <Wifi size={8} className="text-emerald-400" />
                <span className="text-[8px] text-emerald-400">Connected</span>
              </div>
            </div>
            <div className="w-full h-1.5 bg-gray-700 rounded-full mb-3">
              <div className="h-full rounded-full bg-amber-400" style={{ width: '35%' }} />
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] text-gray-400">Q 7 of 20</span>
              <span className="text-[9px] text-amber-400 font-bold flex items-center gap-0.5"><Timer size={8} /> 18:24</span>
            </div>
            <div className="bg-gray-800 rounded-lg p-2.5 mb-2">
              <p className="text-[10px] text-white leading-relaxed">If sin(A) = 3/5, find cos(A) given A is acute.</p>
            </div>
            <div className="space-y-1.5">
              {['4/5', '3/4', '5/3', '2/5'].map((opt, i) => (
                <button key={i} className={`w-full text-left p-2 rounded-lg text-[10px] font-medium ${i === 0 ? 'bg-blue-600 text-white border border-blue-500' : 'bg-gray-800 text-gray-300 border border-gray-700'}`}>
                  <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>{opt}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-center mt-2">
              <p className="text-[8px] text-gray-500">&larr; Swipe for next question &rarr;</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-[11px] font-bold text-gray-800">Science — Unit Test 3</p>
                <p className="text-[9px] text-gray-500">5 Feb 2026</p>
              </div>
              <button className="flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-50 text-blue-600 text-[9px] font-bold"><Share2 size={8} /> Share</button>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative w-16 h-16 shrink-0">
                <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="66 94.2" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[12px] font-bold text-blue-600">70%</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-gray-500 w-12">Marks</span>
                  <span className="text-[10px] font-bold text-gray-800">35 / 50</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-gray-500 w-12">Grade</span>
                  <span className="text-[10px] font-bold text-blue-600">B+</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-gray-500 w-12">Rank</span>
                  <span className="text-[10px] font-bold text-gray-800">12 / 42</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <QrCode size={14} className="text-gray-600" />
              <p className="text-[11px] font-bold text-gray-800">Admit Card</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-2.5 flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <QrCode size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-800">Final Term Exam 2026</p>
                <p className="text-[9px] text-gray-600">Roll No: 2026-X-A-18</p>
                <p className="text-[9px] text-gray-600">Seat: Hall A — Row 3</p>
              </div>
            </div>
            <button className="mt-2 w-full py-2 rounded-lg bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center gap-1"><Download size={10} /> Download Admit Card</button>
          </div>
        </MobileFrame>
      } />

      <TabBar
        tabs={['Upcoming', 'Online Tests', 'My Results', 'Practice']}
        active={examTab}
        onChange={(t) => { setExamTab(t); setShowTest(false); }}
        theme={theme}
      />

      {/* ── TAB: Upcoming Exams ── */}
      {examTab === 'Upcoming' && !showAdmitCard && (
        <div className="space-y-4">
          <div className="flex items-center gap-1">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Upcoming Exams</h3>
            <InfoTip tip="Your upcoming exams with schedule, venue, and admit card download" />
            <MobileBadge />
          </div>
          <div className="space-y-3">
            {upcomingExams.map(exam => (
              <div key={exam.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500 flex items-center justify-center text-white">
                      <FileCheck size={20} />
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${theme.highlight}`}>{exam.name}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={`text-[10px] ${theme.iconColor}`}><Calendar size={10} className="inline mr-0.5" /> {exam.date}</span>
                        <span className={`text-[10px] ${theme.iconColor}`}><Clock size={10} className="inline mr-0.5" /> {exam.time}</span>
                        <span className={`text-[10px] ${theme.iconColor}`}><Timer size={10} className="inline mr-0.5" /> {exam.duration}</span>
                        <span className={`text-[10px] ${theme.iconColor}`}>{exam.marks} marks</span>
                        <span className={`text-[10px] ${theme.iconColor}`}>Venue: {exam.hall}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 font-bold">{exam.countdown} days</span>
                    {exam.hasAdmitCard && (
                      <button
                        onClick={() => setShowAdmitCard(true)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}
                      >
                        <Eye size={12} /> View Admit Card
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Admit Card View ── */}
      {examTab === 'Upcoming' && showAdmitCard && (
        <div className="space-y-4">
          <button onClick={() => setShowAdmitCard(false)} className={`flex items-center gap-1.5 text-xs font-bold ${theme.primaryText}`}>
            <ChevronLeft size={14} /> Back to Upcoming Exams
          </button>
          <div className="flex items-center gap-1">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Admit Card</h3>
            <InfoTip tip="Download your exam hall ticket" />
            <MobileBadge />
          </div>
          <div className={`${theme.cardBg} rounded-2xl border-2 ${theme.border} p-6 max-w-2xl mx-auto`}>
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-4 mb-4" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-indigo-500 flex items-center justify-center text-white text-lg font-bold">SRS</div>
                <div>
                  <p className={`text-lg font-bold ${theme.highlight}`}>Saaras International School</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>CBSE Affiliated | Affiliation No: 430XXX</p>
                </div>
              </div>
              <div className="w-16 h-20 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center">
                <User size={24} className="text-slate-300" />
              </div>
            </div>
            {/* Student Info */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div><span className={`text-[10px] ${theme.iconColor}`}>Student Name:</span><p className={`text-xs font-bold ${theme.highlight}`}>{studentProfile.name}</p></div>
              <div><span className={`text-[10px] ${theme.iconColor}`}>Class / Section:</span><p className={`text-xs font-bold ${theme.highlight}`}>{studentProfile.class}</p></div>
              <div><span className={`text-[10px] ${theme.iconColor}`}>Roll No:</span><p className={`text-xs font-bold ${theme.highlight}`}>{studentProfile.rollNo}</p></div>
              <div><span className={`text-[10px] ${theme.iconColor}`}>Admission No:</span><p className={`text-xs font-bold ${theme.highlight}`}>{studentProfile.admissionNo}</p></div>
            </div>
            {/* Exam schedule table */}
            <div className={`overflow-hidden rounded-xl border ${theme.border} mb-4`}>
              <table className="w-full text-xs">
                <thead><tr className={theme.secondaryBg}>
                  <th className={`p-2.5 text-left font-bold ${theme.iconColor} uppercase`}>Date</th>
                  <th className={`p-2.5 text-left font-bold ${theme.iconColor} uppercase`}>Subject</th>
                  <th className={`p-2.5 text-left font-bold ${theme.iconColor} uppercase`}>Time</th>
                  <th className={`p-2.5 text-left font-bold ${theme.iconColor} uppercase`}>Hall</th>
                </tr></thead>
                <tbody>
                  {upcomingExams.map((ex, i) => (
                    <tr key={i} className={`border-t ${theme.border}`}>
                      <td className={`p-2.5 ${theme.iconColor}`}>{ex.date}</td>
                      <td className={`p-2.5 font-bold ${theme.highlight}`}>{ex.name}</td>
                      <td className={`p-2.5 ${theme.iconColor}`}>{ex.time} ({ex.duration})</td>
                      <td className={`p-2.5 ${theme.iconColor}`}>{ex.hall}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Instructions */}
            <div className={`p-3 rounded-xl ${theme.secondaryBg} mb-4`}>
              <p className={`text-[10px] font-bold ${theme.highlight} mb-1`}>Instructions:</p>
              <ul className={`text-[10px] ${theme.iconColor} space-y-0.5 list-disc list-inside`}>
                <li>Carry this admit card to the examination hall.</li>
                <li>Report 30 minutes before the scheduled time.</li>
                <li>Electronic devices are strictly prohibited.</li>
                <li>Use blue/black ink pen only. Pencil allowed for diagrams.</li>
              </ul>
            </div>
            {/* Signature */}
            <div className="flex justify-between items-end mt-4 pt-4 border-t" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
              <div className="text-center">
                <div className="w-32 border-b border-slate-300 mb-1 h-8" />
                <p className={`text-[10px] ${theme.iconColor}`}>Class Teacher</p>
              </div>
              <div className="text-center">
                <div className="w-32 border-b border-slate-300 mb-1 h-8" />
                <p className={`text-[10px] ${theme.iconColor}`}>Principal</p>
              </div>
            </div>
          </div>
          {/* Download/Print buttons */}
          <div className="flex justify-center gap-3">
            <button onClick={() => alert('Download PDF (Blueprint demo)')} className={`flex items-center gap-1.5 px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>
              <Download size={14} /> Download PDF
            </button>
            <button onClick={() => alert('Print Admit Card (Blueprint demo)')} className={`flex items-center gap-1.5 px-4 py-2 rounded-xl ${theme.secondaryBg} ${theme.highlight} text-xs font-bold ${theme.buttonHover}`}>
              <FileText size={14} /> Print
            </button>
          </div>
        </div>
      )}

      {/* ── TAB: Online Tests ── */}
      {examTab === 'Online Tests' && !showTest && (
        <div className="space-y-4">
          <div className="flex items-center gap-1">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Online Tests Available</h3>
            <InfoTip tip="Take online tests from your device. Timer auto-submits when time runs out" />
            <MobileBadge />
          </div>
          <div className="space-y-3">
            {onlineTests.map(test => (
              <div key={test.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 flex items-center justify-between`}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
                    <Play size={16} />
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${theme.highlight}`}>{test.name}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className={`text-[10px] ${theme.iconColor}`}><Timer size={10} className="inline mr-0.5" /> {test.duration}</span>
                      <span className={`text-[10px] ${theme.iconColor}`}>{test.marks} marks</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => { setShowTest(true); setCurrentQuestion(0); setAnswers({}); }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all"
                >
                  <Play size={12} /> Start Test
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Online Test-taking UI ── */}
      {examTab === 'Online Tests' && showTest && (
        <div className="space-y-4">
          {/* Timer bar */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-3 flex items-center justify-between`}>
            <div className="flex items-center gap-2">
              <Timer size={16} className="text-red-500" />
              <span className={`text-sm font-bold text-red-600`}>29:45 remaining</span>
            </div>
            <span className={`text-xs ${theme.iconColor}`}>Math Chapter Test - Trigonometry</span>
          </div>

          {/* Question */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6`}>
            <p className={`text-xs ${theme.iconColor} mb-2`}>Q{currentQuestion + 1} of {testQuestions.length}</p>
            <p className={`text-sm font-bold ${theme.highlight} mb-4`}>{testQuestions[currentQuestion].q}</p>
            <div className="space-y-2">
              {testQuestions[currentQuestion].options.map((opt, i) => (
                <label key={i} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                  answers[currentQuestion] === i ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.buttonHover}`
                }`}>
                  <input
                    type="radio"
                    name={`q${currentQuestion}`}
                    checked={answers[currentQuestion] === i}
                    onChange={() => setAnswers(prev => ({ ...prev, [currentQuestion]: i }))}
                    className="w-4 h-4"
                  />
                  <span className={`text-xs font-medium ${answers[currentQuestion] === i ? 'text-white' : theme.highlight}`}>
                    ({String.fromCharCode(97 + i)}) {opt}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl ${currentQuestion === 0 ? 'opacity-40' : ''} ${theme.secondaryBg} ${theme.highlight} text-xs font-bold ${theme.buttonHover}`}
            >
              <ChevronLeft size={14} /> Previous
            </button>
            <div className="flex items-center gap-1.5">
              {testQuestions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentQuestion(i)}
                  className={`w-7 h-7 rounded-full text-[10px] font-bold flex items-center justify-center transition-all ${
                    i === currentQuestion ? 'bg-blue-500 text-white' :
                    answers[i] !== undefined ? 'bg-emerald-500 text-white' :
                    `${theme.secondaryBg} ${theme.iconColor}`
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            {currentQuestion < testQuestions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}
              >
                Next <ArrowRight size={14} />
              </button>
            ) : (
              <button
                onClick={() => { alert('Test Submitted! (Blueprint demo)'); setShowTest(false); }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-all"
              >
                <Send size={14} /> Submit Test
              </button>
            )}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 justify-center">
            <div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded-full bg-blue-500" /><span className={`text-[10px] ${theme.iconColor}`}>Current</span></div>
            <div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded-full bg-emerald-500" /><span className={`text-[10px] ${theme.iconColor}`}>Answered</span></div>
            <div className="flex items-center gap-1.5"><div className={`w-4 h-4 rounded-full ${theme.secondaryBg}`} /><span className={`text-[10px] ${theme.iconColor}`}>Unanswered</span></div>
          </div>
        </div>
      )}

      {/* ── TAB: My Results ── */}
      {examTab === 'My Results' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <h3 className={`text-sm font-bold ${theme.highlight}`}>My Results</h3>
              <InfoTip tip="View your exam results, grades, and rank" />
              <MobileBadge />
            </div>
            <button onClick={() => alert('Download Report Card (Blueprint demo)')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}>
              <Download size={12} /> Download Report Card
            </button>
          </div>

          {/* Results Table */}
          <div className={`overflow-hidden rounded-xl border ${theme.border}`}>
            <table className="w-full text-xs">
              <thead><tr className={theme.secondaryBg}>
                <th className={`p-2.5 text-left font-bold ${theme.iconColor} uppercase`}>Exam Name</th>
                <th className={`p-2.5 text-left font-bold ${theme.iconColor} uppercase`}>Subject</th>
                <th className={`p-2.5 text-center font-bold ${theme.iconColor} uppercase`}>Date</th>
                <th className={`p-2.5 text-center font-bold ${theme.iconColor} uppercase`}>Marks</th>
                <th className={`p-2.5 text-center font-bold ${theme.iconColor} uppercase`}>Max</th>
                <th className={`p-2.5 text-center font-bold ${theme.iconColor} uppercase`}>Grade</th>
                <th className={`p-2.5 text-center font-bold ${theme.iconColor} uppercase`}>Rank</th>
                <th className={`p-2.5 text-center font-bold ${theme.iconColor} uppercase`}>Status</th>
                <th className={`p-2.5 text-center font-bold ${theme.iconColor} uppercase`}>Details</th>
              </tr></thead>
              <tbody>
                {resultsDataExams.map((r, i) => (
                  <React.Fragment key={i}>
                    <tr className={`border-t ${theme.border}`}>
                      <td className={`p-2.5 font-bold ${theme.highlight}`}>{r.name}</td>
                      <td className={`p-2.5 ${theme.highlight}`}>{r.subject}</td>
                      <td className={`p-2.5 text-center ${theme.iconColor}`}>{r.date}</td>
                      <td className={`p-2.5 text-center font-bold ${theme.highlight}`}>{r.obtained}</td>
                      <td className={`p-2.5 text-center ${theme.iconColor}`}>{r.max}</td>
                      <td className="p-2.5 text-center">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          r.grade.startsWith('A') ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                        }`}>{r.grade}</span>
                      </td>
                      <td className={`p-2.5 text-center font-bold ${theme.highlight}`}>#{r.rank}</td>
                      <td className="p-2.5 text-center">
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-700">{r.status}</span>
                      </td>
                      <td className="p-2.5 text-center">
                        {r.details.length > 0 && (
                          <button onClick={() => setExpandedResult(expandedResult === i ? null : i)} className={`text-[10px] font-bold ${theme.primaryText}`}>
                            {expandedResult === i ? 'Hide' : 'View'}
                          </button>
                        )}
                      </td>
                    </tr>
                    {expandedResult === i && r.details.length > 0 && (
                      <tr>
                        <td colSpan={9} className={`p-3 ${theme.secondaryBg}`}>
                          <p className={`text-[10px] font-bold ${theme.highlight} mb-2`}>Question-wise Analysis:</p>
                          <div className="space-y-1.5">
                            {r.details.map((d, j) => (
                              <div key={j} className={`flex items-center gap-3 p-2 rounded-lg ${theme.cardBg}`}>
                                {d.correct ? <CheckCircle size={12} className="text-emerald-500" /> : <XCircle size={12} className="text-red-500" />}
                                <span className={`text-[10px] ${theme.highlight} flex-1`}>{d.q}</span>
                                <span className={`text-[10px] ${d.correct ? 'text-emerald-600' : 'text-red-600'} font-bold`}>Your: {d.yourAnswer}</span>
                                {!d.correct && <span className="text-[10px] text-emerald-600 font-bold">Correct: {d.correctAnswer}</span>}
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Performance Trend */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Performance Trend (Last 3 Exams)</h3>
            <div className="flex items-end gap-4 justify-center h-32">
              {[
                { label: 'UT 1', pct: 88 },
                { label: 'UT 2', pct: 82 },
                { label: 'Half Yearly', pct: 85 },
              ].map((bar, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className={`text-[10px] font-bold ${theme.highlight}`}>{bar.pct}%</span>
                  <div
                    className={`w-12 rounded-t-lg ${i === 0 ? 'bg-blue-500' : i === 1 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                    style={{ height: `${bar.pct}%` }}
                  />
                  <span className={`text-[10px] ${theme.iconColor}`}>{bar.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: Practice ── */}
      {examTab === 'Practice' && (
        <div className="space-y-4">
          <div className="flex items-center gap-1">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Practice Tests</h3>
            <InfoTip tip="Practice anytime to prepare for exams" />
            <MobileBadge />
          </div>
          <p className={`text-[10px] text-amber-600`}>Practice tests are ungraded and allow unlimited attempts</p>
          <div className="space-y-3">
            {practiceTests.map(pt => (
              <div key={pt.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 flex items-center justify-between`}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center text-white">
                    <BookOpenCheck size={16} />
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${theme.highlight}`}>{pt.name}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className={`text-[10px] ${theme.iconColor}`}>{pt.questions} questions</span>
                      <span className={`text-[10px] ${theme.iconColor}`}>Unlimited attempts</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className={`text-[10px] ${theme.iconColor}`}>Attempts: {pt.attempts}</p>
                    <p className={`text-[10px] font-bold ${theme.highlight}`}>Best Score: {pt.bestScore}%</p>
                  </div>
                  <button
                    onClick={() => alert('Start Practice Test (Blueprint demo)')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}
                  >
                    <Play size={12} /> Start Practice
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── EXPORT ─────────────────────────────────────────
// ─── COMMUNICATION MODULE ────────────────────────────
// ─── STUDY PLANNER MODULE ───────────────────────────
function StudyPlannerModule({ theme }: { theme: Theme }) {
  const [plannerDay, setPlannerDay] = useState('Monday');

  const weeklyPlan: Record<string, { time: string; subject: string; topic: string; duration: string; priority: string; status: string }[]> = {
    Monday: [
      { time: '4:00 PM', subject: 'Mathematics', topic: 'Ch-12: Surface Areas & Volumes', duration: '1h 30m', priority: 'High', status: 'Done' },
      { time: '5:30 PM', subject: 'Science', topic: 'Magnetic Effects of Current (Revision)', duration: '1h', priority: 'High', status: 'Done' },
      { time: '7:00 PM', subject: 'Hindi', topic: 'Surdas ke Pad — Memorize', duration: '45m', priority: 'Medium', status: 'Pending' },
      { time: '8:00 PM', subject: 'English', topic: 'Essay writing practice', duration: '45m', priority: 'Medium', status: 'Pending' },
    ],
    Tuesday: [
      { time: '4:00 PM', subject: 'Science', topic: 'Human Eye & Colourful World', duration: '1h 30m', priority: 'High', status: 'Pending' },
      { time: '5:30 PM', subject: 'Social Science', topic: 'Map work — Soil Types', duration: '1h', priority: 'Medium', status: 'Pending' },
      { time: '7:00 PM', subject: 'Computer Science', topic: 'Python — Stack programs', duration: '1h', priority: 'High', status: 'Pending' },
    ],
    Wednesday: [
      { time: '4:00 PM', subject: 'Mathematics', topic: 'Ch-11: Constructions Practice', duration: '1h 30m', priority: 'High', status: 'Pending' },
      { time: '5:30 PM', subject: 'English', topic: 'Letter writing + Grammar', duration: '1h', priority: 'Medium', status: 'Pending' },
      { time: '7:00 PM', subject: 'Hindi', topic: 'Neta ji ka Chasma — Q&A', duration: '45m', priority: 'Low', status: 'Pending' },
    ],
    Thursday: [
      { time: '4:00 PM', subject: 'Science', topic: 'Electricity — Numericals', duration: '1h 30m', priority: 'High', status: 'Pending' },
      { time: '5:30 PM', subject: 'Social Science', topic: 'Economics — Ch 3 revision', duration: '1h', priority: 'Medium', status: 'Pending' },
      { time: '7:00 PM', subject: 'Mathematics', topic: 'Statistics practice set', duration: '1h', priority: 'Medium', status: 'Pending' },
    ],
    Friday: [
      { time: '4:00 PM', subject: 'Computer Science', topic: 'SQL queries practice', duration: '1h', priority: 'High', status: 'Pending' },
      { time: '5:00 PM', subject: 'English', topic: 'Literature — Poem analysis', duration: '1h', priority: 'Low', status: 'Pending' },
      { time: '6:30 PM', subject: 'Science', topic: 'Lab experiment write-ups', duration: '1h', priority: 'Medium', status: 'Pending' },
    ],
    Saturday: [
      { time: '10:00 AM', subject: 'Mathematics', topic: 'Full chapter revision + mock', duration: '2h', priority: 'High', status: 'Pending' },
      { time: '1:00 PM', subject: 'Science', topic: 'Previous year paper solving', duration: '2h', priority: 'High', status: 'Pending' },
    ],
  };

  const subjectColorMap: Record<string, string> = {
    Mathematics: 'bg-blue-100 text-blue-700 border-blue-200',
    Science: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    English: 'bg-purple-100 text-purple-700 border-purple-200',
    Hindi: 'bg-orange-100 text-orange-700 border-orange-200',
    'Social Science': 'bg-amber-100 text-amber-700 border-amber-200',
    'Computer Science': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>AI Study Planner</h1>
        <button onClick={() => alert('Study plan regenerated with AI! (Blueprint demo)')} className={`text-[10px] px-3 py-1.5 rounded-lg ${theme.primary} text-white font-bold flex items-center gap-1`}>
          <Sparkles size={10} /> Regenerate Plan
        </button>
      </div>

      <p className={`text-xs ${theme.iconColor}`}>Auto-generated based on: upcoming exams, weak subjects, homework deadlines. Adjust priorities below.</p>

      {/* Study Goals */}
      <div className="grid grid-cols-4 gap-3">
        <StatCard icon={Target} label="Target Score" value="90%+" color="bg-blue-500" sub="across all subjects" theme={theme} />
        <StatCard icon={Clock} label="Daily Target" value="4 hrs" color="bg-emerald-500" sub="study time" theme={theme} />
        <StatCard icon={CheckCircle} label="This Week" value="12/18" color="bg-amber-500" sub="tasks completed" theme={theme} />
        <StatCard icon={TrendingUp} label="Planned vs Actual" value="85%" color="bg-purple-500" sub="adherence rate" theme={theme} />
      </div>

      {/* Subject Priority Sliders */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Subject Priority (1-5)</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { subject: 'Mathematics', priority: 5 },
            { subject: 'Science', priority: 5 },
            { subject: 'English', priority: 3 },
            { subject: 'Hindi', priority: 3 },
            { subject: 'Social Science', priority: 3 },
            { subject: 'Computer Science', priority: 4 },
          ].map((s, i) => (
            <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-lg ${theme.secondaryBg}`}>
              <span className={`text-[10px] flex-1 font-bold ${theme.highlight}`}>{s.subject}</span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(n => (
                  <div key={n} className={`w-3 h-3 rounded-sm ${n <= s.priority ? 'bg-blue-500' : theme.accentBg}`} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Calendar View */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Weekly Study Plan</h3>
        <div className="flex gap-1 mb-3">
          {Object.keys(weeklyPlan).map(day => (
            <button key={day} onClick={() => setPlannerDay(day)} className={`flex-1 text-[10px] py-1.5 rounded-lg font-bold transition-all ${plannerDay === day ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.iconColor}`}`}>
              {day.slice(0, 3)}
            </button>
          ))}
        </div>

        {/* Daily Breakdown */}
        <div className="space-y-2">
          {weeklyPlan[plannerDay]?.map((slot, i) => (
            <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${theme.secondaryBg} border ${theme.border}`}>
              <span className={`text-[10px] font-bold ${theme.iconColor} w-14 shrink-0`}>{slot.time}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${subjectColorMap[slot.subject] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>{slot.subject}</span>
              <div className="flex-1 min-w-0">
                <p className={`text-[10px] font-bold ${theme.highlight} truncate`}>{slot.topic}</p>
              </div>
              <span className={`text-[10px] ${theme.iconColor}`}>{slot.duration}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                slot.priority === 'High' ? 'bg-red-100 text-red-700' : slot.priority === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
              }`}>{slot.priority}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                slot.status === 'Done' ? 'bg-emerald-100 text-emerald-700' : slot.status === 'Skipped' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-500'
              }`}>{slot.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Progress: Planned vs Actual */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Weekly Progress — Planned vs Actual Hours</h3>
        <div className="grid grid-cols-6 gap-2">
          {[
            { subject: 'Maths', planned: 6, actual: 5.5 },
            { subject: 'Science', planned: 5, actual: 4 },
            { subject: 'English', planned: 3, actual: 2.5 },
            { subject: 'Hindi', planned: 2, actual: 1.5 },
            { subject: 'SST', planned: 2, actual: 2 },
            { subject: 'CS', planned: 3, actual: 3 },
          ].map((s, i) => (
            <div key={i} className={`${theme.secondaryBg} rounded-xl p-3 border ${theme.border} text-center`}>
              <p className={`text-[10px] font-bold ${theme.highlight} mb-2`}>{s.subject}</p>
              <div className="flex justify-center gap-2">
                <div>
                  <p className={`text-sm font-bold ${theme.iconColor}`}>{s.planned}h</p>
                  <p className={`text-[8px] ${theme.iconColor}`}>Plan</p>
                </div>
                <div>
                  <p className={`text-sm font-bold ${s.actual >= s.planned ? 'text-emerald-600' : 'text-amber-600'}`}>{s.actual}h</p>
                  <p className={`text-[8px] ${theme.iconColor}`}>Actual</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── WELLNESS / MOOD TRACKER MODULE ─────────────────
function WellnessModule({ theme }: { theme: Theme }) {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [journalText, setJournalText] = useState('');
  const [sleepHours, setSleepHours] = useState('7');

  const moods = [
    { emoji: '😄', label: 'Great', color: 'bg-emerald-100 border-emerald-300 text-emerald-700' },
    { emoji: '🙂', label: 'Good', color: 'bg-blue-100 border-blue-300 text-blue-700' },
    { emoji: '😐', label: 'Okay', color: 'bg-amber-100 border-amber-300 text-amber-700' },
    { emoji: '😔', label: 'Low', color: 'bg-orange-100 border-orange-300 text-orange-700' },
    { emoji: '😢', label: 'Bad', color: 'bg-red-100 border-red-300 text-red-700' },
  ];

  // 30-day mood calendar (mock)
  const moodCalendar = [
    0, 1, 0, 1, 2, 0, 1, 0, 0, 1, 2, 0, 1, 1, 0,
    1, 0, 2, 1, 0, 0, 1, 3, 1, 0, 1, 0, 1, 0, null,
  ];

  const moodColorMap = ['bg-emerald-400', 'bg-blue-400', 'bg-amber-400', 'bg-orange-400', 'bg-red-400'];

  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Wellness &amp; Mood Tracker</h1>

      {/* Daily Mood Check-in */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>How are you feeling today?</h3>
        <div className="flex justify-center gap-4">
          {moods.map((m, i) => (
            <button
              key={i}
              onClick={() => setSelectedMood(i)}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all ${
                selectedMood === i ? m.color + ' shadow-lg scale-110' : `${theme.secondaryBg} border-transparent`
              }`}
            >
              <span className="text-3xl">{m.emoji}</span>
              <span className={`text-[10px] font-bold ${selectedMood === i ? '' : theme.iconColor}`}>{m.label}</span>
            </button>
          ))}
        </div>
        {selectedMood !== null && (
          <p className={`text-xs text-center mt-3 ${theme.iconColor}`}>
            Mood recorded: <span className="font-bold">{moods[selectedMood].label}</span> — Thank you for checking in!
          </p>
        )}
      </div>

      {/* Mood Calendar (30 days) */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Mood Calendar — Last 30 Days</h3>
        <div className="grid grid-cols-15 gap-1" style={{ gridTemplateColumns: 'repeat(15, minmax(0, 1fr))' }}>
          {moodCalendar.map((mood, i) => (
            <div
              key={i}
              title={mood !== null ? `Day ${i + 1}: ${moods[mood]?.label}` : 'Today'}
              className={`w-5 h-5 rounded-sm ${mood !== null ? moodColorMap[mood] : `border-2 border-dashed ${theme.border}`}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-3 mt-2">
          {moods.map((m, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className={`w-3 h-3 rounded-sm ${moodColorMap[i]}`} />
              <span className={`text-[9px] ${theme.iconColor}`}>{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Mood Trend */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Weekly Mood Trend</h3>
        <div className="flex items-end justify-between gap-2 h-20">
          {[
            { day: 'Mon', mood: 0 },
            { day: 'Tue', mood: 1 },
            { day: 'Wed', mood: 0 },
            { day: 'Thu', mood: 1 },
            { day: 'Fri', mood: 2 },
            { day: 'Sat', mood: 0 },
            { day: 'Sun', mood: 1 },
          ].map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className={`w-full rounded-t-lg ${moodColorMap[d.mood]}`} style={{ height: `${(5 - d.mood) * 15 + 10}px` }} />
              <span className={`text-[9px] ${theme.iconColor}`}>{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Journal */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-2`}>Today&apos;s Journal</h3>
          <p className={`text-[10px] ${theme.iconColor} mb-2`}>Write a quick note about your day.</p>
          <textarea
            value={journalText}
            onChange={e => setJournalText(e.target.value)}
            rows={4}
            placeholder="How was your day? What went well? What could be better?"
            className={`w-full text-xs p-3 rounded-xl border ${theme.border} ${theme.cardBg} ${theme.highlight} resize-none`}
          />
          <button onClick={() => alert('Journal saved! (Blueprint demo)')} className={`mt-2 text-[10px] px-4 py-2 rounded-xl ${theme.primary} text-white font-bold`}>
            Save Entry
          </button>
        </div>

        {/* Sleep Tracker */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-2`}>Sleep Tracker</h3>
          <div className="mb-3">
            <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Last night&apos;s sleep (hours)</label>
            <input
              type="number"
              value={sleepHours}
              onChange={e => setSleepHours(e.target.value)}
              min={0} max={14} step={0.5}
              className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`}
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-[10px]">
              <span className={theme.iconColor}>Weekly Average</span>
              <span className={`font-bold ${theme.highlight}`}>7.2 hours</span>
            </div>
            <div className="flex justify-between text-[10px]">
              <span className={theme.iconColor}>Recommended</span>
              <span className="font-bold text-emerald-600">8-10 hours</span>
            </div>
            <div className={`h-2 rounded-full ${theme.secondaryBg}`}>
              <div className="h-full rounded-full bg-blue-500" style={{ width: `${(7.2 / 10) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Wellbeing Tips */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Wellbeing Tips for You</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { title: 'Take a 10-min Walk', desc: 'Fresh air boosts focus and mood. Take a walk after every 2-hour study block.', icon: '🚶' },
            { title: 'Practice Deep Breathing', desc: 'Try 4-7-8 breathing: Inhale 4s, Hold 7s, Exhale 8s. Do 3 rounds.', icon: '🧘' },
            { title: 'Stay Hydrated', desc: 'Drink at least 8 glasses of water daily. Keep a bottle at your study desk.', icon: '💧' },
          ].map((tip, i) => (
            <div key={i} className={`${theme.secondaryBg} rounded-xl p-3 border ${theme.border}`}>
              <span className="text-xl">{tip.icon}</span>
              <p className={`text-xs font-bold ${theme.highlight} mt-1`}>{tip.title}</p>
              <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Support Resources</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className={`${theme.secondaryBg} rounded-xl p-4 border ${theme.border}`}>
            <div className="flex items-center gap-2 mb-2">
              <User size={14} className="text-blue-500" />
              <p className={`text-xs font-bold ${theme.highlight}`}>School Counselor</p>
            </div>
            <p className={`text-[10px] ${theme.iconColor}`}>Mrs. Anita Sharma</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Available: Mon-Fri, 10 AM - 4 PM</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Room 105, Counseling Wing</p>
            <button onClick={() => alert('Counselor booking request sent! (Blueprint demo)')} className={`mt-2 text-[10px] px-3 py-1.5 rounded-lg ${theme.primary} text-white font-bold flex items-center gap-1`}>
              <MessageSquare size={10} /> Talk to Someone
            </button>
          </div>
          <div className={`${theme.secondaryBg} rounded-xl p-4 border ${theme.border}`}>
            <div className="flex items-center gap-2 mb-2">
              <Heart size={14} className="text-red-500" />
              <p className={`text-xs font-bold ${theme.highlight}`}>Helpline Numbers</p>
            </div>
            <div className="space-y-1.5">
              <div className={`text-[10px] ${theme.iconColor}`}><span className="font-bold">iCall:</span> 9152987821</div>
              <div className={`text-[10px] ${theme.iconColor}`}><span className="font-bold">Vandrevala Foundation:</span> 1860-2662-345</div>
              <div className={`text-[10px] ${theme.iconColor}`}><span className="font-bold">NIMHANS:</span> 080-46110007</div>
            </div>
            <p className={`text-[9px] ${theme.iconColor} mt-2 italic`}>Confidential &amp; free. Available 24/7.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── COMMUNICATION MODULE ───────────────────────────
function CommunicationModule({ theme }: { theme: Theme }) {
  const [commTab, setCommTab] = useState('Chat');
  const tabs = ['Notices', 'Chat'];
  return (
    <div className="space-y-3">
      <h2 className={`text-lg font-bold ${theme.highlight}`}>Communication</h2>
      <TabBar tabs={tabs} active={commTab} onChange={setCommTab} theme={theme} />
      {commTab === 'Chat' && <ChatsView theme={theme} compact />}
      {commTab === 'Notices' && (
        <div className="space-y-2">
          {[
            { title: 'Unit Test 3 Schedule — 18-22 Feb 2026', date: '10 Feb 2026', category: 'Academic' },
            { title: 'PTM on 22nd February — Parents Invited', date: '09 Feb 2026', category: 'Event' },
            { title: 'Sports Day Registration Open', date: '07 Feb 2026', category: 'Sports' },
          ].map((n, i) => (
            <div key={i} className={`${theme.cardBg} rounded-xl border ${theme.border} p-3 flex items-center gap-3`}>
              <div className={`w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center`}>
                <Megaphone size={14} className="text-amber-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-semibold ${theme.highlight} truncate`}>{n.title}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{n.date} &middot; {n.category}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <BlueprintLayout>
      <StudentDashboard />
    </BlueprintLayout>
  );
}
