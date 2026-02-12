'use client';

import React, { useState } from 'react';
import BlueprintLayout from '@/components/BlueprintLayout';
import { StatCard, TabBar, StatusBadge, SearchBar, DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  Home, BookOpen, Users, UserCheck, CheckCircle, BarChart3, Megaphone,
  GraduationCap, Briefcase, Clock, AlertTriangle, FileText, Send,
  Calendar, Shield, ShieldCheck, Eye, Download, Plus, Check, X, Search,
  TrendingUp, Heart, ClipboardCheck, Star, DollarSign, Building2,
  Bell, ArrowRight, MessageSquare, Award, Filter, User, ListTodo, Circle,
  PanelLeftClose, PanelLeftOpen, Banknote, IndianRupee, Mail, Inbox,
  ChevronRight, CalendarDays
} from 'lucide-react';
import StakeholderProfile from '@/components/StakeholderProfile';

// ─── MODULE SIDEBAR ────────────────────────────────
const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'academics', label: 'Academics', icon: BookOpen },
  { id: 'staff', label: 'Staff Overview', icon: Briefcase },
  { id: 'hr', label: 'HR Management', icon: Briefcase },
  { id: 'compliance', label: 'Compliance', icon: ShieldCheck },
  { id: 'communication', label: 'Communication', icon: MessageSquare },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays },
  { id: 'approvals', label: 'Approvals', icon: CheckCircle },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'announcements', label: 'Announcements', icon: Megaphone },
];

