'use client';

import { useState } from 'react';
import { type Theme } from '@/lib/themes';
import {
  Award, ClipboardCheck, IndianRupee, Briefcase, Bus,
  Download, FileText, ArrowRight, X, Monitor, TrendingUp,
} from 'lucide-react';

export default function ReportsModule({ theme }: { theme: Theme }) {
  const [expandedReport, setExpandedReport] = useState<string | null>(null);
  const [rankTrendExpanded, setRankTrendExpanded] = useState(false);

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
