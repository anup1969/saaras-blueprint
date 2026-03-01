'use client';
import React, { useState } from 'react';
import { Video, Share2, Landmark, CreditCard, BookOpen, Calculator, Globe, Webhook, Key, FileText, Plus, ExternalLink, Copy } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

export default function APIIntegrationConfigModule({ theme }: { theme: Theme }) {
  const [thirdParty, setThirdParty] = useState(false);
  const [webhookNotifications, setWebhookNotifications] = useState(false);
  const [apiRateLimit, setApiRateLimit] = useState('1000');
  const [integrations, setIntegrations] = useState<Record<string, boolean>>({
    'Tally (Accounting)': false, 'WhatsApp Business': false, 'SMS Gateway': false,
    'Google Workspace': false, 'Microsoft 365': false,
  });

  // Extended Integrations state
  const [videoConferencing, setVideoConferencing] = useState(false);
  const [videoProvider, setVideoProvider] = useState('Zoom');
  const [autoSchedulePTM, setAutoSchedulePTM] = useState(false);
  const [recordingEnabled, setRecordingEnabled] = useState(false);
  const [socialMedia, setSocialMedia] = useState(false);
  const [socialChannels, setSocialChannels] = useState<Record<string, boolean>>({
    'Facebook page sync': false, 'Twitter/X feed': false, 'Instagram gallery': false, 'LinkedIn (school page)': false,
  });
  const [govPortal, setGovPortal] = useState(false);
  const [govIntegrations, setGovIntegrations] = useState<Record<string, boolean>>({
    'UDISE+ integration': false, 'APAAR/ABC ID sync': false, 'State education portal': false, 'CBSE Pariksha Sangam': false,
  });
  const [lmsIntegration, setLmsIntegration] = useState(false);
  const [lmsProvider, setLmsProvider] = useState('Google Classroom');
  const [accountingSoftware, setAccountingSoftware] = useState('Tally');

  // API Marketplace state
  const [apiMarketplace, setApiMarketplace] = useState(false);
  const [apiDocLink, setApiDocLink] = useState(true);
  const [apiKeyCopied, setApiKeyCopied] = useState(false);

  const webhookEntries = [
    { event: 'Student Enrolled', url: 'https://api.school.com/hooks/enroll', secret: 'whk_***...a3f', status: 'Active', lastTriggered: '28 Feb 2026, 14:30' },
    { event: 'Fee Paid', url: 'https://api.school.com/hooks/fee', secret: 'whk_***...b7d', status: 'Active', lastTriggered: '28 Feb 2026, 11:15' },
    { event: 'Attendance Marked', url: 'https://api.school.com/hooks/attend', secret: 'whk_***...c9e', status: 'Paused', lastTriggered: '25 Feb 2026, 09:00' },
    { event: 'Leave Approved', url: 'https://api.school.com/hooks/leave', secret: 'whk_***...d2a', status: 'Active', lastTriggered: '27 Feb 2026, 16:45' },
  ];

  return (
    <div className="space-y-4">
      <ModuleHeader title="API & Integration Configuration" subtitle="Third-party integrations, webhooks, and API rate limits" theme={theme} />

      <SectionCard title="Integration Master Switch" subtitle="Enable or disable all external integrations" theme={theme}>
        <div className="space-y-2">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <span className={`text-xs font-bold ${theme.highlight}`}>Third-party integrations</span>
              <p className={`text-[10px] ${theme.iconColor}`}>Master switch to allow external services to connect</p>
            </div>
            <SSAToggle on={thirdParty} onChange={() => setThirdParty(!thirdParty)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <span className={`text-xs font-bold ${theme.highlight}`}>Webhook notifications</span>
              <p className={`text-[10px] ${theme.iconColor}`}>Send event data to external URLs on triggers</p>
            </div>
            <SSAToggle on={webhookNotifications} onChange={() => setWebhookNotifications(!webhookNotifications)} theme={theme} />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Available Integrations" subtitle="Connect your school ERP with external tools and services" theme={theme}>
        <div className="space-y-2">
          {Object.entries(integrations).map(([name, enabled]) => (
            <div key={name} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg} ${!thirdParty ? 'opacity-50' : ''}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>{name}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{
                  ({
                    'Tally (Accounting)': 'Sync fee collection and payroll data directly to Tally accounting software',
                    'WhatsApp Business': 'Send fee reminders, attendance alerts, and notices via WhatsApp Business API',
                    'SMS Gateway': 'Send SMS notifications to parents for attendance, fees, and emergencies',
                    'Google Workspace': 'Integrate with Google Classroom, Drive, and Calendar for academics',
                    'Microsoft 365': 'Connect with Microsoft Teams, OneDrive, and Outlook for collaboration',
                  } as Record<string, string>)[name]
                }</p>
              </div>
              <SSAToggle on={enabled} onChange={() => { if (thirdParty) setIntegrations(p => ({ ...p, [name]: !p[name] })); }} theme={theme} />
            </div>
          ))}
          {!thirdParty && <p className={`text-[10px] ${theme.iconColor} italic`}>Enable &quot;Third-party integrations&quot; above to toggle individual services</p>}
        </div>
      </SectionCard>

      <SectionCard title="API Rate Limit" subtitle="Maximum API requests per minute" theme={theme}>
        <div className="flex items-center gap-3">
          <InputField value={apiRateLimit} onChange={setApiRateLimit} theme={theme} type="number" placeholder="Requests per minute" />
          <span className={`text-xs ${theme.iconColor} whitespace-nowrap`}>req/min</span>
        </div>
      </SectionCard>

      {/* ─── NEW: Extended Integrations ─────────────────────── */}
      <SectionCard title="Extended Integrations" subtitle="Communication, conferencing, government portals, and LMS connections" theme={theme}>
        <div className="grid grid-cols-2 gap-4">
          {/* Left Column: Communication & Conferencing */}
          <div className="space-y-3">
            <p className={`text-[10px] font-bold ${theme.iconColor} uppercase tracking-wider flex items-center gap-1.5`}><Video size={12} /> Communication & Conferencing</p>

            {/* Video Conferencing */}
            <div className={`p-3 rounded-xl ${theme.secondaryBg} space-y-2`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Video size={14} className={theme.iconColor} />
                  <span className={`text-xs font-bold ${theme.highlight}`}>Video Conferencing</span>
                </div>
                <SSAToggle on={videoConferencing} onChange={() => setVideoConferencing(!videoConferencing)} theme={theme} />
              </div>
              {videoConferencing && (
                <div className="space-y-2 pl-6">
                  <div>
                    <p className={`text-[10px] ${theme.iconColor} mb-1`}>Provider</p>
                    <SelectField options={['Zoom', 'Google Meet', 'Microsoft Teams', 'Jitsi']} value={videoProvider} onChange={setVideoProvider} theme={theme} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] ${theme.iconColor}`}>Auto-schedule for PTM</span>
                    <SSAToggle on={autoSchedulePTM} onChange={() => setAutoSchedulePTM(!autoSchedulePTM)} theme={theme} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] ${theme.iconColor}`}>Enable recording</span>
                    <SSAToggle on={recordingEnabled} onChange={() => setRecordingEnabled(!recordingEnabled)} theme={theme} />
                  </div>
                </div>
              )}
            </div>

            {/* Social Media */}
            <div className={`p-3 rounded-xl ${theme.secondaryBg} space-y-2`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Share2 size={14} className={theme.iconColor} />
                  <span className={`text-xs font-bold ${theme.highlight}`}>Social Media</span>
                </div>
                <SSAToggle on={socialMedia} onChange={() => setSocialMedia(!socialMedia)} theme={theme} />
              </div>
              {socialMedia && (
                <div className="space-y-1.5 pl-6">
                  {Object.entries(socialChannels).map(([channel, enabled]) => (
                    <div key={channel} className="flex items-center justify-between">
                      <span className={`text-[10px] ${theme.iconColor}`}>{channel}</span>
                      <SSAToggle on={enabled} onChange={() => setSocialChannels(p => ({ ...p, [channel]: !p[channel] }))} theme={theme} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Government & Compliance */}
          <div className="space-y-3">
            <p className={`text-[10px] font-bold ${theme.iconColor} uppercase tracking-wider flex items-center gap-1.5`}><Landmark size={12} /> Government & Compliance</p>

            {/* Government Portal */}
            <div className={`p-3 rounded-xl ${theme.secondaryBg} space-y-2`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Landmark size={14} className={theme.iconColor} />
                  <span className={`text-xs font-bold ${theme.highlight}`}>Government Portal</span>
                </div>
                <SSAToggle on={govPortal} onChange={() => setGovPortal(!govPortal)} theme={theme} />
              </div>
              {govPortal && (
                <div className="space-y-1.5 pl-6">
                  {Object.entries(govIntegrations).map(([portal, enabled]) => (
                    <div key={portal} className="flex items-center justify-between">
                      <span className={`text-[10px] ${theme.iconColor}`}>{portal}</span>
                      <SSAToggle on={enabled} onChange={() => setGovIntegrations(p => ({ ...p, [portal]: !p[portal] }))} theme={theme} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Payment Gateway - Status badge */}
            <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard size={14} className={theme.iconColor} />
                  <span className={`text-xs font-bold ${theme.highlight}`}>Payment Gateway</span>
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded-lg font-bold bg-emerald-100 text-emerald-700">Configured in Payment module</span>
              </div>
              <p className={`text-[10px] ${theme.iconColor} mt-1 pl-6`}>Razorpay / PayU / CCAvenue / Cashfree</p>
            </div>

            {/* LMS Integration */}
            <div className={`p-3 rounded-xl ${theme.secondaryBg} space-y-2`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen size={14} className={theme.iconColor} />
                  <span className={`text-xs font-bold ${theme.highlight}`}>LMS Integration</span>
                </div>
                <SSAToggle on={lmsIntegration} onChange={() => setLmsIntegration(!lmsIntegration)} theme={theme} />
              </div>
              {lmsIntegration && (
                <div className="pl-6">
                  <p className={`text-[10px] ${theme.iconColor} mb-1`}>Provider</p>
                  <SelectField options={['Google Classroom', 'Moodle', 'Custom LMS']} value={lmsProvider} onChange={setLmsProvider} theme={theme} />
                </div>
              )}
            </div>

            {/* Accounting Software (extended) */}
            <div className={`p-3 rounded-xl ${theme.secondaryBg} space-y-2`}>
              <div className="flex items-center gap-2">
                <Calculator size={14} className={theme.iconColor} />
                <span className={`text-xs font-bold ${theme.highlight}`}>Accounting Software</span>
              </div>
              <div className="pl-6">
                <SelectField options={['Tally', 'Zoho Books', 'QuickBooks']} value={accountingSoftware} onChange={setAccountingSoftware} theme={theme} />
                <p className={`text-[10px] ${theme.iconColor} mt-1`}>Sync fee collection and payroll data to {accountingSoftware}</p>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ─── NEW: API Marketplace & Webhooks ────────────────── */}
      <SectionCard title="API Marketplace & Webhooks" subtitle="Manage third-party API connections, webhook events, and API keys" theme={theme}>
        <div className="space-y-4">
          {/* API Marketplace Toggle */}
          <div className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex items-center gap-2">
              <Globe size={14} className={theme.iconColor} />
              <div>
                <span className={`text-xs font-bold ${theme.highlight}`}>Third-party API Marketplace</span>
                <p className={`text-[10px] ${theme.iconColor}`}>Allow schools to discover and connect pre-approved integrations</p>
              </div>
            </div>
            <SSAToggle on={apiMarketplace} onChange={() => setApiMarketplace(!apiMarketplace)} theme={theme} />
          </div>

          {/* Webhook Configuration Table */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className={`text-[10px] font-bold ${theme.iconColor} uppercase tracking-wider flex items-center gap-1.5`}><Webhook size={12} /> Webhook Configuration</p>
              <button className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-bold text-white ${theme.primary} hover:opacity-90 transition-all`}>
                <Plus size={10} /> Add Webhook
              </button>
            </div>
            <div className={`rounded-xl border ${theme.border} overflow-hidden`}>
              <table className="w-full text-xs">
                <thead className={theme.secondaryBg}>
                  <tr>
                    {['Event', 'URL', 'Secret Key', 'Status', 'Last Triggered'].map(h => (
                      <th key={h} className={`text-left px-4 py-2.5 font-bold ${theme.iconColor} text-[10px] uppercase`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {webhookEntries.map((w, i) => (
                    <tr key={i} className={`border-t ${theme.border}`}>
                      <td className={`px-4 py-2.5 font-bold ${theme.highlight}`}>{w.event}</td>
                      <td className={`px-4 py-2.5 ${theme.iconColor} text-[10px] font-mono`}>{w.url}</td>
                      <td className={`px-4 py-2.5 ${theme.iconColor} text-[10px] font-mono`}>{w.secret}</td>
                      <td className="px-4 py-2.5">
                        <span className={`text-[9px] px-2 py-0.5 rounded-lg font-bold ${w.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{w.status}</span>
                      </td>
                      <td className={`px-4 py-2.5 ${theme.iconColor} text-[10px]`}>{w.lastTriggered}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* API Key Management */}
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} uppercase tracking-wider flex items-center gap-1.5 mb-2`}><Key size={12} /> API Key Management</p>
            <div className={`p-4 rounded-xl ${theme.secondaryBg} space-y-3`}>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className={`text-[10px] ${theme.iconColor} mb-1`}>Current API Key</p>
                  <div className="flex items-center gap-2">
                    <code className={`flex-1 text-[10px] font-mono px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} ${theme.highlight}`}>
                      sk_live_****************************a4f7
                    </code>
                    <button
                      onClick={() => { setApiKeyCopied(true); setTimeout(() => setApiKeyCopied(false), 2000); }}
                      className={`p-2 rounded-xl border ${theme.border} ${theme.buttonHover} transition-all`}
                      title="Copy to clipboard"
                    >
                      <Copy size={12} className={apiKeyCopied ? 'text-emerald-500' : theme.iconColor} />
                    </button>
                  </div>
                  {apiKeyCopied && <p className="text-[9px] text-emerald-600 font-bold mt-1">Copied to clipboard!</p>}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className={`text-[10px] ${theme.iconColor} mb-1`}>Created</p>
                    <p className={`text-xs font-bold ${theme.highlight}`}>15 Jan 2026</p>
                  </div>
                  <div>
                    <p className={`text-[10px] ${theme.iconColor} mb-1`}>Expires</p>
                    <p className={`text-xs font-bold ${theme.highlight}`}>15 Jan 2027</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className={`px-4 py-2 rounded-xl text-[10px] font-bold text-white ${theme.primary} hover:opacity-90 transition-all`}>
                  Generate New Key
                </button>
                <button className={`px-4 py-2 rounded-xl text-[10px] font-bold border ${theme.border} ${theme.highlight} ${theme.buttonHover} transition-all`}>
                  Regenerate Key
                </button>
              </div>
            </div>
          </div>

          {/* API Documentation Link */}
          <div className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex items-center gap-2">
              <FileText size={14} className={theme.iconColor} />
              <div>
                <span className={`text-xs font-bold ${theme.highlight}`}>API Documentation Link</span>
                <p className={`text-[10px] ${theme.iconColor}`}>Show API documentation link to school admins</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {apiDocLink && (
                <a href="#" className={`text-[10px] font-bold ${theme.iconColor} hover:underline flex items-center gap-1`}>
                  <ExternalLink size={10} /> View Docs
                </a>
              )}
              <SSAToggle on={apiDocLink} onChange={() => setApiDocLink(!apiDocLink)} theme={theme} />
            </div>
          </div>
        </div>
      </SectionCard>

    </div>
  );
}
