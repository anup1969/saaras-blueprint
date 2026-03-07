'use client';

import React, { useState } from 'react';
import { Award, Upload, X, Plus, Search, Download, ChevronLeft, ChevronRight, Save, ArrowRight } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader } from '../_helpers/components';
import { BulkImportWizard } from '@/components/shared';
import type { Theme } from '../_helpers/types';

const PAGE_SIZE = 5;

type TabId = 'templates' | 'settings';

export default function CertificateConfigModule({ theme, activeTab: externalTab, onTabChange }: { theme: Theme; activeTab?: string; onTabChange?: (tab: string) => void }) {
  // ── Certificate Templates ──────────────────────────────────────────────────
  const [templates, setTemplates] = useState([
    { name: 'Transfer Certificate (TC)', status: 'uploaded', enabled: true, lastModified: '15 Jan 2025' },
    { name: 'Character Certificate', status: 'uploaded', enabled: true, lastModified: '15 Jan 2025' },
    { name: 'Bonafide Certificate', status: 'uploaded', enabled: true, lastModified: '10 Feb 2025' },
    { name: 'Migration Certificate', status: 'pending', enabled: true, lastModified: '-' },
    { name: 'Sports Certificate', status: 'pending', enabled: false, lastModified: '-' },
    { name: 'Merit Certificate', status: 'uploaded', enabled: true, lastModified: '20 Jan 2025' },
    { name: 'Conduct Certificate', status: 'uploaded', enabled: true, lastModified: '01 Mar 2025' },
    { name: 'Participation Certificate', status: 'pending', enabled: false, lastModified: '-' },
  ]);
  const [tmplSearch, setTmplSearch] = useState('');
  const [tmplPage, setTmplPage] = useState(1);
  const [showTmplImport, setShowTmplImport] = useState(false);

  const filteredTmpl = templates.filter(t => t.name.toLowerCase().includes(tmplSearch.toLowerCase()));
  const tmplPages = Math.ceil(filteredTmpl.length / PAGE_SIZE);
  const pagedTmpl = filteredTmpl.slice((tmplPage - 1) * PAGE_SIZE, tmplPage * PAGE_SIZE);

  // ── Certificate Features ───────────────────────────────────────────────────
  const [features, setFeatures] = useState<Record<string, boolean>>({
    'Auto-numbering (sequential)': true,
    'Digital signature': true,
    'QR code verification': true,
    'Watermark on PDF': true,
    'Approval required before generation': true,
    'Duplicate certificate tracking': true,
  });

  // ── Approval Workflow Steps ────────────────────────────────────────────────
  const [steps, setSteps] = useState([
    { label: 'Class Teacher Initiates', enabled: true },
    { label: 'Admin Verifies Details', enabled: true },
    { label: 'Principal Approves', enabled: true },
    { label: 'Certificate Generated', enabled: true },
  ]);
  const [stepSearch, setStepSearch] = useState('');
  const [stepPage, setStepPage] = useState(1);
  const [showStepImport, setShowStepImport] = useState(false);
  const [internalTab, setInternalTab] = useState<TabId>('templates');
  const activeTab = (externalTab as TabId) || internalTab;
  const setActiveTab = (tab: TabId) => { if (onTabChange) onTabChange(tab); else setInternalTab(tab); };

  const filteredSteps = steps.filter(s => s.label.toLowerCase().includes(stepSearch.toLowerCase()));
  const stepPages = Math.ceil(filteredSteps.length / PAGE_SIZE);
  const pagedSteps = filteredSteps.slice((stepPage - 1) * PAGE_SIZE, stepPage * PAGE_SIZE);

  const featureDesc: Record<string, string> = {
    'Auto-numbering (sequential)': 'Each certificate gets a unique sequential number (e.g., TC-2026-001)',
    'Digital signature': "Principal's digital signature is automatically embedded on generated certificates",
    'QR code verification': 'A QR code is printed on each certificate for authenticity verification',
    'Watermark on PDF': 'School watermark is overlaid on PDF certificates to prevent forgery',
    'Approval required before generation': 'Certificates must be approved by designated authority before printing',
    'Duplicate certificate tracking': 'System tracks if duplicate certificates are requested and logs the reason',
  };

  return (
    <div className="space-y-4">
      <ModuleHeader title="Certificate Configuration" subtitle="Templates, auto-numbering, digital signatures, and approval workflow" theme={theme} />

      {activeTab === 'templates' && (<div className="space-y-4">
      {/* ── Certificate Templates ── */}
      <SectionCard title="Certificate Templates" subtitle="Add, edit, upload, enable/disable, or remove certificate types" theme={theme}>
        {/* Count + Toolbar */}
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${theme.primary} text-white shrink-0`}>{templates.length} templates</span>
          <div className={`flex items-center gap-1.5 flex-1 px-2.5 py-1.5 rounded-xl border ${theme.border} ${theme.inputBg}`}>
            <Search size={12} className={theme.iconColor} />
            <input
              value={tmplSearch}
              onChange={e => { setTmplSearch(e.target.value); setTmplPage(1); }}
              placeholder="Search templates…"
              className={`flex-1 bg-transparent text-xs outline-none ${theme.highlight}`}
            />
          </div>
          <button
            onClick={() => console.log(templates.map(t => `${t.name},${t.status},${t.enabled},${t.lastModified}`).join('\n'))}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold ${theme.iconColor} ${theme.buttonHover} border ${theme.border}`}
          >
            <Download size={12} /> Export
          </button>
          <button
            onClick={() => setShowTmplImport(v => !v)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold ${theme.iconColor} ${theme.buttonHover} border ${theme.border}`}
          >
            <Upload size={12} /> Import
          </button>
          <button
            onClick={() => setTemplates(p => [...p, { name: '', status: 'pending', enabled: true, lastModified: '-' }])}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold ${theme.primary} text-white`}
          >
            <Plus size={12} /> Add
          </button>
        </div>

        {showTmplImport && (
          <div className="mb-2">
            <BulkImportWizard
              entityName="Certificate Templates"
              templateFields={['Certificate Name', 'Status', 'Enabled']}
              sampleData={[['Bonafide Certificate', 'uploaded', 'true']]}
              theme={theme}
            />
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className={theme.secondaryBg}>
                {['Certificate Name', 'Status', 'Last Modified', 'Enabled', 'Actions'].map(h => (
                  <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor} uppercase text-[10px]`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pagedTmpl.map((t, i) => {
                const realIdx = templates.indexOf(t);
                return (
                  <tr key={i} className={`border-t ${theme.border}`}>
                    <td className="px-2 py-1.5">
                      <div className="flex items-center gap-1.5">
                        <Award size={13} className={t.status === 'uploaded' ? 'text-emerald-500' : 'text-slate-400'} />
                        <input
                          value={t.name}
                          onChange={e => { const n = [...templates]; n[realIdx] = { ...n[realIdx], name: e.target.value }; setTemplates(n); }}
                          className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`}
                        />
                      </div>
                    </td>
                    <td className="px-2 py-1.5">
                      <select
                        value={t.status}
                        onChange={e => { const n = [...templates]; n[realIdx] = { ...n[realIdx], status: e.target.value }; setTemplates(n); }}
                        className={`text-[9px] px-1.5 py-0.5 rounded-lg font-bold border-0 outline-none ${t.status === 'uploaded' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}
                      >
                        <option value="uploaded">UPLOADED</option>
                        <option value="pending">PENDING</option>
                      </select>
                    </td>
                    <td className={`px-3 py-2 text-[10px] ${theme.iconColor}`}>{t.lastModified}</td>
                    <td className="px-3 py-2">
                      <SSAToggle on={t.enabled} onChange={() => { const n = [...templates]; n[realIdx] = { ...n[realIdx], enabled: !n[realIdx].enabled }; setTemplates(n); }} theme={theme} />
                    </td>
                    <td className="px-2 py-1.5">
                      <div className="flex items-center gap-2">
                        <button className={`p-1 rounded-lg ${theme.buttonHover}`} title="Upload template file"><Upload size={12} className={theme.iconColor} /></button>
                        <button onClick={() => setTemplates(p => p.filter((_, j) => j !== realIdx))} className="text-red-400 hover:text-red-600"><X size={12} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {tmplPages > 1 && (
          <div className="flex items-center justify-between mt-2">
            <span className={`text-[10px] ${theme.iconColor}`}>
              Showing {(tmplPage - 1) * PAGE_SIZE + 1}–{Math.min(tmplPage * PAGE_SIZE, filteredTmpl.length)} of {filteredTmpl.length}
            </span>
            <div className="flex items-center gap-1">
              <button onClick={() => setTmplPage(p => Math.max(1, p - 1))} disabled={tmplPage === 1}
                className={`p-1 rounded-lg ${theme.buttonHover} disabled:opacity-30`}>
                <ChevronLeft size={12} className={theme.iconColor} />
              </button>
              {Array.from({ length: tmplPages }, (_, i) => (
                <button key={i} onClick={() => setTmplPage(i + 1)}
                  className={`w-6 h-6 text-[10px] rounded-lg font-bold ${tmplPage === i + 1 ? `${theme.primary} text-white` : `${theme.iconColor} ${theme.buttonHover}`}`}>
                  {i + 1}
                </button>
              ))}
              <button onClick={() => setTmplPage(p => Math.min(tmplPages, p + 1))} disabled={tmplPage === tmplPages}
                className={`p-1 rounded-lg ${theme.buttonHover} disabled:opacity-30`}>
                <ChevronRight size={12} className={theme.iconColor} />
              </button>
            </div>
          </div>
        )}
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        {/* ── Certificate Features ── */}
        <SectionCard title="Certificate Features" subtitle="Security and workflow features applied to all certificate types" theme={theme}>
          <div className="space-y-2">
            {Object.entries(features).map(([feat, enabled]) => (
              <div key={feat} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{feat}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{featureDesc[feat]}</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setFeatures(p => ({ ...p, [feat]: !p[feat] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ── Approval Workflow Steps ── */}
        <SectionCard title="Approval Workflow Steps" subtitle="Add, edit, enable/disable, or remove approval steps" theme={theme}>
          {/* Count + Toolbar */}
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${theme.primary} text-white shrink-0`}>{steps.length} steps</span>
            <div className={`flex items-center gap-1.5 flex-1 px-2 py-1.5 rounded-xl border ${theme.border} ${theme.inputBg}`}>
              <Search size={11} className={theme.iconColor} />
              <input
                value={stepSearch}
                onChange={e => { setStepSearch(e.target.value); setStepPage(1); }}
                placeholder="Search steps…"
                className={`flex-1 bg-transparent text-xs outline-none ${theme.highlight}`}
              />
            </div>
            <button
              onClick={() => console.log(steps.map((s, i) => `${i + 1},${s.label},${s.enabled}`).join('\n'))}
              className={`flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs font-bold ${theme.iconColor} ${theme.buttonHover} border ${theme.border}`}
            >
              <Download size={11} /> Export
            </button>
            <button
              onClick={() => setShowStepImport(v => !v)}
              className={`flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs font-bold ${theme.iconColor} ${theme.buttonHover} border ${theme.border}`}
            >
              <Upload size={11} /> Import
            </button>
            <button
              onClick={() => setSteps(p => [...p, { label: '', enabled: true }])}
              className={`flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs font-bold ${theme.primary} text-white`}
            >
              <Plus size={11} />
            </button>
          </div>

          {showStepImport && (
            <div className="mb-2">
              <BulkImportWizard
                entityName="Approval Steps"
                templateFields={['Step Label', 'Enabled']}
                sampleData={[['Admin Verifies', 'true']]}
                theme={theme}
              />
            </div>
          )}

          <div className="space-y-1.5">
            {pagedSteps.map((s, i) => {
              const realIdx = steps.indexOf(s);
              const displayNum = (stepPage - 1) * PAGE_SIZE + i + 1;
              return (
                <div key={i} className={`flex items-center gap-2 p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <span className={`text-[10px] w-6 h-6 rounded-full ${theme.primary} text-white flex items-center justify-center font-bold shrink-0`}>{displayNum}</span>
                  <input
                    value={s.label}
                    onChange={e => { const n = [...steps]; n[realIdx] = { ...n[realIdx], label: e.target.value }; setSteps(n); }}
                    className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`}
                  />
                  <SSAToggle on={s.enabled} onChange={() => { const n = [...steps]; n[realIdx] = { ...n[realIdx], enabled: !n[realIdx].enabled }; setSteps(n); }} theme={theme} />
                  <button onClick={() => setSteps(p => p.filter((_, j) => j !== realIdx))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {stepPages > 1 && (
            <div className="flex items-center justify-between mt-2">
              <span className={`text-[10px] ${theme.iconColor}`}>
                {(stepPage - 1) * PAGE_SIZE + 1}–{Math.min(stepPage * PAGE_SIZE, filteredSteps.length)} of {filteredSteps.length}
              </span>
              <div className="flex items-center gap-1">
                <button onClick={() => setStepPage(p => Math.max(1, p - 1))} disabled={stepPage === 1}
                  className={`p-1 rounded-lg ${theme.buttonHover} disabled:opacity-30`}>
                  <ChevronLeft size={12} className={theme.iconColor} />
                </button>
                {Array.from({ length: stepPages }, (_, i) => (
                  <button key={i} onClick={() => setStepPage(i + 1)}
                    className={`w-6 h-6 text-[10px] rounded-lg font-bold ${stepPage === i + 1 ? `${theme.primary} text-white` : `${theme.iconColor} ${theme.buttonHover}`}`}>
                    {i + 1}
                  </button>
                ))}
                <button onClick={() => setStepPage(p => Math.min(stepPages, p + 1))} disabled={stepPage === stepPages}
                  className={`p-1 rounded-lg ${theme.buttonHover} disabled:opacity-30`}>
                  <ChevronRight size={12} className={theme.iconColor} />
                </button>
              </div>
            </div>
          )}
        </SectionCard>
      </div>
      </div>)}

      {activeTab === 'settings' && (<div className="space-y-4">
      <SectionCard title="Role-Based Permissions" subtitle="Managed centrally in Roles & Permission module" theme={theme}>
        <div className={`flex items-center gap-3 p-3 rounded-xl ${theme.accentBg} border ${theme.border}`}>
          <div className="flex-1">
            <p className={`text-xs ${theme.iconColor}`}>Role & permission settings for Certificates are configured in <span className={`font-bold ${theme.primaryText}`}>Roles & Permission Management</span></p>
          </div>
          <ArrowRight size={16} className={theme.iconColor} />
        </div>
      </SectionCard>

      <SectionCard title="Bulk Import" subtitle="Import certificate records from Excel templates" theme={theme}>
        <BulkImportWizard
          entityName="Certificate Records"
          templateFields={['Student Name', 'Class', 'Certificate Type', 'Issue Date', 'Serial No']}
          sampleData={[['Aarav Patel', 'Grade 10', 'Transfer Certificate', '2026-03-15', 'TC-2026-001']]}
          theme={theme}
        />
      </SectionCard>
      </div>)}

      {/* ── Save ── */}
      <div className="flex justify-end pt-1">
        <button className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold ${theme.primary} text-white shadow`}>
          <Save size={14} /> Save Certificate Configuration
        </button>
      </div>
    </div>
  );
}
