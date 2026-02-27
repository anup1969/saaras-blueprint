'use client';

import React, { useState } from 'react';
import { StatCard } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  Building2, Users, Layers, TrendingUp, AlertTriangle,
  Globe, Bell, Zap, Database, Shield, Award, User, Briefcase,
  ChevronRight,
} from 'lucide-react';
import MiniSparkline from '../_components/MiniSparkline';
import ProgressBar from '../_components/ProgressBar';

// ─── ANALYTICS MOCK DATA ───────────────────────────────
const analyticsSchools = [
  {
    id: 'AS01', name: 'Delhi Public School', city: 'Ahmedabad', plan: 'Pro' as const,
    activeUsers: 1240, healthScore: 95, lastActive: '2 min ago',
    sparkline: [30, 45, 38, 52, 60, 55, 68, 72, 65, 78, 80, 85],
    subscriptionStart: 'Apr 2024', subscriptionEnd: 'Mar 2026',
    dataBucket: { used: 2.4, total: 5 }, bandwidth: { used: 145, total: 200 },
    notifications: { sms: 3200, email: 8100, push: 1150 }, apiCalls: 245000,
    users: {
      parents: { registered: 850, active: 720, avgSessions: 2.3 },
      academicStaff: { registered: 78, active: 72, avgSessions: 4.1 },
      nonAcademicStaff: { registered: 64, active: 45, avgSessions: 1.8 },
      students: { registered: 1200, active: 890, avgSessions: 1.5 },
    },
    topModules: [
      { name: 'Attendance', actions: 45200 },
      { name: 'Fees & Payments', actions: 32100 },
      { name: 'Communication', actions: 28400 },
      { name: 'Timetable', actions: 22800 },
      { name: 'Homework', actions: 18900 },
    ],
    topEmployees: [
      { name: 'Rajesh Kumar', role: 'Vice Principal', sessions: 142, lastActive: '5 min ago', usageMins: 285 },
      { name: 'Priya Sharma', role: 'Academic Coord.', sessions: 128, lastActive: '12 min ago', usageMins: 262 },
      { name: 'Amit Patel', role: 'Fee Accountant', sessions: 119, lastActive: '1 hr ago', usageMins: 245 },
      { name: 'Sneha Desai', role: 'Class Teacher', sessions: 105, lastActive: '30 min ago', usageMins: 228 },
      { name: 'Vikram Singh', role: 'Sports Head', sessions: 98, lastActive: '2 hr ago', usageMins: 210 },
    ],
    worstEmployees: [
      { name: 'Deepak Joshi', role: 'Lab Assistant', sessions: 3, lastActive: '18 days ago', usageMins: 5 },
      { name: 'Meena Rao', role: 'Librarian', sessions: 5, lastActive: '15 days ago', usageMins: 8 },
      { name: 'Suresh Nair', role: 'Peon Supervisor', sessions: 7, lastActive: '12 days ago', usageMins: 11 },
      { name: 'Kavita Bhat', role: 'Art Teacher', sessions: 9, lastActive: '10 days ago', usageMins: 14 },
      { name: 'Ramesh Yadav', role: 'PT Teacher', sessions: 11, lastActive: '8 days ago', usageMins: 18 },
    ],
    alarms: [
      { message: '5 staff members haven\'t logged in for 15+ days', severity: 'red' as const },
      { message: 'Parent app adoption dropped 12% this month', severity: 'amber' as const },
      { message: 'Data bucket at 85% capacity', severity: 'amber' as const },
      { message: 'Unusually high API calls from single user', severity: 'red' as const },
      { message: 'SMS quota 90% exhausted', severity: 'amber' as const },
    ],
  },
  {
    id: 'AS02', name: 'St. Xavier\'s High School', city: 'Surat', plan: 'Enterprise' as const,
    activeUsers: 2100, healthScore: 88, lastActive: '15 min ago',
    sparkline: [50, 55, 60, 58, 65, 70, 68, 75, 72, 80, 82, 78],
    subscriptionStart: 'Jan 2024', subscriptionEnd: 'Dec 2025',
    dataBucket: { used: 4.1, total: 10 }, bandwidth: { used: 310, total: 500 },
    notifications: { sms: 5400, email: 12300, push: 2100 }, apiCalls: 412000,
    users: {
      parents: { registered: 1400, active: 1180, avgSessions: 2.1 },
      academicStaff: { registered: 120, active: 108, avgSessions: 3.8 },
      nonAcademicStaff: { registered: 85, active: 62, avgSessions: 1.5 },
      students: { registered: 1800, active: 1350, avgSessions: 1.7 },
    },
    topModules: [
      { name: 'Fees & Payments', actions: 58200 },
      { name: 'Attendance', actions: 52100 },
      { name: 'Communication', actions: 41400 },
      { name: 'Examination', actions: 35800 },
      { name: 'Timetable', actions: 28900 },
    ],
    topEmployees: [
      { name: 'Fr. Joseph', role: 'Principal', sessions: 155, lastActive: '10 min ago', usageMins: 298 },
      { name: 'Anita Fernandes', role: 'VP Academics', sessions: 140, lastActive: '20 min ago', usageMins: 270 },
      { name: 'Rohit Mehta', role: 'Admin Head', sessions: 132, lastActive: '45 min ago', usageMins: 255 },
      { name: 'Sonia D\'Souza', role: 'Exam Coord.', sessions: 121, lastActive: '1 hr ago', usageMins: 238 },
      { name: 'Michael Thomas', role: 'IT Admin', sessions: 115, lastActive: '30 min ago', usageMins: 220 },
    ],
    worstEmployees: [
      { name: 'Prakash Verma', role: 'Security Head', sessions: 2, lastActive: '22 days ago', usageMins: 6 },
      { name: 'Lalita Devi', role: 'Ayah', sessions: 4, lastActive: '19 days ago', usageMins: 9 },
      { name: 'Ganesh Pillai', role: 'Store Keeper', sessions: 6, lastActive: '14 days ago', usageMins: 12 },
      { name: 'Fatima Sheikh', role: 'Music Teacher', sessions: 8, lastActive: '11 days ago', usageMins: 15 },
      { name: 'Ravi Kulkarni', role: 'Driver Coord.', sessions: 10, lastActive: '9 days ago', usageMins: 18 },
    ],
    alarms: [
      { message: '3 staff members haven\'t logged in for 15+ days', severity: 'red' as const },
      { message: 'Bandwidth usage above 60% mid-month', severity: 'amber' as const },
      { message: 'Subscription renewal in 45 days', severity: 'amber' as const },
    ],
  },
  {
    id: 'AS03', name: 'Navneet International', city: 'Vadodara', plan: 'Basic' as const,
    activeUsers: 680, healthScore: 72, lastActive: '1 hr ago',
    sparkline: [20, 22, 25, 24, 28, 26, 30, 28, 32, 35, 33, 36],
    subscriptionStart: 'Sep 2025', subscriptionEnd: 'Aug 2026',
    dataBucket: { used: 1.1, total: 2 }, bandwidth: { used: 42, total: 50 },
    notifications: { sms: 1100, email: 3200, push: 450 }, apiCalls: 78000,
    users: {
      parents: { registered: 420, active: 310, avgSessions: 1.8 },
      academicStaff: { registered: 35, active: 28, avgSessions: 3.2 },
      nonAcademicStaff: { registered: 22, active: 12, avgSessions: 1.1 },
      students: { registered: 500, active: 330, avgSessions: 1.2 },
    },
    topModules: [
      { name: 'Attendance', actions: 18200 },
      { name: 'Fees & Payments', actions: 14100 },
      { name: 'Communication', actions: 9800 },
      { name: 'Timetable', actions: 7200 },
      { name: 'Homework', actions: 5400 },
    ],
    topEmployees: [
      { name: 'Hemant Shah', role: 'Principal', sessions: 88, lastActive: '1 hr ago', usageMins: 240 },
      { name: 'Nisha Jain', role: 'Accountant', sessions: 72, lastActive: '2 hr ago', usageMins: 218 },
      { name: 'Dilip Pandya', role: 'Admin Officer', sessions: 65, lastActive: '3 hr ago', usageMins: 205 },
      { name: 'Poonam Trivedi', role: 'Class Teacher', sessions: 58, lastActive: '4 hr ago', usageMins: 195 },
      { name: 'Chirag Patel', role: 'IT Support', sessions: 52, lastActive: '1 hr ago', usageMins: 188 },
    ],
    worstEmployees: [
      { name: 'Bharat Solanki', role: 'Gardener Sup.', sessions: 1, lastActive: '25 days ago', usageMins: 5 },
      { name: 'Jaya Amin', role: 'Craft Teacher', sessions: 2, lastActive: '20 days ago', usageMins: 7 },
      { name: 'Kishore Raval', role: 'Clerk', sessions: 4, lastActive: '16 days ago', usageMins: 10 },
      { name: 'Usha Vyas', role: 'Nurse', sessions: 5, lastActive: '13 days ago', usageMins: 13 },
      { name: 'Manoj Thakkar', role: 'Watchman Sup.', sessions: 6, lastActive: '11 days ago', usageMins: 16 },
    ],
    alarms: [
      { message: 'Data bucket at 55% — approaching limit on Basic plan', severity: 'amber' as const },
      { message: 'Bandwidth usage at 84% — risk of overage', severity: 'red' as const },
      { message: '10 staff members haven\'t logged in for 15+ days', severity: 'red' as const },
      { message: 'Parent adoption rate only 52%', severity: 'amber' as const },
    ],
  },
  {
    id: 'AS04', name: 'Bright Future Academy', city: 'Rajkot', plan: 'Pro' as const,
    activeUsers: 890, healthScore: 91, lastActive: '8 min ago',
    sparkline: [35, 40, 42, 48, 50, 52, 55, 58, 60, 62, 65, 68],
    subscriptionStart: 'Jun 2025', subscriptionEnd: 'May 2026',
    dataBucket: { used: 1.8, total: 5 }, bandwidth: { used: 95, total: 200 },
    notifications: { sms: 2100, email: 6500, push: 880 }, apiCalls: 178000,
    users: {
      parents: { registered: 580, active: 510, avgSessions: 2.5 },
      academicStaff: { registered: 52, active: 48, avgSessions: 4.5 },
      nonAcademicStaff: { registered: 38, active: 30, avgSessions: 2.0 },
      students: { registered: 720, active: 620, avgSessions: 1.6 },
    },
    topModules: [
      { name: 'Attendance', actions: 28400 },
      { name: 'Communication', actions: 22800 },
      { name: 'Fees & Payments', actions: 19200 },
      { name: 'Homework', actions: 15600 },
      { name: 'Timetable', actions: 12400 },
    ],
    topEmployees: [
      { name: 'Dr. Meera Joshi', role: 'Director', sessions: 135, lastActive: '8 min ago', usageMins: 275 },
      { name: 'Karan Bhatt', role: 'Vice Principal', sessions: 122, lastActive: '20 min ago', usageMins: 258 },
      { name: 'Shreya Patel', role: 'Exam Officer', sessions: 108, lastActive: '1 hr ago', usageMins: 235 },
      { name: 'Nitin Doshi', role: 'Fee Manager', sessions: 96, lastActive: '45 min ago', usageMins: 215 },
      { name: 'Avni Thakkar', role: 'Class Teacher', sessions: 89, lastActive: '2 hr ago', usageMins: 198 },
    ],
    worstEmployees: [
      { name: 'Gopal Makwana', role: 'Lab Boy', sessions: 4, lastActive: '14 days ago', usageMins: 8 },
      { name: 'Sarla Parmar', role: 'Peon', sessions: 5, lastActive: '12 days ago', usageMins: 10 },
      { name: 'Jayesh Raval', role: 'Driver', sessions: 7, lastActive: '10 days ago', usageMins: 14 },
      { name: 'Pushpa Nayak', role: 'Kitchen Staff', sessions: 8, lastActive: '9 days ago', usageMins: 16 },
      { name: 'Vishal Gohel', role: 'Gardener', sessions: 9, lastActive: '7 days ago', usageMins: 19 },
    ],
    alarms: [
      { message: '2 staff members haven\'t logged in for 14+ days', severity: 'amber' as const },
      { message: 'SMS quota 72% exhausted', severity: 'amber' as const },
    ],
  },
  {
    id: 'AS05', name: 'Green Valley School', city: 'Gandhinagar', plan: 'Pro' as const,
    activeUsers: 1050, healthScore: 45, lastActive: '3 hr ago',
    sparkline: [60, 55, 48, 42, 38, 35, 30, 28, 25, 22, 20, 18],
    subscriptionStart: 'Feb 2025', subscriptionEnd: 'Jan 2026',
    dataBucket: { used: 4.6, total: 5 }, bandwidth: { used: 188, total: 200 },
    notifications: { sms: 4800, email: 9200, push: 1600 }, apiCalls: 320000,
    users: {
      parents: { registered: 700, active: 320, avgSessions: 0.8 },
      academicStaff: { registered: 65, active: 38, avgSessions: 1.9 },
      nonAcademicStaff: { registered: 48, active: 18, avgSessions: 0.6 },
      students: { registered: 900, active: 410, avgSessions: 0.7 },
    },
    topModules: [
      { name: 'Fees & Payments', actions: 38200 },
      { name: 'Attendance', actions: 22100 },
      { name: 'Communication', actions: 15400 },
      { name: 'Timetable', actions: 8800 },
      { name: 'Homework', actions: 5200 },
    ],
    topEmployees: [
      { name: 'Tushar Mehta', role: 'Admin Head', sessions: 68, lastActive: '3 hr ago', usageMins: 210 },
      { name: 'Reena Chauhan', role: 'Accountant', sessions: 55, lastActive: '5 hr ago', usageMins: 195 },
      { name: 'Sunil Pandey', role: 'Class Teacher', sessions: 42, lastActive: '8 hr ago', usageMins: 178 },
      { name: 'Alka Joshi', role: 'Receptionist', sessions: 38, lastActive: '6 hr ago', usageMins: 165 },
      { name: 'Deepa Shah', role: 'Clerk', sessions: 32, lastActive: '1 day ago', usageMins: 148 },
    ],
    worstEmployees: [
      { name: 'Mahesh Solanki', role: 'VP Academics', sessions: 2, lastActive: '28 days ago', usageMins: 5 },
      { name: 'Sunita Rawat', role: 'HOD Science', sessions: 3, lastActive: '24 days ago', usageMins: 7 },
      { name: 'Arun Mishra', role: 'HOD Math', sessions: 3, lastActive: '22 days ago', usageMins: 9 },
      { name: 'Geeta Sharma', role: 'Coordinator', sessions: 4, lastActive: '20 days ago', usageMins: 12 },
      { name: 'Vijay Patil', role: 'Sports Teacher', sessions: 5, lastActive: '18 days ago', usageMins: 15 },
    ],
    alarms: [
      { message: '12 staff members haven\'t logged in for 15+ days', severity: 'red' as const },
      { message: 'Overall user engagement dropped 35% this month', severity: 'red' as const },
      { message: 'Data bucket at 92% capacity — upgrade needed', severity: 'red' as const },
      { message: 'Bandwidth at 94% — will exceed limit in 3 days', severity: 'red' as const },
      { message: 'Parent app adoption dropped 28% this month', severity: 'red' as const },
      { message: 'VP Academics not logged in for 28 days', severity: 'red' as const },
      { message: 'SMS quota 96% exhausted', severity: 'amber' as const },
    ],
  },
];

