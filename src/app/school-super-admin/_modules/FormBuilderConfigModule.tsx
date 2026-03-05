'use client';

import React, { useState } from 'react';
import {
  Type, Hash, Mail, Phone, CalendarDays, ChevronDown, ListChecks, CheckSquare,
  CircleDot, Upload, PenTool, AlignLeft, Star, MapPin,
  Plus, X, Search, Download, Save, ChevronLeft, ChevronRight
} from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, SelectField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

// ─── Types ─────────────────────────────────────────
interface FormTemplate {
  id: number;
  name: string;
  typeCategory: string;
  fields: number;
  status: 'Active' | 'Draft' | 'Archived';
  createdDate: string;
  enabled: boolean;
}

const FIELD_TYPES = [
  { name: 'Text Input', icon: Type },
  { name: 'Number', icon: Hash },
  { name: 'Email', icon: Mail },
  { name: 'Phone', icon: Phone },
  { name: 'Date Picker', icon: CalendarDays },
  { name: 'Dropdown', icon: ChevronDown },
  { name: 'Multi-select', icon: ListChecks },
  { name: 'Checkbox', icon: CheckSquare },
  { name: 'Radio Button', icon: CircleDot },
  { name: 'File Upload', icon: Upload },
  { name: 'Signature', icon: PenTool },
  { name: 'Rich Text', icon: AlignLeft },
  { name: 'Rating Scale', icon: Star },
  { name: 'Location (GPS)', icon: MapPin },
];

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

type TabId = 'builder' | 'management';

