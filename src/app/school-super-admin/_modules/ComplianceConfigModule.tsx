'use client';

import React, { useState, useMemo } from 'react';
import { X, Plus, Shield, Building, CheckCircle, AlertTriangle, ClipboardCheck, Search, Bell, Download, Upload, Edit, Save, Check } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, SelectField, InputField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

const PAGE_SIZE = 5;

// ─── Reusable sub-components ───
function TableToolbar({ search, onSearch, count, total, theme }: { search: string; onSearch: (v: string) => void; count: number; total: number; theme: Theme }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className={`flex items-center gap-1.5 flex-1 px-3 py-1.5 rounded-xl border ${theme.border} ${theme.inputBg}`}>
        <Search size={12} className={theme.iconColor} />
        <input value={search} onChange={e => onSearch(e.target.value)} placeholder="Search..."
          className={`flex-1 bg-transparent text-xs ${theme.highlight} outline-none`} />
        {search && <button onClick={() => onSearch('')} className="text-gray-400 hover:text-gray-600"><X size={10} /></button>}
      </div>
      <span className={`text-[10px] font-bold px-2.5 py-1.5 rounded-xl ${theme.secondaryBg} ${theme.iconColor} border ${theme.border} whitespace-nowrap`}>
        {count} / {total}
      </span>
      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-all">
        <Download size={12} /> Export
      </button>
      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-all">
        <Upload size={12} /> Import
      </button>
    </div>
  );
}

function Pagination({ page, totalPages, onPage, theme }: { page: number; totalPages: number; onPage: (p: number) => void; theme: Theme }) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between mt-3">
      <p className={`text-[10px] ${theme.iconColor}`}>Page {page} of {totalPages}</p>
      <div className="flex items-center gap-1">
        <button disabled={page <= 1} onClick={() => onPage(page - 1)}
          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${theme.border} ${page <= 1 ? 'opacity-40 cursor-not-allowed' : `${theme.buttonHover} ${theme.highlight}`}`}>Prev</button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
          <button key={p} onClick={() => onPage(p)}
            className={`w-6 h-6 rounded-lg text-[10px] font-bold ${p === page ? `${theme.primary} text-white` : `${theme.buttonHover} ${theme.highlight}`}`}>{p}</button>
        ))}
        <button disabled={page >= totalPages} onClick={() => onPage(page + 1)}
          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${theme.border} ${page >= totalPages ? 'opacity-40 cursor-not-allowed' : `${theme.buttonHover} ${theme.highlight}`}`}>Next</button>
      </div>
    </div>
  );
}

