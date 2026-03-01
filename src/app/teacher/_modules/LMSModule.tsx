'use client';

import React, { useState } from 'react';
import { TabBar, DataTable, MobileFrame, MobilePreviewToggle } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  Upload, FileText, Video, Presentation, HelpCircle, Eye,
  Search, Plus, Clock, CheckCircle, BookOpen, BarChart3,
  Send, GripVertical, Trash2, Radio, Type, ToggleLeft,
  MonitorPlay, Play, FileDown, Info, Database, Calendar,
  Zap, ArrowRight, ChevronDown, ChevronUp, Link
} from 'lucide-react';

// ─── MOCK DATA ──────────────────────────────────────

const myContentData = [
  { title: 'Introduction to Trigonometry', type: 'Video' as const, subject: 'Mathematics', cls: '10-A', uploaded: '2026-02-20', views: 142, status: 'Published' },
  { title: 'Quadratic Equations — Worksheet', type: 'PDF' as const, subject: 'Mathematics', cls: '10-B', uploaded: '2026-02-18', views: 98, status: 'Published' },
  { title: 'Laws of Motion — Summary', type: 'Presentation' as const, subject: 'Science', cls: '9-A', uploaded: '2026-02-15', views: 67, status: 'Published' },
  { title: 'Algebra Basics — Quick Quiz', type: 'Quiz' as const, subject: 'Mathematics', cls: '8-A', uploaded: '2026-02-12', views: 203, status: 'Published' },
  { title: 'Coordinate Geometry — Video Lesson', type: 'Video' as const, subject: 'Mathematics', cls: '10-A', uploaded: '2026-02-10', views: 89, status: 'Draft' },
  { title: 'Statistics — Practice Problems', type: 'PDF' as const, subject: 'Mathematics', cls: '10-B', uploaded: '2026-02-08', views: 54, status: 'Published' },
];

const studentProgressData = [
  { name: 'Aarav Mehta', videoPct: 92, quizzes: 5, avgScore: 88, lastActive: '2026-02-27' },
  { name: 'Ananya Iyer', videoPct: 85, quizzes: 4, avgScore: 91, lastActive: '2026-02-27' },
  { name: 'Diya Kulkarni', videoPct: 45, quizzes: 2, avgScore: 62, lastActive: '2026-02-22' },
  { name: 'Harsh Patel', videoPct: 78, quizzes: 4, avgScore: 75, lastActive: '2026-02-26' },
  { name: 'Karan Singh', videoPct: 95, quizzes: 5, avgScore: 94, lastActive: '2026-02-28' },
  { name: 'Meera Joshi', videoPct: 60, quizzes: 3, avgScore: 70, lastActive: '2026-02-25' },
  { name: 'Nikhil Verma', videoPct: 32, quizzes: 1, avgScore: 48, lastActive: '2026-02-18' },
  { name: 'Pooja Sharma', videoPct: 88, quizzes: 5, avgScore: 82, lastActive: '2026-02-28' },
];

const libraryContent = [
  { title: 'CBSE Class 10 — Trigonometry Full Course', type: 'Video', subject: 'Mathematics', views: 1245, category: 'Board Curriculum', thumbnail: 'bg-blue-500' },
  { title: 'Practice: Quadratic Equations (50 Qs)', type: 'Quiz', subject: 'Mathematics', views: 876, category: 'Practice', thumbnail: 'bg-purple-500' },
  { title: 'Chemical Reactions — Illustrated Guide', type: 'PDF', subject: 'Science', views: 654, category: 'Reference', thumbnail: 'bg-emerald-500' },
  { title: 'English Grammar — Tenses Masterclass', type: 'Video', subject: 'English', views: 432, category: 'Board Curriculum', thumbnail: 'bg-amber-500' },
  { title: 'History — Freedom Movement Timeline', type: 'Presentation', subject: 'Social Science', views: 321, category: 'Reference', thumbnail: 'bg-red-500' },
  { title: 'Physics Numericals — Practice Set', type: 'PDF', subject: 'Science', views: 567, category: 'Practice', thumbnail: 'bg-indigo-500' },
];

const mockQuizQuestions = [
  {
    id: 1,
    type: 'MCQ' as const,
    question: 'What is the value of sin 30 degrees?',
    options: ['1/2', '1/3', '1/4', '1'],
    correct: 0,
  },
  {
    id: 2,
    type: 'True/False' as const,
    question: 'The sum of angles in a triangle is 180 degrees.',
    options: ['True', 'False'],
    correct: 0,
  },
  {
    id: 3,
    type: 'Short Answer' as const,
    question: 'Define the Pythagorean theorem in one sentence.',
    options: [],
    correct: -1,
  },
];

// ─── QUESTION BANK MOCK DATA ────────────────────────

