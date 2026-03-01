'use client';

import { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { MobileFrame, MobilePreviewToggle } from '@/components/shared';
import {
  Award, ClipboardCheck, IndianRupee, Briefcase, Bus,
  Download, FileText, ArrowRight, X, Monitor, TrendingUp,
  Users, FileSpreadsheet, BarChart3, GraduationCap, Info,
  CalendarCheck, Smartphone, Eye,
} from 'lucide-react';

export default function ReportsModule({ theme }: { theme: Theme }) {
  const [expandedReport, setExpandedReport] = useState<string | null>(null);
  const [rankTrendExpanded, setRankTrendExpanded] = useState(false);
  const [previewToggle, setPreviewToggle] = useState(true);
  const [notifyToggle, setNotifyToggle] = useState(true);
  const [scheduleDate, setScheduleDate] = useState('');

  // Student rank trend data (moved from DashboardHome)
  const rankTrendStudents = [
    { name: 'Aarav Singh', cls: '8A', ranks: [5, 3, 2], trend: 'up' as const },
    { name: 'Meera Joshi', cls: '10B', ranks: [8, 6, 4], trend: 'up' as const },
    { name: 'Rohan Patel', cls: '9A', ranks: [3, 5, 7], trend: 'down' as const },
    { name: 'Ananya Sharma', cls: '11A', ranks: [2, 2, 1], trend: 'up' as const },
    { name: 'Karthik Nair', cls: '12B', ranks: [10, 7, 5], trend: 'up' as const },
  ];

  const reportCards = [
    {
      id: 'academic',
      title: 'Academic Report',
      icon: Award,
      color: 'bg-purple-500',
      lightBg: 'bg-purple-50',
      borderColor: 'border-purple-200',
      metrics: [
        { label: 'Pass Rate', value: '94%', color: 'text-emerald-600' },
        { label: 'Avg Score', value: '78%', color: 'text-blue-600' },
        { label: 'Top Subject', value: 'Science', color: 'text-purple-600' },
      ],
      progressValue: 94,
      progressColor: 'bg-purple-500',
      detailHeaders: ['Class', 'Strength', 'Avg Score', 'Pass %', 'Top Scorer', 'Distinction %'],
      detailRows: [
        ['Class I', '52', '91.2%', '100%', 'Aarav Mehta', '42%'],
        ['Class II', '48', '89.5%', '100%', 'Saanvi Patel', '38%'],
        ['Class III', '55', '87.8%', '98.2%', 'Vivaan Sharma', '35%'],
        ['Class IV', '50', '85.3%', '96.0%', 'Anaya Gupta', '31%'],
        ['Class V', '47', '83.6%', '95.7%', 'Reyansh Iyer', '28%'],
        ['Class VI', '53', '82.1%', '94.3%', 'Diya Reddy', '26%'],
      ],
    },
    {
      id: 'attendance',
      title: 'Attendance Report',
      icon: ClipboardCheck,
      color: 'bg-blue-500',
      lightBg: 'bg-blue-50',
      borderColor: 'border-blue-200',
      metrics: [
        { label: 'Avg Attendance', value: '92%', color: 'text-emerald-600' },
        { label: 'Chronic Absentees', value: '12', color: 'text-red-600' },
        { label: 'Perfect Attendance', value: '145', color: 'text-blue-600' },
      ],
      progressValue: 92,
      progressColor: 'bg-blue-500',
      detailHeaders: ['Class', 'Present', 'Absent', 'Late', 'Attendance %', 'Chronic Absentees'],
      detailRows: [
        ['Class I', '48', '4', '1', '92.3%', '1'],
        ['Class II', '45', '3', '0', '93.8%', '1'],
        ['Class III', '50', '5', '2', '90.9%', '2'],
        ['Class IV', '46', '4', '1', '92.0%', '2'],
        ['Class V', '44', '3', '0', '93.6%', '3'],
        ['Class VI', '49', '4', '1', '92.5%', '3'],
      ],
    },
    {
      id: 'financial',
      title: 'Financial Report',
      icon: IndianRupee,
      color: 'bg-emerald-500',
      lightBg: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      metrics: [
        { label: 'Collection Rate', value: '87%', color: 'text-emerald-600' },
        { label: 'Outstanding', value: '\u20B918.5L', color: 'text-red-600' },
        { label: 'Monthly Trend', value: '\u2191', color: 'text-emerald-600' },
      ],
      progressValue: 87,
      progressColor: 'bg-emerald-500',
      detailHeaders: ['Category', 'Collected', 'Pending', 'Collection %', 'Defaulters', 'Trend'],
      detailRows: [
        ['Tuition Fee', '\u20B942.5L', '\u20B94.2L', '91%', '23', '\u2191 +3%'],
        ['Transport Fee', '\u20B98.2L', '\u20B91.8L', '82%', '18', '\u2192 0%'],
        ['Lab Fee', '\u20B93.1L', '\u20B90.4L', '89%', '8', '\u2191 +2%'],
        ['Activity Fee', '\u20B95.6L', '\u20B91.2L', '82%', '15', '\u2193 -1%'],
        ['Exam Fee', '\u20B92.8L', '\u20B90.3L', '90%', '6', '\u2191 +4%'],
      ],
    },
    {
      id: 'staff',
      title: 'Staff Report',
      icon: Briefcase,
      color: 'bg-indigo-500',
      lightBg: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      metrics: [
        { label: 'Present Today', value: '134/142', color: 'text-emerald-600' },
        { label: 'Avg Rating', value: '4.2/5', color: 'text-amber-600' },
        { label: 'Open Leaves', value: '8', color: 'text-blue-600' },
      ],
      progressValue: 94,
      progressColor: 'bg-indigo-500',
      detailHeaders: ['Department', 'Strength', 'Present', 'Attendance %', 'Avg Rating', 'Leaves Used'],
      detailRows: [
        ['Teaching', '78', '72', '92.3%', '4.3/5', '12'],
        ['Admin', '23', '22', '95.7%', '4.1/5', '5'],
        ['Transport', '18', '17', '94.4%', '4.0/5', '8'],
        ['IT & Lab', '8', '8', '100%', '4.5/5', '2'],
        ['Security', '4', '4', '100%', '4.0/5', '1'],
        ['Housekeeping', '11', '11', '100%', '3.9/5', '4'],
      ],
    },
    {
      id: 'transportation',
      title: 'Transportation Report',
      icon: Bus,
      color: 'bg-amber-500',
      lightBg: 'bg-amber-50',
      borderColor: 'border-amber-200',
      metrics: [
        { label: 'Routes Active', value: '12/14', color: 'text-emerald-600' },
        { label: 'Students Using', value: '1,850', color: 'text-blue-600' },
        { label: 'GPS Coverage', value: '100%', color: 'text-emerald-600' },
        { label: 'Avg Delay', value: '3 min', color: 'text-amber-600' },
      ],
      progressValue: 86,
      progressColor: 'bg-amber-500',
      detailHeaders: ['Route', 'Bus No.', 'Driver', 'Students', 'Stops', 'Avg Delay', 'GPS'],
      detailRows: [
        ['Route 1 - Vastrapur', 'GJ-01-AB-1234', 'Ramesh Patel', '165', '12', '2 min', 'Active'],
        ['Route 2 - Satellite', 'GJ-01-CD-5678', 'Suresh Yadav', '158', '10', '4 min', 'Active'],
        ['Route 3 - Bodakdev', 'GJ-01-EF-9012', 'Mohan Singh', '142', '9', '3 min', 'Active'],
        ['Route 4 - Prahladnagar', 'GJ-01-GH-3456', 'Ahmed Khan', '168', '14', '5 min', 'Active'],
        ['Route 5 - Thaltej', 'GJ-01-IJ-7890', 'Vijay Sharma', '155', '11', '2 min', 'Active'],
        ['Route 6 - SG Highway', 'GJ-01-KL-2345', 'Dinesh Mehta', '148', '8', '3 min', 'Active'],
        ['Route 7 - Gota', 'GJ-01-MN-6789', 'Kamal Joshi', '135', '10', '4 min', 'Active'],
        ['Route 8 - Chandkheda', 'GJ-01-OP-0123', 'Ravi Kumar', '128', '9', '2 min', 'Active'],
        ['Route 9 - Bopal', 'GJ-01-QR-4567', 'Nilesh Patel', '140', '11', '3 min', 'Active'],
        ['Route 10 - Maninagar', 'GJ-01-ST-8901', 'Arjun Desai', '112', '7', '2 min', 'Active'],
        ['Route 11 - Navrangpura', 'GJ-01-UV-2345', 'Prakash Jha', '125', '8', '5 min', 'Active'],
        ['Route 12 - Ellis Bridge', 'GJ-01-WX-6789', 'Sanjay Gupta', '174', '13', '3 min', 'Active'],
      ],
    },
    {
      id: 'engagement',
      title: 'Dashboard Engagement',
      icon: Monitor,
      color: 'bg-teal-500',
      lightBg: 'bg-teal-50',
      borderColor: 'border-teal-200',
      metrics: [
        { label: 'Avg Daily Sessions', value: '2.4', color: 'text-teal-600' },
        { label: 'Active Users', value: '1,240', color: 'text-blue-600' },
        { label: 'Peak Hour', value: '9-10 AM', color: 'text-purple-600' },
      ],
      progressValue: 76,
      progressColor: 'bg-teal-500',
      detailHeaders: ['Role', 'Avg Daily Logins', 'Top 3 Dashlets', 'Avg Session'],
      detailRows: [
        ['Principal', '4.2', 'Attendance, Approvals, Finance', '18 min'],
        ['Teachers', '2.1', 'Timetable, Homework, Marks Entry', '8 min'],
        ['Parents', '1.4', 'Fee Payment, Attendance, Messages', '5 min'],
        ['Students', '0.8', 'Homework, Results, Timetable', '4 min'],
        ['Accountant', '3.6', 'Fee Collection, Receipts, Reports', '22 min'],
      ],
    },
    {
      id: 'rankTrend',
      title: 'Student Rank Trend',
      icon: TrendingUp,
      color: 'bg-rose-500',
      lightBg: 'bg-rose-50',
      borderColor: 'border-rose-200',
      metrics: [
        { label: 'Improving', value: '4', color: 'text-emerald-600' },
        { label: 'Declining', value: '1', color: 'text-red-600' },
        { label: 'Exams Tracked', value: '3', color: 'text-blue-600' },
      ],
      progressValue: 80,
      progressColor: 'bg-rose-500',
      detailHeaders: ['Student', 'Class', 'Exam 1', 'Exam 2', 'Exam 3', 'Trend'],
      detailRows: [
        ['Aarav Singh', '8A', '#5', '#3', '#2', 'Improving'],
        ['Meera Joshi', '10B', '#8', '#6', '#4', 'Improving'],
        ['Rohan Patel', '9A', '#3', '#5', '#7', 'Declining'],
        ['Ananya Sharma', '11A', '#2', '#2', '#1', 'Improving'],
        ['Karthik Nair', '12B', '#10', '#7', '#5', 'Improving'],
      ],
    },
    {
      id: 'enrollment-yoy',
      title: 'Enrollment Comparison (YoY)',
      icon: TrendingUp,
      color: 'bg-indigo-500',
      lightBg: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      metrics: [
        { label: '2025-26 Total', value: '1,850', color: 'text-indigo-600' },
        { label: '2024-25 Total', value: '1,720', color: 'text-blue-600' },
        { label: 'Growth', value: '+7.6%', color: 'text-emerald-600' },
      ],
      progressValue: 76,
      progressColor: 'bg-indigo-500',
      detailHeaders: ['Grade', '2024-25', '2025-26', 'Change', '% Change'],
      detailRows: [
        ['Grade 1', '145', '158', '+13', '+9.0%'],
        ['Grade 5', '152', '148', '-4', '-2.6%'],
        ['Grade 10', '168', '182', '+14', '+8.3%'],
        ['Grade 12', '134', '141', '+7', '+5.2%'],
        ['Total', '1,720', '1,850', '+130', '+7.6%'],
      ],
    },
    {
      id: 'teacher-mapping',
      title: 'Subject-Teacher Mapping',
      icon: Users,
      color: 'bg-violet-500',
      lightBg: 'bg-violet-50',
      borderColor: 'border-violet-200',
      metrics: [
        { label: 'Total Subjects', value: '24', color: 'text-violet-600' },
        { label: 'Total Teachers', value: '62', color: 'text-blue-600' },
        { label: 'Unmapped', value: '3', color: 'text-red-600' },
      ],
      progressValue: 88,
      progressColor: 'bg-violet-500',
      detailHeaders: ['Subject', 'Teacher', 'Classes', 'Periods/Week', 'Workload'],
      detailRows: [
        ['Mathematics', 'Mr. Sharma', '8A, 8B, 9A, 10A', '24', 'High'],
        ['English', 'Ms. D\'Souza', '9A, 9B, 10A, 10B', '20', 'Normal'],
        ['Science', 'Mrs. Iyer', '10A, 10B', '12', 'Normal'],
        ['Hindi', 'Mrs. Mishra', '6A, 6B, 7A, 7B, 8A', '25', 'Overloaded'],
        ['Computer Sc.', 'Mr. Joshi', '9A, 9B, 10A, 10B, 11, 12', '24', 'High'],
      ],
    },
    {
      id: 'udise-export',
      title: 'UDISE+ Data Export',
      icon: FileSpreadsheet,
      color: 'bg-orange-500',
      lightBg: 'bg-orange-50',
      borderColor: 'border-orange-200',
      metrics: [
        { label: 'Last Export', value: 'Jan 2026', color: 'text-orange-600' },
        { label: 'Data Completeness', value: '94%', color: 'text-emerald-600' },
        { label: 'Missing Fields', value: '8', color: 'text-red-600' },
      ],
      progressValue: 94,
      progressColor: 'bg-orange-500',
      detailHeaders: ['Section', 'Fields', 'Complete', 'Missing', 'Status'],
      detailRows: [
        ['School Profile', '24', '24', '0', 'Complete'],
        ['Enrollment', '36', '36', '0', 'Complete'],
        ['Infrastructure', '28', '25', '3', 'Incomplete'],
        ['Teacher Data', '32', '30', '2', 'Incomplete'],
        ['Facilities', '18', '15', '3', 'Incomplete'],
      ],
    },
    {
      id: 'teacher-workload',
      title: 'Teacher Workload Analysis',
      icon: BarChart3,
      color: 'bg-cyan-500',
      lightBg: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      metrics: [
        { label: 'Avg Periods/Week', value: '22', color: 'text-cyan-600' },
        { label: 'Overloaded (>28)', value: '4', color: 'text-red-600' },
        { label: 'Underloaded (<16)', value: '2', color: 'text-amber-600' },
      ],
      progressValue: 82,
      progressColor: 'bg-cyan-500',
      detailHeaders: ['Teacher', 'Subject', 'Periods/Week', 'Classes', 'Status'],
      detailRows: [
        ['Mrs. Mishra', 'Hindi', '30', '8A-8B, 9A-9B, 10A', 'Overloaded'],
        ['Mr. Sharma', 'Mathematics', '28', '8A, 9A, 10A-10B', 'High'],
        ['Ms. D\'Souza', 'English', '22', '9A-9B, 10A-10B', 'Normal'],
        ['Mr. Reddy', 'Social Science', '14', '10A, 10B', 'Underloaded'],
        ['Mrs. Kulkarni', 'Art', '12', '6-10', 'Underloaded'],
      ],
    },
    {
      id: 'nep-outcomes',
      title: 'Learning Outcome Attainment (NEP)',
      icon: GraduationCap,
      color: 'bg-rose-500',
      lightBg: 'bg-rose-50',
      borderColor: 'border-rose-200',
      metrics: [
        { label: 'Subjects Mapped', value: '18/24', color: 'text-rose-600' },
        { label: 'Avg Attainment', value: '72%', color: 'text-blue-600' },
        { label: 'Below Threshold', value: '3 subjects', color: 'text-amber-600' },
      ],
      progressValue: 72,
      progressColor: 'bg-rose-500',
      detailHeaders: ['Subject', 'Learning Outcomes', 'Assessed', 'Attainment %', 'Status'],
      detailRows: [
        ['Mathematics', '12', '10', '78%', 'On Track'],
        ['Science', '15', '13', '71%', 'On Track'],
        ['English', '10', '10', '82%', 'Exceeding'],
        ['Hindi', '8', '6', '58%', 'Below Target'],
        ['Social Science', '10', '8', '65%', 'At Risk'],
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${theme.highlight}`}>Reports</h1>
          <p className={`text-xs ${theme.iconColor} mt-0.5`}>Key metrics at a glance. Click &quot;View Details&quot; for detailed breakdowns.</p>
        </div>
        <button className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold flex items-center gap-1`}>
          <Download size={12} /> Export All
        </button>
      </div>


      {/* ─── MOBILE APP PREVIEW ─── */}
      <MobilePreviewToggle theme={theme} mobileContent={
        <MobileFrame title="Reports" theme={theme}>
          <div className="bg-white rounded-xl border border-gray-200 p-2.5">
            <span className="text-[10px] font-bold text-gray-800 mb-2 block">Report Cards</span>
            <div className="grid grid-cols-2 gap-2">
              {[{ title: "Academic Report", icon: "📊", color: "bg-purple-50 border-purple-200", count: "12 classes" },{ title: "Attendance", icon: "📋", color: "bg-blue-50 border-blue-200", count: "Monthly" },{ title: "Fee Collection", icon: "💰", color: "bg-emerald-50 border-emerald-200", count: "₹24.5L" },{ title: "Staff Report", icon: "👥", color: "bg-amber-50 border-amber-200", count: "98 staff" }].map((r, i) => (<button key={i} className={`${r.color} border rounded-xl p-3 text-center`}><span className="text-xl block mb-1">{r.icon}</span><p className="text-[10px] font-bold text-gray-800">{r.title}</p><p className="text-[8px] text-gray-500 mt-0.5">{r.count}</p><div className="mt-1.5 flex items-center justify-center gap-1 text-[8px] text-blue-600 font-bold"><span>{"⤓"}</span> Download PDF</div></button>))}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-2.5">
            <div className="flex items-center justify-between mb-2"><span className="text-[10px] font-bold text-gray-800">Publish Results</span><span className="text-[8px] text-gray-500">Unit Test 3</span></div>
            {[{ cls: "Class 1-5", status: "Published", date: "Feb 25" },{ cls: "Class 6-8", status: "Ready", date: "Awaiting" },{ cls: "Class 9-10", status: "Pending", date: "Marks incomplete" },{ cls: "Class 11-12", status: "Ready", date: "Awaiting" }].map((r, i) => (<div key={i} className="flex items-center gap-2 py-2 border-t border-gray-100"><div className="flex-1"><p className="text-[10px] font-bold text-gray-800">{r.cls}</p><p className="text-[8px] text-gray-500">{r.date}</p></div>{r.status === "Published" ? (<span className="text-[8px] px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 font-bold">{"✓"} Published</span>) : r.status === "Ready" ? (<button className="text-[8px] px-2.5 py-1 rounded-full bg-blue-500 text-white font-bold">Publish Now</button>) : (<span className="text-[8px] px-2 py-1 rounded-full bg-gray-100 text-gray-500 font-bold">Incomplete</span>)}</div>))}
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-2.5">
            <span className="text-[10px] font-bold text-gray-800 mb-2 block">Share Reports</span>
            {[{ name: "Term 1 Report Cards", recipients: "All Parents", format: "PDF" },{ name: "Board Exam Analysis", recipients: "Management", format: "Excel" }].map((s, i) => (<div key={i} className="p-2 rounded-lg bg-gray-50 border border-gray-100 mb-1.5"><p className="text-[10px] font-bold text-gray-800">{s.name}</p><p className="text-[8px] text-gray-500">{s.recipients} {"•"} {s.format}</p><div className="flex gap-1.5 mt-1.5"><button className="flex-1 py-1.5 rounded-lg bg-green-500 text-white text-[8px] font-bold flex items-center justify-center gap-1">{"📱"} WhatsApp</button><button className="flex-1 py-1.5 rounded-lg bg-blue-500 text-white text-[8px] font-bold flex items-center justify-center gap-1">{"✉"} Email</button></div></div>))}
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-2.5">
            <span className="text-[10px] font-bold text-gray-800 mb-2 block">Top Performers</span>
            {[{ rank: 1, name: "Ananya Sharma", cls: "8A", pct: "97.4%" },{ rank: 2, name: "Vivaan Mehta", cls: "10B", pct: "96.8%" },{ rank: 3, name: "Diya Reddy", cls: "9A", pct: "95.2%" }].map((t, i) => (<div key={i} className="flex items-center gap-2 py-1.5 border-t border-gray-100"><span className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold ${t.rank === 1 ? "bg-yellow-100 text-yellow-700" : t.rank === 2 ? "bg-gray-100 text-gray-600" : "bg-orange-100 text-orange-600"}`}>{t.rank}</span><div className="flex-1"><p className="text-[10px] font-bold text-gray-800">{t.name}</p><p className="text-[8px] text-gray-500">Class {t.cls}</p></div><span className="text-[10px] font-bold text-purple-600">{t.pct}</span></div>))}
          </div>
        </MobileFrame>
      } />

      {/* Overview Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportCards.map(card => {
          const isExpanded = expandedReport === card.id;
          return (
            <div key={card.id} className={`${isExpanded ? 'col-span-full' : ''}`}>
              <div className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden hover:shadow-lg transition-all`}>
                {/* Card Header with colored accent */}
                <div className={`${card.lightBg} ${card.borderColor} border-b px-5 pt-4 pb-3`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center text-white`}>
                      <card.icon size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-sm font-bold ${theme.highlight}`}>{card.title}</h4>
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="p-4 space-y-3">
                  <div className={`grid ${card.metrics.length === 4 ? 'grid-cols-4' : 'grid-cols-3'} gap-3`}>
                    {card.metrics.map((m, mi) => (
                      <div key={mi} className={`${theme.secondaryBg} rounded-xl p-3 text-center`}>
                        <p className={`text-lg font-bold ${m.color}`}>{m.value}</p>
                        <p className={`text-[10px] font-medium ${theme.iconColor} mt-0.5`}>{m.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Progress bar */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] font-bold ${theme.iconColor}`}>Overall</span>
                      <span className={`text-[10px] font-bold ${theme.highlight}`}>{card.progressValue}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                      <div className={`h-full rounded-full ${card.progressColor} transition-all`} style={{ width: `${card.progressValue}%` }} />
                    </div>
                  </div>

                  {/* View Details button */}
                  <button
                    onClick={() => setExpandedReport(isExpanded ? null : card.id)}
                    className={`w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                      isExpanded ? `${card.color} text-white` : `${theme.secondaryBg} ${theme.highlight} ${theme.buttonHover}`
                    }`}
                  >
                    {isExpanded ? <><X size={12} /> Close Details</> : <><ArrowRight size={12} /> View Details &rarr;</>}
                  </button>
                </div>

                {/* Expanded Detail Table */}
                {isExpanded && (
                  <div className={`border-t ${theme.border} p-4`}>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className={`border-b ${theme.border}`}>
                            {card.detailHeaders.map((h, hi) => (
                              <th key={hi} className={`text-[10px] font-bold ${theme.iconColor} uppercase py-2 px-3 text-left`}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {card.detailRows.map((row, ri) => (
                            <tr key={ri} className={`border-b ${theme.border} last:border-b-0 ${theme.buttonHover}`}>
                              {row.map((cell, ci) => (
                                <td key={ci} className={`text-xs py-2.5 px-3 ${ci === 0 ? `font-bold ${theme.highlight}` : theme.iconColor}`}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {/* Sparkline visualization for Rank Trend */}
                    {card.id === 'rankTrend' && (
                      <div className={`mt-3 pt-3 border-t ${theme.border}`}>
                        <p className={`text-[10px] font-bold uppercase ${theme.iconColor} mb-2`}>Visual Rank Trend (Sparklines)</p>
                        <div className="grid grid-cols-5 gap-3">
                          {rankTrendStudents.map((s, i) => {
                            const maxRank = 12;
                            const points = s.ranks.map((r, idx) => {
                              const x = 5 + idx * 20;
                              const y = 2 + (r / maxRank) * 16;
                              return `${x},${y}`;
                            });
                            const polyline = points.join(' ');
                            const color = s.trend === 'up' ? '#10b981' : '#ef4444';
                            return (
                              <div key={i} className={`${theme.secondaryBg} rounded-xl p-3 text-center`}>
                                <svg viewBox="0 0 50 20" className="w-16 h-8 mx-auto mb-1">
                                  <polyline points={polyline} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  {s.ranks.map((r, idx) => (
                                    <circle key={idx} cx={5 + idx * 20} cy={2 + (r / maxRank) * 16} r="2" fill={color} />
                                  ))}
                                </svg>
                                <p className={`text-[10px] font-bold ${theme.highlight}`}>{s.name}</p>
                                <p className={`text-[9px] ${theme.iconColor}`}>{s.cls} — #{s.ranks[2]}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                      <button className={`px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold flex items-center gap-1`}>
                        <Download size={10} /> Download PDF
                      </button>
                      <button className={`px-3 py-1.5 rounded-xl border ${theme.border} text-xs font-bold ${theme.highlight} flex items-center gap-1`}>
                        <FileText size={10} /> Full Report
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Exam Result Publishing ── */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 space-y-4`}>
        <div className="flex items-center gap-2">
          <CalendarCheck size={18} className={theme.primaryText} />
          <h3 className={`text-sm font-bold ${theme.highlight}`}>Exam Result Publishing</h3>
          <span title="Control when exam results go live to parents and students"><Info size={14} className={`${theme.iconColor} cursor-help`} /></span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className={theme.secondaryBg}>
                {['Exam Name', 'Class', 'Marks Status', 'Published Status', 'Action'].map(h => (
                  <th key={h} className={`px-3 py-2 text-left text-[10px] font-bold ${theme.iconColor} uppercase`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { exam: 'Term 1', cls: 'All Classes', marks: '100%', published: 'Published', canPublish: false },
                { exam: 'Term 2', cls: 'Class 1-5', marks: '92%', published: 'Draft', canPublish: false },
                { exam: 'Term 2', cls: 'Class 6-10', marks: '78%', published: 'Not Ready', canPublish: false },
                { exam: 'Annual', cls: 'All Classes', marks: '0%', published: 'Upcoming', canPublish: false },
              ].map((r, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{r.exam}</td>
                  <td className={`px-3 py-2 ${theme.iconColor}`}>{r.cls}</td>
                  <td className={`px-3 py-2 font-bold ${r.marks === '100%' ? 'text-emerald-600' : r.marks === '0%' ? theme.iconColor : 'text-amber-600'}`}>{r.marks}</td>
                  <td className="px-3 py-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      r.published === 'Published' ? 'bg-emerald-100 text-emerald-700' :
                      r.published === 'Draft' ? 'bg-amber-100 text-amber-700' :
                      r.published === 'Not Ready' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>{r.published === 'Published' ? '\u2705 ' : ''}{r.published}</span>
                  </td>
                  <td className="px-3 py-2">
                    {r.marks === '100%' && r.published !== 'Published' ? (
                      <button onClick={() => window.alert('Publishing results... (Blueprint demo)')} className={`px-2 py-1 rounded-lg ${theme.primary} text-white text-[10px] font-bold`}>Publish</button>
                    ) : r.published === 'Published' ? (
                      <span className={`text-[10px] ${theme.iconColor}`}>--</span>
                    ) : (
                      <button disabled className="px-2 py-1 rounded-lg bg-gray-100 text-gray-400 text-[10px] font-bold cursor-not-allowed">Publish</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex items-center gap-2">
              <Eye size={14} className={theme.iconColor} />
              <span className={`text-xs font-bold ${theme.highlight}`}>Preview before publish</span>
            </div>
            <button onClick={() => setPreviewToggle(!previewToggle)} className={`w-9 h-5 rounded-full relative transition-colors ${previewToggle ? theme.primary : 'bg-gray-300'}`}>
              <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${previewToggle ? 'translate-x-4' : 'translate-x-0.5'}`} />
            </button>
          </div>
          <div className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex items-center gap-2">
              <Smartphone size={14} className={theme.iconColor} />
              <span className={`text-xs font-bold ${theme.highlight}`}>Notify parents on publish</span>
            </div>
            <button onClick={() => setNotifyToggle(!notifyToggle)} className={`w-9 h-5 rounded-full relative transition-colors ${notifyToggle ? theme.primary : 'bg-gray-300'}`}>
              <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${notifyToggle ? 'translate-x-4' : 'translate-x-0.5'}`} />
            </button>
          </div>
          <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
            <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Scheduled publish</label>
            <input type="date" value={scheduleDate} onChange={e => setScheduleDate(e.target.value)} className={`w-full px-2 py-1 rounded-lg text-xs border ${theme.border} ${theme.inputBg} ${theme.highlight}`} />
          </div>
        </div>
        <p className={`text-[10px] ${theme.iconColor} flex items-center gap-1`}>
          <Smartphone size={10} /> Push + SMS + Email notification to parents when results are published
        </p>
      </div>

      {/* ── Fee Collection: Year-over-Year ── */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 space-y-4`}>
        <div className="flex items-center gap-2">
          <IndianRupee size={18} className="text-emerald-500" />
          <h3 className={`text-sm font-bold ${theme.highlight}`}>Fee Collection: Year-over-Year</h3>
          <span title="Compare fee collection trends across academic years"><Info size={14} className={`${theme.iconColor} cursor-help`} /></span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className={theme.secondaryBg}>
                {['Category', '2024-25', '2025-26', 'Change %'].map(h => (
                  <th key={h} className={`px-3 py-2 text-left text-[10px] font-bold ${theme.iconColor} uppercase`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { cat: 'Tuition', prev: '\u20B91.1 Cr', curr: '\u20B91.2 Cr', pct: '+9.1%', up: true },
                { cat: 'Transport', prev: '\u20B915L', curr: '\u20B918L', pct: '+20%', up: true },
                { cat: 'Activities', prev: '\u20B94L', curr: '\u20B95L', pct: '+25%', up: true },
              ].map((r, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{r.cat}</td>
                  <td className={`px-3 py-2 ${theme.iconColor}`}>{r.prev}</td>
                  <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{r.curr}</td>
                  <td className={`px-3 py-2 font-bold ${r.up ? 'text-emerald-600' : 'text-red-600'}`}>{r.up ? '\u2191' : '\u2193'} {r.pct}</td>
                </tr>
              ))}
              <tr className={`border-t-2 ${theme.border}`}>
                <td className={`px-3 py-2 font-bold ${theme.highlight}`}>Total</td>
                <td className={`px-3 py-2 font-bold ${theme.iconColor}`}>{'\u20B9'}1.34 Cr</td>
                <td className={`px-3 py-2 font-bold ${theme.primaryText}`}>{'\u20B9'}1.48 Cr</td>
                <td className="px-3 py-2 font-bold text-emerald-600">{'\u2191'} +10.4%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Board Exam Result Analysis ── */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 space-y-4`}>
        <div className="flex items-center gap-2">
          <GraduationCap size={18} className="text-purple-500" />
          <h3 className={`text-sm font-bold ${theme.highlight}`}>Board Exam Result Analysis</h3>
          <span title="Compare school performance against state and national board averages"><Info size={14} className={`${theme.iconColor} cursor-help`} /></span>
        </div>
        {/* School vs Board Average */}
        <div className="grid grid-cols-3 gap-3">
          <div className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
            <p className="text-lg font-bold text-purple-600">82.4%</p>
            <p className={`text-[10px] ${theme.iconColor}`}>School Average</p>
          </div>
          <div className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
            <p className="text-lg font-bold text-blue-600">68.2%</p>
            <p className={`text-[10px] ${theme.iconColor}`}>State Average</p>
          </div>
          <div className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
            <p className="text-lg font-bold text-amber-600">71.5%</p>
            <p className={`text-[10px] ${theme.iconColor}`}>National Average</p>
          </div>
        </div>
        {/* Subject-wise comparison */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className={theme.secondaryBg}>
                {['Subject', 'School %', 'Board Avg %', 'Difference'].map(h => (
                  <th key={h} className={`px-3 py-2 text-left text-[10px] font-bold ${theme.iconColor} uppercase`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { sub: 'Mathematics', school: 78, board: 62 },
                { sub: 'Science', school: 85, board: 65 },
                { sub: 'English', school: 88, board: 72 },
              ].map((r, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{r.sub}</td>
                  <td className={`px-3 py-2 font-bold text-emerald-600`}>{r.school}%</td>
                  <td className={`px-3 py-2 ${theme.iconColor}`}>{r.board}%</td>
                  <td className="px-3 py-2 font-bold text-emerald-600">+{r.school - r.board}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Toppers */}
        <div>
          <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-2`}>Top Performers</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { name: 'Ananya Sharma', marks: '97.4%', rank: 'School Rank #1' },
              { name: 'Vivaan Mehta', marks: '96.8%', rank: 'School Rank #2' },
              { name: 'Diya Reddy', marks: '95.2%', rank: 'School Rank #3' },
            ].map((t, i) => (
              <div key={i} className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
                <p className={`text-xs font-bold ${theme.highlight}`}>{t.name}</p>
                <p className="text-sm font-bold text-purple-600">{t.marks}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{t.rank}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Pass Rate */}
        <div className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
          <div>
            <p className={`text-xs font-bold ${theme.highlight}`}>Pass Rate</p>
            <p className={`text-[10px] ${theme.iconColor}`}>School vs State</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-sm font-bold text-emerald-600">98.5%</p>
              <p className={`text-[10px] ${theme.iconColor}`}>School</p>
            </div>
            <span className={`text-xs ${theme.iconColor}`}>vs</span>
            <div className="text-center">
              <p className="text-sm font-bold text-blue-600">91.2%</p>
              <p className={`text-[10px] ${theme.iconColor}`}>State</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cross-module connectivity banner */}
      <div className={`px-4 py-2.5 rounded-xl border ${theme.border} ${theme.secondaryBg} flex items-center gap-2`}>
        <Info size={14} className={theme.primaryText} />
        <p className={`text-[10px] font-bold ${theme.iconColor}`}>{'\u2192'} Connected: ExamConfig (SSA) {'\u2192'} Gradebook (Teacher) {'\u2192'} Results (Student/Parent) {'\u2192'} Reports (Principal)</p>
      </div>

      {/* Report Generation Summary */}
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