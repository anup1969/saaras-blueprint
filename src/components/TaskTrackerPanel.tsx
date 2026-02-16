'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import {
  ListTodo, Plus, CheckCircle, Clock, Flag, Check, Search,
  ChevronRight, GripVertical, ArrowRight, X, Mic
} from 'lucide-react';

interface TaskTrackerPanelProps {
  theme: Theme;
  role: string;
}

const roleTasks: Record<string, Array<{ id: number; title: string; priority: 'high' | 'medium' | 'low'; assignee: string; days: string; status: 'open' | 'in progress' | 'done' }>> = {
  principal: [
    { id: 1, title: 'Review mid-term exam papers', priority: 'high', assignee: 'Self', days: '2d', status: 'open' },
    { id: 2, title: 'Approve staff leave requests (3)', priority: 'high', assignee: 'Self', days: 'Today', status: 'open' },
    { id: 3, title: 'Submit SQAAF self-assessment', priority: 'high', assignee: 'Self', days: '5d', status: 'open' },
    { id: 4, title: 'Prepare Annual Day speech', priority: 'medium', assignee: 'Self', days: '8d', status: 'open' },
    { id: 5, title: 'Review fee defaulter list', priority: 'high', assignee: 'VP', days: '1d', status: 'in progress' },
    { id: 6, title: 'Meeting with PTA committee', priority: 'medium', assignee: 'Self', days: '3d', status: 'open' },
    { id: 7, title: 'Finalize timetable changes', priority: 'low', assignee: 'VP', days: '12d', status: 'open' },
    { id: 8, title: 'Review bus route complaints', priority: 'medium', assignee: 'Transport Head', days: '4d', status: 'open' },
  ],
  teacher: [
    { id: 1, title: 'Mark attendance for 10-A & 8-A', priority: 'high', assignee: 'Self', days: 'Today', status: 'open' },
    { id: 2, title: 'Enter UT-4 marks for Class 10-B', priority: 'high', assignee: 'Self', days: '3d', status: 'open' },
    { id: 3, title: 'Grade homework — Ch 3 Linear Equations', priority: 'medium', assignee: 'Self', days: '1d', status: 'in progress' },
    { id: 4, title: 'Prepare UT-4 question paper', priority: 'high', assignee: 'Self', days: '2d', status: 'open' },
    { id: 5, title: 'Update lesson plan for next week', priority: 'medium', assignee: 'Self', days: '5d', status: 'open' },
    { id: 6, title: 'Submit monthly progress report', priority: 'medium', assignee: 'Self', days: '7d', status: 'open' },
    { id: 7, title: 'Review student project submissions', priority: 'low', assignee: 'Self', days: '10d', status: 'open' },
    { id: 8, title: 'Attend staff development workshop', priority: 'medium', assignee: 'Self', days: '8d', status: 'open' },
  ],
  student: [
    { id: 1, title: 'Submit Maths homework — Ch 7', priority: 'high', assignee: 'Self', days: 'Today', status: 'open' },
    { id: 2, title: 'Prepare for Science lab practical', priority: 'high', assignee: 'Self', days: '2d', status: 'open' },
    { id: 3, title: 'Complete English essay draft', priority: 'medium', assignee: 'Self', days: '3d', status: 'in progress' },
    { id: 4, title: 'Study for Pre-Board exam', priority: 'high', assignee: 'Self', days: '8d', status: 'open' },
    { id: 5, title: 'Return library books', priority: 'low', assignee: 'Self', days: '5d', status: 'open' },
    { id: 6, title: 'Collect PTM slip from class teacher', priority: 'medium', assignee: 'Self', days: '1d', status: 'open' },
    { id: 7, title: 'Submit project file — Social Studies', priority: 'medium', assignee: 'Self', days: '7d', status: 'open' },
    { id: 8, title: 'Practice for Annual Day performance', priority: 'low', assignee: 'Self', days: '12d', status: 'open' },
  ],
  parent: [
    { id: 1, title: 'Pay pending fee installment', priority: 'high', assignee: 'Self', days: '3d', status: 'open' },
    { id: 2, title: 'Attend PTM on 20 Feb', priority: 'high', assignee: 'Self', days: '8d', status: 'open' },
    { id: 3, title: 'Sign and return consent form', priority: 'medium', assignee: 'Self', days: '2d', status: 'open' },
    { id: 4, title: 'Review child progress report', priority: 'medium', assignee: 'Self', days: '1d', status: 'in progress' },
    { id: 5, title: 'Update emergency contact details', priority: 'low', assignee: 'Self', days: '10d', status: 'open' },
    { id: 6, title: 'Submit medical certificate', priority: 'high', assignee: 'Self', days: 'Today', status: 'open' },
    { id: 7, title: 'Approve bus route change request', priority: 'medium', assignee: 'Self', days: '5d', status: 'open' },
    { id: 8, title: 'Check Annual Day invitation', priority: 'low', assignee: 'Self', days: '14d', status: 'open' },
  ],
  'school-admin': [
    { id: 1, title: 'Process pending admission forms (5)', priority: 'high', assignee: 'Self', days: 'Today', status: 'open' },
    { id: 2, title: 'Generate fee defaulter report', priority: 'high', assignee: 'Self', days: '1d', status: 'open' },
    { id: 3, title: 'Update student records for Class 3', priority: 'medium', assignee: 'Self', days: '3d', status: 'in progress' },
    { id: 4, title: 'Send circular to all parents', priority: 'medium', assignee: 'Self', days: '2d', status: 'open' },
    { id: 5, title: 'Verify staff attendance records', priority: 'high', assignee: 'Self', days: '1d', status: 'open' },
    { id: 6, title: 'Review transport route complaints', priority: 'medium', assignee: 'Transport', days: '5d', status: 'open' },
    { id: 7, title: 'Complete monthly enrolment report', priority: 'low', assignee: 'Self', days: '10d', status: 'open' },
    { id: 8, title: 'Schedule parent orientation session', priority: 'medium', assignee: 'Self', days: '7d', status: 'open' },
  ],
  'super-admin': [
    { id: 1, title: 'Review platform uptime report', priority: 'high', assignee: 'Self', days: 'Today', status: 'open' },
    { id: 2, title: 'Approve new school onboarding', priority: 'high', assignee: 'Self', days: '1d', status: 'open' },
    { id: 3, title: 'Deploy v2.4 hotfix to production', priority: 'high', assignee: 'DevOps', days: '2d', status: 'in progress' },
    { id: 4, title: 'Review support ticket escalations', priority: 'medium', assignee: 'Self', days: '1d', status: 'open' },
    { id: 5, title: 'Update subscription plan pricing', priority: 'medium', assignee: 'Self', days: '5d', status: 'open' },
    { id: 6, title: 'Audit user access permissions', priority: 'medium', assignee: 'Self', days: '7d', status: 'open' },
    { id: 7, title: 'Review monthly MRR analytics', priority: 'low', assignee: 'Self', days: '10d', status: 'open' },
    { id: 8, title: 'Plan feature rollout for Q2', priority: 'low', assignee: 'Product', days: '14d', status: 'open' },
  ],
  trustee: [
    { id: 1, title: 'Review quarterly financial report', priority: 'high', assignee: 'Self', days: '2d', status: 'open' },
    { id: 2, title: 'Approve capital expenditure request', priority: 'high', assignee: 'Self', days: '1d', status: 'open' },
    { id: 3, title: 'Review SQAAF compliance status', priority: 'high', assignee: 'Self', days: '5d', status: 'in progress' },
    { id: 4, title: 'Approve board meeting agenda', priority: 'medium', assignee: 'Self', days: '3d', status: 'open' },
    { id: 5, title: 'Review staff hiring proposals', priority: 'medium', assignee: 'HR', days: '7d', status: 'open' },
    { id: 6, title: 'Sign off on annual budget', priority: 'high', assignee: 'Self', days: 'Today', status: 'open' },
    { id: 7, title: 'Review infrastructure audit report', priority: 'low', assignee: 'Self', days: '12d', status: 'open' },
    { id: 8, title: 'Prepare trust annual report', priority: 'medium', assignee: 'Self', days: '10d', status: 'open' },
  ],
  'vice-principal': [
    { id: 1, title: 'Assign substitute for Mrs. Sharma', priority: 'high', assignee: 'Self', days: 'Today', status: 'open' },
    { id: 2, title: 'Review discipline case — Arjun (9-B)', priority: 'high', assignee: 'Self', days: '1d', status: 'in progress' },
    { id: 3, title: 'Finalize exam schedule for Pre-Board', priority: 'high', assignee: 'Self', days: '3d', status: 'open' },
    { id: 4, title: 'Publish unit test circular', priority: 'medium', assignee: 'Self', days: '2d', status: 'open' },
    { id: 5, title: 'Update duty roster for Sports Day', priority: 'medium', assignee: 'Self', days: '5d', status: 'open' },
    { id: 6, title: 'Review teacher performance reports', priority: 'medium', assignee: 'Self', days: '7d', status: 'open' },
    { id: 7, title: 'Coordinate POCSO training session', priority: 'low', assignee: 'Self', days: '8d', status: 'open' },
    { id: 8, title: 'Complete timetable revision for March', priority: 'low', assignee: 'Self', days: '14d', status: 'open' },
  ],
  'hr-manager': [
    { id: 1, title: 'Process pending leave requests (3)', priority: 'high', assignee: 'Self', days: 'Today', status: 'open' },
    { id: 2, title: 'Complete onboarding for new joinee', priority: 'high', assignee: 'Self', days: '2d', status: 'in progress' },
    { id: 3, title: 'Prepare February payroll', priority: 'high', assignee: 'Self', days: '5d', status: 'open' },
    { id: 4, title: 'Update employee records — 3 pending', priority: 'medium', assignee: 'Self', days: '3d', status: 'open' },
    { id: 5, title: 'Schedule performance review meetings', priority: 'medium', assignee: 'Self', days: '7d', status: 'open' },
    { id: 6, title: 'Verify background checks for recruits', priority: 'medium', assignee: 'Self', days: '4d', status: 'open' },
    { id: 7, title: 'Draft staff welfare policy update', priority: 'low', assignee: 'Self', days: '12d', status: 'open' },
    { id: 8, title: 'Compile monthly attendance report', priority: 'medium', assignee: 'Self', days: '8d', status: 'open' },
  ],
  'accounts-head': [
    { id: 1, title: 'Send overdue fee reminders (28)', priority: 'high', assignee: 'Self', days: 'Today', status: 'open' },
    { id: 2, title: 'Process salary disbursement for Feb', priority: 'high', assignee: 'Self', days: '3d', status: 'open' },
    { id: 3, title: 'Review concession request — Kavya D.', priority: 'medium', assignee: 'Self', days: '1d', status: 'in progress' },
    { id: 4, title: 'Deposit cheques to bank (5 pending)', priority: 'high', assignee: 'Self', days: '1d', status: 'open' },
    { id: 5, title: 'Prepare monthly financial statement', priority: 'medium', assignee: 'Self', days: '5d', status: 'open' },
    { id: 6, title: 'Process vendor payments (2 pending)', priority: 'medium', assignee: 'Self', days: '4d', status: 'open' },
    { id: 7, title: 'Reconcile bank statement', priority: 'low', assignee: 'Self', days: '10d', status: 'open' },
    { id: 8, title: 'Generate quarterly expense report', priority: 'medium', assignee: 'Self', days: '8d', status: 'open' },
  ],
  receptionist: [
    { id: 1, title: 'Follow up on pending enquiries (3)', priority: 'high', assignee: 'Self', days: 'Today', status: 'open' },
    { id: 2, title: 'Update visitor log for CBSE inspection', priority: 'high', assignee: 'Self', days: '1d', status: 'open' },
    { id: 3, title: 'Distribute courier to departments', priority: 'medium', assignee: 'Self', days: 'Today', status: 'in progress' },
    { id: 4, title: 'Confirm appointments for tomorrow', priority: 'medium', assignee: 'Self', days: '1d', status: 'open' },
    { id: 5, title: 'Update school directory contacts', priority: 'low', assignee: 'Self', days: '7d', status: 'open' },
    { id: 6, title: 'Prepare admission enquiry report', priority: 'medium', assignee: 'Self', days: '3d', status: 'open' },
    { id: 7, title: 'Restock visitor badges', priority: 'low', assignee: 'Self', days: '5d', status: 'open' },
    { id: 8, title: 'Send parent communication for Annual Day', priority: 'medium', assignee: 'Self', days: '4d', status: 'open' },
  ],
  'transport-head': [
    { id: 1, title: 'Review morning route delay report', priority: 'high', assignee: 'Self', days: 'Today', status: 'open' },
    { id: 2, title: 'Schedule engine overhaul for GJ-01-MN', priority: 'high', assignee: 'Self', days: '2d', status: 'in progress' },
    { id: 3, title: 'Renew driver license — Suresh Parmar', priority: 'high', assignee: 'Self', days: '3d', status: 'open' },
    { id: 4, title: 'Add new student to Satellite route', priority: 'medium', assignee: 'Self', days: '1d', status: 'open' },
    { id: 5, title: 'Review fuel consumption report', priority: 'medium', assignee: 'Self', days: '5d', status: 'open' },
    { id: 6, title: 'Update GPS tracking system firmware', priority: 'low', assignee: 'IT', days: '10d', status: 'open' },
    { id: 7, title: 'Prepare monthly transport report', priority: 'medium', assignee: 'Self', days: '7d', status: 'open' },
    { id: 8, title: 'Inspect fire extinguishers on all buses', priority: 'medium', assignee: 'Self', days: '4d', status: 'open' },
  ],
  security: [
    { id: 1, title: 'Complete 10 AM campus patrol', priority: 'high', assignee: 'Self', days: 'Today', status: 'open' },
    { id: 2, title: 'Report expired fire extinguisher — Lab 2', priority: 'high', assignee: 'Self', days: 'Today', status: 'in progress' },
    { id: 3, title: 'Verify pickup requests (3 pending)', priority: 'high', assignee: 'Self', days: 'Today', status: 'open' },
    { id: 4, title: 'Check CCTV #7 angle — First Floor', priority: 'medium', assignee: 'Self', days: '1d', status: 'open' },
    { id: 5, title: 'Update gate log for vendor entries', priority: 'medium', assignee: 'Self', days: '1d', status: 'open' },
    { id: 6, title: 'Report boundary wall crack to admin', priority: 'medium', assignee: 'Self', days: '1d', status: 'open' },
    { id: 7, title: 'Review emergency evacuation drill plan', priority: 'low', assignee: 'Self', days: '7d', status: 'open' },
    { id: 8, title: 'Submit monthly security report', priority: 'low', assignee: 'Self', days: '10d', status: 'open' },
  ],
  'account-manager': [
    { id: 1, title: 'Call Udgam School — health critical', priority: 'high', assignee: 'Self', days: 'Today', status: 'open' },
    { id: 2, title: 'Resolve TKT-2038 escalation', priority: 'high', assignee: 'Self', days: '1d', status: 'in progress' },
    { id: 3, title: 'Prepare Navrachana renewal deck', priority: 'high', assignee: 'Self', days: '3d', status: 'open' },
    { id: 4, title: 'Confirm Vibgyor High UAT sign-off', priority: 'medium', assignee: 'Self', days: '5d', status: 'open' },
    { id: 5, title: 'Schedule DPS quarterly business review', priority: 'medium', assignee: 'Self', days: '7d', status: 'open' },
    { id: 6, title: 'Complete Eklavya School training #6', priority: 'medium', assignee: 'Self', days: '4d', status: 'open' },
    { id: 7, title: 'Update CRM with latest health scores', priority: 'low', assignee: 'Self', days: '10d', status: 'open' },
    { id: 8, title: 'Send monthly portfolio report to manager', priority: 'medium', assignee: 'Self', days: '8d', status: 'open' },
  ],
};

