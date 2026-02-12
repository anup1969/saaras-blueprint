'use client';

import React, { useState } from 'react';
import BlueprintLayout from '@/components/BlueprintLayout';
import { StatCard, TabBar, StatusBadge, SearchBar, DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import StakeholderProfile from '@/components/StakeholderProfile';
import {
  Home, Building2, Headphones, BarChart3, RefreshCcw, Rocket,
  Search, Filter, Download, Eye, Edit, Phone, Mail, MessageSquare,
  TrendingUp, Users, AlertTriangle, CheckCircle, Clock, Star,
  Activity, Target, Calendar, ArrowRight, Zap, Shield,
  ThumbsUp, Percent, DollarSign, UserCheck, User,
  PanelLeftClose, PanelLeftOpen
} from 'lucide-react';

// ─── MODULE SIDEBAR ────────────────────────────────
const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'my-schools', label: 'My Schools', icon: Building2 },
  { id: 'tickets', label: 'Support Tickets', icon: Headphones },
  { id: 'analytics', label: 'Usage Analytics', icon: BarChart3 },
  { id: 'renewals', label: 'Renewals', icon: RefreshCcw },
  { id: 'onboarding', label: 'Onboarding', icon: Rocket },
];

// ─── MOCK DATA ─────────────────────────────────────
const mockSchools = [
  { name: 'Delhi Public School', plan: 'Enterprise', health: 'Green', usersActive: 342, lastContact: '2026-02-10', mrr: '₹1,85,000', modules: 22, adoption: 91, nps: 9, loginFreq: '94%' },
  { name: 'Navrachana Vidyani', plan: 'Professional', health: 'Yellow', usersActive: 178, lastContact: '2026-02-04', mrr: '₹95,000', modules: 16, adoption: 72, nps: 7, loginFreq: '78%' },
  { name: 'Zydus School', plan: 'Enterprise', health: 'Green', usersActive: 256, lastContact: '2026-02-08', mrr: '₹1,45,000', modules: 19, adoption: 85, nps: 8, loginFreq: '88%' },
  { name: 'Udgam School', plan: 'Starter', health: 'Red', usersActive: 64, lastContact: '2026-01-22', mrr: '₹42,000', modules: 8, adoption: 45, nps: 5, loginFreq: '52%' },
];

const mockTickets = [
  { id: 'TKT-2041', school: 'Delhi Public School', subject: 'Fee module PDF export not working', priority: 'High', status: 'Open', sla: '4h remaining', created: '2026-02-12' },
  { id: 'TKT-2038', school: 'Udgam School', subject: 'Unable to bulk upload student data', priority: 'Urgent', status: 'Escalated', sla: '1h remaining', created: '2026-02-11' },
  { id: 'TKT-2035', school: 'Navrachana Vidyani', subject: 'Timetable clash detection false positives', priority: 'Normal', status: 'In Progress', sla: '18h remaining', created: '2026-02-10' },
  { id: 'TKT-2030', school: 'Zydus School', subject: 'Parent app push notifications delayed', priority: 'High', status: 'Open', sla: '6h remaining', created: '2026-02-09' },
  { id: 'TKT-2027', school: 'Delhi Public School', subject: 'Custom report builder timeout on large datasets', priority: 'Normal', status: 'Resolved', sla: 'Completed', created: '2026-02-07' },
  { id: 'TKT-2022', school: 'Navrachana Vidyani', subject: 'SSO integration with Google Workspace', priority: 'Normal', status: 'In Progress', sla: '24h remaining', created: '2026-02-05' },
];

const mockRenewals = [
  { school: 'Delhi Public School', plan: 'Enterprise', renewalDate: '2026-04-15', mrr: '₹1,85,000', risk: 'Low', lastReview: '2026-02-08', yearsWithUs: 3, sentiment: 'Very Happy' },
  { school: 'Navrachana Vidyani', plan: 'Professional', renewalDate: '2026-03-01', mrr: '₹95,000', risk: 'Medium', lastReview: '2026-02-04', yearsWithUs: 1, sentiment: 'Neutral' },
  { school: 'Zydus School', plan: 'Enterprise', renewalDate: '2026-06-20', mrr: '₹1,45,000', risk: 'Low', lastReview: '2026-02-08', yearsWithUs: 2, sentiment: 'Happy' },
  { school: 'Udgam School', plan: 'Starter', renewalDate: '2026-03-10', mrr: '₹42,000', risk: 'High', lastReview: '2026-01-22', yearsWithUs: 1, sentiment: 'Unhappy' },
];

