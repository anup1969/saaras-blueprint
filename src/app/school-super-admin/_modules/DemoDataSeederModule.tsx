'use client';

import React, { useState } from 'react';
import { Database, Users, Briefcase, Banknote, ClipboardCheck, Trash2, Play, AlertTriangle, CheckCircle } from 'lucide-react';
import { SectionCard, ModuleHeader } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

export default function DemoDataSeederModule({ theme }: { theme: Theme }) {
  const [seeded, setSeeded] = useState<Record<string, boolean>>({});
  const [clearing, setClearing] = useState(false);

  const seedDomains = [
    { key: 'students', label: 'Students', count: '500 students across Nursery-Class 12', icon: Users, color: 'bg-blue-500' },
    { key: 'staff', label: 'Staff & Teachers', count: '80 staff (60 teaching + 20 non-teaching)', icon: Briefcase, color: 'bg-purple-500' },
    { key: 'fees', label: 'Fee Transactions', count: '3 years of fee records with partial payments', icon: Banknote, color: 'bg-emerald-500' },
    { key: 'attendance', label: 'Attendance Records', count: '6 months of daily attendance data', icon: ClipboardCheck, color: 'bg-amber-500' },
    { key: 'exams', label: 'Exam Results', count: '2 exam cycles with marks across all subjects', icon: Database, color: 'bg-rose-500' },
  ];

  return (
    <div className="space-y-4">
      <ModuleHeader title="Demo Data Seeder" subtitle="Seed realistic demo data for trial accounts and sales demonstrations" theme={theme} />

      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex items-start gap-3">
        <AlertTriangle size={20} className="text-amber-500 mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-bold text-amber-800">For Demo/Trial Accounts Only</p>
          <p className="text-xs text-amber-700 mt-1">Seeding creates realistic but fictional data. Never use on a production school account — it will mix with real data and cannot be easily separated.</p>
        </div>
      </div>

      <SectionCard title="Seed Data by Domain" subtitle="Click Seed to populate each domain with realistic demo data" theme={theme}>
        <div className="space-y-2">
          {seedDomains.map(domain => (
            <div key={domain.key} className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg ${domain.color} flex items-center justify-center`}>
                  <domain.icon size={14} className="text-white" />
                </div>
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>{domain.label}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{domain.count}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {seeded[domain.key] && (
                  <span className="flex items-center gap-1 text-emerald-600 text-[10px] font-bold"><CheckCircle size={10} /> Seeded</span>
                )}
                <button
                  onClick={() => setSeeded(p => ({ ...p, [domain.key]: true }))}
                  disabled={seeded[domain.key]}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white ${seeded[domain.key] ? 'bg-gray-300 cursor-not-allowed' : `${theme.primary} hover:opacity-90`} transition-all`}
                >
                  <Play size={10} /> {seeded[domain.key] ? 'Done' : 'Seed'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Danger Zone" subtitle="Irreversible actions — clear all demo data" theme={theme}>
        <div className={`p-4 rounded-xl border-2 border-red-200 bg-red-50`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-red-800">Clear All Demo Data</p>
              <p className="text-xs text-red-600 mt-1">Removes all seeded demo data. This cannot be undone.</p>
            </div>
            <button
              onClick={() => { setClearing(true); setTimeout(() => { setSeeded({}); setClearing(false); }, 1000); }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-all"
            >
              <Trash2 size={12} /> {clearing ? 'Clearing...' : 'Clear All'}
            </button>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
