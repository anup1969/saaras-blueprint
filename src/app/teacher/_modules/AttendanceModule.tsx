'use client';

import React, { useState } from 'react';
import { StatCard, TabBar, DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  Users, CheckCircle, XCircle, Clock, Download, Send,
  ChevronLeft, ChevronRight, TrendingUp, AlertTriangle
} from 'lucide-react';

// ─── MOCK DATA ──────────────────────────────────────

const teacherProfile = {
  classes: ['10-A', '10-B', '9-A', '9-B', '8-A', '6-A'],
};

const studentsOf10A = [
  { roll: 1, name: 'Aarav Mehta', present: true },
  { roll: 2, name: 'Ananya Iyer', present: true },
  { roll: 3, name: 'Arjun Nair', present: true },
  { roll: 4, name: 'Diya Kulkarni', present: false },
  { roll: 5, name: 'Harsh Patel', present: true },
  { roll: 6, name: 'Isha Reddy', present: true },
  { roll: 7, name: 'Karan Singh', present: true },
  { roll: 8, name: 'Meera Joshi', present: true },
  { roll: 9, name: 'Nikhil Verma', present: false },
  { roll: 10, name: 'Pooja Sharma', present: true },
  { roll: 11, name: 'Rahul Gupta', present: true },
  { roll: 12, name: 'Riya Desai', present: true },
  { roll: 13, name: 'Rohan Thakur', present: true },
  { roll: 14, name: 'Saanvi Pillai', present: false },
  { roll: 15, name: 'Siddharth Rao', present: true },
  { roll: 16, name: 'Sneha Bhatia', present: true },
  { roll: 17, name: 'Tanvi Chopra', present: true },
  { roll: 18, name: 'Varun Kapoor', present: true },
  { roll: 19, name: 'Yashika Agarwal', present: true },
  { roll: 20, name: 'Zoya Khan', present: true },
];

