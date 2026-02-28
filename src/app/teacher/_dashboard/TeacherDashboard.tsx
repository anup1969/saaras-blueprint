'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import {
  Home, BookOpen, ClipboardCheck, FileText, Award, Calendar,
  CalendarDays, Notebook, BarChart3, MessageSquare, Headphones,
  PanelLeftClose, PanelLeftOpen, MessageSquareText, MonitorPlay
} from 'lucide-react';
import StakeholderProfile from '@/components/StakeholderProfile';
import SupportModule from '@/components/SupportModule';
import YourInputsModule from '@/components/YourInputsModule';
import { type TeamMember } from '@/lib/auth';

import DashboardHome from '../_modules/DashboardHome';
import MyClassesModule from '../_modules/MyClassesModule';
import AttendanceModule from '../_modules/AttendanceModule';
import HomeworkModule from '../_modules/HomeworkModule';
import GradebookModule from '../_modules/GradebookModule';
import TimetableModule from '../_modules/TimetableModule';
import LeaveModule from '../_modules/LeaveModule';
import DiaryModule from '../_modules/DiaryModule';
import ReportsModule from '../_modules/ReportsModule';
import CommunicationModule from '../_modules/CommunicationModule';
import LessonPlanModule from '../_modules/LessonPlanModule';
import RemarksModule from '../_modules/RemarksModule';
import LMSModule from '../_modules/LMSModule';

// ─── TEACHER PROFILE (for top bar) ──────────────────
const teacherProfile = {
  name: 'Ms. Priya Sharma',
};

// ─── MODULE SIDEBAR ─────────────────────────────────
const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'classes', label: 'My Classes', icon: BookOpen },
  { id: 'attendance', label: 'Attendance', icon: ClipboardCheck },
  { id: 'homework', label: 'Homework', icon: FileText },
  { id: 'gradebook', label: 'Gradebook', icon: Award },
  { id: 'timetable', label: 'Timetable', icon: Calendar },
  { id: 'leave', label: 'Leave', icon: CalendarDays },
  { id: 'diary', label: 'Diary', icon: Notebook },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'communication', label: 'Communication', icon: MessageSquare },
  { id: 'lesson-plans', label: 'Lesson Plans', icon: BookOpen },
  { id: 'remarks', label: 'Student Remarks', icon: MessageSquareText },
  { id: 'lms', label: 'LMS / E-Learning', icon: MonitorPlay },
  { id: 'your-inputs', label: 'Your Inputs', icon: ClipboardCheck },
  { id: 'support', label: 'Support', icon: Headphones },
];

export default function TeacherDashboard({ theme, themeIdx, onThemeChange, isPreschool, currentUser }: { theme?: Theme; themeIdx?: number; onThemeChange?: (idx: number) => void; isPreschool?: boolean; currentUser?: TeamMember }) {
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
      <div className="flex-1 overflow-x-hidden">
        {/* Persistent top bar with profile avatar — REMARK 1 */}
        <div className={`flex items-center justify-end gap-3 px-6 pt-4 pb-2`}>
          <button
            onClick={() => setActiveModule('profile')}
            title="Ms. Priya Sharma — My Profile"
            className={`flex items-center gap-2.5 px-3 py-1.5 rounded-full ${theme.secondaryBg} ${theme.buttonHover} transition-all`}
          >
            <span className={`text-xs font-medium ${theme.iconColor} hidden sm:inline`}>{teacherProfile.name}</span>
            <div className={`w-8 h-8 rounded-full ${theme.primary} text-white flex items-center justify-center text-xs font-bold shrink-0 ring-2 ring-white/20`}>PS</div>
          </button>
        </div>

        <div className="px-6 pb-6 space-y-4">
          {activeModule === 'dashboard' && <DashboardHome theme={theme} isPreschool={isPreschool} />}
          {activeModule === 'classes' && <MyClassesModule theme={theme} />}
          {activeModule === 'attendance' && <AttendanceModule theme={theme} />}
          {activeModule === 'homework' && <HomeworkModule theme={theme} />}
          {activeModule === 'gradebook' && <GradebookModule theme={theme} />}
          {activeModule === 'timetable' && <TimetableModule theme={theme} />}
          {activeModule === 'leave' && <LeaveModule theme={theme} />}
          {activeModule === 'diary' && <DiaryModule theme={theme} />}
          {activeModule === 'reports' && <ReportsModule theme={theme} />}
          {activeModule === 'communication' && <CommunicationModule theme={theme} />}
          {activeModule === 'lesson-plans' && <LessonPlanModule theme={theme} />}
          {activeModule === 'remarks' && <RemarksModule theme={theme} />}
          {activeModule === 'lms' && <LMSModule theme={theme} />}
          {activeModule === 'your-inputs' && <YourInputsModule theme={theme} userName={currentUser?.name || ''} />}
          {activeModule === 'support' && <SupportModule theme={theme} role="teacher" />}
          {activeModule === 'profile' && <StakeholderProfile role="teacher" theme={theme} onClose={() => setActiveModule('dashboard')} themeIdx={themeIdx} onThemeChange={onThemeChange} />}
        </div>
      </div>
    </div>
  );
}
