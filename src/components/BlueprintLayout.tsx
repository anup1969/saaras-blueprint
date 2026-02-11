'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Building2, GraduationCap, BookOpen, User, Users, Shield, Eye,
  UserCheck, Briefcase, Calculator, Phone, Bus, ShieldCheck, Headphones,
  Home, ChevronLeft, Menu, LogOut
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
];

export default function BlueprintLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [themeIdx, setThemeIdx] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentUser, setCurrentUser] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);
  const theme = themes[themeIdx];

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
