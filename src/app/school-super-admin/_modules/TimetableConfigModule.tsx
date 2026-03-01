'use client';

import React, { useState } from 'react';
import { X, Plus, Upload, AlertCircle, Trash2 } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import { MasterPermissionGrid } from '@/components/shared';
import type { Theme } from '../_helpers/types';

export default function TimetableConfigModule({ theme }: { theme: Theme }) {
  const [bellSchedule, setBellSchedule] = useState([
    { period: 'Assembly', start: '07:30', end: '07:50' },
    { period: 'Period 1', start: '07:50', end: '08:30' },
    { period: 'Period 2', start: '08:30', end: '09:10' },
    { period: 'Period 3', start: '09:10', end: '09:50' },
    { period: 'Short Break', start: '09:50', end: '10:05' },
    { period: 'Period 4', start: '10:05', end: '10:45' },
    { period: 'Period 5', start: '10:45', end: '11:25' },
    { period: 'Lunch Break', start: '11:25', end: '12:00' },
    { period: 'Period 6', start: '12:00', end: '12:40' },
    { period: 'Period 7', start: '12:40', end: '01:20' },
    { period: 'Period 8', start: '01:20', end: '02:00' },
  ]);
  const [saturdaySchedule, setSaturdaySchedule] = useState('half-day');
  const [zeroPeriod, setZeroPeriod] = useState(false);
  const [zeroPeriodTime, setZeroPeriodTime] = useState({ start: '07:00', end: '07:30' });
  const [assemblyTime, setAssemblyTime] = useState('15');
  const [substitutionMode, setSubstitutionMode] = useState('Both');
  const [substitutionBasis, setSubstitutionBasis] = useState('Both');
  const [allowPeriodSwaps, setAllowPeriodSwaps] = useState(true);
  const [rooms, setRooms] = useState([
    { name: 'Room 101', type: 'Classroom', capacity: '40', floor: 'Ground', equipment: 'Projector, Whiteboard', status: 'Available' },
    { name: 'Room 102', type: 'Classroom', capacity: '40', floor: 'Ground', equipment: 'Projector, Whiteboard', status: 'Available' },
    { name: 'Room 103', type: 'Classroom', capacity: '40', floor: 'Ground', equipment: 'Whiteboard', status: 'Available' },
    { name: 'Room 104', type: 'Classroom', capacity: '40', floor: '1st', equipment: 'Projector, Whiteboard', status: 'Available' },
    { name: 'Room 105', type: 'Classroom', capacity: '40', floor: '1st', equipment: 'Whiteboard', status: 'Available' },
    { name: 'Room 106', type: 'Classroom', capacity: '40', floor: '1st', equipment: 'Projector, Whiteboard', status: 'Available' },
    { name: 'Science Lab', type: 'Lab', capacity: '30', floor: '2nd', equipment: 'Lab Tables, Fume Hood, Microscopes', status: 'Available' },
    { name: 'Computer Lab', type: 'Lab', capacity: '35', floor: '2nd', equipment: '35 PCs, Projector, AC', status: 'Available' },
    { name: 'Library', type: 'Library', capacity: '60', floor: 'Ground', equipment: 'Reading Tables, PCs, AC', status: 'Available' },
    { name: 'Auditorium', type: 'Auditorium', capacity: '500', floor: 'Ground', equipment: 'Stage, Sound System, Projector', status: 'Available' },
    { name: 'Staff Room', type: 'Staff Room', capacity: '50', floor: '1st', equipment: 'Desks, PCs, Printer', status: 'Available' },
    { name: 'Principal Office', type: 'Office', capacity: '5', floor: 'Ground', equipment: 'Desk, PC, AC, CCTV', status: 'Available' },
  ]);
  const roomTypes = ['Classroom', 'Lab', 'Library', 'Auditorium', 'Playground', 'Office', 'Staff Room'];
  const roomStatuses = ['Available', 'Under Maintenance', 'Reserved'];

  // ─── Timing Sets ───
  const [activeTimingSet, setActiveTimingSet] = useState('Primary (1-5)');
  const timingSets: Record<string, { period: string; start: string; end: string }[]> = {
    'Primary (1-5)': [
      { period: 'Assembly', start: '07:30', end: '07:45' },
      { period: 'Period 1', start: '07:45', end: '08:20' },
      { period: 'Period 2', start: '08:20', end: '08:55' },
      { period: 'Period 3', start: '08:55', end: '09:30' },
      { period: 'Short Break', start: '09:30', end: '09:45' },
      { period: 'Period 4', start: '09:45', end: '10:20' },
      { period: 'Period 5', start: '10:20', end: '10:55' },
      { period: 'Lunch Break', start: '10:55', end: '11:25' },
      { period: 'Period 6', start: '11:25', end: '12:00' },
    ],
    'Secondary (6-10)': [
      { period: 'Assembly', start: '07:30', end: '07:50' },
      { period: 'Period 1', start: '07:50', end: '08:30' },
      { period: 'Period 2', start: '08:30', end: '09:10' },
      { period: 'Period 3', start: '09:10', end: '09:50' },
      { period: 'Short Break', start: '09:50', end: '10:05' },
      { period: 'Period 4', start: '10:05', end: '10:45' },
      { period: 'Period 5', start: '10:45', end: '11:25' },
      { period: 'Lunch Break', start: '11:25', end: '12:00' },
      { period: 'Period 6', start: '12:00', end: '12:40' },
      { period: 'Period 7', start: '12:40', end: '01:20' },
      { period: 'Period 8', start: '01:20', end: '02:00' },
    ],
    'Senior Secondary (11-12)': [
      { period: 'Period 1', start: '07:30', end: '08:15' },
      { period: 'Period 2', start: '08:15', end: '09:00' },
      { period: 'Period 3', start: '09:00', end: '09:45' },
      { period: 'Short Break', start: '09:45', end: '10:00' },
      { period: 'Period 4', start: '10:00', end: '10:45' },
      { period: 'Period 5', start: '10:45', end: '11:30' },
      { period: 'Lunch Break', start: '11:30', end: '12:00' },
      { period: 'Period 6', start: '12:00', end: '12:45' },
      { period: 'Period 7', start: '12:45', end: '01:30' },
    ],
  };

  // ─── Timetable Builder Preview (Class 10-A) ───
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const periods = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8'];
  const subjectColors: Record<string, string> = {
    'Eng': 'bg-blue-100 text-blue-700', 'Math': 'bg-purple-100 text-purple-700',
    'Sci': 'bg-emerald-100 text-emerald-700', 'SSt': 'bg-amber-100 text-amber-700',
    'Hindi': 'bg-rose-100 text-rose-700', 'IT': 'bg-cyan-100 text-cyan-700',
    'PE': 'bg-orange-100 text-orange-700', 'Art': 'bg-pink-100 text-pink-700',
  };
  const timetableData: Record<string, { sub: string; teacher: string; conflict?: boolean }[]> = {
    'Mon': [{ sub: 'Eng', teacher: 'SI' }, { sub: 'Math', teacher: 'PS' }, { sub: 'Sci', teacher: 'RK' }, { sub: 'Hindi', teacher: 'AG' }, { sub: 'SSt', teacher: 'MD' }, { sub: 'IT', teacher: 'VN' }, { sub: 'PE', teacher: 'KJ' }, { sub: 'Art', teacher: 'SP' }],
    'Tue': [{ sub: 'Math', teacher: 'PS' }, { sub: 'Eng', teacher: 'SI' }, { sub: 'Hindi', teacher: 'AG' }, { sub: 'Sci', teacher: 'RK' }, { sub: 'IT', teacher: 'VN' }, { sub: 'SSt', teacher: 'MD' }, { sub: 'Eng', teacher: 'SI' }, { sub: 'Math', teacher: 'PS' }],
    'Wed': [{ sub: 'Sci', teacher: 'RK' }, { sub: 'SSt', teacher: 'MD' }, { sub: 'Eng', teacher: 'SI' }, { sub: 'Math', teacher: 'PS' }, { sub: 'Hindi', teacher: 'AG' }, { sub: 'PE', teacher: 'KJ' }, { sub: 'Sci', teacher: 'RK', conflict: true }, { sub: 'IT', teacher: 'VN' }],
    'Thu': [{ sub: 'Hindi', teacher: 'AG' }, { sub: 'Sci', teacher: 'RK' }, { sub: 'Math', teacher: 'PS' }, { sub: 'Eng', teacher: 'SI' }, { sub: 'SSt', teacher: 'MD' }, { sub: 'Art', teacher: 'SP' }, { sub: 'Hindi', teacher: 'AG' }, { sub: 'Sci', teacher: 'RK' }],
    'Fri': [{ sub: 'SSt', teacher: 'MD' }, { sub: 'Hindi', teacher: 'AG' }, { sub: 'Sci', teacher: 'RK' }, { sub: 'IT', teacher: 'VN' }, { sub: 'Math', teacher: 'PS' }, { sub: 'Eng', teacher: 'SI' }, { sub: 'PE', teacher: 'KJ' }, { sub: 'Math', teacher: 'PS' }],
    'Sat': [{ sub: 'Eng', teacher: 'SI' }, { sub: 'Math', teacher: 'PS' }, { sub: 'Hindi', teacher: 'AG' }, { sub: 'Sci', teacher: 'RK' }, { sub: 'SSt', teacher: 'MD' }, { sub: 'PE', teacher: 'KJ' }, { sub: '', teacher: '' }, { sub: '', teacher: '' }],
  };

  // ─── Today's Substitutions ───
  const [todaySubstitutions] = useState([
    { period: 'P3', absentTeacher: 'Mr. Kumar (Science)', substitute: 'Mrs. Joshi', class: '8-B', status: 'Confirmed' },
    { period: 'P5', absentTeacher: 'Ms. Nair (English)', substitute: 'Mr. Singh', class: '7-A', status: 'Pending' },
    { period: 'P7', absentTeacher: 'Mr. Kumar (Science)', substitute: 'Dr. Rao', class: '10-C', status: 'Confirmed' },
  ]);
  const [availableTeachers] = useState([
    { name: 'Mrs. Joshi', freePeriods: 'P1, P3, P6' },
    { name: 'Mr. Singh', freePeriods: 'P2, P5' },
    { name: 'Dr. Rao', freePeriods: 'P4, P7, P8' },
    { name: 'Ms. Verma', freePeriods: 'P1, P8' },
  ]);

  return (
    <div className="space-y-4">
      <ModuleHeader title="Timetable & Bell Schedule" subtitle="Bell timings, breaks, Saturday schedule, and special periods" theme={theme} />

      {/* ─── A) Timing Sets ─── */}
      <SectionCard title="Timing Sets" subtitle="Different bell schedules for different grade groups — each set defines period durations independently" theme={theme}>
        <div className="flex gap-1.5 mb-3">
          {Object.keys(timingSets).map(set => (
            <div key={set} className="flex items-center gap-1">
              <button onClick={() => setActiveTimingSet(set)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${activeTimingSet === set ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.highlight}`}`}>
                {set}
              </button>
              {activeTimingSet === set && (
                <button className="text-red-400 hover:text-red-600" title="Delete Set"><Trash2 size={10} /></button>
              )}
            </div>
          ))}
          <button className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border border-dashed ${theme.border} ${theme.iconColor} ${theme.buttonHover}`}>
            + Add Set
          </button>
        </div>
        <div className="space-y-1.5">
          {(timingSets[activeTimingSet] || []).map((p, i) => (
            <div key={i} className={`flex items-center gap-3 p-2 rounded-xl ${p.period.includes('Break') || p.period === 'Assembly' ? 'bg-amber-50 border border-amber-200' : theme.secondaryBg}`}>
              <span className={`text-xs font-bold ${theme.highlight} w-24`}>{p.period}</span>
              <span className={`text-xs ${theme.iconColor}`}>{p.start}</span>
              <span className={`text-[10px] ${theme.iconColor}`}>to</span>
              <span className={`text-xs ${theme.iconColor}`}>{p.end}</span>
              <span className={`text-[10px] ${theme.iconColor}`}>
                {(() => { const [sh, sm] = p.start.split(':').map(Number); const [eh, em] = p.end.split(':').map(Number); return `${(eh * 60 + em) - (sh * 60 + sm)} min`; })()}
              </span>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Bell Schedule" subtitle="Period-wise start and end times (editable master schedule)" theme={theme}>
        <div className="space-y-1.5">
          {bellSchedule.map((p, i) => (
            <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${p.period.includes('Break') || p.period === 'Assembly' ? 'bg-amber-50 border border-amber-200' : theme.secondaryBg}`}>
              <span className={`text-xs font-bold ${theme.highlight} w-24`}>{p.period}</span>
              <input type="time" value={p.start} onChange={e => { const n = [...bellSchedule]; n[i] = { ...n[i], start: e.target.value }; setBellSchedule(n); }}
                className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
              <span className={`text-xs ${theme.iconColor}`}>to</span>
              <input type="time" value={p.end} onChange={e => { const n = [...bellSchedule]; n[i] = { ...n[i], end: e.target.value }; setBellSchedule(n); }}
                className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
              <span className={`text-[10px] ${theme.iconColor}`}>
                {(() => { const [sh, sm] = p.start.split(':').map(Number); const [eh, em] = p.end.split(':').map(Number); return `${(eh * 60 + em) - (sh * 60 + sm)} min`; })()}
              </span>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="grid grid-cols-3 gap-4">
        <SectionCard title="Saturday Schedule" theme={theme}>
          <div className="space-y-2">
            {['full-day', 'half-day', 'off'].map(s => (
              <button key={s} onClick={() => setSaturdaySchedule(s)}
                className={`w-full text-left p-2.5 rounded-xl text-xs font-bold transition-all capitalize ${saturdaySchedule === s ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.highlight}`}`}>
                {s.replace('-', ' ')}
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Zero Period" subtitle="Optional early morning period" theme={theme}>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <span className={`text-xs font-bold ${theme.highlight}`}>Enable Zero Period</span>
              <SSAToggle on={zeroPeriod} onChange={() => setZeroPeriod(!zeroPeriod)} theme={theme} />
            </div>
            {zeroPeriod && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Start</p>
                  <InputField value={zeroPeriodTime.start} onChange={v => setZeroPeriodTime(p => ({ ...p, start: v }))} theme={theme} type="time" />
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>End</p>
                  <InputField value={zeroPeriodTime.end} onChange={v => setZeroPeriodTime(p => ({ ...p, end: v }))} theme={theme} type="time" />
                </div>
              </div>
            )}
          </div>
        </SectionCard>

        <SectionCard title="Assembly" subtitle="Morning assembly duration" theme={theme}>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Duration (minutes)</p>
            <InputField value={assemblyTime} onChange={setAssemblyTime} theme={theme} type="number" />
          </div>
        </SectionCard>
      </div>

      {/* ─── B) Timetable Builder Preview ─── */}
      <SectionCard title="Timetable Builder" subtitle="Visual timetable preview for Class 10-A &mdash; color-coded by subject" theme={theme}>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-[10px]">
            <thead><tr className={theme.secondaryBg}>
              <th className={`px-2 py-1.5 font-bold ${theme.iconColor} w-10`}></th>
              {days.map(d => <th key={d} className={`px-2 py-1.5 font-bold ${theme.iconColor} text-center`}>{d}</th>)}
            </tr></thead>
            <tbody>
              {periods.map((p, pi) => (
                <tr key={p} className={`border-t ${theme.border}`}>
                  <td className={`px-2 py-1 font-bold ${theme.iconColor} text-center`}>{p}</td>
                  {days.map(d => {
                    const cell = timetableData[d]?.[pi];
                    if (!cell || !cell.sub) return <td key={d} className="px-1 py-1 text-center"><span className={`text-[9px] ${theme.iconColor}`}>--</span></td>;
                    const colorClass = subjectColors[cell.sub] || 'bg-gray-100 text-gray-700';
                    return (
                      <td key={d} className="px-1 py-1 text-center relative">
                        <div className={`px-1.5 py-1 rounded-lg ${colorClass} font-bold`}>
                          {cell.sub} <span className="font-normal opacity-70">({cell.teacher})</span>
                        </div>
                        {cell.conflict && (
                          <div className="absolute top-0.5 right-0.5" title="Conflict detected">
                            <AlertCircle size={10} className="text-red-500" />
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {Object.entries(subjectColors).map(([sub, cls]) => (
              <span key={sub} className={`px-2 py-0.5 rounded text-[9px] font-bold ${cls}`}>{sub}</span>
            ))}
          </div>
          <button className={`px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}>Edit Timetable</button>
        </div>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Teacher Substitution" subtitle="How absent teacher periods are handled" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Substitution Mode</p>
              <SelectField options={['Manual', 'Auto-suggest', 'Both']} value={substitutionMode} onChange={setSubstitutionMode} theme={theme} />
            </div>
            {(substitutionMode === 'Auto-suggest' || substitutionMode === 'Both') && (
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Auto-suggest Based On</p>
                <SelectField options={['Free periods', 'Subject match', 'Both']} value={substitutionBasis} onChange={setSubstitutionBasis} theme={theme} />
              </div>
            )}
          </div>
        </SectionCard>

        <SectionCard title="Period Swaps" subtitle="Teacher-initiated period exchange" theme={theme}>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Allow Teachers to Swap Periods</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Teachers can request mutual period swaps for a given day</p>
            </div>
            <SSAToggle on={allowPeriodSwaps} onChange={() => setAllowPeriodSwaps(!allowPeriodSwaps)} theme={theme} />
          </div>
        </SectionCard>
      </div>

      {/* ─── D) Today's Substitutions & Available Teachers ─── */}
      <SectionCard title="Today's Substitutions" subtitle="Substitution assignments for absent teachers today" theme={theme}>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Period', 'Absent Teacher', 'Substitute', 'Class', 'Status'].map(h => (
                <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {todaySubstitutions.map((s, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{s.period}</td>
                  <td className={`px-3 py-2 ${theme.iconColor}`}>{s.absentTeacher}</td>
                  <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{s.substitute}</td>
                  <td className={`px-3 py-2 ${theme.iconColor}`}>{s.class}</td>
                  <td className="px-3 py-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${s.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{s.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <p className={`text-[10px] font-bold ${theme.iconColor} mb-2 uppercase tracking-wide`}>Available Teachers (Free Periods Today)</p>
          <div className="flex flex-wrap gap-2">
            {availableTeachers.map((t, i) => (
              <div key={i} className={`px-3 py-1.5 rounded-xl ${theme.secondaryBg}`}>
                <span className={`text-xs font-bold ${theme.highlight}`}>{t.name}</span>
                <span className={`text-[10px] ${theme.iconColor} ml-2`}>Free: {t.freePeriods}</span>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* ─── C) Import Timetable from Excel ─── */}
      <SectionCard title="Import Timetable from Excel" subtitle="Upload a pre-built timetable via spreadsheet" theme={theme}>
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-4 rounded-xl border-2 border-dashed ${theme.border} text-center`}>
            <Upload size={24} className={`mx-auto mb-2 ${theme.iconColor}`} />
            <p className={`text-xs font-bold ${theme.highlight} mb-1`}>Drag & drop Excel file here</p>
            <p className={`text-[10px] ${theme.iconColor}`}>or click to browse</p>
          </div>
          <div className={`p-4 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight} mb-2`}>Instructions</p>
            <ul className={`text-[10px] ${theme.iconColor} space-y-1 list-disc pl-3`}>
              <li>Use the provided template format</li>
              <li>One sheet per class-section</li>
              <li>Teacher names must match staff records</li>
            </ul>
            <a href="#" className="text-[10px] font-bold text-blue-500 hover:underline mt-2 inline-block">Download Template</a>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Rooms & Infrastructure" subtitle="Manage school rooms, labs, and facilities with capacity and status" theme={theme}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Room Name', 'Type', 'Capacity', 'Floor', 'Equipment', 'Status', ''].map(h => (
                <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {rooms.map((r, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className="px-2 py-1.5">
                    <input value={r.name} onChange={e => { const n = [...rooms]; n[i] = { ...n[i], name: e.target.value }; setRooms(n); }}
                      className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <select value={r.type} onChange={e => { const n = [...rooms]; n[i] = { ...n[i], type: e.target.value }; setRooms(n); }}
                      className={`px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight}`}>
                      {roomTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </td>
                  <td className="px-2 py-1.5">
                    <input value={r.capacity} onChange={e => { const n = [...rooms]; n[i] = { ...n[i], capacity: e.target.value }; setRooms(n); }}
                      className={`w-12 px-1 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <input value={r.floor} onChange={e => { const n = [...rooms]; n[i] = { ...n[i], floor: e.target.value }; setRooms(n); }}
                      className={`w-16 px-1 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <input value={r.equipment} onChange={e => { const n = [...rooms]; n[i] = { ...n[i], equipment: e.target.value }; setRooms(n); }}
                      className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <select value={r.status} onChange={e => { const n = [...rooms]; n[i] = { ...n[i], status: e.target.value }; setRooms(n); }}
                      className={`px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] font-bold ${
                        r.status === 'Available' ? 'text-emerald-600' : r.status === 'Under Maintenance' ? 'text-amber-600' : 'text-blue-600'
                      }`}>
                      {roomStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-2 py-1.5"><button onClick={() => setRooms(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={12} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={() => setRooms(p => [...p, { name: '', type: 'Classroom', capacity: '40', floor: '', equipment: '', status: 'Available' }])}
          className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl mt-2`}>
          <Plus size={12} /> Add Room
        </button>
      </SectionCard>

      <SectionCard title="Role-Based Permissions" subtitle="Control who can view, create, edit, delete, import, and export" theme={theme}>
        <div className="space-y-4">
          <MasterPermissionGrid masterName="Periods" roles={['Super Admin', 'Principal', 'School Admin', 'Teacher', 'Accountant']} theme={theme} />
          <MasterPermissionGrid masterName="Room Types" roles={['Super Admin', 'Principal', 'School Admin', 'Teacher', 'Accountant']} theme={theme} />
        </div>
      </SectionCard>
    </div>
  );
}
