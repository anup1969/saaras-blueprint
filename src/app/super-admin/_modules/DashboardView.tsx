'use client';

import { StatCard, StatusBadge } from '@/components/shared';
import TaskTrackerPanel from '@/components/TaskTrackerPanel';
import { type Theme } from '@/lib/themes';
import {
  Building2, Users, Plus, Headphones, BarChart3, Activity, ArrowRight, DollarSign,
} from 'lucide-react';
import { schools, plans, auditLogs, supportTickets } from './mockData';

export default function DashboardView({ theme, setActiveModule, onStartWizard }: { theme: Theme; setActiveModule: (m: string) => void; onStartWizard: () => void }) {
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
