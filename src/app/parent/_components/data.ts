import {
  Home, Shield, Bus,
  MessageSquare,
  IndianRupee,
  ClipboardCheck, BookMarked,
  GraduationCap,
  Headphones,
} from 'lucide-react';
import type { ChildProfile } from './types';

// ─── CHILD DATA ─────────────────────────────────────
export const childrenData: ChildProfile[] = [
  {
    id: 'child1',
    name: 'Aarav Patel',
    class: '10',
    section: 'A',
    roll: 1,
    photo: 'AP',
    classTeacher: 'Mrs. Sunita Sharma',
    house: 'Blue House',
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
    house: 'Green House',
    bloodGroup: 'O+',
    admissionNo: 'SRS/2023/2187',
  },
];

// ─── MOCK DATA PER CHILD ────────────────────────────
export const attendanceData: Record<string, {
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

export const academicsData: Record<string, {
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

export const feesData: Record<string, {
  currentDue: number; totalPaid: number; totalAnnual: number; nextDueDate: string; nextDueAmount: number;
  payments: { id: string; date: string; description: string; amount: number; mode: string; receiptNo: string; status: string }[];
  upcoming: { installment: string; dueDate: string; amount: number; status: string }[];
  breakdown: { head: string; amount: number }[];
}> = {
  child1: {
    currentDue: 14500, totalPaid: 67500, totalAnnual: 82000, nextDueDate: '10 Mar 2026', nextDueAmount: 14500,
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
      { installment: 'Term 4 - Tuition Fee', dueDate: '10 Mar 2026', amount: 15000, status: 'Upcoming' },
      { installment: 'Term 4 - Transport Fee', dueDate: '10 Mar 2026', amount: 3500, status: 'Upcoming' },
    ],
    breakdown: [
      { head: 'Tuition Fee', amount: 60000 },
      { head: 'Transport Fee', amount: 16000 },
      { head: 'Annual Charges', amount: 3000 },
      { head: 'Activity Fee', amount: 3000 },
    ],
  },
  child2: {
    currentDue: 0, totalPaid: 52000, totalAnnual: 68000, nextDueDate: '10 Mar 2026', nextDueAmount: 16000,
    payments: [
      { id: 'P1', date: '05 Jan 2026', description: 'Term 3 - Tuition Fee', amount: 12000, mode: 'UPI', receiptNo: 'REC-2026-3210', status: 'Paid' },
      { id: 'P2', date: '05 Jan 2026', description: 'Term 3 - Transport Fee', amount: 4000, mode: 'UPI', receiptNo: 'REC-2026-3211', status: 'Paid' },
      { id: 'P3', date: '08 Oct 2025', description: 'Term 2 - Tuition Fee', amount: 12000, mode: 'UPI', receiptNo: 'REC-2025-2701', status: 'Paid' },
      { id: 'P4', date: '08 Oct 2025', description: 'Term 2 - Transport Fee', amount: 4000, mode: 'UPI', receiptNo: 'REC-2025-2702', status: 'Paid' },
      { id: 'P5', date: '02 Jul 2025', description: 'Term 1 - Tuition + Transport', amount: 16000, mode: 'Net Banking', receiptNo: 'REC-2025-1755', status: 'Paid' },
      { id: 'P6', date: '01 Apr 2025', description: 'Admission Fee + Annual Charges', amount: 4000, mode: 'Cash', receiptNo: 'REC-2025-0215', status: 'Paid' },
    ],
    upcoming: [
      { installment: 'Term 4 - Tuition Fee', dueDate: '10 Mar 2026', amount: 12000, status: 'Upcoming' },
      { installment: 'Term 4 - Transport Fee', dueDate: '10 Mar 2026', amount: 4000, status: 'Upcoming' },
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

export const homeworkData: Record<string, {
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

export const communicationData: Record<string, {
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

export const transportData: Record<string, {
  busNo: string; routeNo: string; routeName: string;
  driverName: string; driverPhone: string; conductorName: string; conductorPhone: string;
  vehicleNo: string; capacity: number;
  pickupStop: string; pickupTime: string; dropStop: string; dropTime: string;
  stops: { name: string; time: string; isCurrent: boolean; isChild: boolean }[];
  estimatedArrival: string;
}> = {
  child1: {
    busNo: 'Bus A', routeNo: 'Route A', routeName: 'Route A - Morning 7:00 AM',
    driverName: 'Ramesh Kumar', driverPhone: '+91 98765 43210', conductorName: 'Sunil Yadav', conductorPhone: '+91 98765 43211',
    vehicleNo: 'GJ-01-AB-1234', capacity: 42,
    pickupStop: 'Stop 3', pickupTime: '7:12 AM', dropStop: 'Stop 3', dropTime: '2:45 PM',
    stops: [
      { name: 'Stop 1', time: '7:00 AM', isCurrent: false, isChild: false },
      { name: 'Stop 2', time: '7:06 AM', isCurrent: false, isChild: false },
      { name: 'Stop 3', time: '7:12 AM', isCurrent: false, isChild: true },
      { name: 'Stop 4', time: '7:18 AM', isCurrent: true, isChild: false },
      { name: 'Stop 5', time: '7:24 AM', isCurrent: false, isChild: false },
      { name: 'Stop 6', time: '7:30 AM', isCurrent: false, isChild: false },
      { name: 'Stop 7', time: '7:36 AM', isCurrent: false, isChild: false },
      { name: 'School Gate', time: '7:42 AM', isCurrent: false, isChild: false },
    ],
    estimatedArrival: '7:42 AM (On Time)',
  },
  child2: {
    busNo: 'Bus A', routeNo: 'Route A', routeName: 'Route A - Morning 7:00 AM',
    driverName: 'Ramesh Kumar', driverPhone: '+91 98765 43210', conductorName: 'Sunil Yadav', conductorPhone: '+91 98765 43211',
    vehicleNo: 'GJ-01-AB-1234', capacity: 42,
    pickupStop: 'Stop 3', pickupTime: '7:12 AM', dropStop: 'Stop 3', dropTime: '2:45 PM',
    stops: [
      { name: 'Stop 1', time: '7:00 AM', isCurrent: false, isChild: false },
      { name: 'Stop 2', time: '7:06 AM', isCurrent: false, isChild: false },
      { name: 'Stop 3', time: '7:12 AM', isCurrent: false, isChild: true },
      { name: 'Stop 4', time: '7:18 AM', isCurrent: true, isChild: false },
      { name: 'Stop 5', time: '7:24 AM', isCurrent: false, isChild: false },
      { name: 'Stop 6', time: '7:30 AM', isCurrent: false, isChild: false },
      { name: 'Stop 7', time: '7:36 AM', isCurrent: false, isChild: false },
      { name: 'School Gate', time: '7:42 AM', isCurrent: false, isChild: false },
    ],
    estimatedArrival: '7:42 AM (On Time)',
  },
};

export const pickupAuthData: Record<string, {
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
export const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'attendance', label: 'Attendance', icon: ClipboardCheck },
  { id: 'academics', label: 'Academics', icon: GraduationCap },
  { id: 'fees', label: 'Fees', icon: IndianRupee },
  { id: 'homework', label: 'Homework', icon: BookMarked },
  { id: 'communication', label: 'Communication', icon: MessageSquare },
  { id: 'transport', label: 'Transport', icon: Bus },
  { id: 'pickup', label: 'Pickup Auth', icon: Shield },
  { id: 'support', label: 'Support', icon: Headphones },
];
