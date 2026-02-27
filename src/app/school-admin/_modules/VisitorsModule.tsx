'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { StatCard, StatusBadge, TabBar, DataTable } from '@/components/shared';
import { mockVisitors } from '@/lib/mock-data';
import { Users, UserCheck, Clock, AlertTriangle, Plus, X, ThumbsUp, ThumbsDown, Link2 } from 'lucide-react';
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

  // Pre-registration mock
  const [preRegForm, setPreRegForm] = useState({ name: '', phone: '', purpose: '', date: '', personToMeet: '', idType: '', vehicleNo: '' });
  const preRegistered = [
    { name: 'Mr. Alok Jain', date: '26-Feb-2026', purpose: 'Admission Discussion', status: 'Confirmed' },
    { name: 'Mrs. Sunita Reddy', date: '26-Feb-2026', purpose: 'PTM', status: 'Pending' },
    { name: 'Dr. Ravi Kumar', date: '27-Feb-2026', purpose: 'Health Camp', status: 'Confirmed' },
  ];

  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Visitor Management</h1>
      <TabBar tabs={['Visitor Log', 'Check-in', 'Approvals', 'Student Pickup', 'Pre-Register']} active={tab} onChange={setTab} theme={theme} />
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
    </div>
  );
}
