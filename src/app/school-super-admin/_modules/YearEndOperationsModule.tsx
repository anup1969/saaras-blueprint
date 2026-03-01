'use client';

import React, { useState } from 'react';
import { CalendarCog, CheckCircle, AlertTriangle } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

export default function YearEndOperationsModule({ theme }: { theme: Theme }) {
  // Academic Year Rollover
  const [currentYear] = useState('2025-26');
  const [nextYear, setNextYear] = useState('2026-27');
  const [rolloverDate, setRolloverDate] = useState('2026-04-01');
  const [rolloverConfirm, setRolloverConfirm] = useState(false);

  // Student Promotion Rules
  const [autoPromote, setAutoPromote] = useState(true);
  const [minAttendance, setMinAttendance] = useState('75');
  const [failedSubjectThreshold, setFailedSubjectThreshold] = useState('2');
  const [tcAutoGenerate, setTcAutoGenerate] = useState(true);

  // Fee Structure Copy
  const [copyFees, setCopyFees] = useState(true);
  const [feeAdjustment, setFeeAdjustment] = useState('+5');
  const [feeEffectiveDate, setFeeEffectiveDate] = useState('2026-04-01');

  // Data Archival
  const [archiveOldRecords, setArchiveOldRecords] = useState(true);
  const [retentionPeriod, setRetentionPeriod] = useState('5 Years');
  const [archiveStatus, setArchiveStatus] = useState<'idle' | 'running' | 'done'>('idle');

  // Staff Contract Renewal
  const [autoFlagContracts, setAutoFlagContracts] = useState(true);
  const [renewalReminderDays, setRenewalReminderDays] = useState('30');
  const [batchRenewalStatus, setBatchRenewalStatus] = useState<'idle' | 'done'>('idle');

  // Report Card Finalization
  const [lockGradesDate, setLockGradesDate] = useState('2026-03-15');
  const [principalOverride, setPrincipalOverride] = useState(true);

  return (
    <div className="space-y-4">
      <ModuleHeader title="Year-End Operations" subtitle="Academic year rollover, promotion rules, fee copy, archival, and contract renewals" theme={theme} />

      {/* Academic Year Rollover */}
      <SectionCard title="Academic Year Rollover" subtitle="Initiate transition from current academic year to the next" theme={theme}>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Current Academic Year</p>
            <div className={`px-3 py-2 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.highlight} flex items-center gap-1.5`}>
              <CalendarCog size={13} className={theme.iconColor} /> {currentYear}
            </div>
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Next Academic Year</p>
            <InputField value={nextYear} onChange={setNextYear} theme={theme} placeholder="e.g. 2026-27" />
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Rollover Date</p>
            <InputField value={rolloverDate} onChange={setRolloverDate} theme={theme} type="date" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-3">
          {!rolloverConfirm ? (
            <button onClick={() => setRolloverConfirm(true)}
              className={`px-4 py-2 rounded-xl text-xs font-bold text-white ${theme.primary}`}>
              Initiate Rollover
            </button>
          ) : (
            <div className={`flex items-center gap-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200`}>
              <AlertTriangle size={14} className="text-amber-600" />
              <span className="text-xs text-amber-700 font-bold">Confirm rollover to {nextYear}?</span>
              <button onClick={() => setRolloverConfirm(false)} className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-600 text-white">Yes, Proceed</button>
              <button onClick={() => setRolloverConfirm(false)} className="px-3 py-1 rounded-lg text-xs font-bold bg-gray-200 text-gray-600">Cancel</button>
            </div>
          )}
        </div>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        {/* Student Promotion Rules */}
        <SectionCard title="Student Promotion Rules" subtitle="Auto-promotion criteria and TC generation for dropouts" theme={theme}>
          <div className="space-y-2.5">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Auto-Promote Passing Students</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Students meeting criteria are promoted automatically</p>
              </div>
              <SSAToggle on={autoPromote} onChange={() => setAutoPromote(!autoPromote)} theme={theme} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Minimum Attendance %</p>
                <InputField value={minAttendance} onChange={setMinAttendance} theme={theme} type="number" />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Failed Subject Threshold</p>
                <InputField value={failedSubjectThreshold} onChange={setFailedSubjectThreshold} theme={theme} type="number" />
              </div>
            </div>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>TC Auto-Generation for Dropouts</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Transfer certificates generated for students leaving mid-year</p>
              </div>
              <SSAToggle on={tcAutoGenerate} onChange={() => setTcAutoGenerate(!tcAutoGenerate)} theme={theme} />
            </div>
          </div>
        </SectionCard>

        {/* Fee Structure Copy */}
        <SectionCard title="Fee Structure Copy" subtitle="Copy current year fee structure to next year with adjustments" theme={theme}>
          <div className="space-y-2.5">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Copy Fees to Next Year</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Duplicate current fee heads and amounts for the new academic year</p>
              </div>
              <SSAToggle on={copyFees} onChange={() => setCopyFees(!copyFees)} theme={theme} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Adjustment % (+/-)</p>
                <InputField value={feeAdjustment} onChange={setFeeAdjustment} theme={theme} placeholder="+5 or -3" />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Effective Date</p>
                <InputField value={feeEffectiveDate} onChange={setFeeEffectiveDate} theme={theme} type="date" />
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Data Archival */}
        <SectionCard title="Data Archival" subtitle="Archive old records and set retention policies" theme={theme}>
          <div className="space-y-2.5">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Archive Old Records</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Move records older than retention period to archive storage</p>
              </div>
              <SSAToggle on={archiveOldRecords} onChange={() => setArchiveOldRecords(!archiveOldRecords)} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Retention Period</p>
              <SelectField options={['3 Years', '5 Years', '7 Years', '10 Years']} value={retentionPeriod} onChange={setRetentionPeriod} theme={theme} />
            </div>
            <button onClick={() => { setArchiveStatus('running'); setTimeout(() => setArchiveStatus('done'), 1500); }}
              disabled={archiveStatus === 'running'}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white ${theme.primary} ${archiveStatus === 'running' ? 'opacity-60' : ''}`}>
              {archiveStatus === 'done' ? <><CheckCircle size={13} /> Archived</> : archiveStatus === 'running' ? 'Archiving...' : 'Archive Now'}
            </button>
          </div>
        </SectionCard>

        {/* Staff Contract Renewal */}
        <SectionCard title="Staff Contract Renewal" subtitle="Flag expiring contracts and batch renewal processing" theme={theme}>
          <div className="space-y-2.5">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Auto-Flag Expiring Contracts</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Contracts nearing expiry are flagged in HR dashboard</p>
              </div>
              <SSAToggle on={autoFlagContracts} onChange={() => setAutoFlagContracts(!autoFlagContracts)} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Renewal Reminder (days before)</p>
              <InputField value={renewalReminderDays} onChange={setRenewalReminderDays} theme={theme} type="number" />
            </div>
            <button onClick={() => setBatchRenewalStatus('done')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white ${theme.primary}`}>
              {batchRenewalStatus === 'done' ? <><CheckCircle size={13} /> Renewal Initiated</> : 'Batch Renewal'}
            </button>
          </div>
        </SectionCard>
      </div>

      {/* Report Card Finalization */}
      <SectionCard title="Report Card Finalization" subtitle="Lock grades after a specific date to prevent changes" theme={theme}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Lock Grades After Date</p>
            <InputField value={lockGradesDate} onChange={setLockGradesDate} theme={theme} type="date" />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Allow Principal Override</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Principal can edit grades even after lock date</p>
            </div>
            <SSAToggle on={principalOverride} onChange={() => setPrincipalOverride(!principalOverride)} theme={theme} />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
