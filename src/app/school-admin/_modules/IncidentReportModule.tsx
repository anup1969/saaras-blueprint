'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { StatCard, StatusBadge, TabBar, SearchBar, DataTable } from '@/components/shared';
import {
  ShieldAlert, AlertTriangle, CheckCircle, FileText, Plus, Search,
  ChevronDown, ChevronUp, X, MapPin, Clock, Users, Filter
} from 'lucide-react';

// ── Mock Data ──
const incidents = [
  { id: 'INC-001', date: '01-Mar-2026', time: '10:15', type: 'Injury', severity: 'Medium', description: 'Student fell from monkey bars during recess', location: 'Playground', studentsInvolved: ['Aarav Patel (10-A)', 'Vivaan Mehta (6-A)'], reportedBy: 'PT Teacher — Mr. Patil', status: 'Action Taken', actionTaken: 'First aid administered, parent notified, playground inspection scheduled' },
  { id: 'INC-002', date: '28-Feb-2026', time: '14:30', type: 'Bullying', severity: 'High', description: 'Repeated verbal bullying reported by victim\'s parent', location: 'Classroom 8-B', studentsInvolved: ['Rohan Singh (8-B)', 'Kabir Joshi (8-B)'], reportedBy: 'Class Teacher — Mrs. Iyer', status: 'Under Investigation', actionTaken: 'Counselor meeting scheduled for both students' },
  { id: 'INC-003', date: '27-Feb-2026', time: '12:00', type: 'Property Damage', severity: 'Low', description: 'Lab equipment (microscope) broken accidentally during science practical', location: 'Science Lab', studentsInvolved: ['Diya Reddy (9-C)'], reportedBy: 'Lab Assistant — Mr. Joshi', status: 'Resolved', actionTaken: 'Replacement ordered, student cautioned' },
  { id: 'INC-004', date: '26-Feb-2026', time: '08:30', type: 'Unauthorized Exit', severity: 'Critical', description: 'Student left school premises without permission during morning assembly', location: 'Main Gate', studentsInvolved: ['Arjun Singh (10-A)'], reportedBy: 'Security Guard — Ramesh', status: 'Escalated', actionTaken: 'Parents called immediately, student found at nearby shop, disciplinary committee notified' },
  { id: 'INC-005', date: '25-Feb-2026', time: '11:45', type: 'Fight', severity: 'High', description: 'Physical altercation between two students over seating dispute', location: 'Canteen', studentsInvolved: ['Siddharth Rao (7-A)', 'Ishaan Kumar (7-B)'], reportedBy: 'Canteen Supervisor', status: 'Action Taken', actionTaken: 'Both students suspended for 2 days, parents meeting conducted' },
  { id: 'INC-006', date: '24-Feb-2026', time: '15:00', type: 'Medical Emergency', severity: 'Critical', description: 'Student had an epileptic seizure during class', location: 'Classroom 5-B', studentsInvolved: ['Priya Nair (5-B)'], reportedBy: 'Class Teacher — Ms. D\'Souza', status: 'Resolved', actionTaken: 'Nurse attended, ambulance called, parent present, student stable' },
  { id: 'INC-007', date: '22-Feb-2026', time: '09:00', type: 'Theft', severity: 'Medium', description: 'Student\'s mobile phone reported stolen from bag during PT period', location: 'Classroom 9-C', studentsInvolved: ['Ananya Gupta (9-C)'], reportedBy: 'Ananya Gupta (9-C)', status: 'Under Investigation', actionTaken: 'CCTV footage being reviewed' },
  { id: 'INC-008', date: '20-Feb-2026', time: '13:15', type: 'Other', severity: 'Low', description: 'Water leak in girls\' washroom causing wet floor hazard', location: 'Block B — Washroom', studentsInvolved: [], reportedBy: 'Cleaning Staff', status: 'Resolved', actionTaken: 'Plumber called, floor dried, hazard sign placed' },
];

