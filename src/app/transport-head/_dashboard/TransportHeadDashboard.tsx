'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import StakeholderProfile from '@/components/StakeholderProfile';
import SupportModule from '@/components/SupportModule';
import YourInputsModule from '@/components/YourInputsModule';
import { type TeamMember } from '@/lib/auth';
import {
  Home, Route, Car, Users, MapPinned, Wrench, Navigation, IndianRupee,
  MessageSquare, Headphones, UserCheck, UserPlus, GraduationCap,
  PanelLeftClose, PanelLeftOpen, ClipboardCheck, CreditCard
} from 'lucide-react';

import DashboardHome from '../_modules/DashboardHome';
import RoutesModule from '../_modules/RoutesModule';
import VehiclesModule from '../_modules/VehiclesModule';
import DriversModule from '../_modules/DriversModule';
import GPSTrackingModule from '../_modules/GPSTrackingModule';
import MaintenanceModule from '../_modules/MaintenanceModule';
import StopsModule from '../_modules/StopsModule';
import LadyAttendantModule from '../_modules/LadyAttendantModule';
import DriverAssistantModule from '../_modules/DriverAssistantModule';
import TransportStudentsModule from '../_modules/TransportStudentsModule';
import FeesModule from '../_modules/FeesModule';
import CommunicationModule from '../_modules/CommunicationModule';
import BusPassModule from '../_modules/BusPassModule';

// ─── MODULE SIDEBAR ────────────────────────────────
const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'routes', label: 'Routes', icon: Route },
  { id: 'stops', label: 'Stops', icon: MapPinned },
  { id: 'vehicles', label: 'Vehicles', icon: Car },
  { id: 'drivers', label: 'Drivers', icon: Users },
  { id: 'lady-attendant', label: 'Lady Attendants', icon: UserCheck },
  { id: 'driver-assistant', label: 'Driver Assistants', icon: UserPlus },
  { id: 'students', label: 'Students', icon: GraduationCap },
  { id: 'gps-tracking', label: 'GPS Tracking', icon: Navigation },
  { id: 'maintenance', label: 'Maintenance', icon: Wrench },
  { id: 'bus-pass', label: 'Bus Pass', icon: CreditCard },
  { id: 'fees', label: 'Fees', icon: IndianRupee },
  { id: 'communication', label: 'Communication', icon: MessageSquare },
  { id: 'your-inputs', label: 'Your Inputs', icon: ClipboardCheck },
  { id: 'support', label: 'Support', icon: Headphones },
];

export default function TransportHeadDashboard({ theme, themeIdx, onThemeChange, currentUser }: { theme?: Theme; themeIdx?: number; onThemeChange?: (idx: number) => void; currentUser?: TeamMember }) {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showLogMaintenance, setShowLogMaintenance] = useState(false);
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
        {activeModule === 'dashboard' && <DashboardHome theme={theme} onProfileClick={() => setActiveModule('profile')} setActiveModule={setActiveModule} onLogMaintenance={() => { setShowLogMaintenance(true); setActiveModule('maintenance'); }} />}
        {activeModule === 'routes' && <RoutesModule theme={theme} />}
        {activeModule === 'vehicles' && <VehiclesModule theme={theme} />}
        {activeModule === 'drivers' && <DriversModule theme={theme} />}
        {activeModule === 'gps-tracking' && <GPSTrackingModule theme={theme} />}
        {activeModule === 'stops' && <StopsModule theme={theme} />}
        {activeModule === 'lady-attendant' && <LadyAttendantModule theme={theme} />}
        {activeModule === 'driver-assistant' && <DriverAssistantModule theme={theme} />}
        {activeModule === 'students' && <TransportStudentsModule theme={theme} />}
        {activeModule === 'maintenance' && <MaintenanceModule theme={theme} showLogMaintenance={showLogMaintenance} setShowLogMaintenance={setShowLogMaintenance} />}
        {activeModule === 'bus-pass' && <BusPassModule theme={theme} />}
        {activeModule === 'fees' && <FeesModule theme={theme} />}
        {activeModule === 'communication' && <CommunicationModule theme={theme} />}
        {activeModule === 'your-inputs' && <YourInputsModule theme={theme} userName={currentUser?.name || ''} />}
        {activeModule === 'support' && <SupportModule theme={theme} role="transport-head" />}
        {activeModule === 'profile' && <StakeholderProfile role="transport-head" theme={theme} onClose={() => setActiveModule('dashboard')} themeIdx={themeIdx} onThemeChange={onThemeChange} />}
      </div>
    </div>
  );
}
