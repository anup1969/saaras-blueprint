'use client';

import React, { useState } from 'react';
import { StatCard, TabBar, DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  Check, Download, Star, CheckCircle, AlertTriangle, TrendingUp
} from 'lucide-react';

// ─── MOCK DATA ──────────────────────────────────────

const teacherProfile = {
  classes: ['10-A', '10-B', '9-A', '9-B', '8-A', '6-A'],
};

const gradebookStudents = [
  { roll: 1, name: 'Aarav Mehta', ut1: 18, ut2: 20, halfYearly: 72, ut3: 19, annual: 0 },
  { roll: 2, name: 'Ananya Iyer', ut1: 20, ut2: 19, halfYearly: 85, ut3: 20, annual: 0 },
  { roll: 3, name: 'Arjun Nair', ut1: 15, ut2: 16, halfYearly: 61, ut3: 14, annual: 0 },
  { roll: 4, name: 'Diya Kulkarni', ut1: 19, ut2: 20, halfYearly: 78, ut3: 18, annual: 0 },
  { roll: 5, name: 'Harsh Patel', ut1: 12, ut2: 14, halfYearly: 55, ut3: 13, annual: 0 },
  { roll: 6, name: 'Isha Reddy', ut1: 20, ut2: 20, halfYearly: 92, ut3: 20, annual: 0 },
  { roll: 7, name: 'Karan Singh', ut1: 16, ut2: 17, halfYearly: 68, ut3: 15, annual: 0 },
  { roll: 8, name: 'Meera Joshi', ut1: 17, ut2: 18, halfYearly: 74, ut3: 18, annual: 0 },
  { roll: 9, name: 'Nikhil Verma', ut1: 10, ut2: 11, halfYearly: 42, ut3: 11, annual: 0 },
  { roll: 10, name: 'Pooja Sharma', ut1: 19, ut2: 19, halfYearly: 80, ut3: 19, annual: 0 },
];

