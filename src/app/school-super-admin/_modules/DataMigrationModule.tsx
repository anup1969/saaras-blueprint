'use client';

import React, { useState } from 'react';
import { AlertTriangle, Download, Upload, FileText, X, CheckCircle } from 'lucide-react';
import { SectionCard, ModuleHeader } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

export default function DataMigrationModule({ theme }: { theme: Theme }) {
  const [imports, setImports] = useState([
    { type: 'Students', template: 'students-template.xlsx', status: 'not-started' as string, records: 0, errors: 0, fileName: '', step: 0 },
    { type: 'Staff', template: 'staff-template.xlsx', status: 'not-started' as string, records: 0, errors: 0, fileName: '', step: 0 },
    { type: 'Fee Records', template: 'fees-template.xlsx', status: 'not-started' as string, records: 0, errors: 0, fileName: '', step: 0 },
    { type: 'Library Books', template: 'library-template.xlsx', status: 'not-started' as string, records: 0, errors: 0, fileName: '', step: 0 },
    { type: 'Transport Data', template: 'transport-template.xlsx', status: 'not-started' as string, records: 0, errors: 0, fileName: '', step: 0 },
    { type: 'Attendance History', template: 'attendance-template.xlsx', status: 'not-started' as string, records: 0, errors: 0, fileName: '', step: 0 },
  ]);
  const [recentImports, setRecentImports] = useState([
    { type: 'Students', date: '20 Feb 2026', records: 450, status: 'completed' },
    { type: 'Staff', date: '20 Feb 2026', records: 98, status: 'completed' },
  ]);
  const steps = ['Upload', 'Map Fields', 'Validate', 'Import'];

  const handleFileSelect = (index: number) => {
    setImports(p => {
      const n = [...p];
      n[index] = { ...n[index], fileName: `${n[index].type.toLowerCase().replace(/ /g, '-')}-data.xlsx`, step: 1, status: 'uploading' };
      return n;
    });
    // Simulate upload progression
    setTimeout(() => {
      setImports(p => { const n = [...p]; n[index] = { ...n[index], step: 2, status: 'mapping' }; return n; });
    }, 800);
  };

  const advanceStep = (index: number) => {
    setImports(p => {
      const n = [...p];
      const imp = n[index];
      if (imp.step === 2) { n[index] = { ...imp, step: 3, status: 'validating', records: Math.floor(Math.random() * 400) + 100, errors: Math.floor(Math.random() * 5) }; }
      else if (imp.step === 3) { n[index] = { ...imp, step: 4, status: 'completed' }; setRecentImports(prev => [{ type: imp.type, date: '26 Feb 2026', records: imp.records, status: 'completed' }, ...prev]); }
      return n;
    });
  };

  const rollbackImport = (type: string) => {
    setRecentImports(p => p.filter(r => r.type !== type));
    setImports(p => p.map(imp => imp.type === type ? { ...imp, status: 'not-started', step: 0, records: 0, errors: 0, fileName: '' } : imp));
  };

  return (
    <div className="space-y-4">
      <ModuleHeader title="Data Migration" subtitle="Import existing data with step-by-step validation — Upload, Map Fields, Validate, Import" theme={theme} />

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3">
        <AlertTriangle size={16} className="text-blue-500 mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-bold text-blue-800">Before You Import</p>
          <p className="text-xs text-blue-700 mt-1">Download the template for each data type, fill it following the format exactly, then upload. Validation runs automatically. You can rollback any import within 24 hours.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {imports.map((imp, i) => (
          <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className={`text-sm font-bold ${theme.highlight}`}>{imp.type}</h3>
              <span className={`text-[9px] px-2 py-0.5 rounded-lg font-bold ${
                imp.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                imp.status === 'not-started' ? 'bg-slate-100 text-slate-500' : 'bg-blue-100 text-blue-700'
              }`}>
                {imp.status === 'not-started' ? 'NOT STARTED' : imp.status.toUpperCase()}
              </span>
            </div>

            {/* Step progress indicator */}
            {imp.step > 0 && (
              <div className="flex items-center gap-1 mb-3">
                {steps.map((s, si) => (
                  <React.Fragment key={s}>
                    <div className={`flex items-center justify-center w-5 h-5 rounded-full text-[8px] font-bold ${
                      si < imp.step ? 'bg-emerald-500 text-white' : si === imp.step ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.iconColor}`
                    }`}>{si < imp.step ? '\u2713' : si + 1}</div>
                    {si < steps.length - 1 && <div className={`flex-1 h-0.5 ${si < imp.step ? 'bg-emerald-500' : theme.secondaryBg}`} />}
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* Download Template */}
            <button onClick={() => {
              const link = document.createElement('a');
              link.href = `data:text/csv;charset=utf-8,${encodeURIComponent(`ID,Name,${imp.type === 'Students' ? 'Class,Section,Roll No,Parent Name,Phone' : 'Department,Designation,Phone,Email'}\n`)}`;
              link.download = imp.template.replace('.xlsx', '.csv');
              link.click();
            }} className={`w-full flex items-center justify-center gap-2 p-2.5 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} mb-2 transition-all`}>
              <Download size={14} className={theme.iconColor} />
              <span className={`text-xs font-bold ${theme.iconColor}`}>Download Template</span>
            </button>

            {/* File upload area */}
            {imp.step === 0 && (
              <label className={`w-full border-2 border-dashed ${theme.border} rounded-xl p-4 text-center cursor-pointer ${theme.buttonHover} transition-all block`}>
                <input type="file" accept=".csv,.xlsx,.xls" className="hidden" onChange={() => handleFileSelect(i)} />
                <Upload size={20} className={`mx-auto mb-1 ${theme.iconColor}`} />
                <p className={`text-[10px] ${theme.iconColor}`}>Drop CSV/Excel file here or click to browse</p>
              </label>
            )}

            {/* File selected — show step actions */}
            {imp.step > 0 && imp.fileName && (
              <div className={`p-2.5 rounded-xl ${theme.secondaryBg} space-y-2`}>
                <div className="flex items-center gap-2">
                  <FileText size={12} className={theme.iconColor} />
                  <span className={`text-[10px] font-bold ${theme.highlight} flex-1 truncate`}>{imp.fileName}</span>
                  {imp.step < 4 && (
                    <button onClick={() => setImports(p => { const n = [...p]; n[i] = { ...n[i], step: 0, status: 'not-started', fileName: '', records: 0, errors: 0 }; return n; })}
                      className="text-red-400 hover:text-red-600"><X size={10} /></button>
                  )}
                </div>
                {imp.step === 2 && (
                  <div>
                    <p className={`text-[10px] ${theme.iconColor} mb-1`}>Map your file columns to system fields:</p>
                    <div className={`text-[9px] ${theme.iconColor} space-y-0.5`}>
                      <div className="flex justify-between"><span>Column A → Name</span><span className="text-emerald-500 font-bold">Mapped</span></div>
                      <div className="flex justify-between"><span>Column B → Class/Dept</span><span className="text-emerald-500 font-bold">Mapped</span></div>
                      <div className="flex justify-between"><span>Column C → Phone</span><span className="text-emerald-500 font-bold">Mapped</span></div>
                    </div>
                    <button onClick={() => advanceStep(i)} className={`mt-2 w-full px-3 py-1.5 rounded-xl text-[10px] font-bold ${theme.primary} text-white`}>Validate Data</button>
                  </div>
                )}
                {imp.step === 3 && (
                  <div>
                    <div className="flex justify-between text-[10px] mb-1">
                      <span className={theme.iconColor}>Records: <strong>{imp.records}</strong></span>
                      {imp.errors > 0 && <span className="text-amber-600">Warnings: {imp.errors}</span>}
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-200 mb-2">
                      <div className="h-full rounded-full bg-emerald-500" style={{ width: `${((imp.records - imp.errors) / imp.records) * 100}%` }} />
                    </div>
                    <button onClick={() => advanceStep(i)} className={`w-full px-3 py-1.5 rounded-xl text-[10px] font-bold ${theme.primary} text-white`}>Import {imp.records} Records</button>
                  </div>
                )}
                {imp.step === 4 && (
                  <div className="flex items-center gap-1.5 text-[10px]">
                    <CheckCircle size={12} className="text-emerald-500" />
                    <span className="text-emerald-700 font-bold">{imp.records} records imported successfully</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Recent imports with rollback */}
      {recentImports.length > 0 && (
        <SectionCard title="Recent Imports" subtitle="Rollback any import within 24 hours" theme={theme}>
          <div className={`rounded-xl border ${theme.border} overflow-hidden`}>
            <table className="w-full text-[10px]">
              <thead className={theme.secondaryBg}>
                <tr>
                  {['Data Type', 'Date', 'Records', 'Status', 'Action'].map(h => (
                    <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor} text-[9px] uppercase`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentImports.map((r, i) => (
                  <tr key={i} className={`border-t ${theme.border}`}>
                    <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{r.type}</td>
                    <td className={`px-3 py-2 ${theme.iconColor}`}>{r.date}</td>
                    <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{r.records}</td>
                    <td className="px-3 py-2"><span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-700">Completed</span></td>
                    <td className="px-3 py-2">
                      <button onClick={() => rollbackImport(r.type)} className="text-[9px] font-bold text-red-500 hover:underline">Rollback</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}
    </div>
  );
}
