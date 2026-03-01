'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { AlertTriangle, Clock, Calendar, Shield, Flame, CheckCircle, XCircle, Minus, Plus, TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';

export default function ComplianceModule({ theme, isPreschool }: { theme: Theme; isPreschool?: boolean }) {
  const [showAuditChecklist, setShowAuditChecklist] = useState(false);
  const [showScheduleDrill, setShowScheduleDrill] = useState(false);
  const [auditFreq, setAuditFreq] = useState('Quarterly');
  const [drillType, setDrillType] = useState('Fire');

  // Safety Audit checklist data
  const auditChecklist = [
    { item: 'Fire Extinguishers', status: 'Compliant', lastChecked: '15-Jan-2026', remarks: 'All 24 units inspected, tags updated' },
    { item: 'CCTV Cameras', status: 'Compliant', lastChecked: '20-Jan-2026', remarks: '36/36 cameras operational' },
    { item: 'First Aid Kits', status: 'Needs Attention', lastChecked: '10-Jan-2026', remarks: '2 kits low on supplies — reorder placed' },
    { item: 'Emergency Exits', status: 'Compliant', lastChecked: '15-Jan-2026', remarks: 'All 8 exits clear and signage visible' },
    { item: 'Electrical Safety', status: 'Compliant', lastChecked: '05-Jan-2026', remarks: 'Wiring inspection complete, no issues' },
    { item: 'Playground Equipment', status: 'Needs Attention', lastChecked: '12-Jan-2026', remarks: 'Monkey bars need tightening, scheduled for Feb' },
    { item: 'Water Quality', status: 'Compliant', lastChecked: '18-Jan-2026', remarks: 'Lab report — TDS 120, potable' },
    { item: 'Building Structure', status: 'Compliant', lastChecked: '01-Dec-2025', remarks: 'Annual structural audit passed' },
    { item: 'Fire Alarm System', status: 'Non-Compliant', lastChecked: '15-Jan-2026', remarks: 'Block C alarm panel faulty — repair in progress' },
    { item: 'Boundary Wall & Gates', status: 'Compliant', lastChecked: '10-Jan-2026', remarks: 'Height compliant, CCTV at all gates' },
  ];

  const compliantCount = auditChecklist.filter(a => a.status === 'Compliant').length;
  const auditScore = Math.round((compliantCount / auditChecklist.length) * 100);

  const evacuationDrills = [
    { date: '15-Feb-2026', type: 'Fire', duration: '4 min 30 sec', studentsEvacuated: 960, issues: 'Block C exit slow — 45 sec delay', score: 88 },
    { date: '10-Dec-2025', type: 'Earthquake', duration: '3 min 15 sec', studentsEvacuated: 940, issues: 'None', score: 95 },
    { date: '20-Oct-2025', type: 'Lockdown', duration: '2 min 10 sec', studentsEvacuated: 0, issues: 'Class 3-B door lock jammed', score: 82 },
    { date: '15-Aug-2025', type: 'Fire', duration: '5 min 00 sec', studentsEvacuated: 920, issues: 'Assembly point confusion — signage added', score: 78 },
    { date: '01-Jun-2025', type: 'Earthquake', duration: '3 min 45 sec', studentsEvacuated: 910, issues: 'None', score: 92 },
  ];

  const auditStatusColor = (s: string) => {
    if (s === 'Compliant') return 'bg-emerald-100 text-emerald-700';
    if (s === 'Needs Attention') return 'bg-amber-100 text-amber-700';
    return 'bg-red-100 text-red-700';
  };

  const auditStatusIcon = (s: string) => {
    if (s === 'Compliant') return <CheckCircle size={14} className="text-emerald-600" />;
    if (s === 'Needs Attention') return <Minus size={14} className="text-amber-600" />;
    return <XCircle size={14} className="text-red-600" />;
  };

  // Preschool compliance data — ECCE, health/hygiene, food safety, staff verification
  const overdueItems = isPreschool ? [
    { title: 'Fire Safety Certificate renewal', dueDate: '31-Jan-2026', assignedTo: 'Centre Head', status: 'Overdue' },
    { title: 'FSSAI food license renewal (kitchen)', dueDate: '15-Jan-2026', assignedTo: 'Nutritionist', status: 'Overdue' },
  ] : [
    { title: 'Fire Safety Certificate renewal', dueDate: '31-Jan-2026', assignedTo: 'Rajesh Kumar', status: 'Overdue' },
    { title: 'CBSE affiliation renewal', dueDate: '15-Jan-2026', assignedTo: 'Dr. Priya Sharma', status: 'Overdue' },
  ];

  const dueThisMonth = isPreschool ? [
    { title: 'Staff-child ratio compliance check', dueDate: '28-Feb-2026', assignedTo: 'Centre Head', status: 'In Progress' },
    { title: 'Staff background verification (2 new)', dueDate: '25-Feb-2026', assignedTo: 'HR Manager', status: 'Pending' },
    { title: 'POCSO training completion — all staff', dueDate: '20-Feb-2026', assignedTo: 'Coordinator', status: 'In Progress' },
    { title: 'Health & hygiene inspection — classrooms', dueDate: '22-Feb-2026', assignedTo: 'Admin', status: 'Pending' },
    { title: 'First aid kit restocking & expiry check', dueDate: '18-Feb-2026', assignedTo: 'Receptionist', status: 'Pending' },
  ] : [
    { title: 'Annual audit report submission', dueDate: '28-Feb-2026', assignedTo: 'Accounts Head', status: 'In Progress' },
    { title: 'Staff background verification', dueDate: '25-Feb-2026', assignedTo: 'HR Manager', status: 'Pending' },
    { title: 'POCSO training completion', dueDate: '20-Feb-2026', assignedTo: 'Vice Principal', status: 'In Progress' },
  ];

  const upcomingItems = isPreschool ? [
    { title: 'ECCE guidelines compliance audit (NEP 2020)', dueDate: '15-Mar-2026', assignedTo: 'Centre Head', status: 'Scheduled' },
    { title: 'Building safety & childproofing inspection', dueDate: '01-Apr-2026', assignedTo: 'Admin', status: 'Scheduled' },
    { title: 'Annual health checkup — all children', dueDate: '10-Apr-2026', assignedTo: 'Medical Officer', status: 'Scheduled' },
    { title: 'RTE compliance report (if applicable)', dueDate: '15-Apr-2026', assignedTo: 'School Admin', status: 'Scheduled' },
    { title: 'Food safety audit — kitchen & storage', dueDate: '20-Apr-2026', assignedTo: 'Nutritionist', status: 'Scheduled' },
  ] : [
    { title: 'RTE compliance report', dueDate: '15-Mar-2026', assignedTo: 'School Admin', status: 'Scheduled' },
    { title: 'Infrastructure safety inspection', dueDate: '01-Apr-2026', assignedTo: 'Rajesh Kumar', status: 'Scheduled' },
    { title: 'Annual health checkup records', dueDate: '10-Apr-2026', assignedTo: 'Medical Officer', status: 'Scheduled' },
  ];

  // SQAAF for regular, ECCE Compliance domains for preschool
  const complianceDomains = isPreschool ? [
    { name: 'Staff-Child Ratios', score: 92, color: 'bg-emerald-500' },
    { name: 'Health & Hygiene', score: 85, color: 'bg-blue-500' },
    { name: 'Food Safety (FSSAI)', score: 78, color: 'bg-amber-500' },
    { name: 'Staff Background Verification', score: 88, color: 'bg-purple-500' },
    { name: 'First Aid & Emergency Readiness', score: 75, color: 'bg-teal-500' },
    { name: 'Building Safety & Childproofing', score: 82, color: 'bg-indigo-500' },
    { name: 'ECCE Curriculum (NEP 2020)', score: 70, color: 'bg-orange-500' },
    { name: 'POCSO Compliance', score: 90, color: 'bg-rose-500' },
  ] : [
    { name: 'Curricular Aspects', score: 82, color: 'bg-emerald-500' },
    { name: 'Teaching-Learning', score: 78, color: 'bg-blue-500' },
    { name: 'Infrastructure', score: 71, color: 'bg-amber-500' },
    { name: 'Human Resources', score: 85, color: 'bg-purple-500' },
    { name: 'Student Support', score: 80, color: 'bg-teal-500' },
    { name: 'Governance', score: 75, color: 'bg-indigo-500' },
    { name: 'Innovation', score: 68, color: 'bg-orange-500' },
  ];

  const overallScore = isPreschool ? 83 : 78;

  const statusBadgeColor = (status: string) => {
    if (status === 'Overdue') return 'bg-red-100 text-red-700';
    if (status === 'In Progress') return 'bg-amber-100 text-amber-700';
    if (status === 'Pending') return 'bg-yellow-100 text-yellow-700';
    return 'bg-blue-100 text-blue-700';
  };

  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>{isPreschool ? 'Preschool Compliance' : 'Compliance'}</h1>

      {/* Task Report Cards */}
      <div className="space-y-4">
        {/* Important / Overdue (Red) */}
        <div className={`rounded-2xl border-2 border-red-200 bg-red-50 p-4`}>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={16} className="text-red-600" />
            <h3 className="text-sm font-bold text-red-700">Important / Overdue</h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-200 text-red-800 font-bold">{overdueItems.length} items</span>
          </div>
          <div className="space-y-2">
            {overdueItems.map(item => (
              <div key={item.title} className={`${theme.cardBg} rounded-xl p-3 flex items-center justify-between`}>
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>{item.title}</p>
                  <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>Due: {item.dueDate} &middot; Assigned to: {item.assignedTo}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${statusBadgeColor(item.status)}`}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Due This Month (Amber) */}
        <div className={`rounded-2xl border-2 border-amber-200 bg-amber-50 p-4`}>
          <div className="flex items-center gap-2 mb-3">
            <Clock size={16} className="text-amber-600" />
            <h3 className="text-sm font-bold text-amber-700">Due This Month</h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200 text-amber-800 font-bold">{dueThisMonth.length} items</span>
          </div>
          <div className="space-y-2">
            {dueThisMonth.map(item => (
              <div key={item.title} className={`${theme.cardBg} rounded-xl p-3 flex items-center justify-between`}>
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>{item.title}</p>
                  <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>Due: {item.dueDate} &middot; Assigned to: {item.assignedTo}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${statusBadgeColor(item.status)}`}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming (Blue) */}
        <div className={`rounded-2xl border-2 border-blue-200 bg-blue-50 p-4`}>
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={16} className="text-blue-600" />
            <h3 className="text-sm font-bold text-blue-700">Upcoming</h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-200 text-blue-800 font-bold">{upcomingItems.length} items</span>
          </div>
          <div className="space-y-2">
            {upcomingItems.map(item => (
              <div key={item.title} className={`${theme.cardBg} rounded-xl p-3 flex items-center justify-between`}>
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>{item.title}</p>
                  <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>Due: {item.dueDate} &middot; Assigned to: {item.assignedTo}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${statusBadgeColor(item.status)}`}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SQAAF Section */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className={`text-sm font-bold ${theme.highlight}`}>{isPreschool ? 'ECCE Compliance — Early Childhood Care & Education' : 'SQAAF — School Quality Assessment & Accreditation Framework'}</h3>
            <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>{isPreschool ? 'Health, safety, staff, food — 8 compliance domains' : 'Self-assessment for continuous improvement · 7 domains'}</p>
          </div>
          <div className={`w-14 h-14 rounded-2xl ${theme.primary} text-white flex flex-col items-center justify-center`}>
            <span className="text-lg font-bold">{overallScore}</span>
            <span className="text-[8px]">/ 100</span>
          </div>
        </div>
        <div className="space-y-3">
          {complianceDomains.map(d => (
            <div key={d.name} className={`flex items-center gap-3 p-3 rounded-xl ${theme.secondaryBg}`}>
              <span className={`text-xs font-bold ${theme.highlight} w-40`}>{d.name}</span>
              <div className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden">
                <div className={`h-full rounded-full ${d.score >= 80 ? 'bg-emerald-500' : d.score >= 70 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${d.score}%` }} />
              </div>
              <span className={`text-xs font-bold ${d.score >= 80 ? 'text-emerald-600' : d.score >= 70 ? 'text-amber-600' : 'text-red-600'} w-12 text-right`}>{d.score}/100</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Safety Audit Section ── */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield size={18} className={theme.primaryText} />
            <div>
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Safety Audit</h3>
              <p className={`text-[10px] ${theme.iconColor}`}>Last audit: 15-Jan-2026 &middot; Next audit: 15-Apr-2026</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] ${theme.iconColor}`}>Frequency:</span>
              <select value={auditFreq} onChange={e => setAuditFreq(e.target.value)} className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                <option>Monthly</option><option>Quarterly</option><option>Bi-Annual</option><option>Annual</option>
              </select>
            </div>
            <button onClick={() => window.alert('New audit scheduled! (Blueprint demo)')} className={`px-3 py-1.5 ${theme.primary} text-white rounded-lg text-xs font-bold`}>Schedule New Audit</button>
          </div>
        </div>

        {/* Overall compliance score bar */}
        <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold ${theme.highlight}`}>Overall Compliance Score</span>
            <span className={`text-sm font-bold ${auditScore >= 80 ? 'text-emerald-600' : auditScore >= 60 ? 'text-amber-600' : 'text-red-600'}`}>{auditScore}%</span>
          </div>
          <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
            <div className={`h-full rounded-full ${auditScore >= 80 ? 'bg-emerald-500' : auditScore >= 60 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${auditScore}%` }} />
          </div>
          <p className={`text-[10px] ${theme.iconColor} mt-1`}>{compliantCount}/{auditChecklist.length} items compliant</p>
        </div>

        {/* Audit checklist */}
        <div className="space-y-2">
          {auditChecklist.map((a, i) => (
            <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${theme.secondaryBg}`}>
              {auditStatusIcon(a.status)}
              <span className={`text-xs font-bold ${theme.highlight} w-40`}>{a.item}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${auditStatusColor(a.status)} w-28 text-center`}>{a.status}</span>
              <span className={`text-[10px] ${theme.iconColor} w-24`}>{a.lastChecked}</span>
              <span className={`text-[10px] ${theme.iconColor} flex-1 truncate`}>{a.remarks}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Evacuation Drill Section ── */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame size={18} className="text-orange-500" />
            <div>
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Evacuation Drills</h3>
              <p className={`text-[10px] ${theme.iconColor}`}>{evacuationDrills.length} drills conducted this academic year</p>
            </div>
          </div>
          <button onClick={() => setShowScheduleDrill(!showScheduleDrill)} className={`px-3 py-1.5 ${theme.primary} text-white rounded-lg text-xs font-bold flex items-center gap-1`}><Plus size={12} /> Schedule Drill</button>
        </div>

        {/* Schedule Drill form */}
        {showScheduleDrill && (
          <div className={`p-4 rounded-xl border ${theme.border} ${theme.secondaryBg} space-y-3`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Schedule New Drill</p>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Type</label>
                <select value={drillType} onChange={e => setDrillType(e.target.value)} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                  <option>Fire</option><option>Earthquake</option><option>Lockdown</option>
                </select>
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Date</label>
                <input type="date" defaultValue="2026-03-15" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`} />
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Time</label>
                <input type="time" defaultValue="10:30" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`} />
              </div>
            </div>
            <div className="space-y-1.5">
              <p className={`text-[10px] font-bold ${theme.iconColor}`}>Drill Checklist:</p>
              {['Assembly point reached', 'Headcount completed', 'Emergency services notified', 'All-clear given'].map(c => (
                <label key={c} className="flex items-center gap-2">
                  <input type="checkbox" className="accent-slate-600" />
                  <span className={`text-xs ${theme.iconColor}`}>{c}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowScheduleDrill(false)} className={`flex-1 py-2 rounded-xl ${theme.secondaryBg} border ${theme.border} text-xs font-bold ${theme.highlight}`}>Cancel</button>
              <button onClick={() => { window.alert(`${drillType} drill scheduled! (Blueprint demo)`); setShowScheduleDrill(false); }} className={`flex-1 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>Confirm Schedule</button>
            </div>
          </div>
        )}

        {/* Drill history table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className={theme.secondaryBg}>
                {['Date', 'Type', 'Duration', 'Students Evacuated', 'Issues', 'Score'].map(h => (
                  <th key={h} className={`px-3 py-2 text-left text-[10px] font-bold ${theme.iconColor} uppercase`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {evacuationDrills.map((d, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className={`px-3 py-2 ${theme.iconColor}`}>{d.date}</td>
                  <td className={`px-3 py-2 font-bold ${theme.highlight}`}>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${d.type === 'Fire' ? 'bg-red-100 text-red-700' : d.type === 'Earthquake' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>{d.type}</span>
                  </td>
                  <td className={`px-3 py-2 ${theme.iconColor}`}>{d.duration}</td>
                  <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{d.studentsEvacuated > 0 ? d.studentsEvacuated : 'N/A'}</td>
                  <td className={`px-3 py-2 ${d.issues === 'None' ? 'text-emerald-600' : 'text-amber-600'}`}>{d.issues}</td>
                  <td className="px-3 py-2">
                    <span className={`font-bold ${d.score >= 90 ? 'text-emerald-600' : d.score >= 80 ? 'text-blue-600' : 'text-amber-600'}`}>{d.score}/100</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Performance trend */}
        <div className={`flex items-center gap-3 p-3 rounded-xl ${theme.secondaryBg}`}>
          <TrendingUp size={16} className="text-emerald-600" />
          <span className={`text-xs font-bold text-emerald-600`}>Performance Improving</span>
          <span className={`text-[10px] ${theme.iconColor}`}>Average score increased from 85 to 88 over last 3 drills</span>
        </div>
      </div>

      {/* ── Incident Reports Link ── */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle size={18} className="text-amber-500" />
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Incident Reports Summary</h3>
          </div>
          <button onClick={() => window.alert('Navigating to School Admin > Incident Reports module... (Blueprint demo)')} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${theme.primaryText} flex items-center gap-1 ${theme.buttonHover}`}>
            View Full Reports <ExternalLink size={12} />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-3">
          <div className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
            <p className={`text-lg font-bold ${theme.highlight}`}>8</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Incidents This Month</p>
          </div>
          <div className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
            <p className="text-lg font-bold text-amber-600">5</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Active Investigations</p>
          </div>
          <div className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
            <p className="text-lg font-bold text-emerald-600">3</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Resolved</p>
          </div>
        </div>
      </div>
    </div>
  );
}
