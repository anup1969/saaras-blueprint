'use client';

import React, { useState } from 'react';
import BlueprintLayout from '@/components/BlueprintLayout';
import { StatCard, TabBar, StatusBadge, SearchBar, DataTable, Toggle } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  Home, Users, Calendar, Clock, Shield, Bus,
  MessageSquare, CheckCircle, XCircle, BarChart3, Search, Bell, Plus, X, Check,
  Eye, Edit, Download, Filter, ChevronDown, ChevronRight,
  Banknote, TrendingUp, AlertTriangle, FileText, Send, MapPin, Phone,
  Mail, Star, Award, BookOpen, ArrowRight, CreditCard,
  Receipt, UserCheck, User, GraduationCap, ClipboardCheck, BookMarked,
  AlertCircle, IndianRupee, Percent, TrendingDown, Notebook, PenTool,
  CircleDot, Camera, UserPlus, Navigation, Map, Info,
  PanelLeftClose, PanelLeftOpen
} from 'lucide-react';
import StakeholderProfile from '@/components/StakeholderProfile';

// ─── CHILD DATA ─────────────────────────────────────
interface ChildProfile {
  id: string;
  name: string;
  class: string;
  section: string;
  roll: number;
  photo: string;
  classTeacher: string;
  house: string;
  bloodGroup: string;
  admissionNo: string;
}

const childrenData: ChildProfile[] = [
  {
    id: 'child1',
    name: 'Aarav Patel',
    class: '10',
    section: 'A',
    roll: 1,
    photo: 'AP',
    classTeacher: 'Mrs. Sunita Sharma',
    house: 'Tagore House',
    bloodGroup: 'B+',
    admissionNo: 'SRS/2019/1042',
  },
  {
    id: 'child2',
    name: 'Ananya Patel',
    class: '6',
    section: 'B',
    roll: 8,
    photo: 'AP',
    classTeacher: 'Mr. Ramesh Iyer',
    house: 'Raman House',
    bloodGroup: 'O+',
    admissionNo: 'SRS/2023/2187',
  },
];

// ─── MOCK DATA PER CHILD ────────────────────────────
const attendanceData: Record<string, {
  monthly: { date: number; status: 'present' | 'absent' | 'late' | 'holiday' | 'future' }[];
  totalPresent: number; totalAbsent: number; totalLate: number; totalDays: number;
  percentage: number; classAverage: number; rank: number;
}> = {
  child1: {
    monthly: [
      ...[1,2,3].map(d => ({ date: d, status: 'present' as const })),
      { date: 4, status: 'absent' as const },
      ...[5,6,7].map(d => ({ date: d, status: 'present' as const })),
      { date: 8, status: 'late' as const },
      { date: 9, status: 'holiday' as const },
      { date: 10, status: 'present' as const },
      { date: 11, status: 'present' as const },
      { date: 12, status: 'present' as const },
      ...[13,14,15,16,17].map(d => ({ date: d, status: 'future' as const })),
      ...[18,19,20,21,22,23,24,25,26,27,28].map(d => ({ date: d, status: 'future' as const })),
    ],
    totalPresent: 174, totalAbsent: 6, totalLate: 4, totalDays: 192,
    percentage: 92.7, classAverage: 89.3, rank: 8,
  },
  child2: {
    monthly: [
      ...[1,2,3,4,5].map(d => ({ date: d, status: 'present' as const })),
      { date: 6, status: 'late' as const },
      ...[7,8].map(d => ({ date: d, status: 'present' as const })),
      { date: 9, status: 'holiday' as const },
      { date: 10, status: 'absent' as const },
      { date: 11, status: 'present' as const },
      { date: 12, status: 'present' as const },
      ...[13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28].map(d => ({ date: d, status: 'future' as const })),
    ],
    totalPresent: 179, totalAbsent: 3, totalLate: 2, totalDays: 192,
    percentage: 95.3, classAverage: 91.1, rank: 3,
  },
};

const academicsData: Record<string, {
  exams: { name: string; date: string; subjects: { subject: string; marks: number; total: number; grade: string; classAvg: number }[]; totalMarks: number; totalOutOf: number; rank: number; classStrength: number; remarks: string }[];
}> = {
  child1: {
    exams: [
      {
        name: 'Mid-Term Examination', date: 'Oct 2025',
        subjects: [
          { subject: 'Mathematics', marks: 82, total: 100, grade: 'A', classAvg: 68 },
          { subject: 'Science', marks: 78, total: 100, grade: 'B+', classAvg: 65 },
          { subject: 'English', marks: 88, total: 100, grade: 'A+', classAvg: 72 },
          { subject: 'Hindi', marks: 75, total: 100, grade: 'B+', classAvg: 70 },
          { subject: 'Social Studies', marks: 80, total: 100, grade: 'A', classAvg: 66 },
          { subject: 'Computer Science', marks: 92, total: 100, grade: 'A+', classAvg: 74 },
        ],
        totalMarks: 495, totalOutOf: 600, rank: 5, classStrength: 42,
        remarks: 'Excellent performance overall. Aarav shows strong analytical skills in Maths and CS. Needs slight improvement in Hindi vocabulary.',
      },
      {
        name: 'Unit Test 2', date: 'Sep 2025',
        subjects: [
          { subject: 'Mathematics', marks: 38, total: 50, grade: 'A', classAvg: 32 },
          { subject: 'Science', marks: 35, total: 50, grade: 'B+', classAvg: 30 },
          { subject: 'English', marks: 42, total: 50, grade: 'A+', classAvg: 36 },
          { subject: 'Hindi', marks: 33, total: 50, grade: 'B', classAvg: 34 },
          { subject: 'Social Studies', marks: 40, total: 50, grade: 'A', classAvg: 33 },
        ],
        totalMarks: 188, totalOutOf: 250, rank: 7, classStrength: 42,
        remarks: 'Good improvement from UT1. Keep up the consistency.',
      },
    ],
  },
  child2: {
    exams: [
      {
        name: 'Mid-Term Examination', date: 'Oct 2025',
        subjects: [
          { subject: 'Mathematics', marks: 90, total: 100, grade: 'A+', classAvg: 72 },
          { subject: 'Science', marks: 85, total: 100, grade: 'A', classAvg: 70 },
          { subject: 'English', marks: 92, total: 100, grade: 'A+', classAvg: 75 },
          { subject: 'Hindi', marks: 88, total: 100, grade: 'A+', classAvg: 73 },
          { subject: 'Social Studies', marks: 86, total: 100, grade: 'A', classAvg: 68 },
          { subject: 'Drawing', marks: 95, total: 100, grade: 'A+', classAvg: 80 },
        ],
        totalMarks: 536, totalOutOf: 600, rank: 2, classStrength: 38,
        remarks: 'Outstanding performance! Ananya is a very bright and hardworking student. She leads by example in class.',
      },
      {
        name: 'Unit Test 2', date: 'Sep 2025',
        subjects: [
          { subject: 'Mathematics', marks: 45, total: 50, grade: 'A+', classAvg: 35 },
          { subject: 'Science', marks: 42, total: 50, grade: 'A+', classAvg: 34 },
          { subject: 'English', marks: 46, total: 50, grade: 'A+', classAvg: 37 },
          { subject: 'Hindi', marks: 40, total: 50, grade: 'A', classAvg: 36 },
          { subject: 'Social Studies', marks: 43, total: 50, grade: 'A+', classAvg: 33 },
        ],
        totalMarks: 216, totalOutOf: 250, rank: 1, classStrength: 38,
        remarks: 'Consistently tops the class. Brilliant work across all subjects.',
      },
    ],
  },
};