export default function GradebookModule({ theme }: { theme: Theme }) {
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [selectedExam, setSelectedExam] = useState('Half Yearly');
  const [tab, setTab] = useState('Enter Marks');

  const maxMarks: Record<string, number> = { 'UT-1': 20, 'UT-2': 20, 'Half Yearly': 100, 'UT-3': 20, 'Annual': 100 };
  const currentMax = maxMarks[selectedExam] || 100;

  const getMarks = (s: typeof gradebookStudents[0]) => {
    switch (selectedExam) {
      case 'UT-1': return s.ut1;
      case 'UT-2': return s.ut2;
      case 'Half Yearly': return s.halfYearly;
      case 'UT-3': return s.ut3;
      case 'Annual': return s.annual;
      default: return 0;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Gradebook</h1>
        <div className="flex gap-2">
          <button className={`px-4 py-2.5 rounded-xl border ${theme.border} ${theme.cardBg} text-sm font-bold ${theme.iconColor} flex items-center gap-1`}><Download size={14} /> Export</button>
          <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Check size={14} /> Save Marks</button>
        </div>
      </div>
      <TabBar tabs={['Enter Marks', 'Overview', 'Analytics']} active={tab} onChange={setTab} theme={theme} />

      <div className="flex gap-3 flex-wrap">
        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg}`}>
          <span className={`text-xs font-bold ${theme.iconColor}`}>Class:</span>
          <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className={`text-xs font-bold ${theme.highlight} bg-transparent outline-none`}>
            {teacherProfile.classes.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg}`}>
          <span className={`text-xs font-bold ${theme.iconColor}`}>Exam:</span>
          <select value={selectedExam} onChange={e => setSelectedExam(e.target.value)} className={`text-xs font-bold ${theme.highlight} bg-transparent outline-none`}>
            {['UT-1', 'UT-2', 'Half Yearly', 'UT-3', 'Annual'].map(e => <option key={e} value={e}>{e}</option>)}
          </select>
        </div>
        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg}`}>
          <span className={`text-xs font-bold ${theme.iconColor}`}>Max Marks:</span>
          <span className={`text-xs font-bold ${theme.highlight}`}>{currentMax}</span>
        </div>
      </div>

      {tab === 'Enter Marks' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden`}>
          <table className="w-full text-sm">
            <thead className={theme.secondaryBg}>
              <tr>
                <th className={`text-left px-4 py-3 text-xs font-bold ${theme.iconColor} uppercase`}>Roll</th>
                <th className={`text-left px-4 py-3 text-xs font-bold ${theme.iconColor} uppercase`}>Student Name</th>
                <th className={`text-center px-4 py-3 text-xs font-bold ${theme.iconColor} uppercase`}>Marks ({currentMax})</th>
                <th className={`text-center px-4 py-3 text-xs font-bold ${theme.iconColor} uppercase`}>%</th>
                <th className={`text-center px-4 py-3 text-xs font-bold ${theme.iconColor} uppercase`}>Grade</th>
              </tr>
            </thead>
            <tbody>
              {gradebookStudents.map(s => {
                const marks = getMarks(s);
                const pct = currentMax > 0 ? Math.round((marks / currentMax) * 100) : 0;
                const grade = pct >= 90 ? 'A+' : pct >= 80 ? 'A' : pct >= 70 ? 'B+' : pct >= 60 ? 'B' : pct >= 50 ? 'C' : pct >= 33 ? 'D' : 'F';
                return (
                  <tr key={s.roll} className={`border-t ${theme.border}`}>
                    <td className={`px-4 py-2 text-xs ${theme.iconColor}`}>{s.roll}</td>
                    <td className={`px-4 py-2 text-xs font-bold ${theme.highlight}`}>{s.name}</td>
                    <td className="px-4 py-2 text-center">
                      <input
                        type="number"
                        defaultValue={marks}
                        min={0}
                        max={currentMax}
                        className={`w-16 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-sm text-center outline-none focus:ring-2 focus:ring-blue-300`}
                      />
                    </td>
                    <td className={`px-4 py-2 text-center text-xs font-bold ${
                      pct >= 80 ? 'text-emerald-600' : pct >= 50 ? 'text-amber-600' : 'text-red-600'
                    }`}>{pct}%</td>
                    <td className="px-4 py-2 text-center">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        grade === 'A+' || grade === 'A' ? 'bg-emerald-100 text-emerald-700' :
                        grade === 'B+' || grade === 'B' ? 'bg-blue-100 text-blue-700' :
                        grade === 'C' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>{grade}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className={`p-3 flex items-center justify-between border-t ${theme.border} ${theme.secondaryBg}`}>
            <div className="flex gap-4">
              <span className={`text-xs ${theme.iconColor}`}>Class Average: <span className={`font-bold ${theme.highlight}`}>
                {Math.round(gradebookStudents.reduce((a, s) => a + getMarks(s), 0) / gradebookStudents.length)}/{currentMax}
              </span></span>
              <span className={`text-xs ${theme.iconColor}`}>Highest: <span className="font-bold text-emerald-600">
                {Math.max(...gradebookStudents.map(s => getMarks(s)))}/{currentMax}
              </span></span>
              <span className={`text-xs ${theme.iconColor}`}>Lowest: <span className="font-bold text-red-600">
                {Math.min(...gradebookStudents.map(s => getMarks(s)))}/{currentMax}
              </span></span>
            </div>
            <button className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-sm font-bold`}>Save All</button>
          </div>
        </div>
      )}

      {tab === 'Overview' && (
        <DataTable
          headers={['Roll', 'Name', 'UT-1 (20)', 'UT-2 (20)', 'Half Yearly (100)', 'UT-3 (20)', 'Total', '%']}
          rows={gradebookStudents.map(s => {
            const total = s.ut1 + s.ut2 + s.halfYearly + s.ut3;
            const pct = Math.round((total / 160) * 100);
            return [
              <span key="r" className={theme.iconColor}>{s.roll}</span>,
              <span key="n" className={`font-bold ${theme.highlight}`}>{s.name}</span>,
              <span key="u1" className={theme.iconColor}>{s.ut1}</span>,
              <span key="u2" className={theme.iconColor}>{s.ut2}</span>,
              <span key="hy" className={`font-bold ${theme.highlight}`}>{s.halfYearly}</span>,
              <span key="u3" className={theme.iconColor}>{s.ut3}</span>,
              <span key="t" className={`font-bold ${theme.highlight}`}>{total}/160</span>,
              <span key="p" className={`font-bold ${pct >= 80 ? 'text-emerald-600' : pct >= 50 ? 'text-amber-600' : 'text-red-600'}`}>{pct}%</span>,
            ];
          })}
          theme={theme}
        />
      )}

      {tab === 'Analytics' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={TrendingUp} label="Class Average" value="69.4%" color="bg-blue-500" theme={theme} />
            <StatCard icon={Star} label="Class Topper" value="Isha Reddy" color="bg-amber-500" sub="92/100" theme={theme} />
            <StatCard icon={CheckCircle} label="Pass Rate" value="90%" color="bg-emerald-500" sub="9/10 passed" theme={theme} />
            <StatCard icon={AlertTriangle} label="Below 40%" value="1" color="bg-red-500" sub="needs attention" theme={theme} />
          </div>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Grade Distribution — {selectedExam}</h3>
            <div className="flex items-end gap-2 h-32">
              {[
                { grade: 'A+ (90+)', count: 2, color: 'bg-emerald-500' },
                { grade: 'A (80-89)', count: 2, color: 'bg-emerald-400' },
                { grade: 'B+ (70-79)', count: 2, color: 'bg-blue-500' },
                { grade: 'B (60-69)', count: 2, color: 'bg-blue-400' },
                { grade: 'C (50-59)', count: 1, color: 'bg-amber-500' },
                { grade: 'D (33-49)', count: 1, color: 'bg-red-400' },
                { grade: 'F (<33)', count: 0, color: 'bg-red-600' },
              ].map(g => (
                <div key={g.grade} className="flex-1 flex flex-col items-center gap-1">
                  <span className={`text-[10px] font-bold ${theme.highlight}`}>{g.count}</span>
                  <div className={`w-full ${g.color} rounded-t-lg transition-all`} style={{ height: `${Math.max(g.count * 25, 4)}px` }} />
                  <span className={`text-[9px] ${theme.iconColor} text-center leading-tight`}>{g.grade}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
