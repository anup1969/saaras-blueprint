'use client';

import React, { useState } from 'react';
import OnboardingWizard from '@/components/OnboardingWizard';
import StakeholderProfile from '@/components/StakeholderProfile';
import YourInputsModule from '@/components/YourInputsModule';
import { type Theme } from '@/lib/themes';
import { type TeamMember } from '@/lib/auth';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { modules } from '../_modules/mockData';
import DashboardView from '../_modules/DashboardView';
import SchoolsView from '../_modules/SchoolsView';
import PlansView from '../_modules/PlansView';
import UsersView from '../_modules/UsersView';
import ModulesConfigView from '../_modules/ModulesConfigView';
import OnboardingView from '../_modules/OnboardingView';
import SupportView from '../_modules/SupportView';
import AnalyticsView from '../_modules/AnalyticsView';
import SystemConfigView from '../_modules/SystemConfigView';
import AuditLogsView from '../_modules/AuditLogsView';
import ResellerManagementModule from '../_modules/ResellerManagementModule';
import AMAssignmentView from '../_modules/AMAssignmentView';
import DataMigrationView from '../_modules/DataMigrationView';
import CommunicationModule from '../_modules/CommunicationModule';

export default function SuperAdminDashboard({ theme, themeIdx, onThemeChange, currentUser }: { theme?: Theme; themeIdx?: number; onThemeChange?: (idx: number) => void; currentUser?: TeamMember }) {
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
      case 'your-inputs': return <YourInputsModule theme={theme} userName={currentUser?.name || ''} />;
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
