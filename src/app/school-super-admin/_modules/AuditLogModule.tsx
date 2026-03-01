'use client';
import React, { useState } from 'react';
import { Lock, Download, ShieldAlert, Monitor, RotateCcw, LogOut } from 'lucide-react';
import { InputField, SelectField, SSAToggle, SectionCard } from '../_helpers/components';
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

  // Security Monitoring state
  const [autoLockout, setAutoLockout] = useState(true);
  const [lockoutThreshold, setLockoutThreshold] = useState('5');
  const [lockoutDuration, setLockoutDuration] = useState('30 min');
  const [ipBlocking, setIpBlocking] = useState(false);
  const [maxConcurrentSessions, setMaxConcurrentSessions] = useState('3');
  const [sessionTimeout, setSessionTimeout] = useState('1 hr');

  const failedLogins = [
    { username: 'ravi.patel@school.com', ip: '103.45.67.89', time: '01 Mar 2026 09:15', location: 'Mumbai', attempts: 5 },
    { username: 'admin@demo.edu', ip: '192.168.1.45', time: '01 Mar 2026 08:42', location: 'Delhi', attempts: 3 },
    { username: 'teacher.singh@school.com', ip: '45.123.98.12', time: '28 Feb 2026 17:30', location: 'Bangalore', attempts: 7 },
    { username: 'parent.gupta@gmail.com', ip: '72.34.56.78', time: '28 Feb 2026 14:20', location: 'Ahmedabad', attempts: 4 },
    { username: 'unknown_user', ip: '91.240.118.5', time: '28 Feb 2026 03:15', location: 'Unknown', attempts: 12 },
  ];

  const activeSessions = [
    { username: 'Piush Thakker', device: 'Chrome / Windows 11', ip: '103.45.67.89', loginTime: '01 Mar 2026 08:30', status: 'Active' },
    { username: 'Rajesh Kumar', device: 'Safari / macOS', ip: '192.168.1.100', loginTime: '01 Mar 2026 09:00', status: 'Active' },
    { username: 'Priya Sharma', device: 'Mobile App / Android', ip: '45.67.89.12', loginTime: '28 Feb 2026 16:45', status: 'Active' },
    { username: 'System Cron', device: 'API Client', ip: '10.0.0.1', loginTime: '01 Mar 2026 00:00', status: 'Expired' },
  ];

  // Bulk Operation Audit state
  const bulkOperations = [
    { operation: 'Student bulk import', records: 245, user: 'Piush Thakker', timestamp: '01 Mar 2026 10:30', status: 'Success', hoursAgo: 2 },
    { operation: 'Fee structure update', records: 12, user: 'Rajesh Kumar', timestamp: '01 Mar 2026 08:15', status: 'Success', hoursAgo: 4 },
    { operation: 'Attendance bulk upload', records: 1200, user: 'Priya Sharma', timestamp: '28 Feb 2026 15:00', status: 'Partial', hoursAgo: 22 },
    { operation: 'Staff data import', records: 45, user: 'Piush Thakker', timestamp: '27 Feb 2026 11:00', status: 'Success', hoursAgo: 50 },
    { operation: 'Grade sheet import', records: 320, user: 'Rajesh Kumar', timestamp: '26 Feb 2026 14:30', status: 'Failed', hoursAgo: 68 },
  ];

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

      {/* ─── NEW: Security Monitoring ──────────────────────── */}
      <SectionCard title="Security Monitoring" subtitle="Track failed logins, active sessions, and access control policies" theme={theme}>
        <div className="grid grid-cols-2 gap-4">
          {/* Left: Failed Login Tracking */}
          <div className="space-y-3">
            <p className={`text-[10px] font-bold ${theme.iconColor} uppercase tracking-wider flex items-center gap-1.5`}><ShieldAlert size={12} /> Failed Login Tracking</p>

            <div className={`rounded-xl border ${theme.border} overflow-hidden`}>
              <table className="w-full text-[10px]">
                <thead className={theme.secondaryBg}>
                  <tr>
                    {['Username', 'IP Address', 'Time', 'Location', 'Attempts'].map(h => (
                      <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor} text-[9px] uppercase`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {failedLogins.map((fl, i) => (
                    <tr key={i} className={`border-t ${theme.border}`}>
                      <td className={`px-3 py-2 font-bold ${theme.highlight} truncate max-w-[120px]`} title={fl.username}>{fl.username}</td>
                      <td className={`px-3 py-2 ${theme.iconColor} font-mono`}>{fl.ip}</td>
                      <td className={`px-3 py-2 ${theme.iconColor} whitespace-nowrap`}>{fl.time}</td>
                      <td className={`px-3 py-2 ${theme.iconColor}`}>{fl.location}</td>
                      <td className="px-3 py-2">
                        <span className={`text-[9px] px-2 py-0.5 rounded-lg font-bold ${fl.attempts >= 10 ? 'bg-red-100 text-red-700' : fl.attempts >= 5 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                          {fl.attempts}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={`p-3 rounded-xl ${theme.secondaryBg} space-y-2`}>
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold ${theme.highlight}`}>Auto-lockout</span>
                <SSAToggle on={autoLockout} onChange={() => setAutoLockout(!autoLockout)} theme={theme} />
              </div>
              {autoLockout && (
                <>
                  <div>
                    <p className={`text-[10px] ${theme.iconColor} mb-1`}>Lock after failed attempts</p>
                    <SelectField options={['3', '5', '10']} value={lockoutThreshold} onChange={setLockoutThreshold} theme={theme} />
                  </div>
                  <div>
                    <p className={`text-[10px] ${theme.iconColor} mb-1`}>Lockout duration</p>
                    <SelectField options={['15 min', '30 min', '1 hr', 'Until admin unlock']} value={lockoutDuration} onChange={setLockoutDuration} theme={theme} />
                  </div>
                </>
              )}
              <div className="flex items-center justify-between">
                <span className={`text-[10px] ${theme.iconColor}`}>IP-based blocking</span>
                <SSAToggle on={ipBlocking} onChange={() => setIpBlocking(!ipBlocking)} theme={theme} />
              </div>
            </div>
          </div>

          {/* Right: Session Management */}
          <div className="space-y-3">
            <p className={`text-[10px] font-bold ${theme.iconColor} uppercase tracking-wider flex items-center gap-1.5`}><Monitor size={12} /> Session Management</p>

            <div className={`rounded-xl border ${theme.border} overflow-hidden`}>
              <table className="w-full text-[10px]">
                <thead className={theme.secondaryBg}>
                  <tr>
                    {['Username', 'Device', 'IP', 'Login Time', 'Status'].map(h => (
                      <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor} text-[9px] uppercase`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {activeSessions.map((s, i) => (
                    <tr key={i} className={`border-t ${theme.border}`}>
                      <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{s.username}</td>
                      <td className={`px-3 py-2 ${theme.iconColor}`}>{s.device}</td>
                      <td className={`px-3 py-2 ${theme.iconColor} font-mono`}>{s.ip}</td>
                      <td className={`px-3 py-2 ${theme.iconColor} whitespace-nowrap`}>{s.loginTime}</td>
                      <td className="px-3 py-2">
                        <span className={`text-[9px] px-2 py-0.5 rounded-lg font-bold ${s.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={`p-3 rounded-xl ${theme.secondaryBg} space-y-2`}>
              <div>
                <p className={`text-[10px] ${theme.iconColor} mb-1`}>Max concurrent sessions per user</p>
                <SelectField options={['1', '2', '3', '5']} value={maxConcurrentSessions} onChange={setMaxConcurrentSessions} theme={theme} />
              </div>
              <div>
                <p className={`text-[10px] ${theme.iconColor} mb-1`}>Session timeout</p>
                <SelectField options={['15 min', '30 min', '1 hr', '4 hrs', 'Never']} value={sessionTimeout} onChange={setSessionTimeout} theme={theme} />
              </div>
              <button className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold text-white bg-red-500 hover:bg-red-600 transition-all`}>
                <LogOut size={12} /> Force Logout All Sessions
              </button>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ─── NEW: Bulk Operation Audit ─────────────────────── */}
      <SectionCard title="Bulk Operation Audit" subtitle="Track bulk imports, updates, and rollback availability" theme={theme}>
        <div className={`rounded-xl border ${theme.border} overflow-hidden`}>
          <table className="w-full text-xs">
            <thead className={theme.secondaryBg}>
              <tr>
                {['Operation', 'Records Affected', 'User', 'Timestamp', 'Status', 'Rollback'].map(h => (
                  <th key={h} className={`text-left px-4 py-2.5 font-bold ${theme.iconColor} text-[10px] uppercase`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bulkOperations.map((op, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className={`px-4 py-2.5 font-bold ${theme.highlight}`}>{op.operation}</td>
                  <td className={`px-4 py-2.5 ${theme.highlight}`}>{op.records.toLocaleString()}</td>
                  <td className={`px-4 py-2.5 ${theme.iconColor} text-[10px]`}>{op.user}</td>
                  <td className={`px-4 py-2.5 ${theme.iconColor} text-[10px] whitespace-nowrap`}>{op.timestamp}</td>
                  <td className="px-4 py-2.5">
                    <span className={`text-[9px] px-2 py-0.5 rounded-lg font-bold ${
                      op.status === 'Success' ? 'bg-emerald-100 text-emerald-700' :
                      op.status === 'Partial' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>{op.status}</span>
                  </td>
                  <td className="px-4 py-2.5">
                    {op.hoursAgo <= 24 ? (
                      <button className="flex items-center gap-1 text-[10px] font-bold text-red-500 hover:underline">
                        <RotateCcw size={10} /> Rollback
                      </button>
                    ) : (
                      <span className={`text-[10px] ${theme.iconColor}`}>Expired</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={`text-[9px] ${theme.iconColor} mt-2 italic`}>Rollback is available for 24 hours after the operation. After that, contact Saaras Account Manager for manual recovery.</p>
      </SectionCard>
    </div>
  );
}
