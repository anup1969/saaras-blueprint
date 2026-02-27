'use client';

import React, { useState } from 'react';
import { StatCard, StatusBadge, DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  Plus, Check, Clock, AlertTriangle, Database, CheckCircle, Upload, ArrowDownToLine, Table2,
} from 'lucide-react';
import { schools } from './mockData';

export default function DataMigrationView({ theme }: { theme: Theme }) {
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const stepLabels = ['Source', 'Upload', 'Field Mapping', 'Validation', 'Import'];

  const recentMigrations = [
    { id: 'MIG001', school: 'Delhi Public School', source: 'Fedena ERP', date: '10 Jan 2026', records: '4,250', tables: 12, status: 'Completed', duration: '2h 15m' },
    { id: 'MIG002', school: 'Navrachana Vidyani', source: 'Excel Sheets', date: '08 Jan 2026', records: '3,100', tables: 8, status: 'Completed', duration: '1h 40m' },
    { id: 'MIG003', school: 'Udgam School', source: 'Tally + Excel', date: '05 Jan 2026', records: '2,800', tables: 6, status: 'Completed', duration: '1h 20m' },
    { id: 'MIG004', school: 'SAL International', source: 'Manual Entry', date: '15 Feb 2026', records: '—', tables: 0, status: 'Pending', duration: '—' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-bold ${theme.highlight}`}>Data Migration Tools</h2>
          <p className={`text-xs ${theme.iconColor}`}>Migrate school data from legacy systems to Saaras</p>
        </div>
        <button onClick={() => setStep(1)} className={`flex items-center gap-2 px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>
          <Plus size={14} /> New Migration
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Database} label="Total Migrations" value={recentMigrations.length} color="bg-blue-500" theme={theme} />
        <StatCard icon={CheckCircle} label="Completed" value={recentMigrations.filter(m => m.status === 'Completed').length} color="bg-emerald-500" theme={theme} />
        <StatCard icon={Clock} label="Pending" value={recentMigrations.filter(m => m.status === 'Pending').length} color="bg-amber-500" theme={theme} />
        <StatCard icon={Table2} label="Total Records Migrated" value="10,150" color="bg-purple-500" theme={theme} />
      </div>

      {/* Migration Wizard */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-4`}>Migration Wizard</h3>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-6">
          {stepLabels.map((label, i) => (
            <React.Fragment key={label}>
              <div className="flex items-center gap-1.5">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  i + 1 < step ? 'bg-emerald-500 text-white' :
                  i + 1 === step ? `${theme.primary} text-white` :
                  `${theme.secondaryBg} ${theme.iconColor}`
                }`}>
                  {i + 1 < step ? <Check size={12} /> : i + 1}
                </div>
                <span className={`text-[10px] font-bold ${i + 1 <= step ? theme.highlight : theme.iconColor}`}>{label}</span>
              </div>
              {i < totalSteps - 1 && (
                <div className={`flex-1 h-0.5 rounded ${i + 1 < step ? 'bg-emerald-500' : `${theme.secondaryBg}`}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step Content */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Target School</label>
                <select className={`w-full px-3 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm ${theme.highlight} outline-none`}>
                  <option value="">Select school...</option>
                  {schools.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Source System</label>
                <select className={`w-full px-3 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm ${theme.highlight} outline-none`}>
                  <option value="">Select source...</option>
                  <option>Excel / CSV Sheets</option>
                  <option>Fedena ERP</option>
                  <option>Entab CampusCare</option>
                  <option>MyClassboard</option>
                  <option>Tally (Fee Data)</option>
                  <option>Custom SQL Database</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Data Categories to Migrate</label>
              <div className="flex flex-wrap gap-2">
                {['Students', 'Staff', 'Fee Records', 'Attendance', 'Exam Results', 'Transport', 'Library', 'Parent Contacts', 'Timetable', 'Inventory'].map(cat => (
                  <button key={cat} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border ${theme.border} ${theme.cardBg} ${theme.iconColor} ${theme.buttonHover} transition-all`}>{cat}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className={`p-8 rounded-xl border-2 border-dashed ${theme.border} text-center`}>
              <Upload size={32} className={`${theme.iconColor} mx-auto mb-3`} />
              <p className={`text-sm font-bold ${theme.highlight}`}>Drag & drop files here</p>
              <p className={`text-xs ${theme.iconColor} mt-1`}>Supports .xlsx, .csv, .json, .sql files (max 100MB each)</p>
              <button className={`mt-3 px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>Browse Files</button>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1`}>Uploaded Files</p>
              <div className="space-y-1.5">
                {['students_master.xlsx (2.4 MB)', 'fee_records_2024-25.csv (1.8 MB)', 'staff_data.xlsx (0.9 MB)'].map((f, i) => (
                  <div key={i} className={`flex items-center justify-between p-2 rounded-lg ${theme.cardBg} border ${theme.border}`}>
                    <span className={`text-xs ${theme.highlight}`}>{f}</span>
                    <CheckCircle size={14} className="text-emerald-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <p className={`text-xs ${theme.iconColor}`}>Map source columns to Saaras fields. Auto-detected mappings shown below.</p>
            <DataTable
              headers={['Source Column', 'Saaras Field', 'Status', '']}
              rows={[
                ['Student Name', 'students.full_name', 'Mapped'],
                ['Roll Number', 'students.roll_number', 'Mapped'],
                ['Father Name', 'parents.father_name', 'Mapped'],
                ['Mother Name', 'parents.mother_name', 'Mapped'],
                ['Class', 'students.class_id', 'Mapped'],
                ['Section', 'students.section', 'Mapped'],
                ['DOB', 'students.date_of_birth', 'Mapped'],
                ['Fee Amount', 'fee_records.amount', 'Mapped'],
                ['Custom Field 1', '—', 'Unmapped'],
                ['Custom Field 2', '—', 'Unmapped'],
              ].map(([src, dst, status]) => [
                <span key="src" className={`text-xs font-bold ${theme.highlight}`}>{src}</span>,
                <span key="dst" className={`text-xs ${status === 'Mapped' ? theme.primaryText : 'text-red-500'} font-mono`}>{dst}</span>,
                <StatusBadge key="status" status={status === 'Mapped' ? 'Active' : 'Pending'} theme={theme} />,
                <button key="action" className={`text-xs ${theme.primaryText} font-bold`}>{status === 'Mapped' ? 'Change' : 'Map'}</button>,
              ])}
              theme={theme}
            />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
                <p className={`text-lg font-bold text-emerald-600`}>4,250</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Valid Records</p>
              </div>
              <div className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
                <p className={`text-lg font-bold text-amber-600`}>23</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Warnings</p>
              </div>
              <div className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
                <p className={`text-lg font-bold text-red-500`}>8</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Errors</p>
              </div>
              <div className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
                <p className={`text-lg font-bold ${theme.highlight}`}>12</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Tables</p>
              </div>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-2`}>Validation Issues</p>
              <div className="space-y-1.5">
                {[
                  { type: 'Error', msg: 'Missing DOB for 5 student records (rows 45, 128, 302, 567, 812)' },
                  { type: 'Error', msg: 'Duplicate roll numbers found: 3 records in Class 10-A' },
                  { type: 'Warning', msg: '15 phone numbers in invalid format — will be imported as-is' },
                  { type: 'Warning', msg: '8 fee records have no corresponding student — skipping' },
                ].map((issue, i) => (
                  <div key={i} className={`flex items-start gap-2 p-2 rounded-lg ${issue.type === 'Error' ? 'bg-red-50 border border-red-200' : 'bg-amber-50 border border-amber-200'}`}>
                    <AlertTriangle size={12} className={`mt-0.5 shrink-0 ${issue.type === 'Error' ? 'text-red-500' : 'text-amber-500'}`} />
                    <p className={`text-xs ${issue.type === 'Error' ? 'text-red-700' : 'text-amber-700'}`}>{issue.msg}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <div className="text-center py-6">
              <div className={`w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mx-auto mb-4`}>
                <ArrowDownToLine size={28} />
              </div>
              <p className={`text-sm font-bold ${theme.highlight}`}>Ready to Import</p>
              <p className={`text-xs ${theme.iconColor} mt-1`}>4,250 records across 12 tables will be imported into Delhi Public School</p>
            </div>
            {/* Progress Bar (mock at 0%) */}
            <div>
              <div className="flex justify-between mb-1">
                <span className={`text-xs font-bold ${theme.highlight}`}>Import Progress</span>
                <span className={`text-xs font-bold ${theme.iconColor}`}>0%</span>
              </div>
              <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: '0%' }} />
              </div>
              <p className={`text-[10px] ${theme.iconColor} mt-1`}>Click &quot;Start Import&quot; to begin. This may take 15-30 minutes.</p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6 pt-4 border-t" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className={`px-4 py-2 rounded-xl text-xs font-bold ${step === 1 ? 'opacity-30 cursor-not-allowed' : ''} ${theme.secondaryBg} ${theme.highlight}`}
          >
            ← Previous
          </button>
          {step < totalSteps ? (
            <button
              onClick={() => setStep(step + 1)}
              className={`px-5 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}
            >
              Next →
            </button>
          ) : (
            <button
              onClick={() => window.alert('Data import started! This will take approximately 20 minutes. (Blueprint demo)')}
              className="px-5 py-2 bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2"
            >
              <ArrowDownToLine size={14} /> Start Import
            </button>
          )}
        </div>
      </div>

      {/* Recent Migrations Table */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Recent Migrations</h3>
        <DataTable
          headers={['ID', 'School', 'Source', 'Date', 'Records', 'Tables', 'Duration', 'Status']}
          rows={recentMigrations.map(m => [
            <span key="id" className={`text-xs font-mono ${theme.primaryText}`}>{m.id}</span>,
            <span key="school" className={`text-xs font-bold ${theme.highlight}`}>{m.school}</span>,
            <span key="src" className={`text-xs ${theme.iconColor}`}>{m.source}</span>,
            <span key="date" className={`text-xs ${theme.iconColor}`}>{m.date}</span>,
            <span key="records" className={`text-xs font-bold ${theme.highlight}`}>{m.records}</span>,
            <span key="tables" className={`text-xs ${theme.iconColor}`}>{m.tables}</span>,
            <span key="duration" className={`text-xs ${theme.iconColor}`}>{m.duration}</span>,
            <StatusBadge key="status" status={m.status === 'Completed' ? 'Active' : 'Pending'} theme={theme} />,
          ])}
          theme={theme}
        />
      </div>
    </div>
  );
}
