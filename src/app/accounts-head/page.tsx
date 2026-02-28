'use client';

import React, { useState } from 'react';
import BlueprintLayout from '@/components/BlueprintLayout';
import { StatCard, TabBar, StatusBadge, SearchBar, DataTable, Toggle } from '@/components/shared';
import StakeholderProfile from '@/components/StakeholderProfile';
import TaskTrackerPanel from '@/components/TaskTrackerPanel';
import { ChatsView } from '@/components/ChatModule';
import SupportModule from '@/components/SupportModule';
import YourInputsModule from '@/components/YourInputsModule';
import { type TeamMember } from '@/lib/auth';
import { type Theme } from '@/lib/themes';
import {
  Home, Banknote, CreditCard, Receipt, Users, FileText, BarChart3, Settings,
  Search, Plus, Eye, Download, Filter, Check, X, Calendar,
  DollarSign, TrendingUp, TrendingDown, AlertTriangle, ArrowRight,
  Wallet, Building2, ChevronDown, Percent, Clock, Hash, Printer, User, MessageSquare, Mail, Megaphone,
  PanelLeftClose, PanelLeftOpen, Headphones, ClipboardCheck,
  Info, RefreshCw, Smartphone, Camera, Star, ShieldCheck, Undo2, BookOpen, Package, Coins
} from 'lucide-react';

// ─── INFO TOOLTIP HELPER ────────────────────────────────
function InfoTip({ text }: { text: string }) {
  return <span title={text} className="inline-flex items-center ml-1 cursor-help shrink-0"><Info size={14} className="text-slate-400" /></span>;
}

// ─── MOCK DATA ────────────────────────────────────────
const feeCollections = [
  { id: 'RCP-001', student: 'Aarav Patel', class: '10-A', amount: '\u20B97,700', mode: 'Online', date: '10 Feb', status: 'Paid', receipt: 'R-2026-001' },
  { id: 'RCP-002', student: 'Zara Khan', class: '8-B', amount: '\u20B96,500', mode: 'Cash', date: '09 Feb', status: 'Paid', receipt: 'R-2026-002' },
  { id: 'RCP-003', student: 'Arjun Singh', class: '10-A', amount: '\u20B97,700', mode: '-', date: '-', status: 'Overdue', receipt: '-' },
  { id: 'RCP-004', student: 'Meera Nair', class: '7-C', amount: '\u20B95,800', mode: 'Cheque', date: '08 Feb', status: 'Paid', receipt: 'R-2026-004' },
  { id: 'RCP-005', student: 'Riya Sharma', class: '5-A', amount: '\u20B95,000', mode: '-', date: '-', status: 'Pending', receipt: '-' },
  { id: 'RCP-006', student: 'Rohan Gupta', class: '3-B', amount: '\u20B95,000', mode: 'UPI', date: '07 Feb', status: 'Paid', receipt: 'R-2026-006' },
  { id: 'RCP-007', student: 'Ananya Reddy', class: '6-A', amount: '\u20B95,800', mode: '-', date: '-', status: 'Pending', receipt: '-' },
  { id: 'RCP-008', student: 'Dev Mehta', class: '9-B', amount: '\u20B96,500', mode: 'NEFT', date: '05 Feb', status: 'Paid', receipt: 'R-2026-008' },
];

const concessions = [
  { student: 'Kavya Desai', class: '4-A', type: 'Sibling Discount', amount: '\u20B91,500', percent: '10%', approved: 'School Admin', status: 'Active' },
  { student: 'Ravi Kumar', class: '7-B', type: 'EWS / RTE', amount: '\u20B96,500', percent: '100%', approved: 'Trust', status: 'Active' },
  { student: 'Prachi Shah', class: '9-A', type: 'Merit Scholarship', amount: '\u20B93,750', percent: '25%', approved: 'Principal', status: 'Active' },
  { student: 'Mohammed Ali', class: '5-B', type: 'Staff Child', amount: '\u20B97,700', percent: '100%', approved: 'HR', status: 'Active' },
  { student: 'Sneha Patel', class: '2-A', type: 'Single Parent', amount: '\u20B95,000', percent: 'Fixed', approved: 'Trust', status: 'Active' },
];

const expenses = [
  { id: 'EXP-001', category: 'Salary', desc: 'January Staff Salary', amount: '\u20B98,20,000', date: '01 Feb', vendor: 'Payroll', status: 'Paid' },
  { id: 'EXP-002', category: 'Utilities', desc: 'Electricity Bill - Jan', amount: '\u20B945,000', date: '05 Feb', vendor: 'UGVCL', status: 'Paid' },
  { id: 'EXP-003', category: 'Maintenance', desc: 'Plumbing Repair (Block A)', amount: '\u20B912,500', date: '08 Feb', vendor: 'City Plumbers', status: 'Paid' },
  { id: 'EXP-004', category: 'Stationery', desc: 'Exam Paper & Printing', amount: '\u20B928,000', date: '10 Feb', vendor: 'Shree Traders', status: 'Pending' },
  { id: 'EXP-005', category: 'Transport', desc: 'Diesel - Feb (5 buses)', amount: '\u20B91,10,000', date: '12 Feb', vendor: 'Indian Oil', status: 'Pending' },
  { id: 'EXP-006', category: 'Lab Equipment', desc: 'Physics Lab Instruments', amount: '\u20B965,000', date: '06 Feb', vendor: 'Lab India', status: 'Approved' },
];

const salaryBreakdown = [
  { dept: 'Administration', headcount: 12, gross: '\u20B91,10,000', deductions: '\u20B914,000', net: '\u20B996,000' },
  { dept: 'Teaching-Primary', headcount: 22, gross: '\u20B92,40,000', deductions: '\u20B930,000', net: '\u20B92,10,000' },
  { dept: 'Teaching-Secondary', headcount: 24, gross: '\u20B92,80,000', deductions: '\u20B935,000', net: '\u20B92,45,000' },
  { dept: 'Teaching-Senior', headcount: 22, gross: '\u20B92,90,000', deductions: '\u20B936,000', net: '\u20B92,54,000' },
  { dept: 'Accounts', headcount: 6, gross: '\u20B952,000', deductions: '\u20B96,500', net: '\u20B945,500' },
  { dept: 'IT', headcount: 4, gross: '\u20B938,000', deductions: '\u20B94,500', net: '\u20B933,500' },
  { dept: 'Transport', headcount: 18, gross: '\u20B91,08,000', deductions: '\u20B913,000', net: '\u20B995,000' },
  { dept: 'Housekeeping', headcount: 10, gross: '\u20B942,000', deductions: '\u20B95,000', net: '\u20B937,000' },
  { dept: 'Security', headcount: 12, gross: '\u20B960,000', deductions: '\u20B97,000', net: '\u20B953,000' },
  { dept: 'Library', headcount: 4, gross: '\u20B932,000', deductions: '\u20B94,000', net: '\u20B928,000' },
  { dept: 'Lab', headcount: 8, gross: '\u20B956,000', deductions: '\u20B97,000', net: '\u20B949,000' },
];

const bankReconciliation = [
  { date: '10 Feb', description: 'Fee Collection - Online', credit: '\u20B92,45,000', debit: '-', balance: '\u20B918,45,000' },
  { date: '09 Feb', description: 'Vendor Payment - Utilities', credit: '-', debit: '\u20B945,000', balance: '\u20B916,00,000' },
  { date: '08 Feb', description: 'Fee Collection - Cash Deposit', credit: '\u20B91,80,000', debit: '-', balance: '\u20B916,45,000' },
  { date: '07 Feb', description: 'Salary Payout - January', credit: '-', debit: '\u20B98,20,000', balance: '\u20B914,65,000' },
  { date: '06 Feb', description: 'Fee Collection - Cheque', credit: '\u20B995,000', debit: '-', balance: '\u20B922,85,000' },
  { date: '05 Feb', description: 'Misc Expenses', credit: '-', debit: '\u20B932,500', balance: '\u20B921,90,000' },
];

// ─── NEW MOCK DATA ─────────────────────────────────────

const employeeFees = [
  { id: 'EF-001', name: 'Rajesh Kumar', dept: 'Teaching', item: 'Canteen (Feb)', amount: '\u20B92,500', mode: 'Salary Deduct', date: '01 Feb', status: 'Paid' },
  { id: 'EF-002', name: 'Sunita Devi', dept: 'Admin', item: 'Transport (Feb)', amount: '\u20B91,200', mode: 'Cash', date: '03 Feb', status: 'Paid' },
  { id: 'EF-003', name: 'Vikram Singh', dept: 'Security', item: 'Uniform', amount: '\u20B93,500', mode: '-', date: '-', status: 'Pending' },
  { id: 'EF-004', name: 'Priya Patel', dept: 'Teaching', item: 'Canteen (Feb)', amount: '\u20B92,500', mode: 'UPI', date: '05 Feb', status: 'Paid' },
];

const guestFees = [
  { id: 'GF-001', name: 'Mr. Sharma (Parent)', event: 'Annual Day Ticket', amount: '\u20B9500', mode: 'Cash', date: '08 Feb', receipt: 'GR-001' },
  { id: 'GF-002', name: 'Rotary Club', event: 'Donation', amount: '\u20B925,000', mode: 'Cheque', date: '06 Feb', receipt: 'GR-002' },
  { id: 'GF-003', name: 'Mrs. Mehta (Alumni)', event: 'Sports Day Ticket', amount: '\u20B9300', mode: 'UPI', date: '10 Feb', receipt: 'GR-003' },
];

const refundRequests = [
  { student: 'Ankit Verma', class: '8-A', amount: '\u20B97,700', reason: 'Withdrawal', date: '08 Feb', status: 'Pending' },
  { student: 'Sanya Joshi', class: '6-B', amount: '\u20B93,200', reason: 'Overpayment', date: '06 Feb', status: 'Pending' },
  { student: 'Rahul Desai', class: '10-A', amount: '\u20B97,700', reason: 'TC Issued', date: '04 Feb', status: 'Approved' },
  { student: 'Neha Gupta', class: '4-C', amount: '\u20B95,000', reason: 'Duplicate Payment', date: '02 Feb', status: 'Processed' },
];

