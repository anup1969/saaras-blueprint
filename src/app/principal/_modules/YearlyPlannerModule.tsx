'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { type Theme } from '@/lib/themes';
import {
  Plus, Check, X, Calendar, BarChart3, FileText, Users, Star,
  ShieldCheck, Download, Edit2, Eye, CalendarDays, CalendarClock,
  Sparkles, Bot, ChevronDown, Loader2, CheckCircle, Clock, Circle, User,
  Lock, RefreshCw, Printer, FileDown,
  Trophy, Medal, Target, Flag, MapPin, Award, Milestone,
} from 'lucide-react';

// ─── YEARLY PLANNER MODULE ───────────────────────────

interface ChatMessage {
  sender: 'bot' | 'user';
  text: string;
  type?: 'question' | 'answer' | 'info' | 'summary';
}

interface PlannerQuestion {
  id: number;
  topic: string;
  question: string;
  inputType: 'buttons' | 'dropdown' | 'multi-select' | 'date-range' | 'text-add';
  options?: string[];
}

const PLANNER_QUESTIONS: PlannerQuestion[] = [
  { id: 1, topic: 'Terms', question: 'How many terms do you follow?', inputType: 'buttons', options: ['2 Terms', '3 Terms'] },
  { id: 2, topic: 'Unit Tests', question: 'How many unit tests per term?', inputType: 'buttons', options: ['2', '3', '4'] },
  { id: 3, topic: 'Mid-Term', question: 'Do you conduct mid-term exams?', inputType: 'buttons', options: ['Yes', 'No'] },
  { id: 4, topic: 'Pre-Board', question: 'Pre-board exams for Class 10/12?', inputType: 'buttons', options: ['Yes, both', 'Only Class 12', 'No'] },
  { id: 5, topic: 'PTMs', question: 'How many PTMs per year?', inputType: 'buttons', options: ['2', '3', '4', '6'] },
  { id: 6, topic: 'Events', question: 'Select your annual events:', inputType: 'multi-select', options: [
    'Annual Day', 'Sports Day', 'Science Fair', 'Art Exhibition', 'Republic Day',
    'Independence Day', 'Teachers Day', 'Children\'s Day', 'Founder\'s Day', 'Graduation Day'
  ]},
  { id: 7, topic: 'Summer Break', question: 'Summer vacation dates?', inputType: 'date-range' },
  { id: 8, topic: 'Winter Break', question: 'Winter break dates?', inputType: 'date-range' },
  { id: 9, topic: 'Diwali Break', question: 'Diwali break duration?', inputType: 'buttons', options: ['1 Week', '2 Weeks'] },
  { id: 10, topic: 'Holidays', question: 'Any other school-specific holidays?', inputType: 'text-add' },
];

