'use client';

import React, { useState } from 'react';
import { TabBar, StatusBadge, DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import { Plus } from 'lucide-react';
import { schools } from './mockData';

export default function SchoolsView({ theme, onStartWizard }: { theme: Theme; onStartWizard: () => void }) {
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
  const [tab, setTab] = useState('All');

  const filtered = tab === 'All' ? schools : schools.filter(s => s.status === tab);

  if (selectedSchool) {
    const school = schools.find(s => s.id === selectedSchool)!;
    return (
      <div className="space-y-4">
        <button onClick={() => setSelectedSchool(null)} className={`text-xs ${theme.primaryText} font-bold`}>← Back to Schools</button>
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6`}>
          <div className="flex items-start justify-between">
            <div>
              <h2 className={`text-lg font-bold ${theme.highlight}`}>{school.name}</h2>
              <p className={`text-xs ${theme.iconColor} mt-1`}>{school.id} · Since {school.since}</p>
            </div>
            <StatusBadge status={school.status} theme={theme} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-lg font-bold ${theme.highlight}`}>{school.students.toLocaleString()}</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Students</p>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-lg font-bold ${theme.highlight}`}>{school.staff}</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Staff</p>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-lg font-bold ${theme.highlight}`}>{school.mrr}</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Monthly Revenue</p>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-lg font-bold ${theme.highlight}`}>{school.modules}</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Active Modules</p>
            </div>
          </div>
          {/* School Config Sections */}
          <div className="mt-6 space-y-3">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Configuration</h3>
            {['Academic Setup', 'Fee Structure', 'Module Access', 'User Roles', 'Branding', 'Integrations'].map(section => (
              <div key={section} className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
                <span className={`text-xs font-medium ${theme.highlight}`}>{section}</span>
                <button className={`text-xs ${theme.primaryText} font-bold`}>Configure →</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-bold ${theme.highlight}`}>Schools</h2>
          <p className={`text-xs ${theme.iconColor}`}>{schools.length} total schools on platform</p>
        </div>
        <button onClick={onStartWizard} className={`flex items-center gap-2 px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>
          <Plus size={14} /> Add School
        </button>
      </div>

      <TabBar tabs={['All', 'Active', 'Trial', 'Churned']} active={tab} onChange={setTab} theme={theme} />

      <DataTable
        headers={['School', 'Plan', 'Students', 'Staff', 'MRR', 'Status', '']}
        rows={filtered.map(s => [
          <div key={s.id}>
            <p className={`text-xs font-bold ${theme.highlight}`}>{s.name}</p>
            <p className={`text-[10px] ${theme.iconColor}`}>{s.id} · Since {s.since}</p>
          </div>,
          <span key="plan" className={`text-xs font-bold ${theme.primaryText}`}>{s.plan}</span>,
          <span key="stu" className={`text-xs ${theme.highlight}`}>{s.students.toLocaleString()}</span>,
          <span key="staff" className={`text-xs ${theme.highlight}`}>{s.staff}</span>,
          <span key="mrr" className={`text-xs font-bold ${theme.highlight}`}>{s.mrr}</span>,
          <StatusBadge key="status" status={s.status} theme={theme} />,
          <button key="view" onClick={() => setSelectedSchool(s.id)} className={`text-xs ${theme.primaryText} font-bold`}>View</button>,
        ])}
        theme={theme}
      />
    </div>
  );
}
