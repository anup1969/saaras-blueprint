'use client';

import React, { useState } from 'react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
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
    </div>
  );
}