export default function AnalyticsView({ theme }: { theme: Theme }) {
  const [selectedSchoolId, setSelectedSchoolId] = useState<string | null>(null);
  const selectedSchool = analyticsSchools.find(s => s.id === selectedSchoolId);

  // ── Level 2: School Detail ──
  if (selectedSchool) {
    const s = selectedSchool;
    const totalNotifications = s.notifications.sms + s.notifications.email + s.notifications.push;
    const alarmCount = s.alarms.filter(a => a.severity === 'red').length;
    return (
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <button onClick={() => setSelectedSchoolId(null)} className={`text-xs ${theme.primaryText} font-bold mb-2 flex items-center gap-1`}>
              <ChevronRight size={12} className="rotate-180" /> Back to All Schools
            </button>
            <h2 className={`text-lg font-bold ${theme.highlight}`}>{s.name}, {s.city}</h2>
            <p className={`text-xs ${theme.iconColor} mt-0.5`}>
              {s.plan} Plan &middot; {s.subscriptionStart} to {s.subscriptionEnd}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {alarmCount > 0 && (
              <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-red-100 text-red-700 text-[10px] font-bold">
                <AlertTriangle size={12} /> {alarmCount} Critical
              </span>
            )}
            <div className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
              s.plan === 'Enterprise' ? 'bg-amber-100 text-amber-700' :
              s.plan === 'Pro' ? 'bg-purple-100 text-purple-700' :
              'bg-blue-100 text-blue-700'
            }`}>{s.plan}</div>
          </div>
        </div>

        {/* Usage Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center gap-2 mb-2">
              <Database size={14} className={theme.primaryText} />
              <span className={`text-xs font-bold ${theme.highlight}`}>Data Bucket</span>
            </div>
            <ProgressBar used={s.dataBucket.used} total={s.dataBucket.total} unit="GB" theme={theme} />
          </div>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center gap-2 mb-2">
              <Globe size={14} className={theme.primaryText} />
              <span className={`text-xs font-bold ${theme.highlight}`}>Bandwidth</span>
            </div>
            <ProgressBar used={s.bandwidth.used} total={s.bandwidth.total} unit="GB" theme={theme} />
          </div>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center gap-2 mb-2">
              <Bell size={14} className={theme.primaryText} />
              <span className={`text-xs font-bold ${theme.highlight}`}>Notifications</span>
            </div>
            <p className={`text-lg font-bold ${theme.highlight}`}>{totalNotifications.toLocaleString()}</p>
            <p className={`text-[10px] ${theme.iconColor}`}>this month</p>
            <div className="flex gap-2 mt-1.5">
              <span className="text-[10px] text-blue-600 font-bold">SMS: {s.notifications.sms.toLocaleString()}</span>
              <span className="text-[10px] text-emerald-600 font-bold">Email: {s.notifications.email.toLocaleString()}</span>
              <span className="text-[10px] text-purple-600 font-bold">Push: {s.notifications.push.toLocaleString()}</span>
            </div>
          </div>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center gap-2 mb-2">
              <Zap size={14} className={theme.primaryText} />
              <span className={`text-xs font-bold ${theme.highlight}`}>API Calls</span>
            </div>
            <p className={`text-lg font-bold ${theme.highlight}`}>{(s.apiCalls / 1000).toFixed(0)}K</p>
            <p className={`text-[10px] ${theme.iconColor}`}>this month</p>
          </div>
        </div>

        {/* User Usage Breakdown */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3 flex items-center gap-2`}>
            <Users size={14} className={theme.primaryText} /> User Usage Breakdown
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {([
              { label: 'Parents', data: s.users.parents, color: 'bg-blue-500', icon: User },
              { label: 'Academic Staff', data: s.users.academicStaff, color: 'bg-emerald-500', icon: Briefcase },
              { label: 'Non-Academic Staff', data: s.users.nonAcademicStaff, color: 'bg-amber-500', icon: Shield },
              { label: 'Students', data: s.users.students, color: 'bg-purple-500', icon: Award },
            ] as const).map(u => {
              const activePct = Math.round((u.data.active / u.data.registered) * 100);
              return (
                <div key={u.label} className={`p-3 rounded-xl ${theme.secondaryBg}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-6 h-6 rounded-lg ${u.color} text-white flex items-center justify-center`}>
                      <u.icon size={12} />
                    </div>
                    <span className={`text-xs font-bold ${theme.highlight}`}>{u.label}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className={`text-[10px] ${theme.iconColor}`}>Registered</span>
                      <span className={`text-xs font-bold ${theme.highlight}`}>{u.data.registered}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`text-[10px] ${theme.iconColor}`}>Active</span>
                      <span className={`text-xs font-bold text-emerald-600`}>{u.data.active} ({activePct}%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`text-[10px] ${theme.iconColor}`}>Avg sessions/day</span>
                      <span className={`text-xs font-bold ${theme.primaryText}`}>{u.data.avgSessions}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Modules by Usage */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3 flex items-center gap-2`}>
            <Layers size={14} className={theme.primaryText} /> Top Modules by Usage
          </h3>
          <div className="space-y-2.5">
            {s.topModules.map((mod, i) => {
              const maxActions = s.topModules[0].actions;
              const pct = Math.round((mod.actions / maxActions) * 100);
              const colors = ['bg-slate-400', 'bg-slate-300', 'bg-blue-200', 'bg-emerald-200', 'bg-stone-300'];
              return (
                <div key={mod.name} className="flex items-center gap-3">
                  <span className={`text-[10px] font-bold ${theme.iconColor} w-4 text-right`}>{i + 1}</span>
                  <span className={`text-xs font-bold ${theme.highlight} w-36 truncate`}>{mod.name}</span>
                  <div className="flex-1 h-6 rounded-lg bg-slate-100 overflow-hidden relative">
                    <div className={`h-full rounded-lg ${colors[i]} transition-all`} style={{ width: `${pct}%` }} />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-600">
                      {mod.actions.toLocaleString()} actions/mo
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top & Worst Employees */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Top 5 */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3 flex items-center gap-2`}>
              <TrendingUp size={14} className="text-emerald-500" /> Top 5 Employees by Usage
            </h3>
            <div className="space-y-2">
              {s.topEmployees.map((emp, i) => (
                <div key={emp.name} className={`flex items-center gap-3 p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-bold ${theme.highlight} truncate`}>{emp.name}</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>{emp.role}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`text-xs font-bold text-emerald-600`}>{emp.sessions} sessions</p>
                    <p className={`text-[10px] font-bold text-emerald-500`}>{emp.usageMins} mins/day</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>{emp.lastActive}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom 5 */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3 flex items-center gap-2`}>
              <AlertTriangle size={14} className="text-red-500" /> Bottom 5 Employees by Usage
            </h3>
            <div className="space-y-2">
              {s.worstEmployees.map((emp, i) => (
                <div key={emp.name} className={`flex items-center gap-3 p-2.5 rounded-xl ${i < 2 ? 'bg-red-50 border border-red-200' : 'bg-amber-50 border border-amber-200'}`}>
                  <span className={`w-5 h-5 rounded-full ${i < 2 ? 'bg-red-500' : 'bg-amber-500'} text-white flex items-center justify-center text-[10px] font-bold`}>{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-bold ${i < 2 ? 'text-red-800' : 'text-amber-800'} truncate`}>{emp.name}</p>
                    <p className={`text-[10px] ${i < 2 ? 'text-red-500' : 'text-amber-500'}`}>{emp.role}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`text-xs font-bold ${i < 2 ? 'text-red-600' : 'text-amber-600'}`}>{emp.sessions} sessions</p>
                    <p className={`text-[10px] font-bold ${i < 2 ? 'text-red-500' : 'text-amber-500'}`}>{emp.usageMins} mins/day</p>
                    <p className={`text-[10px] ${i < 2 ? 'text-red-400' : 'text-amber-400'}`}>{emp.lastActive}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alarms / Abnormal Scenarios */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3 flex items-center gap-2`}>
            <AlertTriangle size={14} className="text-red-500" /> Alarms &amp; Abnormal Scenarios
            {s.alarms.length > 0 && (
              <span className="ml-auto px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold">{s.alarms.length} active</span>
            )}
          </h3>
          <div className="space-y-2">
            {s.alarms.map((alarm, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border ${
                alarm.severity === 'red'
                  ? 'bg-red-50 border-red-200'
                  : 'bg-amber-50 border-amber-200'
              }`}>
                <AlertTriangle size={14} className={`mt-0.5 shrink-0 ${alarm.severity === 'red' ? 'text-red-500' : 'text-amber-500'}`} />
                <p className={`text-xs font-medium ${alarm.severity === 'red' ? 'text-red-800' : 'text-amber-800'}`}>{alarm.message}</p>
                <span className={`ml-auto text-[10px] font-bold shrink-0 px-2 py-0.5 rounded-full ${
                  alarm.severity === 'red' ? 'bg-red-200 text-red-700' : 'bg-amber-200 text-amber-700'
                }`}>{alarm.severity === 'red' ? 'Critical' : 'Warning'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Level 1: School List (default) ──
  return (
    <div className="space-y-4">
      <div>
        <h2 className={`text-lg font-bold ${theme.highlight}`}>Platform Analytics</h2>
        <p className={`text-xs ${theme.iconColor}`}>Per-school analytics &middot; Click a school for detailed breakdown</p>
      </div>

      {/* Platform KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Building2} label="Active Schools" value="5" color="bg-blue-500" theme={theme} />
        <StatCard icon={TrendingUp} label="Avg Health Score" value="78%" color="bg-emerald-500" theme={theme} />
        <StatCard icon={Users} label="Total Active Users" value="5,960" color="bg-purple-500" theme={theme} />
        <StatCard icon={AlertTriangle} label="Critical Alerts" value={analyticsSchools.reduce((sum, sc) => sum + sc.alarms.filter(a => a.severity === 'red').length, 0).toString()} color="bg-red-500" theme={theme} />
      </div>

      {/* DAU / MAU + Per-Module Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* DAU / MAU */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Platform Engagement</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
              <p className={`text-lg font-bold ${theme.highlight}`}>3,420</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Daily Active Users (DAU)</p>
              <p className="text-[10px] font-bold text-emerald-600 mt-0.5">+8.2% vs last week</p>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
              <p className={`text-lg font-bold ${theme.highlight}`}>5,960</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Monthly Active Users (MAU)</p>
              <p className="text-[10px] font-bold text-emerald-600 mt-0.5">+5.4% vs last month</p>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
              <p className={`text-lg font-bold ${theme.primaryText}`}>57.4%</p>
              <p className={`text-[10px] ${theme.iconColor}`}>DAU/MAU Ratio</p>
              <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>Good stickiness</p>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
              <p className={`text-lg font-bold ${theme.highlight}`}>12.4 min</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Avg Session Duration</p>
              <p className="text-[10px] font-bold text-emerald-600 mt-0.5">+1.2 min vs last month</p>
            </div>
          </div>
        </div>

        {/* Per-Module Usage */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Per-Module Usage (Platform-wide)</h3>
          <div className="space-y-2.5">
            {[
              { module: 'Attendance', actions: 165900, pct: 100 },
              { module: 'Fees & Payments', actions: 161700, pct: 97 },
              { module: 'Communication', actions: 117800, pct: 71 },
              { module: 'Timetable', actions: 80200, pct: 48 },
              { module: 'Homework', actions: 63700, pct: 38 },
              { module: 'Examination', actions: 35800, pct: 22 },
              { module: 'Transport', actions: 28500, pct: 17 },
              { module: 'Library', actions: 18200, pct: 11 },
            ].map(m => (
              <div key={m.module} className="flex items-center gap-3">
                <span className={`text-[10px] font-bold ${theme.highlight} w-24 truncate`}>{m.module}</span>
                <div className="flex-1 h-5 rounded-lg bg-slate-100 overflow-hidden relative">
                  <div className="h-full rounded-lg bg-blue-500/80 transition-all" style={{ width: `${m.pct}%` }} />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-bold text-slate-600">
                    {m.actions.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Most Active vs Least Active Schools */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3 flex items-center gap-2`}>
            <TrendingUp size={14} className="text-emerald-500" /> Most Active Schools
          </h3>
          <div className="space-y-2">
            {analyticsSchools
              .filter(s => s.healthScore >= 80)
              .sort((a, b) => b.healthScore - a.healthScore)
              .slice(0, 3)
              .map((s, i) => (
                <div key={s.id} className={`flex items-center gap-3 p-3 rounded-xl ${theme.secondaryBg}`}>
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">{i + 1}</span>
                  <div className="flex-1">
                    <p className={`text-xs font-bold ${theme.highlight}`}>{s.name}</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>{s.activeUsers.toLocaleString()} active users</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-600">{s.healthScore}%</span>
                </div>
              ))}
          </div>
        </div>
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3 flex items-center gap-2`}>
            <AlertTriangle size={14} className="text-red-500" /> Least Active Schools
          </h3>
          <div className="space-y-2">
            {analyticsSchools
              .filter(s => s.healthScore < 80)
              .sort((a, b) => a.healthScore - b.healthScore)
              .slice(0, 3)
              .map((s, i) => (
                <div key={s.id} className={`flex items-center gap-3 p-3 rounded-xl ${s.healthScore < 60 ? 'bg-red-50 border border-red-200' : 'bg-amber-50 border border-amber-200'}`}>
                  <span className={`w-5 h-5 rounded-full ${s.healthScore < 60 ? 'bg-red-500' : 'bg-amber-500'} text-white flex items-center justify-center text-[10px] font-bold`}>{i + 1}</span>
                  <div className="flex-1">
                    <p className={`text-xs font-bold ${s.healthScore < 60 ? 'text-red-800' : 'text-amber-800'}`}>{s.name}</p>
                    <p className={`text-[10px] ${s.healthScore < 60 ? 'text-red-500' : 'text-amber-500'}`}>{s.activeUsers.toLocaleString()} active users</p>
                  </div>
                  <span className={`text-xs font-bold ${s.healthScore < 60 ? 'text-red-600' : 'text-amber-600'}`}>{s.healthScore}%</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* School List */}
      <div className="space-y-3">
        {analyticsSchools.map(s => {
          const healthColor = s.healthScore >= 80 ? 'text-emerald-600' : s.healthScore >= 60 ? 'text-amber-600' : 'text-red-600';
          const healthBg = s.healthScore >= 80 ? 'bg-emerald-500' : s.healthScore >= 60 ? 'bg-amber-500' : 'bg-red-500';
          const healthRingBg = s.healthScore >= 80 ? 'bg-emerald-100' : s.healthScore >= 60 ? 'bg-amber-100' : 'bg-red-100';
          const sparkColor = s.healthScore >= 80 ? '#10b981' : s.healthScore >= 60 ? '#f59e0b' : '#ef4444';
          const alertCount = s.alarms.filter(a => a.severity === 'red').length;
          return (
            <button
              key={s.id}
              onClick={() => setSelectedSchoolId(s.id)}
              className={`w-full text-left ${theme.cardBg} rounded-2xl border ${theme.border} p-4 ${theme.buttonHover} transition-all group`}
            >
              <div className="flex items-center gap-4">
                {/* Health Score Ring */}
                <div className={`w-12 h-12 rounded-full ${healthRingBg} flex items-center justify-center shrink-0 relative`}>
                  <span className={`text-sm font-bold ${healthColor}`}>{s.healthScore}</span>
                  <div className={`absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full ${healthBg} border-2 border-white`} />
                </div>

                {/* School Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className={`text-sm font-bold ${theme.highlight} truncate`}>{s.name}</h3>
                    <span className={`text-[10px] font-bold shrink-0 px-2 py-0.5 rounded-full ${
                      s.plan === 'Enterprise' ? 'bg-amber-100 text-amber-700' :
                      s.plan === 'Pro' ? 'bg-purple-100 text-purple-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>{s.plan}</span>
                    {alertCount > 0 && (
                      <span className="flex items-center gap-0.5 shrink-0 px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 text-[10px] font-bold">
                        <AlertTriangle size={10} /> {alertCount}
                      </span>
                    )}
                  </div>
                  <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>
                    {s.city} &middot; {s.activeUsers.toLocaleString()} active users &middot; Last active: {s.lastActive}
                  </p>
                </div>

                {/* Sparkline */}
                <MiniSparkline data={s.sparkline} color={sparkColor} theme={theme} />

                {/* Arrow */}
                <ChevronRight size={16} className={`${theme.iconColor} group-hover:${theme.primaryText} shrink-0 transition-colors`} />
              </div>

              {/* Quick Stats Bar */}
              <div className="flex items-center gap-4 mt-3 ml-16">
                <div className="flex items-center gap-1">
                  <Database size={10} className={theme.iconColor} />
                  <span className={`text-[10px] ${theme.iconColor}`}>{s.dataBucket.used}/{s.dataBucket.total} GB</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe size={10} className={theme.iconColor} />
                  <span className={`text-[10px] ${theme.iconColor}`}>{s.bandwidth.used}/{s.bandwidth.total} GB BW</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bell size={10} className={theme.iconColor} />
                  <span className={`text-[10px] ${theme.iconColor}`}>{(s.notifications.sms + s.notifications.email + s.notifications.push).toLocaleString()} notif</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap size={10} className={theme.iconColor} />
                  <span className={`text-[10px] ${theme.iconColor}`}>{(s.apiCalls / 1000).toFixed(0)}K API</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
