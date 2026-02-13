'use client';

import React, { useState, useEffect } from 'react';
import {
  X, CheckCircle2, Circle, Calendar, Clock, AlertTriangle,
  ListTodo, ArrowRight, Flag
} from 'lucide-react';
import type { Theme } from '@/lib/themes';

// ─── TYPES ───────────────────────────────────────────
type Priority = 'High' | 'Medium' | 'Low';
type TriggerMode = 'login' | 'idle';

interface MockTask {
  id: string;
  title: string;
  priority: Priority;
  dueLabel: string;
  dueDate: Date;
  completed: boolean;
  overdue: boolean;
}

// ─── MOCK DATA ───────────────────────────────────────
function generateMockTasks(): MockTask[] {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const in2Days = new Date(today);
  in2Days.setDate(in2Days.getDate() + 2);
  const in3Days = new Date(today);
  in3Days.setDate(in3Days.getDate() + 3);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  return [
    {
      id: '1',
      title: 'Review quarterly fee collection report',
      priority: 'High',
      dueLabel: 'Due today',
      dueDate: today,
      completed: false,
      overdue: false,
    },
    {
      id: '2',
      title: 'Approve leave requests (3 pending)',
      priority: 'High',
      dueLabel: 'Due today',
      dueDate: today,
      completed: false,
      overdue: false,
    },
    {
      id: '3',
      title: 'Update student attendance records',
      priority: 'Medium',
      dueLabel: 'Due tomorrow',
      dueDate: tomorrow,
      completed: false,
      overdue: false,
    },
    {
      id: '4',
      title: 'Prepare PTM agenda for Grade 8',
      priority: 'Medium',
      dueLabel: 'Due in 2 days',
      dueDate: in2Days,
      completed: false,
      overdue: false,
    },
    {
      id: '5',
      title: 'Submit transport route changes',
      priority: 'Low',
      dueLabel: 'Due in 3 days',
      dueDate: in3Days,
      completed: false,
      overdue: false,
    },
    {
      id: '6',
      title: 'Complete staff appraisal forms',
      priority: 'Low',
      dueLabel: 'Due next week',
      dueDate: nextWeek,
      completed: false,
      overdue: false,
    },
  ];
}

