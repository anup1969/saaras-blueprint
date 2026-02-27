'use client';

import { useState } from 'react';
import { StatCard, TabBar } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  Megaphone, Users, Bell, Send, Inbox, Mail, Plus, Eye, X,
  ChevronRight, Clock, Edit2, Paperclip,
} from 'lucide-react';
import { ChatsView } from '@/components/ChatModule';

export default function CommunicationModule({ theme }: { theme: Theme }) {
  const [commTab, setCommTab] = useState<'Messages' | 'Announcements' | 'Chat'>('Messages');
  const [showNewAnnouncement, setShowNewAnnouncement] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [announcementForm, setAnnouncementForm] = useState({
    title: '', message: '', audience: 'All Staff', priority: 'Normal' as 'Normal' | 'Important' | 'Urgent', scheduleMode: 'now' as 'now' | 'later', scheduleDate: '',
    studentFilters: { grades: [] as string[], divisions: [] as string[], sectionGroups: [] as string[], houses: [] as string[] },
  });

  // Recipient count calculator based on audience selection
  const getRecipientCounts = () => {
    const counts: { group: string; count: number }[] = [];
    const audience = announcementForm.audience;
    if (audience === 'All Staff' || audience === 'Selected Groups') {
      counts.push({ group: 'Academic Staff', count: 78 });
      counts.push({ group: 'Non-Academic Staff', count: 38 });
    }
    if (audience === 'Teachers') {
      counts.push({ group: 'Teaching Staff', count: 78 });
    }
    if (audience === 'Parents' || audience === 'Selected Groups') {
      counts.push({ group: 'Parents', count: 2847 });
    }
    if (audience === 'Students' || audience === 'Selected Groups') {
      const sf = announcementForm.studentFilters;
      const hasFilters = sf.grades.length > 0 || sf.divisions.length > 0 || sf.sectionGroups.length > 0 || sf.houses.length > 0;
      if (audience === 'Students' && hasFilters) {
        let studentCount = 0;
        if (sf.grades.length > 0) studentCount += sf.grades.length * 120;
        else studentCount = 2847;
        if (sf.divisions.length > 0) studentCount = Math.round(studentCount * sf.divisions.length / 4);
        if (sf.sectionGroups.length > 0) studentCount = Math.round(studentCount * sf.sectionGroups.length / 4);
        if (sf.houses.length > 0) studentCount = Math.round(studentCount * sf.houses.length / 4);
        counts.push({ group: 'Students (filtered)', count: Math.min(studentCount, 2847) });
      } else {
        counts.push({ group: 'Students', count: 2847 });
      }
    }
    return counts;
  };

  const totalRecipients = getRecipientCounts().reduce((sum, r) => sum + r.count, 0);

  const messages = [
    { id: 1, type: 'Circular', subject: 'Annual Day Rehearsal Schedule', from: 'Principal Office', to: 'All Staff + Parents', date: '11-Feb-2026', status: 'Sent', reads: '2,145 / 2,847' },
    { id: 2, type: 'Notice', subject: 'Fee Payment Reminder — Last Date 15 Feb', from: 'Accounts Dept.', to: 'Parents (Defaulters)', date: '10-Feb-2026', status: 'Sent', reads: '189 / 312' },
    { id: 3, type: 'Message', subject: 'Staff Meeting — Agenda for 14-Feb', from: 'Vice Principal', to: 'All Teaching Staff', date: '10-Feb-2026', status: 'Sent', reads: '65 / 78' },
    { id: 4, type: 'Circular', subject: 'PTM Schedule — Classes VI to X', from: 'Principal Office', to: 'Parents (VI-X)', date: '08-Feb-2026', status: 'Sent', reads: '890 / 1,120' },
    { id: 5, type: 'Alert', subject: 'Water Supply Disruption — 12 Feb', from: 'Admin Office', to: 'All', date: '07-Feb-2026', status: 'Sent', reads: '2,540 / 2,847' },
    { id: 6, type: 'Draft', subject: 'Summer Timing Change Notification', from: 'Principal Office', to: 'All', date: '—', status: 'Draft', reads: '—' },
  ];

  const announcements = [
    { id: 1, title: 'Annual Day Celebration — 28 February 2026', message: 'All students from Class I to X are expected to participate in the Annual Day celebration. Parents are cordially invited. Rehearsals begin from 15-Feb.', sentTo: 'All', date: '10-Feb-2026', sentBy: 'Principal' },
    { id: 2, title: 'Parent-Teacher Meeting Schedule', message: 'PTM for classes VI to X will be held on 15-Feb (Saturday). Parents are requested to collect the progress report from respective class teachers.', sentTo: 'Parents', date: '08-Feb-2026', sentBy: 'Principal' },
    { id: 3, title: 'Staff Development Workshop', message: 'A mandatory workshop on NEP 2020 implementation strategies will be conducted on 20-Feb. All teaching staff must attend. Relief arrangements in progress.', sentTo: 'Teachers', date: '07-Feb-2026', sentBy: 'Vice Principal' },
    { id: 4, title: 'Revised School Timings — Effective 1 March', message: 'Summer timings will be effective from 1-Mar-2026. School hours: 7:00 AM to 1:00 PM. Bus timings will be updated accordingly.', sentTo: 'All', date: '05-Feb-2026', sentBy: 'Principal' },
    { id: 5, title: 'Inter-School Science Exhibition', message: 'Selected students from classes VIII to X will represent our school at the District Science Exhibition on 25-Feb. Parents of selected students will be notified separately.', sentTo: 'Parents', date: '03-Feb-2026', sentBy: 'Dr. Priya Sharma' },
    { id: 6, title: 'Fee Payment Reminder — Last Date 15 February', message: 'Parents are requested to clear all pending fee dues by 15-Feb-2026. Late fee of Rs. 500 will be applicable after the due date.', sentTo: 'Parents', date: '01-Feb-2026', sentBy: 'Accounts Dept.' },
  ];

  const typeColor = (type: string) => {
    if (type === 'Circular') return 'bg-blue-100 text-blue-700';
    if (type === 'Notice') return 'bg-amber-100 text-amber-700';
    if (type === 'Alert') return 'bg-red-100 text-red-700';
    if (type === 'Draft') return 'bg-gray-100 text-gray-600';
    return 'bg-purple-100 text-purple-700';
  };

  const audienceColor = (audience: string) => {
    if (audience === 'All') return 'bg-blue-100 text-blue-700';
    if (audience === 'Teachers') return 'bg-purple-100 text-purple-700';
    return 'bg-emerald-100 text-emerald-700';
  };

  const priorityStyle = (p: string) => {
    if (p === 'Urgent') return 'bg-red-500 text-white';
    if (p === 'Important') return 'bg-amber-500 text-white';
    return 'bg-blue-100 text-blue-700';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Communication</h1>
        <div className="flex gap-2">
          {commTab === 'Messages' && (
            <>
              <button className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold flex items-center gap-1`}>
                <Plus size={12} /> New Circular
              </button>
              <button className={`px-4 py-2 ${theme.secondaryBg} rounded-xl text-xs font-bold ${theme.highlight} flex items-center gap-1`}>
                <Send size={12} /> Quick Message
              </button>
            </>
          )}
          {commTab === 'Announcements' && (
            <button onClick={() => setShowNewAnnouncement(true)} className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}>
              <Plus size={14} /> New Announcement
            </button>
          )}
        </div>
      </div>

      {/* Tab Bar */}
      <TabBar tabs={['Messages', 'Announcements', 'Chat']} active={commTab} onChange={(t) => setCommTab(t as 'Messages' | 'Announcements' | 'Chat')} theme={theme} />

      {/* ── Messages Tab ── */}
      {commTab === 'Messages' && (
        <>
          <div className="grid grid-cols-4 gap-4">
            <StatCard icon={Send} label="Sent This Month" value="18" color="bg-blue-500" theme={theme} />
            <StatCard icon={Inbox} label="Drafts" value="2" color="bg-gray-500" theme={theme} />
            <StatCard icon={Users} label="Reach" value="2,847" color="bg-emerald-500" sub="students + parents" theme={theme} />
            <StatCard icon={Mail} label="Read Rate" value="78%" color="bg-purple-500" theme={theme} />
          </div>

          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Messages & Circulars</h3>
            <div className="space-y-2">
              {messages.map(m => (
                <div key={m.id} className={`flex items-center gap-3 p-3 rounded-xl ${theme.secondaryBg}`}>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap ${typeColor(m.type)}`}>{m.type}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-bold ${theme.highlight} truncate`}>{m.subject}</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>{m.from} &rarr; {m.to}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`text-[10px] ${theme.iconColor}`}>{m.date}</p>
                    <p className={`text-[10px] ${m.status === 'Draft' ? 'text-gray-500' : 'text-emerald-600'} font-bold`}>{m.reads}</p>
                  </div>
                  <button className={`p-1.5 rounded-lg ${theme.buttonHover}`}><ChevronRight size={12} className={theme.iconColor} /></button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ── Announcements Tab (moved from separate module — REMARK 2) ── */}
      {commTab === 'Announcements' && (
        <>
          <div className="grid grid-cols-3 gap-4">
            <StatCard icon={Megaphone} label="Total Sent" value="42" color="bg-blue-500" sub="this month" theme={theme} />
            <StatCard icon={Users} label="Reach" value="2,847" color="bg-emerald-500" sub="students + parents" theme={theme} />
            <StatCard icon={Bell} label="Scheduled" value="3" color="bg-amber-500" sub="upcoming" theme={theme} />
          </div>

          <div className="space-y-3">
            {announcements.map(a => (
              <div key={a.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`text-sm font-bold ${theme.highlight}`}>{a.title}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${audienceColor(a.sentTo)}`}>{a.sentTo}</span>
                </div>
                <p className={`text-xs ${theme.iconColor} leading-relaxed mb-3`}>{a.message}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] ${theme.iconColor}`}>{a.date}</span>
                    <span className={`text-[10px] ${theme.iconColor}`}>Sent by: <span className="font-bold">{a.sentBy}</span></span>
                  </div>
                  <div className="flex gap-1">
                    <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
                    <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Send size={12} className={theme.iconColor} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── Chat Tab ── */}
      {commTab === 'Chat' && <ChatsView theme={theme} compact />}

      {/* ── New Announcement Modal (REMARK 3) ── */}
      {showNewAnnouncement && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowNewAnnouncement(false)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} shadow-2xl w-full max-w-lg p-6 space-y-4`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-9 h-9 rounded-xl ${theme.primary} flex items-center justify-center text-white`}><Megaphone size={18} /></div>
                <h2 className={`text-lg font-bold ${theme.highlight}`}>New Announcement</h2>
              </div>
              <button onClick={() => setShowNewAnnouncement(false)} className={`p-1.5 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
            </div>

            {/* Title */}
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Title</label>
              <input
                type="text"
                value={announcementForm.title}
                onChange={e => setAnnouncementForm(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter announcement title..."
                className={`w-full px-3 py-2.5 rounded-xl text-sm ${theme.inputBg} border ${theme.border} ${theme.highlight} outline-none focus:ring-2 focus:ring-blue-300`}
              />
            </div>

            {/* Message */}
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Message</label>
              <textarea
                value={announcementForm.message}
                onChange={e => setAnnouncementForm(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Type your announcement message..."
                rows={4}
                className={`w-full px-3 py-2.5 rounded-xl text-sm ${theme.inputBg} border ${theme.border} ${theme.highlight} outline-none focus:ring-2 focus:ring-blue-300 resize-none`}
              />
            </div>

            {/* Audience + Priority row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Audience</label>
                <select
                  value={announcementForm.audience}
                  onChange={e => setAnnouncementForm(prev => ({ ...prev, audience: e.target.value, studentFilters: { grades: [], divisions: [], sectionGroups: [], houses: [] } }))}
                  className={`w-full px-3 py-2.5 rounded-xl text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight} outline-none focus:ring-2 focus:ring-blue-300`}
                >
                  <option>All Staff</option>
                  <option>Teachers</option>
                  <option>Parents</option>
                  <option>Students</option>
                  <option>Selected Groups</option>
                </select>
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Priority</label>
                <div className="flex gap-1.5">
                  {(['Normal', 'Important', 'Urgent'] as const).map(p => (
                    <button
                      key={p}
                      onClick={() => setAnnouncementForm(prev => ({ ...prev, priority: p }))}
                      className={`flex-1 px-2 py-2 rounded-xl text-[10px] font-bold transition-all ${
                        announcementForm.priority === p ? priorityStyle(p) : `${theme.secondaryBg} ${theme.iconColor} ${theme.buttonHover}`
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Student Sub-Filters (shown when audience = Students) */}
            {announcementForm.audience === 'Students' && (
              <div className={`p-3 rounded-xl border ${theme.border} ${theme.secondaryBg} space-y-3`}>
                <p className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>Student Filters</p>

                {/* Grade-wise */}
                <div>
                  <label className={`text-[10px] font-medium ${theme.iconColor} block mb-1`}>Grade-wise</label>
                  <div className="flex flex-wrap gap-1">
                    {Array.from({ length: 12 }, (_, i) => `Grade ${i + 1}`).map(g => (
                      <button
                        key={g}
                        onClick={() => setAnnouncementForm(prev => ({
                          ...prev,
                          studentFilters: {
                            ...prev.studentFilters,
                            grades: prev.studentFilters.grades.includes(g)
                              ? prev.studentFilters.grades.filter(x => x !== g)
                              : [...prev.studentFilters.grades, g]
                          }
                        }))}
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                          announcementForm.studentFilters.grades.includes(g)
                            ? `${theme.primary} text-white`
                            : `${theme.cardBg} ${theme.iconColor} border ${theme.border}`
                        }`}
                      >
                        {g.replace('Grade ', '')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Division */}
                <div>
                  <label className={`text-[10px] font-medium ${theme.iconColor} block mb-1`}>Division</label>
                  <div className="flex gap-1.5">
                    {['A', 'B', 'C', 'D'].map(d => (
                      <button
                        key={d}
                        onClick={() => setAnnouncementForm(prev => ({
                          ...prev,
                          studentFilters: {
                            ...prev.studentFilters,
                            divisions: prev.studentFilters.divisions.includes(d)
                              ? prev.studentFilters.divisions.filter(x => x !== d)
                              : [...prev.studentFilters.divisions, d]
                          }
                        }))}
                        className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                          announcementForm.studentFilters.divisions.includes(d)
                            ? `${theme.primary} text-white`
                            : `${theme.cardBg} ${theme.iconColor} border ${theme.border}`
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section Group */}
                <div>
                  <label className={`text-[10px] font-medium ${theme.iconColor} block mb-1`}>Section Group</label>
                  <div className="flex flex-wrap gap-1.5">
                    {['Pre-Primary', 'Primary', 'Secondary', 'Senior Secondary'].map(s => (
                      <button
                        key={s}
                        onClick={() => setAnnouncementForm(prev => ({
                          ...prev,
                          studentFilters: {
                            ...prev.studentFilters,
                            sectionGroups: prev.studentFilters.sectionGroups.includes(s)
                              ? prev.studentFilters.sectionGroups.filter(x => x !== s)
                              : [...prev.studentFilters.sectionGroups, s]
                          }
                        }))}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                          announcementForm.studentFilters.sectionGroups.includes(s)
                            ? `${theme.primary} text-white`
                            : `${theme.cardBg} ${theme.iconColor} border ${theme.border}`
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* House-wise */}
                <div>
                  <label className={`text-[10px] font-medium ${theme.iconColor} block mb-1`}>House-wise</label>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { name: 'Red House', color: 'bg-red-500' },
                      { name: 'Blue House', color: 'bg-blue-500' },
                      { name: 'Green House', color: 'bg-green-500' },
                      { name: 'Yellow House', color: 'bg-yellow-500' },
                    ].map(h => (
                      <button
                        key={h.name}
                        onClick={() => setAnnouncementForm(prev => ({
                          ...prev,
                          studentFilters: {
                            ...prev.studentFilters,
                            houses: prev.studentFilters.houses.includes(h.name)
                              ? prev.studentFilters.houses.filter(x => x !== h.name)
                              : [...prev.studentFilters.houses, h.name]
                          }
                        }))}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                          announcementForm.studentFilters.houses.includes(h.name)
                            ? `${theme.primary} text-white`
                            : `${theme.cardBg} ${theme.iconColor} border ${theme.border}`
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${h.color}`} />
                        {h.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Attachment */}
            <button className={`flex items-center gap-2 px-3 py-2 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} transition-all`}>
              <Paperclip size={14} className={theme.iconColor} />
              <span className={`text-xs font-medium ${theme.iconColor}`}>Add Attachment</span>
            </button>

            {/* Schedule Toggle */}
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-2`}>Schedule</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setAnnouncementForm(prev => ({ ...prev, scheduleMode: 'now' }))}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    announcementForm.scheduleMode === 'now' ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.iconColor}`
                  }`}
                >
                  <Send size={12} /> Send Now
                </button>
                <button
                  onClick={() => setAnnouncementForm(prev => ({ ...prev, scheduleMode: 'later' }))}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    announcementForm.scheduleMode === 'later' ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.iconColor}`
                  }`}
                >
                  <Clock size={12} /> Schedule for Later
                </button>
              </div>
              {announcementForm.scheduleMode === 'later' && (
                <input
                  type="datetime-local"
                  value={announcementForm.scheduleDate}
                  onChange={e => setAnnouncementForm(prev => ({ ...prev, scheduleDate: e.target.value }))}
                  className={`mt-2 w-full px-3 py-2 rounded-xl text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight} outline-none focus:ring-2 focus:ring-blue-300`}
                />
              )}
            </div>

            {/* Preview Button (opens confirmation step) */}
            <button
              onClick={() => setShowPreview(true)}
              className={`w-full py-3 rounded-xl ${theme.primary} text-white text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity`}
            >
              <Eye size={14} /> Preview &amp; Confirm
            </button>
          </div>
        </div>
      )}

      {/* ── Preview / Confirmation Modal ── */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4" onClick={() => setShowPreview(false)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} shadow-2xl w-full max-w-md p-6 space-y-4`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center text-white`}><Eye size={16} /></div>
                <h2 className={`text-base font-bold ${theme.highlight}`}>Confirm Announcement</h2>
              </div>
              <button onClick={() => setShowPreview(false)} className={`p-1.5 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
            </div>

            {/* Announcement Preview */}
            <div className={`p-4 rounded-xl ${theme.secondaryBg} border ${theme.border} space-y-2`}>
              <h3 className={`text-sm font-bold ${theme.highlight}`}>{announcementForm.title || '(No title)'}</h3>
              <p className={`text-xs ${theme.iconColor} leading-relaxed`}>{announcementForm.message || '(No message)'}</p>
              <div className="flex items-center gap-2 pt-1">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${priorityStyle(announcementForm.priority)}`}>{announcementForm.priority}</span>
                <span className={`text-[10px] ${theme.iconColor}`}>{announcementForm.scheduleMode === 'now' ? 'Send immediately' : `Scheduled: ${announcementForm.scheduleDate || 'Not set'}`}</span>
              </div>
            </div>

            {/* Recipient Breakdown */}
            <div className={`p-4 rounded-xl border-2 border-dashed ${theme.border} space-y-2`}>
              <p className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>This will be sent to:</p>
              <div className="space-y-1.5">
                {getRecipientCounts().map(r => (
                  <div key={r.group} className="flex items-center justify-between">
                    <span className={`text-xs font-medium ${theme.highlight}`}>{r.group}</span>
                    <span className={`text-xs font-bold ${theme.primaryText}`}>{r.count.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className={`flex items-center justify-between pt-2 border-t ${theme.border}`}>
                <span className={`text-xs font-bold ${theme.highlight}`}>Total Recipients</span>
                <span className={`text-sm font-bold ${theme.primaryText}`}>{totalRecipients.toLocaleString()}</span>
              </div>
            </div>

            {/* Student filter summary */}
            {announcementForm.audience === 'Students' && (
              <div className={`text-[10px] ${theme.iconColor} space-y-0.5`}>
                {announcementForm.studentFilters.grades.length > 0 && <p>Grades: {announcementForm.studentFilters.grades.join(', ')}</p>}
                {announcementForm.studentFilters.divisions.length > 0 && <p>Divisions: {announcementForm.studentFilters.divisions.join(', ')}</p>}
                {announcementForm.studentFilters.sectionGroups.length > 0 && <p>Sections: {announcementForm.studentFilters.sectionGroups.join(', ')}</p>}
                {announcementForm.studentFilters.houses.length > 0 && <p>Houses: {announcementForm.studentFilters.houses.join(', ')}</p>}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowPreview(false)}
                className={`flex-1 py-2.5 rounded-xl ${theme.secondaryBg} ${theme.highlight} text-xs font-bold flex items-center justify-center gap-1.5 ${theme.buttonHover} transition-all`}
              >
                <Edit2 size={12} /> Edit
              </button>
              <button
                onClick={() => {
                  setShowPreview(false);
                  setShowNewAnnouncement(false);
                  setAnnouncementForm({ title: '', message: '', audience: 'All Staff', priority: 'Normal', scheduleMode: 'now', scheduleDate: '', studentFilters: { grades: [], divisions: [], sectionGroups: [], houses: [] } });
                }}
                className={`flex-1 py-2.5 rounded-xl ${theme.primary} text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity`}
              >
                <Send size={12} /> {announcementForm.scheduleMode === 'now' ? 'Confirm & Send' : 'Confirm & Schedule'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
