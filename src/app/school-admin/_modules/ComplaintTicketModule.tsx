'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { StatCard, StatusBadge, TabBar, SearchBar, DataTable } from '@/components/shared';
import {
  Ticket, AlertTriangle, CheckCircle, Clock, Plus, X, ChevronDown, ChevronUp,
  Star, BarChart3, Download, ArrowUpRight, Shield, MessageCircle, Eye, Search,
} from 'lucide-react';
import { FormField, InputField, SelectField, TextAreaField } from '../_components/FormHelpers';

// ── Mock Data ──
const tickets = [
  { id: 'TKT-001', title: 'Broken Fan in Class 5-A', category: 'Infrastructure', priority: 'High', raisedBy: 'Mrs. Sharma (Teacher)', raisedDate: '26 Feb 2026', assignedTo: 'Mr. Rajiv (Maintenance)', status: 'In Progress', sla: '24h', slaBreached: false, resolution: '', rating: 0, timeline: [{ action: 'Created', by: 'Mrs. Sharma', time: '26 Feb, 09:15 AM' }, { action: 'Assigned to Maintenance', by: 'Admin', time: '26 Feb, 09:45 AM' }, { action: 'Status: In Progress', by: 'Mr. Rajiv', time: '26 Feb, 10:30 AM' }] },
  { id: 'TKT-002', title: 'Bus Route 3 — Frequent Delays', category: 'Transport', priority: 'High', raisedBy: 'Rajesh Patel (Parent)', raisedDate: '25 Feb 2026', assignedTo: 'Transport Head', status: 'Open', sla: '48h', slaBreached: true, resolution: '', rating: 0, timeline: [{ action: 'Created', by: 'Rajesh Patel', time: '25 Feb, 08:00 AM' }] },
  { id: 'TKT-003', title: 'Fee Receipt Not Received', category: 'Finance', priority: 'Normal', raisedBy: 'Neha Gupta (Parent)', raisedDate: '24 Feb 2026', assignedTo: 'Accounts Team', status: 'Resolved', sla: '24h', slaBreached: false, resolution: 'Receipt resent via email and WhatsApp', rating: 4, timeline: [{ action: 'Created', by: 'Neha Gupta', time: '24 Feb, 11:00 AM' }, { action: 'Assigned to Accounts', by: 'Admin', time: '24 Feb, 11:30 AM' }, { action: 'Resolved', by: 'Accounts Team', time: '24 Feb, 02:15 PM' }] },
  { id: 'TKT-004', title: 'Library Book Damaged', category: 'Library', priority: 'Low', raisedBy: 'Aarav Patel (Student)', raisedDate: '23 Feb 2026', assignedTo: 'Librarian', status: 'Resolved', sla: '72h', slaBreached: false, resolution: 'Book replaced. Student counseled on care.', rating: 5, timeline: [{ action: 'Created', by: 'Aarav Patel', time: '23 Feb, 10:00 AM' }, { action: 'Resolved', by: 'Librarian', time: '24 Feb, 09:00 AM' }] },
  { id: 'TKT-005', title: 'Bullying Incident Report', category: 'Discipline', priority: 'Critical', raisedBy: 'Pooja Sharma (Parent)', raisedDate: '22 Feb 2026', assignedTo: 'Vice Principal', status: 'Escalated', sla: '12h', slaBreached: false, resolution: '', rating: 0, timeline: [{ action: 'Created', by: 'Pooja Sharma', time: '22 Feb, 08:30 AM' }, { action: 'Escalated to VP', by: 'Admin', time: '22 Feb, 09:00 AM' }] },
  { id: 'TKT-006', title: 'App Login Issue — Parent Portal', category: 'Technical', priority: 'Normal', raisedBy: 'Anil Desai (Parent)', raisedDate: '21 Feb 2026', assignedTo: 'IT Team', status: 'Closed', sla: '24h', slaBreached: false, resolution: 'Password reset link sent. Issue resolved.', rating: 5, timeline: [{ action: 'Created', by: 'Anil Desai', time: '21 Feb, 03:00 PM' }, { action: 'Resolved', by: 'IT Team', time: '21 Feb, 04:30 PM' }, { action: 'Closed', by: 'System', time: '22 Feb, 04:30 PM' }] },
  { id: 'TKT-007', title: 'Canteen Food Quality Complaint', category: 'Canteen', priority: 'High', raisedBy: 'Anonymous (Student)', raisedDate: '20 Feb 2026', assignedTo: 'Admin', status: 'In Progress', sla: '48h', slaBreached: false, resolution: '', rating: 0, timeline: [{ action: 'Created (Anonymous)', by: 'System', time: '20 Feb, 01:00 PM' }, { action: 'Assigned to Admin', by: 'System', time: '20 Feb, 01:05 PM' }] },
  { id: 'TKT-008', title: 'AC Not Working — Staff Room', category: 'Infrastructure', priority: 'Normal', raisedBy: 'Mr. Reddy (Teacher)', raisedDate: '19 Feb 2026', assignedTo: 'Maintenance', status: 'Resolved', sla: '72h', slaBreached: false, resolution: 'AC serviced and running', rating: 3, timeline: [{ action: 'Created', by: 'Mr. Reddy', time: '19 Feb, 09:00 AM' }, { action: 'Resolved', by: 'Maintenance', time: '20 Feb, 11:00 AM' }] },
];

