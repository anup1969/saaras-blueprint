'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { StatusBadge, TabBar, DataTable } from '@/components/shared';
import { mockStudents } from '@/lib/mock-data';
import { ArrowLeft, User, CheckCircle, XCircle, Download, Shield, Award, QrCode, Printer, AlertCircle, UserCheck, BookOpen } from 'lucide-react';

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
    { name: 'Birth Certificate', uploaded: true, verified: 'Yes' as const, verifiedBy: 'Mr. Desai', verifiedDate: '01-Apr-2022' },
    { name: 'Aadhaar Card', uploaded: true, verified: 'Yes' as const, verifiedBy: 'Mr. Desai', verifiedDate: '01-Apr-2022' },
    { name: 'Transfer Certificate', uploaded: false, verified: 'N/A' as const, verifiedBy: '—', verifiedDate: '—' },
    { name: 'Previous Marksheet', uploaded: true, verified: 'Pending' as const, verifiedBy: '—', verifiedDate: '—' },
    { name: 'Passport Photo', uploaded: true, verified: 'Yes' as const, verifiedBy: 'Ms. Shah', verifiedDate: '05-Apr-2022' },
    { name: 'Caste Certificate', uploaded: false, verified: 'N/A' as const, verifiedBy: '—', verifiedDate: '—' },
  ];

  const mockAcademicHistory = [
    { year: '2023-24', className: '8th', section: 'A', rollNo: 12, result: 'Promoted', attendance: '94.2%' },
    { year: '2024-25', className: '9th', section: 'A', rollNo: 8, result: 'Promoted', attendance: '91.8%' },
    { year: '2025-26', className: '10th', section: 'A', rollNo: student.roll, result: 'In Progress', attendance: '93.2%' },
  ];

  const mockAchievements = [
    { title: 'Science Fair - 1st Prize', type: 'Academic', date: 'Nov 2025', level: 'School', badge: 'Gold' },
    { title: 'Inter-School Cricket MVP', type: 'Sports', date: 'Sep 2025', level: 'District', badge: 'Gold' },
    { title: 'Debate Competition Winner', type: 'Co-curricular', date: 'Aug 2025', level: 'State', badge: 'Silver' },
    { title: 'Painting Competition - 2nd Place', type: 'Cultural', date: 'Jul 2025', level: 'School', badge: 'Silver' },
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

      {/* Gap #73 — Composite Risk Score */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center gap-2 mb-3">
          <Shield size={16} className={theme.primaryText} />
          <h3 className={`text-sm font-bold ${theme.highlight}`}>Composite Risk Assessment</h3>
          <span className="ml-auto text-xs px-3 py-1 rounded-full font-bold bg-emerald-100 text-emerald-700">Overall: 82% (Low Risk)</span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'Academic', score: 72 },
            { label: 'Attendance', score: 85 },
            { label: 'Behavioral', score: 90 },
            { label: 'Overall (Composite)', score: 82 },
          ].map(item => (
            <div key={item.label} className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-[10px] ${theme.iconColor} mb-1`}>{item.label}</p>
              <div className="flex items-center gap-2">
                <div className={`flex-1 h-2.5 rounded-full ${theme.accentBg} overflow-hidden`}>
                  <div className={`h-full rounded-full ${item.score >= 75 ? 'bg-emerald-500' : item.score >= 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${item.score}%` }} />
                </div>
                <span className={`text-xs font-bold ${theme.highlight}`}>{item.score}%</span>
              </div>
            </div>
          ))}
        </div>
        <div className={`mt-3 p-3 rounded-xl ${theme.accentBg}`}>
          <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Formula: Overall = (Academic x 0.4) + (Attendance x 0.3) + (Behavioral x 0.3)</p>
          <p className={`text-[10px] ${theme.iconColor} mb-2`}>= (72 x 0.4) + (85 x 0.3) + (90 x 0.3) = 28.8 + 25.5 + 27.0 = 81.3 ~ 82%</p>
          <p className={`text-[10px] font-bold ${theme.highlight} mb-1`}>Contributing Factors:</p>
          <ul className={`text-[10px] ${theme.iconColor} space-y-0.5 ml-3`}>
            <li className="flex items-center gap-1"><CheckCircle size={10} className="text-emerald-500" /> Consistent attendance above 90% all term</li>
            <li className="flex items-center gap-1"><CheckCircle size={10} className="text-emerald-500" /> No behavioral incidents reported this academic year</li>
            <li className="flex items-center gap-1"><AlertCircle size={10} className="text-amber-500" /> Academic score dipped in Math (needs attention)</li>
            <li className="flex items-center gap-1"><CheckCircle size={10} className="text-emerald-500" /> Active participation in extra-curricular activities</li>
          </ul>
        </div>
        <div className="mt-3 flex justify-end">
          <button onClick={() => window.alert('Referral sent to school counselor for ' + student.name + '. (Blueprint demo)')} className="px-3 py-2 rounded-xl bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5">
            <UserCheck size={12} /> Refer to Counselor
          </button>
        </div>
      </div>

      {/* Gap #78 — Student Barcode/QR Section */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center gap-4">
          {/* QR Code placeholder */}
          <div className={`w-20 h-20 rounded-xl border-2 ${theme.border} flex flex-col items-center justify-center ${theme.accentBg}`}>
            <QrCode size={32} className={theme.iconColor} />
            <span className={`text-[8px] ${theme.iconColor} mt-0.5`}>QR Code</span>
          </div>
          {/* Barcode placeholder */}
          <div className={`h-20 px-4 rounded-xl border-2 ${theme.border} flex flex-col items-center justify-center ${theme.accentBg}`}>
            <span className={`text-lg font-mono tracking-widest ${theme.highlight}`}>||||||||||||||||</span>
            <span className={`text-[8px] font-mono ${theme.iconColor} mt-0.5`}>{student.id}</span>
          </div>
          <div className="flex-1">
            <p className={`text-xs font-bold ${theme.highlight}`}>Student ID Card</p>
            <p className={`text-[10px] ${theme.iconColor}`}>{student.id} | {student.class} | {student.name}</p>
            <p className={`text-[10px] ${theme.iconColor} mt-1`}>Student ID: <span className={`font-mono font-bold ${theme.primaryText}`}>{student.id}</span></p>
            <p className={`text-[9px] ${theme.iconColor} italic mt-0.5`}>Scan QR or barcode for quick student lookup</p>
          </div>
          <button onClick={() => window.alert('Printing ID Card for ' + student.name + '... (Blueprint demo)')} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>
            <Printer size={12} /> Print ID Card
          </button>
        </div>
      </div>

      <TabBar tabs={['Personal', 'Academic', 'Medical', 'Documents', 'Fee History', 'Achievements', 'NEP Progress Card']} active={profileTab} onChange={setProfileTab} theme={theme} />

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
        <div className="space-y-4">
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

          {/* Academic History — Multi-year */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Academic History</h3>
            <DataTable
              headers={['Year', 'Class', 'Section', 'Roll No', 'Result', 'Attendance %']}
              rows={mockAcademicHistory.map(h => [
                <span key="yr" className={`text-xs font-bold ${theme.highlight}`}>{h.year}</span>,
                <span key="cls" className={`text-xs ${theme.iconColor}`}>{h.className}</span>,
                <span key="sec" className={`text-xs ${theme.iconColor}`}>{h.section}</span>,
                <span key="roll" className={`text-xs ${theme.iconColor}`}>{h.rollNo}</span>,
                <span key="res" className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                  h.result === 'Promoted' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                }`}>{h.result}</span>,
                <span key="att" className={`text-xs font-bold ${theme.highlight}`}>{h.attendance}</span>,
              ])}
              theme={theme}
            />
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
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Document Verification Status</h3>
          <DataTable
            headers={['Document', 'Uploaded', 'Verified', 'Verified By', 'Date', '']}
            rows={mockDocuments.map(doc => [
              <span key="name" className={`text-xs font-bold ${theme.highlight}`}>{doc.name}</span>,
              <span key="up" className={`text-xs`}>
                {doc.uploaded
                  ? <span className="flex items-center gap-1"><CheckCircle size={12} className="text-emerald-600" /> Yes</span>
                  : <span className="flex items-center gap-1"><XCircle size={12} className="text-red-500" /> No</span>}
              </span>,
              <span key="v" className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                doc.verified === 'Yes' ? 'bg-emerald-100 text-emerald-700'
                : doc.verified === 'Pending' ? 'bg-amber-100 text-amber-700'
                : 'bg-slate-100 text-slate-500'
              }`}>{doc.verified === 'Yes' ? '\u2713 Verified' : doc.verified === 'Pending' ? 'Pending' : 'N/A'}</span>,
              <span key="by" className={`text-xs ${theme.iconColor}`}>{doc.verifiedBy}</span>,
              <span key="dt" className={`text-xs ${theme.iconColor}`}>{doc.verifiedDate}</span>,
              <span key="act">
                {doc.uploaded && doc.verified === 'Pending' && (
                  <button className="px-2 py-1 rounded-lg bg-emerald-100 text-emerald-700 text-[10px] font-bold">Mark as Verified</button>
                )}
                {doc.uploaded && <button className={`p-1 rounded-lg ${theme.buttonHover} ml-1`}><Download size={12} className={theme.iconColor} /></button>}
              </span>,
            ])}
            theme={theme}
          />
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

      {profileTab === 'Achievements' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Achievement History</h3>
            <span className={`text-xs px-2.5 py-1 rounded-lg ${theme.secondaryBg} ${theme.iconColor} font-bold`}>{mockAchievements.length} total</span>
          </div>
          <div className="space-y-3">
            {mockAchievements.map((ach, i) => (
              <div key={i} className={`flex items-center gap-4 p-3 rounded-xl ${theme.secondaryBg}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  ach.badge === 'Gold' ? 'bg-amber-100' : 'bg-slate-200'
                }`}>
                  <Award size={18} className={ach.badge === 'Gold' ? 'text-amber-600' : 'text-slate-500'} />
                </div>
                <div className="flex-1">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{ach.title}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{ach.date} | {ach.level} Level</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                  ach.type === 'Academic' ? 'bg-blue-100 text-blue-700'
                  : ach.type === 'Sports' ? 'bg-emerald-100 text-emerald-700'
                  : ach.type === 'Co-curricular' ? 'bg-purple-100 text-purple-700'
                  : 'bg-pink-100 text-pink-700'
                }`}>{ach.type}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                  ach.badge === 'Gold' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                }`}>{ach.badge}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gap #107 — NEP 2020 Holistic Progress Card */}
      {profileTab === 'NEP Progress Card' && (
        <div className="space-y-4">
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BookOpen size={16} className={theme.primaryText} />
                <h3 className={`text-sm font-bold ${theme.highlight}`}>Holistic Progress Card (NEP 2020)</h3>
              </div>
              <button onClick={() => window.alert('Downloading NEP Progress Card... (Blueprint demo)')} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>
                <Download size={12} /> Download Progress Card
              </button>
            </div>

            {/* Scholastic */}
            <div className="mb-5">
              <h4 className={`text-xs font-bold ${theme.highlight} mb-2 uppercase tracking-wide`}>Scholastic Areas</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className={theme.secondaryBg}>
                      {['Subject', 'Unit Test 1', 'Unit Test 2', 'Half Yearly', 'Annual', 'Grade'].map(h => (
                        <th key={h} className={`px-3 py-2 text-left text-[10px] font-bold ${theme.iconColor} uppercase`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { subject: 'Mathematics', ut1: 85, ut2: 88, hy: 82, annual: 86, grade: 'A1' },
                      { subject: 'Science', ut1: 78, ut2: 82, hy: 80, annual: 81, grade: 'A2' },
                      { subject: 'English', ut1: 90, ut2: 92, hy: 88, annual: 90, grade: 'A1' },
                      { subject: 'Hindi', ut1: 72, ut2: 75, hy: 70, annual: 74, grade: 'B1' },
                      { subject: 'Social Science', ut1: 80, ut2: 78, hy: 76, annual: 78, grade: 'B2' },
                    ].map((s, i) => (
                      <tr key={i} className={`border-t ${theme.border}`}>
                        <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{s.subject}</td>
                        <td className={`px-3 py-2 ${theme.iconColor}`}>{s.ut1}</td>
                        <td className={`px-3 py-2 ${theme.iconColor}`}>{s.ut2}</td>
                        <td className={`px-3 py-2 ${theme.iconColor}`}>{s.hy}</td>
                        <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{s.annual}</td>
                        <td className="px-3 py-2">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            s.grade.startsWith('A') ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                          }`}>{s.grade}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Co-Scholastic */}
            <div className="mb-5">
              <h4 className={`text-xs font-bold ${theme.highlight} mb-2 uppercase tracking-wide`}>Co-Scholastic Areas</h4>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { area: 'Art Education', grade: 'A' },
                  { area: 'Physical Education', grade: 'A' },
                  { area: 'Work Education', grade: 'B' },
                ].map(cs => (
                  <div key={cs.area} className={`p-3 rounded-xl ${theme.secondaryBg} flex items-center justify-between`}>
                    <span className={`text-xs font-bold ${theme.highlight}`}>{cs.area}</span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                      cs.grade === 'A' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                    }`}>{cs.grade}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Disciplines */}
            <div className="mb-5">
              <h4 className={`text-xs font-bold ${theme.highlight} mb-2 uppercase tracking-wide`}>Discipline</h4>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { area: 'Regularity', grade: 'A' },
                  { area: 'Sincerity', grade: 'A' },
                  { area: 'Respect', grade: 'A' },
                  { area: 'Participation', grade: 'B' },
                ].map(d => (
                  <div key={d.area} className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
                    <p className={`text-[10px] ${theme.iconColor} mb-1`}>{d.area}</p>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                      d.grade === 'A' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                    }`}>{d.grade}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activities */}
            <div className="mb-5">
              <h4 className={`text-xs font-bold ${theme.highlight} mb-2 uppercase tracking-wide`}>Activities & Achievements</h4>
              <div className="space-y-2">
                {[
                  { activity: 'Sports', details: 'Cricket — District level MVP', achievement: 'Gold Medal' },
                  { activity: 'Cultural', details: 'Debate Competition — State level', achievement: 'Winner' },
                  { activity: 'NCC/Scouts', details: 'NCC Cadet — Active member', achievement: 'B Certificate' },
                ].map(a => (
                  <div key={a.activity} className={`flex items-center gap-3 p-3 rounded-xl ${theme.secondaryBg}`}>
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                      <Award size={14} className="text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <p className={`text-xs font-bold ${theme.highlight}`}>{a.activity}</p>
                      <p className={`text-[10px] ${theme.iconColor}`}>{a.details}</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-700">{a.achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio Summary */}
            <div className={`p-4 rounded-xl ${theme.accentBg}`}>
              <h4 className={`text-xs font-bold ${theme.highlight} mb-2 uppercase tracking-wide`}>Portfolio Summary</h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className={`text-[10px] ${theme.iconColor} mb-0.5`}>Portfolio Items</p>
                  <p className={`text-sm font-bold ${theme.highlight}`}>12 items</p>
                </div>
                <div>
                  <p className={`text-[10px] ${theme.iconColor} mb-0.5`}>Teacher Endorsements</p>
                  <p className={`text-sm font-bold ${theme.highlight}`}>8 endorsements</p>
                </div>
                <div>
                  <p className={`text-[10px] ${theme.iconColor} mb-0.5`}>Last Updated</p>
                  <p className={`text-sm font-bold ${theme.highlight}`}>Feb 20, 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
