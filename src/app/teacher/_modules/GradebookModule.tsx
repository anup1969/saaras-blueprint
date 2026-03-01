'use client';

import React, { useState } from 'react';
import { StatCard, TabBar, DataTable, MobileFrame, MobilePreviewToggle } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  Check, Download, Star, CheckCircle, AlertTriangle, TrendingUp,
  Info, Upload, History, Lock
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

const skillColumns = ['Critical Thinking', 'Problem Solving', 'Creativity', 'Communication', 'Collaboration'];
const skillGrades: Record<string, Record<string, string>> = {
  'Aarav Mehta':       { 'Critical Thinking': 'A', 'Problem Solving': 'B', 'Creativity': 'A', 'Communication': 'B', 'Collaboration': 'A' },
  'Ananya Iyer':       { 'Critical Thinking': 'A', 'Problem Solving': 'A', 'Creativity': 'B', 'Communication': 'A', 'Collaboration': 'A' },
  'Arjun Nair':        { 'Critical Thinking': 'C', 'Problem Solving': 'C', 'Creativity': 'B', 'Communication': 'C', 'Collaboration': 'B' },
  'Diya Kulkarni':     { 'Critical Thinking': 'A', 'Problem Solving': 'B', 'Creativity': 'A', 'Communication': 'A', 'Collaboration': 'B' },
  'Harsh Patel':       { 'Critical Thinking': 'D', 'Problem Solving': 'C', 'Creativity': 'C', 'Communication': 'D', 'Collaboration': 'C' },
  'Isha Reddy':        { 'Critical Thinking': 'A', 'Problem Solving': 'A', 'Creativity': 'A', 'Communication': 'A', 'Collaboration': 'A' },
  'Karan Singh':       { 'Critical Thinking': 'B', 'Problem Solving': 'B', 'Creativity': 'C', 'Communication': 'B', 'Collaboration': 'B' },
  'Meera Joshi':       { 'Critical Thinking': 'B', 'Problem Solving': 'A', 'Creativity': 'B', 'Communication': 'B', 'Collaboration': 'A' },
  'Nikhil Verma':      { 'Critical Thinking': 'D', 'Problem Solving': 'D', 'Creativity': 'C', 'Communication': 'D', 'Collaboration': 'D' },
  'Pooja Sharma':      { 'Critical Thinking': 'A', 'Problem Solving': 'A', 'Creativity': 'B', 'Communication': 'A', 'Collaboration': 'A' },
};

const activityData = [
  { name: 'Science Project', maxMarks: 20, scores: [18, 20, 14, 19, 12, 20, 16, 17, 9, 19] },
  { name: 'Oral Presentation', maxMarks: 10, scores: [8, 9, 6, 9, 5, 10, 7, 8, 4, 9] },
  { name: 'Lab Work', maxMarks: 15, scores: [13, 14, 10, 13, 8, 15, 12, 13, 7, 14] },
  { name: 'Group Discussion', maxMarks: 10, scores: [9, 8, 7, 9, 6, 10, 8, 9, 5, 8] },
];

const auditLogEntries = [
  { timestamp: '2026-02-28 14:32', teacher: 'Mrs. Sharma', student: 'Aarav Mehta', subject: 'Mathematics', oldMark: 72, newMark: 75, reason: 'Revaluation — Q4 partial marks' },
  { timestamp: '2026-02-27 10:15', teacher: 'Mrs. Sharma', student: 'Harsh Patel', subject: 'Mathematics', oldMark: 52, newMark: 55, reason: 'Grace marks applied' },
  { timestamp: '2026-02-26 16:45', teacher: 'Mr. Verma', student: 'Nikhil Verma', subject: 'Science', oldMark: 38, newMark: 42, reason: 'Recount — answer sheet page missed' },
  { timestamp: '2026-02-25 09:30', teacher: 'Mrs. Sharma', student: 'Diya Kulkarni', subject: 'Mathematics', oldMark: 78, newMark: 80, reason: 'Correction — Q7 diagram marks' },
  { timestamp: '2026-02-24 11:00', teacher: 'Mr. Desai', student: 'Karan Singh', subject: 'English', oldMark: 65, newMark: 68, reason: 'Moderation — class average adjustment' },
];

