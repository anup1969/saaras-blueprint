'use client';

import React, { useState } from 'react';
import { X, Plus, CheckCircle, Info, Upload } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, SelectField, InputField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

function InfoIcon({ tip }: { tip: string }) {
  return <span title={tip} className="inline-flex ml-1.5 shrink-0 cursor-help"><Info size={13} className="text-blue-400 hover:text-blue-600" /></span>;
}
function MobileBadge() {
  return <span className="ml-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-green-100 text-green-700 whitespace-nowrap">{'\uD83D\uDCF1'} Mobile</span>;
}

export default function HRConfigModule({ theme }: { theme: Theme }) {
  const [departments, setDepartments] = useState(['Administration', 'Teaching - Primary', 'Teaching - Secondary', 'Teaching - Senior', 'Accounts', 'IT', 'Transport', 'Housekeeping', 'Security', 'Library', 'Lab']);
  const [designations, setDesignations] = useState(['Principal', 'Vice Principal', 'HOD', 'PGT', 'TGT', 'PRT', 'Lab Assistant', 'Librarian', 'Accountant', 'Driver', 'Peon', 'Security Guard']);
  const [newDept, setNewDept] = useState('');
  const [newDesig, setNewDesig] = useState('');
  const [salaryComponents, setSalaryComponents] = useState([
    { name: 'Basic Salary', type: 'earning', percentage: '40%' },
    { name: 'HRA', type: 'earning', percentage: '20%' },
    { name: 'DA', type: 'earning', percentage: '15%' },
    { name: 'Transport Allowance', type: 'earning', percentage: '5%' },
    { name: 'Special Allowance', type: 'earning', percentage: '10%' },
    { name: 'PF (Employee)', type: 'deduction', percentage: '12%' },
    { name: 'ESI', type: 'deduction', percentage: '0.75%' },
    { name: 'Professional Tax', type: 'deduction', percentage: 'Fixed' },
    { name: 'TDS', type: 'deduction', percentage: 'Slab' },
  ]);
  const [payCycle, setPayCycle] = useState('Monthly');
  const [payDay, setPayDay] = useState('Last working day');
  const [staffAttendance, setStaffAttendance] = useState<Record<string, boolean>>({
    'Biometric': true, 'Mobile App': true, 'RFID': false, 'Manual Register': true, 'Geo-fencing': false,
  });
  const [onboardingChecklist, setOnboardingChecklist] = useState([
    'Document verification (Aadhaar, PAN, Degree certificates)',
    'Police verification submission',
    'Bank account details for salary',
    'PF & ESI registration',
    'Photo ID card generation',
    'System login creation',
    'Assign department & reporting manager',
    'Probation period agreement',
  ]);
  const [newChecklistItem, setNewChecklistItem] = useState('');
  const [hrLetters, setHrLetters] = useState(['Offer Letter', 'Appointment Letter', 'Confirmation Letter', 'Experience Letter', 'Relieving Letter', 'Salary Slip', 'Warning Letter', 'Termination Letter']);
  const [newHrLetter, setNewHrLetter] = useState('');
  const [appraisalStages, setAppraisalStages] = useState(['Self Assessment', 'HOD Review', 'Principal Review', 'Management Approval', 'Letter Generation']);

  // --- NEW STATE ---
  // LOP Calculation
  const [lopMethod, setLopMethod] = useState('LOPD');
  // Payslip Settings
  const [payslipPDF, setPayslipPDF] = useState(true);
  const [payslipPassword, setPayslipPassword] = useState(false);
  const [payslipDistribution, setPayslipDistribution] = useState<Record<string, boolean>>({ Email: true, WhatsApp: false, 'Self-service portal': true });
  const [payslipRegen, setPayslipRegen] = useState(false);
  const [payslipRegenAudit, setPayslipRegenAudit] = useState(true);
  // TDS
  const [autoTDS, setAutoTDS] = useState(true);
  const [form16Gen, setForm16Gen] = useState(true);
  // Statutory
  const [pfEnabled, setPfEnabled] = useState(true);
  const [pfEmployee, setPfEmployee] = useState('12');
  const [pfEmployer, setPfEmployer] = useState('12');
  const [esiEnabled, setEsiEnabled] = useState(true);
  const [esiThreshold, setEsiThreshold] = useState('21000');
  const [ptEnabled, setPtEnabled] = useState(true);
  const [ptState, setPtState] = useState('Gujarat');
  const [gratuityEnabled, setGratuityEnabled] = useState(false);
  // Payroll Extras
  const [overtimeEnabled, setOvertimeEnabled] = useState(false);
  const [overtimeRate, setOvertimeRate] = useState('1.5x');
  const [festivalBonus, setFestivalBonus] = useState(false);
  const [salaryAdvance, setSalaryAdvance] = useState(false);
  const [arrearsAuto, setArrearsAuto] = useState(false);
  // Export / Integration
  const [bankBatchFile, setBankBatchFile] = useState(true);
  const [bankFormat, setBankFormat] = useState('SBI');
  const [tallyExport, setTallyExport] = useState(false);
  const [quickbooksSync, setQuickbooksSync] = useState(false);
  // Statutory Reports
  const [pfECR, setPfECR] = useState(true);
  const [esiReturn, setEsiReturn] = useState(true);
  const [form16Report, setForm16Report] = useState(true);
  const [ptChallan, setPtChallan] = useState(true);

  return (
    <div className="space-y-4">
      <ModuleHeader title="HR & Payroll Configuration" subtitle="Departments, salary structure, pay cycle, attendance, and HR processes" theme={theme} />

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Departments" subtitle="Add or remove departments" theme={theme}>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {departments.map(d => (
              <span key={d} className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${theme.secondaryBg} text-xs font-medium ${theme.highlight}`}>
                {d}
                <button onClick={() => setDepartments(p => p.filter(x => x !== d))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={newDept} onChange={e => setNewDept(e.target.value)} placeholder="Add department..."
              className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
            <button onClick={() => { if (newDept.trim()) { setDepartments(p => [...p, newDept.trim()]); setNewDept(''); } }}
              className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={14} /></button>
          </div>
        </SectionCard>

        <SectionCard title="Designations" subtitle="Add or remove designations" theme={theme}>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {designations.map(d => (
              <span key={d} className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${theme.secondaryBg} text-xs font-medium ${theme.highlight}`}>
                {d}
                <button onClick={() => setDesignations(p => p.filter(x => x !== d))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={newDesig} onChange={e => setNewDesig(e.target.value)} placeholder="Add designation..."
              className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
            <button onClick={() => { if (newDesig.trim()) { setDesignations(p => [...p, newDesig.trim()]); setNewDesig(''); } }}
              className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={14} /></button>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Salary Structure" subtitle="Earning and deduction components — edit name, type, and percentage" theme={theme}>
        <div className="space-y-1.5">
          {salaryComponents.map((c, i) => (
            <div key={i} className={`flex items-center gap-2 p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <select value={c.type} onChange={e => { const n = [...salaryComponents]; n[i] = { ...n[i], type: e.target.value }; setSalaryComponents(n); }}
                className={`text-[9px] px-1.5 py-1 rounded font-bold ${c.type === 'earning' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'} border-0 outline-none`}>
                <option value="earning">EARN</option>
                <option value="deduction">DED</option>
              </select>
              <input value={c.name} onChange={e => { const n = [...salaryComponents]; n[i] = { ...n[i], name: e.target.value }; setSalaryComponents(n); }}
                className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-medium ${theme.highlight} outline-none`} />
              <input value={c.percentage} onChange={e => { const n = [...salaryComponents]; n[i] = { ...n[i], percentage: e.target.value }; setSalaryComponents(n); }}
                className={`w-16 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center font-bold ${theme.iconColor} outline-none`} />
              <button onClick={() => setSalaryComponents(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
            </div>
          ))}
          <button onClick={() => setSalaryComponents(p => [...p, { name: '', type: 'earning', percentage: '' }])}
            className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
            <Plus size={12} /> Add Component
          </button>
        </div>
      </SectionCard>

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

      <SectionCard title="Staff Onboarding Checklist" subtitle="Required steps for new staff — edit or remove items" theme={theme}>
        <div className="space-y-1.5">
          {onboardingChecklist.map((item, i) => (
            <div key={i} className={`flex items-center gap-2 p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <CheckCircle size={14} className="text-emerald-500 shrink-0" />
              <input value={item} onChange={e => { const n = [...onboardingChecklist]; n[i] = e.target.value; setOnboardingChecklist(n); }}
                className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
              <button onClick={() => setOnboardingChecklist(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
            </div>
          ))}
          <div className="flex gap-2">
            <input value={newChecklistItem} onChange={e => setNewChecklistItem(e.target.value)} placeholder="Add checklist item..."
              onKeyDown={e => { if (e.key === 'Enter' && newChecklistItem.trim()) { setOnboardingChecklist(p => [...p, newChecklistItem.trim()]); setNewChecklistItem(''); } }}
              className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
            <button onClick={() => { if (newChecklistItem.trim()) { setOnboardingChecklist(p => [...p, newChecklistItem.trim()]); setNewChecklistItem(''); } }}
              className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={14} /></button>
          </div>
        </div>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="HR Letter Templates" subtitle="Add or remove letter types" theme={theme}>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {hrLetters.map(l => (
              <span key={l} className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${theme.secondaryBg} text-xs font-medium ${theme.highlight}`}>
                {l}
                <button onClick={() => setHrLetters(p => p.filter(x => x !== l))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={newHrLetter} onChange={e => setNewHrLetter(e.target.value)} placeholder="Add letter type..."
              className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
            <button onClick={() => { if (newHrLetter.trim()) { setHrLetters(p => [...p, newHrLetter.trim()]); setNewHrLetter(''); } }}
              className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={14} /></button>
          </div>
        </SectionCard>

        <SectionCard title="Performance Appraisal Stages" subtitle="Multi-level review — edit, reorder, or remove" theme={theme}>
          <div className="space-y-1.5">
            {appraisalStages.map((s, i) => (
              <div key={i} className={`flex items-center gap-2 p-2 rounded-xl ${theme.secondaryBg}`}>
                <span className={`text-[10px] w-5 h-5 rounded-full ${theme.primary} text-white flex items-center justify-center font-bold shrink-0`}>{i + 1}</span>
                <input value={s} onChange={e => { const n = [...appraisalStages]; n[i] = e.target.value; setAppraisalStages(n); }}
                  className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                <button onClick={() => setAppraisalStages(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
              </div>
            ))}
            <button onClick={() => setAppraisalStages(p => [...p, ''])}
              className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
              <Plus size={12} /> Add Stage
            </button>
          </div>
        </SectionCard>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          NEW SECTIONS
          ═══════════════════════════════════════════════════════════════ */}

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
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead><tr className={theme.secondaryBg}>
                    {['Income Range', 'Tax Rate'].map(h => (
                      <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor}`}>{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {[
                      { range: '0 - 5 Lakhs', rate: 'Nil' },
                      { range: '5 - 10 Lakhs', rate: '20%' },
                      { range: '10 Lakhs+', rate: '30%' },
                    ].map((slab, i) => (
                      <tr key={i} className={`border-t ${theme.border}`}>
                        <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{slab.range}</td>
                        <td className={`px-3 py-2 ${theme.iconColor}`}>{slab.rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Form 16/16A generation</p>
            <SSAToggle on={form16Gen} onChange={() => setForm16Gen(!form16Gen)} theme={theme} />
          </div>
        </div>
      </SectionCard>

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
    </div>
  );
}
