'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { TabBar, MobileFrame, MobilePreviewToggle, SearchBar, DataTable } from '@/components/shared';
import {
  Users, Award, ClipboardCheck, TrendingUp, Calendar, Star,
  Banknote, AlertTriangle, DollarSign, CreditCard,
  Briefcase, Shield, Bus, UserPlus, Download, PieChart, UserMinus, MessageSquare,
  List, BarChart3, Info, FileCheck, Printer, Smartphone,
  Bookmark, Search, Share2, Trash2, Edit, Play, Eye, Save, Filter,
  Database, Columns, SlidersHorizontal, BarChart, Table, FileSpreadsheet
} from 'lucide-react';

export default function ReportsModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Academic');
  const [expandedReport, setExpandedReport] = useState<string | null>(null);
  const [admitExam, setAdmitExam] = useState('Term 1');
  const [admitClass, setAdmitClass] = useState('Class 5');
  const [bulkClass, setBulkClass] = useState('Class 10');
  const [bulkExam, setBulkExam] = useState('Term 1');
  const [qrToggle, setQrToggle] = useState(true);
  const [signToggle, setSignToggle] = useState(true);

  // Saved Filters
  const [showSaveFilter, setShowSaveFilter] = useState(false);
  const savedFilters = [
    { id: 'SF1', name: 'Monthly Fee Defaulters', type: 'Financial', createdBy: 'School Admin', lastUsed: '28-Feb-2026', isPublic: true },
    { id: 'SF2', name: 'Class 10 Attendance < 75%', type: 'Academic', createdBy: 'Principal', lastUsed: '25-Feb-2026', isPublic: true },
    { id: 'SF3', name: 'Staff Leave Summary (Feb)', type: 'Administrative', createdBy: 'HR Manager', lastUsed: '01-Mar-2026', isPublic: false },
    { id: 'SF4', name: 'Transport Utilization — Zone 3', type: 'Administrative', createdBy: 'Transport Head', lastUsed: '20-Feb-2026', isPublic: true },
    { id: 'SF5', name: 'New Admissions This Term', type: 'Academic', createdBy: 'Admissions', lastUsed: '15-Feb-2026', isPublic: false },
  ];

  // Report Builder
  const [builderStep, setBuilderStep] = useState(1);
  const [builderSource, setBuilderSource] = useState('Students');
  const [builderFields, setBuilderFields] = useState<string[]>(['Name', 'Class', 'Roll No']);
  const [builderViz, setBuilderViz] = useState('Table');

  const dataSources = ['Students', 'Staff', 'Fees', 'Attendance', 'Transport', 'Visitors'];
  const fieldsBySource: Record<string, string[]> = {
    Students: ['Name', 'Class', 'Section', 'Roll No', 'Gender', 'Category', 'Fee Status', 'Parent Name', 'Phone', 'Admission Date'],
    Staff: ['Name', 'Designation', 'Department', 'Join Date', 'Qualification', 'Phone', 'Salary Band'],
    Fees: ['Student Name', 'Class', 'Total Fee', 'Paid Amount', 'Balance', 'Last Payment Date', 'Payment Mode'],
    Attendance: ['Student Name', 'Class', 'Total Days', 'Present', 'Absent', 'Late', 'Attendance %'],
    Transport: ['Student Name', 'Route', 'Stop', 'Bus No', 'Driver', 'Monthly Fee', 'Status'],
    Visitors: ['Visitor Name', 'Date', 'Purpose', 'Whom to Meet', 'Check-in', 'Check-out', 'ID Type'],
  };
  const vizOptions = ['Table', 'Bar Chart', 'Pie Chart', 'Line Graph'];

  const toggleField = (field: string) => {
    setBuilderFields(prev => prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]);
  };

  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Reports & Analytics</h1>
      <TabBar tabs={['Academic', 'Financial', 'Administrative', 'Saved Filters', 'Report Builder']} active={tab} onChange={setTab} theme={theme} />

      {/* ─── MOBILE APP PREVIEW ─── */}
      <MobilePreviewToggle theme={theme} mobileContent={
        <MobileFrame title="Reports" theme={theme}>
          <div className="bg-white rounded-xl border border-gray-200 p-2.5">
            <span className="text-[10px] font-bold text-gray-800 mb-2 block">Admit Cards</span>
            <div className="border border-blue-200 rounded-xl p-3 bg-blue-50/50">
              <div className="flex items-start gap-2.5">
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-sm font-bold shrink-0">AP</div>
                <div className="flex-1 min-w-0"><p className="text-[11px] font-bold text-gray-800">Aarav Patel</p><p className="text-[9px] text-gray-600">Class 10-A {"•"} Roll 12</p><p className="text-[9px] text-gray-600">SAR-2025-0001</p><p className="text-[8px] text-gray-500 mt-0.5">Unit Test 3 {"•"} Mar 2026</p></div>
                <div className="w-12 h-12 bg-white border border-gray-300 rounded-lg flex items-center justify-center shrink-0"><div className="grid grid-cols-3 gap-0.5 w-8 h-8">{Array.from({length: 9}).map((_, qi) => (<div key={qi} className={`rounded-sm ${[0,1,2,3,5,6,8].includes(qi) ? "bg-gray-800" : "bg-white"}`} />))}</div></div>
              </div>
              <div className="flex gap-1.5 mt-2 pt-2 border-t border-blue-200"><button className="flex-1 py-1.5 rounded-lg bg-blue-500 text-white text-[8px] font-bold">Download PDF</button><button className="flex-1 py-1.5 rounded-lg bg-white border border-blue-300 text-[8px] font-bold text-blue-700">Print</button></div>
            </div>
            <div className="mt-2 flex gap-1.5"><button className="flex-1 py-1.5 rounded-lg bg-gray-100 text-[9px] font-bold text-gray-700">{"←"} Previous</button><span className="py-1.5 text-[9px] text-gray-500 px-2">1 of 45</span><button className="flex-1 py-1.5 rounded-lg bg-gray-100 text-[9px] font-bold text-gray-700">Next {"→"}</button></div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-2.5">
            <span className="text-[10px] font-bold text-gray-800 mb-2 block">Report Cards</span>
            {[{ name: "Aarav Patel", cls: "10-A", exam: "Term 1", pct: "94.5%", status: "Ready" },{ name: "Saanvi Sharma", cls: "8-B", exam: "Term 1", pct: "89.2%", status: "Ready" },{ name: "Vivaan Mehta", cls: "6-A", exam: "Term 1", pct: "91.8%", status: "Generating" }].map((r, i) => (<div key={i} className="flex items-center gap-2 py-2 border-t border-gray-100"><div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 text-[10px] font-bold shrink-0">{r.name.split(" ").map(n => n[0]).join("")}</div><div className="flex-1 min-w-0"><p className="text-[10px] font-bold text-gray-800">{r.name}</p><p className="text-[8px] text-gray-500">{r.cls} {"•"} {r.exam} {"•"} {r.pct}</p></div>{r.status === "Ready" ? (<button className="text-[8px] px-2 py-1 rounded-lg bg-blue-500 text-white font-bold">{"⤓"} PDF</button>) : (<span className="text-[8px] px-2 py-1 rounded-lg bg-amber-100 text-amber-700 font-bold">{"⏳"}</span>)}</div>))}
            <button className="w-full mt-2 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-[9px] font-bold">Download All (Bulk PDF)</button>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-2.5">
            <span className="text-[10px] font-bold text-gray-800 mb-2 block">Compliance Status</span>
            {[{ item: "RTE Compliance", status: "Complete" },{ item: "Fire Safety Cert", status: "Expiring Soon" },{ item: "CBSE Affiliation", status: "Valid" },{ item: "Health Inspection", status: "Overdue" },{ item: "NOC — Building", status: "Complete" }].map((co, i) => (<div key={i} className="flex items-center gap-2 py-1.5 border-t border-gray-100"><span className="text-xs">{co.status === "Complete" || co.status === "Valid" ? "✅" : co.status === "Expiring Soon" ? "⚠️" : "❌"}</span><span className="text-[10px] text-gray-800 flex-1">{co.item}</span><span className={`text-[8px] px-1.5 py-0.5 rounded-full font-bold ${co.status === "Complete" || co.status === "Valid" ? "bg-emerald-100 text-emerald-700" : co.status === "Expiring Soon" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>{co.status}</span></div>))}
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-2.5">
            <span className="text-[10px] font-bold text-gray-800 mb-2 block">Quick Export</span>
            <div className="grid grid-cols-2 gap-1.5">
              {[{ label: "Student List", format: "Excel" },{ label: "Fee Report", format: "PDF" },{ label: "Attendance", format: "CSV" },{ label: "TC Records", format: "PDF" }].map((exp, i) => (<button key={i} className="py-2 rounded-lg bg-gray-50 border border-gray-200 text-center"><p className="text-[9px] font-bold text-gray-800">{exp.label}</p><p className="text-[7px] text-gray-500">{exp.format}</p></button>))}
            </div>
          </div>
        </MobileFrame>
      } />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(tab === 'Academic' ? [
          { title: 'Student Strength Report', desc: 'Class-wise, section-wise, gender-wise count', icon: Users },
          { title: 'Exam Results Analysis', desc: 'Subject-wise pass %, toppers, grade distribution', icon: Award },
          { title: 'Attendance Report', desc: 'Monthly/weekly/daily attendance trends', icon: ClipboardCheck },
          { title: 'Student Progress Cards', desc: 'Individual student performance over time', icon: TrendingUp },
          { title: 'Teacher Workload Report', desc: 'Period allocation, free periods analysis', icon: Calendar },
          { title: 'House-wise Performance', desc: 'Inter-house competition scores', icon: Star },
          { title: 'Student Demographics', desc: 'Gender split, category distribution, age analysis', icon: PieChart },
          { title: 'Student Attrition Report', desc: 'Left, transferred, dropout trends year-over-year', icon: UserMinus },
          { title: 'Remark Submission Status', desc: 'Per-class teacher remark compliance tracking', icon: MessageSquare },
          { title: 'Batch-wise Student List', desc: 'Class & section-wise student count with gender split', icon: List },
          { title: 'Grade-wise Student Count', desc: 'Grade-level enrollment with bar visualization', icon: BarChart3 },
          { title: 'Admit Cards / Hall Tickets', desc: 'Generate exam admit cards with photo & schedule', icon: Printer },
          { title: 'Bulk Report Card Generation', desc: 'Generate and download all report cards for a class', icon: FileCheck },
          { title: 'Mark Entry Compliance', desc: 'Track which teachers have completed mark entry', icon: ClipboardCheck },
        ] : tab === 'Financial' ? [
          { title: 'Fee Collection Summary', desc: 'Monthly/yearly collection vs outstanding', icon: Banknote },
          { title: 'Defaulters Report', desc: 'Student-wise fee dues with aging analysis', icon: AlertTriangle },
          { title: 'Concession Report', desc: 'All concessions granted with breakdown', icon: DollarSign },
          { title: 'Payment Mode Analysis', desc: 'Cash vs UPI vs Bank transfer breakdown', icon: CreditCard },
        ] : [
          { title: 'Staff Attendance Report', desc: 'Employee attendance trends and patterns', icon: Briefcase },
          { title: 'Visitor Log Report', desc: 'Monthly visitor statistics and purposes', icon: Shield },
          { title: 'Transport Utilization', desc: 'Route-wise bus occupancy and efficiency', icon: Bus },
          { title: 'Enquiry Conversion Report', desc: 'Admission funnel and conversion rates', icon: UserPlus },
        ]).map((r, i) => (
          <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 hover:shadow-md transition-all cursor-pointer`} onClick={() => setExpandedReport(expandedReport === r.title ? null : r.title)}>
            <r.icon size={28} className={`${theme.iconColor} mb-3`} />
            <h4 className={`text-sm font-bold ${theme.highlight} mb-1`}>{r.title}</h4>
            <p className={`text-xs ${theme.iconColor} mb-3`}>{r.desc}</p>
            <button className={`text-xs ${theme.primaryText} font-bold flex items-center gap-1`}><Download size={12} /> Generate</button>
          </div>
        ))}
      </div>

      {/* Expanded Detail Panels for new reports */}
      {expandedReport === 'Student Demographics' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 space-y-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight}`}>Student Demographics Summary</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-[10px] ${theme.iconColor} mb-1`}>Gender Split</p>
              <div className="flex gap-3">
                <span className="text-xs font-bold text-blue-600">Boys: 520 (54%)</span>
                <span className="text-xs font-bold text-pink-600">Girls: 440 (46%)</span>
              </div>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-[10px] ${theme.iconColor} mb-1`}>Category Distribution</p>
              <div className="space-y-1">
                {[
                  { cat: 'General', pct: 45 }, { cat: 'OBC', pct: 28 },
                  { cat: 'SC', pct: 12 }, { cat: 'ST', pct: 8 }, { cat: 'EWS', pct: 7 },
                ].map(c => (
                  <div key={c.cat} className="flex items-center gap-2">
                    <span className={`text-[10px] ${theme.iconColor} w-12`}>{c.cat}</span>
                    <div className={`flex-1 h-2 rounded-full ${theme.accentBg}`}>
                      <div className="h-full rounded-full bg-blue-500" style={{ width: `${c.pct}%` }} />
                    </div>
                    <span className={`text-[10px] font-bold ${theme.highlight}`}>{c.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-[10px] ${theme.iconColor} mb-1`}>Age Distribution</p>
              <div className="space-y-1">
                {[
                  { range: '3-5 yrs', count: 120 }, { range: '6-10 yrs', count: 340 },
                  { range: '11-14 yrs', count: 320 }, { range: '15-18 yrs', count: 180 },
                ].map(a => (
                  <div key={a.range} className="flex justify-between">
                    <span className={`text-[10px] ${theme.iconColor}`}>{a.range}</span>
                    <span className={`text-[10px] font-bold ${theme.highlight}`}>{a.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {expandedReport === 'Student Attrition Report' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 space-y-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight}`}>Student Attrition Report</h3>
          <div className="grid grid-cols-4 gap-3">
            <div className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
              <p className={`text-[10px] ${theme.iconColor}`}>Left</p>
              <p className="text-lg font-bold text-red-600">12</p>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
              <p className={`text-[10px] ${theme.iconColor}`}>Transferred</p>
              <p className="text-lg font-bold text-amber-600">8</p>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
              <p className={`text-[10px] ${theme.iconColor}`}>Dropout</p>
              <p className="text-lg font-bold text-red-500">3</p>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
              <p className={`text-[10px] ${theme.iconColor}`}>Total Attrition</p>
              <p className="text-lg font-bold text-slate-700">23</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-xs font-bold ${theme.highlight} mb-2`}>Year-over-Year Comparison</p>
              <div className="flex justify-between">
                <span className={`text-xs ${theme.iconColor}`}>2024-25</span>
                <span className={`text-xs font-bold ${theme.highlight}`}>28 students (2.9%)</span>
              </div>
              <div className="flex justify-between">
                <span className={`text-xs ${theme.iconColor}`}>2025-26</span>
                <span className={`text-xs font-bold text-emerald-600`}>23 students (2.4%) &#8595;</span>
              </div>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-xs font-bold ${theme.highlight} mb-2`}>Top Reasons</p>
              {[
                { reason: 'Relocation', pct: 45 }, { reason: 'Fee Issues', pct: 25 },
                { reason: 'Performance', pct: 15 }, { reason: 'Other', pct: 15 },
              ].map(r => (
                <div key={r.reason} className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] ${theme.iconColor} w-20`}>{r.reason}</span>
                  <div className={`flex-1 h-2 rounded-full ${theme.accentBg}`}>
                    <div className="h-full rounded-full bg-amber-500" style={{ width: `${r.pct}%` }} />
                  </div>
                  <span className={`text-[10px] font-bold ${theme.highlight}`}>{r.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {expandedReport === 'Remark Submission Status' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 space-y-4`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Remark Submission Compliance</h3>
            <span className={`text-xs px-3 py-1 rounded-full font-bold bg-emerald-100 text-emerald-700`}>Overall: 78%</span>
          </div>
          <div className="space-y-2">
            {[
              { cls: 'Class 1', pct: 92 }, { cls: 'Class 2', pct: 88 },
              { cls: 'Class 3', pct: 85 }, { cls: 'Class 4', pct: 80 },
              { cls: 'Class 5', pct: 75 }, { cls: 'Class 6', pct: 70 },
              { cls: 'Class 7', pct: 82 }, { cls: 'Class 8', pct: 68 },
              { cls: 'Class 9', pct: 72 }, { cls: 'Class 10', pct: 65 },
            ].map(c => (
              <div key={c.cls} className="flex items-center gap-3">
                <span className={`text-xs ${theme.highlight} w-16 font-medium`}>{c.cls}</span>
                <div className={`flex-1 h-4 rounded-full ${theme.secondaryBg} overflow-hidden`}>
                  <div
                    className={`h-full rounded-full ${c.pct >= 80 ? 'bg-emerald-500' : c.pct >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ width: `${c.pct}%` }}
                  />
                </div>
                <span className={`text-xs font-bold ${theme.highlight} w-10 text-right`}>{c.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gap #9 — Batch-wise Student List */}
      {expandedReport === 'Batch-wise Student List' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 space-y-4`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Batch-wise Student List</h3>
            <button onClick={() => window.alert('Downloading PDF... (Blueprint demo)')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${theme.primary} text-white text-[10px] font-bold`}>
              <Download size={10} /> Download as PDF
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className={theme.secondaryBg}>
                  {['Class', 'Section', 'Total', 'Boys', 'Girls', 'New Admissions'].map(h => (
                    <th key={h} className={`px-3 py-2 text-left text-[10px] font-bold ${theme.iconColor} uppercase`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { cls: 'Grade 1', section: 'A / B / C', total: 120, boys: 65, girls: 55, newAdm: 18 },
                  { cls: 'Grade 2', section: 'A / B / C', total: 115, boys: 60, girls: 55, newAdm: 8 },
                  { cls: 'Grade 5', section: 'A / B', total: 90, boys: 48, girls: 42, newAdm: 5 },
                  { cls: 'Grade 8', section: 'A / B', total: 80, boys: 42, girls: 38, newAdm: 3 },
                  { cls: 'Grade 10', section: 'A / B', total: 72, boys: 38, girls: 34, newAdm: 2 },
                ].map((r, i) => (
                  <tr key={i} className={`border-t ${theme.border}`}>
                    <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{r.cls}</td>
                    <td className={`px-3 py-2 ${theme.iconColor}`}>{r.section}</td>
                    <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{r.total}</td>
                    <td className="px-3 py-2 font-bold text-blue-600">{r.boys}</td>
                    <td className="px-3 py-2 font-bold text-pink-600">{r.girls}</td>
                    <td className="px-3 py-2 font-bold text-emerald-600">{r.newAdm}</td>
                  </tr>
                ))}
                <tr className={`border-t-2 ${theme.border}`}>
                  <td className={`px-3 py-2 font-bold ${theme.highlight}`} colSpan={2}>Total</td>
                  <td className={`px-3 py-2 font-bold ${theme.primaryText}`}>477</td>
                  <td className="px-3 py-2 font-bold text-blue-600">253</td>
                  <td className="px-3 py-2 font-bold text-pink-600">224</td>
                  <td className="px-3 py-2 font-bold text-emerald-600">36</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Admit Cards / Hall Tickets ── */}
      {expandedReport === 'Admit Cards / Hall Tickets' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 space-y-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Printer size={18} className={theme.primaryText} />
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Admit Cards / Hall Tickets</h3>
              <span title="Generate and print exam admit cards with student photo and schedule. Mobile: students view in app"><Info size={14} className={`${theme.iconColor} cursor-help`} /></span>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full font-bold bg-blue-100 text-blue-700`}>Generated 120/145 | Pending 25</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Exam</label>
              <select value={admitExam} onChange={e => setAdmitExam(e.target.value)} className={`w-full px-3 py-2 rounded-xl text-xs border ${theme.border} ${theme.inputBg} ${theme.highlight}`}>
                {['Term 1', 'Term 2', 'Final'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Class</label>
              <select value={admitClass} onChange={e => setAdmitClass(e.target.value)} className={`w-full px-3 py-2 rounded-xl text-xs border ${theme.border} ${theme.inputBg} ${theme.highlight}`}>
                {['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
          {/* Preview Card */}
          <div className={`${theme.secondaryBg} rounded-xl p-4 border ${theme.border}`}>
            <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-2`}>Preview — Admit Card</p>
            <div className={`${theme.cardBg} rounded-xl p-4 border ${theme.border} space-y-3`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center text-[8px] text-gray-500 font-bold">LOGO</div>
                <div className="flex-1 text-center">
                  <p className={`text-xs font-bold ${theme.highlight}`}>Saaras International School</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{admitExam} Examination — 2025-26</p>
                </div>
                <div className="w-10 h-12 rounded-lg bg-gray-200 flex items-center justify-center text-[7px] text-gray-500 font-bold">Photo</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div><p className={`text-[9px] ${theme.iconColor}`}>Name</p><p className={`text-xs font-bold ${theme.highlight}`}>Aarav Mehta</p></div>
                <div><p className={`text-[9px] ${theme.iconColor}`}>Class</p><p className={`text-xs font-bold ${theme.highlight}`}>{admitClass} - A</p></div>
                <div><p className={`text-[9px] ${theme.iconColor}`}>Roll No.</p><p className={`text-xs font-bold ${theme.highlight}`}>12</p></div>
              </div>
              <table className="w-full text-[10px]">
                <thead>
                  <tr className={theme.secondaryBg}>
                    <th className={`px-2 py-1 text-left ${theme.iconColor}`}>Subject</th>
                    <th className={`px-2 py-1 text-left ${theme.iconColor}`}>Date</th>
                    <th className={`px-2 py-1 text-left ${theme.iconColor}`}>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { sub: 'Mathematics', date: 'Mar 10, 2026', time: '9:00 - 12:00' },
                    { sub: 'Science', date: 'Mar 12, 2026', time: '9:00 - 12:00' },
                    { sub: 'English', date: 'Mar 14, 2026', time: '9:00 - 11:00' },
                  ].map((r, i) => (
                    <tr key={i} className={`border-t ${theme.border}`}>
                      <td className={`px-2 py-1 ${theme.highlight}`}>{r.sub}</td>
                      <td className={`px-2 py-1 ${theme.iconColor}`}>{r.date}</td>
                      <td className={`px-2 py-1 ${theme.iconColor}`}>{r.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className={`text-[9px] ${theme.iconColor} italic`}>Instructions: Carry this admit card to the exam hall. No electronic devices allowed.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => window.alert('Generating admit cards for ' + admitClass + '... (Blueprint demo)')} className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>Generate for Class</button>
            <button onClick={() => window.alert('Generating all admit cards... (Blueprint demo)')} className={`px-4 py-2 rounded-xl border ${theme.border} text-xs font-bold ${theme.highlight}`}>Generate All</button>
            <button onClick={() => window.alert('Downloading bulk PDF... (Blueprint demo)')} className={`px-4 py-2 rounded-xl border ${theme.border} text-xs font-bold ${theme.highlight} flex items-center gap-1`}><Download size={12} /> Download as PDF (Bulk)</button>
          </div>
          <div className="flex items-start gap-1.5 px-1">
            <Smartphone size={11} className={`${theme.iconColor} shrink-0 mt-0.5`} />
            <p className={`text-[10px] ${theme.iconColor}`}>Mobile: Students can view their admit card directly in the app</p>
          </div>
        </div>
      )}

      {/* ── Bulk Report Card Generation ── */}
      {expandedReport === 'Bulk Report Card Generation' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 space-y-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCheck size={18} className={theme.primaryText} />
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Bulk Report Card Generation</h3>
              <span title="Generate and download all report cards for a class in one click"><Info size={14} className={`${theme.iconColor} cursor-help`} /></span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Class</label>
              <select value={bulkClass} onChange={e => setBulkClass(e.target.value)} className={`w-full px-3 py-2 rounded-xl text-xs border ${theme.border} ${theme.inputBg} ${theme.highlight}`}>
                {['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Exam</label>
              <select value={bulkExam} onChange={e => setBulkExam(e.target.value)} className={`w-full px-3 py-2 rounded-xl text-xs border ${theme.border} ${theme.inputBg} ${theme.highlight}`}>
                {['Term 1', 'Term 2', 'Final'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
              <p className={`text-lg font-bold ${theme.highlight}`}>45</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Total Students</p>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
              <p className="text-lg font-bold text-emerald-600">43</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Marks Entered</p>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
              <p className="text-lg font-bold text-amber-600">2</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Pending</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold ${theme.highlight}`}>Include QR verification code on report card</span>
              </div>
              <button onClick={() => setQrToggle(!qrToggle)} className={`w-9 h-5 rounded-full relative transition-colors ${qrToggle ? theme.primary : 'bg-gray-300'}`}>
                <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${qrToggle ? 'translate-x-4' : 'translate-x-0.5'}`} />
              </button>
            </div>
            <div className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold ${theme.highlight}`}>Include Principal&apos;s digital signature</span>
              </div>
              <button onClick={() => setSignToggle(!signToggle)} className={`w-9 h-5 rounded-full relative transition-colors ${signToggle ? theme.primary : 'bg-gray-300'}`}>
                <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${signToggle ? 'translate-x-4' : 'translate-x-0.5'}`} />
              </button>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => window.alert('Generating all report cards for ' + bulkClass + '... (Blueprint demo)')} className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>Generate All Report Cards</button>
            <button onClick={() => window.alert('Downloading ZIP... (Blueprint demo)')} className={`px-4 py-2 rounded-xl border ${theme.border} text-xs font-bold ${theme.highlight} flex items-center gap-1`}><Download size={12} /> Download ZIP (PDF)</button>
          </div>
        </div>
      )}

      {/* ── Mark Entry Compliance ── */}
      {expandedReport === 'Mark Entry Compliance' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 space-y-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClipboardCheck size={18} className={theme.primaryText} />
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Mark Entry Compliance</h3>
              <span title="Track which teachers have completed mark entry per exam"><Info size={14} className={`${theme.iconColor} cursor-help`} /></span>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full font-bold bg-blue-100 text-blue-700`}>Overall: 85% complete</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className={theme.secondaryBg}>
                  {['Subject', 'Teacher', 'Marks Entered', 'Deadline', 'Status'].map(h => (
                    <th key={h} className={`px-3 py-2 text-left text-[10px] font-bold ${theme.iconColor} uppercase`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { subject: 'Mathematics', teacher: 'Mr. Sharma', pct: '100%', deadline: 'Feb 28', status: 'Complete' },
                  { subject: 'Science', teacher: 'Mrs. Iyer', pct: '100%', deadline: 'Feb 28', status: 'Complete' },
                  { subject: 'English', teacher: 'Ms. D\'Souza', pct: '100%', deadline: 'Feb 28', status: 'Complete' },
                  { subject: 'Hindi', teacher: 'Mrs. Mishra', pct: '100%', deadline: 'Mar 1', status: 'Complete' },
                  { subject: 'Social Science', teacher: 'Mr. Reddy', pct: '100%', deadline: 'Mar 1', status: 'Complete' },
                  { subject: 'Computer Sc.', teacher: 'Mr. Joshi', pct: '100%', deadline: 'Mar 2', status: 'Complete' },
                  { subject: 'Physical Ed.', teacher: 'Mr. Patil', pct: '72%', deadline: 'Mar 3', status: 'Pending' },
                  { subject: 'Art', teacher: 'Mrs. Kulkarni', pct: '45%', deadline: 'Feb 25', status: 'Overdue' },
                ].map((r, i) => (
                  <tr key={i} className={`border-t ${theme.border}`}>
                    <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{r.subject}</td>
                    <td className={`px-3 py-2 ${theme.iconColor}`}>{r.teacher}</td>
                    <td className={`px-3 py-2 font-bold ${r.pct === '100%' ? 'text-emerald-600' : r.status === 'Overdue' ? 'text-red-600' : 'text-amber-600'}`}>{r.pct}</td>
                    <td className={`px-3 py-2 ${theme.iconColor}`}>{r.deadline}</td>
                    <td className="px-3 py-2">
                      <span className={`text-[10px] font-bold ${
                        r.status === 'Complete' ? 'text-emerald-600' : r.status === 'Pending' ? 'text-amber-600' : 'text-red-600'
                      }`}>
                        {r.status === 'Complete' ? '\u2705' : r.status === 'Pending' ? '\u23F3' : '\u274C'} {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={() => window.alert('Reminders sent to pending teachers. (Blueprint demo)')} className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>Send Reminder to Pending</button>
        </div>
      )}

      {/* Gap #13 — Grade-wise Student Count */}
      {expandedReport === 'Grade-wise Student Count' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 space-y-4`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Grade-wise Student Count</h3>
            <button onClick={() => window.alert('Exporting... (Blueprint demo)')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${theme.primary} text-white text-[10px] font-bold`}>
              <Download size={10} /> Export
            </button>
          </div>
          <div className="space-y-2">
            {[
              { grade: 'Grade 1', count: 120 },
              { grade: 'Grade 2', count: 115 },
              { grade: 'Grade 3', count: 110 },
              { grade: 'Grade 4', count: 105 },
              { grade: 'Grade 5', count: 90 },
              { grade: 'Grade 6', count: 88 },
              { grade: 'Grade 7', count: 85 },
              { grade: 'Grade 8', count: 80 },
              { grade: 'Grade 9', count: 75 },
              { grade: 'Grade 10', count: 72 },
              { grade: 'Grade 11', count: 55 },
              { grade: 'Grade 12', count: 45 },
            ].map(g => (
              <div key={g.grade} className="flex items-center gap-3">
                <span className={`text-xs ${theme.highlight} w-20 font-medium`}>{g.grade}</span>
                <div className={`flex-1 h-6 rounded-lg ${theme.secondaryBg} overflow-hidden relative`}>
                  <div
                    className={`h-full rounded-lg ${theme.primary}`}
                    style={{ width: `${(g.count / 120) * 100}%` }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white mix-blend-difference">{g.count} students</span>
                </div>
                <span className={`text-xs font-bold ${theme.highlight} w-8 text-right`}>{g.count}</span>
              </div>
            ))}
          </div>
          <div className={`flex justify-between pt-3 border-t ${theme.border}`}>
            <span className={`text-sm font-bold ${theme.highlight}`}>Total Enrollment</span>
            <span className={`text-sm font-bold ${theme.primaryText}`}>1,040 students</span>
          </div>
        </div>
      )}


      {/* ── Saved Filters Tab ── */}
      {tab === 'Saved Filters' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className={`text-xs ${theme.iconColor}`}>{savedFilters.length} saved report filters</p>
            <button onClick={() => setShowSaveFilter(!showSaveFilter)} className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Save size={14} /> Save Current Filter</button>
          </div>
          {showSaveFilter && (
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-3`}>
              <p className={`text-xs font-bold ${theme.highlight}`}>Save Current Filter</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Filter Name</label>
                  <input placeholder="e.g. Monthly Fee Defaulters" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`} />
                </div>
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Visibility</label>
                  <div className="flex gap-3 items-center mt-1">
                    <label className="flex items-center gap-1"><input type="radio" name="filterVis" defaultChecked className="accent-slate-600" /><span className={`text-xs ${theme.iconColor}`}>Private</span></label>
                    <label className="flex items-center gap-1"><input type="radio" name="filterVis" className="accent-slate-600" /><span className={`text-xs ${theme.iconColor}`}>Public (all admins)</span></label>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setShowSaveFilter(false)} className={`px-4 py-2 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.highlight} ${theme.buttonHover}`}>Cancel</button>
                <button onClick={() => { window.alert('Filter saved! (Blueprint demo)'); setShowSaveFilter(false); }} className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>Save Filter</button>
              </div>
            </div>
          )}
          <div className="space-y-2">
            {savedFilters.map(f => (
              <div key={f.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <Bookmark size={16} className={theme.primaryText} />
                  <div>
                    <p className={`text-xs font-bold ${theme.highlight}`}>{f.name}</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>{f.type} &middot; Created by: {f.createdBy} &middot; Last used: {f.lastUsed}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${f.isPublic ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>{f.isPublic ? 'Public' : 'Private'}</span>
                  <button onClick={() => window.alert(`Loading filter "${f.name}"... (Blueprint demo)`)} className={`p-1.5 rounded-lg ${theme.secondaryBg}`} title="Load"><Play size={12} className={theme.iconColor} /></button>
                  <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`} title="Edit"><Edit size={12} className={theme.iconColor} /></button>
                  <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`} title="Share"><Share2 size={12} className={theme.iconColor} /></button>
                  <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`} title="Delete"><Trash2 size={12} className="text-red-400" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Report Builder Tab ── */}
      {tab === 'Report Builder' && (
        <div className="space-y-4">
          {/* Step indicator */}
          <div className="flex items-center gap-2">
            {[
              { step: 1, label: 'Data Source', icon: Database },
              { step: 2, label: 'Fields', icon: Columns },
              { step: 3, label: 'Filters', icon: SlidersHorizontal },
              { step: 4, label: 'Visualization', icon: BarChart },
              { step: 5, label: 'Export', icon: Download },
            ].map((s, i) => (
              <React.Fragment key={s.step}>
                <button
                  onClick={() => setBuilderStep(s.step)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${builderStep === s.step ? `${theme.primary} text-white` : builderStep > s.step ? 'bg-emerald-100 text-emerald-700' : `${theme.secondaryBg} ${theme.iconColor}`}`}
                >
                  <s.icon size={14} />
                  {s.label}
                </button>
                {i < 4 && <div className={`w-6 h-0.5 ${builderStep > s.step ? 'bg-emerald-400' : theme.secondaryBg}`} />}
              </React.Fragment>
            ))}
          </div>

          {/* Step 1: Data Source */}
          {builderStep === 1 && (
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 space-y-3`}>
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Step 1: Select Data Source</h3>
              <div className="grid grid-cols-3 gap-3">
                {dataSources.map(ds => (
                  <button
                    key={ds}
                    onClick={() => { setBuilderSource(ds); setBuilderFields(fieldsBySource[ds].slice(0, 3)); }}
                    className={`p-4 rounded-xl text-center transition-all border ${builderSource === ds ? `${theme.primary} text-white border-transparent` : `${theme.border} ${theme.highlight} ${theme.buttonHover}`}`}
                  >
                    <Database size={20} className={`mx-auto mb-1 ${builderSource === ds ? 'text-white' : theme.iconColor}`} />
                    <p className="text-xs font-bold">{ds}</p>
                  </button>
                ))}
              </div>
              <div className="flex justify-end">
                <button onClick={() => setBuilderStep(2)} className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>Next: Select Fields</button>
              </div>
            </div>
          )}

          {/* Step 2: Fields */}
          {builderStep === 2 && (
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 space-y-3`}>
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Step 2: Select Fields ({builderSource})</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {(fieldsBySource[builderSource] || []).map(field => (
                  <label key={field} className={`flex items-center gap-2 p-2.5 rounded-xl cursor-pointer transition-all ${builderFields.includes(field) ? `${theme.secondaryBg} border ${theme.border}` : `${theme.cardBg} border border-transparent`}`}>
                    <input type="checkbox" checked={builderFields.includes(field)} onChange={() => toggleField(field)} className="accent-slate-600" />
                    <span className={`text-xs font-bold ${theme.highlight}`}>{field}</span>
                  </label>
                ))}
              </div>
              <p className={`text-[10px] ${theme.iconColor}`}>{builderFields.length} field(s) selected</p>
              <div className="flex justify-between">
                <button onClick={() => setBuilderStep(1)} className={`px-4 py-2 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.highlight} ${theme.buttonHover}`}>Back</button>
                <button onClick={() => setBuilderStep(3)} className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>Next: Apply Filters</button>
              </div>
            </div>
          )}

          {/* Step 3: Filters */}
          {builderStep === 3 && (
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 space-y-3`}>
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Step 3: Apply Filters</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Date Range</label>
                  <div className="flex gap-2">
                    <input type="date" defaultValue="2025-06-01" className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`} />
                    <input type="date" defaultValue="2026-03-01" className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`} />
                  </div>
                </div>
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Class</label>
                  <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                    <option>All Classes</option>
                    {Array.from({ length: 12 }, (_, i) => <option key={i}>Class {i + 1}</option>)}
                  </select>
                </div>
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Section</label>
                  <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                    <option>All Sections</option>
                    <option>A</option><option>B</option><option>C</option><option>D</option>
                  </select>
                </div>
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Status</label>
                  <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                    <option>All</option><option>Active</option><option>Inactive</option><option>Pending</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-between">
                <button onClick={() => setBuilderStep(2)} className={`px-4 py-2 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.highlight} ${theme.buttonHover}`}>Back</button>
                <button onClick={() => setBuilderStep(4)} className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>Next: Visualization</button>
              </div>
            </div>
          )}

          {/* Step 4: Visualization */}
          {builderStep === 4 && (
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 space-y-3`}>
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Step 4: Choose Visualization</h3>
              <div className="grid grid-cols-4 gap-3">
                {vizOptions.map(v => {
                  const VizIcon = v === 'Table' ? Table : v === 'Bar Chart' ? BarChart : v === 'Pie Chart' ? PieChart : TrendingUp;
                  return (
                    <button
                      key={v}
                      onClick={() => setBuilderViz(v)}
                      className={`p-4 rounded-xl text-center transition-all border ${builderViz === v ? `${theme.primary} text-white border-transparent` : `${theme.border} ${theme.highlight} ${theme.buttonHover}`}`}
                    >
                      <VizIcon size={24} className={`mx-auto mb-1 ${builderViz === v ? 'text-white' : theme.iconColor}`} />
                      <p className="text-xs font-bold">{v}</p>
                    </button>
                  );
                })}
              </div>
              {/* Preview area */}
              <div className={`p-4 rounded-xl ${theme.secondaryBg} space-y-2`}>
                <p className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>Preview — {builderViz} ({builderSource})</p>
                {builderViz === 'Table' && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead><tr className={theme.secondaryBg}>{builderFields.map(f => <th key={f} className={`px-2 py-1 text-left text-[10px] ${theme.iconColor}`}>{f}</th>)}</tr></thead>
                      <tbody>
                        {[1, 2, 3].map(i => (
                          <tr key={i} className={`border-t ${theme.border}`}>
                            {builderFields.map(f => <td key={f} className={`px-2 py-1 ${theme.iconColor}`}>Sample {i}</td>)}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {builderViz === 'Bar Chart' && (
                  <div className="flex items-end gap-3 h-24">
                    {[65, 82, 45, 90, 72].map((v, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <span className={`text-[9px] font-bold ${theme.highlight}`}>{v}</span>
                        <div className={`w-full rounded-t-lg ${theme.primary}`} style={{ height: `${v}%` }} />
                        <span className={`text-[8px] ${theme.iconColor}`}>G{i + 1}</span>
                      </div>
                    ))}
                  </div>
                )}
                {builderViz === 'Pie Chart' && (
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-conic border-4 border-blue-500 relative">
                      <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
                        <span className={`text-[10px] font-bold ${theme.highlight}`}>100%</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      {['Segment A (40%)', 'Segment B (35%)', 'Segment C (25%)'].map(s => (
                        <div key={s} className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-blue-500" />
                          <span className={`text-[10px] ${theme.iconColor}`}>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {builderViz === 'Line Graph' && (
                  <div className="flex items-end gap-2 h-24">
                    {[40, 55, 48, 72, 65, 85].map((v, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${theme.primary}`} style={{ marginBottom: `${v - 10}%` }} />
                        <span className={`text-[8px] ${theme.iconColor}`}>M{i + 1}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex justify-between">
                <button onClick={() => setBuilderStep(3)} className={`px-4 py-2 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.highlight} ${theme.buttonHover}`}>Back</button>
                <button onClick={() => setBuilderStep(5)} className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>Next: Export</button>
              </div>
            </div>
          )}

          {/* Step 5: Export */}
          {builderStep === 5 && (
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 space-y-4`}>
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Step 5: Export Options</h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { format: 'PDF', icon: FileCheck, desc: 'Formatted report with headers' },
                  { format: 'Excel', icon: FileSpreadsheet, desc: 'Editable spreadsheet (.xlsx)' },
                  { format: 'CSV', icon: Table, desc: 'Raw data for import/analysis' },
                ].map(e => (
                  <button
                    key={e.format}
                    onClick={() => window.alert(`Exporting as ${e.format}... (Blueprint demo)`)}
                    className={`p-4 rounded-xl border ${theme.border} text-center ${theme.buttonHover} transition-all`}
                  >
                    <e.icon size={24} className={`${theme.iconColor} mx-auto mb-2`} />
                    <p className={`text-xs font-bold ${theme.highlight}`}>{e.format}</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>{e.desc}</p>
                  </button>
                ))}
              </div>
              <div className={`p-3 rounded-xl ${theme.secondaryBg} flex items-center justify-between`}>
                <span className={`text-xs ${theme.iconColor}`}>Source: {builderSource} | Fields: {builderFields.length} | Viz: {builderViz}</span>
                <button onClick={() => window.alert('Report template saved! (Blueprint demo)')} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${theme.primaryText} flex items-center gap-1 ${theme.buttonHover}`}>
                  <Save size={12} /> Save as Template
                </button>
              </div>
              <div className="flex justify-between">
                <button onClick={() => setBuilderStep(4)} className={`px-4 py-2 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.highlight} ${theme.buttonHover}`}>Back</button>
                <button onClick={() => window.alert('Generating report... (Blueprint demo)')} className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold flex items-center gap-1`}><Download size={14} /> Generate Report</button>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}