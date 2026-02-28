'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { TabBar } from '@/components/shared';
import {
  Users, Award, ClipboardCheck, TrendingUp, Calendar, Star,
  Banknote, AlertTriangle, DollarSign, CreditCard,
  Briefcase, Shield, Bus, UserPlus, Download, PieChart, UserMinus, MessageSquare
} from 'lucide-react';

export default function ReportsModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Academic');
  const [expandedReport, setExpandedReport] = useState<string | null>(null);
  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Reports & Analytics</h1>
      <TabBar tabs={['Academic', 'Financial', 'Administrative']} active={tab} onChange={setTab} theme={theme} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(tab === 'Academic' ? [
          { title: 'Student Strength Report', desc: 'Class-wise, section-wise, gender-wise count', icon: Users },
          { title: 'Exam Results Analysis', desc: 'Subject-wise pass %, toppers, grade distribution', icon: Award },
          { title: 'Attendance Report', desc: 'Monthly/weekly/daily attendance trends', icon: ClipboardCheck },
          { title: 'Student Progress Cards', desc: 'Individual student performance over time', icon: TrendingUp },
          { title: 'Teacher Workload Report', desc: 'Period allocation, free periods analysis', icon: Calendar },
          { title: 'House-wise Performance', desc: 'Inter-house competition scores', icon: Star },
          { title: 'Student Demographics', desc: 'Gender split, category distribution, age analysis', icon: PieChart },
          { title: 'Student Attrition Report', desc: 'Left, transferred, dropout trends year-over-year', icon: UserMinus },
          { title: 'Remark Submission Status', desc: 'Per-class teacher remark compliance tracking', icon: MessageSquare },
        ] : tab === 'Financial' ? [
          { title: 'Fee Collection Summary', desc: 'Monthly/yearly collection vs outstanding', icon: Banknote },
          { title: 'Defaulters Report', desc: 'Student-wise fee dues with aging analysis', icon: AlertTriangle },
          { title: 'Concession Report', desc: 'All concessions granted with breakdown', icon: DollarSign },
          { title: 'Payment Mode Analysis', desc: 'Cash vs UPI vs Bank transfer breakdown', icon: CreditCard },
        ] : [
          { title: 'Staff Attendance Report', desc: 'Employee attendance trends and patterns', icon: Briefcase },
          { title: 'Visitor Log Report', desc: 'Monthly visitor statistics and purposes', icon: Shield },
          { title: 'Transport Utilization', desc: 'Route-wise bus occupancy and efficiency', icon: Bus },
          { title: 'Enquiry Conversion Report', desc: 'Admission funnel and conversion rates', icon: UserPlus },
        ]).map((r, i) => (
          <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 hover:shadow-md transition-all cursor-pointer`} onClick={() => setExpandedReport(expandedReport === r.title ? null : r.title)}>
            <r.icon size={28} className={`${theme.iconColor} mb-3`} />
            <h4 className={`text-sm font-bold ${theme.highlight} mb-1`}>{r.title}</h4>
            <p className={`text-xs ${theme.iconColor} mb-3`}>{r.desc}</p>
            <button className={`text-xs ${theme.primaryText} font-bold flex items-center gap-1`}><Download size={12} /> Generate</button>
          </div>
        ))}
      </div>

      {/* Expanded Detail Panels for new reports */}
      {expandedReport === 'Student Demographics' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 space-y-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight}`}>Student Demographics Summary</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-[10px] ${theme.iconColor} mb-1`}>Gender Split</p>
              <div className="flex gap-3">
                <span className="text-xs font-bold text-blue-600">Boys: 520 (54%)</span>
                <span className="text-xs font-bold text-pink-600">Girls: 440 (46%)</span>
              </div>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-[10px] ${theme.iconColor} mb-1`}>Category Distribution</p>
              <div className="space-y-1">
                {[
                  { cat: 'General', pct: 45 }, { cat: 'OBC', pct: 28 },
                  { cat: 'SC', pct: 12 }, { cat: 'ST', pct: 8 }, { cat: 'EWS', pct: 7 },
                ].map(c => (
                  <div key={c.cat} className="flex items-center gap-2">
                    <span className={`text-[10px] ${theme.iconColor} w-12`}>{c.cat}</span>
                    <div className={`flex-1 h-2 rounded-full ${theme.accentBg}`}>
                      <div className="h-full rounded-full bg-blue-500" style={{ width: `${c.pct}%` }} />
                    </div>
                    <span className={`text-[10px] font-bold ${theme.highlight}`}>{c.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-[10px] ${theme.iconColor} mb-1`}>Age Distribution</p>
              <div className="space-y-1">
                {[
                  { range: '3-5 yrs', count: 120 }, { range: '6-10 yrs', count: 340 },
                  { range: '11-14 yrs', count: 320 }, { range: '15-18 yrs', count: 180 },
                ].map(a => (
                  <div key={a.range} className="flex justify-between">
                    <span className={`text-[10px] ${theme.iconColor}`}>{a.range}</span>
                    <span className={`text-[10px] font-bold ${theme.highlight}`}>{a.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {expandedReport === 'Student Attrition Report' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 space-y-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight}`}>Student Attrition Report</h3>
          <div className="grid grid-cols-4 gap-3">
            <div className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
              <p className={`text-[10px] ${theme.iconColor}`}>Left</p>
              <p className="text-lg font-bold text-red-600">12</p>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
              <p className={`text-[10px] ${theme.iconColor}`}>Transferred</p>
              <p className="text-lg font-bold text-amber-600">8</p>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
              <p className={`text-[10px] ${theme.iconColor}`}>Dropout</p>
              <p className="text-lg font-bold text-red-500">3</p>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
              <p className={`text-[10px] ${theme.iconColor}`}>Total Attrition</p>
              <p className="text-lg font-bold text-slate-700">23</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-xs font-bold ${theme.highlight} mb-2`}>Year-over-Year Comparison</p>
              <div className="flex justify-between">
                <span className={`text-xs ${theme.iconColor}`}>2024-25</span>
                <span className={`text-xs font-bold ${theme.highlight}`}>28 students (2.9%)</span>
              </div>
              <div className="flex justify-between">
                <span className={`text-xs ${theme.iconColor}`}>2025-26</span>
                <span className={`text-xs font-bold text-emerald-600`}>23 students (2.4%) &#8595;</span>
              </div>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-xs font-bold ${theme.highlight} mb-2`}>Top Reasons</p>
              {[
                { reason: 'Relocation', pct: 45 }, { reason: 'Fee Issues', pct: 25 },
                { reason: 'Performance', pct: 15 }, { reason: 'Other', pct: 15 },
              ].map(r => (
                <div key={r.reason} className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] ${theme.iconColor} w-20`}>{r.reason}</span>
                  <div className={`flex-1 h-2 rounded-full ${theme.accentBg}`}>
                    <div className="h-full rounded-full bg-amber-500" style={{ width: `${r.pct}%` }} />
                  </div>
                  <span className={`text-[10px] font-bold ${theme.highlight}`}>{r.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {expandedReport === 'Remark Submission Status' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 space-y-4`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Remark Submission Compliance</h3>
            <span className={`text-xs px-3 py-1 rounded-full font-bold bg-emerald-100 text-emerald-700`}>Overall: 78%</span>
          </div>
          <div className="space-y-2">
            {[
              { cls: 'Class 1', pct: 92 }, { cls: 'Class 2', pct: 88 },
              { cls: 'Class 3', pct: 85 }, { cls: 'Class 4', pct: 80 },
              { cls: 'Class 5', pct: 75 }, { cls: 'Class 6', pct: 70 },
              { cls: 'Class 7', pct: 82 }, { cls: 'Class 8', pct: 68 },
              { cls: 'Class 9', pct: 72 }, { cls: 'Class 10', pct: 65 },
            ].map(c => (
              <div key={c.cls} className="flex items-center gap-3">
                <span className={`text-xs ${theme.highlight} w-16 font-medium`}>{c.cls}</span>
                <div className={`flex-1 h-4 rounded-full ${theme.secondaryBg} overflow-hidden`}>
                  <div
                    className={`h-full rounded-full ${c.pct >= 80 ? 'bg-emerald-500' : c.pct >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ width: `${c.pct}%` }}
                  />
                </div>
                <span className={`text-xs font-bold ${theme.highlight} w-10 text-right`}>{c.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
