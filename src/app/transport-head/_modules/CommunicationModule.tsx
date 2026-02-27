'use client';

import React, { useState } from 'react';
import { TabBar } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import { ChatsView } from '@/components/ChatModule';

export default function CommunicationModule({ theme }: { theme: Theme }) {
  const [commTab, setCommTab] = useState('Chat');
  const tabs = ['Messages', 'Route Alerts', 'Chat'];

  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Communication</h1>
      <TabBar tabs={tabs} active={commTab} onChange={setCommTab} theme={theme} />

      {commTab === 'Chat' && (
        <div className="h-[calc(100vh-220px)]">
          <ChatsView theme={theme} compact />
        </div>
      )}

      {commTab === 'Messages' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-2`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-2`}>Recent Messages</h3>
          {[
            { from: 'Ramesh Kumar (Driver)', text: 'Route A bus has a flat tyre near Jodhpur Cross Roads. Need replacement.', time: '07:45 AM' },
            { from: 'Mrs. Priya Nair (Parent)', text: 'Arjun will not be taking the bus this week. Please note.', time: '08:10 AM' },
            { from: 'Admin Office', text: 'New student added to Route A — pickup from Shyamal Cross Roads.', time: '09:30 AM' },
          ].map((m, i) => (
            <div key={i} className={`p-3 rounded-xl ${theme.accentBg}`}>
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-bold ${theme.highlight}`}>{m.from}</span>
                <span className={`text-[10px] ${theme.iconColor}`}>{m.time}</span>
              </div>
              <p className={`text-xs ${theme.iconColor}`}>{m.text}</p>
            </div>
          ))}
        </div>
      )}

      {commTab === 'Route Alerts' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-2`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-2`}>Route Alerts</h3>
          {[
            { route: 'Route A (RT-001)', alert: 'Bus delayed by 15 min due to traffic at SG Highway', time: '07:30 AM', severity: 'Warning' },
            { route: 'Route D (RT-004)', alert: 'Vehicle stopped at Isanpur Circle — minor engine issue', time: '06:00 AM', severity: 'Critical' },
            { route: 'Route F (RT-006)', alert: 'Alternate route active due to road construction near Motera', time: 'Yesterday', severity: 'Info' },
          ].map((a, i) => (
            <div key={i} className={`p-3 rounded-xl ${theme.accentBg} flex items-center gap-3`}>
              <div className={`w-2 h-2 rounded-full ${a.severity === 'Critical' ? 'bg-red-500' : a.severity === 'Warning' ? 'bg-amber-500' : 'bg-blue-500'}`} />
              <div className="flex-1">
                <p className={`text-xs font-bold ${theme.highlight}`}>{a.route}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{a.alert}</p>
              </div>
              <span className={`text-[10px] ${theme.iconColor}`}>{a.time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
