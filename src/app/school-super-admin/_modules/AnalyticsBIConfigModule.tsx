'use client';
import React, { useState } from 'react';
import { SSAToggle, SectionCard, ModuleHeader, SelectField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

export default function AnalyticsBIConfigModule({ theme }: { theme: Theme }) {
  const [predictiveAI, setPredictiveAI] = useState(false);
  const [comparativeAnalysis, setComparativeAnalysis] = useState(true);
  const [autoMonthlyReports, setAutoMonthlyReports] = useState(true);
  const [dataRetention, setDataRetention] = useState('5 years');
  const [widgets, setWidgets] = useState<Record<string, boolean>>({
    'Attendance Trends': true, 'Fee Collection': true, 'Exam Performance': true, 'Staff Metrics': false,
  });

  return (
    <div className="space-y-4">
      <ModuleHeader title="Analytics & BI Configuration" subtitle="Business intelligence, predictive analytics, and dashboard widgets" theme={theme} />

      <SectionCard title="Core Analytics" subtitle="Enable or disable analytics features" theme={theme}>
        <div className="space-y-2">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <span className={`text-xs font-bold ${theme.highlight}`}>Predictive Analytics (AI)</span>
              <p className={`text-[10px] ${theme.iconColor}`}>Uses ML to predict dropout risk, fee defaults, attendance patterns</p>
            </div>
            <SSAToggle on={predictiveAI} onChange={() => setPredictiveAI(!predictiveAI)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Comparative analysis (cross-section / cross-year)</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Compare performance across sections (A vs B) or academic years (2025 vs 2026)</p>
            </div>
            <SSAToggle on={comparativeAnalysis} onChange={() => setComparativeAnalysis(!comparativeAnalysis)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Auto-generated monthly reports</p>
              <p className={`text-[10px] ${theme.iconColor}`}>System automatically generates and emails monthly analytics summary to admin & principal</p>
            </div>
            <SSAToggle on={autoMonthlyReports} onChange={() => setAutoMonthlyReports(!autoMonthlyReports)} theme={theme} />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Dashboard Widgets" subtitle="Choose which analytics widgets appear on the admin/principal dashboard" theme={theme}>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(widgets).map(([widget, enabled]) => (
            <div key={widget} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>{widget}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{
                  ({
                    'Attendance Trends': 'Visual chart showing daily/weekly/monthly attendance patterns across classes',
                    'Fee Collection': 'Real-time fee collection dashboard with pending vs collected breakdown',
                    'Exam Performance': 'Grade distribution, pass rates, and topper lists across all exams',
                    'Staff Metrics': 'Staff attendance, workload distribution, and leave utilization stats',
                  } as Record<string, string>)[widget]
                }</p>
              </div>
              <SSAToggle on={enabled} onChange={() => setWidgets(p => ({ ...p, [widget]: !p[widget] }))} theme={theme} />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Data Retention" subtitle="How long analytics data is stored" theme={theme}>
        <SelectField options={['1 year', '3 years', '5 years', '10 years', 'Unlimited']} value={dataRetention} onChange={setDataRetention} theme={theme} />
      </SectionCard>

    </div>
  );
}
