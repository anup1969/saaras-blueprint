'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { StatusBadge, TabBar, SearchBar, DataTable, MobileFrame, MobilePreviewToggle } from '@/components/shared';
import { mockStudents } from '@/lib/mock-data';
import { Plus, GraduationCap, Search, Filter, Download, Eye, Edit, AlertTriangle, XCircle, ArrowRightLeft, X, UserCheck, Merge, RefreshCw, Heart, TrendingUp, TrendingDown, Minus, Activity } from 'lucide-react';
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

  // Gap #21 — Mid-Year Section Transfer
  const [transferStudent, setTransferStudent] = useState<typeof mockStudents[0] | null>(null);
  const [transferSection, setTransferSection] = useState('');
  const [transferDate, setTransferDate] = useState('2026-02-28');
  const [transferReason, setTransferReason] = useState('');

  // Gap #8 — Re-Admission Detection
  const [showReAdmission, setShowReAdmission] = useState(true);

  // Gap #62/#95 — Batch Graduation
  const [showBatchGrad, setShowBatchGrad] = useState(false);

  // Gap #146 — Duplicate Merge Modal
  const [showMergeModal, setShowMergeModal] = useState(false);
  const [mergeSelections, setMergeSelections] = useState<Record<string, 'A' | 'B'>>({
    name: 'A', class: 'A', phone: 'A', parent: 'A', dob: 'A', address: 'A',
  });

  // Student Wellbeing Index data
  const wellbeingData = [
    { name: 'Aarav Patel', class: '10-A', academic: 92, attendance: 96, behavioral: 88, health: 'Good', index: 9.2, trend: 'up' },
    { name: 'Saanvi Sharma', class: '8-B', academic: 85, attendance: 89, behavioral: 90, health: 'Good', index: 8.6, trend: 'up' },
    { name: 'Vivaan Mehta', class: '6-A', academic: 78, attendance: 82, behavioral: 75, health: 'Fair', index: 7.1, trend: 'stable' },
    { name: 'Diya Reddy', class: '9-C', academic: 72, attendance: 68, behavioral: 65, health: 'Good', index: 5.8, trend: 'down' },
    { name: 'Kabir Joshi', class: '5-B', academic: 45, attendance: 55, behavioral: 50, health: 'Fair', index: 3.2, trend: 'down' },
    { name: 'Ananya Gupta', class: '7-A', academic: 88, attendance: 94, behavioral: 85, health: 'Good', index: 8.4, trend: 'up' },
    { name: 'Rohan Singh', class: '4-C', academic: 62, attendance: 70, behavioral: 58, health: 'Concern', index: 4.5, trend: 'down' },
    { name: 'Priya Nair', class: '3-A', academic: 90, attendance: 92, behavioral: 95, health: 'Good', index: 9.0, trend: 'stable' },
  ];

  const atRiskStudents = wellbeingData.filter(s => s.index < 5);
  const referralsThisMonth = 3;

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
      {/* Gap #8 — Re-Admission Detection Banner */}
      {showReAdmission && (
        <div className="p-3 rounded-2xl border border-amber-300 bg-amber-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
              <RefreshCw size={14} className="text-amber-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-amber-800">Re-admission detected: Rahul Mehta (previously enrolled 2023-24, left due to relocation) is applying again.</p>
            </div>
            <button onClick={() => window.alert('Viewing previous record for Rahul Mehta (2023-24). (Blueprint demo)')} className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 text-[10px] font-bold">View Previous Record</button>
            <button onClick={() => window.alert('Records linked for Rahul Mehta. (Blueprint demo)')} className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-700 text-[10px] font-bold">Link Records</button>
            <button onClick={() => setShowReAdmission(false)} className="p-1 rounded-lg hover:bg-amber-100"><X size={14} className="text-amber-600" /></button>
          </div>
        </div>
      )}

      <TabBar tabs={['All Students', 'Class-wise', 'Fee Status', 'TC Requests', 'Archived / Alumni', 'Wellbeing']} active={tab} onChange={setTab} theme={theme} />

      {/* ─── MOBILE APP PREVIEW ─── */}
      <MobilePreviewToggle theme={theme} mobileContent={
        <MobileFrame title="Student Lookup" theme={theme}>
          <div className="bg-white rounded-xl border border-gray-200 p-2.5">
            <div className="flex gap-1.5">
              <div className="flex-1 relative"><span className="absolute left-2 top-2 text-gray-400 text-xs">{"🔍"}</span><div className="w-full pl-7 pr-2 py-2 rounded-lg border border-gray-200 bg-gray-50 text-[10px] text-gray-400">Search by name, ID, class...</div></div>
              <button className="w-9 h-9 rounded-lg bg-blue-500 flex items-center justify-center text-white"><span className="text-sm">{"📷"}</span></button>
            </div>
            <p className="text-[8px] text-gray-400 text-center mt-1">Tap camera to scan student ID barcode</p>
          </div>
          <div className="space-y-2">
            {[{ name: "Aarav Patel", id: "SAR-2025-0001", cls: "10-A", roll: 12, fee: "Paid", parent: "Rajesh Patel", phone: "98765 43210", photo: "AP" },{ name: "Saanvi Sharma", id: "SAR-2025-0002", cls: "8-B", roll: 5, fee: "Pending", parent: "Amit Sharma", phone: "87654 32109", photo: "SS" },{ name: "Vivaan Mehta", id: "SAR-2025-0003", cls: "6-A", roll: 18, fee: "Paid", parent: "Karan Mehta", phone: "76543 21098", photo: "VM" },{ name: "Diya Reddy", id: "SAR-2025-0004", cls: "9-C", roll: 8, fee: "Overdue", parent: "Srinivas Reddy", phone: "65432 10987", photo: "DR" }].map((s, i) => (<div key={i} className="bg-white rounded-xl border border-gray-200 p-2.5"><div className="flex gap-2.5"><div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold shrink-0">{s.photo}</div><div className="flex-1 min-w-0"><div className="flex items-center justify-between"><p className="text-[11px] font-bold text-gray-800">{s.name}</p><span className={`text-[8px] px-1.5 py-0.5 rounded-full font-bold ${s.fee === "Paid" ? "bg-emerald-100 text-emerald-700" : s.fee === "Pending" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>{s.fee}</span></div><p className="text-[9px] text-gray-500">{s.id} {"•"} Class {s.cls} {"•"} Roll {s.roll}</p><p className="text-[9px] text-gray-600 mt-0.5">{s.parent} {"•"} {s.phone}</p></div></div><div className="flex gap-1.5 mt-2 pt-2 border-t border-gray-100"><button className="flex-1 py-1.5 rounded-lg bg-green-50 border border-green-200 text-[8px] font-bold text-green-700 flex items-center justify-center gap-0.5">{"📱"} SMS Parent</button><button className="flex-1 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-[8px] font-bold text-blue-700 flex items-center justify-center gap-0.5">{"📞"} Call</button><button className="flex-1 py-1.5 rounded-lg bg-purple-50 border border-purple-200 text-[8px] font-bold text-purple-700 flex items-center justify-center gap-0.5">{"📅"} Attendance</button></div></div>))}
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <div className="bg-emerald-50 rounded-lg p-2 text-center"><p className="text-sm font-bold text-emerald-700">1,320</p><p className="text-[8px] text-emerald-600">Total</p></div>
            <div className="bg-blue-50 rounded-lg p-2 text-center"><p className="text-sm font-bold text-blue-700">1,247</p><p className="text-[8px] text-blue-600">Present</p></div>
            <div className="bg-red-50 rounded-lg p-2 text-center"><p className="text-sm font-bold text-red-700">15</p><p className="text-[8px] text-red-600">Fee Overdue</p></div>
          </div>
        </MobileFrame>
      } />


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
                    <button onClick={() => setShowMergeModal(true)} className="px-2 py-1 rounded-lg bg-blue-100 text-blue-700 text-[10px] font-bold flex items-center gap-1"><Merge size={10} /> Merge</button>
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
                <button onClick={() => setSelectedStudent(s)} className={`p-1.5 rounded-lg ${theme.secondaryBg}`} title="View"><Eye size={12} className={theme.iconColor} /></button>
                <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`} title="Edit"><Edit size={12} className={theme.iconColor} /></button>
                <button onClick={() => { setTransferStudent(s); setTransferSection(''); setTransferReason(''); }} className={`p-1.5 rounded-lg ${theme.secondaryBg}`} title="Transfer Section"><ArrowRightLeft size={12} className={theme.iconColor} /></button>
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
          <div className="flex items-center justify-between">
            <p className={`text-xs ${theme.iconColor}`}>Students who have left, transferred, or graduated from the school.</p>
            <button onClick={() => setShowBatchGrad(true)} className={`px-3 py-2 rounded-xl border ${theme.border} text-xs font-bold ${theme.highlight} ${theme.buttonHover} flex items-center gap-1.5`}>
              <GraduationCap size={14} /> Batch Graduation
            </button>
          </div>

          {/* Gap #62/#95 — Batch Graduation Confirmation */}
          {showBatchGrad && (
            <div className={`p-4 rounded-2xl border border-blue-300 ${theme.cardBg} space-y-3`}>
              <div className="flex items-center gap-2">
                <GraduationCap size={16} className="text-blue-600" />
                <h3 className={`text-sm font-bold ${theme.highlight}`}>Batch Graduation — Class 12 (2025-26)</h3>
              </div>
              <p className={`text-xs ${theme.iconColor}`}>45 students will be moved to <strong>Alumni</strong> status. Alumni IDs will be auto-generated (ALM-2026-XXXX).</p>
              <div className={`p-3 rounded-xl ${theme.secondaryBg} space-y-1`}>
                <div className="flex justify-between text-xs"><span className={theme.iconColor}>Class 12-A</span><span className={`font-bold ${theme.highlight}`}>23 students</span></div>
                <div className="flex justify-between text-xs"><span className={theme.iconColor}>Class 12-B</span><span className={`font-bold ${theme.highlight}`}>22 students</span></div>
                <div className={`flex justify-between text-xs pt-1 border-t ${theme.border}`}><span className={`font-bold ${theme.highlight}`}>Total</span><span className={`font-bold ${theme.primaryText}`}>45 students</span></div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setShowBatchGrad(false)} className={`flex-1 py-2 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.highlight} ${theme.buttonHover}`}>Cancel</button>
                <button onClick={() => { window.alert('45 students graduated to Alumni status! Alumni IDs generated. (Blueprint demo)'); setShowBatchGrad(false); }} className="flex-1 py-2 rounded-xl bg-blue-500 text-white text-xs font-bold">Proceed</button>
              </div>
            </div>
          )}
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

      {/* ── Student Wellbeing Index ── */}
      {tab === 'Wellbeing' && (
        <div className="space-y-4">
          {/* Summary stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 text-center`}>
              <p className={`text-2xl font-bold ${theme.highlight}`}>{wellbeingData.length}</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Total Students Tracked</p>
            </div>
            <div className={`${theme.cardBg} rounded-2xl border border-red-200 p-4 text-center`}>
              <p className="text-2xl font-bold text-red-600">{atRiskStudents.length}</p>
              <p className={`text-[10px] ${theme.iconColor}`}>At-Risk Students</p>
            </div>
            <div className={`${theme.cardBg} rounded-2xl border border-amber-200 p-4 text-center`}>
              <p className="text-2xl font-bold text-amber-600">{referralsThisMonth}</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Referrals This Month</p>
            </div>
            <div className={`${theme.cardBg} rounded-2xl border border-emerald-200 p-4 text-center`}>
              <p className="text-2xl font-bold text-emerald-600">{wellbeingData.filter(s => s.index >= 8).length}</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Thriving (8+)</p>
            </div>
          </div>

          {/* At-risk alert */}
          {atRiskStudents.length > 0 && (
            <div className="p-3 rounded-2xl border border-red-300 bg-red-50">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={14} className="text-red-600" />
                <p className="text-xs font-bold text-red-700">At-Risk Students (Wellbeing Index below 5)</p>
              </div>
              <div className="space-y-1.5">
                {atRiskStudents.map(s => (
                  <div key={s.name} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.cardBg}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600 text-[10px] font-bold">{s.name.split(' ').map(n => n[0]).join('')}</div>
                      <div>
                        <p className={`text-xs font-bold ${theme.highlight}`}>{s.name} ({s.class})</p>
                        <p className={`text-[10px] ${theme.iconColor}`}>Academic: {s.academic}% | Attendance: {s.attendance}% | Behavioral: {s.behavioral}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-red-600">{s.index}</span>
                      <TrendingDown size={14} className="text-red-500" />
                      <button onClick={() => window.alert(`Counselor referral sent for ${s.name}. (Blueprint demo)`)} className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-700 text-[10px] font-bold">Refer to Counselor</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Wellbeing cards */}
          <div className="space-y-2">
            {wellbeingData.map(s => {
              const indexColor = s.index >= 8 ? 'text-emerald-600' : s.index >= 5 ? 'text-amber-600' : 'text-red-600';
              const indexBg = s.index >= 8 ? 'bg-emerald-100' : s.index >= 5 ? 'bg-amber-100' : 'bg-red-100';
              const TrendIcon = s.trend === 'up' ? TrendingUp : s.trend === 'down' ? TrendingDown : Minus;
              const trendColor = s.trend === 'up' ? 'text-emerald-500' : s.trend === 'down' ? 'text-red-500' : 'text-slate-400';

              return (
                <div key={s.name} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
                  <div className="flex items-center gap-4">
                    {/* Student info */}
                    <div className="flex items-center gap-3 w-48">
                      <div className={`w-10 h-10 rounded-xl ${indexBg} flex items-center justify-center ${indexColor} text-sm font-bold`}>{s.name.split(' ').map(n => n[0]).join('')}</div>
                      <div>
                        <p className={`text-xs font-bold ${theme.highlight}`}>{s.name}</p>
                        <p className={`text-[10px] ${theme.iconColor}`}>{s.class}</p>
                      </div>
                    </div>

                    {/* Score bars */}
                    <div className="flex-1 grid grid-cols-4 gap-3">
                      {[
                        { label: 'Academic', value: s.academic, color: 'bg-blue-500' },
                        { label: 'Attendance', value: s.attendance, color: 'bg-emerald-500' },
                        { label: 'Behavioral', value: s.behavioral, color: 'bg-purple-500' },
                        { label: 'Health', value: s.health === 'Good' ? 90 : s.health === 'Fair' ? 60 : 30, color: s.health === 'Good' ? 'bg-emerald-500' : s.health === 'Fair' ? 'bg-amber-500' : 'bg-red-500' },
                      ].map(metric => (
                        <div key={metric.label}>
                          <div className="flex justify-between mb-0.5">
                            <span className={`text-[9px] ${theme.iconColor}`}>{metric.label}</span>
                            <span className={`text-[9px] font-bold ${theme.highlight}`}>{metric.label === 'Health' ? s.health : `${metric.value}%`}</span>
                          </div>
                          <div className={`w-full h-1.5 rounded-full ${theme.secondaryBg} overflow-hidden`}>
                            <div className={`h-full rounded-full ${metric.color}`} style={{ width: `${metric.value}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Overall index */}
                    <div className="flex items-center gap-2 w-28 justify-end">
                      <div className={`px-3 py-1.5 rounded-xl ${indexBg} text-center`}>
                        <p className={`text-lg font-bold ${indexColor}`}>{s.index}</p>
                        <p className={`text-[8px] ${indexColor}`}>/ 10</p>
                      </div>
                      <TrendIcon size={16} className={trendColor} />
                    </div>

                    {/* Actions */}
                    <button onClick={() => window.alert(`Counselor referral sent for ${s.name}. (Blueprint demo)`)} className={`p-2 rounded-lg ${theme.secondaryBg} ${theme.buttonHover}`} title="Refer to Counselor">
                      <Heart size={14} className={theme.iconColor} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Gap #21 — Mid-Year Section Transfer Modal */}
      {transferStudent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setTransferStudent(null)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} shadow-2xl w-full max-w-md p-6 space-y-4`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ArrowRightLeft size={16} className={theme.primaryText} />
                <h2 className={`text-lg font-bold ${theme.highlight}`}>Transfer Section</h2>
              </div>
              <button onClick={() => setTransferStudent(null)} className={`p-1.5 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-xs ${theme.iconColor}`}>Student: <strong className={theme.highlight}>{transferStudent.name}</strong></p>
            </div>
            <div className="space-y-3">
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Current Section</label>
                <input value={transferStudent.class} readOnly className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} opacity-50 cursor-not-allowed`} />
              </div>
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>New Section <span className="text-red-500">*</span></label>
                <select value={transferSection} onChange={e => setTransferSection(e.target.value)} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                  <option value="">Select section</option>
                  <option>A</option><option>B</option><option>C</option><option>D</option>
                </select>
              </div>
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Effective Date <span className="text-red-500">*</span></label>
                <input type="date" value={transferDate} onChange={e => setTransferDate(e.target.value)} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`} />
              </div>
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Reason <span className="text-red-500">*</span></label>
                <select value={transferReason} onChange={e => setTransferReason(e.target.value)} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                  <option value="">Select reason</option>
                  <option>Parent request</option><option>Performance</option><option>Capacity balancing</option><option>Other</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setTransferStudent(null)} className={`flex-1 py-2.5 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.highlight} ${theme.buttonHover}`}>Cancel</button>
              <button
                onClick={() => { window.alert(`${transferStudent.name} transferred to Section ${transferSection} effective ${transferDate}. (Blueprint demo)`); setTransferStudent(null); }}
                disabled={!transferSection || !transferReason}
                className={`flex-1 py-2.5 rounded-xl ${theme.primary} text-white text-sm font-bold disabled:opacity-40`}
              >
                Confirm Transfer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gap #146 — Duplicate Merge Modal */}
      {showMergeModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowMergeModal(false)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} shadow-2xl w-full max-w-2xl p-6 space-y-4 max-h-[85vh] overflow-y-auto`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Merge size={16} className={theme.primaryText} />
                <h2 className={`text-lg font-bold ${theme.highlight}`}>Merge Student Records</h2>
              </div>
              <button onClick={() => setShowMergeModal(false)} className={`p-1.5 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
            </div>
            <p className={`text-xs ${theme.iconColor}`}>Select which value to keep for each field. The other record will be archived.</p>
            <div className="space-y-2">
              <div className={`grid grid-cols-4 gap-2 px-3 py-2 rounded-xl ${theme.secondaryBg}`}>
                <span className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>Field</span>
                <span className={`text-[10px] font-bold ${theme.iconColor} uppercase text-center`}>Student A</span>
                <span className={`text-[10px] font-bold ${theme.iconColor} uppercase text-center`}>Student B</span>
                <span className={`text-[10px] font-bold ${theme.iconColor} uppercase text-center`}>Keep</span>
              </div>
              {[
                { field: 'name', label: 'Name', a: 'Aarav Patel', b: 'Aarav R. Patel' },
                { field: 'class', label: 'Class', a: '10-A', b: '10-B' },
                { field: 'phone', label: 'Phone', a: '98765 43210', b: '98765 43210' },
                { field: 'parent', label: 'Parent Name', a: 'Rajesh Patel', b: 'Rajesh R. Patel' },
                { field: 'dob', label: 'Date of Birth', a: '15-Mar-2012', b: '15-Mar-2012' },
                { field: 'address', label: 'Address', a: 'Satellite Rd, Ahmedabad', b: '12 Satellite Rd, AHD' },
              ].map(row => (
                <div key={row.field} className={`grid grid-cols-4 gap-2 px-3 py-2.5 rounded-xl ${theme.accentBg} items-center`}>
                  <span className={`text-xs font-bold ${theme.highlight}`}>{row.label}</span>
                  <label className="flex items-center justify-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name={`merge-${row.field}`}
                      checked={mergeSelections[row.field] === 'A'}
                      onChange={() => setMergeSelections(p => ({ ...p, [row.field]: 'A' }))}
                      className="accent-slate-600"
                    />
                    <span className={`text-xs ${theme.highlight}`}>{row.a}</span>
                  </label>
                  <label className="flex items-center justify-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name={`merge-${row.field}`}
                      checked={mergeSelections[row.field] === 'B'}
                      onChange={() => setMergeSelections(p => ({ ...p, [row.field]: 'B' }))}
                      className="accent-slate-600"
                    />
                    <span className={`text-xs ${theme.highlight}`}>{row.b}</span>
                  </label>
                  <div className="flex justify-center">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${mergeSelections[row.field] === 'A' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                      {mergeSelections[row.field] === 'A' ? 'Student A' : 'Student B'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowMergeModal(false)} className={`flex-1 py-2.5 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.highlight} ${theme.buttonHover}`}>Cancel</button>
              <button onClick={() => { window.alert('Records merged successfully! Duplicate archived. (Blueprint demo)'); setShowMergeModal(false); }} className={`flex-1 py-2.5 rounded-xl ${theme.primary} text-white text-sm font-bold flex items-center justify-center gap-1.5`}>
                <Merge size={14} /> Merge Records
              </button>
            </div>
          </div>
        </div>
      )}



      {showPromotionWizard && <PromotionWizard theme={theme} onClose={() => setShowPromotionWizard(false)} />}
    </div>
  );
}
