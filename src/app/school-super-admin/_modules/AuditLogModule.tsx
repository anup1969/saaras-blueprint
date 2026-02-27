'use client';
import React, { useState } from 'react';
import { Lock, Download } from 'lucide-react';
import { InputField, SelectField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

export default function AuditLogModule({ theme }: { theme: Theme }) {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [userFilter, setUserFilter] = useState('All Users');
  const [moduleFilter, setModuleFilter] = useState('All Modules');
  const [searchQuery, setSearchQuery] = useState('');
  const [logs] = useState([
    { date: '18 Feb 2026 14:30', action: 'Updated', module: 'Fees', details: 'Changed Class 9-10 Tuition Fee: 5000 to 5500', user: 'Piush Thakker' },
    { date: '18 Feb 2026 11:15', action: 'Created', module: 'Transport', details: 'Added Route D: 10 stops, 45 capacity', user: 'Rajesh Kumar' },
    { date: '17 Feb 2026 16:45', action: 'Updated', module: 'Leave', details: 'Modified approval chain: Added VP as Level 2', user: 'Piush Thakker' },
    { date: '17 Feb 2026 10:20', action: 'Uploaded', module: 'Exams', details: 'Report card template: CBSE standard v2', user: 'Priya Sharma' },
    { date: '16 Feb 2026 09:00', action: 'Updated', module: 'Chat', details: 'DM permission: Parent to Teacher set to ON', user: 'Piush Thakker' },
    { date: '15 Feb 2026 15:30', action: 'Created', module: 'HR', details: 'New department: Sports', user: 'Rajesh Kumar' },
    { date: '15 Feb 2026 11:00', action: 'Updated', module: 'Attendance', details: 'Grace period changed: 10 min to 15 min', user: 'System' },
    { date: '14 Feb 2026 14:00', action: 'Deleted', module: 'Transport', details: 'Removed Route X (no students assigned)', user: 'Piush Thakker' },
  ]);

  const filteredLogs = logs;
  const totalRecords = 247;

  return (
    <div className="space-y-4">
      <h2 className={`text-lg font-bold ${theme.highlight}`}>Audit Log</h2>
      <p className={`text-xs ${theme.iconColor}`}>Read-only view of configuration changes (limited subset for SSA)</p>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-start gap-2">
        <Lock size={14} className="text-amber-500 mt-0.5 shrink-0" />
        <p className="text-xs text-amber-700">Full audit logs with IP addresses and before/after values are accessible only to Saaras Account Manager. You can view a summary of recent changes here.</p>
      </div>

      {/* Filter Bar */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="grid grid-cols-4 gap-3 mb-3">
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Date Range</p>
            <div className="flex gap-1">
              <InputField type="date" value={dateFrom} onChange={setDateFrom} theme={theme} placeholder="From" />
              <InputField type="date" value={dateTo} onChange={setDateTo} theme={theme} placeholder="To" />
            </div>
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>User</p>
            <SelectField options={['All Users', 'Piush Thakker', 'Rajesh Kumar', 'Priya Sharma', 'System']} value={userFilter} onChange={setUserFilter} theme={theme} />
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Module</p>
            <SelectField options={['All Modules', 'Fees', 'Transport', 'Leave', 'Exams', 'Chat', 'Attendance', 'HR', 'Roles']} value={moduleFilter} onChange={setModuleFilter} theme={theme} />
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Search</p>
            <InputField value={searchQuery} onChange={setSearchQuery} theme={theme} placeholder="Search audit logs..." />
          </div>
        </div>
      </div>

      {/* Record count + Export */}
      <div className="flex items-center justify-between">
        <p className={`text-xs ${theme.iconColor}`}>
          Showing <span className={`font-bold ${theme.highlight}`}>{filteredLogs.length}</span> of <span className={`font-bold ${theme.highlight}`}>{totalRecords}</span> records
        </p>
        <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${theme.secondaryBg} ${theme.highlight} border ${theme.border} hover:opacity-80 transition-all`}>
          <Download size={12} /> Export CSV
        </button>
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
