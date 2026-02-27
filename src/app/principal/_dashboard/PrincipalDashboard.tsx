'use client';

import { useState } from 'react';
import { type Theme } from '@/lib/themes';
import {
  Home, BookOpen, Briefcase, ShieldCheck, MessageSquare,
  CalendarDays, CalendarClock, CheckCircle, BarChart3, Headphones,
  PanelLeftClose, PanelLeftOpen, ChevronDown, ClipboardCheck,
} from 'lucide-react';
import StakeholderProfile from '@/components/StakeholderProfile';
import SupportModule from '@/components/SupportModule';
import YourInputsModule from '@/components/YourInputsModule';
import { type TeamMember } from '@/lib/auth';

// ─── Module imports ──────────────────────────────────
import DashboardHome from '../_modules/DashboardHome';
import AcademicsModule from '../_modules/AcademicsModule';
import StaffOverviewModule from '../_modules/StaffOverviewModule';
import HRManagementModule from '../_modules/HRManagementModule';
import ComplianceModule from '../_modules/ComplianceModule';
import CommunicationModule from '../_modules/CommunicationModule';
import CalendarModule from '../_modules/CalendarModule';
import YearlyPlannerModule from '../_modules/YearlyPlannerModule';
import ApprovalsModule from '../_modules/ApprovalsModule';
import ReportsModule from '../_modules/ReportsModule';

// ─── MODULE SIDEBAR ────────────────────────────────
const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'academics', label: 'Academics', icon: BookOpen },
  { id: 'staff', label: 'Staff Overview', icon: Briefcase },
  { id: 'hr', label: 'HR Management', icon: Briefcase },
  { id: 'compliance', label: 'Compliance', icon: ShieldCheck },
  { id: 'communication', label: 'Communication', icon: MessageSquare },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays, subItems: [
    { id: 'yearly-planner', label: 'Yearly Planner', icon: CalendarClock },
  ]},
  { id: 'approvals', label: 'Approvals', icon: CheckCircle },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'your-inputs', label: 'Your Inputs', icon: ClipboardCheck },
  { id: 'support', label: 'Support', icon: Headphones },
];

export default function PrincipalDashboard({ theme, themeIdx, onThemeChange, isPreschool, currentUser }: { theme?: Theme; themeIdx?: number; onThemeChange?: (idx: number) => void; isPreschool?: boolean; currentUser?: TeamMember }) {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedParent, setExpandedParent] = useState<string | null>(null);
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
        {modules.map(m => {
          const hasSubItems = 'subItems' in m && m.subItems && m.subItems.length > 0;
          const isParentExpanded = expandedParent === m.id;
          const isParentActive = activeModule === m.id || (hasSubItems && m.subItems!.some(s => activeModule === s.id));
          return (
            <div key={m.id}>
              <button
                onClick={() => {
                  if (hasSubItems && !sidebarCollapsed) {
                    setExpandedParent(isParentExpanded ? null : m.id);
                  }
                  setActiveModule(m.id);
                }}
                title={sidebarCollapsed ? m.label : undefined}
                className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2 py-2.5' : 'gap-2 px-3 py-2'} rounded-lg text-xs font-medium transition-all ${
                  isParentActive ? `${theme.primary} text-white` : `${theme.iconColor} ${theme.buttonHover}`
                }`}
              >
                <m.icon size={sidebarCollapsed ? 20 : 14} />
                {!sidebarCollapsed && <span className="flex-1 text-left">{m.label}</span>}
                {!sidebarCollapsed && hasSubItems && (
                  <ChevronDown size={12} className={`transition-transform ${isParentExpanded ? 'rotate-180' : ''}`} />
                )}
              </button>
              {/* Sub-items for Calendar */}
              {hasSubItems && !sidebarCollapsed && isParentExpanded && m.subItems!.map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setActiveModule(sub.id)}
                  className={`w-full flex items-center gap-2 pl-8 pr-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                    activeModule === sub.id ? `${theme.primary} text-white` : `${theme.iconColor} ${theme.buttonHover}`
                  }`}
                >
                  <sub.icon size={12} /> {sub.label}
                </button>
              ))}
            </div>
          );
        })}
      </div>

      {/* Module content */}
      <div className="flex-1 p-6 space-y-4 overflow-x-hidden">
        {activeModule === 'dashboard' && <DashboardHome theme={theme} onProfileClick={() => setActiveModule('profile')} isPreschool={isPreschool} />}
        {activeModule === 'academics' && <AcademicsModule theme={theme} />}
        {activeModule === 'staff' && <StaffOverviewModule theme={theme} />}
        {activeModule === 'hr' && <HRManagementModule theme={theme} />}
        {activeModule === 'compliance' && <ComplianceModule theme={theme} isPreschool={isPreschool} />}
        {activeModule === 'communication' && <CommunicationModule theme={theme} />}
        {activeModule === 'calendar' && <CalendarModule theme={theme} />}
        {activeModule === 'yearly-planner' && <YearlyPlannerModule theme={theme} />}
        {activeModule === 'approvals' && <ApprovalsModule theme={theme} />}
        {activeModule === 'reports' && <ReportsModule theme={theme} />}
        {activeModule === 'your-inputs' && <YourInputsModule theme={theme} userName={currentUser?.name || ''} />}
        {activeModule === 'support' && <SupportModule theme={theme} role="principal" />}
        {activeModule === 'profile' && <StakeholderProfile role="principal" theme={theme} onClose={() => setActiveModule('dashboard')} themeIdx={themeIdx} onThemeChange={onThemeChange} />}
      </div>
    </div>
  );
}
