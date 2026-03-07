'use client';
import React, { useState } from 'react';
import { X, Plus, Search, Download, Upload, Save, Trash2, Eye, Filter, BedDouble, Building2, UserCheck, ArrowRight } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import { BulkImportWizard } from '@/components/shared';
import type { Theme } from '../_helpers/types';

// ─── TYPES ────────────────────────────────────────────────────────────────────
type HostelBlock = { id: number; name: string; warden: string; capacity: number; floors: number; status: boolean };
type HostelRoom  = { id: number; blockId: number; roomNo: string; type: string; floor: number; capacity: number; status: 'Available' | 'Full' | 'Maintenance' };
type HostelBed   = { id: number; roomId: number; bedNo: string; student: string; status: 'Occupied' | 'Vacant' };

// ─── MOCK DATA ─────────────────────────────────────────────────────────────────
const INIT_BLOCKS: HostelBlock[] = [
  { id: 1, name: 'Block A — Boys',   warden: 'Mr. Suresh Mehta',  capacity: 120, floors: 4, status: true  },
  { id: 2, name: 'Block B — Girls',  warden: 'Mrs. Priya Sharma', capacity: 100, floors: 3, status: true  },
  { id: 3, name: 'Block C — Senior', warden: 'Mr. Rakesh Patel',  capacity: 80,  floors: 2, status: true  },
  { id: 4, name: 'Block D — Staff',  warden: 'Mrs. Anita Joshi',  capacity: 40,  floors: 2, status: false },
];

const INIT_ROOMS: HostelRoom[] = [
  { id: 1, blockId: 1, roomNo: 'A-101', type: 'Double',     floor: 1, capacity: 2, status: 'Full'        },
  { id: 2, blockId: 1, roomNo: 'A-102', type: 'Double',     floor: 1, capacity: 2, status: 'Available'   },
  { id: 3, blockId: 1, roomNo: 'A-201', type: 'Single',     floor: 2, capacity: 1, status: 'Full'        },
  { id: 4, blockId: 1, roomNo: 'A-301', type: 'Dormitory',  floor: 3, capacity: 8, status: 'Available'   },
  { id: 5, blockId: 2, roomNo: 'B-101', type: 'Double',     floor: 1, capacity: 2, status: 'Full'        },
  { id: 6, blockId: 2, roomNo: 'B-102', type: 'Single',     floor: 1, capacity: 1, status: 'Available'   },
  { id: 7, blockId: 3, roomNo: 'C-101', type: 'Single',     floor: 1, capacity: 1, status: 'Full'        },
  { id: 8, blockId: 3, roomNo: 'C-201', type: 'Double',     floor: 2, capacity: 2, status: 'Maintenance' },
];

const INIT_BEDS: HostelBed[] = [
  { id: 1, roomId: 1, bedNo: 'A-101-B1', student: 'Arjun Mehta (IX-A)',       status: 'Occupied' },
  { id: 2, roomId: 1, bedNo: 'A-101-B2', student: 'Rohan Verma (X-B)',        status: 'Occupied' },
  { id: 3, roomId: 2, bedNo: 'A-102-B1', student: '',                          status: 'Vacant'   },
  { id: 4, roomId: 2, bedNo: 'A-102-B2', student: '',                          status: 'Vacant'   },
  { id: 5, roomId: 3, bedNo: 'A-201-B1', student: 'Karan Shah (XI-A)',         status: 'Occupied' },
  { id: 6, roomId: 5, bedNo: 'B-101-B1', student: 'Priya Nair (IX-C)',         status: 'Occupied' },
  { id: 7, roomId: 5, bedNo: 'B-101-B2', student: 'Sneha Patel (X-A)',         status: 'Occupied' },
  { id: 8, roomId: 6, bedNo: 'B-102-B1', student: '',                          status: 'Vacant'   },
];

