'use client';

import React, { useState } from 'react';
import { X, Plus, CheckCircle, ChevronUp, ChevronDown, Copy, CheckSquare, Square } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
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

      {/* ─── D) Website Integration ─── */}
      <SectionCard title="Website Integration" subtitle="Embed the admission form on your school website" theme={theme}>
        <div className={`p-3 rounded-xl ${theme.secondaryBg} mb-3`}>
          <p className={`text-[10px] font-bold ${theme.iconColor} mb-2 uppercase tracking-wide`}>Embed Code for School Website</p>
          <div className={`p-2.5 rounded-lg bg-gray-900 text-green-400 text-[10px] font-mono mb-2 overflow-x-auto`}>
            {`<iframe src="https://your-school.saaras.app/apply" width="100%" height="700" frameBorder="0"></iframe>`}
          </div>
          <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}>
            <Copy size={12} /> Copy Code
          </button>
        </div>
        <div className={`p-3 rounded-xl ${theme.accentBg} border ${theme.border}`}>
          <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Preview</p>
          <div className={`h-20 rounded-lg ${theme.secondaryBg} flex items-center justify-center`}>
            <span className={`text-[10px] ${theme.iconColor}`}>Application form preview thumbnail</span>
          </div>
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
    </div>
  );
}
