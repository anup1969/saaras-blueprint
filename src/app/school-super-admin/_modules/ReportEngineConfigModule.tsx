'use client';

import React, { useState } from 'react';
import { SSAToggle, SectionCard, ModuleHeader, InputField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

export default function ReportEngineConfigModule({ theme }: { theme: Theme }) {
  const [scheduledEmail, setScheduledEmail] = useState(true);
  const [exportFormats, setExportFormats] = useState<Record<string, boolean>>({
    'PDF': true, 'Excel': true, 'CSV': true, 'Google Sheets': false,
  });
  const [recipients, setRecipients] = useState<Record<string, boolean>>({
    'Admin': true, 'Principal': true, 'Trustee': false,
  });
  const [autoGenerate, setAutoGenerate] = useState<Record<string, boolean>>({
    'Daily summary': false, 'Weekly summary': true, 'Monthly summary': true,
  });

  // Saved Filters
  const [savedFiltersEnabled, setSavedFiltersEnabled] = useState(false);
  const [maxSavedFilters, setMaxSavedFilters] = useState('10');
  const [filterSharing, setFilterSharing] = useState(true);
  // Dynamic Report Builder
  const [reportBuilderEnabled, setReportBuilderEnabled] = useState(false);
  const [dataSources, setDataSources] = useState<Record<string, boolean>>({ 'Students': true, 'Staff': true, 'Fees': true, 'Attendance': true, 'Exams': true, 'Transport': false, 'Library': false, 'Inventory': false });
  const [builderExportFormats, setBuilderExportFormats] = useState<Record<string, boolean>>({ 'PDF': true, 'Excel': true, 'CSV': true, 'HTML': false });

  return (
    <div className="space-y-4">
      <ModuleHeader title="Report Engine Configuration" subtitle="Scheduled reports, export formats, recipients, and auto-generation" theme={theme} />

      <SectionCard title="Email Reports" subtitle="Schedule automatic email delivery of reports" theme={theme}>
        <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
          <div className="flex-1 mr-3">
            <p className={`text-xs font-bold ${theme.highlight}`}>Scheduled email reports</p>
            <p className={`text-[10px] ${theme.iconColor}`}>System automatically emails report summaries to recipients on schedule</p>
          </div>
          <SSAToggle on={scheduledEmail} onChange={() => setScheduledEmail(!scheduledEmail)} theme={theme} />
        </div>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Export Formats" subtitle="Which file formats are available when downloading reports" theme={theme}>
          <div className="space-y-2">
            {Object.entries(exportFormats).map(([fmt, enabled]) => (
              <div key={fmt} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{fmt}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'PDF': 'Download reports as formatted PDF documents — best for printing and sharing',
                      'Excel': 'Download as Excel spreadsheets — best for further analysis and filtering',
                      'CSV': 'Download as CSV files — lightweight format for data import/export',
                      'Google Sheets': 'Export directly to Google Sheets — best for collaborative editing',
                    } as Record<string, string>)[fmt]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setExportFormats(p => ({ ...p, [fmt]: !p[fmt] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Report Recipients" subtitle="Who receives scheduled reports via email" theme={theme}>
          <div className="space-y-2">
            {Object.entries(recipients).map(([role, enabled]) => (
              <div key={role} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{role}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Admin': 'School admin receives operational reports (attendance, fees, inventory)',
                      'Principal': 'Principal receives academic and performance summary reports',
                      'Trustee': 'Trustee/management receives financial and compliance overview reports',
                    } as Record<string, string>)[role]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setRecipients(p => ({ ...p, [role]: !p[role] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Auto-Generate Reports" subtitle="System automatically creates reports on a schedule — no manual effort needed" theme={theme}>
        <div className="space-y-2">
          {Object.entries(autoGenerate).map(([period, enabled]) => (
            <div key={period} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>{period}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{
                  ({
                    'Daily summary': 'End-of-day report covering attendance, fee collection, and key events',
                    'Weekly summary': 'Weekly digest with attendance trends, pending fees, and upcoming deadlines',
                    'Monthly summary': 'Comprehensive monthly report with analytics across all modules',
                  } as Record<string, string>)[period]
                }</p>
              </div>
              <SSAToggle on={enabled} onChange={() => setAutoGenerate(p => ({ ...p, [period]: !p[period] }))} theme={theme} />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Saved Filters" subtitle="Allow users to save and reuse report filter configurations" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Enable Saved Filters</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Users can save filter combinations and quickly re-apply them</p>
            </div>
            <SSAToggle on={savedFiltersEnabled} onChange={() => setSavedFiltersEnabled(!savedFiltersEnabled)} theme={theme} />
          </div>
          {savedFiltersEnabled && (
            <>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max Saved Filters per User</p>
                <InputField value={maxSavedFilters} onChange={setMaxSavedFilters} theme={theme} type="number" />
              </div>
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>Allow Filter Sharing</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Users can share saved filters with other staff members</p>
                </div>
                <SSAToggle on={filterSharing} onChange={() => setFilterSharing(!filterSharing)} theme={theme} />
              </div>
            </>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Dynamic Report Builder" subtitle="Allow users to create custom reports by selecting data sources and fields" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Enable Report Builder</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Users can build custom reports by choosing fields, filters, and groupings</p>
            </div>
            <SSAToggle on={reportBuilderEnabled} onChange={() => setReportBuilderEnabled(!reportBuilderEnabled)} theme={theme} />
          </div>
          {reportBuilderEnabled && (
            <>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Available Data Sources</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(dataSources).map(([src, on]) => (
                    <label key={src} className={`flex items-center gap-2 p-2 rounded-lg ${theme.secondaryBg} cursor-pointer`}>
                      <input type="checkbox" checked={on} onChange={() => setDataSources(p => ({ ...p, [src]: !p[src] }))} className="accent-emerald-500 w-3.5 h-3.5" />
                      <span className={`text-[10px] font-medium ${theme.highlight}`}>{src}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Export Formats</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(builderExportFormats).map(([fmt, on]) => (
                    <label key={fmt} className={`flex items-center gap-2 p-2 rounded-lg ${theme.secondaryBg} cursor-pointer`}>
                      <input type="checkbox" checked={on} onChange={() => setBuilderExportFormats(p => ({ ...p, [fmt]: !p[fmt] }))} className="accent-emerald-500 w-3.5 h-3.5" />
                      <span className={`text-[10px] font-medium ${theme.highlight}`}>{fmt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </SectionCard>

    </div>
  );
}
