'use client';

import React, { useState } from 'react';
import BlueprintLayout from '@/components/BlueprintLayout';
import { StatCard, TabBar, StatusBadge, SearchBar, DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  Home, BookOpen, Users, UserCheck, CheckCircle, BarChart3, Megaphone,
  GraduationCap, Briefcase, Clock, AlertTriangle, FileText, Send,
  Calendar, Shield, Eye, Download, Plus, Check, X, Search,
  TrendingUp, Heart, ClipboardCheck, Star, DollarSign, Building2,
  Bell, ArrowRight, MessageSquare, Award, Filter, User
} from 'lucide-react';
import StakeholderProfile from '@/components/StakeholderProfile';

// ─── MODULE SIDEBAR ────────────────────────────────
const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'academics', label: 'Academics', icon: BookOpen },
  { id: 'staff', label: 'Staff Overview', icon: Briefcase },
  { id: 'welfare', label: 'Student Welfare', icon: Heart },
  { id: 'approvals', label: 'Approvals', icon: CheckCircle },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'announcements', label: 'Announcements', icon: Megaphone },
  { id: 'profile', label: 'My Profile', icon: User },
];

function PrincipalDashboard({ theme }: { theme?: Theme }) {
  const [activeModule, setActiveModule] = useState('dashboard');
  if (!theme) return null;

  return (
    <div className="flex gap-4 -m-6">
      {/* Module sidebar */}
      <div className={`w-48 ${theme.cardBg} border-r ${theme.border} min-h-screen p-2 space-y-0.5 shrink-0`}>
        <p className={`text-[10px] font-bold ${theme.iconColor} uppercase px-3 py-2`}>Modules</p>
        {modules.map(m => (
          <button
            key={m.id}
            onClick={() => setActiveModule(m.id)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activeModule === m.id ? `${theme.primary} text-white` : `${theme.iconColor} ${theme.buttonHover}`
            }`}
          >
            <m.icon size={14} /> {m.label}
          </button>
        ))}
      </div>

      {/* Module content */}
      <div className="flex-1 p-6 space-y-4 overflow-x-hidden">
        {activeModule === 'dashboard' && <DashboardHome theme={theme} />}
        {activeModule === 'academics' && <AcademicsModule theme={theme} />}
        {activeModule === 'staff' && <StaffOverviewModule theme={theme} />}
        {activeModule === 'welfare' && <StudentWelfareModule theme={theme} />}
        {activeModule === 'approvals' && <ApprovalsModule theme={theme} />}
        {activeModule === 'reports' && <ReportsModule theme={theme} />}
        {activeModule === 'announcements' && <AnnouncementsModule theme={theme} />}
        {activeModule === 'profile' && <StakeholderProfile role="principal" theme={theme} />}
      </div>
    </div>
  );
}

// ─── DASHBOARD HOME ──────────────────────────────────
function DashboardHome({ theme }: { theme: Theme }) {
  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Principal Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard icon={Users} label="Total Students" value="2,847" color="bg-blue-500" theme={theme} />
        <StatCard icon={Briefcase} label="Total Staff" value="142" color="bg-indigo-500" theme={theme} />
        <StatCard icon={ClipboardCheck} label="Avg Attendance" value="94.2%" color="bg-emerald-500" theme={theme} />
        <StatCard icon={Award} label="Academic Performance" value="87.5%" color="bg-purple-500" theme={theme} />
        <StatCard icon={Clock} label="Pending Approvals" value="8" color="bg-amber-500" theme={theme} />
        <StatCard icon={Calendar} label="Parent Meetings Today" value="3" color="bg-teal-500" theme={theme} />
      </div>

      {/* Recent Activity */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Recent Activity</h3>
        <div className="space-y-2">
          {[
            { text: 'Fee defaulter report generated — 23 students with overdue balance', time: '15 min ago', type: 'report' },
            { text: 'Staff leave approved — Ms. Priya Sharma (3 days CL)', time: '45 min ago', type: 'approval' },
            { text: 'New admission batch processed — 12 students for Class I', time: '2 hours ago', type: 'admission' },
            { text: 'Disciplinary case resolved — Arjun Singh (Class 8-B)', time: '3 hours ago', type: 'welfare' },
            { text: 'Monthly attendance report submitted to board', time: '5 hours ago', type: 'report' },
          ].map((a, i) => (
            <div key={i} className={`flex items-center gap-3 p-2 rounded-xl ${theme.accentBg}`}>
              <div className={`w-2 h-2 rounded-full ${
                a.type === 'report' ? 'bg-blue-500' :
                a.type === 'approval' ? 'bg-emerald-500' :
                a.type === 'admission' ? 'bg-purple-500' :
                'bg-amber-500'
              }`} />
              <p className={`text-xs ${theme.highlight} flex-1`}>{a.text}</p>
              <span className={`text-[10px] ${theme.iconColor}`}>{a.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { label: 'View Reports', icon: BarChart3, color: 'bg-blue-500' },
            { label: 'Approve Requests', icon: CheckCircle, color: 'bg-emerald-500' },
            { label: 'Send Circular', icon: Send, color: 'bg-indigo-500' },
            { label: 'Schedule Meeting', icon: Calendar, color: 'bg-purple-500' },
          ].map(a => (
            <button key={a.label} className={`flex items-center gap-2 p-3 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} transition-all`}>
              <div className={`w-8 h-8 rounded-lg ${a.color} flex items-center justify-center text-white`}><a.icon size={14} /></div>
              <span className={`text-xs font-bold ${theme.highlight}`}>{a.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ACADEMICS MODULE ────────────────────────────────
function AcademicsModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Overview');

  const subjectPerformance = [
    { subject: 'Mathematics', score: 89, color: 'bg-blue-500', trend: '+2.1%' },
    { subject: 'Science', score: 85, color: 'bg-emerald-500', trend: '+1.5%' },
    { subject: 'English', score: 91, color: 'bg-purple-500', trend: '+3.2%' },
    { subject: 'Social Studies', score: 83, color: 'bg-amber-500', trend: '-0.8%' },
    { subject: 'Hindi', score: 88, color: 'bg-teal-500', trend: '+1.9%' },
  ];

  const classPerformance = [
    { cls: 'Class I', strength: 52, avgScore: 91.2, passPercent: 100, topScorer: 'Aarav Mehta' },
    { cls: 'Class II', strength: 48, avgScore: 89.5, passPercent: 100, topScorer: 'Saanvi Patel' },
    { cls: 'Class III', strength: 55, avgScore: 87.8, passPercent: 98.2, topScorer: 'Vivaan Sharma' },
    { cls: 'Class IV', strength: 50, avgScore: 85.3, passPercent: 96.0, topScorer: 'Anaya Gupta' },
    { cls: 'Class V', strength: 47, avgScore: 83.6, passPercent: 95.7, topScorer: 'Reyansh Iyer' },
    { cls: 'Class VI', strength: 53, avgScore: 82.1, passPercent: 94.3, topScorer: 'Diya Reddy' },
  ];

  const examResults = [
    { exam: 'Unit Test 1', date: '15-Jul-2025', classes: 'I-VI', avgScore: '84.2%', passRate: '96.8%', status: 'Published' },
    { exam: 'Mid-Term', date: '20-Sep-2025', classes: 'I-VI', avgScore: '81.7%', passRate: '95.1%', status: 'Published' },
    { exam: 'Unit Test 2', date: '10-Nov-2025', classes: 'I-VI', avgScore: '86.5%', passRate: '97.2%', status: 'Published' },
    { exam: 'Pre-Final', date: '15-Jan-2026', classes: 'I-VI', avgScore: '87.9%', passRate: '97.8%', status: 'Published' },
    { exam: 'Final Exam', date: '10-Mar-2026', classes: 'I-VI', avgScore: '—', passRate: '—', status: 'Upcoming' },
  ];

  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Academic Performance</h1>
      <TabBar tabs={['Overview', 'Class Performance', 'Exam Results']} active={tab} onChange={setTab} theme={theme} />

      {tab === 'Overview' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <StatCard icon={Award} label="Overall Score" value="87.5%" color="bg-purple-500" sub="+1.8% vs last term" theme={theme} />
            <StatCard icon={TrendingUp} label="Pass Rate" value="96.4%" color="bg-emerald-500" theme={theme} />
            <StatCard icon={Star} label="Distinction %" value="34.2%" color="bg-blue-500" theme={theme} />
          </div>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-4`}>Subject-wise Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {subjectPerformance.map(s => (
                <div key={s.subject} className={`${theme.secondaryBg} rounded-xl p-4 text-center`}>
                  <div className={`w-12 h-12 rounded-full ${s.color} mx-auto mb-2 flex items-center justify-center`}>
                    <span className="text-white text-sm font-bold">{s.score}%</span>
                  </div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>{s.subject}</p>
                  <p className={`text-[10px] font-bold mt-1 ${s.trend.startsWith('+') ? 'text-emerald-600' : 'text-red-500'}`}>{s.trend}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'Class Performance' && (
        <DataTable
          headers={['Class', 'Strength', 'Avg Score', 'Pass %', 'Top Scorer']}
          rows={classPerformance.map(c => [
            <span key="cls" className={`font-bold ${theme.highlight}`}>{c.cls}</span>,
            <span key="str" className={theme.iconColor}>{c.strength}</span>,
            <span key="avg" className={`font-bold ${theme.highlight}`}>{c.avgScore}%</span>,
            <span key="pass" className={c.passPercent === 100 ? 'text-emerald-600 font-bold' : `font-bold ${theme.highlight}`}>{c.passPercent}%</span>,
            <span key="top" className={`${theme.primaryText} font-bold`}>{c.topScorer}</span>,
          ])}
          theme={theme}
        />
      )}

      {tab === 'Exam Results' && (
        <DataTable
          headers={['Exam', 'Date', 'Classes', 'Avg Score', 'Pass Rate', 'Status']}
          rows={examResults.map(e => [
            <span key="exam" className={`font-bold ${theme.highlight}`}>{e.exam}</span>,
            <span key="date" className={theme.iconColor}>{e.date}</span>,
            <span key="cls" className={theme.iconColor}>{e.classes}</span>,
            <span key="avg" className={`font-bold ${theme.highlight}`}>{e.avgScore}</span>,
            <span key="pass" className={`font-bold ${theme.highlight}`}>{e.passRate}</span>,
            <StatusBadge key="status" status={e.status === 'Published' ? 'Active' : 'Pending'} theme={theme} />,
          ])}
          theme={theme}
        />
      )}
    </div>
  );
}

// ─── STAFF OVERVIEW MODULE ───────────────────────────
function StaffOverviewModule({ theme }: { theme: Theme }) {
  const departments = [
    { dept: 'Teaching', head: 'Dr. Priya Sharma', strength: 89, attendance: 96.2, performance: 'Excellent' },
    { dept: 'Admin', head: 'Rajesh Kumar', strength: 23, attendance: 94.8, performance: 'Good' },
    { dept: 'Transport', head: 'Mohammed Irfan', strength: 18, attendance: 91.5, performance: 'Good' },
    { dept: 'IT & Lab', head: 'Vikram Singh', strength: 8, attendance: 97.0, performance: 'Excellent' },
    { dept: 'Security', head: 'Ramesh Yadav', strength: 4, attendance: 100, performance: 'Good' },
  ];

  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Staff Overview</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={UserCheck} label="Present Today" value="128/142" color="bg-emerald-500" sub="90.1%" theme={theme} />
        <StatCard icon={Calendar} label="On Leave" value="8" color="bg-amber-500" theme={theme} />
        <StatCard icon={Clock} label="Late Today" value="3" color="bg-red-500" theme={theme} />
        <StatCard icon={Briefcase} label="Open Positions" value="3" color="bg-blue-500" theme={theme} />
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Department-wise Overview</h3>
        <DataTable
          headers={['Department', 'Head', 'Strength', 'Attendance %', 'Performance']}
          rows={departments.map(d => [
            <span key="dept" className={`font-bold ${theme.highlight}`}>{d.dept}</span>,
            <span key="head" className={theme.iconColor}>{d.head}</span>,
            <span key="str" className={`font-bold ${theme.highlight}`}>{d.strength}</span>,
            <span key="att" className={d.attendance >= 95 ? 'text-emerald-600 font-bold' : `font-bold ${theme.highlight}`}>{d.attendance}%</span>,
            <StatusBadge key="perf" status={d.performance === 'Excellent' ? 'Active' : 'Pending'} theme={theme} />,
          ])}
          theme={theme}
        />
      </div>

      {/* Staff Attendance Trend */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>This Week&apos;s Attendance Snapshot</h3>
        <div className="grid grid-cols-5 gap-2">
          {[
            { day: 'Mon', present: 136, total: 142 },
            { day: 'Tue', present: 131, total: 142 },
            { day: 'Wed', present: 134, total: 142 },
            { day: 'Thu', present: 128, total: 142 },
            { day: 'Fri', present: 130, total: 142 },
          ].map(d => (
            <div key={d.day} className={`${theme.secondaryBg} rounded-xl p-3 text-center`}>
              <p className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>{d.day}</p>
              <p className={`text-lg font-bold ${theme.highlight} mt-1`}>{d.present}</p>
              <p className={`text-[10px] ${theme.iconColor}`}>of {d.total}</p>
              <div className={`mt-2 h-1.5 rounded-full bg-gray-200`}>
                <div className="h-full rounded-full bg-emerald-500" style={{ width: `${(d.present / d.total) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── STUDENT WELFARE MODULE ──────────────────────────
function StudentWelfareModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Overview');

  const recentCases = [
    { date: '10-Feb-2026', student: 'Arjun Singh', cls: '8-B', type: 'Disciplinary', status: 'Open', assignedTo: 'Dr. Meena Rao' },
    { date: '08-Feb-2026', student: 'Riya Patel', cls: '6-A', type: 'Counseling', status: 'In Progress', assignedTo: 'Ms. Kavita Desai' },
    { date: '07-Feb-2026', student: 'Vivaan Sharma', cls: '9-C', type: 'Behavioral', status: 'Resolved', assignedTo: 'Mr. Suresh Nair' },
    { date: '05-Feb-2026', student: 'Anaya Gupta', cls: '7-A', type: 'Counseling', status: 'In Progress', assignedTo: 'Ms. Kavita Desai' },
    { date: '03-Feb-2026', student: 'Rohan Mehta', cls: '10-B', type: 'Disciplinary', status: 'Resolved', assignedTo: 'Dr. Meena Rao' },
    { date: '01-Feb-2026', student: 'Saanvi Reddy', cls: '5-B', type: 'Behavioral', status: 'Open', assignedTo: 'Mr. Suresh Nair' },
  ];

  const disciplinaryCases = [
    { date: '10-Feb-2026', student: 'Arjun Singh', cls: '8-B', incident: 'Classroom disruption during exam', action: 'Warning issued', parentNotified: 'Yes', status: 'Open' },
    { date: '03-Feb-2026', student: 'Rohan Mehta', cls: '10-B', incident: 'Repeated tardiness (5 consecutive days)', action: 'Parent meeting scheduled', parentNotified: 'Yes', status: 'Resolved' },
    { date: '28-Jan-2026', student: 'Dev Kapoor', cls: '9-A', incident: 'Mobile phone usage during class', action: 'Device confiscated, parent informed', parentNotified: 'Yes', status: 'Resolved' },
  ];

  const counselingSessions = [
    { date: '09-Feb-2026', student: 'Riya Patel', cls: '6-A', concern: 'Academic anxiety', sessions: 3, counselor: 'Ms. Kavita Desai', nextSession: '12-Feb-2026' },
    { date: '06-Feb-2026', student: 'Anaya Gupta', cls: '7-A', concern: 'Peer relationship issues', sessions: 2, counselor: 'Ms. Kavita Desai', nextSession: '13-Feb-2026' },
    { date: '02-Feb-2026', student: 'Meera Nair', cls: '8-A', concern: 'Low self-confidence', sessions: 5, counselor: 'Dr. Meena Rao', nextSession: '16-Feb-2026' },
    { date: '30-Jan-2026', student: 'Ishaan Das', cls: '10-A', concern: 'Exam stress management', sessions: 4, counselor: 'Dr. Meena Rao', nextSession: '14-Feb-2026' },
  ];

  const statusColor = (status: string) => {
    if (status === 'Open') return 'Pending';
    if (status === 'In Progress') return 'Follow-up';
    return 'Active';
  };

  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Student Welfare</h1>
      <TabBar tabs={['Overview', 'Disciplinary', 'Counseling']} active={tab} onChange={setTab} theme={theme} />

      {tab === 'Overview' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={AlertTriangle} label="Active Cases" value="12" color="bg-amber-500" theme={theme} />
            <StatCard icon={CheckCircle} label="Resolved This Month" value="8" color="bg-emerald-500" theme={theme} />
            <StatCard icon={Heart} label="Counseling Sessions" value="15" color="bg-purple-500" theme={theme} />
            <StatCard icon={Users} label="Parent Meetings" value="6" color="bg-blue-500" theme={theme} />
          </div>

          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Recent Cases</h3>
            <DataTable
              headers={['Date', 'Student', 'Class', 'Type', 'Status', 'Assigned To']}
              rows={recentCases.map(c => [
                <span key="date" className={theme.iconColor}>{c.date}</span>,
                <span key="student" className={`font-bold ${theme.highlight}`}>{c.student}</span>,
                <span key="cls" className={theme.iconColor}>{c.cls}</span>,
                <span key="type" className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                  c.type === 'Disciplinary' ? 'bg-red-100 text-red-700' :
                  c.type === 'Counseling' ? 'bg-purple-100 text-purple-700' :
                  'bg-amber-100 text-amber-700'
                }`}>{c.type}</span>,
                <StatusBadge key="status" status={statusColor(c.status)} theme={theme} />,
                <span key="assigned" className={theme.iconColor}>{c.assignedTo}</span>,
              ])}
              theme={theme}
            />
          </div>
        </div>
      )}

      {tab === 'Disciplinary' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <StatCard icon={AlertTriangle} label="Open Cases" value="4" color="bg-red-500" theme={theme} />
            <StatCard icon={CheckCircle} label="Resolved" value="12" color="bg-emerald-500" sub="this term" theme={theme} />
            <StatCard icon={Users} label="Parents Notified" value="16" color="bg-blue-500" theme={theme} />
          </div>
          <DataTable
            headers={['Date', 'Student', 'Class', 'Incident', 'Action Taken', 'Parent Notified', 'Status']}
            rows={disciplinaryCases.map(c => [
              <span key="date" className={theme.iconColor}>{c.date}</span>,
              <span key="student" className={`font-bold ${theme.highlight}`}>{c.student}</span>,
              <span key="cls" className={theme.iconColor}>{c.cls}</span>,
              <span key="incident" className={`text-xs ${theme.highlight}`}>{c.incident}</span>,
              <span key="action" className={`text-xs ${theme.iconColor}`}>{c.action}</span>,
              <span key="parent" className={c.parentNotified === 'Yes' ? 'text-emerald-600 font-bold text-xs' : `text-xs ${theme.iconColor}`}>{c.parentNotified}</span>,
              <StatusBadge key="status" status={statusColor(c.status)} theme={theme} />,
            ])}
            theme={theme}
          />
        </div>
      )}

      {tab === 'Counseling' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <StatCard icon={Heart} label="Active Sessions" value="8" color="bg-purple-500" theme={theme} />
            <StatCard icon={CheckCircle} label="Completed" value="23" color="bg-emerald-500" sub="this term" theme={theme} />
            <StatCard icon={Calendar} label="Upcoming" value="6" color="bg-blue-500" sub="this week" theme={theme} />
          </div>
          <DataTable
            headers={['Date', 'Student', 'Class', 'Concern', 'Sessions', 'Counselor', 'Next Session']}
            rows={counselingSessions.map(c => [
              <span key="date" className={theme.iconColor}>{c.date}</span>,
              <span key="student" className={`font-bold ${theme.highlight}`}>{c.student}</span>,
              <span key="cls" className={theme.iconColor}>{c.cls}</span>,
              <span key="concern" className={`text-xs ${theme.highlight}`}>{c.concern}</span>,
              <span key="sessions" className={`font-bold ${theme.highlight}`}>{c.sessions}</span>,
              <span key="counselor" className={theme.iconColor}>{c.counselor}</span>,
              <span key="next" className={`${theme.primaryText} font-bold text-xs`}>{c.nextSession}</span>,
            ])}
            theme={theme}
          />
        </div>
      )}
    </div>
  );
}

