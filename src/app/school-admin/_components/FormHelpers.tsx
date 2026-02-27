'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { ChevronUp, ChevronDown, Camera, Upload } from 'lucide-react';

export function FormField({ label, required, children, theme, span }: {
  label: string; required?: boolean; children: React.ReactNode; theme: Theme; span?: number;
}) {
  return (
    <div className={span === 2 ? 'col-span-2' : span === 3 ? 'col-span-3' : ''}>
      <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

export function InputField({ placeholder, value, onChange, theme, type, disabled, readOnly }: {
  placeholder?: string; value: string; onChange: (v: string) => void; theme: Theme; type?: string; disabled?: boolean; readOnly?: boolean;
}) {
  return (
    <input
      type={type || 'text'}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      disabled={disabled}
      readOnly={readOnly}
      className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none focus:ring-2 focus:ring-slate-300 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${readOnly ? 'cursor-default' : ''}`}
    />
  );
}

export function SelectField({ options, value, onChange, theme, placeholder }: {
  options: string[]; value: string; onChange: (v: string) => void; theme: Theme; placeholder?: string;
}) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none focus:ring-2 focus:ring-slate-300`}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

export function TextAreaField({ placeholder, value, onChange, theme, rows }: {
  placeholder?: string; value: string; onChange: (v: string) => void; theme: Theme; rows?: number;
}) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      rows={rows || 3}
      className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none focus:ring-2 focus:ring-slate-300 resize-none`}
    />
  );
}

export function PhotoUpload({ label, theme }: { label: string; theme: Theme }) {
  return (
    <div className={`w-24 h-28 rounded-xl border-2 border-dashed ${theme.border} flex flex-col items-center justify-center cursor-pointer ${theme.buttonHover} transition-all`}>
      <Camera size={20} className={theme.iconColor} />
      <span className={`text-[10px] ${theme.iconColor} mt-1 text-center`}>{label}</span>
    </div>
  );
}

export function FileUploadArea({ label, theme }: { label: string; theme: Theme }) {
  return (
    <div className={`border-2 border-dashed ${theme.border} rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer ${theme.buttonHover} transition-all`}>
      <Upload size={18} className={theme.iconColor} />
      <span className={`text-[10px] ${theme.iconColor} mt-1`}>{label}</span>
      <span className={`text-[9px] ${theme.iconColor}`}>PDF, JPG, PNG (max 5MB)</span>
    </div>
  );
}

export function FormSection({ title, icon: Icon, children, theme, collapsible, defaultOpen }: {
  title: string; icon: React.ElementType; children: React.ReactNode; theme: Theme; collapsible?: boolean; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen !== false);
  return (
    <div className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden`}>
      <button
        type="button"
        onClick={() => collapsible && setOpen(!open)}
        className={`w-full flex items-center gap-2 px-5 py-3 ${theme.secondaryBg} ${collapsible ? 'cursor-pointer' : 'cursor-default'}`}
      >
        <Icon size={14} className={theme.primaryText} />
        <span className={`text-xs font-bold ${theme.highlight}`}>{title}</span>
        {collapsible && (
          <span className="ml-auto">{open ? <ChevronUp size={14} className={theme.iconColor} /> : <ChevronDown size={14} className={theme.iconColor} />}</span>
        )}
      </button>
      {open && <div className="p-5">{children}</div>}
    </div>
  );
}
