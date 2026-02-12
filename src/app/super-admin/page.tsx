'use client';

import React, { useState } from 'react';
import BlueprintLayout from '@/components/BlueprintLayout';
import { StatCard, TabBar, StatusBadge, SearchBar, DataTable, Toggle } from '@/components/shared';
import OnboardingWizard from '@/components/OnboardingWizard';
import StakeholderProfile from '@/components/StakeholderProfile';
import { type Theme } from '@/lib/themes';
import {
  Home, Building2, CreditCard, Users, Layers, UserPlus, Headphones, BarChart3, Settings, FileText,
  Search, Plus, Eye, Edit, Trash2, Check, X, ChevronDown, Download, Filter,
  Globe, Server, Shield, Bell, Clock, Activity, Zap, TrendingUp, AlertTriangle,
  Mail, Phone, Calendar, Star, Award, ArrowRight, RefreshCw, Database, Lock,
  ChevronRight, CheckCircle, XCircle, Briefcase, DollarSign, Hash, MapPin, User
} from 'lucide-react';

// ─── MOCK DATA ────────────────────────────────────────
const schools = [
  { id: 'SCH001', name: 'Delhi Public School, Ahmedabad', plan: 'Enterprise', students: 2400, staff: 120, status: 'Active', mrr: '₹1,50,000', since: 'Mar 2024', modules: 24 },
  { id: 'SCH002', name: 'Navrachana Vidyani, Vadodara', plan: 'Professional', students: 1800, staff: 85, status: 'Active', mrr: '₹95,000', since: 'Jun 2024', modules: 18 },
  { id: 'SCH003', name: 'Zydus School, Gandhinagar', plan: 'Starter', students: 600, staff: 32, status: 'Active', mrr: '₹35,000', since: 'Sep 2024', modules: 12 },
  { id: 'SCH004', name: 'Udgam School for Children', plan: 'Professional', students: 1500, staff: 72, status: 'Active', mrr: '₹85,000', since: 'Jan 2025', modules: 18 },
  { id: 'SCH005', name: 'Anand Niketan, Satellite', plan: 'Enterprise', students: 3200, staff: 155, status: 'Active', mrr: '₹1,80,000', since: 'Nov 2024', modules: 27 },
  { id: 'SCH006', name: 'SAL International, SG Highway', plan: 'Professional', students: 900, staff: 48, status: 'Trial', mrr: '₹0', since: 'Feb 2026', modules: 18 },
  { id: 'SCH007', name: 'Calorx Olive, Ahmedabad', plan: 'Starter', students: 450, staff: 25, status: 'Churned', mrr: '₹0', since: 'Apr 2024', modules: 0 },
];

const plans = [
  { id: 'starter', name: 'Starter', price: '₹25,000/yr', modules: 12, maxStudents: 1000, maxStaff: 50, schools: 2, color: 'bg-blue-500' },
  { id: 'professional', name: 'Professional', price: '₹75,000/yr', modules: 18, maxStudents: 3000, maxStaff: 150, schools: 3, color: 'bg-purple-500' },
  { id: 'enterprise', name: 'Enterprise', price: '₹1,50,000/yr', modules: 27, maxStudents: 'Unlimited', maxStaff: 'Unlimited', schools: 2, color: 'bg-amber-500' },
];

