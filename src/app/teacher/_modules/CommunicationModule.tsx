'use client';

import React, { useState } from 'react';
import { TabBar } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  Plus, X, Send, Upload, Mail, Megaphone
} from 'lucide-react';
import { ChatsView } from '@/components/ChatModule';

export default function CommunicationModule({ theme }: { theme: Theme }) {
  const [commTab, setCommTab] = useState('Chat');
  const [showCreateNotice, setShowCreateNotice] = useState(false);
  const tabs = ['Messages', 'Notices', 'My Notices', 'Chat'];
  return (
    <div className="space-y-3">
      <h2 className={`text-lg font-bold ${theme.highlight}`}>Communication</h2>
      <TabBar tabs={tabs} active={commTab} onChange={setCommTab} theme={theme} />
      {commTab === 'Chat' && <ChatsView theme={theme} compact />}
      {commTab === 'Messages' && (
        <div className="space-y-2">
          {[
            { from: 'Principal Office', subject: 'Staff meeting rescheduled to 3 PM', time: '10:30 AM', read: false },
            { from: 'HR Department', subject: 'Salary slip for January 2026 available', time: '09:15 AM', read: true },
            { from: 'Parent — Mrs. Kulkarni', subject: 'Regarding Diya\'s absence on 10 Feb', time: 'Yesterday', read: true },
          ].map((msg, i) => (
            <div key={i} className={`${theme.cardBg} rounded-xl border ${theme.border} p-3 flex items-center gap-3`}>
              <div className={`w-8 h-8 rounded-full ${!msg.read ? theme.primary : theme.secondaryBg} flex items-center justify-center`}>
                <Mail size={14} className={!msg.read ? 'text-white' : theme.iconColor} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-semibold ${theme.highlight} truncate`}>{msg.from}</p>
                <p className={`text-[10px] ${theme.iconColor} truncate`}>{msg.subject}</p>
              </div>
              <span className={`text-[10px] ${theme.iconColor} shrink-0`}>{msg.time}</span>
            </div>
          ))}
        </div>
      )}
      {commTab === 'Notices' && (
        <div className="space-y-3">
          <div className="flex items-center justify-end">
            <button
              onClick={() => setShowCreateNotice(!showCreateNotice)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg ${showCreateNotice ? 'bg-red-100 text-red-700' : `${theme.primary} text-white`} text-xs font-bold`}
            >
              {showCreateNotice ? <><X size={12} /> Cancel</> : <><Plus size={12} /> Create Notice</>}
            </button>
          </div>

          {showCreateNotice && (
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 border-l-2 border-l-amber-500 space-y-3`}>
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Create Notice / Circular</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Title *</label>
                  <input placeholder="Enter notice title..." className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`} />
                </div>
                <div className="col-span-2">
                  <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Content *</label>
                  <textarea rows={4} placeholder="Write the notice content..." className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none resize-none`} />
                </div>
                <div>
                  <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Target Audience *</label>
                  <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`}>
                    <option>My Class Only (10-A)</option>
                    <option>All My Classes</option>
                    <option>Specific Section...</option>
                  </select>
                </div>
                <div>
                  <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Priority *</label>
                  <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`}>
                    <option>Normal</option>
                    <option>Important</option>
                    <option>Urgent</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Attachments</label>
                  <div className={`border-2 border-dashed ${theme.border} rounded-xl p-3 text-center cursor-pointer ${theme.buttonHover} transition-all`}>
                    <Upload size={16} className={`${theme.iconColor} mx-auto mb-1`} />
                    <p className={`text-[10px] ${theme.iconColor}`}>Click to upload files (PDF, images, documents)</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2">
                <button onClick={() => setShowCreateNotice(false)} className={`px-4 py-2 rounded-xl ${theme.secondaryBg} ${theme.iconColor} text-xs font-bold`}>Cancel</button>
                <button
                  onClick={() => { window.alert('Notice published successfully! (Blueprint demo)'); setShowCreateNotice(false); }}
                  className={`flex items-center gap-1 px-4 py-2 ${theme.primary} text-white text-xs font-bold rounded-xl`}
                >
                  <Send size={12} /> Publish Notice
                </button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {[
              { title: 'Unit Test 3 Schedule — Classes 8 to 10', date: '10 Feb 2026', category: 'Academic' },
              { title: 'PTM Notice — 22nd February 2026', date: '09 Feb 2026', category: 'Event' },
              { title: 'Revised Assembly Timing from March', date: '08 Feb 2026', category: 'Administrative' },
            ].map((n, i) => (
              <div key={i} className={`${theme.cardBg} rounded-xl border ${theme.border} p-3 flex items-center gap-3`}>
                <div className={`w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center`}>
                  <Megaphone size={14} className="text-amber-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-semibold ${theme.highlight} truncate`}>{n.title}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{n.date} &middot; {n.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {commTab === 'My Notices' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className={`text-xs ${theme.iconColor}`}>Notices created by you</p>
            <button
              onClick={() => { setCommTab('Notices'); setShowCreateNotice(true); }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg ${theme.primary} text-white text-xs font-bold`}
            >
              <Plus size={12} /> New Notice
            </button>
          </div>
          {[
            { title: 'Homework Reminder — Ch 8 Trigonometry', date: '10 Feb 2026', audience: '10-A', priority: 'Normal', status: 'Published', views: 38 },
            { title: 'Science Fair Project Submission Deadline', date: '08 Feb 2026', audience: 'All Classes', priority: 'Important', status: 'Published', views: 156 },
            { title: 'Extra Class for Weak Students — Saturday', date: '05 Feb 2026', audience: '6-A', priority: 'Normal', status: 'Published', views: 28 },
            { title: 'Lab Safety Guidelines Reminder', date: '01 Feb 2026', audience: '9-A, 9-B', priority: 'Urgent', status: 'Published', views: 72 },
          ].map((notice, i) => (
            <div key={i} className={`${theme.cardBg} rounded-xl border ${theme.border} p-3 flex items-center gap-3`}>
              <div className={`w-8 h-8 rounded-full ${
                notice.priority === 'Urgent' ? 'bg-red-100' : notice.priority === 'Important' ? 'bg-amber-100' : 'bg-blue-100'
              } flex items-center justify-center`}>
                <Megaphone size={14} className={
                  notice.priority === 'Urgent' ? 'text-red-500' : notice.priority === 'Important' ? 'text-amber-500' : 'text-blue-500'
                } />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-semibold ${theme.highlight} truncate`}>{notice.title}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{notice.date} &middot; To: {notice.audience} &middot; {notice.views} views</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  notice.priority === 'Urgent' ? 'bg-red-100 text-red-700' : notice.priority === 'Important' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                }`}>{notice.priority}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-700">{notice.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