const processedRefunds = [
  { student: 'Neha Gupta', amount: '\u20B95,000', reason: 'Duplicate Payment', mode: 'Bank Transfer', date: '03 Feb', refBy: 'Mr. Patel' },
  { student: 'Kunal Shah', amount: '\u20B92,800', reason: 'Overpayment', mode: 'Adjust next term', date: '28 Jan', refBy: 'Mr. Patel' },
];

const chequeRegister = [
  { student: 'Meera Nair', chequeNo: 'CHQ-445521', bank: 'SBI', amount: '\u20B95,800', date: '15 Feb', status: 'Pending' },
  { student: 'Amit Patel', chequeNo: 'CHQ-112233', bank: 'HDFC', amount: '\u20B97,700', date: '18 Feb', status: 'Pending' },
  { student: 'Kavita Rao', chequeNo: 'CHQ-998877', bank: 'ICICI', amount: '\u20B96,500', date: '10 Feb', status: 'Cleared' },
  { student: 'Dev Mehta', chequeNo: 'CHQ-556644', bank: 'BOB', amount: '\u20B96,500', date: '08 Feb', status: 'Cleared' },
  { student: 'Priya Verma', chequeNo: 'CHQ-334455', bank: 'Axis', amount: '\u20B95,000', date: '05 Feb', status: 'Bounced' },
  { student: 'Rajan Kumar', chequeNo: 'CHQ-667788', bank: 'PNB', amount: '\u20B97,700', date: '03 Feb', status: 'Bounced' },
];

const vendorDirectory = [
  { name: 'Shree Traders', category: 'Stationery', contact: '98765-43210', pan: 'ABCDE1234F', gst: '24ABCDE1234F1Z5', totalPOs: 12, outstanding: '\u20B928,000', rating: 4 },
  { name: 'Metro Furniture', category: 'Furniture', contact: '99887-65432', pan: 'FGHIJ5678K', gst: '24FGHIJ5678K1Z3', totalPOs: 5, outstanding: '\u20B90', rating: 5 },
  { name: 'TechVista Solutions', category: 'IT', contact: '87654-32109', pan: 'KLMNO9012P', gst: '24KLMNO9012P1Z1', totalPOs: 8, outstanding: '\u20B945,000', rating: 4 },
  { name: 'Fresh Bites Catering', category: 'Catering', contact: '76543-21098', pan: 'PQRST3456Q', gst: '24PQRST3456Q1Z9', totalPOs: 24, outstanding: '\u20B912,000', rating: 3 },
  { name: 'City Plumbers', category: 'Maintenance', contact: '65432-10987', pan: 'UVWXY7890R', gst: '-', totalPOs: 6, outstanding: '\u20B90', rating: 4 },
  { name: 'Reliable Transport', category: 'Transport', contact: '54321-09876', pan: 'ZABCD1234S', gst: '24ZABCD1234S1Z7', totalPOs: 15, outstanding: '\u20B91,10,000', rating: 5 },
];

const vendorPOHistory: Record<string, { po: string; date: string; amount: string; invoiceMatch: string; payStatus: string }[]> = {
  'Shree Traders': [
    { po: 'PO-2026-048', date: '10 Feb', amount: '\u20B928,000', invoiceMatch: 'Matched', payStatus: 'Pending' },
    { po: 'PO-2026-031', date: '22 Jan', amount: '\u20B915,000', invoiceMatch: 'Matched', payStatus: 'Paid' },
    { po: 'PO-2025-298', date: '10 Dec', amount: '\u20B922,000', invoiceMatch: 'Matched', payStatus: 'Paid' },
  ],
  'TechVista Solutions': [
    { po: 'PO-2026-045', date: '06 Feb', amount: '\u20B965,000', invoiceMatch: 'Pending', payStatus: 'Approved' },
    { po: 'PO-2026-022', date: '15 Jan', amount: '\u20B932,000', invoiceMatch: 'Matched', payStatus: 'Paid' },
    { po: 'PO-2025-280', date: '01 Dec', amount: '\u20B918,000', invoiceMatch: 'Matched', payStatus: 'Paid' },
  ],
};

const pettyCashVouchers = [
  { date: '10 Feb', desc: 'Whiteboard markers (12 pack)', amount: '\u20B9480', category: 'Stationery', receipt: true, approvedBy: 'Mr. Patel' },
  { date: '10 Feb', desc: 'Auto fare - Bank visit', amount: '\u20B9350', category: 'Travel', receipt: true, approvedBy: 'Mr. Patel' },
  { date: '09 Feb', desc: 'Drinking water cans (5)', amount: '\u20B9750', category: 'Supplies', receipt: true, approvedBy: 'Mrs. Shah' },
  { date: '09 Feb', desc: 'Courier charges - Report cards', amount: '\u20B9520', category: 'Postage', receipt: false, approvedBy: 'Mr. Patel' },
  { date: '08 Feb', desc: 'Emergency plumbing repair', amount: '\u20B91,350', category: 'Maintenance', receipt: true, approvedBy: 'Mrs. Shah' },
];

const epfData = [
  { name: 'Rajesh Kumar', basic: '\u20B925,000', empPF: '\u20B93,000', employerPF: '\u20B93,000', total: '\u20B96,000', uan: '100987654321' },
  { name: 'Sunita Devi', basic: '\u20B922,000', empPF: '\u20B92,640', employerPF: '\u20B92,640', total: '\u20B95,280', uan: '100987654322' },
  { name: 'Vikram Singh', basic: '\u20B918,000', empPF: '\u20B92,160', employerPF: '\u20B92,160', total: '\u20B94,320', uan: '100987654323' },
  { name: 'Priya Patel', basic: '\u20B928,000', empPF: '\u20B93,360', employerPF: '\u20B93,360', total: '\u20B96,720', uan: '100987654324' },
  { name: 'Amit Sharma', basic: '\u20B930,000', empPF: '\u20B93,600', employerPF: '\u20B93,600', total: '\u20B97,200', uan: '100987654325' },
  { name: 'Kavita Rao', basic: '\u20B920,000', empPF: '\u20B92,400', employerPF: '\u20B92,400', total: '\u20B94,800', uan: '100987654326' },
  { name: 'Deepak Joshi', basic: '\u20B935,000', empPF: '\u20B94,200', employerPF: '\u20B94,200', total: '\u20B98,400', uan: '100987654327' },
  { name: 'Neha Gupta', basic: '\u20B922,000', empPF: '\u20B92,640', employerPF: '\u20B92,640', total: '\u20B95,280', uan: '100987654328' },
];

const taxDeclarations = [
  { name: 'Rajesh Kumar', grossAnnual: '\u20B96,00,000', sec80C: '\u20B91,50,000', sec80D: '\u20B925,000', hra: '\u20B91,20,000', taxable: '\u20B93,05,000', monthlyTDS: '\u20B9625' },
  { name: 'Priya Patel', grossAnnual: '\u20B97,20,000', sec80C: '\u20B91,50,000', sec80D: '\u20B950,000', hra: '\u20B91,44,000', taxable: '\u20B93,76,000', monthlyTDS: '\u20B91,467' },
  { name: 'Amit Sharma', grossAnnual: '\u20B98,40,000', sec80C: '\u20B91,50,000', sec80D: '\u20B925,000', hra: '\u20B91,68,000', taxable: '\u20B94,97,000', monthlyTDS: '\u20B92,475' },
  { name: 'Deepak Joshi', grossAnnual: '\u20B99,60,000', sec80C: '\u20B91,50,000', sec80D: '\u20B950,000', hra: '\u20B91,92,000', taxable: '\u20B95,68,000', monthlyTDS: '\u20B93,900' },
  { name: 'Kavita Rao', grossAnnual: '\u20B95,40,000', sec80C: '\u20B91,00,000', sec80D: '\u20B925,000', hra: '\u20B91,08,000', taxable: '\u20B93,07,000', monthlyTDS: '\u20B9650' },
];

// ─── MODULES SIDEBAR ──────────────────────────────────
const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'collections', label: 'Fee Collection', icon: Banknote },
  { id: 'concessions', label: 'Concessions', icon: Percent },
  { id: 'refunds', label: 'Refunds', icon: Undo2 },
  { id: 'expenses', label: 'Expenses', icon: CreditCard },
  { id: 'salary', label: 'Salary Processing', icon: Users },
  { id: 'epf', label: 'EPF / PF', icon: ShieldCheck },
  { id: 'tax', label: 'Tax Declarations', icon: FileText },
  { id: 'vendors', label: 'Vendors', icon: Package },
  { id: 'petty-cash', label: 'Petty Cash', icon: Coins },
  { id: 'bank', label: 'Bank Reconciliation', icon: Building2 },
  { id: 'reports', label: 'Financial Reports', icon: BarChart3 },
  { id: 'receipts', label: 'Receipts', icon: Receipt },
  { id: 'communication', label: 'Communication', icon: MessageSquare },
  { id: 'your-inputs', label: 'Your Inputs', icon: ClipboardCheck },
  { id: 'support', label: 'Support', icon: Headphones },
];

