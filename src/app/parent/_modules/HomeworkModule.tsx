'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { TabBar } from '@/components/shared';
import { CheckCircle, ChevronRight, Info, Smartphone, BookOpen } from 'lucide-react';
import type { ChildProfile } from '../_components/types';
import { homeworkData } from '../_components/data';

export default function HomeworkModule({ theme, child }: { theme: Theme; child: ChildProfile }) {
  const hw = homeworkData[child.id];
  const [activeTab, setActiveTab] = useState('All');
  const [expandedHW, setExpandedHW] = useState<string | null>(null);
  const [acknowledgedDiary, setAcknowledgedDiary] = useState<Record<string, boolean>>({});

  // Helper: Info tooltip icon
  const InfoTip = ({ tip }: { tip: string }) => (
    <span title={tip} className="inline-block ml-1 cursor-help"><Info size={14} className={theme.iconColor} /></span>
  );

  // Helper: Mobile badge
  const MobileBadge = () => (
    <span className="inline-flex items-center gap-0.5 ml-1.5 text-[9px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold">
      <Smartphone size={9} /> Mobile
    </span>
  );

  // Diary entries
  const diaryEntries = [
    { id: 'D1', date: '12 Feb 2026', teacher: 'Mrs. Sunita Sharma', content: 'Aarav did very well in today\'s Math quiz. Please ensure he continues practicing Chapter 8 exercises at home.' },
    { id: 'D2', date: '11 Feb 2026', teacher: 'Dr. Meena Joshi', content: 'Science project materials needed by Friday. Please help arrange chart paper and colour markers.' },
    { id: 'D3', date: '10 Feb 2026', teacher: 'Mrs. Kavita Nair', content: 'Please sign the English literature essay and return the notebook by tomorrow.' },
    { id: 'D4', date: '09 Feb 2026', teacher: 'Mrs. Sunita Sharma', content: 'PTM reminder for 20th February. Please confirm attendance via SMS reply.' },
  ];

  const statusColors: Record<string, string> = {
    Pending: 'bg-amber-100 text-amber-700',
    Submitted: 'bg-blue-100 text-blue-700',
    Graded: 'bg-emerald-100 text-emerald-700',
    Overdue: 'bg-red-100 text-red-700',
  };

  const filtered = activeTab === 'All' ? hw.items : hw.items.filter(h => h.status === activeTab);

  const counts = {
    All: hw.items.length,
    Pending: hw.items.filter(h => h.status === 'Pending').length,
    Submitted: hw.items.filter(h => h.status === 'Submitted').length,
    Graded: hw.items.filter(h => h.status === 'Graded').length,
    Overdue: hw.items.filter(h => h.status === 'Overdue').length,
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className={`text-lg font-bold ${theme.highlight}`}>Homework</h2>
        <div className="flex gap-2">
          {Object.entries(counts).filter(([, v]) => v > 0).map(([k, v]) => (
            <span key={k} className={`text-[10px] px-2 py-1 rounded-lg font-bold ${
              k === 'Overdue' ? 'bg-red-100 text-red-700' : k === 'Pending' ? 'bg-amber-100 text-amber-700' : `${theme.secondaryBg} ${theme.iconColor}`
            }`}>
              {k}: {v}
            </span>
          ))}
        </div>
      </div>

      <TabBar tabs={['All', 'Pending', 'Submitted', 'Graded', 'Overdue', 'Diary']} active={activeTab} onChange={setActiveTab} theme={theme} />

      {/* ── Diary Tab ── */}
      {activeTab === 'Diary' && (
        <div className="space-y-4">
          <div className="flex items-center gap-1">
            <BookOpen size={14} className={theme.iconColor} />
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Daily Diary</h3>
            <InfoTip tip="Acknowledge daily diary entries from your child's teacher" />
            <MobileBadge />
          </div>
          <div className="space-y-3">
            {diaryEntries.map(entry => (
              <div key={entry.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] ${theme.iconColor}`}>{entry.date}</span>
                      <span className={`text-[10px] font-bold ${theme.primaryText}`}>{entry.teacher}</span>
                    </div>
                    <p className={`text-xs ${theme.highlight} leading-relaxed`}>{entry.content}</p>
                  </div>
                  <div className="shrink-0">
                    {acknowledgedDiary[entry.id] ? (
                      <span className="flex items-center gap-1 text-xs text-emerald-600 font-bold">
                        <CheckCircle size={14} /> Acknowledged
                      </span>
                    ) : (
                      <button
                        onClick={() => setAcknowledgedDiary(prev => ({ ...prev, [entry.id]: true }))}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}
                      >
                        <CheckCircle size={12} /> Acknowledge
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Homework List (all tabs except Diary) ── */}
      {activeTab !== 'Diary' && (
        <div className="space-y-3">
          {filtered.map((item) => (
            <div key={item.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden transition-all`}>
              <button
                onClick={() => setExpandedHW(expandedHW === item.id ? null : item.id)}
                className="w-full p-4 flex items-center gap-4 text-left"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold ${
                  item.status === 'Pending' ? 'bg-amber-500' : item.status === 'Submitted' ? 'bg-blue-500' : item.status === 'Graded' ? 'bg-emerald-500' : 'bg-red-500'
                }`}>
                  {item.subject.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-bold ${theme.highlight}`}>{item.title}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className={`text-[10px] ${theme.iconColor}`}>{item.subject}</span>
                    <span className={`text-[10px] ${theme.iconColor}`}>By: {item.assignedBy}</span>
                    <span className={`text-[10px] ${theme.iconColor}`}>Due: {item.dueDate}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {item.grade && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">{item.grade}</span>
                  )}
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${statusColors[item.status]}`}>{item.status}</span>
                  <ChevronRight size={14} className={`${theme.iconColor} transition-transform ${expandedHW === item.id ? 'rotate-90' : ''}`} />
                </div>
              </button>

              {expandedHW === item.id && (
                <div className={`px-4 pb-4 border-t ${theme.border}`}>
                  <div className={`mt-3 p-3 rounded-xl ${theme.secondaryBg}`}>
                    <p className={`text-xs font-bold ${theme.highlight} mb-1`}>Assignment Details</p>
                    <p className={`text-xs ${theme.iconColor} leading-relaxed`}>{item.description}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <span className={`text-[10px] ${theme.iconColor}`}>Assigned: {item.assignedDate}</span>
                    <span className={`text-[10px] ${theme.iconColor}`}>Due: {item.dueDate}</span>
                  </div>
                  {item.remarks && (
                    <div className={`mt-2 p-2 rounded-lg border-l-2 border-emerald-500 ${theme.secondaryBg}`}>
                      <p className={`text-[10px] font-bold ${theme.highlight}`}>Teacher Feedback:</p>
                      <p className={`text-[10px] ${theme.iconColor} italic`}>&quot;{item.remarks}&quot;</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {filtered.length === 0 && (
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-8 text-center`}>
              <CheckCircle size={32} className="text-emerald-500 mx-auto mb-2" />
              <p className={`text-sm font-bold ${theme.highlight}`}>No homework in this category</p>
              <p className={`text-xs ${theme.iconColor} mt-1`}>All caught up!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
