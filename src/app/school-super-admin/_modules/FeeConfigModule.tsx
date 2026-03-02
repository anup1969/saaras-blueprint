'use client';

import { useState } from 'react';
import { Lock, Plus, X, Info, Eye, Search, Download, Filter, Save, FileText, Calendar } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import { MasterPermissionGrid, BulkImportWizard } from '@/components/shared';
import type { Theme } from '../_helpers/types';

function InfoIcon({ tip }: { tip: string }) {
  return <span title={tip} className="inline-flex ml-1.5 shrink-0 cursor-help"><Info size={13} className="text-blue-400 hover:text-blue-600" /></span>;
}
function MobileBadge() {
  return <span className="ml-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-green-100 text-green-700 whitespace-nowrap">{'\uD83D\uDCF1'} Mobile</span>;
}

type TabId = 'structure' | 'concessions' | 'payments' | 'rules' | 'reports' | 'settings';

const tabs: { id: TabId; label: string }[] = [
  { id: 'structure', label: 'Fee Structure' },
  { id: 'concessions', label: 'Concessions' },
  { id: 'payments', label: 'Payments' },
  { id: 'rules', label: 'Rules & Reminders' },
  { id: 'reports', label: 'Reports' },
  { id: 'settings', label: 'Settings' },
];

export default function FeeConfigModule({ theme }: { theme: Theme }) {
  const [activeTab, setActiveTab] = useState<TabId>('structure');

  // ═══════ Fee Structure state ═══════
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
  const [customFeeHeads, setCustomFeeHeads] = useState<{ name: string; frequency: string; enabled: boolean }[]>([]);
  const [copyFeeHeadsChecked, setCopyFeeHeadsChecked] = useState(true);
  const [copyGradeAmountsChecked, setCopyGradeAmountsChecked] = useState(true);
  const [copyConcessionRulesChecked, setCopyConcessionRulesChecked] = useState(true);
  const [copyLateFeeRulesChecked, setCopyLateFeeRulesChecked] = useState(false);
  const [copyConfirmed, setCopyConfirmed] = useState(false);

  // ═══════ Concessions state ═══════
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
  const [feeOverrideEnabled, setFeeOverrideEnabled] = useState(false);
  const [perStudentCustom, setPerStudentCustom] = useState(true);
  const [overrideApproval, setOverrideApproval] = useState(true);
  const [concessionSearch, setConcessionSearch] = useState('');

  // ═══════ Payments state ═══════
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
  const [billingCycle, setBillingCycle] = useState('Monthly');
  const [dueDate, setDueDate] = useState('10');
  const [lateFeeEnabled, setLateFeeEnabled] = useState(true);
  const [lateFeeAmount, setLateFeeAmount] = useState('50');
  const [lateFeeGrace, setLateFeeGrace] = useState('7');
  const [lateFeeMethod, setLateFeeMethod] = useState('per-day');
  const [lateFeeMax, setLateFeeMax] = useState('500');
  const [emiEnabled, setEmiEnabled] = useState(false);
  const [emiInterest, setEmiInterest] = useState('0');
  const [emiMaxMonths, setEmiMaxMonths] = useState('12');
  const [emiAutoDebit, setEmiAutoDebit] = useState(false);
  const [postDatedCheque, setPostDatedCheque] = useState(false);
  const [autoPenaltyBounce, setAutoPenaltyBounce] = useState(false);
  const [bouncePenalty, setBouncePenalty] = useState('500');
  const [notifyBounce, setNotifyBounce] = useState(true);
  // Online payment state (absorbed from OnlinePaymentConfigModule)
  const [gateway, setGateway] = useState('Razorpay');
  const [refundPolicy, setRefundPolicy] = useState('Manual');
  const [convenienceFeeAmt, setConvenienceFeeAmt] = useState('0');
  const [payToggles, setPayToggles] = useState<Record<string, boolean>>({
    'Auto-receipt Generation': true, 'Partial Payment Allowed': false, 'Convenience Fee': false,
  });
  const [payLinkPerStudent, setPayLinkPerStudent] = useState(true);
  const [payLinkExpiry, setPayLinkExpiry] = useState('7');
  const [payLinkAutoSend, setPayLinkAutoSend] = useState(true);
  const [qrPerStudent, setQrPerStudent] = useState(false);
  const [qrCounter, setQrCounter] = useState(true);
  const [qrOnReceipt, setQrOnReceipt] = useState(false);
  const [autoRetry, setAutoRetry] = useState(false);
  const [retryMinutes, setRetryMinutes] = useState('30');
  const [maxRetries, setMaxRetries] = useState('3');
  const [failedNotify, setFailedNotify] = useState(true);
  const [nriEnabled, setNriEnabled] = useState(false);
  const [currencies, setCurrencies] = useState<Record<string, boolean>>({ USD: true, GBP: true, EUR: false, AED: true, SGD: false });
  const [currencyConversion, setCurrencyConversion] = useState('Live rate');
  const [failoverEnabled, setFailoverEnabled] = useState(false);
  const [fallbackGateway, setFallbackGateway] = useState('PayU');
  const [switchThreshold, setSwitchThreshold] = useState('3');

  // ═══════ Rules & Reminders state ═══════
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
  const [feeEstShowAdmission, setFeeEstShowAdmission] = useState(false);
  const [feeEstTransport, setFeeEstTransport] = useState(true);
  const [feeEstOptional, setFeeEstOptional] = useState(false);

  // ═══════ Reports state ═══════
  const [receiptLogo, setReceiptLogo] = useState(true);
  const [receiptHeader, setReceiptHeader] = useState('Saaras International School');
  const [receiptFooter, setReceiptFooter] = useState('This is a computer-generated receipt.');
  const [receiptHSN, setReceiptHSN] = useState(false);
  const [receiptWatermark, setReceiptWatermark] = useState(true);
  const [receiptSignature, setReceiptSignature] = useState(true);
  const [auditConfigChanges, setAuditConfigChanges] = useState(true);
  const [auditRefundDecisions, setAuditRefundDecisions] = useState(true);
  const [txnSuccessRate, setTxnSuccessRate] = useState(true);
  const [txnReconciliation, setTxnReconciliation] = useState(false);
  const [txnBankDeposit, setTxnBankDeposit] = useState(false);
  const [reportDateFrom, setReportDateFrom] = useState('2026-01-01');
  const [reportDateTo, setReportDateTo] = useState('2026-03-02');
  const [reportFilter, setReportFilter] = useState('all');

  // ═══════ Derived ═══════
  const activeHeads = Object.entries(feeHeads).filter(([, v]) => v).map(([k]) => k);
  const frequencies = ['Monthly', 'Quarterly', 'Term-wise', 'Half-yearly', 'Yearly', 'One-time'];
  const filteredConcessions = concessionSearch
    ? concessions.filter(c => c.type.toLowerCase().includes(concessionSearch.toLowerCase()))
    : concessions;

  return (
    <div className="space-y-4">
      <ModuleHeader title="Fee Management" subtitle="Configure fee structure, payments, concessions, rules, reports, and permissions" theme={theme} />

      {/* ═══════ Tab Bar ═══════ */}
      <div className={`flex items-center gap-1 p-1 rounded-xl ${theme.secondaryBg} overflow-x-auto`}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id ? `${theme.primary} text-white shadow-sm` : `${theme.iconColor} hover:${theme.highlight} ${theme.buttonHover}`
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════
          TAB 1: Fee Structure
          ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'structure' && (
        <div className="space-y-4">
          {/* Critical Lock Banner */}
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3 flex items-center gap-3">
            <Lock size={14} className="text-rose-500 shrink-0" />
            <p className="text-xs text-rose-700"><strong>Fee Structure Changes</strong> is a locked field. Editing fee heads or amounts will require OTP verification from the registered Trustee.</p>
          </div>

          {/* Fee Template */}
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

          {/* Fee Heads */}
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
              {customFeeHeads.length > 0 && (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
                  {customFeeHeads.map((cfh, idx) => (
                    <div key={idx} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg} ring-1 ring-emerald-200`}>
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <SSAToggle on={cfh.enabled} onChange={() => setCustomFeeHeads(p => p.map((h, i) => i === idx ? { ...h, enabled: !h.enabled } : h))} theme={theme} label={cfh.name} />
                        <input value={cfh.name} onChange={e => setCustomFeeHeads(p => p.map((h, i) => i === idx ? { ...h, name: e.target.value } : h))}
                          placeholder="Fee head name..."
                          className={`text-xs font-medium ${theme.highlight} bg-transparent border-b ${theme.border} outline-none flex-1 min-w-0 px-1 py-0.5 focus:border-emerald-400`} />
                      </div>
                      {cfh.enabled && (
                        <select value={cfh.frequency} onChange={e => setCustomFeeHeads(p => p.map((h, i) => i === idx ? { ...h, frequency: e.target.value } : h))}
                          className={`text-[10px] px-1.5 py-0.5 rounded-lg border ${theme.border} ${theme.inputBg} ${theme.highlight} ml-2`}>
                          {(feeTemplate === 'term-wise' ? ['Term 1', 'Term 2', 'Term 3', 'All Terms'] : frequencies).map(f => <option key={f} value={f}>{f}</option>)}
                        </select>
                      )}
                      <button onClick={() => setCustomFeeHeads(p => p.filter((_, i) => i !== idx))}
                        className="text-red-400 hover:text-red-600 ml-2 shrink-0"><X size={12} /></button>
                    </div>
                  ))}
                </div>
              )}
              <button onClick={() => setCustomFeeHeads(p => [...p, { name: '', frequency: 'Monthly', enabled: true }])}
                className="flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 px-3 py-2 rounded-xl mt-3 transition-colors">
                <Plus size={12} /> Add Fee Head
              </button>
            </SectionCard>
          )}

          {/* Grade-wise Fee Amounts */}
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

          {/* Copy Fee Structure */}
          <SectionCard title="Copy Fee Structure" subtitle="Replicate current year's fee setup for new academic year" theme={theme}>
            <div className="flex items-center mb-3">
              <p className={`text-[10px] font-bold ${theme.iconColor}`}>Duplicate 2025-26 structure to 2026-27</p>
              <InfoIcon tip="Replicate current year's fee setup for new academic year" />
            </div>
            <div className="space-y-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Copy 2025-26 fee structure to 2026-27?</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Fee Heads', val: copyFeeHeadsChecked, set: setCopyFeeHeadsChecked },
                  { label: 'Grade Amounts', val: copyGradeAmountsChecked, set: setCopyGradeAmountsChecked },
                  { label: 'Concession Rules', val: copyConcessionRulesChecked, set: setCopyConcessionRulesChecked },
                  { label: 'Late Fee Rules', val: copyLateFeeRulesChecked, set: setCopyLateFeeRulesChecked },
                ].map(item => (
                  <label key={item.label} className={`flex items-center gap-2 p-2.5 rounded-xl ${theme.secondaryBg} cursor-pointer`}>
                    <input type="checkbox" checked={item.val} onChange={() => item.set(!item.val)} className="accent-emerald-500 w-3.5 h-3.5" />
                    <span className={`text-xs font-medium ${theme.highlight}`}>{item.label}</span>
                  </label>
                ))}
              </div>
              <button onClick={() => { setCopyConfirmed(true); setTimeout(() => setCopyConfirmed(false), 3000); }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold ${theme.primary} text-white`}>
                Copy to Next Year
              </button>
              {copyConfirmed && <p className="text-xs text-emerald-600 font-bold animate-pulse">Fee structure copied successfully!</p>}
            </div>
          </SectionCard>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 2: Concessions
          ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'concessions' && (
        <div className="space-y-4">
          {/* CRUD Toolbar */}
          <div className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={14} className={`absolute left-2.5 top-1/2 -translate-y-1/2 ${theme.iconColor}`} />
                <input value={concessionSearch} onChange={e => setConcessionSearch(e.target.value)}
                  placeholder="Search concessions..."
                  className={`pl-8 pr-3 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none w-56`} />
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${theme.accentBg} ${theme.iconColor}`}>
                {filteredConcessions.length} of {concessions.length} types
              </span>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors">
              <Download size={12} /> Export CSV
            </button>
          </div>

          {/* Concession & Scholarship Master */}
          <SectionCard title="Concession & Scholarship Master" subtitle="Configure discount types, approval requirements, and maximum limits" theme={theme}>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead><tr className={theme.secondaryBg}>
                  {['Type Name', 'Applies To', 'Method', 'Value', 'Max Amt', 'Approval', 'Active', ''].map(h => (
                    <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {filteredConcessions.map((c, i) => {
                    const realIdx = concessions.indexOf(c);
                    return (
                    <tr key={realIdx} className={`border-t ${theme.border}`}>
                      <td className="px-2 py-1.5">
                        <input value={c.type} onChange={e => { const n = [...concessions]; n[realIdx] = { ...n[realIdx], type: e.target.value }; setConcessions(n); }}
                          className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                      </td>
                      <td className="px-2 py-1.5">
                        <select value={c.appliesTo || 'all-components'} onChange={e => { const n = [...concessions]; n[realIdx] = { ...n[realIdx], appliesTo: e.target.value }; setConcessions(n); }}
                          className={`px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight}`}>
                          <option value="all-components">All Components</option>
                          <option value="tuition-only">Tuition Only</option>
                          <option value="tuition-annual">Tuition + Annual</option>
                          <option value="excluding-transport">Excl. Transport</option>
                          <option value="custom">Custom Selection</option>
                        </select>
                      </td>
                      <td className="px-2 py-1.5">
                        <select value={c.method} onChange={e => { const n = [...concessions]; n[realIdx] = { ...n[realIdx], method: e.target.value }; setConcessions(n); }}
                          className={`px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight}`}>
                          <option value="percentage">%</option>
                          <option value="fixed">{'\u20B9'} Fixed</option>
                        </select>
                      </td>
                      <td className="px-2 py-1.5">
                        <input value={c.value} onChange={e => { const n = [...concessions]; n[realIdx] = { ...n[realIdx], value: e.target.value }; setConcessions(n); }}
                          className={`w-14 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                      </td>
                      <td className="px-2 py-1.5">
                        <input value={c.maxAmount} onChange={e => { const n = [...concessions]; n[realIdx] = { ...n[realIdx], maxAmount: e.target.value }; setConcessions(n); }}
                          placeholder="-" className={`w-16 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                      </td>
                      <td className="px-2 py-1.5">
                        <SSAToggle on={c.approvalRequired} onChange={() => { const n = [...concessions]; n[realIdx] = { ...n[realIdx], approvalRequired: !n[realIdx].approvalRequired }; setConcessions(n); }} theme={theme} />
                      </td>
                      <td className="px-2 py-1.5">
                        <SSAToggle on={c.active} onChange={() => { const n = [...concessions]; n[realIdx] = { ...n[realIdx], active: !n[realIdx].active }; setConcessions(n); }} theme={theme} label={c.type} />
                      </td>
                      <td className="px-2 py-1.5"><button onClick={() => setConcessions(p => p.filter((_, j) => j !== realIdx))} className="text-red-400 hover:text-red-600"><X size={12} /></button></td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <button onClick={() => setConcessions(p => [...p, { type: '', method: 'percentage', value: '0', maxAmount: '', approvalRequired: false, active: true, appliesTo: 'all-components' }])}
                  className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
                  <Plus size={12} /> Add Concession Type
                </button>
                <button onClick={() => setConcessions(p => p.map(c => ({ ...c, active: true })))}
                  className="px-2.5 py-1.5 rounded-lg text-[9px] font-bold bg-emerald-100 text-emerald-700 hover:bg-emerald-200">Activate All</button>
                <button onClick={() => setConcessions(p => p.map(c => ({ ...c, active: false })))}
                  className="px-2.5 py-1.5 rounded-lg text-[9px] font-bold bg-gray-100 text-gray-600 hover:bg-gray-200">Deactivate All</button>
                <button onClick={() => setConcessions(p => p.filter(c => c.active))}
                  className="px-2.5 py-1.5 rounded-lg text-[9px] font-bold bg-red-100 text-red-600 hover:bg-red-200">Delete Inactive</button>
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

          {/* Concession Approval Workflow */}
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

          {/* Student-Level Fee Override */}
          <SectionCard title="Student-Level Fee Override" subtitle="Allow per-student custom fee amounts" theme={theme}>
            <div className="flex items-center mb-3">
              <p className={`text-[10px] font-bold ${theme.iconColor}`}>Override fee amounts for individual students</p>
              <InfoIcon tip="Enable custom fee amounts per student for special cases" />
            </div>
            <div className="space-y-3">
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-xs font-bold ${theme.highlight}`}>Enable Student-Level Override</p>
                <SSAToggle on={feeOverrideEnabled} onChange={() => setFeeOverrideEnabled(!feeOverrideEnabled)} theme={theme} />
              </div>
              {feeOverrideEnabled && (
                <>
                  <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                    <p className={`text-xs font-bold ${theme.highlight}`}>Allow per-student custom amount</p>
                    <SSAToggle on={perStudentCustom} onChange={() => setPerStudentCustom(!perStudentCustom)} theme={theme} />
                  </div>
                  <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                    <p className={`text-xs font-bold ${theme.highlight}`}>Approval required for override</p>
                    <SSAToggle on={overrideApproval} onChange={() => setOverrideApproval(!overrideApproval)} theme={theme} />
                  </div>
                  <div>
                    <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Example Overrides</p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead><tr className={theme.secondaryBg}>
                          {['Student', 'Class', 'Standard Fee', 'Custom Fee', 'Reason'].map(h => (
                            <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>{h}</th>
                          ))}
                        </tr></thead>
                        <tbody>
                          <tr className={`border-t ${theme.border}`}>
                            <td className={`px-2 py-1.5 font-bold ${theme.highlight}`}>Aarav Patel</td>
                            <td className={`px-2 py-1.5 ${theme.highlight}`}>Grade 5</td>
                            <td className={`px-2 py-1.5 ${theme.iconColor}`}>{'\u20B9'}3,600/mo</td>
                            <td className="px-2 py-1.5 text-emerald-600 font-bold">{'\u20B9'}2,800/mo</td>
                            <td className={`px-2 py-1.5 ${theme.iconColor}`}>Single parent waiver</td>
                          </tr>
                          <tr className={`border-t ${theme.border}`}>
                            <td className={`px-2 py-1.5 font-bold ${theme.highlight}`}>Priya Shah</td>
                            <td className={`px-2 py-1.5 ${theme.highlight}`}>Grade 8</td>
                            <td className={`px-2 py-1.5 ${theme.iconColor}`}>{'\u20B9'}4,500/mo</td>
                            <td className="px-2 py-1.5 text-emerald-600 font-bold">{'\u20B9'}3,500/mo</td>
                            <td className={`px-2 py-1.5 ${theme.iconColor}`}>Staff child discount</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </div>
          </SectionCard>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 3: Payments
          ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'payments' && (
        <div className="space-y-4">
          {/* Payment Modes CRUD Table */}
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

          <div className="grid grid-cols-2 gap-4">
            {/* Billing Cycle & Due Date */}
            <SectionCard title="Billing Cycle & Due Date" subtitle="Payment schedule configuration" theme={theme}>
              <div className="space-y-3">
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
            </SectionCard>

            {/* Late Fee Rules */}
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

          {/* EMI / Installment Plans */}
          <SectionCard title="EMI / Installment Plans" subtitle="Parents can pay fees in EMIs with optional interest" theme={theme}>
            <div className="flex items-center mb-3">
              <p className={`text-[10px] font-bold ${theme.iconColor}`}>Configure installment payment options</p>
              <InfoIcon tip="Parents can pay fees in EMIs with optional interest" />
            </div>
            <div className="space-y-3">
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-xs font-bold ${theme.highlight}`}>Enable EMI Plans</p>
                <SSAToggle on={emiEnabled} onChange={() => setEmiEnabled(!emiEnabled)} theme={theme} />
              </div>
              {emiEnabled && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Interest rate (%)</p>
                      <InputField value={emiInterest} onChange={setEmiInterest} theme={theme} type="number" />
                    </div>
                    <div>
                      <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max EMI months</p>
                      <InputField value={emiMaxMonths} onChange={setEmiMaxMonths} theme={theme} type="number" />
                    </div>
                  </div>
                  <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                    <p className={`text-xs font-bold ${theme.highlight}`}>Auto-debit via NACH</p>
                    <SSAToggle on={emiAutoDebit} onChange={() => setEmiAutoDebit(!emiAutoDebit)} theme={theme} />
                  </div>
                </>
              )}
            </div>
          </SectionCard>

          {/* Cheque Management */}
          <SectionCard title="Cheque Management" subtitle="Track cheques and auto-penalize bounced payments" theme={theme}>
            <div className="flex items-center mb-3">
              <p className={`text-[10px] font-bold ${theme.iconColor}`}>Manage cheque payments and bounce penalties</p>
              <InfoIcon tip="Track cheques and auto-penalize bounced payments" />
            </div>
            <div className="space-y-2">
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-xs font-bold ${theme.highlight}`}>Post-dated cheque register</p>
                <SSAToggle on={postDatedCheque} onChange={() => setPostDatedCheque(!postDatedCheque)} theme={theme} />
              </div>
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-xs font-bold ${theme.highlight}`}>Auto-penalty on bounce</p>
                <SSAToggle on={autoPenaltyBounce} onChange={() => setAutoPenaltyBounce(!autoPenaltyBounce)} theme={theme} />
              </div>
              {autoPenaltyBounce && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Bounce penalty amount ({'\u20B9'})</p>
                    <InputField value={bouncePenalty} onChange={setBouncePenalty} theme={theme} type="number" />
                  </div>
                </div>
              )}
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex items-center">
                  <p className={`text-xs font-bold ${theme.highlight}`}>Notify parent on bounce</p>
                  <MobileBadge />
                </div>
                <SSAToggle on={notifyBounce} onChange={() => setNotifyBounce(!notifyBounce)} theme={theme} />
              </div>
            </div>
          </SectionCard>

          {/* Online Gateway & Policy (from OnlinePaymentConfigModule) */}
          <div className="grid grid-cols-2 gap-4">
            <SectionCard title="Gateway & Policy" subtitle="Payment provider and refund settings" theme={theme}>
              <div className="space-y-3">
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Payment Gateway</p>
                  <SelectField options={['Razorpay', 'PayU', 'CCAvenue', 'Cashfree']} value={gateway} onChange={setGateway} theme={theme} />
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Refund Policy</p>
                  <SelectField options={['Manual', 'Auto']} value={refundPolicy} onChange={setRefundPolicy} theme={theme} />
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Convenience Fee Amount ({'\u20B9'})</p>
                  <InputField value={convenienceFeeAmt} onChange={setConvenienceFeeAmt} theme={theme} type="number" />
                </div>
              </div>
            </SectionCard>
            <SectionCard title="Payment Features" subtitle="Receipt generation, partial payments, and convenience fees" theme={theme}>
              <div className="space-y-2">
                {Object.entries(payToggles).map(([feat, enabled]) => (
                  <div key={feat} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                    <div className="flex-1 mr-3">
                      <p className={`text-xs font-bold ${theme.highlight}`}>{feat}</p>
                      <p className={`text-[10px] ${theme.iconColor}`}>{
                        ({
                          'Auto-receipt Generation': 'Automatically generates a payment receipt after successful payment',
                          'Partial Payment Allowed': 'Parents can pay a portion of the total fee at once',
                          'Convenience Fee': 'Add a processing fee on online payments',
                        } as Record<string, string>)[feat]
                      }</p>
                    </div>
                    <SSAToggle on={enabled} onChange={() => setPayToggles(p => ({ ...p, [feat]: !p[feat] }))} theme={theme} />
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* Payment Links */}
          <SectionCard title="Payment Links" subtitle="Unique payment link per student per invoice" theme={theme}>
            <div className="flex items-center mb-3">
              <p className={`text-[10px] font-bold ${theme.iconColor}`}>Generate and send payment links to parents</p>
              <InfoIcon tip="Unique payment link per student per invoice" />
            </div>
            <div className="space-y-2">
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-xs font-bold ${theme.highlight}`}>Generate per-student payment link</p>
                <SSAToggle on={payLinkPerStudent} onChange={() => setPayLinkPerStudent(!payLinkPerStudent)} theme={theme} />
              </div>
              {payLinkPerStudent && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Link expiry (days)</p>
                      <InputField value={payLinkExpiry} onChange={setPayLinkExpiry} theme={theme} type="number" />
                    </div>
                  </div>
                  <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                    <div className="flex items-center">
                      <p className={`text-xs font-bold ${theme.highlight}`}>Auto-send via SMS/WhatsApp</p>
                      <MobileBadge />
                    </div>
                    <SSAToggle on={payLinkAutoSend} onChange={() => setPayLinkAutoSend(!payLinkAutoSend)} theme={theme} />
                  </div>
                </>
              )}
            </div>
          </SectionCard>

          {/* Dynamic QR Codes */}
          <SectionCard title="Dynamic QR Codes" subtitle="Generate student-specific UPI QR codes for instant payment" theme={theme}>
            <div className="flex items-center mb-3">
              <p className={`text-[10px] font-bold ${theme.iconColor}`}>Configure UPI QR code generation</p>
              <InfoIcon tip="Generate student-specific UPI QR codes for instant payment" />
            </div>
            <div className="space-y-2">
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-xs font-bold ${theme.highlight}`}>UPI QR per student</p>
                <SSAToggle on={qrPerStudent} onChange={() => setQrPerStudent(!qrPerStudent)} theme={theme} />
              </div>
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-xs font-bold ${theme.highlight}`}>Counter QR for walk-in</p>
                <SSAToggle on={qrCounter} onChange={() => setQrCounter(!qrCounter)} theme={theme} />
              </div>
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-xs font-bold ${theme.highlight}`}>QR on fee receipt</p>
                <SSAToggle on={qrOnReceipt} onChange={() => setQrOnReceipt(!qrOnReceipt)} theme={theme} />
              </div>
            </div>
          </SectionCard>

          {/* Payment Retry & Recovery */}
          <SectionCard title="Payment Retry & Recovery" subtitle="Auto-retry failed transactions and notify parents" theme={theme}>
            <div className="flex items-center mb-3">
              <p className={`text-[10px] font-bold ${theme.iconColor}`}>Handle failed payment transactions</p>
              <InfoIcon tip="Automatically retry failed payments and alert parents" />
            </div>
            <div className="space-y-2">
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-xs font-bold ${theme.highlight}`}>Auto-retry failed transactions</p>
                <SSAToggle on={autoRetry} onChange={() => setAutoRetry(!autoRetry)} theme={theme} />
              </div>
              {autoRetry && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Retry after (minutes)</p>
                    <InputField value={retryMinutes} onChange={setRetryMinutes} theme={theme} type="number" />
                  </div>
                  <div>
                    <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max retries</p>
                    <InputField value={maxRetries} onChange={setMaxRetries} theme={theme} type="number" />
                  </div>
                </div>
              )}
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex items-center">
                  <p className={`text-xs font-bold ${theme.highlight}`}>Failed payment notification</p>
                  <MobileBadge />
                </div>
                <SSAToggle on={failedNotify} onChange={() => setFailedNotify(!failedNotify)} theme={theme} />
              </div>
            </div>
          </SectionCard>

          {/* International Payments */}
          <SectionCard title="International Payments" subtitle="Support NRI parent payments in foreign currencies" theme={theme}>
            <div className="flex items-center mb-3">
              <p className={`text-[10px] font-bold ${theme.iconColor}`}>Enable cross-border fee payments</p>
              <InfoIcon tip="Allow NRI parents to pay fees in their local currency" />
            </div>
            <div className="space-y-3">
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-xs font-bold ${theme.highlight}`}>Enable NRI parent payments</p>
                <SSAToggle on={nriEnabled} onChange={() => setNriEnabled(!nriEnabled)} theme={theme} />
              </div>
              {nriEnabled && (
                <>
                  <div>
                    <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Supported Currencies</p>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(currencies).map(([cur, on]) => (
                        <label key={cur} className={`flex items-center gap-2 p-2 rounded-lg ${theme.secondaryBg} cursor-pointer`}>
                          <input type="checkbox" checked={on} onChange={() => setCurrencies(p => ({ ...p, [cur]: !p[cur] }))} className="accent-emerald-500 w-3.5 h-3.5" />
                          <span className={`text-[10px] font-medium ${theme.highlight}`}>{cur}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Currency Conversion</p>
                    <SelectField options={['Live rate', 'Fixed rate']} value={currencyConversion} onChange={setCurrencyConversion} theme={theme} />
                  </div>
                </>
              )}
            </div>
          </SectionCard>

          {/* Multi-Gateway Failover */}
          <SectionCard title="Multi-Gateway Failover" subtitle="Automatic gateway switching on consecutive failures" theme={theme}>
            <div className="flex items-center mb-3">
              <p className={`text-[10px] font-bold ${theme.iconColor}`}>Route payments to backup gateway on failure</p>
              <InfoIcon tip="Automatically switch to fallback gateway after consecutive failures" />
            </div>
            <div className="space-y-3">
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-xs font-bold ${theme.highlight}`}>Enable failover routing</p>
                <SSAToggle on={failoverEnabled} onChange={() => setFailoverEnabled(!failoverEnabled)} theme={theme} />
              </div>
              {failoverEnabled && (
                <>
                  <div className={`p-2.5 rounded-xl ${theme.secondaryBg}`}>
                    <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Primary Gateway</p>
                    <p className={`text-xs font-bold ${theme.highlight}`}>{gateway}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Fallback Gateway</p>
                      <SelectField options={['PayU', 'CCAvenue', 'Cashfree']} value={fallbackGateway} onChange={setFallbackGateway} theme={theme} />
                    </div>
                    <div>
                      <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Switch threshold (consecutive failures)</p>
                      <InputField value={switchThreshold} onChange={setSwitchThreshold} theme={theme} type="number" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </SectionCard>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 4: Rules & Reminders
          ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'rules' && (
        <div className="space-y-4">
          {/* Blocking Rules */}
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

          {/* Reminder Schedule */}
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

          {/* Fee Estimation Calculator */}
          <SectionCard title="Fee Estimation Calculator" subtitle="Parents see estimated annual fee during enquiry/admission" theme={theme}>
            <div className="flex items-center mb-3">
              <p className={`text-[10px] font-bold ${theme.iconColor}`}>Show fee estimator to parents</p>
              <InfoIcon tip="Parents see estimated annual fee during enquiry/admission" />
            </div>
            <div className="space-y-2">
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex items-center">
                  <p className={`text-xs font-bold ${theme.highlight}`}>Show in admission portal</p>
                  <MobileBadge />
                </div>
                <SSAToggle on={feeEstShowAdmission} onChange={() => setFeeEstShowAdmission(!feeEstShowAdmission)} theme={theme} />
              </div>
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-xs font-bold ${theme.highlight}`}>Include transport fee</p>
                <SSAToggle on={feeEstTransport} onChange={() => setFeeEstTransport(!feeEstTransport)} theme={theme} />
              </div>
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-xs font-bold ${theme.highlight}`}>Include optional fees</p>
                <SSAToggle on={feeEstOptional} onChange={() => setFeeEstOptional(!feeEstOptional)} theme={theme} />
              </div>
            </div>
          </SectionCard>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 5: Reports
          ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          {/* Report Toolbar */}
          <div className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Calendar size={14} className={theme.iconColor} />
                <input type="date" value={reportDateFrom} onChange={e => setReportDateFrom(e.target.value)}
                  className={`px-2 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                <span className={`text-[10px] ${theme.iconColor}`}>to</span>
                <input type="date" value={reportDateTo} onChange={e => setReportDateTo(e.target.value)}
                  className={`px-2 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
              </div>
              <div className="flex items-center gap-1.5">
                <Filter size={12} className={theme.iconColor} />
                <select value={reportFilter} onChange={e => setReportFilter(e.target.value)}
                  className={`px-2 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                  <option value="all">All Transactions</option>
                  <option value="success">Successful</option>
                  <option value="failed">Failed</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-red-100 text-red-700 hover:bg-red-200 transition-colors">
              <FileText size={12} /> Export PDF
            </button>
          </div>

          {/* Transaction Reports */}
          <SectionCard title="Transaction Reports" subtitle="Dashboard-level reporting for payment transactions" theme={theme}>
            <div className="flex items-center mb-3">
              <p className={`text-[10px] font-bold ${theme.iconColor}`}>Enable transaction analytics and reconciliation</p>
              <InfoIcon tip="Monitor payment success rates, settlement reconciliation, and bank deposits" />
            </div>
            <div className="space-y-2">
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-xs font-bold ${theme.highlight}`}>Success/Failure rate dashboard</p>
                <SSAToggle on={txnSuccessRate} onChange={() => setTxnSuccessRate(!txnSuccessRate)} theme={theme} />
              </div>
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-xs font-bold ${theme.highlight}`}>Settlement reconciliation</p>
                <SSAToggle on={txnReconciliation} onChange={() => setTxnReconciliation(!txnReconciliation)} theme={theme} />
              </div>
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-xs font-bold ${theme.highlight}`}>Bank deposit tracking</p>
                <SSAToggle on={txnBankDeposit} onChange={() => setTxnBankDeposit(!txnBankDeposit)} theme={theme} />
              </div>
            </div>
          </SectionCard>

          {/* Gateway Audit Trail */}
          <SectionCard title="Gateway Audit Trail" subtitle="Track who changed payment gateway settings" theme={theme}>
            <div className="flex items-center mb-3">
              <p className={`text-[10px] font-bold ${theme.iconColor}`}>Log all gateway configuration changes</p>
              <InfoIcon tip="Track who changed payment gateway settings" />
            </div>
            <div className="space-y-3">
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-xs font-bold ${theme.highlight}`}>Log all config changes</p>
                <SSAToggle on={auditConfigChanges} onChange={() => setAuditConfigChanges(!auditConfigChanges)} theme={theme} />
              </div>
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-xs font-bold ${theme.highlight}`}>Log refund decisions</p>
                <SSAToggle on={auditRefundDecisions} onChange={() => setAuditRefundDecisions(!auditRefundDecisions)} theme={theme} />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Recent Changes</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead><tr className={theme.secondaryBg}>
                      {['Date', 'Change', 'By', 'IP'].map(h => (
                        <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>{h}</th>
                      ))}
                    </tr></thead>
                    <tbody>
                      {[
                        { date: '28 Feb 2026', change: 'Gateway changed to Razorpay', by: 'Admin (Piush)', ip: '192.168.1.10' },
                        { date: '25 Feb 2026', change: 'Convenience fee updated to 0%', by: 'Admin (Piush)', ip: '192.168.1.10' },
                        { date: '20 Feb 2026', change: 'Refund policy set to Manual', by: 'Accounts (Meera)', ip: '192.168.1.15' },
                      ].map((entry, i) => (
                        <tr key={i} className={`border-t ${theme.border}`}>
                          <td className={`px-2 py-1.5 ${theme.iconColor}`}>{entry.date}</td>
                          <td className={`px-2 py-1.5 font-bold ${theme.highlight}`}>{entry.change}</td>
                          <td className={`px-2 py-1.5 ${theme.iconColor}`}>{entry.by}</td>
                          <td className={`px-2 py-1.5 ${theme.iconColor} font-mono text-[10px]`}>{entry.ip}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Fee Receipt Template */}
          <SectionCard title="Fee Receipt Template" subtitle="Customize printed/PDF fee receipt layout" theme={theme}>
            <div className="flex items-center mb-3">
              <p className={`text-[10px] font-bold ${theme.iconColor}`}>Design fee receipt template</p>
              <InfoIcon tip="Customize printed/PDF fee receipt layout" />
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                {[
                  { label: 'School Logo', val: receiptLogo, set: setReceiptLogo },
                  { label: 'Show HSN/SAC codes (GST)', val: receiptHSN, set: setReceiptHSN },
                  { label: 'Duplicate watermark', val: receiptWatermark, set: setReceiptWatermark },
                  { label: 'Signature field', val: receiptSignature, set: setReceiptSignature },
                ].map(item => (
                  <div key={item.label} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                    <span className={`text-xs font-medium ${theme.highlight}`}>{item.label}</span>
                    <SSAToggle on={item.val} onChange={() => item.set(!item.val)} theme={theme} />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Header Text</p>
                  <InputField value={receiptHeader} onChange={setReceiptHeader} theme={theme} />
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Footer Text</p>
                  <InputField value={receiptFooter} onChange={setReceiptFooter} theme={theme} />
                </div>
              </div>
              <button className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold ${theme.primary} text-white`}>
                <Eye size={14} /> Preview Receipt
              </button>
            </div>
          </SectionCard>

          {/* Mock Summary Table */}
          <SectionCard title="Fee Collection Summary" subtitle="Overview of fee collection status" theme={theme}>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead><tr className={theme.secondaryBg}>
                  {['Month', 'Total Billed', 'Collected', 'Pending', 'Success %'].map(h => (
                    <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor}`}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {[
                    { month: 'Jan 2026', billed: '12,50,000', collected: '10,80,000', pending: '1,70,000', pct: '86.4%' },
                    { month: 'Feb 2026', billed: '12,50,000', collected: '11,20,000', pending: '1,30,000', pct: '89.6%' },
                    { month: 'Mar 2026', billed: '12,50,000', collected: '8,40,000', pending: '4,10,000', pct: '67.2%' },
                  ].map((row, i) => (
                    <tr key={i} className={`border-t ${theme.border}`}>
                      <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{row.month}</td>
                      <td className={`px-3 py-2 ${theme.iconColor}`}>{'\u20B9'}{row.billed}</td>
                      <td className="px-3 py-2 text-emerald-600 font-bold">{'\u20B9'}{row.collected}</td>
                      <td className="px-3 py-2 text-amber-600 font-bold">{'\u20B9'}{row.pending}</td>
                      <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{row.pct}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={`text-[10px] ${theme.iconColor} mt-2`}>Showing 1-3 of 3 months</p>
          </SectionCard>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 6: Settings
          ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'settings' && (
        <div className="space-y-4">
          {/* Role-Based Permissions */}
          <SectionCard title="Role-Based Permissions" subtitle="Control who can view, create, edit, delete, import, and export" theme={theme}>
            <div className="space-y-4">
              <MasterPermissionGrid masterName="Fee Heads" roles={['Super Admin', 'Principal', 'School Admin', 'Teacher', 'Accountant']} theme={theme} />
              <MasterPermissionGrid masterName="Concession Types" roles={['Super Admin', 'Principal', 'School Admin', 'Teacher', 'Accountant']} theme={theme} />
            </div>
          </SectionCard>

          {/* Bulk Import */}
          <SectionCard title="Bulk Import" subtitle="Import data from Excel templates" theme={theme}>
            <BulkImportWizard entityName="Fee Structure" templateFields={['Fee Head', 'Class', 'Amount', 'Due Date', 'Concession Type']} sampleData={[['Tuition Fee', 'Grade 5', '3600', '2026-04-10', 'None']]} theme={theme} />
          </SectionCard>

          {/* Save All Bar */}
          <div className={`flex items-center justify-between p-4 rounded-2xl ${theme.secondaryBg} border ${theme.border}`}>
            <div>
              <p className={`text-sm font-bold ${theme.highlight}`}>Save All Fee Management Settings</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Apply all changes across fee structure, payments, concessions, rules, and reports</p>
            </div>
            <button className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold ${theme.primary} text-white shadow-lg hover:shadow-xl transition-all`}>
              <Save size={16} /> Save All Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
