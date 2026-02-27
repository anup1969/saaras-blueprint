'use client';

import { useState } from 'react';
import { StatCard, TabBar, StatusBadge, DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import { Award, TrendingUp, Star } from 'lucide-react';

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
