'use client';
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

export default function RemarkBankConfigModule({ theme }: { theme: Theme }) {
  // ─── Moderation Policy ───
  const [requireModeration, setRequireModeration] = useState(true);
  const [allowEditAfterPublish, setAllowEditAfterPublish] = useState(false);
  const [remarkTypesEnabled] = useState(['Common', 'Subject-wise', 'Exam-wise']);

  // ─── Shared Remark Bank ───
  const [remarks] = useState([
    { text: 'Shows excellent participation in class discussions', category: 'Academic', type: 'Positive', createdBy: 'System' },
    { text: 'Needs to improve focus during lectures', category: 'Academic', type: 'Needs Improvement', createdBy: 'System' },
    { text: 'Consistently completes homework on time', category: 'Academic', type: 'Positive', createdBy: 'Mrs. Iyer' },
    { text: 'Demonstrates good leadership qualities', category: 'Behavioral', type: 'Positive', createdBy: 'System' },
    { text: 'Needs to work on punctuality', category: 'Behavioral', type: 'Needs Improvement', createdBy: 'System' },
    { text: 'Irregular attendance — parents have been notified', category: 'Attendance', type: 'Alert', createdBy: 'System' },
    { text: 'Active participant in inter-school competitions', category: 'Co-curricular', type: 'Positive', createdBy: 'Mr. Sharma' },
    { text: 'Outstanding performance in science exhibition', category: 'Co-curricular', type: 'Positive', createdBy: 'Dr. Rao' },
    { text: 'Shows improvement in handwriting and presentation', category: 'Academic', type: 'Positive', createdBy: 'System' },
    { text: 'Respectful towards peers and teachers', category: 'Behavioral', type: 'Positive', createdBy: 'System' },
  ]);

  // ─── Submission Deadlines ───
  const [deadlines] = useState([
    { exam: 'Mid-Term 1', deadline: 'Feb 28, 2026', status: 'Active' },
    { exam: 'Final Exam', deadline: 'Apr 15, 2026', status: 'Upcoming' },
    { exam: 'Unit Test 3', deadline: 'Mar 20, 2026', status: 'Upcoming' },
  ]);

  return (
    <div className="space-y-4">
      <ModuleHeader title="Remark Bank Configuration" subtitle="Manage remark templates, moderation policies, and submission deadlines" theme={theme} />

      {/* ─── Remark Moderation Policy ─── */}
      <SectionCard title="Remark Moderation Policy" subtitle="Control how remarks are reviewed before parents see them" theme={theme}>
        <div className="space-y-2">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Require admin moderation before parent visibility</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Remarks go through admin review before being visible to parents</p>
            </div>
            <SSAToggle on={requireModeration} onChange={() => setRequireModeration(!requireModeration)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Allow teachers to edit after publishing</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Teachers can modify their remarks even after they are published</p>
            </div>
            <SSAToggle on={allowEditAfterPublish} onChange={() => setAllowEditAfterPublish(!allowEditAfterPublish)} theme={theme} />
          </div>
          <div className={`p-2.5 rounded-xl ${theme.accentBg} border ${theme.border}`}>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Remark types enabled</p>
            <div className="flex gap-2">
              {remarkTypesEnabled.map(t => (
                <span key={t} className={`px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700`}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ─── Shared Remark Bank ─── */}
      <SectionCard title="Shared Remark Bank" subtitle="Pre-defined remark templates available to all teachers" theme={theme}>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Remark Text', 'Category', 'Type', 'Created By'].map(h => (
                <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {remarks.map((r, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className={`px-3 py-2 ${theme.highlight} max-w-xs`}>{r.text}</td>
                  <td className="px-3 py-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      r.category === 'Academic' ? 'bg-blue-100 text-blue-700' :
                      r.category === 'Behavioral' ? 'bg-purple-100 text-purple-700' :
                      r.category === 'Attendance' ? 'bg-amber-100 text-amber-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>{r.category}</span>
                  </td>
                  <td className="px-3 py-2">
                    <span className={`text-[10px] font-bold ${
                      r.type === 'Positive' ? 'text-emerald-600' :
                      r.type === 'Alert' ? 'text-red-600' :
                      'text-amber-600'
                    }`}>{r.type}</span>
                  </td>
                  <td className={`px-3 py-2 ${theme.iconColor}`}>{r.createdBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className={`flex items-center gap-1.5 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl border ${theme.border}`}>
          <Plus size={12} /> Add Remark
        </button>
      </SectionCard>

      {/* ─── Remark Submission Deadlines ─── */}
      <SectionCard title="Remark Submission Deadlines" subtitle="Deadlines for teachers to submit remarks per exam or term" theme={theme}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Exam / Term', 'Deadline', 'Status'].map(h => (
                <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {deadlines.map((d, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{d.exam}</td>
                  <td className={`px-3 py-2 ${theme.iconColor}`}>{d.deadline}</td>
                  <td className="px-3 py-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      d.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                    }`}>{d.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
