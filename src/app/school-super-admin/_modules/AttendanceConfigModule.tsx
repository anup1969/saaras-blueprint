'use client';

import React, { useState } from 'react';
import { Lock, Search, X, Save, Calendar, User, Check, ArrowRight } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

// ─── Types ─────────────────────────────────────────
type CorrectionEntry = {
  date: string;
  day: string;
  status: 'Present' | 'Absent' | 'Late' | 'Half-Day' | 'Leave';
  reason: string;
};

const ATTENDANCE_STATUSES = ['Present', 'Absent', 'Late', 'Half-Day', 'Leave'] as const;

// ─── Status badge color helper ─────────────────────
function statusBadge(status: string) {
  switch (status) {
    case 'Present': return 'bg-emerald-100 text-emerald-700';
    case 'Absent': return 'bg-red-100 text-red-700';
    case 'Late': return 'bg-amber-100 text-amber-700';
    case 'Half-Day': return 'bg-orange-100 text-orange-700';
    case 'Leave': return 'bg-blue-100 text-blue-700';
    default: return 'bg-gray-100 text-gray-600';
  }
}

type TabId = 'config' | 'rules' | 'settings';

export default function AttendanceConfigModule({ theme, activeTab: externalTab, onTabChange }: { theme: Theme; activeTab?: string; onTabChange?: (tab: string) => void }) {
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

  // ─── Defaulter Thresholds (3-way toggle) ───
  const [enableSubjectDefaulter, setEnableSubjectDefaulter] = useState(true);
  type ThresholdScope = 'uniform' | 'per-department' | 'per-grade';
  const [thresholdScope, setThresholdScope] = useState<ThresholdScope>('uniform');

  // Uniform: single threshold set
  const [uniformThreshold, setUniformThreshold] = useState({ warning: '80', defaulter: '75', critical: '65', action: 'Notify class teacher + SMS to parents' });

  // Department data (matches Academic Config)
  const departments = [
    { name: 'Pre-Primary', grades: ['Nursery', 'Jr. KG', 'Sr. KG'], color: 'bg-pink-100 text-pink-700' },
    { name: 'Primary', grades: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5'], color: 'bg-blue-100 text-blue-700' },
    { name: 'Secondary', grades: ['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10'], color: 'bg-emerald-100 text-emerald-700' },
    { name: 'Higher Secondary', grades: ['Grade 11', 'Grade 12'], color: 'bg-purple-100 text-purple-700' },
  ];
  const allGrades = departments.flatMap(d => d.grades);

  // Per-Department thresholds
  const [deptThresholds, setDeptThresholds] = useState<Record<string, { warning: string; defaulter: string; critical: string; action: string }>>({
    'Pre-Primary': { warning: '85', defaulter: '80', critical: '70', action: 'Notify class teacher' },
    'Primary': { warning: '80', defaulter: '75', critical: '65', action: 'SMS + App notification to parents' },
    'Secondary': { warning: '78', defaulter: '72', critical: '60', action: 'Flag for Principal review' },
    'Higher Secondary': { warning: '75', defaulter: '65', critical: '50', action: 'Detain risk + Board notification' },
  });

  // Per-Grade thresholds
  const [gradeThresholds, setGradeThresholds] = useState<Record<string, { warning: string; defaulter: string; critical: string; action: string }>>(() => {
    const init: Record<string, { warning: string; defaulter: string; critical: string; action: string }> = {};
    allGrades.forEach(g => { init[g] = { warning: '80', defaulter: '75', critical: '65', action: 'Notify class teacher' }; });
    // Override some defaults for realism
    init['Grade 9'] = { warning: '75', defaulter: '70', critical: '55', action: 'Flag for Principal review' };
    init['Grade 10'] = { warning: '75', defaulter: '70', critical: '55', action: 'Flag for Principal review' };
    init['Grade 11'] = { warning: '75', defaulter: '65', critical: '50', action: 'Detain risk + Board notification' };
    init['Grade 12'] = { warning: '75', defaulter: '65', critical: '50', action: 'Detain risk + Board notification' };
    return init;
  });

  // ─── Correction Policy ───
  const [allowCorrections, setAllowCorrections] = useState(true);
  const [correctionWindow, setCorrectionWindow] = useState('7 days');
  const [requireApproval, setRequireApproval] = useState(true);

  // ─── Attendance Correction Interface ───
  const [correctionStudentSearch, setCorrectionStudentSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<{ id: string; name: string; class: string; roll: string } | null>(null);
  const [correctionDateFrom, setCorrectionDateFrom] = useState('2026-03-01');
  const [correctionDateTo, setCorrectionDateTo] = useState('2026-03-05');
  const [correctionEntries, setCorrectionEntries] = useState<CorrectionEntry[]>([
    { date: '2026-03-01', day: 'Sun', status: 'Present', reason: '' },
    { date: '2026-03-02', day: 'Mon', status: 'Absent', reason: '' },
    { date: '2026-03-03', day: 'Tue', status: 'Present', reason: '' },
    { date: '2026-03-04', day: 'Wed', status: 'Late', reason: '' },
    { date: '2026-03-05', day: 'Thu', status: 'Present', reason: '' },
  ]);
  const [correctionSaved, setCorrectionSaved] = useState(false);

  const mockStudents = [
    { id: 'STU001', name: 'Aarav Sharma', class: '9-A', roll: '01' },
    { id: 'STU002', name: 'Diya Patel', class: '9-A', roll: '02' },
    { id: 'STU003', name: 'Ishaan Gupta', class: '8-B', roll: '05' },
    { id: 'STU004', name: 'Meera Joshi', class: '10-C', roll: '12' },
    { id: 'STU005', name: 'Rohan Desai', class: '7-A', roll: '08' },
    { id: 'STU006', name: 'Ananya Reddy', class: '9-B', roll: '03' },
  ];

  const filteredStudents = correctionStudentSearch.length >= 2
    ? mockStudents.filter(s =>
        s.name.toLowerCase().includes(correctionStudentSearch.toLowerCase()) ||
        s.id.toLowerCase().includes(correctionStudentSearch.toLowerCase())
      )
    : [];

  function updateCorrectionStatus(index: number, status: CorrectionEntry['status']) {
    setCorrectionEntries(p => p.map((e, i) => i === index ? { ...e, status } : e));
  }
  function updateCorrectionReason(index: number, reason: string) {
    setCorrectionEntries(p => p.map((e, i) => i === index ? { ...e, reason } : e));
  }

  // ─── Tab State ───
  const [internalTab, setInternalTab] = useState<TabId>('config');
  const activeTab = (externalTab as TabId) || internalTab;
  const setActiveTab = (tab: TabId) => { if (onTabChange) onTabChange(tab); else setInternalTab(tab); };

  // ─── Employee Attendance ───
  const [recordInOut, setRecordInOut] = useState(true);
  const [autoFlagLOP, setAutoFlagLOP] = useState(true);
  const [monthlyReport, setMonthlyReport] = useState(true);
  const [compOffHoliday, setCompOffHoliday] = useState(true);
  const [compOffExtra, setCompOffExtra] = useState(true);

  return (
    <div className="space-y-4">
      <ModuleHeader title="Attendance Configuration" subtitle="Marking methods, frequency, grace periods, and notification rules" theme={theme} />

      {activeTab === 'config' && (<div className="space-y-4">
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
      </div>)}

      {activeTab === 'rules' && (<div className="space-y-4">
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

      {/* ─── A) Defaulter Thresholds (3-way toggle) ─── */}
      <SectionCard title="Defaulter Thresholds" subtitle="Configure attendance percentage thresholds and automatic actions" theme={theme}>
        <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg} mb-3`}>
          <div>
            <p className={`text-xs font-bold ${theme.highlight}`}>Enable Subject-wise Defaulter Tracking</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Track attendance defaulters per subject, not just overall</p>
          </div>
          <SSAToggle on={enableSubjectDefaulter} onChange={() => setEnableSubjectDefaulter(!enableSubjectDefaulter)} theme={theme} />
        </div>

        {/* 3-way toggle */}
        <div className="flex items-center gap-2 mb-3">
          <p className={`text-[10px] font-bold ${theme.iconColor} mr-1`}>Apply thresholds:</p>
          {(['uniform', 'per-department', 'per-grade'] as const).map(scope => (
            <button key={scope} onClick={() => setThresholdScope(scope)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                thresholdScope === scope ? `${theme.primary} text-white` : `${theme.cardBg} border ${theme.border} ${theme.highlight} ${theme.buttonHover}`
              }`}>
              {scope === 'uniform' ? 'Uniform (All)' : scope === 'per-department' ? 'Per Department' : 'Per Grade'}
            </button>
          ))}
        </div>

        {/* ── Uniform Mode ── */}
        {thresholdScope === 'uniform' && (
          <div>
            <p className={`text-[10px] ${theme.iconColor} mb-2`}>One set of thresholds applies to all departments and grades.</p>
            <div className={`rounded-xl border ${theme.border} overflow-hidden`}>
              <table className="w-full text-xs">
                <thead>
                  <tr className={theme.secondaryBg}>
                    {['Warning (%)', 'Defaulter (%)', 'Critical (%)', 'Action on Breach'].map(h => (
                      <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor} whitespace-nowrap text-[10px] uppercase`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className={`border-t ${theme.border}`}>
                    <td className="px-2 py-2">
                      <input value={uniformThreshold.warning} type="number"
                        onChange={e => setUniformThreshold(p => ({ ...p, warning: e.target.value }))}
                        className={`w-16 px-2 py-1 rounded-lg border ${theme.border} bg-amber-50 text-xs text-center text-amber-700 font-bold outline-none`} />
                    </td>
                    <td className="px-2 py-2">
                      <input value={uniformThreshold.defaulter} type="number"
                        onChange={e => setUniformThreshold(p => ({ ...p, defaulter: e.target.value }))}
                        className={`w-16 px-2 py-1 rounded-lg border ${theme.border} bg-orange-50 text-xs text-center text-orange-700 font-bold outline-none`} />
                    </td>
                    <td className="px-2 py-2">
                      <input value={uniformThreshold.critical} type="number"
                        onChange={e => setUniformThreshold(p => ({ ...p, critical: e.target.value }))}
                        className={`w-16 px-2 py-1 rounded-lg border ${theme.border} bg-red-50 text-xs text-center text-red-700 font-bold outline-none`} />
                    </td>
                    <td className="px-2 py-2">
                      <input value={uniformThreshold.action}
                        onChange={e => setUniformThreshold(p => ({ ...p, action: e.target.value }))}
                        className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}
                        placeholder="Action on breach" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Per-Department Mode ── */}
        {thresholdScope === 'per-department' && (
          <div>
            <p className={`text-[10px] ${theme.iconColor} mb-3`}>Each department has its own threshold settings (as configured in Academic Config).</p>
            <div className="grid grid-cols-2 gap-3">
              {departments.map(dept => (
                <div key={dept.name} className={`p-3 rounded-xl border ${theme.border} ${theme.secondaryBg}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${dept.color}`}>{dept.name}</span>
                    <span className={`text-[9px] ${theme.iconColor}`}>({dept.grades.length} grades)</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    <div>
                      <p className={`text-[9px] ${theme.iconColor} mb-0.5`}>Warning %</p>
                      <input value={deptThresholds[dept.name]?.warning || ''} type="number"
                        onChange={e => setDeptThresholds(p => ({ ...p, [dept.name]: { ...p[dept.name], warning: e.target.value } }))}
                        className={`w-full px-2 py-1 rounded-lg border ${theme.border} bg-amber-50 text-xs text-center text-amber-700 font-bold outline-none`} />
                    </div>
                    <div>
                      <p className={`text-[9px] ${theme.iconColor} mb-0.5`}>Defaulter %</p>
                      <input value={deptThresholds[dept.name]?.defaulter || ''} type="number"
                        onChange={e => setDeptThresholds(p => ({ ...p, [dept.name]: { ...p[dept.name], defaulter: e.target.value } }))}
                        className={`w-full px-2 py-1 rounded-lg border ${theme.border} bg-orange-50 text-xs text-center text-orange-700 font-bold outline-none`} />
                    </div>
                    <div>
                      <p className={`text-[9px] ${theme.iconColor} mb-0.5`}>Critical %</p>
                      <input value={deptThresholds[dept.name]?.critical || ''} type="number"
                        onChange={e => setDeptThresholds(p => ({ ...p, [dept.name]: { ...p[dept.name], critical: e.target.value } }))}
                        className={`w-full px-2 py-1 rounded-lg border ${theme.border} bg-red-50 text-xs text-center text-red-700 font-bold outline-none`} />
                    </div>
                  </div>
                  <div>
                    <p className={`text-[9px] ${theme.iconColor} mb-0.5`}>Action</p>
                    <input value={deptThresholds[dept.name]?.action || ''}
                      onChange={e => setDeptThresholds(p => ({ ...p, [dept.name]: { ...p[dept.name], action: e.target.value } }))}
                      className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}
                      placeholder="Action on breach" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Per-Grade Mode ── */}
        {thresholdScope === 'per-grade' && (
          <div>
            <p className={`text-[10px] ${theme.iconColor} mb-2`}>Individual threshold per grade, from Nursery through Grade 12.</p>
            <div className={`rounded-xl border ${theme.border} overflow-hidden`}>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className={theme.secondaryBg}>
                      {['Grade', 'Dept', 'Warning (%)', 'Defaulter (%)', 'Critical (%)', 'Action'].map(h => (
                        <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor} whitespace-nowrap text-[10px] uppercase`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {allGrades.map(grade => {
                      const dept = departments.find(d => d.grades.includes(grade));
                      const t = gradeThresholds[grade];
                      return (
                        <tr key={grade} className={`border-t ${theme.border}`}>
                          <td className={`px-3 py-1.5 font-bold ${theme.highlight} whitespace-nowrap`}>{grade}</td>
                          <td className="px-2 py-1.5">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${dept?.color || ''}`}>{dept?.name}</span>
                          </td>
                          <td className="px-2 py-1.5">
                            <input value={t?.warning || ''} type="number"
                              onChange={e => setGradeThresholds(p => ({ ...p, [grade]: { ...p[grade], warning: e.target.value } }))}
                              className={`w-14 px-2 py-1 rounded-lg border ${theme.border} bg-amber-50 text-xs text-center text-amber-700 font-bold outline-none`} />
                          </td>
                          <td className="px-2 py-1.5">
                            <input value={t?.defaulter || ''} type="number"
                              onChange={e => setGradeThresholds(p => ({ ...p, [grade]: { ...p[grade], defaulter: e.target.value } }))}
                              className={`w-14 px-2 py-1 rounded-lg border ${theme.border} bg-orange-50 text-xs text-center text-orange-700 font-bold outline-none`} />
                          </td>
                          <td className="px-2 py-1.5">
                            <input value={t?.critical || ''} type="number"
                              onChange={e => setGradeThresholds(p => ({ ...p, [grade]: { ...p[grade], critical: e.target.value } }))}
                              className={`w-14 px-2 py-1 rounded-lg border ${theme.border} bg-red-50 text-xs text-center text-red-700 font-bold outline-none`} />
                          </td>
                          <td className="px-2 py-1.5">
                            <input value={t?.action || ''}
                              onChange={e => setGradeThresholds(p => ({ ...p, [grade]: { ...p[grade], action: e.target.value } }))}
                              className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}
                              placeholder="Action" />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
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

      {/* ─── E1) Attendance Correction Interface ─── */}
      <SectionCard title="Attendance Correction" subtitle="Search student, view attendance, and correct individual day statuses" theme={theme}>
        <div className="space-y-4">
          {/* Step 1: Student Search */}
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} uppercase tracking-wider mb-2 flex items-center gap-1.5`}>
              <User size={12} /> Step 1: Search Student
            </p>
            <div className="relative">
              <div className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg}`}>
                <Search size={13} className={theme.iconColor} />
                <input
                  value={correctionStudentSearch}
                  onChange={e => { setCorrectionStudentSearch(e.target.value); setSelectedStudent(null); }}
                  placeholder="Search by student name or ID (min 2 chars)..."
                  className={`flex-1 bg-transparent text-xs ${theme.highlight} outline-none placeholder-gray-400`}
                />
                {correctionStudentSearch && (
                  <button onClick={() => { setCorrectionStudentSearch(''); setSelectedStudent(null); }}>
                    <X size={12} className="text-gray-400 hover:text-red-400" />
                  </button>
                )}
              </div>
              {/* Dropdown results */}
              {filteredStudents.length > 0 && !selectedStudent && (
                <div className={`absolute z-20 w-full mt-1 rounded-xl border ${theme.border} ${theme.cardBg} shadow-lg max-h-40 overflow-y-auto`}>
                  {filteredStudents.map(s => (
                    <button key={s.id} onClick={() => { setSelectedStudent(s); setCorrectionStudentSearch(s.name); }}
                      className={`w-full text-left px-3 py-2 text-xs ${theme.highlight} hover:${theme.secondaryBg} flex items-center justify-between border-b ${theme.border} last:border-0`}>
                      <span className="font-bold">{s.name}</span>
                      <span className={`text-[10px] ${theme.iconColor}`}>{s.id} | {s.class} | Roll {s.roll}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selected student chip */}
            {selectedStudent && (
              <div className={`mt-2 flex items-center gap-3 p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className={`w-8 h-8 rounded-full ${theme.primary} text-white flex items-center justify-center text-xs font-bold`}>
                  {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{selectedStudent.name}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{selectedStudent.id} | Class {selectedStudent.class} | Roll #{selectedStudent.roll}</p>
                </div>
                <button onClick={() => { setSelectedStudent(null); setCorrectionStudentSearch(''); }}
                  className="text-gray-400 hover:text-red-400">
                  <X size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Step 2: Date Range */}
          {selectedStudent && (
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} uppercase tracking-wider mb-2 flex items-center gap-1.5`}>
                <Calendar size={12} /> Step 2: Select Date Range
              </p>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <p className={`text-[10px] ${theme.iconColor} mb-1`}>From</p>
                  <input type="date" value={correctionDateFrom} onChange={e => setCorrectionDateFrom(e.target.value)}
                    className={`w-full px-3 py-1.5 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                </div>
                <div className="flex-1">
                  <p className={`text-[10px] ${theme.iconColor} mb-1`}>To</p>
                  <input type="date" value={correctionDateTo} onChange={e => setCorrectionDateTo(e.target.value)}
                    className={`w-full px-3 py-1.5 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Attendance Grid */}
          {selectedStudent && (
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} uppercase tracking-wider mb-2 flex items-center gap-1.5`}>
                <Check size={12} /> Step 3: Review &amp; Correct
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className={theme.secondaryBg}>
                      {['Date', 'Day', 'Status', 'Change To', 'Reason/Comment'].map(h => (
                        <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor} text-[10px] uppercase whitespace-nowrap`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {correctionEntries.map((entry, i) => (
                      <tr key={entry.date} className={`border-t ${theme.border}`}>
                        <td className={`px-3 py-2 font-bold ${theme.highlight} whitespace-nowrap`}>{entry.date}</td>
                        <td className={`px-3 py-2 ${theme.iconColor}`}>{entry.day}</td>
                        <td className="px-3 py-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${statusBadge(entry.status)}`}>
                            {entry.status}
                          </span>
                        </td>
                        <td className="px-2 py-1.5">
                          <select
                            value={entry.status}
                            onChange={e => updateCorrectionStatus(i, e.target.value as CorrectionEntry['status'])}
                            className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}
                          >
                            {ATTENDANCE_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </td>
                        <td className="px-2 py-1.5">
                          <input
                            value={entry.reason}
                            onChange={e => updateCorrectionReason(i, e.target.value)}
                            placeholder="Reason for correction..."
                            className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Save Corrections */}
              <div className="flex items-center justify-between mt-3">
                <p className={`text-[10px] ${theme.iconColor}`}>
                  {requireApproval
                    ? 'Corrections will be sent for VP/Principal approval before applying'
                    : 'Corrections will be applied immediately'}
                </p>
                <button
                  onClick={() => { setCorrectionSaved(true); setTimeout(() => setCorrectionSaved(false), 2000); }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white ${theme.primary} hover:opacity-90 transition-all`}>
                  <Save size={13} /> Save Corrections
                </button>
              </div>
              {correctionSaved && (
                <p className="text-xs text-emerald-600 font-bold text-right animate-pulse mt-1">
                  Corrections saved successfully!
                </p>
              )}
            </div>
          )}
        </div>
      </SectionCard>
      </div>)}

      {activeTab === 'settings' && (<div className="space-y-4">
      <SectionCard title="Role-Based Permissions" subtitle="Managed centrally in Roles & Permission module" theme={theme}>
        <div className={`flex items-center gap-3 p-3 rounded-xl ${theme.accentBg} border ${theme.border}`}>
          <div className="flex-1">
            <p className={`text-xs ${theme.iconColor}`}>Role & permission settings for Attendance are configured in <span className={`font-bold ${theme.primaryText}`}>Roles & Permission Management</span></p>
          </div>
          <ArrowRight size={16} className={theme.iconColor} />
        </div>
      </SectionCard>

      {/* ─── Save Configuration ─── */}
      <div className="flex justify-end pt-2">
        <button
          onClick={() => alert('Attendance configuration saved!')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white ${theme.primary} hover:opacity-90 transition-all shadow-sm`}>
          <Save size={15} /> Save Configuration
        </button>
      </div>
      </div>)}
    </div>
  );
}
