'use client';

import React, { useState } from 'react';
import { Search, X, Plus, Download, Upload, ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField } from '../_helpers/components';
import { MasterPermissionGrid, BulkImportWizard } from '@/components/shared';
import type { Theme } from '../_helpers/types';

const PAGE_SIZE = 5;

// ── TableToolbar ─────────────────────────────────────
function TableToolbar({
  search, onSearch, count, label, onAdd, onExport, onImport, theme,
}: {
  search: string; onSearch: (v: string) => void; count: number; label: string;
  onAdd: () => void; onExport: () => void; onImport: () => void; theme: Theme;
}) {
  return (
    <div className="flex items-center gap-2 mb-3 flex-wrap">
      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${theme.border} ${theme.inputBg} flex-1 min-w-[160px]`}>
        <Search size={13} className={theme.iconColor} />
        <input value={search} onChange={e => onSearch(e.target.value)} placeholder={`Search ${label}...`}
          className={`flex-1 bg-transparent text-xs ${theme.highlight} outline-none placeholder-gray-400`} />
        {search && <button onClick={() => onSearch('')}><X size={12} className="text-gray-400 hover:text-red-400" /></button>}
      </div>
      <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${theme.secondaryBg} ${theme.iconColor} shrink-0`}>{count} records</span>
      <button onClick={onAdd} className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-white ${theme.primary} hover:opacity-90 shrink-0`}>
        <Plus size={12} /> Add
      </button>
      <button onClick={onExport} className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border ${theme.border} ${theme.iconColor} ${theme.buttonHover} shrink-0`}>
        <Download size={12} /> Export
      </button>
      <button onClick={onImport} className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border ${theme.border} ${theme.iconColor} ${theme.buttonHover} shrink-0`}>
        <Upload size={12} /> Import
      </button>
    </div>
  );
}

// ── Pagination ───────────────────────────────────────
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

// ── Types ────────────────────────────────────────────
type LearningPathRow = {
  id: number;
  name: string;
  grade: string;
  subject: string;
  modules: string;
  duration: string;
  status: 'Active' | 'Draft';
  enabled: boolean;
};

type ContentStatRow = {
  id: number;
  subject: string;
  videos: string;
  quizzes: string;
  documents: string;
  enabled: boolean;
};

// ── Default data ─────────────────────────────────────
const defaultLearningPaths: LearningPathRow[] = [
  { id: 1, name: 'Class 10 Board Prep', grade: 'Grade 10', subject: 'Math, Science, English', modules: '12', duration: '16 weeks', status: 'Active', enabled: true },
  { id: 2, name: 'Remedial Math', grade: 'Grade 8-9', subject: 'Mathematics', modules: '8', duration: '10 weeks', status: 'Active', enabled: true },
  { id: 3, name: 'Science Olympiad Prep', grade: 'Grade 9-11', subject: 'Physics, Chemistry, Biology', modules: '15', duration: '20 weeks', status: 'Active', enabled: true },
  { id: 4, name: 'English Literature Deep Dive', grade: 'Grade 11-12', subject: 'English', modules: '6', duration: '8 weeks', status: 'Draft', enabled: true },
  { id: 5, name: 'Computer Science Foundations', grade: 'Grade 9-10', subject: 'Computer/IT', modules: '10', duration: '14 weeks', status: 'Active', enabled: true },
  { id: 6, name: 'Hindi Proficiency Path', grade: 'Grade 6-8', subject: 'Hindi', modules: '7', duration: '12 weeks', status: 'Draft', enabled: true },
];

const defaultContentStats: ContentStatRow[] = [
  { id: 1, subject: 'Mathematics', videos: '18', quizzes: '10', documents: '24', enabled: true },
  { id: 2, subject: 'Science', videos: '14', quizzes: '8', documents: '26', enabled: true },
  { id: 3, subject: 'English', videos: '10', quizzes: '4', documents: '24', enabled: true },
  { id: 4, subject: 'Social Science', videos: '6', quizzes: '3', documents: '23', enabled: true },
  { id: 5, subject: 'Hindi', videos: '4', quizzes: '2', documents: '22', enabled: true },
  { id: 6, subject: 'Computer/IT', videos: '3', quizzes: '1', documents: '18', enabled: true },
  { id: 7, subject: 'Others', videos: '1', quizzes: '0', documents: '13', enabled: true },
];

const LP_STATUSES: LearningPathRow['status'][] = ['Active', 'Draft'];

type TabId = 'content' | 'engagement' | 'settings';

export default function LMSConfigModule({ theme, activeTab: externalTab, onTabChange }: { theme: Theme; activeTab?: string; onTabChange?: (tab: string) => void }) {
  // ─── LMS Settings ───
  const [enableLMS, setEnableLMS] = useState(true);
  const [allowUploads, setAllowUploads] = useState(true);
  const [enableQuizBuilder, setEnableQuizBuilder] = useState(true);
  const [maxUploadSize, setMaxUploadSize] = useState('50');

  // ─── Learning Paths — full interactive table ───
  const [enableLearningPaths, setEnableLearningPaths] = useState(true);
  const [learningPaths, setLearningPaths] = useState<LearningPathRow[]>(defaultLearningPaths);
  const [lpSearch, setLpSearch] = useState('');
  const [lpPage, setLpPage] = useState(1);
  const [showAddLp, setShowAddLp] = useState(false);
  const [newLp, setNewLp] = useState({ name: '', grade: '', subject: '', modules: '', duration: '' });

  const filteredLps = learningPaths.filter(lp => {
    const q = lpSearch.toLowerCase();
    return !q || lp.name.toLowerCase().includes(q) || lp.grade.toLowerCase().includes(q) ||
      lp.subject.toLowerCase().includes(q) || lp.status.toLowerCase().includes(q);
  });
  const pagedLps = filteredLps.slice((lpPage - 1) * PAGE_SIZE, lpPage * PAGE_SIZE);

  function updateLp(id: number, field: keyof LearningPathRow, value: string | boolean) {
    setLearningPaths(p => p.map(lp => lp.id === id ? { ...lp, [field]: value } : lp));
  }
  function deleteLp(id: number) { setLearningPaths(p => p.filter(lp => lp.id !== id)); }
  function addLp() {
    if (!newLp.name.trim()) return;
    setLearningPaths(p => [...p, {
      id: Date.now(), name: newLp.name.trim(), grade: newLp.grade.trim(),
      subject: newLp.subject.trim(), modules: newLp.modules || '0', duration: newLp.duration.trim() || '0 weeks',
      status: 'Draft', enabled: true,
    }]);
    setNewLp({ name: '', grade: '', subject: '', modules: '', duration: '' });
    setShowAddLp(false);
  }

  // ─── Content Library — interactive stats table ───
  const [contentStats, setContentStats] = useState<ContentStatRow[]>(defaultContentStats);
  const [csSearch, setCsSearch] = useState('');
  const [csPage, setCsPage] = useState(1);
  const [showAddCs, setShowAddCs] = useState(false);
  const [newCs, setNewCs] = useState({ subject: '', videos: '', quizzes: '', documents: '' });

  const filteredCs = contentStats.filter(c => {
    const q = csSearch.toLowerCase();
    return !q || c.subject.toLowerCase().includes(q);
  });
  const pagedCs = filteredCs.slice((csPage - 1) * PAGE_SIZE, csPage * PAGE_SIZE);

  // Computed totals from contentStats data
  const totalVideos = contentStats.reduce((s, c) => s + parseInt(c.videos || '0'), 0);
  const totalQuizzes = contentStats.reduce((s, c) => s + parseInt(c.quizzes || '0'), 0);
  const totalDocuments = contentStats.reduce((s, c) => s + parseInt(c.documents || '0'), 0);
  const totalMaterials = totalVideos + totalQuizzes + totalDocuments;

  function updateCs(id: number, field: keyof ContentStatRow, value: string | boolean) {
    setContentStats(p => p.map(c => c.id === id ? { ...c, [field]: value } : c));
  }
  function deleteCs(id: number) { setContentStats(p => p.filter(c => c.id !== id)); }
  function addCs() {
    if (!newCs.subject.trim()) return;
    setContentStats(p => [...p, {
      id: Date.now(), subject: newCs.subject.trim(), videos: newCs.videos || '0',
      quizzes: newCs.quizzes || '0', documents: newCs.documents || '0', enabled: true,
    }]);
    setNewCs({ subject: '', videos: '', quizzes: '', documents: '' });
    setShowAddCs(false);
  }

  // ─── Student Engagement ───
  const [trackVideoWatch, setTrackVideoWatch] = useState(true);
  const [trackQuizScores, setTrackQuizScores] = useState(true);
  const [engagementReports, setEngagementReports] = useState(true);

  // ─── Certificates ───
  const [autoCertificates, setAutoCertificates] = useState(false);

  // ─── AI Features ───
  const [aiRecommendations, setAiRecommendations] = useState(false);
  const [adaptiveQuiz, setAdaptiveQuiz] = useState(false);

  // ─── Save ───
  const [saved, setSaved] = useState(false);

  // ─── Tabs ───
  const [internalTab, setInternalTab] = useState<TabId>('content');
  const activeTab = (externalTab as TabId) || internalTab;
  const setActiveTab = (tab: TabId) => { if (onTabChange) onTabChange(tab); else setInternalTab(tab); };

  return (
    <div className="space-y-4">
      <ModuleHeader title="LMS / E-Learning Configuration" subtitle="Learning management system, content library, and engagement tracking" theme={theme} />

      {activeTab === 'content' && (<div className="space-y-4">
      {/* ─── LMS Settings ─── */}
      <SectionCard title="LMS Settings" subtitle="Core LMS module toggles and upload limits" theme={theme}>
        <div className="space-y-2">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Enable LMS Module</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Activate the learning management system for the school</p>
            </div>
            <SSAToggle on={enableLMS} onChange={() => setEnableLMS(!enableLMS)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Allow teacher content uploads (PDF, PPTX, Video)</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Teachers can upload study materials directly</p>
            </div>
            <SSAToggle on={allowUploads} onChange={() => setAllowUploads(!allowUploads)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Enable Quiz Builder</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Teachers can create MCQ and subjective quizzes</p>
            </div>
            <SSAToggle on={enableQuizBuilder} onChange={() => setEnableQuizBuilder(!enableQuizBuilder)} theme={theme} />
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max Upload Size (MB)</p>
            <InputField value={maxUploadSize} onChange={setMaxUploadSize} theme={theme} type="number" />
          </div>
        </div>
      </SectionCard>

      {/* ─── Learning Paths — Full Interactive Table ─── */}
      <SectionCard title="Learning Paths" subtitle="Structured learning journeys for students — add, edit, manage paths" theme={theme}>
        <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg} mb-3`}>
          <div>
            <p className={`text-xs font-bold ${theme.highlight}`}>Enable Learning Paths</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Create guided learning sequences with milestones</p>
          </div>
          <SSAToggle on={enableLearningPaths} onChange={() => setEnableLearningPaths(!enableLearningPaths)} theme={theme} />
        </div>
        {enableLearningPaths && (
          <>
            <TableToolbar
              search={lpSearch} onSearch={v => { setLpSearch(v); setLpPage(1); }}
              count={filteredLps.length} label="learning paths"
              onAdd={() => setShowAddLp(true)}
              onExport={() => alert('Export learning paths to CSV')}
              onImport={() => alert('Import learning paths from CSV')}
              theme={theme}
            />

            {/* Add Learning Path Form */}
            {showAddLp && (
              <div className={`p-3 rounded-xl border-2 border-blue-200 ${theme.secondaryBg} mb-3 space-y-2`}>
                <p className={`text-xs font-bold ${theme.highlight}`}>Add Learning Path</p>
                <div className="grid grid-cols-3 gap-2">
                  <InputField value={newLp.name} onChange={v => setNewLp(p => ({ ...p, name: v }))} placeholder="Path Name *" theme={theme} />
                  <InputField value={newLp.grade} onChange={v => setNewLp(p => ({ ...p, grade: v }))} placeholder="Grade (e.g. Grade 10)" theme={theme} />
                  <InputField value={newLp.subject} onChange={v => setNewLp(p => ({ ...p, subject: v }))} placeholder="Subject(s)" theme={theme} />
                  <InputField value={newLp.modules} onChange={v => setNewLp(p => ({ ...p, modules: v }))} placeholder="# Modules" type="number" theme={theme} />
                  <InputField value={newLp.duration} onChange={v => setNewLp(p => ({ ...p, duration: v }))} placeholder="Duration (e.g. 12 weeks)" theme={theme} />
                </div>
                <div className="flex gap-2 mt-2">
                  <button onClick={addLp} disabled={!newLp.name.trim()}
                    className={`px-4 py-2 rounded-xl text-xs font-bold ${theme.primary} text-white disabled:opacity-50`}>
                    <Plus size={12} className="inline mr-1" />Add Path
                  </button>
                  <button onClick={() => setShowAddLp(false)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border ${theme.border} ${theme.iconColor}`}>Cancel</button>
                </div>
              </div>
            )}

            {/* Learning Paths Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead><tr className={theme.secondaryBg}>
                  {['Path Name', 'Grade', 'Subject', 'Modules', 'Duration', 'Status', 'Enabled', ''].map(h => (
                    <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor} whitespace-nowrap`}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {pagedLps.length === 0 ? (
                    <tr><td colSpan={8} className={`text-center py-6 text-xs ${theme.iconColor}`}>No learning paths found</td></tr>
                  ) : pagedLps.map(lp => (
                    <tr key={lp.id} className={`border-t ${theme.border} ${!lp.enabled ? 'opacity-50' : ''}`}>
                      <td className="px-1 py-1.5">
                        <input value={lp.name} onChange={e => updateLp(lp.id, 'name', e.target.value)}
                          className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                      </td>
                      <td className="px-1 py-1.5">
                        <input value={lp.grade} onChange={e => updateLp(lp.id, 'grade', e.target.value)}
                          className={`w-24 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                      </td>
                      <td className="px-1 py-1.5">
                        <input value={lp.subject} onChange={e => updateLp(lp.id, 'subject', e.target.value)}
                          className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                      </td>
                      <td className="px-1 py-1.5">
                        <input value={lp.modules} type="number" onChange={e => updateLp(lp.id, 'modules', e.target.value)}
                          className={`w-14 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                      </td>
                      <td className="px-1 py-1.5">
                        <input value={lp.duration} onChange={e => updateLp(lp.id, 'duration', e.target.value)}
                          className={`w-24 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                      </td>
                      <td className="px-1 py-1.5">
                        <select value={lp.status} onChange={e => updateLp(lp.id, 'status', e.target.value)}
                          className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] font-bold ${theme.highlight} outline-none`}>
                          {LP_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                      <td className="px-2 py-1.5">
                        <SSAToggle on={lp.enabled} onChange={() => updateLp(lp.id, 'enabled', !lp.enabled)} theme={theme} />
                      </td>
                      <td className="px-1 py-1.5">
                        <button onClick={() => deleteLp(lp.id)} className="text-red-400 hover:text-red-600"><X size={12} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination page={lpPage} total={filteredLps.length} pageSize={PAGE_SIZE} onChange={setLpPage} theme={theme} />
          </>
        )}
      </SectionCard>

      {/* ─── Content Library Overview — Interactive Stats Table ─── */}
      <SectionCard title="Content Library Overview" subtitle="Summary of uploaded learning materials — editable per-subject breakdown" theme={theme}>
        {/* Dynamic Summary Stats */}
        <div className="grid grid-cols-4 gap-3 mb-3">
          {[
            { label: 'Total Materials', value: totalMaterials, color: 'text-blue-600' },
            { label: 'Videos', value: totalVideos, color: 'text-purple-600' },
            { label: 'Quizzes', value: totalQuizzes, color: 'text-emerald-600' },
            { label: 'Documents', value: totalDocuments, color: 'text-amber-600' },
          ].map((s, i) => (
            <div key={i} className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
              <p className={`text-[10px] ${theme.iconColor} mb-1`}>{s.label}</p>
              <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        <TableToolbar
          search={csSearch} onSearch={v => { setCsSearch(v); setCsPage(1); }}
          count={filteredCs.length} label="subjects"
          onAdd={() => setShowAddCs(true)}
          onExport={() => alert('Export content stats to CSV')}
          onImport={() => alert('Import content stats from CSV')}
          theme={theme}
        />

        {/* Add Content Stat Form */}
        {showAddCs && (
          <div className={`p-3 rounded-xl border-2 border-blue-200 ${theme.secondaryBg} mb-3 space-y-2`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Add Subject Content</p>
            <div className="grid grid-cols-4 gap-2">
              <InputField value={newCs.subject} onChange={v => setNewCs(p => ({ ...p, subject: v }))} placeholder="Subject Name *" theme={theme} />
              <InputField value={newCs.videos} onChange={v => setNewCs(p => ({ ...p, videos: v }))} placeholder="Videos" type="number" theme={theme} />
              <InputField value={newCs.quizzes} onChange={v => setNewCs(p => ({ ...p, quizzes: v }))} placeholder="Quizzes" type="number" theme={theme} />
              <InputField value={newCs.documents} onChange={v => setNewCs(p => ({ ...p, documents: v }))} placeholder="Documents" type="number" theme={theme} />
            </div>
            <div className="flex gap-2 mt-2">
              <button onClick={addCs} disabled={!newCs.subject.trim()}
                className={`px-4 py-2 rounded-xl text-xs font-bold ${theme.primary} text-white disabled:opacity-50`}>
                <Plus size={12} className="inline mr-1" />Add Subject
              </button>
              <button onClick={() => setShowAddCs(false)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border ${theme.border} ${theme.iconColor}`}>Cancel</button>
            </div>
          </div>
        )}

        {/* Content Stats Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Subject', 'Videos', 'Quizzes', 'Documents', 'Total', 'Enabled', ''].map(h => (
                <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor} whitespace-nowrap`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {pagedCs.length === 0 ? (
                <tr><td colSpan={7} className={`text-center py-6 text-xs ${theme.iconColor}`}>No subjects found</td></tr>
              ) : pagedCs.map(c => {
                const rowTotal = parseInt(c.videos || '0') + parseInt(c.quizzes || '0') + parseInt(c.documents || '0');
                return (
                  <tr key={c.id} className={`border-t ${theme.border} ${!c.enabled ? 'opacity-50' : ''}`}>
                    <td className="px-1 py-1.5">
                      <input value={c.subject} onChange={e => updateCs(c.id, 'subject', e.target.value)}
                        className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                    </td>
                    <td className="px-1 py-1.5">
                      <input value={c.videos} type="number" onChange={e => updateCs(c.id, 'videos', e.target.value)}
                        className={`w-14 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                    </td>
                    <td className="px-1 py-1.5">
                      <input value={c.quizzes} type="number" onChange={e => updateCs(c.id, 'quizzes', e.target.value)}
                        className={`w-14 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                    </td>
                    <td className="px-1 py-1.5">
                      <input value={c.documents} type="number" onChange={e => updateCs(c.id, 'documents', e.target.value)}
                        className={`w-14 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                    </td>
                    <td className={`px-2 py-1.5 text-xs font-bold ${theme.highlight}`}>{rowTotal}</td>
                    <td className="px-2 py-1.5">
                      <SSAToggle on={c.enabled} onChange={() => updateCs(c.id, 'enabled', !c.enabled)} theme={theme} />
                    </td>
                    <td className="px-1 py-1.5">
                      <button onClick={() => deleteCs(c.id)} className="text-red-400 hover:text-red-600"><X size={12} /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Pagination page={csPage} total={filteredCs.length} pageSize={PAGE_SIZE} onChange={setCsPage} theme={theme} />

        {/* Visual bar chart — now computed from editable data */}
        <div className={`p-3 rounded-xl ${theme.accentBg} border ${theme.border} mt-3`}>
          <p className={`text-[10px] font-bold ${theme.iconColor} mb-2 uppercase tracking-wide`}>By Subject (visual)</p>
          <div className="space-y-1.5">
            {contentStats.filter(c => c.enabled).map((s, i) => {
              const count = parseInt(s.videos || '0') + parseInt(s.quizzes || '0') + parseInt(s.documents || '0');
              return (
                <div key={i} className="flex items-center gap-2">
                  <span className={`text-[10px] w-24 ${theme.highlight}`}>{s.subject}</span>
                  <div className="flex-1 h-3 rounded-full bg-gray-200">
                    <div className={`h-3 rounded-full ${theme.primary}`} style={{ width: totalMaterials > 0 ? `${(count / totalMaterials) * 100}%` : '0%' }} />
                  </div>
                  <span className={`text-[10px] font-bold ${theme.iconColor} w-6 text-right`}>{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </SectionCard>

      {/* ─── AI Features ─── */}
      <SectionCard title="AI Features" subtitle="AI-powered learning enhancements (future phases)" theme={theme}>
        <div className="space-y-2">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex items-center gap-2">
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>AI Content Recommendations</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Suggest relevant content based on student performance</p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[9px] font-bold">Phase 2</span>
            </div>
            <SSAToggle on={aiRecommendations} onChange={() => setAiRecommendations(!aiRecommendations)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex items-center gap-2">
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Adaptive Quiz Difficulty</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Automatically adjust quiz difficulty based on student responses</p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[9px] font-bold">Phase 2</span>
            </div>
            <SSAToggle on={adaptiveQuiz} onChange={() => setAdaptiveQuiz(!adaptiveQuiz)} theme={theme} />
          </div>
        </div>
      </SectionCard>
      </div>)}

      {activeTab === 'engagement' && (<div className="space-y-4">
      {/* ─── Student Engagement ─── */}
      <SectionCard title="Student Engagement" subtitle="Track how students interact with LMS content" theme={theme}>
        <div className="space-y-2">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Track video watch %</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Record how much of each video a student has watched</p>
            </div>
            <SSAToggle on={trackVideoWatch} onChange={() => setTrackVideoWatch(!trackVideoWatch)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Track quiz scores</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Record and analyze quiz performance over time</p>
            </div>
            <SSAToggle on={trackQuizScores} onChange={() => setTrackQuizScores(!trackQuizScores)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Generate engagement reports</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Auto-generate weekly student engagement summaries</p>
            </div>
            <SSAToggle on={engagementReports} onChange={() => setEngagementReports(!engagementReports)} theme={theme} />
          </div>
        </div>
      </SectionCard>

      {/* ─── Certificates ─── */}
      <SectionCard title="Certificates" subtitle="Auto-generate certificates for course completion" theme={theme}>
        <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg} mb-3`}>
          <div>
            <p className={`text-xs font-bold ${theme.highlight}`}>Auto-generate course completion certificates</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Students receive a certificate when they complete a learning path</p>
          </div>
          <SSAToggle on={autoCertificates} onChange={() => setAutoCertificates(!autoCertificates)} theme={theme} />
        </div>
        {autoCertificates && (
          <div className={`p-3 rounded-xl ${theme.accentBg} border ${theme.border}`}>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Template Preview</p>
            <div className={`h-24 rounded-lg ${theme.secondaryBg} flex items-center justify-center border-2 border-dashed ${theme.border}`}>
              <span className={`text-[10px] ${theme.iconColor}`}>Certificate of Completion — [Student Name] — [Course Name]</span>
            </div>
          </div>
        )}
      </SectionCard>
      </div>)}

      {activeTab === 'settings' && (<div className="space-y-4">
      <SectionCard title="Role-Based Permissions" subtitle="Control who can view, create, edit, delete, import, and export" theme={theme}>
        <div className="space-y-4">
          <MasterPermissionGrid masterName="Course Categories" roles={['Super Admin', 'Principal', 'School Admin', 'Teacher', 'Accountant']} theme={theme} />
        </div>
      </SectionCard>

      <SectionCard title="Bulk Import" subtitle="Import data from Excel templates" theme={theme}>
        <BulkImportWizard entityName="Courses" templateFields={['Course Name', 'Category', 'Instructor', 'Duration', 'Target Class']} sampleData={[['Advanced Mathematics', 'STEM', 'Mr. Patel', '12 weeks', 'Grade 10']]} theme={theme} />
      </SectionCard>
      </div>)}

      {/* ─── Save Configuration Button ─── */}
      <div className="flex justify-end">
        <button
          onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
          className={`flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold text-white ${theme.primary} hover:opacity-90 transition-all`}>
          <Save size={14} /> Save Configuration
        </button>
        {saved && <span className="text-green-500 text-xs font-medium animate-pulse ml-3 self-center">Saved!</span>}
      </div>
    </div>
  );
}
