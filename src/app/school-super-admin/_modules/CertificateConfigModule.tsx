'use client';

import React, { useState } from 'react';
import { Award, Upload, X, Plus } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader } from '../_helpers/components';
import { MasterPermissionGrid, BulkImportWizard } from '@/components/shared';
import type { Theme } from '../_helpers/types';

export default function CertificateConfigModule({ theme }: { theme: Theme }) {
  const [templates, setTemplates] = useState([
    { name: 'Transfer Certificate (TC)', status: 'uploaded', lastModified: '15 Jan 2025' },
    { name: 'Character Certificate', status: 'uploaded', lastModified: '15 Jan 2025' },
    { name: 'Bonafide Certificate', status: 'uploaded', lastModified: '10 Feb 2025' },
    { name: 'Migration Certificate', status: 'pending', lastModified: '-' },
    { name: 'Sports Certificate', status: 'pending', lastModified: '-' },
    { name: 'Merit Certificate', status: 'uploaded', lastModified: '20 Jan 2025' },
  ]);
  const [features, setFeatures] = useState<Record<string, boolean>>({
    'Auto-numbering (sequential)': true,
    'Digital signature': true,
    'QR code verification': true,
    'Watermark on PDF': true,
    'Approval required before generation': true,
    'Duplicate certificate tracking': true,
  });
  const [approvalWorkflow, setApprovalWorkflow] = useState(['Class Teacher Initiates', 'Admin Verifies Details', 'Principal Approves', 'Certificate Generated']);

  return (
    <div className="space-y-4">
      <ModuleHeader title="Certificate Configuration" subtitle="Templates, auto-numbering, digital signatures, and approval workflow" theme={theme} />

      <SectionCard title="Certificate Templates" subtitle="Edit name, upload template, or delete — add new certificate types" theme={theme}>
        <div className="space-y-2">
          {templates.map((t, i) => (
            <div key={i} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <Award size={14} className={`${t.status === 'uploaded' ? 'text-emerald-500' : 'text-slate-400'} shrink-0`} />
                <input value={t.name} onChange={e => { const n = [...templates]; n[i] = { ...n[i], name: e.target.value }; setTemplates(n); }}
                  className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
              </div>
              <div className="flex items-center gap-2 ml-2">
                <select value={t.status} onChange={e => { const n = [...templates]; n[i] = { ...n[i], status: e.target.value }; setTemplates(n); }}
                  className={`text-[9px] px-1.5 py-0.5 rounded-lg font-bold ${t.status === 'uploaded' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'} border-0 outline-none`}>
                  <option value="uploaded">UPLOADED</option>
                  <option value="pending">PENDING</option>
                </select>
                <button className={`p-1 rounded-lg ${theme.buttonHover}`}><Upload size={12} className={theme.iconColor} /></button>
                <button onClick={() => setTemplates(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={12} /></button>
              </div>
            </div>
          ))}
          <button onClick={() => setTemplates(p => [...p, { name: '', status: 'pending', lastModified: '-' }])}
            className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
            <Plus size={12} /> Add Certificate Type
          </button>
        </div>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Certificate Features" subtitle="Security and workflow features applied to all certificate types" theme={theme}>
          <div className="space-y-2">
            {Object.entries(features).map(([feat, enabled]) => (
              <div key={feat} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{feat}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Auto-numbering (sequential)': 'Each certificate gets a unique sequential number (e.g., TC-2026-001)',
                      'Digital signature': 'Principal\'s digital signature is automatically embedded on generated certificates',
                      'QR code verification': 'A QR code is printed on each certificate for authenticity verification',
                      'Watermark on PDF': 'School watermark is overlaid on PDF certificates to prevent forgery',
                      'Approval required before generation': 'Certificates must be approved by designated authority before printing',
                      'Duplicate certificate tracking': 'System tracks if duplicate certificates are requested and logs the reason',
                    } as Record<string, string>)[feat]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setFeatures(p => ({ ...p, [feat]: !p[feat] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Approval Workflow" subtitle="Edit, reorder, or remove approval steps" theme={theme}>
          <div className="space-y-2">
            {approvalWorkflow.map((step, i) => (
              <div key={i} className={`flex items-center gap-2 p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <span className={`text-[10px] w-6 h-6 rounded-full ${theme.primary} text-white flex items-center justify-center font-bold shrink-0`}>{i + 1}</span>
                <input value={step} onChange={e => { const n = [...approvalWorkflow]; n[i] = e.target.value; setApprovalWorkflow(n); }}
                  className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                <button onClick={() => setApprovalWorkflow(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
              </div>
            ))}
            <button onClick={() => setApprovalWorkflow(p => [...p, ''])}
              className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
              <Plus size={12} /> Add Step
            </button>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Role-Based Permissions" subtitle="Control who can view, create, edit, delete, import, and export" theme={theme}>
        <div className="space-y-4">
          <MasterPermissionGrid masterName="Certificate Templates" roles={['Super Admin', 'Principal', 'School Admin', 'Teacher', 'Accountant']} theme={theme} />
        </div>
      </SectionCard>

      <SectionCard title="Bulk Import" subtitle="Import data from Excel templates" theme={theme}>
        <BulkImportWizard entityName="Certificate Records" templateFields={['Student Name', 'Class', 'Certificate Type', 'Issue Date', 'Serial No']} sampleData={[['Aarav Patel', 'Grade 10', 'Transfer Certificate', '2026-03-15', 'TC-2026-001']]} theme={theme} />
      </SectionCard>
    </div>
  );
}
