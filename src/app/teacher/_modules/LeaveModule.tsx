'use client';

import React, { useState } from 'react';
import { StatCard, TabBar, StatusBadge, DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  Plus, X, Send, CalendarDays, CheckCircle
} from 'lucide-react';

// ─── MOCK DATA ──────────────────────────────────────

const leaveBalance = [
  { type: 'Casual Leave', code: 'CL', used: 4, total: 12, color: 'bg-blue-500' },
  { type: 'Sick Leave', code: 'SL', used: 2, total: 10, color: 'bg-amber-500' },
  { type: 'Earned Leave', code: 'EL', used: 0, total: 15, color: 'bg-emerald-500' },
  { type: 'Maternity Leave', code: 'ML', used: 0, total: 180, color: 'bg-purple-500' },
];

const leaveHistory = [
  { id: 'LV001', type: 'CL', from: '15 Jan 2026', to: '16 Jan 2026', days: 2, reason: 'Family function', status: 'Approved', appliedOn: '12 Jan 2026' },
  { id: 'LV002', type: 'SL', from: '22 Jan 2026', to: '23 Jan 2026', days: 2, reason: 'Fever & cold', status: 'Approved', appliedOn: '22 Jan 2026' },
  { id: 'LV003', type: 'CL', from: '01 Feb 2026', to: '02 Feb 2026', days: 2, reason: 'Personal work', status: 'Approved', appliedOn: '28 Jan 2026' },
  { id: 'LV004', type: 'CL', from: '20 Feb 2026', to: '20 Feb 2026', days: 1, reason: 'Doctor appointment', status: 'Pending', appliedOn: '10 Feb 2026' },
];

export default function LeaveModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Leave Balance');
  const [showApply, setShowApply] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Leave Management</h1>
        <button
          onClick={() => setShowApply(!showApply)}
          className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}
        >
          <Plus size={14} /> Apply Leave
        </button>
      </div>
      <TabBar tabs={['Leave Balance', 'History', 'Calendar']} active={tab} onChange={setTab} theme={theme} />
      <p className="text-[10px] text-amber-600 mb-2">📋 Leave policy: Sandwich rule ON · Max consecutive: 5 days · Half-day: Allowed — as per SSA config</p>

      {/* Apply Leave Form */}
      {showApply && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-3`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Apply for Leave</h3>
            <button onClick={() => setShowApply(false)} className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><X size={14} className={theme.iconColor} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Leave Type</label>
              <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`}>
                <option>Casual Leave (CL)</option>
                <option>Sick Leave (SL)</option>
                <option>Earned Leave (EL)</option>
              </select>
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>From Date</label>
              <input type="date" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`} />
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>To Date</label>
              <input type="date" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`} />
            </div>
          </div>
          <div>
            <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Reason</label>
            <textarea
              rows={2}
              placeholder="Enter reason for leave..."
              className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none resize-none`}
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={() => setShowApply(false)} className={`px-4 py-2 rounded-xl ${theme.secondaryBg} text-sm font-bold ${theme.iconColor}`}>Cancel</button>
            <button className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Send size={14} /> Submit</button>
          </div>
        </div>
      )}

      {tab === 'Leave Balance' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {leaveBalance.map(l => (
              <div key={l.code} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${l.color} flex items-center justify-center text-white`}>
                    <CalendarDays size={18} />
                  </div>
                  <span className={`text-lg font-bold ${theme.highlight}`}>{l.total - l.used}/{l.total}</span>
                </div>
                <p className={`text-xs font-bold ${theme.highlight}`}>{l.type}</p>
                <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>{l.used} used | {l.total - l.used} remaining</p>
                <div className={`mt-2 w-full h-1.5 rounded-full ${theme.secondaryBg}`}>
                  <div className={`h-1.5 rounded-full ${l.color}`} style={{ width: `${(l.used / l.total) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-2`}>Leave Policy Summary</h3>
            <div className="space-y-1.5">
              {[
                'Casual Leave must be applied 2 days in advance (except emergency)',
                'Sick Leave beyond 2 days requires medical certificate',
                'Earned Leave can be encashed at end of year (max 10 days)',
                'Half-day leave allowed for CL only (before/after lunch)',
                'No leave during exam duty periods without Principal approval',
              ].map((rule, i) => (
                <div key={i} className={`flex items-start gap-2 text-xs ${theme.iconColor}`}>
                  <CheckCircle size={12} className="text-emerald-500 mt-0.5 shrink-0" />
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'History' && (
        <DataTable
          headers={['ID', 'Type', 'From', 'To', 'Days', 'Reason', 'Applied On', 'Status']}
          rows={leaveHistory.map(l => [
            <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{l.id}</span>,
            <span key="type" className={`text-xs font-bold ${theme.highlight}`}>{l.type}</span>,
            <span key="from" className={theme.iconColor}>{l.from}</span>,
            <span key="to" className={theme.iconColor}>{l.to}</span>,
            <span key="days" className={`font-bold ${theme.highlight}`}>{l.days}</span>,
            <span key="reason" className={`text-xs ${theme.iconColor}`}>{l.reason}</span>,
            <span key="applied" className={theme.iconColor}>{l.appliedOn}</span>,
            <StatusBadge key="status" status={l.status} theme={theme} />,
          ])}
          theme={theme}
        />
      )}

      {tab === 'Calendar' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Leave Calendar — 2026</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => {
              const hasLeave = i === 0 || i === 1;
              return (
                <div key={m} className={`p-3 rounded-xl border ${theme.border} text-center ${hasLeave ? 'ring-1 ring-amber-300' : ''}`}>
                  <p className={`text-xs font-bold ${theme.highlight}`}>{m}</p>
                  {i === 0 && <p className="text-[9px] text-amber-600 font-bold mt-1">4 days</p>}
                  {i === 1 && <p className="text-[9px] text-amber-600 font-bold mt-1">2 days + 1 pending</p>}
                  {!hasLeave && <p className={`text-[9px] ${theme.iconColor} mt-1`}>No leave</p>}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
