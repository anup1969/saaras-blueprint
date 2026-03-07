'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { StatCard, StatusBadge, TabBar, SearchBar, DataTable } from '@/components/shared';
import { mockStudents, feeStructure, feeHeads, paymentModes } from '@/lib/mock-data';
import { Banknote, Clock, AlertTriangle, TrendingUp, Plus, Search, Receipt, CheckCircle, XCircle, Info } from 'lucide-react';
import ConcessionTab from './ConcessionTab';
import ReceiptsTab from './ReceiptsTab';

export default function FeesModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Fee Structure');
  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Fees Management</h1>
      <TabBar tabs={['Fee Structure', 'Collection', 'Defaulters', 'Concessions', 'Receipts']} active={tab} onChange={setTab} theme={theme} />
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={Banknote} label="Total Collected" value="₹45.2L" color="bg-emerald-500" theme={theme} />
        <StatCard icon={Clock} label="Pending" value="₹17.8L" color="bg-amber-500" theme={theme} />
        <StatCard icon={AlertTriangle} label="Overdue" value="₹3.2L" color="bg-red-500" theme={theme} />
        <StatCard icon={TrendingUp} label="Collection %" value="72%" color="bg-blue-500" theme={theme} />
      </div>
      {tab === 'Fee Structure' && (
        <div className="space-y-6">
          {/* Fee Heads Table — rows = fee heads, columns = grade ranges */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Fee Heads by Grade Range (₹/month unless noted)</h3>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${theme.secondaryBg} ${theme.iconColor}`}>7 Active / 12 Total</span>
            </div>
            <div className={`rounded-xl overflow-hidden border ${theme.border}`}>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className={theme.secondaryBg}>
                      <th className={`text-left px-3 py-2 font-bold ${theme.highlight} sticky left-0 ${theme.secondaryBg} min-w-[180px]`}>Fee Head</th>
                      <th className={`text-center px-2 py-2 font-bold ${theme.highlight}`}>Type</th>
                      {feeStructure.map(f => (
                        <th key={f.cls} className={`text-right px-3 py-2 font-bold ${theme.highlight} min-w-[90px]`}>{f.cls}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {feeHeads.map((head, i) => (
                      <tr key={head.key} className={`border-t ${theme.border} ${i % 2 === 0 ? '' : theme.secondaryBg}`}>
                        <td className={`px-3 py-1.5 font-medium ${theme.iconColor} sticky left-0 ${i % 2 === 0 ? theme.cardBg || 'bg-white' : theme.secondaryBg}`}>
                          {head.label}
                          {head.note && <span className="text-[9px] text-amber-500 ml-1">({head.note})</span>}
                        </td>
                        <td className={`text-center px-2 py-1.5`}>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                            head.type === 'one-time' ? 'bg-purple-100 text-purple-600' :
                            head.type === 'annual' ? 'bg-blue-100 text-blue-600' :
                            head.type === 'quarterly' ? 'bg-orange-100 text-orange-600' :
                            'bg-gray-100 text-gray-500'
                          }`}>{head.type}</span>
                        </td>
                        {feeStructure.map(f => {
                          const amt = (f as Record<string, unknown>)[head.key] as number;
                          return (
                            <td key={f.cls} className={`text-right px-3 py-1.5 ${amt === 0 ? 'text-gray-300' : theme.iconColor}`}>
                              {amt === 0 ? '—' : `₹${amt.toLocaleString()}`}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                    {/* Total row */}
                    <tr className={`border-t-2 ${theme.border} font-bold`}>
                      <td className={`px-3 py-2 ${theme.highlight} sticky left-0 ${theme.secondaryBg}`}>Monthly Total</td>
                      <td></td>
                      {feeStructure.map(f => (
                        <td key={f.cls} className={`text-right px-3 py-2 ${theme.highlight}`}>₹{f.total.toLocaleString()}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <p className={`text-[10px] mt-1.5 flex items-center gap-1 ${theme.iconColor} opacity-70`}>
              <Info size={10} /> Fee structure: 7 active fee heads (12 total), 7 payment modes — configured by SSA
            </p>
          </div>

          {/* Payment Modes */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Accepted Payment Modes</h3>
            </div>
            <div className={`rounded-xl p-4 border ${theme.border} ${theme.secondaryBg}`}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {paymentModes.map(pm => (
                  <div key={pm.key} className={`flex items-center gap-2 px-3 py-2 rounded-lg ${pm.enabled ? (theme.cardBg || 'bg-white') : 'opacity-50'} border ${theme.border}`}>
                    {pm.enabled
                      ? <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                      : <XCircle size={14} className="text-gray-400 shrink-0" />}
                    <span className={`text-xs font-medium ${pm.enabled ? theme.iconColor : 'text-gray-400 line-through'}`}>{pm.label}</span>
                  </div>
                ))}
              </div>
              <p className={`text-[10px] mt-3 flex items-center gap-1 ${theme.iconColor} opacity-70`}>
                <Info size={10} /> Payment modes configured in SSA. Disabled modes will not appear at fee collection counters.
              </p>
            </div>
          </div>
        </div>
      )}
      {tab === 'Collection' && (
        <div className="space-y-3">
          <div className="flex gap-3">
            <SearchBar placeholder="Search student by name or ID..." theme={theme} icon={Search} />
            <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> Record Payment</button>
          </div>
          <DataTable
            headers={['Student', 'Class', 'Annual Fee', 'Paid', 'Balance', 'Mode', 'Status', '']}
            rows={mockStudents.slice(0, 5).map((s, i) => [
              <span key="name" className={`font-bold ${theme.highlight}`}>{s.name}</span>,
              <span key="class" className={theme.iconColor}>{s.class}</span>,
              <span key="annual" className={theme.iconColor}>₹69,600</span>,
              <span key="paid" className="text-emerald-600 font-bold">₹{s.fee === 'Paid' ? '69,600' : s.fee === 'Pending' ? '34,800' : '23,200'}</span>,
              <span key="bal" className={s.fee !== 'Paid' ? 'text-red-500 font-bold' : theme.iconColor}>₹{s.fee === 'Paid' ? '0' : s.fee === 'Pending' ? '34,800' : '46,400'}</span>,
              <span key="mode" className={`text-[10px] px-1.5 py-0.5 rounded-full ${theme.secondaryBg} ${theme.iconColor}`}>{['UPI', 'Cash', 'Cheque', 'Net Banking', 'UPI'][i % 5]}</span>,
              <StatusBadge key="status" status={s.fee} theme={theme} />,
              <button key="action" className={`px-2 py-1 rounded-lg text-[10px] font-bold ${theme.secondaryBg} ${theme.iconColor}`}><Receipt size={10} className="inline mr-1" />Receipt</button>,
            ])}
            theme={theme}
          />
        </div>
      )}
      {tab === 'Defaulters' && (
        <DataTable
          headers={['Student', 'Class', 'Outstanding', 'Overdue Since', 'Last Reminder', 'Action']}
          rows={[
            [<span key="n" className={`font-bold ${theme.highlight}`}>Arjun Singh</span>, <span key="c" className={theme.iconColor}>10-A</span>, <span key="o" className="text-red-500 font-bold">₹46,400</span>, <span key="d" className={theme.iconColor}>15-Nov-2025</span>, <span key="r" className={theme.iconColor}>SMS sent 3 days ago</span>, <button key="a" className="px-2 py-1 rounded-lg bg-amber-100 text-amber-700 text-[10px] font-bold">Send Reminder</button>],
            [<span key="n" className={`font-bold ${theme.highlight}`}>Zara Khan</span>, <span key="c" className={theme.iconColor}>8-B</span>, <span key="o" className="text-amber-500 font-bold">₹34,800</span>, <span key="d" className={theme.iconColor}>01-Dec-2025</span>, <span key="r" className={theme.iconColor}>WhatsApp sent 1 week ago</span>, <button key="a" className="px-2 py-1 rounded-lg bg-amber-100 text-amber-700 text-[10px] font-bold">Send Reminder</button>],
          ]}
          theme={theme}
        />
      )}
      {tab === 'Concessions' && <ConcessionTab theme={theme} />}
      {tab === 'Receipts' && <ReceiptsTab theme={theme} />}
    </div>
  );
}
