'use client';

import { useState } from 'react';
import { type Theme } from '@/lib/themes';
import {
  Home, CheckSquare, Bell, BarChart3, MoreHorizontal, Users, UserCheck,
  Calendar, GraduationCap, MessageSquare, User, Settings, LogOut, X,
  ChevronRight, Check, XCircle, Clock, Send, Banknote, ClipboardCheck,
  AlertTriangle, Phone, FileText, Download, Share2, Plus, Search,
  CheckCircle, Circle, Megaphone, Eye, TrendingUp, ArrowLeft,
  Smartphone, Filter, RefreshCw,
} from 'lucide-react';

// ─── Types ──────────────────────────────────────────
type Screen = 'home' | 'approvals' | 'alerts' | 'reports' | 'more' | 'tasks' | 'attendance' | 'academics' | 'chat' | 'profile';
type ApprovalStatus = 'pending' | 'approved' | 'rejected';
interface Approval { id: number; type: string; from: string; detail: string; date: string; avatar: string; status: ApprovalStatus }
interface Alert { id: number; title: string; desc: string; time: string; read: boolean; type: 'leave' | 'fee' | 'academic' | 'event' | 'parent' }
interface Task { id: number; text: string; done: boolean; priority: 'high' | 'medium' | 'low' }

// ─── Mock Data ──────────────────────────────────────
const INITIAL_APPROVALS: Approval[] = [
  { id: 1, type: 'Leave', from: 'Mrs. Priya Sharma', detail: 'Casual Leave — 3 days (Mar 5–7)', date: 'Today', avatar: 'PS', status: 'pending' },
  { id: 2, type: 'Grace Marks', from: 'Mr. Rajesh Patel', detail: 'Rahul Joshi — Math +5 marks', date: 'Today', avatar: 'RP', status: 'pending' },
  { id: 3, type: 'Budget', from: 'Admin Office', detail: 'Sports Day — ₹45,000', date: 'Yesterday', avatar: 'AO', status: 'pending' },
  { id: 4, type: 'Leave', from: 'Mr. Suresh Mehta', detail: 'Sick Leave — 2 days', date: 'Yesterday', avatar: 'SM', status: 'pending' },
  { id: 5, type: 'Event', from: 'Activity Coord.', detail: 'Science Fair — Mar 15', date: '2 days ago', avatar: 'AC', status: 'pending' },
  { id: 6, type: 'TC', from: 'School Admin', detail: 'Aarav Singh — Class 8B', date: '3 days ago', avatar: 'SA', status: 'pending' },
];

const INITIAL_ALERTS: Alert[] = [
  { id: 1, title: 'Leave Request', desc: 'Mrs. Sharma requested 3 days casual leave', time: '2m ago', read: false, type: 'leave' },
  { id: 2, title: 'Fee Defaulters', desc: '12 students have overdue fees > 30 days', time: '15m ago', read: false, type: 'fee' },
  { id: 3, title: 'Parent Meeting', desc: 'Aarav Singh\'s parent requested meeting', time: '1h ago', read: false, type: 'parent' },
  { id: 4, title: 'Mark Entry', desc: 'Term 2 marks 78% complete — 3 teachers pending', time: '2h ago', read: false, type: 'academic' },
  { id: 5, title: 'Staff Birthday', desc: 'Mrs. Deepa Nair birthday tomorrow', time: '3h ago', read: true, type: 'event' },
  { id: 6, title: 'Board Circular', desc: 'New CBSE guidelines for practical exams', time: 'Yesterday', read: true, type: 'academic' },
  { id: 7, title: 'Bus Delay', desc: 'Route 5 running 15 min late — 32 students', time: 'Yesterday', read: true, type: 'event' },
  { id: 8, title: 'Fee Collected', desc: '₹2.4L collected today — 87% of target', time: 'Yesterday', read: true, type: 'fee' },
];

const INITIAL_TASKS: Task[] = [
  { id: 1, text: 'Review Term 2 mark entry progress', done: false, priority: 'high' },
  { id: 2, text: 'Approve Sports Day budget', done: false, priority: 'high' },
  { id: 3, text: 'Sign TC for Aarav Singh', done: false, priority: 'medium' },
  { id: 4, text: 'Call parent — Priya Reddy (attendance)', done: false, priority: 'medium' },
  { id: 5, text: 'Review science fair proposals', done: false, priority: 'low' },
  { id: 6, text: 'Prepare monthly report for trust', done: false, priority: 'low' },
];

// ─── Helpers ────────────────────────────────────────
const typeColors: Record<string, string> = {
  Leave: 'bg-blue-100 text-blue-700', 'Grace Marks': 'bg-purple-100 text-purple-700',
  Budget: 'bg-amber-100 text-amber-700', Event: 'bg-emerald-100 text-emerald-700',
  TC: 'bg-slate-100 text-slate-700',
  leave: 'bg-blue-500', fee: 'bg-amber-500', academic: 'bg-purple-500', event: 'bg-emerald-500', parent: 'bg-rose-500',
};
const priorityColors: Record<string, string> = { high: 'bg-red-500', medium: 'bg-amber-500', low: 'bg-blue-400' };

