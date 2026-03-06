'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import PrincipalMobileApp from './PrincipalMobileApp';
import { type Theme } from '@/lib/themes';
import {
  Users, UserCheck, Clock, AlertTriangle, Bell, BarChart3, CheckCircle,
  Send, Calendar, GraduationCap, Briefcase, ChevronRight, Banknote,
  ClipboardCheck, Star, FileText, ShieldCheck, Award, User, Sparkles,
  Radio, Cake, Heart, Moon, Sun, Image, LayoutGrid, X, Eye, EyeOff,
  Timer, Phone, Stethoscope, ChevronDown, ChevronUp, Shield, MessageSquare,
  HelpCircle, Smartphone, TrendingUp, TrendingDown, ArrowUpRight, CircleDot,
} from 'lucide-react';
import TaskTrackerPanel from '@/components/TaskTrackerPanel';
import RecurringTasksCard from '@/components/RecurringTasksCard';
import OnboardingTour from '@/components/OnboardingTour';
import DrillDownPanel from './DrillDownPanel';
import { DraggableDashboard, DashletSection } from '@/components/DraggableDashboard';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// ─── CardBox wrapper (MatDash pattern) ────────────────────────
function CardBox({ children, theme, className = '' }: { children: React.ReactNode; theme: Theme; className?: string }) {
  return (
    <div className={`${theme.cardBg} rounded-xl border ${theme.border} shadow-sm ${className}`}>
      {children}
    </div>
  );
}