const questionBankData = [
  { id: 'QB001', question: 'What is the value of sin 30 degrees?', subject: 'Mathematics', chapter: 'Trigonometry', type: 'MCQ' as const, difficulty: 'Easy' as const, blooms: 'Remember' as const, tags: 'Basic, Trig' },
  { id: 'QB002', question: 'Prove that the sum of angles of a triangle is 180 degrees.', subject: 'Mathematics', chapter: 'Geometry', type: 'Long' as const, difficulty: 'Hard' as const, blooms: 'Apply' as const, tags: 'Proof, Theorem' },
  { id: 'QB003', question: 'The square root of 144 is 12. True or False?', subject: 'Mathematics', chapter: 'Numbers', type: 'True-False' as const, difficulty: 'Easy' as const, blooms: 'Remember' as const, tags: 'Basic' },
  { id: 'QB004', question: 'Define photosynthesis in one sentence.', subject: 'Science', chapter: 'Biology', type: 'Short' as const, difficulty: 'Easy' as const, blooms: 'Understand' as const, tags: 'Definition' },
  { id: 'QB005', question: 'Solve: 2x + 3 = 11. Find x.', subject: 'Mathematics', chapter: 'Algebra', type: 'Short' as const, difficulty: 'Medium' as const, blooms: 'Apply' as const, tags: 'Equations' },
  { id: 'QB006', question: 'Which planet is known as the Red Planet?', subject: 'Science', chapter: 'Solar System', type: 'MCQ' as const, difficulty: 'Easy' as const, blooms: 'Remember' as const, tags: 'Space' },
  { id: 'QB007', question: 'Analyze the effect of temperature on enzyme activity with a graph.', subject: 'Science', chapter: 'Biology', type: 'Long' as const, difficulty: 'Hard' as const, blooms: 'Analyze' as const, tags: 'Graph, Analysis' },
  { id: 'QB008', question: 'What is the LCM of 12 and 18?', subject: 'Mathematics', chapter: 'Numbers', type: 'MCQ' as const, difficulty: 'Medium' as const, blooms: 'Apply' as const, tags: 'LCM, HCF' },
];

// ─── ONLINE EXAMS MOCK DATA ─────────────────────────

const onlineExamsData = [
  { id: 'EX001', title: 'Mid-Term Mathematics Quiz', subject: 'Mathematics', cls: '10-A', date: '2026-03-05', duration: '45 min', questions: 25, status: 'Draft' as const },
  { id: 'EX002', title: 'Science Chapter Test — Light', subject: 'Science', cls: '9-A', date: '2026-03-03', duration: '30 min', questions: 20, status: 'Published' as const },
  { id: 'EX003', title: 'Algebra Practice Test', subject: 'Mathematics', cls: '10-B', date: '2026-02-28', duration: '60 min', questions: 30, status: 'Completed' as const },
  { id: 'EX004', title: 'Biology Unit Assessment', subject: 'Science', cls: '9-B', date: '2026-02-25', duration: '40 min', questions: 22, status: 'Graded' as const },
];

// ─── COMPONENT ──────────────────────────────────────

