'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { StatusBadge, TabBar, DataTable } from '@/components/shared';
import { mockStudents } from '@/lib/mock-data';
import { ArrowLeft, User, CheckCircle, XCircle, Download } from 'lucide-react';

export default function StudentProfileView({ theme, student, onBack }: { theme: Theme; student: typeof mockStudents[0]; onBack: () => void }) {
  const [profileTab, setProfileTab] = useState('Personal');
  const mockFeeHistory = [
    { month: 'Jan 2026', amount: '₹5,800', status: 'Paid', receipt: 'REC-2026-0412' },
    { month: 'Dec 2025', amount: '₹5,800', status: 'Paid', receipt: 'REC-2025-1198' },
    { month: 'Nov 2025', amount: '₹5,800', status: 'Paid', receipt: 'REC-2025-1045' },
    { month: 'Oct 2025', amount: '₹5,800', status: 'Overdue', receipt: '—' },
    { month: 'Sep 2025', amount: '₹5,800', status: 'Paid', receipt: 'REC-2025-0801' },
  ];
  const mockDocuments = [
    { name: 'Birth Certificate', uploaded: true },
    { name: 'Aadhaar Card', uploaded: true },
    { name: 'Transfer Certificate', uploaded: false },
    { name: 'Previous Marksheet', uploaded: true },
    { name: 'Passport Photo', uploaded: true },
    { name: 'Caste Certificate', uploaded: false },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className={`p-2 rounded-xl ${theme.secondaryBg} ${theme.buttonHover}`}><ArrowLeft size={16} className={theme.iconColor} /></button>
        <div className="flex-1">
          <h1 className={`text-2xl font-bold ${theme.highlight}`}>{student.name}</h1>
          <p className={`text-xs ${theme.iconColor}`}>{student.id} &bull; {student.class} &bull; Roll #{student.roll}</p>
        </div>
        <StatusBadge status={student.fee} theme={theme} />
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex items-center gap-5`}>
        <div className={`w-20 h-24 rounded-xl ${theme.accentBg} flex items-center justify-center`}>
          <User size={32} className={theme.iconColor} />
        </div>
        <div className="grid grid-cols-4 gap-x-8 gap-y-2 flex-1">
          <div><p className={`text-[10px] ${theme.iconColor}`}>Class & Section</p><p className={`text-sm font-bold ${theme.highlight}`}>{student.class}</p></div>
          <div><p className={`text-[10px] ${theme.iconColor}`}>Admission No</p><p className={`text-sm font-bold ${theme.highlight}`}>{student.id}</p></div>
          <div><p className={`text-[10px] ${theme.iconColor}`}>Parent</p><p className={`text-sm font-bold ${theme.highlight}`}>{student.parent}</p></div>
          <div><p className={`text-[10px] ${theme.iconColor}`}>Phone</p><p className={`text-sm font-bold ${theme.highlight}`}>{student.phone}</p></div>
        </div>
      </div>

      <TabBar tabs={['Personal', 'Academic', 'Medical', 'Documents', 'Fee History']} active={profileTab} onChange={setProfileTab} theme={theme} />

      {profileTab === 'Personal' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: 'Full Name', value: student.name },
              { label: 'Date of Birth', value: '15-Mar-2012' },
              { label: 'Gender', value: student.gender === 'M' ? 'Male' : 'Female' },
              { label: 'Blood Group', value: 'B+' },
              { label: 'Religion', value: 'Hindu' },
              { label: 'Category', value: 'General' },
              { label: 'Mother Tongue', value: 'Gujarati' },
              { label: 'Father Name', value: student.parent },
              { label: 'Mother Name', value: 'Sunita ' + student.name.split(' ')[1] },
              { label: 'Primary Contact', value: student.phone },
              { label: 'Email', value: student.name.split(' ')[0].toLowerCase() + '@email.com' },
              { label: 'Address', value: 'Satellite Road, Ahmedabad' },
            ].map(item => (
              <div key={item.label}>
                <p className={`text-[10px] ${theme.iconColor} mb-0.5`}>{item.label}</p>
                <p className={`text-xs font-bold ${theme.highlight}`}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {profileTab === 'Academic' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: 'Class', value: student.class.split('-')[0] },
              { label: 'Section', value: student.class.split('-')[1] || 'A' },
              { label: 'Roll Number', value: String(student.roll) },
              { label: 'House', value: 'Blue House' },
              { label: 'Admission Date', value: '01-Apr-2020' },
              { label: 'Previous School', value: 'DPS Ahmedabad' },
              { label: 'Board', value: 'CBSE' },
              { label: 'Stream', value: student.class.startsWith('1') ? 'Science' : 'N/A' },
              { label: 'Academic Year', value: '2025-26' },
            ].map(item => (
              <div key={item.label}>
                <p className={`text-[10px] ${theme.iconColor} mb-0.5`}>{item.label}</p>
                <p className={`text-xs font-bold ${theme.highlight}`}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {profileTab === 'Medical' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: 'Blood Group', value: 'B+' },
              { label: 'Allergies', value: 'None reported' },
              { label: 'Medical Conditions', value: 'None' },
              { label: 'Regular Medications', value: 'None' },
              { label: 'Family Doctor', value: 'Dr. R. Mehta' },
              { label: 'Doctor Contact', value: '98765 11223' },
              { label: 'Emergency Contact', value: student.phone },
              { label: 'Insurance', value: 'Star Health — Policy #SH20250134' },
              { label: 'Last Health Check', value: '10-Oct-2025' },
            ].map(item => (
              <div key={item.label}>
                <p className={`text-[10px] ${theme.iconColor} mb-0.5`}>{item.label}</p>
                <p className={`text-xs font-bold ${theme.highlight}`}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {profileTab === 'Documents' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {mockDocuments.map(doc => (
              <div key={doc.name} className={`flex items-center gap-3 p-3 rounded-xl ${theme.secondaryBg}`}>
                <div className={`w-8 h-8 rounded-lg ${doc.uploaded ? 'bg-emerald-100' : 'bg-red-100'} flex items-center justify-center`}>
                  {doc.uploaded ? <CheckCircle size={14} className="text-emerald-600" /> : <XCircle size={14} className="text-red-500" />}
                </div>
                <div className="flex-1">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{doc.name}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{doc.uploaded ? 'Uploaded' : 'Not uploaded'}</p>
                </div>
                {doc.uploaded && <button className={`p-1 rounded-lg ${theme.buttonHover}`}><Download size={12} className={theme.iconColor} /></button>}
              </div>
            ))}
          </div>
        </div>
      )}

      {profileTab === 'Fee History' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
          <DataTable
            headers={['Month', 'Amount', 'Status', 'Receipt']}
            rows={mockFeeHistory.map(f => [
              <span key="m" className={`font-bold ${theme.highlight}`}>{f.month}</span>,
              <span key="a" className={theme.iconColor}>{f.amount}</span>,
              <StatusBadge key="s" status={f.status} theme={theme} />,
              <span key="r" className={`font-mono text-xs ${f.receipt === '—' ? theme.iconColor : theme.primaryText}`}>{f.receipt}</span>,
            ])}
            theme={theme}
          />
        </div>
      )}
    </div>
  );
}
