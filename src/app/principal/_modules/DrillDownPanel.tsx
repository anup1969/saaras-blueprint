'use client';

import { useState } from 'react';
import { TabBar } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import { BarChart3, X, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';

/* ──────────────────── Types ──────────────────── */
interface ClassRow { cls: string; strength: number; present: number; absent: number; pct: number }
interface ClassGroup { label: string; classes: ClassRow[]; borderColor: string; bgColor: string }
interface DeptRow { dept: string; total: number; present: number; absent: number; onLeave: number; pct: number; minReq: number }
interface SubjectGroup { label: string; coordinator: string; subjects: DeptRow[]; borderColor: string; bgColor: string }
interface SchoolDept { dept: string; head: string; total: number; present: number; absent: number; onLeave: number; pct: number; minReq: number; borderColor: string; bgColor: string; subjects: string[] }

/* ──────────────────── Component ──────────────────── */
export default function DrillDownPanel({ type, theme, onClose }: { type: 'students' | 'academic' | 'non-academic'; theme: Theme; onClose: () => void }) {
  // Remark 5: academic staff uses "Subject-wise", non-academic keeps "Department-wise"
  const firstStaffTab = type === 'academic' ? 'Subject-wise' : 'Department-wise';
  const [tab, setTab] = useState(type === 'students' ? 'Class-wise' : firstStaffTab);

  // Remark 4+8: collapsible class groups state
  const [expandedClassGroups, setExpandedClassGroups] = useState<Record<string, boolean>>({});
  // Remark 9+7: collapsible subject groups state (academic staff)
  const [expandedSubjectGroups, setExpandedSubjectGroups] = useState<Record<string, boolean>>({});
  // Department-wise (organizational) expanded state
  const [expandedDepts, setExpandedDepts] = useState<Record<string, boolean>>({});

  const titles: Record<string, string> = { students: 'Student Attendance Analytics', academic: 'Academic Staff Analytics', 'non-academic': 'Non-Academic Staff Analytics' };

  /* ── Student drill-down data ── */
  const classWiseData: ClassRow[] = [
    { cls: 'Class I-A', strength: 42, present: 40, absent: 2, pct: 95.2 },
    { cls: 'Class I-B', strength: 40, present: 38, absent: 2, pct: 95.0 },
    { cls: 'Class II-A', strength: 45, present: 41, absent: 4, pct: 91.1 },
    { cls: 'Class III-A', strength: 48, present: 44, absent: 4, pct: 91.7 },
    { cls: 'Class IV-A', strength: 50, present: 42, absent: 8, pct: 84.0 },
    { cls: 'Class V-A', strength: 47, present: 43, absent: 4, pct: 91.5 },
    { cls: 'Class VI-A', strength: 52, present: 46, absent: 6, pct: 88.5 },
    { cls: 'Class VII-A', strength: 55, present: 48, absent: 7, pct: 87.3 },
    { cls: 'Class VIII-A', strength: 53, present: 45, absent: 8, pct: 84.9 },
    { cls: 'Class IX-A', strength: 50, present: 44, absent: 6, pct: 88.0 },
    { cls: 'Class X-A', strength: 48, present: 42, absent: 6, pct: 87.5 },
  ];

  // Remark 4+8: hierarchical class groups
  const classGroups: ClassGroup[] = [
    {
      label: 'Primary School (Classes I-V)',
      borderColor: 'border-l-blue-500',
      bgColor: 'bg-blue-500/10',
      classes: classWiseData.filter(r => /Class (I|II|III|IV|V)-/.test(r.cls) && !/Class (VI|VII|VIII|IX|X)-/.test(r.cls)),
    },
    {
      label: 'Middle School (Classes VI-VIII)',
      borderColor: 'border-l-amber-500',
      bgColor: 'bg-amber-500/10',
      classes: classWiseData.filter(r => /Class (VI|VII|VIII)-/.test(r.cls)),
    },
    {
      label: 'High School (Classes IX-X)',
      borderColor: 'border-l-purple-500',
      bgColor: 'bg-purple-500/10',
      classes: classWiseData.filter(r => /Class (IX|X)-/.test(r.cls)),
    },
  ];

  const houseWiseData = [
    { house: 'Red House', strength: 312, present: 278, absent: 34, pct: 89.1, color: 'bg-red-500' },
    { house: 'Blue House', strength: 305, present: 271, absent: 34, pct: 88.9, color: 'bg-blue-500' },
    { house: 'Green House', strength: 318, present: 290, absent: 28, pct: 91.2, color: 'bg-emerald-500' },
    { house: 'Yellow House', strength: 312, present: 259, absent: 53, pct: 83.0, color: 'bg-amber-500' },
  ];
  const absentStudents = [
    { name: 'Aarav Patel', cls: 'V-A', reason: 'Sick Leave', days: 3, parent: '9876543210' },
    { name: 'Diya Shah', cls: 'VII-A', reason: 'Family Function', days: 1, parent: '9876543211' },
    { name: 'Vivaan Mehta', cls: 'IX-A', reason: 'No Intimation', days: 1, parent: '9876543212' },
    { name: 'Saanvi Gupta', cls: 'IV-A', reason: 'Medical', days: 5, parent: '9876543213' },
    { name: 'Reyansh Iyer', cls: 'X-A', reason: 'No Intimation', days: 2, parent: '9876543214' },
  ];

  /* ── Staff drill-down data (Remark 6: minReq added) ── */
  const academicSubjects: DeptRow[] = [
    { dept: 'Mathematics', total: 12, present: 11, absent: 1, onLeave: 0, pct: 91.7, minReq: 10 },
    { dept: 'Science', total: 10, present: 10, absent: 0, onLeave: 0, pct: 100, minReq: 8 },
    { dept: 'English', total: 10, present: 9, absent: 1, onLeave: 1, pct: 90.0, minReq: 8 },
    { dept: 'Social Studies', total: 8, present: 7, absent: 1, onLeave: 0, pct: 87.5, minReq: 6 },
    { dept: 'Hindi', total: 8, present: 8, absent: 0, onLeave: 0, pct: 100, minReq: 6 },
    { dept: 'Computer', total: 5, present: 4, absent: 1, onLeave: 1, pct: 80.0, minReq: 4 },
    { dept: 'Physical Ed.', total: 4, present: 4, absent: 0, onLeave: 0, pct: 100, minReq: 3 },
    { dept: 'Art & Music', total: 6, present: 5, absent: 1, onLeave: 0, pct: 83.3, minReq: 5 },
    { dept: 'Library', total: 3, present: 3, absent: 0, onLeave: 0, pct: 100, minReq: 2 },
  ];

  const nonAcademicDepts: DeptRow[] = [
    { dept: 'Administration', total: 12, present: 10, absent: 2, onLeave: 1, pct: 83.3, minReq: 10 },
    { dept: 'Accounts', total: 6, present: 6, absent: 0, onLeave: 0, pct: 100, minReq: 5 },
    { dept: 'IT Support', total: 4, present: 4, absent: 0, onLeave: 0, pct: 100, minReq: 3 },
    { dept: 'Transport', total: 15, present: 13, absent: 2, onLeave: 0, pct: 86.7, minReq: 13 },
    { dept: 'Housekeeping', total: 10, present: 8, absent: 2, onLeave: 1, pct: 80.0, minReq: 8 },
    { dept: 'Security', total: 8, present: 7, absent: 1, onLeave: 0, pct: 87.5, minReq: 7 },
    { dept: 'Lab Assistants', total: 5, present: 5, absent: 0, onLeave: 0, pct: 100, minReq: 4 },
    { dept: 'Canteen', total: 4, present: 3, absent: 1, onLeave: 0, pct: 75.0, minReq: 3 },
  ];

  const deptWiseData = type === 'academic' ? academicSubjects : nonAcademicDepts;

  // Remark 9+7: Academic staff grouped by school level with coordinators
  const subjectGroups: SubjectGroup[] = [
    {
      label: 'Primary Level',
      coordinator: 'Ms. Sunita Rao',
      borderColor: 'border-l-blue-500',
      bgColor: 'bg-blue-500/10',
      subjects: academicSubjects.filter(s => ['English', 'Hindi', 'Mathematics', 'Art & Music', 'Physical Ed.', 'Library'].includes(s.dept)),
    },
    {
      label: 'Middle School Level',
      coordinator: 'Mr. Anil Sharma',
      borderColor: 'border-l-amber-500',
      bgColor: 'bg-amber-500/10',
      subjects: academicSubjects.filter(s => ['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi', 'Computer'].includes(s.dept)),
    },
    {
      label: 'Senior School Level',
      coordinator: 'Dr. Meena Iyer',
      borderColor: 'border-l-purple-500',
      bgColor: 'bg-purple-500/10',
      subjects: academicSubjects.filter(s => ['Mathematics', 'Science', 'English', 'Social Studies', 'Computer', 'Physical Ed.'].includes(s.dept)),
    },
  ];

  // Organizational departments (Primary, Secondary, Pre-Primary, Arts, Commerce, Science streams)
  const schoolDepartments: SchoolDept[] = [
    { dept: 'Pre-Primary', head: 'Ms. Rekha Jain', total: 8, present: 8, absent: 0, onLeave: 0, pct: 100, minReq: 7, borderColor: 'border-l-pink-500', bgColor: 'bg-pink-500/10', subjects: ['Play Group', 'Nursery', 'LKG', 'UKG'] },
    { dept: 'Primary', head: 'Ms. Sunita Rao', total: 18, present: 16, absent: 2, onLeave: 1, pct: 88.9, minReq: 15, borderColor: 'border-l-blue-500', bgColor: 'bg-blue-500/10', subjects: ['English', 'Hindi', 'Mathematics', 'EVS', 'Art & Music', 'Physical Ed.'] },
    { dept: 'Secondary', head: 'Mr. Anil Sharma', total: 20, present: 18, absent: 2, onLeave: 0, pct: 90.0, minReq: 17, borderColor: 'border-l-amber-500', bgColor: 'bg-amber-500/10', subjects: ['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi', 'Computer'] },
    { dept: 'Senior Secondary — Science', head: 'Dr. Meena Iyer', total: 10, present: 9, absent: 1, onLeave: 1, pct: 90.0, minReq: 8, borderColor: 'border-l-purple-500', bgColor: 'bg-purple-500/10', subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Computer Science'] },
    { dept: 'Senior Secondary — Commerce', head: 'Mr. Rajesh Kapoor', total: 6, present: 6, absent: 0, onLeave: 0, pct: 100, minReq: 5, borderColor: 'border-l-emerald-500', bgColor: 'bg-emerald-500/10', subjects: ['Accountancy', 'Business Studies', 'Economics', 'Mathematics'] },
    { dept: 'Senior Secondary — Arts', head: 'Ms. Nandini Desai', total: 4, present: 4, absent: 0, onLeave: 0, pct: 100, minReq: 3, borderColor: 'border-l-teal-500', bgColor: 'bg-teal-500/10', subjects: ['History', 'Political Science', 'Geography', 'Psychology'] },
  ];

  const absentStaff = type === 'academic' ? [
    { name: 'Ms. Priya Sharma', dept: 'Mathematics', reason: 'Casual Leave', since: 'Today' },
    { name: 'Mr. Arun Verma', dept: 'English', reason: 'Medical Leave', since: '3 days' },
    { name: 'Ms. Kavitha Nair', dept: 'Computer', reason: 'No Intimation', since: 'Today' },
    { name: 'Mr. Deepak Singh', dept: 'Social Studies', reason: 'Half Day', since: 'Today' },
    { name: 'Ms. Neha Joshi', dept: 'Art & Music', reason: 'Personal Leave', since: 'Today' },
  ] : [
    { name: 'Ramesh Kumar', dept: 'Administration', reason: 'Sick Leave', since: '2 days' },
    { name: 'Suresh Yadav', dept: 'Transport', reason: 'No Intimation', since: 'Today' },
    { name: 'Pradeep Singh', dept: 'Housekeeping', reason: 'Casual Leave', since: 'Today' },
    { name: 'Gopal Das', dept: 'Security', reason: 'Medical', since: 'Today' },
  ];

  const studentTabs = ['Class-wise', 'House-wise', 'Absent Today'];
  // Remark 5: academic uses Subject-wise + Department-wise, non-academic keeps Department-wise
  const staffTabs = type === 'academic'
    ? ['Subject-wise', 'Department-wise', 'Absent Today', 'Leave Summary']
    : ['Department-wise', 'Absent Today', 'Leave Summary'];

  /* ── Helpers ── */
  const toggleClassGroup = (label: string) => setExpandedClassGroups(prev => ({ ...prev, [label]: !prev[label] }));
  const toggleSubjectGroup = (label: string) => setExpandedSubjectGroups(prev => ({ ...prev, [label]: !prev[label] }));
  const toggleDept = (label: string) => setExpandedDepts(prev => ({ ...prev, [label]: !prev[label] }));

  const groupSummary = (rows: { strength?: number; present?: number; absent?: number; pct?: number; total?: number }[]) => {
    const strength = rows.reduce((s, r) => s + (r.strength ?? r.total ?? 0), 0);
    const present = rows.reduce((s, r) => s + (r.present ?? 0), 0);
    const absent = rows.reduce((s, r) => s + (r.absent ?? 0), 0);
    const avgPct = rows.length > 0 ? Math.round((rows.reduce((s, r) => s + (r.pct ?? 0), 0) / rows.length) * 10) / 10 : 0;
    return { strength, present, absent, avgPct };
  };

  const pctBadge = (pct: number, highThresh = 90, midThresh = 85) => (
    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${pct >= highThresh ? 'bg-emerald-500/20 text-emerald-400' : pct >= midThresh ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'}`}>{pct}%</span>
  );

  // Remark 6: render present value with warning if below minReq
  const presentCell = (present: number, minReq: number) => {
    const isBelowMin = present < minReq;
    return (
      <td className="p-2.5 text-center">
        <span className={`font-bold ${isBelowMin ? 'text-red-500' : 'text-emerald-500'}`}>
          {present}
        </span>
        {isBelowMin && (
          <AlertTriangle size={10} className="inline ml-1 text-red-400" />
        )}
      </td>
    );
  };

  return (
    <div className={`${theme.cardBg} rounded-2xl border-2 border-blue-500/30 p-4 animate-in`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className={`text-sm font-bold ${theme.highlight} flex items-center gap-2`}>
          <BarChart3 size={16} className="text-blue-400" />
          {titles[type]}
        </h3>
        <button onClick={onClose} className={`p-1.5 rounded-lg ${theme.secondaryBg} ${theme.iconColor} hover:opacity-80`}>
          <X size={14} />
        </button>
      </div>

      <TabBar
        tabs={type === 'students' ? studentTabs : staffTabs}
        active={tab}
        onChange={setTab}
        theme={theme}
      />

      <div className="mt-3">
        {/* ──── Student: Class-wise (Remark 4+8: collapsible groups) ──── */}
        {type === 'students' && tab === 'Class-wise' && (
          <div className={`border ${theme.border} rounded-xl overflow-hidden`}>
            <table className="w-full text-xs">
              <thead><tr className={theme.secondaryBg}>
                <th className={`text-left p-2.5 ${theme.iconColor} font-bold`}>Class</th>
                <th className={`text-center p-2.5 ${theme.iconColor} font-bold`}>Strength</th>
                <th className={`text-center p-2.5 ${theme.iconColor} font-bold`}>Present</th>
                <th className={`text-center p-2.5 ${theme.iconColor} font-bold`}>Absent</th>
                <th className={`text-center p-2.5 ${theme.iconColor} font-bold`}>%</th>
              </tr></thead>
              <tbody>
                {classGroups.map((group) => {
                  const summary = groupSummary(group.classes);
                  const isExpanded = !!expandedClassGroups[group.label];
                  return (
                    <>{/* Fragment for group */}
                      {/* Group header row */}
                      <tr
                        key={group.label}
                        className={`border-t ${theme.border} cursor-pointer border-l-4 ${group.borderColor} ${group.bgColor}`}
                        onClick={() => toggleClassGroup(group.label)}
                      >
                        <td className={`p-2.5 font-bold ${theme.highlight} flex items-center gap-1.5`}>
                          {isExpanded ? <ChevronUp size={14} className={theme.iconColor} /> : <ChevronDown size={14} className={theme.iconColor} />}
                          {group.label}
                        </td>
                        <td className={`p-2.5 text-center font-bold ${theme.iconColor}`}>{summary.strength}</td>
                        <td className="p-2.5 text-center text-emerald-500 font-bold">{summary.present}</td>
                        <td className="p-2.5 text-center text-red-500 font-bold">{summary.absent}</td>
                        <td className="p-2.5 text-center">{pctBadge(summary.avgPct)}</td>
                      </tr>
                      {/* Expanded class rows */}
                      {isExpanded && group.classes.map((r, i) => (
                        <tr key={`${group.label}-${i}`} className={`border-t ${theme.border} border-l-4 ${group.borderColor}`}>
                          <td className={`p-2.5 pl-9 ${theme.highlight}`}>{r.cls}</td>
                          <td className={`p-2.5 text-center ${theme.iconColor}`}>{r.strength}</td>
                          <td className="p-2.5 text-center text-emerald-500 font-bold">{r.present}</td>
                          <td className="p-2.5 text-center text-red-500 font-bold">{r.absent}</td>
                          <td className="p-2.5 text-center">{pctBadge(r.pct)}</td>
                        </tr>
                      ))}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* ──── Student: House-wise ──── */}
        {type === 'students' && tab === 'House-wise' && (
          <div className="grid grid-cols-2 gap-3">
            {houseWiseData.map((h, i) => (
              <div key={i} className={`p-3 rounded-xl border ${theme.border} flex items-center gap-3`}>
                <div className={`w-10 h-10 rounded-full ${h.color} flex items-center justify-center text-white text-xs font-bold`}>
                  {h.pct}%
                </div>
                <div className="flex-1">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{h.house}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{h.present}/{h.strength} present · {h.absent} absent</p>
                  <div className="h-1.5 rounded-full bg-slate-200 mt-1 overflow-hidden">
                    <div className={`h-full rounded-full ${h.color}`} style={{ width: `${h.pct}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ──── Student: Absent Today ──── */}
        {type === 'students' && tab === 'Absent Today' && (
          <div className="space-y-2">
            <p className={`text-[10px] ${theme.iconColor} mb-2`}>249 students absent today. Showing flagged cases:</p>
            {absentStudents.map((s, i) => (
              <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${theme.accentBg} border ${theme.border}`}>
                <div className={`w-8 h-8 rounded-full ${s.reason === 'No Intimation' ? 'bg-red-500' : 'bg-amber-500'} text-white flex items-center justify-center text-[10px] font-bold`}>
                  {s.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{s.name} <span className={`font-normal ${theme.iconColor}`}>({s.cls})</span></p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{s.reason} · {s.days} day(s)</p>
                </div>
                {s.reason === 'No Intimation' && <span className="text-[9px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-bold">Alert</span>}
              </div>
            ))}
          </div>
        )}

        {/* ──── Academic Staff: Subject-wise (Remark 9+7: grouped by school level with coordinators) ──── */}
        {type === 'academic' && tab === 'Subject-wise' && (
          <div className={`border ${theme.border} rounded-xl overflow-hidden`}>
            <table className="w-full text-xs">
              <thead><tr className={theme.secondaryBg}>
                <th className={`text-left p-2.5 ${theme.iconColor} font-bold`}>Subject</th>
                <th className={`text-center p-2.5 ${theme.iconColor} font-bold`}>Total</th>
                <th className={`text-center p-2.5 ${theme.iconColor} font-bold`}>Min Req</th>
                <th className={`text-center p-2.5 ${theme.iconColor} font-bold`}>Present</th>
                <th className={`text-center p-2.5 ${theme.iconColor} font-bold`}>Absent</th>
                <th className={`text-center p-2.5 ${theme.iconColor} font-bold`}>On Leave</th>
                <th className={`text-center p-2.5 ${theme.iconColor} font-bold`}>%</th>
              </tr></thead>
              <tbody>
                {subjectGroups.map((group) => {
                  const totals = {
                    total: group.subjects.reduce((s, r) => s + r.total, 0),
                    present: group.subjects.reduce((s, r) => s + r.present, 0),
                    absent: group.subjects.reduce((s, r) => s + r.absent, 0),
                    onLeave: group.subjects.reduce((s, r) => s + r.onLeave, 0),
                    minReq: group.subjects.reduce((s, r) => s + r.minReq, 0),
                    avgPct: group.subjects.length > 0 ? Math.round((group.subjects.reduce((s, r) => s + r.pct, 0) / group.subjects.length) * 10) / 10 : 0,
                  };
                  const isExpanded = !!expandedSubjectGroups[group.label];
                  return (
                    <>{/* Fragment for subject group */}
                      <tr
                        key={group.label}
                        className={`border-t ${theme.border} cursor-pointer border-l-4 ${group.borderColor} ${group.bgColor}`}
                        onClick={() => toggleSubjectGroup(group.label)}
                      >
                        <td className={`p-2.5 font-bold ${theme.highlight}`}>
                          <span className="flex items-center gap-1.5">
                            {isExpanded ? <ChevronUp size={14} className={theme.iconColor} /> : <ChevronDown size={14} className={theme.iconColor} />}
                            <span>
                              {group.label}
                              <span className={`font-normal text-[10px] ${theme.iconColor} ml-1.5`}>(Coordinator: {group.coordinator})</span>
                            </span>
                          </span>
                        </td>
                        <td className={`p-2.5 text-center font-bold ${theme.iconColor}`}>{totals.total}</td>
                        <td className={`p-2.5 text-center ${theme.iconColor}`}>{totals.minReq}</td>
                        <td className="p-2.5 text-center text-emerald-500 font-bold">{totals.present}</td>
                        <td className="p-2.5 text-center text-red-500 font-bold">{totals.absent}</td>
                        <td className={`p-2.5 text-center ${theme.iconColor}`}>{totals.onLeave}</td>
                        <td className="p-2.5 text-center">{pctBadge(totals.avgPct, 90, 80)}</td>
                      </tr>
                      {isExpanded && group.subjects.map((r, i) => (
                        <tr key={`${group.label}-${i}`} className={`border-t ${theme.border} border-l-4 ${group.borderColor}`}>
                          <td className={`p-2.5 pl-9 ${theme.highlight}`}>{r.dept}</td>
                          <td className={`p-2.5 text-center ${theme.iconColor}`}>{r.total}</td>
                          <td className={`p-2.5 text-center ${theme.iconColor}`}>{r.minReq}</td>
                          {presentCell(r.present, r.minReq)}
                          <td className="p-2.5 text-center text-red-500 font-bold">{r.absent}</td>
                          <td className={`p-2.5 text-center ${theme.iconColor}`}>{r.onLeave}</td>
                          <td className="p-2.5 text-center">{pctBadge(r.pct, 90, 80)}</td>
                        </tr>
                      ))}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* ──── Academic Staff: Department-wise (organizational departments — Pre-Primary, Primary, Secondary, Arts, Commerce, Science) ──── */}
        {type === 'academic' && tab === 'Department-wise' && (
          <div className={`border ${theme.border} rounded-xl overflow-hidden`}>
            <table className="w-full text-xs">
              <thead><tr className={theme.secondaryBg}>
                <th className={`text-left p-2.5 ${theme.iconColor} font-bold`}>Department</th>
                <th className={`text-center p-2.5 ${theme.iconColor} font-bold`}>Total</th>
                <th className={`text-center p-2.5 ${theme.iconColor} font-bold`}>Min Req</th>
                <th className={`text-center p-2.5 ${theme.iconColor} font-bold`}>Present</th>
                <th className={`text-center p-2.5 ${theme.iconColor} font-bold`}>Absent</th>
                <th className={`text-center p-2.5 ${theme.iconColor} font-bold`}>On Leave</th>
                <th className={`text-center p-2.5 ${theme.iconColor} font-bold`}>%</th>
              </tr></thead>
              <tbody>
                {schoolDepartments.map((d) => {
                  const isExpanded = !!expandedDepts[d.dept];
                  return (
                    <>{/* Fragment for department */}
                      <tr
                        key={d.dept}
                        className={`border-t ${theme.border} cursor-pointer border-l-4 ${d.borderColor} ${d.bgColor}`}
                        onClick={() => toggleDept(d.dept)}
                      >
                        <td className={`p-2.5 font-bold ${theme.highlight}`}>
                          <span className="flex items-center gap-1.5">
                            {isExpanded ? <ChevronUp size={14} className={theme.iconColor} /> : <ChevronDown size={14} className={theme.iconColor} />}
                            <span>
                              {d.dept}
                              <span className={`font-normal text-[10px] ${theme.iconColor} ml-1.5`}>(HOD: {d.head})</span>
                            </span>
                          </span>
                        </td>
                        <td className={`p-2.5 text-center font-bold ${theme.iconColor}`}>{d.total}</td>
                        <td className={`p-2.5 text-center ${theme.iconColor}`}>{d.minReq}</td>
                        {presentCell(d.present, d.minReq)}
                        <td className="p-2.5 text-center text-red-500 font-bold">{d.absent}</td>
                        <td className={`p-2.5 text-center ${theme.iconColor}`}>{d.onLeave}</td>
                        <td className="p-2.5 text-center">{pctBadge(d.pct, 90, 80)}</td>
                      </tr>
                      {isExpanded && (
                        <tr key={`${d.dept}-detail`} className={`border-t ${theme.border} border-l-4 ${d.borderColor}`}>
                          <td colSpan={7} className="p-2.5 pl-9">
                            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Subjects covered:</p>
                            <div className="flex flex-wrap gap-1.5">
                              {d.subjects.map(s => (
                                <span key={s} className={`text-[10px] px-2 py-0.5 rounded-full ${theme.secondaryBg} ${theme.highlight} font-medium`}>{s}</span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
                {/* Summary row */}
                <tr className={`border-t-2 ${theme.border} ${theme.secondaryBg}`}>
                  <td className={`p-2.5 font-bold ${theme.highlight}`}>Total</td>
                  <td className={`p-2.5 text-center font-bold ${theme.highlight}`}>{schoolDepartments.reduce((s, d) => s + d.total, 0)}</td>
                  <td className={`p-2.5 text-center font-bold ${theme.iconColor}`}>{schoolDepartments.reduce((s, d) => s + d.minReq, 0)}</td>
                  <td className="p-2.5 text-center text-emerald-500 font-bold">{schoolDepartments.reduce((s, d) => s + d.present, 0)}</td>
                  <td className="p-2.5 text-center text-red-500 font-bold">{schoolDepartments.reduce((s, d) => s + d.absent, 0)}</td>
                  <td className={`p-2.5 text-center ${theme.iconColor}`}>{schoolDepartments.reduce((s, d) => s + d.onLeave, 0)}</td>
                  <td className="p-2.5 text-center">{pctBadge(Math.round(schoolDepartments.reduce((s, d) => s + d.pct, 0) / schoolDepartments.length * 10) / 10, 90, 80)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* ──── Non-Academic Staff: Department-wise (flat table + minReq, Remark 6) ──── */}
        {type === 'non-academic' && tab === 'Department-wise' && (
          <div className={`border ${theme.border} rounded-xl overflow-hidden`}>
            <table className="w-full text-xs">
              <thead><tr className={theme.secondaryBg}>
                <th className={`text-left p-2.5 ${theme.iconColor} font-bold`}>Department</th>
                <th className={`text-center p-2.5 ${theme.iconColor} font-bold`}>Total</th>
                <th className={`text-center p-2.5 ${theme.iconColor} font-bold`}>Min Req</th>
                <th className={`text-center p-2.5 ${theme.iconColor} font-bold`}>Present</th>
                <th className={`text-center p-2.5 ${theme.iconColor} font-bold`}>Absent</th>
                <th className={`text-center p-2.5 ${theme.iconColor} font-bold`}>On Leave</th>
                <th className={`text-center p-2.5 ${theme.iconColor} font-bold`}>%</th>
              </tr></thead>
              <tbody>{nonAcademicDepts.map((r, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className={`p-2.5 font-bold ${theme.highlight}`}>{r.dept}</td>
                  <td className={`p-2.5 text-center ${theme.iconColor}`}>{r.total}</td>
                  <td className={`p-2.5 text-center ${theme.iconColor}`}>{r.minReq}</td>
                  {presentCell(r.present, r.minReq)}
                  <td className="p-2.5 text-center text-red-500 font-bold">{r.absent}</td>
                  <td className={`p-2.5 text-center ${theme.iconColor}`}>{r.onLeave}</td>
                  <td className="p-2.5 text-center">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${r.pct >= 90 ? 'bg-emerald-500/20 text-emerald-400' : r.pct >= 80 ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'}`}>{r.pct}%</span>
                  </td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}

        {/* ──── Staff: Absent Today ──── */}
        {(type === 'academic' || type === 'non-academic') && tab === 'Absent Today' && (
          <div className="space-y-2">
            <p className={`text-[10px] ${theme.iconColor} mb-2`}>{absentStaff.length} staff members absent today:</p>
            {absentStaff.map((s, i) => (
              <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${theme.accentBg} border ${theme.border}`}>
                <div className={`w-8 h-8 rounded-full ${s.reason === 'No Intimation' ? 'bg-red-500' : 'bg-amber-500'} text-white flex items-center justify-center text-[10px] font-bold`}>
                  {s.name.split(' ').filter(n => n[0] === n[0].toUpperCase()).map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{s.name}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{s.dept} · {s.reason} · Since: {s.since}</p>
                </div>
                {s.reason === 'No Intimation' && <span className="text-[9px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-bold">No Intimation</span>}
                {s.reason.includes('Leave') && <span className={`text-[9px] px-2 py-0.5 rounded-full ${theme.secondaryBg} ${theme.iconColor}`}>Approved</span>}
              </div>
            ))}
          </div>
        )}

        {/* ──── Staff: Leave Summary ──── */}
        {(type === 'academic' || type === 'non-academic') && tab === 'Leave Summary' && (
          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: 'Casual Leave', used: 12, total: 78, color: 'bg-blue-500' },
                { label: 'Sick Leave', used: 8, total: 78, color: 'bg-amber-500' },
                { label: 'Medical', used: 3, total: 78, color: 'bg-red-500' },
                { label: 'Half Day', used: 5, total: 78, color: 'bg-purple-500' },
              ].map((l, i) => (
                <div key={i} className={`p-3 rounded-xl border ${theme.border} text-center`}>
                  <p className={`text-lg font-bold ${theme.highlight}`}>{l.used}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{l.label}</p>
                  <div className="h-1 rounded-full bg-slate-200 mt-2 overflow-hidden">
                    <div className={`h-full rounded-full ${l.color}`} style={{ width: `${(l.used/l.total)*100}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <p className={`text-[10px] ${theme.iconColor}`}>This month&apos;s leave utilization across {type === 'academic' ? 'teaching' : 'non-teaching'} staff</p>
          </div>
        )}
      </div>
    </div>
  );
}
