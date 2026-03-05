'use client';

import React, { useState } from 'react';
import { X, Plus, Search, Download, Upload, Save, Trash2 } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

type TabId = 'basic' | 'schedule' | 'system';

export default function SchoolIdentityConfigModule({ theme, activeTab: externalTab, onTabChange }: { theme: Theme; activeTab?: string; onTabChange?: (tab: string) => void }) {
  const [schoolName, setSchoolName] = useState('Delhi Public School, Ahmedabad');
  const [medium, setMedium] = useState('English');
  const [category, setCategory] = useState('Co-educational');
  const [academicPattern, setAcademicPattern] = useState('April-March');
  const [board, setBoard] = useState('CBSE');
  const [workingDays, setWorkingDays] = useState('Mon-Sat');

  // Custom working days — wired to state so toggling actually works
  const [customDays, setCustomDays] = useState<Record<string, boolean>>({
    Mon: true, Tue: true, Wed: true, Thu: true, Fri: true, Sat: false,
  });

  const [shifts, setShifts] = useState([
    { name: 'Morning Shift', classes: 'Pre-Primary, Class 1-5', enabled: true },
    { name: 'Regular Shift', classes: 'Class 6-12', enabled: true },
  ]);
  const [shiftSearch, setShiftSearch] = useState('');

  const [extendedHours, setExtendedHours] = useState(false);
  const [daycareStart, setDaycareStart] = useState('06:30');
  const [daycareEnd, setDaycareEnd] = useState('19:00');
  const [extendedHoursFee, setExtendedHoursFee] = useState(false);
  const [notifTemplate, setNotifTemplate] = useState('Standard');
  const [permissionProfile, setPermissionProfile] = useState(true);
  const [sysAnnouncement, setSysAnnouncement] = useState('');
  const [apiRateLimit, setApiRateLimit] = useState('100');
  const [logoFile, setLogoFile] = useState<string | null>(null);

  const [internalTab, setInternalTab] = useState<TabId>('basic');
  const activeTab = (externalTab as TabId) || internalTab;
  const setActiveTab = (tab: TabId) => { if (onTabChange) onTabChange(tab); else setInternalTab(tab); };

  // Gap 23: Locale & Format Settings
  const [currency, setCurrency] = useState('INR (\u20B9)');
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
  const [timeZone, setTimeZone] = useState('IST (UTC+5:30)');
  const [numberFormat, setNumberFormat] = useState('1,23,456.00 (Indian)');

  const filteredShifts = shifts.filter(s =>
    !shiftSearch || s.name.toLowerCase().includes(shiftSearch.toLowerCase()) || s.classes.toLowerCase().includes(shiftSearch.toLowerCase())
  );
  const activeShiftCount = shifts.filter(s => s.enabled).length;

  return (
    <div className="space-y-4">
      <ModuleHeader title="School Identity Configuration" subtitle="Core school details captured during onboarding — editable by SSA" theme={theme} />

      {activeTab === 'basic' && (<div className="space-y-4">
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
      </div>)}

      {activeTab === 'schedule' && (<div className="space-y-4">
      <SectionCard title="Working Days" subtitle="Weekly schedule pattern" theme={theme}>
        <div className="space-y-3">
          <SelectField options={['Mon-Fri', 'Mon-Sat', 'Custom']} value={workingDays} onChange={setWorkingDays} theme={theme} />
          {workingDays === 'Custom' && (
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(customDays) as Array<keyof typeof customDays>).map(day => (
                <div key={day} className={`flex items-center gap-2 p-2 rounded-lg ${theme.secondaryBg}`}>
                  <SSAToggle
                    on={customDays[day]}
                    onChange={() => setCustomDays(prev => ({ ...prev, [day]: !prev[day] }))}
                    theme={theme}
                  />
                  <span className={`text-xs ${theme.highlight}`}>{day}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </SectionCard>

      {/* Shift Configuration — full master table pattern */}
      <SectionCard title="Shift Configuration" subtitle="Define shifts and assigned classes" theme={theme}>
        {/* Toolbar: search + count + export + import */}
        <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg} mb-3`}>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={14} className={`absolute left-2.5 top-1/2 -translate-y-1/2 ${theme.iconColor}`} />
              <input
                value={shiftSearch}
                onChange={e => setShiftSearch(e.target.value)}
                placeholder="Search shifts..."
                className={`pl-8 pr-3 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none w-48`}
              />
            </div>
            <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${theme.accentBg} ${theme.iconColor}`}>
              {activeShiftCount} active / {shifts.length} total
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors">
              <Download size={12} /> Export
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">
              <Upload size={12} /> Import
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className={theme.secondaryBg}>
                {['Shift Name', 'Assigned Classes', 'Active', ''].map(h => (
                  <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredShifts.map((shift, i) => {
                const realIdx = shifts.indexOf(shift);
                return (
                  <tr key={realIdx} className={`border-t ${theme.border} ${!shift.enabled ? 'opacity-50' : ''}`}>
                    <td className="px-3 py-1.5">
                      <input
                        value={shift.name}
                        onChange={e => {
                          const n = [...shifts];
                          n[realIdx] = { ...n[realIdx], name: e.target.value };
                          setShifts(n);
                        }}
                        className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`}
                      />
                    </td>
                    <td className="px-3 py-1.5">
                      <input
                        value={shift.classes}
                        onChange={e => {
                          const n = [...shifts];
                          n[realIdx] = { ...n[realIdx], classes: e.target.value };
                          setShifts(n);
                        }}
                        className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}
                      />
                    </td>
                    <td className="px-3 py-1.5">
                      <SSAToggle
                        on={shift.enabled}
                        onChange={() => setShifts(prev => prev.map((s, j) => j === realIdx ? { ...s, enabled: !s.enabled } : s))}
                        theme={theme}
                        label={shift.name}
                      />
                    </td>
                    <td className="px-3 py-1.5">
                      <button
                        onClick={() => setShifts(prev => prev.filter((_, j) => j !== realIdx))}
                        className="text-red-400 hover:text-red-600"
                      >
                        <Trash2 size={12} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer: add + bulk actions */}
        <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShifts(prev => [...prev, { name: '', classes: '', enabled: true }])}
              className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}
            >
              <Plus size={12} /> Add Shift
            </button>
            <button
              onClick={() => setShifts(prev => prev.map(s => ({ ...s, enabled: true })))}
              className="px-2.5 py-1.5 rounded-lg text-[9px] font-bold bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
            >
              Enable All
            </button>
            <button
              onClick={() => setShifts(prev => prev.map(s => ({ ...s, enabled: false })))}
              className="px-2.5 py-1.5 rounded-lg text-[9px] font-bold bg-gray-100 text-gray-600 hover:bg-gray-200"
            >
              Disable All
            </button>
          </div>
          <p className={`text-[10px] ${theme.iconColor}`}>
            Showing {filteredShifts.length} of {shifts.length} shifts
          </p>
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
      </div>)}

      {activeTab === 'system' && (<div className="space-y-4">
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
            <textarea
              value={sysAnnouncement}
              onChange={e => setSysAnnouncement(e.target.value)}
              placeholder="Type a system-wide announcement visible to all users..."
              className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none focus:ring-2 focus:ring-slate-300 min-h-[60px]`}
            />
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>API Rate Limit (requests/min)</p>
            <InputField value={apiRateLimit} onChange={setApiRateLimit} theme={theme} type="number" placeholder="e.g. 100" />
            <p className={`text-[10px] ${theme.iconColor} mt-1`}>Maximum API requests allowed per minute per user</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Locale & Format Settings" subtitle="Currency, date format, and timezone preferences" theme={theme}>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Currency</p>
              <SelectField options={['INR (\u20B9)', 'USD ($)', 'AED (\u062F.\u0625)', 'GBP (\u00A3)', 'EUR (\u20AC)']} value={currency} onChange={setCurrency} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Date Format</p>
              <SelectField options={['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD']} value={dateFormat} onChange={setDateFormat} theme={theme} />
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Time Zone</p>
              <SelectField options={['IST (UTC+5:30)', 'GMT (UTC+0)', 'EST (UTC-5)', 'PST (UTC-8)', 'GST (UTC+4)']} value={timeZone} onChange={setTimeZone} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Number Format</p>
              <SelectField options={['1,23,456.00 (Indian)', '1,234,56.00 (International)']} value={numberFormat} onChange={setNumberFormat} theme={theme} />
            </div>
          </div>
        </div>
      </SectionCard>
      </div>)}

      {/* Save Bar */}
      <div className={`flex items-center justify-between p-3 rounded-2xl border-2 ${theme.border} ${theme.secondaryBg}`}>
        <div>
          <p className={`text-sm font-bold ${theme.highlight}`}>Save School Identity Settings</p>
          <p className={`text-[10px] ${theme.iconColor}`}>Save school name, working days, shifts, locale, and system configuration</p>
        </div>
        <button className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white ${theme.primary} shadow-sm hover:opacity-90 transition-opacity`}>
          <Save size={16} /> Save Changes
        </button>
      </div>
    </div>
  );
}
