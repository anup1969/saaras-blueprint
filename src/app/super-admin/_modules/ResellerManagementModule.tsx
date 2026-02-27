'use client';

import React, { useState } from 'react';
import { StatCard, TabBar, StatusBadge, DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  Building2, Plus, Check, X, Clock, AlertTriangle, Handshake, Percent, IndianRupee,
} from 'lucide-react';

// ─── RESELLER MOCK DATA ───────────────────────────────
const resellersData = [
  { name: 'EduPartners India', partnerId: 'RP-2024-047', region: 'Gujarat & Rajasthan', schools: 12, revenue: '₹1,85,000', commissionPct: '18%', commission: '₹33,300', status: 'Active' },
  { name: 'SchoolConnect Pro', partnerId: 'RP-2024-012', region: 'Maharashtra', schools: 15, revenue: '₹2,40,000', commissionPct: '20%', commission: '₹48,000', status: 'Active' },
  { name: 'LearnBridge', partnerId: 'RP-2024-063', region: 'Karnataka', schools: 8, revenue: '₹1,20,000', commissionPct: '15%', commission: '₹18,000', status: 'Active' },
  { name: 'EduReach Network', partnerId: 'RP-2024-089', region: 'Tamil Nadu', schools: 10, revenue: '₹1,60,000', commissionPct: '18%', commission: '₹28,800', status: 'Active' },
  { name: 'SmartSchool Partners', partnerId: 'RP-2025-003', region: 'Delhi NCR', schools: 6, revenue: '₹95,000', commissionPct: '15%', commission: '₹14,250', status: 'Active' },
  { name: 'AcademiX Solutions', partnerId: 'RP-2024-034', region: 'MP & Chhattisgarh', schools: 9, revenue: '₹1,35,000', commissionPct: '18%', commission: '₹24,300', status: 'Active' },
  { name: 'EduVenture', partnerId: 'RP-2023-091', region: 'Rajasthan', schools: 4, revenue: '₹55,000', commissionPct: '15%', commission: '₹8,250', status: 'Active' },
  { name: 'Pioneer Ed', partnerId: 'RP-2024-055', region: 'UP', schools: 3, revenue: '₹42,000', commissionPct: '15%', commission: '₹6,300', status: 'Inactive' },
];

const recentPayouts = [
  { date: '15 Jan 2026', reseller: 'SchoolConnect Pro', amount: '₹48,000', schools: 15, status: 'Paid' },
  { date: '15 Jan 2026', reseller: 'EduPartners India', amount: '₹33,300', schools: 12, status: 'Paid' },
  { date: '15 Jan 2026', reseller: 'EduReach Network', amount: '₹28,800', schools: 10, status: 'Paid' },
  { date: '15 Jan 2026', reseller: 'AcademiX Solutions', amount: '₹24,300', schools: 9, status: 'Paid' },
  { date: '15 Dec 2025', reseller: 'SchoolConnect Pro', amount: '₹46,200', schools: 14, status: 'Paid' },
  { date: '15 Dec 2025', reseller: 'LearnBridge', amount: '₹16,500', schools: 7, status: 'Paid' },
];

const commissionTiers = [
  { name: 'Bronze', range: '1–5 schools', pct: '15%', color: 'bg-amber-600' },
  { name: 'Silver', range: '6–15 schools', pct: '18%', color: 'bg-slate-400' },
  { name: 'Gold', range: '16–30 schools', pct: '20%', color: 'bg-yellow-500' },
  { name: 'Platinum', range: '30+ schools', pct: '22%', color: 'bg-purple-500' },
];

