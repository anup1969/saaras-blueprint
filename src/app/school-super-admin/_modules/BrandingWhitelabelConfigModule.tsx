'use client';
import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

export default function BrandingWhitelabelConfigModule({ theme }: { theme: Theme }) {
  const [customDomain, setCustomDomain] = useState(false);
  const [domainValue, setDomainValue] = useState('');
  const [whitelabelApp, setWhitelabelApp] = useState(false);
  const [customEmailTemplates, setCustomEmailTemplates] = useState(true);
  const [loginPageCustomization, setLoginPageCustomization] = useState(true);
  const [primaryColor, setPrimaryColor] = useState('#4F46E5');
  const [logoUploaded] = useState(false);

  return (
    <div className="space-y-4">
      <ModuleHeader title="Branding & White-label Configuration" subtitle="Custom domain, branding, logo, and white-label settings" theme={theme} />

      <SectionCard title="Custom Domain" subtitle="Use your own domain for the school portal" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Enable custom domain</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Use your own domain (e.g., portal.yourschool.edu.in) instead of the default Saaras URL</p>
            </div>
            <SSAToggle on={customDomain} onChange={() => setCustomDomain(!customDomain)} theme={theme} />
          </div>
          {customDomain && (
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Domain Name</p>
              <InputField value={domainValue} onChange={setDomainValue} theme={theme} placeholder="e.g. portal.yourschool.edu.in" />
              <p className={`text-[10px] ${theme.iconColor} mt-1`}>Point your CNAME record to saaras-portal.app</p>
            </div>
          )}
        </div>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="White-label &amp; Templates" subtitle="Customize appearance and communication templates" theme={theme}>
          <div className="space-y-2">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>White-label mobile app</p>
                <p className={`text-[10px] ${theme.iconColor}`}>School-branded mobile app with your logo, name, and colors — no Saaras branding visible</p>
              </div>
              <SSAToggle on={whitelabelApp} onChange={() => setWhitelabelApp(!whitelabelApp)} theme={theme} />
            </div>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>Custom email templates</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Customize the email templates sent for fee reminders, reports, and notifications</p>
              </div>
              <SSAToggle on={customEmailTemplates} onChange={() => setCustomEmailTemplates(!customEmailTemplates)} theme={theme} />
            </div>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>Login page customization</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Customize the school portal login page with your logo, background, and welcome message</p>
              </div>
              <SSAToggle on={loginPageCustomization} onChange={() => setLoginPageCustomization(!loginPageCustomization)} theme={theme} />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Visual Identity" subtitle="Logo and primary color" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>School Logo</p>
              <div className={`w-full border-2 border-dashed ${theme.border} rounded-xl p-4 text-center cursor-pointer ${theme.buttonHover} transition-all`}>
                <Upload size={20} className={`mx-auto mb-1 ${theme.iconColor}`} />
                <p className={`text-[10px] ${theme.iconColor}`}>{logoUploaded ? 'Logo uploaded - click to replace' : 'Click to upload logo (PNG/SVG, max 2MB)'}</p>
              </div>
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Primary Brand Color</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg border border-slate-300" style={{ backgroundColor: primaryColor }} />
                <InputField value={primaryColor} onChange={setPrimaryColor} theme={theme} placeholder="#4F46E5" />
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

    </div>
  );
}
