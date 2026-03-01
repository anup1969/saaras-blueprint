'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { StatCard, StatusBadge, TabBar, SearchBar, DataTable } from '@/components/shared';
import {
  Calendar, Users, Clock, CheckCircle, Plus, X, Eye, Edit, Download, Search,
  Star, BarChart3, MessageSquare, ClipboardList, BookOpen, ChevronDown, ChevronUp,
} from 'lucide-react';
import { FormField, InputField, SelectField, TextAreaField } from '../_components/FormHelpers';

// ── Mock Data ──
const ptmSchedules = [
  { id: 'PTM-001', title: 'Term 1 PTM', date: '05 Mar 2026', time: '09:00 AM - 01:00 PM', classes: 'All Classes', venue: 'School Campus', slotDuration: '10 min', status: 'Upcoming', totalSlots: 120, booked: 85, attendance: 0 },
  { id: 'PTM-002', title: 'Class 10 Board Prep PTM', date: '20 Feb 2026', time: '10:00 AM - 12:00 PM', classes: 'Class 10 (A, B, C)', venue: 'Auditorium', slotDuration: '15 min', status: 'Completed', totalSlots: 45, booked: 42, attendance: 38 },
  { id: 'PTM-003', title: 'Special PTM — At-risk Students', date: '15 Feb 2026', time: '02:00 PM - 04:00 PM', classes: 'Selected Students', venue: 'Conference Room', slotDuration: '20 min', status: 'Completed', totalSlots: 15, booked: 15, attendance: 12 },
];

const slotBookings = [
  { student: 'Aarav Patel', class: '10-A', parent: 'Rajesh Patel', teacher: 'Mrs. Sharma (Maths)', slot: '09:00 - 09:10', status: 'Booked' as string, attended: false, notes: '' },
  { student: 'Siya Sharma', class: '10-A', parent: 'Pooja Sharma', teacher: 'Mrs. Sharma (Maths)', slot: '09:10 - 09:20', status: 'Booked' as string, attended: false, notes: '' },
  { student: 'Rohan Desai', class: '10-B', parent: 'Anil Desai', teacher: 'Mr. Reddy (Science)', slot: '09:00 - 09:15', status: 'Booked' as string, attended: true, notes: 'Needs extra practice in Chemistry. Parents to ensure daily revision.' },
  { student: 'Ishita Gupta', class: '10-A', parent: 'Neha Gupta', teacher: "Ms. D'Souza (English)", slot: '09:20 - 09:30', status: 'No Show' as string, attended: false, notes: '' },
  { student: 'Kabir Joshi', class: '10-B', parent: 'Meera Joshi', teacher: 'Mr. Reddy (Science)', slot: '09:15 - 09:30', status: 'Booked' as string, attended: true, notes: 'Good progress. Encourage participation in Science Fair.' },
  { student: 'Ananya Verma', class: '10-A', parent: 'Sunita Verma', teacher: 'Mrs. Sharma (Maths)', slot: '09:20 - 09:30', status: 'Available' as string, attended: false, notes: '' },
  { student: 'Vivaan Mehta', class: '10-C', parent: 'Ravi Mehta', teacher: 'Mr. Patil (Hindi)', slot: '09:30 - 09:45', status: 'Booked' as string, attended: false, notes: '' },
];

const meetingNotes = [
  { student: 'Rohan Desai', class: '10-B', teacher: 'Mr. Reddy (Science)', slot: '09:00 - 09:15', notes: 'Needs extra practice in Chemistry. Parents to ensure daily revision. Suggest enrolling in after-school Chemistry lab sessions.', actionItems: ['Daily 30-min Chemistry revision', 'Attend Saturday lab sessions', 'Parent to check homework diary'], followUp: '15 Mar 2026' },
  { student: 'Kabir Joshi', class: '10-B', teacher: 'Mr. Reddy (Science)', slot: '09:15 - 09:30', notes: 'Good progress in Science. Active in class. Encourage participation in upcoming Science Fair. Potential for district-level competition.', actionItems: ['Register for Science Fair', 'Select project topic by next week'], followUp: '10 Mar 2026' },
  { student: 'Aarav Patel', class: '10-A', teacher: 'Mrs. Sharma (Maths)', slot: '09:00 - 09:10', notes: 'Strong in Algebra but weak in Geometry. Needs focused attention on Coordinate Geometry chapter. Parents to arrange tutor if needed.', actionItems: ['Extra Geometry worksheets weekly', 'Monitor test scores for improvement'], followUp: '20 Mar 2026' },
];

