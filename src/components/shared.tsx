'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { LucideIcon, Download, Upload, FileText, CheckCircle, AlertTriangle, ChevronRight } from 'lucide-react';

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

// ─── MOBILE FRAME ───────────────────────────────────
// Phone-shaped container for showing mobile app previews inline
export function MobileFrame({ title, children, theme }: { title: string; children: React.ReactNode; theme: Theme }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[320px] border-[3px] border-gray-800 rounded-[2rem] overflow-hidden shadow-xl bg-white">
        {/* Notch */}
        <div className="bg-gray-800 h-6 flex items-center justify-center">
          <div className="w-16 h-3 bg-gray-900 rounded-full" />
        </div>
        {/* Status bar */}
        <div className="bg-gray-800 text-white flex items-center justify-between px-4 py-1 text-[10px]">
          <span>9:41</span>
          <div className="flex gap-1 items-center">
            <span>&#9679;&#9679;&#9679;&#9679;</span>
            <span className="ml-1">100%</span>
          </div>
        </div>
        {/* App header */}
        <div className={`${theme.primary} text-white px-4 py-2.5 flex items-center gap-2`}>
          <span className="text-sm">&larr;</span>
          <span className="text-sm font-bold flex-1">{title}</span>
          <span className="text-xs">&#8942;</span>
        </div>
        {/* Content */}
        <div className="h-[480px] overflow-y-auto text-xs p-3 space-y-2 bg-gray-50">
          {children}
        </div>
        {/* Bottom nav bar */}
        <div className="bg-white border-t border-gray-200 flex justify-around py-2 text-[9px] text-gray-500">
          <div className="flex flex-col items-center"><span className="text-base">&#8962;</span>Home</div>
          <div className="flex flex-col items-center"><span className="text-base">&#128276;</span>Alerts</div>
          <div className="flex flex-col items-center"><span className="text-base">&#9881;</span>More</div>
        </div>
      </div>
    </div>
  );
}

