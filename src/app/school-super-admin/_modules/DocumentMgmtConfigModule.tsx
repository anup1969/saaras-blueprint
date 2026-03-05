'use client';

import React, { useState } from 'react';
import { X, Plus, Search, Download, Upload, ChevronLeft, ChevronRight, Pencil, Save } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import { BulkImportWizard } from '@/components/shared';
import type { Theme } from '../_helpers/types';

const ROLES = ['Super Admin', 'School Admin', 'Principal', 'Teacher', 'Parent', 'Student'];
const PAGE_SIZE = 5;

export default function DocumentMgmtConfigModule({ theme }: { theme: Theme }) {
  // ── Document Categories — full table ─────────────────────────────────────
  const [categories, setCategories] = useState([
    { name: 'Circulars', enabled: true },
    { name: 'Notices', enabled: true },
    { name: 'Policies', enabled: true },
    { name: 'Forms', enabled: true },
    { name: 'Templates', enabled: true },
    { name: 'Reports', enabled: true },
    { name: 'Certificates', enabled: true },
  ]);
  const [catSearch, setCatSearch] = useState('');
  const [catPage, setCatPage] = useState(1);
  const [catEdit, setCatEdit] = useState<number | null>(null);
  const [newCategory, setNewCategory] = useState('');
  const [showCatImport, setShowCatImport] = useState(false);

  const filteredCat = categories.filter(c => c.name.toLowerCase().includes(catSearch.toLowerCase()));
  const catPages = Math.ceil(filteredCat.length / PAGE_SIZE);
  const pagedCat = filteredCat.slice((catPage - 1) * PAGE_SIZE, catPage * PAGE_SIZE);

  // ── Access Control grid (ALL categories) ─────────────────────────────────
  const [accessGrid, setAccessGrid] = useState<Record<string, Record<string, boolean>>>(() => {
    const grid: Record<string, Record<string, boolean>> = {};
    const catNames = ['Circulars', 'Notices', 'Policies', 'Forms', 'Templates', 'Reports', 'Certificates'];
    ROLES.forEach(role => {
      grid[role] = {};
      catNames.forEach(cat => {
        grid[role][`${cat}-view`] = true;
        grid[role][`${cat}-download`] = role !== 'Student';
        grid[role][`${cat}-upload`] = role === 'Super Admin' || role === 'School Admin' || role === 'Principal';
      });
    });
    return grid;
  });

  const toggleAccess = (role: string, key: string) => {
    setAccessGrid(prev => ({
      ...prev,
      [role]: { ...prev[role], [key]: !prev[role][key] },
    }));
  };

  const ensureGridEntry = (catName: string) => {
    setAccessGrid(prev => {
      const next = { ...prev };
      ROLES.forEach(role => {
        if (!next[role]) next[role] = {};
        if (next[role][`${catName}-view`] === undefined) {
          next[role][`${catName}-view`] = true;
          next[role][`${catName}-download`] = role !== 'Student';
          next[role][`${catName}-upload`] = role === 'Super Admin' || role === 'School Admin' || role === 'Principal';
        }
      });
      return next;
    });
  };

  // ── File Formats — full table ──────────────────────────────────────────────
  const [fileFormats, setFileFormats] = useState([
    { fmt: 'PDF', enabled: true },
    { fmt: 'DOC', enabled: true },
    { fmt: 'DOCX', enabled: true },
    { fmt: 'XLS', enabled: true },
    { fmt: 'XLSX', enabled: true },
    { fmt: 'JPG', enabled: true },
    { fmt: 'PNG', enabled: true },
  ]);
  const [fmtSearch, setFmtSearch] = useState('');
  const [fmtPage, setFmtPage] = useState(1);
  const [fmtEdit, setFmtEdit] = useState<number | null>(null);
  const [newFmt, setNewFmt] = useState('');
  const [showFmtImport, setShowFmtImport] = useState(false);

  const filteredFmt = fileFormats.filter(f => f.fmt.toLowerCase().includes(fmtSearch.toLowerCase()));
  const fmtPages = Math.ceil(filteredFmt.length / PAGE_SIZE);
  const pagedFmt = filteredFmt.slice((fmtPage - 1) * PAGE_SIZE, fmtPage * PAGE_SIZE);

  // ── Storage Settings ───────────────────────────────────────────────────────
  const [maxFileSize, setMaxFileSize] = useState('10');

  // ── Versioning ────────────────────────────────────────────────────────────
  const [enableVersioning, setEnableVersioning] = useState(true);
  const [maxVersions, setMaxVersions] = useState('5');

  // ── Circular Distribution ─────────────────────────────────────────────────
  const [autoNotify, setAutoNotify] = useState(true);
  const [acknowledgementRequired, setAcknowledgementRequired] = useState(true);
  const [reminderInterval, setReminderInterval] = useState('3 Days');

  // ── Template Library ──────────────────────────────────────────────────────
  const [enableTemplateLibrary, setEnableTemplateLibrary] = useState(true);
  const [templateCategories, setTemplateCategories] = useState('Admission, Fee, Leave, Transfer');

  return (
    <div className="space-y-4">
      <ModuleHeader title="Document Management Configuration" subtitle="Categories, access control, storage, versioning, and circular distribution" theme={theme} />

      {/* ── Document Categories ── */}
      <SectionCard title="Document Categories" subtitle="Add, edit, enable/disable, or remove document categories" theme={theme}>
        {/* Count + Toolbar */}
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${theme.primary} text-white shrink-0`}>{categories.length} categories</span>
          <div className={`flex items-center gap-1.5 flex-1 px-2.5 py-1.5 rounded-xl border ${theme.border} ${theme.inputBg}`}>
            <Search size={12} className={theme.iconColor} />
            <input
              value={catSearch}
              onChange={e => { setCatSearch(e.target.value); setCatPage(1); }}
              placeholder="Search categories…"
              className={`flex-1 bg-transparent text-xs outline-none ${theme.highlight}`}
            />
          </div>
          <button
            onClick={() => console.log(categories.map(c => `${c.name},${c.enabled}`).join('\n'))}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold ${theme.iconColor} ${theme.buttonHover} border ${theme.border}`}>
            <Download size={12} /> Export
          </button>
          <button
            onClick={() => setShowCatImport(v => !v)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold ${theme.iconColor} ${theme.buttonHover} border ${theme.border}`}>
            <Upload size={12} /> Import
          </button>
          <button
            onClick={() => setCategories(p => [...p, { name: '', enabled: true }])}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold ${theme.primary} text-white`}>
            <Plus size={12} /> Add
          </button>
        </div>

        {showCatImport && (
          <div className="mb-2">
            <BulkImportWizard entityName="Document Categories" templateFields={['Category Name', 'Enabled']} sampleData={[['Circulars', 'true']]} theme={theme} />
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className={theme.secondaryBg}>
                {['Category Name', 'Enabled', 'Actions'].map(h => (
                  <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor} uppercase text-[10px]`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pagedCat.map((c, i) => {
                const realIdx = categories.indexOf(c);
                return (
                  <tr key={i} className={`border-t ${theme.border}`}>
                    <td className="px-2 py-1.5">
                      {catEdit === realIdx ? (
                        <input
                          autoFocus
                          value={c.name}
                          onChange={e => { const n = [...categories]; n[realIdx] = { ...n[realIdx], name: e.target.value }; setCategories(n); }}
                          className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`}
                        />
                      ) : (
                        <span className={`font-bold ${theme.highlight}`}>{c.name}</span>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <SSAToggle on={c.enabled} onChange={() => { const n = [...categories]; n[realIdx] = { ...n[realIdx], enabled: !n[realIdx].enabled }; setCategories(n); }} theme={theme} />
                    </td>
                    <td className="px-2 py-1.5">
                      <div className="flex items-center gap-2">
                        {catEdit === realIdx ? (
                          <button onClick={() => setCatEdit(null)} className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${theme.primary} text-white`}>Done</button>
                        ) : (
                          <button onClick={() => setCatEdit(realIdx)} className={`p-1 rounded-lg ${theme.buttonHover}`}><Pencil size={12} className={theme.iconColor} /></button>
                        )}
                        <button onClick={() => setCategories(prev => prev.filter((_, j) => j !== realIdx))} className="text-red-400 hover:text-red-600"><X size={12} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Quick add */}
        <div className="flex items-center gap-2 mt-2">
          <InputField value={newCategory} onChange={setNewCategory} theme={theme} placeholder="New category name" />
          <button
            onClick={() => {
              if (newCategory.trim()) {
                const cat = newCategory.trim();
                setCategories(p => [...p, { name: cat, enabled: true }]);
                ensureGridEntry(cat);
                setNewCategory('');
              }
            }}
            className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold ${theme.iconColor} ${theme.buttonHover} border ${theme.border} whitespace-nowrap`}>
            <Plus size={12} /> Add
          </button>
        </div>

        {/* Pagination */}
        {catPages > 1 && (
          <div className="flex items-center justify-between mt-2">
            <span className={`text-[10px] ${theme.iconColor}`}>{(catPage - 1) * PAGE_SIZE + 1}–{Math.min(catPage * PAGE_SIZE, filteredCat.length)} of {filteredCat.length}</span>
            <div className="flex items-center gap-1">
              <button onClick={() => setCatPage(p => Math.max(1, p - 1))} disabled={catPage === 1} className={`p-1 rounded-lg ${theme.buttonHover} disabled:opacity-30`}><ChevronLeft size={12} className={theme.iconColor} /></button>
              {Array.from({ length: catPages }, (_, i) => (
                <button key={i} onClick={() => setCatPage(i + 1)} className={`w-6 h-6 text-[10px] rounded-lg font-bold ${catPage === i + 1 ? `${theme.primary} text-white` : `${theme.iconColor} ${theme.buttonHover}`}`}>{i + 1}</button>
              ))}
              <button onClick={() => setCatPage(p => Math.min(catPages, p + 1))} disabled={catPage === catPages} className={`p-1 rounded-lg ${theme.buttonHover} disabled:opacity-30`}><ChevronRight size={12} className={theme.iconColor} /></button>
            </div>
          </div>
        )}
      </SectionCard>

      {/* ── Access Control — ALL categories ── */}
      <SectionCard title="Access Control" subtitle="View, download, and upload permissions per role — all categories shown" theme={theme}>
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead>
              <tr className={theme.secondaryBg}>
                <th className={`text-left px-2 py-2 font-bold ${theme.iconColor} uppercase`}>Role</th>
                {categories.map(cat => (
                  <th key={cat.name} colSpan={3} className={`text-center px-1 py-2 font-bold ${theme.iconColor} uppercase border-l ${theme.border} whitespace-nowrap`}>{cat.name}</th>
                ))}
              </tr>
              <tr className={theme.secondaryBg}>
                <th />
                {categories.map(cat => (
                  <React.Fragment key={cat.name}>
                    <th className={`px-1 py-1 ${theme.iconColor} border-l ${theme.border}`}>V</th>
                    <th className={`px-1 py-1 ${theme.iconColor}`}>D</th>
                    <th className={`px-1 py-1 ${theme.iconColor}`}>U</th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROLES.map(role => (
                <tr key={role} className={`border-t ${theme.border}`}>
                  <td className={`px-2 py-2 font-bold ${theme.highlight} whitespace-nowrap`}>{role}</td>
                  {categories.map(cat => (
                    <React.Fragment key={cat.name}>
                      {(['view', 'download', 'upload'] as const).map(perm => (
                        <td key={perm} className={`text-center px-1 py-2 ${perm === 'view' ? `border-l ${theme.border}` : ''}`}>
                          <button
                            onClick={() => toggleAccess(role, `${cat.name}-${perm}`)}
                            className={`w-7 h-4 rounded-full relative transition-colors ${accessGrid[role]?.[`${cat.name}-${perm}`] ? theme.primary : 'bg-gray-300'}`}>
                            <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-transform ${accessGrid[role]?.[`${cat.name}-${perm}`] ? 'translate-x-3' : 'translate-x-0.5'}`} />
                          </button>
                        </td>
                      ))}
                    </React.Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={`text-[9px] ${theme.iconColor} mt-2`}>V = View &nbsp; D = Download &nbsp; U = Upload &nbsp;&nbsp; All {categories.length} categories shown</p>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        {/* ── File Formats — full table ── */}
        <SectionCard title="Allowed File Formats" subtitle="Add, edit, enable/disable permitted file types" theme={theme}>
          {/* Count + Toolbar */}
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${theme.primary} text-white shrink-0`}>{fileFormats.length} formats</span>
            <div className={`flex items-center gap-1 flex-1 px-2 py-1.5 rounded-xl border ${theme.border} ${theme.inputBg}`}>
              <Search size={11} className={theme.iconColor} />
              <input value={fmtSearch} onChange={e => { setFmtSearch(e.target.value); setFmtPage(1); }}
                placeholder="Search formats…"
                className={`flex-1 bg-transparent text-xs outline-none ${theme.highlight}`} />
            </div>
            <button onClick={() => console.log(fileFormats.map(f => `${f.fmt},${f.enabled}`).join('\n'))}
              className={`flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs font-bold ${theme.iconColor} ${theme.buttonHover} border ${theme.border}`}>
              <Download size={11} /> Export
            </button>
            <button onClick={() => setShowFmtImport(v => !v)}
              className={`flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs font-bold ${theme.iconColor} ${theme.buttonHover} border ${theme.border}`}>
              <Upload size={11} /> Import
            </button>
            <button
              onClick={() => setFileFormats(p => [...p, { fmt: '', enabled: true }])}
              className={`flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs font-bold ${theme.primary} text-white`}>
              <Plus size={11} />
            </button>
          </div>

          {showFmtImport && (
            <div className="mb-2">
              <BulkImportWizard entityName="File Formats" templateFields={['Format', 'Enabled']} sampleData={[['PDF', 'true']]} theme={theme} />
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className={theme.secondaryBg}>
                  {['Format', 'Enabled', 'Actions'].map(h => (
                    <th key={h} className={`text-left px-2 py-1.5 font-bold ${theme.iconColor} uppercase text-[10px]`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pagedFmt.map((f, i) => {
                  const realIdx = fileFormats.indexOf(f);
                  return (
                    <tr key={i} className={`border-t ${theme.border}`}>
                      <td className="px-2 py-1.5">
                        {fmtEdit === realIdx ? (
                          <input
                            autoFocus
                            value={f.fmt}
                            onChange={e => { const n = [...fileFormats]; n[realIdx] = { ...n[realIdx], fmt: e.target.value }; setFileFormats(n); }}
                            className={`w-20 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none uppercase`}
                          />
                        ) : (
                          <span className={`font-bold ${theme.highlight} uppercase`}>{f.fmt}</span>
                        )}
                      </td>
                      <td className="px-2 py-1.5">
                        <SSAToggle on={f.enabled} onChange={() => { const n = [...fileFormats]; n[realIdx] = { ...n[realIdx], enabled: !n[realIdx].enabled }; setFileFormats(n); }} theme={theme} />
                      </td>
                      <td className="px-2 py-1.5">
                        <div className="flex items-center gap-1.5">
                          {fmtEdit === realIdx ? (
                            <button onClick={() => setFmtEdit(null)} className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${theme.primary} text-white`}>Done</button>
                          ) : (
                            <button onClick={() => setFmtEdit(realIdx)} className={`p-1 rounded-lg ${theme.buttonHover}`}><Pencil size={11} className={theme.iconColor} /></button>
                          )}
                          <button onClick={() => setFileFormats(prev => prev.filter((_, j) => j !== realIdx))} className="text-red-400 hover:text-red-600"><X size={11} /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Quick add */}
          <div className="flex gap-2 mt-2">
            <input value={newFmt} onChange={e => setNewFmt(e.target.value.toUpperCase())}
              placeholder="e.g. MP4"
              className={`flex-1 px-2 py-1.5 rounded-xl border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none uppercase`} />
            <button
              onClick={() => { if (newFmt.trim()) { setFileFormats(p => [...p, { fmt: newFmt.trim().toUpperCase(), enabled: true }]); setNewFmt(''); } }}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold ${theme.primary} text-white`}>
              <Plus size={12} />
            </button>
          </div>

          {fmtPages > 1 && (
            <div className="flex items-center justify-between mt-2">
              <span className={`text-[10px] ${theme.iconColor}`}>{(fmtPage - 1) * PAGE_SIZE + 1}–{Math.min(fmtPage * PAGE_SIZE, filteredFmt.length)} of {filteredFmt.length}</span>
              <div className="flex items-center gap-1">
                <button onClick={() => setFmtPage(p => Math.max(1, p - 1))} disabled={fmtPage === 1} className={`p-1 rounded-lg ${theme.buttonHover} disabled:opacity-30`}><ChevronLeft size={11} className={theme.iconColor} /></button>
                {Array.from({ length: fmtPages }, (_, i) => (
                  <button key={i} onClick={() => setFmtPage(i + 1)} className={`w-5 h-5 text-[9px] rounded font-bold ${fmtPage === i + 1 ? `${theme.primary} text-white` : `${theme.iconColor} ${theme.buttonHover}`}`}>{i + 1}</button>
                ))}
                <button onClick={() => setFmtPage(p => Math.min(fmtPages, p + 1))} disabled={fmtPage === fmtPages} className={`p-1 rounded-lg ${theme.buttonHover} disabled:opacity-30`}><ChevronRight size={11} className={theme.iconColor} /></button>
              </div>
            </div>
          )}
        </SectionCard>

        {/* ── Storage + Versioning stacked ── */}
        <div className="space-y-4">
          <SectionCard title="Storage Settings" subtitle="File size limit for uploads" theme={theme}>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max File Size (MB)</p>
              <InputField value={maxFileSize} onChange={setMaxFileSize} theme={theme} type="number" />
            </div>
          </SectionCard>

          <SectionCard title="Versioning" subtitle="Document version control settings" theme={theme}>
            <div className="space-y-2.5">
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>Enable Versioning</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Keep previous versions when documents are updated</p>
                </div>
                <SSAToggle on={enableVersioning} onChange={() => setEnableVersioning(!enableVersioning)} theme={theme} />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max Versions to Keep</p>
                <InputField value={maxVersions} onChange={setMaxVersions} theme={theme} type="number" />
              </div>
            </div>
          </SectionCard>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* ── Circular Distribution ── */}
        <SectionCard title="Circular Distribution" subtitle="Notification and acknowledgement settings for circulars" theme={theme}>
          <div className="space-y-2.5">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Auto-Notify on New Circular</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Send push notification when a new circular is published</p>
              </div>
              <SSAToggle on={autoNotify} onChange={() => setAutoNotify(!autoNotify)} theme={theme} />
            </div>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Acknowledgement Required</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Recipients must confirm they have read the circular</p>
              </div>
              <SSAToggle on={acknowledgementRequired} onChange={() => setAcknowledgementRequired(!acknowledgementRequired)} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Reminder Interval</p>
              <SelectField options={['1 Day', '3 Days', '5 Days', '7 Days']} value={reminderInterval} onChange={setReminderInterval} theme={theme} />
            </div>
          </div>
        </SectionCard>

        {/* ── Template Library ── */}
        <SectionCard title="Template Library" subtitle="Pre-built document templates for school use" theme={theme}>
          <div className="space-y-2.5">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Enable Template Library</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Allow staff to use pre-built templates for common documents</p>
              </div>
              <SSAToggle on={enableTemplateLibrary} onChange={() => setEnableTemplateLibrary(!enableTemplateLibrary)} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Template Categories (comma-separated)</p>
              <InputField value={templateCategories} onChange={setTemplateCategories} theme={theme} placeholder="Admission, Fee, Leave, Transfer" />
            </div>
          </div>
        </SectionCard>
      </div>

      {/* ── Save ── */}
      <div className="flex justify-end pt-1">
        <button className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold ${theme.primary} text-white shadow`}>
          <Save size={14} /> Save Document Management Configuration
        </button>
      </div>
    </div>
  );
}
