'use client';
import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

function InfoIcon({ tip }: { tip: string }) {
  return <span title={tip} className="inline-flex ml-1.5 shrink-0 cursor-help"><Info size={13} className="text-blue-400 hover:text-blue-600" /></span>;
}
function MobileBadge() {
  return <span className="ml-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-green-100 text-green-700 whitespace-nowrap">{'\uD83D\uDCF1'} Mobile</span>;
}

export default function OnlinePaymentConfigModule({ theme }: { theme: Theme }) {
  const [gateway, setGateway] = useState('Razorpay');
  const [refundPolicy, setRefundPolicy] = useState('Manual');
  const [convenienceFeeAmt, setConvenienceFeeAmt] = useState('0');
  const [payToggles, setPayToggles] = useState<Record<string, boolean>>({
    'Auto-receipt Generation': true, 'Partial Payment Allowed': false,
    'Convenience Fee': false,
  });

  // --- NEW STATE ---
  // Payment Links
  const [payLinkPerStudent, setPayLinkPerStudent] = useState(true);
  const [payLinkExpiry, setPayLinkExpiry] = useState('7');
  const [payLinkAutoSend, setPayLinkAutoSend] = useState(true);
  // Dynamic QR
  const [qrPerStudent, setQrPerStudent] = useState(false);
  const [qrCounter, setQrCounter] = useState(true);
  const [qrOnReceipt, setQrOnReceipt] = useState(false);
  // Payment Retry
  const [autoRetry, setAutoRetry] = useState(false);
  const [retryMinutes, setRetryMinutes] = useState('30');
  const [maxRetries, setMaxRetries] = useState('3');
  const [failedNotify, setFailedNotify] = useState(true);
  // International
  const [nriEnabled, setNriEnabled] = useState(false);
  const [currencies, setCurrencies] = useState<Record<string, boolean>>({ USD: true, GBP: true, EUR: false, AED: true, SGD: false });
  const [currencyConversion, setCurrencyConversion] = useState('Live rate');
  // Multi-Gateway Failover
  const [failoverEnabled, setFailoverEnabled] = useState(false);
  const [fallbackGateway, setFallbackGateway] = useState('PayU');
  const [switchThreshold, setSwitchThreshold] = useState('3');
  // Gateway Audit Trail
  const [auditConfigChanges, setAuditConfigChanges] = useState(true);
  const [auditRefundDecisions, setAuditRefundDecisions] = useState(true);
  // Transaction Reports
  const [txnSuccessRate, setTxnSuccessRate] = useState(true);
  const [txnReconciliation, setTxnReconciliation] = useState(false);
  const [txnBankDeposit, setTxnBankDeposit] = useState(false);

  return (
    <div className="space-y-4">
      <ModuleHeader title="Online Payment Configuration" subtitle="Payment gateway, receipts, partial payments, and refund policy" theme={theme} />
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Gateway & Policy" subtitle="Payment provider and refund settings" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Payment Gateway</p>
              <SelectField options={['Razorpay', 'PayU', 'CCAvenue', 'Cashfree']} value={gateway} onChange={setGateway} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Refund Policy</p>
              <SelectField options={['Manual', 'Auto']} value={refundPolicy} onChange={setRefundPolicy} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Convenience Fee Amount ({'\u20B9'})</p>
              <InputField value={convenienceFeeAmt} onChange={setConvenienceFeeAmt} theme={theme} type="number" />
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Payment Features" subtitle="Receipt generation, partial payments, and convenience fees" theme={theme}>
          <div className="space-y-2">
            {Object.entries(payToggles).map(([feat, enabled]) => (
              <div key={feat} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{feat}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Auto-receipt Generation': 'System automatically generates a payment receipt and sends it to parents after successful payment',
                      'Partial Payment Allowed': 'Parents can pay a portion of the total fee instead of the full amount at once',
                      'Convenience Fee': 'Add a small processing fee on online payments to cover payment gateway charges',
                    } as Record<string, string>)[feat]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setPayToggles(p => ({ ...p, [feat]: !p[feat] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          NEW SECTIONS
          ═══════════════════════════════════════════════════════════════ */}

      <SectionCard title="Payment Links" subtitle="Unique payment link per student per invoice" theme={theme}>
        <div className="flex items-center mb-3">
          <p className={`text-[10px] font-bold ${theme.iconColor}`}>Generate and send payment links to parents</p>
          <InfoIcon tip="Unique payment link per student per invoice" />
        </div>
        <div className="space-y-2">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Generate per-student payment link</p>
            <SSAToggle on={payLinkPerStudent} onChange={() => setPayLinkPerStudent(!payLinkPerStudent)} theme={theme} />
          </div>
          {payLinkPerStudent && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Link expiry (days)</p>
                  <InputField value={payLinkExpiry} onChange={setPayLinkExpiry} theme={theme} type="number" />
                </div>
              </div>
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex items-center">
                  <p className={`text-xs font-bold ${theme.highlight}`}>Auto-send via SMS/WhatsApp</p>
                  <MobileBadge />
                </div>
                <SSAToggle on={payLinkAutoSend} onChange={() => setPayLinkAutoSend(!payLinkAutoSend)} theme={theme} />
              </div>
            </>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Dynamic QR Codes" subtitle="Generate student-specific UPI QR codes for instant payment" theme={theme}>
        <div className="flex items-center mb-3">
          <p className={`text-[10px] font-bold ${theme.iconColor}`}>Configure UPI QR code generation</p>
          <InfoIcon tip="Generate student-specific UPI QR codes for instant payment" />
        </div>
        <div className="space-y-2">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>UPI QR per student</p>
            <SSAToggle on={qrPerStudent} onChange={() => setQrPerStudent(!qrPerStudent)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Counter QR for walk-in</p>
            <SSAToggle on={qrCounter} onChange={() => setQrCounter(!qrCounter)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>QR on fee receipt</p>
            <SSAToggle on={qrOnReceipt} onChange={() => setQrOnReceipt(!qrOnReceipt)} theme={theme} />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Payment Retry & Recovery" subtitle="Auto-retry failed transactions and notify parents" theme={theme}>
        <div className="flex items-center mb-3">
          <p className={`text-[10px] font-bold ${theme.iconColor}`}>Handle failed payment transactions</p>
          <InfoIcon tip="Automatically retry failed payments and alert parents" />
        </div>
        <div className="space-y-2">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Auto-retry failed transactions</p>
            <SSAToggle on={autoRetry} onChange={() => setAutoRetry(!autoRetry)} theme={theme} />
          </div>
          {autoRetry && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Retry after (minutes)</p>
                <InputField value={retryMinutes} onChange={setRetryMinutes} theme={theme} type="number" />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max retries</p>
                <InputField value={maxRetries} onChange={setMaxRetries} theme={theme} type="number" />
              </div>
            </div>
          )}
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex items-center">
              <p className={`text-xs font-bold ${theme.highlight}`}>Failed payment notification</p>
              <MobileBadge />
            </div>
            <SSAToggle on={failedNotify} onChange={() => setFailedNotify(!failedNotify)} theme={theme} />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="International Payments" subtitle="Support NRI parent payments in foreign currencies" theme={theme}>
        <div className="flex items-center mb-3">
          <p className={`text-[10px] font-bold ${theme.iconColor}`}>Enable cross-border fee payments</p>
          <InfoIcon tip="Allow NRI parents to pay fees in their local currency" />
        </div>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Enable NRI parent payments</p>
            <SSAToggle on={nriEnabled} onChange={() => setNriEnabled(!nriEnabled)} theme={theme} />
          </div>
          {nriEnabled && (
            <>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Supported Currencies</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(currencies).map(([cur, on]) => (
                    <label key={cur} className={`flex items-center gap-2 p-2 rounded-lg ${theme.secondaryBg} cursor-pointer`}>
                      <input type="checkbox" checked={on} onChange={() => setCurrencies(p => ({ ...p, [cur]: !p[cur] }))} className="accent-emerald-500 w-3.5 h-3.5" />
                      <span className={`text-[10px] font-medium ${theme.highlight}`}>{cur}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Currency Conversion</p>
                <SelectField options={['Live rate', 'Fixed rate']} value={currencyConversion} onChange={setCurrencyConversion} theme={theme} />
              </div>
            </>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Multi-Gateway Failover" subtitle="Automatic gateway switching on consecutive failures" theme={theme}>
        <div className="flex items-center mb-3">
          <p className={`text-[10px] font-bold ${theme.iconColor}`}>Route payments to backup gateway on failure</p>
          <InfoIcon tip="Automatically switch to fallback gateway after consecutive failures" />
        </div>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Enable failover routing</p>
            <SSAToggle on={failoverEnabled} onChange={() => setFailoverEnabled(!failoverEnabled)} theme={theme} />
          </div>
          {failoverEnabled && (
            <>
              <div className={`p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Primary Gateway</p>
                <p className={`text-xs font-bold ${theme.highlight}`}>{gateway}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Fallback Gateway</p>
                  <SelectField options={['PayU', 'CCAvenue', 'Cashfree']} value={fallbackGateway} onChange={setFallbackGateway} theme={theme} />
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Switch threshold (consecutive failures)</p>
                  <InputField value={switchThreshold} onChange={setSwitchThreshold} theme={theme} type="number" />
                </div>
              </div>
            </>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Gateway Audit Trail" subtitle="Track who changed payment gateway settings" theme={theme}>
        <div className="flex items-center mb-3">
          <p className={`text-[10px] font-bold ${theme.iconColor}`}>Log all gateway configuration changes</p>
          <InfoIcon tip="Track who changed payment gateway settings" />
        </div>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Log all config changes</p>
            <SSAToggle on={auditConfigChanges} onChange={() => setAuditConfigChanges(!auditConfigChanges)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Log refund decisions</p>
            <SSAToggle on={auditRefundDecisions} onChange={() => setAuditRefundDecisions(!auditRefundDecisions)} theme={theme} />
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Recent Changes</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead><tr className={theme.secondaryBg}>
                  {['Date', 'Change', 'By', 'IP'].map(h => (
                    <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {[
                    { date: '28 Feb 2026', change: 'Gateway changed to Razorpay', by: 'Admin (Piush)', ip: '192.168.1.10' },
                    { date: '25 Feb 2026', change: 'Convenience fee updated to 0%', by: 'Admin (Piush)', ip: '192.168.1.10' },
                    { date: '20 Feb 2026', change: 'Refund policy set to Manual', by: 'Accounts (Meera)', ip: '192.168.1.15' },
                  ].map((entry, i) => (
                    <tr key={i} className={`border-t ${theme.border}`}>
                      <td className={`px-2 py-1.5 ${theme.iconColor}`}>{entry.date}</td>
                      <td className={`px-2 py-1.5 font-bold ${theme.highlight}`}>{entry.change}</td>
                      <td className={`px-2 py-1.5 ${theme.iconColor}`}>{entry.by}</td>
                      <td className={`px-2 py-1.5 ${theme.iconColor} font-mono text-[10px]`}>{entry.ip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Transaction Reports" subtitle="Dashboard-level reporting for payment transactions" theme={theme}>
        <div className="flex items-center mb-3">
          <p className={`text-[10px] font-bold ${theme.iconColor}`}>Enable transaction analytics and reconciliation</p>
          <InfoIcon tip="Monitor payment success rates, settlement reconciliation, and bank deposits" />
        </div>
        <div className="space-y-2">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Success/Failure rate dashboard</p>
            <SSAToggle on={txnSuccessRate} onChange={() => setTxnSuccessRate(!txnSuccessRate)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Settlement reconciliation</p>
            <SSAToggle on={txnReconciliation} onChange={() => setTxnReconciliation(!txnReconciliation)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Bank deposit tracking</p>
            <SSAToggle on={txnBankDeposit} onChange={() => setTxnBankDeposit(!txnBankDeposit)} theme={theme} />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
