'use client';

import BlueprintLayout from '@/components/BlueprintLayout';
import { stakeholders } from '@/lib/mock-data';
import Link from 'next/link';
import {
  Building2, GraduationCap, BookOpen, User, Users, Shield, Eye,
  UserCheck, Briefcase, Calculator, Phone, Bus, ShieldCheck, Headphones,
  ArrowRight, CheckCircle, Clock, Hammer, Heart, Calendar
} from 'lucide-react';
import { type Theme } from '@/lib/themes';

const iconMap: Record<string, any> = {
  Building2, GraduationCap, BookOpen, User, Users, Shield, Eye,
  UserCheck, Briefcase, Calculator, Phone, Bus, ShieldCheck, Headphones,
  Heart, Calendar,
};

// Extra stakeholder cards for preschool mode
const preschoolExtraStakeholders = [
  { id: 'bus-nanny', name: 'Bus Nanny / Attendant', icon: 'Bus', desc: 'Child boarding/drop-off log, safety checklist per trip', phase: 1, status: 'built' as const },
  { id: 'nutritionist', name: 'Nutritionist / Diet Planner', icon: 'Heart', desc: 'Meal planning, allergy management, weekly menus', phase: 1, status: 'built' as const },
  { id: 'activity-coordinator', name: 'Activity Coordinator', icon: 'Calendar', desc: 'Activity curriculum, milestone planning, event coordination', phase: 1, status: 'built' as const },
];

// IDs to hide in preschool mode
const preschoolHiddenIds = ['student'];

function HomePage({ theme, isPreschool }: { theme?: Theme; isPreschool?: boolean }) {
  if (!theme) return null;

  // Preschool mode: rename some, hide Student, add 3 new roles
  const preschoolNameMap: Record<string, string> = {
    'principal': 'Principal / Centre Head',
    'vice-principal': 'Vice Principal / Coordinator',
  };

  const displayStakeholders = isPreschool
    ? [
        ...stakeholders
          .filter(s => !preschoolHiddenIds.includes(s.id))
          .map(s => preschoolNameMap[s.id] ? { ...s, name: preschoolNameMap[s.id] } : s),
        ...preschoolExtraStakeholders,
      ]
    : stakeholders;

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-8`}>
        <h1 className={`text-3xl font-bold ${theme.highlight} mb-2`}>Saaras.ai — ERP Blueprint</h1>
        <p className={`${theme.iconColor} text-sm max-w-2xl`}>
          This is a navigable visual prototype of the {isPreschool ? 'Preschool / Daycare' : 'School'} ERP platform. Click any dashboard below to explore.
          Use <kbd className="px-1.5 py-0.5 bg-purple-600 text-white rounded text-[10px] font-bold mx-0.5">Shift+Click</kbd> on any element to leave feedback.
        </p>
        <div className="flex gap-6 mt-6">
          <div>
            <p className={`text-2xl font-bold ${theme.highlight}`}>27+</p>
            <p className={`text-xs ${theme.iconColor}`}>Modules</p>
          </div>
          <div>
            <p className={`text-2xl font-bold ${theme.highlight}`}>25</p>
            <p className={`text-xs ${theme.iconColor}`}>Stakeholder Dashboards</p>
          </div>
          <div>
            <p className={`text-2xl font-bold ${theme.highlight}`}>3</p>
            <p className={`text-xs ${theme.iconColor}`}>Phases</p>
          </div>
        </div>
      </div>

      {/* Preschool banner */}
      {isPreschool && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <span className="text-xl">🏫</span>
          <div>
            <p className="text-sm font-bold text-amber-800">Preschool / Daycare Mode</p>
            <p className="text-xs text-amber-700 mt-1">
              Student portal is hidden (children are 1.5–5 years old). Principal shows as <strong>Principal / Centre Head</strong>,
              Vice Principal as <strong>VP / Coordinator</strong>. 3 new roles added: Bus Nanny, Nutritionist, Activity Coordinator.
            </p>
          </div>
        </div>
      )}

      {/* Dashboard Grid */}
      <div>
        <h2 className={`text-lg font-bold ${theme.highlight} mb-4`}>Stakeholder Dashboards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayStakeholders.map(s => {
            const Icon = iconMap[s.icon] || Building2;
            const StatusIcon = s.status === 'built' ? CheckCircle : s.status === 'in-progress' ? Hammer : Clock;
            const statusColor = s.status === 'built' ? 'text-emerald-500' : s.status === 'in-progress' ? 'text-amber-500' : 'text-slate-400';
            const statusLabel = s.status === 'built' ? 'Built' : s.status === 'in-progress' ? 'In Progress' : 'Planned';

            return (
              <Link
                key={s.id}
                href={`/${s.id}`}
                className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 hover:shadow-lg transition-all group ${
                  s.status === 'built' ? 'hover:border-emerald-300' : 'hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    s.status === 'built' ? 'bg-emerald-100' : theme.secondaryBg
                  }`}>
                    <Icon size={18} className={s.status === 'built' ? 'text-emerald-600' : theme.iconColor} />
                  </div>
                  <div className={`flex items-center gap-1 ${statusColor}`}>
                    <StatusIcon size={12} />
                    <span className="text-[10px] font-bold">{statusLabel}</span>
                  </div>
                </div>
                <h3 className={`text-sm font-bold ${theme.highlight} mb-1`}>{s.name}</h3>
                <p className={`text-xs ${theme.iconColor} mb-3`}>{s.desc}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${theme.secondaryBg} ${theme.iconColor}`}>
                    Phase {s.phase}
                  </span>
                  <ArrowRight size={14} className={`${theme.iconColor} group-hover:translate-x-1 transition-transform`} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>How to Use This Blueprint</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className={`p-3 ${theme.accentBg} rounded-xl`}>
            <p className={`font-bold ${theme.highlight} mb-1`}>1. Browse Dashboards</p>
            <p className={theme.iconColor}>Click any dashboard card above to explore its modules, tabs, and mock data.</p>
          </div>
          <div className={`p-3 ${theme.accentBg} rounded-xl`}>
            <p className={`font-bold ${theme.highlight} mb-1`}>2. Leave Feedback</p>
            <p className={theme.iconColor}>Hold <strong>Shift</strong> and click any element to leave a remark — remove, move, change, or comment.</p>
          </div>
          <div className={`p-3 ${theme.accentBg} rounded-xl`}>
            <p className={`font-bold ${theme.highlight} mb-1`}>3. Switch Themes</p>
            <p className={theme.iconColor}>Use the theme selector in the sidebar to preview different white-label looks (Air, Moss, Stone, Midnight).</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <BlueprintLayout>
      <HomePage />
    </BlueprintLayout>
  );
}