const feedbackData = {
  ratings: [
    { category: 'Teacher Availability', avg: 4.2, responses: 38 },
    { category: 'Meeting Usefulness', avg: 4.5, responses: 38 },
    { category: 'School Environment', avg: 4.0, responses: 38 },
    { category: 'Communication Clarity', avg: 4.3, responses: 38 },
  ],
  responseRate: 84,
  comments: [
    { text: 'Very helpful discussion about my child\'s progress. Teacher was well-prepared.', rating: 5 },
    { text: 'Waiting time was too long. Slot management could be better.', rating: 3 },
    { text: 'Excellent insights on how to improve at home. Will follow the suggestions.', rating: 5 },
    { text: 'Would appreciate longer slots for detailed discussion.', rating: 4 },
  ],
};

const statusStyle = (s: string) => {
  if (s === 'Upcoming') return 'bg-blue-100 text-blue-700';
  if (s === 'Completed') return 'bg-emerald-100 text-emerald-700';
  if (s === 'Cancelled') return 'bg-red-100 text-red-600';
  return 'bg-gray-100 text-gray-600';
};

const slotStatusStyle = (s: string) => {
  if (s === 'Booked') return 'bg-blue-100 text-blue-700';
  if (s === 'Available') return 'bg-emerald-100 text-emerald-700';
  if (s === 'No Show') return 'bg-red-100 text-red-600';
  return 'bg-gray-100 text-gray-600';
};

