'use client';

import { Toggle } from '@/components/shared';
import { type Theme } from '@/lib/themes';

export default function SystemConfigView({ theme }: { theme: Theme }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className={`text-lg font-bold ${theme.highlight}`}>System Configuration</h2>
        <p className={`text-xs ${theme.iconColor}`}>Platform-wide settings and preferences</p>
      </div>

      {/* Config Sections */}
      {[
        { title: 'General', items: [
          { label: 'Platform Name', value: 'Saaras.ai', type: 'text' },
          { label: 'Support Email', value: 'support@saaras.ai', type: 'text' },
          { label: 'Default Timezone', value: 'Asia/Kolkata (IST)', type: 'text' },
          { label: 'Maintenance Mode', value: false, type: 'toggle' },
        ]},
        { title: 'Security', items: [
          { label: 'Two-Factor Authentication', value: true, type: 'toggle' },
          { label: 'Session Timeout', value: '30 minutes', type: 'text' },
          { label: 'Password Policy', value: 'Strong (8+ chars, mixed)', type: 'text' },
          { label: 'IP Whitelisting', value: false, type: 'toggle' },
        ]},
        { title: 'Notifications', items: [
          { label: 'Email Notifications', value: true, type: 'toggle' },
          { label: 'SMS Gateway', value: 'MSG91', type: 'text' },
          { label: 'WhatsApp Business API', value: true, type: 'toggle' },
          { label: 'Push Notifications', value: true, type: 'toggle' },
        ]},
        { title: 'Integrations', items: [
          { label: 'Payment Gateway', value: 'Razorpay', type: 'text' },
          { label: 'SMS Provider', value: 'MSG91', type: 'text' },
          { label: 'Cloud Storage', value: 'AWS S3', type: 'text' },
          { label: 'Email Service', value: 'Amazon SES', type: 'text' },
        ]},
      ].map(section => (
        <div key={section.title} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>{section.title}</h3>
          <div className="space-y-3">
            {section.items.map(item => (
              <div key={item.label} className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
                <span className={`text-xs font-medium ${theme.highlight}`}>{item.label}</span>
                {item.type === 'toggle' ? (
                  <Toggle on={item.value as boolean} onChange={() => {}} theme={theme} />
                ) : (
                  <span className={`text-xs ${theme.iconColor}`}>{item.value as string}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
