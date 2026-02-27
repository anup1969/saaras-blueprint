'use client';

import React, { useState } from 'react';
import { CheckCircle, Download } from 'lucide-react';
import { SectionCard, ModuleHeader } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

export default function SubscriptionMgmtModule({ theme }: { theme: Theme }) {
  const [selectedPlan, setSelectedPlan] = useState('Professional');
  const [planChangeSuccess, setPlanChangeSuccess] = useState<string | null>(null);
  const plans = [
    { name: 'Starter', price: '\u20B95/student/mo', students: '500', storage: '10 GB', sms: '1,000', features: ['Fees', 'Attendance', 'Exams', 'Communication', 'Basic Reports'] },
    { name: 'Professional', price: '\u20B98/student/mo', students: '2,000', storage: '50 GB', sms: '5,000', features: ['All Starter +', 'HR & Payroll', 'Transport', 'Timetable', 'Visitor', 'Advanced Reports', 'Parent Portal'] },
    { name: 'Enterprise', price: '\u20B912/student/mo', students: 'Unlimited', storage: '200 GB', sms: '20,000', features: ['All Professional +', 'LMS', 'Library', 'Hostel', 'Canteen', 'Alumni', 'API Access', 'White-label', 'Priority Support'] },
  ];
  const billingHistory = [
    { date: '01 Feb 2026', invoice: 'INV-2026-0201', amount: '\u20B916,000', status: 'Paid' },
    { date: '01 Jan 2026', invoice: 'INV-2026-0101', amount: '\u20B916,000', status: 'Paid' },
    { date: '01 Dec 2025', invoice: 'INV-2025-1201', amount: '\u20B916,000', status: 'Paid' },
    { date: '01 Nov 2025', invoice: 'INV-2025-1101', amount: '\u20B916,000', status: 'Paid' },
    { date: '01 Oct 2025', invoice: 'INV-2025-1001', amount: '\u20B914,000', status: 'Pending' },
  ];

  return (
    <div className="space-y-4">
      <ModuleHeader title="Subscription Management" subtitle="View your plan, usage, and billing history" theme={theme} />

      <SectionCard title="Current Plan" subtitle="Your active subscription details" theme={theme}>
        <div className={`p-4 rounded-xl ${theme.secondaryBg} flex items-center justify-between`}>
          <div>
            <p className={`text-lg font-bold ${theme.highlight}`}>Professional Plan</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Valid until: 31 Mar 2026 | Auto-renew: ON</p>
          </div>
          <div className="text-right">
            <p className={`text-xs font-bold ${theme.highlight}`}>2,000 students allowed</p>
            <p className={`text-[10px] ${theme.iconColor}`}>12 modules included</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Plan Comparison" subtitle="Compare plans and upgrade/downgrade" theme={theme}>
        <div className="grid grid-cols-3 gap-3">
          {plans.map(p => (
            <div key={p.name} onClick={() => setSelectedPlan(p.name)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedPlan === p.name ? `${theme.primary} text-white border-transparent` : `${theme.secondaryBg} ${theme.border}`}`}>
              <p className={`text-sm font-bold ${selectedPlan === p.name ? '' : theme.highlight}`}>{p.name}</p>
              <p className={`text-lg font-bold mt-1 ${selectedPlan === p.name ? '' : theme.highlight}`}>{p.price}</p>
              <p className={`text-[10px] mt-1 ${selectedPlan === p.name ? 'text-white/80' : theme.iconColor}`}>Up to {p.students} students</p>
              <div className="mt-3 space-y-1">
                {p.features.map(f => (
                  <p key={f} className={`text-[10px] flex items-center gap-1 ${selectedPlan === p.name ? 'text-white/90' : theme.iconColor}`}>
                    <CheckCircle size={10} /> {f}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
        {planChangeSuccess ? (
          <div className="mt-3 flex items-center gap-2 p-2 rounded-xl bg-emerald-50 border border-emerald-200">
            <CheckCircle size={14} className="text-emerald-600" />
            <span className="text-xs font-bold text-emerald-700">Plan change to {planChangeSuccess} requested. You&apos;ll receive a confirmation email shortly.</span>
            <button onClick={() => setPlanChangeSuccess(null)} className="ml-auto text-emerald-400 hover:text-emerald-600 text-xs">Dismiss</button>
          </div>
        ) : (
          <button onClick={() => { if (selectedPlan !== 'Professional') setPlanChangeSuccess(selectedPlan); }}
            className={`mt-3 px-4 py-2 rounded-xl text-xs font-bold text-white ${selectedPlan === 'Professional' ? 'bg-gray-400 cursor-not-allowed' : `${theme.primary} hover:opacity-90`} transition-all`}>
            {selectedPlan === 'Professional' ? 'Current Plan' : `Switch to ${selectedPlan}`}
          </button>
        )}
      </SectionCard>

      <SectionCard title="Usage Stats" subtitle="Current consumption against plan limits" theme={theme}>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Students', used: '1,247', limit: '2,000', pct: 62 },
            { label: 'Storage', used: '18.5 GB', limit: '50 GB', pct: 37 },
            { label: 'SMS Credits', used: '3,120', limit: '5,000', pct: 62 },
          ].map(u => (
            <div key={u.label} className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-[10px] font-bold ${theme.iconColor}`}>{u.label}</p>
              <p className={`text-sm font-bold ${theme.highlight} mt-1`}>{u.used} <span className={`text-[10px] font-normal ${theme.iconColor}`}>/ {u.limit}</span></p>
              <div className={`w-full h-1.5 rounded-full bg-gray-200 mt-2`}>
                <div className={`h-full rounded-full ${u.pct > 80 ? 'bg-rose-500' : u.pct > 50 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${u.pct}%` }} />
              </div>
              <p className={`text-[9px] ${theme.iconColor} mt-1`}>{u.pct}% used</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Billing History" subtitle="Past invoices and payment status" theme={theme}>
        <div className={`rounded-xl border ${theme.border} overflow-hidden`}>
          <table className="w-full text-xs">
            <thead className={theme.secondaryBg}>
              <tr>
                {['Date', 'Invoice', 'Amount', 'Status', 'Action'].map(h => (
                  <th key={h} className={`text-left px-4 py-2.5 font-bold ${theme.iconColor} text-[10px] uppercase`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {billingHistory.map((b, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className={`px-4 py-2.5 ${theme.iconColor} text-[10px]`}>{b.date}</td>
                  <td className={`px-4 py-2.5 font-bold ${theme.highlight}`}>{b.invoice}</td>
                  <td className={`px-4 py-2.5 font-bold ${theme.highlight}`}>{b.amount}</td>
                  <td className="px-4 py-2.5">
                    <span className={`text-[9px] px-2 py-0.5 rounded-lg font-bold ${b.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{b.status}</span>
                  </td>
                  <td className="px-4 py-2.5">
                    <button onClick={() => {
                      const a = document.createElement('a');
                      a.href = `data:text/plain;charset=utf-8,${encodeURIComponent(`Invoice: ${b.invoice}\nDate: ${b.date}\nAmount: ${b.amount}\nStatus: ${b.status}\n\nThis is a blueprint demo invoice.`)}`;
                      a.download = `${b.invoice}.txt`;
                      a.click();
                    }} className={`text-[10px] font-bold ${theme.iconColor} hover:underline flex items-center gap-1`}>
                      <Download size={10} /> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