const importPreviewRows = [
  { student: 'Aarav Mehta', subject: 'Mathematics', marks: 78, status: 'valid' as const },
  { student: 'Ananya Iyer', subject: 'Mathematics', marks: 85, status: 'valid' as const },
  { student: 'Unknown Student', subject: 'Mathematics', marks: 92, status: 'error' as const },
];

export default function GradebookModule({ theme }: { theme: Theme }) {
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [selectedExam, setSelectedExam] = useState('Half Yearly');
  const [tab, setTab] = useState('Enter Marks');
  const [showActivities, setShowActivities] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [showAuditLog, setShowAuditLog] = useState(false);
  const [marksLocked] = useState(true);

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

  const skillGradeBadge = (grade: string) => {
    const colors: Record<string, string> = {
      A: 'bg-emerald-100 text-emerald-700',
      B: 'bg-blue-100 text-blue-700',
      C: 'bg-amber-100 text-amber-700',
      D: 'bg-red-100 text-red-700',
    };
    return colors[grade] || 'bg-slate-100 text-slate-600';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Gradebook</h1>
        <div className="flex gap-2">
          {/* Audit Log Button */}
          <button
            onClick={() => setShowAuditLog(!showAuditLog)}
            className={`px-4 py-2.5 rounded-xl border ${theme.border} ${theme.cardBg} text-sm font-bold ${theme.iconColor} flex items-center gap-1`}
          >
            <History size={14} /> Audit Log
          </button>
          <button className={`px-4 py-2.5 rounded-xl border ${theme.border} ${theme.cardBg} text-sm font-bold ${theme.iconColor} flex items-center gap-1`}><Download size={14} /> Export</button>
          <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Check size={14} /> Save Marks</button>
        </div>
      </div>

      <TabBar tabs={['Enter Marks', 'Skills', 'Overview', 'Analytics']} active={tab} onChange={setTab} theme={theme} />

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
        {/* Import Marks Button */}
        {(tab === 'Enter Marks') && (
          <button
            onClick={() => setShowImport(!showImport)}
            className={`flex items-center gap-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor}`}
          >
            <Upload size={14} /> Import Marks
            <span title="Upload marks from Excel instead of manual entry"><Info size={14} className={`${theme.iconColor} ml-1`} /></span>
          </button>
        )}
      </div>

      {/* ── AUDIT LOG MODAL ── */}
      {showAuditLog && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-3`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Mark Audit Trail</h3>
              <span title="All mark changes are tracked with before/after values"><Info size={14} className={theme.iconColor} /></span>
            </div>
            <button onClick={() => setShowAuditLog(false)} className={`text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-2 py-1 rounded-lg`}>Close</button>
          </div>
          <div className={`${theme.cardBg} rounded-xl border ${theme.border} overflow-hidden`}>
            <table className="w-full text-sm">
              <thead className={theme.secondaryBg}>
                <tr>
                  <th className={`text-left px-3 py-2.5 text-[10px] font-bold ${theme.iconColor} uppercase`}>Timestamp</th>
                  <th className={`text-left px-3 py-2.5 text-[10px] font-bold ${theme.iconColor} uppercase`}>Teacher</th>
                  <th className={`text-left px-3 py-2.5 text-[10px] font-bold ${theme.iconColor} uppercase`}>Student</th>
                  <th className={`text-left px-3 py-2.5 text-[10px] font-bold ${theme.iconColor} uppercase`}>Subject</th>
                  <th className={`text-center px-3 py-2.5 text-[10px] font-bold ${theme.iconColor} uppercase`}>Old Mark</th>
                  <th className={`text-center px-3 py-2.5 text-[10px] font-bold ${theme.iconColor} uppercase`}>New Mark</th>
                  <th className={`text-left px-3 py-2.5 text-[10px] font-bold ${theme.iconColor} uppercase`}>Reason</th>
                </tr>
              </thead>
              <tbody>
                {auditLogEntries.map((entry, i) => (
                  <tr key={i} className={`border-t ${theme.border}`}>
                    <td className={`px-3 py-2 text-[10px] ${theme.iconColor} font-mono`}>{entry.timestamp}</td>
                    <td className={`px-3 py-2 text-xs ${theme.iconColor}`}>{entry.teacher}</td>
                    <td className={`px-3 py-2 text-xs font-bold ${theme.highlight}`}>{entry.student}</td>
                    <td className={`px-3 py-2 text-xs ${theme.iconColor}`}>{entry.subject}</td>
                    <td className="px-3 py-2 text-xs text-center font-bold text-red-600">{entry.oldMark}</td>
                    <td className="px-3 py-2 text-xs text-center font-bold text-emerald-600">{entry.newMark}</td>
                    <td className={`px-3 py-2 text-[10px] ${theme.iconColor}`}>{entry.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── IMPORT MARKS PANEL ── */}
      {showImport && tab === 'Enter Marks' && (
        <div className={`${theme.cardBg} rounded-2xl border-2 border-dashed ${theme.border} p-5 space-y-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Bulk Excel Upload</h3>
              <span title="Upload marks from Excel instead of manual entry"><Info size={14} className={theme.iconColor} /></span>
            </div>
            <button onClick={() => setShowImport(false)} className={`text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-2 py-1 rounded-lg`}>Close</button>
          </div>
          <div className={`flex flex-col items-center justify-center py-8 rounded-xl ${theme.secondaryBg} border ${theme.border}`}>
            <Upload size={28} className={theme.iconColor} />
            <p className={`text-xs font-bold ${theme.highlight} mt-2`}>Drag & drop your Excel file here</p>
            <p className={`text-[10px] ${theme.iconColor} mt-1`}>Supports: .xlsx, .xls, .csv (Max 5MB)</p>
          </div>
          <div className="flex items-center gap-3">
            <button className={`px-3 py-2 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}>
              <Download size={12} /> Download Excel Template
            </button>
            <button className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold flex items-center gap-1`}>
              <Upload size={12} /> Upload &amp; Validate
            </button>
          </div>
          {/* Validation Preview */}
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-2`}>Validation Preview</p>
            <div className={`rounded-xl border ${theme.border} overflow-hidden`}>
              <table className="w-full text-sm">
                <thead className={theme.secondaryBg}>
                  <tr>
                    <th className={`text-left px-3 py-2 text-[10px] font-bold ${theme.iconColor} uppercase`}>Student</th>
                    <th className={`text-left px-3 py-2 text-[10px] font-bold ${theme.iconColor} uppercase`}>Subject</th>
                    <th className={`text-center px-3 py-2 text-[10px] font-bold ${theme.iconColor} uppercase`}>Marks</th>
                    <th className={`text-center px-3 py-2 text-[10px] font-bold ${theme.iconColor} uppercase`}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {importPreviewRows.map((r, i) => (
                    <tr key={i} className={`border-t ${theme.border}`}>
                      <td className={`px-3 py-2 text-xs font-bold ${r.status === 'error' ? 'text-red-600' : theme.highlight}`}>{r.student}</td>
                      <td className={`px-3 py-2 text-xs ${theme.iconColor}`}>{r.subject}</td>
                      <td className={`px-3 py-2 text-xs text-center font-bold ${theme.highlight}`}>{r.marks}</td>
                      <td className="px-3 py-2 text-center">
                        {r.status === 'valid'
                          ? <span className="text-emerald-600 text-xs font-bold">&#10003;</span>
                          : <span className="text-red-600 text-xs font-bold">&#10007; Student not found</span>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: ENTER MARKS ── */}
      {tab === 'Enter Marks' && (
        <div className="space-y-4">
          {/* Mark Lock Banner */}
          {marksLocked && selectedExam === 'Half Yearly' && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200">
              <Lock size={14} className="text-red-500" />
              <p className="text-xs text-red-700 font-medium">
                Marks locked for Term 1 Exam on Feb 28, 2026. Contact admin to unlock.
              </p>
            </div>
          )}

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

          {/* ── ACTIVITY-BASED GRADING (expandable) ── */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden`}>
            <button
              onClick={() => setShowActivities(!showActivities)}
              className={`w-full flex items-center justify-between px-4 py-3 ${theme.secondaryBg}`}
            >
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold ${theme.highlight}`}>Activities</span>
                <span title="Activity marks contribute to internal assessment"><Info size={14} className={theme.iconColor} /></span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-bold">Mobile</span>
              </div>
              <span className={`text-xs ${theme.iconColor}`}>{showActivities ? '▲ Collapse' : '▼ Expand'}</span>
            </button>
            {showActivities && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className={theme.secondaryBg}>
                    <tr>
                      <th className={`text-left px-3 py-2.5 text-[10px] font-bold ${theme.iconColor} uppercase`}>Activity</th>
                      <th className={`text-center px-3 py-2.5 text-[10px] font-bold ${theme.iconColor} uppercase`}>Max</th>
                      {gradebookStudents.map(s => (
                        <th key={s.roll} className={`text-center px-2 py-2.5 text-[10px] font-bold ${theme.iconColor} uppercase whitespace-nowrap`}>{s.name.split(' ')[0]}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {activityData.map((act, ai) => (
                      <tr key={ai} className={`border-t ${theme.border}`}>
                        <td className={`px-3 py-2 text-xs font-bold ${theme.highlight}`}>{act.name}</td>
                        <td className={`px-3 py-2 text-xs text-center ${theme.iconColor}`}>{act.maxMarks}</td>
                        {act.scores.map((score, si) => (
                          <td key={si} className="px-2 py-2 text-center">
                            <input
                              type="number"
                              defaultValue={score}
                              min={0}
                              max={act.maxMarks}
                              className={`w-12 px-1 py-0.5 rounded-lg border ${theme.border} ${theme.inputBg} text-[11px] text-center outline-none focus:ring-2 focus:ring-blue-300`}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className={`px-4 py-2 border-t ${theme.border} ${theme.secondaryBg} flex justify-end`}>
                  <button className={`px-3 py-1.5 ${theme.primary} text-white rounded-xl text-xs font-bold`}>Save Activity Marks</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── TAB: SKILLS ── */}
      {tab === 'Skills' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-50 border border-indigo-200">
            <Info size={14} className="text-indigo-500" />
            <p className="text-xs text-indigo-700 font-medium">Skill grades appear on NEP 2020 report card alongside subject marks</p>
          </div>

          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden`}>
            <div className="flex items-center gap-2 px-4 py-3">
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Skill-Based Mark Entry</h3>
              <span title="Skill grades appear on NEP 2020 report card alongside subject marks"><Info size={14} className={theme.iconColor} /></span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className={theme.secondaryBg}>
                  <tr>
                    <th className={`text-left px-4 py-2.5 text-[10px] font-bold ${theme.iconColor} uppercase`}>Student Name</th>
                    {skillColumns.map(sk => (
                      <th key={sk} className={`text-center px-3 py-2.5 text-[10px] font-bold ${theme.iconColor} uppercase`}>{sk}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {gradebookStudents.map(s => (
                    <tr key={s.roll} className={`border-t ${theme.border}`}>
                      <td className={`px-4 py-2 text-xs font-bold ${theme.highlight}`}>{s.name}</td>
                      {skillColumns.map(sk => {
                        const grade = skillGrades[s.name]?.[sk] || 'B';
                        return (
                          <td key={sk} className="px-3 py-2 text-center">
                            <select
                              defaultValue={grade}
                              className={`px-2 py-1 rounded-lg border ${theme.border} text-xs font-bold text-center outline-none ${skillGradeBadge(grade)}`}
                            >
                              <option value="A">A</option>
                              <option value="B">B</option>
                              <option value="C">C</option>
                              <option value="D">D</option>
                            </select>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={`p-3 flex justify-end border-t ${theme.border} ${theme.secondaryBg}`}>
              <button className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-sm font-bold`}>Save Skill Grades</button>
            </div>
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

      {/* ── MOBILE APP PREVIEW ── */}
      <MobilePreviewToggle
        theme={theme}
        mobileContent={
          <MobileFrame title="Gradebook" theme={theme}>
            {/* Pull to refresh */}
            <div className="flex items-center justify-center py-1">
              <div className="flex items-center gap-1 text-[9px] text-gray-400">
                <span>&#8595;</span> Pull to refresh
              </div>
            </div>

            {/* Class / Exam selector */}
            <div className="flex gap-2">
              <div className="flex-1 bg-white rounded-xl border border-gray-100 px-2 py-1.5">
                <span className="text-[8px] text-gray-400 block">Class</span>
                <select className="text-[10px] font-bold text-gray-800 bg-transparent outline-none w-full">
                  {teacherProfile.classes.map(c => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1 bg-white rounded-xl border border-gray-100 px-2 py-1.5">
                <span className="text-[8px] text-gray-400 block">Exam</span>
                <select className="text-[10px] font-bold text-gray-800 bg-transparent outline-none w-full">
                  {['UT-1', 'UT-2', 'Half Yearly', 'UT-3', 'Annual'].map(e => (
                    <option key={e}>{e}</option>
                  ))}
                </select>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 px-2 py-1.5 flex flex-col items-center justify-center">
                <span className="text-[8px] text-gray-400">Max</span>
                <span className="text-[10px] font-bold text-gray-800">{currentMax}</span>
              </div>
            </div>

            {/* Swipe between subjects hint */}
            <div className="flex items-center justify-center gap-2 py-1">
              <span className="text-[8px] text-gray-400">&#8592; Mathematics &#8594;</span>
              <span className="text-[8px] text-blue-500 font-bold">Swipe for subjects</span>
            </div>

            {/* Quick mark entry grid */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-[28px_1fr_56px_36px] gap-0 bg-gray-100 px-2 py-1.5">
                <span className="text-[8px] font-bold text-gray-500 text-center">#</span>
                <span className="text-[8px] font-bold text-gray-500">STUDENT</span>
                <span className="text-[8px] font-bold text-gray-500 text-center">MARKS</span>
                <span className="text-[8px] font-bold text-gray-500 text-center">%</span>
              </div>
              {/* Student rows with editable cells */}
              {gradebookStudents.slice(0, 8).map(s => {
                const marks = getMarks(s);
                const pct = currentMax > 0 ? Math.round((marks / currentMax) * 100) : 0;
                return (
                  <div key={s.roll} className="grid grid-cols-[28px_1fr_56px_36px] gap-0 px-2 py-1 border-t border-gray-50 items-center">
                    <span className="text-[9px] text-gray-400 text-center">{s.roll}</span>
                    <span className="text-[10px] font-medium text-gray-800 truncate pr-1">{s.name.split(' ')[0]}</span>
                    <input
                      type="number"
                      defaultValue={marks}
                      className="w-12 mx-auto px-1.5 py-1 bg-gray-50 rounded-lg text-[10px] text-center font-bold text-gray-800 border border-gray-200 outline-none"
                    />
                    <span className={`text-[9px] font-bold text-center ${pct >= 80 ? 'text-emerald-600' : pct >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                      {pct}%
                    </span>
                  </div>
                );
              })}
              {gradebookStudents.length > 8 && (
                <div className="px-2 py-1.5 text-center border-t border-gray-100">
                  <span className="text-[9px] text-gray-400">+{gradebookStudents.length - 8} more students</span>
                </div>
              )}
            </div>

            {/* Skill Assessment quick view */}
            <div className="bg-white rounded-xl border border-gray-100 p-2.5">
              <span className="text-[10px] font-bold text-gray-800">Skill Assessment</span>
              <div className="mt-1 space-y-1">
                {gradebookStudents.slice(0, 3).map(s => (
                  <div key={s.roll} className="flex items-center gap-1.5">
                    <span className="text-[9px] text-gray-700 w-16 truncate">{s.name.split(' ')[0]}</span>
                    <div className="flex gap-0.5">
                      {skillColumns.slice(0, 3).map(sk => {
                        const grade = skillGrades[s.name]?.[sk] || 'B';
                        return (
                          <button
                            key={sk}
                            className={`w-5 h-5 rounded text-[8px] font-bold flex items-center justify-center ${
                              grade === 'A' ? 'bg-emerald-100 text-emerald-700' :
                              grade === 'B' ? 'bg-blue-100 text-blue-700' :
                              grade === 'C' ? 'bg-amber-100 text-amber-700' :
                              'bg-red-100 text-red-700'
                            }`}
                          >
                            {grade}
                          </button>
                        );
                      })}
                      <span className="text-[8px] text-gray-400">...</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[8px] text-gray-400 mt-1">Tap grade to cycle A &#8594; B &#8594; C &#8594; D</p>
            </div>

            {/* Bulk save button */}
            <div className="sticky bottom-0 pt-2">
              <button className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-lg">
                Save All Marks
              </button>
            </div>
          </MobileFrame>
        }
      />
    </div>
  );
}
