'use client';

import React, { useState } from 'react';
import { X, Plus, Shield, Building, CheckCircle, AlertTriangle, ClipboardCheck, Search, Bell } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, SelectField, InputField } from '../_helpers/components';
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

  // ─── Board-Specific Compliance state ───────────────
  const [selectedBoard, setSelectedBoard] = useState('CBSE');
  const [boardCompliance, setBoardCompliance] = useState<Record<string, boolean>>({
    'Affiliation renewal': true,
    'Teacher qualification (B.Ed mandatory)': true,
    'Student-teacher ratio (1:30)': false,
    'Lab infrastructure': true,
    'Library standards': true,
    'Sports facilities': false,
    'CBSE exam center norms': true,
  });
  const [boardComplianceStatus, setBoardComplianceStatus] = useState<Record<string, string>>({
    'Affiliation renewal': 'Compliant',
    'Teacher qualification (B.Ed mandatory)': 'Compliant',
    'Student-teacher ratio (1:30)': 'Non-compliant',
    'Lab infrastructure': 'Compliant',
    'Library standards': 'Pending',
    'Sports facilities': 'Non-compliant',
    'CBSE exam center norms': 'Compliant',
  });
  const [rteCompliance, setRteCompliance] = useState(true);
  const [rteItems, setRteItems] = useState<Record<string, boolean>>({
    '25% reservation': true,
    'No detention policy': true,
    'No corporal punishment': true,
    'Infrastructure norms': false,
  });
  const [pocsoItems, setPocsoItems] = useState<Record<string, boolean>>({
    'Awareness training': true,
    'Complaint committee formed': true,
    'Background verification for staff': false,
  });
  const [fireNocStatus, setFireNocStatus] = useState('Valid');
  const [fireDrillFreq, setFireDrillFreq] = useState('Quarterly');
  const [lastDrillDate, setLastDrillDate] = useState('2026-01-15');
  const [healthItems, setHealthItems] = useState<Record<string, boolean>>({
    'Drinking water quality': true,
    'Washroom ratio compliance': true,
    'First-aid kit availability': true,
    'Medical room': false,
  });

  // ─── Infrastructure & Ratio Monitoring state ───────
  const [ratios, setRatios] = useState([
    { label: 'Student-Teacher Ratio', current: '32', target: '30' },
    { label: 'Classroom-Student Ratio', current: '40', target: '40' },
    { label: 'Washroom-Student Ratio', current: '1:50', target: '1:40' },
    { label: 'Computer-Student Ratio', current: '1:15', target: '1:10' },
  ]);
  const [labAvailability, setLabAvailability] = useState<Record<string, boolean>>({
    Physics: true, Chemistry: true, Biology: true, Computer: true, Language: false,
  });
  const [playgroundCurrent, setPlaygroundCurrent] = useState('8000');
  const [playgroundRequired, setPlaygroundRequired] = useState('10000');

  // ─── Inspection & Readiness state ──────────────────
  const [lastInspectionDate, setLastInspectionDate] = useState('2025-11-20');
  const [nextInspectionDate, setNextInspectionDate] = useState('2026-05-15');
  const [readinessScore, setReadinessScore] = useState('78');
  const [inspectionChecklist, setInspectionChecklist] = useState<Record<string, boolean>>({
    'Documents ready': true,
    'Infrastructure updated': false,
    'Staff records current': true,
    'Safety measures verified': true,
    'Academic records filed': true,
    'Financial audit done': false,
  });
  const [autoDetectGaps, setAutoDetectGaps] = useState(true);
  const [complianceGaps] = useState([
    { area: 'Science Lab', requirement: 'CBSE requires separate Physics lab', status: 'Gap', priority: 'High', action: 'Allocate room B-12' },
    { area: 'Library', requirement: 'Minimum 5000 books required', status: 'Gap', priority: 'Medium', action: 'Procure 800 more titles' },
    { area: 'Sports', requirement: 'Playground area below 10,000 sqft', status: 'Gap', priority: 'High', action: 'Expand ground area' },
    { area: 'Fire Safety', requirement: 'Monthly drill not conducted', status: 'Partial', priority: 'Medium', action: 'Schedule monthly drills' },
    { area: 'Staff', requirement: '3 teachers lack B.Ed qualification', status: 'Gap', priority: 'High', action: 'Enroll in B.Ed program' },
  ]);
  const [regulatoryAlerts, setRegulatoryAlerts] = useState(true);

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

      {/* ─── NEW SECTION: Board-Specific Compliance ──────── */}
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Board Compliance Rules" subtitle="Board-specific regulatory requirements and status" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Select Board</p>
              <SelectField options={['CBSE', 'ICSE', 'State Board', 'IB', 'Cambridge']} value={selectedBoard} onChange={setSelectedBoard} theme={theme} />
            </div>
            <p className={`text-[10px] font-bold ${theme.iconColor} uppercase tracking-wide`}>{selectedBoard} Compliance Requirements</p>
            <div className="space-y-1.5">
              {Object.entries(boardCompliance).map(([item, enabled]) => {
                const status = boardComplianceStatus[item] || 'Pending';
                const statusColor = status === 'Compliant' ? 'bg-green-100 text-green-700' : status === 'Non-compliant' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700';
                return (
                  <div key={item} className={`flex items-center justify-between p-2 rounded-xl ${theme.secondaryBg}`}>
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <SSAToggle on={enabled} onChange={() => setBoardCompliance(p => ({ ...p, [item]: !p[item] }))} theme={theme} />
                      <span className={`text-xs font-medium ${theme.highlight} truncate`}>{item}</span>
                    </div>
                    <select value={status} onChange={e => setBoardComplianceStatus(p => ({ ...p, [item]: e.target.value }))}
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${statusColor} border-none outline-none cursor-pointer`}>
                      <option value="Compliant">Compliant</option>
                      <option value="Non-compliant">Non-compliant</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                );
              })}
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Regulatory Compliance" subtitle="RTE, POCSO, fire safety, and health compliance" theme={theme}>
          <div className="space-y-3">
            {/* RTE Compliance */}
            <div className={`p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Shield size={12} className={theme.iconColor} />
                  <p className={`text-xs font-bold ${theme.highlight}`}>RTE Compliance</p>
                </div>
                <SSAToggle on={rteCompliance} onChange={() => setRteCompliance(!rteCompliance)} theme={theme} />
              </div>
              {rteCompliance && (
                <div className="space-y-1 ml-4">
                  {Object.entries(rteItems).map(([item, on]) => (
                    <div key={item} className="flex items-center justify-between">
                      <span className={`text-[10px] ${theme.iconColor}`}>{item}</span>
                      <SSAToggle on={on} onChange={() => setRteItems(p => ({ ...p, [item]: !p[item] }))} theme={theme} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* POCSO Compliance */}
            <div className={`p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex items-center gap-1.5 mb-2">
                <Shield size={12} className={theme.iconColor} />
                <p className={`text-xs font-bold ${theme.highlight}`}>POCSO Compliance</p>
              </div>
              <div className="space-y-1 ml-4">
                {Object.entries(pocsoItems).map(([item, on]) => (
                  <div key={item} className="flex items-center justify-between">
                    <span className={`text-[10px] ${theme.iconColor}`}>{item}</span>
                    <SSAToggle on={on} onChange={() => setPocsoItems(p => ({ ...p, [item]: !p[item] }))} theme={theme} />
                  </div>
                ))}
              </div>
            </div>

            {/* Fire Safety */}
            <div className={`p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex items-center gap-1.5 mb-2">
                <AlertTriangle size={12} className={theme.iconColor} />
                <p className={`text-xs font-bold ${theme.highlight}`}>Fire Safety</p>
              </div>
              <div className="space-y-2 ml-4">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] ${theme.iconColor}`}>NOC Status</span>
                  <select value={fireNocStatus} onChange={e => setFireNocStatus(e.target.value)}
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full border-none outline-none cursor-pointer ${fireNocStatus === 'Valid' ? 'bg-green-100 text-green-700' : fireNocStatus === 'Expired' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    <option value="Valid">Valid</option>
                    <option value="Expired">Expired</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] ${theme.iconColor}`}>Drill Frequency</span>
                  <select value={fireDrillFreq} onChange={e => setFireDrillFreq(e.target.value)}
                    className={`text-[10px] px-2 py-0.5 rounded-lg border ${theme.border} ${theme.inputBg} ${theme.highlight} outline-none`}>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] ${theme.iconColor}`}>Last Drill Date</span>
                  <input type="date" value={lastDrillDate} onChange={e => setLastDrillDate(e.target.value)}
                    className={`text-[10px] px-2 py-0.5 rounded-lg border ${theme.border} ${theme.inputBg} ${theme.highlight} outline-none`} />
                </div>
              </div>
            </div>

            {/* Health & Hygiene */}
            <div className={`p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex items-center gap-1.5 mb-2">
                <CheckCircle size={12} className={theme.iconColor} />
                <p className={`text-xs font-bold ${theme.highlight}`}>Health & Hygiene</p>
              </div>
              <div className="space-y-1 ml-4">
                {Object.entries(healthItems).map(([item, on]) => (
                  <div key={item} className="flex items-center justify-between">
                    <span className={`text-[10px] ${theme.iconColor}`}>{item}</span>
                    <SSAToggle on={on} onChange={() => setHealthItems(p => ({ ...p, [item]: !p[item] }))} theme={theme} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* ─── NEW SECTION: Infrastructure & Ratio Monitoring ── */}
      <SectionCard title="Infrastructure & Ratio Monitoring" subtitle="Track student-teacher, classroom, washroom, and computer ratios against targets" theme={theme}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {ratios.map((r, i) => {
              const isNumericCompare = !r.current.includes(':') && !r.target.includes(':');
              const isOverTarget = isNumericCompare && Number(r.current) > Number(r.target);
              return (
                <div key={i} className={`p-3 rounded-xl ${theme.secondaryBg}`}>
                  <div className="flex items-center justify-between mb-2">
                    <p className={`text-xs font-bold ${theme.highlight}`}>{r.label}</p>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${isOverTarget ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {isOverTarget ? 'Warning' : 'OK'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <p className={`text-[9px] ${theme.iconColor} mb-0.5`}>Current</p>
                      <input value={r.current} onChange={e => { const n = [...ratios]; n[i] = { ...n[i], current: e.target.value }; setRatios(n); }}
                        className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold text-center ${theme.highlight} outline-none`} />
                    </div>
                    <div className="flex-1">
                      <p className={`text-[9px] ${theme.iconColor} mb-0.5`}>Target</p>
                      <input value={r.target} onChange={e => { const n = [...ratios]; n[i] = { ...n[i], target: e.target.value }; setRatios(n); }}
                        className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold text-center ${theme.highlight} outline-none`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-2 uppercase tracking-wide`}>Lab Availability Checklist</p>
              <div className="space-y-1.5">
                {Object.entries(labAvailability).map(([lab, available]) => (
                  <div key={lab} className={`flex items-center justify-between p-2 rounded-xl ${theme.secondaryBg}`}>
                    <span className={`text-xs font-medium ${theme.highlight}`}>{lab}</span>
                    <SSAToggle on={available} onChange={() => setLabAvailability(p => ({ ...p, [lab]: !p[lab] }))} theme={theme} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-2 uppercase tracking-wide`}>Playground Area</p>
              <div className={`p-3 rounded-xl ${theme.secondaryBg} space-y-2`}>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <p className={`text-[9px] ${theme.iconColor} mb-0.5`}>Current (sqft)</p>
                    <InputField value={playgroundCurrent} onChange={setPlaygroundCurrent} theme={theme} type="number" />
                  </div>
                  <div className="flex-1">
                    <p className={`text-[9px] ${theme.iconColor} mb-0.5`}>Required (sqft)</p>
                    <InputField value={playgroundRequired} onChange={setPlaygroundRequired} theme={theme} type="number" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] ${theme.iconColor}`}>Status</span>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${Number(playgroundCurrent) >= Number(playgroundRequired) ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {Number(playgroundCurrent) >= Number(playgroundRequired) ? 'Compliant' : 'Below Required'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ─── NEW SECTION: Inspection & Readiness ───────── */}
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Inspection Readiness Dashboard" subtitle="Track inspection schedule and preparedness" theme={theme}>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className={`text-[9px] ${theme.iconColor} mb-0.5`}>Last Inspection</p>
                <input type="date" value={lastInspectionDate} onChange={e => setLastInspectionDate(e.target.value)}
                  className={`w-full px-2 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
              </div>
              <div>
                <p className={`text-[9px] ${theme.iconColor} mb-0.5`}>Next Expected</p>
                <input type="date" value={nextInspectionDate} onChange={e => setNextInspectionDate(e.target.value)}
                  className={`w-full px-2 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
              </div>
            </div>

            <div className={`p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex items-center justify-between mb-1.5">
                <p className={`text-xs font-bold ${theme.highlight}`}>Readiness Score</p>
                <span className={`text-xs font-bold ${Number(readinessScore) >= 80 ? 'text-green-600' : Number(readinessScore) >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>{readinessScore}%</span>
              </div>
              <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${Number(readinessScore) >= 80 ? 'bg-green-500' : Number(readinessScore) >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${Math.min(100, Math.max(0, Number(readinessScore)))}%` }} />
              </div>
              <input type="range" min="0" max="100" value={readinessScore} onChange={e => setReadinessScore(e.target.value)}
                className="w-full mt-1 h-1 accent-blue-500 cursor-pointer" />
            </div>

            <p className={`text-[10px] font-bold ${theme.iconColor} uppercase tracking-wide`}>Inspection Checklist</p>
            <div className="space-y-1.5">
              {Object.entries(inspectionChecklist).map(([item, done]) => (
                <div key={item} className={`flex items-center justify-between p-2 rounded-xl ${theme.secondaryBg}`}>
                  <div className="flex items-center gap-1.5">
                    <ClipboardCheck size={11} className={done ? 'text-green-500' : 'text-gray-400'} />
                    <span className={`text-xs font-medium ${theme.highlight}`}>{item}</span>
                  </div>
                  <SSAToggle on={done} onChange={() => setInspectionChecklist(p => ({ ...p, [item]: !p[item] }))} theme={theme} />
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Compliance Gap Analysis" subtitle="Auto-detect and track compliance gaps with priorities" theme={theme}>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex items-center gap-1.5 flex-1 mr-3">
                <Search size={12} className={theme.iconColor} />
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>Auto-detect Gaps</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Automatically compare current status against board requirements</p>
                </div>
              </div>
              <SSAToggle on={autoDetectGaps} onChange={() => setAutoDetectGaps(!autoDetectGaps)} theme={theme} />
            </div>

            {/* Gap table */}
            <div className="overflow-x-auto">
              <table className="w-full text-[10px]">
                <thead>
                  <tr className={`${theme.secondaryBg}`}>
                    <th className={`text-left p-1.5 font-bold ${theme.iconColor} rounded-tl-lg`}>Area</th>
                    <th className={`text-left p-1.5 font-bold ${theme.iconColor}`}>Requirement</th>
                    <th className={`text-center p-1.5 font-bold ${theme.iconColor}`}>Status</th>
                    <th className={`text-center p-1.5 font-bold ${theme.iconColor}`}>Priority</th>
                    <th className={`text-left p-1.5 font-bold ${theme.iconColor} rounded-tr-lg`}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {complianceGaps.map((gap, i) => (
                    <tr key={i} className={`border-t ${theme.border}`}>
                      <td className={`p-1.5 font-medium ${theme.highlight}`}>{gap.area}</td>
                      <td className={`p-1.5 ${theme.iconColor}`}>{gap.requirement}</td>
                      <td className="p-1.5 text-center">
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${gap.status === 'Gap' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {gap.status}
                        </span>
                      </td>
                      <td className="p-1.5 text-center">
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${gap.priority === 'High' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'}`}>
                          {gap.priority}
                        </span>
                      </td>
                      <td className={`p-1.5 ${theme.iconColor}`}>{gap.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex items-center gap-1.5 flex-1 mr-3">
                <Bell size={12} className={theme.iconColor} />
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>Regulatory Update Alerts</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Get notified when board issues new circulars or compliance changes</p>
                </div>
              </div>
              <SSAToggle on={regulatoryAlerts} onChange={() => setRegulatoryAlerts(!regulatoryAlerts)} theme={theme} />
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
