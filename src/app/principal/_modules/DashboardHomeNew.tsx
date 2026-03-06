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
  Phone, Stethoscope, ChevronDown, ChevronUp, Shield, MessageSquare,
  HelpCircle, Smartphone, TrendingUp, TrendingDown, ArrowUpRight,
} from 'lucide-react';
import TaskTrackerPanel from '@/components/TaskTrackerPanel';
import RecurringTasksCard from '@/components/RecurringTasksCard';
import OnboardingTour from '@/components/OnboardingTour';
import DrillDownPanel from './DrillDownPanel';
import { DraggableDashboard, DashletSection } from '@/components/DraggableDashboard';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// ─── MatDash colors ──────────────────────────────────────
const PRIMARY = '#5D87FF';
const SECONDARY = '#49BEFF';
const SUCCESS = '#2EA95C';
const WARNING = '#FFAE1F';
const ERROR = '#FA896B';

// ─── CardBox (MatDash pattern: shadow-md, p-6, rounded-xl) ──
function Card({ children, className = '', style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`bg-white rounded-xl shadow-md p-6 ${className}`} style={style}>
      {children}
    </div>
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

  // ─── ApexCharts configs ─────────────────────────────────

  // Attendance semi-donut (MatDash YourPerformance pattern)
  const attendanceSemiDonut = (present: number, total: number, colors: string[]): ApexCharts.ApexOptions => ({
    chart: { type: 'donut', height: 180, fontFamily: 'inherit' },
    series: [present, total - present],
    labels: ['Present', 'Absent'],
    colors,
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        offsetY: 10,
        donut: { size: '85%', labels: {
          show: true, name: { show: false },
          value: { show: true, fontSize: '24px', fontWeight: '700', offsetY: -10,
            formatter: () => `${Math.round((present / total) * 100)}%`
          },
        }},
      },
    },
    stroke: { width: 2, colors: ['#fff'] },
    grid: { padding: { bottom: -80 } },
    legend: { show: false },
    dataLabels: { enabled: false },
    tooltip: { enabled: true, theme: 'dark' },
  });

  // Revenue area chart (MatDash RevenueForcast pattern)
  const feeChartOpts: ApexCharts.ApexOptions = {
    chart: { type: 'area', height: 310, toolbar: { show: false }, fontFamily: 'inherit', foreColor: '#adb0bb' },
    series: [
      { name: 'Collected', data: [15.2, 13.8, 16.4, 14.2, 15.8, 17.2, 14.8, 16.5, 15.4, 16.8, 12.4, 4.8] },
      { name: 'Outstanding', data: [2.8, 4.2, 1.6, 3.8, 2.2, 0.8, 3.2, 1.5, 2.6, 1.2, 5.6, 13.2] },
    ],
    colors: [PRIMARY, ERROR],
    stroke: { curve: 'monotoneCubic', width: 2 },
    fill: { type: 'gradient', gradient: { shadeIntensity: 0, inverseColors: false, opacityFrom: 0.05, opacityTo: 0.01, stops: [100] } },
    xaxis: { categories: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'], axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { formatter: (v: number) => `${v.toFixed(0)}L` } },
    grid: { borderColor: 'rgba(0,0,0,0.05)', xaxis: { lines: { show: true } }, yaxis: { lines: { show: true } } },
    legend: { show: false },
    dataLabels: { enabled: false },
    markers: { strokeWidth: 2, strokeColors: [PRIMARY, ERROR] },
    tooltip: { theme: 'dark', y: { formatter: (v: number) => `₹${v.toFixed(1)}L` } },
  };

  // Sparkline (MatDash Customer/UsersBox pattern)
  const sparkline = (data: number[], color: string, h = 70): ApexCharts.ApexOptions => ({
    chart: { type: 'area', height: h, sparkline: { enabled: true }, fontFamily: 'inherit' },
    colors: [color],
    stroke: { curve: 'smooth', width: 2 },
    fill: { type: 'gradient', gradient: { shadeIntensity: 0, inverseColors: false, opacityFrom: 0.2, opacityTo: 0.8, stops: [100] } },
    markers: { size: 0 },
    tooltip: { theme: 'dark', fixed: { enabled: true, position: 'right' }, x: { show: false } },
  });

  // Enquiry bar chart
  const enquiryBarOpts: ApexCharts.ApexOptions = {
    chart: { type: 'bar', height: 180, toolbar: { show: false }, fontFamily: 'inherit' },
    plotOptions: { bar: { horizontal: true, borderRadius: 6, barHeight: '65%', distributed: true } },
    colors: [PRIMARY, WARNING, '#7C3AED', SUCCESS, ERROR],
    xaxis: { categories: ['New', 'Follow-up', 'Test', 'Converted', 'Lost'], labels: { show: false } },
    yaxis: { labels: { style: { fontSize: '12px', colors: '#2A3547' } } },
    grid: { show: false },
    dataLabels: { enabled: true, style: { fontSize: '13px', fontWeight: '600' } },
    legend: { show: false },
    tooltip: { enabled: false },
  };

  return (
    <div className="flex gap-4">
      <DraggableDashboard dashboardId="principal" theme={theme} className={`${showMobilePreview ? 'flex-1 min-w-0' : 'w-full'} space-y-7 transition-all`}>

      {/* ═══════ WELCOME BOX (MatDash Dashboard1 WelcomeBox) ═══════ */}
      <DashletSection id="welcome" label="Welcome">
      <div className="grid grid-cols-12 gap-7">
        {/* Welcome Card — purple bg */}
        <div className="lg:col-span-6 col-span-12">
          <div className="bg-[#5D87FF] rounded-xl shadow-md p-6 h-full">
            <div className="grid grid-cols-12">
              <div className="col-span-7">
                <div className="flex gap-4 items-center">
                  <div className="h-12 w-12 rounded-xl bg-white/90 flex items-center justify-center shrink-0">
                    <GraduationCap size={22} className="text-[#5D87FF]" />
                  </div>
                  <h5 className="text-xl text-white font-semibold">
                    {isPreschool ? 'Welcome, Centre Head' : 'Welcome Back, Dr. Sharma'}
                  </h5>
                </div>
                <div className="flex w-full mt-8">
                  <div className="border-r border-white/20 pr-5">
                    <p className="text-white/75 text-sm mb-1">Students</p>
                    <h2 className="text-white text-2xl font-bold">{dataMasked ? '***' : '2,847'}</h2>
                  </div>
                  <div className="pl-5">
                    <p className="text-white/75 text-sm mb-1">Staff</p>
                    <h2 className="text-white text-2xl font-bold">{dataMasked ? '***' : '142'}</h2>
                  </div>
                </div>
              </div>
              <div className="col-span-5 flex items-end justify-end">
                {/* Decorative illustration area */}
                <div className="w-32 h-32 rounded-full bg-white/10 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-white/15 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                      <Award size={28} className="text-white/80" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Forecast Chart */}
        <div className="lg:col-span-6 col-span-12">
          <Card className="pb-0 h-full">
            <div className="flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <span className="h-12 w-12 shrink-0 flex items-center justify-center rounded-xl" style={{ background: `${PRIMARY}1A` }}>
                  <Banknote size={22} style={{ color: PRIMARY }} />
                </span>
                <div>
                  <h5 className="text-lg font-semibold text-[#2A3547]">Fee Collection</h5>
                  <p className="text-sm text-[#98A4AE]">Overview of FY 2025-26</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex gap-2 text-sm items-center"><span className="h-2 w-2 rounded-full" style={{ background: PRIMARY }} /><span className="text-[#2A3547] opacity-80">Collected</span></div>
                <div className="flex gap-2 text-sm items-center"><span className="h-2 w-2 rounded-full" style={{ background: ERROR }} /><span className="text-[#2A3547] opacity-80">Outstanding</span></div>
              </div>
            </div>
            <div className="mt-2 -mx-2">
              <Chart options={feeChartOpts} series={feeChartOpts.series} type="area" height="240px" width="100%" />
            </div>
          </Card>
        </div>
      </div>
      </DashletSection>

      {/* ═══════ TOOLBAR (compact) ═══════ */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-[#98A4AE] flex items-center gap-1"><Clock size={12} /> Last refreshed: 2 min ago &middot; {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}</p>
        <div className="flex items-center gap-2">
          {[
            { action: () => setShowTour(true), icon: HelpCircle, title: 'Tour' },
            { action: () => setDataMasked(!dataMasked), icon: dataMasked ? EyeOff : Eye, title: 'Mask' },
            { action: () => setShowGallery(true), icon: LayoutGrid, title: 'Dashlets' },
            { action: () => setDarkMode(!darkMode), icon: darkMode ? Sun : Moon, title: 'Theme' },
            { action: () => setShowMobilePreview(!showMobilePreview), icon: Smartphone, title: 'Mobile' },
          ].map((btn, i) => (
            <button key={i} onClick={btn.action} title={btn.title}
              className="w-9 h-9 rounded-xl bg-[#F2F6FA] flex items-center justify-center hover:bg-[#E8ECEF] transition-colors">
              <btn.icon size={16} className="text-[#2A3547]" />
            </button>
          ))}
          <button title="Notifications" className="relative w-9 h-9 rounded-xl bg-[#F2F6FA] flex items-center justify-center hover:bg-[#E8ECEF] transition-colors">
            <Bell size={16} className="text-[#2A3547]" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white" style={{ background: ERROR }}>3</span>
          </button>
          <button onClick={onProfileClick} className="w-9 h-9 rounded-full bg-[#5D87FF] text-white flex items-center justify-center hover:opacity-90">
            <User size={16} />
          </button>
        </div>
      </div>

      {/* ═══════ ALERTS ═══════ */}
      <DashletSection id="alerts" label="Alerts">
      <div className="space-y-2">
        {!dismissedAlerts.includes('fee-collection-drive') && (
          <div className="rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm" style={{ background: `${WARNING}15`, borderLeft: `4px solid ${WARNING}` }}>
            <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${WARNING}25` }}>
              <AlertTriangle size={16} style={{ color: WARNING }} />
            </div>
            <p className="text-sm font-medium text-[#2A3547] flex-1">Required: Fee Collection Drive — verify by Mar 5</p>
            <button onClick={() => alert('Done')} className="px-3 py-1.5 rounded-lg text-white text-xs font-semibold" style={{ background: WARNING }}>Done</button>
            <button className="px-3 py-1.5 rounded-lg bg-white text-[#2A3547] text-xs font-semibold shadow-sm">Details</button>
            <button onClick={() => setDismissedAlerts(p => [...p, 'fee-collection-drive'])} className="text-[#98A4AE] hover:text-[#2A3547]"><X size={14} /></button>
          </div>
        )}
        {!isPreschool && !dismissedAlerts.includes('bottleneck-alert') && (
          <div className="rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm" style={{ background: `${ERROR}12`, borderLeft: `4px solid ${ERROR}` }}>
            <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${ERROR}20` }}>
              <AlertTriangle size={16} style={{ color: ERROR }} />
            </div>
            <p className="text-sm font-medium text-[#2A3547] flex-1">Bottleneck — 23 leave approvals pending &gt; 3 days | 5 fee concessions awaiting sign-off</p>
            <button onClick={() => setDismissedAlerts(p => [...p, 'bottleneck-alert'])} className="text-[#98A4AE] hover:text-[#2A3547]"><X size={14} /></button>
          </div>
        )}
        {isPreschool && !dismissedAlerts.includes('preschool-mode') && (
          <div className="rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm" style={{ background: `${SECONDARY}12`, borderLeft: `4px solid ${SECONDARY}` }}>
            <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${SECONDARY}20` }}>
              <AlertTriangle size={16} style={{ color: SECONDARY }} />
            </div>
            <p className="text-sm font-medium text-[#2A3547] flex-1">Preschool Mode — Centre Head view with child safety, staff-child ratios, milestone tracking</p>
            <button onClick={() => setDismissedAlerts(p => [...p, 'preschool-mode'])} className="text-[#98A4AE] hover:text-[#2A3547]"><X size={14} /></button>
          </div>
        )}
      </div>
      </DashletSection>

      {/* ═══════ COLOR BOXES — Stat Cards (MatDash Dashboard3 ColorBoxes) ═══════ */}
      <DashletSection id="stats-actions" label="Stats & Actions">
      <Card className="!p-5">
        <div className="flex gap-7 overflow-x-auto">
          {[
            { icon: Banknote, title: 'Fee This Month', value: dataMasked ? '₹ ****' : '₹12.4L', gradient: `linear-gradient(180deg, ${PRIMARY}1F 0%, ${PRIMARY}08 100%)`, color: PRIMARY, trend: '+8%', up: true, onClick: () => setShowFeeDrillDown(!showFeeDrillDown) },
            { icon: Users, title: 'New Enquiries', value: dataMasked ? '***' : '12', gradient: `linear-gradient(180deg, ${SECONDARY}1F 0%, ${SECONDARY}08 100%)`, color: SECONDARY, trend: '+3', up: true, onClick: () => setShowEnquiryPipeline(!showEnquiryPipeline) },
            { icon: ClipboardCheck, title: 'Pending Approvals', value: '8', gradient: `linear-gradient(180deg, ${WARNING}1F 0%, ${WARNING}08 100%)`, color: WARNING, trend: '3 urgent', up: false, onClick: () => setShowApprovalsDrillDown(!showApprovalsDrillDown) },
            { icon: Banknote, title: 'Today\'s Collection', value: dataMasked ? '₹ ****' : '₹2.45L', gradient: `linear-gradient(180deg, ${SUCCESS}1F 0%, ${SUCCESS}08 100%)`, color: SUCCESS, onClick: () => setShowCollectionDrillDown(!showCollectionDrillDown) },
            { icon: BarChart3, title: 'Quick Actions', value: '4', gradient: `linear-gradient(180deg, ${ERROR}1F 0%, ${ERROR}08 100%)`, color: ERROR },
          ].map((item, i) => (
            <button key={i} onClick={item.onClick} className="lg:basis-1/5 md:basis-1/4 basis-full lg:shrink shrink-0 text-center px-5 py-6 rounded-xl transition-all hover:shadow-lg" style={{ background: item.gradient }}>
              <span className="h-12 w-12 mx-auto flex items-center justify-center rounded-xl text-white" style={{ background: item.color }}>
                <item.icon size={22} />
              </span>
              <p className="text-[#2A3547] font-normal mt-4 mb-1 text-sm">{item.title}</p>
              <h4 className="text-2xl font-bold text-[#2A3547]">{item.value}</h4>
              {item.trend && (
                <span className={`text-xs font-semibold mt-1 inline-flex items-center gap-1 ${item.up ? 'text-[#2EA95C]' : 'text-[#FA896B]'}`}>
                  {item.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {item.trend}
                </span>
              )}
            </button>
          ))}
        </div>
      </Card>
      </DashletSection>

      {/* ═══════ ATTENDANCE ROW — Semi Donut + Sparklines (MatDash pattern) ═══════ */}
      <DashletSection id="attendance" label="Attendance">
      <div className="grid grid-cols-12 gap-7">
        {/* Student Attendance — YourPerformance style */}
        <div className="lg:col-span-5 col-span-12">
          <Card>
            <button onClick={() => setDrillDown(drillDown === 'students' ? null : 'students')} className={`w-full text-left ${drillDown === 'students' ? 'ring-2 ring-[#5D87FF] rounded-xl -m-1 p-1' : ''}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="text-lg font-semibold text-[#2A3547]">Student Attendance</h5>
                  <p className="text-sm text-[#98A4AE]">Today&apos;s overview</p>
                </div>
                <ChevronRight size={16} className={`text-[#98A4AE] ${drillDown === 'students' ? 'rotate-90' : ''} transition-transform`} />
              </div>
              <div className="grid grid-cols-12 mt-4">
                <div className="col-span-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-3 items-center">
                      <span className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl" style={{ background: `${SUCCESS}1A` }}>
                        <UserCheck size={18} style={{ color: SUCCESS }} />
                      </span>
                      <div>
                        <h5 className="text-sm font-semibold text-[#2A3547]">{dataMasked ? '***' : '2,598'} present</h5>
                        <p className="text-xs text-[#98A4AE]">of {dataMasked ? '***' : '2,847'}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <span className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl" style={{ background: `${ERROR}1A` }}>
                        <X size={18} style={{ color: ERROR }} />
                      </span>
                      <div>
                        <h5 className="text-sm font-semibold text-[#2A3547]">{dataMasked ? '***' : '249'} absent</h5>
                        <p className="text-xs text-[#98A4AE]">8.7% rate</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <span className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl" style={{ background: `${WARNING}1A` }}>
                        <Clock size={18} style={{ color: WARNING }} />
                      </span>
                      <div>
                        <h5 className="text-sm font-semibold text-[#2A3547]">{dataMasked ? '***' : '153'} on leave</h5>
                        <p className="text-xs text-[#98A4AE]">Enrolled: 3,000</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-6 -mt-4">
                  <Chart options={attendanceSemiDonut(2598, 2847, [SUCCESS, ERROR])} series={[2598, 249]} type="donut" height="180px" width="100%" />
                </div>
              </div>
            </button>
          </Card>
        </div>

        {/* Academic Staff — Sparkline card */}
        <div className="lg:col-span-3.5 col-span-12 lg:col-span-4">
          <Card className="!p-0 overflow-hidden h-full">
            <button onClick={() => setDrillDown(drillDown === 'academic' ? null : 'academic')} className={`w-full text-left ${drillDown === 'academic' ? 'ring-2 ring-[#5D87FF] rounded-xl' : ''}`}>
              <div className="flex justify-between p-6 pb-3" style={{ background: `${PRIMARY}12` }}>
                <div>
                  <p className="text-[#2A3547] text-sm font-semibold">Academic Staff</p>
                  <div className="flex gap-3 items-baseline mt-1">
                    <h5 className="text-2xl font-bold text-[#2A3547]">{dataMasked ? '***' : '72'}<span className="text-sm font-normal text-[#98A4AE]"> / 78</span></h5>
                    <span className="text-xs font-semibold" style={{ color: SUCCESS }}>92%</span>
                  </div>
                </div>
                <span className="h-10 w-10 shrink-0 flex items-center justify-center bg-white rounded-xl shadow-sm">
                  <GraduationCap size={18} style={{ color: PRIMARY }} />
                </span>
              </div>
              <Chart options={sparkline([65, 70, 68, 72, 71, 72], PRIMARY, 80)} series={[{ data: [65, 70, 68, 72, 71, 72] }]} type="area" height="80px" width="100%" />
            </button>
          </Card>
        </div>

        {/* Non-Academic Staff — Sparkline card */}
        <div className="lg:col-span-3 col-span-12">
          <Card className="!p-0 overflow-hidden h-full">
            <button onClick={() => setDrillDown(drillDown === 'non-academic' ? null : 'non-academic')} className={`w-full text-left ${drillDown === 'non-academic' ? 'ring-2 ring-[#5D87FF] rounded-xl' : ''}`}>
              <div className="flex justify-between p-6 pb-3" style={{ background: `${SECONDARY}12` }}>
                <div>
                  <p className="text-[#2A3547] text-sm font-semibold">Non-Academic Staff</p>
                  <div className="flex gap-3 items-baseline mt-1">
                    <h5 className="text-2xl font-bold text-[#2A3547]">{dataMasked ? '***' : '56'}<span className="text-sm font-normal text-[#98A4AE]"> / 64</span></h5>
                    <span className="text-xs font-semibold" style={{ color: SUCCESS }}>88%</span>
                  </div>
                </div>
                <span className="h-10 w-10 shrink-0 flex items-center justify-center bg-white rounded-xl shadow-sm">
                  <Briefcase size={18} style={{ color: SECONDARY }} />
                </span>
              </div>
              <Chart options={sparkline([50, 54, 52, 56, 55, 56], SECONDARY, 80)} series={[{ data: [50, 54, 52, 56, 55, 56] }]} type="area" height="80px" width="100%" />
            </button>
          </Card>
        </div>
      </div>
      {drillDown && <DrillDownPanel type={drillDown} theme={theme} onClose={() => setDrillDown(null)} />}
      </DashletSection>

      {/* ═══════ ENQUIRY PIPELINE + APPROVALS (two-col) ═══════ */}
      <DashletSection id="enquiry-approvals" label="Enquiry & Approvals">
      <div className="grid grid-cols-12 gap-7">
        {/* Enquiry Pipeline */}
        <div className="lg:col-span-5 col-span-12">
          <Card className="h-full">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h5 className="text-lg font-semibold text-[#2A3547]">Enquiry Pipeline</h5>
                <p className="text-sm text-[#98A4AE]">12 active this week</p>
              </div>
              <button onClick={() => setShowEnquiryPipeline(!showEnquiryPipeline)} className="text-xs font-semibold flex items-center gap-1" style={{ color: PRIMARY }}>
                Details <ArrowUpRight size={12} />
              </button>
            </div>
            <Chart options={enquiryBarOpts} series={[{ data: [5, 3, 2, 1, 1] }]} type="bar" height="180px" />
            <div className="mt-2 px-3 py-2 rounded-xl text-center" style={{ background: `${PRIMARY}12` }}>
              <p className="text-xs font-semibold" style={{ color: PRIMARY }}>45 seats available across all grades</p>
            </div>
          </Card>
        </div>

        {/* Pending Approvals — DailyActivities timeline pattern */}
        <div className="lg:col-span-7 col-span-12">
          <Card className="pb-4 h-full">
            <div className="flex justify-between items-center mb-4">
              <h5 className="text-lg font-semibold text-[#2A3547]">Pending Approvals</h5>
              <button onClick={() => setShowApprovalsDrillDown(!showApprovalsDrillDown)} className="text-xs font-semibold flex items-center gap-1" style={{ color: PRIMARY }}>View All <ArrowUpRight size={12} /></button>
            </div>
            <div>
              {[
                { time: '9:30', text: 'Mrs. Priya Sharma — Casual Leave 3 days (Mar 5–7)', color: PRIMARY, urgent: true },
                { time: '10:15', text: 'Rajesh Patel (6A) — Fee concession ₹15,000 (50%)', color: WARNING, urgent: false },
                { time: '11:00', text: 'Aarav Singh (8B) — Transfer Certificate, relocating to Pune', color: '#7C3AED', urgent: false },
                { time: '11:45', text: 'Admin Office — Sports Day budget ₹45,000', color: SECONDARY, urgent: false },
                { time: '2:00', text: 'Ms. Anita Desai — Maternity Leave 26 weeks', color: ERROR, urgent: true },
                { time: '3:30', text: 'Lab Dept — Chemistry equipment ₹28,000', color: SUCCESS, urgent: false },
              ].map((item, i, arr) => (
                <div className="flex gap-x-3" key={i}>
                  <div className="w-14 text-end shrink-0">
                    <span className="text-[#2A3547] font-medium text-sm opacity-80">{item.time}</span>
                  </div>
                  <div className="relative">
                    <div className="relative z-10 w-7 h-5 flex justify-center items-center">
                      <div className="h-3 w-3 rounded-full" style={{ background: item.color }} />
                    </div>
                    {i < arr.length - 1 && <div className="border-l border-gray-200 h-full -mt-2 ml-3.5" />}
                  </div>
                  <div className="grow pt-0.5 pb-4 flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[#2A3547] text-sm font-medium">{item.text}</p>
                      {item.urgent && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1 inline-block" style={{ background: `${ERROR}20`, color: ERROR }}>Urgent</span>}
                    </div>
                    <div className="flex gap-1.5 shrink-0">
                      <button className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${SUCCESS}1A` }}>
                        <CheckCircle size={14} style={{ color: SUCCESS }} />
                      </button>
                      <button className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${ERROR}1A` }}>
                        <X size={14} style={{ color: ERROR }} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      </DashletSection>

      {/* ═══════ DRILL-DOWN PANELS (conditionally shown) ═══════ */}
      {showEnquiryPipeline && (
        <Card className="!border-2" style={{ borderColor: `${PRIMARY}40` }}>
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold text-[#2A3547]">Enquiry Pipeline — Today</h5>
            <button onClick={() => setShowEnquiryPipeline(false)} className="px-3 py-1 rounded-lg bg-[#F2F6FA] text-[#2A3547] text-xs font-semibold">Close</button>
          </div>
          <div className="mb-4 px-4 py-3 rounded-xl" style={{ background: `${PRIMARY}10` }}>
            <p className="text-xs font-bold" style={{ color: PRIMARY }}>Admission Vacancies: <span className="font-medium">KG: 8 | Class I: 5 | Class VI: 12 | Total: 45 seats</span></p>
          </div>
          <div className="grid grid-cols-5 gap-3 mb-4">
            {[
              { stage: 'New', count: 5, color: PRIMARY, sub: '3 walk-in, 2 online' },
              { stage: 'Follow-up', count: 3, color: WARNING, sub: 'Call today' },
              { stage: 'Test', count: 2, color: '#7C3AED', sub: 'Feb 18 & 20' },
              { stage: 'Converted', count: 1, color: SUCCESS, sub: 'Confirmed' },
              { stage: 'Lost', count: 1, color: ERROR, sub: 'Fee too high' },
            ].map(s => (
              <div key={s.stage} className="rounded-xl p-3 text-center" style={{ background: `${s.color}12` }}>
                <p className="text-2xl font-bold" style={{ color: s.color }}>{s.count}</p>
                <p className="text-xs font-semibold text-[#2A3547] mt-1">{s.stage}</p>
                <p className="text-[10px] text-[#98A4AE] mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full">
              <thead><tr className="border-b border-gray-100">
                {['Child', 'Class', 'Parent', 'Source', 'Stage', 'Date'].map(h => (
                  <th key={h} className="text-left py-3 px-3 text-sm font-normal text-[#98A4AE]">{h}</th>
                ))}
              </tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { child: 'Vikram Rao', cls: 'Nursery', parent: 'Sunil Rao', source: 'Walk-in', stage: 'New', date: 'Today', sc: PRIMARY },
                  { child: 'Anita Desai', cls: 'KG-1', parent: 'Meena Desai', source: 'Online', stage: 'Follow-up', date: 'Yesterday', sc: WARNING },
                  { child: 'Kabir Joshi', cls: '3rd', parent: 'Suresh Joshi', source: 'Referral', stage: 'Converted', date: 'Feb 14', sc: SUCCESS },
                  { child: 'Sanya Iyer', cls: '1st', parent: 'Ramesh Iyer', source: 'Online', stage: 'Test', date: 'Feb 18', sc: '#7C3AED' },
                  { child: 'Prachi Mehta', cls: '6th', parent: 'Deepak Mehta', source: 'Walk-in', stage: 'Lost', date: 'Feb 12', sc: ERROR },
                ].map((e, i) => (
                  <tr key={i}>
                    <td className="py-2.5 px-3 text-sm font-semibold text-[#2A3547]">{e.child}</td>
                    <td className="py-2.5 px-3 text-sm text-[#98A4AE]">{e.cls}</td>
                    <td className="py-2.5 px-3 text-sm text-[#98A4AE]">{e.parent}</td>
                    <td className="py-2.5 px-3 text-sm text-[#98A4AE]">{e.source}</td>
                    <td className="py-2.5 px-3"><span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: `${e.sc}20`, color: e.sc }}>{e.stage}</span></td>
                    <td className="py-2.5 px-3 text-sm text-[#98A4AE]">{e.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {showFeeDrillDown && (
        <Card className="!border-2" style={{ borderColor: `${SUCCESS}40` }}>
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold text-[#2A3547]">Fee Collection Breakdown — This Month</h5>
            <button onClick={() => setShowFeeDrillDown(false)} className="px-3 py-1 rounded-lg bg-[#F2F6FA] text-[#2A3547] text-xs font-semibold">Close</button>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-5">
            {[
              { label: 'Total Collected', value: dataMasked ? '₹ ****' : '₹12.4L', color: SUCCESS },
              { label: 'Outstanding', value: dataMasked ? '₹ ****' : '₹5.6L', color: ERROR },
              { label: 'Defaulters', value: dataMasked ? '***' : '45', color: WARNING },
              { label: 'Online vs Cash', value: '68%/32%', color: PRIMARY },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: `${s.color}10` }}>
                <p className="text-xs text-[#98A4AE] mb-1">{s.label}</p>
                <p className="text-lg font-bold" style={{ color: s.color }}>{s.value}</p>
              </div>
            ))}
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full">
              <thead><tr className="border-b border-gray-100">
                {['Class', 'Total Due', 'Collected', 'Outstanding', 'Progress'].map(h => (
                  <th key={h} className="text-left py-3 px-3 text-sm font-normal text-[#98A4AE]">{h}</th>
                ))}
              </tr></thead>
              <tbody className="divide-y divide-gray-100">
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
                  <tr key={i}>
                    <td className="py-2.5 px-3 text-sm font-semibold text-[#2A3547]">{r.cls}</td>
                    <td className="py-2.5 px-3 text-sm text-[#98A4AE]">{dataMasked ? '₹ ****' : r.due}</td>
                    <td className="py-2.5 px-3 text-sm text-[#98A4AE]">{dataMasked ? '₹ ****' : r.collected}</td>
                    <td className="py-2.5 px-3 text-sm text-[#98A4AE]">{dataMasked ? '₹ ****' : r.outstanding}</td>
                    <td className="py-2.5 px-3 w-40">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${r.pct}%`, background: r.pct >= 90 ? SUCCESS : r.pct >= 75 ? WARNING : ERROR }} />
                        </div>
                        <span className="text-xs font-bold w-8 text-right" style={{ color: r.pct >= 90 ? SUCCESS : r.pct >= 75 ? WARNING : ERROR }}>{r.pct}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {showCollectionDrillDown && (
        <Card className="!border-2" style={{ borderColor: `${SUCCESS}40` }}>
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold text-[#2A3547]">Today&apos;s Collection — Live</h5>
            <button onClick={() => setShowCollectionDrillDown(false)} className="px-3 py-1 rounded-lg bg-[#F2F6FA] text-[#2A3547] text-xs font-semibold">Close</button>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-5">
            {[
              { label: 'Cash', value: '₹78,000', color: SUCCESS },
              { label: 'Online/UPI', value: '₹1,42,000', color: PRIMARY },
              { label: 'Cheque', value: '₹25,000', color: '#7C3AED' },
              { label: 'Total', value: '₹2,45,000', color: '#2A3547' },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: `${s.color}10` }}>
                <p className="text-xs text-[#98A4AE] mb-1">{s.label}</p>
                <p className="text-lg font-bold" style={{ color: s.color }}>{s.value}</p>
              </div>
            ))}
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full">
              <thead><tr className="border-b border-gray-100">
                {['Receipt #', 'Student', 'Class', 'Amount', 'Mode', 'Time'].map(h => (
                  <th key={h} className="text-left py-3 px-3 text-sm font-normal text-[#98A4AE]">{h}</th>
                ))}
              </tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { receipt: 'R-4521', student: 'Aarav Singh', cls: '8B', amount: '₹12,500', mode: 'UPI', time: '10:45 AM', mc: PRIMARY },
                  { receipt: 'R-4520', student: 'Priya Verma', cls: '5A', amount: '₹8,000', mode: 'Cash', time: '10:30 AM', mc: SUCCESS },
                  { receipt: 'R-4519', student: 'Kabir Joshi', cls: '3C', amount: '₹15,000', mode: 'Online', time: '10:15 AM', mc: PRIMARY },
                  { receipt: 'R-4518', student: 'Sneha Patel', cls: '7A', amount: '₹25,000', mode: 'Cheque', time: '9:45 AM', mc: '#7C3AED' },
                  { receipt: 'R-4517', student: 'Rahul Kumar', cls: '10B', amount: '₹18,500', mode: 'UPI', time: '9:30 AM', mc: PRIMARY },
                ].map((t, i) => (
                  <tr key={i}>
                    <td className="py-2.5 px-3 text-sm font-bold" style={{ color: PRIMARY }}>{t.receipt}</td>
                    <td className="py-2.5 px-3 text-sm font-semibold text-[#2A3547]">{t.student}</td>
                    <td className="py-2.5 px-3 text-sm text-[#98A4AE]">{t.cls}</td>
                    <td className="py-2.5 px-3 text-sm font-bold" style={{ color: SUCCESS }}>{t.amount}</td>
                    <td className="py-2.5 px-3"><span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: `${t.mc}20`, color: t.mc }}>{t.mode}</span></td>
                    <td className="py-2.5 px-3 text-sm text-[#98A4AE]">{t.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {showApprovalsDrillDown && (
        <Card className="!border-2" style={{ borderColor: `${WARNING}40` }}>
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold text-[#2A3547]">All Pending Approvals</h5>
            <button onClick={() => setShowApprovalsDrillDown(false)} className="px-3 py-1 rounded-lg bg-[#F2F6FA] text-[#2A3547] text-xs font-semibold">Close</button>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-5">
            {[
              { label: 'Leave Requests', value: '3', color: PRIMARY },
              { label: 'Fee Concessions', value: '2', color: WARNING },
              { label: 'TC Requests', value: '1', color: '#7C3AED' },
              { label: 'Other', value: '2', color: '#98A4AE' },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: `${s.color}10` }}>
                <p className="text-xs text-[#98A4AE] mb-1">{s.label}</p>
                <p className="text-lg font-bold" style={{ color: s.color }}>{s.value}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {[
              { type: 'L', from: 'Mrs. Priya Sharma', detail: 'Casual Leave — 3 days (Mar 5–7)', date: 'Today', priority: 'Urgent', color: PRIMARY },
              { type: 'L', from: 'Mr. Suresh Mehta', detail: 'Sick Leave — 2 days', date: 'Yesterday', priority: '', color: PRIMARY },
              { type: 'F', from: 'Rajesh Patel (6A)', detail: 'Fee concession — ₹15,000 (50%)', date: 'Today', priority: '', color: WARNING },
              { type: 'T', from: 'Aarav Singh (8B)', detail: 'Transfer Certificate — Pune', date: '2d ago', priority: '', color: '#7C3AED' },
              { type: 'B', from: 'Admin Office', detail: 'Sports Day budget — ₹45,000', date: '3d ago', priority: '', color: SECONDARY },
              { type: 'L', from: 'Ms. Anita Desai', detail: 'Maternity Leave — 26 weeks', date: '3d ago', priority: 'Urgent', color: PRIMARY },
            ].map((a, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#F2F6FA]">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${a.color}1A` }}>
                  <span className="text-xs font-bold" style={{ color: a.color }}>{a.type}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#2A3547] truncate">{a.from}</p>
                  <p className="text-xs text-[#98A4AE] truncate">{a.detail}</p>
                </div>
                <span className="text-xs text-[#98A4AE] shrink-0">{a.date}</span>
                {a.priority === 'Urgent' && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0" style={{ background: `${ERROR}20`, color: ERROR }}>Urgent</span>}
                <div className="flex gap-1.5 shrink-0">
                  <button className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${SUCCESS}1A` }}><CheckCircle size={14} style={{ color: SUCCESS }} /></button>
                  <button className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${ERROR}1A` }}><X size={14} style={{ color: ERROR }} /></button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* ═══════ COMPACT DASHLETS ═══════ */}
      <DashletSection id="compact-dashlets" label="Quick Dashlets">
      <div className="grid grid-cols-12 gap-7">
        {dashletVisibility['birthday'] && (
          <div className="lg:col-span-4 col-span-12">
            <Card className="!p-0 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" >
              <button onClick={() => setBirthdayExpanded(!birthdayExpanded)} className="w-full text-left">
                <div className="flex justify-between items-center p-6" style={{ background: `${ERROR}08` }}>
                  <div className="flex gap-3 items-center">
                    <span className="h-12 w-12 flex items-center justify-center rounded-xl" style={{ background: ERROR }}><Cake size={20} className="text-white" /></span>
                    <div>
                      <p className="text-[#2A3547] text-sm font-semibold">Birthdays Today</p>
                      <p className="text-xs text-[#98A4AE]">3 students, 1 staff</p>
                    </div>
                  </div>
                  <h4 className="text-2xl font-bold" style={{ color: ERROR }}>4</h4>
                </div>
              </button>
            </Card>
          </div>
        )}
        {dashletVisibility['birthday'] && (
          <div className="lg:col-span-4 col-span-12">
            <Card className="!p-0 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
              <button onClick={() => setGalleryExpanded(!galleryExpanded)} className="w-full text-left">
                <div className="flex justify-between items-center p-6" style={{ background: `${PRIMARY}08` }}>
                  <div className="flex gap-3 items-center">
                    <span className="h-12 w-12 flex items-center justify-center rounded-xl" style={{ background: PRIMARY }}><Image size={20} className="text-white" /></span>
                    <div>
                      <p className="text-[#2A3547] text-sm font-semibold">Gallery</p>
                      <p className="text-xs text-[#98A4AE]">3 new albums this week</p>
                    </div>
                  </div>
                  <h4 className="text-2xl font-bold" style={{ color: PRIMARY }}>3</h4>
                </div>
              </button>
            </Card>
          </div>
        )}
        {dashletVisibility['infirmary'] && (
          <div className="lg:col-span-4 col-span-12">
            <Card className="!p-0 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
              <button onClick={() => setInfirmaryExpanded(!infirmaryExpanded)} className="w-full text-left">
                <div className="flex justify-between items-center p-6" style={{ background: `${ERROR}08` }}>
                  <div className="flex gap-3 items-center">
                    <span className="h-12 w-12 flex items-center justify-center rounded-xl" style={{ background: '#E91E63' }}><Heart size={20} className="text-white" /></span>
                    <div>
                      <p className="text-[#2A3547] text-sm font-semibold">Infirmary</p>
                      <p className="text-xs text-[#98A4AE]">4 visits · 12 allergy alerts</p>
                    </div>
                  </div>
                  <h4 className="text-2xl font-bold" style={{ color: '#E91E63' }}>4</h4>
                </div>
              </button>
            </Card>
          </div>
        )}
      </div>

      {/* Expanded sections */}
      {birthdayExpanded && dashletVisibility['birthday'] && (
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold text-[#2A3547]">Today&apos;s Birthdays</h5>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-xs font-semibold" style={{ background: SUCCESS }}><Send size={12} /> Send Wish to All</button>
          </div>
          <div className="space-y-2">
            {[
              { name: 'Aarav Singh', detail: 'Class 8A', type: 'student' },
              { name: 'Priya Patel', detail: 'Class 5B', type: 'student' },
              { name: 'Sneha Verma', detail: 'Class 3C', type: 'student' },
              { name: 'Mr. Rakesh Kumar', detail: 'Science Dept', type: 'staff' },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#F2F6FA]">
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: `${ERROR}1A` }}><Cake size={14} style={{ color: ERROR }} /></div>
                <div className="flex-1 min-w-0">
                  <button onClick={() => setMiniProfile({ name: b.name, class: b.type === 'student' ? b.detail : undefined, role: b.type === 'staff' ? b.detail : undefined })} className="text-sm font-semibold text-[#2A3547] hover:underline text-left truncate block">{b.name}</button>
                  <p className="text-xs text-[#98A4AE]">{b.detail}</p>
                </div>
                <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-white text-xs font-semibold shrink-0" style={{ background: SUCCESS }}><Send size={10} /> Wish</button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {galleryExpanded && dashletVisibility['birthday'] && (
        <Card>
          <h5 className="text-lg font-semibold text-[#2A3547] mb-4">Gallery Highlights</h5>
          <div className="grid grid-cols-3 gap-4">
            {[
              { title: 'Science Exhibition', bg: `${PRIMARY}15` },
              { title: 'Sports Day', bg: `${SUCCESS}15` },
              { title: 'Annual Function', bg: `#7C3AED15` },
            ].map((g, i) => (
              <div key={i} className="rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                <div className="h-24 flex items-center justify-center" style={{ background: g.bg }}><Image size={28} className="text-gray-300" /></div>
                <div className="p-3"><p className="text-sm font-semibold text-[#2A3547] truncate">{g.title}</p></div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {infirmaryExpanded && dashletVisibility['infirmary'] && (
        <Card>
          <h5 className="text-lg font-semibold text-[#2A3547] mb-3">Infirmary — Today&apos;s Visits</h5>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="rounded-xl p-4 text-center" style={{ background: `${ERROR}10` }}>
              <p className="text-xs text-[#98A4AE] mb-1">Visits Today</p>
              <p className="text-2xl font-bold text-[#2A3547]">4</p>
            </div>
            <div className="rounded-xl p-4 text-center" style={{ background: `${WARNING}10` }}>
              <p className="text-xs text-[#98A4AE] mb-1">Allergy Alerts</p>
              <p className="text-2xl font-bold" style={{ color: WARNING }}>12</p>
            </div>
          </div>
          <div className="space-y-1.5">
            {[
              { name: 'Rahul M.', reason: 'Headache', time: '10:30 AM', cls: '7A' },
              { name: 'Sneha K.', reason: 'Stomach ache', time: '11:15 AM', cls: '5B' },
              { name: 'Arjun P.', reason: 'Minor cut', time: '1:45 PM', cls: '9A' },
              { name: 'Meera D.', reason: 'Fever (100.2F)', time: '2:10 PM', cls: '4C' },
            ].map((v, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F2F6FA]">
                <Heart size={12} style={{ color: ERROR }} className="shrink-0" />
                <button onClick={() => setMiniProfile({ name: v.name, class: v.cls })} className="text-sm font-semibold text-[#2A3547] hover:underline">{v.name}</button>
                <span className="text-xs text-[#98A4AE]">— {v.reason}</span>
                <span className="text-xs text-[#98A4AE] ml-auto">{v.time}</span>
                <button title="Call Parent" className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: `${PRIMARY}1A` }}><Phone size={11} style={{ color: PRIMARY }} /></button>
                <button title="Doctor" className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: `${ERROR}1A` }}><Stethoscope size={11} style={{ color: ERROR }} /></button>
              </div>
            ))}
          </div>
        </Card>
      )}
      </DashletSection>

      {/* ═══════ CHRONIC ATTENDANCE + GRIEVANCES ═══════ */}
      <DashletSection id="chronic-attendance" label="Chronic Attendance">
      {!isPreschool && (
        <Card className="!border !border-red-200">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ background: `${ERROR}1A` }}><Shield size={18} style={{ color: ERROR }} /></span>
            <div>
              <h5 className="text-sm font-semibold text-red-700">Chronic Attendance Alert</h5>
              <p className="text-xs text-[#98A4AE]">3 students &gt;30 days absent — POCSO/Child Safety</p>
            </div>
            <span className="text-[10px] px-2.5 py-1 rounded-full font-semibold ml-auto" style={{ background: `${ERROR}20`, color: ERROR }}>Action Required</span>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full">
              <thead><tr className="border-b border-gray-100" style={{ background: `${ERROR}06` }}>
                {['Student', 'Class', 'Days', 'Parent Contacted', 'Counselor'].map(h => (
                  <th key={h} className="text-left py-2.5 px-3 text-sm font-normal text-[#98A4AE]">{h}</th>
                ))}
              </tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { name: 'Rohit Verma', cls: '7A', days: 34, contacted: 'Yes (Feb 20)', counselor: 'Assigned' },
                  { name: 'Meena Kumari', cls: '5C', days: 31, contacted: 'Yes (Feb 22)', counselor: 'Pending' },
                  { name: 'Ajay Thakur', cls: '9B', days: 38, contacted: 'No — unreachable', counselor: 'Assigned' },
                ].map((s, i) => (
                  <tr key={i}>
                    <td className="py-2.5 px-3 text-sm font-semibold text-[#2A3547]">{s.name}</td>
                    <td className="py-2.5 px-3 text-sm text-[#98A4AE]">{s.cls}</td>
                    <td className="py-2.5 px-3 text-sm font-bold" style={{ color: ERROR }}>{s.days}</td>
                    <td className="py-2.5 px-3 text-sm text-[#98A4AE]">{s.contacted}</td>
                    <td className="py-2.5 px-3"><span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: s.counselor === 'Assigned' ? `${SUCCESS}20` : `${WARNING}20`, color: s.counselor === 'Assigned' ? SUCCESS : WARNING }}>{s.counselor}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
      </DashletSection>

      <DashletSection id="grievances" label="Grievances">
      {!isPreschool && (
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-3 items-center">
              <span className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ background: `${PRIMARY}1A` }}><MessageSquare size={18} style={{ color: PRIMARY }} /></span>
              <h5 className="text-lg font-semibold text-[#2A3547]">Student Grievances</h5>
            </div>
            <button className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#F2F6FA] text-[#2A3547]">View All</button>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {[
              { label: 'Open', value: '2', color: WARNING },
              { label: 'Resolved', value: '15', color: SUCCESS },
              { label: 'Avg Resolution', value: '4 days', color: PRIMARY },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: `${s.color}10` }}>
                <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs text-[#98A4AE]">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {[
              { id: 'GR-042', subject: 'Bullying complaint — Class 7A', date: 'Feb 25', priority: 'High' },
              { id: 'GR-041', subject: 'Canteen food quality concern', date: 'Feb 23', priority: 'Medium' },
            ].map((g, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#F2F6FA]">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: g.priority === 'High' ? `${ERROR}1A` : `${WARNING}1A` }}>
                  <MessageSquare size={14} style={{ color: g.priority === 'High' ? ERROR : WARNING }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#2A3547] truncate">{g.id}: {g.subject}</p>
                  <p className="text-xs text-[#98A4AE]">{g.date}</p>
                </div>
                <span className="text-[10px] px-2.5 py-1 rounded-full font-semibold shrink-0" style={{ background: g.priority === 'High' ? `${ERROR}20` : `${WARNING}20`, color: g.priority === 'High' ? ERROR : WARNING }}>{g.priority}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
      </DashletSection>

      {/* ═══════ RTE QUOTA ═══════ */}
      <DashletSection id="rte-tracking" label="RTE Quota">
      {dashletVisibility['rteQuota'] && (
        <Card className="!p-0 overflow-hidden">
          <button onClick={() => setRteExpanded(!rteExpanded)} className="w-full flex items-center justify-between p-6 hover:bg-[#F2F6FA] transition-colors">
            <div className="flex items-center gap-3">
              <span className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ background: `${SUCCESS}1A` }}><ShieldCheck size={18} style={{ color: SUCCESS }} /></span>
              <h5 className="text-sm font-semibold text-[#2A3547]">RTE 25% Quota Tracking</h5>
              <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: `${SUCCESS}20`, color: SUCCESS }}>83% — On Track</span>
            </div>
            <ChevronDown size={16} className={`text-[#98A4AE] transition-transform ${rteExpanded ? 'rotate-180' : ''}`} />
          </button>
          {rteExpanded && (
            <div className="px-6 pb-6">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-[#98A4AE]">62 / 75 seats filled</span>
                  <span className="text-xs font-bold" style={{ color: SUCCESS }}>83%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: '83%', background: SUCCESS }} />
                </div>
              </div>
              <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full">
                  <thead><tr className="border-b border-gray-100">
                    {['Grade', 'Filled', 'Quota', 'Progress'].map(h => (
                      <th key={h} className="text-left py-2 px-3 text-sm font-normal text-[#98A4AE]">{h}</th>
                    ))}
                  </tr></thead>
                  <tbody className="divide-y divide-gray-100">
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
                        <tr key={i}>
                          <td className="py-2 px-3 text-sm font-semibold text-[#2A3547]">{r.grade}</td>
                          <td className="py-2 px-3 text-sm text-[#98A4AE]">{r.filled}</td>
                          <td className="py-2 px-3 text-sm text-[#98A4AE]">{r.quota}</td>
                          <td className="py-2 px-3 w-36">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: pct >= 80 ? SUCCESS : WARNING }} />
                              </div>
                              <span className="text-xs font-bold w-8 text-right" style={{ color: pct >= 80 ? SUCCESS : WARNING }}>{pct}%</span>
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
        </Card>
      )}
      </DashletSection>

      {/* ═══════ NEWS BOARD + TASKS ═══════ */}
      <DashletSection id="news-tasks" label="News & Tasks">
      <div className="grid grid-cols-12 gap-7">
        {/* News Board — DailyActivities timeline pattern */}
        <div className="lg:col-span-6 col-span-12">
          <Card className="h-full pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full animate-pulse" style={{ background: ERROR }} />
                <h5 className="text-lg font-semibold text-[#2A3547]">News Board</h5>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base px-3 py-1 rounded-lg bg-[#F2F6FA] text-[#2A3547] font-mono font-bold tracking-wider">
                  {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}
                </span>
                {!isPreschool && <span className="text-xs px-2 py-1 rounded-lg font-semibold" style={{ background: `${PRIMARY}15`, color: PRIMARY }}>Period 5/8</span>}
              </div>
            </div>

            <p className="text-xs font-bold uppercase text-[#98A4AE] mb-3 tracking-wider flex items-center gap-1"><Radio size={11} style={{ color: ERROR }} /> Going On Now</p>
            <div className="space-y-2 mb-4">
              {(isPreschool ? [
                { activity: 'Story Time — "The Hungry Caterpillar"', detail: 'Nursery A & B · Library Corner', color: '#7C3AED' },
                { activity: 'Art & Craft — Finger Painting', detail: 'LKG · Art Room · Ms. Kavita', color: PRIMARY },
                { activity: 'Outdoor Play — Sand Pit', detail: 'Playground · All groups', color: SUCCESS },
              ] : [
                { activity: 'Science Fair — Hall A', detail: 'Classes 6-8 · Judges evaluating', color: '#7C3AED' },
                { activity: 'Unit Test 3 — Mathematics', detail: 'Class 10-A, 10-B · Period 5', color: PRIMARY },
                { activity: 'Sports Practice — Cricket', detail: 'Ground · Inter-school team', color: SUCCESS },
                { activity: 'CBSE Inspector Visit', detail: 'Principal Office · Lab at 12:30', color: ERROR },
              ]).map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: `${item.color}08` }}>
                  <div className="w-8 h-8 rounded-lg bg-white/60 flex items-center justify-center shrink-0 relative">
                    <Sparkles size={14} style={{ color: item.color }} />
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full animate-pulse" style={{ background: ERROR }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#2A3547] truncate">{item.activity}</p>
                    <p className="text-xs text-[#98A4AE] truncate">{item.detail}</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-md text-white font-bold shrink-0" style={{ background: ERROR }}>LIVE</span>
                </div>
              ))}
            </div>

            <p className="text-xs font-bold uppercase text-[#98A4AE] mb-3 tracking-wider flex items-center gap-1"><Clock size={11} /> Upcoming</p>
            <div className="space-y-2">
              {(isPreschool ? [
                { activity: 'Lunch Time', detail: '12:00 PM · Dining Hall', time: '12:00', icon: Users },
                { activity: 'Nap Time', detail: '12:45 PM · All Rooms', time: '12:45', icon: Clock },
                { activity: 'Parent Pickup', detail: '3:00 PM · 56 children', time: '3:00', icon: UserCheck },
              ] : [
                { activity: 'Staff Meeting', detail: '3:00 PM · All HODs', time: '3:00', icon: Users },
                { activity: 'PTM — Class 9', detail: '4:00 PM · 42 parents', time: '4:00', icon: UserCheck },
                { activity: 'Annual Day Rehearsal', detail: '4:30 PM · Auditorium', time: '4:30', icon: Star },
              ]).map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#F2F6FA]">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
                    <item.icon size={14} className="text-[#98A4AE]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#2A3547] truncate">{item.activity}</p>
                    <p className="text-xs text-[#98A4AE] truncate">{item.detail}</p>
                  </div>
                  <span className="text-xs text-[#98A4AE] font-medium shrink-0">{item.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-6 col-span-12">
          <TaskTrackerPanel theme={theme} role="principal" />
        </div>

        <div className="col-span-12">
          <RecurringTasksCard theme={theme} role="principal" isPreschool={isPreschool} />
        </div>
      </div>
      </DashletSection>

      {/* ═══════ MODALS ═══════ */}
      {showGallery && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowGallery(false)}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#2A3547]">Browse Dashlets</h2>
              <button onClick={() => setShowGallery(false)} className="w-8 h-8 rounded-full bg-[#F2F6FA] flex items-center justify-center"><X size={16} className="text-[#2A3547]" /></button>
            </div>
            <p className="text-xs text-[#98A4AE] mb-4">Toggle dashlets on/off to customize your dashboard view.</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: 'birthday', name: 'Birthdays & Gallery', desc: 'Birthday wishes and photo gallery', icon: Cake, color: ERROR },
                { key: 'infirmary', name: 'Infirmary', desc: 'Health visits and allergy alerts', icon: Heart, color: '#E91E63' },
                { key: 'rteQuota', name: 'RTE Quota', desc: 'RTE 25% seat allocation tracking', icon: ShieldCheck, color: SUCCESS },
              ].map(d => (
                <div key={d.key} className="flex items-center gap-3 p-4 rounded-xl bg-[#F2F6FA]">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${d.color}1A` }}>
                    <d.icon size={18} style={{ color: d.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#2A3547]">{d.name}</p>
                    <p className="text-xs text-[#98A4AE] truncate">{d.desc}</p>
                  </div>
                  <button onClick={() => setDashletVisibility(prev => ({ ...prev, [d.key]: !prev[d.key] }))} className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all" style={{ background: dashletVisibility[d.key] ? `${SUCCESS}1A` : '#F2F6FA', color: dashletVisibility[d.key] ? SUCCESS : '#98A4AE' }}>
                    {dashletVisibility[d.key] ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showTour && <OnboardingTour theme={theme} onDismiss={() => setShowTour(false)} />}

      {miniProfile && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4" onClick={() => setMiniProfile(null)}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-80" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#2A3547]">Quick Profile</h3>
              <button onClick={() => setMiniProfile(null)} className="w-8 h-8 rounded-full bg-[#F2F6FA] flex items-center justify-center"><X size={14} className="text-[#2A3547]" /></button>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold mb-3 shadow-lg" style={{ background: `linear-gradient(135deg, ${PRIMARY}, #7C3AED)` }}>
                {miniProfile.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <p className="text-sm font-bold text-[#2A3547]">{miniProfile.name}</p>
              {miniProfile.class && <p className="text-xs text-[#98A4AE] mt-0.5">Class: {miniProfile.class}</p>}
              {miniProfile.role && <p className="text-xs text-[#98A4AE] mt-0.5">Role: {miniProfile.role}</p>}
              <div className="grid grid-cols-2 gap-3 mt-4 w-full">
                <div className="rounded-xl p-3 text-center" style={{ background: `${SUCCESS}10` }}>
                  <p className="text-xs text-[#98A4AE]">Attendance</p>
                  <p className="text-lg font-bold" style={{ color: SUCCESS }}>94%</p>
                </div>
                <div className="rounded-xl p-3 text-center" style={{ background: `${SUCCESS}10` }}>
                  <p className="text-xs text-[#98A4AE]">Fee Status</p>
                  <p className="text-lg font-bold" style={{ color: SUCCESS }}>Paid</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      </DraggableDashboard>

      {showMobilePreview && (
        <div className="w-[380px] shrink-0 sticky top-0 h-[calc(100vh-120px)] overflow-y-auto">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-[#98A4AE]">Mobile App Preview</p>
            <button onClick={() => setShowMobilePreview(false)} className="text-[#98A4AE] hover:text-[#2A3547]"><X size={14} /></button>
          </div>
          <PrincipalMobileApp theme={theme} alwaysShow />
        </div>
      )}
    </div>
  );
}
