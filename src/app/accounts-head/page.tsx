'use client';

import React, { useState } from 'react';
import BlueprintLayout from '@/components/BlueprintLayout';
import { StatCard, TabBar, StatusBadge, SearchBar, DataTable, Toggle } from '@/components/shared';
import StakeholderProfile from '@/components/StakeholderProfile';
import TaskTrackerPanel from '@/components/TaskTrackerPanel';
import { ChatsView } from '@/components/ChatModule';
import { type Theme } from '@/lib/themes';
import {
  Home, Banknote, CreditCard, Receipt, Users, FileText, BarChart3, Settings,
  Search, Plus, Eye, Download, Filter, Check, X, Calendar,
  DollarSign, TrendingUp, TrendingDown, AlertTriangle, ArrowRight,
  Wallet, Building2, ChevronDown, Percent, Clock, Hash, Printer, User, MessageSquare, Mail, Megaphone,
  PanelLeftClose, PanelLeftOpen
} from 'lucide-react';

// ─── MOCK DATA ────────────────────────────────────────
const feeCollections = [
  { id: 'RCP-001', student: 'Aarav Patel', class: '10-A', amount: '₹7,700', mode: 'Online', date: '10 Feb', status: 'Paid', receipt: 'R-2026-001' },
  { id: 'RCP-002', student: 'Zara Khan', class: '8-B', amount: '₹6,500', mode: 'Cash', date: '09 Feb', status: 'Paid', receipt: 'R-2026-002' },
  { id: 'RCP-003', student: 'Arjun Singh', class: '10-A', amount: '₹7,700', mode: '-', date: '-', status: 'Overdue', receipt: '-' },
  { id: 'RCP-004', student: 'Meera Nair', class: '7-C', amount: '₹5,800', mode: 'Cheque', date: '08 Feb', status: 'Paid', receipt: 'R-2026-004' },
  { id: 'RCP-005', student: 'Riya Sharma', class: '5-A', amount: '₹5,000', mode: '-', date: '-', status: 'Pending', receipt: '-' },
  { id: 'RCP-006', student: 'Rohan Gupta', class: '3-B', amount: '₹5,000', mode: 'UPI', date: '07 Feb', status: 'Paid', receipt: 'R-2026-006' },
  { id: 'RCP-007', student: 'Ananya Reddy', class: '6-A', amount: '₹5,800', mode: '-', date: '-', status: 'Pending', receipt: '-' },
  { id: 'RCP-008', student: 'Dev Mehta', class: '9-B', amount: '₹6,500', mode: 'NEFT', date: '05 Feb', status: 'Paid', receipt: 'R-2026-008' },
];

const concessions = [
  { student: 'Kavya Desai', class: '4-A', type: 'Sibling Discount', amount: '₹1,500', percent: '10%', approved: 'School Admin', status: 'Active' },
  { student: 'Ravi Kumar', class: '7-B', type: 'EWS / RTE', amount: '₹6,500', percent: '100%', approved: 'Trust', status: 'Active' },
  { student: 'Prachi Shah', class: '9-A', type: 'Merit Scholarship', amount: '₹3,000', percent: '20%', approved: 'Principal', status: 'Active' },
  { student: 'Mohammed Ali', class: '5-B', type: 'Staff Child', amount: '₹5,000', percent: '50%', approved: 'HR', status: 'Active' },
  { student: 'Sneha Patel', class: '2-A', type: 'Financial Hardship', amount: '₹2,000', percent: '15%', approved: 'Trust', status: 'Pending' },
];

const expenses = [
  { id: 'EXP-001', category: 'Salary', desc: 'January Staff Salary', amount: '₹8,20,000', date: '01 Feb', vendor: 'Payroll', status: 'Paid' },
  { id: 'EXP-002', category: 'Utilities', desc: 'Electricity Bill - Jan', amount: '₹45,000', date: '05 Feb', vendor: 'UGVCL', status: 'Paid' },
  { id: 'EXP-003', category: 'Maintenance', desc: 'Plumbing Repair (Block A)', amount: '₹12,500', date: '08 Feb', vendor: 'City Plumbers', status: 'Paid' },
  { id: 'EXP-004', category: 'Stationery', desc: 'Exam Paper & Printing', amount: '₹28,000', date: '10 Feb', vendor: 'Shree Traders', status: 'Pending' },
  { id: 'EXP-005', category: 'Transport', desc: 'Diesel - Feb (5 buses)', amount: '₹1,10,000', date: '12 Feb', vendor: 'Indian Oil', status: 'Pending' },
  { id: 'EXP-006', category: 'Lab Equipment', desc: 'Physics Lab Instruments', amount: '₹65,000', date: '06 Feb', vendor: 'Lab India', status: 'Approved' },
];