const regionOptions = ['Gujarat', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Delhi NCR', 'Rajasthan', 'MP & Chhattisgarh', 'UP', 'Kerala', 'West Bengal', 'Telangana', 'Andhra Pradesh', 'Punjab', 'Haryana', 'Bihar'];

export default function ResellerManagementModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const filtered = tab === 'All' ? resellersData : resellersData.filter(r => r.status === tab);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-bold ${theme.highlight}`}>Reseller Management</h2>
          <p className={`text-xs ${theme.iconColor}`}>Channel partners who bring schools to the platform</p>
        </div>
        <button onClick={() => setShowCreateForm(!showCreateForm)} className={`flex items-center gap-2 px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>
          <Plus size={14} /> Add Reseller
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard icon={Handshake} label="Total Resellers" value="8" color="bg-blue-500" sub="Active: 7, Inactive: 1" theme={theme} />
        <StatCard icon={IndianRupee} label="Commission Paid (YTD)" value="₹38.5L" color="bg-emerald-500" sub="Financial year 2025-26" theme={theme} />
        <StatCard icon={Clock} label="Pending Payouts" value="₹5.25L" color="bg-amber-500" sub="Next payout: 15 Feb 2026" theme={theme} />
        <StatCard icon={Building2} label="Schools via Resellers" value="67" color="bg-purple-500" sub="of ~120 total schools" theme={theme} />
        <StatCard icon={Percent} label="Avg. Commission" value="17.5%" color="bg-rose-500" sub="Across all resellers" theme={theme} />
      </div>

      {/* Create Reseller Form (Collapsible) */}
      {showCreateForm && (
        <div className={`${theme.cardBg} rounded-2xl border-2 border-blue-300 p-5 space-y-4`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Create New Reseller</h3>
            <button onClick={() => setShowCreateForm(false)} className={`p-1.5 rounded-lg ${theme.buttonHover} ${theme.iconColor}`}>
              <X size={16} />
            </button>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Company / Partner Name <span className="text-red-500">*</span></label>
              <input type="text" placeholder="e.g. EduPartners India" className={`w-full px-4 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-slate-300 ${theme.highlight}`} />
            </div>
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Contact Person Name <span className="text-red-500">*</span></label>
              <input type="text" placeholder="e.g. Rajesh Mehta" className={`w-full px-4 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-slate-300 ${theme.highlight}`} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Email <span className="text-red-500">*</span></label>
              <input type="email" placeholder="partner@company.com" className={`w-full px-4 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-slate-300 ${theme.highlight}`} />
            </div>
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Phone <span className="text-red-500">*</span></label>
              <input type="tel" placeholder="+91 98765 43210" className={`w-full px-4 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-slate-300 ${theme.highlight}`} />
            </div>
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Region / Territory <span className="text-red-500">*</span></label>
              <select className={`w-full px-4 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none ${theme.highlight}`}>
                <option value="">Select region...</option>
                {regionOptions.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Commission Tier</label>
              <select className={`w-full px-4 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none ${theme.highlight}`}>
                <option value="">Select tier...</option>
                <option value="bronze">Bronze (15%)</option>
                <option value="silver">Silver (18%)</option>
                <option value="gold">Gold (20%)</option>
                <option value="platinum">Platinum (22%)</option>
                <option value="custom">Custom %</option>
              </select>
            </div>
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Agreement Date</label>
              <input type="date" className={`w-full px-4 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-slate-300 ${theme.highlight}`} />
            </div>
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Agreement Validity</label>
              <input type="date" className={`w-full px-4 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-slate-300 ${theme.highlight}`} />
            </div>
          </div>

          {/* Bank Details */}
          <div className={`rounded-xl border ${theme.border} p-4 space-y-3`}>
            <p className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>Bank Details (for commission payouts)</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Account Name</label>
                <input type="text" placeholder="e.g. EduPartners India Pvt Ltd" className={`w-full px-4 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-slate-300 ${theme.highlight}`} />
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Account Number</label>
                <input type="text" placeholder="e.g. 9876543210123456" className={`w-full px-4 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-slate-300 ${theme.highlight}`} />
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>IFSC Code</label>
                <input type="text" placeholder="e.g. SBIN0001234" className={`w-full px-4 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-slate-300 ${theme.highlight}`} />
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Bank Name</label>
                <input type="text" placeholder="e.g. State Bank of India" className={`w-full px-4 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-slate-300 ${theme.highlight}`} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>GSTIN (Optional)</label>
              <input type="text" placeholder="e.g. 24AABCU9603R1ZM" className={`w-full px-4 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-slate-300 ${theme.highlight}`} />
            </div>
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Notes</label>
              <input type="text" placeholder="Any internal notes about this reseller..." className={`w-full px-4 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-slate-300 ${theme.highlight}`} />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button onClick={() => setShowCreateForm(false)} className={`px-4 py-2 rounded-xl text-xs font-bold ${theme.secondaryBg} ${theme.highlight}`}>Cancel</button>
            <button className={`flex items-center gap-2 px-5 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>
              <Check size={14} /> Create Reseller
            </button>
          </div>
        </div>
      )}

      {/* Reseller List */}
      <TabBar tabs={['All', 'Active', 'Inactive']} active={tab} onChange={setTab} theme={theme} />

      <DataTable
        headers={['Reseller', 'Partner ID', 'Region', 'Schools', 'Revenue/mo', 'Commission %', 'Commission/mo', 'Status']}
        rows={filtered.map(r => [
          <span key="name" className={`text-xs font-bold ${theme.highlight}`}>{r.name}</span>,
          <span key="pid" className={`text-xs font-mono ${theme.iconColor}`}>{r.partnerId}</span>,
          <span key="region" className={`text-xs ${theme.iconColor}`}>{r.region}</span>,
          <span key="schools" className={`text-xs font-bold ${theme.highlight}`}>{r.schools}</span>,
          <span key="rev" className={`text-xs font-bold ${theme.highlight}`}>{r.revenue}</span>,
          <span key="pct" className={`text-xs font-bold ${theme.primaryText}`}>{r.commissionPct}</span>,
          <span key="comm" className={`text-xs font-bold text-emerald-600`}>{r.commission}</span>,
          <StatusBadge key="status" status={r.status} theme={theme} />,
        ])}
        theme={theme}
      />

      {/* Commission Tiers + Payout Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Commission Tiers Card */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Commission Tier Structure</h3>
          <div className="space-y-3">
            {commissionTiers.map(tier => (
              <div key={tier.name} className={`flex items-center gap-4 p-3 rounded-xl ${theme.secondaryBg}`}>
                <div className={`w-10 h-10 rounded-xl ${tier.color} text-white flex items-center justify-center text-xs font-bold`}>
                  {tier.pct}
                </div>
                <div className="flex-1">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{tier.name}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{tier.range}</p>
                </div>
                <span className={`text-xs font-bold ${theme.primaryText}`}>{tier.pct} commission</span>
              </div>
            ))}
          </div>
          <div className={`${theme.secondaryBg} rounded-xl p-3 mt-3 flex items-start gap-2`}>
            <AlertTriangle size={12} className="text-amber-500 mt-0.5 shrink-0" />
            <p className={`text-[10px] ${theme.iconColor}`}>
              Commission tiers auto-upgrade as resellers onboard more schools. Custom rates can be set per reseller agreement.
            </p>
          </div>
        </div>

        {/* Payout Management Card */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Payout Management</h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-[10px] ${theme.iconColor}`}>Payout Schedule</p>
              <p className={`text-xs font-bold ${theme.highlight}`}>Monthly (15th of every month)</p>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-[10px] ${theme.iconColor}`}>Next Payout Run</p>
              <p className={`text-xs font-bold ${theme.primaryText}`}>15 Feb 2026</p>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-[10px] ${theme.iconColor}`}>Total Pending</p>
              <p className={`text-lg font-bold text-amber-600`}>₹5,25,000</p>
            </div>
            <div className="flex items-end">
              <button className={`w-full flex items-center justify-center gap-2 px-4 py-3 ${theme.primary} text-white rounded-xl text-xs font-bold`}>
                <IndianRupee size={14} /> Process Payouts
              </button>
            </div>
          </div>

          {/* Recent Payouts */}
          <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-2`}>Recent Payouts</p>
          <div className="space-y-2">
            {recentPayouts.slice(0, 4).map((p, i) => (
              <div key={i} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>{p.reseller}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{p.date} · {p.schools} schools</p>
                </div>
                <div className="text-right">
                  <p className={`text-xs font-bold text-emerald-600`}>{p.amount}</p>
                  <StatusBadge status={p.status} theme={theme} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
