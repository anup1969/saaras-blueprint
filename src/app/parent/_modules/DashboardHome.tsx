'use client';

import React from 'react';
import { type Theme } from '@/lib/themes';
import { StatCard, StatusBadge, MobileFrame, MobilePreviewToggle } from '@/components/shared';
import {
  Calendar, Bus, Download, BookOpen, ArrowRight,
  MessageSquare, IndianRupee, CreditCard,
  ClipboardCheck, BookMarked, Camera, FileText, Info,
  Mail, AlertTriangle, Bell, User,
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




      {/* ── Mobile App Preview ── */}
      <MobilePreviewToggle theme={theme} mobileContent={
        <div className="flex flex-wrap gap-6 justify-center">
          {/* Screen 1: Dashboard */}
          <MobileFrame title="Dashboard" theme={theme}>
            <div className="flex items-center gap-2 p-2.5 bg-white rounded-xl shadow-sm">
              <div className={`w-10 h-10 rounded-full ${theme.primary} text-white flex items-center justify-center text-sm font-bold`}>
                {child.photo}
              </div>
              <div className="flex-1"><p className="text-xs font-bold text-gray-800">{child.name}</p><p className="text-[10px] text-gray-500">Class {child.class}-{child.section} | Roll #{child.roll}</p></div>
              <span className="text-[9px] px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded-full font-bold">Present</span>
            </div>
            {fees.currentDue > 0 && (<div className="bg-red-50 border border-red-200 rounded-xl p-2.5"><div className="flex items-center gap-2"><span className="text-red-500 text-sm">&#9888;</span><div className="flex-1"><p className="text-[10px] font-bold text-red-800">Fee Overdue</p><p className="text-[9px] text-red-600">{'\u20B9'}{fees.currentDue.toLocaleString('en-IN')} due</p></div><button className="px-3 py-2 bg-red-600 text-white text-[10px] font-bold rounded-lg">Pay Now</button></div></div>)}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-100"><div className="flex items-center gap-1.5 mb-1"><span className="w-5 h-5 rounded bg-emerald-500 text-white flex items-center justify-center text-[9px]">&#10003;</span><span className="text-[9px] text-gray-500">Attendance</span></div><p className="text-sm font-bold text-gray-800">{att.percentage}%</p><p className="text-[8px] text-emerald-600">Present today</p></div>
              <div className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-100"><div className="flex items-center gap-1.5 mb-1"><span className="w-5 h-5 rounded bg-amber-500 text-white flex items-center justify-center text-[9px]">&#128221;</span><span className="text-[9px] text-gray-500">Homework</span></div><p className="text-sm font-bold text-gray-800">{pendingHW}</p><p className="text-[8px] text-amber-600">{pendingHW > 0 ? 'Pending' : 'All done'}</p></div>
              <div className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-100"><div className="flex items-center gap-1.5 mb-1"><span className="w-5 h-5 rounded bg-blue-500 text-white flex items-center justify-center text-[9px]">{'\u20B9'}</span><span className="text-[9px] text-gray-500">Fee Dues</span></div><p className="text-sm font-bold text-gray-800">{fees.currentDue > 0 ? `\u20B9${(fees.currentDue/1000).toFixed(1)}K` : 'Nil'}</p><p className={`text-[8px] ${fees.currentDue > 0 ? 'text-red-600' : 'text-emerald-600'}`}>{fees.currentDue > 0 ? `Due: ${fees.nextDueDate}` : 'All clear'}</p></div>
              <div className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-100"><div className="flex items-center gap-1.5 mb-1"><span className="w-5 h-5 rounded bg-purple-500 text-white flex items-center justify-center text-[9px]">&#9993;</span><span className="text-[9px] text-gray-500">Messages</span></div><p className="text-sm font-bold text-gray-800">{unreadMsg}</p><p className="text-[8px] text-blue-600">{unreadMsg > 0 ? 'Unread' : 'All read'}</p></div>
            </div>
            <div className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-100"><p className="text-[10px] font-bold text-gray-800 mb-2">Upcoming Events</p>{[{ event: 'PTM', date: child.id==='child1' ? '20 Feb' : '22 Feb', type: 'Meeting' },{ event: 'Annual Day', date: '25 Feb', type: 'Event' },{ event: child.id==='child1' ? 'Pre-Board' : 'Unit Test 3', date: child.id==='child1' ? '05 Mar' : '10 Mar', type: 'Exam' },].map((e,i)=>(<div key={i} className="flex items-center gap-2 py-1.5 border-b border-gray-50 last:border-0"><div className={`w-7 h-7 rounded-lg flex items-center justify-center text-white text-[8px] font-bold ${e.type === 'Exam' ? 'bg-red-500' : e.type === 'Meeting' ? 'bg-purple-500' : 'bg-emerald-500'}`}>{e.date.split(' ')[0]}</div><div className="flex-1"><p className="text-[10px] font-bold text-gray-800">{e.event}</p><p className="text-[8px] text-gray-500">{e.date} 2026</p></div><span className={`text-[8px] px-1.5 py-0.5 rounded-full font-bold ${e.type === 'Exam' ? 'bg-red-100 text-red-600' : e.type === 'Meeting' ? 'bg-purple-100 text-purple-600' : 'bg-emerald-100 text-emerald-600'}`}>{e.type}</span></div>))}</div>
            <div className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-100"><p className="text-[10px] font-bold text-gray-800 mb-2">Quick Actions</p><div className="grid grid-cols-4 gap-1.5">{[{ label: 'Pay Fees', icon: '\u20B9', color: 'bg-emerald-500' },{ label: 'Track Bus', icon: '\uD83D\uDE8C', color: 'bg-amber-500' },{ label: 'Results', icon: '\uD83D\uDCCA', color: 'bg-blue-500' },{ label: 'Leave', icon: '\uD83D\uDCC4', color: 'bg-purple-500' },].map((qa,i)=>(<button key={i} className="flex flex-col items-center gap-1 py-2"><span className={`w-8 h-8 rounded-xl ${qa.color} text-white flex items-center justify-center text-sm`}>{qa.icon}</span><span className="text-[8px] text-gray-600 font-medium">{qa.label}</span></button>))}</div></div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-2.5 flex items-center gap-2"><span className="text-blue-500 text-sm">&#128276;</span><div className="flex-1"><p className="text-[10px] font-bold text-blue-800">Push Notifications Active</p><p className="text-[8px] text-blue-600">Instant alerts for attendance, fees &amp; homework</p></div></div>
          </MobileFrame>
          {/* Screen 2: Attendance */}
          <MobileFrame title="Attendance" theme={theme}>
            <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 text-center"><p className="text-2xl font-bold text-emerald-600">{att.percentage}%</p><p className="text-[10px] text-gray-500 mt-0.5">Overall Attendance</p><div className="flex justify-center gap-4 mt-2"><div className="text-center"><p className="text-sm font-bold text-emerald-600">{att.totalPresent}</p><p className="text-[8px] text-gray-500">Present</p></div><div className="text-center"><p className="text-sm font-bold text-red-500">{att.totalAbsent}</p><p className="text-[8px] text-gray-500">Absent</p></div><div className="text-center"><p className="text-sm font-bold text-amber-500">{att.totalLate}</p><p className="text-[8px] text-gray-500">Late</p></div></div></div>
            <div className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-100"><div className="flex justify-between mb-1"><span className="text-[9px] text-gray-500">Your child</span><span className="text-[9px] font-bold text-emerald-600">{att.percentage}%</span></div><div className="h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-2 bg-emerald-500 rounded-full" style={{ width: `${att.percentage}%` }} /></div><div className="flex justify-between mt-1.5"><span className="text-[9px] text-gray-500">Class average</span><span className="text-[9px] font-bold text-blue-600">{att.classAverage}%</span></div><div className="h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-2 bg-blue-500 rounded-full" style={{ width: `${att.classAverage}%` }} /></div></div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center"><p className="text-[10px] font-bold text-emerald-800">Today&apos;s Status</p><p className="text-lg font-bold text-emerald-600 mt-0.5">&#10003; Present</p><p className="text-[9px] text-emerald-600">Marked at 7:45 AM</p></div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-2.5 flex items-center gap-2"><span className="text-blue-500 text-sm">&#128276;</span><p className="text-[9px] text-blue-700 flex-1">Get notified when attendance is marked</p></div>
          </MobileFrame>
        </div>
      } />
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

      {/* ── Alert on Profile Updates (Gap #79) ── */}
      <div className={`${theme.cardBg} rounded-2xl border-2 border-blue-200 p-4`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <Bell size={14} className="text-blue-600" />
          </div>
          <div className="flex-1">
            <p className={`text-sm font-bold ${theme.highlight}`}>Profile Updated</p>
            <p className={`text-xs ${theme.iconColor}`}>School has updated {child.name}&apos;s medical records on Feb 25, 2026. Please review.</p>
          </div>
          <button className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-all shrink-0">Review Changes</button>
        </div>
      </div>

      {/* ── At-Risk Student Alert (Gap #79) ── */}
      {child.id === 'child1' && (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-50 border-2 border-amber-200">
          <AlertTriangle size={18} className="text-amber-600 shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-bold text-amber-800">Attendance Alert</p>
            <p className="text-xs text-amber-600">{child.name}&apos;s attendance has dropped to 72% this month. Minimum required: 75%</p>
          </div>
          <button className="px-3 py-1.5 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-700 transition-all shrink-0">View Attendance Details</button>
        </div>
      )}

      {/* ── Consent & Permissions (Gap #150) ── */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className={`text-sm font-bold ${theme.highlight}`}>Consent &amp; Permissions</h3>
          <ClipboardCheck size={14} className={theme.iconColor} />
        </div>
        <p className={`text-[10px] ${theme.iconColor} mb-3`}>Your consent responses are recorded and shared with the school</p>
        <div className="space-y-3">
          {/* Pending consent 1 */}
          <div className={`p-3 rounded-xl ${theme.secondaryBg} border-l-2 border-amber-500`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Science Museum Field Trip &mdash; March 8, 2026</p>
                <p className={`text-[10px] ${theme.iconColor} mt-1`}>Class {child.class} students will visit the Science Museum. Bus transport included. Return by 4 PM.</p>
              </div>
              <div className="flex gap-2 shrink-0 ml-4">
                <button className="px-3 py-1.5 bg-emerald-500 text-white rounded-lg text-xs font-bold">Accept</button>
                <button className="px-3 py-1.5 bg-red-100 text-red-600 rounded-lg text-xs font-bold">Decline</button>
              </div>
            </div>
          </div>
          {/* Pending consent 2 */}
          <div className={`p-3 rounded-xl ${theme.secondaryBg} border-l-2 border-amber-500`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Annual Day Photography Consent</p>
                <p className={`text-[10px] ${theme.iconColor} mt-1`}>School photographer will capture photos/videos of Annual Day for official use.</p>
              </div>
              <div className="flex gap-2 shrink-0 ml-4">
                <button className="px-3 py-1.5 bg-emerald-500 text-white rounded-lg text-xs font-bold">Accept</button>
                <button className="px-3 py-1.5 bg-red-100 text-red-600 rounded-lg text-xs font-bold">Decline</button>
              </div>
            </div>
          </div>
          {/* Approved consent */}
          <div className={`p-3 rounded-xl ${theme.secondaryBg} border-l-2 border-emerald-500`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Swimming Classes Permission</p>
                <p className={`text-[10px] ${theme.iconColor} mt-1`}>Weekly swimming sessions at school pool, Wednesdays 2-3 PM.</p>
              </div>
              <span className="px-2 py-1 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-700 shrink-0 ml-4">Approved</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Permission Slip Status (Gap #150) ── */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className={`text-sm font-bold ${theme.highlight}`}>Permission Slip Status</h3>
          <FileText size={14} className={theme.iconColor} />
        </div>
        <div className={`overflow-hidden rounded-xl border ${theme.border}`}>
          <table className="w-full text-xs">
            <thead>
              <tr className={theme.secondaryBg}>
                <th className={`p-2.5 text-left font-bold ${theme.iconColor}`}>Form</th>
                <th className={`p-2.5 text-center font-bold ${theme.iconColor}`}>Submitted</th>
                <th className={`p-2.5 text-center font-bold ${theme.iconColor}`}>Status</th>
                <th className={`p-2.5 text-center font-bold ${theme.iconColor}`}>Expires</th>
                <th className={`p-2.5 text-center font-bold ${theme.iconColor}`}>Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { form: 'Swimming Classes Permission', submitted: '10 Jan 2026', status: 'Approved', expires: '30 Apr 2026' },
                { form: 'Science Museum Field Trip', submitted: '--', status: 'Pending', expires: '08 Mar 2026' },
                { form: 'Annual Day Photography Consent', submitted: '--', status: 'Pending', expires: '25 Feb 2026' },
                { form: 'Inter-school Sports Participation', submitted: '05 Feb 2026', status: 'Approved', expires: '15 Mar 2026' },
              ].map((slip, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className={`p-2.5 font-bold ${theme.highlight}`}>{slip.form}</td>
                  <td className={`p-2.5 text-center ${theme.iconColor}`}>{slip.submitted}</td>
                  <td className="p-2.5 text-center">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${slip.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{slip.status}</span>
                  </td>
                  <td className={`p-2.5 text-center ${theme.iconColor}`}>{slip.expires}</td>
                  <td className="p-2.5 text-center">
                    {slip.status === 'Approved' && <button className={`text-[10px] font-bold ${theme.primaryText} underline`}>Download signed copy</button>}
                    {slip.status === 'Pending' && <span className={`text-[10px] ${theme.iconColor}`}>Awaiting response</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Update Student Photo Request (Gap #77) ── */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-2xl ${theme.secondaryBg} border-2 border-dashed ${theme.border} flex items-center justify-center shrink-0`}>
            <User size={28} className={theme.iconColor} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Camera size={14} className={theme.iconColor} />
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Update Student Photo</h3>
            </div>
            <p className={`text-[10px] ${theme.iconColor} leading-relaxed mb-2`}>
              Submit a new photo for school records. Requires admin approval.
            </p>
            <p className={`text-[10px] ${theme.iconColor}`}>Last updated: Aug 2025</p>
          </div>
          <button
            onClick={() => alert('Photo update request submitted! Admin will review within 3 working days. (Blueprint demo)')}
            className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold shrink-0 flex items-center gap-1.5`}
          >
            <Camera size={12} /> Request Photo Update
          </button>
        </div>
      </div>

      {/* Task Tracker */}
      <TaskTrackerPanel theme={theme} role="parent" />
    </div>
  );
}