const salaryBreakdown = [
  { dept: 'Teaching Staff', headcount: 48, gross: '₹5,80,000', deductions: '₹72,000', net: '₹5,08,000' },
  { dept: 'Admin & Office', headcount: 15, gross: '₹1,20,000', deductions: '₹15,000', net: '₹1,05,000' },
  { dept: 'Transport', headcount: 8, gross: '₹48,000', deductions: '₹6,000', net: '₹42,000' },
  { dept: 'Security', headcount: 5, gross: '₹30,000', deductions: '₹3,500', net: '₹26,500' },
  { dept: 'Housekeeping', headcount: 10, gross: '₹42,000', deductions: '₹5,000', net: '₹37,000' },
];

const bankReconciliation = [
  { date: '10 Feb', description: 'Fee Collection - Online', credit: '₹2,45,000', debit: '-', balance: '₹18,45,000' },
  { date: '09 Feb', description: 'Vendor Payment - Utilities', credit: '-', debit: '₹45,000', balance: '₹16,00,000' },
  { date: '08 Feb', description: 'Fee Collection - Cash Deposit', credit: '₹1,80,000', debit: '-', balance: '₹16,45,000' },
  { date: '07 Feb', description: 'Salary Payout - January', credit: '-', debit: '₹8,20,000', balance: '₹14,65,000' },
  { date: '06 Feb', description: 'Fee Collection - Cheque', credit: '₹95,000', debit: '-', balance: '₹22,85,000' },
  { date: '05 Feb', description: 'Misc Expenses', credit: '-', debit: '₹32,500', balance: '₹21,90,000' },
];

// ─── MODULES SIDEBAR ──────────────────────────────────
const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'collections', label: 'Fee Collection', icon: Banknote },
  { id: 'concessions', label: 'Concessions', icon: Percent },
  { id: 'expenses', label: 'Expenses', icon: CreditCard },
  { id: 'salary', label: 'Salary Processing', icon: Users },
  { id: 'bank', label: 'Bank Reconciliation', icon: Building2 },
  { id: 'reports', label: 'Financial Reports', icon: BarChart3 },
  { id: 'receipts', label: 'Receipts', icon: Receipt },
  { id: 'communication', label: 'Communication', icon: MessageSquare },
];

