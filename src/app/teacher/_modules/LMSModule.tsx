'use client';

import React, { useState } from 'react';
import { TabBar, DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  Upload, FileText, Video, Presentation, HelpCircle, Eye,
  Search, Plus, Clock, CheckCircle, BookOpen, BarChart3,
  Send, GripVertical, Trash2, Radio, Type, ToggleLeft,
  MonitorPlay, Play, FileDown
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

// ─── COMPONENT ──────────────────────────────────────

export default function LMSModule({ theme }: { theme: Theme }) {
  const [section, setSection] = useState('My Content');
  const [showUpload, setShowUpload] = useState(false);
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [librarySearch, setLibrarySearch] = useState('');

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

  const filteredLibrary = libraryContent.filter(c => {
    const matchSearch = librarySearch === '' || c.title.toLowerCase().includes(librarySearch.toLowerCase());
    const matchSubject = subjectFilter === 'All' || c.subject === subjectFilter;
    return matchSearch && matchSubject;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>LMS / E-Learning</h1>
        <button onClick={() => { setSection('My Content'); setShowUpload(true); }} className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}>
          <Upload size={14} /> Upload New
        </button>
      </div>

      <TabBar tabs={['My Content', 'Quiz Builder', 'Student Progress', 'Content Library']} active={section} onChange={setSection} theme={theme} />

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
    </div>
  );
}
