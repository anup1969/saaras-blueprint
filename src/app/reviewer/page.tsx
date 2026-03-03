'use client';

import { useState, useEffect } from 'react';
import BlueprintLayout from '@/components/BlueprintLayout';
import { type Theme } from '@/lib/themes';
import { type TeamMember } from '@/lib/auth';
import { getMyRemarks, updateReviewStatus, getFeedbackDetail, type FeedbackItem } from '@/lib/supabase';
import {
  Eye, Clock, CheckCircle, XCircle, MessageSquare, Filter,
  Camera, ExternalLink, ThumbsUp, ThumbsDown, X, AlertCircle,
  ArrowRight, Send
} from 'lucide-react';

type FilterType = 'all' | 'awaiting' | 'approved' | 'rejected' | 'review' | 'accepted' | 'needs_changes';

function getStatusPipeline(item: FeedbackItem) {
  const ms = item.moderation_status;
  const s = item.status;
  const rs = item.review_status;

  if (ms === 'rejected') return { label: 'Rejected', color: 'bg-red-500/20 text-red-400', step: 1 };
  if (ms === 'pending') return { label: 'Awaiting Decision', color: 'bg-slate-500/20 text-slate-400', step: 0 };
  if (ms === 'modified' && s !== 'resolved') return { label: 'Modified — In Progress', color: 'bg-amber-500/20 text-amber-400', step: 2 };
  if ((ms === 'approved' || ms === 'modified') && s === 'open') return { label: 'Approved — Not Started', color: 'bg-blue-500/20 text-blue-400', step: 1 };
  if ((ms === 'approved' || ms === 'modified') && s === 'in_progress') return { label: 'Approved — In Progress', color: 'bg-amber-500/20 text-amber-400', step: 2 };
  if (s === 'resolved' && rs === 'pending_review') return { label: 'Done — Please Review', color: 'bg-purple-500/20 text-purple-400', step: 3 };
  if (s === 'resolved' && rs === 'accepted') return { label: 'Verified', color: 'bg-emerald-500/20 text-emerald-400', step: 4 };
  if (s === 'resolved' && rs === 'needs_changes') return { label: 'Needs Changes', color: 'bg-red-500/20 text-red-400', step: 3 };
  if (s === 'resolved') return { label: 'Resolved', color: 'bg-emerald-500/20 text-emerald-400', step: 3 };

  return { label: 'Open', color: 'bg-slate-500/20 text-slate-400', step: 0 };
}

function matchesFilter(item: FeedbackItem, filter: FilterType): boolean {
  if (filter === 'all') return true;
  const ms = item.moderation_status;
  const s = item.status;
  const rs = item.review_status;
  switch (filter) {
    case 'awaiting': return ms === 'pending';
    case 'approved': return (ms === 'approved' || ms === 'modified') && s !== 'resolved';
    case 'rejected': return ms === 'rejected';
    case 'review': return s === 'resolved' && rs === 'pending_review';
    case 'accepted': return s === 'resolved' && rs === 'accepted';
    case 'needs_changes': return s === 'resolved' && rs === 'needs_changes';
    default: return true;
  }
}