export default function YearlyPlannerModule({ theme }: { theme: Theme }) {
  const [plannerMode, setPlannerMode] = useState<'manual' | 'ai'>('manual');
  const [selectedGanttItem, setSelectedGanttItem] = useState<string | null>(null);

  // AI Mode state
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateProgress, setGenerateProgress] = useState(0);
  const [planReady, setPlanReady] = useState(false);
  const [aiStarted, setAiStarted] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Multi-select state for Q10
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  // Date range state for Q11
  const [vacationFrom, setVacationFrom] = useState('2026-05-01');
  const [vacationTo, setVacationTo] = useState('2026-06-15');
  // Text-add state for Q12
  const [holidayInput, setHolidayInput] = useState('');
  const [customHolidays, setCustomHolidays] = useState<string[]>([]);
  // Dropdown state for Q2
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Calendar sync state (Gap #68)
  const [googleSyncEnabled, setGoogleSyncEnabled] = useState(false);
  const [outlookSyncEnabled, setOutlookSyncEnabled] = useState(false);

  // Export dropdown state (Planned #70)
  const [showExportDropdown, setShowExportDropdown] = useState(false);

  // ─── SPECIAL EVENT PLANNER STATE ──────────────────
  const [selectedSpecialEvent, setSelectedSpecialEvent] = useState<string | null>(null);

  interface SpecialEventPlan {
    type: string;
    icon: React.ElementType;
    color: string;
    milestones: { label: string; days: string; responsible: string; done: boolean }[];
    budget: { category: string; amount: number }[];
    progress: number;
  }

  const specialEventPlans: SpecialEventPlan[] = [
    {
      type: 'Annual Day',
      icon: Star,
      color: 'bg-purple-500',
      milestones: [
        { label: 'Theme finalization & committee formation', days: '60 days before', responsible: 'Principal', done: true },
        { label: 'Script writing & participant selection', days: '45 days before', responsible: 'Activity Coordinator', done: true },
        { label: 'Costume procurement & stage booking', days: '30 days before', responsible: 'Admin', done: true },
        { label: 'Full dress rehearsals begin', days: '14 days before', responsible: 'Teachers', done: false },
        { label: 'Final rehearsal & logistics check', days: '7 days before', responsible: 'VP + Admin', done: false },
        { label: 'Event day — D-Day execution', days: 'D-Day', responsible: 'All Staff', done: false },
      ],
      budget: [
        { category: 'Venue & Stage', amount: 50000 },
        { category: 'Decorations', amount: 25000 },
        { category: 'Costumes & Props', amount: 30000 },
        { category: 'Prizes & Certificates', amount: 15000 },
        { category: 'Food & Beverages', amount: 20000 },
        { category: 'Sound & Lighting', amount: 35000 },
      ],
      progress: 50,
    },
    {
      type: 'Sports Day',
      icon: Trophy,
      color: 'bg-green-500',
      milestones: [
        { label: 'Event list & house allocation', days: '60 days before', responsible: 'Sports Teacher', done: true },
        { label: 'Practice sessions & selection trials', days: '30 days before', responsible: 'PE Department', done: true },
        { label: 'Track/field prep & equipment check', days: '14 days before', responsible: 'Admin', done: false },
        { label: 'March-past rehearsal & chief guest confirmation', days: '7 days before', responsible: 'Principal', done: false },
        { label: 'Sports Day — D-Day execution', days: 'D-Day', responsible: 'All Staff', done: false },
      ],
      budget: [
        { category: 'Ground Preparation', amount: 20000 },
        { category: 'Equipment & Supplies', amount: 15000 },
        { category: 'Trophies & Medals', amount: 25000 },
        { category: 'Refreshments', amount: 12000 },
        { category: 'Tent & Seating', amount: 30000 },
      ],
      progress: 40,
    },
    {
      type: 'Independence Day',
      icon: Flag,
      color: 'bg-orange-500',
      milestones: [
        { label: 'Program schedule & speech assignments', days: '14 days before', responsible: 'VP', done: true },
        { label: 'Flag hoisting arrangements & decoration', days: '7 days before', responsible: 'Admin', done: true },
        { label: 'Rehearsals for cultural programs', days: '3 days before', responsible: 'Teachers', done: false },
        { label: 'Independence Day celebration', days: 'D-Day', responsible: 'Principal', done: false },
      ],
      budget: [
        { category: 'Decoration & Flags', amount: 5000 },
        { category: 'Sweets Distribution', amount: 8000 },
        { category: 'Sound System', amount: 3000 },
      ],
      progress: 50,
    },
    {
      type: 'Republic Day',
      icon: Flag,
      color: 'bg-blue-500',
      milestones: [
        { label: 'Program finalization & chief guest invite', days: '14 days before', responsible: 'Principal', done: true },
        { label: 'March-past practice & cultural rehearsals', days: '7 days before', responsible: 'PE + Teachers', done: true },
        { label: 'Flag, stage & seating arrangements', days: '2 days before', responsible: 'Admin', done: false },
        { label: 'Republic Day celebration', days: 'D-Day', responsible: 'All Staff', done: false },
      ],
      budget: [
        { category: 'Decoration & Flags', amount: 5000 },
        { category: 'Refreshments', amount: 6000 },
        { category: 'Sound & Stage', amount: 4000 },
      ],
      progress: 50,
    },
  ];

  // ─── INTER-SCHOOL EVENTS STATE ──────────────────
  const [showInterSchool, setShowInterSchool] = useState(false);

  interface InterSchoolEvent {
    id: string;
    name: string;
    hostSchool: string;
    date: string;
    activity: string;
    participants: number;
    result: string;
    status: 'Upcoming' | 'Completed' | 'Registered';
  }

  const [interSchoolEvents] = useState<InterSchoolEvent[]>([
    { id: 'IS-1', name: 'Inter-School Cricket Tournament', hostSchool: 'DPS Ahmedabad', date: '10 Mar 2026', activity: 'Cricket', participants: 15, result: '-', status: 'Registered' },
    { id: 'IS-2', name: 'Science Olympiad — District Level', hostSchool: 'KV Gandhinagar', date: '22 Mar 2026', activity: 'Science', participants: 8, result: '-', status: 'Upcoming' },
    { id: 'IS-3', name: 'Inter-School Debate Competition', hostSchool: 'St. Xavier\'s School', date: '15 Feb 2026', activity: 'Debate', participants: 4, result: '1st Place', status: 'Completed' },
    { id: 'IS-4', name: 'Zonal Athletics Meet', hostSchool: 'Sardar Patel Stadium', date: '5 Feb 2026', activity: 'Athletics', participants: 20, result: '3 Gold, 2 Silver', status: 'Completed' },
    { id: 'IS-5', name: 'Art & Craft Exhibition', hostSchool: 'NID Campus', date: '28 Mar 2026', activity: 'Art', participants: 12, result: '-', status: 'Upcoming' },
  ]);

  const medalTally = { gold: 5, silver: 3, bronze: 4 };

  // Generated Gantt categories from AI answers (FIX 3)
  interface GanttItem { label: string; startMonth: number; duration: number; detail: string; }
  interface GanttCategory { name: string; color: string; textColor: string; bgLight: string; items: GanttItem[]; }
  const [generatedGanttCategories, setGeneratedGanttCategories] = useState<GanttCategory[] | null>(null);

  // Computed plan data from answers (FIX 2)
  const computePlanData = useCallback((ans: Record<number, string | string[]>) => {
    const terms = String(ans[1] || '2 Terms');
    const numTerms = terms.includes('3') ? 3 : 2;
    const unitTestsPerTerm = parseInt(String(ans[2] || '2'), 10);
    const hasMidTerm = String(ans[3] || 'Yes') === 'Yes';
    const preBoard = String(ans[4] || 'Yes, both');
    const hasPreBoard = preBoard !== 'No';
    const ptmCount = parseInt(String(ans[5] || '4'), 10);
    const events = Array.isArray(ans[6]) ? ans[6] : [];
    const summerBreak = String(ans[7] || '1 May to 15 Jun');
    const winterBreak = String(ans[8] || '25 Dec to 5 Jan');
    const diwaliBreak = String(ans[9] || '1 Week');
    const holidays = Array.isArray(ans[10]) ? ans[10].filter(h => h !== 'None') : [];

    // Working days estimate
    const workingDays = numTerms === 2 ? 220 : 210;

    // Holiday count: 22 govt (auto) + custom holidays + vacation days estimate
    const diwaliDays = diwaliBreak.includes('2') ? 14 : 7;
    // Rough vacation days: summer ~45, winter ~12, diwali ~7-14
    const totalHolidays = 22 + holidays.length + diwaliDays + 45 + 12;

    // Exam windows: (unitTests * terms) + midTerm? + preBoard? + finals
    const examWindows = (unitTestsPerTerm * numTerms) + (hasMidTerm ? 1 : 0) + (hasPreBoard ? 1 : 0) + 1;

    // Build exam schedule text
    const examScheduleLines: string[] = [];
    if (numTerms === 2) {
      // 2-term layout
      const utLabels: string[] = [];
      for (let i = 1; i <= unitTestsPerTerm; i++) utLabels.push(`UT-${i}`);
      if (unitTestsPerTerm >= 1) examScheduleLines.push(`  ${utLabels[0]}: June 15-20`);
      if (unitTestsPerTerm >= 2) examScheduleLines.push(`  ${utLabels[1]}: August 18-23`);
      if (unitTestsPerTerm >= 3) examScheduleLines.push(`  ${utLabels[2]}: July 21-26`);
      if (unitTestsPerTerm >= 4) examScheduleLines.push(`  ${utLabels[3]}: September 1-6`);
      if (hasMidTerm) examScheduleLines.push('  Mid-Term: September 22-30');
      // Term 2 UTs
      for (let i = 1; i <= unitTestsPerTerm; i++) {
        const utNum = unitTestsPerTerm + i;
        if (i === 1) examScheduleLines.push(`  UT-${utNum}: November 17-22`);
        if (i === 2) examScheduleLines.push(`  UT-${utNum}: January 19-24`);
        if (i === 3) examScheduleLines.push(`  UT-${utNum}: December 8-13`);
        if (i === 4) examScheduleLines.push(`  UT-${utNum}: February 2-7`);
      }
    } else {
      // 3-term layout
      for (let t = 1; t <= 3; t++) {
        for (let u = 1; u <= unitTestsPerTerm; u++) {
          const utNum = (t - 1) * unitTestsPerTerm + u;
          const monthMap: Record<string, string> = { '1-1': 'May 19-24', '1-2': 'July 7-12', '2-1': 'Sep 15-20', '2-2': 'Nov 3-8', '3-1': 'Jan 12-17', '3-2': 'Feb 16-21' };
          const key = `${t}-${u}`;
          examScheduleLines.push(`  UT-${utNum}: ${monthMap[key] || `Term ${t} UT ${u}`}`);
        }
        if (hasMidTerm && t < 3) examScheduleLines.push(`  Mid-Term ${t}: ${t === 1 ? 'July 28 - Aug 2' : 'Nov 24-29'}`);
      }
    }
    if (hasPreBoard) examScheduleLines.push(`  Pre-Board: January 26 - February 6${preBoard === 'Only Class 12' ? ' (Class 12 only)' : ''}`);
    examScheduleLines.push('  Final Exams: March 1-15');

    // PTM dates
    const ptmDates: string[] = [];
    const ptmDateOptions: Record<number, string[]> = {
      2: ['September 18', 'February 14'],
      3: ['July 12', 'November 15', 'February 14'],
      4: ['July 12', 'September 18', 'December 13', 'February 14'],
      6: ['June 14', 'August 9', 'October 11', 'December 13', 'January 17', 'February 28'],
    };
    ptmDates.push(...(ptmDateOptions[ptmCount] || ptmDateOptions[4]));

    // Event date suggestions
    const eventDateMap: Record<string, string> = {
      'Annual Day': 'December 19',
      'Sports Day': 'August 22',
      'Science Fair': 'October 17',
      'Art Exhibition': 'November 14',
      'Republic Day': 'January 26',
      'Independence Day': 'August 15',
      'Teachers Day': 'September 5',
      "Children's Day": 'November 14',
      "Founder's Day": 'July 25',
      'Graduation Day': 'March 20',
    };

    return {
      numTerms, unitTestsPerTerm, hasMidTerm, hasPreBoard, preBoard, ptmCount, events,
      summerBreak, winterBreak, diwaliBreak, holidays,
      workingDays, totalHolidays, examWindows, examScheduleLines, ptmDates, eventDateMap,
      diwaliDays,
    };
  }, []);

  // Build Gantt categories from answers (FIX 3)
  const buildGanttFromAnswers = useCallback((ans: Record<number, string | string[]>) => {
    const plan = computePlanData(ans);
    const cats: GanttCategory[] = [];

    // Academic terms
    if (plan.numTerms === 2) {
      cats.push({
        name: 'Academic', color: 'bg-blue-500', textColor: 'text-blue-700', bgLight: 'bg-blue-100',
        items: [
          { label: 'Term 1', startMonth: 0, duration: 6, detail: 'April to September' },
          { label: 'Term 2', startMonth: 6, duration: 6, detail: 'October to March' },
        ]
      });
    } else {
      cats.push({
        name: 'Academic', color: 'bg-blue-500', textColor: 'text-blue-700', bgLight: 'bg-blue-100',
        items: [
          { label: 'Term 1', startMonth: 0, duration: 4, detail: 'April to July' },
          { label: 'Term 2', startMonth: 4, duration: 4, detail: 'August to November' },
          { label: 'Term 3', startMonth: 8, duration: 4, detail: 'December to March' },
        ]
      });
    }

    // Exams
    const examItems: GanttItem[] = [];
    if (plan.numTerms === 2) {
      for (let i = 1; i <= plan.unitTestsPerTerm; i++) {
        const utMonths = [2, 4, 3, 5.2];
        examItems.push({ label: `UT-${i}`, startMonth: utMonths[i - 1] || (1.5 + i), duration: 0.4, detail: `Unit Test ${i} - Term 1` });
      }
      if (plan.hasMidTerm) examItems.push({ label: 'Mid-Term', startMonth: 5, duration: 0.5, detail: 'Mid-Term Exams - September' });
      for (let i = 1; i <= plan.unitTestsPerTerm; i++) {
        const utMonths2 = [7, 9, 8, 10];
        const utNum = plan.unitTestsPerTerm + i;
        examItems.push({ label: `UT-${utNum}`, startMonth: utMonths2[i - 1] || (7 + i), duration: 0.4, detail: `Unit Test ${utNum} - Term 2` });
      }
    } else {
      let utCounter = 1;
      const termStarts = [0, 4, 8];
      for (let t = 0; t < 3; t++) {
        for (let u = 0; u < plan.unitTestsPerTerm; u++) {
          examItems.push({ label: `UT-${utCounter}`, startMonth: termStarts[t] + 1.2 + u * 1.5, duration: 0.4, detail: `Unit Test ${utCounter} - Term ${t + 1}` });
          utCounter++;
        }
        if (plan.hasMidTerm && t < 2) {
          examItems.push({ label: `Mid-${t + 1}`, startMonth: termStarts[t] + 3.2, duration: 0.5, detail: `Mid-Term ${t + 1}` });
        }
      }
    }
    if (plan.hasPreBoard) examItems.push({ label: 'Pre-Board', startMonth: 9.5, duration: 0.5, detail: `Pre-Board Exams - January${plan.preBoard === 'Only Class 12' ? ' (Class 12)' : ''}` });
    examItems.push({ label: 'Finals', startMonth: 11, duration: 0.5, detail: 'Final Exams - March' });
    cats.push({ name: 'Exams', color: 'bg-red-500', textColor: 'text-red-700', bgLight: 'bg-red-100', items: examItems });

    // Events (only selected ones)
    const eventMonthMap: Record<string, { startMonth: number; detail: string }> = {
      'Annual Day': { startMonth: 8.5, detail: 'Annual Day - December' },
      'Sports Day': { startMonth: 4.5, detail: 'Sports Day - August' },
      'Science Fair': { startMonth: 6.5, detail: 'Science Fair - October' },
      'Art Exhibition': { startMonth: 7.3, detail: 'Art Exhibition - November' },
      'Republic Day': { startMonth: 9.8, detail: 'Republic Day - January 26' },
      'Independence Day': { startMonth: 4.4, detail: 'Independence Day - August 15' },
      'Teachers Day': { startMonth: 5.15, detail: "Teachers' Day - September 5" },
      "Children's Day": { startMonth: 7.4, detail: "Children's Day - November 14" },
      "Founder's Day": { startMonth: 3.8, detail: "Founder's Day - July" },
      'Graduation Day': { startMonth: 11.6, detail: 'Graduation Day - March' },
    };
    const eventItems: GanttItem[] = plan.events.map(ev => ({
      label: ev,
      startMonth: eventMonthMap[ev]?.startMonth ?? 6,
      duration: 0.25,
      detail: eventMonthMap[ev]?.detail ?? ev,
    }));
    if (eventItems.length > 0) {
      cats.push({ name: 'Events', color: 'bg-orange-500', textColor: 'text-orange-700', bgLight: 'bg-orange-100', items: eventItems });
    }

    // Holidays (from vacation answers)
    const holidayItems: GanttItem[] = [
      { label: 'Summer', startMonth: 1, duration: 1.5, detail: `Summer Vacation - ${plan.summerBreak}` },
      { label: 'Diwali', startMonth: 6.5, duration: plan.diwaliDays === 14 ? 0.5 : 0.25, detail: `Diwali Break - ${plan.diwaliBreak}` },
      { label: 'Winter', startMonth: 8.8, duration: 0.5, detail: `Winter Break - ${plan.winterBreak}` },
    ];
    cats.push({ name: 'Holidays', color: 'bg-green-500', textColor: 'text-green-700', bgLight: 'bg-green-100', items: holidayItems });

    // PTMs
    const ptmMonthMap: Record<number, number[]> = {
      2: [5, 10],
      3: [3, 7.5, 10],
      4: [3, 5.5, 8.5, 10.5],
      6: [2, 4, 6, 8, 9.5, 11],
    };
    const ptmMonths = ptmMonthMap[plan.ptmCount] || ptmMonthMap[4];
    const ptmItems: GanttItem[] = ptmMonths.map((m, i) => ({
      label: `PTM ${i + 1}`, startMonth: m, duration: 0.15, detail: `Parent-Teacher Meeting ${i + 1}`,
    }));
    cats.push({ name: 'PTM', color: 'bg-purple-500', textColor: 'text-purple-700', bgLight: 'bg-purple-100', items: ptmItems });

    // Compliance (always 4)
    cats.push({
      name: 'Compliance', color: 'bg-gray-500', textColor: 'text-gray-700', bgLight: 'bg-gray-200',
      items: [
        { label: 'Fire Drill Q1', startMonth: 3, duration: 0.2, detail: 'Fire Drill - July (quarterly)' },
        { label: 'Fire Drill Q3', startMonth: 9, duration: 0.2, detail: 'Fire Drill - January (quarterly)' },
        { label: 'CBSE Visit', startMonth: 7, duration: 0.3, detail: 'CBSE Affiliation Visit - November' },
        { label: 'Safety Audit', startMonth: 9.5, duration: 0.3, detail: 'Safety Audit - January' },
      ]
    });

    return cats;
  }, [computePlanData]);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  const addBotMessage = useCallback((text: string, type: ChatMessage['type'] = 'question') => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setChatMessages(prev => [...prev, { sender: 'bot', text, type }]);
    }, 300);
  }, []);

  const startAI = useCallback(() => {
    setAiStarted(true);
    setChatMessages([]);
    setCurrentStep(0);
    setAnswers({});
    setPlanReady(false);
    setIsGenerating(false);
    setGenerateProgress(0);
    setSelectedEvents([]);
    setCustomHolidays([]);
    setGeneratedGanttCategories(null);

    // Welcome message then first question
    setChatMessages([
      { sender: 'bot', text: "Hello! I\u2019m Saaras AI, your academic year planning assistant. I already have your school profile: CBSE affiliated, Gujarat, April-March session, Alternate Saturdays. Let me ask 10 quick questions about your academic planning to build the complete 2026-27 plan!", type: 'info' }
    ]);
    setTimeout(() => {
      addBotMessage(PLANNER_QUESTIONS[0].question);
      setCurrentStep(1);
    }, 800);
  }, [addBotMessage]);

  // Contextual bot messages for between questions (FIX 4)
  const getContextualMessage = useCallback((stepId: number, answer: string | string[]): string | null => {
    const ans = String(Array.isArray(answer) ? answer.join(', ') : answer);
    switch (stepId) {
      case 1: {
        const numTerms = ans.includes('3') ? 3 : 2;
        return `Great! ${numTerms} terms means I'll plan the academic year in ${numTerms} blocks with exam windows distributed across each term.`;
      }
      case 2:
        return `Got it! ${ans} unit tests per term. I'll space them evenly so students get adequate preparation time between each.`;
      case 3:
        return ans === 'Yes'
          ? 'Mid-term exams noted! I\'ll schedule them at the midpoint of each term for comprehensive assessment.'
          : 'No mid-terms -- that gives more teaching days. I\'ll adjust the schedule accordingly.';
      case 4:
        return ans === 'No'
          ? 'No pre-boards. More revision time before finals!'
          : `Pre-board exams ${ans === 'Only Class 12' ? 'for Class 12' : 'for both Class 10 & 12'} -- I'll slot them in January before the board exams.`;
      case 5:
        return `Perfect! I'll schedule ${ans} PTMs -- typically 1-2 weeks after each exam cycle so parents get fresh results.`;
      case 6:
        return Array.isArray(answer) && answer.length > 0
          ? `Nice selection! ${answer.length} events chosen. I'll space these across the year to avoid clustering near exams.`
          : 'No events selected. You can always add them later from the manual planner.';
      case 7:
        return 'Noted! I\'ll plan revision weeks before the summer break starts and schedule Term 2 kickoff right after.';
      case 8:
        return 'Winter break locked in! I\'ll ensure pre-board prep doesn\'t overlap with the break.';
      case 9:
        return ans.includes('2')
          ? 'Two weeks for Diwali -- generous! I\'ll factor in catch-up days when school resumes.'
          : 'One week Diwali break noted. Quick turnaround keeps momentum going.';
      default:
        return null;
    }
  }, []);

  const handleAnswer = useCallback((stepId: number, answer: string | string[]) => {
    const displayAnswer = Array.isArray(answer) ? answer.join(', ') : answer;
    setChatMessages(prev => [...prev, { sender: 'user', text: displayAnswer, type: 'answer' }]);
    setAnswers(prev => ({ ...prev, [stepId]: answer }));

    const nextStep = stepId + 1;
    if (nextStep <= PLANNER_QUESTIONS.length) {
      // Add contextual bot message first, then next question
      const contextMsg = getContextualMessage(stepId, answer);
      if (contextMsg) {
        setTimeout(() => {
          setChatMessages(prev => [...prev, { sender: 'bot', text: contextMsg, type: 'info' }]);
          setTimeout(() => {
            addBotMessage(PLANNER_QUESTIONS[nextStep - 1].question);
            setCurrentStep(nextStep);
          }, 600);
        }, 400);
      } else {
        setTimeout(() => {
          addBotMessage(PLANNER_QUESTIONS[nextStep - 1].question);
          setCurrentStep(nextStep);
        }, 500);
      }
    } else {
      // All done — generate plan from actual answers
      setTimeout(() => {
        setAnswers(prev => {
          const finalAnswers = { ...prev, [stepId]: answer };
          setChatMessages(old => [...old, { sender: 'bot', text: 'Excellent! I have all the information I need. Generating your personalized academic plan...', type: 'info' }]);
          setIsGenerating(true);
          setGenerateProgress(0);

          // Build gantt from answers (FIX 3)
          const gantt = buildGanttFromAnswers(finalAnswers);
          setGeneratedGanttCategories(gantt);

          let progress = 0;
          const interval = setInterval(() => {
            progress += Math.random() * 8 + 2;
            if (progress >= 100) {
              progress = 100;
              clearInterval(interval);
              setTimeout(() => {
                setIsGenerating(false);
                setPlanReady(true);
                setCurrentStep(PLANNER_QUESTIONS.length + 1);
              }, 400);
            }
            setGenerateProgress(Math.min(progress, 100));
          }, 100);

          return finalAnswers;
        });
      }, 500);
    }
  }, [addBotMessage, getContextualMessage, buildGanttFromAnswers]);

  // ─── GANTT TIMELINE DATA ─────────────────────
  const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

  const ganttCategories = [
    {
      name: 'Academic', color: 'bg-blue-500', textColor: 'text-blue-700', bgLight: 'bg-blue-100',
      items: [
        { label: 'Term 1', startMonth: 0, duration: 6, detail: 'April to September' },
        { label: 'Term 2', startMonth: 6, duration: 6, detail: 'October to March' },
      ]
    },
    {
      name: 'Exams', color: 'bg-red-500', textColor: 'text-red-700', bgLight: 'bg-red-100',
      items: [
        { label: 'UT-1', startMonth: 2, duration: 0.5, detail: 'Unit Test 1 — June' },
        { label: 'Mid-Term', startMonth: 5, duration: 0.5, detail: 'Mid-Term Exams — September' },
        { label: 'UT-2', startMonth: 7, duration: 0.5, detail: 'Unit Test 2 — November' },
        { label: 'Pre-Board', startMonth: 9, duration: 0.5, detail: 'Pre-Board Exams — January' },
        { label: 'Finals', startMonth: 11, duration: 0.5, detail: 'Final Exams — March' },
      ]
    },
    {
      name: 'Events', color: 'bg-orange-500', textColor: 'text-orange-700', bgLight: 'bg-orange-100',
      items: [
        { label: 'Sports Day', startMonth: 4, duration: 0.3, detail: 'Sports Day — August' },
        { label: 'Annual Day', startMonth: 8, duration: 0.3, detail: 'Annual Day — December' },
        { label: 'Republic Day', startMonth: 9.8, duration: 0.2, detail: 'Republic Day — January 26' },
        { label: 'Teachers Day', startMonth: 5.15, duration: 0.2, detail: 'Teachers Day — September 5' },
      ]
    },
    {
      name: 'Holidays', color: 'bg-green-500', textColor: 'text-green-700', bgLight: 'bg-green-100',
      items: [
        { label: 'Summer', startMonth: 1, duration: 1.5, detail: 'Summer Vacation — May to mid-June' },
        { label: 'Diwali', startMonth: 6.5, duration: 0.5, detail: 'Diwali Break — Oct/Nov' },
        { label: 'Winter', startMonth: 8.5, duration: 0.8, detail: 'Winter Break — Dec/Jan' },
      ]
    },
    {
      name: 'PTM', color: 'bg-purple-500', textColor: 'text-purple-700', bgLight: 'bg-purple-100',
      items: [
        { label: 'PTM 1', startMonth: 3, duration: 0.15, detail: 'Parent-Teacher Meeting — July' },
        { label: 'PTM 2', startMonth: 5, duration: 0.15, detail: 'Parent-Teacher Meeting — September' },
        { label: 'PTM 3', startMonth: 8, duration: 0.15, detail: 'Parent-Teacher Meeting — December' },
        { label: 'PTM 4', startMonth: 10, duration: 0.15, detail: 'Parent-Teacher Meeting — February' },
      ]
    },
    {
      name: 'Compliance', color: 'bg-gray-500', textColor: 'text-gray-700', bgLight: 'bg-gray-200',
      items: [
        { label: 'Fire Drill Q1', startMonth: 1, duration: 0.2, detail: 'Fire Drill — Q1 (May)' },
        { label: 'Fire Drill Q3', startMonth: 7, duration: 0.2, detail: 'Fire Drill — Q3 (November)' },
        { label: 'CBSE Visit', startMonth: 7, duration: 0.3, detail: 'CBSE Inspection Visit — November' },
        { label: 'Safety Audit', startMonth: 9, duration: 0.3, detail: 'Safety Audit — January' },
      ]
    },
  ];

  // Use generated gantt if plan is ready, otherwise default (FIX 3)
  const activeGanttCategories = (planReady && generatedGanttCategories) ? generatedGanttCategories : ganttCategories;

  // ─── RENDER MANUAL MODE ──────────────────────
  const renderManualMode = () => (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-bold ${theme.highlight}`}>Academic Year 2026-27</h2>
          <p className={`text-xs ${theme.iconColor}`}>Gantt-style yearly timeline view</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Gap #66 — Academic Week Numbering */}
          <div className={`px-3 py-1.5 rounded-xl ${theme.secondaryBg}`}>
            <span className={`text-xs font-bold ${theme.highlight}`}>Current: </span>
            <span className="text-xs font-bold text-blue-600">Week 42 of 52</span>
          </div>
          <div className={`px-3 py-1.5 rounded-xl ${theme.secondaryBg}`}>
            <span className={`text-xs font-bold ${theme.highlight}`}>Total Working Days: </span>
            <span className="text-xs font-bold text-emerald-600">220</span>
          </div>
          <button className={`px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold flex items-center gap-1`}>
            <Plus size={12} /> Add Event
          </button>
          {/* Planned #70 — Calendar Export Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowExportDropdown(!showExportDropdown)}
              className={`px-3 py-1.5 rounded-xl border ${theme.border} text-xs font-bold ${theme.highlight} flex items-center gap-1 ${theme.buttonHover}`}
            >
              <Download size={12} /> Export <ChevronDown size={10} />
            </button>
            {showExportDropdown && (
              <div className={`absolute right-0 top-full mt-1 ${theme.cardBg} border ${theme.border} rounded-xl shadow-lg z-20 w-40 overflow-hidden`}>
                <button className={`w-full text-left px-3 py-2 text-xs ${theme.highlight} ${theme.buttonHover} flex items-center gap-2`}>
                  <FileDown size={12} /> Export as PDF
                </button>
                <button className={`w-full text-left px-3 py-2 text-xs ${theme.highlight} ${theme.buttonHover} flex items-center gap-2`}>
                  <CalendarDays size={12} /> Export as iCal
                </button>
                <button className={`w-full text-left px-3 py-2 text-xs ${theme.highlight} ${theme.buttonHover} flex items-center gap-2`}>
                  <Printer size={12} /> Print
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Gantt Chart */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 overflow-x-auto`}>
        {/* Month Headers */}
        <div className="flex items-stretch min-w-[900px]">
          <div className="w-28 shrink-0" />
          <div className="flex-1 grid grid-cols-12 gap-0">
            {months.map((m, i) => (
              <div key={m} className={`text-center py-2 text-[10px] font-bold uppercase ${theme.iconColor} ${i < 11 ? `border-r ${theme.border}` : ''}`}>
                {m}
              </div>
            ))}
          </div>
        </div>

        {/* Category Rows */}
        {activeGanttCategories.map((cat) => (
          <div key={cat.name} className={`flex items-stretch min-w-[900px] border-t ${theme.border}`}>
            {/* Category Label */}
            <div className={`w-28 shrink-0 flex items-center gap-2 py-3 pr-2`}>
              <div className={`w-2.5 h-2.5 rounded-full ${cat.color}`} />
              <span className={`text-[11px] font-bold ${theme.highlight}`}>{cat.name}</span>
            </div>
            {/* Timeline Grid */}
            <div className="flex-1 relative py-2" style={{ minHeight: '36px' }}>
              {/* Grid lines */}
              <div className="absolute inset-0 grid grid-cols-12">
                {months.map((m, i) => (
                  <div key={m} className={`${i < 11 ? `border-r ${theme.border}` : ''} opacity-30`} />
                ))}
              </div>
              {/* Bars */}
              <div className="relative h-full flex items-center">
                {cat.items.map((item) => {
                  const leftPercent = (item.startMonth / 12) * 100;
                  const widthPercent = Math.max((item.duration / 12) * 100, 2);
                  const isSelected = selectedGanttItem === `${cat.name}-${item.label}`;
                  return (
                    <div
                      key={item.label}
                      onClick={() => setSelectedGanttItem(isSelected ? null : `${cat.name}-${item.label}`)}
                      className={`absolute h-6 rounded-full ${cat.color} cursor-pointer hover:opacity-90 transition-all flex items-center justify-center ${
                        isSelected ? 'ring-2 ring-offset-1 ring-blue-400 z-10' : ''
                      }`}
                      style={{ left: `${leftPercent}%`, width: `${widthPercent}%`, minWidth: '22px' }}
                      title={item.detail}
                    >
                      <span className="text-[8px] font-bold text-white truncate px-1">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected item detail */}
      {selectedGanttItem && (() => {
        const [catName, ...labelParts] = selectedGanttItem.split('-');
        const label = labelParts.join('-');
        const cat = activeGanttCategories.find(c => c.name === catName);
        const item = cat?.items.find(i => i.label === label);
        if (!cat || !item) return null;
        return (
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex items-center gap-4`}>
            <div className={`w-10 h-10 rounded-xl ${cat.color} flex items-center justify-center`}>
              <CalendarClock size={18} className="text-white" />
            </div>
            <div className="flex-1">
              <p className={`text-sm font-bold ${theme.highlight}`}>{item.label}</p>
              <p className={`text-xs ${theme.iconColor}`}>{item.detail}</p>
              <p className={`text-[10px] ${cat.textColor} font-bold mt-0.5`}>{cat.name}</p>
            </div>
            <button onClick={() => setSelectedGanttItem(null)} className={`p-1.5 rounded-lg ${theme.buttonHover}`}>
              <X size={14} className={theme.iconColor} />
            </button>
          </div>
        );
      })()}

      {/* Color Legend */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center flex-wrap gap-4">
          {activeGanttCategories.map(cat => (
            <div key={cat.name} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded-full ${cat.color}`} />
              <span className={`text-[10px] font-bold ${theme.iconColor}`}>{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Planned #64 — Exam Window Blocking */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center gap-2 mb-3">
          <Lock size={16} className="text-red-500" />
          <h3 className={`text-sm font-bold ${theme.highlight}`}>Exam Window Blocks</h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold">Scheduling Locked</span>
        </div>
        <p className={`text-[10px] ${theme.iconColor} mb-3`}>No events, activities, or meetings can be scheduled during exam windows. These periods are automatically protected.</p>
        <div className="space-y-2">
          {[
            { label: 'Unit Test 1', dates: 'Jun 15 - Jun 20', status: 'Completed', color: 'bg-gray-100 border-gray-300 text-gray-600' },
            { label: 'Mid-Term Exams', dates: 'Sep 22 - Sep 30', status: 'Completed', color: 'bg-gray-100 border-gray-300 text-gray-600' },
            { label: 'Unit Test 2', dates: 'Nov 17 - Nov 22', status: 'Completed', color: 'bg-gray-100 border-gray-300 text-gray-600' },
            { label: 'Pre-Board Exams', dates: 'Jan 26 - Feb 6', status: 'Upcoming', color: 'bg-amber-50 border-amber-300 text-amber-700' },
            { label: 'Board Exam Window', dates: 'Mar 1 - Mar 28', status: 'Upcoming', color: 'bg-red-50 border-red-300 text-red-700' },
            { label: 'Final Exams', dates: 'Mar 1 - Mar 15', status: 'Upcoming', color: 'bg-red-50 border-red-300 text-red-700' },
          ].map((exam, i) => (
            <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl border ${exam.color}`}>
              <Lock size={12} className="shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-bold">{exam.label}</p>
                <p className="text-[10px] opacity-75">{exam.dates}</p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                exam.status === 'Completed' ? 'bg-gray-200 text-gray-600' : 'bg-amber-100 text-amber-700'
              }`}>{exam.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Gap #68 — Calendar Sync */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center gap-2 mb-3">
          <RefreshCw size={16} className={theme.iconColor} />
          <h3 className={`text-sm font-bold ${theme.highlight}`}>Calendar Sync</h3>
        </div>
        <div className="space-y-3">
          {/* Google Calendar Sync */}
          <div className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                <Calendar size={16} className="text-blue-500" />
              </div>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Google Calendar</p>
                <p className={`text-[10px] ${theme.iconColor}`}>
                  {googleSyncEnabled ? 'Last synced: Feb 27, 2026' : 'Not connected'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setGoogleSyncEnabled(!googleSyncEnabled)}
              className={`w-10 h-5 rounded-full transition-all relative ${googleSyncEnabled ? 'bg-emerald-500' : 'bg-gray-300'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white shadow absolute top-0.5 transition-all ${googleSyncEnabled ? 'left-5.5 right-0.5' : 'left-0.5'}`}
                style={{ left: googleSyncEnabled ? '22px' : '2px' }}
              />
            </button>
          </div>
          {/* Outlook Sync */}
          <div className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                <Calendar size={16} className="text-blue-700" />
              </div>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Microsoft Outlook</p>
                <p className={`text-[10px] ${theme.iconColor}`}>
                  {outlookSyncEnabled ? 'Last synced: Feb 27, 2026' : 'Not connected'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setOutlookSyncEnabled(!outlookSyncEnabled)}
              className={`w-10 h-5 rounded-full transition-all relative ${outlookSyncEnabled ? 'bg-emerald-500' : 'bg-gray-300'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white shadow absolute top-0.5 transition-all`}
                style={{ left: outlookSyncEnabled ? '22px' : '2px' }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* ─── ANNUAL DAY / SPORTS DAY PLANNING ──────────── */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center gap-2 mb-4">
          <Trophy size={16} className="text-amber-500" />
          <h3 className={`text-sm font-bold ${theme.highlight}`}>Special Event Planning</h3>
        </div>

        {/* Event Type Cards */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          {specialEventPlans.map(plan => {
            const isSelected = selectedSpecialEvent === plan.type;
            return (
              <button key={plan.type} onClick={() => setSelectedSpecialEvent(isSelected ? null : plan.type)}
                className={`p-3 rounded-xl border transition-all text-left ${
                  isSelected ? `ring-2 ring-purple-400 ${theme.secondaryBg}` : `${theme.border} ${theme.buttonHover}`
                }`}>
                <div className={`w-8 h-8 rounded-lg ${plan.color} flex items-center justify-center mb-2`}>
                  <plan.icon size={14} className="text-white" />
                </div>
                <p className={`text-xs font-bold ${theme.highlight}`}>{plan.type}</p>
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className={`text-[9px] ${theme.iconColor}`}>Progress</span>
                    <span className={`text-[9px] font-bold ${theme.highlight}`}>{plan.progress}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
                    <div className={`h-full rounded-full ${plan.color} transition-all`} style={{ width: `${plan.progress}%` }} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Event Detail */}
        {selectedSpecialEvent && (() => {
          const plan = specialEventPlans.find(p => p.type === selectedSpecialEvent);
          if (!plan) return null;
          const totalBudget = plan.budget.reduce((s, b) => s + b.amount, 0);
          return (
            <div className={`p-4 rounded-xl border ${theme.border} ${theme.secondaryBg} space-y-4`}>
              <div className="flex items-center justify-between">
                <h4 className={`text-sm font-bold ${theme.highlight} flex items-center gap-2`}>
                  <plan.icon size={14} /> {plan.type} — Planning Timeline
                </h4>
                <button onClick={() => setSelectedSpecialEvent(null)} className={`p-1 rounded-lg ${theme.buttonHover}`}>
                  <X size={14} className={theme.iconColor} />
                </button>
              </div>

              {/* Milestones */}
              <div className="space-y-2">
                {plan.milestones.map((ms, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${theme.cardBg}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${ms.done ? 'bg-emerald-500' : 'border-2 ' + theme.border}`}>
                      {ms.done ? <Check size={12} className="text-white" /> : <Circle size={10} className={theme.iconColor} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold ${ms.done ? 'text-emerald-600' : theme.highlight}`}>{ms.label}</p>
                      <p className={`text-[10px] ${theme.iconColor}`}>{ms.responsible}</p>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      ms.days === 'D-Day' ? 'bg-red-100 text-red-700' : ms.done ? 'bg-emerald-100 text-emerald-700' : `${theme.secondaryBg} ${theme.iconColor}`
                    }`}>{ms.days}</span>
                  </div>
                ))}
              </div>

              {/* Budget Allocation */}
              <div>
                <h5 className={`text-xs font-bold ${theme.highlight} mb-2 flex items-center gap-1`}>
                  <Target size={12} /> Budget Allocation — INR {totalBudget.toLocaleString()}
                </h5>
                <div className="grid grid-cols-3 gap-2">
                  {plan.budget.map((b, i) => (
                    <div key={i} className={`p-2.5 rounded-xl ${theme.cardBg} border ${theme.border}`}>
                      <p className={`text-[10px] ${theme.iconColor}`}>{b.category}</p>
                      <p className={`text-sm font-bold ${theme.highlight}`}>INR {b.amount.toLocaleString()}</p>
                      <div className="h-1 rounded-full bg-gray-200 mt-1">
                        <div className={`h-full rounded-full ${plan.color}`} style={{ width: `${(b.amount / totalBudget) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* ─── INTER-SCHOOL EVENTS ──────────── */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Award size={16} className="text-blue-500" />
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Inter-School Events</h3>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowInterSchool(!showInterSchool)}
              className={`px-3 py-1.5 rounded-xl border ${theme.border} text-xs font-bold ${theme.highlight} ${theme.buttonHover} flex items-center gap-1`}>
              <Eye size={12} /> {showInterSchool ? 'Collapse' : 'Expand'}
            </button>
            <button className={`px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold flex items-center gap-1`}>
              <Plus size={12} /> Register for Event
            </button>
          </div>
        </div>

        {/* Medal/Trophy Tally */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className={`p-3 rounded-xl bg-amber-50 border border-amber-200 text-center`}>
            <Medal size={18} className="text-amber-500 mx-auto mb-1" />
            <p className="text-lg font-bold text-amber-600">{medalTally.gold}</p>
            <p className="text-[10px] text-amber-700 font-medium">Gold</p>
          </div>
          <div className={`p-3 rounded-xl bg-gray-50 border border-gray-200 text-center`}>
            <Medal size={18} className="text-gray-400 mx-auto mb-1" />
            <p className="text-lg font-bold text-gray-600">{medalTally.silver}</p>
            <p className="text-[10px] text-gray-600 font-medium">Silver</p>
          </div>
          <div className={`p-3 rounded-xl bg-orange-50 border border-orange-200 text-center`}>
            <Medal size={18} className="text-orange-500 mx-auto mb-1" />
            <p className="text-lg font-bold text-orange-600">{medalTally.bronze}</p>
            <p className="text-[10px] text-orange-700 font-medium">Bronze</p>
          </div>
        </div>

        {/* Events Table */}
        {showInterSchool && (
          <div className={`border ${theme.border} rounded-xl overflow-hidden`}>
            <div className={`grid grid-cols-7 gap-2 px-3 py-2 ${theme.secondaryBg}`}>
              {['Event Name', 'Host School', 'Date', 'Activity', 'Participants', 'Result', 'Status'].map(h => (
                <p key={h} className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>{h}</p>
              ))}
            </div>
            {interSchoolEvents.map(ev => (
              <div key={ev.id} className={`grid grid-cols-7 gap-2 px-3 py-2.5 border-t ${theme.border} items-center`}>
                <p className={`text-xs font-bold ${theme.highlight}`}>{ev.name}</p>
                <p className={`text-xs ${theme.iconColor}`}>{ev.hostSchool}</p>
                <p className={`text-xs ${theme.iconColor}`}>{ev.date}</p>
                <p className={`text-xs ${theme.iconColor}`}>{ev.activity}</p>
                <p className={`text-xs ${theme.highlight} font-bold`}>{ev.participants}</p>
                <p className={`text-xs ${ev.result === '-' ? theme.iconColor : 'text-emerald-600 font-bold'}`}>{ev.result}</p>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full w-fit ${
                  ev.status === 'Completed' ? 'bg-gray-100 text-gray-600' :
                  ev.status === 'Registered' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}>{ev.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // ─── RENDER AI QUESTION INPUT ─────────────────
  const renderQuestionInput = () => {
    if (currentStep < 1 || currentStep > PLANNER_QUESTIONS.length || isGenerating || planReady) return null;
    const q = PLANNER_QUESTIONS[currentStep - 1];

    // Wrapper with label (FIX 5)
    const InputWrapper = ({ children }: { children: React.ReactNode }) => (
      <div className={`mt-3 pt-3 border-t ${theme.border}`}>
        <p className={`text-[10px] font-bold ${theme.iconColor} uppercase tracking-wider mb-2`}>Your answer:</p>
        {children}
      </div>
    );

    if (q.inputType === 'buttons') {
      return (
        <InputWrapper>
          <div className="flex flex-wrap gap-2">
            {q.options?.map(opt => (
              <button
                key={opt}
                onClick={() => handleAnswer(q.id, opt)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border-2 ${theme.border} ${theme.highlight} hover:border-blue-400 ${theme.buttonHover} transition-all`}
              >
                {opt}
              </button>
            ))}
          </div>
        </InputWrapper>
      );
    }

    if (q.inputType === 'dropdown') {
      return (
        <InputWrapper>
          <div className="relative" style={{ maxWidth: '280px' }}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold border-2 ${theme.border} ${theme.highlight} ${theme.cardBg} flex items-center justify-between`}
            >
              <span className={theme.iconColor}>Select a state...</span>
              <ChevronDown size={14} className={theme.iconColor} />
            </button>
            {dropdownOpen && (
              <div className={`absolute top-full left-0 right-0 mt-1 ${theme.cardBg} border ${theme.border} rounded-xl shadow-lg max-h-48 overflow-y-auto z-20`}>
                {q.options?.map(opt => (
                  <button
                    key={opt}
                    onClick={() => { handleAnswer(q.id, opt); setDropdownOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-xs ${theme.highlight} ${theme.buttonHover} first:rounded-t-xl last:rounded-b-xl`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </InputWrapper>
      );
    }

    if (q.inputType === 'multi-select') {
      return (
        <InputWrapper>
          <div className="space-y-2">
            {/* Selected count indicator (FIX 5) */}
            <div className="flex items-center justify-between">
              <span className={`text-[10px] ${theme.iconColor}`}>Tap to select/deselect</span>
              <span className={`text-[10px] font-bold ${selectedEvents.length > 0 ? 'text-blue-600' : theme.iconColor}`}>
                {selectedEvents.length} of {q.options?.length || 0} selected
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {q.options?.map(opt => {
                const isChecked = selectedEvents.includes(opt);
                return (
                  <button
                    key={opt}
                    onClick={() => setSelectedEvents(prev => isChecked ? prev.filter(e => e !== opt) : [...prev, opt])}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border-2 transition-all ${
                      isChecked ? 'border-blue-400 bg-blue-50 text-blue-700' : `${theme.border} ${theme.highlight} ${theme.buttonHover}`
                    }`}
                  >
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${
                      isChecked ? 'border-blue-500 bg-blue-500' : `${theme.border}`
                    }`}>
                      {isChecked && <Check size={10} className="text-white" />}
                    </div>
                    {opt}
                  </button>
                );
              })}
            </div>
            {selectedEvents.length > 0 && (
              <button
                onClick={() => handleAnswer(q.id, selectedEvents)}
                className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold flex items-center gap-1`}
              >
                <Check size={12} /> Confirm {selectedEvents.length} selected
              </button>
            )}
          </div>
        </InputWrapper>
      );
    }

    if (q.inputType === 'date-range') {
      return (
        <InputWrapper>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>From:</label>
                <input
                  type="date"
                  value={vacationFrom}
                  onChange={e => setVacationFrom(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight} outline-none focus:ring-2 focus:ring-blue-300`}
                />
              </div>
              <div className={`text-xs font-bold ${theme.iconColor} mt-4`}>to</div>
              <div className="flex-1">
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>To:</label>
                <input
                  type="date"
                  value={vacationTo}
                  onChange={e => setVacationTo(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight} outline-none focus:ring-2 focus:ring-blue-300`}
                />
              </div>
            </div>
            {/* Show duration preview */}
            {vacationFrom && vacationTo && (
              <p className={`text-[10px] ${theme.iconColor}`}>
                Duration: {Math.max(0, Math.round((new Date(vacationTo).getTime() - new Date(vacationFrom).getTime()) / (1000 * 60 * 60 * 24)))} days
              </p>
            )}
            <button
              onClick={() => {
                const from = new Date(vacationFrom).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
                const to = new Date(vacationTo).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
                handleAnswer(q.id, `${from} to ${to}`);
              }}
              className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold flex items-center gap-1`}
            >
              <Check size={12} /> Confirm Dates
            </button>
          </div>
        </InputWrapper>
      );
    }

    if (q.inputType === 'text-add') {
      return (
        <InputWrapper>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={holidayInput}
                onChange={e => setHolidayInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && holidayInput.trim()) {
                    setCustomHolidays(prev => [...prev, holidayInput.trim()]);
                    setHolidayInput('');
                  }
                }}
                placeholder="Type holiday name and press Enter or click Add..."
                className={`flex-1 px-3 py-2 rounded-xl text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight} outline-none focus:ring-2 focus:ring-blue-300`}
              />
              <button
                onClick={() => {
                  if (holidayInput.trim()) {
                    setCustomHolidays(prev => [...prev, holidayInput.trim()]);
                    setHolidayInput('');
                  }
                }}
                className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold flex items-center gap-1`}
              >
                <Plus size={12} /> Add
              </button>
            </div>
            {/* Show added items as tags (FIX 5) */}
            {customHolidays.length > 0 && (
              <div>
                <p className={`text-[10px] ${theme.iconColor} mb-1`}>{customHolidays.length} holiday{customHolidays.length > 1 ? 's' : ''} added:</p>
                <div className="flex flex-wrap gap-1.5">
                  {customHolidays.map((h, i) => (
                    <span key={i} className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${theme.secondaryBg} ${theme.highlight} flex items-center gap-1 border ${theme.border}`}>
                      {h}
                      <button onClick={() => setCustomHolidays(prev => prev.filter((_, idx) => idx !== i))} className="hover:text-red-500 ml-0.5">
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
            <button
              onClick={() => handleAnswer(q.id, customHolidays.length > 0 ? customHolidays : ['None'])}
              className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold flex items-center gap-1`}
            >
              <Check size={12} /> {customHolidays.length > 0 ? `Done (${customHolidays.length} added)` : 'Skip -- No extra holidays'}
            </button>
          </div>
        </InputWrapper>
      );
    }

    return null;
  };

  // ─── RENDER AI MODE ──────────────────────────
  const renderAIMode = () => (
    <div className="space-y-4">
      {!aiStarted ? (
        /* Welcome Screen */
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-8 text-center`}>
          <div className={`w-16 h-16 rounded-2xl ${theme.primary} mx-auto mb-4 flex items-center justify-center`}>
            <Sparkles size={28} className="text-white" />
          </div>
          <h2 className={`text-xl font-bold ${theme.highlight} mb-2`}>AI-Powered Yearly Planner</h2>
          <p className={`text-sm ${theme.iconColor} mb-6 max-w-md mx-auto`}>
            Answer 10 quick questions and I&apos;ll generate a complete, customized academic year plan for your school — including exams, events, holidays, PTMs, and compliance items. Your school profile data is already loaded!
          </p>
          <button
            onClick={startAI}
            className={`px-6 py-3 rounded-xl ${theme.primary} text-white text-sm font-bold flex items-center gap-2 mx-auto hover:opacity-90 transition-opacity`}
          >
            <Sparkles size={16} /> Start Planning with AI
          </button>
        </div>
      ) : (
        /* Chat Interface */
        <div className="flex gap-4" style={{ minHeight: '600px' }}>
          {/* Left: Chat Area (60%) */}
          <div className="flex-[3] flex flex-col">
            <div className={`flex-1 ${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex flex-col`}>
              {/* Chat Header */}
              <div className={`flex items-center gap-2 pb-3 border-b ${theme.border} mb-3`}>
                <div className={`w-8 h-8 rounded-full ${theme.primary} flex items-center justify-center`}>
                  <Bot size={16} className="text-white" />
                </div>
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>Saaras AI</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Academic Year Planner</p>
                </div>
                <div className="flex-1" />
                {aiStarted && !planReady && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold`}>Active</span>
                )}
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1" style={{ maxHeight: '450px' }}>
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    {/* Avatar */}
                    <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center ${
                      msg.sender === 'bot' ? `${theme.primary}` : 'bg-blue-500'
                    }`}>
                      {msg.sender === 'bot' ? <Bot size={12} className="text-white" /> : <User size={12} className="text-white" />}
                    </div>
                    {/* Message Bubble */}
                    <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'bot'
                        ? `${theme.secondaryBg} ${theme.highlight} rounded-tl-sm`
                        : `${theme.primary} text-white rounded-tr-sm`
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex gap-2">
                    <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center ${theme.primary}`}>
                      <Bot size={12} className="text-white" />
                    </div>
                    <div className={`px-4 py-2.5 rounded-2xl rounded-tl-sm ${theme.secondaryBg}`}>
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Generating animation */}
                {isGenerating && (
                  <div className={`${theme.secondaryBg} rounded-2xl p-4 space-y-2`}>
                    <div className="flex items-center gap-2">
                      <Loader2 size={14} className={`${theme.iconColor} animate-spin`} />
                      <span className={`text-xs font-bold ${theme.highlight}`}>Generating your academic plan...</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${theme.primary} transition-all duration-100`}
                        style={{ width: `${generateProgress}%` }}
                      />
                    </div>
                    <p className={`text-[10px] ${theme.iconColor} text-right`}>{Math.round(generateProgress)}%</p>
                  </div>
                )}

                {/* Plan Ready Summary (FIX 2: Dynamic from answers) */}
                {planReady && (() => {
                  const plan = computePlanData(answers);
                  return (
                  <div className={`${theme.secondaryBg} rounded-2xl p-5 space-y-3 border-2 border-emerald-300`}>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={18} className="text-emerald-500" />
                      <span className={`text-sm font-bold ${theme.highlight}`}>Your 2026-27 Academic Plan is ready!</span>
                    </div>
                    {/* Summary Stats */}
                    <div className={`space-y-1.5 ${theme.iconColor}`}>
                      <p className="text-xs flex items-center gap-2"><BarChart3 size={12} /> <strong>{plan.workingDays}</strong> Working Days</p>
                      <p className="text-xs flex items-center gap-2"><Calendar size={12} /> <strong>{plan.totalHolidays}</strong> Holidays (22 govt + {plan.totalHolidays - 22} school)</p>
                      <p className="text-xs flex items-center gap-2"><FileText size={12} /> <strong>{plan.examWindows}</strong> Exam Windows ({plan.unitTestsPerTerm * plan.numTerms} UT{plan.hasMidTerm ? ' + Mid' : ''}{plan.hasPreBoard ? ' + Pre-Board' : ''} + Final)</p>
                      <p className="text-xs flex items-center gap-2"><Users size={12} /> <strong>{plan.ptmCount}</strong> PTMs scheduled</p>
                      <p className="text-xs flex items-center gap-2"><Star size={12} /> <strong>{plan.events.length}</strong> Events planned</p>
                      <p className="text-xs flex items-center gap-2"><ShieldCheck size={12} /> <strong>4</strong> Compliance items auto-added</p>
                    </div>

                    {/* Detailed Breakdown (FIX 2) */}
                    <div className={`mt-3 pt-3 border-t ${theme.border} space-y-3`}>
                      {/* Exam Schedule */}
                      <div>
                        <p className={`text-xs font-bold ${theme.highlight} mb-1`}>Exam Schedule:</p>
                        <div className={`space-y-0.5 ${theme.iconColor}`}>
                          {plan.examScheduleLines.map((line, i) => (
                            <p key={i} className="text-[11px]">{line}</p>
                          ))}
                        </div>
                      </div>

                      {/* PTMs */}
                      <div>
                        <p className={`text-xs font-bold ${theme.highlight} mb-1`}>PTMs:</p>
                        <p className={`text-[11px] ${theme.iconColor}`}>  {plan.ptmDates.join(', ')}</p>
                      </div>

                      {/* Events */}
                      {plan.events.length > 0 && (
                        <div>
                          <p className={`text-xs font-bold ${theme.highlight} mb-1`}>Events:</p>
                          <div className={`space-y-0.5 ${theme.iconColor}`}>
                            {plan.events.map((ev, i) => (
                              <p key={i} className="text-[11px]">  {ev} -- {plan.eventDateMap[ev] || 'TBD'}</p>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Vacations */}
                      <div>
                        <p className={`text-xs font-bold ${theme.highlight} mb-1`}>Vacations:</p>
                        <div className={`space-y-0.5 ${theme.iconColor}`}>
                          <p className="text-[11px]">  Summer: {plan.summerBreak}</p>
                          <p className="text-[11px]">  Winter: {plan.winterBreak}</p>
                          <p className="text-[11px]">  Diwali: {plan.diwaliBreak}</p>
                        </div>
                      </div>

                      {/* Compliance */}
                      <div>
                        <p className={`text-xs font-bold ${theme.highlight} mb-1`}>Compliance (Auto-added):</p>
                        <div className={`space-y-0.5 ${theme.iconColor}`}>
                          <p className="text-[11px]">  Fire Drill: July, January (quarterly)</p>
                          <p className="text-[11px]">  CBSE Affiliation Visit: November</p>
                          <p className="text-[11px]">  Safety Audit: January</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => setPlannerMode('manual')}
                        className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold flex items-center gap-1`}
                      >
                        <Eye size={12} /> View Full Plan
                      </button>
                      <button className={`px-4 py-2 rounded-xl border ${theme.border} text-xs font-bold ${theme.highlight} flex items-center gap-1`}>
                        <Download size={12} /> Export PDF
                      </button>
                      <button className={`px-4 py-2 rounded-xl border ${theme.border} text-xs font-bold ${theme.highlight} flex items-center gap-1`}>
                        <Edit2 size={12} /> Edit Plan
                      </button>
                    </div>
                  </div>
                  );
                })()}

                <div ref={chatEndRef} />
              </div>

              {/* Input Area */}
              {!isTyping && !isGenerating && !planReady && renderQuestionInput()}
            </div>
          </div>

          {/* Right: Progress Tracker (40%) */}
          <div className="flex-[2]">
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 sticky top-4`}>
              <h3 className={`text-xs font-bold ${theme.highlight} mb-4 uppercase tracking-wider`}>Progress Tracker</h3>
              <div className="space-y-1">
                {PLANNER_QUESTIONS.map((q) => {
                  const isAnswered = answers[q.id] !== undefined;
                  const isCurrent = currentStep === q.id;
                  const isUpcoming = !isAnswered && !isCurrent;
                  return (
                    <div key={q.id} className={`flex items-center gap-3 p-2 rounded-xl transition-all ${
                      isCurrent ? `${theme.accentBg} ring-1 ring-blue-300` : ''
                    }`}>
                      {/* Step indicator */}
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        isAnswered ? 'bg-emerald-500' : isCurrent ? 'bg-blue-500' : `${theme.secondaryBg}`
                      }`}>
                        {isAnswered ? (
                          <Check size={12} className="text-white" />
                        ) : isCurrent ? (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        ) : (
                          <Circle size={10} className={theme.iconColor} />
                        )}
                      </div>
                      {/* Label */}
                      <div className="flex-1 min-w-0">
                        <p className={`text-[11px] font-bold ${
                          isAnswered ? 'text-emerald-600' : isCurrent ? 'text-blue-600' : theme.iconColor
                        } truncate`}>
                          {q.topic}
                        </p>
                        {isAnswered && answers[q.id] && (
                          <p className={`text-[9px] ${theme.iconColor} truncate`}>
                            {Array.isArray(answers[q.id]) ? (answers[q.id] as string[]).join(', ') : String(answers[q.id])}
                          </p>
                        )}
                      </div>
                      {/* Step number */}
                      <span className={`text-[9px] font-bold ${isUpcoming ? theme.iconColor : 'opacity-0'}`}>{q.id}/{PLANNER_QUESTIONS.length}</span>
                    </div>
                  );
                })}
              </div>

              {/* Progress Bar */}
              <div className="mt-4 pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-bold ${theme.iconColor}`}>Completion</span>
                  <span className={`text-[10px] font-bold ${theme.highlight}`}>{Object.keys(answers).length}/{PLANNER_QUESTIONS.length}</span>
                </div>
                <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${(Object.keys(answers).length / PLANNER_QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Reset button */}
              {aiStarted && (
                <button
                  onClick={() => { setAiStarted(false); setCurrentStep(0); setAnswers({}); setChatMessages([]); setPlanReady(false); setIsGenerating(false); setSelectedEvents([]); setCustomHolidays([]); setGeneratedGanttCategories(null); }}
                  className={`mt-3 w-full px-3 py-2 rounded-xl border ${theme.border} text-xs font-bold ${theme.iconColor} ${theme.buttonHover} text-center`}
                >
                  Start Over
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${theme.primary} flex items-center justify-center`}>
            <CalendarClock size={20} className="text-white" />
          </div>
          <div>
            <h1 className={`text-2xl font-bold ${theme.highlight}`}>Yearly Planner</h1>
            <p className={`text-xs ${theme.iconColor}`}>Plan and visualize your complete academic year</p>
          </div>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className={`flex gap-0 p-1 rounded-xl ${theme.secondaryBg} w-fit`}>
        <button
          onClick={() => setPlannerMode('manual')}
          className={`px-5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            plannerMode === 'manual'
              ? `${theme.primary} text-white`
              : `${theme.iconColor} ${theme.buttonHover}`
          }`}
        >
          <CalendarDays size={14} /> Manual
        </button>
        <button
          onClick={() => setPlannerMode('ai')}
          className={`px-5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            plannerMode === 'ai'
              ? `${theme.primary} text-white`
              : `${theme.iconColor} ${theme.buttonHover}`
          }`}
        >
          <Sparkles size={14} /> AI-Powered
        </button>
      </div>

      {/* Mode Content */}
      {plannerMode === 'manual' && renderManualMode()}
      {plannerMode === 'ai' && renderAIMode()}
    </div>
  );
}
