'use client';

import React, { useState } from 'react';
import { TabBar } from '@/components/shared';
import { ChatsView } from '@/components/ChatModule';
import { type Theme } from '@/lib/themes';

export default function CommunicationModule({ theme }: { theme: Theme }) {
  const [commTab, setCommTab] = useState('Chat');
  const tabs = ['Platform Notices', 'Support Chat', 'Chat'];

  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Communication</h1>
      <TabBar tabs={tabs} active={commTab} onChange={setCommTab} theme={theme} />

      {commTab === 'Chat' && (
        <div className="h-[calc(100vh-220px)]">
          <ChatsView theme={theme} compact />
        </div>
      )}

      {commTab === 'Platform Notices' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-2`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-2`}>Platform-wide Notices</h3>
          {[
            { title: 'Scheduled Maintenance — 18 Feb 2026', detail: 'Platform will be under maintenance from 2:00 AM to 4:00 AM IST.', date: '14 Feb 2026', status: 'Scheduled' },
            { title: 'New Module Release: Advanced Analytics v2', detail: 'Enterprise plan schools now have access to the upgraded analytics dashboard.', date: '10 Feb 2026', status: 'Published' },
            { title: 'Security Patch Applied — v2.4.1', detail: 'Hotfix deployed for session timeout issue. No downtime.', date: '08 Feb 2026', status: 'Published' },
          ].map((n, i) => (
            <div key={i} className={`p-3 rounded-xl ${theme.accentBg} flex items-center justify-between`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>{n.title}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{n.detail}</p>
                <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>{n.date}</p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${n.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{n.status}</span>
            </div>
          ))}
        </div>
      )}

      {commTab === 'Support Chat' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-2`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-2`}>Recent Support Conversations</h3>
          {[
            { school: 'Delhi Public School', subject: 'Fee receipt format change request', lastMsg: 'We need the receipt header updated with new logo.', time: '2h ago', status: 'Open' },
            { school: 'Navrachana Vidyani', subject: 'GPS tracking not updating', lastMsg: 'Issue persists on Bus #4 route. Please check.', time: '4h ago', status: 'In Progress' },
            { school: 'Udgam School', subject: 'Bulk SMS delivery failure', lastMsg: 'Parent group messages not going through since yesterday.', time: '1d ago', status: 'Open' },
          ].map((c, i) => (
            <div key={i} className={`p-3 rounded-xl ${theme.accentBg}`}>
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-bold ${theme.highlight}`}>{c.school}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${c.status === 'Open' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>{c.status}</span>
              </div>
              <p className={`text-[10px] font-bold ${theme.primaryText}`}>{c.subject}</p>
              <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>{c.lastMsg}</p>
              <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>{c.time}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