const defaultTasks: Array<{ id: number; title: string; priority: 'high' | 'medium' | 'low'; assignee: string; days: string; status: 'open' | 'in progress' | 'done' }> = [
  { id: 1, title: 'Review pending approvals', priority: 'high', assignee: 'Self', days: 'Today', status: 'open' },
  { id: 2, title: 'Complete monthly report', priority: 'high', assignee: 'Self', days: '2d', status: 'open' },
  { id: 3, title: 'Update records and documentation', priority: 'medium', assignee: 'Self', days: '3d', status: 'in progress' },
  { id: 4, title: 'Schedule team meeting', priority: 'medium', assignee: 'Self', days: '5d', status: 'open' },
  { id: 5, title: 'Follow up on pending items', priority: 'high', assignee: 'Self', days: '1d', status: 'open' },
  { id: 6, title: 'Prepare presentation for review', priority: 'medium', assignee: 'Self', days: '7d', status: 'open' },
  { id: 7, title: 'Review compliance checklist', priority: 'low', assignee: 'Self', days: '10d', status: 'open' },
  { id: 8, title: 'Submit weekly summary', priority: 'low', assignee: 'Self', days: '12d', status: 'open' },
];

export default function TaskTrackerPanel({ theme, role }: TaskTrackerPanelProps) {
  const [taskTab, setTaskTab] = useState('Quick View');
  const [taskSearch, setTaskSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [customTasks, setCustomTasks] = useState<Array<{ id: number; title: string; priority: 'high' | 'medium' | 'low'; assignee: string; days: string; status: 'open' | 'in progress' | 'done' }>>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPriority, setNewPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [newAssignees, setNewAssignees] = useState<string[]>([]);
  const [newDueDate, setNewDueDate] = useState('');

  const assigneeOptions = ['Self', 'Vice Principal', 'Teacher', 'HR Manager', 'Accounts Head', 'Receptionist', 'Transport Head'];

  const toggleAssignee = (name: string) => {
    setNewAssignees(prev =>
      prev.includes(name) ? prev.filter(a => a !== name) : [...prev, name]
    );
  };

  const resetForm = () => {
    setNewTitle('');
    setNewDescription('');
    setNewPriority('medium');
    setNewAssignees([]);
    setNewDueDate('');
  };

  const handleCreateTask = () => {
    if (!newTitle.trim()) return;
    const dueLabel = newDueDate
      ? (() => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const due = new Date(newDueDate);
          const diffDays = Math.round((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          if (diffDays <= 0) return 'Today';
          if (diffDays === 1) return '1d';
          return `${diffDays}d`;
        })()
      : '\u2014';
    const newTask = {
      id: Date.now(),
      title: newTitle.trim(),
      priority: newPriority,
      assignee: newAssignees.length > 0 ? newAssignees.join(', ') : 'Self',
      days: dueLabel,
      status: 'open' as const,
    };
    setCustomTasks(prev => [newTask, ...prev]);
    resetForm();
    setShowCreateForm(false);
  };

  const roleTaskList = roleTasks[role] || defaultTasks;
  const tasks = [...customTasks, ...roleTaskList];

  const totalTasks = 12;
  const inProgress = 3;
  const highPriority = 5;
  const completed = 4;

  const priorityDot = (p: 'high' | 'medium' | 'low') => {
    if (p === 'high') return 'bg-red-500';
    if (p === 'medium') return 'bg-amber-500';
    return 'bg-blue-500';
  };

  const daysColor = (d: string) => {
    if (d === 'Today' || d === '1d') return 'text-red-600 font-bold';
    const num = parseInt(d);
    if (!isNaN(num) && num <= 3) return 'text-red-500 font-bold';
    if (!isNaN(num) && num <= 7) return 'text-amber-600 font-bold';
    return `${theme.iconColor} font-medium`;
  };

  const statusBadge = (s: 'open' | 'in progress' | 'done') => {
    if (s === 'open') return 'bg-blue-100 text-blue-700';
    if (s === 'in progress') return 'bg-amber-100 text-amber-700';
    return 'bg-emerald-100 text-emerald-700';
  };

  const tabCounts: Record<string, number> = { 'Quick View': 5, 'Assigned to Me': 3, 'Created by Me': 4 };

  return (
    <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex flex-col`}>
      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ListTodo size={16} className={theme.iconColor} />
          <h3 className={`text-sm font-bold ${theme.highlight}`}>Task Tracker</h3>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className={`px-2.5 py-1.5 ${theme.primary} text-white rounded-lg text-[10px] font-bold flex items-center gap-1`}
        >
          <Plus size={10} /> Create Task
        </button>
      </div>

      {/* Create Task Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center" onClick={() => { resetForm(); setShowCreateForm(false); }}>
          <div
            className={`${theme.cardBg} rounded-2xl max-w-lg w-full mx-4 p-6 shadow-2xl`}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className={`text-lg font-bold ${theme.highlight}`}>Create New Task</h2>
                <p className={`text-xs ${theme.iconColor} mt-1 leading-relaxed`}>
                  Create a new task and assign it to a team member. As an admin, you can assign to multiple people.
                </p>
              </div>
              <button
                onClick={() => { resetForm(); setShowCreateForm(false); }}
                className={`p-1 rounded-lg hover:${theme.buttonHover} transition-all shrink-0 ml-4`}
              >
                <X size={18} className={theme.iconColor} />
              </button>
            </div>

            {/* Title Field */}
            <div className="mb-4">
              <label className={`block text-xs font-semibold ${theme.highlight} mb-1.5`}>
                Title<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter task title"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg text-sm ${theme.secondaryBg} border ${theme.border} ${theme.highlight} outline-none focus:ring-2 focus:ring-blue-500/30 placeholder:text-gray-400`}
              />
            </div>

            {/* Description Field */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <label className={`text-xs font-semibold ${theme.highlight}`}>Description</label>
                <button className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium ${theme.secondaryBg} border ${theme.border} ${theme.iconColor} hover:${theme.buttonHover} transition-all`}>
                  <Mic size={10} /> Record Voice Note
                </button>
              </div>
              <textarea
                rows={3}
                placeholder="Enter task description or use voice dictation"
                value={newDescription}
                onChange={e => setNewDescription(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg text-sm ${theme.secondaryBg} border ${theme.border} ${theme.highlight} outline-none focus:ring-2 focus:ring-blue-500/30 resize-none placeholder:text-gray-400`}
              />
            </div>

            {/* Priority + Due Date Row */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className={`block text-xs font-semibold ${theme.highlight} mb-1.5`}>
                  Priority<span className="text-red-500">*</span>
                </label>
                <select
                  value={newPriority}
                  onChange={e => setNewPriority(e.target.value as 'high' | 'medium' | 'low')}
                  className={`w-full px-3 py-2 rounded-lg text-sm font-medium ${theme.secondaryBg} border ${theme.border} ${theme.highlight} outline-none focus:ring-2 focus:ring-blue-500/30 cursor-pointer`}
                >
                  <option value="medium">Select priority</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <label className={`block text-xs font-semibold ${theme.highlight} mb-1.5`}>Due Date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={newDueDate}
                    onChange={e => setNewDueDate(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg text-sm ${theme.secondaryBg} border ${theme.border} ${theme.highlight} outline-none focus:ring-2 focus:ring-blue-500/30`}
                  />
                </div>
              </div>
            </div>

            {/* Assign To Multi-select */}
            <div className="mb-6">
              <label className={`block text-xs font-semibold ${theme.highlight} mb-1.5`}>
                Assign To<span className="text-red-500">*</span> <span className={`font-normal ${theme.iconColor}`}>(Multi-select enabled)</span>
              </label>
              <div className={`w-full px-3 py-2 rounded-lg ${theme.secondaryBg} border ${theme.border} min-h-[40px]`}>
                {/* Selected chips */}
                {newAssignees.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {newAssignees.map(a => (
                      <span
                        key={a}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${theme.primary} text-white`}
                      >
                        {a}
                        <button onClick={() => toggleAssignee(a)} className="hover:opacity-70">
                          <X size={10} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                {/* Options */}
                <div className="flex flex-wrap gap-1.5">
                  {assigneeOptions.filter(a => !newAssignees.includes(a)).map(option => (
                    <button
                      key={option}
                      onClick={() => toggleAssignee(option)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${theme.border} ${theme.iconColor} hover:${theme.buttonHover} transition-all`}
                    >
                      + {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => { resetForm(); setShowCreateForm(false); }}
                className={`px-4 py-2 rounded-lg text-sm font-semibold border ${theme.border} ${theme.highlight} hover:${theme.buttonHover} transition-all`}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTask}
                className={`px-4 py-2 rounded-lg text-sm font-semibold ${theme.primary} text-white hover:opacity-90 transition-all`}
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stat cards row */}
      <div className="grid grid-cols-4 gap-2 mb-3">
        <div className={`${theme.secondaryBg} rounded-xl p-2 text-center`}>
          <div className="flex items-center justify-center gap-1 mb-0.5">
            <CheckCircle size={10} className={theme.iconColor} />
            <span className={`text-[9px] ${theme.iconColor}`}>Total</span>
          </div>
          <p className={`text-sm font-bold ${theme.highlight}`}>{totalTasks}</p>
        </div>
        <div className={`${theme.secondaryBg} rounded-xl p-2 text-center`}>
          <div className="flex items-center justify-center gap-1 mb-0.5">
            <Clock size={10} className="text-amber-500" />
            <span className={`text-[9px] ${theme.iconColor}`}>In Progress</span>
          </div>
          <p className="text-sm font-bold text-amber-600">{inProgress}</p>
        </div>
        <div className={`${theme.secondaryBg} rounded-xl p-2 text-center`}>
          <div className="flex items-center justify-center gap-1 mb-0.5">
            <Flag size={10} className="text-red-500" />
            <span className={`text-[9px] ${theme.iconColor}`}>High Priority</span>
          </div>
          <p className="text-sm font-bold text-red-600">{highPriority}</p>
        </div>
        <div className={`${theme.secondaryBg} rounded-xl p-2 text-center`}>
          <div className="flex items-center justify-center gap-1 mb-0.5">
            <Check size={10} className="text-emerald-500" />
            <span className={`text-[9px] ${theme.iconColor}`}>Completed</span>
          </div>
          <p className="text-sm font-bold text-emerald-600">{completed}</p>
        </div>
      </div>

      {/* Search + Filters row */}
      <div className="flex items-center gap-2 mb-3">
        <div className={`flex items-center gap-1.5 flex-1 px-2 py-1.5 rounded-lg ${theme.secondaryBg} border ${theme.border}`}>
          <Search size={10} className={theme.iconColor} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={taskSearch}
            onChange={e => setTaskSearch(e.target.value)}
            className={`bg-transparent text-[10px] ${theme.highlight} outline-none w-full placeholder:${theme.iconColor}`}
          />
        </div>
        <select
          value={priorityFilter}
          onChange={e => setPriorityFilter(e.target.value)}
          className={`px-2 py-1.5 rounded-lg text-[10px] font-medium ${theme.secondaryBg} border ${theme.border} ${theme.highlight} outline-none cursor-pointer`}
        >
          <option value="All">Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className={`px-2 py-1.5 rounded-lg text-[10px] font-medium ${theme.secondaryBg} border ${theme.border} ${theme.highlight} outline-none cursor-pointer`}
        >
          <option value="All">Status</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      {/* Tabs */}
      <div className={`flex gap-1 mb-3 border-b ${theme.border} pb-2`}>
        {(['Quick View', 'Assigned to Me', 'Created by Me'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setTaskTab(tab)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
              taskTab === tab ? `${theme.primary} text-white` : `${theme.iconColor} ${theme.buttonHover}`
            }`}
          >
            {tab} <span className={`ml-0.5 ${taskTab === tab ? 'text-white/80' : ''}`}>({tabCounts[tab]})</span>
          </button>
        ))}
      </div>

      {/* Task list -- scrollable */}
      <div className="max-h-[400px] overflow-y-auto space-y-1.5 pr-1">
        {tasks.map(t => (
          <div key={t.id} className={`flex items-center gap-2 p-2 rounded-xl ${theme.accentBg} hover:${theme.secondaryBg} transition-all group`}>
            {/* Drag handle */}
            <GripVertical size={12} className={`${theme.iconColor} opacity-40 group-hover:opacity-70 cursor-grab shrink-0`} />
            {/* Expand chevron */}
            <ChevronRight size={12} className={`${theme.iconColor} shrink-0`} />
            {/* Priority dot */}
            <span className={`w-2 h-2 rounded-full ${priorityDot(t.priority)} shrink-0`} />
            {/* Task title */}
            <p className={`text-[11px] font-medium ${theme.highlight} flex-1 min-w-0 truncate`}>{t.title}</p>
            {/* Assignee badge */}
            <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${theme.secondaryBg} ${theme.iconColor} font-medium whitespace-nowrap shrink-0`}>{t.assignee}</span>
            {/* Days indicator */}
            <span className={`text-[9px] ${daysColor(t.days)} whitespace-nowrap shrink-0 w-8 text-center`}>{t.days}</span>
            {/* Complete button */}
            <button className={`w-5 h-5 rounded-full border ${theme.border} flex items-center justify-center shrink-0 hover:bg-emerald-100 hover:border-emerald-400 transition-all`}>
              <Check size={9} className={`${theme.iconColor} opacity-50`} />
            </button>
            {/* Open arrow */}
            <button className={`w-5 h-5 rounded-full ${theme.secondaryBg} flex items-center justify-center shrink-0 hover:${theme.buttonHover} transition-all`}>
              <ArrowRight size={9} className={theme.iconColor} />
            </button>
            {/* Status badge */}
            <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-bold whitespace-nowrap shrink-0 ${statusBadge(t.status)}`}>{t.status}</span>
          </div>
        ))}
      </div>

      {/* Popup behavior note */}
      <p className={`text-[9px] ${theme.iconColor} mt-3 pt-2 border-t ${theme.border} italic`}>
        Popup: Greets on login, reappears after 5 min inactivity (configurable in Settings)
      </p>
    </div>
  );
}
