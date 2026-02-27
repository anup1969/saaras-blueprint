'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { StatCard, StatusBadge, TabBar, DataTable } from '@/components/shared';
import { mockEnquiries } from '@/lib/mock-data';
import { UserPlus, Clock, CheckCircle, TrendingUp, Plus, Eye, X, UserCheck } from 'lucide-react';
import { FormField, InputField, SelectField, TextAreaField } from '../_components/FormHelpers';

export default function EnquiriesModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All Enquiries');
  const [showNewEnquiry, setShowNewEnquiry] = useState(false);
  const [convertEnquiry, setConvertEnquiry] = useState<typeof mockEnquiries[0] | null>(null);

  // New enquiry form state
  const [enqForm, setEnqForm] = useState({ studentName: '', dob: '', gender: '', classSeeking: '', parentName: '', phone: '', email: '', source: '', notes: '' });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Enquiry Management</h1>
        <button onClick={() => setShowNewEnquiry(true)} className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> New Enquiry</button>
      </div>
      <TabBar tabs={['All Enquiries', 'New', 'Follow-up', 'Converted', 'Lost']} active={tab} onChange={setTab} theme={theme} />
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={UserPlus} label="Total Enquiries" value="45" color="bg-blue-500" theme={theme} />
        <StatCard icon={Clock} label="Pending Follow-up" value="12" color="bg-amber-500" theme={theme} />
        <StatCard icon={CheckCircle} label="Converted" value="28" color="bg-emerald-500" theme={theme} />
        <StatCard icon={TrendingUp} label="Conversion Rate" value="62%" color="bg-purple-500" theme={theme} />
      </div>
      <DataTable
        headers={['ID', 'Child Name', 'Class', 'Parent', 'Source', 'Date', 'Status', 'Phone', '']}
        rows={mockEnquiries.map(e => [
          <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{e.id}</span>,
          <span key="name" className={`font-bold ${theme.highlight}`}>{e.child}</span>,
          <span key="class" className={theme.iconColor}>{e.class}</span>,
          <span key="parent" className={theme.iconColor}>{e.parent}</span>,
          <span key="source" className={theme.iconColor}>{e.source}</span>,
          <span key="date" className={theme.iconColor}>{e.date}</span>,
          <StatusBadge key="status" status={e.status} theme={theme} />,
          <span key="phone" className={theme.iconColor}>{e.phone}</span>,
          <div key="action" className="flex gap-1">
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
            {(e.status === 'New' || e.status === 'Follow-up') && (
              <button onClick={() => setConvertEnquiry(e)} className="px-2 py-1 rounded-lg bg-emerald-100 text-emerald-700 text-[10px] font-bold">Convert</button>
            )}
          </div>
        ])}
        theme={theme}
      />

      {/* New Enquiry Modal */}
      {showNewEnquiry && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowNewEnquiry(false)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} shadow-2xl w-full max-w-lg p-6 space-y-4 max-h-[85vh] overflow-y-auto`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className={`text-lg font-bold ${theme.highlight}`}>New Enquiry</h2>
              <button onClick={() => setShowNewEnquiry(false)} className={`p-1.5 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Student Name" required theme={theme}>
                <InputField placeholder="Full name" value={enqForm.studentName} onChange={v => setEnqForm(p => ({ ...p, studentName: v }))} theme={theme} />
              </FormField>
              <FormField label="Date of Birth" theme={theme}>
                <InputField type="date" value={enqForm.dob} onChange={v => setEnqForm(p => ({ ...p, dob: v }))} theme={theme} />
              </FormField>
              <FormField label="Gender" theme={theme}>
                <SelectField options={['Male', 'Female', 'Other']} value={enqForm.gender} onChange={v => setEnqForm(p => ({ ...p, gender: v }))} theme={theme} placeholder="Select" />
              </FormField>
              <FormField label="Class Seeking" required theme={theme}>
                <SelectField options={['Nursery', 'LKG', 'UKG', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th']} value={enqForm.classSeeking} onChange={v => setEnqForm(p => ({ ...p, classSeeking: v }))} theme={theme} placeholder="Select class" />
              </FormField>
              <FormField label="Parent Name" required theme={theme}>
                <InputField placeholder="Father/Mother/Guardian name" value={enqForm.parentName} onChange={v => setEnqForm(p => ({ ...p, parentName: v }))} theme={theme} />
              </FormField>
              <FormField label="Phone" required theme={theme}>
                <InputField placeholder="10-digit mobile" value={enqForm.phone} onChange={v => setEnqForm(p => ({ ...p, phone: v }))} theme={theme} />
              </FormField>
              <FormField label="Email" theme={theme}>
                <InputField placeholder="email@example.com" type="email" value={enqForm.email} onChange={v => setEnqForm(p => ({ ...p, email: v }))} theme={theme} />
              </FormField>
              <FormField label="Source" required theme={theme}>
                <SelectField options={['Walk-in', 'Phone', 'Website', 'Referral']} value={enqForm.source} onChange={v => setEnqForm(p => ({ ...p, source: v }))} theme={theme} placeholder="Select source" />
              </FormField>
            </div>
            <FormField label="Notes" theme={theme}>
              <TextAreaField placeholder="Any additional notes about the enquiry..." value={enqForm.notes} onChange={v => setEnqForm(p => ({ ...p, notes: v }))} theme={theme} rows={3} />
            </FormField>
            <div className="flex gap-2">
              <button onClick={() => setShowNewEnquiry(false)} className={`flex-1 py-2.5 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.highlight} ${theme.buttonHover}`}>Cancel</button>
              <button onClick={() => { window.alert('Enquiry created for ' + (enqForm.studentName || 'student') + '! (Blueprint demo)'); setShowNewEnquiry(false); setEnqForm({ studentName: '', dob: '', gender: '', classSeeking: '', parentName: '', phone: '', email: '', source: '', notes: '' }); }} className={`flex-1 py-2.5 rounded-xl ${theme.primary} text-white text-sm font-bold`}>Create Enquiry</button>
            </div>
          </div>
        </div>
      )}

      {/* Convert Enquiry to Admission Modal */}
      {convertEnquiry && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setConvertEnquiry(null)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} shadow-2xl w-full max-w-lg p-6 space-y-4`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white`}><UserCheck size={18} /></div>
                <h2 className={`text-lg font-bold ${theme.highlight}`}>Convert to Admission</h2>
              </div>
              <button onClick={() => setConvertEnquiry(null)} className={`p-1.5 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg} text-xs ${theme.iconColor}`}>
              Converting enquiry <strong className={theme.primaryText}>{convertEnquiry.id}</strong> to a confirmed admission.
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Student Name" theme={theme}>
                <InputField value={convertEnquiry.child} onChange={() => {}} theme={theme} readOnly />
              </FormField>
              <FormField label="Class" theme={theme}>
                <InputField value={convertEnquiry.class} onChange={() => {}} theme={theme} readOnly />
              </FormField>
              <FormField label="Parent Name" theme={theme}>
                <InputField value={convertEnquiry.parent} onChange={() => {}} theme={theme} readOnly />
              </FormField>
              <FormField label="Phone" theme={theme}>
                <InputField value={convertEnquiry.phone} onChange={() => {}} theme={theme} readOnly />
              </FormField>
              <FormField label="Admission Number" theme={theme}>
                <InputField value={'ADM-2026-' + String(Math.floor(Math.random() * 9000) + 1000)} onChange={() => {}} theme={theme} readOnly />
              </FormField>
              <FormField label="Section" theme={theme}>
                <SelectField options={['A', 'B', 'C', 'D']} value="" onChange={() => {}} theme={theme} placeholder="Select section" />
              </FormField>
              <FormField label="Fee Plan" theme={theme}>
                <SelectField options={['Standard', 'Sibling Discount', 'Merit Scholarship', 'Staff Child']} value="" onChange={() => {}} theme={theme} placeholder="Select plan" />
              </FormField>
              <FormField label="Admission Date" theme={theme}>
                <InputField type="date" value="2026-02-25" onChange={() => {}} theme={theme} />
              </FormField>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setConvertEnquiry(null)} className={`flex-1 py-2.5 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.highlight} ${theme.buttonHover}`}>Cancel</button>
              <button onClick={() => { window.alert('Enquiry ' + convertEnquiry.id + ' converted to admission for ' + convertEnquiry.child + '! (Blueprint demo)'); setConvertEnquiry(null); }} className={`flex-1 py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-bold`}>Confirm Admission</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
