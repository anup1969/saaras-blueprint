'use client';

import React, { useState } from 'react';
import { X, Plus, CheckCircle, Info, Upload, Search, Download, ChevronLeft, ChevronRight, Pencil, Trash2, Save } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, SelectField, InputField } from '../_helpers/components';
import { MasterPermissionGrid, BulkImportWizard } from '@/components/shared';
import type { Theme } from '../_helpers/types';

// ─── Constants ──────────────────────────────────────
const PAGE_SIZE = 5;

// ─── Types ──────────────────────────────────────────
type Department = { id: number; name: string; enabled: boolean };
type Designation = { id: number; name: string; enabled: boolean };
type SalaryComponent = { id: number; name: string; type: string; percentage: string; enabled: boolean };
type LetterTemplate = { id: number; name: string; letterType: string; enabled: boolean };
type AppraisalStage = { id: number; stage: string; order: number; enabled: boolean };
type ChecklistItem = { id: number; item: string; enabled: boolean };
type TaxSlab = { id: number; slabName: string; from: string; to: string; rate: string; enabled: boolean };

// ─── Sub-component: Table Toolbar ───────────────────
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

// ─── Helper Components ──────────────────────────────
function InfoIcon({ tip }: { tip: string }) {
  return <span title={tip} className="inline-flex ml-1.5 shrink-0 cursor-help"><Info size={13} className="text-blue-400 hover:text-blue-600" /></span>;
}
function MobileBadge() {
  return <span className="ml-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-green-100 text-green-700 whitespace-nowrap">{'\uD83D\uDCF1'} Mobile</span>;
}

