'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { StatCard, TabBar, StatusBadge, DataTable } from '@/components/shared';
import {
  Calendar, CheckCircle,
  AlertTriangle, CreditCard, Download,
  IndianRupee,
} from 'lucide-react';
import type { ChildProfile } from '../_components/types';
import { feesData } from '../_components/data';

export default function FeesModule({ theme, child }: { theme: Theme; child: ChildProfile }) {
  const fees = feesData[child.id];
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className={`text-lg font-bold ${theme.highlight}`}>Fees &amp; Payments</h2>
        {fees.currentDue > 0 && (
          <button className="flex items-center gap-1 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-lg">
            <CreditCard size={14} /> Pay Now - Rs.{fees.currentDue.toLocaleString('en-IN')}
          </button>
        )}
      </div>

      <TabBar tabs={['Overview', 'Payment History', 'Upcoming', 'Fee Structure']} active={activeTab} onChange={setActiveTab} theme={theme} />
      <p className="text-[10px] text-amber-600 mb-2">Fee policy per SSA: Due 10th monthly · Late fee Rs.50/day (7-day grace) · Blocking: Report card if &gt;60 days overdue</p>

      {activeTab === 'Overview' && (
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-3">
            <StatCard icon={IndianRupee} label="Total Annual Fee" value={`Rs.${fees.totalAnnual.toLocaleString('en-IN')}`} color="bg-blue-500" theme={theme} />
            <StatCard icon={CheckCircle} label="Total Paid" value={`Rs.${fees.totalPaid.toLocaleString('en-IN')}`} color="bg-emerald-500" sub={`${Math.round((fees.totalPaid / fees.totalAnnual) * 100)}% paid`} theme={theme} />
            <StatCard icon={AlertTriangle} label="Current Due" value={fees.currentDue > 0 ? `Rs.${fees.currentDue.toLocaleString('en-IN')}` : 'Nil'} color={fees.currentDue > 0 ? 'bg-red-500' : 'bg-emerald-500'} theme={theme} />
            <StatCard icon={Calendar} label="Next Due Date" value={fees.nextDueDate} color="bg-purple-500" sub={`Rs.${fees.nextDueAmount.toLocaleString('en-IN')}`} theme={theme} />
          </div>

          {/* Progress */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Payment Progress</h3>
            <div className={`h-4 rounded-full ${theme.secondaryBg} overflow-hidden`}>
              <div className="h-4 rounded-full bg-emerald-500 transition-all flex items-center justify-center" style={{ width: `${(fees.totalPaid / fees.totalAnnual) * 100}%` }}>
                <span className="text-[9px] font-bold text-white">{Math.round((fees.totalPaid / fees.totalAnnual) * 100)}%</span>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <span className={`text-[10px] ${theme.iconColor}`}>Rs.0</span>
              <span className={`text-[10px] ${theme.iconColor}`}>Rs.{fees.totalAnnual.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Upcoming installments preview */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Upcoming Installments</h3>
            {fees.upcoming.map((inst, i) => (
              <div key={i} className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg} ${i > 0 ? 'mt-2' : ''}`}>
                <div className="flex items-center gap-3">
                  <Calendar size={14} className={theme.iconColor} />
                  <div>
                    <p className={`text-xs font-bold ${theme.highlight}`}>{inst.installment}</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>Due: {inst.dueDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${theme.highlight}`}>Rs.{inst.amount.toLocaleString('en-IN')}</p>
                  <StatusBadge status={inst.status} theme={theme} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Payment History' && (
        <DataTable
          headers={['Date', 'Description', 'Amount', 'Mode', 'Receipt No.', 'Status', 'Action']}
          rows={fees.payments.map(p => [
            <span key="dt" className={`text-xs ${theme.iconColor}`}>{p.date}</span>,
            <span key="desc" className={`font-bold ${theme.highlight}`}>{p.description}</span>,
            <span key="amt" className={`font-bold ${theme.highlight}`}>Rs.{p.amount.toLocaleString('en-IN')}</span>,
            <span key="mode" className={`text-xs ${theme.iconColor}`}>{p.mode}</span>,
            <span key="rec" className={`text-xs font-mono ${theme.primaryText}`}>{p.receiptNo}</span>,
            <StatusBadge key="st" status={p.status} theme={theme} />,
            <button key="dl" className={`flex items-center gap-1 text-xs ${theme.primaryText} font-bold`}>
              <Download size={12} /> Receipt
            </button>,
          ])}
          theme={theme}
        />
      )}

      {activeTab === 'Upcoming' && (
        <div className="space-y-3">
          {fees.upcoming.map((inst, i) => (
            <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`text-sm font-bold ${theme.highlight}`}>{inst.installment}</h3>
                  <p className={`text-xs ${theme.iconColor} mt-1`}>Due Date: {inst.dueDate}</p>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${theme.highlight}`}>Rs.{inst.amount.toLocaleString('en-IN')}</p>
                  <button className="mt-1 px-4 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition-all">
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'Fee Structure' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-4`}>Annual Fee Breakdown - Class {child.class}</h3>
          <div className="space-y-3">
            {fees.breakdown.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    i === 0 ? 'bg-blue-500' : i === 1 ? 'bg-emerald-500' : i === 2 ? 'bg-purple-500' : i === 3 ? 'bg-amber-500' : 'bg-pink-500'
                  }`} />
                  <span className={`text-sm ${theme.highlight}`}>{item.head}</span>
                </div>
                <span className={`text-sm font-bold ${theme.highlight}`}>Rs.{item.amount.toLocaleString('en-IN')}</span>
              </div>
            ))}
            <div className={`pt-3 mt-3 border-t ${theme.border} flex items-center justify-between`}>
              <span className={`text-sm font-bold ${theme.highlight}`}>Total Annual Fee</span>
              <span className={`text-lg font-bold ${theme.primaryText}`}>Rs.{fees.totalAnnual.toLocaleString('en-IN')}</span>
            </div>
          </div>
          {/* Visual bar */}
          <div className="flex rounded-full h-3 overflow-hidden mt-4">
            {fees.breakdown.map((item, i) => (
              <div
                key={i}
                className={`h-3 ${
                  i === 0 ? 'bg-blue-500' : i === 1 ? 'bg-emerald-500' : i === 2 ? 'bg-purple-500' : i === 3 ? 'bg-amber-500' : 'bg-pink-500'
                }`}
                style={{ width: `${(item.amount / fees.totalAnnual) * 100}%` }}
                title={`${item.head}: Rs.${item.amount.toLocaleString('en-IN')}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
