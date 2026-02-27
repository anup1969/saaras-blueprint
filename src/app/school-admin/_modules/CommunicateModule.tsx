'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { StatCard, StatusBadge, TabBar } from '@/components/shared';
import { Megaphone, Users, Bell, Plus, Eye, Send, X, Clock, Edit } from 'lucide-react';
import { ChatsView } from '@/components/ChatModule';

export default function CommunicateModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Announcements');
  const [showNewAnnouncement, setShowNewAnnouncement] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [announcementForm, setAnnouncementForm] = useState({
    title: '', message: '', audience: 'All Staff', priority: 'Normal' as 'Normal' | 'Important' | 'Urgent', scheduleMode: 'now' as 'now' | 'later', scheduleDate: '',
    studentFilters: { grades: [] as string[], divisions: [] as string[], sectionGroups: [] as string[], houses: [] as string[] },
  });

  const announcements = [
    { id: 1, title: 'Annual Day Celebration — 28 February 2026', message: 'All students from Class I to X are expected to participate. Parents are cordially invited.', sentTo: 'All', date: '10-Feb-2026', sentBy: 'Admin Office' },
    { id: 2, title: 'Fee Payment Reminder — Last Date 15 Feb', message: 'Parents are requested to clear all pending fee dues by 15-Feb-2026. Late fee applicable.', sentTo: 'Parents', date: '08-Feb-2026', sentBy: 'Accounts Dept.' },
    { id: 3, title: 'PTM Schedule — Classes VI to X', message: 'PTM for classes VI to X will be held on 15-Feb (Saturday). Parents requested to attend.', sentTo: 'Parents', date: '07-Feb-2026', sentBy: 'Admin Office' },
    { id: 4, title: 'Revised School Timings — Effective 1 March', message: 'Summer timings effective 1-Mar-2026. School hours: 7:00 AM to 1:00 PM.', sentTo: 'All', date: '05-Feb-2026', sentBy: 'Admin Office' },
  ];

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

  const getRecipientCounts = () => {
    const counts: { group: string; count: number }[] = [];
    const audience = announcementForm.audience;
    if (audience === 'All Staff' || audience === 'Selected Groups') { counts.push({ group: 'Academic Staff', count: 78 }); counts.push({ group: 'Non-Academic Staff', count: 38 }); }
    if (audience === 'Teachers') { counts.push({ group: 'Teaching Staff', count: 78 }); }
    if (audience === 'Parents' || audience === 'Selected Groups') { counts.push({ group: 'Parents', count: 2847 }); }
    if (audience === 'Students' || audience === 'Selected Groups') {
      const sf = announcementForm.studentFilters;
      const hasFilters = sf.grades.length > 0 || sf.divisions.length > 0 || sf.sectionGroups.length > 0 || sf.houses.length > 0;
      if (audience === 'Students' && hasFilters) {
        let studentCount = sf.grades.length > 0 ? sf.grades.length * 120 : 2847;
        if (sf.divisions.length > 0) studentCount = Math.round(studentCount * sf.divisions.length / 4);
        if (sf.sectionGroups.length > 0) studentCount = Math.round(studentCount * sf.sectionGroups.length / 4);
        if (sf.houses.length > 0) studentCount = Math.round(studentCount * sf.houses.length / 4);
        counts.push({ group: 'Students (filtered)', count: Math.min(studentCount, 2847) });
      } else { counts.push({ group: 'Students', count: 2847 }); }
    }
    return counts;
  };
  const totalRecipients = getRecipientCounts().reduce((sum, r) => sum + r.count, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Communication</h1>
        <div className="flex gap-2">
          {tab === 'Circulars' && (
            <button className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold flex items-center gap-1`}><Plus size={12} /> New Circular</button>
          )}
          {tab === 'Announcements' && (
            <button onClick={() => setShowNewAnnouncement(true)} className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold flex items-center gap-1`}><Plus size={12} /> New Announcement</button>
          )}
        </div>
      </div>

      <TabBar tabs={['Announcements', 'Circulars', 'Notices', 'WhatsApp', 'SMS', 'Email', 'Templates', 'Chat']} active={tab} onChange={setTab} theme={theme} />

      {/* Announcements Tab */}
      {tab === 'Announcements' && (
        <>
          <div className="grid grid-cols-3 gap-4">
            <StatCard icon={Megaphone} label="Total Sent" value="28" color="bg-blue-500" sub="this month" theme={theme} />
            <StatCard icon={Users} label="Reach" value="2,847" color="bg-emerald-500" sub="students + parents" theme={theme} />
            <StatCard icon={Bell} label="Scheduled" value="2" color="bg-amber-500" sub="upcoming" theme={theme} />
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

      {/* Circulars Tab */}
      {tab === 'Circulars' && (
        <div className="space-y-3">
          {[
            { title: 'Annual Day Celebration', date: '10-Jan', to: 'All Parents', status: 'Sent', via: 'App + WhatsApp' },
            { title: 'PTM Schedule — Class 6-10', date: '08-Jan', to: 'Class 6-10 Parents', status: 'Sent', via: 'App + SMS' },
            { title: 'Winter Uniform Reminder', date: '05-Jan', to: 'All Students', status: 'Draft', via: '—' },
          ].map((c, i) => (
            <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex items-center justify-between`}>
              <div>
                <p className={`text-sm font-bold ${theme.highlight}`}>{c.title}</p>
                <p className={`text-xs ${theme.iconColor}`}>{c.date} &bull; To: {c.to} &bull; Via: {c.via}</p>
              </div>
              <StatusBadge status={c.status === 'Sent' ? 'Active' : 'Pending'} theme={theme} />
            </div>
          ))}
        </div>
      )}

      {/* Notices Tab */}
      {tab === 'Notices' && (
        <div className="space-y-3">
          {[
            { title: 'School Closed — Republic Day', date: '24-Jan', type: 'Holiday', status: 'Published' },
            { title: 'Exam Schedule — Final Term', date: '20-Jan', type: 'Academic', status: 'Published' },
            { title: 'Library Books Return Deadline', date: '15-Jan', type: 'General', status: 'Published' },
            { title: 'Sports Day Participation List', date: '12-Jan', type: 'Event', status: 'Draft' },
          ].map((n, i) => (
            <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex items-center justify-between`}>
              <div>
                <p className={`text-sm font-bold ${theme.highlight}`}>{n.title}</p>
                <p className={`text-xs ${theme.iconColor}`}>{n.date} &bull; {n.type}</p>
              </div>
              <StatusBadge status={n.status === 'Published' ? 'Active' : 'Pending'} theme={theme} />
            </div>
          ))}
        </div>
      )}

      {(tab === 'WhatsApp' || tab === 'SMS' || tab === 'Email' || tab === 'Templates') && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-8 text-center`}>
          <Megaphone size={32} className={`${theme.iconColor} mx-auto mb-2`} />
          <p className={`text-sm ${theme.iconColor}`}>{tab} — {tab === 'WhatsApp' ? 'School WAPI integration (school buys own subscription)' : tab === 'SMS' ? 'MSG91 integration' : tab === 'Email' ? 'Amazon SES integration' : 'Readymade circular templates'}</p>
        </div>
      )}

      {/* Chat Tab */}
      {tab === 'Chat' && <ChatsView theme={theme} compact />}

      {/* New Announcement Modal */}
      {showNewAnnouncement && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowNewAnnouncement(false)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} shadow-2xl w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-9 h-9 rounded-xl ${theme.primary} flex items-center justify-center text-white`}><Megaphone size={18} /></div>
                <h2 className={`text-lg font-bold ${theme.highlight}`}>New Announcement</h2>
              </div>
              <button onClick={() => setShowNewAnnouncement(false)} className={`p-1.5 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
            </div>

            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Title</label>
              <input type="text" value={announcementForm.title} onChange={e => setAnnouncementForm(prev => ({ ...prev, title: e.target.value }))} placeholder="Enter announcement title..." className={`w-full px-3 py-2.5 rounded-xl text-sm ${theme.inputBg} border ${theme.border} ${theme.highlight} outline-none focus:ring-2 focus:ring-blue-300`} />
            </div>

            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Message</label>
              <textarea value={announcementForm.message} onChange={e => setAnnouncementForm(prev => ({ ...prev, message: e.target.value }))} placeholder="Type your announcement message..." rows={4} className={`w-full px-3 py-2.5 rounded-xl text-sm ${theme.inputBg} border ${theme.border} ${theme.highlight} outline-none focus:ring-2 focus:ring-blue-300 resize-none`} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Audience</label>
                <select value={announcementForm.audience} onChange={e => setAnnouncementForm(prev => ({ ...prev, audience: e.target.value, studentFilters: { grades: [], divisions: [], sectionGroups: [], houses: [] } }))} className={`w-full px-3 py-2.5 rounded-xl text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight} outline-none focus:ring-2 focus:ring-blue-300`}>
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
                    <button key={p} onClick={() => setAnnouncementForm(prev => ({ ...prev, priority: p }))} className={`flex-1 px-2 py-2 rounded-xl text-[10px] font-bold transition-all ${announcementForm.priority === p ? priorityStyle(p) : `${theme.secondaryBg} ${theme.iconColor} ${theme.buttonHover}`}`}>{p}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Student Sub-Filters */}
            {announcementForm.audience === 'Students' && (
              <div className={`p-3 rounded-xl border ${theme.border} ${theme.secondaryBg} space-y-3`}>
                <p className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>Student Filters</p>
                <div>
                  <label className={`text-[10px] font-medium ${theme.iconColor} block mb-1`}>Grade-wise</label>
                  <div className="flex flex-wrap gap-1">
                    {Array.from({ length: 12 }, (_, i) => `Grade ${i + 1}`).map(g => (
                      <button key={g} onClick={() => setAnnouncementForm(prev => ({ ...prev, studentFilters: { ...prev.studentFilters, grades: prev.studentFilters.grades.includes(g) ? prev.studentFilters.grades.filter(x => x !== g) : [...prev.studentFilters.grades, g] } }))} className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${announcementForm.studentFilters.grades.includes(g) ? `${theme.primary} text-white` : `${theme.cardBg} ${theme.iconColor} border ${theme.border}`}`}>{g.replace('Grade ', '')}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={`text-[10px] font-medium ${theme.iconColor} block mb-1`}>Division</label>
                  <div className="flex gap-1.5">
                    {['A', 'B', 'C', 'D'].map(d => (
                      <button key={d} onClick={() => setAnnouncementForm(prev => ({ ...prev, studentFilters: { ...prev.studentFilters, divisions: prev.studentFilters.divisions.includes(d) ? prev.studentFilters.divisions.filter(x => x !== d) : [...prev.studentFilters.divisions, d] } }))} className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${announcementForm.studentFilters.divisions.includes(d) ? `${theme.primary} text-white` : `${theme.cardBg} ${theme.iconColor} border ${theme.border}`}`}>{d}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={`text-[10px] font-medium ${theme.iconColor} block mb-1`}>Section Group</label>
                  <div className="flex flex-wrap gap-1.5">
                    {['Pre-Primary', 'Primary', 'Secondary', 'Senior Secondary'].map(s => (
                      <button key={s} onClick={() => setAnnouncementForm(prev => ({ ...prev, studentFilters: { ...prev.studentFilters, sectionGroups: prev.studentFilters.sectionGroups.includes(s) ? prev.studentFilters.sectionGroups.filter(x => x !== s) : [...prev.studentFilters.sectionGroups, s] } }))} className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${announcementForm.studentFilters.sectionGroups.includes(s) ? `${theme.primary} text-white` : `${theme.cardBg} ${theme.iconColor} border ${theme.border}`}`}>{s}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={`text-[10px] font-medium ${theme.iconColor} block mb-1`}>House-wise</label>
                  <div className="flex flex-wrap gap-1.5">
                    {[{ name: 'Red House', color: 'bg-red-500' }, { name: 'Blue House', color: 'bg-blue-500' }, { name: 'Green House', color: 'bg-green-500' }, { name: 'Yellow House', color: 'bg-yellow-500' }].map(h => (
                      <button key={h.name} onClick={() => setAnnouncementForm(prev => ({ ...prev, studentFilters: { ...prev.studentFilters, houses: prev.studentFilters.houses.includes(h.name) ? prev.studentFilters.houses.filter(x => x !== h.name) : [...prev.studentFilters.houses, h.name] } }))} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${announcementForm.studentFilters.houses.includes(h.name) ? `${theme.primary} text-white` : `${theme.cardBg} ${theme.iconColor} border ${theme.border}`}`}><span className={`w-2 h-2 rounded-full ${h.color}`} />{h.name}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Schedule Toggle */}
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-2`}>Schedule</label>
              <div className="flex items-center gap-3">
                <button onClick={() => setAnnouncementForm(prev => ({ ...prev, scheduleMode: 'now' }))} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${announcementForm.scheduleMode === 'now' ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.iconColor}`}`}><Send size={12} /> Send Now</button>
                <button onClick={() => setAnnouncementForm(prev => ({ ...prev, scheduleMode: 'later' }))} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${announcementForm.scheduleMode === 'later' ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.iconColor}`}`}><Clock size={12} /> Schedule for Later</button>
              </div>
              {announcementForm.scheduleMode === 'later' && (
                <input type="datetime-local" value={announcementForm.scheduleDate} onChange={e => setAnnouncementForm(prev => ({ ...prev, scheduleDate: e.target.value }))} className={`mt-2 w-full px-3 py-2 rounded-xl text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight} outline-none focus:ring-2 focus:ring-blue-300`} />
              )}
            </div>

            <button onClick={() => setShowPreview(true)} className={`w-full py-3 rounded-xl ${theme.primary} text-white text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity`}>
              <Eye size={14} /> Preview &amp; Confirm
            </button>
          </div>
        </div>
      )}

      {/* Preview / Confirmation Modal */}
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
            <div className={`p-4 rounded-xl ${theme.secondaryBg} border ${theme.border} space-y-2`}>
              <h3 className={`text-sm font-bold ${theme.highlight}`}>{announcementForm.title || '(No title)'}</h3>
              <p className={`text-xs ${theme.iconColor} leading-relaxed`}>{announcementForm.message || '(No message)'}</p>
              <div className="flex items-center gap-2 pt-1">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${priorityStyle(announcementForm.priority)}`}>{announcementForm.priority}</span>
                <span className={`text-[10px] ${theme.iconColor}`}>{announcementForm.scheduleMode === 'now' ? 'Send immediately' : `Scheduled: ${announcementForm.scheduleDate || 'Not set'}`}</span>
              </div>
            </div>
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
            {announcementForm.audience === 'Students' && (
              <div className={`text-[10px] ${theme.iconColor} space-y-0.5`}>
                {announcementForm.studentFilters.grades.length > 0 && <p>Grades: {announcementForm.studentFilters.grades.join(', ')}</p>}
                {announcementForm.studentFilters.divisions.length > 0 && <p>Divisions: {announcementForm.studentFilters.divisions.join(', ')}</p>}
                {announcementForm.studentFilters.sectionGroups.length > 0 && <p>Sections: {announcementForm.studentFilters.sectionGroups.join(', ')}</p>}
                {announcementForm.studentFilters.houses.length > 0 && <p>Houses: {announcementForm.studentFilters.houses.join(', ')}</p>}
              </div>
            )}
            <div className="flex gap-2">
              <button onClick={() => setShowPreview(false)} className={`flex-1 py-2.5 rounded-xl ${theme.secondaryBg} ${theme.highlight} text-xs font-bold flex items-center justify-center gap-1.5 ${theme.buttonHover} transition-all`}>
                <Edit size={12} /> Edit
              </button>
              <button onClick={() => { setShowPreview(false); setShowNewAnnouncement(false); setAnnouncementForm({ title: '', message: '', audience: 'All Staff', priority: 'Normal', scheduleMode: 'now', scheduleDate: '', studentFilters: { grades: [], divisions: [], sectionGroups: [], houses: [] } }); }} className={`flex-1 py-2.5 rounded-xl ${theme.primary} text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity`}>
                <Send size={12} /> {announcementForm.scheduleMode === 'now' ? 'Confirm & Send' : 'Confirm & Schedule'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