// ─── DASHBOARD VIEW ────────────────────────────────────
function DashboardView({ theme, setActiveModule }: { theme: Theme; setActiveModule: (m: string) => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-xl font-bold ${theme.highlight}`}>Accounts Dashboard</h2>
          <p className={`text-xs ${theme.iconColor} mt-1`}>Financial overview &mdash; February 2026</p>
        </div>
        <button onClick={() => setActiveModule('profile')} title="My Profile" className={`w-9 h-9 rounded-full ${theme.primary} text-white flex items-center justify-center text-xs font-bold hover:opacity-90 transition-opacity`}>RP</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Banknote} label="Collected (Feb)" value={'\u20B912.4L'} color="bg-emerald-500" sub={'+\u20B92.4L today'} theme={theme} />
        <StatCard icon={AlertTriangle} label="Pending Fees" value={'\u20B98.2L'} color="bg-amber-500" sub="124 students" theme={theme} />
        <StatCard icon={TrendingDown} label="Expenses (Feb)" value={'\u20B99.8L'} color="bg-red-500" theme={theme} />
        <StatCard icon={Wallet} label="Bank Balance" value={'\u20B918.45L'} color="bg-blue-500" theme={theme} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Collection by Mode */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Collection by Mode (Today)</h3>
          <div className="space-y-2">
            {[
              { mode: 'Online / UPI', amount: '\u20B91,45,000', count: 18, color: 'bg-blue-500' },
              { mode: 'Cash', amount: '\u20B952,000', count: 8, color: 'bg-emerald-500' },
              { mode: 'Cheque / NEFT', amount: '\u20B943,000', count: 4, color: 'bg-purple-500' },
            ].map(m => (
              <div key={m.mode} className={`flex items-center gap-3 p-3 rounded-xl ${theme.secondaryBg}`}>
                <div className={`w-8 h-8 rounded-lg ${m.color} text-white flex items-center justify-center text-xs font-bold`}>{m.count}</div>
                <div className="flex-1">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{m.mode}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{m.count} transactions</p>
                </div>
                <span className={`text-xs font-bold ${theme.highlight}`}>{m.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Alerts */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Pending Actions</h3>
          <div className="space-y-2">
            {[
              { label: 'Overdue fee reminders to send', count: 28, action: 'collections' },
              { label: 'Refund requests to review', count: 2, action: 'refunds' },
              { label: 'Concession requests to review', count: 1, action: 'concessions' },
              { label: 'Vendor payments pending', count: 2, action: 'expenses' },
              { label: 'Salary processing for Feb', count: 1, action: 'salary' },
              { label: 'Cheques to deposit', count: 5, action: 'collections' },
              { label: 'Bounced cheques to follow-up', count: 2, action: 'collections' },
            ].map(a => (
              <button key={a.label} onClick={() => setActiveModule(a.action)} className={`w-full flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} transition-all`}>
                <span className={`text-xs ${theme.highlight}`}>{a.label}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${a.count > 10 ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>{a.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Fee Collection Trend */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Monthly Collection Trend</h3>
          <div className="space-y-2">
            {[
              { month: 'Feb (MTD)', amount: '\u20B912.4L', target: '\u20B918L', percent: 69 },
              { month: 'January', amount: '\u20B916.8L', target: '\u20B918L', percent: 93 },
              { month: 'December', amount: '\u20B914.2L', target: '\u20B915L', percent: 95 },
              { month: 'November', amount: '\u20B915.5L', target: '\u20B916L', percent: 97 },
            ].map(m => (
              <div key={m.month}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] ${theme.iconColor}`}>{m.month}</span>
                  <span className={`text-[10px] font-bold ${m.percent >= 90 ? 'text-emerald-600' : m.percent >= 70 ? 'text-amber-600' : 'text-red-600'}`}>{m.amount} / {m.target}</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
                  <div className={`h-full rounded-full ${m.percent >= 90 ? 'bg-emerald-500' : m.percent >= 70 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${m.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Collections */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className={`text-sm font-bold ${theme.highlight}`}>Recent Fee Collections</h3>
          <button onClick={() => setActiveModule('collections')} className={`text-xs ${theme.primaryText} font-bold`}>View All &rarr;</button>
        </div>
        <DataTable
          headers={['Student', 'Class', 'Amount', 'Mode', 'Date', 'Status']}
          rows={feeCollections.slice(0, 5).map(f => [
            <span key="n" className={`text-xs font-bold ${theme.highlight}`}>{f.student}</span>,
            <span key="c" className={`text-xs ${theme.iconColor}`}>{f.class}</span>,
            <span key="a" className={`text-xs font-bold ${theme.highlight}`}>{f.amount}</span>,
            <span key="m" className={`text-xs ${theme.iconColor}`}>{f.mode}</span>,
            <span key="d" className={`text-xs ${theme.iconColor}`}>{f.date}</span>,
            <StatusBadge key="s" status={f.status} theme={theme} />,
          ])}
          theme={theme}
        />
      </div>

      {/* Task Tracker */}
      <TaskTrackerPanel theme={theme} role="accounts-head" />
    </div>
  );
}

// ─── FEE COLLECTION VIEW (with Employee/Guest tabs, Cheque Mgmt, Auto-Discounts) ───
function CollectionsView({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All');
  const [feeType, setFeeType] = useState<'Student' | 'Employee' | 'Guest'>('Student');
  const [chequeSection, setChequeSection] = useState(false);
  const filtered = tab === 'All' ? feeCollections : feeCollections.filter(f => f.status === tab);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-bold ${theme.highlight}`}>Fee Collection</h2>
          <p className={`text-xs ${theme.iconColor}`}>{feeCollections.length} records</p>
        </div>
        <div className="flex gap-2">
          <button className={`flex items-center gap-2 px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>
            <Plus size={14} /> Record Payment
          </button>
          <button className={`flex items-center gap-2 px-3 py-2 ${theme.secondaryBg} rounded-xl text-xs font-medium ${theme.highlight}`}>
            <Download size={12} /> Export
          </button>
        </div>
      </div>

      {/* Feature 1: Employee & Guest Fee Collection toggle */}
      <div className={`${theme.cardBg} rounded-xl border ${theme.border} p-3`}>
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs font-bold ${theme.highlight}`}>Fee Collection Type</span>
          <InfoTip text="Collect fees from employees and guests, not just students" />
        </div>
        <div className={`flex gap-1 p-1 ${theme.secondaryBg} rounded-xl`}>
          {(['Student', 'Employee', 'Guest'] as const).map(t => (
            <button key={t} onClick={() => setFeeType(t)} className={`px-4 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-all ${feeType === t ? `${theme.cardBg} ${theme.highlight} shadow-sm` : theme.iconColor}`}>
              {t === 'Student' ? 'Student Fees' : t === 'Employee' ? 'Employee Fees' : 'Guest Fees'}
            </button>
          ))}
        </div>
      </div>

      {/* Feature 16: Auto-Applied Discounts banner */}
      {feeType === 'Student' && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-start gap-2">
          <Check size={16} className="text-emerald-600 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-bold text-emerald-800">Auto-Applied Discounts</p>
            <p className="text-[10px] text-emerald-700 mt-0.5">3 students in this batch have pre-configured concessions that will auto-apply: <span className="font-bold">Sibling (2)</span>, <span className="font-bold">EWS (1)</span></p>
          </div>
        </div>
      )}

      {feeType === 'Student' && (
        <>
          <div className="flex gap-3 items-center">
            <div className="flex-1"><SearchBar placeholder="Search by student name or receipt..." theme={theme} icon={Search} /></div>
            <TabBar tabs={['All', 'Paid', 'Pending', 'Overdue']} active={tab} onChange={setTab} theme={theme} />
          </div>
          <p className="text-[10px] text-amber-600 mb-2">Fee template: Component-based &middot; Billing: Monthly &middot; 7 active fee heads &mdash; configured by SSA</p>

          <DataTable
            headers={['Student', 'Class', 'Amount', 'Mode', 'Date', 'Receipt', 'Status']}
            rows={filtered.map(f => [
              <span key="n" className={`text-xs font-bold ${theme.highlight}`}>{f.student}</span>,
              <span key="c" className={`text-xs ${theme.iconColor}`}>{f.class}</span>,
              <span key="a" className={`text-xs font-bold ${theme.highlight}`}>{f.amount}</span>,
              <span key="m" className={`text-xs ${theme.iconColor}`}>{f.mode}</span>,
              <span key="d" className={`text-xs ${theme.iconColor}`}>{f.date}</span>,
              f.receipt !== '-' ? (
                <button key="r" className={`text-xs ${theme.primaryText} font-bold`}>{f.receipt}</button>
              ) : (
                <span key="r" className={`text-xs ${theme.iconColor}`}>-</span>
              ),
              <StatusBadge key="s" status={f.status} theme={theme} />,
            ])}
            theme={theme}
          />
        </>
      )}

      {feeType === 'Employee' && (
        <>
          <SearchBar placeholder="Search by employee name..." theme={theme} icon={Search} />
          <DataTable
            headers={['ID', 'Employee', 'Dept', 'Item', 'Amount', 'Mode', 'Date', 'Status']}
            rows={employeeFees.map(e => [
              <span key="id" className={`text-xs font-mono ${theme.iconColor}`}>{e.id}</span>,
              <span key="n" className={`text-xs font-bold ${theme.highlight}`}>{e.name}</span>,
              <span key="d" className={`text-xs ${theme.iconColor}`}>{e.dept}</span>,
              <span key="i" className={`text-xs ${theme.highlight}`}>{e.item}</span>,
              <span key="a" className={`text-xs font-bold ${theme.highlight}`}>{e.amount}</span>,
              <span key="m" className={`text-xs ${theme.iconColor}`}>{e.mode}</span>,
              <span key="dt" className={`text-xs ${theme.iconColor}`}>{e.date}</span>,
              <StatusBadge key="s" status={e.status} theme={theme} />,
            ])}
            theme={theme}
          />
        </>
      )}

      {feeType === 'Guest' && (
        <>
          <SearchBar placeholder="Search by guest name or event..." theme={theme} icon={Search} />
          <DataTable
            headers={['ID', 'Guest', 'Event / Purpose', 'Amount', 'Mode', 'Date', 'Receipt']}
            rows={guestFees.map(g => [
              <span key="id" className={`text-xs font-mono ${theme.iconColor}`}>{g.id}</span>,
              <span key="n" className={`text-xs font-bold ${theme.highlight}`}>{g.name}</span>,
              <span key="e" className={`text-xs ${theme.highlight}`}>{g.event}</span>,
              <span key="a" className={`text-xs font-bold ${theme.highlight}`}>{g.amount}</span>,
              <span key="m" className={`text-xs ${theme.iconColor}`}>{g.mode}</span>,
              <span key="d" className={`text-xs ${theme.iconColor}`}>{g.date}</span>,
              <span key="r" className={`text-xs font-mono ${theme.primaryText} font-bold`}>{g.receipt}</span>,
            ])}
            theme={theme}
          />
        </>
      )}

      {/* Feature 3: Cheque Management section */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <button onClick={() => setChequeSection(!chequeSection)} className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Post-Dated Cheque Register</h3>
            <InfoTip text="Track post-dated cheques and auto-handle bounced payments" />
          </div>
          <ChevronDown size={16} className={`${theme.iconColor} transition-transform ${chequeSection ? 'rotate-180' : ''}`} />
        </button>

        {chequeSection && (
          <div className="mt-3 space-y-3">
            <div className="flex items-center justify-between">
              <p className={`text-xs ${theme.iconColor}`}>{chequeRegister.length} cheques tracked</p>
              <button className={`flex items-center gap-2 px-3 py-1.5 ${theme.primary} text-white rounded-lg text-xs font-bold`}>
                <Plus size={12} /> Add Cheque
              </button>
            </div>
            <DataTable
              headers={['Student', 'Cheque #', 'Bank', 'Amount', 'Date', 'Status']}
              rows={chequeRegister.map(c => [
                <span key="n" className={`text-xs font-bold ${theme.highlight}`}>{c.student}</span>,
                <span key="ch" className={`text-xs font-mono ${theme.iconColor}`}>{c.chequeNo}</span>,
                <span key="b" className={`text-xs ${theme.iconColor}`}>{c.bank}</span>,
                <span key="a" className={`text-xs font-bold ${theme.highlight}`}>{c.amount}</span>,
                <span key="d" className={`text-xs ${theme.iconColor}`}>{c.date}</span>,
                <span key="s" className="flex items-center gap-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.status === 'Cleared' ? 'bg-emerald-100 text-emerald-700' : c.status === 'Bounced' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                    {c.status}
                  </span>
                  {c.status === 'Bounced' && (
                    <span className="text-[9px] text-red-600 font-medium">Auto-penalty: {'\u20B9'}500 applied &middot; Parent notified &#x2705;</span>
                  )}
                </span>,
              ])}
              theme={theme}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── REFUNDS VIEW (Feature 2) ─────────────────────────────
function RefundsView({ theme }: { theme: Theme }) {
  const [refundTab, setRefundTab] = useState('Pending');
  const [showRefundModal, setShowRefundModal] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className={`text-lg font-bold ${theme.highlight}`}>Fee Refunds</h2>
          <InfoTip text="Process fee refund requests with multi-level approval" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Undo2} label="Pending Requests" value="2" color="bg-amber-500" theme={theme} />
        <StatCard icon={Check} label="Approved" value="1" color="bg-blue-500" theme={theme} />
        <StatCard icon={Banknote} label="Processed" value="1" color="bg-emerald-500" theme={theme} />
        <StatCard icon={DollarSign} label="Total Refunded (Feb)" value={'\u20B97,800'} color="bg-purple-500" theme={theme} />
      </div>

      <TabBar tabs={['Pending', 'Processed History']} active={refundTab} onChange={setRefundTab} theme={theme} />

      {refundTab === 'Pending' && (
        <DataTable
          headers={['Student', 'Class', 'Amount', 'Reason', 'Requested', 'Status', 'Actions']}
          rows={refundRequests.map(r => [
            <span key="n" className={`text-xs font-bold ${theme.highlight}`}>{r.student}</span>,
            <span key="c" className={`text-xs ${theme.iconColor}`}>{r.class}</span>,
            <span key="a" className={`text-xs font-bold ${theme.highlight}`}>{r.amount}</span>,
            <span key="re" className={`text-xs ${theme.iconColor}`}>{r.reason}</span>,
            <span key="d" className={`text-xs ${theme.iconColor}`}>{r.date}</span>,
            <StatusBadge key="s" status={r.status === 'Processed' ? 'Paid' : r.status} theme={theme} />,
            <div key="act" className="flex gap-1">
              {r.status === 'Pending' && (
                <>
                  <button onClick={() => setShowRefundModal(r.student)} className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-[10px] font-bold">Approve</button>
                  <button className="px-2 py-1 bg-red-100 text-red-700 rounded-lg text-[10px] font-bold">Reject</button>
                </>
              )}
              {r.status === 'Approved' && (
                <button onClick={() => setShowRefundModal(r.student)} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-[10px] font-bold">Process</button>
              )}
              {r.status === 'Processed' && (
                <span className="text-[10px] text-emerald-600 font-bold">Done</span>
              )}
            </div>,
          ])}
          theme={theme}
        />
      )}

      {refundTab === 'Processed History' && (
        <DataTable
          headers={['Student', 'Amount', 'Reason', 'Refund Mode', 'Date', 'Processed By']}
          rows={processedRefunds.map(r => [
            <span key="n" className={`text-xs font-bold ${theme.highlight}`}>{r.student}</span>,
            <span key="a" className={`text-xs font-bold ${theme.highlight}`}>{r.amount}</span>,
            <span key="re" className={`text-xs ${theme.iconColor}`}>{r.reason}</span>,
            <span key="m" className={`text-xs ${theme.iconColor}`}>{r.mode}</span>,
            <span key="d" className={`text-xs ${theme.iconColor}`}>{r.date}</span>,
            <span key="by" className={`text-xs ${theme.iconColor}`}>{r.refBy}</span>,
          ])}
          theme={theme}
        />
      )}

      {/* Refund Processing Modal */}
      {showRefundModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowRefundModal(null)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 w-full max-w-md shadow-xl`} onClick={e => e.stopPropagation()}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-4`}>Process Refund &mdash; {showRefundModal}</h3>
            <div className="space-y-3">
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Refund Mode</label>
                <select className={`w-full px-3 py-2 text-xs rounded-lg border ${theme.border} ${theme.secondaryBg} ${theme.highlight}`}>
                  <option>Bank Transfer</option>
                  <option>Cheque</option>
                  <option>Cash</option>
                  <option>Adjust against next term</option>
                </select>
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Remarks</label>
                <input type="text" placeholder="Add remarks..." className={`w-full px-3 py-2 text-xs rounded-lg border ${theme.border} ${theme.secondaryBg} ${theme.highlight}`} />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button onClick={() => setShowRefundModal(null)} className={`px-4 py-2 ${theme.secondaryBg} rounded-xl text-xs font-bold ${theme.iconColor}`}>Cancel</button>
                <button onClick={() => setShowRefundModal(null)} className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>Confirm Refund</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── CONCESSIONS VIEW ──────────────────────────────────
function ConcessionsView({ theme }: { theme: Theme }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-bold ${theme.highlight}`}>Fee Concessions</h2>
          <p className={`text-xs ${theme.iconColor}`}>Discounts, scholarships &amp; waivers</p>
        </div>
        <button className={`flex items-center gap-2 px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>
          <Plus size={14} /> Add Concession
        </button>
      </div>

      <p className="text-[10px] text-amber-600 mb-2">Concession types per SSA: Sibling 10%, Staff Child 100%, Merit 25%, EWS 100%, Single Parent {'\u20B9'}5000</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Percent} label="Active Concessions" value={concessions.filter(c => c.status === 'Active').length} color="bg-blue-500" theme={theme} />
        <StatCard icon={DollarSign} label="Total Waived" value={'\u20B918,000'} color="bg-amber-500" sub="This month" theme={theme} />
        <StatCard icon={Users} label="RTE Students" value="32" color="bg-emerald-500" sub="25% quota" theme={theme} />
        <StatCard icon={AlertTriangle} label="Pending Approval" value={concessions.filter(c => c.status === 'Pending').length} color="bg-red-500" theme={theme} />
      </div>

      <DataTable
        headers={['Student', 'Class', 'Type', 'Amount', 'Discount', 'Approved By', 'Status']}
        rows={concessions.map(c => [
          <span key="n" className={`text-xs font-bold ${theme.highlight}`}>{c.student}</span>,
          <span key="cl" className={`text-xs ${theme.iconColor}`}>{c.class}</span>,
          <span key="t" className={`text-xs font-bold ${theme.primaryText}`}>{c.type}</span>,
          <span key="a" className={`text-xs font-bold ${theme.highlight}`}>{c.amount}</span>,
          <span key="p" className={`text-xs ${theme.iconColor}`}>{c.percent}</span>,
          <span key="ap" className={`text-xs ${theme.iconColor}`}>{c.approved}</span>,
          <StatusBadge key="s" status={c.status === 'Active' ? 'Active' : 'Pending'} theme={theme} />,
        ])}
        theme={theme}
      />
    </div>
  );
}

// ─── EXPENSES VIEW ─────────────────────────────────────
function ExpensesView({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All');
  const filtered = tab === 'All' ? expenses : expenses.filter(e => e.status === tab);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-bold ${theme.highlight}`}>Expenses</h2>
          <p className={`text-xs ${theme.iconColor}`}>Track all school expenditures</p>
        </div>
        <button className={`flex items-center gap-2 px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>
          <Plus size={14} /> Record Expense
        </button>
      </div>

      <TabBar tabs={['All', 'Paid', 'Pending', 'Approved']} active={tab} onChange={setTab} theme={theme} />

      <DataTable
        headers={['ID', 'Category', 'Description', 'Vendor', 'Amount', 'Date', 'Status']}
        rows={filtered.map(e => [
          <span key="id" className={`text-xs font-mono ${theme.iconColor}`}>{e.id}</span>,
          <span key="cat" className={`text-xs font-bold ${theme.primaryText}`}>{e.category}</span>,
          <span key="desc" className={`text-xs ${theme.highlight}`}>{e.desc}</span>,
          <span key="v" className={`text-xs ${theme.iconColor}`}>{e.vendor}</span>,
          <span key="a" className={`text-xs font-bold ${theme.highlight}`}>{e.amount}</span>,
          <span key="d" className={`text-xs ${theme.iconColor}`}>{e.date}</span>,
          <StatusBadge key="s" status={e.status === 'Paid' ? 'Paid' : e.status} theme={theme} />,
        ])}
        theme={theme}
      />
    </div>
  );
}

// ─── SALARY PROCESSING VIEW ────────────────────────────
function SalaryView({ theme }: { theme: Theme }) {
  const [month] = useState('February 2026');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-bold ${theme.highlight}`}>Salary Processing</h2>
          <p className={`text-xs ${theme.iconColor}`}>{month}</p>
        </div>
        <div className="flex gap-2">
          <button className={`flex items-center gap-2 px-3 py-2 ${theme.secondaryBg} rounded-xl text-xs font-medium ${theme.highlight}`}>
            <Calendar size={12} /> {month}
          </button>
          <button className={`flex items-center gap-2 px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>
            <DollarSign size={14} /> Process Salary
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Staff" value="86" color="bg-blue-500" theme={theme} />
        <StatCard icon={DollarSign} label="Gross Salary" value={'\u20B98,20,000'} color="bg-emerald-500" theme={theme} />
        <StatCard icon={TrendingDown} label="Deductions" value={'\u20B91,01,500'} color="bg-amber-500" theme={theme} />
        <StatCard icon={Wallet} label="Net Payable" value={'\u20B97,18,500'} color="bg-purple-500" theme={theme} />
      </div>

      <DataTable
        headers={['Department', 'Staff', 'Gross', 'Deductions', 'Net Payable']}
        rows={salaryBreakdown.map(s => [
          <span key="d" className={`text-xs font-bold ${theme.highlight}`}>{s.dept}</span>,
          <span key="h" className={`text-xs ${theme.highlight}`}>{s.headcount}</span>,
          <span key="g" className={`text-xs ${theme.highlight}`}>{s.gross}</span>,
          <span key="de" className="text-xs text-red-500">{s.deductions}</span>,
          <span key="n" className={`text-xs font-bold ${theme.highlight}`}>{s.net}</span>,
        ])}
        theme={theme}
      />

      {/* Salary Status */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Processing Status</h3>
        <div className="flex items-center gap-6">
          {['Generate Payslips', 'Review & Approve', 'Bank Transfer', 'Complete'].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${i === 0 ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.iconColor}`}`}>
                {i + 1}
              </div>
              <span className={`text-[10px] font-bold ${i === 0 ? theme.highlight : theme.iconColor}`}>{step}</span>
              {i < 3 && <ArrowRight size={10} className={theme.iconColor} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── EPF / PF MODULE (Feature 14) ──────────────────────
function EPFView({ theme }: { theme: Theme }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className={`text-lg font-bold ${theme.highlight}`}>EPF / Provident Fund</h2>
          <InfoTip text="Calculate PF contributions and generate ECR for EPFO filing" />
        </div>
        <div className="flex gap-2">
          <button className={`flex items-center gap-2 px-3 py-2 ${theme.secondaryBg} rounded-xl text-xs font-bold ${theme.highlight}`}>
            <Download size={12} /> Download PF Challan
          </button>
          <button className={`flex items-center gap-2 px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>
            <FileText size={14} /> Generate ECR File
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard icon={Users} label="PF Members" value="8" color="bg-blue-500" theme={theme} />
        <StatCard icon={DollarSign} label="Employee PF (Total)" value={'\u20B92,40,000'} color="bg-emerald-500" sub="12% of Basic" theme={theme} />
        <StatCard icon={Building2} label="Employer PF (Total)" value={'\u20B92,40,000'} color="bg-purple-500" sub="12% of Basic" theme={theme} />
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Monthly PF Summary &mdash; February 2026</h3>
        <DataTable
          headers={['Employee', 'Basic', 'Employee PF (12%)', 'Employer PF (12%)', 'Total', 'UAN']}
          rows={epfData.map(e => [
            <span key="n" className={`text-xs font-bold ${theme.highlight}`}>{e.name}</span>,
            <span key="b" className={`text-xs ${theme.highlight}`}>{e.basic}</span>,
            <span key="ep" className={`text-xs ${theme.iconColor}`}>{e.empPF}</span>,
            <span key="er" className={`text-xs ${theme.iconColor}`}>{e.employerPF}</span>,
            <span key="t" className={`text-xs font-bold ${theme.highlight}`}>{e.total}</span>,
            <span key="u" className={`text-xs font-mono ${theme.iconColor}`}>{e.uan}</span>,
          ])}
          theme={theme}
        />
        <div className={`mt-3 pt-3 border-t ${theme.border} flex items-center justify-between`}>
          <span className={`text-xs font-bold ${theme.highlight}`}>Monthly Total</span>
          <div className="flex gap-6">
            <span className={`text-xs ${theme.iconColor}`}>Employee: <span className="font-bold">{'\u20B9'}2,40,000</span></span>
            <span className={`text-xs ${theme.iconColor}`}>Employer: <span className="font-bold">{'\u20B9'}2,40,000</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TAX DECLARATIONS (Feature 15) ──────────────────────
function TaxDeclarationsView({ theme }: { theme: Theme }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className={`text-lg font-bold ${theme.highlight}`}>Tax Declarations &amp; TDS</h2>
          <InfoTip text="Employee investment declarations and TDS calculation" />
        </div>
        <div className="flex gap-2">
          <button className={`flex items-center gap-2 px-3 py-2 ${theme.secondaryBg} rounded-xl text-xs font-bold ${theme.highlight}`}>
            <Smartphone size={12} /> Collect Declarations
            <InfoTip text="Employees submit declarations via mobile app" />
          </button>
          <button className={`flex items-center gap-2 px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>
            <FileText size={14} /> Generate Form 16
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Declarations Received" value="5" color="bg-blue-500" theme={theme} />
        <StatCard icon={DollarSign} label="Total Monthly TDS" value={'\u20B99,117'} color="bg-amber-500" theme={theme} />
        <StatCard icon={FileText} label="Form 16 Generated" value="0" color="bg-slate-400" sub="FY not closed" theme={theme} />
        <StatCard icon={AlertTriangle} label="Pending Declarations" value="3" color="bg-red-500" theme={theme} />
      </div>

      <DataTable
        headers={['Employee', 'Gross Annual', '80C', '80D', 'HRA', 'Taxable Income', 'Monthly TDS']}
        rows={taxDeclarations.map(t => [
          <span key="n" className={`text-xs font-bold ${theme.highlight}`}>{t.name}</span>,
          <span key="g" className={`text-xs ${theme.highlight}`}>{t.grossAnnual}</span>,
          <span key="c" className={`text-xs ${theme.iconColor}`}>{t.sec80C}</span>,
          <span key="d" className={`text-xs ${theme.iconColor}`}>{t.sec80D}</span>,
          <span key="h" className={`text-xs ${theme.iconColor}`}>{t.hra}</span>,
          <span key="ti" className={`text-xs font-bold ${theme.highlight}`}>{t.taxable}</span>,
          <span key="tds" className="text-xs font-bold text-red-500">{t.monthlyTDS}</span>,
        ])}
        theme={theme}
      />
    </div>
  );
}

// ─── VENDOR DIRECTORY (Feature 11) ──────────────────────
function VendorsView({ theme }: { theme: Theme }) {
  const [expandedVendor, setExpandedVendor] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className={`text-lg font-bold ${theme.highlight}`}>Vendor Directory</h2>
          <InfoTip text="Vendor master with purchase order and payment tracking" />
        </div>
        <button className={`flex items-center gap-2 px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>
          <Plus size={14} /> Add Vendor
        </button>
      </div>

      <SearchBar placeholder="Search vendors by name, category, PAN..." theme={theme} icon={Search} />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard icon={Package} label="Total Vendors" value="6" color="bg-blue-500" theme={theme} />
        <StatCard icon={DollarSign} label="Total Outstanding" value={'\u20B91,95,000'} color="bg-amber-500" theme={theme} />
        <StatCard icon={FileText} label="Active POs" value="70" color="bg-emerald-500" theme={theme} />
      </div>

      <div className="space-y-2">
        {vendorDirectory.map(v => (
          <div key={v.name} className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden`}>
            <button onClick={() => setExpandedVendor(expandedVendor === v.name ? null : v.name)} className={`w-full p-4 flex items-center gap-4 ${theme.buttonHover} transition-all`}>
              <div className={`w-10 h-10 rounded-xl ${theme.secondaryBg} flex items-center justify-center`}>
                <Package size={18} className={theme.primaryText} />
              </div>
              <div className="flex-1 text-left">
                <p className={`text-xs font-bold ${theme.highlight}`}>{v.name}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{v.category} &middot; PAN: {v.pan} &middot; GST: {v.gst}</p>
              </div>
              <div className="text-right mr-2">
                <p className={`text-xs font-bold ${theme.highlight}`}>{v.totalPOs} POs</p>
                <p className={`text-[10px] ${v.outstanding !== '\u20B90' ? 'text-amber-600' : 'text-emerald-600'} font-bold`}>
                  {v.outstanding !== '\u20B90' ? `Outstanding: ${v.outstanding}` : 'All Settled'}
                </p>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={12} className={i < v.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'} />
                ))}
              </div>
              <ChevronDown size={16} className={`${theme.iconColor} transition-transform ${expandedVendor === v.name ? 'rotate-180' : ''}`} />
            </button>

            {expandedVendor === v.name && vendorPOHistory[v.name] && (
              <div className={`px-4 pb-4 border-t ${theme.border}`}>
                <p className={`text-[10px] font-bold ${theme.iconColor} mt-3 mb-2`}>PO History</p>
                <DataTable
                  headers={['PO #', 'Date', 'Amount', 'Invoice Match', 'Payment']}
                  rows={vendorPOHistory[v.name].map(po => [
                    <span key="po" className={`text-xs font-mono ${theme.primaryText} font-bold`}>{po.po}</span>,
                    <span key="d" className={`text-xs ${theme.iconColor}`}>{po.date}</span>,
                    <span key="a" className={`text-xs font-bold ${theme.highlight}`}>{po.amount}</span>,
                    <StatusBadge key="im" status={po.invoiceMatch === 'Matched' ? 'Active' : 'Pending'} theme={theme} />,
                    <StatusBadge key="ps" status={po.payStatus} theme={theme} />,
                  ])}
                  theme={theme}
                />
              </div>
            )}

            {expandedVendor === v.name && !vendorPOHistory[v.name] && (
              <div className={`px-4 pb-4 border-t ${theme.border}`}>
                <p className={`text-[10px] ${theme.iconColor} mt-3`}>No recent PO history available for this vendor.</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PETTY CASH (Feature 12) ────────────────────────────
function PettyCashView({ theme }: { theme: Theme }) {
  const [showVoucherForm, setShowVoucherForm] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className={`text-lg font-bold ${theme.highlight}`}>Petty Cash</h2>
          <InfoTip text="Daily petty cash management with receipt photo upload" />
        </div>
        <button onClick={() => setShowVoucherForm(!showVoucherForm)} className={`flex items-center gap-2 px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>
          <Plus size={14} /> New Voucher
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard icon={Wallet} label="Opening Balance" value={'\u20B910,000'} color="bg-blue-500" theme={theme} />
        <StatCard icon={TrendingDown} label="Today's Expenses" value={'\u20B93,450'} color="bg-amber-500" theme={theme} />
        <StatCard icon={Banknote} label="Closing Balance" value={'\u20B96,550'} color="bg-emerald-500" theme={theme} />
      </div>

      {/* New Voucher Form */}
      {showVoucherForm && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>New Petty Cash Voucher</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Amount</label>
              <input type="text" placeholder={'\u20B9 0'} className={`w-full px-3 py-2 text-xs rounded-lg border ${theme.border} ${theme.secondaryBg} ${theme.highlight}`} />
            </div>
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Description</label>
              <input type="text" placeholder="What was purchased..." className={`w-full px-3 py-2 text-xs rounded-lg border ${theme.border} ${theme.secondaryBg} ${theme.highlight}`} />
            </div>
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Category</label>
              <select className={`w-full px-3 py-2 text-xs rounded-lg border ${theme.border} ${theme.secondaryBg} ${theme.highlight}`}>
                <option>Stationery</option>
                <option>Travel</option>
                <option>Supplies</option>
                <option>Postage</option>
                <option>Maintenance</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <button className={`flex items-center gap-2 px-3 py-2 ${theme.secondaryBg} rounded-lg text-xs font-medium ${theme.highlight} border border-dashed ${theme.border}`}>
              <Camera size={14} /> Upload Receipt Photo
              <span className="flex items-center gap-1 text-[10px] text-blue-600"><Smartphone size={10} /> Mobile</span>
            </button>
            <div className="flex-1" />
            <button onClick={() => setShowVoucherForm(false)} className={`px-4 py-2 ${theme.secondaryBg} rounded-xl text-xs font-bold ${theme.iconColor}`}>Cancel</button>
            <button onClick={() => setShowVoucherForm(false)} className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>Save Voucher</button>
          </div>
        </div>
      )}

      {/* Voucher Table */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Recent Vouchers</h3>
        <DataTable
          headers={['Date', 'Description', 'Amount', 'Category', 'Receipt', 'Approved By']}
          rows={pettyCashVouchers.map(v => [
            <span key="d" className={`text-xs ${theme.iconColor}`}>{v.date}</span>,
            <span key="desc" className={`text-xs font-bold ${theme.highlight}`}>{v.desc}</span>,
            <span key="a" className={`text-xs font-bold ${theme.highlight}`}>{v.amount}</span>,
            <span key="cat" className={`text-xs ${theme.iconColor}`}>{v.category}</span>,
            v.receipt
              ? <span key="r" className="text-[10px] text-emerald-600 font-bold">&#x1F4F7; Attached</span>
              : <span key="r" className="text-[10px] text-amber-600 font-bold">Missing</span>,
            <span key="ap" className={`text-xs ${theme.iconColor}`}>{v.approvedBy}</span>,
          ])}
          theme={theme}
        />
      </div>

      {/* Monthly Summary */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Monthly Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { cat: 'Stationery', amount: '\u20B94,200', pct: '28%' },
            { cat: 'Travel', amount: '\u20B92,800', pct: '19%' },
            { cat: 'Supplies', amount: '\u20B93,500', pct: '23%' },
            { cat: 'Maintenance', amount: '\u20B94,500', pct: '30%' },
          ].map(c => (
            <div key={c.cat} className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-[10px] ${theme.iconColor}`}>{c.cat}</p>
              <p className={`text-xs font-bold ${theme.highlight}`}>{c.amount}</p>
              <p className={`text-[10px] ${theme.iconColor}`}>{c.pct} of total</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── BANK RECONCILIATION VIEW ──────────────────────────
function BankView({ theme }: { theme: Theme }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-bold ${theme.highlight}`}>Bank Reconciliation</h2>
          <p className={`text-xs ${theme.iconColor}`}>Account: HDFC Bank &mdash; School Account</p>
        </div>
        <button className={`flex items-center gap-2 px-3 py-2 ${theme.secondaryBg} rounded-xl text-xs font-medium ${theme.highlight}`}>
          <Download size={12} /> Download Statement
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard icon={Wallet} label="Current Balance" value={'\u20B918,45,000'} color="bg-blue-500" theme={theme} />
        <StatCard icon={TrendingUp} label="Total Credits (Feb)" value={'\u20B95,20,000'} color="bg-emerald-500" theme={theme} />
        <StatCard icon={TrendingDown} label="Total Debits (Feb)" value={'\u20B98,97,500'} color="bg-red-500" theme={theme} />
      </div>

      <DataTable
        headers={['Date', 'Description', 'Credit', 'Debit', 'Balance']}
        rows={bankReconciliation.map(b => [
          <span key="d" className={`text-xs ${theme.iconColor}`}>{b.date}</span>,
          <span key="desc" className={`text-xs font-bold ${theme.highlight}`}>{b.description}</span>,
          <span key="cr" className={`text-xs font-bold ${b.credit !== '-' ? 'text-emerald-600' : theme.iconColor}`}>{b.credit}</span>,
          <span key="dr" className={`text-xs font-bold ${b.debit !== '-' ? 'text-red-500' : theme.iconColor}`}>{b.debit}</span>,
          <span key="bal" className={`text-xs font-bold ${theme.highlight}`}>{b.balance}</span>,
        ])}
        theme={theme}
      />
    </div>
  );
}

// ─── REPORTS VIEW (with 5 new report cards: Features 6-10) ──────
function ReportsView({ theme }: { theme: Theme }) {
  const [activeReport, setActiveReport] = useState<string | null>(null);

  const existingReports = [
    { name: 'Fee Collection Summary', desc: 'Class-wise collection status', icon: Banknote },
    { name: 'Outstanding Fee Report', desc: 'Students with pending fees', icon: AlertTriangle },
    { name: 'Expense Report', desc: 'Category-wise expense breakdown', icon: CreditCard },
    { name: 'Salary Statement', desc: 'Monthly salary disbursement', icon: Users },
    { name: 'Concession Report', desc: 'All active fee waivers', icon: Percent },
    { name: 'Income vs Expense', desc: 'Revenue and cost analysis', icon: BarChart3 },
    { name: 'GST Report', desc: 'Tax collection and filing', icon: FileText },
    { name: 'Bank Statement', desc: 'Transaction-wise bank log', icon: Building2 },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className={`text-lg font-bold ${theme.highlight}`}>Financial Reports</h2>
        <p className={`text-xs ${theme.iconColor}`}>Generate and download reports</p>
      </div>

      {/* Existing report cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {existingReports.map(r => (
          <div key={r.name} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex items-center gap-4`}>
            <div className={`w-10 h-10 rounded-xl ${theme.secondaryBg} flex items-center justify-center`}>
              <r.icon size={18} className={theme.primaryText} />
            </div>
            <div className="flex-1">
              <p className={`text-xs font-bold ${theme.highlight}`}>{r.name}</p>
              <p className={`text-[10px] ${theme.iconColor}`}>{r.desc}</p>
            </div>
            <button className={`flex items-center gap-1 px-3 py-2 ${theme.secondaryBg} rounded-xl text-xs font-bold ${theme.primaryText}`}>
              <Download size={12} /> Generate
            </button>
          </div>
        ))}
      </div>

      {/* NEW REPORT CARDS */}
      <div className={`pt-2 border-t ${theme.border}`}>
        <p className={`text-xs font-bold ${theme.highlight} mb-3`}>Advanced Reports</p>
      </div>

      {/* Feature 6: Fee Projection Report */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className={theme.primaryText} />
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Fee Projection (Forecast)</h3>
            <InfoTip text="Forecast expected vs actual fee collection" />
          </div>
          <button onClick={() => setActiveReport(activeReport === 'projection' ? null : 'projection')} className={`text-xs ${theme.primaryText} font-bold`}>
            {activeReport === 'projection' ? 'Collapse' : 'View'} &rarr;
          </button>
        </div>
        {activeReport === 'projection' && (
          <div className="space-y-3">
            <DataTable
              headers={['Month', 'Expected Collection', 'Actual', 'Variance']}
              rows={[
                ['Dec 2025', '\u20B915,00,000', '\u20B914,20,000', <span key="v" className="text-xs text-red-500 font-bold">-{'\u20B9'}80,000</span>],
                ['Jan 2026', '\u20B918,00,000', '\u20B916,80,000', <span key="v" className="text-xs text-red-500 font-bold">-{'\u20B9'}1,20,000</span>],
                ['Feb 2026', '\u20B918,00,000', '\u20B912,40,000 (MTD)', <span key="v" className="text-xs text-amber-600 font-bold">In progress</span>],
                ['Mar 2026', '\u20B920,00,000', '-', <span key="v" className={`text-xs ${theme.iconColor}`}>Projected</span>],
                ['Apr 2026', '\u20B922,00,000', '-', <span key="v" className={`text-xs ${theme.iconColor}`}>Projected</span>],
                ['May 2026', '\u20B918,00,000', '-', <span key="v" className={`text-xs ${theme.iconColor}`}>Projected</span>],
              ].map(row => row.map((cell, ci) =>
                typeof cell === 'string' ? <span key={ci} className={`text-xs ${ci === 0 ? `font-bold ${theme.highlight}` : theme.iconColor}`}>{cell}</span> : cell
              ))}
              theme={theme}
            />
            <div className={`p-3 rounded-xl ${theme.secondaryBg} flex items-center gap-2`}>
              <TrendingUp size={14} className="text-emerald-600" />
              <span className={`text-xs font-bold ${theme.highlight}`}>Projected annual collection: {'\u20B9'}2.4Cr</span>
            </div>
          </div>
        )}
      </div>

      {/* Feature 7: YoY Fee Comparison */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BarChart3 size={18} className={theme.primaryText} />
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Year-over-Year Comparison</h3>
            <InfoTip text="Compare fee collection across academic years" />
          </div>
          <button onClick={() => setActiveReport(activeReport === 'yoy' ? null : 'yoy')} className={`text-xs ${theme.primaryText} font-bold`}>
            {activeReport === 'yoy' ? 'Collapse' : 'View'} &rarr;
          </button>
        </div>
        {activeReport === 'yoy' && (
          <DataTable
            headers={['Fee Head', '2024-25', '2025-26', 'Change %']}
            rows={[
              ['Tuition Fee', '\u20B91,05,00,000', '\u20B91,15,00,000', <span key="c" className="text-xs text-emerald-600 font-bold">{'\u2191'} 9.5%</span>],
              ['Transport', '\u20B916,00,000', '\u20B918,50,000', <span key="c" className="text-xs text-emerald-600 font-bold">{'\u2191'} 15.6%</span>],
              ['Activity Fee', '\u20B94,20,000', '\u20B95,00,000', <span key="c" className="text-xs text-emerald-600 font-bold">{'\u2191'} 19.0%</span>],
              ['Lab Fee', '\u20B92,80,000', '\u20B92,50,000', <span key="c" className="text-xs text-red-500 font-bold">{'\u2193'} 10.7%</span>],
              ['Exam Fee', '\u20B93,50,000', '\u20B93,80,000', <span key="c" className="text-xs text-emerald-600 font-bold">{'\u2191'} 8.6%</span>],
              [<span key="t" className="text-xs font-bold">TOTAL</span>, <span key="a" className="text-xs font-bold">{'\u20B9'}1,31,50,000</span>, <span key="b" className="text-xs font-bold">{'\u20B9'}1,44,80,000</span>, <span key="c" className="text-xs text-emerald-600 font-bold">{'\u2191'} 10.1%</span>],
            ].map(row => row.map((cell, ci) =>
              typeof cell === 'string' ? <span key={ci} className={`text-xs ${ci === 0 ? `font-bold ${theme.highlight}` : theme.iconColor}`}>{cell}</span> : cell
            ))}
            theme={theme}
          />
        )}
      </div>

      {/* Feature 8: Settlement Report */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Building2 size={18} className={theme.primaryText} />
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Gateway Settlement Tracking</h3>
            <InfoTip text="Track payment gateway settlements and bank deposits" />
          </div>
          <button onClick={() => setActiveReport(activeReport === 'settlement' ? null : 'settlement')} className={`text-xs ${theme.primaryText} font-bold`}>
            {activeReport === 'settlement' ? 'Collapse' : 'View'} &rarr;
          </button>
        </div>
        {activeReport === 'settlement' && (
          <div className="space-y-3">
            <DataTable
              headers={['Date', 'Gateway', 'Gross Amount', 'Gateway Fee', 'Net Settlement', 'Bank Deposit']}
              rows={[
                ['10 Feb', 'Razorpay', '\u20B91,45,000', '\u20B92,900', '\u20B91,42,100', <StatusBadge key="s" status="Active" theme={theme} />],
                ['09 Feb', 'Razorpay', '\u20B988,000', '\u20B91,760', '\u20B986,240', <StatusBadge key="s" status="Active" theme={theme} />],
                ['08 Feb', 'PayU', '\u20B962,000', '\u20B91,240', '\u20B960,760', <StatusBadge key="s" status="Active" theme={theme} />],
                ['07 Feb', 'Razorpay', '\u20B91,12,000', '\u20B92,240', '\u20B91,09,760', <StatusBadge key="s" status="Pending" theme={theme} />],
                ['06 Feb', 'PayU', '\u20B945,000', '\u20B9900', '\u20B944,100', <StatusBadge key="s" status="Pending" theme={theme} />],
              ].map(row => row.map((cell, ci) =>
                typeof cell === 'string' ? <span key={ci} className={`text-xs ${ci === 0 ? theme.iconColor : ci === 1 ? `font-bold ${theme.highlight}` : theme.iconColor}`}>{cell}</span> : cell
              ))}
              theme={theme}
            />
            <div className={`p-3 rounded-xl ${theme.secondaryBg} flex items-center justify-between`}>
              <span className={`text-xs font-bold ${theme.highlight}`}>Total (Feb MTD)</span>
              <div className="flex gap-4">
                <span className={`text-xs ${theme.iconColor}`}>Gross: <span className="font-bold">{'\u20B9'}4,52,000</span></span>
                <span className={`text-xs ${theme.iconColor}`}>Fees: <span className="font-bold text-red-500">{'\u20B9'}9,040</span></span>
                <span className={`text-xs ${theme.iconColor}`}>Net: <span className="font-bold text-emerald-600">{'\u20B9'}4,42,960</span></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Feature 9: Transaction Success Rate */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <RefreshCw size={18} className={theme.primaryText} />
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Online Payment Analytics</h3>
            <InfoTip text="Monitor online payment success rates and failures" />
          </div>
          <button onClick={() => setActiveReport(activeReport === 'txn' ? null : 'txn')} className={`text-xs ${theme.primaryText} font-bold`}>
            {activeReport === 'txn' ? 'Collapse' : 'View'} &rarr;
          </button>
        </div>
        {activeReport === 'txn' && (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <div className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
                <p className="text-lg font-bold text-emerald-600">94.2%</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Success Rate</p>
              </div>
              <div className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
                <p className="text-lg font-bold text-red-500">3.8%</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Failed</p>
              </div>
              <div className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
                <p className="text-lg font-bold text-amber-500">2.0%</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Pending</p>
              </div>
            </div>

            <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Success Rate by Payment Mode</p>
              <div className="space-y-2">
                {[
                  { mode: 'UPI', rate: 96 },
                  { mode: 'Card', rate: 92 },
                  { mode: 'Net Banking', rate: 89 },
                ].map(m => (
                  <div key={m.mode} className="flex items-center gap-3">
                    <span className={`text-xs ${theme.highlight} w-20`}>{m.mode}</span>
                    <div className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div className={`h-full rounded-full ${m.rate >= 95 ? 'bg-emerald-500' : m.rate >= 90 ? 'bg-blue-500' : 'bg-amber-500'}`} style={{ width: `${m.rate}%` }} />
                    </div>
                    <span className={`text-xs font-bold ${theme.highlight}`}>{m.rate}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-xl">
              <div>
                <p className="text-xs font-bold text-red-700">Failed transactions this month: 23</p>
                <p className="text-[10px] text-red-600">Total value: {'\u20B9'}1,85,000</p>
              </div>
              <button className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-bold">
                <RefreshCw size={12} /> Retry All
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Feature 10: Scholarship Report */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BookOpen size={18} className={theme.primaryText} />
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Scholarship &amp; Concession Report</h3>
            <InfoTip text="Track scholarship disbursements and government reimbursement claims" />
          </div>
          <button onClick={() => setActiveReport(activeReport === 'scholarship' ? null : 'scholarship')} className={`text-xs ${theme.primaryText} font-bold`}>
            {activeReport === 'scholarship' ? 'Collapse' : 'View'} &rarr;
          </button>
        </div>
        {activeReport === 'scholarship' && (
          <DataTable
            headers={['Scheme', 'Beneficiaries', 'Total Amount', 'Govt Reimbursement']}
            rows={[
              [<span key="s" className={`text-xs font-bold ${theme.highlight}`}>RTE (25% Quota)</span>, '32 students', '\u20B912,80,000', <span key="g" className="text-xs text-emerald-600 font-bold">Claim filed &#x2705;</span>],
              [<span key="s" className={`text-xs font-bold ${theme.highlight}`}>Merit Scholarship</span>, '15 students', '\u20B975,000', <span key="g" className={`text-xs ${theme.iconColor}`}>N/A</span>],
              [<span key="s" className={`text-xs font-bold ${theme.highlight}`}>EWS / BPL</span>, '8 students', '\u20B94,80,000', <span key="g" className="text-xs text-amber-600 font-bold">Claim pending</span>],
              [<span key="s" className={`text-xs font-bold ${theme.highlight}`}>Sibling Discount</span>, '22 students', '\u20B92,20,000', <span key="g" className={`text-xs ${theme.iconColor}`}>N/A</span>],
              [<span key="s" className={`text-xs font-bold ${theme.highlight}`}>Staff Child</span>, '5 students', '\u20B93,85,000', <span key="g" className={`text-xs ${theme.iconColor}`}>N/A</span>],
            ].map(row => row.map((cell, ci) =>
              typeof cell === 'string' ? <span key={ci} className={`text-xs ${theme.iconColor}`}>{cell}</span> : cell
            ))}
            theme={theme}
          />
        )}
      </div>

      {/* Feature 13: P&L Statement */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <DollarSign size={18} className={theme.primaryText} />
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Income &amp; Expenditure Statement</h3>
            <InfoTip text="Income and expenditure statement for financial reporting" />
          </div>
          <div className="flex items-center gap-2">
            <button className={`flex items-center gap-1 px-3 py-1.5 ${theme.secondaryBg} rounded-lg text-xs font-bold ${theme.highlight}`}>
              <Download size={12} /> Download P&amp;L as PDF
            </button>
            <button onClick={() => setActiveReport(activeReport === 'pnl' ? null : 'pnl')} className={`text-xs ${theme.primaryText} font-bold`}>
              {activeReport === 'pnl' ? 'Collapse' : 'View'} &rarr;
            </button>
          </div>
        </div>
        {activeReport === 'pnl' && (
          <div className="space-y-4">
            {/* Income Section */}
            <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>INCOME</p>
              <div className="space-y-1.5">
                {[
                  { head: 'Tuition Fees', amount: '\u20B91,20,00,000' },
                  { head: 'Transport Fees', amount: '\u20B918,00,000' },
                  { head: 'Activity Fees', amount: '\u20B95,00,000' },
                  { head: 'Other Income', amount: '\u20B93,00,000' },
                ].map(i => (
                  <div key={i.head} className="flex items-center justify-between">
                    <span className={`text-xs ${theme.highlight}`}>{i.head}</span>
                    <span className={`text-xs font-bold text-emerald-600`}>{i.amount}</span>
                  </div>
                ))}
                <div className={`flex items-center justify-between pt-2 mt-2 border-t ${theme.border}`}>
                  <span className={`text-xs font-bold ${theme.highlight}`}>Total Income</span>
                  <span className="text-xs font-bold text-emerald-700">{'\u20B9'}1,46,00,000</span>
                </div>
              </div>
            </div>

            {/* Expenditure Section */}
            <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>EXPENDITURE</p>
              <div className="space-y-1.5">
                {[
                  { head: 'Salaries & Wages', amount: '\u20B985,00,000' },
                  { head: 'Infrastructure', amount: '\u20B915,00,000' },
                  { head: 'Utilities', amount: '\u20B98,00,000' },
                  { head: 'Supplies & Materials', amount: '\u20B95,00,000' },
                  { head: 'Other Expenses', amount: '\u20B93,00,000' },
                ].map(e => (
                  <div key={e.head} className="flex items-center justify-between">
                    <span className={`text-xs ${theme.highlight}`}>{e.head}</span>
                    <span className="text-xs font-bold text-red-500">{e.amount}</span>
                  </div>
                ))}
                <div className={`flex items-center justify-between pt-2 mt-2 border-t ${theme.border}`}>
                  <span className={`text-xs font-bold ${theme.highlight}`}>Total Expenditure</span>
                  <span className="text-xs font-bold text-red-600">{'\u20B9'}1,16,00,000</span>
                </div>
              </div>
            </div>

            {/* Net Surplus */}
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <span className="text-sm font-bold text-emerald-800">Net Surplus</span>
              <span className="text-lg font-bold text-emerald-700">{'\u20B9'}30,00,000</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── RECEIPTS VIEW (with Cancel Receipt + Duplicate) ─────
function ReceiptsView({ theme }: { theme: Theme }) {
  const paidCollections = feeCollections.filter(f => f.status === 'Paid');
  const [cancelModal, setCancelModal] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-bold ${theme.highlight}`}>Fee Receipts</h2>
          <p className={`text-xs ${theme.iconColor}`}>Generate, print and manage receipts</p>
        </div>
        <button className={`flex items-center gap-2 px-3 py-2 ${theme.secondaryBg} rounded-xl text-xs font-medium ${theme.highlight}`}>
          <Printer size={12} /> Bulk Print
        </button>
      </div>

      <SearchBar placeholder="Search by receipt number, student name..." theme={theme} icon={Search} />

      <DataTable
        headers={['Receipt #', 'Student', 'Class', 'Amount', 'Mode', 'Date', 'Actions']}
        rows={paidCollections.map(f => [
          <span key="r" className={`text-xs font-mono font-bold ${theme.primaryText}`}>{f.receipt}</span>,
          <span key="n" className={`text-xs font-bold ${theme.highlight}`}>{f.student}</span>,
          <span key="c" className={`text-xs ${theme.iconColor}`}>{f.class}</span>,
          <span key="a" className={`text-xs font-bold ${theme.highlight}`}>{f.amount}</span>,
          <span key="m" className={`text-xs ${theme.iconColor}`}>{f.mode}</span>,
          <span key="d" className={`text-xs ${theme.iconColor}`}>{f.date}</span>,
          <div key="actions" className="flex gap-1">
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`} title="View"><Eye size={12} className={theme.iconColor} /></button>
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`} title="Print"><Printer size={12} className={theme.iconColor} /></button>
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`} title="Download"><Download size={12} className={theme.iconColor} /></button>
            {/* Feature 5: Duplicate Receipt (Reprint) */}
            <button className={`p-1.5 rounded-lg bg-blue-50 border border-blue-200`} title="Reprint with DUPLICATE watermark">
              <span className="text-[9px] font-bold text-blue-600">DUP</span>
            </button>
            {/* Feature 4: Cancel Receipt */}
            <button onClick={() => setCancelModal(f.receipt)} className={`p-1.5 rounded-lg bg-red-50 border border-red-200`} title="Cancel Receipt">
              <X size={12} className="text-red-500" />
            </button>
          </div>,
        ])}
        theme={theme}
      />

      <div className="flex items-center gap-2">
        <p className={`text-[10px] ${theme.iconColor}`}>
          <span className="font-bold">DUP</span> = Reprint receipt with &ldquo;DUPLICATE&rdquo; watermark &middot;
          <span className="text-red-500 font-bold ml-1">X</span> = Cancel receipt with audit trail
        </p>
        <InfoTip text="Cancel a receipt with audit trail and numbered cancel receipt" />
      </div>

      {/* Feature 4: Cancel Receipt Modal */}
      {cancelModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setCancelModal(null)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 w-full max-w-md shadow-xl`} onClick={e => e.stopPropagation()}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-4`}>Cancel Receipt</h3>
            <div className="space-y-3">
              <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-[10px] ${theme.iconColor}`}>Original Receipt</p>
                <p className={`text-xs font-mono font-bold ${theme.primaryText}`}>{cancelModal}</p>
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Reason for Cancellation</label>
                <select className={`w-full px-3 py-2 text-xs rounded-lg border ${theme.border} ${theme.secondaryBg} ${theme.highlight}`}>
                  <option>Duplicate Receipt</option>
                  <option>Data Entry Error</option>
                  <option>Refund Processed</option>
                  <option>Other</option>
                </select>
              </div>
              <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-[10px] ${theme.iconColor}`}>Cancel Receipt # (auto-generated)</p>
                <p className={`text-xs font-mono font-bold text-red-500`}>CR-2026-{cancelModal.split('-').pop()}</p>
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button onClick={() => setCancelModal(null)} className={`px-4 py-2 ${theme.secondaryBg} rounded-xl text-xs font-bold ${theme.iconColor}`}>Go Back</button>
                <button onClick={() => setCancelModal(null)} className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold">Issue Cancel Receipt</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── COMMUNICATION MODULE ────────────────────────────
function CommunicationModule({ theme }: { theme: Theme }) {
  const [commTab, setCommTab] = useState('Chat');
  const tabs = ['Messages', 'Notices', 'Chat'];
  return (
    <div className="space-y-3">
      <h2 className={`text-lg font-bold ${theme.highlight}`}>Communication</h2>
      <TabBar tabs={tabs} active={commTab} onChange={setCommTab} theme={theme} />
      {commTab === 'Chat' && <ChatsView theme={theme} compact />}
      {commTab === 'Messages' && (
        <div className="space-y-2">
          {[
            { from: 'Principal Office', subject: 'Budget approval for Science Lab equipment', time: '10:15 AM', read: false },
            { from: 'HR Manager', subject: 'February payroll data ready for processing', time: '09:00 AM', read: true },
            { from: 'Transport Head', subject: 'Diesel advance request \u2014 5 buses', time: 'Yesterday', read: true },
          ].map((msg, i) => (
            <div key={i} className={`${theme.cardBg} rounded-xl border ${theme.border} p-3 flex items-center gap-3`}>
              <div className={`w-8 h-8 rounded-full ${!msg.read ? theme.primary : theme.secondaryBg} flex items-center justify-center`}>
                <Mail size={14} className={!msg.read ? 'text-white' : theme.iconColor} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-semibold ${theme.highlight} truncate`}>{msg.from}</p>
                <p className={`text-[10px] ${theme.iconColor} truncate`}>{msg.subject}</p>
              </div>
              <span className={`text-[10px] ${theme.iconColor} shrink-0`}>{msg.time}</span>
            </div>
          ))}
        </div>
      )}
      {commTab === 'Notices' && (
        <div className="space-y-2">
          {[
            { title: 'Fee Payment Deadline \u2014 15 Feb 2026', date: '10 Feb 2026', category: 'Fee Reminder' },
            { title: 'Salary Disbursement \u2014 January Complete', date: '07 Feb 2026', category: 'Payroll' },
            { title: 'GST Filing Due \u2014 Q3 FY 2025-26', date: '05 Feb 2026', category: 'Compliance' },
          ].map((n, i) => (
            <div key={i} className={`${theme.cardBg} rounded-xl border ${theme.border} p-3 flex items-center gap-3`}>
              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Megaphone size={14} className="text-amber-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-semibold ${theme.highlight} truncate`}>{n.title}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{n.date} &middot; {n.category}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────
function AccountsHeadDashboard({ theme, themeIdx, onThemeChange, currentUser }: { theme?: Theme; themeIdx?: number; onThemeChange?: (idx: number) => void; currentUser?: TeamMember }) {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  if (!theme) return null;

  const renderContent = () => {
    switch (activeModule) {
      case 'dashboard': return <DashboardView theme={theme} setActiveModule={setActiveModule} />;
      case 'collections': return <CollectionsView theme={theme} />;
      case 'concessions': return <ConcessionsView theme={theme} />;
      case 'refunds': return <RefundsView theme={theme} />;
      case 'expenses': return <ExpensesView theme={theme} />;
      case 'salary': return <SalaryView theme={theme} />;
      case 'epf': return <EPFView theme={theme} />;
      case 'tax': return <TaxDeclarationsView theme={theme} />;
      case 'vendors': return <VendorsView theme={theme} />;
      case 'petty-cash': return <PettyCashView theme={theme} />;
      case 'bank': return <BankView theme={theme} />;
      case 'reports': return <ReportsView theme={theme} />;
      case 'receipts': return <ReceiptsView theme={theme} />;
      case 'communication': return <CommunicationModule theme={theme} />;
      case 'your-inputs': return <YourInputsModule theme={theme} userName={currentUser?.name || ''} />;
      case 'support': return <SupportModule theme={theme} role="accounts-head" />;
      case 'profile': return <StakeholderProfile role="accounts-head" theme={theme} onClose={() => setActiveModule('dashboard')} themeIdx={themeIdx} onThemeChange={onThemeChange} />;
      default: return <DashboardView theme={theme} setActiveModule={setActiveModule} />;
    }
  };

  return (
    <div className="flex gap-4 -m-6">
      <div className={`${sidebarCollapsed ? 'w-14' : 'w-48'} ${theme.cardBg} border-r ${theme.border} min-h-screen p-2 space-y-0.5 shrink-0 transition-all duration-200`}>
        <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} px-2 py-2`}>
          {!sidebarCollapsed && <p className={`text-[10px] font-bold ${theme.iconColor} uppercase px-1`}>Accounts</p>}
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className={`p-1 rounded-lg ${theme.buttonHover} ${theme.iconColor} transition-all`}>
            {sidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={14} />}
          </button>
        </div>
        {modules.map(m => (
          <button
            key={m.id}
            onClick={() => setActiveModule(m.id)}
            title={sidebarCollapsed ? m.label : undefined}
            className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2 py-2.5' : 'gap-2 px-3 py-2'} rounded-lg text-xs font-medium transition-all ${
              activeModule === m.id ? `${theme.primary} text-white` : `${theme.iconColor} ${theme.buttonHover}`
            }`}
          >
            <m.icon size={sidebarCollapsed ? 18 : 14} />
            {!sidebarCollapsed && m.label}
          </button>
        ))}
      </div>
      <div className="flex-1 p-6 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <BlueprintLayout>
      <AccountsHeadDashboard />
    </BlueprintLayout>
  );
}
