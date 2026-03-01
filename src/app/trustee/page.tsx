'use client';

import React, { useState } from 'react';
import BlueprintLayout from '@/components/BlueprintLayout';
import { StatCard, TabBar, StatusBadge, DataTable, MobileFrame, MobilePreviewToggle } from '@/components/shared';
import { ChatsView } from '@/components/ChatModule';
import SupportModule from '@/components/SupportModule';
import YourInputsModule from '@/components/YourInputsModule';
import { type TeamMember } from '@/lib/auth';
import StakeholderProfile from '@/components/StakeholderProfile';
import TaskTrackerPanel from '@/components/TaskTrackerPanel';
import RecurringTasksCard from '@/components/RecurringTasksCard';
import { type Theme } from '@/lib/themes';
import {
  Home, Eye, DollarSign, GraduationCap, Shield, Users, CheckCircle, XCircle,
  TrendingUp, TrendingDown, BarChart3, Calendar, FileText, AlertTriangle,
  Award, Star, Building2, Banknote, ArrowRight, Download, PieChart,
  Briefcase, Clock, Target, ChevronRight, User,
  PanelLeftClose, PanelLeftOpen, Headphones,
  MessageSquare, Megaphone, Plus, X, Send, Bell, Edit, Paperclip, Radio, Sparkles, ShieldCheck,
  BookOpen, ClipboardList, ClipboardCheck
} from 'lucide-react';

// ─── MOCK DATA ────────────────────────────────────────
const financialSummary = {
  totalRevenue: '₹2.85 Cr',
  feeCollected: '₹1.92 Cr',
  feeCollectedPercent: '67%',
  totalExpenses: '₹1.45 Cr',
  salaryExpense: '₹98L',
  operationalExpense: '₹32L',
  capitalExpense: '₹15L',
  netSurplus: '₹47L',
  pendingFees: '₹93L',
};

const sqaafScores = [
  { domain: 'Curricular Aspects', score: 82, max: 100, grade: 'A', trend: 'up' },
  { domain: 'Teaching-Learning', score: 78, max: 100, grade: 'B+', trend: 'up' },
  { domain: 'Student Support', score: 85, max: 100, grade: 'A', trend: 'stable' },
  { domain: 'Infrastructure', score: 71, max: 100, grade: 'B', trend: 'up' },
  { domain: 'Leadership & Management', score: 88, max: 100, grade: 'A+', trend: 'up' },
  { domain: 'Governance & Quality', score: 75, max: 100, grade: 'B+', trend: 'down' },
  { domain: 'Innovation & Best Practices', score: 68, max: 100, grade: 'B', trend: 'stable' },
];

const boardResults = [
  { year: '2024-25', appeared: 145, passed: 143, distinction: 42, first: 68, passPercent: '98.6%', avgScore: '76.2%' },
  { year: '2023-24', appeared: 138, passed: 135, distinction: 38, first: 62, passPercent: '97.8%', avgScore: '74.8%' },
  { year: '2022-23', appeared: 130, passed: 128, distinction: 35, first: 58, passPercent: '98.5%', avgScore: '75.1%' },
];

const staffOverview = {
  totalStaff: 86,
  teaching: 48,
  nonTeaching: 38,
  avgExperience: '8.5 years',
  attritionRate: '4.2%',
  openPositions: 3,
  departments: [
    { name: 'Mathematics', staff: 8, hod: 'Dr. Ramesh Iyer' },
    { name: 'Science', staff: 10, hod: 'Mrs. Priya Sharma' },
    { name: 'English', staff: 7, hod: 'Mr. Suresh Nair' },
    { name: 'Hindi', staff: 5, hod: 'Mrs. Kavitha Reddy' },
    { name: 'Social Science', staff: 6, hod: 'Mr. Arun Mehta' },
    { name: 'Computer Science', staff: 4, hod: 'Mr. Deepak Verma' },
    { name: 'Physical Education', staff: 3, hod: 'Mr. Vikram Singh' },
    { name: 'Admin & Support', staff: 38, hod: 'Mr. Rajesh Kumar' },
  ],
};

const complianceItems = [
  { item: 'CBSE Affiliation Renewal', status: 'Compliant', dueDate: 'Mar 2027', priority: 'Normal' },
  { item: 'Fire Safety Certificate', status: 'Compliant', dueDate: 'Jun 2026', priority: 'Normal' },
  { item: 'RTE Compliance (25% EWS)', status: 'Attention', dueDate: 'Ongoing', priority: 'High' },
  { item: 'Staff-Student Ratio (1:30)', status: 'Compliant', dueDate: 'Ongoing', priority: 'Normal' },
  { item: 'Building Safety Audit', status: 'Due Soon', dueDate: 'Apr 2026', priority: 'Urgent' },
  { item: 'POCSO Training for Staff', status: 'Compliant', dueDate: 'Aug 2026', priority: 'Normal' },
  { item: 'Annual Accounts Filing', status: 'Pending', dueDate: 'Mar 2026', priority: 'High' },
  { item: 'Trust Meeting Minutes Filed', status: 'Compliant', dueDate: 'Quarterly', priority: 'Normal' },
];

const highValueApprovals = [
  { type: 'Capital Expenditure', desc: 'New Science Lab Equipment', amount: '₹12,50,000', from: 'Principal', date: '08 Feb', status: 'Pending' },
  { type: 'Infrastructure', desc: 'Classroom Renovation (Block B)', amount: '₹28,00,000', from: 'School Admin', date: '05 Feb', status: 'Pending' },
  { type: 'Annual Budget', desc: 'FY 2026-27 Budget Approval', amount: '₹3.2 Cr', from: 'Accounts Head', date: '01 Feb', status: 'Pending' },
  { type: 'Staff Hire', desc: '3 New Teaching Positions', amount: '₹18L/year', from: 'HR Manager', date: '28 Jan', status: 'Approved' },
  { type: 'Event Budget', desc: 'Annual Day + Sports Day', amount: '₹4,50,000', from: 'Principal', date: '25 Jan', status: 'Approved' },
];

// ─── MODULES SIDEBAR ──────────────────────────────────
const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'financial', label: 'Financial Reports', icon: DollarSign },
  { id: 'academic', label: 'Academic Performance', icon: GraduationCap },
  { id: 'sqaaf', label: 'SQAAF / Quality', icon: Award },
  { id: 'staff', label: 'Staff Overview', icon: Users },
  { id: 'hr', label: 'HR Management', icon: Briefcase },
  { id: 'compliance', label: 'Compliance & Audit', icon: Shield },
  { id: 'enrollment', label: 'Enrollment Trends', icon: TrendingUp },
  { id: 'board-meetings', label: 'Board Meetings', icon: ClipboardList },
  { id: 'communication', label: 'Communication', icon: MessageSquare },
  { id: 'approvals', label: 'Approvals', icon: CheckCircle },
  { id: 'your-inputs', label: 'Your Inputs', icon: ClipboardCheck },
  { id: 'support', label: 'Support', icon: Headphones },
];

