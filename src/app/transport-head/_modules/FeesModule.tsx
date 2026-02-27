'use client';

import React, { useState } from 'react';
import { StatCard, TabBar, StatusBadge, DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  Plus, CheckCircle, AlertTriangle, IndianRupee, Clock, X
} from 'lucide-react';

// ─── MOCK DATA ──────────────────────────────────────
const mockRoutes = [
  { id: 'RT-001', name: 'Route A' }, { id: 'RT-002', name: 'Route B' }, { id: 'RT-003', name: 'Route C' },
  { id: 'RT-004', name: 'Route D' }, { id: 'RT-005', name: 'Route E' }, { id: 'RT-006', name: 'Route F' },
];

const mockStops = [
  { id: 'STP-001', name: 'Jodhpur Cross Roads', area: 'Satellite', routes: ['Route A'], landmark: 'Near BRTS Stop', students: 8, fee: 2500 },
  { id: 'STP-002', name: 'Satellite Circle', area: 'Satellite', routes: ['Route A'], landmark: 'Opposite Rajpath Club', students: 6, fee: 2200 },
  { id: 'STP-003', name: 'Prahlad Nagar Garden', area: 'Prahlad Nagar', routes: ['Route B'], landmark: 'Garden main gate', students: 7, fee: 2800 },
  { id: 'STP-004', name: 'Thaltej Cross Roads', area: 'Thaltej', routes: ['Route B'], landmark: 'Near D-Mart', students: 5, fee: 3000 },
  { id: 'STP-005', name: 'Bodakdev Circle', area: 'Bodakdev', routes: ['Route C'], landmark: 'Circle main road', students: 6, fee: 2000 },
  { id: 'STP-006', name: 'Isanpur Circle', area: 'Isanpur', routes: ['Route D'], landmark: 'Near petrol pump', students: 8, fee: 3200 },
  { id: 'STP-007', name: 'Paldi Cross Roads', area: 'Paldi', routes: ['Route E'], landmark: 'Paldi bus stop', students: 5, fee: 1800 },
  { id: 'STP-008', name: 'Motera Stadium', area: 'Motera', routes: ['Route F'], landmark: 'Gate 3 entrance', students: 9, fee: 3500 },
  { id: 'STP-009', name: 'Chandkheda BRTS', area: 'Chandkheda', routes: ['Route F'], landmark: 'BRTS platform', students: 7, fee: 3000 },
  { id: 'STP-010', name: 'Navrangpura BRTS', area: 'Navrangpura', routes: ['Route E'], landmark: 'Main BRTS stop', students: 4, fee: 1500 },
];

