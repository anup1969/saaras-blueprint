'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { dashboardStats } from '@/lib/mock-data';
import {
  Home, Users, UserPlus, Briefcase, Calendar, Shield, Bus,
  Banknote, CheckCircle, BarChart3, Settings, ClipboardCheck, Award, Megaphone,
  PanelLeftClose, PanelLeftOpen, Headphones,
  Heart, AlertTriangle, CreditCard, FolderOpen,
  Image, Newspaper, Bell, CalendarCheck, MessageSquareWarning, ListChecks, HelpCircle,
} from 'lucide-react';
import StakeholderProfile from '@/components/StakeholderProfile';
import SupportModule from '@/components/SupportModule';
import YourInputsModule from '@/components/YourInputsModule';
import { type TeamMember } from '@/lib/auth';

import DashboardHome from '../_modules/DashboardHome';
import StudentsModule from '../_modules/StudentsModule';
import EnquiriesModule from '../_modules/EnquiriesModule';
import StaffModule from '../_modules/StaffModule';
import FeesModule from '../_modules/FeesModule';
import TimetableModule from '../_modules/TimetableModule';
import CertificatesModule from '../_modules/CertificatesModule';
import TransportModule from '../_modules/TransportModule';
import VisitorsModule from '../_modules/VisitorsModule';
import CommunicateModule from '../_modules/CommunicateModule';
import ApprovalsModule from '../_modules/ApprovalsModule';
import AttendanceModule from '../_modules/AttendanceModule';
import ReportsModule from '../_modules/ReportsModule';
import HRManagementModule from '../_modules/HRManagementModule';
import ConfigModule from '../_modules/ConfigModule';
import HealthInfirmaryModule from '../_modules/HealthInfirmaryModule';
import IncidentReportModule from '../_modules/IncidentReportModule';
import IDCardModule from '../_modules/IDCardModule';
import DocumentMgmtModule from '../_modules/DocumentMgmtModule';
import GalleryMediaModule from '../_modules/GalleryMediaModule';
import NewsModule from '../_modules/NewsModule';
import NotificationCenterModule from '../_modules/NotificationCenterModule';
import PTMModule from '../_modules/PTMModule';
import ComplaintTicketModule from '../_modules/ComplaintTicketModule';
import SurveyPollModule from '../_modules/SurveyPollModule';
import HelpDeskModule from '../_modules/HelpDeskModule';

// ─── MODULE SIDEBAR ────────────────────────────────
const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'students', label: 'Students', icon: Users },
  { id: 'enquiries', label: 'Enquiries', icon: UserPlus },
  { id: 'staff', label: 'Staff', icon: Briefcase },
  { id: 'fees', label: 'Fees', icon: Banknote },
  { id: 'timetable', label: 'Timetable', icon: Calendar },
  { id: 'certificates', label: 'Certificates', icon: Award },
  { id: 'transport', label: 'Transport', icon: Bus },
  { id: 'visitors', label: 'Visitors', icon: Shield },
  { id: 'communicate', label: 'Communicate', icon: Megaphone },
  { id: 'approvals', label: 'Approvals', icon: CheckCircle },
  { id: 'attendance', label: 'Attendance', icon: ClipboardCheck },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'hr', label: 'HR Management', icon: Briefcase },
  { id: 'config', label: 'Configuration', icon: Settings },
  { id: 'health', label: 'Health & Infirmary', icon: Heart },
  { id: 'incidents', label: 'Incidents', icon: AlertTriangle },
  { id: 'id-cards', label: 'ID Cards', icon: CreditCard },
  { id: 'documents', label: 'Documents', icon: FolderOpen },
  { id: 'gallery', label: 'Gallery & Media', icon: Image },
  { id: 'news', label: 'News', icon: Newspaper },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'ptm', label: 'PTM', icon: CalendarCheck },
  { id: 'complaints', label: 'Complaints', icon: MessageSquareWarning },
  { id: 'surveys', label: 'Surveys & Polls', icon: ListChecks },
  { id: 'help-desk', label: 'Help Desk', icon: HelpCircle },
  { id: 'your-inputs', label: 'Your Inputs', icon: ClipboardCheck },
  { id: 'support', label: 'Support', icon: Headphones },
];

export default function SchoolAdminDashboard({ theme, themeIdx, onThemeChange, currentUser }: { theme?: Theme; themeIdx?: number; onThemeChange?: (idx: number) => void; currentUser?: TeamMember }) {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  if (!theme) return null;
  const stats = dashboardStats.schoolAdmin;

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
        {activeModule === 'dashboard' && <DashboardHome theme={theme} stats={stats} onProfileClick={() => setActiveModule('profile')} onNavigate={setActiveModule} />}
        {activeModule === 'students' && <StudentsModule theme={theme} />}
        {activeModule === 'enquiries' && <EnquiriesModule theme={theme} />}
        {activeModule === 'staff' && <StaffModule theme={theme} />}
        {activeModule === 'fees' && <FeesModule theme={theme} />}
        {activeModule === 'timetable' && <TimetableModule theme={theme} />}
        {activeModule === 'certificates' && <CertificatesModule theme={theme} />}
        {activeModule === 'transport' && <TransportModule theme={theme} />}
        {activeModule === 'visitors' && <VisitorsModule theme={theme} />}
        {activeModule === 'communicate' && <CommunicateModule theme={theme} />}
        {activeModule === 'approvals' && <ApprovalsModule theme={theme} />}
        {activeModule === 'attendance' && <AttendanceModule theme={theme} />}
        {activeModule === 'reports' && <ReportsModule theme={theme} />}
        {activeModule === 'hr' && <HRManagementModule theme={theme} />}
        {activeModule === 'config' && <ConfigModule theme={theme} />}
        {activeModule === 'health' && <HealthInfirmaryModule theme={theme} />}
        {activeModule === 'incidents' && <IncidentReportModule theme={theme} />}
        {activeModule === 'id-cards' && <IDCardModule theme={theme} />}
        {activeModule === 'documents' && <DocumentMgmtModule theme={theme} />}
        {activeModule === 'gallery' && <GalleryMediaModule theme={theme} />}
        {activeModule === 'news' && <NewsModule theme={theme} />}
        {activeModule === 'notifications' && <NotificationCenterModule theme={theme} />}
        {activeModule === 'ptm' && <PTMModule theme={theme} />}
        {activeModule === 'complaints' && <ComplaintTicketModule theme={theme} />}
        {activeModule === 'surveys' && <SurveyPollModule theme={theme} />}
        {activeModule === 'help-desk' && <HelpDeskModule theme={theme} />}
        {activeModule === 'your-inputs' && <YourInputsModule theme={theme} userName={currentUser?.name || ''} />}
        {activeModule === 'support' && <SupportModule theme={theme} role="school-admin" />}
        {activeModule === 'profile' && <StakeholderProfile role="school-admin" theme={theme} onClose={() => setActiveModule('dashboard')} themeIdx={themeIdx} onThemeChange={onThemeChange} />}
      </div>
    </div>
  );
}
