'use client';

import { type Theme } from '@/lib/themes';
import { Check } from 'lucide-react';
import { allModules, plans } from './mockData';

export default function ModulesConfigView({ theme }: { theme: Theme }) {
  const categories = [...new Set(allModules.map(m => m.category))];

  return (
    <div className="space-y-4">
      <div>
        <h2 className={`text-lg font-bold ${theme.highlight}`}>Module Configuration</h2>
        <p className={`text-xs ${theme.iconColor}`}>Configure which modules are available per plan</p>
      </div>

      {categories.map(cat => (
        <div key={cat} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>{cat}</h3>
          <div className="space-y-2">
            {allModules.filter(m => m.category === cat).map(mod => (
              <div key={mod.name} className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
                <span className={`text-xs font-medium ${theme.highlight}`}>{mod.name}</span>
                <div className="flex gap-4">
                  {plans.map(p => (
                    <label key={p.id} className="flex items-center gap-1.5">
                      <div className={`w-4 h-4 rounded border ${mod.plans.includes(p.id) ? `${p.color} border-transparent` : theme.border} flex items-center justify-center`}>
                        {mod.plans.includes(p.id) && <Check size={10} className="text-white" />}
                      </div>
                      <span className={`text-[10px] ${theme.iconColor}`}>{p.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
