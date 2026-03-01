'use client';

import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

interface QualityDomain {
  name: string;
  score: string;
}

interface Milestone {
  name: string;
  deadline: string;
  status: string;
}

export default function AccreditationQualityConfigModule({ theme }: { theme: Theme }) {
  // ─── Accreditation Frameworks ─────────────────────
  const [framework, setFramework] = useState('NAAC');
  const [accreditationStatus, setAccreditationStatus] = useState('In Progress');
  const [certDate, setCertDate] = useState('2024-06-15');
  const [expiryDate, setExpiryDate] = useState('2029-06-14');
  const [nextAudit, setNextAudit] = useState('2026-12-01');
  const [overallGrade, setOverallGrade] = useState('A+');

  // ─── Quality Metrics ─────────────────────────────
  const [qualityDashboard, setQualityDashboard] = useState(true);
  const [domains, setDomains] = useState<QualityDomain[]>([
    { name: 'Curricular Aspects', score: '3.5/4' },
    { name: 'Teaching-Learning & Evaluation', score: '3.2/4' },
    { name: 'Research & Innovation', score: '2.8/4' },
    { name: 'Infrastructure & Resources', score: '3.0/4' },
    { name: 'Student Support & Progression', score: '3.4/4' },
    { name: 'Governance & Leadership', score: '3.6/4' },
    { name: 'Institutional Values', score: '3.1/4' },
  ]);
  const [benchmarking, setBenchmarking] = useState(true);

  // ─── Self-Assessment & Peer Review ─────────────────
  const [selfAssessFreq, setSelfAssessFreq] = useState('Bi-annual');
  const [peerReview, setPeerReview] = useState(true);
  const [internalAudit, setInternalAudit] = useState(true);
  const [externalAudit, setExternalAudit] = useState(true);
  const [evidenceCollection, setEvidenceCollection] = useState(true);
  const [evidenceCategories, setEvidenceCategories] = useState<Record<string, boolean>>({
    'Academic Records': true, 'Student Feedback': true, 'Faculty CVs': true,
    'Infrastructure Photos': true, 'Financial Statements': true,
  });

  // ─── Improvement Action Tracking ──────────────────
  const [improvementTracker, setImprovementTracker] = useState(true);
  const [defaultPriority, setDefaultPriority] = useState('Medium');
  const [autoAssignDept, setAutoAssignDept] = useState(true);
  const [reminderDays, setReminderDays] = useState('14');
  const [milestones, setMilestones] = useState<Milestone[]>([
    { name: 'Submit Self-Study Report', deadline: '2026-06-30', status: 'In Progress' },
    { name: 'Internal Mock Audit', deadline: '2026-09-15', status: 'Identified' },
    { name: 'Peer Team Visit', deadline: '2026-12-01', status: 'Identified' },
    { name: 'Action Plan Submission', deadline: '2027-01-15', status: 'Identified' },
  ]);

  const statusColors: Record<string, string> = {
    'Preparing': 'bg-yellow-100 text-yellow-700',
    'In Progress': 'bg-blue-100 text-blue-700',
    'Certified': 'bg-green-100 text-green-700',
    'Expired': 'bg-red-100 text-red-600',
    'Identified': 'bg-gray-100 text-gray-600',
    'Implemented': 'bg-emerald-100 text-emerald-700',
    'Verified': 'bg-green-100 text-green-700',
  };

  return (
    <div className="space-y-4">
      <ModuleHeader title="Accreditation & Quality Configuration" subtitle="Manage accreditation frameworks, quality metrics, assessments, and improvement tracking" theme={theme} />

      {/* Row 1: Accreditation Frameworks + Quality Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Accreditation Frameworks" subtitle="Active accreditation standard, status, and key dates" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Active Framework</p>
              <SelectField options={['NAAC', 'NABET', 'ISO 21001', 'Custom']} value={framework} onChange={setFramework} theme={theme} />
            </div>
            <div className="flex items-center gap-2">
              <p className={`text-[10px] font-bold ${theme.iconColor}`}>Status:</p>
              <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${statusColors[accreditationStatus] || 'bg-gray-100 text-gray-600'}`}>
                {accreditationStatus}
              </span>
              <SelectField options={['Preparing', 'In Progress', 'Certified', 'Expired']} value={accreditationStatus} onChange={setAccreditationStatus} theme={theme} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Certification Date</p>
                <InputField value={certDate} onChange={setCertDate} theme={theme} type="date" />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Expiry Date</p>
                <InputField value={expiryDate} onChange={setExpiryDate} theme={theme} type="date" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Next Audit Date</p>
                <InputField value={nextAudit} onChange={setNextAudit} theme={theme} type="date" />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Overall Grade / Score</p>
                <InputField value={overallGrade} onChange={setOverallGrade} theme={theme} placeholder="e.g. A+ or 3.5/4" />
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Quality Metrics Dashboard Config" subtitle="Quality domains, scoring, and benchmarking" theme={theme}>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Enable Quality Dashboard</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Show quality metrics on SSA dashboard</p>
              </div>
              <SSAToggle on={qualityDashboard} onChange={() => setQualityDashboard(!qualityDashboard)} theme={theme} />
            </div>
            {qualityDashboard && (
              <>
                <div className="space-y-2">
                  {domains.map((d, i) => (
                    <div key={i} className={`flex items-center gap-2 p-2 rounded-xl ${theme.secondaryBg}`}>
                      <input value={d.name} onChange={e => { const n = [...domains]; n[i] = { ...n[i], name: e.target.value }; setDomains(n); }}
                        className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-medium ${theme.highlight} outline-none`} />
                      <input value={d.score} onChange={e => { const n = [...domains]; n[i] = { ...n[i], score: e.target.value }; setDomains(n); }}
                        className={`w-20 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center font-bold ${theme.iconColor} outline-none`} />
                      <button onClick={() => setDomains(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
                    </div>
                  ))}
                </div>
                <button onClick={() => setDomains(p => [...p, { name: '', score: '' }])}
                  className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
                  <Plus size={12} /> Add Domain
                </button>
                <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <div>
                    <p className={`text-xs font-bold ${theme.highlight}`}>Benchmarking</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>Compare against national/state averages</p>
                  </div>
                  <SSAToggle on={benchmarking} onChange={() => setBenchmarking(!benchmarking)} theme={theme} />
                </div>
              </>
            )}
          </div>
        </SectionCard>
      </div>

      {/* Row 2: Self-Assessment + Improvement Tracking */}
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Self-Assessment & Peer Review" subtitle="Assessment schedules, audits, and evidence collection" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Self-Assessment Frequency</p>
              <SelectField options={['Quarterly', 'Bi-annual', 'Annual']} value={selfAssessFreq} onChange={setSelfAssessFreq} theme={theme} />
            </div>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-xs font-bold ${theme.highlight}`}>Peer Review</p>
              <SSAToggle on={peerReview} onChange={() => setPeerReview(!peerReview)} theme={theme} />
            </div>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-xs font-bold ${theme.highlight}`}>Internal Audit</p>
              <SSAToggle on={internalAudit} onChange={() => setInternalAudit(!internalAudit)} theme={theme} />
            </div>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-xs font-bold ${theme.highlight}`}>External Audit</p>
              <SSAToggle on={externalAudit} onChange={() => setExternalAudit(!externalAudit)} theme={theme} />
            </div>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Evidence Collection</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Collect supporting documents for accreditation</p>
              </div>
              <SSAToggle on={evidenceCollection} onChange={() => setEvidenceCollection(!evidenceCollection)} theme={theme} />
            </div>
            {evidenceCollection && (
              <div className="space-y-1.5 ml-2">
                <p className={`text-[9px] font-bold ${theme.iconColor} uppercase tracking-wide`}>Document Categories</p>
                {Object.entries(evidenceCategories).map(([cat, enabled]) => (
                  <div key={cat} className={`flex items-center justify-between p-2 rounded-xl ${theme.secondaryBg}`}>
                    <p className={`text-xs font-medium ${theme.highlight}`}>{cat}</p>
                    <SSAToggle on={enabled} onChange={() => setEvidenceCategories(p => ({ ...p, [cat]: !p[cat] }))} theme={theme} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </SectionCard>

        <SectionCard title="Improvement Action Tracking" subtitle="Track improvement actions, priorities, and milestones" theme={theme}>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Enable Improvement Tracker</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Track corrective and improvement actions</p>
              </div>
              <SSAToggle on={improvementTracker} onChange={() => setImprovementTracker(!improvementTracker)} theme={theme} />
            </div>
            {improvementTracker && (
              <>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Default Priority</p>
                  <SelectField options={['Critical', 'High', 'Medium', 'Low']} value={defaultPriority} onChange={setDefaultPriority} theme={theme} />
                </div>
                <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <div>
                    <p className={`text-xs font-bold ${theme.highlight}`}>Auto-Assign to Department</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>Route actions to responsible department</p>
                  </div>
                  <SSAToggle on={autoAssignDept} onChange={() => setAutoAssignDept(!autoAssignDept)} theme={theme} />
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Deadline Reminder (days before)</p>
                  <SelectField options={['7', '14', '30']} value={reminderDays} onChange={setReminderDays} theme={theme} />
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Status Workflow</p>
                  <div className="flex items-center gap-1 flex-wrap">
                    {['Identified', 'In Progress', 'Implemented', 'Verified'].map((s, i, arr) => (
                      <React.Fragment key={s}>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${statusColors[s]}`}>{s}</span>
                        {i < arr.length - 1 && <span className={`text-[9px] ${theme.iconColor}`}>&rarr;</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Milestones</p>
                  <div className="space-y-1.5">
                    {milestones.map((m, i) => (
                      <div key={i} className={`flex items-center gap-2 p-2 rounded-xl ${theme.secondaryBg}`}>
                        <input value={m.name} onChange={e => { const n = [...milestones]; n[i] = { ...n[i], name: e.target.value }; setMilestones(n); }}
                          className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-medium ${theme.highlight} outline-none`} />
                        <input value={m.deadline} onChange={e => { const n = [...milestones]; n[i] = { ...n[i], deadline: e.target.value }; setMilestones(n); }}
                          type="date" className={`w-32 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.iconColor} outline-none`} />
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold whitespace-nowrap ${statusColors[m.status] || 'bg-gray-100 text-gray-600'}`}>{m.status}</span>
                        <button onClick={() => setMilestones(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setMilestones(p => [...p, { name: '', deadline: '', status: 'Identified' }])}
                    className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl mt-2`}>
                    <Plus size={12} /> Add Milestone
                  </button>
                </div>
              </>
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
