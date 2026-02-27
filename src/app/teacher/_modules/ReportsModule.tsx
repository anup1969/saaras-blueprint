'use client';

import React, { useState } from 'react';
import { StatCard, TabBar, DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  ClipboardCheck, Award, Download, Users, CheckCircle, XCircle,
  AlertTriangle, Star, TrendingUp, BarChart3
} from 'lucide-react';

// ─── MOCK DATA ──────────────────────────────────────

const classReports = [
  { class: '10-A', subject: 'Mathematics', students: 42, avgScore: 72.5, topStudent: 'Isha Reddy', topScore: 92, passPercent: 95.2, trend: 'up' },
  { class: '10-B', subject: 'Mathematics', students: 40, avgScore: 68.3, topStudent: 'Kavya Menon', topScore: 88, passPercent: 90.0, trend: 'up' },
  { class: '9-A', subject: 'Science', students: 38, avgScore: 74.1, topStudent: 'Aditi Das', topScore: 95, passPercent: 97.4, trend: 'up' },
  { class: '9-B', subject: 'Science', students: 36, avgScore: 65.7, topStudent: 'Raj Malhotra', topScore: 82, passPercent: 86.1, trend: 'down' },
  { class: '8-A', subject: 'Mathematics', students: 35, avgScore: 78.9, topStudent: 'Anika Sinha', topScore: 96, passPercent: 100, trend: 'up' },
  { class: '6-A', subject: 'Mathematics', students: 34, avgScore: 71.2, topStudent: 'Vivaan Choudhary', topScore: 89, passPercent: 94.1, trend: 'down' },
];