const categories = ['All', 'Infrastructure', 'Transport', 'Finance', 'Library', 'Discipline', 'Technical', 'Canteen', 'Academic', 'Other'];
const priorities = ['All', 'Low', 'Normal', 'High', 'Critical'];
const statuses = ['All', 'Open', 'In Progress', 'Escalated', 'Resolved', 'Closed'];

const priorityStyle = (p: string) => {
  if (p === 'Low') return 'bg-gray-100 text-gray-600';
  if (p === 'Normal') return 'bg-blue-100 text-blue-700';
  if (p === 'High') return 'bg-amber-100 text-amber-700';
  return 'bg-red-100 text-red-700 animate-pulse';
};

const statusStyle = (s: string) => {
  if (s === 'Open') return 'bg-blue-100 text-blue-700';
  if (s === 'In Progress') return 'bg-amber-100 text-amber-700';
  if (s === 'Escalated') return 'bg-red-100 text-red-700';
  if (s === 'Resolved') return 'bg-emerald-100 text-emerald-700';
  return 'bg-gray-100 text-gray-600';
};

const getAge = (dateStr: string) => {
  const parts = dateStr.split(' ');
  const day = parseInt(parts[0]);
  const months: Record<string, number> = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
  const created = new Date(parseInt(parts[2]), months[parts[1]], day);
  const now = new Date(2026, 2, 1); // Mar 1, 2026
  const diff = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
  return diff === 0 ? 'Today' : `${diff}d`;
};

