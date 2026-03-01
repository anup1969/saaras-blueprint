'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { StatCard, TabBar, DataTable, MobileFrame, MobilePreviewToggle } from '@/components/shared';
import {
  TrendingUp, AlertCircle, MessageSquare,
  Star, Award, Download, X, Calendar, Clock, Info, Smartphone,
} from 'lucide-react';
import type { ChildProfile } from '../_components/types';
import { academicsData } from '../_components/data';

export default function AcademicsModule({ theme, child }: { theme: Theme; child: ChildProfile }) {
  const acad = academicsData[child.id];
  const [selectedExam, setSelectedExam] = useState(0);
  const exam = acad.exams[selectedExam];
  const [showResultBanner, setShowResultBanner] = useState(true);

  // Helper: Info tooltip icon
  const InfoTip = ({ tip }: { tip: string }) => (
    <span title={tip} className="inline-block ml-1 cursor-help"><Info size={14} className={theme.iconColor} /></span>
  );

  // Helper: Mobile badge
  const MobileBadge = () => (
    <span className="inline-flex items-center gap-0.5 ml-1.5 text-[9px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold">
      <Smartphone size={9} /> Mobile
    </span>
  );

  // Upcoming exam schedule
  const upcomingExamSchedule = [
    { date: 'Mar 15, 2026', subject: 'Mathematics', time: '10:00 AM - 12:00 PM', venue: 'Hall A' },
    { date: 'Mar 18, 2026', subject: 'Science Practical', time: '2:00 PM - 3:00 PM', venue: 'Lab A' },
    { date: 'Mar 20, 2026', subject: 'English Literature', time: '10:00 AM - 1:00 PM', venue: 'Hall B' },
  ];

  return (
    <div className="space-y-4">
      {/* ── Result Notification Banner ── */}
      {showResultBanner && (
        <div className={`rounded-2xl border border-blue-300 bg-blue-50 p-4 flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white">
              <TrendingUp size={18} />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <p className="text-sm font-bold text-blue-900">New results published: Term 1 Exam (Feb 2026)</p>
                <InfoTip tip="You'll be notified when new exam results are published" />
                <MobileBadge />
              </div>
              <p className="text-[10px] text-blue-700 mt-0.5">View your child&apos;s report card and detailed performance analysis</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedExam(0)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-all"
            >
              <Award size={12} /> View Results
            </button>
            <button onClick={() => setShowResultBanner(false)} className="p-1.5 rounded-lg hover:bg-blue-100 transition-all text-blue-400">
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h2 className={`text-lg font-bold ${theme.highlight}`}>Academic Performance</h2>
        <button className={`flex items-center gap-1 px-3 py-1.5 rounded-lg ${theme.secondaryBg} text-xs font-bold ${theme.iconColor}`}>
          <Download size={12} /> Download Report Card
        </button>
      </div>

      {/* Exam Selector */}
      <TabBar tabs={acad.exams.map(e => e.name)} active={exam.name} onChange={(t) => setSelectedExam(acad.exams.findIndex(e => e.name === t))} theme={theme} />

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-3">
        <StatCard icon={Award} label="Total Marks" value={`${exam.totalMarks}/${exam.totalOutOf}`} color="bg-blue-500" sub={`${Math.round((exam.totalMarks / exam.totalOutOf) * 100)}%`} theme={theme} />
        <StatCard icon={TrendingUp} label="Class Rank" value={`#${exam.rank}`} color="bg-purple-500" sub={`of ${exam.classStrength} students`} theme={theme} />
        <StatCard icon={Star} label="Best Subject" value={exam.subjects.sort((a, b) => b.marks / b.total - a.marks / a.total)[0].subject} color="bg-emerald-500" sub={`${exam.subjects.sort((a, b) => b.marks / b.total - a.marks / a.total)[0].marks}/${exam.subjects.sort((a, b) => b.marks / b.total - a.marks / a.total)[0].total}`} theme={theme} />
        <StatCard icon={AlertCircle} label="Needs Work" value={exam.subjects.sort((a, b) => a.marks / a.total - b.marks / b.total)[0].subject} color="bg-amber-500" sub={`${exam.subjects.sort((a, b) => a.marks / a.total - b.marks / b.total)[0].marks}/${exam.subjects.sort((a, b) => a.marks / a.total - b.marks / b.total)[0].total}`} theme={theme} />
      </div>

      {/* Subject-wise Results Table */}
      <DataTable
        headers={['Subject', 'Marks Obtained', 'Total', 'Percentage', 'Grade', 'Class Average', 'vs Average']}
        rows={exam.subjects.map(s => [
          <span key="sub" className={`font-bold ${theme.highlight}`}>{s.subject}</span>,
          <span key="marks" className={`font-bold ${theme.highlight}`}>{s.marks}</span>,
          <span key="total" className={theme.iconColor}>{s.total}</span>,
          <span key="pct" className={`font-bold ${s.marks / s.total >= 0.75 ? 'text-emerald-600' : s.marks / s.total >= 0.5 ? 'text-amber-600' : 'text-red-600'}`}>
            {Math.round((s.marks / s.total) * 100)}%
          </span>,
          <span key="grade" className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
            s.grade.startsWith('A') ? 'bg-emerald-100 text-emerald-700' : s.grade.startsWith('B') ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
          }`}>{s.grade}</span>,
          <span key="avg" className={theme.iconColor}>{s.classAvg}</span>,
          <span key="diff" className={`text-xs font-bold ${s.marks - s.classAvg >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            {s.marks - s.classAvg >= 0 ? '+' : ''}{s.marks - s.classAvg}
          </span>,
        ])}
        theme={theme}
      />

      {/* Performance Bars */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Subject-wise Performance</h3>
        <div className="space-y-3">
          {exam.subjects.map(s => (
            <div key={s.subject}>
              <div className="flex justify-between mb-1">
                <span className={`text-xs ${theme.highlight}`}>{s.subject}</span>
                <span className={`text-xs font-bold ${theme.highlight}`}>{s.marks}/{s.total}</span>
              </div>
              <div className="relative">
                <div className={`h-2.5 rounded-full ${theme.secondaryBg}`}>
                  <div
                    className={`h-2.5 rounded-full transition-all ${
                      s.marks / s.total >= 0.75 ? 'bg-emerald-500' : s.marks / s.total >= 0.5 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${(s.marks / s.total) * 100}%` }}
                  />
                </div>
                {/* Class average marker */}
                <div
                  className="absolute top-0 h-2.5 w-0.5 bg-blue-600 rounded"
                  style={{ left: `${(s.classAvg / s.total) * 100}%` }}
                  title={`Class Avg: ${s.classAvg}`}
                />
              </div>
            </div>
          ))}
          <div className="flex items-center gap-4 mt-2 pt-2 border-t border-dashed" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-1.5 rounded bg-emerald-500" />
              <span className={`text-[10px] ${theme.iconColor}`}>Student Marks</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-0.5 h-3 rounded bg-blue-600" />
              <span className={`text-[10px] ${theme.iconColor}`}>Class Average</span>
            </div>
          </div>
        </div>
      </div>

      {/* Teacher Remarks */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center gap-2 mb-2">
          <MessageSquare size={14} className={theme.iconColor} />
          <h3 className={`text-sm font-bold ${theme.highlight}`}>Teacher Remarks</h3>
        </div>
        <p className={`text-xs ${theme.iconColor} leading-relaxed italic`}>&quot;{exam.remarks}&quot;</p>
        <p className={`text-[10px] ${theme.iconColor} mt-2 opacity-60`}>- Class Teacher, {exam.date}</p>
      </div>

      {/* ── Upcoming Exam Schedule ── */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <Calendar size={14} className={theme.iconColor} />
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Upcoming Exams</h3>
            <InfoTip tip="Your child's exam schedule with dates and venues" />
          </div>
          <button
            onClick={() => alert('Added to Calendar (Blueprint demo)')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}
          >
            <Calendar size={12} /> Add to Calendar
            <MobileBadge />
          </button>
        </div>
        <div className={`overflow-hidden rounded-xl border ${theme.border}`}>
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              <th className={`p-2.5 text-left font-bold ${theme.iconColor} uppercase`}>Date</th>
              <th className={`p-2.5 text-left font-bold ${theme.iconColor} uppercase`}>Subject</th>
              <th className={`p-2.5 text-left font-bold ${theme.iconColor} uppercase`}>Time</th>
              <th className={`p-2.5 text-left font-bold ${theme.iconColor} uppercase`}>Venue</th>
            </tr></thead>
            <tbody>
              {upcomingExamSchedule.map((ex, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className={`p-2.5 ${theme.iconColor}`}>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={10} className={theme.iconColor} />
                      {ex.date}
                    </div>
                  </td>
                  <td className={`p-2.5 font-bold ${theme.highlight}`}>{ex.subject}</td>
                  <td className={`p-2.5 ${theme.iconColor}`}>
                    <div className="flex items-center gap-1.5">
                      <Clock size={10} className={theme.iconColor} />
                      {ex.time}
                    </div>
                  </td>
                  <td className={`p-2.5 ${theme.iconColor}`}>{ex.venue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Mobile App Preview ── */}
      <MobilePreviewToggle theme={theme} mobileContent={
        <div className="flex flex-wrap gap-6 justify-center">
          {/* Screen 1: Exam Results */}
          <MobileFrame title="Results" theme={theme}>
            <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 text-center">
              <p className="text-[9px] text-gray-500">{exam.name} &bull; {exam.date}</p>
              <p className="text-2xl font-bold text-blue-600 mt-0.5">{exam.totalMarks}/{exam.totalOutOf}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">Rank: <span className="font-bold text-amber-600">#{exam.rank}</span> of {exam.classStrength}</p>
            </div>

            <div className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-100">
              <p className="text-[10px] font-bold text-gray-800 mb-2">Subject-wise Marks</p>
              {exam.subjects.map((s, i) => (
                <div key={i} className="py-1.5 border-b border-gray-50 last:border-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-700">{s.subject}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-gray-800">{s.marks}/{s.total}</span>
                      <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-bold ${
                        s.grade.startsWith('A') ? 'bg-emerald-100 text-emerald-600' : s.grade.startsWith('B') ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'
                      }`}>{s.grade}</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                    <div className={`h-1.5 rounded-full ${s.marks/s.total >= 0.8 ? 'bg-emerald-500' : s.marks/s.total >= 0.6 ? 'bg-blue-500' : 'bg-amber-500'}`} style={{ width: `${(s.marks/s.total)*100}%` }} />
                  </div>
                  <div className="flex justify-between mt-0.5">
                    <span className="text-[7px] text-gray-400">Class avg: {s.classAvg}</span>
                    <span className={`text-[7px] font-bold ${s.marks > s.classAvg ? 'text-emerald-600' : 'text-red-500'}`}>{s.marks > s.classAvg ? `+${s.marks - s.classAvg} above` : `${s.classAvg - s.marks} below`}</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full py-2.5 bg-blue-600 text-white text-[11px] font-bold rounded-xl flex items-center justify-center gap-1">
              &#128196; Download Report Card
            </button>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5">
              <p className="text-[10px] font-bold text-emerald-800">Teacher&apos;s Remark</p>
              <p className="text-[8px] text-emerald-700 mt-0.5">{exam.remarks}</p>
            </div>
          </MobileFrame>

          {/* Screen 2: Exam Schedule */}
          <MobileFrame title="Exam Schedule" theme={theme}>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-2.5 text-center">
              <p className="text-[10px] font-bold text-blue-800">Upcoming: {child.id === 'child1' ? 'Pre-Board Examination' : 'Unit Test 3'}</p>
              <p className="text-[8px] text-blue-600 mt-0.5">Starting March 2026</p>
            </div>

            <div className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-100">
              <p className="text-[10px] font-bold text-gray-800 mb-2">Exam Timetable</p>
              {[
                { date: 'Mar 15', day: 'Mon', subject: 'Mathematics', time: '10:00 AM', venue: 'Hall A' },
                { date: 'Mar 18', day: 'Thu', subject: 'Science', time: '10:00 AM', venue: 'Hall B' },
                { date: 'Mar 20', day: 'Sat', subject: 'English', time: '10:00 AM', venue: 'Hall A' },
                { date: 'Mar 22', day: 'Mon', subject: 'Hindi', time: '10:00 AM', venue: 'Hall B' },
                { date: 'Mar 25', day: 'Thu', subject: 'Social Studies', time: '10:00 AM', venue: 'Hall A' },
              ].map((ex, i) => (
                <div key={i} className="flex items-center gap-2 py-2 border-b border-gray-50 last:border-0">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-center py-0.5">
                    <p className="text-[10px] font-bold text-blue-800">{ex.date.split(' ')[1]}</p>
                    <p className="text-[7px] text-blue-600">{ex.day}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-gray-800">{ex.subject}</p>
                    <p className="text-[8px] text-gray-500">{ex.time} &bull; {ex.venue}</p>
                  </div>
                  <span className="text-[7px] px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded-full font-bold">{ex.date}</span>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-100 text-center">
              <p className="text-[10px] font-bold text-gray-800">Days until exam</p>
              <p className="text-2xl font-bold text-blue-600 mt-0.5">13</p>
              <p className="text-[8px] text-gray-500">Starting Mar 15, 2026</p>
            </div>

            <button className="w-full py-2.5 bg-blue-600 text-white text-[11px] font-bold rounded-xl flex items-center justify-center gap-1">
              &#128197; Add to Calendar
            </button>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-2.5 flex items-center gap-2">
              <span className="text-blue-500 text-sm">&#128276;</span>
              <div className="flex-1"><p className="text-[10px] font-bold text-blue-800">Exam Reminders Active</p><p className="text-[8px] text-blue-600">Get notified 1 day before each exam</p></div>
            </div>
          </MobileFrame>
        </div>
      } />

    </div>
  );
}
