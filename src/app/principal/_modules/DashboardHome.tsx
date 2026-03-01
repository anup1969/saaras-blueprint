'use client';

import { useState } from 'react';
import { StatCard } from '@/components/shared';
import PrincipalMobileApp from './PrincipalMobileApp';
import { type Theme } from '@/lib/themes';
import {
  Users, UserCheck, Clock, AlertTriangle, Bell, BarChart3, CheckCircle,
  Send, Calendar, GraduationCap, Briefcase, ChevronRight, Banknote,
  ClipboardCheck, Star, FileText, ShieldCheck, Award, User, Sparkles,
  Radio, Cake, Heart, Moon, Sun, Image, LayoutGrid, X, Eye, EyeOff,
  Timer, Phone, Stethoscope, ChevronDown, ChevronUp, Shield, MessageSquare,
  HelpCircle, Smartphone,
} from 'lucide-react';
import TaskTrackerPanel from '@/components/TaskTrackerPanel';
import RecurringTasksCard from '@/components/RecurringTasksCard';
import OnboardingTour from '@/components/OnboardingTour';
import DrillDownPanel from './DrillDownPanel';

export default function DashboardHome({ theme, onProfileClick, isPreschool }: { theme: Theme; onProfileClick: () => void; isPreschool?: boolean }) {
  const [drillDown, setDrillDown] = useState<'students' | 'academic' | 'non-academic' | null>(null);
  const [showEnquiryPipeline, setShowEnquiryPipeline] = useState(false);
  const [showFeeDrillDown, setShowFeeDrillDown] = useState(false);
  const [showApprovalsDrillDown, setShowApprovalsDrillDown] = useState(false);
  const [showCollectionDrillDown, setShowCollectionDrillDown] = useState(false);

  {/* Gap 13 — Dark Mode state */}
  const [darkMode, setDarkMode] = useState(false);

  {/* Dismissible alert state */}
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);

  {/* Gap 12 — Dashlet Gallery state */}
  const [showGallery, setShowGallery] = useState(false);
  const [dashletVisibility, setDashletVisibility] = useState<Record<string, boolean>>({
    'birthday': true, 'sparkline': true,
    'infirmary': true, 'rteQuota': true,
  });

  {/* Compact card expanded states */}
  const [birthdayExpanded, setBirthdayExpanded] = useState(false);
  const [galleryExpanded, setGalleryExpanded] = useState(false);
  const [infirmaryExpanded, setInfirmaryExpanded] = useState(false);

  {/* Gap 22 — Mini-Profile Popup state */}
  const [miniProfile, setMiniProfile] = useState<{name: string; class?: string; role?: string} | null>(null);

  {/* Gap 10 — Onboarding Tour state */}
  const [showTour, setShowTour] = useState(false);

  {/* Gap 18 — Sensitive Data Masking state */}
  const [dataMasked, setDataMasked] = useState(false);

  {/* Mobile App Preview side-panel state */}
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  return (
    <div className="flex gap-4">
      <div className={`${showMobilePreview ? 'flex-1 min-w-0' : 'w-full'} space-y-4 transition-all`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${theme.highlight}`}>{isPreschool ? 'Principal / Centre Head Dashboard' : 'Principal Dashboard'}</h1>
          {/* Gap 9 — Data Freshness Indicator */}
          <p className={`text-[10px] ${theme.iconColor} flex items-center gap-1`}><Clock size={10} /> Last refreshed: 2 min ago</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Gap 10 — Take a Tour Button */}
          <button onClick={() => setShowTour(true)} title="Take a Tour" className={`relative w-9 h-9 rounded-full ${theme.secondaryBg} flex items-center justify-center ${theme.buttonHover} transition-all`}>
            <HelpCircle size={16} className={theme.iconColor} />
          </button>
          {/* Gap 18 — Sensitive Data Masking Toggle */}
          <button onClick={() => setDataMasked(!dataMasked)} title="Toggle sensitive data masking" className={`relative w-9 h-9 rounded-full ${theme.secondaryBg} flex items-center justify-center ${theme.buttonHover} transition-all`}>
            {dataMasked ? <EyeOff size={16} className="text-red-500" /> : <Eye size={16} className={theme.iconColor} />}
          </button>
          {/* Gap 12 — Browse Dashlets Button */}
          <button onClick={() => setShowGallery(true)} title="Browse Dashlets" className={`relative w-9 h-9 rounded-full ${theme.secondaryBg} flex items-center justify-center ${theme.buttonHover} transition-all`}>
            <LayoutGrid size={16} className={theme.iconColor} />
          </button>
          {/* Gap 13 — Dark Mode / Accessibility Toggle */}
          <button onClick={() => setDarkMode(!darkMode)} title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'} className={`relative w-9 h-9 rounded-full ${theme.secondaryBg} flex items-center justify-center ${theme.buttonHover} transition-all`}>
            {darkMode ? <Sun size={16} className="text-amber-500" /> : <Moon size={16} className={theme.iconColor} />}
          </button>
          {/* Mobile App Preview Toggle */}
          <button onClick={() => setShowMobilePreview(!showMobilePreview)} title="Mobile App Preview" className={`relative w-9 h-9 rounded-full ${showMobilePreview ? 'bg-green-500 text-white' : theme.secondaryBg} flex items-center justify-center ${theme.buttonHover} transition-all`}>
            <Smartphone size={16} className={showMobilePreview ? 'text-white' : theme.iconColor} />
          </button>
          {/* Notification Bell */}
          <button title="Notifications" className={`relative w-9 h-9 rounded-full ${theme.secondaryBg} flex items-center justify-center ${theme.buttonHover} transition-all`}>
            <Bell size={16} className={theme.iconColor} />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">3</span>
          </button>
          {/* Profile Avatar */}
          <button onClick={onProfileClick} title="My Profile" className={`w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center hover:opacity-90 transition-opacity ring-2 ring-white shadow-sm`}>
            <User size={16} />
          </button>
        </div>
      </div>


      {/* Gap 16 — Force-Push Mandatory Dashlet */}
      {!dismissedAlerts.includes('fee-collection-drive') && (
            <div className="rounded-2xl border-l-4 border-amber-500 bg-amber-50 border border-amber-200 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-sm font-bold text-amber-800 mb-1">Required Action</h3>
            <p className="text-xs text-amber-700">Fee Collection Drive — All class teachers must verify student fee status by March 5, 2026.</p>
            <p className="text-[10px] text-amber-600 mt-1 italic">This dashlet will remain visible until the task is completed.</p>
            <div className="flex items-center gap-2 mt-3">
              <button onClick={() => alert('Marked as complete')} className="px-3 py-1.5 rounded-xl bg-amber-600 text-white text-[10px] font-bold hover:bg-amber-700 transition-colors">
                Mark as Done
              </button>
              <button className="px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-amber-700 text-[10px] font-bold hover:bg-amber-100 transition-colors">
                View Details
              </button>
            </div>
          </div>
          <button onClick={() => setDismissedAlerts(prev => [...prev, 'fee-collection-drive'])} className="ml-auto text-amber-400 hover:text-amber-600 transition-colors shrink-0">
            <X size={14} />
          </button>
        </div>
      </div>
      )}

      {/* Gap 20 — Bottleneck Alert (Principal-specific) */}
      {!isPreschool && !dismissedAlerts.includes('bottleneck-alert') && (
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800">
          <AlertTriangle size={14} className="text-amber-600 shrink-0" />
          <p className="text-xs font-medium flex-1">Bottleneck Alert — 23 leave approvals pending &gt; 3 days | 5 fee concessions awaiting sign-off</p>
          <button onClick={() => setDismissedAlerts(prev => [...prev, 'bottleneck-alert'])} className="ml-auto text-amber-400 hover:text-amber-600 transition-colors shrink-0">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Preschool Mode Banner */}
      {isPreschool && !dismissedAlerts.includes('preschool-mode') && (
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800">
          <AlertTriangle size={14} className="text-amber-600 shrink-0" />
          <p className="text-xs font-medium flex-1">Preschool Mode — Showing Centre Head view with child safety, staff-child ratios, and milestone tracking</p>
          <button onClick={() => setDismissedAlerts(prev => [...prev, 'preschool-mode'])} className="ml-auto text-amber-400 hover:text-amber-600 transition-colors shrink-0">
            <X size={14} />
          </button>
        </div>
      )}
      {/* Attendance Row — Student + Academic Staff + Non-Academic Staff (Clickable) */}
      <div className="grid grid-cols-3 gap-3">
        {/* Student Attendance */}
        <button onClick={() => setDrillDown(drillDown === 'students' ? null : 'students')} className={`text-left ${theme.cardBg} rounded-2xl border-2 ${drillDown === 'students' ? 'border-blue-500 ring-1 ring-blue-500/30' : theme.border} p-4 hover:border-blue-400 transition-all cursor-pointer`}>
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Users size={14} className={theme.iconColor} />
                <h3 className={`text-xs font-bold ${theme.highlight}`}>Students</h3>
                <ChevronRight size={10} className={`${theme.iconColor} ${drillDown === 'students' ? 'rotate-90' : ''} transition-transform`} />
              </div>
              <p className={`text-2xl font-bold ${theme.highlight}`}>{dataMasked ? '*** / ***' : '2,598 / 2,847'}</p>
              <p className={`text-xs ${theme.iconColor} mt-0.5`}>Enrolled: {dataMasked ? '***' : '3,000'}</p>
            </div>
            <div className="w-20 h-20 ml-2 shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <circle r="16" cx="18" cy="18" fill="none" stroke="#9ca3af" strokeWidth="4" strokeDasharray={`${(153/3000)*100.53} ${100.53-(153/3000)*100.53}`} strokeDashoffset="25.13" transform="rotate(-90 18 18)" />
                <circle r="16" cx="18" cy="18" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray={`${(249/3000)*100.53} ${100.53-(249/3000)*100.53}`} strokeDashoffset={`${25.13-(153/3000)*100.53}`} transform="rotate(-90 18 18)" />
                <circle r="16" cx="18" cy="18" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray={`${(2598/3000)*100.53} ${100.53-(2598/3000)*100.53}`} strokeDashoffset={`${25.13-(153/3000)*100.53-(249/3000)*100.53}`} transform="rotate(-90 18 18)" />
                <text x="18" y="19" textAnchor="middle" dominantBaseline="middle" className="fill-emerald-600" style={{ fontSize: '10px', fontWeight: 700 }}>87%</text>
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /><span className={`text-xs ${theme.iconColor}`}>2,598</span></span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" /><span className={`text-xs ${theme.iconColor}`}>249</span></span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-400 inline-block" /><span className={`text-xs ${theme.iconColor}`}>153</span></span>
          </div>
        </button>

        {/* Academic Staff */}
        <button onClick={() => setDrillDown(drillDown === 'academic' ? null : 'academic')} className={`text-left ${theme.cardBg} rounded-2xl border-2 ${drillDown === 'academic' ? 'border-blue-500 ring-1 ring-blue-500/30' : theme.border} p-4 hover:border-blue-400 transition-all cursor-pointer`}>
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1.5">
                <GraduationCap size={14} className={theme.iconColor} />
                <h3 className={`text-xs font-bold ${theme.highlight}`}>Academic Staff</h3>
                <ChevronRight size={10} className={`${theme.iconColor} ${drillDown === 'academic' ? 'rotate-90' : ''} transition-transform`} />
              </div>
              <p className={`text-2xl font-bold ${theme.highlight}`}>{dataMasked ? '*** / ***' : '72 / 78'}</p>
              <p className={`text-xs text-emerald-600 mt-0.5`}>{dataMasked ? '**% Present' : '92% Present'}</p>
            </div>
            <div className="w-20 h-20 ml-2 shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <circle r="16" cx="18" cy="18" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray={`${(6/78)*100.53} ${100.53-(6/78)*100.53}`} strokeDashoffset="25.13" transform="rotate(-90 18 18)" />
                <circle r="16" cx="18" cy="18" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray={`${(72/78)*100.53} ${100.53-(72/78)*100.53}`} strokeDashoffset={`${25.13-(6/78)*100.53}`} transform="rotate(-90 18 18)" />
                <text x="18" y="19" textAnchor="middle" dominantBaseline="middle" className="fill-emerald-600" style={{ fontSize: '10px', fontWeight: 700 }}>92%</text>
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /><span className={`text-xs ${theme.iconColor}`}>72</span></span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" /><span className={`text-xs ${theme.iconColor}`}>6</span></span>
          </div>
        </button>

        {/* Non-Academic Staff */}
        <button onClick={() => setDrillDown(drillDown === 'non-academic' ? null : 'non-academic')} className={`text-left ${theme.cardBg} rounded-2xl border-2 ${drillDown === 'non-academic' ? 'border-blue-500 ring-1 ring-blue-500/30' : theme.border} p-4 hover:border-blue-400 transition-all cursor-pointer`}>
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Briefcase size={14} className={theme.iconColor} />
                <h3 className={`text-xs font-bold ${theme.highlight}`}>Non-Academic</h3>
                <ChevronRight size={10} className={`${theme.iconColor} ${drillDown === 'non-academic' ? 'rotate-90' : ''} transition-transform`} />
              </div>
              <p className={`text-2xl font-bold ${theme.highlight}`}>{dataMasked ? '*** / ***' : '56 / 64'}</p>
              <p className={`text-xs text-emerald-600 mt-0.5`}>{dataMasked ? '**% Present' : '88% Present'}</p>
            </div>
            <div className="w-20 h-20 ml-2 shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <circle r="16" cx="18" cy="18" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray={`${(8/64)*100.53} ${100.53-(8/64)*100.53}`} strokeDashoffset="25.13" transform="rotate(-90 18 18)" />
                <circle r="16" cx="18" cy="18" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray={`${(56/64)*100.53} ${100.53-(56/64)*100.53}`} strokeDashoffset={`${25.13-(8/64)*100.53}`} transform="rotate(-90 18 18)" />
                <text x="18" y="19" textAnchor="middle" dominantBaseline="middle" className="fill-emerald-600" style={{ fontSize: '10px', fontWeight: 700 }}>88%</text>
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /><span className={`text-xs ${theme.iconColor}`}>56</span></span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" /><span className={`text-xs ${theme.iconColor}`}>8</span></span>
          </div>
        </button>
      </div>

      {/* Drill-Down Analytics Panel */}
      {drillDown && (
        <DrillDownPanel type={drillDown} theme={theme} onClose={() => setDrillDown(null)} />
      )}

      {/* Stat Cards + Quick Actions — same row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <StatCard icon={Banknote} label="Fee This Month" value={dataMasked ? '\u20B9 **** / \u20B9 ****' : '\u20B912.4L / \u20B918L'} color="bg-emerald-500" sub="Click for breakdown" theme={theme} onClick={() => setShowFeeDrillDown(!showFeeDrillDown)} />
        <StatCard icon={Users} label="New Enquiries" value={dataMasked ? '***' : '12'} color="bg-purple-500" sub={dataMasked ? 'Click to view pipeline | *** seats open' : 'Click to view pipeline | 45 seats open'} theme={theme} onClick={() => setShowEnquiryPipeline(!showEnquiryPipeline)} />
        <StatCard icon={Clock} label="Pending Approvals" value="8" color="bg-amber-500" theme={theme} onClick={() => setShowApprovalsDrillDown(!showApprovalsDrillDown)} />
        <StatCard icon={Banknote} label="Today's Collection" value={dataMasked ? '\u20B9 ****' : '\u20B92,45,000'} color="bg-green-500" sub={dataMasked ? 'Outstanding: \u20B9 ****' : 'Outstanding: \u20B918.5L'} theme={theme} onClick={() => setShowCollectionDrillDown(!showCollectionDrillDown)} />
        {/* Quick Actions — compact icon row */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-3 flex flex-col justify-center`}>
          <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-2`}>Quick Actions</p>
          <div className="flex items-center gap-2">
            {[
              { label: 'Reports', icon: BarChart3, color: 'bg-blue-500' },
              { label: 'Approve', icon: CheckCircle, color: 'bg-emerald-500' },
              { label: 'Circular', icon: Send, color: 'bg-indigo-500' },
              { label: 'Meeting', icon: Calendar, color: 'bg-purple-500' },
            ].map(a => (
              <button key={a.label} title={a.label} className={`w-8 h-8 rounded-lg ${a.color} flex items-center justify-center text-white hover:opacity-80 transition-opacity`}>
                <a.icon size={14} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enquiry Pipeline Drill-Down */}
      {showEnquiryPipeline && (
        <div className={`${theme.cardBg} rounded-2xl border-2 border-purple-400 ring-1 ring-purple-400/30 p-4`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Enquiry Pipeline — Today</h3>
            <button onClick={() => setShowEnquiryPipeline(false)} className={`text-xs ${theme.iconColor} hover:text-red-500`}>Close</button>
          </div>
          {/* Admission Vacancies Summary */}
          <div className="mb-3 px-3 py-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700">
            <p className="text-xs font-bold">Admission Vacancies: <span className="font-medium">KG: 8 seats | Class I: 5 | Class VI: 12 | Total: 45 seats across all grades</span></p>
          </div>
          <div className="grid grid-cols-5 gap-2 mb-3">
            {[
              { stage: 'New', count: 5, color: 'bg-blue-500', sub: '3 walk-in, 2 online' },
              { stage: 'Follow-up', count: 3, color: 'bg-amber-500', sub: 'Call scheduled today' },
              { stage: 'Test Scheduled', count: 2, color: 'bg-purple-500', sub: 'Feb 18 & Feb 20' },
              { stage: 'Converted', count: 1, color: 'bg-emerald-500', sub: 'Admission confirmed' },
              { stage: 'Lost', count: 1, color: 'bg-red-500', sub: 'Fee too high' },
            ].map(s => (
              <div key={s.stage} className={`${theme.secondaryBg} rounded-xl p-3 border ${theme.border} text-center`}>
                <div className={`w-8 h-8 rounded-full ${s.color}/20 mx-auto flex items-center justify-center mb-1.5`}>
                  <span className={`text-sm font-bold ${s.color.replace('bg-', 'text-')}`}>{s.count}</span>
                </div>
                <p className={`text-[10px] font-bold ${theme.highlight}`}>{s.stage}</p>
                <p className={`text-[9px] ${theme.iconColor} mt-0.5`}>{s.sub}</p>
              </div>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className={`border-b ${theme.border}`}>
                  <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Child</th>
                  <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Class</th>
                  <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Parent</th>
                  <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Source</th>
                  <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Stage</th>
                  <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Date</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { child: 'Vikram Rao', cls: 'Nursery', parent: 'Sunil Rao', source: 'Walk-in', stage: 'New', date: 'Today' },
                  { child: 'Anita Desai', cls: 'KG-1', parent: 'Meena Desai', source: 'Online', stage: 'Follow-up', date: 'Yesterday' },
                  { child: 'Kabir Joshi', cls: '3rd', parent: 'Suresh Joshi', source: 'Referral', stage: 'Converted', date: 'Feb 14' },
                  { child: 'Sanya Iyer', cls: '1st', parent: 'Ramesh Iyer', source: 'Online', stage: 'Test Scheduled', date: 'Feb 18' },
                  { child: 'Prachi Mehta', cls: '6th', parent: 'Deepak Mehta', source: 'Walk-in', stage: 'Lost', date: 'Feb 12' },
                ].map((e, i) => (
                  <tr key={i} className={`border-b ${theme.border} ${theme.buttonHover}`}>
                    <td className={`py-2 px-2 ${theme.highlight} font-bold`}>{e.child}</td>
                    <td className={`py-2 px-2 ${theme.iconColor}`}>{e.cls}</td>
                    <td className={`py-2 px-2 ${theme.iconColor}`}>{e.parent}</td>
                    <td className={`py-2 px-2 ${theme.iconColor}`}>{e.source}</td>
                    <td className="py-2 px-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        e.stage === 'New' ? 'bg-blue-100 text-blue-700' :
                        e.stage === 'Follow-up' ? 'bg-amber-100 text-amber-700' :
                        e.stage === 'Test Scheduled' ? 'bg-purple-100 text-purple-700' :
                        e.stage === 'Converted' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-red-100 text-red-700'
                      }`}>{e.stage}</span>
                    </td>
                    <td className={`py-2 px-2 ${theme.iconColor}`}>{e.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Fee Collection Drill-Down */}
      {showFeeDrillDown && (
        <div className={`${theme.cardBg} rounded-2xl border-2 border-emerald-400 ring-1 ring-emerald-400/30 p-4`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Fee Collection Breakdown — This Month</h3>
            <button onClick={() => setShowFeeDrillDown(false)} className={`text-xs ${theme.iconColor} hover:text-red-500`}>Close</button>
          </div>
          {/* Summary Stats */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[
              { label: 'Total Collected', value: dataMasked ? '\u20B9 ****' : '\u20B912.4L', color: 'text-emerald-600', bgColor: 'bg-emerald-50 border-emerald-200' },
              { label: 'Outstanding', value: dataMasked ? '\u20B9 ****' : '\u20B95.6L', color: 'text-red-600', bgColor: 'bg-red-50 border-red-200' },
              { label: 'Defaulters', value: dataMasked ? '*** students' : '45 students', color: 'text-amber-600', bgColor: 'bg-amber-50 border-amber-200' },
              { label: 'Online vs Cash', value: '68% / 32%', color: 'text-blue-600', bgColor: 'bg-blue-50 border-blue-200' },
            ].map(s => (
              <div key={s.label} className={`${s.bgColor} border rounded-xl p-3 text-center`}>
                <p className={`text-[10px] ${theme.iconColor} mb-1`}>{s.label}</p>
                <p className={`text-sm font-bold ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>
          {/* Class-wise Collection Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className={`border-b ${theme.border}`}>
                  <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Class</th>
                  <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Total Due</th>
                  <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Collected</th>
                  <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Outstanding</th>
                  <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Collection %</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { cls: 'Class I', due: '\u20B91,80,000', collected: '\u20B91,72,000', outstanding: '\u20B98,000', pct: 96 },
                  { cls: 'Class II', due: '\u20B92,10,000', collected: '\u20B91,89,000', outstanding: '\u20B921,000', pct: 90 },
                  { cls: 'Class III', due: '\u20B91,95,000', collected: '\u20B91,62,000', outstanding: '\u20B933,000', pct: 83 },
                  { cls: 'Class V', due: '\u20B92,40,000', collected: '\u20B92,16,000', outstanding: '\u20B924,000', pct: 90 },
                  { cls: 'Class VI', due: '\u20B92,60,000', collected: '\u20B92,08,000', outstanding: '\u20B952,000', pct: 80 },
                  { cls: 'Class VIII', due: '\u20B93,00,000', collected: '\u20B92,22,000', outstanding: '\u20B978,000', pct: 74 },
                  { cls: 'Class IX', due: '\u20B93,20,000', collected: '\u20B92,24,000', outstanding: '\u20B996,000', pct: 70 },
                  { cls: 'Class X', due: '\u20B93,50,000', collected: '\u20B93,15,000', outstanding: '\u20B935,000', pct: 90 },
                ].map((r, i) => (
                  <tr key={i} className={`border-b ${theme.border} ${theme.buttonHover}`}>
                    <td className={`py-2 px-2 ${theme.highlight} font-bold`}>{r.cls}</td>
                    <td className={`py-2 px-2 ${theme.iconColor}`}>{dataMasked ? '\u20B9 ****' : r.due}</td>
                    <td className={`py-2 px-2 ${theme.iconColor}`}>{dataMasked ? '\u20B9 ****' : r.collected}</td>
                    <td className={`py-2 px-2 ${theme.iconColor}`}>{dataMasked ? '\u20B9 ****' : r.outstanding}</td>
                    <td className={`py-2 px-2 font-bold ${r.pct >= 90 ? 'text-emerald-600' : r.pct >= 75 ? 'text-amber-600' : 'text-red-600'}`}>{r.pct}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pending Approvals Drill-Down */}
      {showApprovalsDrillDown && (
        <div className={`${theme.cardBg} rounded-2xl border-2 border-amber-400 ring-1 ring-amber-400/30 p-4`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Pending Approvals — Action Required</h3>
            <button onClick={() => setShowApprovalsDrillDown(false)} className={`text-xs ${theme.iconColor} hover:text-red-500`}>Close</button>
          </div>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[
              { label: 'Leave Requests', value: '3', color: 'text-blue-600', bgColor: 'bg-blue-50 border-blue-200' },
              { label: 'Fee Concessions', value: '2', color: 'text-amber-600', bgColor: 'bg-amber-50 border-amber-200' },
              { label: 'TC Requests', value: '1', color: 'text-purple-600', bgColor: 'bg-purple-50 border-purple-200' },
              { label: 'Other', value: '2', color: 'text-gray-600', bgColor: 'bg-gray-50 border-gray-200' },
            ].map(s => (
              <div key={s.label} className={`${s.bgColor} border rounded-xl p-3 text-center`}>
                <p className={`text-[10px] ${theme.iconColor} mb-1`}>{s.label}</p>
                <p className={`text-sm font-bold ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {[
              { type: 'Leave', from: 'Mrs. Priya Sharma', detail: 'Casual Leave \u2014 3 days (Mar 5\u20137)', date: 'Today', priority: 'Urgent' },
              { type: 'Leave', from: 'Mr. Suresh Mehta', detail: 'Sick Leave \u2014 2 days', date: 'Yesterday', priority: 'Normal' },
              { type: 'Fee Waiver', from: 'Rajesh Patel (Class 6A)', detail: 'Fee concession request \u2014 \u20B915,000 (50%)', date: 'Today', priority: 'Normal' },
              { type: 'TC', from: 'Aarav Singh (Class 8B)', detail: 'Transfer Certificate \u2014 relocating to Pune', date: '2 days ago', priority: 'Normal' },
              { type: 'Budget', from: 'Admin Office', detail: 'Sports Day budget \u2014 \u20B945,000', date: '3 days ago', priority: 'Normal' },
              { type: 'Leave', from: 'Ms. Anita Desai', detail: 'Maternity Leave \u2014 26 weeks', date: '3 days ago', priority: 'Urgent' },
              { type: 'Event', from: 'Activity Coordinator', detail: 'Science Fair proposal \u2014 Mar 15', date: '4 days ago', priority: 'Normal' },
              { type: 'Purchase', from: 'Lab Dept', detail: 'Chemistry lab equipment \u2014 \u20B928,000', date: '5 days ago', priority: 'Normal' },
            ].map((a, i) => (
              <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  a.type === 'Leave' ? 'bg-blue-100' : a.type === 'Fee Waiver' ? 'bg-amber-100' : a.type === 'TC' ? 'bg-purple-100' : 'bg-gray-100'
                }`}>
                  <span className={`text-[10px] font-bold ${
                    a.type === 'Leave' ? 'text-blue-600' : a.type === 'Fee Waiver' ? 'text-amber-600' : a.type === 'TC' ? 'text-purple-600' : 'text-gray-600'
                  }`}>{a.type.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-[11px] font-bold ${theme.highlight} truncate`}>{a.from}</p>
                  <p className={`text-[10px] ${theme.iconColor} truncate`}>{a.detail}</p>
                </div>
                <span className={`text-[10px] ${theme.iconColor} shrink-0`}>{a.date}</span>
                {a.priority === 'Urgent' && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-700 font-bold shrink-0">Urgent</span>}
                <div className="flex gap-1 shrink-0">
                  <button className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center hover:bg-emerald-200 transition-colors">
                    <CheckCircle size={12} className="text-emerald-600" />
                  </button>
                  <button className="w-6 h-6 rounded-lg bg-red-100 flex items-center justify-center hover:bg-red-200 transition-colors">
                    <X size={12} className="text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Today's Collection Drill-Down */}
      {showCollectionDrillDown && (
        <div className={`${theme.cardBg} rounded-2xl border-2 border-green-400 ring-1 ring-green-400/30 p-4`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Today&apos;s Collection — Live</h3>
            <button onClick={() => setShowCollectionDrillDown(false)} className={`text-xs ${theme.iconColor} hover:text-red-500`}>Close</button>
          </div>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[
              { label: 'Cash', value: '\u20B978,000', color: 'text-emerald-600', bgColor: 'bg-emerald-50 border-emerald-200' },
              { label: 'Online/UPI', value: '\u20B91,42,000', color: 'text-blue-600', bgColor: 'bg-blue-50 border-blue-200' },
              { label: 'Cheque', value: '\u20B925,000', color: 'text-purple-600', bgColor: 'bg-purple-50 border-purple-200' },
              { label: 'Total', value: '\u20B92,45,000', color: 'text-gray-800', bgColor: 'bg-gray-100 border-gray-300' },
            ].map(s => (
              <div key={s.label} className={`${s.bgColor} border rounded-xl p-3 text-center`}>
                <p className={`text-[10px] ${theme.iconColor} mb-1`}>{s.label}</p>
                <p className={`text-sm font-bold ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className={`border-b ${theme.border}`}>
                  <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Receipt #</th>
                  <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Student</th>
                  <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Class</th>
                  <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Amount</th>
                  <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Mode</th>
                  <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Time</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { receipt: 'R-4521', student: 'Aarav Singh', cls: '8B', amount: '\u20B912,500', mode: 'UPI', time: '10:45 AM' },
                  { receipt: 'R-4520', student: 'Priya Verma', cls: '5A', amount: '\u20B98,000', mode: 'Cash', time: '10:30 AM' },
                  { receipt: 'R-4519', student: 'Kabir Joshi', cls: '3C', amount: '\u20B915,000', mode: 'Online', time: '10:15 AM' },
                  { receipt: 'R-4518', student: 'Sneha Patel', cls: '7A', amount: '\u20B925,000', mode: 'Cheque', time: '9:45 AM' },
                  { receipt: 'R-4517', student: 'Rahul Kumar', cls: '10B', amount: '\u20B918,500', mode: 'UPI', time: '9:30 AM' },
                ].map((t, i) => (
                  <tr key={i} className={`border-b ${theme.border} ${theme.buttonHover}`}>
                    <td className={`py-2 px-2 font-bold text-blue-600`}>{t.receipt}</td>
                    <td className={`py-2 px-2 ${theme.highlight} font-bold`}>{t.student}</td>
                    <td className={`py-2 px-2 ${theme.iconColor}`}>{t.cls}</td>
                    <td className={`py-2 px-2 font-bold text-emerald-600`}>{t.amount}</td>
                    <td className="py-2 px-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        t.mode === 'UPI' ? 'bg-blue-100 text-blue-700' :
                        t.mode === 'Online' ? 'bg-indigo-100 text-indigo-700' :
                        t.mode === 'Cheque' ? 'bg-purple-100 text-purple-700' :
                        'bg-emerald-100 text-emerald-700'
                      }`}>{t.mode}</span>
                    </td>
                    <td className={`py-2 px-2 ${theme.iconColor}`}>{t.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Preschool-specific cards removed per PM feedback — will revisit if meaningful KPIs identified */}

      {/* ========== GAP DASHLETS (conditionally visible via dashlet gallery) ========== */}

      {/* Compact Dashlet Row — Birthday, Gallery, Infirmary */}
      <div className="grid grid-cols-3 gap-3">
        {/* Compact Birthday Card */}
        {dashletVisibility['birthday'] && (
          <button onClick={() => setBirthdayExpanded(!birthdayExpanded)} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-3 text-left hover:ring-2 hover:ring-pink-300 transition-all`}>
            <div className="flex items-center gap-2">
              <Cake size={14} className="text-pink-500" />
              <p className={`text-xs font-bold ${theme.highlight}`}>Birthdays Today</p>
            </div>
            <p className={`text-lg font-bold ${theme.highlight} mt-1`}>3 + 1</p>
            <p className={`text-[10px] ${theme.iconColor}`}>3 students, 1 staff</p>
            <div className="flex items-center justify-end mt-1">
              {birthdayExpanded ? <ChevronUp size={12} className={theme.iconColor} /> : <ChevronDown size={12} className={theme.iconColor} />}
            </div>
          </button>
        )}

        {/* Compact Gallery Card */}
        {dashletVisibility['birthday'] && (
          <button onClick={() => setGalleryExpanded(!galleryExpanded)} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-3 text-left hover:ring-2 hover:ring-blue-300 transition-all`}>
            <div className="flex items-center gap-2">
              <Image size={14} className={theme.iconColor} />
              <p className={`text-xs font-bold ${theme.highlight}`}>Gallery</p>
            </div>
            <p className={`text-lg font-bold ${theme.highlight} mt-1`}>3 new</p>
            <p className={`text-[10px] ${theme.iconColor}`}>albums this week</p>
            <div className="flex items-center justify-end mt-1">
              {galleryExpanded ? <ChevronUp size={12} className={theme.iconColor} /> : <ChevronDown size={12} className={theme.iconColor} />}
            </div>
          </button>
        )}

        {/* Compact Infirmary Card */}
        {dashletVisibility['infirmary'] && (
          <button onClick={() => setInfirmaryExpanded(!infirmaryExpanded)} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-2.5 text-left hover:ring-2 hover:ring-red-300 transition-all`}>
            <div className="flex items-center gap-1.5">
              <Heart size={13} className="text-red-500" />
              <p className={`text-xs font-bold ${theme.highlight}`}>Infirmary</p>
            </div>
            <p className={`text-lg font-bold ${theme.highlight} mt-1`}>4 visits</p>
            <p className={`text-[10px] ${theme.iconColor}`}>12 allergy alerts</p>
            <div className="flex items-center justify-end mt-0.5">
              {infirmaryExpanded ? <ChevronUp size={12} className={theme.iconColor} /> : <ChevronDown size={12} className={theme.iconColor} />}
            </div>
          </button>
        )}

      </div>

      {/* Expanded Birthday Section */}
      {birthdayExpanded && dashletVisibility['birthday'] && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Cake size={16} className="text-pink-500" />
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Today&apos;s Birthdays</h3>
            </div>
            <button onClick={() => {
              // Send wish to all — mock action
            }} className="px-3 py-1.5 rounded-xl bg-emerald-500 text-white text-[10px] font-bold flex items-center gap-1 hover:bg-emerald-600 transition-colors">
              <Send size={10} /> Send Wish to All
            </button>
          </div>
          <div className="space-y-2">
            {[
              { name: 'Aarav Singh', detail: 'Class 8A', type: 'student' },
              { name: 'Priya Patel', detail: 'Class 5B', type: 'student' },
              { name: 'Sneha Verma', detail: 'Class 3C', type: 'student' },
              { name: 'Mr. Rakesh Kumar', detail: 'Science Dept', type: 'staff' },
            ].map((b, i) => (
              <div key={i} className={`flex items-center gap-2.5 p-2 rounded-xl ${theme.secondaryBg}`}>
                <div className="w-7 h-7 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
                  <Cake size={13} className="text-pink-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <button
                    onClick={() => setMiniProfile({ name: b.name, class: b.type === 'student' ? b.detail : undefined, role: b.type === 'staff' ? b.detail : undefined })}
                    className={`text-[11px] font-bold ${theme.highlight} hover:underline cursor-pointer truncate block text-left`}
                  >
                    {b.name}
                  </button>
                  <p className={`text-[10px] ${theme.iconColor}`}>{b.detail}</p>
                </div>
                <button className="px-2 py-1 rounded-lg bg-emerald-500 text-white text-[10px] font-bold flex items-center gap-1 hover:bg-emerald-600 transition-colors shrink-0">
                  <Send size={9} /> Send Wish
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expanded Gallery Section */}
      {galleryExpanded && dashletVisibility['birthday'] && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center gap-2 mb-3">
            <Image size={16} className={theme.iconColor} />
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Gallery Highlights</h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { title: 'Science Exhibition', color: 'bg-blue-100' },
              { title: 'Sports Day', color: 'bg-emerald-100' },
              { title: 'Annual Function', color: 'bg-purple-100' },
            ].map((g, i) => (
              <div key={i} className={`rounded-xl overflow-hidden border ${theme.border}`}>
                <div className={`${g.color} h-16 flex items-center justify-center`}>
                  <Image size={20} className="text-gray-400" />
                </div>
                <div className="p-1.5">
                  <p className={`text-[10px] font-bold ${theme.highlight} truncate`}>{g.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expanded Infirmary Section */}
      {infirmaryExpanded && dashletVisibility['infirmary'] && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-3`}>
          <div className="flex items-center gap-2 mb-2">
            <Heart size={16} className="text-red-500" />
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Infirmary — Today&apos;s Visits</h3>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className={`${theme.secondaryBg} rounded-xl p-2 text-center`}>
              <p className={`text-[10px] ${theme.iconColor} mb-1`}>Visits Today</p>
              <p className={`text-xl font-bold ${theme.highlight}`}>4</p>
            </div>
            <div className={`${theme.secondaryBg} rounded-xl p-2 text-center`}>
              <p className={`text-[10px] ${theme.iconColor} mb-1`}>Active Allergy Alerts</p>
              <p className="text-xl font-bold text-amber-600">12</p>
            </div>
          </div>
          <div>
            <p className={`text-[10px] font-bold uppercase ${theme.iconColor} mb-1`}>Recent Visits</p>
            <div className="space-y-1">
              {[
                { name: 'Rahul M.', reason: 'Headache', time: '10:30 AM', cls: '7A' },
                { name: 'Sneha K.', reason: 'Stomach ache', time: '11:15 AM', cls: '5B' },
                { name: 'Arjun P.', reason: 'Minor cut', time: '1:45 PM', cls: '9A' },
                { name: 'Meera D.', reason: 'Fever (100.2F)', time: '2:10 PM', cls: '4C' },
              ].map((v, i) => (
                <div key={i} className={`flex items-center justify-between px-2 py-1.5 rounded-xl ${theme.secondaryBg}`}>
                  <div className="flex items-center gap-1.5 flex-1 min-w-0">
                    <Heart size={11} className="text-red-400 shrink-0" />
                    <button
                      onClick={() => setMiniProfile({ name: v.name, class: v.cls })}
                      className={`text-[11px] font-bold ${theme.highlight} hover:underline cursor-pointer`}
                    >
                      {v.name}
                    </button>
                    <span className={`text-[10px] ${theme.iconColor}`}>— {v.reason}</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className={`text-[10px] ${theme.iconColor} font-medium`}>{v.time}</span>
                    <button title="Call Parent" className="w-5 h-5 rounded-md bg-blue-500/20 flex items-center justify-center hover:bg-blue-500/30 transition-colors">
                      <Phone size={9} className="text-blue-600" />
                    </button>
                    <button title="Refer to Doctor" className="w-5 h-5 rounded-md bg-red-500/20 flex items-center justify-center hover:bg-red-500/30 transition-colors">
                      <Stethoscope size={9} className="text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Gap #149 — Child Safety / Chronic Attendance Alert */}
      {!isPreschool && (
        <div className={`${theme.cardBg} rounded-2xl border-2 border-red-300 ring-1 ring-red-300/30 p-4`}>
          <div className="flex items-center gap-2 mb-2">
            <Shield size={16} className="text-red-600" />
            <h3 className={`text-sm font-bold text-red-700`}>Chronic Attendance Alert</h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold">Action Required</span>
          </div>
          <p className={`text-xs ${theme.iconColor} mb-3`}>3 students flagged for chronic absence (&gt;30 days). POCSO/Child Safety protocol: Auto-flagged for counselor review.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className={`border-b ${theme.border}`}>
                  <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Student</th>
                  <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Class</th>
                  <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Days Absent</th>
                  <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Parent Contacted</th>
                  <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Counselor</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Rohit Verma', cls: '7A', days: 34, contacted: 'Yes (Feb 20)', counselor: 'Assigned' },
                  { name: 'Meena Kumari', cls: '5C', days: 31, contacted: 'Yes (Feb 22)', counselor: 'Pending' },
                  { name: 'Ajay Thakur', cls: '9B', days: 38, contacted: 'No — unreachable', counselor: 'Assigned' },
                ].map((s, i) => (
                  <tr key={i} className={`border-b ${theme.border} ${theme.buttonHover}`}>
                    <td className={`py-2 px-2 font-bold ${theme.highlight}`}>{s.name}</td>
                    <td className={`py-2 px-2 ${theme.iconColor}`}>{s.cls}</td>
                    <td className="py-2 px-2 font-bold text-red-600">{s.days}</td>
                    <td className={`py-2 px-2 ${theme.iconColor}`}>{s.contacted}</td>
                    <td className="py-2 px-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        s.counselor === 'Assigned' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>{s.counselor}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Gap #147 — Student Grievance Tracker */}
      {!isPreschool && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MessageSquare size={16} className="text-indigo-500" />
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Student Grievances</h3>
            </div>
            <button className={`text-xs px-3 py-1 rounded-xl ${theme.secondaryBg} ${theme.highlight} font-bold ${theme.buttonHover}`}>View All</button>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div className={`${theme.secondaryBg} rounded-xl p-3 text-center`}>
              <p className="text-lg font-bold text-amber-600">2</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Open</p>
            </div>
            <div className={`${theme.secondaryBg} rounded-xl p-3 text-center`}>
              <p className="text-lg font-bold text-emerald-600">15</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Resolved</p>
            </div>
            <div className={`${theme.secondaryBg} rounded-xl p-3 text-center`}>
              <p className="text-lg font-bold text-blue-600">4 days</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Avg Resolution</p>
            </div>
          </div>
          <div className="space-y-1.5">
            {[
              { id: 'GR-042', subject: 'Bullying complaint — Class 7A', date: 'Feb 25', status: 'Open', priority: 'High' },
              { id: 'GR-041', subject: 'Canteen food quality concern', date: 'Feb 23', status: 'Open', priority: 'Medium' },
            ].map((g, i) => (
              <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className={`w-7 h-7 rounded-lg ${g.priority === 'High' ? 'bg-red-100' : 'bg-amber-100'} flex items-center justify-center shrink-0`}>
                  <MessageSquare size={13} className={g.priority === 'High' ? 'text-red-500' : 'text-amber-500'} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-[11px] font-bold ${theme.highlight} truncate`}>{g.id}: {g.subject}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{g.date}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                  g.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                }`}>{g.priority}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gap 2 — Bell Curve MOVED to AcademicsModule.tsx */}

      {/* Gap 3 — Student Rank Trend MOVED to ReportsModule.tsx */}

      {/* Gap 4 — Mark Entry Progress MOVED to AcademicsModule.tsx */}

      {/* Gap 5 — Infirmary MOVED to compact card row above */}

      {/* Gap 6 — Academic Progress Ring MOVED to AcademicsModule.tsx */}

      {/* Gap 7 — RTE Quota Tracking Dashlet */}
      {dashletVisibility['rteQuota'] && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className={theme.iconColor} />
              <h3 className={`text-sm font-bold ${theme.highlight}`}>RTE 25% Quota Tracking</h3>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">On Track</span>
          </div>
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs ${theme.iconColor}`}>62 / 75 seats filled</span>
              <span className={`text-xs font-bold text-emerald-600`}>83%</span>
            </div>
            <div className={`w-full h-3 rounded-full ${theme.secondaryBg}`}>
              <div className="h-3 rounded-full bg-emerald-500 transition-all" style={{ width: '83%' }} />
            </div>
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr className={`border-b ${theme.border}`}>
                <th className={`text-left py-1 px-2 ${theme.iconColor} font-bold`}>Grade</th>
                <th className={`text-left py-1 px-2 ${theme.iconColor} font-bold`}>Filled</th>
                <th className={`text-left py-1 px-2 ${theme.iconColor} font-bold`}>Quota</th>
                <th className={`text-left py-1 px-2 ${theme.iconColor} font-bold`}>%</th>
              </tr>
            </thead>
            <tbody>
              {[
                { grade: 'Grade 1', filled: 12, quota: 15 },
                { grade: 'Grade 2', filled: 10, quota: 12 },
                { grade: 'Grade 3', filled: 8, quota: 10 },
                { grade: 'Grade 4', filled: 11, quota: 13 },
                { grade: 'Grade 5', filled: 9, quota: 10 },
                { grade: 'Grade 6', filled: 12, quota: 15 },
              ].map((r, i) => (
                <tr key={i} className={`border-b ${theme.border}`}>
                  <td className={`py-1.5 px-2 ${theme.highlight} font-bold`}>{r.grade}</td>
                  <td className={`py-1.5 px-2 ${theme.iconColor}`}>{r.filled}</td>
                  <td className={`py-1.5 px-2 ${theme.iconColor}`}>{r.quota}</td>
                  <td className={`py-1.5 px-2 font-bold ${Math.round((r.filled / r.quota) * 100) >= 80 ? 'text-emerald-600' : 'text-amber-600'}`}>{Math.round((r.filled / r.quota) * 100)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Gap 8 — Event Countdown MOVED to compact card row above */}

      {/* News Board + Task Tracker — Side by Side */}
      <div className="grid grid-cols-2 gap-4">
        {/* News Board — Live School Overview */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <h3 className={`text-sm font-bold ${theme.highlight}`}>News Board</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-base px-3 py-1 rounded-xl ${theme.secondaryBg} ${theme.highlight} font-mono font-bold tracking-wider`}>
                {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}
              </span>
              {!isPreschool && <span className={`text-[10px] px-2 py-0.5 rounded-lg bg-blue-500/20 text-blue-400 font-bold`}>Period 5 of 8</span>}
            </div>
          </div>

          {/* Going On Now */}
          <div className="mb-3">
            <p className={`text-[10px] font-bold uppercase ${theme.iconColor} mb-1.5 flex items-center gap-1`}>
              <Radio size={10} className="text-red-500" /> Going On Now
            </p>
            <div className="space-y-1.5">
              {(isPreschool ? [
                { activity: 'Story Time — "The Hungry Caterpillar"', detail: 'Nursery A & B · Library Corner', icon: Sparkles, color: 'bg-purple-500', pulse: true },
                { activity: 'Art & Craft — Finger Painting', detail: 'LKG · Art Room · Ms. Kavita', icon: FileText, color: 'bg-blue-500', pulse: true },
                { activity: 'Outdoor Play — Sand Pit', detail: 'Playground · All groups · 10:30-11:15', icon: Award, color: 'bg-emerald-500', pulse: true },
                { activity: 'Parent Drop-off Window Closing', detail: 'Gate · 5 children yet to arrive', icon: ShieldCheck, color: 'bg-red-500', pulse: true },
              ] : [
                { activity: 'Science Fair — Hall A', detail: 'Classes 6-8 · Judges evaluating projects', icon: Sparkles, color: 'bg-purple-500', pulse: true },
                { activity: 'Unit Test 3 — Mathematics', detail: 'Class 10-A, 10-B · Period 5 (11:30-12:15)', icon: FileText, color: 'bg-blue-500', pulse: true },
                { activity: 'Sports Practice — Cricket', detail: 'Ground · Inter-school team · Coach Verma', icon: Award, color: 'bg-emerald-500', pulse: false },
                { activity: 'CBSE Inspector Visit', detail: 'Principal Office · Lab inspection at 12:30', icon: ShieldCheck, color: 'bg-red-500', pulse: true },
              ]).map((item, i) => (
                <div key={i} className={`flex items-center gap-2.5 p-2 rounded-xl ${theme.accentBg} border ${theme.border}`}>
                  <div className={`w-7 h-7 rounded-lg ${item.color}/20 flex items-center justify-center shrink-0 relative`}>
                    <item.icon size={13} className={item.color.replace('bg-', 'text-')} />
                    {item.pulse && <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[11px] font-bold ${theme.highlight} truncate`}>{item.activity}</p>
                    <p className={`text-[10px] ${theme.iconColor} truncate`}>{item.detail}</p>
                  </div>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 font-bold shrink-0`}>LIVE</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming */}
          <div>
            <p className={`text-[10px] font-bold uppercase ${theme.iconColor} mb-1.5 flex items-center gap-1`}>
              <Clock size={10} /> Upcoming Today
            </p>
            <div className="space-y-1.5">
              {(isPreschool ? [
                { activity: 'Lunch Time — All Groups', detail: '12:00 PM · Dining Hall · Paneer Rice + Fruit', time: '12:00 PM', icon: Users },
                { activity: 'Nap Time', detail: '12:45 PM · All Rooms · Rest period', time: '12:45 PM', icon: Clock },
                { activity: 'Parent Pickup Window', detail: '3:00 PM · Gate · 56 children expected', time: '3:00 PM', icon: UserCheck },
              ] : [
                { activity: 'Staff Meeting', detail: '3:00 PM · Conference Room · All HODs', time: '3:00 PM', icon: Users },
                { activity: 'PTM — Class 9', detail: '4:00 PM · Classrooms · 42 parents expected', time: '4:00 PM', icon: UserCheck },
                { activity: 'Annual Day Rehearsal', detail: '4:30 PM · Auditorium · Dance + Drama groups', time: '4:30 PM', icon: Star },
              ]).map((item, i) => (
                <div key={i} className={`flex items-center gap-2.5 p-2 rounded-xl ${theme.secondaryBg}`}>
                  <div className={`w-7 h-7 rounded-lg ${theme.accentBg} flex items-center justify-center shrink-0`}>
                    <item.icon size={13} className={theme.iconColor} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[11px] font-bold ${theme.highlight} truncate`}>{item.activity}</p>
                    <p className={`text-[10px] ${theme.iconColor} truncate`}>{item.detail}</p>
                  </div>
                  <span className={`text-[10px] ${theme.iconColor} font-medium shrink-0`}>{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Task Tracker — Full Task Management Dashboard */}
        <TaskTrackerPanel theme={theme} role="principal" />

        {/* Recurring Tasks — Streak Tracking Card */}
        <RecurringTasksCard theme={theme} role="principal" isPreschool={isPreschool} />
      </div>

      {/* Gap 12 — Dashlet Gallery / Browser Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowGallery(false)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <LayoutGrid size={18} className={theme.iconColor} />
                <h2 className={`text-lg font-bold ${theme.highlight}`}>Browse Dashlets</h2>
              </div>
              <button onClick={() => setShowGallery(false)} className={`w-8 h-8 rounded-full ${theme.secondaryBg} flex items-center justify-center ${theme.buttonHover}`}>
                <X size={16} className={theme.iconColor} />
              </button>
            </div>
            <p className={`text-xs ${theme.iconColor} mb-4`}>Toggle dashlets on/off to customize your dashboard view.</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: 'birthday', name: 'Birthdays & Gallery', desc: 'Compact birthday wishes and photo gallery cards', icon: Cake },
                { key: 'infirmary', name: 'Infirmary', desc: 'Health visits and allergy alerts (compact card)', icon: Heart },
                { key: 'rteQuota', name: 'RTE Quota', desc: 'RTE 25% seat allocation tracking', icon: ShieldCheck },
                /* bellCurve, markEntry, progressRing MOVED to AcademicsModule.tsx */
              ].map(d => (
                <div key={d.key} className={`flex items-center gap-3 p-3 rounded-xl ${theme.secondaryBg} border ${theme.border}`}>
                  <div className={`w-9 h-9 rounded-lg ${theme.accentBg} flex items-center justify-center shrink-0`}>
                    <d.icon size={16} className={theme.iconColor} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-bold ${theme.highlight}`}>{d.name}</p>
                    <p className={`text-[10px] ${theme.iconColor} truncate`}>{d.desc}</p>
                  </div>
                  <button
                    onClick={() => setDashletVisibility(prev => ({ ...prev, [d.key]: !prev[d.key] }))}
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${dashletVisibility[d.key] ? 'bg-emerald-100 text-emerald-600' : `${theme.accentBg} ${theme.iconColor}`}`}
                  >
                    {dashletVisibility[d.key] ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Gap 10 — Onboarding Tour */}
      {showTour && (
        <OnboardingTour theme={theme} onDismiss={() => setShowTour(false)} />
      )}

      {/* Gap 22 — Widget Inter-Linking / Mini-Profile Popup */}
      {miniProfile && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4" onClick={() => setMiniProfile(null)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 w-72 shadow-2xl`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Quick Profile</h3>
              <button onClick={() => setMiniProfile(null)} className={`w-7 h-7 rounded-full ${theme.secondaryBg} flex items-center justify-center ${theme.buttonHover}`}>
                <X size={14} className={theme.iconColor} />
              </button>
            </div>
            <div className="flex flex-col items-center text-center">
              {/* Photo Placeholder */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xl font-bold mb-3">
                {miniProfile.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <p className={`text-sm font-bold ${theme.highlight}`}>{miniProfile.name}</p>
              {miniProfile.class && <p className={`text-xs ${theme.iconColor} mt-0.5`}>Class: {miniProfile.class}</p>}
              {miniProfile.role && <p className={`text-xs ${theme.iconColor} mt-0.5`}>Role: {miniProfile.role}</p>}
              <div className="grid grid-cols-2 gap-3 mt-4 w-full">
                <div className={`${theme.secondaryBg} rounded-xl p-2 text-center`}>
                  <p className={`text-[10px] ${theme.iconColor}`}>Attendance</p>
                  <p className="text-sm font-bold text-emerald-600">94%</p>
                </div>
                <div className={`${theme.secondaryBg} rounded-xl p-2 text-center`}>
                  <p className={`text-[10px] ${theme.iconColor}`}>Fee Status</p>
                  <p className="text-sm font-bold text-emerald-600">Paid</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      </div>
      {showMobilePreview && (
        <div className="w-[380px] shrink-0 sticky top-0 h-[calc(100vh-120px)] overflow-y-auto">
          <div className="flex items-center justify-between mb-2">
            <p className={`text-xs font-bold ${theme.iconColor}`}>Mobile App Preview</p>
            <button onClick={() => setShowMobilePreview(false)} className={`text-xs ${theme.iconColor} hover:text-red-500`}>
              <X size={14} />
            </button>
          </div>
          <PrincipalMobileApp theme={theme} alwaysShow />
        </div>
      )}
    </div>
  );
}