'use client';

import React, { useState } from 'react';
import { X, Plus, AlertTriangle, Eye, UserCircle, Info, Download, Search, Upload, ChevronLeft, ChevronRight, Save, ArrowRight } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, SelectField, InputField } from '../_helpers/components';
import { BulkImportWizard } from '@/components/shared';
import type { Theme } from '../_helpers/types';

const PAGE_SIZE = 5;

// ─── Sub-component: TableToolbar ──────────────────
function TableToolbar({ search, onSearch, count, label, onAdd, onExport, onImport, theme }:
  { search: string; onSearch: (v: string) => void; count: number; label: string;
    onAdd: () => void; onExport: () => void; onImport: () => void; theme: Theme }) {
  return (
    <div className="flex items-center gap-2 mb-3 flex-wrap">
      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${theme.border} ${theme.inputBg} flex-1 min-w-[160px]`}>
        <Search size={13} className={theme.iconColor} />
        <input value={search} onChange={e => onSearch(e.target.value)} placeholder={`Search ${label}...`}
          className={`flex-1 bg-transparent text-xs ${theme.highlight} outline-none placeholder-gray-400`} />
        {search && <button onClick={() => onSearch('')}><X size={12} className="text-gray-400 hover:text-red-400" /></button>}
      </div>
      <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${theme.secondaryBg} ${theme.iconColor} shrink-0`}>{count} records</span>
      <button onClick={onAdd}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-white ${theme.primary} hover:opacity-90 shrink-0`}>
        <Plus size={12} /> Add
      </button>
      <button onClick={onExport}
        className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shrink-0">
        <Download size={12} /> Export
      </button>
      <button onClick={onImport}
        className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shrink-0">
        <Upload size={12} /> Import
      </button>
    </div>
  );
}

// ─── Sub-component: Pagination ────────────────────
function Pagination({ page, total, pageSize, onChange, theme }: { page: number; total: number; pageSize: number; onChange: (p: number) => void; theme: Theme }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-end gap-2 mt-2">
      <button disabled={page === 1} onClick={() => onChange(page - 1)}
        className={`p-1 rounded-lg border ${theme.border} disabled:opacity-30 ${theme.buttonHover}`}>
        <ChevronLeft size={13} className={theme.iconColor} />
      </button>
      <span className={`text-[10px] ${theme.iconColor}`}>Page {page} / {totalPages}</span>
      <button disabled={page === totalPages} onClick={() => onChange(page + 1)}
        className={`p-1 rounded-lg border ${theme.border} disabled:opacity-30 ${theme.buttonHover}`}>
        <ChevronRight size={13} className={theme.iconColor} />
      </button>
    </div>
  );
}

function InfoIcon({ tip }: { tip: string }) {
  return <span title={tip} className="inline-flex ml-1.5 shrink-0 cursor-help"><Info size={13} className="text-blue-400 hover:text-blue-600" /></span>;
}
function MobileBadge() {
  return <span className="ml-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-green-100 text-green-700 whitespace-nowrap">{'\uD83D\uDCF1'} Mobile</span>;
}
function Phase2Badge() {
  return <span className="ml-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-700 whitespace-nowrap">Phase 2</span>;
}

type TabId = 'grading' | 'scheduling' | 'marks' | 'reports' | 'settings';

export default function ExamConfigModule({ theme, activeTab: externalTab, onTabChange }: { theme: Theme; activeTab?: string; onTabChange?: (tab: string) => void }) {
  const [gradingSystem, setGradingSystem] = useState('cbse');
  const [gradeBoundaries, setGradeBoundaries] = useState([
    { grade: 'A1', min: '91', max: '100', gp: '10', enabled: true },
    { grade: 'A2', min: '81', max: '90', gp: '9', enabled: true },
    { grade: 'B1', min: '71', max: '80', gp: '8', enabled: true },
    { grade: 'B2', min: '61', max: '70', gp: '7', enabled: true },
    { grade: 'C1', min: '51', max: '60', gp: '6', enabled: true },
    { grade: 'C2', min: '41', max: '50', gp: '5', enabled: true },
    { grade: 'D', min: '33', max: '40', gp: '4', enabled: true },
    { grade: 'E (Fail)', min: '0', max: '32', gp: '0', enabled: true },
  ]);
  const [reportTemplate, setReportTemplate] = useState<string>('cbse-15');
  const [examSchedule, setExamSchedule] = useState([
    { exam: 'Unit Test 1', startDate: '15 Jun', endDate: '20 Jun', classes: 'All', status: 'Completed', enabled: true },
    { exam: 'Unit Test 2', startDate: '25 Aug', endDate: '30 Aug', classes: 'All', status: 'Completed', enabled: true },
    { exam: 'Half Yearly', startDate: '01 Oct', endDate: '15 Oct', classes: 'All', status: 'Upcoming', enabled: true },
    { exam: 'Unit Test 3', startDate: '10 Dec', endDate: '15 Dec', classes: 'All', status: 'Scheduled', enabled: true },
    { exam: 'Annual Exam', startDate: '01 Mar', endDate: '15 Mar', classes: 'All', status: 'Scheduled', enabled: true },
  ]);
  const [rankDisplay, setRankDisplay] = useState<Record<string, boolean>>({
    'Show class rank': true, 'Show section rank': true, 'Show percentile': false,
    'Show subject-wise rank': false, 'Show grade distribution graph': true,
  });
  const [examTypes, setExamTypes] = useState([
    { name: 'Unit Test 1', weight: '10', schedule: 'Term 1', duration: '1 hr', active: true, enabled: true },
    { name: 'Unit Test 2', weight: '10', schedule: 'Term 1', duration: '1 hr', active: true, enabled: true },
    { name: 'Half Yearly', weight: '30', schedule: 'Term 1', duration: '3 hrs', active: true, enabled: true },
    { name: 'Unit Test 3', weight: '10', schedule: 'Term 2', duration: '1 hr', active: true, enabled: true },
    { name: 'Unit Test 4', weight: '10', schedule: 'Term 2', duration: '1 hr', active: true, enabled: true },
    { name: 'Annual / Final', weight: '30', schedule: 'Both', duration: '3 hrs', active: true, enabled: true },
  ]);
  const [rcToggles, setRcToggles] = useState<Record<string, boolean>>({
    schoolLogo: true, studentPhoto: true, attendanceSummary: true, teacherRemarks: true,
    parentSignature: false, principalSignature: true, gradingScale: true,
    coScholastic: true, qrCode: false, watermark: false,
  });

  // --- Exam Operations Config ---
  const [scheduleBatchEnabled, setScheduleBatchEnabled] = useState(false);
  const [batchGrades, setBatchGrades] = useState<Record<string, boolean>>({
    'Nursery': false, 'Jr. KG': false, 'Sr. KG': false, 'Grade 1': true, 'Grade 2': true, 'Grade 3': true,
    'Grade 4': true, 'Grade 5': true, 'Grade 6': true, 'Grade 7': true, 'Grade 8': true,
    'Grade 9': true, 'Grade 10': true, 'Grade 11': false, 'Grade 12': false,
  });
  // Admit Card Template
  const [admitCardTemplate, setAdmitCardTemplate] = useState<'standard' | 'compact' | 'photo-id'>('standard');
  const [admitCardLogo, setAdmitCardLogo] = useState(true);
  const [admitCardPhoto, setAdmitCardPhoto] = useState(true);
  const [admitCardSchedule, setAdmitCardSchedule] = useState(true);
  const [admitCardInstructions, setAdmitCardInstructions] = useState('1. Reach 30 minutes before exam.\n2. Carry your own stationery.\n3. Electronic devices not allowed.\n4. No candidate shall leave the hall before the end of the exam.');
  const [admitCardSignature, setAdmitCardSignature] = useState(true);
  const [admitCardQR, setAdmitCardQR] = useState(true);
  const [admitCardAddress, setAdmitCardAddress] = useState(true);
  const [admitCardEmergency, setAdmitCardEmergency] = useState(false);
  const [admitCardReportingTime, setAdmitCardReportingTime] = useState(true);
  // Hall/Room Allocation
  const [halls, setHalls] = useState([
    { name: 'Hall A', capacity: '60', floor: 'Ground', equipment: 'Projector', enabled: true },
    { name: 'Hall B', capacity: '40', floor: '1st Floor', equipment: 'AC', enabled: true },
    { name: 'Room 101', capacity: '30', floor: '1st Floor', equipment: 'None', enabled: true },
  ]);
  // Invigilator Assignment
  const [autoAssignInvigilator, setAutoAssignInvigilator] = useState(true);
  const [maxDuties, setMaxDuties] = useState('5');
  const [crossGradeInvigilation, setCrossGradeInvigilation] = useState(false);
  // Mark Entry Controls
  const [lockMarksAfterDeadline, setLockMarksAfterDeadline] = useState(true);
  const [lockDate, setLockDate] = useState('2026-03-20');
  const [graceHours, setGraceHours] = useState('24');
  const [graceMarksEnabled, setGraceMarksEnabled] = useState(false);
  const [maxGraceMarks, setMaxGraceMarks] = useState('5');
  const [graceApprovalRequired, setGraceApprovalRequired] = useState(true);
  // Result Publishing
  const [publishMode, setPublishMode] = useState('Manual');
  const [publishDate, setPublishDate] = useState('');
  const [notifyParentsOnPublish, setNotifyParentsOnPublish] = useState(true);
  const [notifyChannels, setNotifyChannels] = useState<Record<string, boolean>>({ SMS: true, Email: true, Push: true, WhatsApp: false });
  // Re-exam / Supplementary
  const [reExamEnabled, setReExamEnabled] = useState(false);
  const [maxReExamAttempts, setMaxReExamAttempts] = useState('1');
  const [reExamDays, setReExamDays] = useState('15');
  const [separateReportEntry, setSeparateReportEntry] = useState(false);
  // Bulk Mark Entry
  const [bulkExcelUpload, setBulkExcelUpload] = useState(true);
  const [validateBeforeImport, setValidateBeforeImport] = useState(true);
  // Question Bank Config
  const [questionBankEnabled, setQuestionBankEnabled] = useState(false);
  const [bloomsTaxonomy, setBloomsTaxonomy] = useState(true);
  const [difficultyLevels, setDifficultyLevels] = useState<Record<string, boolean>>({ Easy: true, Medium: true, Hard: true, 'Very Hard': false });
  const [csvImportQB, setCsvImportQB] = useState(true);
  const [autoGeneratePaper, setAutoGeneratePaper] = useState(false);

  // ── Exam Types: search & pagination ──
  const [examTypeSearch, setExamTypeSearch] = useState('');
  const [examTypePage, setExamTypePage] = useState(1);
  const filteredExamTypes = examTypes.filter(et =>
    et.name.toLowerCase().includes(examTypeSearch.toLowerCase()) ||
    et.schedule.toLowerCase().includes(examTypeSearch.toLowerCase())
  );
  const pagedExamTypes = filteredExamTypes.slice((examTypePage - 1) * PAGE_SIZE, examTypePage * PAGE_SIZE);

  // ── Grade Boundaries: search & pagination ──
  const [gradeSearch, setGradeSearch] = useState('');
  const [gradePage, setGradePage] = useState(1);
  const filteredGradeBoundaries = gradeBoundaries.filter(g =>
    g.grade.toLowerCase().includes(gradeSearch.toLowerCase())
  );
  const pagedGradeBoundaries = filteredGradeBoundaries.slice((gradePage - 1) * PAGE_SIZE, gradePage * PAGE_SIZE);

  // ── Exam Schedule: search & pagination ──
  const [scheduleSearch, setScheduleSearch] = useState('');
  const [schedulePage, setSchedulePage] = useState(1);
  const filteredSchedule = examSchedule.filter(ex =>
    ex.exam.toLowerCase().includes(scheduleSearch.toLowerCase()) ||
    ex.classes.toLowerCase().includes(scheduleSearch.toLowerCase()) ||
    ex.status.toLowerCase().includes(scheduleSearch.toLowerCase())
  );
  const pagedSchedule = filteredSchedule.slice((schedulePage - 1) * PAGE_SIZE, schedulePage * PAGE_SIZE);

  // ── Exam Halls: search & pagination ──
  const [hallSearch, setHallSearch] = useState('');
  const [hallPage, setHallPage] = useState(1);
  const filteredHalls = halls.filter(h =>
    h.name.toLowerCase().includes(hallSearch.toLowerCase()) ||
    h.floor.toLowerCase().includes(hallSearch.toLowerCase()) ||
    h.equipment.toLowerCase().includes(hallSearch.toLowerCase())
  );
  const pagedHalls = filteredHalls.slice((hallPage - 1) * PAGE_SIZE, hallPage * PAGE_SIZE);

  // ── Saved feedback ──
  const [saved, setSaved] = useState(false);

  // ── Tab state ──
  const [internalTab, setInternalTab] = useState<TabId>('grading');
  const activeTab = (externalTab as TabId) || internalTab;
  const setActiveTab = (tab: TabId) => { if (onTabChange) onTabChange(tab); else setInternalTab(tab); };

  return (
    <div className="space-y-4">
      <ModuleHeader title="Exams & Grading Configuration" subtitle="Grading system, grade boundaries, report cards, and exam schedules" theme={theme} />

      {activeTab === 'grading' && (<div className="space-y-4">
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

      {/* ══════════════ GRADE BOUNDARIES — MASTER TABLE ══════════════ */}
      <SectionCard title="Grade Boundaries" subtitle="Edit grade name, marks, and grade points — overlapping ranges are highlighted in red" theme={theme}>
        <TableToolbar search={gradeSearch} onSearch={v => { setGradeSearch(v); setGradePage(1); }} count={filteredGradeBoundaries.length}
          label="grades" onAdd={() => { setGradeBoundaries(p => [...p, { grade: '', min: '', max: '', gp: '', enabled: true }]); setGradePage(Math.ceil((filteredGradeBoundaries.length + 1) / PAGE_SIZE)); }}
          onExport={() => {}} onImport={() => {}} theme={theme} />
        {/* B5: Overlap detection — runs on ALL grade boundaries, not just paged */}
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
                    {['Grade', 'Min Marks', 'Max Marks', 'Grade Points', 'Enabled', ''].map(h => (
                      <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor}`}>{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {pagedGradeBoundaries.map((g, pi) => {
                      const realIdx = gradeBoundaries.indexOf(g);
                      const hasOverlap = overlaps.includes(realIdx);
                      return (
                      <tr key={realIdx} className={`border-t ${hasOverlap ? 'bg-red-50 border-red-200' : theme.border} ${!g.enabled ? 'opacity-50' : ''}`}>
                        <td className="px-2 py-1.5">
                          <input value={g.grade} onChange={e => { const n = [...gradeBoundaries]; n[realIdx] = { ...n[realIdx], grade: e.target.value }; setGradeBoundaries(n); }}
                            className={`w-20 px-2 py-1 rounded-lg border ${hasOverlap ? 'border-red-400' : theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                        </td>
                        <td className="px-2 py-1.5">
                          <input value={g.min} onChange={e => { const n = [...gradeBoundaries]; n[realIdx] = { ...n[realIdx], min: e.target.value }; setGradeBoundaries(n); }}
                            className={`w-16 px-2 py-1 rounded-lg border ${hasOverlap ? 'border-red-400' : theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                        </td>
                        <td className="px-2 py-1.5">
                          <input value={g.max} onChange={e => { const n = [...gradeBoundaries]; n[realIdx] = { ...n[realIdx], max: e.target.value }; setGradeBoundaries(n); }}
                            className={`w-16 px-2 py-1 rounded-lg border ${hasOverlap ? 'border-red-400' : theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                        </td>
                        <td className="px-2 py-1.5">
                          <input value={g.gp} onChange={e => { const n = [...gradeBoundaries]; n[realIdx] = { ...n[realIdx], gp: e.target.value }; setGradeBoundaries(n); }}
                            className={`w-16 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                        </td>
                        {/* Enable/Disable */}
                        <td className="px-2 py-1.5">
                          <SSAToggle on={g.enabled} onChange={() => { const n = [...gradeBoundaries]; n[realIdx] = { ...n[realIdx], enabled: !n[realIdx].enabled }; setGradeBoundaries(n); }} theme={theme} />
                        </td>
                        <td className="px-2 py-1.5"><button onClick={() => setGradeBoundaries(p => p.filter((_, j) => j !== realIdx))} className="text-red-400 hover:text-red-600"><X size={12} /></button></td>
                      </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          );
        })()}
        <Pagination page={gradePage} total={filteredGradeBoundaries.length} pageSize={PAGE_SIZE} onChange={setGradePage} theme={theme} />
      </SectionCard>
      </div>)}

      {/* ══════════════ SCHEDULING TAB ══════════════ */}
      {activeTab === 'scheduling' && (<div className="space-y-4">
      {/* ══════════════ EXAM SCHEDULE — MASTER TABLE ══════════════ */}
      <SectionCard title="Exam Schedule" subtitle="Click to edit exam details. Overlapping date ranges are flagged with a warning." theme={theme}>
        <TableToolbar search={scheduleSearch} onSearch={v => { setScheduleSearch(v); setSchedulePage(1); }} count={filteredSchedule.length}
          label="exams" onAdd={() => { setExamSchedule(p => [...p, { exam: '', startDate: '', endDate: '', classes: 'All', status: 'Scheduled', enabled: true }]); setSchedulePage(Math.ceil((filteredSchedule.length + 1) / PAGE_SIZE)); }}
          onExport={() => {}} onImport={() => {}} theme={theme} />
        {/* B5: Schedule overlap detection */}
        {(() => {
          const scheduleOverlaps: number[] = [];
          examSchedule.forEach((ex, i) => {
            examSchedule.forEach((ex2, j) => {
              if (i >= j) return;
              if (ex.startDate && ex.endDate && ex2.startDate && ex2.endDate && ex.classes === ex2.classes) {
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
              {['Exam', 'Start', 'End', 'Classes', 'Status', 'Enabled', ''].map(h => (
                <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {pagedSchedule.map((ex, pi) => {
                const realIdx = examSchedule.indexOf(ex);
                return (
                <tr key={realIdx} className={`border-t ${theme.border} ${!ex.enabled ? 'opacity-50' : ''}`}>
                  <td className="px-1 py-1.5">
                    <input value={ex.exam} onChange={e => { const n = [...examSchedule]; n[realIdx] = { ...n[realIdx], exam: e.target.value }; setExamSchedule(n); }}
                      className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-1 py-1.5">
                    <input value={ex.startDate} onChange={e => { const n = [...examSchedule]; n[realIdx] = { ...n[realIdx], startDate: e.target.value }; setExamSchedule(n); }}
                      className={`w-20 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-1 py-1.5">
                    <input value={ex.endDate} onChange={e => { const n = [...examSchedule]; n[realIdx] = { ...n[realIdx], endDate: e.target.value }; setExamSchedule(n); }}
                      className={`w-20 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-1 py-1.5">
                    <input value={ex.classes} onChange={e => { const n = [...examSchedule]; n[realIdx] = { ...n[realIdx], classes: e.target.value }; setExamSchedule(n); }}
                      className={`w-16 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-1 py-1.5">
                    <select value={ex.status} onChange={e => { const n = [...examSchedule]; n[realIdx] = { ...n[realIdx], status: e.target.value }; setExamSchedule(n); }}
                      className={`px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] font-bold ${theme.highlight}`}>
                      <option value="Scheduled">Scheduled</option>
                      <option value="Upcoming">Upcoming</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  {/* Enable/Disable */}
                  <td className="px-2 py-1.5">
                    <SSAToggle on={ex.enabled} onChange={() => { const n = [...examSchedule]; n[realIdx] = { ...n[realIdx], enabled: !n[realIdx].enabled }; setExamSchedule(n); }} theme={theme} />
                  </td>
                  <td className="px-1 py-1.5"><button onClick={() => setExamSchedule(p => p.filter((_, j) => j !== realIdx))} className="text-red-400 hover:text-red-600"><X size={12} /></button></td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Pagination page={schedulePage} total={filteredSchedule.length} pageSize={PAGE_SIZE} onChange={setSchedulePage} theme={theme} />
      </SectionCard>

      {/* ══════════════ EXAM TYPES — MASTER TABLE ══════════════ */}
      <SectionCard title="Exam Types" subtitle="Define exam types with weightage and scheduling — total weight should sum to 100%" theme={theme}>
        <TableToolbar search={examTypeSearch} onSearch={v => { setExamTypeSearch(v); setExamTypePage(1); }} count={filteredExamTypes.length}
          label="exam types" onAdd={() => { setExamTypes(p => [...p, { name: '', weight: '0', schedule: 'Term 1', duration: '1 hr', active: true, enabled: true }]); setExamTypePage(Math.ceil((filteredExamTypes.length + 1) / PAGE_SIZE)); }}
          onExport={() => {}} onImport={() => {}} theme={theme} />
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Type Name', 'Weight (%)', 'Schedule', 'Duration', 'Active', 'Enabled', ''].map(h => (
                <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {pagedExamTypes.map((et, pi) => {
                const realIdx = examTypes.indexOf(et);
                return (
                <tr key={realIdx} className={`border-t ${theme.border} ${!et.enabled ? 'opacity-50' : ''}`}>
                  <td className="px-2 py-1.5">
                    <input value={et.name} onChange={e => { const n = [...examTypes]; n[realIdx] = { ...n[realIdx], name: e.target.value }; setExamTypes(n); }}
                      className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <input value={et.weight} onChange={e => { const n = [...examTypes]; n[realIdx] = { ...n[realIdx], weight: e.target.value }; setExamTypes(n); }}
                      className={`w-14 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <select value={et.schedule} onChange={e => { const n = [...examTypes]; n[realIdx] = { ...n[realIdx], schedule: e.target.value }; setExamTypes(n); }}
                      className={`px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] font-bold ${theme.highlight}`}>
                      <option value="Term 1">Term 1</option><option value="Term 2">Term 2</option><option value="Both">Both</option>
                    </select>
                  </td>
                  <td className="px-2 py-1.5">
                    <input value={et.duration} onChange={e => { const n = [...examTypes]; n[realIdx] = { ...n[realIdx], duration: e.target.value }; setExamTypes(n); }}
                      className={`w-16 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <SSAToggle on={et.active} onChange={() => { const n = [...examTypes]; n[realIdx] = { ...n[realIdx], active: !n[realIdx].active }; setExamTypes(n); }} theme={theme} />
                  </td>
                  {/* Enable/Disable */}
                  <td className="px-2 py-1.5">
                    <SSAToggle on={et.enabled} onChange={() => { const n = [...examTypes]; n[realIdx] = { ...n[realIdx], enabled: !n[realIdx].enabled }; setExamTypes(n); }} theme={theme} />
                  </td>
                  <td className="px-2 py-1.5"><button onClick={() => setExamTypes(p => p.filter((_, j) => j !== realIdx))} className="text-red-400 hover:text-red-600"><X size={12} /></button></td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* B5: Weightage check — live weight sum counter (preserved) */}
        {(() => {
          const total = examTypes.filter(e => e.active && e.enabled).reduce((s, e) => s + (parseInt(e.weight) || 0), 0);
          const isValid = total === 100;
          return (
            <div className="flex items-center justify-end mt-2 gap-2">
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
        <Pagination page={examTypePage} total={filteredExamTypes.length} pageSize={PAGE_SIZE} onChange={setExamTypePage} theme={theme} />
      </SectionCard>

      <SectionCard title="Schedule Exam for All Batches" subtitle="One-click exam scheduling across multiple grades" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex items-center">
              <p className={`text-xs font-bold ${theme.highlight}`}>One-click exam scheduling across grades</p>
              <InfoIcon tip="Enable to schedule an exam for multiple grades at once instead of one-by-one" />
            </div>
            <SSAToggle on={scheduleBatchEnabled} onChange={() => setScheduleBatchEnabled(!scheduleBatchEnabled)} theme={theme} />
          </div>
          {scheduleBatchEnabled && (
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Select Grades</p>
              <div className="grid grid-cols-3 lg:grid-cols-5 gap-1.5">
                {Object.entries(batchGrades).map(([grade, checked]) => (
                  <label key={grade} className={`flex items-center gap-2 p-2 rounded-lg ${theme.secondaryBg} cursor-pointer`}>
                    <input type="checkbox" checked={checked} onChange={() => setBatchGrades(p => ({ ...p, [grade]: !p[grade] }))} className="accent-emerald-500 w-3.5 h-3.5" />
                    <span className={`text-[10px] font-medium ${theme.highlight}`}>{grade}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Admit Card Template" subtitle="Configure hall ticket layout with live preview" theme={theme}>
        <div className="flex items-center mb-3">
          <p className={`text-[10px] font-bold ${theme.iconColor}`}>Design the admit card / hall ticket template</p>
          <InfoIcon tip="Select a template style and toggle fields to see live preview on the right" />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {/* ── LEFT: Configuration ── */}
          <div className="space-y-3">
            {/* Template Selector */}
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1.5`}>Template Style</p>
              <div className="grid grid-cols-3 gap-2">
                {([
                  { key: 'standard' as const, label: 'Standard', desc: 'Portrait, full details' },
                  { key: 'compact' as const, label: 'Compact', desc: 'Single-page, minimal' },
                  { key: 'photo-id' as const, label: 'Photo ID Style', desc: 'ID card + schedule' },
                ] as const).map(t => (
                  <button key={t.key} onClick={() => setAdmitCardTemplate(t.key)}
                    className={`p-2 rounded-xl border text-left transition-all ${admitCardTemplate === t.key
                      ? `${theme.primary} text-white border-transparent ring-2 ring-offset-1 ring-blue-300`
                      : `${theme.secondaryBg} ${theme.border} ${theme.highlight} hover:opacity-80`}`}>
                    <p className="text-[11px] font-bold">{t.label}</p>
                    <p className={`text-[9px] ${admitCardTemplate === t.key ? 'text-white/80' : 'text-gray-400'}`}>{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>
            {/* Toggleable Fields */}
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1.5`}>Visible Fields</p>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { label: 'School Logo', val: admitCardLogo, set: setAdmitCardLogo },
                  { label: 'Student Photo', val: admitCardPhoto, set: setAdmitCardPhoto },
                  { label: 'Exam Schedule Table', val: admitCardSchedule, set: setAdmitCardSchedule },
                  { label: 'Signatures (CT + Principal)', val: admitCardSignature, set: setAdmitCardSignature },
                  { label: 'QR / Barcode', val: admitCardQR, set: setAdmitCardQR },
                  { label: 'School Address', val: admitCardAddress, set: setAdmitCardAddress },
                  { label: 'Emergency Contact', val: admitCardEmergency, set: setAdmitCardEmergency },
                  { label: 'Reporting Time', val: admitCardReportingTime, set: setAdmitCardReportingTime },
                ].map(item => (
                  <div key={item.label} className={`flex items-center justify-between p-2 rounded-lg ${theme.secondaryBg}`}>
                    <span className={`text-[10px] font-medium ${theme.highlight}`}>{item.label}</span>
                    <SSAToggle on={item.val} onChange={() => item.set(!item.val)} theme={theme} />
                  </div>
                ))}
              </div>
            </div>
            {/* Instructions Text */}
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Instructions / Rules</p>
              <textarea value={admitCardInstructions} onChange={e => setAdmitCardInstructions(e.target.value)} rows={4}
                className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight} outline-none resize-none leading-relaxed`} />
            </div>
            <button className={`flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold ${theme.primary} text-white hover:opacity-90 transition-opacity`}>
              <Save size={14} /> Save Admit Card Config
            </button>
          </div>

          {/* ── RIGHT: Live Preview ── */}
          <div className={`rounded-2xl border-2 border-dashed ${theme.border} p-3 ${theme.secondaryBg} overflow-hidden`}>
            <p className={`text-[9px] font-bold ${theme.iconColor} mb-2 uppercase tracking-wider`}>Live Preview</p>

            {/* ── STANDARD TEMPLATE ── */}
            {admitCardTemplate === 'standard' && (
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 text-gray-800 max-w-[380px] mx-auto" style={{ fontSize: '9px' }}>
                {/* Header */}
                <div className="text-center border-b border-gray-300 pb-2 mb-2">
                  <div className="flex items-center justify-center gap-2">
                    {admitCardLogo && <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-300 flex items-center justify-center text-[7px] font-bold text-blue-600 shrink-0">LOGO</div>}
                    <div>
                      <p className="text-[11px] font-bold text-blue-900 tracking-wide">DELHI PUBLIC SCHOOL</p>
                      {admitCardAddress && <p className="text-[7px] text-gray-500">Sector 24, Dwarka, New Delhi - 110077</p>}
                      <p className="text-[7px] text-gray-400">Affiliated to CBSE | Affiliation No. 2730088</p>
                    </div>
                  </div>
                  <div className="mt-1.5 inline-block px-3 py-0.5 bg-blue-700 text-white rounded text-[8px] font-bold tracking-widest">ADMIT CARD</div>
                  <p className="text-[8px] font-semibold text-gray-600 mt-1">Annual Examination 2025-26</p>
                </div>
                {/* Student Info */}
                <div className="flex gap-3 mb-2">
                  <div className="flex-1 space-y-0.5">
                    <div className="flex"><span className="text-gray-500 w-16 shrink-0">Name:</span><span className="font-semibold">Aarav Patel</span></div>
                    <div className="flex"><span className="text-gray-500 w-16 shrink-0">Class:</span><span className="font-semibold">X - A</span></div>
                    <div className="flex"><span className="text-gray-500 w-16 shrink-0">Roll No:</span><span className="font-semibold">12</span></div>
                    <div className="flex"><span className="text-gray-500 w-16 shrink-0">DOB:</span><span className="font-semibold">15 Jun 2012</span></div>
                    {admitCardEmergency && <div className="flex"><span className="text-gray-500 w-16 shrink-0">Emergency:</span><span className="font-semibold">+91 98765 43210</span></div>}
                    {admitCardReportingTime && <div className="flex"><span className="text-gray-500 w-16 shrink-0">Report at:</span><span className="font-bold text-red-600">8:30 AM</span></div>}
                  </div>
                  {admitCardPhoto && (
                    <div className="w-16 h-20 rounded border border-gray-300 bg-gray-50 flex items-center justify-center shrink-0">
                      <UserCircle size={28} className="text-gray-300" />
                    </div>
                  )}
                </div>
                {/* Exam Schedule */}
                {admitCardSchedule && (
                  <table className="w-full border-collapse mb-2">
                    <thead>
                      <tr className="bg-blue-50">
                        <th className="border border-gray-300 px-1.5 py-0.5 text-left text-[8px] font-bold text-blue-800">Subject</th>
                        <th className="border border-gray-300 px-1.5 py-0.5 text-center text-[8px] font-bold text-blue-800">Date</th>
                        <th className="border border-gray-300 px-1.5 py-0.5 text-center text-[8px] font-bold text-blue-800">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { sub: 'English', date: '10 Mar 2026', time: '9:00 - 12:00' },
                        { sub: 'Mathematics', date: '12 Mar 2026', time: '9:00 - 12:00' },
                        { sub: 'Science', date: '14 Mar 2026', time: '9:00 - 11:30' },
                        { sub: 'Social Studies', date: '17 Mar 2026', time: '9:00 - 11:30' },
                        { sub: 'Hindi', date: '19 Mar 2026', time: '9:00 - 12:00' },
                      ].map(row => (
                        <tr key={row.sub} className="hover:bg-gray-50">
                          <td className="border border-gray-200 px-1.5 py-0.5">{row.sub}</td>
                          <td className="border border-gray-200 px-1.5 py-0.5 text-center">{row.date}</td>
                          <td className="border border-gray-200 px-1.5 py-0.5 text-center">{row.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {/* Instructions */}
                {admitCardInstructions && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-1.5 mb-2">
                    <p className="text-[7px] font-bold text-yellow-800 mb-0.5">Important Instructions:</p>
                    {admitCardInstructions.split('\n').map((line, i) => (
                      <p key={i} className="text-[7px] text-yellow-700 leading-tight">{line}</p>
                    ))}
                  </div>
                )}
                {/* Footer: QR + Signatures */}
                <div className="flex items-end justify-between mt-2 pt-2 border-t border-gray-200">
                  {admitCardQR && (
                    <div className="w-10 h-10 border border-gray-300 rounded bg-gray-50 flex items-center justify-center">
                      <div className="grid grid-cols-4 gap-px w-7 h-7">{Array.from({ length: 16 }).map((_, i) => <div key={i} className={`${i % 3 === 0 ? 'bg-gray-800' : 'bg-white'}`} />)}</div>
                    </div>
                  )}
                  {admitCardSignature && (
                    <div className="flex gap-6">
                      <div className="text-center"><div className="w-14 border-b border-gray-400 mb-0.5" /><p className="text-[7px] text-gray-500">Class Teacher</p></div>
                      <div className="text-center"><div className="w-14 border-b border-gray-400 mb-0.5" /><p className="text-[7px] text-gray-500">Principal</p></div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── COMPACT TEMPLATE ── */}
            {admitCardTemplate === 'compact' && (
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-3 text-gray-800 mx-auto" style={{ fontSize: '8px', maxWidth: '400px' }}>
                {/* Single compact row header */}
                <div className="flex items-center gap-2 border-b border-gray-300 pb-1.5 mb-1.5">
                  {admitCardLogo && <div className="w-6 h-6 rounded-full bg-green-100 border border-green-300 flex items-center justify-center text-[6px] font-bold text-green-700 shrink-0">DPS</div>}
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-green-900">DELHI PUBLIC SCHOOL</p>
                    {admitCardAddress && <p className="text-[6px] text-gray-400">Sector 24, Dwarka, New Delhi</p>}
                  </div>
                  <div className="text-right">
                    <div className="inline-block px-2 py-0.5 bg-green-700 text-white rounded text-[7px] font-bold">ADMIT CARD</div>
                    <p className="text-[7px] text-gray-500 mt-0.5">Annual Exam 2025-26</p>
                  </div>
                </div>
                {/* Two-column: info + schedule */}
                <div className="flex gap-3">
                  <div className="shrink-0 space-y-0.5">
                    {admitCardPhoto && (
                      <div className="w-12 h-14 rounded border border-gray-300 bg-gray-50 flex items-center justify-center mb-1">
                        <UserCircle size={20} className="text-gray-300" />
                      </div>
                    )}
                    <p><span className="text-gray-400">Name: </span><span className="font-bold">Aarav Patel</span></p>
                    <p><span className="text-gray-400">Class: </span><span className="font-bold">X-A | Roll: 12</span></p>
                    <p><span className="text-gray-400">DOB: </span><span className="font-bold">15 Jun 2012</span></p>
                    {admitCardReportingTime && <p><span className="text-gray-400">Report: </span><span className="font-bold text-red-600">8:30 AM</span></p>}
                    {admitCardEmergency && <p><span className="text-gray-400">Emergency: </span><span className="font-bold">+91 98765 43210</span></p>}
                  </div>
                  {admitCardSchedule && (
                    <table className="flex-1 border-collapse self-start">
                      <thead><tr className="bg-green-50">
                        <th className="border border-gray-200 px-1 py-0.5 text-left text-[7px] font-bold text-green-800">Subject</th>
                        <th className="border border-gray-200 px-1 py-0.5 text-center text-[7px] font-bold text-green-800">Date</th>
                        <th className="border border-gray-200 px-1 py-0.5 text-center text-[7px] font-bold text-green-800">Time</th>
                      </tr></thead>
                      <tbody>
                        {[
                          { sub: 'English', date: '10 Mar', time: '9:00-12:00' },
                          { sub: 'Mathematics', date: '12 Mar', time: '9:00-12:00' },
                          { sub: 'Science', date: '14 Mar', time: '9:00-11:30' },
                          { sub: 'Soc. Studies', date: '17 Mar', time: '9:00-11:30' },
                          { sub: 'Hindi', date: '19 Mar', time: '9:00-12:00' },
                        ].map(r => (
                          <tr key={r.sub}><td className="border border-gray-200 px-1 py-0.5">{r.sub}</td><td className="border border-gray-200 px-1 py-0.5 text-center">{r.date}</td><td className="border border-gray-200 px-1 py-0.5 text-center">{r.time}</td></tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
                {/* Bottom strip */}
                <div className="flex items-end justify-between mt-1.5 pt-1.5 border-t border-gray-200">
                  {admitCardQR && <div className="w-7 h-7 border border-gray-300 rounded bg-gray-50 flex items-center justify-center"><div className="grid grid-cols-3 gap-px w-5 h-5">{Array.from({ length: 9 }).map((_, i) => <div key={i} className={`${i % 2 === 0 ? 'bg-gray-800' : 'bg-white'}`} />)}</div></div>}
                  {admitCardSignature && (
                    <div className="flex gap-4">
                      <div className="text-center"><div className="w-10 border-b border-gray-400 mb-0.5" /><p className="text-[6px] text-gray-500">Class Teacher</p></div>
                      <div className="text-center"><div className="w-10 border-b border-gray-400 mb-0.5" /><p className="text-[6px] text-gray-500">Principal</p></div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── PHOTO ID STYLE TEMPLATE ── */}
            {admitCardTemplate === 'photo-id' && (
              <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden text-gray-800 max-w-[400px] mx-auto" style={{ fontSize: '8px' }}>
                <div className="flex">
                  {/* Left panel — ID card style */}
                  <div className="w-[130px] bg-gradient-to-b from-purple-700 to-purple-900 text-white p-3 flex flex-col items-center shrink-0">
                    {admitCardLogo && <div className="w-8 h-8 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-[7px] font-bold mb-1">DPS</div>}
                    <p className="text-[8px] font-bold text-center leading-tight mb-2">DELHI PUBLIC SCHOOL</p>
                    {admitCardPhoto && (
                      <div className="w-16 h-20 rounded-lg border-2 border-white/50 bg-white/10 flex items-center justify-center mb-2">
                        <UserCircle size={32} className="text-white/50" />
                      </div>
                    )}
                    <p className="text-[9px] font-bold text-center">Aarav Patel</p>
                    <p className="text-[7px] text-purple-200">Class X - A</p>
                    <p className="text-[7px] text-purple-200">Roll No. 12</p>
                    <p className="text-[7px] text-purple-300 mt-0.5">DOB: 15 Jun 2012</p>
                    {admitCardEmergency && <p className="text-[6px] text-purple-300 mt-0.5">Emergency: +91 98765 43210</p>}
                    {admitCardQR && (
                      <div className="w-9 h-9 bg-white/15 rounded border border-white/30 mt-auto flex items-center justify-center">
                        <div className="grid grid-cols-4 gap-px w-6 h-6">{Array.from({ length: 16 }).map((_, i) => <div key={i} className={`${i % 3 === 0 ? 'bg-white' : 'bg-transparent'}`} />)}</div>
                      </div>
                    )}
                  </div>
                  {/* Right panel — exam schedule */}
                  <div className="flex-1 p-3">
                    <div className="text-center mb-2">
                      <div className="inline-block px-3 py-0.5 bg-purple-100 text-purple-800 rounded text-[8px] font-bold tracking-wider">ADMIT CARD — Annual Exam 2025-26</div>
                      {admitCardReportingTime && <p className="text-[7px] text-red-600 font-bold mt-0.5">Reporting Time: 8:30 AM</p>}
                      {admitCardAddress && <p className="text-[6px] text-gray-400 mt-0.5">Sector 24, Dwarka, New Delhi - 110077</p>}
                    </div>
                    {admitCardSchedule && (
                      <table className="w-full border-collapse mb-2">
                        <thead><tr className="bg-purple-50">
                          <th className="border border-gray-200 px-1.5 py-0.5 text-left text-[7px] font-bold text-purple-800">Subject</th>
                          <th className="border border-gray-200 px-1.5 py-0.5 text-center text-[7px] font-bold text-purple-800">Date</th>
                          <th className="border border-gray-200 px-1.5 py-0.5 text-center text-[7px] font-bold text-purple-800">Time</th>
                        </tr></thead>
                        <tbody>
                          {[
                            { sub: 'English', date: '10 Mar 2026', time: '9:00 - 12:00' },
                            { sub: 'Mathematics', date: '12 Mar 2026', time: '9:00 - 12:00' },
                            { sub: 'Science', date: '14 Mar 2026', time: '9:00 - 11:30' },
                            { sub: 'Social Studies', date: '17 Mar 2026', time: '9:00 - 11:30' },
                            { sub: 'Hindi', date: '19 Mar 2026', time: '9:00 - 12:00' },
                          ].map(row => (
                            <tr key={row.sub}><td className="border border-gray-200 px-1.5 py-0.5">{row.sub}</td><td className="border border-gray-200 px-1.5 py-0.5 text-center">{row.date}</td><td className="border border-gray-200 px-1.5 py-0.5 text-center">{row.time}</td></tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                    {admitCardInstructions && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded p-1.5 mb-2">
                        <p className="text-[6px] font-bold text-yellow-800 mb-0.5">Instructions:</p>
                        {admitCardInstructions.split('\n').map((line, i) => (
                          <p key={i} className="text-[6px] text-yellow-700 leading-tight">{line}</p>
                        ))}
                      </div>
                    )}
                    {admitCardSignature && (
                      <div className="flex justify-between mt-2 pt-1 border-t border-gray-200">
                        <div className="text-center"><div className="w-12 border-b border-gray-400 mb-0.5" /><p className="text-[6px] text-gray-500">Class Teacher</p></div>
                        <div className="text-center"><div className="w-12 border-b border-gray-400 mb-0.5" /><p className="text-[6px] text-gray-500">Principal</p></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </SectionCard>

      {/* ══════════════ EXAM HALLS — MASTER TABLE ══════════════ */}
      <SectionCard title="Hall / Room Allocation" subtitle="Define exam halls for seating plan" theme={theme}>
        <div className="flex items-center mb-3">
          <p className={`text-[10px] font-bold ${theme.iconColor}`}>Manage exam halls and rooms</p>
          <InfoIcon tip="Define exam halls for seating plan" />
        </div>
        <TableToolbar search={hallSearch} onSearch={v => { setHallSearch(v); setHallPage(1); }} count={filteredHalls.length}
          label="halls" onAdd={() => { setHalls(p => [...p, { name: '', capacity: '', floor: '', equipment: 'None', enabled: true }]); setHallPage(Math.ceil((filteredHalls.length + 1) / PAGE_SIZE)); }}
          onExport={() => {}} onImport={() => {}} theme={theme} />
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Room Name', 'Capacity', 'Floor', 'Equipment', 'Enabled', ''].map(h => (
                <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {pagedHalls.map((hall, pi) => {
                const realIdx = halls.indexOf(hall);
                return (
                <tr key={realIdx} className={`border-t ${theme.border} ${!hall.enabled ? 'opacity-50' : ''}`}>
                  <td className="px-2 py-1.5">
                    <input value={hall.name} onChange={e => { const n = [...halls]; n[realIdx] = { ...n[realIdx], name: e.target.value }; setHalls(n); }}
                      className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <input value={hall.capacity} onChange={e => { const n = [...halls]; n[realIdx] = { ...n[realIdx], capacity: e.target.value }; setHalls(n); }}
                      className={`w-16 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <input value={hall.floor} onChange={e => { const n = [...halls]; n[realIdx] = { ...n[realIdx], floor: e.target.value }; setHalls(n); }}
                      className={`w-24 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <select value={hall.equipment} onChange={e => { const n = [...halls]; n[realIdx] = { ...n[realIdx], equipment: e.target.value }; setHalls(n); }}
                      className={`px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] font-bold ${theme.highlight}`}>
                      <option value="None">None</option><option value="Projector">Projector</option><option value="AC">AC</option><option value="Projector + AC">Projector + AC</option>
                    </select>
                  </td>
                  {/* Enable/Disable */}
                  <td className="px-2 py-1.5">
                    <SSAToggle on={hall.enabled} onChange={() => { const n = [...halls]; n[realIdx] = { ...n[realIdx], enabled: !n[realIdx].enabled }; setHalls(n); }} theme={theme} />
                  </td>
                  <td className="px-2 py-1.5"><button onClick={() => setHalls(p => p.filter((_, j) => j !== realIdx))} className="text-red-400 hover:text-red-600"><X size={12} /></button></td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Pagination page={hallPage} total={filteredHalls.length} pageSize={PAGE_SIZE} onChange={setHallPage} theme={theme} />
      </SectionCard>

      <SectionCard title="Invigilator Assignment Rules" subtitle="Automate invigilator duty assignment for exams" theme={theme}>
        <div className="flex items-center mb-3">
          <p className={`text-[10px] font-bold ${theme.iconColor}`}>Configure how invigilators are assigned</p>
          <InfoIcon tip="Set rules for automatic invigilator assignment based on teacher free periods" />
        </div>
        <div className="space-y-2">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Auto-assign based on free periods</p>
            <SSAToggle on={autoAssignInvigilator} onChange={() => setAutoAssignInvigilator(!autoAssignInvigilator)} theme={theme} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max duties per teacher</p>
              <InputField value={maxDuties} onChange={setMaxDuties} theme={theme} type="number" />
            </div>
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Cross-grade invigilation</p>
            <SSAToggle on={crossGradeInvigilation} onChange={() => setCrossGradeInvigilation(!crossGradeInvigilation)} theme={theme} />
          </div>
        </div>
      </SectionCard>
      </div>)}

      {/* ══════════════ MARKS TAB ══════════════ */}
      {activeTab === 'marks' && (<div className="space-y-4">
      <SectionCard title="Mark Entry Controls" subtitle="Control when teachers can no longer edit marks" theme={theme}>
        <div className="flex items-center mb-3">
          <p className={`text-[10px] font-bold ${theme.iconColor}`}>Lock marks and manage grace marks</p>
          <InfoIcon tip="Control when teachers can no longer edit marks" />
        </div>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Lock marks after deadline</p>
            <SSAToggle on={lockMarksAfterDeadline} onChange={() => setLockMarksAfterDeadline(!lockMarksAfterDeadline)} theme={theme} />
          </div>
          {lockMarksAfterDeadline && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Lock Date</p>
                <InputField value={lockDate} onChange={setLockDate} theme={theme} type="date" />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Grace period (hours)</p>
                <InputField value={graceHours} onChange={setGraceHours} theme={theme} type="number" />
              </div>
            </div>
          )}
          <div className={`p-3 rounded-xl border ${theme.border} ${theme.secondaryBg}`}>
            <div className="flex items-center justify-between mb-2">
              <p className={`text-xs font-bold ${theme.highlight}`}>Grace Marks</p>
              <SSAToggle on={graceMarksEnabled} onChange={() => setGraceMarksEnabled(!graceMarksEnabled)} theme={theme} />
            </div>
            {graceMarksEnabled && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max grace marks</p>
                  <InputField value={maxGraceMarks} onChange={setMaxGraceMarks} theme={theme} type="number" />
                </div>
                <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.cardBg}`}>
                  <p className={`text-xs font-medium ${theme.highlight}`}>Approval required</p>
                  <SSAToggle on={graceApprovalRequired} onChange={() => setGraceApprovalRequired(!graceApprovalRequired)} theme={theme} />
                </div>
              </div>
            )}
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Bulk Mark Entry" subtitle="Teachers can upload marks via Excel instead of manual entry" theme={theme}>
        <div className="flex items-center mb-3">
          <p className={`text-[10px] font-bold ${theme.iconColor}`}>Configure bulk mark upload via Excel</p>
          <InfoIcon tip="Teachers can upload marks via Excel instead of manual entry" />
        </div>
        <div className="space-y-2">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Allow Excel upload</p>
            <SSAToggle on={bulkExcelUpload} onChange={() => setBulkExcelUpload(!bulkExcelUpload)} theme={theme} />
          </div>
          {bulkExcelUpload && (
            <>
              <div className={`flex items-center gap-2 p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <Download size={14} className={theme.iconColor} />
                <span className={`text-xs font-bold ${theme.iconColor} underline cursor-pointer hover:opacity-80`}>Download Excel Template</span>
              </div>
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-xs font-bold ${theme.highlight}`}>Validate before import</p>
                <SSAToggle on={validateBeforeImport} onChange={() => setValidateBeforeImport(!validateBeforeImport)} theme={theme} />
              </div>
            </>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Question Bank Settings" subtitle="Manage question bank, taxonomy, and auto-paper generation" theme={theme}>
        <div className="flex items-center mb-3">
          <p className={`text-[10px] font-bold ${theme.iconColor}`}>Configure school-wide question bank</p>
          <InfoIcon tip="Question bank allows teachers to build a repository of questions tagged by topic, difficulty, and Bloom's level" />
        </div>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Enable Question Bank</p>
            <SSAToggle on={questionBankEnabled} onChange={() => setQuestionBankEnabled(!questionBankEnabled)} theme={theme} />
          </div>
          {questionBankEnabled && (
            <>
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-xs font-bold ${theme.highlight}`}>Bloom&apos;s Taxonomy Tagging</p>
                <SSAToggle on={bloomsTaxonomy} onChange={() => setBloomsTaxonomy(!bloomsTaxonomy)} theme={theme} />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Difficulty Levels</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(difficultyLevels).map(([lvl, on]) => (
                    <label key={lvl} className={`flex items-center gap-2 p-2 rounded-lg ${theme.secondaryBg} cursor-pointer`}>
                      <input type="checkbox" checked={on} onChange={() => setDifficultyLevels(p => ({ ...p, [lvl]: !p[lvl] }))} className="accent-emerald-500 w-3.5 h-3.5" />
                      <span className={`text-[10px] font-medium ${theme.highlight}`}>{lvl}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-xs font-bold ${theme.highlight}`}>Allow CSV import</p>
                <SSAToggle on={csvImportQB} onChange={() => setCsvImportQB(!csvImportQB)} theme={theme} />
              </div>
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex items-center">
                  <p className={`text-xs font-bold ${theme.highlight}`}>Auto-generate paper from bank</p>
                  <Phase2Badge />
                </div>
                <SSAToggle on={autoGeneratePaper} onChange={() => setAutoGeneratePaper(!autoGeneratePaper)} theme={theme} />
              </div>
            </>
          )}
        </div>
      </SectionCard>
      </div>)}

      {/* ══════════════ REPORTS TAB ══════════════ */}
      {activeTab === 'reports' && (<div className="space-y-4">
      {/* ── Report Card Template — Config + Live Preview ── */}
      {(() => {
        const rcTemplates: { id: string; label: string; desc: string }[] = [
          { id: 'preschool', label: 'Preschool (Nursery \u2013 Sr. KG)', desc: 'Developmental milestones, emoji/symbol ratings, no marks' },
          { id: 'cbse-15', label: 'CBSE Standard (Class 1\u20135)', desc: 'Grades A1\u2013E, co-scholastic areas, teacher remarks' },
          { id: 'cbse-610', label: 'CBSE Secondary (Class 6\u201310)', desc: 'Marks + grade, internal/external split, discipline' },
          { id: 'cbse-1112', label: 'CBSE Sr. Secondary (Class 11\u201312)', desc: 'Marks + %, practical/theory, CGPA' },
          { id: 'icse', label: 'ICSE Pattern', desc: 'Internal + external marks, 1\u20139 grade scale, activities' },
          { id: 'simple', label: 'Simple Marks Pattern', desc: 'Marks / total / percentage only' },
        ];
        const toggleLabels: Record<string, string> = {
          schoolLogo: 'School Logo', studentPhoto: 'Student Photo', attendanceSummary: 'Attendance Summary',
          teacherRemarks: 'Teacher Remarks', parentSignature: 'Parent Signature', principalSignature: 'Principal Signature',
          gradingScale: 'Grading Scale Display', coScholastic: 'Co-Scholastic Areas', qrCode: 'QR Code', watermark: 'Watermark',
        };
        const rc = rcToggles;
        const tid = reportTemplate;
        const coScholasticApplicable = ['cbse-15', 'cbse-610', 'icse'].includes(tid);

        /* Shared preview sub-components */
        const PreviewHeader = ({ subtitle }: { subtitle: string }) => (
          <>
            {rc.schoolLogo && <div className={`mx-auto w-10 h-10 rounded-full border-2 ${theme.border} flex items-center justify-center mb-1`}><span className={`text-lg font-bold ${theme.highlight}`}>S</span></div>}
            <div className="text-center mb-2">
              <p className={`text-sm font-bold ${theme.highlight}`}>Saaras International School</p>
              <p className={`text-[9px] ${theme.iconColor}`}>{subtitle}</p>
            </div>
          </>
        );
        const StudentInfo = ({ cls }: { cls: string }) => (
          <div className={`flex items-center gap-3 p-2 rounded-lg ${theme.secondaryBg} mb-2`}>
            {rc.studentPhoto && <div className={`w-10 h-12 rounded-lg border ${theme.border} ${theme.cardBg} flex items-center justify-center shrink-0`}><UserCircle size={18} className={theme.iconColor} /></div>}
            <div className="space-y-0.5 text-[10px]">
              <p className={theme.highlight}><strong>Name:</strong> Aarav Patel</p>
              <p className={theme.highlight}><strong>Class:</strong> {cls} &nbsp; <strong>Roll No:</strong> 12</p>
            </div>
          </div>
        );
        const SignatureRow = () => (
          <div className="flex justify-between mt-3">
            {rc.principalSignature && <div className={`text-[8px] ${theme.iconColor} text-center`}><div className={`w-16 border-b ${theme.border} mb-0.5`} /><p>Principal</p></div>}
            {rc.parentSignature && <div className={`text-[8px] ${theme.iconColor} text-center`}><div className={`w-16 border-b ${theme.border} mb-0.5`} /><p>Parent</p></div>}
          </div>
        );
        const QrBadge = () => rc.qrCode ? <div className={`mt-2 w-10 h-10 border ${theme.border} rounded flex items-center justify-center text-[7px] ${theme.iconColor}`}>QR</div> : null;
        const WatermarkOverlay = () => rc.watermark ? <div className={`absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] text-6xl font-black ${theme.highlight} select-none -rotate-12`}>DRAFT</div> : null;

        /* ── Preview: Preschool ── */
        const PreschoolPreview = () => (
          <div className="space-y-2">
            <PreviewHeader subtitle="Developmental Progress Report 2025-26" />
            <StudentInfo cls="Sr. KG &mdash; Sunflower" />
            <table className="w-full text-[9px]">
              <thead><tr className={theme.secondaryBg}>
                <th className={`text-left p-1.5 font-bold ${theme.highlight} rounded-tl-lg`}>Developmental Area</th>
                <th className={`text-center p-1.5 font-bold ${theme.highlight}`}>Term 1</th>
                <th className={`text-center p-1.5 font-bold ${theme.highlight} rounded-tr-lg`}>Term 2</th>
              </tr></thead>
              <tbody>
                {[['Social Skills','\u2B50','\u2B50'],['Motor Skills','\uD83D\uDC4D','\u2B50'],['Language & Literacy','\u2B50','\u2B50'],['Cognitive Development','\uD83D\uDC4D','\uD83D\uDC4D'],['Creative Expression','\u2B50','\u2B50']].map(([area,t1,t2],i) => (
                  <tr key={i} className={`border-b ${theme.border}`}>
                    <td className={`p-1.5 ${theme.highlight}`}>{area}</td>
                    <td className="text-center p-1.5">{t1}</td>
                    <td className="text-center p-1.5">{t2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {rc.gradingScale && (
              <div className={`p-2 rounded-lg ${theme.secondaryBg} text-[8px] ${theme.iconColor}`}>
                <p className="font-bold mb-0.5">Rating Scale:</p>
                <p>{'\u2B50'} Excellent &nbsp;&nbsp; {'\uD83D\uDC4D'} Good &nbsp;&nbsp; {'\uD83D\uDD04'} Needs Improvement</p>
              </div>
            )}
            {rc.attendanceSummary && <p className={`text-[9px] ${theme.iconColor}`}><strong>Attendance:</strong> 168 / 180 days (93%)</p>}
            {rc.teacherRemarks && <p className={`text-[9px] italic ${theme.iconColor}`}>&ldquo;Aarav is a cheerful and curious learner. Excellent progress in social skills.&rdquo;</p>}
            <SignatureRow />
            <QrBadge />
          </div>
        );

        /* ── Preview: CBSE 1-5 ── */
        const Cbse15Preview = () => (
          <div className="space-y-2">
            <WatermarkOverlay />
            <PreviewHeader subtitle="Annual Progress Report 2025-26" />
            <StudentInfo cls="5-A" />
            {rc.attendanceSummary && <p className={`text-[9px] ${theme.iconColor}`}><strong>Attendance:</strong> 204 / 220 days (93%)</p>}
            <table className="w-full text-[9px]">
              <thead><tr className={theme.secondaryBg}>
                <th className={`text-left p-1.5 font-bold ${theme.highlight} rounded-tl-lg`}>Subject</th>
                <th className={`text-center p-1.5 font-bold ${theme.highlight}`}>Grade</th>
                <th className={`text-center p-1.5 font-bold ${theme.highlight} rounded-tr-lg`}>Remark</th>
              </tr></thead>
              <tbody>
                {[['English','A1','Outstanding'],['Hindi','A2','Very Good'],['Mathematics','A1','Outstanding'],['EVS','B1','Good'],['Computer','A2','Very Good']].map(([sub,g,r],i) => (
                  <tr key={i} className={`border-b ${theme.border}`}>
                    <td className={`p-1.5 ${theme.highlight}`}>{sub}</td>
                    <td className={`text-center p-1.5 font-bold ${theme.highlight}`}>{g}</td>
                    <td className={`text-center p-1.5 ${theme.iconColor}`}>{r}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {rc.coScholastic && (
              <div>
                <p className={`text-[9px] font-bold ${theme.highlight} mb-1`}>Co-Scholastic Areas</p>
                <div className="grid grid-cols-3 gap-1 text-[8px]">
                  {[['Art & Craft','A'],['Music','B'],['Sports','A'],['Work Ed.','A'],['GK','B']].map(([a,g],i) => (
                    <div key={i} className={`p-1 rounded ${theme.secondaryBg} flex justify-between`}>
                      <span className={theme.iconColor}>{a}</span>
                      <span className={`font-bold ${theme.highlight}`}>{g}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {rc.gradingScale && (
              <div className={`p-2 rounded-lg ${theme.secondaryBg} text-[8px] ${theme.iconColor}`}>
                <p className="font-bold mb-0.5">Grading Scale:</p>
                <p>A1 (91-100) &bull; A2 (81-90) &bull; B1 (71-80) &bull; B2 (61-70) &bull; C1 (51-60) &bull; C2 (41-50) &bull; D (33-40) &bull; E (&lt;33)</p>
              </div>
            )}
            {rc.teacherRemarks && <p className={`text-[9px] italic ${theme.iconColor}`}>&ldquo;Aarav is a diligent student with excellent analytical skills.&rdquo;</p>}
            <SignatureRow />
            <QrBadge />
          </div>
        );

        /* ── Preview: CBSE 6-10 ── */
        const Cbse610Preview = () => (
          <div className="space-y-2">
            <WatermarkOverlay />
            <PreviewHeader subtitle="CBSE Examination Report 2025-26" />
            <StudentInfo cls="9-B" />
            {rc.attendanceSummary && <p className={`text-[9px] ${theme.iconColor}`}><strong>Attendance:</strong> 198 / 215 days (92%)</p>}
            <table className="w-full text-[9px]">
              <thead><tr className={theme.secondaryBg}>
                <th className={`text-left p-1.5 font-bold ${theme.highlight} rounded-tl-lg`}>Subject</th>
                <th className={`text-center p-1.5 font-bold ${theme.highlight}`}>Internal</th>
                <th className={`text-center p-1.5 font-bold ${theme.highlight}`}>External</th>
                <th className={`text-center p-1.5 font-bold ${theme.highlight}`}>Total</th>
                <th className={`text-center p-1.5 font-bold ${theme.highlight} rounded-tr-lg`}>Grade</th>
              </tr></thead>
              <tbody>
                {[['Mathematics',18,67,85,'A2'],['Science',20,72,92,'A1'],['Social Sc.',16,58,74,'B1'],['English',19,70,89,'A2'],['Hindi',17,55,72,'B1']].map(([sub,int_,ext,tot,g],i) => (
                  <tr key={i} className={`border-b ${theme.border}`}>
                    <td className={`p-1.5 ${theme.highlight}`}>{sub}</td>
                    <td className={`text-center p-1.5 ${theme.iconColor}`}>{int_}/20</td>
                    <td className={`text-center p-1.5 ${theme.iconColor}`}>{ext}/80</td>
                    <td className={`text-center p-1.5 font-bold ${theme.highlight}`}>{tot}</td>
                    <td className={`text-center p-1.5 font-bold ${theme.highlight}`}>{g}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {rc.coScholastic && (
              <div>
                <p className={`text-[9px] font-bold ${theme.highlight} mb-1`}>Co-Scholastic &amp; Discipline</p>
                <div className="grid grid-cols-2 gap-1 text-[8px]">
                  {[['Art Education','A'],['Health & PE','B'],['Work Education','A'],['Discipline','A']].map(([a,g],i) => (
                    <div key={i} className={`p-1 rounded ${theme.secondaryBg} flex justify-between`}>
                      <span className={theme.iconColor}>{a}</span>
                      <span className={`font-bold ${theme.highlight}`}>{g}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {rc.gradingScale && (
              <div className={`p-2 rounded-lg ${theme.secondaryBg} text-[8px] ${theme.iconColor}`}>
                <p className="font-bold mb-0.5">Grading Scale:</p>
                <p>A1 (91-100) &bull; A2 (81-90) &bull; B1 (71-80) &bull; B2 (61-70) &bull; C1 (51-60) &bull; C2 (41-50) &bull; D (33-40) &bull; E (&lt;33)</p>
              </div>
            )}
            {rc.teacherRemarks && <p className={`text-[9px] italic ${theme.iconColor}`}>&ldquo;Consistently strong in analytical subjects. Encourage more participation in sports.&rdquo;</p>}
            <SignatureRow />
            <QrBadge />
          </div>
        );

        /* ── Preview: CBSE 11-12 ── */
        const Cbse1112Preview = () => (
          <div className="space-y-2">
            <WatermarkOverlay />
            <PreviewHeader subtitle="CBSE Sr. Secondary Report 2025-26" />
            <StudentInfo cls="12-A (Science)" />
            {rc.attendanceSummary && <p className={`text-[9px] ${theme.iconColor}`}><strong>Attendance:</strong> 195 / 210 days (93%)</p>}
            <table className="w-full text-[9px]">
              <thead><tr className={theme.secondaryBg}>
                <th className={`text-left p-1.5 font-bold ${theme.highlight} rounded-tl-lg`}>Subject</th>
                <th className={`text-center p-1.5 font-bold ${theme.highlight}`}>Theory</th>
                <th className={`text-center p-1.5 font-bold ${theme.highlight}`}>Practical</th>
                <th className={`text-center p-1.5 font-bold ${theme.highlight}`}>Total</th>
                <th className={`text-center p-1.5 font-bold ${theme.highlight} rounded-tr-lg`}>%</th>
              </tr></thead>
              <tbody>
                {[['Physics',52,18,70,'70%'],['Chemistry',58,20,78,'78%'],['Mathematics',82,'\u2013',82,'82%'],['English',75,'\u2013',75,'75%'],['Computer Sc.',48,28,76,'76%']].map(([sub,th_,pr,tot,pct],i) => (
                  <tr key={i} className={`border-b ${theme.border}`}>
                    <td className={`p-1.5 ${theme.highlight}`}>{sub}</td>
                    <td className={`text-center p-1.5 ${theme.iconColor}`}>{th_}{typeof th_ === 'number' ? '/70' : ''}</td>
                    <td className={`text-center p-1.5 ${theme.iconColor}`}>{pr === '\u2013' ? '\u2013' : `${pr}/30`}</td>
                    <td className={`text-center p-1.5 font-bold ${theme.highlight}`}>{tot}</td>
                    <td className={`text-center p-1.5 font-bold ${theme.highlight}`}>{pct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {rc.gradingScale && (
              <div className={`p-2 rounded-lg ${theme.secondaryBg} text-[8px] ${theme.iconColor}`}>
                <p className="font-bold mb-0.5">CGPA (10-point scale):</p>
                <p>A1=10 (91-100) &bull; A2=9 (81-90) &bull; B1=8 (71-80) &bull; B2=7 (61-70) &bull; C1=6 (51-60) &bull; C2=5 (41-50) &bull; D=4 (33-40) &bull; E=0 (&lt;33)</p>
                <p className={`font-bold mt-1 ${theme.highlight}`}>CGPA: 7.6 &nbsp; | &nbsp; Aggregate: 76.2%</p>
              </div>
            )}
            {rc.teacherRemarks && <p className={`text-[9px] italic ${theme.iconColor}`}>&ldquo;Strong in Mathematics and Computer Science. Recommended for JEE preparation.&rdquo;</p>}
            <SignatureRow />
            <QrBadge />
          </div>
        );

        /* ── Preview: ICSE ── */
        const IcsePreview = () => (
          <div className="space-y-2">
            <WatermarkOverlay />
            <PreviewHeader subtitle="ICSE Examination Report 2025-26" />
            <StudentInfo cls="10-A" />
            {rc.attendanceSummary && <p className={`text-[9px] ${theme.iconColor}`}><strong>Attendance:</strong> 200 / 218 days (92%)</p>}
            <table className="w-full text-[9px]">
              <thead><tr className={theme.secondaryBg}>
                <th className={`text-left p-1.5 font-bold ${theme.highlight} rounded-tl-lg`}>Subject</th>
                <th className={`text-center p-1.5 font-bold ${theme.highlight}`}>Internal</th>
                <th className={`text-center p-1.5 font-bold ${theme.highlight}`}>Ext. Grade</th>
                <th className={`text-center p-1.5 font-bold ${theme.highlight} rounded-tr-lg`}>Total</th>
              </tr></thead>
              <tbody>
                {[['English','82/100 (A)','2','164/200'],['Mathematics','78/100 (B)','3','156/200'],['Physics','85/100 (A)','1','170/200'],['Chemistry','72/100 (B)','3','144/200'],['Biology','88/100 (A)','2','176/200']].map(([sub,int_,extGr,tot],i) => (
                  <tr key={i} className={`border-b ${theme.border}`}>
                    <td className={`p-1.5 ${theme.highlight}`}>{sub}</td>
                    <td className={`text-center p-1.5 ${theme.iconColor}`}>{int_}</td>
                    <td className={`text-center p-1.5 font-bold ${theme.highlight}`}>{extGr}</td>
                    <td className={`text-center p-1.5 font-bold ${theme.highlight}`}>{tot}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {rc.coScholastic && (
              <div>
                <p className={`text-[9px] font-bold ${theme.highlight} mb-1`}>Activities &amp; Co-Curricular</p>
                <div className="grid grid-cols-3 gap-1 text-[8px]">
                  {[['Art','A'],['Music','B'],['Sports','A'],['Debate','A'],['SUPW','B']].map(([a,g],i) => (
                    <div key={i} className={`p-1 rounded ${theme.secondaryBg} flex justify-between`}>
                      <span className={theme.iconColor}>{a}</span>
                      <span className={`font-bold ${theme.highlight}`}>{g}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {rc.gradingScale && (
              <div className={`p-2 rounded-lg ${theme.secondaryBg} text-[8px] ${theme.iconColor}`}>
                <p className="font-bold mb-0.5">ICSE Grading:</p>
                <p><strong>External:</strong> 1 (Very Good) &bull; 2 (Good) &bull; 3 (Satisfactory) &bull; 4 (Fair) &bull; 5-8 (Below Avg) &bull; 9 (Fail)</p>
                <p><strong>Internal:</strong> A (Excellent) &bull; B (Very Good) &bull; C (Good) &bull; D (Satisfactory) &bull; E (Needs Improvement)</p>
              </div>
            )}
            {rc.teacherRemarks && <p className={`text-[9px] italic ${theme.iconColor}`}>&ldquo;Excellent all-round performance. Active in co-curricular activities.&rdquo;</p>}
            <SignatureRow />
            <QrBadge />
          </div>
        );

        /* ── Preview: Simple Marks ── */
        const SimplePreview = () => (
          <div className="space-y-2">
            <WatermarkOverlay />
            <PreviewHeader subtitle="Examination Report 2025-26" />
            <StudentInfo cls="5-A" />
            {rc.attendanceSummary && <p className={`text-[9px] ${theme.iconColor}`}><strong>Attendance:</strong> 204 / 220 days (93%)</p>}
            <table className="w-full text-[9px]">
              <thead><tr className={theme.secondaryBg}>
                <th className={`text-left p-1.5 font-bold ${theme.highlight} rounded-tl-lg`}>Subject</th>
                <th className={`text-center p-1.5 font-bold ${theme.highlight}`}>Marks</th>
                <th className={`text-center p-1.5 font-bold ${theme.highlight}`}>Total</th>
                <th className={`text-center p-1.5 font-bold ${theme.highlight} rounded-tr-lg`}>%</th>
              </tr></thead>
              <tbody>
                {[['English',82,100,'82%'],['Hindi',75,100,'75%'],['Mathematics',90,100,'90%'],['Science',78,100,'78%'],['Social Studies',85,100,'85%']].map(([sub,marks,total,pct],i) => (
                  <tr key={i} className={`border-b ${theme.border}`}>
                    <td className={`p-1.5 ${theme.highlight}`}>{sub}</td>
                    <td className={`text-center p-1.5 font-bold ${theme.highlight}`}>{marks}</td>
                    <td className={`text-center p-1.5 ${theme.iconColor}`}>{total}</td>
                    <td className={`text-center p-1.5 font-bold ${theme.highlight}`}>{pct}</td>
                  </tr>
                ))}
                <tr className={theme.secondaryBg}>
                  <td className={`p-1.5 font-bold ${theme.highlight}`}>Grand Total</td>
                  <td className={`text-center p-1.5 font-bold ${theme.highlight}`}>410</td>
                  <td className={`text-center p-1.5 ${theme.iconColor}`}>500</td>
                  <td className={`text-center p-1.5 font-bold ${theme.highlight}`}>82%</td>
                </tr>
              </tbody>
            </table>
            {rc.teacherRemarks && <p className={`text-[9px] italic ${theme.iconColor}`}>&ldquo;Good academic performance. Keep it up!&rdquo;</p>}
            <SignatureRow />
            <QrBadge />
          </div>
        );

        const previewMap: Record<string, React.FC> = {
          'preschool': PreschoolPreview, 'cbse-15': Cbse15Preview, 'cbse-610': Cbse610Preview,
          'cbse-1112': Cbse1112Preview, 'icse': IcsePreview, 'simple': SimplePreview,
        };
        const PreviewComponent = previewMap[tid] || Cbse15Preview;

        return (
          <>
          <SectionCard title="Report Card Template" subtitle="Select template, configure fields, and preview live" theme={theme}>
            <div className="flex flex-col xl:flex-row gap-4">
              {/* ─── LEFT: Config ─── */}
              <div className="xl:w-[42%] space-y-4 shrink-0">
                {/* Template selector */}
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Select Template</p>
                  <div className="space-y-1.5">
                    {rcTemplates.map(tmpl => (
                      <button key={tmpl.id} onClick={() => setReportTemplate(tmpl.id)}
                        className={`w-full text-left p-2.5 rounded-xl border transition-all ${tid === tmpl.id ? `border-2 ${theme.primary} text-white` : `${theme.secondaryBg} ${theme.border} hover:border-opacity-60`}`}>
                        <p className={`text-[11px] font-bold ${tid === tmpl.id ? '' : theme.highlight}`}>{tmpl.label}</p>
                        <p className={`text-[9px] mt-0.5 ${tid === tmpl.id ? 'opacity-80' : theme.iconColor}`}>{tmpl.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Config toggles */}
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Report Card Options</p>
                  <div className="space-y-1">
                    {Object.entries(toggleLabels).map(([key, label]) => {
                      const disabled = key === 'coScholastic' && !coScholasticApplicable;
                      return (
                        <div key={key} className={`flex items-center justify-between p-2 rounded-xl ${theme.secondaryBg} ${disabled ? 'opacity-40' : ''}`}>
                          <div className="flex items-center gap-1.5">
                            <span className={`text-[11px] font-medium ${theme.highlight}`}>{label}</span>
                            {disabled && <span className={`text-[8px] ${theme.iconColor}`}>(N/A for this template)</span>}
                          </div>
                          <SSAToggle on={rcToggles[key]} onChange={() => { if (!disabled) setRcToggles(prev => ({ ...prev, [key]: !prev[key] })); }} theme={theme} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* ─── RIGHT: Live Preview ─── */}
              <div className="xl:flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <p className={`text-[10px] font-bold ${theme.iconColor}`}>Live Preview</p>
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${theme.secondaryBg}`}>
                    <Eye size={11} className={theme.iconColor} />
                    <span className={`text-[9px] font-bold ${theme.iconColor}`}>Updates in real-time</span>
                  </div>
                </div>
                <div className={`relative p-5 rounded-2xl border-2 ${theme.border} ${theme.cardBg} shadow-sm overflow-hidden`}>
                  <PreviewComponent />
                </div>
              </div>
            </div>
          </SectionCard>

          {/* ── Rank Display Options — unchanged ── */}
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
          </>
        );
      })()}

      <SectionCard title="Result Publishing" subtitle="Control how exam results reach parents" theme={theme}>
        <div className="flex items-center mb-3">
          <p className={`text-[10px] font-bold ${theme.iconColor}`}>Configure result publish mode and notifications</p>
          <InfoIcon tip="Control how exam results reach parents" />
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Publish Mode</p>
              <SelectField options={['Instant', 'Scheduled', 'Manual']} value={publishMode} onChange={setPublishMode} theme={theme} />
            </div>
            {publishMode === 'Scheduled' && (
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Schedule Date</p>
                <InputField value={publishDate} onChange={setPublishDate} theme={theme} type="date" />
              </div>
            )}
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex items-center">
              <p className={`text-xs font-bold ${theme.highlight}`}>Notify parents on publish</p>
              <MobileBadge />
            </div>
            <SSAToggle on={notifyParentsOnPublish} onChange={() => setNotifyParentsOnPublish(!notifyParentsOnPublish)} theme={theme} />
          </div>
          {notifyParentsOnPublish && (
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Notify via</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(notifyChannels).map(([ch, on]) => (
                  <label key={ch} className={`flex items-center gap-2 p-2 rounded-lg ${theme.secondaryBg} cursor-pointer`}>
                    <input type="checkbox" checked={on} onChange={() => setNotifyChannels(p => ({ ...p, [ch]: !p[ch] }))} className="accent-emerald-500 w-3.5 h-3.5" />
                    <span className={`text-[10px] font-medium ${theme.highlight}`}>{ch}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Re-exam / Supplementary" subtitle="Configure re-examination and supplementary exam rules" theme={theme}>
        <div className="flex items-center mb-3">
          <p className={`text-[10px] font-bold ${theme.iconColor}`}>Manage re-exam policies for failed students</p>
          <InfoIcon tip="Allow students who failed to retake exams under controlled rules" />
        </div>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Enable Re-exam / Supplementary</p>
            <SSAToggle on={reExamEnabled} onChange={() => setReExamEnabled(!reExamEnabled)} theme={theme} />
          </div>
          {reExamEnabled && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max re-exam attempts</p>
                  <InputField value={maxReExamAttempts} onChange={setMaxReExamAttempts} theme={theme} type="number" />
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Schedule within (days)</p>
                  <InputField value={reExamDays} onChange={setReExamDays} theme={theme} type="number" />
                </div>
              </div>
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-xs font-bold ${theme.highlight}`}>Separate report card entry</p>
                <SSAToggle on={separateReportEntry} onChange={() => setSeparateReportEntry(!separateReportEntry)} theme={theme} />
              </div>
            </>
          )}
        </div>
      </SectionCard>
      </div>)}

      {/* ══════════════ SETTINGS TAB ══════════════ */}
      {activeTab === 'settings' && (<div className="space-y-4">
      <SectionCard title="Role-Based Permissions" subtitle="Managed centrally in Roles & Permission module" theme={theme}>
        <div className={`flex items-center gap-3 p-3 rounded-xl ${theme.accentBg} border ${theme.border}`}>
          <div className="flex-1">
            <p className={`text-xs ${theme.iconColor}`}>Role & permission settings for Exams are configured in <span className={`font-bold ${theme.primaryText}`}>Roles & Permission Management</span></p>
          </div>
          <ArrowRight size={16} className={theme.iconColor} />
        </div>
      </SectionCard>

      <SectionCard title="Bulk Import" subtitle="Import data from Excel templates" theme={theme}>
        <BulkImportWizard entityName="Exam Schedule" templateFields={['Exam Name', 'Class', 'Subject', 'Date', 'Time', 'Duration', 'Max Marks']} sampleData={[['Unit Test 1', 'Grade 9', 'Mathematics', '2026-06-15', '09:00 AM', '2 hrs', '100']]} theme={theme} />
      </SectionCard>
      </div>)}

      {/* ── Save Configuration ── */}
      <div className="flex justify-end pt-2">
        <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
          className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white ${saved ? 'bg-emerald-500' : theme.primary} hover:opacity-90 transition-colors`}>
          <Save size={14} /> {saved ? 'Saved!' : 'Save Configuration'}
        </button>
      </div>
    </div>
  );
}
