'use client';

import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

export default function LeaveConfigModule({ theme }: { theme: Theme }) {
  const [leaveTypes, setLeaveTypes] = useState([
    { type: 'Casual Leave (CL)', days: '12', carryForward: false, maxCarry: '0' },
    { type: 'Sick Leave (SL)', days: '10', carryForward: true, maxCarry: '5' },
    { type: 'Earned Leave (EL)', days: '15', carryForward: true, maxCarry: '30' },
    { type: 'Maternity Leave', days: '180', carryForward: false, maxCarry: '0' },
    { type: 'Paternity Leave', days: '15', carryForward: false, maxCarry: '0' },
    { type: 'Compensatory Off', days: '0', carryForward: false, maxCarry: '0' },
  ]);
  const [sandwichRule, setSandwichRule] = useState(true);
  const [halfDayLeave, setHalfDayLeave] = useState(true);
  const [approvalChain, setApprovalChain] = useState([
    { level: 1, approver: 'HOD / Coordinator', timeLimit: '24 hours' },
    { level: 2, approver: 'Vice Principal', timeLimit: '48 hours' },
    { level: 3, approver: 'Principal', timeLimit: '72 hours' },
  ]);
  const [nonTeachingApprovalChain, setNonTeachingApprovalChain] = useState([
    { level: 1, approver: 'Department Head / Supervisor', timeLimit: '24 hours' },
    { level: 2, approver: 'Admin Officer', timeLimit: '48 hours' },
  ]);
  const [maxConsecutive, setMaxConsecutive] = useState('5');
  const [lwpThreshold, setLwpThreshold] = useState('3');

  return (
    <div className="space-y-4">
      <ModuleHeader title="Leave Policy Configuration" subtitle="Leave types, carry-forward rules, approval chain, and thresholds" theme={theme} />

      <SectionCard title="Leave Types &amp; Annual Allocation" subtitle="Edit leave type names, days, carry-forward — add or delete" theme={theme}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Leave Type', 'Days/Year', 'Carry Forward', 'Max Carry', ''].map(h => (
                <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {leaveTypes.map((lt, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className="px-2 py-1.5">
                    <input value={lt.type} onChange={e => { const n = [...leaveTypes]; n[i] = { ...n[i], type: e.target.value }; setLeaveTypes(n); }}
                      className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <input value={lt.days} onChange={e => { const n = [...leaveTypes]; n[i] = { ...n[i], days: e.target.value }; setLeaveTypes(n); }}
                      className={`w-16 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-3 py-2">
                    <SSAToggle on={lt.carryForward} onChange={() => { const n = [...leaveTypes]; n[i] = { ...n[i], carryForward: !n[i].carryForward }; setLeaveTypes(n); }} theme={theme} />
                  </td>
                  <td className="px-2 py-1.5">
                    <input value={lt.maxCarry} onChange={e => { const n = [...leaveTypes]; n[i] = { ...n[i], maxCarry: e.target.value }; setLeaveTypes(n); }}
                      disabled={!lt.carryForward}
                      className={`w-16 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none ${!lt.carryForward ? 'opacity-30' : ''}`} />
                  </td>
                  <td className="px-2 py-1.5"><button onClick={() => setLeaveTypes(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={12} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={() => setLeaveTypes(p => [...p, { type: '', days: '0', carryForward: false, maxCarry: '0' }])}
          className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl mt-2`}>
          <Plus size={12} /> Add Leave Type
        </button>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
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

        <div className="space-y-4">
          <SectionCard title="Teaching Staff Approval Chain" subtitle="Edit approver name and time limit — add or remove steps" theme={theme}>
            <div className="space-y-2">
              {approvalChain.map((a, i) => (
                <div key={i} className={`flex items-center gap-2 p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <span className={`text-[10px] w-6 h-6 rounded-full ${theme.primary} text-white flex items-center justify-center font-bold shrink-0`}>{i + 1}</span>
                  <input value={a.approver} onChange={e => { const n = [...approvalChain]; n[i] = { ...n[i], approver: e.target.value }; setApprovalChain(n); }}
                    className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} placeholder="Approver role" />
                  <input value={a.timeLimit} onChange={e => { const n = [...approvalChain]; n[i] = { ...n[i], timeLimit: e.target.value }; setApprovalChain(n); }}
                    className={`w-24 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.iconColor} outline-none`} placeholder="e.g. 24 hours" />
                  <button onClick={() => setApprovalChain(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
                </div>
              ))}
              <button onClick={() => setApprovalChain(p => [...p, { level: p.length + 1, approver: '', timeLimit: '24 hours' }])}
                className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
                <Plus size={12} /> Add Step
              </button>
            </div>
          </SectionCard>

          <SectionCard title="Non-Teaching Staff Approval Chain" subtitle="Edit approver name and time limit — add or remove steps" theme={theme}>
            <div className="space-y-2">
              {nonTeachingApprovalChain.map((a, i) => (
                <div key={i} className={`flex items-center gap-2 p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <span className={`text-[10px] w-6 h-6 rounded-full ${theme.primary} text-white flex items-center justify-center font-bold shrink-0`}>{i + 1}</span>
                  <input value={a.approver} onChange={e => { const n = [...nonTeachingApprovalChain]; n[i] = { ...n[i], approver: e.target.value }; setNonTeachingApprovalChain(n); }}
                    className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} placeholder="Approver role" />
                  <input value={a.timeLimit} onChange={e => { const n = [...nonTeachingApprovalChain]; n[i] = { ...n[i], timeLimit: e.target.value }; setNonTeachingApprovalChain(n); }}
                    className={`w-24 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.iconColor} outline-none`} placeholder="e.g. 24 hours" />
                  <button onClick={() => setNonTeachingApprovalChain(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
                </div>
              ))}
              <button onClick={() => setNonTeachingApprovalChain(p => [...p, { level: p.length + 1, approver: '', timeLimit: '24 hours' }])}
                className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
                <Plus size={12} /> Add Step
              </button>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
