'use client';

import React, { useState } from 'react';
import { X, Plus, Search, Download, Upload, Save, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField } from '../_helpers/components';
import { BulkImportWizard } from '@/components/shared';
import type { Theme } from '../_helpers/types';

// ─── Types ─────────────────────────────────────────
type LeaveType = {
  id: number;
  type: string;
  days: string;
  carryForward: boolean;
  maxCarry: string;
  enabled: boolean;
};

type ApprovalStep = {
  id: number;
  level: number;
  approver: string;
  timeLimit: string;
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

// ─── Main Module ────────────────────────────────────
type TabId = 'types' | 'approval' | 'settings';

export default function LeaveConfigModule({ theme, activeTab: externalTab, onTabChange }: { theme: Theme; activeTab?: string; onTabChange?: (tab: string) => void }) {

  // ── Leave Types ────────────────────────────────────
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([
    { id: 1, type: 'Casual Leave (CL)', days: '12', carryForward: false, maxCarry: '0', enabled: true },
    { id: 2, type: 'Sick Leave (SL)', days: '10', carryForward: true, maxCarry: '5', enabled: true },
    { id: 3, type: 'Earned Leave (EL)', days: '15', carryForward: true, maxCarry: '30', enabled: true },
    { id: 4, type: 'Maternity Leave', days: '180', carryForward: false, maxCarry: '0', enabled: true },
    { id: 5, type: 'Paternity Leave', days: '15', carryForward: false, maxCarry: '0', enabled: true },
    { id: 6, type: 'Compensatory Off', days: '0', carryForward: false, maxCarry: '0', enabled: true },
  ]);
  const [leaveSearch, setLeaveSearch] = useState('');
  const [leavePage, setLeavePage] = useState(1);
  const [internalTab, setInternalTab] = useState<TabId>('types');
  const activeTab = (externalTab as TabId) || internalTab;
  const setActiveTab = (tab: TabId) => { if (onTabChange) onTabChange(tab); else setInternalTab(tab); };

  const filteredLeaveTypes = leaveTypes.filter(lt =>
    lt.type.toLowerCase().includes(leaveSearch.toLowerCase())
  );
  const pagedLeaveTypes = filteredLeaveTypes.slice((leavePage - 1) * PAGE_SIZE, leavePage * PAGE_SIZE);

  function updateLeaveType(id: number, field: keyof LeaveType, value: string | boolean) {
    setLeaveTypes(p => p.map(lt => lt.id === id ? { ...lt, [field]: value } : lt));
  }
  function deleteLeaveType(id: number) {
    setLeaveTypes(p => p.filter(lt => lt.id !== id));
  }
  function addLeaveType() {
    setLeaveTypes(p => [...p, { id: Date.now(), type: '', days: '0', carryForward: false, maxCarry: '0', enabled: true }]);
  }

  // ── Leave Rules ─────────────────────────────────────
  const [sandwichRule, setSandwichRule] = useState(true);
  const [halfDayLeave, setHalfDayLeave] = useState(true);
  const [maxConsecutive, setMaxConsecutive] = useState('5');
  const [lwpThreshold, setLwpThreshold] = useState('3');

  // ── Teaching Staff Approval Chain ──────────────────
  const [approvalChain, setApprovalChain] = useState<ApprovalStep[]>([
    { id: 1, level: 1, approver: 'HOD / Coordinator', timeLimit: '24 hours', enabled: true },
    { id: 2, level: 2, approver: 'Vice Principal', timeLimit: '48 hours', enabled: true },
    { id: 3, level: 3, approver: 'Principal', timeLimit: '72 hours', enabled: true },
  ]);
  const [teachSearch, setTeachSearch] = useState('');
  const [teachPage, setTeachPage] = useState(1);

  const filteredTeach = approvalChain.filter(a =>
    a.approver.toLowerCase().includes(teachSearch.toLowerCase())
  );
  const pagedTeach = filteredTeach.slice((teachPage - 1) * PAGE_SIZE, teachPage * PAGE_SIZE);

  function updateTeachStep(id: number, field: keyof ApprovalStep, value: string | boolean) {
    setApprovalChain(p => p.map(a => a.id === id ? { ...a, [field]: value } : a));
  }
  function deleteTeachStep(id: number) {
    setApprovalChain(p => {
      const updated = p.filter(a => a.id !== id);
      return updated.map((a, i) => ({ ...a, level: i + 1 }));
    });
  }
  function addTeachStep() {
    setApprovalChain(p => [...p, { id: Date.now(), level: p.length + 1, approver: '', timeLimit: '24 hours', enabled: true }]);
  }

  // ── Non-Teaching Staff Approval Chain ──────────────
  const [nonTeachingApprovalChain, setNonTeachingApprovalChain] = useState<ApprovalStep[]>([
    { id: 1, level: 1, approver: 'Department Head / Supervisor', timeLimit: '24 hours', enabled: true },
    { id: 2, level: 2, approver: 'Admin Officer', timeLimit: '48 hours', enabled: true },
  ]);
  const [nonTeachSearch, setNonTeachSearch] = useState('');
  const [nonTeachPage, setNonTeachPage] = useState(1);

  const filteredNonTeach = nonTeachingApprovalChain.filter(a =>
    a.approver.toLowerCase().includes(nonTeachSearch.toLowerCase())
  );
  const pagedNonTeach = filteredNonTeach.slice((nonTeachPage - 1) * PAGE_SIZE, nonTeachPage * PAGE_SIZE);

  function updateNonTeachStep(id: number, field: keyof ApprovalStep, value: string | boolean) {
    setNonTeachingApprovalChain(p => p.map(a => a.id === id ? { ...a, [field]: value } : a));
  }
  function deleteNonTeachStep(id: number) {
    setNonTeachingApprovalChain(p => {
      const updated = p.filter(a => a.id !== id);
      return updated.map((a, i) => ({ ...a, level: i + 1 }));
    });
  }
  function addNonTeachStep() {
    setNonTeachingApprovalChain(p => [...p, { id: Date.now(), level: p.length + 1, approver: '', timeLimit: '24 hours', enabled: true }]);
  }

  return (
    <div className="space-y-4">
      <ModuleHeader title="Leave Policy Configuration" subtitle="Leave types, carry-forward rules, approval chain, and thresholds" theme={theme} />

      {activeTab === 'types' && (
      <div className="space-y-4">
      {/* ── 1. Leave Types ───────────────────────────── */}
      <SectionCard title="Leave Types &amp; Annual Allocation" subtitle="Edit leave type names, days, carry-forward — add, delete, or disable" theme={theme}>
        <TableToolbar
          search={leaveSearch} onSearch={v => { setLeaveSearch(v); setLeavePage(1); }}
          count={filteredLeaveTypes.length} label="leave types"
          onAdd={addLeaveType}
          onExport={() => alert('Export leave types as CSV')}
          onImport={() => alert('Import leave types from CSV')}
          theme={theme}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className={theme.secondaryBg}>
                {['Leave Type', 'Days/Year', 'Carry Forward', 'Max Carry', 'Enabled', ''].map(h => (
                  <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor} whitespace-nowrap`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pagedLeaveTypes.length === 0 ? (
                <tr><td colSpan={6} className={`text-center py-6 text-xs ${theme.iconColor}`}>No leave types found</td></tr>
              ) : pagedLeaveTypes.map(lt => (
                <tr key={lt.id} className={`border-t ${theme.border} ${!lt.enabled ? 'opacity-50' : ''}`}>
                  <td className="px-2 py-1.5">
                    <input value={lt.type}
                      onChange={e => updateLeaveType(lt.id, 'type', e.target.value)}
                      className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`}
                      placeholder="Leave type name" />
                  </td>
                  <td className="px-2 py-1.5">
                    <input value={lt.days} type="number"
                      onChange={e => updateLeaveType(lt.id, 'days', e.target.value)}
                      className={`w-16 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-3 py-2">
                    <SSAToggle on={lt.carryForward} onChange={() => updateLeaveType(lt.id, 'carryForward', !lt.carryForward)} theme={theme} />
                  </td>
                  <td className="px-2 py-1.5">
                    <input value={lt.maxCarry} type="number"
                      onChange={e => updateLeaveType(lt.id, 'maxCarry', e.target.value)}
                      disabled={!lt.carryForward}
                      className={`w-16 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none ${!lt.carryForward ? 'opacity-30' : ''}`} />
                  </td>
                  <td className="px-3 py-2">
                    <SSAToggle on={lt.enabled} onChange={() => updateLeaveType(lt.id, 'enabled', !lt.enabled)} theme={theme} />
                  </td>
                  <td className="px-2 py-1.5">
                    <button onClick={() => deleteLeaveType(lt.id)} className="text-red-400 hover:text-red-600">
                      <X size={12} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={leavePage} total={filteredLeaveTypes.length} pageSize={PAGE_SIZE} onChange={setLeavePage} theme={theme} />
      </SectionCard>

      {/* ── 2. Leave Rules ────────────────────────────── */}
      <SectionCard title="Leave Rules" subtitle="Special rules for leave calculation" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Sandwich Rule</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Holidays between leave days count as leave</p>
            </div>
            <SSAToggle on={sandwichRule} onChange={() => setSandwichRule(!sandwichRule)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Half-Day Leave</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Allow staff to take half-day leave</p>
            </div>
            <SSAToggle on={halfDayLeave} onChange={() => setHalfDayLeave(!halfDayLeave)} theme={theme} />
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max Consecutive Leave Days (without special approval)</p>
            <InputField value={maxConsecutive} onChange={setMaxConsecutive} theme={theme} type="number" />
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>LWP Threshold (days after leave balance exhausted)</p>
            <InputField value={lwpThreshold} onChange={setLwpThreshold} theme={theme} type="number" />
          </div>
        </div>
      </SectionCard>
      </div>
      )}

      {activeTab === 'approval' && (
      <div className="space-y-4">
      {/* ── Teaching Staff Approval Chain ──────────────── */}
      <SectionCard title="Teaching Staff Approval Chain" subtitle="Edit approver, time limit, and enable/disable each step" theme={theme}>
        <TableToolbar
          search={teachSearch} onSearch={v => { setTeachSearch(v); setTeachPage(1); }}
          count={filteredTeach.length} label="steps"
          onAdd={addTeachStep}
          onExport={() => alert('Export teaching chain as CSV')}
          onImport={() => alert('Import teaching chain from CSV')}
          theme={theme}
        />
        <div className="space-y-2">
          {pagedTeach.length === 0 ? (
            <p className={`text-center py-4 text-xs ${theme.iconColor}`}>No approval steps found</p>
          ) : pagedTeach.map((a) => (
            <div key={a.id} className={`flex items-center gap-2 p-2.5 rounded-xl border ${theme.border} ${!a.enabled ? 'opacity-50' : theme.secondaryBg}`}>
              <span className={`text-[10px] w-6 h-6 rounded-full ${theme.primary} text-white flex items-center justify-center font-bold shrink-0`}>{a.level}</span>
              <input value={a.approver}
                onChange={e => updateTeachStep(a.id, 'approver', e.target.value)}
                className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`}
                placeholder="Approver role" />
              <input value={a.timeLimit}
                onChange={e => updateTeachStep(a.id, 'timeLimit', e.target.value)}
                className={`w-24 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.iconColor} outline-none`}
                placeholder="e.g. 24 hours" />
              <SSAToggle on={a.enabled} onChange={() => updateTeachStep(a.id, 'enabled', !a.enabled)} theme={theme} />
              <button onClick={() => deleteTeachStep(a.id)} className="text-red-400 hover:text-red-600 shrink-0">
                <X size={10} />
              </button>
            </div>
          ))}
        </div>
        <Pagination page={teachPage} total={filteredTeach.length} pageSize={PAGE_SIZE} onChange={setTeachPage} theme={theme} />
      </SectionCard>

      {/* ── Non-Teaching Staff Approval Chain ──────────── */}
      <SectionCard title="Non-Teaching Staff Approval Chain" subtitle="Edit approver, time limit, and enable/disable each step" theme={theme}>
        <TableToolbar
          search={nonTeachSearch} onSearch={v => { setNonTeachSearch(v); setNonTeachPage(1); }}
          count={filteredNonTeach.length} label="steps"
          onAdd={addNonTeachStep}
          onExport={() => alert('Export non-teaching chain as CSV')}
          onImport={() => alert('Import non-teaching chain from CSV')}
          theme={theme}
        />
        <div className="space-y-2">
          {pagedNonTeach.length === 0 ? (
            <p className={`text-center py-4 text-xs ${theme.iconColor}`}>No approval steps found</p>
          ) : pagedNonTeach.map((a) => (
            <div key={a.id} className={`flex items-center gap-2 p-2.5 rounded-xl border ${theme.border} ${!a.enabled ? 'opacity-50' : theme.secondaryBg}`}>
              <span className={`text-[10px] w-6 h-6 rounded-full ${theme.primary} text-white flex items-center justify-center font-bold shrink-0`}>{a.level}</span>
              <input value={a.approver}
                onChange={e => updateNonTeachStep(a.id, 'approver', e.target.value)}
                className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`}
                placeholder="Approver role" />
              <input value={a.timeLimit}
                onChange={e => updateNonTeachStep(a.id, 'timeLimit', e.target.value)}
                className={`w-24 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.iconColor} outline-none`}
                placeholder="e.g. 24 hours" />
              <SSAToggle on={a.enabled} onChange={() => updateNonTeachStep(a.id, 'enabled', !a.enabled)} theme={theme} />
              <button onClick={() => deleteNonTeachStep(a.id)} className="text-red-400 hover:text-red-600 shrink-0">
                <X size={10} />
              </button>
            </div>
          ))}
        </div>
        <Pagination page={nonTeachPage} total={filteredNonTeach.length} pageSize={PAGE_SIZE} onChange={setNonTeachPage} theme={theme} />
      </SectionCard>
      </div>
      )}

      {activeTab === 'settings' && (
      <div className="space-y-4">
      {/* ── 3. Role-Based Permissions ─────────────────── */}
      <SectionCard title="Role-Based Permissions" subtitle="Managed centrally in Roles & Permission module" theme={theme}>
        <div className={`flex items-center gap-3 p-3 rounded-xl ${theme.accentBg} border ${theme.border}`}>
          <div className="flex-1">
            <p className={`text-xs ${theme.iconColor}`}>Role & permission settings for Leave are configured in <span className={`font-bold ${theme.primaryText}`}>Roles & Permission Management</span></p>
          </div>
          <ArrowRight size={16} className={theme.iconColor} />
        </div>
      </SectionCard>

      {/* ── 4. Bulk Import ────────────────────────────── */}
      <SectionCard title="Bulk Import" subtitle="Import staff leave balances from Excel templates" theme={theme}>
        <BulkImportWizard
          entityName="Staff Leave Balance"
          templateFields={['Employee ID', 'Name', 'Leave Type', 'Balance Days', 'Carried Forward']}
          sampleData={[['EMP001', 'Rajesh Sharma', 'Casual Leave', '12', '3']]}
          theme={theme}
        />
      </SectionCard>
      </div>
      )}

      {/* ── Save Button ───────────────────────────────── */}
      <div className="flex justify-end pt-2">
        <button
          onClick={() => alert('Leave policy configuration saved!')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white ${theme.primary} hover:opacity-90 transition-all shadow-sm`}>
          <Save size={15} /> Save Configuration
        </button>
      </div>

    </div>
  );
}
