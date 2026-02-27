'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { X } from 'lucide-react';
import { SelectField } from '../_components/FormHelpers';

export default function PromotionWizard({ theme, onClose }: { theme: Theme; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [sourceClass, setSourceClass] = useState('');
  const classOptions = ['Nursery', 'LKG', 'UKG', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];
  const nextClassMap: Record<string, string> = { 'Nursery': 'LKG', 'LKG': 'UKG', 'UKG': '1st', '1st': '2nd', '2nd': '3rd', '3rd': '4th', '4th': '5th', '5th': '6th', '6th': '7th', '7th': '8th', '8th': '9th', '9th': '10th', '10th': '11th', '11th': '12th', '12th': 'Passed Out' };
  const classStudentCount: Record<string, number> = { 'Nursery': 30, 'LKG': 35, 'UKG': 32, '1st': 40, '2nd': 38, '3rd': 42, '4th': 40, '5th': 45, '6th': 44, '7th': 42, '8th': 40, '9th': 38, '10th': 36, '11th': 30, '12th': 28 };

  const mockClassStudents = [
    { name: 'Aarav Patel', roll: 1, action: 'Promote' as string },
    { name: 'Priya Sharma', roll: 2, action: 'Promote' as string },
    { name: 'Rohan Gupta', roll: 3, action: 'Promote' as string },
    { name: 'Ananya Desai', roll: 4, action: 'Promote' as string },
    { name: 'Kabir Singh', roll: 5, action: 'Detain' as string },
    { name: 'Meera Nair', roll: 6, action: 'Promote' as string },
    { name: 'Arjun Mehta', roll: 7, action: 'Promote' as string },
    { name: 'Sanya Iyer', roll: 8, action: 'TC Issued' as string },
  ];
  const [students, setStudents] = useState(mockClassStudents);
  const [checked, setChecked] = useState<boolean[]>(mockClassStudents.map(() => true));

  const promoted = students.filter((s, i) => checked[i] && s.action === 'Promote').length;
  const detained = students.filter((s, i) => checked[i] && s.action === 'Detain').length;
  const tcIssued = students.filter((s, i) => checked[i] && s.action === 'TC Issued').length;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} shadow-2xl w-full max-w-xl p-6 space-y-4 max-h-[85vh] overflow-y-auto`} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className={`text-lg font-bold ${theme.highlight}`}>Promote Students — Step {step}/4</h2>
          <button onClick={onClose} className={`p-1.5 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
        </div>

        {/* Progress bar */}
        <div className="flex gap-1">
          {[1,2,3,4].map(s => (
            <div key={s} className={`flex-1 h-1.5 rounded-full ${s <= step ? theme.primary : theme.secondaryBg}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <p className={`text-xs ${theme.iconColor}`}>Select the source class to promote students from:</p>
            <SelectField options={classOptions} value={sourceClass} onChange={setSourceClass} theme={theme} placeholder="Select source class" />
            {sourceClass && (
              <div className={`p-3 rounded-xl ${theme.secondaryBg} flex items-center justify-between`}>
                <span className={`text-xs ${theme.highlight}`}>Students in {sourceClass}</span>
                <span className={`text-sm font-bold ${theme.primaryText}`}>{classStudentCount[sourceClass] || 0}</span>
              </div>
            )}
            <button disabled={!sourceClass} onClick={() => setStep(2)} className={`w-full py-2.5 rounded-xl ${theme.primary} text-white text-sm font-bold disabled:opacity-40`}>Next — Review Students</button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <p className={`text-xs ${theme.iconColor}`}>Review students from <strong>{sourceClass}</strong>. Uncheck to exclude. Set action per student.</p>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {students.map((s, i) => (
                <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <input type="checkbox" checked={checked[i]} onChange={() => { const c = [...checked]; c[i] = !c[i]; setChecked(c); }} className="rounded" />
                  <span className={`text-xs font-bold ${theme.highlight} flex-1`}>#{s.roll} {s.name}</span>
                  <select value={s.action} onChange={e => { const u = [...students]; u[i] = { ...u[i], action: e.target.value }; setStudents(u); }} className={`px-2 py-1 rounded-lg text-[10px] font-bold border ${theme.border} ${theme.inputBg} ${theme.highlight}`}>
                    <option>Promote</option><option>Detain</option><option>TC Issued</option>
                  </select>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setStep(1)} className={`flex-1 py-2 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.highlight}`}>Back</button>
              <button onClick={() => setStep(3)} className={`flex-1 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>Next — Target Class</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <p className={`text-xs ${theme.iconColor}`}>Target class for promoted students:</p>
            <div className={`p-4 rounded-xl ${theme.secondaryBg} space-y-2`}>
              <div className="flex justify-between"><span className={`text-xs ${theme.iconColor}`}>Source Class</span><span className={`text-sm font-bold ${theme.highlight}`}>{sourceClass}</span></div>
              <div className="flex justify-between"><span className={`text-xs ${theme.iconColor}`}>Target Class</span><span className={`text-sm font-bold ${theme.primaryText}`}>{nextClassMap[sourceClass] || 'N/A'}</span></div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setStep(2)} className={`flex-1 py-2 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.highlight}`}>Back</button>
              <button onClick={() => setStep(4)} className={`flex-1 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>Next — Confirm</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <p className={`text-xs ${theme.iconColor}`}>Review and confirm the promotion batch:</p>
            <div className={`p-4 rounded-xl ${theme.secondaryBg} space-y-2`}>
              <div className="flex justify-between"><span className={`text-xs ${theme.iconColor}`}>Promoted</span><span className="text-sm font-bold text-emerald-600">{promoted} students → {nextClassMap[sourceClass]}</span></div>
              <div className="flex justify-between"><span className={`text-xs ${theme.iconColor}`}>Detained</span><span className="text-sm font-bold text-amber-600">{detained} students (remain in {sourceClass})</span></div>
              <div className="flex justify-between"><span className={`text-xs ${theme.iconColor}`}>TC Issued</span><span className="text-sm font-bold text-red-500">{tcIssued} students</span></div>
              <div className={`flex justify-between pt-2 border-t ${theme.border}`}><span className={`text-xs font-bold ${theme.highlight}`}>Total Processed</span><span className={`text-sm font-bold ${theme.highlight}`}>{promoted + detained + tcIssued}</span></div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setStep(3)} className={`flex-1 py-2 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.highlight}`}>Back</button>
              <button onClick={() => { window.alert(`Promotion processed! ${promoted} promoted to ${nextClassMap[sourceClass]}, ${detained} detained, ${tcIssued} TC issued. (Blueprint demo)`); onClose(); }} className={`flex-1 py-2.5 rounded-xl ${theme.primary} text-white text-sm font-bold`}>Process Promotion</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
