'use client';

import React, { useState } from 'react';
import { AlertTriangle, Plus, FileText, Send, Clock, BarChart3, Download, Bell } from 'lucide-react';
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

  // ─── Consent Form Management state ─────────────────
  const [consentForms, setConsentForms] = useState([
    { name: 'Photo/Video Publication', status: 'Active', version: '2.1', lastUpdated: '2026-01-10', responses: 2845 },
    { name: 'Field Trip/Excursion', status: 'Active', version: '1.3', lastUpdated: '2026-02-01', responses: 1520 },
    { name: 'Medical Treatment', status: 'Active', version: '3.0', lastUpdated: '2025-11-15', responses: 3100 },
    { name: 'Sports/Adventure Activity', status: 'Draft', version: '1.0', lastUpdated: '2026-02-20', responses: 0 },
    { name: 'Research Participation', status: 'Draft', version: '0.5', lastUpdated: '2026-02-25', responses: 0 },
    { name: 'Data Sharing with Third-party', status: 'Active', version: '1.2', lastUpdated: '2025-12-05', responses: 2100 },
  ]);
  const [bulkConsent, setBulkConsent] = useState(true);
  const [collectionMethod, setCollectionMethod] = useState('App notification');
  const [guardianVerification, setGuardianVerification] = useState('OTP');
  const [ageAppropriateConsent, setAgeAppropriateConsent] = useState(true);
  const [consentLanguage, setConsentLanguage] = useState('English');

  // ─── Consent Lifecycle & Withdrawal state ──────────
  const [withdrawalTracking, setWithdrawalTracking] = useState(true);
  const [withdrawalProcess, setWithdrawalProcess] = useState('30-day cooling');
  const [photoRemovalOnWithdrawal, setPhotoRemovalOnWithdrawal] = useState(true);
  const [consentValidity, setConsentValidity] = useState('12');
  const [autoRenewalReminders, setAutoRenewalReminders] = useState(true);
  const [reminderDays, setReminderDays] = useState('14');

  // ─── Consent Analytics state ───────────────────────
  const [consentAnalytics, setConsentAnalytics] = useState(true);
  const [missingConsentAlerts, setMissingConsentAlerts] = useState(true);
  const [missingAlertNotifyTo, setMissingAlertNotifyTo] = useState('Class Teacher');
  const [exportConsentReport, setExportConsentReport] = useState(true);

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

      {/* ─── NEW SECTION: Consent Form Management ────── */}
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Consent Form Types" subtitle="Manage consent forms for various school activities" theme={theme}>
          <div className="space-y-2">
            <div className="overflow-x-auto">
              <table className="w-full text-[10px]">
                <thead>
                  <tr className={theme.secondaryBg}>
                    <th className={`text-left p-1.5 font-bold ${theme.iconColor} rounded-tl-lg`}>Form Name</th>
                    <th className={`text-center p-1.5 font-bold ${theme.iconColor}`}>Status</th>
                    <th className={`text-center p-1.5 font-bold ${theme.iconColor}`}>Ver</th>
                    <th className={`text-center p-1.5 font-bold ${theme.iconColor}`}>Updated</th>
                    <th className={`text-center p-1.5 font-bold ${theme.iconColor} rounded-tr-lg`}>Resp.</th>
                  </tr>
                </thead>
                <tbody>
                  {consentForms.map((form, i) => (
                    <tr key={i} className={`border-t ${theme.border}`}>
                      <td className={`p-1.5 font-medium ${theme.highlight}`}>
                        <div className="flex items-center gap-1">
                          <FileText size={10} className={theme.iconColor} />
                          {form.name}
                        </div>
                      </td>
                      <td className="p-1.5 text-center">
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${form.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                          {form.status}
                        </span>
                      </td>
                      <td className={`p-1.5 text-center ${theme.iconColor}`}>v{form.version}</td>
                      <td className={`p-1.5 text-center ${theme.iconColor}`}>{form.lastUpdated}</td>
                      <td className={`p-1.5 text-center font-bold ${theme.highlight}`}>{form.responses.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button onClick={() => setConsentForms(p => [...p, { name: 'New Form', status: 'Draft', version: '0.1', lastUpdated: new Date().toISOString().split('T')[0], responses: 0 }])}
              className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl w-full justify-center`}>
              <Plus size={12} /> Add New Form
            </button>
          </div>
        </SectionCard>

        <SectionCard title="Consent Collection Settings" subtitle="Configure how consent is collected from guardians" theme={theme}>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex items-center gap-1.5 flex-1 mr-3">
                <Send size={12} className={theme.iconColor} />
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>Bulk Consent Collection</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Send consent forms to all parents at once</p>
                </div>
              </div>
              <SSAToggle on={bulkConsent} onChange={() => setBulkConsent(!bulkConsent)} theme={theme} />
            </div>

            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Collection Method</p>
              <SelectField options={['App notification', 'Email', 'SMS', 'In-person']} value={collectionMethod} onChange={setCollectionMethod} theme={theme} />
            </div>

            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Guardian Verification Method</p>
              <SelectField options={['OTP', 'Email link', 'Physical signature']} value={guardianVerification} onChange={setGuardianVerification} theme={theme} />
            </div>

            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>Age-Appropriate Consent</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Different forms for students above 18</p>
              </div>
              <SSAToggle on={ageAppropriateConsent} onChange={() => setAgeAppropriateConsent(!ageAppropriateConsent)} theme={theme} />
            </div>

            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Consent Language</p>
              <SelectField options={['English', 'Hindi', 'Regional']} value={consentLanguage} onChange={setConsentLanguage} theme={theme} />
            </div>
          </div>
        </SectionCard>
      </div>

      {/* ─── NEW SECTION: Consent Lifecycle & Withdrawal ── */}
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Consent Tracking" subtitle="Track consent withdrawal and expiry management" theme={theme}>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex items-center gap-1.5 flex-1 mr-3">
                <Clock size={12} className={theme.iconColor} />
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>Consent Withdrawal Tracking</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Track when parents withdraw previously given consent</p>
                </div>
              </div>
              <SSAToggle on={withdrawalTracking} onChange={() => setWithdrawalTracking(!withdrawalTracking)} theme={theme} />
            </div>

            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Withdrawal Process</p>
              <SelectField options={['Immediate', '30-day cooling', 'Admin approval required']} value={withdrawalProcess} onChange={setWithdrawalProcess} theme={theme} />
            </div>

            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>Photo/Video Removal on Withdrawal</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Auto-remove from school website and social media</p>
              </div>
              <SSAToggle on={photoRemovalOnWithdrawal} onChange={() => setPhotoRemovalOnWithdrawal(!photoRemovalOnWithdrawal)} theme={theme} />
            </div>

            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Consent Default Validity (months)</p>
              <SelectField options={['12', '24', '36']} value={consentValidity} onChange={setConsentValidity} theme={theme} />
            </div>

            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>Auto-Renewal Reminders</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Remind parents before consent expires</p>
              </div>
              <SSAToggle on={autoRenewalReminders} onChange={() => setAutoRenewalReminders(!autoRenewalReminders)} theme={theme} />
            </div>
            {autoRenewalReminders && (
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Days Before Expiry</p>
                <SelectField options={['7', '14', '30']} value={reminderDays} onChange={setReminderDays} theme={theme} />
              </div>
            )}
          </div>
        </SectionCard>

        <SectionCard title="Consent Analytics" subtitle="Dashboard, alerts, and reporting for consent status" theme={theme}>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex items-center gap-1.5 flex-1 mr-3">
                <BarChart3 size={12} className={theme.iconColor} />
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>Consent Analytics Dashboard</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Visual overview of consent collection status</p>
                </div>
              </div>
              <SSAToggle on={consentAnalytics} onChange={() => setConsentAnalytics(!consentAnalytics)} theme={theme} />
            </div>

            {/* Mini stat cards */}
            {consentAnalytics && (
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Total Sent', value: '3,240', color: 'bg-blue-100 text-blue-700' },
                  { label: 'Collected', value: '2,987', color: 'bg-green-100 text-green-700' },
                  { label: 'Pending', value: '198', color: 'bg-yellow-100 text-yellow-700' },
                  { label: 'Withdrawn', value: '55', color: 'bg-red-100 text-red-700' },
                ].map(stat => (
                  <div key={stat.label} className={`p-2.5 rounded-xl ${theme.secondaryBg} text-center`}>
                    <p className={`text-[9px] ${theme.iconColor} uppercase tracking-wide`}>{stat.label}</p>
                    <p className={`text-lg font-bold ${theme.highlight}`}>{stat.value}</p>
                  </div>
                ))}
              </div>
            )}

            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex items-center gap-1.5 flex-1 mr-3">
                <Bell size={12} className={theme.iconColor} />
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>Missing Consent Alerts</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Notify when guardians have not responded</p>
                </div>
              </div>
              <SSAToggle on={missingConsentAlerts} onChange={() => setMissingConsentAlerts(!missingConsentAlerts)} theme={theme} />
            </div>
            {missingConsentAlerts && (
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Notify To</p>
                <SelectField options={['Class Teacher', 'Admin', 'Principal']} value={missingAlertNotifyTo} onChange={setMissingAlertNotifyTo} theme={theme} />
              </div>
            )}

            {/* Compliance percentage bar */}
            <div className={`p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex items-center justify-between mb-1.5">
                <p className={`text-xs font-bold ${theme.highlight}`}>Consent Compliance</p>
                <span className="text-xs font-bold text-green-600">92%</span>
              </div>
              <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-green-500 transition-all" style={{ width: '92%' }} />
              </div>
            </div>

            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex items-center gap-1.5 flex-1 mr-3">
                <Download size={12} className={theme.iconColor} />
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>Export Consent Report</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Download consent data as PDF or Excel</p>
                </div>
              </div>
              <SSAToggle on={exportConsentReport} onChange={() => setExportConsentReport(!exportConsentReport)} theme={theme} />
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
