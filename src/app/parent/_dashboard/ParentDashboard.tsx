'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import SupportModule from '@/components/SupportModule';
import StakeholderProfile from '@/components/StakeholderProfile';
import YourInputsModule from '@/components/YourInputsModule';
import { type TeamMember } from '@/lib/auth';
import ChildSelector from '../_components/ChildSelector';
import { childrenData, modules } from '../_components/data';
import DashboardHome from '../_modules/DashboardHome';
import AttendanceModule from '../_modules/AttendanceModule';
import AcademicsModule from '../_modules/AcademicsModule';
import FeesModule from '../_modules/FeesModule';
import HomeworkModule from '../_modules/HomeworkModule';
import CommunicationModule from '../_modules/CommunicationModule';
import TransportModule from '../_modules/TransportModule';
import PickupAuthModule from '../_modules/PickupAuthModule';

export default function ParentDashboard({ theme, themeIdx, onThemeChange, currentUser }: { theme?: Theme; themeIdx?: number; onThemeChange?: (idx: number) => void; currentUser?: TeamMember }) {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [selectedChild, setSelectedChild] = useState('child1');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  if (!theme) return null;

  const child = childrenData.find(c => c.id === selectedChild)!;

  return (
    <div className="flex gap-4 -m-6">
      {/* Module sidebar */}
      <div className={`${sidebarCollapsed ? 'w-14' : 'w-48'} ${theme.cardBg} border-r ${theme.border} min-h-screen p-2 space-y-0.5 shrink-0 transition-all duration-200`}>
        <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} px-2 py-2`}>
          {!sidebarCollapsed && <p className={`text-[10px] font-bold ${theme.iconColor} uppercase px-1`}>Parent Portal</p>}
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

        {/* Parent Info */}
        {!sidebarCollapsed && (
          <div className={`mt-4 pt-4 border-t ${theme.border} px-3`}>
            <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-2`}>Logged in as</p>
            <div className={`p-2 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-xs font-bold ${theme.highlight}`}>Rajesh Patel</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Father</p>
              <p className={`text-[10px] ${theme.iconColor}`}>+91 98250 12345</p>
            </div>
          </div>
        )}
      </div>

      {/* Module content */}
      <div className="flex-1 p-6 space-y-0 overflow-x-hidden">
        {/* Child Selector - Always visible at top */}
        <ChildSelector selected={selectedChild} onChange={setSelectedChild} theme={theme}>
          {childrenData}
        </ChildSelector>

        {activeModule === 'dashboard' && <DashboardHome theme={theme} child={child} onProfileClick={() => setActiveModule('profile')} />}
        {activeModule === 'attendance' && <AttendanceModule theme={theme} child={child} />}
        {activeModule === 'academics' && <AcademicsModule theme={theme} child={child} />}
        {activeModule === 'fees' && <FeesModule theme={theme} child={child} />}
        {activeModule === 'homework' && <HomeworkModule theme={theme} child={child} />}
        {activeModule === 'communication' && <CommunicationModule theme={theme} child={child} />}
        {activeModule === 'transport' && <TransportModule theme={theme} child={child} />}
        {activeModule === 'pickup' && <PickupAuthModule theme={theme} child={child} />}
        {activeModule === 'your-inputs' && <YourInputsModule theme={theme} userName={currentUser?.name || ''} />}
        {activeModule === 'support' && <SupportModule theme={theme} role="parent" />}
        {activeModule === 'profile' && <StakeholderProfile role="parent" theme={theme} onClose={() => setActiveModule('dashboard')} themeIdx={themeIdx} onThemeChange={onThemeChange} />}
      </div>
    </div>
  );
}
