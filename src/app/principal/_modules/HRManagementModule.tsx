'use client';

import { StatCard, StatusBadge, DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import { Users, GraduationCap, Briefcase, Calendar, DollarSign, ClipboardCheck, Info } from 'lucide-react';

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

      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${theme.accentBg || theme.secondaryBg} mb-4`}>
        <Info size={14} className={theme.iconColor} />
        <p className={`text-[10px] ${theme.iconColor}`}>
          Principal-level overview — detailed HR operations managed via <span className="font-bold">HR Manager Dashboard</span>
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Staff" value="124" color="bg-blue-500" theme={theme} />
        <StatCard icon={GraduationCap} label="Teaching" value="78" color="bg-emerald-500" theme={theme} />
        <StatCard icon={Briefcase} label="Non-Teaching" value="46" color="bg-purple-500" theme={theme} />
        <StatCard icon={Calendar} label="On Leave Today" value="5" color="bg-amber-500" theme={theme} />
      </div>

      {/* Staff List */}
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

      {/* Quick Actions */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { label: 'View Payroll Summary', icon: DollarSign, color: 'bg-emerald-500', sub: 'Monthly payroll overview' },
            { label: 'Leave Requests', icon: Calendar, color: 'bg-amber-500', sub: '3 pending approvals' },
            { label: 'Attendance Report', icon: ClipboardCheck, color: 'bg-blue-500', sub: 'Staff attendance trends' },
          ].map(a => (
            <button key={a.label} className={`flex items-center gap-3 p-4 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} transition-all text-left`}>
              <div className={`w-10 h-10 rounded-xl ${a.color} flex items-center justify-center text-white`}><a.icon size={18} /></div>
              <div>
                <span className={`text-xs font-bold ${theme.highlight} block`}>{a.label}</span>
                <span className={`text-[10px] ${theme.iconColor}`}>{a.sub}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
