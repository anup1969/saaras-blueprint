'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import {
  Headphones, MessageSquare, BarChart3, BookOpen, ClipboardCheck,
  DollarSign, Shield, Send, Bot, Zap, Users, Calendar,
  Bus, ShieldCheck, Phone, UserCheck, Briefcase, Calculator,
  FileText, Settings, Home, Bell, Lock, Key, Heart,
  Plus, Edit2, Trash2, ChevronUp, ChevronDown, Eye, ThumbsUp,
  ThumbsDown, HelpCircle, ToggleLeft, ToggleRight, Search, Info, Clock,
} from 'lucide-react';

// ─── ROLE-SPECIFIC FAQ DATA ─────────────────────────

type FaqCategory = { label: string; icon: React.ElementType; count: number };
type FaqItem = { q: string; options: string[] };

const roleFaqs: Record<string, { categories: FaqCategory[]; items: Record<string, FaqItem[]> }> = {
  principal: {
    categories: [
      { label: 'Getting Started', icon: Zap, count: 5 },
      { label: 'Attendance', icon: ClipboardCheck, count: 4 },
      { label: 'Academics', icon: BookOpen, count: 4 },
      { label: 'Communication', icon: MessageSquare, count: 3 },
      { label: 'Reports', icon: BarChart3, count: 4 },
      { label: 'Fees & Finance', icon: DollarSign, count: 3 },
    ],
    items: {
      'Getting Started': [
        { q: 'How do I check today\'s school overview?', options: ['Go to Dashboard → News Board shows live activities', 'Click any stat card for drill-down analytics', 'Use Quick Actions for common tasks'] },
        { q: 'How do I approve a leave request?', options: ['Go to Approvals module in sidebar', 'Click on Pending tab → Select request → Approve/Reject', 'You can also approve from the notification bell'] },
        { q: 'How do I send a circular to all parents?', options: ['Go to Communication → Broadcasts → New Broadcast', 'Select audience "All Parents"', 'Choose priority and send'] },
        { q: 'How do I view student performance?', options: ['Go to Academics module', 'Select Class Performance tab for class-wise view', 'Click on any class to see individual student scores'] },
        { q: 'How to check staff attendance?', options: ['Dashboard → Academic/Non-Academic staff cards (click for details)', 'Or go to Staff Overview module', 'Absent staff list shows who is missing today'] },
      ],
      'Attendance': [
        { q: 'How do I see which students are absent today?', options: ['Click the Students card on Dashboard', 'Select "Absent Today" tab', 'Students without intimation are flagged red'] },
        { q: 'Can I see attendance trends over time?', options: ['Go to Reports → Attendance Reports', 'Select date range and class/section', 'Download or view graphical trends'] },
        { q: 'How do I handle late arrivals?', options: ['Teachers mark late entry during attendance', 'Shows as "Late" in attendance register', 'Auto-notification to parent after 3 late marks in a week'] },
        { q: 'A parent disputes an attendance record.', options: ['Go to Attendance → Search student → Select date', 'Class teacher can edit within 48-hour window', 'Beyond that, admin override required'] },
      ],
      'Academics': [
        { q: 'How do I check exam results?', options: ['Go to Academics → Exam Results tab', 'View by exam name, class, or date', 'Compare across terms using trend view'] },
        { q: 'How do I see subject-wise performance?', options: ['Academics → Overview shows all subjects', 'Bar graph shows avg score per subject', 'Click any subject to drill down by class'] },
        { q: 'How to identify struggling students?', options: ['Academics → Class Performance → Sort by score', 'Students below 40% are auto-flagged', 'Teacher can add remarks for follow-up'] },
        { q: 'How to generate report cards?', options: ['Reports → Report Card Generation', 'Select class, template, and exam', 'Preview → Bulk generate → Print/PDF'] },
      ],
      'Communication': [
        { q: 'How do parents receive notifications?', options: ['Push notification on mobile app', 'SMS for critical alerts (configurable)', 'Email for circulars and reports'] },
        { q: 'Can I message a specific parent?', options: ['Go to Communication → Chat', 'Search for parent by student name', 'Start direct message conversation'] },
        { q: 'How do polls work?', options: ['Communication → Polls → Create Poll', 'Set audience, options, and deadline', 'Results visible in real-time with analytics'] },
      ],
      'Reports': [
        { q: 'What reports can I generate?', options: ['Attendance (daily/monthly/yearly)', 'Academic (exam-wise, subject-wise, class-wise)', 'Fee collection, defaulters, receipts', 'Staff leave utilization, HR reports'] },
        { q: 'How to download reports?', options: ['Go to Reports module', 'Select report type → Configure filters', 'Click Download (PDF/Excel/CSV)'] },
        { q: 'Can I schedule automatic reports?', options: ['Yes — Reports → Scheduled Reports', 'Set frequency (daily/weekly/monthly)', 'Auto-email to selected recipients'] },
        { q: 'How to share reports with Trustee?', options: ['Reports → Share → Select Trustee', 'Or add Trustee email for auto-reports', 'Trustee can also view from their dashboard'] },
      ],
      'Fees & Finance': [
        { q: 'How to check fee collection status?', options: ['Dashboard → Today\'s Collection card', 'Or Fees module → Collection Summary', 'Filter by class, date, payment mode'] },
        { q: 'How to see fee defaulters?', options: ['Fees → Defaulters tab', 'Sorted by outstanding amount', 'Send bulk reminder with one click'] },
        { q: 'How to generate fee receipts?', options: ['Fees → Payments → Select payment', 'Click "Generate Receipt"', 'Printable or email to parent'] },
      ],
    },
  },
  teacher: {
    categories: [
      { label: 'Daily Tasks', icon: Zap, count: 4 },
      { label: 'Attendance', icon: ClipboardCheck, count: 3 },
      { label: 'Academics', icon: BookOpen, count: 4 },
      { label: 'Communication', icon: MessageSquare, count: 3 },
      { label: 'Timetable', icon: Calendar, count: 3 },
    ],
    items: {
      'Daily Tasks': [
        { q: 'What should I do first when I log in?', options: ['Mark attendance for your class', 'Check today\'s timetable and substitutions', 'Review pending homework submissions'] },
        { q: 'How do I mark attendance?', options: ['Dashboard → Mark Attendance card', 'Select class/section → Mark present/absent', 'Submit before end of first period'] },
        { q: 'How to check my timetable?', options: ['Sidebar → Timetable module', 'Shows daily/weekly view with room numbers', 'Substitution alerts shown in red'] },
        { q: 'How to submit leave request?', options: ['Sidebar → Leave Management → Apply Leave', 'Select dates, type (CL/SL/ML), and reason', 'Principal/VP will approve/reject'] },
      ],
      'Attendance': [
        { q: 'Can I edit attendance after submission?', options: ['Yes, within 48-hour window', 'Go to Attendance → Select date → Edit', 'Changes are logged for audit'] },
        { q: 'How to handle late students?', options: ['Mark as "Late" instead of "Absent"', 'Late after 15 min auto-marks as absent', 'Parent gets notification after 3 late marks/week'] },
        { q: 'How to view class attendance trends?', options: ['Attendance → Monthly View', 'Shows calendar heatmap per student', 'Chronic absentees flagged automatically'] },
      ],
      'Academics': [
        { q: 'How to enter marks/grades?', options: ['Academics → Enter Marks → Select exam', 'Choose class/section and subject', 'Enter marks → Save → Submit for review'] },
        { q: 'How to assign homework?', options: ['Academics → Homework → Create Assignment', 'Set class, subject, due date, and instructions', 'Attach files if needed → Publish'] },
        { q: 'How to track homework submissions?', options: ['Homework → Submissions tab', 'Green = submitted, Red = missing', 'Send reminder to non-submitters'] },
        { q: 'How to create a test/quiz?', options: ['Academics → Assessments → Create', 'Set format (MCQ, subjective, mixed)', 'Assign to class and set deadline'] },
      ],
      'Communication': [
        { q: 'How to message a parent?', options: ['Communication → Chat → Search parent', 'Or from Student Profile → Contact Parent', 'Keep messages professional and school-related'] },
        { q: 'How to send class announcement?', options: ['Communication → Broadcasts → New', 'Select your class as audience', 'Parents receive push notification'] },
        { q: 'Can parents message me directly?', options: ['Yes, if school has enabled two-way chat', 'You\'ll get a notification', 'Reply from Communication → Chat'] },
      ],
      'Timetable': [
        { q: 'I have a substitution today. Where do I see it?', options: ['Dashboard shows substitution alert', 'Timetable → Today\'s view highlights changes in red', 'You get a push notification too'] },
        { q: 'How to request a class swap?', options: ['Timetable → Request Swap', 'Select the period and preferred alternative', 'HOD/VP will approve'] },
        { q: 'How to see the full week schedule?', options: ['Timetable → Weekly View', 'Shows all periods, rooms, and subjects', 'Filter by day to see details'] },
      ],
    },
  },
  student: {
    categories: [
      { label: 'Getting Started', icon: Zap, count: 3 },
      { label: 'Homework', icon: BookOpen, count: 3 },
      { label: 'Results', icon: BarChart3, count: 3 },
      { label: 'Timetable', icon: Calendar, count: 2 },
    ],
    items: {
      'Getting Started': [
        { q: 'How do I log in?', options: ['Use your User ID (admission number) and password', 'Or use OTP if your school supports it', 'First login requires password change'] },
        { q: 'How to check my attendance?', options: ['Dashboard → Attendance card shows monthly %', 'Click for detailed day-wise view', 'Contact class teacher for any disputes'] },
        { q: 'How to see my timetable?', options: ['Dashboard → Today\'s Schedule', 'Or Timetable module for full week view', 'Substitution changes shown in real-time'] },
      ],
      'Homework': [
        { q: 'Where do I see assigned homework?', options: ['Dashboard → Pending Homework card', 'Homework module shows all assignments', 'Filter by subject or due date'] },
        { q: 'How to submit homework online?', options: ['Homework → Select assignment → Submit', 'Upload file or type answer online', 'Submit before deadline (late submissions flagged)'] },
        { q: 'I submitted but teacher says not received?', options: ['Check Homework → My Submissions → Status', 'If "Submitted" shows, share screenshot with teacher', 'If not, try resubmitting'] },
      ],
      'Results': [
        { q: 'How to check my exam results?', options: ['Results → Select exam', 'Shows subject-wise marks and rank', 'Download report card as PDF'] },
        { q: 'How to see class rank?', options: ['Results → Leaderboard view', 'Shows your rank vs class average', 'Track improvement across exams'] },
        { q: 'My marks seem wrong. What do I do?', options: ['Contact your subject teacher first', 'Teacher can request re-evaluation', 'Admin will update after verification'] },
      ],
      'Timetable': [
        { q: 'Is there a class today?', options: ['Check Dashboard → Today\'s Schedule', 'Holidays and half-days shown in calendar', 'Push notification for any schedule changes'] },
        { q: 'Where is my next class?', options: ['Timetable shows room number for each period', 'Lab sessions highlighted differently', 'Substitution teachers shown if applicable'] },
      ],
    },
  },
  parent: {
    categories: [
      { label: 'Getting Started', icon: Zap, count: 4 },
      { label: 'Fees & Payments', icon: DollarSign, count: 4 },
      { label: 'Attendance', icon: ClipboardCheck, count: 3 },
      { label: 'Communication', icon: MessageSquare, count: 3 },
      { label: 'Academics', icon: BookOpen, count: 3 },
    ],
    items: {
      'Getting Started': [
        { q: 'How do I log in for the first time?', options: ['Use OTP (registered mobile number) or User ID + Password', 'Default password is student\'s Date of Birth (DDMMYYYY)', 'You must change password on first login'] },
        { q: 'I forgot my password. What do I do?', options: ['Contact school front desk or admin', 'Admin will verify your identity and reset password', 'You\'ll get a new default password to change'] },
        { q: 'I have multiple children in this school.', options: ['One login shows all children', 'Use the child switcher at the top', 'Notifications come for ALL children'] },
        { q: 'The app is not working / loading slow.', options: ['Check your internet connection', 'Update the app to latest version', 'Clear app cache if problem persists'] },
      ],
      'Fees & Payments': [
        { q: 'How to pay fees online?', options: ['Dashboard → Fee Summary → Pay Now', 'Choose UPI, Net Banking, or Card', 'Receipt auto-generated after payment'] },
        { q: 'Where to see fee breakdown?', options: ['Fees → Detailed Statement', 'Shows tuition, transport, activities separately', 'Download PDF statement anytime'] },
        { q: 'I paid but it still shows pending.', options: ['Online payments reconcile within 24 hours', 'For offline payments, ask school for receipt', 'Contact Accounts department if issue persists'] },
        { q: 'How to get a fee receipt?', options: ['Fees → Payment History → Select payment', 'Click Download Receipt', 'Also sent to your email after payment'] },
      ],
      'Attendance': [
        { q: 'How to check my child\'s attendance?', options: ['Dashboard → Attendance % card', 'Click for daily/monthly breakdown', 'Green = present, Red = absent, Yellow = late'] },
        { q: 'My child was present but marked absent.', options: ['Contact class teacher through Chat', 'Teacher can correct within 48 hours', 'Or contact school admin for older records'] },
        { q: 'How to apply for leave?', options: ['Attendance → Apply Leave', 'Select dates and reason', 'Class teacher will approve/reject'] },
      ],
      'Communication': [
        { q: 'How to message my child\'s teacher?', options: ['Communication → Chat → Select teacher', 'Or from Dashboard → Quick Chat', 'Messages are monitored for safety'] },
        { q: 'Where do I see school announcements?', options: ['Notifications bell (top right)', 'Communication → Broadcasts shows all', 'Important ones are pinned at top'] },
        { q: 'Can I participate in polls?', options: ['Communication → Polls', 'Vote on active polls', 'Results visible after poll closes'] },
      ],
      'Academics': [
        { q: 'How to check exam results?', options: ['Academics → Results → Select exam', 'Shows marks, grade, and class rank', 'Download report card as PDF'] },
        { q: 'How to see homework assignments?', options: ['Academics → Homework', 'Shows pending and submitted assignments', 'Help your child submit before deadline'] },
        { q: 'How to track my child\'s progress?', options: ['Academics → Progress Report', 'Compare performance across exams', 'Subject-wise trends shown graphically'] },
      ],
    },
  },
  'vice-principal': {
    categories: [
      { label: 'Daily Overview', icon: Zap, count: 3 },
      { label: 'Substitutions', icon: UserCheck, count: 3 },
      { label: 'Discipline', icon: Shield, count: 3 },
      { label: 'Academics', icon: BookOpen, count: 3 },
    ],
    items: {
      'Daily Overview': [
        { q: 'How to start my day?', options: ['Dashboard → News Board for live school activities', 'Check staff attendance for absent teachers', 'Review pending substitution requests'] },
        { q: 'How to check today\'s issues?', options: ['Approvals tab shows pending items', 'Discipline cases listed under Welfare', 'Notification bell for urgent alerts'] },
        { q: 'How to monitor class progress?', options: ['Academics → Class Performance', 'Filter by grade, section, or subject', 'Compare with last term\'s data'] },
      ],
      'Substitutions': [
        { q: 'How to assign a substitution?', options: ['Staff → Substitutions → Create', 'System suggests available teachers', 'Confirm and notify the teacher'] },
        { q: 'A teacher is absent unexpectedly.', options: ['Check free-period teachers from timetable', 'Assign substitution → teacher gets push notification', 'Update daily substitution board'] },
        { q: 'How to view substitution history?', options: ['Staff → Substitutions → History tab', 'Filter by teacher or date range', 'Report shows substitution load per teacher'] },
      ],
      'Discipline': [
        { q: 'How to log a disciplinary case?', options: ['Welfare → New Case', 'Enter student details, incident, and action', 'Parents auto-notified if configured'] },
        { q: 'How to track ongoing cases?', options: ['Welfare → Active Cases', 'Filter by class, severity, or status', 'Update case notes and resolution'] },
        { q: 'How to communicate with parents about discipline?', options: ['From case → Contact Parent button', 'Opens chat with pre-filled context', 'Or schedule a meeting from Calendar'] },
      ],
      'Academics': [
        { q: 'How to review exam papers before publishing?', options: ['Academics → Exam Papers → Pending Review', 'Download, review, approve or request changes', 'Teacher gets notified of your decision'] },
        { q: 'How to check teacher workload?', options: ['Staff → Workload Analysis', 'Shows periods per week per teacher', 'Flag overloaded teachers for redistribution'] },
        { q: 'How to approve academic calendar changes?', options: ['Calendar → Pending Changes', 'Review, approve, or reject', 'Changes reflect on all stakeholder calendars'] },
      ],
    },
  },
  'school-admin': {
    categories: [
      { label: 'Daily Operations', icon: Zap, count: 3 },
      { label: 'Admissions', icon: Users, count: 3 },
      { label: 'Configuration', icon: Settings, count: 3 },
      { label: 'Reports', icon: BarChart3, count: 3 },
    ],
    items: {
      'Daily Operations': [
        { q: 'How to start the day?', options: ['Dashboard → Check overall school status', 'Review pending tasks and approvals', 'News Board shows what\'s happening now'] },
        { q: 'How to manage visitor entries?', options: ['Visitor Management → Today\'s Visitors', 'Pre-approved visitors auto-checked-in', 'Generate visitor badge/pass'] },
        { q: 'How to handle parent complaints?', options: ['Complaints → New Ticket', 'Assign to relevant department', 'Track resolution and response time'] },
      ],
      'Admissions': [
        { q: 'How to process a new admission?', options: ['Admissions → New Admission', 'Fill student + parent details', 'Generate credentials and fee structure'] },
        { q: 'How to bulk import students?', options: ['Admissions → Import → Upload CSV', 'Map columns to fields', 'Review and confirm'] },
        { q: 'How to manage waiting list?', options: ['Admissions → Waiting List', 'Sorted by date and priority', 'Convert to admission with one click'] },
      ],
      'Configuration': [
        { q: 'How to update school settings?', options: ['Settings → School Profile', 'Update name, logo, contact, timings', 'Changes reflect immediately'] },
        { q: 'How to manage academic year?', options: ['Settings → Academic Year → Create/Switch', 'Configure terms, exam schedule', 'Archive previous year data'] },
        { q: 'How to add/remove staff?', options: ['Staff → Add New / Deactivate', 'Set role and department', 'Generate login credentials'] },
      ],
      'Reports': [
        { q: 'What reports are available?', options: ['Attendance, Academic, Financial, HR, Compliance', 'Filter by date, class, department', 'Download as PDF/Excel/CSV'] },
        { q: 'How to generate MIS reports?', options: ['Reports → MIS → Select report type', 'Configure parameters and date range', 'Schedule for auto-generation'] },
        { q: 'How to share reports with management?', options: ['Reports → Share → Select recipients', 'Email or in-app notification', 'Schedule recurring shares'] },
      ],
    },
  },
  'hr-manager': {
    categories: [
      { label: 'Staff Management', icon: Briefcase, count: 3 },
      { label: 'Leave & Attendance', icon: ClipboardCheck, count: 3 },
      { label: 'Payroll', icon: DollarSign, count: 3 },
    ],
    items: {
      'Staff Management': [
        { q: 'How to onboard a new staff member?', options: ['Staff → Add New Employee', 'Fill personal, qualification, bank details', 'Generate login credentials and ID card'] },
        { q: 'How to manage staff documents?', options: ['Staff → Profile → Documents tab', 'Upload certificates, Aadhaar, PAN', 'Set expiry alerts for renewals'] },
        { q: 'How to handle staff transfers?', options: ['Staff → Transfer → Create Request', 'Select employee, reason, new department', 'Approval workflow auto-triggered'] },
      ],
      'Leave & Attendance': [
        { q: 'How to approve/reject leaves?', options: ['Leave → Pending Requests', 'Review reason and check leave balance', 'Approve, reject, or request modification'] },
        { q: 'How to check leave balances?', options: ['Leave → Balances → Search employee', 'Shows CL, SL, ML balances', 'Year-end carry-forward configured in settings'] },
        { q: 'How to generate attendance report?', options: ['Reports → Staff Attendance', 'Select month and department', 'Download for payroll processing'] },
      ],
      'Payroll': [
        { q: 'How to process monthly payroll?', options: ['Payroll → Run Payroll → Select month', 'System auto-calculates based on attendance', 'Review deductions → Approve → Generate slips'] },
        { q: 'How to handle salary advances?', options: ['Payroll → Advances → New Request', 'Set amount, EMI plan, and approval', 'Auto-deducted from future salaries'] },
        { q: 'How to generate Form 16?', options: ['Payroll → Tax → Generate Form 16', 'Select financial year', 'Bulk generate for all staff'] },
      ],
    },
  },
  'accounts-head': {
    categories: [
      { label: 'Fee Collection', icon: DollarSign, count: 3 },
      { label: 'Expenses', icon: Calculator, count: 3 },
      { label: 'Reports', icon: BarChart3, count: 3 },
    ],
    items: {
      'Fee Collection': [
        { q: 'How to record an offline payment?', options: ['Fees → Record Payment → Search student', 'Enter amount, mode (cash/cheque/DD)', 'Generate receipt immediately'] },
        { q: 'How to send fee reminders?', options: ['Fees → Defaulters → Select all → Send Reminder', 'Bulk SMS/push notification', 'Customize reminder message'] },
        { q: 'How to apply concession/waiver?', options: ['Fees → Student → Apply Concession', 'Select concession type and amount', 'Approval from Principal required'] },
      ],
      'Expenses': [
        { q: 'How to record an expense?', options: ['Expenses → New Entry', 'Select category, amount, vendor', 'Attach bill/invoice'] },
        { q: 'How to manage vendor payments?', options: ['Expenses → Vendors → Select vendor', 'View outstanding, schedule payment', 'Record payment with reference number'] },
        { q: 'How to track petty cash?', options: ['Expenses → Petty Cash → Daily Log', 'Record each withdrawal and purpose', 'Auto-reconcile at month end'] },
      ],
      'Reports': [
        { q: 'How to generate collection summary?', options: ['Reports → Fee Collection → Select period', 'Filter by class, payment mode, date', 'Shows collected vs outstanding'] },
        { q: 'How to prepare balance sheet?', options: ['Reports → Financial → Balance Sheet', 'Select date range', 'Income, expenses, and net position'] },
        { q: 'How to audit trail fee transactions?', options: ['Reports → Audit Log → Fees', 'Shows every transaction with timestamp', 'Filter by user, date, or transaction type'] },
      ],
    },
  },
  receptionist: {
    categories: [
      { label: 'Visitor Management', icon: Users, count: 3 },
      { label: 'Enquiries', icon: Phone, count: 3 },
      { label: 'Daily Tasks', icon: Zap, count: 3 },
    ],
    items: {
      'Visitor Management': [
        { q: 'How to register a walk-in visitor?', options: ['Visitors → Check In → Fill details', 'Take photo, issue visitor badge', 'Notify concerned staff member'] },
        { q: 'How to check out a visitor?', options: ['Visitors → Active → Search → Check Out', 'Or scan the visitor badge QR code', 'Auto-logs visit duration'] },
        { q: 'How to see today\'s visitor list?', options: ['Dashboard → Today\'s Visitors card', 'Visitors → Today tab', 'Filter by purpose or status'] },
      ],
      'Enquiries': [
        { q: 'How to log an admission enquiry?', options: ['Enquiries → New Enquiry', 'Fill parent details, student grade, source', 'Schedule follow-up if needed'] },
        { q: 'How to track enquiry follow-ups?', options: ['Enquiries → Due Today', 'Shows all pending follow-ups', 'Update status after each call/visit'] },
        { q: 'How to convert enquiry to admission?', options: ['Enquiries → Select → Convert to Admission', 'Pre-fills known details', 'Handover to Admissions department'] },
      ],
      'Daily Tasks': [
        { q: 'How to handle incoming calls?', options: ['Log in Call Register → New Call', 'Note caller, purpose, and action taken', 'Route to concerned department'] },
        { q: 'How to dispatch a courier/letter?', options: ['Dispatch → New Entry', 'Log recipient, content, tracking number', 'Mark as sent/received'] },
        { q: 'How to manage lost & found?', options: ['Lost & Found → Report Item', 'Upload photo and description', 'Match with claims and notify'] },
      ],
    },
  },
  'transport-head': {
    categories: [
      { label: 'Routes & Buses', icon: Bus, count: 3 },
      { label: 'Tracking', icon: Home, count: 3 },
      { label: 'Safety', icon: ShieldCheck, count: 3 },
    ],
    items: {
      'Routes & Buses': [
        { q: 'How to add/edit a bus route?', options: ['Routes → Edit Route → Add/remove stops', 'Set pickup times and driver assignment', 'Parents auto-notified of changes'] },
        { q: 'How to assign students to routes?', options: ['Routes → Select route → Add Students', 'Or from Student Profile → Transport tab', 'System checks capacity limits'] },
        { q: 'How to handle route delays?', options: ['Send alert → Select route → Broadcast delay', 'Parents of affected route get push notification', 'Log reason for records'] },
      ],
      'Tracking': [
        { q: 'How to track a bus in real-time?', options: ['Dashboard → Live Map', 'Shows all buses with current position', 'Click bus for ETA at each stop'] },
        { q: 'How to see trip history?', options: ['Reports → Trip History → Select date/bus', 'Shows route taken, stops, and timings', 'Compare against scheduled times'] },
        { q: 'How to monitor driver behavior?', options: ['Safety → Driver Scorecard', 'Shows speed violations, hard brakes', 'Set alerts for overspeeding'] },
      ],
      'Safety': [
        { q: 'How to handle a bus breakdown?', options: ['Emergency → Report Breakdown', 'System alerts admin + parents automatically', 'Arrange backup bus from available fleet'] },
        { q: 'How to ensure student boarding safety?', options: ['RFID/QR scan at boarding and alighting', 'Parent gets notification for each scan', 'Missing student alert if not scanned'] },
        { q: 'How to manage bus maintenance?', options: ['Fleet → Maintenance Schedule', 'Set periodic checkup reminders', 'Log maintenance history per vehicle'] },
      ],
    },
  },
  security: {
    categories: [
      { label: 'Gate Management', icon: ShieldCheck, count: 3 },
      { label: 'Visitor Entry', icon: Users, count: 3 },
      { label: 'Emergency', icon: Bell, count: 2 },
    ],
    items: {
      'Gate Management': [
        { q: 'How to log vehicle entry/exit?', options: ['Gate → Vehicle Log → Scan or enter number', 'System checks against registered vehicles', 'Unknown vehicles flagged for attention'] },
        { q: 'How to handle late student arrivals?', options: ['Gate → Late Entry → Scan student ID', 'Auto-marked as "Late" in attendance', 'Parent notified automatically'] },
        { q: 'How to manage early pickup?', options: ['Gate → Early Pickup → Verify parent ID', 'Parent must be in authorized list', 'Log reason and time'] },
      ],
      'Visitor Entry': [
        { q: 'How to verify a visitor?', options: ['Visitors → Verify → Check against pre-approved list', 'If not pre-approved, contact concerned staff', 'Issue temporary badge after approval'] },
        { q: 'How to handle delivery personnel?', options: ['Gate → Delivery → Log details', 'Direct to receiving department', 'Log exit time after delivery'] },
        { q: 'How to manage unauthorized entry?', options: ['Deny entry and log incident', 'Alert admin via emergency button', 'CCTV footage auto-saved for reference'] },
      ],
      'Emergency': [
        { q: 'How to trigger emergency alert?', options: ['Emergency button on Dashboard (red)', 'Sends alert to all staff instantly', 'Activates evacuation protocol'] },
        { q: 'How to report a security incident?', options: ['Incidents → New Report', 'Fill details, attach photos/CCTV clips', 'Auto-escalates to admin and principal'] },
      ],
    },
  },
  trustee: {
    categories: [
      { label: 'Financial Overview', icon: DollarSign, count: 3 },
      { label: 'Academic Performance', icon: BookOpen, count: 2 },
      { label: 'Strategic Reports', icon: BarChart3, count: 3 },
    ],
    items: {
      'Financial Overview': [
        { q: 'How to see revenue summary?', options: ['Dashboard → Financial Overview cards', 'Fee collection, outstanding, expenses', 'Compare month-on-month trends'] },
        { q: 'How to check budget utilization?', options: ['Finance → Budget → Utilization Report', 'Department-wise spending vs budget', 'Flag over-budget departments'] },
        { q: 'How to review major expenses?', options: ['Finance → Expenses → High Value tab', 'Shows expenses above threshold', 'Approval history and documentation'] },
      ],
      'Academic Performance': [
        { q: 'How to see school-wide academic health?', options: ['Academics → School Summary', 'Class-wise, subject-wise pass rates', 'Trend comparison across academic years'] },
        { q: 'How to compare with benchmarks?', options: ['Reports → Board Results Comparison', 'School average vs district/state average', 'Subject-wise gap analysis'] },
      ],
      'Strategic Reports': [
        { q: 'What MIS reports are available?', options: ['Reports → MIS Dashboard', 'Enrollment trends, retention rates', 'Staff ratios, infrastructure utilization'] },
        { q: 'How to see enrollment trends?', options: ['Reports → Admissions → Yearly Trend', 'New admissions vs withdrawals', 'Grade-wise and gender-wise breakdown'] },
        { q: 'How to schedule board reports?', options: ['Reports → Schedule → Set frequency', 'Select report types and recipients', 'Auto-delivered before board meetings'] },
      ],
    },
  },
  'account-manager': {
    categories: [
      { label: 'School Management', icon: Home, count: 3 },
      { label: 'Support Tickets', icon: Headphones, count: 3 },
      { label: 'Billing', icon: DollarSign, count: 2 },
    ],
    items: {
      'School Management': [
        { q: 'How to view my assigned schools?', options: ['Dashboard → My Schools list', 'Click school for detailed status', 'Health score shows overall usage'] },
        { q: 'How to onboard a new school?', options: ['Schools → Onboard New → Follow wizard', 'Configure modules, branding, users', 'Generate admin credentials'] },
        { q: 'How to modify school configuration?', options: ['Schools → Select → Settings', 'Update modules, user limits, features', 'Changes effective immediately'] },
      ],
      'Support Tickets': [
        { q: 'How to view pending tickets?', options: ['Support → My Tickets → Open', 'Sorted by priority and SLA', 'Click to view details and respond'] },
        { q: 'How to escalate a ticket?', options: ['Ticket → Escalate → Select level', 'Add notes for escalation reason', 'SLA timer adjusts accordingly'] },
        { q: 'How to track resolution metrics?', options: ['Reports → Support Metrics', 'Response time, resolution rate', 'Customer satisfaction scores'] },
      ],
      'Billing': [
        { q: 'How to check school subscription status?', options: ['Schools → Select → Billing tab', 'Shows plan, renewal date, usage', 'Send renewal reminder if due'] },
        { q: 'How to apply plan upgrade/downgrade?', options: ['Billing → Change Plan', 'Select new plan → Pro-rate calculation', 'Confirm and notify school admin'] },
      ],
    },
  },
};

