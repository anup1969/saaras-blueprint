'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { StatCard, StatusBadge, TabBar, SearchBar, DataTable } from '@/components/shared';
import {
  ClipboardList, BarChart3, Users, TrendingUp, Plus, X, Eye, Edit, Download,
  Star, PieChart, ThumbsUp, ThumbsDown, Minus, ChevronDown, ChevronUp,
} from 'lucide-react';
import { FormField, InputField, SelectField, TextAreaField } from '../_components/FormHelpers';

// ── Mock Data ──
const surveys = [
  { id: 'SRV-001', title: 'Parent Satisfaction Survey (Term 1)', type: 'Survey', questionCount: 15, audience: 'All Parents', startDate: '01 Feb 2026', endDate: '15 Feb 2026', responses: 280, totalTarget: 320, status: 'Closed', npsScore: 72 },
  { id: 'SRV-002', title: 'Teacher Feedback — 360 Review', type: 'Feedback', questionCount: 20, audience: 'Students + Parents', startDate: '10 Feb 2026', endDate: '28 Feb 2026', responses: 180, totalTarget: 450, status: 'Active', npsScore: null },
  { id: 'SRV-003', title: 'Canteen Menu Preference Poll', type: 'Poll', questionCount: 5, audience: 'Students (Class 6-12)', startDate: '20 Feb 2026', endDate: '25 Feb 2026', responses: 410, totalTarget: 500, status: 'Closed', npsScore: null },
  { id: 'SRV-004', title: 'Sports Day Event Feedback', type: 'Survey', questionCount: 10, audience: 'All', startDate: '15 Feb 2026', endDate: '20 Feb 2026', responses: 350, totalTarget: 650, status: 'Closed', npsScore: 65 },
  { id: 'SRV-005', title: 'Infrastructure Improvement Suggestions', type: 'Survey', questionCount: 8, audience: 'All Staff', startDate: '25 Feb 2026', endDate: '10 Mar 2026', responses: 45, totalTarget: 98, status: 'Active', npsScore: null },
  { id: 'SRV-006', title: 'Annual Day Performance Vote', type: 'Poll', questionCount: 3, audience: 'Students (Class 1-5)', startDate: '01 Mar 2026', endDate: '05 Mar 2026', responses: 0, totalTarget: 250, status: 'Draft', npsScore: null },
];

const typeStyle = (t: string) => {
  if (t === 'Survey') return 'bg-blue-100 text-blue-700';
  if (t === 'Poll') return 'bg-purple-100 text-purple-700';
  return 'bg-amber-100 text-amber-700';
};

const statusStyle = (s: string) => {
  if (s === 'Active') return 'bg-emerald-100 text-emerald-700';
  if (s === 'Closed') return 'bg-gray-100 text-gray-600';
  return 'bg-amber-100 text-amber-700';
};

// Mock question results for SRV-001
const questionResults = [
  { question: 'How satisfied are you with the overall teaching quality?', type: 'MCQ', options: [{ label: 'Very Satisfied', count: 145, pct: 52 }, { label: 'Satisfied', count: 89, pct: 32 }, { label: 'Neutral', count: 30, pct: 11 }, { label: 'Dissatisfied', count: 16, pct: 5 }] },
  { question: 'Rate the communication from school (1-5)', type: 'Rating', avgScore: 4.2, distribution: [3, 8, 35, 112, 122] },
  { question: 'How would you rate the school infrastructure?', type: 'MCQ', options: [{ label: 'Excellent', count: 98, pct: 35 }, { label: 'Good', count: 120, pct: 43 }, { label: 'Average', count: 45, pct: 16 }, { label: 'Needs Improvement', count: 17, pct: 6 }] },
  { question: 'What improvements would you suggest?', type: 'Text', responses: ['Better sports facilities', 'More parent-teacher interactions', 'Upgraded science lab equipment', 'Better canteen food variety', 'AC in classrooms'] },
];

