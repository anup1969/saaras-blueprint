'use client';
import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import type { Theme } from '../_helpers/types';

export default function AuditLogModule({ theme }: { theme: Theme }) {
  const [filterModule, setFilterModule] = useState('All');
  const [logs] = useState([
    { date: '18 Feb 2026 14:30', action: 'Updated', module: 'Fees', details: 'Changed Class 9-10 Tuition Fee: 5000 to 5500', user: 'admin@school.com' },
    { date: '18 Feb 2026 11:15', action: 'Created', module: 'Transport', details: 'Added Route D: 10 stops, 45 capacity', user: 'admin@school.com' },
    { date: '17 Feb 2026 16:45', action: 'Updated', module: 'Leave', details: 'Modified approval chain: Added VP as Level 2', user: 'admin@school.com' },
    { date: '17 Feb 2026 10:20', action: 'Uploaded', module: 'Exams', details: 'Report card template: CBSE standard v2', user: 'admin@school.com' },
    { date: '16 Feb 2026 09:00', action: 'Updated', module: 'Communication', details: 'DM permission: Parent to Teacher set to ON', user: 'admin@school.com' },
    { date: '15 Feb 2026 15:30', action: 'Created', module: 'HR', details: 'New department: Sports', user: 'admin@school.com' },
    { date: '15 Feb 2026 11:00', action: 'Updated', module: 'Attendance', details: 'Grace period changed: 10 min to 15 min', user: 'admin@school.com' },
    { date: '14 Feb 2026 14:00', action: 'Deleted', module: 'Transport', details: 'Removed Route X (no students assigned)', user: 'admin@school.com' },
  ]);

  const filteredLogs = filterModule === 'All' ? logs : logs.filter(l => l.module === filterModule);
  const allModules = ['All', ...Array.from(new Set(logs.map(l => l.module)))];

  return (
    <div className="space-y-4">
      <h2 className={`text-lg font-bold ${theme.highlight}`}>Audit Log</h2>
      <p className={`text-xs ${theme.iconColor}`}>Read-only view of configuration changes (limited subset for SSA)</p>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-start gap-2">
        <Lock size={14} className="text-amber-500 mt-0.5 shrink-0" />
        <p className="text-xs text-amber-700">Full audit logs with IP addresses and before/after values are accessible only to Saaras Account Manager. You can view a summary of recent changes here.</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          {allModules.map(m => (
            <button key={m} onClick={() => setFilterModule(m)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filterModule === m ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.highlight}`}`}>
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden`}>
        <table className="w-full text-xs">
          <thead className={theme.secondaryBg}>
            <tr>
              {['Date / Time', 'Action', 'Module', 'Details', 'User'].map(h => (
                <th key={h} className={`text-left px-4 py-3 font-bold ${theme.iconColor} uppercase text-[10px]`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log, i) => (
              <tr key={i} className={`border-t ${theme.border}`}>
                <td className={`px-4 py-3 ${theme.iconColor} text-[10px] whitespace-nowrap`}>{log.date}</td>
                <td className="px-4 py-3">
                  <span className={`text-[9px] px-2 py-0.5 rounded-lg font-bold ${
                    log.action === 'Created' ? 'bg-emerald-100 text-emerald-700' :
                    log.action === 'Updated' ? 'bg-blue-100 text-blue-700' :
                    log.action === 'Deleted' ? 'bg-red-100 text-red-700' : 'bg-purple-100 text-purple-700'
                  }`}>{log.action}</span>
                </td>
                <td className={`px-4 py-3 font-bold ${theme.highlight}`}>{log.module}</td>
                <td className={`px-4 py-3 ${theme.highlight}`}>{log.details}</td>
                <td className={`px-4 py-3 ${theme.iconColor} text-[10px]`}>{log.user}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
