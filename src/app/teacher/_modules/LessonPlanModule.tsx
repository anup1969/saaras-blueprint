'use client';

import React, { useState } from 'react';
import { StatCard, TabBar, DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  BookOpen, FileText, CheckCircle, Clock, Upload, Sparkles,
  ChevronRight, Eye, Edit3, X, Send, Plus, AlertTriangle
} from 'lucide-react';

// ─── MOCK DATA ──────────────────────────────────────

const syllabusData = [
  { unit: 'Ch 1: Real Numbers', term: 'Term 1', month: 'July', topics: 'Euclid\'s Division Lemma, HCF, Fundamental Theorem', status: 'Completed' },
  { unit: 'Ch 2: Polynomials', term: 'Term 1', month: 'August', topics: 'Zeroes, Division Algorithm, Cubic Polynomials', status: 'Completed' },
  { unit: 'Ch 3: Linear Equations', term: 'Term 1', month: 'September', topics: 'Pair of Linear Eq., Graphical & Algebraic Methods', status: 'Completed' },
  { unit: 'Ch 4: Quadratic Equations', term: 'Term 1', month: 'October', topics: 'Factorization, Completing Square, Discriminant', status: 'Completed' },
  { unit: 'Ch 5: Arithmetic Progressions', term: 'Term 2', month: 'November', topics: 'nth term, Sum of n terms, Applications', status: 'Completed' },
  { unit: 'Ch 6: Triangles', term: 'Term 2', month: 'December', topics: 'Similarity, BPT, Pythagoras Theorem', status: 'In Progress' },
  { unit: 'Ch 7: Coordinate Geometry', term: 'Term 2', month: 'January', topics: 'Distance, Section Formula, Area of Triangle', status: 'In Progress' },
  { unit: 'Ch 8: Trigonometry', term: 'Term 2', month: 'February', topics: 'Ratios, Identities, Heights & Distances', status: 'Not Started' },
  { unit: 'Ch 9: Circles', term: 'Term 3', month: 'March', topics: 'Tangent Properties, Number of Tangents', status: 'Not Started' },
  { unit: 'Ch 10: Statistics', term: 'Term 3', month: 'March', topics: 'Mean, Median, Mode of Grouped Data', status: 'Not Started' },
];

const lessonPlans = [
  { id: 1, date: '2026-02-24', cls: '10-A', subject: 'Mathematics', topic: 'Trigonometric Ratios — Introduction', resources: 'PPT, GeoGebra', status: 'Approved' },
  { id: 2, date: '2026-02-25', cls: '10-B', subject: 'Mathematics', topic: 'Trigonometric Identities', resources: 'PDF Worksheet', status: 'Submitted' },
  { id: 3, date: '2026-02-26', cls: '9-A', subject: 'Science', topic: 'Force and Laws of Motion', resources: 'Video, PPT', status: 'Draft' },
  { id: 4, date: '2026-02-27', cls: '10-A', subject: 'Mathematics', topic: 'Heights and Distances', resources: 'Link, PDF', status: 'Rejected' },
  { id: 5, date: '2026-02-28', cls: '8-A', subject: 'Mathematics', topic: 'Algebraic Expressions', resources: 'PPT', status: 'Revision Needed' },
  { id: 6, date: '2026-03-01', cls: '10-B', subject: 'Mathematics', topic: 'Applications of Trigonometry', resources: 'Video', status: 'Approved' },
];

const hodPendingReviews = [
  { teacher: 'Mr. Vikram Desai', subject: 'Physics', cls: '10-A', topic: 'Electromagnetic Induction', submitted: '2026-02-25' },
  { teacher: 'Ms. Anita Joshi', subject: 'Chemistry', cls: '9-B', topic: 'Chemical Reactions & Equations', submitted: '2026-02-26' },
  { teacher: 'Mr. Rahul Saxena', subject: 'Mathematics', cls: '8-B', topic: 'Mensuration — Surface Area', submitted: '2026-02-27' },
];

