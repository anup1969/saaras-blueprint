'use client';

import React, { useState } from 'react';
import BlueprintLayout from '@/components/BlueprintLayout';
import { StatCard, TabBar, StatusBadge, SearchBar, DataTable } from '@/components/shared';
import StakeholderProfile from '@/components/StakeholderProfile';
import TaskTrackerPanel from '@/components/TaskTrackerPanel';
import { ChatsView } from '@/components/ChatModule';
import SupportModule from '@/components/SupportModule';
import YourInputsModule from '@/components/YourInputsModule';
import { type TeamMember } from '@/lib/auth';
import { type Theme } from '@/lib/themes';
import {
  Home, GraduationCap, IndianRupee, UserPlus, MessageSquare, Headphones,
  Search, Plus, Eye, Download, Filter, Calendar, TrendingUp, TrendingDown,
  AlertTriangle, ArrowRight, Building2, Clock, Phone, Mail, MapPin,
  PanelLeftClose, PanelLeftOpen, Handshake, CheckCircle, XCircle, Target,
  FileText, Send, User, ClipboardCheck
} from 'lucide-react';

// ─── MOCK DATA ────────────────────────────────────────

const mySchools = [
  { name: 'DPS Ahmedabad', plan: 'Professional', fee: '₹18,500/mo', commPct: '20%', commAmt: '₹3,700', status: 'Active', onboarded: 'Apr 2025', renewal: 'Apr 2026' },
  { name: "St. Xavier's Surat", plan: 'Enterprise', fee: '₹32,000/mo', commPct: '15%', commAmt: '₹4,800', status: 'Active', onboarded: 'Jun 2025', renewal: 'Jun 2026' },
  { name: 'Vibgyor Vadodara', plan: 'Starter', fee: '₹8,500/mo', commPct: '20%', commAmt: '₹1,700', status: 'Active', onboarded: 'Aug 2025', renewal: 'Aug 2026' },
  { name: 'Navrachana School', plan: 'Professional', fee: '₹16,000/mo', commPct: '18%', commAmt: '₹2,880', status: 'Active', onboarded: 'Sep 2025', renewal: 'Sep 2026' },
  { name: 'Zydus School', plan: 'Enterprise', fee: '₹28,000/mo', commPct: '15%', commAmt: '₹4,200', status: 'Active', onboarded: 'Oct 2025', renewal: 'Oct 2026' },
  { name: 'Udgam School', plan: 'Starter', fee: '₹9,200/mo', commPct: '20%', commAmt: '₹1,840', status: 'Active', onboarded: 'Oct 2025', renewal: 'Oct 2026' },
  { name: 'Anand Niketan', plan: 'Professional', fee: '₹15,500/mo', commPct: '18%', commAmt: '₹2,790', status: 'Active', onboarded: 'Nov 2025', renewal: 'Nov 2026' },
  { name: 'Sheth CN Vidyalaya', plan: 'Starter', fee: '₹7,800/mo', commPct: '20%', commAmt: '₹1,560', status: 'Active', onboarded: 'Nov 2025', renewal: 'Nov 2026' },
  { name: 'Eklavya School Rajkot', plan: 'Professional', fee: '₹14,000/mo', commPct: '18%', commAmt: '₹2,520', status: 'Active', onboarded: 'Dec 2025', renewal: 'Dec 2026' },
  { name: 'Podar International', plan: 'Enterprise', fee: '₹25,000/mo', commPct: '15%', commAmt: '₹3,750', status: 'Active', onboarded: 'Jan 2026', renewal: 'Jan 2027' },
  { name: 'Global Indian School', plan: 'Professional', fee: '₹12,500/mo', commPct: '18%', commAmt: '₹2,250', status: 'Active', onboarded: 'Jan 2026', renewal: 'Jan 2027' },
  { name: 'Little Flower Jamnagar', plan: 'Starter', fee: '₹6,500/mo', commPct: '20%', commAmt: '₹1,300', status: 'Expired', onboarded: 'Mar 2025', renewal: 'Mar 2026' },
];

