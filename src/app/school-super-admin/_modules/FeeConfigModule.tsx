'use client';

import { useState } from 'react';
import { Lock, Plus, X } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

export default function FeeConfigModule({ theme }: { theme: Theme }) {
  const [feeTemplate, setFeeTemplate] = useState('component-based');
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  const [feeHeads, setFeeHeads] = useState<Record<string, boolean>>({
    'Tuition Fee': true, 'Admission Fee': true, 'Annual Charges': true, 'Transport Fee': true,
    'Activity Fee': true, 'Lab Fee': true, 'Library Fee': false, 'Exam Fee': true,
    'Development Fund': false, 'Smart Class / IT Fee': false, 'Uniform / Books': false, 'Hostel Fee': false,
  });
  const [feeFrequency, setFeeFrequency] = useState<Record<string, string>>({
    'Tuition Fee': 'Monthly', 'Admission Fee': 'One-time', 'Annual Charges': 'Yearly',
    'Transport Fee': 'Monthly', 'Activity Fee': 'Quarterly', 'Lab Fee': 'Yearly', 'Exam Fee': 'Term-wise',
  });
  const allGrades = ['Nursery', 'Jr. KG', 'Sr. KG', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
  const [gradeAmounts, setGradeAmounts] = useState<Record<string, Record<string, string>>>({
    'Nursery': { 'Tuition Fee': '2500', 'Admission Fee': '12000', 'Annual Charges': '6000', 'Transport Fee': '1800', 'Activity Fee': '1200', 'Lab Fee': '0', 'Exam Fee': '800' },
    'Jr. KG': { 'Tuition Fee': '2800', 'Admission Fee': '13000', 'Annual Charges': '6500', 'Transport Fee': '1800', 'Activity Fee': '1300', 'Lab Fee': '0', 'Exam Fee': '800' },
    'Sr. KG': { 'Tuition Fee': '3000', 'Admission Fee': '14000', 'Annual Charges': '7000', 'Transport Fee': '1800', 'Activity Fee': '1400', 'Lab Fee': '0', 'Exam Fee': '900' },
    'Grade 1': { 'Tuition Fee': '3200', 'Admission Fee': '15000', 'Annual Charges': '8000', 'Transport Fee': '2000', 'Activity Fee': '1600', 'Lab Fee': '500', 'Exam Fee': '1000' },
    'Grade 2': { 'Tuition Fee': '3300', 'Admission Fee': '15500', 'Annual Charges': '8200', 'Transport Fee': '2000', 'Activity Fee': '1600', 'Lab Fee': '500', 'Exam Fee': '1000' },
    'Grade 3': { 'Tuition Fee': '3400', 'Admission Fee': '16000', 'Annual Charges': '8500', 'Transport Fee': '2000', 'Activity Fee': '1700', 'Lab Fee': '600', 'Exam Fee': '1000' },
    'Grade 4': { 'Tuition Fee': '3500', 'Admission Fee': '16500', 'Annual Charges': '9000', 'Transport Fee': '2000', 'Activity Fee': '1800', 'Lab Fee': '700', 'Exam Fee': '1100' },
    'Grade 5': { 'Tuition Fee': '3600', 'Admission Fee': '17000', 'Annual Charges': '9500', 'Transport Fee': '2000', 'Activity Fee': '1900', 'Lab Fee': '800', 'Exam Fee': '1100' },
    'Grade 6': { 'Tuition Fee': '4000', 'Admission Fee': '18000', 'Annual Charges': '10000', 'Transport Fee': '2200', 'Activity Fee': '2000', 'Lab Fee': '1500', 'Exam Fee': '1200' },
    'Grade 7': { 'Tuition Fee': '4200', 'Admission Fee': '18500', 'Annual Charges': '10500', 'Transport Fee': '2200', 'Activity Fee': '2100', 'Lab Fee': '1600', 'Exam Fee': '1300' },
    'Grade 8': { 'Tuition Fee': '4500', 'Admission Fee': '19000', 'Annual Charges': '11000', 'Transport Fee': '2500', 'Activity Fee': '2200', 'Lab Fee': '1800', 'Exam Fee': '1400' },
    'Grade 9': { 'Tuition Fee': '5000', 'Admission Fee': '22000', 'Annual Charges': '13000', 'Transport Fee': '2500', 'Activity Fee': '2500', 'Lab Fee': '2500', 'Exam Fee': '1700' },
    'Grade 10': { 'Tuition Fee': '5500', 'Admission Fee': '24000', 'Annual Charges': '14000', 'Transport Fee': '2500', 'Activity Fee': '2800', 'Lab Fee': '3000', 'Exam Fee': '2000' },
    'Grade 11': { 'Tuition Fee': '6500', 'Admission Fee': '28000', 'Annual Charges': '16000', 'Transport Fee': '3000', 'Activity Fee': '3200', 'Lab Fee': '4000', 'Exam Fee': '2200' },
    'Grade 12': { 'Tuition Fee': '7000', 'Admission Fee': '30000', 'Annual Charges': '18000', 'Transport Fee': '3000', 'Activity Fee': '3500', 'Lab Fee': '5000', 'Exam Fee': '2500' },
  });
  const [paymentModes, setPaymentModes] = useState<Record<string, boolean>>({ UPI: true, 'Net Banking': true, 'Credit Card': true, 'Debit Card': true, Cash: true, Cheque: true, 'DD/NEFT': true });
  const [paymentModesTable, setPaymentModesTable] = useState([
    { name: 'Cash', active: true, processingFee: '0', autoReceipt: true, reconciliation: 'Auto', isDefault: true },
    { name: 'Cheque', active: true, processingFee: '0', autoReceipt: false, reconciliation: 'Manual', isDefault: false },
    { name: 'UPI', active: true, processingFee: '0.5', autoReceipt: true, reconciliation: 'Auto', isDefault: false },
    { name: 'Net Banking', active: true, processingFee: '1', autoReceipt: true, reconciliation: 'Auto', isDefault: false },
    { name: 'Credit Card', active: true, processingFee: '1.5', autoReceipt: true, reconciliation: 'Auto', isDefault: false },
    { name: 'Debit Card', active: true, processingFee: '0.8', autoReceipt: true, reconciliation: 'Auto', isDefault: false },
    { name: 'DD/NEFT', active: true, processingFee: '0', autoReceipt: false, reconciliation: 'Manual', isDefault: false },
    { name: 'Paytm/PhonePe', active: false, processingFee: '0.5', autoReceipt: true, reconciliation: 'Auto', isDefault: false },
  ]);
  const [lateFeeEnabled, setLateFeeEnabled] = useState(true);
  const [lateFeeAmount, setLateFeeAmount] = useState('50');
  const [lateFeeGrace, setLateFeeGrace] = useState('7');
  const [lateFeeMethod, setLateFeeMethod] = useState('per-day');
  const [lateFeeMax, setLateFeeMax] = useState('500');
  const [billingCycle, setBillingCycle] = useState('Monthly');
  const [dueDate, setDueDate] = useState('10');
  const [concessions, setConcessions] = useState([
    { type: 'Sibling Discount', method: 'percentage', value: '10', maxAmount: '', approvalRequired: false, active: true, appliesTo: 'tuition-only' },
    { type: 'Merit Scholarship', method: 'percentage', value: '25', maxAmount: '50000', approvalRequired: true, active: true, appliesTo: 'all-components' },
    { type: 'Staff Child', method: 'percentage', value: '100', maxAmount: '', approvalRequired: false, active: true, appliesTo: 'all-components' },
    { type: 'Economic Weaker (EWS)', method: 'percentage', value: '50', maxAmount: '', approvalRequired: true, active: true, appliesTo: 'tuition-annual' },
    { type: 'Sports Quota', method: 'percentage', value: '15', maxAmount: '30000', approvalRequired: true, active: true, appliesTo: 'tuition-only' },
    { type: 'SC/ST Scholarship', method: 'fixed', value: '25000', maxAmount: '', approvalRequired: true, active: true, appliesTo: 'all-components' },
    { type: 'Single Parent', method: 'percentage', value: '20', maxAmount: '20000', approvalRequired: true, active: true, appliesTo: 'tuition-annual' },
  ]);
  const [concessionApprovalMode, setConcessionApprovalMode] = useState('Principal + Admin');
  const [concessionApprovalRequired, setConcessionApprovalRequired] = useState(true);
  const [concessionApprovalChain] = useState(['Accounts Officer', 'Principal', 'Trust / Management']);
  const [maxConcessionWithoutApproval, setMaxConcessionWithoutApproval] = useState('5000');
  const [blockRules, setBlockRules] = useState<Record<string, boolean>>({
    'Block report card if fees overdue > 60 days': true,
    'Block TC generation if outstanding > 0': true,
    'Block exam hall ticket if current term unpaid': false,
    'Send auto-reminder before blocking': true,
  });
  const [reminders] = useState([
    { timing: '7 days before due', channel: 'Push + SMS', enabled: true },
    { timing: '3 days before due', channel: 'Push', enabled: true },
    { timing: '1 day before due', channel: 'Push + SMS', enabled: true },
    { timing: '1 day after due', channel: 'Push + SMS + Email', enabled: true },
    { timing: '7 days after due', channel: 'Push + SMS', enabled: true },
    { timing: '15 days after due', channel: 'Push + SMS + Call', enabled: true },
    { timing: '30 days after due', channel: 'Push + SMS + Email + Call', enabled: true },
  ]);

  const activeHeads = Object.entries(feeHeads).filter(([, v]) => v).map(([k]) => k);
  const frequencies = ['Monthly', 'Quarterly', 'Term-wise', 'Half-yearly', 'Yearly', 'One-time'];

  return (
    <div className="space-y-4">
      <ModuleHeader title="Fee Configuration" subtitle="Configure fee structure, class-wise amounts, payment rules, and concessions" theme={theme} />

      {/* Critical Lock Banner for Fee Module */}
      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3 flex items-center gap-3">
        <Lock size={14} className="text-rose-500 shrink-0" />
        <p className="text-xs text-rose-700"><strong>Fee Structure Changes</strong> is a locked field. Editing fee heads or amounts will require OTP verification from the registered Trustee.</p>
      </div>

      <div className="relative">
        <span className="absolute -top-1 right-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-100 border border-rose-300 text-[9px] font-bold text-rose-700">
          <Lock size={9} /> LOCKED
        </span>
        <SectionCard title="Fee Template" subtitle="Choose how fees are structured for your school" theme={theme}>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'simple-annual', name: 'Simple Annual', desc: 'One lump-sum fee per year per class' },
            { id: 'component-based', name: 'Component-Based', desc: 'Multiple fee heads with individual amounts' },
            { id: 'term-wise', name: 'Term-Wise', desc: 'Split by terms (Term 1, Term 2, etc.)' },
          ].map(t => (
            <button key={t.id} onClick={() => setFeeTemplate(t.id)}
              className={`p-3 rounded-xl text-left border-2 transition-all ${feeTemplate === t.id ? `${theme.primary} text-white border-transparent` : `${theme.secondaryBg} ${theme.border} ${theme.highlight}`}`}>
              <p className="text-xs font-bold">{t.name}</p>
              <p className={`text-[10px] mt-1 ${feeTemplate === t.id ? 'text-white/80' : theme.iconColor}`}>{t.desc}</p>
            </button>
          ))}
        </div>
      </SectionCard>
      </div>

      {feeTemplate !== 'simple-annual' && (
      <SectionCard title="Fee Heads" subtitle="Toggle fee components on/off and set frequency" theme={theme}>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
          {Object.entries(feeHeads).map(([head, enabled]) => (
            <div key={head} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <SSAToggle on={enabled} onChange={() => setFeeHeads(p => ({ ...p, [head]: !p[head] }))} theme={theme} label={head} />
                <span className={`text-xs font-medium ${theme.highlight} truncate`}>{head}</span>
              </div>
              {enabled && (
                <select value={feeFrequency[head] || 'Yearly'} onChange={e => setFeeFrequency(p => ({ ...p, [head]: e.target.value }))}
                  className={`text-[10px] px-1.5 py-0.5 rounded-lg border ${theme.border} ${theme.inputBg} ${theme.highlight} ml-2`}>
                  {(feeTemplate === 'term-wise' ? ['Term 1', 'Term 2', 'Term 3', 'All Terms'] : frequencies).map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              )}
            </div>
          ))}
        </div>

      </SectionCard>
      )}

      <div className="relative">
        <span className="absolute -top-1 right-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-100 border border-rose-300 text-[9px] font-bold text-rose-700">
          <Lock size={9} /> LOCKED
        </span>
        <SectionCard title="Grade-wise Fee Amounts" subtitle="Set amounts per grade for each active fee head (values in INR)" theme={theme}>
        {feeTemplate === 'term-wise' && (
          <div className="flex items-center gap-2 mb-3">
            <p className={`text-[10px] font-bold ${theme.iconColor}`}>Term:</p>
            {['Term 1', 'Term 2', 'Term 3'].map(t => (
              <button key={t} onClick={() => setSelectedTerm(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedTerm === t ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.highlight} ${theme.border} border`}`}>
                {t}
              </button>
            ))}
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className={theme.secondaryBg}>
                <th className={`text-left px-3 py-2 font-bold ${theme.iconColor} sticky left-0 ${theme.secondaryBg}`}>Grade</th>
                {feeTemplate === 'simple-annual' ? (
                  <th className={`text-center px-2 py-2 font-bold ${theme.iconColor} whitespace-nowrap`}>Annual Fee</th>
                ) : activeHeads.map(h => (
                  <th key={h} className={`text-center px-2 py-2 font-bold ${theme.iconColor} whitespace-nowrap`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allGrades.map(cg => (
                <tr key={cg} className={`border-t ${theme.border}`}>
                  <td className={`px-3 py-2 font-bold ${theme.highlight} sticky left-0 ${theme.cardBg} whitespace-nowrap`}>{cg}</td>
                  {feeTemplate === 'simple-annual' ? (
                    <td className="px-2 py-1.5">
                      <div className="flex items-center gap-0.5">
                        <span className={`text-[10px] ${theme.iconColor}`}>{'\u20B9'}</span>
                        <input type="text" value={gradeAmounts[cg]?.['Annual Fee'] || ''}
                          onChange={e => setGradeAmounts(p => ({ ...p, [cg]: { ...p[cg], 'Annual Fee': e.target.value } }))}
                          className={`w-20 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none focus:ring-1 focus:ring-slate-300`} />
                      </div>
                    </td>
                  ) : activeHeads.map(h => {
                    const val = gradeAmounts[cg]?.[h] || '';
                    const isInvalid = val !== '' && (isNaN(Number(val)) || Number(val) < 0);
                    return (
                    <td key={h} className="px-2 py-1.5">
                      <div className="flex flex-col items-center gap-0">
                        <div className="flex items-center gap-0.5">
                          <span className={`text-[10px] ${theme.iconColor}`}>{'\u20B9'}</span>
                          <input type="text" value={val}
                            onChange={e => setGradeAmounts(p => ({ ...p, [cg]: { ...p[cg], [h]: e.target.value } }))}
                            className={`w-16 px-1.5 py-1 rounded-lg border ${isInvalid ? 'border-red-400 bg-red-50' : `${theme.border} ${theme.inputBg}`} text-xs text-center ${theme.highlight} outline-none focus:ring-1 ${isInvalid ? 'focus:ring-red-300' : 'focus:ring-slate-300'}`} />
                        </div>
                        {isInvalid && <span className="text-[7px] text-red-500 font-bold">Invalid</span>}
                      </div>
                    </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Payment Configuration" subtitle="Modes, billing cycle, and due dates" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Accepted Payment Modes</p>
              <div className="grid grid-cols-2 gap-1.5">
                {Object.entries(paymentModes).map(([mode, enabled]) => (
                  <div key={mode} className={`flex items-center gap-2 p-2 rounded-lg ${theme.secondaryBg}`}>
                    <SSAToggle on={enabled} onChange={() => setPaymentModes(p => ({ ...p, [mode]: !p[mode] }))} theme={theme} label={mode} />
                    <div>
                      <p className={`text-xs font-bold ${theme.highlight}`}>{mode}</p>
                      <p className={`text-[9px] ${theme.iconColor}`}>{
                        ({
                          'UPI': 'Google Pay, PhonePe, Paytm etc.',
                          'Net Banking': 'Direct bank transfer via internet banking',
                          'Credit Card': 'Visa, Mastercard credit cards',
                          'Debit Card': 'Bank debit/ATM cards',
                          'Cash': 'Cash payment at school counter',
                          'Cheque': 'Bank cheque/demand draft',
                          'DD/NEFT': 'Bank wire transfer (NEFT/RTGS/IMPS)',
                        } as Record<string, string>)[mode]
                      }</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Billing Cycle</p>
                {feeTemplate === 'term-wise' ? (
                  <InputField value="Term-wise" onChange={() => {}} theme={theme} disabled />
                ) : (
                  <SelectField options={['Monthly', 'Quarterly', 'Term-wise', 'Half-yearly', 'Yearly']} value={billingCycle} onChange={setBillingCycle} theme={theme} />
                )}
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Due Date (day of month)</p>
                <InputField value={dueDate} onChange={setDueDate} theme={theme} type="number" />
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Late Fee Rules" subtitle="Penalties for overdue payments" theme={theme}>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <span className={`text-xs font-bold ${theme.highlight}`}>Enable Late Fee</span>
              <SSAToggle on={lateFeeEnabled} onChange={() => setLateFeeEnabled(!lateFeeEnabled)} theme={theme} label="Enable Late Fee" />
            </div>
            {lateFeeEnabled && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Amount ({'\u20B9'})</p>
                  <InputField value={lateFeeAmount} onChange={setLateFeeAmount} theme={theme} type="number" />
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Grace Period (days)</p>
                  <InputField value={lateFeeGrace} onChange={setLateFeeGrace} theme={theme} type="number" />
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Calculation</p>
                  <SelectField options={['per-day', 'per-week', 'flat']} value={lateFeeMethod} onChange={setLateFeeMethod} theme={theme} />
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max Late Fee ({'\u20B9'})</p>
                  <InputField value={lateFeeMax} onChange={setLateFeeMax} theme={theme} type="number" />
                </div>
              </div>
            )}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Concession & Scholarship Master" subtitle="Configure discount types, approval requirements, and maximum limits" theme={theme}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Type Name', 'Applies To', 'Method', 'Value', 'Max Amt', 'Approval', 'Active', ''].map(h => (
                <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {concessions.map((c, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className="px-2 py-1.5">
                    <input value={c.type} onChange={e => { const n = [...concessions]; n[i] = { ...n[i], type: e.target.value }; setConcessions(n); }}
                      className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <select value={c.appliesTo || 'all-components'} onChange={e => { const n = [...concessions]; n[i] = { ...n[i], appliesTo: e.target.value }; setConcessions(n); }}
                      className={`px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight}`}>
                      <option value="all-components">All Components</option>
                      <option value="tuition-only">Tuition Only</option>
                      <option value="tuition-annual">Tuition + Annual</option>
                      <option value="excluding-transport">Excl. Transport</option>
                      <option value="custom">Custom Selection</option>
                    </select>
                  </td>
                  <td className="px-2 py-1.5">
                    <select value={c.method} onChange={e => { const n = [...concessions]; n[i] = { ...n[i], method: e.target.value }; setConcessions(n); }}
                      className={`px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight}`}>
                      <option value="percentage">%</option>
                      <option value="fixed">{'\u20B9'} Fixed</option>
                    </select>
                  </td>
                  <td className="px-2 py-1.5">
                    <input value={c.value} onChange={e => { const n = [...concessions]; n[i] = { ...n[i], value: e.target.value }; setConcessions(n); }}
                      className={`w-14 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <input value={c.maxAmount} onChange={e => { const n = [...concessions]; n[i] = { ...n[i], maxAmount: e.target.value }; setConcessions(n); }}
                      placeholder="-" className={`w-16 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <SSAToggle on={c.approvalRequired} onChange={() => { const n = [...concessions]; n[i] = { ...n[i], approvalRequired: !n[i].approvalRequired }; setConcessions(n); }} theme={theme} />
                  </td>
                  <td className="px-2 py-1.5">
                    <SSAToggle on={c.active} onChange={() => { const n = [...concessions]; n[i] = { ...n[i], active: !n[i].active }; setConcessions(n); }} theme={theme} label={c.type} />
                  </td>
                  <td className="px-2 py-1.5"><button onClick={() => setConcessions(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={12} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <button onClick={() => setConcessions(p => [...p, { type: '', method: 'percentage', value: '0', maxAmount: '', approvalRequired: false, active: true, appliesTo: 'all-components' }])}
              className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
              <Plus size={12} /> Add Concession Type
            </button>
            {/* Bulk operations (B4) */}
            <button onClick={() => setConcessions(p => p.map(c => ({ ...c, active: true })))}
              className={`px-2.5 py-1.5 rounded-lg text-[9px] font-bold bg-emerald-100 text-emerald-700 hover:bg-emerald-200`}>Activate All</button>
            <button onClick={() => setConcessions(p => p.map(c => ({ ...c, active: false })))}
              className={`px-2.5 py-1.5 rounded-lg text-[9px] font-bold bg-gray-100 text-gray-600 hover:bg-gray-200`}>Deactivate All</button>
            <button onClick={() => setConcessions(p => p.filter(c => c.active))}
              className={`px-2.5 py-1.5 rounded-lg text-[9px] font-bold bg-red-100 text-red-600 hover:bg-red-200`}>Delete Inactive</button>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold ${theme.iconColor}`}>Approval Workflow:</span>
            <select value={concessionApprovalMode} onChange={e => setConcessionApprovalMode(e.target.value)}
              className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] font-bold ${theme.highlight}`}>
              <option value="None">None</option>
              <option value="Admin Only">Admin Only</option>
              <option value="Principal + Admin">Principal + Admin</option>
            </select>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Concession Approval Workflow" subtitle="Require approval before applying fee concessions" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Concession Approval Required</p>
              <p className={`text-[10px] ${theme.iconColor}`}>All concessions must go through approval chain</p>
            </div>
            <SSAToggle on={concessionApprovalRequired} onChange={() => setConcessionApprovalRequired(!concessionApprovalRequired)} theme={theme} />
          </div>
          {concessionApprovalRequired && (
            <>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Approval Chain</p>
                <div className="space-y-1.5">
                  {concessionApprovalChain.map((step, i) => (
                    <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${theme.secondaryBg}`}>
                      <span className={`text-[10px] w-6 h-6 rounded-full ${theme.primary} text-white flex items-center justify-center font-bold shrink-0`}>{i + 1}</span>
                      <span className={`text-xs font-bold ${theme.highlight} flex-1`}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max Concession Without Approval ({'\u20B9'})</p>
                <InputField value={maxConcessionWithoutApproval} onChange={setMaxConcessionWithoutApproval} theme={theme} type="number" placeholder="e.g. 5000" />
                <p className={`text-[10px] ${theme.iconColor} mt-1`}>Concessions below this amount are auto-approved</p>
              </div>
            </>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Fee Defaulter Blocking Rules" subtitle="Restrict access to services when fees are overdue" theme={theme}>
        <div className="space-y-2">
          {Object.entries(blockRules).map(([rule, enabled]) => (
            <div key={rule} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>{rule}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{
                  ({
                    'Block report card if fees overdue > 60 days': 'Report card download/view is blocked if any fee is unpaid for more than 60 days',
                    'Block TC generation if outstanding > 0': 'Transfer Certificate cannot be generated until all outstanding dues are cleared',
                    'Block exam hall ticket if current term unpaid': 'Student cannot receive hall ticket for exams if current term fees are unpaid',
                    'Send auto-reminder before blocking': 'System sends an automatic warning to parents before any blocking action takes effect',
                  } as Record<string, string>)[rule]
                }</p>
              </div>
              <SSAToggle on={enabled} onChange={() => setBlockRules(p => ({ ...p, [rule]: !p[rule] }))} theme={theme} label={rule} />
            </div>
          ))}
        </div>
      </SectionCard>

      {feeTemplate !== 'simple-annual' && (
      <SectionCard title="Fee Reminder Schedule" subtitle="Automated reminders before and after due date" theme={theme}>
        <div className="space-y-1.5">
          {reminders.map((r, i) => (
            <div key={i} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold ${theme.highlight}`}>{r.timing}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-lg ${theme.accentBg} ${theme.iconColor}`}>{r.channel}</span>
              </div>
              <div className={`w-2 h-2 rounded-full ${r.enabled ? 'bg-emerald-500' : 'bg-slate-300'}`} />
            </div>
          ))}
        </div>
      </SectionCard>
      )}

      <SectionCard title="Payment Modes" subtitle="Configure accepted payment modes with processing fees and reconciliation settings" theme={theme}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Mode', 'Active', 'Fee (%)', 'Auto Receipt', 'Reconciliation', 'Default', ''].map(h => (
                <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {paymentModesTable.map((m, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className="px-2 py-1.5">
                    <input value={m.name} onChange={e => { const n = [...paymentModesTable]; n[i] = { ...n[i], name: e.target.value }; setPaymentModesTable(n); }}
                      className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <SSAToggle on={m.active} onChange={() => { const n = [...paymentModesTable]; n[i] = { ...n[i], active: !n[i].active }; setPaymentModesTable(n); }} theme={theme} />
                  </td>
                  <td className="px-2 py-1.5">
                    <input value={m.processingFee} onChange={e => { const n = [...paymentModesTable]; n[i] = { ...n[i], processingFee: e.target.value }; setPaymentModesTable(n); }}
                      className={`w-12 px-1 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <SSAToggle on={m.autoReceipt} onChange={() => { const n = [...paymentModesTable]; n[i] = { ...n[i], autoReceipt: !n[i].autoReceipt }; setPaymentModesTable(n); }} theme={theme} />
                  </td>
                  <td className="px-2 py-1.5">
                    <select value={m.reconciliation} onChange={e => { const n = [...paymentModesTable]; n[i] = { ...n[i], reconciliation: e.target.value }; setPaymentModesTable(n); }}
                      className={`px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] font-bold ${theme.highlight}`}>
                      <option value="Auto">Auto</option><option value="Manual">Manual</option>
                    </select>
                  </td>
                  <td className="px-2 py-1.5">
                    <input type="radio" name="defaultPayMode" checked={m.isDefault}
                      onChange={() => setPaymentModesTable(p => p.map((x, j) => ({ ...x, isDefault: j === i })))} className="accent-emerald-500" />
                  </td>
                  <td className="px-2 py-1.5"><button onClick={() => setPaymentModesTable(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={12} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={() => setPaymentModesTable(p => [...p, { name: '', active: true, processingFee: '0', autoReceipt: true, reconciliation: 'Auto', isDefault: false }])}
          className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl mt-2`}>
          <Plus size={12} /> Add Mode
        </button>
      </SectionCard>

    </div>
  );
}
