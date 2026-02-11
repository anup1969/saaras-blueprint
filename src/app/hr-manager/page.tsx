'use client';

import React, { useState } from 'react';
import BlueprintLayout from '@/components/BlueprintLayout';
import { StatCard, TabBar, StatusBadge, SearchBar, DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  Home, Users, UserPlus, Briefcase, Calendar, Clock, Settings, Search, Plus,
  Eye, Edit, Download, Filter, Check, X,
  Banknote, DollarSign, TrendingUp, AlertTriangle, FileText,
  Mail, Star, Award, ArrowRight,
  ClipboardCheck, UserCheck, CheckCircle, XCircle,
  FolderOpen, FileCheck, FilePlus, Printer, CalendarDays, BadgeCheck,
  BarChart3, Building2
} from 'lucide-react';

// ─── MODULE SIDEBAR ────────────────────────────────
const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'directory', label: 'Staff Directory', icon: Users },
  { id: 'recruitment', label: 'Recruitment', icon: UserPlus },
  { id: 'leave', label: 'Leave Mgmt', icon: Calendar },
  { id: 'payroll', label: 'Payroll', icon: Banknote },
  { id: 'attendance', label: 'Attendance', icon: ClipboardCheck },
  { id: 'documents', label: 'Documents', icon: FolderOpen },
  { id: 'settings', label: 'Settings', icon: Settings },
];

// ─── MOCK DATA ─────────────────────────────────────
const mockStaff = [
  { id: 'EMP001', name: 'Dr. Rajesh Kumar', dept: 'Teaching', designation: 'PGT Mathematics', status: 'Active', phone: '9876543210' },
  { id: 'EMP002', name: 'Ms. Priya Sharma', dept: 'Teaching', designation: 'TGT English', status: 'Active', phone: '9876543211' },
  { id: 'EMP003', name: 'Mr. Amit Verma', dept: 'Admin', designation: 'Office Manager', status: 'Active', phone: '9876543212' },
  { id: 'EMP004', name: 'Mrs. Sunita Patel', dept: 'Teaching', designation: 'PRT Science', status: 'Probation', phone: '9876543213' },
  { id: 'EMP005', name: 'Mr. Ramesh Gupta', dept: 'Transport', designation: 'Fleet Supervisor', status: 'Active', phone: '9876543214' },
  { id: 'EMP006', name: 'Ms. Kavita Singh', dept: 'Teaching', designation: 'TGT Hindi', status: 'Active', phone: '9876543215' },
  { id: 'EMP007', name: 'Mr. Suresh Nair', dept: 'IT & Lab', designation: 'Lab Technician', status: 'Notice Period', phone: '9876543216' },
  { id: 'EMP008', name: 'Mr. Deepak Joshi', dept: 'Security', designation: 'Security Head', status: 'Active', phone: '9876543217' },
];

const mockPositions = [
  { title: 'PGT Mathematics', dept: 'Teaching', posted: '15-Jan-2026', applications: 12, status: 'Open' },
  { title: 'TGT English', dept: 'Teaching', posted: '18-Jan-2026', applications: 8, status: 'Urgent' },
  { title: 'Lab Assistant', dept: 'IT & Lab', posted: '20-Jan-2026', applications: 5, status: 'Open' },
  { title: 'Sports Coach', dept: 'Teaching', posted: '10-Jan-2026', applications: 15, status: 'Closed' },
  { title: 'Accountant', dept: 'Admin', posted: '22-Jan-2026', applications: 9, status: 'Open' },
];

const mockApplications = [
  { name: 'Ravi Shankar', position: 'PGT Mathematics', applied: '20-Jan-2026', experience: '5 years', status: 'Shortlisted' },
  { name: 'Neha Gupta', position: 'TGT English', applied: '22-Jan-2026', experience: '3 years', status: 'New' },
  { name: 'Vikram Mehta', position: 'Lab Assistant', applied: '25-Jan-2026', experience: '2 years', status: 'Interview Scheduled' },
  { name: 'Anita Rao', position: 'PGT Mathematics', applied: '21-Jan-2026', experience: '8 years', status: 'Shortlisted' },
  { name: 'Manoj Tiwari', position: 'Accountant', applied: '24-Jan-2026', experience: '4 years', status: 'New' },
  { name: 'Priti Das', position: 'Sports Coach', applied: '12-Jan-2026', experience: '6 years', status: 'Rejected' },
  { name: 'Sanjay Mishra', position: 'TGT English', applied: '23-Jan-2026', experience: '7 years', status: 'Interview Scheduled' },
];

const mockLeaveRequests = [
  { name: 'Ms. Priya Sharma', type: 'Casual Leave', from: '12-Feb-2026', to: '14-Feb-2026', days: 3, reason: 'Family function in hometown', dept: 'Teaching' },
  { name: 'Mr. Amit Verma', type: 'Sick Leave', from: '11-Feb-2026', to: '12-Feb-2026', days: 2, reason: 'Fever and cold', dept: 'Admin' },
  { name: 'Mrs. Sunita Patel', type: 'Earned Leave', from: '15-Feb-2026', to: '22-Feb-2026', days: 6, reason: 'Annual vacation with family', dept: 'Teaching' },
  { name: 'Mr. Ramesh Gupta', type: 'Casual Leave', from: '13-Feb-2026', to: '13-Feb-2026', days: 1, reason: 'Personal work — bank visit', dept: 'Transport' },
  { name: 'Ms. Kavita Singh', type: 'Maternity Leave', from: '01-Mar-2026', to: '28-May-2026', days: 89, reason: 'Maternity leave as per policy', dept: 'Teaching' },
];

const mockLeaveBalance = [
  { name: 'Dr. Rajesh Kumar', cl: 8, sl: 6, el: 15, used: 7, remaining: 22 },
  { name: 'Ms. Priya Sharma', cl: 5, sl: 6, el: 12, used: 10, remaining: 13 },
  { name: 'Mr. Amit Verma', cl: 7, sl: 4, el: 14, used: 8, remaining: 17 },
  { name: 'Mrs. Sunita Patel', cl: 10, sl: 6, el: 0, used: 2, remaining: 14 },
  { name: 'Mr. Ramesh Gupta', cl: 6, sl: 5, el: 10, used: 9, remaining: 12 },
  { name: 'Ms. Kavita Singh', cl: 4, sl: 6, el: 8, used: 12, remaining: 6 },
  { name: 'Mr. Suresh Nair', cl: 3, sl: 2, el: 5, used: 14, remaining: -4 },
  { name: 'Mr. Deepak Joshi', cl: 9, sl: 6, el: 12, used: 5, remaining: 22 },
];

