'use client';

import React, { useState } from 'react';
import { X, Plus, CheckCircle, ChevronUp, ChevronDown, Copy, CheckSquare, Square, Globe, Link, QrCode, Bell, ArrowRight, FileText, Upload, Settings } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import { MasterPermissionGrid, BulkImportWizard } from '@/components/shared';
import type { Theme } from '../_helpers/types';

export default function EnquiryAdmissionConfigModule({ theme }: { theme: Theme }) {
  const [admissionMode, setAdmissionMode] = useState('Both Online + Offline');
  const [applicationFee, setApplicationFee] = useState('500');
  const [enqToggles, setEnqToggles] = useState<Record<string, boolean>>({
    'Auto-assign Follow-ups': true, 'Online Application Form': true,
    'Auto-generate Admission Number': true, 'Document Upload Required': true,
  });
  const [photoMandatory, setPhotoMandatory] = useState(true);
  const [leadSources, setLeadSources] = useState(['Website', 'Walk-in', 'Phone', 'Social Media', 'Referral', 'Fair']);
  const [newLeadSource, setNewLeadSource] = useState('');
  const [enquirySources, setEnquirySources] = useState([
    { name: 'Walk-in', active: true, priority: 1 },
    { name: 'Phone Call', active: true, priority: 2 },
    { name: 'Website Form', active: true, priority: 3 },
    { name: 'Social Media (Facebook/Instagram)', active: true, priority: 4 },
    { name: 'Referral (Parent)', active: true, priority: 5 },
    { name: 'Referral (Staff)', active: true, priority: 6 },
    { name: 'Newspaper Ad', active: true, priority: 7 },
    { name: 'School Fair / Event', active: true, priority: 8 },
    { name: 'Google Ads', active: false, priority: 9 },
    { name: 'WhatsApp', active: true, priority: 10 },
  ]);
  const [newEnqSource, setNewEnqSource] = useState('');

  // ─── Waitlist Management ───
  const [enableWaitlist, setEnableWaitlist] = useState(true);
  const [autoOffer, setAutoOffer] = useState(true);
  const [waitlistNotification, setWaitlistNotification] = useState('Both');
  const [maxWaitlist, setMaxWaitlist] = useState('20');

  // ─── Provisional Admission ───
  const [allowProvisional, setAllowProvisional] = useState(true);
  const [provisionalConditions, setProvisionalConditions] = useState<Record<string, boolean>>({
    'Pending documents': true, 'Pending fee payment': true, 'Pending test results': false,
  });
  const [provisionalExpiry, setProvisionalExpiry] = useState('30');

  // ─── RTE 25% Quota ───
  const [enableRTELottery, setEnableRTELottery] = useState(false);

  // ─── APAAR / ABC ID ───
  const [enableAPAAR, setEnableAPAAR] = useState(false);
  const [apaarFormat, setApaarFormat] = useState('XXXX-XXXX-XXXX');

  // ─── Gap #14: Embeddable Enquiry Form ───
  const [enableOnlineForm, setEnableOnlineForm] = useState(true);
  const embedCode = '<iframe src="https://school.saaras.app/apply/demo-school" width="100%" height="700" frameBorder="0"></iframe>';
  const directLink = 'https://school.saaras.app/apply/demo-school';

  // ─── Gap #15-Tab3: Custom Enquiry Fields ───
  const [customFields, setCustomFields] = useState([
    { label: 'Student Name', type: 'Text', required: true, builtin: true },
    { label: 'Phone Number', type: 'Number', required: true, builtin: true },
    { label: 'Email', type: 'Text', required: true, builtin: true },
    { label: 'Class Applied For', type: 'Dropdown', required: true, builtin: true },
    { label: 'Date of Birth', type: 'Date', required: true, builtin: true },
    { label: 'Previous School', type: 'Text', required: false, builtin: false },
    { label: 'Sibling Studying Here', type: 'Dropdown', required: false, builtin: false },
  ]);
  const [showAddField, setShowAddField] = useState(false);
  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [newFieldType, setNewFieldType] = useState('Text');
  const [newFieldRequired, setNewFieldRequired] = useState(false);

  // ─── Gap #6-Tab3: Auto Batch Allotment ───
  const [autoAssignSection, setAutoAssignSection] = useState(false);
  const [sectionMethod, setSectionMethod] = useState('Round Robin');
  const [balanceSections, setBalanceSections] = useState(true);

  // ─── Gap #9/#19-Tab3: Notification Triggers ───
  const [enquiryNotifications, setEnquiryNotifications] = useState<Record<string, boolean>>({
    'Email on new enquiry': true,
    'SMS on status change': true,
    'Notify counselor on assignment': true,
    'Parent notification on admission offer': false,
  });

  // ─── Gap #24-Tab3: Admission Flow Steps ───
  const admissionSteps = [
    { step: 1, name: 'Online Application', desc: 'Parent fills application form online or in person', status: 'active' },
    { step: 2, name: 'Document Upload', desc: 'Upload birth certificate, photos, previous school records', status: 'active' },
    { step: 3, name: 'Entrance Test', desc: 'Optional entrance/aptitude test for the student', status: 'optional' },
    { step: 4, name: 'Fee Payment', desc: 'Pay admission fee and first term fee online or offline', status: 'active' },
    { step: 5, name: 'Confirmation', desc: 'Admission confirmed, student ID and class assigned', status: 'active' },
  ];

  return (
    <div className="space-y-4">
      <ModuleHeader title="Enquiry & Admission Configuration" subtitle="Lead sources, follow-ups, application forms, and admission settings" theme={theme} />
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Admission Settings" subtitle="Mode, fees, and automation" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Admission Mode</p>
              <SelectField options={['Online Only', 'Offline Only', 'Both Online + Offline']} value={admissionMode} onChange={setAdmissionMode} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Application Fee ({'\u20B9'})</p>
              <InputField value={applicationFee} onChange={setApplicationFee} theme={theme} type="number" />
            </div>
            {Object.entries(enqToggles).map(([feat, enabled]) => (
              <div key={feat} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{feat}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Auto-assign Follow-ups': 'System auto-assigns follow-up tasks to counselors based on enquiry source and age',
                      'Online Application Form': 'Parents can fill the admission application form online from school website',
                      'Auto-generate Admission Number': 'System auto-generates unique admission number when a student is admitted',
                      'Document Upload Required': 'Parents must upload required documents (birth certificate, photos, etc.) during admission',
                    } as Record<string, string>)[feat]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setEnqToggles(p => ({ ...p, [feat]: !p[feat] }))} theme={theme} />
              </div>
            ))}
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Photo Mandatory at Admission</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Student photo required to complete admission process</p>
              </div>
              <SSAToggle on={photoMandatory} onChange={() => setPhotoMandatory(!photoMandatory)} theme={theme} />
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Lead Sources" subtitle="Add or remove enquiry sources" theme={theme}>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {leadSources.map(s => (
              <span key={s} className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${theme.secondaryBg} text-xs font-medium ${theme.highlight}`}>
                <CheckCircle size={10} className="text-emerald-500" /> {s}
                <button onClick={() => setLeadSources(p => p.filter(x => x !== s))} className="text-red-400 hover:text-red-600 ml-1"><X size={10} /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={newLeadSource} onChange={e => setNewLeadSource(e.target.value)} placeholder="Add source..."
              className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
            <button onClick={() => { if (newLeadSource.trim()) { setLeadSources(p => [...p, newLeadSource.trim()]); setNewLeadSource(''); } }}
              className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={14} /></button>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Enquiry Sources" subtitle="Detailed source tracking with priority order for lead management" theme={theme}>
        <div className="space-y-1.5">
          {enquirySources.sort((a, b) => a.priority - b.priority).map((s, i) => (
            <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <span className={`text-[10px] w-6 h-6 rounded-full ${theme.primary} text-white flex items-center justify-center font-bold shrink-0`}>{s.priority}</span>
              <input value={s.name} onChange={e => { const n = [...enquirySources]; n[i] = { ...n[i], name: e.target.value }; setEnquirySources(n); }}
                className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-medium ${theme.highlight} outline-none`} />
              <div className="flex items-center gap-1.5">
                <button onClick={() => { if (s.priority > 1) { const n = [...enquirySources]; const idx = n.findIndex(x => x.priority === s.priority - 1); if (idx >= 0) { n[idx] = { ...n[idx], priority: s.priority }; } n[i] = { ...n[i], priority: s.priority - 1 }; setEnquirySources(n); } }}
                  className={`${theme.buttonHover} p-1 rounded`}><ChevronUp size={12} className={theme.iconColor} /></button>
                <button onClick={() => { const n = [...enquirySources]; const idx = n.findIndex(x => x.priority === s.priority + 1); if (idx >= 0) { n[idx] = { ...n[idx], priority: s.priority }; } n[i] = { ...n[i], priority: s.priority + 1 }; setEnquirySources(n); }}
                  className={`${theme.buttonHover} p-1 rounded`}><ChevronDown size={12} className={theme.iconColor} /></button>
              </div>
              <SSAToggle on={s.active} onChange={() => { const n = [...enquirySources]; n[i] = { ...n[i], active: !n[i].active }; setEnquirySources(n); }} theme={theme} />
              <button onClick={() => setEnquirySources(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={12} /></button>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-2">
          <input value={newEnqSource} onChange={e => setNewEnqSource(e.target.value)} placeholder="Add enquiry source..."
            className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
          <button onClick={() => { if (newEnqSource.trim()) { setEnquirySources(p => [...p, { name: newEnqSource.trim(), active: true, priority: p.length + 1 }]); setNewEnqSource(''); } }}
            className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={14} /></button>
        </div>
      </SectionCard>

      {/* ─── A) Waitlist Management ─── */}
      <SectionCard title="Waitlist Management" subtitle="Manage applicants when classes are full" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Enable Waitlist</p>
              <p className={`text-[10px] ${theme.iconColor}`}>When a class reaches capacity, new applicants are waitlisted</p>
            </div>
            <SSAToggle on={enableWaitlist} onChange={() => setEnableWaitlist(!enableWaitlist)} theme={theme} />
          </div>
          {enableWaitlist && (
            <>
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>Auto-offer seats when vacancy opens</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Automatically send offer to next waitlisted applicant</p>
                </div>
                <SSAToggle on={autoOffer} onChange={() => setAutoOffer(!autoOffer)} theme={theme} />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Waitlist Notification</p>
                <SelectField options={['SMS', 'Email', 'Both']} value={waitlistNotification} onChange={setWaitlistNotification} theme={theme} />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max Waitlist per Class</p>
                <InputField value={maxWaitlist} onChange={setMaxWaitlist} theme={theme} type="number" />
              </div>
            </>
          )}
        </div>
      </SectionCard>

      {/* ─── B) Provisional Admission ─── */}
      <SectionCard title="Provisional Admission" subtitle="Allow conditional admission with pending requirements" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Allow Provisional Admission</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Admit students conditionally while requirements are pending</p>
            </div>
            <SSAToggle on={allowProvisional} onChange={() => setAllowProvisional(!allowProvisional)} theme={theme} />
          </div>
          {allowProvisional && (
            <>
              <div className={`p-3 rounded-xl ${theme.accentBg} border ${theme.border}`}>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-2 uppercase tracking-wide`}>Conditions</p>
                <div className="space-y-2">
                  {Object.entries(provisionalConditions).map(([cond, checked]) => (
                    <button key={cond} onClick={() => setProvisionalConditions(p => ({ ...p, [cond]: !p[cond] }))}
                      className={`flex items-center gap-2 w-full text-left p-2 rounded-lg ${theme.secondaryBg}`}>
                      {checked ? <CheckSquare size={14} className="text-emerald-500" /> : <Square size={14} className={theme.iconColor} />}
                      <span className={`text-xs ${theme.highlight}`}>{cond}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Auto-expire provisional after (days)</p>
                <InputField value={provisionalExpiry} onChange={setProvisionalExpiry} theme={theme} type="number" />
              </div>
            </>
          )}
        </div>
      </SectionCard>

      {/* ─── C) RTE 25% Quota Settings ─── */}
      <SectionCard title="RTE 25% Quota Settings" subtitle="Right to Education lottery and audit configuration" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Enable Random Lottery for Oversubscribed Classes</p>
              <p className={`text-[10px] ${theme.iconColor}`}>When RTE applicants exceed seats, conduct a transparent random lottery</p>
            </div>
            <SSAToggle on={enableRTELottery} onChange={() => setEnableRTELottery(!enableRTELottery)} theme={theme} />
          </div>
          <div className={`p-2.5 rounded-xl ${theme.accentBg} border ${theme.border}`}>
            <p className={`text-[10px] ${theme.iconColor}`}>Lottery audit trail: All selections logged with timestamp and randomization seed</p>
          </div>
          <div className="relative">
            <button disabled className={`px-4 py-2 rounded-xl bg-gray-200 text-gray-400 text-xs font-bold cursor-not-allowed`}
              title="Available during admission window">
              Run Lottery
            </button>
            <span className={`ml-2 text-[10px] ${theme.iconColor}`}>Available during admission window</span>
          </div>
        </div>
      </SectionCard>

      {/* ─── Gap #14: Website Integration (Enhanced) ─── */}
      <SectionCard title="Website Integration" subtitle="Embed enquiry form on your school website, share direct link, or generate QR code" theme={theme}>
        <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg} mb-3`}>
          <div>
            <p className={`text-xs font-bold ${theme.highlight}`}>Enable Online Application Form</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Parents can apply online from your website or via direct link</p>
          </div>
          <SSAToggle on={enableOnlineForm} onChange={() => setEnableOnlineForm(!enableOnlineForm)} theme={theme} />
        </div>
        {enableOnlineForm && (
          <>
            <div className={`p-3 rounded-xl ${theme.secondaryBg} mb-3`}>
              <div className="flex items-center gap-1.5 mb-2">
                <Globe size={12} className={theme.iconColor} />
                <p className={`text-[10px] font-bold ${theme.iconColor} uppercase tracking-wide`}>Embed Code for School Website</p>
              </div>
              <div className={`p-2.5 rounded-lg bg-gray-900 text-green-400 text-[10px] font-mono mb-2 overflow-x-auto`}>
                {embedCode}
              </div>
              <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}>
                <Copy size={12} /> Copy Embed Code
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex items-center gap-1.5 mb-2">
                  <Link size={12} className={theme.iconColor} />
                  <p className={`text-[10px] font-bold ${theme.iconColor} uppercase tracking-wide`}>Direct Link</p>
                </div>
                <div className={`px-2.5 py-2 rounded-lg ${theme.cardBg} border ${theme.border} text-[10px] ${theme.highlight} font-mono mb-2 break-all`}>
                  {directLink}
                </div>
                <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}>
                  <Copy size={12} /> Copy Link
                </button>
              </div>
              <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex items-center gap-1.5 mb-2">
                  <QrCode size={12} className={theme.iconColor} />
                  <p className={`text-[10px] font-bold ${theme.iconColor} uppercase tracking-wide`}>QR Code</p>
                </div>
                <div className={`h-24 w-24 rounded-lg ${theme.cardBg} border-2 border-dashed ${theme.border} flex items-center justify-center mx-auto mb-2`}>
                  <div className="text-center">
                    <QrCode size={32} className={theme.iconColor} />
                    <p className={`text-[8px] ${theme.iconColor} mt-1`}>QR Preview</p>
                  </div>
                </div>
                <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${theme.border} ${theme.buttonHover} text-xs font-bold ${theme.highlight} w-full justify-center`}>
                  Download QR
                </button>
              </div>
            </div>
            <div className={`p-3 rounded-xl ${theme.accentBg} border ${theme.border}`}>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Preview</p>
              <div className={`h-20 rounded-lg ${theme.secondaryBg} flex items-center justify-center`}>
                <span className={`text-[10px] ${theme.iconColor}`}>Application form preview thumbnail</span>
              </div>
            </div>
          </>
        )}
      </SectionCard>

      {/* ─── Gap #15-Tab3: Custom Enquiry Fields ─── */}
      <SectionCard title="Custom Form Fields" subtitle="Configure which fields appear on the enquiry/application form and add custom fields" theme={theme}>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Field Label', 'Type', 'Required', ''].map(h => (
                <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {customFields.map((f, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className={`px-3 py-2 font-bold ${theme.highlight}`}>
                    {f.label}
                    {f.builtin && <span className={`ml-1.5 text-[8px] px-1 py-0.5 rounded ${theme.accentBg} ${theme.iconColor} font-bold`}>BUILT-IN</span>}
                  </td>
                  <td className={`px-3 py-2 ${theme.iconColor}`}>{f.type}</td>
                  <td className="px-3 py-2">
                    <SSAToggle on={f.required} onChange={() => {
                      const n = [...customFields]; n[i] = { ...n[i], required: !n[i].required }; setCustomFields(n);
                    }} theme={theme} />
                  </td>
                  <td className="px-3 py-2">
                    {!f.builtin && (
                      <button onClick={() => setCustomFields(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={12} /></button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showAddField ? (
          <div className={`p-3 rounded-xl ${theme.accentBg} border ${theme.border}`}>
            <div className="flex items-center justify-between mb-2">
              <p className={`text-xs font-bold ${theme.highlight}`}>Add Custom Field</p>
              <button onClick={() => setShowAddField(false)} className="text-gray-400 hover:text-gray-600"><X size={14} /></button>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Field Label</p>
                <InputField value={newFieldLabel} onChange={setNewFieldLabel} theme={theme} placeholder="e.g. Father&apos;s Occupation" />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Type</p>
                <SelectField options={['Text', 'Number', 'Date', 'Dropdown', 'File Upload']} value={newFieldType} onChange={setNewFieldType} theme={theme} />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Required</p>
                <SSAToggle on={newFieldRequired} onChange={() => setNewFieldRequired(!newFieldRequired)} theme={theme} />
              </div>
            </div>
            <button onClick={() => {
              if (newFieldLabel.trim()) {
                setCustomFields(p => [...p, { label: newFieldLabel.trim(), type: newFieldType, required: newFieldRequired, builtin: false }]);
                setNewFieldLabel(''); setNewFieldType('Text'); setNewFieldRequired(false); setShowAddField(false);
              }
            }} className={`flex items-center gap-1.5 px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>
              <Plus size={12} /> Add Field
            </button>
          </div>
        ) : (
          <button onClick={() => setShowAddField(true)}
            className={`flex items-center gap-1.5 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl border ${theme.border}`}>
            <Plus size={12} /> Add Custom Field
          </button>
        )}
      </SectionCard>

      {/* ─── Gap #6-Tab3: Auto Batch Allotment ─── */}
      <SectionCard title="Auto-assign Section on Admission" subtitle="Automatically assign sections to students when admitted" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Enable Auto-assign Section</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Automatically place admitted students into a section</p>
            </div>
            <SSAToggle on={autoAssignSection} onChange={() => setAutoAssignSection(!autoAssignSection)} theme={theme} />
          </div>
          {autoAssignSection && (
            <>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Assignment Method</p>
                <SelectField options={['Round Robin', 'Alphabetical', 'Manual']} value={sectionMethod} onChange={setSectionMethod} theme={theme} />
              </div>
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>Balance sections equally</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Keep student count balanced across all sections in a grade</p>
                </div>
                <SSAToggle on={balanceSections} onChange={() => setBalanceSections(!balanceSections)} theme={theme} />
              </div>
              <div className={`p-2.5 rounded-xl ${theme.accentBg} border ${theme.border}`}>
                <p className={`text-[10px] ${theme.iconColor}`}>
                  <strong>Current method:</strong> {sectionMethod} {balanceSections ? '(with balancing)' : ''}
                </p>
              </div>
            </>
          )}
        </div>
      </SectionCard>

      {/* ─── Gap #9/#19-Tab3: Enquiry Notifications ─── */}
      <SectionCard title="Enquiry Notifications" subtitle="Configure notification triggers for enquiry and admission events" theme={theme}>
        <div className="space-y-2">
          {Object.entries(enquiryNotifications).map(([notif, enabled]) => (
            <div key={notif} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex items-center gap-2">
                <Bell size={12} className={enabled ? 'text-emerald-500' : theme.iconColor} />
                <span className={`text-xs font-bold ${theme.highlight}`}>{notif}</span>
              </div>
              <SSAToggle on={enabled} onChange={() => setEnquiryNotifications(p => ({ ...p, [notif]: !p[notif] }))} theme={theme} />
            </div>
          ))}
        </div>
        <div className={`mt-3 p-2.5 rounded-xl ${theme.accentBg} border ${theme.border}`}>
          <p className={`text-[10px] ${theme.iconColor}`}>
            <strong>Active notifications:</strong> {Object.entries(enquiryNotifications).filter(([, v]) => v).map(([k]) => k).join(', ') || 'None'}
          </p>
        </div>
      </SectionCard>

      {/* ─── Gap #24-Tab3: Online Admission Flow Preview ─── */}
      <SectionCard title="Admission Flow Steps" subtitle="Visual overview of the online admission process from application to confirmation" theme={theme}>
        <div className="flex items-start gap-0 overflow-x-auto pb-2">
          {admissionSteps.map((step, i) => (
            <React.Fragment key={step.step}>
              <div className={`flex-shrink-0 w-40 p-3 rounded-xl ${theme.secondaryBg} border ${
                step.status === 'optional' ? 'border-dashed border-amber-300' : theme.border
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${
                    step.status === 'optional' ? 'bg-amber-400' : theme.primary
                  }`}>{step.step}</span>
                  {step.status === 'optional' && (
                    <span className="text-[8px] px-1 py-0.5 rounded bg-amber-100 text-amber-700 font-bold">OPTIONAL</span>
                  )}
                </div>
                <p className={`text-xs font-bold ${theme.highlight} mb-1`}>{step.name}</p>
                <p className={`text-[9px] ${theme.iconColor} leading-relaxed`}>{step.desc}</p>
                <div className="mt-2">
                  <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-bold ${
                    step.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {step.status === 'active' ? 'ENABLED' : 'OPTIONAL'}
                  </span>
                </div>
              </div>
              {i < admissionSteps.length - 1 && (
                <div className="flex items-center px-1 pt-6 shrink-0">
                  <ArrowRight size={16} className={theme.iconColor} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className={`mt-3 p-2.5 rounded-xl ${theme.accentBg} border ${theme.border}`}>
          <p className={`text-[10px] ${theme.iconColor}`}>
            <strong>Flow summary:</strong> {admissionSteps.filter(s => s.status === 'active').length} required steps + {admissionSteps.filter(s => s.status === 'optional').length} optional step(s). Parents progress through each step sequentially.
          </p>
        </div>
      </SectionCard>

      {/* ─── E) APAAR / ABC ID ─── */}
      <SectionCard title="APAAR / ABC ID (NEP 2020)" subtitle="Academic Bank of Credits integration" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Enable APAAR / ABC ID (NEP 2020)</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Track APAAR Academic Bank of Credits ID for students</p>
            </div>
            <SSAToggle on={enableAPAAR} onChange={() => setEnableAPAAR(!enableAPAAR)} theme={theme} />
          </div>
          {enableAPAAR && (
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>APAAR ID Format</p>
              <InputField value={apaarFormat} onChange={setApaarFormat} theme={theme} />
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Role-Based Permissions" subtitle="Control who can view, create, edit, delete, import, and export" theme={theme}>
        <div className="space-y-4">
          <MasterPermissionGrid masterName="Enquiry Sources" roles={['Super Admin', 'Principal', 'School Admin', 'Teacher', 'Accountant']} theme={theme} />
          <MasterPermissionGrid masterName="Admission Stages" roles={['Super Admin', 'Principal', 'School Admin', 'Teacher', 'Accountant']} theme={theme} />
        </div>
      </SectionCard>

      <SectionCard title="Bulk Import" subtitle="Import data from Excel templates" theme={theme}>
        <BulkImportWizard entityName="Enquiries" templateFields={['Student Name', 'Parent Name', 'Phone', 'Class Applied', 'Source', 'Date']} sampleData={[['Priya Sharma', 'Rajesh Sharma', '9876543210', 'Grade 1', 'Website', '2026-03-01']]} theme={theme} />
      </SectionCard>
    </div>
  );
}
