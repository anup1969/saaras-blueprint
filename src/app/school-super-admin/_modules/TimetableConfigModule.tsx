'use client';

import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
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

  return (
    <div className="space-y-4">
      <ModuleHeader title="Timetable & Bell Schedule" subtitle="Bell timings, breaks, Saturday schedule, and special periods" theme={theme} />

      <SectionCard title="Bell Schedule" subtitle="Period-wise start and end times" theme={theme}>
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
    </div>
  );
}
