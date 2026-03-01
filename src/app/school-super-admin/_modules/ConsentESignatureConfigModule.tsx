'use client';

import React, { useState } from 'react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

interface ConsentType {
  name: string;
  description: string;
  enabled: boolean;
  mandatory: boolean;
  renewal: string;
}

export default function ConsentESignatureConfigModule({ theme }: { theme: Theme }) {
  // ─── Consent Types ────────────────────────────────
  const [consentTypes, setConsentTypes] = useState<ConsentType[]>([
    { name: 'Photo/Video Consent', description: 'Events, social media, yearbook photography', enabled: true, mandatory: true, renewal: 'Annual' },
    { name: 'Trip/Excursion Consent', description: 'Field trips, educational excursions, outings', enabled: true, mandatory: true, renewal: 'Per-event' },
    { name: 'Medical Treatment Consent', description: 'Emergency medical treatment authorization', enabled: true, mandatory: true, renewal: 'Annual' },
    { name: 'Data Sharing Consent', description: 'Third-party vendor data sharing (EdTech, transport)', enabled: true, mandatory: false, renewal: 'Annual' },
    { name: 'Research Participation', description: 'Student participation in educational research', enabled: false, mandatory: false, renewal: 'Per-event' },
    { name: 'Sports/Adventure Activity', description: 'Contact sports, adventure camps, swimming', enabled: true, mandatory: true, renewal: 'Annual' },
  ]);

  // ─── E-Signature Settings ─────────────────────────
  const [eSignEnabled, setESignEnabled] = useState(true);
  const [signatureProvider, setSignatureProvider] = useState('OTP-based');
  const [signatureValidity, setSignatureValidity] = useState('12');
  const [guardianVerification, setGuardianVerification] = useState('OTP');
  const [ageAppropriate, setAgeAppropriate] = useState(true);

  // ─── Consent Lifecycle ────────────────────────────
  const [versionManagement, setVersionManagement] = useState(true);
  const [withdrawalTracking, setWithdrawalTracking] = useState(true);
  const [expiryManagement, setExpiryManagement] = useState(true);
  const [defaultExpiryMonths, setDefaultExpiryMonths] = useState('12');
  const [renewalReminders, setRenewalReminders] = useState(true);
  const [reminderDaysBefore, setReminderDaysBefore] = useState('14');
  const [bulkCollection, setBulkCollection] = useState(true);

  // ─── Audit & Analytics ────────────────────────────
  const [consentAuditTrail, setConsentAuditTrail] = useState(true);
  const [analyticsDashboard, setAnalyticsDashboard] = useState(true);
  const [complianceReport, setComplianceReport] = useState(true);
  const [missingAlerts, setMissingAlerts] = useState(true);
  const [alertNotifyTo, setAlertNotifyTo] = useState('Admin');

  const mockStats = [
    { label: 'Total Consents', value: '2,847', color: 'bg-blue-100 text-blue-700' },
    { label: 'Pending', value: '156', color: 'bg-yellow-100 text-yellow-700' },
    { label: 'Expired', value: '23', color: 'bg-red-100 text-red-600' },
    { label: 'Withdrawn', value: '8', color: 'bg-gray-100 text-gray-600' },
  ];

  return (
    <div className="space-y-4">
      <ModuleHeader title="Consent & E-Signature Configuration" subtitle="Parent consent forms, digital signatures, lifecycle management, and compliance tracking" theme={theme} />

      {/* Row 1: Consent Types + E-Signature Settings */}
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Consent Types" subtitle="Configure which consent types are active, mandatory, and renewal frequency" theme={theme}>
          <div className="space-y-2">
            {consentTypes.map((ct, i) => (
              <div key={i} className={`p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex items-center justify-between mb-1">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{ct.name}</p>
                  <SSAToggle on={ct.enabled} onChange={() => { const n = [...consentTypes]; n[i] = { ...n[i], enabled: !n[i].enabled }; setConsentTypes(n); }} theme={theme} />
                </div>
                <p className={`text-[10px] ${theme.iconColor} mb-2`}>{ct.description}</p>
                {ct.enabled && (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <span className={`text-[9px] ${theme.iconColor}`}>Mandatory</span>
                      <SSAToggle on={ct.mandatory} onChange={() => { const n = [...consentTypes]; n[i] = { ...n[i], mandatory: !n[i].mandatory }; setConsentTypes(n); }} theme={theme} />
                    </div>
                    <div className="flex-1">
                      <SelectField options={['Annual', 'Per-event', 'One-time']} value={ct.renewal}
                        onChange={v => { const n = [...consentTypes]; n[i] = { ...n[i], renewal: v }; setConsentTypes(n); }} theme={theme} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="E-Signature Settings" subtitle="Digital signature provider, verification, and validity configuration" theme={theme}>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>E-Signature Integration</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Enable digital consent signatures</p>
              </div>
              <SSAToggle on={eSignEnabled} onChange={() => setESignEnabled(!eSignEnabled)} theme={theme} />
            </div>
            {eSignEnabled && (
              <>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Signature Provider</p>
                  <SelectField options={['DocuSign', 'Aadhaar eSign', 'OTP-based', 'Digital Signature']} value={signatureProvider} onChange={setSignatureProvider} theme={theme} />
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Signature Validity (months)</p>
                  <InputField value={signatureValidity} onChange={setSignatureValidity} theme={theme} type="number" placeholder="12" />
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Guardian Verification Method</p>
                  <SelectField options={['OTP', 'Email Link', 'In-person']} value={guardianVerification} onChange={setGuardianVerification} theme={theme} />
                </div>
                <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <div>
                    <p className={`text-xs font-bold ${theme.highlight}`}>Age-Appropriate Consent</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>Different forms for minors vs 18+</p>
                  </div>
                  <SSAToggle on={ageAppropriate} onChange={() => setAgeAppropriate(!ageAppropriate)} theme={theme} />
                </div>
              </>
            )}
          </div>
        </SectionCard>
      </div>

      {/* Row 2: Consent Lifecycle + Audit & Analytics */}
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Consent Lifecycle" subtitle="Version control, expiry, withdrawal tracking, and bulk collection" theme={theme}>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Version Management</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Track consent form changes over time</p>
              </div>
              <SSAToggle on={versionManagement} onChange={() => setVersionManagement(!versionManagement)} theme={theme} />
            </div>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Withdrawal Tracking</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Track when parents withdraw consent</p>
              </div>
              <SSAToggle on={withdrawalTracking} onChange={() => setWithdrawalTracking(!withdrawalTracking)} theme={theme} />
            </div>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Expiry Management</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Auto-expire consents after set period</p>
              </div>
              <SSAToggle on={expiryManagement} onChange={() => setExpiryManagement(!expiryManagement)} theme={theme} />
            </div>
            {expiryManagement && (
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Default Expiry (months)</p>
                <SelectField options={['12', '24', '36']} value={defaultExpiryMonths} onChange={setDefaultExpiryMonths} theme={theme} />
              </div>
            )}
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Renewal Reminders</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Notify before consent expires</p>
              </div>
              <SSAToggle on={renewalReminders} onChange={() => setRenewalReminders(!renewalReminders)} theme={theme} />
            </div>
            {renewalReminders && (
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Remind Days Before</p>
                <SelectField options={['7', '14', '30']} value={reminderDaysBefore} onChange={setReminderDaysBefore} theme={theme} />
              </div>
            )}
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Bulk Consent Collection</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Collect consents for entire class/grade at once</p>
              </div>
              <SSAToggle on={bulkCollection} onChange={() => setBulkCollection(!bulkCollection)} theme={theme} />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Audit & Analytics" subtitle="Consent audit trail, compliance reports, and missing consent alerts" theme={theme}>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Consent Audit Trail</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Log every consent action with timestamp</p>
              </div>
              <SSAToggle on={consentAuditTrail} onChange={() => setConsentAuditTrail(!consentAuditTrail)} theme={theme} />
            </div>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Analytics Dashboard</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Visual consent metrics and trends</p>
              </div>
              <SSAToggle on={analyticsDashboard} onChange={() => setAnalyticsDashboard(!analyticsDashboard)} theme={theme} />
            </div>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Compliance Report</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Generate consent compliance reports</p>
              </div>
              <SSAToggle on={complianceReport} onChange={() => setComplianceReport(!complianceReport)} theme={theme} />
            </div>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>Missing Consent Alerts</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Alert when student has missing consents</p>
              </div>
              <SSAToggle on={missingAlerts} onChange={() => setMissingAlerts(!missingAlerts)} theme={theme} />
            </div>
            {missingAlerts && (
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Notify To</p>
                <SelectField options={['Class Teacher', 'Admin', 'Principal']} value={alertNotifyTo} onChange={setAlertNotifyTo} theme={theme} />
              </div>
            )}

            {/* Stats Cards */}
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-2 uppercase tracking-wide`}>Consent Statistics</p>
              <div className="grid grid-cols-2 gap-2">
                {mockStats.map(s => (
                  <div key={s.label} className={`p-2.5 rounded-xl ${theme.secondaryBg} text-center`}>
                    <p className={`text-lg font-bold ${theme.highlight}`}>{s.value}</p>
                    <p className={`text-[9px] font-bold ${theme.iconColor}`}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