const MOCK_STUDENTS = [
  { id: 1, name: 'Amit Sharma',   class: 'IX-B',  roll: '09', phone: '98761-11111' },
  { id: 2, name: 'Deepa Joshi',   class: 'X-C',   roll: '14', phone: '98761-22222' },
  { id: 3, name: 'Nikhil Rao',    class: 'XI-A',  roll: '22', phone: '98761-33333' },
  { id: 4, name: 'Kavya Reddy',   class: 'IX-A',  roll: '07', phone: '98761-44444' },
  { id: 5, name: 'Siddharth Roy', class: 'XII-B', roll: '31', phone: '98761-55555' },
  { id: 6, name: 'Ananya Gupta',  class: 'X-A',   roll: '03', phone: '98761-66666' },
];

const STATUS_COLOR: Record<string, string> = {
  Available:   'bg-emerald-100 text-emerald-700',
  Full:        'bg-amber-100 text-amber-700',
  Maintenance: 'bg-red-100 text-red-700',
  Occupied:    'bg-blue-100 text-blue-700',
  Vacant:      'bg-gray-100 text-gray-500',
};

// ─── SUB-COMPONENTS ────────────────────────────────────────────────────────────
function TableToolbar({ search, onSearch, onAdd, onExport, onImport, addLabel, count, theme }:
  { search: string; onSearch: (v: string) => void; onAdd: () => void; onExport: () => void;
    onImport: () => void; addLabel: string; count: number; theme: Theme }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border ${theme.border} ${theme.inputBg}`}>
          <Search size={12} className={theme.iconColor} />
          <input value={search} onChange={e => onSearch(e.target.value)} placeholder="Search..."
            className={`bg-transparent text-xs ${theme.highlight} outline-none w-36`} />
          {search && <button onClick={() => onSearch('')}><X size={10} className="text-gray-400" /></button>}
        </div>
        <span className={`px-2 py-1 rounded-lg ${theme.secondaryBg} text-[10px] font-bold ${theme.iconColor}`}>{count} records</span>
      </div>
      <div className="flex items-center gap-1.5">
        <button onClick={onImport} className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.iconColor} hover:opacity-80`}>
          <Upload size={11} /> Import
        </button>
        <button onClick={onExport} className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.iconColor} hover:opacity-80`}>
          <Download size={11} /> Export
        </button>
        <button onClick={onAdd} className={`flex items-center gap-1 px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}>
          <Plus size={12} /> {addLabel}
        </button>
      </div>
    </div>
  );
}