const payoutHistory = [
  { date: '15 Jan 2026', amount: '₹28,900', schools: '11 schools', status: 'Paid' },
  { date: '15 Dec 2025', amount: '₹27,200', schools: '10 schools', status: 'Paid' },
  { date: '15 Nov 2025', amount: '₹25,800', schools: '10 schools', status: 'Paid' },
  { date: '15 Oct 2025', amount: '₹22,400', schools: '9 schools', status: 'Paid' },
  { date: '15 Sep 2025', amount: '₹18,600', schools: '7 schools', status: 'Paid' },
  { date: '15 Aug 2025', amount: '₹14,200', schools: '5 schools', status: 'Paid' },
  { date: '15 Jul 2025', amount: '₹11,500', schools: '4 schools', status: 'Paid' },
];

const leads = [
  { school: 'Greenwood School', city: 'Rajkot', contact: 'Mr. Shah', phone: '98765 43210', email: 'shah@greenwood.edu', estRevenue: '₹12,000/mo', stage: 'Demo Scheduled', notes: 'Interested in Starter plan' },
  { school: 'Mount Carmel', city: 'Gandhinagar', contact: 'Sr. Maria', phone: '98765 12345', email: 'maria@mountcarmel.edu', estRevenue: '₹22,000/mo', stage: 'Proposal Sent', notes: 'Enterprise plan discussion' },
  { school: 'Ryan International', city: 'Ahmedabad', contact: 'Mr. Kapoor', phone: '91234 56789', email: 'kapoor@ryan.edu', estRevenue: '₹18,000/mo', stage: 'Negotiation', notes: 'Wants 10% discount on annual' },
  { school: 'Sat Kaival School', city: 'Bhavnagar', contact: 'Ms. Trivedi', phone: '94567 89012', email: 'trivedi@satkaival.edu', estRevenue: '₹9,500/mo', stage: 'New Enquiry', notes: 'Initial call done' },
  { school: 'Nirma Vidyavihar', city: 'Ahmedabad', contact: 'Mr. Joshi', phone: '99887 65432', email: 'joshi@nirma.edu', estRevenue: '₹26,000/mo', stage: 'Demo Scheduled', notes: 'Wants demo for 3 branches' },
  { school: 'Shree Swaminarayan Gurukul', city: 'Junagadh', contact: 'Mr. Dave', phone: '98123 45678', email: 'dave@gurukul.edu', estRevenue: '₹11,000/mo', stage: 'New Enquiry', notes: 'Referred by DPS Ahmedabad' },
  { school: 'Bright Future Academy', city: 'Surat', contact: 'Ms. Patel', phone: '97654 32100', email: 'patel@brightfuture.edu', estRevenue: '₹14,500/mo', stage: 'Proposal Sent', notes: 'Professional plan quote sent' },
  { school: 'GLS School', city: 'Ahmedabad', contact: 'Mr. Mehta', phone: '96543 21098', email: 'mehta@gls.edu', estRevenue: '₹20,000/mo', stage: 'Onboarded', notes: 'Signed last week' },
  { school: 'Noble School', city: 'Junagadh', contact: 'Ms. Raval', phone: '93456 78901', email: 'raval@noble.edu', estRevenue: '₹8,000/mo', stage: 'Lost', notes: 'Went with competitor' },
  { school: 'Tapovan School', city: 'Vadodara', contact: 'Mr. Pandya', phone: '92345 67890', email: 'pandya@tapovan.edu', estRevenue: '₹15,000/mo', stage: 'Negotiation', notes: 'Needs transport module addon' },
];

const leadStages = ['New Enquiry', 'Demo Scheduled', 'Proposal Sent', 'Negotiation', 'Onboarded', 'Lost'] as const;

const stageColors: Record<string, string> = {
  'New Enquiry': 'bg-blue-100 text-blue-700',
  'Demo Scheduled': 'bg-purple-100 text-purple-700',
  'Proposal Sent': 'bg-amber-100 text-amber-700',
  'Negotiation': 'bg-orange-100 text-orange-700',
  'Onboarded': 'bg-emerald-100 text-emerald-700',
  'Lost': 'bg-red-100 text-red-700',
};

