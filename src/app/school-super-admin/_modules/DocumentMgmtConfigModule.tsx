'use client';

import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

const ROLES = ['Super Admin', 'School Admin', 'Principal', 'Teacher', 'Parent', 'Student'];

export default function DocumentMgmtConfigModule({ theme }: { theme: Theme }) {
  // Document Categories
  const [categories, setCategories] = useState([
    'Circulars', 'Notices', 'Policies', 'Forms', 'Templates', 'Reports', 'Certificates',
  ]);
  const [newCategory, setNewCategory] = useState('');

  // Access Control grid
  const [accessGrid, setAccessGrid] = useState<Record<string, Record<string, boolean>>>(() => {
    const grid: Record<string, Record<string, boolean>> = {};
    ROLES.forEach(role => {
      grid[role] = {};
      ['Circulars', 'Notices', 'Policies', 'Forms', 'Templates', 'Reports', 'Certificates'].forEach(cat => {
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

  // Storage Settings
  const [maxFileSize, setMaxFileSize] = useState('10');
  const [allowedFormats, setAllowedFormats] = useState<Record<string, boolean>>({
    PDF: true, DOC: true, DOCX: true, XLS: true, XLSX: true, JPG: true, PNG: true,
  });

  // Versioning
  const [enableVersioning, setEnableVersioning] = useState(true);
  const [maxVersions, setMaxVersions] = useState('5');

  // Circular Distribution
  const [autoNotify, setAutoNotify] = useState(true);
  const [acknowledgementRequired, setAcknowledgementRequired] = useState(true);
  const [reminderInterval, setReminderInterval] = useState('3 Days');

  // Template Library
  const [enableTemplateLibrary, setEnableTemplateLibrary] = useState(true);
  const [templateCategories, setTemplateCategories] = useState('Admission, Fee, Leave, Transfer');

  return (
    <div className="space-y-4">
      <ModuleHeader title="Document Management Configuration" subtitle="Categories, access control, storage, versioning, and circular distribution" theme={theme} />

      {/* Document Categories */}
      <SectionCard title="Document Categories" subtitle="Manage document types used across the school" theme={theme}>
        <div className="flex flex-wrap gap-2 mb-2">
          {categories.map((cat, i) => (
            <div key={cat} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${theme.secondaryBg} ${theme.highlight} text-xs font-bold`}>
              {cat}
              <button onClick={() => setCategories(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600">
                <X size={10} />
              </button>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <InputField value={newCategory} onChange={setNewCategory} theme={theme} placeholder="New category name" />
          <button onClick={() => { if (newCategory.trim()) { setCategories(p => [...p, newCategory.trim()]); setNewCategory(''); } }}
            className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold ${theme.iconColor} ${theme.buttonHover} border ${theme.border} whitespace-nowrap`}>
            <Plus size={12} /> Add
          </button>
        </div>
      </SectionCard>

      {/* Access Control */}
      <SectionCard title="Access Control" subtitle="Configure view, download, and upload permissions per role and category" theme={theme}>
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead>
              <tr className={theme.secondaryBg}>
                <th className={`text-left px-2 py-2 font-bold ${theme.iconColor} uppercase`}>Role</th>
                {categories.slice(0, 5).map(cat => (
                  <th key={cat} colSpan={3} className={`text-center px-1 py-2 font-bold ${theme.iconColor} uppercase border-l ${theme.border}`}>{cat}</th>
                ))}
              </tr>
              <tr className={theme.secondaryBg}>
                <th />
                {categories.slice(0, 5).map(cat => (
                  <React.Fragment key={cat}>
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
                  <td className={`px-2 py-2 font-bold ${theme.highlight}`}>{role}</td>
                  {categories.slice(0, 5).map(cat => (
                    <React.Fragment key={cat}>
                      {['view', 'download', 'upload'].map(perm => (
                        <td key={perm} className={`text-center px-1 py-2 ${perm === 'view' ? `border-l ${theme.border}` : ''}`}>
                          <button onClick={() => toggleAccess(role, `${cat}-${perm}`)}
                            className={`w-7 h-4 rounded-full relative transition-colors ${accessGrid[role]?.[`${cat}-${perm}`] ? theme.primary : 'bg-gray-300'}`}>
                            <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-transform ${accessGrid[role]?.[`${cat}-${perm}`] ? 'translate-x-3' : 'translate-x-0.5'}`} />
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
        <p className={`text-[9px] ${theme.iconColor} mt-2`}>V = View, D = Download, U = Upload. Showing first 5 categories.</p>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        {/* Storage Settings */}
        <SectionCard title="Storage Settings" subtitle="File size limits and allowed formats" theme={theme}>
          <div className="space-y-2.5">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max File Size (MB)</p>
              <InputField value={maxFileSize} onChange={setMaxFileSize} theme={theme} type="number" />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1.5`}>Allowed Formats</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(allowedFormats).map(([fmt, enabled]) => (
                  <button key={fmt} onClick={() => setAllowedFormats(p => ({ ...p, [fmt]: !p[fmt] }))}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                      enabled ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.iconColor} border ${theme.border}`
                    }`}>
                    {fmt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Versioning */}
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

      <div className="grid grid-cols-2 gap-4">
        {/* Circular Distribution */}
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

        {/* Template Library */}
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
    </div>
  );
}
