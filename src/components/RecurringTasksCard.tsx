'use client';

import React from 'react';
import { type Theme } from '@/lib/themes';
import { RefreshCw, Check, X } from 'lucide-react';

interface RecurringTask {
  id: number;
  title: string;
  assignee: string;
  frequency: string;
  priority: 'high' | 'medium' | 'low';
  todayDone: number;
  todayTotal: number;
  streak: (boolean | null)[]; // last 14 days
}

const roleMockTasks: Record<string, RecurringTask[]> = {
  principal: [
    { id: 1, title: 'Check washroom cleanliness — all floors', assignee: 'Housekeeping Head', frequency: 'Twice Daily', priority: 'high', todayDone: 1, todayTotal: 2, streak: [true, true, true, true, true, true, false, true, true, true, true, true, true, true] },
    { id: 2, title: 'Verify fire safety equipment status', assignee: 'Security Head', frequency: 'Monthly', priority: 'high', todayDone: 0, todayTotal: 1, streak: [true, null, null, null, null, null, null, null, null, null, null, null, null, null] },
    { id: 3, title: 'Clean entire school premises', assignee: 'Housekeeping Head', frequency: 'Weekly', priority: 'medium', todayDone: 1, todayTotal: 1, streak: [true, null, null, null, null, null, null, true, null, null, null, null, null, true] },
    { id: 4, title: 'Campus security walkthrough', assignee: 'Security Guard', frequency: 'Daily', priority: 'medium', todayDone: 1, todayTotal: 1, streak: [true, true, true, false, true, true, true, true, true, true, true, true, false, true] },
    { id: 5, title: 'Drinking water quality check', assignee: 'Lab Assistant', frequency: 'Weekly', priority: 'high', todayDone: 0, todayTotal: 1, streak: [false, null, null, null, null, null, null, true, null, null, null, null, null, true] },
  ],
  'school-admin': [
    { id: 1, title: 'Consolidate daily attendance report', assignee: 'Self', frequency: 'Daily', priority: 'high', todayDone: 1, todayTotal: 1, streak: [true, true, true, true, true, false, true, true, true, true, true, true, true, true] },
    { id: 2, title: 'Send fee reminder SMS to defaulters', assignee: 'Accounts Head', frequency: 'Weekly', priority: 'high', todayDone: 0, todayTotal: 1, streak: [true, null, null, null, null, null, null, true, null, null, null, null, null, false] },
    { id: 3, title: 'Check visitor log completeness', assignee: 'Receptionist', frequency: 'Daily', priority: 'medium', todayDone: 0, todayTotal: 1, streak: [true, true, true, true, false, true, true, true, true, true, false, true, true, true] },
    { id: 4, title: 'Update student records & transfers', assignee: 'Self', frequency: 'Weekly', priority: 'medium', todayDone: 1, todayTotal: 1, streak: [true, null, null, null, null, null, null, true, null, null, null, null, null, true] },
    { id: 5, title: 'Backup critical documents to cloud', assignee: 'IT Staff', frequency: 'Weekly', priority: 'high', todayDone: 0, todayTotal: 1, streak: [true, null, null, null, null, null, null, true, null, null, null, null, null, true] },
  ],
  trustee: [
    { id: 1, title: 'Review daily fee collection summary', assignee: 'Accounts Head', frequency: 'Daily', priority: 'high', todayDone: 1, todayTotal: 1, streak: [true, true, true, true, true, true, true, true, true, false, true, true, true, true] },
    { id: 2, title: 'Verify compliance audit checklist', assignee: 'Principal', frequency: 'Monthly', priority: 'high', todayDone: 0, todayTotal: 1, streak: [true, null, null, null, null, null, null, null, null, null, null, null, null, null] },
    { id: 3, title: 'Review campus safety walkthrough report', assignee: 'Security Head', frequency: 'Weekly', priority: 'high', todayDone: 0, todayTotal: 1, streak: [true, null, null, null, null, null, null, true, null, null, null, null, null, false] },
    { id: 4, title: 'Check infrastructure maintenance log', assignee: 'Admin Officer', frequency: 'Bi-weekly', priority: 'medium', todayDone: 1, todayTotal: 1, streak: [true, null, null, null, null, null, null, null, null, null, null, null, null, true] },
    { id: 5, title: 'Follow up on board meeting action items', assignee: 'Self', frequency: 'Weekly', priority: 'medium', todayDone: 0, todayTotal: 1, streak: [false, null, null, null, null, null, null, true, null, null, null, null, null, true] },
  ],
};

