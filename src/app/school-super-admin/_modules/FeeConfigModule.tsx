'use client';

import { useState } from 'react';
import { Lock, Unlock, Plus, X, Info, Eye, Search, Download, Upload, Filter, Save, FileText, Calendar, Trash2, Settings2, ArrowRight, ShieldCheck, Receipt, CheckCircle, CreditCard } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import { BulkImportWizard } from '@/components/shared';
import type { Theme } from '../_helpers/types';

function InfoIcon({ tip }: { tip: string }) {
  return <span title={tip} className="inline-flex ml-1.5 shrink-0 cursor-help"><Info size={13} className="text-blue-400 hover:text-blue-600" /></span>;
}
function MobileBadge() {
  return <span className="ml-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-green-100 text-green-700 whitespace-nowrap">{'\uD83D\uDCF1'} Mobile</span>;
}

type TabId = 'structure' | 'concessions' | 'payments' | 'reports' | 'settings';

export default function FeeConfigModule({ theme, activeTab: externalTab, onTabChange }: { theme: Theme; activeTab?: string; onTabChange?: (tab: string) => void }) {
  const [internalTab, setInternalTab] = useState<TabId>('structure');
  const activeTab = (externalTab as TabId) || internalTab;
  const setActiveTab = (tab: TabId) => { if (onTabChange) onTabChange(tab); else setInternalTab(tab); };

  // ═══════ Fee Structure Lock / OTP ═══════
  const [structureLocked, setStructureLocked] = useState(true);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpSent, setOtpSent] = useState(false);

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
  const [feeHeadSearch, setFeeHeadSearch] = useState('');

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
  const [concessionApprovalRequired, setConcessionApprovalRequired] = useState(true);
  const [concessionApprovalChain, setConcessionApprovalChain] = useState([
    { name: 'Mrs. Meera Shah', role: 'Accounts Officer', avatar: 'MS' },
    { name: 'Dr. Rajesh Kumar', role: 'Principal', avatar: 'RK' },
    { name: 'Mr. Amit Patel', role: 'Trust Secretary', avatar: 'AP' },
  ]);
  const [maxConcessionWithoutApproval, setMaxConcessionWithoutApproval] = useState('5000');
  const [feeOverrideEnabled, setFeeOverrideEnabled] = useState(false);
  const [perStudentCustom, setPerStudentCustom] = useState(true);
  const [overrideApproval, setOverrideApproval] = useState(true);
  const [concessionSearch, setConcessionSearch] = useState('');
  const [addingApprover, setAddingApprover] = useState(false);
  const [newApproverName, setNewApproverName] = useState('');
  const [newApproverRole, setNewApproverRole] = useState('');

  // ═══════ Payments state ═══════
  const [paymentModesTable, setPaymentModesTable] = useState([
    { name: 'Cash', active: true, processingFee: '0', autoReceipt: true, reconciliation: 'Auto', isDefault: true, gateway: 'N/A', refundPolicy: 'Manual' },
    { name: 'Cheque', active: true, processingFee: '0', autoReceipt: false, reconciliation: 'Manual', isDefault: false, gateway: 'N/A', refundPolicy: 'Manual' },
    { name: 'UPI', active: true, processingFee: '0.5', autoReceipt: true, reconciliation: 'Auto', isDefault: false, gateway: 'Razorpay', refundPolicy: 'Auto' },
    { name: 'Net Banking', active: true, processingFee: '1', autoReceipt: true, reconciliation: 'Auto', isDefault: false, gateway: 'Razorpay', refundPolicy: 'Manual' },
    { name: 'Credit Card', active: true, processingFee: '1.5', autoReceipt: true, reconciliation: 'Auto', isDefault: false, gateway: 'Razorpay', refundPolicy: 'Auto' },
    { name: 'Debit Card', active: true, processingFee: '0.8', autoReceipt: true, reconciliation: 'Auto', isDefault: false, gateway: 'Razorpay', refundPolicy: 'Auto' },
    { name: 'DD/NEFT', active: true, processingFee: '0', autoReceipt: false, reconciliation: 'Manual', isDefault: false, gateway: 'N/A', refundPolicy: 'Manual' },
    { name: 'Paytm/PhonePe', active: false, processingFee: '0.5', autoReceipt: true, reconciliation: 'Auto', isDefault: false, gateway: 'PayU', refundPolicy: 'Auto' },
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
  const [gateway, setGateway] = useState('Razorpay');
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
  const [addingPaymentMode, setAddingPaymentMode] = useState(false);
  const [newPaymentModeName, setNewPaymentModeName] = useState('');

  // ═══════ Fee Collection state ═══════
  const [collectionSearch, setCollectionSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<{ name: string; id: string; cls: string; rollNo: string; pending: string } | null>(null);
  const [collectionMode, setCollectionMode] = useState('Cash');
  const [chequeNo, setChequeNo] = useState('');
  const [chequeBank, setChequeBank] = useState('');
  const [chequeDate, setChequeDate] = useState('');
  const [collectingComponents, setCollectingComponents] = useState<Record<string, boolean>>({});
  const [collectionDone, setCollectionDone] = useState(false);

  // ═══════ Student Override state (enhanced) ═══════
  const [overrideSearch, setOverrideSearch] = useState('');
  const [overrideStudents, setOverrideStudents] = useState([
    { name: 'Aarav Patel', id: 'STU-001', cls: 'Grade 5', overrides: [
      { component: 'Tuition Fee', standard: '3600', custom: '2800', reason: 'Single parent waiver' },
    ]},
    { name: 'Priya Shah', id: 'STU-002', cls: 'Grade 8', overrides: [
      { component: 'Tuition Fee', standard: '4500', custom: '3500', reason: 'Staff child discount' },
      { component: 'Lab Fee', standard: '1800', custom: '0', reason: 'Staff child — full waiver' },
    ]},
  ]);
  const [editingOverrideStudent, setEditingOverrideStudent] = useState<string | null>(null);
  const [addingOverride, setAddingOverride] = useState(false);

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
  const [reportDateFrom, setReportDateFrom] = useState('2026-01-01');
  const [reportDateTo, setReportDateTo] = useState('2026-03-02');
  const [reportFilter, setReportFilter] = useState('all');
  const [reportSearch, setReportSearch] = useState('');
  const [reportGroupBy, setReportGroupBy] = useState('none');

  // ═══════ Settings sub-tab state ═══════
  type SettingsSubTab = 'masters' | 'templates' | 'estimation' | 'payment-config' | 'import';
  const [settingsTab, setSettingsTab] = useState<SettingsSubTab>('masters');

  // Terms — synced from Academic Config module (read-only here)
  const academicTerms = [
    { name: 'Term 1', start: 'April 2025', end: 'September 2025', active: true },
    { name: 'Term 2', start: 'October 2025', end: 'March 2026', active: true },
  ];

  // Receipt template selection
  const [selectedReceiptTemplate, setSelectedReceiptTemplate] = useState('standard');

  // ═══════ Derived ═══════
  const activeHeads = Object.entries(feeHeads).filter(([, v]) => v).map(([k]) => k);
  const frequencies = ['Monthly', 'Quarterly', 'Term-wise', 'Half-yearly', 'Yearly', 'One-time'];
  const allFeeHeadNames = Object.keys(feeHeads);
  const filteredFeeHeads = feeHeadSearch
    ? allFeeHeadNames.filter(h => h.toLowerCase().includes(feeHeadSearch.toLowerCase()))
    : allFeeHeadNames;
  const filteredConcessions = concessionSearch
    ? concessions.filter(c => c.type.toLowerCase().includes(concessionSearch.toLowerCase()))
    : concessions;
  const mockStudents = [
    { name: 'Aarav Patel', id: 'STU-001', cls: 'Grade 5', rollNo: '15', pending: '32,400' },
    { name: 'Priya Shah', id: 'STU-002', cls: 'Grade 8', rollNo: '22', pending: '45,000' },
    { name: 'Rahul Sharma', id: 'STU-003', cls: 'Grade 3', rollNo: '08', pending: '28,000' },
    { name: 'Sneha Patel', id: 'STU-004', cls: 'Grade 10', rollNo: '31', pending: '55,000' },
    { name: 'Amit Kumar', id: 'STU-005', cls: 'Grade 6', rollNo: '12', pending: '40,000' },
    { name: 'Meera Joshi', id: 'STU-006', cls: 'Grade 9', rollNo: '05', pending: '52,000' },
    { name: 'Vikram Singh', id: 'STU-007', cls: 'Grade 7', rollNo: '19', pending: '42,000' },
    { name: 'Ananya Reddy', id: 'STU-008', cls: 'Grade 4', rollNo: '27', pending: '35,000' },
  ];
  const filteredStudents = collectionSearch.length >= 2
    ? mockStudents.filter(s => s.name.toLowerCase().includes(collectionSearch.toLowerCase()) || s.id.toLowerCase().includes(collectionSearch.toLowerCase()))
    : [];
  const filteredOverrideStudents = overrideSearch.length >= 2
    ? mockStudents.filter(s => s.name.toLowerCase().includes(overrideSearch.toLowerCase()) || s.id.toLowerCase().includes(overrideSearch.toLowerCase()))
    : [];

  return (
    <div className="space-y-4">
      <ModuleHeader title="Fee Management" subtitle="Configure fee structure, payments, concessions, reports, and settings" theme={theme} />

      {/* ══════════════════════════════════════════════════════════════
          TAB 1: Fee Structure
          ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'structure' && (
        <div className="space-y-4">
          {/* Critical Lock Banner */}
          {structureLocked ? (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3 flex items-center gap-3">
              <Lock size={14} className="text-rose-500 shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-rose-700"><strong>Fee Structure is Locked.</strong> Editing fee heads or amounts requires OTP verification from the registered Trustee.</p>
              </div>
              <button onClick={() => { setShowOtpModal(true); setOtpSent(false); setOtpValue(''); setOtpError(''); }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 transition-all shrink-0">
                <Unlock size={12} /> Unlock with OTP
              </button>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-center gap-3">
              <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-emerald-700"><strong>Fee Structure Unlocked.</strong> You can now edit fee heads and amounts. Remember to save your changes.</p>
              </div>
              <button onClick={() => setStructureLocked(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all shrink-0">
                <Lock size={12} /> Re-Lock
              </button>
            </div>
          )}

          {/* OTP Verification Modal */}
          {showOtpModal && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={() => setShowOtpModal(false)}>
              <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 w-96 shadow-2xl`} onClick={e => e.stopPropagation()}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                    <Lock size={18} className="text-rose-600" />
                  </div>
                  <div>
                    <h3 className={`text-sm font-bold ${theme.highlight}`}>OTP Verification Required</h3>
                    <p className={`text-[10px] ${theme.iconColor}`}>Enter the OTP sent to the registered Trustee</p>
                  </div>
                </div>

                {!otpSent ? (
                  <div className="space-y-3">
                    <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
                      <p className={`text-[10px] ${theme.iconColor} mb-1`}>OTP will be sent to:</p>
                      <p className={`text-xs font-bold ${theme.highlight}`}>Mr. Amit Patel (Trust Secretary)</p>
                      <p className={`text-[10px] ${theme.iconColor}`}>+91 98765 •••••  |  amit.p••••@gmail.com</p>
                    </div>
                    <button onClick={() => setOtpSent(true)}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold ${theme.primary} text-white`}>
                      Send OTP
                    </button>
                    <button onClick={() => setShowOtpModal(false)}
                      className={`w-full px-4 py-2 rounded-xl text-xs font-bold ${theme.iconColor} ${theme.buttonHover}`}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className={`p-3 rounded-xl bg-blue-50 border border-blue-200`}>
                      <p className="text-[10px] text-blue-700">OTP sent to Mr. Amit Patel. Valid for 5 minutes.</p>
                    </div>
                    <div>
                      <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Enter 6-digit OTP</p>
                      <input type="text" value={otpValue} onChange={e => { setOtpValue(e.target.value.replace(/\D/g, '').slice(0, 6)); setOtpError(''); }}
                        placeholder="• • • • • •"
                        maxLength={6}
                        className={`w-full px-4 py-3 rounded-xl border-2 ${otpError ? 'border-red-400' : theme.border} ${theme.inputBg} text-center text-xl font-bold tracking-[0.5em] ${theme.highlight} outline-none focus:ring-2 focus:ring-blue-300`}
                        autoFocus />
                      {otpError && <p className="text-[10px] text-red-500 font-bold mt-1">{otpError}</p>}
                    </div>
                    <button onClick={() => {
                      if (otpValue.length !== 6) { setOtpError('Please enter a 6-digit OTP'); return; }
                      setStructureLocked(false);
                      setShowOtpModal(false);
                      setOtpValue('');
                    }}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold ${theme.primary} text-white`}>
                      <Unlock size={14} /> Verify & Unlock
                    </button>
                    <div className="flex items-center justify-between">
                      <button onClick={() => { setOtpSent(false); setOtpValue(''); setOtpError(''); }}
                        className={`text-[10px] font-bold ${theme.primaryText} hover:underline`}>
                        Resend OTP
                      </button>
                      <button onClick={() => setShowOtpModal(false)}
                        className={`text-[10px] font-bold ${theme.iconColor} hover:underline`}>
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Note: Fee Template moved to Settings > Templates */}
          <div className={`flex items-center gap-2 p-3 rounded-xl ${theme.secondaryBg} border ${theme.border}`}>
            <Settings2 size={14} className={theme.iconColor} />
            <p className={`text-xs ${theme.iconColor}`}>Fee Template configuration has moved to <button onClick={() => { setActiveTab('settings'); setSettingsTab('templates'); }} className={`font-bold ${theme.primaryText} hover:underline`}>Settings &rarr; Templates</button></p>
          </div>

          {/* Grade-wise Fee Amounts */}
          <div className="relative">
            {structureLocked ? (
              <span className="absolute -top-1 right-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-100 border border-rose-300 text-[9px] font-bold text-rose-700">
                <Lock size={9} /> LOCKED
              </span>
            ) : (
              <span className="absolute -top-1 right-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-[9px] font-bold text-emerald-700">
                <Unlock size={9} /> UNLOCKED
              </span>
            )}
            <SectionCard title="Grade-wise Fee Amounts" subtitle="Set amounts per grade for each active fee head (values in INR)" theme={theme}>
              {feeTemplate === 'term-wise' && (
                <div className="flex items-center gap-2 mb-3">
                  <p className={`text-[10px] font-bold ${theme.iconColor}`}>Term:</p>
                  {academicTerms.filter(t => t.active).map(t => (
                    <button key={t.name} onClick={() => setSelectedTerm(t.name)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedTerm === t.name ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.highlight} ${theme.border} border`}`}>
                      {t.name}
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
                                onChange={e => !structureLocked && setGradeAmounts(p => ({ ...p, [cg]: { ...p[cg], 'Annual Fee': e.target.value } }))}
                                readOnly={structureLocked}
                                className={`w-20 px-1.5 py-1 rounded-lg border ${theme.border} ${structureLocked ? 'bg-slate-100 cursor-not-allowed opacity-60' : theme.inputBg} text-xs text-center ${theme.highlight} outline-none focus:ring-1 focus:ring-slate-300`} />
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
                                    onChange={e => !structureLocked && setGradeAmounts(p => ({ ...p, [cg]: { ...p[cg], [h]: e.target.value } }))}
                                    readOnly={structureLocked}
                                    className={`w-16 px-1.5 py-1 rounded-lg border ${isInvalid ? 'border-red-400 bg-red-50' : `${theme.border} ${structureLocked ? 'bg-slate-100 cursor-not-allowed opacity-60' : theme.inputBg}`} text-xs text-center ${theme.highlight} outline-none focus:ring-1 ${isInvalid ? 'focus:ring-red-300' : 'focus:ring-slate-300'}`} />
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

          {/* Save Bar */}
          <div className={`flex items-center justify-between p-4 rounded-2xl ${theme.secondaryBg} border ${theme.border}`}>
            <div>
              <p className={`text-sm font-bold ${theme.highlight}`}>Save Fee Structure</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Save grade-wise amounts and term settings</p>
            </div>
            <button className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold ${theme.primary} text-white shadow-lg hover:shadow-xl transition-all`}>
              <Save size={16} /> Save Changes
            </button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 2: Concessions
          ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'concessions' && (
        <div className="space-y-4">
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
                          <div className="flex items-center gap-2 flex-1">
                            <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-[9px] font-bold flex items-center justify-center">{step.avatar}</span>
                            <div>
                              <p className={`text-xs font-bold ${theme.highlight}`}>{step.name}</p>
                              <p className={`text-[9px] ${theme.iconColor}`}>{step.role}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <button className={`text-[9px] px-2 py-1 rounded-lg ${theme.buttonHover} ${theme.iconColor} border ${theme.border}`}>Change</button>
                            <button onClick={() => setConcessionApprovalChain(p => p.filter((_, j) => j !== i))}
                              className="text-[9px] px-2 py-1 rounded-lg text-red-500 hover:bg-red-50 border border-red-200" title="Remove from chain">
                              <Trash2 size={10} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Add Approver */}
                    {addingApprover ? (
                      <div className={`mt-2 p-3 rounded-xl border ${theme.border} ${theme.secondaryBg}`}>
                        <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Add New Approver</p>
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <InputField value={newApproverName} onChange={setNewApproverName} theme={theme} placeholder="Full Name" />
                          <InputField value={newApproverRole} onChange={setNewApproverRole} theme={theme} placeholder="Role / Designation" />
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => {
                            if (newApproverName && newApproverRole) {
                              const initials = newApproverName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
                              setConcessionApprovalChain(p => [...p, { name: newApproverName, role: newApproverRole, avatar: initials }]);
                              setNewApproverName(''); setNewApproverRole(''); setAddingApprover(false);
                            }
                          }} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold ${theme.primary} text-white`}>
                            <Plus size={12} /> Add
                          </button>
                          <button onClick={() => { setAddingApprover(false); setNewApproverName(''); setNewApproverRole(''); }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${theme.iconColor} ${theme.buttonHover}`}>
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button onClick={() => setAddingApprover(true)}
                        className={`mt-2 flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
                        <Plus size={12} /> Add Person to Chain
                      </button>
                    )}
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

          {/* Student-Level Fee Override — Custom discount per student per component */}
          <SectionCard title="Student-Level Fee Override" subtitle="Custom discount per student per fee component" theme={theme}>
            <div className="space-y-3">
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>Enable Student-Level Override</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Allow custom fee amounts for individual students per component</p>
                </div>
                <SSAToggle on={feeOverrideEnabled} onChange={() => setFeeOverrideEnabled(!feeOverrideEnabled)} theme={theme} />
              </div>

              {feeOverrideEnabled && (
                <>
                  <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                    <p className={`text-xs font-bold ${theme.highlight}`}>Approval required for override</p>
                    <SSAToggle on={overrideApproval} onChange={() => setOverrideApproval(!overrideApproval)} theme={theme} />
                  </div>

                  {/* Existing Override Students */}
                  <div>
                    <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Students with Custom Overrides ({overrideStudents.length})</p>
                    {overrideStudents.map((student, sIdx) => (
                      <div key={student.id} className={`mb-2 rounded-xl border ${theme.border} overflow-hidden`}>
                        <button className={`w-full flex items-center gap-3 p-3 ${theme.secondaryBg} text-left`}
                          onClick={() => setEditingOverrideStudent(editingOverrideStudent === student.id ? null : student.id)}>
                          <div className={`w-8 h-8 rounded-full ${theme.primary} text-white flex items-center justify-center text-[10px] font-bold shrink-0`}>
                            {student.name.split(' ').map(w => w[0]).join('')}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs font-bold ${theme.highlight}`}>{student.name}</p>
                            <p className={`text-[10px] ${theme.iconColor}`}>{student.id} {'\u00B7'} {student.cls} {'\u00B7'} {student.overrides.length} component(s) overridden</p>
                          </div>
                          <span className="text-xs font-bold text-emerald-600 shrink-0">
                            {'\u20B9'}{student.overrides.reduce((sum, o) => sum + Math.max(0, Number(o.standard) - Number(o.custom)), 0).toLocaleString('en-IN')} saved
                          </span>
                          <ArrowRight size={14} className={`${theme.iconColor} transition-transform shrink-0 ${editingOverrideStudent === student.id ? 'rotate-90' : ''}`} />
                        </button>

                        {editingOverrideStudent === student.id && (
                          <div className="p-3">
                            <div className="overflow-x-auto">
                              <table className="w-full text-xs">
                                <thead><tr className={theme.secondaryBg}>
                                  <th className={`text-left px-2 py-1.5 font-bold ${theme.iconColor}`}>Component</th>
                                  <th className={`text-center px-2 py-1.5 font-bold ${theme.iconColor}`}>Standard ({'\u20B9'})</th>
                                  <th className={`text-center px-2 py-1.5 font-bold ${theme.iconColor}`}>Custom ({'\u20B9'})</th>
                                  <th className={`text-center px-2 py-1.5 font-bold ${theme.iconColor}`}>Discount</th>
                                  <th className={`text-left px-2 py-1.5 font-bold ${theme.iconColor}`}>Reason</th>
                                  <th className="w-8"></th>
                                </tr></thead>
                                <tbody>
                                  {student.overrides.map((o, oIdx) => {
                                    const disc = Number(o.standard) - Number(o.custom);
                                    const usedComponents = student.overrides.map(x => x.component);
                                    const availableForThis = activeHeads.filter(h => h === o.component || !usedComponents.includes(h));
                                    return (
                                      <tr key={oIdx} className={`border-t ${theme.border}`}>
                                        <td className="px-2 py-1.5">
                                          <select value={o.component} onChange={e => {
                                            const comp = e.target.value;
                                            const stdAmt = gradeAmounts[student.cls]?.[comp] || '0';
                                            const n = [...overrideStudents];
                                            n[sIdx] = { ...n[sIdx], overrides: n[sIdx].overrides.map((x, i) => i === oIdx ? { ...x, component: comp, standard: stdAmt } : x) };
                                            setOverrideStudents(n);
                                          }} className={`px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight}`}>
                                            {availableForThis.map(h => <option key={h} value={h}>{h}</option>)}
                                          </select>
                                        </td>
                                        <td className={`px-2 py-1.5 text-center ${theme.iconColor} line-through`}>{'\u20B9'}{Number(o.standard).toLocaleString('en-IN')}</td>
                                        <td className="px-2 py-1.5 text-center">
                                          <input value={o.custom} onChange={e => {
                                            const n = [...overrideStudents];
                                            n[sIdx] = { ...n[sIdx], overrides: n[sIdx].overrides.map((x, i) => i === oIdx ? { ...x, custom: e.target.value } : x) };
                                            setOverrideStudents(n);
                                          }}
                                            className={`w-20 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center font-bold text-emerald-600 outline-none`} />
                                        </td>
                                        <td className="px-2 py-1.5 text-center">
                                          <span className={`text-[10px] font-bold ${disc > 0 ? 'text-emerald-600' : theme.iconColor}`}>
                                            {disc > 0 ? `-\u20B9${disc.toLocaleString('en-IN')}` : '-'}
                                          </span>
                                        </td>
                                        <td className="px-2 py-1.5">
                                          <input value={o.reason} onChange={e => {
                                            const n = [...overrideStudents];
                                            n[sIdx] = { ...n[sIdx], overrides: n[sIdx].overrides.map((x, i) => i === oIdx ? { ...x, reason: e.target.value } : x) };
                                            setOverrideStudents(n);
                                          }}
                                            placeholder="Reason..."
                                            className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight} outline-none`} />
                                        </td>
                                        <td className="px-2 py-1.5">
                                          <button onClick={() => {
                                            const n = [...overrideStudents];
                                            n[sIdx] = { ...n[sIdx], overrides: n[sIdx].overrides.filter((_, i) => i !== oIdx) };
                                            if (n[sIdx].overrides.length === 0) { setOverrideStudents(n.filter((_, i) => i !== sIdx)); setEditingOverrideStudent(null); }
                                            else setOverrideStudents(n);
                                          }} className="text-red-400 hover:text-red-600"><Trash2 size={11} /></button>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                            {/* Add component override */}
                            {activeHeads.filter(h => !student.overrides.map(o => o.component).includes(h)).length > 0 && (
                              <button onClick={() => {
                                const used = student.overrides.map(o => o.component);
                                const avail = activeHeads.filter(h => !used.includes(h));
                                if (avail.length > 0) {
                                  const comp = avail[0];
                                  const stdAmt = gradeAmounts[student.cls]?.[comp] || '0';
                                  const n = [...overrideStudents];
                                  n[sIdx] = { ...n[sIdx], overrides: [...n[sIdx].overrides, { component: comp, standard: stdAmt, custom: stdAmt, reason: '' }] };
                                  setOverrideStudents(n);
                                }
                              }}
                                className={`mt-2 flex items-center gap-1 text-[10px] font-bold ${theme.primaryText} px-2 py-1.5 rounded-lg ${theme.buttonHover}`}>
                                <Plus size={10} /> Add Component Override
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Add New Student Override */}
                  {addingOverride ? (
                    <div className={`p-3 rounded-xl border ${theme.border} ${theme.secondaryBg}`}>
                      <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Search Student to Add Override</p>
                      <div className="relative">
                        <Search size={14} className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.iconColor}`} />
                        <input value={overrideSearch} onChange={e => setOverrideSearch(e.target.value)}
                          placeholder="Type student name or ID..."
                          className={`w-full pl-9 pr-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}
                          autoFocus />
                        {filteredOverrideStudents.filter(s => !overrideStudents.find(os => os.id === s.id)).length > 0 && (
                          <div className={`absolute top-full left-0 right-0 mt-1 ${theme.cardBg} border ${theme.border} rounded-xl shadow-lg z-30 max-h-40 overflow-y-auto`}>
                            {filteredOverrideStudents.filter(s => !overrideStudents.find(os => os.id === s.id)).map(s => (
                              <button key={s.id} onClick={() => {
                                const firstComp = activeHeads[0];
                                const stdAmt = gradeAmounts[s.cls]?.[firstComp] || '0';
                                setOverrideStudents(p => [...p, { name: s.name, id: s.id, cls: s.cls, overrides: [{ component: firstComp, standard: stdAmt, custom: stdAmt, reason: '' }] }]);
                                setEditingOverrideStudent(s.id);
                                setAddingOverride(false);
                                setOverrideSearch('');
                              }}
                                className={`w-full flex items-center gap-3 px-3 py-2 text-left ${theme.buttonHover}`}>
                                <div className={`w-7 h-7 rounded-full ${theme.primary} text-white flex items-center justify-center text-[9px] font-bold`}>
                                  {s.name.split(' ').map(w => w[0]).join('')}
                                </div>
                                <div>
                                  <p className={`text-xs font-bold ${theme.highlight}`}>{s.name}</p>
                                  <p className={`text-[10px] ${theme.iconColor}`}>{s.id} {'\u00B7'} {s.cls}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <button onClick={() => { setAddingOverride(false); setOverrideSearch(''); }}
                        className={`mt-2 text-[10px] font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-1.5 rounded-lg`}>Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => setAddingOverride(true)}
                      className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
                      <Plus size={12} /> Add Student Override
                    </button>
                  )}
                </>
              )}
            </div>
          </SectionCard>

          {/* Save Bar */}
          <div className={`flex items-center justify-between p-4 rounded-2xl ${theme.secondaryBg} border ${theme.border}`}>
            <div>
              <p className={`text-sm font-bold ${theme.highlight}`}>Save Concessions</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Save concession types, approval workflow, and overrides</p>
            </div>
            <button className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold ${theme.primary} text-white shadow-lg hover:shadow-xl transition-all`}>
              <Save size={16} /> Save Changes
            </button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 3: Payments — Config moved to Settings > Payment Config
          ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'payments' && (
        <div className="space-y-4">
          <div className={`flex items-center gap-2 p-3 rounded-xl ${theme.secondaryBg} border ${theme.border}`}>
            <Settings2 size={14} className={theme.iconColor} />
            <p className={`text-xs ${theme.iconColor}`}>Payment configuration (modes, gateways, links, QR, retry, international) has moved to <button onClick={() => { setActiveTab('settings'); setSettingsTab('payment-config'); }} className={`font-bold ${theme.primaryText} hover:underline`}>Settings &rarr; Payment Config</button></p>
          </div>

          {/* Fee Collection Point */}
          <SectionCard title="Fee Collection" subtitle="Search student, select pending fees, and collect payment" theme={theme}>
            <div className="space-y-4">
              {/* Student Search */}
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1.5`}>Search Student</p>
                <div className="relative">
                  <Search size={14} className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.iconColor}`} />
                  <input value={collectionSearch} onChange={e => { setCollectionSearch(e.target.value); setSelectedStudent(null); setCollectionDone(false); }}
                    placeholder="Type student name or ID (min 2 chars)..."
                    className={`w-full pl-9 pr-3 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none focus:ring-2 focus:ring-blue-300`} />
                  {filteredStudents.length > 0 && !selectedStudent && (
                    <div className={`absolute top-full left-0 right-0 mt-1 ${theme.cardBg} border ${theme.border} rounded-xl shadow-lg z-30 max-h-48 overflow-y-auto`}>
                      {filteredStudents.map(s => (
                        <button key={s.id} onClick={() => {
                          setSelectedStudent(s);
                          setCollectionSearch(s.name);
                          const comps: Record<string, boolean> = {};
                          activeHeads.forEach(h => { comps[h] = true; });
                          setCollectingComponents(comps);
                          setCollectionDone(false);
                        }}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 text-left ${theme.buttonHover} transition-colors`}>
                          <div className={`w-8 h-8 rounded-full ${theme.primary} text-white flex items-center justify-center text-[10px] font-bold`}>
                            {s.name.split(' ').map(w => w[0]).join('')}
                          </div>
                          <div className="flex-1">
                            <p className={`text-xs font-bold ${theme.highlight}`}>{s.name}</p>
                            <p className={`text-[10px] ${theme.iconColor}`}>{s.id} {'\u00B7'} {s.cls} {'\u00B7'} Roll #{s.rollNo}</p>
                          </div>
                          <span className="text-[10px] font-bold text-amber-600">{'\u20B9'}{s.pending} pending</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Selected Student — Fee Breakdown */}
              {selectedStudent && !collectionDone && (
                <>
                  <div className={`p-3 rounded-xl ${theme.secondaryBg} flex items-center gap-3`}>
                    <div className={`w-10 h-10 rounded-full ${theme.primary} text-white flex items-center justify-center text-xs font-bold`}>
                      {selectedStudent.name.split(' ').map(w => w[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <p className={`text-xs font-bold ${theme.highlight}`}>{selectedStudent.name}</p>
                      <p className={`text-[10px] ${theme.iconColor}`}>{selectedStudent.id} {'\u00B7'} {selectedStudent.cls} {'\u00B7'} Roll #{selectedStudent.rollNo}</p>
                    </div>
                    <button onClick={() => { setSelectedStudent(null); setCollectionSearch(''); }}
                      className={`text-xs ${theme.iconColor} hover:text-red-500`}><X size={14} /></button>
                  </div>

                  {/* Component-wise Pending Fees */}
                  <div>
                    <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Select Components to Pay</p>
                    <div className="space-y-1.5">
                      {activeHeads.map(h => {
                        const amt = gradeAmounts[selectedStudent.cls]?.[h] || '0';
                        return (
                          <label key={h} className={`flex items-center gap-3 p-2.5 rounded-xl ${theme.secondaryBg} cursor-pointer`}>
                            <input type="checkbox" checked={collectingComponents[h] || false}
                              onChange={() => setCollectingComponents(p => ({ ...p, [h]: !p[h] }))}
                              className="accent-emerald-500 w-4 h-4" />
                            <span className={`text-xs font-bold ${theme.highlight} flex-1`}>{h}</span>
                            <span className={`text-[10px] ${theme.iconColor}`}>{feeFrequency[h] || 'Yearly'}</span>
                            <span className={`text-xs font-bold ${theme.highlight}`}>{'\u20B9'}{Number(amt).toLocaleString('en-IN')}</span>
                          </label>
                        );
                      })}
                    </div>
                    <div className={`flex items-center justify-between mt-3 p-3 rounded-xl border-2 ${theme.border} ${theme.cardBg}`}>
                      <p className={`text-xs font-bold ${theme.highlight}`}>Total Payable</p>
                      <p className={`text-sm font-bold ${theme.primaryText}`}>{'\u20B9'}{activeHeads.filter(h => collectingComponents[h]).reduce((sum, h) => sum + Number(gradeAmounts[selectedStudent.cls]?.[h] || 0), 0).toLocaleString('en-IN')}</p>
                    </div>
                  </div>

                  {/* Payment Mode */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className={`text-[10px] font-bold ${theme.iconColor} mb-1.5`}>Payment Mode</p>
                      <SelectField options={paymentModesTable.filter(m => m.active).map(m => m.name)} value={collectionMode} onChange={setCollectionMode} theme={theme} />
                    </div>
                  </div>

                  {/* Cheque Details */}
                  {collectionMode === 'Cheque' && (
                    <div className={`p-3 rounded-xl border ${theme.border} ${theme.secondaryBg}`}>
                      <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}><CreditCard size={12} className="inline mr-1" />Cheque Details</p>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Cheque No.</p>
                          <InputField value={chequeNo} onChange={setChequeNo} theme={theme} placeholder="e.g. CHQ-001238" />
                        </div>
                        <div>
                          <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Bank Name</p>
                          <InputField value={chequeBank} onChange={setChequeBank} theme={theme} placeholder="e.g. SBI" />
                        </div>
                        <div>
                          <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Cheque Date</p>
                          <input type="date" value={chequeDate} onChange={e => setChequeDate(e.target.value)}
                            className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* DD/NEFT Details */}
                  {collectionMode === 'DD/NEFT' && (
                    <div className={`p-3 rounded-xl border ${theme.border} ${theme.secondaryBg}`}>
                      <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>DD/NEFT Details</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Reference No.</p>
                          <InputField value={chequeNo} onChange={setChequeNo} theme={theme} placeholder="e.g. NEFT-REF-12345" />
                        </div>
                        <div>
                          <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Bank Name</p>
                          <InputField value={chequeBank} onChange={setChequeBank} theme={theme} placeholder="e.g. HDFC" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Collect Button */}
                  <button onClick={() => setCollectionDone(true)}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold ${theme.primary} text-white shadow-lg hover:shadow-xl transition-all`}>
                    <Receipt size={16} /> Collect {'\u20B9'}{activeHeads.filter(h => collectingComponents[h]).reduce((sum, h) => sum + Number(gradeAmounts[selectedStudent.cls]?.[h] || 0), 0).toLocaleString('en-IN')} & Generate Receipt
                  </button>
                </>
              )}

              {/* Success State */}
              {collectionDone && selectedStudent && (
                <div className="text-center py-6">
                  <CheckCircle size={40} className="text-emerald-500 mx-auto mb-3" />
                  <p className={`text-sm font-bold ${theme.highlight} mb-1`}>Payment Collected Successfully!</p>
                  <p className={`text-xs ${theme.iconColor} mb-3`}>Receipt #RCT-2026-03-{String(Math.floor(Math.random() * 9000 + 1000))} generated for {selectedStudent.name}</p>
                  <div className="flex items-center justify-center gap-3">
                    <button className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold ${theme.primary} text-white`}>
                      <Eye size={12} /> View Receipt
                    </button>
                    <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-100 text-emerald-700">
                      <Download size={12} /> Download PDF
                    </button>
                    <button onClick={() => { setSelectedStudent(null); setCollectionSearch(''); setCollectionDone(false); setChequeNo(''); setChequeBank(''); setChequeDate(''); setCollectionMode('Cash'); }}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold ${theme.iconColor} ${theme.buttonHover}`}>
                      <Plus size={12} /> Collect Another
                    </button>
                  </div>
                </div>
              )}
            </div>
          </SectionCard>

          {/* Billing Cycle & Due Date + Late Fee — core payment behavior */}
          <div className="grid grid-cols-2 gap-4">
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

          {/* Save Bar */}
          <div className={`flex items-center justify-between p-4 rounded-2xl ${theme.secondaryBg} border ${theme.border}`}>
            <div>
              <p className={`text-sm font-bold ${theme.highlight}`}>Save Payment Settings</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Save billing cycle, late fees, EMI, and cheque settings</p>
            </div>
            <button className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold ${theme.primary} text-white shadow-lg hover:shadow-xl transition-all`}>
              <Save size={16} /> Save Changes
            </button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 5: Reports — Enhanced with Search, Filter, Group By, Export
          ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          {/* Report Toolbar — Enhanced */}
          <div className={`flex flex-wrap items-center gap-3 p-3 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex items-center gap-2">
              <Calendar size={14} className={theme.iconColor} />
              <input type="date" value={reportDateFrom} onChange={e => setReportDateFrom(e.target.value)}
                className={`px-2 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
              <span className={`text-[10px] ${theme.iconColor}`}>to</span>
              <input type="date" value={reportDateTo} onChange={e => setReportDateTo(e.target.value)}
                className={`px-2 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
            </div>
            <div className="relative">
              <Search size={12} className={`absolute left-2.5 top-1/2 -translate-y-1/2 ${theme.iconColor}`} />
              <input value={reportSearch} onChange={e => setReportSearch(e.target.value)}
                placeholder="Search reports..."
                className={`pl-7 pr-3 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none w-40`} />
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
            <div className="flex items-center gap-1.5">
              <span className={`text-[10px] font-bold ${theme.iconColor}`}>Group:</span>
              <select value={reportGroupBy} onChange={e => setReportGroupBy(e.target.value)}
                className={`px-2 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                <option value="none">No Grouping</option>
                <option value="class">By Class</option>
                <option value="month">By Month</option>
                <option value="payment-mode">By Payment Mode</option>
                <option value="fee-head">By Fee Head</option>
              </select>
            </div>
            <div className="flex items-center gap-1.5 ml-auto">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-red-100 text-red-700 hover:bg-red-200 transition-colors">
                <FileText size={12} /> Export PDF
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors">
                <Download size={12} /> Export Excel
              </button>
            </div>
          </div>

          {/* Fee Collection Report */}
          <SectionCard title="Fee Collection Report" subtitle="Detailed fee collection status with search, filter, and export" theme={theme}>
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
            <div className="flex items-center justify-between mt-2">
              <p className={`text-[10px] ${theme.iconColor}`}>Showing 1-3 of 3 months</p>
              <div className="flex gap-1.5">
                <button className="flex items-center gap-1 px-2 py-1 rounded text-[9px] font-bold bg-red-100 text-red-700"><FileText size={10} /> PDF</button>
                <button className="flex items-center gap-1 px-2 py-1 rounded text-[9px] font-bold bg-emerald-100 text-emerald-700"><Download size={10} /> Excel</button>
              </div>
            </div>
          </SectionCard>

          {/* Transaction Reports — as report cards with View/Export */}
          <SectionCard title="Transaction Reports" subtitle="Payment transaction analytics and reconciliation" theme={theme}>
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: 'Success / Failure Rate', desc: 'Payment success rate dashboard with trend analysis', count: '2,847 transactions' },
                { name: 'Settlement Reconciliation', desc: 'Match gateway settlements with bank deposits', count: '₹32.4L settled' },
                { name: 'Bank Deposit Tracking', desc: 'Track deposits per bank account with daily totals', count: '3 bank accounts' },
              ].map(report => (
                <div key={report.name} className={`${theme.secondaryBg} rounded-xl p-3 border ${theme.border}`}>
                  <p className={`text-xs font-bold ${theme.highlight} mb-1`}>{report.name}</p>
                  <p className={`text-[10px] ${theme.iconColor} mb-2`}>{report.desc}</p>
                  <p className={`text-[10px] font-bold ${theme.primaryText} mb-2`}>{report.count}</p>
                  <div className="flex gap-1.5">
                    <button className={`flex items-center gap-1 px-2 py-1 rounded text-[9px] font-bold ${theme.primary} text-white`}><Eye size={9} /> View</button>
                    <button className="flex items-center gap-1 px-2 py-1 rounded text-[9px] font-bold bg-red-100 text-red-700"><FileText size={9} /> PDF</button>
                    <button className="flex items-center gap-1 px-2 py-1 rounded text-[9px] font-bold bg-emerald-100 text-emerald-700"><Download size={9} /> Excel</button>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Cheque Register Report */}
          <SectionCard title="Cheque Register Report" subtitle="Track all cheque payments, clearances, and bounces" theme={theme}>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead><tr className={theme.secondaryBg}>
                  {['Cheque No.', 'Student', 'Class', 'Amount', 'Bank', 'Date', 'Status'].map(h => (
                    <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {[
                    { no: 'CHQ-001234', student: 'Rahul Sharma', cls: 'Grade 5', amount: '36,000', bank: 'SBI', date: '01 Feb 2026', status: 'Cleared' },
                    { no: 'CHQ-001235', student: 'Sneha Patel', cls: 'Grade 8', amount: '45,000', bank: 'HDFC', date: '05 Feb 2026', status: 'Cleared' },
                    { no: 'CHQ-001236', student: 'Amit Kumar', cls: 'Grade 3', amount: '28,000', bank: 'ICICI', date: '10 Feb 2026', status: 'Bounced' },
                    { no: 'CHQ-001237', student: 'Priya Joshi', cls: 'Grade 10', amount: '55,000', bank: 'Axis', date: '15 Feb 2026', status: 'Pending' },
                  ].map((row, i) => (
                    <tr key={i} className={`border-t ${theme.border}`}>
                      <td className={`px-2 py-1.5 font-mono font-bold ${theme.highlight}`}>{row.no}</td>
                      <td className={`px-2 py-1.5 font-bold ${theme.highlight}`}>{row.student}</td>
                      <td className={`px-2 py-1.5 ${theme.iconColor}`}>{row.cls}</td>
                      <td className={`px-2 py-1.5 font-bold ${theme.highlight}`}>{'\u20B9'}{row.amount}</td>
                      <td className={`px-2 py-1.5 ${theme.iconColor}`}>{row.bank}</td>
                      <td className={`px-2 py-1.5 ${theme.iconColor}`}>{row.date}</td>
                      <td className="px-2 py-1.5">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          row.status === 'Cleared' ? 'bg-emerald-100 text-emerald-700' :
                          row.status === 'Bounced' ? 'bg-red-100 text-red-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>{row.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className={`text-[10px] ${theme.iconColor}`}>Showing 1-4 of 4 cheques</p>
              <div className="flex gap-1.5">
                <button className="flex items-center gap-1 px-2 py-1 rounded text-[9px] font-bold bg-red-100 text-red-700"><FileText size={10} /> PDF</button>
                <button className="flex items-center gap-1 px-2 py-1 rounded text-[9px] font-bold bg-emerald-100 text-emerald-700"><Download size={10} /> Excel</button>
              </div>
            </div>
          </SectionCard>

          {/* Gateway Audit Trail */}
          <SectionCard title="Gateway Audit Trail" subtitle="Track who changed payment gateway settings" theme={theme}>
            <div className="space-y-3">
              <div className="flex items-center gap-3 mb-2">
                <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg} flex-1`}>
                  <p className={`text-xs font-bold ${theme.highlight}`}>Log all config changes</p>
                  <SSAToggle on={auditConfigChanges} onChange={() => setAuditConfigChanges(!auditConfigChanges)} theme={theme} />
                </div>
                <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg} flex-1`}>
                  <p className={`text-xs font-bold ${theme.highlight}`}>Log refund decisions</p>
                  <SSAToggle on={auditRefundDecisions} onChange={() => setAuditRefundDecisions(!auditRefundDecisions)} theme={theme} />
                </div>
              </div>
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
          </SectionCard>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 6: Settings — Restructured with Sub-Tabs
          ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'settings' && (
        <div className="space-y-4">
          {/* Settings Sub-Tab Bar */}
          <div className={`flex items-center gap-1 p-1 rounded-xl ${theme.cardBg} border ${theme.border} overflow-x-auto`}>
            {([
              { id: 'masters' as SettingsSubTab, label: 'Masters' },
              { id: 'templates' as SettingsSubTab, label: 'Templates' },
              { id: 'estimation' as SettingsSubTab, label: 'Fee Estimation' },
              { id: 'payment-config' as SettingsSubTab, label: 'Payment Config' },
              { id: 'import' as SettingsSubTab, label: 'Import' },
            ]).map(st => (
              <button key={st.id} onClick={() => setSettingsTab(st.id)}
                className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  settingsTab === st.id ? `${theme.primary} text-white shadow-sm` : `${theme.iconColor} hover:${theme.highlight} ${theme.buttonHover}`
                }`}>
                {st.label}
              </button>
            ))}
          </div>

          {/* ═══ Settings > Masters ═══ */}
          {settingsTab === 'masters' && (
            <div className="space-y-4">
              {/* Fee Heads Master */}
              <SectionCard title="Fee Heads Master" subtitle="Create, edit, delete, enable/disable fee components" theme={theme}>
                <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg} mb-3`}>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search size={14} className={`absolute left-2.5 top-1/2 -translate-y-1/2 ${theme.iconColor}`} />
                      <input value={feeHeadSearch} onChange={e => setFeeHeadSearch(e.target.value)}
                        placeholder="Search fee heads..."
                        className={`pl-8 pr-3 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none w-52`} />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${theme.accentBg} ${theme.iconColor}`}>
                      {activeHeads.length} active / {allFeeHeadNames.length + customFeeHeads.length} total
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors">
                      <Download size={12} /> Export
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">
                      <Upload size={12} /> Import
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead><tr className={theme.secondaryBg}>
                      {['Fee Head Name', 'Frequency', 'Active', ''].map(h => (
                        <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor}`}>{h}</th>
                      ))}
                    </tr></thead>
                    <tbody>
                      {filteredFeeHeads.map(head => (
                        <tr key={head} className={`border-t ${theme.border}`}>
                          <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{head}</td>
                          <td className="px-3 py-1.5">
                            <select value={feeFrequency[head] || 'Yearly'} onChange={e => setFeeFrequency(p => ({ ...p, [head]: e.target.value }))}
                              className={`px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] font-bold ${theme.highlight}`}>
                              {(feeTemplate === 'term-wise' ? ['Term 1', 'Term 2', 'Term 3', 'All Terms'] : frequencies).map(f => <option key={f} value={f}>{f}</option>)}
                            </select>
                          </td>
                          <td className="px-3 py-1.5">
                            <SSAToggle on={feeHeads[head]} onChange={() => setFeeHeads(p => ({ ...p, [head]: !p[head] }))} theme={theme} label={head} />
                          </td>
                          <td className="px-3 py-1.5">
                            <button onClick={() => {
                              setFeeHeads(p => { const n = { ...p }; delete n[head]; return n; });
                              setFeeFrequency(p => { const n = { ...p }; delete n[head]; return n; });
                            }} className="text-red-400 hover:text-red-600"><Trash2 size={12} /></button>
                          </td>
                        </tr>
                      ))}
                      {customFeeHeads.filter(cfh => !feeHeadSearch || cfh.name.toLowerCase().includes(feeHeadSearch.toLowerCase())).map((cfh, idx) => (
                        <tr key={`custom-${idx}`} className={`border-t ${theme.border} bg-emerald-50/30`}>
                          <td className="px-3 py-1.5">
                            <input value={cfh.name} onChange={e => setCustomFeeHeads(p => p.map((h, i) => i === idx ? { ...h, name: e.target.value } : h))}
                              placeholder="New fee head name..."
                              className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                          </td>
                          <td className="px-3 py-1.5">
                            <select value={cfh.frequency} onChange={e => setCustomFeeHeads(p => p.map((h, i) => i === idx ? { ...h, frequency: e.target.value } : h))}
                              className={`px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] font-bold ${theme.highlight}`}>
                              {(feeTemplate === 'term-wise' ? ['Term 1', 'Term 2', 'Term 3', 'All Terms'] : frequencies).map(f => <option key={f} value={f}>{f}</option>)}
                            </select>
                          </td>
                          <td className="px-3 py-1.5">
                            <SSAToggle on={cfh.enabled} onChange={() => setCustomFeeHeads(p => p.map((h, i) => i === idx ? { ...h, enabled: !h.enabled } : h))} theme={theme} label={cfh.name} />
                          </td>
                          <td className="px-3 py-1.5">
                            <button onClick={() => setCustomFeeHeads(p => p.filter((_, i) => i !== idx))} className="text-red-400 hover:text-red-600"><Trash2 size={12} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setCustomFeeHeads(p => [...p, { name: '', frequency: 'Monthly', enabled: true }])}
                      className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
                      <Plus size={12} /> Add Fee Head
                    </button>
                    <button onClick={() => setFeeHeads(p => { const n = { ...p }; Object.keys(n).forEach(k => n[k] = true); return n; })}
                      className="px-2.5 py-1.5 rounded-lg text-[9px] font-bold bg-emerald-100 text-emerald-700 hover:bg-emerald-200">Enable All</button>
                    <button onClick={() => setFeeHeads(p => { const n = { ...p }; Object.keys(n).forEach(k => n[k] = false); return n; })}
                      className="px-2.5 py-1.5 rounded-lg text-[9px] font-bold bg-gray-100 text-gray-600 hover:bg-gray-200">Disable All</button>
                  </div>
                  <p className={`text-[10px] ${theme.iconColor}`}>Showing {filteredFeeHeads.length} of {allFeeHeadNames.length} fee heads</p>
                </div>
              </SectionCard>

              {/* Payment Modes Master — Enhanced with Add */}
              <SectionCard title="Payment Modes Master" subtitle="Create, edit, delete payment modes and configure gateway per mode" theme={theme}>
                <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg} mb-3`}>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${theme.accentBg} ${theme.iconColor}`}>
                    {paymentModesTable.filter(m => m.active).length} active / {paymentModesTable.length} total
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors">
                      <Download size={12} /> Export
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">
                      <Upload size={12} /> Import
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead><tr className={theme.secondaryBg}>
                      {['Mode', 'Active', 'Gateway', 'Refund Policy', 'Fee (%)', 'Auto Receipt', 'Reconciliation', 'Default', ''].map(h => (
                        <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>{h}</th>
                      ))}
                    </tr></thead>
                    <tbody>
                      {paymentModesTable.map((m, i) => (
                        <tr key={i} className={`border-t ${theme.border} ${!m.active ? 'opacity-50' : ''}`}>
                          <td className={`px-2 py-1.5 font-bold ${theme.highlight}`}>{m.name}</td>
                          <td className="px-2 py-1.5">
                            <SSAToggle on={m.active} onChange={() => { const n = [...paymentModesTable]; n[i] = { ...n[i], active: !n[i].active }; setPaymentModesTable(n); }} theme={theme} />
                          </td>
                          <td className="px-2 py-1.5">
                            {m.name === 'Cash' || m.name === 'Cheque' || m.name === 'DD/NEFT' ? (
                              <span className={`text-[10px] ${theme.iconColor}`}>N/A</span>
                            ) : (
                              <select value={m.gateway} onChange={e => { const n = [...paymentModesTable]; n[i] = { ...n[i], gateway: e.target.value }; setPaymentModesTable(n); }}
                                className={`px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] font-bold ${theme.highlight}`}>
                                <option value="Razorpay">Razorpay</option><option value="PayU">PayU</option><option value="CCAvenue">CCAvenue</option><option value="Cashfree">Cashfree</option>
                              </select>
                            )}
                          </td>
                          <td className="px-2 py-1.5">
                            <select value={m.refundPolicy} onChange={e => { const n = [...paymentModesTable]; n[i] = { ...n[i], refundPolicy: e.target.value }; setPaymentModesTable(n); }}
                              className={`px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] font-bold ${theme.highlight}`}>
                              <option value="Manual">Manual</option><option value="Auto">Auto</option>
                            </select>
                          </td>
                          <td className={`px-2 py-1.5 ${theme.highlight}`}>{m.processingFee}%</td>
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
                          <td className="px-2 py-1.5">
                            <button onClick={() => setPaymentModesTable(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><Trash2 size={12} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {addingPaymentMode ? (
                  <div className={`mt-3 p-3 rounded-xl border ${theme.border} ${theme.secondaryBg}`}>
                    <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Add New Payment Mode</p>
                    <div className="flex items-center gap-2">
                      <InputField value={newPaymentModeName} onChange={setNewPaymentModeName} theme={theme} placeholder="Payment mode name" />
                      <button onClick={() => {
                        if (newPaymentModeName) {
                          setPaymentModesTable(p => [...p, { name: newPaymentModeName, active: true, processingFee: '0', autoReceipt: true, reconciliation: 'Manual', isDefault: false, gateway: 'N/A', refundPolicy: 'Manual' }]);
                          setNewPaymentModeName(''); setAddingPaymentMode(false);
                        }
                      }} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold ${theme.primary} text-white whitespace-nowrap`}>
                        <Plus size={12} /> Add
                      </button>
                      <button onClick={() => { setAddingPaymentMode(false); setNewPaymentModeName(''); }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${theme.iconColor} ${theme.buttonHover}`}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setAddingPaymentMode(true)}
                    className={`mt-3 flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
                    <Plus size={12} /> Add Payment Mode
                  </button>
                )}
              </SectionCard>

              {/* Concession & Scholarship Master */}
              <SectionCard title="Concession & Scholarship Master" subtitle="Create, edit, delete discount types, approval requirements, and limits" theme={theme}>
                <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg} mb-3`}>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search size={14} className={`absolute left-2.5 top-1/2 -translate-y-1/2 ${theme.iconColor}`} />
                      <input value={concessionSearch} onChange={e => setConcessionSearch(e.target.value)}
                        placeholder="Search concessions..."
                        className={`pl-8 pr-3 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none w-52`} />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${theme.accentBg} ${theme.iconColor}`}>
                      {filteredConcessions.length} of {concessions.length} types
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors">
                      <Download size={12} /> Export
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">
                      <Upload size={12} /> Import
                    </button>
                  </div>
                </div>
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
                          <td className="px-2 py-1.5"><button onClick={() => setConcessions(p => p.filter((_, j) => j !== realIdx))} className="text-red-400 hover:text-red-600"><Trash2 size={12} /></button></td>
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
                  </div>
                </div>
              </SectionCard>

              {/* Term Master — Synced from Academic Config */}
              <SectionCard title="Term Master" subtitle="Terms are synced from Academic Config — edit terms there to update fee scheduling" theme={theme}>
                <div className={`flex items-center gap-2 p-3 rounded-xl bg-blue-50 border border-blue-200 mb-3`}>
                  <Calendar size={14} className="text-blue-500 shrink-0" />
                  <p className="text-xs text-blue-700">
                    <strong>Synced from Academic Config.</strong> Term definitions (names, dates) are managed centrally in the Academic Configuration module. Changes there automatically reflect in fee scheduling.
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead><tr className={theme.secondaryBg}>
                      {['Term Name', 'Start', 'End', 'Status'].map(h => (
                        <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor}`}>{h}</th>
                      ))}
                    </tr></thead>
                    <tbody>
                      {academicTerms.map((term, idx) => (
                        <tr key={idx} className={`border-t ${theme.border}`}>
                          <td className={`px-3 py-2 text-xs font-bold ${theme.highlight}`}>{term.name}</td>
                          <td className={`px-3 py-2 text-xs ${theme.iconColor}`}>{term.start}</td>
                          <td className={`px-3 py-2 text-xs ${theme.iconColor}`}>{term.end}</td>
                          <td className="px-3 py-2">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${term.active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                              {term.active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className={`text-[10px] ${theme.iconColor} mt-2`}>{academicTerms.length} terms synced from Academic Config</p>
              </SectionCard>
            </div>
          )}

          {/* ═══ Settings > Templates ═══ */}
          {settingsTab === 'templates' && (
            <div className="space-y-4">
              {/* Fee Template — moved from Structure tab */}
              <div className="relative">
                {structureLocked ? (
                  <span className="absolute -top-1 right-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-100 border border-rose-300 text-[9px] font-bold text-rose-700">
                    <Lock size={9} /> LOCKED
                  </span>
                ) : (
                  <span className="absolute -top-1 right-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-[9px] font-bold text-emerald-700">
                    <Unlock size={9} /> UNLOCKED
                  </span>
                )}
                <SectionCard title="Fee Template" subtitle="Choose how fees are structured for your school" theme={theme}>
                  {structureLocked && (
                    <div className="bg-rose-50 border border-rose-200 rounded-xl p-2.5 mb-3 flex items-center gap-2">
                      <Lock size={12} className="text-rose-500 shrink-0" />
                      <p className="text-[10px] text-rose-700 flex-1">Locked. Go to <button onClick={() => { setActiveTab('structure'); }} className="font-bold underline">Fee Structure</button> tab to unlock with OTP.</p>
                    </div>
                  )}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'simple-annual', name: 'Simple Annual', desc: 'One lump-sum fee per year per class' },
                      { id: 'component-based', name: 'Component-Based', desc: 'Multiple fee heads with individual amounts' },
                      { id: 'term-wise', name: 'Term-Wise', desc: 'Split by terms (Term 1, Term 2, etc.)' },
                    ].map(t => (
                      <button key={t.id} onClick={() => !structureLocked && setFeeTemplate(t.id)} disabled={structureLocked}
                        className={`p-3 rounded-xl text-left border-2 transition-all ${structureLocked ? 'opacity-60 cursor-not-allowed' : ''} ${feeTemplate === t.id ? `${theme.primary} text-white border-transparent` : `${theme.secondaryBg} ${theme.border} ${theme.highlight}`}`}>
                        <p className="text-xs font-bold">{t.name}</p>
                        <p className={`text-[10px] mt-1 ${feeTemplate === t.id ? 'text-white/80' : theme.iconColor}`}>{t.desc}</p>
                      </button>
                    ))}
                  </div>
                </SectionCard>
              </div>

              {/* Fee Receipt Template — moved from Reports, enhanced with multiple templates */}
              <SectionCard title="Fee Receipt Template" subtitle="Choose, customize, and preview fee receipt layouts" theme={theme}>
                <div className="mb-4">
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Select Template</p>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'standard', name: 'Standard', desc: 'Classic school receipt with header, items, and footer' },
                      { id: 'compact', name: 'Compact', desc: 'Single-page minimal receipt for quick printing' },
                      { id: 'detailed', name: 'Detailed GST', desc: 'Full receipt with HSN/SAC codes and GST breakdown' },
                    ].map(tpl => (
                      <button key={tpl.id} onClick={() => setSelectedReceiptTemplate(tpl.id)}
                        className={`p-3 rounded-xl text-left border-2 transition-all ${selectedReceiptTemplate === tpl.id ? `${theme.primary} text-white border-transparent` : `${theme.secondaryBg} ${theme.border} ${theme.highlight}`}`}>
                        <div className={`w-full h-16 rounded-lg mb-2 flex items-center justify-center text-lg ${selectedReceiptTemplate === tpl.id ? 'bg-white/20' : theme.accentBg}`}>
                          <FileText size={24} className={selectedReceiptTemplate === tpl.id ? 'text-white/70' : theme.iconColor} />
                        </div>
                        <p className="text-xs font-bold">{tpl.name}</p>
                        <p className={`text-[10px] mt-0.5 ${selectedReceiptTemplate === tpl.id ? 'text-white/80' : theme.iconColor}`}>{tpl.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <p className={`text-[10px] font-bold ${theme.iconColor}`}>Template Options</p>
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
            </div>
          )}

          {/* ═══ Settings > Fee Estimation ═══ */}
          {settingsTab === 'estimation' && (
            <div className="space-y-4">
              {/* Fee Estimation Calculator */}
              <SectionCard title="Fee Estimation Calculator" subtitle="Parents see estimated annual fee during enquiry/admission" theme={theme}>
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

          {/* ═══ Settings > Payment Config ═══ */}
          {settingsTab === 'payment-config' && (
            <div className="space-y-4">
              {/* Payment Features */}
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
                  {payToggles['Convenience Fee'] && (
                    <div className="ml-4 mt-1">
                      <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Convenience Fee Amount ({'\u20B9'})</p>
                      <InputField value={convenienceFeeAmt} onChange={setConvenienceFeeAmt} theme={theme} type="number" />
                    </div>
                  )}
                </div>
              </SectionCard>

              {/* Payment Links */}
              <SectionCard title="Payment Links" subtitle="Unique payment link per student per invoice" theme={theme}>
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

          {/* ═══ Settings > Import ═══ */}
          {settingsTab === 'import' && (
            <div className="space-y-4">
              <SectionCard title="Bulk Import" subtitle="Import data from Excel templates" theme={theme}>
                <BulkImportWizard entityName="Fee Structure" templateFields={['Fee Head', 'Class', 'Amount', 'Due Date', 'Concession Type']} sampleData={[['Tuition Fee', 'Grade 5', '3600', '2026-04-10', 'None']]} theme={theme} />
              </SectionCard>
            </div>
          )}

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
