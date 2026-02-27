'use client';

import { DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import { Filter, Download } from 'lucide-react';
import { auditLogs } from './mockData';

export default function AuditLogsView({ theme }: { theme: Theme }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-bold ${theme.highlight}`}>Audit Logs</h2>
          <p className={`text-xs ${theme.iconColor}`}>Platform activity trail — Today</p>
        </div>
        <div className="flex gap-2">
          <button className={`flex items-center gap-2 px-3 py-2 ${theme.secondaryBg} rounded-xl text-xs font-medium ${theme.highlight}`}>
            <Filter size={12} /> Filter
          </button>
          <button className={`flex items-center gap-2 px-3 py-2 ${theme.secondaryBg} rounded-xl text-xs font-medium ${theme.highlight}`}>
            <Download size={12} /> Export
          </button>
        </div>
      </div>

      <DataTable
        headers={['Time', 'User', 'Action', 'Target', 'IP']}
        rows={auditLogs.map(log => [
          <span key="t" className={`text-xs font-mono ${theme.iconColor}`}>{log.time}</span>,
          <span key="u" className={`text-xs font-bold ${log.user === 'System' ? theme.primaryText : theme.highlight}`}>{log.user}</span>,
          <span key="a" className={`text-xs ${theme.highlight}`}>{log.action}</span>,
          <span key="tar" className={`text-xs ${theme.iconColor}`}>{log.target}</span>,
          <span key="ip" className={`text-xs font-mono ${theme.iconColor}`}>{log.ip}</span>,
        ])}
        theme={theme}
      />

      {/* System Events */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>System Events (Last 7 days)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-lg font-bold ${theme.highlight}`}>342</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Total Actions</p>
          </div>
          <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-lg font-bold ${theme.highlight}`}>5</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Active Admins</p>
          </div>
          <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-lg font-bold text-emerald-600`}>0</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Security Alerts</p>
          </div>
          <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-lg font-bold ${theme.highlight}`}>3</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Deployments</p>
          </div>
        </div>
      </div>
    </div>
  );
}
