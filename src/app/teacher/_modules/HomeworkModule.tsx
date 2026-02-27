'use client';

import React, { useState } from 'react';
import { StatCard, TabBar, StatusBadge, DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  FileText, Plus, X, Eye, Edit, Send, Upload, CheckCircle
} from 'lucide-react';

// ─── MOCK DATA ──────────────────────────────────────

const teacherProfile = {
  classes: ['10-A', '10-B', '9-A', '9-B', '8-A', '6-A'],
};

const homeworkList = [
  { id: 'HW001', title: 'Ch 7 — Coordinate Geometry Exercise', class: '10-A', subject: 'Mathematics', assigned: '08 Feb 2026', due: '12 Feb 2026', status: 'Assigned', submitted: 28, total: 42 },
  { id: 'HW002', title: 'Ch 5 — Quadratic Equations Worksheet', class: '10-B', subject: 'Mathematics', assigned: '06 Feb 2026', due: '10 Feb 2026', status: 'Graded', submitted: 40, total: 40 },
  { id: 'HW003', title: 'Ch 4 — Light & Reflection Worksheet', class: '9-A', subject: 'Science', assigned: '07 Feb 2026', due: '11 Feb 2026', status: 'Submitted', submitted: 35, total: 38 },
  { id: 'HW004', title: 'Ch 6 — Chemical Reactions Lab Report', class: '9-B', subject: 'Science', assigned: '05 Feb 2026', due: '09 Feb 2026', status: 'Graded', submitted: 36, total: 36 },
  { id: 'HW005', title: 'Ch 2 — Fractions & Decimals', class: '6-A', subject: 'Mathematics', assigned: '09 Feb 2026', due: '13 Feb 2026', status: 'Assigned', submitted: 10, total: 34 },
  { id: 'HW006', title: 'Ch 3 — Linear Equations Practice', class: '8-A', subject: 'Mathematics', assigned: '04 Feb 2026', due: '08 Feb 2026', status: 'Graded', submitted: 34, total: 35 },
  { id: 'HW007', title: 'Ch 8 — Trigonometry Introduction', class: '10-A', subject: 'Mathematics', assigned: '10 Feb 2026', due: '14 Feb 2026', status: 'Assigned', submitted: 5, total: 42 },
];

export default function HomeworkModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All Homework');
  const [showCreate, setShowCreate] = useState(false);

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
      <TabBar tabs={['All Homework', 'Assigned', 'Submitted', 'Graded']} active={tab} onChange={setTab} theme={theme} />

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
          <div className="flex gap-2 justify-end">
            <button onClick={() => setShowCreate(false)} className={`px-4 py-2 rounded-xl ${theme.secondaryBg} text-sm font-bold ${theme.iconColor}`}>Cancel</button>
            <button className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Send size={14} /> Assign</button>
          </div>
        </div>
      )}

      {/* Homework Table */}
      <DataTable
        headers={['ID', 'Title', 'Class', 'Assigned', 'Due', 'Submissions', 'Status', '']}
        rows={homeworkList
          .filter(h => tab === 'All Homework' || h.status === tab.replace('ed', 'ed'))
          .map(h => [
            <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{h.id}</span>,
            <span key="title" className={`font-bold ${theme.highlight} text-xs`}>{h.title}</span>,
            <span key="class" className={theme.iconColor}>{h.class}</span>,
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
    </div>
  );
}
