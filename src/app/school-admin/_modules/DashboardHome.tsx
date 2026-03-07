'use client';

import { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { dashboardStats } from '@/lib/mock-data';
import DashboardHomeClassic from './DashboardHomeClassic';
import DashboardHomeNew from './DashboardHomeNew';
import { Palette, Monitor } from 'lucide-react';

export default function DashboardHome({ theme, stats, onProfileClick, onNavigate }: { theme: Theme; stats: typeof dashboardStats.schoolAdmin; onProfileClick: () => void; onNavigate?: (id: string) => void }) {
  const [useNewUI, setUseNewUI] = useState(false);

  return (
    <div>
      {/* UI Toggle */}
      <div className="flex items-center justify-center mb-4">
        <div className={`flex items-center gap-1 p-1 rounded-xl ${theme.secondaryBg} border ${theme.border}`}>
          <button
            onClick={() => setUseNewUI(false)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              !useNewUI ? `${theme.cardBg} ${theme.highlight} shadow-sm` : `${theme.iconColor}`
            }`}
          >
            <Monitor size={14} />
            Classic UI
          </button>
          <button
            onClick={() => setUseNewUI(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              useNewUI ? 'bg-blue-600 text-white shadow-sm' : `${theme.iconColor}`
            }`}
          >
            <Palette size={14} />
            Modern UI
          </button>
        </div>
      </div>

      {/* Render selected UI */}
      {useNewUI ? (
        <DashboardHomeNew theme={theme} onProfileClick={onProfileClick} onNavigate={onNavigate} />
      ) : (
        <DashboardHomeClassic theme={theme} stats={stats} onProfileClick={onProfileClick} onNavigate={onNavigate} />
      )}
    </div>
  );
}
