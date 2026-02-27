'use client';
import React, { useState } from 'react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

export default function OnlinePaymentConfigModule({ theme }: { theme: Theme }) {
  const [gateway, setGateway] = useState('Razorpay');
  const [refundPolicy, setRefundPolicy] = useState('Manual');
  const [convenienceFeeAmt, setConvenienceFeeAmt] = useState('0');
  const [payToggles, setPayToggles] = useState<Record<string, boolean>>({
    'Auto-receipt Generation': true, 'Partial Payment Allowed': false,
    'Convenience Fee': false,
  });

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
    </div>
  );
}
