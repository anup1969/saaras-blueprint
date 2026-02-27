'use client';
import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

export default function LibraryConfigModule({ theme }: { theme: Theme }) {
  const [maxBooks, setMaxBooks] = useState('2');
  const [loanPeriod, setLoanPeriod] = useState('14');
  const [finePerDay, setFinePerDay] = useState('2');
  const [libToggles, setLibToggles] = useState<Record<string, boolean>>({
    'Digital Library (eBooks)': false, 'Barcode/QR Scanning': true,
  });
  const [categories, setCategories] = useState(['Textbook', 'Reference', 'Fiction', 'Non-fiction', 'Periodical']);
  const [newCategory, setNewCategory] = useState('');

  return (
    <div className="space-y-4">
      <ModuleHeader title="Library Configuration" subtitle="Book limits, loan rules, fines, and digital library settings" theme={theme} />
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Loan Rules" subtitle="Limits and durations for book lending" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max Books per Student</p>
              <InputField value={maxBooks} onChange={setMaxBooks} theme={theme} type="number" />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Loan Period (days)</p>
              <InputField value={loanPeriod} onChange={setLoanPeriod} theme={theme} type="number" />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Fine per Day ({'\u20B9'})</p>
              <InputField value={finePerDay} onChange={setFinePerDay} theme={theme} type="number" />
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Library Features" subtitle="Toggle digital library and scanning" theme={theme}>
          <div className="space-y-2">
            {Object.entries(libToggles).map(([feat, enabled]) => (
              <div key={feat} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{feat}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Digital Library (eBooks)': 'Enable digital eBook library — students can read books online without physical copies',
                      'Barcode/QR Scanning': 'Use barcode or QR code scanner for quick book issue/return at the library counter',
                    } as Record<string, string>)[feat]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setLibToggles(p => ({ ...p, [feat]: !p[feat] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
      <SectionCard title="Book Categories" subtitle="Add or remove catalogue categories" theme={theme}>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {categories.map(c => (
            <span key={c} className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${theme.secondaryBg} text-xs font-medium ${theme.highlight}`}>
              {c}
              <button onClick={() => setCategories(p => p.filter(x => x !== c))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input value={newCategory} onChange={e => setNewCategory(e.target.value)} placeholder="Add category..."
            className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
          <button onClick={() => { if (newCategory.trim()) { setCategories(p => [...p, newCategory.trim()]); setNewCategory(''); } }}
            className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={14} /></button>
        </div>
      </SectionCard>
    </div>
  );
}