// NPS Data
const npsData = {
  currentScore: 72,
  promoters: { count: 196, pct: 70 },
  passives: { count: 56, pct: 20 },
  detractors: { count: 28, pct: 10 },
  trend: [
    { survey: 'Q2 2025', score: 58 },
    { survey: 'Q3 2025', score: 63 },
    { survey: 'Q4 2025', score: 65 },
    { survey: 'Q1 2026', score: 72 },
  ],
  detractorFeedback: [
    'Bus delays have been persistent. Needs immediate fix.',
    'Fee structure not transparent enough.',
    'Insufficient communication about child\'s academic struggles.',
    'Library needs more books for competitive exam preparation.',
  ],
};

// 360 Teacher Feedback Mock
const teacherFeedback = [
  { teacher: 'Mrs. Sharma', subject: 'Mathematics', studentRating: 4.5, parentRating: 4.3, peerRating: 4.1, overall: 4.3 },
  { teacher: 'Mr. Reddy', subject: 'Science', studentRating: 4.2, parentRating: 4.0, peerRating: 4.4, overall: 4.2 },
  { teacher: "Ms. D'Souza", subject: 'English', studentRating: 4.7, parentRating: 4.6, peerRating: 4.3, overall: 4.5 },
  { teacher: 'Mr. Patil', subject: 'Hindi', studentRating: 3.8, parentRating: 3.9, peerRating: 4.0, overall: 3.9 },
  { teacher: 'Mrs. Iyer', subject: 'Social Science', studentRating: 4.0, parentRating: 4.2, peerRating: 4.1, overall: 4.1 },
];