export default function ReportsModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Class Performance');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Reports & Analytics</h1>
        <button className={`px-4 py-2.5 rounded-xl border ${theme.border} ${theme.cardBg} text-sm font-bold ${theme.iconColor} flex items-center gap-1`}><Download size={14} /> Export All</button>
      </div>
      <TabBar tabs={['Class Performance', 'Subject Toppers', 'Attendance Summary', 'Progress Tracker']} active={tab} onChange={setTab} theme={theme} />

      {tab === 'Class Performance' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard icon={TrendingUp} label="Overall Average" value="71.8%" color="bg-blue-500" sub="across all classes" theme={theme} />
            <StatCard icon={Star} label="Best Performing" value="6-A" color="bg-emerald-500" sub="78.9% avg" theme={theme} />
            <StatCard icon={AlertTriangle} label="Needs Attention" value="8-B" color="bg-red-500" sub="65.7% avg" theme={theme} />
          </div>
          <DataTable
            headers={['Class', 'Students', 'Avg Score', 'Topper', 'Top Score', 'Pass %', 'Trend']}
            rows={classReports.map(r => [
              <span key="c" className={`font-bold ${theme.highlight}`}>{r.class}</span>,
              <span key="s" className={theme.iconColor}>{r.students}</span>,
              <span key="a" className={`font-bold ${r.avgScore >= 75 ? 'text-emerald-600' : r.avgScore >= 60 ? 'text-amber-600' : 'text-red-600'}`}>{r.avgScore}%</span>,
              <span key="t" className={`font-bold ${theme.highlight}`}>{r.topStudent}</span>,
              <span key="ts" className="font-bold text-emerald-600">{r.topScore}</span>,
              <span key="p" className={`font-bold ${r.passPercent >= 95 ? 'text-emerald-600' : 'text-amber-600'}`}>{r.passPercent}%</span>,
              <span key="tr" className={`text-xs font-bold ${r.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                {r.trend === 'up' ? 'Improving' : 'Declining'}
              </span>,
            ])}
            theme={theme}
          />
        </div>
      )}

      {tab === 'Subject Toppers' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classReports.map(r => (
              <div key={r.class} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white">
                    <Award size={18} />
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${theme.highlight}`}>Class {r.class}</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>Mathematics — Half Yearly</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className={`flex items-center justify-between p-2 rounded-xl ${theme.accentBg}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">1st</span>
                      <span className={`text-xs font-bold ${theme.highlight}`}>{r.topStudent}</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-600">{r.topScore}/100</span>
                  </div>
                  <div className={`flex items-center justify-between p-2 rounded-xl ${theme.accentBg}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">2nd</span>
                      <span className={`text-xs font-bold ${theme.highlight}`}>
                        {r.class === '10-A' ? 'Ananya Iyer' : r.class === '10-B' ? 'Shreya Nambiar' : r.class === '8-A' ? 'Prateek Jain' : r.class === '8-B' ? 'Tanuja Hegde' : r.class === '6-A' ? 'Rohan Mehra' : 'Sakshi Tiwari'}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-blue-600">{r.topScore - 7}/100</span>
                  </div>
                  <div className={`flex items-center justify-between p-2 rounded-xl ${theme.accentBg}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">3rd</span>
                      <span className={`text-xs font-bold ${theme.highlight}`}>
                        {r.class === '10-A' ? 'Diya Kulkarni' : r.class === '10-B' ? 'Aryan Khanna' : r.class === '8-A' ? 'Nidhi Rao' : r.class === '8-B' ? 'Aman Dubey' : r.class === '6-A' ? 'Tanya Sethi' : 'Kartik Bhatt'}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-purple-600">{r.topScore - 14}/100</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'Attendance Summary' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={ClipboardCheck} label="Overall Attendance" value="93.6%" color="bg-emerald-500" sub="Feb 2026" theme={theme} />
            <StatCard icon={Users} label="Total Students" value="225" color="bg-blue-500" theme={theme} />
            <StatCard icon={CheckCircle} label="100% Attendance" value="34" color="bg-teal-500" sub="students" theme={theme} />
            <StatCard icon={XCircle} label="Below 75%" value="5" color="bg-red-500" sub="at risk" theme={theme} />
          </div>
          <DataTable
            headers={['Class', 'Students', 'Working Days', 'Avg Present', 'Avg %', 'Below 75%']}
            rows={[
              ['10-A', '42', '20', '39.5', '94.0%', '1'],
              ['10-B', '40', '20', '37.2', '93.0%', '2'],
              ['8-A', '38', '20', '36.1', '95.0%', '0'],
              ['8-B', '36', '20', '33.5', '93.1%', '1'],
              ['6-A', '35', '20', '33.8', '96.6%', '0'],
              ['6-B', '34', '20', '31.9', '93.8%', '1'],
            ].map(row => row.map((cell, j) => (
              <span key={j} className={j === 0 ? `font-bold ${theme.highlight}` : j === 5 && cell !== '0' ? 'font-bold text-red-600' : theme.iconColor}>{cell}</span>
            )))}
            theme={theme}
          />
        </div>
      )}

      {tab === 'Progress Tracker' && (
        <div className="space-y-4">
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Syllabus Completion — Class 10-A</h3>
            <div className="space-y-3">
              {[
                { chapter: 'Ch 1 — Real Numbers', progress: 100 },
                { chapter: 'Ch 2 — Polynomials', progress: 100 },
                { chapter: 'Ch 3 — Pair of Linear Equations', progress: 100 },
                { chapter: 'Ch 4 — Quadratic Equations', progress: 100 },
                { chapter: 'Ch 5 — Arithmetic Progressions', progress: 85 },
                { chapter: 'Ch 6 — Triangles', progress: 70 },
                { chapter: 'Ch 7 — Coordinate Geometry', progress: 60 },
                { chapter: 'Ch 8 — Trigonometry', progress: 30 },
                { chapter: 'Ch 9 — Applications of Trigonometry', progress: 0 },
                { chapter: 'Ch 10 — Circles', progress: 0 },
                { chapter: 'Ch 11 — Constructions', progress: 0 },
                { chapter: 'Ch 12 — Areas Related to Circles', progress: 0 },
                { chapter: 'Ch 13 — Surface Areas & Volumes', progress: 0 },
                { chapter: 'Ch 14 — Statistics', progress: 0 },
                { chapter: 'Ch 15 — Probability', progress: 0 },
              ].map(ch => (
                <div key={ch.chapter} className="flex items-center gap-3">
                  <span className={`text-xs ${theme.iconColor} w-64 shrink-0`}>{ch.chapter}</span>
                  <div className={`flex-1 h-2 rounded-full ${theme.secondaryBg}`}>
                    <div
                      className={`h-2 rounded-full ${ch.progress === 100 ? 'bg-emerald-500' : ch.progress > 0 ? 'bg-blue-500' : theme.secondaryBg}`}
                      style={{ width: `${ch.progress}%` }}
                    />
                  </div>
                  <span className={`text-xs font-bold w-10 text-right ${ch.progress === 100 ? 'text-emerald-600' : ch.progress > 0 ? theme.primaryText : theme.iconColor}`}>
                    {ch.progress}%
                  </span>
                </div>
              ))}
            </div>
            <div className={`mt-3 pt-3 border-t ${theme.border} flex items-center justify-between`}>
              <span className={`text-xs ${theme.iconColor}`}>Overall Syllabus Completion</span>
              <span className={`text-sm font-bold ${theme.primaryText}`}>
                {Math.round([100, 100, 100, 100, 85, 70, 60, 30, 0, 0, 0, 0, 0, 0, 0].reduce((a, b) => a + b, 0) / 15)}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
