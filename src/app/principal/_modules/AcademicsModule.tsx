'use client';

import { useState } from 'react';
import { StatCard, TabBar, StatusBadge, DataTable, MobileFrame, MobilePreviewToggle } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import { Award, TrendingUp, Star, BarChart3, FileText, GraduationCap, Info, ClipboardList, BookOpen, UserPlus, Sparkles, Heart, ToggleRight, CheckCircle, AlertTriangle, CalendarCheck, Smartphone, Send } from 'lucide-react';

export default function AcademicsModule({ theme }: { theme: Theme }) {
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
      <TabBar tabs={['Overview', 'Class Performance', 'Exam Results', 'Programs']} active={tab} onChange={setTab} theme={theme} />

      {/* ─── MOBILE APP PREVIEW ─── */}
      <MobilePreviewToggle theme={theme} mobileContent={
        <MobileFrame title="Academics" theme={theme}>
          <div className="bg-white rounded-xl border border-gray-200 p-2.5">
            <span className="text-[10px] font-bold text-gray-800 mb-2 block">Mark Entry Compliance</span>
            {[{ subject: "Mathematics", teacher: "Mr. Verma", pct: "100%", color: "bg-emerald-500" },{ subject: "Science", teacher: "Mrs. Priya", pct: "65%", color: "bg-amber-500" },{ subject: "English", teacher: "Ms. Joshi", pct: "40%", color: "bg-red-500" },{ subject: "Hindi", teacher: "Mr. Sharma", pct: "100%", color: "bg-emerald-500" },{ subject: "Social Studies", teacher: "Mrs. Reddy", pct: "0%", color: "bg-gray-400" }].map((m, i) => (<div key={i} className="flex items-center gap-2 py-2 border-t border-gray-100"><div className={`w-2 h-2 rounded-full ${m.color}`} /><div className="flex-1 min-w-0"><p className="text-[10px] font-bold text-gray-800 truncate">{m.subject}</p><p className="text-[8px] text-gray-500">{m.teacher}</p></div><span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${m.pct === "100%" ? "bg-emerald-100 text-emerald-700" : m.pct === "0%" ? "bg-gray-100 text-gray-600" : "bg-amber-100 text-amber-700"}`}>{m.pct}</span></div>))}
            <button className="w-full mt-2 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-[9px] font-bold">Send Reminder to Pending</button>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-2.5">
            <div className="flex items-center justify-between mb-2"><span className="text-[10px] font-bold text-gray-800">Grace Marks Requests</span><span className="bg-amber-100 text-amber-700 text-[8px] font-bold px-1.5 py-0.5 rounded-full">3 pending</span></div>
            {[{ student: "Rahul Joshi", subject: "Maths", current: 32, requested: 35, reason: "Medical" },{ student: "Priya Desai", subject: "Science", current: 28, requested: 33, reason: "Bereavement" },{ student: "Amit Singh", subject: "Hindi", current: 30, requested: 35, reason: "Sports clash" }].map((g, i) => (<div key={i} className="py-2 border-t border-gray-100"><div className="flex items-center justify-between mb-1"><p className="text-[10px] font-bold text-gray-800">{g.student}</p><span className="text-[8px] text-gray-500">{g.subject}</span></div><div className="flex items-center gap-2 mb-1.5"><span className="text-[9px] text-red-600 font-bold">{g.current}/100</span><span className="text-[8px] text-gray-400">{"→"}</span><span className="text-[9px] text-emerald-600 font-bold">{g.requested}/100</span><span className="text-[8px] px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">{g.reason}</span></div><div className="flex gap-1.5"><button className="flex-1 py-1.5 rounded-lg bg-emerald-500 text-white text-[9px] font-bold">Approve</button><button className="flex-1 py-1.5 rounded-lg bg-red-100 text-red-600 text-[9px] font-bold">Reject</button></div></div>))}
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-2.5">
            <span className="text-[10px] font-bold text-gray-800 mb-2 block">Supplementary Exams</span>
            {[{ student: "Rahul Joshi", subject: "Maths", date: "Mar 15", status: "Scheduled" },{ student: "Kiran Verma", subject: "Science", date: "Mar 15", status: "Scheduled" },{ student: "Sahil Gupta", subject: "Hindi", date: "Mar 18", status: "Scheduled" }].map((r, i) => (<div key={i} className="flex items-center gap-2 py-1.5 border-t border-gray-100"><div className="flex-1 min-w-0"><p className="text-[10px] font-bold text-gray-800 truncate">{r.student} — {r.subject}</p><p className="text-[8px] text-gray-500">{r.date}</p></div><span className="text-[8px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold">{r.status}</span></div>))}
            <button className="w-full mt-2 py-1.5 rounded-lg bg-purple-50 text-purple-600 text-[9px] font-bold">+ Schedule New Re-exam</button>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-2.5">
            <span className="text-[10px] font-bold text-gray-800 mb-2 block">Subject Performance</span>
            {[{ subject: "Maths", avg: 89, color: "bg-blue-500" },{ subject: "Science", avg: 85, color: "bg-emerald-500" },{ subject: "English", avg: 91, color: "bg-purple-500" },{ subject: "Hindi", avg: 88, color: "bg-teal-500" }].map((s, i) => (<div key={i} className="flex items-center gap-2 py-1"><span className="text-[9px] text-gray-700 w-14">{s.subject}</span><div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden"><div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.avg}%` }} /></div><span className="text-[9px] font-bold text-gray-800 w-8 text-right">{s.avg}%</span></div>))}
          </div>
        </MobileFrame>
      } />


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

          {/* Academic Progress Ring Chart (moved from DashboardHome — Gap 6) */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center gap-2 mb-1">
              <GraduationCap size={16} className={theme.iconColor} />
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Academic Progress — School-wide</h3>
            </div>
            <p className={`text-[10px] ${theme.iconColor} mb-3 ml-6`}>Overall pass rate and distinction rate across all classes and exams</p>
            <div className="flex items-center justify-center gap-8">
              {/* Pass Rate Ring */}
              <div className="text-center">
                <svg viewBox="0 0 36 36" className="w-24 h-24">
                  <circle r="16" cx="18" cy="18" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                  <circle r="16" cx="18" cy="18" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray={`${0.89 * 100.53} ${100.53 - 0.89 * 100.53}`} strokeDashoffset="25.13" transform="rotate(-90 18 18)" strokeLinecap="round" />
                  <text x="18" y="17" textAnchor="middle" dominantBaseline="middle" className="fill-emerald-600" style={{ fontSize: '8px', fontWeight: 700 }}>89%</text>
                  <text x="18" y="23" textAnchor="middle" dominantBaseline="middle" className="fill-gray-400" style={{ fontSize: '4px' }}>Pass Rate</text>
                </svg>
              </div>
              {/* Distinction Rate Ring */}
              <div className="text-center">
                <svg viewBox="0 0 36 36" className="w-24 h-24">
                  <circle r="16" cx="18" cy="18" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                  <circle r="16" cx="18" cy="18" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray={`${0.24 * 100.53} ${100.53 - 0.24 * 100.53}`} strokeDashoffset="25.13" transform="rotate(-90 18 18)" strokeLinecap="round" />
                  <text x="18" y="17" textAnchor="middle" dominantBaseline="middle" className="fill-blue-600" style={{ fontSize: '8px', fontWeight: 700 }}>24%</text>
                  <text x="18" y="23" textAnchor="middle" dominantBaseline="middle" className="fill-gray-400" style={{ fontSize: '4px' }}>Distinction</text>
                </svg>
              </div>
            </div>
            {/* Legend */}
            <div className="flex items-center gap-4 mt-3 justify-center">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /><span className={`text-[10px] ${theme.iconColor}`}>Pass Rate: 89%</span></span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500 inline-block" /><span className={`text-[10px] ${theme.iconColor}`}>Distinction: 24%</span></span>
            </div>
          </div>

          {/* Class-wise Grade Distribution Bell Curve (moved from DashboardHome — Gap 2) */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 size={16} className={theme.iconColor} />
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Class-wise Grade Distribution</h3>
            </div>
            <p className={`text-[10px] ${theme.iconColor} mb-3 ml-6`}>Bell curve showing how marks are distributed across grades — helps identify if grading is too lenient or strict</p>
            <svg viewBox="0 0 300 150" className="w-full" style={{ maxHeight: '180px' }}>
              {/* X-axis labels */}
              <text x="27" y="145" textAnchor="middle" className="fill-gray-500" style={{ fontSize: '9px', fontWeight: 600 }}>F</text>
              <text x="72" y="145" textAnchor="middle" className="fill-gray-500" style={{ fontSize: '9px', fontWeight: 600 }}>D</text>
              <text x="120" y="145" textAnchor="middle" className="fill-gray-500" style={{ fontSize: '9px', fontWeight: 600 }}>C</text>
              <text x="168" y="145" textAnchor="middle" className="fill-gray-500" style={{ fontSize: '9px', fontWeight: 600 }}>B</text>
              <text x="216" y="145" textAnchor="middle" className="fill-gray-500" style={{ fontSize: '9px', fontWeight: 600 }}>A</text>
              <text x="262" y="145" textAnchor="middle" className="fill-gray-500" style={{ fontSize: '9px', fontWeight: 600 }}>A+</text>
              {/* X-axis line */}
              <line x1="20" y1="135" x2="280" y2="135" stroke="#d1d5db" strokeWidth="0.5" />
              {/* Y-axis label */}
              <text x="8" y="75" textAnchor="middle" className="fill-gray-400" style={{ fontSize: '7px' }} transform="rotate(-90 8 75)">Students</text>
              {/* Class 10 — Blue bell curve */}
              <path d="M 20,135 C 60,135 80,120 120,60 C 140,20 160,20 180,60 C 220,120 240,135 280,135" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.8" />
              <path d="M 20,135 C 60,135 80,120 120,60 C 140,20 160,20 180,60 C 220,120 240,135 280,135 Z" fill="#3b82f6" opacity="0.1" />
              {/* Class 11 — Green bell curve (shifted right) */}
              <path d="M 40,135 C 70,135 100,115 140,55 C 160,15 175,15 195,55 C 235,115 255,135 280,135" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.8" />
              <path d="M 40,135 C 70,135 100,115 140,55 C 160,15 175,15 195,55 C 235,115 255,135 280,135 Z" fill="#10b981" opacity="0.08" />
              {/* Class 12 — Purple bell curve (shifted left) */}
              <path d="M 20,135 C 45,135 65,118 100,65 C 120,25 135,25 155,65 C 190,118 210,135 260,135" fill="none" stroke="#8b5cf6" strokeWidth="2" opacity="0.8" />
              <path d="M 20,135 C 45,135 65,118 100,65 C 120,25 135,25 155,65 C 190,118 210,135 260,135 Z" fill="#8b5cf6" opacity="0.08" />
            </svg>
            {/* Legend */}
            <div className="flex items-center gap-4 mt-2 justify-center">
              <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-blue-500 inline-block rounded" /><span className={`text-[10px] ${theme.iconColor}`}>Class 10</span></span>
              <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-emerald-500 inline-block rounded" /><span className={`text-[10px] ${theme.iconColor}`}>Class 11</span></span>
              <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-purple-500 inline-block rounded" /><span className={`text-[10px] ${theme.iconColor}`}>Class 12</span></span>
            </div>
            {/* Info tip */}
            <div className="flex items-start gap-1.5 mt-2 px-2">
              <Info size={11} className={`${theme.iconColor} shrink-0 mt-0.5`} />
              <p className={`text-[10px] ${theme.iconColor}`}>Tip: A healthy distribution shows a bell shape. Skewed right = too easy, skewed left = too hard</p>
            </div>
          </div>

          {/* Mark Entry Progress Tracker (moved from DashboardHome — Gap 4) */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center gap-2 mb-1">
              <FileText size={16} className={theme.iconColor} />
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Mark Entry Progress</h3>
            </div>
            <p className={`text-[10px] ${theme.iconColor} mb-3 ml-6`}>How many teachers have submitted marks for each exam — tracks completion across all subjects</p>
            <div className="space-y-3">
              {[
                { exam: 'Unit Test 1', pct: 92, submitted: 46, total: 50, color: 'bg-emerald-500', textColor: 'text-emerald-600' },
                { exam: 'Mid-Term', pct: 67, submitted: 34, total: 50, color: 'bg-amber-500', textColor: 'text-amber-600' },
                { exam: 'Unit Test 2', pct: 34, submitted: 17, total: 50, color: 'bg-red-500', textColor: 'text-red-600' },
              ].map((m, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-bold ${theme.highlight}`}>{m.exam}</span>
                    <span className={`text-[10px] font-bold ${m.textColor}`}>{m.pct}%</span>
                  </div>
                  <div className={`w-full h-2.5 rounded-full ${theme.secondaryBg}`}>
                    <div className={`h-2.5 rounded-full ${m.color} transition-all`} style={{ width: `${m.pct}%` }} />
                  </div>
                  <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>{m.submitted}/{m.total} teachers submitted</p>
                </div>
              ))}
            </div>
          </div>

          {/* Planned #81 — Lesson Plan Submission Status */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center gap-2 mb-1">
              <ClipboardList size={16} className={theme.iconColor} />
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Lesson Plan Submission Status</h3>
            </div>
            <p className={`text-[10px] ${theme.iconColor} mb-3 ml-6`}>Department-wise lesson plan submission tracking for the current term</p>
            <div className="mb-3 px-3 py-2 rounded-xl bg-amber-50 border border-amber-200">
              <p className="text-xs font-bold text-amber-800">Overall: 78% submitted — Deadline: Mar 5, 2026</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className={`border-b ${theme.border}`}>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Department</th>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Submitted</th>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Pending</th>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Overdue</th>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { dept: 'Science', submitted: 12, total: 14, overdue: 1 },
                    { dept: 'Mathematics', submitted: 8, total: 10, overdue: 0 },
                    { dept: 'English', submitted: 10, total: 12, overdue: 1 },
                    { dept: 'Hindi', submitted: 5, total: 8, overdue: 2 },
                    { dept: 'Social Science', submitted: 7, total: 9, overdue: 1 },
                  ].map((d, i) => {
                    const pct = Math.round((d.submitted / d.total) * 100);
                    return (
                      <tr key={i} className={`border-b ${theme.border} ${theme.buttonHover}`}>
                        <td className={`py-2 px-2 font-bold ${theme.highlight}`}>{d.dept}</td>
                        <td className={`py-2 px-2 ${theme.iconColor}`}>{d.submitted}/{d.total}</td>
                        <td className={`py-2 px-2 ${theme.iconColor}`}>{d.total - d.submitted}</td>
                        <td className={`py-2 px-2 font-bold ${d.overdue > 0 ? 'text-red-600' : 'text-emerald-600'}`}>{d.overdue}</td>
                        <td className="py-2 px-2">
                          <div className="flex items-center gap-2">
                            <div className={`flex-1 h-2 rounded-full ${theme.secondaryBg}`}>
                              <div className={`h-2 rounded-full ${pct >= 80 ? 'bg-emerald-500' : pct >= 60 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${pct}%` }} />
                            </div>
                            <span className={`text-[10px] font-bold ${pct >= 80 ? 'text-emerald-600' : pct >= 60 ? 'text-amber-600' : 'text-red-600'}`}>{pct}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Gap #130 — Remedial / Extra Classes */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center gap-2 mb-1">
              <BookOpen size={16} className="text-amber-500" />
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Remedial / Extra Classes</h3>
            </div>
            <p className={`text-[10px] ${theme.iconColor} mb-3 ml-6`}>After-school remedial and enrichment classes for students needing additional support</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className={`border-b ${theme.border}`}>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Subject</th>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Teacher</th>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Students</th>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Schedule</th>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { subject: 'Math Remedial', teacher: 'Mr. Sharma', students: 8, schedule: 'Tue/Thu 3-4 PM', status: 'Active' },
                    { subject: 'English Writing', teacher: 'Ms. D\'Souza', students: 6, schedule: 'Mon/Wed 3-4 PM', status: 'Active' },
                    { subject: 'Science Lab Extra', teacher: 'Mrs. Iyer', students: 10, schedule: 'Fri 2-4 PM', status: 'Active' },
                    { subject: 'Hindi Grammar', teacher: 'Mrs. Mishra', students: 5, schedule: 'Wed 3-4 PM', status: 'Paused' },
                    { subject: 'Board Prep — Math', teacher: 'Mr. Patel', students: 15, schedule: 'Sat 9-12 PM', status: 'Active' },
                  ].map((c, i) => (
                    <tr key={i} className={`border-b ${theme.border} ${theme.buttonHover}`}>
                      <td className={`py-2 px-2 font-bold ${theme.highlight}`}>{c.subject}</td>
                      <td className={`py-2 px-2 ${theme.iconColor}`}>{c.teacher}</td>
                      <td className={`py-2 px-2 ${theme.iconColor}`}>{c.students}</td>
                      <td className={`py-2 px-2 ${theme.iconColor}`}>{c.schedule}</td>
                      <td className="py-2 px-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          c.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'
                        }`}>{c.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Gap #137 — Guest & Visiting Teachers */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center gap-2 mb-1">
              <UserPlus size={16} className="text-indigo-500" />
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Guest & Visiting Teachers</h3>
            </div>
            <p className={`text-[10px] ${theme.iconColor} mb-3 ml-6`}>External guest faculty and visiting educators for special sessions</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className={`border-b ${theme.border}`}>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Name</th>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Subject/Topic</th>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Date</th>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Duration</th>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Honorarium</th>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Dr. Rajesh Patel', topic: 'Space Science & ISRO Missions', date: 'Jan 15, 2026', duration: '2 hours', honorarium: '\u20B95,000', feedback: '4.8/5' },
                    { name: 'Ms. Priya Roy', topic: 'Kathak Dance Workshop', date: 'Feb 5, 2026', duration: '3 hours', honorarium: '\u20B93,000', feedback: '4.6/5' },
                    { name: 'Mr. James Adams', topic: 'English Literature — Shakespeare', date: 'Feb 20, 2026', duration: '1.5 hours', honorarium: '\u20B94,000', feedback: '4.9/5' },
                  ].map((g, i) => (
                    <tr key={i} className={`border-b ${theme.border} ${theme.buttonHover}`}>
                      <td className={`py-2 px-2 font-bold ${theme.highlight}`}>{g.name}</td>
                      <td className={`py-2 px-2 ${theme.iconColor}`}>{g.topic}</td>
                      <td className={`py-2 px-2 ${theme.iconColor}`}>{g.date}</td>
                      <td className={`py-2 px-2 ${theme.iconColor}`}>{g.duration}</td>
                      <td className={`py-2 px-2 ${theme.iconColor}`}>{g.honorarium}</td>
                      <td className="py-2 px-2">
                        <span className="text-xs font-bold text-amber-600">{g.feedback}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

      {tab === 'Programs' && (
        <div className="space-y-4">
          {/* Gap #140 — Gifted Student Identification */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={16} className="text-amber-500" />
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Gifted Student Identification</h3>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <StatCard icon={Star} label="Identified" value="28" color="bg-amber-500" theme={theme} />
              <StatCard icon={GraduationCap} label="In Enrichment" value="22" color="bg-blue-500" theme={theme} />
              <StatCard icon={Award} label="Achievements" value="15" color="bg-emerald-500" theme={theme} />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className={`border-b ${theme.border}`}>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Student</th>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Class</th>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Area</th>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Program</th>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Aarav Mehta', cls: '8A', area: 'Academic — Mathematics', program: 'Math Olympiad Prep', status: 'Active' },
                    { name: 'Diya Reddy', cls: '6B', area: 'Arts — Classical Music', program: 'State Youth Festival', status: 'Active' },
                    { name: 'Vivaan Sharma', cls: '10A', area: 'Academic — Science', program: 'NTSE Coaching', status: 'Active' },
                    { name: 'Sneha Kulkarni', cls: '7A', area: 'Sports — Athletics', program: 'District Level Training', status: 'Selected' },
                    { name: 'Rohan Patel', cls: '9B', area: 'Academic — Coding', program: 'ICPC Junior Prep', status: 'Active' },
                    { name: 'Ananya Iyer', cls: '5A', area: 'Arts — Painting', program: 'National Art Competition', status: 'Nominated' },
                  ].map((s, i) => (
                    <tr key={i} className={`border-b ${theme.border} ${theme.buttonHover}`}>
                      <td className={`py-2 px-2 font-bold ${theme.highlight}`}>{s.name}</td>
                      <td className={`py-2 px-2 ${theme.iconColor}`}>{s.cls}</td>
                      <td className={`py-2 px-2 ${theme.iconColor}`}>{s.area}</td>
                      <td className={`py-2 px-2 ${theme.iconColor}`}>{s.program}</td>
                      <td className="py-2 px-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          s.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                          s.status === 'Selected' ? 'bg-blue-100 text-blue-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>{s.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Gap #141 — CWSN / Inclusive Education */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center gap-2 mb-3">
              <Heart size={16} className="text-rose-500" />
              <h3 className={`text-sm font-bold ${theme.highlight}`}>CWSN / Inclusive Education</h3>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <StatCard icon={Heart} label="CWSN Students" value="12" color="bg-rose-500" theme={theme} />
              <StatCard icon={FileText} label="With IEP" value="10" color="bg-blue-500" theme={theme} />
              <StatCard icon={GraduationCap} label="Resource Teachers" value="3" color="bg-violet-500" theme={theme} />
            </div>
            {/* Accessibility Toggle */}
            <div className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg} mb-4`}>
              <div className="flex items-center gap-2">
                <ToggleRight size={16} className="text-emerald-500" />
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>Accessibility Features</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Enabled for portal and mobile app</p>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">Enabled</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className={`border-b ${theme.border}`}>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Student</th>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Class</th>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Category</th>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>IEP Status</th>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Support Level</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Arjun Kumar', cls: '5A', category: 'Learning Disability', iep: 'Active', support: 'High' },
                    { name: 'Priya Nair', cls: '3B', category: 'Hearing Impairment', iep: 'Active', support: 'Medium' },
                    { name: 'Rahul Joshi', cls: '7A', category: 'Autism Spectrum', iep: 'Active', support: 'High' },
                    { name: 'Meena Singh', cls: '4C', category: 'Visual Impairment', iep: 'Active', support: 'High' },
                    { name: 'Sahil Gupta', cls: '6B', category: 'ADHD', iep: 'Under Review', support: 'Medium' },
                    { name: 'Kavya Reddy', cls: '8A', category: 'Dyslexia', iep: 'Active', support: 'Medium' },
                  ].map((s, i) => (
                    <tr key={i} className={`border-b ${theme.border} ${theme.buttonHover}`}>
                      <td className={`py-2 px-2 font-bold ${theme.highlight}`}>{s.name}</td>
                      <td className={`py-2 px-2 ${theme.iconColor}`}>{s.cls}</td>
                      <td className={`py-2 px-2 ${theme.iconColor}`}>{s.category}</td>
                      <td className="py-2 px-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          s.iep === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>{s.iep}</span>
                      </td>
                      <td className="py-2 px-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          s.support === 'High' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                        }`}>{s.support}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Mark Entry Compliance Report ── */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 size={16} className={theme.primaryText} />
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Mark Entry Compliance</h3>
              <span title="Track teacher-wise mark entry completion across all exams"><Info size={14} className={`${theme.iconColor} cursor-help`} /></span>
              <span title="Available on mobile"><Smartphone size={14} className={theme.iconColor} /></span>
            </div>
            {/* Per-exam progress */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { exam: 'Term 1', pct: 100, icon: '\u2705' },
                { exam: 'Term 2', pct: 78, icon: '\u23F3' },
                { exam: 'Annual', pct: 0, icon: '\u25CB' },
              ].map((e, i) => (
                <div key={i} className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
                  <p className={`text-xs font-bold ${theme.highlight}`}>{e.exam}</p>
                  <p className={`text-lg font-bold ${e.pct === 100 ? 'text-emerald-600' : e.pct > 0 ? 'text-amber-600' : theme.iconColor}`}>{e.pct}% {e.icon}</p>
                </div>
              ))}
            </div>
            {/* Per-teacher drill-down */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className={`border-b ${theme.border}`}>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Teacher</th>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Subjects</th>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Classes</th>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Entry Status</th>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { teacher: 'Mr. Sharma', subjects: 'Math', classes: '8A, 9A, 10A', status: 'Complete', updated: 'Feb 28' },
                    { teacher: 'Mrs. Iyer', subjects: 'Science', classes: '10A, 10B', status: 'Complete', updated: 'Feb 27' },
                    { teacher: 'Ms. D\'Souza', subjects: 'English', classes: '9A, 9B', status: 'Complete', updated: 'Feb 28' },
                    { teacher: 'Mrs. Mishra', subjects: 'Hindi', classes: '6A, 7A, 8A', status: 'Complete', updated: 'Feb 26' },
                    { teacher: 'Mr. Patil', subjects: 'Physical Ed.', classes: '6-10', status: 'In Progress', updated: 'Mar 1' },
                    { teacher: 'Mrs. Kulkarni', subjects: 'Art', classes: '6-10', status: 'Not Started', updated: '--' },
                  ].map((t, i) => (
                    <tr key={i} className={`border-b ${theme.border} ${theme.buttonHover}`}>
                      <td className={`py-2 px-2 font-bold ${theme.highlight}`}>{t.teacher}</td>
                      <td className={`py-2 px-2 ${theme.iconColor}`}>{t.subjects}</td>
                      <td className={`py-2 px-2 ${theme.iconColor}`}>{t.classes}</td>
                      <td className="py-2 px-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          t.status === 'Complete' ? 'bg-emerald-100 text-emerald-700' :
                          t.status === 'In Progress' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>{t.status}</span>
                      </td>
                      <td className={`py-2 px-2 ${theme.iconColor}`}>{t.updated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button onClick={() => window.alert('Reminders sent to incomplete teachers. (Blueprint demo)')} className={`mt-3 px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold flex items-center gap-1`}>
              <Send size={12} /> Send Reminder
            </button>
          </div>

          {/* ── Grace Marks Management ── */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={16} className="text-amber-500" />
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Grace Marks Management</h3>
              <span title="Review and approve grace marks requests from teachers"><Info size={14} className={`${theme.iconColor} cursor-help`} /></span>
            </div>
            <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-2`}>Pending Grace Marks Requests</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className={`border-b ${theme.border}`}>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Student</th>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Subject</th>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Current</th>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Grace</th>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>New Total</th>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Requested By</th>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Status</th>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { student: 'Rahul Joshi', subject: 'Mathematics', current: 32, grace: 3, newTotal: 35, requestedBy: 'Mr. Sharma', status: 'Pending' },
                    { student: 'Sneha Kulkarni', subject: 'Hindi', current: 28, grace: 5, newTotal: 33, requestedBy: 'Mrs. Mishra', status: 'Pending' },
                    { student: 'Arjun Kumar', subject: 'Science', current: 30, grace: 4, newTotal: 34, requestedBy: 'Mrs. Iyer', status: 'Pending' },
                  ].map((g, i) => (
                    <tr key={i} className={`border-b ${theme.border} ${theme.buttonHover}`}>
                      <td className={`py-2 px-2 font-bold ${theme.highlight}`}>{g.student}</td>
                      <td className={`py-2 px-2 ${theme.iconColor}`}>{g.subject}</td>
                      <td className={`py-2 px-2 font-bold text-red-600`}>{g.current}</td>
                      <td className={`py-2 px-2 font-bold text-amber-600`}>+{g.grace}</td>
                      <td className={`py-2 px-2 font-bold text-emerald-600`}>{g.newTotal}</td>
                      <td className={`py-2 px-2 ${theme.iconColor}`}>{g.requestedBy}</td>
                      <td className="py-2 px-2">
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-700">Pending Approval</span>
                      </td>
                      <td className="py-2 px-2">
                        <div className="flex gap-1">
                          <button onClick={() => window.alert('Grace marks approved for ' + g.student + '. (Blueprint demo)')} className="px-2 py-1 rounded-lg bg-emerald-100 text-emerald-700 text-[10px] font-bold">Approve</button>
                          <button onClick={() => window.alert('Grace marks rejected for ' + g.student + '. (Blueprint demo)')} className="px-2 py-1 rounded-lg bg-red-100 text-red-600 text-[10px] font-bold">Reject</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={`mt-3 p-3 rounded-xl ${theme.secondaryBg} flex items-start gap-2`}>
              <Info size={12} className={`${theme.iconColor} shrink-0 mt-0.5`} />
              <p className={`text-[10px] ${theme.iconColor}`}>Policy: Max grace marks: 5 per subject (as per school policy)</p>
            </div>
          </div>

          {/* ── Re-exam / Supplementary Tracking ── */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center gap-2 mb-3">
              <CalendarCheck size={16} className="text-blue-500" />
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Supplementary Exam Schedule</h3>
              <span title="Track students who need re-examination and their supplementary results"><Info size={14} className={`${theme.iconColor} cursor-help`} /></span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className={`border-b ${theme.border}`}>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Student</th>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Subject</th>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Failed Marks</th>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Re-exam Date</th>
                    <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { student: 'Rahul Joshi', subject: 'Mathematics', marks: 28, date: 'Mar 15, 2026', status: 'Scheduled' },
                    { student: 'Kiran Verma', subject: 'Science', marks: 30, date: 'Mar 15, 2026', status: 'Scheduled' },
                    { student: 'Sahil Gupta', subject: 'Hindi', marks: 25, date: 'Mar 18, 2026', status: 'Scheduled' },
                    { student: 'Meena Singh', subject: 'Mathematics', marks: 32, date: 'Feb 20, 2026', status: 'Passed' },
                  ].map((r, i) => (
                    <tr key={i} className={`border-b ${theme.border} ${theme.buttonHover}`}>
                      <td className={`py-2 px-2 font-bold ${theme.highlight}`}>{r.student}</td>
                      <td className={`py-2 px-2 ${theme.iconColor}`}>{r.subject}</td>
                      <td className="py-2 px-2 font-bold text-red-600">{r.marks}/100</td>
                      <td className={`py-2 px-2 ${theme.iconColor}`}>{r.date}</td>
                      <td className="py-2 px-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          r.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
                          r.status === 'Passed' ? 'bg-emerald-100 text-emerald-700' :
                          r.status === 'Failed' ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>{r.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button onClick={() => window.alert('Schedule re-exam dialog... (Blueprint demo)')} className={`mt-3 px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold flex items-center gap-1`}>
              <CalendarCheck size={12} /> Schedule Re-exam
            </button>
          </div>

          {/* Cross-module connectivity banner */}
          <div className={`px-4 py-2.5 rounded-xl border ${theme.border} ${theme.secondaryBg} flex items-center gap-2`}>
            <Info size={14} className={theme.primaryText} />
            <p className={`text-[10px] font-bold ${theme.iconColor}`}>{'\u2192'} Mark entry data from Teacher Gradebook. Grace marks require Principal approval.</p>
          </div>
        </div>
      )}


    </div>
  );
}