// ─── DASHBOARD VIEW ────────────────────────────────────
function DashboardView({ theme, setActiveModule }: { theme: Theme; setActiveModule: (m: string) => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-xl font-bold ${theme.highlight}`}>Accounts Dashboard</h2>
          <p className={`text-xs ${theme.iconColor} mt-1`}>Financial overview — February 2026</p>
        </div>
        <button onClick={() => setActiveModule('profile')} title="My Profile" className={`w-9 h-9 rounded-full ${theme.primary} text-white flex items-center justify-center text-xs font-bold hover:opacity-90 transition-opacity`}>RP</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Banknote} label="Collected (Feb)" value="₹12.4L" color="bg-emerald-500" sub="+₹2.4L today" theme={theme} />
        <StatCard icon={AlertTriangle} label="Pending Fees" value="₹8.2L" color="bg-amber-500" sub="124 students" theme={theme} />
        <StatCard icon={TrendingDown} label="Expenses (Feb)" value="₹9.8L" color="bg-red-500" theme={theme} />
        <StatCard icon={Wallet} label="Bank Balance" value="₹18.45L" color="bg-blue-500" theme={theme} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Collection by Mode */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Collection by Mode (Today)</h3>
          <div className="space-y-2">
            {[
              { mode: 'Online / UPI', amount: '₹1,45,000', count: 18, color: 'bg-blue-500' },
              { mode: 'Cash', amount: '₹52,000', count: 8, color: 'bg-emerald-500' },
              { mode: 'Cheque / NEFT', amount: '₹43,000', count: 4, color: 'bg-purple-500' },
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
              { label: 'Concession requests to review', count: 1, action: 'concessions' },
              { label: 'Vendor payments pending', count: 2, action: 'expenses' },
              { label: 'Salary processing for Feb', count: 1, action: 'salary' },
              { label: 'Cheques to deposit', count: 5, action: 'bank' },
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
              { month: 'Feb (MTD)', amount: '₹12.4L', target: '₹18L', percent: 69 },
              { month: 'January', amount: '₹16.8L', target: '₹18L', percent: 93 },
              { month: 'December', amount: '₹14.2L', target: '₹15L', percent: 95 },
              { month: 'November', amount: '₹15.5L', target: '₹16L', percent: 97 },
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
          <button onClick={() => setActiveModule('collections')} className={`text-xs ${theme.primaryText} font-bold`}>View All →</button>
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

// ─── FEE COLLECTION VIEW ───────────────────────────────
function CollectionsView({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All');
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

      <div className="flex gap-3 items-center">
        <div className="flex-1"><SearchBar placeholder="Search by student name or receipt..." theme={theme} icon={Search} /></div>
        <TabBar tabs={['All', 'Paid', 'Pending', 'Overdue']} active={tab} onChange={setTab} theme={theme} />
      </div>

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
          <p className={`text-xs ${theme.iconColor}`}>Discounts, scholarships & waivers</p>
        </div>
        <button className={`flex items-center gap-2 px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>
          <Plus size={14} /> Add Concession
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Percent} label="Active Concessions" value={concessions.filter(c => c.status === 'Active').length} color="bg-blue-500" theme={theme} />
        <StatCard icon={DollarSign} label="Total Waived" value="₹18,000" color="bg-amber-500" sub="This month" theme={theme} />
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
  const [month, setMonth] = useState('February 2026');

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
        <StatCard icon={DollarSign} label="Gross Salary" value="₹8,20,000" color="bg-emerald-500" theme={theme} />
        <StatCard icon={TrendingDown} label="Deductions" value="₹1,01,500" color="bg-amber-500" theme={theme} />
        <StatCard icon={Wallet} label="Net Payable" value="₹7,18,500" color="bg-purple-500" theme={theme} />
      </div>

      <DataTable
        headers={['Department', 'Staff', 'Gross', 'Deductions', 'Net Payable']}
        rows={salaryBreakdown.map(s => [
          <span key="d" className={`text-xs font-bold ${theme.highlight}`}>{s.dept}</span>,
          <span key="h" className={`text-xs ${theme.highlight}`}>{s.headcount}</span>,
          <span key="g" className={`text-xs ${theme.highlight}`}>{s.gross}</span>,
          <span key="de" className={`text-xs text-red-500`}>{s.deductions}</span>,
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

// ─── BANK RECONCILIATION VIEW ──────────────────────────
function BankView({ theme }: { theme: Theme }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-bold ${theme.highlight}`}>Bank Reconciliation</h2>
          <p className={`text-xs ${theme.iconColor}`}>Account: HDFC Bank — School Account</p>
        </div>
        <button className={`flex items-center gap-2 px-3 py-2 ${theme.secondaryBg} rounded-xl text-xs font-medium ${theme.highlight}`}>
          <Download size={12} /> Download Statement
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard icon={Wallet} label="Current Balance" value="₹18,45,000" color="bg-blue-500" theme={theme} />
        <StatCard icon={TrendingUp} label="Total Credits (Feb)" value="₹5,20,000" color="bg-emerald-500" theme={theme} />
        <StatCard icon={TrendingDown} label="Total Debits (Feb)" value="₹8,97,500" color="bg-red-500" theme={theme} />
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

// ─── REPORTS VIEW ──────────────────────────────────────
function ReportsView({ theme }: { theme: Theme }) {
  const reports = [
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {reports.map(r => (
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
    </div>
  );
}

// ─── RECEIPTS VIEW ─────────────────────────────────────
function ReceiptsView({ theme }: { theme: Theme }) {
  const paidCollections = feeCollections.filter(f => f.status === 'Paid');

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
        headers={['Receipt #', 'Student', 'Class', 'Amount', 'Mode', 'Date', '']}
        rows={paidCollections.map(f => [
          <span key="r" className={`text-xs font-mono font-bold ${theme.primaryText}`}>{f.receipt}</span>,
          <span key="n" className={`text-xs font-bold ${theme.highlight}`}>{f.student}</span>,
          <span key="c" className={`text-xs ${theme.iconColor}`}>{f.class}</span>,
          <span key="a" className={`text-xs font-bold ${theme.highlight}`}>{f.amount}</span>,
          <span key="m" className={`text-xs ${theme.iconColor}`}>{f.mode}</span>,
          <span key="d" className={`text-xs ${theme.iconColor}`}>{f.date}</span>,
          <div key="actions" className="flex gap-1">
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Printer size={12} className={theme.iconColor} /></button>
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Download size={12} className={theme.iconColor} /></button>
          </div>,
        ])}
        theme={theme}
      />
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
            { from: 'Transport Head', subject: 'Diesel advance request — 5 buses', time: 'Yesterday', read: true },
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
            { title: 'Fee Payment Deadline — 15 Feb 2026', date: '10 Feb 2026', category: 'Fee Reminder' },
            { title: 'Salary Disbursement — January Complete', date: '07 Feb 2026', category: 'Payroll' },
            { title: 'GST Filing Due — Q3 FY 2025-26', date: '05 Feb 2026', category: 'Compliance' },
          ].map((n, i) => (
            <div key={i} className={`${theme.cardBg} rounded-xl border ${theme.border} p-3 flex items-center gap-3`}>
              <div className={`w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center`}>
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
function AccountsHeadDashboard({ theme, themeIdx, onThemeChange }: { theme?: Theme; themeIdx?: number; onThemeChange?: (idx: number) => void }) {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  if (!theme) return null;

  const renderContent = () => {
    switch (activeModule) {
      case 'dashboard': return <DashboardView theme={theme} setActiveModule={setActiveModule} />;
      case 'collections': return <CollectionsView theme={theme} />;
      case 'concessions': return <ConcessionsView theme={theme} />;
      case 'expenses': return <ExpensesView theme={theme} />;
      case 'salary': return <SalaryView theme={theme} />;
      case 'bank': return <BankView theme={theme} />;
      case 'reports': return <ReportsView theme={theme} />;
      case 'receipts': return <ReceiptsView theme={theme} />;
      case 'communication': return <CommunicationModule theme={theme} />;
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
