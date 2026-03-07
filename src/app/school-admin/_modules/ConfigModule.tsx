'use client';

import React from 'react';
import { type Theme } from '@/lib/themes';
import { Settings, ArrowRight, GraduationCap, Layers, Calendar, Building2 } from 'lucide-react';

export default function ConfigModule({ theme }: { theme: Theme }) {
  const configSections = [
    { title: 'School Profile', desc: 'Name, address, logo, board, UDISE code' },
    { title: 'Academic Year', desc: 'Current year, term dates, holidays' },
    { title: 'Class & Sections', desc: 'Class list, section naming, capacity' },
    { title: 'Fee Configuration', desc: 'Fee structure, installments, late fee policy' },
    { title: 'Notification Preferences', desc: 'Email ON/OFF, SMS, WhatsApp, per-event config' },
    { title: 'Permission Profiles', desc: 'Default profiles, custom profiles, module access' },
    { title: 'Attendance Settings', desc: 'Daily vs period-wise, marking rules' },
    { title: 'Visitor Management', desc: 'Pre-registration rules, badge format' },
  ];

  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>School Configuration</h1>

      {/* ─── SSA Academic Config Summary ─── */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center gap-2 mb-3">
          <GraduationCap size={16} className={theme.primaryText} />
          <h3 className={`text-sm font-bold ${theme.highlight}`}>Academic Configuration</h3>
          <span className={`text-[10px] ${theme.iconColor}`}>(from SSA)</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Grades */}
          <div className={`p-3 rounded-xl ${theme.secondaryBg} border ${theme.border}`}>
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap size={14} className={theme.primaryText} />
              <p className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>Grades (15)</p>
            </div>
            <div className="flex flex-wrap gap-1">
              {['Nursery', 'LKG', 'UKG', ...Array.from({ length: 12 }, (_, i) => `Grade ${i + 1}`)].map(g => (
                <span key={g} className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${theme.cardBg} ${theme.iconColor} border ${theme.border}`}>{g}</span>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div className={`p-3 rounded-xl ${theme.secondaryBg} border ${theme.border}`}>
            <div className="flex items-center gap-2 mb-2">
              <Layers size={14} className={theme.primaryText} />
              <p className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>Sections per Grade</p>
            </div>
            <div className="flex gap-2">
              {['A', 'B', 'C'].map(s => (
                <div key={s} className={`flex-1 p-2 rounded-lg ${theme.cardBg} border ${theme.border} text-center`}>
                  <p className={`text-sm font-bold ${theme.highlight}`}>{s}</p>
                  <p className={`text-[9px] ${theme.iconColor}`}>~40 students</p>
                </div>
              ))}
            </div>
            <p className={`text-[9px] ${theme.iconColor} mt-1.5`}>Total: 15 grades x 3 sections = 45 sections</p>
          </div>

          {/* Terms */}
          <div className={`p-3 rounded-xl ${theme.secondaryBg} border ${theme.border}`}>
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={14} className={theme.primaryText} />
              <p className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>Academic Terms</p>
            </div>
            <div className="space-y-1.5">
              <div className={`p-2 rounded-lg ${theme.cardBg} border ${theme.border}`}>
                <p className={`text-xs font-bold ${theme.highlight}`}>Term 1</p>
                <p className={`text-[9px] ${theme.iconColor}`}>April &ndash; September</p>
              </div>
              <div className={`p-2 rounded-lg ${theme.cardBg} border ${theme.border}`}>
                <p className={`text-xs font-bold ${theme.highlight}`}>Term 2</p>
                <p className={`text-[9px] ${theme.iconColor}`}>October &ndash; March</p>
              </div>
            </div>
          </div>

          {/* Departments */}
          <div className={`p-3 rounded-xl ${theme.secondaryBg} border ${theme.border}`}>
            <div className="flex items-center gap-2 mb-2">
              <Building2 size={14} className={theme.primaryText} />
              <p className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>Departments (7)</p>
            </div>
            <div className="flex flex-wrap gap-1">
              {['Pre-Primary', 'Primary', 'Secondary', 'Higher Secondary', 'Admin', 'Transport', 'Support'].map(d => (
                <span key={d} className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${theme.cardBg} ${theme.iconColor} border ${theme.border}`}>{d}</span>
              ))}
            </div>
          </div>
        </div>
        <p className={`text-[10px] ${theme.iconColor} mt-2 italic`}>These values are configured in School Super Admin and consumed across all dashboards.</p>
      </div>

      {/* ─── Config Section Cards ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {configSections.map((c, i) => (
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
