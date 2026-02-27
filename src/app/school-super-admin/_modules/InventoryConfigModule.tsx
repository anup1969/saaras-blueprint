'use client';

import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

export default function InventoryConfigModule({ theme }: { theme: Theme }) {
  const [lowStockThreshold, setLowStockThreshold] = useState('10');
  const [invToggles, setInvToggles] = useState<Record<string, boolean>>({
    'Barcode/QR Asset Tagging': true, 'Low Stock Alerts': true,
    'Depreciation Tracking': false,
  });
  const [assetCategories, setAssetCategories] = useState(['Furniture', 'Electronics', 'Lab Equipment', 'Sports', 'Books', 'Vehicles']);
  const [newAssetCat, setNewAssetCat] = useState('');
  const [autoApproveThreshold, setAutoApproveThreshold] = useState('5000');

  return (
    <div className="space-y-4">
      <ModuleHeader title="Inventory & Asset Configuration" subtitle="Asset tagging, stock alerts, purchase workflows, and depreciation" theme={theme} />
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Inventory Features" subtitle="Asset tracking, stock alerts, and depreciation management" theme={theme}>
          <div className="space-y-2">
            {Object.entries(invToggles).map(([feat, enabled]) => (
              <div key={feat} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{feat}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Barcode/QR Asset Tagging': 'Each asset gets a unique barcode/QR label — scan to view details, location, and condition',
                      'Low Stock Alerts': 'Auto-alert admin when consumable items (stationery, lab supplies) fall below threshold',
                      'Depreciation Tracking': 'Automatically calculate asset depreciation over time for accounting and budgeting',
                    } as Record<string, string>)[feat]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setInvToggles(p => ({ ...p, [feat]: !p[feat] }))} theme={theme} />
              </div>
            ))}
            <div className="pt-1">
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Low Stock Alert Threshold</p>
              <InputField value={lowStockThreshold} onChange={setLowStockThreshold} theme={theme} type="number" />
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Asset Categories" subtitle="Add or remove inventory categories" theme={theme}>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {assetCategories.map(c => (
              <span key={c} className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${theme.secondaryBg} text-xs font-medium ${theme.highlight}`}>
                {c}
                <button onClick={() => setAssetCategories(p => p.filter(x => x !== c))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={newAssetCat} onChange={e => setNewAssetCat(e.target.value)} placeholder="Add category..."
              className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
            <button onClick={() => { if (newAssetCat.trim()) { setAssetCategories(p => [...p, newAssetCat.trim()]); setNewAssetCat(''); } }}
              className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={14} /></button>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Purchase Approval Tiers" subtitle="Tiered approval chains based on purchase value" theme={theme}>
        <div className="space-y-3">
          <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight} mb-1`}>Purchase &lt; {'\u20B9'}50,000</p>
            <div className="flex items-center gap-2 flex-wrap">
              {['Admin', 'Principal'].map((step, i) => (
                <React.Fragment key={step}>
                  <span className={`text-[10px] px-2.5 py-1 rounded-lg ${theme.accentBg} ${theme.iconColor} font-bold`}>{step}</span>
                  {i < 1 && <span className={`text-[10px] ${theme.iconColor}`}>{'\u2192'}</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight} mb-1`}>Purchase &gt; {'\u20B9'}50,000</p>
            <div className="flex items-center gap-2 flex-wrap">
              {['Principal', 'Trust / Management'].map((step, i) => (
                <React.Fragment key={step}>
                  <span className={`text-[10px] px-2.5 py-1 rounded-lg ${theme.accentBg} ${theme.iconColor} font-bold`}>{step}</span>
                  {i < 1 && <span className={`text-[10px] ${theme.iconColor}`}>{'\u2192'}</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Auto-Approve Threshold ({'\u20B9'}) — purchases below this are auto-approved</p>
            <InputField value={autoApproveThreshold} onChange={setAutoApproveThreshold} theme={theme} type="number" placeholder="e.g. 5000" />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
