'use client';
import React, { useState } from 'react';
import { Plus, X, Search, Download, Upload, Save, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader } from '../_helpers/components';
import { BulkImportWizard } from '@/components/shared';
import type { Theme } from '../_helpers/types';

// ─── Types ─────────────────────────────────────────
type RemarkEntry = {
  id: number;
  text: string;
  category: string;
  gradeLevel: string;
  enabled: boolean;
};

type DeadlineEntry = {
  id: number;
  gradeClass: string;
  deadlineDate: string;
  reminderDaysBefore: string;
  enabled: boolean;
};

const PAGE_SIZE = 5;

// ─── Sub-component: Table Toolbar ─────────────────
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
      <button onClick={onAdd}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-white ${theme.primary} hover:opacity-90 shrink-0`}>
        <Plus size={12} /> Add
      </button>
      <button onClick={onExport}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border ${theme.border} ${theme.iconColor} ${theme.buttonHover} shrink-0`}>
        <Download size={12} /> Export
      </button>
      <button onClick={onImport}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border ${theme.border} ${theme.iconColor} ${theme.buttonHover} shrink-0`}>
        <Upload size={12} /> Import
      </button>
    </div>
  );
}

// ─── Sub-component: Pagination ─────────────────────
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

type TabId = 'bank' | 'settings';

// ─── Main Module ────────────────────────────────────
export default function RemarkBankConfigModule({ theme, activeTab: externalTab, onTabChange }: { theme: Theme; activeTab?: string; onTabChange?: (tab: string) => void }) {
  // ─── Moderation Policy ───
  const [requireModeration, setRequireModeration] = useState(true);
  const [allowEditAfterPublish, setAllowEditAfterPublish] = useState(false);
  const [remarkTypesEnabled] = useState(['Common', 'Subject-wise', 'Exam-wise']);

  // ─── Shared Remark Bank (CRUD) ───
  const [remarks, setRemarks] = useState<RemarkEntry[]>([
    { id: 1, text: 'Shows excellent participation in class discussions', category: 'Academic', gradeLevel: 'All', enabled: true },
    { id: 2, text: 'Needs to improve focus during lectures', category: 'Academic', gradeLevel: 'All', enabled: true },
    { id: 3, text: 'Consistently completes homework on time', category: 'Academic', gradeLevel: 'Grade 1-5', enabled: true },
    { id: 4, text: 'Demonstrates good leadership qualities', category: 'Behavioral', gradeLevel: 'Grade 6-10', enabled: true },
    { id: 5, text: 'Needs to work on punctuality', category: 'Behavioral', gradeLevel: 'All', enabled: true },
    { id: 6, text: 'Irregular attendance — parents have been notified', category: 'Attendance', gradeLevel: 'All', enabled: true },
    { id: 7, text: 'Active participant in inter-school competitions', category: 'Co-curricular', gradeLevel: 'Grade 6-12', enabled: true },
    { id: 8, text: 'Outstanding performance in science exhibition', category: 'Co-curricular', gradeLevel: 'Grade 9-12', enabled: true },
    { id: 9, text: 'Shows improvement in handwriting and presentation', category: 'Academic', gradeLevel: 'Grade 1-5', enabled: true },
    { id: 10, text: 'Respectful towards peers and teachers', category: 'Behavioral', gradeLevel: 'All', enabled: true },
  ]);
  const [remarkSearch, setRemarkSearch] = useState('');
  const [remarkPage, setRemarkPage] = useState(1);

  const filteredRemarks = remarks.filter(r =>
    r.text.toLowerCase().includes(remarkSearch.toLowerCase()) ||
    r.category.toLowerCase().includes(remarkSearch.toLowerCase()) ||
    r.gradeLevel.toLowerCase().includes(remarkSearch.toLowerCase())
  );
  const pagedRemarks = filteredRemarks.slice((remarkPage - 1) * PAGE_SIZE, remarkPage * PAGE_SIZE);

  function updateRemark(id: number, field: keyof RemarkEntry, value: string | boolean) {
    setRemarks(p => p.map(r => r.id === id ? { ...r, [field]: value } : r));
  }
  function deleteRemark(id: number) {
    setRemarks(p => p.filter(r => r.id !== id));
  }
  function addRemark() {
    setRemarks(p => [...p, { id: Date.now(), text: '', category: 'Academic', gradeLevel: 'All', enabled: true }]);
    const newTotal = filteredRemarks.length + 1;
    const newTotalPages = Math.ceil(newTotal / PAGE_SIZE);
    setRemarkPage(newTotalPages);
  }

  // ─── Submission Deadlines (CRUD) ───
  const [deadlines, setDeadlines] = useState<DeadlineEntry[]>([
    { id: 1, gradeClass: 'Grade 1-5', deadlineDate: '2026-02-28', reminderDaysBefore: '7', enabled: true },
    { id: 2, gradeClass: 'Grade 6-8', deadlineDate: '2026-04-15', reminderDaysBefore: '14', enabled: true },
    { id: 3, gradeClass: 'Grade 9-10', deadlineDate: '2026-03-20', reminderDaysBefore: '10', enabled: true },
    { id: 4, gradeClass: 'Grade 11-12', deadlineDate: '2026-03-15', reminderDaysBefore: '14', enabled: true },
  ]);
  const [deadlineSearch, setDeadlineSearch] = useState('');
  const [deadlinePage, setDeadlinePage] = useState(1);

  const filteredDeadlines = deadlines.filter(d =>
    d.gradeClass.toLowerCase().includes(deadlineSearch.toLowerCase())
  );
  const pagedDeadlines = filteredDeadlines.slice((deadlinePage - 1) * PAGE_SIZE, deadlinePage * PAGE_SIZE);

  function updateDeadline(id: number, field: keyof DeadlineEntry, value: string | boolean) {
    setDeadlines(p => p.map(d => d.id === id ? { ...d, [field]: value } : d));
  }
  function deleteDeadline(id: number) {
    setDeadlines(p => p.filter(d => d.id !== id));
  }
  function addDeadline() {
    setDeadlines(p => [...p, { id: Date.now(), gradeClass: '', deadlineDate: '', reminderDaysBefore: '7', enabled: true }]);
    const newTotal = filteredDeadlines.length + 1;
    const newTotalPages = Math.ceil(newTotal / PAGE_SIZE);
    setDeadlinePage(newTotalPages);
  }

  // ─── Save state ───
  const [saved, setSaved] = useState(false);

  // ─── Tab state ───
  const [internalTab, setInternalTab] = useState<TabId>('bank');
  const activeTab = (externalTab as TabId) || internalTab;
  const setActiveTab = (tab: TabId) => { if (onTabChange) onTabChange(tab); else setInternalTab(tab); };

  return (
    <div className="space-y-4">
      <ModuleHeader title="Remark Bank Configuration" subtitle="Manage remark templates, moderation policies, and submission deadlines" theme={theme} />

      {activeTab === 'bank' && (<div className="space-y-4">
      {/* ─── Remark Moderation Policy ─── */}
      <SectionCard title="Remark Moderation Policy" subtitle="Control how remarks are reviewed before parents see them" theme={theme}>
        <div className="space-y-2">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Require admin moderation before parent visibility</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Remarks go through admin review before being visible to parents</p>
            </div>
            <SSAToggle on={requireModeration} onChange={() => setRequireModeration(!requireModeration)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Allow teachers to edit after publishing</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Teachers can modify their remarks even after they are published</p>
            </div>
            <SSAToggle on={allowEditAfterPublish} onChange={() => setAllowEditAfterPublish(!allowEditAfterPublish)} theme={theme} />
          </div>
          <div className={`p-2.5 rounded-xl ${theme.accentBg} border ${theme.border}`}>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Remark types enabled</p>
            <div className="flex gap-2">
              {remarkTypesEnabled.map(t => (
                <span key={t} className={`px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700`}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ─── Shared Remark Bank (Interactive CRUD Table) ─── */}
      <SectionCard title="Shared Remark Bank" subtitle="Pre-defined remark templates available to all teachers" theme={theme}>
        <TableToolbar
          search={remarkSearch} onSearch={v => { setRemarkSearch(v); setRemarkPage(1); }}
          count={filteredRemarks.length} label="remarks"
          onAdd={addRemark}
          onExport={() => alert('Export remarks as CSV')}
          onImport={() => alert('Import remarks from CSV')}
          theme={theme}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className={theme.secondaryBg}>
                {['Category', 'Remark Text', 'Grade Level', 'Enabled', ''].map(h => (
                  <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor} whitespace-nowrap`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pagedRemarks.length === 0 ? (
                <tr><td colSpan={5} className={`text-center py-6 text-xs ${theme.iconColor}`}>No remarks found</td></tr>
              ) : pagedRemarks.map(r => (
                <tr key={r.id} className={`border-t ${theme.border} ${!r.enabled ? 'opacity-50' : ''}`}>
                  <td className="px-2 py-1.5">
                    <select value={r.category} onChange={e => updateRemark(r.id, 'category', e.target.value)}
                      className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}>
                      {['Academic', 'Behavioral', 'Attendance', 'Co-curricular'].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-2 py-1.5">
                    <input value={r.text}
                      onChange={e => updateRemark(r.id, 'text', e.target.value)}
                      className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}
                      placeholder="Remark text" />
                  </td>
                  <td className="px-2 py-1.5">
                    <select value={r.gradeLevel} onChange={e => updateRemark(r.id, 'gradeLevel', e.target.value)}
                      className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}>
                      {['All', 'Grade 1-5', 'Grade 6-8', 'Grade 6-10', 'Grade 6-12', 'Grade 9-10', 'Grade 9-12', 'Grade 11-12'].map(g => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-3 py-2">
                    <SSAToggle on={r.enabled} onChange={() => updateRemark(r.id, 'enabled', !r.enabled)} theme={theme} />
                  </td>
                  <td className="px-2 py-1.5">
                    <button onClick={() => deleteRemark(r.id)} className="text-red-400 hover:text-red-600">
                      <X size={12} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={remarkPage} total={filteredRemarks.length} pageSize={PAGE_SIZE} onChange={setRemarkPage} theme={theme} />
      </SectionCard>

      {/* ─── Remark Submission Deadlines (Interactive CRUD Table) ─── */}
      <SectionCard title="Remark Submission Deadlines" subtitle="Deadlines for teachers to submit remarks per grade/class" theme={theme}>
        <TableToolbar
          search={deadlineSearch} onSearch={v => { setDeadlineSearch(v); setDeadlinePage(1); }}
          count={filteredDeadlines.length} label="deadlines"
          onAdd={addDeadline}
          onExport={() => alert('Export deadlines as CSV')}
          onImport={() => alert('Import deadlines from CSV')}
          theme={theme}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className={theme.secondaryBg}>
                {['Grade / Class', 'Deadline Date', 'Reminder Days Before', 'Enabled', ''].map(h => (
                  <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor} whitespace-nowrap`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pagedDeadlines.length === 0 ? (
                <tr><td colSpan={5} className={`text-center py-6 text-xs ${theme.iconColor}`}>No deadlines found</td></tr>
              ) : pagedDeadlines.map(d => (
                <tr key={d.id} className={`border-t ${theme.border} ${!d.enabled ? 'opacity-50' : ''}`}>
                  <td className="px-2 py-1.5">
                    <input value={d.gradeClass}
                      onChange={e => updateDeadline(d.id, 'gradeClass', e.target.value)}
                      className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`}
                      placeholder="Grade / Class" />
                  </td>
                  <td className="px-2 py-1.5">
                    <input value={d.deadlineDate} type="date"
                      onChange={e => updateDeadline(d.id, 'deadlineDate', e.target.value)}
                      className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <input value={d.reminderDaysBefore} type="number"
                      onChange={e => updateDeadline(d.id, 'reminderDaysBefore', e.target.value)}
                      className={`w-20 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`}
                      placeholder="Days" />
                  </td>
                  <td className="px-3 py-2">
                    <SSAToggle on={d.enabled} onChange={() => updateDeadline(d.id, 'enabled', !d.enabled)} theme={theme} />
                  </td>
                  <td className="px-2 py-1.5">
                    <button onClick={() => deleteDeadline(d.id)} className="text-red-400 hover:text-red-600">
                      <X size={12} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={deadlinePage} total={filteredDeadlines.length} pageSize={PAGE_SIZE} onChange={setDeadlinePage} theme={theme} />
      </SectionCard>
      </div>)}

      {activeTab === 'settings' && (<div className="space-y-4">
      <SectionCard title="Role-Based Permissions" subtitle="Managed centrally in Roles & Permission module" theme={theme}>
        <div className={`flex items-center gap-3 p-3 rounded-xl ${theme.accentBg} border ${theme.border}`}>
          <div className="flex-1">
            <p className={`text-xs ${theme.iconColor}`}>Role & permission settings for Remark Bank are configured in <span className={`font-bold ${theme.primaryText}`}>Roles & Permission Management</span></p>
          </div>
          <ArrowRight size={16} className={theme.iconColor} />
        </div>
      </SectionCard>

      <SectionCard title="Bulk Import" subtitle="Import data from Excel templates" theme={theme}>
        <BulkImportWizard entityName="Remarks" templateFields={['Category', 'Remark Text', 'Applicable To', 'Tone']} sampleData={[['Academic', 'Shows excellent analytical thinking', 'Student', 'Positive']]} theme={theme} />
      </SectionCard>
      </div>)}

      {/* ─── Save Configuration ─── */}
      <div className="flex justify-end">
        <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
          className={`flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-sm font-bold text-white ${theme.primary} hover:opacity-90 transition-all`}>
          <Save size={14} /> Save Configuration
        </button>
        {saved && <span className="ml-3 text-green-500 text-xs font-medium self-center animate-pulse">Saved!</span>}
      </div>
    </div>
  );
}