// ─── Main Module ────────────────────────────────────
export default function FormBuilderConfigModule({ theme, activeTab: externalTab, onTabChange }: { theme: Theme; activeTab?: string; onTabChange?: (tab: string) => void }) {
  // ─── Form Builder Settings ────────────────────────
  const [builderEnabled, setBuilderEnabled] = useState(true);
  const [maxFields, setMaxFields] = useState('50');
  const [conditionalLogic, setConditionalLogic] = useState(true);
  const [fileUpload, setFileUpload] = useState(true);
  const [maxFileSize, setMaxFileSize] = useState('10MB');
  const [responseValidation, setResponseValidation] = useState(true);

  // ─── Field Types ──────────────────────────────────
  const [fieldToggles, setFieldToggles] = useState<Record<string, boolean>>(() => {
    const defaults: Record<string, boolean> = {};
    FIELD_TYPES.forEach(f => { defaults[f.name] = true; });
    return defaults;
  });

  // ─── Templates Library (CRUD) ─────────────────────
  const [templates, setTemplates] = useState<FormTemplate[]>([
    { id: 1, name: 'Student Registration Form', typeCategory: 'Admission', fields: 18, status: 'Active', createdDate: '2025-08-12', enabled: true },
    { id: 2, name: 'Staff Onboarding Form', typeCategory: 'HR', fields: 14, status: 'Active', createdDate: '2025-09-01', enabled: true },
    { id: 3, name: 'Parent Feedback Form', typeCategory: 'Feedback', fields: 10, status: 'Active', createdDate: '2025-10-15', enabled: true },
    { id: 4, name: 'Leave Application', typeCategory: 'Leave', fields: 8, status: 'Active', createdDate: '2025-07-20', enabled: true },
    { id: 5, name: 'Event Registration', typeCategory: 'Events', fields: 12, status: 'Active', createdDate: '2025-11-05', enabled: true },
    { id: 6, name: 'Complaint Form', typeCategory: 'Grievance', fields: 9, status: 'Draft', createdDate: '2026-01-10', enabled: true },
    { id: 7, name: 'Health Declaration', typeCategory: 'Health', fields: 15, status: 'Active', createdDate: '2025-06-01', enabled: true },
  ]);
  const [templateSearch, setTemplateSearch] = useState('');
  const [templatePage, setTemplatePage] = useState(1);

  const filteredTemplates = templates.filter(t =>
    t.name.toLowerCase().includes(templateSearch.toLowerCase()) ||
    t.typeCategory.toLowerCase().includes(templateSearch.toLowerCase()) ||
    t.status.toLowerCase().includes(templateSearch.toLowerCase())
  );
  const pagedTemplates = filteredTemplates.slice((templatePage - 1) * PAGE_SIZE, templatePage * PAGE_SIZE);

  function updateTemplate(id: number, field: keyof FormTemplate, value: string | number | boolean) {
    setTemplates(p => p.map(t => t.id === id ? { ...t, [field]: value } : t));
  }
  function deleteTemplate(id: number) {
    setTemplates(p => p.filter(t => t.id !== id));
  }
  function addTemplate() {
    setTemplates(p => [...p, {
      id: Date.now(), name: '', typeCategory: 'General', fields: 0,
      status: 'Draft' as const, createdDate: new Date().toISOString().split('T')[0], enabled: true
    }]);
    const newTotal = filteredTemplates.length + 1;
    const newTotalPages = Math.ceil(newTotal / PAGE_SIZE);
    setTemplatePage(newTotalPages);
  }

  // ─── Response & Analytics ─────────────────────────
  const [responseCollection, setResponseCollection] = useState(true);
  const [exportFormat, setExportFormat] = useState('Excel');
  const [formAnalytics, setFormAnalytics] = useState(true);
  const [workflowIntegration, setWorkflowIntegration] = useState(true);
  const [responseNotifyTo, setResponseNotifyTo] = useState('Form Creator');

  // ─── Tab state ───
  const [internalTab, setInternalTab] = useState<TabId>('builder');
  const activeTab = (externalTab as TabId) || internalTab;
  const setActiveTab = (tab: TabId) => { if (onTabChange) onTabChange(tab); else setInternalTab(tab); };

  // ─── Save state ───
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-4">
      <ModuleHeader title="Form Builder Configuration" subtitle="Drag-and-drop form designer, field types, templates, and response analytics" theme={theme} />

      {activeTab === 'builder' && (<div className="space-y-4">
      {/* Row 1: Form Builder Settings + Field Types */}
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Form Builder Settings" subtitle="Core form builder configuration and limits" theme={theme}>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Enable Form Builder</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Allow creating custom forms</p>
              </div>
              <SSAToggle on={builderEnabled} onChange={() => setBuilderEnabled(!builderEnabled)} theme={theme} />
            </div>
            {builderEnabled && (
              <>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max Fields Per Form</p>
                  <SelectField options={['10', '20', '50', 'Unlimited']} value={maxFields} onChange={setMaxFields} theme={theme} />
                </div>
                <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <div>
                    <p className={`text-xs font-bold ${theme.highlight}`}>Conditional Logic</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>Show/hide fields based on answers</p>
                  </div>
                  <SSAToggle on={conditionalLogic} onChange={() => setConditionalLogic(!conditionalLogic)} theme={theme} />
                </div>
                <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <div>
                    <p className={`text-xs font-bold ${theme.highlight}`}>File Upload in Forms</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>Allow respondents to upload files</p>
                  </div>
                  <SSAToggle on={fileUpload} onChange={() => setFileUpload(!fileUpload)} theme={theme} />
                </div>
                {fileUpload && (
                  <div>
                    <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max File Size</p>
                    <SelectField options={['5MB', '10MB', '25MB']} value={maxFileSize} onChange={setMaxFileSize} theme={theme} />
                  </div>
                )}
                <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <div>
                    <p className={`text-xs font-bold ${theme.highlight}`}>Response Validation</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>Validate inputs before submission</p>
                  </div>
                  <SSAToggle on={responseValidation} onChange={() => setResponseValidation(!responseValidation)} theme={theme} />
                </div>
              </>
            )}
          </div>
        </SectionCard>

        <SectionCard title="Field Types Available" subtitle="Toggle which field types are available in the form builder" theme={theme}>
          <div className="grid grid-cols-2 gap-2">
            {FIELD_TYPES.map(ft => {
              const Icon = ft.icon;
              return (
                <div key={ft.name} className={`flex items-center justify-between p-2 rounded-xl ${theme.secondaryBg}`}>
                  <div className="flex items-center gap-2">
                    <Icon size={14} className={theme.iconColor} />
                    <p className={`text-xs font-medium ${theme.highlight}`}>{ft.name}</p>
                  </div>
                  <SSAToggle on={fieldToggles[ft.name]} onChange={() => setFieldToggles(p => ({ ...p, [ft.name]: !p[ft.name] }))} theme={theme} />
                </div>
              );
            })}
          </div>
        </SectionCard>
      </div>
      </div>)}

      {activeTab === 'management' && (<div className="space-y-4">
      {/* Row 2: Templates Library (full width interactive table) */}
      <SectionCard title="Templates Library" subtitle="Pre-built form templates ready to use" theme={theme}>
        <TableToolbar
          search={templateSearch} onSearch={v => { setTemplateSearch(v); setTemplatePage(1); }}
          count={filteredTemplates.length} label="templates"
          onAdd={addTemplate}
          onExport={() => alert('Export templates as CSV')}
          onImport={() => alert('Import templates from CSV')}
          theme={theme}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className={theme.secondaryBg}>
                {['Template Name', 'Type / Category', 'Fields', 'Status', 'Created Date', 'Enabled', ''].map(h => (
                  <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor} whitespace-nowrap`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pagedTemplates.length === 0 ? (
                <tr><td colSpan={7} className={`text-center py-6 text-xs ${theme.iconColor}`}>No templates found</td></tr>
              ) : pagedTemplates.map(t => (
                <tr key={t.id} className={`border-t ${theme.border} ${!t.enabled ? 'opacity-50' : ''}`}>
                  <td className="px-2 py-1.5">
                    <input value={t.name}
                      onChange={e => updateTemplate(t.id, 'name', e.target.value)}
                      className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`}
                      placeholder="Template name" />
                  </td>
                  <td className="px-2 py-1.5">
                    <select value={t.typeCategory} onChange={e => updateTemplate(t.id, 'typeCategory', e.target.value)}
                      className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}>
                      {['General', 'Admission', 'HR', 'Feedback', 'Leave', 'Events', 'Grievance', 'Health', 'Transport', 'Finance'].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-2 py-1.5">
                    <input value={t.fields} type="number"
                      onChange={e => updateTemplate(t.id, 'fields', parseInt(e.target.value) || 0)}
                      className={`w-16 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <select value={t.status} onChange={e => updateTemplate(t.id, 'status', e.target.value)}
                      className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}>
                      {['Active', 'Draft', 'Archived'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-2 py-1.5">
                    <input value={t.createdDate} type="date"
                      onChange={e => updateTemplate(t.id, 'createdDate', e.target.value)}
                      className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-3 py-2">
                    <SSAToggle on={t.enabled} onChange={() => updateTemplate(t.id, 'enabled', !t.enabled)} theme={theme} />
                  </td>
                  <td className="px-2 py-1.5">
                    <button onClick={() => deleteTemplate(t.id)} className="text-red-400 hover:text-red-600">
                      <X size={12} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={templatePage} total={filteredTemplates.length} pageSize={PAGE_SIZE} onChange={setTemplatePage} theme={theme} />
      </SectionCard>

      {/* Row 3: Response & Analytics */}
      <SectionCard title="Response & Analytics" subtitle="Response collection, export, analytics, and workflow integration" theme={theme}>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Response Collection</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Store form submissions in database</p>
              </div>
              <SSAToggle on={responseCollection} onChange={() => setResponseCollection(!responseCollection)} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Export Format</p>
              <SelectField options={['CSV', 'Excel', 'PDF']} value={exportFormat} onChange={setExportFormat} theme={theme} />
            </div>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Form Analytics</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Track views, submissions, drop-off rate</p>
              </div>
              <SSAToggle on={formAnalytics} onChange={() => setFormAnalytics(!formAnalytics)} theme={theme} />
            </div>
          </div>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Workflow Integration</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Auto-trigger approval on form submission</p>
              </div>
              <SSAToggle on={workflowIntegration} onChange={() => setWorkflowIntegration(!workflowIntegration)} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Response Notifications</p>
              <SelectField options={['Form Creator', 'Admin', 'Custom Email']} value={responseNotifyTo} onChange={setResponseNotifyTo} theme={theme} />
            </div>
          </div>
        </div>
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
