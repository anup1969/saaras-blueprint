'use client';
import React, { useState } from 'react';
import { SSAToggle, SectionCard, ModuleHeader, InputField } from '../_helpers/components';
import { MasterPermissionGrid, BulkImportWizard } from '@/components/shared';
import type { Theme } from '../_helpers/types';

export default function LMSConfigModule({ theme }: { theme: Theme }) {
  // ─── LMS Settings ───
  const [enableLMS, setEnableLMS] = useState(true);
  const [allowUploads, setAllowUploads] = useState(true);
  const [enableQuizBuilder, setEnableQuizBuilder] = useState(true);
  const [maxUploadSize, setMaxUploadSize] = useState('50');

  // ─── Learning Paths ───
  const [enableLearningPaths, setEnableLearningPaths] = useState(true);
  const [learningPaths] = useState([
    { name: 'Class 10 Board Prep', subjects: 'Math, Science, English', assignedTo: 'Grade 10 (All)', progress: '45%' },
    { name: 'Remedial Math', subjects: 'Mathematics', assignedTo: '15 students (Grade 8-9)', progress: '30%' },
    { name: 'Science Olympiad Prep', subjects: 'Physics, Chemistry, Biology', assignedTo: '12 students (Grade 9-11)', progress: '60%' },
  ]);

  // ─── Content Library ───
  const [contentStats] = useState({ total: 234, videos: 56, quizzes: 28, documents: 150 });
  const [bySubject] = useState([
    { subject: 'Mathematics', count: 52 },
    { subject: 'Science', count: 48 },
    { subject: 'English', count: 38 },
    { subject: 'Social Science', count: 32 },
    { subject: 'Hindi', count: 28 },
    { subject: 'Computer/IT', count: 22 },
    { subject: 'Others', count: 14 },
  ]);

  // ─── Student Engagement ───
  const [trackVideoWatch, setTrackVideoWatch] = useState(true);
  const [trackQuizScores, setTrackQuizScores] = useState(true);
  const [engagementReports, setEngagementReports] = useState(true);

  // ─── Certificates ───
  const [autoCertificates, setAutoCertificates] = useState(false);

  // ─── AI Features ───
  const [aiRecommendations, setAiRecommendations] = useState(false);
  const [adaptiveQuiz, setAdaptiveQuiz] = useState(false);

  return (
    <div className="space-y-4">
      <ModuleHeader title="LMS / E-Learning Configuration" subtitle="Learning management system, content library, and engagement tracking" theme={theme} />

      {/* ─── LMS Settings ─── */}
      <SectionCard title="LMS Settings" subtitle="Core LMS module toggles and upload limits" theme={theme}>
        <div className="space-y-2">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Enable LMS Module</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Activate the learning management system for the school</p>
            </div>
            <SSAToggle on={enableLMS} onChange={() => setEnableLMS(!enableLMS)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Allow teacher content uploads (PDF, PPTX, Video)</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Teachers can upload study materials directly</p>
            </div>
            <SSAToggle on={allowUploads} onChange={() => setAllowUploads(!allowUploads)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Enable Quiz Builder</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Teachers can create MCQ and subjective quizzes</p>
            </div>
            <SSAToggle on={enableQuizBuilder} onChange={() => setEnableQuizBuilder(!enableQuizBuilder)} theme={theme} />
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max Upload Size (MB)</p>
            <InputField value={maxUploadSize} onChange={setMaxUploadSize} theme={theme} type="number" />
          </div>
        </div>
      </SectionCard>

      {/* ─── Learning Paths ─── */}
      <SectionCard title="Learning Paths" subtitle="Structured learning journeys for students" theme={theme}>
        <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg} mb-3`}>
          <div>
            <p className={`text-xs font-bold ${theme.highlight}`}>Enable Learning Paths</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Create guided learning sequences with milestones</p>
          </div>
          <SSAToggle on={enableLearningPaths} onChange={() => setEnableLearningPaths(!enableLearningPaths)} theme={theme} />
        </div>
        {enableLearningPaths && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead><tr className={theme.secondaryBg}>
                {['Path Name', 'Subjects', 'Assigned To', 'Progress'].map(h => (
                  <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor}`}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {learningPaths.map((lp, i) => (
                  <tr key={i} className={`border-t ${theme.border}`}>
                    <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{lp.name}</td>
                    <td className={`px-3 py-2 ${theme.iconColor}`}>{lp.subjects}</td>
                    <td className={`px-3 py-2 ${theme.iconColor}`}>{lp.assignedTo}</td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <div className={`flex-1 h-2 rounded-full bg-gray-200`}>
                          <div className={`h-2 rounded-full ${theme.primary}`} style={{ width: lp.progress }} />
                        </div>
                        <span className={`text-[10px] font-bold ${theme.highlight}`}>{lp.progress}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>

      {/* ─── Content Library Overview ─── */}
      <SectionCard title="Content Library Overview" subtitle="Summary of uploaded learning materials" theme={theme}>
        <div className="grid grid-cols-4 gap-3 mb-3">
          {[
            { label: 'Total Materials', value: contentStats.total, color: 'text-blue-600' },
            { label: 'Videos', value: contentStats.videos, color: 'text-purple-600' },
            { label: 'Quizzes', value: contentStats.quizzes, color: 'text-emerald-600' },
            { label: 'Documents', value: contentStats.documents, color: 'text-amber-600' },
          ].map((s, i) => (
            <div key={i} className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
              <p className={`text-[10px] ${theme.iconColor} mb-1`}>{s.label}</p>
              <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
        <div className={`p-3 rounded-xl ${theme.accentBg} border ${theme.border}`}>
          <p className={`text-[10px] font-bold ${theme.iconColor} mb-2 uppercase tracking-wide`}>By Subject</p>
          <div className="space-y-1.5">
            {bySubject.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className={`text-[10px] w-24 ${theme.highlight}`}>{s.subject}</span>
                <div className="flex-1 h-3 rounded-full bg-gray-200">
                  <div className={`h-3 rounded-full ${theme.primary}`} style={{ width: `${(s.count / contentStats.total) * 100}%` }} />
                </div>
                <span className={`text-[10px] font-bold ${theme.iconColor} w-6 text-right`}>{s.count}</span>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* ─── Student Engagement ─── */}
      <SectionCard title="Student Engagement" subtitle="Track how students interact with LMS content" theme={theme}>
        <div className="space-y-2">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Track video watch %</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Record how much of each video a student has watched</p>
            </div>
            <SSAToggle on={trackVideoWatch} onChange={() => setTrackVideoWatch(!trackVideoWatch)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Track quiz scores</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Record and analyze quiz performance over time</p>
            </div>
            <SSAToggle on={trackQuizScores} onChange={() => setTrackQuizScores(!trackQuizScores)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Generate engagement reports</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Auto-generate weekly student engagement summaries</p>
            </div>
            <SSAToggle on={engagementReports} onChange={() => setEngagementReports(!engagementReports)} theme={theme} />
          </div>
        </div>
      </SectionCard>

      {/* ─── Certificates ─── */}
      <SectionCard title="Certificates" subtitle="Auto-generate certificates for course completion" theme={theme}>
        <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg} mb-3`}>
          <div>
            <p className={`text-xs font-bold ${theme.highlight}`}>Auto-generate course completion certificates</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Students receive a certificate when they complete a learning path</p>
          </div>
          <SSAToggle on={autoCertificates} onChange={() => setAutoCertificates(!autoCertificates)} theme={theme} />
        </div>
        {autoCertificates && (
          <div className={`p-3 rounded-xl ${theme.accentBg} border ${theme.border}`}>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Template Preview</p>
            <div className={`h-24 rounded-lg ${theme.secondaryBg} flex items-center justify-center border-2 border-dashed ${theme.border}`}>
              <span className={`text-[10px] ${theme.iconColor}`}>Certificate of Completion — [Student Name] — [Course Name]</span>
            </div>
          </div>
        )}
      </SectionCard>

      {/* ─── AI Features ─── */}
      <SectionCard title="AI Features" subtitle="AI-powered learning enhancements (future phases)" theme={theme}>
        <div className="space-y-2">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex items-center gap-2">
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>AI Content Recommendations</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Suggest relevant content based on student performance</p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[9px] font-bold">Phase 2</span>
            </div>
            <SSAToggle on={aiRecommendations} onChange={() => setAiRecommendations(!aiRecommendations)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex items-center gap-2">
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Adaptive Quiz Difficulty</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Automatically adjust quiz difficulty based on student responses</p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[9px] font-bold">Phase 2</span>
            </div>
            <SSAToggle on={adaptiveQuiz} onChange={() => setAdaptiveQuiz(!adaptiveQuiz)} theme={theme} />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Role-Based Permissions" subtitle="Control who can view, create, edit, delete, import, and export" theme={theme}>
        <div className="space-y-4">
          <MasterPermissionGrid masterName="Course Categories" roles={['Super Admin', 'Principal', 'School Admin', 'Teacher', 'Accountant']} theme={theme} />
        </div>
      </SectionCard>

      <SectionCard title="Bulk Import" subtitle="Import data from Excel templates" theme={theme}>
        <BulkImportWizard entityName="Courses" templateFields={['Course Name', 'Category', 'Instructor', 'Duration', 'Target Class']} sampleData={[['Advanced Mathematics', 'STEM', 'Mr. Patel', '12 weeks', 'Grade 10']]} theme={theme} />
      </SectionCard>
    </div>
  );
}
