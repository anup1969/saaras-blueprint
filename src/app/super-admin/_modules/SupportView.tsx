'use client';

import React, { useState } from 'react';
import { TabBar, StatusBadge, DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import { Plus } from 'lucide-react';
import { supportTickets } from './mockData';

export default function SupportView({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All');
  const filtered = tab === 'All' ? supportTickets : supportTickets.filter(t => t.status === tab);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-bold ${theme.highlight}`}>Support Tickets</h2>
          <p className={`text-xs ${theme.iconColor}`}>{supportTickets.length} total tickets</p>
        </div>
        <button className={`flex items-center gap-2 px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>
          <Plus size={14} /> New Ticket
        </button>
      </div>

      <TabBar tabs={['All', 'Open', 'In Progress', 'Resolved']} active={tab} onChange={setTab} theme={theme} />

      <DataTable
        headers={['ID', 'School', 'Subject', 'Priority', 'Status', 'Assignee', 'Age']}
        rows={filtered.map(t => [
          <span key="id" className={`text-xs font-mono ${theme.iconColor}`}>{t.id}</span>,
          <span key="school" className={`text-xs font-bold ${theme.highlight}`}>{t.school}</span>,
          <span key="sub" className={`text-xs ${theme.highlight}`}>{t.subject}</span>,
          <StatusBadge key="pri" status={t.priority} theme={theme} />,
          <StatusBadge key="st" status={t.status} theme={theme} />,
          <span key="assign" className={`text-xs ${t.assignee === 'Unassigned' ? 'text-red-500 font-bold' : theme.iconColor}`}>{t.assignee}</span>,
          <span key="age" className={`text-[10px] ${theme.iconColor}`}>{t.age}</span>,
        ])}
        theme={theme}
      />
    </div>
  );
}