function ReviewerPage({ theme, currentUser }: { theme?: Theme; currentUser?: TeamMember }) {
  const [remarks, setRemarks] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');
  const [toast, setToast] = useState('');
  const [commentingId, setCommentingId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [screenshotModal, setScreenshotModal] = useState<{ id: string; loading: boolean; base64: string | null } | null>(null);

  if (!theme || !currentUser) return null;

  const loadRemarks = async () => {
    setLoading(true);
    const data = await getMyRemarks(currentUser.name);
    setRemarks(data);
    setLoading(false);
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => { loadRemarks(); }, [currentUser.name]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const handleAccept = async (id: string) => {
    setSubmitting(true);
    const ok = await updateReviewStatus(id, 'accepted');
    showToast(ok ? 'Marked as Verified' : 'Error updating');
    setSubmitting(false);
    loadRemarks();
  };

  const handleNeedsChanges = async (id: string) => {
    if (!commentText.trim()) {
      showToast('Please add a comment explaining what needs changes');
      return;
    }
    setSubmitting(true);
    const ok = await updateReviewStatus(id, 'needs_changes', commentText.trim());
    showToast(ok ? 'Sent back for changes' : 'Error updating');
    setSubmitting(false);
    setCommentingId(null);
    setCommentText('');
    loadRemarks();
  };

  const openScreenshot = async (id: string) => {
    setScreenshotModal({ id, loading: true, base64: null });
    const detail = await getFeedbackDetail(id);
    setScreenshotModal({ id, loading: false, base64: detail?.screenshot_base64 || null });
  };

  const getDashboardUrl = (page: string) => {
    const slug = page.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    return `/${slug}`;
  };

  const filtered = remarks.filter(r => matchesFilter(r, filter));

  // Stats
  const total = remarks.length;
  const pendingDecision = remarks.filter(r => r.moderation_status === 'pending').length;
  const approvedDone = remarks.filter(r => r.status === 'resolved' && r.review_status === 'accepted').length;
  const needsMyReview = remarks.filter(r => r.status === 'resolved' && r.review_status === 'pending_review').length;

  const filters: { key: FilterType; label: string; count?: number }[] = [
    { key: 'all', label: 'All', count: total },
    { key: 'awaiting', label: 'Awaiting Decision', count: pendingDecision },
    { key: 'approved', label: 'In Progress' },
    { key: 'rejected', label: 'Rejected' },
    { key: 'review', label: 'Needs My Review', count: needsMyReview },
    { key: 'accepted', label: 'Verified' },
    { key: 'needs_changes', label: 'Needs Changes' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6`}>
        <h1 className={`text-2xl font-bold ${theme.highlight} flex items-center gap-3`}>
          <Eye size={24} className="text-purple-500" />
          My Remarks
        </h1>
        <p className={`text-sm ${theme.iconColor} mt-1`}>
          Track your submitted feedback and review implementations. Logged in as <span className="font-bold">{currentUser.name}</span>.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: MessageSquare, label: 'Total', value: total, color: 'text-blue-400' },
          { icon: Clock, label: 'Pending Decision', value: pendingDecision, color: 'text-yellow-400' },
          { icon: CheckCircle, label: 'Verified', value: approvedDone, color: 'text-emerald-400' },
          { icon: AlertCircle, label: 'Needs My Review', value: needsMyReview, color: 'text-purple-400' },
        ].map((s, i) => (
          <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 text-center`}>
            <s.icon size={20} className={`${s.color} mx-auto mb-1`} />
            <p className={`text-2xl font-bold ${theme.highlight}`}>{s.value}</p>
            <p className={`text-[10px] ${theme.iconColor} font-bold uppercase`}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-1.5">
        {filters.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
              filter === f.key
                ? `${theme.primary} text-white`
                : `${theme.cardBg} border ${theme.border} ${theme.iconColor} hover:opacity-80`
            }`}
          >
            {f.label}
            {f.count !== undefined && <span className="ml-1 opacity-70">({f.count})</span>}
          </button>
        ))}
      </div>

      {/* Remark Cards */}
      {loading ? (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-12 text-center`}>
          <span className="w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin inline-block" />
          <p className={`text-sm ${theme.iconColor} mt-3`}>Loading your remarks...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-12 text-center`}>
          <MessageSquare size={32} className={`${theme.iconColor} opacity-30 mx-auto mb-2`} />
          <p className={`text-sm ${theme.iconColor}`}>
            {filter === 'all' ? 'No remarks submitted yet.' : 'No remarks match this filter.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(item => {
            const pipeline = getStatusPipeline(item);
            const canReview = item.status === 'resolved' && item.review_status === 'pending_review';
            const isCommenting = commentingId === item.id;

            return (
              <div key={item.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
                {/* Top row: page + date + status badge */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${theme.secondaryBg} ${theme.iconColor}`}>
                      {item.page}
                    </span>
                    {item.element_label && (
                      <span className="text-purple-400 text-[10px] font-bold truncate max-w-[200px]">
                        {item.element_label}
                      </span>
                    )}
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      item.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                      item.priority === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-slate-700 text-slate-400'
                    }`}>{item.priority}</span>
                  </div>
                  <span className={`text-[10px] ${theme.iconColor} shrink-0 ml-2`}>
                    {item.created_at ? new Date(item.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
                  </span>
                </div>

                {/* Remark text */}
                <p className={`text-sm ${theme.highlight} mb-2`}>{item.remark}</p>
                {item.original_remark && item.original_remark !== item.remark && (
                  <p className={`text-[10px] ${theme.iconColor} italic mb-2`}>
                    Original: {item.original_remark}
                  </p>
                )}

                {/* Status pipeline */}
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${pipeline.color}`}>
                    {pipeline.label}
                  </span>
                  {item.feedback_type && (
                    <span className={`text-[10px] font-bold ${theme.iconColor}`}>{item.feedback_type}</span>
                  )}
                  {/* Screenshot + Open Page links */}
                  {item.id && (
                    <button
                      onClick={() => openScreenshot(item.id!)}
                      className="flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-all"
                    >
                      <Camera size={9} /> Screenshot
                    </button>
                  )}
                  <a
                    href={getDashboardUrl(item.page)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all"
                  >
                    <ExternalLink size={9} /> Open Page
                  </a>
                </div>

                {/* Step indicator */}
                <div className="flex items-center gap-1 mb-3">
                  {['Submitted', 'Decision', 'Work', 'Review', 'Done'].map((step, i) => (
                    <div key={step} className="flex items-center gap-1">
                      <div className={`w-1.5 h-1.5 rounded-full ${i <= pipeline.step ? 'bg-purple-500' : `${theme.secondaryBg} border ${theme.border}`}`} />
                      <span className={`text-[8px] ${i <= pipeline.step ? 'text-purple-400 font-bold' : theme.iconColor}`}>{step}</span>
                      {i < 4 && <ArrowRight size={8} className={theme.iconColor} />}
                    </div>
                  ))}
                </div>

                {/* Admin notes */}
                {item.admin_notes && (
                  <div className={`${theme.secondaryBg} rounded-xl px-3 py-2 mb-2`}>
                    <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-0.5`}>Piush's Notes</p>
                    <p className={`text-xs ${theme.highlight}`}>{item.admin_notes}</p>
                  </div>
                )}

                {/* Reviewer's own previous comment */}
                {item.reviewer_comment && (
                  <div className={`border-l-2 border-red-500 pl-3 mb-2`}>
                    <p className={`text-[10px] font-bold text-red-400 mb-0.5`}>Your Comment</p>
                    <p className={`text-xs ${theme.highlight}`}>{item.reviewer_comment}</p>
                  </div>
                )}

                {/* Review actions */}
                {canReview && !isCommenting && (
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleAccept(item.id!)}
                      disabled={submitting}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-all disabled:opacity-50"
                    >
                      <ThumbsUp size={12} /> Looks Good
                    </button>
                    <button
                      onClick={() => { setCommentingId(item.id!); setCommentText(''); }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
                    >
                      <ThumbsDown size={12} /> Needs Changes
                    </button>
                  </div>
                )}

                {/* Comment textarea for Needs Changes */}
                {isCommenting && (
                  <div className="mt-3 space-y-2">
                    <textarea
                      value={commentText}
                      onChange={e => setCommentText(e.target.value)}
                      placeholder="What needs to change? Be specific..."
                      className={`w-full ${theme.secondaryBg} border ${theme.border} ${theme.highlight} text-xs rounded-xl p-2.5 outline-none focus:border-purple-500 resize-none`}
                      rows={3}
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleNeedsChanges(item.id!)}
                        disabled={submitting || !commentText.trim()}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all disabled:opacity-50"
                      >
                        <Send size={12} /> Submit
                      </button>
                      <button
                        onClick={() => { setCommentingId(null); setCommentText(''); }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold ${theme.secondaryBg} ${theme.iconColor}`}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Screenshot Modal */}
      {screenshotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setScreenshotModal(null)}>
          <div className={`${theme.cardBg} border ${theme.border} rounded-2xl shadow-2xl w-full max-w-lg p-5`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-sm font-bold ${theme.highlight} flex items-center gap-2`}>
                <Camera size={16} className="text-purple-400" /> Remark Screenshot
              </h3>
              <button onClick={() => setScreenshotModal(null)} className={`${theme.iconColor} hover:text-red-400`}><X size={16} /></button>
            </div>
            {screenshotModal.loading ? (
              <div className="flex items-center justify-center py-12">
                <span className="w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
                <span className={`ml-2 text-sm ${theme.iconColor}`}>Loading screenshot...</span>
              </div>
            ) : screenshotModal.base64 ? (
              <img src={screenshotModal.base64} alt="Remark screenshot" className="w-full rounded-xl border border-slate-700" />
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <Camera size={32} className={`${theme.iconColor} opacity-30 mb-2`} />
                <p className={`text-sm ${theme.iconColor}`}>No screenshot available</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-purple-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <BlueprintLayout>
      <ReviewerPage />
    </BlueprintLayout>
  );
}
