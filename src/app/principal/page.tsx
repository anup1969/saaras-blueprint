'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  ChevronRight, ChevronLeft, CalendarDays, GripVertical, Flag, Edit2, Save, Trash2,
  CalendarClock, Sparkles, Bot, ChevronDown, Loader2
} from 'lucide-react';
import StakeholderProfile from '@/components/StakeholderProfile';
import TaskTrackerPanel from '@/components/TaskTrackerPanel';

// ─── MODULE SIDEBAR ────────────────────────────────
const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'academics', label: 'Academics', icon: BookOpen },
  { id: 'staff', label: 'Staff Overview', icon: Briefcase },
  { id: 'hr', label: 'HR Management', icon: Briefcase },
  { id: 'compliance', label: 'Compliance', icon: ShieldCheck },
  { id: 'communication', label: 'Communication', icon: MessageSquare },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays },
  { id: 'yearly-planner', label: 'Yearly Planner', icon: CalendarClock },
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
        {activeModule === 'academics' && <AcademicsModule theme={theme} />}
        {activeModule === 'staff' && <StaffOverviewModule theme={theme} />}
        {activeModule === 'hr' && <HRManagementModule theme={theme} />}
        {activeModule === 'compliance' && <ComplianceModule theme={theme} />}
        {activeModule === 'communication' && <CommunicationModule theme={theme} />}
        {activeModule === 'calendar' && <CalendarModule theme={theme} />}
        {activeModule === 'yearly-planner' && <YearlyPlannerModule theme={theme} />}
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
      {/* Attendance Row — Student + Academic Staff + Non-Academic Staff */}
      <div className="grid grid-cols-3 gap-3">
        {/* Student Attendance */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Users size={14} className={theme.iconColor} />
                <h3 className={`text-xs font-bold ${theme.highlight}`}>Students</h3>
              </div>
              <p className={`text-lg font-bold ${theme.highlight}`}>2,598 / 2,847</p>
              <p className={`text-xs ${theme.iconColor} mt-0.5`}>Enrolled: 3,000</p>
            </div>
            <div className="w-14 h-14 ml-2 shrink-0">
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
                <text x="18" y="19" textAnchor="middle" dominantBaseline="middle" className="fill-emerald-600" style={{ fontSize: '8px', fontWeight: 700 }}>87%</text>
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /><span className={`text-[10px] ${theme.iconColor}`}>2,598</span></span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" /><span className={`text-[10px] ${theme.iconColor}`}>249</span></span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-400 inline-block" /><span className={`text-[10px] ${theme.iconColor}`}>153</span></span>
          </div>
        </div>

        {/* Academic Staff */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1.5">
                <GraduationCap size={14} className={theme.iconColor} />
                <h3 className={`text-xs font-bold ${theme.highlight}`}>Academic Staff</h3>
              </div>
              <p className={`text-lg font-bold ${theme.highlight}`}>72 / 78</p>
              <p className={`text-xs text-emerald-600 mt-0.5`}>92% Present</p>
            </div>
            <div className="w-14 h-14 ml-2 shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <circle r="16" cx="18" cy="18" fill="none" stroke="#ef4444" strokeWidth="4"
                  strokeDasharray={`${(6 / 78) * 100.53} ${100.53 - (6 / 78) * 100.53}`}
                  strokeDashoffset="25.13" transform="rotate(-90 18 18)" />
                <circle r="16" cx="18" cy="18" fill="none" stroke="#10b981" strokeWidth="4"
                  strokeDasharray={`${(72 / 78) * 100.53} ${100.53 - (72 / 78) * 100.53}`}
                  strokeDashoffset={`${25.13 - (6 / 78) * 100.53}`} transform="rotate(-90 18 18)" />
                <text x="18" y="19" textAnchor="middle" dominantBaseline="middle" className="fill-emerald-600" style={{ fontSize: '8px', fontWeight: 700 }}>92%</text>
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /><span className={`text-[10px] ${theme.iconColor}`}>72</span></span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" /><span className={`text-[10px] ${theme.iconColor}`}>6</span></span>
          </div>
        </div>

        {/* Non-Academic Staff */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Briefcase size={14} className={theme.iconColor} />
                <h3 className={`text-xs font-bold ${theme.highlight}`}>Non-Academic</h3>
              </div>
              <p className={`text-lg font-bold ${theme.highlight}`}>56 / 64</p>
              <p className={`text-xs text-emerald-600 mt-0.5`}>88% Present</p>
            </div>
            <div className="w-14 h-14 ml-2 shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <circle r="16" cx="18" cy="18" fill="none" stroke="#ef4444" strokeWidth="4"
                  strokeDasharray={`${(8 / 64) * 100.53} ${100.53 - (8 / 64) * 100.53}`}
                  strokeDashoffset="25.13" transform="rotate(-90 18 18)" />
                <circle r="16" cx="18" cy="18" fill="none" stroke="#10b981" strokeWidth="4"
                  strokeDasharray={`${(56 / 64) * 100.53} ${100.53 - (56 / 64) * 100.53}`}
                  strokeDashoffset={`${25.13 - (8 / 64) * 100.53}`} transform="rotate(-90 18 18)" />
                <text x="18" y="19" textAnchor="middle" dominantBaseline="middle" className="fill-emerald-600" style={{ fontSize: '8px', fontWeight: 700 }}>88%</text>
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /><span className={`text-[10px] ${theme.iconColor}`}>56</span></span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" /><span className={`text-[10px] ${theme.iconColor}`}>8</span></span>
          </div>
        </div>
      </div>

      {/* Stat Cards — including Fees inline */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={ClipboardCheck} label="Avg Attendance" value="94.2%" color="bg-emerald-500" theme={theme} />
        <StatCard icon={Award} label="Academic Performance" value="87.5%" color="bg-purple-500" theme={theme} />
        <StatCard icon={Clock} label="Pending Approvals" value="8" color="bg-amber-500" theme={theme} />
        <StatCard icon={Banknote} label="Today's Collection" value={`\u20B92,45,000`} color="bg-green-500" sub="Outstanding: \u20B918.5L" theme={theme} />
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

        {/* Task Tracker — Full Task Management Dashboard */}
        <TaskTrackerPanel theme={theme} role="principal" />
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

function YearlyPlannerModule({ theme }: { theme: Theme }) {
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

    // Welcome message then first question
    setChatMessages([
      { sender: 'bot', text: "Hello! I\u2019m Saaras AI, your academic year planning assistant. I already have your school profile: CBSE affiliated, Gujarat, April-March session, Alternate Saturdays. Let me ask 10 quick questions about your academic planning to build the complete 2026-27 plan!", type: 'info' }
    ]);
    setTimeout(() => {
      addBotMessage(PLANNER_QUESTIONS[0].question);
      setCurrentStep(1);
    }, 800);
  }, [addBotMessage]);

  const handleAnswer = useCallback((stepId: number, answer: string | string[]) => {
    const displayAnswer = Array.isArray(answer) ? answer.join(', ') : answer;
    setChatMessages(prev => [...prev, { sender: 'user', text: displayAnswer, type: 'answer' }]);
    setAnswers(prev => ({ ...prev, [stepId]: answer }));

    const nextStep = stepId + 1;
    if (nextStep <= PLANNER_QUESTIONS.length) {
      setTimeout(() => {
        addBotMessage(PLANNER_QUESTIONS[nextStep - 1].question);
        setCurrentStep(nextStep);
      }, 500);
    } else {
      // All done — generate
      setTimeout(() => {
        setChatMessages(prev => [...prev, { sender: 'bot', text: 'Excellent! I have all the information I need. Generating your personalized academic plan...', type: 'info' }]);
        setIsGenerating(true);
        setGenerateProgress(0);

        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 8 + 2;
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
              setIsGenerating(false);
              setPlanReady(true);
              setCurrentStep(13);
            }, 400);
          }
          setGenerateProgress(Math.min(progress, 100));
        }, 100);
      }, 500);
    }
  }, [addBotMessage]);

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
          <div className={`px-3 py-1.5 rounded-xl ${theme.secondaryBg}`}>
            <span className={`text-xs font-bold ${theme.highlight}`}>Total Working Days: </span>
            <span className="text-xs font-bold text-emerald-600">220</span>
          </div>
          <button className={`px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold flex items-center gap-1`}>
            <Plus size={12} /> Add Event
          </button>
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
        {ganttCategories.map((cat) => (
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
        const cat = ganttCategories.find(c => c.name === catName);
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
          {ganttCategories.map(cat => (
            <div key={cat.name} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded-full ${cat.color}`} />
              <span className={`text-[10px] font-bold ${theme.iconColor}`}>{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ─── RENDER AI QUESTION INPUT ─────────────────
  const renderQuestionInput = () => {
    if (currentStep < 1 || currentStep > 12 || isGenerating || planReady) return null;
    const q = PLANNER_QUESTIONS[currentStep - 1];

    if (q.inputType === 'buttons') {
      return (
        <div className="flex flex-wrap gap-2 mt-3">
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
      );
    }

    if (q.inputType === 'dropdown') {
      return (
        <div className="mt-3 relative" style={{ maxWidth: '280px' }}>
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
      );
    }

    if (q.inputType === 'multi-select') {
      return (
        <div className="mt-3 space-y-2">
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
      );
    }

    if (q.inputType === 'date-range') {
      return (
        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-3">
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>From</label>
              <input
                type="date"
                value={vacationFrom}
                onChange={e => setVacationFrom(e.target.value)}
                className={`px-3 py-2 rounded-xl text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight} outline-none`}
              />
            </div>
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>To</label>
              <input
                type="date"
                value={vacationTo}
                onChange={e => setVacationTo(e.target.value)}
                className={`px-3 py-2 rounded-xl text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight} outline-none`}
              />
            </div>
          </div>
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
      );
    }

    if (q.inputType === 'text-add') {
      return (
        <div className="mt-3 space-y-2">
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
              placeholder="e.g., Founder's Day, Local Festival..."
              className={`flex-1 px-3 py-2 rounded-xl text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight} outline-none`}
            />
            <button
              onClick={() => {
                if (holidayInput.trim()) {
                  setCustomHolidays(prev => [...prev, holidayInput.trim()]);
                  setHolidayInput('');
                }
              }}
              className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}
            >
              Add
            </button>
          </div>
          {customHolidays.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {customHolidays.map((h, i) => (
                <span key={i} className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${theme.secondaryBg} ${theme.highlight} flex items-center gap-1`}>
                  {h}
                  <button onClick={() => setCustomHolidays(prev => prev.filter((_, idx) => idx !== i))} className="hover:text-red-500">
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
          )}
          <button
            onClick={() => handleAnswer(q.id, customHolidays.length > 0 ? customHolidays : ['None'])}
            className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold flex items-center gap-1`}
          >
            <Check size={12} /> {customHolidays.length > 0 ? `Done (${customHolidays.length} added)` : 'Skip — No extra holidays'}
          </button>
        </div>
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

                {/* Plan Ready Summary */}
                {planReady && (
                  <div className={`${theme.secondaryBg} rounded-2xl p-5 space-y-3 border-2 border-emerald-300`}>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={18} className="text-emerald-500" />
                      <span className={`text-sm font-bold ${theme.highlight}`}>Your 2026-27 Academic Plan is ready!</span>
                    </div>
                    <div className={`space-y-1.5 ${theme.iconColor}`}>
                      <p className="text-xs flex items-center gap-2"><BarChart3 size={12} /> <strong>220</strong> Working Days</p>
                      <p className="text-xs flex items-center gap-2"><Calendar size={12} /> <strong>45</strong> Holidays (22 govt + 23 school)</p>
                      <p className="text-xs flex items-center gap-2"><FileText size={12} /> <strong>6</strong> Exam Windows (2 UT + Mid + 2 UT + Final)</p>
                      <p className="text-xs flex items-center gap-2"><Users size={12} /> <strong>4</strong> PTMs scheduled</p>
                      <p className="text-xs flex items-center gap-2"><Star size={12} /> <strong>10</strong> Events planned</p>
                      <p className="text-xs flex items-center gap-2"><ShieldCheck size={12} /> <strong>4</strong> Compliance items auto-added</p>
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
                )}

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
                      <span className={`text-[9px] font-bold ${isUpcoming ? theme.iconColor : 'opacity-0'}`}>{q.id}/12</span>
                    </div>
                  );
                })}
              </div>

              {/* Progress Bar */}
              <div className="mt-4 pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-bold ${theme.iconColor}`}>Completion</span>
                  <span className={`text-[10px] font-bold ${theme.highlight}`}>{Object.keys(answers).length}/12</span>
                </div>
                <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${(Object.keys(answers).length / 12) * 100}%` }}
                  />
                </div>
              </div>

              {/* Reset button */}
              {aiStarted && (
                <button
                  onClick={() => { setAiStarted(false); setCurrentStep(0); setAnswers({}); setChatMessages([]); setPlanReady(false); setIsGenerating(false); setSelectedEvents([]); setCustomHolidays([]); }}
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

// ─── CALENDAR MODULE ─────────────────────────────────
interface CalendarEvent {
  label: string;
  time: string;
  type: string;
  color: string;
}

type CalendarView = 'yearly' | 'monthly' | 'weekly' | 'today';

function CalendarModule({ theme }: { theme: Theme }) {
  const [calendarView, setCalendarView] = useState<CalendarView>('monthly');
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventTime, setNewEventTime] = useState('09:00');
  const [newEventType, setNewEventType] = useState('Meeting');

  const daysInMonth = 28;
  const startDay = 0; // Feb 2026 starts on Sunday
  const today = 13;
  const currentMonth = 'February 2026';

  // Events data — keyed by day of month
  const [eventsData, setEventsData] = useState<Record<number, CalendarEvent[]>>({
    1: [{ label: 'Fee Due Date', time: '9:00 AM', type: 'Finance', color: 'bg-amber-400' }],
    5: [{ label: 'Staff Meeting', time: '9:00 AM', type: 'Meeting', color: 'bg-blue-400' }],
    10: [
      { label: 'Staff meeting', time: '9:00 AM', type: 'Meeting', color: 'bg-blue-400' },
      { label: 'PTM', time: '2:00 PM', type: 'Meeting', color: 'bg-purple-400' },
    ],
    12: [{ label: 'Board Review', time: '11:00 AM', type: 'Meeting', color: 'bg-blue-400' }],
    14: [
      { label: "Valentine's Day celebration", time: '10:00 AM', type: 'Event', color: 'bg-pink-400' },
      { label: 'PTM (Classes VI-X)', time: '2:00 PM', type: 'Meeting', color: 'bg-purple-400' },
    ],
    15: [
      { label: 'Mid-term exams begin', time: '8:00 AM', type: 'Exam', color: 'bg-red-400' },
      { label: 'Fee Payment Deadline', time: '5:00 PM', type: 'Finance', color: 'bg-red-400' },
    ],
    20: [
      { label: 'Annual Day rehearsal', time: '10:00 AM', type: 'Event', color: 'bg-pink-400' },
      { label: 'POCSO Awareness Training', time: '2:00 PM', type: 'Training', color: 'bg-indigo-400' },
    ],
    25: [{ label: 'Inter-School Science Exhibition', time: '9:00 AM', type: 'Event', color: 'bg-teal-400' }],
    28: [{ label: 'Annual Day Celebration', time: '9:00 AM', type: 'Event', color: 'bg-pink-400' }],
  });

  const upcomingEvents = [
    { date: '14-Feb', label: 'Parent-Teacher Meeting (Classes VI-X)', type: 'Meeting', color: 'bg-purple-500' },
    { date: '15-Feb', label: 'Fee Payment Deadline', type: 'Finance', color: 'bg-red-500' },
    { date: '20-Feb', label: 'POCSO Awareness Training — All Staff', type: 'Training', color: 'bg-indigo-500' },
    { date: '25-Feb', label: 'Inter-School Science Exhibition', type: 'Event', color: 'bg-teal-500' },
    { date: '28-Feb', label: 'Annual Day Celebration', type: 'Event', color: 'bg-pink-500' },
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const viewButtons: { id: CalendarView; label: string }[] = [
    { id: 'yearly', label: 'Yearly' },
    { id: 'monthly', label: 'Monthly' },
    { id: 'weekly', label: 'Weekly' },
    { id: 'today', label: 'Today' },
  ];

  const handleDateClick = (day: number) => {
    if (editMode) {
      setSelectedDate(day);
      setShowAddForm(true);
      setNewEventTitle('');
      setNewEventTime('09:00');
      setNewEventType('Meeting');
    } else {
      setSelectedDate(selectedDate === day ? null : day);
    }
  };

  const handleAddEvent = () => {
    if (!newEventTitle.trim() || selectedDate === null) return;
    const typeColors: Record<string, string> = {
      Meeting: 'bg-blue-400', Event: 'bg-pink-400', Exam: 'bg-red-400',
      Finance: 'bg-amber-400', Training: 'bg-indigo-400', Holiday: 'bg-emerald-400',
    };
    const newEvent: CalendarEvent = {
      label: newEventTitle,
      time: new Date(`2026-02-${String(selectedDate).padStart(2, '0')}T${newEventTime}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      type: newEventType,
      color: typeColors[newEventType] || 'bg-blue-400',
    };
    setEventsData(prev => ({
      ...prev,
      [selectedDate]: [...(prev[selectedDate] || []), newEvent],
    }));
    setShowAddForm(false);
    setNewEventTitle('');
  };

  const handleDeleteEvent = (day: number, idx: number) => {
    setEventsData(prev => {
      const updated = { ...prev };
      const dayEvents = [...(updated[day] || [])];
      dayEvents.splice(idx, 1);
      if (dayEvents.length === 0) {
        delete updated[day];
      } else {
        updated[day] = dayEvents;
      }
      return updated;
    });
  };

  // Get the week that contains today (Sun-Sat)
  const getTodayWeekDays = () => {
    // Feb 2026 starts on Sunday. today=13 means Feb 13
    // Day of week for day d: (startDay + d - 1) % 7
    const todayDow = (startDay + today - 1) % 7; // 0=Sun
    const weekStart = today - todayDow;
    const days: number[] = [];
    for (let i = 0; i < 7; i++) {
      const d = weekStart + i;
      if (d >= 1 && d <= daysInMonth) days.push(d);
      else days.push(-1); // out of month
    }
    return days;
  };

  const timeSlots = [
    '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
  ];

  // Get events for a specific time slot on a given day
  const getEventsAtTime = (day: number, slot: string) => {
    const dayEvents = eventsData[day] || [];
    return dayEvents.filter(e => e.time === slot);
  };

  // Month data for yearly view — all months of 2026
  const monthsData = [
    { name: 'January', days: 31, start: 4 }, // Jan 2026 starts on Thu
    { name: 'February', days: 28, start: 0 }, // Sun
    { name: 'March', days: 31, start: 0 }, // Sun
    { name: 'April', days: 30, start: 3 }, // Wed
    { name: 'May', days: 31, start: 5 }, // Fri
    { name: 'June', days: 30, start: 1 }, // Mon
    { name: 'July', days: 31, start: 3 }, // Wed
    { name: 'August', days: 31, start: 6 }, // Sat
    { name: 'September', days: 30, start: 2 }, // Tue
    { name: 'October', days: 31, start: 4 }, // Thu
    { name: 'November', days: 30, start: 0 }, // Sun
    { name: 'December', days: 31, start: 2 }, // Tue
  ];

  // Selected date detail panel
  const renderDateDetail = () => {
    if (selectedDate === null || editMode) return null;
    const dayEvents = eventsData[selectedDate] || [];
    const dayOfWeek = dayNames[(startDay + selectedDate - 1) % 7];
    return (
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 mt-4`}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className={`text-sm font-bold ${theme.highlight}`}>
              {dayOfWeek}, February {selectedDate}, 2026
            </h3>
            <p className={`text-[10px] ${theme.iconColor}`}>
              {dayEvents.length} event{dayEvents.length !== 1 ? 's' : ''} scheduled
            </p>
          </div>
          <button onClick={() => setSelectedDate(null)} className={`p-1.5 rounded-lg ${theme.buttonHover}`}>
            <X size={14} className={theme.iconColor} />
          </button>
        </div>
        {dayEvents.length === 0 ? (
          <div className={`text-center py-6 ${theme.secondaryBg} rounded-xl`}>
            <Calendar size={24} className={`${theme.iconColor} mx-auto mb-2`} />
            <p className={`text-xs ${theme.iconColor}`}>No events scheduled</p>
          </div>
        ) : (
          <div className="space-y-2">
            {dayEvents.map((ev, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${theme.secondaryBg}`}>
                <div className={`w-1.5 h-8 rounded-full ${ev.color} shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{ev.label}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{ev.time} &middot; {ev.type}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Add event form
  const renderAddEventForm = () => {
    if (!showAddForm || selectedDate === null) return null;
    const dayOfWeek = dayNames[(startDay + selectedDate - 1) % 7];
    return (
      <div className={`${theme.cardBg} rounded-2xl border-2 border-dashed ${theme.border} p-4 mt-4`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className={`text-sm font-bold ${theme.highlight}`}>
            Add Event — {dayOfWeek}, Feb {selectedDate}
          </h3>
          <button onClick={() => setShowAddForm(false)} className={`p-1.5 rounded-lg ${theme.buttonHover}`}>
            <X size={14} className={theme.iconColor} />
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Event Title</label>
            <input
              type="text"
              value={newEventTitle}
              onChange={e => setNewEventTitle(e.target.value)}
              placeholder="Enter event title..."
              className={`w-full px-3 py-2 rounded-lg text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight} outline-none focus:ring-2 focus:ring-purple-400`}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Time</label>
              <input
                type="time"
                value={newEventTime}
                onChange={e => setNewEventTime(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight} outline-none focus:ring-2 focus:ring-purple-400`}
              />
            </div>
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Type</label>
              <select
                value={newEventType}
                onChange={e => setNewEventType(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight} outline-none cursor-pointer focus:ring-2 focus:ring-purple-400`}
              >
                <option value="Meeting">Meeting</option>
                <option value="Event">Event</option>
                <option value="Exam">Exam</option>
                <option value="Finance">Finance</option>
                <option value="Training">Training</option>
                <option value="Holiday">Holiday</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAddEvent}
              disabled={!newEventTitle.trim()}
              className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold flex items-center gap-1.5 disabled:opacity-50`}
            >
              <Save size={12} /> Save Event
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className={`px-4 py-2 rounded-xl border ${theme.border} text-xs font-bold ${theme.highlight}`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ─── MONTHLY VIEW ─────────────────────────
  const renderMonthlyView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className={`lg:col-span-2 ${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center justify-between mb-4">
          <button className={`p-1.5 rounded-lg ${theme.buttonHover}`}><ChevronLeft size={14} className={theme.iconColor} /></button>
          <h3 className={`text-sm font-bold ${theme.highlight}`}>{currentMonth}</h3>
          <button className={`p-1.5 rounded-lg ${theme.buttonHover}`}><ChevronRight size={14} className={theme.iconColor} /></button>
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
            const isSelected = day === selectedDate && !isToday;
            const dayEvents = eventsData[day] || [];
            return (
              <div
                key={day}
                onClick={() => handleDateClick(day)}
                className={`relative p-1.5 rounded-lg text-center min-h-[48px] cursor-pointer transition-all ${
                  isToday
                    ? `${theme.primary} text-white`
                    : isSelected
                    ? 'ring-2 ring-purple-400 bg-purple-50'
                    : theme.secondaryBg
                } ${!isToday && !isSelected ? theme.buttonHover : ''}`}
              >
                <span className={`text-xs font-bold ${isToday ? 'text-white' : isSelected ? 'text-purple-700' : theme.highlight}`}>{day}</span>
                {dayEvents.length > 0 && (
                  <div className="flex justify-center gap-0.5 mt-0.5">
                    {dayEvents.map((e, ei) => (
                      <span key={ei} className={`w-1.5 h-1.5 rounded-full ${e.color}`} title={e.label} />
                    ))}
                  </div>
                )}
                {editMode && (
                  <div className="absolute top-0.5 right-0.5">
                    <Plus size={8} className={`${isToday ? 'text-white/70' : theme.iconColor} opacity-60`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {/* Date detail panel or add event form */}
        {renderDateDetail()}
        {renderAddEventForm()}
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
  );

  // ─── WEEKLY VIEW ─────────────────────────
  const renderWeeklyView = () => {
    const weekDays = getTodayWeekDays();
    return (
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-4`}>
          Week of February {weekDays.find(d => d > 0) || '?'} - {weekDays.filter(d => d > 0).pop() || '?'}, 2026
        </h3>
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day, i) => {
            const isToday = day === today;
            const isSelected = day === selectedDate && !isToday;
            const dayEvents = day > 0 ? (eventsData[day] || []) : [];
            return (
              <div key={i} className="space-y-1">
                <div
                  onClick={() => day > 0 && handleDateClick(day)}
                  className={`text-center p-2 rounded-xl cursor-pointer transition-all ${
                    isToday ? `${theme.primary} text-white` : isSelected ? 'ring-2 ring-purple-400 bg-purple-50' : theme.secondaryBg
                  } ${!isToday && !isSelected ? theme.buttonHover : ''}`}
                >
                  <p className={`text-[10px] font-bold uppercase ${isToday ? 'text-white/80' : theme.iconColor}`}>{dayNames[i]}</p>
                  <p className={`text-lg font-bold ${isToday ? 'text-white' : isSelected ? 'text-purple-700' : theme.highlight}`}>
                    {day > 0 ? day : ''}
                  </p>
                </div>
                {day > 0 && dayEvents.length === 0 && (
                  <div className={`p-2 rounded-lg ${theme.accentBg} text-center`}>
                    <p className={`text-[9px] ${theme.iconColor}`}>No events</p>
                  </div>
                )}
                {dayEvents.map((ev, ei) => (
                  <div key={ei} className={`p-2 rounded-lg border-l-2 ${ev.color.replace('bg-', 'border-')} ${theme.accentBg}`}>
                    <p className={`text-[10px] font-bold ${theme.highlight} truncate`}>{ev.label}</p>
                    <p className={`text-[9px] ${theme.iconColor}`}>{ev.time}</p>
                    {editMode && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDeleteEvent(day, ei); }}
                        className="mt-1 p-0.5 rounded hover:bg-red-100"
                      >
                        <Trash2 size={9} className="text-red-400" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
        {renderDateDetail()}
        {renderAddEventForm()}
      </div>
    );
  };

  // ─── TODAY VIEW ─────────────────────────
  const renderTodayView = () => {
    const todayEvents = eventsData[today] || [];
    const dayOfWeek = dayNames[(startDay + today - 1) % 7];
    return (
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className={`text-lg font-bold ${theme.highlight}`}>
              {dayOfWeek}, February {today}, 2026
            </h3>
            <p className={`text-xs ${theme.iconColor}`}>
              {todayEvents.length} event{todayEvents.length !== 1 ? 's' : ''} today
            </p>
          </div>
          <div className={`w-12 h-12 rounded-2xl ${theme.primary} text-white flex flex-col items-center justify-center`}>
            <span className="text-lg font-bold leading-none">{today}</span>
            <span className="text-[8px] uppercase">Feb</span>
          </div>
        </div>
        <div className="space-y-1">
          {timeSlots.map((slot) => {
            const slotEvents = getEventsAtTime(today, slot);
            return (
              <div key={slot} className={`flex items-stretch gap-3 min-h-[44px]`}>
                <div className={`w-16 shrink-0 py-2 text-right`}>
                  <span className={`text-[10px] font-bold ${theme.iconColor}`}>{slot}</span>
                </div>
                <div className={`w-px ${theme.border} border-l shrink-0`} />
                <div className="flex-1 py-1">
                  {slotEvents.length > 0 ? (
                    <div className="space-y-1">
                      {slotEvents.map((ev, i) => (
                        <div key={i} className={`flex items-center gap-2 p-2 rounded-lg ${ev.color} bg-opacity-20`}>
                          <div className={`w-1.5 h-6 rounded-full ${ev.color} shrink-0`} />
                          <div className="flex-1">
                            <p className={`text-xs font-bold ${theme.highlight}`}>{ev.label}</p>
                            <p className={`text-[10px] ${theme.iconColor}`}>{ev.type}</p>
                          </div>
                          {editMode && (
                            <button
                              onClick={() => handleDeleteEvent(today, (eventsData[today] || []).indexOf(ev))}
                              className="p-1 rounded hover:bg-red-100"
                            >
                              <Trash2 size={10} className="text-red-400" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={`h-full rounded-lg ${theme.accentBg} border border-dashed ${theme.border} opacity-40`} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ─── YEARLY VIEW ─────────────────────────
  const renderYearlyView = () => (
    <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
      <h3 className={`text-sm font-bold ${theme.highlight} mb-4 text-center`}>2026 — Yearly Overview</h3>
      <div className="grid grid-cols-4 gap-4">
        {monthsData.map((m, mi) => {
          const isCurrentMonth = mi === 1; // February is index 1
          return (
            <div key={m.name} className={`p-3 rounded-xl ${isCurrentMonth ? 'ring-2 ring-purple-400' : ''} ${theme.secondaryBg}`}>
              <p className={`text-[10px] font-bold ${isCurrentMonth ? 'text-purple-600' : theme.highlight} text-center mb-2 uppercase`}>{m.name}</p>
              <div className="grid grid-cols-7 gap-px">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, di) => (
                  <div key={di} className={`text-center text-[7px] ${theme.iconColor} font-bold`}>{d}</div>
                ))}
                {Array.from({ length: m.start }).map((_, i) => (
                  <div key={`e-${i}`} />
                ))}
                {Array.from({ length: m.days }).map((_, i) => {
                  const day = i + 1;
                  const isToday = isCurrentMonth && day === today;
                  const hasEvents = isCurrentMonth && eventsData[day] && eventsData[day].length > 0;
                  return (
                    <div
                      key={day}
                      className={`text-center text-[8px] py-0.5 rounded-sm relative ${
                        isToday ? `${theme.primary} text-white font-bold` : theme.highlight
                      }`}
                    >
                      {day}
                      {hasEvents && !isToday && (
                        <span className="absolute -bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-400" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>School Calendar</h1>
        <div className="flex items-center gap-2">
          {/* Edit toggle */}
          <button
            onClick={() => { setEditMode(!editMode); setShowAddForm(false); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              editMode
                ? 'bg-purple-500 text-white'
                : `border ${theme.border} ${theme.highlight} ${theme.buttonHover}`
            }`}
          >
            <Edit2 size={12} /> {editMode ? 'Editing' : 'Edit'}
          </button>
        </div>
      </div>

      {/* View Toggle Buttons */}
      <div className={`flex gap-1 p-1 rounded-xl ${theme.secondaryBg} w-fit`}>
        {viewButtons.map(v => (
          <button
            key={v.id}
            onClick={() => { setCalendarView(v.id); setSelectedDate(null); setShowAddForm(false); }}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              calendarView === v.id
                ? `${theme.primary} text-white`
                : `${theme.iconColor} ${theme.buttonHover}`
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* Render active view */}
      {calendarView === 'monthly' && renderMonthlyView()}
      {calendarView === 'weekly' && renderWeeklyView()}
      {calendarView === 'today' && renderTodayView()}
      {calendarView === 'yearly' && renderYearlyView()}
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