const incidentTypes = ['All', 'Injury', 'Fight', 'Bullying', 'Property Damage', 'Theft', 'Unauthorized Exit', 'Medical Emergency', 'Other'];
const severityOptions = ['All', 'Low', 'Medium', 'High', 'Critical'];

const severityColor = (s: string) => {
  if (s === 'Low') return 'bg-slate-100 text-slate-600';
  if (s === 'Medium') return 'bg-amber-100 text-amber-700';
  if (s === 'High') return 'bg-orange-100 text-orange-700';
  return 'bg-red-100 text-red-700';
};

const statusColor = (s: string) => {
  if (s === 'Reported') return 'bg-blue-100 text-blue-700';
  if (s === 'Under Investigation') return 'bg-amber-100 text-amber-700';
  if (s === 'Action Taken') return 'bg-purple-100 text-purple-700';
  if (s === 'Resolved') return 'bg-emerald-100 text-emerald-700';
  return 'bg-red-100 text-red-700';
};

export default function IncidentReportModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All Incidents');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showReportForm, setShowReportForm] = useState(false);
  const [typeFilter, setTypeFilter] = useState('All');
  const [sevFilter, setSevFilter] = useState('All');
  const [formType, setFormType] = useState('Injury');
  const [formSeverity, setFormSeverity] = useState('Medium');

  const activeIncidents = incidents.filter(i => i.status !== 'Resolved');
  const resolvedIncidents = incidents.filter(i => i.status === 'Resolved');
  const criticalCount = incidents.filter(i => i.severity === 'Critical').length;

  const filtered = incidents.filter(i =>
    (typeFilter === 'All' || i.type === typeFilter) &&
    (sevFilter === 'All' || i.severity === sevFilter)
  );

  // Summary stats for Reports tab
  const byType = incidentTypes.slice(1).map(t => ({ type: t, count: incidents.filter(i => i.type === t).length })).filter(t => t.count > 0);
  const byLocation = [...new Set(incidents.map(i => i.location))].map(loc => ({ location: loc, count: incidents.filter(i => i.location === loc).length }));

  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Incident Reports</h1>
      <TabBar tabs={['All Incidents', 'Active', 'Resolved', 'Reports']} active={tab} onChange={setTab} theme={theme} />

      {/* ── All Incidents ── */}
      {tab === 'All Incidents' && (
        <div className="space-y-3">
          <div className="grid grid-cols-4 gap-4">
            <StatCard icon={ShieldAlert} label="Total This Month" value={String(incidents.length)} color="bg-slate-500" theme={theme} />
            <StatCard icon={AlertTriangle} label="Active" value={String(activeIncidents.length)} color="bg-amber-500" theme={theme} />
            <StatCard icon={CheckCircle} label="Resolved" value={String(resolvedIncidents.length)} color="bg-emerald-500" theme={theme} />
            <StatCard icon={ShieldAlert} label="Critical" value={String(criticalCount)} color="bg-red-500" theme={theme} />
          </div>
          <div className="flex gap-3">
            <SearchBar placeholder="Search incidents..." theme={theme} icon={Search} />
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
              {incidentTypes.map(t => <option key={t}>{t}</option>)}
            </select>
            <select value={sevFilter} onChange={e => setSevFilter(e.target.value)} className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
              {severityOptions.map(s => <option key={s}>{s}</option>)}
            </select>
            <button onClick={() => setShowReportForm(true)} className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1 whitespace-nowrap`}><Plus size={14} /> Report Incident</button>
          </div>
          <div className="space-y-2">
            {filtered.map(inc => (
              <div key={inc.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden`}>
                <div className="flex items-center gap-3 p-4 cursor-pointer" onClick={() => setExpandedId(expandedId === inc.id ? null : inc.id)}>
                  <span className={`font-mono text-xs ${theme.primaryText} w-20`}>{inc.id}</span>
                  <span className={`text-xs ${theme.iconColor} w-24`}>{inc.date}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${severityColor(inc.severity)} w-16 text-center`}>{inc.severity}</span>
                  <span className={`text-xs font-bold ${theme.highlight} w-32`}>{inc.type}</span>
                  <span className={`text-xs ${theme.iconColor} flex-1 truncate`}>{inc.description}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${statusColor(inc.status)}`}>{inc.status}</span>
                  {expandedId === inc.id ? <ChevronUp size={14} className={theme.iconColor} /> : <ChevronDown size={14} className={theme.iconColor} />}
                </div>
                {expandedId === inc.id && (
                  <div className={`px-4 pb-4 pt-0 border-t ${theme.border} space-y-2`}>
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
                        <p className={`text-[10px] ${theme.iconColor} uppercase font-bold mb-1`}>Location</p>
                        <p className={`text-xs font-bold ${theme.highlight} flex items-center gap-1`}><MapPin size={12} /> {inc.location}</p>
                      </div>
                      <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
                        <p className={`text-[10px] ${theme.iconColor} uppercase font-bold mb-1`}>Reported By</p>
                        <p className={`text-xs font-bold ${theme.highlight}`}>{inc.reportedBy}</p>
                      </div>
                    </div>
                    {inc.studentsInvolved.length > 0 && (
                      <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
                        <p className={`text-[10px] ${theme.iconColor} uppercase font-bold mb-1`}>Students Involved</p>
                        <div className="flex flex-wrap gap-1.5">
                          {inc.studentsInvolved.map(s => (
                            <span key={s} className={`text-[10px] px-2 py-0.5 rounded-full font-bold bg-blue-100 text-blue-700`}>{s}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
                      <p className={`text-[10px] ${theme.iconColor} uppercase font-bold mb-1`}>Action Taken</p>
                      <p className={`text-xs ${theme.highlight}`}>{inc.actionTaken}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Active ── */}
      {tab === 'Active' && (
        <div className="space-y-2">
          <p className={`text-xs ${theme.iconColor}`}>{activeIncidents.length} open incident(s) requiring attention</p>
          {activeIncidents.map(inc => (
            <div key={inc.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-2`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`font-mono text-xs ${theme.primaryText}`}>{inc.id}</span>
                  <span className={`text-xs font-bold ${theme.highlight}`}>{inc.type}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${severityColor(inc.severity)}`}>{inc.severity}</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${statusColor(inc.status)}`}>{inc.status}</span>
              </div>
              <p className={`text-xs ${theme.iconColor}`}>{inc.description}</p>
              <div className="flex items-center gap-4">
                <span className={`text-[10px] ${theme.iconColor} flex items-center gap-1`}><Clock size={10} /> {inc.date} {inc.time}</span>
                <span className={`text-[10px] ${theme.iconColor} flex items-center gap-1`}><MapPin size={10} /> {inc.location}</span>
              </div>
              <div className={`p-2 rounded-lg ${theme.secondaryBg}`}>
                <p className={`text-[10px] ${theme.iconColor}`}><strong>Action:</strong> {inc.actionTaken}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Resolved ── */}
      {tab === 'Resolved' && (
        <DataTable
          headers={['ID', 'Date', 'Type', 'Severity', 'Description', 'Action Taken']}
          rows={resolvedIncidents.map(inc => [
            <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{inc.id}</span>,
            <span key="date" className={theme.iconColor}>{inc.date}</span>,
            <span key="type" className={`font-bold ${theme.highlight}`}>{inc.type}</span>,
            <span key="sev" className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${severityColor(inc.severity)}`}>{inc.severity}</span>,
            <span key="desc" className={`text-xs ${theme.iconColor}`}>{inc.description}</span>,
            <span key="act" className={`text-xs ${theme.iconColor}`}>{inc.actionTaken}</span>,
          ])}
          theme={theme}
        />
      )}

      {/* ── Reports ── */}
      {tab === 'Reports' && (
        <div className="grid grid-cols-2 gap-4">
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Incidents by Type</h3>
            <div className="space-y-2">
              {byType.map(t => (
                <div key={t.type} className="flex items-center gap-3">
                  <span className={`text-xs ${theme.highlight} w-32`}>{t.type}</span>
                  <div className={`flex-1 h-4 rounded-full ${theme.secondaryBg} overflow-hidden`}>
                    <div className={`h-full rounded-full ${theme.primary}`} style={{ width: `${(t.count / incidents.length) * 100}%` }} />
                  </div>
                  <span className={`text-xs font-bold ${theme.highlight} w-6 text-right`}>{t.count}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Incidents by Location</h3>
            <div className="space-y-2">
              {byLocation.map(l => (
                <div key={l.location} className="flex items-center gap-3">
                  <span className={`text-xs ${theme.highlight} w-40 truncate`}>{l.location}</span>
                  <div className={`flex-1 h-4 rounded-full ${theme.secondaryBg} overflow-hidden`}>
                    <div className="h-full rounded-full bg-amber-500" style={{ width: `${(l.count / incidents.length) * 100}%` }} />
                  </div>
                  <span className={`text-xs font-bold ${theme.highlight} w-6 text-right`}>{l.count}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 col-span-2`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Monthly Trend</h3>
            <div className="flex items-end gap-4 h-32">
              {[
                { month: 'Oct', count: 3 }, { month: 'Nov', count: 5 }, { month: 'Dec', count: 2 },
                { month: 'Jan', count: 6 }, { month: 'Feb', count: 7 }, { month: 'Mar', count: 1 },
              ].map(m => (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                  <span className={`text-[10px] font-bold ${theme.highlight}`}>{m.count}</span>
                  <div className={`w-full rounded-t-lg ${theme.primary}`} style={{ height: `${(m.count / 7) * 100}%` }} />
                  <span className={`text-[10px] ${theme.iconColor}`}>{m.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Report Incident Modal ── */}
      {showReportForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowReportForm(false)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} shadow-2xl w-full max-w-lg p-6 space-y-4 max-h-[85vh] overflow-y-auto`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert size={16} className={theme.primaryText} />
                <h2 className={`text-lg font-bold ${theme.highlight}`}>Report Incident</h2>
              </div>
              <button onClick={() => setShowReportForm(false)} className={`p-1.5 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Type <span className="text-red-500">*</span></label>
                <select value={formType} onChange={e => setFormType(e.target.value)} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                  {incidentTypes.slice(1).map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Severity <span className="text-red-500">*</span></label>
                <div className="flex gap-2">
                  {['Low', 'Medium', 'High', 'Critical'].map(s => (
                    <button key={s} onClick={() => setFormSeverity(s)} className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${formSeverity === s ? `${theme.primary} text-white border-transparent` : `${theme.border} ${theme.iconColor} ${theme.buttonHover}`}`}>{s}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Description <span className="text-red-500">*</span></label>
                <textarea rows={3} placeholder="Detailed description of the incident..." className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} resize-none`} />
              </div>
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Location <span className="text-red-500">*</span></label>
                <input placeholder="e.g. Playground, Classroom 5-B, Canteen..." className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`} />
              </div>
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Students Involved</label>
                <input placeholder="Search and add students..." className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`} />
              </div>
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Witnesses</label>
                <input placeholder="Names of witnesses..." className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`} />
              </div>
              <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-[10px] ${theme.iconColor}`}>Photos / Evidence</p>
                <div className={`mt-2 border-2 border-dashed ${theme.border} rounded-xl p-4 text-center`}>
                  <p className={`text-xs ${theme.iconColor}`}>Drag & drop files or click to upload</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowReportForm(false)} className={`flex-1 py-2.5 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.highlight} ${theme.buttonHover}`}>Cancel</button>
              <button onClick={() => { window.alert('Incident reported successfully! ID: INC-009 (Blueprint demo)'); setShowReportForm(false); }} className={`flex-1 py-2.5 rounded-xl ${theme.primary} text-white text-sm font-bold`}>Submit Report</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
