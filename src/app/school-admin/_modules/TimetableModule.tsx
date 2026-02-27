'use client';

import React from 'react';
import { type Theme } from '@/lib/themes';
import { Calendar } from 'lucide-react';

export default function TimetableModule({ theme }: { theme: Theme }) {
  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Timetable</h1>
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6`}>
        <p className={`text-sm ${theme.iconColor} mb-2`}>Hierarchy: Principal sets master → VP/Coordinator edits → Teacher adjusts</p>
        <div className={`w-full h-64 ${theme.accentBg} rounded-xl flex items-center justify-center`}>
          <div className="text-center">
            <Calendar size={48} className={theme.iconColor} />
            <p className={`text-sm ${theme.iconColor} mt-2`}>Weekly Timetable Grid View</p>
            <p className={`text-xs ${theme.iconColor}`}>Phase 2: AI auto-generation</p>
          </div>
        </div>
      </div>
    </div>
  );
}
