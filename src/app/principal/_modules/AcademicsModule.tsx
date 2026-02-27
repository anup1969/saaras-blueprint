'use client';

import { useState } from 'react';
import { StatCard, TabBar, StatusBadge, DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import { Award, TrendingUp, Star, BarChart3, FileText, GraduationCap, Info } from 'lucide-react';

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
