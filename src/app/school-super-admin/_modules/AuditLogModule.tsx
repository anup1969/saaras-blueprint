'use client';
import React, { useState } from 'react';
import { Lock, Download, ShieldAlert, Monitor, RotateCcw, LogOut, ChevronLeft, ChevronRight, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { InputField, SelectField, SSAToggle, SectionCard } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

const PAGE_SIZE = 8;

export default function AuditLogModule({ theme }: { theme: Theme }) {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [userFilter, setUserFilter] = useState('All Users');
  const [moduleFilter, setModuleFilter] = useState('All Modules');
  const [searchQuery, setSearchQuery] = useState('');
  const [ipFilter, setIpFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [logs] = useState([
    { date: '05 Mar 2026 10:30', action: 'Updated', module: 'Fees', details: 'Fee Template changed to Component-Based', user: 'Piush Thakker', ip: '103.45.67.89' },
    { date: '05 Mar 2026 09:15', action: 'Created', module: 'Fees', details: 'Added Term Master: Term 1, Term 2, Term 3', user: 'Piush Thakker', ip: '103.45.67.89' },
    { date: '04 Mar 2026 16:00', action: 'Updated', module: 'Roles', details: 'Changed role permissions: Teacher → can view reports', user: 'Piush Thakker', ip: '103.45.67.89' },
    { date: '04 Mar 2026 14:30', action: 'Updated', module: 'Communication', details: 'Enabled WhatsApp notifications for fee reminders', user: 'Rajesh Kumar', ip: '192.168.1.100' },
    { date: '03 Mar 2026 11:15', action: 'Created', module: 'Transport', details: 'Added Route D: 10 stops, 45 capacity', user: 'Rajesh Kumar', ip: '192.168.1.100' },
    { date: '03 Mar 2026 09:45', action: 'Updated', module: 'Attendance', details: 'Grace period changed: 10 min to 15 min', user: 'System', ip: '10.0.0.1' },
    { date: '02 Mar 2026 16:45', action: 'Updated', module: 'Leave', details: 'Modified approval chain: Added VP as Level 2', user: 'Piush Thakker', ip: '103.45.67.89' },
    { date: '02 Mar 2026 10:20', action: 'Uploaded', module: 'Exams', details: 'Report card template: CBSE standard v2', user: 'Priya Sharma', ip: '45.67.89.12' },
    { date: '01 Mar 2026 15:30', action: 'Created', module: 'HR', details: 'New department: Sports', user: 'Rajesh Kumar', ip: '192.168.1.100' },
    { date: '01 Mar 2026 14:00', action: 'Deleted', module: 'Transport', details: 'Removed Route X (no students assigned)', user: 'Piush Thakker', ip: '103.45.67.89' },
    { date: '28 Feb 2026 11:00', action: 'Updated', module: 'Timetable', details: 'Bell schedule: Period 5 moved to 11:45-12:30', user: 'Priya Sharma', ip: '45.67.89.12' },
    { date: '28 Feb 2026 09:00', action: 'Updated', module: 'Chat', details: 'DM permission: Parent to Teacher set to ON', user: 'Piush Thakker', ip: '103.45.67.89' },
    { date: '27 Feb 2026 15:00', action: 'Created', module: 'Library', details: 'Added 120 books via bulk import', user: 'Rajesh Kumar', ip: '192.168.1.100' },
    { date: '27 Feb 2026 10:30', action: 'Updated', module: 'Enquiry', details: 'Enquiry pipeline stage added: Document Verification', user: 'Piush Thakker', ip: '103.45.67.89' },
    { date: '26 Feb 2026 14:00', action: 'Updated', module: 'Visitor', details: 'Visitor check-out made mandatory', user: 'Rajesh Kumar', ip: '192.168.1.100' },
    { date: '26 Feb 2026 09:30', action: 'Updated', module: 'Canteen', details: 'Menu updated for March 2026', user: 'System', ip: '10.0.0.1' },
  ]);

  const allModules = ['All Modules', 'Fees', 'Transport', 'Leave', 'Exams', 'Chat', 'Attendance', 'HR', 'Roles', 'Communication', 'Timetable', 'Library', 'Enquiry', 'Visitor', 'Canteen', 'Inventory', 'Hostel', 'LMS', 'Health', 'Branding'];
  const allUsers = ['All Users', ...Array.from(new Set(logs.map(l => l.user)))];

  const filteredLogs = logs.filter(log => {
    if (userFilter !== 'All Users' && log.user !== userFilter) return false;
    if (moduleFilter !== 'All Modules' && log.module !== moduleFilter) return false;
    if (searchQuery && !log.details.toLowerCase().includes(searchQuery.toLowerCase()) && !log.action.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (ipFilter && !log.ip.includes(ipFilter)) return false;
    return true;
  });

  // Reset to page 1 when filters change
  const totalFiltered = filteredLogs.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const pageEnd = Math.min(pageStart + PAGE_SIZE, totalFiltered);
  const pageLogs = filteredLogs.slice(pageStart, pageEnd);

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

  // Bulk Operation Audit state — mutable for rollback
  const [bulkOperations, setBulkOperations] = useState([
    { id: 1, operation: 'Student bulk import', records: 245, user: 'Piush Thakker', timestamp: '01 Mar 2026 10:30', status: 'Success', hoursAgo: 2 },
    { id: 2, operation: 'Fee structure update', records: 12, user: 'Rajesh Kumar', timestamp: '01 Mar 2026 08:15', status: 'Success', hoursAgo: 4 },
    { id: 3, operation: 'Attendance bulk upload', records: 1200, user: 'Priya Sharma', timestamp: '28 Feb 2026 15:00', status: 'Partial', hoursAgo: 22 },
    { id: 4, operation: 'Staff data import', records: 45, user: 'Piush Thakker', timestamp: '27 Feb 2026 11:00', status: 'Success', hoursAgo: 50 },
    { id: 5, operation: 'Grade sheet import', records: 320, user: 'Rajesh Kumar', timestamp: '26 Feb 2026 14:30', status: 'Failed', hoursAgo: 68 },
  ]);

  // Rollback confirmation dialog
  const [rollbackConfirmId, setRollbackConfirmId] = useState<number | null>(null);
  const [rollbackSuccessId, setRollbackSuccessId] = useState<number | null>(null);

  function confirmRollback(id: number) {
    setRollbackConfirmId(id);
  }

  function executeRollback(id: number) {
    setRollbackConfirmId(null);
    setRollbackSuccessId(id);
    setTimeout(() => {
      setBulkOperations(prev => prev.filter(op => op.id !== id));
      setRollbackSuccessId(null);
    }, 1800);
  }

  function cancelRollback() {
    setRollbackConfirmId(null);
  }

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
        <div className="grid grid-cols-5 gap-3 mb-3">
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Date Range</p>
            <div className="flex gap-1">
              <InputField type="date" value={dateFrom} onChange={v => { setDateFrom(v); setCurrentPage(1); }} theme={theme} placeholder="From" />
              <InputField type="date" value={dateTo} onChange={v => { setDateTo(v); setCurrentPage(1); }} theme={theme} placeholder="To" />
            </div>
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>User</p>
            <SelectField options={allUsers} value={userFilter} onChange={v => { setUserFilter(v); setCurrentPage(1); }} theme={theme} />
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Module</p>
            <SelectField options={allModules} value={moduleFilter} onChange={v => { setModuleFilter(v); setCurrentPage(1); }} theme={theme} />
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Search Text</p>
            <InputField value={searchQuery} onChange={v => { setSearchQuery(v); setCurrentPage(1); }} theme={theme} placeholder="Search details..." />
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>IP Address</p>
            <InputField value={ipFilter} onChange={v => { setIpFilter(v); setCurrentPage(1); }} theme={theme} placeholder="Filter by IP..." />
          </div>
        </div>
      </div>

      {/* Record count + Export */}
      <div className="flex items-center justify-between">
        <p className={`text-xs ${theme.iconColor}`}>
          Showing <span className={`font-bold ${theme.highlight}`}>{totalFiltered > 0 ? pageStart + 1 : 0}–{pageEnd}</span> of <span className={`font-bold ${theme.highlight}`}>{totalRecords}</span> records
        </p>
        <div className="flex items-center gap-2">
          <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${theme.secondaryBg} ${theme.highlight} border ${theme.border} hover:opacity-80 transition-all`}>
            <Download size={12} /> Export CSV
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-red-100 text-red-700 hover:bg-red-200 transition-colors">
            <Download size={12} /> PDF
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors">
            <Download size={12} /> Excel
          </button>
        </div>
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden`}>
        <table className="w-full text-xs">
          <thead className={theme.secondaryBg}>
            <tr>
              {['Date / Time', 'Action', 'Module', 'Details', 'User', 'IP Address'].map(h => (
                <th key={h} className={`text-left px-4 py-3 font-bold ${theme.iconColor} uppercase text-[10px]`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageLogs.map((log, i) => (
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
                <td className={`px-4 py-3 ${theme.iconColor} text-[10px] font-mono`}>{log.ip}</td>
              </tr>
            ))}
            {pageLogs.length === 0 && (
              <tr>
                <td colSpan={6} className={`px-4 py-8 text-center text-xs ${theme.iconColor}`}>No records match the current filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className={`text-[10px] ${theme.iconColor}`}>
          Page <span className={`font-bold ${theme.highlight}`}>{safePage}</span> of <span className={`font-bold ${theme.highlight}`}>{totalPages}</span>
        </p>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${safePage === 1 ? `${theme.secondaryBg} ${theme.iconColor} opacity-40 cursor-not-allowed` : `${theme.secondaryBg} ${theme.highlight} border-transparent hover:opacity-80`}`}
          >
            <ChevronLeft size={13} /> Prev
          </button>
          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(pg => (
            <button
              key={pg}
              onClick={() => setCurrentPage(pg)}
              className={`w-7 h-7 rounded-lg text-[10px] font-bold transition-all ${pg === safePage ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.iconColor} hover:opacity-80`}`}
            >
              {pg}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${safePage === totalPages ? `${theme.secondaryBg} ${theme.iconColor} opacity-40 cursor-not-allowed` : `${theme.secondaryBg} ${theme.highlight} border-transparent hover:opacity-80`}`}
          >
            Next <ChevronRight size={13} />
          </button>
        </div>
      </div>

      {/* ─── Security Monitoring ──────────────────────── */}
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

      {/* ─── Bulk Operation Audit ─────────────────────── */}
      <SectionCard title="Bulk Operation Audit" subtitle="Track bulk imports, updates, and rollback availability" theme={theme}>

        {/* Rollback Confirmation Dialog */}
        {rollbackConfirmId !== null && (
          <div className="mb-3 p-4 rounded-2xl border-2 border-amber-300 bg-amber-50 flex items-start gap-3">
            <AlertTriangle size={18} className="text-amber-500 mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-bold text-amber-800">Confirm Rollback</p>
              <p className="text-xs text-amber-700 mt-0.5">
                This will permanently remove the record of &ldquo;{bulkOperations.find(o => o.id === rollbackConfirmId)?.operation}&rdquo; ({bulkOperations.find(o => o.id === rollbackConfirmId)?.records.toLocaleString()} records). This action cannot be undone.
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => executeRollback(rollbackConfirmId)}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-red-500 hover:bg-red-600 transition-all"
                >
                  <RotateCcw size={11} /> Yes, Rollback
                </button>
                <button
                  onClick={cancelRollback}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold ${theme.secondaryBg} ${theme.highlight} border ${theme.border} hover:opacity-80 transition-all`}
                >
                  <X size={11} /> Cancel
                </button>
              </div>
            </div>
          </div>
        )}

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
              {bulkOperations.map((op) => (
                <tr key={op.id} className={`border-t ${theme.border} transition-all ${rollbackSuccessId === op.id ? 'bg-emerald-50' : ''}`}>
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
                    {rollbackSuccessId === op.id ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                        <CheckCircle size={10} /> Rolled back
                      </span>
                    ) : op.hoursAgo <= 24 ? (
                      <button
                        onClick={() => confirmRollback(op.id)}
                        className="flex items-center gap-1 text-[10px] font-bold text-red-500 hover:text-red-700 hover:underline transition-all"
                      >
                        <RotateCcw size={10} /> Rollback
                      </button>
                    ) : (
                      <span className={`text-[10px] ${theme.iconColor}`}>Expired</span>
                    )}
                  </td>
                </tr>
              ))}
              {bulkOperations.length === 0 && (
                <tr>
                  <td colSpan={6} className={`px-4 py-8 text-center text-xs ${theme.iconColor}`}>No bulk operations recorded.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className={`text-[9px] ${theme.iconColor} mt-2 italic`}>Rollback is available for 24 hours after the operation. After that, contact Saaras Account Manager for manual recovery.</p>
      </SectionCard>
    </div>
  );
}
