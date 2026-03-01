'use client';

import React, { useState } from 'react';
import { TabBar, SearchBar, MobileFrame, MobilePreviewToggle } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  Plus, X, Search, Eye, Edit, Send, Notebook, Info, Bell,
  Calendar, Clock, CheckCircle, Users, BookOpen, ChevronDown, ChevronUp,
} from 'lucide-react';

// ─── MOCK DATA ──────────────────────────────────────

const teacherProfile = {
  classes: ['10-A', '10-B', '9-A', '9-B', '8-A', '6-A'],
};

const diaryEntries = [
  { id: 'D001', date: '12 Feb 2026', class: '10-A', subject: 'Mathematics', message: 'Completed Ch 7 Coordinate Geometry. Homework assigned — Exercise 7.2, Q1-Q10. Students must bring graph sheets tomorrow.', readCount: 32, totalParents: 35 },
  { id: 'D002', date: '12 Feb 2026', class: '9-A', subject: 'Science', message: 'Light & Reflection — completed ray diagrams. Lab practical on mirrors next class. Students must bring lab coats.', readCount: 30, totalParents: 35 },
  { id: 'D003', date: '11 Feb 2026', class: '10-B', subject: 'Mathematics', message: 'Revised Quadratic Equations. Unit Test 3 on 15 Feb — syllabus: Ch 4 & Ch 5.', readCount: 38, totalParents: 40 },
  { id: 'D004', date: '11 Feb 2026', class: '6-A', subject: 'Mathematics', message: 'Fractions & Decimals practice. Weak students to attend extra class on Saturday.', readCount: 28, totalParents: 34 },
  { id: 'D005', date: '10 Feb 2026', class: '9-B', subject: 'Science', message: 'Chemical Reactions — completed balancing equations. Lab report due Friday.', readCount: 33, totalParents: 36 },
  { id: 'D006', date: '10 Feb 2026', class: '8-A', subject: 'Mathematics', message: 'Linear Equations practice complete. Chapter test next Monday.', readCount: 35, totalParents: 35 },
];

// ─── PTM MOCK DATA ──────────────────────────────────
const myPtmSlots = [
  { time: '09:00 - 09:10', student: 'Aarav Patel', class: '10-A', parent: 'Rajesh Patel', status: 'Scheduled' as string, notes: '' },
  { time: '09:10 - 09:20', student: 'Siya Sharma', class: '10-A', parent: 'Pooja Sharma', status: 'Scheduled' as string, notes: '' },
  { time: '09:20 - 09:30', student: 'Ishita Gupta', class: '10-A', parent: 'Neha Gupta', status: 'Scheduled' as string, notes: '' },
  { time: '09:30 - 09:40', student: 'Ananya Verma', class: '10-A', parent: 'Sunita Verma', status: 'Completed' as string, notes: 'Strong in Algebra. Needs Geometry focus. Suggest extra worksheets.' },
  { time: '10:00 - 10:10', student: 'Rohan Mehta', class: '10-B', parent: 'Ravi Mehta', status: 'Scheduled' as string, notes: '' },
  { time: '10:10 - 10:20', student: 'Kabir Joshi', class: '10-B', parent: 'Meera Joshi', status: 'Completed' as string, notes: 'Good progress. Encourage Science Fair participation.' },
  { time: '10:20 - 10:30', student: 'Diya Reddy', class: '9-A', parent: 'Sunita Reddy', status: 'Scheduled' as string, notes: '' },
  { time: '10:30 - 10:40', student: 'Vivaan Singh', class: '9-A', parent: 'Priya Singh', status: 'Cancelled' as string, notes: '' },
];