const allModules = [
  { name: 'Dashboard', category: 'Core', plans: ['starter', 'professional', 'enterprise'] },
  { name: 'Student Management', category: 'Core', plans: ['starter', 'professional', 'enterprise'] },
  { name: 'Staff Management', category: 'Core', plans: ['starter', 'professional', 'enterprise'] },
  { name: 'Fee Management', category: 'Core', plans: ['starter', 'professional', 'enterprise'] },
  { name: 'Attendance', category: 'Core', plans: ['starter', 'professional', 'enterprise'] },
  { name: 'Timetable', category: 'Core', plans: ['starter', 'professional', 'enterprise'] },
  { name: 'Enquiry/Admission', category: 'Operations', plans: ['starter', 'professional', 'enterprise'] },
  { name: 'Communication', category: 'Operations', plans: ['starter', 'professional', 'enterprise'] },
  { name: 'Transport', category: 'Operations', plans: ['professional', 'enterprise'] },
  { name: 'Visitor Management', category: 'Operations', plans: ['professional', 'enterprise'] },
  { name: 'Library', category: 'Academic', plans: ['professional', 'enterprise'] },
  { name: 'Examination', category: 'Academic', plans: ['professional', 'enterprise'] },
  { name: 'Homework/Assignments', category: 'Academic', plans: ['starter', 'professional', 'enterprise'] },
  { name: 'Report Cards', category: 'Academic', plans: ['professional', 'enterprise'] },
  { name: 'HR & Payroll', category: 'HR', plans: ['professional', 'enterprise'] },
  { name: 'Leave Management', category: 'HR', plans: ['professional', 'enterprise'] },
  { name: 'Performance (SQAAF)', category: 'Quality', plans: ['enterprise'] },
  { name: 'Certificates', category: 'Operations', plans: ['professional', 'enterprise'] },
  { name: 'Inventory', category: 'Operations', plans: ['enterprise'] },
  { name: 'Hostel Management', category: 'Operations', plans: ['enterprise'] },
  { name: 'Alumni Management', category: 'Engagement', plans: ['enterprise'] },
  { name: 'Parent Portal', category: 'Engagement', plans: ['starter', 'professional', 'enterprise'] },
  { name: 'Student Portal', category: 'Engagement', plans: ['starter', 'professional', 'enterprise'] },
  { name: 'Online Payment', category: 'Core', plans: ['starter', 'professional', 'enterprise'] },
  { name: 'Advanced Analytics', category: 'Intelligence', plans: ['enterprise'] },
  { name: 'Custom Reports', category: 'Intelligence', plans: ['enterprise'] },
  { name: 'API Access', category: 'Integration', plans: ['enterprise'] },
];

const onboardingPipeline = [
  { school: 'Bright Future Academy', stage: 'Demo Done', contact: 'Ramesh Patel', phone: '98765 00001', deal: '₹95,000', days: 3 },
  { school: 'Greenfield International', stage: 'Proposal Sent', contact: 'Meena Shah', phone: '98765 00002', deal: '₹1,50,000', days: 7 },
  { school: 'Sunshine Public School', stage: 'Data Migration', contact: 'Amit Kumar', phone: '98765 00003', deal: '₹75,000', days: 14 },
  { school: 'Heritage School, Rajkot', stage: 'Training', contact: 'Priya Desai', phone: '98765 00004', deal: '₹85,000', days: 5 },
  { school: 'Vibgyor High', stage: 'Go-Live', contact: 'Suresh Nair', phone: '98765 00005', deal: '₹1,20,000', days: 2 },
];

const supportTickets = [
  { id: 'TKT-001', school: 'Delhi Public School', subject: 'Fee receipt format change', priority: 'Normal', status: 'Open', age: '2h', assignee: 'Farheen' },
  { id: 'TKT-002', school: 'Navrachana Vidyani', subject: 'Transport GPS not updating', priority: 'Urgent', status: 'In Progress', assignee: 'Dhavalbhai', age: '4h' },
  { id: 'TKT-003', school: 'Udgam School', subject: 'Bulk SMS not delivering', priority: 'High', status: 'Open', age: '1d', assignee: 'Unassigned' },
  { id: 'TKT-004', school: 'Anand Niketan', subject: 'Custom report builder query', priority: 'Normal', status: 'Resolved', age: '3d', assignee: 'Kunjal' },
  { id: 'TKT-005', school: 'Zydus School', subject: 'Attendance biometric sync issue', priority: 'High', status: 'Open', age: '5h', assignee: 'Dhavalbhai' },
];

