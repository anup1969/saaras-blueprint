'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { type Theme } from '@/lib/themes';
import {
  Users, UserCheck, Clock, AlertTriangle, Bell, BarChart3, CheckCircle,
  Send, Calendar, GraduationCap, Briefcase, ChevronRight, Banknote,
  ClipboardCheck, Star, FileText, ShieldCheck, Award, User, Sparkles,
  Radio, Cake, Heart, Moon, Sun, Image, LayoutGrid, X, Eye, EyeOff,
  Phone, Stethoscope, ChevronDown, Shield, MessageSquare,
  HelpCircle, Smartphone, TrendingUp, TrendingDown, ArrowUpRight,
  ListTodo, RefreshCw, Circle, Check, UserPlus, CreditCard, Bus,
} from 'lucide-react';
import { DraggableDashboard, DashletSection } from '@/components/DraggableDashboard';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// ─── MatDash Theme Colors ──────────────────────────────────
const PRIMARY = '#5D87FF';
const SECONDARY = '#49BEFF';
const SUCCESS = '#2EA95C';
const WARNING = '#FFAE1F';
const ERROR = '#FA896B';

// ─── CardBox (shadow-md, p-6, rounded-xl) ──
function Card({ children, className = '', style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`bg-white rounded-xl shadow-md p-6 ${className}`} style={style}>
      {children}
    </div>
  );
}