// Fallback for roles without specific FAQs
const defaultFaqs = roleFaqs['principal'];

// ─── MAIN SUPPORT MODULE COMPONENT ──────────────────

export default function SupportModule({ theme, role = 'principal' }: { theme: Theme; role?: string }) {
  const faqData = roleFaqs[role] || defaultFaqs;
  const [chatMessages, setChatMessages] = useState([
    { from: 'bot', text: `Hello! I'm your Saaras.ai Support Assistant. How can I help you today?`, time: 'Now' },
  ]);
  const [userInput, setUserInput] = useState('');
  const [showFaq, setShowFaq] = useState(true);
  const [activeCategory, setActiveCategory] = useState(faqData.categories[0]?.label || 'Getting Started');

  // FAQ Management State
  const [showFaqManager, setShowFaqManager] = useState(false);
  const [showAddFaq, setShowAddFaq] = useState(false);
  const [newFaqQuestion, setNewFaqQuestion] = useState('');
  const [newFaqAnswer, setNewFaqAnswer] = useState('');
  const [newFaqCategory, setNewFaqCategory] = useState('');
  const [newFaqRoleSpecific, setNewFaqRoleSpecific] = useState(false);
  interface CustomFaq { id: number; question: string; answer: string; category: string; roleSpecific: boolean; views: number; addedOn: string; }
  const [customFaqs, setCustomFaqs] = useState<CustomFaq[]>([
    { id: 1, question: 'How to reset a student password?', answer: 'Go to Students module, select the student profile, click Actions > Reset Password.', category: 'Getting Started', roleSpecific: false, views: 45, addedOn: '10 Feb 2026' },
    { id: 2, question: 'Can parents view transport tracking?', answer: 'Yes, parents can see live bus location on the mobile app under Transport > Track Bus.', category: 'Communication', roleSpecific: true, views: 32, addedOn: '12 Feb 2026' },
    { id: 3, question: 'How to bulk assign homework?', answer: 'Go to Academics > Homework > Create Assignment, select multiple classes, and publish.', category: 'Academics', roleSpecific: true, views: 28, addedOn: '14 Feb 2026' },
  ]);
  const [editingFaqId, setEditingFaqId] = useState<number | null>(null);

  // Contextual Help State
  const [contextualHelpEnabled, setContextualHelpEnabled] = useState(true);
  const [contextualScreens] = useState([
    { screen: 'Dashboard', tooltips: 5, enabled: true },
    { screen: 'Students', tooltips: 3, enabled: true },
    { screen: 'Fees', tooltips: 4, enabled: true },
    { screen: 'Attendance', tooltips: 3, enabled: false },
    { screen: 'Timetable', tooltips: 2, enabled: true },
    { screen: 'Reports', tooltips: 4, enabled: false },
    { screen: 'Transport', tooltips: 2, enabled: true },
  ]);

  // Article Usage Analytics State
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [faqAnalytics] = useState({
    totalViews: 1248,
    topSearches: ['fee payment', 'attendance', 'homework', 'timetable', 'transport', 'leave'],
    zeroResults: ['biometric', 'hostel', 'alumni', 'canteen'],
    helpfulRatio: 78,
    recentlyAdded: 3,
  });

  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    setChatMessages(prev => [...prev, { from: 'user', text: userInput, time: 'Now' }]);
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        from: 'bot',
        text: 'Let me help you with that. Here are some options:\n\na) Check the relevant module in your sidebar\nb) Browse the FAQ Guide for step-by-step instructions\nc) Contact your school admin for configuration changes\n\nWould you like me to walk you through any specific feature?',
        time: 'Now'
      }]);
    }, 800);
    setUserInput('');
  };

  const roleLabel: Record<string, string> = {
    principal: 'Principal', teacher: 'Teacher', student: 'Student', parent: 'Parent',
    'vice-principal': 'Vice Principal', 'school-admin': 'School Admin', 'hr-manager': 'HR Manager',
    'accounts-head': 'Accounts Head', receptionist: 'Receptionist', 'transport-head': 'Transport Head',
    security: 'Security', trustee: 'Trustee', 'account-manager': 'Account Manager',
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${theme.highlight} flex items-center gap-2`}>
            <Headphones size={24} className="text-blue-400" /> Support
          </h1>
          <p className={`text-xs ${theme.iconColor}`}>AI-powered help desk for <strong>{roleLabel[role] || role}</strong> — answers from your school&apos;s internal documentation</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowFaq(true)} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${showFaq ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.highlight}`}`}>FAQ Guide</button>
          <button onClick={() => setShowFaq(false)} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${!showFaq ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.highlight}`}`}>Chat Support</button>
        </div>
      </div>

      {/* Plan badge */}
      <div className={`p-3 rounded-xl border-2 border-dashed ${theme.border} ${theme.accentBg} flex items-center gap-3`}>
        <Shield size={16} className="text-blue-400" />
        <div className="flex-1">
          <p className={`text-xs ${theme.highlight}`}><strong>Your plan:</strong> Enterprise — Chat Support included</p>
          <p className={`text-[10px] ${theme.iconColor}`}>Phase 2: Short videos &amp; audio guides · Phase 3: Natural language processing</p>
        </div>
        <span className="text-[10px] px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold">Active</span>
      </div>

      {/* ─── CONTEXTUAL HELP TOOLTIPS CONFIG ──────────── */}
      <div className={`${theme.cardBg} rounded-xl border ${theme.border} overflow-hidden`}>
        <div className={`px-4 py-3 flex items-center justify-between ${theme.accentBg}`}>
          <div className="flex items-center gap-2">
            <HelpCircle size={14} className="text-blue-400" />
            <h3 className={`text-xs font-bold ${theme.highlight}`}>Contextual Help Tooltips</h3>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-[10px] ${theme.iconColor}`}>{contextualHelpEnabled ? 'Enabled' : 'Disabled'}</span>
            <button onClick={() => setContextualHelpEnabled(!contextualHelpEnabled)}
              className={`w-9 h-5 rounded-full transition-all relative ${contextualHelpEnabled ? 'bg-emerald-500' : 'bg-gray-300'}`}>
              <div className="w-3.5 h-3.5 rounded-full bg-white shadow absolute top-[3px] transition-all"
                style={{ left: contextualHelpEnabled ? '18px' : '3px' }} />
            </button>
          </div>
        </div>
        {contextualHelpEnabled && (
          <div className="px-4 py-3 space-y-2">
            <div className="grid grid-cols-4 gap-2">
              {contextualScreens.map((scr) => (
                <div key={scr.screen} className={`p-2.5 rounded-lg ${scr.enabled ? theme.secondaryBg : 'opacity-50 ' + theme.secondaryBg} flex items-center justify-between`}>
                  <div>
                    <p className={`text-[10px] font-bold ${theme.highlight}`}>{scr.screen}</p>
                    <p className={`text-[9px] ${theme.iconColor}`}>{scr.tooltips} tooltips</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${scr.enabled ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                </div>
              ))}
            </div>
            {/* Tooltip Preview */}
            <div className={`p-3 rounded-lg border-2 border-dashed ${theme.border} ${theme.accentBg}`}>
              <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1`}>Tooltip Preview</p>
              <div className="flex items-start gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center shrink-0 mt-0.5">
                  <Info size={8} className="text-white" />
                </div>
                <div className={`p-2 rounded-lg bg-blue-50 border border-blue-200 max-w-xs`}>
                  <p className="text-[10px] text-blue-800 font-medium">Click on any stat card to view detailed drill-down analytics and export data as PDF or Excel.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ─── FAQ MANAGEMENT ──────────── */}
      <div className={`${theme.cardBg} rounded-xl border ${theme.border} overflow-hidden`}>
        <button onClick={() => setShowFaqManager(!showFaqManager)}
          className={`w-full px-4 py-3 flex items-center justify-between ${theme.buttonHover}`}>
          <div className="flex items-center gap-2">
            <Settings size={14} className={theme.iconColor} />
            <h3 className={`text-xs font-bold ${theme.highlight}`}>FAQ Management</h3>
            <span className={`text-[9px] px-2 py-0.5 rounded-full ${theme.secondaryBg} ${theme.iconColor} font-bold`}>{customFaqs.length} custom</span>
          </div>
          <ChevronDown size={14} className={`${theme.iconColor} transition-transform ${showFaqManager ? 'rotate-180' : ''}`} />
        </button>
        {showFaqManager && (
          <div className="px-4 pb-4 space-y-3">
            {/* Add FAQ Button */}
            <button onClick={() => setShowAddFaq(!showAddFaq)}
              className={`px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold flex items-center gap-1`}>
              <Plus size={12} /> Add FAQ
            </button>

            {/* Add FAQ Form */}
            {showAddFaq && (
              <div className={`p-3 rounded-xl border-2 border-dashed ${theme.border} space-y-2`}>
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Question</label>
                  <input value={newFaqQuestion} onChange={e => setNewFaqQuestion(e.target.value)} placeholder="Enter question..."
                    className={`w-full px-2 py-1.5 rounded-lg text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight}`} />
                </div>
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Answer</label>
                  <textarea value={newFaqAnswer} onChange={e => setNewFaqAnswer(e.target.value)} rows={2} placeholder="Enter answer..."
                    className={`w-full px-2 py-1.5 rounded-lg text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight} resize-none`} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Category</label>
                    <select value={newFaqCategory || faqData.categories[0]?.label} onChange={e => setNewFaqCategory(e.target.value)}
                      className={`w-full px-2 py-1.5 rounded-lg text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight}`}>
                      {faqData.categories.map(c => <option key={c.label} value={c.label}>{c.label}</option>)}
                    </select>
                  </div>
                  <div className="flex items-end gap-2 pb-1">
                    <button onClick={() => setNewFaqRoleSpecific(!newFaqRoleSpecific)}
                      className={`w-9 h-5 rounded-full transition-all relative ${newFaqRoleSpecific ? 'bg-emerald-500' : 'bg-gray-300'}`}>
                      <div className="w-3.5 h-3.5 rounded-full bg-white shadow absolute top-[3px] transition-all"
                        style={{ left: newFaqRoleSpecific ? '18px' : '3px' }} />
                    </button>
                    <span className={`text-xs ${theme.highlight}`}>Role-specific</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => {
                    if (!newFaqQuestion.trim() || !newFaqAnswer.trim()) return;
                    setCustomFaqs(prev => [...prev, {
                      id: prev.length + 1, question: newFaqQuestion, answer: newFaqAnswer,
                      category: newFaqCategory || faqData.categories[0]?.label || 'General',
                      roleSpecific: newFaqRoleSpecific, views: 0, addedOn: 'Just now',
                    }]);
                    setShowAddFaq(false); setNewFaqQuestion(''); setNewFaqAnswer(''); setNewFaqCategory('');
                  }} className={`px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}>Save FAQ</button>
                  <button onClick={() => setShowAddFaq(false)} className={`px-3 py-1.5 rounded-xl border ${theme.border} text-xs font-bold ${theme.highlight}`}>Cancel</button>
                </div>
              </div>
            )}

            {/* FAQ List */}
            <div className="space-y-2">
              {customFaqs.map((faq, idx) => (
                <div key={faq.id} className={`flex items-center gap-2 p-3 rounded-xl ${theme.secondaryBg}`}>
                  {/* Reorder buttons */}
                  <div className="flex flex-col gap-0.5">
                    <button onClick={() => {
                      if (idx === 0) return;
                      setCustomFaqs(prev => { const arr = [...prev]; [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]]; return arr; });
                    }} className={`p-0.5 rounded ${theme.buttonHover}`}><ChevronUp size={10} className={theme.iconColor} /></button>
                    <button onClick={() => {
                      if (idx === customFaqs.length - 1) return;
                      setCustomFaqs(prev => { const arr = [...prev]; [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]]; return arr; });
                    }} className={`p-0.5 rounded ${theme.buttonHover}`}><ChevronDown size={10} className={theme.iconColor} /></button>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-bold ${theme.highlight}`}>{faq.question}</p>
                    <p className={`text-[10px] ${theme.iconColor} truncate`}>{faq.answer}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${theme.accentBg} ${theme.iconColor} font-bold`}>{faq.category}</span>
                      {faq.roleSpecific && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold">Role-specific</span>}
                      <span className={`text-[9px] ${theme.iconColor} flex items-center gap-0.5`}><Eye size={7} /> {faq.views}</span>
                      <span className={`text-[9px] ${theme.iconColor} flex items-center gap-0.5`}><Clock size={7} /> {faq.addedOn}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className={`p-1.5 rounded-lg ${theme.buttonHover}`}><Edit2 size={10} className={theme.iconColor} /></button>
                    <button onClick={() => setCustomFaqs(prev => prev.filter(f => f.id !== faq.id))}
                      className="p-1.5 rounded-lg hover:bg-red-50"><Trash2 size={10} className="text-red-400" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ─── ARTICLE USAGE ANALYTICS ──────────── */}
      <div className={`${theme.cardBg} rounded-xl border ${theme.border} overflow-hidden`}>
        <button onClick={() => setShowAnalytics(!showAnalytics)}
          className={`w-full px-4 py-3 flex items-center justify-between ${theme.buttonHover}`}>
          <div className="flex items-center gap-2">
            <BarChart3 size={14} className={theme.iconColor} />
            <h3 className={`text-xs font-bold ${theme.highlight}`}>Article Usage Analytics</h3>
          </div>
          <ChevronDown size={14} className={`${theme.iconColor} transition-transform ${showAnalytics ? 'rotate-180' : ''}`} />
        </button>
        {showAnalytics && (
          <div className="px-4 pb-4 space-y-3">
            {/* Stats row */}
            <div className="grid grid-cols-4 gap-2">
              <div className={`p-2.5 rounded-lg ${theme.secondaryBg} text-center`}>
                <p className={`text-sm font-bold ${theme.highlight}`}>{faqAnalytics.totalViews.toLocaleString()}</p>
                <p className={`text-[9px] ${theme.iconColor}`}>Total Views</p>
              </div>
              <div className={`p-2.5 rounded-lg ${theme.secondaryBg} text-center`}>
                <p className={`text-sm font-bold text-emerald-600`}>{faqAnalytics.helpfulRatio}%</p>
                <p className={`text-[9px] ${theme.iconColor}`}>Helpful Ratio</p>
              </div>
              <div className={`p-2.5 rounded-lg ${theme.secondaryBg} text-center`}>
                <p className={`text-sm font-bold ${theme.highlight}`}>{faqAnalytics.recentlyAdded}</p>
                <p className={`text-[9px] ${theme.iconColor}`}>Added This Month</p>
              </div>
              <div className={`p-2.5 rounded-lg bg-amber-50 text-center`}>
                <p className={`text-sm font-bold text-amber-600`}>{faqAnalytics.zeroResults.length}</p>
                <p className={`text-[9px] text-amber-700`}>Zero-Result Queries</p>
              </div>
            </div>

            {/* Most Searched Topics */}
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1`}>Most Searched Topics</p>
              <div className="flex flex-wrap gap-1.5">
                {faqAnalytics.topSearches.map((t, i) => (
                  <span key={i} className={`text-[10px] px-2.5 py-1 rounded-full ${theme.secondaryBg} ${theme.highlight} font-medium flex items-center gap-1`}>
                    <Search size={8} /> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Zero-Result Searches */}
            <div>
              <p className={`text-[10px] font-bold text-amber-600 uppercase mb-1`}>Searches with No Results</p>
              <div className="flex flex-wrap gap-1.5">
                {faqAnalytics.zeroResults.map((t, i) => (
                  <span key={i} className="text-[10px] px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-medium">{t}</span>
                ))}
              </div>
            </div>

            {/* Per-FAQ Analytics */}
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1`}>FAQ Performance</p>
              <div className="space-y-1.5">
                {customFaqs.sort((a, b) => b.views - a.views).map(faq => (
                  <div key={faq.id} className={`flex items-center gap-2 p-2 rounded-lg ${theme.secondaryBg}`}>
                    <p className={`text-xs ${theme.highlight} flex-1 truncate`}>{faq.question}</p>
                    <span className={`text-[9px] ${theme.iconColor} flex items-center gap-0.5`}><Eye size={8} /> {faq.views}</span>
                    <div className="flex items-center gap-1">
                      <ThumbsUp size={8} className="text-emerald-500" />
                      <span className={`text-[9px] text-emerald-600 font-bold`}>82%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {showFaq ? (
        <div className="grid grid-cols-4 gap-4">
          {/* Category sidebar */}
          <div className="space-y-1">
            {faqData.categories.map(cat => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.label)}
                className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  activeCategory === cat.label ? `${theme.primary} text-white` : `${theme.iconColor} ${theme.buttonHover}`
                }`}
              >
                <cat.icon size={14} />
                <span className="flex-1 text-left">{cat.label}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${activeCategory === cat.label ? 'bg-white/20' : theme.secondaryBg}`}>{cat.count}</span>
              </button>
            ))}
          </div>

          {/* FAQ content */}
          <div className="col-span-3 space-y-3">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>{activeCategory}</h3>
            {(faqData.items[activeCategory] || []).map((faq, i) => (
              <div key={i} className={`${theme.cardBg} rounded-xl border ${theme.border} overflow-hidden`}>
                <div className={`px-4 py-3 ${theme.accentBg}`}>
                  <p className={`text-xs font-bold ${theme.highlight} flex items-center gap-2`}>
                    <MessageSquare size={12} className="text-blue-400" />
                    {faq.q}
                  </p>
                </div>
                <div className="px-4 py-3 space-y-1.5">
                  {faq.options.map((opt, j) => (
                    <div key={j} className={`flex items-start gap-2 text-xs ${theme.iconColor}`}>
                      <span className={`w-5 h-5 rounded-lg ${theme.secondaryBg} flex items-center justify-center shrink-0 text-[10px] font-bold ${theme.highlight}`}>{String.fromCharCode(65 + j)}</span>
                      <span>{opt}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden`}>
          <div className="flex items-center gap-3 px-4 py-3 bg-blue-500 text-white">
            <Bot size={18} />
            <div>
              <p className="text-xs font-bold">Saaras Support Bot</p>
              <p className="text-[10px] opacity-80">Powered by your school&apos;s internal documentation</p>
            </div>
            <span className="ml-auto text-[9px] bg-white/20 px-2 py-0.5 rounded-full">Online</span>
          </div>

          <div className="h-[350px] overflow-y-auto p-4 space-y-3">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] ${msg.from === 'user' ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.highlight}`} rounded-2xl ${msg.from === 'user' ? 'rounded-br-sm' : 'rounded-bl-sm'} px-4 py-2.5`}>
                  <p className="text-xs whitespace-pre-wrap">{msg.text}</p>
                  <p className={`text-[9px] mt-1 ${msg.from === 'user' ? 'text-white/50' : theme.iconColor}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={`px-4 py-3 border-t ${theme.border} flex items-center gap-2`}>
            <input
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask anything about the ERP..."
              className={`flex-1 px-4 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-blue-300 ${theme.highlight}`}
            />
            <button onClick={handleSendMessage} className={`p-2.5 rounded-xl ${theme.primary} text-white`}>
              <Send size={16} />
            </button>
          </div>

          {/* Quick prompts — role-specific */}
          <div className={`px-4 py-2 border-t ${theme.border} flex gap-2 overflow-x-auto`}>
            {(faqData.categories.slice(0, 4).map(c => c.label)).map(p => (
              <button
                key={p}
                onClick={() => { setUserInput(`Help me with ${p}`); }}
                className={`text-[10px] px-3 py-1.5 rounded-full border ${theme.border} ${theme.highlight} whitespace-nowrap hover:border-blue-400 transition-all`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
