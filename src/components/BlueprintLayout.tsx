'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Building2, GraduationCap, BookOpen, User, Users, Shield, Eye,
  UserCheck, Briefcase, Calculator, Phone, Bus, ShieldCheck, Headphones,
  Home, ChevronLeft, Menu, LogOut, MessageSquare, Bell,
  FileText, CheckCircle, Calendar, AlertTriangle, ClipboardCheck
} from 'lucide-react';
import { themes, type Theme } from '@/lib/themes';
import { getLoggedInUser, logoutUser, type TeamMember } from '@/lib/auth';
import FeedbackSystem from './FeedbackSystem';
import LoginPage from './LoginPage';

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
];

export default function BlueprintLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [themeIdx, setThemeIdx] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentUser, setCurrentUser] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const theme = themes[themeIdx];

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
    const user = getLoggedInUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

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

        {/* Theme selector + User info */}
        <div className={`p-3 border-t ${theme.border} space-y-2`}>
          <div>
            <p className={`text-[10px] ${theme.iconColor} mb-1 font-bold uppercase`}>Theme</p>
            <div className="flex gap-1">
              {themes.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setThemeIdx(i)}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all ${
                    i === themeIdx ? `${t.primary} text-white ring-2 ring-purple-400` : `${t.secondaryBg} ${t.iconColor}`
                  }`}
                  title={t.name}
                >
                  {t.name[0]}
                </button>
              ))}
            </div>
          </div>
          {/* Logged-in user */}
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
          <div className="flex items-center gap-3">
            <span className={`text-[10px] px-2 py-1 rounded-lg ${theme.secondaryBg} ${theme.iconColor}`}>
              BLUEPRINT MODE — Not a live system
            </span>
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
            <span className={`text-xs font-bold ${theme.primaryText}`}>{currentUser.name}</span>
          </div>
        </div>

        {/* Page content */}
        <div className="p-6">
          {React.Children.map(children, child => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as React.ReactElement<{ theme: Theme }>, { theme });
            }
            return child;
          })}
        </div>
      </main>

      {/* Feedback system */}
      <FeedbackSystem currentPage={pathname} currentUser={currentUser.name} />
    </div>
  );
}