const mockPayslips = [
  { name: 'Dr. Rajesh Kumar', basic: 45000, hra: 18000, da: 9000, deductions: 8500, net: 63500 },
  { name: 'Ms. Priya Sharma', basic: 35000, hra: 14000, da: 7000, deductions: 6200, net: 49800 },
  { name: 'Mr. Amit Verma', basic: 30000, hra: 12000, da: 6000, deductions: 5400, net: 42600 },
  { name: 'Mrs. Sunita Patel', basic: 28000, hra: 11200, da: 5600, deductions: 4800, net: 40000 },
  { name: 'Mr. Ramesh Gupta', basic: 25000, hra: 10000, da: 5000, deductions: 4200, net: 35800 },
  { name: 'Ms. Kavita Singh', basic: 32000, hra: 12800, da: 6400, deductions: 5600, net: 45600 },
  { name: 'Mr. Suresh Nair', basic: 22000, hra: 8800, da: 4400, deductions: 3800, net: 31400 },
  { name: 'Mr. Deepak Joshi', basic: 20000, hra: 8000, da: 4000, deductions: 3200, net: 28800 },
];

const mockAttendanceGrid = [
  { name: 'Dr. Rajesh Kumar', dept: 'Teaching', status: 'present' },
  { name: 'Ms. Priya Sharma', dept: 'Teaching', status: 'present' },
  { name: 'Mr. Amit Verma', dept: 'Admin', status: 'present' },
  { name: 'Mrs. Sunita Patel', dept: 'Teaching', status: 'late' },
  { name: 'Mr. Ramesh Gupta', dept: 'Transport', status: 'present' },
  { name: 'Ms. Kavita Singh', dept: 'Teaching', status: 'absent' },
  { name: 'Mr. Suresh Nair', dept: 'IT & Lab', status: 'half-day' },
  { name: 'Mr. Deepak Joshi', dept: 'Security', status: 'present' },
  { name: 'Ms. Asha Rani', dept: 'Teaching', status: 'present' },
  { name: 'Mr. Vijay Patil', dept: 'Teaching', status: 'present' },
  { name: 'Ms. Rekha Devi', dept: 'Admin', status: 'present' },
  { name: 'Mr. Mohan Das', dept: 'Transport', status: 'absent' },
  { name: 'Ms. Sneha Roy', dept: 'Teaching', status: 'present' },
  { name: 'Mr. Anil Kapoor', dept: 'Teaching', status: 'late' },
  { name: 'Ms. Pooja Mehta', dept: 'Teaching', status: 'present' },
  { name: 'Mr. Kiran Yadav', dept: 'Security', status: 'half-day' },
  { name: 'Ms. Lata Iyer', dept: 'Teaching', status: 'present' },
  { name: 'Mr. Prakash Jain', dept: 'Admin', status: 'present' },
  { name: 'Ms. Geeta Bose', dept: 'Teaching', status: 'present' },
  { name: 'Mr. Rajan Pillai', dept: 'IT & Lab', status: 'present' },
  { name: 'Ms. Nisha Agarwal', dept: 'Teaching', status: 'absent' },
  { name: 'Mr. Saurav Sinha', dept: 'Transport', status: 'present' },
  { name: 'Ms. Divya Nair', dept: 'Teaching', status: 'present' },
  { name: 'Mr. Harsh Pandey', dept: 'Teaching', status: 'late' },
];

