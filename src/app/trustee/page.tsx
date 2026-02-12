'use client';

import React, { useState } from 'react';
import BlueprintLayout from '@/components/BlueprintLayout';
import { StatCard, TabBar, StatusBadge, DataTable } from '@/components/shared';
import StakeholderProfile from '@/components/StakeholderProfile';
import { type Theme } from '@/lib/themes';
import {
  Home, Eye, DollarSign, GraduationCap, Shield, Users, CheckCircle, XCircle,
  TrendingUp, TrendingDown, BarChart3, Calendar, FileText, AlertTriangle,
  Award, Star, Building2, Banknote, ArrowRight, Download, PieChart,
  Briefcase, Clock, Target, ChevronRight, User,
  PanelLeftClose, PanelLeftOpen
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
  { id: 'approvals', label: 'Approvals', icon: CheckCircle },
];

// ─── DASHBOARD VIEW ────────────────────────────────────
function DashboardView({ theme, setActiveModule }: { theme: Theme; setActiveModule: (m: string) => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-xl font-bold ${theme.highlight}`}>Governance Dashboard</h2>
          <p className={`text-xs ${theme.iconColor} mt-1`}>Trust-level overview — Academic Year 2025-26</p>
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
    </div>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────
function TrusteeDashboard({ theme, themeIdx, onThemeChange }: { theme?: Theme; themeIdx?: number; onThemeChange?: (idx: number) => void }) {
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
      case 'approvals': return <ApprovalsView theme={theme} />;
      case 'profile': return <StakeholderProfile role="trustee" theme={theme} onClose={() => setActiveModule('dashboard')} themeIdx={themeIdx} onThemeChange={onThemeChange} />;
      default: return <DashboardView theme={theme} setActiveModule={setActiveModule} />;
    }
  };

  return (
    <div className="flex gap-4 -m-6">
      {/* Module sidebar */}
      <div className={`${sidebarCollapsed ? 'w-12' : 'w-48'} ${theme.cardBg} border-r ${theme.border} min-h-screen p-2 space-y-0.5 shrink-0 transition-all duration-200`}>
        <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} px-2 py-2`}>
          {!sidebarCollapsed && <p className={`text-[10px] font-bold ${theme.iconColor} uppercase px-1`}>Governance</p>}
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className={`p-1 rounded-lg ${theme.buttonHover} ${theme.iconColor} transition-all`}>
            {sidebarCollapsed ? <PanelLeftOpen size={14} /> : <PanelLeftClose size={14} />}
          </button>
        </div>
        {modules.map(m => (
          <button
            key={m.id}
            onClick={() => setActiveModule(m.id)}
            title={sidebarCollapsed ? m.label : undefined}
            className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-2'} px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activeModule === m.id ? `${theme.primary} text-white` : `${theme.iconColor} ${theme.buttonHover}`
            }`}
          >
            <m.icon size={14} />
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