export default function SurveyPollModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All Surveys');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState('SRV-001');
  const [expandedQ, setExpandedQ] = useState<number | null>(null);

  const activeSurveys = surveys.filter(s => s.status === 'Active');
  const draftSurveys = surveys.filter(s => s.status === 'Draft');
  const totalResponses = surveys.reduce((s, sv) => s + sv.responses, 0);
  const avgResponseRate = Math.round(surveys.filter(s => s.status !== 'Draft').reduce((s, sv) => s + (sv.responses / sv.totalTarget) * 100, 0) / surveys.filter(s => s.status !== 'Draft').length);

  const getSurveyList = () => {
    if (tab === 'Active') return activeSurveys;
    if (tab === 'Draft') return draftSurveys;
    return surveys;
  };

  const npsColor = (score: number) => {
    if (score >= 60) return 'text-emerald-600';
    if (score >= 30) return 'text-amber-600';
    return 'text-red-600';
  };

  const npsBarColor = (score: number) => {
    if (score >= 60) return 'bg-emerald-500';
    if (score >= 30) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Surveys & Polls</h1>
        <button onClick={() => setShowCreateForm(true)} className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}>
          <Plus size={14} /> Create Survey
        </button>
      </div>
      <TabBar tabs={['All Surveys', 'Active', 'Draft', 'Results', 'NPS']} active={tab} onChange={setTab} theme={theme} />

      {/* ── Survey List Tabs ── */}
      {(tab === 'All Surveys' || tab === 'Active' || tab === 'Draft') && (
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <StatCard icon={ClipboardList} label="Total Surveys" value={String(surveys.length)} color="bg-blue-500" theme={theme} />
            <StatCard icon={TrendingUp} label="Active" value={String(activeSurveys.length)} color="bg-emerald-500" theme={theme} />
            <StatCard icon={Users} label="Responses Collected" value={String(totalResponses)} color="bg-purple-500" theme={theme} />
            <StatCard icon={BarChart3} label="Avg Response Rate" value={`${avgResponseRate}%`} color="bg-amber-500" theme={theme} />
          </div>

          <div className="space-y-3">
            {getSurveyList().map(sv => (
              <div key={sv.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${sv.type === 'Survey' ? 'bg-blue-500' : sv.type === 'Poll' ? 'bg-purple-500' : 'bg-amber-500'} flex items-center justify-center text-white`}>
                      <ClipboardList size={18} />
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${theme.highlight}`}>{sv.title}</p>
                      <p className={`text-[10px] ${theme.iconColor}`}>{sv.id} | {sv.questionCount} questions | {sv.audience}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${typeStyle(sv.type)}`}>{sv.type}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${statusStyle(sv.status)}`}>{sv.status}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <span className={`text-[10px] ${theme.iconColor}`}>{sv.startDate} - {sv.endDate}</span>
                  {sv.npsScore !== null && (
                    <span className={`text-[10px] font-bold ${npsColor(sv.npsScore)}`}>NPS: {sv.npsScore}</span>
                  )}
                </div>
                {/* Response Progress */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] ${theme.iconColor}`}>Responses: {sv.responses} / {sv.totalTarget}</span>
                    <span className={`text-[10px] font-bold ${theme.primaryText}`}>{sv.totalTarget > 0 ? Math.round((sv.responses / sv.totalTarget) * 100) : 0}%</span>
                  </div>
                  <div className={`h-2 rounded-full ${theme.secondaryBg} overflow-hidden`}>
                    <div className={`h-full rounded-full ${sv.status === 'Active' ? 'bg-emerald-500' : theme.primary}`} style={{ width: `${sv.totalTarget > 0 ? (sv.responses / sv.totalTarget) * 100 : 0}%` }} />
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  {sv.status === 'Draft' && (
                    <>
                      <button className={`px-3 py-1.5 rounded-lg text-[10px] font-bold ${theme.primary} text-white`}>Publish</button>
                      <button className={`px-3 py-1.5 rounded-lg text-[10px] font-bold ${theme.secondaryBg} ${theme.highlight}`}><Edit size={10} className="inline mr-1" />Edit</button>
                      <button className="px-3 py-1.5 rounded-lg text-[10px] font-bold bg-red-50 text-red-600">Delete</button>
                    </>
                  )}
                  {sv.status === 'Active' && (
                    <>
                      <button onClick={() => { setTab('Results'); setSelectedSurvey(sv.id); }} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold ${theme.secondaryBg} ${theme.highlight}`}><Eye size={10} className="inline mr-1" />View Results</button>
                      <button className="px-3 py-1.5 rounded-lg text-[10px] font-bold bg-red-50 text-red-600">Close Early</button>
                    </>
                  )}
                  {sv.status === 'Closed' && (
                    <button onClick={() => { setTab('Results'); setSelectedSurvey(sv.id); }} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold ${theme.secondaryBg} ${theme.highlight}`}><Eye size={10} className="inline mr-1" />View Results</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Results Tab ── */}
      {tab === 'Results' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <select value={selectedSurvey} onChange={e => setSelectedSurvey(e.target.value)} className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} flex-1`}>
              {surveys.map(s => <option key={s.id} value={s.id}>{s.title} ({s.id})</option>)}
            </select>
            <button onClick={() => window.alert('Exporting results as Excel... (Blueprint demo)')} className={`px-3 py-2 rounded-xl text-xs font-bold ${theme.secondaryBg} ${theme.highlight} flex items-center gap-1`}><Download size={12} /> Export Excel</button>
          </div>

          {/* Response Summary */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex items-center gap-6`}>
            <div>
              <p className={`text-[10px] ${theme.iconColor}`}>Total Responses</p>
              <p className={`text-xl font-bold ${theme.primaryText}`}>{surveys.find(s => s.id === selectedSurvey)?.responses || 0}</p>
            </div>
            <div>
              <p className={`text-[10px] ${theme.iconColor}`}>Response Rate</p>
              <p className={`text-xl font-bold ${theme.highlight}`}>{(() => { const sv = surveys.find(s => s.id === selectedSurvey); return sv ? Math.round((sv.responses / sv.totalTarget) * 100) : 0; })()}%</p>
            </div>
            <div>
              <p className={`text-[10px] ${theme.iconColor}`}>Questions</p>
              <p className={`text-xl font-bold ${theme.highlight}`}>{surveys.find(s => s.id === selectedSurvey)?.questionCount || 0}</p>
            </div>
          </div>

          {/* Per-Question Breakdown */}
          <div className="space-y-3">
            {questionResults.map((q, idx) => (
              <div key={idx} className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden`}>
                <div className="flex items-center gap-3 p-4 cursor-pointer" onClick={() => setExpandedQ(expandedQ === idx ? null : idx)}>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${q.type === 'MCQ' ? 'bg-blue-100 text-blue-700' : q.type === 'Rating' ? 'bg-amber-100 text-amber-700' : 'bg-purple-100 text-purple-700'}`}>{q.type}</span>
                  <p className={`text-xs font-bold ${theme.highlight} flex-1`}>Q{idx + 1}. {q.question}</p>
                  {expandedQ === idx ? <ChevronUp size={14} className={theme.iconColor} /> : <ChevronDown size={14} className={theme.iconColor} />}
                </div>
                {expandedQ === idx && (
                  <div className={`px-4 pb-4 border-t ${theme.border} pt-3`}>
                    {q.type === 'MCQ' && q.options && (
                      <div className="space-y-2">
                        {q.options.map(o => (
                          <div key={o.label} className="flex items-center gap-3">
                            <span className={`text-xs ${theme.highlight} w-36`}>{o.label}</span>
                            <div className={`flex-1 h-5 rounded-full ${theme.secondaryBg} overflow-hidden`}>
                              <div className={`h-full rounded-full ${theme.primary} flex items-center justify-end pr-2`} style={{ width: `${o.pct}%` }}>
                                {o.pct > 15 && <span className="text-[9px] text-white font-bold">{o.pct}%</span>}
                              </div>
                            </div>
                            <span className={`text-xs font-bold ${theme.highlight} w-12 text-right`}>{o.count}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {q.type === 'Rating' && q.avgScore !== undefined && q.distribution && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <span className={`text-2xl font-bold ${theme.primaryText}`}>{q.avgScore.toFixed(1)}</span>
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, s) => (
                              <Star key={s} size={18} className={s < Math.round(q.avgScore!) ? 'text-amber-500 fill-amber-500' : 'text-gray-300'} />
                            ))}
                          </div>
                        </div>
                        <div className="space-y-1">
                          {q.distribution.map((count, s) => (
                            <div key={s} className="flex items-center gap-2">
                              <span className={`text-[10px] ${theme.iconColor} w-8`}>{5 - s} star</span>
                              <div className={`flex-1 h-3 rounded-full ${theme.secondaryBg} overflow-hidden`}>
                                <div className="h-full rounded-full bg-amber-500" style={{ width: `${(q.distribution![4 - s] / 280) * 100}%` }} />
                              </div>
                              <span className={`text-[10px] ${theme.iconColor} w-8 text-right`}>{q.distribution![4 - s]}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {q.type === 'Text' && q.responses && (
                      <div className="space-y-2">
                        {q.responses.map((r, i) => (
                          <div key={i} className={`p-2 rounded-lg ${theme.secondaryBg}`}>
                            <p className={`text-xs ${theme.iconColor} italic`}>"{r}"</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 360 Feedback Section */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-4`}>360 Teacher Feedback Dashboard</h3>
            <DataTable
              headers={['Teacher', 'Subject', 'Students', 'Parents', 'Peers', 'Overall']}
              rows={teacherFeedback.map(tf => [
                <span key="n" className={`font-bold ${theme.highlight}`}>{tf.teacher}</span>,
                <span key="s" className={theme.iconColor}>{tf.subject}</span>,
                <div key="st" className="flex items-center gap-1">
                  <Star size={10} className="text-amber-500 fill-amber-500" />
                  <span className={`text-xs font-bold ${theme.highlight}`}>{tf.studentRating.toFixed(1)}</span>
                </div>,
                <div key="p" className="flex items-center gap-1">
                  <Star size={10} className="text-amber-500 fill-amber-500" />
                  <span className={`text-xs font-bold ${theme.highlight}`}>{tf.parentRating.toFixed(1)}</span>
                </div>,
                <div key="pe" className="flex items-center gap-1">
                  <Star size={10} className="text-amber-500 fill-amber-500" />
                  <span className={`text-xs font-bold ${theme.highlight}`}>{tf.peerRating.toFixed(1)}</span>
                </div>,
                <div key="o" className="flex items-center gap-1">
                  <span className={`text-sm font-bold ${tf.overall >= 4.3 ? 'text-emerald-600' : tf.overall >= 4.0 ? 'text-blue-600' : 'text-amber-600'}`}>{tf.overall.toFixed(1)}</span>
                </div>,
              ])}
              theme={theme}
            />
          </div>
        </div>
      )}

      {/* ── NPS Tab ── */}
      {tab === 'NPS' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* NPS Gauge */}
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
              <h3 className={`text-sm font-bold ${theme.highlight} mb-4`}>Net Promoter Score</h3>
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-48 h-24">
                  {/* Gauge background */}
                  <div className="absolute inset-0 rounded-t-full overflow-hidden" style={{ background: 'linear-gradient(90deg, #ef4444 0%, #ef4444 30%, #f59e0b 30%, #f59e0b 60%, #10b981 60%, #10b981 100%)' }}>
                    <div className={`absolute bottom-0 left-0 right-0 h-12 ${theme.cardBg}`} />
                  </div>
                  <div className="absolute inset-0 flex items-end justify-center pb-1">
                    <span className={`text-3xl font-bold ${npsColor(npsData.currentScore)}`}>{npsData.currentScore}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-center">
                <div className="flex-1">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <ThumbsDown size={12} className="text-red-500" />
                    <span className="text-[10px] text-red-600 font-bold">Detractors</span>
                  </div>
                  <p className="text-lg font-bold text-red-600">{npsData.detractors.pct}%</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{npsData.detractors.count} responses</p>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Minus size={12} className="text-amber-500" />
                    <span className="text-[10px] text-amber-600 font-bold">Passives</span>
                  </div>
                  <p className="text-lg font-bold text-amber-600">{npsData.passives.pct}%</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{npsData.passives.count} responses</p>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <ThumbsUp size={12} className="text-emerald-500" />
                    <span className="text-[10px] text-emerald-600 font-bold">Promoters</span>
                  </div>
                  <p className="text-lg font-bold text-emerald-600">{npsData.promoters.pct}%</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{npsData.promoters.count} responses</p>
                </div>
              </div>
            </div>

            {/* NPS Trend */}
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
              <h3 className={`text-sm font-bold ${theme.highlight} mb-4`}>NPS Trend</h3>
              <div className="flex items-end gap-6 h-36 px-4">
                {npsData.trend.map(t => (
                  <div key={t.survey} className="flex-1 flex flex-col items-center gap-1">
                    <span className={`text-xs font-bold ${npsColor(t.score)}`}>{t.score}</span>
                    <div className={`w-full rounded-t-lg ${npsBarColor(t.score)}`} style={{ height: `${((t.score + 100) / 200) * 100}%`, minHeight: '12px' }} />
                    <span className={`text-[9px] ${theme.iconColor} text-center`}>{t.survey}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-4 mt-3">
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-red-500" /><span className={`text-[10px] ${theme.iconColor}`}>0-30</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-amber-500" /><span className={`text-[10px] ${theme.iconColor}`}>30-60</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-emerald-500" /><span className={`text-[10px] ${theme.iconColor}`}>60-100</span></div>
              </div>
            </div>
          </div>

          {/* Detractor Feedback */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Actionable Insights from Detractors</h3>
            <div className="space-y-2">
              {npsData.detractorFeedback.map((f, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-red-50 border border-red-200">
                  <ThumbsDown size={14} className="text-red-500 mt-0.5 shrink-0" />
                  <p className="text-xs text-red-800 leading-relaxed">{f}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Launch NPS */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 flex items-center justify-between`}>
            <div>
              <p className={`text-sm font-bold ${theme.highlight}`}>Launch Quick NPS Survey</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Send a one-question NPS survey to all parents</p>
            </div>
            <button onClick={() => window.alert('NPS Survey launched to all parents! (Blueprint demo)')} className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-xs font-bold flex items-center gap-1`}>
              <TrendingUp size={14} /> Launch NPS Survey
            </button>
          </div>
        </div>
      )}

      {/* ── Create Survey Modal ── */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowCreateForm(false)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} shadow-2xl w-full max-w-lg p-6 space-y-4 max-h-[85vh] overflow-y-auto`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ClipboardList size={16} className={theme.primaryText} />
                <h2 className={`text-lg font-bold ${theme.highlight}`}>Create Survey</h2>
              </div>
              <button onClick={() => setShowCreateForm(false)} className={`p-1.5 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
            </div>
            <FormField label="Title" required theme={theme}>
              <InputField placeholder="Survey title..." value="" onChange={() => {}} theme={theme} />
            </FormField>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Type" required theme={theme}>
                <SelectField options={['Survey', 'Poll', 'NPS', '360 Feedback']} value="" onChange={() => {}} theme={theme} placeholder="Select type" />
              </FormField>
              <FormField label="Target Audience" required theme={theme}>
                <SelectField options={['All Parents', 'All Staff', 'Students + Parents', 'All', 'Students (Class 1-5)', 'Students (Class 6-12)']} value="" onChange={() => {}} theme={theme} placeholder="Select audience" />
              </FormField>
            </div>

            {/* Question Builder */}
            <div className={`p-4 rounded-xl border ${theme.border} ${theme.secondaryBg} space-y-3`}>
              <div className="flex items-center justify-between">
                <p className={`text-xs font-bold ${theme.highlight}`}>Questions</p>
                <button className={`px-3 py-1.5 rounded-lg text-[10px] font-bold ${theme.primary} text-white flex items-center gap-1`}><Plus size={10} /> Add Question</button>
              </div>
              {/* Sample question */}
              <div className={`p-3 rounded-xl ${theme.cardBg} border ${theme.border}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold bg-blue-100 text-blue-700`}>Q1</span>
                  <input placeholder="Enter question..." className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs outline-none`} />
                </div>
                <div className="flex gap-1.5">
                  {['MCQ', 'Rating Scale', 'Text', 'Yes/No'].map(t => (
                    <button key={t} className={`px-2 py-1 rounded-lg text-[10px] font-bold border ${theme.border} ${theme.iconColor} ${theme.buttonHover}`}>{t}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <FormField label="Start Date" required theme={theme}>
                <InputField type="date" value="" onChange={() => {}} theme={theme} />
              </FormField>
              <FormField label="End Date" required theme={theme}>
                <InputField type="date" value="" onChange={() => {}} theme={theme} />
              </FormField>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg} flex items-center gap-3`}>
              <input type="checkbox" className="rounded" id="anon-resp" />
              <label htmlFor="anon-resp" className={`text-xs ${theme.highlight} cursor-pointer`}>Allow anonymous responses</label>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowCreateForm(false)} className={`flex-1 py-2.5 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.highlight}`}>Save as Draft</button>
              <button onClick={() => { window.alert('Survey created and published! (Blueprint demo)'); setShowCreateForm(false); }} className={`flex-1 py-2.5 rounded-xl ${theme.primary} text-white text-sm font-bold`}>Publish Survey</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
