'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { StatCard, StatusBadge, TabBar, SearchBar, DataTable } from '@/components/shared';
import { mockStudents, feeStructure } from '@/lib/mock-data';
import { Banknote, Clock, AlertTriangle, TrendingUp, Plus, Search, Receipt } from 'lucide-react';
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
        <DataTable
          headers={['Class Range', 'Tuition (₹/month)', 'Transport', 'Activity', 'Total Monthly']}
          rows={feeStructure.map(f => [
            <span key="cls" className={`font-bold ${theme.highlight}`}>{f.cls}</span>,
            <span key="t" className={theme.iconColor}>₹{f.tuition.toLocaleString()}</span>,
            <span key="tr" className={theme.iconColor}>₹{f.transport.toLocaleString()}</span>,
            <span key="a" className={theme.iconColor}>₹{f.activity.toLocaleString()}</span>,
            <span key="total" className={`font-bold ${theme.highlight}`}>₹{f.total.toLocaleString()}</span>,
          ])}
          theme={theme}
        />
      )}
      {tab === 'Collection' && (
        <div className="space-y-3">
          <div className="flex gap-3">
            <SearchBar placeholder="Search student by name or ID..." theme={theme} icon={Search} />
            <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> Record Payment</button>
          </div>
          <DataTable
            headers={['Student', 'Class', 'Annual Fee', 'Paid', 'Balance', 'Status', '']}
            rows={mockStudents.slice(0, 5).map(s => [
              <span key="name" className={`font-bold ${theme.highlight}`}>{s.name}</span>,
              <span key="class" className={theme.iconColor}>{s.class}</span>,
              <span key="annual" className={theme.iconColor}>₹69,600</span>,
              <span key="paid" className="text-emerald-600 font-bold">₹{s.fee === 'Paid' ? '69,600' : s.fee === 'Pending' ? '34,800' : '23,200'}</span>,
              <span key="bal" className={s.fee !== 'Paid' ? 'text-red-500 font-bold' : theme.iconColor}>₹{s.fee === 'Paid' ? '0' : s.fee === 'Pending' ? '34,800' : '46,400'}</span>,
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