// ─── DASHBOARD VIEW ────────────────────────────────────
function DashboardView({ theme, setActiveModule }: { theme: Theme; setActiveModule: (m: string) => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-xl font-bold ${theme.highlight}`}>Hello, Mr. Jayanti</h2>
          <p className={`text-xs ${theme.iconColor} mt-1`}>Governance Dashboard — Trust-level overview — Academic Year 2025-26</p>
        </div>
        <button onClick={() => setActiveModule('profile')} title="My Profile" className={`w-9 h-9 rounded-full ${theme.primary} text-white flex items-center justify-center text-xs font-bold hover:opacity-90 transition-opacity`}>JS</button>
      </div>

      {/* Financial KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={DollarSign} label="Total Revenue" value={financialSummary.totalRevenue} color="bg-emerald-500" theme={theme} />
        <StatCard icon={Banknote} label="Fee Collected" value={financialSummary.feeCollected} color="bg-blue-500" sub={financialSummary.feeCollectedPercent} theme={theme} />
        <StatCard icon={TrendingDown} label="Total Expenses" value={financialSummary.totalExpenses} color="bg-amber-500" theme={theme} />
        <StatCard icon={TrendingUp} label="Net Surplus" value={financialSummary.netSurplus} color="bg-purple-500" theme={theme} />
      </div>

      {/* Fees Card */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center gap-2 mb-3">
          <Banknote size={16} className={theme.iconColor} />
          <h3 className={`text-sm font-bold ${theme.highlight}`}>Fees Overview</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className={`${theme.secondaryBg} rounded-xl p-3 text-center`}>
            <p className={`text-[10px] ${theme.iconColor} mb-1`}>Today&apos;s Collection</p>
            <p className="text-lg font-bold text-emerald-600">{'\u20B9'}2,45,000</p>
          </div>
          <div className={`${theme.secondaryBg} rounded-xl p-3 text-center`}>
            <p className={`text-[10px] ${theme.iconColor} mb-1`}>Total Collected (FY)</p>
            <p className={`text-lg font-bold ${theme.highlight}`}>{'\u20B9'}1.2 Cr</p>
          </div>
          <div className={`${theme.secondaryBg} rounded-xl p-3 text-center`}>
            <p className={`text-[10px] ${theme.iconColor} mb-1`}>Outstanding</p>
            <p className="text-lg font-bold text-red-500">{'\u20B9'}18.5L</p>
          </div>
        </div>
      </div>

      {/* Quick Cards Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* SQAAF Score Summary */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>SQAAF Composite Score</h3>
            <button onClick={() => setActiveModule('sqaaf')} className={`text-xs ${theme.primaryText} font-bold`}>Details →</button>
          </div>
          <div className="flex items-center gap-4 mb-3">
            <div className={`w-16 h-16 rounded-2xl ${theme.primary} text-white flex flex-col items-center justify-center`}>
              <span className="text-lg font-bold">78</span>
              <span className="text-[8px]">/ 100</span>
            </div>
            <div>
              <p className={`text-sm font-bold ${theme.highlight}`}>Grade: A-</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Above state average (72)</p>
            </div>
          </div>
          <div className="space-y-1.5">
            {sqaafScores.slice(0, 4).map(s => (
              <div key={s.domain} className="flex items-center gap-2">
                <span className={`text-[10px] ${theme.iconColor} w-28 truncate`}>{s.domain}</span>
                <div className="flex-1 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                  <div className={`h-full rounded-full ${s.score >= 80 ? 'bg-emerald-500' : s.score >= 70 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${s.score}%` }} />
                </div>
                <span className={`text-[10px] font-bold ${theme.highlight} w-6 text-right`}>{s.score}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Board Results */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Board Exam Results</h3>
            <button onClick={() => setActiveModule('academic')} className={`text-xs ${theme.primaryText} font-bold`}>Details →</button>
          </div>
          <div className="space-y-3">
            {boardResults.map(r => (
              <div key={r.year} className={`p-3 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${theme.highlight}`}>{r.year}</span>
                  <span className="text-xs font-bold text-emerald-600">{r.passPercent} pass</span>
                </div>
                <div className="flex gap-3 mt-1">
                  <span className={`text-[10px] ${theme.iconColor}`}>{r.appeared} appeared</span>
                  <span className={`text-[10px] ${theme.iconColor}`}>{r.distinction} distinction</span>
                  <span className={`text-[10px] ${theme.iconColor}`}>Avg: {r.avgScore}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Approvals */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Pending Approvals</h3>
            <button onClick={() => setActiveModule('approvals')} className={`text-xs ${theme.primaryText} font-bold`}>View All →</button>
          </div>
          <div className="space-y-2">
            {highValueApprovals.filter(a => a.status === 'Pending').map(a => (
              <div key={a.desc} className={`p-3 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${theme.highlight}`}>{a.desc}</span>
                  <span className={`text-xs font-bold ${theme.primaryText}`}>{a.amount}</span>
                </div>
                <p className={`text-[10px] ${theme.iconColor} mt-1`}>{a.type} · from {a.from} · {a.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compliance Alerts */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Compliance Alerts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {complianceItems.filter(c => c.status !== 'Compliant').map(c => (
            <div key={c.item} className={`flex items-center gap-3 p-3 rounded-xl ${c.priority === 'Urgent' ? 'bg-red-50 border border-red-200' : c.priority === 'High' ? 'bg-amber-50 border border-amber-200' : theme.secondaryBg}`}>
              <AlertTriangle size={14} className={c.priority === 'Urgent' ? 'text-red-500' : 'text-amber-500'} />
              <div className="flex-1">
                <p className={`text-xs font-bold ${theme.highlight}`}>{c.item}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Due: {c.dueDate} · {c.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* News Board + Task Tracker — Side by Side */}
      <div className="grid grid-cols-2 gap-4">
        {/* News Board — Live School Overview */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <h3 className={`text-sm font-bold ${theme.highlight}`}>News Board</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] px-2 py-0.5 rounded-lg ${theme.secondaryBg} ${theme.highlight} font-mono font-bold`}>
                {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-lg bg-blue-500/20 text-blue-400 font-bold`}>Period 5 of 8</span>
            </div>
          </div>

          {/* Going On Now */}
          <div className="mb-3">
            <p className={`text-[10px] font-bold uppercase ${theme.iconColor} mb-1.5 flex items-center gap-1`}>
              <Radio size={10} className="text-red-500" /> Going On Now
            </p>
            <div className="space-y-1.5">
              {[
                { activity: 'Science Fair — Hall A', detail: 'Classes 6-8 · Judges evaluating projects', icon: Sparkles, color: 'bg-purple-500', pulse: true },
                { activity: 'Unit Test 3 — Mathematics', detail: 'Class 10-A, 10-B · Period 5 (11:30-12:15)', icon: FileText, color: 'bg-blue-500', pulse: true },
                { activity: 'CBSE Inspector Visit', detail: 'Principal Office · Lab inspection at 12:30', icon: ShieldCheck, color: 'bg-red-500', pulse: true },
                { activity: 'Trust Board Member Visit', detail: 'Mr. Shah touring new science wing', icon: Building2, color: 'bg-indigo-500', pulse: false },
              ].map((item, i) => (
                <div key={i} className={`flex items-center gap-2.5 p-2 rounded-xl ${theme.accentBg} border ${theme.border}`}>
                  <div className={`w-7 h-7 rounded-lg ${item.color}/20 flex items-center justify-center shrink-0 relative`}>
                    <item.icon size={13} className={item.color.replace('bg-', 'text-')} />
                    {item.pulse && <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[11px] font-bold ${theme.highlight} truncate`}>{item.activity}</p>
                    <p className={`text-[10px] ${theme.iconColor} truncate`}>{item.detail}</p>
                  </div>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 font-bold shrink-0`}>LIVE</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming */}
          <div>
            <p className={`text-[10px] font-bold uppercase ${theme.iconColor} mb-1.5 flex items-center gap-1`}>
              <Clock size={10} /> Upcoming Today
            </p>
            <div className="space-y-1.5">
              {[
                { activity: 'Trust Finance Review', detail: '3:00 PM · Boardroom · Q3 budget review', time: '3:00 PM', icon: DollarSign },
                { activity: 'PTM — Class 9', detail: '4:00 PM · Classrooms · 42 parents expected', time: '4:00 PM', icon: Users },
                { activity: 'Annual Day Rehearsal', detail: '4:30 PM · Auditorium · Dance + Drama groups', time: '4:30 PM', icon: Star },
              ].map((item, i) => (
                <div key={i} className={`flex items-center gap-2.5 p-2 rounded-xl ${theme.secondaryBg}`}>
                  <div className={`w-7 h-7 rounded-lg ${theme.accentBg} flex items-center justify-center shrink-0`}>
                    <item.icon size={13} className={theme.iconColor} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[11px] font-bold ${theme.highlight} truncate`}>{item.activity}</p>
                    <p className={`text-[10px] ${theme.iconColor} truncate`}>{item.detail}</p>
                  </div>
                  <span className={`text-[10px] ${theme.iconColor} font-medium shrink-0`}>{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Task Tracker */}
        <TaskTrackerPanel theme={theme} role="trustee" />

        {/* Recurring Tasks — Streak Tracking Card */}
        <RecurringTasksCard theme={theme} role="trustee" />
      </div>

      {/* Mobile App Preview */}
      <MobilePreviewToggle theme={theme} mobileContent={
        <MobileFrame title="Trustee Dashboard" theme={theme}>
          {/* KPI Cards */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-blue-50 rounded-xl p-2.5 text-center">
              <p className="text-lg font-bold text-blue-600">1,247</p>
              <p className="text-[9px] text-blue-500">Enrollment</p>
            </div>
            <div className="bg-emerald-50 rounded-xl p-2.5 text-center">
              <p className="text-lg font-bold text-emerald-600">67%</p>
              <p className="text-[9px] text-emerald-500">Fee Collection</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-2.5 text-center">
              <p className="text-lg font-bold text-purple-600">4.2/5</p>
              <p className="text-[9px] text-purple-500">Satisfaction</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-2.5 text-center">
              <p className="text-lg font-bold text-amber-600">78/100</p>
              <p className="text-[9px] text-amber-500">SQAAF Score</p>
            </div>
          </div>
          {/* Fund Utilization Chart */}
          <div className="bg-white rounded-xl p-3 border border-gray-200">
            <p className="text-[10px] font-bold text-gray-700 mb-2">Fund Utilization</p>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-[9px] mb-0.5">
                  <span className="text-gray-600">Staff Salary (68%)</span>
                  <span className="font-bold text-gray-800">&#8377;98L</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '68%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[9px] mb-0.5">
                  <span className="text-gray-600">Operational (22%)</span>
                  <span className="font-bold text-gray-800">&#8377;32L</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '22%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[9px] mb-0.5">
                  <span className="text-gray-600">Capital (10%)</span>
                  <span className="font-bold text-gray-800">&#8377;15L</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '10%' }} />
                </div>
              </div>
            </div>
          </div>
          {/* News Board */}
          <div className="bg-white rounded-xl p-3 border border-gray-200">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <p className="text-[10px] font-bold text-gray-700">News Board</p>
            </div>
            <div className="space-y-1.5">
              {[
                { text: 'Science Fair — Hall A (Live)', badge: 'LIVE', color: 'bg-red-100 text-red-600' },
                { text: 'CBSE Inspector Visit today', badge: 'Now', color: 'bg-amber-100 text-amber-600' },
                { text: 'Trust Finance Review at 3 PM', badge: '3 PM', color: 'bg-blue-100 text-blue-600' },
              ].map((n, i) => (
                <div key={i} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-bold ${n.color}`}>{n.badge}</span>
                  <p className="text-[10px] text-gray-700 flex-1">{n.text}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Quick Nav */}
          <div className="grid grid-cols-3 gap-2">
            <button className="py-2 bg-blue-500 text-white rounded-xl text-[9px] font-bold text-center">Financials</button>
            <button className="py-2 bg-emerald-500 text-white rounded-xl text-[9px] font-bold text-center">Approvals</button>
            <button className="py-2 bg-purple-500 text-white rounded-xl text-[9px] font-bold text-center">Reports</button>
          </div>
        </MobileFrame>
      } />
    </div>
  );
}

// ─── FINANCIAL REPORTS VIEW ────────────────────────────
function FinancialView({ theme }: { theme: Theme }) {
  const [period, setPeriod] = useState('Current FY');

  const monthlyRevenue = [
    { month: 'Apr', collected: '₹28L', target: '₹32L', percent: '87%' },
    { month: 'May', collected: '₹15L', target: '₹18L', percent: '83%' },
    { month: 'Jun', collected: '₹22L', target: '₹25L', percent: '88%' },
    { month: 'Jul', collected: '₹30L', target: '₹32L', percent: '94%' },
    { month: 'Aug', collected: '₹18L', target: '₹20L', percent: '90%' },
    { month: 'Sep', collected: '₹25L', target: '₹28L', percent: '89%' },
    { month: 'Oct', collected: '₹20L', target: '₹22L', percent: '91%' },
    { month: 'Nov', collected: '₹12L', target: '₹15L', percent: '80%' },
    { month: 'Dec', collected: '₹10L', target: '₹15L', percent: '67%' },
    { month: 'Jan', collected: '₹12L', target: '₹18L', percent: '67%' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-bold ${theme.highlight}`}>Financial Reports</h2>
          <p className={`text-xs ${theme.iconColor}`}>Trust-level financial overview</p>
        </div>
        <div className="flex gap-2">
          <TabBar tabs={['Current FY', 'Last FY', 'Comparison']} active={period} onChange={setPeriod} theme={theme} />
          <button className={`flex items-center gap-2 px-3 py-2 ${theme.secondaryBg} rounded-xl text-xs font-medium ${theme.highlight}`}>
            <Download size={12} /> Export
          </button>
        </div>
      </div>

      {/* Revenue vs Expense Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={TrendingUp} label="Total Revenue" value={financialSummary.totalRevenue} color="bg-emerald-500" theme={theme} />
        <StatCard icon={TrendingDown} label="Total Expenses" value={financialSummary.totalExpenses} color="bg-red-500" theme={theme} />
        <StatCard icon={DollarSign} label="Net Surplus" value={financialSummary.netSurplus} color="bg-blue-500" theme={theme} />
        <StatCard icon={Banknote} label="Pending Fees" value={financialSummary.pendingFees} color="bg-amber-500" theme={theme} />
      </div>

      {/* Expense Breakdown */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Expense Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Staff Salary', amount: financialSummary.salaryExpense, percent: '68%', color: 'bg-blue-500' },
            { label: 'Operational', amount: financialSummary.operationalExpense, percent: '22%', color: 'bg-amber-500' },
            { label: 'Capital', amount: financialSummary.capitalExpense, percent: '10%', color: 'bg-purple-500' },
          ].map(e => (
            <div key={e.label} className={`p-4 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${e.color}`} />
                <span className={`text-xs font-bold ${theme.highlight}`}>{e.label}</span>
              </div>
              <p className={`text-lg font-bold ${theme.highlight}`}>{e.amount}</p>
              <p className={`text-[10px] ${theme.iconColor}`}>{e.percent} of total expenses</p>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Collection */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Monthly Fee Collection</h3>
        <DataTable
          headers={['Month', 'Collected', 'Target', 'Achievement']}
          rows={monthlyRevenue.map(m => [
            <span key="m" className={`text-xs font-bold ${theme.highlight}`}>{m.month}</span>,
            <span key="c" className={`text-xs font-bold ${theme.highlight}`}>{m.collected}</span>,
            <span key="t" className={`text-xs ${theme.iconColor}`}>{m.target}</span>,
            <span key="p" className={`text-xs font-bold ${parseInt(m.percent) >= 90 ? 'text-emerald-600' : parseInt(m.percent) >= 80 ? 'text-amber-600' : 'text-red-600'}`}>{m.percent}</span>,
          ])}
          theme={theme}
        />
      </div>

      {/* Mobile App Preview */}
      <MobilePreviewToggle theme={theme} mobileContent={
        <MobileFrame title="Financial Overview" theme={theme}>
          {/* Revenue/Expense Cards */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-emerald-50 rounded-xl p-3 text-center">
              <p className="text-[9px] text-emerald-500">Total Revenue</p>
              <p className="text-lg font-bold text-emerald-600">&#8377;2.85 Cr</p>
            </div>
            <div className="bg-red-50 rounded-xl p-3 text-center">
              <p className="text-[9px] text-red-500">Total Expenses</p>
              <p className="text-lg font-bold text-red-600">&#8377;1.45 Cr</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-blue-50 rounded-xl p-3 text-center">
              <p className="text-[9px] text-blue-500">Net Surplus</p>
              <p className="text-lg font-bold text-blue-600">&#8377;47L</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-3 text-center">
              <p className="text-[9px] text-amber-500">Pending Fees</p>
              <p className="text-lg font-bold text-amber-600">&#8377;93L</p>
            </div>
          </div>
          {/* Budget vs Actual */}
          <div className="bg-white rounded-xl p-3 border border-gray-200">
            <p className="text-[10px] font-bold text-gray-700 mb-2">Budget vs Actual</p>
            <div className="space-y-2.5">
              {[
                { label: 'Staff Salary', budget: '&#8377;1.1 Cr', actual: '&#8377;98L', pct: 89 },
                { label: 'Operational', budget: '&#8377;38L', actual: '&#8377;32L', pct: 84 },
                { label: 'Capital', budget: '&#8377;20L', actual: '&#8377;15L', pct: 75 },
              ].map((b, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[9px] mb-0.5">
                    <span className="text-gray-600 font-bold">{b.label}</span>
                    <span className="text-gray-500">{b.actual} / {b.budget}</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${b.pct >= 90 ? 'bg-red-500' : b.pct >= 80 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${b.pct}%` }} />
                  </div>
                  <p className="text-[8px] text-gray-400 text-right mt-0.5">{b.pct}% utilized</p>
                </div>
              ))}
            </div>
          </div>
          {/* Tap to drill down */}
          <div className="bg-blue-50 rounded-xl p-3 border border-blue-200 text-center">
            <p className="text-[10px] font-bold text-blue-600">&#9757; Tap any category to drill down</p>
            <p className="text-[8px] text-blue-400">View monthly breakdown, department-wise splits</p>
          </div>
        </MobileFrame>
      } />
    </div>
  );
}

// ─── ACADEMIC PERFORMANCE VIEW ─────────────────────────
function AcademicView({ theme }: { theme: Theme }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className={`text-lg font-bold ${theme.highlight}`}>Academic Performance</h2>
        <p className={`text-xs ${theme.iconColor}`}>School-wide academic overview for trust governance</p>
      </div>

      {/* Board Results */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Board Exam Results (3-Year Trend)</h3>
        <DataTable
          headers={['Year', 'Appeared', 'Passed', 'Distinction', '1st Class', 'Pass %', 'Avg Score']}
          rows={boardResults.map(r => [
            <span key="y" className={`text-xs font-bold ${theme.highlight}`}>{r.year}</span>,
            <span key="a" className={`text-xs ${theme.highlight}`}>{r.appeared}</span>,
            <span key="p" className={`text-xs ${theme.highlight}`}>{r.passed}</span>,
            <span key="d" className={`text-xs font-bold text-emerald-600`}>{r.distinction}</span>,
            <span key="f" className={`text-xs ${theme.highlight}`}>{r.first}</span>,
            <span key="pp" className={`text-xs font-bold text-emerald-600`}>{r.passPercent}</span>,
            <span key="av" className={`text-xs font-bold ${theme.primaryText}`}>{r.avgScore}</span>,
          ])}
          theme={theme}
        />
      </div>

      {/* Class-wise Performance */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Class-wise Average (Half Yearly 2025-26)</h3>
        <div className="space-y-2">
          {[
            { cls: 'Class 12', avg: 74, top: 'Riya Patel (94.2%)' },
            { cls: 'Class 10', avg: 72, top: 'Aarav Patel (91.8%)' },
            { cls: 'Class 9', avg: 68, top: 'Meera Nair (89.5%)' },
            { cls: 'Class 8', avg: 71, top: 'Zara Khan (88.2%)' },
            { cls: 'Class 7', avg: 75, top: 'Arjun Singh (90.1%)' },
            { cls: 'Class 6', avg: 78, top: 'Ananya Reddy (92.4%)' },
          ].map(c => (
            <div key={c.cls} className={`flex items-center gap-4 p-3 rounded-xl ${theme.secondaryBg}`}>
              <span className={`text-xs font-bold ${theme.highlight} w-20`}>{c.cls}</span>
              <div className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full rounded-full bg-blue-500" style={{ width: `${c.avg}%` }} />
              </div>
              <span className={`text-xs font-bold ${theme.highlight} w-10 text-right`}>{c.avg}%</span>
              <span className={`text-[10px] ${theme.iconColor} w-36 truncate`}>Top: {c.top}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={GraduationCap} label="Student Strength" value="1,247" color="bg-blue-500" theme={theme} />
        <StatCard icon={Award} label="Board Pass Rate" value="98.6%" color="bg-emerald-500" theme={theme} />
        <StatCard icon={Star} label="School Avg Score" value="73.2%" color="bg-purple-500" theme={theme} />
        <StatCard icon={Target} label="SQAAF Score" value="78/100" color="bg-amber-500" theme={theme} />
      </div>

      {/* Mobile App Preview */}
      <MobilePreviewToggle theme={theme} mobileContent={
        <MobileFrame title="Reports" theme={theme}>
          {/* Report Cards */}
          <div className="space-y-2">
            {[
              { title: 'Board Exam Results 2025-26', type: 'Academic', date: 'Mar 2026', color: 'bg-blue-500', size: '2.4 MB' },
              { title: 'Fee Collection Summary', type: 'Financial', date: 'Feb 2026', color: 'bg-emerald-500', size: '1.8 MB' },
              { title: 'SQAAF Compliance Report', type: 'Quality', date: 'Jan 2026', color: 'bg-purple-500', size: '3.1 MB' },
              { title: 'Staff Performance Review', type: 'HR', date: 'Jan 2026', color: 'bg-amber-500', size: '1.2 MB' },
              { title: 'Annual Audit Report', type: 'Financial', date: 'Dec 2025', color: 'bg-red-500', size: '4.5 MB' },
            ].map((r, i) => (
              <div key={i} className="bg-white rounded-xl p-3 border border-gray-200">
                <div className="flex items-start gap-2.5">
                  <div className={`w-9 h-9 rounded-lg ${r.color} flex items-center justify-center text-white shrink-0`}>
                    <span className="text-sm">&#128196;</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold text-gray-800 truncate">{r.title}</p>
                    <p className="text-[9px] text-gray-500">{r.type} &bull; {r.date} &bull; {r.size}</p>
                  </div>
                </div>
                <div className="flex gap-1.5 mt-2">
                  <button className="flex-1 py-2 bg-gray-100 rounded-lg text-[9px] font-bold text-gray-600 text-center">&#128229; Download</button>
                  <button className="flex-1 py-2 bg-emerald-100 rounded-lg text-[9px] font-bold text-emerald-600 text-center">&#128172; WhatsApp</button>
                  <button className="flex-1 py-2 bg-blue-100 rounded-lg text-[9px] font-bold text-blue-600 text-center">&#9993; Email</button>
                </div>
              </div>
            ))}
          </div>
        </MobileFrame>
      } />
    </div>
  );
}

// ─── SQAAF / QUALITY VIEW ──────────────────────────────
function SQAAFView({ theme }: { theme: Theme }) {
  const overallScore = Math.round(sqaafScores.reduce((sum, s) => sum + s.score, 0) / sqaafScores.length);

  return (
    <div className="space-y-4">
      <div>
        <h2 className={`text-lg font-bold ${theme.highlight}`}>SQAAF — School Quality Assessment</h2>
        <p className={`text-xs ${theme.iconColor}`}>Self-assessment framework for continuous improvement</p>
      </div>

      {/* Overall Score */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 flex items-center gap-6`}>
        <div className={`w-20 h-20 rounded-2xl ${theme.primary} text-white flex flex-col items-center justify-center`}>
          <span className="text-2xl font-bold">{overallScore}</span>
          <span className="text-[10px]">/ 100</span>
        </div>
        <div>
          <p className={`text-lg font-bold ${theme.highlight}`}>Overall Grade: A-</p>
          <p className={`text-xs ${theme.iconColor} mt-1`}>7 domains assessed · Last updated: Jan 2026</p>
          <p className={`text-xs text-emerald-600 font-bold mt-1`}>+3 points vs last assessment</p>
        </div>
      </div>

      {/* Domain-wise Scores */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-4`}>Domain-wise Assessment</h3>
        <div className="space-y-3">
          {sqaafScores.map(s => (
            <div key={s.domain} className={`p-4 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-bold ${theme.highlight}`}>{s.domain}</span>
                <div className="flex items-center gap-2">
                  {s.trend === 'up' && <TrendingUp size={12} className="text-emerald-500" />}
                  {s.trend === 'down' && <TrendingDown size={12} className="text-red-500" />}
                  {s.trend === 'stable' && <ArrowRight size={12} className={theme.iconColor} />}
                  <span className={`text-xs font-bold ${s.score >= 80 ? 'text-emerald-600' : s.score >= 70 ? 'text-amber-600' : 'text-red-600'}`}>
                    {s.score}/{s.max} ({s.grade})
                  </span>
                </div>
              </div>
              <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className={`h-full rounded-full ${s.score >= 80 ? 'bg-emerald-500' : s.score >= 70 ? 'bg-amber-500' : 'bg-red-500'}`}
                  style={{ width: `${s.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── STAFF OVERVIEW VIEW ───────────────────────────────
function StaffView({ theme }: { theme: Theme }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className={`text-lg font-bold ${theme.highlight}`}>Staff Overview</h2>
        <p className={`text-xs ${theme.iconColor}`}>Trust-level staffing summary</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Staff" value={staffOverview.totalStaff} color="bg-blue-500" theme={theme} />
        <StatCard icon={GraduationCap} label="Teaching" value={staffOverview.teaching} color="bg-emerald-500" theme={theme} />
        <StatCard icon={Briefcase} label="Non-Teaching" value={staffOverview.nonTeaching} color="bg-purple-500" theme={theme} />
        <StatCard icon={Clock} label="Avg Experience" value={staffOverview.avgExperience} color="bg-amber-500" theme={theme} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Departments */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Department Heads</h3>
          <div className="space-y-2">
            {staffOverview.departments.map(d => (
              <div key={d.name} className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>{d.name}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>HOD: {d.hod}</p>
                </div>
                <span className={`text-xs font-bold ${theme.primaryText}`}>{d.staff} staff</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Staffing Metrics</h3>
          <div className="space-y-3">
            {[
              { label: 'Attrition Rate', value: staffOverview.attritionRate, note: 'Industry avg: 8%', good: true },
              { label: 'Open Positions', value: staffOverview.openPositions.toString(), note: 'PGT Physics, TGT Hindi, Lab Asst', good: false },
              { label: 'Teacher-Student Ratio', value: '1:26', note: 'CBSE norm: 1:30', good: true },
              { label: 'PhD / M.Phil Holders', value: '12', note: '25% of teaching staff', good: true },
              { label: 'Avg Training Hours / Year', value: '48 hrs', note: 'Target: 40 hrs', good: true },
              { label: 'Staff Satisfaction Score', value: '4.2/5', note: 'Based on annual survey', good: true },
            ].map(m => (
              <div key={m.label} className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>{m.label}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{m.note}</p>
                </div>
                <span className={`text-sm font-bold ${m.good ? 'text-emerald-600' : 'text-amber-600'}`}>{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── HR MANAGEMENT VIEW ─────────────────────────────────
function HRManagementView({ theme }: { theme: Theme }) {
  const staffList = [
    { name: 'Dr. Priya Sharma', designation: 'HOD - Science', department: 'Teaching', status: 'Active' },
    { name: 'Rajesh Kumar', designation: 'Admin Manager', department: 'Administration', status: 'Active' },
    { name: 'Ms. Kavita Desai', designation: 'Counselor', department: 'Student Support', status: 'On Leave' },
    { name: 'Mohammed Irfan', designation: 'Transport Head', department: 'Transport', status: 'Active' },
    { name: 'Vikram Singh', designation: 'IT Coordinator', department: 'IT & Lab', status: 'Active' },
    { name: 'Sunita Verma', designation: 'TGT - Hindi', department: 'Teaching', status: 'On Leave' },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className={`text-lg font-bold ${theme.highlight}`}>HR Management</h2>
        <p className={`text-xs ${theme.iconColor}`}>Trust-level HR and staffing summary</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Staff" value="124" color="bg-blue-500" theme={theme} />
        <StatCard icon={GraduationCap} label="Teaching" value="78" color="bg-emerald-500" theme={theme} />
        <StatCard icon={Briefcase} label="Non-Teaching" value="46" color="bg-purple-500" theme={theme} />
        <StatCard icon={Calendar} label="On Leave Today" value="5" color="bg-amber-500" theme={theme} />
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Staff Directory</h3>
        <DataTable
          headers={['Name', 'Designation', 'Department', 'Status']}
          rows={staffList.map(s => [
            <span key="name" className={`font-bold ${theme.highlight}`}>{s.name}</span>,
            <span key="desig" className={theme.iconColor}>{s.designation}</span>,
            <span key="dept" className={theme.iconColor}>{s.department}</span>,
            <StatusBadge key="status" status={s.status === 'Active' ? 'Active' : 'Pending'} theme={theme} />,
          ])}
          theme={theme}
        />
      </div>
    </div>
  );
}

// ─── COMPLIANCE VIEW ───────────────────────────────────
function ComplianceView({ theme }: { theme: Theme }) {
  const compliant = complianceItems.filter(c => c.status === 'Compliant').length;
  const total = complianceItems.length;

  return (
    <div className="space-y-4">
      <div>
        <h2 className={`text-lg font-bold ${theme.highlight}`}>Compliance & Audit</h2>
        <p className={`text-xs ${theme.iconColor}`}>Regulatory compliance tracking</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Shield} label="Compliant" value={compliant} color="bg-emerald-500" sub={`of ${total} items`} theme={theme} />
        <StatCard icon={AlertTriangle} label="Needs Attention" value={total - compliant} color="bg-amber-500" theme={theme} />
        <StatCard icon={Calendar} label="Next Audit" value="Apr 2026" color="bg-blue-500" theme={theme} />
        <StatCard icon={FileText} label="Documents Filed" value="24/28" color="bg-purple-500" theme={theme} />
      </div>

      <DataTable
        headers={['Compliance Item', 'Status', 'Due Date', 'Priority']}
        rows={complianceItems.map(c => [
          <span key="i" className={`text-xs font-bold ${theme.highlight}`}>{c.item}</span>,
          <StatusBadge key="s" status={c.status === 'Compliant' ? 'Active' : c.status === 'Due Soon' ? 'Pending' : c.status} theme={theme} />,
          <span key="d" className={`text-xs ${theme.iconColor}`}>{c.dueDate}</span>,
          <StatusBadge key="p" status={c.priority} theme={theme} />,
        ])}
        theme={theme}
      />
    </div>
  );
}

// ─── COMMUNICATION VIEW ───────────────────────────────
function CommunicationView({ theme }: { theme: Theme }) {
  const [commTab, setCommTab] = useState('Announcements');
  const [showNewAnnouncement, setShowNewAnnouncement] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [announcementForm, setAnnouncementForm] = useState({
    title: '', message: '', audience: 'All Staff', priority: 'Normal' as 'Normal' | 'Important' | 'Urgent', scheduleMode: 'now' as 'now' | 'later', scheduleDate: '',
    studentFilters: { grades: [] as string[], divisions: [] as string[], sectionGroups: [] as string[], houses: [] as string[] },
  });

  const announcements = [
    { id: 1, title: 'Trust Meeting — Annual Review 2026', message: 'Annual review meeting scheduled for 28-Feb. All trustees must attend. Agenda and financial reports attached.', sentTo: 'All', date: '10-Feb-2026', sentBy: 'Trust Secretary' },
    { id: 2, title: 'Capital Expenditure Approval Required', message: 'New science lab equipment purchase (Rs. 12.5L) requires trust approval. Details in attached proposal.', sentTo: 'All', date: '08-Feb-2026', sentBy: 'School Admin' },
    { id: 3, title: 'Annual Day Celebration — 28 February', message: 'Trustees are invited to grace the Annual Day celebration. Chief guest confirmation pending.', sentTo: 'All', date: '05-Feb-2026', sentBy: 'Principal' },
    { id: 4, title: 'Budget FY 2026-27 Draft Ready', message: 'Draft budget for FY 2026-27 is ready for trust review. Total projected: Rs. 3.2 Cr. Meeting scheduled for discussion.', sentTo: 'All', date: '01-Feb-2026', sentBy: 'Accounts Head' },
  ];

  const audienceColor = (audience: string) => {
    if (audience === 'All') return 'bg-blue-100 text-blue-700';
    if (audience === 'Teachers') return 'bg-purple-100 text-purple-700';
    return 'bg-emerald-100 text-emerald-700';
  };

  const priorityStyle = (p: string) => {
    if (p === 'Urgent') return 'bg-red-500 text-white';
    if (p === 'Important') return 'bg-amber-500 text-white';
    return 'bg-blue-100 text-blue-700';
  };

  const getRecipientCounts = () => {
    const counts: { group: string; count: number }[] = [];
    const audience = announcementForm.audience;
    if (audience === 'All Staff' || audience === 'Selected Groups') { counts.push({ group: 'Academic Staff', count: 78 }); counts.push({ group: 'Non-Academic Staff', count: 38 }); }
    if (audience === 'Teachers') { counts.push({ group: 'Teaching Staff', count: 78 }); }
    if (audience === 'Parents' || audience === 'Selected Groups') { counts.push({ group: 'Parents', count: 2847 }); }
    if (audience === 'Students' || audience === 'Selected Groups') {
      const sf = announcementForm.studentFilters;
      const hasFilters = sf.grades.length > 0 || sf.divisions.length > 0 || sf.sectionGroups.length > 0 || sf.houses.length > 0;
      if (audience === 'Students' && hasFilters) {
        let studentCount = sf.grades.length > 0 ? sf.grades.length * 120 : 2847;
        if (sf.divisions.length > 0) studentCount = Math.round(studentCount * sf.divisions.length / 4);
        if (sf.sectionGroups.length > 0) studentCount = Math.round(studentCount * sf.sectionGroups.length / 4);
        if (sf.houses.length > 0) studentCount = Math.round(studentCount * sf.houses.length / 4);
        counts.push({ group: 'Students (filtered)', count: Math.min(studentCount, 2847) });
      } else { counts.push({ group: 'Students', count: 2847 }); }
    }
    return counts;
  };
  const totalRecipients = getRecipientCounts().reduce((sum, r) => sum + r.count, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-lg font-bold ${theme.highlight}`}>Communication</h1>
        <div className="flex gap-2">
          {commTab === 'Announcements' && (
            <button onClick={() => setShowNewAnnouncement(true)} className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold flex items-center gap-1`}>
              <Plus size={12} /> New Announcement
            </button>
          )}
        </div>
      </div>

      <TabBar tabs={['Announcements', 'Circulars', 'Notices', 'Chat']} active={commTab} onChange={setCommTab} theme={theme} />

      {/* Announcements Tab */}
      {commTab === 'Announcements' && (
        <>
          <div className="grid grid-cols-3 gap-4">
            <StatCard icon={Megaphone} label="Total Sent" value="12" color="bg-blue-500" sub="this month" theme={theme} />
            <StatCard icon={Users} label="Reach" value="2,847" color="bg-emerald-500" sub="students + parents" theme={theme} />
            <StatCard icon={Bell} label="Scheduled" value="1" color="bg-amber-500" sub="upcoming" theme={theme} />
          </div>
          <div className="space-y-3">
            {announcements.map(a => (
              <div key={a.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`text-sm font-bold ${theme.highlight}`}>{a.title}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${audienceColor(a.sentTo)}`}>{a.sentTo}</span>
                </div>
                <p className={`text-xs ${theme.iconColor} leading-relaxed mb-3`}>{a.message}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] ${theme.iconColor}`}>{a.date}</span>
                    <span className={`text-[10px] ${theme.iconColor}`}>Sent by: <span className="font-bold">{a.sentBy}</span></span>
                  </div>
                  <div className="flex gap-1">
                    <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
                    <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Send size={12} className={theme.iconColor} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Circulars Tab */}
      {commTab === 'Circulars' && (
        <div className="space-y-3">
          {[
            { title: 'Trust Meeting Minutes — January 2026', date: '28-Jan', to: 'All Trustees', status: 'Sent' },
            { title: 'Annual Budget Circular', date: '15-Jan', to: 'Management + Admin', status: 'Sent' },
            { title: 'Infrastructure Upgrade Plan', date: '10-Jan', to: 'All Stakeholders', status: 'Draft' },
          ].map((c, i) => (
            <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex items-center justify-between`}>
              <div>
                <p className={`text-sm font-bold ${theme.highlight}`}>{c.title}</p>
                <p className={`text-xs ${theme.iconColor}`}>{c.date} &bull; To: {c.to}</p>
              </div>
              <StatusBadge status={c.status === 'Sent' ? 'Active' : 'Pending'} theme={theme} />
            </div>
          ))}
        </div>
      )}

      {/* Notices Tab */}
      {commTab === 'Notices' && (
        <div className="space-y-3">
          {[
            { title: 'Trust Board Meeting — 28 Feb 2026', date: '10-Feb', type: 'Meeting', status: 'Published' },
            { title: 'Annual Audit Report Available', date: '05-Feb', type: 'Financial', status: 'Published' },
            { title: 'Staff Increment Approval Pending', date: '01-Feb', type: 'HR', status: 'Action Required' },
          ].map((n, i) => (
            <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex items-center justify-between`}>
              <div>
                <p className={`text-sm font-bold ${theme.highlight}`}>{n.title}</p>
                <p className={`text-xs ${theme.iconColor}`}>{n.date} &bull; {n.type}</p>
              </div>
              <StatusBadge status={n.status === 'Published' ? 'Active' : 'Pending'} theme={theme} />
            </div>
          ))}
        </div>
      )}

      {/* ── Chat Tab ── */}
      {commTab === 'Chat' && <ChatsView theme={theme} compact />}

      {/* New Announcement Modal */}
      {showNewAnnouncement && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowNewAnnouncement(false)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} shadow-2xl w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-9 h-9 rounded-xl ${theme.primary} flex items-center justify-center text-white`}><Megaphone size={18} /></div>
                <h2 className={`text-lg font-bold ${theme.highlight}`}>New Announcement</h2>
              </div>
              <button onClick={() => setShowNewAnnouncement(false)} className={`p-1.5 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
            </div>

            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Title</label>
              <input type="text" value={announcementForm.title} onChange={e => setAnnouncementForm(prev => ({ ...prev, title: e.target.value }))} placeholder="Enter announcement title..." className={`w-full px-3 py-2.5 rounded-xl text-sm ${theme.inputBg} border ${theme.border} ${theme.highlight} outline-none focus:ring-2 focus:ring-blue-300`} />
            </div>

            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Message</label>
              <textarea value={announcementForm.message} onChange={e => setAnnouncementForm(prev => ({ ...prev, message: e.target.value }))} placeholder="Type your announcement message..." rows={4} className={`w-full px-3 py-2.5 rounded-xl text-sm ${theme.inputBg} border ${theme.border} ${theme.highlight} outline-none focus:ring-2 focus:ring-blue-300 resize-none`} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Audience</label>
                <select value={announcementForm.audience} onChange={e => setAnnouncementForm(prev => ({ ...prev, audience: e.target.value, studentFilters: { grades: [], divisions: [], sectionGroups: [], houses: [] } }))} className={`w-full px-3 py-2.5 rounded-xl text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight} outline-none focus:ring-2 focus:ring-blue-300`}>
                  <option>All Staff</option>
                  <option>Teachers</option>
                  <option>Parents</option>
                  <option>Students</option>
                  <option>Selected Groups</option>
                </select>
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Priority</label>
                <div className="flex gap-1.5">
                  {(['Normal', 'Important', 'Urgent'] as const).map(p => (
                    <button key={p} onClick={() => setAnnouncementForm(prev => ({ ...prev, priority: p }))} className={`flex-1 px-2 py-2 rounded-xl text-[10px] font-bold transition-all ${announcementForm.priority === p ? priorityStyle(p) : `${theme.secondaryBg} ${theme.iconColor} ${theme.buttonHover}`}`}>{p}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Student Sub-Filters */}
            {announcementForm.audience === 'Students' && (
              <div className={`p-3 rounded-xl border ${theme.border} ${theme.secondaryBg} space-y-3`}>
                <p className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>Student Filters</p>
                <div>
                  <label className={`text-[10px] font-medium ${theme.iconColor} block mb-1`}>Grade-wise</label>
                  <div className="flex flex-wrap gap-1">
                    {Array.from({ length: 12 }, (_, i) => `Grade ${i + 1}`).map(g => (
                      <button key={g} onClick={() => setAnnouncementForm(prev => ({ ...prev, studentFilters: { ...prev.studentFilters, grades: prev.studentFilters.grades.includes(g) ? prev.studentFilters.grades.filter(x => x !== g) : [...prev.studentFilters.grades, g] } }))} className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${announcementForm.studentFilters.grades.includes(g) ? `${theme.primary} text-white` : `${theme.cardBg} ${theme.iconColor} border ${theme.border}`}`}>{g.replace('Grade ', '')}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={`text-[10px] font-medium ${theme.iconColor} block mb-1`}>Division</label>
                  <div className="flex gap-1.5">
                    {['A', 'B', 'C', 'D'].map(d => (
                      <button key={d} onClick={() => setAnnouncementForm(prev => ({ ...prev, studentFilters: { ...prev.studentFilters, divisions: prev.studentFilters.divisions.includes(d) ? prev.studentFilters.divisions.filter(x => x !== d) : [...prev.studentFilters.divisions, d] } }))} className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${announcementForm.studentFilters.divisions.includes(d) ? `${theme.primary} text-white` : `${theme.cardBg} ${theme.iconColor} border ${theme.border}`}`}>{d}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={`text-[10px] font-medium ${theme.iconColor} block mb-1`}>Section Group</label>
                  <div className="flex flex-wrap gap-1.5">
                    {['Pre-Primary', 'Primary', 'Secondary', 'Senior Secondary'].map(s => (
                      <button key={s} onClick={() => setAnnouncementForm(prev => ({ ...prev, studentFilters: { ...prev.studentFilters, sectionGroups: prev.studentFilters.sectionGroups.includes(s) ? prev.studentFilters.sectionGroups.filter(x => x !== s) : [...prev.studentFilters.sectionGroups, s] } }))} className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${announcementForm.studentFilters.sectionGroups.includes(s) ? `${theme.primary} text-white` : `${theme.cardBg} ${theme.iconColor} border ${theme.border}`}`}>{s}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={`text-[10px] font-medium ${theme.iconColor} block mb-1`}>House-wise</label>
                  <div className="flex flex-wrap gap-1.5">
                    {[{ name: 'Red House', color: 'bg-red-500' }, { name: 'Blue House', color: 'bg-blue-500' }, { name: 'Green House', color: 'bg-green-500' }, { name: 'Yellow House', color: 'bg-yellow-500' }].map(h => (
                      <button key={h.name} onClick={() => setAnnouncementForm(prev => ({ ...prev, studentFilters: { ...prev.studentFilters, houses: prev.studentFilters.houses.includes(h.name) ? prev.studentFilters.houses.filter(x => x !== h.name) : [...prev.studentFilters.houses, h.name] } }))} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${announcementForm.studentFilters.houses.includes(h.name) ? `${theme.primary} text-white` : `${theme.cardBg} ${theme.iconColor} border ${theme.border}`}`}><span className={`w-2 h-2 rounded-full ${h.color}`} />{h.name}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Schedule Toggle */}
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-2`}>Schedule</label>
              <div className="flex items-center gap-3">
                <button onClick={() => setAnnouncementForm(prev => ({ ...prev, scheduleMode: 'now' }))} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${announcementForm.scheduleMode === 'now' ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.iconColor}`}`}><Send size={12} /> Send Now</button>
                <button onClick={() => setAnnouncementForm(prev => ({ ...prev, scheduleMode: 'later' }))} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${announcementForm.scheduleMode === 'later' ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.iconColor}`}`}><Clock size={12} /> Schedule for Later</button>
              </div>
              {announcementForm.scheduleMode === 'later' && (
                <input type="datetime-local" value={announcementForm.scheduleDate} onChange={e => setAnnouncementForm(prev => ({ ...prev, scheduleDate: e.target.value }))} className={`mt-2 w-full px-3 py-2 rounded-xl text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight} outline-none focus:ring-2 focus:ring-blue-300`} />
              )}
            </div>

            <button onClick={() => setShowPreview(true)} className={`w-full py-3 rounded-xl ${theme.primary} text-white text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity`}>
              <Eye size={14} /> Preview &amp; Confirm
            </button>
          </div>
        </div>
      )}

      {/* Preview / Confirmation Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4" onClick={() => setShowPreview(false)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} shadow-2xl w-full max-w-md p-6 space-y-4`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center text-white`}><Eye size={16} /></div>
                <h2 className={`text-base font-bold ${theme.highlight}`}>Confirm Announcement</h2>
              </div>
              <button onClick={() => setShowPreview(false)} className={`p-1.5 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
            </div>
            <div className={`p-4 rounded-xl ${theme.secondaryBg} border ${theme.border} space-y-2`}>
              <h3 className={`text-sm font-bold ${theme.highlight}`}>{announcementForm.title || '(No title)'}</h3>
              <p className={`text-xs ${theme.iconColor} leading-relaxed`}>{announcementForm.message || '(No message)'}</p>
              <div className="flex items-center gap-2 pt-1">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${priorityStyle(announcementForm.priority)}`}>{announcementForm.priority}</span>
                <span className={`text-[10px] ${theme.iconColor}`}>{announcementForm.scheduleMode === 'now' ? 'Send immediately' : `Scheduled: ${announcementForm.scheduleDate || 'Not set'}`}</span>
              </div>
            </div>
            <div className={`p-4 rounded-xl border-2 border-dashed ${theme.border} space-y-2`}>
              <p className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>This will be sent to:</p>
              <div className="space-y-1.5">
                {getRecipientCounts().map(r => (
                  <div key={r.group} className="flex items-center justify-between">
                    <span className={`text-xs font-medium ${theme.highlight}`}>{r.group}</span>
                    <span className={`text-xs font-bold ${theme.primaryText}`}>{r.count.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className={`flex items-center justify-between pt-2 border-t ${theme.border}`}>
                <span className={`text-xs font-bold ${theme.highlight}`}>Total Recipients</span>
                <span className={`text-sm font-bold ${theme.primaryText}`}>{totalRecipients.toLocaleString()}</span>
              </div>
            </div>
            {announcementForm.audience === 'Students' && (
              <div className={`text-[10px] ${theme.iconColor} space-y-0.5`}>
                {announcementForm.studentFilters.grades.length > 0 && <p>Grades: {announcementForm.studentFilters.grades.join(', ')}</p>}
                {announcementForm.studentFilters.divisions.length > 0 && <p>Divisions: {announcementForm.studentFilters.divisions.join(', ')}</p>}
                {announcementForm.studentFilters.sectionGroups.length > 0 && <p>Sections: {announcementForm.studentFilters.sectionGroups.join(', ')}</p>}
                {announcementForm.studentFilters.houses.length > 0 && <p>Houses: {announcementForm.studentFilters.houses.join(', ')}</p>}
              </div>
            )}
            <div className="flex gap-2">
              <button onClick={() => setShowPreview(false)} className={`flex-1 py-2.5 rounded-xl ${theme.secondaryBg} ${theme.highlight} text-xs font-bold flex items-center justify-center gap-1.5 ${theme.buttonHover} transition-all`}>
                <Edit size={12} /> Edit
              </button>
              <button onClick={() => { setShowPreview(false); setShowNewAnnouncement(false); setAnnouncementForm({ title: '', message: '', audience: 'All Staff', priority: 'Normal', scheduleMode: 'now', scheduleDate: '', studentFilters: { grades: [], divisions: [], sectionGroups: [], houses: [] } }); }} className={`flex-1 py-2.5 rounded-xl ${theme.primary} text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity`}>
                <Send size={12} /> {announcementForm.scheduleMode === 'now' ? 'Confirm & Send' : 'Confirm & Schedule'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ENROLLMENT TRENDS VIEW ───────────────────────────
function EnrollmentTrendsView({ theme }: { theme: Theme }) {
  const yearlyData = [
    { year: '2022-23', totalStudents: 1080, newAdmissions: 185, withdrawals: 42, boys: 562, girls: 518 },
    { year: '2023-24', totalStudents: 1148, newAdmissions: 210, withdrawals: 52, boys: 598, girls: 550 },
    { year: '2024-25', totalStudents: 1195, newAdmissions: 198, withdrawals: 48, boys: 615, girls: 580 },
    { year: '2025-26', totalStudents: 1247, newAdmissions: 225, withdrawals: 38, boys: 645, girls: 602 },
  ];

  const gradeDistribution = [
    { grade: 'Nursery-KG', students: 145, capacity: 160, trend: 'up' },
    { grade: 'Class 1-3', students: 248, capacity: 270, trend: 'up' },
    { grade: 'Class 4-5', students: 195, capacity: 210, trend: 'stable' },
    { grade: 'Class 6-8', students: 310, capacity: 330, trend: 'up' },
    { grade: 'Class 9-10', students: 218, capacity: 240, trend: 'down' },
    { grade: 'Class 11-12', students: 131, capacity: 150, trend: 'stable' },
  ];

  const maxStudents = Math.max(...yearlyData.map(y => y.totalStudents));

  return (
    <div className="space-y-4">
      <div>
        <h2 className={`text-lg font-bold ${theme.highlight}`}>Enrollment Trends</h2>
        <p className={`text-xs ${theme.iconColor}`}>Multi-year enrollment analysis for trust governance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={GraduationCap} label="Current Strength" value="1,247" color="bg-blue-500" sub="AY 2025-26" theme={theme} />
        <StatCard icon={Plus} label="New Admissions" value="225" color="bg-emerald-500" sub="+13.6% vs last year" theme={theme} />
        <StatCard icon={TrendingDown} label="Withdrawals" value="38" color="bg-red-500" sub="-20.8% vs last year" theme={theme} />
        <StatCard icon={TrendingUp} label="Net Growth" value="+4.4%" color="bg-purple-500" sub="year over year" theme={theme} />
      </div>

      {/* Yearly Bar Chart (CSS-based) */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-4`}>Student Enrollment — 4-Year Trend</h3>
        <div className="space-y-3">
          {yearlyData.map(y => {
            const pct = Math.round((y.totalStudents / maxStudents) * 100);
            const growth = yearlyData.indexOf(y) > 0
              ? ((y.totalStudents - yearlyData[yearlyData.indexOf(y) - 1].totalStudents) / yearlyData[yearlyData.indexOf(y) - 1].totalStudents * 100).toFixed(1)
              : null;
            return (
              <div key={y.year} className="flex items-center gap-4">
                <span className={`text-xs font-bold ${theme.highlight} w-16`}>{y.year}</span>
                <div className="flex-1 h-8 rounded-lg bg-slate-100 overflow-hidden relative">
                  <div className="h-full rounded-lg bg-blue-500 transition-all" style={{ width: `${pct}%` }} />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-600">
                    {y.totalStudents.toLocaleString()} students
                  </span>
                </div>
                {growth !== null && (
                  <span className={`text-[10px] font-bold w-12 text-right ${parseFloat(growth) >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                    {parseFloat(growth) >= 0 ? '+' : ''}{growth}%
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Admissions vs Withdrawals */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Admissions vs Withdrawals</h3>
        <DataTable
          headers={['Year', 'New Admissions', 'Withdrawals', 'Net Change', 'Boys', 'Girls', 'Gender Ratio']}
          rows={yearlyData.map(y => [
            <span key="year" className={`text-xs font-bold ${theme.highlight}`}>{y.year}</span>,
            <span key="adm" className="text-xs font-bold text-emerald-600">+{y.newAdmissions}</span>,
            <span key="wd" className="text-xs font-bold text-red-500">-{y.withdrawals}</span>,
            <span key="net" className={`text-xs font-bold ${y.newAdmissions - y.withdrawals >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
              {y.newAdmissions - y.withdrawals >= 0 ? '+' : ''}{y.newAdmissions - y.withdrawals}
            </span>,
            <span key="boys" className={`text-xs ${theme.highlight}`}>{y.boys}</span>,
            <span key="girls" className={`text-xs ${theme.highlight}`}>{y.girls}</span>,
            <span key="ratio" className={`text-xs font-bold ${theme.primaryText}`}>
              {(y.boys / y.girls).toFixed(2)} : 1
            </span>,
          ])}
          theme={theme}
        />
      </div>

      {/* Grade-wise Distribution */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Grade-wise Distribution — AY 2025-26</h3>
        <div className="space-y-3">
          {gradeDistribution.map(g => {
            const fillPct = Math.round((g.students / g.capacity) * 100);
            return (
              <div key={g.grade} className={`p-3 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${theme.highlight}`}>{g.grade}</span>
                    {g.trend === 'up' && <TrendingUp size={12} className="text-emerald-500" />}
                    {g.trend === 'down' && <TrendingDown size={12} className="text-red-500" />}
                    {g.trend === 'stable' && <ArrowRight size={12} className={theme.iconColor} />}
                  </div>
                  <span className={`text-xs ${theme.iconColor}`}>
                    <span className={`font-bold ${theme.highlight}`}>{g.students}</span> / {g.capacity} capacity
                  </span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${fillPct >= 90 ? 'bg-red-500' : fillPct >= 75 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                    style={{ width: `${fillPct}%` }}
                  />
                </div>
                <p className={`text-[10px] mt-1 ${fillPct >= 90 ? 'text-red-500' : fillPct >= 75 ? 'text-amber-600' : 'text-emerald-600'} font-bold`}>
                  {fillPct}% filled {fillPct >= 90 ? '— Near capacity' : ''}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── BOARD MEETINGS VIEW ──────────────────────────────
function BoardMeetingsView({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Upcoming');
  const [showSchedule, setShowSchedule] = useState(false);

  const upcomingMeetings = [
    { id: 'BM001', title: 'Annual Budget Review FY 2026-27', date: '28 Feb 2026', time: '10:00 AM - 1:00 PM', venue: 'Trust Boardroom', chairperson: 'Mr. Jayanti Shah', attendees: 8, agenda: 'FY 2026-27 budget approval, Capital expenditure proposals, Staff increment review', status: 'Confirmed' },
    { id: 'BM002', title: 'Infrastructure Upgrade Discussion', date: '15 Mar 2026', time: '11:00 AM - 12:30 PM', venue: 'Conference Room A', chairperson: 'Mr. Jayanti Shah', attendees: 6, agenda: 'Classroom renovation Block B, New science lab, Smart board installation', status: 'Tentative' },
    { id: 'BM003', title: 'Quarterly Academic Review — Q3', date: '28 Mar 2026', time: '10:00 AM - 12:00 PM', venue: 'Trust Boardroom', chairperson: 'Mr. Jayanti Shah', attendees: 8, agenda: 'Board exam results, SQAAF score update, Teacher performance review', status: 'Confirmed' },
  ];

  const completedMeetings = [
    { id: 'BM-C01', title: 'Trust Meeting — January Review', date: '28 Jan 2026', venue: 'Trust Boardroom', attendees: 7, decisions: ['Approved ₹12.5L for science lab equipment', 'Deferred classroom renovation to Q2', 'Approved 3 new teaching positions'], minutes: true },
    { id: 'BM-C02', title: 'Emergency Meeting — Fee Revision', date: '15 Jan 2026', venue: 'Conference Room A', attendees: 5, decisions: ['5% fee increase for AY 2026-27 approved', 'EWS seat allocation maintained at 25%', 'Late fee waiver policy revised'], minutes: true },
    { id: 'BM-C03', title: 'Quarterly Review — Q2 2025-26', date: '28 Dec 2025', venue: 'Trust Boardroom', attendees: 8, decisions: ['Sports Day budget of ₹4.5L approved', 'Annual Day chief guest confirmed', 'Transport route optimisation approved'], minutes: true },
    { id: 'BM-C04', title: 'CBSE Affiliation Review', date: '10 Dec 2025', venue: 'Principal Office', attendees: 4, decisions: ['Affiliation renewal docs submitted', 'Building safety audit scheduled for Apr 2026', 'Fire safety certificate renewed'], minutes: true },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-bold ${theme.highlight}`}>Board Meeting Management</h2>
          <p className={`text-xs ${theme.iconColor}`}>Schedule, track and manage trust board meetings</p>
        </div>
        <button onClick={() => setShowSchedule(!showSchedule)} className={`flex items-center gap-2 px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>
          <Plus size={14} /> Schedule Meeting
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Calendar} label="Upcoming Meetings" value={upcomingMeetings.length} color="bg-blue-500" theme={theme} />
        <StatCard icon={CheckCircle} label="Completed (FY)" value={completedMeetings.length} color="bg-emerald-500" theme={theme} />
        <StatCard icon={FileText} label="Minutes Filed" value={completedMeetings.filter(m => m.minutes).length} color="bg-purple-500" theme={theme} />
        <StatCard icon={Users} label="Avg Attendance" value="6.5" color="bg-amber-500" sub="members per meeting" theme={theme} />
      </div>

      {/* Schedule Meeting Form */}
      {showSchedule && (
        <div className={`${theme.cardBg} rounded-2xl border-2 border-blue-300 p-5 space-y-4`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Schedule New Meeting</h3>
            <button onClick={() => setShowSchedule(false)} className={`p-1.5 rounded-lg ${theme.buttonHover} ${theme.iconColor}`}><X size={16} /></button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Meeting Title</label>
              <input type="text" placeholder="e.g. Quarterly Trust Review" className={`w-full px-3 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm ${theme.highlight} outline-none focus:ring-2 focus:ring-blue-300`} />
            </div>
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Chairperson</label>
              <select className={`w-full px-3 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm ${theme.highlight} outline-none`}>
                <option>Mr. Jayanti Shah (Chairman)</option>
                <option>Mrs. Parul Shah (Vice Chair)</option>
                <option>Mr. Rajesh Mehta (Secretary)</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Date</label>
              <input type="date" className={`w-full px-3 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm ${theme.highlight} outline-none focus:ring-2 focus:ring-blue-300`} />
            </div>
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Time</label>
              <input type="time" className={`w-full px-3 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm ${theme.highlight} outline-none focus:ring-2 focus:ring-blue-300`} />
            </div>
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Venue</label>
              <select className={`w-full px-3 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm ${theme.highlight} outline-none`}>
                <option>Trust Boardroom</option>
                <option>Conference Room A</option>
                <option>Principal Office</option>
                <option>Virtual (Google Meet)</option>
              </select>
            </div>
          </div>
          <div>
            <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Agenda Items</label>
            <textarea placeholder="Enter agenda items (one per line)..." rows={3} className={`w-full px-3 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm ${theme.highlight} outline-none focus:ring-2 focus:ring-blue-300 resize-none`} />
          </div>
          <div className="flex justify-end gap-3">
            <button onClick={() => setShowSchedule(false)} className={`px-4 py-2 rounded-xl text-xs font-bold ${theme.secondaryBg} ${theme.highlight}`}>Cancel</button>
            <button onClick={() => { setShowSchedule(false); window.alert('Meeting scheduled successfully! (Blueprint demo)'); }} className={`flex items-center gap-2 px-5 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>
              <Calendar size={14} /> Schedule Meeting
            </button>
          </div>
        </div>
      )}

      <TabBar tabs={['Upcoming', 'Completed']} active={tab} onChange={setTab} theme={theme} />

      {tab === 'Upcoming' && (
        <div className="space-y-3">
          {upcomingMeetings.map(m => (
            <div key={m.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-mono ${theme.iconColor}`}>{m.id}</span>
                    <StatusBadge status={m.status === 'Confirmed' ? 'Active' : 'Pending'} theme={theme} />
                  </div>
                  <h4 className={`text-sm font-bold ${theme.highlight}`}>{m.title}</h4>
                  <p className={`text-[10px] ${theme.iconColor} mt-1`}>
                    {m.date} &middot; {m.time} &middot; {m.venue}
                  </p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Chair: {m.chairperson} &middot; {m.attendees} members</p>
                </div>
              </div>
              <div className={`mt-3 p-3 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1`}>Agenda</p>
                <div className="space-y-0.5">
                  {m.agenda.split(', ').map((item, i) => (
                    <p key={i} className={`text-xs ${theme.highlight}`}>{i + 1}. {item}</p>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button className={`flex items-center gap-1 px-3 py-2 ${theme.secondaryBg} rounded-xl text-xs font-bold ${theme.highlight} ${theme.buttonHover}`}>
                  <Edit size={12} /> Edit
                </button>
                <button className={`flex items-center gap-1 px-3 py-2 ${theme.secondaryBg} rounded-xl text-xs font-bold ${theme.highlight} ${theme.buttonHover}`}>
                  <Send size={12} /> Send Invite
                </button>
                <button className={`flex items-center gap-1 px-3 py-2 ${theme.secondaryBg} rounded-xl text-xs font-bold ${theme.highlight} ${theme.buttonHover}`}>
                  <Download size={12} /> Agenda PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'Completed' && (
        <div className="space-y-3">
          {completedMeetings.map(m => (
            <div key={m.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-mono ${theme.iconColor}`}>{m.id}</span>
                    <StatusBadge status="Cleared" theme={theme} />
                    {m.minutes && <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">Minutes Filed</span>}
                  </div>
                  <h4 className={`text-sm font-bold ${theme.highlight}`}>{m.title}</h4>
                  <p className={`text-[10px] ${theme.iconColor} mt-1`}>{m.date} &middot; {m.venue} &middot; {m.attendees} attendees</p>
                </div>
              </div>
              <div className={`mt-3 p-3 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1`}>Key Decisions / Action Items</p>
                <div className="space-y-1">
                  {m.decisions.map((d, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle size={12} className="text-emerald-500 mt-0.5 shrink-0" />
                      <p className={`text-xs ${theme.highlight}`}>{d}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button className={`flex items-center gap-1 px-3 py-2 ${theme.secondaryBg} rounded-xl text-xs font-bold ${theme.highlight} ${theme.buttonHover}`}>
                  <Eye size={12} /> View Minutes
                </button>
                <button className={`flex items-center gap-1 px-3 py-2 ${theme.secondaryBg} rounded-xl text-xs font-bold ${theme.highlight} ${theme.buttonHover}`}>
                  <Download size={12} /> Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mobile App Preview */}
      <MobilePreviewToggle theme={theme} mobileContent={
        <MobileFrame title="School Visits" theme={theme}>
          {/* Schedule Visit Button */}
          <button className="w-full py-3 bg-blue-500 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2">
            &#128197; Schedule New Visit
          </button>
          {/* Upcoming Visit */}
          <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
            <p className="text-[10px] font-bold text-blue-700 mb-1">Next Visit</p>
            <p className="text-[11px] font-bold text-gray-800">Annual Budget Review</p>
            <p className="text-[9px] text-gray-500">28 Feb 2026 &bull; 10:00 AM &bull; Trust Boardroom</p>
            <div className="flex gap-1.5 mt-2">
              <span className="text-[8px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 font-bold">Confirmed</span>
              <span className="text-[8px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-bold">8 attendees</span>
            </div>
          </div>
          {/* Visit Log */}
          <div className="bg-white rounded-xl p-3 border border-gray-200">
            <p className="text-[10px] font-bold text-gray-700 mb-2">Recent Visits</p>
            <div className="space-y-2">
              {[
                { title: 'January Review', date: '28 Jan 2026', decisions: '3 decisions taken' },
                { title: 'Fee Revision Meeting', date: '15 Jan 2026', decisions: '5% increase approved' },
                { title: 'Quarterly Review Q2', date: '28 Dec 2025', decisions: 'Sports Day budget approved' },
              ].map((v, i) => (
                <div key={i} className="flex items-center gap-2.5 p-2 bg-gray-50 rounded-lg">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 text-[10px] shrink-0">&#10003;</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-gray-800 truncate">{v.title}</p>
                    <p className="text-[9px] text-gray-500">{v.date} &bull; {v.decisions}</p>
                  </div>
                  <span className="text-[9px] text-blue-500 font-bold shrink-0">View</span>
                </div>
              ))}
            </div>
          </div>
          {/* Meeting Notes with Voice */}
          <div className="bg-white rounded-xl p-3 border border-gray-200">
            <p className="text-[10px] font-bold text-gray-700 mb-2">Meeting Notes</p>
            <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-200">
              <p className="text-[10px] text-gray-600 italic">Tap to add notes for your visit...</p>
            </div>
            <div className="flex gap-2 mt-2">
              <button className="flex-1 py-2 bg-gray-100 rounded-lg text-[9px] font-bold text-gray-600 text-center">&#9998; Type Notes</button>
              <button className="flex-1 py-2 bg-red-100 rounded-lg text-[9px] font-bold text-red-600 text-center flex items-center justify-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Voice Record
              </button>
            </div>
          </div>
        </MobileFrame>
      } />
    </div>
  );
}

// ─── APPROVALS VIEW ────────────────────────────────────
function ApprovalsView({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Pending');
  const filtered = tab === 'All' ? highValueApprovals : highValueApprovals.filter(a => a.status === tab);

  return (
    <div className="space-y-4">
      <div>
        <h2 className={`text-lg font-bold ${theme.highlight}`}>High-Value Approvals</h2>
        <p className={`text-xs ${theme.iconColor}`}>Items requiring Trust-level approval (₹1L+)</p>
      </div>

      <TabBar tabs={['Pending', 'Approved', 'All']} active={tab} onChange={setTab} theme={theme} />

      <div className="space-y-3">
        {filtered.map(a => (
          <div key={a.desc} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${theme.secondaryBg} ${theme.primaryText}`}>{a.type}</span>
                  <StatusBadge status={a.status} theme={theme} />
                </div>
                <h4 className={`text-sm font-bold ${theme.highlight} mt-2`}>{a.desc}</h4>
                <p className={`text-[10px] ${theme.iconColor} mt-1`}>Requested by {a.from} · {a.date}</p>
              </div>
              <span className={`text-lg font-bold ${theme.highlight}`}>{a.amount}</span>
            </div>
            {a.status === 'Pending' && (
              <div className="flex gap-2 mt-3">
                <button className="flex items-center gap-1 px-4 py-2 bg-emerald-500 text-white rounded-xl text-xs font-bold">
                  <CheckCircle size={12} /> Approve
                </button>
                <button className={`flex items-center gap-1 px-4 py-2 ${theme.secondaryBg} rounded-xl text-xs font-bold ${theme.highlight}`}>
                  <Eye size={12} /> View Details
                </button>
                <button className="flex items-center gap-1 px-4 py-2 bg-red-100 text-red-600 rounded-xl text-xs font-bold">
                  <XCircle size={12} /> Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile App Preview */}
      <MobilePreviewToggle theme={theme} mobileContent={
        <MobileFrame title="Approvals" theme={theme}>
          {/* Pending Approval Cards */}
          <div className="space-y-2">
            {[
              { desc: 'Science Lab Equipment', amount: '&#8377;12.5L', from: 'Principal', type: 'Budget', date: '25 Feb', color: 'bg-blue-500' },
              { desc: 'Classroom Renovation Block B', amount: '&#8377;8.2L', from: 'Admin Officer', type: 'Infrastructure', date: '22 Feb', color: 'bg-purple-500' },
              { desc: 'Annual Day Event Budget', amount: '&#8377;4.5L', from: 'Event Coordinator', type: 'Event', date: '20 Feb', color: 'bg-amber-500' },
            ].map((a, i) => (
              <div key={i} className="bg-white rounded-xl p-3 border border-gray-200">
                <div className="flex items-start gap-2.5">
                  <div className={`w-9 h-9 rounded-lg ${a.color} flex items-center justify-center text-white shrink-0`}>
                    <span className="text-sm">&#128203;</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold text-gray-800">{a.desc}</p>
                    <p className="text-[9px] text-gray-500">{a.type} &bull; {a.from} &bull; {a.date}</p>
                  </div>
                  <p className="text-sm font-bold text-gray-800 shrink-0">{a.amount}</p>
                </div>
                {/* Swipe Gesture Hint */}
                <div className="flex items-center justify-center gap-3 mt-2 py-1.5 bg-gray-50 rounded-lg">
                  <span className="text-[9px] text-red-500 font-bold">&larr; Reject</span>
                  <span className="text-[8px] text-gray-300">|</span>
                  <span className="text-[9px] text-gray-400">Swipe</span>
                  <span className="text-[8px] text-gray-300">|</span>
                  <span className="text-[9px] text-emerald-500 font-bold">Approve &rarr;</span>
                </div>
                <div className="flex gap-1.5 mt-2">
                  <button className="flex-1 py-2.5 bg-emerald-500 text-white rounded-xl text-[10px] font-bold text-center">&#10003; Approve</button>
                  <button className="flex-1 py-2.5 bg-gray-100 text-gray-600 rounded-xl text-[10px] font-bold text-center">&#128065; Details</button>
                  <button className="flex-1 py-2.5 bg-red-100 text-red-600 rounded-xl text-[10px] font-bold text-center">&#10005; Reject</button>
                </div>
              </div>
            ))}
          </div>
          {/* Summary */}
          <div className="bg-amber-50 rounded-xl p-2.5 border border-amber-200 text-center">
            <p className="text-[10px] font-bold text-amber-700">3 pending approvals totaling &#8377;25.2L</p>
          </div>
        </MobileFrame>
      } />
    </div>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────
function TrusteeDashboard({ theme, themeIdx, onThemeChange, currentUser }: { theme?: Theme; themeIdx?: number; onThemeChange?: (idx: number) => void; currentUser?: TeamMember }) {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  if (!theme) return null;

  const renderContent = () => {
    switch (activeModule) {
      case 'dashboard': return <DashboardView theme={theme} setActiveModule={setActiveModule} />;
      case 'financial': return <FinancialView theme={theme} />;
      case 'academic': return <AcademicView theme={theme} />;
      case 'sqaaf': return <SQAAFView theme={theme} />;
      case 'staff': return <StaffView theme={theme} />;
      case 'hr': return <HRManagementView theme={theme} />;
      case 'compliance': return <ComplianceView theme={theme} />;
      case 'enrollment': return <EnrollmentTrendsView theme={theme} />;
      case 'board-meetings': return <BoardMeetingsView theme={theme} />;
      case 'communication': return <CommunicationView theme={theme} />;
      case 'approvals': return <ApprovalsView theme={theme} />;
      case 'your-inputs': return <YourInputsModule theme={theme} userName={currentUser?.name || ''} />;
      case 'support': return <SupportModule theme={theme} role="trustee" />;
      case 'profile': return <StakeholderProfile role="trustee" theme={theme} onClose={() => setActiveModule('dashboard')} themeIdx={themeIdx} onThemeChange={onThemeChange} />;
      default: return <DashboardView theme={theme} setActiveModule={setActiveModule} />;
    }
  };

  return (
    <div className="flex gap-4 -m-6">
      {/* Module sidebar */}
      <div className={`${sidebarCollapsed ? 'w-14' : 'w-48'} ${theme.cardBg} border-r ${theme.border} min-h-screen p-2 space-y-0.5 shrink-0 transition-all duration-200`}>
        <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} px-2 py-2`}>
          {!sidebarCollapsed && <p className={`text-[10px] font-bold ${theme.iconColor} uppercase px-1`}>Governance</p>}
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
            <m.icon size={sidebarCollapsed ? 18 : 14} />
            {!sidebarCollapsed && m.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <BlueprintLayout>
      <TrusteeDashboard />
    </BlueprintLayout>
  );
}
