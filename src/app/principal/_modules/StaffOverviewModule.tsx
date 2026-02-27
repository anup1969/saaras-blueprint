'use client';

import { StatCard, StatusBadge, DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import { UserCheck, Calendar, Clock, Briefcase, BookOpen, Users } from 'lucide-react';

export default function StaffOverviewModule({ theme }: { theme: Theme }) {
  const departments = [
    { dept: 'Teaching', head: 'Dr. Priya Sharma', strength: 89, attendance: 96.2, performance: 'Excellent' },
    { dept: 'Admin', head: 'Rajesh Kumar', strength: 23, attendance: 94.8, performance: 'Good' },
    { dept: 'Transport', head: 'Mohammed Irfan', strength: 18, attendance: 91.5, performance: 'Good' },
    { dept: 'IT & Lab', head: 'Vikram Singh', strength: 8, attendance: 97.0, performance: 'Excellent' },
    { dept: 'Security', head: 'Ramesh Yadav', strength: 4, attendance: 100, performance: 'Good' },
  ];

  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Staff Overview</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={UserCheck} label="Present Today" value="128/142" color="bg-emerald-500" sub="90.1%" theme={theme} />
        <StatCard icon={Calendar} label="On Leave" value="8" color="bg-amber-500" theme={theme} />
        <StatCard icon={Clock} label="Late Today" value="3" color="bg-red-500" theme={theme} />
        <StatCard icon={Briefcase} label="Open Positions" value="3" color="bg-blue-500" theme={theme} />
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Department-wise Overview</h3>
        <DataTable
          headers={['Department', 'Head', 'Strength', 'Attendance %', 'Performance']}
          rows={departments.map(d => [
            <span key="dept" className={`font-bold ${theme.highlight}`}>{d.dept}</span>,
            <span key="head" className={theme.iconColor}>{d.head}</span>,
            <span key="str" className={`font-bold ${theme.highlight}`}>{d.strength}</span>,
            <span key="att" className={d.attendance >= 95 ? 'text-emerald-600 font-bold' : `font-bold ${theme.highlight}`}>{d.attendance}%</span>,
            <StatusBadge key="perf" status={d.performance === 'Excellent' ? 'Active' : 'Pending'} theme={theme} />,
          ])}
          theme={theme}
        />
      </div>

      {/* Staff Attendance Trend */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>This Week&apos;s Attendance Snapshot</h3>
        <div className="grid grid-cols-5 gap-2">
          {[
            { day: 'Mon', present: 136, total: 142 },
            { day: 'Tue', present: 131, total: 142 },
            { day: 'Wed', present: 134, total: 142 },
            { day: 'Thu', present: 128, total: 142 },
            { day: 'Fri', present: 130, total: 142 },
          ].map(d => (
            <div key={d.day} className={`${theme.secondaryBg} rounded-xl p-3 text-center`}>
              <p className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>{d.day}</p>
              <p className={`text-lg font-bold ${theme.highlight} mt-1`}>{d.present}</p>
              <p className={`text-[10px] ${theme.iconColor}`}>of {d.total}</p>
              <div className={`mt-2 h-1.5 rounded-full bg-gray-200`}>
                <div className="h-full rounded-full bg-emerald-500" style={{ width: `${(d.present / d.total) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Syllabus Completion ── */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-blue-500" />
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Syllabus Completion Status</h3>
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold`}>As of Feb 2026</span>
        </div>
        <div className="space-y-3">
          {[
            { subject: 'Mathematics', teacher: 'Ms. Priya Sharma', total: 24, completed: 18, color: 'bg-blue-500' },
            { subject: 'Science', teacher: 'Dr. Meena Joshi', total: 22, completed: 20, color: 'bg-emerald-500' },
            { subject: 'English', teacher: 'Mrs. Kavita Nair', total: 20, completed: 15, color: 'bg-purple-500' },
            { subject: 'Hindi', teacher: 'Mrs. Rekha Gupta', total: 18, completed: 14, color: 'bg-amber-500' },
            { subject: 'Social Studies', teacher: 'Mr. Suresh Pillai', total: 20, completed: 16, color: 'bg-teal-500' },
            { subject: 'Computer Science', teacher: 'Mr. Arjun Rao', total: 16, completed: 14, color: 'bg-indigo-500' },
            { subject: 'Gujarati', teacher: 'Mrs. Nita Trivedi', total: 15, completed: 10, color: 'bg-orange-500' },
            { subject: 'Physical Education', teacher: 'Mr. Dinesh Parmar', total: 12, completed: 11, color: 'bg-rose-500' },
          ].map((row) => {
            const pct = Math.round((row.completed / row.total) * 100);
            const remaining = row.total - row.completed;
            return (
              <div key={row.subject} className={`p-3 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${theme.highlight}`}>{row.subject}</span>
                    <span className={`text-[10px] ${theme.iconColor}`}>{row.teacher}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] ${theme.iconColor}`}>{row.completed}/{row.total} chapters</span>
                    <span className={`text-[10px] ${theme.iconColor}`}>{remaining} remaining</span>
                    <span className={`text-xs font-bold ${pct >= 85 ? 'text-emerald-600' : pct >= 70 ? 'text-amber-600' : 'text-red-600'}`}>{pct}%</span>
                  </div>
                </div>
                <div className={`h-2 rounded-full bg-gray-200`}>
                  <div className={`h-2 rounded-full ${row.color} transition-all`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Substitution Summary ── */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-amber-500" />
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Substitution Summary — This Month</h3>
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold`}>Feb 2026</span>
        </div>
        <DataTable
          headers={['Teacher', 'Dept', 'Total Substitutions', 'Last Substitution', 'Reason']}
          rows={[
            [
              <span key="n" className={`font-bold ${theme.highlight}`}>Ms. Priya Sharma</span>,
              <span key="d" className={theme.iconColor}>Mathematics</span>,
              <span key="t" className={`font-bold ${theme.highlight}`}>5</span>,
              <span key="l" className={theme.iconColor}>22 Feb 2026</span>,
              <span key="r" className={theme.iconColor}>Covered for Mrs. Gupta (SL)</span>,
            ],
            [
              <span key="n" className={`font-bold ${theme.highlight}`}>Dr. Meena Joshi</span>,
              <span key="d" className={theme.iconColor}>Science</span>,
              <span key="t" className={`font-bold ${theme.highlight}`}>3</span>,
              <span key="l" className={theme.iconColor}>20 Feb 2026</span>,
              <span key="r" className={theme.iconColor}>Covered for Mr. Pillai (CL)</span>,
            ],
            [
              <span key="n" className={`font-bold ${theme.highlight}`}>Mr. Arjun Rao</span>,
              <span key="d" className={theme.iconColor}>Computer Science</span>,
              <span key="t" className={`font-bold ${theme.highlight}`}>4</span>,
              <span key="l" className={theme.iconColor}>21 Feb 2026</span>,
              <span key="r" className={theme.iconColor}>Covered for Mr. Desai (Training)</span>,
            ],
            [
              <span key="n" className={`font-bold ${theme.highlight}`}>Mrs. Kavita Nair</span>,
              <span key="d" className={theme.iconColor}>English</span>,
              <span key="t" className={`font-bold ${theme.highlight}`}>2</span>,
              <span key="l" className={theme.iconColor}>18 Feb 2026</span>,
              <span key="r" className={theme.iconColor}>Covered for Ms. Kapoor (CL)</span>,
            ],
            [
              <span key="n" className={`font-bold ${theme.highlight}`}>Mr. Suresh Pillai</span>,
              <span key="d" className={theme.iconColor}>Social Studies</span>,
              <span key="t" className={`font-bold ${theme.highlight}`}>3</span>,
              <span key="l" className={theme.iconColor}>19 Feb 2026</span>,
              <span key="r" className={theme.iconColor}>Covered for Mrs. Trivedi (SL)</span>,
            ],
            [
              <span key="n" className={`font-bold ${theme.highlight}`}>Mrs. Rekha Gupta</span>,
              <span key="d" className={theme.iconColor}>Hindi</span>,
              <span key="t" className={`font-bold ${theme.highlight}`}>1</span>,
              <span key="l" className={theme.iconColor}>14 Feb 2026</span>,
              <span key="r" className={theme.iconColor}>Covered for Mrs. Nair (EL)</span>,
            ],
          ]}
          theme={theme}
        />
        <p className={`text-[10px] ${theme.iconColor} mt-2`}>Total substitutions this month: 18 | Most utilized: Ms. Priya Sharma (5)</p>
      </div>
    </div>
  );
}