export default function ComplaintTicketModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All Tickets');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showRaiseTicket, setShowRaiseTicket] = useState(false);
  const [catFilter, setCatFilter] = useState('All');
  const [prioFilter, setPrioFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const openTickets = tickets.filter(t => t.status === 'Open');
  const inProgressTickets = tickets.filter(t => t.status === 'In Progress');
  const resolvedTickets = tickets.filter(t => t.status === 'Resolved' || t.status === 'Closed');
  const breachedCount = tickets.filter(t => t.slaBreached).length;

  const getFilteredTickets = () => {
    let filtered = tickets;
    if (tab === 'Open') filtered = openTickets;
    else if (tab === 'In Progress') filtered = inProgressTickets;
    else if (tab === 'Resolved') filtered = resolvedTickets;

    return filtered.filter(t =>
      (catFilter === 'All' || t.category === catFilter) &&
      (prioFilter === 'All' || t.priority === prioFilter) &&
      (statusFilter === 'All' || t.status === statusFilter)
    );
  };

  const filteredTickets = getFilteredTickets();

  // Report data
  const byCategory = categories.slice(1).map(c => ({ category: c, count: tickets.filter(t => t.category === c).length })).filter(c => c.count > 0);
  const resolvedRatings = tickets.filter(t => t.rating > 0);
  const avgSatisfaction = resolvedRatings.length > 0 ? (resolvedRatings.reduce((s, t) => s + t.rating, 0) / resolvedRatings.length).toFixed(1) : '—';
  const slaCompliance = Math.round(((tickets.length - breachedCount) / tickets.length) * 100);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Complaints & Tickets</h1>
        <button onClick={() => setShowRaiseTicket(true)} className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}>
          <Plus size={14} /> Raise Ticket
        </button>
      </div>
      <TabBar tabs={['All Tickets', 'Open', 'In Progress', 'Resolved', 'Reports']} active={tab} onChange={setTab} theme={theme} />

      {/* SLA Breach Alert */}
      {breachedCount > 0 && tab !== 'Reports' && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 border border-red-200 animate-pulse">
          <AlertTriangle size={18} className="text-red-500" />
          <div className="flex-1">
            <p className="text-xs font-bold text-red-700">{breachedCount} ticket(s) have breached SLA</p>
            <p className="text-[10px] text-red-500">Immediate attention required</p>
          </div>
          <button className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-[10px] font-bold">View Breached</button>
        </div>
      )}

      {/* Stat Cards for non-report tabs */}
      {tab !== 'Reports' && (
        <div className="grid grid-cols-6 gap-3">
          <StatCard icon={Ticket} label="Total (Month)" value={String(tickets.length)} color="bg-slate-500" theme={theme} />
          <StatCard icon={MessageCircle} label="Open" value={String(openTickets.length)} color="bg-blue-500" theme={theme} />
          <StatCard icon={Clock} label="In Progress" value={String(inProgressTickets.length)} color="bg-amber-500" theme={theme} />
          <StatCard icon={CheckCircle} label="Resolved" value={String(resolvedTickets.length)} color="bg-emerald-500" theme={theme} />
          <StatCard icon={AlertTriangle} label="SLA Breached" value={String(breachedCount)} color="bg-red-500" theme={theme} />
          <StatCard icon={Clock} label="Avg Resolution" value="18h" color="bg-purple-500" theme={theme} />
        </div>
      )}

      {/* Filters */}
      {tab !== 'Reports' && (
        <div className="flex gap-3">
          <SearchBar placeholder="Search tickets..." theme={theme} icon={Search} />
          <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={prioFilter} onChange={e => setPrioFilter(e.target.value)} className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
            {priorities.map(p => <option key={p}>{p}</option>)}
          </select>
          {tab === 'All Tickets' && (
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
              {statuses.map(s => <option key={s}>{s}</option>)}
            </select>
          )}
        </div>
      )}

      {/* Ticket List */}
      {tab !== 'Reports' && (
        <div className="space-y-2">
          {filteredTickets.map(t => (
            <div key={t.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden ${t.slaBreached ? 'border-red-300' : ''}`}>
              <div className="flex items-center gap-3 p-4 cursor-pointer" onClick={() => setExpandedId(expandedId === t.id ? null : t.id)}>
                <span className={`font-mono text-xs ${theme.primaryText} w-20`}>{t.id}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${priorityStyle(t.priority)} w-16 text-center`}>{t.priority}</span>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-bold ${theme.highlight} truncate`}>{t.title}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{t.category} | {t.raisedBy}</p>
                </div>
                <span className={`text-[10px] ${theme.iconColor}`}>{t.assignedTo}</span>
                <span className={`text-[10px] font-mono ${t.slaBreached ? 'text-red-600 font-bold' : theme.iconColor}`}>
                  {t.slaBreached ? 'BREACHED' : t.sla}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${statusStyle(t.status)}`}>{t.status}</span>
                <span className={`text-[10px] ${theme.iconColor} w-10 text-right`}>{getAge(t.raisedDate)}</span>
                {expandedId === t.id ? <ChevronUp size={14} className={theme.iconColor} /> : <ChevronDown size={14} className={theme.iconColor} />}
              </div>

              {/* Expanded Detail */}
              {expandedId === t.id && (
                <div className={`px-4 pb-4 border-t ${theme.border} space-y-3 pt-3`}>
                  {/* Timeline */}
                  <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
                    <p className={`text-[10px] ${theme.iconColor} uppercase font-bold mb-2`}>Timeline</p>
                    <div className="space-y-2">
                      {t.timeline.map((tl, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${i === t.timeline.length - 1 ? 'bg-blue-500' : 'bg-gray-300'}`} />
                          <span className={`text-xs font-bold ${theme.highlight}`}>{tl.action}</span>
                          <span className={`text-[10px] ${theme.iconColor}`}>by {tl.by}</span>
                          <span className={`text-[10px] ${theme.iconColor} ml-auto font-mono`}>{tl.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Resolution */}
                  {t.resolution && (
                    <div className={`p-3 rounded-xl bg-emerald-50 border border-emerald-200`}>
                      <p className="text-[10px] text-emerald-700 uppercase font-bold mb-1">Resolution</p>
                      <p className="text-xs text-emerald-800">{t.resolution}</p>
                    </div>
                  )}

                  {/* Rating */}
                  {t.rating > 0 && (
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] ${theme.iconColor}`}>Satisfaction:</span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, s) => (
                          <Star key={s} size={12} className={s < t.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'} />
                        ))}
                      </div>
                      <span className={`text-xs font-bold ${theme.primaryText}`}>{t.rating}/5</span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    {(t.status === 'Open' || t.status === 'In Progress') && (
                      <>
                        <button className={`px-3 py-1.5 rounded-lg text-[10px] font-bold ${theme.secondaryBg} ${theme.highlight}`}>Reassign</button>
                        <button className={`px-3 py-1.5 rounded-lg text-[10px] font-bold ${theme.secondaryBg} ${theme.highlight}`}>Update Status</button>
                        <button className="px-3 py-1.5 rounded-lg text-[10px] font-bold bg-red-50 text-red-600 flex items-center gap-1"><ArrowUpRight size={10} /> Escalate</button>
                      </>
                    )}
                    <button className={`px-3 py-1.5 rounded-lg text-[10px] font-bold ${theme.secondaryBg} ${theme.highlight} flex items-center gap-1 ml-auto`}><Download size={10} /> Export PDF</button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {filteredTickets.length === 0 && (
            <div className={`text-center py-8 ${theme.iconColor}`}>
              <p className="text-sm">No tickets found matching your filters</p>
            </div>
          )}
        </div>
      )}

      {/* ── Reports Tab ── */}
      {tab === 'Reports' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <StatCard icon={Shield} label="SLA Compliance" value={`${slaCompliance}%`} color="bg-emerald-500" theme={theme} />
            <StatCard icon={Star} label="Avg Satisfaction" value={String(avgSatisfaction)} color="bg-amber-500" sub="out of 5" theme={theme} />
            <StatCard icon={Clock} label="Avg Resolution" value="18h" color="bg-blue-500" theme={theme} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* By Category */}
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 size={14} className={theme.primaryText} />
                <h3 className={`text-sm font-bold ${theme.highlight}`}>Tickets by Category</h3>
              </div>
              <div className="space-y-2">
                {byCategory.map(c => (
                  <div key={c.category} className="flex items-center gap-3">
                    <span className={`text-xs ${theme.highlight} w-28`}>{c.category}</span>
                    <div className={`flex-1 h-4 rounded-full ${theme.secondaryBg} overflow-hidden`}>
                      <div className={`h-full rounded-full ${theme.primary}`} style={{ width: `${(c.count / tickets.length) * 100}%` }} />
                    </div>
                    <span className={`text-xs font-bold ${theme.highlight} w-6 text-right`}>{c.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Resolution Time Distribution */}
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
              <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Resolution Time Distribution</h3>
              <div className="space-y-2">
                {[
                  { range: '< 4 hours', count: 2, pct: 25 },
                  { range: '4-12 hours', count: 3, pct: 37 },
                  { range: '12-24 hours', count: 2, pct: 25 },
                  { range: '24-48 hours', count: 1, pct: 13 },
                ].map(r => (
                  <div key={r.range} className="flex items-center gap-3">
                    <span className={`text-xs ${theme.highlight} w-28`}>{r.range}</span>
                    <div className={`flex-1 h-4 rounded-full ${theme.secondaryBg} overflow-hidden`}>
                      <div className="h-full rounded-full bg-purple-500" style={{ width: `${r.pct}%` }} />
                    </div>
                    <span className={`text-xs font-bold ${theme.highlight} w-6 text-right`}>{r.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Trends */}
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
              <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Monthly Trends: New vs Resolved</h3>
              <div className="flex items-end gap-4 h-32">
                {[
                  { month: 'Nov', newT: 12, resolved: 10 },
                  { month: 'Dec', newT: 8, resolved: 9 },
                  { month: 'Jan', newT: 15, resolved: 13 },
                  { month: 'Feb', newT: 10, resolved: 8 },
                  { month: 'Mar', newT: 3, resolved: 1 },
                ].map(m => (
                  <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                    <div className="flex gap-1 items-end h-24">
                      <div className="w-5 rounded-t-lg bg-blue-500" style={{ height: `${(m.newT / 15) * 100}%` }} />
                      <div className="w-5 rounded-t-lg bg-emerald-500" style={{ height: `${(m.resolved / 15) * 100}%` }} />
                    </div>
                    <span className={`text-[10px] ${theme.iconColor}`}>{m.month}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-4 mt-2">
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-blue-500" /><span className={`text-[10px] ${theme.iconColor}`}>New</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-emerald-500" /><span className={`text-[10px] ${theme.iconColor}`}>Resolved</span></div>
              </div>
            </div>

            {/* Satisfaction by Category */}
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
              <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Satisfaction by Category</h3>
              <div className="space-y-2">
                {[
                  { cat: 'Technical', avg: 5.0 },
                  { cat: 'Library', avg: 5.0 },
                  { cat: 'Finance', avg: 4.0 },
                  { cat: 'Infrastructure', avg: 3.0 },
                ].map(c => (
                  <div key={c.cat} className="flex items-center gap-3">
                    <span className={`text-xs ${theme.highlight} w-28`}>{c.cat}</span>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} size={10} className={s < Math.round(c.avg) ? 'text-amber-500 fill-amber-500' : 'text-gray-300'} />
                      ))}
                    </div>
                    <span className={`text-xs font-bold ${theme.primaryText}`}>{c.avg.toFixed(1)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Raise Ticket Modal ── */}
      {showRaiseTicket && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowRaiseTicket(false)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} shadow-2xl w-full max-w-lg p-6 space-y-4 max-h-[85vh] overflow-y-auto`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Ticket size={16} className={theme.primaryText} />
                <h2 className={`text-lg font-bold ${theme.highlight}`}>Raise Ticket</h2>
              </div>
              <button onClick={() => setShowRaiseTicket(false)} className={`p-1.5 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
            </div>
            <FormField label="Title" required theme={theme}>
              <InputField placeholder="Brief description of the issue..." value="" onChange={() => {}} theme={theme} />
            </FormField>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Category" required theme={theme}>
                <SelectField options={categories.slice(1)} value="" onChange={() => {}} theme={theme} placeholder="Select category" />
              </FormField>
              <FormField label="Priority" required theme={theme}>
                <div className="flex gap-1.5">
                  {['Low', 'Normal', 'High', 'Critical'].map(p => (
                    <button key={p} className={`flex-1 px-2 py-2 rounded-lg text-[10px] font-bold border transition-all ${theme.border} ${theme.iconColor} ${theme.buttonHover}`}>{p}</button>
                  ))}
                </div>
              </FormField>
            </div>
            <FormField label="Description" required theme={theme}>
              <TextAreaField placeholder="Detailed description of the issue..." value="" onChange={() => {}} theme={theme} rows={4} />
            </FormField>
            <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-[10px] ${theme.iconColor}`}>Attachments</p>
              <div className={`mt-2 border-2 border-dashed ${theme.border} rounded-xl p-4 text-center`}>
                <p className={`text-xs ${theme.iconColor}`}>Drag & drop files or click to upload</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Images, PDF (max 5MB each)</p>
              </div>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg} flex items-center gap-3`}>
              <input type="checkbox" className="rounded" id="anon-toggle" />
              <label htmlFor="anon-toggle" className={`text-xs ${theme.highlight} cursor-pointer`}>Submit anonymously</label>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowRaiseTicket(false)} className={`flex-1 py-2.5 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.highlight}`}>Cancel</button>
              <button onClick={() => { window.alert('Ticket TKT-009 raised successfully! (Blueprint demo)'); setShowRaiseTicket(false); }} className={`flex-1 py-2.5 rounded-xl ${theme.primary} text-white text-sm font-bold`}>Submit Ticket</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