const mockStudentsByRoute = [
  { route: 'Route A', students: [
    { id: 'STU-101', name: 'Arjun Mehta', class: '8-A', stop: 'Jodhpur Cross Roads', pickup: '6:50 AM', dropStop: 'Jodhpur Cross Roads', dropTime: '3:40 PM', phone: '98250 11111' },
    { id: 'STU-102', name: 'Priya Sharma', class: '6-B', stop: 'Satellite Circle', pickup: '6:55 AM', dropStop: 'Jodhpur Cross Roads', dropTime: '3:45 PM', phone: '98250 11112' },
    { id: 'STU-103', name: 'Rohan Desai', class: '9-A', stop: 'Shyamal Cross Roads', pickup: '7:00 AM', dropStop: 'Shyamal Cross Roads', dropTime: '3:50 PM', phone: '98250 11113' },
    { id: 'STU-104', name: 'Ananya Patel', class: '5-C', stop: 'Prernatirth Derasar', pickup: '7:05 AM', dropStop: 'Satellite Circle', dropTime: '3:55 PM', phone: '98250 11114' },
    { id: 'STU-105', name: 'Vivaan Shah', class: '7-A', stop: 'Judges Bungalow', pickup: '7:10 AM', dropStop: 'Judges Bungalow', dropTime: '4:00 PM', phone: '98250 11115' },
  ]},
  { route: 'Route B', students: [
    { id: 'STU-201', name: 'Ishaan Joshi', class: '10-A', stop: 'Prahlad Nagar Garden', pickup: '6:55 AM', dropStop: 'Prahlad Nagar Garden', dropTime: '3:55 PM', phone: '98250 22221' },
    { id: 'STU-202', name: 'Kavya Trivedi', class: '4-B', stop: 'Thaltej Cross Roads', pickup: '7:00 AM', dropStop: 'Prahlad Nagar Garden', dropTime: '4:00 PM', phone: '98250 22222' },
    { id: 'STU-203', name: 'Aditya Pandya', class: '8-C', stop: 'Sola Bridge', pickup: '7:05 AM', dropStop: 'Sola Bridge', dropTime: '4:05 PM', phone: '98250 22223' },
    { id: 'STU-204', name: 'Nisha Raval', class: '6-A', stop: 'Sandesh Press Road', pickup: '7:10 AM', dropStop: 'Sandesh Press Road', dropTime: '4:10 PM', phone: '98250 22224' },
  ]},
  { route: 'Route C', students: [
    { id: 'STU-301', name: 'Dev Chauhan', class: '9-B', stop: 'Bodakdev Circle', pickup: '6:35 AM', dropStop: 'Bodakdev Circle', dropTime: '3:25 PM', phone: '98250 33331' },
    { id: 'STU-302', name: 'Riya Bhatt', class: '7-C', stop: 'Pakwan Cross Roads', pickup: '6:42 AM', dropStop: 'Bodakdev Circle', dropTime: '3:32 PM', phone: '98250 33332' },
    { id: 'STU-303', name: 'Aarav Nair', class: '5-A', stop: 'Rajpath Club', pickup: '6:48 AM', dropStop: 'Rajpath Club', dropTime: '3:38 PM', phone: '98250 33333' },
    { id: 'STU-304', name: 'Meera Iyer', class: '10-B', stop: 'Sola Overbridge', pickup: '6:55 AM', dropStop: 'Sola Overbridge', dropTime: '3:45 PM', phone: '98250 33334' },
  ]},
  { route: 'Route D', students: [
    { id: 'STU-401', name: 'Harsh Panchal', class: '6-A', stop: 'Isanpur Circle', pickup: '6:45 AM', dropStop: 'Isanpur Circle', dropTime: '3:50 PM', phone: '98250 44441' },
    { id: 'STU-402', name: 'Pooja Thakor', class: '9-C', stop: 'Maninagar Station', pickup: '6:52 AM', dropStop: 'Isanpur Circle', dropTime: '3:57 PM', phone: '98250 44442' },
    { id: 'STU-403', name: 'Yash Solanki', class: '4-A', stop: 'Kagdapith', pickup: '7:00 AM', dropStop: 'Kagdapith', dropTime: '4:05 PM', phone: '98250 44443' },
  ]},
  { route: 'Route E', students: [
    { id: 'STU-501', name: 'Tanvi Vyas', class: '7-B', stop: 'Paldi', pickup: '7:05 AM', dropStop: 'Paldi', dropTime: '3:40 PM', phone: '98250 55551' },
    { id: 'STU-502', name: 'Dhruv Parikh', class: '10-A', stop: 'Navrangpura BRTS', pickup: '7:12 AM', dropStop: 'Paldi', dropTime: '3:47 PM', phone: '98250 55552' },
    { id: 'STU-503', name: 'Shreya Dave', class: '5-B', stop: 'CG Road', pickup: '7:18 AM', dropStop: 'CG Road', dropTime: '3:53 PM', phone: '98250 55553' },
  ]},
  { route: 'Route F', students: [
    { id: 'STU-601', name: 'Mihir Acharya', class: '8-B', stop: 'Motera Stadium', pickup: '6:40 AM', dropStop: 'Motera Stadium', dropTime: '3:45 PM', phone: '98250 66661' },
    { id: 'STU-602', name: 'Aishwarya Gajjar', class: '6-C', stop: 'Chandkheda BRTS', pickup: '6:48 AM', dropStop: 'Motera Stadium', dropTime: '3:53 PM', phone: '98250 66662' },
    { id: 'STU-603', name: 'Parth Rana', class: '9-A', stop: 'Sabarmati', pickup: '6:55 AM', dropStop: 'Sabarmati', dropTime: '4:00 PM', phone: '98250 66663' },
    { id: 'STU-604', name: 'Diya Kothari', class: '3-A', stop: 'Kali Circle', pickup: '7:02 AM', dropStop: 'Kali Circle', dropTime: '4:07 PM', phone: '98250 66664' },
  ]},
];