// ─── Main Module ────────────────────────────────────
export default function HRConfigModule({ theme }: { theme: Theme }) {

  // ══════════════════════════════════════════════════
  // 1. DEPARTMENTS
  // ══════════════════════════════════════════════════
  const [departments, setDepartments] = useState<Department[]>([
    { id: 1, name: 'Administration', enabled: true },
    { id: 2, name: 'Teaching - Primary', enabled: true },
    { id: 3, name: 'Teaching - Secondary', enabled: true },
    { id: 4, name: 'Teaching - Senior', enabled: true },
    { id: 5, name: 'Accounts', enabled: true },
    { id: 6, name: 'IT', enabled: true },
    { id: 7, name: 'Transport', enabled: true },
    { id: 8, name: 'Housekeeping', enabled: true },
    { id: 9, name: 'Security', enabled: true },
    { id: 10, name: 'Library', enabled: true },
    { id: 11, name: 'Lab', enabled: true },
  ]);
  const [deptSearch, setDeptSearch] = useState('');
  const [deptPage, setDeptPage] = useState(1);
  const [deptEdit, setDeptEdit] = useState<number | null>(null);

  const filteredDepts = departments.filter(d => d.name.toLowerCase().includes(deptSearch.toLowerCase()));
  const pagedDepts = filteredDepts.slice((deptPage - 1) * PAGE_SIZE, deptPage * PAGE_SIZE);

  function addDepartment() {
    setDepartments(p => [...p, { id: Date.now(), name: '', enabled: true }]);
    const newTotal = filteredDepts.length + 1;
    const newTotalPages = Math.ceil(newTotal / PAGE_SIZE);
    setDeptPage(newTotalPages);
    setDeptEdit(Date.now());
  }

  // ══════════════════════════════════════════════════
  // 2. DESIGNATIONS
  // ══════════════════════════════════════════════════
  const [designations, setDesignations] = useState<Designation[]>([
    { id: 1, name: 'Principal', enabled: true },
    { id: 2, name: 'Vice Principal', enabled: true },
    { id: 3, name: 'HOD', enabled: true },
    { id: 4, name: 'PGT', enabled: true },
    { id: 5, name: 'TGT', enabled: true },
    { id: 6, name: 'PRT', enabled: true },
    { id: 7, name: 'Lab Assistant', enabled: true },
    { id: 8, name: 'Librarian', enabled: true },
    { id: 9, name: 'Accountant', enabled: true },
    { id: 10, name: 'Driver', enabled: true },
    { id: 11, name: 'Peon', enabled: true },
    { id: 12, name: 'Security Guard', enabled: true },
  ]);
  const [desigSearch, setDesigSearch] = useState('');
  const [desigPage, setDesigPage] = useState(1);
  const [desigEdit, setDesigEdit] = useState<number | null>(null);

  const filteredDesigs = designations.filter(d => d.name.toLowerCase().includes(desigSearch.toLowerCase()));
  const pagedDesigs = filteredDesigs.slice((desigPage - 1) * PAGE_SIZE, desigPage * PAGE_SIZE);

  function addDesignation() {
    const newId = Date.now();
    setDesignations(p => [...p, { id: newId, name: '', enabled: true }]);
    const newTotal = filteredDesigs.length + 1;
    const newTotalPages = Math.ceil(newTotal / PAGE_SIZE);
    setDesigPage(newTotalPages);
    setDesigEdit(newId);
  }

  // ══════════════════════════════════════════════════
  // 3. SALARY COMPONENTS
  // ══════════════════════════════════════════════════
  const [salaryComponents, setSalaryComponents] = useState<SalaryComponent[]>([
    { id: 1, name: 'Basic Salary', type: 'earning', percentage: '40%', enabled: true },
    { id: 2, name: 'HRA', type: 'earning', percentage: '20%', enabled: true },
    { id: 3, name: 'DA', type: 'earning', percentage: '15%', enabled: true },
    { id: 4, name: 'Transport Allowance', type: 'earning', percentage: '5%', enabled: true },
    { id: 5, name: 'Special Allowance', type: 'earning', percentage: '10%', enabled: true },
    { id: 6, name: 'PF (Employee)', type: 'deduction', percentage: '12%', enabled: true },
    { id: 7, name: 'ESI', type: 'deduction', percentage: '0.75%', enabled: true },
    { id: 8, name: 'Professional Tax', type: 'deduction', percentage: 'Fixed', enabled: true },
    { id: 9, name: 'TDS', type: 'deduction', percentage: 'Slab', enabled: true },
  ]);
  const [salarySearch, setSalarySearch] = useState('');
  const [salaryPage, setSalaryPage] = useState(1);
  const [salaryEdit, setSalaryEdit] = useState<number | null>(null);

  const filteredSalary = salaryComponents.filter(c =>
    c.name.toLowerCase().includes(salarySearch.toLowerCase()) || c.type.toLowerCase().includes(salarySearch.toLowerCase())
  );
  const pagedSalary = filteredSalary.slice((salaryPage - 1) * PAGE_SIZE, salaryPage * PAGE_SIZE);

  function addSalaryComponent() {
    const newId = Date.now();
    setSalaryComponents(p => [...p, { id: newId, name: '', type: 'earning', percentage: '', enabled: true }]);
    const newTotal = filteredSalary.length + 1;
    setSalaryPage(Math.ceil(newTotal / PAGE_SIZE));
    setSalaryEdit(newId);
  }

  // ══════════════════════════════════════════════════
  // 4. LETTER TEMPLATES
  // ══════════════════════════════════════════════════
  const [hrLetters, setHrLetters] = useState<LetterTemplate[]>([
    { id: 1, name: 'Offer Letter', letterType: 'Onboarding', enabled: true },
    { id: 2, name: 'Appointment Letter', letterType: 'Onboarding', enabled: true },
    { id: 3, name: 'Confirmation Letter', letterType: 'Employment', enabled: true },
    { id: 4, name: 'Experience Letter', letterType: 'Exit', enabled: true },
    { id: 5, name: 'Relieving Letter', letterType: 'Exit', enabled: true },
    { id: 6, name: 'Salary Slip', letterType: 'Payroll', enabled: true },
    { id: 7, name: 'Warning Letter', letterType: 'Disciplinary', enabled: true },
    { id: 8, name: 'Termination Letter', letterType: 'Exit', enabled: true },
  ]);
  const [letterSearch, setLetterSearch] = useState('');
  const [letterPage, setLetterPage] = useState(1);
  const [letterEdit, setLetterEdit] = useState<number | null>(null);

  const filteredLetters = hrLetters.filter(l =>
    l.name.toLowerCase().includes(letterSearch.toLowerCase()) || l.letterType.toLowerCase().includes(letterSearch.toLowerCase())
  );
  const pagedLetters = filteredLetters.slice((letterPage - 1) * PAGE_SIZE, letterPage * PAGE_SIZE);

  function addLetterTemplate() {
    const newId = Date.now();
    setHrLetters(p => [...p, { id: newId, name: '', letterType: 'Onboarding', enabled: true }]);
    const newTotal = filteredLetters.length + 1;
    setLetterPage(Math.ceil(newTotal / PAGE_SIZE));
    setLetterEdit(newId);
  }

  // ══════════════════════════════════════════════════
  // 5. APPRAISAL STAGES
  // ══════════════════════════════════════════════════
  const [appraisalStages, setAppraisalStages] = useState<AppraisalStage[]>([
    { id: 1, stage: 'Self Assessment', order: 1, enabled: true },
    { id: 2, stage: 'HOD Review', order: 2, enabled: true },
    { id: 3, stage: 'Principal Review', order: 3, enabled: true },
    { id: 4, stage: 'Management Approval', order: 4, enabled: true },
    { id: 5, stage: 'Letter Generation', order: 5, enabled: true },
  ]);
  const [appraisalSearch, setAppraisalSearch] = useState('');
  const [appraisalPage, setAppraisalPage] = useState(1);
  const [appraisalEdit, setAppraisalEdit] = useState<number | null>(null);

  const filteredAppraisals = appraisalStages.filter(s => s.stage.toLowerCase().includes(appraisalSearch.toLowerCase()));
  const pagedAppraisals = filteredAppraisals.slice((appraisalPage - 1) * PAGE_SIZE, appraisalPage * PAGE_SIZE);

  function addAppraisalStage() {
    const newId = Date.now();
    setAppraisalStages(p => [...p, { id: newId, stage: '', order: p.length + 1, enabled: true }]);
    const newTotal = filteredAppraisals.length + 1;
    setAppraisalPage(Math.ceil(newTotal / PAGE_SIZE));
    setAppraisalEdit(newId);
  }

  // ══════════════════════════════════════════════════
  // 6. ONBOARDING CHECKLIST
  // ══════════════════════════════════════════════════
  const [onboardingChecklist, setOnboardingChecklist] = useState<ChecklistItem[]>([
    { id: 1, item: 'Document verification (Aadhaar, PAN, Degree certificates)', enabled: true },
    { id: 2, item: 'Police verification submission', enabled: true },
    { id: 3, item: 'Bank account details for salary', enabled: true },
    { id: 4, item: 'PF & ESI registration', enabled: true },
    { id: 5, item: 'Photo ID card generation', enabled: true },
    { id: 6, item: 'System login creation', enabled: true },
    { id: 7, item: 'Assign department & reporting manager', enabled: true },
    { id: 8, item: 'Probation period agreement', enabled: true },
  ]);
  const [checklistSearch, setChecklistSearch] = useState('');
  const [checklistPage, setChecklistPage] = useState(1);
  const [checklistEdit, setChecklistEdit] = useState<number | null>(null);

  const filteredChecklist = onboardingChecklist.filter(c => c.item.toLowerCase().includes(checklistSearch.toLowerCase()));
  const pagedChecklist = filteredChecklist.slice((checklistPage - 1) * PAGE_SIZE, checklistPage * PAGE_SIZE);

  function addChecklistItem() {
    const newId = Date.now();
    setOnboardingChecklist(p => [...p, { id: newId, item: '', enabled: true }]);
    const newTotal = filteredChecklist.length + 1;
    setChecklistPage(Math.ceil(newTotal / PAGE_SIZE));
    setChecklistEdit(newId);
  }

  // ══════════════════════════════════════════════════
  // 7. INCOME TAX SLABS
  // ══════════════════════════════════════════════════
  const [taxSlabs, setTaxSlabs] = useState<TaxSlab[]>([
    { id: 1, slabName: 'Nil Slab', from: '0', to: '500000', rate: '0', enabled: true },
    { id: 2, slabName: '20% Slab', from: '500001', to: '1000000', rate: '20', enabled: true },
    { id: 3, slabName: '30% Slab', from: '1000001', to: '99999999', rate: '30', enabled: true },
  ]);
  const [taxSearch, setTaxSearch] = useState('');
  const [taxPage, setTaxPage] = useState(1);
  const [taxEdit, setTaxEdit] = useState<number | null>(null);

  const filteredTax = taxSlabs.filter(s =>
    s.slabName.toLowerCase().includes(taxSearch.toLowerCase()) || s.rate.includes(taxSearch)
  );
  const pagedTax = filteredTax.slice((taxPage - 1) * PAGE_SIZE, taxPage * PAGE_SIZE);

  function addTaxSlab() {
    const newId = Date.now();
    setTaxSlabs(p => [...p, { id: newId, slabName: '', from: '', to: '', rate: '', enabled: true }]);
    const newTotal = filteredTax.length + 1;
    setTaxPage(Math.ceil(newTotal / PAGE_SIZE));
    setTaxEdit(newId);
  }

  // ══════════════════════════════════════════════════
  // PAY CYCLE & ATTENDANCE (unchanged)
  // ══════════════════════════════════════════════════
  const [payCycle, setPayCycle] = useState('Monthly');
  const [payDay, setPayDay] = useState('Last working day');
  const [staffAttendance, setStaffAttendance] = useState<Record<string, boolean>>({
    'Biometric': true, 'Mobile App': true, 'RFID': false, 'Manual Register': true, 'Geo-fencing': false,
  });

  // ═══════════════════════════════════════════════════
  // PAYROLL / STATUTORY STATE (unchanged)
  // ═══════════════════════════════════════════════════
  const [lopMethod, setLopMethod] = useState('LOPD');
  const [payslipPDF, setPayslipPDF] = useState(true);
  const [payslipPassword, setPayslipPassword] = useState(false);
  const [payslipDistribution, setPayslipDistribution] = useState<Record<string, boolean>>({ Email: true, WhatsApp: false, 'Self-service portal': true });
  const [payslipRegen, setPayslipRegen] = useState(false);
  const [payslipRegenAudit, setPayslipRegenAudit] = useState(true);
  const [autoTDS, setAutoTDS] = useState(true);
  const [form16Gen, setForm16Gen] = useState(true);
  const [pfEnabled, setPfEnabled] = useState(true);
  const [pfEmployee, setPfEmployee] = useState('12');
  const [pfEmployer, setPfEmployer] = useState('12');
  const [esiEnabled, setEsiEnabled] = useState(true);
  const [esiThreshold, setEsiThreshold] = useState('21000');
  const [ptEnabled, setPtEnabled] = useState(true);
  const [ptState, setPtState] = useState('Gujarat');
  const [gratuityEnabled, setGratuityEnabled] = useState(false);
  const [overtimeEnabled, setOvertimeEnabled] = useState(false);
  const [overtimeRate, setOvertimeRate] = useState('1.5x');
  const [festivalBonus, setFestivalBonus] = useState(false);
  const [salaryAdvance, setSalaryAdvance] = useState(false);
  const [arrearsAuto, setArrearsAuto] = useState(false);
  const [bankBatchFile, setBankBatchFile] = useState(true);
  const [bankFormat, setBankFormat] = useState('SBI');
  const [tallyExport, setTallyExport] = useState(false);
  const [quickbooksSync, setQuickbooksSync] = useState(false);
  const [pfECR, setPfECR] = useState(true);
  const [esiReturn, setEsiReturn] = useState(true);
  const [form16Report, setForm16Report] = useState(true);
  const [ptChallan, setPtChallan] = useState(true);

  // ═══════════════════════════════════════════════════
  // SAVE HANDLER
  // ═══════════════════════════════════════════════════
  const [saved, setSaved] = useState(false);
  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-4">
      <ModuleHeader title="HR & Payroll Configuration" subtitle="Departments, salary structure, pay cycle, attendance, and HR processes" theme={theme} />

      {/* ═══════════════════════════════════════════════
          1. DEPARTMENTS — Full Master Table
          ═══════════════════════════════════════════════ */}
      <SectionCard title="Departments" subtitle="Add, edit, enable/disable, or remove departments" theme={theme}>
        <TableToolbar
          search={deptSearch} onSearch={v => { setDeptSearch(v); setDeptPage(1); }}
          count={filteredDepts.length} label="departments"
          onAdd={addDepartment}
          onExport={() => alert('Export departments as CSV')}
          onImport={() => alert('Import departments from CSV')}
          theme={theme}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className={theme.secondaryBg}>
                {['Name', 'Enabled', 'Actions'].map(h => (
                  <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor} uppercase text-[10px]`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pagedDepts.length === 0 ? (
                <tr><td colSpan={3} className={`text-center py-6 text-xs ${theme.iconColor}`}>No departments found</td></tr>
              ) : pagedDepts.map(d => (
                <tr key={d.id} className={`border-t ${theme.border} ${!d.enabled ? 'opacity-50' : ''}`}>
                  <td className="px-2 py-1.5">
                    {deptEdit === d.id ? (
                      <input autoFocus value={d.name}
                        onChange={e => setDepartments(p => p.map(x => x.id === d.id ? { ...x, name: e.target.value } : x))}
                        className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`}
                        placeholder="Department name" />
                    ) : (
                      <span className={`font-bold ${theme.highlight}`}>{d.name || '(empty)'}</span>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <SSAToggle on={d.enabled} onChange={() => setDepartments(p => p.map(x => x.id === d.id ? { ...x, enabled: !x.enabled } : x))} theme={theme} />
                  </td>
                  <td className="px-2 py-1.5">
                    <div className="flex items-center gap-1.5">
                      {deptEdit === d.id ? (
                        <button onClick={() => setDeptEdit(null)} className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${theme.primary} text-white`}>Done</button>
                      ) : (
                        <button onClick={() => setDeptEdit(d.id)} className={`p-1 rounded-lg ${theme.buttonHover}`}><Pencil size={11} className={theme.iconColor} /></button>
                      )}
                      <button onClick={() => setDepartments(p => p.filter(x => x.id !== d.id))} className="text-red-400 hover:text-red-600"><Trash2 size={12} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={deptPage} total={filteredDepts.length} pageSize={PAGE_SIZE} onChange={setDeptPage} theme={theme} />
      </SectionCard>

      {/* ═══════════════════════════════════════════════
          2. DESIGNATIONS — Full Master Table
          ═══════════════════════════════════════════════ */}
      <SectionCard title="Designations" subtitle="Add, edit, enable/disable, or remove designations" theme={theme}>
        <TableToolbar
          search={desigSearch} onSearch={v => { setDesigSearch(v); setDesigPage(1); }}
          count={filteredDesigs.length} label="designations"
          onAdd={addDesignation}
          onExport={() => alert('Export designations as CSV')}
          onImport={() => alert('Import designations from CSV')}
          theme={theme}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className={theme.secondaryBg}>
                {['Name', 'Enabled', 'Actions'].map(h => (
                  <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor} uppercase text-[10px]`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pagedDesigs.length === 0 ? (
                <tr><td colSpan={3} className={`text-center py-6 text-xs ${theme.iconColor}`}>No designations found</td></tr>
              ) : pagedDesigs.map(d => (
                <tr key={d.id} className={`border-t ${theme.border} ${!d.enabled ? 'opacity-50' : ''}`}>
                  <td className="px-2 py-1.5">
                    {desigEdit === d.id ? (
                      <input autoFocus value={d.name}
                        onChange={e => setDesignations(p => p.map(x => x.id === d.id ? { ...x, name: e.target.value } : x))}
                        className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`}
                        placeholder="Designation name" />
                    ) : (
                      <span className={`font-bold ${theme.highlight}`}>{d.name || '(empty)'}</span>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <SSAToggle on={d.enabled} onChange={() => setDesignations(p => p.map(x => x.id === d.id ? { ...x, enabled: !x.enabled } : x))} theme={theme} />
                  </td>
                  <td className="px-2 py-1.5">
                    <div className="flex items-center gap-1.5">
                      {desigEdit === d.id ? (
                        <button onClick={() => setDesigEdit(null)} className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${theme.primary} text-white`}>Done</button>
                      ) : (
                        <button onClick={() => setDesigEdit(d.id)} className={`p-1 rounded-lg ${theme.buttonHover}`}><Pencil size={11} className={theme.iconColor} /></button>
                      )}
                      <button onClick={() => setDesignations(p => p.filter(x => x.id !== d.id))} className="text-red-400 hover:text-red-600"><Trash2 size={12} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={desigPage} total={filteredDesigs.length} pageSize={PAGE_SIZE} onChange={setDesigPage} theme={theme} />
      </SectionCard>

      {/* ═══════════════════════════════════════════════
          3. SALARY STRUCTURE — Full Master Table
          ═══════════════════════════════════════════════ */}
      <SectionCard title="Salary Structure" subtitle="Earning and deduction components — search, edit, enable/disable, export/import" theme={theme}>
        <TableToolbar
          search={salarySearch} onSearch={v => { setSalarySearch(v); setSalaryPage(1); }}
          count={filteredSalary.length} label="components"
          onAdd={addSalaryComponent}
          onExport={() => alert('Export salary components as CSV')}
          onImport={() => alert('Import salary components from CSV')}
          theme={theme}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className={theme.secondaryBg}>
                {['Type', 'Component Name', 'Percentage', 'Enabled', 'Actions'].map(h => (
                  <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor} uppercase text-[10px]`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pagedSalary.length === 0 ? (
                <tr><td colSpan={5} className={`text-center py-6 text-xs ${theme.iconColor}`}>No salary components found</td></tr>
              ) : pagedSalary.map(c => (
                <tr key={c.id} className={`border-t ${theme.border} ${!c.enabled ? 'opacity-50' : ''}`}>
                  <td className="px-2 py-1.5">
                    {salaryEdit === c.id ? (
                      <select value={c.type} onChange={e => setSalaryComponents(p => p.map(x => x.id === c.id ? { ...x, type: e.target.value } : x))}
                        className={`text-[9px] px-1.5 py-1 rounded font-bold ${c.type === 'earning' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'} border-0 outline-none`}>
                        <option value="earning">EARN</option>
                        <option value="deduction">DED</option>
                      </select>
                    ) : (
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${c.type === 'earning' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {c.type === 'earning' ? 'EARN' : 'DED'}
                      </span>
                    )}
                  </td>
                  <td className="px-2 py-1.5">
                    {salaryEdit === c.id ? (
                      <input autoFocus value={c.name}
                        onChange={e => setSalaryComponents(p => p.map(x => x.id === c.id ? { ...x, name: e.target.value } : x))}
                        className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`}
                        placeholder="Component name" />
                    ) : (
                      <span className={`font-bold ${theme.highlight}`}>{c.name || '(empty)'}</span>
                    )}
                  </td>
                  <td className="px-2 py-1.5">
                    {salaryEdit === c.id ? (
                      <input value={c.percentage}
                        onChange={e => setSalaryComponents(p => p.map(x => x.id === c.id ? { ...x, percentage: e.target.value } : x))}
                        className={`w-20 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center font-bold ${theme.iconColor} outline-none`}
                        placeholder="e.g. 40%" />
                    ) : (
                      <span className={`font-bold ${theme.iconColor}`}>{c.percentage}</span>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <SSAToggle on={c.enabled} onChange={() => setSalaryComponents(p => p.map(x => x.id === c.id ? { ...x, enabled: !x.enabled } : x))} theme={theme} />
                  </td>
                  <td className="px-2 py-1.5">
                    <div className="flex items-center gap-1.5">
                      {salaryEdit === c.id ? (
                        <button onClick={() => setSalaryEdit(null)} className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${theme.primary} text-white`}>Done</button>
                      ) : (
                        <button onClick={() => setSalaryEdit(c.id)} className={`p-1 rounded-lg ${theme.buttonHover}`}><Pencil size={11} className={theme.iconColor} /></button>
                      )}
                      <button onClick={() => setSalaryComponents(p => p.filter(x => x.id !== c.id))} className="text-red-400 hover:text-red-600"><Trash2 size={12} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={salaryPage} total={filteredSalary.length} pageSize={PAGE_SIZE} onChange={setSalaryPage} theme={theme} />
      </SectionCard>

      {/* ═══════════════════════════════════════════════
          PAY CYCLE + STAFF ATTENDANCE (unchanged layout)
          ═══════════════════════════════════════════════ */}
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Pay Cycle" subtitle="Payment schedule and processing" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Cycle</p>
              <SelectField options={['Monthly', 'Bi-weekly', 'Weekly']} value={payCycle} onChange={setPayCycle} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Pay Day</p>
              <SelectField options={['1st of month', '5th of month', '10th of month', 'Last working day']} value={payDay} onChange={setPayDay} theme={theme} />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Staff Attendance Methods" subtitle="How staff check-in/out is recorded daily" theme={theme}>
          <div className="space-y-2">
            {Object.entries(staffAttendance).map(([method, enabled]) => (
              <div key={method} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{method}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Biometric': 'Staff marks attendance via fingerprint or face recognition device at school entrance',
                      'Mobile App': 'Staff checks in/out using the school mobile app with GPS verification',
                      'RFID': 'Staff taps RFID card at entry point — auto-records time of arrival/departure',
                      'Manual Register': 'Traditional sign-in register maintained by admin office',
                      'Geo-fencing': 'Auto-marks attendance when staff\'s phone enters school campus geo-fence',
                    } as Record<string, string>)[method]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setStaffAttendance(p => ({ ...p, [method]: !p[method] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* ═══════════════════════════════════════════════
          4. LETTER TEMPLATES — Full Master Table
          ═══════════════════════════════════════════════ */}
      <SectionCard title="HR Letter Templates" subtitle="Add, edit, enable/disable, or remove letter templates" theme={theme}>
        <TableToolbar
          search={letterSearch} onSearch={v => { setLetterSearch(v); setLetterPage(1); }}
          count={filteredLetters.length} label="templates"
          onAdd={addLetterTemplate}
          onExport={() => alert('Export letter templates as CSV')}
          onImport={() => alert('Import letter templates from CSV')}
          theme={theme}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className={theme.secondaryBg}>
                {['Template Name', 'Type', 'Enabled', 'Actions'].map(h => (
                  <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor} uppercase text-[10px]`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pagedLetters.length === 0 ? (
                <tr><td colSpan={4} className={`text-center py-6 text-xs ${theme.iconColor}`}>No letter templates found</td></tr>
              ) : pagedLetters.map(l => (
                <tr key={l.id} className={`border-t ${theme.border} ${!l.enabled ? 'opacity-50' : ''}`}>
                  <td className="px-2 py-1.5">
                    {letterEdit === l.id ? (
                      <input autoFocus value={l.name}
                        onChange={e => setHrLetters(p => p.map(x => x.id === l.id ? { ...x, name: e.target.value } : x))}
                        className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`}
                        placeholder="Template name" />
                    ) : (
                      <span className={`font-bold ${theme.highlight}`}>{l.name || '(empty)'}</span>
                    )}
                  </td>
                  <td className="px-2 py-1.5">
                    {letterEdit === l.id ? (
                      <select value={l.letterType}
                        onChange={e => setHrLetters(p => p.map(x => x.id === l.id ? { ...x, letterType: e.target.value } : x))}
                        className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}>
                        {['Onboarding', 'Employment', 'Exit', 'Payroll', 'Disciplinary'].map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    ) : (
                      <span className={`text-[10px] px-2 py-0.5 rounded-lg ${theme.secondaryBg} font-medium ${theme.iconColor}`}>{l.letterType}</span>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <SSAToggle on={l.enabled} onChange={() => setHrLetters(p => p.map(x => x.id === l.id ? { ...x, enabled: !x.enabled } : x))} theme={theme} />
                  </td>
                  <td className="px-2 py-1.5">
                    <div className="flex items-center gap-1.5">
                      {letterEdit === l.id ? (
                        <button onClick={() => setLetterEdit(null)} className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${theme.primary} text-white`}>Done</button>
                      ) : (
                        <button onClick={() => setLetterEdit(l.id)} className={`p-1 rounded-lg ${theme.buttonHover}`}><Pencil size={11} className={theme.iconColor} /></button>
                      )}
                      <button onClick={() => setHrLetters(p => p.filter(x => x.id !== l.id))} className="text-red-400 hover:text-red-600"><Trash2 size={12} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={letterPage} total={filteredLetters.length} pageSize={PAGE_SIZE} onChange={setLetterPage} theme={theme} />
      </SectionCard>

      {/* ═══════════════════════════════════════════════
          5. APPRAISAL STAGES — Full Master Table
          ═══════════════════════════════════════════════ */}
      <SectionCard title="Performance Appraisal Stages" subtitle="Multi-level review — add, edit, enable/disable, export/import" theme={theme}>
        <TableToolbar
          search={appraisalSearch} onSearch={v => { setAppraisalSearch(v); setAppraisalPage(1); }}
          count={filteredAppraisals.length} label="stages"
          onAdd={addAppraisalStage}
          onExport={() => alert('Export appraisal stages as CSV')}
          onImport={() => alert('Import appraisal stages from CSV')}
          theme={theme}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className={theme.secondaryBg}>
                {['#', 'Stage Name', 'Enabled', 'Actions'].map(h => (
                  <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor} uppercase text-[10px]`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pagedAppraisals.length === 0 ? (
                <tr><td colSpan={4} className={`text-center py-6 text-xs ${theme.iconColor}`}>No appraisal stages found</td></tr>
              ) : pagedAppraisals.map(s => (
                <tr key={s.id} className={`border-t ${theme.border} ${!s.enabled ? 'opacity-50' : ''}`}>
                  <td className="px-3 py-2">
                    <span className={`text-[10px] w-5 h-5 rounded-full ${theme.primary} text-white flex items-center justify-center font-bold`}>{s.order}</span>
                  </td>
                  <td className="px-2 py-1.5">
                    {appraisalEdit === s.id ? (
                      <input autoFocus value={s.stage}
                        onChange={e => setAppraisalStages(p => p.map(x => x.id === s.id ? { ...x, stage: e.target.value } : x))}
                        className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`}
                        placeholder="Stage name" />
                    ) : (
                      <span className={`font-bold ${theme.highlight}`}>{s.stage || '(empty)'}</span>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <SSAToggle on={s.enabled} onChange={() => setAppraisalStages(p => p.map(x => x.id === s.id ? { ...x, enabled: !x.enabled } : x))} theme={theme} />
                  </td>
                  <td className="px-2 py-1.5">
                    <div className="flex items-center gap-1.5">
                      {appraisalEdit === s.id ? (
                        <button onClick={() => setAppraisalEdit(null)} className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${theme.primary} text-white`}>Done</button>
                      ) : (
                        <button onClick={() => setAppraisalEdit(s.id)} className={`p-1 rounded-lg ${theme.buttonHover}`}><Pencil size={11} className={theme.iconColor} /></button>
                      )}
                      <button onClick={() => {
                        setAppraisalStages(p => {
                          const filtered = p.filter(x => x.id !== s.id);
                          return filtered.map((x, i) => ({ ...x, order: i + 1 }));
                        });
                      }} className="text-red-400 hover:text-red-600"><Trash2 size={12} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={appraisalPage} total={filteredAppraisals.length} pageSize={PAGE_SIZE} onChange={setAppraisalPage} theme={theme} />
      </SectionCard>

      {/* ═══════════════════════════════════════════════
          6. ONBOARDING CHECKLIST — Full Master Table
          ═══════════════════════════════════════════════ */}
      <SectionCard title="Staff Onboarding Checklist" subtitle="Required steps for new staff — add, edit, enable/disable, export/import" theme={theme}>
        <TableToolbar
          search={checklistSearch} onSearch={v => { setChecklistSearch(v); setChecklistPage(1); }}
          count={filteredChecklist.length} label="checklist items"
          onAdd={addChecklistItem}
          onExport={() => alert('Export onboarding checklist as CSV')}
          onImport={() => alert('Import onboarding checklist from CSV')}
          theme={theme}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className={theme.secondaryBg}>
                {['Checklist Item', 'Enabled', 'Actions'].map(h => (
                  <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor} uppercase text-[10px]`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pagedChecklist.length === 0 ? (
                <tr><td colSpan={3} className={`text-center py-6 text-xs ${theme.iconColor}`}>No checklist items found</td></tr>
              ) : pagedChecklist.map(c => (
                <tr key={c.id} className={`border-t ${theme.border} ${!c.enabled ? 'opacity-50' : ''}`}>
                  <td className="px-2 py-1.5">
                    <div className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                      {checklistEdit === c.id ? (
                        <input autoFocus value={c.item}
                          onChange={e => setOnboardingChecklist(p => p.map(x => x.id === c.id ? { ...x, item: e.target.value } : x))}
                          className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}
                          placeholder="Checklist item" />
                      ) : (
                        <span className={`text-xs ${theme.highlight}`}>{c.item || '(empty)'}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <SSAToggle on={c.enabled} onChange={() => setOnboardingChecklist(p => p.map(x => x.id === c.id ? { ...x, enabled: !x.enabled } : x))} theme={theme} />
                  </td>
                  <td className="px-2 py-1.5">
                    <div className="flex items-center gap-1.5">
                      {checklistEdit === c.id ? (
                        <button onClick={() => setChecklistEdit(null)} className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${theme.primary} text-white`}>Done</button>
                      ) : (
                        <button onClick={() => setChecklistEdit(c.id)} className={`p-1 rounded-lg ${theme.buttonHover}`}><Pencil size={11} className={theme.iconColor} /></button>
                      )}
                      <button onClick={() => setOnboardingChecklist(p => p.filter(x => x.id !== c.id))} className="text-red-400 hover:text-red-600"><Trash2 size={12} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={checklistPage} total={filteredChecklist.length} pageSize={PAGE_SIZE} onChange={setChecklistPage} theme={theme} />
      </SectionCard>

      {/* ═══════════════════════════════════════════════
          NEW SECTIONS (preserved from original)
          ═══════════════════════════════════════════════ */}

      <SectionCard title="Bulk Employee Import" subtitle="Upload employee data in bulk via CSV" theme={theme}>
        <div className="flex items-center mb-3">
          <p className={`text-[10px] font-bold ${theme.iconColor}`}>Import multiple employees at once</p>
          <InfoIcon tip="Upload employee data in bulk via CSV" />
        </div>
        <div className="space-y-3">
          <div className={`p-6 rounded-xl border-2 border-dashed ${theme.border} flex flex-col items-center justify-center gap-2`}>
            <Upload size={24} className={theme.iconColor} />
            <p className={`text-xs font-bold ${theme.highlight}`}>Drag and drop CSV file here</p>
            <p className={`text-[10px] ${theme.iconColor}`}>or click to browse</p>
            <button className={`mt-2 px-4 py-2 rounded-xl text-xs font-bold ${theme.primary} text-white`}>
              Import from CSV
            </button>
          </div>
          <div className={`flex items-center gap-2 p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <span className={`text-xs font-bold ${theme.iconColor} underline cursor-pointer hover:opacity-80`}>Download Template (.csv)</span>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="LOP Calculation Method" subtitle="Choose how Loss of Pay is calculated in payroll" theme={theme}>
        <div className="flex items-center mb-3">
          <p className={`text-[10px] font-bold ${theme.iconColor}`}>Select the method for LOP deduction</p>
          <InfoIcon tip="Choose how Loss of Pay is calculated in payroll" />
        </div>
        <div className="space-y-2">
          {[
            { id: 'LOPD', label: 'By LOP Days (LOPD)', desc: 'Deduct salary based on number of absent/LOP days' },
            { id: 'NDW', label: 'By Days Worked (NDW)', desc: 'Pay only for the number of days actually worked' },
          ].map(opt => (
            <label key={opt.id} className={`flex items-start gap-3 p-3 rounded-xl ${theme.secondaryBg} cursor-pointer border-2 transition-all ${lopMethod === opt.id ? `${theme.border} ring-2 ring-blue-200` : 'border-transparent'}`}>
              <input type="radio" name="lopMethod" value={opt.id} checked={lopMethod === opt.id}
                onChange={() => setLopMethod(opt.id)} className="accent-emerald-500 mt-0.5" />
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>{opt.label}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{opt.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Payslip Settings" subtitle="Configure payslip generation and distribution" theme={theme}>
        <div className="flex items-center mb-3">
          <p className={`text-[10px] font-bold ${theme.iconColor}`}>Payslip format and delivery options</p>
          <InfoIcon tip="Configure how payslips are generated, protected, and distributed to staff" />
        </div>
        <div className="space-y-2">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Generate PDF with letterhead</p>
            <SSAToggle on={payslipPDF} onChange={() => setPayslipPDF(!payslipPDF)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Password-protect payslips</p>
            <SSAToggle on={payslipPassword} onChange={() => setPayslipPassword(!payslipPassword)} theme={theme} />
          </div>
          <div>
            <div className="flex items-center mb-2">
              <p className={`text-[10px] font-bold ${theme.iconColor}`}>Distribution via</p>
              <MobileBadge />
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(payslipDistribution).map(([ch, on]) => (
                <label key={ch} className={`flex items-center gap-2 p-2 rounded-lg ${theme.secondaryBg} cursor-pointer`}>
                  <input type="checkbox" checked={on} onChange={() => setPayslipDistribution(p => ({ ...p, [ch]: !p[ch] }))} className="accent-emerald-500 w-3.5 h-3.5" />
                  <span className={`text-[10px] font-medium ${theme.highlight}`}>{ch}</span>
                </label>
              ))}
            </div>
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Allow payslip regeneration</p>
            <SSAToggle on={payslipRegen} onChange={() => setPayslipRegen(!payslipRegen)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Audit trail on regeneration</p>
            <SSAToggle on={payslipRegenAudit} onChange={() => setPayslipRegenAudit(!payslipRegenAudit)} theme={theme} />
          </div>
        </div>
      </SectionCard>

      {/* ═══════════════════════════════════════════════
          7. TDS / INCOME TAX — with Full CRUD Tax Slabs
          ═══════════════════════════════════════════════ */}
      <SectionCard title="TDS / Income Tax" subtitle="Tax deduction at source per Indian IT slabs" theme={theme}>
        <div className="flex items-center mb-3">
          <p className={`text-[10px] font-bold ${theme.iconColor}`}>Auto-calculate TDS and generate tax forms</p>
          <InfoIcon tip="Tax deduction at source per Indian IT slabs" />
        </div>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Auto-calculate TDS</p>
            <SSAToggle on={autoTDS} onChange={() => setAutoTDS(!autoTDS)} theme={theme} />
          </div>
          {autoTDS && (
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Income Tax Slabs</p>
              <TableToolbar
                search={taxSearch} onSearch={v => { setTaxSearch(v); setTaxPage(1); }}
                count={filteredTax.length} label="tax slabs"
                onAdd={addTaxSlab}
                onExport={() => alert('Export tax slabs as CSV')}
                onImport={() => alert('Import tax slabs from CSV')}
                theme={theme}
              />
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className={theme.secondaryBg}>
                      {['Slab Name', 'From (\u20B9)', 'To (\u20B9)', 'Rate (%)', 'Enabled', 'Actions'].map(h => (
                        <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor} uppercase text-[10px]`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pagedTax.length === 0 ? (
                      <tr><td colSpan={6} className={`text-center py-6 text-xs ${theme.iconColor}`}>No tax slabs found</td></tr>
                    ) : pagedTax.map(slab => (
                      <tr key={slab.id} className={`border-t ${theme.border} ${!slab.enabled ? 'opacity-50' : ''}`}>
                        <td className="px-2 py-1.5">
                          {taxEdit === slab.id ? (
                            <input autoFocus value={slab.slabName}
                              onChange={e => setTaxSlabs(p => p.map(x => x.id === slab.id ? { ...x, slabName: e.target.value } : x))}
                              className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`}
                              placeholder="Slab name" />
                          ) : (
                            <span className={`font-bold ${theme.highlight}`}>{slab.slabName || '(empty)'}</span>
                          )}
                        </td>
                        <td className="px-2 py-1.5">
                          {taxEdit === slab.id ? (
                            <input value={slab.from} type="number"
                              onChange={e => setTaxSlabs(p => p.map(x => x.id === slab.id ? { ...x, from: e.target.value } : x))}
                              className={`w-24 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-right ${theme.highlight} outline-none`}
                              placeholder="0" />
                          ) : (
                            <span className={`${theme.iconColor}`}>{Number(slab.from).toLocaleString('en-IN')}</span>
                          )}
                        </td>
                        <td className="px-2 py-1.5">
                          {taxEdit === slab.id ? (
                            <input value={slab.to} type="number"
                              onChange={e => setTaxSlabs(p => p.map(x => x.id === slab.id ? { ...x, to: e.target.value } : x))}
                              className={`w-24 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-right ${theme.highlight} outline-none`}
                              placeholder="0" />
                          ) : (
                            <span className={`${theme.iconColor}`}>{Number(slab.to) >= 99999999 ? '\u221E' : Number(slab.to).toLocaleString('en-IN')}</span>
                          )}
                        </td>
                        <td className="px-2 py-1.5">
                          {taxEdit === slab.id ? (
                            <input value={slab.rate}
                              onChange={e => setTaxSlabs(p => p.map(x => x.id === slab.id ? { ...x, rate: e.target.value } : x))}
                              className={`w-16 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center font-bold ${theme.iconColor} outline-none`}
                              placeholder="0" />
                          ) : (
                            <span className={`font-bold ${theme.iconColor}`}>{slab.rate === '0' ? 'Nil' : `${slab.rate}%`}</span>
                          )}
                        </td>
                        <td className="px-3 py-2">
                          <SSAToggle on={slab.enabled} onChange={() => setTaxSlabs(p => p.map(x => x.id === slab.id ? { ...x, enabled: !x.enabled } : x))} theme={theme} />
                        </td>
                        <td className="px-2 py-1.5">
                          <div className="flex items-center gap-1.5">
                            {taxEdit === slab.id ? (
                              <button onClick={() => setTaxEdit(null)} className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${theme.primary} text-white`}>Done</button>
                            ) : (
                              <button onClick={() => setTaxEdit(slab.id)} className={`p-1 rounded-lg ${theme.buttonHover}`}><Pencil size={11} className={theme.iconColor} /></button>
                            )}
                            <button onClick={() => setTaxSlabs(p => p.filter(x => x.id !== slab.id))} className="text-red-400 hover:text-red-600"><Trash2 size={12} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination page={taxPage} total={filteredTax.length} pageSize={PAGE_SIZE} onChange={setTaxPage} theme={theme} />
            </div>
          )}
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Form 16/16A generation</p>
            <SSAToggle on={form16Gen} onChange={() => setForm16Gen(!form16Gen)} theme={theme} />
          </div>
        </div>
      </SectionCard>

      {/* ═══════════════════════════════════════════════
          STATUTORY COMPLIANCE (unchanged)
          ═══════════════════════════════════════════════ */}
      <SectionCard title="Statutory Compliance" subtitle="Auto-calculate PF, ESI, PT per statutory rules" theme={theme}>
        <div className="flex items-center mb-3">
          <p className={`text-[10px] font-bold ${theme.iconColor}`}>Configure statutory deductions</p>
          <InfoIcon tip="Auto-calculate PF, ESI, PT per statutory rules" />
        </div>
        <div className="space-y-3">
          {/* PF/EPF */}
          <div className={`p-3 rounded-xl border ${theme.border} ${theme.secondaryBg}`}>
            <div className="flex items-center justify-between mb-2">
              <p className={`text-xs font-bold ${theme.highlight}`}>PF / EPF</p>
              <SSAToggle on={pfEnabled} onChange={() => setPfEnabled(!pfEnabled)} theme={theme} />
            </div>
            {pfEnabled && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Employee %</p>
                  <InputField value={pfEmployee} onChange={setPfEmployee} theme={theme} type="number" />
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Employer %</p>
                  <InputField value={pfEmployer} onChange={setPfEmployer} theme={theme} type="number" />
                </div>
              </div>
            )}
          </div>
          {/* ESI */}
          <div className={`p-3 rounded-xl border ${theme.border} ${theme.secondaryBg}`}>
            <div className="flex items-center justify-between mb-2">
              <p className={`text-xs font-bold ${theme.highlight}`}>ESI</p>
              <SSAToggle on={esiEnabled} onChange={() => setEsiEnabled(!esiEnabled)} theme={theme} />
            </div>
            {esiEnabled && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Threshold ({'\u20B9'})</p>
                  <InputField value={esiThreshold} onChange={setEsiThreshold} theme={theme} type="number" />
                </div>
              </div>
            )}
          </div>
          {/* Professional Tax */}
          <div className={`p-3 rounded-xl border ${theme.border} ${theme.secondaryBg}`}>
            <div className="flex items-center justify-between mb-2">
              <p className={`text-xs font-bold ${theme.highlight}`}>Professional Tax</p>
              <SSAToggle on={ptEnabled} onChange={() => setPtEnabled(!ptEnabled)} theme={theme} />
            </div>
            {ptEnabled && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>State</p>
                  <SelectField options={['Gujarat', 'Maharashtra', 'Karnataka']} value={ptState} onChange={setPtState} theme={theme} />
                </div>
              </div>
            )}
          </div>
          {/* Gratuity */}
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Gratuity</p>
            <SSAToggle on={gratuityEnabled} onChange={() => setGratuityEnabled(!gratuityEnabled)} theme={theme} />
          </div>
        </div>
      </SectionCard>

      {/* ═══════════════════════════════════════════════
          PAYROLL EXTRAS (unchanged)
          ═══════════════════════════════════════════════ */}
      <SectionCard title="Payroll Extras" subtitle="Additional payroll components beyond base salary" theme={theme}>
        <div className="flex items-center mb-3">
          <p className={`text-[10px] font-bold ${theme.iconColor}`}>Configure overtime, bonuses, advances, and arrears</p>
          <InfoIcon tip="Additional payroll components beyond base salary" />
        </div>
        <div className="space-y-2">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Overtime calculation</p>
            <SSAToggle on={overtimeEnabled} onChange={() => setOvertimeEnabled(!overtimeEnabled)} theme={theme} />
          </div>
          {overtimeEnabled && (
            <div className="grid grid-cols-2 gap-3 pl-4">
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Rate</p>
                <SelectField options={['1.5x', '2x']} value={overtimeRate} onChange={setOvertimeRate} theme={theme} />
              </div>
            </div>
          )}
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Festival advance/bonus</p>
            <SSAToggle on={festivalBonus} onChange={() => setFestivalBonus(!festivalBonus)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Salary advance/loan module</p>
            <SSAToggle on={salaryAdvance} onChange={() => setSalaryAdvance(!salaryAdvance)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Arrears auto-calculation</p>
            <SSAToggle on={arrearsAuto} onChange={() => setArrearsAuto(!arrearsAuto)} theme={theme} />
          </div>
        </div>
      </SectionCard>

      {/* ═══════════════════════════════════════════════
          EXPORT / INTEGRATION (unchanged)
          ═══════════════════════════════════════════════ */}
      <SectionCard title="Export / Integration" subtitle="Generate bank-compatible salary payment files" theme={theme}>
        <div className="flex items-center mb-3">
          <p className={`text-[10px] font-bold ${theme.iconColor}`}>Export payroll data to bank and accounting systems</p>
          <InfoIcon tip="Generate bank-compatible salary payment files" />
        </div>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Bank batch file (NEFT/RTGS)</p>
            <SSAToggle on={bankBatchFile} onChange={() => setBankBatchFile(!bankBatchFile)} theme={theme} />
          </div>
          {bankBatchFile && (
            <div className="grid grid-cols-2 gap-3 pl-4">
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Format</p>
                <SelectField options={['SBI', 'HDFC', 'ICICI', 'Generic']} value={bankFormat} onChange={setBankFormat} theme={theme} />
              </div>
            </div>
          )}
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Tally export</p>
            <SSAToggle on={tallyExport} onChange={() => setTallyExport(!tallyExport)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>QuickBooks sync</p>
            <SSAToggle on={quickbooksSync} onChange={() => setQuickbooksSync(!quickbooksSync)} theme={theme} />
          </div>
        </div>
      </SectionCard>

      {/* ═══════════════════════════════════════════════
          STATUTORY REPORTS (unchanged)
          ═══════════════════════════════════════════════ */}
      <SectionCard title="Statutory Reports" subtitle="Auto-generate statutory filing reports" theme={theme}>
        <div className="flex items-center mb-3">
          <p className={`text-[10px] font-bold ${theme.iconColor}`}>Generate compliance reports for government filings</p>
          <InfoIcon tip="Auto-generate statutory filing reports" />
        </div>
        <div className="space-y-2">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>PF ECR file</p>
            <SSAToggle on={pfECR} onChange={() => setPfECR(!pfECR)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>ESI return</p>
            <SSAToggle on={esiReturn} onChange={() => setEsiReturn(!esiReturn)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Form 16/16A</p>
            <SSAToggle on={form16Report} onChange={() => setForm16Report(!form16Report)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Professional Tax challan</p>
            <SSAToggle on={ptChallan} onChange={() => setPtChallan(!ptChallan)} theme={theme} />
          </div>
        </div>
      </SectionCard>

      {/* ═══════════════════════════════════════════════
          ROLE-BASED PERMISSIONS (unchanged)
          ═══════════════════════════════════════════════ */}
      <SectionCard title="Role-Based Permissions" subtitle="Control who can view, create, edit, delete, import, and export" theme={theme}>
        <div className="space-y-4">
          <MasterPermissionGrid masterName="Departments" roles={['Super Admin', 'Principal', 'School Admin', 'Teacher', 'Accountant']} theme={theme} />
          <MasterPermissionGrid masterName="Designations" roles={['Super Admin', 'Principal', 'School Admin', 'Teacher', 'Accountant']} theme={theme} />
        </div>
      </SectionCard>

      {/* ═══════════════════════════════════════════════
          BULK IMPORT (unchanged)
          ═══════════════════════════════════════════════ */}
      <SectionCard title="Bulk Import" subtitle="Import data from Excel templates" theme={theme}>
        <BulkImportWizard entityName="Staff" templateFields={['Employee ID', 'Name', 'Department', 'Designation', 'Date of Joining', 'Salary', 'Phone', 'Email']} sampleData={[['EMP001', 'Rajesh Sharma', 'Teaching - Secondary', 'PGT', '2024-04-01', '45000', '9876543210', 'rajesh@school.com']]} theme={theme} />
      </SectionCard>

      {/* ═══════════════════════════════════════════════
          SAVE CONFIGURATION BUTTON
          ═══════════════════════════════════════════════ */}
      <div className="flex items-center justify-end gap-3 pt-2">
        {saved && <span className="text-green-500 text-xs font-medium animate-pulse">Configuration saved!</span>}
        <button onClick={handleSave}
          className={`flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-sm font-bold text-white ${theme.primary} hover:opacity-90 transition-all shadow-lg`}>
          <Save size={16} /> Save Configuration
        </button>
      </div>
    </div>
  );
}