// ─── HELPERS ─────────────────────────────────────────
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function getFormattedDate(): string {
  return new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

const priorityStyles: Record<Priority, { bg: string; text: string; border: string }> = {
  High: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' },
  Medium: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200' },
  Low: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
};

// ─── COMPONENT ───────────────────────────────────────
interface TaskTrackerPopupProps {
  theme: Theme;
  userName: string;
  isOpen: boolean;
  onClose: () => void;
  triggerMode: TriggerMode;
  onDisableLoginPopup?: () => void;
}

export default function TaskTrackerPopup({
  theme,
  userName,
  isOpen,
  onClose,
  triggerMode,
  onDisableLoginPopup,
}: TaskTrackerPopupProps) {
  const [tasks, setTasks] = useState<MockTask[]>(generateMockTasks);
  const [dontShowOnLogin, setDontShowOnLogin] = useState(false);
  const [animate, setAnimate] = useState(false);

  // Entrance animation
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setAnimate(true), 10);
      return () => clearTimeout(timer);
    } else {
      setAnimate(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Toggle task completion
  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // Handle close with "don't show" preference
  const handleClose = () => {
    if (dontShowOnLogin && onDisableLoginPopup) {
      onDisableLoginPopup();
    }
    onClose();
  };

  // Stats
  const pendingCount = tasks.filter(t => !t.completed).length;
  const completedTodayCount = tasks.filter(t => t.completed).length;
  const overdueCount = tasks.filter(t => !t.completed && t.overdue).length;
  const displayTasks = tasks.slice(0, 5);

  // First name for greeting
  const firstName = userName.split(' ')[0];

  return (
    // Backdrop
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        animate ? 'bg-black/40 backdrop-blur-[2px]' : 'bg-transparent'
      }`}
      onClick={handleClose}
    >
      {/* Modal */}
      <div
        className={`w-full max-w-md mx-4 ${theme.cardBg} rounded-2xl shadow-2xl border ${theme.border} overflow-hidden transition-all duration-300 ${
          animate ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`${theme.primary} px-5 py-4 relative`}>
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 p-1 rounded-lg hover:bg-white/20 text-white/70 hover:text-white transition-all"
          >
            <X size={16} />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <ListTodo size={16} className="text-white/80" />
            <span className="text-[10px] text-white/60 uppercase font-bold tracking-wider">
              Task Tracker
            </span>
          </div>

          {triggerMode === 'login' ? (
            <>
              <h2 className="text-base font-bold text-white">
                {getGreeting()}, {firstName}!
              </h2>
              <p className="text-[11px] text-white/70 mt-0.5">
                {getFormattedDate()}
              </p>
            </>
          ) : (
            <>
              <h2 className="text-base font-bold text-white">
                You've been away — here's your task update
              </h2>
              <p className="text-[11px] text-white/70 mt-0.5">
                Welcome back, {firstName} &middot; {getFormattedDate()}
              </p>
            </>
          )}

          {/* Quick Stats */}
          <div className="flex gap-3 mt-3">
            <div className="flex items-center gap-1.5 bg-white/15 rounded-lg px-2.5 py-1.5">
              <Clock size={11} className="text-white/70" />
              <span className="text-[10px] text-white font-bold">{pendingCount}</span>
              <span className="text-[10px] text-white/60">pending</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/15 rounded-lg px-2.5 py-1.5">
              <AlertTriangle size={11} className="text-white/70" />
              <span className="text-[10px] text-white font-bold">{overdueCount}</span>
              <span className="text-[10px] text-white/60">overdue</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/15 rounded-lg px-2.5 py-1.5">
              <CheckCircle2 size={11} className="text-white/70" />
              <span className="text-[10px] text-white font-bold">{completedTodayCount}</span>
              <span className="text-[10px] text-white/60">done today</span>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="px-5 py-3 max-h-[300px] overflow-y-auto">
          <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-2 tracking-wide`}>
            Top Tasks
          </p>
          <div className="space-y-1.5">
            {displayTasks.map((task) => {
              const pStyle = priorityStyles[task.priority];
              return (
                <div
                  key={task.id}
                  className={`flex items-start gap-2.5 p-2.5 rounded-xl border ${theme.border} ${
                    task.completed ? 'opacity-50' : ''
                  } transition-all hover:${theme.secondaryBg.replace('bg-', 'bg-')}`}
                >
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="mt-0.5 shrink-0 transition-all"
                  >
                    {task.completed ? (
                      <CheckCircle2 size={16} className="text-emerald-500" />
                    ) : (
                      <Circle size={16} className={theme.iconColor} />
                    )}
                  </button>

                  {/* Task content */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs font-medium ${theme.highlight} leading-snug ${
                        task.completed ? 'line-through' : ''
                      }`}
                    >
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {/* Priority badge */}
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${pStyle.bg} ${pStyle.text} border ${pStyle.border} flex items-center gap-0.5`}
                      >
                        <Flag size={8} />
                        {task.priority}
                      </span>
                      {/* Due date */}
                      <span className={`text-[10px] ${theme.iconColor} flex items-center gap-0.5`}>
                        <Calendar size={8} />
                        {task.dueLabel}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className={`px-5 py-3 border-t ${theme.border} space-y-2.5`}>
          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleClose}
              className={`flex-1 px-3 py-2 rounded-xl text-xs font-bold ${theme.secondaryBg} ${theme.iconColor} hover:opacity-80 transition-all`}
            >
              Dismiss
            </button>
            <button
              className={`flex-1 px-3 py-2 rounded-xl text-xs font-bold ${theme.primary} text-white flex items-center justify-center gap-1.5 hover:opacity-90 transition-all`}
            >
              View All Tasks
              <ArrowRight size={12} />
            </button>
          </div>

          {/* Don't show on login checkbox (only for login trigger) */}
          {triggerMode === 'login' && (
            <label className={`flex items-center gap-2 cursor-pointer`}>
              <input
                type="checkbox"
                checked={dontShowOnLogin}
                onChange={() => setDontShowOnLogin(!dontShowOnLogin)}
                className="w-3.5 h-3.5 rounded border-slate-300 text-slate-600 focus:ring-slate-500 accent-slate-600"
              />
              <span className={`text-[10px] ${theme.iconColor}`}>
                Don't show this on login
              </span>
            </label>
          )}
        </div>
      </div>
    </div>
  );
}
