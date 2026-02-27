'use client';

import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

export default function SchoolIdentityConfigModule({ theme }: { theme: Theme }) {
  const [schoolName, setSchoolName] = useState('Delhi Public School, Ahmedabad');
  const [medium, setMedium] = useState('English');
  const [category, setCategory] = useState('Co-educational');
  const [academicPattern, setAcademicPattern] = useState('April-March');
  const [board, setBoard] = useState('CBSE');
  const [workingDays, setWorkingDays] = useState('Mon-Sat');
  const [shifts, setShifts] = useState([
    { name: 'Morning Shift', classes: 'Pre-Primary, Class 1-5' },
    { name: 'Regular Shift', classes: 'Class 6-12' },
  ]);
  const [extendedHours, setExtendedHours] = useState(false);
  const [daycareStart, setDaycareStart] = useState('06:30');
  const [daycareEnd, setDaycareEnd] = useState('19:00');
  const [extendedHoursFee, setExtendedHoursFee] = useState(false);
  const [notifTemplate, setNotifTemplate] = useState('Standard');
  const [permissionProfile, setPermissionProfile] = useState(true);
  const [sysAnnouncement, setSysAnnouncement] = useState('');
  const [apiRateLimit, setApiRateLimit] = useState('100');
  const [logoFile, setLogoFile] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <ModuleHeader title="School Identity Configuration" subtitle="Core school details captured during onboarding — editable by SSA" theme={theme} />

      <SectionCard title="Basic Information" subtitle="School name and classification" theme={theme}>
        <div className="space-y-3">
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>School Name</p>
            <InputField value={schoolName} onChange={setSchoolName} theme={theme} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Medium of Instruction</p>
              <SelectField options={['English', 'Hindi', 'Gujarati', 'Bilingual', 'Trilingual']} value={medium} onChange={setMedium} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>School Category</p>
              <SelectField options={['Co-educational', 'Boys Only', 'Girls Only']} value={category} onChange={setCategory} theme={theme} />
            </div>
          </div>
        </div>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Academic Configuration" subtitle="Year pattern and board affiliation" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Academic Year Pattern</p>
              <SelectField options={['April-March', 'June-May', 'January-December']} value={academicPattern} onChange={setAcademicPattern} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Board Affiliation</p>
              <SelectField options={['CBSE', 'ICSE', 'State Board', 'IB', 'Custom']} value={board} onChange={setBoard} theme={theme} />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Working Days" subtitle="Weekly schedule pattern" theme={theme}>
          <div className="space-y-3">
            <SelectField options={['Mon-Fri', 'Mon-Sat', 'Custom']} value={workingDays} onChange={setWorkingDays} theme={theme} />
            {workingDays === 'Custom' && (
              <div className="grid grid-cols-3 gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className={`flex items-center gap-2 p-2 rounded-lg ${theme.secondaryBg}`}>
                    <SSAToggle on={day !== 'Sat'} onChange={() => {}} theme={theme} />
                    <span className={`text-xs ${theme.highlight}`}>{day}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Shift Configuration" subtitle="Define shifts and assigned classes" theme={theme}>
        <div className="space-y-2">
          {shifts.map((shift, i) => (
            <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <input value={shift.name} onChange={e => { const n = [...shifts]; n[i] = { ...n[i], name: e.target.value }; setShifts(n); }}
                className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
              <input value={shift.classes} onChange={e => { const n = [...shifts]; n[i] = { ...n[i], classes: e.target.value }; setShifts(n); }}
                className={`flex-[2] px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
              <button onClick={() => setShifts(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={14} /></button>
            </div>
          ))}
          <button onClick={() => setShifts(p => [...p, { name: '', classes: '' }])}
            className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
            <Plus size={12} /> Add Shift
          </button>
        </div>
      </SectionCard>

      <SectionCard title="Daycare &amp; Extended Hours" subtitle="Before/after-school care and extended hours configuration" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Extended Hours Available</p>
              <p className={`text-[10px] ${theme.iconColor}`}>School offers before/after-school daycare or extended care</p>
            </div>
            <SSAToggle on={extendedHours} onChange={() => setExtendedHours(!extendedHours)} theme={theme} />
          </div>
          {extendedHours && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Daycare Start Time</p>
                  <InputField value={daycareStart} onChange={setDaycareStart} theme={theme} type="time" />
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Daycare End Time</p>
                  <InputField value={daycareEnd} onChange={setDaycareEnd} theme={theme} type="time" />
                </div>
              </div>
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>Extended Hours Fee</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Charge a separate fee for extended / daycare hours</p>
                </div>
                <SSAToggle on={extendedHoursFee} onChange={() => setExtendedHoursFee(!extendedHoursFee)} theme={theme} />
              </div>
            </>
          )}
        </div>
      </SectionCard>

      <SectionCard title="System Configuration" subtitle="Platform-level settings for notifications, permissions, and API" theme={theme}>
        <div className="space-y-3">
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Default Notification Templates</p>
            <SelectField options={['Standard', 'Formal', 'Minimal', 'Custom']} value={notifTemplate} onChange={setNotifTemplate} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Default Permission Profiles</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Apply standard role-based permission templates on new user creation</p>
            </div>
            <SSAToggle on={permissionProfile} onChange={() => setPermissionProfile(!permissionProfile)} theme={theme} />
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>System Announcements</p>
            <textarea value={sysAnnouncement} onChange={e => setSysAnnouncement(e.target.value)} placeholder="Type a system-wide announcement visible to all users..."
              className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none focus:ring-2 focus:ring-slate-300 min-h-[60px]`} />
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>API Rate Limit (requests/min)</p>
            <InputField value={apiRateLimit} onChange={setApiRateLimit} theme={theme} type="number" placeholder="e.g. 100" />
            <p className={`text-[10px] ${theme.iconColor} mt-1`}>Maximum API requests allowed per minute per user</p>
          </div>
        </div>
      </SectionCard>

    </div>
  );
}
