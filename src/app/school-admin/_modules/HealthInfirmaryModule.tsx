'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { StatCard, StatusBadge, TabBar, SearchBar, DataTable } from '@/components/shared';
import {
  Heart, Syringe, Pill, Stethoscope, Plus, Search, AlertTriangle,
  Eye, Clock, Phone, Download, X, User, Activity
} from 'lucide-react';

// ── Mock Data ──
const infirmaryVisits = [
  { id: 'IV001', studentName: 'Aarav Patel', class: '10-A', date: '01-Mar-2026', time: '09:15', complaint: 'Headache & dizziness', treatment: 'Paracetamol + rest 30 min', nurse: 'Sr. Meena', status: 'Treated', parentNotified: true },
  { id: 'IV002', studentName: 'Saanvi Sharma', class: '8-B', date: '01-Mar-2026', time: '10:30', complaint: 'Stomach ache', treatment: 'ORS + observation', nurse: 'Sr. Meena', status: 'Under Observation', parentNotified: false },
  { id: 'IV003', studentName: 'Vivaan Mehta', class: '6-A', date: '01-Mar-2026', time: '11:00', complaint: 'Scraped knee (playground)', treatment: 'Wound cleaned + bandage', nurse: 'Sr. Kavita', status: 'Treated', parentNotified: false },
  { id: 'IV004', studentName: 'Diya Reddy', class: '9-C', date: '28-Feb-2026', time: '14:20', complaint: 'Fever 101F', treatment: 'Paracetamol, parent called', nurse: 'Sr. Meena', status: 'Sent Home', parentNotified: true },
  { id: 'IV005', studentName: 'Kabir Joshi', class: '5-B', date: '28-Feb-2026', time: '08:45', complaint: 'Allergic reaction — rash', treatment: 'Cetirizine + cold compress', nurse: 'Sr. Kavita', status: 'Referred to Hospital', parentNotified: true },
  { id: 'IV006', studentName: 'Ananya Gupta', class: '7-A', date: '27-Feb-2026', time: '12:10', complaint: 'Nausea after lunch', treatment: 'Rest + hydration', nurse: 'Sr. Meena', status: 'Treated', parentNotified: false },
  { id: 'IV007', studentName: 'Rohan Singh', class: '4-C', date: '27-Feb-2026', time: '13:30', complaint: 'Eye irritation', treatment: 'Eye wash + drops', nurse: 'Sr. Kavita', status: 'Treated', parentNotified: false },
  { id: 'IV008', studentName: 'Priya Nair', class: '3-A', date: '26-Feb-2026', time: '10:00', complaint: 'Asthma episode', treatment: 'Inhaler administered', nurse: 'Sr. Meena', status: 'Under Observation', parentNotified: true },
];

const vaccinationRecords = [
  { id: 'V001', studentName: 'Arjun Iyer', class: '1-A', vaccine: 'DPT Booster', dueDate: '05-Mar-2026', status: 'Due', administeredBy: '' },
  { id: 'V002', studentName: 'Meera Desai', class: '1-B', vaccine: 'DPT Booster', dueDate: '28-Feb-2026', status: 'Overdue', administeredBy: '' },
  { id: 'V003', studentName: 'Siddharth Rao', class: '5-A', vaccine: 'Td (Tetanus)', dueDate: '10-Mar-2026', status: 'Due', administeredBy: '' },
  { id: 'V004', studentName: 'Kavya Sharma', class: '2-C', vaccine: 'MMR-2', dueDate: '20-Feb-2026', status: 'Completed', administeredBy: 'Dr. Patel' },
  { id: 'V005', studentName: 'Ishaan Kumar', class: '6-B', vaccine: 'HPV Dose 1', dueDate: '15-Mar-2026', status: 'Due', administeredBy: '' },
  { id: 'V006', studentName: 'Tanya Gupta', class: '3-A', vaccine: 'OPV Booster', dueDate: '01-Feb-2026', status: 'Exempted', administeredBy: '' },
];

