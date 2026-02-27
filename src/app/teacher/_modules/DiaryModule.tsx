'use client';

import React, { useState } from 'react';
import { TabBar, SearchBar } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  Plus, X, Search, Eye, Edit, Send, Notebook
} from 'lucide-react';

// ─── MOCK DATA ──────────────────────────────────────

const teacherProfile = {
  classes: ['10-A', '10-B', '9-A', '9-B', '8-A', '6-A'],
};

const diaryEntries = [
  { id: 'D001', date: '12 Feb 2026', class: '10-A', subject: 'Mathematics', message: 'Completed Ch 7 Coordinate Geometry. Homework assigned — Exercise 7.2, Q1-Q10. Students must bring graph sheets tomorrow.' },
  { id: 'D002', date: '12 Feb 2026', class: '9-A', subject: 'Science', message: 'Light & Reflection — completed ray diagrams. Lab practical on mirrors next class. Students must bring lab coats.' },
  { id: 'D003', date: '11 Feb 2026', class: '10-B', subject: 'Mathematics', message: 'Revised Quadratic Equations. Unit Test 3 on 15 Feb — syllabus: Ch 4 & Ch 5.' },
  { id: 'D004', date: '11 Feb 2026', class: '6-A', subject: 'Mathematics', message: 'Fractions & Decimals practice. Weak students to attend extra class on Saturday.' },
  { id: 'D005', date: '10 Feb 2026', class: '9-B', subject: 'Science', message: 'Chemical Reactions — completed balancing equations. Lab report due Friday.' },
  { id: 'D006', date: '10 Feb 2026', class: '8-A', subject: 'Mathematics', message: 'Linear Equations practice complete. Chapter test next Monday.' },
];

export default function DiaryModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All Entries');
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Class Diary</h1>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}
        >
          <Plus size={14} /> New Entry
        </button>
      </div>
      <TabBar tabs={['All Entries', 'Today', 'This Week']} active={tab} onChange={setTab} theme={theme} />

      <div className="flex gap-3">
        <SearchBar placeholder="Search diary entries..." theme={theme} icon={Search} />
        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg}`}>
          <span className={`text-xs font-bold ${theme.iconColor}`}>Class:</span>
          <select className={`text-xs font-bold ${theme.highlight} bg-transparent outline-none`}>
            <option>All Classes</option>
            {teacherProfile.classes.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Create Entry Form */}
      {showCreate && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-3`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>New Diary Entry</h3>
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
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Date</label>
              <input type="date" defaultValue="2026-02-12" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`} />
            </div>
          </div>
          <div>
            <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Message / Notes</label>
            <textarea
              rows={3}
              placeholder="Today's classwork, homework, notes for parents..."
              className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none resize-none`}
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={() => setShowCreate(false)} className={`px-4 py-2 rounded-xl ${theme.secondaryBg} text-sm font-bold ${theme.iconColor}`}>Cancel</button>
            <button className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Send size={14} /> Publish</button>
          </div>
        </div>
      )}

      {/* Diary Entries */}
      <div className="space-y-3">
        {diaryEntries
          .filter(d => {
            if (tab === 'Today') return d.date === '12 Feb 2026';
            if (tab === 'This Week') return ['10 Feb 2026', '11 Feb 2026', '12 Feb 2026'].includes(d.date);
            return true;
          })
          .map(d => (
          <div key={d.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white">
                  <Notebook size={18} />
                </div>
                <div>
                  <p className={`text-sm font-bold ${theme.highlight}`}>Class {d.class} — {d.subject}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{d.date} | ID: {d.id}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Edit size={12} className={theme.iconColor} /></button>
                <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
              </div>
            </div>
            <p className={`text-xs ${theme.iconColor} leading-relaxed`}>{d.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
