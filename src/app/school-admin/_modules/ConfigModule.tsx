'use client';

import React from 'react';
import { type Theme } from '@/lib/themes';
import { Settings, ArrowRight } from 'lucide-react';

export default function ConfigModule({ theme }: { theme: Theme }) {
  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>School Configuration</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: 'School Profile', desc: 'Name, address, logo, board, UDISE code' },
          { title: 'Academic Year', desc: 'Current year, term dates, holidays' },
          { title: 'Class & Sections', desc: 'Class list, section naming, capacity' },
          { title: 'Fee Configuration', desc: 'Fee structure, installments, late fee policy' },
          { title: 'Notification Preferences', desc: 'Email ON/OFF, SMS, WhatsApp, per-event config' },
          { title: 'Permission Profiles', desc: 'Default profiles, custom profiles, module access' },
          { title: 'Attendance Settings', desc: 'Daily vs period-wise, marking rules' },
          { title: 'Visitor Management', desc: 'Pre-registration rules, badge format' },
        ].map((c, i) => (
          <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex items-center gap-3 cursor-pointer hover:shadow-md transition-all`}>
            <Settings size={18} className={theme.iconColor} />
            <div>
              <p className={`text-sm font-bold ${theme.highlight}`}>{c.title}</p>
              <p className={`text-xs ${theme.iconColor}`}>{c.desc}</p>
            </div>
            <ArrowRight size={14} className={`${theme.iconColor} ml-auto`} />
          </div>
        ))}
      </div>
    </div>
  );
}