const feesData: Record<string, {
  currentDue: number; totalPaid: number; totalAnnual: number; nextDueDate: string; nextDueAmount: number;
  payments: { id: string; date: string; description: string; amount: number; mode: string; receiptNo: string; status: string }[];
  upcoming: { installment: string; dueDate: string; amount: number; status: string }[];
  breakdown: { head: string; amount: number }[];
}> = {
  child1: {
    currentDue: 18500, totalPaid: 67500, totalAnnual: 86000, nextDueDate: '15 Mar 2026', nextDueAmount: 18500,
    payments: [
      { id: 'P1', date: '12 Jan 2026', description: 'Term 3 - Tuition Fee', amount: 15000, mode: 'UPI', receiptNo: 'REC-2026-3421', status: 'Paid' },
      { id: 'P2', date: '12 Jan 2026', description: 'Term 3 - Transport Fee', amount: 4500, mode: 'UPI', receiptNo: 'REC-2026-3422', status: 'Paid' },
      { id: 'P3', date: '10 Oct 2025', description: 'Term 2 - Tuition Fee', amount: 15000, mode: 'Net Banking', receiptNo: 'REC-2025-2845', status: 'Paid' },
      { id: 'P4', date: '10 Oct 2025', description: 'Term 2 - Transport Fee', amount: 4500, mode: 'Net Banking', receiptNo: 'REC-2025-2846', status: 'Paid' },
      { id: 'P5', date: '05 Jul 2025', description: 'Term 1 - Tuition Fee', amount: 15000, mode: 'Cheque', receiptNo: 'REC-2025-1920', status: 'Paid' },
      { id: 'P6', date: '05 Jul 2025', description: 'Term 1 - Transport Fee', amount: 4500, mode: 'Cheque', receiptNo: 'REC-2025-1921', status: 'Paid' },
      { id: 'P7', date: '01 Apr 2025', description: 'Admission Fee + Annual Charges', amount: 9000, mode: 'Cash', receiptNo: 'REC-2025-0340', status: 'Paid' },
    ],
    upcoming: [
      { installment: 'Term 4 - Tuition Fee', dueDate: '15 Mar 2026', amount: 15000, status: 'Upcoming' },
      { installment: 'Term 4 - Transport Fee', dueDate: '15 Mar 2026', amount: 3500, status: 'Upcoming' },
    ],
    breakdown: [
      { head: 'Tuition Fee', amount: 60000 },
      { head: 'Transport Fee', amount: 16000 },
      { head: 'Lab/Computer Fee', amount: 4000 },
      { head: 'Annual Charges', amount: 3000 },
      { head: 'Activity Fee', amount: 3000 },
    ],
  },
  child2: {
    currentDue: 0, totalPaid: 52000, totalAnnual: 68000, nextDueDate: '15 Mar 2026', nextDueAmount: 16000,
    payments: [
      { id: 'P1', date: '05 Jan 2026', description: 'Term 3 - Tuition Fee', amount: 12000, mode: 'UPI', receiptNo: 'REC-2026-3210', status: 'Paid' },
      { id: 'P2', date: '05 Jan 2026', description: 'Term 3 - Transport Fee', amount: 4000, mode: 'UPI', receiptNo: 'REC-2026-3211', status: 'Paid' },
      { id: 'P3', date: '08 Oct 2025', description: 'Term 2 - Tuition Fee', amount: 12000, mode: 'UPI', receiptNo: 'REC-2025-2701', status: 'Paid' },
      { id: 'P4', date: '08 Oct 2025', description: 'Term 2 - Transport Fee', amount: 4000, mode: 'UPI', receiptNo: 'REC-2025-2702', status: 'Paid' },
      { id: 'P5', date: '02 Jul 2025', description: 'Term 1 - Tuition + Transport', amount: 16000, mode: 'Net Banking', receiptNo: 'REC-2025-1755', status: 'Paid' },
      { id: 'P6', date: '01 Apr 2025', description: 'Admission Fee + Annual Charges', amount: 4000, mode: 'Cash', receiptNo: 'REC-2025-0215', status: 'Paid' },
    ],
    upcoming: [
      { installment: 'Term 4 - Tuition Fee', dueDate: '15 Mar 2026', amount: 12000, status: 'Upcoming' },
      { installment: 'Term 4 - Transport Fee', dueDate: '15 Mar 2026', amount: 4000, status: 'Upcoming' },
    ],
    breakdown: [
      { head: 'Tuition Fee', amount: 48000 },
      { head: 'Transport Fee', amount: 14000 },
      { head: 'Annual Charges', amount: 2500 },
      { head: 'Activity Fee', amount: 2000 },
      { head: 'Exam Fee', amount: 1500 },
    ],
  },
};

const homeworkData: Record<string, {
  items: { id: string; subject: string; title: string; assignedBy: string; assignedDate: string; dueDate: string; status: 'Pending' | 'Submitted' | 'Graded' | 'Overdue'; grade?: string; remarks?: string; description: string }[];
}> = {
  child1: {
    items: [
      { id: 'HW1', subject: 'Mathematics', title: 'Ch 8 - Trigonometry Practice Set', assignedBy: 'Mr. Vikram Desai', assignedDate: '10 Feb 2026', dueDate: '14 Feb 2026', status: 'Pending', description: 'Complete exercises 8.3 and 8.4 from NCERT textbook. Show all working steps.' },
      { id: 'HW2', subject: 'English', title: 'Essay: My Role Model', assignedBy: 'Mrs. Kavita Nair', assignedDate: '09 Feb 2026', dueDate: '13 Feb 2026', status: 'Pending', description: 'Write a 500-word essay on "My Role Model" with proper introduction, body, and conclusion.' },
      { id: 'HW3', subject: 'Science', title: 'Lab Report - Chemical Reactions', assignedBy: 'Dr. Meena Joshi', assignedDate: '07 Feb 2026', dueDate: '12 Feb 2026', status: 'Submitted', description: 'Submit the lab report for Experiment 5: Types of Chemical Reactions. Include observations and conclusions.' },
      { id: 'HW4', subject: 'Computer Science', title: 'Python Program - Sorting Algorithm', assignedBy: 'Mr. Arjun Rao', assignedDate: '06 Feb 2026', dueDate: '11 Feb 2026', status: 'Graded', grade: 'A', remarks: 'Well-structured code. Good use of comments.', description: 'Write a Python program implementing Bubble Sort and Selection Sort. Compare their time complexities.' },
      { id: 'HW5', subject: 'Hindi', title: 'Nibandh - Swachh Bharat Abhiyan', assignedBy: 'Mrs. Rekha Gupta', assignedDate: '05 Feb 2026', dueDate: '10 Feb 2026', status: 'Graded', grade: 'B+', remarks: 'Good content but some grammar errors. Work on Matra usage.', description: 'Write an essay in Hindi on Swachh Bharat Abhiyan in 400+ words.' },
      { id: 'HW6', subject: 'Social Studies', title: 'Map Work - Indian Rivers', assignedBy: 'Mr. Suresh Pillai', assignedDate: '03 Feb 2026', dueDate: '07 Feb 2026', status: 'Overdue', description: 'Mark major rivers of India on a physical map. Label origin points and mouths.' },
    ],
  },
  child2: {
    items: [
      { id: 'HW1', subject: 'Mathematics', title: 'Ch 5 - Fractions Worksheet', assignedBy: 'Mrs. Priya Menon', assignedDate: '10 Feb 2026', dueDate: '14 Feb 2026', status: 'Pending', description: 'Complete worksheet on Addition and Subtraction of Fractions. 20 problems.' },
      { id: 'HW2', subject: 'English', title: 'Paragraph Writing - My Favourite Festival', assignedBy: 'Ms. Divya Kapoor', assignedDate: '10 Feb 2026', dueDate: '13 Feb 2026', status: 'Submitted', description: 'Write a paragraph of 150 words on your favourite festival.' },
      { id: 'HW3', subject: 'Science', title: 'Draw and Label - Parts of a Flower', assignedBy: 'Mrs. Lakshmi Iyer', assignedDate: '08 Feb 2026', dueDate: '12 Feb 2026', status: 'Submitted', description: 'Draw a neat diagram of a flower and label all parts. Use colours.' },
      { id: 'HW4', subject: 'Hindi', title: 'Sulekh Practice - Lesson 10', assignedBy: 'Mrs. Asha Tiwari', assignedDate: '07 Feb 2026', dueDate: '11 Feb 2026', status: 'Graded', grade: 'A+', remarks: 'Beautiful handwriting! Keep it up Ananya!', description: 'Write the difficult words from Lesson 10 five times each in the Sulekh copy.' },
      { id: 'HW5', subject: 'Drawing', title: 'Landscape Painting', assignedBy: 'Mr. Raghav Sinha', assignedDate: '05 Feb 2026', dueDate: '10 Feb 2026', status: 'Graded', grade: 'A+', remarks: 'Exceptional use of colours and perspective!', description: 'Create a landscape painting using watercolours. A4 size.' },
    ],
  },
};

