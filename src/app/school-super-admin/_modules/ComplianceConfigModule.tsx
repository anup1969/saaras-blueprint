'use client';

import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, SelectField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

export default function ComplianceConfigModule({ theme }: { theme: Theme }) {
  const [framework, setFramework] = useState('SQAAF');
  const [auditSchedule, setAuditSchedule] = useState('Quarterly');
  const [compToggles, setCompToggles] = useState<Record<string, boolean>>({
    'Auto-collect Data from Modules': true, 'Document Checklist': true,
  });
  const [domains, setDomains] = useState([
    { name: 'Curricular Aspects', score: '3.5/4' },
    { name: 'Teaching-Learning', score: '3.2/4' },
    { name: 'Infrastructure', score: '3.0/4' },
    { name: 'Student Support', score: '2.8/4' },
    { name: 'Governance & Leadership', score: '3.4/4' },
  ]);
  const [studentDocs, setStudentDocs] = useState([
    { name: 'Birth Certificate', required: true, mandatory: true },
    { name: 'Aadhaar Card', required: true, mandatory: true },
    { name: 'Previous School TC', required: true, mandatory: true },
    { name: 'Passport Photo', required: true, mandatory: true },
    { name: 'Caste Certificate', required: false, mandatory: false },
    { name: 'Income Certificate', required: false, mandatory: false },
    { name: 'Medical Certificate', required: true, mandatory: false },
    { name: 'Address Proof', required: true, mandatory: true },
  ]);
  const [staffDocs, setStaffDocs] = useState([
    { name: 'Aadhaar Card', required: true, mandatory: true },
    { name: 'PAN Card', required: true, mandatory: true },
    { name: 'Resume / CV', required: true, mandatory: true },
    { name: 'Degree Certificates', required: true, mandatory: true },
    { name: 'Experience Letters', required: true, mandatory: false },
    { name: 'Police Verification', required: true, mandatory: true },
    { name: 'Medical Fitness', required: true, mandatory: false },
    { name: 'NDA / Agreement', required: false, mandatory: false },
  ]);
  const [newStudentDoc, setNewStudentDoc] = useState('');
  const [newStaffDoc, setNewStaffDoc] = useState('');

  return (
    <div className="space-y-4">
      <ModuleHeader title="Compliance & Quality Configuration" subtitle="Assessment frameworks, audit schedules, and compliance domains" theme={theme} />
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Framework & Schedule" subtitle="Assessment standard and audit frequency" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Assessment Framework</p>
              <SelectField options={['SQAAF', 'NAAC', 'Custom']} value={framework} onChange={setFramework} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Audit Schedule</p>
              <SelectField options={['Quarterly', 'Bi-annual', 'Annual']} value={auditSchedule} onChange={setAuditSchedule} theme={theme} />
            </div>
            {Object.entries(compToggles).map(([feat, enabled]) => (
              <div key={feat} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{feat}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Auto-collect Data from Modules': 'Automatically pull compliance data from attendance, fees, academics etc. — no manual entry',
                      'Document Checklist': 'Maintain a checklist of required documents for each compliance domain (NOCs, licenses, etc.)',
                    } as Record<string, string>)[feat]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setCompToggles(p => ({ ...p, [feat]: !p[feat] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Compliance Domains" subtitle="Edit domain names and scores — add or remove" theme={theme}>
          <div className="space-y-2">
            {domains.map((d, i) => (
              <div key={i} className={`flex items-center gap-2 p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <input value={d.name} onChange={e => { const n = [...domains]; n[i] = { ...n[i], name: e.target.value }; setDomains(n); }}
                  className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-medium ${theme.highlight} outline-none`} />
                <input value={d.score} onChange={e => { const n = [...domains]; n[i] = { ...n[i], score: e.target.value }; setDomains(n); }}
                  className={`w-20 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center font-bold ${theme.iconColor} outline-none`} />
                <button onClick={() => setDomains(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
              </div>
            ))}
            <button onClick={() => setDomains(p => [...p, { name: '', score: '' }])}
              className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
              <Plus size={12} /> Add Domain
            </button>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Required Documents" subtitle="Document requirements for student admission and staff joining" theme={theme}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-2 uppercase tracking-wide`}>Student Documents</p>
            <div className="space-y-1.5">
              {studentDocs.map((d, i) => (
                <div key={i} className={`flex items-center gap-2 p-2 rounded-xl ${theme.secondaryBg}`}>
                  <span className={`text-xs font-medium ${theme.highlight} flex-1`}>{d.name}</span>
                  <div className="flex items-center gap-1">
                    <span className={`text-[9px] ${theme.iconColor}`}>Req</span>
                    <SSAToggle on={d.required} onChange={() => { const n = [...studentDocs]; n[i] = { ...n[i], required: !n[i].required }; setStudentDocs(n); }} theme={theme} />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`text-[9px] ${theme.iconColor}`}>Mand</span>
                    <SSAToggle on={d.mandatory} onChange={() => { const n = [...studentDocs]; n[i] = { ...n[i], mandatory: !n[i].mandatory }; setStudentDocs(n); }} theme={theme} />
                  </div>
                  <button onClick={() => setStudentDocs(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <input value={newStudentDoc} onChange={e => setNewStudentDoc(e.target.value)} placeholder="Add document..."
                className={`flex-1 px-3 py-1.5 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
              <button onClick={() => { if (newStudentDoc.trim()) { setStudentDocs(p => [...p, { name: newStudentDoc.trim(), required: true, mandatory: false }]); setNewStudentDoc(''); } }}
                className={`px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={12} /></button>
            </div>
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-2 uppercase tracking-wide`}>Staff Documents</p>
            <div className="space-y-1.5">
              {staffDocs.map((d, i) => (
                <div key={i} className={`flex items-center gap-2 p-2 rounded-xl ${theme.secondaryBg}`}>
                  <span className={`text-xs font-medium ${theme.highlight} flex-1`}>{d.name}</span>
                  <div className="flex items-center gap-1">
                    <span className={`text-[9px] ${theme.iconColor}`}>Req</span>
                    <SSAToggle on={d.required} onChange={() => { const n = [...staffDocs]; n[i] = { ...n[i], required: !n[i].required }; setStaffDocs(n); }} theme={theme} />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`text-[9px] ${theme.iconColor}`}>Mand</span>
                    <SSAToggle on={d.mandatory} onChange={() => { const n = [...staffDocs]; n[i] = { ...n[i], mandatory: !n[i].mandatory }; setStaffDocs(n); }} theme={theme} />
                  </div>
                  <button onClick={() => setStaffDocs(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <input value={newStaffDoc} onChange={e => setNewStaffDoc(e.target.value)} placeholder="Add document..."
                className={`flex-1 px-3 py-1.5 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
              <button onClick={() => { if (newStaffDoc.trim()) { setStaffDocs(p => [...p, { name: newStaffDoc.trim(), required: true, mandatory: false }]); setNewStaffDoc(''); } }}
                className={`px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={12} /></button>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
