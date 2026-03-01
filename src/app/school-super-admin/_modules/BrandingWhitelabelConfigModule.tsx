'use client';
import React, { useState } from 'react';
import { Upload, Globe, ShieldCheck, CheckCircle, AlertTriangle, Clock, Mail } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

export default function BrandingWhitelabelConfigModule({ theme }: { theme: Theme }) {
  const [customDomain, setCustomDomain] = useState(false);
  const [domainValue, setDomainValue] = useState('');
  const [whitelabelApp, setWhitelabelApp] = useState(false);
  const [customEmailTemplates, setCustomEmailTemplates] = useState(true);
  const [loginPageCustomization, setLoginPageCustomization] = useState(true);
  const [primaryColor, setPrimaryColor] = useState('#4F46E5');
  const [logoUploaded] = useState(false);

  // Custom Domain Setup (Gap Feature)
  const [setupDomainName, setSetupDomainName] = useState('erp.myschool.edu');
  const [sslCertMode, setSslCertMode] = useState('Auto-provision (Let\u2019s Encrypt)');
  const [sslStatus, setSslStatus] = useState<'valid' | 'pending' | 'expired'>('pending');
  const [dnsVerified, setDnsVerified] = useState(false);
  const [dnsVerifying, setDnsVerifying] = useState(false);
  const [customEmailDomain, setCustomEmailDomain] = useState(false);

  const verifyDns = () => {
    setDnsVerifying(true);
    setTimeout(() => {
      setDnsVerifying(false);
      setDnsVerified(true);
      setSslStatus('valid');
    }, 2000);
  };

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

      {/* ─── Custom Domain Setup (Gap Feature) ─── */}
      <SectionCard title="Custom Domain Setup" subtitle="Configure your own domain with DNS verification, SSL, and custom email" theme={theme}>
        <div className="space-y-4">
          {/* Domain Name Input */}
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}><Globe size={10} className="inline mr-1" />Domain Name</p>
            <InputField value={setupDomainName} onChange={setSetupDomainName} theme={theme} placeholder="e.g., erp.myschool.edu" />
          </div>

          {/* DNS Configuration Instructions */}
          <div className={`p-3 rounded-xl ${theme.secondaryBg} space-y-2`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>DNS Configuration</p>
            <p className={`text-[10px] ${theme.iconColor} mb-2`}>Add the following records to your domain DNS settings:</p>
            <div className="space-y-1.5">
              <div className={`p-2 rounded-lg border ${theme.border} bg-white/50`}>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-bold">CNAME</span>
                  <code className={`text-[10px] font-mono ${theme.highlight}`}>{setupDomainName || 'erp.myschool.edu'} &rarr; schools.saaras.app</code>
                </div>
              </div>
              <div className={`p-2 rounded-lg border ${theme.border} bg-white/50`}>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 font-bold">A</span>
                  <code className={`text-[10px] font-mono ${theme.highlight}`}>76.76.21.21 <span className={`${theme.iconColor}`}>(if CNAME not supported)</span></code>
                </div>
              </div>
              <div className={`p-2 rounded-lg border ${theme.border} bg-white/50`}>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 font-bold">TXT</span>
                  <code className={`text-[10px] font-mono ${theme.highlight}`}>saaras-verify=abc123xyz</code>
                </div>
              </div>
            </div>
          </div>

          {/* SSL Certificate */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}><ShieldCheck size={10} className="inline mr-1" />SSL Certificate</p>
              <SelectField options={["Auto-provision (Let\u2019s Encrypt)", 'Upload custom certificate']} value={sslCertMode} onChange={setSslCertMode} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>SSL Status</p>
              <div className={`flex items-center gap-2 p-2 rounded-xl ${theme.secondaryBg}`}>
                {sslStatus === 'valid' && <><CheckCircle size={14} className="text-emerald-500" /><span className="text-xs font-bold text-emerald-600">Valid</span></>}
                {sslStatus === 'pending' && <><Clock size={14} className="text-amber-500" /><span className="text-xs font-bold text-amber-600">Pending</span></>}
                {sslStatus === 'expired' && <><AlertTriangle size={14} className="text-red-500" /><span className="text-xs font-bold text-red-600">Expired</span></>}
              </div>
            </div>
          </div>

          {/* Verify DNS Button */}
          <div className="flex items-center gap-3">
            <button onClick={verifyDns} disabled={dnsVerifying}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white ${theme.primary} hover:opacity-90 transition-all disabled:opacity-50`}>
              {dnsVerifying ? (
                <><Clock size={14} className="animate-spin" /> Verifying DNS...</>
              ) : (
                <><Globe size={14} /> Verify DNS</>
              )}
            </button>
            {dnsVerified && (
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                <CheckCircle size={14} /> DNS verified successfully!
              </span>
            )}
          </div>

          {/* Custom Email Domain */}
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}><Mail size={12} className="inline mr-1" />Custom Email Domain</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Send emails from noreply@{setupDomainName || 'myschool.edu'} instead of default Saaras domain</p>
            </div>
            <SSAToggle on={customEmailDomain} onChange={() => setCustomEmailDomain(!customEmailDomain)} theme={theme} />
          </div>

          {/* Email SPF/DKIM Instructions */}
          {customEmailDomain && (
            <div className={`p-3 rounded-xl ${theme.secondaryBg} space-y-2`}>
              <p className={`text-xs font-bold ${theme.highlight}`}>Email SPF/DKIM Setup</p>
              <p className={`text-[10px] ${theme.iconColor} mb-2`}>Add these DNS records for email authentication:</p>
              <div className="space-y-1.5">
                <div className={`p-2 rounded-lg border ${theme.border} bg-white/50`}>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-bold">SPF</span>
                    <code className={`text-[10px] font-mono ${theme.highlight}`}>v=spf1 include:saaras.app ~all</code>
                  </div>
                </div>
                <div className={`p-2 rounded-lg border ${theme.border} bg-white/50`}>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 font-bold">DKIM</span>
                    <code className={`text-[10px] font-mono ${theme.highlight}`}>saaras._domainkey.{setupDomainName || 'myschool.edu'} &rarr; CNAME dkim.saaras.app</code>
                  </div>
                </div>
                <div className={`p-2 rounded-lg border ${theme.border} bg-white/50`}>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-bold">DMARC</span>
                    <code className={`text-[10px] font-mono ${theme.highlight}`}>v=DMARC1; p=quarantine; rua=mailto:dmarc@saaras.app</code>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </SectionCard>
    </div>
  );
}
