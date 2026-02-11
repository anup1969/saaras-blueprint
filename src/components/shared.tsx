'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { LucideIcon } from 'lucide-react';

// ─── STAT CARD ───────────────────────────────────────
export function StatCard({ icon: Icon, label, value, color, sub, theme }: {
  icon: LucideIcon; label: string; value: string | number; color: string; sub?: string; theme: Theme;
}) {
  return (
    <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex items-center gap-3 shadow-sm`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color} text-white shadow-sm`}>
        <Icon size={18} />
      </div>
      <div>
        <p className={`text-lg font-bold ${theme.highlight}`}>{value}</p>
        <p className={`text-xs ${theme.iconColor}`}>{label}</p>
        {sub && <p className="text-[10px] text-emerald-600 font-bold mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

// ─── TOGGLE ──────────────────────────────────────────
export function Toggle({ on, onChange, theme }: { on: boolean; onChange: () => void; theme: Theme }) {
  return (
    <button onClick={onChange} className={`w-9 h-5 rounded-full relative transition-colors ${on ? theme.primary : 'bg-gray-300'}`}>
      <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${on ? 'translate-x-4' : 'translate-x-0.5'}`} />
    </button>
  );
}

// ─── TAB BAR ─────────────────────────────────────────
export function TabBar({ tabs, active, onChange, theme }: {
  tabs: string[]; active: string; onChange: (t: string) => void; theme: Theme;
}) {
  return (
    <div className={`flex gap-1 p-1 ${theme.secondaryBg} rounded-xl overflow-x-auto`}>
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`px-4 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-all ${
            active === t ? `${theme.cardBg} ${theme.highlight} shadow-sm` : theme.iconColor
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

// ─── STATUS BADGE ────────────────────────────────────
export function StatusBadge({ status, theme }: { status: string; theme: Theme }) {
  const colors: Record<string, string> = {
    Active: 'bg-emerald-100 text-emerald-700',
    Paid: 'bg-emerald-100 text-emerald-700',
    Pending: 'bg-amber-100 text-amber-700',
    Overdue: 'bg-red-100 text-red-700',
    New: 'bg-blue-100 text-blue-700',
    'Follow-up': 'bg-amber-100 text-amber-700',
    Converted: 'bg-emerald-100 text-emerald-700',
    Lost: 'bg-slate-100 text-slate-600',
    'Test Scheduled': 'bg-purple-100 text-purple-700',
    Probation: 'bg-amber-100 text-amber-700',
    'TC Issued': 'bg-slate-100 text-slate-600',
    Cleared: 'bg-slate-100 text-slate-600',
    Running: 'bg-emerald-100 text-emerald-700',
    Maintenance: 'bg-amber-100 text-amber-700',
    Urgent: 'bg-red-100 text-red-600',
    High: 'bg-amber-100 text-amber-600',
    Normal: 'bg-blue-100 text-blue-600',
    Approved: 'bg-emerald-100 text-emerald-700',
    Rejected: 'bg-red-100 text-red-700',
    Confirmed: 'bg-emerald-100 text-emerald-700',
    'In Campus': 'bg-orange-100 text-orange-700',
    'Checked Out': 'bg-slate-100 text-slate-600',
    Delivered: 'bg-emerald-100 text-emerald-700',
    'Pending Pickup': 'bg-amber-100 text-amber-700',
    Dispatched: 'bg-indigo-100 text-indigo-700',
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${colors[status] || 'bg-slate-100 text-slate-600'}`}>
      {status}
    </span>
  );
}

// ─── SEARCH BAR ──────────────────────────────────────
export function SearchBar({ placeholder, theme, icon: Icon }: {
  placeholder: string; theme: Theme; icon: LucideIcon;
}) {
  return (
    <div className="flex-1 relative">
      <Icon size={16} className={`absolute left-3 top-3 ${theme.iconColor}`} />
      <input
        placeholder={placeholder}
        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-slate-300`}
      />
    </div>
  );
}

// ─── DATA TABLE ──────────────────────────────────────
export function DataTable({ headers, rows, theme }: {
  headers: string[];
  rows: React.ReactNode[][];
  theme: Theme;
}) {
  return (
    <div className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden overflow-x-auto`}>
      <table className="w-full text-sm">
        <thead className={theme.secondaryBg}>
          <tr>
            {headers.map(h => (
              <th key={h} className={`text-left px-4 py-3 text-xs font-bold ${theme.iconColor} uppercase`}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={`border-t ${theme.border}`}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── SECTION WRAPPER ─────────────────────────────────
export function Section({ children }: { children: React.ReactNode }) {
  return <div className="space-y-4">{children}</div>;
}
