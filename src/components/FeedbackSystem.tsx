'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { MessageSquarePlus, X, Send, MessageCircle, ChevronUp, ChevronDown, Mic } from 'lucide-react';
import { submitFeedback, getFeedback, type FeedbackItem } from '@/lib/supabase';

interface FeedbackPosition {
  x: number;
  y: number;
  elementLabel: string;
  elementSelector: string;
}

export default function FeedbackSystem({ currentPage, currentUser }: { currentPage: string; currentUser: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<FeedbackPosition | null>(null);
  const [feedbackType, setFeedbackType] = useState<string>('comment');
  const [remark, setRemark] = useState('');
  const [priority, setPriority] = useState<string>('medium');
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);
  const [showPanel, setShowPanel] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [interimText, setInterimText] = useState('');
  const recognitionRef = React.useRef<any>(null);
  const shouldRestartRef = React.useRef(false);
  const remarkRef = React.useRef(remark);

  // Keep remarkRef in sync
  useEffect(() => { remarkRef.current = remark; }, [remark]);

  // Check if Speech Recognition is supported
  const speechSupported = typeof window !== 'undefined' && ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

  const stopListening = useCallback(() => {
    shouldRestartRef.current = false;
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
      recognitionRef.current = null;
    }
    setIsListening(false);
    setInterimText('');
  }, []);

  const startListening = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    // Clean up any existing instance
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      let finalText = '';
      let interimResult = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalText += transcript;
        } else {
          interimResult += transcript;
        }
      }

      // Show interim text live (gray preview)
      setInterimText(interimResult);

      // Append final text to remark
      if (finalText) {
        setRemark(prev => {
          const separator = prev && !prev.endsWith(' ') && !prev.endsWith('\n') ? ' ' : '';
          return prev + separator + finalText.trim();
        });
        setInterimText('');
      }
    };

    recognition.onerror = (event: any) => {
      // 'no-speech' and 'aborted' are normal — auto-restart
      if (event.error === 'no-speech' || event.error === 'aborted') {
        return; // onend will handle restart
      }
      // Real errors — stop completely
      stopListening();
    };

    recognition.onend = () => {
      // Auto-restart if user hasn't clicked stop
      // This is the KEY fix — Speech API stops after silence, we restart it
      if (shouldRestartRef.current) {
        try {
          setTimeout(() => {
            if (shouldRestartRef.current && recognitionRef.current === recognition) {
              recognition.start();
            }
          }, 100);
        } catch {
          stopListening();
        }
      } else {
        setIsListening(false);
        setInterimText('');
        recognitionRef.current = null;
      }
    };

    try {
      recognition.start();
      recognitionRef.current = recognition;
      shouldRestartRef.current = true;
      setIsListening(true);
      setInterimText('');
    } catch {
      stopListening();
    }
  }, [stopListening]);

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Clean up recognition when popup closes
  useEffect(() => {
    if (!isOpen) {
      stopListening();
    }
  }, [isOpen, stopListening]);

  // Load feedback for current page
  useEffect(() => {
    getFeedback(currentPage).then(setFeedbackItems).catch(console.error);
  }, [currentPage]);

  const openCount = feedbackItems.filter(f => f.status === 'open').length;

  // Shift+Click handler
  const handleShiftClick = useCallback((e: MouseEvent) => {
    if (!e.shiftKey) return;
    e.preventDefault();
    e.stopPropagation();

    const target = e.target as HTMLElement;
    const label = target.textContent?.slice(0, 80) || target.tagName;
    const selector = getSelector(target);

    setPosition({ x: e.clientX, y: e.clientY, elementLabel: label, elementSelector: selector });
    setIsOpen(true);
    setRemark('');
    setFeedbackType('comment');
    setPriority('medium');
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleShiftClick, true);
    return () => document.removeEventListener('click', handleShiftClick, true);
  }, [handleShiftClick]);

  const handleSubmit = async () => {
    if (!remark.trim()) return;
    setSubmitting(true);
    try {
      await submitFeedback({
        page: currentPage,
        element_label: position?.elementLabel || '',
        element_selector: position?.elementSelector || '',
        feedback_type: feedbackType as FeedbackItem['feedback_type'],
        remark: remark.trim(),
        submitted_by: currentUser,
        priority: priority as FeedbackItem['priority'],
      });
      setIsOpen(false);
      setPosition(null);
      setToast('Feedback submitted!');
      setTimeout(() => setToast(''), 2500);
      // Refresh
      const items = await getFeedback(currentPage);
      setFeedbackItems(items);
    } catch (err) {
      console.error(err);
      setToast('Error submitting feedback');
      setTimeout(() => setToast(''), 2500);
    }
    setSubmitting(false);
  };

  return (
    <>
      {/* Shift+Click hint */}
      <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2">
        <button
          onClick={() => setShowPanel(!showPanel)}
          className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold shadow-lg hover:bg-purple-700 transition-all"
        >
          <MessageSquarePlus size={14} />
          Feedback {openCount > 0 && <span className="bg-white text-purple-600 px-1.5 py-0.5 rounded-full text-[10px] font-bold">{openCount}</span>}
        </button>
        <span className="text-[10px] text-slate-400 bg-slate-800/80 px-2 py-1 rounded-lg">
          Shift+Click any element to leave feedback
        </span>
      </div>

      {/* Feedback panel (all remarks for this page) */}
      {showPanel && (
        <div className="fixed bottom-14 left-4 z-50 w-96 max-h-[60vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
            <h3 className="text-sm font-bold text-white">Feedback — {currentPage}</h3>
            <button onClick={() => setShowPanel(false)} className="text-slate-400 hover:text-white"><X size={16} /></button>
          </div>
          <div className="overflow-y-auto max-h-[50vh] p-3 space-y-2">
            {feedbackItems.length === 0 ? (
              <p className="text-slate-500 text-xs text-center py-8">No feedback yet for this page</p>
            ) : feedbackItems.map((item) => (
              <div key={item.id} className={`p-3 rounded-xl border text-xs ${
                item.status === 'resolved' ? 'bg-slate-800/50 border-slate-800 opacity-50' : 'bg-slate-800 border-slate-700'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      item.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                      item.priority === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-slate-700 text-slate-400'
                    }`}>{item.priority}</span>
                    <span className="text-purple-400 font-bold">{item.feedback_type}</span>
                  </div>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    item.status === 'open' ? 'bg-amber-500/20 text-amber-400' :
                    item.status === 'resolved' ? 'bg-emerald-500/20 text-emerald-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>{item.status}</span>
                </div>
                <p className="text-slate-300 mt-1">{item.remark}</p>
                <div className="flex items-center justify-between mt-2 text-slate-500">
                  <span>on: {item.element_label?.slice(0, 40)}</span>
                  <span>by {item.submitted_by}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Feedback form (appears on Shift+Click) */}
      {isOpen && position && (
        <div className="fixed inset-0 z-50" onClick={() => setIsOpen(false)}>
          <div
            className="absolute bg-slate-900 border border-purple-500/50 rounded-2xl shadow-2xl p-4 w-80"
            style={{ left: Math.min(position.x, window.innerWidth - 340), top: Math.min(position.y, window.innerHeight - 400) }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <MessageCircle size={14} className="text-purple-400" /> Leave Feedback
              </h4>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white"><X size={14} /></button>
            </div>

            <p className="text-[10px] text-slate-500 mb-2 truncate">
              Element: <span className="text-purple-400">{position.elementLabel.slice(0, 60)}</span>
            </p>

            {/* Feedback type */}
            <div className="flex gap-1 mb-3 flex-wrap">
              {['remove', 'move', 'change', 'add', 'comment'].map(t => (
                <button
                  key={t}
                  onClick={() => setFeedbackType(t)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                    feedbackType === t ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {t === 'remove' ? 'Remove this' : t === 'move' ? 'Move this' : t === 'change' ? 'Change to...' : t === 'add' ? 'Add here' : 'Comment'}
                </button>
              ))}
            </div>

            {/* Remark with voice input */}
            <div className="relative">
              <textarea
                value={remark}
                onChange={e => setRemark(e.target.value)}
                placeholder="Describe what you want..."
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 pr-10 outline-none focus:border-purple-500 resize-none"
                rows={3}
                autoFocus
              />
              <button
                onClick={toggleListening}
                disabled={!speechSupported}
                className={`absolute top-2 right-2 p-1.5 rounded-lg transition-all ${
                  !speechSupported
                    ? 'text-slate-600 cursor-not-allowed'
                    : isListening
                    ? 'text-red-400 bg-red-500/20 animate-pulse'
                    : 'text-slate-400 hover:text-purple-400 hover:bg-slate-700'
                }`}
                title={
                  !speechSupported
                    ? 'Voice input not supported in this browser'
                    : isListening
                    ? 'Stop listening'
                    : 'Start voice input'
                }
              >
                <Mic size={14} />
                {isListening && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500 animate-ping" />
                )}
              </button>
            </div>
            {isListening && (
              <div className="mt-1">
                {interimText && (
                  <p className="text-[10px] text-slate-500 italic mb-0.5">...{interimText}</p>
                )}
                <p className="text-[10px] text-red-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  Listening — speak naturally, pauses are OK. Click mic to stop.
                </p>
              </div>
            )}

            {/* Priority */}
            <div className="flex items-center gap-2 mt-2 mb-3">
              <span className="text-[10px] text-slate-500">Priority:</span>
              {['low', 'medium', 'high'].map(p => (
                <button
                  key={p}
                  onClick={() => setPriority(p)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    priority === p
                      ? p === 'high' ? 'bg-red-500/20 text-red-400' : p === 'medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700 text-slate-300'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!remark.trim() || submitting}
              className="w-full py-2 bg-purple-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={12} /> {submitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-purple-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg">
          {toast}
        </div>
      )}
    </>
  );
}

// Helper: generate a readable CSS selector for an element
function getSelector(el: HTMLElement): string {
  if (el.id) return `#${el.id}`;
  const parts: string[] = [];
  let current: HTMLElement | null = el;
  let depth = 0;
  while (current && depth < 4) {
    let part = current.tagName.toLowerCase();
    if (current.className && typeof current.className === 'string') {
      const cls = current.className.split(' ').filter(c => !c.startsWith('__') && c.length < 30).slice(0, 2).join('.');
      if (cls) part += `.${cls}`;
    }
    parts.unshift(part);
    current = current.parentElement;
    depth++;
  }
  return parts.join(' > ');
}