const communicationData: Record<string, {
  notices: { id: string; title: string; date: string; from: string; category: string; content: string; urgent: boolean }[];
  messages: { id: string; from: string; date: string; subject: string; content: string; read: boolean }[];
  ptm: { date: string; time: string; teacher: string; subject: string; status: string }[];
}> = {
  child1: {
    notices: [
      { id: 'N1', title: 'Annual Day Celebration - 2026', date: '11 Feb 2026', from: 'Principal Office', category: 'Event', content: 'Annual Day will be celebrated on 25th February 2026. Students of Class 10 are participating in the cultural program. Rehearsals begin from 15th Feb during PT period. Parents are cordially invited.', urgent: false },
      { id: 'N2', title: 'Board Exam Preparation - Special Classes', date: '08 Feb 2026', from: 'Academic Coordinator', category: 'Academic', content: 'Special revision classes for Class 10 board exams will start from 17th February. Timings: 7:30 AM - 8:30 AM (before school hours). Subjects covered: Maths, Science, English. Attendance is compulsory.', urgent: true },
      { id: 'N3', title: 'Parent-Teacher Meeting', date: '05 Feb 2026', from: 'Class Teacher', category: 'Meeting', content: 'PTM scheduled for 20th February 2026, Saturday, 9:00 AM - 1:00 PM. Please bring the student diary. Time slots will be shared via SMS.', urgent: false },
      { id: 'N4', title: 'School Picnic to Imagica', date: '01 Feb 2026', from: 'Activities Committee', category: 'Event', content: 'Annual school picnic for Classes 9-10 to Imagica Theme Park on 28th February. Cost: Rs. 1,500 per student (includes transport + entry + lunch). Consent form attached.', urgent: false },
    ],
    messages: [
      { id: 'M1', from: 'Mrs. Sunita Sharma (Class Teacher)', date: '11 Feb 2026', subject: 'Aarav\'s Science Project', content: 'Dear Mr. Patel, Aarav has been selected for the Inter-School Science Exhibition. He needs to prepare a working model on Renewable Energy. Please support him with materials. Submission deadline: 22nd Feb.', read: false },
      { id: 'M2', from: 'Mr. Vikram Desai (Maths)', date: '09 Feb 2026', subject: 'Extra Practice Needed', content: 'Aarav is doing well in Maths overall, but needs more practice in Trigonometry (Chapter 8). I recommend solving RS Aggarwal exercises daily for 30 minutes. Happy to assist during doubt-clearing sessions on Wednesdays.', read: true },
      { id: 'M3', from: 'Sports Department', date: '06 Feb 2026', subject: 'Cricket Team Selection', content: 'Congratulations! Aarav has been selected for the school cricket team for the inter-school tournament in March. Practice sessions: Mon/Wed/Fri 3:30-5:00 PM.', read: true },
    ],
    ptm: [
      { date: '20 Feb 2026', time: '10:30 AM', teacher: 'Mrs. Sunita Sharma', subject: 'Overall Review', status: 'Upcoming' },
      { date: '20 Feb 2026', time: '11:00 AM', teacher: 'Mr. Vikram Desai', subject: 'Mathematics', status: 'Upcoming' },
      { date: '20 Feb 2026', time: '11:30 AM', teacher: 'Dr. Meena Joshi', subject: 'Science', status: 'Upcoming' },
    ],
  },
  child2: {
    notices: [
      { id: 'N1', title: 'Annual Day Celebration - 2026', date: '11 Feb 2026', from: 'Principal Office', category: 'Event', content: 'Annual Day will be celebrated on 25th February 2026. Ananya has been selected for the group dance performance. Costume details will be shared soon.', urgent: false },
      { id: 'N2', title: 'Inter-House Drawing Competition', date: '09 Feb 2026', from: 'Art Department', category: 'Competition', content: 'Inter-house drawing competition for Classes 5-7 on 18th February. Topic will be revealed on the day. Bring your own drawing materials.', urgent: false },
      { id: 'N3', title: 'Parent-Teacher Meeting', date: '05 Feb 2026', from: 'Class Teacher', category: 'Meeting', content: 'PTM scheduled for 22nd February 2026, Saturday, 9:00 AM - 12:00 PM. Please bring the student diary.', urgent: false },
    ],
    messages: [
      { id: 'M1', from: 'Mr. Ramesh Iyer (Class Teacher)', date: '10 Feb 2026', subject: 'Ananya\'s Academic Progress', content: 'Dear Mr. Patel, Ananya continues to excel in all subjects. She has been nominated for the Best Student Award this term. Very proud of her dedication and behaviour in class.', read: false },
      { id: 'M2', from: 'Mrs. Priya Menon (Maths)', date: '07 Feb 2026', subject: 'Math Olympiad Registration', content: 'Ananya is eligible for the National Math Olympiad. Registration deadline is 20th Feb. Fee: Rs. 250. Please confirm if you\'d like to register her.', read: true },
    ],
    ptm: [
      { date: '22 Feb 2026', time: '09:30 AM', teacher: 'Mr. Ramesh Iyer', subject: 'Overall Review', status: 'Upcoming' },
      { date: '22 Feb 2026', time: '10:00 AM', teacher: 'Mrs. Priya Menon', subject: 'Mathematics', status: 'Upcoming' },
    ],
  },
};

const transportData: Record<string, {
  busNo: string; routeNo: string; routeName: string;
  driverName: string; driverPhone: string; conductorName: string; conductorPhone: string;
  vehicleNo: string; capacity: number;
  pickupStop: string; pickupTime: string; dropStop: string; dropTime: string;
  stops: { name: string; time: string; isCurrent: boolean; isChild: boolean }[];
  estimatedArrival: string;
}> = {
  child1: {
    busNo: 'Bus 7', routeNo: 'R-07', routeName: 'Satellite - Prahlad Nagar - SG Highway',
    driverName: 'Ramji Chauhan', driverPhone: '+91 98765 43210', conductorName: 'Sunil Yadav', conductorPhone: '+91 98765 43211',
    vehicleNo: 'GJ-01-XX-4567', capacity: 42,
    pickupStop: 'Prahlad Nagar Garden', pickupTime: '7:15 AM', dropStop: 'Prahlad Nagar Garden', dropTime: '2:45 PM',
    stops: [
      { name: 'Satellite BRTS', time: '7:00 AM', isCurrent: false, isChild: false },
      { name: 'Jodhpur Cross Roads', time: '7:08 AM', isCurrent: false, isChild: false },
      { name: 'Prahlad Nagar Garden', time: '7:15 AM', isCurrent: false, isChild: true },
      { name: 'Sindhu Bhavan Road', time: '7:22 AM', isCurrent: true, isChild: false },
      { name: 'SG Highway - Sola', time: '7:30 AM', isCurrent: false, isChild: false },
      { name: 'School Gate', time: '7:40 AM', isCurrent: false, isChild: false },
    ],
    estimatedArrival: '7:40 AM (On Time)',
  },
  child2: {
    busNo: 'Bus 7', routeNo: 'R-07', routeName: 'Satellite - Prahlad Nagar - SG Highway',
    driverName: 'Ramji Chauhan', driverPhone: '+91 98765 43210', conductorName: 'Sunil Yadav', conductorPhone: '+91 98765 43211',
    vehicleNo: 'GJ-01-XX-4567', capacity: 42,
    pickupStop: 'Prahlad Nagar Garden', pickupTime: '7:15 AM', dropStop: 'Prahlad Nagar Garden', dropTime: '2:45 PM',
    stops: [
      { name: 'Satellite BRTS', time: '7:00 AM', isCurrent: false, isChild: false },
      { name: 'Jodhpur Cross Roads', time: '7:08 AM', isCurrent: false, isChild: false },
      { name: 'Prahlad Nagar Garden', time: '7:15 AM', isCurrent: false, isChild: true },
      { name: 'Sindhu Bhavan Road', time: '7:22 AM', isCurrent: true, isChild: false },
      { name: 'SG Highway - Sola', time: '7:30 AM', isCurrent: false, isChild: false },
      { name: 'School Gate', time: '7:40 AM', isCurrent: false, isChild: false },
    ],
    estimatedArrival: '7:40 AM (On Time)',
  },
};

const pickupAuthData: Record<string, {
  persons: { id: string; name: string; relation: string; phone: string; aadhaarLast4: string; isDefault: boolean; addedOn: string }[];
}> = {
  child1: {
    persons: [
      { id: 'PU1', name: 'Rajesh Patel', relation: 'Father', phone: '+91 98250 12345', aadhaarLast4: '7842', isDefault: true, addedOn: '01 Apr 2025' },
      { id: 'PU2', name: 'Meena Patel', relation: 'Mother', phone: '+91 98250 12346', aadhaarLast4: '3156', isDefault: false, addedOn: '01 Apr 2025' },
      { id: 'PU3', name: 'Suresh Patel', relation: 'Grandfather', phone: '+91 97120 56789', aadhaarLast4: '9023', isDefault: false, addedOn: '15 Jun 2025' },
      { id: 'PU4', name: 'Kiran Shah', relation: 'Uncle (Mama)', phone: '+91 99780 34567', aadhaarLast4: '6714', isDefault: false, addedOn: '20 Aug 2025' },
    ],
  },
  child2: {
    persons: [
      { id: 'PU1', name: 'Rajesh Patel', relation: 'Father', phone: '+91 98250 12345', aadhaarLast4: '7842', isDefault: true, addedOn: '01 Apr 2025' },
      { id: 'PU2', name: 'Meena Patel', relation: 'Mother', phone: '+91 98250 12346', aadhaarLast4: '3156', isDefault: false, addedOn: '01 Apr 2025' },
      { id: 'PU3', name: 'Suresh Patel', relation: 'Grandfather', phone: '+91 97120 56789', aadhaarLast4: '9023', isDefault: false, addedOn: '15 Jun 2025' },
    ],
  },
};

// ─── MODULE SIDEBAR ────────────────────────────────
const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'attendance', label: 'Attendance', icon: ClipboardCheck },
  { id: 'academics', label: 'Academics', icon: GraduationCap },
  { id: 'fees', label: 'Fees', icon: IndianRupee },
  { id: 'homework', label: 'Homework', icon: BookMarked },
  { id: 'communication', label: 'Communication', icon: MessageSquare },
  { id: 'transport', label: 'Transport', icon: Bus },
  { id: 'pickup', label: 'Pickup Auth', icon: Shield },
];