// ─── MOBILE PREVIEW TOGGLE ──────────────────────────
// Button + wrapper to toggle between desktop and mobile preview
export function MobilePreviewToggle({ mobileContent, theme }: { mobileContent: React.ReactNode; theme: Theme }) {
  const [show, setShow] = useState(false);
  return (
    <div className="mt-4">
      <button
        onClick={() => setShow(!show)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
          show ? 'bg-green-600 text-white' : `${theme.secondaryBg} ${theme.iconColor} border ${theme.border}`
        }`}
      >
        <span>{'\uD83D\uDCF1'}</span>
        {show ? 'Hide Mobile App View' : 'Show Mobile App View'}
      </button>
      {show && <div className="mt-4">{mobileContent}</div>}
    </div>
  );
}

// ─── MASTER PERMISSION GRID ─────────────────────────
export function MasterPermissionGrid({ masterName, roles, theme }: {
  masterName: string;
  roles: string[];
  theme: Theme;
}) {
  const permissions = ['View', 'Create', 'Edit', 'Delete', 'Import', 'Export'];
  const [grid, setGrid] = useState<Record<string, Record<string, boolean>>>(() => {
    const initial: Record<string, Record<string, boolean>> = {};
    roles.forEach(role => {
      initial[role] = {};
      permissions.forEach(perm => {
        initial[role][perm] = role === 'Super Admin' ? true : (perm === 'View' || perm === 'Create');
      });
    });
    return initial;
  });

  const toggleCell = (role: string, perm: string) => {
    setGrid(prev => ({
      ...prev,
      [role]: { ...prev[role], [perm]: !prev[role][perm] },
    }));
  };

  return (
    <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
      <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Permissions for {masterName}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className={theme.secondaryBg}>
              <th className={`text-left px-3 py-2 font-bold ${theme.iconColor} uppercase text-[10px]`}>Role</th>
              {permissions.map(p => (
                <th key={p} className={`text-center px-3 py-2 font-bold ${theme.iconColor} uppercase text-[10px]`}>{p}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {roles.map(role => (
              <tr key={role} className={`border-t ${theme.border}`}>
                <td className={`px-3 py-2.5 font-bold ${theme.highlight}`}>{role}</td>
                {permissions.map(perm => (
                  <td key={perm} className="text-center px-3 py-2.5">
                    <button
                      onClick={() => toggleCell(role, perm)}
                      className={`w-9 h-5 rounded-full relative transition-colors ${grid[role]?.[perm] ? theme.primary : 'bg-gray-300'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${grid[role]?.[perm] ? 'translate-x-4' : 'translate-x-0.5'}`} />
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── BULK IMPORT WIZARD ─────────────────────────────
export function BulkImportWizard({ entityName, templateFields, sampleData, theme }: {
  entityName: string;
  templateFields: string[];
  sampleData: string[][];
  theme: Theme;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [fileName, setFileName] = useState('');
  const [importing, setImporting] = useState(false);
  const [done, setDone] = useState(false);
  const steps = ['Download Template', 'Upload File', 'Validate', 'Import'];
  const validCount = sampleData.length;
  const errorCount = Math.max(1, Math.floor(sampleData.length * 0.1));

  return (
    <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
      <h3 className={`text-sm font-bold ${theme.highlight} mb-4`}>Import {entityName}</h3>
      {/* Step indicators */}
      <div className="flex items-center gap-1 mb-5">
        {steps.map((s, i) => (
          <React.Fragment key={s}>
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold ${
              i === currentStep ? `${theme.primary} text-white` : i < currentStep ? 'bg-emerald-100 text-emerald-700' : `${theme.secondaryBg} ${theme.iconColor}`
            }`}>
              {i < currentStep ? <CheckCircle size={12} /> : <span>{i + 1}</span>}
              {s}
            </div>
            {i < steps.length - 1 && <ChevronRight size={14} className={theme.iconColor} />}
          </React.Fragment>
        ))}
      </div>

      {/* Step 1: Download Template */}
      {currentStep === 0 && (
        <div className="space-y-3">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className={theme.secondaryBg}>
                <tr>{templateFields.map(f => <th key={f} className={`text-left px-3 py-2 ${theme.iconColor} font-bold text-[10px] uppercase`}>{f}</th>)}</tr>
              </thead>
              <tbody>
                {sampleData.slice(0, 2).map((row, i) => (
                  <tr key={i} className={`border-t ${theme.border}`}>{row.map((c, j) => <td key={j} className={`px-3 py-2 ${theme.highlight}`}>{c}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={() => setCurrentStep(1)} className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white ${theme.primary}`}>
            <Download size={14} /> Download Template
          </button>
        </div>
      )}

      {/* Step 2: Upload File */}
      {currentStep === 1 && (
        <div className="space-y-3">
          <div className={`border-2 border-dashed ${theme.border} rounded-xl p-8 text-center`}
            onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); setFileName('import_data.xlsx'); }}>
            {fileName ? (
              <div className="flex items-center justify-center gap-2">
                <FileText size={18} className="text-emerald-500" />
                <span className={`text-xs font-bold ${theme.highlight}`}>{fileName}</span>
              </div>
            ) : (
              <div>
                <Upload size={24} className={`mx-auto mb-2 ${theme.iconColor}`} />
                <p className={`text-xs ${theme.iconColor}`}>Drag & drop your file here</p>
              </div>
            )}
          </div>
          <button onClick={() => { if (!fileName) setFileName('import_data.xlsx'); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold ${theme.secondaryBg} ${theme.highlight} border ${theme.border}`}>
            Browse
          </button>
          <button onClick={() => setCurrentStep(2)} disabled={!fileName}
            className={`ml-2 px-4 py-2 rounded-xl text-xs font-bold text-white ${theme.primary} ${!fileName ? 'opacity-40' : ''}`}>
            Next <ChevronRight size={12} className="inline" />
          </button>
        </div>
      )}

      {/* Step 3: Validate */}
      {currentStep === 2 && (
        <div className="space-y-3">
          <div className="flex items-center gap-4 mb-2">
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600"><CheckCircle size={14} /> {validCount} valid</span>
            <span className="flex items-center gap-1 text-xs font-bold text-red-500"><AlertTriangle size={14} /> {errorCount} errors</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className={theme.secondaryBg}>
                <tr>{templateFields.map(f => <th key={f} className={`text-left px-3 py-2 ${theme.iconColor} font-bold text-[10px] uppercase`}>{f}</th>)}<th className={`px-3 py-2 text-[10px] ${theme.iconColor}`}>Status</th></tr>
              </thead>
              <tbody>
                {sampleData.map((row, i) => (
                  <tr key={i} className={`border-t ${i === sampleData.length - 1 ? 'bg-red-50' : 'bg-emerald-50'}`}>
                    {row.map((c, j) => <td key={j} className="px-3 py-2">{c}</td>)}
                    <td className="px-3 py-2">{i === sampleData.length - 1 ? <AlertTriangle size={12} className="text-red-500" /> : <CheckCircle size={12} className="text-emerald-500" />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={() => setCurrentStep(3)} className={`px-4 py-2 rounded-xl text-xs font-bold text-white ${theme.primary}`}>
            Next <ChevronRight size={12} className="inline" />
          </button>
        </div>
      )}

      {/* Step 4: Import */}
      {currentStep === 3 && (
        <div className="text-center py-6 space-y-3">
          {done ? (
            <div className="space-y-2 animate-pulse">
              <CheckCircle size={40} className="mx-auto text-emerald-500" />
              <p className={`text-sm font-bold ${theme.highlight}`}>Successfully imported {validCount} {entityName} records!</p>
            </div>
          ) : (
            <>
              <p className={`text-xs ${theme.iconColor}`}>Ready to import <strong>{validCount}</strong> {entityName} records ({errorCount} skipped due to errors)</p>
              <button onClick={() => { setImporting(true); setTimeout(() => { setImporting(false); setDone(true); }, 1500); }}
                disabled={importing}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold text-white ${theme.primary} ${importing ? 'opacity-60' : ''}`}>
                {importing ? 'Importing...' : `Import ${validCount} Records`}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
