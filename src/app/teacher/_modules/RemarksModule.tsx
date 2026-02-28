'use client';

import React, { useState } from 'react';
import { StatCard, TabBar, DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  MessageSquare, CheckCircle, Clock, Send, Plus, Search,
  Download, Eye, Edit3, AlertTriangle, Bell, FileText,
  Users, Filter, ChevronRight, BookOpen, Sparkles, X
} from 'lucide-react';

// ─── MOCK DATA ──────────────────────────────────────

const classes = ['10-A', '10-B', '9-A', '9-B', '8-A', '6-A'];

const studentsOf10A = [
  { roll: 1, name: 'Aarav Mehta', selected: false },
  { roll: 2, name: 'Ananya Iyer', selected: false },
  { roll: 3, name: 'Arjun Nair', selected: false },
  { roll: 4, name: 'Diya Kulkarni', selected: false },
  { roll: 5, name: 'Harsh Patel', selected: false },
  { roll: 6, name: 'Isha Reddy', selected: false },
  { roll: 7, name: 'Karan Singh', selected: false },
  { roll: 8, name: 'Meera Joshi', selected: false },
  { roll: 9, name: 'Nikhil Verma', selected: false },
  { roll: 10, name: 'Pooja Sharma', selected: false },
];

const remarkBankData = [
  { id: 1, text: 'Excellent performance in class. Consistently participates.', category: 'Academic', type: 'Positive' },
  { id: 2, text: 'Needs improvement in homework completion and timely submission.', category: 'Academic', type: 'Needs Attention' },
  { id: 3, text: 'Very attentive and asks insightful questions during lessons.', category: 'Academic', type: 'Positive' },
  { id: 4, text: 'Shows leadership qualities during group activities.', category: 'Behavioral', type: 'Positive' },
  { id: 5, text: 'Irregular attendance affecting academic performance.', category: 'Attendance', type: 'Needs Attention' },
  { id: 6, text: 'Outstanding performance in inter-school competition.', category: 'Co-curricular', type: 'Positive' },
  { id: 7, text: 'Needs to focus on improving handwriting and notebook presentation.', category: 'Academic', type: 'Neutral' },
  { id: 8, text: 'Well-behaved and respectful towards peers and teachers.', category: 'Behavioral', type: 'Positive' },
  { id: 9, text: 'Frequently disrupts class. Parent-teacher meeting recommended.', category: 'Behavioral', type: 'Needs Attention' },
  { id: 10, text: 'Active participant in sports and cultural events.', category: 'Co-curricular', type: 'Positive' },
  { id: 11, text: 'Has shown remarkable improvement in Mathematics this term.', category: 'Academic', type: 'Positive' },
  { id: 12, text: 'Frequently absent on Mondays. Pattern needs attention.', category: 'Attendance', type: 'Needs Attention' },
];

const submittedRemarks = [
  { student: 'Aarav Mehta', cls: '10-A', type: 'Common', remark: 'Excellent performance in class. Consistently participates.', status: 'Published', date: '2026-02-15', edited: false },
  { student: 'Diya Kulkarni', cls: '10-A', type: 'Subject', remark: 'Needs improvement in trigonometry practice problems.', status: 'Pending Moderation', date: '2026-02-20', edited: false },
  { student: 'Arjun Nair', cls: '10-A', type: 'Exam', remark: 'Scored well in UT-2. Consistent preparation evident.', status: 'Published', date: '2026-02-10', edited: true },
  { student: 'Nikhil Verma', cls: '10-A', type: 'Common', remark: 'Irregular attendance affecting academic performance.', status: 'Draft', date: '2026-02-25', edited: false },
  { student: 'Karan Singh', cls: '10-A', type: 'Subject', remark: 'Shows aptitude for problem-solving. Encourage Olympiad participation.', status: 'Published', date: '2026-02-08', edited: false },
  { student: 'Meera Joshi', cls: '10-A', type: 'Common', remark: 'Very attentive and asks insightful questions during lessons.', status: 'Pending Moderation', date: '2026-02-22', edited: true },
];

