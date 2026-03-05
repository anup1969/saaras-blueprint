'use client';

import React, { useState } from 'react';
import { SSAToggle, SectionCard, ModuleHeader, InputField } from '../_helpers/components';
import { MasterPermissionGrid } from '@/components/shared';
import type { Theme } from '../_helpers/types';
import { Search, X, Plus, Edit, Trash2, Save, Download, Upload, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, LogOut, Phone, User, Clock } from 'lucide-react';

const PAGE_SIZE = 5;

// ── TableToolbar ────────────────────────────────────
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
      <button onClick={onAdd} className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-white ${theme.primary} hover:opacity-90`}>
        <Plus size={13} /> Add
      </button>
      <button onClick={onExport} className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500 text-white hover:bg-emerald-600">
        <Download size={13} /> Export
      </button>
      <button onClick={onImport} className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-500 text-white hover:bg-blue-600">
        <Upload size={13} /> Import
      </button>
    </div>
  );
}

// ── Pagination ──────────────────────────────────────
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

// ── Types ───────────────────────────────────────────
type VisitorTypeRules = {
  toggles: Record<string, boolean>;
  allowedFrom: string;
  allowedTo: string;
  maxDuration: string;
};

type VisitorTypeRow = {
  id: number;
  name: string;
  enabled: boolean;
  rules: VisitorTypeRules;
};

type VisitorLogEntry = {
  id: number;
  name: string;
  phone: string;
  type: string;
  purpose: string;
  meetingWith: string;
  timeIn: string;
  timeOut: string;
  status: 'Active' | 'Departed';
};

// ── Default rule descriptions per known rule name ───
const RULE_DESCRIPTIONS: Record<string, string> = {
  'Pre-registration required': 'Visitor must register in advance via app or website before arriving',
  'Photo ID verification': 'Gate staff verifies visitor\'s government-issued photo ID before entry',
  'Pickup authorization required': 'Parent must pre-authorize any non-guardian pickup via the app',
  'Escort required': 'Visitor must be accompanied by a school staff member on campus',
  'Areas allowed: Office': 'Visitor can access the admin office area',
  'Areas allowed: Classroom': 'Visitor can access classroom areas (requires teacher permission)',
  'Areas allowed: Campus': 'Visitor can move freely across the campus',
  'Pre-registration MANDATORY': 'Visitor MUST register before arriving — no walk-ins allowed',
  'Photo capture at gate': 'Photo taken at gate for identity record',
  'Delivery area only': 'Restricted to delivery/receiving area only',
  'POC (Point of Contact) required': 'A staff contact person must be designated for the visitor',
  'Valid ID required': 'Must present a valid government-issued ID document',
  'Background check status': 'Background verification must be on file',
  'Photo capture': 'Photo taken at entry for security records',
  'Purpose of visit required': 'Visitor must state their purpose before being admitted',
  'Escort mandatory': 'Must be accompanied by staff at all times',
  'Restricted areas enforced': 'Access limited to designated areas only',
  'Safety briefing required': 'Must complete a safety orientation before entering work area',
  'Work permit required': 'Work permit must be uploaded and approved before campus entry',
  'Designated work area enforced': 'Restricted to designated work zones only',
  'Supervisor contact required': 'On-site supervisor must be contactable',
  'Valid insurance': 'Must have valid liability insurance on file',
  'Fast-track entry': 'Expedited entry without standard waiting procedures',
  'ID verification': 'Credentials are verified and logged',
  'Principal notification auto-trigger': 'Principal immediately notified via push + SMS on entry',
  'No time limit': 'No maximum visit duration — visit ends when the visitor leaves',
  'Escort assigned': 'A designated staff member escorts throughout the visit',
  'Pre-registration optional': 'May optionally register in advance but walk-ins accepted',
  'Alumni ID verification': 'Must verify identity (batch year, roll number) at the gate',
  'Event-based access only': 'Can only visit during school events — no casual visits',
  'Campus tour allowed': 'Can take a tour of the campus facilities',
  'Classrooms restricted': 'Cannot enter active classrooms — restricted to common areas only',
};

// ── Default visitor types ────────────────────────────
const defaultVisitorTypes: VisitorTypeRow[] = [
  {
    id: 1, name: 'Parent', enabled: true,
    rules: {
      toggles: { 'Pre-registration required': true, 'Photo ID verification': true, 'Pickup authorization required': true, 'Escort required': false, 'Areas allowed: Office': true, 'Areas allowed: Classroom': false, 'Areas allowed: Campus': true },
      allowedFrom: '08:00', allowedTo: '16:00', maxDuration: '60',
    },
  },
  {
    id: 2, name: 'Vendor / Supplier', enabled: true,
    rules: {
      toggles: { 'Pre-registration MANDATORY': true, 'Photo capture at gate': true, 'Delivery area only': true, 'POC (Point of Contact) required': true, 'Valid ID required': true, 'Background check status': false },
      allowedFrom: '09:00', allowedTo: '15:00', maxDuration: '120',
    },
  },
  {
    id: 3, name: 'General Visitor', enabled: true,
    rules: {
      toggles: { 'Pre-registration required': false, 'Photo capture': true, 'Purpose of visit required': true, 'Escort mandatory': true, 'Restricted areas enforced': true },
      allowedFrom: '09:00', allowedTo: '17:00', maxDuration: '45',
    },
  },
  {
    id: 4, name: 'Contractor', enabled: true,
    rules: {
      toggles: { 'Pre-registration MANDATORY': true, 'Safety briefing required': true, 'Work permit required': true, 'Designated work area enforced': true, 'Supervisor contact required': true, 'Valid insurance': true },
      allowedFrom: '07:00', allowedTo: '18:00', maxDuration: '480',
    },
  },
  {
    id: 5, name: 'Government Official', enabled: true,
    rules: {
      toggles: { 'Fast-track entry': true, 'ID verification': true, 'Principal notification auto-trigger': true, 'No time limit': true, 'Escort assigned': true },
      allowedFrom: '08:00', allowedTo: '18:00', maxDuration: '0',
    },
  },
  {
    id: 6, name: 'Alumni', enabled: true,
    rules: {
      toggles: { 'Pre-registration optional': true, 'Alumni ID verification': true, 'Event-based access only': false, 'Campus tour allowed': true, 'Classrooms restricted': true },
      allowedFrom: '09:00', allowedTo: '17:00', maxDuration: '120',
    },
  },
];

// ── Default visitor log ──────────────────────────────
const defaultVisitorLog: VisitorLogEntry[] = [
  { id: 1, name: 'Mr. Ravi Mehta', phone: '9876543210', type: 'Parent', purpose: 'PTM meeting', meetingWith: 'Mrs. Priya (Class 5A)', timeIn: '09:15 AM', timeOut: '', status: 'Active' },
  { id: 2, name: 'Suresh Electricals', phone: '9812345678', type: 'Vendor / Supplier', purpose: 'Fan repair delivery', meetingWith: 'Mr. Vikram (Admin)', timeIn: '10:00 AM', timeOut: '10:45 AM', status: 'Departed' },
  { id: 3, name: 'Mrs. Kiran Joshi', phone: '9988776655', type: 'General Visitor', purpose: 'Admission enquiry', meetingWith: 'Receptionist', timeIn: '10:30 AM', timeOut: '', status: 'Active' },
  { id: 4, name: 'Inspector R.K. Verma', phone: '9001122334', type: 'Government Official', purpose: 'Safety inspection', meetingWith: 'Principal', timeIn: '11:00 AM', timeOut: '', status: 'Active' },
  { id: 5, name: 'ABC Constructions', phone: '9555443322', type: 'Contractor', purpose: 'Painting work', meetingWith: 'Mr. Anil (Transport Head)', timeIn: '07:30 AM', timeOut: '12:00 PM', status: 'Departed' },
  { id: 6, name: 'Dr. Neha Kapoor', phone: '9876001234', type: 'Alumni', purpose: 'Guest lecture', meetingWith: 'Vice Principal', timeIn: '11:30 AM', timeOut: '', status: 'Active' },
];

// ── Main Module ────────────────────────────────────
export default function VisitorConfigModule({ theme }: { theme: Theme }) {
  const [pickupMethod, setPickupMethod] = useState('otp');
  const [cctvParentAccess, setCctvParentAccess] = useState(false);
  const [cctvRetentionDays, setCctvRetentionDays] = useState('30');

  // ── Visitor Types (M14 — full master table) ────
  const [visitorTypes, setVisitorTypes] = useState<VisitorTypeRow[]>(defaultVisitorTypes);
  const [vtSearch, setVtSearch] = useState('');
  const [vtPage, setVtPage] = useState(1);
  const [expandedVtId, setExpandedVtId] = useState<number | null>(1);
  const [editingVtId, setEditingVtId] = useState<number | null>(null);
  const [editingVtName, setEditingVtName] = useState('');
  const [showAddVt, setShowAddVt] = useState(false);
  const [newVtName, setNewVtName] = useState('');
  let nextVtId = visitorTypes.length > 0 ? Math.max(...visitorTypes.map(v => v.id)) + 1 : 1;

  const filteredVt = visitorTypes.filter(v =>
    !vtSearch || v.name.toLowerCase().includes(vtSearch.toLowerCase())
  );
  const pagedVt = filteredVt.slice((vtPage - 1) * PAGE_SIZE, vtPage * PAGE_SIZE);

  function addVisitorType() {
    const name = newVtName.trim();
    if (!name || visitorTypes.some(v => v.name.toLowerCase() === name.toLowerCase())) return;
    setVisitorTypes(prev => [...prev, {
      id: nextVtId,
      name,
      enabled: true,
      rules: {
        toggles: { 'Pre-registration required': false, 'Photo ID verification': true, 'Escort required': false },
        allowedFrom: '09:00', allowedTo: '17:00', maxDuration: '60',
      },
    }]);
    setNewVtName('');
    setShowAddVt(false);
  }

  function toggleVtRule(vtId: number, rule: string) {
    setVisitorTypes(prev => prev.map(v =>
      v.id === vtId ? { ...v, rules: { ...v.rules, toggles: { ...v.rules.toggles, [rule]: !v.rules.toggles[rule] } } } : v
    ));
  }

  function setVtTimingField(vtId: number, field: 'allowedFrom' | 'allowedTo' | 'maxDuration', val: string) {
    setVisitorTypes(prev => prev.map(v =>
      v.id === vtId ? { ...v, rules: { ...v.rules, [field]: val } } : v
    ));
  }

  // ── Visitor Log (E2) ──────────────────────────
  const [visitorLog, setVisitorLog] = useState<VisitorLogEntry[]>(defaultVisitorLog);
  const [vlSearch, setVlSearch] = useState('');
  const [vlPage, setVlPage] = useState(1);
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [newEntry, setNewEntry] = useState({ name: '', phone: '', purpose: '', meetingWith: '', type: 'General Visitor' });
  let nextLogId = visitorLog.length > 0 ? Math.max(...visitorLog.map(v => v.id)) + 1 : 1;

  const activeVisitors = visitorLog.filter(v => v.status === 'Active');
  const filteredVl = visitorLog.filter(v =>
    !vlSearch || v.name.toLowerCase().includes(vlSearch.toLowerCase()) ||
    v.type.toLowerCase().includes(vlSearch.toLowerCase()) ||
    v.purpose.toLowerCase().includes(vlSearch.toLowerCase()) ||
    v.meetingWith.toLowerCase().includes(vlSearch.toLowerCase())
  );
  const pagedVl = filteredVl.slice((vlPage - 1) * PAGE_SIZE, vlPage * PAGE_SIZE);

  function addVisitorEntry() {
    if (!newEntry.name.trim()) return;
    const now = new Date();
    const hours = now.getHours();
    const mins = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const h12 = hours % 12 || 12;
    const timeStr = `${h12.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')} ${ampm}`;
    setVisitorLog(prev => [{
      id: nextLogId,
      name: newEntry.name.trim(),
      phone: newEntry.phone.trim(),
      type: newEntry.type,
      purpose: newEntry.purpose.trim(),
      meetingWith: newEntry.meetingWith.trim(),
      timeIn: timeStr,
      timeOut: '',
      status: 'Active',
    }, ...prev]);
    setNewEntry({ name: '', phone: '', purpose: '', meetingWith: '', type: 'General Visitor' });
    setShowAddEntry(false);
  }

  function checkOutVisitor(id: number) {
    const now = new Date();
    const hours = now.getHours();
    const mins = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const h12 = hours % 12 || 12;
    const timeStr = `${h12.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')} ${ampm}`;
    setVisitorLog(prev => prev.map(v =>
      v.id === id ? { ...v, status: 'Departed' as const, timeOut: timeStr } : v
    ));
  }

  return (
    <div className="space-y-4">
      <ModuleHeader title="Visitor & Pickup Rules" subtitle="Per-visitor-type rules, verification, and security configuration" theme={theme} />

      <SectionCard title="Pickup Verification Method" subtitle="How student pickup is verified" theme={theme}>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'otp', name: 'OTP Verification', desc: 'Parent receives OTP on phone' },
            { id: 'photo', name: 'Photo Match', desc: 'Guard matches face with registered photo' },
            { id: 'rfid', name: 'RFID/QR Card', desc: 'Parent scans card at gate' },
          ].map(m => (
            <button key={m.id} onClick={() => setPickupMethod(m.id)}
              className={`p-3 rounded-xl text-left border-2 transition-all ${pickupMethod === m.id ? `${theme.primary} text-white border-transparent` : `${theme.secondaryBg} ${theme.border}`}`}>
              <p className={`text-xs font-bold ${pickupMethod === m.id ? '' : theme.highlight}`}>{m.name}</p>
              <p className={`text-[10px] mt-1 ${pickupMethod === m.id ? 'text-white/80' : theme.iconColor}`}>{m.desc}</p>
            </button>
          ))}
        </div>
      </SectionCard>

      {/* ── M14: Visitor Types — Full Master Table ── */}
      <SectionCard title="Visitor Types" subtitle="Manage all visitor categories — add custom types, configure per-type rules, enable/disable" theme={theme}>
        <TableToolbar
          search={vtSearch} onSearch={v => { setVtSearch(v); setVtPage(1); }}
          count={filteredVt.length} label="visitor types"
          onAdd={() => setShowAddVt(true)}
          onExport={() => alert('Export visitor types to CSV')}
          onImport={() => alert('Import visitor types from CSV')}
          theme={theme}
        />

        {/* Add New Visitor Type Form */}
        {showAddVt && (
          <div className={`p-3 rounded-xl border-2 border-blue-200 ${theme.secondaryBg} mb-3 space-y-2`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Add Visitor Type</p>
            <div className="flex items-center gap-2">
              <InputField value={newVtName} onChange={setNewVtName} theme={theme} placeholder="e.g. Inspector, NGO Representative" />
              <button onClick={addVisitorType} disabled={!newVtName.trim()}
                className={`px-4 py-2 rounded-xl text-xs font-bold ${theme.primary} text-white disabled:opacity-50 whitespace-nowrap`}>
                <Plus size={12} className="inline mr-1" />Add
              </button>
              <button onClick={() => { setShowAddVt(false); setNewVtName(''); }}
                className={`px-3 py-2 rounded-xl text-xs font-bold ${theme.secondaryBg} ${theme.highlight} whitespace-nowrap`}>Cancel</button>
            </div>
          </div>
        )}

        {/* Visitor Types Table */}
        <div className={`rounded-xl border ${theme.border} overflow-hidden`}>
          <table className="w-full text-[10px]">
            <thead className={theme.secondaryBg}>
              <tr>
                <th className={`text-left px-3 py-2 font-bold ${theme.iconColor} text-[9px] uppercase w-8`}>#</th>
                <th className={`text-left px-3 py-2 font-bold ${theme.iconColor} text-[9px] uppercase`}>Visitor Type Name</th>
                <th className={`text-center px-3 py-2 font-bold ${theme.iconColor} text-[9px] uppercase`}>Rules</th>
                <th className={`text-center px-3 py-2 font-bold ${theme.iconColor} text-[9px] uppercase`}>Timing</th>
                <th className={`text-center px-3 py-2 font-bold ${theme.iconColor} text-[9px] uppercase`}>Enabled</th>
                <th className={`text-center px-3 py-2 font-bold ${theme.iconColor} text-[9px] uppercase`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pagedVt.map((vt, idx) => {
                const isExpanded = expandedVtId === vt.id;
                const isEditing = editingVtId === vt.id;
                return (
                  <React.Fragment key={vt.id}>
                    <tr className={`border-t ${theme.border} ${isExpanded ? 'bg-blue-50/30' : ''}`}>
                      <td className={`px-3 py-2 ${theme.iconColor}`}>{(vtPage - 1) * PAGE_SIZE + idx + 1}</td>
                      <td className={`px-3 py-2 font-bold ${theme.highlight}`}>
                        {isEditing ? (
                          <div className="flex items-center gap-1.5">
                            <input value={editingVtName} onChange={e => setEditingVtName(e.target.value)}
                              className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} w-48`} />
                            <button onClick={() => {
                              if (editingVtName.trim()) {
                                setVisitorTypes(prev => prev.map(v => v.id === vt.id ? { ...v, name: editingVtName.trim() } : v));
                              }
                              setEditingVtId(null);
                            }} className="text-emerald-500 hover:text-emerald-700 text-[9px] font-bold">Save</button>
                            <button onClick={() => setEditingVtId(null)} className="text-gray-400 hover:text-gray-600 text-[9px] font-bold">Cancel</button>
                          </div>
                        ) : (
                          <span>{vt.name}</span>
                        )}
                      </td>
                      <td className={`px-3 py-2 text-center`}>
                        <button onClick={() => setExpandedVtId(isExpanded ? null : vt.id)}
                          className={`flex items-center gap-1 mx-auto text-[9px] font-bold ${isExpanded ? 'text-blue-500' : theme.iconColor} hover:underline`}>
                          {Object.keys(vt.rules.toggles).length} rules
                          {isExpanded ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
                        </button>
                      </td>
                      <td className={`px-3 py-2 text-center text-[9px] ${theme.iconColor}`}>
                        {vt.rules.allowedFrom} - {vt.rules.allowedTo}
                      </td>
                      <td className="px-3 py-2 text-center">
                        <SSAToggle on={vt.enabled} onChange={() => setVisitorTypes(prev => prev.map(v => v.id === vt.id ? { ...v, enabled: !v.enabled } : v))} theme={theme} />
                      </td>
                      <td className="px-3 py-2 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button onClick={() => { setEditingVtId(vt.id); setEditingVtName(vt.name); }}
                            className={`${theme.iconColor} hover:text-blue-500`} title="Edit name">
                            <Edit size={11} />
                          </button>
                          <button onClick={() => setVisitorTypes(prev => prev.filter(v => v.id !== vt.id))}
                            className="text-red-400 hover:text-red-600" title="Delete">
                            <Trash2 size={11} />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expanded per-type rules */}
                    {isExpanded && (
                      <tr className="bg-blue-50/20">
                        <td colSpan={6} className="px-4 py-3">
                          <div className="grid grid-cols-2 gap-4">
                            {/* Toggle rules */}
                            <div>
                              <p className={`text-[10px] font-bold ${theme.iconColor} mb-2 uppercase tracking-wide`}>Rules -- {vt.name}</p>
                              <div className="space-y-1.5">
                                {Object.entries(vt.rules.toggles).map(([rule, enabled]) => (
                                  <div key={rule} className={`flex items-center justify-between p-2 rounded-xl ${theme.secondaryBg}`}>
                                    <div className="flex-1 mr-2">
                                      <p className={`text-xs font-bold ${theme.highlight}`}>{rule}</p>
                                      <p className={`text-[10px] ${theme.iconColor}`}>
                                        {RULE_DESCRIPTIONS[rule] || 'Rule configuration for this visitor type'}
                                      </p>
                                    </div>
                                    <SSAToggle on={enabled} onChange={() => toggleVtRule(vt.id, rule)} theme={theme} />
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Timing settings */}
                            <div className="space-y-3">
                              <p className={`text-[10px] font-bold ${theme.iconColor} uppercase tracking-wide`}>Timing -- {vt.name}</p>
                              <div>
                                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Allowed From</p>
                                <InputField value={vt.rules.allowedFrom} onChange={v => setVtTimingField(vt.id, 'allowedFrom', v)} theme={theme} type="time" />
                              </div>
                              <div>
                                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Allowed To</p>
                                <InputField value={vt.rules.allowedTo} onChange={v => setVtTimingField(vt.id, 'allowedTo', v)} theme={theme} type="time" />
                              </div>
                              <div>
                                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>
                                  Max Visit Duration (minutes)
                                  {vt.name === 'Government Official' && <span className="ml-1 text-amber-500">-- 0 = no limit</span>}
                                </p>
                                <InputField value={vt.rules.maxDuration} onChange={v => setVtTimingField(vt.id, 'maxDuration', v)} theme={theme} type="number" placeholder="minutes (0 = no limit)" />
                              </div>

                              {/* Type-specific notes */}
                              <div className={`p-2.5 rounded-xl ${theme.accentBg} border ${theme.border}`}>
                                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Note</p>
                                {vt.name === 'Parent' && <p className={`text-[10px] ${theme.iconColor}`}>Parents picking up students go through the standard pickup verification flow (OTP / photo / RFID above).</p>}
                                {vt.name === 'Vendor / Supplier' && <p className={`text-[10px] ${theme.iconColor}`}>Vendor entry is logged and linked to Purchase Orders when available.</p>}
                                {vt.name === 'General Visitor' && <p className={`text-[10px] ${theme.iconColor}`}>Unregistered visitors must fill a digital form at the gate before entry is approved.</p>}
                                {vt.name === 'Contractor' && <p className={`text-[10px] ${theme.iconColor}`}>Work permits are digitally uploaded and verified before the contractor is allowed on campus.</p>}
                                {vt.name === 'Government Official' && <p className={`text-[10px] ${theme.iconColor}`}>Principal is auto-notified via push + SMS as soon as entry is logged for this type.</p>}
                                {vt.name === 'Alumni' && <p className={`text-[10px] ${theme.iconColor}`}>Alumni can be issued a digital alumni ID card via the app for faster future visits.</p>}
                                {!['Parent', 'Vendor / Supplier', 'General Visitor', 'Contractor', 'Government Official', 'Alumni'].includes(vt.name) && (
                                  <p className={`text-[10px] ${theme.iconColor}`}>Custom visitor type. Configure rules and timing as per school policy.</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
              {pagedVt.length === 0 && (
                <tr><td colSpan={6} className={`px-4 py-6 text-center text-xs ${theme.iconColor}`}>No visitor types found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination page={vtPage} total={filteredVt.length} pageSize={PAGE_SIZE} onChange={setVtPage} theme={theme} />
      </SectionCard>

      {/* ── E2: Today's Visitor Log ── */}
      <SectionCard title="Today's Visitor Log" subtitle="Live check-in / check-out log for all visitors today" theme={theme}>
        {/* Active visitors badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-700 text-xs font-bold">
            <User size={13} /> {activeVisitors.length} active visitor{activeVisitors.length !== 1 ? 's' : ''}
          </span>
          <span className={`text-[10px] ${theme.iconColor}`}>{visitorLog.filter(v => v.status === 'Departed').length} departed today</span>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${theme.border} ${theme.inputBg} flex-1 min-w-[160px]`}>
            <Search size={13} className={theme.iconColor} />
            <input value={vlSearch} onChange={e => { setVlSearch(e.target.value); setVlPage(1); }} placeholder="Search visitors..."
              className={`flex-1 bg-transparent text-xs ${theme.highlight} outline-none placeholder-gray-400`} />
            {vlSearch && <button onClick={() => { setVlSearch(''); setVlPage(1); }}><X size={12} className="text-gray-400 hover:text-red-400" /></button>}
          </div>
          <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${theme.secondaryBg} ${theme.iconColor} shrink-0`}>{filteredVl.length} entries</span>
          <button onClick={() => setShowAddEntry(true)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-white ${theme.primary} hover:opacity-90`}>
            <Plus size={13} /> Add Visitor
          </button>
          <button onClick={() => alert('Export visitor log to CSV')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500 text-white hover:bg-emerald-600">
            <Download size={13} /> Export
          </button>
        </div>

        {/* Add Visitor Entry Form */}
        {showAddEntry && (
          <div className={`p-3 rounded-xl border-2 border-blue-200 ${theme.secondaryBg} mb-3 space-y-2`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Register Visitor Entry</p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Visitor Name *</p>
                <InputField value={newEntry.name} onChange={v => setNewEntry(p => ({ ...p, name: v }))} theme={theme} placeholder="Full name" />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Phone</p>
                <InputField value={newEntry.phone} onChange={v => setNewEntry(p => ({ ...p, phone: v }))} theme={theme} placeholder="Phone number" />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Type</p>
                <select value={newEntry.type}
                  onChange={e => setNewEntry(p => ({ ...p, type: e.target.value }))}
                  className={`w-full px-2.5 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                  {visitorTypes.filter(v => v.enabled).map(v => (
                    <option key={v.id} value={v.name}>{v.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Purpose</p>
                <InputField value={newEntry.purpose} onChange={v => setNewEntry(p => ({ ...p, purpose: v }))} theme={theme} placeholder="Purpose of visit" />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Meeting With</p>
                <InputField value={newEntry.meetingWith} onChange={v => setNewEntry(p => ({ ...p, meetingWith: v }))} theme={theme} placeholder="Staff name" />
              </div>
            </div>
            <div className="flex gap-2 pt-1">
              <button onClick={addVisitorEntry} disabled={!newEntry.name.trim()}
                className={`px-4 py-2 rounded-xl text-xs font-bold ${theme.primary} text-white disabled:opacity-50`}>
                <Plus size={12} className="inline mr-1" />Register Entry
              </button>
              <button onClick={() => { setShowAddEntry(false); setNewEntry({ name: '', phone: '', purpose: '', meetingWith: '', type: 'General Visitor' }); }}
                className={`px-3 py-2 rounded-xl text-xs font-bold ${theme.secondaryBg} ${theme.highlight}`}>Cancel</button>
            </div>
          </div>
        )}

        {/* Visitor Log Table */}
        <div className={`rounded-xl border ${theme.border} overflow-hidden`}>
          <table className="w-full text-[10px]">
            <thead className={theme.secondaryBg}>
              <tr>
                {['Name', 'Phone', 'Type', 'Purpose', 'Meeting With', 'Time In', 'Time Out', 'Status', ''].map(h => (
                  <th key={h} className={`text-left px-2.5 py-2 font-bold ${theme.iconColor} text-[9px] uppercase`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pagedVl.map(v => (
                <tr key={v.id} className={`border-t ${theme.border}`}>
                  <td className={`px-2.5 py-2 font-bold ${theme.highlight}`}>{v.name}</td>
                  <td className={`px-2.5 py-2 ${theme.iconColor}`}>
                    <span className="flex items-center gap-1"><Phone size={9} />{v.phone || '--'}</span>
                  </td>
                  <td className="px-2.5 py-2">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${theme.secondaryBg} ${theme.highlight}`}>{v.type}</span>
                  </td>
                  <td className={`px-2.5 py-2 ${theme.iconColor}`}>{v.purpose}</td>
                  <td className={`px-2.5 py-2 ${theme.iconColor}`}>{v.meetingWith}</td>
                  <td className={`px-2.5 py-2 ${theme.iconColor}`}>
                    <span className="flex items-center gap-1"><Clock size={9} />{v.timeIn}</span>
                  </td>
                  <td className={`px-2.5 py-2 ${theme.iconColor}`}>{v.timeOut || '--'}</td>
                  <td className="px-2.5 py-2">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                      v.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-500'
                    }`}>{v.status}</span>
                  </td>
                  <td className="px-2.5 py-2">
                    {v.status === 'Active' && (
                      <button onClick={() => checkOutVisitor(v.id)}
                        className="flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-bold bg-amber-500 text-white hover:bg-amber-600">
                        <LogOut size={10} /> Check Out
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {pagedVl.length === 0 && (
                <tr><td colSpan={9} className={`px-4 py-6 text-center text-xs ${theme.iconColor}`}>No visitor entries found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination page={vlPage} total={filteredVl.length} pageSize={PAGE_SIZE} onChange={setVlPage} theme={theme} />
      </SectionCard>

      <SectionCard title="Campus CCTV" subtitle="Parent access and recording settings for campus cameras" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Live CCTV Access for Parents</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Parents can view designated campus camera feeds via app</p>
            </div>
            <SSAToggle on={cctvParentAccess} onChange={() => setCctvParentAccess(!cctvParentAccess)} theme={theme} />
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>CCTV Recording Retention (days)</p>
            <InputField value={cctvRetentionDays} onChange={setCctvRetentionDays} theme={theme} type="number" placeholder="e.g. 30" />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Role-Based Permissions" subtitle="Control who can view, create, edit, delete, import, and export" theme={theme}>
        <div className="space-y-4">
          <MasterPermissionGrid masterName="Visitor Categories" roles={['Super Admin', 'Principal', 'School Admin', 'Teacher', 'Accountant']} theme={theme} />
        </div>
      </SectionCard>

      {/* ── Save Bar ── */}
      <div className={`flex items-center justify-between p-4 rounded-2xl ${theme.secondaryBg} border ${theme.border}`}>
        <div>
          <p className={`text-sm font-bold ${theme.highlight}`}>Save Visitor Configuration</p>
          <p className={`text-[10px] ${theme.iconColor}`}>Save visitor types, rules, CCTV settings, and pickup verification</p>
        </div>
        <button onClick={() => alert('Visitor configuration saved!')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold ${theme.primary} text-white shadow-lg hover:shadow-xl transition-all`}>
          <Save size={16} /> Save Changes
        </button>
      </div>
    </div>
  );
}
