'use client';

import React, { useState } from 'react';
import { StatCard } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import { BookOpen, Filter, Users, Star } from 'lucide-react';

// ─── MOCK DATA ──────────────────────────────────────

const teacherProfile = {
  classes: ['10-A', '10-B', '9-A', '9-B', '8-A', '6-A'],
};

const myClasses = [
  { id: 'CLS001', class: '10-A', subject: 'Mathematics', students: 42, classTeacher: true, room: 'Room 301', schedule: 'Mon, Wed, Fri — Period 1' },
  { id: 'CLS002', class: '10-B', subject: 'Mathematics', students: 40, classTeacher: false, room: 'Room 302', schedule: 'Mon, Tue, Thu — Period 2' },
  { id: 'CLS003', class: '9-A', subject: 'Science', students: 38, classTeacher: false, room: 'Lab 1', schedule: 'Tue, Thu, Sat — Period 3' },
  { id: 'CLS004', class: '9-B', subject: 'Science', students: 36, classTeacher: false, room: 'Lab 2', schedule: 'Wed, Fri, Sat — Period 4' },
  { id: 'CLS005', class: '8-A', subject: 'Mathematics', students: 35, classTeacher: false, room: 'Room 204', schedule: 'Mon, Wed, Fri — Period 5' },
  { id: 'CLS006', class: '6-A', subject: 'Mathematics', students: 34, classTeacher: false, room: 'Room 106', schedule: 'Tue, Thu, Sat — Period 6' },
];

export default function MyClassesModule({ theme }: { theme: Theme }) {
  const [subjectFilter, setSubjectFilter] = useState<string>('All');
  const allSubjects = [...new Set(myClasses.map(c => c.subject))];
  const filteredClasses = subjectFilter === 'All' ? myClasses : myClasses.filter(c => c.subject === subjectFilter);
  const totalStudents = filteredClasses.reduce((sum, c) => sum + c.students, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>My Classes</h1>
        <div className="flex items-center gap-3">
          <p className={`text-xs ${theme.iconColor}`}>Academic Year 2025-26</p>
          <div className="flex items-center gap-1.5">
            <Filter size={12} className={theme.iconColor} />
            <select
              value={subjectFilter}
              onChange={e => setSubjectFilter(e.target.value)}
              className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight} outline-none`}
            >
              <option value="All">All Subjects ({myClasses.length})</option>
              {allSubjects.map(s => (
                <option key={s} value={s}>{s} ({myClasses.filter(c => c.subject === s).length})</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Subject badges */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`text-[10px] ${theme.iconColor} font-bold`}>Subjects assigned:</span>
        {allSubjects.map(s => (
          <button
            key={s}
            onClick={() => setSubjectFilter(subjectFilter === s ? 'All' : s)}
            className={`text-[10px] px-2.5 py-1 rounded-full font-bold transition-all ${
              subjectFilter === s
                ? 'bg-blue-500 text-white'
                : s === 'Science'
                ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
            }`}
          >
            {s} · {myClasses.filter(c => c.subject === s).length} classes
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard icon={BookOpen} label="Total Classes" value={String(filteredClasses.length)} color="bg-blue-500" theme={theme} />
        <StatCard icon={Users} label="Total Students" value={String(totalStudents)} color="bg-emerald-500" theme={theme} />
        <StatCard icon={Star} label="Class Teacher" value="10-A" color="bg-amber-500" theme={theme} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClasses.map(c => (
          <div key={c.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-3`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-xl ${c.classTeacher ? 'bg-amber-500' : 'bg-blue-500'} flex items-center justify-center text-white`}>
                  <BookOpen size={18} />
                </div>
                <div>
                  <p className={`text-sm font-bold ${theme.highlight}`}>Class {c.class}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{c.subject}</p>
                </div>
              </div>
              {c.classTeacher && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold">Class Teacher</span>
              )}
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className={`text-xs ${theme.iconColor}`}>Students</span>
                <span className={`text-xs font-bold ${theme.highlight}`}>{c.students}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-xs ${theme.iconColor}`}>Room</span>
                <span className={`text-xs font-bold ${theme.highlight}`}>{c.room}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-xs ${theme.iconColor}`}>Schedule</span>
                <span className={`text-[10px] font-bold ${theme.highlight}`}>{c.schedule}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className={`flex-1 text-xs font-bold py-2 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} ${theme.highlight}`}>View Students</button>
              <button className={`flex-1 text-xs font-bold py-2 rounded-xl ${theme.primary} text-white`}>Take Attendance</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
