'use client';

import React, { useState } from 'react';
import { Search, Plus, Trash2, Download, Upload, Save, Eye, X, Calendar, FileText, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import { BulkImportWizard } from '@/components/shared';
import type { Theme } from '../_helpers/types';

// ─── Types ─────────────────────────────────────────
type ScheduledReport = {
  id: number;
  name: string;
  frequency: string;
  recipients: string;
  format: string;
  lastRun: string;
  nextRun: string;
  enabled: boolean;
};

type DataSourceKey = 'Students' | 'Staff' | 'Fees' | 'Attendance' | 'Exams' | 'Transport' | 'Library' | 'Inventory' | 'Hostel' | 'Enquiry';

const DATA_SOURCE_DESCRIPTIONS: Record<DataSourceKey, string> = {
  Students: 'Student master, demographics, enrollment, class/section data',
  Staff: 'Staff profiles, departments, designations, employment details',
  Fees: 'Fee collection, dues, concessions, receipts, pending balances',
  Attendance: 'Daily attendance, absenteeism trends, leave records, bio logs',
  Exams: 'Marks, grades, result sheets, pass/fail statistics per exam',
  Transport: 'Route-wise ridership, bus utilization, stop-wise student counts',
  Library: 'Book issues, returns, overdue records, fine collection',
  Inventory: 'Stock levels, purchase orders, consumption, low-stock alerts',
  Hostel: 'Resident count, room occupancy, warden assignments',
  Enquiry: 'Lead pipeline, conversion rates, admission funnel per stage',
};

const COLUMNS_BY_SOURCE: Record<DataSourceKey, string[]> = {
  Students: ['Name', 'Roll No', 'Class', 'Section', 'Gender', 'DOB', 'Contact', 'Address', 'Category'],
  Staff: ['Name', 'Employee ID', 'Department', 'Designation', 'Date of Joining', 'Salary Grade'],
  Fees: ['Student Name', 'Class', 'Fee Head', 'Due Amount', 'Paid Amount', 'Balance', 'Due Date'],
  Attendance: ['Student/Staff', 'Date', 'Status', 'In-Time', 'Out-Time', 'Leave Type'],
  Exams: ['Student Name', 'Subject', 'Max Marks', 'Obtained Marks', 'Grade', 'Rank'],
  Transport: ['Route', 'Bus No', 'Driver', 'Stop', 'Students Count'],
  Library: ['Book Title', 'ISBN', 'Borrower', 'Issue Date', 'Return Date', 'Fine'],
  Inventory: ['Item Name', 'Category', 'Stock Qty', 'Reorder Level', 'Unit Price'],
  Hostel: ['Room No', 'Student Name', 'Check-in Date', 'Floor', 'Block'],
  Enquiry: ['Lead Name', 'Source', 'Class Applied', 'Stage', 'Assigned To', 'Follow-up Date'],
};

const FREQUENCIES = ['Daily', 'Weekly', 'Bi-weekly', 'Monthly', 'Quarterly', 'Half-yearly', 'Yearly', 'Custom'];
const FORMATS = ['PDF', 'Excel', 'CSV', 'HTML'];
const PAGE_SIZE = 5;

// ─── Sub-component: Toolbar ─────────────────────────
function TableToolbar({
  search, onSearch, count, label, onAdd, onExport, onImport, theme,
}: {
  search: string; onSearch: (v: string) => void; count: number; label: string;
  onAdd: () => void; onExport: () => void; onImport: () => void; theme: Theme;
}) {
  return (
    <div className="flex items-center gap-2 mb-3 flex-wrap">
      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${theme.border} ${theme.inputBg} flex-1 min-w-[180px]`}>
        <Search size={13} className={theme.iconColor} />
        <input value={search} onChange={e => onSearch(e.target.value)} placeholder={`Search ${label}...`}
          className={`flex-1 bg-transparent text-xs ${theme.highlight} outline-none placeholder-gray-400`} />
        {search && <button onClick={() => onSearch('')}><X size={12} className="text-gray-400 hover:text-red-400" /></button>}
      </div>
      <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${theme.secondaryBg} ${theme.iconColor} shrink-0`}>{count} records</span>
      <button onClick={onAdd} className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-white ${theme.primary} hover:opacity-90`}>
        <Plus size={12} /> Add
      </button>
      <button onClick={onExport} className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border ${theme.border} ${theme.iconColor} ${theme.buttonHover}`}>
        <Download size={12} /> Export
      </button>
      <button onClick={onImport} className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border ${theme.border} ${theme.iconColor} ${theme.buttonHover}`}>
        <Upload size={12} /> Import
      </button>
    </div>
  );
}

// ─── Sub-component: Pagination ──────────────────────
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

type TabId = 'builder' | 'scheduling' | 'settings';

// ─── Main Module ────────────────────────────────────
export default function ReportEngineConfigModule({ theme, activeTab: externalTab, onTabChange }: { theme: Theme; activeTab?: string; onTabChange?: (tab: string) => void }) {

  // ── Existing toggles ─────────────────────────────
  const [scheduledEmail, setScheduledEmail] = useState(true);
  const [exportFormats, setExportFormats] = useState<Record<string, boolean>>({
    'PDF': true, 'Excel': true, 'CSV': true, 'Google Sheets': false,
  });
  const [recipients, setRecipients] = useState<Record<string, boolean>>({
    'Admin': true, 'Principal': true, 'Trustee': false,
  });
  const [autoGenerate, setAutoGenerate] = useState<Record<string, boolean>>({
    'Daily summary': false, 'Weekly summary': true, 'Monthly summary': true,
  });
  const [savedFiltersEnabled, setSavedFiltersEnabled] = useState(false);
  const [maxSavedFilters, setMaxSavedFilters] = useState('10');
  const [filterSharing, setFilterSharing] = useState(true);

  // ── Scheduled Reports CRUD ────────────────────────
  const [scheduledReports, setScheduledReports] = useState<ScheduledReport[]>([
    { id: 1, name: 'Daily Attendance Summary', frequency: 'Daily', recipients: 'Principal, Admin', format: 'PDF', lastRun: '04 Mar 2026', nextRun: '05 Mar 2026', enabled: true },
    { id: 2, name: 'Weekly Fee Collection Report', frequency: 'Weekly', recipients: 'Accountant, Trustee', format: 'Excel', lastRun: '28 Feb 2026', nextRun: '07 Mar 2026', enabled: true },
    { id: 3, name: 'Monthly Exam Results Digest', frequency: 'Monthly', recipients: 'Principal, Teachers', format: 'PDF', lastRun: '01 Feb 2026', nextRun: '01 Mar 2026', enabled: false },
    { id: 4, name: 'Transport Utilisation Report', frequency: 'Weekly', recipients: 'Transport Head, Admin', format: 'CSV', lastRun: '28 Feb 2026', nextRun: '07 Mar 2026', enabled: true },
    { id: 5, name: 'Staff Attendance & Leave Summary', frequency: 'Monthly', recipients: 'HR, Principal', format: 'Excel', lastRun: '01 Feb 2026', nextRun: '01 Mar 2026', enabled: true },
    { id: 6, name: 'Library Overdue Notice', frequency: 'Weekly', recipients: 'Librarian, Admin', format: 'PDF', lastRun: '28 Feb 2026', nextRun: '07 Mar 2026', enabled: false },
    { id: 7, name: 'Quarterly Academic Progress', frequency: 'Quarterly', recipients: 'Trustee, Principal', format: 'PDF', lastRun: '01 Jan 2026', nextRun: '01 Apr 2026', enabled: true },
  ]);
  const [reportSearch, setReportSearch] = useState('');
  const [reportPage, setReportPage] = useState(1);
  const [showAddReport, setShowAddReport] = useState(false);
  const [editReportId, setEditReportId] = useState<number | null>(null);
  const [newReport, setNewReport] = useState({ name: '', frequency: 'Weekly', recipients: '', format: 'PDF' });

  const filteredReports = scheduledReports.filter(r =>
    r.name.toLowerCase().includes(reportSearch.toLowerCase()) ||
    r.recipients.toLowerCase().includes(reportSearch.toLowerCase())
  );
  const pagedReports = filteredReports.slice((reportPage - 1) * PAGE_SIZE, reportPage * PAGE_SIZE);

  function addReport() {
    if (!newReport.name.trim()) return;
    const id = Date.now();
    setScheduledReports(p => [...p, {
      id, name: newReport.name, frequency: newReport.frequency,
      recipients: newReport.recipients, format: newReport.format,
      lastRun: '—', nextRun: 'Pending', enabled: true,
    }]);
    setNewReport({ name: '', frequency: 'Weekly', recipients: '', format: 'PDF' });
    setShowAddReport(false);
  }

  function deleteReport(id: number) {
    setScheduledReports(p => p.filter(r => r.id !== id));
  }

  function toggleReport(id: number) {
    setScheduledReports(p => p.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  }

  // ── Data Source selector ──────────────────────────
  const [activeSources, setActiveSources] = useState<Record<DataSourceKey, boolean>>({
    Students: true, Staff: true, Fees: true, Attendance: true, Exams: true,
    Transport: false, Library: false, Inventory: false, Hostel: false, Enquiry: false,
  });

  // ── Report Builder ────────────────────────────────
  const [builderSource, setBuilderSource] = useState<DataSourceKey>('Students');
  const [builderColumns, setBuilderColumns] = useState<Record<string, boolean>>({
    'Name': true, 'Roll No': true, 'Class': true, 'Section': false, 'Gender': false,
    'DOB': false, 'Contact': false, 'Address': false, 'Category': false,
  });
  const [builderFormat, setBuilderFormat] = useState('PDF');
  const [showPreview, setShowPreview] = useState(false);
  const [builderReportName, setBuilderReportName] = useState('');

  const [internalTab, setInternalTab] = useState<TabId>('builder');
  const activeTab = (externalTab as TabId) || internalTab;
  const setActiveTab = (tab: TabId) => { if (onTabChange) onTabChange(tab); else setInternalTab(tab); };

  function onBuilderSourceChange(src: DataSourceKey) {
    setBuilderSource(src);
    const cols = COLUMNS_BY_SOURCE[src];
    const init: Record<string, boolean> = {};
    cols.forEach((c, i) => { init[c] = i < 3; });
    setBuilderColumns(init);
    setShowPreview(false);
  }

  const selectedColumns = Object.entries(builderColumns).filter(([, on]) => on).map(([c]) => c);

  return (
    <div className="space-y-4">
      <ModuleHeader title="Report Engine Configuration" subtitle="Scheduled reports, export formats, recipients, and auto-generation" theme={theme} />

      {/* ── builder tab ──────────────────────────────── */}
      {activeTab === 'builder' && (
        <div className="space-y-4">

          {/* ── Report Builder ────────────────────────── */}
          <SectionCard title="Report Builder" subtitle="Select a data source, pick columns, preview, and save as a scheduled report" theme={theme}>
            <div className="space-y-4">
              {/* Step 1: Pick source */}
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Step 1 — Select Data Source</p>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(activeSources) as DataSourceKey[]).filter(s => activeSources[s]).map(src => (
                    <button key={src} onClick={() => onBuilderSourceChange(src)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${builderSource === src ? `${theme.primary} text-white border-transparent` : `${theme.border} ${theme.iconColor} ${theme.buttonHover}`}`}>
                      {src}
                    </button>
                  ))}
                  {(Object.keys(activeSources) as DataSourceKey[]).filter(s => activeSources[s]).length === 0 && (
                    <p className={`text-[10px] ${theme.iconColor} italic`}>No data sources enabled — enable them in the Data Sources section above</p>
                  )}
                </div>
              </div>

              {/* Step 2: Pick columns */}
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Step 2 — Select Columns <span className={`font-normal ml-1`}>({selectedColumns.length} selected)</span></p>
                <div className="flex flex-wrap gap-2">
                  {COLUMNS_BY_SOURCE[builderSource].map(col => (
                    <label key={col} className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border cursor-pointer text-xs font-medium transition-all
                      ${builderColumns[col] ? `${theme.primary} text-white border-transparent` : `${theme.border} ${theme.iconColor} ${theme.buttonHover}`}`}>
                      <input type="checkbox" checked={!!builderColumns[col]} onChange={() => setBuilderColumns(p => ({ ...p, [col]: !p[col] }))}
                        className="hidden" />
                      {col}
                    </label>
                  ))}
                </div>
              </div>

              {/* Step 3: Format + Name + Preview */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Step 3 — Output Format</p>
                  <SelectField options={FORMATS} value={builderFormat} onChange={setBuilderFormat} theme={theme} />
                </div>
                <div className="col-span-2">
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Report Name (optional — to save as scheduled)</p>
                  <InputField value={builderReportName} onChange={setBuilderReportName} placeholder="e.g. Class-wise Student Roster" theme={theme} />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 flex-wrap">
                <button onClick={() => setShowPreview(!showPreview)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border ${theme.border} ${theme.iconColor} ${theme.buttonHover}`}>
                  <Eye size={13} /> {showPreview ? 'Hide Preview' : 'Preview Report'}
                </button>
                <button
                  onClick={() => {
                    if (!builderReportName.trim()) { alert('Enter a report name to save'); return; }
                    setScheduledReports(p => [...p, {
                      id: Date.now(), name: builderReportName, frequency: 'Manual',
                      recipients: '—', format: builderFormat, lastRun: '—', nextRun: 'On-demand', enabled: true,
                    }]);
                    setBuilderReportName('');
                    alert('Report saved to Scheduled Reports!');
                  }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white ${theme.primary} hover:opacity-90`}>
                  <Save size={13} /> Save as Scheduled Report
                </button>
                <button
                  onClick={() => alert(`Generating ${builderFormat} with columns: ${selectedColumns.join(', ')}`)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border ${theme.border} ${theme.iconColor} ${theme.buttonHover}`}>
                  <Download size={13} /> Generate &amp; Download
                </button>
              </div>

              {/* Preview table */}
              {showPreview && selectedColumns.length > 0 && (
                <div className={`rounded-xl border ${theme.border} overflow-hidden`}>
                  <div className={`px-3 py-2 ${theme.secondaryBg} flex items-center justify-between`}>
                    <span className={`text-xs font-bold ${theme.highlight}`}>Preview — {builderSource} ({selectedColumns.length} columns)</span>
                    <span className={`text-[10px] ${theme.iconColor}`}>Sample data only</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className={theme.secondaryBg}>
                          {selectedColumns.map(c => (
                            <th key={c} className={`text-left px-3 py-2 font-bold ${theme.iconColor} whitespace-nowrap border-r ${theme.border}`}>{c}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {[1, 2, 3].map(row => (
                          <tr key={row} className={`border-t ${theme.border}`}>
                            {selectedColumns.map(c => (
                              <td key={c} className={`px-3 py-1.5 ${theme.iconColor} whitespace-nowrap`}>
                                {c === 'Name' ? ['Aarav Shah', 'Priya Mehta', 'Rohit Kumar'][row - 1] :
                                 c === 'Roll No' ? `${String(row).padStart(3, '0')}` :
                                 c === 'Class' ? ['Grade 5', 'Grade 7', 'Grade 9'][row - 1] :
                                 c === 'Section' ? ['A', 'B', 'A'][row - 1] :
                                 c === 'Gender' ? ['M', 'F', 'M'][row - 1] :
                                 '—'}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </SectionCard>

          {/* ── Available Data Sources ────────────────── */}
          <SectionCard title="Available Data Sources" subtitle="Select which data sources are available for report generation and the Report Builder" theme={theme}>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(DATA_SOURCE_DESCRIPTIONS) as DataSourceKey[]).map(src => (
                <label key={src} className={`flex items-start gap-3 p-3 rounded-xl border ${theme.border} cursor-pointer hover:${theme.secondaryBg} transition-colors ${activeSources[src] ? theme.secondaryBg : ''}`}>
                  <input
                    type="checkbox"
                    checked={activeSources[src]}
                    onChange={() => setActiveSources(p => ({ ...p, [src]: !p[src] }))}
                    className="accent-emerald-500 w-3.5 h-3.5 mt-0.5 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-bold ${activeSources[src] ? theme.highlight : theme.iconColor}`}>{src}</p>
                    <p className={`text-[10px] ${theme.iconColor} leading-relaxed mt-0.5`}>{DATA_SOURCE_DESCRIPTIONS[src]}</p>
                  </div>
                </label>
              ))}
            </div>
          </SectionCard>

          {/* ── Saved Filters ────────────────────────── */}
          <SectionCard title="Saved Filters" subtitle="Allow users to save and reuse report filter configurations" theme={theme}>
            <div className="space-y-3">
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>Enable Saved Filters</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Users can save filter combinations and quickly re-apply them</p>
                </div>
                <SSAToggle on={savedFiltersEnabled} onChange={() => setSavedFiltersEnabled(!savedFiltersEnabled)} theme={theme} />
              </div>
              {savedFiltersEnabled && (
                <>
                  <div>
                    <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max Saved Filters per User</p>
                    <InputField value={maxSavedFilters} onChange={setMaxSavedFilters} theme={theme} type="number" />
                  </div>
                  <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                    <div className="flex-1 mr-3">
                      <p className={`text-xs font-bold ${theme.highlight}`}>Allow Filter Sharing</p>
                      <p className={`text-[10px] ${theme.iconColor}`}>Users can share saved filters with other staff members</p>
                    </div>
                    <SSAToggle on={filterSharing} onChange={() => setFilterSharing(!filterSharing)} theme={theme} />
                  </div>
                </>
              )}
            </div>
          </SectionCard>

          {/* ── Export Formats ────────────────────────── */}
          <SectionCard title="Export Formats" subtitle="Which file formats are available when downloading reports" theme={theme}>
            <div className="space-y-2">
              {Object.entries(exportFormats).map(([fmt, enabled]) => (
                <div key={fmt} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <div className="flex-1 mr-3">
                    <p className={`text-xs font-bold ${theme.highlight}`}>{fmt}</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>{
                      ({
                        'PDF': 'Download reports as formatted PDF documents — best for printing and sharing',
                        'Excel': 'Download as Excel spreadsheets — best for further analysis and filtering',
                        'CSV': 'Download as CSV files — lightweight format for data import/export',
                        'Google Sheets': 'Export directly to Google Sheets — best for collaborative editing',
                      } as Record<string, string>)[fmt]
                    }</p>
                  </div>
                  <SSAToggle on={enabled} onChange={() => setExportFormats(p => ({ ...p, [fmt]: !p[fmt] }))} theme={theme} />
                </div>
              ))}
            </div>
          </SectionCard>

        </div>
      )}

      {/* ── scheduling tab ───────────────────────────── */}
      {activeTab === 'scheduling' && (
        <div className="space-y-4">

          {/* ── Scheduled Reports Master Table ────────── */}
          <SectionCard title="Scheduled Reports" subtitle="Create and manage automated reports delivered on a schedule" theme={theme}>
            <TableToolbar
              search={reportSearch} onSearch={v => { setReportSearch(v); setReportPage(1); }}
              count={filteredReports.length} label="reports"
              onAdd={() => setShowAddReport(true)}
              onExport={() => alert('Export scheduled reports as CSV')}
              onImport={() => alert('Import scheduled reports from CSV')}
              theme={theme}
            />

            {/* Add / Edit form */}
            {showAddReport && (
              <div className={`mb-3 p-3 rounded-xl border ${theme.border} ${theme.secondaryBg} space-y-2`}>
                <p className={`text-xs font-bold ${theme.highlight} mb-2`}>{editReportId ? 'Edit Report' : 'New Scheduled Report'}</p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Report Name</p>
                    <InputField value={newReport.name} onChange={v => setNewReport(p => ({ ...p, name: v }))} placeholder="e.g. Monthly Fee Summary" theme={theme} />
                  </div>
                  <div>
                    <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Frequency</p>
                    <SelectField options={FREQUENCIES} value={newReport.frequency} onChange={v => setNewReport(p => ({ ...p, frequency: v }))} theme={theme} />
                  </div>
                  <div>
                    <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Recipients (roles/names)</p>
                    <InputField value={newReport.recipients} onChange={v => setNewReport(p => ({ ...p, recipients: v }))} placeholder="e.g. Principal, Admin" theme={theme} />
                  </div>
                  <div>
                    <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Output Format</p>
                    <SelectField options={FORMATS} value={newReport.format} onChange={v => setNewReport(p => ({ ...p, format: v }))} theme={theme} />
                  </div>
                </div>
                <div className="flex gap-2 mt-1">
                  <button onClick={addReport} className={`flex items-center gap-1 px-4 py-1.5 rounded-xl text-xs font-bold text-white ${theme.primary} hover:opacity-90`}>
                    <Save size={12} /> Save Report
                  </button>
                  <button onClick={() => { setShowAddReport(false); setEditReportId(null); setNewReport({ name: '', frequency: 'Weekly', recipients: '', format: 'PDF' }); }}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold border ${theme.border} ${theme.iconColor} ${theme.buttonHover}`}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className={theme.secondaryBg}>
                    {['Report Name', 'Frequency', 'Recipients', 'Format', 'Last Run', 'Next Run', 'Status', ''].map(h => (
                      <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor} whitespace-nowrap`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pagedReports.length === 0 ? (
                    <tr><td colSpan={8} className={`text-center py-6 text-xs ${theme.iconColor}`}>No scheduled reports found</td></tr>
                  ) : pagedReports.map(r => (
                    <tr key={r.id} className={`border-t ${theme.border} hover:${theme.secondaryBg} transition-colors`}>
                      <td className={`px-3 py-2 font-semibold ${theme.highlight} max-w-[180px]`}>
                        <div className="flex items-center gap-1.5">
                          <FileText size={11} className={theme.iconColor} />
                          <span className="truncate">{r.name}</span>
                        </div>
                      </td>
                      <td className={`px-3 py-2 ${theme.iconColor}`}>
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${theme.secondaryBg}`}>{r.frequency}</span>
                      </td>
                      <td className={`px-3 py-2 ${theme.iconColor} max-w-[140px] truncate`}>{r.recipients}</td>
                      <td className="px-3 py-2">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${r.format === 'PDF' ? 'bg-red-50 text-red-600' : r.format === 'Excel' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>{r.format}</span>
                      </td>
                      <td className={`px-3 py-2 text-[10px] ${theme.iconColor} whitespace-nowrap`}>
                        <div className="flex items-center gap-1"><Calendar size={10} />{r.lastRun}</div>
                      </td>
                      <td className={`px-3 py-2 text-[10px] ${theme.iconColor} whitespace-nowrap`}>
                        <div className="flex items-center gap-1"><RefreshCw size={10} />{r.nextRun}</div>
                      </td>
                      <td className="px-3 py-2">
                        <SSAToggle on={r.enabled} onChange={() => toggleReport(r.id)} theme={theme} />
                      </td>
                      <td className="px-2 py-2">
                        <button onClick={() => deleteReport(r.id)} className="text-red-400 hover:text-red-600">
                          <Trash2 size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination page={reportPage} total={filteredReports.length} pageSize={PAGE_SIZE} onChange={setReportPage} theme={theme} />
          </SectionCard>

          {/* ── Auto-Generate Reports ─────────────────── */}
          <SectionCard title="Auto-Generate Reports" subtitle="System automatically creates reports on a schedule — no manual effort needed" theme={theme}>
            <div className="space-y-2">
              {Object.entries(autoGenerate).map(([period, enabled]) => (
                <div key={period} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <div className="flex-1 mr-3">
                    <p className={`text-xs font-bold ${theme.highlight}`}>{period}</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>{
                      ({
                        'Daily summary': 'End-of-day report covering attendance, fee collection, and key events',
                        'Weekly summary': 'Weekly digest with attendance trends, pending fees, and upcoming deadlines',
                        'Monthly summary': 'Comprehensive monthly report with analytics across all modules',
                      } as Record<string, string>)[period]
                    }</p>
                  </div>
                  <SSAToggle on={enabled} onChange={() => setAutoGenerate(p => ({ ...p, [period]: !p[period] }))} theme={theme} />
                </div>
              ))}
            </div>
          </SectionCard>

          {/* ── Email Reports ────────────────────────── */}
          <SectionCard title="Email Reports" subtitle="Schedule automatic email delivery of reports" theme={theme}>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>Scheduled email reports</p>
                <p className={`text-[10px] ${theme.iconColor}`}>System automatically emails report summaries to recipients on schedule</p>
              </div>
              <SSAToggle on={scheduledEmail} onChange={() => setScheduledEmail(!scheduledEmail)} theme={theme} />
            </div>
          </SectionCard>

          {/* ── Report Recipients ─────────────────────── */}
          <SectionCard title="Report Recipients" subtitle="Who receives scheduled reports via email" theme={theme}>
            <div className="space-y-2">
              {Object.entries(recipients).map(([role, enabled]) => (
                <div key={role} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <div className="flex-1 mr-3">
                    <p className={`text-xs font-bold ${theme.highlight}`}>{role}</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>{
                      ({
                        'Admin': 'School admin receives operational reports (attendance, fees, inventory)',
                        'Principal': 'Principal receives academic and performance summary reports',
                        'Trustee': 'Trustee/management receives financial and compliance overview reports',
                      } as Record<string, string>)[role]
                    }</p>
                  </div>
                  <SSAToggle on={enabled} onChange={() => setRecipients(p => ({ ...p, [role]: !p[role] }))} theme={theme} />
                </div>
              ))}
            </div>
          </SectionCard>

        </div>
      )}

      {/* ── settings tab ─────────────────────────────── */}
      {activeTab === 'settings' && (
        <div className="space-y-4">

          {/* ── Bulk Import ───────────────────────────── */}
          <SectionCard title="Bulk Import" subtitle="Import scheduled report configurations from a template" theme={theme}>
            <BulkImportWizard
              entityName="Scheduled Reports"
              templateFields={['Report Name', 'Frequency', 'Recipients', 'Format', 'Enabled']}
              sampleData={[['Daily Attendance Summary', 'Daily', 'Principal, Admin', 'PDF', 'Yes']]}
              theme={theme}
            />
          </SectionCard>

        </div>
      )}

      {/* ── Save Button ──────────────────────────────── */}
      <div className="flex justify-end pt-2">
        <button
          onClick={() => alert('Report Engine configuration saved!')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white ${theme.primary} hover:opacity-90 transition-all shadow-sm`}>
          <Save size={15} /> Save Configuration
        </button>
      </div>

    </div>
  );
}
