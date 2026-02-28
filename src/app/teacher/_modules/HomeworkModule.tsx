'use client';

import React, { useState } from 'react';
import { StatCard, TabBar, StatusBadge, DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  FileText, Plus, X, Eye, Edit, Send, Upload, CheckCircle,
  Info, Paperclip, Download, BarChart3, Users, Link
} from 'lucide-react';

// ─── MOCK DATA ──────────────────────────────────────

const teacherProfile = {
  classes: ['10-A', '10-B', '9-A', '9-B', '8-A', '6-A'],
};

const homeworkList = [
  { id: 'HW001', title: 'Ch 7 — Coordinate Geometry Exercise', class: '10-A', subject: 'Mathematics', assigned: '08 Feb 2026', due: '12 Feb 2026', status: 'Assigned', submitted: 28, total: 42, attachments: 2, difficulty: 'Medium' as const },
  { id: 'HW002', title: 'Ch 5 — Quadratic Equations Worksheet', class: '10-B', subject: 'Mathematics', assigned: '06 Feb 2026', due: '10 Feb 2026', status: 'Graded', submitted: 40, total: 40, attachments: 1, difficulty: 'Hard' as const },
  { id: 'HW003', title: 'Ch 4 — Light & Reflection Worksheet', class: '9-A', subject: 'Science', assigned: '07 Feb 2026', due: '11 Feb 2026', status: 'Submitted', submitted: 35, total: 38, attachments: 3, difficulty: 'Medium' as const },
  { id: 'HW004', title: 'Ch 6 — Chemical Reactions Lab Report', class: '9-B', subject: 'Science', assigned: '05 Feb 2026', due: '09 Feb 2026', status: 'Graded', submitted: 36, total: 36, attachments: 0, difficulty: 'Hard' as const },
  { id: 'HW005', title: 'Ch 2 — Fractions & Decimals', class: '6-A', subject: 'Mathematics', assigned: '09 Feb 2026', due: '13 Feb 2026', status: 'Assigned', submitted: 10, total: 34, attachments: 1, difficulty: 'Easy' as const },
  { id: 'HW006', title: 'Ch 3 — Linear Equations Practice', class: '8-A', subject: 'Mathematics', assigned: '04 Feb 2026', due: '08 Feb 2026', status: 'Graded', submitted: 34, total: 35, attachments: 0, difficulty: 'Easy' as const },
  { id: 'HW007', title: 'Ch 8 — Trigonometry Introduction', class: '10-A', subject: 'Mathematics', assigned: '10 Feb 2026', due: '14 Feb 2026', status: 'Assigned', submitted: 5, total: 42, attachments: 2, difficulty: 'Hard' as const },
];

const submissionsData = [
  { name: 'Aarav Mehta', submitted: '11 Feb 2026', hasFile: true, status: 'Submitted' as const, marks: 18, remarks: '', grade: 'A' },
  { name: 'Ananya Iyer', submitted: '10 Feb 2026', hasFile: true, status: 'Graded' as const, marks: 20, remarks: 'Excellent work', grade: 'A+' },
  { name: 'Arjun Nair', submitted: '12 Feb 2026', hasFile: true, status: 'Late' as const, marks: 12, remarks: '', grade: 'C' },
  { name: 'Diya Kulkarni', submitted: '10 Feb 2026', hasFile: true, status: 'Graded' as const, marks: 17, remarks: 'Good effort', grade: 'A' },
  { name: 'Harsh Patel', submitted: '—', hasFile: false, status: 'Not Submitted' as const, marks: 0, remarks: '', grade: '—' },
  { name: 'Isha Reddy', submitted: '09 Feb 2026', hasFile: true, status: 'Graded' as const, marks: 20, remarks: 'Perfect', grade: 'A+' },
  { name: 'Karan Singh', submitted: '11 Feb 2026', hasFile: true, status: 'Submitted' as const, marks: 15, remarks: '', grade: 'B+' },
  { name: 'Meera Joshi', submitted: '10 Feb 2026', hasFile: false, status: 'Graded' as const, marks: 16, remarks: 'Needs improvement in Q4', grade: 'B' },
  { name: 'Nikhil Verma', submitted: '—', hasFile: false, status: 'Not Submitted' as const, marks: 0, remarks: '', grade: '—' },
  { name: 'Pooja Sharma', submitted: '10 Feb 2026', hasFile: true, status: 'Graded' as const, marks: 19, remarks: 'Well done', grade: 'A' },
];

