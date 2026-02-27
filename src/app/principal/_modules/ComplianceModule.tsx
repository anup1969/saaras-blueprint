'use client';

import { type Theme } from '@/lib/themes';
import { AlertTriangle, Clock, Calendar } from 'lucide-react';

export default function ComplianceModule({ theme, isPreschool }: { theme: Theme; isPreschool?: boolean }) {
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
    </div>
  );
}
