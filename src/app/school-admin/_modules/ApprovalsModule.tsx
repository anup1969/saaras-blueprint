'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { StatCard, StatusBadge, TabBar, Toggle } from '@/components/shared';
import { mockApprovals } from '@/lib/mock-data';
import { Clock, AlertTriangle, CheckCircle, XCircle, Check, X, ArrowRight } from 'lucide-react';

export default function ApprovalsModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Pending');
  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Approvals</h1>
      <TabBar tabs={['Pending', 'Completed', 'Workflows']} active={tab} onChange={setTab} theme={theme} />
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={Clock} label="Pending" value="8" color="bg-amber-500" theme={theme} />
        <StatCard icon={AlertTriangle} label="Urgent" value="2" color="bg-red-500" theme={theme} />
        <StatCard icon={CheckCircle} label="Today Approved" value="5" color="bg-emerald-500" theme={theme} />
        <StatCard icon={XCircle} label="Rejected" value="1" color="bg-slate-500" theme={theme} />
      </div>
      {tab === 'Pending' && mockApprovals.map((a, i) => (
        <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <StatusBadge status={a.priority} theme={theme} />
              <span className={`text-xs ${theme.iconColor}`}>{a.time}</span>
            </div>
            <span className={`text-xs font-bold ${theme.secondaryBg} px-2 py-1 rounded-lg ${theme.iconColor}`}>{a.type}</span>
          </div>
          <p className={`text-sm font-bold ${theme.highlight}`}>{a.detail}</p>
          <p className={`text-xs ${theme.iconColor} mt-1`}>From: {a.from}</p>
          <div className="flex gap-2 mt-3">
            <button className="px-3 py-1.5 rounded-xl bg-emerald-500 text-white text-xs font-bold flex items-center gap-1"><Check size={10} /> Approve</button>
            <button className="px-3 py-1.5 rounded-xl bg-red-500 text-white text-xs font-bold flex items-center gap-1"><X size={10} /> Reject</button>
            <button className={`px-3 py-1.5 rounded-xl border ${theme.border} text-xs font-bold ${theme.highlight}`}>View Details</button>
          </div>
        </div>
      ))}
      {tab === 'Workflows' && (
        <div className="space-y-3">
          {[
            { name: 'Leave Approval', steps: ['Employee', 'HOD', 'Admin/Principal'], active: true },
            { name: 'Purchase Order', steps: ['Requester', 'Admin', 'Trustee (>₹50K)'], active: true },
            { name: 'TC/Certificate', steps: ['Front Desk', 'Admin', 'Principal'], active: true },
          ].map((w, i) => (
            <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className={`text-sm font-bold ${theme.highlight}`}>{w.name}</h4>
                <Toggle on={w.active} onChange={() => {}} theme={theme} />
              </div>
              <div className="flex items-center gap-2">
                {w.steps.map((s, si) => (
                  <React.Fragment key={si}>
                    <span className={`text-xs px-3 py-1.5 rounded-xl ${theme.secondaryBg} ${theme.highlight} font-bold`}>{s}</span>
                    {si < w.steps.length - 1 && <ArrowRight size={14} className={theme.iconColor} />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
