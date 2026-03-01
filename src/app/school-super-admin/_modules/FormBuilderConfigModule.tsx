'use client';

import React, { useState } from 'react';
import {
  Type, Hash, Mail, Phone, CalendarDays, ChevronDown, ListChecks, CheckSquare,
  CircleDot, Upload, PenTool, AlignLeft, Star, MapPin
} from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, SelectField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

interface FormTemplate {
  name: string;
  fields: number;
  usage: number;
  status: 'Active' | 'Draft';
}

const FIELD_TYPES = [
  { name: 'Text Input', icon: Type },
  { name: 'Number', icon: Hash },
  { name: 'Email', icon: Mail },
  { name: 'Phone', icon: Phone },
  { name: 'Date Picker', icon: CalendarDays },
  { name: 'Dropdown', icon: ChevronDown },
  { name: 'Multi-select', icon: ListChecks },
  { name: 'Checkbox', icon: CheckSquare },
  { name: 'Radio Button', icon: CircleDot },
  { name: 'File Upload', icon: Upload },
  { name: 'Signature', icon: PenTool },
  { name: 'Rich Text', icon: AlignLeft },
  { name: 'Rating Scale', icon: Star },
  { name: 'Location (GPS)', icon: MapPin },
];

export default function FormBuilderConfigModule({ theme }: { theme: Theme }) {
  // ─── Form Builder Settings ────────────────────────
  const [builderEnabled, setBuilderEnabled] = useState(true);
  const [maxFields, setMaxFields] = useState('50');
  const [conditionalLogic, setConditionalLogic] = useState(true);
  const [fileUpload, setFileUpload] = useState(true);
  const [maxFileSize, setMaxFileSize] = useState('10MB');
  const [responseValidation, setResponseValidation] = useState(true);

  // ─── Field Types ──────────────────────────────────
  const [fieldToggles, setFieldToggles] = useState<Record<string, boolean>>(() => {
    const defaults: Record<string, boolean> = {};
    FIELD_TYPES.forEach(f => { defaults[f.name] = true; });
    return defaults;
  });

  // ─── Templates Library ────────────────────────────
  const [templates] = useState<FormTemplate[]>([
    { name: 'Student Registration Form', fields: 18, usage: 342, status: 'Active' },
    { name: 'Staff Onboarding Form', fields: 14, usage: 87, status: 'Active' },
    { name: 'Parent Feedback Form', fields: 10, usage: 256, status: 'Active' },
    { name: 'Leave Application', fields: 8, usage: 1204, status: 'Active' },
    { name: 'Event Registration', fields: 12, usage: 189, status: 'Active' },
    { name: 'Complaint Form', fields: 9, usage: 45, status: 'Draft' },
    { name: 'Health Declaration', fields: 15, usage: 523, status: 'Active' },
  ]);

  // ─── Response & Analytics ─────────────────────────
  const [responseCollection, setResponseCollection] = useState(true);
  const [exportFormat, setExportFormat] = useState('Excel');
  const [formAnalytics, setFormAnalytics] = useState(true);
  const [workflowIntegration, setWorkflowIntegration] = useState(true);
  const [responseNotifyTo, setResponseNotifyTo] = useState('Form Creator');

  return (
    <div className="space-y-4">
      <ModuleHeader title="Form Builder Configuration" subtitle="Drag-and-drop form designer, field types, templates, and response analytics" theme={theme} />

      {/* Row 1: Form Builder Settings + Field Types */}
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Form Builder Settings" subtitle="Core form builder configuration and limits" theme={theme}>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Enable Form Builder</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Allow creating custom forms</p>
              </div>
              <SSAToggle on={builderEnabled} onChange={() => setBuilderEnabled(!builderEnabled)} theme={theme} />
            </div>
            {builderEnabled && (
              <>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max Fields Per Form</p>
                  <SelectField options={['10', '20', '50', 'Unlimited']} value={maxFields} onChange={setMaxFields} theme={theme} />
                </div>
                <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <div>
                    <p className={`text-xs font-bold ${theme.highlight}`}>Conditional Logic</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>Show/hide fields based on answers</p>
                  </div>
                  <SSAToggle on={conditionalLogic} onChange={() => setConditionalLogic(!conditionalLogic)} theme={theme} />
                </div>
                <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <div>
                    <p className={`text-xs font-bold ${theme.highlight}`}>File Upload in Forms</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>Allow respondents to upload files</p>
                  </div>
                  <SSAToggle on={fileUpload} onChange={() => setFileUpload(!fileUpload)} theme={theme} />
                </div>
                {fileUpload && (
                  <div>
                    <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max File Size</p>
                    <SelectField options={['5MB', '10MB', '25MB']} value={maxFileSize} onChange={setMaxFileSize} theme={theme} />
                  </div>
                )}
                <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <div>
                    <p className={`text-xs font-bold ${theme.highlight}`}>Response Validation</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>Validate inputs before submission</p>
                  </div>
                  <SSAToggle on={responseValidation} onChange={() => setResponseValidation(!responseValidation)} theme={theme} />
                </div>
              </>
            )}
          </div>
        </SectionCard>

        <SectionCard title="Field Types Available" subtitle="Toggle which field types are available in the form builder" theme={theme}>
          <div className="grid grid-cols-2 gap-2">
            {FIELD_TYPES.map(ft => {
              const Icon = ft.icon;
              return (
                <div key={ft.name} className={`flex items-center justify-between p-2 rounded-xl ${theme.secondaryBg}`}>
                  <div className="flex items-center gap-2">
                    <Icon size={14} className={theme.iconColor} />
                    <p className={`text-xs font-medium ${theme.highlight}`}>{ft.name}</p>
                  </div>
                  <SSAToggle on={fieldToggles[ft.name]} onChange={() => setFieldToggles(p => ({ ...p, [ft.name]: !p[ft.name] }))} theme={theme} />
                </div>
              );
            })}
          </div>
        </SectionCard>
      </div>

      {/* Row 2: Templates Library + Response & Analytics */}
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Templates Library" subtitle="Pre-built form templates ready to use" theme={theme}>
          <div className={`rounded-xl border ${theme.border} overflow-hidden`}>
            <table className="w-full text-xs">
              <thead>
                <tr className={theme.secondaryBg}>
                  <th className={`text-left px-3 py-2 font-bold ${theme.iconColor}`}>Template Name</th>
                  <th className={`text-center px-3 py-2 font-bold ${theme.iconColor}`}>Fields</th>
                  <th className={`text-center px-3 py-2 font-bold ${theme.iconColor}`}>Usage</th>
                  <th className={`text-center px-3 py-2 font-bold ${theme.iconColor}`}>Status</th>
                </tr>
              </thead>
              <tbody>
                {templates.map((t, i) => (
                  <tr key={i} className={`border-t ${theme.border}`}>
                    <td className={`px-3 py-2 font-medium ${theme.highlight}`}>{t.name}</td>
                    <td className={`px-3 py-2 text-center ${theme.iconColor}`}>{t.fields}</td>
                    <td className={`px-3 py-2 text-center ${theme.iconColor}`}>{t.usage}</td>
                    <td className="px-3 py-2 text-center">
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${t.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="Response & Analytics" subtitle="Response collection, export, analytics, and workflow integration" theme={theme}>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Response Collection</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Store form submissions in database</p>
              </div>
              <SSAToggle on={responseCollection} onChange={() => setResponseCollection(!responseCollection)} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Export Format</p>
              <SelectField options={['CSV', 'Excel', 'PDF']} value={exportFormat} onChange={setExportFormat} theme={theme} />
            </div>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Form Analytics</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Track views, submissions, drop-off rate</p>
              </div>
              <SSAToggle on={formAnalytics} onChange={() => setFormAnalytics(!formAnalytics)} theme={theme} />
            </div>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Workflow Integration</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Auto-trigger approval on form submission</p>
              </div>
              <SSAToggle on={workflowIntegration} onChange={() => setWorkflowIntegration(!workflowIntegration)} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Response Notifications</p>
              <SelectField options={['Form Creator', 'Admin', 'Custom Email']} value={responseNotifyTo} onChange={setResponseNotifyTo} theme={theme} />
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
