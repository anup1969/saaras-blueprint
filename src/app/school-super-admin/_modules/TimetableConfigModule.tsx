'use client';

import React, { useState } from 'react';
import { X, Plus, Upload, AlertCircle, Trash2, Search, Download, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Save, ArrowRight } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

// ─── Types ─────────────────────────────────────────
type TimingSetEntry = { id: number; period: string; start: string; end: string; enabled: boolean };
type TimingSetData = { id: number; name: string; entries: TimingSetEntry[]; enabled: boolean };
type BellEntry = { id: number; period: string; start: string; end: string; enabled: boolean };
type RoomEntry = {
  id: number; name: string; type: string; capacity: string; floor: string;
  equipment: string; status: string; enabled: boolean;
};
type TimetableCell = { sub: string; teacher: string; conflict?: boolean };

const PAGE_SIZE = 5;

// ─── Sub-component: Table Toolbar ─────────────────
function TableToolbar({
  search, onSearch, count, label, onAdd, onExport, onImport, theme,
}: {
  search: string; onSearch: (v: string) => void; count: number; label: string;
  onAdd: () => void; onExport: () => void; onImport: () => void; theme: Theme;
}) {
  return (
    <div className="flex items-center gap-2 mb-3 flex-wrap">
      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${theme.border} ${theme.inputBg} flex-1 min-w-[160px]`}>
        <Search size={13} className={theme.iconColor} />
        <input value={search} onChange={e => onSearch(e.target.value)} placeholder={`Search ${label}...`}
          className={`flex-1 bg-transparent text-xs ${theme.highlight} outline-none placeholder-gray-400`} />
        {search && <button onClick={() => onSearch('')}><X size={12} className="text-gray-400 hover:text-red-400" /></button>}
      </div>
      <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${theme.secondaryBg} ${theme.iconColor} shrink-0`}>{count} records</span>
      <button onClick={onAdd}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-white ${theme.primary} hover:opacity-90 shrink-0`}>
        <Plus size={12} /> Add
      </button>
      <button onClick={onExport}
        className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border border-emerald-300 text-emerald-600 hover:bg-emerald-50 shrink-0">
        <Download size={12} /> Export
      </button>
      <button onClick={onImport}
        className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border border-blue-300 text-blue-600 hover:bg-blue-50 shrink-0">
        <Upload size={12} /> Import
      </button>
    </div>
  );
}

// ─── Sub-component: Pagination ─────────────────────
function Pagination({ page, total, pageSize, onChange, theme }: { page: number; total: number; pageSize: number; onChange: (p: number) => void; theme: Theme }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-end gap-2 mt-2">
      <button disabled={page === 1} onClick={() => onChange(page - 1)}
        className={`p-1 rounded-lg border ${theme.border} disabled:opacity-30 ${theme.buttonHover}`}>
        <ChevronLeft size={13} className={theme.iconColor} />
      </button>
      <span className={`text-[10px] ${theme.iconColor}`}>Page {page} / {totalPages}</span>
      <button disabled={page === totalPages} onClick={() => onChange(page + 1)}
        className={`p-1 rounded-lg border ${theme.border} disabled:opacity-30 ${theme.buttonHover}`}>
        <ChevronRight size={13} className={theme.iconColor} />
      </button>
    </div>
  );
}

type TabId = 'schedule' | 'builder' | 'substitution' | 'settings';

// ─── Main Module ────────────────────────────────────
export default function TimetableConfigModule({ theme, activeTab: externalTab, onTabChange }: { theme: Theme; activeTab?: string; onTabChange?: (tab: string) => void }) {

  // ── A) Timing Sets (full master table) ─────────────
  const [timingSets, setTimingSets] = useState<TimingSetData[]>([
    {
      id: 1, name: 'Primary (1-5)', enabled: true,
      entries: [
        { id: 1, period: 'Assembly', start: '07:30', end: '07:45', enabled: true },
        { id: 2, period: 'Period 1', start: '07:45', end: '08:20', enabled: true },
        { id: 3, period: 'Period 2', start: '08:20', end: '08:55', enabled: true },
        { id: 4, period: 'Period 3', start: '08:55', end: '09:30', enabled: true },
        { id: 5, period: 'Short Break', start: '09:30', end: '09:45', enabled: true },
        { id: 6, period: 'Period 4', start: '09:45', end: '10:20', enabled: true },
        { id: 7, period: 'Period 5', start: '10:20', end: '10:55', enabled: true },
        { id: 8, period: 'Lunch Break', start: '10:55', end: '11:25', enabled: true },
        { id: 9, period: 'Period 6', start: '11:25', end: '12:00', enabled: true },
      ],
    },
    {
      id: 2, name: 'Secondary (6-10)', enabled: true,
      entries: [
        { id: 1, period: 'Assembly', start: '07:30', end: '07:50', enabled: true },
        { id: 2, period: 'Period 1', start: '07:50', end: '08:30', enabled: true },
        { id: 3, period: 'Period 2', start: '08:30', end: '09:10', enabled: true },
        { id: 4, period: 'Period 3', start: '09:10', end: '09:50', enabled: true },
        { id: 5, period: 'Short Break', start: '09:50', end: '10:05', enabled: true },
        { id: 6, period: 'Period 4', start: '10:05', end: '10:45', enabled: true },
        { id: 7, period: 'Period 5', start: '10:45', end: '11:25', enabled: true },
        { id: 8, period: 'Lunch Break', start: '11:25', end: '12:00', enabled: true },
        { id: 9, period: 'Period 6', start: '12:00', end: '12:40', enabled: true },
        { id: 10, period: 'Period 7', start: '12:40', end: '01:20', enabled: true },
        { id: 11, period: 'Period 8', start: '01:20', end: '02:00', enabled: true },
      ],
    },
    {
      id: 3, name: 'Senior Secondary (11-12)', enabled: true,
      entries: [
        { id: 1, period: 'Period 1', start: '07:30', end: '08:15', enabled: true },
        { id: 2, period: 'Period 2', start: '08:15', end: '09:00', enabled: true },
        { id: 3, period: 'Period 3', start: '09:00', end: '09:45', enabled: true },
        { id: 4, period: 'Short Break', start: '09:45', end: '10:00', enabled: true },
        { id: 5, period: 'Period 4', start: '10:00', end: '10:45', enabled: true },
        { id: 6, period: 'Period 5', start: '10:45', end: '11:30', enabled: true },
        { id: 7, period: 'Lunch Break', start: '11:30', end: '12:00', enabled: true },
        { id: 8, period: 'Period 6', start: '12:00', end: '12:45', enabled: true },
        { id: 9, period: 'Period 7', start: '12:45', end: '01:30', enabled: true },
      ],
    },
  ]);
  const [activeTimingSetId, setActiveTimingSetId] = useState(1);
  const [tsSearch, setTsSearch] = useState('');
  const [tsPage, setTsPage] = useState(1);
  const [editingSetId, setEditingSetId] = useState<number | null>(null);
  const [editingSetName, setEditingSetName] = useState('');

  const activeSet = timingSets.find(s => s.id === activeTimingSetId);
  const filteredTsEntries = (activeSet?.entries || []).filter(e =>
    e.period.toLowerCase().includes(tsSearch.toLowerCase())
  );
  const pagedTsEntries = filteredTsEntries.slice((tsPage - 1) * PAGE_SIZE, tsPage * PAGE_SIZE);

  function addTimingSet() {
    const newId = Date.now();
    setTimingSets(p => [...p, { id: newId, name: 'New Set', enabled: true, entries: [] }]);
    setActiveTimingSetId(newId);
  }
  function deleteTimingSet(id: number) {
    setTimingSets(p => p.filter(s => s.id !== id));
    if (activeTimingSetId === id) setActiveTimingSetId(timingSets[0]?.id || 0);
  }
  function toggleTimingSet(id: number) {
    setTimingSets(p => p.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
  }
  function startEditSetName(id: number, name: string) {
    setEditingSetId(id);
    setEditingSetName(name);
  }
  function saveSetName(id: number) {
    setTimingSets(p => p.map(s => s.id === id ? { ...s, name: editingSetName } : s));
    setEditingSetId(null);
  }
  function addTsEntry() {
    if (!activeSet) return;
    setTimingSets(p => p.map(s => s.id === activeTimingSetId
      ? { ...s, entries: [...s.entries, { id: Date.now(), period: '', start: '08:00', end: '08:40', enabled: true }] }
      : s
    ));
  }
  function updateTsEntry(entryId: number, field: keyof TimingSetEntry, value: string | boolean) {
    setTimingSets(p => p.map(s => s.id === activeTimingSetId
      ? { ...s, entries: s.entries.map(e => e.id === entryId ? { ...e, [field]: value } : e) }
      : s
    ));
  }
  function deleteTsEntry(entryId: number) {
    setTimingSets(p => p.map(s => s.id === activeTimingSetId
      ? { ...s, entries: s.entries.filter(e => e.id !== entryId) }
      : s
    ));
  }

  // ── B) Bell Schedule (full master table) ──────────
  const [bellSchedule, setBellSchedule] = useState<BellEntry[]>([
    { id: 1, period: 'Assembly', start: '07:30', end: '07:50', enabled: true },
    { id: 2, period: 'Period 1', start: '07:50', end: '08:30', enabled: true },
    { id: 3, period: 'Period 2', start: '08:30', end: '09:10', enabled: true },
    { id: 4, period: 'Period 3', start: '09:10', end: '09:50', enabled: true },
    { id: 5, period: 'Short Break', start: '09:50', end: '10:05', enabled: true },
    { id: 6, period: 'Period 4', start: '10:05', end: '10:45', enabled: true },
    { id: 7, period: 'Period 5', start: '10:45', end: '11:25', enabled: true },
    { id: 8, period: 'Lunch Break', start: '11:25', end: '12:00', enabled: true },
    { id: 9, period: 'Period 6', start: '12:00', end: '12:40', enabled: true },
    { id: 10, period: 'Period 7', start: '12:40', end: '01:20', enabled: true },
    { id: 11, period: 'Period 8', start: '01:20', end: '02:00', enabled: true },
  ]);
  const [bellSearch, setBellSearch] = useState('');
  const [bellPage, setBellPage] = useState(1);

  const filteredBell = bellSchedule.filter(b =>
    b.period.toLowerCase().includes(bellSearch.toLowerCase())
  );
  const pagedBell = filteredBell.slice((bellPage - 1) * PAGE_SIZE, bellPage * PAGE_SIZE);

  function addBellEntry() {
    setBellSchedule(p => [...p, { id: Date.now(), period: '', start: '08:00', end: '08:40', enabled: true }]);
  }
  function updateBellEntry(id: number, field: keyof BellEntry, value: string | boolean) {
    setBellSchedule(p => p.map(b => b.id === id ? { ...b, [field]: value } : b));
  }
  function deleteBellEntry(id: number) {
    setBellSchedule(p => p.filter(b => b.id !== id));
  }

  // ── Settings ──────────────────────────────────────
  const [saturdaySchedule, setSaturdaySchedule] = useState('half-day');
  const [zeroPeriod, setZeroPeriod] = useState(false);
  const [zeroPeriodTime, setZeroPeriodTime] = useState({ start: '07:00', end: '07:30' });
  const [assemblyTime, setAssemblyTime] = useState('15');
  const [substitutionMode, setSubstitutionMode] = useState('Both');
  const [substitutionBasis, setSubstitutionBasis] = useState('Both');
  const [allowPeriodSwaps, setAllowPeriodSwaps] = useState(true);

  // ── C) Rooms & Infrastructure (full master table) ──
  const [rooms, setRooms] = useState<RoomEntry[]>([
    { id: 1, name: 'Room 101', type: 'Classroom', capacity: '40', floor: 'Ground', equipment: 'Projector, Whiteboard', status: 'Available', enabled: true },
    { id: 2, name: 'Room 102', type: 'Classroom', capacity: '40', floor: 'Ground', equipment: 'Projector, Whiteboard', status: 'Available', enabled: true },
    { id: 3, name: 'Room 103', type: 'Classroom', capacity: '40', floor: 'Ground', equipment: 'Whiteboard', status: 'Available', enabled: true },
    { id: 4, name: 'Room 104', type: 'Classroom', capacity: '40', floor: '1st', equipment: 'Projector, Whiteboard', status: 'Available', enabled: true },
    { id: 5, name: 'Room 105', type: 'Classroom', capacity: '40', floor: '1st', equipment: 'Whiteboard', status: 'Available', enabled: true },
    { id: 6, name: 'Room 106', type: 'Classroom', capacity: '40', floor: '1st', equipment: 'Projector, Whiteboard', status: 'Available', enabled: true },
    { id: 7, name: 'Science Lab', type: 'Lab', capacity: '30', floor: '2nd', equipment: 'Lab Tables, Fume Hood, Microscopes', status: 'Available', enabled: true },
    { id: 8, name: 'Computer Lab', type: 'Lab', capacity: '35', floor: '2nd', equipment: '35 PCs, Projector, AC', status: 'Available', enabled: true },
    { id: 9, name: 'Library', type: 'Library', capacity: '60', floor: 'Ground', equipment: 'Reading Tables, PCs, AC', status: 'Available', enabled: true },
    { id: 10, name: 'Auditorium', type: 'Auditorium', capacity: '500', floor: 'Ground', equipment: 'Stage, Sound System, Projector', status: 'Available', enabled: true },
    { id: 11, name: 'Staff Room', type: 'Staff Room', capacity: '50', floor: '1st', equipment: 'Desks, PCs, Printer', status: 'Available', enabled: true },
    { id: 12, name: 'Principal Office', type: 'Office', capacity: '5', floor: 'Ground', equipment: 'Desk, PC, AC, CCTV', status: 'Available', enabled: true },
  ]);
  const [roomSearch, setRoomSearch] = useState('');
  const [roomPage, setRoomPage] = useState(1);
  const roomTypes = ['Classroom', 'Lab', 'Library', 'Auditorium', 'Playground', 'Office', 'Staff Room'];
  const roomStatuses = ['Available', 'Under Maintenance', 'Reserved'];

  const filteredRooms = rooms.filter(r =>
    r.name.toLowerCase().includes(roomSearch.toLowerCase()) ||
    r.type.toLowerCase().includes(roomSearch.toLowerCase()) ||
    r.floor.toLowerCase().includes(roomSearch.toLowerCase())
  );
  const pagedRooms = filteredRooms.slice((roomPage - 1) * PAGE_SIZE, roomPage * PAGE_SIZE);

  function addRoom() {
    setRooms(p => [...p, { id: Date.now(), name: '', type: 'Classroom', capacity: '40', floor: '', equipment: '', status: 'Available', enabled: true }]);
  }
  function updateRoom(id: number, field: keyof RoomEntry, value: string | boolean) {
    setRooms(p => p.map(r => r.id === id ? { ...r, [field]: value } : r));
  }
  function deleteRoom(id: number) {
    setRooms(p => p.filter(r => r.id !== id));
  }

  // ── D) Timetable Builder (clickable cells) ────────
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const periods = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8'];
  const subjectOptions = ['Eng', 'Math', 'Sci', 'SSt', 'Hindi', 'IT', 'PE', 'Art'];
  const teacherOptions = [
    { code: 'SI', name: 'Mrs. Iyer' }, { code: 'PS', name: 'Mr. Sharma' },
    { code: 'RK', name: 'Mr. Kumar' }, { code: 'AG', name: 'Ms. Gupta' },
    { code: 'MD', name: 'Mr. Das' }, { code: 'VN', name: 'Ms. Nair' },
    { code: 'KJ', name: 'Mr. Joshi' }, { code: 'SP', name: 'Ms. Patel' },
  ];
  const subjectColors: Record<string, string> = {
    'Eng': 'bg-blue-100 text-blue-700', 'Math': 'bg-purple-100 text-purple-700',
    'Sci': 'bg-emerald-100 text-emerald-700', 'SSt': 'bg-amber-100 text-amber-700',
    'Hindi': 'bg-rose-100 text-rose-700', 'IT': 'bg-cyan-100 text-cyan-700',
    'PE': 'bg-orange-100 text-orange-700', 'Art': 'bg-pink-100 text-pink-700',
  };

  const [timetableData, setTimetableData] = useState<Record<string, TimetableCell[]>>({
    'Mon': [{ sub: 'Eng', teacher: 'SI' }, { sub: 'Math', teacher: 'PS' }, { sub: 'Sci', teacher: 'RK' }, { sub: 'Hindi', teacher: 'AG' }, { sub: 'SSt', teacher: 'MD' }, { sub: 'IT', teacher: 'VN' }, { sub: 'PE', teacher: 'KJ' }, { sub: 'Art', teacher: 'SP' }],
    'Tue': [{ sub: 'Math', teacher: 'PS' }, { sub: 'Eng', teacher: 'SI' }, { sub: 'Hindi', teacher: 'AG' }, { sub: 'Sci', teacher: 'RK' }, { sub: 'IT', teacher: 'VN' }, { sub: 'SSt', teacher: 'MD' }, { sub: 'Eng', teacher: 'SI' }, { sub: 'Math', teacher: 'PS' }],
    'Wed': [{ sub: 'Sci', teacher: 'RK' }, { sub: 'SSt', teacher: 'MD' }, { sub: 'Eng', teacher: 'SI' }, { sub: 'Math', teacher: 'PS' }, { sub: 'Hindi', teacher: 'AG' }, { sub: 'PE', teacher: 'KJ' }, { sub: 'Sci', teacher: 'RK', conflict: true }, { sub: 'IT', teacher: 'VN' }],
    'Thu': [{ sub: 'Hindi', teacher: 'AG' }, { sub: 'Sci', teacher: 'RK' }, { sub: 'Math', teacher: 'PS' }, { sub: 'Eng', teacher: 'SI' }, { sub: 'SSt', teacher: 'MD' }, { sub: 'Art', teacher: 'SP' }, { sub: 'Hindi', teacher: 'AG' }, { sub: 'Sci', teacher: 'RK' }],
    'Fri': [{ sub: 'SSt', teacher: 'MD' }, { sub: 'Hindi', teacher: 'AG' }, { sub: 'Sci', teacher: 'RK' }, { sub: 'IT', teacher: 'VN' }, { sub: 'Math', teacher: 'PS' }, { sub: 'Eng', teacher: 'SI' }, { sub: 'PE', teacher: 'KJ' }, { sub: 'Math', teacher: 'PS' }],
    'Sat': [{ sub: 'Eng', teacher: 'SI' }, { sub: 'Math', teacher: 'PS' }, { sub: 'Hindi', teacher: 'AG' }, { sub: 'Sci', teacher: 'RK' }, { sub: 'SSt', teacher: 'MD' }, { sub: 'PE', teacher: 'KJ' }, { sub: '', teacher: '' }, { sub: '', teacher: '' }],
  });
  const [editingCell, setEditingCell] = useState<{ day: string; period: number } | null>(null);
  const [cellSub, setCellSub] = useState('');
  const [cellTeacher, setCellTeacher] = useState('');

  function openCellEditor(day: string, pi: number) {
    const cell = timetableData[day]?.[pi];
    setCellSub(cell?.sub || '');
    setCellTeacher(cell?.teacher || '');
    setEditingCell({ day, period: pi });
  }
  function saveCellEdit() {
    if (!editingCell) return;
    setTimetableData(prev => {
      const newData = { ...prev };
      const dayArr = [...(newData[editingCell.day] || [])];
      // Extend array if needed
      while (dayArr.length <= editingCell.period) dayArr.push({ sub: '', teacher: '' });
      dayArr[editingCell.period] = { sub: cellSub, teacher: cellTeacher };
      newData[editingCell.day] = dayArr;
      return newData;
    });
    setEditingCell(null);
  }
  function cancelCellEdit() {
    setEditingCell(null);
  }

  // ── Substitutions (preserved) ─────────────────────
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

  const [internalTab, setInternalTab] = useState<TabId>('schedule');
  const activeTab = (externalTab as TabId) || internalTab;
  const setActiveTab = (tab: TabId) => { if (onTabChange) onTabChange(tab); else setInternalTab(tab); };

  // ── Duration helper ───────────────────────────────
  function calcDuration(start: string, end: string) {
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    return `${(eh * 60 + em) - (sh * 60 + sm)} min`;
  }

  return (
    <div className="space-y-4">
      <ModuleHeader title="Timetable & Bell Schedule" subtitle="Bell timings, breaks, Saturday schedule, and special periods" theme={theme} />

      {activeTab === 'schedule' && (<div className="space-y-4">
      {/* ─── A) Timing Sets (full master table) ─── */}
      <SectionCard title="Timing Sets" subtitle="Different bell schedules for different grade groups -- each set defines period durations independently" theme={theme}>
        {/* Set tabs with edit/delete/toggle */}
        <div className="flex gap-1.5 mb-3 flex-wrap">
          {timingSets.map(set => (
            <div key={set.id} className="flex items-center gap-1">
              {editingSetId === set.id ? (
                <div className="flex items-center gap-1">
                  <input value={editingSetName} onChange={e => setEditingSetName(e.target.value)}
                    className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] font-bold ${theme.highlight} outline-none w-32`}
                    autoFocus onKeyDown={e => { if (e.key === 'Enter') saveSetName(set.id); if (e.key === 'Escape') setEditingSetId(null); }} />
                  <button onClick={() => saveSetName(set.id)} className="text-emerald-500 hover:text-emerald-700 text-[10px] font-bold">OK</button>
                </div>
              ) : (
                <button onClick={() => setActiveTimingSetId(set.id)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${activeTimingSetId === set.id ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.highlight}`} ${!set.enabled ? 'opacity-50' : ''}`}>
                  {set.name}
                </button>
              )}
              {activeTimingSetId === set.id && editingSetId !== set.id && (
                <div className="flex items-center gap-1">
                  <button onClick={() => startEditSetName(set.id, set.name)} className="text-blue-400 hover:text-blue-600" title="Edit Set Name">
                    <Search size={10} />
                  </button>
                  <SSAToggle on={set.enabled} onChange={() => toggleTimingSet(set.id)} theme={theme} />
                  <button onClick={() => deleteTimingSet(set.id)} className="text-red-400 hover:text-red-600" title="Delete Set"><Trash2 size={10} /></button>
                </div>
              )}
            </div>
          ))}
          <button onClick={addTimingSet}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border border-dashed ${theme.border} ${theme.iconColor} ${theme.buttonHover}`}>
            + Add Set
          </button>
        </div>

        {/* Entries table for active set */}
        {activeSet && (
          <>
            <TableToolbar
              search={tsSearch} onSearch={v => { setTsSearch(v); setTsPage(1); }}
              count={filteredTsEntries.length} label="periods"
              onAdd={addTsEntry}
              onExport={() => alert('Export timing set as CSV')}
              onImport={() => alert('Import timing set from CSV')}
              theme={theme}
            />
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className={theme.secondaryBg}>
                    {['Period Name', 'Start', 'End', 'Duration', 'Enabled', ''].map(h => (
                      <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor} whitespace-nowrap`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pagedTsEntries.length === 0 ? (
                    <tr><td colSpan={6} className={`text-center py-6 text-xs ${theme.iconColor}`}>No periods found</td></tr>
                  ) : pagedTsEntries.map(entry => (
                    <tr key={entry.id} className={`border-t ${theme.border} ${!entry.enabled ? 'opacity-50' : ''} ${entry.period.includes('Break') || entry.period === 'Assembly' ? 'bg-amber-50' : ''}`}>
                      <td className="px-2 py-1.5">
                        <input value={entry.period}
                          onChange={e => updateTsEntry(entry.id, 'period', e.target.value)}
                          className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`}
                          placeholder="Period name" />
                      </td>
                      <td className="px-2 py-1.5">
                        <input type="time" value={entry.start}
                          onChange={e => updateTsEntry(entry.id, 'start', e.target.value)}
                          className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                      </td>
                      <td className="px-2 py-1.5">
                        <input type="time" value={entry.end}
                          onChange={e => updateTsEntry(entry.id, 'end', e.target.value)}
                          className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                      </td>
                      <td className={`px-3 py-2 text-[10px] ${theme.iconColor}`}>{calcDuration(entry.start, entry.end)}</td>
                      <td className="px-3 py-2">
                        <SSAToggle on={entry.enabled} onChange={() => updateTsEntry(entry.id, 'enabled', !entry.enabled)} theme={theme} />
                      </td>
                      <td className="px-2 py-1.5">
                        <button onClick={() => deleteTsEntry(entry.id)} className="text-red-400 hover:text-red-600"><X size={12} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination page={tsPage} total={filteredTsEntries.length} pageSize={PAGE_SIZE} onChange={setTsPage} theme={theme} />
          </>
        )}
      </SectionCard>

      {/* ─── B) Bell Schedule (full master table) ─── */}
      <SectionCard title="Bell Schedule" subtitle="Period-wise start and end times (editable master schedule)" theme={theme}>
        <TableToolbar
          search={bellSearch} onSearch={v => { setBellSearch(v); setBellPage(1); }}
          count={filteredBell.length} label="periods"
          onAdd={addBellEntry}
          onExport={() => alert('Export bell schedule as CSV')}
          onImport={() => alert('Import bell schedule from CSV')}
          theme={theme}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className={theme.secondaryBg}>
                {['Period Name', 'Start', 'End', 'Duration', 'Enabled', ''].map(h => (
                  <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor} whitespace-nowrap`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pagedBell.length === 0 ? (
                <tr><td colSpan={6} className={`text-center py-6 text-xs ${theme.iconColor}`}>No periods found</td></tr>
              ) : pagedBell.map(b => (
                <tr key={b.id} className={`border-t ${theme.border} ${!b.enabled ? 'opacity-50' : ''} ${b.period.includes('Break') || b.period === 'Assembly' ? 'bg-amber-50' : ''}`}>
                  <td className="px-2 py-1.5">
                    <input value={b.period}
                      onChange={e => updateBellEntry(b.id, 'period', e.target.value)}
                      className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`}
                      placeholder="Period name" />
                  </td>
                  <td className="px-2 py-1.5">
                    <input type="time" value={b.start}
                      onChange={e => updateBellEntry(b.id, 'start', e.target.value)}
                      className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <input type="time" value={b.end}
                      onChange={e => updateBellEntry(b.id, 'end', e.target.value)}
                      className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                  </td>
                  <td className={`px-3 py-2 text-[10px] ${theme.iconColor}`}>{calcDuration(b.start, b.end)}</td>
                  <td className="px-3 py-2">
                    <SSAToggle on={b.enabled} onChange={() => updateBellEntry(b.id, 'enabled', !b.enabled)} theme={theme} />
                  </td>
                  <td className="px-2 py-1.5">
                    <button onClick={() => deleteBellEntry(b.id)} className="text-red-400 hover:text-red-600"><X size={12} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={bellPage} total={filteredBell.length} pageSize={PAGE_SIZE} onChange={setBellPage} theme={theme} />
      </SectionCard>

      {/* ─── Settings Row ─── */}
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
      </div>)}

      {activeTab === 'builder' && (<div className="space-y-4">
      {/* ─── D) Timetable Builder (clickable cells with inline picker) ─── */}
      <SectionCard title="Timetable Builder" subtitle="Visual timetable for Class 10-A -- click any cell to assign subject &amp; teacher" theme={theme}>
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
                    const isEditing = editingCell?.day === d && editingCell?.period === pi;

                    if (isEditing) {
                      return (
                        <td key={d} className="px-1 py-1 text-center">
                          <div className={`p-1.5 rounded-lg border-2 border-blue-400 bg-white shadow-lg space-y-1`}>
                            <select value={cellSub} onChange={e => setCellSub(e.target.value)}
                              className={`w-full px-1 py-0.5 rounded border ${theme.border} text-[9px] ${theme.highlight} outline-none`}>
                              <option value="">-- Subject --</option>
                              {subjectOptions.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <select value={cellTeacher} onChange={e => setCellTeacher(e.target.value)}
                              className={`w-full px-1 py-0.5 rounded border ${theme.border} text-[9px] ${theme.highlight} outline-none`}>
                              <option value="">-- Teacher --</option>
                              {teacherOptions.map(t => <option key={t.code} value={t.code}>{t.name} ({t.code})</option>)}
                            </select>
                            <div className="flex gap-1 justify-center">
                              <button onClick={saveCellEdit} className="px-2 py-0.5 rounded bg-emerald-500 text-white text-[8px] font-bold hover:bg-emerald-600">Save</button>
                              <button onClick={cancelCellEdit} className="px-2 py-0.5 rounded bg-gray-300 text-gray-700 text-[8px] font-bold hover:bg-gray-400">Cancel</button>
                            </div>
                          </div>
                        </td>
                      );
                    }

                    if (!cell || !cell.sub) {
                      return (
                        <td key={d} className="px-1 py-1 text-center cursor-pointer" onClick={() => openCellEditor(d, pi)}>
                          <span className={`text-[9px] ${theme.iconColor} hover:underline`}>--</span>
                        </td>
                      );
                    }
                    const colorClass = subjectColors[cell.sub] || 'bg-gray-100 text-gray-700';
                    return (
                      <td key={d} className="px-1 py-1 text-center relative cursor-pointer" onClick={() => openCellEditor(d, pi)}>
                        <div className={`px-1.5 py-1 rounded-lg ${colorClass} font-bold hover:ring-2 hover:ring-blue-300 transition-all`}>
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
          <p className={`text-[9px] ${theme.iconColor}`}>Click any cell to assign subject &amp; teacher</p>
        </div>
      </SectionCard>

      {/* ─── C) Rooms & Infrastructure (full master table) ─── */}
      <SectionCard title="Rooms & Infrastructure" subtitle="Manage school rooms, labs, and facilities with capacity and status" theme={theme}>
        <TableToolbar
          search={roomSearch} onSearch={v => { setRoomSearch(v); setRoomPage(1); }}
          count={filteredRooms.length} label="rooms"
          onAdd={addRoom}
          onExport={() => alert('Export rooms as CSV')}
          onImport={() => alert('Import rooms from CSV')}
          theme={theme}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Room Name', 'Type', 'Capacity', 'Floor', 'Equipment', 'Status', 'Enabled', ''].map(h => (
                <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor} whitespace-nowrap`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {pagedRooms.length === 0 ? (
                <tr><td colSpan={8} className={`text-center py-6 text-xs ${theme.iconColor}`}>No rooms found</td></tr>
              ) : pagedRooms.map(r => (
                <tr key={r.id} className={`border-t ${theme.border} ${!r.enabled ? 'opacity-50' : ''}`}>
                  <td className="px-2 py-1.5">
                    <input value={r.name} onChange={e => updateRoom(r.id, 'name', e.target.value)}
                      className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <select value={r.type} onChange={e => updateRoom(r.id, 'type', e.target.value)}
                      className={`px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight}`}>
                      {roomTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </td>
                  <td className="px-2 py-1.5">
                    <input value={r.capacity} onChange={e => updateRoom(r.id, 'capacity', e.target.value)}
                      className={`w-12 px-1 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <input value={r.floor} onChange={e => updateRoom(r.id, 'floor', e.target.value)}
                      className={`w-16 px-1 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <input value={r.equipment} onChange={e => updateRoom(r.id, 'equipment', e.target.value)}
                      className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <select value={r.status} onChange={e => updateRoom(r.id, 'status', e.target.value)}
                      className={`px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] font-bold ${
                        r.status === 'Available' ? 'text-emerald-600' : r.status === 'Under Maintenance' ? 'text-amber-600' : 'text-blue-600'
                      }`}>
                      {roomStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-2 py-1.5">
                    <SSAToggle on={r.enabled} onChange={() => updateRoom(r.id, 'enabled', !r.enabled)} theme={theme} />
                  </td>
                  <td className="px-2 py-1.5">
                    <button onClick={() => deleteRoom(r.id)} className="text-red-400 hover:text-red-600"><X size={12} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={roomPage} total={filteredRooms.length} pageSize={PAGE_SIZE} onChange={setRoomPage} theme={theme} />
      </SectionCard>

      {/* ─── Import Timetable from Excel ─── */}
      <SectionCard title="Import Timetable from Excel" subtitle="Upload a pre-built timetable via spreadsheet" theme={theme}>
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-4 rounded-xl border-2 border-dashed ${theme.border} text-center`}>
            <Upload size={24} className={`mx-auto mb-2 ${theme.iconColor}`} />
            <p className={`text-xs font-bold ${theme.highlight} mb-1`}>Drag &amp; drop Excel file here</p>
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
      </div>)}

      {activeTab === 'substitution' && (<div className="space-y-4">
      {/* ─── Substitution + Period Swaps ─── */}
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

      {/* ─── Today's Substitutions & Available Teachers ─── */}
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
      </div>)}

      {activeTab === 'settings' && (<div className="space-y-4">
      {/* ─── Role-Based Permissions ─── */}
      <SectionCard title="Role-Based Permissions" subtitle="Managed centrally in Roles & Permission module" theme={theme}>
        <div className={`flex items-center gap-3 p-3 rounded-xl ${theme.accentBg} border ${theme.border}`}>
          <div className="flex-1">
            <p className={`text-xs ${theme.iconColor}`}>Role & permission settings for Timetable are configured in <span className={`font-bold ${theme.primaryText}`}>Roles & Permission Management</span></p>
          </div>
          <ArrowRight size={16} className={theme.iconColor} />
        </div>
      </SectionCard>
      </div>)}

      {/* ─── Save Button ─── */}
      <div className="flex justify-end pt-2">
        <button
          onClick={() => alert('Timetable configuration saved!')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white ${theme.primary} hover:opacity-90 transition-all shadow-sm`}>
          <Save size={15} /> Save Configuration
        </button>
      </div>
    </div>
  );
}