const mockOnboarding = [
  { school: 'Anand Niketan School', stage: 'Data Migration', dataMigration: 65, trainingSessions: '3 / 8', goLive: '2026-03-15', assignedSince: '2026-01-10', contactPerson: 'Mrs. Patel' },
  { school: 'Eklavya School', stage: 'Training', dataMigration: 100, trainingSessions: '5 / 8', goLive: '2026-02-28', assignedSince: '2025-12-20', contactPerson: 'Mr. Desai' },
  { school: 'Calorx Public School', stage: 'Contract Signed', dataMigration: 0, trainingSessions: '0 / 8', goLive: '2026-04-01', assignedSince: '2026-02-05', contactPerson: 'Dr. Shah' },
  { school: 'Vibgyor High', stage: 'UAT Testing', dataMigration: 100, trainingSessions: '8 / 8', goLive: '2026-02-20', assignedSince: '2025-11-15', contactPerson: 'Ms. Mehta' },
];

const moduleUsageData = [
  { module: 'Student Management', dps: 98, nav: 92, zydus: 95, udgam: 78 },
  { module: 'Fee Management', dps: 96, nav: 88, zydus: 91, udgam: 65 },
  { module: 'Attendance', dps: 94, nav: 85, zydus: 89, udgam: 42 },
  { module: 'Timetable', dps: 90, nav: 78, zydus: 85, udgam: 35 },
  { module: 'Communication', dps: 88, nav: 72, zydus: 82, udgam: 55 },
  { module: 'Transport', dps: 85, nav: 68, zydus: 79, udgam: 20 },
  { module: 'Reports', dps: 82, nav: 45, zydus: 72, udgam: 18 },
  { module: 'HR & Payroll', dps: 78, nav: 40, zydus: 68, udgam: 0 },
  { module: 'Certificates', dps: 72, nav: 35, zydus: 65, udgam: 10 },
  { module: 'Visitor Management', dps: 70, nav: 30, zydus: 60, udgam: 0 },
];

// ─── HEALTH DOT COMPONENT ──────────────────────────
function HealthDot({ health, theme }: { health: string; theme: Theme }) {
  const colors: Record<string, string> = {
    Green: 'bg-emerald-500',
    Yellow: 'bg-amber-400',
    Red: 'bg-red-500',
  };
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2.5 h-2.5 rounded-full ${colors[health] || 'bg-slate-400'}`} />
      <span className={`text-xs font-bold ${theme.highlight}`}>{health}</span>
    </div>
  );
}

// ─── PROGRESS BAR COMPONENT ────────────────────────
function ProgressBar({ value, theme }: { value: number; theme: Theme }) {
  const color = value >= 80 ? 'bg-emerald-500' : value >= 50 ? 'bg-amber-400' : 'bg-red-500';
  return (
    <div className="flex items-center gap-2">
      <div className={`flex-1 h-2 rounded-full ${theme.secondaryBg}`}>
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className={`text-xs font-bold ${theme.highlight} w-8 text-right`}>{value}%</span>
    </div>
  );
}

// ─── USAGE BAR (MINI) ──────────────────────────────
function UsageBar({ value, theme }: { value: number; theme: Theme }) {
  const color = value >= 80 ? 'bg-emerald-500' : value >= 50 ? 'bg-amber-400' : value > 0 ? 'bg-red-400' : 'bg-slate-300';
  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-16 h-1.5 rounded-full ${theme.secondaryBg}`}>
        <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className={`text-[10px] ${theme.iconColor} w-7 text-right`}>{value}%</span>
    </div>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────
