'use client';

import React, { useState } from 'react';
import { X, Plus, AlertTriangle, Eye, UserCircle } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, SelectField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

export default function ExamConfigModule({ theme }: { theme: Theme }) {
  const [gradingSystem, setGradingSystem] = useState('cbse');
  const [gradeBoundaries, setGradeBoundaries] = useState([
    { grade: 'A1', min: '91', max: '100', gp: '10' },
    { grade: 'A2', min: '81', max: '90', gp: '9' },
    { grade: 'B1', min: '71', max: '80', gp: '8' },
    { grade: 'B2', min: '61', max: '70', gp: '7' },
    { grade: 'C1', min: '51', max: '60', gp: '6' },
    { grade: 'C2', min: '41', max: '50', gp: '5' },
    { grade: 'D', min: '33', max: '40', gp: '4' },
    { grade: 'E (Fail)', min: '0', max: '32', gp: '0' },
  ]);
  const [reportTemplate, setReportTemplate] = useState('cbse-standard');
  const [examSchedule, setExamSchedule] = useState([
    { exam: 'Unit Test 1', startDate: '15 Jun', endDate: '20 Jun', classes: 'All', status: 'Completed' },
    { exam: 'Unit Test 2', startDate: '25 Aug', endDate: '30 Aug', classes: 'All', status: 'Completed' },
    { exam: 'Half Yearly', startDate: '01 Oct', endDate: '15 Oct', classes: 'All', status: 'Upcoming' },
    { exam: 'Unit Test 3', startDate: '10 Dec', endDate: '15 Dec', classes: 'All', status: 'Scheduled' },
    { exam: 'Annual Exam', startDate: '01 Mar', endDate: '15 Mar', classes: 'All', status: 'Scheduled' },
  ]);
  const [rankDisplay, setRankDisplay] = useState<Record<string, boolean>>({
    'Show class rank': true, 'Show section rank': true, 'Show percentile': false,
    'Show subject-wise rank': false, 'Show grade distribution graph': true,
  });
  const [examTypes, setExamTypes] = useState([
    { name: 'Unit Test 1', weight: '10', schedule: 'Term 1', duration: '1 hr', active: true },
    { name: 'Unit Test 2', weight: '10', schedule: 'Term 1', duration: '1 hr', active: true },
    { name: 'Half Yearly', weight: '30', schedule: 'Term 1', duration: '3 hrs', active: true },
    { name: 'Unit Test 3', weight: '10', schedule: 'Term 2', duration: '1 hr', active: true },
    { name: 'Unit Test 4', weight: '10', schedule: 'Term 2', duration: '1 hr', active: true },
    { name: 'Annual / Final', weight: '30', schedule: 'Both', duration: '3 hrs', active: true },
  ]);
  const [reportFields, setReportFields] = useState<Record<string, boolean>>({
    'Student Photo': true, 'Attendance %': true, 'Teacher Remarks': true, 'Principal Signature': true,
    'Co-Scholastic Grades': true, 'Discipline Grade': true, 'Health & Physical Education': true,
    'House Points': false, 'Class Rank': false, 'Parent Signature Line': false,
  });
  const [reportGradingMode, setReportGradingMode] = useState('Both');
  const [showReportPreview, setShowReportPreview] = useState(false);

  return (
    <div className="space-y-4">
      <ModuleHeader title="Exams & Grading Configuration" subtitle="Grading system, grade boundaries, report cards, and exam schedules" theme={theme} />

      <SectionCard title="Grading System" subtitle="Select the grading methodology" theme={theme}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {[
            { id: 'marks', name: 'Marks Only' },
            { id: 'grades', name: 'Grades Only' },
            { id: 'both', name: 'Marks + Grades' },
            { id: 'cbse', name: 'CBSE CCE Pattern' },
          ].map(g => (
            <button key={g.id} onClick={() => setGradingSystem(g.id)}
              className={`p-2.5 rounded-xl text-xs font-bold transition-all ${gradingSystem === g.id ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.highlight}`}`}>
              {g.name}
            </button>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Grade Boundaries" subtitle="Edit grade name, marks, and grade points — overlapping ranges are highlighted in red" theme={theme}>
        {/* B5: Overlap detection */}
        {(() => {
          const overlaps: number[] = [];
          gradeBoundaries.forEach((g, i) => {
            const gMin = parseInt(g.min); const gMax = parseInt(g.max);
            if (isNaN(gMin) || isNaN(gMax)) return;
            gradeBoundaries.forEach((g2, j) => {
              if (i >= j) return;
              const g2Min = parseInt(g2.min); const g2Max = parseInt(g2.max);
              if (isNaN(g2Min) || isNaN(g2Max)) return;
              if (gMin <= g2Max && g2Min <= gMax) { if (!overlaps.includes(i)) overlaps.push(i); if (!overlaps.includes(j)) overlaps.push(j); }
            });
          });
          return (
            <>
              {overlaps.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-2 flex items-start gap-1.5 mb-3">
                  <AlertTriangle size={12} className="text-red-500 mt-0.5 shrink-0" />
                  <p className="text-[10px] text-red-700 font-bold">Overlapping grade ranges detected! Rows highlighted in red have mark ranges that overlap with other grades.</p>
                </div>
              )}
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead><tr className={theme.secondaryBg}>
                    {['Grade', 'Min Marks', 'Max Marks', 'Grade Points', ''].map(h => (
                      <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor}`}>{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {gradeBoundaries.map((g, i) => {
                      const hasOverlap = overlaps.includes(i);
                      return (
                      <tr key={i} className={`border-t ${hasOverlap ? 'bg-red-50 border-red-200' : theme.border}`}>
                        <td className="px-2 py-1.5">
                          <input value={g.grade} onChange={e => { const n = [...gradeBoundaries]; n[i] = { ...n[i], grade: e.target.value }; setGradeBoundaries(n); }}
                            className={`w-20 px-2 py-1 rounded-lg border ${hasOverlap ? 'border-red-400' : theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                        </td>
                        <td className="px-2 py-1.5">
                          <input value={g.min} onChange={e => { const n = [...gradeBoundaries]; n[i] = { ...n[i], min: e.target.value }; setGradeBoundaries(n); }}
                            className={`w-16 px-2 py-1 rounded-lg border ${hasOverlap ? 'border-red-400' : theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                        </td>
                        <td className="px-2 py-1.5">
                          <input value={g.max} onChange={e => { const n = [...gradeBoundaries]; n[i] = { ...n[i], max: e.target.value }; setGradeBoundaries(n); }}
                            className={`w-16 px-2 py-1 rounded-lg border ${hasOverlap ? 'border-red-400' : theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                        </td>
                        <td className="px-2 py-1.5">
                          <input value={g.gp} onChange={e => { const n = [...gradeBoundaries]; n[i] = { ...n[i], gp: e.target.value }; setGradeBoundaries(n); }}
                            className={`w-16 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                        </td>
                        <td className="px-2 py-1.5"><button onClick={() => setGradeBoundaries(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={12} /></button></td>
                      </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          );
        })()}
        <button onClick={() => setGradeBoundaries(p => [...p, { grade: '', min: '', max: '', gp: '' }])}
          className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl mt-2`}>
          <Plus size={12} /> Add Grade
        </button>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Report Card Template" subtitle="Select template for printing" theme={theme}>
          <div className="space-y-2">
            {['cbse-standard', 'icse-format', 'state-board', 'custom'].map(t => (
              <button key={t} onClick={() => setReportTemplate(t)}
                className={`w-full text-left p-2.5 rounded-xl border transition-all ${reportTemplate === t ? `border-2 ${theme.primary} text-white` : `${theme.secondaryBg} ${theme.border}`}`}>
                <p className={`text-xs font-bold capitalize ${reportTemplate === t ? '' : theme.highlight}`}>{t.replace('-', ' ')}</p>
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Rank Display Options" subtitle="Control what ranking information appears on student report cards" theme={theme}>
          <div className="space-y-2">
            {Object.entries(rankDisplay).map(([opt, enabled]) => (
              <div key={opt} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{opt}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Show class rank': 'Display student\'s rank among all students in their class (e.g., 5th out of 40)',
                      'Show section rank': 'Display student\'s rank within their specific section (e.g., 3rd in Section A)',
                      'Show percentile': 'Show the percentile score indicating performance relative to peers',
                      'Show subject-wise rank': 'Show individual rank for each subject alongside the overall rank',
                      'Show grade distribution graph': 'Include a visual bar chart showing how grades are distributed across the class',
                    } as Record<string, string>)[opt]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setRankDisplay(p => ({ ...p, [opt]: !p[opt] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Exam Schedule" subtitle="Click to edit exam details. Overlapping date ranges are flagged with a warning." theme={theme}>
        {/* B5: Schedule overlap detection */}
        {(() => {
          const scheduleOverlaps: number[] = [];
          examSchedule.forEach((ex, i) => {
            examSchedule.forEach((ex2, j) => {
              if (i >= j) return;
              if (ex.startDate && ex.endDate && ex2.startDate && ex2.endDate && ex.classes === ex2.classes) {
                // Simple string comparison for demo (month-day format)
                if (ex.startDate <= ex2.endDate && ex2.startDate <= ex.endDate) {
                  if (!scheduleOverlaps.includes(i)) scheduleOverlaps.push(i);
                  if (!scheduleOverlaps.includes(j)) scheduleOverlaps.push(j);
                }
              }
            });
          });
          return scheduleOverlaps.length > 0 ? (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-2 flex items-start gap-1.5 mb-3">
              <AlertTriangle size={12} className="text-amber-500 mt-0.5 shrink-0" />
              <p className="text-[10px] text-amber-700 font-bold">Warning: Some exam date ranges overlap for the same class group. Check highlighted rows.</p>
            </div>
          ) : null;
        })()}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Exam', 'Start', 'End', 'Classes', 'Status', ''].map(h => (
                <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {examSchedule.map((ex, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className="px-1 py-1.5">
                    <input value={ex.exam} onChange={e => { const n = [...examSchedule]; n[i] = { ...n[i], exam: e.target.value }; setExamSchedule(n); }}
                      className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-1 py-1.5">
                    <input value={ex.startDate} onChange={e => { const n = [...examSchedule]; n[i] = { ...n[i], startDate: e.target.value }; setExamSchedule(n); }}
                      className={`w-20 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-1 py-1.5">
                    <input value={ex.endDate} onChange={e => { const n = [...examSchedule]; n[i] = { ...n[i], endDate: e.target.value }; setExamSchedule(n); }}
                      className={`w-20 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-1 py-1.5">
                    <input value={ex.classes} onChange={e => { const n = [...examSchedule]; n[i] = { ...n[i], classes: e.target.value }; setExamSchedule(n); }}
                      className={`w-16 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-1 py-1.5">
                    <select value={ex.status} onChange={e => { const n = [...examSchedule]; n[i] = { ...n[i], status: e.target.value }; setExamSchedule(n); }}
                      className={`px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] font-bold ${theme.highlight}`}>
                      <option value="Scheduled">Scheduled</option>
                      <option value="Upcoming">Upcoming</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td className="px-1 py-1.5"><button onClick={() => setExamSchedule(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={12} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={() => setExamSchedule(p => [...p, { exam: '', startDate: '', endDate: '', classes: 'All', status: 'Scheduled' }])}
          className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl mt-2`}>
          <Plus size={12} /> Add Exam
        </button>
      </SectionCard>

      <SectionCard title="Exam Types" subtitle="Define exam types with weightage and scheduling — total weight should sum to 100%" theme={theme}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Type Name', 'Weight (%)', 'Schedule', 'Duration', 'Status', ''].map(h => (
                <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {examTypes.map((et, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className="px-2 py-1.5">
                    <input value={et.name} onChange={e => { const n = [...examTypes]; n[i] = { ...n[i], name: e.target.value }; setExamTypes(n); }}
                      className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <input value={et.weight} onChange={e => { const n = [...examTypes]; n[i] = { ...n[i], weight: e.target.value }; setExamTypes(n); }}
                      className={`w-14 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <select value={et.schedule} onChange={e => { const n = [...examTypes]; n[i] = { ...n[i], schedule: e.target.value }; setExamTypes(n); }}
                      className={`px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] font-bold ${theme.highlight}`}>
                      <option value="Term 1">Term 1</option><option value="Term 2">Term 2</option><option value="Both">Both</option>
                    </select>
                  </td>
                  <td className="px-2 py-1.5">
                    <input value={et.duration} onChange={e => { const n = [...examTypes]; n[i] = { ...n[i], duration: e.target.value }; setExamTypes(n); }}
                      className={`w-16 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <SSAToggle on={et.active} onChange={() => { const n = [...examTypes]; n[i] = { ...n[i], active: !n[i].active }; setExamTypes(n); }} theme={theme} />
                  </td>
                  <td className="px-2 py-1.5"><button onClick={() => setExamTypes(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={12} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* B5: Weightage check */}
        {(() => {
          const total = examTypes.filter(e => e.active).reduce((s, e) => s + (parseInt(e.weight) || 0), 0);
          const isValid = total === 100;
          return (
            <div className="flex items-center justify-between mt-2">
              <button onClick={() => setExamTypes(p => [...p, { name: '', weight: '0', schedule: 'Term 1', duration: '1 hr', active: true }])}
                className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
                <Plus size={12} /> Add Exam Type
              </button>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold ${isValid ? 'text-emerald-600' : 'text-red-600'}`}>
                  Total Weight: {total}%
                  {isValid ? ' \u2713' : ''}
                </span>
                {!isValid && (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-red-50 border border-red-200">
                    <AlertTriangle size={10} className="text-red-500" />
                    <span className="text-[9px] text-red-600 font-bold">{total > 100 ? `Exceeds 100% by ${total - 100}%` : `Missing ${100 - total}% — must total 100%`}</span>
                  </span>
                )}
              </div>
            </div>
          );
        })()}
      </SectionCard>

      <SectionCard title="Report Card Template Fields" subtitle="Toggle which fields appear on the printed report card" theme={theme}>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 mb-3">
          {Object.entries(reportFields).map(([field, enabled]) => (
            <div key={field} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <span className={`text-xs font-medium ${theme.highlight}`}>{field}</span>
              <SSAToggle on={enabled} onChange={() => setReportFields(p => ({ ...p, [field]: !p[field] }))} theme={theme} />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mb-3">
          <div className="flex-1">
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Grading Display on Report</p>
            <SelectField options={['Marks', 'Grades', 'Both']} value={reportGradingMode} onChange={setReportGradingMode} theme={theme} />
          </div>
          <button onClick={() => setShowReportPreview(!showReportPreview)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold ${theme.primary} text-white`}>
            <Eye size={14} /> {showReportPreview ? 'Hide Preview' : 'Preview Template'}
          </button>
        </div>
        {showReportPreview && (
          <div className={`p-4 rounded-xl border-2 ${theme.border} ${theme.secondaryBg}`}>
            <div className="text-center mb-3">
              <p className={`text-sm font-bold ${theme.highlight}`}>Saaras International School</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Progress Report 2025-26</p>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {reportFields['Student Photo'] && <div className={`w-12 h-14 rounded-lg ${theme.cardBg} border ${theme.border} flex items-center justify-center`}><UserCircle size={20} className={theme.iconColor} /></div>}
              <div className="col-span-2 space-y-1">
                <p className={`text-[10px] ${theme.highlight}`}><strong>Name:</strong> Aarav Sharma</p>
                <p className={`text-[10px] ${theme.highlight}`}><strong>Class:</strong> 8-A &nbsp; <strong>Roll:</strong> 12</p>
                {reportFields['Attendance %'] && <p className={`text-[10px] ${theme.highlight}`}><strong>Attendance:</strong> 94%</p>}
              </div>
            </div>
            <div className={`text-[9px] ${theme.iconColor} border-t ${theme.border} pt-2 space-y-1`}>
              <p>Maths: 85 {reportGradingMode !== 'Marks' && '(A2)'} | Science: 78 {reportGradingMode !== 'Marks' && '(B1)'} | English: 92 {reportGradingMode !== 'Marks' && '(A1)'}</p>
              {reportFields['Co-Scholastic Grades'] && <p>Co-Scholastic: Art (A) | Music (B) | Sports (A)</p>}
              {reportFields['Discipline Grade'] && <p>Discipline: A</p>}
              {reportFields['Teacher Remarks'] && <p className="italic">Remarks: Excellent student with consistent performance.</p>}
              {reportFields['Class Rank'] && <p>Class Rank: 5/40</p>}
              {reportFields['Principal Signature'] && <p className="mt-2 text-right">_______________<br/>Principal</p>}
              {reportFields['Parent Signature Line'] && <p className="mt-1 text-left">_______________<br/>Parent Signature</p>}
            </div>
          </div>
        )}
      </SectionCard>
    </div>
  );
}