export default function FeesModule({ theme }: { theme: Theme }) {
  const [feeTab, setFeeTab] = useState('Overview');
  const [showRecordPayment, setShowRecordPayment] = useState(false);
  const [payRoute, setPayRoute] = useState('');
  const allStudents = mockStudentsByRoute.flatMap(r => r.students.map(s => {
    const stop = mockStops.find(st => st.name === s.stop);
    return { ...s, route: r.route, fee: stop?.fee || 0 };
  }));
  const totalExpected = allStudents.reduce((s, st) => s + st.fee, 0) * 6;
  const collected = Math.round(totalExpected * 0.7);
  const pending = totalExpected - collected;
  const overdue = Math.round(pending * 0.375);

  const mockPayments = [
    { student: 'Arjun Mehta', route: 'Route A', amount: 2500, date: 'Feb 20, 2026', mode: 'UPI' },
    { student: 'Ishaan Joshi', route: 'Route B', amount: 2800, date: 'Feb 19, 2026', mode: 'Cash' },
    { student: 'Dev Chauhan', route: 'Route C', amount: 2000, date: 'Feb 18, 2026', mode: 'Bank Transfer' },
    { student: 'Harsh Panchal', route: 'Route D', amount: 3200, date: 'Feb 17, 2026', mode: 'UPI' },
    { student: 'Mihir Acharya', route: 'Route F', amount: 3500, date: 'Feb 16, 2026', mode: 'Cheque' },
  ];

  const mockOutstanding = [
    { student: 'Priya Sharma', class: '6-B', route: 'Route A', amount: 4400, months: 2, status: 'Overdue' },
    { student: 'Kavya Trivedi', class: '4-B', route: 'Route B', amount: 3000, months: 1, status: 'Pending' },
    { student: 'Aarav Nair', class: '5-A', route: 'Route C', amount: 2000, months: 1, status: 'Pending' },
    { student: 'Yash Solanki', class: '4-A', route: 'Route D', amount: 6400, months: 2, status: 'Overdue' },
    { student: 'Diya Kothari', class: '3-A', route: 'Route F', amount: 3500, months: 1, status: 'Pending' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Transport Fees</h1>
        <button onClick={() => setShowRecordPayment(true)} className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> Record Payment</button>
      </div>
      <div className={`flex items-center gap-4 p-2.5 rounded-xl ${theme.accentBg} border ${theme.border}`}>
        <div className="flex items-center gap-1.5"><CheckCircle size={12} className="text-emerald-500" /><span className={`text-[10px] font-bold ${theme.highlight}`}>Auto-receipt ON</span><span className={`text-[10px] ${theme.iconColor}`}>(configured by SSA)</span></div>
        <div className={`w-px h-4 ${theme.border}`} />
        <div className="flex items-center gap-1.5"><CheckCircle size={12} className="text-emerald-500" /><span className={`text-[10px] font-bold ${theme.highlight}`}>Syncs to School Fees Module</span><span className={`text-[10px] ${theme.iconColor}`}>(Transport Fee head)</span></div>
      </div>
      <TabBar tabs={['Overview', 'Route-wise', 'Recent Payments', 'Outstanding']} active={feeTab} onChange={setFeeTab} theme={theme} />

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={IndianRupee} label="Total Expected" value={`\u20B9${(totalExpected / 100000).toFixed(1)}L`} color="bg-blue-500" sub="6 months" theme={theme} />
        <StatCard icon={CheckCircle} label="Collected" value={`\u20B9${(collected / 100000).toFixed(1)}L`} color="bg-emerald-500" sub="70%" theme={theme} />
        <StatCard icon={Clock} label="Pending" value={`\u20B9${(pending / 100000).toFixed(1)}L`} color="bg-amber-500" theme={theme} />
        <StatCard icon={AlertTriangle} label="Overdue" value={`\u20B9${(overdue / 1000).toFixed(0)}K`} color="bg-red-500" theme={theme} />
      </div>

      {feeTab === 'Overview' && (
        <>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Route-wise Fee Breakdown</h3>
            <DataTable
              headers={['Route', 'Students', 'Expected/mo', 'Collected', 'Pending']}
              rows={mockStudentsByRoute.map(r => {
                const students = r.students.map(s => ({ ...s, fee: mockStops.find(st => st.name === s.stop)?.fee || 0 }));
                const expected = students.reduce((sum, s) => sum + s.fee, 0);
                const coll = Math.round(expected * 0.7);
                return [
                  <span key="r" className={`font-bold ${theme.highlight}`}>{r.route}</span>,
                  <span key="s" className={theme.iconColor}>{r.students.length}</span>,
                  <span key="e" className={`font-bold ${theme.highlight}`}>{'\u20B9'}{expected.toLocaleString()}</span>,
                  <span key="c" className="text-emerald-600 font-bold">{'\u20B9'}{coll.toLocaleString()}</span>,
                  <span key="p" className="text-amber-600 font-bold">{'\u20B9'}{(expected - coll).toLocaleString()}</span>,
                ];
              })}
              theme={theme}
            />
          </div>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Recent Payments</h3>
            <div className="space-y-2">
              {mockPayments.slice(0, 3).map((p, i) => (
                <div key={i} className={`flex items-center justify-between p-3 rounded-xl ${theme.accentBg}`}>
                  <div>
                    <p className={`text-xs font-bold ${theme.highlight}`}>{p.student}</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>{p.route} &bull; {p.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-bold text-emerald-600`}>{'\u20B9'}{p.amount.toLocaleString()}</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>{p.mode}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {feeTab === 'Route-wise' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Detailed Route-wise Breakdown</h3>
          <DataTable
            headers={['Route', 'Students', 'Expected/mo', 'Collected/mo', 'Pending/mo', 'Collection %']}
            rows={mockStudentsByRoute.map(r => {
              const students = r.students.map(s => ({ ...s, fee: mockStops.find(st => st.name === s.stop)?.fee || 0 }));
              const expected = students.reduce((sum, s) => sum + s.fee, 0);
              const coll = Math.round(expected * (0.6 + Math.random() * 0.3));
              const pct = Math.round((coll / expected) * 100);
              return [
                <span key="r" className={`font-bold ${theme.highlight}`}>{r.route}</span>,
                <span key="s" className={theme.iconColor}>{r.students.length}</span>,
                <span key="e" className={`font-bold ${theme.highlight}`}>{'\u20B9'}{expected.toLocaleString()}</span>,
                <span key="c" className="text-emerald-600 font-bold">{'\u20B9'}{coll.toLocaleString()}</span>,
                <span key="p" className="text-amber-600 font-bold">{'\u20B9'}{(expected - coll).toLocaleString()}</span>,
                <span key="pct" className={`text-xs font-bold ${pct >= 80 ? 'text-emerald-600' : pct >= 60 ? 'text-amber-600' : 'text-red-600'}`}>{pct}%</span>,
              ];
            })}
            theme={theme}
          />
        </div>
      )}

      {feeTab === 'Recent Payments' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>All Recent Payments</h3>
          <DataTable
            headers={['Student', 'Route', 'Amount', 'Date', 'Mode']}
            rows={mockPayments.map((p, i) => [
              <span key="s" className={`font-bold ${theme.highlight}`}>{p.student}</span>,
              <span key="r" className={`text-xs font-bold ${theme.primaryText}`}>{p.route}</span>,
              <span key="a" className="text-emerald-600 font-bold">{'\u20B9'}{p.amount.toLocaleString()}</span>,
              <span key="d" className={theme.iconColor}>{p.date}</span>,
              <span key="m" className={`text-xs px-2 py-0.5 rounded-full font-bold ${p.mode === 'UPI' ? 'bg-purple-100 text-purple-700' : p.mode === 'Cash' ? 'bg-emerald-100 text-emerald-700' : p.mode === 'Bank Transfer' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>{p.mode}</span>,
            ])}
            theme={theme}
          />
        </div>
      )}

      {feeTab === 'Outstanding' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Student-wise Outstanding</h3>
          <DataTable
            headers={['Student', 'Class', 'Route', 'Outstanding', 'Months Due', 'Status', '']}
            rows={mockOutstanding.map((o, i) => [
              <span key="s" className={`font-bold ${theme.highlight}`}>{o.student}</span>,
              <span key="c" className={theme.iconColor}>{o.class}</span>,
              <span key="r" className={`text-xs font-bold ${theme.primaryText}`}>{o.route}</span>,
              <span key="a" className="text-red-600 font-bold">{'\u20B9'}{o.amount.toLocaleString()}</span>,
              <span key="m" className={`font-bold ${theme.highlight}`}>{o.months}</span>,
              <StatusBadge key="st" status={o.status === 'Overdue' ? 'Overdue' : 'Pending'} theme={theme} />,
              <button key="act" onClick={() => setShowRecordPayment(true)} className={`px-2 py-1 rounded-lg ${theme.primary} text-white text-[10px] font-bold`}>Accept Payment</button>,
            ])}
            theme={theme}
          />
        </div>
      )}

      {/* Record Payment Form */}
      {showRecordPayment && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-bold ${theme.highlight}`}>Record Fee Payment</h2>
              <button onClick={() => setShowRecordPayment(false)} className={`p-2 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Route *</label>
                <select value={payRoute} onChange={e => setPayRoute(e.target.value)} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}>
                  <option value="">Select route...</option>{mockRoutes.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}</select>
              </div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Student *</label>
                <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}>
                  <option value="">Select student...</option>
                  {payRoute ? mockStudentsByRoute.find(r => r.route === payRoute)?.students.map(s => <option key={s.id} value={s.id}>{s.name} ({s.class})</option>) : allStudents.map(s => <option key={s.id} value={s.id}>{s.name} ({s.class}) — {s.route}</option>)}
                </select>
              </div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Amount ({'\u20B9'}) *</label><input type="number" placeholder="e.g. 2500" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Payment Date *</label><input type="date" defaultValue={new Date().toISOString().split('T')[0]} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Payment Mode *</label>
                <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}><option value="">Select...</option><option>Cash</option><option>UPI</option><option>Bank Transfer</option><option>Cheque</option><option>Online (Portal)</option></select>
              </div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Month(s) Covered *</label>
                <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}><option value="">Select...</option><option>Feb 2026</option><option>Jan 2026</option><option>Dec 2025</option><option>Jan–Feb 2026 (2 months)</option><option>Dec 2025–Feb 2026 (3 months)</option></select>
              </div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Receipt Number</label><input defaultValue="RCP-TRANS-0043" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /><p className={`text-[9px] text-emerald-600 mt-0.5`}>Auto-generated (SSA config)</p></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Collected By</label>
                <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}><option value="">Select...</option><option>Transport Head</option><option>Driver (Ramesh Kumar)</option><option>Front Office</option><option>Online Payment</option></select>
              </div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Cheque / Transaction Ref</label><input placeholder="e.g. UTR / Cheque No." className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Late Fee ({'\u20B9'})</label><input type="number" placeholder="0" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Discount / Concession ({'\u20B9'})</label><input type="number" placeholder="0" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div className="col-span-2"><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Notes</label><textarea placeholder="e.g. Partial payment, balance ₹500 due next week" rows={2} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setShowRecordPayment(false)} className={`px-4 py-2 rounded-xl border ${theme.border} text-xs font-bold ${theme.iconColor}`}>Cancel</button>
              <button onClick={() => { setShowRecordPayment(false); window.alert('Payment recorded! Receipt generated. (Blueprint demo)'); }} className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>Record Payment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