const peerReviewData = [
  { student: 'Aarav Mehta', reviews: 2, feedback: ['Clear explanation, good diagrams — Reviewer 1', 'Missing step 3 in proof — Reviewer 2'] },
  { student: 'Ananya Iyer', reviews: 2, feedback: ['Thorough and well-structured — Reviewer 1', 'Perfect solution — Reviewer 2'] },
  { student: 'Diya Kulkarni', reviews: 1, feedback: ['Good attempt, minor errors — Reviewer 1'] },
];

export default function HomeworkModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All Homework');
  const [showCreate, setShowCreate] = useState(false);
  const [enablePeerReview, setEnablePeerReview] = useState(false);
  const [expandedPeer, setExpandedPeer] = useState<string | null>(null);

  const difficultyBadge = (d: string) => {
    const map: Record<string, string> = {
      Easy: 'bg-emerald-100 text-emerald-700',
      Medium: 'bg-amber-100 text-amber-700',
      Hard: 'bg-red-100 text-red-700',
    };
    return map[d] || 'bg-slate-100 text-slate-600';
  };

  const submissionStatusColor = (s: string) => {
    const map: Record<string, string> = {
      Submitted: 'bg-blue-100 text-blue-700',
      Graded: 'bg-emerald-100 text-emerald-700',
      Late: 'bg-amber-100 text-amber-700',
      'Not Submitted': 'bg-red-100 text-red-700',
    };
    return map[s] || 'bg-slate-100 text-slate-600';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Homework Management</h1>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}
        >
          <Plus size={14} /> Create Homework
        </button>
      </div>
      <TabBar tabs={['All Homework', 'Assigned', 'Submitted', 'Graded', 'Grade Submissions', 'Reports']} active={tab} onChange={setTab} theme={theme} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={FileText} label="Total Assignments" value={homeworkList.length} color="bg-blue-500" theme={theme} />
        <StatCard icon={Send} label="Assigned" value={homeworkList.filter(h => h.status === 'Assigned').length} color="bg-amber-500" theme={theme} />
        <StatCard icon={Upload} label="Submitted" value={homeworkList.filter(h => h.status === 'Submitted').length} color="bg-purple-500" theme={theme} />
        <StatCard icon={CheckCircle} label="Graded" value={homeworkList.filter(h => h.status === 'Graded').length} color="bg-emerald-500" theme={theme} />
      </div>

      {/* Create Homework Form */}
      {showCreate && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-3`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Create New Homework</h3>
            <button onClick={() => setShowCreate(false)} className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><X size={14} className={theme.iconColor} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Class</label>
              <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`}>
                {teacherProfile.classes.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Subject</label>
              <input defaultValue="Mathematics" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`} readOnly />
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Due Date</label>
              <input type="date" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`} />
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>
                Difficulty
                <span title="Set difficulty level for this assignment"><Info size={14} className={`inline ml-1 ${theme.iconColor}`} /></span>
              </label>
              <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`}>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
          </div>
          <div>
            <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Title</label>
            <input placeholder="e.g., Ch 8 — Trigonometry Exercise 8.1" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`} />
          </div>
          <div>
            <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Description / Instructions</label>
            <textarea
              rows={3}
              placeholder="Enter homework description, page numbers, question numbers..."
              className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none resize-none`}
            />
          </div>

          {/* Attachments Section */}
          <div>
            <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>
              Attachments
              <span title="Attach worksheets, reference material, or videos"><Info size={14} className={`inline ml-1 ${theme.iconColor}`} /></span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-bold ml-1">Mobile</span>
            </label>
            <div className={`flex flex-col items-center justify-center py-6 rounded-xl ${theme.secondaryBg} border-2 border-dashed ${theme.border}`}>
              <Upload size={24} className={theme.iconColor} />
              <p className={`text-xs font-bold ${theme.highlight} mt-2`}>Drag & drop files here or click to browse</p>
              <p className={`text-[10px] ${theme.iconColor} mt-1`}>Allowed: PDF, Image, Doc, Video | Max 10MB per file</p>
            </div>
          </div>

          {/* Peer Review Toggle */}
          <div className={`flex items-center gap-3 p-3 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold ${theme.iconColor}`}>Enable Peer Review</span>
              <span title="Students review each other's work"><Info size={14} className={theme.iconColor} /></span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-bold">Mobile</span>
            </div>
            <button
              onClick={() => setEnablePeerReview(!enablePeerReview)}
              className={`w-9 h-5 rounded-full relative transition-colors ${enablePeerReview ? 'bg-emerald-500' : 'bg-gray-300'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${enablePeerReview ? 'translate-x-4' : 'translate-x-0.5'}`} />
            </button>
            {enablePeerReview && (
              <div className="flex items-center gap-3 ml-2">
                <div className="flex items-center gap-1">
                  <span className={`text-[10px] ${theme.iconColor}`}>Reviewers per submission:</span>
                  <input type="number" defaultValue={2} min={1} max={5} className={`w-12 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center outline-none`} />
                </div>
                <div className="flex items-center gap-1">
                  <span className={`text-[10px] ${theme.iconColor}`}>Anonymous:</span>
                  <button className={`w-8 h-4 rounded-full relative transition-colors bg-emerald-500`}>
                    <div className="w-3 h-3 bg-white rounded-full absolute top-0.5 translate-x-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2 justify-end">
            <button onClick={() => setShowCreate(false)} className={`px-4 py-2 rounded-xl ${theme.secondaryBg} text-sm font-bold ${theme.iconColor}`}>Cancel</button>
            <button className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Send size={14} /> Assign</button>
          </div>
        </div>
      )}

      {/* ── HOMEWORK TABLE (All/Assigned/Submitted/Graded) ── */}
      {(tab === 'All Homework' || tab === 'Assigned' || tab === 'Submitted' || tab === 'Graded') && (
        <DataTable
          headers={['ID', 'Title', 'Class', 'Difficulty', 'Assigned', 'Due', 'Submissions', 'Status', '']}
          rows={homeworkList
            .filter(h => tab === 'All Homework' || h.status === tab)
            .map(h => [
              <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{h.id}</span>,
              <span key="title" className="flex items-center gap-1.5">
                <span className={`font-bold ${theme.highlight} text-xs`}>{h.title}</span>
                {h.attachments > 0 && (
                  <span className={`flex items-center gap-0.5 text-[10px] ${theme.iconColor}`}>
                    <Paperclip size={10} /> {h.attachments}
                  </span>
                )}
              </span>,
              <span key="class" className={theme.iconColor}>{h.class}</span>,
              <span key="diff" className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${difficultyBadge(h.difficulty)}`}>{h.difficulty}</span>,
              <span key="assigned" className={theme.iconColor}>{h.assigned}</span>,
              <span key="due" className={theme.iconColor}>{h.due}</span>,
              <div key="sub" className="flex items-center gap-2">
                <div className={`w-16 h-1.5 rounded-full ${theme.secondaryBg}`}>
                  <div
                    className={`h-1.5 rounded-full ${h.submitted === h.total ? 'bg-emerald-500' : 'bg-blue-500'}`}
                    style={{ width: `${(h.submitted / h.total) * 100}%` }}
                  />
                </div>
                <span className={`text-xs ${theme.iconColor}`}>{h.submitted}/{h.total}</span>
              </div>,
              <StatusBadge key="status" status={h.status} theme={theme} />,
              <div key="actions" className="flex gap-1">
                <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
                <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Edit size={12} className={theme.iconColor} /></button>
              </div>,
            ])}
          theme={theme}
        />
      )}

      {/* ── TAB: GRADE SUBMISSIONS ── */}
      {tab === 'Grade Submissions' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Grade Submissions — HW001: Coordinate Geometry</h3>
            <span title="Review and grade individual student submissions"><Info size={14} className={theme.iconColor} /></span>
          </div>

          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden`}>
            <table className="w-full text-sm">
              <thead className={theme.secondaryBg}>
                <tr>
                  <th className={`text-left px-3 py-2.5 text-[10px] font-bold ${theme.iconColor} uppercase`}>Student Name</th>
                  <th className={`text-center px-3 py-2.5 text-[10px] font-bold ${theme.iconColor} uppercase`}>Submitted</th>
                  <th className={`text-center px-3 py-2.5 text-[10px] font-bold ${theme.iconColor} uppercase`}>File</th>
                  <th className={`text-center px-3 py-2.5 text-[10px] font-bold ${theme.iconColor} uppercase`}>Status</th>
                  <th className={`text-center px-3 py-2.5 text-[10px] font-bold ${theme.iconColor} uppercase`}>Marks (20)</th>
                  <th className={`text-left px-3 py-2.5 text-[10px] font-bold ${theme.iconColor} uppercase`}>Remarks</th>
                  <th className={`text-center px-3 py-2.5 text-[10px] font-bold ${theme.iconColor} uppercase`}>Grade</th>
                  <th className={`text-center px-3 py-2.5 text-[10px] font-bold ${theme.iconColor} uppercase`}>Peer Reviews</th>
                </tr>
              </thead>
              <tbody>
                {submissionsData.map((s, i) => {
                  const peerData = peerReviewData.find(p => p.student === s.name);
                  return (
                    <React.Fragment key={i}>
                      <tr className={`border-t ${theme.border}`}>
                        <td className={`px-3 py-2 text-xs font-bold ${theme.highlight}`}>{s.name}</td>
                        <td className={`px-3 py-2 text-xs text-center ${theme.iconColor}`}>{s.submitted}</td>
                        <td className="px-3 py-2 text-center">
                          {s.hasFile ? (
                            <button className={`p-1 rounded-lg ${theme.secondaryBg}`}>
                              <Paperclip size={12} className="text-blue-500" />
                            </button>
                          ) : (
                            <span className={`text-[10px] ${theme.iconColor}`}>—</span>
                          )}
                        </td>
                        <td className="px-3 py-2 text-center">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${submissionStatusColor(s.status)}`}>{s.status}</span>
                        </td>
                        <td className="px-3 py-2 text-center">
                          {s.status !== 'Not Submitted' ? (
                            <input
                              type="number"
                              defaultValue={s.marks}
                              min={0}
                              max={20}
                              className={`w-14 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center outline-none focus:ring-2 focus:ring-blue-300`}
                            />
                          ) : (
                            <span className={`text-[10px] ${theme.iconColor}`}>—</span>
                          )}
                        </td>
                        <td className="px-3 py-2">
                          {s.status !== 'Not Submitted' ? (
                            <input
                              type="text"
                              defaultValue={s.remarks}
                              placeholder="Add remarks..."
                              className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs outline-none`}
                            />
                          ) : (
                            <span className={`text-[10px] ${theme.iconColor}`}>—</span>
                          )}
                        </td>
                        <td className="px-3 py-2 text-center">
                          <span className={`text-xs font-bold ${
                            s.grade === 'A+' || s.grade === 'A' ? 'text-emerald-600' :
                            s.grade === 'B+' || s.grade === 'B' ? 'text-blue-600' :
                            s.grade === 'C' ? 'text-amber-600' :
                            theme.iconColor
                          }`}>{s.grade}</span>
                        </td>
                        <td className="px-3 py-2 text-center">
                          {peerData ? (
                            <button
                              onClick={() => setExpandedPeer(expandedPeer === s.name ? null : s.name)}
                              className={`text-[10px] px-2 py-0.5 rounded-full font-bold bg-indigo-100 text-indigo-700 flex items-center gap-0.5 mx-auto`}
                            >
                              <Users size={10} /> {peerData.reviews}
                            </button>
                          ) : (
                            <span className={`text-[10px] ${theme.iconColor}`}>—</span>
                          )}
                        </td>
                      </tr>
                      {expandedPeer === s.name && peerData && (
                        <tr className={`border-t ${theme.border}`}>
                          <td colSpan={8} className="px-4 py-2">
                            <div className={`${theme.secondaryBg} rounded-lg p-2 space-y-1`}>
                              {peerData.feedback.map((fb, fi) => (
                                <p key={fi} className={`text-[10px] ${theme.iconColor}`}>&bull; {fb}</p>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
            <div className={`p-3 flex items-center justify-between border-t ${theme.border} ${theme.secondaryBg}`}>
              <span className={`text-xs ${theme.iconColor}`}>8 / 10 submitted</span>
              <button className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-sm font-bold`}>Grade All</button>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: REPORTS ── */}
      {tab === 'Reports' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Homework Reports</h3>
            <span title="Track homework completion and identify struggling students"><Info size={14} className={theme.iconColor} /></span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Completion Rate */}
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
              <h4 className={`text-xs font-bold ${theme.highlight} mb-3`}>Completion Rate</h4>
              <div className="space-y-2">
                {[
                  { cls: 'Class 5A', pct: 92 },
                  { cls: 'Class 5B', pct: 78 },
                  { cls: 'Class 5C', pct: 85 },
                ].map(c => (
                  <div key={c.cls} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] ${theme.iconColor}`}>{c.cls}</span>
                      <span className={`text-[10px] font-bold ${c.pct >= 85 ? 'text-emerald-600' : c.pct >= 70 ? 'text-amber-600' : 'text-red-600'}`}>{c.pct}%</span>
                    </div>
                    <div className={`w-full h-3 rounded-full ${theme.secondaryBg} overflow-hidden`}>
                      <div
                        className={`h-full rounded-full ${c.pct >= 85 ? 'bg-emerald-500' : c.pct >= 70 ? 'bg-amber-500' : 'bg-red-500'}`}
                        style={{ width: `${c.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submission Patterns */}
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
              <h4 className={`text-xs font-bold ${theme.highlight} mb-3`}>Submission Patterns</h4>
              <div className="flex items-center justify-center py-4">
                <div className="relative w-28 h-28">
                  {/* Mock pie chart using CSS */}
                  <div className="w-28 h-28 rounded-full" style={{ background: 'conic-gradient(#10b981 0% 68%, #f59e0b 68% 90%, #ef4444 90% 100%)' }} />
                  <div className={`absolute inset-3 rounded-full ${theme.cardBg} flex items-center justify-center`}>
                    <span className={`text-[10px] font-bold ${theme.highlight}`}>100%</span>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className={`text-[10px] ${theme.iconColor}`}>On-time: 68%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className={`text-[10px] ${theme.iconColor}`}>Late: 22%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span className={`text-[10px] ${theme.iconColor}`}>Never submitted: 10%</span>
                </div>
              </div>
            </div>

            {/* My Assignment Frequency */}
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
              <h4 className={`text-xs font-bold ${theme.highlight} mb-3`}>My Assignment Frequency</h4>
              <div className="flex items-end gap-4 h-24 px-2">
                {[
                  { label: 'This Month', count: 12, color: 'bg-blue-500' },
                  { label: 'Last Month', count: 8, color: 'bg-blue-400' },
                  { label: 'Average', count: 10, color: 'bg-blue-300' },
                ].map(b => (
                  <div key={b.label} className="flex-1 flex flex-col items-center gap-1">
                    <span className={`text-[10px] font-bold ${theme.highlight}`}>{b.count}</span>
                    <div className={`w-full ${b.color} rounded-t-lg`} style={{ height: `${b.count * 7}px` }} />
                    <span className={`text-[9px] ${theme.iconColor} text-center leading-tight`}>{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Export Button */}
          <div className="flex justify-end">
            <button className={`px-4 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-sm font-bold ${theme.iconColor} flex items-center gap-1`}>
              <Download size={14} /> Export Report
            </button>
          </div>
        </div>
      )}

      {/* ── AUTO-FEED TO GRADEBOOK BANNER ── */}
      <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200">
        <BarChart3 size={14} className="text-emerald-500" />
        <Link size={12} className="text-emerald-400" />
        <p className="text-xs text-emerald-700 font-medium">
          Homework grades auto-feed to Internal Assessment in Gradebook. Connected: Gradebook &rarr; Enter Marks &rarr; Internal Assessment column
        </p>
      </div>
    </div>
  );
}
