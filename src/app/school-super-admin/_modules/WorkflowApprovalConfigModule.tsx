'use client';

import React, { useState } from 'react';
import { Plus, X, Search, Download, Upload, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Save, User } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

// ─── Types ─────────────────────────────────────────
type ApproverStep = {
  id: number;
  level: number;
  approverName: string;
  role: string;
};

type ApprovalTemplate = {
  id: number;
  name: string;
  steps: ApproverStep[];
  autoEscalation: boolean;
  slaHours: string;
  enabled: boolean;
};

type ApprovalRule = {
  id: number;
  name: string;
  condition: string;
  action: string;
  enabled: boolean;
};

type ModuleIntegrationEntry = {
  id: number;
  module: string;
  workflowCount: string;
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
        className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border border-emerald-300 text-emerald-600 hover:bg-emerald-50 shrink-0">
        <Download size={12} /> Export
      </button>
      <button onClick={onImport}
        className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border border-blue-300 text-blue-600 hover:bg-blue-50 shrink-0">
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

// ─── Available Approvers (mock staff) ──────────────
const availableApprovers = [
  { name: 'Mr. Rajesh Sharma', role: 'Principal' },
  { name: 'Mrs. Priya Patel', role: 'Vice Principal' },
  { name: 'Mr. Arun Gupta', role: 'HOD - Science' },
  { name: 'Mrs. Sunita Iyer', role: 'HOD - Languages' },
  { name: 'Mr. Deepak Joshi', role: 'Admin Officer' },
  { name: 'Mrs. Kavita Das', role: 'Accounts Head' },
  { name: 'Mr. Vikram Singh', role: 'Trustee' },
  { name: 'Mrs. Meena Nair', role: 'Coordinator' },
  { name: 'Mr. Suresh Verma', role: 'School Admin' },
  { name: 'Mrs. Ritu Mehta', role: 'Class Teacher' },
];

const availableRoles = ['Principal', 'Vice Principal', 'HOD', 'Coordinator', 'Admin Officer', 'Accounts Head', 'Trustee', 'School Admin', 'Class Teacher', 'Teacher'];

type TabId = 'builder' | 'rules';

// ─── Main Module ────────────────────────────────────
export default function WorkflowApprovalConfigModule({ theme, activeTab: externalTab, onTabChange }: { theme: Theme; activeTab?: string; onTabChange?: (tab: string) => void }) {
  // ─── Workflow Engine Settings ─────────────────────
  const [engineEnabled, setEngineEnabled] = useState(true);
  const [escalationHours, setEscalationHours] = useState('48');
  const [slaTracking, setSlaTracking] = useState(true);
  const [notificationMethod, setNotificationMethod] = useState('All');
  const [batchApproval, setBatchApproval] = useState(true);
  const [versionControl, setVersionControl] = useState(true);

  // ─── Approval Chain Templates (with named approvers) ───
  const [templates, setTemplates] = useState<ApprovalTemplate[]>([
    {
      id: 1, name: 'Leave Request', autoEscalation: true, slaHours: '24', enabled: true,
      steps: [
        { id: 1, level: 1, approverName: 'Mrs. Sunita Iyer', role: 'HOD - Languages' },
        { id: 2, level: 2, approverName: 'Mrs. Priya Patel', role: 'Vice Principal' },
        { id: 3, level: 3, approverName: 'Mr. Rajesh Sharma', role: 'Principal' },
      ],
    },
    {
      id: 2, name: 'Fee Waiver', autoEscalation: true, slaHours: '48', enabled: true,
      steps: [
        { id: 1, level: 1, approverName: 'Mrs. Kavita Das', role: 'Accounts Head' },
        { id: 2, level: 2, approverName: 'Mr. Rajesh Sharma', role: 'Principal' },
        { id: 3, level: 3, approverName: 'Mr. Vikram Singh', role: 'Trustee' },
      ],
    },
    {
      id: 3, name: 'Transfer Certificate', autoEscalation: false, slaHours: '72', enabled: true,
      steps: [
        { id: 1, level: 1, approverName: 'Mrs. Ritu Mehta', role: 'Class Teacher' },
        { id: 2, level: 2, approverName: 'Mr. Rajesh Sharma', role: 'Principal' },
      ],
    },
    {
      id: 4, name: 'Purchase Request', autoEscalation: true, slaHours: '48', enabled: true,
      steps: [
        { id: 1, level: 1, approverName: 'Mr. Deepak Joshi', role: 'Admin Officer' },
        { id: 2, level: 2, approverName: 'Mr. Suresh Verma', role: 'School Admin' },
        { id: 3, level: 3, approverName: 'Mrs. Kavita Das', role: 'Accounts Head' },
        { id: 4, level: 4, approverName: 'Mr. Rajesh Sharma', role: 'Principal' },
      ],
    },
  ]);
  const [tplSearch, setTplSearch] = useState('');
  const [tplPage, setTplPage] = useState(1);
  const [expandedTemplate, setExpandedTemplate] = useState<number | null>(null);

  const filteredTemplates = templates.filter(t =>
    t.name.toLowerCase().includes(tplSearch.toLowerCase())
  );
  const pagedTemplates = filteredTemplates.slice((tplPage - 1) * PAGE_SIZE, tplPage * PAGE_SIZE);

  function addTemplate() {
    setTemplates(p => [...p, {
      id: Date.now(), name: 'New Template', autoEscalation: false, slaHours: '48', enabled: true,
      steps: [{ id: Date.now(), level: 1, approverName: '', role: '' }],
    }]);
  }
  function updateTemplate(id: number, field: string, value: string | boolean) {
    setTemplates(p => p.map(t => t.id === id ? { ...t, [field]: value } : t));
  }
  function deleteTemplate(id: number) {
    setTemplates(p => p.filter(t => t.id !== id));
    if (expandedTemplate === id) setExpandedTemplate(null);
  }
  function toggleTemplateEnabled(id: number) {
    setTemplates(p => p.map(t => t.id === id ? { ...t, enabled: !t.enabled } : t));
  }
  function addApproverStep(templateId: number) {
    setTemplates(p => p.map(t => {
      if (t.id !== templateId) return t;
      const newLevel = t.steps.length + 1;
      return { ...t, steps: [...t.steps, { id: Date.now(), level: newLevel, approverName: '', role: '' }] };
    }));
  }
  function updateApproverStep(templateId: number, stepId: number, field: keyof ApproverStep, value: string | number) {
    setTemplates(p => p.map(t => {
      if (t.id !== templateId) return t;
      return { ...t, steps: t.steps.map(s => s.id === stepId ? { ...s, [field]: value } : s) };
    }));
  }
  function deleteApproverStep(templateId: number, stepId: number) {
    setTemplates(p => p.map(t => {
      if (t.id !== templateId) return t;
      const updated = t.steps.filter(s => s.id !== stepId);
      return { ...t, steps: updated.map((s, i) => ({ ...s, level: i + 1 })) };
    }));
  }

  // ─── Approval Rules (full master table) ──────────
  const [rules, setRules] = useState<ApprovalRule[]>([
    { id: 1, name: 'Conditional Routing', condition: 'Route based on amount, type, or department', action: 'Dynamic chain selection', enabled: true },
    { id: 2, name: 'Parallel Approval', condition: 'Multiple approvers at same level', action: 'All must approve simultaneously', enabled: false },
    { id: 3, name: 'Delegation / Proxy', condition: 'Approver absent or on leave', action: 'Delegate to assigned proxy', enabled: true },
    { id: 4, name: 'Auto-Approve Below Threshold', condition: 'Amount < INR 5,000', action: 'Skip approval, auto-approve', enabled: true },
    { id: 5, name: 'Audit Trail', condition: 'Any approval action taken', action: 'Log timestamp, user, action, comments', enabled: true },
    { id: 6, name: 'Weekend Skip', condition: 'SLA falls on weekend/holiday', action: 'Extend SLA by non-working days', enabled: true },
  ]);
  const [ruleSearch, setRuleSearch] = useState('');
  const [rulePage, setRulePage] = useState(1);

  const filteredRules = rules.filter(r =>
    r.name.toLowerCase().includes(ruleSearch.toLowerCase()) ||
    r.condition.toLowerCase().includes(ruleSearch.toLowerCase())
  );
  const pagedRules = filteredRules.slice((rulePage - 1) * PAGE_SIZE, rulePage * PAGE_SIZE);

  function addRule() {
    setRules(p => [...p, { id: Date.now(), name: '', condition: '', action: '', enabled: true }]);
  }
  function updateRule(id: number, field: keyof ApprovalRule, value: string | boolean) {
    setRules(p => p.map(r => r.id === id ? { ...r, [field]: value } : r));
  }
  function deleteRule(id: number) {
    setRules(p => p.filter(r => r.id !== id));
  }

  // ─── Module Integration (full master table) ──────
  const [moduleIntegration, setModuleIntegration] = useState<ModuleIntegrationEntry[]>([
    { id: 1, module: 'Fees', workflowCount: '3', enabled: true },
    { id: 2, module: 'HR (Leave/Payroll)', workflowCount: '5', enabled: true },
    { id: 3, module: 'Admissions', workflowCount: '2', enabled: true },
    { id: 4, module: 'Transport', workflowCount: '0', enabled: false },
    { id: 5, module: 'Inventory', workflowCount: '2', enabled: true },
    { id: 6, module: 'Certificates', workflowCount: '2', enabled: true },
    { id: 7, module: 'Academic (Results)', workflowCount: '0', enabled: false },
    { id: 8, module: 'Documents', workflowCount: '1', enabled: true },
  ]);
  const [modSearch, setModSearch] = useState('');
  const [modPage, setModPage] = useState(1);

  const [internalTab, setInternalTab] = useState<TabId>('builder');
  const activeTab = (externalTab as TabId) || internalTab;
  const setActiveTab = (tab: TabId) => { if (onTabChange) onTabChange(tab); else setInternalTab(tab); };

  const filteredModules = moduleIntegration.filter(m =>
    m.module.toLowerCase().includes(modSearch.toLowerCase())
  );
  const pagedModules = filteredModules.slice((modPage - 1) * PAGE_SIZE, modPage * PAGE_SIZE);

  function addModuleEntry() {
    setModuleIntegration(p => [...p, { id: Date.now(), module: '', workflowCount: '0', enabled: true }]);
  }
  function updateModuleEntry(id: number, field: keyof ModuleIntegrationEntry, value: string | boolean) {
    setModuleIntegration(p => p.map(m => m.id === id ? { ...m, [field]: value } : m));
  }
  function deleteModuleEntry(id: number) {
    setModuleIntegration(p => p.filter(m => m.id !== id));
  }

  return (
    <div className="space-y-4">
      <ModuleHeader title="Workflow & Approval Configuration" subtitle="Multi-level approval chains, escalation rules, SLA tracking, and module integration" theme={theme} />

      {activeTab === 'builder' && (<div className="space-y-4">
      {/* ─── Row 1: Engine Settings + Approval Chain Templates ─── */}
      <div className="grid grid-cols-2 gap-4">

        {/* Engine Settings (unchanged) */}
        <SectionCard title="Workflow Engine Settings" subtitle="Core engine configuration and notification preferences" theme={theme}>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Enable Workflow Engine</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Master switch for all approval workflows</p>
              </div>
              <SSAToggle on={engineEnabled} onChange={() => setEngineEnabled(!engineEnabled)} theme={theme} />
            </div>
            {engineEnabled && (
              <>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Default Escalation (hours)</p>
                  <SelectField options={['24', '48', '72']} value={escalationHours} onChange={setEscalationHours} theme={theme} />
                </div>
                <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <div>
                    <p className={`text-xs font-bold ${theme.highlight}`}>SLA Tracking</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>Track time-to-approval metrics</p>
                  </div>
                  <SSAToggle on={slaTracking} onChange={() => setSlaTracking(!slaTracking)} theme={theme} />
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Notification Method</p>
                  <SelectField options={['Email', 'SMS', 'Push', 'All']} value={notificationMethod} onChange={setNotificationMethod} theme={theme} />
                </div>
                <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <div>
                    <p className={`text-xs font-bold ${theme.highlight}`}>Batch Approval</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>Allow approving multiple requests at once</p>
                  </div>
                  <SSAToggle on={batchApproval} onChange={() => setBatchApproval(!batchApproval)} theme={theme} />
                </div>
                <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <div>
                    <p className={`text-xs font-bold ${theme.highlight}`}>Workflow Versioning</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>Track changes to workflow definitions</p>
                  </div>
                  <SSAToggle on={versionControl} onChange={() => setVersionControl(!versionControl)} theme={theme} />
                </div>
              </>
            )}
          </div>
        </SectionCard>

        {/* Approval Chain Templates (with named approvers, expandable) */}
        <SectionCard title="Approval Chain Templates" subtitle="Predefined approval chains with named approvers -- click to expand chain" theme={theme}>
          <TableToolbar
            search={tplSearch} onSearch={v => { setTplSearch(v); setTplPage(1); }}
            count={filteredTemplates.length} label="templates"
            onAdd={addTemplate}
            onExport={() => alert('Export templates as CSV')}
            onImport={() => alert('Import templates from CSV')}
            theme={theme}
          />
          <div className="space-y-2">
            {pagedTemplates.length === 0 ? (
              <p className={`text-center py-4 text-xs ${theme.iconColor}`}>No templates found</p>
            ) : pagedTemplates.map(t => {
              const isExpanded = expandedTemplate === t.id;
              return (
                <div key={t.id} className={`rounded-xl border ${theme.border} ${!t.enabled ? 'opacity-50' : ''}`}>
                  {/* Template header row */}
                  <div className={`p-2.5 ${theme.secondaryBg} rounded-t-xl ${!isExpanded ? 'rounded-b-xl' : ''}`}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2 flex-1 mr-2">
                        <button onClick={() => setExpandedTemplate(isExpanded ? null : t.id)}
                          className={`${theme.iconColor} hover:opacity-70`}>
                          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                        <input value={t.name} onChange={e => updateTemplate(t.id, 'name', e.target.value)}
                          className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold bg-blue-100 text-blue-700`}>
                          {t.steps.length} step{t.steps.length !== 1 ? 's' : ''}
                        </span>
                        <SSAToggle on={t.enabled} onChange={() => toggleTemplateEnabled(t.id)} theme={theme} />
                        <button onClick={() => deleteTemplate(t.id)} className="text-red-400 hover:text-red-600"><X size={10} /></button>
                      </div>
                    </div>
                    {/* Summary line showing chain */}
                    <p className={`text-[9px] ${theme.iconColor} ml-6`}>
                      {t.steps.map(s => s.approverName || s.role || '(unassigned)').join(' > ')}
                    </p>
                    <div className="grid grid-cols-2 gap-2 mt-2 ml-6">
                      <div>
                        <p className={`text-[9px] ${theme.iconColor} mb-0.5`}>SLA (hrs)</p>
                        <InputField value={t.slaHours} onChange={v => updateTemplate(t.id, 'slaHours', v)} theme={theme} type="number" />
                      </div>
                      <div className="flex items-end pb-0.5">
                        <div className="flex items-center gap-1">
                          <span className={`text-[9px] ${theme.iconColor}`}>Auto-esc</span>
                          <SSAToggle on={t.autoEscalation} onChange={() => updateTemplate(t.id, 'autoEscalation', !t.autoEscalation)} theme={theme} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded: Named Approver Chain */}
                  {isExpanded && (
                    <div className="p-3 space-y-2 border-t border-dashed border-blue-200 bg-blue-50/30">
                      <p className={`text-[10px] font-bold ${theme.iconColor} uppercase tracking-wide flex items-center gap-1`}>
                        <User size={10} /> Approval Chain (Named Approvers)
                      </p>
                      {t.steps.map((step, si) => (
                        <div key={step.id} className="flex items-center gap-2">
                          {/* Level badge */}
                          <span className={`text-[10px] w-6 h-6 rounded-full ${theme.primary} text-white flex items-center justify-center font-bold shrink-0`}>
                            {step.level}
                          </span>
                          {/* Approver name dropdown */}
                          <select value={step.approverName}
                            onChange={e => {
                              const selected = availableApprovers.find(a => a.name === e.target.value);
                              updateApproverStep(t.id, step.id, 'approverName', e.target.value);
                              if (selected) updateApproverStep(t.id, step.id, 'role', selected.role);
                            }}
                            className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`}>
                            <option value="">-- Select Approver --</option>
                            {availableApprovers.map(a => (
                              <option key={a.name} value={a.name}>{a.name} ({a.role})</option>
                            ))}
                          </select>
                          {/* Role (editable) */}
                          <select value={step.role}
                            onChange={e => updateApproverStep(t.id, step.id, 'role', e.target.value)}
                            className={`w-32 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.iconColor} outline-none`}>
                            <option value="">-- Role --</option>
                            {availableRoles.map(r => <option key={r} value={r}>{r}</option>)}
                          </select>
                          {/* Arrow connector (except last) */}
                          {si < t.steps.length - 1 && (
                            <span className={`text-[10px] ${theme.iconColor} shrink-0`}>then</span>
                          )}
                          {/* Delete step */}
                          <button onClick={() => deleteApproverStep(t.id, step.id)} className="text-red-400 hover:text-red-600 shrink-0">
                            <X size={10} />
                          </button>
                        </div>
                      ))}
                      <button onClick={() => addApproverStep(t.id)}
                        className={`flex items-center gap-1 text-[10px] font-bold ${theme.iconColor} ${theme.buttonHover} px-2 py-1 rounded-lg`}>
                        <Plus size={10} /> Add Level
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <Pagination page={tplPage} total={filteredTemplates.length} pageSize={PAGE_SIZE} onChange={setTplPage} theme={theme} />
        </SectionCard>
      </div>
      </div>)}

      {activeTab === 'rules' && (<div className="space-y-4">
      {/* ─── Row 2: Approval Rules + Module Integration ─── */}
      <div className="grid grid-cols-2 gap-4">

        {/* Approval Rules (full master table) */}
        <SectionCard title="Approval Rules" subtitle="Routing, delegation, auto-approval, and audit settings" theme={theme}>
          <TableToolbar
            search={ruleSearch} onSearch={v => { setRuleSearch(v); setRulePage(1); }}
            count={filteredRules.length} label="rules"
            onAdd={addRule}
            onExport={() => alert('Export rules as CSV')}
            onImport={() => alert('Import rules from CSV')}
            theme={theme}
          />
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className={theme.secondaryBg}>
                  {['Rule Name', 'Condition', 'Action', 'Enabled', ''].map(h => (
                    <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor} whitespace-nowrap`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pagedRules.length === 0 ? (
                  <tr><td colSpan={5} className={`text-center py-6 text-xs ${theme.iconColor}`}>No rules found</td></tr>
                ) : pagedRules.map(r => (
                  <tr key={r.id} className={`border-t ${theme.border} ${!r.enabled ? 'opacity-50' : ''}`}>
                    <td className="px-2 py-1.5">
                      <input value={r.name} onChange={e => updateRule(r.id, 'name', e.target.value)}
                        className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`}
                        placeholder="Rule name" />
                    </td>
                    <td className="px-2 py-1.5">
                      <input value={r.condition} onChange={e => updateRule(r.id, 'condition', e.target.value)}
                        className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight} outline-none`}
                        placeholder="When this condition..." />
                    </td>
                    <td className="px-2 py-1.5">
                      <input value={r.action} onChange={e => updateRule(r.id, 'action', e.target.value)}
                        className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight} outline-none`}
                        placeholder="Do this action..." />
                    </td>
                    <td className="px-3 py-2">
                      <SSAToggle on={r.enabled} onChange={() => updateRule(r.id, 'enabled', !r.enabled)} theme={theme} />
                    </td>
                    <td className="px-2 py-1.5">
                      <button onClick={() => deleteRule(r.id)} className="text-red-400 hover:text-red-600"><X size={12} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={rulePage} total={filteredRules.length} pageSize={PAGE_SIZE} onChange={setRulePage} theme={theme} />
        </SectionCard>

        {/* Module Integration (full master table) */}
        <SectionCard title="Module Integration" subtitle="Select which modules use the workflow approval engine" theme={theme}>
          <TableToolbar
            search={modSearch} onSearch={v => { setModSearch(v); setModPage(1); }}
            count={filteredModules.length} label="modules"
            onAdd={addModuleEntry}
            onExport={() => alert('Export module integration as CSV')}
            onImport={() => alert('Import module integration from CSV')}
            theme={theme}
          />
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className={theme.secondaryBg}>
                  {['Module', 'Workflows', 'Enabled', ''].map(h => (
                    <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor} whitespace-nowrap`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pagedModules.length === 0 ? (
                  <tr><td colSpan={4} className={`text-center py-6 text-xs ${theme.iconColor}`}>No modules found</td></tr>
                ) : pagedModules.map(m => (
                  <tr key={m.id} className={`border-t ${theme.border} ${!m.enabled ? 'opacity-50' : ''}`}>
                    <td className="px-2 py-1.5">
                      <input value={m.module} onChange={e => updateModuleEntry(m.id, 'module', e.target.value)}
                        className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`}
                        placeholder="Module name" />
                    </td>
                    <td className="px-2 py-1.5">
                      <input value={m.workflowCount} type="number"
                        onChange={e => updateModuleEntry(m.id, 'workflowCount', e.target.value)}
                        className={`w-16 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                    </td>
                    <td className="px-3 py-2">
                      <SSAToggle on={m.enabled} onChange={() => updateModuleEntry(m.id, 'enabled', !m.enabled)} theme={theme} />
                    </td>
                    <td className="px-2 py-1.5">
                      <button onClick={() => deleteModuleEntry(m.id)} className="text-red-400 hover:text-red-600"><X size={12} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={modPage} total={filteredModules.length} pageSize={PAGE_SIZE} onChange={setModPage} theme={theme} />
        </SectionCard>
      </div>
      </div>)}

      {/* ─── Save Button ─── */}
      <div className="flex justify-end pt-2">
        <button
          onClick={() => alert('Workflow configuration saved!')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white ${theme.primary} hover:opacity-90 transition-all shadow-sm`}>
          <Save size={15} /> Save Configuration
        </button>
      </div>
    </div>
  );
}
