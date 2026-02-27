'use client';

import React from 'react';
import { type Theme } from '@/lib/themes';
import { StatCard, StatusBadge, DataTable } from '@/components/shared';
import { Users, GraduationCap, Briefcase, Calendar } from 'lucide-react';

export default function HRManagementModule({ theme }: { theme: Theme }) {
  const staffList = [
    { name: 'Dr. Priya Sharma', designation: 'HOD - Science', department: 'Teaching', status: 'Active' },
    { name: 'Rajesh Kumar', designation: 'Admin Manager', department: 'Administration', status: 'Active' },
    { name: 'Ms. Kavita Desai', designation: 'Counselor', department: 'Student Support', status: 'On Leave' },
    { name: 'Mohammed Irfan', designation: 'Transport Head', department: 'Transport', status: 'Active' },
    { name: 'Vikram Singh', designation: 'IT Coordinator', department: 'IT & Lab', status: 'Active' },
    { name: 'Sunita Verma', designation: 'TGT - Hindi', department: 'Teaching', status: 'On Leave' },
  ];

  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>HR Management</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Staff" value="124" color="bg-blue-500" theme={theme} />
        <StatCard icon={GraduationCap} label="Teaching" value="78" color="bg-emerald-500" theme={theme} />
        <StatCard icon={Briefcase} label="Non-Teaching" value="46" color="bg-purple-500" theme={theme} />
        <StatCard icon={Calendar} label="On Leave Today" value="5" color="bg-amber-500" theme={theme} />
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Staff Directory</h3>
        <DataTable
          headers={['Name', 'Designation', 'Department', 'Status']}
          rows={staffList.map(s => [
            <span key="name" className={`font-bold ${theme.highlight}`}>{s.name}</span>,
            <span key="desig" className={theme.iconColor}>{s.designation}</span>,
            <span key="dept" className={theme.iconColor}>{s.department}</span>,
            <StatusBadge key="status" status={s.status === 'Active' ? 'Active' : 'Pending'} theme={theme} />,
          ])}
          theme={theme}
        />
      </div>
    </div>
  );
}