const aiSuggestions = [
  { name: 'Interactive Discovery — Trigonometric Ratios', duration: '45 min', method: 'Inquiry-based learning with GeoGebra visualization' },
  { name: 'Flipped Classroom — Heights & Distances', duration: '40 min', method: 'Pre-recorded video + in-class problem-solving' },
  { name: 'Collaborative Workshop — Trig Identities', duration: '50 min', method: 'Group proofs with peer teaching and worksheet' },
];

// ─── COMPONENT ──────────────────────────────────────

export default function LessonPlanModule({ theme }: { theme: Theme }) {
  const [section, setSection] = useState('Syllabus Pacing');
  const [planTab, setPlanTab] = useState('This Week');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [hodFeedback, setHodFeedback] = useState<Record<number, string>>({});

  const completedCount = syllabusData.filter(s => s.status === 'Completed').length;
  const progressPct = Math.round((completedCount / syllabusData.length) * 100);
  // Expected pacing: Feb = month 8 of 10 = 80%
  const expectedPct = 80;

  const statusColor = (s: string) => {
    const map: Record<string, string> = {
      Completed: 'bg-emerald-100 text-emerald-700',
      'In Progress': 'bg-amber-100 text-amber-700',
      'Not Started': 'bg-slate-100 text-slate-600',
      Approved: 'bg-emerald-100 text-emerald-700',
      Submitted: 'bg-blue-100 text-blue-700',
      Draft: 'bg-slate-100 text-slate-600',
      Rejected: 'bg-red-100 text-red-700',
      'Revision Needed': 'bg-amber-100 text-amber-700',
    };
    return map[s] || 'bg-slate-100 text-slate-600';
  };

  const filteredPlans = planTab === 'This Week' ? lessonPlans.filter(p => p.date >= '2026-02-24' && p.date <= '2026-03-01')
    : planTab === 'Pending Approval' ? lessonPlans.filter(p => p.status === 'Submitted')
    : planTab === 'Approved' ? lessonPlans.filter(p => p.status === 'Approved')
    : lessonPlans;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Lesson Plans</h1>
        <button onClick={() => setShowCreateForm(true)} className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}>
          <Plus size={14} /> Create Lesson Plan
        </button>
      </div>

      <TabBar tabs={['Syllabus Pacing', 'My Lesson Plans', 'HOD Review', 'AI Suggestions']} active={section} onChange={setSection} theme={theme} />

      {/* ── A) SYLLABUS PACING GUIDE ── */}
      {section === 'Syllabus Pacing' && (
        <div className="space-y-4">
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className={`text-sm font-bold ${theme.highlight}`}>Class 10-A — Mathematics</h3>
                <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>Academic Year 2025-26 | CBSE Board</p>
              </div>
              <div className="text-right">
                <p className={`text-lg font-bold ${progressPct >= expectedPct ? 'text-emerald-600' : 'text-amber-600'}`}>{progressPct}%</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Expected: {expectedPct}%</p>
              </div>
            </div>
            <div className="flex gap-2 items-center mb-1">
              <div className={`flex-1 h-3 rounded-full ${theme.secondaryBg} overflow-hidden`}>
                <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${progressPct}%` }} />
              </div>
              <div className={`h-3 w-px bg-red-400 relative`} style={{ position: 'absolute', left: `${expectedPct}%` }} />
            </div>
            <div className="flex gap-4 mt-1">
              <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1"><CheckCircle size={10} /> {completedCount} completed</span>
              <span className="text-[10px] text-amber-600 font-bold flex items-center gap-1"><Clock size={10} /> {syllabusData.filter(s => s.status === 'In Progress').length} in progress</span>
              <span className={`text-[10px] ${theme.iconColor} font-bold`}>{syllabusData.filter(s => s.status === 'Not Started').length} not started</span>
              {progressPct < expectedPct && <span className="text-[10px] text-red-600 font-bold flex items-center gap-1"><AlertTriangle size={10} /> Behind by {expectedPct - progressPct}%</span>}
            </div>
          </div>

          <DataTable
            headers={['Unit / Chapter', 'Term', 'Month', 'Topics', 'Status']}
            rows={syllabusData.map(s => [
              <span key="u" className={`font-bold ${theme.highlight}`}>{s.unit}</span>,
              <span key="t" className={theme.iconColor}>{s.term}</span>,
              <span key="m" className={theme.iconColor}>{s.month}</span>,
              <span key="tp" className={`${theme.iconColor} text-[11px]`}>{s.topics}</span>,
              <span key="s" className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${statusColor(s.status)}`}>{s.status}</span>,
            ])}
            theme={theme}
          />
        </div>
      )}

      {/* ── B) MY LESSON PLANS ── */}
      {section === 'My Lesson Plans' && (
        <div className="space-y-4">
          <TabBar tabs={['This Week', 'Pending Approval', 'Approved', 'All']} active={planTab} onChange={setPlanTab} theme={theme} />

          <DataTable
            headers={['Date', 'Class', 'Subject', 'Topic', 'Resources', 'Status', 'Actions']}
            rows={filteredPlans.map(p => [
              <span key="d" className={theme.iconColor}>{p.date}</span>,
              <span key="c" className={`font-bold ${theme.highlight}`}>{p.cls}</span>,
              <span key="s" className={theme.iconColor}>{p.subject}</span>,
              <span key="t" className={`font-bold ${theme.highlight}`}>{p.topic}</span>,
              <span key="r" className={`text-[10px] ${theme.iconColor}`}>{p.resources}</span>,
              <span key="st" className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${statusColor(p.status)}`}>{p.status}</span>,
              <div key="a" className="flex gap-1">
                <button className={`p-1.5 rounded-lg ${theme.secondaryBg} ${theme.buttonHover}`} title="View"><Eye size={12} className={theme.iconColor} /></button>
                <button className={`p-1.5 rounded-lg ${theme.secondaryBg} ${theme.buttonHover}`} title="Edit"><Edit3 size={12} className={theme.iconColor} /></button>
              </div>,
            ])}
            theme={theme}
          />

          {/* Create Lesson Plan Form */}
          {showCreateForm && (
            <div className={`${theme.cardBg} rounded-2xl border-2 ${theme.border} p-5 space-y-4 ring-1 ring-blue-200`}>
              <div className="flex items-center justify-between">
                <h3 className={`text-sm font-bold ${theme.highlight}`}>Create New Lesson Plan</h3>
                <button onClick={() => setShowCreateForm(false)} className={`p-1.5 rounded-lg ${theme.secondaryBg} ${theme.buttonHover}`}><X size={14} className={theme.iconColor} /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Class + Subject</label>
                  <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                    <option>10-A — Mathematics</option>
                    <option>10-B — Mathematics</option>
                    <option>9-A — Science</option>
                    <option>9-B — Science</option>
                    <option>8-A — Mathematics</option>
                  </select>
                </div>
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Date</label>
                  <input type="date" defaultValue="2026-03-02" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`} />
                </div>
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Duration</label>
                  <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                    <option>40 minutes</option>
                    <option>45 minutes</option>
                    <option>50 minutes</option>
                    <option>80 minutes (Double)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Topic</label>
                <input type="text" placeholder="e.g., Introduction to Trigonometric Identities" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`} />
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Learning Objectives</label>
                <textarea rows={2} placeholder="Students will be able to..." className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} resize-none`} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Teaching Method</label>
                  <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                    <option>Lecture + Discussion</option>
                    <option>Inquiry-Based Learning</option>
                    <option>Flipped Classroom</option>
                    <option>Collaborative / Group Work</option>
                    <option>Demonstration</option>
                    <option>Project-Based</option>
                  </select>
                </div>
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Assessment Plan</label>
                  <input type="text" placeholder="e.g., Exit quiz, worksheet, oral questions" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`} />
                </div>
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Activities</label>
                <textarea rows={2} placeholder="Describe classroom activities..." className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} resize-none`} />
              </div>
              {/* Attach Resources */}
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Attach Resources</label>
                <div className={`flex gap-2 flex-wrap p-3 rounded-xl border-2 border-dashed ${theme.border} ${theme.secondaryBg}`}>
                  {[
                    { label: 'PPT', color: 'bg-orange-100 text-orange-700' },
                    { label: 'PDF', color: 'bg-red-100 text-red-700' },
                    { label: 'Video', color: 'bg-purple-100 text-purple-700' },
                    { label: 'Link', color: 'bg-blue-100 text-blue-700' },
                  ].map(f => (
                    <button key={f.label} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-bold ${f.color} ${theme.buttonHover}`}>
                      <Upload size={10} /> {f.label}
                    </button>
                  ))}
                  <span className={`text-[10px] ${theme.iconColor} self-center ml-2`}>Drag & drop or click to attach</span>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2">
                <button onClick={() => setShowCreateForm(false)} className={`px-4 py-2 rounded-xl text-sm font-bold ${theme.secondaryBg} ${theme.iconColor} ${theme.buttonHover}`}>Cancel</button>
                <button className={`px-4 py-2 rounded-xl text-sm font-bold ${theme.secondaryBg} ${theme.highlight} ${theme.buttonHover}`}>Save as Draft</button>
                <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Send size={14} /> Submit for Approval</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── C) HOD APPROVAL PANEL ── */}
      {section === 'HOD Review' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={14} className="text-amber-500" />
            <p className={`text-xs ${theme.iconColor}`}>As HOD, you can approve or request changes for submitted lesson plans.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <StatCard icon={FileText} label="Pending Review" value={hodPendingReviews.length} color="bg-amber-500" theme={theme} />
            <StatCard icon={CheckCircle} label="Approved This Week" value="8" color="bg-emerald-500" theme={theme} />
            <StatCard icon={AlertTriangle} label="Changes Requested" value="2" color="bg-red-500" theme={theme} />
          </div>
          {hodPendingReviews.map((review, i) => (
            <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-3`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className={`text-sm font-bold ${theme.highlight}`}>{review.topic}</p>
                  <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>{review.teacher} | {review.subject} | Class {review.cls}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Submitted: {review.submitted}</p>
                </div>
                <button className={`p-1.5 rounded-lg ${theme.secondaryBg} ${theme.buttonHover}`} title="View Full Plan"><Eye size={14} className={theme.iconColor} /></button>
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>HOD Feedback</label>
                <textarea
                  rows={2}
                  placeholder="Add feedback or suggestions for revision..."
                  value={hodFeedback[i] || ''}
                  onChange={e => setHodFeedback(prev => ({ ...prev, [i]: e.target.value }))}
                  className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} resize-none`}
                />
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-white flex items-center gap-1"><CheckCircle size={12} /> Approve</button>
                <button className="px-3 py-2 rounded-xl text-xs font-bold bg-amber-500 text-white flex items-center gap-1"><Edit3 size={12} /> Request Changes</button>
                <button className="px-3 py-2 rounded-xl text-xs font-bold bg-red-500 text-white flex items-center gap-1"><X size={12} /> Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── D) AI LESSON PLAN SUGGESTIONS ── */}
      {section === 'AI Suggestions' && (
        <div className="space-y-4">
          <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-50 border border-purple-200`}>
            <Sparkles size={14} className="text-purple-500" />
            <p className="text-xs text-purple-700 font-medium">AI-generated suggestions based on your current chapter: <strong>Ch 8 — Trigonometry</strong> (Class 10-A)</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {aiSuggestions.map((s, i) => (
              <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-3`}>
                <div className="flex items-start justify-between">
                  <div className={`w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center text-white shrink-0`}>
                    <Sparkles size={14} />
                  </div>
                  <span className="text-[9px] px-2 py-0.5 rounded-full font-bold bg-purple-100 text-purple-700">Powered by AI</span>
                </div>
                <div>
                  <p className={`text-sm font-bold ${theme.highlight}`}>{s.name}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${theme.secondaryBg} ${theme.iconColor}`}><Clock size={9} className="inline mr-0.5" />{s.duration}</span>
                  </div>
                  <p className={`text-[11px] ${theme.iconColor} mt-2 leading-relaxed`}>{s.method}</p>
                </div>
                <button className={`w-full px-3 py-2 rounded-xl text-xs font-bold ${theme.primary} text-white flex items-center justify-center gap-1`}>
                  <BookOpen size={12} /> Use Template <ChevronRight size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
