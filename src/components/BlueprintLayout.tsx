'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Building2, GraduationCap, BookOpen, User, Users, Shield, Eye,
  UserCheck, Briefcase, Calculator, Phone, Bus, ShieldCheck, Headphones,
  Home, ChevronLeft, Menu, LogOut, MessageSquare, Bell,
  FileText, CheckCircle, Calendar, AlertTriangle, ClipboardCheck,
  Palette, Maximize2, Minimize2, MessageCircle, X, Send, Search
} from 'lucide-react';
import { themes, VIVID_VARIANTS, type Theme } from '@/lib/themes';
import { getLoggedInUser, logoutUser, type TeamMember } from '@/lib/auth';
import FeedbackSystem from './FeedbackSystem';
import LoginPage from './LoginPage';
import TaskTrackerPopup from './TaskTrackerPopup';
import { conversations } from './ChatModule';

const VIVID_THEME_IDX = 4; // Virtual index for Vivid (beyond the 4 base themes)

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/school-admin', label: 'School Admin', icon: Building2 },
  { href: '/principal', label: 'Principal', icon: GraduationCap },
  { href: '/teacher', label: 'Teacher', icon: BookOpen },
  { href: '/student', label: 'Student', icon: User },
  { href: '/parent', label: 'Parent', icon: Users },
  { href: '/super-admin', label: 'Super Admin', icon: Shield },
  { href: '/trustee', label: 'Trustee', icon: Eye },
  { href: '/vice-principal', label: 'Vice Principal', icon: UserCheck },
  { href: '/hr-manager', label: 'HR Manager', icon: Briefcase },
  { href: '/accounts-head', label: 'Accounts Head', icon: Calculator },
  { href: '/receptionist', label: 'Receptionist', icon: Phone },
  { href: '/transport-head', label: 'Transport Head', icon: Bus },
  { href: '/security', label: 'Security', icon: ShieldCheck },
  { href: '/account-manager', label: 'Account Manager', icon: Headphones },
  { href: '/chat', label: 'Chat', icon: MessageSquare },
  { href: '/auth', label: 'Auth / Login', icon: Shield },
];

// Color swatch options for the Vivid accent picker
const vividColorOptions = [
  { name: 'Rose', bg: 'bg-rose-200' },
  { name: 'Red', bg: 'bg-red-200' },
  { name: 'Orange', bg: 'bg-orange-200' },
  { name: 'Amber', bg: 'bg-amber-200' },
  { name: 'Emerald', bg: 'bg-emerald-200' },
  { name: 'Teal', bg: 'bg-teal-200' },
  { name: 'Cyan', bg: 'bg-cyan-200' },
  { name: 'Blue', bg: 'bg-blue-200' },
  { name: 'Indigo', bg: 'bg-indigo-200' },
  { name: 'Purple', bg: 'bg-purple-200' },
];

// Swatch colors for the main theme row buttons
const baseSwatchColors: Record<string, string> = {
  blue: 'bg-slate-600',
  sage: 'bg-[#5c6b5d]',
  stone: 'bg-[#78716c]',
  neon: 'bg-indigo-500',
};

