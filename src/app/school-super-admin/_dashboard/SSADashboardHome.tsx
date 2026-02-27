'use client';

import { StatCard } from '@/components/shared';

import {
  Settings, CheckCircle, Clock, AlertTriangle, Lock, ShieldCheck,
  Banknote, Calendar, Briefcase, Bus, ClipboardCheck, FileText,
  MessageSquare, Shield, Award, Upload
} from 'lucide-react';
import type { Theme } from '../_helpers/types';

export default function SSADashboardHome({ theme, onNavigate }: { theme: Theme; onNavigate: (moduleId: string) => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${theme.highlight}`}>School Super Admin</h1>
          <p className={`text-xs ${theme.iconColor}`}>Deep module configuration &mdash; all changes are audit-logged</p>
        </div>
      </div>

      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex items-start gap-3">
        <ShieldCheck size={20} className="text-amber-500 mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-bold text-amber-800">All Actions Are Immutably Logged</p>
          <p className="text-xs text-amber-700 mt-1">Every configuration change you make is recorded with timestamp, before/after values, and your IP address. Audit logs are stored in Saaras-controlled storage and cannot be modified or deleted by anyone at the school level.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard icon={Settings} label="Modules Configured" value="18 / 27" color="bg-indigo-500" theme={theme} />
        <StatCard icon={CheckCircle} label="Config Complete" value="67%" color="bg-emerald-500" theme={theme} />
        <StatCard icon={Clock} label="Last Change" value="2 hrs ago" color="bg-blue-500" theme={theme} />
        <StatCard icon={AlertTriangle} label="Pending Setup" value="9" color="bg-amber-500" theme={theme} />
        <StatCard icon={Lock} label="Critical Locks Active" value="6" color="bg-rose-500" theme={theme} />
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Module Configuration Status</h3>
        <p className={`text-[10px] ${theme.iconColor} mb-3`}>Click any card to open that module's configuration</p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { name: 'Fee Structure', status: 'complete', items: '8 fee heads, 5 class groups', icon: Banknote, moduleId: 'fee-config' },
            { name: 'Academic Calendar', status: 'complete', items: 'Holidays, exam dates set', icon: Calendar, moduleId: 'academic-config' },
            { name: 'HR & Payroll', status: 'partial', items: '11 depts, payroll pending', icon: Briefcase, moduleId: 'hr-config' },
            { name: 'Transport Routes', status: 'pending', items: 'Not yet configured', icon: Bus, moduleId: 'transport-config' },
            { name: 'Attendance Rules', status: 'complete', items: 'Daily marking, bio + app', icon: ClipboardCheck, moduleId: 'attendance-config' },
            { name: 'Exam & Report Cards', status: 'partial', items: 'Schedule done, templates pending', icon: FileText, moduleId: 'exam-config' },
            { name: 'Leave Policy', status: 'complete', items: '6 types, approval chain set', icon: Clock, moduleId: 'leave-config' },
            { name: 'Timetable & Bell', status: 'pending', items: 'Not yet configured', icon: Calendar, moduleId: 'timetable-config' },
            { name: 'Communication Rules', status: 'complete', items: 'DM rules, groups configured', icon: MessageSquare, moduleId: 'communication-config' },
            { name: 'Visitor Policy', status: 'partial', items: 'Check-in done, pickup pending', icon: Shield, moduleId: 'visitor-config' },
            { name: 'Certificates', status: 'pending', items: 'Templates not uploaded', icon: Award, moduleId: 'certificate-config' },
            { name: 'Data Migration', status: 'pending', items: 'No data imported yet', icon: Upload, moduleId: 'data-migration' },
          ].map(mod => (
            <button key={mod.name} onClick={() => onNavigate(mod.moduleId)}
              className={`p-3 rounded-xl ${theme.secondaryBg} flex items-start gap-2 text-left w-full hover:ring-2 hover:ring-offset-1 transition-all group ${
                mod.status === 'complete' ? 'hover:ring-emerald-400' :
                mod.status === 'partial' ? 'hover:ring-amber-400' : 'hover:ring-slate-300'
              }`}>
              <mod.icon size={14} className={
                mod.status === 'complete' ? 'text-emerald-500 mt-0.5 shrink-0' :
                mod.status === 'partial' ? 'text-amber-500 mt-0.5 shrink-0' : 'text-slate-400 mt-0.5 shrink-0'
              } />
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-bold ${theme.highlight}`}>{mod.name}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{mod.items}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded inline-block font-bold ${
                    mod.status === 'complete' ? 'bg-emerald-100 text-emerald-700' :
                    mod.status === 'partial' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {mod.status === 'complete' ? 'COMPLETE' : mod.status === 'partial' ? 'IN PROGRESS' : 'NOT STARTED'}
                  </span>
                  <span className={`text-[9px] ${theme.iconColor} opacity-0 group-hover:opacity-100 transition-opacity`}>Configure →</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Recent Configuration Changes</h3>
        <div className="space-y-2">
          {[
            { action: 'Updated fee structure for Class 9-10', time: '2 hours ago', module: 'Fees' },
            { action: 'Added 3 new bus routes (Route D, E, F)', time: '5 hours ago', module: 'Transport' },
            { action: 'Modified leave approval chain', time: '1 day ago', module: 'Leave' },
            { action: 'Uploaded report card template', time: '1 day ago', module: 'Exams' },
            { action: 'Set DM permissions for Parent to Teacher', time: '2 days ago', module: 'Chat' },
          ].map((activity, i) => (
            <div key={i} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs ${theme.highlight}`}>{activity.action}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{activity.time}</p>
              </div>
              <span className={`text-[9px] px-2 py-0.5 rounded-lg ${theme.accentBg} ${theme.iconColor} font-bold`}>{activity.module}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