export default function ComplianceConfigModule({ theme }: { theme: Theme }) {
  const [framework, setFramework] = useState('SQAAF');
  const [auditSchedule, setAuditSchedule] = useState('Quarterly');
  const [compToggles, setCompToggles] = useState<Record<string, boolean>>({
    'Auto-collect Data from Modules': true, 'Document Checklist': true,
  });

  // ─── Compliance Domains (upgraded: search, enable/disable, export/import, pagination, count) ───
  const [domains, setDomains] = useState([
    { name: 'Curricular Aspects', score: '3.5/4', enabled: true },
    { name: 'Teaching-Learning', score: '3.2/4', enabled: true },
    { name: 'Infrastructure', score: '3.0/4', enabled: true },
    { name: 'Student Support', score: '2.8/4', enabled: true },
    { name: 'Governance & Leadership', score: '3.4/4', enabled: true },
  ]);
  const [domainSearch, setDomainSearch] = useState('');
  const [domainPage, setDomainPage] = useState(1);

  const filteredDomains = useMemo(() => domains.filter(d => d.name.toLowerCase().includes(domainSearch.toLowerCase())), [domains, domainSearch]);
  const domainTotalPages = Math.max(1, Math.ceil(filteredDomains.length / PAGE_SIZE));
  const pagedDomains = filteredDomains.slice((domainPage - 1) * PAGE_SIZE, domainPage * PAGE_SIZE);

  // ─── Student Document Types (upgraded: inline edit, search, export/import, pagination, count) ───
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
  const [newStudentDoc, setNewStudentDoc] = useState('');
  const [studentDocSearch, setStudentDocSearch] = useState('');
  const [studentDocPage, setStudentDocPage] = useState(1);
  const [editingStudentDocIdx, setEditingStudentDocIdx] = useState<number | null>(null);
  const [editingStudentDocName, setEditingStudentDocName] = useState('');

  const filteredStudentDocs = useMemo(() => studentDocs.filter(d => d.name.toLowerCase().includes(studentDocSearch.toLowerCase())), [studentDocs, studentDocSearch]);
  const studentDocTotalPages = Math.max(1, Math.ceil(filteredStudentDocs.length / PAGE_SIZE));
  const pagedStudentDocs = filteredStudentDocs.slice((studentDocPage - 1) * PAGE_SIZE, studentDocPage * PAGE_SIZE);

  // ─── Staff Document Types (upgraded: inline edit, search, export/import, pagination, count) ───
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
  const [newStaffDoc, setNewStaffDoc] = useState('');
  const [staffDocSearch, setStaffDocSearch] = useState('');
  const [staffDocPage, setStaffDocPage] = useState(1);
  const [editingStaffDocIdx, setEditingStaffDocIdx] = useState<number | null>(null);
  const [editingStaffDocName, setEditingStaffDocName] = useState('');

  const filteredStaffDocs = useMemo(() => staffDocs.filter(d => d.name.toLowerCase().includes(staffDocSearch.toLowerCase())), [staffDocs, staffDocSearch]);
  const staffDocTotalPages = Math.max(1, Math.ceil(filteredStaffDocs.length / PAGE_SIZE));
  const pagedStaffDocs = filteredStaffDocs.slice((staffDocPage - 1) * PAGE_SIZE, staffDocPage * PAGE_SIZE);

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

  // ─── B6: Compliance Gap Analysis (interactive CRUD) ───
  const [complianceGaps, setComplianceGaps] = useState([
    { area: 'Science Lab', requirement: 'CBSE requires separate Physics lab', status: 'Non-Compliant', priority: 'High', action: 'Allocate room B-12' },
    { area: 'Library', requirement: 'Minimum 5000 books required', status: 'Non-Compliant', priority: 'Medium', action: 'Procure 800 more titles' },
    { area: 'Sports', requirement: 'Playground area below 10,000 sqft', status: 'Non-Compliant', priority: 'High', action: 'Expand ground area' },
    { area: 'Fire Safety', requirement: 'Monthly drill not conducted', status: 'Partial', priority: 'Medium', action: 'Schedule monthly drills' },
    { area: 'Staff', requirement: '3 teachers lack B.Ed qualification', status: 'Non-Compliant', priority: 'High', action: 'Enroll in B.Ed program' },
  ]);
  const [gapSearch, setGapSearch] = useState('');
  const [gapPage, setGapPage] = useState(1);
  const [editingGapIdx, setEditingGapIdx] = useState<number | null>(null);
  const [editingGap, setEditingGap] = useState({ area: '', requirement: '', status: '', priority: '', action: '' });
  const [showAddGap, setShowAddGap] = useState(false);
  const [newGap, setNewGap] = useState({ area: '', requirement: '', status: 'Compliant', priority: 'Medium', action: '' });

  const gapStatusOptions = ['Compliant', 'Partial', 'Non-Compliant'];
  const gapPriorityOptions = ['High', 'Medium', 'Low'];

  const filteredGaps = useMemo(() => complianceGaps.filter(g =>
    g.area.toLowerCase().includes(gapSearch.toLowerCase()) ||
    g.requirement.toLowerCase().includes(gapSearch.toLowerCase()) ||
    g.action.toLowerCase().includes(gapSearch.toLowerCase())
  ), [complianceGaps, gapSearch]);
  const gapTotalPages = Math.max(1, Math.ceil(filteredGaps.length / PAGE_SIZE));
  const pagedGaps = filteredGaps.slice((gapPage - 1) * PAGE_SIZE, gapPage * PAGE_SIZE);

  const [regulatoryAlerts, setRegulatoryAlerts] = useState(true);

  // ─── Save feedback ───
  const [saved, setSaved] = useState(false);
  function handleSave() { setSaved(true); setTimeout(() => setSaved(false), 2500); }

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

        {/* ─── Compliance Domains (upgraded) ─── */}
        <SectionCard title="Compliance Domains" subtitle="Edit domain names and scores — add, enable/disable, or remove" theme={theme}>
          <TableToolbar search={domainSearch} onSearch={v => { setDomainSearch(v); setDomainPage(1); }} count={filteredDomains.length} total={domains.length} theme={theme} />
          <div className="space-y-2">
            {pagedDomains.map((d) => {
              const realIdx = domains.findIndex(x => x.name === d.name);
              return (
                <div key={realIdx} className={`flex items-center gap-2 p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <input value={d.name} onChange={e => { const n = [...domains]; n[realIdx] = { ...n[realIdx], name: e.target.value }; setDomains(n); }}
                    className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-medium ${theme.highlight} outline-none`} />
                  <input value={d.score} onChange={e => { const n = [...domains]; n[realIdx] = { ...n[realIdx], score: e.target.value }; setDomains(n); }}
                    className={`w-20 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center font-bold ${theme.iconColor} outline-none`} />
                  <SSAToggle on={d.enabled} onChange={() => { const n = [...domains]; n[realIdx] = { ...n[realIdx], enabled: !n[realIdx].enabled }; setDomains(n); }} theme={theme} />
                  <button onClick={() => setDomains(p => p.filter((_, j) => j !== realIdx))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
                </div>
              );
            })}
            {pagedDomains.length === 0 && (
              <p className={`text-center text-xs ${theme.iconColor} py-4`}>No domains found</p>
            )}
          </div>
          <Pagination page={domainPage} totalPages={domainTotalPages} onPage={setDomainPage} theme={theme} />
          <button onClick={() => setDomains(p => [...p, { name: '', score: '', enabled: true }])}
            className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl mt-3`}>
            <Plus size={12} /> Add Domain
          </button>
        </SectionCard>
      </div>

      {/* ─── Required Documents (upgraded with search, inline edit, export/import, pagination, count) ─── */}
      <SectionCard title="Required Documents" subtitle="Document requirements for student admission and staff joining" theme={theme}>
        <div className="grid grid-cols-2 gap-4">
          {/* ─── Student Documents ─── */}
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-2 uppercase tracking-wide`}>Student Documents</p>
            <TableToolbar search={studentDocSearch} onSearch={v => { setStudentDocSearch(v); setStudentDocPage(1); }} count={filteredStudentDocs.length} total={studentDocs.length} theme={theme} />
            <div className="space-y-1.5">
              {pagedStudentDocs.map((d) => {
                const realIdx = studentDocs.findIndex(x => x.name === d.name);
                return (
                  <div key={realIdx} className={`flex items-center gap-2 p-2 rounded-xl ${theme.secondaryBg}`}>
                    {editingStudentDocIdx === realIdx ? (
                      <input value={editingStudentDocName} onChange={e => setEditingStudentDocName(e.target.value)} autoFocus
                        className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                    ) : (
                      <span className={`text-xs font-medium ${theme.highlight} flex-1`}>{d.name}</span>
                    )}
                    <div className="flex items-center gap-1">
                      <span className={`text-[9px] ${theme.iconColor}`}>Req</span>
                      <SSAToggle on={d.required} onChange={() => { const n = [...studentDocs]; n[realIdx] = { ...n[realIdx], required: !n[realIdx].required }; setStudentDocs(n); }} theme={theme} />
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={`text-[9px] ${theme.iconColor}`}>Mand</span>
                      <SSAToggle on={d.mandatory} onChange={() => { const n = [...studentDocs]; n[realIdx] = { ...n[realIdx], mandatory: !n[realIdx].mandatory }; setStudentDocs(n); }} theme={theme} />
                    </div>
                    {editingStudentDocIdx === realIdx ? (
                      <div className="flex items-center gap-1">
                        <button onClick={() => {
                          if (editingStudentDocName.trim()) { setStudentDocs(p => p.map((x, j) => j === realIdx ? { ...x, name: editingStudentDocName.trim() } : x)); }
                          setEditingStudentDocIdx(null);
                        }} className="text-[10px] font-bold text-emerald-600 hover:text-emerald-800 px-1.5 py-0.5 rounded-lg hover:bg-emerald-50">Save</button>
                        <button onClick={() => setEditingStudentDocIdx(null)}
                          className={`text-[10px] font-bold ${theme.iconColor} hover:opacity-70 px-1.5 py-0.5 rounded-lg`}>Cancel</button>
                      </div>
                    ) : (
                      <button onClick={() => { setEditingStudentDocIdx(realIdx); setEditingStudentDocName(d.name); }}
                        className={`text-[10px] font-bold ${theme.iconColor} hover:opacity-70 px-1 py-1 rounded-lg ${theme.secondaryBg}`}><Edit size={10} /></button>
                    )}
                    <button onClick={() => setStudentDocs(p => p.filter((_, j) => j !== realIdx))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
                  </div>
                );
              })}
              {pagedStudentDocs.length === 0 && (
                <p className={`text-center text-xs ${theme.iconColor} py-3`}>No student documents found</p>
              )}
            </div>
            <Pagination page={studentDocPage} totalPages={studentDocTotalPages} onPage={setStudentDocPage} theme={theme} />
            <div className="flex gap-2 mt-2">
              <input value={newStudentDoc} onChange={e => setNewStudentDoc(e.target.value)} placeholder="Add document..."
                onKeyDown={e => { if (e.key === 'Enter' && newStudentDoc.trim()) { setStudentDocs(p => [...p, { name: newStudentDoc.trim(), required: true, mandatory: false }]); setNewStudentDoc(''); } }}
                className={`flex-1 px-3 py-1.5 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
              <button onClick={() => { if (newStudentDoc.trim()) { setStudentDocs(p => [...p, { name: newStudentDoc.trim(), required: true, mandatory: false }]); setNewStudentDoc(''); } }}
                className={`px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={12} /></button>
            </div>
          </div>

          {/* ─── Staff Documents ─── */}
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-2 uppercase tracking-wide`}>Staff Documents</p>
            <TableToolbar search={staffDocSearch} onSearch={v => { setStaffDocSearch(v); setStaffDocPage(1); }} count={filteredStaffDocs.length} total={staffDocs.length} theme={theme} />
            <div className="space-y-1.5">
              {pagedStaffDocs.map((d) => {
                const realIdx = staffDocs.findIndex(x => x.name === d.name);
                return (
                  <div key={realIdx} className={`flex items-center gap-2 p-2 rounded-xl ${theme.secondaryBg}`}>
                    {editingStaffDocIdx === realIdx ? (
                      <input value={editingStaffDocName} onChange={e => setEditingStaffDocName(e.target.value)} autoFocus
                        className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                    ) : (
                      <span className={`text-xs font-medium ${theme.highlight} flex-1`}>{d.name}</span>
                    )}
                    <div className="flex items-center gap-1">
                      <span className={`text-[9px] ${theme.iconColor}`}>Req</span>
                      <SSAToggle on={d.required} onChange={() => { const n = [...staffDocs]; n[realIdx] = { ...n[realIdx], required: !n[realIdx].required }; setStaffDocs(n); }} theme={theme} />
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={`text-[9px] ${theme.iconColor}`}>Mand</span>
                      <SSAToggle on={d.mandatory} onChange={() => { const n = [...staffDocs]; n[realIdx] = { ...n[realIdx], mandatory: !n[realIdx].mandatory }; setStaffDocs(n); }} theme={theme} />
                    </div>
                    {editingStaffDocIdx === realIdx ? (
                      <div className="flex items-center gap-1">
                        <button onClick={() => {
                          if (editingStaffDocName.trim()) { setStaffDocs(p => p.map((x, j) => j === realIdx ? { ...x, name: editingStaffDocName.trim() } : x)); }
                          setEditingStaffDocIdx(null);
                        }} className="text-[10px] font-bold text-emerald-600 hover:text-emerald-800 px-1.5 py-0.5 rounded-lg hover:bg-emerald-50">Save</button>
                        <button onClick={() => setEditingStaffDocIdx(null)}
                          className={`text-[10px] font-bold ${theme.iconColor} hover:opacity-70 px-1.5 py-0.5 rounded-lg`}>Cancel</button>
                      </div>
                    ) : (
                      <button onClick={() => { setEditingStaffDocIdx(realIdx); setEditingStaffDocName(d.name); }}
                        className={`text-[10px] font-bold ${theme.iconColor} hover:opacity-70 px-1 py-1 rounded-lg ${theme.secondaryBg}`}><Edit size={10} /></button>
                    )}
                    <button onClick={() => setStaffDocs(p => p.filter((_, j) => j !== realIdx))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
                  </div>
                );
              })}
              {pagedStaffDocs.length === 0 && (
                <p className={`text-center text-xs ${theme.iconColor} py-3`}>No staff documents found</p>
              )}
            </div>
            <Pagination page={staffDocPage} totalPages={staffDocTotalPages} onPage={setStaffDocPage} theme={theme} />
            <div className="flex gap-2 mt-2">
              <input value={newStaffDoc} onChange={e => setNewStaffDoc(e.target.value)} placeholder="Add document..."
                onKeyDown={e => { if (e.key === 'Enter' && newStaffDoc.trim()) { setStaffDocs(p => [...p, { name: newStaffDoc.trim(), required: true, mandatory: false }]); setNewStaffDoc(''); } }}
                className={`flex-1 px-3 py-1.5 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
              <button onClick={() => { if (newStaffDoc.trim()) { setStaffDocs(p => [...p, { name: newStaffDoc.trim(), required: true, mandatory: false }]); setNewStaffDoc(''); } }}
                className={`px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={12} /></button>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ─── Board-Specific Compliance ──────── */}
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

      {/* ─── Infrastructure & Ratio Monitoring ── */}
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

      {/* ─── Inspection & Readiness ───────── */}
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

        {/* ─── B6: Compliance Gap Analysis (interactive CRUD) ─── */}
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

            {/* Gap table toolbar */}
            <TableToolbar search={gapSearch} onSearch={v => { setGapSearch(v); setGapPage(1); }} count={filteredGaps.length} total={complianceGaps.length} theme={theme} />

            {/* Gap table */}
            <div className="overflow-x-auto">
              <table className="w-full text-[10px]">
                <thead>
                  <tr className={`${theme.secondaryBg}`}>
                    <th className={`text-left p-1.5 font-bold ${theme.iconColor} rounded-tl-lg`}>Area</th>
                    <th className={`text-left p-1.5 font-bold ${theme.iconColor}`}>Requirement</th>
                    <th className={`text-center p-1.5 font-bold ${theme.iconColor}`}>Status</th>
                    <th className={`text-center p-1.5 font-bold ${theme.iconColor}`}>Priority</th>
                    <th className={`text-left p-1.5 font-bold ${theme.iconColor}`}>Action</th>
                    <th className={`text-center p-1.5 font-bold ${theme.iconColor} rounded-tr-lg`}></th>
                  </tr>
                </thead>
                <tbody>
                  {pagedGaps.map((gap) => {
                    const realIdx = complianceGaps.findIndex(x => x.area === gap.area && x.requirement === gap.requirement);
                    const isEditing = editingGapIdx === realIdx;
                    return (
                      <tr key={realIdx} className={`border-t ${theme.border}`}>
                        <td className={`p-1.5 font-medium ${theme.highlight}`}>
                          {isEditing ? (
                            <input value={editingGap.area} onChange={e => setEditingGap(p => ({ ...p, area: e.target.value }))}
                              className={`w-full px-1.5 py-0.5 rounded border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight} outline-none`} />
                          ) : gap.area}
                        </td>
                        <td className={`p-1.5 ${theme.iconColor}`}>
                          {isEditing ? (
                            <input value={editingGap.requirement} onChange={e => setEditingGap(p => ({ ...p, requirement: e.target.value }))}
                              className={`w-full px-1.5 py-0.5 rounded border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight} outline-none`} />
                          ) : gap.requirement}
                        </td>
                        <td className="p-1.5 text-center">
                          {isEditing ? (
                            <select value={editingGap.status} onChange={e => setEditingGap(p => ({ ...p, status: e.target.value }))}
                              className={`text-[9px] font-bold px-1 py-0.5 rounded-full border-none outline-none cursor-pointer ${editingGap.status === 'Compliant' ? 'bg-green-100 text-green-700' : editingGap.status === 'Partial' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                              {gapStatusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                          ) : (
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${gap.status === 'Compliant' ? 'bg-green-100 text-green-700' : gap.status === 'Partial' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                              {gap.status}
                            </span>
                          )}
                        </td>
                        <td className="p-1.5 text-center">
                          {isEditing ? (
                            <select value={editingGap.priority} onChange={e => setEditingGap(p => ({ ...p, priority: e.target.value }))}
                              className={`text-[9px] font-bold px-1 py-0.5 rounded-full border-none outline-none cursor-pointer ${editingGap.priority === 'High' ? 'bg-red-50 text-red-600' : editingGap.priority === 'Medium' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'}`}>
                              {gapPriorityOptions.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                          ) : (
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${gap.priority === 'High' ? 'bg-red-50 text-red-600' : gap.priority === 'Medium' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'}`}>
                              {gap.priority}
                            </span>
                          )}
                        </td>
                        <td className={`p-1.5 ${theme.iconColor}`}>
                          {isEditing ? (
                            <input value={editingGap.action} onChange={e => setEditingGap(p => ({ ...p, action: e.target.value }))}
                              className={`w-full px-1.5 py-0.5 rounded border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight} outline-none`} />
                          ) : gap.action}
                        </td>
                        <td className="p-1.5 text-center">
                          <div className="flex items-center gap-1 justify-center">
                            {isEditing ? (
                              <>
                                <button onClick={() => {
                                  setComplianceGaps(p => p.map((x, j) => j === realIdx ? { ...editingGap } : x));
                                  setEditingGapIdx(null);
                                }} className="text-[9px] font-bold text-emerald-600 hover:text-emerald-800 px-1.5 py-0.5 rounded hover:bg-emerald-50">Save</button>
                                <button onClick={() => setEditingGapIdx(null)}
                                  className={`text-[9px] font-bold ${theme.iconColor} hover:opacity-70 px-1.5 py-0.5 rounded`}>Cancel</button>
                              </>
                            ) : (
                              <>
                                <button onClick={() => { setEditingGapIdx(realIdx); setEditingGap({ ...gap }); }}
                                  className={`${theme.iconColor} hover:opacity-70 p-0.5 rounded`}><Edit size={10} /></button>
                                <button onClick={() => setComplianceGaps(p => p.filter((_, j) => j !== realIdx))}
                                  className="text-red-400 hover:text-red-600 p-0.5 rounded"><X size={10} /></button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {pagedGaps.length === 0 && (
                    <tr><td colSpan={6} className={`p-3 text-center text-xs ${theme.iconColor}`}>No compliance gaps found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            <Pagination page={gapPage} totalPages={gapTotalPages} onPage={setGapPage} theme={theme} />

            {/* Add new gap */}
            {showAddGap ? (
              <div className={`p-3 rounded-xl ${theme.accentBg} border ${theme.border}`}>
                <div className="flex items-center justify-between mb-2">
                  <p className={`text-xs font-bold ${theme.highlight}`}>Add Compliance Gap</p>
                  <button onClick={() => setShowAddGap(false)} className="text-gray-400 hover:text-gray-600"><X size={14} /></button>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <p className={`text-[9px] font-bold ${theme.iconColor} mb-0.5`}>Area</p>
                    <input value={newGap.area} onChange={e => setNewGap(p => ({ ...p, area: e.target.value }))} placeholder="e.g. Library"
                      className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                  </div>
                  <div>
                    <p className={`text-[9px] font-bold ${theme.iconColor} mb-0.5`}>Requirement</p>
                    <input value={newGap.requirement} onChange={e => setNewGap(p => ({ ...p, requirement: e.target.value }))} placeholder="Description..."
                      className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                  </div>
                  <div>
                    <p className={`text-[9px] font-bold ${theme.iconColor} mb-0.5`}>Status</p>
                    <select value={newGap.status} onChange={e => setNewGap(p => ({ ...p, status: e.target.value }))}
                      className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}>
                      {gapStatusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <p className={`text-[9px] font-bold ${theme.iconColor} mb-0.5`}>Priority</p>
                    <select value={newGap.priority} onChange={e => setNewGap(p => ({ ...p, priority: e.target.value }))}
                      className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}>
                      {gapPriorityOptions.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>
                <div className="mb-2">
                  <p className={`text-[9px] font-bold ${theme.iconColor} mb-0.5`}>Action Plan</p>
                  <input value={newGap.action} onChange={e => setNewGap(p => ({ ...p, action: e.target.value }))} placeholder="Remediation steps..."
                    className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                </div>
                <button onClick={() => {
                  if (newGap.area.trim() && newGap.requirement.trim()) {
                    setComplianceGaps(p => [...p, { ...newGap, area: newGap.area.trim(), requirement: newGap.requirement.trim(), action: newGap.action.trim() }]);
                    setNewGap({ area: '', requirement: '', status: 'Compliant', priority: 'Medium', action: '' });
                    setShowAddGap(false);
                  }
                }} className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}>
                  <Plus size={12} /> Add Gap
                </button>
              </div>
            ) : (
              <button onClick={() => setShowAddGap(true)}
                className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl border ${theme.border}`}>
                <Plus size={12} /> Add Gap Entry
              </button>
            )}

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

      {/* ─── Global Save Button ─── */}
      <div className="flex justify-end pt-2 pb-4">
        <button onClick={handleSave}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all ${saved ? 'bg-emerald-500 hover:bg-emerald-600' : `${theme.primary} hover:opacity-90`}`}>
          {saved ? <><Check size={15} /> Saved</> : <><Save size={15} /> Save Configuration</>}
        </button>
      </div>
    </div>
  );
}
