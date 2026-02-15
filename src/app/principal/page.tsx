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
  CalendarClock, Sparkles, Bot, ChevronDown, Loader2, Bus, MapPin, Paperclip,
  ToggleLeft, ToggleRight, Percent, Headphones, Radio, Zap, Activity
} from 'lucide-react';
import { ChatsView } from '@/components/ChatModule';
import StakeholderProfile from '@/components/StakeholderProfile';
import TaskTrackerPanel from '@/components/TaskTrackerPanel';
import SupportModule from '@/components/SupportModule';

// ─── MODULE SIDEBAR ────────────────────────────────
const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'academics', label: 'Academics', icon: BookOpen },
  { id: 'staff', label: 'Staff Overview', icon: Briefcase },
  { id: 'hr', label: 'HR Management', icon: Briefcase },
  { id: 'compliance', label: 'Compliance', icon: ShieldCheck },
  { id: 'communication', label: 'Communication', icon: MessageSquare },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays, subItems: [
    { id: 'yearly-planner', label: 'Yearly Planner', icon: CalendarClock },
  ]},
  { id: 'approvals', label: 'Approvals', icon: CheckCircle },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'support', label: 'Support', icon: Headphones },
];

function PrincipalDashboard({ theme, themeIdx, onThemeChange, isPreschool }: { theme?: Theme; themeIdx?: number; onThemeChange?: (idx: number) => void; isPreschool?: boolean }) {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedParent, setExpandedParent] = useState<string | null>(null);
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
        {modules.map(m => {
          const hasSubItems = 'subItems' in m && m.subItems && m.subItems.length > 0;
          const isParentExpanded = expandedParent === m.id;
          const isParentActive = activeModule === m.id || (hasSubItems && m.subItems!.some(s => activeModule === s.id));
          return (
            <div key={m.id}>
              <button
                onClick={() => {
                  if (hasSubItems && !sidebarCollapsed) {
                    setExpandedParent(isParentExpanded ? null : m.id);
                  }
                  setActiveModule(m.id);
                }}
                title={sidebarCollapsed ? m.label : undefined}
                className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2 py-2.5' : 'gap-2 px-3 py-2'} rounded-lg text-xs font-medium transition-all ${
                  isParentActive ? `${theme.primary} text-white` : `${theme.iconColor} ${theme.buttonHover}`
                }`}
              >
                <m.icon size={sidebarCollapsed ? 20 : 14} />
                {!sidebarCollapsed && <span className="flex-1 text-left">{m.label}</span>}
                {!sidebarCollapsed && hasSubItems && (
                  <ChevronDown size={12} className={`transition-transform ${isParentExpanded ? 'rotate-180' : ''}`} />
                )}
              </button>
              {/* Sub-items for Calendar */}
              {hasSubItems && !sidebarCollapsed && isParentExpanded && m.subItems!.map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setActiveModule(sub.id)}
                  className={`w-full flex items-center gap-2 pl-8 pr-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                    activeModule === sub.id ? `${theme.primary} text-white` : `${theme.iconColor} ${theme.buttonHover}`
                  }`}
                >
                  <sub.icon size={12} /> {sub.label}
                </button>
              ))}
            </div>
          );
        })}
      </div>

      {/* Module content */}
      <div className="flex-1 p-6 space-y-4 overflow-x-hidden">
        {activeModule === 'dashboard' && <DashboardHome theme={theme} onProfileClick={() => setActiveModule('profile')} isPreschool={isPreschool} />}
        {activeModule === 'academics' && <AcademicsModule theme={theme} />}
        {activeModule === 'staff' && <StaffOverviewModule theme={theme} />}
        {activeModule === 'hr' && <HRManagementModule theme={theme} />}
        {activeModule === 'compliance' && <ComplianceModule theme={theme} />}
        {activeModule === 'communication' && <CommunicationModule theme={theme} />}
        {activeModule === 'calendar' && <CalendarModule theme={theme} />}
        {activeModule === 'yearly-planner' && <YearlyPlannerModule theme={theme} />}
        {activeModule === 'approvals' && <ApprovalsModule theme={theme} />}
        {activeModule === 'reports' && <ReportsModule theme={theme} />}
        {activeModule === 'support' && <SupportModule theme={theme} role="principal" />}
        {activeModule === 'profile' && <StakeholderProfile role="principal" theme={theme} onClose={() => setActiveModule('dashboard')} themeIdx={themeIdx} onThemeChange={onThemeChange} />}
      </div>
    </div>
  );
}

// ─── DASHBOARD HOME ──────────────────────────────────
function DashboardHome({ theme, onProfileClick, isPreschool }: { theme: Theme; onProfileClick: () => void; isPreschool?: boolean }) {
  const [drillDown, setDrillDown] = useState<'students' | 'academic' | 'non-academic' | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>{isPreschool ? 'Principal / Centre Head Dashboard' : 'Principal Dashboard'}</h1>
        <div className="flex items-center gap-2">
          {/* Notification Bell */}
          <button title="Notifications" className={`relative w-9 h-9 rounded-full ${theme.secondaryBg} flex items-center justify-center ${theme.buttonHover} transition-all`}>
            <Bell size={16} className={theme.iconColor} />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">3</span>
          </button>
          {/* Profile Avatar */}
          <button onClick={onProfileClick} title="My Profile" className={`w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center hover:opacity-90 transition-opacity ring-2 ring-white shadow-sm`}>
            <User size={16} />
          </button>
        </div>
      </div>
      {/* Preschool Mode Banner */}
      {isPreschool && (
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800">
          <AlertTriangle size={14} className="text-amber-600 shrink-0" />
          <p className="text-xs font-medium">Preschool Mode — Showing Centre Head view with child safety, staff-child ratios, and milestone tracking</p>
        </div>
      )}
      {/* Attendance Row — Student + Academic Staff + Non-Academic Staff (Clickable) */}
      <div className="grid grid-cols-3 gap-3">
        {/* Student Attendance */}
        <button onClick={() => setDrillDown(drillDown === 'students' ? null : 'students')} className={`text-left ${theme.cardBg} rounded-2xl border-2 ${drillDown === 'students' ? 'border-blue-500 ring-1 ring-blue-500/30' : theme.border} p-4 hover:border-blue-400 transition-all cursor-pointer`}>
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Users size={14} className={theme.iconColor} />
                <h3 className={`text-xs font-bold ${theme.highlight}`}>Students</h3>
                <ChevronRight size={10} className={`${theme.iconColor} ${drillDown === 'students' ? 'rotate-90' : ''} transition-transform`} />
              </div>
              <p className={`text-2xl font-bold ${theme.highlight}`}>2,598 / 2,847</p>
              <p className={`text-xs ${theme.iconColor} mt-0.5`}>Enrolled: 3,000</p>
            </div>
            <div className="w-20 h-20 ml-2 shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <circle r="16" cx="18" cy="18" fill="none" stroke="#9ca3af" strokeWidth="4" strokeDasharray={`${(153/3000)*100.53} ${100.53-(153/3000)*100.53}`} strokeDashoffset="25.13" transform="rotate(-90 18 18)" />
                <circle r="16" cx="18" cy="18" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray={`${(249/3000)*100.53} ${100.53-(249/3000)*100.53}`} strokeDashoffset={`${25.13-(153/3000)*100.53}`} transform="rotate(-90 18 18)" />
                <circle r="16" cx="18" cy="18" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray={`${(2598/3000)*100.53} ${100.53-(2598/3000)*100.53}`} strokeDashoffset={`${25.13-(153/3000)*100.53-(249/3000)*100.53}`} transform="rotate(-90 18 18)" />
                <text x="18" y="19" textAnchor="middle" dominantBaseline="middle" className="fill-emerald-600" style={{ fontSize: '10px', fontWeight: 700 }}>87%</text>
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /><span className={`text-xs ${theme.iconColor}`}>2,598</span></span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" /><span className={`text-xs ${theme.iconColor}`}>249</span></span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-400 inline-block" /><span className={`text-xs ${theme.iconColor}`}>153</span></span>
          </div>
        </button>

        {/* Academic Staff */}
        <button onClick={() => setDrillDown(drillDown === 'academic' ? null : 'academic')} className={`text-left ${theme.cardBg} rounded-2xl border-2 ${drillDown === 'academic' ? 'border-blue-500 ring-1 ring-blue-500/30' : theme.border} p-4 hover:border-blue-400 transition-all cursor-pointer`}>
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1.5">
                <GraduationCap size={14} className={theme.iconColor} />
                <h3 className={`text-xs font-bold ${theme.highlight}`}>Academic Staff</h3>
                <ChevronRight size={10} className={`${theme.iconColor} ${drillDown === 'academic' ? 'rotate-90' : ''} transition-transform`} />
              </div>
              <p className={`text-2xl font-bold ${theme.highlight}`}>72 / 78</p>
              <p className={`text-xs text-emerald-600 mt-0.5`}>92% Present</p>
            </div>
            <div className="w-20 h-20 ml-2 shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <circle r="16" cx="18" cy="18" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray={`${(6/78)*100.53} ${100.53-(6/78)*100.53}`} strokeDashoffset="25.13" transform="rotate(-90 18 18)" />
                <circle r="16" cx="18" cy="18" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray={`${(72/78)*100.53} ${100.53-(72/78)*100.53}`} strokeDashoffset={`${25.13-(6/78)*100.53}`} transform="rotate(-90 18 18)" />
                <text x="18" y="19" textAnchor="middle" dominantBaseline="middle" className="fill-emerald-600" style={{ fontSize: '10px', fontWeight: 700 }}>92%</text>
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /><span className={`text-xs ${theme.iconColor}`}>72</span></span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" /><span className={`text-xs ${theme.iconColor}`}>6</span></span>
          </div>
        </button>

        {/* Non-Academic Staff */}
        <button onClick={() => setDrillDown(drillDown === 'non-academic' ? null : 'non-academic')} className={`text-left ${theme.cardBg} rounded-2xl border-2 ${drillDown === 'non-academic' ? 'border-blue-500 ring-1 ring-blue-500/30' : theme.border} p-4 hover:border-blue-400 transition-all cursor-pointer`}>
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Briefcase size={14} className={theme.iconColor} />
                <h3 className={`text-xs font-bold ${theme.highlight}`}>Non-Academic</h3>
                <ChevronRight size={10} className={`${theme.iconColor} ${drillDown === 'non-academic' ? 'rotate-90' : ''} transition-transform`} />
              </div>
              <p className={`text-2xl font-bold ${theme.highlight}`}>56 / 64</p>
              <p className={`text-xs text-emerald-600 mt-0.5`}>88% Present</p>
            </div>
            <div className="w-20 h-20 ml-2 shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <circle r="16" cx="18" cy="18" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray={`${(8/64)*100.53} ${100.53-(8/64)*100.53}`} strokeDashoffset="25.13" transform="rotate(-90 18 18)" />
                <circle r="16" cx="18" cy="18" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray={`${(56/64)*100.53} ${100.53-(56/64)*100.53}`} strokeDashoffset={`${25.13-(8/64)*100.53}`} transform="rotate(-90 18 18)" />
                <text x="18" y="19" textAnchor="middle" dominantBaseline="middle" className="fill-emerald-600" style={{ fontSize: '10px', fontWeight: 700 }}>88%</text>
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /><span className={`text-xs ${theme.iconColor}`}>56</span></span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" /><span className={`text-xs ${theme.iconColor}`}>8</span></span>
          </div>
        </button>
      </div>

      {/* Drill-Down Analytics Panel */}
      {drillDown && (
        <DrillDownPanel type={drillDown} theme={theme} onClose={() => setDrillDown(null)} />
      )}

      {/* Stat Cards + Quick Actions — same row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <StatCard icon={ClipboardCheck} label="Avg Attendance" value="94.2%" color="bg-emerald-500" theme={theme} />
        <StatCard icon={Users} label="Staff Present" value="92/98" color="bg-purple-500" sub="6 on leave" theme={theme} />
        <StatCard icon={Clock} label="Pending Approvals" value="8" color="bg-amber-500" theme={theme} />
        <StatCard icon={Banknote} label="Today's Collection" value={`\u20B92,45,000`} color="bg-green-500" sub="Outstanding: \u20B918.5L" theme={theme} />
        {/* Quick Actions — compact icon row */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-3 flex flex-col justify-center`}>
          <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-2`}>Quick Actions</p>
          <div className="flex items-center gap-2">
            {[
              { label: 'Reports', icon: BarChart3, color: 'bg-blue-500' },
              { label: 'Approve', icon: CheckCircle, color: 'bg-emerald-500' },
              { label: 'Circular', icon: Send, color: 'bg-indigo-500' },
              { label: 'Meeting', icon: Calendar, color: 'bg-purple-500' },
            ].map(a => (
              <button key={a.label} title={a.label} className={`w-8 h-8 rounded-lg ${a.color} flex items-center justify-center text-white hover:opacity-80 transition-opacity`}>
                <a.icon size={14} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Preschool-Specific Cards */}
      {isPreschool && (
        <div className="mt-4 space-y-4">
          <p className="text-xs font-bold text-amber-600">Preschool-Specific</p>
          <div className="grid grid-cols-4 gap-3">
            <StatCard icon={Shield} label="Staff-Child Ratio" value="1:8" color="bg-blue-500" sub="Nursery OK" theme={theme} />
            <StatCard icon={Heart} label="Daily Health Reports" value="2" color="bg-red-500" sub="pending review" theme={theme} />
            <StatCard icon={TrendingUp} label="Developmental Milestones" value="85%" color="bg-emerald-500" sub="on track" theme={theme} />
            <StatCard icon={Star} label="Parent Satisfaction" value="4.6/5.0" color="bg-amber-500" theme={theme} />
          </div>
        </div>
      )}

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
                { activity: 'Sports Practice — Cricket', detail: 'Ground · Inter-school team · Coach Verma', icon: Award, color: 'bg-emerald-500', pulse: false },
                { activity: 'CBSE Inspector Visit', detail: 'Principal Office · Lab inspection at 12:30', icon: ShieldCheck, color: 'bg-red-500', pulse: true },
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
                { activity: 'Staff Meeting', detail: '3:00 PM · Conference Room · All HODs', time: '3:00 PM', icon: Users },
                { activity: 'PTM — Class 9', detail: '4:00 PM · Classrooms · 42 parents expected', time: '4:00 PM', icon: UserCheck },
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

        {/* Task Tracker — Full Task Management Dashboard */}
        <TaskTrackerPanel theme={theme} role="principal" />
      </div>
    </div>
  );
}

// ─── DRILL-DOWN ANALYTICS PANEL ─────────────────────
function DrillDownPanel({ type, theme, onClose }: { type: 'students' | 'academic' | 'non-academic'; theme: Theme; onClose: () => void }) {
  const [tab, setTab] = useState(type === 'students' ? 'Class-wise' : 'Department-wise');

  const titles: Record<string, string> = { students: 'Student Attendance Analytics', academic: 'Academic Staff Analytics', 'non-academic': 'Non-Academic Staff Analytics' };

  // Student drill-down data
  const classWiseData = [
    { cls: 'Class I-A', strength: 42, present: 40, absent: 2, pct: 95.2 },
    { cls: 'Class I-B', strength: 40, present: 38, absent: 2, pct: 95.0 },
    { cls: 'Class II-A', strength: 45, present: 41, absent: 4, pct: 91.1 },
    { cls: 'Class III-A', strength: 48, present: 44, absent: 4, pct: 91.7 },
    { cls: 'Class IV-A', strength: 50, present: 42, absent: 8, pct: 84.0 },
    { cls: 'Class V-A', strength: 47, present: 43, absent: 4, pct: 91.5 },
    { cls: 'Class VI-A', strength: 52, present: 46, absent: 6, pct: 88.5 },
    { cls: 'Class VII-A', strength: 55, present: 48, absent: 7, pct: 87.3 },
    { cls: 'Class VIII-A', strength: 53, present: 45, absent: 8, pct: 84.9 },
    { cls: 'Class IX-A', strength: 50, present: 44, absent: 6, pct: 88.0 },
    { cls: 'Class X-A', strength: 48, present: 42, absent: 6, pct: 87.5 },
  ];
  const houseWiseData = [
    { house: 'Red House', strength: 312, present: 278, absent: 34, pct: 89.1, color: 'bg-red-500' },
    { house: 'Blue House', strength: 305, present: 271, absent: 34, pct: 88.9, color: 'bg-blue-500' },
    { house: 'Green House', strength: 318, present: 290, absent: 28, pct: 91.2, color: 'bg-emerald-500' },
    { house: 'Yellow House', strength: 312, present: 259, absent: 53, pct: 83.0, color: 'bg-amber-500' },
  ];
  const absentStudents = [
    { name: 'Aarav Patel', cls: 'V-A', reason: 'Sick Leave', days: 3, parent: '9876543210' },
    { name: 'Diya Shah', cls: 'VII-A', reason: 'Family Function', days: 1, parent: '9876543211' },
    { name: 'Vivaan Mehta', cls: 'IX-A', reason: 'No Intimation', days: 1, parent: '9876543212' },
    { name: 'Saanvi Gupta', cls: 'IV-A', reason: 'Medical', days: 5, parent: '9876543213' },
    { name: 'Reyansh Iyer', cls: 'X-A', reason: 'No Intimation', days: 2, parent: '9876543214' },
  ];

  // Staff drill-down data
  const deptWiseData = type === 'academic' ? [
    { dept: 'Mathematics', total: 12, present: 11, absent: 1, onLeave: 0, pct: 91.7 },
    { dept: 'Science', total: 10, present: 10, absent: 0, onLeave: 0, pct: 100 },
    { dept: 'English', total: 10, present: 9, absent: 1, onLeave: 1, pct: 90.0 },
    { dept: 'Social Studies', total: 8, present: 7, absent: 1, onLeave: 0, pct: 87.5 },
    { dept: 'Hindi', total: 8, present: 8, absent: 0, onLeave: 0, pct: 100 },
    { dept: 'Computer', total: 5, present: 4, absent: 1, onLeave: 1, pct: 80.0 },
    { dept: 'Physical Ed.', total: 4, present: 4, absent: 0, onLeave: 0, pct: 100 },
    { dept: 'Art & Music', total: 6, present: 5, absent: 1, onLeave: 0, pct: 83.3 },
    { dept: 'Library', total: 3, present: 3, absent: 0, onLeave: 0, pct: 100 },
  ] : [
    { dept: 'Administration', total: 12, present: 10, absent: 2, onLeave: 1, pct: 83.3 },
    { dept: 'Accounts', total: 6, present: 6, absent: 0, onLeave: 0, pct: 100 },
    { dept: 'IT Support', total: 4, present: 4, absent: 0, onLeave: 0, pct: 100 },
    { dept: 'Transport', total: 15, present: 13, absent: 2, onLeave: 0, pct: 86.7 },
    { dept: 'Housekeeping', total: 10, present: 8, absent: 2, onLeave: 1, pct: 80.0 },
    { dept: 'Security', total: 8, present: 7, absent: 1, onLeave: 0, pct: 87.5 },
    { dept: 'Lab Assistants', total: 5, present: 5, absent: 0, onLeave: 0, pct: 100 },
    { dept: 'Canteen', total: 4, present: 3, absent: 1, onLeave: 0, pct: 75.0 },
  ];
  const absentStaff = type === 'academic' ? [
    { name: 'Ms. Priya Sharma', dept: 'Mathematics', reason: 'Casual Leave', since: 'Today' },
    { name: 'Mr. Arun Verma', dept: 'English', reason: 'Medical Leave', since: '3 days' },
    { name: 'Ms. Kavitha Nair', dept: 'Computer', reason: 'No Intimation', since: 'Today' },
    { name: 'Mr. Deepak Singh', dept: 'Social Studies', reason: 'Half Day', since: 'Today' },
    { name: 'Ms. Neha Joshi', dept: 'Art & Music', reason: 'Personal Leave', since: 'Today' },
  ] : [
    { name: 'Ramesh Kumar', dept: 'Administration', reason: 'Sick Leave', since: '2 days' },
    { name: 'Suresh Yadav', dept: 'Transport', reason: 'No Intimation', since: 'Today' },
    { name: 'Pradeep Singh', dept: 'Housekeeping', reason: 'Casual Leave', since: 'Today' },
    { name: 'Gopal Das', dept: 'Security', reason: 'Medical', since: 'Today' },
  ];

  const studentTabs = ['Class-wise', 'House-wise', 'Absent Today'];
  const staffTabs = ['Department-wise', 'Absent Today', 'Leave Summary'];

  return (
    <div className={`${theme.cardBg} rounded-2xl border-2 border-blue-500/30 p-4 animate-in`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className={`text-sm font-bold ${theme.highlight} flex items-center gap-2`}>
          <BarChart3 size={16} className="text-blue-400" />
          {titles[type]}
        </h3>
        <button onClick={onClose} className={`p-1.5 rounded-lg ${theme.secondaryBg} ${theme.iconColor} hover:opacity-80`}>
          <X size={14} />
        </button>
      </div>

      <TabBar
        tabs={type === 'students' ? studentTabs : staffTabs}
        active={tab}
        onChange={setTab}
        theme={theme}
      />

      <div className="mt-3">
        {/* Student: Class-wise */}
        {type === 'students' && tab === 'Class-wise' && (
          <div className={`border ${theme.border} rounded-xl overflow-hidden`}>
            <table className="w-full text-xs">
              <thead><tr className={theme.secondaryBg}>
                <th className={`text-left p-2.5 ${theme.iconColor} font-bold`}>Class</th>
                <th className={`text-center p-2.5 ${theme.iconColor} font-bold`}>Strength</th>
                <th className={`text-center p-2.5 ${theme.iconColor} font-bold`}>Present</th>
                <th className={`text-center p-2.5 ${theme.iconColor} font-bold`}>Absent</th>
                <th className={`text-center p-2.5 ${theme.iconColor} font-bold`}>%</th>
              </tr></thead>
              <tbody>{classWiseData.map((r, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className={`p-2.5 font-bold ${theme.highlight}`}>{r.cls}</td>
                  <td className={`p-2.5 text-center ${theme.iconColor}`}>{r.strength}</td>
                  <td className="p-2.5 text-center text-emerald-500 font-bold">{r.present}</td>
                  <td className="p-2.5 text-center text-red-500 font-bold">{r.absent}</td>
                  <td className="p-2.5 text-center">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${r.pct >= 90 ? 'bg-emerald-500/20 text-emerald-400' : r.pct >= 85 ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'}`}>{r.pct}%</span>
                  </td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}

        {/* Student: House-wise */}
        {type === 'students' && tab === 'House-wise' && (
          <div className="grid grid-cols-2 gap-3">
            {houseWiseData.map((h, i) => (
              <div key={i} className={`p-3 rounded-xl border ${theme.border} flex items-center gap-3`}>
                <div className={`w-10 h-10 rounded-full ${h.color} flex items-center justify-center text-white text-xs font-bold`}>
                  {h.pct}%
                </div>
                <div className="flex-1">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{h.house}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{h.present}/{h.strength} present · {h.absent} absent</p>
                  <div className="h-1.5 rounded-full bg-slate-200 mt-1 overflow-hidden">
                    <div className={`h-full rounded-full ${h.color}`} style={{ width: `${h.pct}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Student: Absent Today */}
        {type === 'students' && tab === 'Absent Today' && (
          <div className="space-y-2">
            <p className={`text-[10px] ${theme.iconColor} mb-2`}>249 students absent today. Showing flagged cases:</p>
            {absentStudents.map((s, i) => (
              <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${theme.accentBg} border ${theme.border}`}>
                <div className={`w-8 h-8 rounded-full ${s.reason === 'No Intimation' ? 'bg-red-500' : 'bg-amber-500'} text-white flex items-center justify-center text-[10px] font-bold`}>
                  {s.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{s.name} <span className={`font-normal ${theme.iconColor}`}>({s.cls})</span></p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{s.reason} · {s.days} day(s)</p>
                </div>
                {s.reason === 'No Intimation' && <span className="text-[9px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-bold">Alert</span>}
              </div>
            ))}
          </div>
        )}

        {/* Staff: Department-wise */}
        {(type === 'academic' || type === 'non-academic') && tab === 'Department-wise' && (
          <div className={`border ${theme.border} rounded-xl overflow-hidden`}>
            <table className="w-full text-xs">
              <thead><tr className={theme.secondaryBg}>
                <th className={`text-left p-2.5 ${theme.iconColor} font-bold`}>Department</th>
                <th className={`text-center p-2.5 ${theme.iconColor} font-bold`}>Total</th>
                <th className={`text-center p-2.5 ${theme.iconColor} font-bold`}>Present</th>
                <th className={`text-center p-2.5 ${theme.iconColor} font-bold`}>Absent</th>
                <th className={`text-center p-2.5 ${theme.iconColor} font-bold`}>On Leave</th>
                <th className={`text-center p-2.5 ${theme.iconColor} font-bold`}>%</th>
              </tr></thead>
              <tbody>{deptWiseData.map((r, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className={`p-2.5 font-bold ${theme.highlight}`}>{r.dept}</td>
                  <td className={`p-2.5 text-center ${theme.iconColor}`}>{r.total}</td>
                  <td className="p-2.5 text-center text-emerald-500 font-bold">{r.present}</td>
                  <td className="p-2.5 text-center text-red-500 font-bold">{r.absent}</td>
                  <td className={`p-2.5 text-center ${theme.iconColor}`}>{r.onLeave}</td>
                  <td className="p-2.5 text-center">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${r.pct >= 90 ? 'bg-emerald-500/20 text-emerald-400' : r.pct >= 80 ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'}`}>{r.pct}%</span>
                  </td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}

        {/* Staff: Absent Today */}
        {(type === 'academic' || type === 'non-academic') && tab === 'Absent Today' && (
          <div className="space-y-2">
            <p className={`text-[10px] ${theme.iconColor} mb-2`}>{absentStaff.length} staff members absent today:</p>
            {absentStaff.map((s, i) => (
              <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${theme.accentBg} border ${theme.border}`}>
                <div className={`w-8 h-8 rounded-full ${s.reason === 'No Intimation' ? 'bg-red-500' : 'bg-amber-500'} text-white flex items-center justify-center text-[10px] font-bold`}>
                  {s.name.split(' ').filter(n => n[0] === n[0].toUpperCase()).map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{s.name}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{s.dept} · {s.reason} · Since: {s.since}</p>
                </div>
                {s.reason === 'No Intimation' && <span className="text-[9px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-bold">No Intimation</span>}
                {s.reason.includes('Leave') && <span className={`text-[9px] px-2 py-0.5 rounded-full ${theme.secondaryBg} ${theme.iconColor}`}>Approved</span>}
              </div>
            ))}
          </div>
        )}

        {/* Staff: Leave Summary */}
        {(type === 'academic' || type === 'non-academic') && tab === 'Leave Summary' && (
          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: 'Casual Leave', used: 12, total: 78, color: 'bg-blue-500' },
                { label: 'Sick Leave', used: 8, total: 78, color: 'bg-amber-500' },
                { label: 'Medical', used: 3, total: 78, color: 'bg-red-500' },
                { label: 'Half Day', used: 5, total: 78, color: 'bg-purple-500' },
              ].map((l, i) => (
                <div key={i} className={`p-3 rounded-xl border ${theme.border} text-center`}>
                  <p className={`text-lg font-bold ${theme.highlight}`}>{l.used}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{l.label}</p>
                  <div className="h-1 rounded-full bg-slate-200 mt-2 overflow-hidden">
                    <div className={`h-full rounded-full ${l.color}`} style={{ width: `${(l.used/l.total)*100}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <p className={`text-[10px] ${theme.iconColor}`}>This month&apos;s leave utilization across {type === 'academic' ? 'teaching' : 'non-teaching'} staff</p>
          </div>
        )}
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

// ─── REPORTS MODULE (REMARK 4: Overview cards with metrics + Transportation) ──
function ReportsModule({ theme }: { theme: Theme }) {
  const [expandedReport, setExpandedReport] = useState<string | null>(null);

  const reportCards = [
    {
      id: 'academic',
      title: 'Academic Report',
      icon: Award,
      color: 'bg-purple-500',
      lightBg: 'bg-purple-50',
      borderColor: 'border-purple-200',
      metrics: [
        { label: 'Pass Rate', value: '94%', color: 'text-emerald-600' },
        { label: 'Avg Score', value: '78%', color: 'text-blue-600' },
        { label: 'Top Subject', value: 'Science', color: 'text-purple-600' },
      ],
      progressValue: 94,
      progressColor: 'bg-purple-500',
      detailHeaders: ['Class', 'Strength', 'Avg Score', 'Pass %', 'Top Scorer', 'Distinction %'],
      detailRows: [
        ['Class I', '52', '91.2%', '100%', 'Aarav Mehta', '42%'],
        ['Class II', '48', '89.5%', '100%', 'Saanvi Patel', '38%'],
        ['Class III', '55', '87.8%', '98.2%', 'Vivaan Sharma', '35%'],
        ['Class IV', '50', '85.3%', '96.0%', 'Anaya Gupta', '31%'],
        ['Class V', '47', '83.6%', '95.7%', 'Reyansh Iyer', '28%'],
        ['Class VI', '53', '82.1%', '94.3%', 'Diya Reddy', '26%'],
      ],
    },
    {
      id: 'attendance',
      title: 'Attendance Report',
      icon: ClipboardCheck,
      color: 'bg-blue-500',
      lightBg: 'bg-blue-50',
      borderColor: 'border-blue-200',
      metrics: [
        { label: 'Avg Attendance', value: '92%', color: 'text-emerald-600' },
        { label: 'Chronic Absentees', value: '12', color: 'text-red-600' },
        { label: 'Perfect Attendance', value: '145', color: 'text-blue-600' },
      ],
      progressValue: 92,
      progressColor: 'bg-blue-500',
      detailHeaders: ['Class', 'Present', 'Absent', 'Late', 'Attendance %', 'Chronic Absentees'],
      detailRows: [
        ['Class I', '48', '4', '1', '92.3%', '1'],
        ['Class II', '45', '3', '0', '93.8%', '1'],
        ['Class III', '50', '5', '2', '90.9%', '2'],
        ['Class IV', '46', '4', '1', '92.0%', '2'],
        ['Class V', '44', '3', '0', '93.6%', '3'],
        ['Class VI', '49', '4', '1', '92.5%', '3'],
      ],
    },
    {
      id: 'financial',
      title: 'Financial Report',
      icon: IndianRupee,
      color: 'bg-emerald-500',
      lightBg: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      metrics: [
        { label: 'Collection Rate', value: '87%', color: 'text-emerald-600' },
        { label: 'Outstanding', value: '\u20B918.5L', color: 'text-red-600' },
        { label: 'Monthly Trend', value: '\u2191', color: 'text-emerald-600' },
      ],
      progressValue: 87,
      progressColor: 'bg-emerald-500',
      detailHeaders: ['Category', 'Collected', 'Pending', 'Collection %', 'Defaulters', 'Trend'],
      detailRows: [
        ['Tuition Fee', '\u20B942.5L', '\u20B94.2L', '91%', '23', '\u2191 +3%'],
        ['Transport Fee', '\u20B98.2L', '\u20B91.8L', '82%', '18', '\u2192 0%'],
        ['Lab Fee', '\u20B93.1L', '\u20B90.4L', '89%', '8', '\u2191 +2%'],
        ['Activity Fee', '\u20B95.6L', '\u20B91.2L', '82%', '15', '\u2193 -1%'],
        ['Exam Fee', '\u20B92.8L', '\u20B90.3L', '90%', '6', '\u2191 +4%'],
      ],
    },
    {
      id: 'staff',
      title: 'Staff Report',
      icon: Briefcase,
      color: 'bg-indigo-500',
      lightBg: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      metrics: [
        { label: 'Present Today', value: '134/142', color: 'text-emerald-600' },
        { label: 'Avg Rating', value: '4.2/5', color: 'text-amber-600' },
        { label: 'Open Leaves', value: '8', color: 'text-blue-600' },
      ],
      progressValue: 94,
      progressColor: 'bg-indigo-500',
      detailHeaders: ['Department', 'Strength', 'Present', 'Attendance %', 'Avg Rating', 'Leaves Used'],
      detailRows: [
        ['Teaching', '78', '72', '92.3%', '4.3/5', '12'],
        ['Admin', '23', '22', '95.7%', '4.1/5', '5'],
        ['Transport', '18', '17', '94.4%', '4.0/5', '8'],
        ['IT & Lab', '8', '8', '100%', '4.5/5', '2'],
        ['Security', '4', '4', '100%', '4.0/5', '1'],
        ['Housekeeping', '11', '11', '100%', '3.9/5', '4'],
      ],
    },
    {
      id: 'transportation',
      title: 'Transportation Report',
      icon: Bus,
      color: 'bg-amber-500',
      lightBg: 'bg-amber-50',
      borderColor: 'border-amber-200',
      metrics: [
        { label: 'Routes Active', value: '12/14', color: 'text-emerald-600' },
        { label: 'Students Using', value: '1,850', color: 'text-blue-600' },
        { label: 'GPS Coverage', value: '100%', color: 'text-emerald-600' },
        { label: 'Avg Delay', value: '3 min', color: 'text-amber-600' },
      ],
      progressValue: 86,
      progressColor: 'bg-amber-500',
      detailHeaders: ['Route', 'Bus No.', 'Driver', 'Students', 'Stops', 'Avg Delay', 'GPS'],
      detailRows: [
        ['Route 1 - Vastrapur', 'GJ-01-AB-1234', 'Ramesh Patel', '165', '12', '2 min', 'Active'],
        ['Route 2 - Satellite', 'GJ-01-CD-5678', 'Suresh Yadav', '158', '10', '4 min', 'Active'],
        ['Route 3 - Bodakdev', 'GJ-01-EF-9012', 'Mohan Singh', '142', '9', '3 min', 'Active'],
        ['Route 4 - Prahladnagar', 'GJ-01-GH-3456', 'Ahmed Khan', '168', '14', '5 min', 'Active'],
        ['Route 5 - Thaltej', 'GJ-01-IJ-7890', 'Vijay Sharma', '155', '11', '2 min', 'Active'],
        ['Route 6 - SG Highway', 'GJ-01-KL-2345', 'Dinesh Mehta', '148', '8', '3 min', 'Active'],
        ['Route 7 - Gota', 'GJ-01-MN-6789', 'Kamal Joshi', '135', '10', '4 min', 'Active'],
        ['Route 8 - Chandkheda', 'GJ-01-OP-0123', 'Ravi Kumar', '128', '9', '2 min', 'Active'],
        ['Route 9 - Bopal', 'GJ-01-QR-4567', 'Nilesh Patel', '140', '11', '3 min', 'Active'],
        ['Route 10 - Maninagar', 'GJ-01-ST-8901', 'Arjun Desai', '112', '7', '2 min', 'Active'],
        ['Route 11 - Navrangpura', 'GJ-01-UV-2345', 'Prakash Jha', '125', '8', '5 min', 'Active'],
        ['Route 12 - Ellis Bridge', 'GJ-01-WX-6789', 'Sanjay Gupta', '174', '13', '3 min', 'Active'],
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${theme.highlight}`}>Reports</h1>
          <p className={`text-xs ${theme.iconColor} mt-0.5`}>Key metrics at a glance. Click &quot;View Details&quot; for detailed breakdowns.</p>
        </div>
        <button className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold flex items-center gap-1`}>
          <Download size={12} /> Export All
        </button>
      </div>

      {/* Overview Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportCards.map(card => {
          const isExpanded = expandedReport === card.id;
          return (
            <div key={card.id} className={`${isExpanded ? 'col-span-full' : ''}`}>
              <div className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden hover:shadow-lg transition-all`}>
                {/* Card Header with colored accent */}
                <div className={`${card.lightBg} ${card.borderColor} border-b px-5 pt-4 pb-3`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center text-white`}>
                      <card.icon size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-sm font-bold ${theme.highlight}`}>{card.title}</h4>
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="p-4 space-y-3">
                  <div className={`grid ${card.metrics.length === 4 ? 'grid-cols-4' : 'grid-cols-3'} gap-3`}>
                    {card.metrics.map((m, mi) => (
                      <div key={mi} className={`${theme.secondaryBg} rounded-xl p-3 text-center`}>
                        <p className={`text-lg font-bold ${m.color}`}>{m.value}</p>
                        <p className={`text-[10px] font-medium ${theme.iconColor} mt-0.5`}>{m.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Progress bar */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] font-bold ${theme.iconColor}`}>Overall</span>
                      <span className={`text-[10px] font-bold ${theme.highlight}`}>{card.progressValue}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                      <div className={`h-full rounded-full ${card.progressColor} transition-all`} style={{ width: `${card.progressValue}%` }} />
                    </div>
                  </div>

                  {/* View Details button */}
                  <button
                    onClick={() => setExpandedReport(isExpanded ? null : card.id)}
                    className={`w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                      isExpanded ? `${card.color} text-white` : `${theme.secondaryBg} ${theme.highlight} ${theme.buttonHover}`
                    }`}
                  >
                    {isExpanded ? <><X size={12} /> Close Details</> : <><ArrowRight size={12} /> View Details &rarr;</>}
                  </button>
                </div>

                {/* Expanded Detail Table */}
                {isExpanded && (
                  <div className={`border-t ${theme.border} p-4`}>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className={`border-b ${theme.border}`}>
                            {card.detailHeaders.map((h, hi) => (
                              <th key={hi} className={`text-[10px] font-bold ${theme.iconColor} uppercase py-2 px-3 text-left`}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {card.detailRows.map((row, ri) => (
                            <tr key={ri} className={`border-b ${theme.border} last:border-b-0 ${theme.buttonHover}`}>
                              {row.map((cell, ci) => (
                                <td key={ci} className={`text-xs py-2.5 px-3 ${ci === 0 ? `font-bold ${theme.highlight}` : theme.iconColor}`}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                      <button className={`px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold flex items-center gap-1`}>
                        <Download size={10} /> Download PDF
                      </button>
                      <button className={`px-3 py-1.5 rounded-xl border ${theme.border} text-xs font-bold ${theme.highlight} flex items-center gap-1`}>
                        <FileText size={10} /> Full Report
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Report Generation Summary */}
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

// ─── (Announcements module removed — merged into Communication as a tab, REMARK 2) ──

// ─── COMMUNICATION MODULE (with Announcements tab — REMARK 2) ────────────────
function CommunicationModule({ theme }: { theme: Theme }) {
  const [commTab, setCommTab] = useState<'Messages' | 'Announcements' | 'Chat'>('Messages');
  const [showNewAnnouncement, setShowNewAnnouncement] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [announcementForm, setAnnouncementForm] = useState({
    title: '', message: '', audience: 'All Staff', priority: 'Normal' as 'Normal' | 'Important' | 'Urgent', scheduleMode: 'now' as 'now' | 'later', scheduleDate: '',
    studentFilters: { grades: [] as string[], divisions: [] as string[], sectionGroups: [] as string[], houses: [] as string[] },
  });

  // Recipient count calculator based on audience selection
  const getRecipientCounts = () => {
    const counts: { group: string; count: number }[] = [];
    const audience = announcementForm.audience;
    if (audience === 'All Staff' || audience === 'Selected Groups') {
      counts.push({ group: 'Academic Staff', count: 78 });
      counts.push({ group: 'Non-Academic Staff', count: 38 });
    }
    if (audience === 'Teachers') {
      counts.push({ group: 'Teaching Staff', count: 78 });
    }
    if (audience === 'Parents' || audience === 'Selected Groups') {
      counts.push({ group: 'Parents', count: 2847 });
    }
    if (audience === 'Students' || audience === 'Selected Groups') {
      const sf = announcementForm.studentFilters;
      const hasFilters = sf.grades.length > 0 || sf.divisions.length > 0 || sf.sectionGroups.length > 0 || sf.houses.length > 0;
      if (audience === 'Students' && hasFilters) {
        let studentCount = 0;
        if (sf.grades.length > 0) studentCount += sf.grades.length * 120;
        else studentCount = 2847;
        if (sf.divisions.length > 0) studentCount = Math.round(studentCount * sf.divisions.length / 4);
        if (sf.sectionGroups.length > 0) studentCount = Math.round(studentCount * sf.sectionGroups.length / 4);
        if (sf.houses.length > 0) studentCount = Math.round(studentCount * sf.houses.length / 4);
        counts.push({ group: 'Students (filtered)', count: Math.min(studentCount, 2847) });
      } else {
        counts.push({ group: 'Students', count: 2847 });
      }
    }
    return counts;
  };

  const totalRecipients = getRecipientCounts().reduce((sum, r) => sum + r.count, 0);

  const messages = [
    { id: 1, type: 'Circular', subject: 'Annual Day Rehearsal Schedule', from: 'Principal Office', to: 'All Staff + Parents', date: '11-Feb-2026', status: 'Sent', reads: '2,145 / 2,847' },
    { id: 2, type: 'Notice', subject: 'Fee Payment Reminder — Last Date 15 Feb', from: 'Accounts Dept.', to: 'Parents (Defaulters)', date: '10-Feb-2026', status: 'Sent', reads: '189 / 312' },
    { id: 3, type: 'Message', subject: 'Staff Meeting — Agenda for 14-Feb', from: 'Vice Principal', to: 'All Teaching Staff', date: '10-Feb-2026', status: 'Sent', reads: '65 / 78' },
    { id: 4, type: 'Circular', subject: 'PTM Schedule — Classes VI to X', from: 'Principal Office', to: 'Parents (VI-X)', date: '08-Feb-2026', status: 'Sent', reads: '890 / 1,120' },
    { id: 5, type: 'Alert', subject: 'Water Supply Disruption — 12 Feb', from: 'Admin Office', to: 'All', date: '07-Feb-2026', status: 'Sent', reads: '2,540 / 2,847' },
    { id: 6, type: 'Draft', subject: 'Summer Timing Change Notification', from: 'Principal Office', to: 'All', date: '—', status: 'Draft', reads: '—' },
  ];

  const announcements = [
    { id: 1, title: 'Annual Day Celebration — 28 February 2026', message: 'All students from Class I to X are expected to participate in the Annual Day celebration. Parents are cordially invited. Rehearsals begin from 15-Feb.', sentTo: 'All', date: '10-Feb-2026', sentBy: 'Principal' },
    { id: 2, title: 'Parent-Teacher Meeting Schedule', message: 'PTM for classes VI to X will be held on 15-Feb (Saturday). Parents are requested to collect the progress report from respective class teachers.', sentTo: 'Parents', date: '08-Feb-2026', sentBy: 'Principal' },
    { id: 3, title: 'Staff Development Workshop', message: 'A mandatory workshop on NEP 2020 implementation strategies will be conducted on 20-Feb. All teaching staff must attend. Relief arrangements in progress.', sentTo: 'Teachers', date: '07-Feb-2026', sentBy: 'Vice Principal' },
    { id: 4, title: 'Revised School Timings — Effective 1 March', message: 'Summer timings will be effective from 1-Mar-2026. School hours: 7:00 AM to 1:00 PM. Bus timings will be updated accordingly.', sentTo: 'All', date: '05-Feb-2026', sentBy: 'Principal' },
    { id: 5, title: 'Inter-School Science Exhibition', message: 'Selected students from classes VIII to X will represent our school at the District Science Exhibition on 25-Feb. Parents of selected students will be notified separately.', sentTo: 'Parents', date: '03-Feb-2026', sentBy: 'Dr. Priya Sharma' },
    { id: 6, title: 'Fee Payment Reminder — Last Date 15 February', message: 'Parents are requested to clear all pending fee dues by 15-Feb-2026. Late fee of Rs. 500 will be applicable after the due date.', sentTo: 'Parents', date: '01-Feb-2026', sentBy: 'Accounts Dept.' },
  ];

  const typeColor = (type: string) => {
    if (type === 'Circular') return 'bg-blue-100 text-blue-700';
    if (type === 'Notice') return 'bg-amber-100 text-amber-700';
    if (type === 'Alert') return 'bg-red-100 text-red-700';
    if (type === 'Draft') return 'bg-gray-100 text-gray-600';
    return 'bg-purple-100 text-purple-700';
  };

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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Communication</h1>
        <div className="flex gap-2">
          {commTab === 'Messages' && (
            <>
              <button className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold flex items-center gap-1`}>
                <Plus size={12} /> New Circular
              </button>
              <button className={`px-4 py-2 ${theme.secondaryBg} rounded-xl text-xs font-bold ${theme.highlight} flex items-center gap-1`}>
                <Send size={12} /> Quick Message
              </button>
            </>
          )}
          {commTab === 'Announcements' && (
            <button onClick={() => setShowNewAnnouncement(true)} className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}>
              <Plus size={14} /> New Announcement
            </button>
          )}
        </div>
      </div>

      {/* Tab Bar */}
      <TabBar tabs={['Messages', 'Announcements', 'Chat']} active={commTab} onChange={(t) => setCommTab(t as 'Messages' | 'Announcements' | 'Chat')} theme={theme} />

      {/* ── Messages Tab ── */}
      {commTab === 'Messages' && (
        <>
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
        </>
      )}

      {/* ── Announcements Tab (moved from separate module — REMARK 2) ── */}
      {commTab === 'Announcements' && (
        <>
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
        </>
      )}

      {/* ── Chat Tab ── */}
      {commTab === 'Chat' && <ChatsView theme={theme} compact />}

      {/* ── New Announcement Modal (REMARK 3) ── */}
      {showNewAnnouncement && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowNewAnnouncement(false)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} shadow-2xl w-full max-w-lg p-6 space-y-4`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-9 h-9 rounded-xl ${theme.primary} flex items-center justify-center text-white`}><Megaphone size={18} /></div>
                <h2 className={`text-lg font-bold ${theme.highlight}`}>New Announcement</h2>
              </div>
              <button onClick={() => setShowNewAnnouncement(false)} className={`p-1.5 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
            </div>

            {/* Title */}
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Title</label>
              <input
                type="text"
                value={announcementForm.title}
                onChange={e => setAnnouncementForm(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter announcement title..."
                className={`w-full px-3 py-2.5 rounded-xl text-sm ${theme.inputBg} border ${theme.border} ${theme.highlight} outline-none focus:ring-2 focus:ring-blue-300`}
              />
            </div>

            {/* Message */}
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Message</label>
              <textarea
                value={announcementForm.message}
                onChange={e => setAnnouncementForm(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Type your announcement message..."
                rows={4}
                className={`w-full px-3 py-2.5 rounded-xl text-sm ${theme.inputBg} border ${theme.border} ${theme.highlight} outline-none focus:ring-2 focus:ring-blue-300 resize-none`}
              />
            </div>

            {/* Audience + Priority row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Audience</label>
                <select
                  value={announcementForm.audience}
                  onChange={e => setAnnouncementForm(prev => ({ ...prev, audience: e.target.value, studentFilters: { grades: [], divisions: [], sectionGroups: [], houses: [] } }))}
                  className={`w-full px-3 py-2.5 rounded-xl text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight} outline-none focus:ring-2 focus:ring-blue-300`}
                >
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
                    <button
                      key={p}
                      onClick={() => setAnnouncementForm(prev => ({ ...prev, priority: p }))}
                      className={`flex-1 px-2 py-2 rounded-xl text-[10px] font-bold transition-all ${
                        announcementForm.priority === p ? priorityStyle(p) : `${theme.secondaryBg} ${theme.iconColor} ${theme.buttonHover}`
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Student Sub-Filters (shown when audience = Students) */}
            {announcementForm.audience === 'Students' && (
              <div className={`p-3 rounded-xl border ${theme.border} ${theme.secondaryBg} space-y-3`}>
                <p className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>Student Filters</p>

                {/* Grade-wise */}
                <div>
                  <label className={`text-[10px] font-medium ${theme.iconColor} block mb-1`}>Grade-wise</label>
                  <div className="flex flex-wrap gap-1">
                    {Array.from({ length: 12 }, (_, i) => `Grade ${i + 1}`).map(g => (
                      <button
                        key={g}
                        onClick={() => setAnnouncementForm(prev => ({
                          ...prev,
                          studentFilters: {
                            ...prev.studentFilters,
                            grades: prev.studentFilters.grades.includes(g)
                              ? prev.studentFilters.grades.filter(x => x !== g)
                              : [...prev.studentFilters.grades, g]
                          }
                        }))}
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                          announcementForm.studentFilters.grades.includes(g)
                            ? `${theme.primary} text-white`
                            : `${theme.cardBg} ${theme.iconColor} border ${theme.border}`
                        }`}
                      >
                        {g.replace('Grade ', '')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Division */}
                <div>
                  <label className={`text-[10px] font-medium ${theme.iconColor} block mb-1`}>Division</label>
                  <div className="flex gap-1.5">
                    {['A', 'B', 'C', 'D'].map(d => (
                      <button
                        key={d}
                        onClick={() => setAnnouncementForm(prev => ({
                          ...prev,
                          studentFilters: {
                            ...prev.studentFilters,
                            divisions: prev.studentFilters.divisions.includes(d)
                              ? prev.studentFilters.divisions.filter(x => x !== d)
                              : [...prev.studentFilters.divisions, d]
                          }
                        }))}
                        className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                          announcementForm.studentFilters.divisions.includes(d)
                            ? `${theme.primary} text-white`
                            : `${theme.cardBg} ${theme.iconColor} border ${theme.border}`
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section Group */}
                <div>
                  <label className={`text-[10px] font-medium ${theme.iconColor} block mb-1`}>Section Group</label>
                  <div className="flex flex-wrap gap-1.5">
                    {['Pre-Primary', 'Primary', 'Secondary', 'Senior Secondary'].map(s => (
                      <button
                        key={s}
                        onClick={() => setAnnouncementForm(prev => ({
                          ...prev,
                          studentFilters: {
                            ...prev.studentFilters,
                            sectionGroups: prev.studentFilters.sectionGroups.includes(s)
                              ? prev.studentFilters.sectionGroups.filter(x => x !== s)
                              : [...prev.studentFilters.sectionGroups, s]
                          }
                        }))}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                          announcementForm.studentFilters.sectionGroups.includes(s)
                            ? `${theme.primary} text-white`
                            : `${theme.cardBg} ${theme.iconColor} border ${theme.border}`
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* House-wise */}
                <div>
                  <label className={`text-[10px] font-medium ${theme.iconColor} block mb-1`}>House-wise</label>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { name: 'Red House', color: 'bg-red-500' },
                      { name: 'Blue House', color: 'bg-blue-500' },
                      { name: 'Green House', color: 'bg-green-500' },
                      { name: 'Yellow House', color: 'bg-yellow-500' },
                    ].map(h => (
                      <button
                        key={h.name}
                        onClick={() => setAnnouncementForm(prev => ({
                          ...prev,
                          studentFilters: {
                            ...prev.studentFilters,
                            houses: prev.studentFilters.houses.includes(h.name)
                              ? prev.studentFilters.houses.filter(x => x !== h.name)
                              : [...prev.studentFilters.houses, h.name]
                          }
                        }))}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                          announcementForm.studentFilters.houses.includes(h.name)
                            ? `${theme.primary} text-white`
                            : `${theme.cardBg} ${theme.iconColor} border ${theme.border}`
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${h.color}`} />
                        {h.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Attachment */}
            <button className={`flex items-center gap-2 px-3 py-2 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} transition-all`}>
              <Paperclip size={14} className={theme.iconColor} />
              <span className={`text-xs font-medium ${theme.iconColor}`}>Add Attachment</span>
            </button>

            {/* Schedule Toggle */}
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-2`}>Schedule</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setAnnouncementForm(prev => ({ ...prev, scheduleMode: 'now' }))}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    announcementForm.scheduleMode === 'now' ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.iconColor}`
                  }`}
                >
                  <Send size={12} /> Send Now
                </button>
                <button
                  onClick={() => setAnnouncementForm(prev => ({ ...prev, scheduleMode: 'later' }))}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    announcementForm.scheduleMode === 'later' ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.iconColor}`
                  }`}
                >
                  <Clock size={12} /> Schedule for Later
                </button>
              </div>
              {announcementForm.scheduleMode === 'later' && (
                <input
                  type="datetime-local"
                  value={announcementForm.scheduleDate}
                  onChange={e => setAnnouncementForm(prev => ({ ...prev, scheduleDate: e.target.value }))}
                  className={`mt-2 w-full px-3 py-2 rounded-xl text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight} outline-none focus:ring-2 focus:ring-blue-300`}
                />
              )}
            </div>

            {/* Preview Button (opens confirmation step) */}
            <button
              onClick={() => setShowPreview(true)}
              className={`w-full py-3 rounded-xl ${theme.primary} text-white text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity`}
            >
              <Eye size={14} /> Preview &amp; Confirm
            </button>
          </div>
        </div>
      )}

      {/* ── Preview / Confirmation Modal ── */}
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

            {/* Announcement Preview */}
            <div className={`p-4 rounded-xl ${theme.secondaryBg} border ${theme.border} space-y-2`}>
              <h3 className={`text-sm font-bold ${theme.highlight}`}>{announcementForm.title || '(No title)'}</h3>
              <p className={`text-xs ${theme.iconColor} leading-relaxed`}>{announcementForm.message || '(No message)'}</p>
              <div className="flex items-center gap-2 pt-1">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${priorityStyle(announcementForm.priority)}`}>{announcementForm.priority}</span>
                <span className={`text-[10px] ${theme.iconColor}`}>{announcementForm.scheduleMode === 'now' ? 'Send immediately' : `Scheduled: ${announcementForm.scheduleDate || 'Not set'}`}</span>
              </div>
            </div>

            {/* Recipient Breakdown */}
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

            {/* Student filter summary */}
            {announcementForm.audience === 'Students' && (
              <div className={`text-[10px] ${theme.iconColor} space-y-0.5`}>
                {announcementForm.studentFilters.grades.length > 0 && <p>Grades: {announcementForm.studentFilters.grades.join(', ')}</p>}
                {announcementForm.studentFilters.divisions.length > 0 && <p>Divisions: {announcementForm.studentFilters.divisions.join(', ')}</p>}
                {announcementForm.studentFilters.sectionGroups.length > 0 && <p>Sections: {announcementForm.studentFilters.sectionGroups.join(', ')}</p>}
                {announcementForm.studentFilters.houses.length > 0 && <p>Houses: {announcementForm.studentFilters.houses.join(', ')}</p>}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowPreview(false)}
                className={`flex-1 py-2.5 rounded-xl ${theme.secondaryBg} ${theme.highlight} text-xs font-bold flex items-center justify-center gap-1.5 ${theme.buttonHover} transition-all`}
              >
                <Edit2 size={12} /> Edit
              </button>
              <button
                onClick={() => {
                  setShowPreview(false);
                  setShowNewAnnouncement(false);
                  setAnnouncementForm({ title: '', message: '', audience: 'All Staff', priority: 'Normal', scheduleMode: 'now', scheduleDate: '', studentFilters: { grades: [], divisions: [], sectionGroups: [], houses: [] } });
                }}
                className={`flex-1 py-2.5 rounded-xl ${theme.primary} text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity`}
              >
                <Send size={12} /> {announcementForm.scheduleMode === 'now' ? 'Confirm & Send' : 'Confirm & Schedule'}
              </button>
            </div>
          </div>
        </div>
      )}
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