interface RecurringTasksCardProps {
  theme: Theme;
  role: string;
  isPreschool?: boolean;
}

export default function RecurringTasksCard({ theme, role }: RecurringTasksCardProps) {
  const recurringTasks = roleMockTasks[role] || roleMockTasks['principal'];

  const completedToday = recurringTasks.filter(t => t.todayDone >= t.todayTotal).length;
  const totalToday = recurringTasks.length;
  const completionPct = Math.round((completedToday / totalToday) * 100);

  const priorityDot = (p: 'high' | 'medium' | 'low') => {
    if (p === 'high') return 'bg-red-500';
    if (p === 'medium') return 'bg-amber-500';
    return 'bg-blue-500';
  };

  return (
    <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <RefreshCw size={16} className={theme.iconColor} />
          <h3 className={`text-sm font-bold ${theme.highlight}`}>Recurring Tasks</h3>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
            completionPct === 100 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
          }`}>
            {completedToday}/{totalToday} done today
          </span>
        </div>
        <div className={`text-[10px] font-medium ${theme.iconColor}`}>
          Last 14 days
        </div>
      </div>

      {/* Progress bar */}
      <div className={`w-full h-2 rounded-full ${theme.secondaryBg} mb-4`}>
        <div
          className={`h-2 rounded-full transition-all ${completionPct === 100 ? 'bg-emerald-500' : 'bg-amber-500'}`}
          style={{ width: `${completionPct}%` }}
        />
      </div>

      {/* Task list with streaks */}
      <div className="space-y-2.5">
        {recurringTasks.map(task => (
          <div key={task.id} className={`p-3 rounded-xl ${theme.accentBg}`}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-start gap-2 flex-1 min-w-0">
                {/* Completion checkbox */}
                <button className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                  task.todayDone >= task.todayTotal
                    ? 'bg-emerald-500 border-emerald-500'
                    : 'border-gray-300 hover:border-emerald-400'
                }`}>
                  {task.todayDone >= task.todayTotal && <Check size={10} className="text-white" />}
                </button>
                <div className="min-w-0">
                  <p className={`text-[11px] font-bold ${theme.highlight} truncate ${
                    task.todayDone >= task.todayTotal ? 'line-through opacity-60' : ''
                  }`}>{task.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${priorityDot(task.priority)}`} />
                    <span className={`text-[9px] ${theme.iconColor}`}>{task.assignee}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${theme.secondaryBg} ${theme.iconColor} font-medium`}>{task.frequency}</span>
                    {task.todayTotal > 1 && (
                      <span className={`text-[9px] font-bold ${task.todayDone >= task.todayTotal ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {task.todayDone}/{task.todayTotal}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Streak row */}
            <div className="flex items-center gap-1 ml-7">
              {task.streak.map((day, i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-sm flex items-center justify-center ${
                    day === null ? `${theme.secondaryBg} opacity-30`
                    : day ? 'bg-emerald-500'
                    : 'bg-red-400'
                  }`}
                  title={day === null ? 'N/A' : day ? 'Completed' : 'Missed'}
                >
                  {day === true && <Check size={8} className="text-white" />}
                  {day === false && <X size={8} className="text-white" />}
                </div>
              ))}
              {(() => {
                const recent = task.streak.filter((d): d is boolean => d !== null);
                const done = recent.filter(d => d === true).length;
                const total = recent.length;
                const pct = total > 0 ? Math.round((done / total) * 100) : 0;
                return (
                  <span className={`text-[9px] font-bold ml-1 ${pct >= 90 ? 'text-emerald-600' : pct >= 70 ? 'text-amber-600' : 'text-red-600'}`}>
                    {pct}%
                  </span>
                );
              })()}
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <p className={`text-[9px] ${theme.iconColor} mt-3 pt-2 border-t ${theme.border} italic`}>
        Recurring tasks auto-reset based on frequency. Streak shows completion history.
      </p>
    </div>
  );
}