const classComplianceData = [
  { cls: '10-A', done: 8, total: 35 },
  { cls: '10-B', done: 0, total: 32 },
  { cls: '9-A', done: 12, total: 38 },
  { cls: '9-B', done: 5, total: 36 },
  { cls: '8-A', done: 3, total: 34 },
  { cls: '6-A', done: 0, total: 30 },
];

// ─── COMPONENT ──────────────────────────────────────

export default function RemarksModule({ theme }: { theme: Theme }) {
  const [section, setSection] = useState('Remark Entry');
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [remarkType, setRemarkType] = useState('Common Remark');
  const [studentSelection, setStudentSelection] = useState<Record<number, boolean>>({});
  const [studentRemarks, setStudentRemarks] = useState<Record<number, string>>({});
  const [studentPriority, setStudentPriority] = useState<Record<number, string>>({});
  const [moderationToggle, setModerationToggle] = useState(true);
  const [bankSearch, setBankSearch] = useState('');
  const [bankCategory, setBankCategory] = useState('All');
  const [remarkHistoryTab, setRemarkHistoryTab] = useState('All');
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [selectedHistoryStudent, setSelectedHistoryStudent] = useState('Aarav Mehta');

  const selectAll = Object.values(studentSelection).filter(Boolean).length === studentsOf10A.length;

  const filteredBank = remarkBankData.filter(r => {
    const matchSearch = bankSearch === '' || r.text.toLowerCase().includes(bankSearch.toLowerCase());
    const matchCategory = bankCategory === 'All' || r.category === bankCategory;
    return matchSearch && matchCategory;
  });

  const filteredSubmitted = remarkHistoryTab === 'All' ? submittedRemarks
    : submittedRemarks.filter(r => r.status === remarkHistoryTab);

  const totalDone = classComplianceData.reduce((a, c) => a + c.done, 0);
  const totalStudents = classComplianceData.reduce((a, c) => a + c.total, 0);
  const overallPct = Math.round((totalDone / totalStudents) * 100);

  const typeColor = (t: string) => {
    const map: Record<string, string> = { Positive: 'bg-emerald-100 text-emerald-700', Neutral: 'bg-blue-100 text-blue-700', 'Needs Attention': 'bg-red-100 text-red-700' };
    return map[t] || 'bg-slate-100 text-slate-600';
  };

  const statusColor = (s: string) => {
    const map: Record<string, string> = { Published: 'bg-emerald-100 text-emerald-700', 'Pending Moderation': 'bg-amber-100 text-amber-700', Draft: 'bg-slate-100 text-slate-600' };
    return map[s] || 'bg-slate-100 text-slate-600';
  };

  const categoryColor = (c: string) => {
    const map: Record<string, string> = { Academic: 'bg-blue-100 text-blue-700', Behavioral: 'bg-purple-100 text-purple-700', Attendance: 'bg-amber-100 text-amber-700', 'Co-curricular': 'bg-teal-100 text-teal-700' };
    return map[c] || 'bg-slate-100 text-slate-600';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Student Remarks</h1>
        <div className="relative">
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}
          >
            <Download size={14} /> Export <ChevronRight size={12} className={`transition-transform ${showExportMenu ? 'rotate-90' : ''}`} />
          </button>
          {showExportMenu && (
            <div className={`absolute right-0 top-full mt-1 ${theme.cardBg} rounded-xl border ${theme.border} shadow-lg z-10 overflow-hidden min-w-[160px]`}>
              <button onClick={() => { alert('Exporting as PDF... (Blueprint demo)'); setShowExportMenu(false); }} className={`w-full flex items-center gap-2 px-4 py-2.5 text-xs font-bold ${theme.highlight} ${theme.buttonHover} transition-all`}>
                <FileText size={12} /> Export as PDF
              </button>
              <button onClick={() => { alert('Exporting as CSV... (Blueprint demo)'); setShowExportMenu(false); }} className={`w-full flex items-center gap-2 px-4 py-2.5 text-xs font-bold ${theme.highlight} ${theme.buttonHover} transition-all border-t ${theme.border}`}>
                <Download size={12} /> Export as CSV
              </button>
              <button onClick={() => { alert('Sending to printer... (Blueprint demo)'); setShowExportMenu(false); }} className={`w-full flex items-center gap-2 px-4 py-2.5 text-xs font-bold ${theme.highlight} ${theme.buttonHover} transition-all border-t ${theme.border}`}>
                <Eye size={12} /> Print
              </button>
            </div>
          )}
        </div>
      </div>

      <TabBar tabs={['Remark Entry', 'Remark Bank', 'My Submitted', 'Compliance', 'Student History']} active={section} onChange={setSection} theme={theme} />

      {/* ── E) NOTIFICATION INDICATOR ── */}
      <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 border border-blue-200`}>
        <Bell size={14} className="text-blue-500" />
        <p className="text-xs text-blue-700 font-medium">Published remarks will trigger instant notification to parents via app and SMS.</p>
      </div>

      {/* ── A) REMARK ENTRY ── */}
      {section === 'Remark Entry' && (
        <div className="space-y-4">
          <div className="flex gap-3 flex-wrap items-center">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg}`}>
              <span className={`text-xs font-bold ${theme.iconColor}`}>Class:</span>
              <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className={`text-xs font-bold ${theme.highlight} bg-transparent outline-none`}>
                {classes.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <TabBar tabs={['Common Remark', 'Subject-wise', 'Exam-wise']} active={remarkType} onChange={setRemarkType} theme={theme} />

          {remarkType === 'Subject-wise' && (
            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} w-fit`}>
              <span className={`text-xs font-bold ${theme.iconColor}`}>Subject:</span>
              <select className={`text-xs font-bold ${theme.highlight} bg-transparent outline-none`}>
                <option>Mathematics</option>
                <option>Science</option>
              </select>
            </div>
          )}

          {remarkType === 'Exam-wise' && (
            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} w-fit`}>
              <span className={`text-xs font-bold ${theme.iconColor}`}>Exam:</span>
              <select className={`text-xs font-bold ${theme.highlight} bg-transparent outline-none`}>
                <option>UT-1</option>
                <option>UT-2</option>
                <option>UT-3</option>
                <option>Half Yearly</option>
                <option>Annual</option>
              </select>
            </div>
          )}

          {/* Bulk selection header */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden`}>
            <div className={`flex items-center justify-between p-3 ${theme.secondaryBg}`}>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={() => {
                      const newVal = !selectAll;
                      const newSelection: Record<number, boolean> = {};
                      studentsOf10A.forEach(s => { newSelection[s.roll] = newVal; });
                      setStudentSelection(newSelection);
                    }}
                    className="w-4 h-4 rounded"
                  />
                  <span className={`text-xs font-bold ${theme.highlight}`}>Select All</span>
                </label>
                <span className={`text-[10px] ${theme.iconColor}`}>{Object.values(studentSelection).filter(Boolean).length} / {studentsOf10A.length} selected</span>
              </div>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <span className={`text-[10px] font-bold ${theme.iconColor}`}>Submit for Moderation</span>
                  <button
                    onClick={() => setModerationToggle(!moderationToggle)}
                    className={`w-9 h-5 rounded-full relative transition-colors ${moderationToggle ? theme.primary : 'bg-gray-300'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${moderationToggle ? 'translate-x-4' : 'translate-x-0.5'}`} />
                  </button>
                </label>
              </div>
            </div>

            {/* Student list with remark entry */}
            <div className="divide-y divide-slate-100">
              {studentsOf10A.map(s => (
                <div key={s.roll} className={`p-3 ${studentSelection[s.roll] ? theme.accentBg : ''}`}>
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={studentSelection[s.roll] || false}
                      onChange={() => setStudentSelection(prev => ({ ...prev, [s.roll]: !prev[s.roll] }))}
                      className="w-4 h-4 rounded mt-1"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold ${theme.iconColor}`}>#{s.roll}</span>
                          <span className={`text-xs font-bold ${theme.highlight}`}>{s.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {['Positive', 'Neutral', 'Needs Attention'].map(p => (
                            <button
                              key={p}
                              onClick={() => setStudentPriority(prev => ({ ...prev, [s.roll]: p }))}
                              className={`text-[9px] px-2 py-0.5 rounded-full font-bold transition-all ${
                                studentPriority[s.roll] === p ? typeColor(p) : `${theme.secondaryBg} ${theme.iconColor}`
                              }`}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <select
                          onChange={e => {
                            if (e.target.value) {
                              setStudentRemarks(prev => ({ ...prev, [s.roll]: e.target.value }));
                            }
                          }}
                          className={`px-2 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight} w-48`}
                          defaultValue=""
                        >
                          <option value="">Select from Bank...</option>
                          {remarkBankData.filter(r => r.type !== 'Needs Attention' || true).map(r => (
                            <option key={r.id} value={r.text}>{r.text.substring(0, 50)}...</option>
                          ))}
                        </select>
                        <input
                          type="text"
                          placeholder="Or type a custom remark..."
                          value={studentRemarks[s.roll] || ''}
                          onChange={e => setStudentRemarks(prev => ({ ...prev, [s.roll]: e.target.value }))}
                          className={`flex-1 px-3 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={`p-3 flex items-center justify-between border-t ${theme.border}`}>
              <p className={`text-xs ${theme.iconColor}`}>
                {Object.values(studentRemarks).filter(Boolean).length} remarks entered | {Object.values(studentSelection).filter(Boolean).length} students selected
              </p>
              <button className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}>
                <Send size={14} /> Submit Remarks
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── B) REMARK BANK ── */}
      {section === 'Remark Bank' && (
        <div className="space-y-4">
          <div className="flex gap-3 flex-wrap items-center">
            <div className={`flex-1 relative`}>
              <Search size={14} className={`absolute left-3 top-2.5 ${theme.iconColor}`} />
              <input
                type="text"
                placeholder="Search remark templates..."
                value={bankSearch}
                onChange={e => setBankSearch(e.target.value)}
                className={`w-full pl-9 pr-4 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}
              />
            </div>
            <div className="flex gap-1">
              {['All', 'Academic', 'Behavioral', 'Attendance', 'Co-curricular'].map(c => (
                <button
                  key={c}
                  onClick={() => setBankCategory(c)}
                  className={`text-[10px] px-3 py-1.5 rounded-lg font-bold transition-all ${
                    bankCategory === c ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.iconColor} ${theme.buttonHover}`
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {filteredBank.map(r => (
              <div key={r.id} className={`${theme.cardBg} rounded-xl border ${theme.border} p-3 flex items-start gap-3`}>
                <div className="flex-1">
                  <p className={`text-xs ${theme.highlight} leading-relaxed`}>{r.text}</p>
                  <div className="flex gap-2 mt-2">
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${categoryColor(r.category)}`}>{r.category}</span>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${typeColor(r.type)}`}>{r.type}</span>
                  </div>
                </div>
                <button className={`p-1.5 rounded-lg ${theme.secondaryBg} ${theme.buttonHover}`} title="Use this remark"><ChevronRight size={12} className={theme.iconColor} /></button>
              </div>
            ))}
          </div>

          <div className={`${theme.cardBg} rounded-2xl border-2 border-dashed ${theme.border} p-4 space-y-3`}>
            <div className="flex items-center gap-2">
              <Plus size={14} className={theme.iconColor} />
              <h4 className={`text-sm font-bold ${theme.highlight}`}>Add New Template to Bank</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-2">
                <input type="text" placeholder="Enter remark text..." className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`} />
              </div>
              <div className="flex gap-2">
                <select className={`flex-1 px-2 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                  <option>Academic</option>
                  <option>Behavioral</option>
                  <option>Attendance</option>
                  <option>Co-curricular</option>
                </select>
                <button className={`px-3 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── C) MY SUBMITTED REMARKS ── */}
      {section === 'My Submitted' && (
        <div className="space-y-4">
          <TabBar tabs={['All', 'Draft', 'Pending Moderation', 'Published']} active={remarkHistoryTab} onChange={setRemarkHistoryTab} theme={theme} />

          <DataTable
            headers={['Student', 'Class', 'Type', 'Remark', 'Status', 'Date', '']}
            rows={filteredSubmitted.map(r => [
              <span key="s" className={`font-bold ${theme.highlight}`}>{r.student}</span>,
              <span key="c" className={theme.iconColor}>{r.cls}</span>,
              <span key="t" className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                r.type === 'Common' ? 'bg-blue-100 text-blue-700' : r.type === 'Subject' ? 'bg-purple-100 text-purple-700' : 'bg-teal-100 text-teal-700'
              }`}>{r.type}</span>,
              <span key="r" className={`${theme.iconColor} text-[11px]`}>{r.remark.substring(0, 40)}...</span>,
              <div key="st" className="flex items-center gap-1">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${statusColor(r.status)}`}>{r.status}</span>
                {r.edited && <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold bg-amber-100 text-amber-700">Edited</span>}
              </div>,
              <span key="d" className={theme.iconColor}>{r.date}</span>,
              <div key="a" className="flex gap-1">
                <button className={`p-1.5 rounded-lg ${theme.secondaryBg} ${theme.buttonHover}`} title="View History"><Eye size={12} className={theme.iconColor} /></button>
                <button className={`p-1.5 rounded-lg ${theme.secondaryBg} ${theme.buttonHover}`} title="Edit"><Edit3 size={12} className={theme.iconColor} /></button>
              </div>,
            ])}
            theme={theme}
          />

          <p className={`text-[10px] ${theme.iconColor} italic`}>Audit trail: All edits after initial submission are logged and marked with an &quot;Edited&quot; badge. Click the eye icon to view full history per student per year.</p>
        </div>
      )}

      {/* ── D) COMPLIANCE DASHBOARD ── */}
      {section === 'Compliance' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <StatCard icon={Users} label="Total Students" value={totalStudents} color="bg-blue-500" theme={theme} />
            <StatCard icon={CheckCircle} label="Remarks Entered" value={totalDone} color="bg-emerald-500" sub={`${overallPct}% complete`} theme={theme} />
            <StatCard icon={Clock} label="Deadline" value="Mar 15" color="bg-red-500" sub="12 days remaining" theme={theme} />
          </div>

          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Remark Submission Progress</h3>
              <div className="text-right">
                <p className={`text-lg font-bold ${overallPct < 50 ? 'text-red-600' : overallPct < 75 ? 'text-amber-600' : 'text-emerald-600'}`}>{overallPct}% Complete</p>
                <p className={`text-[10px] ${theme.iconColor}`}>12 days remaining</p>
              </div>
            </div>

            <div className="space-y-3">
              {classComplianceData.map(c => {
                const pct = Math.round((c.done / c.total) * 100);
                return (
                  <div key={c.cls} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${theme.highlight}`}>Class {c.cls}</span>
                      <span className={`text-[10px] font-bold ${pct === 0 ? 'text-red-600' : pct < 50 ? 'text-amber-600' : 'text-emerald-600'}`}>
                        {c.done}/{c.total} students ({pct}%)
                      </span>
                    </div>
                    <div className={`w-full h-2.5 rounded-full ${theme.secondaryBg} overflow-hidden`}>
                      <div
                        className={`h-full rounded-full transition-all ${pct === 0 ? 'bg-red-400' : pct < 50 ? 'bg-amber-400' : 'bg-emerald-400'}`}
                        style={{ width: `${Math.max(pct, 2)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={`flex items-center gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-200`}>
            <AlertTriangle size={16} className="text-amber-500 shrink-0" />
            <div>
              <p className="text-xs font-bold text-amber-800">Deadline: March 15, 2026</p>
              <p className="text-[10px] text-amber-600 mt-0.5">{overallPct}% complete -- {totalStudents - totalDone} students remaining across {classComplianceData.filter(c => c.done < c.total).length} classes. Incomplete remarks will be flagged to administration.</p>
            </div>
          </div>
        </div>
      )}

      {/* ── E) STUDENT HISTORY ── */}
      {section === 'Student History' && (
        <div className="space-y-4">
          <div className={`flex items-center gap-3 px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} w-full md:w-96`}>
            <Search size={14} className={theme.iconColor} />
            <select
              value={selectedHistoryStudent}
              onChange={e => setSelectedHistoryStudent(e.target.value)}
              className={`flex-1 text-xs font-bold ${theme.highlight} bg-transparent outline-none`}
            >
              {studentsOf10A.map(s => <option key={s.roll} value={s.name}>{s.name} (Roll #{s.roll})</option>)}
            </select>
          </div>

          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-1`}>Remark History — {selectedHistoryStudent}</h3>
            <p className={`text-[10px] ${theme.iconColor} mb-4`}>All remarks across academic years</p>

            {/* 2025-26 Remarks */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-2 h-2 rounded-full bg-blue-500`} />
                <span className={`text-xs font-bold ${theme.highlight}`}>2025-26</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold bg-blue-100 text-blue-700`}>3 remarks</span>
              </div>
              <div className="ml-3 border-l-2 border-blue-200 pl-4 space-y-3">
                {[
                  { date: '2026-02-15', type: 'Common', text: 'Good improvement in overall classroom participation and homework completion.', by: 'Ms. Priya Sharma', status: 'Published' },
                  { date: '2026-01-20', type: 'Subject', text: 'Math — needs more practice in trigonometry. Recommend extra coaching sessions.', by: 'Ms. Priya Sharma', status: 'Published' },
                  { date: '2025-10-30', type: 'Exam', text: 'Term 1 — satisfactory performance. Scored above class average in 4/6 subjects.', by: 'Ms. Priya Sharma', status: 'Published' },
                ].map((r, i) => (
                  <div key={i} className={`p-3 rounded-xl ${theme.secondaryBg}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] ${theme.iconColor}`}>{r.date}</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                        r.type === 'Common' ? 'bg-blue-100 text-blue-700' : r.type === 'Subject' ? 'bg-purple-100 text-purple-700' : 'bg-teal-100 text-teal-700'
                      }`}>{r.type}</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${statusColor(r.status)}`}>{r.status}</span>
                    </div>
                    <p className={`text-xs ${theme.highlight} leading-relaxed`}>{r.text}</p>
                    <p className={`text-[10px] ${theme.iconColor} mt-1`}>Submitted by: {r.by}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2024-25 Remarks */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-2 h-2 rounded-full bg-slate-400`} />
                <span className={`text-xs font-bold ${theme.highlight}`}>2024-25</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${theme.secondaryBg} ${theme.iconColor}`}>2 remarks</span>
              </div>
              <div className="ml-3 border-l-2 border-slate-200 pl-4 space-y-3">
                {[
                  { date: '2025-03-15', type: 'Common', text: 'Excellent conduct throughout the year. Role model for peers.', by: 'Mr. Vikram Desai', status: 'Published' },
                  { date: '2024-10-28', type: 'Exam', text: 'Half Yearly — outstanding result. Class rank improved from 8th to 3rd.', by: 'Mr. Vikram Desai', status: 'Published' },
                ].map((r, i) => (
                  <div key={i} className={`p-3 rounded-xl ${theme.secondaryBg}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] ${theme.iconColor}`}>{r.date}</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                        r.type === 'Common' ? 'bg-blue-100 text-blue-700' : r.type === 'Subject' ? 'bg-purple-100 text-purple-700' : 'bg-teal-100 text-teal-700'
                      }`}>{r.type}</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${statusColor(r.status)}`}>{r.status}</span>
                    </div>
                    <p className={`text-xs ${theme.highlight} leading-relaxed`}>{r.text}</p>
                    <p className={`text-[10px] ${theme.iconColor} mt-1`}>Submitted by: {r.by}</p>
                  </div>
                ))}
              </div>
            </div>

            <button className={`text-xs font-bold ${theme.primaryText} underline`}>View Full History</button>
          </div>
        </div>
      )}
    </div>
  );
}