export default function DashboardHomeNew({ theme, onProfileClick, onNavigate }: { theme: Theme; onProfileClick: () => void; onNavigate?: (id: string) => void }) {
  const [showFeeDrillDown, setShowFeeDrillDown] = useState(false);
  const [showApprovalsDrillDown, setShowApprovalsDrillDown] = useState(false);
  const [showCollectionDrillDown, setShowCollectionDrillDown] = useState(false);
  const [showEnquiryDrillDown, setShowEnquiryDrillDown] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);
  const [showGallery, setShowGallery] = useState(false);
  const [dashletVisibility, setDashletVisibility] = useState<Record<string, boolean>>({
    'birthday': true, 'visitors': true, 'transport': true,
  });
  const [birthdayExpanded, setBirthdayExpanded] = useState(false);
  const [visitorsExpanded, setVisitorsExpanded] = useState(false);
  const [transportExpanded, setTransportExpanded] = useState(false);
  const [dataMasked, setDataMasked] = useState(false);
  const [taskFilter, setTaskFilter] = useState<'all' | 'my' | 'delegated'>('all');
  const [recurringDone, setRecurringDone] = useState<Record<number, boolean>>({ 0: true, 2: true });

  // ─── ApexCharts configs ─────────────────────────────────

  // Fee collection area chart
  const feeChartOpts: ApexCharts.ApexOptions = {
    chart: { type: 'area', height: 310, toolbar: { show: false }, fontFamily: 'inherit', foreColor: '#adb0bb' },
    series: [
      { name: 'Collected', data: [8.2, 7.4, 9.1, 6.8, 8.4, 9.6, 7.2, 8.8, 7.9, 9.2, 6.4, 2.8] },
      { name: 'Outstanding', data: [1.8, 2.6, 0.9, 3.2, 1.6, 0.4, 2.8, 1.2, 2.1, 0.8, 3.6, 7.2] },
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

  // Attendance semi-donut
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

  // Sparkline
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
    <DraggableDashboard dashboardId="school-admin" theme={theme} className="w-full space-y-7">

      {/* ═══════ WELCOME BOX ═══════ */}
      <DashletSection id="welcome" label="Welcome">
      <div className="grid grid-cols-12 gap-7">
        {/* Welcome Card */}
        <div className="lg:col-span-6 col-span-12">
          <div className="bg-[#5D87FF] rounded-xl shadow-md p-6 h-full">
            <div className="grid grid-cols-12">
              <div className="col-span-7">
                <div className="flex gap-4 items-center">
                  <div className="h-12 w-12 rounded-xl bg-white/90 flex items-center justify-center shrink-0">
                    <Shield size={22} className="text-[#5D87FF]" />
                  </div>
                  <h5 className="text-xl text-white font-semibold">
                    Welcome, School Admin
                  </h5>
                </div>
                <div className="flex w-full mt-8">
                  <div className="border-r border-white/20 pr-5">
                    <p className="text-white/75 text-sm mb-1">Students</p>
                    <h2 className="text-white text-2xl font-bold">{dataMasked ? '***' : '1,247'}</h2>
                  </div>
                  <div className="border-r border-white/20 px-5">
                    <p className="text-white/75 text-sm mb-1">Staff</p>
                    <h2 className="text-white text-2xl font-bold">{dataMasked ? '***' : '86'}</h2>
                  </div>
                  <div className="pl-5">
                    <p className="text-white/75 text-sm mb-1">Visitors</p>
                    <h2 className="text-white text-2xl font-bold">{dataMasked ? '***' : '3'}</h2>
                  </div>
                </div>
              </div>
              <div className="col-span-5 flex items-end justify-end">
                <div className="w-32 h-32 rounded-full bg-white/10 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-white/15 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                      <Briefcase size={28} className="text-white/80" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fee Collection Chart */}
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
            { action: () => setDataMasked(!dataMasked), icon: dataMasked ? EyeOff : Eye, title: 'Mask' },
            { action: () => setShowGallery(true), icon: LayoutGrid, title: 'Dashlets' },
            { action: () => setDarkMode(!darkMode), icon: darkMode ? Sun : Moon, title: 'Theme' },
          ].map((btn, i) => (
            <button key={i} onClick={btn.action} title={btn.title}
              className="w-9 h-9 rounded-xl bg-[#F2F6FA] flex items-center justify-center hover:bg-[#E8ECEF] transition-colors">
              <btn.icon size={16} className="text-[#2A3547]" />
            </button>
          ))}
          <button title="Notifications" className="relative w-9 h-9 rounded-xl bg-[#F2F6FA] flex items-center justify-center hover:bg-[#E8ECEF] transition-colors">
            <Bell size={16} className="text-[#2A3547]" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white" style={{ background: ERROR }}>5</span>
          </button>
          <button onClick={onProfileClick} className="w-9 h-9 rounded-full bg-[#5D87FF] text-white flex items-center justify-center hover:opacity-90">
            <User size={16} />
          </button>
        </div>
      </div>

      {/* ═══════ ALERTS ═══════ */}
      <DashletSection id="alerts" label="Alerts">
      <div className="space-y-2">
        {!dismissedAlerts.includes('fee-deadline') && (
          <div className="rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm" style={{ background: `${WARNING}15`, borderLeft: `4px solid ${WARNING}` }}>
            <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${WARNING}25` }}>
              <AlertTriangle size={16} style={{ color: WARNING }} />
            </div>
            <p className="text-sm font-medium text-[#2A3547] flex-1">Fee Deadline — Class 8: 12 students with pending dues by 5:00 PM today</p>
            <button onClick={() => onNavigate?.('fees')} className="px-3 py-1.5 rounded-lg text-white text-xs font-semibold" style={{ background: WARNING }}>View</button>
            <button onClick={() => setDismissedAlerts(p => [...p, 'fee-deadline'])} className="text-[#98A4AE] hover:text-[#2A3547]"><X size={14} /></button>
          </div>
        )}
        {!dismissedAlerts.includes('approval-backlog') && (
          <div className="rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm" style={{ background: `${ERROR}12`, borderLeft: `4px solid ${ERROR}` }}>
            <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${ERROR}20` }}>
              <AlertTriangle size={16} style={{ color: ERROR }} />
            </div>
            <p className="text-sm font-medium text-[#2A3547] flex-1">8 pending approvals — 3 leave requests, 2 fee concessions, 1 TC, 2 budget approvals</p>
            <button onClick={() => setDismissedAlerts(p => [...p, 'approval-backlog'])} className="text-[#98A4AE] hover:text-[#2A3547]"><X size={14} /></button>
          </div>
        )}
        {!dismissedAlerts.includes('inspector-visit') && (
          <div className="rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm" style={{ background: `${SECONDARY}12`, borderLeft: `4px solid ${SECONDARY}` }}>
            <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${SECONDARY}20` }}>
              <ShieldCheck size={16} style={{ color: SECONDARY }} />
            </div>
            <p className="text-sm font-medium text-[#2A3547] flex-1">CBSE Inspector Visit today — Lab inspection at 12:30 PM</p>
            <button onClick={() => setDismissedAlerts(p => [...p, 'inspector-visit'])} className="text-[#98A4AE] hover:text-[#2A3547]"><X size={14} /></button>
          </div>
        )}
      </div>
      </DashletSection>

      {/* ═══════ COLOR BOXES — Stat Cards ═══════ */}
      <DashletSection id="stats-actions" label="Stats & Actions">
      <Card className="!p-5">
        <div className="flex gap-7 overflow-x-auto">
          {[
            { icon: Users, title: 'Total Students', value: dataMasked ? '***' : '1,247', gradient: `linear-gradient(180deg, ${PRIMARY}1F 0%, ${PRIMARY}08 100%)`, color: PRIMARY, trend: '+24 this term', up: true, onClick: () => onNavigate?.('students') },
            { icon: Banknote, title: 'Fee Collected', value: dataMasked ? '₹ ****' : '₹45.2L', gradient: `linear-gradient(180deg, ${SUCCESS}1F 0%, ${SUCCESS}08 100%)`, color: SUCCESS, trend: '72%', up: true, onClick: () => setShowFeeDrillDown(!showFeeDrillDown) },
            { icon: CheckCircle, title: 'Pending Approvals', value: '8', gradient: `linear-gradient(180deg, ${WARNING}1F 0%, ${WARNING}08 100%)`, color: WARNING, trend: '3 urgent', up: false, onClick: () => setShowApprovalsDrillDown(!showApprovalsDrillDown) },
            { icon: UserPlus, title: 'New Enquiries', value: dataMasked ? '***' : '12', gradient: `linear-gradient(180deg, ${SECONDARY}1F 0%, ${SECONDARY}08 100%)`, color: SECONDARY, trend: '+5 this week', up: true, onClick: () => setShowEnquiryDrillDown(!showEnquiryDrillDown) },
            { icon: CreditCard, title: 'Today\'s Collection', value: dataMasked ? '₹ ****' : '₹2.45L', gradient: `linear-gradient(180deg, #7C3AED1F 0%, #7C3AED08 100%)`, color: '#7C3AED', onClick: () => setShowCollectionDrillDown(!showCollectionDrillDown) },
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

      {/* ═══════ ATTENDANCE ROW — Semi Donut + Sparklines ═══════ */}
      <DashletSection id="attendance" label="Attendance">
      <div className="grid grid-cols-12 gap-7">
        {/* Student Attendance */}
        <div className="lg:col-span-5 col-span-12">
          <Card>
            <button onClick={() => onNavigate?.('attendance')} className="w-full text-left">
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="text-lg font-semibold text-[#2A3547]">Student Attendance</h5>
                  <p className="text-sm text-[#98A4AE]">Today&apos;s overview — 94.2%</p>
                </div>
                <ChevronRight size={16} className="text-[#98A4AE]" />
              </div>
              <div className="grid grid-cols-12 mt-4">
                <div className="col-span-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-3 items-center">
                      <span className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl" style={{ background: `${SUCCESS}1A` }}>
                        <UserCheck size={18} style={{ color: SUCCESS }} />
                      </span>
                      <div>
                        <h5 className="text-sm font-semibold text-[#2A3547]">{dataMasked ? '***' : '1,175'} present</h5>
                        <p className="text-xs text-[#98A4AE]">of {dataMasked ? '***' : '1,247'}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <span className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl" style={{ background: `${ERROR}1A` }}>
                        <X size={18} style={{ color: ERROR }} />
                      </span>
                      <div>
                        <h5 className="text-sm font-semibold text-[#2A3547]">{dataMasked ? '***' : '72'} absent</h5>
                        <p className="text-xs text-[#98A4AE]">5.8% rate</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <span className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl" style={{ background: `${WARNING}1A` }}>
                        <Clock size={18} style={{ color: WARNING }} />
                      </span>
                      <div>
                        <h5 className="text-sm font-semibold text-[#2A3547]">{dataMasked ? '***' : '18'} late</h5>
                        <p className="text-xs text-[#98A4AE]">After 8:15 AM</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-6 -mt-4">
                  <Chart options={attendanceSemiDonut(1175, 1247, [SUCCESS, ERROR])} series={[1175, 72]} type="donut" height="180px" width="100%" />
                </div>
              </div>
            </button>
          </Card>
        </div>

        {/* Staff Attendance — Sparkline card */}
        <div className="lg:col-span-4 col-span-12">
          <Card className="!p-0 overflow-hidden h-full">
            <button onClick={() => onNavigate?.('staff')} className="w-full text-left">
              <div className="flex justify-between p-6 pb-3" style={{ background: `${PRIMARY}12` }}>
                <div>
                  <p className="text-[#2A3547] text-sm font-semibold">Staff Present</p>
                  <div className="flex gap-3 items-baseline mt-1">
                    <h5 className="text-2xl font-bold text-[#2A3547]">{dataMasked ? '***' : '79'}<span className="text-sm font-normal text-[#98A4AE]"> / 86</span></h5>
                    <span className="text-xs font-semibold" style={{ color: SUCCESS }}>92%</span>
                  </div>
                </div>
                <span className="h-10 w-10 shrink-0 flex items-center justify-center bg-white rounded-xl shadow-sm">
                  <Briefcase size={18} style={{ color: PRIMARY }} />
                </span>
              </div>
              <Chart options={sparkline([72, 76, 74, 79, 78, 79], PRIMARY, 80)} series={[{ data: [72, 76, 74, 79, 78, 79] }]} type="area" height="80px" width="100%" />
            </button>
          </Card>
        </div>

        {/* Profile Completeness — Circular */}
        <div className="lg:col-span-3 col-span-12">
          <Card className="h-full">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="relative w-24 h-24 mb-3">
                <svg viewBox="0 0 36 36" className="w-full h-full">
                  <circle r="16" cx="18" cy="18" fill="none" stroke="#e5e7eb" strokeWidth="2.5" />
                  <circle r="16" cx="18" cy="18" fill="none" stroke={SUCCESS} strokeWidth="2.5"
                    strokeDasharray={`${78/100 * 100.53} ${100.53 - 78/100 * 100.53}`}
                    strokeDashoffset="25.13" transform="rotate(-90 18 18)" strokeLinecap="round" />
                  <text x="18" y="19" textAnchor="middle" dominantBaseline="middle" fill={SUCCESS} style={{ fontSize: '8px', fontWeight: 700 }}>78%</text>
                </svg>
              </div>
              <p className="text-sm font-semibold text-[#2A3547]">Profile Score</p>
              <p className="text-xs text-[#98A4AE] text-center mt-1">Missing: Emergency contact, Blood group, Photo</p>
              <button className="text-xs font-semibold mt-2 flex items-center gap-1" style={{ color: PRIMARY }}>
                Complete <ArrowUpRight size={12} />
              </button>
            </div>
          </Card>
        </div>
      </div>
      </DashletSection>

      {/* ═══════ FEE OVERVIEW + QUICK ACTIONS ═══════ */}
      <DashletSection id="fees-actions" label="Fees & Quick Actions">
      <div className="grid grid-cols-12 gap-7">
        {/* Fee Overview */}
        <div className="lg:col-span-7 col-span-12">
          <Card className="h-full">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-3 items-center">
                <span className="h-12 w-12 flex items-center justify-center rounded-xl" style={{ background: `${SUCCESS}1A` }}>
                  <Banknote size={22} style={{ color: SUCCESS }} />
                </span>
                <div>
                  <h5 className="text-lg font-semibold text-[#2A3547]">Fees Overview</h5>
                  <p className="text-sm text-[#98A4AE]">Current financial year</p>
                </div>
              </div>
              <button onClick={() => onNavigate?.('fees')} className="text-xs font-semibold flex items-center gap-1" style={{ color: PRIMARY }}>
                Details <ArrowUpRight size={12} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-xl p-4 text-center" style={{ background: `${SUCCESS}10` }}>
                <p className="text-xs text-[#98A4AE] mb-1">Today&apos;s Collection</p>
                <p className="text-xl font-bold" style={{ color: SUCCESS }}>{dataMasked ? '₹ ****' : '₹2,45,000'}</p>
                <p className="text-xs mt-1 font-semibold" style={{ color: SUCCESS }}>47 receipts</p>
              </div>
              <div className="rounded-xl p-4 text-center" style={{ background: `${PRIMARY}10` }}>
                <p className="text-xs text-[#98A4AE] mb-1">Total Collected (FY)</p>
                <p className="text-xl font-bold" style={{ color: PRIMARY }}>{dataMasked ? '₹ ****' : '₹45.2L'}</p>
                <p className="text-xs mt-1 font-semibold" style={{ color: SUCCESS }}>72% of target</p>
              </div>
              <div className="rounded-xl p-4 text-center" style={{ background: `${ERROR}10` }}>
                <p className="text-xs text-[#98A4AE] mb-1">Outstanding</p>
                <p className="text-xl font-bold" style={{ color: ERROR }}>{dataMasked ? '₹ ****' : '₹18.5L'}</p>
                <p className="text-xs mt-1 font-semibold" style={{ color: ERROR }}>45 defaulters</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {[
                { label: 'Cash', value: '₹78K', pct: 32, color: SUCCESS },
                { label: 'Online/UPI', value: '₹1.42L', pct: 58, color: PRIMARY },
                { label: 'Cheque', value: '₹25K', pct: 10, color: '#7C3AED' },
              ].map(m => (
                <div key={m.label} className="rounded-xl p-3" style={{ background: `${m.color}08` }}>
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-xs text-[#98A4AE]">{m.label}</p>
                    <span className="text-xs font-bold" style={{ color: m.color }}>{m.pct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full">
                    <div className="h-full rounded-full" style={{ width: `${m.pct}%`, background: m.color }} />
                  </div>
                  <p className="text-sm font-bold mt-1.5" style={{ color: m.color }}>{m.value}</p>
                </div>
              ))}
              <div className="rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-all" style={{ background: `${WARNING}08` }} onClick={() => onNavigate?.('fees')}>
                <Banknote size={18} style={{ color: WARNING }} />
                <p className="text-xs font-semibold text-[#2A3547] mt-1">Record</p>
                <p className="text-xs font-semibold text-[#2A3547]">Payment</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-5 col-span-12">
          <Card className="h-full">
            <div className="flex justify-between items-center mb-4">
              <h5 className="text-lg font-semibold text-[#2A3547]">Quick Actions</h5>
              <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: `${PRIMARY}20`, color: PRIMARY }}>6 shortcuts</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Add Student', icon: UserPlus, color: PRIMARY, nav: 'students' },
                { label: 'Record Payment', icon: CreditCard, color: SUCCESS, nav: 'fees' },
                { label: 'Send Circular', icon: Send, color: '#7C3AED', nav: 'communicate' },
                { label: 'View Reports', icon: BarChart3, color: WARNING, nav: 'reports' },
                { label: 'Mark Attendance', icon: ClipboardCheck, color: SECONDARY, nav: 'attendance' },
                { label: 'Approve Requests', icon: CheckCircle, color: ERROR, nav: 'approvals' },
              ].map(a => (
                <button key={a.label} onClick={() => onNavigate?.(a.nav)} className="flex items-center gap-3 p-3.5 rounded-xl bg-[#F2F6FA] hover:shadow-md transition-all text-left">
                  <span className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 text-white" style={{ background: a.color }}>
                    <a.icon size={18} />
                  </span>
                  <span className="text-sm font-semibold text-[#2A3547]">{a.label}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
      </DashletSection>

      {/* ═══════ ENQUIRY + APPROVALS ═══════ */}
      <DashletSection id="enquiry-approvals" label="Enquiry & Approvals">
      <div className="grid grid-cols-12 gap-7">
        {/* Enquiry Pipeline */}
        <div className="lg:col-span-5 col-span-12">
          <Card className="h-full">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h5 className="text-lg font-semibold text-[#2A3547]">Enquiry Pipeline</h5>
                <p className="text-sm text-[#98A4AE]">12 active this month</p>
              </div>
              <button onClick={() => onNavigate?.('enquiries')} className="text-xs font-semibold flex items-center gap-1" style={{ color: PRIMARY }}>
                Details <ArrowUpRight size={12} />
              </button>
            </div>
            <Chart options={enquiryBarOpts} series={[{ data: [5, 3, 2, 1, 1] }]} type="bar" height="180px" />
            <div className="mt-2 px-3 py-2 rounded-xl text-center" style={{ background: `${PRIMARY}12` }}>
              <p className="text-xs font-semibold" style={{ color: PRIMARY }}>38 seats available across all grades</p>
            </div>
          </Card>
        </div>

        {/* Pending Approvals timeline */}
        <div className="lg:col-span-7 col-span-12">
          <Card className="pb-4 h-full">
            <div className="flex justify-between items-center mb-4">
              <h5 className="text-lg font-semibold text-[#2A3547]">Pending Approvals</h5>
              <button onClick={() => onNavigate?.('approvals')} className="text-xs font-semibold flex items-center gap-1" style={{ color: PRIMARY }}>View All <ArrowUpRight size={12} /></button>
            </div>
            <div>
              {[
                { time: '9:15', text: 'Mr. Suresh Patel — Casual Leave 2 days (Mar 10–11)', color: PRIMARY, urgent: true },
                { time: '9:45', text: 'Meera Joshi (5A) — Fee concession ₹8,000 (40%)', color: WARNING, urgent: false },
                { time: '10:30', text: 'Rahul Singh (9B) — Transfer Certificate, relocating', color: '#7C3AED', urgent: false },
                { time: '11:00', text: 'Sports Dept — Inter-school tournament budget ₹32,000', color: SECONDARY, urgent: false },
                { time: '11:30', text: 'Ms. Kavita Sharma — Sick Leave 3 days', color: ERROR, urgent: true },
                { time: '2:00', text: 'Library — New book purchase request ₹15,000', color: SUCCESS, urgent: false },
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

      {/* ═══════ DRILL-DOWN PANELS ═══════ */}
      {showEnquiryDrillDown && (
        <Card className="!border-2" style={{ borderColor: `${PRIMARY}40` }}>
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold text-[#2A3547]">Enquiry Pipeline — This Month</h5>
            <button onClick={() => setShowEnquiryDrillDown(false)} className="px-3 py-1 rounded-lg bg-[#F2F6FA] text-[#2A3547] text-xs font-semibold">Close</button>
          </div>
          <div className="grid grid-cols-5 gap-3 mb-4">
            {[
              { stage: 'New', count: 5, color: PRIMARY, sub: '3 walk-in, 2 online' },
              { stage: 'Follow-up', count: 3, color: WARNING, sub: 'Call scheduled' },
              { stage: 'Test', count: 2, color: '#7C3AED', sub: 'Mar 12 & 14' },
              { stage: 'Converted', count: 1, color: SUCCESS, sub: 'Fee paid' },
              { stage: 'Lost', count: 1, color: ERROR, sub: 'Chose other school' },
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
                  { child: 'Aditya Verma', cls: 'KG-1', parent: 'Ramesh Verma', source: 'Walk-in', stage: 'New', date: 'Today', sc: PRIMARY },
                  { child: 'Neha Gupta', cls: '3rd', parent: 'Sunil Gupta', source: 'Online', stage: 'Follow-up', date: 'Yesterday', sc: WARNING },
                  { child: 'Karan Patel', cls: '6th', parent: 'Deepak Patel', source: 'Referral', stage: 'Converted', date: 'Mar 5', sc: SUCCESS },
                  { child: 'Priya Iyer', cls: '1st', parent: 'Sanjay Iyer', source: 'Online', stage: 'Test', date: 'Mar 12', sc: '#7C3AED' },
                  { child: 'Rohan Sharma', cls: '8th', parent: 'Vivek Sharma', source: 'Walk-in', stage: 'Lost', date: 'Mar 2', sc: ERROR },
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
              { label: 'Total Collected', value: dataMasked ? '₹ ****' : '₹45.2L', color: SUCCESS },
              { label: 'Outstanding', value: dataMasked ? '₹ ****' : '₹18.5L', color: ERROR },
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
                  { cls: 'Class I', due: '₹1,80,000', collected: '₹1,62,000', outstanding: '₹18,000', pct: 90 },
                  { cls: 'Class II', due: '₹2,10,000', collected: '₹1,68,000', outstanding: '₹42,000', pct: 80 },
                  { cls: 'Class III', due: '₹1,95,000', collected: '₹1,72,000', outstanding: '₹23,000', pct: 88 },
                  { cls: 'Class V', due: '₹2,40,000', collected: '₹2,04,000', outstanding: '₹36,000', pct: 85 },
                  { cls: 'Class VIII', due: '₹3,00,000', collected: '₹2,10,000', outstanding: '₹90,000', pct: 70 },
                  { cls: 'Class X', due: '₹3,50,000', collected: '₹3,22,000', outstanding: '₹28,000', pct: 92 },
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
                  { receipt: 'R-3201', student: 'Arjun Mehta', cls: '7A', amount: '₹12,500', mode: 'UPI', time: '10:45 AM', mc: PRIMARY },
                  { receipt: 'R-3200', student: 'Sneha Rao', cls: '4B', amount: '₹8,000', mode: 'Cash', time: '10:30 AM', mc: SUCCESS },
                  { receipt: 'R-3199', student: 'Vikram Joshi', cls: '2C', amount: '₹15,000', mode: 'Online', time: '10:15 AM', mc: PRIMARY },
                  { receipt: 'R-3198', student: 'Kavita Verma', cls: '6A', amount: '₹25,000', mode: 'Cheque', time: '9:45 AM', mc: '#7C3AED' },
                  { receipt: 'R-3197', student: 'Rohit Kumar', cls: '9B', amount: '₹18,500', mode: 'UPI', time: '9:30 AM', mc: PRIMARY },
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
              { label: 'Budget', value: '2', color: SECONDARY },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: `${s.color}10` }}>
                <p className="text-xs text-[#98A4AE] mb-1">{s.label}</p>
                <p className="text-lg font-bold" style={{ color: s.color }}>{s.value}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {[
              { type: 'L', from: 'Mr. Suresh Patel', detail: 'Casual Leave — 2 days (Mar 10–11)', date: 'Today', priority: 'Urgent', color: PRIMARY },
              { type: 'L', from: 'Ms. Kavita Sharma', detail: 'Sick Leave — 3 days', date: 'Today', priority: 'Urgent', color: PRIMARY },
              { type: 'F', from: 'Meera Joshi (5A)', detail: 'Fee concession — ₹8,000 (40%)', date: 'Yesterday', priority: '', color: WARNING },
              { type: 'T', from: 'Rahul Singh (9B)', detail: 'Transfer Certificate — relocating', date: '2d ago', priority: '', color: '#7C3AED' },
              { type: 'B', from: 'Sports Dept', detail: 'Tournament budget — ₹32,000', date: '2d ago', priority: '', color: SECONDARY },
              { type: 'B', from: 'Library', detail: 'Book purchase — ₹15,000', date: '3d ago', priority: '', color: SECONDARY },
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

      {/* ═══════ COMPACT DASHLETS — Visitors / Birthday / Transport ═══════ */}
      <DashletSection id="compact-dashlets" label="Quick Dashlets">
      <div className="grid grid-cols-12 gap-7">
        {dashletVisibility['visitors'] && (
          <div className="lg:col-span-4 col-span-12">
            <Card className="!p-0 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
              <button onClick={() => setVisitorsExpanded(!visitorsExpanded)} className="w-full text-left">
                <div className="flex justify-between items-center p-6" style={{ background: `${SECONDARY}08` }}>
                  <div className="flex gap-3 items-center">
                    <span className="h-12 w-12 flex items-center justify-center rounded-xl" style={{ background: SECONDARY }}><Shield size={20} className="text-white" /></span>
                    <div>
                      <p className="text-[#2A3547] text-sm font-semibold">Active Visitors</p>
                      <p className="text-xs text-[#98A4AE]">2 checked-in, 1 checked-out</p>
                    </div>
                  </div>
                  <h4 className="text-2xl font-bold" style={{ color: SECONDARY }}>3</h4>
                </div>
              </button>
            </Card>
          </div>
        )}
        {dashletVisibility['birthday'] && (
          <div className="lg:col-span-4 col-span-12">
            <Card className="!p-0 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
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
        {dashletVisibility['transport'] && (
          <div className="lg:col-span-4 col-span-12">
            <Card className="!p-0 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
              <button onClick={() => setTransportExpanded(!transportExpanded)} className="w-full text-left">
                <div className="flex justify-between items-center p-6" style={{ background: `${SUCCESS}08` }}>
                  <div className="flex gap-3 items-center">
                    <span className="h-12 w-12 flex items-center justify-center rounded-xl" style={{ background: SUCCESS }}><Bus size={20} className="text-white" /></span>
                    <div>
                      <p className="text-[#2A3547] text-sm font-semibold">Transport</p>
                      <p className="text-xs text-[#98A4AE]">8 routes · 12 buses active</p>
                    </div>
                  </div>
                  <h4 className="text-2xl font-bold" style={{ color: SUCCESS }}>12</h4>
                </div>
              </button>
            </Card>
          </div>
        )}
      </div>

      {/* Expanded sections */}
      {visitorsExpanded && dashletVisibility['visitors'] && (
        <Card className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold text-[#2A3547]">Visitor Log — Today</h5>
            <button onClick={() => onNavigate?.('visitors')} className="text-xs font-semibold flex items-center gap-1" style={{ color: PRIMARY }}>Full Log <ArrowUpRight size={12} /></button>
          </div>
          <div className="space-y-2">
            {[
              { name: 'Mr. Amit Gupta', purpose: 'Parent meeting — Class Teacher', time: '10:15 AM', status: 'In', color: SUCCESS },
              { name: 'Ms. Ritu Patel', purpose: 'Book delivery — Library', time: '11:00 AM', status: 'In', color: SUCCESS },
              { name: 'Mr. Rajesh Tiwari', purpose: 'Equipment maintenance', time: '9:30 AM', status: 'Out', color: '#98A4AE' },
            ].map((v, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#F2F6FA]">
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: `${v.color}1A` }}>
                  <User size={14} style={{ color: v.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#2A3547] truncate">{v.name}</p>
                  <p className="text-xs text-[#98A4AE] truncate">{v.purpose}</p>
                </div>
                <span className="text-xs text-[#98A4AE] shrink-0">{v.time}</span>
                <span className="text-[10px] px-2.5 py-1 rounded-full font-semibold shrink-0" style={{ background: v.status === 'In' ? `${SUCCESS}20` : '#F2F6FA', color: v.status === 'In' ? SUCCESS : '#98A4AE' }}>{v.status}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {birthdayExpanded && dashletVisibility['birthday'] && (
        <Card className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold text-[#2A3547]">Today&apos;s Birthdays</h5>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-xs font-semibold" style={{ background: SUCCESS }}><Send size={12} /> Send Wish to All</button>
          </div>
          <div className="space-y-2">
            {[
              { name: 'Ananya Singh', detail: 'Class 4A', type: 'student' },
              { name: 'Priya Patel', detail: 'Class 7B', type: 'student' },
              { name: 'Karan Joshi', detail: 'Class 2C', type: 'student' },
              { name: 'Mr. Suresh Kumar', detail: 'Mathematics Dept', type: 'staff' },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#F2F6FA]">
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: `${ERROR}1A` }}><Cake size={14} style={{ color: ERROR }} /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#2A3547] truncate">{b.name}</p>
                  <p className="text-xs text-[#98A4AE]">{b.detail}</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: b.type === 'staff' ? `${PRIMARY}20` : `${SECONDARY}20`, color: b.type === 'staff' ? PRIMARY : SECONDARY }}>{b.type}</span>
                <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-white text-xs font-semibold shrink-0" style={{ background: SUCCESS }}><Send size={10} /> Wish</button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {transportExpanded && dashletVisibility['transport'] && (
        <Card className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold text-[#2A3547]">Transport Status</h5>
            <button onClick={() => onNavigate?.('transport')} className="text-xs font-semibold flex items-center gap-1" style={{ color: PRIMARY }}>Full Details <ArrowUpRight size={12} /></button>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="rounded-xl p-3 text-center" style={{ background: `${SUCCESS}10` }}>
              <p className="text-2xl font-bold" style={{ color: SUCCESS }}>10</p>
              <p className="text-xs text-[#98A4AE]">On Route</p>
            </div>
            <div className="rounded-xl p-3 text-center" style={{ background: `${WARNING}10` }}>
              <p className="text-2xl font-bold" style={{ color: WARNING }}>1</p>
              <p className="text-xs text-[#98A4AE]">Delayed</p>
            </div>
            <div className="rounded-xl p-3 text-center" style={{ background: `${ERROR}10` }}>
              <p className="text-2xl font-bold" style={{ color: ERROR }}>1</p>
              <p className="text-xs text-[#98A4AE]">Breakdown</p>
            </div>
          </div>
          <div className="space-y-1.5">
            {[
              { route: 'Route A', bus: 'GJ-01-AB-1234', driver: 'Ramesh', status: 'On Time', eta: '8:05 AM', color: SUCCESS },
              { route: 'Route E', bus: 'GJ-01-CD-5678', driver: 'Suresh', status: 'Delayed 10m', eta: '8:25 AM', color: WARNING },
              { route: 'Route F', bus: 'GJ-01-EF-9012', driver: 'Mukesh', status: 'Breakdown', eta: 'N/A', color: ERROR },
            ].map((r, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F2F6FA]">
                <Bus size={12} style={{ color: r.color }} className="shrink-0" />
                <span className="text-sm font-semibold text-[#2A3547]">{r.route}</span>
                <span className="text-xs text-[#98A4AE]">— {r.bus}</span>
                <span className="text-xs text-[#98A4AE] ml-auto">{r.driver}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: `${r.color}20`, color: r.color }}>{r.status}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
      </DashletSection>

      {/* ═══════ NEWS BOARD + TASKS ═══════ */}
      <DashletSection id="news-tasks" label="News & Tasks">
      <div className="grid grid-cols-12 gap-7">
        {/* News Board */}
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
                <span className="text-xs px-2 py-1 rounded-lg font-semibold" style={{ background: `${PRIMARY}15`, color: PRIMARY }}>Period 5/8</span>
              </div>
            </div>

            <p className="text-xs font-bold uppercase text-[#98A4AE] mb-3 tracking-wider flex items-center gap-1"><Radio size={11} style={{ color: ERROR }} /> Going On Now</p>
            <div className="space-y-2 mb-4">
              {[
                { activity: 'Fee Collection Drive — Counter 1 & 2', detail: '47 payments processed · ₹2.1L collected today', color: SUCCESS },
                { activity: 'Unit Test 3 — Mathematics', detail: 'Class 10-A, 10-B · Period 5 (11:30-12:15)', color: PRIMARY },
                { activity: 'Visitor — Mr. Amit Gupta', detail: 'Reception · Parent meeting with Class Teacher', color: '#7C3AED' },
                { activity: 'CBSE Inspector Visit', detail: 'Principal Office · Lab inspection at 12:30', color: ERROR },
              ].map((item, i) => (
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
              {[
                { activity: 'Staff Meeting', detail: '3:00 PM · Conference Room · All HODs', time: '3:00', icon: Users },
                { activity: 'Fee Deadline — Class 8', detail: '5:00 PM · 12 students pending', time: '5:00', icon: Banknote },
                { activity: 'Transport Schedule Change', detail: 'Route E & F — modified pickup', time: '4:30', icon: Bus },
              ].map((item, i) => (
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

        {/* Task Tracker */}
        <div className="lg:col-span-6 col-span-12">
          <Card className="h-full">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-3 items-center">
                <span className="h-12 w-12 flex items-center justify-center rounded-xl" style={{ background: `${PRIMARY}1A` }}>
                  <ListTodo size={22} style={{ color: PRIMARY }} />
                </span>
                <div>
                  <h5 className="text-lg font-semibold text-[#2A3547]">Task Tracker</h5>
                  <p className="text-xs text-[#98A4AE]">7 active tasks</p>
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: `${WARNING}20`, color: WARNING }}>3 high</span>
            </div>
            {/* Filter tabs */}
            <div className="flex gap-1 mb-4 p-1 rounded-xl bg-[#F2F6FA]">
              {([['all', 'All'], ['my', 'My Tasks'], ['delegated', 'Delegated']] as const).map(([key, label]) => (
                <button key={key} onClick={() => setTaskFilter(key)}
                  className={`flex-1 text-xs font-semibold py-2 rounded-lg transition-all ${taskFilter === key ? 'bg-white text-[#2A3547] shadow-sm' : 'text-[#98A4AE] hover:text-[#2A3547]'}`}>
                  {label}
                </button>
              ))}
            </div>
            {/* Task list */}
            <div className="space-y-2">
              {[
                { title: 'Process fee concession requests (2)', priority: 'high' as const, assignee: 'Self', due: 'Today', status: 'pending', delegated: false },
                { title: 'Update student records — new admissions', priority: 'high' as const, assignee: 'Self', due: '1d', status: 'in progress', delegated: false },
                { title: 'Prepare monthly attendance report', priority: 'high' as const, assignee: 'Self', due: '3d', status: 'pending', delegated: false },
                { title: 'Send circular — PTM schedule', priority: 'medium' as const, assignee: 'Self', due: '2d', status: 'pending', delegated: false },
                { title: 'Verify transport route changes', priority: 'medium' as const, assignee: 'Transport Head', due: '1d', status: 'in progress', delegated: true },
                { title: 'Coordinate CBSE inspector visit prep', priority: 'high' as const, assignee: 'Self', due: 'Today', status: 'in progress', delegated: false },
                { title: 'Review fee defaulter list', priority: 'medium' as const, assignee: 'Accountant', due: '2d', status: 'pending', delegated: true },
              ].filter(t => taskFilter === 'all' ? true : taskFilter === 'delegated' ? t.delegated : !t.delegated)
              .map((task, i) => {
                const dotColor = task.priority === 'high' ? ERROR : task.priority === 'medium' ? WARNING : PRIMARY;
                const statusColor = task.status === 'in progress' ? PRIMARY : '#98A4AE';
                const statusBg = task.status === 'in progress' ? `${PRIMARY}20` : '#F2F6FA';
                return (
                  <div key={i} className="p-3 rounded-xl bg-[#F2F6FA] flex items-start gap-3">
                    <span className="h-2 w-2 rounded-full mt-1.5 shrink-0" style={{ background: dotColor }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#2A3547] truncate">{task.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-[#98A4AE]">{task.assignee}</span>
                        <span className="text-xs text-[#98A4AE]">&middot;</span>
                        <span className="text-xs text-[#98A4AE]">Due: {task.due}</span>
                      </div>
                    </div>
                    <span className="text-[10px] px-2.5 py-1 rounded-full font-semibold shrink-0 capitalize" style={{ background: statusBg, color: statusColor }}>
                      {task.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Recurring Tasks */}
        <div className="col-span-12">
          {(() => {
            const recurringTasks = [
              { title: 'Daily fee collection reconciliation', assignee: 'Accountant', frequency: 'Daily', priority: 'high' as const, streak: [1,1,1,0,1,1,1,1,0,1,1,1,1,1] },
              { title: 'Attendance register verification', assignee: 'Self', frequency: 'Daily', priority: 'high' as const, streak: [1,1,1,1,1,1,1,1,1,1,0,1,1,1] },
              { title: 'Visitor log review', assignee: 'Reception', frequency: 'Daily', priority: 'medium' as const, streak: [1,1,1,1,0,1,1,1,1,1,0,1,1,1] },
              { title: 'Student record backup', assignee: 'IT Admin', frequency: 'Weekly', priority: 'high' as const, streak: [1,2,2,2,2,2,1,2,2,2,2,2,1,2] },
              { title: 'Circular/notice distribution check', assignee: 'Self', frequency: 'Daily', priority: 'medium' as const, streak: [1,1,0,1,1,1,1,0,1,1,1,1,1,1] },
            ];
            const doneCount = Object.values(recurringDone).filter(Boolean).length;
            const totalCount = recurringTasks.length;
            const pct = Math.round((doneCount / totalCount) * 100);
            return (
              <Card>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-3 items-center">
                    <span className="h-12 w-12 flex items-center justify-center rounded-xl" style={{ background: `${SUCCESS}1A` }}>
                      <RefreshCw size={22} style={{ color: SUCCESS }} />
                    </span>
                    <div>
                      <h5 className="text-lg font-semibold text-[#2A3547]">Recurring Tasks</h5>
                      <p className="text-xs text-[#98A4AE]">Routine compliance tracking</p>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: `${SUCCESS}20`, color: SUCCESS }}>{doneCount}/{totalCount} done today</span>
                </div>
                {/* Progress bar */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-[#98A4AE]">Today&apos;s completion</span>
                    <span className="text-xs font-bold" style={{ color: SUCCESS }}>{pct}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-100">
                    <div className="h-2 rounded-full transition-all" style={{ width: `${pct}%`, background: SUCCESS }} />
                  </div>
                </div>
                {/* Task rows */}
                <div className="space-y-3">
                  {recurringTasks.map((task, idx) => {
                    const isDone = !!recurringDone[idx];
                    const streakDone = task.streak.filter(s => s === 1).length;
                    const streakApplicable = task.streak.filter(s => s !== 2).length;
                    const streakPct = streakApplicable > 0 ? Math.round((streakDone / streakApplicable) * 100) : 0;
                    const priorityColor = task.priority === 'high' ? ERROR : WARNING;
                    return (
                      <div key={idx} className="p-4 rounded-xl bg-[#F2F6FA]">
                        <div className="flex items-start gap-3">
                          <button onClick={() => setRecurringDone(prev => ({ ...prev, [idx]: !prev[idx] }))}
                            className="mt-0.5 h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all"
                            style={{ borderColor: isDone ? SUCCESS : '#D1D5DB', background: isDone ? SUCCESS : 'transparent' }}>
                            {isDone && <Check size={12} className="text-white" />}
                          </button>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-semibold truncate ${isDone ? 'line-through text-[#98A4AE]' : 'text-[#2A3547]'}`}>{task.title}</p>
                            <div className="flex flex-wrap items-center gap-2 mt-1.5">
                              <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold" style={{ background: `${PRIMARY}20`, color: PRIMARY }}>{task.assignee}</span>
                              <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold" style={{ background: `${SECONDARY}20`, color: SECONDARY }}>{task.frequency}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: `${priorityColor}20`, color: priorityColor }}>{task.priority}</span>
                            </div>
                            {/* 14-day streak */}
                            <div className="flex items-center gap-1 mt-2.5">
                              <div className="flex gap-0.5">
                                {task.streak.map((s, si) => (
                                  <div key={si} className="h-3.5 w-3.5 rounded-sm"
                                    style={{ background: s === 1 ? SUCCESS : s === 0 ? ERROR : '#E5E7EB' }}
                                    title={s === 1 ? 'Done' : s === 0 ? 'Missed' : 'N/A'} />
                                ))}
                              </div>
                              <span className="text-xs font-bold ml-2" style={{ color: streakPct >= 80 ? SUCCESS : streakPct >= 50 ? WARNING : ERROR }}>{streakPct}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          })()}
        </div>
      </div>
      </DashletSection>

      {/* ═══════ DASHLET GALLERY MODAL ═══════ */}
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
                { key: 'visitors', name: 'Visitors', desc: 'Active visitor log and check-in status', icon: Shield, color: SECONDARY },
                { key: 'birthday', name: 'Birthdays', desc: 'Student and staff birthday wishes', icon: Cake, color: ERROR },
                { key: 'transport', name: 'Transport', desc: 'Bus routes and transport status', icon: Bus, color: SUCCESS },
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

    </DraggableDashboard>
  );
}