export default function AttendanceModule({ theme }: { theme: Theme }) {
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [attendanceDate, setAttendanceDate] = useState('2026-02-12');
  const [attendanceData, setAttendanceData] = useState(
    studentsOf10A.map(s => ({ ...s, status: (s.present ? 'P' : 'A') as 'P' | 'A' | 'L' }))
  );
  const [tab, setTab] = useState('Mark Attendance');

  const presentCount = attendanceData.filter(s => s.status === 'P').length;
  const absentCount = attendanceData.filter(s => s.status === 'A').length;
  const lateCount = attendanceData.filter(s => s.status === 'L').length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Attendance</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Download size={14} /> Export Report</button>
      </div>
      <TabBar tabs={['Mark Attendance', 'Calendar View', 'Reports']} active={tab} onChange={setTab} theme={theme} />
      <p className="text-[10px] text-amber-600 mb-2">📋 Attendance method: Mobile App (Teacher) · Frequency: Daily — configured by SSA</p>

      {tab === 'Mark Attendance' && (
        <>
          <div className="flex gap-3 flex-wrap">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg}`}>
              <span className={`text-xs font-bold ${theme.iconColor}`}>Class:</span>
              <select
                value={selectedClass}
                onChange={e => setSelectedClass(e.target.value)}
                className={`text-xs font-bold ${theme.highlight} bg-transparent outline-none`}
              >
                {teacherProfile.classes.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg}`}>
              <span className={`text-xs font-bold ${theme.iconColor}`}>Date:</span>
              <input
                type="date"
                value={attendanceDate}
                onChange={e => setAttendanceDate(e.target.value)}
                className={`text-xs font-bold ${theme.highlight} bg-transparent outline-none`}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={Users} label="Total Students" value={attendanceData.length} color="bg-blue-500" theme={theme} />
            <StatCard icon={CheckCircle} label="Present" value={presentCount} color="bg-emerald-500" theme={theme} />
            <StatCard icon={XCircle} label="Absent" value={absentCount} color="bg-red-500" theme={theme} />
            <StatCard icon={Clock} label="Late" value={lateCount} color="bg-amber-500" theme={theme} />
          </div>

          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden`}>
            <div className={`flex items-center justify-between p-3 ${theme.secondaryBg}`}>
              <p className={`text-xs font-bold ${theme.highlight}`}>Class {selectedClass} — Mathematics | {attendanceDate}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setAttendanceData(prev => prev.map(s => ({ ...s, status: 'P' as const })))}
                  className="text-[10px] font-bold px-2 py-1 rounded-lg bg-emerald-100 text-emerald-700"
                >
                  Mark All Present
                </button>
                <button
                  onClick={() => setAttendanceData(prev => prev.map(s => ({ ...s, status: 'A' as const })))}
                  className="text-[10px] font-bold px-2 py-1 rounded-lg bg-red-100 text-red-700"
                >
                  Mark All Absent
                </button>
              </div>
            </div>
            <table className="w-full text-sm">
              <thead className={theme.secondaryBg}>
                <tr>
                  <th className={`text-left px-4 py-2 text-xs font-bold ${theme.iconColor} uppercase`}>Roll</th>
                  <th className={`text-left px-4 py-2 text-xs font-bold ${theme.iconColor} uppercase`}>Student Name</th>
                  <th className={`text-center px-4 py-2 text-xs font-bold ${theme.iconColor} uppercase`}>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((s, i) => (
                  <tr key={s.roll} className={`border-t ${theme.border}`}>
                    <td className={`px-4 py-2 text-xs ${theme.iconColor}`}>{s.roll}</td>
                    <td className={`px-4 py-2 text-xs font-bold ${theme.highlight}`}>{s.name}</td>
                    <td className="px-4 py-2">
                      <div className="flex items-center justify-center gap-1">
                        {(['P', 'L', 'A'] as const).map(status => (
                          <button
                            key={status}
                            onClick={() => {
                              setAttendanceData(prev => prev.map((st, idx) =>
                                idx === i ? { ...st, status } : st
                              ));
                            }}
                            className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                              s.status === status
                                ? status === 'P'
                                  ? 'bg-emerald-500 text-white'
                                  : status === 'L'
                                    ? 'bg-amber-500 text-white'
                                    : 'bg-red-500 text-white'
                                : `${theme.secondaryBg} ${theme.iconColor}`
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={`p-3 flex items-center justify-between border-t ${theme.border}`}>
              <p className={`text-xs ${theme.iconColor}`}>
                Present: {presentCount} | Absent: {absentCount} | Late: {lateCount} | Total: {attendanceData.length}
              </p>
              <button className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}>
                <Send size={14} /> Submit Attendance
              </button>
            </div>
          </div>
        </>
      )}

      {tab === 'Calendar View' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>February 2026 — Class {selectedClass}</h3>
            <div className="flex gap-2">
              <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><ChevronLeft size={14} className={theme.iconColor} /></button>
              <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><ChevronRight size={14} className={theme.iconColor} /></button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} className={`text-center text-[10px] font-bold ${theme.iconColor} py-1 uppercase`}>{d}</div>
            ))}
            {/* Empty cells for Feb 2026 starting on Sunday */}
            {Array.from({ length: 28 }, (_, i) => {
              const day = i + 1;
              const isSunday = (day % 7) === 1;
              const isToday = day === 12;
              const attendance = day <= 11 ? (day % 7 !== 1 ? Math.floor(Math.random() * 4 + 38) : null) : null;
              return (
                <div
                  key={day}
                  className={`p-2 rounded-xl text-center border ${theme.border} ${
                    isToday ? `ring-2 ring-blue-400 ${theme.secondaryBg}` :
                    isSunday ? theme.accentBg : theme.cardBg
                  }`}
                >
                  <p className={`text-xs font-bold ${isToday ? theme.primaryText : theme.highlight}`}>{day}</p>
                  {attendance !== null && !isSunday && (
                    <p className="text-[9px] text-emerald-600 font-bold">{attendance}/42</p>
                  )}
                  {isSunday && <p className={`text-[9px] ${theme.iconColor}`}>Holiday</p>}
                </div>
              );
            })}
          </div>
          <div className="flex gap-4 mt-3">
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500" /><span className={`text-[10px] ${theme.iconColor}`}>Marked</span></div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500" /><span className={`text-[10px] ${theme.iconColor}`}>Pending</span></div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-300" /><span className={`text-[10px] ${theme.iconColor}`}>Holiday</span></div>
          </div>
        </div>
      )}

      {tab === 'Reports' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={TrendingUp} label="Avg Attendance" value="93.2%" color="bg-emerald-500" sub="this month" theme={theme} />
            <StatCard icon={AlertTriangle} label="Chronic Absentees" value="3" color="bg-red-500" sub=">5 days absent" theme={theme} />
            <StatCard icon={CheckCircle} label="100% Attendance" value="12" color="bg-blue-500" sub="students" theme={theme} />
            <StatCard icon={Clock} label="Late Arrivals" value="8" color="bg-amber-500" sub="this week" theme={theme} />
          </div>
          <DataTable
            headers={['Class', 'Total', 'Avg Present', 'Avg Absent', 'Avg %', 'Lowest Day']}
            rows={[
              ['10-A', '42', '39.5', '2.5', '94.0%', 'Mon (37/42)'],
              ['10-B', '40', '37.2', '2.8', '93.0%', 'Fri (35/40)'],
              ['8-A', '38', '36.1', '1.9', '95.0%', 'Sat (34/38)'],
              ['8-B', '36', '33.5', '2.5', '93.1%', 'Wed (31/36)'],
              ['6-A', '35', '33.8', '1.2', '96.6%', 'Thu (32/35)'],
              ['6-B', '34', '31.9', '2.1', '93.8%', 'Tue (30/34)'],
            ].map(row => row.map((cell, j) => (
              <span key={j} className={j === 0 ? `font-bold ${theme.highlight}` : theme.iconColor}>{cell}</span>
            )))}
            theme={theme}
          />
        </div>
      )}
    </div>
  );
}
