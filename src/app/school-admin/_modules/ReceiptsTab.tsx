'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { DataTable } from '@/components/shared';
import { Download, Printer } from 'lucide-react';

export default function ReceiptsTab({ theme }: { theme: Theme }) {
  const [receiptSearch, setReceiptSearch] = useState('');

  const receipts = [
    { no: 'REC-2026-0501', student: 'Aarav Patel', class: '10-A', amount: '₹5,800', date: '25-Feb-2026', mode: 'UPI' },
    { no: 'REC-2026-0500', student: 'Riya Sharma', class: '5-A', amount: '₹4,200', date: '24-Feb-2026', mode: 'Cash' },
    { no: 'REC-2026-0499', student: 'Meera Nair', class: '7-C', amount: '₹5,200', date: '24-Feb-2026', mode: 'Bank Transfer' },
    { no: 'REC-2026-0498', student: 'Zara Khan', class: '8-B', amount: '₹5,800', date: '23-Feb-2026', mode: 'UPI' },
    { no: 'REC-2026-0497', student: 'Kabir Joshi', class: '3-A', amount: '₹3,600', date: '23-Feb-2026', mode: 'Cash' },
    { no: 'REC-2026-0496', student: 'Prachi Mehta', class: '6-B', amount: '₹4,800', date: '22-Feb-2026', mode: 'Cheque' },
    { no: 'REC-2026-0495', student: 'Arjun Singh', class: '10-A', amount: '₹5,800', date: '22-Feb-2026', mode: 'UPI' },
    { no: 'REC-2026-0494', student: 'Sanya Iyer', class: '1-A', amount: '₹3,200', date: '21-Feb-2026', mode: 'Cash' },
    { no: 'REC-2026-0493', student: 'Rohan Gupta', class: '6-A', amount: '₹4,800', date: '21-Feb-2026', mode: 'Bank Transfer' },
    { no: 'REC-2026-0492', student: 'Ananya Desai', class: '4-B', amount: '₹3,600', date: '20-Feb-2026', mode: 'UPI' },
  ];

  const filtered = receiptSearch
    ? receipts.filter(r => r.no.toLowerCase().includes(receiptSearch.toLowerCase()) || r.student.toLowerCase().includes(receiptSearch.toLowerCase()))
    : receipts;

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="flex-1">
          <input
            placeholder="Search by receipt number or student name..."
            value={receiptSearch}
            onChange={e => setReceiptSearch(e.target.value)}
            className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none focus:ring-2 focus:ring-slate-300`}
          />
        </div>
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Download size={12} /> Export All</button>
      </div>
      <DataTable
        headers={['Receipt No', 'Student', 'Class', 'Amount', 'Date', 'Payment Mode', '']}
        rows={filtered.map(r => [
          <span key="no" className={`font-mono text-xs ${theme.primaryText}`}>{r.no}</span>,
          <span key="s" className={`font-bold ${theme.highlight}`}>{r.student}</span>,
          <span key="c" className={theme.iconColor}>{r.class}</span>,
          <span key="a" className="text-emerald-600 font-bold">{r.amount}</span>,
          <span key="d" className={theme.iconColor}>{r.date}</span>,
          <span key="m" className={theme.iconColor}>{r.mode}</span>,
          <button key="print" onClick={() => window.alert('Printing receipt ' + r.no + '... (Blueprint demo)')} className={`px-2 py-1 rounded-lg ${theme.secondaryBg} text-[10px] font-bold ${theme.iconColor} flex items-center gap-1`}><Printer size={10} /> Print</button>,
        ])}
        theme={theme}
      />
      <div className={`flex items-center justify-between text-xs ${theme.iconColor} px-2`}>
        <span>Showing {filtered.length} of {receipts.length} receipts</span>
      </div>
    </div>
  );
}
