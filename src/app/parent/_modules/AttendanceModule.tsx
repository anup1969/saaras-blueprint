'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { StatCard } from '@/components/shared';
import {
  Calendar, Clock, CheckCircle, XCircle,
  Percent, Award, ChevronDown, ChevronLeft, ChevronRight,
} from 'lucide-react';
import type { ChildProfile } from '../_components/types';
import { attendanceData } from '../_components/data';

export default function AttendanceModule({ theme, child }: { theme: Theme; child: ChildProfile }) {
  const att = attendanceData[child.id];
  const [selectedMonth] = useState('February 2026');

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const firstDayOffset = 0; // Feb 2026 starts on Sunday

  const statusDot = (s: string) => {
    switch (s) {
      case 'present': return 'bg-emerald-500';
      case 'absent': return 'bg-red-500';
      case 'late': return 'bg-amber-500';
      case 'holiday': return 'bg-purple-400';
      case 'future': return `${theme.secondaryBg}`;
      default: return `${theme.secondaryBg}`;
    }
  };

  const statusText = (s: string) => {
    switch (s) {
      case 'present': return 'text-emerald-600';
      case 'absent': return 'text-red-600';
      case 'late': return 'text-amber-600';
      case 'holiday': return 'text-purple-600';
      default: return theme.iconColor;
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

      {/* Compact Calendar */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <button className={`p-1 rounded-lg ${theme.buttonHover} ${theme.iconColor}`}><ChevronLeft size={14} /></button>
            <h3 className={`text-sm font-bold ${theme.highlight}`}>{selectedMonth}</h3>
            <button className={`p-1 rounded-lg ${theme.buttonHover} ${theme.iconColor}`}><ChevronRight size={14} /></button>
          </div>
          <div className="flex items-center gap-3">
            {[
              { label: 'P', color: 'bg-emerald-500', text: 'Present' },
              { label: 'A', color: 'bg-red-500', text: 'Absent' },
              { label: 'L', color: 'bg-amber-500', text: 'Late' },
              { label: 'H', color: 'bg-purple-400', text: 'Holiday' },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1" title={l.text}>
                <div className={`w-2.5 h-2.5 rounded-full ${l.color}`} />
                <span className={`text-[9px] ${theme.iconColor}`}>{l.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-7 gap-px">
          {/* Day headers */}
          {dayNames.map((d, i) => (
            <div key={i} className={`text-center text-[11px] font-bold ${theme.iconColor} py-1`}>{d}</div>
          ))}
          {/* Empty offset cells */}
          {Array.from({ length: firstDayOffset }).map((_, i) => (
            <div key={`empty-${i}`} className="h-9" />
          ))}
          {/* Day cells — compact */}
          {att.monthly.map((day) => (
            <div
              key={day.date}
              className={`h-9 rounded-lg flex items-center justify-center relative group cursor-default transition-all hover:ring-1 hover:ring-current`}
              title={`${day.date} Feb — ${day.status.charAt(0).toUpperCase() + day.status.slice(1)}`}
            >
              <span className={`text-sm font-medium ${day.status === 'future' ? theme.iconColor + ' opacity-40' : statusText(day.status)}`}>
                {day.date}
              </span>
              {day.status !== 'future' && (
                <span className={`absolute bottom-0.5 w-1.5 h-1.5 rounded-full ${statusDot(day.status)}`} />
              )}
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
            <div className={`h-2.5 rounded-full ${theme.secondaryBg}`}>
              <div className="h-2.5 rounded-full bg-emerald-500 transition-all" style={{ width: `${att.percentage}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className={`text-xs ${theme.iconColor}`}>Class {child.class}-{child.section} Average</span>
              <span className={`text-xs font-bold ${theme.iconColor}`}>{att.classAverage}%</span>
            </div>
            <div className={`h-2.5 rounded-full ${theme.secondaryBg}`}>
              <div className="h-2.5 rounded-full bg-blue-400 transition-all" style={{ width: `${att.classAverage}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
