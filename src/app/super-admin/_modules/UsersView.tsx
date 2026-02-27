'use client';

import React, { useState } from 'react';
import { TabBar, StatusBadge, SearchBar, DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import { Users, Plus, Search } from 'lucide-react';
import { schools } from './mockData';

export default function UsersView({ theme }: { theme: Theme }) {
  const platformUsers = [
    { name: 'Piush Thakker', role: 'Super Admin', email: 'piush@saaras.ai', status: 'Active', lastLogin: '2 min ago' },
    { name: 'Dhavalbhai', role: 'Developer', email: 'dhaval@saaras.ai', status: 'Active', lastLogin: '1 hour ago' },
    { name: 'Manishbhai', role: 'Consultant', email: 'manish@saaras.ai', status: 'Active', lastLogin: '2 days ago' },
    { name: 'Farheen', role: 'Support Lead', email: 'farheen@saaras.ai', status: 'Active', lastLogin: '30 min ago' },
    { name: 'Kunjal', role: 'Support Agent', email: 'kunjal@saaras.ai', status: 'Active', lastLogin: '4 hours ago' },
  ];
  const [tab, setTab] = useState('Platform Users');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-bold ${theme.highlight}`}>User Management</h2>
          <p className={`text-xs ${theme.iconColor}`}>Manage platform and school-level users</p>
        </div>
        <button className={`flex items-center gap-2 px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>
          <Plus size={14} /> Invite User
        </button>
      </div>

      <TabBar tabs={['Platform Users', 'School Admins', 'All School Users']} active={tab} onChange={setTab} theme={theme} />

      {tab === 'Platform Users' && (
        <DataTable
          headers={['Name', 'Role', 'Email', 'Status', 'Last Login']}
          rows={platformUsers.map(u => [
            <span key="n" className={`text-xs font-bold ${theme.highlight}`}>{u.name}</span>,
            <span key="r" className={`text-xs ${theme.primaryText} font-bold`}>{u.role}</span>,
            <span key="e" className={`text-xs ${theme.iconColor}`}>{u.email}</span>,
            <StatusBadge key="s" status={u.status} theme={theme} />,
            <span key="l" className={`text-[10px] ${theme.iconColor}`}>{u.lastLogin}</span>,
          ])}
          theme={theme}
        />
      )}

      {tab === 'School Admins' && (
        <DataTable
          headers={['School', 'Admin Name', 'Email', 'Users', 'Status']}
          rows={schools.filter(s => s.status === 'Active').map(s => [
            <span key="s" className={`text-xs font-bold ${theme.highlight}`}>{s.name}</span>,
            <span key="a" className={`text-xs ${theme.highlight}`}>Admin ({s.id})</span>,
            <span key="e" className={`text-xs ${theme.iconColor}`}>admin@{s.name.toLowerCase().replace(/[^a-z]/g, '').slice(0, 10)}.edu</span>,
            <span key="u" className={`text-xs font-bold ${theme.highlight}`}>{s.students + s.staff}</span>,
            <StatusBadge key="st" status={s.status} theme={theme} />,
          ])}
          theme={theme}
        />
      )}

      {tab === 'All School Users' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-8 text-center`}>
          <Users size={32} className={`${theme.iconColor} mx-auto mb-3`} />
          <p className={`text-sm font-bold ${theme.highlight}`}>12,480 total users across 6 schools</p>
          <p className={`text-xs ${theme.iconColor} mt-1`}>Use the search bar to find specific users, or filter by school</p>
          <div className="mt-4 max-w-md mx-auto">
            <SearchBar placeholder="Search by name, email, or phone..." theme={theme} icon={Search} />
          </div>
        </div>
      )}
    </div>
  );
}
