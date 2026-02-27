'use client';

import { type Theme } from '@/lib/themes';

export default function ProgressBar({ used, total, unit, theme, warn }: { used: number; total: number; unit: string; theme: Theme; warn?: boolean }) {
  const pct = Math.round((used / total) * 100);
  const barColor = pct > 85 ? 'bg-red-500' : pct > 65 ? 'bg-amber-500' : 'bg-emerald-500';
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className={`text-xs font-bold ${theme.highlight}`}>{used} {unit}</span>
        <span className={`text-[10px] ${theme.iconColor}`}>/ {total} {unit}</span>
      </div>
      <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
        <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${Math.min(pct, 100)}%` }} />
      </div>
      <p className={`text-[10px] mt-0.5 font-bold ${pct > 85 ? 'text-red-500' : pct > 65 ? 'text-amber-600' : 'text-emerald-600'}`}>{pct}% used</p>
    </div>
  );
}
