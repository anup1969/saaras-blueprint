'use client';
import React, { useState } from 'react';
import { SSAToggle, SectionCard, ModuleHeader, SelectField, InputField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

export default function AnalyticsBIConfigModule({ theme }: { theme: Theme }) {
  const [predictiveAI, setPredictiveAI] = useState(false);
  const [comparativeAnalysis, setComparativeAnalysis] = useState(true);
  const [autoMonthlyReports, setAutoMonthlyReports] = useState(true);
  const [dataRetention, setDataRetention] = useState('5 years');

  // Subject Performance Heatmap
  const [heatmapEnabled, setHeatmapEnabled] = useState(false);
  const [heatmapColorScheme, setHeatmapColorScheme] = useState('Green-Yellow-Red');
  const [heatmapCompPeriod, setHeatmapCompPeriod] = useState('Term-wise');
  // Teacher Effectiveness Metrics
  const [teacherMetricsEnabled, setTeacherMetricsEnabled] = useState(false);
  const [teacherMetrics, setTeacherMetrics] = useState<Record<string, boolean>>({ 'Attendance': true, 'Results': true, 'Feedback': true });
  // Cohort Analysis
  const [cohortEnabled, setCohortEnabled] = useState(false);
  const [cohortDefinition, setCohortDefinition] = useState('Admission Year');
  // Revenue Forecasting
  const [revForecastEnabled, setRevForecastEnabled] = useState(false);
  const [forecastPeriod, setForecastPeriod] = useState('Quarterly');
  // Cost Per Student Analysis
  const [costPerStudentEnabled, setCostPerStudentEnabled] = useState(false);
  const [costCategories, setCostCategories] = useState<Record<string, boolean>>({ 'Salaries': true, 'Infrastructure': true, 'Transport': false, 'Technology': true, 'Canteen': false });
  // Resource Utilization
  const [resourceUtilEnabled, setResourceUtilEnabled] = useState(false);
  const [resourceTypes, setResourceTypes] = useState<Record<string, boolean>>({ 'Rooms': true, 'Labs': true, 'Buses': false, 'Library': true });
  // Custom Dashboard Builder
  const [customDashEnabled, setCustomDashEnabled] = useState(false);
  const [maxWidgets, setMaxWidgets] = useState('8');
  const [widgetTypes, setWidgetTypes] = useState<Record<string, boolean>>({ 'Chart': true, 'Table': true, 'KPI Card': true, 'Calendar': false, 'List': true });
  // AI Summary Generation
  const [aiSummaryEnabled, setAiSummaryEnabled] = useState(false);
  const [aiSummaryFrequency, setAiSummaryFrequency] = useState('Weekly');
  const [widgets, setWidgets] = useState<Record<string, boolean>>({
    'Attendance Trends': true, 'Fee Collection': true, 'Exam Performance': true, 'Staff Metrics': false,
  });

  // Gap 16: Force-Push Mandatory Dashlet
  const [forcePushEnabled, setForcePushEnabled] = useState(false);
  const [dashletName, setDashletName] = useState('Fee Payment Reminder');
  const [targetRole, setTargetRole] = useState('All Roles');
  const [dashletExpiry, setDashletExpiry] = useState('7 days');

  // Gap 21: KPI Threshold Alerts
  const [thresholds, setThresholds] = useState([
    { kpi: 'Attendance', green: '90', amber: '75', red: '75' },
    { kpi: 'Fee Collection', green: '85', amber: '70', red: '70' },
    { kpi: 'Exam Pass Rate', green: '80', amber: '60', red: '60' },
  ]);

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

      <SectionCard title="Force-Push Mandatory Dashlet" subtitle="Push a required dashlet to all users — non-removable until task is done" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Enable Force-Push</p>
              <p className={`text-[10px] ${theme.iconColor}`}>When enabled, the configured dashlet appears on all targeted dashboards and cannot be dismissed</p>
            </div>
            <SSAToggle on={forcePushEnabled} onChange={() => setForcePushEnabled(!forcePushEnabled)} theme={theme} />
          </div>
          {forcePushEnabled && (
            <div className="space-y-3">
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Dashlet Name</p>
                <InputField value={dashletName} onChange={setDashletName} theme={theme} placeholder="e.g., Fee Payment Reminder" />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Target Roles</p>
                <SelectField options={['All Roles', 'Teachers Only', 'Parents Only', 'Students Only']} value={targetRole} onChange={setTargetRole} theme={theme} />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Expiry</p>
                <InputField value={dashletExpiry} onChange={setDashletExpiry} theme={theme} placeholder="e.g., 7 days or Until task complete" />
              </div>
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard title="KPI Threshold Alerts" subtitle="Configure red/amber/green thresholds for dashboard KPIs" theme={theme}>
        <div className="space-y-2">
          <div className={`grid grid-cols-5 gap-2 px-2.5 py-1.5`}>
            <p className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>KPI</p>
            <p className={`text-[10px] font-bold text-emerald-600 uppercase text-center`}>Green (&gt;%)</p>
            <p className={`text-[10px] font-bold text-amber-600 uppercase text-center`}>Amber (%)</p>
            <p className={`text-[10px] font-bold text-red-600 uppercase text-center`}>Red (&lt;%)</p>
            <p className={`text-[10px] font-bold ${theme.iconColor} uppercase text-center`}>Status</p>
          </div>
          {thresholds.map((t, i) => (
            <div key={t.kpi} className={`grid grid-cols-5 gap-2 items-center p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-xs font-bold ${theme.highlight}`}>{t.kpi}</p>
              <div className="flex items-center gap-1.5 justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <input value={t.green} onChange={e => { const n = [...thresholds]; n[i] = { ...n[i], green: e.target.value }; setThresholds(n); }}
                  className={`w-14 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center font-bold ${theme.highlight} outline-none`} />
              </div>
              <div className="flex items-center gap-1.5 justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                <input value={t.amber} onChange={e => { const n = [...thresholds]; n[i] = { ...n[i], amber: e.target.value }; setThresholds(n); }}
                  className={`w-14 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center font-bold ${theme.highlight} outline-none`} />
              </div>
              <div className="flex items-center gap-1.5 justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
                <input value={t.red} onChange={e => { const n = [...thresholds]; n[i] = { ...n[i], red: e.target.value }; setThresholds(n); }}
                  className={`w-14 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center font-bold ${theme.highlight} outline-none`} />
              </div>
              <div className="flex justify-center">
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[9px] font-bold">Active</span>
              </div>
            </div>
          ))}
          <p className={`text-[10px] ${theme.iconColor} mt-2`}>KPIs falling below red threshold will trigger automatic alerts to the Principal and School Admin dashboards.</p>
        </div>
      </SectionCard>

      <SectionCard title="Subject Performance Heatmap" subtitle="Visual heatmap of subject-wise performance across classes" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Enable Heatmap</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Show color-coded subject performance grid on analytics dashboard</p>
            </div>
            <SSAToggle on={heatmapEnabled} onChange={() => setHeatmapEnabled(!heatmapEnabled)} theme={theme} />
          </div>
          {heatmapEnabled && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Color Scheme</p>
                <SelectField options={['Green-Yellow-Red', 'Blue-White-Red', 'Cool-Warm', 'Monochrome']} value={heatmapColorScheme} onChange={setHeatmapColorScheme} theme={theme} />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Comparison Period</p>
                <SelectField options={['Monthly', 'Term-wise', 'Yearly']} value={heatmapCompPeriod} onChange={setHeatmapCompPeriod} theme={theme} />
              </div>
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Teacher Effectiveness Metrics" subtitle="Track and visualize teacher performance indicators" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Enable Teacher Metrics</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Aggregate teacher performance data across multiple dimensions</p>
            </div>
            <SSAToggle on={teacherMetricsEnabled} onChange={() => setTeacherMetricsEnabled(!teacherMetricsEnabled)} theme={theme} />
          </div>
          {teacherMetricsEnabled && (
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Metrics to Track</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(teacherMetrics).map(([metric, on]) => (
                  <label key={metric} className={`flex items-center gap-2 p-2 rounded-lg ${theme.secondaryBg} cursor-pointer`}>
                    <input type="checkbox" checked={on} onChange={() => setTeacherMetrics(p => ({ ...p, [metric]: !p[metric] }))} className="accent-emerald-500 w-3.5 h-3.5" />
                    <span className={`text-[10px] font-medium ${theme.highlight}`}>{metric}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Cohort Analysis" subtitle="Analyze student groups over time based on shared characteristics" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Enable Cohort Analysis</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Group students by shared traits and track outcomes over time</p>
            </div>
            <SSAToggle on={cohortEnabled} onChange={() => setCohortEnabled(!cohortEnabled)} theme={theme} />
          </div>
          {cohortEnabled && (
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Cohort Definition</p>
              <SelectField options={['Admission Year', 'Class', 'Section', 'Gender', 'Category']} value={cohortDefinition} onChange={setCohortDefinition} theme={theme} />
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Revenue Forecasting" subtitle="Predict future revenue based on historical fee collection data" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Enable Revenue Forecasting</p>
              <p className={`text-[10px] ${theme.iconColor}`}>AI-powered revenue prediction based on enrollment and fee patterns</p>
            </div>
            <SSAToggle on={revForecastEnabled} onChange={() => setRevForecastEnabled(!revForecastEnabled)} theme={theme} />
          </div>
          {revForecastEnabled && (
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Forecast Period</p>
              <SelectField options={['Monthly', 'Quarterly', 'Yearly']} value={forecastPeriod} onChange={setForecastPeriod} theme={theme} />
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Cost Per Student Analysis" subtitle="Calculate and track per-student operational costs" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Enable Cost Analysis</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Break down total school expenses per student across categories</p>
            </div>
            <SSAToggle on={costPerStudentEnabled} onChange={() => setCostPerStudentEnabled(!costPerStudentEnabled)} theme={theme} />
          </div>
          {costPerStudentEnabled && (
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Cost Categories</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(costCategories).map(([cat, on]) => (
                  <label key={cat} className={`flex items-center gap-2 p-2 rounded-lg ${theme.secondaryBg} cursor-pointer`}>
                    <input type="checkbox" checked={on} onChange={() => setCostCategories(p => ({ ...p, [cat]: !p[cat] }))} className="accent-emerald-500 w-3.5 h-3.5" />
                    <span className={`text-[10px] font-medium ${theme.highlight}`}>{cat}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Resource Utilization" subtitle="Track how efficiently school resources are being used" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Enable Resource Tracking</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Monitor utilization rates of rooms, labs, buses, and other facilities</p>
            </div>
            <SSAToggle on={resourceUtilEnabled} onChange={() => setResourceUtilEnabled(!resourceUtilEnabled)} theme={theme} />
          </div>
          {resourceUtilEnabled && (
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Resources to Track</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(resourceTypes).map(([res, on]) => (
                  <label key={res} className={`flex items-center gap-2 p-2 rounded-lg ${theme.secondaryBg} cursor-pointer`}>
                    <input type="checkbox" checked={on} onChange={() => setResourceTypes(p => ({ ...p, [res]: !p[res] }))} className="accent-emerald-500 w-3.5 h-3.5" />
                    <span className={`text-[10px] font-medium ${theme.highlight}`}>{res}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Custom Dashboard Builder" subtitle="Allow users to create personalized analytics dashboards" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Enable Custom Dashboards</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Users can build their own dashboards by dragging widgets</p>
            </div>
            <SSAToggle on={customDashEnabled} onChange={() => setCustomDashEnabled(!customDashEnabled)} theme={theme} />
          </div>
          {customDashEnabled && (
            <>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max Widgets per Dashboard</p>
                <InputField value={maxWidgets} onChange={setMaxWidgets} theme={theme} type="number" />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Widget Types</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(widgetTypes).map(([wt, on]) => (
                    <label key={wt} className={`flex items-center gap-2 p-2 rounded-lg ${theme.secondaryBg} cursor-pointer`}>
                      <input type="checkbox" checked={on} onChange={() => setWidgetTypes(p => ({ ...p, [wt]: !p[wt] }))} className="accent-emerald-500 w-3.5 h-3.5" />
                      <span className={`text-[10px] font-medium ${theme.highlight}`}>{wt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </SectionCard>

      <SectionCard title="AI Summary Generation" subtitle="Auto-generate natural language summaries of analytics data" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Enable AI Summaries</p>
              <p className={`text-[10px] ${theme.iconColor}`}>AI generates plain-language summaries of key metrics and trends</p>
            </div>
            <SSAToggle on={aiSummaryEnabled} onChange={() => setAiSummaryEnabled(!aiSummaryEnabled)} theme={theme} />
          </div>
          {aiSummaryEnabled && (
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Summary Frequency</p>
              <SelectField options={['Daily', 'Weekly', 'Monthly']} value={aiSummaryFrequency} onChange={setAiSummaryFrequency} theme={theme} />
            </div>
          )}
        </div>
      </SectionCard>

    </div>
  );
}