export default function PTMModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Schedules');
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [showNotesForm, setShowNotesForm] = useState<string | null>(null);
  const [expandedNote, setExpandedNote] = useState<string | null>(null);
  const [classFilter, setClassFilter] = useState('All');
  const [teacherFilter, setTeacherFilter] = useState('All');
  const [bookingWindowOpen, setBookingWindowOpen] = useState(false);

  const totalSlots = ptmSchedules.reduce((s, p) => s + p.totalSlots, 0);
  const totalBooked = ptmSchedules.reduce((s, p) => s + p.booked, 0);
  const bookingRate = Math.round((totalBooked / totalSlots) * 100);
  const completedPtms = ptmSchedules.filter(p => p.status === 'Completed');
  const avgAttendance = completedPtms.length > 0 ? Math.round(completedPtms.reduce((s, p) => s + (p.attendance / p.booked) * 100, 0) / completedPtms.length) : 0;

  const filteredSlots = slotBookings.filter(s =>
    (classFilter === 'All' || s.class === classFilter) &&
    (teacherFilter === 'All' || s.teacher === teacherFilter)
  );

  const teachers = [...new Set(slotBookings.map(s => s.teacher))];
  const classes = [...new Set(slotBookings.map(s => s.class))];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Parent-Teacher Meeting</h1>
        <button onClick={() => setShowScheduleForm(true)} className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}>
          <Plus size={14} /> Schedule New PTM
        </button>
      </div>
      <TabBar tabs={['Schedules', 'Slot Management', 'Meeting Notes', 'Feedback', 'Reports']} active={tab} onChange={setTab} theme={theme} />

      {/* ── Schedules Tab ── */}
      {tab === 'Schedules' && (
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <StatCard icon={Calendar} label="Upcoming PTMs" value={String(ptmSchedules.filter(p => p.status === 'Upcoming').length)} color="bg-blue-500" theme={theme} />
            <StatCard icon={ClipboardList} label="Total Slots" value={String(totalSlots)} color="bg-indigo-500" theme={theme} />
            <StatCard icon={Users} label="Booking Rate" value={`${bookingRate}%`} color="bg-emerald-500" theme={theme} />
            <StatCard icon={CheckCircle} label="Avg Attendance" value={`${avgAttendance}%`} color="bg-purple-500" theme={theme} />
          </div>

          <div className="space-y-3">
            {ptmSchedules.map(ptm => (
              <div key={ptm.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white`}>
                      <Calendar size={18} />
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${theme.highlight}`}>{ptm.title}</p>
                      <p className={`text-[10px] ${theme.iconColor}`}>{ptm.id} | {ptm.venue}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold ${statusStyle(ptm.status)}`}>{ptm.status}</span>
                </div>
                <div className="grid grid-cols-4 gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${theme.secondaryBg}`}>
                    <p className={`text-[10px] ${theme.iconColor}`}>Date</p>
                    <p className={`text-xs font-bold ${theme.highlight}`}>{ptm.date}</p>
                  </div>
                  <div className={`p-2 rounded-lg ${theme.secondaryBg}`}>
                    <p className={`text-[10px] ${theme.iconColor}`}>Time</p>
                    <p className={`text-xs font-bold ${theme.highlight}`}>{ptm.time}</p>
                  </div>
                  <div className={`p-2 rounded-lg ${theme.secondaryBg}`}>
                    <p className={`text-[10px] ${theme.iconColor}`}>Classes</p>
                    <p className={`text-xs font-bold ${theme.highlight}`}>{ptm.classes}</p>
                  </div>
                  <div className={`p-2 rounded-lg ${theme.secondaryBg}`}>
                    <p className={`text-[10px] ${theme.iconColor}`}>Slot Duration</p>
                    <p className={`text-xs font-bold ${theme.highlight}`}>{ptm.slotDuration}</p>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] ${theme.iconColor}`}>Booked: {ptm.booked} / {ptm.totalSlots} slots</span>
                    <span className={`text-[10px] font-bold ${theme.primaryText}`}>{Math.round((ptm.booked / ptm.totalSlots) * 100)}%</span>
                  </div>
                  <div className={`h-2 rounded-full ${theme.secondaryBg} overflow-hidden`}>
                    <div className={`h-full rounded-full ${theme.primary}`} style={{ width: `${(ptm.booked / ptm.totalSlots) * 100}%` }} />
                  </div>
                </div>
                {ptm.status === 'Completed' && (
                  <p className={`text-[10px] ${theme.iconColor} mt-2`}>Attendance: {ptm.attendance} / {ptm.booked} ({Math.round((ptm.attendance / ptm.booked) * 100)}%)</p>
                )}
                <div className="flex gap-2 mt-3">
                  <button className={`px-3 py-1.5 rounded-lg text-[10px] font-bold ${theme.secondaryBg} ${theme.highlight} ${theme.buttonHover}`}><Eye size={10} className="inline mr-1" />View Bookings</button>
                  {ptm.status === 'Upcoming' && (
                    <>
                      <button className={`px-3 py-1.5 rounded-lg text-[10px] font-bold ${theme.secondaryBg} ${theme.highlight} ${theme.buttonHover}`}><Edit size={10} className="inline mr-1" />Edit</button>
                      <button className="px-3 py-1.5 rounded-lg text-[10px] font-bold bg-red-50 text-red-600 hover:bg-red-100 transition-all">Cancel</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Slot Management Tab ── */}
      {tab === 'Slot Management' && (
        <div className="space-y-4">
          {/* Booking Window Toggle */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex items-center justify-between`}>
            <div>
              <p className={`text-sm font-bold ${theme.highlight}`}>Parent Booking Window</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Allow parents to book PTM slots via the parent portal</p>
            </div>
            <div className="flex items-center gap-3">
              {bookingWindowOpen && (
                <div className="flex items-center gap-2">
                  <input type="date" defaultValue="2026-03-01" className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px]`} />
                  <span className={`text-[10px] ${theme.iconColor}`}>to</span>
                  <input type="date" defaultValue="2026-03-04" className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px]`} />
                </div>
              )}
              <button
                onClick={() => setBookingWindowOpen(!bookingWindowOpen)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${bookingWindowOpen ? 'bg-emerald-500 text-white' : `${theme.secondaryBg} ${theme.highlight}`}`}
              >
                {bookingWindowOpen ? 'Window Open' : 'Open Booking Window'}
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <SearchBar placeholder="Search students..." theme={theme} icon={Search} />
            <select value={classFilter} onChange={e => setClassFilter(e.target.value)} className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
              <option value="All">All Classes</option>
              {classes.map(c => <option key={c}>{c}</option>)}
            </select>
            <select value={teacherFilter} onChange={e => setTeacherFilter(e.target.value)} className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
              <option value="All">All Teachers</option>
              {teachers.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>

          <DataTable
            headers={['Time Slot', 'Student', 'Class', 'Parent', 'Teacher', 'Status', 'Actions']}
            rows={filteredSlots.map((s, idx) => [
              <span key="slot" className={`font-mono text-xs ${theme.highlight}`}>{s.slot}</span>,
              <span key="student" className={`font-bold ${theme.highlight}`}>{s.student}</span>,
              <span key="class" className={theme.iconColor}>{s.class}</span>,
              <span key="parent" className={theme.iconColor}>{s.parent}</span>,
              <span key="teacher" className={theme.iconColor}>{s.teacher}</span>,
              <span key="status" className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${slotStatusStyle(s.status)}`}>{s.status}</span>,
              <div key="actions" className="flex gap-1">
                {s.status === 'Available' && (
                  <button className="px-2 py-1 rounded-lg bg-blue-100 text-blue-700 text-[10px] font-bold">Quick Book</button>
                )}
                {s.status === 'Booked' && (
                  <button className="px-2 py-1 rounded-lg bg-amber-100 text-amber-700 text-[10px] font-bold">Reschedule</button>
                )}
                {s.status === 'No Show' && (
                  <button className="px-2 py-1 rounded-lg bg-red-50 text-red-600 text-[10px] font-bold">Follow Up</button>
                )}
              </div>,
            ])}
            theme={theme}
          />
          <div className="flex gap-3">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-emerald-500" /><span className={`text-[10px] ${theme.iconColor}`}>Available</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-blue-500" /><span className={`text-[10px] ${theme.iconColor}`}>Booked</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500" /><span className={`text-[10px] ${theme.iconColor}`}>No Show</span></div>
          </div>
        </div>
      )}

      {/* ── Meeting Notes Tab ── */}
      {tab === 'Meeting Notes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className={`text-xs ${theme.iconColor}`}>{meetingNotes.length} meeting notes recorded</p>
            <button onClick={() => window.alert('Exporting all meeting notes as PDF... (Blueprint demo)')} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold ${theme.secondaryBg} ${theme.highlight} flex items-center gap-1`}><Download size={10} /> Export PDF</button>
          </div>
          {meetingNotes.map((n, idx) => (
            <div key={idx} className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden`}>
              <div className="flex items-center gap-3 p-4 cursor-pointer" onClick={() => setExpandedNote(expandedNote === n.student ? null : n.student)}>
                <div className={`w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white`}><BookOpen size={14} /></div>
                <div className="flex-1">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{n.student} ({n.class})</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{n.teacher} | {n.slot}</p>
                </div>
                <span className={`text-[10px] ${theme.iconColor}`}>Follow-up: {n.followUp}</span>
                {expandedNote === n.student ? <ChevronUp size={14} className={theme.iconColor} /> : <ChevronDown size={14} className={theme.iconColor} />}
              </div>
              {expandedNote === n.student && (
                <div className={`px-4 pb-4 border-t ${theme.border} space-y-3 pt-3`}>
                  <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
                    <p className={`text-[10px] ${theme.iconColor} uppercase font-bold mb-1`}>Notes</p>
                    <p className={`text-xs ${theme.highlight} leading-relaxed`}>{n.notes}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
                    <p className={`text-[10px] ${theme.iconColor} uppercase font-bold mb-1`}>Action Items</p>
                    <ul className="space-y-1">
                      {n.actionItems.map((a, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" />
                          <span className={`text-xs ${theme.highlight}`}>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Add Notes Form */}
          {showNotesForm && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowNotesForm(null)}>
              <div className={`${theme.cardBg} rounded-2xl border ${theme.border} shadow-2xl w-full max-w-md p-6 space-y-4`} onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between">
                  <h2 className={`text-lg font-bold ${theme.highlight}`}>Add Meeting Notes</h2>
                  <button onClick={() => setShowNotesForm(null)} className={`p-1.5 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
                </div>
                <FormField label="Notes" required theme={theme}>
                  <TextAreaField placeholder="Meeting discussion summary..." value="" onChange={() => {}} theme={theme} rows={4} />
                </FormField>
                <FormField label="Action Items (one per line)" theme={theme}>
                  <TextAreaField placeholder="- Action item 1&#10;- Action item 2" value="" onChange={() => {}} theme={theme} rows={3} />
                </FormField>
                <FormField label="Follow-up Date" theme={theme}>
                  <InputField type="date" value="" onChange={() => {}} theme={theme} />
                </FormField>
                <div className="flex gap-2">
                  <button onClick={() => setShowNotesForm(null)} className={`flex-1 py-2 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.highlight}`}>Cancel</button>
                  <button onClick={() => { window.alert('Meeting notes saved! (Blueprint demo)'); setShowNotesForm(null); }} className={`flex-1 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>Save Notes</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Feedback Tab ── */}
      {tab === 'Feedback' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Average Ratings */}
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
              <h3 className={`text-sm font-bold ${theme.highlight} mb-4`}>Average Ratings</h3>
              <div className="space-y-3">
                {feedbackData.ratings.map(r => (
                  <div key={r.category} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs ${theme.highlight}`}>{r.category}</span>
                      <div className="flex items-center gap-1">
                        <span className={`text-xs font-bold ${theme.primaryText}`}>{r.avg.toFixed(1)}</span>
                        <Star size={10} className="text-amber-500 fill-amber-500" />
                      </div>
                    </div>
                    <div className={`h-2 rounded-full ${theme.secondaryBg} overflow-hidden`}>
                      <div className="h-full rounded-full bg-amber-500" style={{ width: `${(r.avg / 5) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className={`mt-4 p-3 rounded-xl ${theme.secondaryBg} flex items-center justify-between`}>
                <span className={`text-xs ${theme.iconColor}`}>Response Rate</span>
                <span className={`text-sm font-bold ${theme.primaryText}`}>{feedbackData.responseRate}%</span>
              </div>
            </div>

            {/* Parent Comments */}
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
              <h3 className={`text-sm font-bold ${theme.highlight} mb-4`}>Parent Feedback</h3>
              <div className="space-y-3">
                {feedbackData.comments.map((c, i) => (
                  <div key={i} className={`p-3 rounded-xl ${theme.secondaryBg}`}>
                    <div className="flex items-center gap-1 mb-1">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} size={10} className={s < c.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'} />
                      ))}
                    </div>
                    <p className={`text-xs ${theme.iconColor} leading-relaxed italic`}>"{c.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feedback Form Preview */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Feedback Form Template (sent to parents post-PTM)</h3>
            <div className="grid grid-cols-2 gap-3">
              {['Teacher Availability', 'Meeting Usefulness', 'School Environment', 'Communication Clarity'].map(cat => (
                <div key={cat} className={`p-3 rounded-xl ${theme.secondaryBg}`}>
                  <p className={`text-xs font-bold ${theme.highlight} mb-2`}>{cat}</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} size={16} className="text-gray-300 cursor-pointer hover:text-amber-500 transition-colors" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Additional Comments</label>
              <textarea rows={2} placeholder="Share your feedback..." className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs resize-none`} />
            </div>
          </div>
        </div>
      )}

      {/* ── Reports Tab ── */}
      {tab === 'Reports' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Attendance by Class */}
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 size={14} className={theme.primaryText} />
                <h3 className={`text-sm font-bold ${theme.highlight}`}>PTM Attendance by Class</h3>
              </div>
              <div className="space-y-2">
                {[
                  { cls: 'Class 10-A', rate: 92 }, { cls: 'Class 10-B', rate: 85 },
                  { cls: 'Class 10-C', rate: 78 }, { cls: 'Class 9-A', rate: 88 },
                  { cls: 'Class 9-B', rate: 72 }, { cls: 'Class 8-A', rate: 90 },
                ].map(c => (
                  <div key={c.cls} className="flex items-center gap-3">
                    <span className={`text-xs ${theme.highlight} w-24`}>{c.cls}</span>
                    <div className={`flex-1 h-4 rounded-full ${theme.secondaryBg} overflow-hidden`}>
                      <div className={`h-full rounded-full ${c.rate >= 85 ? 'bg-emerald-500' : c.rate >= 75 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${c.rate}%` }} />
                    </div>
                    <span className={`text-xs font-bold ${theme.highlight} w-10 text-right`}>{c.rate}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* No-Show Analysis */}
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
              <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>No-Show Analysis</h3>
              <div className="space-y-2">
                {[
                  { cls: 'Class 9-B', noShows: 8, pct: '22%' },
                  { cls: 'Class 10-C', noShows: 5, pct: '14%' },
                  { cls: 'Class 8-A', noShows: 3, pct: '9%' },
                  { cls: 'Class 10-A', noShows: 2, pct: '6%' },
                  { cls: 'Class 10-B', noShows: 1, pct: '3%' },
                ].map(c => (
                  <div key={c.cls} className="flex items-center justify-between p-2 rounded-lg bg-red-50">
                    <span className={`text-xs font-bold ${theme.highlight}`}>{c.cls}</span>
                    <span className="text-xs text-red-600 font-bold">{c.noShows} no-shows ({c.pct})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* PTM Comparison */}
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 col-span-2`}>
              <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>PTM Comparison</h3>
              <div className="flex items-end gap-6 h-36 px-4">
                {[
                  { name: 'PTM 1 (Oct)', booking: 72, attendance: 65, feedback: 3.8 },
                  { name: 'PTM 2 (Dec)', booking: 80, attendance: 75, feedback: 4.0 },
                  { name: 'PTM 3 (Feb)', booking: 93, attendance: 84, feedback: 4.3 },
                ].map(p => (
                  <div key={p.name} className="flex-1 flex flex-col items-center gap-1">
                    <div className="flex gap-1 items-end h-24">
                      <div className="w-6 rounded-t-lg bg-blue-500" style={{ height: `${p.booking}%` }} title={`Booking: ${p.booking}%`} />
                      <div className="w-6 rounded-t-lg bg-emerald-500" style={{ height: `${p.attendance}%` }} title={`Attendance: ${p.attendance}%`} />
                      <div className="w-6 rounded-t-lg bg-amber-500" style={{ height: `${(p.feedback / 5) * 100}%` }} title={`Feedback: ${p.feedback}`} />
                    </div>
                    <span className={`text-[10px] font-bold ${theme.highlight}`}>{p.name}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-4 mt-2">
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-blue-500" /><span className={`text-[10px] ${theme.iconColor}`}>Booking %</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-emerald-500" /><span className={`text-[10px] ${theme.iconColor}`}>Attendance %</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-amber-500" /><span className={`text-[10px] ${theme.iconColor}`}>Feedback Score</span></div>
              </div>
            </div>

            {/* Slot Utilization */}
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 col-span-2`}>
              <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Slot Utilization Rate</h3>
              <div className="flex items-end gap-4 h-28">
                {ptmSchedules.map(p => (
                  <div key={p.id} className="flex-1 flex flex-col items-center gap-1">
                    <span className={`text-[10px] font-bold ${theme.primaryText}`}>{Math.round((p.booked / p.totalSlots) * 100)}%</span>
                    <div className={`w-full rounded-t-lg ${theme.primary}`} style={{ height: `${(p.booked / p.totalSlots) * 100}%`, minHeight: '8px' }} />
                    <span className={`text-[9px] ${theme.iconColor} text-center`}>{p.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Schedule New PTM Modal ── */}
      {showScheduleForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowScheduleForm(false)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} shadow-2xl w-full max-w-lg p-6 space-y-4`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar size={16} className={theme.primaryText} />
                <h2 className={`text-lg font-bold ${theme.highlight}`}>Schedule New PTM</h2>
              </div>
              <button onClick={() => setShowScheduleForm(false)} className={`p-1.5 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
            </div>
            <FormField label="PTM Title" required theme={theme}>
              <InputField placeholder="e.g. Term 2 PTM" value="" onChange={() => {}} theme={theme} />
            </FormField>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Date" required theme={theme}>
                <InputField type="date" value="" onChange={() => {}} theme={theme} />
              </FormField>
              <FormField label="Venue" required theme={theme}>
                <InputField placeholder="e.g. School Campus" value="" onChange={() => {}} theme={theme} />
              </FormField>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Start Time" required theme={theme}>
                <InputField type="time" value="" onChange={() => {}} theme={theme} />
              </FormField>
              <FormField label="End Time" required theme={theme}>
                <InputField type="time" value="" onChange={() => {}} theme={theme} />
              </FormField>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Classes" required theme={theme}>
                <SelectField options={['All Classes', 'Class 10 (A, B, C)', 'Class 9 (A, B)', 'Class 8 (A, B)', 'Selected Students']} value="" onChange={() => {}} theme={theme} placeholder="Select classes" />
              </FormField>
              <FormField label="Slot Duration" required theme={theme}>
                <SelectField options={['5 min', '10 min', '15 min', '20 min']} value="" onChange={() => {}} theme={theme} placeholder="Select duration" />
              </FormField>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg} flex items-center justify-between`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Send Notifications</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Notify parents via app, SMS, and email</p>
              </div>
              <button className={`w-9 h-5 rounded-full relative transition-colors bg-emerald-500`}>
                <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 translate-x-4" />
              </button>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowScheduleForm(false)} className={`flex-1 py-2.5 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.highlight}`}>Cancel</button>
              <button onClick={() => { window.alert('PTM scheduled and notifications sent to parents! (Blueprint demo)'); setShowScheduleForm(false); }} className={`flex-1 py-2.5 rounded-xl ${theme.primary} text-white text-sm font-bold`}>Schedule PTM</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