// ─── APPROVALS MODULE ────────────────────────────────
function ApprovalsModule({ theme }: { theme: Theme }) {
  const pendingApprovals = [
    {
      id: 1, type: 'Leave', requestedBy: 'Ms. Sunita Verma', date: '10-Feb-2026',
      details: 'Casual Leave — 3 days (12-Feb to 14-Feb) for family function',
      priority: 'Normal',
    },
    {
      id: 2, type: 'Purchase', requestedBy: 'Rajesh Kumar (Admin)', date: '09-Feb-2026',
      details: 'Lab equipment purchase — 5 microscopes @ Rs. 8,500 each (Total: Rs. 42,500)',
      priority: 'High',
    },
    {
      id: 3, type: 'Event', requestedBy: 'Dr. Priya Sharma (HOD)', date: '08-Feb-2026',
      details: 'Inter-school Science Exhibition — 25-Feb-2026, estimated budget Rs. 35,000',
      priority: 'Normal',
    },
    {
      id: 4, type: 'Transfer', requestedBy: 'Front Desk', date: '07-Feb-2026',
      details: 'Transfer Certificate request — Meera Nair (Class 8-A), reason: family relocation',
      priority: 'Urgent',
    },
    {
      id: 5, type: 'Leave', requestedBy: 'Mr. Mohammed Irfan (Transport)', date: '06-Feb-2026',
      details: 'Medical Leave — 5 days (15-Feb to 19-Feb), medical certificate attached',
      priority: 'High',
    },
  ];

  const approvalHistory = [
    { type: 'Leave', requestedBy: 'Mr. Vikram Singh', date: '05-Feb-2026', details: 'Casual Leave — 1 day', decision: 'Approved', decidedOn: '05-Feb-2026' },
    { type: 'Purchase', requestedBy: 'Lab Dept.', date: '03-Feb-2026', details: 'Chemistry lab reagents — Rs. 12,000', decision: 'Approved', decidedOn: '04-Feb-2026' },
    { type: 'Event', requestedBy: 'Sports Dept.', date: '01-Feb-2026', details: 'Annual Sports Day prep — Rs. 85,000', decision: 'Approved', decidedOn: '02-Feb-2026' },
    { type: 'Leave', requestedBy: 'Ms. Kavita Desai', date: '30-Jan-2026', details: 'Sick Leave — 2 days', decision: 'Approved', decidedOn: '30-Jan-2026' },
    { type: 'Purchase', requestedBy: 'IT Dept.', date: '28-Jan-2026', details: 'Projector replacement — Rs. 55,000', decision: 'Rejected', decidedOn: '29-Jan-2026' },
  ];

  const priorityColor = (priority: string) => {
    if (priority === 'Urgent') return 'bg-red-100 text-red-700';
    if (priority === 'High') return 'bg-amber-100 text-amber-700';
    return 'bg-blue-100 text-blue-700';
  };

  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Approvals</h1>
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={Clock} label="Pending" value="5" color="bg-amber-500" theme={theme} />
        <StatCard icon={AlertTriangle} label="Urgent" value="1" color="bg-red-500" theme={theme} />
        <StatCard icon={CheckCircle} label="Approved This Week" value="4" color="bg-emerald-500" theme={theme} />
        <StatCard icon={X} label="Rejected This Week" value="1" color="bg-slate-500" theme={theme} />
      </div>

      {/* Pending Approvals */}
      <div>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Pending Approvals</h3>
        <div className="space-y-3">
          {pendingApprovals.map(a => (
            <div key={a.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${priorityColor(a.priority)}`}>{a.priority}</span>
                  <span className={`text-xs font-bold ${theme.secondaryBg} px-2 py-1 rounded-lg ${theme.iconColor}`}>{a.type}</span>
                </div>
                <span className={`text-xs ${theme.iconColor}`}>{a.date}</span>
              </div>
              <p className={`text-sm font-bold ${theme.highlight}`}>{a.details}</p>
              <p className={`text-xs ${theme.iconColor} mt-1`}>Requested by: {a.requestedBy}</p>
              <div className="flex gap-2 mt-3">
                <button className="px-3 py-1.5 rounded-xl bg-emerald-500 text-white text-xs font-bold flex items-center gap-1"><Check size={10} /> Approve</button>
                <button className="px-3 py-1.5 rounded-xl bg-red-500 text-white text-xs font-bold flex items-center gap-1"><X size={10} /> Reject</button>
                <button className={`px-3 py-1.5 rounded-xl border ${theme.border} text-xs font-bold ${theme.highlight}`}>View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Approval History */}
      <div>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Approval History</h3>
        <DataTable
          headers={['Type', 'Requested By', 'Date', 'Details', 'Decision', 'Decided On']}
          rows={approvalHistory.map(h => [
            <span key="type" className={`text-xs font-bold ${theme.secondaryBg} px-2 py-1 rounded-lg ${theme.iconColor}`}>{h.type}</span>,
            <span key="by" className={`font-bold ${theme.highlight}`}>{h.requestedBy}</span>,
            <span key="date" className={theme.iconColor}>{h.date}</span>,
            <span key="details" className={`text-xs ${theme.highlight}`}>{h.details}</span>,
            <StatusBadge key="decision" status={h.decision} theme={theme} />,
            <span key="decided" className={theme.iconColor}>{h.decidedOn}</span>,
          ])}
          theme={theme}
        />
      </div>
    </div>
  );
}

// ─── REPORTS MODULE ──────────────────────────────────
function ReportsModule({ theme }: { theme: Theme }) {
  const reports = [
    { title: 'Academic Report', desc: 'Class-wise results, subject analysis, toppers list, grade distribution', icon: Award, color: 'bg-purple-500', lastGenerated: '08-Feb-2026' },
    { title: 'Financial Summary', desc: 'Fee collection, outstanding dues, expense breakdown, monthly P&L', icon: DollarSign, color: 'bg-emerald-500', lastGenerated: '05-Feb-2026' },
    { title: 'Attendance Report', desc: 'Student and staff attendance trends, absentee patterns, class-wise data', icon: ClipboardCheck, color: 'bg-blue-500', lastGenerated: '10-Feb-2026' },
    { title: 'Staff Performance', desc: 'Department-wise performance, training completed, leave utilization', icon: Briefcase, color: 'bg-indigo-500', lastGenerated: '01-Feb-2026' },
    { title: 'Infrastructure Status', desc: 'Classroom utilization, lab equipment inventory, maintenance pending', icon: Building2, color: 'bg-amber-500', lastGenerated: '28-Jan-2026' },
    { title: 'Compliance Report', desc: 'Board compliance, safety audits, UDISE submission status, RTE compliance', icon: Shield, color: 'bg-red-500', lastGenerated: '15-Jan-2026' },
  ];

  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Reports</h1>
      <p className={`text-xs ${theme.iconColor}`}>Generate and download school performance reports for board meetings and compliance.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((r, i) => (
          <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 hover:shadow-md transition-all`}>
            <div className={`w-10 h-10 rounded-xl ${r.color} flex items-center justify-center text-white mb-3`}>
              <r.icon size={20} />
            </div>
            <h4 className={`text-sm font-bold ${theme.highlight} mb-1`}>{r.title}</h4>
            <p className={`text-xs ${theme.iconColor} mb-3 leading-relaxed`}>{r.desc}</p>
            <div className="flex items-center justify-between">
              <span className={`text-[10px] ${theme.iconColor}`}>Last generated: {r.lastGenerated}</span>
              <button className={`px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold flex items-center gap-1`}>
                <Download size={10} /> Generate
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Report Generation Summary</h3>
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'Reports Generated', value: '24', sub: 'this month' },
            { label: 'Shared with Board', value: '6', sub: 'this quarter' },
            { label: 'Pending Reviews', value: '2', sub: 'awaiting approval' },
            { label: 'Scheduled Reports', value: '3', sub: 'auto-generate' },
          ].map((s, i) => (
            <div key={i} className={`${theme.secondaryBg} rounded-xl p-3 text-center`}>
              <p className={`text-lg font-bold ${theme.highlight}`}>{s.value}</p>
              <p className={`text-xs ${theme.iconColor}`}>{s.label}</p>
              <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ANNOUNCEMENTS MODULE ────────────────────────────
function AnnouncementsModule({ theme }: { theme: Theme }) {
  const announcements = [
    {
      id: 1, title: 'Annual Day Celebration — 28 February 2026',
      message: 'All students from Class I to X are expected to participate in the Annual Day celebration. Parents are cordially invited. Rehearsals begin from 15-Feb.',
      sentTo: 'All', date: '10-Feb-2026', sentBy: 'Principal',
    },
    {
      id: 2, title: 'Parent-Teacher Meeting Schedule',
      message: 'PTM for classes VI to X will be held on 15-Feb (Saturday). Parents are requested to collect the progress report from respective class teachers.',
      sentTo: 'Parents', date: '08-Feb-2026', sentBy: 'Principal',
    },
    {
      id: 3, title: 'Staff Development Workshop',
      message: 'A mandatory workshop on NEP 2020 implementation strategies will be conducted on 20-Feb. All teaching staff must attend. Relief arrangements in progress.',
      sentTo: 'Teachers', date: '07-Feb-2026', sentBy: 'Vice Principal',
    },
    {
      id: 4, title: 'Revised School Timings — Effective 1 March',
      message: 'Summer timings will be effective from 1-Mar-2026. School hours: 7:00 AM to 1:00 PM. Bus timings will be updated accordingly.',
      sentTo: 'All', date: '05-Feb-2026', sentBy: 'Principal',
    },
    {
      id: 5, title: 'Inter-School Science Exhibition',
      message: 'Selected students from classes VIII to X will represent our school at the District Science Exhibition on 25-Feb. Parents of selected students will be notified separately.',
      sentTo: 'Parents', date: '03-Feb-2026', sentBy: 'Dr. Priya Sharma',
    },
    {
      id: 6, title: 'Fee Payment Reminder — Last Date 15 February',
      message: 'Parents are requested to clear all pending fee dues by 15-Feb-2026. Late fee of Rs. 500 will be applicable after the due date.',
      sentTo: 'Parents', date: '01-Feb-2026', sentBy: 'Accounts Dept.',
    },
  ];

  const audienceColor = (audience: string) => {
    if (audience === 'All') return 'bg-blue-100 text-blue-700';
    if (audience === 'Teachers') return 'bg-purple-100 text-purple-700';
    return 'bg-emerald-100 text-emerald-700';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Announcements</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}>
          <Plus size={14} /> New Announcement
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard icon={Megaphone} label="Total Sent" value="42" color="bg-blue-500" sub="this month" theme={theme} />
        <StatCard icon={Users} label="Reach" value="2,847" color="bg-emerald-500" sub="students + parents" theme={theme} />
        <StatCard icon={Bell} label="Scheduled" value="3" color="bg-amber-500" sub="upcoming" theme={theme} />
      </div>

      <div className="space-y-3">
        {announcements.map(a => (
          <div key={a.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center justify-between mb-2">
              <h4 className={`text-sm font-bold ${theme.highlight}`}>{a.title}</h4>
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${audienceColor(a.sentTo)}`}>{a.sentTo}</span>
            </div>
            <p className={`text-xs ${theme.iconColor} leading-relaxed mb-3`}>{a.message}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`text-[10px] ${theme.iconColor}`}>{a.date}</span>
                <span className={`text-[10px] ${theme.iconColor}`}>Sent by: <span className="font-bold">{a.sentBy}</span></span>
              </div>
              <div className="flex gap-1">
                <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
                <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Send size={12} className={theme.iconColor} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── EXPORT ──────────────────────────────────────────
export default function Page() {
  return (
    <BlueprintLayout>
      <PrincipalDashboard />
    </BlueprintLayout>
  );
}