function AccountManagerDashboard({ theme, themeIdx, onThemeChange }: { theme?: Theme; themeIdx?: number; onThemeChange?: (idx: number) => void }) {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  if (!theme) return null;

  return (
    <div className="flex gap-4 -m-6">
      {/* Module sidebar */}
      <div className={`${sidebarCollapsed ? 'w-14' : 'w-48'} ${theme.cardBg} border-r ${theme.border} min-h-screen p-2 space-y-0.5 shrink-0 transition-all duration-200`}>
        <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} px-2 py-2`}>
          {!sidebarCollapsed && <p className={`text-[10px] font-bold ${theme.iconColor} uppercase px-1`}>Modules</p>}
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
            <m.icon size={sidebarCollapsed ? 18 : 14} /> {!sidebarCollapsed && m.label}
          </button>
        ))}
      </div>

      {/* Module content */}
      <div className="flex-1 p-6 space-y-4 overflow-x-hidden">
        {activeModule === 'dashboard' && <DashboardHome theme={theme} onProfileClick={() => setActiveModule('profile')} />}
        {activeModule === 'my-schools' && <MySchoolsModule theme={theme} />}
        {activeModule === 'tickets' && <TicketsModule theme={theme} />}
        {activeModule === 'analytics' && <AnalyticsModule theme={theme} />}
        {activeModule === 'renewals' && <RenewalsModule theme={theme} />}
        {activeModule === 'onboarding' && <OnboardingModule theme={theme} />}
        {activeModule === 'profile' && <StakeholderProfile role="account-manager" theme={theme} onClose={() => setActiveModule('dashboard')} themeIdx={themeIdx} onThemeChange={onThemeChange} />}
      </div>
    </div>
  );
}

// ─── DASHBOARD HOME ────────────────────────────────
function DashboardHome({ theme, onProfileClick }: { theme: Theme; onProfileClick: () => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${theme.highlight}`}>Account Manager Dashboard</h1>
          <p className={`text-xs ${theme.iconColor}`}>Welcome back, Riya. Here is your portfolio overview for today.</p>
        </div>
        <button onClick={onProfileClick} title="My Profile" className={`w-9 h-9 rounded-full ${theme.primary} text-white flex items-center justify-center text-xs font-bold hover:opacity-90 transition-opacity`}>SP</button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Building2} label="Assigned Schools" value={4} color="bg-blue-500" sub="2 Enterprise, 1 Pro, 1 Starter" theme={theme} />
        <StatCard icon={Headphones} label="Open Tickets" value={5} color="bg-amber-500" sub="1 urgent, 2 high" theme={theme} />
        <StatCard icon={RefreshCcw} label="Upcoming Renewals" value={2} color="bg-purple-500" sub="within 30 days" theme={theme} />
        <StatCard icon={DollarSign} label="Portfolio MRR" value="₹4.67L" color="bg-emerald-500" sub="+8% vs last quarter" theme={theme} />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={ThumbsUp} label="Avg NPS Score" value="7.3" color="bg-indigo-500" sub="target: 8.0" theme={theme} />
        <StatCard icon={Activity} label="Avg Health Score" value="73%" color="bg-teal-500" theme={theme} />
        <StatCard icon={Percent} label="Avg Adoption Rate" value="73%" color="bg-orange-500" sub="across all schools" theme={theme} />
        <StatCard icon={Rocket} label="Onboarding Pipeline" value={4} color="bg-pink-500" sub="1 going live this week" theme={theme} />
      </div>

      {/* Portfolio Health at a Glance */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Portfolio Health at a Glance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {mockSchools.map(s => (
            <div key={s.name} className={`p-3 rounded-xl ${theme.accentBg} border ${theme.border}`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-bold ${theme.highlight}`}>{s.name}</span>
                <HealthDot health={s.health} theme={theme} />
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className={`text-[10px] ${theme.iconColor}`}>MRR</span>
                  <span className={`text-[10px] font-bold ${theme.highlight}`}>{s.mrr}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-[10px] ${theme.iconColor}`}>Adoption</span>
                  <span className={`text-[10px] font-bold ${theme.highlight}`}>{s.adoption}%</span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-[10px] ${theme.iconColor}`}>NPS</span>
                  <span className={`text-[10px] font-bold ${s.nps >= 8 ? 'text-emerald-600' : s.nps >= 6 ? 'text-amber-600' : 'text-red-600'}`}>{s.nps}/10</span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-[10px] ${theme.iconColor}`}>Active Users</span>
                  <span className={`text-[10px] font-bold ${theme.highlight}`}>{s.usersActive}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Items & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Action Items */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Priority Action Items</h3>
          <div className="space-y-2">
            {[
              { text: 'Udgam School health critical -- schedule check-in call', type: 'urgent', icon: AlertTriangle },
              { text: 'Navrachana renewal in 17 days -- prepare renewal deck', type: 'warning', icon: RefreshCcw },
              { text: 'TKT-2038 Udgam escalated -- resolve within 1h', type: 'urgent', icon: Headphones },
              { text: 'Vibgyor High go-live in 8 days -- confirm UAT sign-off', type: 'info', icon: Rocket },
              { text: 'DPS quarterly business review due next week', type: 'info', icon: Calendar },
            ].map((a, i) => (
              <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${
                a.type === 'urgent' ? 'bg-red-50 border border-red-200' : a.type === 'warning' ? 'bg-amber-50 border border-amber-200' : `${theme.accentBg} border ${theme.border}`
              }`}>
                <a.icon size={14} className={a.type === 'urgent' ? 'text-red-500' : a.type === 'warning' ? 'text-amber-500' : theme.iconColor} />
                <p className={`text-xs ${theme.highlight} flex-1`}>{a.text}</p>
                <ArrowRight size={12} className={theme.iconColor} />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Recent Activity</h3>
          <div className="space-y-2">
            {[
              { text: 'Resolved TKT-2027: Custom report builder timeout for DPS', time: '2 hours ago', dot: 'bg-emerald-500' },
              { text: 'Completed training session #5 with Eklavya School', time: '4 hours ago', dot: 'bg-blue-500' },
              { text: 'Sent renewal proposal to Navrachana Vidyani', time: 'Yesterday', dot: 'bg-purple-500' },
              { text: 'Health check call with Udgam School -- flagged at-risk', time: 'Yesterday', dot: 'bg-red-500' },
              { text: 'Onboarded Calorx Public School -- contract signed', time: '2 days ago', dot: 'bg-teal-500' },
              { text: 'QBR presentation delivered to Zydus School management', time: '3 days ago', dot: 'bg-indigo-500' },
            ].map((a, i) => (
              <div key={i} className={`flex items-center gap-3 p-2 rounded-xl ${theme.accentBg}`}>
                <div className={`w-2 h-2 rounded-full shrink-0 ${a.dot}`} />
                <p className={`text-xs ${theme.highlight} flex-1`}>{a.text}</p>
                <span className={`text-[10px] ${theme.iconColor} whitespace-nowrap`}>{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MY SCHOOLS MODULE ─────────────────────────────
function MySchoolsModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All Schools');
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>My Schools</h1>
        <div className="flex gap-2">
          <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Download size={12} /> Export</button>
        </div>
      </div>
      <TabBar tabs={['All Schools', 'Enterprise', 'Professional', 'Starter', 'At Risk']} active={tab} onChange={setTab} theme={theme} />
      <div className="flex gap-3">
        <SearchBar placeholder="Search by school name, plan..." theme={theme} icon={Search} />
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Filter size={12} /> Filter</button>
      </div>
      <DataTable
        headers={['School', 'Plan', 'Health', 'Active Users', 'Modules', 'Adoption', 'NPS', 'MRR', 'Last Contact', '']}
        rows={mockSchools
          .filter(s => {
            if (tab === 'All Schools') return true;
            if (tab === 'At Risk') return s.health === 'Red';
            return s.plan === tab;
          })
          .map(s => [
            <span key="name" className={`font-bold ${theme.highlight}`}>{s.name}</span>,
            <StatusBadge key="plan" status={s.plan} theme={theme} />,
            <HealthDot key="health" health={s.health} theme={theme} />,
            <span key="users" className={`text-xs font-bold ${theme.highlight}`}>{s.usersActive}</span>,
            <span key="modules" className={`text-xs ${theme.iconColor}`}>{s.modules} / 27</span>,
            <ProgressBar key="adoption" value={s.adoption} theme={theme} />,
            <span key="nps" className={`text-xs font-bold ${s.nps >= 8 ? 'text-emerald-600' : s.nps >= 6 ? 'text-amber-600' : 'text-red-600'}`}>{s.nps}/10</span>,
            <span key="mrr" className={`text-xs font-bold ${theme.highlight}`}>{s.mrr}</span>,
            <span key="contact" className={`text-xs ${theme.iconColor}`}>{s.lastContact}</span>,
            <div key="actions" className="flex gap-1">
              <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
              <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Phone size={12} className={theme.iconColor} /></button>
              <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Mail size={12} className={theme.iconColor} /></button>
            </div>
          ])}
        theme={theme}
      />
      <div className={`flex items-center justify-between text-xs ${theme.iconColor} px-2`}>
        <span>Showing {mockSchools.filter(s => {
          if (tab === 'All Schools') return true;
          if (tab === 'At Risk') return s.health === 'Red';
          return s.plan === tab;
        }).length} of {mockSchools.length} schools</span>
      </div>
    </div>
  );
}

// ─── SUPPORT TICKETS MODULE ────────────────────────
function TicketsModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All Tickets');
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Support Tickets</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Headphones size={14} /> Create Ticket</button>
      </div>
      <TabBar tabs={['All Tickets', 'Open', 'In Progress', 'Escalated', 'Resolved']} active={tab} onChange={setTab} theme={theme} />
      <div className="flex gap-3">
        <SearchBar placeholder="Search by ticket ID, school, subject..." theme={theme} icon={Search} />
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Filter size={12} /> Filter</button>
      </div>

      {/* SLA Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className={`${theme.cardBg} rounded-xl border ${theme.border} p-3 text-center`}>
          <p className={`text-lg font-bold text-red-500`}>1</p>
          <p className={`text-[10px] ${theme.iconColor}`}>SLA Breaching</p>
        </div>
        <div className={`${theme.cardBg} rounded-xl border ${theme.border} p-3 text-center`}>
          <p className={`text-lg font-bold text-amber-500`}>2</p>
          <p className={`text-[10px] ${theme.iconColor}`}>SLA At Risk</p>
        </div>
        <div className={`${theme.cardBg} rounded-xl border ${theme.border} p-3 text-center`}>
          <p className={`text-lg font-bold text-emerald-500`}>2</p>
          <p className={`text-[10px] ${theme.iconColor}`}>Within SLA</p>
        </div>
        <div className={`${theme.cardBg} rounded-xl border ${theme.border} p-3 text-center`}>
          <p className={`text-lg font-bold ${theme.highlight}`}>4.2h</p>
          <p className={`text-[10px] ${theme.iconColor}`}>Avg Resolution Time</p>
        </div>
      </div>

      <DataTable
        headers={['Ticket ID', 'School', 'Subject', 'Priority', 'Status', 'SLA', 'Created', '']}
        rows={mockTickets
          .filter(t => {
            if (tab === 'All Tickets') return true;
            return t.status === tab;
          })
          .map(t => [
            <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{t.id}</span>,
            <span key="school" className={`text-xs font-bold ${theme.highlight}`}>{t.school}</span>,
            <span key="subject" className={`text-xs ${theme.highlight}`}>{t.subject}</span>,
            <StatusBadge key="priority" status={t.priority} theme={theme} />,
            <StatusBadge key="status" status={t.status} theme={theme} />,
            <span key="sla" className={`text-xs font-bold ${
              t.sla.includes('1h') ? 'text-red-600' : t.sla.includes('4h') || t.sla.includes('6h') ? 'text-amber-600' : t.sla === 'Completed' ? 'text-emerald-600' : theme.iconColor
            }`}>{t.sla}</span>,
            <span key="created" className={`text-xs ${theme.iconColor}`}>{t.created}</span>,
            <div key="actions" className="flex gap-1">
              <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
              <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><MessageSquare size={12} className={theme.iconColor} /></button>
            </div>
          ])}
        theme={theme}
      />
    </div>
  );
}

// ─── USAGE ANALYTICS MODULE ────────────────────────
function AnalyticsModule({ theme }: { theme: Theme }) {
  const [selectedSchool, setSelectedSchool] = useState('all');
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Usage Analytics</h1>
        <div className="flex gap-2">
          <select
            value={selectedSchool}
            onChange={e => setSelectedSchool(e.target.value)}
            className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`}
          >
            <option value="all">All Schools</option>
            <option value="dps">Delhi Public School</option>
            <option value="nav">Navrachana Vidyani</option>
            <option value="zydus">Zydus School</option>
            <option value="udgam">Udgam School</option>
          </select>
          <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Download size={12} /> Export</button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Active Users" value={840} color="bg-blue-500" sub="across all schools" theme={theme} />
        <StatCard icon={Activity} label="Avg Daily Logins" value="78%" color="bg-teal-500" sub="last 30 days" theme={theme} />
        <StatCard icon={Target} label="Feature Adoption" value="73%" color="bg-indigo-500" sub="avg across portfolio" theme={theme} />
        <StatCard icon={Zap} label="API Calls / Day" value="12.4K" color="bg-orange-500" sub="avg across schools" theme={theme} />
      </div>

      {/* Login Frequency by School */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Login Frequency by School (Last 30 Days)</h3>
        <div className="space-y-3">
          {mockSchools.map(s => (
            <div key={s.name} className="flex items-center gap-3">
              <span className={`text-xs ${theme.highlight} w-40 shrink-0`}>{s.name}</span>
              <div className={`flex-1 h-4 rounded-full ${theme.secondaryBg} overflow-hidden`}>
                <div
                  className={`h-4 rounded-full ${parseInt(s.loginFreq) >= 80 ? 'bg-emerald-500' : parseInt(s.loginFreq) >= 60 ? 'bg-amber-400' : 'bg-red-400'}`}
                  style={{ width: s.loginFreq }}
                />
              </div>
              <span className={`text-xs font-bold ${theme.highlight} w-10 text-right`}>{s.loginFreq}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Module Usage Heatmap Table */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Module Adoption by School</h3>
        <DataTable
          headers={['Module', 'Delhi Public School', 'Navrachana Vidyani', 'Zydus School', 'Udgam School']}
          rows={moduleUsageData.map(m => [
            <span key="module" className={`text-xs font-bold ${theme.highlight}`}>{m.module}</span>,
            <UsageBar key="dps" value={m.dps} theme={theme} />,
            <UsageBar key="nav" value={m.nav} theme={theme} />,
            <UsageBar key="zydus" value={m.zydus} theme={theme} />,
            <UsageBar key="udgam" value={m.udgam} theme={theme} />,
          ])}
          theme={theme}
        />
      </div>

      {/* Low Adoption Alerts */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Low Adoption Alerts</h3>
        <div className="space-y-2">
          {[
            { school: 'Udgam School', module: 'Transport', adoption: 20, suggestion: 'Schedule transport module training session' },
            { school: 'Udgam School', module: 'Reports', adoption: 18, suggestion: 'Demo custom report builder capabilities' },
            { school: 'Udgam School', module: 'HR & Payroll', adoption: 0, suggestion: 'Module not activated -- initiate setup call' },
            { school: 'Navrachana Vidyani', module: 'Visitor Management', adoption: 30, suggestion: 'Share best practices from DPS implementation' },
            { school: 'Navrachana Vidyani', module: 'Reports', adoption: 45, suggestion: 'Offer advanced reporting workshop' },
          ].map((a, i) => (
            <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl bg-amber-50 border border-amber-200`}>
              <AlertTriangle size={14} className="text-amber-500 shrink-0" />
              <div className="flex-1">
                <p className={`text-xs font-bold ${theme.highlight}`}>{a.school} -- {a.module} ({a.adoption}%)</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{a.suggestion}</p>
              </div>
              <ArrowRight size={12} className={theme.iconColor} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── RENEWALS MODULE ───────────────────────────────
function RenewalsModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All Renewals');
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Renewals</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><RefreshCcw size={14} /> New Renewal Proposal</button>
      </div>
      <TabBar tabs={['All Renewals', 'Due in 30 Days', 'Low Risk', 'Medium Risk', 'High Risk']} active={tab} onChange={setTab} theme={theme} />

      {/* Renewal Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={RefreshCcw} label="Total Renewals" value={4} color="bg-purple-500" sub="this quarter" theme={theme} />
        <StatCard icon={DollarSign} label="Renewal Value" value="₹4.67L" color="bg-emerald-500" sub="total MRR at stake" theme={theme} />
        <StatCard icon={AlertTriangle} label="At Risk" value={1} color="bg-red-500" sub="Udgam School" theme={theme} />
        <StatCard icon={TrendingUp} label="Upsell Opportunity" value="₹53K" color="bg-blue-500" sub="2 schools eligible" theme={theme} />
      </div>

      <DataTable
        headers={['School', 'Plan', 'Renewal Date', 'MRR', 'Risk Level', 'Sentiment', 'Tenure', 'Last Review', '']}
        rows={mockRenewals
          .filter(r => {
            if (tab === 'All Renewals') return true;
            if (tab === 'Due in 30 Days') {
              const days = Math.ceil((new Date(r.renewalDate).getTime() - new Date('2026-02-12').getTime()) / (1000 * 60 * 60 * 24));
              return days <= 30;
            }
            if (tab === 'Low Risk') return r.risk === 'Low';
            if (tab === 'Medium Risk') return r.risk === 'Medium';
            if (tab === 'High Risk') return r.risk === 'High';
            return true;
          })
          .map(r => [
            <span key="school" className={`font-bold ${theme.highlight}`}>{r.school}</span>,
            <StatusBadge key="plan" status={r.plan} theme={theme} />,
            <span key="date" className={`text-xs font-bold ${
              Math.ceil((new Date(r.renewalDate).getTime() - new Date('2026-02-12').getTime()) / (1000 * 60 * 60 * 24)) <= 30 ? 'text-amber-600' : theme.highlight
            }`}>{r.renewalDate}</span>,
            <span key="mrr" className={`text-xs font-bold ${theme.highlight}`}>{r.mrr}</span>,
            <StatusBadge key="risk" status={r.risk === 'Low' ? 'Active' : r.risk === 'Medium' ? 'Pending' : 'Overdue'} theme={theme} />,
            <span key="sentiment" className={`text-xs ${
              r.sentiment === 'Very Happy' ? 'text-emerald-600' : r.sentiment === 'Happy' ? 'text-emerald-500' : r.sentiment === 'Neutral' ? 'text-amber-600' : 'text-red-600'
            } font-bold`}>{r.sentiment}</span>,
            <span key="tenure" className={`text-xs ${theme.iconColor}`}>{r.yearsWithUs} yr{r.yearsWithUs > 1 ? 's' : ''}</span>,
            <span key="review" className={`text-xs ${theme.iconColor}`}>{r.lastReview}</span>,
            <div key="actions" className="flex gap-1">
              <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
              <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Edit size={12} className={theme.iconColor} /></button>
            </div>
          ])}
        theme={theme}
      />

      {/* Upsell Opportunities */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Upsell Opportunities</h3>
        <div className="space-y-2">
          {[
            { school: 'Navrachana Vidyani', current: 'Professional', target: 'Enterprise', additionalMrr: '₹35,000', reason: 'School expanding to 2 new branches, needs multi-campus support' },
            { school: 'Udgam School', current: 'Starter', target: 'Professional', additionalMrr: '₹18,000', reason: 'Wants HR & Payroll, Transport modules -- not available in Starter' },
          ].map((u, i) => (
            <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${theme.accentBg} border ${theme.border}`}>
              <TrendingUp size={16} className="text-blue-500 shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold ${theme.highlight}`}>{u.school}</span>
                  <span className={`text-[10px] ${theme.iconColor}`}>{u.current}</span>
                  <ArrowRight size={10} className={theme.iconColor} />
                  <span className={`text-[10px] font-bold ${theme.primaryText}`}>{u.target}</span>
                </div>
                <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>{u.reason}</p>
              </div>
              <span className="text-xs font-bold text-emerald-600">+{u.additionalMrr}/mo</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ONBOARDING MODULE ─────────────────────────────
function OnboardingModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All');
  const stages = ['Contract Signed', 'Data Migration', 'Training', 'UAT Testing', 'Go Live'];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Onboarding Pipeline</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Rocket size={14} /> Add School</button>
      </div>
      <TabBar tabs={['All', 'Contract Signed', 'Data Migration', 'Training', 'UAT Testing']} active={tab} onChange={setTab} theme={theme} />

      {/* Pipeline Summary */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-4`}>Pipeline Stages</h3>
        <div className="flex items-center gap-1">
          {stages.map((stage, i) => {
            const count = mockOnboarding.filter(o => o.stage === stage).length;
            return (
              <React.Fragment key={stage}>
                <div className={`flex-1 p-3 rounded-xl text-center ${count > 0 ? theme.secondaryBg : theme.accentBg}`}>
                  <p className={`text-lg font-bold ${count > 0 ? theme.highlight : theme.iconColor}`}>{count}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{stage}</p>
                </div>
                {i < stages.length - 1 && <ArrowRight size={14} className={`${theme.iconColor} shrink-0`} />}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Onboarding Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {mockOnboarding
          .filter(o => tab === 'All' || o.stage === tab)
          .map((o, i) => (
            <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className={`text-sm font-bold ${theme.highlight}`}>{o.school}</h4>
                  <p className={`text-[10px] ${theme.iconColor}`}>Contact: {o.contactPerson} | Since: {o.assignedSince}</p>
                </div>
                <StatusBadge status={o.stage} theme={theme} />
              </div>

              <div className="space-y-3">
                {/* Data Migration Progress */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className={`text-[10px] ${theme.iconColor}`}>Data Migration</span>
                    <span className={`text-[10px] font-bold ${theme.highlight}`}>{o.dataMigration}%</span>
                  </div>
                  <div className={`w-full h-2 rounded-full ${theme.secondaryBg}`}>
                    <div
                      className={`h-2 rounded-full ${o.dataMigration === 100 ? 'bg-emerald-500' : o.dataMigration >= 50 ? 'bg-blue-500' : o.dataMigration > 0 ? 'bg-amber-400' : 'bg-slate-300'}`}
                      style={{ width: `${o.dataMigration}%` }}
                    />
                  </div>
                </div>

                {/* Training Sessions */}
                <div className="flex justify-between">
                  <span className={`text-[10px] ${theme.iconColor}`}>Training Sessions</span>
                  <span className={`text-[10px] font-bold ${theme.highlight}`}>{o.trainingSessions}</span>
                </div>

                {/* Go-Live Target */}
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] ${theme.iconColor}`}>Go-Live Target</span>
                  <span className={`text-[10px] font-bold ${
                    Math.ceil((new Date(o.goLive).getTime() - new Date('2026-02-12').getTime()) / (1000 * 60 * 60 * 24)) <= 14 ? 'text-amber-600' : theme.highlight
                  }`}>{o.goLive}</span>
                </div>

                {/* Days until go-live */}
                <div className={`flex items-center gap-2 p-2 rounded-lg ${theme.accentBg}`}>
                  <Clock size={12} className={theme.iconColor} />
                  <span className={`text-[10px] ${theme.iconColor}`}>
                    {Math.ceil((new Date(o.goLive).getTime() - new Date('2026-02-12').getTime()) / (1000 * 60 * 60 * 24))} days until go-live
                  </span>
                </div>
              </div>

              <div className="flex gap-2 mt-3">
                <button className={`flex-1 px-3 py-2 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.highlight} ${theme.buttonHover} transition-all`}>View Details</button>
                <button className={`px-3 py-2 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} transition-all`}><Phone size={12} className={theme.iconColor} /></button>
                <button className={`px-3 py-2 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} transition-all`}><Mail size={12} className={theme.iconColor} /></button>
              </div>
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
      <AccountManagerDashboard />
    </BlueprintLayout>
  );
}
