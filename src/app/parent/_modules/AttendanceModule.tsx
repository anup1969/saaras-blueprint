'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { StatCard } from '@/components/shared';
import {
  Calendar, Clock, CheckCircle, XCircle,
  Percent, Award, ChevronDown,
} from 'lucide-react';
import type { ChildProfile } from '../_components/types';
import { attendanceData } from '../_components/data';

export default function AttendanceModule({ theme, child }: { theme: Theme; child: ChildProfile }) {
  const att = attendanceData[child.id];
  const [selectedMonth] = useState('February 2026');

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // Feb 2026 starts on Sunday
  const firstDayOffset = 0;

  const statusColor = (s: string) => {
    switch (s) {
      case 'present': return 'bg-emerald-500 text-white';
      case 'absent': return 'bg-red-500 text-white';
      case 'late': return 'bg-amber-500 text-white';
      case 'holiday': return 'bg-purple-200 text-purple-700';
      case 'future': return `${theme.secondaryBg} ${theme.iconColor}`;
      default: return `${theme.secondaryBg} ${theme.iconColor}`;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className={`text-lg font-bold ${theme.highlight}`}>Attendance Record</h2>
        <div className="flex items-center gap-2">
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}>
            <Calendar size={12} /> {selectedMonth}
            <ChevronDown size={12} />
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-5 gap-3">
        <StatCard icon={CheckCircle} label="Days Present" value={att.totalPresent} color="bg-emerald-500" theme={theme} />
        <StatCard icon={XCircle} label="Days Absent" value={att.totalAbsent} color="bg-red-500" theme={theme} />
        <StatCard icon={Clock} label="Days Late" value={att.totalLate} color="bg-amber-500" theme={theme} />
        <StatCard icon={Percent} label="Attendance %" value={`${att.percentage}%`} color="bg-blue-500" sub={`Class Avg: ${att.classAverage}%`} theme={theme} />
        <StatCard icon={Award} label="Class Rank" value={`#${att.rank}`} color="bg-purple-500" sub={`of 42 students`} theme={theme} />
      </div>

      {/* Calendar Grid */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-4`}>{selectedMonth}</h3>
        <div className="grid grid-cols-7 gap-2">
          {dayNames.map(d => (
            <div key={d} className={`text-center text-[10px] font-bold ${theme.iconColor} py-1`}>{d}</div>
          ))}
          {/* Empty cells for offset */}
          {Array.from({ length: firstDayOffset }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {/* Day cells */}
          {att.monthly.map((day) => (
            <div
              key={day.date}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center text-xs font-bold transition-all ${statusColor(day.status)}`}
              title={`${day.date} Feb - ${day.status}`}
            >
              <span>{day.date}</span>
              {day.status !== 'future' && (
                <span className="text-[8px] mt-0.5 opacity-80">
                  {day.status === 'present' ? 'P' : day.status === 'absent' ? 'A' : day.status === 'late' ? 'L' : 'H'}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-dashed" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
          {[
            { label: 'Present', color: 'bg-emerald-500' },
            { label: 'Absent', color: 'bg-red-500' },
            { label: 'Late', color: 'bg-amber-500' },
            { label: 'Holiday', color: 'bg-purple-200' },
            { label: 'Upcoming', color: 'bg-gray-200' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded ${l.color}`} />
              <span className={`text-[10px] ${theme.iconColor}`}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison with class */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Attendance Comparison</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <span className={`text-xs ${theme.highlight}`}>{child.name}</span>
              <span className={`text-xs font-bold ${theme.highlight}`}>{att.percentage}%</span>
            </div>
            <div className={`h-3 rounded-full ${theme.secondaryBg}`}>
              <div className="h-3 rounded-full bg-emerald-500 transition-all" style={{ width: `${att.percentage}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className={`text-xs ${theme.iconColor}`}>Class {child.class}-{child.section} Average</span>
              <span className={`text-xs font-bold ${theme.iconColor}`}>{att.classAverage}%</span>
            </div>
            <div className={`h-3 rounded-full ${theme.secondaryBg}`}>
              <div className="h-3 rounded-full bg-blue-400 transition-all" style={{ width: `${att.classAverage}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