const medicineLog = [
  { id: 'M001', medicineName: 'Paracetamol 500mg', type: 'Tablet', stock: 120, expiryDate: '15-Sep-2026', usedToday: 4, reorderLevel: 50 },
  { id: 'M002', medicineName: 'Cetirizine 10mg', type: 'Tablet', stock: 45, expiryDate: '20-Jul-2026', usedToday: 1, reorderLevel: 30 },
  { id: 'M003', medicineName: 'ORS Sachets', type: 'Powder', stock: 18, expiryDate: '10-Dec-2026', usedToday: 2, reorderLevel: 20 },
  { id: 'M004', medicineName: 'Dettol Antiseptic', type: 'Liquid', stock: 5, expiryDate: '30-Jun-2026', usedToday: 1, reorderLevel: 3 },
  { id: 'M005', medicineName: 'Band-Aid (box)', type: 'Dressing', stock: 8, expiryDate: '01-Jan-2027', usedToday: 3, reorderLevel: 5 },
  { id: 'M006', medicineName: 'Eye Drops (Refresh)', type: 'Liquid', stock: 3, expiryDate: '05-Apr-2026', usedToday: 1, reorderLevel: 5 },
  { id: 'M007', medicineName: 'Inhaler (Salbutamol)', type: 'Inhaler', stock: 2, expiryDate: '28-Aug-2026', usedToday: 1, reorderLevel: 3 },
  { id: 'M008', medicineName: 'Cotton Roll', type: 'Dressing', stock: 12, expiryDate: '15-Mar-2027', usedToday: 2, reorderLevel: 5 },
];

const healthCheckups = [
  { id: 'HC001', studentName: 'Aarav Patel', class: '10-A', date: '15-Jan-2026', height: '165 cm', weight: '52 kg', bmi: 19.1, vision: '6/6', dental: 'Normal', status: 'Completed' },
  { id: 'HC002', studentName: 'Saanvi Sharma', class: '8-B', date: '15-Jan-2026', height: '148 cm', weight: '38 kg', bmi: 17.3, vision: '6/9', dental: 'Cavity', status: 'Completed' },
  { id: 'HC003', studentName: 'Kabir Joshi', class: '5-B', date: '16-Jan-2026', height: '122 cm', weight: '30 kg', bmi: 20.2, vision: '6/6', dental: 'Normal', status: 'Completed' },
  { id: 'HC004', studentName: 'Priya Nair', class: '3-A', date: '', height: '', weight: '', bmi: 0, vision: '', dental: '', status: 'Pending' },
  { id: 'HC005', studentName: 'Rohan Singh', class: '4-C', date: '', height: '', weight: '', bmi: 0, vision: '', dental: '', status: 'Pending' },
  { id: 'HC006', studentName: 'Diya Reddy', class: '9-C', date: '16-Jan-2026', height: '155 cm', weight: '58 kg', bmi: 24.1, vision: '6/12', dental: 'Normal', status: 'Completed' },
];

const bmiColor = (bmi: number) => {
  if (bmi === 0) return '';
  if (bmi < 18.5) return 'text-amber-600';
  if (bmi < 25) return 'text-emerald-600';
  return 'text-red-600';
};

const bmiLabel = (bmi: number) => {
  if (bmi === 0) return '';
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  return 'Overweight';
};

const visitStatusColor = (s: string) => {
  if (s === 'Treated') return 'bg-emerald-100 text-emerald-700';
  if (s === 'Under Observation') return 'bg-amber-100 text-amber-700';
  if (s === 'Sent Home') return 'bg-blue-100 text-blue-700';
  return 'bg-red-100 text-red-700';
};

const vacStatusColor = (s: string) => {
  if (s === 'Completed') return 'bg-emerald-100 text-emerald-700';
  if (s === 'Due') return 'bg-blue-100 text-blue-700';
  if (s === 'Overdue') return 'bg-red-100 text-red-700';
  return 'bg-slate-100 text-slate-600';
};

