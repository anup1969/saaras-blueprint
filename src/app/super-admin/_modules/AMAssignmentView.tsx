'use client';

import React, { useState } from 'react';
import { StatCard, StatusBadge, DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  Building2, Plus, Check, X, TrendingUp, AlertTriangle, UserCog,
} from 'lucide-react';
import { schools } from './mockData';

// ─── AM MOCK DATA ──────────────────────────────────
const accountManagers = [
  { id: 'AM01', name: 'Farheen Shaikh', email: 'farheen@saaras.ai', schools: ['Delhi Public School', 'Navrachana Vidyani', 'Udgam School'], totalSchools: 3, capacity: 5, avgHealthScore: 85, lastActive: '30 min ago' },
  { id: 'AM02', name: 'Kunjal Patel', email: 'kunjal@saaras.ai', schools: ['Anand Niketan', 'Zydus School'], totalSchools: 2, capacity: 5, avgHealthScore: 82, lastActive: '4 hours ago' },
  { id: 'AM03', name: 'Riya Desai', email: 'riya@saaras.ai', schools: ['SAL International'], totalSchools: 1, capacity: 5, avgHealthScore: 0, lastActive: '1 day ago' },
  { id: 'AM04', name: 'Varun Mehta', email: 'varun@saaras.ai', schools: [], totalSchools: 0, capacity: 5, avgHealthScore: 0, lastActive: '2 days ago' },
];

const unassignedSchools = [
  { name: 'Calorx Olive, Ahmedabad', plan: 'Starter', status: 'Churned', students: 450 },
  { name: 'Bright Future Academy', plan: 'Professional', status: 'Onboarding', students: 0 },
  { name: 'Greenfield International', plan: 'Enterprise', status: 'Onboarding', students: 0 },
];

export default function AMAssignmentView({ theme }: { theme: Theme }) {
  const [showAssign, setShowAssign] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-bold ${theme.highlight}`}>Account Manager Assignment</h2>
          <p className={`text-xs ${theme.iconColor}`}>Assign and manage account managers for each school</p>
        </div>
        <button onClick={() => setShowAssign(!showAssign)} className={`flex items-center gap-2 px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>
          <Plus size={14} /> Assign AM
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={UserCog} label="Total AMs" value={accountManagers.length} color="bg-blue-500" theme={theme} />
        <StatCard icon={Building2} label="Assigned Schools" value={accountManagers.reduce((s, a) => s + a.totalSchools, 0)} color="bg-emerald-500" theme={theme} />
        <StatCard icon={AlertTriangle} label="Unassigned Schools" value={unassignedSchools.length} color="bg-amber-500" theme={theme} />
        <StatCard icon={TrendingUp} label="Avg Health Score" value="84%" color="bg-purple-500" sub="across managed schools" theme={theme} />
      </div>

      {/* Assign AM Modal */}
      {showAssign && (
        <div className={`${theme.cardBg} rounded-2xl border-2 border-blue-300 p-5 space-y-4`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Assign Account Manager</h3>
            <button onClick={() => setShowAssign(false)} className={`p-1.5 rounded-lg ${theme.buttonHover} ${theme.iconColor}`}><X size={16} /></button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Select School</label>
              <select className={`w-full px-3 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm ${theme.highlight} outline-none`}>
                <option value="">Choose school...</option>
                {unassignedSchools.map(s => <option key={s.name} value={s.name}>{s.name} ({s.status})</option>)}
                {schools.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Assign To</label>
              <select className={`w-full px-3 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm ${theme.highlight} outline-none`}>
                <option value="">Choose AM...</option>
                {accountManagers.map(am => (
                  <option key={am.id} value={am.id}>{am.name} ({am.totalSchools}/{am.capacity} schools)</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button onClick={() => setShowAssign(false)} className={`px-4 py-2 rounded-xl text-xs font-bold ${theme.secondaryBg} ${theme.highlight}`}>Cancel</button>
            <button onClick={() => { setShowAssign(false); window.alert('AM assigned successfully! (Blueprint demo)'); }} className={`flex items-center gap-2 px-5 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>
              <Check size={14} /> Assign
            </button>
          </div>
        </div>
      )}

      {/* AM List with Workload */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Account Managers — Workload</h3>
        <div className="space-y-3">
          {accountManagers.map(am => {
            const loadPct = Math.round((am.totalSchools / am.capacity) * 100);
            return (
              <div key={am.id} className={`p-4 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full ${theme.primary} text-white flex items-center justify-center text-xs font-bold`}>
                      {am.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className={`text-xs font-bold ${theme.highlight}`}>{am.name}</p>
                      <p className={`text-[10px] ${theme.iconColor}`}>{am.email} &middot; Last active: {am.lastActive}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-bold ${theme.highlight}`}>{am.totalSchools}/{am.capacity} schools</p>
                    {am.avgHealthScore > 0 && (
                      <p className={`text-[10px] font-bold ${am.avgHealthScore >= 80 ? 'text-emerald-600' : am.avgHealthScore >= 60 ? 'text-amber-600' : 'text-red-500'}`}>
                        Avg Health: {am.avgHealthScore}%
                      </p>
                    )}
                  </div>
                </div>
                {/* Workload Bar */}
                <div className="h-2 rounded-full bg-slate-200 overflow-hidden mb-2">
                  <div
                    className={`h-full rounded-full ${loadPct >= 80 ? 'bg-red-500' : loadPct >= 60 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                    style={{ width: `${loadPct}%` }}
                  />
                </div>
                {/* Schools list */}
                {am.schools.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {am.schools.map(s => (
                      <span key={s} className={`text-[10px] px-2 py-0.5 rounded-full ${theme.cardBg} border ${theme.border} ${theme.iconColor} font-medium`}>{s}</span>
                    ))}
                  </div>
                ) : (
                  <p className={`text-[10px] ${theme.iconColor}`}>No schools assigned yet</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Unassigned Schools */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3 flex items-center gap-2`}>
          <AlertTriangle size={14} className="text-amber-500" /> Unassigned Schools
        </h3>
        <DataTable
          headers={['School', 'Plan', 'Status', 'Students', '']}
          rows={unassignedSchools.map(s => [
            <span key="name" className={`text-xs font-bold ${theme.highlight}`}>{s.name}</span>,
            <span key="plan" className={`text-xs font-bold ${theme.primaryText}`}>{s.plan}</span>,
            <StatusBadge key="status" status={s.status} theme={theme} />,
            <span key="stu" className={`text-xs ${theme.iconColor}`}>{s.students > 0 ? s.students.toLocaleString() : '—'}</span>,
            <button key="assign" onClick={() => setShowAssign(true)} className={`text-xs ${theme.primaryText} font-bold`}>Assign →</button>,
          ])}
          theme={theme}
        />
      </div>
    </div>
  );
}