// ─── CHILD SELECTOR ─────────────────────────────────
function ChildSelector({ children: childList, selected, onChange, theme }: {
  children: ChildProfile[]; selected: string; onChange: (id: string) => void; theme: Theme;
}) {
  return (
    <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-3 mb-4`}>
      <div className="flex items-center gap-2 mb-2">
        <Users size={14} className={theme.iconColor} />
        <p className={`text-xs font-bold ${theme.iconColor} uppercase`}>Select Child</p>
      </div>
      <div className="flex gap-2">
        {childList.map((child) => (
          <button
            key={child.id}
            onClick={() => onChange(child.id)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all ${
              selected === child.id
                ? `${theme.primary} text-white border-transparent shadow-md`
                : `${theme.border} ${theme.buttonHover} ${theme.iconColor}`
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
              selected === child.id ? 'bg-white/20 text-white' : `${theme.secondaryBg} ${theme.highlight}`
            }`}>
              {child.photo}
            </div>
            <div className="text-left">
              <p className={`text-sm font-bold ${selected === child.id ? 'text-white' : theme.highlight}`}>{child.name}</p>
              <p className={`text-[10px] ${selected === child.id ? 'text-white/70' : theme.iconColor}`}>
                Class {child.class}-{child.section} | Roll #{child.roll}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── DASHBOARD HOME ─────────────────────────────────
function DashboardHome({ theme, child, onProfileClick }: { theme: Theme; child: ChildProfile; onProfileClick: () => void }) {
  const att = attendanceData[child.id];
  const fees = feesData[child.id];
  const hw = homeworkData[child.id];
  const comm = communicationData[child.id];
  const pendingHW = hw.items.filter(h => h.status === 'Pending' || h.status === 'Overdue').length;
  const unreadMsg = comm.messages.filter(m => !m.read).length;

  return (
    <div className="space-y-4">
      {/* Child Profile Card */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl ${theme.primary} text-white flex items-center justify-center text-xl font-bold shadow-lg`}>
            {child.photo}
          </div>
          <div className="flex-1">
            <h2 className={`text-lg font-bold ${theme.highlight}`}>{child.name}</h2>
            <div className="flex gap-4 mt-1">
              <span className={`text-xs ${theme.iconColor}`}>Class {child.class}-{child.section}</span>
              <span className={`text-xs ${theme.iconColor}`}>Roll #{child.roll}</span>
              <span className={`text-xs ${theme.iconColor}`}>Adm: {child.admissionNo}</span>
              <span className={`text-xs ${theme.iconColor}`}>{child.house}</span>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-xs ${theme.iconColor}`}>Class Teacher</p>
            <p className={`text-sm font-bold ${theme.highlight}`}>{child.classTeacher}</p>
          </div>
          <button onClick={onProfileClick} title="My Profile" className={`w-9 h-9 rounded-full ${theme.primary} text-white flex items-center justify-center text-xs font-bold hover:opacity-90 transition-opacity`}>RM</button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-3">
        <StatCard icon={ClipboardCheck} label="Today's Attendance" value="Present" color="bg-emerald-500" sub={`${att.percentage}% overall`} theme={theme} />
        <StatCard icon={BookMarked} label="Pending Homework" value={pendingHW} color="bg-amber-500" sub={pendingHW > 0 ? 'Needs attention' : 'All done!'} theme={theme} />
        <StatCard icon={IndianRupee} label="Fee Dues" value={fees.currentDue > 0 ? `Rs.${fees.currentDue.toLocaleString('en-IN')}` : 'No Dues'} color={fees.currentDue > 0 ? 'bg-red-500' : 'bg-emerald-500'} sub={fees.currentDue > 0 ? `Due: ${fees.nextDueDate}` : 'All paid up'} theme={theme} />
        <StatCard icon={MessageSquare} label="Unread Messages" value={unreadMsg} color="bg-blue-500" sub={unreadMsg > 0 ? 'New messages' : 'All read'} theme={theme} />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-4">
        {/* Upcoming Exams / Events */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Upcoming Events</h3>
            <Calendar size={14} className={theme.iconColor} />
          </div>
          <div className="space-y-2">
            {[
              { event: 'PTM - Parent Teacher Meeting', date: child.id === 'child1' ? '20 Feb 2026' : '22 Feb 2026', type: 'Meeting' },
              { event: 'Annual Day Celebration', date: '25 Feb 2026', type: 'Event' },
              ...(child.id === 'child1' ? [
                { event: 'Board Exam Revision Classes Start', date: '17 Feb 2026', type: 'Academic' },
                { event: 'School Picnic - Imagica', date: '28 Feb 2026', type: 'Event' },
                { event: 'Pre-Board Examination', date: '05 Mar 2026', type: 'Exam' },
              ] : [
                { event: 'Drawing Competition', date: '18 Feb 2026', type: 'Competition' },
                { event: 'Unit Test 3', date: '10 Mar 2026', type: 'Exam' },
              ]),
            ].map((e, i) => (
              <div key={i} className={`flex items-center gap-3 p-2 rounded-xl ${theme.secondaryBg}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-bold ${
                  e.type === 'Exam' ? 'bg-red-500' : e.type === 'Meeting' ? 'bg-purple-500' : e.type === 'Academic' ? 'bg-blue-500' : 'bg-emerald-500'
                }`}>
                  {e.date.split(' ')[0]}
                </div>
                <div className="flex-1">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{e.event}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{e.date}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  e.type === 'Exam' ? 'bg-red-100 text-red-700' : e.type === 'Meeting' ? 'bg-purple-100 text-purple-700' : e.type === 'Academic' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                }`}>{e.type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Communications */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Recent Messages</h3>
            <Mail size={14} className={theme.iconColor} />
          </div>
          <div className="space-y-2">
            {comm.messages.map((msg) => (
              <div key={msg.id} className={`p-3 rounded-xl ${theme.secondaryBg} ${!msg.read ? `border-l-2 border-blue-500` : ''}`}>
                <div className="flex items-center justify-between mb-1">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{msg.subject}</p>
                  {!msg.read && <span className="w-2 h-2 bg-blue-500 rounded-full" />}
                </div>
                <p className={`text-[10px] ${theme.iconColor} mb-1`}>{msg.from}</p>
                <p className={`text-[10px] ${theme.iconColor} line-clamp-2`}>{msg.content}</p>
                <p className={`text-[10px] ${theme.iconColor} mt-1 opacity-60`}>{msg.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Links + Homework */}
      <div className="grid grid-cols-2 gap-4">
        {/* Pending Homework */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Homework Status</h3>
            <BookMarked size={14} className={theme.iconColor} />
          </div>
          <div className="space-y-2">
            {hw.items.slice(0, 4).map((item) => (
              <div key={item.id} className={`flex items-center gap-3 p-2 rounded-xl ${theme.secondaryBg}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-bold ${
                  item.status === 'Pending' ? 'bg-amber-500' : item.status === 'Submitted' ? 'bg-blue-500' : item.status === 'Graded' ? 'bg-emerald-500' : 'bg-red-500'
                }`}>
                  {item.subject.substring(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-bold ${theme.highlight} truncate`}>{item.title}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{item.subject} | Due: {item.dueDate}</p>
                </div>
                <StatusBadge status={item.status} theme={theme} />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Quick Links</h3>
            <ArrowRight size={14} className={theme.iconColor} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Download Report Card', icon: Download, color: 'bg-blue-500' },
              { label: 'Pay Fees Online', icon: CreditCard, color: 'bg-emerald-500' },
              { label: 'View Timetable', icon: Calendar, color: 'bg-purple-500' },
              { label: 'Track School Bus', icon: Bus, color: 'bg-amber-500' },
              { label: 'Apply for Leave', icon: FileText, color: 'bg-orange-500' },
              { label: 'View Syllabus', icon: BookOpen, color: 'bg-indigo-500' },
              { label: 'School Gallery', icon: Camera, color: 'bg-pink-500' },
              { label: 'Help & Support', icon: Info, color: 'bg-slate-500' },
            ].map((link, i) => (
              <button key={i} className={`flex items-center gap-2 p-3 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} transition-all text-left`}>
                <div className={`w-7 h-7 rounded-lg ${link.color} text-white flex items-center justify-center`}>
                  <link.icon size={12} />
                </div>
                <span className={`text-[11px] font-medium ${theme.highlight}`}>{link.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fee Summary Bar */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <IndianRupee size={14} className="text-emerald-500" />
              <div>
                <p className={`text-[10px] ${theme.iconColor}`}>Total Annual Fee</p>
                <p className={`text-sm font-bold ${theme.highlight}`}>Rs.{fees.totalAnnual.toLocaleString('en-IN')}</p>
              </div>
            </div>
            <div className={`w-px h-8 ${theme.border}`} />
            <div>
              <p className={`text-[10px] ${theme.iconColor}`}>Paid</p>
              <p className="text-sm font-bold text-emerald-600">Rs.{fees.totalPaid.toLocaleString('en-IN')}</p>
            </div>
            <div className={`w-px h-8 ${theme.border}`} />
            <div>
              <p className={`text-[10px] ${theme.iconColor}`}>Remaining</p>
              <p className={`text-sm font-bold ${fees.currentDue > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                Rs.{(fees.totalAnnual - fees.totalPaid).toLocaleString('en-IN')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Progress bar */}
            <div className="w-40">
              <div className={`h-2 rounded-full ${theme.secondaryBg}`}>
                <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${(fees.totalPaid / fees.totalAnnual) * 100}%` }} />
              </div>
              <p className={`text-[10px] ${theme.iconColor} mt-1 text-right`}>{Math.round((fees.totalPaid / fees.totalAnnual) * 100)}% paid</p>
            </div>
            {fees.currentDue > 0 && (
              <button className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition-all">
                Pay Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ATTENDANCE MODULE ──────────────────────────────
function AttendanceModule({ theme, child }: { theme: Theme; child: ChildProfile }) {
  const att = attendanceData[child.id];
  const [selectedMonth] = useState('February 2026');

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // Feb 2026 starts on Sunday
  const firstDayOffset = 0;

  const statusColor = (s: string) => {
    switch (s) {
      case 'present': return 'bg-emerald-500 text-white';
      case 'absent': return 'bg-red-500 text-white';
      case 'late': return 'bg-amber-500 text-white';
      case 'holiday': return 'bg-purple-200 text-purple-700';
      case 'future': return `${theme.secondaryBg} ${theme.iconColor}`;
      default: return `${theme.secondaryBg} ${theme.iconColor}`;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className={`text-lg font-bold ${theme.highlight}`}>Attendance Record</h2>
        <div className="flex items-center gap-2">
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}>
            <Calendar size={12} /> {selectedMonth}
            <ChevronDown size={12} />
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-5 gap-3">
        <StatCard icon={CheckCircle} label="Days Present" value={att.totalPresent} color="bg-emerald-500" theme={theme} />
        <StatCard icon={XCircle} label="Days Absent" value={att.totalAbsent} color="bg-red-500" theme={theme} />
        <StatCard icon={Clock} label="Days Late" value={att.totalLate} color="bg-amber-500" theme={theme} />
        <StatCard icon={Percent} label="Attendance %" value={`${att.percentage}%`} color="bg-blue-500" sub={`Class Avg: ${att.classAverage}%`} theme={theme} />
        <StatCard icon={Award} label="Class Rank" value={`#${att.rank}`} color="bg-purple-500" sub={`of 42 students`} theme={theme} />
      </div>

      {/* Calendar Grid */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-4`}>{selectedMonth}</h3>
        <div className="grid grid-cols-7 gap-2">
          {dayNames.map(d => (
            <div key={d} className={`text-center text-[10px] font-bold ${theme.iconColor} py-1`}>{d}</div>
          ))}
          {/* Empty cells for offset */}
          {Array.from({ length: firstDayOffset }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {/* Day cells */}
          {att.monthly.map((day) => (
            <div
              key={day.date}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center text-xs font-bold transition-all ${statusColor(day.status)}`}
              title={`${day.date} Feb - ${day.status}`}
            >
              <span>{day.date}</span>
              {day.status !== 'future' && (
                <span className="text-[8px] mt-0.5 opacity-80">
                  {day.status === 'present' ? 'P' : day.status === 'absent' ? 'A' : day.status === 'late' ? 'L' : 'H'}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-dashed" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
          {[
            { label: 'Present', color: 'bg-emerald-500' },
            { label: 'Absent', color: 'bg-red-500' },
            { label: 'Late', color: 'bg-amber-500' },
            { label: 'Holiday', color: 'bg-purple-200' },
            { label: 'Upcoming', color: 'bg-gray-200' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded ${l.color}`} />
              <span className={`text-[10px] ${theme.iconColor}`}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison with class */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Attendance Comparison</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <span className={`text-xs ${theme.highlight}`}>{child.name}</span>
              <span className={`text-xs font-bold ${theme.highlight}`}>{att.percentage}%</span>
            </div>
            <div className={`h-3 rounded-full ${theme.secondaryBg}`}>
              <div className="h-3 rounded-full bg-emerald-500 transition-all" style={{ width: `${att.percentage}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className={`text-xs ${theme.iconColor}`}>Class {child.class}-{child.section} Average</span>
              <span className={`text-xs font-bold ${theme.iconColor}`}>{att.classAverage}%</span>
            </div>
            <div className={`h-3 rounded-full ${theme.secondaryBg}`}>
              <div className="h-3 rounded-full bg-blue-400 transition-all" style={{ width: `${att.classAverage}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ACADEMICS MODULE ───────────────────────────────
function AcademicsModule({ theme, child }: { theme: Theme; child: ChildProfile }) {
  const acad = academicsData[child.id];
  const [selectedExam, setSelectedExam] = useState(0);
  const exam = acad.exams[selectedExam];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className={`text-lg font-bold ${theme.highlight}`}>Academic Performance</h2>
        <button className={`flex items-center gap-1 px-3 py-1.5 rounded-lg ${theme.secondaryBg} text-xs font-bold ${theme.iconColor}`}>
          <Download size={12} /> Download Report Card
        </button>
      </div>

      {/* Exam Selector */}
      <TabBar tabs={acad.exams.map(e => e.name)} active={exam.name} onChange={(t) => setSelectedExam(acad.exams.findIndex(e => e.name === t))} theme={theme} />

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-3">
        <StatCard icon={Award} label="Total Marks" value={`${exam.totalMarks}/${exam.totalOutOf}`} color="bg-blue-500" sub={`${Math.round((exam.totalMarks / exam.totalOutOf) * 100)}%`} theme={theme} />
        <StatCard icon={TrendingUp} label="Class Rank" value={`#${exam.rank}`} color="bg-purple-500" sub={`of ${exam.classStrength} students`} theme={theme} />
        <StatCard icon={Star} label="Best Subject" value={exam.subjects.sort((a, b) => b.marks / b.total - a.marks / a.total)[0].subject} color="bg-emerald-500" sub={`${exam.subjects.sort((a, b) => b.marks / b.total - a.marks / a.total)[0].marks}/${exam.subjects.sort((a, b) => b.marks / b.total - a.marks / a.total)[0].total}`} theme={theme} />
        <StatCard icon={AlertCircle} label="Needs Work" value={exam.subjects.sort((a, b) => a.marks / a.total - b.marks / b.total)[0].subject} color="bg-amber-500" sub={`${exam.subjects.sort((a, b) => a.marks / a.total - b.marks / b.total)[0].marks}/${exam.subjects.sort((a, b) => a.marks / a.total - b.marks / b.total)[0].total}`} theme={theme} />
      </div>

      {/* Subject-wise Results Table */}
      <DataTable
        headers={['Subject', 'Marks Obtained', 'Total', 'Percentage', 'Grade', 'Class Average', 'vs Average']}
        rows={exam.subjects.map(s => [
          <span key="sub" className={`font-bold ${theme.highlight}`}>{s.subject}</span>,
          <span key="marks" className={`font-bold ${theme.highlight}`}>{s.marks}</span>,
          <span key="total" className={theme.iconColor}>{s.total}</span>,
          <span key="pct" className={`font-bold ${s.marks / s.total >= 0.75 ? 'text-emerald-600' : s.marks / s.total >= 0.5 ? 'text-amber-600' : 'text-red-600'}`}>
            {Math.round((s.marks / s.total) * 100)}%
          </span>,
          <span key="grade" className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
            s.grade.startsWith('A') ? 'bg-emerald-100 text-emerald-700' : s.grade.startsWith('B') ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
          }`}>{s.grade}</span>,
          <span key="avg" className={theme.iconColor}>{s.classAvg}</span>,
          <span key="diff" className={`text-xs font-bold ${s.marks - s.classAvg >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            {s.marks - s.classAvg >= 0 ? '+' : ''}{s.marks - s.classAvg}
          </span>,
        ])}
        theme={theme}
      />

      {/* Performance Bars */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Subject-wise Performance</h3>
        <div className="space-y-3">
          {exam.subjects.map(s => (
            <div key={s.subject}>
              <div className="flex justify-between mb-1">
                <span className={`text-xs ${theme.highlight}`}>{s.subject}</span>
                <span className={`text-xs font-bold ${theme.highlight}`}>{s.marks}/{s.total}</span>
              </div>
              <div className="relative">
                <div className={`h-2.5 rounded-full ${theme.secondaryBg}`}>
                  <div
                    className={`h-2.5 rounded-full transition-all ${
                      s.marks / s.total >= 0.75 ? 'bg-emerald-500' : s.marks / s.total >= 0.5 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${(s.marks / s.total) * 100}%` }}
                  />
                </div>
                {/* Class average marker */}
                <div
                  className="absolute top-0 h-2.5 w-0.5 bg-blue-600 rounded"
                  style={{ left: `${(s.classAvg / s.total) * 100}%` }}
                  title={`Class Avg: ${s.classAvg}`}
                />
              </div>
            </div>
          ))}
          <div className="flex items-center gap-4 mt-2 pt-2 border-t border-dashed" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-1.5 rounded bg-emerald-500" />
              <span className={`text-[10px] ${theme.iconColor}`}>Student Marks</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-0.5 h-3 rounded bg-blue-600" />
              <span className={`text-[10px] ${theme.iconColor}`}>Class Average</span>
            </div>
          </div>
        </div>
      </div>

      {/* Teacher Remarks */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center gap-2 mb-2">
          <MessageSquare size={14} className={theme.iconColor} />
          <h3 className={`text-sm font-bold ${theme.highlight}`}>Teacher Remarks</h3>
        </div>
        <p className={`text-xs ${theme.iconColor} leading-relaxed italic`}>&#34;{exam.remarks}&#34;</p>
        <p className={`text-[10px] ${theme.iconColor} mt-2 opacity-60`}>- Class Teacher, {exam.date}</p>
      </div>
    </div>
  );
}

// ─── FEES MODULE ────────────────────────────────────
function FeesModule({ theme, child }: { theme: Theme; child: ChildProfile }) {
  const fees = feesData[child.id];
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className={`text-lg font-bold ${theme.highlight}`}>Fees &amp; Payments</h2>
        {fees.currentDue > 0 && (
          <button className="flex items-center gap-1 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-lg">
            <CreditCard size={14} /> Pay Now - Rs.{fees.currentDue.toLocaleString('en-IN')}
          </button>
        )}
      </div>

      <TabBar tabs={['Overview', 'Payment History', 'Upcoming', 'Fee Structure']} active={activeTab} onChange={setActiveTab} theme={theme} />

      {activeTab === 'Overview' && (
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-3">
            <StatCard icon={IndianRupee} label="Total Annual Fee" value={`Rs.${fees.totalAnnual.toLocaleString('en-IN')}`} color="bg-blue-500" theme={theme} />
            <StatCard icon={CheckCircle} label="Total Paid" value={`Rs.${fees.totalPaid.toLocaleString('en-IN')}`} color="bg-emerald-500" sub={`${Math.round((fees.totalPaid / fees.totalAnnual) * 100)}% paid`} theme={theme} />
            <StatCard icon={AlertTriangle} label="Current Due" value={fees.currentDue > 0 ? `Rs.${fees.currentDue.toLocaleString('en-IN')}` : 'Nil'} color={fees.currentDue > 0 ? 'bg-red-500' : 'bg-emerald-500'} theme={theme} />
            <StatCard icon={Calendar} label="Next Due Date" value={fees.nextDueDate} color="bg-purple-500" sub={`Rs.${fees.nextDueAmount.toLocaleString('en-IN')}`} theme={theme} />
          </div>

          {/* Progress */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Payment Progress</h3>
            <div className={`h-4 rounded-full ${theme.secondaryBg} overflow-hidden`}>
              <div className="h-4 rounded-full bg-emerald-500 transition-all flex items-center justify-center" style={{ width: `${(fees.totalPaid / fees.totalAnnual) * 100}%` }}>
                <span className="text-[9px] font-bold text-white">{Math.round((fees.totalPaid / fees.totalAnnual) * 100)}%</span>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <span className={`text-[10px] ${theme.iconColor}`}>Rs.0</span>
              <span className={`text-[10px] ${theme.iconColor}`}>Rs.{fees.totalAnnual.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Upcoming installments preview */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Upcoming Installments</h3>
            {fees.upcoming.map((inst, i) => (
              <div key={i} className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg} ${i > 0 ? 'mt-2' : ''}`}>
                <div className="flex items-center gap-3">
                  <Calendar size={14} className={theme.iconColor} />
                  <div>
                    <p className={`text-xs font-bold ${theme.highlight}`}>{inst.installment}</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>Due: {inst.dueDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${theme.highlight}`}>Rs.{inst.amount.toLocaleString('en-IN')}</p>
                  <StatusBadge status={inst.status} theme={theme} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Payment History' && (
        <DataTable
          headers={['Date', 'Description', 'Amount', 'Mode', 'Receipt No.', 'Status', 'Action']}
          rows={fees.payments.map(p => [
            <span key="dt" className={`text-xs ${theme.iconColor}`}>{p.date}</span>,
            <span key="desc" className={`font-bold ${theme.highlight}`}>{p.description}</span>,
            <span key="amt" className={`font-bold ${theme.highlight}`}>Rs.{p.amount.toLocaleString('en-IN')}</span>,
            <span key="mode" className={`text-xs ${theme.iconColor}`}>{p.mode}</span>,
            <span key="rec" className={`text-xs font-mono ${theme.primaryText}`}>{p.receiptNo}</span>,
            <StatusBadge key="st" status={p.status} theme={theme} />,
            <button key="dl" className={`flex items-center gap-1 text-xs ${theme.primaryText} font-bold`}>
              <Download size={12} /> Receipt
            </button>,
          ])}
          theme={theme}
        />
      )}

      {activeTab === 'Upcoming' && (
        <div className="space-y-3">
          {fees.upcoming.map((inst, i) => (
            <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`text-sm font-bold ${theme.highlight}`}>{inst.installment}</h3>
                  <p className={`text-xs ${theme.iconColor} mt-1`}>Due Date: {inst.dueDate}</p>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${theme.highlight}`}>Rs.{inst.amount.toLocaleString('en-IN')}</p>
                  <button className="mt-1 px-4 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition-all">
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'Fee Structure' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-4`}>Annual Fee Breakdown - Class {child.class}</h3>
          <div className="space-y-3">
            {fees.breakdown.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    i === 0 ? 'bg-blue-500' : i === 1 ? 'bg-emerald-500' : i === 2 ? 'bg-purple-500' : i === 3 ? 'bg-amber-500' : 'bg-pink-500'
                  }`} />
                  <span className={`text-sm ${theme.highlight}`}>{item.head}</span>
                </div>
                <span className={`text-sm font-bold ${theme.highlight}`}>Rs.{item.amount.toLocaleString('en-IN')}</span>
              </div>
            ))}
            <div className={`pt-3 mt-3 border-t ${theme.border} flex items-center justify-between`}>
              <span className={`text-sm font-bold ${theme.highlight}`}>Total Annual Fee</span>
              <span className={`text-lg font-bold ${theme.primaryText}`}>Rs.{fees.totalAnnual.toLocaleString('en-IN')}</span>
            </div>
          </div>
          {/* Visual bar */}
          <div className="flex rounded-full h-3 overflow-hidden mt-4">
            {fees.breakdown.map((item, i) => (
              <div
                key={i}
                className={`h-3 ${
                  i === 0 ? 'bg-blue-500' : i === 1 ? 'bg-emerald-500' : i === 2 ? 'bg-purple-500' : i === 3 ? 'bg-amber-500' : 'bg-pink-500'
                }`}
                style={{ width: `${(item.amount / fees.totalAnnual) * 100}%` }}
                title={`${item.head}: Rs.${item.amount.toLocaleString('en-IN')}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── HOMEWORK MODULE ────────────────────────────────
function HomeworkModule({ theme, child }: { theme: Theme; child: ChildProfile }) {
  const hw = homeworkData[child.id];
  const [activeTab, setActiveTab] = useState('All');
  const [expandedHW, setExpandedHW] = useState<string | null>(null);

  const statusColors: Record<string, string> = {
    Pending: 'bg-amber-100 text-amber-700',
    Submitted: 'bg-blue-100 text-blue-700',
    Graded: 'bg-emerald-100 text-emerald-700',
    Overdue: 'bg-red-100 text-red-700',
  };

  const filtered = activeTab === 'All' ? hw.items : hw.items.filter(h => h.status === activeTab);

  const counts = {
    All: hw.items.length,
    Pending: hw.items.filter(h => h.status === 'Pending').length,
    Submitted: hw.items.filter(h => h.status === 'Submitted').length,
    Graded: hw.items.filter(h => h.status === 'Graded').length,
    Overdue: hw.items.filter(h => h.status === 'Overdue').length,
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className={`text-lg font-bold ${theme.highlight}`}>Homework</h2>
        <div className="flex gap-2">
          {Object.entries(counts).filter(([, v]) => v > 0).map(([k, v]) => (
            <span key={k} className={`text-[10px] px-2 py-1 rounded-lg font-bold ${
              k === 'Overdue' ? 'bg-red-100 text-red-700' : k === 'Pending' ? 'bg-amber-100 text-amber-700' : `${theme.secondaryBg} ${theme.iconColor}`
            }`}>
              {k}: {v}
            </span>
          ))}
        </div>
      </div>

      <TabBar tabs={['All', 'Pending', 'Submitted', 'Graded', 'Overdue']} active={activeTab} onChange={setActiveTab} theme={theme} />

      <div className="space-y-3">
        {filtered.map((item) => (
          <div key={item.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden transition-all`}>
            <button
              onClick={() => setExpandedHW(expandedHW === item.id ? null : item.id)}
              className="w-full p-4 flex items-center gap-4 text-left"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold ${
                item.status === 'Pending' ? 'bg-amber-500' : item.status === 'Submitted' ? 'bg-blue-500' : item.status === 'Graded' ? 'bg-emerald-500' : 'bg-red-500'
              }`}>
                {item.subject.substring(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-bold ${theme.highlight}`}>{item.title}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className={`text-[10px] ${theme.iconColor}`}>{item.subject}</span>
                  <span className={`text-[10px] ${theme.iconColor}`}>By: {item.assignedBy}</span>
                  <span className={`text-[10px] ${theme.iconColor}`}>Due: {item.dueDate}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {item.grade && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">{item.grade}</span>
                )}
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${statusColors[item.status]}`}>{item.status}</span>
                <ChevronRight size={14} className={`${theme.iconColor} transition-transform ${expandedHW === item.id ? 'rotate-90' : ''}`} />
              </div>
            </button>

            {expandedHW === item.id && (
              <div className={`px-4 pb-4 border-t ${theme.border}`}>
                <div className={`mt-3 p-3 rounded-xl ${theme.secondaryBg}`}>
                  <p className={`text-xs font-bold ${theme.highlight} mb-1`}>Assignment Details</p>
                  <p className={`text-xs ${theme.iconColor} leading-relaxed`}>{item.description}</p>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <span className={`text-[10px] ${theme.iconColor}`}>Assigned: {item.assignedDate}</span>
                  <span className={`text-[10px] ${theme.iconColor}`}>Due: {item.dueDate}</span>
                </div>
                {item.remarks && (
                  <div className={`mt-2 p-2 rounded-lg border-l-2 border-emerald-500 ${theme.secondaryBg}`}>
                    <p className={`text-[10px] font-bold ${theme.highlight}`}>Teacher Feedback:</p>
                    <p className={`text-[10px] ${theme.iconColor} italic`}>&#34;{item.remarks}&#34;</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-8 text-center`}>
            <CheckCircle size={32} className="text-emerald-500 mx-auto mb-2" />
            <p className={`text-sm font-bold ${theme.highlight}`}>No homework in this category</p>
            <p className={`text-xs ${theme.iconColor} mt-1`}>All caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── COMMUNICATION MODULE ───────────────────────────
function CommunicationModule({ theme, child }: { theme: Theme; child: ChildProfile }) {
  const comm = communicationData[child.id];
  const [activeTab, setActiveTab] = useState('Notices');
  const [expandedNotice, setExpandedNotice] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className={`text-lg font-bold ${theme.highlight}`}>Communication</h2>
        <button className={`flex items-center gap-1 px-3 py-1.5 rounded-lg ${theme.primary} text-white text-xs font-bold`}>
          <Send size={12} /> Message Teacher
        </button>
      </div>

      <TabBar tabs={['Notices', 'Messages', 'PTM Schedule', 'Compose']} active={activeTab} onChange={setActiveTab} theme={theme} />

      {activeTab === 'Notices' && (
        <div className="space-y-3">
          {comm.notices.map((notice) => (
            <div key={notice.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden ${notice.urgent ? 'border-l-2 border-l-red-500' : ''}`}>
              <button
                onClick={() => setExpandedNotice(expandedNotice === notice.id ? null : notice.id)}
                className="w-full p-4 flex items-center gap-4 text-left"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  notice.urgent ? 'bg-red-500 text-white' : `${theme.secondaryBg} ${theme.iconColor}`
                }`}>
                  {notice.urgent ? <AlertTriangle size={16} /> : <Bell size={16} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-bold ${theme.highlight}`}>{notice.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-[10px] ${theme.iconColor}`}>{notice.from}</span>
                    <span className={`text-[10px] ${theme.iconColor}`}>{notice.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    notice.category === 'Event' ? 'bg-emerald-100 text-emerald-700' :
                    notice.category === 'Academic' ? 'bg-blue-100 text-blue-700' :
                    notice.category === 'Meeting' ? 'bg-purple-100 text-purple-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>{notice.category}</span>
                  {notice.urgent && <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-red-100 text-red-700">Urgent</span>}
                  <ChevronRight size={14} className={`${theme.iconColor} transition-transform ${expandedNotice === notice.id ? 'rotate-90' : ''}`} />
                </div>
              </button>
              {expandedNotice === notice.id && (
                <div className={`px-4 pb-4 border-t ${theme.border}`}>
                  <p className={`text-xs ${theme.iconColor} leading-relaxed mt-3`}>{notice.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'Messages' && (
        <div className="space-y-3">
          {comm.messages.map((msg) => (
            <div key={msg.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 ${!msg.read ? 'border-l-2 border-l-blue-500' : ''}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full ${theme.secondaryBg} flex items-center justify-center`}>
                    <User size={14} className={theme.iconColor} />
                  </div>
                  <div>
                    <p className={`text-xs font-bold ${theme.highlight}`}>{msg.from}</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>{msg.date}</p>
                  </div>
                </div>
                {!msg.read && <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-100 text-blue-700">New</span>}
              </div>
              <h4 className={`text-sm font-bold ${theme.highlight} mb-1`}>{msg.subject}</h4>
              <p className={`text-xs ${theme.iconColor} leading-relaxed`}>{msg.content}</p>
              <div className="flex items-center gap-2 mt-3">
                <button className={`px-3 py-1 rounded-lg ${theme.primary} text-white text-[10px] font-bold`}>Reply</button>
                <button className={`px-3 py-1 rounded-lg ${theme.secondaryBg} ${theme.iconColor} text-[10px] font-bold`}>Mark Read</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'PTM Schedule' && (
        <div className="space-y-3">
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={16} className={theme.primaryText} />
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Upcoming Parent-Teacher Meeting</h3>
            </div>
            <div className="space-y-3">
              {comm.ptm.map((slot, i) => (
                <div key={i} className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${theme.cardBg} border ${theme.border} flex flex-col items-center justify-center`}>
                      <span className={`text-[10px] font-bold ${theme.highlight}`}>{slot.time.split(' ')[0]}</span>
                      <span className={`text-[8px] ${theme.iconColor}`}>{slot.time.split(' ')[1]}</span>
                    </div>
                    <div>
                      <p className={`text-xs font-bold ${theme.highlight}`}>{slot.teacher}</p>
                      <p className={`text-[10px] ${theme.iconColor}`}>{slot.subject}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] ${theme.iconColor}`}>{slot.date}</span>
                    <StatusBadge status={slot.status} theme={theme} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <p className={`text-xs ${theme.iconColor} leading-relaxed`}>
              <Info size={12} className="inline mr-1" />
              Please arrive 10 minutes before your first slot. Carry the student diary. Time slots are approximately 20 minutes each. If you need to reschedule, please contact the class teacher.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'Compose' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-4`}>Send Message to Teacher</h3>
          <div className="space-y-3">
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>To</label>
              <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`}>
                <option>Select Teacher...</option>
                <option>{child.classTeacher} (Class Teacher)</option>
                {child.id === 'child1' ? (
                  <>
                    <option>Mr. Vikram Desai (Mathematics)</option>
                    <option>Dr. Meena Joshi (Science)</option>
                    <option>Mrs. Kavita Nair (English)</option>
                    <option>Mr. Arjun Rao (Computer Science)</option>
                    <option>Mrs. Rekha Gupta (Hindi)</option>
                  </>
                ) : (
                  <>
                    <option>Mrs. Priya Menon (Mathematics)</option>
                    <option>Mrs. Lakshmi Iyer (Science)</option>
                    <option>Ms. Divya Kapoor (English)</option>
                    <option>Mrs. Asha Tiwari (Hindi)</option>
                  </>
                )}
              </select>
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Subject</label>
              <input
                placeholder="Enter message subject..."
                className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`}
              />
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Message</label>
              <textarea
                placeholder="Type your message here..."
                rows={5}
                className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none resize-none`}
              />
            </div>
            <div className="flex items-center justify-between">
              <p className={`text-[10px] ${theme.iconColor}`}>Messages are reviewed by the school before delivery.</p>
              <button className={`flex items-center gap-1 px-4 py-2 ${theme.primary} text-white text-xs font-bold rounded-xl`}>
                <Send size={12} /> Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── TRANSPORT MODULE ───────────────────────────────
function TransportModule({ theme, child }: { theme: Theme; child: ChildProfile }) {
  const tr = transportData[child.id];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className={`text-lg font-bold ${theme.highlight}`}>Transport &amp; Bus Tracking</h2>
        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-1">
          <CircleDot size={10} /> Bus In Transit
        </span>
      </div>

      {/* Bus Info Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center">
              <Bus size={18} />
            </div>
            <div>
              <p className={`text-lg font-bold ${theme.highlight}`}>{tr.busNo}</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Route: {tr.routeNo}</p>
              <p className={`text-[10px] ${theme.iconColor}`}>{tr.vehicleNo}</p>
            </div>
          </div>
        </div>
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
              <User size={18} />
            </div>
            <div>
              <p className={`text-sm font-bold ${theme.highlight}`}>{tr.driverName}</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Driver</p>
              <p className={`text-[10px] ${theme.primaryText} font-bold`}>{tr.driverPhone}</p>
            </div>
          </div>
        </div>
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500 text-white flex items-center justify-center">
              <User size={18} />
            </div>
            <div>
              <p className={`text-sm font-bold ${theme.highlight}`}>{tr.conductorName}</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Conductor</p>
              <p className={`text-[10px] ${theme.primaryText} font-bold`}>{tr.conductorPhone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Route + Map Area */}
      <div className="grid grid-cols-2 gap-4">
        {/* Route Details */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-1`}>Route: {tr.routeName}</h3>
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-[10px] ${theme.iconColor}`}>Pickup: {tr.pickupStop} at {tr.pickupTime}</span>
            <span className={`text-[10px] ${theme.iconColor}`}>|</span>
            <span className={`text-[10px] ${theme.iconColor}`}>Drop: {tr.dropStop} at {tr.dropTime}</span>
          </div>

          {/* Stops Timeline */}
          <div className="space-y-0">
            {tr.stops.map((stop, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    stop.isCurrent ? 'border-emerald-500 bg-emerald-500' :
                    stop.isChild ? 'border-blue-500 bg-blue-500' :
                    'border-gray-300 bg-white'
                  }`}>
                    {stop.isCurrent && <Navigation size={8} className="text-white" />}
                    {stop.isChild && <User size={8} className="text-white" />}
                  </div>
                  {i < tr.stops.length - 1 && (
                    <div className={`w-0.5 h-8 ${stop.isCurrent ? 'bg-emerald-300' : 'bg-gray-200'}`} />
                  )}
                </div>
                <div className={`pb-4 ${stop.isChild ? '-mt-0.5' : '-mt-0.5'}`}>
                  <p className={`text-xs font-bold ${stop.isChild ? theme.primaryText : stop.isCurrent ? 'text-emerald-600' : theme.highlight}`}>
                    {stop.name}
                    {stop.isChild && <span className="ml-1 text-[10px] font-bold text-blue-600">(Your Stop)</span>}
                    {stop.isCurrent && <span className="ml-1 text-[10px] font-bold text-emerald-600">(Bus Here)</span>}
                  </p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{stop.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-2 p-2 rounded-xl ${theme.secondaryBg} flex items-center justify-between`}>
            <span className={`text-xs ${theme.iconColor}`}>Estimated Arrival at School</span>
            <span className={`text-xs font-bold text-emerald-600`}>{tr.estimatedArrival}</span>
          </div>
        </div>

        {/* Live Tracking Map Placeholder */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex flex-col`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Live Tracking</h3>
          <div className={`flex-1 rounded-xl ${theme.secondaryBg} border ${theme.border} flex flex-col items-center justify-center min-h-[280px]`}>
            <Map size={48} className={theme.iconColor} />
            <p className={`text-sm font-bold ${theme.highlight} mt-3`}>Live Map View</p>
            <p className={`text-[10px] ${theme.iconColor} mt-1 text-center px-8`}>
              Real-time GPS tracking will be displayed here. The bus location updates every 30 seconds during transit hours.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                <CircleDot size={8} /> Bus Location
              </span>
              <span className="flex items-center gap-1 text-[10px] font-bold text-blue-600">
                <MapPin size={8} /> Your Stop
              </span>
              <span className="flex items-center gap-1 text-[10px] font-bold text-red-600">
                <MapPin size={8} /> School
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <button className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>
              <Phone size={12} /> Call Driver
            </button>
            <button className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-xl ${theme.secondaryBg} ${theme.iconColor} text-xs font-bold`}>
              <Phone size={12} /> Call Conductor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PICKUP AUTH MODULE ─────────────────────────────
function PickupAuthModule({ theme, child }: { theme: Theme; child: ChildProfile }) {
  const pickup = pickupAuthData[child.id];
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className={`text-lg font-bold ${theme.highlight}`}>Pickup Authorization</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg ${theme.primary} text-white text-xs font-bold`}
        >
          {showAddForm ? <X size={12} /> : <Plus size={12} />}
          {showAddForm ? 'Cancel' : 'Add Person'}
        </button>
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center gap-2 mb-3">
          <Shield size={14} className={theme.primaryText} />
          <p className={`text-xs ${theme.iconColor} leading-relaxed`}>
            Only authorized persons listed below can pick up {child.name} from school. School security verifies identity before releasing the child. Changes require 24 hours to take effect.
          </p>
        </div>
      </div>

      {/* Add Person Form */}
      {showAddForm && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 border-l-2 border-l-blue-500`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-4`}>Add Authorized Person</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Full Name *</label>
              <input placeholder="Enter full name" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`} />
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Relation to Child *</label>
              <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`}>
                <option>Select Relation...</option>
                <option>Uncle (Kaka)</option>
                <option>Uncle (Mama)</option>
                <option>Aunt (Kaki)</option>
                <option>Aunt (Mami)</option>
                <option>Aunt (Foi)</option>
                <option>Grandparent</option>
                <option>Family Driver</option>
                <option>Neighbour</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Phone Number *</label>
              <input placeholder="+91 XXXXX XXXXX" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`} />
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Aadhaar Last 4 Digits *</label>
              <input placeholder="XXXX" maxLength={4} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`} />
            </div>
            <div className="col-span-2">
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Photo (for verification)</label>
              <div className={`border-2 border-dashed ${theme.border} rounded-xl p-4 text-center cursor-pointer ${theme.buttonHover} transition-all`}>
                <Camera size={20} className={`${theme.iconColor} mx-auto mb-1`} />
                <p className={`text-xs ${theme.iconColor}`}>Click to upload photo or drag and drop</p>
                <p className={`text-[10px] ${theme.iconColor} mt-0.5 opacity-60`}>JPG, PNG up to 2MB</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 mt-4">
            <button onClick={() => setShowAddForm(false)} className={`px-4 py-2 rounded-xl ${theme.secondaryBg} ${theme.iconColor} text-xs font-bold`}>
              Cancel
            </button>
            <button className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>
              Submit for Approval
            </button>
          </div>
        </div>
      )}

      {/* Authorized Persons List */}
      <div className="space-y-3">
        {pickup.persons.map((person) => (
          <div key={person.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex items-center gap-4`}>
            {/* Photo Placeholder */}
            <div className={`w-14 h-14 rounded-xl ${theme.secondaryBg} flex items-center justify-center border ${theme.border}`}>
              <User size={24} className={theme.iconColor} />
            </div>

            {/* Details */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className={`text-sm font-bold ${theme.highlight}`}>{person.name}</p>
                {person.isDefault && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-700">Primary</span>
                )}
              </div>
              <div className="flex items-center gap-4 mt-1">
                <span className={`text-xs ${theme.iconColor}`}>{person.relation}</span>
                <span className={`text-xs ${theme.iconColor} flex items-center gap-1`}><Phone size={10} /> {person.phone}</span>
                <span className={`text-xs ${theme.iconColor}`}>Aadhaar: ****{person.aadhaarLast4}</span>
              </div>
              <p className={`text-[10px] ${theme.iconColor} mt-1 opacity-60`}>Added: {person.addedOn}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center gap-1">
                <CheckCircle size={10} /> Verified
              </span>
              {!person.isDefault && (
                <button className={`p-2 rounded-lg ${theme.secondaryBg} ${theme.iconColor} hover:text-red-500 transition-all`} title="Remove">
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Pickup Log */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Recent Pickup Log</h3>
        <DataTable
          headers={['Date', 'Time', 'Picked Up By', 'Relation', 'Verified By']}
          rows={[
            [
              <span key="d" className={theme.iconColor}>12 Feb 2026</span>,
              <span key="t" className={theme.highlight}>2:50 PM</span>,
              <span key="n" className={`font-bold ${theme.highlight}`}>Rajesh Patel</span>,
              <span key="r" className={theme.iconColor}>Father</span>,
              <span key="v" className={theme.iconColor}>Gate Security - Raju</span>,
            ],
            [
              <span key="d" className={theme.iconColor}>11 Feb 2026</span>,
              <span key="t" className={theme.highlight}>2:45 PM</span>,
              <span key="n" className={`font-bold ${theme.highlight}`}>Meena Patel</span>,
              <span key="r" className={theme.iconColor}>Mother</span>,
              <span key="v" className={theme.iconColor}>Gate Security - Raju</span>,
            ],
            [
              <span key="d" className={theme.iconColor}>10 Feb 2026</span>,
              <span key="t" className={theme.highlight}>3:10 PM</span>,
              <span key="n" className={`font-bold ${theme.highlight}`}>School Bus</span>,
              <span key="r" className={theme.iconColor}>Transport</span>,
              <span key="v" className={theme.iconColor}>Conductor - Sunil</span>,
            ],
            [
              <span key="d" className={theme.iconColor}>07 Feb 2026</span>,
              <span key="t" className={theme.highlight}>2:55 PM</span>,
              <span key="n" className={`font-bold ${theme.highlight}`}>Suresh Patel</span>,
              <span key="r" className={theme.iconColor}>Grandfather</span>,
              <span key="v" className={theme.iconColor}>Gate Security - Manoj</span>,
            ],
          ]}
          theme={theme}
        />
      </div>
    </div>
  );
}

// ─── MAIN PARENT DASHBOARD ──────────────────────────
function ParentDashboard({ theme, themeIdx, onThemeChange }: { theme?: Theme; themeIdx?: number; onThemeChange?: (idx: number) => void }) {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [selectedChild, setSelectedChild] = useState('child1');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  if (!theme) return null;

  const child = childrenData.find(c => c.id === selectedChild)!;

  return (
    <div className="flex gap-4 -m-6">
      {/* Module sidebar */}
      <div className={`${sidebarCollapsed ? 'w-14' : 'w-48'} ${theme.cardBg} border-r ${theme.border} min-h-screen p-2 space-y-0.5 shrink-0 transition-all duration-200`}>
        <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} px-2 py-2`}>
          {!sidebarCollapsed && <p className={`text-[10px] font-bold ${theme.iconColor} uppercase px-1`}>Parent Portal</p>}
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

        {/* Parent Info */}
        {!sidebarCollapsed && (
          <div className={`mt-4 pt-4 border-t ${theme.border} px-3`}>
            <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-2`}>Logged in as</p>
            <div className={`p-2 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-xs font-bold ${theme.highlight}`}>Rajesh Patel</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Father</p>
              <p className={`text-[10px] ${theme.iconColor}`}>+91 98250 12345</p>
            </div>
          </div>
        )}
      </div>

      {/* Module content */}
      <div className="flex-1 p-6 space-y-0 overflow-x-hidden">
        {/* Child Selector - Always visible at top */}
        <ChildSelector selected={selectedChild} onChange={setSelectedChild} theme={theme}>
          {childrenData}
        </ChildSelector>

        {activeModule === 'dashboard' && <DashboardHome theme={theme} child={child} onProfileClick={() => setActiveModule('profile')} />}
        {activeModule === 'attendance' && <AttendanceModule theme={theme} child={child} />}
        {activeModule === 'academics' && <AcademicsModule theme={theme} child={child} />}
        {activeModule === 'fees' && <FeesModule theme={theme} child={child} />}
        {activeModule === 'homework' && <HomeworkModule theme={theme} child={child} />}
        {activeModule === 'communication' && <CommunicationModule theme={theme} child={child} />}
        {activeModule === 'transport' && <TransportModule theme={theme} child={child} />}
        {activeModule === 'pickup' && <PickupAuthModule theme={theme} child={child} />}
        {activeModule === 'profile' && <StakeholderProfile role="parent" theme={theme} onClose={() => setActiveModule('dashboard')} themeIdx={themeIdx} onThemeChange={onThemeChange} />}
      </div>
    </div>
  );
}

// ─── EXPORT ──────────────────────────────────────────
export default function Page() {
  return (
    <BlueprintLayout>
      <ParentDashboard />
    </BlueprintLayout>
  );
}