// ─── MAIN COMPONENT ────────────────────────────────
function HRManagerDashboard({ theme }: { theme?: Theme }) {
  const [activeModule, setActiveModule] = useState('dashboard');
  if (!theme) return null;

  return (
    <div className="flex gap-4 -m-6">
      {/* Module sidebar */}
      <div className={`w-48 ${theme.cardBg} border-r ${theme.border} min-h-screen p-2 space-y-0.5 shrink-0`}>
        <p className={`text-[10px] font-bold ${theme.iconColor} uppercase px-3 py-2`}>Modules</p>
        {modules.map(m => (
          <button
            key={m.id}
            onClick={() => setActiveModule(m.id)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activeModule === m.id ? `${theme.primary} text-white` : `${theme.iconColor} ${theme.buttonHover}`
            }`}
          >
            <m.icon size={14} /> {m.label}
          </button>
        ))}
      </div>

      {/* Module content */}
      <div className="flex-1 p-6 space-y-4 overflow-x-hidden">
        {activeModule === 'dashboard' && <DashboardHome theme={theme} />}
        {activeModule === 'directory' && <StaffDirectoryModule theme={theme} />}
        {activeModule === 'recruitment' && <RecruitmentModule theme={theme} />}
        {activeModule === 'leave' && <LeaveManagementModule theme={theme} />}
        {activeModule === 'payroll' && <PayrollModule theme={theme} />}
        {activeModule === 'attendance' && <AttendanceModule theme={theme} />}
        {activeModule === 'documents' && <DocumentsModule theme={theme} />}
        {activeModule === 'settings' && <SettingsModule theme={theme} />}
      </div>
    </div>
  );
}

// ─── DASHBOARD HOME ────────────────────────────────
function DashboardHome({ theme }: { theme: Theme }) {
  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>HR Manager Dashboard</h1>

      {/* Stats Row 1 */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard icon={Users} label="Total Employees" value={142} color="bg-blue-500" theme={theme} />
        <StatCard icon={UserCheck} label="Present Today" value={128} color="bg-emerald-500" sub="90.1%" theme={theme} />
        <StatCard icon={Calendar} label="On Leave" value={8} color="bg-amber-500" theme={theme} />
        <StatCard icon={XCircle} label="Absent" value={6} color="bg-red-500" theme={theme} />
        <StatCard icon={Briefcase} label="Open Positions" value={3} color="bg-purple-500" theme={theme} />
        <StatCard icon={Clock} label="Pending Actions" value={12} color="bg-orange-500" theme={theme} />
      </div>

      {/* Department Strength */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-4`}>Department Strength</h3>
        <div className="space-y-3">
          {[
            { dept: 'Teaching', count: 89, total: 142, color: 'bg-blue-500' },
            { dept: 'Admin', count: 23, total: 142, color: 'bg-indigo-500' },
            { dept: 'Transport', count: 18, total: 142, color: 'bg-emerald-500' },
            { dept: 'IT & Lab', count: 8, total: 142, color: 'bg-purple-500' },
            { dept: 'Security', count: 4, total: 142, color: 'bg-orange-500' },
          ].map(d => (
            <div key={d.dept} className="flex items-center gap-3">
              <span className={`text-xs font-bold ${theme.highlight} w-20`}>{d.dept}</span>
              <div className={`flex-1 h-6 ${theme.secondaryBg} rounded-full overflow-hidden`}>
                <div
                  className={`h-full ${d.color} rounded-full flex items-center justify-end pr-2`}
                  style={{ width: `${(d.count / d.total) * 100}%` }}
                >
                  <span className="text-[10px] font-bold text-white">{d.count}</span>
                </div>
              </div>
              <span className={`text-xs ${theme.iconColor} w-10 text-right`}>{Math.round((d.count / d.total) * 100)}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { label: 'Process Payroll', icon: Banknote, color: 'bg-emerald-500' },
            { label: 'Approve Leaves', icon: CheckCircle, color: 'bg-amber-500' },
            { label: 'Post Job', icon: UserPlus, color: 'bg-blue-500' },
            { label: 'Generate Report', icon: BarChart3, color: 'bg-purple-500' },
          ].map(a => (
            <button key={a.label} className={`flex items-center gap-2 p-3 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} transition-all`}>
              <div className={`w-8 h-8 rounded-lg ${a.color} flex items-center justify-center text-white`}><a.icon size={14} /></div>
              <span className={`text-xs font-bold ${theme.highlight}`}>{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent HR Activity */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Recent HR Activity</h3>
        <div className="space-y-2">
          {[
            { text: 'Leave request from Ms. Priya Sharma — 3 days CL approved', time: '15 min ago', type: 'leave' },
            { text: 'New application received for PGT Mathematics — Ravi Shankar', time: '1 hour ago', type: 'recruitment' },
            { text: 'January payroll processed for 138 employees', time: '2 hours ago', type: 'payroll' },
            { text: 'Mr. Suresh Nair submitted resignation — notice period started', time: '1 day ago', type: 'exit' },
            { text: 'Attendance anomaly: 3 staff marked late on 10-Feb-2026', time: '1 day ago', type: 'attendance' },
          ].map((a, i) => (
            <div key={i} className={`flex items-center gap-3 p-2 rounded-xl ${theme.accentBg}`}>
              <div className={`w-2 h-2 rounded-full ${
                a.type === 'leave' ? 'bg-amber-500' :
                a.type === 'recruitment' ? 'bg-blue-500' :
                a.type === 'payroll' ? 'bg-emerald-500' :
                a.type === 'exit' ? 'bg-red-500' :
                'bg-purple-500'
              }`} />
              <p className={`text-xs ${theme.highlight} flex-1`}>{a.text}</p>
              <span className={`text-[10px] ${theme.iconColor}`}>{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── STAFF DIRECTORY MODULE ────────────────────────
function StaffDirectoryModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All Staff');
  const [filterDept, setFilterDept] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredStaff = mockStaff.filter(s => {
    const deptMatch = filterDept === 'All' || s.dept === filterDept;
    const statusMatch = filterStatus === 'All' || s.status === filterStatus;
    const tabMatch =
      tab === 'All Staff' ? true :
      tab === 'Teaching' ? s.dept === 'Teaching' :
      tab === 'Admin' ? s.dept === 'Admin' :
      tab === 'Transport' ? s.dept === 'Transport' :
      tab === 'Support' ? (s.dept === 'IT & Lab' || s.dept === 'Security') :
      true;
    return deptMatch && statusMatch && tabMatch;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Staff Directory</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> Add Employee</button>
      </div>
      <TabBar tabs={['All Staff', 'Teaching', 'Admin', 'Transport', 'Support']} active={tab} onChange={setTab} theme={theme} />
      <div className="flex gap-3">
        <SearchBar placeholder="Search by name, ID, department..." theme={theme} icon={Search} />
        <select
          value={filterDept}
          onChange={e => setFilterDept(e.target.value)}
          className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.iconColor}`}
        >
          <option value="All">All Departments</option>
          <option value="Teaching">Teaching</option>
          <option value="Admin">Admin</option>
          <option value="Transport">Transport</option>
          <option value="IT & Lab">IT & Lab</option>
          <option value="Security">Security</option>
        </select>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.iconColor}`}
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Probation">Probation</option>
          <option value="Notice Period">Notice Period</option>
        </select>
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Download size={12} /> Export</button>
      </div>
      <DataTable
        headers={['Emp ID', 'Name', 'Department', 'Designation', 'Status', 'Phone', 'Actions']}
        rows={filteredStaff.map(s => [
          <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{s.id}</span>,
          <span key="name" className={`font-bold ${theme.highlight}`}>{s.name}</span>,
          <span key="dept" className={theme.iconColor}>{s.dept}</span>,
          <span key="desig" className={theme.iconColor}>{s.designation}</span>,
          <StatusBadge key="status" status={s.status} theme={theme} />,
          <span key="phone" className={theme.iconColor}>{s.phone}</span>,
          <div key="actions" className="flex gap-1">
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Edit size={12} className={theme.iconColor} /></button>
          </div>
        ])}
        theme={theme}
      />
      <div className={`flex items-center justify-between text-xs ${theme.iconColor} px-2`}>
        <span>Showing {filteredStaff.length} of {mockStaff.length} employees</span>
        <div className="flex gap-1">
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Previous</button>
          <button className={`px-3 py-1.5 rounded-lg ${theme.primary} text-white`}>1</button>
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Next</button>
        </div>
      </div>
    </div>
  );
}

// ─── RECRUITMENT MODULE ────────────────────────────
function RecruitmentModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Open Positions');
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Recruitment</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> Post New Position</button>
      </div>
      <TabBar tabs={['Open Positions', 'Applications', 'Interviews']} active={tab} onChange={setTab} theme={theme} />

      {tab === 'Open Positions' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <StatCard icon={Briefcase} label="Total Open" value={3} color="bg-blue-500" theme={theme} />
            <StatCard icon={FileText} label="Total Applications" value={49} color="bg-indigo-500" theme={theme} />
            <StatCard icon={UserCheck} label="Shortlisted" value={8} color="bg-emerald-500" theme={theme} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockPositions.map((p, i) => (
              <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`text-sm font-bold ${theme.highlight}`}>{p.title}</h4>
                  <StatusBadge status={p.status} theme={theme} />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Building2 size={12} className={theme.iconColor} />
                    <span className={`text-xs ${theme.iconColor}`}>{p.dept}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays size={12} className={theme.iconColor} />
                    <span className={`text-xs ${theme.iconColor}`}>Posted: {p.posted}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={12} className={theme.iconColor} />
                    <span className={`text-xs ${theme.iconColor}`}>{p.applications} Applications</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button className={`px-3 py-1.5 rounded-xl text-xs font-bold ${theme.secondaryBg} ${theme.highlight}`}>View Details</button>
                  {p.status !== 'Closed' && (
                    <button className={`px-3 py-1.5 rounded-xl text-xs font-bold ${theme.primaryText} border ${theme.border}`}>Edit</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'Applications' && (
        <div className="space-y-4">
          <div className="flex gap-3">
            <SearchBar placeholder="Search applicant by name or position..." theme={theme} icon={Search} />
            <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Filter size={12} /> Filter</button>
          </div>
          <DataTable
            headers={['Applicant Name', 'Position', 'Applied Date', 'Experience', 'Status', 'Actions']}
            rows={mockApplications.map(a => [
              <span key="name" className={`font-bold ${theme.highlight}`}>{a.name}</span>,
              <span key="pos" className={theme.iconColor}>{a.position}</span>,
              <span key="date" className={theme.iconColor}>{a.applied}</span>,
              <span key="exp" className={theme.iconColor}>{a.experience}</span>,
              <StatusBadge key="status" status={a.status} theme={theme} />,
              <div key="actions" className="flex gap-1">
                <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
                <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Mail size={12} className={theme.iconColor} /></button>
              </div>
            ])}
            theme={theme}
          />
        </div>
      )}

      {tab === 'Interviews' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <StatCard icon={Calendar} label="Scheduled This Week" value={4} color="bg-blue-500" theme={theme} />
            <StatCard icon={CheckCircle} label="Completed" value={6} color="bg-emerald-500" theme={theme} />
            <StatCard icon={Clock} label="Pending Feedback" value={2} color="bg-amber-500" theme={theme} />
          </div>
          {[
            { name: 'Vikram Mehta', position: 'Lab Assistant', date: '12-Feb-2026', time: '10:00 AM', panel: 'Dr. Rajesh Kumar, Mr. Amit Verma', status: 'Scheduled' },
            { name: 'Sanjay Mishra', position: 'TGT English', date: '13-Feb-2026', time: '11:30 AM', panel: 'Ms. Priya Sharma, Principal', status: 'Scheduled' },
            { name: 'Ravi Shankar', position: 'PGT Mathematics', date: '10-Feb-2026', time: '2:00 PM', panel: 'Dr. Rajesh Kumar, VP', status: 'Completed' },
            { name: 'Anita Rao', position: 'PGT Mathematics', date: '14-Feb-2026', time: '10:00 AM', panel: 'Dr. Rajesh Kumar, VP', status: 'Scheduled' },
          ].map((iv, i) => (
            <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className={`text-sm font-bold ${theme.highlight}`}>{iv.name}</p>
                  <p className={`text-xs ${theme.iconColor}`}>Position: {iv.position}</p>
                </div>
                <StatusBadge status={iv.status === 'Completed' ? 'Active' : 'Pending'} theme={theme} />
              </div>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <CalendarDays size={12} className={theme.iconColor} />
                  <span className={`text-xs ${theme.iconColor}`}>{iv.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={12} className={theme.iconColor} />
                  <span className={`text-xs ${theme.iconColor}`}>{iv.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={12} className={theme.iconColor} />
                  <span className={`text-xs ${theme.iconColor}`}>Panel: {iv.panel}</span>
                </div>
              </div>
              {iv.status === 'Completed' && (
                <button className={`mt-3 px-3 py-1.5 rounded-xl text-xs font-bold ${theme.secondaryBg} ${theme.highlight}`}>View Feedback</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── LEAVE MANAGEMENT MODULE ───────────────────────
function LeaveManagementModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Pending');
  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Leave Management</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Clock} label="Pending Requests" value={5} color="bg-amber-500" theme={theme} />
        <StatCard icon={CheckCircle} label="Approved Today" value={3} color="bg-emerald-500" theme={theme} />
        <StatCard icon={Calendar} label="On Leave Now" value={8} color="bg-blue-500" theme={theme} />
        <StatCard icon={BarChart3} label="Avg Leave Balance" value="12 days" color="bg-purple-500" theme={theme} />
      </div>
      <TabBar tabs={['Pending', 'Approved', 'Rejected', 'Leave Balance']} active={tab} onChange={setTab} theme={theme} />

      {tab === 'Pending' && (
        <div className="space-y-3">
          {mockLeaveRequests.map((lr, i) => (
            <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className={`text-sm font-bold ${theme.highlight}`}>{lr.name}</p>
                  <p className={`text-xs ${theme.iconColor}`}>{lr.dept}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                  lr.type === 'Casual Leave' ? 'bg-blue-100 text-blue-700' :
                  lr.type === 'Sick Leave' ? 'bg-red-100 text-red-700' :
                  lr.type === 'Earned Leave' ? 'bg-emerald-100 text-emerald-700' :
                  'bg-purple-100 text-purple-700'
                }`}>{lr.type}</span>
              </div>
              <div className="flex items-center gap-4 mb-2">
                <div className="flex items-center gap-1">
                  <CalendarDays size={12} className={theme.iconColor} />
                  <span className={`text-xs ${theme.iconColor}`}>{lr.from} to {lr.to}</span>
                </div>
                <span className={`text-xs font-bold ${theme.highlight}`}>{lr.days} day{lr.days > 1 ? 's' : ''}</span>
              </div>
              <p className={`text-xs ${theme.iconColor} mb-3`}>Reason: {lr.reason}</p>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-xl bg-emerald-500 text-white text-xs font-bold flex items-center gap-1"><Check size={10} /> Approve</button>
                <button className="px-3 py-1.5 rounded-xl bg-red-500 text-white text-xs font-bold flex items-center gap-1"><X size={10} /> Reject</button>
                <button className={`px-3 py-1.5 rounded-xl border ${theme.border} text-xs font-bold ${theme.highlight}`}>View History</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'Approved' && (
        <div className="space-y-3">
          {[
            { name: 'Mr. Vijay Patil', type: 'Casual Leave', from: '05-Feb-2026', to: '06-Feb-2026', days: 2, approvedBy: 'HR Manager', dept: 'Teaching' },
            { name: 'Ms. Asha Rani', type: 'Sick Leave', from: '03-Feb-2026', to: '04-Feb-2026', days: 2, approvedBy: 'HR Manager', dept: 'Teaching' },
            { name: 'Mr. Prakash Jain', type: 'Earned Leave', from: '01-Feb-2026', to: '07-Feb-2026', days: 5, approvedBy: 'Principal', dept: 'Admin' },
          ].map((lr, i) => (
            <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex items-center justify-between`}>
              <div>
                <p className={`text-sm font-bold ${theme.highlight}`}>{lr.name}</p>
                <p className={`text-xs ${theme.iconColor}`}>{lr.dept} | {lr.type} | {lr.from} to {lr.to} ({lr.days} days)</p>
                <p className={`text-[10px] ${theme.iconColor} mt-1`}>Approved by: {lr.approvedBy}</p>
              </div>
              <StatusBadge status="Approved" theme={theme} />
            </div>
          ))}
        </div>
      )}

      {tab === 'Rejected' && (
        <div className="space-y-3">
          {[
            { name: 'Mr. Mohan Das', type: 'Casual Leave', from: '08-Feb-2026', to: '10-Feb-2026', days: 3, reason: 'Short staffing during exams', dept: 'Transport' },
            { name: 'Ms. Sneha Roy', type: 'Earned Leave', from: '09-Feb-2026', to: '15-Feb-2026', days: 5, reason: 'Already on notice period, EL not applicable', dept: 'Teaching' },
          ].map((lr, i) => (
            <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex items-center justify-between`}>
              <div>
                <p className={`text-sm font-bold ${theme.highlight}`}>{lr.name}</p>
                <p className={`text-xs ${theme.iconColor}`}>{lr.dept} | {lr.type} | {lr.from} to {lr.to} ({lr.days} days)</p>
                <p className={`text-[10px] text-red-500 mt-1`}>Rejection reason: {lr.reason}</p>
              </div>
              <StatusBadge status="Rejected" theme={theme} />
            </div>
          ))}
        </div>
      )}

      {tab === 'Leave Balance' && (
        <DataTable
          headers={['Employee', 'CL Balance', 'SL Balance', 'EL Balance', 'Total Used', 'Total Remaining']}
          rows={mockLeaveBalance.map(lb => [
            <span key="name" className={`font-bold ${theme.highlight}`}>{lb.name}</span>,
            <span key="cl" className={theme.iconColor}>{lb.cl}</span>,
            <span key="sl" className={theme.iconColor}>{lb.sl}</span>,
            <span key="el" className={theme.iconColor}>{lb.el}</span>,
            <span key="used" className={`font-bold ${theme.highlight}`}>{lb.used}</span>,
            <span key="rem" className={`font-bold ${lb.remaining < 0 ? 'text-red-500' : 'text-emerald-600'}`}>{lb.remaining}</span>,
          ])}
          theme={theme}
        />
      )}
    </div>
  );
}

// ─── PAYROLL MODULE ────────────────────────────────
function PayrollModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Overview');
  const [selectedMonth, setSelectedMonth] = useState('February 2026');
  const [selectedDept, setSelectedDept] = useState('All');

  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Payroll Management</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Banknote} label="Total Monthly Payroll" value="₹18,45,000" color="bg-blue-500" theme={theme} />
        <StatCard icon={CheckCircle} label="Processed" value={138} color="bg-emerald-500" theme={theme} />
        <StatCard icon={Clock} label="Pending" value={4} color="bg-amber-500" theme={theme} />
        <StatCard icon={TrendingUp} label="Deductions" value="₹2,15,000" color="bg-red-500" theme={theme} />
      </div>
      <TabBar tabs={['Overview', 'Process Payroll', 'Payslips', 'Deductions']} active={tab} onChange={setTab} theme={theme} />

      {tab === 'Overview' && (
        <div className="space-y-4">
          <h3 className={`text-sm font-bold ${theme.highlight}`}>Department-wise Salary Breakdown</h3>
          <DataTable
            headers={['Department', 'Employees', 'Total Basic', 'Total HRA', 'Total DA', 'Total Deductions', 'Net Payable']}
            rows={[
              { dept: 'Teaching', count: 89, basic: '₹32,50,000', hra: '₹13,00,000', da: '₹6,50,000', deductions: '₹5,80,000', net: '₹46,20,000' },
              { dept: 'Admin', count: 23, basic: '₹6,90,000', hra: '₹2,76,000', da: '₹1,38,000', deductions: '₹1,24,000', net: '₹9,80,000' },
              { dept: 'Transport', count: 18, basic: '₹4,50,000', hra: '₹1,80,000', da: '₹90,000', deductions: '₹81,000', net: '₹6,39,000' },
              { dept: 'IT & Lab', count: 8, basic: '₹1,76,000', hra: '₹70,400', da: '₹35,200', deductions: '₹31,600', net: '₹2,50,000' },
              { dept: 'Security', count: 4, basic: '₹80,000', hra: '₹32,000', da: '₹16,000', deductions: '₹14,400', net: '₹1,13,600' },
            ].map(d => [
              <span key="dept" className={`font-bold ${theme.highlight}`}>{d.dept}</span>,
              <span key="count" className={`font-bold ${theme.highlight}`}>{d.count}</span>,
              <span key="basic" className={theme.iconColor}>{d.basic}</span>,
              <span key="hra" className={theme.iconColor}>{d.hra}</span>,
              <span key="da" className={theme.iconColor}>{d.da}</span>,
              <span key="ded" className="text-red-500 font-bold">{d.deductions}</span>,
              <span key="net" className="text-emerald-600 font-bold">{d.net}</span>,
            ])}
            theme={theme}
          />
        </div>
      )}

      {tab === 'Process Payroll' && (
        <div className="space-y-4">
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Process Monthly Payroll</h3>
            <div className="flex items-center gap-4 mb-4">
              <div>
                <label className={`text-xs ${theme.iconColor} block mb-1`}>Select Month</label>
                <select
                  value={selectedMonth}
                  onChange={e => setSelectedMonth(e.target.value)}
                  className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight}`}
                >
                  <option>February 2026</option>
                  <option>January 2026</option>
                  <option>December 2025</option>
                </select>
              </div>
              <div>
                <label className={`text-xs ${theme.iconColor} block mb-1`}>Department</label>
                <select
                  value={selectedDept}
                  onChange={e => setSelectedDept(e.target.value)}
                  className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight}`}
                >
                  <option value="All">All Departments</option>
                  <option>Teaching</option>
                  <option>Admin</option>
                  <option>Transport</option>
                  <option>IT & Lab</option>
                  <option>Security</option>
                </select>
              </div>
              <div className="flex-1" />
              <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1 self-end`}><Banknote size={14} /> Process All</button>
            </div>
          </div>

          <h3 className={`text-sm font-bold ${theme.highlight}`}>Pending Payroll ({selectedMonth})</h3>
          {[
            { name: 'Mrs. Sunita Patel', dept: 'Teaching', reason: 'LOP deduction pending — 2 days absent without leave', amount: '₹40,000' },
            { name: 'Mr. Suresh Nair', dept: 'IT & Lab', reason: 'Notice period — final settlement pending', amount: '₹31,400' },
            { name: 'Ms. Kavita Singh', dept: 'Teaching', reason: 'Maternity leave adjustment pending', amount: '₹45,600' },
            { name: 'Mr. Deepak Joshi', dept: 'Security', reason: 'Overtime calculation pending — 12 extra hours', amount: '₹28,800' },
          ].map((p, i) => (
            <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex items-center justify-between`}>
              <div>
                <p className={`text-sm font-bold ${theme.highlight}`}>{p.name}</p>
                <p className={`text-xs ${theme.iconColor}`}>{p.dept} | Estimated: {p.amount}</p>
                <p className={`text-[10px] text-amber-600 mt-1`}>{p.reason}</p>
              </div>
              <div className="flex gap-2">
                <button className={`px-3 py-1.5 rounded-xl text-xs font-bold ${theme.secondaryBg} ${theme.highlight}`}>Review</button>
                <button className="px-3 py-1.5 rounded-xl bg-emerald-500 text-white text-xs font-bold">Process</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'Payslips' && (
        <div className="space-y-4">
          <div className="flex gap-3">
            <SearchBar placeholder="Search employee payslip..." theme={theme} icon={Search} />
            <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Download size={12} /> Export All</button>
          </div>
          <DataTable
            headers={['Employee', 'Basic (₹)', 'HRA (₹)', 'DA (₹)', 'Deductions (₹)', 'Net Salary (₹)', 'Actions']}
            rows={mockPayslips.map(p => [
              <span key="name" className={`font-bold ${theme.highlight}`}>{p.name}</span>,
              <span key="basic" className={theme.iconColor}>{p.basic.toLocaleString()}</span>,
              <span key="hra" className={theme.iconColor}>{p.hra.toLocaleString()}</span>,
              <span key="da" className={theme.iconColor}>{p.da.toLocaleString()}</span>,
              <span key="ded" className="text-red-500 font-bold">{p.deductions.toLocaleString()}</span>,
              <span key="net" className="text-emerald-600 font-bold">₹{p.net.toLocaleString()}</span>,
              <div key="actions" className="flex gap-1">
                <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
                <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Download size={12} className={theme.iconColor} /></button>
                <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Printer size={12} className={theme.iconColor} /></button>
              </div>
            ])}
            theme={theme}
          />
        </div>
      )}

      {tab === 'Deductions' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={DollarSign} label="PF Deductions" value="₹1,08,000" color="bg-blue-500" theme={theme} />
            <StatCard icon={DollarSign} label="ESI Deductions" value="₹42,000" color="bg-indigo-500" theme={theme} />
            <StatCard icon={DollarSign} label="TDS" value="₹38,000" color="bg-purple-500" theme={theme} />
            <StatCard icon={DollarSign} label="Professional Tax" value="₹27,000" color="bg-orange-500" theme={theme} />
          </div>
          <DataTable
            headers={['Employee', 'PF (₹)', 'ESI (₹)', 'TDS (₹)', 'Prof. Tax (₹)', 'LOP (₹)', 'Total Deduction (₹)']}
            rows={[
              { name: 'Dr. Rajesh Kumar', pf: '5,400', esi: '2,100', tds: '3,500', pt: '200', lop: '0', total: '11,200' },
              { name: 'Ms. Priya Sharma', pf: '4,200', esi: '1,640', tds: '1,800', pt: '200', lop: '0', total: '7,840' },
              { name: 'Mr. Amit Verma', pf: '3,600', esi: '1,400', tds: '1,200', pt: '200', lop: '0', total: '6,400' },
              { name: 'Mrs. Sunita Patel', pf: '3,360', esi: '1,312', tds: '800', pt: '200', lop: '1,867', total: '7,539' },
              { name: 'Mr. Ramesh Gupta', pf: '3,000', esi: '1,170', tds: '500', pt: '150', lop: '0', total: '4,820' },
            ].map(d => [
              <span key="name" className={`font-bold ${theme.highlight}`}>{d.name}</span>,
              <span key="pf" className={theme.iconColor}>{d.pf}</span>,
              <span key="esi" className={theme.iconColor}>{d.esi}</span>,
              <span key="tds" className={theme.iconColor}>{d.tds}</span>,
              <span key="pt" className={theme.iconColor}>{d.pt}</span>,
              <span key="lop" className={d.lop !== '0' ? 'text-red-500 font-bold' : theme.iconColor}>{d.lop}</span>,
              <span key="total" className="text-red-500 font-bold">{d.total}</span>,
            ])}
            theme={theme}
          />
        </div>
      )}
    </div>
  );
}

// ─── ATTENDANCE MODULE ─────────────────────────────
function AttendanceModule({ theme }: { theme: Theme }) {
  const [selectedDate, setSelectedDate] = useState('2026-02-11');

  const statusColors: Record<string, string> = {
    present: 'bg-emerald-400',
    absent: 'bg-red-400',
    late: 'bg-amber-400',
    'half-day': 'bg-blue-400',
  };

  const statusLabels: Record<string, string> = {
    present: 'P',
    absent: 'A',
    late: 'L',
    'half-day': 'H',
  };

  const presentCount = mockAttendanceGrid.filter(a => a.status === 'present').length;
  const absentCount = mockAttendanceGrid.filter(a => a.status === 'absent').length;
  const lateCount = mockAttendanceGrid.filter(a => a.status === 'late').length;
  const halfDayCount = mockAttendanceGrid.filter(a => a.status === 'half-day').length;

  const departments = ['Teaching', 'Admin', 'Transport', 'IT & Lab', 'Security'];

  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Staff Attendance</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={UserCheck} label="Present" value={presentCount} color="bg-emerald-500" theme={theme} />
        <StatCard icon={XCircle} label="Absent" value={absentCount} color="bg-red-500" theme={theme} />
        <StatCard icon={Clock} label="Late" value={lateCount} color="bg-amber-500" theme={theme} />
        <StatCard icon={Calendar} label="Half Day" value={halfDayCount} color="bg-blue-500" theme={theme} />
      </div>

      {/* Date Selector */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex items-center gap-4`}>
        <label className={`text-xs font-bold ${theme.highlight}`}>Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
          className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight}`}
        />
        <div className="flex-1" />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
            <span className={`text-xs ${theme.iconColor}`}>Present</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <span className={`text-xs ${theme.iconColor}`}>Absent</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <span className={`text-xs ${theme.iconColor}`}>Late</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-blue-400" />
            <span className={`text-xs ${theme.iconColor}`}>Half Day</span>
          </div>
        </div>
      </div>

      {/* Attendance Grid */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Staff Attendance Grid</h3>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {mockAttendanceGrid.map((a, i) => (
            <div key={i} className={`p-2 rounded-xl ${theme.accentBg} text-center`}>
              <div className={`w-8 h-8 rounded-full ${statusColors[a.status]} mx-auto mb-1 flex items-center justify-center text-[10px] font-bold text-white`}>
                {statusLabels[a.status]}
              </div>
              <p className={`text-[10px] font-bold ${theme.highlight} truncate`}>{a.name.split(' ').slice(-1)[0]}</p>
              <p className={`text-[8px] ${theme.iconColor}`}>{a.dept}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Department-wise Summary */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Department-wise Attendance Summary</h3>
        <DataTable
          headers={['Department', 'Total', 'Present', 'Absent', 'Late', 'Half Day', 'Attendance %']}
          rows={departments.map(dept => {
            const deptStaff = mockAttendanceGrid.filter(a => a.dept === dept);
            const p = deptStaff.filter(a => a.status === 'present').length;
            const ab = deptStaff.filter(a => a.status === 'absent').length;
            const l = deptStaff.filter(a => a.status === 'late').length;
            const h = deptStaff.filter(a => a.status === 'half-day').length;
            const pct = deptStaff.length > 0 ? Math.round(((p + l + h) / deptStaff.length) * 100) : 0;
            return [
              <span key="dept" className={`font-bold ${theme.highlight}`}>{dept}</span>,
              <span key="total" className={`font-bold ${theme.highlight}`}>{deptStaff.length}</span>,
              <span key="p" className="text-emerald-600 font-bold">{p}</span>,
              <span key="a" className={ab > 0 ? 'text-red-500 font-bold' : theme.iconColor}>{ab}</span>,
              <span key="l" className={l > 0 ? 'text-amber-600 font-bold' : theme.iconColor}>{l}</span>,
              <span key="h" className={h > 0 ? 'text-blue-600 font-bold' : theme.iconColor}>{h}</span>,
              <span key="pct" className={`font-bold ${pct >= 90 ? 'text-emerald-600' : pct >= 75 ? 'text-amber-600' : 'text-red-500'}`}>{pct}%</span>,
            ];
          })}
          theme={theme}
        />
      </div>
    </div>
  );
}

// ─── DOCUMENTS MODULE ──────────────────────────────
function DocumentsModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Templates');
  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>HR Documents</h1>
      <TabBar tabs={['Templates', 'Generated', 'Employee Docs']} active={tab} onChange={setTab} theme={theme} />

      {tab === 'Templates' && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { title: 'Appointment Letter', desc: 'Official job offer and terms of employment', icon: FileCheck, color: 'bg-blue-500' },
            { title: 'Experience Letter', desc: 'Work experience confirmation for ex-employees', icon: Award, color: 'bg-emerald-500' },
            { title: 'Salary Certificate', desc: 'Salary details for loan or visa processing', icon: Banknote, color: 'bg-indigo-500' },
            { title: 'Relieving Letter', desc: 'Confirmation of employment termination', icon: FileText, color: 'bg-purple-500' },
            { title: 'Warning Letter', desc: 'Formal warning for policy violation', icon: AlertTriangle, color: 'bg-red-500' },
            { title: 'Appreciation Letter', desc: 'Recognition for outstanding performance', icon: Star, color: 'bg-amber-500' },
          ].map((t, i) => (
            <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 hover:shadow-md transition-all cursor-pointer`}>
              <div className={`w-10 h-10 rounded-xl ${t.color} flex items-center justify-center text-white mb-3`}>
                <t.icon size={18} />
              </div>
              <h4 className={`text-sm font-bold ${theme.highlight} mb-1`}>{t.title}</h4>
              <p className={`text-xs ${theme.iconColor} mb-3`}>{t.desc}</p>
              <button className={`text-xs ${theme.primaryText} font-bold flex items-center gap-1`}><FilePlus size={12} /> Use Template</button>
            </div>
          ))}
        </div>
      )}

      {tab === 'Generated' && (
        <div className="space-y-4">
          <div className="flex gap-3">
            <SearchBar placeholder="Search generated documents..." theme={theme} icon={Search} />
            <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Filter size={12} /> Filter</button>
          </div>
          <DataTable
            headers={['Document', 'Employee', 'Type', 'Generated On', 'Generated By', 'Actions']}
            rows={[
              { doc: 'APT-2026-001', emp: 'Mrs. Sunita Patel', type: 'Appointment Letter', date: '10-Jan-2026', by: 'HR Manager' },
              { doc: 'SAL-2026-015', emp: 'Dr. Rajesh Kumar', type: 'Salary Certificate', date: '05-Feb-2026', by: 'HR Manager' },
              { doc: 'EXP-2026-003', emp: 'Mr. Suresh Nair', type: 'Experience Letter', date: '08-Feb-2026', by: 'HR Manager' },
              { doc: 'REL-2026-001', emp: 'Mr. Suresh Nair', type: 'Relieving Letter', date: '08-Feb-2026', by: 'HR Manager' },
              { doc: 'APR-2026-002', emp: 'Ms. Priya Sharma', type: 'Appreciation Letter', date: '01-Feb-2026', by: 'Principal' },
              { doc: 'WRN-2026-001', emp: 'Mr. Mohan Das', type: 'Warning Letter', date: '28-Jan-2026', by: 'HR Manager' },
            ].map(d => [
              <span key="doc" className={`font-mono text-xs ${theme.primaryText}`}>{d.doc}</span>,
              <span key="emp" className={`font-bold ${theme.highlight}`}>{d.emp}</span>,
              <span key="type" className={theme.iconColor}>{d.type}</span>,
              <span key="date" className={theme.iconColor}>{d.date}</span>,
              <span key="by" className={theme.iconColor}>{d.by}</span>,
              <div key="actions" className="flex gap-1">
                <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
                <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Download size={12} className={theme.iconColor} /></button>
                <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Printer size={12} className={theme.iconColor} /></button>
              </div>
            ])}
            theme={theme}
          />
        </div>
      )}

      {tab === 'Employee Docs' && (
        <div className="space-y-4">
          <div className="flex gap-3">
            <SearchBar placeholder="Search employee to view documents..." theme={theme} icon={Search} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Dr. Rajesh Kumar', id: 'EMP001', docs: ['Aadhar Card', 'PAN Card', 'Degree Certificate', 'Experience Letters (2)', 'Photo'], uploaded: 5 },
              { name: 'Ms. Priya Sharma', id: 'EMP002', docs: ['Aadhar Card', 'PAN Card', 'B.Ed Certificate', 'Passport'], uploaded: 4 },
              { name: 'Mr. Amit Verma', id: 'EMP003', docs: ['Aadhar Card', 'PAN Card', 'MBA Certificate'], uploaded: 3 },
              { name: 'Mrs. Sunita Patel', id: 'EMP004', docs: ['Aadhar Card', 'PAN Card', 'B.Sc Certificate', 'B.Ed Certificate'], uploaded: 4 },
            ].map((emp, i) => (
              <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className={`text-sm font-bold ${theme.highlight}`}>{emp.name}</p>
                    <p className={`text-xs font-mono ${theme.primaryText}`}>{emp.id}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold bg-blue-100 text-blue-700`}>{emp.uploaded} docs</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {emp.docs.map((d, di) => (
                    <span key={di} className={`text-[10px] px-2 py-1 rounded-lg ${theme.secondaryBg} ${theme.iconColor} font-bold`}>{d}</span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button className={`px-3 py-1.5 rounded-xl text-xs font-bold ${theme.secondaryBg} ${theme.highlight} flex items-center gap-1`}><Eye size={10} /> View All</button>
                  <button className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${theme.border} ${theme.primaryText} flex items-center gap-1`}><Plus size={10} /> Upload</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SETTINGS MODULE ───────────────────────────────
function SettingsModule({ theme }: { theme: Theme }) {
  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>HR Settings & Policies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: 'Leave Policy', desc: 'Configure CL, SL, EL entitlements, carry-forward rules, and leave year cycle', icon: Calendar, color: 'bg-blue-500' },
          { title: 'Payroll Rules', desc: 'Basic pay structure, HRA/DA percentages, PF/ESI rates, TDS slabs', icon: Banknote, color: 'bg-emerald-500' },
          { title: 'Attendance Rules', desc: 'Working hours, late-mark threshold, half-day policy, biometric integration', icon: ClipboardCheck, color: 'bg-indigo-500' },
          { title: 'Probation Policy', desc: 'Probation period duration, evaluation criteria, confirmation process', icon: BadgeCheck, color: 'bg-purple-500' },
          { title: 'Exit Policy', desc: 'Notice period rules, full & final settlement, exit interview process', icon: ArrowRight, color: 'bg-red-500' },
          { title: 'Holiday Calendar', desc: 'Public holidays, restricted holidays, compensatory off rules for the year', icon: CalendarDays, color: 'bg-amber-500' },
        ].map((c, i) => (
          <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition-all`}>
            <div className={`w-10 h-10 rounded-xl ${c.color} flex items-center justify-center text-white shrink-0`}>
              <c.icon size={18} />
            </div>
            <div className="flex-1">
              <p className={`text-sm font-bold ${theme.highlight}`}>{c.title}</p>
              <p className={`text-xs ${theme.iconColor}`}>{c.desc}</p>
            </div>
            <button className={`px-3 py-1.5 rounded-xl text-xs font-bold ${theme.secondaryBg} ${theme.highlight} shrink-0`}>Configure</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── EXPORT ────────────────────────────────────────
export default function Page() {
  return (
    <BlueprintLayout>
      <HRManagerDashboard />
    </BlueprintLayout>
  );
}
