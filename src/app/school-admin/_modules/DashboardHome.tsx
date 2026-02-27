'use client';

import React from 'react';
import { type Theme } from '@/lib/themes';
import { StatCard } from '@/components/shared';
import { dashboardStats } from '@/lib/mock-data';
import {
  Users, Briefcase, Banknote, CheckCircle, ClipboardCheck, UserPlus, Shield, Bell,
  Clock, Bus, FileText, ShieldCheck, Radio, CreditCard, Send, BarChart3
} from 'lucide-react';
import TaskTrackerPanel from '@/components/TaskTrackerPanel';
import RecurringTasksCard from '@/components/RecurringTasksCard';

export default function DashboardHome({ theme, stats, onProfileClick }: { theme: Theme; stats: typeof dashboardStats.schoolAdmin; onProfileClick: () => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>School Admin Dashboard</h1>
        <button onClick={onProfileClick} title="My Profile" className={`w-9 h-9 rounded-full ${theme.primary} text-white flex items-center justify-center text-xs font-bold hover:opacity-90 transition-opacity`}>DV</button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Students" value={stats.totalStudents} color="bg-blue-500" theme={theme} />
        <StatCard icon={Briefcase} label="Total Staff" value={stats.totalStaff} color="bg-indigo-500" theme={theme} />
        <StatCard icon={Banknote} label="Fee Collected" value={stats.feeCollected} color="bg-emerald-500" sub={stats.feeCollectedPercent} theme={theme} />
        <StatCard icon={CheckCircle} label="Pending Approvals" value={stats.pendingApprovals} color="bg-amber-500" theme={theme} />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={ClipboardCheck} label="Today Attendance" value={stats.todayAttendance} color="bg-teal-500" theme={theme} />
        <StatCard icon={UserPlus} label="New Enquiries" value={stats.newEnquiries} color="bg-purple-500" sub="this month" theme={theme} />
        <StatCard icon={Shield} label="Active Visitors" value={stats.activeVisitors} color="bg-orange-500" theme={theme} />
        <StatCard icon={Bell} label="Notifications" value="5" color="bg-red-500" sub="unread" theme={theme} />
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

      {/* Quick Actions */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { label: 'Add Student', icon: UserPlus, color: 'bg-blue-500' },
            { label: 'Record Payment', icon: CreditCard, color: 'bg-emerald-500' },
            { label: 'Send Circular', icon: Send, color: 'bg-indigo-500' },
            { label: 'View Reports', icon: BarChart3, color: 'bg-purple-500' },
          ].map(a => (
            <button key={a.label} className={`flex items-center gap-2 p-3 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} transition-all`}>
              <div className={`w-8 h-8 rounded-lg ${a.color} flex items-center justify-center text-white`}><a.icon size={14} /></div>
              <span className={`text-xs font-bold ${theme.highlight}`}>{a.label}</span>
            </button>
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
                { activity: 'Fee Collection Drive — Counter 1 & 2', detail: '47 payments processed · ₹2.1L collected today', icon: Banknote, color: 'bg-emerald-500', pulse: true },
                { activity: 'Unit Test 3 — Mathematics', detail: 'Class 10-A, 10-B · Period 5 (11:30-12:15)', icon: FileText, color: 'bg-blue-500', pulse: true },
                { activity: 'Visitor — Mr. Amit Gupta', detail: 'Reception · Parent meeting with Class Teacher', icon: Users, color: 'bg-purple-500', pulse: false },
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
                { activity: 'Fee Deadline — Class 8', detail: '5:00 PM · 12 students with pending dues', time: '5:00 PM', icon: Banknote },
                { activity: 'Transport Schedule Change', detail: 'Route E & F — modified pickup from tomorrow', time: '4:30 PM', icon: Bus },
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
        <TaskTrackerPanel theme={theme} role="school-admin" />

        {/* Recurring Tasks — Streak Tracking Card */}
        <RecurringTasksCard theme={theme} role="school-admin" />
      </div>
    </div>
  );
}
