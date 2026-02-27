'use client';

import React, { useState } from 'react';
import { X, Plus, CheckCircle } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, SelectField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

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
    </div>
  );
}
