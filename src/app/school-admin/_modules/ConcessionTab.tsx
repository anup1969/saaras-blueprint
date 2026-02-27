'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { StatusBadge, DataTable } from '@/components/shared';
import { Plus, X } from 'lucide-react';
import { FormField, InputField, SelectField, TextAreaField } from '../_components/FormHelpers';

export default function ConcessionTab({ theme }: { theme: Theme }) {
  const [showForm, setShowForm] = useState(false);
  const [concForm, setConcForm] = useState({ student: '', type: '', amount: '', reason: '', approvedBy: '' });

  const concessions = [
    { student: 'Riya Sharma', class: '5-A', type: 'Sibling Discount', amount: '10%', status: 'Approved' },
    { student: 'Aarav Patel', class: '10-A', type: 'Merit Scholarship', amount: '₹15,000', status: 'Approved' },
    { student: 'Meera Nair', class: '7-C', type: 'Staff Child', amount: '50%', status: 'Approved' },
    { student: 'Zara Khan', class: '8-B', type: 'Economic Hardship', amount: '25%', status: 'Pending' },
    { student: 'Kabir Joshi', class: '3-A', type: 'Sibling Discount', amount: '10%', status: 'Approved' },
    { student: 'Prachi Mehta', class: '6-B', type: 'Merit Scholarship', amount: '₹10,000', status: 'Pending' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className={`text-xs ${theme.iconColor}`}>Manage fee concessions, scholarships, and discounts</p>
        <button onClick={() => setShowForm(true)} className={`px-3 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold flex items-center gap-1`}><Plus size={12} /> Apply Concession</button>
      </div>
      <DataTable
        headers={['Student', 'Class', 'Concession Type', 'Amount / %', 'Status']}
        rows={concessions.map(c => [
          <span key="s" className={`font-bold ${theme.highlight}`}>{c.student}</span>,
          <span key="c" className={theme.iconColor}>{c.class}</span>,
          <span key="t" className={theme.iconColor}>{c.type}</span>,
          <span key="a" className={`font-bold ${theme.primaryText}`}>{c.amount}</span>,
          <StatusBadge key="st" status={c.status === 'Approved' ? 'Active' : 'Pending'} theme={theme} />,
        ])}
        theme={theme}
      />

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} shadow-2xl w-full max-w-md p-6 space-y-4`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className={`text-lg font-bold ${theme.highlight}`}>Apply Concession</h2>
              <button onClick={() => setShowForm(false)} className={`p-1.5 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Student" required theme={theme}>
                <InputField placeholder="Search student..." value={concForm.student} onChange={v => setConcForm(p => ({ ...p, student: v }))} theme={theme} />
              </FormField>
              <FormField label="Concession Type" required theme={theme}>
                <SelectField options={['Sibling Discount', 'Merit Scholarship', 'Staff Child', 'Economic Hardship', 'Sports Quota', 'Other']} value={concForm.type} onChange={v => setConcForm(p => ({ ...p, type: v }))} theme={theme} placeholder="Select type" />
              </FormField>
              <FormField label="Amount / %" required theme={theme}>
                <InputField placeholder="e.g. 10% or ₹5000" value={concForm.amount} onChange={v => setConcForm(p => ({ ...p, amount: v }))} theme={theme} />
              </FormField>
              <FormField label="Approved By" theme={theme}>
                <SelectField options={['Principal', 'Admin', 'Trustee']} value={concForm.approvedBy} onChange={v => setConcForm(p => ({ ...p, approvedBy: v }))} theme={theme} placeholder="Select" />
              </FormField>
            </div>
            <FormField label="Reason" theme={theme}>
              <TextAreaField placeholder="Reason for concession..." value={concForm.reason} onChange={v => setConcForm(p => ({ ...p, reason: v }))} theme={theme} rows={2} />
            </FormField>
            <div className="flex gap-2">
              <button onClick={() => setShowForm(false)} className={`flex-1 py-2.5 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.highlight}`}>Cancel</button>
              <button onClick={() => { window.alert('Concession applied for ' + (concForm.student || 'student') + '! (Blueprint demo)'); setShowForm(false); setConcForm({ student: '', type: '', amount: '', reason: '', approvedBy: '' }); }} className={`flex-1 py-2.5 rounded-xl ${theme.primary} text-white text-sm font-bold`}>Apply Concession</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
