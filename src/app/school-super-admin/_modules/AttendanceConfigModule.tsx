'use client';

import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import { MasterPermissionGrid } from '@/components/shared';
import type { Theme } from '../_helpers/types';

export default function AttendanceConfigModule({ theme }: { theme: Theme }) {
  const [markingMethods, setMarkingMethods] = useState<Record<string, boolean>>({
    'Biometric (Fingerprint/Face)': true, 'Mobile App (Teacher)': true, 'RFID Card': false,
    'Manual Register': true, 'QR Code Scan': false,
  });
  const [frequency, setFrequency] = useState('daily');
  const [gracePeriod, setGracePeriod] = useState('15');
  const [halfDayCutoff, setHalfDayCutoff] = useState('11:30');
  const [absentThreshold, setAbsentThreshold] = useState('3');
  const [autoNotify, setAutoNotify] = useState<Record<string, boolean>>({
    'Notify parent on absence (immediate)': true,
    'Notify parent on late arrival': true,
    'Weekly attendance summary to parents': true,
    'Alert class teacher if absent > 3 consecutive days': true,
    'Alert principal if attendance < 75%': true,
    'Auto-mark absent if not marked by 10 AM': false,
  });
  const [attendanceTypes, setAttendanceTypes] = useState<Record<string, boolean>>({
    'Present': true, 'Absent': true, 'Late': true, 'Half-Day': true,
    'Medical Leave': true, 'On-Duty': true, 'Excused': false,
  });
  const [allowCustomAttendanceTypes, setAllowCustomAttendanceTypes] = useState(false);

  // ─── Defaulter Thresholds ───
  const [enableSubjectDefaulter, setEnableSubjectDefaulter] = useState(true);
  const [defaulterThresholds] = useState([
    { name: 'Warning', percentage: '80%', action: 'Notify class teacher' },
    { name: 'Alert Parents', percentage: '75%', action: 'SMS + App notification to parents' },
    { name: 'Detain Risk', percentage: '65%', action: 'Flag for Principal review' },
  ]);

  // ─── Correction Policy ───
  const [allowCorrections, setAllowCorrections] = useState(true);
  const [correctionWindow, setCorrectionWindow] = useState('7 days');
  const [requireApproval, setRequireApproval] = useState(true);

  // ─── Employee Attendance ───
  const [recordInOut, setRecordInOut] = useState(true);
  const [autoFlagLOP, setAutoFlagLOP] = useState(true);
  const [monthlyReport, setMonthlyReport] = useState(true);
  const [compOffHoliday, setCompOffHoliday] = useState(true);
  const [compOffExtra, setCompOffExtra] = useState(true);

  return (
    <div className="space-y-4">
      <ModuleHeader title="Attendance Configuration" subtitle="Marking methods, frequency, grace periods, and notification rules" theme={theme} />

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Marking Methods" subtitle="How student attendance is recorded each day" theme={theme}>
          <div className="space-y-2">
            {Object.entries(markingMethods).map(([method, enabled]) => (
              <div key={method} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{method}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Biometric (Fingerprint/Face)': 'Students mark attendance via biometric device at school entrance',
                      'Mobile App (Teacher)': 'Class teacher marks attendance from their mobile app during first period',
                      'RFID Card': 'Students tap RFID card at school gate — auto-records entry/exit time',
                      'Manual Register': 'Traditional paper-based attendance register maintained by class teacher',
                      'QR Code Scan': 'Students scan a QR code displayed in classroom to mark their presence',
                    } as Record<string, string>)[method]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setMarkingMethods(p => ({ ...p, [method]: !p[method] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Frequency &amp; Timing" subtitle="When and how often attendance is marked" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Marking Frequency</p>
              <SelectField options={['daily', 'twice-daily', 'period-wise']} value={frequency} onChange={setFrequency} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Grace Period for Late (minutes)</p>
              <InputField value={gracePeriod} onChange={setGracePeriod} theme={theme} type="number" />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Half-Day Cutoff Time</p>
              <InputField value={halfDayCutoff} onChange={setHalfDayCutoff} theme={theme} type="time" />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Consecutive Absent Days for Alert</p>
              <InputField value={absentThreshold} onChange={setAbsentThreshold} theme={theme} type="number" />
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Auto-Notification Rules" subtitle="Automated alerts sent to parents and staff based on attendance events" theme={theme}>
        <div className="space-y-2">
          {Object.entries(autoNotify).map(([rule, enabled]) => (
            <div key={rule} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>{rule}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{
                  ({
                    'Notify parent on absence (immediate)': 'Parents receive instant SMS/app notification when their child is marked absent',
                    'Notify parent on late arrival': 'Parents are notified when their child arrives after the grace period',
                    'Weekly attendance summary to parents': 'Parents receive a weekly digest showing their child\'s attendance for the week',
                    'Alert class teacher if absent > 3 consecutive days': 'Class teacher gets an alert when a student is absent for 3+ consecutive days',
                    'Alert principal if attendance < 75%': 'Principal is notified when any student\'s attendance drops below 75%',
                    'Auto-mark absent if not marked by 10 AM': 'System automatically marks students as absent if teacher hasn\'t marked attendance by 10 AM',
                  } as Record<string, string>)[rule]
                }</p>
              </div>
              <SSAToggle on={enabled} onChange={() => setAutoNotify(p => ({ ...p, [rule]: !p[rule] }))} theme={theme} />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Attendance Types" subtitle="Named attendance statuses available to teachers when marking attendance" theme={theme}>
        <div className="space-y-2">
          {Object.entries(attendanceTypes).map(([type, enabled]) => (
            <div key={type} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>{type}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{
                  ({
                    'Present': 'Student is present in class for the full day',
                    'Absent': 'Student did not attend school at all',
                    'Late': 'Student arrived after the grace period — counts as present but flagged',
                    'Half-Day': 'Student attended only half the school day (morning or afternoon)',
                    'Medical Leave': 'Absent due to illness — requires medical certificate for extended leave',
                    'On-Duty': 'Student is absent from class but on official school duty (sports, events, etc.)',
                    'Excused': 'Pre-approved absence (family event, religious observance, etc.)',
                  } as Record<string, string>)[type]
                }</p>
              </div>
              <SSAToggle on={enabled} onChange={() => setAttendanceTypes(p => ({ ...p, [type]: !p[type] }))} theme={theme} />
            </div>
          ))}
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Allow Custom Types</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Let school admins define additional attendance statuses</p>
            </div>
            <SSAToggle on={allowCustomAttendanceTypes} onChange={() => setAllowCustomAttendanceTypes(!allowCustomAttendanceTypes)} theme={theme} />
          </div>
        </div>
      </SectionCard>

      {/* ─── A) Defaulter Thresholds ─── */}
      <SectionCard title="Defaulter Thresholds" subtitle="Configure attendance percentage thresholds and automatic actions" theme={theme}>
        <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg} mb-3`}>
          <div>
            <p className={`text-xs font-bold ${theme.highlight}`}>Enable Subject-wise Defaulter Tracking</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Track attendance defaulters per subject, not just overall</p>
          </div>
          <SSAToggle on={enableSubjectDefaulter} onChange={() => setEnableSubjectDefaulter(!enableSubjectDefaulter)} theme={theme} />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Threshold Name', 'Percentage', 'Action'].map(h => (
                <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {defaulterThresholds.map((d, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{d.name}</td>
                  <td className="px-3 py-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      d.percentage === '80%' ? 'bg-amber-100 text-amber-700' :
                      d.percentage === '75%' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>{d.percentage}</span>
                  </td>
                  <td className={`px-3 py-2 ${theme.iconColor}`}>{d.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* ─── B) Correction Policy ─── */}
      <SectionCard title="Correction Policy" subtitle="Rules for editing past attendance records" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Allow Past Attendance Corrections</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Teachers can edit attendance marked on previous days</p>
            </div>
            <SSAToggle on={allowCorrections} onChange={() => setAllowCorrections(!allowCorrections)} theme={theme} />
          </div>
          {allowCorrections && (
            <>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Correction Window</p>
                <SelectField options={['3 days', '7 days', '30 days', 'No limit']} value={correctionWindow} onChange={setCorrectionWindow} theme={theme} />
              </div>
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>Require VP/Principal Approval for Corrections</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Corrections go through approval before taking effect</p>
                </div>
                <SSAToggle on={requireApproval} onChange={() => setRequireApproval(!requireApproval)} theme={theme} />
              </div>
              <div className={`flex items-center gap-2 p-2.5 rounded-xl ${theme.accentBg} border ${theme.border}`}>
                <Lock size={14} className={theme.iconColor} />
                <span className={`text-xs font-bold ${theme.iconColor}`}>Correction Audit Log</span>
                <span className={`text-[10px] ${theme.iconColor}`}>All corrections are logged with before/after values</span>
              </div>
            </>
          )}
        </div>
      </SectionCard>

      {/* ─── C) Employee Attendance Settings ─── */}
      <SectionCard title="Employee Attendance Settings" subtitle="Staff attendance configuration and comp-off rules" theme={theme}>
        <div className="space-y-2">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Record In/Out Times</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Track exact check-in and check-out timestamps for staff</p>
            </div>
            <SSAToggle on={recordInOut} onChange={() => setRecordInOut(!recordInOut)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Auto-flag Loss of Pay when leave balance = 0</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Automatically mark LOP when staff exhausts all leave types</p>
            </div>
            <SSAToggle on={autoFlagLOP} onChange={() => setAutoFlagLOP(!autoFlagLOP)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Generate Monthly Summary Report</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Auto-generate staff attendance summary at month end</p>
            </div>
            <SSAToggle on={monthlyReport} onChange={() => setMonthlyReport(!monthlyReport)} theme={theme} />
          </div>
          <div className={`p-3 rounded-xl ${theme.accentBg} border ${theme.border}`}>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-2 uppercase tracking-wide`}>Comp-off Earned For</p>
            <div className="space-y-2">
              <div className={`flex items-center justify-between p-2 rounded-lg ${theme.secondaryBg}`}>
                <span className={`text-xs ${theme.highlight}`}>Working on holiday</span>
                <SSAToggle on={compOffHoliday} onChange={() => setCompOffHoliday(!compOffHoliday)} theme={theme} />
              </div>
              <div className={`flex items-center justify-between p-2 rounded-lg ${theme.secondaryBg}`}>
                <span className={`text-xs ${theme.highlight}`}>Extra hours &gt; 2</span>
                <SSAToggle on={compOffExtra} onChange={() => setCompOffExtra(!compOffExtra)} theme={theme} />
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Role-Based Permissions" subtitle="Control who can view, create, edit, delete, import, and export" theme={theme}>
        <div className="space-y-4">
          <MasterPermissionGrid masterName="Attendance Types" roles={['Super Admin', 'Principal', 'School Admin', 'Teacher', 'Accountant']} theme={theme} />
        </div>
      </SectionCard>
    </div>
  );
}
