'use client';

import { useState } from 'react';
import { TabBar } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import { BarChart3, X } from 'lucide-react';

export default function DrillDownPanel({ type, theme, onClose }: { type: 'students' | 'academic' | 'non-academic'; theme: Theme; onClose: () => void }) {
  const [tab, setTab] = useState(type === 'students' ? 'Class-wise' : 'Department-wise');

  const titles: Record<string, string> = { students: 'Student Attendance Analytics', academic: 'Academic Staff Analytics', 'non-academic': 'Non-Academic Staff Analytics' };

  // Student drill-down data
  const classWiseData = [
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

  // Staff drill-down data
  const deptWiseData = type === 'academic' ? [
    { dept: 'Mathematics', total: 12, present: 11, absent: 1, onLeave: 0, pct: 91.7 },
    { dept: 'Science', total: 10, present: 10, absent: 0, onLeave: 0, pct: 100 },
    { dept: 'English', total: 10, present: 9, absent: 1, onLeave: 1, pct: 90.0 },
    { dept: 'Social Studies', total: 8, present: 7, absent: 1, onLeave: 0, pct: 87.5 },
    { dept: 'Hindi', total: 8, present: 8, absent: 0, onLeave: 0, pct: 100 },
    { dept: 'Computer', total: 5, present: 4, absent: 1, onLeave: 1, pct: 80.0 },
    { dept: 'Physical Ed.', total: 4, present: 4, absent: 0, onLeave: 0, pct: 100 },
    { dept: 'Art & Music', total: 6, present: 5, absent: 1, onLeave: 0, pct: 83.3 },
    { dept: 'Library', total: 3, present: 3, absent: 0, onLeave: 0, pct: 100 },
  ] : [
    { dept: 'Administration', total: 12, present: 10, absent: 2, onLeave: 1, pct: 83.3 },
    { dept: 'Accounts', total: 6, present: 6, absent: 0, onLeave: 0, pct: 100 },
    { dept: 'IT Support', total: 4, present: 4, absent: 0, onLeave: 0, pct: 100 },
    { dept: 'Transport', total: 15, present: 13, absent: 2, onLeave: 0, pct: 86.7 },
    { dept: 'Housekeeping', total: 10, present: 8, absent: 2, onLeave: 1, pct: 80.0 },
    { dept: 'Security', total: 8, present: 7, absent: 1, onLeave: 0, pct: 87.5 },
    { dept: 'Lab Assistants', total: 5, present: 5, absent: 0, onLeave: 0, pct: 100 },
    { dept: 'Canteen', total: 4, present: 3, absent: 1, onLeave: 0, pct: 75.0 },
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
  const staffTabs = ['Department-wise', 'Absent Today', 'Leave Summary'];

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
        {/* Student: Class-wise */}
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
              <tbody>{classWiseData.map((r, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className={`p-2.5 font-bold ${theme.highlight}`}>{r.cls}</td>
                  <td className={`p-2.5 text-center ${theme.iconColor}`}>{r.strength}</td>
                  <td className="p-2.5 text-center text-emerald-500 font-bold">{r.present}</td>
                  <td className="p-2.5 text-center text-red-500 font-bold">{r.absent}</td>
                  <td className="p-2.5 text-center">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${r.pct >= 90 ? 'bg-emerald-500/20 text-emerald-400' : r.pct >= 85 ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'}`}>{r.pct}%</span>
                  </td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}

        {/* Student: House-wise */}
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

        {/* Student: Absent Today */}
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

        {/* Staff: Department-wise */}
        {(type === 'academic' || type === 'non-academic') && tab === 'Department-wise' && (
          <div className={`border ${theme.border} rounded-xl overflow-hidden`}>
            <table className="w-full text-xs">
              <thead><tr className={theme.secondaryBg}>
                <th className={`text-left p-2.5 ${theme.iconColor} font-bold`}>Department</th>
                <th className={`text-center p-2.5 ${theme.iconColor} font-bold`}>Total</th>
                <th className={`text-center p-2.5 ${theme.iconColor} font-bold`}>Present</th>
                <th className={`text-center p-2.5 ${theme.iconColor} font-bold`}>Absent</th>
                <th className={`text-center p-2.5 ${theme.iconColor} font-bold`}>On Leave</th>
                <th className={`text-center p-2.5 ${theme.iconColor} font-bold`}>%</th>
              </tr></thead>
              <tbody>{deptWiseData.map((r, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className={`p-2.5 font-bold ${theme.highlight}`}>{r.dept}</td>
                  <td className={`p-2.5 text-center ${theme.iconColor}`}>{r.total}</td>
                  <td className="p-2.5 text-center text-emerald-500 font-bold">{r.present}</td>
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

        {/* Staff: Absent Today */}
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

        {/* Staff: Leave Summary */}
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