export default function LMSModule({ theme }: { theme: Theme }) {
  const [section, setSection] = useState('My Content');
  const [showUpload, setShowUpload] = useState(false);
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [librarySearch, setLibrarySearch] = useState('');
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [showCreateExam, setShowCreateExam] = useState(false);
  const [showSchedule, setShowSchedule] = useState<string | null>(null);
  const [showResults, setShowResults] = useState<string | null>(null);
  const [qbDiffFilter, setQbDiffFilter] = useState('All');
  const [qbTypeFilter, setQbTypeFilter] = useState('All');
  const [qbSubjectFilter, setQbSubjectFilter] = useState('All');
  const [qbSearch, setQbSearch] = useState('');

  const typeIcon = (type: string) => {
    switch (type) {
      case 'Video': return <Video size={12} className="text-purple-500" />;
      case 'PDF': return <FileDown size={12} className="text-red-500" />;
      case 'Presentation': return <Presentation size={12} className="text-orange-500" />;
      case 'Quiz': return <HelpCircle size={12} className="text-blue-500" />;
      default: return <FileText size={12} className={theme.iconColor} />;
    }
  };

  const typeBadgeColor = (type: string) => {
    const map: Record<string, string> = {
      Video: 'bg-purple-100 text-purple-700',
      PDF: 'bg-red-100 text-red-700',
      Presentation: 'bg-orange-100 text-orange-700',
      Quiz: 'bg-blue-100 text-blue-700',
    };
    return map[type] || 'bg-slate-100 text-slate-600';
  };

  const statusColor = (s: string) => {
    const map: Record<string, string> = {
      Published: 'bg-emerald-100 text-emerald-700',
      Draft: 'bg-slate-100 text-slate-600',
      Completed: 'bg-blue-100 text-blue-700',
      Graded: 'bg-purple-100 text-purple-700',
    };
    return map[s] || 'bg-slate-100 text-slate-600';
  };

  const progressColor = (pct: number) => {
    if (pct > 80) return 'bg-emerald-500';
    if (pct >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const progressTextColor = (pct: number) => {
    if (pct > 80) return 'text-emerald-600';
    if (pct >= 50) return 'text-amber-600';
    return 'text-red-600';
  };

  const categoryColor = (c: string) => {
    const map: Record<string, string> = {
      'Board Curriculum': 'bg-blue-100 text-blue-700',
      Reference: 'bg-purple-100 text-purple-700',
      Practice: 'bg-emerald-100 text-emerald-700',
    };
    return map[c] || 'bg-slate-100 text-slate-600';
  };

  const difficultyBadge = (d: string) => {
    const map: Record<string, string> = {
      Easy: 'bg-emerald-100 text-emerald-700',
      Medium: 'bg-amber-100 text-amber-700',
      Hard: 'bg-red-100 text-red-700',
    };
    return map[d] || 'bg-slate-100 text-slate-600';
  };

  const bloomsBadge = (b: string) => {
    const map: Record<string, string> = {
      Remember: 'bg-sky-100 text-sky-700',
      Understand: 'bg-blue-100 text-blue-700',
      Apply: 'bg-indigo-100 text-indigo-700',
      Analyze: 'bg-purple-100 text-purple-700',
    };
    return map[b] || 'bg-slate-100 text-slate-600';
  };

  const questionTypeBadge = (t: string) => {
    const map: Record<string, string> = {
      MCQ: 'bg-blue-100 text-blue-700',
      'True-False': 'bg-amber-100 text-amber-700',
      Short: 'bg-emerald-100 text-emerald-700',
      Long: 'bg-purple-100 text-purple-700',
    };
    return map[t] || 'bg-slate-100 text-slate-600';
  };

  const filteredLibrary = libraryContent.filter(c => {
    const matchSearch = librarySearch === '' || c.title.toLowerCase().includes(librarySearch.toLowerCase());
    const matchSubject = subjectFilter === 'All' || c.subject === subjectFilter;
    return matchSearch && matchSubject;
  });

  const filteredQuestions = questionBankData.filter(q => {
    const matchSearch = qbSearch === '' || q.question.toLowerCase().includes(qbSearch.toLowerCase());
    const matchDiff = qbDiffFilter === 'All' || q.difficulty === qbDiffFilter;
    const matchType = qbTypeFilter === 'All' || q.type === qbTypeFilter;
    const matchSubject = qbSubjectFilter === 'All' || q.subject === qbSubjectFilter;
    return matchSearch && matchDiff && matchType && matchSubject;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>LMS / E-Learning</h1>
        <button onClick={() => { setSection('My Content'); setShowUpload(true); }} className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}>
          <Upload size={14} /> Upload New
        </button>
      </div>

      <TabBar tabs={['My Content', 'Quiz Builder', 'Student Progress', 'Content Library', 'Question Bank', 'Online Exams']} active={section} onChange={setSection} theme={theme} />

      {/* ── TAB 1: MY CONTENT ── */}
      {section === 'My Content' && (
        <div className="space-y-4">
          {/* Upload Area */}
          {showUpload && (
            <div className={`${theme.cardBg} rounded-2xl border-2 border-dashed ${theme.border} p-6 space-y-3`}>
              <div className="flex items-center justify-between">
                <h3 className={`text-sm font-bold ${theme.highlight}`}>Upload New Content</h3>
                <button onClick={() => setShowUpload(false)} className={`text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-2 py-1 rounded-lg`}>Cancel</button>
              </div>
              <div className={`flex flex-col items-center justify-center py-8 rounded-xl ${theme.secondaryBg} border ${theme.border}`}>
                <Upload size={28} className={theme.iconColor} />
                <p className={`text-xs font-bold ${theme.highlight} mt-2`}>Drag & drop files here or click to browse</p>
                <p className={`text-[10px] ${theme.iconColor} mt-1`}>Supports: MP4, PDF, PPT, PPTX, DOC, DOCX (Max 100MB)</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Title</label>
                  <input type="text" placeholder="Enter content title..." className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`} />
                </div>
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Subject</label>
                  <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                    <option>Mathematics</option>
                    <option>Science</option>
                    <option>English</option>
                  </select>
                </div>
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Class</label>
                  <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                    <option>10-A</option>
                    <option>10-B</option>
                    <option>9-A</option>
                    <option>9-B</option>
                    <option>8-A</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end">
                <button className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold flex items-center gap-1`}><Upload size={12} /> Upload & Publish</button>
              </div>
            </div>
          )}

          <DataTable
            headers={['', 'Title', 'Type', 'Subject', 'Class', 'Uploaded', 'Views', 'Status']}
            rows={myContentData.map(c => [
              <span key="icon">{typeIcon(c.type)}</span>,
              <span key="t" className={`font-bold ${theme.highlight}`}>{c.title}</span>,
              <span key="ty" className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${typeBadgeColor(c.type)}`}>{c.type}</span>,
              <span key="s" className={theme.iconColor}>{c.subject}</span>,
              <span key="c" className={theme.iconColor}>{c.cls}</span>,
              <span key="u" className={theme.iconColor}>{c.uploaded}</span>,
              <span key="v" className={`font-bold ${theme.highlight}`}>{c.views}</span>,
              <span key="st" className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${statusColor(c.status)}`}>{c.status}</span>,
            ])}
            theme={theme}
          />
        </div>
      )}

      {/* ── TAB 2: QUIZ BUILDER ── */}
      {section === 'Quiz Builder' && (
        <div className="space-y-4">
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 space-y-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Create New Quiz</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Quiz Title</label>
                <input type="text" defaultValue="Trigonometry — Chapter 8 Quiz" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`} />
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Subject</label>
                <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                  <option>Mathematics</option>
                  <option>Science</option>
                  <option>English</option>
                </select>
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Class</label>
                <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                  <option>10-A</option>
                  <option>10-B</option>
                  <option>9-A</option>
                </select>
              </div>
            </div>

            {/* Settings Row */}
            <div className={`flex items-center gap-4 p-3 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex items-center gap-2">
                <Clock size={12} className={theme.iconColor} />
                <span className={`text-[10px] font-bold ${theme.iconColor}`}>Time Limit:</span>
                <select className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] font-bold ${theme.highlight}`}>
                  <option>15 minutes</option>
                  <option>30 minutes</option>
                  <option>45 minutes</option>
                  <option>60 minutes</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 size={12} className={theme.iconColor} />
                <span className={`text-[10px] font-bold ${theme.iconColor}`}>Marks/Question:</span>
                <select className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] font-bold ${theme.highlight}`}>
                  <option>1 mark</option>
                  <option>2 marks</option>
                  <option>4 marks</option>
                  <option>5 marks</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <ToggleLeft size={12} className={theme.iconColor} />
                <span className={`text-[10px] font-bold ${theme.iconColor}`}>Negative Marking:</span>
                <button className={`w-9 h-5 rounded-full relative transition-colors bg-gray-300`}>
                  <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 translate-x-0.5" />
                </button>
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-3">
              {mockQuizQuestions.map((q, qi) => (
                <div key={q.id} className={`${theme.cardBg} rounded-xl border ${theme.border} p-4 space-y-2`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GripVertical size={12} className={theme.iconColor} />
                      <span className={`text-[10px] font-bold ${theme.iconColor}`}>Q{qi + 1}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        q.type === 'MCQ' ? 'bg-blue-100 text-blue-700' : q.type === 'True/False' ? 'bg-amber-100 text-amber-700' : 'bg-purple-100 text-purple-700'
                      }`}>{q.type}</span>
                    </div>
                    <button className={`p-1 rounded-lg ${theme.secondaryBg} ${theme.buttonHover}`}><Trash2 size={12} className="text-red-400" /></button>
                  </div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>{q.question}</p>
                  {q.type === 'MCQ' && (
                    <div className="grid grid-cols-2 gap-2">
                      {q.options.map((opt, oi) => (
                        <label key={oi} className={`flex items-center gap-2 p-2 rounded-lg ${oi === q.correct ? 'bg-emerald-50 border border-emerald-200' : `${theme.secondaryBg} border ${theme.border}`}`}>
                          <Radio size={12} className={oi === q.correct ? 'text-emerald-500' : theme.iconColor} />
                          <span className={`text-xs ${oi === q.correct ? 'font-bold text-emerald-700' : theme.iconColor}`}>{opt}</span>
                          {oi === q.correct && <CheckCircle size={10} className="text-emerald-500 ml-auto" />}
                        </label>
                      ))}
                    </div>
                  )}
                  {q.type === 'True/False' && (
                    <div className="flex gap-2">
                      {q.options.map((opt, oi) => (
                        <label key={oi} className={`flex items-center gap-2 px-4 py-2 rounded-lg ${oi === q.correct ? 'bg-emerald-50 border border-emerald-200' : `${theme.secondaryBg} border ${theme.border}`}`}>
                          <Radio size={12} className={oi === q.correct ? 'text-emerald-500' : theme.iconColor} />
                          <span className={`text-xs ${oi === q.correct ? 'font-bold text-emerald-700' : theme.iconColor}`}>{opt}</span>
                        </label>
                      ))}
                    </div>
                  )}
                  {q.type === 'Short Answer' && (
                    <div className={`p-2 rounded-lg ${theme.secondaryBg} border ${theme.border}`}>
                      <p className={`text-[10px] italic ${theme.iconColor}`}>Students will type their answer here...</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Add Question */}
            <div className="flex items-center gap-3">
              <button className={`flex items-center gap-1.5 px-3 py-2 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} text-xs font-bold ${theme.highlight}`}>
                <Plus size={12} /> Add Question
              </button>
              <select className={`px-2 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                <option>MCQ</option>
                <option>True/False</option>
                <option>Short Answer</option>
                <option>Fill in the Blank</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button className={`px-4 py-2 rounded-xl text-sm font-bold ${theme.secondaryBg} ${theme.highlight} ${theme.buttonHover}`}>Save Draft</button>
              <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Send size={14} /> Publish Quiz</button>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 3: STUDENT PROGRESS ── */}
      {section === 'Student Progress' && (
        <div className="space-y-4">
          <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 border border-blue-200`}>
            <MonitorPlay size={14} className="text-blue-500" />
            <p className="text-xs text-blue-700 font-medium">Tracking engagement across all uploaded content for Class 10-A — Mathematics</p>
          </div>

          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden`}>
            <table className="w-full text-sm">
              <thead className={theme.secondaryBg}>
                <tr>
                  <th className={`text-left px-4 py-2.5 text-xs font-bold ${theme.iconColor} uppercase`}>Student Name</th>
                  <th className={`text-center px-4 py-2.5 text-xs font-bold ${theme.iconColor} uppercase`}>Videos Watched</th>
                  <th className={`text-center px-4 py-2.5 text-xs font-bold ${theme.iconColor} uppercase`}>Quizzes Taken</th>
                  <th className={`text-center px-4 py-2.5 text-xs font-bold ${theme.iconColor} uppercase`}>Avg Score</th>
                  <th className={`text-center px-4 py-2.5 text-xs font-bold ${theme.iconColor} uppercase`}>Last Active</th>
                  <th className={`text-center px-4 py-2.5 text-xs font-bold ${theme.iconColor} uppercase`}>Action</th>
                </tr>
              </thead>
              <tbody>
                {studentProgressData.map((s, i) => (
                  <tr key={i} className={`border-t ${theme.border}`}>
                    <td className={`px-4 py-2.5 text-xs font-bold ${theme.highlight}`}>{s.name}</td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2 justify-center">
                        <div className={`w-20 h-2 rounded-full ${theme.secondaryBg} overflow-hidden`}>
                          <div className={`h-full rounded-full ${progressColor(s.videoPct)}`} style={{ width: `${s.videoPct}%` }} />
                        </div>
                        <span className={`text-[10px] font-bold ${progressTextColor(s.videoPct)}`}>{s.videoPct}%</span>
                      </div>
                    </td>
                    <td className={`px-4 py-2.5 text-xs text-center font-bold ${theme.highlight}`}>{s.quizzes}/5</td>
                    <td className={`px-4 py-2.5 text-xs text-center font-bold ${progressTextColor(s.avgScore)}`}>{s.avgScore}%</td>
                    <td className={`px-4 py-2.5 text-xs text-center ${theme.iconColor}`}>{s.lastActive}</td>
                    <td className="px-4 py-2.5 text-center">
                      <button
                        onClick={() => alert(`Reminder sent to ${s.name} (Blueprint demo)`)}
                        className={`text-[10px] px-2.5 py-1 rounded-lg font-bold ${
                          s.videoPct < 50 ? 'bg-red-100 text-red-700' : s.videoPct < 80 ? 'bg-amber-100 text-amber-700' : `${theme.secondaryBg} ${theme.iconColor}`
                        }`}
                      >
                        Send Reminder
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── TAB 4: CONTENT LIBRARY ── */}
      {section === 'Content Library' && (
        <div className="space-y-4">
          <div className="flex gap-3 flex-wrap items-center">
            <div className="flex-1 relative">
              <Search size={14} className={`absolute left-3 top-2.5 ${theme.iconColor}`} />
              <input
                type="text"
                placeholder="Search shared content..."
                value={librarySearch}
                onChange={e => setLibrarySearch(e.target.value)}
                className={`w-full pl-9 pr-4 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}
              />
            </div>
            <div className="flex gap-1">
              {['All', 'Mathematics', 'Science', 'English', 'Social Science'].map(s => (
                <button
                  key={s}
                  onClick={() => setSubjectFilter(s)}
                  className={`text-[10px] px-3 py-1.5 rounded-lg font-bold transition-all ${
                    subjectFilter === s ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.iconColor} ${theme.buttonHover}`
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Category Labels */}
          <div className="flex gap-2">
            {['Board Curriculum', 'Reference', 'Practice'].map(c => (
              <span key={c} className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${categoryColor(c)}`}>{c}</span>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLibrary.map((c, i) => (
              <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden hover:shadow-md transition-all`}>
                <div className={`h-20 ${c.thumbnail} flex items-center justify-center text-white`}>
                  {c.type === 'Video' ? <Play size={24} /> : c.type === 'Quiz' ? <HelpCircle size={24} /> : <FileText size={24} />}
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${typeBadgeColor(c.type)}`}>{c.type}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${categoryColor(c.category)}`}>{c.category}</span>
                  </div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>{c.title}</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] ${theme.iconColor}`}>{c.subject}</span>
                    <span className={`text-[10px] ${theme.iconColor} flex items-center gap-1`}><Eye size={10} /> Views: {c.views}</span>
                  </div>
                  <button
                    onClick={() => alert(`"${c.title}" added to your course (Blueprint demo)`)}
                    className={`w-full px-3 py-2 rounded-xl text-xs font-bold ${theme.primary} text-white flex items-center justify-center gap-1`}
                  >
                    <BookOpen size={12} /> Add to My Course
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 5: QUESTION BANK ── */}
      {section === 'Question Bank' && (
        <div className="space-y-4">
          {/* Stats Bar */}
          <div className={`flex items-center gap-4 px-4 py-3 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex items-center gap-2">
              <Database size={14} className={theme.iconColor} />
              <span className={`text-xs font-bold ${theme.highlight}`}>Total: 234</span>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold bg-blue-100 text-blue-700`}>MCQ: 120</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-700`}>Short: 64</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold bg-purple-100 text-purple-700`}>Long: 50</span>
            <div className="ml-auto flex items-center gap-2">
              <span title="Reusable question bank across exams and quizzes. Questions tagged by Bloom's taxonomy"><Info size={14} className={theme.iconColor} /></span>
            </div>
          </div>

          {/* Search + Filters */}
          <div className="flex gap-3 flex-wrap items-center">
            <div className="flex-1 relative">
              <Search size={14} className={`absolute left-3 top-2.5 ${theme.iconColor}`} />
              <input
                type="text"
                placeholder="Search questions..."
                value={qbSearch}
                onChange={e => setQbSearch(e.target.value)}
                className={`w-full pl-9 pr-4 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}
              />
            </div>
            <select value={qbSubjectFilter} onChange={e => setQbSubjectFilter(e.target.value)} className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight}`}>
              <option value="All">All Subjects</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
            </select>
            <select value={qbDiffFilter} onChange={e => setQbDiffFilter(e.target.value)} className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight}`}>
              <option value="All">All Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <select value={qbTypeFilter} onChange={e => setQbTypeFilter(e.target.value)} className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight}`}>
              <option value="All">All Types</option>
              <option value="MCQ">MCQ</option>
              <option value="True-False">True/False</option>
              <option value="Short">Short</option>
              <option value="Long">Long</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => { setShowAddQuestion(!showAddQuestion); setShowBulkImport(false); }}
              className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold flex items-center gap-1`}
            >
              <Plus size={12} /> Add Question
            </button>
            <button
              onClick={() => { setShowBulkImport(!showBulkImport); setShowAddQuestion(false); }}
              className={`px-4 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}
            >
              <Upload size={12} /> Bulk Import
            </button>
          </div>

          {/* Add Question Form */}
          {showAddQuestion && (
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-3`}>
              <div className="flex items-center justify-between">
                <h3 className={`text-sm font-bold ${theme.highlight}`}>Add New Question</h3>
                <button onClick={() => setShowAddQuestion(false)} className={`text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-2 py-1 rounded-lg`}>Close</button>
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Question Text</label>
                <textarea rows={2} placeholder="Enter your question..." className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none resize-none`} />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Type</label>
                  <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                    <option>MCQ</option>
                    <option>True/False</option>
                    <option>Short Answer</option>
                    <option>Long Answer</option>
                  </select>
                </div>
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Difficulty</label>
                  <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Subject</label>
                  <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                    <option>Mathematics</option>
                    <option>Science</option>
                    <option>English</option>
                  </select>
                </div>
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Chapter</label>
                  <input type="text" placeholder="e.g. Trigonometry" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`} />
                </div>
              </div>
              {/* MCQ Options */}
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>MCQ Options (select correct answer)</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Option A', 'Option B', 'Option C', 'Option D'].map((opt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input type="radio" name="correct" className="accent-emerald-500" defaultChecked={i === 0} />
                      <input type="text" placeholder={opt} className={`flex-1 px-3 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Marks</label>
                  <input type="number" defaultValue={2} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                </div>
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Explanation</label>
                  <input type="text" placeholder="Why is this the correct answer?" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                </div>
              </div>
              <div className="flex justify-end">
                <button className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>Save Question</button>
              </div>
            </div>
          )}

          {/* Bulk Import */}
          {showBulkImport && (
            <div className={`${theme.cardBg} rounded-2xl border-2 border-dashed ${theme.border} p-5 space-y-3`}>
              <div className="flex items-center justify-between">
                <h3 className={`text-sm font-bold ${theme.highlight}`}>Bulk Import Questions</h3>
                <button onClick={() => setShowBulkImport(false)} className={`text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-2 py-1 rounded-lg`}>Close</button>
              </div>
              <div className={`flex flex-col items-center justify-center py-8 rounded-xl ${theme.secondaryBg} border ${theme.border}`}>
                <Upload size={28} className={theme.iconColor} />
                <p className={`text-xs font-bold ${theme.highlight} mt-2`}>Drag & drop CSV file here</p>
                <p className={`text-[10px] ${theme.iconColor} mt-1`}>Format: Question, Type, Difficulty, Subject, Chapter, Options, Correct Answer</p>
              </div>
              <div className="flex justify-end">
                <button className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold flex items-center gap-1`}><Upload size={12} /> Upload CSV</button>
              </div>
            </div>
          )}

          {/* Question Table */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden`}>
            <table className="w-full text-sm">
              <thead className={theme.secondaryBg}>
                <tr>
                  <th className={`text-left px-3 py-2.5 text-[10px] font-bold ${theme.iconColor} uppercase`}>ID</th>
                  <th className={`text-left px-3 py-2.5 text-[10px] font-bold ${theme.iconColor} uppercase`}>Question</th>
                  <th className={`text-left px-3 py-2.5 text-[10px] font-bold ${theme.iconColor} uppercase`}>Subject</th>
                  <th className={`text-left px-3 py-2.5 text-[10px] font-bold ${theme.iconColor} uppercase`}>Chapter</th>
                  <th className={`text-center px-3 py-2.5 text-[10px] font-bold ${theme.iconColor} uppercase`}>Type</th>
                  <th className={`text-center px-3 py-2.5 text-[10px] font-bold ${theme.iconColor} uppercase`}>Difficulty</th>
                  <th className={`text-center px-3 py-2.5 text-[10px] font-bold ${theme.iconColor} uppercase`}>Bloom{"'"}s</th>
                  <th className={`text-left px-3 py-2.5 text-[10px] font-bold ${theme.iconColor} uppercase`}>Tags</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuestions.map((q, i) => (
                  <tr key={i} className={`border-t ${theme.border}`}>
                    <td className={`px-3 py-2 text-[10px] font-mono ${theme.primaryText}`}>{q.id}</td>
                    <td className={`px-3 py-2 text-xs font-bold ${theme.highlight} max-w-[200px] truncate`}>{q.question}</td>
                    <td className={`px-3 py-2 text-xs ${theme.iconColor}`}>{q.subject}</td>
                    <td className={`px-3 py-2 text-xs ${theme.iconColor}`}>{q.chapter}</td>
                    <td className="px-3 py-2 text-center">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${questionTypeBadge(q.type)}`}>{q.type}</span>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${difficultyBadge(q.difficulty)}`}>{q.difficulty}</span>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${bloomsBadge(q.blooms)}`}>{q.blooms}</span>
                    </td>
                    <td className={`px-3 py-2 text-[10px] ${theme.iconColor}`}>{q.tags}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── TAB 6: ONLINE EXAMS ── */}
      {section === 'Online Exams' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-50 border border-indigo-200">
            <Info size={14} className="text-indigo-500" />
            <p className="text-xs text-indigo-700 font-medium">Create and schedule online exams. Objective questions auto-graded. Results sync to Gradebook</p>
          </div>

          {/* Create Exam Button */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowCreateExam(!showCreateExam)}
              className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}
            >
              <Plus size={14} /> Create Exam
            </button>
          </div>

          {/* Create Exam Form */}
          {showCreateExam && (
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-3`}>
              <div className="flex items-center justify-between">
                <h3 className={`text-sm font-bold ${theme.highlight}`}>Create New Online Exam</h3>
                <button onClick={() => setShowCreateExam(false)} className={`text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-2 py-1 rounded-lg`}>Close</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Title</label>
                  <input type="text" placeholder="Exam title" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                </div>
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Subject</label>
                  <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                    <option>Mathematics</option>
                    <option>Science</option>
                    <option>English</option>
                  </select>
                </div>
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Class</label>
                  <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                    <option>10-A</option>
                    <option>10-B</option>
                    <option>9-A</option>
                    <option>9-B</option>
                  </select>
                </div>
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Duration (min)</label>
                  <input type="number" defaultValue={45} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Total Marks</label>
                  <input type="number" defaultValue={50} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                </div>
                <div className="flex items-end gap-2 pb-1">
                  <label className={`text-[10px] font-bold ${theme.iconColor}`}>Negative Marking:</label>
                  <button className={`w-9 h-5 rounded-full relative transition-colors bg-gray-300`}>
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 translate-x-0.5" />
                  </button>
                </div>
                <div className="flex items-end">
                  <button className={`px-3 py-2 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.highlight} flex items-center gap-1`}>
                    <Zap size={12} /> Auto-generate from bank
                  </button>
                </div>
              </div>
              {/* Manual Question Selection */}
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Select Questions Manually</label>
                <div className={`p-3 rounded-xl ${theme.secondaryBg} border ${theme.border} space-y-1 max-h-32 overflow-y-auto`}>
                  {questionBankData.slice(0, 5).map((q, i) => (
                    <label key={i} className="flex items-center gap-2">
                      <input type="checkbox" className="accent-emerald-500" defaultChecked={i < 3} />
                      <span className={`text-xs ${theme.highlight}`}>{q.id}: {q.question.slice(0, 50)}...</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${questionTypeBadge(q.type)}`}>{q.type}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={() => setShowCreateExam(false)} className={`px-4 py-2 rounded-xl ${theme.secondaryBg} text-sm font-bold ${theme.iconColor}`}>Cancel</button>
                <button className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>Save as Draft</button>
              </div>
            </div>
          )}

          {/* Exam Table */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden`}>
            <table className="w-full text-sm">
              <thead className={theme.secondaryBg}>
                <tr>
                  <th className={`text-left px-3 py-2.5 text-[10px] font-bold ${theme.iconColor} uppercase`}>Title</th>
                  <th className={`text-left px-3 py-2.5 text-[10px] font-bold ${theme.iconColor} uppercase`}>Subject</th>
                  <th className={`text-center px-3 py-2.5 text-[10px] font-bold ${theme.iconColor} uppercase`}>Class</th>
                  <th className={`text-center px-3 py-2.5 text-[10px] font-bold ${theme.iconColor} uppercase`}>Date</th>
                  <th className={`text-center px-3 py-2.5 text-[10px] font-bold ${theme.iconColor} uppercase`}>Duration</th>
                  <th className={`text-center px-3 py-2.5 text-[10px] font-bold ${theme.iconColor} uppercase`}>Qs</th>
                  <th className={`text-center px-3 py-2.5 text-[10px] font-bold ${theme.iconColor} uppercase`}>Status</th>
                  <th className={`text-center px-3 py-2.5 text-[10px] font-bold ${theme.iconColor} uppercase`}>Auto-Grade</th>
                  <th className={`text-center px-3 py-2.5 text-[10px] font-bold ${theme.iconColor} uppercase`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {onlineExamsData.map((exam, i) => (
                  <React.Fragment key={i}>
                    <tr className={`border-t ${theme.border}`}>
                      <td className={`px-3 py-2.5`}>
                        <span className={`text-xs font-bold ${theme.highlight}`}>{exam.title}</span>
                        {exam.status === 'Published' && (
                          <span className="block text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-bold mt-1 w-fit">Mobile</span>
                        )}
                      </td>
                      <td className={`px-3 py-2.5 text-xs ${theme.iconColor}`}>{exam.subject}</td>
                      <td className={`px-3 py-2.5 text-xs text-center ${theme.iconColor}`}>{exam.cls}</td>
                      <td className={`px-3 py-2.5 text-xs text-center ${theme.iconColor}`}>{exam.date}</td>
                      <td className={`px-3 py-2.5 text-xs text-center ${theme.iconColor}`}>{exam.duration}</td>
                      <td className={`px-3 py-2.5 text-xs text-center font-bold ${theme.highlight}`}>{exam.questions}</td>
                      <td className="px-3 py-2.5 text-center">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${statusColor(exam.status)}`}>{exam.status}</span>
                      </td>
                      <td className="px-3 py-2.5 text-center">
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-700">Objective</span>
                      </td>
                      <td className="px-3 py-2.5 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {exam.status === 'Draft' && (
                            <button className={`text-[10px] px-2 py-1 rounded-lg font-bold bg-emerald-100 text-emerald-700`}>Publish</button>
                          )}
                          {(exam.status === 'Draft' || exam.status === 'Published') && (
                            <button
                              onClick={() => setShowSchedule(showSchedule === exam.id ? null : exam.id)}
                              className={`text-[10px] px-2 py-1 rounded-lg font-bold ${theme.secondaryBg} ${theme.iconColor} flex items-center gap-0.5`}
                            >
                              <Calendar size={10} /> Schedule
                            </button>
                          )}
                          {(exam.status === 'Completed' || exam.status === 'Graded') && (
                            <button
                              onClick={() => setShowResults(showResults === exam.id ? null : exam.id)}
                              className={`text-[10px] px-2 py-1 rounded-lg font-bold bg-blue-100 text-blue-700 flex items-center gap-0.5`}
                            >
                              <BarChart3 size={10} /> Results
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>

                    {/* Schedule Inline Panel */}
                    {showSchedule === exam.id && (
                      <tr className={`border-t ${theme.border}`}>
                        <td colSpan={9} className="px-4 py-3">
                          <div className={`${theme.secondaryBg} rounded-xl p-3 space-y-2`}>
                            <p className={`text-xs font-bold ${theme.highlight}`}>Schedule: {exam.title}</p>
                            <div className="grid grid-cols-3 gap-3">
                              <div>
                                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Start Date/Time</label>
                                <input type="datetime-local" className={`w-full px-2 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-xs outline-none`} />
                              </div>
                              <div>
                                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>End Date/Time</label>
                                <input type="datetime-local" className={`w-full px-2 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-xs outline-none`} />
                              </div>
                              <div>
                                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Eligible Students</label>
                                <select className={`w-full px-2 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                                  <option>All Students</option>
                                  <option>Section A only</option>
                                  <option>Section B only</option>
                                </select>
                              </div>
                            </div>
                            <div className="flex justify-end gap-2">
                              <button onClick={() => setShowSchedule(null)} className={`px-3 py-1.5 rounded-lg text-xs ${theme.secondaryBg} ${theme.iconColor}`}>Cancel</button>
                              <button className={`px-3 py-1.5 ${theme.primary} text-white rounded-lg text-xs font-bold`}>Save Schedule</button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}

                    {/* Results Inline Panel */}
                    {showResults === exam.id && (
                      <tr className={`border-t ${theme.border}`}>
                        <td colSpan={9} className="px-4 py-3">
                          <div className={`${theme.secondaryBg} rounded-xl p-4 space-y-3`}>
                            <div className="flex items-center justify-between">
                              <p className={`text-xs font-bold ${theme.highlight}`}>Results: {exam.title}</p>
                              <button onClick={() => setShowResults(null)} className={`text-xs ${theme.iconColor}`}>Close</button>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                              <div className={`${theme.cardBg} rounded-xl border ${theme.border} p-3 text-center`}>
                                <p className={`text-lg font-bold ${theme.highlight}`}>72%</p>
                                <p className={`text-[10px] ${theme.iconColor}`}>Class Average</p>
                              </div>
                              <div className={`${theme.cardBg} rounded-xl border ${theme.border} p-3 text-center`}>
                                <p className="text-lg font-bold text-emerald-600">88%</p>
                                <p className={`text-[10px] ${theme.iconColor}`}>Pass Rate</p>
                              </div>
                              <div className={`${theme.cardBg} rounded-xl border ${theme.border} p-3 text-center`}>
                                <p className={`text-lg font-bold ${theme.highlight}`}>Isha Reddy</p>
                                <p className={`text-[10px] ${theme.iconColor}`}>Topper (95%)</p>
                              </div>
                            </div>
                            {/* Per-question analysis */}
                            <div>
                              <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-2`}>Per-Question Analysis</p>
                              <div className="space-y-1.5">
                                {['Q1 — sin 30', 'Q2 — Triangle angles', 'Q3 — Pythagorean', 'Q4 — Quadratic roots', 'Q5 — Circle area'].map((q, qi) => {
                                  const pct = [92, 78, 65, 45, 88][qi];
                                  return (
                                    <div key={qi} className="flex items-center gap-2">
                                      <span className={`text-[10px] w-28 ${theme.iconColor}`}>{q}</span>
                                      <div className={`flex-1 h-2 rounded-full ${theme.cardBg} border ${theme.border} overflow-hidden`}>
                                        <div className={`h-full rounded-full ${pct >= 70 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${pct}%` }} />
                                      </div>
                                      <span className={`text-[10px] font-bold ${pct >= 70 ? 'text-emerald-600' : pct >= 50 ? 'text-amber-600' : 'text-red-600'}`}>{pct}%</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Gradebook Sync Note */}
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
            <Link size={14} className="text-emerald-500" />
            <ArrowRight size={12} className="text-emerald-400" />
            <p className="text-xs text-emerald-700 font-medium">Results auto-sync to Gradebook module</p>
          </div>
        </div>
      )}

      {/* ── MOBILE APP PREVIEW ── */}
      <MobilePreviewToggle
        theme={theme}
        mobileContent={
          <MobileFrame title="LMS" theme={theme}>
            {/* Pull to refresh */}
            <div className="flex items-center justify-center py-1">
              <div className="flex items-center gap-1 text-[9px] text-gray-400">
                <span>&#8595;</span> Pull to refresh
              </div>
            </div>

            {/* Content cards with thumbnails */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-bold text-gray-700">My Content</span>
              <div className="flex-1 h-px bg-gray-200" />
              <button className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs">+</button>
            </div>

            {myContentData.slice(0, 4).map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-2 flex gap-2">
                {/* Thumbnail */}
                <div className={"w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 " + (
                  item.type === 'Video' ? 'bg-red-100' :
                  item.type === 'PDF' ? 'bg-blue-100' :
                  item.type === 'Presentation' ? 'bg-orange-100' :
                  'bg-purple-100'
                )}>
                  <span className="text-lg">
                    {item.type === 'Video' ? '\u25B6' :
                     item.type === 'PDF' ? '\u2B1C' :
                     item.type === 'Presentation' ? '\u25A3' :
                     '\u2753'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-gray-800 truncate">{item.title}</p>
                  <p className="text-[8px] text-gray-400">{item.cls} &bull; {item.subject}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[8px] text-gray-400">{item.views} views</span>
                    <span className={"text-[8px] px-1.5 py-0.5 rounded-full font-bold " + (
                      item.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
                    )}>{item.status}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Question Bank quick-add */}
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[10px] font-bold text-gray-700">Quick Add Question</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-2.5 space-y-1.5">
              <div className="flex gap-2">
                <select className="flex-1 text-[9px] font-bold text-gray-600 bg-gray-100 rounded-lg px-2 py-1 border-none outline-none">
                  <option>MCQ</option>
                  <option>True/False</option>
                  <option>Short Answer</option>
                  <option>Descriptive</option>
                </select>
                <select className="flex-1 text-[9px] font-bold text-gray-600 bg-gray-100 rounded-lg px-2 py-1 border-none outline-none">
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
              <textarea
                rows={2}
                placeholder="Type question here..."
                className="w-full px-2 py-1 bg-gray-50 rounded-lg text-[9px] border border-gray-200 resize-none outline-none"
              />
              <button className="w-full py-1.5 bg-blue-600 text-white rounded-lg text-[9px] font-bold">
                Add to Question Bank
              </button>
            </div>

            {/* Exam monitoring dashboard */}
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[10px] font-bold text-gray-700">Live Exams</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-2.5">
              <div className="flex items-center justify-between mb-1.5">
                <div>
                  <p className="text-[10px] font-bold text-gray-800">UT-3 Mathematics</p>
                  <p className="text-[8px] text-gray-400">Class 10-A &bull; 45 min</p>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-red-100 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[8px] font-bold text-red-700">LIVE</span>
                </div>
              </div>
              {/* Live stats */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-emerald-50 rounded-lg p-1.5 text-center">
                  <p className="text-sm font-bold text-emerald-700">28</p>
                  <p className="text-[7px] text-emerald-600">Active</p>
                </div>
                <div className="bg-amber-50 rounded-lg p-1.5 text-center">
                  <p className="text-sm font-bold text-amber-700">6</p>
                  <p className="text-[7px] text-amber-600">Submitted</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-1.5 text-center">
                  <p className="text-sm font-bold text-gray-700">8</p>
                  <p className="text-[7px] text-gray-600">Not Started</p>
                </div>
              </div>
              {/* Progress bar */}
              <div className="mt-1.5">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[8px] text-gray-400">Time remaining</span>
                  <span className="text-[8px] font-bold text-red-600">12:34</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: '72%' }} />
                </div>
              </div>
            </div>
          </MobileFrame>
        }
      />
    </div>
  );
}