// ═══════════════════════════════════════════════════
// PRINCIPAL MOBILE APP — Full Interactive Preview
// ═══════════════════════════════════════════════════
export default function PrincipalMobileApp({ theme, alwaysShow }: { theme: Theme; alwaysShow?: boolean }) {
  const [showApp, setShowApp] = useState(false);
  const [screen, setScreen] = useState<Screen>('home');
  const [prevScreen, setPrevScreen] = useState<Screen>('home');

  // Data states
  const [approvals, setApprovals] = useState<Approval[]>(INITIAL_APPROVALS);
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  // Modal states
  const [confirmModal, setConfirmModal] = useState<{ id: number; action: 'approve' | 'reject' } | null>(null);
  const [detailModal, setDetailModal] = useState<Approval | null>(null);
  const [alertFilter, setAlertFilter] = useState<string>('all');
  const [approvalFilter, setApprovalFilter] = useState<string>('all');
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');
  const [announceModal, setAnnounceModal] = useState(false);
  const [announceText, setAnnounceText] = useState('');
  const [reportModal, setReportModal] = useState<string | null>(null);

  // Navigation
  const navigate = (s: Screen) => { setPrevScreen(screen); setScreen(s); };
  const goBack = () => setScreen(prevScreen);
  const isSubScreen = ['tasks', 'attendance', 'academics', 'chat', 'profile'].includes(screen);

  // Actions
  const handleApproval = (id: number, action: 'approve' | 'reject') => {
    setApprovals(prev => prev.map(a => a.id === id ? { ...a, status: action === 'approve' ? 'approved' : 'rejected' } : a));
    setConfirmModal(null);
    setDetailModal(null);
  };

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const addTask = () => {
    if (!newTaskText.trim()) return;
    setTasks(prev => [...prev, { id: Date.now(), text: newTaskText.trim(), done: false, priority: 'medium' }]);
    setNewTaskText('');
    setAddTaskModal(false);
  };

  const markAlertRead = (id: number) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
  };

  const pendingApprovals = approvals.filter(a => a.status === 'pending');
  const unreadAlerts = alerts.filter(a => !a.read).length;
  const completedTasks = tasks.filter(t => t.done).length;

  // ─── Bottom Tab Bar ───────────────────────────────
  const BottomTab = ({ icon: Icon, label, target, badge }: { icon: typeof Home; label: string; target: Screen; badge?: number }) => (
    <button onClick={() => navigate(target)} className={`flex flex-col items-center gap-0.5 relative ${screen === target || (target === 'more' && isSubScreen) ? 'text-blue-600' : 'text-gray-400'}`}>
      <Icon size={18} strokeWidth={screen === target ? 2.5 : 1.5} />
      {badge && badge > 0 ? <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-red-500 text-white text-[7px] font-bold flex items-center justify-center">{badge}</span> : null}
      <span className="text-[9px] font-medium">{label}</span>
    </button>
  );

  // ─── Screen Header ────────────────────────────────
  const ScreenHeader = ({ title, showBack }: { title: string; showBack?: boolean }) => (
    <div className="bg-blue-600 text-white px-3 py-2.5 flex items-center gap-2">
      {showBack && <button onClick={goBack} className="p-1 -ml-1"><ArrowLeft size={16} /></button>}
      <span className="text-sm font-bold flex-1">{title}</span>
      <button onClick={() => navigate('alerts')} className="relative p-1">
        <Bell size={15} />
        {unreadAlerts > 0 && <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-red-500 text-white text-[7px] font-bold flex items-center justify-center">{unreadAlerts}</span>}
      </button>
    </div>
  );

  if (!showApp && !alwaysShow) {
    return (
      <button
        onClick={() => setShowApp(true)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${theme.secondaryBg} ${theme.iconColor} border ${theme.border}`}
      >
        <Smartphone size={14} />
        {'\uD83D\uDCF1'} Show Mobile App View
      </button>
    );
  }

  return (
    <div className={alwaysShow ? '' : 'mt-2 mb-4'}>
      {!alwaysShow && (
        <button onClick={() => setShowApp(false)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-green-600 text-white mb-3">
          <Smartphone size={14} /> Hide Mobile App View
        </button>
      )}

      <div className={alwaysShow ? '' : 'flex flex-col items-center'}>
        <div className="w-[340px] border-[3px] border-gray-800 rounded-[2.5rem] overflow-hidden shadow-2xl bg-white relative">
          {/* Notch */}
          <div className="bg-gray-900 h-7 flex items-center justify-center">
            <div className="w-20 h-4 bg-black rounded-full flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-gray-700" />
            </div>
          </div>
          {/* Status bar */}
          <div className="bg-gray-900 text-white flex items-center justify-between px-5 py-0.5 text-[10px]">
            <span className="font-medium">9:41</span>
            <div className="flex gap-1.5 items-center text-[9px]">
              <span>●●●●○</span>
              <span>WiFi</span>
              <span className="font-medium">100%</span>
            </div>
          </div>

          {/* App Header */}
          <ScreenHeader title={
            screen === 'home' ? 'Saaras Principal' :
            screen === 'approvals' ? 'Approvals' :
            screen === 'alerts' ? 'Notifications' :
            screen === 'reports' ? 'Reports' :
            screen === 'tasks' ? 'Task Tracker' :
            screen === 'attendance' ? 'Attendance' :
            screen === 'academics' ? 'Academics' :
            screen === 'chat' ? 'Messages' :
            screen === 'profile' ? 'Profile' : 'More'
          } showBack={isSubScreen} />

          {/* ─── SCREEN CONTENT ─── */}
          <div className="h-[460px] overflow-y-auto bg-gray-50">

            {/* ═══ HOME SCREEN ═══ */}
            {screen === 'home' && (
              <div className="p-3 space-y-3">
                {/* Greeting */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-gray-500">Good Morning,</p>
                    <p className="text-sm font-bold text-gray-800">Dr. Kshama Thakker</p>
                  </div>
                  <button onClick={() => navigate('profile')} className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold shadow">KT</button>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { val: '1,247', label: 'Students', sub: '94.5%', color: 'bg-emerald-50 text-emerald-700', subC: 'text-emerald-500' },
                    { val: '92', label: 'Staff', sub: '6 leave', color: 'bg-blue-50 text-blue-700', subC: 'text-blue-500' },
                    { val: '5', label: 'Visitors', sub: '2 in', color: 'bg-amber-50 text-amber-700', subC: 'text-amber-500' },
                    { val: `${pendingApprovals.length}`, label: 'Pending', sub: 'Tap →', color: 'bg-red-50 text-red-700', subC: 'text-red-500' },
                  ].map((s, i) => (
                    <button key={i} onClick={i === 3 ? () => navigate('approvals') : undefined} className={`${s.color} rounded-xl p-2 text-center`}>
                      <p className="text-base font-bold">{s.val}</p>
                      <p className="text-[8px] font-medium">{s.label}</p>
                      <p className={`text-[7px] ${s.subC}`}>{s.sub}</p>
                    </button>
                  ))}
                </div>

                {/* Pending Approvals */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
                    <span className="text-[11px] font-bold text-gray-800">Pending Approvals</span>
                    <button onClick={() => navigate('approvals')} className="text-[9px] text-blue-600 font-bold flex items-center gap-0.5">View All <ChevronRight size={10} /></button>
                  </div>
                  {pendingApprovals.slice(0, 3).map(a => (
                    <button key={a.id} onClick={() => setDetailModal(a)} className="flex items-center gap-2.5 px-3 py-2.5 border-b border-gray-50 w-full text-left hover:bg-gray-50">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-[9px] font-bold shrink-0">{a.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-gray-800 truncate">{a.from}</p>
                        <p className="text-[9px] text-gray-500 truncate">{a.detail}</p>
                      </div>
                      <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-bold ${typeColors[a.type] || 'bg-gray-100 text-gray-600'}`}>{a.type}</span>
                    </button>
                  ))}
                </div>

                {/* Task Tracker */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
                    <span className="text-[11px] font-bold text-gray-800">My Tasks</span>
                    <button onClick={() => navigate('tasks')} className="text-[9px] text-blue-600 font-bold flex items-center gap-0.5">All Tasks <ChevronRight size={10} /></button>
                  </div>
                  {/* Progress bar */}
                  <div className="px-3 pt-2 pb-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] text-gray-500">{completedTasks}/{tasks.length} done</span>
                      <span className="text-[9px] font-bold text-blue-600">{Math.round(completedTasks / tasks.length * 100)}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${completedTasks / tasks.length * 100}%` }} />
                    </div>
                  </div>
                  {tasks.slice(0, 4).map(t => (
                    <button key={t.id} onClick={() => toggleTask(t.id)} className="flex items-center gap-2 px-3 py-2 border-t border-gray-50 w-full text-left">
                      {t.done ? <CheckCircle size={16} className="text-emerald-500 shrink-0" /> : <Circle size={16} className="text-gray-300 shrink-0" />}
                      <span className={`text-[10px] flex-1 ${t.done ? 'line-through text-gray-400' : 'text-gray-700'}`}>{t.text}</span>
                      <span className={`w-1.5 h-1.5 rounded-full ${priorityColors[t.priority]} shrink-0`} />
                    </button>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl border border-gray-200 p-3">
                  <span className="text-[11px] font-bold text-gray-800 mb-2 block">Quick Actions</span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { icon: Megaphone, label: 'Announce', color: 'bg-blue-50 text-blue-600', action: () => setAnnounceModal(true) },
                      { icon: Users, label: 'Attendance', color: 'bg-emerald-50 text-emerald-600', action: () => navigate('attendance') },
                      { icon: GraduationCap, label: 'Academics', color: 'bg-purple-50 text-purple-600', action: () => navigate('academics') },
                      { icon: Banknote, label: 'Fee Status', color: 'bg-amber-50 text-amber-600', action: () => navigate('reports') },
                      { icon: MessageSquare, label: 'Messages', color: 'bg-rose-50 text-rose-600', action: () => navigate('chat') },
                      { icon: Calendar, label: 'Events', color: 'bg-indigo-50 text-indigo-600', action: () => alert('Events Calendar: PTM (Mar 5), Sports Day (Mar 15), Science Fair (Mar 20)') },
                    ].map((q, i) => (
                      <button key={i} onClick={q.action} className={`flex flex-col items-center gap-1.5 py-3 rounded-xl ${q.color} hover:opacity-80 transition-opacity`}>
                        <q.icon size={18} />
                        <span className="text-[9px] font-bold">{q.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Today's Events */}
                <div className="bg-white rounded-xl border border-gray-200 p-3">
                  <span className="text-[11px] font-bold text-gray-800 mb-2 block">Today&apos;s Schedule</span>
                  {[
                    { time: '9:00 AM', event: 'Morning Assembly — Guest Speaker', color: 'bg-blue-500', done: true },
                    { time: '11:30 AM', event: 'Parent Meeting — Aarav Singh', color: 'bg-purple-500', done: false },
                    { time: '2:00 PM', event: 'Staff Review Meeting', color: 'bg-emerald-500', done: false },
                    { time: '3:30 PM', event: 'Board Call — Monthly Update', color: 'bg-amber-500', done: false },
                  ].map((ev, i) => (
                    <div key={i} className={`flex items-center gap-2 py-2 ${i > 0 ? 'border-t border-gray-100' : ''}`}>
                      <div className={`w-1.5 self-stretch rounded-full ${ev.color}`} />
                      <div className="flex-1">
                        <p className={`text-[10px] font-bold ${ev.done ? 'text-gray-400 line-through' : 'text-gray-800'}`}>{ev.event}</p>
                        <p className="text-[8px] text-gray-400">{ev.time}</p>
                      </div>
                      {ev.done && <Check size={12} className="text-emerald-500" />}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ═══ APPROVALS SCREEN ═══ */}
            {screen === 'approvals' && (
              <div className="p-3 space-y-2">
                {/* Filter */}
                <div className="flex gap-1.5 overflow-x-auto pb-1">
                  {['all', 'Leave', 'Grace Marks', 'Budget', 'Event', 'TC'].map(f => (
                    <button key={f} onClick={() => setApprovalFilter(f)} className={`px-2.5 py-1.5 rounded-full text-[9px] font-bold whitespace-nowrap ${approvalFilter === f ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}>
                      {f === 'all' ? `All (${pendingApprovals.length})` : f}
                    </button>
                  ))}
                </div>

                {/* Approval Cards */}
                {approvals.filter(a => approvalFilter === 'all' || a.type === approvalFilter).map(a => (
                  <div key={a.id} className={`bg-white rounded-xl border ${a.status === 'approved' ? 'border-emerald-200' : a.status === 'rejected' ? 'border-red-200' : 'border-gray-200'} overflow-hidden`}>
                    <button onClick={() => a.status === 'pending' ? setDetailModal(a) : null} className="flex items-center gap-2.5 p-3 w-full text-left">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">{a.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="text-[11px] font-bold text-gray-800 truncate">{a.from}</p>
                          <span className={`text-[7px] px-1.5 py-0.5 rounded-full font-bold ${typeColors[a.type]}`}>{a.type}</span>
                        </div>
                        <p className="text-[9px] text-gray-500 mt-0.5">{a.detail}</p>
                        <p className="text-[8px] text-gray-400 mt-0.5">{a.date}</p>
                      </div>
                      {a.status === 'approved' && <span className="text-[8px] px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 font-bold">Approved</span>}
                      {a.status === 'rejected' && <span className="text-[8px] px-2 py-1 rounded-full bg-red-100 text-red-700 font-bold">Rejected</span>}
                    </button>
                    {a.status === 'pending' && (
                      <div className="flex border-t border-gray-100">
                        <button onClick={() => setConfirmModal({ id: a.id, action: 'reject' })} className="flex-1 py-2.5 flex items-center justify-center gap-1 text-red-500 text-[10px] font-bold hover:bg-red-50 border-r border-gray-100">
                          <XCircle size={13} /> Reject
                        </button>
                        <button onClick={() => setDetailModal(a)} className="flex-1 py-2.5 flex items-center justify-center gap-1 text-gray-500 text-[10px] font-bold hover:bg-gray-50 border-r border-gray-100">
                          <Eye size={13} /> Details
                        </button>
                        <button onClick={() => setConfirmModal({ id: a.id, action: 'approve' })} className="flex-1 py-2.5 flex items-center justify-center gap-1 text-emerald-600 text-[10px] font-bold hover:bg-emerald-50">
                          <Check size={13} /> Approve
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* ═══ ALERTS SCREEN ═══ */}
            {screen === 'alerts' && (
              <div className="p-3 space-y-2">
                <div className="flex gap-1.5 overflow-x-auto pb-1">
                  {['all', 'leave', 'fee', 'academic', 'parent', 'event'].map(f => (
                    <button key={f} onClick={() => setAlertFilter(f)} className={`px-2.5 py-1.5 rounded-full text-[9px] font-bold whitespace-nowrap capitalize ${alertFilter === f ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}>
                      {f === 'all' ? `All (${alerts.length})` : f}
                    </button>
                  ))}
                </div>
                {alerts.filter(a => alertFilter === 'all' || a.type === alertFilter).map(a => (
                  <button key={a.id} onClick={() => markAlertRead(a.id)} className={`flex items-start gap-2.5 p-3 rounded-xl w-full text-left ${a.read ? 'bg-white border border-gray-100' : 'bg-blue-50 border border-blue-200'}`}>
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${a.read ? 'bg-gray-300' : typeColors[a.type]}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-[10px] font-bold ${a.read ? 'text-gray-600' : 'text-gray-800'}`}>{a.title}</p>
                        <span className="text-[8px] text-gray-400 shrink-0 ml-2">{a.time}</span>
                      </div>
                      <p className="text-[9px] text-gray-500 mt-0.5">{a.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* ═══ REPORTS SCREEN ═══ */}
            {screen === 'reports' && (
              <div className="p-3 space-y-3">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Fee Collected', val: '₹2.4L / ₹2.8L', pct: 86, color: 'bg-emerald-500' },
                    { label: 'Attendance', val: '94.5%', pct: 94, color: 'bg-blue-500' },
                    { label: 'Mark Entry', val: '78% done', pct: 78, color: 'bg-purple-500' },
                    { label: 'Parent Satisfaction', val: '4.2 / 5', pct: 84, color: 'bg-amber-500' },
                  ].map((r, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-200 p-2.5">
                      <p className="text-[9px] text-gray-500 font-medium">{r.label}</p>
                      <p className="text-sm font-bold text-gray-800 mt-0.5">{r.val}</p>
                      <div className="h-1 bg-gray-200 rounded-full mt-1.5 overflow-hidden">
                        <div className={`h-full ${r.color} rounded-full`} style={{ width: `${r.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Report Cards */}
                <p className="text-[11px] font-bold text-gray-800">Available Reports</p>
                {[
                  { title: 'Monthly Attendance Report', desc: 'Feb 2026 — Class-wise breakdown', icon: Users },
                  { title: 'Fee Collection Summary', desc: 'Term 2 — Collection vs Outstanding', icon: Banknote },
                  { title: 'Academic Progress Report', desc: 'Term 2 Marks — Subject analysis', icon: GraduationCap },
                  { title: 'Staff Performance', desc: 'Monthly review — Teaching hours, outcomes', icon: UserCheck },
                  { title: 'Board Exam Analysis', desc: 'School 82% vs State 68% — Subject-wise', icon: BarChart3 },
                ].map((r, i) => (
                  <button key={i} onClick={() => setReportModal(r.title)} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200 w-full text-left hover:bg-gray-50">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <r.icon size={16} className="text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold text-gray-800">{r.title}</p>
                      <p className="text-[9px] text-gray-500">{r.desc}</p>
                    </div>
                    <ChevronRight size={14} className="text-gray-400 shrink-0" />
                  </button>
                ))}
              </div>
            )}

            {/* ═══ MORE SCREEN ═══ */}
            {screen === 'more' && (
              <div className="p-3 space-y-2">
                {/* Profile Card */}
                <button onClick={() => navigate('profile')} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200 w-full text-left">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">KT</div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-gray-800">Dr. Kshama Thakker</p>
                    <p className="text-[9px] text-gray-500">Principal — Saaras International</p>
                  </div>
                  <ChevronRight size={14} className="text-gray-400" />
                </button>
                {/* Menu Items */}
                {[
                  { icon: ClipboardCheck, label: 'Task Tracker', badge: `${tasks.length - completedTasks}`, target: 'tasks' as Screen },
                  { icon: Users, label: 'Attendance Overview', target: 'attendance' as Screen },
                  { icon: GraduationCap, label: 'Academics', target: 'academics' as Screen },
                  { icon: MessageSquare, label: 'Messages', badge: '2', target: 'chat' as Screen },
                  { icon: Settings, label: 'Settings', target: 'profile' as Screen },
                ].map((m, i) => (
                  <button key={i} onClick={() => navigate(m.target)} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200 w-full text-left hover:bg-gray-50">
                    <m.icon size={18} className="text-gray-600" />
                    <span className="text-[11px] font-medium text-gray-700 flex-1">{m.label}</span>
                    {m.badge && <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 font-bold">{m.badge}</span>}
                    <ChevronRight size={14} className="text-gray-400" />
                  </button>
                ))}
                <button onClick={() => alert('Logged out. Redirecting to login...')} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-red-200 w-full text-left hover:bg-red-50 mt-4">
                  <LogOut size={18} className="text-red-500" />
                  <span className="text-[11px] font-medium text-red-600">Logout</span>
                </button>
              </div>
            )}

            {/* ═══ TASKS SCREEN ═══ */}
            {screen === 'tasks' && (
              <div className="p-3 space-y-3">
                {/* Progress */}
                <div className="bg-white rounded-xl border border-gray-200 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-gray-800">Progress</span>
                    <span className="text-xs font-bold text-blue-600">{completedTasks}/{tasks.length}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${completedTasks / tasks.length * 100}%` }} />
                  </div>
                </div>
                {/* Task List */}
                {tasks.map(t => (
                  <button key={t.id} onClick={() => toggleTask(t.id)} className="flex items-center gap-2.5 p-3 bg-white rounded-xl border border-gray-200 w-full text-left">
                    {t.done ? <CheckCircle size={18} className="text-emerald-500 shrink-0" /> : <Circle size={18} className="text-gray-300 shrink-0" />}
                    <span className={`text-[10px] flex-1 ${t.done ? 'line-through text-gray-400' : 'text-gray-700 font-medium'}`}>{t.text}</span>
                    <span className={`w-2 h-2 rounded-full ${priorityColors[t.priority]} shrink-0`} />
                  </button>
                ))}
                {/* Add Task FAB */}
                <button onClick={() => setAddTaskModal(true)} className="w-full py-3 rounded-xl border-2 border-dashed border-blue-300 text-blue-600 text-[10px] font-bold flex items-center justify-center gap-1 hover:bg-blue-50">
                  <Plus size={14} /> Add Task
                </button>
              </div>
            )}

            {/* ═══ ATTENDANCE SCREEN ═══ */}
            {screen === 'attendance' && (
              <div className="p-3 space-y-3">
                {/* Overview */}
                <div className="bg-white rounded-xl border border-gray-200 p-3 text-center">
                  <p className="text-[11px] font-bold text-gray-800 mb-2">Today&apos;s Attendance</p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-16 h-16 rounded-full border-4 border-emerald-500 flex items-center justify-center">
                      <span className="text-lg font-bold text-emerald-600">94.5%</span>
                    </div>
                    <div className="text-left space-y-1">
                      <p className="text-[9px]"><span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1" />Present: <b>1,247</b></p>
                      <p className="text-[9px]"><span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-1" />Absent: <b>48</b></p>
                      <p className="text-[9px]"><span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-1" />Late: <b>25</b></p>
                    </div>
                  </div>
                </div>
                {/* Class-wise */}
                <p className="text-[11px] font-bold text-gray-800">Class-wise Breakdown</p>
                {[
                  { cls: 'Nursery–KG', present: 145, total: 160, pct: 91 },
                  { cls: 'Class 1–5', present: 420, total: 440, pct: 95 },
                  { cls: 'Class 6–8', present: 352, total: 370, pct: 95 },
                  { cls: 'Class 9–10', present: 198, total: 210, pct: 94 },
                  { cls: 'Class 11–12', present: 132, total: 140, pct: 94 },
                ].map((c, i) => (
                  <button key={i} onClick={() => alert(`${c.cls}: ${c.present}/${c.total} present\nAbsent: ${c.total - c.present}\nSection-wise details would open here`)} className="flex items-center gap-2 p-2.5 bg-white rounded-xl border border-gray-200 w-full text-left">
                    <div className="flex-1">
                      <p className="text-[10px] font-bold text-gray-700">{c.cls}</p>
                      <p className="text-[8px] text-gray-400">{c.present}/{c.total} present</p>
                    </div>
                    <div className="w-16">
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${c.pct >= 95 ? 'bg-emerald-500' : c.pct >= 90 ? 'bg-blue-500' : 'bg-amber-500'}`} style={{ width: `${c.pct}%` }} />
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-600 w-8 text-right">{c.pct}%</span>
                    <ChevronRight size={12} className="text-gray-400" />
                  </button>
                ))}
                {/* Staff */}
                <div className="bg-white rounded-xl border border-gray-200 p-3">
                  <p className="text-[10px] font-bold text-gray-800 mb-1">Staff Attendance</p>
                  <div className="flex items-center gap-3">
                    <span className="text-[9px]">Present: <b className="text-emerald-600">92</b></span>
                    <span className="text-[9px]">On Leave: <b className="text-amber-600">6</b></span>
                    <span className="text-[9px]">Absent: <b className="text-red-600">0</b></span>
                  </div>
                </div>
              </div>
            )}

            {/* ═══ ACADEMICS SCREEN ═══ */}
            {screen === 'academics' && (
              <div className="p-3 space-y-3">
                <div className="bg-white rounded-xl border border-gray-200 p-3">
                  <p className="text-[11px] font-bold text-gray-800 mb-2">Mark Entry Progress — Term 2</p>
                  {[
                    { subj: 'Mathematics', teacher: 'Mr. Patel', pct: 100, status: 'done' },
                    { subj: 'Science', teacher: 'Mrs. Sharma', pct: 100, status: 'done' },
                    { subj: 'English', teacher: 'Ms. Nair', pct: 85, status: 'progress' },
                    { subj: 'Hindi', teacher: 'Mr. Verma', pct: 60, status: 'progress' },
                    { subj: 'Social Studies', teacher: 'Mrs. Gupta', pct: 0, status: 'not_started' },
                  ].map((s, i) => (
                    <div key={i} className={`flex items-center gap-2 py-2 ${i > 0 ? 'border-t border-gray-100' : ''}`}>
                      {s.status === 'done' ? <CheckCircle size={14} className="text-emerald-500 shrink-0" /> : s.status === 'progress' ? <Clock size={14} className="text-amber-500 shrink-0" /> : <AlertTriangle size={14} className="text-red-400 shrink-0" />}
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-gray-700">{s.subj}</p>
                        <p className="text-[8px] text-gray-400">{s.teacher}</p>
                      </div>
                      <span className={`text-[9px] font-bold ${s.pct === 100 ? 'text-emerald-600' : s.pct > 0 ? 'text-amber-600' : 'text-red-500'}`}>{s.pct}%</span>
                    </div>
                  ))}
                  <button onClick={() => alert('Reminder sent to Ms. Nair, Mr. Verma, Mrs. Gupta')} className="w-full mt-2 py-2 rounded-lg bg-blue-50 text-blue-600 text-[9px] font-bold flex items-center justify-center gap-1">
                    <Send size={11} /> Send Reminder to Pending
                  </button>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-3">
                  <p className="text-[11px] font-bold text-gray-800 mb-2">Grace Marks — Pending Approval</p>
                  {[
                    { student: 'Rahul Joshi', subj: 'Math', current: 28, grace: 5, by: 'Mr. Patel' },
                    { student: 'Sneha Das', subj: 'Science', current: 30, grace: 3, by: 'Mrs. Sharma' },
                  ].map((g, i) => (
                    <div key={i} className={`py-2 ${i > 0 ? 'border-t border-gray-100' : ''}`}>
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-bold text-gray-700">{g.student} — {g.subj}</p>
                        <span className="text-[8px] text-gray-400">by {g.by}</span>
                      </div>
                      <p className="text-[9px] text-gray-500 mt-0.5">{g.current} → {g.current + g.grace} (+{g.grace} grace)</p>
                      <div className="flex gap-2 mt-1.5">
                        <button onClick={() => alert(`Approved: ${g.student} gets +${g.grace} in ${g.subj}`)} className="flex-1 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 text-[9px] font-bold flex items-center justify-center gap-1"><Check size={11} /> Approve</button>
                        <button onClick={() => alert(`Rejected: ${g.student}'s grace marks in ${g.subj}`)} className="flex-1 py-1.5 rounded-lg bg-red-50 text-red-500 text-[9px] font-bold flex items-center justify-center gap-1"><XCircle size={11} /> Reject</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ═══ CHAT SCREEN ═══ */}
            {screen === 'chat' && (
              <div className="p-3 space-y-2">
                <div className="relative mb-2">
                  <Search size={13} className="absolute left-3 top-2.5 text-gray-400" />
                  <input placeholder="Search messages..." className="w-full pl-8 pr-3 py-2 rounded-xl border border-gray-200 text-[10px] bg-white outline-none" />
                </div>
                {[
                  { name: 'Mrs. Priya Sharma', last: 'Leave application attached', time: '2m ago', unread: 1, avatar: 'PS' },
                  { name: 'Admin Office', last: 'Sports Day budget approved', time: '1h ago', unread: 1, avatar: 'AO' },
                  { name: 'Mr. Rajesh Patel', last: 'Grace marks list updated', time: '3h ago', unread: 0, avatar: 'RP' },
                  { name: 'Parent — Aarav Singh', last: 'Thank you for the meeting', time: 'Yesterday', unread: 0, avatar: 'AS' },
                  { name: 'Trust Board', last: 'Monthly report received', time: 'Yesterday', unread: 0, avatar: 'TB' },
                  { name: 'Transport Head', last: 'Route 5 delay resolved', time: '2 days ago', unread: 0, avatar: 'TH' },
                ].map((c, i) => (
                  <button key={i} onClick={() => alert(`Chat with ${c.name}:\n"${c.last}"\n\nFull chat would open here with message history and reply input`)} className="flex items-center gap-2.5 p-3 bg-white rounded-xl border border-gray-200 w-full text-left hover:bg-gray-50">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-[9px] font-bold shrink-0">{c.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-[10px] ${c.unread ? 'font-bold text-gray-800' : 'font-medium text-gray-600'}`}>{c.name}</p>
                        <span className="text-[8px] text-gray-400 shrink-0">{c.time}</span>
                      </div>
                      <p className={`text-[9px] mt-0.5 truncate ${c.unread ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>{c.last}</p>
                    </div>
                    {c.unread > 0 && <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[8px] font-bold flex items-center justify-center shrink-0">{c.unread}</span>}
                  </button>
                ))}
              </div>
            )}

            {/* ═══ PROFILE SCREEN ═══ */}
            {screen === 'profile' && (
              <div className="p-3 space-y-3">
                <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold mx-auto mb-2">KT</div>
                  <p className="text-sm font-bold text-gray-800">Dr. Kshama Thakker</p>
                  <p className="text-[10px] text-gray-500">Principal</p>
                  <p className="text-[9px] text-gray-400">Saaras International School, Ahmedabad</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <p className="text-[10px] font-bold text-gray-800 px-3 pt-3 pb-1">Settings</p>
                  {[
                    { label: 'Push Notifications', desc: 'Approvals, alerts, messages' },
                    { label: 'Daily Digest Email', desc: 'Morning summary at 7:30 AM' },
                    { label: 'Biometric Login', desc: 'Face ID / Fingerprint' },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between px-3 py-2.5 border-t border-gray-100">
                      <div>
                        <p className="text-[10px] font-medium text-gray-700">{s.label}</p>
                        <p className="text-[8px] text-gray-400">{s.desc}</p>
                      </div>
                      <div className="w-8 h-[18px] rounded-full bg-blue-500 relative cursor-pointer"><div className="w-3.5 h-3.5 bg-white rounded-full absolute top-[1.5px] right-[1.5px]" /></div>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <p className="text-[10px] font-bold text-gray-800 px-3 pt-3 pb-1">App Info</p>
                  <div className="px-3 py-2 border-t border-gray-100 flex justify-between">
                    <span className="text-[9px] text-gray-500">Version</span>
                    <span className="text-[9px] text-gray-700 font-medium">1.0.0</span>
                  </div>
                  <div className="px-3 py-2 border-t border-gray-100 flex justify-between">
                    <span className="text-[9px] text-gray-500">Last sync</span>
                    <span className="text-[9px] text-gray-700 font-medium">2 min ago</span>
                  </div>
                </div>
                <button onClick={() => alert('Logged out. Redirecting to login...')} className="w-full py-3 rounded-xl border border-red-200 text-red-600 text-[10px] font-bold flex items-center justify-center gap-1 bg-white hover:bg-red-50">
                  <LogOut size={13} /> Logout
                </button>
              </div>
            )}
          </div>

          {/* ─── Bottom Navigation ─── */}
          <div className="bg-white border-t border-gray-200 flex justify-around py-2 px-1">
            <BottomTab icon={Home} label="Home" target="home" />
            <BottomTab icon={CheckSquare} label="Approvals" target="approvals" badge={pendingApprovals.length || undefined} />
            <BottomTab icon={Bell} label="Alerts" target="alerts" badge={unreadAlerts || undefined} />
            <BottomTab icon={BarChart3} label="Reports" target="reports" />
            <BottomTab icon={MoreHorizontal} label="More" target="more" />
          </div>

          {/* Home indicator bar */}
          <div className="bg-white flex items-center justify-center py-2">
            <div className="w-28 h-1 bg-gray-300 rounded-full" />
          </div>
        </div>
      </div>

      {/* ═══ MODALS (overlaid on phone) ═══ */}

      {/* Confirm Approve/Reject */}
      {confirmModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setConfirmModal(null)}>
          <div className="bg-white rounded-2xl p-5 w-72 shadow-2xl" onClick={e => e.stopPropagation()}>
            <p className="text-sm font-bold text-gray-800 mb-1">{confirmModal.action === 'approve' ? 'Approve' : 'Reject'} Request?</p>
            <p className="text-xs text-gray-500 mb-4">
              {approvals.find(a => a.id === confirmModal.id)?.from} — {approvals.find(a => a.id === confirmModal.id)?.detail}
            </p>
            <div className="flex gap-2">
              <button onClick={() => setConfirmModal(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600">Cancel</button>
              <button onClick={() => handleApproval(confirmModal.id, confirmModal.action)} className={`flex-1 py-2.5 rounded-xl text-xs font-bold text-white ${confirmModal.action === 'approve' ? 'bg-emerald-500' : 'bg-red-500'}`}>
                {confirmModal.action === 'approve' ? 'Approve' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Approval Detail */}
      {detailModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center" onClick={() => setDetailModal(null)}>
          <div className="bg-white rounded-t-2xl p-5 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-8 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-bold">{detailModal.avatar}</div>
              <div>
                <p className="text-sm font-bold text-gray-800">{detailModal.from}</p>
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${typeColors[detailModal.type]}`}>{detailModal.type}</span>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 mb-3">
              <p className="text-xs text-gray-700">{detailModal.detail}</p>
              <p className="text-[10px] text-gray-400 mt-1">{detailModal.date}</p>
            </div>
            {detailModal.type === 'Leave' && (
              <div className="text-[10px] text-gray-500 mb-3 space-y-1">
                <p>Substitute: Mrs. Deepa Nair (confirmed)</p>
                <p>Leave balance: 8 CL remaining</p>
                <p>Classes affected: 8A, 8B, 9A (12 periods)</p>
              </div>
            )}
            {detailModal.status === 'pending' && (
              <div className="flex gap-2">
                <button onClick={() => { setDetailModal(null); setConfirmModal({ id: detailModal.id, action: 'reject' }); }} className="flex-1 py-3 rounded-xl border border-red-200 text-red-500 text-xs font-bold flex items-center justify-center gap-1"><XCircle size={14} /> Reject</button>
                <button onClick={() => { setDetailModal(null); setConfirmModal({ id: detailModal.id, action: 'approve' }); }} className="flex-1 py-3 rounded-xl bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1"><Check size={14} /> Approve</button>
              </div>
            )}
            {detailModal.status !== 'pending' && (
              <p className={`text-center text-xs font-bold py-3 rounded-xl ${detailModal.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {detailModal.status === 'approved' ? 'Approved' : 'Rejected'}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {addTaskModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setAddTaskModal(false)}>
          <div className="bg-white rounded-2xl p-5 w-72 shadow-2xl" onClick={e => e.stopPropagation()}>
            <p className="text-sm font-bold text-gray-800 mb-3">Add Task</p>
            <input value={newTaskText} onChange={e => setNewTaskText(e.target.value)} placeholder="Task description..." className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs outline-none mb-3" autoFocus />
            <div className="flex gap-2">
              <button onClick={() => setAddTaskModal(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600">Cancel</button>
              <button onClick={addTask} className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold">Add</button>
            </div>
          </div>
        </div>
      )}

      {/* Announce Modal */}
      {announceModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setAnnounceModal(false)}>
          <div className="bg-white rounded-2xl p-5 w-80 shadow-2xl" onClick={e => e.stopPropagation()}>
            <p className="text-sm font-bold text-gray-800 mb-3">Send Announcement</p>
            <select className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs mb-2 outline-none">
              <option>All Staff & Parents</option><option>Staff Only</option><option>Parents Only</option><option>Class 10 Parents</option>
            </select>
            <textarea value={announceText} onChange={e => setAnnounceText(e.target.value)} placeholder="Type your announcement..." rows={3} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs outline-none mb-2 resize-none" />
            <div className="flex gap-1 mb-3">
              {['Push', 'SMS', 'Email', 'WhatsApp'].map(ch => (
                <label key={ch} className="flex items-center gap-1 text-[9px] text-gray-600 bg-gray-50 px-2 py-1 rounded-lg">
                  <input type="checkbox" defaultChecked={ch === 'Push'} className="w-3 h-3" /> {ch}
                </label>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setAnnounceModal(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600">Cancel</button>
              <button onClick={() => { alert(`Announcement sent: "${announceText || 'No text entered'}"`); setAnnounceText(''); setAnnounceModal(false); }} className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold flex items-center justify-center gap-1"><Send size={12} /> Send</button>
            </div>
          </div>
        </div>
      )}

      {/* Report Detail Modal */}
      {reportModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center" onClick={() => setReportModal(null)}>
          <div className="bg-white rounded-t-2xl p-5 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-8 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
            <p className="text-sm font-bold text-gray-800 mb-3">{reportModal}</p>
            <div className="bg-gray-50 rounded-xl p-3 mb-3 text-[10px] text-gray-600 space-y-1">
              <p>Period: February 2026</p>
              <p>Generated: Mar 1, 2026 at 9:41 AM</p>
              <p>Pages: 12</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => alert(`Downloading ${reportModal} as PDF...`)} className="flex-1 py-3 rounded-xl bg-blue-50 text-blue-600 text-xs font-bold flex items-center justify-center gap-1"><Download size={13} /> Download</button>
              <button onClick={() => alert(`Sharing ${reportModal} via WhatsApp...`)} className="flex-1 py-3 rounded-xl bg-emerald-50 text-emerald-600 text-xs font-bold flex items-center justify-center gap-1"><Share2 size={13} /> WhatsApp</button>
              <button onClick={() => alert(`Emailing ${reportModal}...`)} className="flex-1 py-3 rounded-xl bg-purple-50 text-purple-600 text-xs font-bold flex items-center justify-center gap-1"><Send size={13} /> Email</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
