'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { X, Settings, Bell, History } from 'lucide-react';
import { SelectField } from '../_components/FormHelpers';

export default function PromotionWizard({ theme, onClose }: { theme: Theme; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [showHistory, setShowHistory] = useState(false);
  const [sourceClass, setSourceClass] = useState('');
  const [promotionMode, setPromotionMode] = useState<'auto' | 'manual' | 'rule-based'>('manual');
  const [minAttendance, setMinAttendance] = useState('75');
  const [minMarks, setMinMarks] = useState('33');
  const [allSubjectsPass, setAllSubjectsPass] = useState(false);
  const [showRulesConfig, setShowRulesConfig] = useState(false);
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
  const [streams, setStreams] = useState<string[]>(mockClassStudents.map(() => 'Not Applicable'));
  const [tcNotifyParent, setTcNotifyParent] = useState(true);
  const [tcParentPhone, setTcParentPhone] = useState('');
  const [tcReceivingSchool, setTcReceivingSchool] = useState('');

  const promoted = students.filter((s, i) => checked[i] && s.action === 'Promote').length;
  const detained = students.filter((s, i) => checked[i] && s.action === 'Detain').length;
  const tcIssued = students.filter((s, i) => checked[i] && s.action === 'TC Issued').length;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} shadow-2xl w-full max-w-xl p-6 space-y-4 max-h-[85vh] overflow-y-auto`} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className={`text-lg font-bold ${theme.highlight}`}>{showHistory ? 'Promotion History' : `Promote Students — Step ${step}/4`}</h2>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowHistory(!showHistory)} className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${showHistory ? theme.primary + ' text-white' : theme.secondaryBg + ' ' + theme.highlight + ' ' + theme.buttonHover}`}>
              <History size={12} /> {showHistory ? 'Back to Wizard' : 'View History'}
            </button>
            <button onClick={onClose} className={`p-1.5 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
          </div>
        </div>

        {/* Gap #47 — Promotion History */}
        {showHistory ? (
          <div className="space-y-3">
            <p className={`text-xs ${theme.iconColor}`}>Historical promotion records for all classes.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className={theme.secondaryBg}>
                    {['Year', 'From Class', 'To Class', 'Total Students', 'Promoted', 'Detained', 'TC Issued'].map(h => (
                      <th key={h} className={`px-3 py-2 text-left text-[10px] font-bold ${theme.iconColor} uppercase`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { year: '2025-26', from: '10th', to: '11th', total: 36, promoted: 32, detained: 2, tc: 2 },
                    { year: '2025-26', from: '5th', to: '6th', total: 45, promoted: 44, detained: 1, tc: 0 },
                    { year: '2024-25', from: '10th', to: '11th', total: 38, promoted: 35, detained: 1, tc: 2 },
                    { year: '2024-25', from: '12th', to: 'Passed Out', total: 28, promoted: 28, detained: 0, tc: 0 },
                    { year: '2023-24', from: '10th', to: '11th', total: 40, promoted: 36, detained: 3, tc: 1 },
                    { year: '2023-24', from: '12th', to: 'Passed Out', total: 30, promoted: 30, detained: 0, tc: 0 },
                  ].map((row, i) => (
                    <tr key={i} className={`border-t ${theme.border}`}>
                      <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{row.year}</td>
                      <td className={`px-3 py-2 ${theme.iconColor}`}>{row.from}</td>
                      <td className={`px-3 py-2 font-bold ${theme.primaryText}`}>{row.to}</td>
                      <td className={`px-3 py-2 ${theme.iconColor}`}>{row.total}</td>
                      <td className="px-3 py-2 font-bold text-emerald-600">{row.promoted}</td>
                      <td className={`px-3 py-2 font-bold ${row.detained > 0 ? 'text-amber-600' : theme.iconColor}`}>{row.detained}</td>
                      <td className={`px-3 py-2 font-bold ${row.tc > 0 ? 'text-red-500' : theme.iconColor}`}>{row.tc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
        <>
        {/* Progress bar */}
        <div className="flex gap-1">
          {[1,2,3,4].map(s => (
            <div key={s} className={`flex-1 h-1.5 rounded-full ${s <= step ? theme.primary : theme.secondaryBg}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4">
            {/* Promotion Rules Config */}
            <div className={`p-4 rounded-xl border ${theme.border} ${theme.secondaryBg}`}>
              <div className="flex items-center gap-2 mb-3">
                <Settings size={14} className={theme.primaryText} />
                <span className={`text-xs font-bold ${theme.highlight}`}>Promotion Rules</span>
                <button onClick={() => setShowRulesConfig(!showRulesConfig)} className={`ml-auto text-[10px] font-bold ${theme.primaryText}`}>
                  {showRulesConfig ? 'Hide' : 'Configure'}
                </button>
              </div>
              <div className="flex gap-3 mb-2">
                {(['auto', 'manual', 'rule-based'] as const).map(mode => (
                  <label key={mode} className={`flex items-center gap-1.5 text-xs ${theme.highlight} cursor-pointer`}>
                    <input type="radio" name="promoMode" checked={promotionMode === mode} onChange={() => setPromotionMode(mode)} className="accent-slate-600" />
                    {mode === 'auto' ? 'Auto-promote all' : mode === 'manual' ? 'Manual case-by-case' : 'Rule-based'}
                  </label>
                ))}
              </div>
              {showRulesConfig && promotionMode === 'rule-based' && (
                <div className={`mt-3 pt-3 border-t ${theme.border} space-y-2`}>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Min Attendance (%)</label>
                      <input type="number" value={minAttendance} onChange={e => setMinAttendance(e.target.value)} className={`w-full px-3 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`} />
                    </div>
                    <div>
                      <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Min Marks (%)</label>
                      <input type="number" value={minMarks} onChange={e => setMinMarks(e.target.value)} className={`w-full px-3 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`} />
                    </div>
                  </div>
                  <label className={`flex items-center gap-2 text-xs ${theme.highlight} cursor-pointer`}>
                    <input type="checkbox" checked={allSubjectsPass} onChange={() => setAllSubjectsPass(!allSubjectsPass)} className="rounded accent-slate-600" />
                    All subjects pass required
                  </label>
                  <button onClick={() => window.alert('Rules applied! Students auto-classified based on criteria. (Blueprint demo)')} className={`w-full py-1.5 rounded-lg ${theme.primary} text-white text-[10px] font-bold`}>
                    Apply Rules
                  </button>
                </div>
              )}
            </div>

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
                  {/* Stream Selection for 10→11 promotion */}
                  {sourceClass === '10th' && s.action === 'Promote' && (
                    <select value={streams[i]} onChange={e => { const u = [...streams]; u[i] = e.target.value; setStreams(u); }} className={`px-2 py-1 rounded-lg text-[10px] font-bold border ${theme.border} ${theme.inputBg} ${theme.highlight}`}>
                      <option>Not Applicable</option><option>Science</option><option>Commerce</option><option>Arts</option>
                    </select>
                  )}
                </div>
              ))}
            </div>
            {/* Stream selection note */}
            {sourceClass === '10th' && (
              <p className={`text-[10px] ${theme.iconColor} italic`}>Class 10 to 11 promotion: Select stream (Science/Commerce/Arts) for each promoted student.</p>
            )}
            {/* Transfer Notification for TC Issued students */}
            {students.some(s => s.action === 'TC Issued') && (
              <div className={`p-3 rounded-xl border border-amber-300 ${theme.accentBg}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Bell size={12} className="text-amber-600" />
                  <span className={`text-xs font-bold ${theme.highlight}`}>Transfer Notification</span>
                </div>
                <label className={`flex items-center gap-2 text-xs ${theme.highlight} cursor-pointer mb-2`}>
                  <input type="checkbox" checked={tcNotifyParent} onChange={() => setTcNotifyParent(!tcNotifyParent)} className="rounded accent-slate-600" />
                  Notify parent and receiving school
                </label>
                {tcNotifyParent && (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className={`text-[10px] font-bold ${theme.iconColor} block mb-0.5`}>Parent Phone</label>
                      <input value={tcParentPhone} onChange={e => setTcParentPhone(e.target.value)} placeholder="10-digit mobile" className={`w-full px-2 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight}`} />
                    </div>
                    <div>
                      <label className={`text-[10px] font-bold ${theme.iconColor} block mb-0.5`}>Receiving School</label>
                      <input value={tcReceivingSchool} onChange={e => setTcReceivingSchool(e.target.value)} placeholder="School name" className={`w-full px-2 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight}`} />
                    </div>
                  </div>
                )}
              </div>
            )}
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
              <div className="flex justify-between"><span className={`text-xs ${theme.iconColor}`}>Promoted</span><span className="text-sm font-bold text-emerald-600">{promoted} students &rarr; {nextClassMap[sourceClass]}</span></div>
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
        </>
        )}
      </div>
    </div>
  );
}