export default function HealthInfirmaryModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Overview');
  const [showNewVisit, setShowNewVisit] = useState(false);
  const [severity, setSeverity] = useState('Minor');
  const [notifyParent, setNotifyParent] = useState(false);

  const todayVisits = infirmaryVisits.filter(v => v.date === '01-Mar-2026').length;
  const vacDue = vaccinationRecords.filter(v => v.status === 'Due' || v.status === 'Overdue').length;
  const lowStock = medicineLog.filter(m => m.stock <= m.reorderLevel).length;
  const checkupsPending = healthCheckups.filter(h => h.status === 'Pending').length;

  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Health & Infirmary</h1>
      <TabBar tabs={['Overview', 'Infirmary Visits', 'Vaccination', 'Medicine Log', 'Health Checkup']} active={tab} onChange={setTab} theme={theme} />

      {/* ── Overview ── */}
      {tab === 'Overview' && (
        <>
          <div className="grid grid-cols-4 gap-4">
            <StatCard icon={Heart} label="Today's Visits" value={String(todayVisits)} color="bg-rose-500" theme={theme} />
            <StatCard icon={Syringe} label="Vaccinations Due" value={String(vacDue)} color="bg-amber-500" theme={theme} />
            <StatCard icon={Pill} label="Low Stock Medicines" value={String(lowStock)} color="bg-red-500" theme={theme} />
            <StatCard icon={Stethoscope} label="Checkups Pending" value={String(checkupsPending)} color="bg-blue-500" theme={theme} />
          </div>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Recent Infirmary Visits</h3>
            <div className="space-y-2">
              {infirmaryVisits.slice(0, 5).map(v => (
                <div key={v.id} className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
                  <div className="flex items-center gap-3">
                    <Clock size={14} className={theme.iconColor} />
                    <div>
                      <p className={`text-xs font-bold ${theme.highlight}`}>{v.studentName} ({v.class})</p>
                      <p className={`text-[10px] ${theme.iconColor}`}>{v.time} &middot; {v.complaint}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${visitStatusColor(v.status)}`}>{v.status}</span>
                    {v.parentNotified && <span title="Parent Notified"><Phone size={12} className="text-emerald-500" /></span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ── Infirmary Visits ── */}
      {tab === 'Infirmary Visits' && (
        <div className="space-y-3">
          <div className="flex gap-3">
            <SearchBar placeholder="Search student name..." theme={theme} icon={Search} />
            <button onClick={() => setShowNewVisit(true)} className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1 whitespace-nowrap`}><Plus size={14} /> New Visit</button>
          </div>
          <DataTable
            headers={['Time', 'Student', 'Class', 'Complaint', 'Treatment', 'Nurse', 'Status', 'Parent']}
            rows={infirmaryVisits.map(v => [
              <span key="time" className={`font-mono text-xs ${theme.iconColor}`}>{v.time}</span>,
              <span key="name" className={`font-bold ${theme.highlight}`}>{v.studentName}</span>,
              <span key="cls" className={theme.iconColor}>{v.class}</span>,
              <span key="comp" className={`text-xs ${theme.iconColor}`}>{v.complaint}</span>,
              <span key="treat" className={`text-xs ${theme.iconColor}`}>{v.treatment}</span>,
              <span key="nurse" className={theme.iconColor}>{v.nurse}</span>,
              <span key="st" className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${visitStatusColor(v.status)}`}>{v.status}</span>,
              <span key="pn" className={v.parentNotified ? 'text-emerald-600 font-bold text-xs' : 'text-slate-400 text-xs'}>{v.parentNotified ? 'Yes' : 'No'}</span>,
            ])}
            theme={theme}
          />
        </div>
      )}

      {/* ── Vaccination ── */}
      {tab === 'Vaccination' && (
        <div className="space-y-3">
          {vaccinationRecords.some(v => v.status === 'Overdue') && (
            <div className="p-3 rounded-2xl border border-red-300 bg-red-50 flex items-center gap-3">
              <AlertTriangle size={16} className="text-red-600" />
              <p className="text-xs font-bold text-red-700">{vaccinationRecords.filter(v => v.status === 'Overdue').length} vaccination(s) overdue! Immediate action required.</p>
            </div>
          )}
          <div className="flex justify-end">
            <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> Record Vaccination</button>
          </div>
          <DataTable
            headers={['Student', 'Class', 'Vaccine', 'Due Date', 'Status', 'Administered By']}
            rows={vaccinationRecords.map(v => [
              <span key="name" className={`font-bold ${theme.highlight}`}>{v.studentName}</span>,
              <span key="cls" className={theme.iconColor}>{v.class}</span>,
              <span key="vac" className={`text-xs ${theme.iconColor}`}>{v.vaccine}</span>,
              <span key="due" className={`text-xs ${v.status === 'Overdue' ? 'text-red-600 font-bold' : theme.iconColor}`}>{v.dueDate}</span>,
              <span key="st" className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${vacStatusColor(v.status)}`}>{v.status}</span>,
              <span key="by" className={`text-xs ${theme.iconColor}`}>{v.administeredBy || '-'}</span>,
            ])}
            theme={theme}
          />
        </div>
      )}

      {/* ── Medicine Log ── */}
      {tab === 'Medicine Log' && (
        <div className="space-y-3">
          <div className="flex justify-end gap-2">
            <button className={`px-4 py-2.5 rounded-xl border ${theme.border} text-sm font-bold ${theme.highlight} ${theme.buttonHover} flex items-center gap-1`}><Plus size={14} /> Add Stock</button>
            <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Pill size={14} /> Dispense Medicine</button>
          </div>
          <DataTable
            headers={['Medicine', 'Type', 'Stock', 'Expiry', 'Used Today', 'Reorder Level', 'Status']}
            rows={medicineLog.map(m => {
              const isLow = m.stock <= m.reorderLevel;
              return [
                <span key="name" className={`font-bold ${theme.highlight}`}>{m.medicineName}</span>,
                <span key="type" className={theme.iconColor}>{m.type}</span>,
                <span key="stock" className={`font-bold ${isLow ? 'text-red-600' : 'text-emerald-600'}`}>{m.stock}</span>,
                <span key="exp" className={theme.iconColor}>{m.expiryDate}</span>,
                <span key="used" className={`font-bold ${theme.highlight}`}>{m.usedToday}</span>,
                <span key="reorder" className={theme.iconColor}>{m.reorderLevel}</span>,
                <span key="st" className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isLow ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>{isLow ? 'Low Stock' : 'OK'}</span>,
              ];
            })}
            theme={theme}
          />
        </div>
      )}

      {/* ── Health Checkup ── */}
      {tab === 'Health Checkup' && (
        <div className="space-y-3">
          <div className="flex justify-end gap-2">
            <button className={`px-4 py-2.5 rounded-xl border ${theme.border} text-sm font-bold ${theme.highlight} ${theme.buttonHover} flex items-center gap-1`}><Download size={14} /> Export to PDF</button>
            <button className={`px-4 py-2.5 rounded-xl border ${theme.border} text-sm font-bold ${theme.highlight} ${theme.buttonHover} flex items-center gap-1`}><Plus size={14} /> Record Results</button>
            <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Stethoscope size={14} /> Schedule Checkup</button>
          </div>
          <DataTable
            headers={['Student', 'Class', 'Date', 'Height', 'Weight', 'BMI', 'Vision', 'Dental', 'Status']}
            rows={healthCheckups.map(h => [
              <span key="name" className={`font-bold ${theme.highlight}`}>{h.studentName}</span>,
              <span key="cls" className={theme.iconColor}>{h.class}</span>,
              <span key="date" className={theme.iconColor}>{h.date || '-'}</span>,
              <span key="ht" className={theme.iconColor}>{h.height || '-'}</span>,
              <span key="wt" className={theme.iconColor}>{h.weight || '-'}</span>,
              <span key="bmi" className={`font-bold ${bmiColor(h.bmi)}`}>
                {h.bmi > 0 ? <>{h.bmi.toFixed(1)} <span className="text-[9px]">({bmiLabel(h.bmi)})</span></> : '-'}
              </span>,
              <span key="vis" className={theme.iconColor}>{h.vision || '-'}</span>,
              <span key="den" className={`text-xs ${h.dental === 'Cavity' ? 'text-amber-600 font-bold' : theme.iconColor}`}>{h.dental || '-'}</span>,
              <span key="st" className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${h.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{h.status}</span>,
            ])}
            theme={theme}
          />
        </div>
      )}

      {/* ── New Visit Modal ── */}
      {showNewVisit && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowNewVisit(false)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} shadow-2xl w-full max-w-lg p-6 space-y-4`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart size={16} className={theme.primaryText} />
                <h2 className={`text-lg font-bold ${theme.highlight}`}>New Infirmary Visit</h2>
              </div>
              <button onClick={() => setShowNewVisit(false)} className={`p-1.5 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Student <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Search size={14} className={`absolute left-3 top-2.5 ${theme.iconColor}`} />
                  <input placeholder="Search student by name or ID..." className={`w-full pl-9 pr-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`} />
                </div>
              </div>
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Complaint <span className="text-red-500">*</span></label>
                <textarea rows={2} placeholder="Describe the complaint..." className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} resize-none`} />
              </div>
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Treatment Given</label>
                <textarea rows={2} placeholder="Treatment administered..." className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} resize-none`} />
              </div>
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Severity</label>
                <div className="flex gap-2">
                  {['Minor', 'Moderate', 'Serious'].map(s => (
                    <button key={s} onClick={() => setSeverity(s)} className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${severity === s ? `${theme.primary} text-white border-transparent` : `${theme.border} ${theme.iconColor} ${theme.buttonHover}`}`}>{s}</button>
                  ))}
                </div>
              </div>
              <div className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
                <span className={`text-xs font-bold ${theme.highlight}`}>Notify Parent</span>
                <button onClick={() => setNotifyParent(!notifyParent)} className={`w-9 h-5 rounded-full relative transition-colors ${notifyParent ? theme.primary : 'bg-gray-300'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${notifyParent ? 'translate-x-4' : 'translate-x-0.5'}`} />
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowNewVisit(false)} className={`flex-1 py-2.5 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.highlight} ${theme.buttonHover}`}>Cancel</button>
              <button onClick={() => { window.alert('Visit recorded successfully! (Blueprint demo)'); setShowNewVisit(false); }} className={`flex-1 py-2.5 rounded-xl ${theme.primary} text-white text-sm font-bold`}>Save Visit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
