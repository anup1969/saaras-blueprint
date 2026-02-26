'use client';

import React, { useState } from 'react';
import BlueprintLayout from '@/components/BlueprintLayout';
import { StatCard, TabBar, StatusBadge, SearchBar, DataTable, Toggle } from '@/components/shared';
import OnboardingWizard from '@/components/OnboardingWizard';
import StakeholderProfile from '@/components/StakeholderProfile';
import TaskTrackerPanel from '@/components/TaskTrackerPanel';
import { ChatsView } from '@/components/ChatModule';
import { type Theme } from '@/lib/themes';
import {
  Home, Building2, CreditCard, Users, Layers, UserPlus, Headphones, BarChart3, Settings, FileText,
  Search, Plus, Eye, Edit, Trash2, Check, X, ChevronDown, Download, Filter,
  Globe, Server, Shield, Bell, Clock, Activity, Zap, TrendingUp, AlertTriangle,
  Mail, Phone, Calendar, Star, Award, ArrowRight, RefreshCw, Database, Lock,
  ChevronRight, CheckCircle, XCircle, Briefcase, DollarSign, Hash, MapPin, User, MessageSquare,
  PanelLeftClose, PanelLeftOpen, Handshake, Percent, IndianRupee,
  UserCog, HardDrive, Upload, ArrowDownToLine, Table2
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
  { id: 'resellers', label: 'Reseller Management', icon: Handshake },
  { id: 'am-assignment', label: 'AM Assignment', icon: UserCog },
  { id: 'data-migration', label: 'Data Migration', icon: HardDrive },
  { id: 'audit', label: 'Audit Logs', icon: FileText },
  { id: 'communication', label: 'Communication', icon: MessageSquare },
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

      {/* Task Tracker */}
      <TaskTrackerPanel theme={theme} role="super-admin" />
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

// ─── ANALYTICS MOCK DATA ───────────────────────────────
const analyticsSchools = [
  {
    id: 'AS01', name: 'Delhi Public School', city: 'Ahmedabad', plan: 'Pro' as const,
    activeUsers: 1240, healthScore: 95, lastActive: '2 min ago',
    sparkline: [30, 45, 38, 52, 60, 55, 68, 72, 65, 78, 80, 85],
    subscriptionStart: 'Apr 2024', subscriptionEnd: 'Mar 2026',
    dataBucket: { used: 2.4, total: 5 }, bandwidth: { used: 145, total: 200 },
    notifications: { sms: 3200, email: 8100, push: 1150 }, apiCalls: 245000,
    users: {
      parents: { registered: 850, active: 720, avgSessions: 2.3 },
      academicStaff: { registered: 78, active: 72, avgSessions: 4.1 },
      nonAcademicStaff: { registered: 64, active: 45, avgSessions: 1.8 },
      students: { registered: 1200, active: 890, avgSessions: 1.5 },
    },
    topModules: [
      { name: 'Attendance', actions: 45200 },
      { name: 'Fees & Payments', actions: 32100 },
      { name: 'Communication', actions: 28400 },
      { name: 'Timetable', actions: 22800 },
      { name: 'Homework', actions: 18900 },
    ],
    topEmployees: [
      { name: 'Rajesh Kumar', role: 'Vice Principal', sessions: 142, lastActive: '5 min ago', usageMins: 285 },
      { name: 'Priya Sharma', role: 'Academic Coord.', sessions: 128, lastActive: '12 min ago', usageMins: 262 },
      { name: 'Amit Patel', role: 'Fee Accountant', sessions: 119, lastActive: '1 hr ago', usageMins: 245 },
      { name: 'Sneha Desai', role: 'Class Teacher', sessions: 105, lastActive: '30 min ago', usageMins: 228 },
      { name: 'Vikram Singh', role: 'Sports Head', sessions: 98, lastActive: '2 hr ago', usageMins: 210 },
    ],
    worstEmployees: [
      { name: 'Deepak Joshi', role: 'Lab Assistant', sessions: 3, lastActive: '18 days ago', usageMins: 5 },
      { name: 'Meena Rao', role: 'Librarian', sessions: 5, lastActive: '15 days ago', usageMins: 8 },
      { name: 'Suresh Nair', role: 'Peon Supervisor', sessions: 7, lastActive: '12 days ago', usageMins: 11 },
      { name: 'Kavita Bhat', role: 'Art Teacher', sessions: 9, lastActive: '10 days ago', usageMins: 14 },
      { name: 'Ramesh Yadav', role: 'PT Teacher', sessions: 11, lastActive: '8 days ago', usageMins: 18 },
    ],
    alarms: [
      { message: '5 staff members haven\'t logged in for 15+ days', severity: 'red' as const },
      { message: 'Parent app adoption dropped 12% this month', severity: 'amber' as const },
      { message: 'Data bucket at 85% capacity', severity: 'amber' as const },
      { message: 'Unusually high API calls from single user', severity: 'red' as const },
      { message: 'SMS quota 90% exhausted', severity: 'amber' as const },
    ],
  },
  {
    id: 'AS02', name: 'St. Xavier\'s High School', city: 'Surat', plan: 'Enterprise' as const,
    activeUsers: 2100, healthScore: 88, lastActive: '15 min ago',
    sparkline: [50, 55, 60, 58, 65, 70, 68, 75, 72, 80, 82, 78],
    subscriptionStart: 'Jan 2024', subscriptionEnd: 'Dec 2025',
    dataBucket: { used: 4.1, total: 10 }, bandwidth: { used: 310, total: 500 },
    notifications: { sms: 5400, email: 12300, push: 2100 }, apiCalls: 412000,
    users: {
      parents: { registered: 1400, active: 1180, avgSessions: 2.1 },
      academicStaff: { registered: 120, active: 108, avgSessions: 3.8 },
      nonAcademicStaff: { registered: 85, active: 62, avgSessions: 1.5 },
      students: { registered: 1800, active: 1350, avgSessions: 1.7 },
    },
    topModules: [
      { name: 'Fees & Payments', actions: 58200 },
      { name: 'Attendance', actions: 52100 },
      { name: 'Communication', actions: 41400 },
      { name: 'Examination', actions: 35800 },
      { name: 'Timetable', actions: 28900 },
    ],
    topEmployees: [
      { name: 'Fr. Joseph', role: 'Principal', sessions: 155, lastActive: '10 min ago', usageMins: 298 },
      { name: 'Anita Fernandes', role: 'VP Academics', sessions: 140, lastActive: '20 min ago', usageMins: 270 },
      { name: 'Rohit Mehta', role: 'Admin Head', sessions: 132, lastActive: '45 min ago', usageMins: 255 },
      { name: 'Sonia D\'Souza', role: 'Exam Coord.', sessions: 121, lastActive: '1 hr ago', usageMins: 238 },
      { name: 'Michael Thomas', role: 'IT Admin', sessions: 115, lastActive: '30 min ago', usageMins: 220 },
    ],
    worstEmployees: [
      { name: 'Prakash Verma', role: 'Security Head', sessions: 2, lastActive: '22 days ago', usageMins: 6 },
      { name: 'Lalita Devi', role: 'Ayah', sessions: 4, lastActive: '19 days ago', usageMins: 9 },
      { name: 'Ganesh Pillai', role: 'Store Keeper', sessions: 6, lastActive: '14 days ago', usageMins: 12 },
      { name: 'Fatima Sheikh', role: 'Music Teacher', sessions: 8, lastActive: '11 days ago', usageMins: 15 },
      { name: 'Ravi Kulkarni', role: 'Driver Coord.', sessions: 10, lastActive: '9 days ago', usageMins: 18 },
    ],
    alarms: [
      { message: '3 staff members haven\'t logged in for 15+ days', severity: 'red' as const },
      { message: 'Bandwidth usage above 60% mid-month', severity: 'amber' as const },
      { message: 'Subscription renewal in 45 days', severity: 'amber' as const },
    ],
  },
  {
    id: 'AS03', name: 'Navneet International', city: 'Vadodara', plan: 'Basic' as const,
    activeUsers: 680, healthScore: 72, lastActive: '1 hr ago',
    sparkline: [20, 22, 25, 24, 28, 26, 30, 28, 32, 35, 33, 36],
    subscriptionStart: 'Sep 2025', subscriptionEnd: 'Aug 2026',
    dataBucket: { used: 1.1, total: 2 }, bandwidth: { used: 42, total: 50 },
    notifications: { sms: 1100, email: 3200, push: 450 }, apiCalls: 78000,
    users: {
      parents: { registered: 420, active: 310, avgSessions: 1.8 },
      academicStaff: { registered: 35, active: 28, avgSessions: 3.2 },
      nonAcademicStaff: { registered: 22, active: 12, avgSessions: 1.1 },
      students: { registered: 500, active: 330, avgSessions: 1.2 },
    },
    topModules: [
      { name: 'Attendance', actions: 18200 },
      { name: 'Fees & Payments', actions: 14100 },
      { name: 'Communication', actions: 9800 },
      { name: 'Timetable', actions: 7200 },
      { name: 'Homework', actions: 5400 },
    ],
    topEmployees: [
      { name: 'Hemant Shah', role: 'Principal', sessions: 88, lastActive: '1 hr ago', usageMins: 240 },
      { name: 'Nisha Jain', role: 'Accountant', sessions: 72, lastActive: '2 hr ago', usageMins: 218 },
      { name: 'Dilip Pandya', role: 'Admin Officer', sessions: 65, lastActive: '3 hr ago', usageMins: 205 },
      { name: 'Poonam Trivedi', role: 'Class Teacher', sessions: 58, lastActive: '4 hr ago', usageMins: 195 },
      { name: 'Chirag Patel', role: 'IT Support', sessions: 52, lastActive: '1 hr ago', usageMins: 188 },
    ],
    worstEmployees: [
      { name: 'Bharat Solanki', role: 'Gardener Sup.', sessions: 1, lastActive: '25 days ago', usageMins: 5 },
      { name: 'Jaya Amin', role: 'Craft Teacher', sessions: 2, lastActive: '20 days ago', usageMins: 7 },
      { name: 'Kishore Raval', role: 'Clerk', sessions: 4, lastActive: '16 days ago', usageMins: 10 },
      { name: 'Usha Vyas', role: 'Nurse', sessions: 5, lastActive: '13 days ago', usageMins: 13 },
      { name: 'Manoj Thakkar', role: 'Watchman Sup.', sessions: 6, lastActive: '11 days ago', usageMins: 16 },
    ],
    alarms: [
      { message: 'Data bucket at 55% — approaching limit on Basic plan', severity: 'amber' as const },
      { message: 'Bandwidth usage at 84% — risk of overage', severity: 'red' as const },
      { message: '10 staff members haven\'t logged in for 15+ days', severity: 'red' as const },
      { message: 'Parent adoption rate only 52%', severity: 'amber' as const },
    ],
  },
  {
    id: 'AS04', name: 'Bright Future Academy', city: 'Rajkot', plan: 'Pro' as const,
    activeUsers: 890, healthScore: 91, lastActive: '8 min ago',
    sparkline: [35, 40, 42, 48, 50, 52, 55, 58, 60, 62, 65, 68],
    subscriptionStart: 'Jun 2025', subscriptionEnd: 'May 2026',
    dataBucket: { used: 1.8, total: 5 }, bandwidth: { used: 95, total: 200 },
    notifications: { sms: 2100, email: 6500, push: 880 }, apiCalls: 178000,
    users: {
      parents: { registered: 580, active: 510, avgSessions: 2.5 },
      academicStaff: { registered: 52, active: 48, avgSessions: 4.5 },
      nonAcademicStaff: { registered: 38, active: 30, avgSessions: 2.0 },
      students: { registered: 720, active: 620, avgSessions: 1.6 },
    },
    topModules: [
      { name: 'Attendance', actions: 28400 },
      { name: 'Communication', actions: 22800 },
      { name: 'Fees & Payments', actions: 19200 },
      { name: 'Homework', actions: 15600 },
      { name: 'Timetable', actions: 12400 },
    ],
    topEmployees: [
      { name: 'Dr. Meera Joshi', role: 'Director', sessions: 135, lastActive: '8 min ago', usageMins: 275 },
      { name: 'Karan Bhatt', role: 'Vice Principal', sessions: 122, lastActive: '20 min ago', usageMins: 258 },
      { name: 'Shreya Patel', role: 'Exam Officer', sessions: 108, lastActive: '1 hr ago', usageMins: 235 },
      { name: 'Nitin Doshi', role: 'Fee Manager', sessions: 96, lastActive: '45 min ago', usageMins: 215 },
      { name: 'Avni Thakkar', role: 'Class Teacher', sessions: 89, lastActive: '2 hr ago', usageMins: 198 },
    ],
    worstEmployees: [
      { name: 'Gopal Makwana', role: 'Lab Boy', sessions: 4, lastActive: '14 days ago', usageMins: 8 },
      { name: 'Sarla Parmar', role: 'Peon', sessions: 5, lastActive: '12 days ago', usageMins: 10 },
      { name: 'Jayesh Raval', role: 'Driver', sessions: 7, lastActive: '10 days ago', usageMins: 14 },
      { name: 'Pushpa Nayak', role: 'Kitchen Staff', sessions: 8, lastActive: '9 days ago', usageMins: 16 },
      { name: 'Vishal Gohel', role: 'Gardener', sessions: 9, lastActive: '7 days ago', usageMins: 19 },
    ],
    alarms: [
      { message: '2 staff members haven\'t logged in for 14+ days', severity: 'amber' as const },
      { message: 'SMS quota 72% exhausted', severity: 'amber' as const },
    ],
  },
  {
    id: 'AS05', name: 'Green Valley School', city: 'Gandhinagar', plan: 'Pro' as const,
    activeUsers: 1050, healthScore: 45, lastActive: '3 hr ago',
    sparkline: [60, 55, 48, 42, 38, 35, 30, 28, 25, 22, 20, 18],
    subscriptionStart: 'Feb 2025', subscriptionEnd: 'Jan 2026',
    dataBucket: { used: 4.6, total: 5 }, bandwidth: { used: 188, total: 200 },
    notifications: { sms: 4800, email: 9200, push: 1600 }, apiCalls: 320000,
    users: {
      parents: { registered: 700, active: 320, avgSessions: 0.8 },
      academicStaff: { registered: 65, active: 38, avgSessions: 1.9 },
      nonAcademicStaff: { registered: 48, active: 18, avgSessions: 0.6 },
      students: { registered: 900, active: 410, avgSessions: 0.7 },
    },
    topModules: [
      { name: 'Fees & Payments', actions: 38200 },
      { name: 'Attendance', actions: 22100 },
      { name: 'Communication', actions: 15400 },
      { name: 'Timetable', actions: 8800 },
      { name: 'Homework', actions: 5200 },
    ],
    topEmployees: [
      { name: 'Tushar Mehta', role: 'Admin Head', sessions: 68, lastActive: '3 hr ago', usageMins: 210 },
      { name: 'Reena Chauhan', role: 'Accountant', sessions: 55, lastActive: '5 hr ago', usageMins: 195 },
      { name: 'Sunil Pandey', role: 'Class Teacher', sessions: 42, lastActive: '8 hr ago', usageMins: 178 },
      { name: 'Alka Joshi', role: 'Receptionist', sessions: 38, lastActive: '6 hr ago', usageMins: 165 },
      { name: 'Deepa Shah', role: 'Clerk', sessions: 32, lastActive: '1 day ago', usageMins: 148 },
    ],
    worstEmployees: [
      { name: 'Mahesh Solanki', role: 'VP Academics', sessions: 2, lastActive: '28 days ago', usageMins: 5 },
      { name: 'Sunita Rawat', role: 'HOD Science', sessions: 3, lastActive: '24 days ago', usageMins: 7 },
      { name: 'Arun Mishra', role: 'HOD Math', sessions: 3, lastActive: '22 days ago', usageMins: 9 },
      { name: 'Geeta Sharma', role: 'Coordinator', sessions: 4, lastActive: '20 days ago', usageMins: 12 },
      { name: 'Vijay Patil', role: 'Sports Teacher', sessions: 5, lastActive: '18 days ago', usageMins: 15 },
    ],
    alarms: [
      { message: '12 staff members haven\'t logged in for 15+ days', severity: 'red' as const },
      { message: 'Overall user engagement dropped 35% this month', severity: 'red' as const },
      { message: 'Data bucket at 92% capacity — upgrade needed', severity: 'red' as const },
      { message: 'Bandwidth at 94% — will exceed limit in 3 days', severity: 'red' as const },
      { message: 'Parent app adoption dropped 28% this month', severity: 'red' as const },
      { message: 'VP Academics not logged in for 28 days', severity: 'red' as const },
      { message: 'SMS quota 96% exhausted', severity: 'amber' as const },
    ],
  },
];

// Sparkline mini component for analytics
function MiniSparkline({ data, color, theme }: { data: number[]; color: string; theme: Theme }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const h = 28;
  const w = 80;
  const step = w / (data.length - 1);
  const points = data.map((v, i) => `${i * step},${h - ((v - min) / range) * h}`).join(' ');
  return (
    <svg width={w} height={h} className="shrink-0">
      <polyline fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  );
}

// Progress bar component for analytics
function ProgressBar({ used, total, unit, theme, warn }: { used: number; total: number; unit: string; theme: Theme; warn?: boolean }) {
  const pct = Math.round((used / total) * 100);
  const barColor = pct > 85 ? 'bg-red-500' : pct > 65 ? 'bg-amber-500' : 'bg-emerald-500';
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className={`text-xs font-bold ${theme.highlight}`}>{used} {unit}</span>
        <span className={`text-[10px] ${theme.iconColor}`}>/ {total} {unit}</span>
      </div>
      <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
        <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${Math.min(pct, 100)}%` }} />
      </div>
      <p className={`text-[10px] mt-0.5 font-bold ${pct > 85 ? 'text-red-500' : pct > 65 ? 'text-amber-600' : 'text-emerald-600'}`}>{pct}% used</p>
    </div>
  );
}

// ─── ANALYTICS VIEW ────────────────────────────────────
function AnalyticsView({ theme }: { theme: Theme }) {
  const [selectedSchoolId, setSelectedSchoolId] = useState<string | null>(null);
  const selectedSchool = analyticsSchools.find(s => s.id === selectedSchoolId);

  // ── Level 2: School Detail ──
  if (selectedSchool) {
    const s = selectedSchool;
    const totalNotifications = s.notifications.sms + s.notifications.email + s.notifications.push;
    const alarmCount = s.alarms.filter(a => a.severity === 'red').length;
    return (
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <button onClick={() => setSelectedSchoolId(null)} className={`text-xs ${theme.primaryText} font-bold mb-2 flex items-center gap-1`}>
              <ChevronRight size={12} className="rotate-180" /> Back to All Schools
            </button>
            <h2 className={`text-lg font-bold ${theme.highlight}`}>{s.name}, {s.city}</h2>
            <p className={`text-xs ${theme.iconColor} mt-0.5`}>
              {s.plan} Plan &middot; {s.subscriptionStart} to {s.subscriptionEnd}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {alarmCount > 0 && (
              <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-red-100 text-red-700 text-[10px] font-bold">
                <AlertTriangle size={12} /> {alarmCount} Critical
              </span>
            )}
            <div className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
              s.plan === 'Enterprise' ? 'bg-amber-100 text-amber-700' :
              s.plan === 'Pro' ? 'bg-purple-100 text-purple-700' :
              'bg-blue-100 text-blue-700'
            }`}>{s.plan}</div>
          </div>
        </div>

        {/* Usage Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center gap-2 mb-2">
              <Database size={14} className={theme.primaryText} />
              <span className={`text-xs font-bold ${theme.highlight}`}>Data Bucket</span>
            </div>
            <ProgressBar used={s.dataBucket.used} total={s.dataBucket.total} unit="GB" theme={theme} />
          </div>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center gap-2 mb-2">
              <Globe size={14} className={theme.primaryText} />
              <span className={`text-xs font-bold ${theme.highlight}`}>Bandwidth</span>
            </div>
            <ProgressBar used={s.bandwidth.used} total={s.bandwidth.total} unit="GB" theme={theme} />
          </div>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center gap-2 mb-2">
              <Bell size={14} className={theme.primaryText} />
              <span className={`text-xs font-bold ${theme.highlight}`}>Notifications</span>
            </div>
            <p className={`text-lg font-bold ${theme.highlight}`}>{totalNotifications.toLocaleString()}</p>
            <p className={`text-[10px] ${theme.iconColor}`}>this month</p>
            <div className="flex gap-2 mt-1.5">
              <span className="text-[10px] text-blue-600 font-bold">SMS: {s.notifications.sms.toLocaleString()}</span>
              <span className="text-[10px] text-emerald-600 font-bold">Email: {s.notifications.email.toLocaleString()}</span>
              <span className="text-[10px] text-purple-600 font-bold">Push: {s.notifications.push.toLocaleString()}</span>
            </div>
          </div>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center gap-2 mb-2">
              <Zap size={14} className={theme.primaryText} />
              <span className={`text-xs font-bold ${theme.highlight}`}>API Calls</span>
            </div>
            <p className={`text-lg font-bold ${theme.highlight}`}>{(s.apiCalls / 1000).toFixed(0)}K</p>
            <p className={`text-[10px] ${theme.iconColor}`}>this month</p>
          </div>
        </div>

        {/* User Usage Breakdown */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3 flex items-center gap-2`}>
            <Users size={14} className={theme.primaryText} /> User Usage Breakdown
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {([
              { label: 'Parents', data: s.users.parents, color: 'bg-blue-500', icon: User },
              { label: 'Academic Staff', data: s.users.academicStaff, color: 'bg-emerald-500', icon: Briefcase },
              { label: 'Non-Academic Staff', data: s.users.nonAcademicStaff, color: 'bg-amber-500', icon: Shield },
              { label: 'Students', data: s.users.students, color: 'bg-purple-500', icon: Award },
            ] as const).map(u => {
              const activePct = Math.round((u.data.active / u.data.registered) * 100);
              return (
                <div key={u.label} className={`p-3 rounded-xl ${theme.secondaryBg}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-6 h-6 rounded-lg ${u.color} text-white flex items-center justify-center`}>
                      <u.icon size={12} />
                    </div>
                    <span className={`text-xs font-bold ${theme.highlight}`}>{u.label}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className={`text-[10px] ${theme.iconColor}`}>Registered</span>
                      <span className={`text-xs font-bold ${theme.highlight}`}>{u.data.registered}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`text-[10px] ${theme.iconColor}`}>Active</span>
                      <span className={`text-xs font-bold text-emerald-600`}>{u.data.active} ({activePct}%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`text-[10px] ${theme.iconColor}`}>Avg sessions/day</span>
                      <span className={`text-xs font-bold ${theme.primaryText}`}>{u.data.avgSessions}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Modules by Usage */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3 flex items-center gap-2`}>
            <Layers size={14} className={theme.primaryText} /> Top Modules by Usage
          </h3>
          <div className="space-y-2.5">
            {s.topModules.map((mod, i) => {
              const maxActions = s.topModules[0].actions;
              const pct = Math.round((mod.actions / maxActions) * 100);
              const colors = ['bg-slate-400', 'bg-slate-300', 'bg-blue-200', 'bg-emerald-200', 'bg-stone-300'];
              return (
                <div key={mod.name} className="flex items-center gap-3">
                  <span className={`text-[10px] font-bold ${theme.iconColor} w-4 text-right`}>{i + 1}</span>
                  <span className={`text-xs font-bold ${theme.highlight} w-36 truncate`}>{mod.name}</span>
                  <div className="flex-1 h-6 rounded-lg bg-slate-100 overflow-hidden relative">
                    <div className={`h-full rounded-lg ${colors[i]} transition-all`} style={{ width: `${pct}%` }} />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-600">
                      {mod.actions.toLocaleString()} actions/mo
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top & Worst Employees */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Top 5 */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3 flex items-center gap-2`}>
              <TrendingUp size={14} className="text-emerald-500" /> Top 5 Employees by Usage
            </h3>
            <div className="space-y-2">
              {s.topEmployees.map((emp, i) => (
                <div key={emp.name} className={`flex items-center gap-3 p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-bold ${theme.highlight} truncate`}>{emp.name}</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>{emp.role}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`text-xs font-bold text-emerald-600`}>{emp.sessions} sessions</p>
                    <p className={`text-[10px] font-bold text-emerald-500`}>{emp.usageMins} mins/day</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>{emp.lastActive}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom 5 */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3 flex items-center gap-2`}>
              <AlertTriangle size={14} className="text-red-500" /> Bottom 5 Employees by Usage
            </h3>
            <div className="space-y-2">
              {s.worstEmployees.map((emp, i) => (
                <div key={emp.name} className={`flex items-center gap-3 p-2.5 rounded-xl ${i < 2 ? 'bg-red-50 border border-red-200' : 'bg-amber-50 border border-amber-200'}`}>
                  <span className={`w-5 h-5 rounded-full ${i < 2 ? 'bg-red-500' : 'bg-amber-500'} text-white flex items-center justify-center text-[10px] font-bold`}>{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-bold ${i < 2 ? 'text-red-800' : 'text-amber-800'} truncate`}>{emp.name}</p>
                    <p className={`text-[10px] ${i < 2 ? 'text-red-500' : 'text-amber-500'}`}>{emp.role}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`text-xs font-bold ${i < 2 ? 'text-red-600' : 'text-amber-600'}`}>{emp.sessions} sessions</p>
                    <p className={`text-[10px] font-bold ${i < 2 ? 'text-red-500' : 'text-amber-500'}`}>{emp.usageMins} mins/day</p>
                    <p className={`text-[10px] ${i < 2 ? 'text-red-400' : 'text-amber-400'}`}>{emp.lastActive}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alarms / Abnormal Scenarios */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3 flex items-center gap-2`}>
            <AlertTriangle size={14} className="text-red-500" /> Alarms &amp; Abnormal Scenarios
            {s.alarms.length > 0 && (
              <span className="ml-auto px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold">{s.alarms.length} active</span>
            )}
          </h3>
          <div className="space-y-2">
            {s.alarms.map((alarm, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border ${
                alarm.severity === 'red'
                  ? 'bg-red-50 border-red-200'
                  : 'bg-amber-50 border-amber-200'
              }`}>
                <AlertTriangle size={14} className={`mt-0.5 shrink-0 ${alarm.severity === 'red' ? 'text-red-500' : 'text-amber-500'}`} />
                <p className={`text-xs font-medium ${alarm.severity === 'red' ? 'text-red-800' : 'text-amber-800'}`}>{alarm.message}</p>
                <span className={`ml-auto text-[10px] font-bold shrink-0 px-2 py-0.5 rounded-full ${
                  alarm.severity === 'red' ? 'bg-red-200 text-red-700' : 'bg-amber-200 text-amber-700'
                }`}>{alarm.severity === 'red' ? 'Critical' : 'Warning'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Level 1: School List (default) ──
  return (
    <div className="space-y-4">
      <div>
        <h2 className={`text-lg font-bold ${theme.highlight}`}>Platform Analytics</h2>
        <p className={`text-xs ${theme.iconColor}`}>Per-school analytics &middot; Click a school for detailed breakdown</p>
      </div>

      {/* Platform KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Building2} label="Active Schools" value="5" color="bg-blue-500" theme={theme} />
        <StatCard icon={TrendingUp} label="Avg Health Score" value="78%" color="bg-emerald-500" theme={theme} />
        <StatCard icon={Users} label="Total Active Users" value="5,960" color="bg-purple-500" theme={theme} />
        <StatCard icon={AlertTriangle} label="Critical Alerts" value={analyticsSchools.reduce((sum, sc) => sum + sc.alarms.filter(a => a.severity === 'red').length, 0).toString()} color="bg-red-500" theme={theme} />
      </div>

      {/* DAU / MAU + Per-Module Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* DAU / MAU */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Platform Engagement</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
              <p className={`text-lg font-bold ${theme.highlight}`}>3,420</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Daily Active Users (DAU)</p>
              <p className="text-[10px] font-bold text-emerald-600 mt-0.5">+8.2% vs last week</p>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
              <p className={`text-lg font-bold ${theme.highlight}`}>5,960</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Monthly Active Users (MAU)</p>
              <p className="text-[10px] font-bold text-emerald-600 mt-0.5">+5.4% vs last month</p>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
              <p className={`text-lg font-bold ${theme.primaryText}`}>57.4%</p>
              <p className={`text-[10px] ${theme.iconColor}`}>DAU/MAU Ratio</p>
              <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>Good stickiness</p>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
              <p className={`text-lg font-bold ${theme.highlight}`}>12.4 min</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Avg Session Duration</p>
              <p className="text-[10px] font-bold text-emerald-600 mt-0.5">+1.2 min vs last month</p>
            </div>
          </div>
        </div>

        {/* Per-Module Usage */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Per-Module Usage (Platform-wide)</h3>
          <div className="space-y-2.5">
            {[
              { module: 'Attendance', actions: 165900, pct: 100 },
              { module: 'Fees & Payments', actions: 161700, pct: 97 },
              { module: 'Communication', actions: 117800, pct: 71 },
              { module: 'Timetable', actions: 80200, pct: 48 },
              { module: 'Homework', actions: 63700, pct: 38 },
              { module: 'Examination', actions: 35800, pct: 22 },
              { module: 'Transport', actions: 28500, pct: 17 },
              { module: 'Library', actions: 18200, pct: 11 },
            ].map(m => (
              <div key={m.module} className="flex items-center gap-3">
                <span className={`text-[10px] font-bold ${theme.highlight} w-24 truncate`}>{m.module}</span>
                <div className="flex-1 h-5 rounded-lg bg-slate-100 overflow-hidden relative">
                  <div className="h-full rounded-lg bg-blue-500/80 transition-all" style={{ width: `${m.pct}%` }} />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-bold text-slate-600">
                    {m.actions.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Most Active vs Least Active Schools */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3 flex items-center gap-2`}>
            <TrendingUp size={14} className="text-emerald-500" /> Most Active Schools
          </h3>
          <div className="space-y-2">
            {analyticsSchools
              .filter(s => s.healthScore >= 80)
              .sort((a, b) => b.healthScore - a.healthScore)
              .slice(0, 3)
              .map((s, i) => (
                <div key={s.id} className={`flex items-center gap-3 p-3 rounded-xl ${theme.secondaryBg}`}>
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">{i + 1}</span>
                  <div className="flex-1">
                    <p className={`text-xs font-bold ${theme.highlight}`}>{s.name}</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>{s.activeUsers.toLocaleString()} active users</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-600">{s.healthScore}%</span>
                </div>
              ))}
          </div>
        </div>
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3 flex items-center gap-2`}>
            <AlertTriangle size={14} className="text-red-500" /> Least Active Schools
          </h3>
          <div className="space-y-2">
            {analyticsSchools
              .filter(s => s.healthScore < 80)
              .sort((a, b) => a.healthScore - b.healthScore)
              .slice(0, 3)
              .map((s, i) => (
                <div key={s.id} className={`flex items-center gap-3 p-3 rounded-xl ${s.healthScore < 60 ? 'bg-red-50 border border-red-200' : 'bg-amber-50 border border-amber-200'}`}>
                  <span className={`w-5 h-5 rounded-full ${s.healthScore < 60 ? 'bg-red-500' : 'bg-amber-500'} text-white flex items-center justify-center text-[10px] font-bold`}>{i + 1}</span>
                  <div className="flex-1">
                    <p className={`text-xs font-bold ${s.healthScore < 60 ? 'text-red-800' : 'text-amber-800'}`}>{s.name}</p>
                    <p className={`text-[10px] ${s.healthScore < 60 ? 'text-red-500' : 'text-amber-500'}`}>{s.activeUsers.toLocaleString()} active users</p>
                  </div>
                  <span className={`text-xs font-bold ${s.healthScore < 60 ? 'text-red-600' : 'text-amber-600'}`}>{s.healthScore}%</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* School List */}
      <div className="space-y-3">
        {analyticsSchools.map(s => {
          const healthColor = s.healthScore >= 80 ? 'text-emerald-600' : s.healthScore >= 60 ? 'text-amber-600' : 'text-red-600';
          const healthBg = s.healthScore >= 80 ? 'bg-emerald-500' : s.healthScore >= 60 ? 'bg-amber-500' : 'bg-red-500';
          const healthRingBg = s.healthScore >= 80 ? 'bg-emerald-100' : s.healthScore >= 60 ? 'bg-amber-100' : 'bg-red-100';
          const sparkColor = s.healthScore >= 80 ? '#10b981' : s.healthScore >= 60 ? '#f59e0b' : '#ef4444';
          const alertCount = s.alarms.filter(a => a.severity === 'red').length;
          return (
            <button
              key={s.id}
              onClick={() => setSelectedSchoolId(s.id)}
              className={`w-full text-left ${theme.cardBg} rounded-2xl border ${theme.border} p-4 ${theme.buttonHover} transition-all group`}
            >
              <div className="flex items-center gap-4">
                {/* Health Score Ring */}
                <div className={`w-12 h-12 rounded-full ${healthRingBg} flex items-center justify-center shrink-0 relative`}>
                  <span className={`text-sm font-bold ${healthColor}`}>{s.healthScore}</span>
                  <div className={`absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full ${healthBg} border-2 border-white`} />
                </div>

                {/* School Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className={`text-sm font-bold ${theme.highlight} truncate`}>{s.name}</h3>
                    <span className={`text-[10px] font-bold shrink-0 px-2 py-0.5 rounded-full ${
                      s.plan === 'Enterprise' ? 'bg-amber-100 text-amber-700' :
                      s.plan === 'Pro' ? 'bg-purple-100 text-purple-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>{s.plan}</span>
                    {alertCount > 0 && (
                      <span className="flex items-center gap-0.5 shrink-0 px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 text-[10px] font-bold">
                        <AlertTriangle size={10} /> {alertCount}
                      </span>
                    )}
                  </div>
                  <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>
                    {s.city} &middot; {s.activeUsers.toLocaleString()} active users &middot; Last active: {s.lastActive}
                  </p>
                </div>

                {/* Sparkline */}
                <MiniSparkline data={s.sparkline} color={sparkColor} theme={theme} />

                {/* Arrow */}
                <ChevronRight size={16} className={`${theme.iconColor} group-hover:${theme.primaryText} shrink-0 transition-colors`} />
              </div>

              {/* Quick Stats Bar */}
              <div className="flex items-center gap-4 mt-3 ml-16">
                <div className="flex items-center gap-1">
                  <Database size={10} className={theme.iconColor} />
                  <span className={`text-[10px] ${theme.iconColor}`}>{s.dataBucket.used}/{s.dataBucket.total} GB</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe size={10} className={theme.iconColor} />
                  <span className={`text-[10px] ${theme.iconColor}`}>{s.bandwidth.used}/{s.bandwidth.total} GB BW</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bell size={10} className={theme.iconColor} />
                  <span className={`text-[10px] ${theme.iconColor}`}>{(s.notifications.sms + s.notifications.email + s.notifications.push).toLocaleString()} notif</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap size={10} className={theme.iconColor} />
                  <span className={`text-[10px] ${theme.iconColor}`}>{(s.apiCalls / 1000).toFixed(0)}K API</span>
                </div>
              </div>
            </button>
          );
        })}
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

// ─── RESELLER MANAGEMENT MODULE ───────────────────────
const resellersData = [
  { name: 'EduPartners India', partnerId: 'RP-2024-047', region: 'Gujarat & Rajasthan', schools: 12, revenue: '₹1,85,000', commissionPct: '18%', commission: '₹33,300', status: 'Active' },
  { name: 'SchoolConnect Pro', partnerId: 'RP-2024-012', region: 'Maharashtra', schools: 15, revenue: '₹2,40,000', commissionPct: '20%', commission: '₹48,000', status: 'Active' },
  { name: 'LearnBridge', partnerId: 'RP-2024-063', region: 'Karnataka', schools: 8, revenue: '₹1,20,000', commissionPct: '15%', commission: '₹18,000', status: 'Active' },
  { name: 'EduReach Network', partnerId: 'RP-2024-089', region: 'Tamil Nadu', schools: 10, revenue: '₹1,60,000', commissionPct: '18%', commission: '₹28,800', status: 'Active' },
  { name: 'SmartSchool Partners', partnerId: 'RP-2025-003', region: 'Delhi NCR', schools: 6, revenue: '₹95,000', commissionPct: '15%', commission: '₹14,250', status: 'Active' },
  { name: 'AcademiX Solutions', partnerId: 'RP-2024-034', region: 'MP & Chhattisgarh', schools: 9, revenue: '₹1,35,000', commissionPct: '18%', commission: '₹24,300', status: 'Active' },
  { name: 'EduVenture', partnerId: 'RP-2023-091', region: 'Rajasthan', schools: 4, revenue: '₹55,000', commissionPct: '15%', commission: '₹8,250', status: 'Active' },
  { name: 'Pioneer Ed', partnerId: 'RP-2024-055', region: 'UP', schools: 3, revenue: '₹42,000', commissionPct: '15%', commission: '₹6,300', status: 'Inactive' },
];

const recentPayouts = [
  { date: '15 Jan 2026', reseller: 'SchoolConnect Pro', amount: '₹48,000', schools: 15, status: 'Paid' },
  { date: '15 Jan 2026', reseller: 'EduPartners India', amount: '₹33,300', schools: 12, status: 'Paid' },
  { date: '15 Jan 2026', reseller: 'EduReach Network', amount: '₹28,800', schools: 10, status: 'Paid' },
  { date: '15 Jan 2026', reseller: 'AcademiX Solutions', amount: '₹24,300', schools: 9, status: 'Paid' },
  { date: '15 Dec 2025', reseller: 'SchoolConnect Pro', amount: '₹46,200', schools: 14, status: 'Paid' },
  { date: '15 Dec 2025', reseller: 'LearnBridge', amount: '₹16,500', schools: 7, status: 'Paid' },
];

const commissionTiers = [
  { name: 'Bronze', range: '1–5 schools', pct: '15%', color: 'bg-amber-600' },
  { name: 'Silver', range: '6–15 schools', pct: '18%', color: 'bg-slate-400' },
  { name: 'Gold', range: '16–30 schools', pct: '20%', color: 'bg-yellow-500' },
  { name: 'Platinum', range: '30+ schools', pct: '22%', color: 'bg-purple-500' },
];

const regionOptions = ['Gujarat', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Delhi NCR', 'Rajasthan', 'MP & Chhattisgarh', 'UP', 'Kerala', 'West Bengal', 'Telangana', 'Andhra Pradesh', 'Punjab', 'Haryana', 'Bihar'];

function ResellerManagementModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const filtered = tab === 'All' ? resellersData : resellersData.filter(r => r.status === tab);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-bold ${theme.highlight}`}>Reseller Management</h2>
          <p className={`text-xs ${theme.iconColor}`}>Channel partners who bring schools to the platform</p>
        </div>
        <button onClick={() => setShowCreateForm(!showCreateForm)} className={`flex items-center gap-2 px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>
          <Plus size={14} /> Add Reseller
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard icon={Handshake} label="Total Resellers" value="8" color="bg-blue-500" sub="Active: 7, Inactive: 1" theme={theme} />
        <StatCard icon={IndianRupee} label="Commission Paid (YTD)" value="₹38.5L" color="bg-emerald-500" sub="Financial year 2025-26" theme={theme} />
        <StatCard icon={Clock} label="Pending Payouts" value="₹5.25L" color="bg-amber-500" sub="Next payout: 15 Feb 2026" theme={theme} />
        <StatCard icon={Building2} label="Schools via Resellers" value="67" color="bg-purple-500" sub="of ~120 total schools" theme={theme} />
        <StatCard icon={Percent} label="Avg. Commission" value="17.5%" color="bg-rose-500" sub="Across all resellers" theme={theme} />
      </div>

      {/* Create Reseller Form (Collapsible) */}
      {showCreateForm && (
        <div className={`${theme.cardBg} rounded-2xl border-2 border-blue-300 p-5 space-y-4`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Create New Reseller</h3>
            <button onClick={() => setShowCreateForm(false)} className={`p-1.5 rounded-lg ${theme.buttonHover} ${theme.iconColor}`}>
              <X size={16} />
            </button>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Company / Partner Name <span className="text-red-500">*</span></label>
              <input type="text" placeholder="e.g. EduPartners India" className={`w-full px-4 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-slate-300 ${theme.highlight}`} />
            </div>
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Contact Person Name <span className="text-red-500">*</span></label>
              <input type="text" placeholder="e.g. Rajesh Mehta" className={`w-full px-4 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-slate-300 ${theme.highlight}`} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Email <span className="text-red-500">*</span></label>
              <input type="email" placeholder="partner@company.com" className={`w-full px-4 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-slate-300 ${theme.highlight}`} />
            </div>
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Phone <span className="text-red-500">*</span></label>
              <input type="tel" placeholder="+91 98765 43210" className={`w-full px-4 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-slate-300 ${theme.highlight}`} />
            </div>
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Region / Territory <span className="text-red-500">*</span></label>
              <select className={`w-full px-4 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none ${theme.highlight}`}>
                <option value="">Select region...</option>
                {regionOptions.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Commission Tier</label>
              <select className={`w-full px-4 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none ${theme.highlight}`}>
                <option value="">Select tier...</option>
                <option value="bronze">Bronze (15%)</option>
                <option value="silver">Silver (18%)</option>
                <option value="gold">Gold (20%)</option>
                <option value="platinum">Platinum (22%)</option>
                <option value="custom">Custom %</option>
              </select>
            </div>
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Agreement Date</label>
              <input type="date" className={`w-full px-4 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-slate-300 ${theme.highlight}`} />
            </div>
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Agreement Validity</label>
              <input type="date" className={`w-full px-4 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-slate-300 ${theme.highlight}`} />
            </div>
          </div>

          {/* Bank Details */}
          <div className={`rounded-xl border ${theme.border} p-4 space-y-3`}>
            <p className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>Bank Details (for commission payouts)</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Account Name</label>
                <input type="text" placeholder="e.g. EduPartners India Pvt Ltd" className={`w-full px-4 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-slate-300 ${theme.highlight}`} />
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Account Number</label>
                <input type="text" placeholder="e.g. 9876543210123456" className={`w-full px-4 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-slate-300 ${theme.highlight}`} />
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>IFSC Code</label>
                <input type="text" placeholder="e.g. SBIN0001234" className={`w-full px-4 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-slate-300 ${theme.highlight}`} />
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Bank Name</label>
                <input type="text" placeholder="e.g. State Bank of India" className={`w-full px-4 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-slate-300 ${theme.highlight}`} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>GSTIN (Optional)</label>
              <input type="text" placeholder="e.g. 24AABCU9603R1ZM" className={`w-full px-4 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-slate-300 ${theme.highlight}`} />
            </div>
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Notes</label>
              <input type="text" placeholder="Any internal notes about this reseller..." className={`w-full px-4 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-slate-300 ${theme.highlight}`} />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button onClick={() => setShowCreateForm(false)} className={`px-4 py-2 rounded-xl text-xs font-bold ${theme.secondaryBg} ${theme.highlight}`}>Cancel</button>
            <button className={`flex items-center gap-2 px-5 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>
              <Check size={14} /> Create Reseller
            </button>
          </div>
        </div>
      )}

      {/* Reseller List */}
      <TabBar tabs={['All', 'Active', 'Inactive']} active={tab} onChange={setTab} theme={theme} />

      <DataTable
        headers={['Reseller', 'Partner ID', 'Region', 'Schools', 'Revenue/mo', 'Commission %', 'Commission/mo', 'Status']}
        rows={filtered.map(r => [
          <span key="name" className={`text-xs font-bold ${theme.highlight}`}>{r.name}</span>,
          <span key="pid" className={`text-xs font-mono ${theme.iconColor}`}>{r.partnerId}</span>,
          <span key="region" className={`text-xs ${theme.iconColor}`}>{r.region}</span>,
          <span key="schools" className={`text-xs font-bold ${theme.highlight}`}>{r.schools}</span>,
          <span key="rev" className={`text-xs font-bold ${theme.highlight}`}>{r.revenue}</span>,
          <span key="pct" className={`text-xs font-bold ${theme.primaryText}`}>{r.commissionPct}</span>,
          <span key="comm" className={`text-xs font-bold text-emerald-600`}>{r.commission}</span>,
          <StatusBadge key="status" status={r.status} theme={theme} />,
        ])}
        theme={theme}
      />

      {/* Commission Tiers + Payout Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Commission Tiers Card */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Commission Tier Structure</h3>
          <div className="space-y-3">
            {commissionTiers.map(tier => (
              <div key={tier.name} className={`flex items-center gap-4 p-3 rounded-xl ${theme.secondaryBg}`}>
                <div className={`w-10 h-10 rounded-xl ${tier.color} text-white flex items-center justify-center text-xs font-bold`}>
                  {tier.pct}
                </div>
                <div className="flex-1">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{tier.name}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{tier.range}</p>
                </div>
                <span className={`text-xs font-bold ${theme.primaryText}`}>{tier.pct} commission</span>
              </div>
            ))}
          </div>
          <div className={`${theme.secondaryBg} rounded-xl p-3 mt-3 flex items-start gap-2`}>
            <AlertTriangle size={12} className="text-amber-500 mt-0.5 shrink-0" />
            <p className={`text-[10px] ${theme.iconColor}`}>
              Commission tiers auto-upgrade as resellers onboard more schools. Custom rates can be set per reseller agreement.
            </p>
          </div>
        </div>

        {/* Payout Management Card */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Payout Management</h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-[10px] ${theme.iconColor}`}>Payout Schedule</p>
              <p className={`text-xs font-bold ${theme.highlight}`}>Monthly (15th of every month)</p>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-[10px] ${theme.iconColor}`}>Next Payout Run</p>
              <p className={`text-xs font-bold ${theme.primaryText}`}>15 Feb 2026</p>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-[10px] ${theme.iconColor}`}>Total Pending</p>
              <p className={`text-lg font-bold text-amber-600`}>₹5,25,000</p>
            </div>
            <div className="flex items-end">
              <button className={`w-full flex items-center justify-center gap-2 px-4 py-3 ${theme.primary} text-white rounded-xl text-xs font-bold`}>
                <IndianRupee size={14} /> Process Payouts
              </button>
            </div>
          </div>

          {/* Recent Payouts */}
          <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-2`}>Recent Payouts</p>
          <div className="space-y-2">
            {recentPayouts.slice(0, 4).map((p, i) => (
              <div key={i} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>{p.reseller}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{p.date} · {p.schools} schools</p>
                </div>
                <div className="text-right">
                  <p className={`text-xs font-bold text-emerald-600`}>{p.amount}</p>
                  <StatusBadge status={p.status} theme={theme} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── AM ASSIGNMENT VIEW ──────────────────────────────
const accountManagers = [
  { id: 'AM01', name: 'Farheen Shaikh', email: 'farheen@saaras.ai', schools: ['Delhi Public School', 'Navrachana Vidyani', 'Udgam School'], totalSchools: 3, capacity: 5, avgHealthScore: 85, lastActive: '30 min ago' },
  { id: 'AM02', name: 'Kunjal Patel', email: 'kunjal@saaras.ai', schools: ['Anand Niketan', 'Zydus School'], totalSchools: 2, capacity: 5, avgHealthScore: 82, lastActive: '4 hours ago' },
  { id: 'AM03', name: 'Riya Desai', email: 'riya@saaras.ai', schools: ['SAL International'], totalSchools: 1, capacity: 5, avgHealthScore: 0, lastActive: '1 day ago' },
  { id: 'AM04', name: 'Varun Mehta', email: 'varun@saaras.ai', schools: [], totalSchools: 0, capacity: 5, avgHealthScore: 0, lastActive: '2 days ago' },
];

const unassignedSchools = [
  { name: 'Calorx Olive, Ahmedabad', plan: 'Starter', status: 'Churned', students: 450 },
  { name: 'Bright Future Academy', plan: 'Professional', status: 'Onboarding', students: 0 },
  { name: 'Greenfield International', plan: 'Enterprise', status: 'Onboarding', students: 0 },
];

function AMAssignmentView({ theme }: { theme: Theme }) {
  const [showAssign, setShowAssign] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-bold ${theme.highlight}`}>Account Manager Assignment</h2>
          <p className={`text-xs ${theme.iconColor}`}>Assign and manage account managers for each school</p>
        </div>
        <button onClick={() => setShowAssign(!showAssign)} className={`flex items-center gap-2 px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>
          <Plus size={14} /> Assign AM
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={UserCog} label="Total AMs" value={accountManagers.length} color="bg-blue-500" theme={theme} />
        <StatCard icon={Building2} label="Assigned Schools" value={accountManagers.reduce((s, a) => s + a.totalSchools, 0)} color="bg-emerald-500" theme={theme} />
        <StatCard icon={AlertTriangle} label="Unassigned Schools" value={unassignedSchools.length} color="bg-amber-500" theme={theme} />
        <StatCard icon={TrendingUp} label="Avg Health Score" value="84%" color="bg-purple-500" sub="across managed schools" theme={theme} />
      </div>

      {/* Assign AM Modal */}
      {showAssign && (
        <div className={`${theme.cardBg} rounded-2xl border-2 border-blue-300 p-5 space-y-4`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Assign Account Manager</h3>
            <button onClick={() => setShowAssign(false)} className={`p-1.5 rounded-lg ${theme.buttonHover} ${theme.iconColor}`}><X size={16} /></button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Select School</label>
              <select className={`w-full px-3 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm ${theme.highlight} outline-none`}>
                <option value="">Choose school...</option>
                {unassignedSchools.map(s => <option key={s.name} value={s.name}>{s.name} ({s.status})</option>)}
                {schools.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Assign To</label>
              <select className={`w-full px-3 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm ${theme.highlight} outline-none`}>
                <option value="">Choose AM...</option>
                {accountManagers.map(am => (
                  <option key={am.id} value={am.id}>{am.name} ({am.totalSchools}/{am.capacity} schools)</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button onClick={() => setShowAssign(false)} className={`px-4 py-2 rounded-xl text-xs font-bold ${theme.secondaryBg} ${theme.highlight}`}>Cancel</button>
            <button onClick={() => { setShowAssign(false); window.alert('AM assigned successfully! (Blueprint demo)'); }} className={`flex items-center gap-2 px-5 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>
              <Check size={14} /> Assign
            </button>
          </div>
        </div>
      )}

      {/* AM List with Workload */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Account Managers — Workload</h3>
        <div className="space-y-3">
          {accountManagers.map(am => {
            const loadPct = Math.round((am.totalSchools / am.capacity) * 100);
            return (
              <div key={am.id} className={`p-4 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full ${theme.primary} text-white flex items-center justify-center text-xs font-bold`}>
                      {am.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className={`text-xs font-bold ${theme.highlight}`}>{am.name}</p>
                      <p className={`text-[10px] ${theme.iconColor}`}>{am.email} &middot; Last active: {am.lastActive}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-bold ${theme.highlight}`}>{am.totalSchools}/{am.capacity} schools</p>
                    {am.avgHealthScore > 0 && (
                      <p className={`text-[10px] font-bold ${am.avgHealthScore >= 80 ? 'text-emerald-600' : am.avgHealthScore >= 60 ? 'text-amber-600' : 'text-red-500'}`}>
                        Avg Health: {am.avgHealthScore}%
                      </p>
                    )}
                  </div>
                </div>
                {/* Workload Bar */}
                <div className="h-2 rounded-full bg-slate-200 overflow-hidden mb-2">
                  <div
                    className={`h-full rounded-full ${loadPct >= 80 ? 'bg-red-500' : loadPct >= 60 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                    style={{ width: `${loadPct}%` }}
                  />
                </div>
                {/* Schools list */}
                {am.schools.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {am.schools.map(s => (
                      <span key={s} className={`text-[10px] px-2 py-0.5 rounded-full ${theme.cardBg} border ${theme.border} ${theme.iconColor} font-medium`}>{s}</span>
                    ))}
                  </div>
                ) : (
                  <p className={`text-[10px] ${theme.iconColor}`}>No schools assigned yet</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Unassigned Schools */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3 flex items-center gap-2`}>
          <AlertTriangle size={14} className="text-amber-500" /> Unassigned Schools
        </h3>
        <DataTable
          headers={['School', 'Plan', 'Status', 'Students', '']}
          rows={unassignedSchools.map(s => [
            <span key="name" className={`text-xs font-bold ${theme.highlight}`}>{s.name}</span>,
            <span key="plan" className={`text-xs font-bold ${theme.primaryText}`}>{s.plan}</span>,
            <StatusBadge key="status" status={s.status} theme={theme} />,
            <span key="stu" className={`text-xs ${theme.iconColor}`}>{s.students > 0 ? s.students.toLocaleString() : '—'}</span>,
            <button key="assign" onClick={() => setShowAssign(true)} className={`text-xs ${theme.primaryText} font-bold`}>Assign →</button>,
          ])}
          theme={theme}
        />
      </div>
    </div>
  );
}

// ─── DATA MIGRATION VIEW ─────────────────────────────
function DataMigrationView({ theme }: { theme: Theme }) {
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const stepLabels = ['Source', 'Upload', 'Field Mapping', 'Validation', 'Import'];

  const recentMigrations = [
    { id: 'MIG001', school: 'Delhi Public School', source: 'Fedena ERP', date: '10 Jan 2026', records: '4,250', tables: 12, status: 'Completed', duration: '2h 15m' },
    { id: 'MIG002', school: 'Navrachana Vidyani', source: 'Excel Sheets', date: '08 Jan 2026', records: '3,100', tables: 8, status: 'Completed', duration: '1h 40m' },
    { id: 'MIG003', school: 'Udgam School', source: 'Tally + Excel', date: '05 Jan 2026', records: '2,800', tables: 6, status: 'Completed', duration: '1h 20m' },
    { id: 'MIG004', school: 'SAL International', source: 'Manual Entry', date: '15 Feb 2026', records: '—', tables: 0, status: 'Pending', duration: '—' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-bold ${theme.highlight}`}>Data Migration Tools</h2>
          <p className={`text-xs ${theme.iconColor}`}>Migrate school data from legacy systems to Saaras</p>
        </div>
        <button onClick={() => setStep(1)} className={`flex items-center gap-2 px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>
          <Plus size={14} /> New Migration
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Database} label="Total Migrations" value={recentMigrations.length} color="bg-blue-500" theme={theme} />
        <StatCard icon={CheckCircle} label="Completed" value={recentMigrations.filter(m => m.status === 'Completed').length} color="bg-emerald-500" theme={theme} />
        <StatCard icon={Clock} label="Pending" value={recentMigrations.filter(m => m.status === 'Pending').length} color="bg-amber-500" theme={theme} />
        <StatCard icon={Table2} label="Total Records Migrated" value="10,150" color="bg-purple-500" theme={theme} />
      </div>

      {/* Migration Wizard */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-4`}>Migration Wizard</h3>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-6">
          {stepLabels.map((label, i) => (
            <React.Fragment key={label}>
              <div className="flex items-center gap-1.5">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  i + 1 < step ? 'bg-emerald-500 text-white' :
                  i + 1 === step ? `${theme.primary} text-white` :
                  `${theme.secondaryBg} ${theme.iconColor}`
                }`}>
                  {i + 1 < step ? <Check size={12} /> : i + 1}
                </div>
                <span className={`text-[10px] font-bold ${i + 1 <= step ? theme.highlight : theme.iconColor}`}>{label}</span>
              </div>
              {i < totalSteps - 1 && (
                <div className={`flex-1 h-0.5 rounded ${i + 1 < step ? 'bg-emerald-500' : `${theme.secondaryBg}`}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step Content */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Target School</label>
                <select className={`w-full px-3 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm ${theme.highlight} outline-none`}>
                  <option value="">Select school...</option>
                  {schools.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Source System</label>
                <select className={`w-full px-3 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm ${theme.highlight} outline-none`}>
                  <option value="">Select source...</option>
                  <option>Excel / CSV Sheets</option>
                  <option>Fedena ERP</option>
                  <option>Entab CampusCare</option>
                  <option>MyClassboard</option>
                  <option>Tally (Fee Data)</option>
                  <option>Custom SQL Database</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Data Categories to Migrate</label>
              <div className="flex flex-wrap gap-2">
                {['Students', 'Staff', 'Fee Records', 'Attendance', 'Exam Results', 'Transport', 'Library', 'Parent Contacts', 'Timetable', 'Inventory'].map(cat => (
                  <button key={cat} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border ${theme.border} ${theme.cardBg} ${theme.iconColor} ${theme.buttonHover} transition-all`}>{cat}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className={`p-8 rounded-xl border-2 border-dashed ${theme.border} text-center`}>
              <Upload size={32} className={`${theme.iconColor} mx-auto mb-3`} />
              <p className={`text-sm font-bold ${theme.highlight}`}>Drag & drop files here</p>
              <p className={`text-xs ${theme.iconColor} mt-1`}>Supports .xlsx, .csv, .json, .sql files (max 100MB each)</p>
              <button className={`mt-3 px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>Browse Files</button>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1`}>Uploaded Files</p>
              <div className="space-y-1.5">
                {['students_master.xlsx (2.4 MB)', 'fee_records_2024-25.csv (1.8 MB)', 'staff_data.xlsx (0.9 MB)'].map((f, i) => (
                  <div key={i} className={`flex items-center justify-between p-2 rounded-lg ${theme.cardBg} border ${theme.border}`}>
                    <span className={`text-xs ${theme.highlight}`}>{f}</span>
                    <CheckCircle size={14} className="text-emerald-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <p className={`text-xs ${theme.iconColor}`}>Map source columns to Saaras fields. Auto-detected mappings shown below.</p>
            <DataTable
              headers={['Source Column', 'Saaras Field', 'Status', '']}
              rows={[
                ['Student Name', 'students.full_name', 'Mapped'],
                ['Roll Number', 'students.roll_number', 'Mapped'],
                ['Father Name', 'parents.father_name', 'Mapped'],
                ['Mother Name', 'parents.mother_name', 'Mapped'],
                ['Class', 'students.class_id', 'Mapped'],
                ['Section', 'students.section', 'Mapped'],
                ['DOB', 'students.date_of_birth', 'Mapped'],
                ['Fee Amount', 'fee_records.amount', 'Mapped'],
                ['Custom Field 1', '—', 'Unmapped'],
                ['Custom Field 2', '—', 'Unmapped'],
              ].map(([src, dst, status]) => [
                <span key="src" className={`text-xs font-bold ${theme.highlight}`}>{src}</span>,
                <span key="dst" className={`text-xs ${status === 'Mapped' ? theme.primaryText : 'text-red-500'} font-mono`}>{dst}</span>,
                <StatusBadge key="status" status={status === 'Mapped' ? 'Active' : 'Pending'} theme={theme} />,
                <button key="action" className={`text-xs ${theme.primaryText} font-bold`}>{status === 'Mapped' ? 'Change' : 'Map'}</button>,
              ])}
              theme={theme}
            />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
                <p className={`text-lg font-bold text-emerald-600`}>4,250</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Valid Records</p>
              </div>
              <div className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
                <p className={`text-lg font-bold text-amber-600`}>23</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Warnings</p>
              </div>
              <div className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
                <p className={`text-lg font-bold text-red-500`}>8</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Errors</p>
              </div>
              <div className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
                <p className={`text-lg font-bold ${theme.highlight}`}>12</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Tables</p>
              </div>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-2`}>Validation Issues</p>
              <div className="space-y-1.5">
                {[
                  { type: 'Error', msg: 'Missing DOB for 5 student records (rows 45, 128, 302, 567, 812)' },
                  { type: 'Error', msg: 'Duplicate roll numbers found: 3 records in Class 10-A' },
                  { type: 'Warning', msg: '15 phone numbers in invalid format — will be imported as-is' },
                  { type: 'Warning', msg: '8 fee records have no corresponding student — skipping' },
                ].map((issue, i) => (
                  <div key={i} className={`flex items-start gap-2 p-2 rounded-lg ${issue.type === 'Error' ? 'bg-red-50 border border-red-200' : 'bg-amber-50 border border-amber-200'}`}>
                    <AlertTriangle size={12} className={`mt-0.5 shrink-0 ${issue.type === 'Error' ? 'text-red-500' : 'text-amber-500'}`} />
                    <p className={`text-xs ${issue.type === 'Error' ? 'text-red-700' : 'text-amber-700'}`}>{issue.msg}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <div className="text-center py-6">
              <div className={`w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mx-auto mb-4`}>
                <ArrowDownToLine size={28} />
              </div>
              <p className={`text-sm font-bold ${theme.highlight}`}>Ready to Import</p>
              <p className={`text-xs ${theme.iconColor} mt-1`}>4,250 records across 12 tables will be imported into Delhi Public School</p>
            </div>
            {/* Progress Bar (mock at 0%) */}
            <div>
              <div className="flex justify-between mb-1">
                <span className={`text-xs font-bold ${theme.highlight}`}>Import Progress</span>
                <span className={`text-xs font-bold ${theme.iconColor}`}>0%</span>
              </div>
              <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: '0%' }} />
              </div>
              <p className={`text-[10px] ${theme.iconColor} mt-1`}>Click &quot;Start Import&quot; to begin. This may take 15-30 minutes.</p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6 pt-4 border-t" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className={`px-4 py-2 rounded-xl text-xs font-bold ${step === 1 ? 'opacity-30 cursor-not-allowed' : ''} ${theme.secondaryBg} ${theme.highlight}`}
          >
            ← Previous
          </button>
          {step < totalSteps ? (
            <button
              onClick={() => setStep(step + 1)}
              className={`px-5 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}
            >
              Next →
            </button>
          ) : (
            <button
              onClick={() => window.alert('Data import started! This will take approximately 20 minutes. (Blueprint demo)')}
              className="px-5 py-2 bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2"
            >
              <ArrowDownToLine size={14} /> Start Import
            </button>
          )}
        </div>
      </div>

      {/* Recent Migrations Table */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Recent Migrations</h3>
        <DataTable
          headers={['ID', 'School', 'Source', 'Date', 'Records', 'Tables', 'Duration', 'Status']}
          rows={recentMigrations.map(m => [
            <span key="id" className={`text-xs font-mono ${theme.primaryText}`}>{m.id}</span>,
            <span key="school" className={`text-xs font-bold ${theme.highlight}`}>{m.school}</span>,
            <span key="src" className={`text-xs ${theme.iconColor}`}>{m.source}</span>,
            <span key="date" className={`text-xs ${theme.iconColor}`}>{m.date}</span>,
            <span key="records" className={`text-xs font-bold ${theme.highlight}`}>{m.records}</span>,
            <span key="tables" className={`text-xs ${theme.iconColor}`}>{m.tables}</span>,
            <span key="duration" className={`text-xs ${theme.iconColor}`}>{m.duration}</span>,
            <StatusBadge key="status" status={m.status === 'Completed' ? 'Active' : 'Pending'} theme={theme} />,
          ])}
          theme={theme}
        />
      </div>
    </div>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────
function SuperAdminDashboard({ theme, themeIdx, onThemeChange }: { theme?: Theme; themeIdx?: number; onThemeChange?: (idx: number) => void }) {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [showWizard, setShowWizard] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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
      case 'resellers': return <ResellerManagementModule theme={theme} />;
      case 'am-assignment': return <AMAssignmentView theme={theme} />;
      case 'data-migration': return <DataMigrationView theme={theme} />;
      case 'audit': return <AuditLogsView theme={theme} />;
      case 'communication': return <CommunicationModule theme={theme} />;
      case 'profile': return <StakeholderProfile role="super-admin" theme={theme} onClose={() => setActiveModule('dashboard')} themeIdx={themeIdx} onThemeChange={onThemeChange} />;
      default: return <DashboardView theme={theme} setActiveModule={setActiveModule} onStartWizard={() => setShowWizard(true)} />;
    }
  };

  return (
    <div className="flex gap-4 -m-6">
      {/* Module sidebar */}
      <div className={`${sidebarCollapsed ? 'w-14' : 'w-48'} ${theme.cardBg} border-r ${theme.border} min-h-screen p-2 space-y-0.5 shrink-0 transition-all duration-200`}>
        <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} px-2 py-2`}>
          {!sidebarCollapsed && <p className={`text-[10px] font-bold ${theme.iconColor} uppercase px-1`}>Platform Admin</p>}
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className={`p-1 rounded-lg ${theme.buttonHover} ${theme.iconColor} transition-all`}>
            {sidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={14} />}
          </button>
        </div>
        {modules.map(m => (
          <button
            key={m.id}
            onClick={() => setActiveModule(m.id)}
            title={sidebarCollapsed ? m.label : undefined}
            className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2 py-2.5' : 'gap-2 px-3 py-2'} rounded-lg text-xs font-medium transition-all ${
              activeModule === m.id ? `${theme.primary} text-white` : `${theme.iconColor} ${theme.buttonHover}`
            }`}
          >
            <m.icon size={sidebarCollapsed ? 18 : 14} />
            {!sidebarCollapsed && m.label}
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

// ─── COMMUNICATION MODULE ────────────────────────────

function CommunicationModule({ theme }: { theme: Theme }) {
  const [commTab, setCommTab] = useState('Chat');
  const tabs = ['Platform Notices', 'Support Chat', 'Chat'];

  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Communication</h1>
      <TabBar tabs={tabs} active={commTab} onChange={setCommTab} theme={theme} />

      {commTab === 'Chat' && (
        <div className="h-[calc(100vh-220px)]">
          <ChatsView theme={theme} compact />
        </div>
      )}

      {commTab === 'Platform Notices' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-2`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-2`}>Platform-wide Notices</h3>
          {[
            { title: 'Scheduled Maintenance — 18 Feb 2026', detail: 'Platform will be under maintenance from 2:00 AM to 4:00 AM IST.', date: '14 Feb 2026', status: 'Scheduled' },
            { title: 'New Module Release: Advanced Analytics v2', detail: 'Enterprise plan schools now have access to the upgraded analytics dashboard.', date: '10 Feb 2026', status: 'Published' },
            { title: 'Security Patch Applied — v2.4.1', detail: 'Hotfix deployed for session timeout issue. No downtime.', date: '08 Feb 2026', status: 'Published' },
          ].map((n, i) => (
            <div key={i} className={`p-3 rounded-xl ${theme.accentBg} flex items-center justify-between`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>{n.title}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{n.detail}</p>
                <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>{n.date}</p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${n.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{n.status}</span>
            </div>
          ))}
        </div>
      )}

      {commTab === 'Support Chat' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-2`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-2`}>Recent Support Conversations</h3>
          {[
            { school: 'Delhi Public School', subject: 'Fee receipt format change request', lastMsg: 'We need the receipt header updated with new logo.', time: '2h ago', status: 'Open' },
            { school: 'Navrachana Vidyani', subject: 'GPS tracking not updating', lastMsg: 'Issue persists on Bus #4 route. Please check.', time: '4h ago', status: 'In Progress' },
            { school: 'Udgam School', subject: 'Bulk SMS delivery failure', lastMsg: 'Parent group messages not going through since yesterday.', time: '1d ago', status: 'Open' },
          ].map((c, i) => (
            <div key={i} className={`p-3 rounded-xl ${theme.accentBg}`}>
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-bold ${theme.highlight}`}>{c.school}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${c.status === 'Open' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>{c.status}</span>
              </div>
              <p className={`text-[10px] font-bold ${theme.primaryText}`}>{c.subject}</p>
              <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>{c.lastMsg}</p>
              <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>{c.time}</p>
            </div>
          ))}
        </div>
      )}
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