function SectionSaveBar({ label, theme }: { label: string; theme: Theme }) {
  const [saved, setSaved] = useState(false);
  return (
    <div className="flex justify-end mt-3 pt-3 border-t border-dashed border-gray-200">
      <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
        className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl ${saved ? 'bg-emerald-500' : theme.primary} text-white text-xs font-bold transition-colors`}>
        <Save size={12} /> {saved ? 'Saved!' : `Save ${label}`}
      </button>
    </div>
  );
}

type TabId = 'setup' | 'inventory' | 'settings';

// ─── MAIN MODULE ──────────────────────────────────────────────────────────────
export default function HostelConfigModule({ theme, activeTab: externalTab, onTabChange }: { theme: Theme; activeTab?: string; onTabChange?: (tab: string) => void }) {
  // ── existing config state ──
  const [curfewTime, setCurfewTime] = useState('21:00');
  const [hostelToggles, setHostelToggles] = useState<Record<string, boolean>>({
    'Mess Management': true, 'Visitor Log for Hostellers': true,
    'Fee Integration with Main Fee': true, 'Warden Assignment': true,
  });

  // ── room types (upgraded from chips to full table) ──
  const [roomTypes, setRoomTypes] = useState([
    { id: 1, name: 'Single',    maxOccupancy: 1, description: 'Private single-occupancy room' },
    { id: 2, name: 'Double',    maxOccupancy: 2, description: 'Shared two-person room'         },
    { id: 3, name: 'Dormitory', maxOccupancy: 8, description: 'Large shared hall-style room'   },
    { id: 4, name: 'Suite',     maxOccupancy: 2, description: 'Premium attached-bathroom room' },
  ]);
  const [rtSearch, setRtSearch] = useState('');
  const [newRoomType, setNewRoomType] = useState({ name: '', maxOccupancy: '1', description: '' });
  const [addingRoomType, setAddingRoomType] = useState(false);

  // ── blocks ──
  const [blocks, setBlocks] = useState<HostelBlock[]>(INIT_BLOCKS);
  const [blockSearch, setBlockSearch] = useState('');
  const [addingBlock, setAddingBlock] = useState(false);
  const [newBlock, setNewBlock] = useState({ name: '', warden: '', capacity: '', floors: '' });

  // ── rooms ──
  const [rooms, setRooms] = useState<HostelRoom[]>(INIT_ROOMS);
  const [roomSearch, setRoomSearch] = useState('');
  const [filterBlock, setFilterBlock] = useState<number | 'all'>('all');
  const [addingRoom, setAddingRoom] = useState(false);
  const [newRoom, setNewRoom] = useState({ blockId: 1, roomNo: '', type: 'Double', floor: '1', capacity: '2' });

  // ── beds & assign workflow ──
  const [beds, setBeds] = useState<HostelBed[]>(INIT_BEDS);
  const [bedSearch, setBedSearch] = useState('');
  const [filterRoom, setFilterRoom] = useState<number | 'all'>('all');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignBedId, setAssignBedId] = useState<number | null>(null);
  const [studentSearch, setStudentSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<typeof MOCK_STUDENTS[0] | null>(null);

  const [internalTab, setInternalTab] = useState<TabId>('setup');
  const activeTab = (externalTab as TabId) || internalTab;
  const setActiveTab = (tab: TabId) => { if (onTabChange) onTabChange(tab); else setInternalTab(tab); };

  // ── derived ──
  const filteredBlocks = blocks.filter(b => b.name.toLowerCase().includes(blockSearch.toLowerCase()) || b.warden.toLowerCase().includes(blockSearch.toLowerCase()));
  const filteredRooms  = rooms.filter(r =>
    (filterBlock === 'all' || r.blockId === filterBlock) &&
    (r.roomNo.toLowerCase().includes(roomSearch.toLowerCase()) || r.type.toLowerCase().includes(roomSearch.toLowerCase()))
  );
  const filteredBeds = beds.filter(b =>
    (filterRoom === 'all' || b.roomId === filterRoom) &&
    (b.bedNo.toLowerCase().includes(bedSearch.toLowerCase()) || b.student.toLowerCase().includes(bedSearch.toLowerCase()))
  );
  const filteredStudents = MOCK_STUDENTS.filter(s =>
    s.name.toLowerCase().includes(studentSearch.toLowerCase()) || s.class.toLowerCase().includes(studentSearch.toLowerCase())
  );
  const filteredRoomTypes = roomTypes.filter(rt => rt.name.toLowerCase().includes(rtSearch.toLowerCase()));

  const blockName = (id: number) => blocks.find(b => b.id === id)?.name ?? '—';
  const roomLabel = (id: number) => rooms.find(r => r.id === id)?.roomNo ?? '—';

  function handleAssign() {
    if (!assignBedId || !selectedStudent) return;
    setBeds(prev => prev.map(b => b.id === assignBedId
      ? { ...b, student: `${selectedStudent.name} (${selectedStudent.class})`, status: 'Occupied' }
      : b
    ));
    setShowAssignModal(false); setAssignBedId(null); setSelectedStudent(null); setStudentSearch('');
  }
  function handleVacate(bedId: number) {
    setBeds(prev => prev.map(b => b.id === bedId ? { ...b, student: '', status: 'Vacant' } : b));
  }

  return (
    <div className="space-y-4">
      <ModuleHeader title="Hostel Configuration" subtitle="Blocks, rooms, beds, warden assignment, mess, and curfew settings" theme={theme} />

      {activeTab === 'setup' && (<div className="space-y-4">
      {/* ── HOSTEL FEATURES + CURFEW ── */}
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Hostel Features" subtitle="Core hostel management features for boarding students" theme={theme}>
          <div className="space-y-2">
            {Object.entries(hostelToggles).map(([feat, enabled]) => (
              <div key={feat} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{feat}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Mess Management':              'Manage daily mess menu, meal schedules, and dietary preferences for hostellers',
                      'Visitor Log for Hostellers':   'Track all visitors to the hostel — log entry time, purpose, and exit time',
                      'Fee Integration with Main Fee':'Hostel fees are combined with school fees in a single invoice to parents',
                      'Warden Assignment':            'Assign wardens to specific floors or wings — wardens get access to their students\' data',
                    } as Record<string, string>)[feat]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setHostelToggles(p => ({ ...p, [feat]: !p[feat] }))} theme={theme} />
              </div>
            ))}
            <div className="pt-1">
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Curfew Time</p>
              <InputField value={curfewTime} onChange={setCurfewTime} theme={theme} type="time" />
            </div>
          </div>
          <SectionSaveBar label="Features" theme={theme} />
        </SectionCard>

        {/* ── ROOM TYPES TABLE ── */}
        <SectionCard title="Room Types" subtitle="Master list of accommodation categories used across all blocks" theme={theme}>
          <TableToolbar search={rtSearch} onSearch={setRtSearch} onAdd={() => setAddingRoomType(true)}
            onExport={() => {}} onImport={() => {}} addLabel="Room Type" count={filteredRoomTypes.length} theme={theme} />
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead><tr className={theme.secondaryBg}>
                {['Type Name', 'Max Occupancy', 'Description', ''].map(h => (
                  <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {filteredRoomTypes.map((rt, i) => (
                  <tr key={rt.id} className={`border-t ${theme.border}`}>
                    <td className="px-1 py-1.5">
                      <input value={rt.name} onChange={e => setRoomTypes(p => p.map((x, j) => j === i ? { ...x, name: e.target.value } : x))}
                        className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                    </td>
                    <td className="px-1 py-1.5">
                      <input type="number" value={rt.maxOccupancy} onChange={e => setRoomTypes(p => p.map((x, j) => j === i ? { ...x, maxOccupancy: +e.target.value } : x))}
                        className={`w-16 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none text-center`} />
                    </td>
                    <td className="px-1 py-1.5">
                      <input value={rt.description} onChange={e => setRoomTypes(p => p.map((x, j) => j === i ? { ...x, description: e.target.value } : x))}
                        className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.iconColor} outline-none`} />
                    </td>
                    <td className="px-1 py-1.5"><button onClick={() => setRoomTypes(p => p.filter(x => x.id !== rt.id))} className="text-red-400 hover:text-red-600"><Trash2 size={12} /></button></td>
                  </tr>
                ))}
                {addingRoomType && (
                  <tr className={`border-t ${theme.border} bg-emerald-50/30`}>
                    <td className="px-1 py-1.5">
                      <input value={newRoomType.name} onChange={e => setNewRoomType(p => ({ ...p, name: e.target.value }))} placeholder="Type name..."
                        className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                    </td>
                    <td className="px-1 py-1.5">
                      <input type="number" value={newRoomType.maxOccupancy} onChange={e => setNewRoomType(p => ({ ...p, maxOccupancy: e.target.value }))}
                        className={`w-16 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none text-center`} />
                    </td>
                    <td className="px-1 py-1.5">
                      <input value={newRoomType.description} onChange={e => setNewRoomType(p => ({ ...p, description: e.target.value }))} placeholder="Description..."
                        className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.iconColor} outline-none`} />
                    </td>
                    <td className="px-1 py-1.5 flex items-center gap-1">
                      <button onClick={() => {
                        if (!newRoomType.name.trim()) return;
                        setRoomTypes(p => [...p, { id: Date.now(), name: newRoomType.name.trim(), maxOccupancy: +newRoomType.maxOccupancy, description: newRoomType.description }]);
                        setNewRoomType({ name: '', maxOccupancy: '1', description: '' }); setAddingRoomType(false);
                      }} className="text-emerald-500 hover:text-emerald-700"><Plus size={13} /></button>
                      <button onClick={() => setAddingRoomType(false)} className="text-gray-400 hover:text-gray-600"><X size={12} /></button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <SectionSaveBar label="Room Types" theme={theme} />
        </SectionCard>
      </div>

      {/* ── HOSTEL BLOCKS TABLE ── */}
      <SectionCard title="Hostel Blocks" subtitle="Define hostel buildings or wings — assign a warden to each block" theme={theme}>
        <TableToolbar search={blockSearch} onSearch={setBlockSearch} onAdd={() => setAddingBlock(true)}
          onExport={() => {}} onImport={() => {}} addLabel="Block" count={filteredBlocks.length} theme={theme} />
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Block Name', 'Warden', 'Capacity', 'Floors', 'Rooms', 'Occupied', 'Status', ''].map(h => (
                <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filteredBlocks.map((b, i) => {
                const blockRooms    = rooms.filter(r => r.blockId === b.id);
                const occupiedRooms = blockRooms.filter(r => r.status === 'Full').length;
                return (
                  <tr key={b.id} className={`border-t ${theme.border}`}>
                    <td className="px-1 py-1.5">
                      <input value={b.name} onChange={e => setBlocks(p => p.map((x, j) => j === i ? { ...x, name: e.target.value } : x))}
                        className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                    </td>
                    <td className="px-1 py-1.5">
                      <input value={b.warden} onChange={e => setBlocks(p => p.map((x, j) => j === i ? { ...x, warden: e.target.value } : x))}
                        className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                    </td>
                    <td className="px-1 py-1.5">
                      <input type="number" value={b.capacity} onChange={e => setBlocks(p => p.map((x, j) => j === i ? { ...x, capacity: +e.target.value } : x))}
                        className={`w-20 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none text-center`} />
                    </td>
                    <td className="px-1 py-1.5">
                      <input type="number" value={b.floors} onChange={e => setBlocks(p => p.map((x, j) => j === i ? { ...x, floors: +e.target.value } : x))}
                        className={`w-14 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none text-center`} />
                    </td>
                    <td className={`px-2 py-1.5 text-xs font-bold ${theme.highlight}`}>{blockRooms.length}</td>
                    <td className={`px-2 py-1.5 text-xs ${theme.iconColor}`}>{occupiedRooms}/{blockRooms.length}</td>
                    <td className="px-2 py-1.5"><SSAToggle on={b.status} onChange={() => setBlocks(p => p.map((x, j) => j === i ? { ...x, status: !x.status } : x))} theme={theme} /></td>
                    <td className="px-1 py-1.5"><button onClick={() => setBlocks(p => p.filter(x => x.id !== b.id))} className="text-red-400 hover:text-red-600"><Trash2 size={12} /></button></td>
                  </tr>
                );
              })}
              {addingBlock && (
                <tr className={`border-t ${theme.border} bg-emerald-50/30`}>
                  {[
                    <input key="name" value={newBlock.name} onChange={e => setNewBlock(p => ({ ...p, name: e.target.value }))} placeholder="Block name..."
                      className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />,
                    <input key="warden" value={newBlock.warden} onChange={e => setNewBlock(p => ({ ...p, warden: e.target.value }))} placeholder="Warden name..."
                      className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />,
                    <input key="cap" type="number" value={newBlock.capacity} onChange={e => setNewBlock(p => ({ ...p, capacity: e.target.value }))} placeholder="120"
                      className={`w-20 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none text-center`} />,
                    <input key="floors" type="number" value={newBlock.floors} onChange={e => setNewBlock(p => ({ ...p, floors: e.target.value }))} placeholder="4"
                      className={`w-14 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none text-center`} />,
                  ].map((cell, ci) => <td key={ci} className="px-1 py-1.5">{cell}</td>)}
                  <td colSpan={2} className="px-1 py-1.5" />
                  <td className="px-1 py-1.5 flex items-center gap-1">
                    <button onClick={() => {
                      if (!newBlock.name.trim()) return;
                      setBlocks(p => [...p, { id: Date.now(), name: newBlock.name, warden: newBlock.warden, capacity: +newBlock.capacity || 0, floors: +newBlock.floors || 1, status: true }]);
                      setNewBlock({ name: '', warden: '', capacity: '', floors: '' }); setAddingBlock(false);
                    }} className="text-emerald-500 hover:text-emerald-700"><Plus size={13} /></button>
                    <button onClick={() => setAddingBlock(false)} className="text-gray-400 hover:text-gray-600"><X size={12} /></button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <SectionSaveBar label="Blocks" theme={theme} />
      </SectionCard>

      {/* ── ROOMS TABLE ── */}
      <SectionCard title="Rooms" subtitle="Define individual rooms per block — room number, type, floor, and capacity" theme={theme}>
        <div className="flex items-center gap-2 mb-3">
          <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border ${theme.border} ${theme.inputBg}`}>
            <Search size={12} className={theme.iconColor} />
            <input value={roomSearch} onChange={e => setRoomSearch(e.target.value)} placeholder="Search rooms..."
              className={`bg-transparent text-xs ${theme.highlight} outline-none w-32`} />
          </div>
          <select value={filterBlock === 'all' ? 'all' : filterBlock} onChange={e => setFilterBlock(e.target.value === 'all' ? 'all' : +e.target.value)}
            className={`px-2.5 py-1.5 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}>
            <option value="all">All Blocks</option>
            {blocks.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
          <span className={`px-2 py-1 rounded-lg ${theme.secondaryBg} text-[10px] font-bold ${theme.iconColor}`}>{filteredRooms.length} rooms</span>
          <div className="flex-1" />
          <button onClick={() => {}} className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.iconColor}`}><Download size={11} /> Export</button>
          <button onClick={() => setAddingRoom(true)} className={`flex items-center gap-1 px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={12} /> Add Room</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Block', 'Room No.', 'Type', 'Floor', 'Capacity', 'Beds Vacant', 'Status', ''].map(h => (
                <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filteredRooms.map((r, i) => {
                const vacantBeds = beds.filter(b => b.roomId === r.id && b.status === 'Vacant').length;
                return (
                  <tr key={r.id} className={`border-t ${theme.border}`}>
                    <td className={`px-2 py-1.5 text-xs ${theme.iconColor} whitespace-nowrap`}>{blockName(r.blockId)}</td>
                    <td className="px-1 py-1.5">
                      <input value={r.roomNo} onChange={e => setRooms(p => p.map((x, j) => j === i ? { ...x, roomNo: e.target.value } : x))}
                        className={`w-20 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                    </td>
                    <td className="px-1 py-1.5">
                      <select value={r.type} onChange={e => setRooms(p => p.map((x, j) => j === i ? { ...x, type: e.target.value } : x))}
                        className={`px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}>
                        {roomTypes.map(rt => <option key={rt.name} value={rt.name}>{rt.name}</option>)}
                      </select>
                    </td>
                    <td className="px-1 py-1.5">
                      <input type="number" value={r.floor} onChange={e => setRooms(p => p.map((x, j) => j === i ? { ...x, floor: +e.target.value } : x))}
                        className={`w-14 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none text-center`} />
                    </td>
                    <td className="px-1 py-1.5">
                      <input type="number" value={r.capacity} onChange={e => setRooms(p => p.map((x, j) => j === i ? { ...x, capacity: +e.target.value } : x))}
                        className={`w-14 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none text-center`} />
                    </td>
                    <td className={`px-2 py-1.5 text-xs font-bold ${vacantBeds > 0 ? 'text-emerald-600' : 'text-amber-600'}`}>{vacantBeds}</td>
                    <td className="px-2 py-1.5">
                      <select value={r.status} onChange={e => setRooms(p => p.map((x, j) => j === i ? { ...x, status: e.target.value as HostelRoom['status'] } : x))}
                        className={`px-1.5 py-0.5 rounded-lg text-[10px] font-bold outline-none border-0 ${STATUS_COLOR[r.status]}`}>
                        {(['Available', 'Full', 'Maintenance'] as const).map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="px-1 py-1.5"><button onClick={() => setRooms(p => p.filter(x => x.id !== r.id))} className="text-red-400 hover:text-red-600"><Trash2 size={12} /></button></td>
                  </tr>
                );
              })}
              {addingRoom && (
                <tr className={`border-t ${theme.border} bg-emerald-50/30`}>
                  <td className="px-1 py-1.5">
                    <select value={newRoom.blockId} onChange={e => setNewRoom(p => ({ ...p, blockId: +e.target.value }))}
                      className={`px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}>
                      {blocks.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                    </select>
                  </td>
                  <td className="px-1 py-1.5"><input value={newRoom.roomNo} onChange={e => setNewRoom(p => ({ ...p, roomNo: e.target.value }))} placeholder="A-401"
                    className={`w-20 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} /></td>
                  <td className="px-1 py-1.5">
                    <select value={newRoom.type} onChange={e => setNewRoom(p => ({ ...p, type: e.target.value }))}
                      className={`px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}>
                      {roomTypes.map(rt => <option key={rt.name} value={rt.name}>{rt.name}</option>)}
                    </select>
                  </td>
                  <td className="px-1 py-1.5"><input type="number" value={newRoom.floor} onChange={e => setNewRoom(p => ({ ...p, floor: e.target.value }))} placeholder="1"
                    className={`w-14 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none text-center`} /></td>
                  <td className="px-1 py-1.5"><input type="number" value={newRoom.capacity} onChange={e => setNewRoom(p => ({ ...p, capacity: e.target.value }))} placeholder="2"
                    className={`w-14 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none text-center`} /></td>
                  <td colSpan={2} className="px-1 py-1.5" />
                  <td className="px-1 py-1.5 flex items-center gap-1">
                    <button onClick={() => {
                      if (!newRoom.roomNo.trim()) return;
                      setRooms(p => [...p, { id: Date.now(), blockId: newRoom.blockId, roomNo: newRoom.roomNo, type: newRoom.type, floor: +newRoom.floor, capacity: +newRoom.capacity, status: 'Available' }]);
                      setNewRoom({ blockId: 1, roomNo: '', type: 'Double', floor: '1', capacity: '2' }); setAddingRoom(false);
                    }} className="text-emerald-500 hover:text-emerald-700"><Plus size={13} /></button>
                    <button onClick={() => setAddingRoom(false)} className="text-gray-400 hover:text-gray-600"><X size={12} /></button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <SectionSaveBar label="Rooms" theme={theme} />
      </SectionCard>
      </div>)}

      {activeTab === 'inventory' && (<div className="space-y-4">
      {/* ── BED INVENTORY TABLE ── */}
      <SectionCard title="Bed Inventory" subtitle="View all beds across rooms — assign students, track occupancy, vacate beds" theme={theme}>
        <div className="flex items-center gap-2 mb-3">
          <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border ${theme.border} ${theme.inputBg}`}>
            <Search size={12} className={theme.iconColor} />
            <input value={bedSearch} onChange={e => setBedSearch(e.target.value)} placeholder="Search beds or students..."
              className={`bg-transparent text-xs ${theme.highlight} outline-none w-40`} />
          </div>
          <select value={filterRoom === 'all' ? 'all' : filterRoom} onChange={e => setFilterRoom(e.target.value === 'all' ? 'all' : +e.target.value)}
            className={`px-2.5 py-1.5 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}>
            <option value="all">All Rooms</option>
            {rooms.map(r => <option key={r.id} value={r.id}>{blockName(r.blockId)} — {r.roomNo}</option>)}
          </select>
          <span className={`px-2 py-1 rounded-lg ${theme.secondaryBg} text-[10px] font-bold ${theme.iconColor}`}>
            {beds.filter(b => b.status === 'Occupied').length} occupied / {beds.filter(b => b.status === 'Vacant').length} vacant
          </span>
          <div className="flex-1" />
          <button onClick={() => {}} className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.iconColor}`}><Download size={11} /> Export</button>
          <button onClick={() => {
            const vacantBed = beds.find(b => b.status === 'Vacant');
            if (vacantBed) { setAssignBedId(vacantBed.id); setShowAssignModal(true); }
          }} className={`flex items-center gap-1 px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}>
            <UserCheck size={12} /> Assign Student
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Bed No.', 'Room', 'Block', 'Student Assigned', 'Status', 'Actions'].map(h => (
                <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filteredBeds.map(bed => (
                <tr key={bed.id} className={`border-t ${theme.border}`}>
                  <td className={`px-2 py-1.5 text-xs font-bold ${theme.highlight}`}>{bed.bedNo}</td>
                  <td className={`px-2 py-1.5 text-xs ${theme.highlight}`}>{roomLabel(bed.roomId)}</td>
                  <td className={`px-2 py-1.5 text-xs ${theme.iconColor} whitespace-nowrap`}>{(() => { const r = rooms.find(x => x.id === bed.roomId); return r ? blockName(r.blockId) : '—'; })()}</td>
                  <td className={`px-2 py-1.5 text-xs ${bed.student ? theme.highlight : theme.iconColor}`}>
                    {bed.student || <span className="italic text-gray-400">Unassigned</span>}
                  </td>
                  <td className="px-2 py-1.5">
                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${STATUS_COLOR[bed.status]}`}>{bed.status}</span>
                  </td>
                  <td className="px-2 py-1.5 flex items-center gap-2">
                    {bed.status === 'Vacant' ? (
                      <button onClick={() => { setAssignBedId(bed.id); setShowAssignModal(true); }}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded-lg ${theme.primary} text-white text-[10px] font-bold`}>
                        <UserCheck size={10} /> Assign
                      </button>
                    ) : (
                      <button onClick={() => handleVacate(bed.id)}
                        className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-red-50 text-red-600 text-[10px] font-bold hover:bg-red-100">
                        <X size={10} /> Vacate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* ── ASSIGN STUDENT MODAL ── */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} shadow-2xl w-96 p-5`}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className={`text-sm font-bold ${theme.highlight}`}>Assign Student to Bed</h4>
                <p className={`text-[10px] ${theme.iconColor}`}>
                  Bed: <strong>{beds.find(b => b.id === assignBedId)?.bedNo}</strong>
                </p>
              </div>
              <button onClick={() => { setShowAssignModal(false); setAssignBedId(null); setSelectedStudent(null); setStudentSearch(''); }}
                className="text-gray-400 hover:text-gray-600"><X size={16} /></button>
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} mb-3`}>
              <Search size={13} className={theme.iconColor} />
              <input autoFocus value={studentSearch} onChange={e => setStudentSearch(e.target.value)} placeholder="Search student by name or class..."
                className={`flex-1 bg-transparent text-xs ${theme.highlight} outline-none`} />
            </div>
            <div className="space-y-1.5 max-h-52 overflow-y-auto">
              {filteredStudents.map(s => (
                <button key={s.id} onClick={() => setSelectedStudent(s)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border transition-all text-left ${selectedStudent?.id === s.id ? `border-2 ${theme.primary} text-white` : `${theme.secondaryBg} ${theme.border}`}`}>
                  <div>
                    <p className={`text-xs font-bold ${selectedStudent?.id === s.id ? '' : theme.highlight}`}>{s.name}</p>
                    <p className={`text-[10px] ${selectedStudent?.id === s.id ? 'text-white/80' : theme.iconColor}`}>Class {s.class} · Roll #{s.roll}</p>
                  </div>
                  <span className={`text-[10px] ${selectedStudent?.id === s.id ? 'text-white/70' : theme.iconColor}`}>{s.phone}</span>
                </button>
              ))}
              {filteredStudents.length === 0 && (
                <p className={`text-center text-xs py-4 ${theme.iconColor}`}>No students found</p>
              )}
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => { setShowAssignModal(false); setAssignBedId(null); setSelectedStudent(null); setStudentSearch(''); }}
                className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}>Cancel</button>
              <button onClick={handleAssign} disabled={!selectedStudent}
                className={`flex-1 px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold disabled:opacity-40 flex items-center justify-center gap-1`}>
                <BedDouble size={12} /> Assign Bed
              </button>
            </div>
          </div>
        </div>
      )}
      </div>)}

      {activeTab === 'settings' && (<div className="space-y-4">
      {/* ── PERMISSIONS + IMPORT ── */}
      <SectionCard title="Role-Based Permissions" subtitle="Managed centrally in Roles & Permission module" theme={theme}>
        <div className={`flex items-center gap-3 p-3 rounded-xl ${theme.accentBg} border ${theme.border}`}>
          <div className="flex-1">
            <p className={`text-xs ${theme.iconColor}`}>Role & permission settings for Hostel are configured in <span className={`font-bold ${theme.primaryText}`}>Roles & Permission Management</span></p>
          </div>
          <ArrowRight size={16} className={theme.iconColor} />
        </div>
      </SectionCard>

      <SectionCard title="Bulk Import" subtitle="Import data from Excel templates" theme={theme}>
        <BulkImportWizard entityName="Hostel Students" templateFields={['Student Name', 'Class', 'Block', 'Room No', 'Bed No', 'Guardian Phone']} sampleData={[['Arjun Mehta', 'Grade 9', 'Block A', 'A-102', 'A-102-B1', '9876543210']]} theme={theme} />
      </SectionCard>
      </div>)}
    </div>
  );
}
