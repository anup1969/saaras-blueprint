'use client';
import React, { useState } from 'react';
import { SSAToggle, SectionCard, ModuleHeader, InputField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

export default function APIIntegrationConfigModule({ theme }: { theme: Theme }) {
  const [thirdParty, setThirdParty] = useState(false);
  const [webhookNotifications, setWebhookNotifications] = useState(false);
  const [apiRateLimit, setApiRateLimit] = useState('1000');
  const [integrations, setIntegrations] = useState<Record<string, boolean>>({
    'Tally (Accounting)': false, 'WhatsApp Business': false, 'SMS Gateway': false,
    'Google Workspace': false, 'Microsoft 365': false,
  });

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

    </div>
  );
}