// ─── Mini stat card with sparkline-style accent ───────────────
function MiniStatCard({ icon: Icon, label, value, sub, color, bgColor, theme, onClick, trend }: {
  icon: React.ElementType; label: string; value: string; sub?: string; color: string; bgColor: string;
  theme: Theme; onClick?: () => void; trend?: { value: string; up: boolean };
}) {
  const Wrapper = onClick ? 'button' : 'div';
  return (
    <Wrapper onClick={onClick} className={`${theme.cardBg} rounded-xl border ${theme.border} p-4 shadow-sm ${onClick ? 'cursor-pointer hover:shadow-md transition-all text-left w-full' : ''}`}>
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg ${bgColor} flex items-center justify-center`}>
          <Icon size={20} className={color} />
        </div>
        {trend && (
          <span className={`flex items-center gap-0.5 text-xs font-semibold ${trend.up ? 'text-emerald-600' : 'text-red-500'}`}>
            {trend.up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {trend.value}
          </span>
        )}
      </div>
      <p className={`text-2xl font-bold ${theme.highlight} leading-tight`}>{value}</p>
      <p className={`text-xs ${theme.iconColor} mt-1`}>{label}</p>
      {sub && <p className="text-[11px] text-emerald-600 font-medium mt-0.5">{sub}</p>}
    </Wrapper>
  );
}

export default function DashboardHomeNew({ theme, onProfileClick, isPreschool }: { theme: Theme; onProfileClick: () => void; isPreschool?: boolean }) {
  const [drillDown, setDrillDown] = useState<'students' | 'academic' | 'non-academic' | null>(null);
  const [showEnquiryPipeline, setShowEnquiryPipeline] = useState(false);
  const [showFeeDrillDown, setShowFeeDrillDown] = useState(false);
  const [showApprovalsDrillDown, setShowApprovalsDrillDown] = useState(false);
  const [showCollectionDrillDown, setShowCollectionDrillDown] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);
  const [showGallery, setShowGallery] = useState(false);
  const [dashletVisibility, setDashletVisibility] = useState<Record<string, boolean>>({
    'birthday': true, 'sparkline': true, 'infirmary': true, 'rteQuota': true,
  });
  const [birthdayExpanded, setBirthdayExpanded] = useState(false);
  const [galleryExpanded, setGalleryExpanded] = useState(false);
  const [infirmaryExpanded, setInfirmaryExpanded] = useState(false);
  const [rteExpanded, setRteExpanded] = useState(false);
  const [miniProfile, setMiniProfile] = useState<{name: string; class?: string; role?: string} | null>(null);
  const [showTour, setShowTour] = useState(false);
  const [dataMasked, setDataMasked] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  // ─── Chart configs ──────────────────────────────────────────
  const attendanceDonutOpts = (present: number, absent: number, leave: number, label: string): ApexCharts.ApexOptions => ({
    chart: { type: 'donut', sparkline: { enabled: true } },
    labels: ['Present', 'Absent', 'Leave'],
    colors: ['#10b981', '#ef4444', '#9ca3af'],
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: { show: true, fontSize: '11px', offsetY: -4 },
            value: { show: true, fontSize: '18px', fontWeight: '700', offsetY: 4 },
            total: {
              show: true, label: label,
              fontSize: '10px', color: '#6b7280',
              formatter: () => `${Math.round((present / (present + absent + leave)) * 100)}%`,
            },
          },
        },
      },
    },
    stroke: { width: 0 },
    legend: { show: false },
    dataLabels: { enabled: false },
    tooltip: { enabled: true, y: { formatter: (v: number) => `${v}` } },
  });

  const feeCollectionTrendOpts: ApexCharts.ApexOptions = {
    chart: { type: 'area', height: 200, sparkline: { enabled: false }, toolbar: { show: false },
      fontFamily: 'inherit',
    },
    colors: ['#10b981', '#ef4444'],
    stroke: { curve: 'smooth', width: 2.5 },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 100] } },
    xaxis: { categories: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
      labels: { style: { fontSize: '11px', colors: '#9ca3af' } },
      axisBorder: { show: false }, axisTicks: { show: false },
    },
    yaxis: { labels: { style: { fontSize: '11px', colors: '#9ca3af' }, formatter: (v: number) => `${(v / 100000).toFixed(0)}L` } },
    grid: { strokeDashArray: 4, borderColor: '#e5e7eb' },
    legend: { show: true, position: 'top', horizontalAlign: 'right', fontSize: '12px', markers: { size: 5, shape: 'circle' as const } },
    tooltip: { y: { formatter: (v: number) => `₹${(v / 100000).toFixed(1)}L` } },
    dataLabels: { enabled: false },
  };

  const feeCollectionTrendSeries = [
    { name: 'Collected', data: [1520000, 1380000, 1640000, 1420000, 1580000, 1720000, 1480000, 1650000, 1540000, 1680000, 1240000, 480000] },
    { name: 'Outstanding', data: [280000, 420000, 160000, 380000, 220000, 80000, 320000, 150000, 260000, 120000, 560000, 1320000] },
  ];

  const enquiryFunnelOpts: ApexCharts.ApexOptions = {
    chart: { type: 'bar', height: 160, toolbar: { show: false }, fontFamily: 'inherit' },
    plotOptions: { bar: { horizontal: true, borderRadius: 4, barHeight: '70%', distributed: true } },
    colors: ['#3b82f6', '#f59e0b', '#8b5cf6', '#10b981', '#ef4444'],
    xaxis: { categories: ['New', 'Follow-up', 'Test', 'Converted', 'Lost'], labels: { show: false } },
    yaxis: { labels: { style: { fontSize: '11px' } } },
    grid: { show: false },
    dataLabels: { enabled: true, style: { fontSize: '12px', fontWeight: '600' } },
    legend: { show: false },
    tooltip: { enabled: false },
  };

  return (
    <div className="flex gap-4">
      <DraggableDashboard dashboardId="principal" theme={theme} className={`${showMobilePreview ? 'flex-1 min-w-0' : 'w-full'} space-y-6 transition-all`}>

      {/* ═══════════════════ WELCOME BOX + TOOLBAR ═══════════════════ */}
      <DashletSection id="welcome" label="Welcome">
      <CardBox theme={theme} className="overflow-hidden">
        <div className="relative p-6 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%"><pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5"/></pattern><rect width="100%" height="100%" fill="url(#grid)"/></svg>
          </div>
          <div className="relative flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">
                Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'}, Dr. Sharma
              </h1>
              <p className="text-blue-100 text-sm">{isPreschool ? 'Centre Head Dashboard' : 'Principal Dashboard'} &middot; {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}</p>
              <div className="flex items-center gap-1 mt-2 text-blue-200 text-xs">
                <Clock size={12} /> Last refreshed: 2 min ago
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setShowTour(true)} title="Take a Tour" className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all">
                <HelpCircle size={16} />
              </button>
              <button onClick={() => setDataMasked(!dataMasked)} title="Toggle data masking" className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all">
                {dataMasked ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              <button onClick={() => setShowGallery(true)} title="Browse Dashlets" className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all">
                <LayoutGrid size={16} />
              </button>
              <button onClick={() => setDarkMode(!darkMode)} title="Dark Mode" className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all">
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <button onClick={() => setShowMobilePreview(!showMobilePreview)} title="Mobile Preview" className={`w-9 h-9 rounded-lg ${showMobilePreview ? 'bg-emerald-500' : 'bg-white/10 backdrop-blur-sm'} flex items-center justify-center hover:bg-white/20 transition-all`}>
                <Smartphone size={16} />
              </button>
              <button title="Notifications" className="relative w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all">
                <Bell size={16} />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[9px] font-bold flex items-center justify-center">3</span>
              </button>
              <button onClick={onProfileClick} title="Profile" className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all ring-2 ring-white/30">
                <User size={16} />
              </button>
            </div>
          </div>
          {/* Quick stat pills */}
          <div className="relative flex items-center gap-4 mt-5">
            {[
              { label: 'Students Present', value: dataMasked ? '***' : '2,598', icon: Users },
              { label: 'Staff Present', value: dataMasked ? '***' : '128/142', icon: UserCheck },
              { label: 'Fee Collected', value: dataMasked ? '₹ ****' : '₹12.4L', icon: Banknote },
              { label: 'Pending Approvals', value: '8', icon: ClipboardCheck },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                <s.icon size={14} className="text-blue-200" />
                <div>
                  <p className="text-white font-bold text-sm leading-tight">{s.value}</p>
                  <p className="text-blue-200 text-[10px]">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardBox>
      </DashletSection>

      {/* ═══════════════════ ALERTS ═══════════════════ */}
      <DashletSection id="alerts" label="Alerts">
      <div className="space-y-2">
      {!dismissedAlerts.includes('fee-collection-drive') && (
        <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50 border border-amber-200 px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
            <AlertTriangle size={16} className="text-amber-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-amber-800">Required: Fee Collection Drive — verify by Mar 5</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={() => alert('Marked as complete')} className="px-3 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 transition-colors">Done</button>
            <button className="px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-700 text-xs font-semibold hover:bg-amber-50 transition-colors">Details</button>
            <button onClick={() => setDismissedAlerts(prev => [...prev, 'fee-collection-drive'])} className="text-amber-400 hover:text-amber-600"><X size={14} /></button>
          </div>
        </div>
      )}

      {!isPreschool && !dismissedAlerts.includes('bottleneck-alert') && (
        <div className="rounded-xl border-l-4 border-red-400 bg-red-50 border border-red-200 px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
            <AlertTriangle size={16} className="text-red-500" />
          </div>
          <p className="text-xs font-medium text-red-800 flex-1">Bottleneck Alert — 23 leave approvals pending &gt; 3 days | 5 fee concessions awaiting sign-off</p>
          <button onClick={() => setDismissedAlerts(prev => [...prev, 'bottleneck-alert'])} className="text-red-400 hover:text-red-600 shrink-0"><X size={14} /></button>
        </div>
      )}

      {isPreschool && !dismissedAlerts.includes('preschool-mode') && (
        <div className="rounded-xl border-l-4 border-blue-400 bg-blue-50 border border-blue-200 px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
            <AlertTriangle size={16} className="text-blue-500" />
          </div>
          <p className="text-xs font-medium text-blue-800 flex-1">Preschool Mode — Showing Centre Head view with child safety, staff-child ratios, and milestone tracking</p>
          <button onClick={() => setDismissedAlerts(prev => [...prev, 'preschool-mode'])} className="text-blue-400 hover:text-blue-600 shrink-0"><X size={14} /></button>
        </div>
      )}
      </div>
      </DashletSection>

      {/* ═══════════════════ ATTENDANCE ROW (ApexCharts Donuts) ═══════════════════ */}
      <DashletSection id="attendance" label="Attendance">
      <div className="grid grid-cols-12 gap-6">
        {/* Student Attendance */}
        <div className="col-span-12 lg:col-span-4">
          <CardBox theme={theme}>
            <button onClick={() => setDrillDown(drillDown === 'students' ? null : 'students')} className={`w-full text-left p-5 rounded-xl transition-all ${drillDown === 'students' ? 'ring-2 ring-blue-500' : ''}`}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Users size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className={`text-sm font-bold ${theme.highlight}`}>Students</h3>
                    <p className={`text-[11px] ${theme.iconColor}`}>Enrolled: {dataMasked ? '***' : '3,000'}</p>
                  </div>
                </div>
                <ChevronRight size={14} className={`${theme.iconColor} ${drillDown === 'students' ? 'rotate-90' : ''} transition-transform`} />
              </div>
              <div className="flex items-center justify-between mt-3">
                <div>
                  <p className={`text-3xl font-bold ${theme.highlight}`}>{dataMasked ? '***' : '2,598'}</p>
                  <p className={`text-xs ${theme.iconColor}`}>of {dataMasked ? '***' : '2,847'} present</p>
                </div>
                <div className="w-24 h-24">
                  <Chart options={attendanceDonutOpts(2598, 249, 153, 'Students')} series={[2598, 249, 153]} type="donut" height={96} />
                </div>
              </div>
              <div className="flex items-center gap-4 mt-2 pt-2 border-t border-dashed" style={{ borderColor: 'rgb(229 231 235)' }}>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /><span className={`text-xs ${theme.iconColor}`}>Present 2,598</span></span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /><span className={`text-xs ${theme.iconColor}`}>Absent 249</span></span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-gray-400" /><span className={`text-xs ${theme.iconColor}`}>Leave 153</span></span>
              </div>
            </button>
          </CardBox>
        </div>

        {/* Academic Staff */}
        <div className="col-span-12 lg:col-span-4">
          <CardBox theme={theme}>
            <button onClick={() => setDrillDown(drillDown === 'academic' ? null : 'academic')} className={`w-full text-left p-5 rounded-xl transition-all ${drillDown === 'academic' ? 'ring-2 ring-blue-500' : ''}`}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                    <GraduationCap size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <h3 className={`text-sm font-bold ${theme.highlight}`}>Academic Staff</h3>
                    <p className={`text-[11px] ${theme.iconColor}`}>Total: 78</p>
                  </div>
                </div>
                <ChevronRight size={14} className={`${theme.iconColor} ${drillDown === 'academic' ? 'rotate-90' : ''} transition-transform`} />
              </div>
              <div className="flex items-center justify-between mt-3">
                <div>
                  <p className={`text-3xl font-bold ${theme.highlight}`}>{dataMasked ? '***' : '72'}</p>
                  <p className="text-xs text-emerald-600 font-medium">{dataMasked ? '**%' : '92%'} Present</p>
                </div>
                <div className="w-24 h-24">
                  <Chart options={attendanceDonutOpts(72, 6, 0, 'Staff')} series={[72, 6]} type="donut" height={96} />
                </div>
              </div>
              <div className="flex items-center gap-4 mt-2 pt-2 border-t border-dashed" style={{ borderColor: 'rgb(229 231 235)' }}>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /><span className={`text-xs ${theme.iconColor}`}>Present 72</span></span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /><span className={`text-xs ${theme.iconColor}`}>Absent 6</span></span>
              </div>
            </button>
          </CardBox>
        </div>

        {/* Non-Academic Staff */}
        <div className="col-span-12 lg:col-span-4">
          <CardBox theme={theme}>
            <button onClick={() => setDrillDown(drillDown === 'non-academic' ? null : 'non-academic')} className={`w-full text-left p-5 rounded-xl transition-all ${drillDown === 'non-academic' ? 'ring-2 ring-blue-500' : ''}`}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                    <Briefcase size={16} className="text-amber-600" />
                  </div>
                  <div>
                    <h3 className={`text-sm font-bold ${theme.highlight}`}>Non-Academic</h3>
                    <p className={`text-[11px] ${theme.iconColor}`}>Total: 64</p>
                  </div>
                </div>
                <ChevronRight size={14} className={`${theme.iconColor} ${drillDown === 'non-academic' ? 'rotate-90' : ''} transition-transform`} />
              </div>
              <div className="flex items-center justify-between mt-3">
                <div>
                  <p className={`text-3xl font-bold ${theme.highlight}`}>{dataMasked ? '***' : '56'}</p>
                  <p className="text-xs text-emerald-600 font-medium">{dataMasked ? '**%' : '88%'} Present</p>
                </div>
                <div className="w-24 h-24">
                  <Chart options={attendanceDonutOpts(56, 8, 0, 'Staff')} series={[56, 8]} type="donut" height={96} />
                </div>
              </div>
              <div className="flex items-center gap-4 mt-2 pt-2 border-t border-dashed" style={{ borderColor: 'rgb(229 231 235)' }}>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /><span className={`text-xs ${theme.iconColor}`}>Present 56</span></span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /><span className={`text-xs ${theme.iconColor}`}>Absent 8</span></span>
              </div>
            </button>
          </CardBox>
        </div>
      </div>

      {/* Drill-Down Analytics Panel */}
      {drillDown && (
        <DrillDownPanel type={drillDown} theme={theme} onClose={() => setDrillDown(null)} />
      )}
      </DashletSection>

      {/* ═══════════════════ STAT CARDS + QUICK ACTIONS ═══════════════════ */}
      <DashletSection id="stats-actions" label="Stats & Actions">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-3">
          <MiniStatCard icon={Banknote} label="Fee This Month" value={dataMasked ? '₹ ****' : '₹12.4L'} sub="Target: ₹18L" color="text-emerald-600" bgColor="bg-emerald-50" theme={theme} onClick={() => setShowFeeDrillDown(!showFeeDrillDown)} trend={{ value: '+8%', up: true }} />
        </div>
        <div className="col-span-12 lg:col-span-3">
          <MiniStatCard icon={Users} label="New Enquiries" value={dataMasked ? '***' : '12'} sub={dataMasked ? '*** seats open' : '45 seats open'} color="text-purple-600" bgColor="bg-purple-50" theme={theme} onClick={() => setShowEnquiryPipeline(!showEnquiryPipeline)} trend={{ value: '+3', up: true }} />
        </div>
        <div className="col-span-12 lg:col-span-3">
          <MiniStatCard icon={Clock} label="Pending Approvals" value="8" sub="3 urgent" color="text-amber-600" bgColor="bg-amber-50" theme={theme} onClick={() => setShowApprovalsDrillDown(!showApprovalsDrillDown)} trend={{ value: '-2', up: false }} />
        </div>
        <div className="col-span-12 lg:col-span-3">
          <MiniStatCard icon={Banknote} label="Today's Collection" value={dataMasked ? '₹ ****' : '₹2,45,000'} sub={dataMasked ? 'Outstanding: ₹ ****' : 'Outstanding: ₹18.5L'} color="text-green-600" bgColor="bg-green-50" theme={theme} onClick={() => setShowCollectionDrillDown(!showCollectionDrillDown)} />
        </div>
      </div>

      {/* Quick Actions Bar */}
      <CardBox theme={theme} className="p-4">
        <div className="flex items-center justify-between">
          <p className={`text-xs font-bold ${theme.iconColor} uppercase tracking-wider`}>Quick Actions</p>
          <div className="flex items-center gap-2">
            {[
              { label: 'Generate Report', icon: BarChart3, color: 'bg-blue-600 hover:bg-blue-700' },
              { label: 'Approve Pending', icon: CheckCircle, color: 'bg-emerald-600 hover:bg-emerald-700' },
              { label: 'Send Circular', icon: Send, color: 'bg-indigo-600 hover:bg-indigo-700' },
              { label: 'Schedule Meeting', icon: Calendar, color: 'bg-purple-600 hover:bg-purple-700' },
            ].map(a => (
              <button key={a.label} title={a.label} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg ${a.color} text-white text-xs font-semibold transition-colors`}>
                <a.icon size={14} />
                <span className="hidden xl:inline">{a.label}</span>
              </button>
            ))}
          </div>
        </div>
      </CardBox>
      </DashletSection>

      {/* ═══════════════════ FEE COLLECTION TREND CHART ═══════════════════ */}
      <DashletSection id="fee-trend" label="Fee Trend">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <CardBox theme={theme} className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className={`text-base font-bold ${theme.highlight}`}>Fee Collection Overview</h3>
                <p className={`text-xs ${theme.iconColor}`}>Monthly collection vs outstanding — FY 2025-26</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-3 py-1 rounded-lg ${theme.secondaryBg} ${theme.iconColor} font-medium`}>This Year</span>
              </div>
            </div>
            <Chart options={feeCollectionTrendOpts} series={feeCollectionTrendSeries} type="area" height={220} />
          </CardBox>
        </div>

        {/* Enquiry Pipeline Mini Chart */}
        <div className="col-span-12 lg:col-span-4">
          <CardBox theme={theme} className="p-5 h-full">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className={`text-base font-bold ${theme.highlight}`}>Enquiry Pipeline</h3>
                <p className={`text-xs ${theme.iconColor}`}>12 active this week</p>
              </div>
              <button onClick={() => setShowEnquiryPipeline(!showEnquiryPipeline)} className={`text-xs ${theme.iconColor} hover:text-blue-500 flex items-center gap-1`}>
                Details <ArrowUpRight size={12} />
              </button>
            </div>
            <Chart options={enquiryFunnelOpts} series={[{ data: [5, 3, 2, 1, 1] }]} type="bar" height={160} />
            <div className="mt-2 px-2 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-center">
              <p className="text-[11px] font-semibold text-indigo-700">45 seats available across all grades</p>
            </div>
          </CardBox>
        </div>
      </div>
      </DashletSection>

      {/* ═══════════════════ DRILL-DOWN PANELS ═══════════════════ */}

      {/* Enquiry Pipeline Drill-Down */}
      {showEnquiryPipeline && (
        <CardBox theme={theme} className="border-2 border-purple-300 ring-1 ring-purple-300/30 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-base font-bold ${theme.highlight}`}>Enquiry Pipeline — Today</h3>
            <button onClick={() => setShowEnquiryPipeline(false)} className={`text-xs px-3 py-1 rounded-lg ${theme.secondaryBg} ${theme.iconColor} hover:text-red-500 font-medium`}>Close</button>
          </div>
          <div className="mb-4 px-4 py-3 rounded-xl bg-indigo-50 border border-indigo-200">
            <p className="text-xs font-bold text-indigo-700">Admission Vacancies: <span className="font-medium">KG: 8 seats | Class I: 5 | Class VI: 12 | Total: 45 seats across all grades</span></p>
          </div>
          <div className="grid grid-cols-5 gap-3 mb-4">
            {[
              { stage: 'New', count: 5, color: 'text-blue-600', bg: 'bg-blue-50', sub: '3 walk-in, 2 online' },
              { stage: 'Follow-up', count: 3, color: 'text-amber-600', bg: 'bg-amber-50', sub: 'Call scheduled today' },
              { stage: 'Test Scheduled', count: 2, color: 'text-purple-600', bg: 'bg-purple-50', sub: 'Feb 18 & Feb 20' },
              { stage: 'Converted', count: 1, color: 'text-emerald-600', bg: 'bg-emerald-50', sub: 'Admission confirmed' },
              { stage: 'Lost', count: 1, color: 'text-red-600', bg: 'bg-red-50', sub: 'Fee too high' },
            ].map(s => (
              <div key={s.stage} className={`${s.bg} rounded-xl p-3 text-center border border-transparent hover:border-gray-200 transition-all`}>
                <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
                <p className={`text-xs font-bold ${theme.highlight} mt-1`}>{s.stage}</p>
                <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>{s.sub}</p>
              </div>
            ))}
          </div>
          <div className="overflow-x-auto rounded-lg border" style={{ borderColor: 'rgb(229 231 235)' }}>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className={`text-left py-2.5 px-3 ${theme.iconColor} font-semibold text-xs`}>Child</th>
                  <th className={`text-left py-2.5 px-3 ${theme.iconColor} font-semibold text-xs`}>Class</th>
                  <th className={`text-left py-2.5 px-3 ${theme.iconColor} font-semibold text-xs`}>Parent</th>
                  <th className={`text-left py-2.5 px-3 ${theme.iconColor} font-semibold text-xs`}>Source</th>
                  <th className={`text-left py-2.5 px-3 ${theme.iconColor} font-semibold text-xs`}>Stage</th>
                  <th className={`text-left py-2.5 px-3 ${theme.iconColor} font-semibold text-xs`}>Date</th>
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
                  <tr key={i} className={`border-t hover:bg-gray-50/50 transition-colors`} style={{ borderColor: 'rgb(229 231 235)' }}>
                    <td className={`py-2.5 px-3 ${theme.highlight} font-semibold text-xs`}>{e.child}</td>
                    <td className={`py-2.5 px-3 ${theme.iconColor} text-xs`}>{e.cls}</td>
                    <td className={`py-2.5 px-3 ${theme.iconColor} text-xs`}>{e.parent}</td>
                    <td className={`py-2.5 px-3 ${theme.iconColor} text-xs`}>{e.source}</td>
                    <td className="py-2.5 px-3">
                      <span className={`text-[11px] px-2.5 py-1 rounded-full font-semibold ${
                        e.stage === 'New' ? 'bg-blue-100 text-blue-700' :
                        e.stage === 'Follow-up' ? 'bg-amber-100 text-amber-700' :
                        e.stage === 'Test Scheduled' ? 'bg-purple-100 text-purple-700' :
                        e.stage === 'Converted' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-red-100 text-red-700'
                      }`}>{e.stage}</span>
                    </td>
                    <td className={`py-2.5 px-3 ${theme.iconColor} text-xs`}>{e.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBox>
      )}

      {/* Fee Collection Drill-Down */}
      {showFeeDrillDown && (
        <CardBox theme={theme} className="border-2 border-emerald-300 ring-1 ring-emerald-300/30 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-base font-bold ${theme.highlight}`}>Fee Collection Breakdown — This Month</h3>
            <button onClick={() => setShowFeeDrillDown(false)} className={`text-xs px-3 py-1 rounded-lg ${theme.secondaryBg} ${theme.iconColor} hover:text-red-500 font-medium`}>Close</button>
          </div>
          <div className="grid grid-cols-4 gap-3 mb-5">
            {[
              { label: 'Total Collected', value: dataMasked ? '₹ ****' : '₹12.4L', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' },
              { label: 'Outstanding', value: dataMasked ? '₹ ****' : '₹5.6L', color: 'text-red-600', bg: 'bg-red-50 border-red-100' },
              { label: 'Defaulters', value: dataMasked ? '***' : '45 students', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100' },
              { label: 'Online vs Cash', value: '68% / 32%', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
            ].map(s => (
              <div key={s.label} className={`${s.bg} border rounded-xl p-4 text-center`}>
                <p className={`text-[11px] ${theme.iconColor} mb-1 font-medium`}>{s.label}</p>
                <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>
          <div className="overflow-x-auto rounded-lg border" style={{ borderColor: 'rgb(229 231 235)' }}>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className={`text-left py-2.5 px-3 ${theme.iconColor} font-semibold text-xs`}>Class</th>
                  <th className={`text-left py-2.5 px-3 ${theme.iconColor} font-semibold text-xs`}>Total Due</th>
                  <th className={`text-left py-2.5 px-3 ${theme.iconColor} font-semibold text-xs`}>Collected</th>
                  <th className={`text-left py-2.5 px-3 ${theme.iconColor} font-semibold text-xs`}>Outstanding</th>
                  <th className={`text-left py-2.5 px-3 ${theme.iconColor} font-semibold text-xs`}>Progress</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { cls: 'Class I', due: '₹1,80,000', collected: '₹1,72,000', outstanding: '₹8,000', pct: 96 },
                  { cls: 'Class II', due: '₹2,10,000', collected: '₹1,89,000', outstanding: '₹21,000', pct: 90 },
                  { cls: 'Class III', due: '₹1,95,000', collected: '₹1,62,000', outstanding: '₹33,000', pct: 83 },
                  { cls: 'Class V', due: '₹2,40,000', collected: '₹2,16,000', outstanding: '₹24,000', pct: 90 },
                  { cls: 'Class VI', due: '₹2,60,000', collected: '₹2,08,000', outstanding: '₹52,000', pct: 80 },
                  { cls: 'Class VIII', due: '₹3,00,000', collected: '₹2,22,000', outstanding: '₹78,000', pct: 74 },
                  { cls: 'Class IX', due: '₹3,20,000', collected: '₹2,24,000', outstanding: '₹96,000', pct: 70 },
                  { cls: 'Class X', due: '₹3,50,000', collected: '₹3,15,000', outstanding: '₹35,000', pct: 90 },
                ].map((r, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50/50 transition-colors" style={{ borderColor: 'rgb(229 231 235)' }}>
                    <td className={`py-2.5 px-3 ${theme.highlight} font-semibold text-xs`}>{r.cls}</td>
                    <td className={`py-2.5 px-3 ${theme.iconColor} text-xs`}>{dataMasked ? '₹ ****' : r.due}</td>
                    <td className={`py-2.5 px-3 ${theme.iconColor} text-xs`}>{dataMasked ? '₹ ****' : r.collected}</td>
                    <td className={`py-2.5 px-3 ${theme.iconColor} text-xs`}>{dataMasked ? '₹ ****' : r.outstanding}</td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all ${r.pct >= 90 ? 'bg-emerald-500' : r.pct >= 75 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${r.pct}%` }} />
                        </div>
                        <span className={`text-xs font-bold min-w-[32px] text-right ${r.pct >= 90 ? 'text-emerald-600' : r.pct >= 75 ? 'text-amber-600' : 'text-red-600'}`}>{r.pct}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBox>
      )}

      {/* Pending Approvals Drill-Down */}
      {showApprovalsDrillDown && (
        <CardBox theme={theme} className="border-2 border-amber-300 ring-1 ring-amber-300/30 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-base font-bold ${theme.highlight}`}>Pending Approvals — Action Required</h3>
            <button onClick={() => setShowApprovalsDrillDown(false)} className={`text-xs px-3 py-1 rounded-lg ${theme.secondaryBg} ${theme.iconColor} hover:text-red-500 font-medium`}>Close</button>
          </div>
          <div className="grid grid-cols-4 gap-3 mb-5">
            {[
              { label: 'Leave Requests', value: '3', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
              { label: 'Fee Concessions', value: '2', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100' },
              { label: 'TC Requests', value: '1', color: 'text-purple-600', bg: 'bg-purple-50 border-purple-100' },
              { label: 'Other', value: '2', color: 'text-gray-600', bg: 'bg-gray-50 border-gray-200' },
            ].map(s => (
              <div key={s.label} className={`${s.bg} border rounded-xl p-4 text-center`}>
                <p className={`text-[11px] ${theme.iconColor} mb-1 font-medium`}>{s.label}</p>
                <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {[
              { type: 'Leave', from: 'Mrs. Priya Sharma', detail: 'Casual Leave — 3 days (Mar 5–7)', date: 'Today', priority: 'Urgent' },
              { type: 'Leave', from: 'Mr. Suresh Mehta', detail: 'Sick Leave — 2 days', date: 'Yesterday', priority: 'Normal' },
              { type: 'Fee Waiver', from: 'Rajesh Patel (Class 6A)', detail: 'Fee concession request — ₹15,000 (50%)', date: 'Today', priority: 'Normal' },
              { type: 'TC', from: 'Aarav Singh (Class 8B)', detail: 'Transfer Certificate — relocating to Pune', date: '2 days ago', priority: 'Normal' },
              { type: 'Budget', from: 'Admin Office', detail: 'Sports Day budget — ₹45,000', date: '3 days ago', priority: 'Normal' },
              { type: 'Leave', from: 'Ms. Anita Desai', detail: 'Maternity Leave — 26 weeks', date: '3 days ago', priority: 'Urgent' },
              { type: 'Event', from: 'Activity Coordinator', detail: 'Science Fair proposal — Mar 15', date: '4 days ago', priority: 'Normal' },
              { type: 'Purchase', from: 'Lab Dept', detail: 'Chemistry lab equipment — ₹28,000', date: '5 days ago', priority: 'Normal' },
            ].map((a, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${theme.secondaryBg} hover:shadow-sm transition-all`}>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                  a.type === 'Leave' ? 'bg-blue-100' : a.type === 'Fee Waiver' ? 'bg-amber-100' : a.type === 'TC' ? 'bg-purple-100' : 'bg-gray-100'
                }`}>
                  <span className={`text-xs font-bold ${
                    a.type === 'Leave' ? 'text-blue-600' : a.type === 'Fee Waiver' ? 'text-amber-600' : a.type === 'TC' ? 'text-purple-600' : 'text-gray-600'
                  }`}>{a.type.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-bold ${theme.highlight} truncate`}>{a.from}</p>
                  <p className={`text-[11px] ${theme.iconColor} truncate`}>{a.detail}</p>
                </div>
                <span className={`text-[11px] ${theme.iconColor} shrink-0`}>{a.date}</span>
                {a.priority === 'Urgent' && <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold shrink-0">Urgent</span>}
                <div className="flex gap-1.5 shrink-0">
                  <button className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center hover:bg-emerald-200 transition-colors">
                    <CheckCircle size={14} className="text-emerald-600" />
                  </button>
                  <button className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center hover:bg-red-200 transition-colors">
                    <X size={14} className="text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardBox>
      )}

      {/* Today's Collection Drill-Down */}
      {showCollectionDrillDown && (
        <CardBox theme={theme} className="border-2 border-green-300 ring-1 ring-green-300/30 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-base font-bold ${theme.highlight}`}>Today&apos;s Collection — Live</h3>
            <button onClick={() => setShowCollectionDrillDown(false)} className={`text-xs px-3 py-1 rounded-lg ${theme.secondaryBg} ${theme.iconColor} hover:text-red-500 font-medium`}>Close</button>
          </div>
          <div className="grid grid-cols-4 gap-3 mb-5">
            {[
              { label: 'Cash', value: '₹78,000', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' },
              { label: 'Online/UPI', value: '₹1,42,000', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
              { label: 'Cheque', value: '₹25,000', color: 'text-purple-600', bg: 'bg-purple-50 border-purple-100' },
              { label: 'Total', value: '₹2,45,000', color: 'text-gray-800', bg: 'bg-gray-50 border-gray-200' },
            ].map(s => (
              <div key={s.label} className={`${s.bg} border rounded-xl p-4 text-center`}>
                <p className={`text-[11px] ${theme.iconColor} mb-1 font-medium`}>{s.label}</p>
                <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>
          <div className="overflow-x-auto rounded-lg border" style={{ borderColor: 'rgb(229 231 235)' }}>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className={`text-left py-2.5 px-3 ${theme.iconColor} font-semibold text-xs`}>Receipt #</th>
                  <th className={`text-left py-2.5 px-3 ${theme.iconColor} font-semibold text-xs`}>Student</th>
                  <th className={`text-left py-2.5 px-3 ${theme.iconColor} font-semibold text-xs`}>Class</th>
                  <th className={`text-left py-2.5 px-3 ${theme.iconColor} font-semibold text-xs`}>Amount</th>
                  <th className={`text-left py-2.5 px-3 ${theme.iconColor} font-semibold text-xs`}>Mode</th>
                  <th className={`text-left py-2.5 px-3 ${theme.iconColor} font-semibold text-xs`}>Time</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { receipt: 'R-4521', student: 'Aarav Singh', cls: '8B', amount: '₹12,500', mode: 'UPI', time: '10:45 AM' },
                  { receipt: 'R-4520', student: 'Priya Verma', cls: '5A', amount: '₹8,000', mode: 'Cash', time: '10:30 AM' },
                  { receipt: 'R-4519', student: 'Kabir Joshi', cls: '3C', amount: '₹15,000', mode: 'Online', time: '10:15 AM' },
                  { receipt: 'R-4518', student: 'Sneha Patel', cls: '7A', amount: '₹25,000', mode: 'Cheque', time: '9:45 AM' },
                  { receipt: 'R-4517', student: 'Rahul Kumar', cls: '10B', amount: '₹18,500', mode: 'UPI', time: '9:30 AM' },
                ].map((t, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50/50 transition-colors" style={{ borderColor: 'rgb(229 231 235)' }}>
                    <td className="py-2.5 px-3 font-bold text-blue-600 text-xs">{t.receipt}</td>
                    <td className={`py-2.5 px-3 ${theme.highlight} font-semibold text-xs`}>{t.student}</td>
                    <td className={`py-2.5 px-3 ${theme.iconColor} text-xs`}>{t.cls}</td>
                    <td className="py-2.5 px-3 font-bold text-emerald-600 text-xs">{t.amount}</td>
                    <td className="py-2.5 px-3">
                      <span className={`text-[11px] px-2.5 py-1 rounded-full font-semibold ${
                        t.mode === 'UPI' ? 'bg-blue-100 text-blue-700' :
                        t.mode === 'Online' ? 'bg-indigo-100 text-indigo-700' :
                        t.mode === 'Cheque' ? 'bg-purple-100 text-purple-700' :
                        'bg-emerald-100 text-emerald-700'
                      }`}>{t.mode}</span>
                    </td>
                    <td className={`py-2.5 px-3 ${theme.iconColor} text-xs`}>{t.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBox>
      )}

      {/* ═══════════════════ COMPACT DASHLETS ROW ═══════════════════ */}
      <DashletSection id="compact-dashlets" label="Quick Dashlets">
      <div className="grid grid-cols-12 gap-6">
        {/* Birthday Card */}
        {dashletVisibility['birthday'] && (
          <div className="col-span-12 lg:col-span-4">
            <CardBox theme={theme}>
              <button onClick={() => setBirthdayExpanded(!birthdayExpanded)} className="w-full text-left p-4 hover:shadow-md transition-all rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-pink-50 flex items-center justify-center">
                      <Cake size={18} className="text-pink-500" />
                    </div>
                    <div>
                      <h3 className={`text-sm font-bold ${theme.highlight}`}>Birthdays Today</h3>
                      <p className={`text-xs ${theme.iconColor}`}>3 students, 1 staff</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-pink-500">4</span>
                    {birthdayExpanded ? <ChevronUp size={14} className={theme.iconColor} /> : <ChevronDown size={14} className={theme.iconColor} />}
                  </div>
                </div>
              </button>
            </CardBox>
          </div>
        )}

        {/* Gallery Card */}
        {dashletVisibility['birthday'] && (
          <div className="col-span-12 lg:col-span-4">
            <CardBox theme={theme}>
              <button onClick={() => setGalleryExpanded(!galleryExpanded)} className="w-full text-left p-4 hover:shadow-md transition-all rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Image size={18} className="text-blue-500" />
                    </div>
                    <div>
                      <h3 className={`text-sm font-bold ${theme.highlight}`}>Gallery</h3>
                      <p className={`text-xs ${theme.iconColor}`}>3 new albums this week</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-blue-500">3</span>
                    {galleryExpanded ? <ChevronUp size={14} className={theme.iconColor} /> : <ChevronDown size={14} className={theme.iconColor} />}
                  </div>
                </div>
              </button>
            </CardBox>
          </div>
        )}

        {/* Infirmary Card */}
        {dashletVisibility['infirmary'] && (
          <div className="col-span-12 lg:col-span-4">
            <CardBox theme={theme}>
              <button onClick={() => setInfirmaryExpanded(!infirmaryExpanded)} className="w-full text-left p-4 hover:shadow-md transition-all rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                      <Heart size={18} className="text-red-500" />
                    </div>
                    <div>
                      <h3 className={`text-sm font-bold ${theme.highlight}`}>Infirmary</h3>
                      <p className={`text-xs ${theme.iconColor}`}>4 visits · 12 allergy alerts</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-red-500">4</span>
                    {infirmaryExpanded ? <ChevronUp size={14} className={theme.iconColor} /> : <ChevronDown size={14} className={theme.iconColor} />}
                  </div>
                </div>
              </button>
            </CardBox>
          </div>
        )}
      </div>

      {/* Expanded Birthday Section */}
      {birthdayExpanded && dashletVisibility['birthday'] && (
        <CardBox theme={theme} className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Cake size={18} className="text-pink-500" />
              <h3 className={`text-base font-bold ${theme.highlight}`}>Today&apos;s Birthdays</h3>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors">
              <Send size={12} /> Send Wish to All
            </button>
          </div>
          <div className="space-y-2">
            {[
              { name: 'Aarav Singh', detail: 'Class 8A', type: 'student' },
              { name: 'Priya Patel', detail: 'Class 5B', type: 'student' },
              { name: 'Sneha Verma', detail: 'Class 3C', type: 'student' },
              { name: 'Mr. Rakesh Kumar', detail: 'Science Dept', type: 'staff' },
            ].map((b, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${theme.secondaryBg}`}>
                <div className="w-9 h-9 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
                  <Cake size={15} className="text-pink-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <button onClick={() => setMiniProfile({ name: b.name, class: b.type === 'student' ? b.detail : undefined, role: b.type === 'staff' ? b.detail : undefined })} className={`text-xs font-bold ${theme.highlight} hover:underline cursor-pointer truncate block text-left`}>{b.name}</button>
                  <p className={`text-[11px] ${theme.iconColor}`}>{b.detail}</p>
                </div>
                <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white text-[11px] font-semibold hover:bg-emerald-700 transition-colors shrink-0">
                  <Send size={10} /> Wish
                </button>
              </div>
            ))}
          </div>
        </CardBox>
      )}

      {/* Expanded Gallery Section */}
      {galleryExpanded && dashletVisibility['birthday'] && (
        <CardBox theme={theme} className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Image size={18} className={theme.iconColor} />
            <h3 className={`text-base font-bold ${theme.highlight}`}>Gallery Highlights</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { title: 'Science Exhibition', color: 'bg-blue-100' },
              { title: 'Sports Day', color: 'bg-emerald-100' },
              { title: 'Annual Function', color: 'bg-purple-100' },
            ].map((g, i) => (
              <div key={i} className={`rounded-xl overflow-hidden border ${theme.border} hover:shadow-md transition-all cursor-pointer`}>
                <div className={`${g.color} h-20 flex items-center justify-center`}>
                  <Image size={24} className="text-gray-400" />
                </div>
                <div className="p-2.5">
                  <p className={`text-xs font-bold ${theme.highlight} truncate`}>{g.title}</p>
                </div>
              </div>
            ))}
          </div>
        </CardBox>
      )}

      {/* Expanded Infirmary Section */}
      {infirmaryExpanded && dashletVisibility['infirmary'] && (
        <CardBox theme={theme} className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Heart size={18} className="text-red-500" />
            <h3 className={`text-base font-bold ${theme.highlight}`}>Infirmary — Today&apos;s Visits</h3>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className={`${theme.secondaryBg} rounded-xl p-3 text-center`}>
              <p className={`text-[11px] ${theme.iconColor} mb-1`}>Visits Today</p>
              <p className={`text-2xl font-bold ${theme.highlight}`}>4</p>
            </div>
            <div className={`${theme.secondaryBg} rounded-xl p-3 text-center`}>
              <p className={`text-[11px] ${theme.iconColor} mb-1`}>Active Allergy Alerts</p>
              <p className="text-2xl font-bold text-amber-600">12</p>
            </div>
          </div>
          <p className={`text-[11px] font-bold uppercase ${theme.iconColor} mb-2 tracking-wider`}>Recent Visits</p>
          <div className="space-y-1.5">
            {[
              { name: 'Rahul M.', reason: 'Headache', time: '10:30 AM', cls: '7A' },
              { name: 'Sneha K.', reason: 'Stomach ache', time: '11:15 AM', cls: '5B' },
              { name: 'Arjun P.', reason: 'Minor cut', time: '1:45 PM', cls: '9A' },
              { name: 'Meera D.', reason: 'Fever (100.2F)', time: '2:10 PM', cls: '4C' },
            ].map((v, i) => (
              <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-xl ${theme.secondaryBg}`}>
                <Heart size={12} className="text-red-400 shrink-0" />
                <button onClick={() => setMiniProfile({ name: v.name, class: v.cls })} className={`text-xs font-bold ${theme.highlight} hover:underline cursor-pointer`}>{v.name}</button>
                <span className={`text-[11px] ${theme.iconColor}`}>— {v.reason}</span>
                <span className={`text-[11px] ${theme.iconColor} ml-auto`}>{v.time}</span>
                <button title="Call Parent" className="w-6 h-6 rounded-md bg-blue-100 flex items-center justify-center hover:bg-blue-200 transition-colors">
                  <Phone size={11} className="text-blue-600" />
                </button>
                <button title="Refer to Doctor" className="w-6 h-6 rounded-md bg-red-100 flex items-center justify-center hover:bg-red-200 transition-colors">
                  <Stethoscope size={11} className="text-red-600" />
                </button>
              </div>
            ))}
          </div>
        </CardBox>
      )}
      </DashletSection>

      {/* ═══════════════════ CHRONIC ATTENDANCE ═══════════════════ */}
      <DashletSection id="chronic-attendance" label="Chronic Attendance">
      {!isPreschool && (
        <CardBox theme={theme} className="border-2 border-red-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
              <Shield size={16} className="text-red-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-red-700">Chronic Attendance Alert</h3>
              <p className={`text-[11px] ${theme.iconColor}`}>3 students flagged for &gt;30 days absence — POCSO/Child Safety protocol</p>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold ml-auto">Action Required</span>
          </div>
          <div className="overflow-x-auto rounded-lg border" style={{ borderColor: 'rgb(229 231 235)' }}>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-red-50/50">
                  <th className={`text-left py-2.5 px-3 ${theme.iconColor} font-semibold text-xs`}>Student</th>
                  <th className={`text-left py-2.5 px-3 ${theme.iconColor} font-semibold text-xs`}>Class</th>
                  <th className={`text-left py-2.5 px-3 ${theme.iconColor} font-semibold text-xs`}>Days Absent</th>
                  <th className={`text-left py-2.5 px-3 ${theme.iconColor} font-semibold text-xs`}>Parent Contacted</th>
                  <th className={`text-left py-2.5 px-3 ${theme.iconColor} font-semibold text-xs`}>Counselor</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Rohit Verma', cls: '7A', days: 34, contacted: 'Yes (Feb 20)', counselor: 'Assigned' },
                  { name: 'Meena Kumari', cls: '5C', days: 31, contacted: 'Yes (Feb 22)', counselor: 'Pending' },
                  { name: 'Ajay Thakur', cls: '9B', days: 38, contacted: 'No — unreachable', counselor: 'Assigned' },
                ].map((s, i) => (
                  <tr key={i} className="border-t hover:bg-red-50/30 transition-colors" style={{ borderColor: 'rgb(229 231 235)' }}>
                    <td className={`py-2.5 px-3 font-semibold ${theme.highlight} text-xs`}>{s.name}</td>
                    <td className={`py-2.5 px-3 ${theme.iconColor} text-xs`}>{s.cls}</td>
                    <td className="py-2.5 px-3 font-bold text-red-600 text-xs">{s.days}</td>
                    <td className={`py-2.5 px-3 ${theme.iconColor} text-xs`}>{s.contacted}</td>
                    <td className="py-2.5 px-3">
                      <span className={`text-[11px] px-2.5 py-1 rounded-full font-semibold ${
                        s.counselor === 'Assigned' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>{s.counselor}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBox>
      )}
      </DashletSection>

      {/* ═══════════════════ GRIEVANCES ═══════════════════ */}
      <DashletSection id="grievances" label="Grievances">
      {!isPreschool && (
        <CardBox theme={theme} className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                <MessageSquare size={16} className="text-indigo-500" />
              </div>
              <h3 className={`text-base font-bold ${theme.highlight}`}>Student Grievances</h3>
            </div>
            <button className={`text-xs px-3 py-1.5 rounded-lg ${theme.secondaryBg} ${theme.highlight} font-semibold ${theme.buttonHover}`}>View All</button>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className={`${theme.secondaryBg} rounded-xl p-3 text-center`}>
              <p className="text-2xl font-bold text-amber-600">2</p>
              <p className={`text-[11px] ${theme.iconColor}`}>Open</p>
            </div>
            <div className={`${theme.secondaryBg} rounded-xl p-3 text-center`}>
              <p className="text-2xl font-bold text-emerald-600">15</p>
              <p className={`text-[11px] ${theme.iconColor}`}>Resolved</p>
            </div>
            <div className={`${theme.secondaryBg} rounded-xl p-3 text-center`}>
              <p className="text-2xl font-bold text-blue-600">4 days</p>
              <p className={`text-[11px] ${theme.iconColor}`}>Avg Resolution</p>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { id: 'GR-042', subject: 'Bullying complaint — Class 7A', date: 'Feb 25', status: 'Open', priority: 'High' },
              { id: 'GR-041', subject: 'Canteen food quality concern', date: 'Feb 23', status: 'Open', priority: 'Medium' },
            ].map((g, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${theme.secondaryBg} hover:shadow-sm transition-all`}>
                <div className={`w-9 h-9 rounded-lg ${g.priority === 'High' ? 'bg-red-100' : 'bg-amber-100'} flex items-center justify-center shrink-0`}>
                  <MessageSquare size={15} className={g.priority === 'High' ? 'text-red-500' : 'text-amber-500'} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-bold ${theme.highlight} truncate`}>{g.id}: {g.subject}</p>
                  <p className={`text-[11px] ${theme.iconColor}`}>{g.date}</p>
                </div>
                <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold shrink-0 ${
                  g.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                }`}>{g.priority}</span>
              </div>
            ))}
          </div>
        </CardBox>
      )}
      </DashletSection>

      {/* ═══════════════════ RTE QUOTA ═══════════════════ */}
      <DashletSection id="rte-tracking" label="RTE Quota">
      {dashletVisibility['rteQuota'] && (
        <CardBox theme={theme} className="overflow-hidden">
          <button onClick={() => setRteExpanded(!rteExpanded)} className={`w-full flex items-center justify-between p-5 ${theme.buttonHover}`}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                <ShieldCheck size={16} className="text-emerald-600" />
              </div>
              <h3 className={`text-sm font-bold ${theme.highlight}`}>RTE 25% Quota Tracking</h3>
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 font-semibold">83% — On Track</span>
            </div>
            <ChevronDown size={16} className={`${theme.iconColor} transition-transform ${rteExpanded ? 'rotate-180' : ''}`} />
          </button>
          {rteExpanded && (
            <div className="px-5 pb-5">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-xs ${theme.iconColor}`}>62 / 75 seats filled</span>
                  <span className="text-xs font-bold text-emerald-600">83%</span>
                </div>
                <div className={`w-full h-3 rounded-full ${theme.secondaryBg} overflow-hidden`}>
                  <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: '83%' }} />
                </div>
              </div>
              <div className="overflow-x-auto rounded-lg border" style={{ borderColor: 'rgb(229 231 235)' }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className={`text-left py-2 px-3 ${theme.iconColor} font-semibold text-xs`}>Grade</th>
                      <th className={`text-left py-2 px-3 ${theme.iconColor} font-semibold text-xs`}>Filled</th>
                      <th className={`text-left py-2 px-3 ${theme.iconColor} font-semibold text-xs`}>Quota</th>
                      <th className={`text-left py-2 px-3 ${theme.iconColor} font-semibold text-xs`}>Progress</th>
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
                    ].map((r, i) => {
                      const pct = Math.round((r.filled / r.quota) * 100);
                      return (
                        <tr key={i} className="border-t" style={{ borderColor: 'rgb(229 231 235)' }}>
                          <td className={`py-2 px-3 ${theme.highlight} font-semibold text-xs`}>{r.grade}</td>
                          <td className={`py-2 px-3 ${theme.iconColor} text-xs`}>{r.filled}</td>
                          <td className={`py-2 px-3 ${theme.iconColor} text-xs`}>{r.quota}</td>
                          <td className="py-2 px-3">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${pct >= 80 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${pct}%` }} />
                              </div>
                              <span className={`text-xs font-bold min-w-[32px] text-right ${pct >= 80 ? 'text-emerald-600' : 'text-amber-600'}`}>{pct}%</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardBox>
      )}
      </DashletSection>

      {/* ═══════════════════ NEWS BOARD + TASKS ═══════════════════ */}
      <DashletSection id="news-tasks" label="News & Tasks">
      <div className="grid grid-cols-12 gap-6">
        {/* News Board */}
        <div className="col-span-12 lg:col-span-6">
          <CardBox theme={theme} className="p-5 h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <h3 className={`text-base font-bold ${theme.highlight}`}>News Board</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-base px-3 py-1 rounded-lg ${theme.secondaryBg} ${theme.highlight} font-mono font-bold tracking-wider`}>
                  {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}
                </span>
                {!isPreschool && <span className="text-[11px] px-2 py-1 rounded-lg bg-blue-100 text-blue-700 font-semibold">Period 5 of 8</span>}
              </div>
            </div>

            {/* Going On Now */}
            <div className="mb-4">
              <p className={`text-[11px] font-bold uppercase ${theme.iconColor} mb-2 tracking-wider flex items-center gap-1`}>
                <Radio size={11} className="text-red-500" /> Going On Now
              </p>
              <div className="space-y-2">
                {(isPreschool ? [
                  { activity: 'Story Time — "The Hungry Caterpillar"', detail: 'Nursery A & B · Library Corner', icon: Sparkles, color: 'text-purple-600', bg: 'bg-purple-50', pulse: true },
                  { activity: 'Art & Craft — Finger Painting', detail: 'LKG · Art Room · Ms. Kavita', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50', pulse: true },
                  { activity: 'Outdoor Play — Sand Pit', detail: 'Playground · All groups · 10:30-11:15', icon: Award, color: 'text-emerald-600', bg: 'bg-emerald-50', pulse: true },
                  { activity: 'Parent Drop-off Window Closing', detail: 'Gate · 5 children yet to arrive', icon: ShieldCheck, color: 'text-red-600', bg: 'bg-red-50', pulse: true },
                ] : [
                  { activity: 'Science Fair — Hall A', detail: 'Classes 6-8 · Judges evaluating projects', icon: Sparkles, color: 'text-purple-600', bg: 'bg-purple-50', pulse: true },
                  { activity: 'Unit Test 3 — Mathematics', detail: 'Class 10-A, 10-B · Period 5 (11:30-12:15)', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50', pulse: true },
                  { activity: 'Sports Practice — Cricket', detail: 'Ground · Inter-school team · Coach Verma', icon: Award, color: 'text-emerald-600', bg: 'bg-emerald-50', pulse: false },
                  { activity: 'CBSE Inspector Visit', detail: 'Principal Office · Lab inspection at 12:30', icon: ShieldCheck, color: 'text-red-600', bg: 'bg-red-50', pulse: true },
                ]).map((item, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${item.bg} border border-transparent`}>
                    <div className={`w-8 h-8 rounded-lg bg-white/60 flex items-center justify-center shrink-0 relative`}>
                      <item.icon size={15} className={item.color} />
                      {item.pulse && <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold ${theme.highlight} truncate`}>{item.activity}</p>
                      <p className={`text-[11px] ${theme.iconColor} truncate`}>{item.detail}</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-red-500 text-white font-bold shrink-0">LIVE</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming */}
            <div>
              <p className={`text-[11px] font-bold uppercase ${theme.iconColor} mb-2 tracking-wider flex items-center gap-1`}>
                <Clock size={11} /> Upcoming Today
              </p>
              <div className="space-y-2">
                {(isPreschool ? [
                  { activity: 'Lunch Time — All Groups', detail: '12:00 PM · Dining Hall · Paneer Rice + Fruit', time: '12:00 PM', icon: Users },
                  { activity: 'Nap Time', detail: '12:45 PM · All Rooms · Rest period', time: '12:45 PM', icon: Clock },
                  { activity: 'Parent Pickup Window', detail: '3:00 PM · Gate · 56 children expected', time: '3:00 PM', icon: UserCheck },
                ] : [
                  { activity: 'Staff Meeting', detail: '3:00 PM · Conference Room · All HODs', time: '3:00 PM', icon: Users },
                  { activity: 'PTM — Class 9', detail: '4:00 PM · Classrooms · 42 parents expected', time: '4:00 PM', icon: UserCheck },
                  { activity: 'Annual Day Rehearsal', detail: '4:30 PM · Auditorium · Dance + Drama groups', time: '4:30 PM', icon: Star },
                ]).map((item, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${theme.secondaryBg}`}>
                    <div className={`w-8 h-8 rounded-lg ${theme.accentBg} flex items-center justify-center shrink-0`}>
                      <item.icon size={15} className={theme.iconColor} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold ${theme.highlight} truncate`}>{item.activity}</p>
                      <p className={`text-[11px] ${theme.iconColor} truncate`}>{item.detail}</p>
                    </div>
                    <span className={`text-xs ${theme.iconColor} font-medium shrink-0`}>{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardBox>
        </div>

        {/* Task Tracker */}
        <div className="col-span-12 lg:col-span-6">
          <TaskTrackerPanel theme={theme} role="principal" />
        </div>

        {/* Recurring Tasks */}
        <div className="col-span-12">
          <RecurringTasksCard theme={theme} role="principal" isPreschool={isPreschool} />
        </div>
      </div>
      </DashletSection>

      {/* ═══════════════════ MODALS ═══════════════════ */}

      {/* Dashlet Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowGallery(false)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <LayoutGrid size={20} className={theme.iconColor} />
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
              ].map(d => (
                <div key={d.key} className={`flex items-center gap-3 p-4 rounded-xl ${theme.secondaryBg} border ${theme.border}`}>
                  <div className={`w-10 h-10 rounded-lg ${theme.accentBg} flex items-center justify-center shrink-0`}>
                    <d.icon size={18} className={theme.iconColor} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-bold ${theme.highlight}`}>{d.name}</p>
                    <p className={`text-[11px] ${theme.iconColor} truncate`}>{d.desc}</p>
                  </div>
                  <button onClick={() => setDashletVisibility(prev => ({ ...prev, [d.key]: !prev[d.key] }))} className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all ${dashletVisibility[d.key] ? 'bg-emerald-100 text-emerald-600' : `${theme.accentBg} ${theme.iconColor}`}`}>
                    {dashletVisibility[d.key] ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Onboarding Tour */}
      {showTour && (
        <OnboardingTour theme={theme} onDismiss={() => setShowTour(false)} />
      )}

      {/* Mini-Profile Popup */}
      {miniProfile && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4" onClick={() => setMiniProfile(null)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 w-80 shadow-2xl`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-base font-bold ${theme.highlight}`}>Quick Profile</h3>
              <button onClick={() => setMiniProfile(null)} className={`w-8 h-8 rounded-full ${theme.secondaryBg} flex items-center justify-center ${theme.buttonHover}`}>
                <X size={14} className={theme.iconColor} />
              </button>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold mb-3 shadow-lg">
                {miniProfile.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <p className={`text-sm font-bold ${theme.highlight}`}>{miniProfile.name}</p>
              {miniProfile.class && <p className={`text-xs ${theme.iconColor} mt-0.5`}>Class: {miniProfile.class}</p>}
              {miniProfile.role && <p className={`text-xs ${theme.iconColor} mt-0.5`}>Role: {miniProfile.role}</p>}
              <div className="grid grid-cols-2 gap-3 mt-4 w-full">
                <div className={`${theme.secondaryBg} rounded-xl p-3 text-center`}>
                  <p className={`text-[11px] ${theme.iconColor}`}>Attendance</p>
                  <p className="text-lg font-bold text-emerald-600">94%</p>
                </div>
                <div className={`${theme.secondaryBg} rounded-xl p-3 text-center`}>
                  <p className={`text-[11px] ${theme.iconColor}`}>Fee Status</p>
                  <p className="text-lg font-bold text-emerald-600">Paid</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      </DraggableDashboard>

      {/* Mobile App Preview Side Panel */}
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
