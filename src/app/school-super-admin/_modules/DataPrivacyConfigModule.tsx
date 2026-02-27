'use client';

import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

export default function DataPrivacyConfigModule({ theme }: { theme: Theme }) {
  // State for all toggles and fields
  const [consentToggles, setConsentToggles] = useState<Record<string, boolean>>({
    'Student Personal Data Collection': true,
    'Student Photo/Video Consent': true,
    'Biometric Data Processing': false,
    'Third-Party Data Sharing': false,
    'Marketing Communications': false,
  });
  const [retentionPeriod, setRetentionPeriod] = useState('5 Years');
  const [breachNotification, setBreachNotification] = useState(true);
  const [breachEmail, setBreachEmail] = useState('dpo@school.edu');
  const [breachWindow, setBreachWindow] = useState('72');
  const [erasureEnabled, setErasureEnabled] = useState(true);
  const [dpdpCompliance, setDpdpCompliance] = useState(true);
  const [gdprMode, setGdprMode] = useState(false);
  const [auditFrequency, setAuditFrequency] = useState('Quarterly');

  return (
    <div className="space-y-4">
      <ModuleHeader title="Data Privacy & Compliance" subtitle="GDPR, DPDP Act 2023, consent management, and breach notification" theme={theme} />

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Consent Management" subtitle="Control what data collection requires explicit consent" theme={theme}>
          <div className="space-y-2">
            {Object.entries(consentToggles).map(([label, enabled]) => (
              <div key={label} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{label}</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setConsentToggles(p => ({ ...p, [label]: !p[label] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Compliance Framework" subtitle="Enable applicable data protection regulations" theme={theme}>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>DPDP Act 2023 (India)</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Digital Personal Data Protection Act — mandatory for Indian schools</p>
              </div>
              <SSAToggle on={dpdpCompliance} onChange={() => setDpdpCompliance(!dpdpCompliance)} theme={theme} />
            </div>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>GDPR Mode</p>
                <p className={`text-[10px] ${theme.iconColor}`}>For schools with EU students/staff — stricter data handling</p>
              </div>
              <SSAToggle on={gdprMode} onChange={() => setGdprMode(!gdprMode)} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Privacy Audit Frequency</p>
              <SelectField options={['Monthly', 'Quarterly', 'Bi-annual', 'Annual']} value={auditFrequency} onChange={setAuditFrequency} theme={theme} />
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Data Retention Policy" subtitle="How long personal data is stored before auto-purge" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Default Retention Period</p>
              <SelectField options={['1 Year', '3 Years', '5 Years', '7 Years', '10 Years', 'Until Manual Deletion']} value={retentionPeriod} onChange={setRetentionPeriod} theme={theme} />
            </div>
            <div className={`p-2.5 rounded-xl bg-blue-50 border border-blue-200`}>
              <p className="text-[10px] text-blue-700">After retention period, student/alumni data is anonymized. Financial records follow separate statutory requirements.</p>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Breach Notification" subtitle="72-hour mandatory notification per DPDP Act" theme={theme}>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>Auto Breach Notification</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Automatically notify DPO + affected parties within configured window</p>
              </div>
              <SSAToggle on={breachNotification} onChange={() => setBreachNotification(!breachNotification)} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>DPO Email</p>
              <InputField value={breachEmail} onChange={setBreachEmail} theme={theme} placeholder="data-protection-officer@school.edu" />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Notification Window (hours)</p>
              <InputField value={breachWindow} onChange={setBreachWindow} theme={theme} type="number" />
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Right to Erasure" subtitle="Allow users to request deletion of their personal data" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Enable Data Erasure Requests</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Parents/staff can request complete deletion of their personal data. Academic records are retained per statutory requirements.</p>
            </div>
            <SSAToggle on={erasureEnabled} onChange={() => setErasureEnabled(!erasureEnabled)} theme={theme} />
          </div>
          <div className={`p-2.5 rounded-xl bg-amber-50 border border-amber-200`}>
            <p className="text-[10px] text-amber-700 flex items-center gap-1"><AlertTriangle size={10} /> Erasure requests require Principal approval. Financial and academic records are exempt per CBSE/State Board norms.</p>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
