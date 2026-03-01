'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { StatCard, StatusBadge, TabBar, DataTable } from '@/components/shared';
import { mockVisitors } from '@/lib/mock-data';
import { Users, UserCheck, Clock, AlertTriangle, Plus, X, ThumbsUp, ThumbsDown, Link2, Download, Edit, Trash2, ShieldOff, ShieldCheck, BarChart3, PieChart, Ban, Eye } from 'lucide-react';
import { FormField, InputField, SelectField, TextAreaField } from '../_components/FormHelpers';

export default function VisitorsModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Visitor Log');

  // Visitor log with checkout support
  const [visitors, setVisitors] = useState([
    ...mockVisitors.map(v => ({ ...v })),
  ]);

  // Visitor Approvals mock
  const [approvalsList, setApprovalsList] = useState([
    { id: 'VA01', name: 'Sanjay Verma', purpose: 'Parent-Teacher Meeting', personToMeet: 'Mrs. Priya Sharma', requestedTime: '10:30 AM', status: 'Pending' as string },
    { id: 'VA02', name: 'Neha Kapoor', purpose: 'Document Submission', personToMeet: 'Admin Office', requestedTime: '11:00 AM', status: 'Pending' as string },
    { id: 'VA03', name: 'Rajiv Malhotra', purpose: 'Fee Discussion', personToMeet: 'Accounts Dept', requestedTime: '02:00 PM', status: 'Pending' as string },
    { id: 'VA04', name: 'Deepa Nair', purpose: 'Library Book Return', personToMeet: 'Library', requestedTime: '12:30 PM', status: 'Pending' as string },
  ]);

  // Student Pickup mock
  const [showPickupForm, setShowPickupForm] = useState(false);
  const [pickupReason, setPickupReason] = useState('');
  const [pickupStudent, setPickupStudent] = useState('');
  const [pickupNotes, setPickupNotes] = useState('');
  const schoolPickups = [
    { student: 'Aarav Patel', class: '10-A', reason: 'Sick', requestedBy: 'Class Teacher', parentStatus: 'Notified', gateStatus: 'Waiting' },
    { student: 'Meera Nair', class: '7-C', reason: 'Emergency', requestedBy: 'Coordinator', parentStatus: 'Confirmed', gateStatus: 'Released' },
    { student: 'Riya Sharma', class: '5-A', reason: 'Early Leave', requestedBy: 'Admin', parentStatus: 'Pending', gateStatus: 'Waiting' },
  ];
  const [parentPickups, setParentPickups] = useState([
    { student: 'Zara Khan', class: '8-B', reason: 'Doctor appointment', requestedTime: '12:00 PM', approval: 'Pending' as string },
    { student: 'Arjun Singh', class: '10-A', reason: 'Family function', requestedTime: '01:30 PM', approval: 'Pending' as string },
    { student: 'Rohan Gupta', class: '6-A', reason: 'Unwell', requestedTime: '11:45 AM', approval: 'Approved' as string },
  ]);

  // Add visitor form
  const [showAddVisitor, setShowAddVisitor] = useState(false);
  const [editingVisitor, setEditingVisitor] = useState<string | null>(null);

  // Blacklist
  const [blacklist, setBlacklist] = useState([
    { name: 'Ravi Chauhan', reason: 'Aggressive behavior at gate', blockedBy: 'Admin Officer', date: '2026-01-15' },
    { name: 'Sunil Yadav', reason: 'Attempted unauthorized entry', blockedBy: 'Principal', date: '2026-02-03' },
    { name: 'Unknown Vendor', reason: 'Fake ID presented', blockedBy: 'Security Head', date: '2025-12-20' },
  ]);

  // Pre-registration mock
  const [preRegForm, setPreRegForm] = useState({ name: '', phone: '', purpose: '', date: '', personToMeet: '', idType: '', vehicleNo: '' });
  const preRegistered = [
    { name: 'Mr. Alok Jain', date: '26-Feb-2026', purpose: 'Admission Discussion', status: 'Confirmed' },
    { name: 'Mrs. Sunita Reddy', date: '26-Feb-2026', purpose: 'PTM', status: 'Pending' },
    { name: 'Dr. Ravi Kumar', date: '27-Feb-2026', purpose: 'Health Camp', status: 'Confirmed' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Visitor Management</h1>
        <button onClick={() => setShowAddVisitor(true)} className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> Add Visitor</button>
      </div>
      <TabBar tabs={['Visitor Log', 'Check-in', 'Approvals', 'Student Pickup', 'Pre-Register', 'Analytics', 'Blacklist', 'Reports']} active={tab} onChange={setTab} theme={theme} />
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={Users} label="Today's Visitors" value="12" color="bg-blue-500" theme={theme} />
        <StatCard icon={UserCheck} label="Checked In" value="3" color="bg-emerald-500" theme={theme} />
        <StatCard icon={Clock} label="Avg Duration" value="45m" color="bg-indigo-500" theme={theme} />
        <StatCard icon={AlertTriangle} label="Overstaying" value="1" color="bg-amber-500" theme={theme} />
      </div>

      {/* Visitor Log with Check-Out */}
      {tab === 'Visitor Log' && (
        <DataTable
          headers={['Badge', 'Name', 'Purpose', 'Host', 'Time In', 'Time Out', 'Status', '']}
          rows={visitors.map((v, idx) => [
            <span key="badge" className={`text-xs px-2 py-0.5 rounded-full font-bold ${theme.secondaryBg} ${theme.primaryText}`}>{v.badge}</span>,
            <span key="name" className={`font-bold ${theme.highlight}`}>{v.name}</span>,
            <span key="purpose" className={theme.iconColor}>{v.purpose}</span>,
            <span key="host" className={theme.iconColor}>{v.host}</span>,
            <span key="in" className={theme.iconColor}>{v.timeIn}</span>,
            <span key="out" className={v.timeOut === '-' ? 'text-amber-500 font-bold' : theme.iconColor}>{v.timeOut}</span>,
            <StatusBadge key="status" status={v.timeOut === '-' ? 'Active' : 'Paid'} theme={theme} />,
            <div key="actions">
              {v.timeOut === '-' && (
                <button onClick={() => {
                  const now = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });
                  const updated = [...visitors];
                  updated[idx] = { ...updated[idx], timeOut: now };
                  setVisitors(updated);
                }} className="px-2 py-1 rounded-lg bg-amber-100 text-amber-700 text-[10px] font-bold whitespace-nowrap">Check Out</button>
              )}
            </div>,
          ])}
          theme={theme}
        />
      )}

      {/* Check-in */}
      {tab === 'Check-in' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-4`}>New Visitor Check-in</h3>
          <div className="grid grid-cols-2 gap-4">
            {['Visitor Name', 'Phone Number', 'Purpose of Visit', 'Person to Meet'].map(f => (
              <div key={f}>
                <label className={`text-xs ${theme.iconColor} block mb-1`}>{f}</label>
                <input className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`} placeholder={f} />
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-4">
            <button className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-sm font-bold`}>Check In + Print Badge</button>
            <button className={`px-4 py-2 rounded-xl border ${theme.border} text-sm font-bold ${theme.iconColor}`}>Cancel</button>
          </div>
        </div>
      )}

      {/* Approvals Tab */}
      {tab === 'Approvals' && (
        <div className="space-y-3">
          <p className={`text-xs ${theme.iconColor}`}>Pending visitor requests that need your approval before check-in:</p>
          <DataTable
            headers={['Visitor', 'Purpose', 'Person to Meet', 'Requested Time', 'Status', 'Actions']}
            rows={approvalsList.map((a, idx) => [
              <span key="name" className={`font-bold ${theme.highlight}`}>{a.name}</span>,
              <span key="p" className={theme.iconColor}>{a.purpose}</span>,
              <span key="m" className={theme.iconColor}>{a.personToMeet}</span>,
              <span key="t" className={theme.iconColor}>{a.requestedTime}</span>,
              <StatusBadge key="s" status={a.status === 'Approved' ? 'Active' : a.status === 'Denied' ? 'Overdue' : 'Pending'} theme={theme} />,
              <div key="actions" className="flex gap-1">
                {a.status === 'Pending' && (
                  <>
                    <button onClick={() => { const u = [...approvalsList]; u[idx] = { ...u[idx], status: 'Approved' }; setApprovalsList(u); }} className="px-2 py-1 rounded-lg bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center gap-0.5"><ThumbsUp size={10} /> Approve</button>
                    <button onClick={() => { const u = [...approvalsList]; u[idx] = { ...u[idx], status: 'Denied' }; setApprovalsList(u); }} className="px-2 py-1 rounded-lg bg-red-100 text-red-600 text-[10px] font-bold flex items-center gap-0.5"><ThumbsDown size={10} /> Deny</button>
                  </>
                )}
                {a.status !== 'Pending' && <span className={`text-[10px] font-bold ${a.status === 'Approved' ? 'text-emerald-600' : 'text-red-500'}`}>{a.status}</span>}
              </div>,
            ])}
            theme={theme}
          />
        </div>
      )}

      {/* Student Pickup — Bidirectional */}
      {tab === 'Student Pickup' && (
        <div className="space-y-4">
          {/* School-Initiated */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className={`text-sm font-bold ${theme.highlight}`}>School-Initiated Pickups</h3>
              <button onClick={() => setShowPickupForm(true)} className={`px-3 py-1.5 ${theme.primary} text-white rounded-xl text-[10px] font-bold flex items-center gap-1`}><Plus size={10} /> New Request</button>
            </div>
            <DataTable
              headers={['Student', 'Class', 'Reason', 'Requested By', 'Parent Status', 'Gate Status']}
              rows={schoolPickups.map(p => [
                <span key="s" className={`font-bold ${theme.highlight}`}>{p.student}</span>,
                <span key="c" className={theme.iconColor}>{p.class}</span>,
                <span key="r" className={theme.iconColor}>{p.reason}</span>,
                <span key="by" className={theme.iconColor}>{p.requestedBy}</span>,
                <StatusBadge key="ps" status={p.parentStatus === 'Confirmed' ? 'Active' : p.parentStatus === 'Notified' ? 'Pending' : 'Pending'} theme={theme} />,
                <span key="gs" className={`text-xs font-bold ${p.gateStatus === 'Released' ? 'text-emerald-600' : 'text-amber-600'}`}>{p.gateStatus}</span>,
              ])}
              theme={theme}
            />
          </div>

          {/* Parent-Initiated */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Parent-Initiated Requests</h3>
            <DataTable
              headers={['Student', 'Class', 'Reason', 'Requested Time', 'Approval', 'Actions']}
              rows={parentPickups.map((p, idx) => [
                <span key="s" className={`font-bold ${theme.highlight}`}>{p.student}</span>,
                <span key="c" className={theme.iconColor}>{p.class}</span>,
                <span key="r" className={theme.iconColor}>{p.reason}</span>,
                <span key="t" className={theme.iconColor}>{p.requestedTime}</span>,
                <StatusBadge key="a" status={p.approval === 'Approved' ? 'Active' : p.approval === 'Denied' ? 'Overdue' : 'Pending'} theme={theme} />,
                <div key="actions" className="flex gap-1">
                  {p.approval === 'Pending' && (
                    <>
                      <button onClick={() => { const u = [...parentPickups]; u[idx] = { ...u[idx], approval: 'Approved' }; setParentPickups(u); }} className="px-2 py-1 rounded-lg bg-emerald-100 text-emerald-700 text-[10px] font-bold">Approve</button>
                      <button onClick={() => { const u = [...parentPickups]; u[idx] = { ...u[idx], approval: 'Denied' }; setParentPickups(u); }} className="px-2 py-1 rounded-lg bg-red-100 text-red-600 text-[10px] font-bold">Deny</button>
                    </>
                  )}
                  {p.approval !== 'Pending' && <span className={`text-[10px] font-bold ${p.approval === 'Approved' ? 'text-emerald-600' : 'text-red-500'}`}>{p.approval}</span>}
                </div>,
              ])}
              theme={theme}
            />
          </div>

          {/* New School Pickup Request Form */}
          {showPickupForm && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowPickupForm(false)}>
              <div className={`${theme.cardBg} rounded-2xl border ${theme.border} shadow-2xl w-full max-w-md p-6 space-y-4`} onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between">
                  <h2 className={`text-lg font-bold ${theme.highlight}`}>New Pickup Request</h2>
                  <button onClick={() => setShowPickupForm(false)} className={`p-1.5 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
                </div>
                <FormField label="Student Name" required theme={theme}>
                  <InputField placeholder="Search student..." value={pickupStudent} onChange={setPickupStudent} theme={theme} />
                </FormField>
                <FormField label="Reason" required theme={theme}>
                  <SelectField options={['Sick', 'Emergency', 'Early Leave']} value={pickupReason} onChange={setPickupReason} theme={theme} placeholder="Select reason" />
                </FormField>
                <FormField label="Notes" theme={theme}>
                  <TextAreaField placeholder="Additional details..." value={pickupNotes} onChange={setPickupNotes} theme={theme} rows={2} />
                </FormField>
                <div className="flex gap-2">
                  <button onClick={() => setShowPickupForm(false)} className={`flex-1 py-2 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.highlight}`}>Cancel</button>
                  <button onClick={() => { window.alert('Pickup request sent to parent for ' + (pickupStudent || 'student') + '! (Blueprint demo)'); setShowPickupForm(false); setPickupStudent(''); setPickupReason(''); setPickupNotes(''); }} className={`flex-1 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>Send to Parent</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Analytics Tab */}
      {tab === 'Analytics' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Visits Per Day Bar Chart (simulated) */}
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 size={16} className={theme.primaryText} />
                <h3 className={`text-sm font-bold ${theme.highlight}`}>Visits Per Day (This Week)</h3>
              </div>
              <div className="flex items-end gap-2 h-40 px-2">
                {[
                  { day: 'Mon', visits: 18 },
                  { day: 'Tue', visits: 24 },
                  { day: 'Wed', visits: 12 },
                  { day: 'Thu', visits: 20 },
                  { day: 'Fri', visits: 15 },
                  { day: 'Sat', visits: 8 },
                ].map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <span className={`text-[10px] font-bold ${theme.primaryText}`}>{d.visits}</span>
                    <div className={`w-full rounded-t-lg ${theme.primary}`} style={{ height: `${(d.visits / 24) * 100}%`, minHeight: '8px' }} />
                    <span className={`text-[9px] ${theme.iconColor}`}>{d.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Purpose Distribution (simulated pie chart) */}
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
              <div className="flex items-center gap-2 mb-3">
                <PieChart size={16} className={theme.primaryText} />
                <h3 className={`text-sm font-bold ${theme.highlight}`}>Visit Purpose Distribution</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 h-32 rounded-full border-8 border-blue-500 relative" style={{ background: 'conic-gradient(#3b82f6 0% 35%, #10b981 35% 55%, #f59e0b 55% 75%, #8b5cf6 75% 88%, #ef4444 88% 100%)' }}>
                  <div className={`absolute inset-3 rounded-full ${theme.cardBg} flex items-center justify-center`}>
                    <span className={`text-xs font-bold ${theme.highlight}`}>97</span>
                  </div>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[
                    { label: 'Parent Meeting', pct: '35%', color: 'bg-blue-500' },
                    { label: 'Fee Payment', pct: '20%', color: 'bg-emerald-500' },
                    { label: 'Delivery', pct: '20%', color: 'bg-amber-500' },
                    { label: 'Maintenance', pct: '13%', color: 'bg-purple-500' },
                    { label: 'Other', pct: '12%', color: 'bg-red-500' },
                  ].map((p, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${p.color}`} />
                      <span className={`text-[10px] ${theme.iconColor} flex-1`}>{p.label}</span>
                      <span className={`text-[10px] font-bold ${theme.highlight}`}>{p.pct}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Peak Hours */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Peak Visitor Hours</h3>
            <div className="flex items-end gap-1 h-24">
              {[
                { hour: '8AM', val: 3 }, { hour: '9AM', val: 8 }, { hour: '10AM', val: 12 },
                { hour: '11AM', val: 10 }, { hour: '12PM', val: 5 }, { hour: '1PM', val: 3 },
                { hour: '2PM', val: 7 }, { hour: '3PM', val: 9 }, { hour: '4PM', val: 4 },
              ].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                  <span className={`text-[8px] font-bold ${theme.primaryText}`}>{h.val}</span>
                  <div className={`w-full rounded-t ${h.val >= 10 ? 'bg-red-400' : h.val >= 7 ? 'bg-amber-400' : 'bg-blue-400'}`} style={{ height: `${(h.val / 12) * 100}%`, minHeight: '4px' }} />
                  <span className={`text-[7px] ${theme.iconColor}`}>{h.hour}</span>
                </div>
              ))}
            </div>
            <p className={`text-[10px] ${theme.iconColor} mt-2`}>Peak hours: 10:00 AM - 11:00 AM (avg 11 visitors)</p>
          </div>
        </div>
      )}

      {/* Blacklist Tab */}
      {tab === 'Blacklist' && (
        <div className="space-y-4">
          <div className={`p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3`}>
            <Ban size={18} className="text-red-500" />
            <div className="flex-1">
              <p className="text-xs font-bold text-red-700">{blacklist.length} visitor(s) on blacklist</p>
              <p className="text-[10px] text-red-500">These persons will be flagged at security gate</p>
            </div>
          </div>
          <DataTable
            headers={['Visitor Name', 'Reason', 'Blocked By', 'Date', '']}
            rows={blacklist.map((b, idx) => [
              <span key="name" className={`font-bold ${theme.highlight}`}>{b.name}</span>,
              <span key="reason" className="text-xs text-red-600">{b.reason}</span>,
              <span key="by" className={theme.iconColor}>{b.blockedBy}</span>,
              <span key="date" className={`text-xs font-mono ${theme.iconColor}`}>{b.date}</span>,
              <button key="action" onClick={() => {
                setBlacklist(blacklist.filter((_, i) => i !== idx));
                window.alert(`${b.name} removed from blacklist. (Blueprint demo)`);
              }} className="px-2 py-1 rounded-lg bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center gap-0.5">
                <ShieldCheck size={10} /> Unblock
              </button>,
            ])}
            theme={theme}
          />
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Add to Blacklist</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={`text-xs ${theme.iconColor} block mb-1`}>Visitor Name</label>
                <input placeholder="Full name" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`} />
              </div>
              <div>
                <label className={`text-xs ${theme.iconColor} block mb-1`}>Reason</label>
                <input placeholder="Reason for blocking" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`} />
              </div>
            </div>
            <button onClick={() => window.alert('Visitor added to blacklist! (Blueprint demo)')} className="mt-3 px-4 py-2 bg-red-500 text-white rounded-xl text-xs font-bold flex items-center gap-1">
              <Ban size={12} /> Add to Blacklist
            </button>
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {tab === 'Reports' && (
        <div className="space-y-4">
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-4`}>Download Visitor Report</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`text-xs ${theme.iconColor} block mb-1`}>From Date</label>
                <input type="date" defaultValue="2026-03-01" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`} />
              </div>
              <div>
                <label className={`text-xs ${theme.iconColor} block mb-1`}>To Date</label>
                <input type="date" defaultValue="2026-03-01" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`} />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={() => window.alert('Visitor log Excel downloaded! (Blueprint demo)')} className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}>
                <Download size={14} /> Download Excel
              </button>
              <button onClick={() => window.alert('Visitor log PDF downloaded! (Blueprint demo)')} className={`px-4 py-2.5 rounded-xl border ${theme.border} text-sm font-bold ${theme.iconColor} flex items-center gap-1`}>
                <Download size={14} /> Download PDF
              </button>
            </div>
          </div>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Quick Reports</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { label: 'Today\'s Log', desc: '12 visitors', icon: Users },
                { label: 'This Week', desc: '97 visitors', icon: BarChart3 },
                { label: 'Overstay Report', desc: '3 incidents', icon: Clock },
                { label: 'Blacklist Activity', desc: '0 flagged', icon: Ban },
              ].map((r, i) => (
                <button key={i} onClick={() => window.alert(`Downloading ${r.label} report... (Blueprint demo)`)} className={`p-3 rounded-xl ${theme.accentBg} ${theme.buttonHover} transition-all text-left`}>
                  <r.icon size={16} className={theme.primaryText} />
                  <p className={`text-xs font-bold ${theme.highlight} mt-1`}>{r.label}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{r.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Pre-Register Tab */}
      {tab === 'Pre-Register' && (
        <div className="space-y-4">
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-4`}>Pre-Register a Visitor</h3>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Visitor Name" required theme={theme}>
                <InputField placeholder="Full name" value={preRegForm.name} onChange={v => setPreRegForm(p => ({ ...p, name: v }))} theme={theme} />
              </FormField>
              <FormField label="Phone" required theme={theme}>
                <InputField placeholder="10-digit mobile" value={preRegForm.phone} onChange={v => setPreRegForm(p => ({ ...p, phone: v }))} theme={theme} />
              </FormField>
              <FormField label="Purpose" required theme={theme}>
                <SelectField options={['Parent Meeting', 'Document Submission', 'Fee Payment', 'Admission Enquiry', 'Vendor Visit', 'Other']} value={preRegForm.purpose} onChange={v => setPreRegForm(p => ({ ...p, purpose: v }))} theme={theme} placeholder="Select purpose" />
              </FormField>
              <FormField label="Date of Visit" required theme={theme}>
                <InputField type="date" value={preRegForm.date} onChange={v => setPreRegForm(p => ({ ...p, date: v }))} theme={theme} />
              </FormField>
              <FormField label="Person to Meet" theme={theme}>
                <SelectField options={['Principal', 'Vice Principal', 'Admin Office', 'Accounts Dept', 'Class Teacher', 'Coordinator']} value={preRegForm.personToMeet} onChange={v => setPreRegForm(p => ({ ...p, personToMeet: v }))} theme={theme} placeholder="Select" />
              </FormField>
              <FormField label="ID Type" theme={theme}>
                <SelectField options={['Aadhaar Card', 'PAN Card', 'Driving License', 'Voter ID', 'Passport']} value={preRegForm.idType} onChange={v => setPreRegForm(p => ({ ...p, idType: v }))} theme={theme} placeholder="Select ID type" />
              </FormField>
              <FormField label="Vehicle Number (optional)" theme={theme}>
                <InputField placeholder="e.g. GJ-01-XX-1234" value={preRegForm.vehicleNo} onChange={v => setPreRegForm(p => ({ ...p, vehicleNo: v }))} theme={theme} />
              </FormField>
            </div>
            <button onClick={() => { window.alert('Pre-registration link generated: https://school.app/visit/PRE-' + Math.floor(Math.random() * 9000 + 1000) + ' (Blueprint demo)'); setPreRegForm({ name: '', phone: '', purpose: '', date: '', personToMeet: '', idType: '', vehicleNo: '' }); }} className={`mt-4 px-4 py-2.5 ${theme.primary} text-white rounded-xl text-xs font-bold flex items-center gap-1.5`}><Link2 size={12} /> Generate Pre-Registration Link</button>
          </div>

          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Pre-Registered Visitors</h3>
            <DataTable
              headers={['Visitor', 'Date', 'Purpose', 'Status']}
              rows={preRegistered.map(p => [
                <span key="n" className={`font-bold ${theme.highlight}`}>{p.name}</span>,
                <span key="d" className={theme.iconColor}>{p.date}</span>,
                <span key="p" className={theme.iconColor}>{p.purpose}</span>,
                <StatusBadge key="s" status={p.status === 'Confirmed' ? 'Active' : 'Pending'} theme={theme} />,
              ])}
              theme={theme}
            />
          </div>
        </div>
      )}

      {/* Add / Edit Visitor Modal */}
      {showAddVisitor && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAddVisitor(false)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} shadow-2xl w-full max-w-lg p-6 space-y-4`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className={`text-lg font-bold ${theme.highlight}`}>Add Visitor</h2>
              <button onClick={() => setShowAddVisitor(false)} className={`p-1.5 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Visitor Name" required theme={theme}>
                <InputField placeholder="Full name" value="" onChange={() => {}} theme={theme} />
              </FormField>
              <FormField label="Phone Number" required theme={theme}>
                <InputField placeholder="+91 98765 43210" value="" onChange={() => {}} theme={theme} />
              </FormField>
              <FormField label="Purpose" required theme={theme}>
                <SelectField options={['Parent Meeting', 'Fee Payment', 'Delivery', 'Maintenance', 'Admission Enquiry', 'Interview', 'Other']} value="" onChange={() => {}} theme={theme} placeholder="Select purpose" />
              </FormField>
              <FormField label="Host / Person to Meet" required theme={theme}>
                <InputField placeholder="Search teacher, office..." value="" onChange={() => {}} theme={theme} />
              </FormField>
              <FormField label="ID Type" theme={theme}>
                <SelectField options={['Aadhaar Card', 'PAN Card', 'Driving License', 'Voter ID', 'Company ID']} value="" onChange={() => {}} theme={theme} placeholder="Select ID type" />
              </FormField>
              <FormField label="ID Number" theme={theme}>
                <InputField placeholder="ID number" value="" onChange={() => {}} theme={theme} />
              </FormField>
              <FormField label="Vehicle Details" theme={theme}>
                <InputField placeholder="e.g. Car - GJ01AB1234" value="" onChange={() => {}} theme={theme} />
              </FormField>
              <FormField label="Expected Duration" theme={theme}>
                <SelectField options={['30 min', '1 hour', '2 hours', '3 hours', 'Half day']} value="" onChange={() => {}} theme={theme} placeholder="Select duration" />
              </FormField>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowAddVisitor(false)} className={`flex-1 py-2 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.highlight}`}>Cancel</button>
              <button onClick={() => { setShowAddVisitor(false); window.alert('Visitor added and checked in! Badge printed. (Blueprint demo)'); }} className={`flex-1 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>Check In + Print Badge</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