const auditLogs = [
  { time: '14:32', user: 'Piush Thakker', action: 'Updated plan for SCH002', target: 'Navrachana Vidyani', ip: '103.21.xx.xx' },
  { time: '13:15', user: 'System', action: 'Auto-backup completed', target: 'All Schools', ip: '-' },
  { time: '12:48', user: 'Farheen', action: 'Resolved ticket TKT-004', target: 'Anand Niketan', ip: '103.21.xx.xx' },
  { time: '11:30', user: 'Dhavalbhai', action: 'Deployed hotfix v2.4.1', target: 'Platform', ip: '103.21.xx.xx' },
  { time: '10:05', user: 'Piush Thakker', action: 'Onboarded new school SCH006', target: 'SAL International', ip: '103.21.xx.xx' },
  { time: '09:22', user: 'System', action: 'SSL certificate renewed', target: 'saaras.ai', ip: '-' },
];

// ─── MODULES SIDEBAR ──────────────────────────────────
const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'schools', label: 'Schools', icon: Building2 },
  { id: 'plans', label: 'Plans & Billing', icon: CreditCard },
  { id: 'users', label: 'User Management', icon: Users },
  { id: 'modules', label: 'Module Config', icon: Layers },
  { id: 'onboarding', label: 'Onboarding', icon: UserPlus },
  { id: 'support', label: 'Support Tickets', icon: Headphones },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'config', label: 'System Config', icon: Settings },
  { id: 'audit', label: 'Audit Logs', icon: FileText },
];

