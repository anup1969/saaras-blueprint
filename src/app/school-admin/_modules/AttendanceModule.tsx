'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { StatCard, TabBar } from '@/components/shared';
import { Users, XCircle, Briefcase, Clock } from 'lucide-react';

export default function AttendanceModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Student Attendance');
  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Attendance</h1>
      <TabBar tabs={['Student Attendance', 'Staff Attendance', 'Reports']} active={tab} onChange={setTab} theme={theme} />
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={Users} label="Students Present" value="1,172" color="bg-emerald-500" sub="94.0%" theme={theme} />
        <StatCard icon={XCircle} label="Absent" value="75" color="bg-red-500" theme={theme} />
        <StatCard icon={Briefcase} label="Staff Present" value="82/86" color="bg-blue-500" theme={theme} />
        <StatCard icon={Clock} label="Late Arrivals" value="7" color="bg-amber-500" theme={theme} />
      </div>
      {tab === 'Student Attendance' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center gap-3 mb-4">
            <select className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs`}>
              <option>All Classes</option><option>10-A</option><option>10-B</option><option>9-A</option>
            </select>
            <select className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs`}>
              <option>Today</option><option>Yesterday</option><option>This Week</option>
            </select>
          </div>
          <div className="grid grid-cols-6 gap-2 text-center text-xs">
            {['Aarav P.', 'Zara K.', 'Riya S.', 'Arjun S.', 'Meera N.', 'Rohan G.'].map((n, i) => (
              <div key={i} className={`p-3 rounded-xl ${i === 3 ? 'bg-red-50 border border-red-200' : `${theme.accentBg}`}`}>
                <div className={`w-8 h-8 rounded-full ${i === 3 ? 'bg-red-200' : 'bg-emerald-200'} mx-auto mb-1 flex items-center justify-center text-[10px] font-bold`}>
                  {i === 3 ? 'A' : 'P'}
                </div>
                <p className={`font-bold ${theme.highlight}`}>{n}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
