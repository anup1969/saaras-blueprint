'use client';

import React, { useState, useEffect } from 'react';
import { type Theme } from '@/lib/themes';
import { TabBar, StatusBadge } from '@/components/shared';
import { ClipboardCheck, MessageSquare, Plus, ArrowRightLeft, Trash2, Eye } from 'lucide-react';

interface FeedbackItem {
  id: string;
  page: string;
  element_label: string;
  feedback_type: string;
  remark: string;
  submitted_by: string;
  priority: string;
  status: string;
  moderation_status: string;
  admin_notes: string | null;
  created_at: string;
}

const TYPE_COLORS: Record<string, string> = {
  comment: 'bg-blue-100 text-blue-700',
  add: 'bg-emerald-100 text-emerald-700',
  remove: 'bg-red-100 text-red-700',
  move: 'bg-purple-100 text-purple-700',
  change: 'bg-amber-100 text-amber-700',
};

const PRIORITY_DOTS: Record<string, string> = {
  high: 'bg-red-500',
  medium: 'bg-amber-500',
  low: 'bg-emerald-500',
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function YourInputsModule({ theme, userName }: { theme: Theme; userName: string }) {
  const [items, setItems] = useState<FeedbackItem[]>([]);
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userName) { setLoading(false); return; }
    fetch(`/api/feedback?submittedBy=${encodeURIComponent(userName)}`)
      .then(r => r.json())
      .then(data => { setItems(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [userName]);

  const counts = {
    total: items.length,
    approved: items.filter(i => i.moderation_status === 'approved' || i.moderation_status === 'modified').length,
    pending: items.filter(i => i.moderation_status === 'pending').length,
    resolved: items.filter(i => i.status === 'resolved').length,
  };

  const filtered = activeTab === 'All' ? items
    : activeTab === 'Approved' ? items.filter(i => i.moderation_status === 'approved' || i.moderation_status === 'modified')
    : activeTab === 'Pending' ? items.filter(i => i.moderation_status === 'pending')
    : items.filter(i => i.status === 'resolved');

  const typeIcon = (type: string) => {
    switch (type) {
      case 'add': return <Plus size={10} />;
      case 'remove': return <Trash2 size={10} />;
      case 'move': return <ArrowRightLeft size={10} />;
      case 'change': return <Eye size={10} />;
      default: return <MessageSquare size={10} />;
    }
  };

  if (loading) return <div className={`text-center py-12 ${theme.iconColor}`}>Loading your inputs...</div>;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${theme.primary} text-white`}>
          <ClipboardCheck size={20} />
        </div>
        <div className="flex-1">
          <h2 className={`text-lg font-bold ${theme.highlight}`}>Your Inputs</h2>
          <p className={`text-xs ${theme.iconColor}`}>{userName} &middot; {counts.total} submissions</p>
        </div>
      </div>

      {/* Summary stat row */}
      <div className="grid grid-cols-4 gap-3">
        {([
          ['Total', counts.total, 'bg-slate-500'],
          ['Approved', counts.approved, 'bg-emerald-500'],
          ['Pending', counts.pending, 'bg-amber-500'],
          ['Resolved', counts.resolved, 'bg-blue-500'],
        ] as [string, number, string][]).map(([label, value, color]) => (
          <div key={label} className={`${theme.cardBg} rounded-xl border ${theme.border} p-3 text-center`}>
            <div className={`w-8 h-8 rounded-lg ${color} text-white flex items-center justify-center mx-auto mb-1 text-sm font-bold`}>{value}</div>
            <p className={`text-[10px] font-bold ${theme.iconColor}`}>{label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <TabBar tabs={['All', 'Approved', 'Pending', 'Resolved']} active={activeTab} onChange={setActiveTab} theme={theme} />

      {/* Remark cards */}
      {filtered.length === 0 ? (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-8 text-center`}>
          <ClipboardCheck size={40} className={`mx-auto mb-3 ${theme.iconColor} opacity-40`} />
          <p className={`text-sm font-bold ${theme.highlight}`}>
            {items.length === 0 ? 'No inputs submitted yet' : `No ${activeTab.toLowerCase()} inputs`}
          </p>
          <p className={`text-xs ${theme.iconColor} mt-1`}>
            {items.length === 0 ? 'Use Shift+Click on any element to share your feedback.' : 'Try a different filter.'}
          </p>
        </div>
      ) : (
        <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
          {filtered.map(item => (
            <div key={item.id} className={`${theme.cardBg} rounded-xl border ${theme.border} p-3 space-y-2`}>
              <div className="flex items-start gap-2">
                {/* Type badge + priority */}
                <div className="flex flex-col items-center gap-1 pt-0.5">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold flex items-center gap-1 ${TYPE_COLORS[item.feedback_type] || 'bg-slate-100 text-slate-600'}`}>
                    {typeIcon(item.feedback_type)}
                    {item.feedback_type}
                  </span>
                  {item.priority && <span className={`w-2 h-2 rounded-full ${PRIORITY_DOTS[item.priority] || 'bg-slate-400'}`} />}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${theme.highlight}`}>{item.remark}</p>
                  <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>
                    {item.element_label && <span className="font-medium">{item.element_label}</span>}
                    {item.element_label && item.page && ' · '}
                    {item.page && <span>{item.page.replace('/', '').replace(/-/g, ' ')}</span>}
                  </p>
                </div>

                {/* Status badges */}
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <StatusBadge status={item.moderation_status === 'modified' ? 'Approved' : item.moderation_status.charAt(0).toUpperCase() + item.moderation_status.slice(1)} theme={theme} />
                  {item.status === 'resolved' && <StatusBadge status="Cleared" theme={theme} />}
                </div>
              </div>

              {/* CTO notes */}
              {item.admin_notes && (
                <div className={`${theme.secondaryBg} rounded-lg px-3 py-2 border ${theme.border}`}>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-0.5`}>CTO Notes</p>
                  <p className={`text-xs ${theme.highlight}`}>{item.admin_notes}</p>
                </div>
              )}

              {/* Timestamp */}
              <p className={`text-[10px] ${theme.iconColor}`}>Submitted {timeAgo(item.created_at)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
