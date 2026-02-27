'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { StatusBadge, TabBar, DataTable } from '@/components/shared';
import { mockStaff } from '@/lib/mock-data';
import { Plus, Eye, Edit } from 'lucide-react';

export default function StaffModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All Staff');
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Staff Management</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> Add Employee</button>
      </div>
      <TabBar tabs={['All Staff', 'Teaching', 'Non-Teaching', 'Probation']} active={tab} onChange={setTab} theme={theme} />
      <DataTable
        headers={['ID', 'Name', 'Department', 'Role', 'Status', 'Phone', '']}
        rows={mockStaff.map(s => [
          <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{s.id}</span>,
          <span key="name" className={`font-bold ${theme.highlight}`}>{s.name}</span>,
          <span key="dept" className={theme.iconColor}>{s.dept}</span>,
          <span key="role" className={theme.iconColor}>{s.role}</span>,
          <StatusBadge key="status" status={s.status} theme={theme} />,
          <span key="phone" className={theme.iconColor}>{s.phone}</span>,
          <div key="actions" className="flex gap-1">
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Edit size={12} className={theme.iconColor} /></button>
          </div>
        ])}
        theme={theme}
      />
    </div>
  );
}