// ─── DASHBOARD VIEW ────────────────────────────────────
function DashboardView({ theme, setActiveModule, onStartWizard }: { theme: Theme; setActiveModule: (m: string) => void; onStartWizard: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-xl font-bold ${theme.highlight}`}>Platform Overview</h2>
          <p className={`text-xs ${theme.iconColor} mt-1`}>Saaras.ai — School ERP SaaS Platform</p>
        </div>
        <button onClick={() => setActiveModule('profile')} title="My Profile" className={`w-9 h-9 rounded-full ${theme.primary} text-white flex items-center justify-center text-xs font-bold hover:opacity-90 transition-opacity`}>PT</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Building2} label="Active Schools" value="6" color="bg-blue-500" sub="+1 this month" theme={theme} />
        <StatCard icon={Users} label="Total Users" value="12,480" color="bg-emerald-500" sub="Across all schools" theme={theme} />
        <StatCard icon={DollarSign} label="MRR" value="₹5.45L" color="bg-purple-500" sub="+12% vs last month" theme={theme} />
        <StatCard icon={Activity} label="System Uptime" value="99.97%" color="bg-amber-500" theme={theme} />
      </div>

      {/* Quick Actions + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Quick Actions */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Quick Actions</h3>
          <div className="space-y-2">
            {[
              { label: 'Onboard New School', icon: Plus, action: 'wizard' },
              { label: 'View Support Tickets', icon: Headphones, action: 'support' },
              { label: 'Platform Analytics', icon: BarChart3, action: 'analytics' },
              { label: 'System Health Check', icon: Activity, action: 'config' },
            ].map(a => (
              <button key={a.label} onClick={() => a.action === 'wizard' ? onStartWizard() : setActiveModule(a.action)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium ${theme.secondaryBg} ${theme.highlight} ${theme.buttonHover} transition-all`}>
                <a.icon size={14} className={theme.primaryText} />
                {a.label}
                <ArrowRight size={12} className={`ml-auto ${theme.iconColor}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Schools by Plan */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Schools by Plan</h3>
          <div className="space-y-3">
            {plans.map(p => {
              const count = schools.filter(s => s.plan === p.name && s.status === 'Active').length;
              return (
                <div key={p.id} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg ${p.color} text-white flex items-center justify-center text-xs font-bold`}>{count}</div>
                  <div className="flex-1">
                    <p className={`text-xs font-bold ${theme.highlight}`}>{p.name}</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>{p.price} · {p.modules} modules</p>
                  </div>
                </div>
              );
            })}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-400 text-white flex items-center justify-center text-xs font-bold">1</div>
              <div className="flex-1">
                <p className={`text-xs font-bold ${theme.highlight}`}>Trial</p>
                <p className={`text-[10px] ${theme.iconColor}`}>14-day free trial</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Recent Activity</h3>
          <div className="space-y-3">
            {auditLogs.slice(0, 5).map((log, i) => (
              <div key={i} className="flex gap-3">
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${log.user === 'System' ? 'bg-blue-400' : 'bg-emerald-400'}`} />
                <div>
                  <p className={`text-xs ${theme.highlight}`}>{log.action}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{log.user} · {log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Open Tickets */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className={`text-sm font-bold ${theme.highlight}`}>Open Support Tickets</h3>
          <button onClick={() => setActiveModule('support')} className={`text-xs ${theme.primaryText} font-bold`}>View All →</button>
        </div>
        <div className="space-y-2">
          {supportTickets.filter(t => t.status !== 'Resolved').map(t => (
            <div key={t.id} className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex items-center gap-3">
                <StatusBadge status={t.priority} theme={theme} />
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>{t.subject}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{t.school} · {t.age} ago</p>
                </div>
              </div>
              <span className={`text-[10px] ${theme.iconColor}`}>{t.assignee}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SCHOOLS VIEW ──────────────────────────────────────
function SchoolsView({ theme, onStartWizard }: { theme: Theme; onStartWizard: () => void }) {
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

// ─── PLANS & BILLING VIEW ──────────────────────────────
function PlansView({ theme }: { theme: Theme }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className={`text-lg font-bold ${theme.highlight}`}>Plans & Billing</h2>
        <p className={`text-xs ${theme.iconColor}`}>Manage subscription plans and pricing</p>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map(p => (
          <div key={p.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
            <div className={`w-10 h-10 rounded-xl ${p.color} text-white flex items-center justify-center mb-3`}>
              <Star size={18} />
            </div>
            <h3 className={`text-lg font-bold ${theme.highlight}`}>{p.name}</h3>
            <p className={`text-sm font-bold ${theme.primaryText} mt-1`}>{p.price}</p>
            <div className={`mt-4 space-y-2 text-xs ${theme.iconColor}`}>
              <p>✓ {p.modules} modules included</p>
              <p>✓ Up to {p.maxStudents} students</p>
              <p>✓ Up to {p.maxStaff} staff</p>
              <p>✓ Email + chat support</p>
              {p.id === 'enterprise' && <p>✓ Dedicated account manager</p>}
              {p.id === 'enterprise' && <p>✓ API access + custom reports</p>}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className={`text-xs font-bold ${theme.highlight}`}>{schools.filter(s => s.plan === p.name).length} schools</span>
              <button className={`text-xs ${theme.primaryText} font-bold`}>Edit →</button>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Summary */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Revenue Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-lg font-bold ${theme.highlight}`}>₹5.45L</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Current MRR</p>
          </div>
          <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-lg font-bold ${theme.highlight}`}>₹65.4L</p>
            <p className={`text-[10px] ${theme.iconColor}`}>ARR</p>
          </div>
          <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-lg font-bold text-emerald-600`}>+12%</p>
            <p className={`text-[10px] ${theme.iconColor}`}>MoM Growth</p>
          </div>
          <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-lg font-bold text-red-500`}>1</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Churned (Lifetime)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── USER MANAGEMENT VIEW ──────────────────────────────
function UsersView({ theme }: { theme: Theme }) {
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

// ─── MODULE CONFIG VIEW ────────────────────────────────
function ModulesConfigView({ theme }: { theme: Theme }) {
  const categories = [...new Set(allModules.map(m => m.category))];

  return (
    <div className="space-y-4">
      <div>
        <h2 className={`text-lg font-bold ${theme.highlight}`}>Module Configuration</h2>
        <p className={`text-xs ${theme.iconColor}`}>Configure which modules are available per plan</p>
      </div>

      {categories.map(cat => (
        <div key={cat} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>{cat}</h3>
          <div className="space-y-2">
            {allModules.filter(m => m.category === cat).map(mod => (
              <div key={mod.name} className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
                <span className={`text-xs font-medium ${theme.highlight}`}>{mod.name}</span>
                <div className="flex gap-4">
                  {plans.map(p => (
                    <label key={p.id} className="flex items-center gap-1.5">
                      <div className={`w-4 h-4 rounded border ${mod.plans.includes(p.id) ? `${p.color} border-transparent` : theme.border} flex items-center justify-center`}>
                        {mod.plans.includes(p.id) && <Check size={10} className="text-white" />}
                      </div>
                      <span className={`text-[10px] ${theme.iconColor}`}>{p.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── ONBOARDING PIPELINE VIEW ──────────────────────────
function OnboardingView({ theme, onStartWizard }: { theme: Theme; onStartWizard: () => void }) {
  const stages = ['Demo Done', 'Proposal Sent', 'Data Migration', 'Training', 'Go-Live'];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-bold ${theme.highlight}`}>School Onboarding Pipeline</h2>
          <p className={`text-xs ${theme.iconColor}`}>{onboardingPipeline.length} schools in pipeline</p>
        </div>
        <div className="flex gap-2">
          <button onClick={onStartWizard} className={`flex items-center gap-2 px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>
            <Plus size={14} /> Start Onboarding
          </button>
          <button className={`flex items-center gap-2 px-4 py-2 ${theme.secondaryBg} rounded-xl text-xs font-bold ${theme.highlight}`}>
            <Plus size={14} /> Add Lead
          </button>
        </div>
      </div>

      {/* Pipeline stages */}
      <div className="flex gap-1 overflow-x-auto pb-2">
        {stages.map((stage, i) => {
          const items = onboardingPipeline.filter(o => o.stage === stage);
          return (
            <div key={stage} className="flex-1 min-w-[200px]">
              <div className={`text-xs font-bold ${theme.highlight} mb-2 flex items-center gap-2`}>
                <span className={`w-5 h-5 rounded-full ${theme.primary} text-white flex items-center justify-center text-[10px]`}>{i + 1}</span>
                {stage}
                <span className={`text-[10px] ${theme.iconColor} ml-auto`}>{items.length}</span>
              </div>
              <div className="space-y-2">
                {items.map(item => (
                  <div key={item.school} className={`${theme.cardBg} rounded-xl border ${theme.border} p-3`}>
                    <p className={`text-xs font-bold ${theme.highlight}`}>{item.school}</p>
                    <p className={`text-[10px] ${theme.iconColor} mt-1`}>{item.contact} · {item.phone}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs font-bold ${theme.primaryText}`}>{item.deal}</span>
                      <span className={`text-[10px] ${theme.iconColor}`}>{item.days}d in stage</span>
                    </div>
                  </div>
                ))}
                {items.length === 0 && (
                  <div className={`p-4 rounded-xl border-2 border-dashed ${theme.border} text-center`}>
                    <p className={`text-[10px] ${theme.iconColor}`}>No schools</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pipeline Summary */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Pipeline Value</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-lg font-bold ${theme.highlight}`}>₹5.25L</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Total Pipeline</p>
          </div>
          <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-lg font-bold ${theme.highlight}`}>5</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Active Leads</p>
          </div>
          <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-lg font-bold text-emerald-600`}>₹1.20L</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Ready for Go-Live</p>
          </div>
          <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-lg font-bold ${theme.highlight}`}>6.2 days</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Avg. Stage Duration</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SUPPORT TICKETS VIEW ──────────────────────────────
