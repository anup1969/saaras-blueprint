'use client';

import React from 'react';
import { type Theme } from '@/lib/themes';
import { StatCard, StatusBadge } from '@/components/shared';
import {
  Calendar, Bus, Download, BookOpen, ArrowRight,
  MessageSquare, IndianRupee, CreditCard,
  ClipboardCheck, BookMarked, Camera, FileText, Info,
  Mail, AlertTriangle,
} from 'lucide-react';
import TaskTrackerPanel from '@/components/TaskTrackerPanel';
import type { ChildProfile } from '../_components/types';
import { attendanceData, feesData, homeworkData, communicationData } from '../_components/data';

export default function DashboardHome({ theme, child, onProfileClick }: { theme: Theme; child: ChildProfile; onProfileClick: () => void }) {
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

      {/* Gap 20: Action Required — Fee Overdue Banner */}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 border-2 border-red-200">
        <AlertTriangle size={18} className="text-red-600 shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-bold text-red-800">Action Required — Fee Overdue</p>
          <p className="text-xs text-red-600">Term 2 fee of {'\u20B9'}24,500 was due on Feb 15. Late fee of {'\u20B9'}50/day applies. Please pay to avoid report card hold.</p>
        </div>
        <button className="px-3 py-1.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-all shrink-0">Pay Now</button>
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

      {/* Task Tracker */}
      <TaskTrackerPanel theme={theme} role="parent" />
    </div>
  );
}
