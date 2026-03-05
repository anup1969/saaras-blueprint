'use client';

import React, { useState } from 'react';
import { Search, X, Plus, Download, Upload, ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

const PAGE_SIZE = 5;

// ── TableToolbar ─────────────────────────────────────
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
      <button onClick={onAdd} className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-white ${theme.primary} hover:opacity-90 shrink-0`}>
        <Plus size={12} /> Add
      </button>
      <button onClick={onExport} className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border ${theme.border} ${theme.iconColor} ${theme.buttonHover} shrink-0`}>
        <Download size={12} /> Export
      </button>
      <button onClick={onImport} className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border ${theme.border} ${theme.iconColor} ${theme.buttonHover} shrink-0`}>
        <Upload size={12} /> Import
      </button>
    </div>
  );
}

// ── Pagination ───────────────────────────────────────
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

// ── Types ────────────────────────────────────────────
type AlumniRow = {
  id: number;
  name: string;
  batch: string;
  year: string;
  role: string;
  city: string;
  email: string;
  status: 'Active' | 'Inactive';
  enabled: boolean;
};

type DonationRow = {
  id: number;
  donor: string;
  amount: string;
  date: string;
  purpose: string;
  receipt: string;
  enabled: boolean;
};

type MentorPairRow = {
  id: number;
  mentor: string;
  student: string;
  startDate: string;
  status: 'Active' | 'Pending' | 'Completed';
  enabled: boolean;
};

type EventRow = {
  id: number;
  name: string;
  date: string;
  venue: string;
  type: 'Reunion' | 'Meetup' | 'Workshop' | 'Fundraiser';
  attendees: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';
  enabled: boolean;
};

// ── Default data ─────────────────────────────────────
const defaultAlumni: AlumniRow[] = [
  { id: 1, name: 'Rajesh Mehta', batch: '1995-97', year: '1997', role: 'CTO, Infosys', city: 'Bangalore', email: 'rajesh.m@email.com', status: 'Active', enabled: true },
  { id: 2, name: 'Priya Kapoor', batch: '1998-00', year: '2000', role: 'Doctor, AIIMS', city: 'Delhi', email: 'priya.k@email.com', status: 'Active', enabled: true },
  { id: 3, name: 'Sanjay Verma', batch: '2000-02', year: '2002', role: 'IAS Officer', city: 'Lucknow', email: 'sanjay.v@email.com', status: 'Active', enabled: true },
  { id: 4, name: 'Anita Shah', batch: '2003-05', year: '2005', role: 'Entrepreneur', city: 'Mumbai', email: 'anita.s@email.com', status: 'Active', enabled: true },
  { id: 5, name: 'Vikram Singh', batch: '2005-07', year: '2007', role: 'Lawyer, Supreme Court', city: 'Delhi', email: 'vikram.s@email.com', status: 'Inactive', enabled: true },
  { id: 6, name: 'Neha Gupta', batch: '2010-12', year: '2012', role: 'Data Scientist, Google', city: 'Hyderabad', email: 'neha.g@email.com', status: 'Active', enabled: true },
];

const defaultDonations: DonationRow[] = [
  { id: 1, donor: 'Rajesh Mehta', amount: '5,00,000', date: '2026-01-15', purpose: 'Computer Lab', receipt: 'RCT-001', enabled: true },
  { id: 2, donor: 'Priya Kapoor', amount: '2,00,000', date: '2026-02-02', purpose: 'Library Fund', receipt: 'RCT-002', enabled: true },
  { id: 3, donor: 'Anita Shah', amount: '3,45,000', date: '2026-02-10', purpose: 'Scholarship Fund', receipt: 'RCT-003', enabled: true },
  { id: 4, donor: 'Alumni Association', amount: '2,00,000', date: '2026-01-28', purpose: 'Sports Equipment', receipt: 'RCT-004', enabled: true },
  { id: 5, donor: 'Vikram Singh', amount: '1,50,000', date: '2026-03-01', purpose: 'Science Lab', receipt: 'RCT-005', enabled: true },
  { id: 6, donor: 'Neha Gupta', amount: '75,000', date: '2026-02-20', purpose: 'Digital Library', receipt: 'RCT-006', enabled: true },
];

const defaultMentorPairs: MentorPairRow[] = [
  { id: 1, mentor: 'Rajesh Mehta', student: 'Aarav Sharma (12-A)', startDate: '2026-01-10', status: 'Active', enabled: true },
  { id: 2, mentor: 'Priya Kapoor', student: 'Diya Patel (11-B)', startDate: '2026-01-15', status: 'Active', enabled: true },
  { id: 3, mentor: 'Sanjay Verma', student: 'Rohan Kumar (12-B)', startDate: '2026-02-01', status: 'Pending', enabled: true },
  { id: 4, mentor: 'Anita Shah', student: 'Meera Joshi (10-A)', startDate: '2025-09-01', status: 'Completed', enabled: true },
  { id: 5, mentor: 'Neha Gupta', student: 'Arjun Reddy (11-A)', startDate: '2026-02-10', status: 'Active', enabled: true },
  { id: 6, mentor: 'Vikram Singh', student: 'Kavya Nair (12-C)', startDate: '2026-01-20', status: 'Pending', enabled: true },
];

const defaultEvents: EventRow[] = [
  { id: 1, name: 'Silver Jubilee Reunion', date: '2026-03-15', venue: 'School Auditorium', type: 'Reunion', attendees: '45', status: 'Upcoming', enabled: true },
  { id: 2, name: 'Annual Alumni Meet 2026', date: '2026-06-20', venue: 'Taj Convention Centre', type: 'Meetup', attendees: '120', status: 'Upcoming', enabled: true },
  { id: 3, name: 'Career Day — Alumni Talk', date: '2026-04-05', venue: 'School Hall', type: 'Workshop', attendees: '18', status: 'Upcoming', enabled: true },
  { id: 4, name: 'Fundraiser Gala Night', date: '2026-05-10', venue: 'Hotel Grand Hyatt', type: 'Fundraiser', attendees: '80', status: 'Upcoming', enabled: true },
  { id: 5, name: 'Batch of 2000 Reunion', date: '2025-12-20', venue: 'School Ground', type: 'Reunion', attendees: '35', status: 'Completed', enabled: true },
  { id: 6, name: 'Tech Workshop by Alumni', date: '2026-07-15', venue: 'IT Lab', type: 'Workshop', attendees: '30', status: 'Upcoming', enabled: true },
];

const EVENT_TYPES: EventRow['type'][] = ['Reunion', 'Meetup', 'Workshop', 'Fundraiser'];
const EVENT_STATUSES: EventRow['status'][] = ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'];
const MENTOR_STATUSES: MentorPairRow['status'][] = ['Active', 'Pending', 'Completed'];

// ── Main Module ──────────────────────────────────────
export default function AlumniConfigModule({ theme }: { theme: Theme }) {
  const [selfRegistration, setSelfRegistration] = useState(true);
  const [donationModule, setDonationModule] = useState(false);
  const [jobBoard, setJobBoard] = useState(false);
  const [eventInvitations, setEventInvitations] = useState(true);
  const [directoryAccess, setDirectoryAccess] = useState(true);

  // ─── Mentorship toggle ───
  const [enableMentorship, setEnableMentorship] = useState(true);

  // ─── A) Alumni Directory ───
  const [alumni, setAlumni] = useState<AlumniRow[]>(defaultAlumni);
  const [alumniSearch, setAlumniSearch] = useState('');
  const [alumniPage, setAlumniPage] = useState(1);
  const [alumniBatchFilter, setAlumniBatchFilter] = useState('');
  const [showAddAlumni, setShowAddAlumni] = useState(false);
  const [newAlumni, setNewAlumni] = useState({ name: '', batch: '', year: '', role: '', city: '', email: '' });

  const batches = [...new Set(alumni.map(a => a.batch))].sort();
  const filteredAlumni = alumni.filter(a => {
    const q = alumniSearch.toLowerCase();
    const matchSearch = !q || a.name.toLowerCase().includes(q) || a.batch.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q) || a.role.toLowerCase().includes(q) || a.city.toLowerCase().includes(q) || a.year.includes(q);
    const matchBatch = !alumniBatchFilter || a.batch === alumniBatchFilter;
    return matchSearch && matchBatch;
  });
  const pagedAlumni = filteredAlumni.slice((alumniPage - 1) * PAGE_SIZE, alumniPage * PAGE_SIZE);

  function updateAlumni(id: number, field: keyof AlumniRow, value: string | boolean) {
    setAlumni(p => p.map(a => a.id === id ? { ...a, [field]: value } : a));
  }
  function deleteAlumni(id: number) { setAlumni(p => p.filter(a => a.id !== id)); }
  function addAlumni() {
    if (!newAlumni.name.trim()) return;
    setAlumni(p => [...p, {
      id: Date.now(), name: newAlumni.name.trim(), batch: newAlumni.batch.trim(), year: newAlumni.year.trim(),
      role: newAlumni.role.trim(), city: newAlumni.city.trim(), email: newAlumni.email.trim(),
      status: 'Active', enabled: true,
    }]);
    setNewAlumni({ name: '', batch: '', year: '', role: '', city: '', email: '' });
    setShowAddAlumni(false);
  }

  // ─── B) Events ───
  const [events, setEvents] = useState<EventRow[]>(defaultEvents);
  const [eventSearch, setEventSearch] = useState('');
  const [eventPage, setEventPage] = useState(1);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({ name: '', date: '', venue: '', description: '', type: 'Reunion' as EventRow['type'], attendees: '' });

  const filteredEvents = events.filter(e => {
    const q = eventSearch.toLowerCase();
    return !q || e.name.toLowerCase().includes(q) || e.venue.toLowerCase().includes(q) || e.type.toLowerCase().includes(q) || e.date.includes(q);
  });
  const pagedEvents = filteredEvents.slice((eventPage - 1) * PAGE_SIZE, eventPage * PAGE_SIZE);

  function updateEvent(id: number, field: keyof EventRow, value: string | boolean) {
    setEvents(p => p.map(e => e.id === id ? { ...e, [field]: value } : e));
  }
  function deleteEvent(id: number) { setEvents(p => p.filter(e => e.id !== id)); }
  function addEvent() {
    if (!newEvent.name.trim()) return;
    setEvents(p => [...p, {
      id: Date.now(), name: newEvent.name.trim(), date: newEvent.date, venue: newEvent.venue.trim(),
      type: newEvent.type, attendees: newEvent.attendees || '0', status: 'Upcoming', enabled: true,
    }]);
    setNewEvent({ name: '', date: '', venue: '', description: '', type: 'Reunion', attendees: '' });
    setShowAddEvent(false);
  }

  // ─── C) Donations ───
  const [donations, setDonations] = useState<DonationRow[]>(defaultDonations);
  const [donSearch, setDonSearch] = useState('');
  const [donPage, setDonPage] = useState(1);
  const [showAddDon, setShowAddDon] = useState(false);
  const [newDon, setNewDon] = useState({ donor: '', amount: '', date: '', purpose: '', receipt: '' });

  const filteredDonations = donations.filter(d => {
    const q = donSearch.toLowerCase();
    return !q || d.donor.toLowerCase().includes(q) || d.purpose.toLowerCase().includes(q) || d.receipt.toLowerCase().includes(q) || d.amount.includes(q);
  });
  const pagedDonations = filteredDonations.slice((donPage - 1) * PAGE_SIZE, donPage * PAGE_SIZE);
  const totalDonations = donations.reduce((sum, d) => sum + parseInt(d.amount.replace(/,/g, '') || '0'), 0);
  const totalContributors = new Set(donations.map(d => d.donor)).size;
  const avgDonation = totalContributors > 0 ? Math.round(totalDonations / totalContributors) : 0;

  function updateDonation(id: number, field: keyof DonationRow, value: string | boolean) {
    setDonations(p => p.map(d => d.id === id ? { ...d, [field]: value } : d));
  }
  function deleteDonation(id: number) { setDonations(p => p.filter(d => d.id !== id)); }
  function addDonation() {
    if (!newDon.donor.trim()) return;
    setDonations(p => [...p, {
      id: Date.now(), donor: newDon.donor.trim(), amount: newDon.amount.trim(), date: newDon.date,
      purpose: newDon.purpose.trim(), receipt: newDon.receipt.trim() || `RCT-${String(donations.length + 1).padStart(3, '0')}`,
      enabled: true,
    }]);
    setNewDon({ donor: '', amount: '', date: '', purpose: '', receipt: '' });
    setShowAddDon(false);
  }

  // ─── D) Mentor Pairs ───
  const [mentorPairs, setMentorPairs] = useState<MentorPairRow[]>(defaultMentorPairs);
  const [mentorSearch, setMentorSearch] = useState('');
  const [mentorPage, setMentorPage] = useState(1);
  const [showAddMentor, setShowAddMentor] = useState(false);
  const [newMentor, setNewMentor] = useState({ mentor: '', student: '', startDate: '' });

  const filteredMentors = mentorPairs.filter(m => {
    const q = mentorSearch.toLowerCase();
    return !q || m.mentor.toLowerCase().includes(q) || m.student.toLowerCase().includes(q) || m.status.toLowerCase().includes(q);
  });
  const pagedMentors = filteredMentors.slice((mentorPage - 1) * PAGE_SIZE, mentorPage * PAGE_SIZE);

  function updateMentor(id: number, field: keyof MentorPairRow, value: string | boolean) {
    setMentorPairs(p => p.map(m => m.id === id ? { ...m, [field]: value } : m));
  }
  function deleteMentor(id: number) { setMentorPairs(p => p.filter(m => m.id !== id)); }
  function addMentor() {
    if (!newMentor.mentor.trim() || !newMentor.student.trim()) return;
    setMentorPairs(p => [...p, {
      id: Date.now(), mentor: newMentor.mentor.trim(), student: newMentor.student.trim(),
      startDate: newMentor.startDate || new Date().toISOString().slice(0, 10), status: 'Pending', enabled: true,
    }]);
    setNewMentor({ mentor: '', student: '', startDate: '' });
    setShowAddMentor(false);
  }

  // ─── Save ───
  const [saved, setSaved] = useState(false);

  function formatINR(n: number) {
    const s = n.toString();
    if (s.length <= 3) return s;
    let result = s.slice(-3);
    let rest = s.slice(0, -3);
    while (rest.length > 2) {
      result = rest.slice(-2) + ',' + result;
      rest = rest.slice(0, -2);
    }
    if (rest.length > 0) result = rest + ',' + result;
    return result;
  }

  return (
    <div className="space-y-4">
      <ModuleHeader title="Alumni Configuration" subtitle="Manage alumni engagement portal features" theme={theme} />

      {/* ── Portal Features (toggles) ── */}
      <SectionCard title="Alumni Portal Features" subtitle="Features available to school alumni through the alumni engagement portal" theme={theme}>
        <div className="space-y-2">
          {[
            { label: 'Self-registration portal', desc: 'Alumni can sign up themselves through a public registration page — no admin action needed', value: selfRegistration, setter: setSelfRegistration },
            { label: 'Donation module', desc: 'Alumni can make monetary contributions to the school through a secure online form', value: donationModule, setter: setDonationModule },
            { label: 'Job board', desc: 'Alumni can post job openings and current students/alumni can view and apply', value: jobBoard, setter: setJobBoard },
            { label: 'Event invitations', desc: 'School can invite alumni to reunions, annual days, and special events via the portal', value: eventInvitations, setter: setEventInvitations },
            { label: 'Directory access', desc: 'Alumni can browse the alumni directory to reconnect with batchmates and seniors', value: directoryAccess, setter: setDirectoryAccess },
          ].map(item => (
            <div key={item.label} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>{item.label}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{item.desc}</p>
              </div>
              <SSAToggle on={item.value} onChange={() => item.setter(!item.value)} theme={theme} />
            </div>
          ))}
        </div>
      </SectionCard>

      {/* ─── A) Alumni Directory — Full Interactive Table ─── */}
      <SectionCard title="Alumni Directory" subtitle="Browse, search, add, edit, and manage alumni records" theme={theme}>
        <TableToolbar
          search={alumniSearch} onSearch={v => { setAlumniSearch(v); setAlumniPage(1); }}
          count={filteredAlumni.length} label="alumni"
          onAdd={() => setShowAddAlumni(true)}
          onExport={() => alert('Export alumni directory to CSV')}
          onImport={() => alert('Import alumni from CSV')}
          theme={theme}
        />

        {/* Batch filter */}
        <div className="flex items-center gap-2 mb-3">
          <select value={alumniBatchFilter} onChange={e => { setAlumniBatchFilter(e.target.value); setAlumniPage(1); }}
            className={`px-3 py-1.5 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
            <option value="">All Batches</option>
            {batches.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>

        {/* Add Alumni Form */}
        {showAddAlumni && (
          <div className={`p-3 rounded-xl border-2 border-blue-200 ${theme.secondaryBg} mb-3 space-y-2`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Add New Alumni</p>
            <div className="grid grid-cols-3 gap-2">
              <InputField value={newAlumni.name} onChange={v => setNewAlumni(p => ({ ...p, name: v }))} placeholder="Full Name *" theme={theme} />
              <InputField value={newAlumni.batch} onChange={v => setNewAlumni(p => ({ ...p, batch: v }))} placeholder="Batch (e.g. 2010-12)" theme={theme} />
              <InputField value={newAlumni.year} onChange={v => setNewAlumni(p => ({ ...p, year: v }))} placeholder="Passing Year" theme={theme} />
              <InputField value={newAlumni.role} onChange={v => setNewAlumni(p => ({ ...p, role: v }))} placeholder="Current Role" theme={theme} />
              <InputField value={newAlumni.city} onChange={v => setNewAlumni(p => ({ ...p, city: v }))} placeholder="City" theme={theme} />
              <InputField value={newAlumni.email} onChange={v => setNewAlumni(p => ({ ...p, email: v }))} placeholder="Email" theme={theme} />
            </div>
            <div className="flex gap-2 mt-2">
              <button onClick={addAlumni} disabled={!newAlumni.name.trim()}
                className={`px-4 py-2 rounded-xl text-xs font-bold ${theme.primary} text-white disabled:opacity-50`}>
                <Plus size={12} className="inline mr-1" />Add Alumni
              </button>
              <button onClick={() => setShowAddAlumni(false)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border ${theme.border} ${theme.iconColor}`}>Cancel</button>
            </div>
          </div>
        )}

        {/* Alumni Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Name', 'Batch', 'Year', 'Current Role', 'City', 'Email', 'Status', 'Enabled', ''].map(h => (
                <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor} whitespace-nowrap`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {pagedAlumni.length === 0 ? (
                <tr><td colSpan={9} className={`text-center py-6 text-xs ${theme.iconColor}`}>No alumni found</td></tr>
              ) : pagedAlumni.map(a => (
                <tr key={a.id} className={`border-t ${theme.border} ${!a.enabled ? 'opacity-50' : ''}`}>
                  <td className="px-1 py-1.5">
                    <input value={a.name} onChange={e => updateAlumni(a.id, 'name', e.target.value)}
                      className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-1 py-1.5">
                    <input value={a.batch} onChange={e => updateAlumni(a.id, 'batch', e.target.value)}
                      className={`w-20 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-1 py-1.5">
                    <input value={a.year} onChange={e => updateAlumni(a.id, 'year', e.target.value)}
                      className={`w-14 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-1 py-1.5">
                    <input value={a.role} onChange={e => updateAlumni(a.id, 'role', e.target.value)}
                      className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-1 py-1.5">
                    <input value={a.city} onChange={e => updateAlumni(a.id, 'city', e.target.value)}
                      className={`w-20 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-1 py-1.5">
                    <input value={a.email} onChange={e => updateAlumni(a.id, 'email', e.target.value)}
                      className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <select value={a.status} onChange={e => updateAlumni(a.id, 'status', e.target.value)}
                      className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] font-bold ${theme.highlight} outline-none`}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </td>
                  <td className="px-2 py-1.5">
                    <SSAToggle on={a.enabled} onChange={() => updateAlumni(a.id, 'enabled', !a.enabled)} theme={theme} />
                  </td>
                  <td className="px-1 py-1.5">
                    <button onClick={() => deleteAlumni(a.id)} className="text-red-400 hover:text-red-600"><X size={12} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={alumniPage} total={filteredAlumni.length} pageSize={PAGE_SIZE} onChange={setAlumniPage} theme={theme} />
      </SectionCard>

      {/* ─── B) Alumni Events — Full Interactive Table ─── */}
      <SectionCard title="Alumni Events" subtitle="Reunions, meets, and engagement events — add, edit, manage" theme={theme}>
        <TableToolbar
          search={eventSearch} onSearch={v => { setEventSearch(v); setEventPage(1); }}
          count={filteredEvents.length} label="events"
          onAdd={() => setShowAddEvent(true)}
          onExport={() => alert('Export events to CSV')}
          onImport={() => alert('Import events from CSV')}
          theme={theme}
        />

        {/* Create Event Form */}
        {showAddEvent && (
          <div className={`p-3 rounded-xl border-2 border-blue-200 ${theme.secondaryBg} mb-3 space-y-2`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Create Event</p>
            <div className="grid grid-cols-3 gap-2">
              <InputField value={newEvent.name} onChange={v => setNewEvent(p => ({ ...p, name: v }))} placeholder="Event Name *" theme={theme} />
              <div>
                <input type="date" value={newEvent.date} onChange={e => setNewEvent(p => ({ ...p, date: e.target.value }))}
                  className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
              </div>
              <InputField value={newEvent.venue} onChange={v => setNewEvent(p => ({ ...p, venue: v }))} placeholder="Venue" theme={theme} />
              <InputField value={newEvent.description} onChange={v => setNewEvent(p => ({ ...p, description: v }))} placeholder="Description" theme={theme} />
              <select value={newEvent.type} onChange={e => setNewEvent(p => ({ ...p, type: e.target.value as EventRow['type'] }))}
                className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <InputField value={newEvent.attendees} onChange={v => setNewEvent(p => ({ ...p, attendees: v }))} placeholder="Expected Attendees" type="number" theme={theme} />
            </div>
            <div className="flex gap-2 mt-2">
              <button onClick={addEvent} disabled={!newEvent.name.trim()}
                className={`px-4 py-2 rounded-xl text-xs font-bold ${theme.primary} text-white disabled:opacity-50`}>
                <Plus size={12} className="inline mr-1" />Create Event
              </button>
              <button onClick={() => setShowAddEvent(false)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border ${theme.border} ${theme.iconColor}`}>Cancel</button>
            </div>
          </div>
        )}

        {/* Events Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Event Name', 'Date', 'Venue', 'Type', 'Attendees', 'Status', 'Enabled', ''].map(h => (
                <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor} whitespace-nowrap`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {pagedEvents.length === 0 ? (
                <tr><td colSpan={8} className={`text-center py-6 text-xs ${theme.iconColor}`}>No events found</td></tr>
              ) : pagedEvents.map(ev => (
                <tr key={ev.id} className={`border-t ${theme.border} ${!ev.enabled ? 'opacity-50' : ''}`}>
                  <td className="px-1 py-1.5">
                    <input value={ev.name} onChange={e => updateEvent(ev.id, 'name', e.target.value)}
                      className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-1 py-1.5">
                    <input type="date" value={ev.date} onChange={e => updateEvent(ev.id, 'date', e.target.value)}
                      className={`w-32 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-1 py-1.5">
                    <input value={ev.venue} onChange={e => updateEvent(ev.id, 'venue', e.target.value)}
                      className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-1 py-1.5">
                    <select value={ev.type} onChange={e => updateEvent(ev.id, 'type', e.target.value)}
                      className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] font-bold ${theme.highlight} outline-none`}>
                      {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </td>
                  <td className="px-1 py-1.5">
                    <input value={ev.attendees} type="number" onChange={e => updateEvent(ev.id, 'attendees', e.target.value)}
                      className={`w-16 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-1 py-1.5">
                    <select value={ev.status} onChange={e => updateEvent(ev.id, 'status', e.target.value)}
                      className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] font-bold ${theme.highlight} outline-none`}>
                      {EVENT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-2 py-1.5">
                    <SSAToggle on={ev.enabled} onChange={() => updateEvent(ev.id, 'enabled', !ev.enabled)} theme={theme} />
                  </td>
                  <td className="px-1 py-1.5">
                    <button onClick={() => deleteEvent(ev.id)} className="text-red-400 hover:text-red-600"><X size={12} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={eventPage} total={filteredEvents.length} pageSize={PAGE_SIZE} onChange={setEventPage} theme={theme} />
      </SectionCard>

      {/* ─── C) Contribution Tracker — Full Interactive Table ─── */}
      <SectionCard title="Contribution Tracker" subtitle="Track alumni donations and contributions — add, edit, manage" theme={theme}>
        {/* Summary Stats (computed dynamically) */}
        <div className="grid grid-cols-3 gap-3 mb-3">
          {[
            { label: 'Total Collected', value: `\u20B9${formatINR(totalDonations)}`, color: 'text-emerald-600' },
            { label: 'Contributors', value: String(totalContributors), color: 'text-blue-600' },
            { label: 'Average', value: `\u20B9${formatINR(avgDonation)}`, color: 'text-purple-600' },
          ].map((s, i) => (
            <div key={i} className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
              <p className={`text-[10px] ${theme.iconColor} mb-1`}>{s.label}</p>
              <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        <TableToolbar
          search={donSearch} onSearch={v => { setDonSearch(v); setDonPage(1); }}
          count={filteredDonations.length} label="donations"
          onAdd={() => setShowAddDon(true)}
          onExport={() => alert('Export donations to CSV')}
          onImport={() => alert('Import donations from CSV')}
          theme={theme}
        />

        {/* Add Donation Form */}
        {showAddDon && (
          <div className={`p-3 rounded-xl border-2 border-blue-200 ${theme.secondaryBg} mb-3 space-y-2`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Add Donation Entry</p>
            <div className="grid grid-cols-3 gap-2">
              <InputField value={newDon.donor} onChange={v => setNewDon(p => ({ ...p, donor: v }))} placeholder="Donor Name *" theme={theme} />
              <InputField value={newDon.amount} onChange={v => setNewDon(p => ({ ...p, amount: v }))} placeholder="Amount (e.g. 5,00,000)" theme={theme} />
              <div>
                <input type="date" value={newDon.date} onChange={e => setNewDon(p => ({ ...p, date: e.target.value }))}
                  className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
              </div>
              <InputField value={newDon.purpose} onChange={v => setNewDon(p => ({ ...p, purpose: v }))} placeholder="Purpose" theme={theme} />
              <InputField value={newDon.receipt} onChange={v => setNewDon(p => ({ ...p, receipt: v }))} placeholder="Receipt # (auto-generated if blank)" theme={theme} />
            </div>
            <div className="flex gap-2 mt-2">
              <button onClick={addDonation} disabled={!newDon.donor.trim()}
                className={`px-4 py-2 rounded-xl text-xs font-bold ${theme.primary} text-white disabled:opacity-50`}>
                <Plus size={12} className="inline mr-1" />Add Donation
              </button>
              <button onClick={() => setShowAddDon(false)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border ${theme.border} ${theme.iconColor}`}>Cancel</button>
            </div>
          </div>
        )}

        {/* Donations Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Donor Name', 'Amount (\u20B9)', 'Date', 'Purpose', 'Receipt #', 'Enabled', ''].map(h => (
                <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor} whitespace-nowrap`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {pagedDonations.length === 0 ? (
                <tr><td colSpan={7} className={`text-center py-6 text-xs ${theme.iconColor}`}>No donations found</td></tr>
              ) : pagedDonations.map(d => (
                <tr key={d.id} className={`border-t ${theme.border} ${!d.enabled ? 'opacity-50' : ''}`}>
                  <td className="px-1 py-1.5">
                    <input value={d.donor} onChange={e => updateDonation(d.id, 'donor', e.target.value)}
                      className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-1 py-1.5">
                    <input value={d.amount} onChange={e => updateDonation(d.id, 'amount', e.target.value)}
                      className={`w-24 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-1 py-1.5">
                    <input type="date" value={d.date} onChange={e => updateDonation(d.id, 'date', e.target.value)}
                      className={`w-32 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-1 py-1.5">
                    <input value={d.purpose} onChange={e => updateDonation(d.id, 'purpose', e.target.value)}
                      className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-1 py-1.5">
                    <input value={d.receipt} onChange={e => updateDonation(d.id, 'receipt', e.target.value)}
                      className={`w-20 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-blue-500 font-bold outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <SSAToggle on={d.enabled} onChange={() => updateDonation(d.id, 'enabled', !d.enabled)} theme={theme} />
                  </td>
                  <td className="px-1 py-1.5">
                    <button onClick={() => deleteDonation(d.id)} className="text-red-400 hover:text-red-600"><X size={12} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={donPage} total={filteredDonations.length} pageSize={PAGE_SIZE} onChange={setDonPage} theme={theme} />
      </SectionCard>

      {/* ─── D) Mentorship Program — Full Interactive Table ─── */}
      <SectionCard title="Mentorship Program" subtitle="Connect alumni mentors with current students — add, edit, manage pairs" theme={theme}>
        <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg} mb-3`}>
          <div>
            <p className={`text-xs font-bold ${theme.highlight}`}>Enable Alumni-Student Mentorship</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Allow alumni to mentor current students in their area of expertise</p>
          </div>
          <SSAToggle on={enableMentorship} onChange={() => setEnableMentorship(!enableMentorship)} theme={theme} />
        </div>
        {enableMentorship && (
          <>
            <TableToolbar
              search={mentorSearch} onSearch={v => { setMentorSearch(v); setMentorPage(1); }}
              count={filteredMentors.length} label="mentor pairs"
              onAdd={() => setShowAddMentor(true)}
              onExport={() => alert('Export mentor pairs to CSV')}
              onImport={() => alert('Import mentor pairs from CSV')}
              theme={theme}
            />

            {/* Add Mentor Pair Form */}
            {showAddMentor && (
              <div className={`p-3 rounded-xl border-2 border-blue-200 ${theme.secondaryBg} mb-3 space-y-2`}>
                <p className={`text-xs font-bold ${theme.highlight}`}>Add Mentor Pair</p>
                <div className="grid grid-cols-3 gap-2">
                  <InputField value={newMentor.mentor} onChange={v => setNewMentor(p => ({ ...p, mentor: v }))} placeholder="Alumni Mentor Name *" theme={theme} />
                  <InputField value={newMentor.student} onChange={v => setNewMentor(p => ({ ...p, student: v }))} placeholder="Student Mentee *" theme={theme} />
                  <div>
                    <input type="date" value={newMentor.startDate} onChange={e => setNewMentor(p => ({ ...p, startDate: e.target.value }))}
                      className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <button onClick={addMentor} disabled={!newMentor.mentor.trim() || !newMentor.student.trim()}
                    className={`px-4 py-2 rounded-xl text-xs font-bold ${theme.primary} text-white disabled:opacity-50`}>
                    <Plus size={12} className="inline mr-1" />Add Pair
                  </button>
                  <button onClick={() => setShowAddMentor(false)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border ${theme.border} ${theme.iconColor}`}>Cancel</button>
                </div>
              </div>
            )}

            {/* Mentor Pairs Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead><tr className={theme.secondaryBg}>
                  {['Alumni (Mentor)', 'Student (Mentee)', 'Start Date', 'Status', 'Enabled', ''].map(h => (
                    <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor} whitespace-nowrap`}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {pagedMentors.length === 0 ? (
                    <tr><td colSpan={6} className={`text-center py-6 text-xs ${theme.iconColor}`}>No mentor pairs found</td></tr>
                  ) : pagedMentors.map(m => (
                    <tr key={m.id} className={`border-t ${theme.border} ${!m.enabled ? 'opacity-50' : ''}`}>
                      <td className="px-1 py-1.5">
                        <input value={m.mentor} onChange={e => updateMentor(m.id, 'mentor', e.target.value)}
                          className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                      </td>
                      <td className="px-1 py-1.5">
                        <input value={m.student} onChange={e => updateMentor(m.id, 'student', e.target.value)}
                          className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                      </td>
                      <td className="px-1 py-1.5">
                        <input type="date" value={m.startDate} onChange={e => updateMentor(m.id, 'startDate', e.target.value)}
                          className={`w-32 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                      </td>
                      <td className="px-1 py-1.5">
                        <select value={m.status} onChange={e => updateMentor(m.id, 'status', e.target.value)}
                          className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] font-bold ${theme.highlight} outline-none`}>
                          {MENTOR_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                      <td className="px-2 py-1.5">
                        <SSAToggle on={m.enabled} onChange={() => updateMentor(m.id, 'enabled', !m.enabled)} theme={theme} />
                      </td>
                      <td className="px-1 py-1.5">
                        <button onClick={() => deleteMentor(m.id)} className="text-red-400 hover:text-red-600"><X size={12} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination page={mentorPage} total={filteredMentors.length} pageSize={PAGE_SIZE} onChange={setMentorPage} theme={theme} />
          </>
        )}
      </SectionCard>

      {/* ─── E) Engagement Summary (preserved) ─── */}
      <SectionCard title="Engagement Summary" subtitle="Alumni engagement metrics and participation" theme={theme}>
        <div className="grid grid-cols-3 gap-3 mb-3">
          {[
            { label: 'Active Alumni', value: `${alumni.filter(a => a.status === 'Active' && a.enabled).length} / ${alumni.length}`, color: 'text-emerald-600' },
            { label: 'Active Mentorships', value: String(mentorPairs.filter(m => m.status === 'Active').length), color: 'text-blue-600' },
            { label: 'Upcoming Events', value: String(events.filter(e => e.status === 'Upcoming').length), color: 'text-purple-600' },
          ].map((s, i) => (
            <div key={i} className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
              <p className={`text-[10px] ${theme.iconColor} mb-1`}>{s.label}</p>
              <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
        <div className={`p-3 rounded-xl ${theme.accentBg} border ${theme.border}`}>
          <p className={`text-[10px] font-bold ${theme.iconColor} mb-2 uppercase tracking-wide`}>Engagement by Batch Year</p>
          <div className="flex items-end gap-2 h-24">
            {[
              { batch: '1995', pct: 30 },
              { batch: '2000', pct: 45 },
              { batch: '2005', pct: 55 },
              { batch: '2010', pct: 70 },
              { batch: '2015', pct: 85 },
              { batch: '2020', pct: 60 },
            ].map((b, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div className={`w-full rounded-t-lg ${theme.primary}`} style={{ height: `${b.pct}%` }} />
                <span className={`text-[8px] mt-1 ${theme.iconColor}`}>{b.batch}</span>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* ─── Save Configuration Button ─── */}
      <div className="flex justify-end">
        <button
          onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
          className={`flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold text-white ${theme.primary} hover:opacity-90 transition-all`}>
          <Save size={14} /> Save Configuration
        </button>
        {saved && <span className="text-green-500 text-xs font-medium animate-pulse ml-3 self-center">Saved!</span>}
      </div>
    </div>
  );
}
