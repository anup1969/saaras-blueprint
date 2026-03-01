'use client';

import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

interface ApprovalTemplate {
  name: string;
  steps: string;
  autoEscalation: boolean;
  slaHours: string;
}

export default function WorkflowApprovalConfigModule({ theme }: { theme: Theme }) {
  // ─── Workflow Engine Settings ─────────────────────
  const [engineEnabled, setEngineEnabled] = useState(true);
  const [escalationHours, setEscalationHours] = useState('48');
  const [slaTracking, setSlaTracking] = useState(true);
  const [notificationMethod, setNotificationMethod] = useState('All');
  const [batchApproval, setBatchApproval] = useState(true);
  const [versionControl, setVersionControl] = useState(true);

  // ─── Approval Chain Templates ─────────────────────
  const [templates, setTemplates] = useState<ApprovalTemplate[]>([
    { name: 'Leave Request', steps: '3', autoEscalation: true, slaHours: '24' },
    { name: 'Fee Waiver', steps: '3', autoEscalation: true, slaHours: '48' },
    { name: 'Transfer Certificate', steps: '2', autoEscalation: false, slaHours: '72' },
    { name: 'Purchase Request', steps: '4', autoEscalation: true, slaHours: '48' },
  ]);
  const templateDescriptions: Record<string, string> = {
    'Leave Request': 'Teacher > HOD > Principal',
    'Fee Waiver': 'Accountant > Principal > Trustee',
    'Transfer Certificate': 'Class Teacher > Principal',
    'Purchase Request': 'Staff > Admin > Accounts Head > Principal',
  };

  // ─── Workflow Rules ───────────────────────────────
  const [conditionalRouting, setConditionalRouting] = useState(true);
  const [parallelApproval, setParallelApproval] = useState(false);
  const [delegation, setDelegation] = useState(true);
  const [autoApproveBelow, setAutoApproveBelow] = useState(true);
  const [autoApproveAmount, setAutoApproveAmount] = useState('5000');
  const [auditTrail, setAuditTrail] = useState(true);

  // ─── Module Integration ───────────────────────────
  const [moduleIntegration, setModuleIntegration] = useState<Record<string, boolean>>({
    'Fees': true, 'HR (Leave/Payroll)': true, 'Admissions': true, 'Transport': false,
    'Inventory': true, 'Certificates': true, 'Academic (Results)': false, 'Documents': true,
  });
  const moduleWorkflowCounts: Record<string, number> = {
    'Fees': 3, 'HR (Leave/Payroll)': 5, 'Admissions': 2, 'Transport': 0,
    'Inventory': 2, 'Certificates': 2, 'Academic (Results)': 0, 'Documents': 1,
  };

  return (
    <div className="space-y-4">
      <ModuleHeader title="Workflow & Approval Configuration" subtitle="Multi-level approval chains, escalation rules, SLA tracking, and module integration" theme={theme} />

      {/* Row 1: Engine Settings + Approval Chain Templates */}
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Workflow Engine Settings" subtitle="Core engine configuration and notification preferences" theme={theme}>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Enable Workflow Engine</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Master switch for all approval workflows</p>
              </div>
              <SSAToggle on={engineEnabled} onChange={() => setEngineEnabled(!engineEnabled)} theme={theme} />
            </div>
            {engineEnabled && (
              <>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Default Escalation (hours)</p>
                  <SelectField options={['24', '48', '72']} value={escalationHours} onChange={setEscalationHours} theme={theme} />
                </div>
                <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <div>
                    <p className={`text-xs font-bold ${theme.highlight}`}>SLA Tracking</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>Track time-to-approval metrics</p>
                  </div>
                  <SSAToggle on={slaTracking} onChange={() => setSlaTracking(!slaTracking)} theme={theme} />
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Notification Method</p>
                  <SelectField options={['Email', 'SMS', 'Push', 'All']} value={notificationMethod} onChange={setNotificationMethod} theme={theme} />
                </div>
                <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <div>
                    <p className={`text-xs font-bold ${theme.highlight}`}>Batch Approval</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>Allow approving multiple requests at once</p>
                  </div>
                  <SSAToggle on={batchApproval} onChange={() => setBatchApproval(!batchApproval)} theme={theme} />
                </div>
                <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <div>
                    <p className={`text-xs font-bold ${theme.highlight}`}>Workflow Versioning</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>Track changes to workflow definitions</p>
                  </div>
                  <SSAToggle on={versionControl} onChange={() => setVersionControl(!versionControl)} theme={theme} />
                </div>
              </>
            )}
          </div>
        </SectionCard>

        <SectionCard title="Approval Chain Templates" subtitle="Predefined approval chains for common school operations" theme={theme}>
          <div className="space-y-2">
            {templates.map((t, i) => (
              <div key={i} className={`p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex-1 mr-2">
                    <input value={t.name} onChange={e => { const n = [...templates]; n[i] = { ...n[i], name: e.target.value }; setTemplates(n); }}
                      className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                  </div>
                  <button onClick={() => setTemplates(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
                </div>
                {templateDescriptions[t.name] && (
                  <p className={`text-[9px] ${theme.iconColor} mb-2 ml-1`}>{templateDescriptions[t.name]}</p>
                )}
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <p className={`text-[9px] ${theme.iconColor} mb-0.5`}>Steps</p>
                    <InputField value={t.steps} onChange={v => { const n = [...templates]; n[i] = { ...n[i], steps: v }; setTemplates(n); }} theme={theme} type="number" />
                  </div>
                  <div>
                    <p className={`text-[9px] ${theme.iconColor} mb-0.5`}>SLA (hrs)</p>
                    <InputField value={t.slaHours} onChange={v => { const n = [...templates]; n[i] = { ...n[i], slaHours: v }; setTemplates(n); }} theme={theme} type="number" />
                  </div>
                  <div className="flex items-end pb-0.5">
                    <div className="flex items-center gap-1">
                      <span className={`text-[9px] ${theme.iconColor}`}>Auto-esc</span>
                      <SSAToggle on={t.autoEscalation} onChange={() => { const n = [...templates]; n[i] = { ...n[i], autoEscalation: !n[i].autoEscalation }; setTemplates(n); }} theme={theme} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={() => setTemplates(p => [...p, { name: 'New Template', steps: '2', autoEscalation: false, slaHours: '48' }])}
              className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
              <Plus size={12} /> Add Template
            </button>
          </div>
        </SectionCard>
      </div>

      {/* Row 2: Workflow Rules + Module Integration */}
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Workflow Rules" subtitle="Routing, delegation, auto-approval, and audit settings" theme={theme}>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Conditional Routing</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Route requests based on amount, type, or department</p>
              </div>
              <SSAToggle on={conditionalRouting} onChange={() => setConditionalRouting(!conditionalRouting)} theme={theme} />
            </div>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Parallel Approval</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Multiple approvers at the same level can approve simultaneously</p>
              </div>
              <SSAToggle on={parallelApproval} onChange={() => setParallelApproval(!parallelApproval)} theme={theme} />
            </div>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Delegation / Proxy</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Allow approvers to delegate to a proxy during absence</p>
              </div>
              <SSAToggle on={delegation} onChange={() => setDelegation(!delegation)} theme={theme} />
            </div>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>Auto-Approve Below Threshold</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Skip approval for amounts below threshold</p>
              </div>
              <SSAToggle on={autoApproveBelow} onChange={() => setAutoApproveBelow(!autoApproveBelow)} theme={theme} />
            </div>
            {autoApproveBelow && (
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Auto-Approve Amount (INR)</p>
                <InputField value={autoApproveAmount} onChange={setAutoApproveAmount} theme={theme} type="number" placeholder="5000" />
              </div>
            )}
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Audit Trail</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Log every approval action with timestamp and user</p>
              </div>
              <SSAToggle on={auditTrail} onChange={() => setAuditTrail(!auditTrail)} theme={theme} />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Module Integration" subtitle="Select which modules use the workflow approval engine" theme={theme}>
          <div className="space-y-2">
            {Object.entries(moduleIntegration).map(([mod, enabled]) => (
              <div key={mod} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex items-center gap-2">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{mod}</p>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${enabled ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                    {moduleWorkflowCounts[mod]} workflow{moduleWorkflowCounts[mod] !== 1 ? 's' : ''}
                  </span>
                </div>
                <SSAToggle on={enabled} onChange={() => setModuleIntegration(p => ({ ...p, [mod]: !p[mod] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
