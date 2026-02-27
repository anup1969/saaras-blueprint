'use client';

import { type Theme } from '@/lib/themes';
import { Plus } from 'lucide-react';
import { onboardingPipeline } from './mockData';

export default function OnboardingView({ theme, onStartWizard }: { theme: Theme; onStartWizard: () => void }) {
  const stages = ['Demo Done', 'Proposal Sent', 'Data Migration', 'Training', 'Go-Live'];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-bold ${theme.highlight}`}>School Onboarding Pipeline</h2>
          <p className={`text-xs ${theme.iconColor}`}>{onboardingPipeline.length} schools in pipeline</p>
        </div>
        <div className="flex gap-2">
          <button onClick={onStartWizard} className={`flex items-center gap-2 px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>
            <Plus size={14} /> Start Onboarding
          </button>
          <button className={`flex items-center gap-2 px-4 py-2 ${theme.secondaryBg} rounded-xl text-xs font-bold ${theme.highlight}`}>
            <Plus size={14} /> Add Lead
          </button>
        </div>
      </div>

      {/* Pipeline stages */}
      <div className="flex gap-1 overflow-x-auto pb-2">
        {stages.map((stage, i) => {
          const items = onboardingPipeline.filter(o => o.stage === stage);
          return (
            <div key={stage} className="flex-1 min-w-[200px]">
              <div className={`text-xs font-bold ${theme.highlight} mb-2 flex items-center gap-2`}>
                <span className={`w-5 h-5 rounded-full ${theme.primary} text-white flex items-center justify-center text-[10px]`}>{i + 1}</span>
                {stage}
                <span className={`text-[10px] ${theme.iconColor} ml-auto`}>{items.length}</span>
              </div>
              <div className="space-y-2">
                {items.map(item => (
                  <div key={item.school} className={`${theme.cardBg} rounded-xl border ${theme.border} p-3`}>
                    <p className={`text-xs font-bold ${theme.highlight}`}>{item.school}</p>
                    <p className={`text-[10px] ${theme.iconColor} mt-1`}>{item.contact} · {item.phone}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs font-bold ${theme.primaryText}`}>{item.deal}</span>
                      <span className={`text-[10px] ${theme.iconColor}`}>{item.days}d in stage</span>
                    </div>
                  </div>
                ))}
                {items.length === 0 && (
                  <div className={`p-4 rounded-xl border-2 border-dashed ${theme.border} text-center`}>
                    <p className={`text-[10px] ${theme.iconColor}`}>No schools</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pipeline Summary */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Pipeline Value</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-lg font-bold ${theme.highlight}`}>₹5.25L</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Total Pipeline</p>
          </div>
          <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-lg font-bold ${theme.highlight}`}>5</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Active Leads</p>
          </div>
          <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-lg font-bold text-emerald-600`}>₹1.20L</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Ready for Go-Live</p>
          </div>
          <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-lg font-bold ${theme.highlight}`}>6.2 days</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Avg. Stage Duration</p>
          </div>
        </div>
      </div>
    </div>
  );
}