function PrincipalDashboard({ theme, themeIdx, onThemeChange }: { theme?: Theme; themeIdx?: number; onThemeChange?: (idx: number) => void }) {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  if (!theme) return null;

  return (
    <div className="flex gap-4 -m-6">
      {/* Module sidebar */}
      <div className={`${sidebarCollapsed ? 'w-12' : 'w-48'} ${theme.cardBg} border-r ${theme.border} min-h-screen p-2 space-y-0.5 shrink-0 transition-all duration-200`}>
        <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} px-2 py-2`}>
          {!sidebarCollapsed && <p className={`text-[10px] font-bold ${theme.iconColor} uppercase px-1`}>Modules</p>}
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
            <m.icon size={14} /> {!sidebarCollapsed && m.label}
          </button>
        ))}
      </div>

      {/* Module content */}
      <div className="flex-1 p-6 space-y-4 overflow-x-hidden">
        {activeModule === 'dashboard' && <DashboardHome theme={theme} onProfileClick={() => setActiveModule('profile')} />}
        {activeModule === 'academics' && <AcademicsModule theme={theme} />}
        {activeModule === 'staff' && <StaffOverviewModule theme={theme} />}
        {activeModule === 'hr' && <HRManagementModule theme={theme} />}
        {activeModule === 'compliance' && <ComplianceModule theme={theme} />}
        {activeModule === 'communication' && <CommunicationModule theme={theme} />}
        {activeModule === 'calendar' && <CalendarModule theme={theme} />}
        {activeModule === 'approvals' && <ApprovalsModule theme={theme} />}
        {activeModule === 'reports' && <ReportsModule theme={theme} />}
        {activeModule === 'announcements' && <AnnouncementsModule theme={theme} />}
        {activeModule === 'profile' && <StakeholderProfile role="principal" theme={theme} onClose={() => setActiveModule('dashboard')} themeIdx={themeIdx} onThemeChange={onThemeChange} />}
      </div>
    </div>
  );
}

// ─── DASHBOARD HOME ──────────────────────────────────
function DashboardHome({ theme, onProfileClick }: { theme: Theme; onProfileClick: () => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Principal Dashboard</h1>
        <button onClick={onProfileClick} title="My Profile" className={`w-9 h-9 rounded-full ${theme.primary} text-white flex items-center justify-center text-xs font-bold hover:opacity-90 transition-opacity`}>SM</button>
      </div>
      {/* Attendance Row — Student + Academic Staff + Non-Academic Staff (compact) */}
      <div className="grid grid-cols-3 gap-3">
        {/* Student Attendance */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-3`}>
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <Users size={12} className={theme.iconColor} />
                <h3 className={`text-[11px] font-bold ${theme.highlight}`}>Students</h3>
              </div>
              <p className={`text-sm font-bold ${theme.highlight}`}>2,598 / 2,847</p>
              <p className={`text-[9px] ${theme.iconColor} mt-0.5`}>Enrolled: 3,000</p>
            </div>
            <div className="w-10 h-10 ml-2 shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <circle r="16" cx="18" cy="18" fill="none" stroke="#9ca3af" strokeWidth="4"
                  strokeDasharray={`${(153 / 3000) * 100.53} ${100.53 - (153 / 3000) * 100.53}`}
                  strokeDashoffset="25.13" transform="rotate(-90 18 18)" />
                <circle r="16" cx="18" cy="18" fill="none" stroke="#ef4444" strokeWidth="4"
                  strokeDasharray={`${(249 / 3000) * 100.53} ${100.53 - (249 / 3000) * 100.53}`}
                  strokeDashoffset={`${25.13 - (153 / 3000) * 100.53}`} transform="rotate(-90 18 18)" />
                <circle r="16" cx="18" cy="18" fill="none" stroke="#10b981" strokeWidth="4"
                  strokeDasharray={`${(2598 / 3000) * 100.53} ${100.53 - (2598 / 3000) * 100.53}`}
                  strokeDashoffset={`${25.13 - (153 / 3000) * 100.53 - (249 / 3000) * 100.53}`} transform="rotate(-90 18 18)" />
                <text x="18" y="19" textAnchor="middle" dominantBaseline="middle" className="fill-emerald-600" style={{ fontSize: '7px', fontWeight: 700 }}>87%</text>
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /><span className={`text-[9px] ${theme.iconColor}`}>2,598</span></span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" /><span className={`text-[9px] ${theme.iconColor}`}>249</span></span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block" /><span className={`text-[9px] ${theme.iconColor}`}>153</span></span>
          </div>
        </div>

        {/* Academic Staff */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-3`}>
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <GraduationCap size={12} className={theme.iconColor} />
                <h3 className={`text-[11px] font-bold ${theme.highlight}`}>Academic Staff</h3>
              </div>
              <p className={`text-sm font-bold ${theme.highlight}`}>72 / 78</p>
              <p className={`text-[9px] text-emerald-600 mt-0.5`}>92% Present</p>
            </div>
            <div className="w-10 h-10 ml-2 shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <circle r="16" cx="18" cy="18" fill="none" stroke="#ef4444" strokeWidth="4"
                  strokeDasharray={`${(6 / 78) * 100.53} ${100.53 - (6 / 78) * 100.53}`}
                  strokeDashoffset="25.13" transform="rotate(-90 18 18)" />
                <circle r="16" cx="18" cy="18" fill="none" stroke="#10b981" strokeWidth="4"
                  strokeDasharray={`${(72 / 78) * 100.53} ${100.53 - (72 / 78) * 100.53}`}
                  strokeDashoffset={`${25.13 - (6 / 78) * 100.53}`} transform="rotate(-90 18 18)" />
                <text x="18" y="19" textAnchor="middle" dominantBaseline="middle" className="fill-emerald-600" style={{ fontSize: '7px', fontWeight: 700 }}>92%</text>
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /><span className={`text-[9px] ${theme.iconColor}`}>72</span></span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" /><span className={`text-[9px] ${theme.iconColor}`}>6</span></span>
          </div>
        </div>

        {/* Non-Academic Staff */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-3`}>
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <Briefcase size={12} className={theme.iconColor} />
                <h3 className={`text-[11px] font-bold ${theme.highlight}`}>Non-Academic</h3>
              </div>
              <p className={`text-sm font-bold ${theme.highlight}`}>56 / 64</p>
              <p className={`text-[9px] text-emerald-600 mt-0.5`}>88% Present</p>
            </div>
            <div className="w-10 h-10 ml-2 shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <circle r="16" cx="18" cy="18" fill="none" stroke="#ef4444" strokeWidth="4"
                  strokeDasharray={`${(8 / 64) * 100.53} ${100.53 - (8 / 64) * 100.53}`}
                  strokeDashoffset="25.13" transform="rotate(-90 18 18)" />
                <circle r="16" cx="18" cy="18" fill="none" stroke="#10b981" strokeWidth="4"
                  strokeDasharray={`${(56 / 64) * 100.53} ${100.53 - (56 / 64) * 100.53}`}
                  strokeDashoffset={`${25.13 - (8 / 64) * 100.53}`} transform="rotate(-90 18 18)" />
                <text x="18" y="19" textAnchor="middle" dominantBaseline="middle" className="fill-emerald-600" style={{ fontSize: '7px', fontWeight: 700 }}>88%</text>
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /><span className={`text-[9px] ${theme.iconColor}`}>56</span></span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" /><span className={`text-[9px] ${theme.iconColor}`}>8</span></span>
          </div>
        </div>
      </div>

      {/* Remaining Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={ClipboardCheck} label="Avg Attendance" value="94.2%" color="bg-emerald-500" theme={theme} />
        <StatCard icon={Award} label="Academic Performance" value="87.5%" color="bg-purple-500" theme={theme} />
        <StatCard icon={Clock} label="Pending Approvals" value="8" color="bg-amber-500" theme={theme} />
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
            <p className={`text-lg font-bold text-emerald-600`}>{'\u20B9'}2,45,000</p>
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

      {/* Recent Activity + Task Tracker — Side by Side */}
      <div className="grid grid-cols-2 gap-4">
        {/* Recent Activity */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Recent Activity</h3>
          <div className="space-y-2">
            {[
              { text: 'Fee defaulter report generated — 23 students with overdue balance', time: '15 min ago', type: 'report' },
              { text: 'Staff leave approved — Ms. Priya Sharma (3 days CL)', time: '45 min ago', type: 'approval' },
              { text: 'New admission batch processed — 12 students for Class I', time: '2 hours ago', type: 'admission' },
              { text: 'Disciplinary case resolved — Arjun Singh (Class 8-B)', time: '3 hours ago', type: 'welfare' },
              { text: 'Monthly attendance report submitted to board', time: '5 hours ago', type: 'report' },
            ].map((a, i) => (
              <div key={i} className={`flex items-center gap-3 p-2 rounded-xl ${theme.accentBg}`}>
                <div className={`w-2 h-2 rounded-full ${
                  a.type === 'report' ? 'bg-blue-500' :
                  a.type === 'approval' ? 'bg-emerald-500' :
                  a.type === 'admission' ? 'bg-purple-500' :
                  'bg-amber-500'
                }`} />
                <p className={`text-xs ${theme.highlight} flex-1`}>{a.text}</p>
                <span className={`text-[10px] ${theme.iconColor}`}>{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Task Tracker */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center gap-2 mb-3">
            <ListTodo size={16} className={theme.iconColor} />
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Task Tracker</h3>
          </div>
          <div className="space-y-2">
            {[
              { task: 'Review mid-term exam papers', due: '15-Feb', priority: 'High', status: 'In Progress' },
              { task: 'Submit SQAAF self-assessment', due: '20-Feb', priority: 'Urgent', status: 'Pending' },
              { task: 'Approve staff leave requests (3)', due: 'Today', priority: 'High', status: 'Pending' },
              { task: 'Prepare Annual Day speech', due: '25-Feb', priority: 'Normal', status: 'Not Started' },
              { task: 'Review fee defaulter list', due: '12-Feb', priority: 'High', status: 'Completed' },
            ].map((t, i) => (
              <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${theme.accentBg} border-l-[3px] ${
                t.priority === 'Urgent' ? 'border-l-red-500' :
                t.priority === 'High' ? 'border-l-amber-500' :
                'border-l-blue-500'
              }`}>
                {/* Checkbox circle */}
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  t.status === 'Completed' ? 'border-emerald-500 bg-emerald-500' : `border-gray-300`
                }`}>
                  {t.status === 'Completed' && <Check size={10} className="text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-bold ${theme.highlight} ${t.status === 'Completed' ? 'line-through opacity-60' : ''}`}>{t.task}</p>
                  <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>Due: {t.due}</p>
                </div>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold whitespace-nowrap ${
                  t.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                  t.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                  t.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                  'bg-gray-100 text-gray-600'
                }`}>{t.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { label: 'View Reports', icon: BarChart3, color: 'bg-blue-500' },
            { label: 'Approve Requests', icon: CheckCircle, color: 'bg-emerald-500' },
            { label: 'Send Circular', icon: Send, color: 'bg-indigo-500' },
            { label: 'Schedule Meeting', icon: Calendar, color: 'bg-purple-500' },
          ].map(a => (
            <button key={a.label} className={`flex items-center gap-2 p-3 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} transition-all`}>
              <div className={`w-8 h-8 rounded-lg ${a.color} flex items-center justify-center text-white`}><a.icon size={14} /></div>
              <span className={`text-xs font-bold ${theme.highlight}`}>{a.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ACADEMICS MODULE ────────────────────────────────
function AcademicsModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Overview');

  const subjectPerformance = [
    { subject: 'Mathematics', score: 89, color: 'bg-blue-500', trend: '+2.1%' },
    { subject: 'Science', score: 85, color: 'bg-emerald-500', trend: '+1.5%' },
    { subject: 'English', score: 91, color: 'bg-purple-500', trend: '+3.2%' },
    { subject: 'Social Studies', score: 83, color: 'bg-amber-500', trend: '-0.8%' },
    { subject: 'Hindi', score: 88, color: 'bg-teal-500', trend: '+1.9%' },
  ];

  const classPerformance = [
    { cls: 'Class I', strength: 52, avgScore: 91.2, passPercent: 100, topScorer: 'Aarav Mehta' },
    { cls: 'Class II', strength: 48, avgScore: 89.5, passPercent: 100, topScorer: 'Saanvi Patel' },
    { cls: 'Class III', strength: 55, avgScore: 87.8, passPercent: 98.2, topScorer: 'Vivaan Sharma' },
    { cls: 'Class IV', strength: 50, avgScore: 85.3, passPercent: 96.0, topScorer: 'Anaya Gupta' },
    { cls: 'Class V', strength: 47, avgScore: 83.6, passPercent: 95.7, topScorer: 'Reyansh Iyer' },
    { cls: 'Class VI', strength: 53, avgScore: 82.1, passPercent: 94.3, topScorer: 'Diya Reddy' },
  ];

  const examResults = [
    { exam: 'Unit Test 1', date: '15-Jul-2025', classes: 'I-VI', avgScore: '84.2%', passRate: '96.8%', status: 'Published' },
    { exam: 'Mid-Term', date: '20-Sep-2025', classes: 'I-VI', avgScore: '81.7%', passRate: '95.1%', status: 'Published' },
    { exam: 'Unit Test 2', date: '10-Nov-2025', classes: 'I-VI', avgScore: '86.5%', passRate: '97.2%', status: 'Published' },
    { exam: 'Pre-Final', date: '15-Jan-2026', classes: 'I-VI', avgScore: '87.9%', passRate: '97.8%', status: 'Published' },
    { exam: 'Final Exam', date: '10-Mar-2026', classes: 'I-VI', avgScore: '—', passRate: '—', status: 'Upcoming' },
  ];

  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Academic Performance</h1>
      <TabBar tabs={['Overview', 'Class Performance', 'Exam Results']} active={tab} onChange={setTab} theme={theme} />

      {tab === 'Overview' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <StatCard icon={Award} label="Overall Score" value="87.5%" color="bg-purple-500" sub="+1.8% vs last term" theme={theme} />
            <StatCard icon={TrendingUp} label="Pass Rate" value="96.4%" color="bg-emerald-500" theme={theme} />
            <StatCard icon={Star} label="Distinction %" value="34.2%" color="bg-blue-500" theme={theme} />
          </div>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-4`}>Subject-wise Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {subjectPerformance.map(s => (
                <div key={s.subject} className={`${theme.secondaryBg} rounded-xl p-4 text-center`}>
                  <div className={`w-12 h-12 rounded-full ${s.color} mx-auto mb-2 flex items-center justify-center`}>
                    <span className="text-white text-sm font-bold">{s.score}%</span>
                  </div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>{s.subject}</p>
                  <p className={`text-[10px] font-bold mt-1 ${s.trend.startsWith('+') ? 'text-emerald-600' : 'text-red-500'}`}>{s.trend}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'Class Performance' && (
        <DataTable
          headers={['Class', 'Strength', 'Avg Score', 'Pass %', 'Top Scorer']}
          rows={classPerformance.map(c => [
            <span key="cls" className={`font-bold ${theme.highlight}`}>{c.cls}</span>,
            <span key="str" className={theme.iconColor}>{c.strength}</span>,
            <span key="avg" className={`font-bold ${theme.highlight}`}>{c.avgScore}%</span>,
            <span key="pass" className={c.passPercent === 100 ? 'text-emerald-600 font-bold' : `font-bold ${theme.highlight}`}>{c.passPercent}%</span>,
            <span key="top" className={`${theme.primaryText} font-bold`}>{c.topScorer}</span>,
          ])}
          theme={theme}
        />
      )}

      {tab === 'Exam Results' && (
        <DataTable
          headers={['Exam', 'Date', 'Classes', 'Avg Score', 'Pass Rate', 'Status']}
          rows={examResults.map(e => [
            <span key="exam" className={`font-bold ${theme.highlight}`}>{e.exam}</span>,
            <span key="date" className={theme.iconColor}>{e.date}</span>,
            <span key="cls" className={theme.iconColor}>{e.classes}</span>,
            <span key="avg" className={`font-bold ${theme.highlight}`}>{e.avgScore}</span>,
            <span key="pass" className={`font-bold ${theme.highlight}`}>{e.passRate}</span>,
            <StatusBadge key="status" status={e.status === 'Published' ? 'Active' : 'Pending'} theme={theme} />,
          ])}
          theme={theme}
        />
      )}
    </div>
  );
}

// ─── STAFF OVERVIEW MODULE ───────────────────────────
function StaffOverviewModule({ theme }: { theme: Theme }) {
  const departments = [
    { dept: 'Teaching', head: 'Dr. Priya Sharma', strength: 89, attendance: 96.2, performance: 'Excellent' },
    { dept: 'Admin', head: 'Rajesh Kumar', strength: 23, attendance: 94.8, performance: 'Good' },
    { dept: 'Transport', head: 'Mohammed Irfan', strength: 18, attendance: 91.5, performance: 'Good' },
    { dept: 'IT & Lab', head: 'Vikram Singh', strength: 8, attendance: 97.0, performance: 'Excellent' },
    { dept: 'Security', head: 'Ramesh Yadav', strength: 4, attendance: 100, performance: 'Good' },
  ];

  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Staff Overview</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={UserCheck} label="Present Today" value="128/142" color="bg-emerald-500" sub="90.1%" theme={theme} />
        <StatCard icon={Calendar} label="On Leave" value="8" color="bg-amber-500" theme={theme} />
        <StatCard icon={Clock} label="Late Today" value="3" color="bg-red-500" theme={theme} />
        <StatCard icon={Briefcase} label="Open Positions" value="3" color="bg-blue-500" theme={theme} />
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Department-wise Overview</h3>
        <DataTable
          headers={['Department', 'Head', 'Strength', 'Attendance %', 'Performance']}
          rows={departments.map(d => [
            <span key="dept" className={`font-bold ${theme.highlight}`}>{d.dept}</span>,
            <span key="head" className={theme.iconColor}>{d.head}</span>,
            <span key="str" className={`font-bold ${theme.highlight}`}>{d.strength}</span>,
            <span key="att" className={d.attendance >= 95 ? 'text-emerald-600 font-bold' : `font-bold ${theme.highlight}`}>{d.attendance}%</span>,
            <StatusBadge key="perf" status={d.performance === 'Excellent' ? 'Active' : 'Pending'} theme={theme} />,
          ])}
          theme={theme}
        />
      </div>

      {/* Staff Attendance Trend */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>This Week&apos;s Attendance Snapshot</h3>
        <div className="grid grid-cols-5 gap-2">
          {[
            { day: 'Mon', present: 136, total: 142 },
            { day: 'Tue', present: 131, total: 142 },
            { day: 'Wed', present: 134, total: 142 },
            { day: 'Thu', present: 128, total: 142 },
            { day: 'Fri', present: 130, total: 142 },
          ].map(d => (
            <div key={d.day} className={`${theme.secondaryBg} rounded-xl p-3 text-center`}>
              <p className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>{d.day}</p>
              <p className={`text-lg font-bold ${theme.highlight} mt-1`}>{d.present}</p>
              <p className={`text-[10px] ${theme.iconColor}`}>of {d.total}</p>
              <div className={`mt-2 h-1.5 rounded-full bg-gray-200`}>
                <div className="h-full rounded-full bg-emerald-500" style={{ width: `${(d.present / d.total) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── HR MANAGEMENT MODULE ────────────────────────────
function HRManagementModule({ theme }: { theme: Theme }) {
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
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>HR Management</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Staff" value="124" color="bg-blue-500" theme={theme} />
        <StatCard icon={GraduationCap} label="Teaching" value="78" color="bg-emerald-500" theme={theme} />
        <StatCard icon={Briefcase} label="Non-Teaching" value="46" color="bg-purple-500" theme={theme} />
        <StatCard icon={Calendar} label="On Leave Today" value="5" color="bg-amber-500" theme={theme} />
      </div>

      {/* Staff List */}
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

      {/* Quick Actions */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { label: 'View Payroll Summary', icon: DollarSign, color: 'bg-emerald-500', sub: 'Monthly payroll overview' },
            { label: 'Leave Requests', icon: Calendar, color: 'bg-amber-500', sub: '3 pending approvals' },
            { label: 'Attendance Report', icon: ClipboardCheck, color: 'bg-blue-500', sub: 'Staff attendance trends' },
          ].map(a => (
            <button key={a.label} className={`flex items-center gap-3 p-4 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} transition-all text-left`}>
              <div className={`w-10 h-10 rounded-xl ${a.color} flex items-center justify-center text-white`}><a.icon size={18} /></div>
              <div>
                <span className={`text-xs font-bold ${theme.highlight} block`}>{a.label}</span>
                <span className={`text-[10px] ${theme.iconColor}`}>{a.sub}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── COMPLIANCE MODULE ──────────────────────────────
function ComplianceModule({ theme }: { theme: Theme }) {
  const overdueItems = [
    { title: 'Fire Safety Certificate renewal', dueDate: '31-Jan-2026', assignedTo: 'Rajesh Kumar', status: 'Overdue' },
    { title: 'CBSE affiliation renewal', dueDate: '15-Jan-2026', assignedTo: 'Dr. Priya Sharma', status: 'Overdue' },
  ];

  const dueThisMonth = [
    { title: 'Annual audit report submission', dueDate: '28-Feb-2026', assignedTo: 'Accounts Head', status: 'In Progress' },
    { title: 'Staff background verification', dueDate: '25-Feb-2026', assignedTo: 'HR Manager', status: 'Pending' },
    { title: 'POCSO training completion', dueDate: '20-Feb-2026', assignedTo: 'Vice Principal', status: 'In Progress' },
  ];

  const upcomingItems = [
    { title: 'RTE compliance report', dueDate: '15-Mar-2026', assignedTo: 'School Admin', status: 'Scheduled' },
    { title: 'Infrastructure safety inspection', dueDate: '01-Apr-2026', assignedTo: 'Rajesh Kumar', status: 'Scheduled' },
    { title: 'Annual health checkup records', dueDate: '10-Apr-2026', assignedTo: 'Medical Officer', status: 'Scheduled' },
  ];

  const sqaafDomains = [
    { name: 'Curricular Aspects', score: 82, color: 'bg-emerald-500' },
    { name: 'Teaching-Learning', score: 78, color: 'bg-blue-500' },
    { name: 'Infrastructure', score: 71, color: 'bg-amber-500' },
    { name: 'Human Resources', score: 85, color: 'bg-purple-500' },
    { name: 'Student Support', score: 80, color: 'bg-teal-500' },
    { name: 'Governance', score: 75, color: 'bg-indigo-500' },
    { name: 'Innovation', score: 68, color: 'bg-orange-500' },
  ];

  const statusBadgeColor = (status: string) => {
    if (status === 'Overdue') return 'bg-red-100 text-red-700';
    if (status === 'In Progress') return 'bg-amber-100 text-amber-700';
    if (status === 'Pending') return 'bg-yellow-100 text-yellow-700';
    return 'bg-blue-100 text-blue-700';
  };

  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Compliance</h1>

      {/* Task Report Cards */}
      <div className="space-y-4">
        {/* Important / Overdue (Red) */}
        <div className={`rounded-2xl border-2 border-red-200 bg-red-50 p-4`}>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={16} className="text-red-600" />
            <h3 className="text-sm font-bold text-red-700">Important / Overdue</h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-200 text-red-800 font-bold">{overdueItems.length} items</span>
          </div>
          <div className="space-y-2">
            {overdueItems.map(item => (
              <div key={item.title} className={`${theme.cardBg} rounded-xl p-3 flex items-center justify-between`}>
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>{item.title}</p>
                  <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>Due: {item.dueDate} &middot; Assigned to: {item.assignedTo}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${statusBadgeColor(item.status)}`}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Due This Month (Amber) */}
        <div className={`rounded-2xl border-2 border-amber-200 bg-amber-50 p-4`}>
          <div className="flex items-center gap-2 mb-3">
            <Clock size={16} className="text-amber-600" />
            <h3 className="text-sm font-bold text-amber-700">Due This Month</h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200 text-amber-800 font-bold">{dueThisMonth.length} items</span>
          </div>
          <div className="space-y-2">
            {dueThisMonth.map(item => (
              <div key={item.title} className={`${theme.cardBg} rounded-xl p-3 flex items-center justify-between`}>
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>{item.title}</p>
                  <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>Due: {item.dueDate} &middot; Assigned to: {item.assignedTo}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${statusBadgeColor(item.status)}`}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming (Blue) */}
        <div className={`rounded-2xl border-2 border-blue-200 bg-blue-50 p-4`}>
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={16} className="text-blue-600" />
            <h3 className="text-sm font-bold text-blue-700">Upcoming</h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-200 text-blue-800 font-bold">{upcomingItems.length} items</span>
          </div>
          <div className="space-y-2">
            {upcomingItems.map(item => (
              <div key={item.title} className={`${theme.cardBg} rounded-xl p-3 flex items-center justify-between`}>
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>{item.title}</p>
                  <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>Due: {item.dueDate} &middot; Assigned to: {item.assignedTo}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${statusBadgeColor(item.status)}`}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SQAAF Section */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className={`text-sm font-bold ${theme.highlight}`}>SQAAF — School Quality Assessment & Accreditation Framework</h3>
            <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>Self-assessment for continuous improvement &middot; 7 domains</p>
          </div>
          <div className={`w-14 h-14 rounded-2xl ${theme.primary} text-white flex flex-col items-center justify-center`}>
            <span className="text-lg font-bold">78</span>
            <span className="text-[8px]">/ 100</span>
          </div>
        </div>
        <div className="space-y-3">
          {sqaafDomains.map(d => (
            <div key={d.name} className={`flex items-center gap-3 p-3 rounded-xl ${theme.secondaryBg}`}>
              <span className={`text-xs font-bold ${theme.highlight} w-40`}>{d.name}</span>
              <div className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden">
                <div className={`h-full rounded-full ${d.score >= 80 ? 'bg-emerald-500' : d.score >= 70 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${d.score}%` }} />
              </div>
              <span className={`text-xs font-bold ${d.score >= 80 ? 'text-emerald-600' : d.score >= 70 ? 'text-amber-600' : 'text-red-600'} w-12 text-right`}>{d.score}/100</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── APPROVALS MODULE ────────────────────────────────
function ApprovalsModule({ theme }: { theme: Theme }) {
  const pendingApprovals = [
    {
      id: 1, type: 'Leave', requestedBy: 'Ms. Sunita Verma', date: '10-Feb-2026',
      details: 'Casual Leave — 3 days (12-Feb to 14-Feb) for family function',
      priority: 'Normal',
    },
    {
      id: 2, type: 'Purchase', requestedBy: 'Rajesh Kumar (Admin)', date: '09-Feb-2026',
      details: 'Lab equipment purchase — 5 microscopes @ Rs. 8,500 each (Total: Rs. 42,500)',
      priority: 'High',
    },
    {
      id: 3, type: 'Event', requestedBy: 'Dr. Priya Sharma (HOD)', date: '08-Feb-2026',
      details: 'Inter-school Science Exhibition — 25-Feb-2026, estimated budget Rs. 35,000',
      priority: 'Normal',
    },
    {
      id: 4, type: 'Transfer', requestedBy: 'Front Desk', date: '07-Feb-2026',
      details: 'Transfer Certificate request — Meera Nair (Class 8-A), reason: family relocation',
      priority: 'Urgent',
    },
    {
      id: 5, type: 'Leave', requestedBy: 'Mr. Mohammed Irfan (Transport)', date: '06-Feb-2026',
      details: 'Medical Leave — 5 days (15-Feb to 19-Feb), medical certificate attached',
      priority: 'High',
    },
  ];

  const approvalHistory = [
    { type: 'Leave', requestedBy: 'Mr. Vikram Singh', date: '05-Feb-2026', details: 'Casual Leave — 1 day', decision: 'Approved', decidedOn: '05-Feb-2026' },
    { type: 'Purchase', requestedBy: 'Lab Dept.', date: '03-Feb-2026', details: 'Chemistry lab reagents — Rs. 12,000', decision: 'Approved', decidedOn: '04-Feb-2026' },
    { type: 'Event', requestedBy: 'Sports Dept.', date: '01-Feb-2026', details: 'Annual Sports Day prep — Rs. 85,000', decision: 'Approved', decidedOn: '02-Feb-2026' },
    { type: 'Leave', requestedBy: 'Ms. Kavita Desai', date: '30-Jan-2026', details: 'Sick Leave — 2 days', decision: 'Approved', decidedOn: '30-Jan-2026' },
    { type: 'Purchase', requestedBy: 'IT Dept.', date: '28-Jan-2026', details: 'Projector replacement — Rs. 55,000', decision: 'Rejected', decidedOn: '29-Jan-2026' },
  ];

  const priorityColor = (priority: string) => {
    if (priority === 'Urgent') return 'bg-red-100 text-red-700';
    if (priority === 'High') return 'bg-amber-100 text-amber-700';
    return 'bg-blue-100 text-blue-700';
  };

  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Approvals</h1>
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={Clock} label="Pending" value="5" color="bg-amber-500" theme={theme} />
        <StatCard icon={AlertTriangle} label="Urgent" value="1" color="bg-red-500" theme={theme} />
        <StatCard icon={CheckCircle} label="Approved This Week" value="4" color="bg-emerald-500" theme={theme} />
        <StatCard icon={X} label="Rejected This Week" value="1" color="bg-slate-500" theme={theme} />
      </div>

      {/* Pending Approvals */}
      <div>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Pending Approvals</h3>
        <div className="space-y-3">
          {pendingApprovals.map(a => (
            <div key={a.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${priorityColor(a.priority)}`}>{a.priority}</span>
                  <span className={`text-xs font-bold ${theme.secondaryBg} px-2 py-1 rounded-lg ${theme.iconColor}`}>{a.type}</span>
                </div>
                <span className={`text-xs ${theme.iconColor}`}>{a.date}</span>
              </div>
              <p className={`text-sm font-bold ${theme.highlight}`}>{a.details}</p>
              <p className={`text-xs ${theme.iconColor} mt-1`}>Requested by: {a.requestedBy}</p>
              <div className="flex gap-2 mt-3">
                <button className="px-3 py-1.5 rounded-xl bg-emerald-500 text-white text-xs font-bold flex items-center gap-1"><Check size={10} /> Approve</button>
                <button className="px-3 py-1.5 rounded-xl bg-red-500 text-white text-xs font-bold flex items-center gap-1"><X size={10} /> Reject</button>
                <button className={`px-3 py-1.5 rounded-xl border ${theme.border} text-xs font-bold ${theme.highlight}`}>View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Approval History */}
      <div>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Approval History</h3>
        <DataTable
          headers={['Type', 'Requested By', 'Date', 'Details', 'Decision', 'Decided On']}
          rows={approvalHistory.map(h => [
            <span key="type" className={`text-xs font-bold ${theme.secondaryBg} px-2 py-1 rounded-lg ${theme.iconColor}`}>{h.type}</span>,
            <span key="by" className={`font-bold ${theme.highlight}`}>{h.requestedBy}</span>,
            <span key="date" className={theme.iconColor}>{h.date}</span>,
            <span key="details" className={`text-xs ${theme.highlight}`}>{h.details}</span>,
            <StatusBadge key="decision" status={h.decision} theme={theme} />,
            <span key="decided" className={theme.iconColor}>{h.decidedOn}</span>,
          ])}
          theme={theme}
        />
      </div>
    </div>
  );
}

// ─── REPORTS MODULE ──────────────────────────────────
function ReportsModule({ theme }: { theme: Theme }) {
  const reports = [
    { title: 'Academic Report', desc: 'Class-wise results, subject analysis, toppers list, grade distribution', icon: Award, color: 'bg-purple-500', lastGenerated: '08-Feb-2026' },
    { title: 'Financial Summary', desc: 'Fee collection, outstanding dues, expense breakdown, monthly P&L', icon: DollarSign, color: 'bg-emerald-500', lastGenerated: '05-Feb-2026' },
    { title: 'Attendance Report', desc: 'Student and staff attendance trends, absentee patterns, class-wise data', icon: ClipboardCheck, color: 'bg-blue-500', lastGenerated: '10-Feb-2026' },
    { title: 'Staff Performance', desc: 'Department-wise performance, training completed, leave utilization', icon: Briefcase, color: 'bg-indigo-500', lastGenerated: '01-Feb-2026' },
    { title: 'Infrastructure Status', desc: 'Classroom utilization, lab equipment inventory, maintenance pending', icon: Building2, color: 'bg-amber-500', lastGenerated: '28-Jan-2026' },
    { title: 'Compliance Report', desc: 'Board compliance, safety audits, UDISE submission status, RTE compliance', icon: Shield, color: 'bg-red-500', lastGenerated: '15-Jan-2026' },
  ];

  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Reports</h1>
      <p className={`text-xs ${theme.iconColor}`}>Generate and download school performance reports for board meetings and compliance.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((r, i) => (
          <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 hover:shadow-md transition-all`}>
            <div className={`w-10 h-10 rounded-xl ${r.color} flex items-center justify-center text-white mb-3`}>
              <r.icon size={20} />
            </div>
            <h4 className={`text-sm font-bold ${theme.highlight} mb-1`}>{r.title}</h4>
            <p className={`text-xs ${theme.iconColor} mb-3 leading-relaxed`}>{r.desc}</p>
            <div className="flex items-center justify-between">
              <span className={`text-[10px] ${theme.iconColor}`}>Last generated: {r.lastGenerated}</span>
              <button className={`px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold flex items-center gap-1`}>
                <Download size={10} /> Generate
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Report Generation Summary</h3>
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'Reports Generated', value: '24', sub: 'this month' },
            { label: 'Shared with Board', value: '6', sub: 'this quarter' },
            { label: 'Pending Reviews', value: '2', sub: 'awaiting approval' },
            { label: 'Scheduled Reports', value: '3', sub: 'auto-generate' },
          ].map((s, i) => (
            <div key={i} className={`${theme.secondaryBg} rounded-xl p-3 text-center`}>
              <p className={`text-lg font-bold ${theme.highlight}`}>{s.value}</p>
              <p className={`text-xs ${theme.iconColor}`}>{s.label}</p>
              <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ANNOUNCEMENTS MODULE ────────────────────────────
function AnnouncementsModule({ theme }: { theme: Theme }) {
  const announcements = [
    {
      id: 1, title: 'Annual Day Celebration — 28 February 2026',
      message: 'All students from Class I to X are expected to participate in the Annual Day celebration. Parents are cordially invited. Rehearsals begin from 15-Feb.',
      sentTo: 'All', date: '10-Feb-2026', sentBy: 'Principal',
    },
    {
      id: 2, title: 'Parent-Teacher Meeting Schedule',
      message: 'PTM for classes VI to X will be held on 15-Feb (Saturday). Parents are requested to collect the progress report from respective class teachers.',
      sentTo: 'Parents', date: '08-Feb-2026', sentBy: 'Principal',
    },
    {
      id: 3, title: 'Staff Development Workshop',
      message: 'A mandatory workshop on NEP 2020 implementation strategies will be conducted on 20-Feb. All teaching staff must attend. Relief arrangements in progress.',
      sentTo: 'Teachers', date: '07-Feb-2026', sentBy: 'Vice Principal',
    },
    {
      id: 4, title: 'Revised School Timings — Effective 1 March',
      message: 'Summer timings will be effective from 1-Mar-2026. School hours: 7:00 AM to 1:00 PM. Bus timings will be updated accordingly.',
      sentTo: 'All', date: '05-Feb-2026', sentBy: 'Principal',
    },
    {
      id: 5, title: 'Inter-School Science Exhibition',
      message: 'Selected students from classes VIII to X will represent our school at the District Science Exhibition on 25-Feb. Parents of selected students will be notified separately.',
      sentTo: 'Parents', date: '03-Feb-2026', sentBy: 'Dr. Priya Sharma',
    },
    {
      id: 6, title: 'Fee Payment Reminder — Last Date 15 February',
      message: 'Parents are requested to clear all pending fee dues by 15-Feb-2026. Late fee of Rs. 500 will be applicable after the due date.',
      sentTo: 'Parents', date: '01-Feb-2026', sentBy: 'Accounts Dept.',
    },
  ];

  const audienceColor = (audience: string) => {
    if (audience === 'All') return 'bg-blue-100 text-blue-700';
    if (audience === 'Teachers') return 'bg-purple-100 text-purple-700';
    return 'bg-emerald-100 text-emerald-700';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Announcements</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}>
          <Plus size={14} /> New Announcement
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard icon={Megaphone} label="Total Sent" value="42" color="bg-blue-500" sub="this month" theme={theme} />
        <StatCard icon={Users} label="Reach" value="2,847" color="bg-emerald-500" sub="students + parents" theme={theme} />
        <StatCard icon={Bell} label="Scheduled" value="3" color="bg-amber-500" sub="upcoming" theme={theme} />
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
    </div>
  );
}

// ─── COMMUNICATION MODULE ────────────────────────────
function CommunicationModule({ theme }: { theme: Theme }) {
  const messages = [
    { id: 1, type: 'Circular', subject: 'Annual Day Rehearsal Schedule', from: 'Principal Office', to: 'All Staff + Parents', date: '11-Feb-2026', status: 'Sent', reads: '2,145 / 2,847' },
    { id: 2, type: 'Notice', subject: 'Fee Payment Reminder — Last Date 15 Feb', from: 'Accounts Dept.', to: 'Parents (Defaulters)', date: '10-Feb-2026', status: 'Sent', reads: '189 / 312' },
    { id: 3, type: 'Message', subject: 'Staff Meeting — Agenda for 14-Feb', from: 'Vice Principal', to: 'All Teaching Staff', date: '10-Feb-2026', status: 'Sent', reads: '65 / 78' },
    { id: 4, type: 'Circular', subject: 'PTM Schedule — Classes VI to X', from: 'Principal Office', to: 'Parents (VI-X)', date: '08-Feb-2026', status: 'Sent', reads: '890 / 1,120' },
    { id: 5, type: 'Alert', subject: 'Water Supply Disruption — 12 Feb', from: 'Admin Office', to: 'All', date: '07-Feb-2026', status: 'Sent', reads: '2,540 / 2,847' },
    { id: 6, type: 'Draft', subject: 'Summer Timing Change Notification', from: 'Principal Office', to: 'All', date: '—', status: 'Draft', reads: '—' },
  ];

  const typeColor = (type: string) => {
    if (type === 'Circular') return 'bg-blue-100 text-blue-700';
    if (type === 'Notice') return 'bg-amber-100 text-amber-700';
    if (type === 'Alert') return 'bg-red-100 text-red-700';
    if (type === 'Draft') return 'bg-gray-100 text-gray-600';
    return 'bg-purple-100 text-purple-700';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Communication</h1>
        <div className="flex gap-2">
          <button className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold flex items-center gap-1`}>
            <Plus size={12} /> New Circular
          </button>
          <button className={`px-4 py-2 ${theme.secondaryBg} rounded-xl text-xs font-bold ${theme.highlight} flex items-center gap-1`}>
            <Send size={12} /> Quick Message
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={Send} label="Sent This Month" value="18" color="bg-blue-500" theme={theme} />
        <StatCard icon={Inbox} label="Drafts" value="2" color="bg-gray-500" theme={theme} />
        <StatCard icon={Users} label="Reach" value="2,847" color="bg-emerald-500" sub="students + parents" theme={theme} />
        <StatCard icon={Mail} label="Read Rate" value="78%" color="bg-purple-500" theme={theme} />
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Messages & Circulars</h3>
        <div className="space-y-2">
          {messages.map(m => (
            <div key={m.id} className={`flex items-center gap-3 p-3 rounded-xl ${theme.secondaryBg}`}>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap ${typeColor(m.type)}`}>{m.type}</span>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-bold ${theme.highlight} truncate`}>{m.subject}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{m.from} &rarr; {m.to}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-[10px] ${theme.iconColor}`}>{m.date}</p>
                <p className={`text-[10px] ${m.status === 'Draft' ? 'text-gray-500' : 'text-emerald-600'} font-bold`}>{m.reads}</p>
              </div>
              <button className={`p-1.5 rounded-lg ${theme.buttonHover}`}><ChevronRight size={12} className={theme.iconColor} /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CALENDAR MODULE ─────────────────────────────────
function CalendarModule({ theme }: { theme: Theme }) {
  const currentMonth = 'February 2026';
  const daysInMonth = 28;
  const startDay = 0; // Feb 2026 starts on Sunday
  const today = 12;

  const events: Record<number, { label: string; color: string }[]> = {
    1: [{ label: 'Fee Due', color: 'bg-amber-400' }],
    5: [{ label: 'Staff Meeting', color: 'bg-blue-400' }],
    12: [{ label: 'Today', color: 'bg-emerald-400' }],
    14: [{ label: 'PTM (VI-X)', color: 'bg-purple-400' }],
    15: [{ label: 'Fee Deadline', color: 'bg-red-400' }],
    20: [{ label: 'POCSO Training', color: 'bg-indigo-400' }],
    25: [{ label: 'Science Exhb.', color: 'bg-teal-400' }],
    28: [{ label: 'Annual Day', color: 'bg-pink-400' }],
  };

  const upcomingEvents = [
    { date: '14-Feb', label: 'Parent-Teacher Meeting (Classes VI-X)', type: 'Meeting', color: 'bg-purple-500' },
    { date: '15-Feb', label: 'Fee Payment Deadline', type: 'Finance', color: 'bg-red-500' },
    { date: '20-Feb', label: 'POCSO Awareness Training — All Staff', type: 'Training', color: 'bg-indigo-500' },
    { date: '25-Feb', label: 'Inter-School Science Exhibition', type: 'Event', color: 'bg-teal-500' },
    { date: '28-Feb', label: 'Annual Day Celebration', type: 'Event', color: 'bg-pink-500' },
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>School Calendar</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Calendar Grid */}
        <div className={`lg:col-span-2 ${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center justify-between mb-4">
            <button className={`p-1.5 rounded-lg ${theme.buttonHover}`}><ArrowRight size={14} className={`${theme.iconColor} rotate-180`} /></button>
            <h3 className={`text-sm font-bold ${theme.highlight}`}>{currentMonth}</h3>
            <button className={`p-1.5 rounded-lg ${theme.buttonHover}`}><ArrowRight size={14} className={theme.iconColor} /></button>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {dayNames.map(d => (
              <div key={d} className={`text-center text-[10px] font-bold ${theme.iconColor} uppercase py-1`}>{d}</div>
            ))}
            {Array.from({ length: startDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = day === today;
              const dayEvents = events[day] || [];
              return (
                <div key={day} className={`relative p-1.5 rounded-lg text-center min-h-[48px] ${isToday ? `${theme.primary} text-white` : theme.secondaryBg} ${theme.buttonHover} cursor-pointer transition-all`}>
                  <span className={`text-xs font-bold ${isToday ? 'text-white' : theme.highlight}`}>{day}</span>
                  {dayEvents.length > 0 && (
                    <div className="flex justify-center gap-0.5 mt-0.5">
                      {dayEvents.map((e, ei) => (
                        <span key={ei} className={`w-1.5 h-1.5 rounded-full ${e.color}`} title={e.label} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Events List */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Upcoming Events</h3>
          <div className="space-y-2">
            {upcomingEvents.map((e, i) => (
              <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className={`w-8 h-8 rounded-lg ${e.color} text-white flex items-center justify-center shrink-0`}>
                  <Calendar size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-bold ${theme.highlight} truncate`}>{e.label}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{e.date} &middot; {e.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── EXPORT ──────────────────────────────────────────
export default function Page() {
  return (
    <BlueprintLayout>
      <PrincipalDashboard />
    </BlueprintLayout>
  );
}