export default function BlueprintLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [themeIdx, setThemeIdx] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentUser, setCurrentUser] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedVividColor, setSelectedVividColor] = useState('Indigo');
  const [chatOpen, setChatOpen] = useState(false);
  // Task Tracker popup state
  const [taskPopupOpen, setTaskPopupOpen] = useState(false);
  const [taskPopupMode, setTaskPopupMode] = useState<'login' | 'idle'>('login');
  const [loginPopupShown, setLoginPopupShown] = useState(false);
  const [loginPopupDisabled, setLoginPopupDisabled] = useState(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const themePickerRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  // Compute the active theme: base themes for idx 0-3, Vivid variant for idx 4
  const theme: Theme = useMemo(() => {
    if (themeIdx === VIVID_THEME_IDX) {
      return VIVID_VARIANTS[selectedVividColor] || VIVID_VARIANTS['Rose'];
    }
    return themes[themeIdx] || themes[0];
  }, [themeIdx, selectedVividColor]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    if (showNotifications) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNotifications]);

  useEffect(() => {
    const handleClickOutsideTheme = (e: MouseEvent) => {
      if (themePickerRef.current && !themePickerRef.current.contains(e.target as Node)) {
        setShowThemePicker(false);
      }
    };
    if (showThemePicker) document.addEventListener('mousedown', handleClickOutsideTheme);
    return () => document.removeEventListener('mousedown', handleClickOutsideTheme);
  }, [showThemePicker]);

  useEffect(() => {
    const handleClickOutsideChat = (e: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(e.target as Node)) {
        setChatOpen(false);
      }
    };
    if (chatOpen) document.addEventListener('mousedown', handleClickOutsideChat);
    return () => document.removeEventListener('mousedown', handleClickOutsideChat);
  }, [chatOpen]);

  useEffect(() => {
    const user = getLoggedInUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // ─── Task Tracker: Login popup (1s delay after page load, once per session) ───
  useEffect(() => {
    if (!currentUser || loginPopupShown || loginPopupDisabled) return;
    // Check sessionStorage so it only shows once per browser session
    const alreadyShown = sessionStorage.getItem('saaras-task-popup-shown');
    if (alreadyShown) {
      setLoginPopupShown(true);
      return;
    }
    const timer = setTimeout(() => {
      setTaskPopupMode('login');
      setTaskPopupOpen(true);
      setLoginPopupShown(true);
      sessionStorage.setItem('saaras-task-popup-shown', 'true');
    }, 1000);
    return () => clearTimeout(timer);
  }, [currentUser, loginPopupShown, loginPopupDisabled]);

  // ─── Task Tracker: Inactivity timer (5 min default for blueprint) ───
  useEffect(() => {
    if (!currentUser) return;

    const IDLE_TIMEOUT = 5 * 60 * 1000; // 5 minutes

    const resetIdleTimer = () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        // Only show idle popup if task popup is not already open
        if (!taskPopupOpen) {
          setTaskPopupMode('idle');
          setTaskPopupOpen(true);
        }
      }, IDLE_TIMEOUT);
    };

    // Activity events to listen for
    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
    events.forEach(event => window.addEventListener(event, resetIdleTimer));

    // Start the idle timer initially
    resetIdleTimer();

    return () => {
      events.forEach(event => window.removeEventListener(event, resetIdleTimer));
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [currentUser, taskPopupOpen]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleLogin = (user: TeamMember) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-slate-500 text-sm">Loading...</div>
    </div>;
  }

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Build the list of theme rows for the picker: 4 base + 1 Vivid
  const themePickerRows = [
    ...themes.map((t, i) => ({ theme: t, idx: i, isVivid: false })),
    { theme: VIVID_VARIANTS[selectedVividColor], idx: VIVID_THEME_IDX, isVivid: true },
  ];

  return (
    <div className={`min-h-screen ${theme.bodyBg} flex`}>
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-56' : 'w-0 overflow-hidden'} ${theme.sidebarBg} border-r ${theme.border} transition-all duration-200 fixed h-full z-30 flex flex-col`}>
        <div className="p-4 border-b border-slate-200/10">
          <h1 className={`text-lg font-bold ${theme.primaryText}`}>Saaras.ai</h1>
          <p className={`text-[10px] ${theme.iconColor}`}>Blueprint Navigator</p>
        </div>
        <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {navItems.map(item => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? `${theme.primary} text-white`
                    : `${theme.iconColor} ${theme.buttonHover}`
                }`}
              >
                <item.icon size={14} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User info */}
        <div className={`p-3 border-t ${theme.border}`}>
          <div className={`flex items-center justify-between p-2 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>{currentUser.name}</p>
              <p className={`text-[10px] ${theme.iconColor}`}>{currentUser.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className={`p-1.5 rounded-lg hover:bg-red-500/20 ${theme.iconColor} hover:text-red-400 transition-all`}
              title="Sign out"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className={`flex-1 ${sidebarOpen ? 'ml-56' : 'ml-0'} transition-all duration-200`}>
        {/* Top bar */}
        <div className={`sticky top-0 z-20 ${theme.cardBg} border-b ${theme.border} px-4 py-2 flex items-center justify-between`}>
          <div className="flex items-center gap-2">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`p-1.5 rounded-lg ${theme.secondaryBg}`}>
              {sidebarOpen ? <ChevronLeft size={14} className={theme.iconColor} /> : <Menu size={14} className={theme.iconColor} />}
            </button>
            <span className={`text-xs ${theme.iconColor}`}>
              {pathname === '/' ? 'All Dashboards' : navItems.find(n => pathname.startsWith(n.href) && n.href !== '/')?.label || pathname}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] px-2 py-1 rounded-lg ${theme.secondaryBg} ${theme.iconColor}`}>
              BLUEPRINT MODE — Not a live system
            </span>
            {/* Theme picker */}
            <div ref={themePickerRef} className="relative">
              <button
                onClick={() => setShowThemePicker(!showThemePicker)}
                className={`p-2 rounded-lg ${theme.secondaryBg} ${theme.iconColor} hover:opacity-80 transition-all`}
                title="Change theme"
              >
                <Palette size={14} />
              </button>
              {showThemePicker && (
                <div className={`absolute right-0 top-10 w-56 ${theme.cardBg} border ${theme.border} rounded-xl shadow-2xl z-50 overflow-hidden`}>
                  <div className={`px-3 py-2 border-b ${theme.border}`}>
                    <span className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>Select Theme</span>
                  </div>
                  {themePickerRows.map((row) => {
                    const isActive = row.idx === themeIdx;
                    const swatchColor = row.isVivid
                      ? (vividColorOptions.find(vc => vc.name === selectedVividColor)?.bg || 'bg-rose-300')
                      : (baseSwatchColors[row.theme.id] || row.theme.primary);
                    const displayName = row.isVivid ? 'Vivid' : row.theme.name;

                    return (
                      <div key={row.isVivid ? 'vivid' : row.theme.id}>
                        <button
                          onClick={() => {
                            setThemeIdx(row.idx);
                            if (!row.isVivid) setShowThemePicker(false);
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-all ${
                            isActive ? `${theme.secondaryBg}` : `${theme.buttonHover}`
                          }`}
                        >
                          <span className={`w-4 h-4 rounded-full ${swatchColor} shrink-0 ${isActive ? 'ring-2 ring-offset-1 ring-purple-400' : ''}`} />
                          <span className={`text-xs font-medium ${theme.highlight}`}>{displayName}</span>
                          {isActive && <span className={`text-[10px] ml-auto ${theme.primaryText} font-bold`}>Active</span>}
                        </button>
                        {row.isVivid && isActive && (
                          <div className={`px-3 pb-2.5 pt-1`}>
                            <p className={`text-[9px] font-bold ${theme.iconColor} uppercase mb-1.5`}>Accent Color</p>
                            <div className="flex flex-wrap gap-1.5">
                              {vividColorOptions.map(vc => (
                                <button
                                  key={vc.name}
                                  onClick={() => { setSelectedVividColor(vc.name); }}
                                  title={vc.name}
                                  className={`w-5 h-5 rounded-full ${vc.bg} transition-all hover:scale-110 ${
                                    selectedVividColor === vc.name ? 'ring-2 ring-offset-1 ring-slate-400 scale-110' : ''
                                  }`}
                                />
                              ))}
                            </div>
                            <p className={`text-[9px] ${theme.iconColor} mt-1.5`}>Selected: {selectedVividColor}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className={`p-2 rounded-lg ${theme.secondaryBg} ${theme.iconColor} hover:opacity-80 transition-all`}
              title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
            {/* Notification Bell */}
            <div ref={notifRef} className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-2 rounded-lg ${theme.secondaryBg} ${theme.iconColor} hover:opacity-80 transition-all`}
                title="Notifications"
              >
                <Bell size={14} />
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full text-[8px] text-white font-bold flex items-center justify-center">3</span>
              </button>
              {showNotifications && (
                <div className={`absolute right-0 top-10 w-80 ${theme.cardBg} border ${theme.border} rounded-2xl shadow-2xl z-50 overflow-hidden`}>
                  <div className={`px-4 py-3 border-b ${theme.border} flex items-center justify-between`}>
                    <span className={`text-xs font-bold ${theme.highlight}`}>Notifications</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 font-bold">3 new</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {[
                      { icon: MessageSquare, title: 'New message from Vice Principal', time: '2 min ago', color: 'border-l-blue-500', unread: true },
                      { icon: FileText, title: 'Circular: Annual Day preparations', time: '15 min ago', color: 'border-l-amber-500', unread: true },
                      { icon: ClipboardCheck, title: 'Leave request needs approval', time: '30 min ago', color: 'border-l-purple-500', unread: true },
                      { icon: Calendar, title: 'PTM scheduled for tomorrow', time: '1 hr ago', color: 'border-l-teal-500', unread: false },
                      { icon: CheckCircle, title: 'Attendance report generated', time: '2 hrs ago', color: 'border-l-emerald-500', unread: false },
                      { icon: AlertTriangle, title: 'Fee payment reminder sent', time: '3 hrs ago', color: 'border-l-red-500', unread: false },
                    ].map((n, i) => (
                      <div key={i} className={`flex items-start gap-3 px-4 py-3 border-l-[3px] ${n.color} ${n.unread ? theme.secondaryBg : ''} hover:opacity-80 cursor-pointer transition-all`}>
                        <n.icon size={14} className={`mt-0.5 ${theme.iconColor} shrink-0`} />
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs ${n.unread ? `font-bold ${theme.highlight}` : theme.iconColor}`}>{n.title}</p>
                          <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>{n.time}</p>
                        </div>
                        {n.unread && <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />}
                      </div>
                    ))}
                  </div>
                  <div className={`px-4 py-2.5 border-t ${theme.border} text-center`}>
                    <button className={`text-[10px] font-bold ${theme.primaryText}`}>View All Notifications</button>
                  </div>
                </div>
              )}
            </div>
            {/* Profile avatar with photo placeholder */}
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold ${theme.primaryText}`}>{currentUser.name}</span>
              <div className={`w-8 h-8 rounded-full ${theme.primary} text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-offset-1 ring-offset-transparent ${theme.border}`} title={currentUser.name}>
                {currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="p-6">
          {React.Children.map(children, child => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as React.ReactElement<{ theme: Theme; themeIdx: number; onThemeChange: (idx: number) => void }>, { theme, themeIdx, onThemeChange: setThemeIdx });
            }
            return child;
          })}
        </div>
      </main>

      {/* Floating Chat Widget */}
      <div ref={chatRef} className="fixed bottom-6 right-6 z-50">
        {chatOpen && (
          <div className={`mb-3 w-[320px] h-[440px] ${theme.cardBg} border ${theme.border} rounded-2xl shadow-2xl flex flex-col overflow-hidden`}>
            {/* Chat Header */}
            <div className="flex items-center justify-between px-3 py-2.5 bg-green-500 text-white rounded-t-2xl">
              <div className="flex items-center gap-2">
                <MessageCircle size={14} />
                <span className="text-xs font-bold">Chats</span>
                <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded-full">{conversations.filter(c => c.unread > 0).length} unread</span>
              </div>
              <button onClick={() => setChatOpen(false)} className="p-1 rounded-lg hover:bg-green-600 transition-all">
                <X size={12} />
              </button>
            </div>

            {/* Search */}
            <div className={`px-3 py-2 border-b ${theme.border}`}>
              <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl ${theme.secondaryBg} border ${theme.border}`}>
                <Search size={12} className={theme.iconColor} />
                <input type="text" placeholder="Search conversations..." className={`flex-1 text-[10px] bg-transparent ${theme.highlight} outline-none placeholder:${theme.iconColor}`} />
              </div>
            </div>

            {/* Conversations List — Real data from ChatModule */}
            <div className="flex-1 overflow-y-auto">
              {conversations.map((c) => (
                <div key={c.id} className={`flex items-center gap-2.5 px-3 py-2.5 cursor-pointer transition-all ${theme.buttonHover} ${c.unread > 0 ? theme.secondaryBg : ''} border-b ${theme.border}`}>
                  <div className="relative">
                    <div className={`w-8 h-8 rounded-full ${c.type === 'group' ? theme.primary : 'bg-slate-300'} text-white flex items-center justify-center text-[9px] font-bold shrink-0`}>
                      {c.avatar}
                    </div>
                    {c.online && <div className="w-2 h-2 bg-emerald-500 rounded-full absolute -bottom-0.5 -right-0.5 border border-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-[11px] font-bold ${theme.highlight} truncate`}>
                        {c.pinned && <span className="text-amber-500 mr-0.5">&#x1F4CC;</span>}
                        {c.name}
                      </p>
                      <span className={`text-[9px] ${c.unread > 0 ? theme.primaryText + ' font-bold' : theme.iconColor} shrink-0 ml-1`}>{c.time}</span>
                    </div>
                    <p className={`text-[10px] ${c.unread > 0 ? `${theme.highlight} font-medium` : theme.iconColor} truncate`}>{c.lastMsg}</p>
                  </div>
                  {c.unread > 0 && (
                    <span className={`w-4 h-4 rounded-full ${theme.primary} text-white text-[8px] font-bold flex items-center justify-center shrink-0`}>{c.unread}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Chat Dashboard Link */}
            <Link
              href="/chat"
              onClick={() => setChatOpen(false)}
              className={`flex items-center justify-center gap-2 px-3 py-2.5 border-t ${theme.border} bg-green-500 text-white hover:bg-green-600 transition-all text-xs font-bold`}
            >
              <MessageSquare size={14} />
              Open Chat Dashboard
            </Link>
          </div>
        )}

        {/* Chat Bubble */}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:bg-green-600 transition-all hover:scale-105 relative"
          title="Quick Chat"
        >
          <MessageCircle size={22} />
          {conversations.filter(c => c.unread > 0).length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] text-white font-bold flex items-center justify-center ring-2 ring-white">
              {conversations.filter(c => c.unread > 0).length}
            </span>
          )}
        </button>
      </div>

      {/* Task Tracker Popup */}
      <TaskTrackerPopup
        theme={theme}
        userName={currentUser.name}
        isOpen={taskPopupOpen}
        onClose={() => setTaskPopupOpen(false)}
        triggerMode={taskPopupMode}
        onDisableLoginPopup={() => setLoginPopupDisabled(true)}
      />

      {/* Feedback system */}
      <FeedbackSystem currentPage={pathname} currentUser={currentUser.name} />
    </div>
  );
}