// ─── MODULES SIDEBAR ──────────────────────────────────
const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'schools', label: 'My Schools', icon: GraduationCap },
  { id: 'earnings', label: 'Earnings', icon: IndianRupee },
  { id: 'leads', label: 'Leads', icon: UserPlus },
  { id: 'communication', label: 'Communication', icon: MessageSquare },
  { id: 'your-inputs', label: 'Your Inputs', icon: ClipboardCheck },
  { id: 'support', label: 'Support', icon: Headphones },
];

// ─── RESELLER PROFILE HEADER ──────────────────────────
function ResellerProfileHeader({ theme }: { theme: Theme }) {
  return (
    <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 mb-6`}>
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 rounded-2xl ${theme.primary} text-white flex items-center justify-center text-lg font-bold shadow-sm`}>
          EP
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className={`text-base font-bold ${theme.highlight}`}>EduPartners India</h2>
            <span className={`text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold`}>Gold Partner</span>
          </div>
          <div className="flex flex-wrap gap-4 mt-1.5">
            <span className={`text-[10px] ${theme.iconColor} flex items-center gap-1`}><FileText size={10} /> RP-2024-047</span>
            <span className={`text-[10px] ${theme.iconColor} flex items-center gap-1`}><MapPin size={10} /> Gujarat & Rajasthan</span>
            <span className={`text-[10px] ${theme.iconColor} flex items-center gap-1`}><User size={10} /> Vikram Mehta</span>
            <span className={`text-[10px] ${theme.iconColor} flex items-center gap-1`}><TrendingUp size={10} /> Commission Tier: Gold (18-20%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD VIEW ────────────────────────────────────
function DashboardView({ theme, setActiveModule }: { theme: Theme; setActiveModule: (m: string) => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-xl font-bold ${theme.highlight}`}>Reseller Dashboard</h2>
          <p className={`text-xs ${theme.iconColor} mt-1`}>Channel Partner overview — February 2026</p>
        </div>
        <button onClick={() => setActiveModule('profile')} title="My Profile" className={`w-9 h-9 rounded-full ${theme.primary} text-white flex items-center justify-center text-xs font-bold hover:opacity-90 transition-opacity`}>VM</button>
      </div>

      <ResellerProfileHeader theme={theme} />

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard icon={GraduationCap} label="Schools Onboarded" value="12" color="bg-blue-500" theme={theme} onClick={() => setActiveModule('schools')} />
        <StatCard icon={CheckCircle} label="Active Subscriptions" value="11" color="bg-emerald-500" sub="1 expired" theme={theme} onClick={() => setActiveModule('schools')} />
        <StatCard icon={IndianRupee} label="Total Commission" value="₹4,85,000" color="bg-purple-500" theme={theme} onClick={() => setActiveModule('earnings')} />
        <StatCard icon={Clock} label="Pending Payout" value="₹72,500" color="bg-amber-500" theme={theme} onClick={() => setActiveModule('earnings')} />
        <StatCard icon={TrendingUp} label="This Month Revenue" value="₹2,40,000" color="bg-teal-500" sub="From schools" theme={theme} onClick={() => setActiveModule('earnings')} />
        <StatCard icon={Target} label="Avg Commission Rate" value="18%" color="bg-indigo-500" theme={theme} onClick={() => setActiveModule('earnings')} />
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Next Payout */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Next Payout</h3>
          <div className={`flex items-center gap-3 p-4 rounded-xl ${theme.secondaryBg}`}>
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
              <IndianRupee size={18} />
            </div>
            <div>
              <p className={`text-lg font-bold ${theme.highlight}`}>₹72,500</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Scheduled: 15 Feb 2026</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <div className="h-1.5 flex-1 rounded-full bg-slate-200 overflow-hidden">
              <div className="h-full rounded-full bg-emerald-500" style={{ width: '75%' }} />
            </div>
            <span className={`text-[10px] ${theme.iconColor}`}>Processing</span>
          </div>
        </div>

        {/* Top School */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Top School (by Revenue)</h3>
          <div className={`flex items-center gap-3 p-4 rounded-xl ${theme.secondaryBg}`}>
            <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center">
              <Building2 size={18} />
            </div>
            <div className="flex-1">
              <p className={`text-xs font-bold ${theme.highlight}`}>DPS Ahmedabad</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Professional Plan</p>
            </div>
            <div className="text-right">
              <p className={`text-sm font-bold ${theme.highlight}`}>₹18,500/mo</p>
              <p className={`text-[10px] text-emerald-600 font-bold`}>₹3,700 commission</p>
            </div>
          </div>
        </div>

        {/* Renewal Alert */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Renewal Alerts</h3>
          <div className="space-y-2">
            <div className={`flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200`}>
              <AlertTriangle size={16} className="text-amber-500 shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-bold text-amber-800">Little Flower Jamnagar</p>
                <p className="text-[10px] text-amber-600">Expired — Mar 2026</p>
              </div>
            </div>
            <div className={`flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200`}>
              <AlertTriangle size={16} className="text-amber-500 shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-bold text-amber-800">DPS Ahmedabad</p>
                <p className="text-[10px] text-amber-600">Renews in 30 days — Apr 2026</p>
              </div>
            </div>
          </div>
          <button onClick={() => setActiveModule('schools')} className={`mt-3 text-xs ${theme.primaryText} font-bold`}>View All Schools →</button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Quick Actions</h3>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Add New Lead', icon: UserPlus, action: 'leads' },
            { label: 'View Earnings', icon: IndianRupee, action: 'earnings' },
            { label: 'My Schools', icon: GraduationCap, action: 'schools' },
            { label: 'Contact Saaras', icon: MessageSquare, action: 'communication' },
          ].map(a => (
            <button key={a.label} onClick={() => setActiveModule(a.action)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} transition-all`}>
              <a.icon size={14} className={theme.primaryText} />
              <span className={`text-xs font-bold ${theme.highlight}`}>{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Task Tracker */}
      <TaskTrackerPanel theme={theme} role="reseller" />
    </div>
  );
}

// ─── MY SCHOOLS VIEW ──────────────────────────────────
function SchoolsView({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All');
  const filtered = tab === 'All' ? mySchools : mySchools.filter(s => s.status === tab);
  const activeCount = mySchools.filter(s => s.status === 'Active').length;
  const expiredCount = mySchools.filter(s => s.status === 'Expired').length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-bold ${theme.highlight}`}>My Schools</h2>
          <p className={`text-xs ${theme.iconColor}`}>Schools onboarded through your channel</p>
        </div>
        <button className={`flex items-center gap-2 px-3 py-2 ${theme.secondaryBg} rounded-xl text-xs font-medium ${theme.highlight}`}>
          <Download size={12} /> Export
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={GraduationCap} label="Total Schools" value="12" color="bg-blue-500" theme={theme} />
        <StatCard icon={CheckCircle} label="Active" value={activeCount} color="bg-emerald-500" theme={theme} />
        <StatCard icon={XCircle} label="Expired" value={expiredCount} color="bg-red-500" theme={theme} />
        <StatCard icon={IndianRupee} label="Total Monthly Revenue" value="₹1,85,000" color="bg-purple-500" theme={theme} />
      </div>

      <div className="flex gap-3 items-center">
        <div className="flex-1"><SearchBar placeholder="Search by school name..." theme={theme} icon={Search} /></div>
        <TabBar tabs={['All', 'Active', 'Expired']} active={tab} onChange={setTab} theme={theme} />
      </div>

      <DataTable
        headers={['School Name', 'Plan', 'Monthly Fee', 'Comm %', 'Comm Amt', 'Status', 'Onboarded', 'Renewal']}
        rows={filtered.map(s => [
          <span key="n" className={`text-xs font-bold ${theme.highlight}`}>{s.name}</span>,
          <span key="p" className={`text-xs font-bold ${theme.primaryText}`}>{s.plan}</span>,
          <span key="f" className={`text-xs font-bold ${theme.highlight}`}>{s.fee}</span>,
          <span key="cp" className={`text-xs ${theme.iconColor}`}>{s.commPct}</span>,
          <span key="ca" className={`text-xs font-bold text-emerald-600`}>{s.commAmt}</span>,
          <StatusBadge key="s" status={s.status} theme={theme} />,
          <span key="o" className={`text-xs ${theme.iconColor}`}>{s.onboarded}</span>,
          <span key="r" className={`text-xs ${theme.iconColor}`}>{s.renewal}</span>,
        ])}
        theme={theme}
      />
    </div>
  );
}

// ─── EARNINGS VIEW ────────────────────────────────────
function EarningsView({ theme }: { theme: Theme }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-bold ${theme.highlight}`}>Earnings</h2>
          <p className={`text-xs ${theme.iconColor}`}>Commission & payout details</p>
        </div>
        <button className={`flex items-center gap-2 px-3 py-2 ${theme.secondaryBg} rounded-xl text-xs font-medium ${theme.highlight}`}>
          <Download size={12} /> Download Statement
        </button>
      </div>

      {/* Commission Summary */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Commission Summary</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className={`p-4 rounded-xl ${theme.secondaryBg} text-center`}>
            <p className={`text-lg font-bold ${theme.highlight}`}>₹32,400</p>
            <p className={`text-[10px] ${theme.iconColor}`}>This Month</p>
            <p className="text-[10px] text-emerald-600 font-bold mt-1">+12% vs last</p>
          </div>
          <div className={`p-4 rounded-xl ${theme.secondaryBg} text-center`}>
            <p className={`text-lg font-bold ${theme.highlight}`}>₹28,900</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Last Month</p>
          </div>
          <div className={`p-4 rounded-xl ${theme.secondaryBg} text-center`}>
            <p className={`text-lg font-bold ${theme.highlight}`}>₹4,85,000</p>
            <p className={`text-[10px] ${theme.iconColor}`}>YTD Total</p>
            <p className="text-[10px] text-emerald-600 font-bold mt-1">Since Apr 2025</p>
          </div>
        </div>
      </div>

      {/* Commission Structure */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Commission Structure (Tiered)</h3>
        <div className="space-y-2">
          {[
            { range: '1-5 schools', rate: '15%', color: 'bg-blue-500', width: '25%' },
            { range: '6-15 schools', rate: '18%', color: 'bg-purple-500', width: '50%', current: true },
            { range: '16-30 schools', rate: '20%', color: 'bg-emerald-500', width: '75%' },
            { range: '30+ schools', rate: '22%', color: 'bg-amber-500', width: '100%' },
          ].map(tier => (
            <div key={tier.range} className={`flex items-center gap-3 p-3 rounded-xl ${tier.current ? `${theme.secondaryBg} ring-2 ring-purple-300` : theme.secondaryBg}`}>
              <div className={`w-8 h-8 rounded-lg ${tier.color} text-white flex items-center justify-center text-[10px] font-bold`}>{tier.rate}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold ${theme.highlight}`}>{tier.range}</span>
                  {tier.current && <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-bold">Your Tier</span>}
                </div>
                <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
                  <div className={`h-full rounded-full ${tier.color}`} style={{ width: tier.width }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pending Payout */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Pending Payout</h3>
        <div className={`flex items-center gap-4 p-4 rounded-xl bg-amber-50 border border-amber-200`}>
          <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center">
            <Clock size={20} />
          </div>
          <div className="flex-1">
            <p className="text-lg font-bold text-amber-800">₹72,500</p>
            <p className="text-[10px] text-amber-600">Scheduled for 15 Feb 2026 — Covers 11 active schools</p>
          </div>
          <span className="text-xs px-3 py-1.5 rounded-full bg-amber-200 text-amber-800 font-bold">Scheduled</span>
        </div>
      </div>

      {/* Payout History */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Payout History</h3>
        <DataTable
          headers={['Date', 'Amount', 'Schools Covered', 'Status']}
          rows={payoutHistory.map(p => [
            <span key="d" className={`text-xs ${theme.iconColor}`}>{p.date}</span>,
            <span key="a" className={`text-xs font-bold ${theme.highlight}`}>{p.amount}</span>,
            <span key="s" className={`text-xs ${theme.iconColor}`}>{p.schools}</span>,
            <StatusBadge key="st" status={p.status} theme={theme} />,
          ])}
          theme={theme}
        />
      </div>
    </div>
  );
}

// ─── LEADS VIEW ───────────────────────────────────────
function LeadsView({ theme }: { theme: Theme }) {
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-bold ${theme.highlight}`}>Lead Pipeline</h2>
          <p className={`text-xs ${theme.iconColor}`}>{leads.length} leads in pipeline</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setViewMode(viewMode === 'kanban' ? 'table' : 'kanban')} className={`flex items-center gap-2 px-3 py-2 ${theme.secondaryBg} rounded-xl text-xs font-medium ${theme.highlight}`}>
            {viewMode === 'kanban' ? 'Table View' : 'Kanban View'}
          </button>
          <button onClick={() => setShowForm(!showForm)} className={`flex items-center gap-2 px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>
            <Plus size={14} /> Add Lead
          </button>
        </div>
      </div>

      {/* Lead Stats */}
      <div className="flex flex-wrap gap-2">
        {leadStages.map(stage => {
          const count = leads.filter(l => l.stage === stage).length;
          return (
            <span key={stage} className={`text-[10px] px-3 py-1.5 rounded-full font-bold ${stageColors[stage]}`}>
              {stage}: {count}
            </span>
          );
        })}
      </div>

      {/* Lead Form */}
      {showForm && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Add New Lead</h3>
            <button onClick={() => setShowForm(false)} className={`text-xs ${theme.iconColor}`}>Cancel</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { label: 'School Name', placeholder: 'e.g. ABC School' },
              { label: 'City', placeholder: 'e.g. Ahmedabad' },
              { label: 'Contact Person', placeholder: 'e.g. Mr. Sharma' },
              { label: 'Phone', placeholder: 'e.g. 98765 43210' },
              { label: 'Email', placeholder: 'e.g. admin@school.edu' },
              { label: 'Expected Plan', placeholder: 'Starter / Professional / Enterprise' },
            ].map(f => (
              <div key={f.label}>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>{f.label}</label>
                <input type="text" placeholder={f.placeholder} className={`w-full px-3 py-2 rounded-xl ${theme.secondaryBg} border ${theme.border} text-xs ${theme.highlight} outline-none focus:ring-2 focus:ring-purple-300`} />
              </div>
            ))}
            <div className="md:col-span-2 lg:col-span-3">
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Notes</label>
              <textarea placeholder="Additional details..." rows={2} className={`w-full px-3 py-2 rounded-xl ${theme.secondaryBg} border ${theme.border} text-xs ${theme.highlight} outline-none focus:ring-2 focus:ring-purple-300`} />
            </div>
          </div>
          <div className="flex justify-end mt-3">
            <button className={`flex items-center gap-2 px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>
              <Send size={12} /> Save Lead
            </button>
          </div>
        </div>
      )}

      {/* Kanban View */}
      {viewMode === 'kanban' && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {leadStages.map(stage => {
            const stageLeads = leads.filter(l => l.stage === stage);
            return (
              <div key={stage} className="min-w-[220px] flex-shrink-0">
                <div className={`flex items-center gap-2 mb-2`}>
                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold ${stageColors[stage]}`}>{stage}</span>
                  <span className={`text-[10px] ${theme.iconColor}`}>{stageLeads.length}</span>
                </div>
                <div className="space-y-2">
                  {stageLeads.map(lead => (
                    <div key={lead.school} className={`${theme.cardBg} rounded-xl border ${theme.border} p-3 space-y-1.5`}>
                      <p className={`text-xs font-bold ${theme.highlight}`}>{lead.school}</p>
                      <p className={`text-[10px] ${theme.iconColor} flex items-center gap-1`}><MapPin size={9} /> {lead.city}</p>
                      <p className={`text-[10px] ${theme.iconColor} flex items-center gap-1`}><User size={9} /> {lead.contact}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className={`text-[10px] font-bold text-emerald-600`}>{lead.estRevenue}</span>
                        <button className={`p-1 rounded-lg ${theme.secondaryBg}`}><Eye size={10} className={theme.iconColor} /></button>
                      </div>
                    </div>
                  ))}
                  {stageLeads.length === 0 && (
                    <div className={`${theme.secondaryBg} rounded-xl border ${theme.border} border-dashed p-4 text-center`}>
                      <p className={`text-[10px] ${theme.iconColor}`}>No leads</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <DataTable
          headers={['School', 'City', 'Contact', 'Phone', 'Est. Revenue', 'Stage', 'Notes']}
          rows={leads.map(l => [
            <span key="n" className={`text-xs font-bold ${theme.highlight}`}>{l.school}</span>,
            <span key="c" className={`text-xs ${theme.iconColor}`}>{l.city}</span>,
            <span key="ct" className={`text-xs ${theme.highlight}`}>{l.contact}</span>,
            <span key="p" className={`text-xs ${theme.iconColor}`}>{l.phone}</span>,
            <span key="r" className={`text-xs font-bold text-emerald-600`}>{l.estRevenue}</span>,
            <span key="s" className={`text-[10px] px-2 py-1 rounded-full font-bold ${stageColors[l.stage]}`}>{l.stage}</span>,
            <span key="no" className={`text-[10px] ${theme.iconColor}`}>{l.notes}</span>,
          ])}
          theme={theme}
        />
      )}
    </div>
  );
}

// ─── COMMUNICATION MODULE ────────────────────────────
function CommunicationModule({ theme }: { theme: Theme }) {
  return (
    <div className="space-y-3">
      <h2 className={`text-lg font-bold ${theme.highlight}`}>Communication</h2>
      <p className={`text-xs ${theme.iconColor} mb-2`}>Chat with your Saaras contacts</p>
      <ChatsView theme={theme} compact />
    </div>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────
function ResellerDashboard({ theme, themeIdx, onThemeChange, currentUser }: { theme?: Theme; themeIdx?: number; onThemeChange?: (idx: number) => void; currentUser?: TeamMember }) {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  if (!theme) return null;

  const renderContent = () => {
    switch (activeModule) {
      case 'dashboard': return <DashboardView theme={theme} setActiveModule={setActiveModule} />;
      case 'schools': return <SchoolsView theme={theme} />;
      case 'earnings': return <EarningsView theme={theme} />;
      case 'leads': return <LeadsView theme={theme} />;
      case 'communication': return <CommunicationModule theme={theme} />;
      case 'your-inputs': return <YourInputsModule theme={theme} userName={currentUser?.name || ''} />;
      case 'support': return <SupportModule theme={theme} role="reseller" />;
      case 'profile': return <StakeholderProfile role="reseller" theme={theme} onClose={() => setActiveModule('dashboard')} themeIdx={themeIdx} onThemeChange={onThemeChange} />;
      default: return <DashboardView theme={theme} setActiveModule={setActiveModule} />;
    }
  };

  return (
    <div className="flex gap-4 -m-6">
      <div className={`${sidebarCollapsed ? 'w-14' : 'w-48'} ${theme.cardBg} border-r ${theme.border} min-h-screen p-2 space-y-0.5 shrink-0 transition-all duration-200`}>
        <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} px-2 py-2`}>
          {!sidebarCollapsed && <p className={`text-[10px] font-bold ${theme.iconColor} uppercase px-1`}>Reseller</p>}
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
      <ResellerDashboard />
    </BlueprintLayout>
  );
}