export default function DiaryModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All Entries');
  const [showCreate, setShowCreate] = useState(false);
  const [showPtmNotes, setShowPtmNotes] = useState<number | null>(null);
  const [expandedPtmSlot, setExpandedPtmSlot] = useState<number | null>(null);

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
      <TabBar tabs={['All Entries', 'Today', 'This Week', 'PTM']} active={tab} onChange={setTab} theme={theme} />

      {/* ── MOBILE APP PREVIEW ── */}
      <MobilePreviewToggle
        theme={theme}
        mobileContent={
          <MobileFrame title="Class Diary" theme={theme}>
            {/* Pull to refresh */}
            <div className="flex items-center justify-center py-1">
              <div className="flex items-center gap-1 text-[9px] text-gray-400">
                <span>&#8595;</span> Pull to refresh
              </div>
            </div>

            {/* Quick create card */}
            <div className="bg-white rounded-xl border border-gray-100 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-800">New Diary Entry</span>
                <div className="flex gap-1">
                  <select className="text-[9px] font-bold text-gray-600 bg-gray-100 rounded-lg px-2 py-1 border-none outline-none">
                    {teacherProfile.classes.map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Voice-to-text input area */}
              <div className="relative">
                <textarea
                  rows={3}
                  placeholder="Type or tap mic to dictate..."
                  className="w-full px-3 py-2 pr-10 bg-gray-50 rounded-xl text-[10px] border border-gray-200 resize-none outline-none"
                />
                {/* Mic icon */}
                <button className="absolute right-2 bottom-2 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center shadow-sm" title="Voice to text">
                  <span className="text-white text-xs">&#127908;</span>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[9px] text-gray-400">Subject: Mathematics (auto-filled)</span>
                <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-[10px] font-bold">
                  Publish
                </button>
              </div>
            </div>

            {/* Today's entries */}
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[10px] font-bold text-gray-700">Today</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {diaryEntries.slice(0, 3).map(d => {
              const pendingCount = d.totalParents - d.readCount;
              return (
                <div key={d.id} className="bg-white rounded-xl border border-gray-100 p-2.5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-lg bg-indigo-500 flex items-center justify-center text-white text-[9px]">&#128214;</div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-800">Class {d.class} &mdash; {d.subject}</p>
                        <p className="text-[8px] text-gray-400">{d.date}</p>
                      </div>
                    </div>
                    {/* Parent read status dots */}
                    <div className="flex items-center gap-1">
                      <div className="flex -space-x-0.5">
                        {Array.from({ length: Math.min(d.readCount, 5) }).map((_, i) => (
                          <div key={i} className="w-2 h-2 rounded-full bg-emerald-500 border border-white" />
                        ))}
                        {pendingCount > 0 && Array.from({ length: Math.min(pendingCount, 3) }).map((_, i) => (
                          <div key={i} className="w-2 h-2 rounded-full bg-gray-300 border border-white" />
                        ))}
                      </div>
                      <span className="text-[8px] text-gray-500">{d.readCount}/{d.totalParents}</span>
                    </div>
                  </div>

                  <p className="text-[9px] text-gray-600 leading-relaxed line-clamp-2">{d.message}</p>

                  {/* Send reminder button */}
                  {pendingCount > 0 && (
                    <button className="flex items-center gap-1 px-2 py-1 bg-amber-50 border border-amber-200 rounded-lg text-[9px] font-bold text-amber-700 w-full justify-center">
                      <span>&#128276;</span> Send Reminder to {pendingCount} parents
                    </button>
                  )}
                </div>
              );
            })}

            {/* Older entries hint */}
            <div className="text-center py-1">
              <span className="text-[9px] text-gray-400">&#8593; Scroll for older entries</span>
            </div>
          </MobileFrame>
        }
      />

      {/* Parent Acknowledgement Info Banner */}
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 border border-blue-200">
        <Info size={14} className="text-blue-500" />
        <p className="text-xs text-blue-700 font-medium">
          Parents acknowledge diary entries via mobile app. Unread entries trigger auto-reminders after 24 hours
        </p>
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-bold ml-auto">Mobile</span>
      </div>

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
      {tab !== 'PTM' && (
      <div className="space-y-3">
        {diaryEntries
          .filter(d => {
            if (tab === 'Today') return d.date === '12 Feb 2026';
            if (tab === 'This Week') return ['10 Feb 2026', '11 Feb 2026', '12 Feb 2026'].includes(d.date);
            return true;
          })
          .map(d => {
            const allRead = d.readCount === d.totalParents;
            const pendingCount = d.totalParents - d.readCount;
            return (
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
                  <div className="flex items-center gap-2">
                    {/* Parent Read Status */}
                    <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg ${allRead ? 'bg-emerald-50 border border-emerald-200' : 'bg-amber-50 border border-amber-200'}`}>
                      <span className="text-[11px]">{allRead ? '\u2705' : '\u23F3'}</span>
                      <span className={`text-[10px] font-bold ${allRead ? 'text-emerald-700' : 'text-amber-700'}`}>
                        {allRead ? 'Read' : 'Read'} ({d.readCount}/{d.totalParents})
                      </span>
                      {pendingCount > 0 && (
                        <span className="text-[10px] text-amber-600">| Pending: {pendingCount}</span>
                      )}
                    </div>
                    {pendingCount > 0 && (
                      <button
                        onClick={() => alert(`Reminder sent to ${pendingCount} parents (Blueprint demo)`)}
                        className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-amber-100 text-amber-700 text-[10px] font-bold"
                      >
                        <Bell size={10} /> Send Reminder
                      </button>
                    )}
                    <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Edit size={12} className={theme.iconColor} /></button>
                    <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
                  </div>
                </div>
                <p className={`text-xs ${theme.iconColor} leading-relaxed`}>{d.message}</p>
              </div>
            );
          })}
      </div>
      )}

      {/* ── PTM Tab ── */}
      {tab === 'PTM' && (
        <div className="space-y-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex items-center gap-3 shadow-sm`}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-500 text-white shadow-sm"><Calendar size={18} /></div>
              <div><p className={`text-lg font-bold ${theme.highlight}`}>{myPtmSlots.length}</p><p className={`text-xs ${theme.iconColor}`}>Total Slots Today</p></div>
            </div>
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex items-center gap-3 shadow-sm`}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-500 text-white shadow-sm"><CheckCircle size={18} /></div>
              <div><p className={`text-lg font-bold ${theme.highlight}`}>{myPtmSlots.filter(s => s.status === 'Completed').length}</p><p className={`text-xs ${theme.iconColor}`}>Completed</p></div>
            </div>
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex items-center gap-3 shadow-sm`}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-amber-500 text-white shadow-sm"><Clock size={18} /></div>
              <div><p className={`text-lg font-bold ${theme.highlight}`}>{myPtmSlots.filter(s => s.status === 'Scheduled').length}</p><p className={`text-xs ${theme.iconColor}`}>Remaining</p></div>
            </div>
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex items-center gap-3 shadow-sm`}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-red-500 text-white shadow-sm"><X size={18} /></div>
              <div><p className={`text-lg font-bold ${theme.highlight}`}>{myPtmSlots.filter(s => s.status === 'Cancelled').length}</p><p className={`text-xs ${theme.iconColor}`}>Cancelled</p></div>
            </div>
          </div>

          {/* PTM Info Banner */}
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 border border-blue-200">
            <Calendar size={14} className="text-blue-500" />
            <p className="text-xs text-blue-700 font-medium">
              Term 1 PTM | 05 Mar 2026 | 09:00 AM - 01:00 PM | School Campus
            </p>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-bold ml-auto">Today</span>
          </div>

          {/* My PTM Slots */}
          <div className="space-y-2">
            {myPtmSlots.map((slot, idx) => {
              const slotColor = slot.status === 'Completed' ? 'border-l-emerald-500' : slot.status === 'Cancelled' ? 'border-l-red-400' : 'border-l-blue-500';
              return (
                <div key={idx} className={`${theme.cardBg} rounded-2xl border ${theme.border} border-l-4 ${slotColor} overflow-hidden`}>
                  <div
                    className="flex items-center gap-3 p-4 cursor-pointer"
                    onClick={() => setExpandedPtmSlot(expandedPtmSlot === idx ? null : idx)}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${slot.status === 'Completed' ? 'bg-emerald-500' : slot.status === 'Cancelled' ? 'bg-red-400' : 'bg-blue-500'}`}>
                      {slot.status === 'Completed' ? <CheckCircle size={14} /> : slot.status === 'Cancelled' ? <X size={14} /> : <Clock size={14} />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`font-mono text-xs font-bold ${theme.primaryText}`}>{slot.time}</span>
                        <span className={`text-xs font-bold ${theme.highlight}`}>{slot.student}</span>
                        <span className={`text-[10px] ${theme.iconColor}`}>({slot.class})</span>
                      </div>
                      <p className={`text-[10px] ${theme.iconColor}`}>Parent: {slot.parent}</p>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      slot.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                      slot.status === 'Cancelled' ? 'bg-red-100 text-red-600' :
                      'bg-blue-100 text-blue-700'
                    }`}>{slot.status}</span>
                    {expandedPtmSlot === idx ? <ChevronUp size={14} className={theme.iconColor} /> : <ChevronDown size={14} className={theme.iconColor} />}
                  </div>

                  {/* Expanded: Notes section */}
                  {expandedPtmSlot === idx && (
                    <div className={`px-4 pb-4 border-t ${theme.border} pt-3 space-y-3`}>
                      {slot.notes ? (
                        <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
                          <p className={`text-[10px] ${theme.iconColor} uppercase font-bold mb-1`}>Meeting Notes</p>
                          <p className={`text-xs ${theme.highlight} leading-relaxed`}>{slot.notes}</p>
                        </div>
                      ) : (
                        <div className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
                          <p className={`text-[10px] ${theme.iconColor}`}>{slot.status === 'Cancelled' ? 'Slot was cancelled' : 'No notes added yet'}</p>
                        </div>
                      )}
                      {slot.status !== 'Cancelled' && (
                        <div className="space-y-2">
                          <div>
                            <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>
                              {slot.notes ? 'Update Notes' : 'Add Meeting Notes'}
                            </label>
                            <textarea
                              rows={3}
                              placeholder="Discussion summary, observations, recommendations..."
                              className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs outline-none resize-none`}
                              defaultValue={slot.notes}
                            />
                          </div>
                          <div>
                            <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Action Items</label>
                            <textarea
                              rows={2}
                              placeholder="- Action item 1&#10;- Action item 2"
                              className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs outline-none resize-none`}
                            />
                          </div>
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => { alert('Meeting notes saved! (Blueprint demo)'); setExpandedPtmSlot(null); }}
                              className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold flex items-center gap-1`}
                            >
                              <BookOpen size={12} /> Save Notes
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