function SupportView({ theme }: { theme: Theme }) {
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

// ─── ANALYTICS VIEW ────────────────────────────────────
function AnalyticsView({ theme }: { theme: Theme }) {
  const schoolMetrics = schools.filter(s => s.status === 'Active').map(s => ({
    name: s.name.split(',')[0],
    students: s.students,
    staff: s.staff,
    utilization: Math.round((s.students / (s.plan === 'Enterprise' ? 5000 : s.plan === 'Professional' ? 3000 : 1000)) * 100),
  }));

  return (
    <div className="space-y-4">
      <div>
        <h2 className={`text-lg font-bold ${theme.highlight}`}>Platform Analytics</h2>
        <p className={`text-xs ${theme.iconColor}`}>Cross-school insights and trends</p>
      </div>

      {/* Platform KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Building2} label="Active Schools" value="6" color="bg-blue-500" theme={theme} />
        <StatCard icon={TrendingUp} label="Avg NPS Score" value="72" color="bg-emerald-500" sub="Good" theme={theme} />
        <StatCard icon={Clock} label="Avg Response Time" value="2.4h" color="bg-amber-500" theme={theme} />
        <StatCard icon={RefreshCw} label="Feature Adoption" value="78%" color="bg-purple-500" theme={theme} />
      </div>

      {/* School Utilization */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>School Plan Utilization</h3>
        <div className="space-y-3">
          {schoolMetrics.map(s => (
            <div key={s.name} className="flex items-center gap-4">
              <span className={`text-xs font-bold ${theme.highlight} w-40 truncate`}>{s.name}</span>
              <div className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden">
                <div className={`h-full rounded-full ${s.utilization > 80 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(s.utilization, 100)}%` }} />
              </div>
              <span className={`text-xs font-bold ${s.utilization > 80 ? 'text-amber-600' : 'text-emerald-600'} w-12 text-right`}>{s.utilization}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Module Usage */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Top Modules by Usage</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {[
            { name: 'Fee Management', usage: '98%' },
            { name: 'Attendance', usage: '95%' },
            { name: 'Student Management', usage: '94%' },
            { name: 'Communication', usage: '88%' },
            { name: 'Timetable', usage: '82%' },
            { name: 'Transport', usage: '71%' },
          ].map(m => (
            <div key={m.name} className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-xs font-bold ${theme.highlight}`}>{m.name}</p>
              <p className={`text-lg font-bold ${theme.primaryText}`}>{m.usage}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SYSTEM CONFIG VIEW ────────────────────────────────
function SystemConfigView({ theme }: { theme: Theme }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className={`text-lg font-bold ${theme.highlight}`}>System Configuration</h2>
        <p className={`text-xs ${theme.iconColor}`}>Platform-wide settings and preferences</p>
      </div>

      {/* Config Sections */}
      {[
        { title: 'General', items: [
          { label: 'Platform Name', value: 'Saaras.ai', type: 'text' },
          { label: 'Support Email', value: 'support@saaras.ai', type: 'text' },
          { label: 'Default Timezone', value: 'Asia/Kolkata (IST)', type: 'text' },
          { label: 'Maintenance Mode', value: false, type: 'toggle' },
        ]},
        { title: 'Security', items: [
          { label: 'Two-Factor Authentication', value: true, type: 'toggle' },
          { label: 'Session Timeout', value: '30 minutes', type: 'text' },
          { label: 'Password Policy', value: 'Strong (8+ chars, mixed)', type: 'text' },
          { label: 'IP Whitelisting', value: false, type: 'toggle' },
        ]},
        { title: 'Notifications', items: [
          { label: 'Email Notifications', value: true, type: 'toggle' },
          { label: 'SMS Gateway', value: 'MSG91', type: 'text' },
          { label: 'WhatsApp Business API', value: true, type: 'toggle' },
          { label: 'Push Notifications', value: true, type: 'toggle' },
        ]},
        { title: 'Integrations', items: [
          { label: 'Payment Gateway', value: 'Razorpay', type: 'text' },
          { label: 'SMS Provider', value: 'MSG91', type: 'text' },
          { label: 'Cloud Storage', value: 'AWS S3', type: 'text' },
          { label: 'Email Service', value: 'Amazon SES', type: 'text' },
        ]},
      ].map(section => (
        <div key={section.title} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>{section.title}</h3>
          <div className="space-y-3">
            {section.items.map(item => (
              <div key={item.label} className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
                <span className={`text-xs font-medium ${theme.highlight}`}>{item.label}</span>
                {item.type === 'toggle' ? (
                  <Toggle on={item.value as boolean} onChange={() => {}} theme={theme} />
                ) : (
                  <span className={`text-xs ${theme.iconColor}`}>{item.value as string}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── AUDIT LOGS VIEW ───────────────────────────────────
function AuditLogsView({ theme }: { theme: Theme }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-bold ${theme.highlight}`}>Audit Logs</h2>
          <p className={`text-xs ${theme.iconColor}`}>Platform activity trail — Today</p>
        </div>
        <div className="flex gap-2">
          <button className={`flex items-center gap-2 px-3 py-2 ${theme.secondaryBg} rounded-xl text-xs font-medium ${theme.highlight}`}>
            <Filter size={12} /> Filter
          </button>
          <button className={`flex items-center gap-2 px-3 py-2 ${theme.secondaryBg} rounded-xl text-xs font-medium ${theme.highlight}`}>
            <Download size={12} /> Export
          </button>
        </div>
      </div>

      <DataTable
        headers={['Time', 'User', 'Action', 'Target', 'IP']}
        rows={auditLogs.map(log => [
          <span key="t" className={`text-xs font-mono ${theme.iconColor}`}>{log.time}</span>,
          <span key="u" className={`text-xs font-bold ${log.user === 'System' ? theme.primaryText : theme.highlight}`}>{log.user}</span>,
          <span key="a" className={`text-xs ${theme.highlight}`}>{log.action}</span>,
          <span key="tar" className={`text-xs ${theme.iconColor}`}>{log.target}</span>,
          <span key="ip" className={`text-xs font-mono ${theme.iconColor}`}>{log.ip}</span>,
        ])}
        theme={theme}
      />

      {/* System Events */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>System Events (Last 7 days)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-lg font-bold ${theme.highlight}`}>342</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Total Actions</p>
          </div>
          <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-lg font-bold ${theme.highlight}`}>5</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Active Admins</p>
          </div>
          <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-lg font-bold text-emerald-600`}>0</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Security Alerts</p>
          </div>
          <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-lg font-bold ${theme.highlight}`}>3</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Deployments</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────
function SuperAdminDashboard({ theme }: { theme?: Theme }) {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [showWizard, setShowWizard] = useState(false);
  if (!theme) return null;

  if (showWizard) {
    return (
      <div className="flex gap-4 -m-6">
        <div className="flex-1 p-6 overflow-y-auto">
          <OnboardingWizard theme={theme} onBack={() => setShowWizard(false)} />
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeModule) {
      case 'dashboard': return <DashboardView theme={theme} setActiveModule={setActiveModule} onStartWizard={() => setShowWizard(true)} />;
      case 'schools': return <SchoolsView theme={theme} onStartWizard={() => setShowWizard(true)} />;
      case 'plans': return <PlansView theme={theme} />;
      case 'users': return <UsersView theme={theme} />;
      case 'modules': return <ModulesConfigView theme={theme} />;
      case 'onboarding': return <OnboardingView theme={theme} onStartWizard={() => setShowWizard(true)} />;
      case 'support': return <SupportView theme={theme} />;
      case 'analytics': return <AnalyticsView theme={theme} />;
      case 'config': return <SystemConfigView theme={theme} />;
      case 'audit': return <AuditLogsView theme={theme} />;
      case 'profile': return <StakeholderProfile role="super-admin" theme={theme} />;
      default: return <DashboardView theme={theme} setActiveModule={setActiveModule} onStartWizard={() => setShowWizard(true)} />;
    }
  };

  return (
    <div className="flex gap-4 -m-6">
      {/* Module sidebar */}
      <div className={`w-48 ${theme.cardBg} border-r ${theme.border} min-h-screen p-2 space-y-0.5 shrink-0`}>
        <p className={`text-[10px] font-bold ${theme.iconColor} uppercase px-3 py-2`}>Platform Admin</p>
        {modules.map(m => (
          <button
            key={m.id}
            onClick={() => setActiveModule(m.id)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activeModule === m.id ? `${theme.primary} text-white` : `${theme.iconColor} ${theme.buttonHover}`
            }`}
          >
            <m.icon size={14} />
            {m.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <BlueprintLayout>
      <SuperAdminDashboard />
    </BlueprintLayout>
  );
}
