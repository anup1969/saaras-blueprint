'use client';

import { StatCard, StatusBadge, DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import { Clock, AlertTriangle, CheckCircle, Check, X } from 'lucide-react';

export default function ApprovalsModule({ theme }: { theme: Theme }) {
  const pendingApprovals = [
    {
      id: 1, type: 'Leave', requestedBy: 'Ms. Sunita Verma', date: '10-Feb-2026',
      details: 'Casual Leave — 3 days (12-Feb to 14-Feb) for family function',
      priority: 'Normal',
    },
    {
      id: 2, type: 'Purchase', requestedBy: 'Rajesh Kumar (Admin)', date: '09-Feb-2026',
      details: 'Lab equipment purchase — 5 microscopes @ Rs. 8,500 each (Total: Rs. 42,500)',
      priority: 'High',
    },
    {
      id: 3, type: 'Event', requestedBy: 'Dr. Priya Sharma (HOD)', date: '08-Feb-2026',
      details: 'Inter-school Science Exhibition — 25-Feb-2026, estimated budget Rs. 35,000',
      priority: 'Normal',
    },
    {
      id: 4, type: 'Transfer', requestedBy: 'Front Desk', date: '07-Feb-2026',
      details: 'Transfer Certificate request — Meera Nair (Class 8-A), reason: family relocation',
      priority: 'Urgent',
    },
    {
      id: 5, type: 'Leave', requestedBy: 'Mr. Mohammed Irfan (Transport)', date: '06-Feb-2026',
      details: 'Medical Leave — 5 days (15-Feb to 19-Feb), medical certificate attached',
      priority: 'High',
    },
  ];

  const approvalHistory = [
    { type: 'Leave', requestedBy: 'Mr. Vikram Singh', date: '05-Feb-2026', details: 'Casual Leave — 1 day', decision: 'Approved', decidedOn: '05-Feb-2026' },
    { type: 'Purchase', requestedBy: 'Lab Dept.', date: '03-Feb-2026', details: 'Chemistry lab reagents — Rs. 12,000', decision: 'Approved', decidedOn: '04-Feb-2026' },
    { type: 'Event', requestedBy: 'Sports Dept.', date: '01-Feb-2026', details: 'Annual Sports Day prep — Rs. 85,000', decision: 'Approved', decidedOn: '02-Feb-2026' },
    { type: 'Leave', requestedBy: 'Ms. Kavita Desai', date: '30-Jan-2026', details: 'Sick Leave — 2 days', decision: 'Approved', decidedOn: '30-Jan-2026' },
    { type: 'Purchase', requestedBy: 'IT Dept.', date: '28-Jan-2026', details: 'Projector replacement — Rs. 55,000', decision: 'Rejected', decidedOn: '29-Jan-2026' },
  ];

  const priorityColor = (priority: string) => {
    if (priority === 'Urgent') return 'bg-red-100 text-red-700';
    if (priority === 'High') return 'bg-amber-100 text-amber-700';
    return 'bg-blue-100 text-blue-700';
  };

  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Approvals</h1>
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={Clock} label="Pending" value="5" color="bg-amber-500" theme={theme} />
        <StatCard icon={AlertTriangle} label="Urgent" value="1" color="bg-red-500" theme={theme} />
        <StatCard icon={CheckCircle} label="Approved This Week" value="4" color="bg-emerald-500" theme={theme} />
        <StatCard icon={X} label="Rejected This Week" value="1" color="bg-slate-500" theme={theme} />
      </div>

      {/* Pending Approvals */}
      <div>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Pending Approvals</h3>
        <div className="space-y-3">
          {pendingApprovals.map(a => (
            <div key={a.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${priorityColor(a.priority)}`}>{a.priority}</span>
                  <span className={`text-xs font-bold ${theme.secondaryBg} px-2 py-1 rounded-lg ${theme.iconColor}`}>{a.type}</span>
                </div>
                <span className={`text-xs ${theme.iconColor}`}>{a.date}</span>
              </div>
              <p className={`text-sm font-bold ${theme.highlight}`}>{a.details}</p>
              <p className={`text-xs ${theme.iconColor} mt-1`}>Requested by: {a.requestedBy}</p>
              <div className="flex gap-2 mt-3">
                <button className="px-3 py-1.5 rounded-xl bg-emerald-500 text-white text-xs font-bold flex items-center gap-1"><Check size={10} /> Approve</button>
                <button className="px-3 py-1.5 rounded-xl bg-red-500 text-white text-xs font-bold flex items-center gap-1"><X size={10} /> Reject</button>
                <button className={`px-3 py-1.5 rounded-xl border ${theme.border} text-xs font-bold ${theme.highlight}`}>View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Approval History */}
      <div>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Approval History</h3>
        <DataTable
          headers={['Type', 'Requested By', 'Date', 'Details', 'Decision', 'Decided On']}
          rows={approvalHistory.map(h => [
            <span key="type" className={`text-xs font-bold ${theme.secondaryBg} px-2 py-1 rounded-lg ${theme.iconColor}`}>{h.type}</span>,
            <span key="by" className={`font-bold ${theme.highlight}`}>{h.requestedBy}</span>,
            <span key="date" className={theme.iconColor}>{h.date}</span>,
            <span key="details" className={`text-xs ${theme.highlight}`}>{h.details}</span>,
            <StatusBadge key="decision" status={h.decision} theme={theme} />,
            <span key="decided" className={theme.iconColor}>{h.decidedOn}</span>,
          ])}
          theme={theme}
        />
      </div>
    </div>
  );
}
