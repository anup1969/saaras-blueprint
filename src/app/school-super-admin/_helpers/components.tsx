'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Info, X, Edit, Save } from 'lucide-react';
import { MODULE_INFO, SECTION_INFO, FIELD_INFO } from './constants';
import type { Theme } from './types';

// ─── INFO TOOLTIP COMPONENT ──────────────────────────
export function InfoTooltip({ text, theme }: { text: string; theme: Theme }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);
  // Split text on "|" — first part = what it does, second part = who it affects
  const parts = text.split('|');
  const what = parts[0]?.trim();
  const affects = parts[1]?.trim();
  return (
    <div ref={ref} className="relative inline-flex">
      <button onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        className={`ml-1.5 p-0.5 rounded-full hover:bg-blue-100 transition-colors ${open ? 'bg-blue-100' : ''}`}
        title="Click for info">
        <Info size={13} className="text-blue-400 hover:text-blue-600" />
      </button>
      {open && (
        <div className="absolute left-6 top-0 z-50 w-72 p-3 rounded-xl bg-white border border-blue-200 shadow-xl text-left animate-in fade-in" style={{ animation: 'fadeIn 0.15s ease-out' }}>
          <div className="flex items-start justify-between mb-1.5">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide flex items-center gap-1"><Info size={10} /> Configuration Info</span>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={12} /></button>
          </div>
          <p className="text-[11px] text-gray-700 leading-relaxed">{what}</p>
          {affects && (
            <div className="mt-2 pt-2 border-t border-blue-100">
              <p className="text-[9px] font-bold text-blue-500 uppercase tracking-wider mb-0.5">Affects</p>
              <p className="text-[10px] text-gray-600 leading-relaxed">{affects}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── HELPER COMPONENTS ─────────────────────────────
export function SSAToggle({ on, onChange, theme, label }: { on: boolean; onChange: () => void; theme: Theme; label?: string }) {
  const fieldInfo = label ? FIELD_INFO[label] : undefined;
  return (
    <div className="flex items-center gap-1">
      <button onClick={onChange} className={`w-9 h-5 rounded-full relative transition-colors ${on ? theme.primary : 'bg-gray-300'}`}>
        <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${on ? 'translate-x-4' : 'translate-x-0.5'}`} />
      </button>
      {fieldInfo && <InfoTooltip text={fieldInfo} theme={theme} />}
    </div>
  );
}

export function SectionCard({ title, subtitle, children, theme }: { title: string; subtitle?: string; children: React.ReactNode; theme: Theme }) {
  const infoText = SECTION_INFO[title];
  return (
    <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
      <div className="flex items-center">
        <h3 className={`text-sm font-bold ${theme.highlight} mb-1`}>{title}</h3>
        {infoText && <InfoTooltip text={infoText} theme={theme} />}
      </div>
      {subtitle && <p className={`text-[10px] ${theme.iconColor} mb-3`}>{subtitle}</p>}
      {!subtitle && <div className="mb-3" />}
      {children}
    </div>
  );
}

// ─── MODULE HEADER (Save Changes bar) ──────────────
export function ModuleHeader({ title, subtitle, theme, onSave }: { title: string; subtitle?: string; theme: Theme; onSave?: () => void }) {
  const [saved, setSaved] = useState(false);
  const moduleInfoText = MODULE_INFO[title];
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <div className="flex items-center">
          <h1 className={`text-xl font-bold ${theme.highlight}`}>{title}</h1>
          {moduleInfoText && <InfoTooltip text={moduleInfoText} theme={theme} />}
        </div>
        {subtitle && <p className={`text-xs ${theme.iconColor} mt-0.5`}>{subtitle}</p>}
        <p className={`text-[10px] ${theme.iconColor} flex items-center gap-1 mt-0.5`}>
          <Edit size={10} /> Click any field to configure
        </p>
      </div>
      <div className="flex items-center gap-2">
        {saved && <span className="text-green-500 text-xs font-medium animate-pulse">Saved!</span>}
        <button
          onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); if (onSave) onSave(); }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white ${theme.primary} hover:opacity-90 transition-all`}>
          <Save size={14} /> Save Changes
        </button>
      </div>
    </div>
  );
}

export function InputField({ placeholder, value, onChange, theme, type, disabled }: {
  placeholder?: string; value: string; onChange: (v: string) => void; theme: Theme; type?: string; disabled?: boolean;
}) {
  return (
    <input
      type={type || 'text'}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      disabled={disabled}
      className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none focus:ring-2 focus:ring-slate-300 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    />
  );
}

export function SelectField({ options, value, onChange, theme, placeholder }: {
  options: string[]; value: string; onChange: (v: string) => void; theme: Theme; placeholder?: string;
}) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none focus:ring-2 focus:ring-slate-300`}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}
