'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { StatusBadge, TabBar, SearchBar, DataTable } from '@/components/shared';
import { mockStudents } from '@/lib/mock-data';
import { Plus, GraduationCap, Search, Filter, Download, Eye, Edit, AlertTriangle, XCircle } from 'lucide-react';
import StudentAddForm from './StudentAddForm';
import StudentProfileView from './StudentProfileView';
import PromotionWizard from './PromotionWizard';

export default function StudentsModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All Students');
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<typeof mockStudents[0] | null>(null);
  const [showPromotionWizard, setShowPromotionWizard] = useState(false);

  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showDuplicateDetail, setShowDuplicateDetail] = useState(false);

  // Archived / Alumni mock data
  const archivedStudents = [
    { id: 'SAR-2024-0012', name: 'Vikram Joshi', class: '12-A', status: 'Alumni', year: '2024-25', reason: 'Graduated' },
    { id: 'SAR-2024-0034', name: 'Sneha Patel', class: '8-B', status: 'Transferred', year: '2024-25', reason: 'Relocated to Mumbai' },
    { id: 'SAR-2023-0078', name: 'Rahul Desai', class: '10-A', status: 'Left', year: '2023-24', reason: 'Family relocation' },
    { id: 'SAR-2024-0056', name: 'Ananya Gupta', class: '5-C', status: 'Transferred', year: '2024-25', reason: 'Fee issues' },
    { id: 'SAR-2023-0091', name: 'Karan Singh', class: '12-B', status: 'Alumni', year: '2023-24', reason: 'Graduated — now at IIT Delhi' },
  ];

  // Duplicate detection mock
  const duplicates = [
    { studentA: 'Aarav Patel (10-A)', studentB: 'Aarav R. Patel (10-B)', reason: 'Same parent phone: 98765 43210' },
    { studentA: 'Priya Sharma (7-A)', studentB: 'Priya S. Sharma (7-C)', reason: 'Same Aadhaar last 4 digits + DOB' },
  ];

  const categoryOptions = ['All', 'General', 'OBC', 'SC', 'ST', 'EWS'];

  // TC Requests mock data
  const [tcRequests, setTcRequests] = useState([
    { id: 'TC001', student: 'Arjun Singh', class: '10-A', requestDate: '15-Feb-2026', requestedBy: 'Parent', status: 'Pending' },
    { id: 'TC002', student: 'Prachi Mehta', class: '6-B', requestDate: '12-Feb-2026', requestedBy: 'School', status: 'Approved' },
    { id: 'TC003', student: 'Kabir Joshi', class: '8-A', requestDate: '10-Feb-2026', requestedBy: 'Parent', status: 'Generated' },
    { id: 'TC004', student: 'Sanya Iyer', class: '3-C', requestDate: '08-Feb-2026', requestedBy: 'Parent', status: 'Pending' },
  ]);

  if (showAddStudent) {
    return <StudentAddForm theme={theme} onBack={() => setShowAddStudent(false)} />;
  }

  if (selectedStudent) {
    return <StudentProfileView theme={theme} student={selectedStudent} onBack={() => setSelectedStudent(null)} />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Student Management</h1>
        <div className="flex gap-2">
          <button onClick={() => setShowPromotionWizard(true)} className={`px-4 py-2.5 rounded-xl border ${theme.border} text-sm font-bold ${theme.highlight} ${theme.buttonHover} flex items-center gap-1`}><GraduationCap size={14} /> Promote Students</button>
          <button onClick={() => setShowAddStudent(true)} className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> Add Student</button>
        </div>
      </div>
      <TabBar tabs={['All Students', 'Class-wise', 'Fee Status', 'TC Requests', 'Archived / Alumni']} active={tab} onChange={setTab} theme={theme} />

      {(tab === 'All Students' || tab === 'Class-wise' || tab === 'Fee Status') && (
        <>
          <div className="flex gap-3">
            <SearchBar placeholder="Search by name, ID, class..." theme={theme} icon={Search} />
            <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Filter size={12} /> Filter</button>
            <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Download size={12} /> Export</button>
          </div>

          {/* Category-wise Filter */}
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>Category:</span>
            {categoryOptions.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                  categoryFilter === cat
                    ? `${theme.primary} text-white border-transparent`
                    : `${theme.border} ${theme.iconColor} ${theme.buttonHover}`
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Duplicate Detection Banner */}
          <div className={`${theme.cardBg} rounded-2xl border border-amber-300 p-3`}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                <AlertTriangle size={14} className="text-amber-600" />
              </div>
              <div className="flex-1">
                <p className={`text-xs font-bold ${theme.highlight}`}>Duplicate Detection: {duplicates.length} potential duplicates found</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Click to review and resolve</p>
              </div>
              <button onClick={() => setShowDuplicateDetail(!showDuplicateDetail)} className={`px-3 py-1.5 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.highlight} ${theme.buttonHover}`}>
                {showDuplicateDetail ? 'Hide' : 'Review'}
              </button>
            </div>
            {showDuplicateDetail && (
              <div className="mt-3 space-y-2">
                {duplicates.map((dup, i) => (
                  <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${theme.secondaryBg}`}>
                    <span className={`text-xs font-bold ${theme.highlight}`}>{dup.studentA}</span>
                    <span className={`text-[10px] ${theme.iconColor}`}>&harr;</span>
                    <span className={`text-xs font-bold ${theme.highlight}`}>{dup.studentB}</span>
                    <span className={`text-[10px] ${theme.iconColor} flex-1`}>({dup.reason})</span>
                    <button className="px-2 py-1 rounded-lg bg-blue-100 text-blue-700 text-[10px] font-bold">Merge</button>
                    <button className="px-2 py-1 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-bold">Dismiss</button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <DataTable
            headers={['ID', 'Name', 'Class', 'Roll', 'Gender', 'Fee Status', 'Parent', 'Phone', '']}
            rows={mockStudents.map(s => [
              <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{s.id}</span>,
              <button key="name" onClick={() => setSelectedStudent(s)} className={`font-bold ${theme.highlight} hover:underline text-left`}>{s.name}</button>,
              <span key="class" className={theme.iconColor}>{s.class}</span>,
              <span key="roll" className={theme.iconColor}>{s.roll}</span>,
              <span key="gender" className={theme.iconColor}>{s.gender}</span>,
              <StatusBadge key="fee" status={s.fee} theme={theme} />,
              <span key="parent" className={theme.iconColor}>{s.parent}</span>,
              <span key="phone" className={theme.iconColor}>{s.phone}</span>,
              <div key="actions" className="flex gap-1">
                <button onClick={() => setSelectedStudent(s)} className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
                <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Edit size={12} className={theme.iconColor} /></button>
              </div>
            ])}
            theme={theme}
          />
          <div className={`flex items-center justify-between text-xs ${theme.iconColor} px-2`}>
            <span>Showing 1-8 of {mockStudents.length} students</span>
            <div className="flex gap-1">
              <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Previous</button>
              <button className={`px-3 py-1.5 rounded-lg ${theme.primary} text-white`}>1</button>
              <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Next</button>
            </div>
          </div>
        </>
      )}

      {tab === 'TC Requests' && (
        <DataTable
          headers={['ID', 'Student', 'Class', 'Request Date', 'Requested By', 'Status', 'Actions']}
          rows={tcRequests.map((tc, idx) => [
            <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{tc.id}</span>,
            <span key="s" className={`font-bold ${theme.highlight}`}>{tc.student}</span>,
            <span key="c" className={theme.iconColor}>{tc.class}</span>,
            <span key="d" className={theme.iconColor}>{tc.requestDate}</span>,
            <span key="by" className={theme.iconColor}>{tc.requestedBy}</span>,
            <StatusBadge key="st" status={tc.status === 'Pending' ? 'Pending' : tc.status === 'Approved' ? 'Active' : 'Paid'} theme={theme} />,
            <div key="actions" className="flex gap-1">
              {tc.status === 'Pending' && (
                <button onClick={() => { const u = [...tcRequests]; u[idx] = { ...u[idx], status: 'Approved' }; setTcRequests(u); }} className="px-2 py-1 rounded-lg bg-emerald-100 text-emerald-700 text-[10px] font-bold">Approve</button>
              )}
              {(tc.status === 'Pending' || tc.status === 'Approved') && (
                <button onClick={() => { const u = [...tcRequests]; u[idx] = { ...u[idx], status: 'Generated' }; setTcRequests(u); window.alert('TC generated for ' + tc.student + '! (Blueprint demo)'); }} className="px-2 py-1 rounded-lg bg-blue-100 text-blue-700 text-[10px] font-bold">Generate TC</button>
              )}
              {tc.status === 'Generated' && (
                <button className={`px-2 py-1 rounded-lg ${theme.secondaryBg} text-[10px] font-bold ${theme.iconColor} flex items-center gap-1`}><Download size={10} /> Download</button>
              )}
            </div>,
          ])}
          theme={theme}
        />
      )}

      {tab === 'Archived / Alumni' && (
        <div className="space-y-3">
          <p className={`text-xs ${theme.iconColor}`}>Students who have left, transferred, or graduated from the school.</p>
          <DataTable
            headers={['ID', 'Name', 'Last Class', 'Status', 'Year', 'Reason']}
            rows={archivedStudents.map(s => [
              <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{s.id}</span>,
              <span key="name" className={`font-bold ${theme.highlight}`}>{s.name}</span>,
              <span key="class" className={theme.iconColor}>{s.class}</span>,
              <StatusBadge key="st" status={s.status === 'Alumni' ? 'Active' : s.status === 'Transferred' ? 'Pending' : 'Overdue'} theme={theme} />,
              <span key="yr" className={theme.iconColor}>{s.year}</span>,
              <span key="reason" className={`text-xs ${theme.iconColor}`}>{s.reason}</span>,
            ])}
            theme={theme}
          />
        </div>
      )}

      {showPromotionWizard && <PromotionWizard theme={theme} onClose={() => setShowPromotionWizard(false)} />}
    </div>
  );
}
