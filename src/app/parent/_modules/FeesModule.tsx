'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { StatCard, TabBar, StatusBadge, DataTable, MobileFrame, MobilePreviewToggle } from '@/components/shared';
import {
  Calendar, CheckCircle,
  AlertTriangle, CreditCard, Download,
  IndianRupee, Info, Smartphone, Upload, FileText, Award,
} from 'lucide-react';
import type { ChildProfile } from '../_components/types';
import { feesData } from '../_components/data';

export default function FeesModule({ theme, child }: { theme: Theme; child: ChildProfile }) {
  const fees = feesData[child.id];
  const [activeTab, setActiveTab] = useState('Overview');
  const [ledgerYear, setLedgerYear] = useState('2025-26');
  const [showScholarshipForm, setShowScholarshipForm] = useState(false);
  const [scholarshipScheme, setScholarshipScheme] = useState('');

  // Helper: Info tooltip icon
  const InfoTip = ({ tip }: { tip: string }) => (
    <span title={tip} className="inline-block ml-1 cursor-help"><Info size={14} className={theme.iconColor} /></span>
  );

  // Helper: Mobile badge
  const MobileBadge = () => (
    <span className="inline-flex items-center gap-0.5 ml-1.5 text-[9px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold">
      <Smartphone size={9} /> Mobile
    </span>
  );

  // Multi-year ledger data
  const ledgerData: Record<string, { date: string; description: string; debit: number; credit: number; balance: number; receipt: string }[]> = {
    '2025-26': [
      { date: '01 Apr 2025', description: 'Admission Fee + Annual Charges', debit: 9000, credit: 0, balance: 9000, receipt: '' },
      { date: '01 Apr 2025', description: 'Payment - Cash', debit: 0, credit: 9000, balance: 0, receipt: 'REC-2025-0340' },
      { date: '01 Jul 2025', description: 'Term 1 - Tuition + Transport', debit: 19500, credit: 0, balance: 19500, receipt: '' },
      { date: '05 Jul 2025', description: 'Payment - Cheque', debit: 0, credit: 19500, balance: 0, receipt: 'REC-2025-1920' },
      { date: '01 Oct 2025', description: 'Term 2 - Tuition + Transport', debit: 19500, credit: 0, balance: 19500, receipt: '' },
      { date: '10 Oct 2025', description: 'Payment - Net Banking', debit: 0, credit: 19500, balance: 0, receipt: 'REC-2025-2845' },
      { date: '01 Jan 2026', description: 'Term 3 - Tuition + Transport', debit: 19500, credit: 0, balance: 19500, receipt: '' },
      { date: '12 Jan 2026', description: 'Payment - UPI', debit: 0, credit: 19500, balance: 0, receipt: 'REC-2026-3421' },
    ],
    '2024-25': [
      { date: '01 Apr 2024', description: 'Admission Fee + Annual Charges', debit: 8500, credit: 0, balance: 8500, receipt: '' },
      { date: '05 Apr 2024', description: 'Payment - Cash', debit: 0, credit: 8500, balance: 0, receipt: 'REC-2024-0112' },
      { date: '01 Jul 2024', description: 'Term 1 - Tuition + Transport', debit: 18000, credit: 0, balance: 18000, receipt: '' },
      { date: '08 Jul 2024', description: 'Payment - UPI', debit: 0, credit: 18000, balance: 0, receipt: 'REC-2024-1456' },
    ],
    '2023-24': [
      { date: '01 Apr 2023', description: 'Admission Fee + Annual Charges', debit: 8000, credit: 0, balance: 8000, receipt: '' },
      { date: '03 Apr 2023', description: 'Payment - Cash', debit: 0, credit: 8000, balance: 0, receipt: 'REC-2023-0089' },
    ],
  };

  // Scholarship data
  const scholarships = [
    { name: 'Merit Scholarship', criteria: 'Top 10%, min 90% aggregate', amount: 5000, eligibility: 'Class 8-12' },
    { name: 'EWS Quota', criteria: 'Family income < \u20b93L per annum', amount: 0, amountLabel: '100% Fee Waiver', eligibility: 'All classes' },
    { name: 'Sports Excellence', criteria: 'State-level participation or above', amount: 10000, eligibility: 'Class 6-12' },
  ];

  const myScholarshipApps = [
    { scheme: 'Merit Scholarship', appliedDate: '10 Jan 2026', status: 'Under Review', amount: '\u20b95,000' },
    { scheme: 'Sports Excellence', appliedDate: '05 Dec 2025', status: 'Approved', amount: '\u20b910,000' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className={`text-lg font-bold ${theme.highlight}`}>Fees &amp; Payments</h2>
        {fees.currentDue > 0 && (
          <button className="flex items-center gap-1 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-lg">
            <CreditCard size={14} /> Pay Now - Rs.{fees.currentDue.toLocaleString('en-IN')}
          </button>
        )}
      </div>

      <TabBar tabs={['Overview', 'Payment History', 'Upcoming', 'Fee Structure', 'Ledger', 'Scholarships']} active={activeTab} onChange={setActiveTab} theme={theme} />

      {/* ── Mobile App Preview ── */}
      <MobilePreviewToggle theme={theme} mobileContent={
        <div className="flex flex-wrap gap-6 justify-center">
          {/* Screen 1: Fee Payment */}
          <MobileFrame title="Fee Payment" theme={theme}>
            <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 text-center">
              <p className="text-[9px] text-gray-500">Total Due</p>
              <p className={`text-2xl font-bold ${fees.currentDue > 0 ? 'text-red-600' : 'text-emerald-600'}`}>{fees.currentDue > 0 ? `\u20B9${fees.currentDue.toLocaleString('en-IN')}` : 'No Dues'}</p>
              <p className="text-[8px] text-gray-400 mt-0.5">{fees.currentDue > 0 ? `Due by ${fees.nextDueDate}` : 'All fees paid!'}</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-emerald-50 rounded-xl p-2.5 text-center border border-emerald-100"><p className="text-[8px] text-gray-500">Total Paid</p><p className="text-sm font-bold text-emerald-600">{'\u20B9'}{fees.totalPaid.toLocaleString('en-IN')}</p></div>
              <div className="bg-blue-50 rounded-xl p-2.5 text-center border border-blue-100"><p className="text-[8px] text-gray-500">Annual Fee</p><p className="text-sm font-bold text-blue-600">{'\u20B9'}{fees.totalAnnual.toLocaleString('en-IN')}</p></div>
            </div>

            {fees.currentDue > 0 && (
              <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                <p className="text-[10px] font-bold text-gray-800 mb-2">Pay via UPI</p>
                <div className="grid grid-cols-3 gap-2">
                  {['Google Pay', 'PhonePe', 'Paytm'].map((app, i) => (
                    <button key={i} className="flex flex-col items-center gap-1 py-2 bg-gray-50 rounded-lg">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${i === 0 ? 'bg-blue-500' : i === 1 ? 'bg-purple-500' : 'bg-sky-500'}`}>{app[0]}</span>
                      <span className="text-[7px] text-gray-600">{app}</span>
                    </button>
                  ))}
                </div>
                <button className="w-full mt-2 py-2.5 bg-emerald-600 text-white text-[11px] font-bold rounded-xl flex items-center justify-center gap-1">
                  {'\u20B9'} Pay {'\u20B9'}{fees.currentDue.toLocaleString('en-IN')} Now
                </button>
                <p className="text-[7px] text-gray-400 text-center mt-1">Secured by Razorpay &bull; Instant receipt</p>
              </div>
            )}

            <div className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-100">
              <p className="text-[10px] font-bold text-gray-800 mb-2">Fee Breakdown</p>
              {fees.breakdown.map((item, i) => (
                <div key={i} className="flex justify-between py-1 border-b border-gray-50 last:border-0">
                  <span className="text-[9px] text-gray-600">{item.head}</span>
                  <span className="text-[9px] font-bold text-gray-800">{'\u20B9'}{item.amount.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5">
              <p className="text-[10px] font-bold text-amber-800">Scholarship Available</p>
              <p className="text-[8px] text-amber-600 mt-0.5">Check eligibility &amp; apply from Fees &rarr; Scholarships</p>
            </div>
          </MobileFrame>

          {/* Screen 2: Payment History */}
          <MobileFrame title="Payment History" theme={theme}>
            <div className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold text-gray-800">Recent Payments</p>
                <span className="text-[8px] text-blue-600 font-bold">View All</span>
              </div>
              {fees.payments.slice(0, 5).map((p, i) => (
                <div key={i} className="flex items-center gap-2 py-2 border-b border-gray-50 last:border-0">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-bold">&#10003;</div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-gray-800">{p.description}</p>
                    <p className="text-[8px] text-gray-500">{p.date} &bull; {p.mode}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-800">{'\u20B9'}{p.amount.toLocaleString('en-IN')}</p>
                    <p className="text-[7px] text-emerald-600">{p.status}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-100">
              <p className="text-[10px] font-bold text-gray-800 mb-2">Upcoming Installments</p>
              {fees.upcoming.map((u, i) => (
                <div key={i} className="flex items-center gap-2 py-2 border-b border-gray-50 last:border-0">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center text-[10px]">&#128197;</div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-gray-800">{u.installment}</p>
                    <p className="text-[8px] text-gray-500">Due: {u.dueDate}</p>
                  </div>
                  <p className="text-[10px] font-bold text-gray-800">{'\u20B9'}{u.amount.toLocaleString('en-IN')}</p>
                </div>
              ))}
            </div>

            <button className="w-full py-2.5 bg-blue-600 text-white text-[11px] font-bold rounded-xl flex items-center justify-center gap-1">
              &#128196; Download Receipt PDF
            </button>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-2.5 flex items-center gap-2">
              <span className="text-blue-500 text-sm">&#128276;</span>
              <div className="flex-1"><p className="text-[10px] font-bold text-blue-800">Payment Reminders On</p><p className="text-[8px] text-blue-600">Get notified 5 days before due date</p></div>
            </div>
          </MobileFrame>
        </div>
      } />
      <p className="text-[10px] text-amber-600 mb-2">Fee policy per SSA: Due 10th monthly · Late fee Rs.50/day (7-day grace) · Blocking: Report card if &gt;60 days overdue</p>

      {activeTab === 'Overview' && (
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-3">
            <StatCard icon={IndianRupee} label="Total Annual Fee" value={`Rs.${fees.totalAnnual.toLocaleString('en-IN')}`} color="bg-blue-500" theme={theme} />
            <StatCard icon={CheckCircle} label="Total Paid" value={`Rs.${fees.totalPaid.toLocaleString('en-IN')}`} color="bg-emerald-500" sub={`${Math.round((fees.totalPaid / fees.totalAnnual) * 100)}% paid`} theme={theme} />
            <StatCard icon={AlertTriangle} label="Current Due" value={fees.currentDue > 0 ? `Rs.${fees.currentDue.toLocaleString('en-IN')}` : 'Nil'} color={fees.currentDue > 0 ? 'bg-red-500' : 'bg-emerald-500'} theme={theme} />
            <StatCard icon={Calendar} label="Next Due Date" value={fees.nextDueDate} color="bg-purple-500" sub={`Rs.${fees.nextDueAmount.toLocaleString('en-IN')}`} theme={theme} />
          </div>

          {/* Progress */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Payment Progress</h3>
            <div className={`h-4 rounded-full ${theme.secondaryBg} overflow-hidden`}>
              <div className="h-4 rounded-full bg-emerald-500 transition-all flex items-center justify-center" style={{ width: `${(fees.totalPaid / fees.totalAnnual) * 100}%` }}>
                <span className="text-[9px] font-bold text-white">{Math.round((fees.totalPaid / fees.totalAnnual) * 100)}%</span>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <span className={`text-[10px] ${theme.iconColor}`}>Rs.0</span>
              <span className={`text-[10px] ${theme.iconColor}`}>Rs.{fees.totalAnnual.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Upcoming installments preview */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Upcoming Installments</h3>
            {fees.upcoming.map((inst, i) => (
              <div key={i} className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg} ${i > 0 ? 'mt-2' : ''}`}>
                <div className="flex items-center gap-3">
                  <Calendar size={14} className={theme.iconColor} />
                  <div>
                    <p className={`text-xs font-bold ${theme.highlight}`}>{inst.installment}</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>Due: {inst.dueDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${theme.highlight}`}>Rs.{inst.amount.toLocaleString('en-IN')}</p>
                  <StatusBadge status={inst.status} theme={theme} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Payment History' && (
        <DataTable
          headers={['Date', 'Description', 'Amount', 'Mode', 'Receipt No.', 'Status', 'Action']}
          rows={fees.payments.map(p => [
            <span key="dt" className={`text-xs ${theme.iconColor}`}>{p.date}</span>,
            <span key="desc" className={`font-bold ${theme.highlight}`}>{p.description}</span>,
            <span key="amt" className={`font-bold ${theme.highlight}`}>Rs.{p.amount.toLocaleString('en-IN')}</span>,
            <span key="mode" className={`text-xs ${theme.iconColor}`}>{p.mode}</span>,
            <span key="rec" className={`text-xs font-mono ${theme.primaryText}`}>{p.receiptNo}</span>,
            <StatusBadge key="st" status={p.status} theme={theme} />,
            <button key="dl" className={`flex items-center gap-1 text-xs ${theme.primaryText} font-bold`}>
              <Download size={12} /> Receipt
            </button>,
          ])}
          theme={theme}
        />
      )}

      {activeTab === 'Upcoming' && (
        <div className="space-y-3">
          {fees.upcoming.map((inst, i) => (
            <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`text-sm font-bold ${theme.highlight}`}>{inst.installment}</h3>
                  <p className={`text-xs ${theme.iconColor} mt-1`}>Due Date: {inst.dueDate}</p>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${theme.highlight}`}>Rs.{inst.amount.toLocaleString('en-IN')}</p>
                  <button className="mt-1 px-4 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition-all">
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'Fee Structure' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-4`}>Annual Fee Breakdown - Class {child.class}</h3>
          <div className="space-y-3">
            {fees.breakdown.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    i === 0 ? 'bg-blue-500' : i === 1 ? 'bg-emerald-500' : i === 2 ? 'bg-purple-500' : i === 3 ? 'bg-amber-500' : 'bg-pink-500'
                  }`} />
                  <span className={`text-sm ${theme.highlight}`}>{item.head}</span>
                </div>
                <span className={`text-sm font-bold ${theme.highlight}`}>Rs.{item.amount.toLocaleString('en-IN')}</span>
              </div>
            ))}
            <div className={`pt-3 mt-3 border-t ${theme.border} flex items-center justify-between`}>
              <span className={`text-sm font-bold ${theme.highlight}`}>Total Annual Fee</span>
              <span className={`text-lg font-bold ${theme.primaryText}`}>Rs.{fees.totalAnnual.toLocaleString('en-IN')}</span>
            </div>
          </div>
          {/* Visual bar */}
          <div className="flex rounded-full h-3 overflow-hidden mt-4">
            {fees.breakdown.map((item, i) => (
              <div
                key={i}
                className={`h-3 ${
                  i === 0 ? 'bg-blue-500' : i === 1 ? 'bg-emerald-500' : i === 2 ? 'bg-purple-500' : i === 3 ? 'bg-amber-500' : 'bg-pink-500'
                }`}
                style={{ width: `${(item.amount / fees.totalAnnual) * 100}%` }}
                title={`${item.head}: Rs.${item.amount.toLocaleString('en-IN')}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── TAB: Multi-Year Fee Ledger ── */}
      {activeTab === 'Ledger' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Fee Ledger</h3>
              <InfoTip tip="Complete fee history across all academic years" />
              <MobileBadge />
            </div>
            <div className="flex items-center gap-3">
              <select
                value={ledgerYear}
                onChange={e => setLedgerYear(e.target.value)}
                className={`px-3 py-1.5 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.highlight}`}
              >
                <option value="2025-26">2025-26</option>
                <option value="2024-25">2024-25</option>
                <option value="2023-24">2023-24</option>
              </select>
              <button onClick={() => alert('Download Statement (Blueprint demo)')} className={`flex items-center gap-1 px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}>
                <Download size={12} /> Download Statement
              </button>
            </div>
          </div>

          <div className={`overflow-hidden rounded-xl border ${theme.border}`}>
            <table className="w-full text-xs">
              <thead><tr className={theme.secondaryBg}>
                <th className={`p-2.5 text-left font-bold ${theme.iconColor} uppercase`}>Date</th>
                <th className={`p-2.5 text-left font-bold ${theme.iconColor} uppercase`}>Description</th>
                <th className={`p-2.5 text-right font-bold ${theme.iconColor} uppercase`}>Debit (Rs.)</th>
                <th className={`p-2.5 text-right font-bold ${theme.iconColor} uppercase`}>Credit (Rs.)</th>
                <th className={`p-2.5 text-right font-bold ${theme.iconColor} uppercase`}>Balance</th>
                <th className={`p-2.5 text-left font-bold ${theme.iconColor} uppercase`}>Receipt #</th>
              </tr></thead>
              <tbody>
                {(ledgerData[ledgerYear] || []).map((entry, i) => (
                  <tr key={i} className={`border-t ${theme.border}`}>
                    <td className={`p-2.5 ${theme.iconColor}`}>{entry.date}</td>
                    <td className={`p-2.5 font-bold ${theme.highlight}`}>{entry.description}</td>
                    <td className={`p-2.5 text-right ${entry.debit > 0 ? 'text-red-600 font-bold' : theme.iconColor}`}>
                      {entry.debit > 0 ? `Rs.${entry.debit.toLocaleString('en-IN')}` : '-'}
                    </td>
                    <td className={`p-2.5 text-right ${entry.credit > 0 ? 'text-emerald-600 font-bold' : theme.iconColor}`}>
                      {entry.credit > 0 ? `Rs.${entry.credit.toLocaleString('en-IN')}` : '-'}
                    </td>
                    <td className={`p-2.5 text-right font-bold ${entry.balance > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                      Rs.{entry.balance.toLocaleString('en-IN')}
                    </td>
                    <td className={`p-2.5 font-mono ${theme.primaryText}`}>{entry.receipt || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Multi-Child Consolidated Invoice */}
          <div className={`${theme.cardBg} rounded-2xl border-2 border-dashed ${theme.border} p-5`}>
            <div className="flex items-center gap-1 mb-3">
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Consolidated Invoice</h3>
              <InfoTip tip="Single payment for all children's fees" />
              <MobileBadge />
            </div>
            <div className="space-y-2">
              <div className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>Arjun Patel (Class 5-A)</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Term 4 - Tuition + Transport</p>
                </div>
                <span className={`text-sm font-bold ${theme.highlight}`}>Rs.45,000</span>
              </div>
              <div className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>Priya Patel (Class 3-B)</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Term 4 - Tuition + Transport</p>
                </div>
                <span className={`text-sm font-bold ${theme.highlight}`}>Rs.38,000</span>
              </div>
              <div className={`flex items-center justify-between p-3 rounded-xl border-t-2 ${theme.border} mt-2 pt-3`}>
                <span className={`text-sm font-bold ${theme.highlight}`}>Total Combined Due</span>
                <span className={`text-lg font-bold ${theme.primaryText}`}>Rs.83,000</span>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={() => alert('Pay Combined (Blueprint demo)')} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all">
                <CreditCard size={14} /> Pay Combined
              </button>
              <button onClick={() => alert('Download Consolidated Receipt (Blueprint demo)')} className={`flex items-center gap-1.5 px-4 py-2 rounded-xl ${theme.secondaryBg} ${theme.highlight} text-xs font-bold ${theme.buttonHover}`}>
                <Download size={14} /> Download Consolidated Receipt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: Scholarships ── */}
      {activeTab === 'Scholarships' && (
        <div className="space-y-4">
          <div className="flex items-center gap-1">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Available Scholarships</h3>
            <InfoTip tip="Browse and apply for available scholarships" />
            <MobileBadge />
          </div>

          {/* Scholarship Schemes */}
          <div className="space-y-3">
            {scholarships.map((s, i) => (
              <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 flex items-center justify-between`}>
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl ${i === 0 ? 'bg-amber-500' : i === 1 ? 'bg-emerald-500' : 'bg-blue-500'} flex items-center justify-center text-white`}>
                    <Award size={16} />
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${theme.highlight}`}>{s.name}</p>
                    <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>{s.criteria}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className={`text-[10px] font-bold ${theme.primaryText}`}>
                        {s.amountLabel || `Rs.${s.amount.toLocaleString('en-IN')}`}
                      </span>
                      <span className={`text-[10px] ${theme.iconColor}`}>{s.eligibility}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => { setScholarshipScheme(s.name); setShowScholarshipForm(true); }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}
                >
                  <FileText size={12} /> Apply
                </button>
              </div>
            ))}
          </div>

          {/* Scholarship Application Form Modal */}
          {showScholarshipForm && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowScholarshipForm(false)}>
              <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 w-full max-w-lg shadow-xl`} onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg font-bold ${theme.highlight}`}>Apply for Scholarship</h3>
                  <button onClick={() => setShowScholarshipForm(false)} className={`p-1.5 rounded-lg ${theme.buttonHover} ${theme.iconColor}`}>
                    <AlertTriangle size={16} />
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Scholarship Scheme</label>
                    <div className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs font-bold ${theme.highlight}`}>{scholarshipScheme}</div>
                  </div>
                  <div>
                    <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Student</label>
                    <div className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}>{child.name} - Class {child.class}-{child.section}</div>
                  </div>
                  <div>
                    <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Supporting Documents</label>
                    <div className={`w-full px-4 py-4 rounded-xl border-2 border-dashed ${theme.border} text-center cursor-pointer ${theme.buttonHover} transition-all`}>
                      <Upload size={20} className={`${theme.iconColor} mx-auto mb-1`} />
                      <p className={`text-[10px] ${theme.iconColor}`}>Click to upload income proof, marksheet, or certificates</p>
                    </div>
                  </div>
                  <label className={`flex items-center gap-2.5 p-3 rounded-xl ${theme.secondaryBg} cursor-pointer`}>
                    <input type="checkbox" className="w-4 h-4 rounded accent-blue-600" />
                    <span className={`text-xs ${theme.highlight}`}>I declare that all information provided is true and correct</span>
                  </label>
                  <button
                    onClick={() => { alert('Scholarship application submitted! (Blueprint demo)'); setShowScholarshipForm(false); }}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}
                  >
                    <CheckCircle size={14} /> Submit Application
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* My Applications */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>My Applications</h3>
            <div className={`overflow-hidden rounded-xl border ${theme.border}`}>
              <table className="w-full text-xs">
                <thead><tr className={theme.secondaryBg}>
                  <th className={`p-2.5 text-left font-bold ${theme.iconColor} uppercase`}>Scheme</th>
                  <th className={`p-2.5 text-left font-bold ${theme.iconColor} uppercase`}>Applied</th>
                  <th className={`p-2.5 text-center font-bold ${theme.iconColor} uppercase`}>Amount</th>
                  <th className={`p-2.5 text-center font-bold ${theme.iconColor} uppercase`}>Status</th>
                </tr></thead>
                <tbody>
                  {myScholarshipApps.map((app, i) => (
                    <tr key={i} className={`border-t ${theme.border}`}>
                      <td className={`p-2.5 font-bold ${theme.highlight}`}>{app.scheme}</td>
                      <td className={`p-2.5 ${theme.iconColor}`}>{app.appliedDate}</td>
                      <td className={`p-2.5 text-center font-bold ${theme.highlight}`}>{app.amount}</td>
                      <td className="p-2.5 text-center">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          app.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>{app.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
