'use client';

import React, { useState } from 'react';
import { SSAToggle, SectionCard, ModuleHeader } from '../_helpers/components';
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

    </div>
  );
}
