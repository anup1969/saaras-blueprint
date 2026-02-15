'use client';

import React, { useState } from 'react';
import BlueprintLayout from '@/components/BlueprintLayout';
import { StatCard, TabBar, StatusBadge, SearchBar, DataTable, Toggle } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import StakeholderProfile from '@/components/StakeholderProfile';
import TaskTrackerPanel from '@/components/TaskTrackerPanel';
import { ChatsView } from '@/components/ChatModule';
import SupportModule from '@/components/SupportModule';
import {
  Home, Bus, ClipboardCheck, Users, MessageSquare, Shield,
  Search, Plus, Filter, Download, Eye, Edit, Phone, Clock,
  AlertTriangle, CheckCircle, Baby, MapPin, Heart,
  User, Bell, ChevronDown, Check, X, CircleDot,
  PanelLeftClose, PanelLeftOpen, Headphones
} from 'lucide-react';

// ─── MODULE SIDEBAR ────────────────────────────────
const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'trip-log', label: 'Trip Log', icon: Bus },
  { id: 'safety-checklist', label: 'Safety Checklist', icon: ClipboardCheck },
  { id: 'students-assigned', label: 'Students Assigned', icon: Users },
  { id: 'communication', label: 'Communication', icon: MessageSquare },
  { id: 'support', label: 'Support', icon: Headphones },
];

// ─── MOCK DATA ──────────────────────────────────────

const mockTripLog = [
  { tripNo: 1, route: 'Satellite - Jodhpur', time: '06:45 AM - 07:50 AM', childrenCount: 12, status: 'Completed', checklist: true },
  { tripNo: 2, route: 'Prahlad Nagar - Thaltej', time: '07:55 AM - 08:40 AM', childrenCount: 8, status: 'Completed', checklist: true },
  { tripNo: 3, route: 'Satellite - Jodhpur', time: '12:30 PM - 01:15 PM', childrenCount: 10, status: 'Completed', checklist: true },
  { tripNo: 4, route: 'Prahlad Nagar - Thaltej', time: '02:00 PM - 02:45 PM', childrenCount: 8, status: 'In Progress', checklist: false },
  { tripNo: 5, route: 'Satellite - Jodhpur', time: '03:00 PM - 03:45 PM', childrenCount: 12, status: 'Upcoming', checklist: false },
  { tripNo: 6, route: 'Bopal - South Bopal', time: '03:30 PM - 04:15 PM', childrenCount: 6, status: 'Upcoming', checklist: false },
];

const mockStudentsAssigned = [
  { id: 'STU-101', name: 'Aarav Patel', age: 4, class: 'Nursery-A', route: 'Satellite', stop: 'Jodhpur Cross Roads', parent: 'Rajesh Patel', phone: '98250 11111', allergies: 'None', special: '-' },
  { id: 'STU-102', name: 'Siya Sharma', age: 3, class: 'Playgroup-B', route: 'Satellite', stop: 'Satellite Circle', parent: 'Vikram Sharma', phone: '98250 11112', allergies: 'Peanuts', special: 'Car seat required' },
  { id: 'STU-103', name: 'Rohan Desai', age: 5, class: 'LKG-A', route: 'Satellite', stop: 'Shyamal Cross Roads', parent: 'Anil Desai', phone: '98250 11113', allergies: 'None', special: '-' },
  { id: 'STU-104', name: 'Ananya Mehta', age: 4, class: 'Nursery-B', route: 'Prahlad Nagar', stop: 'Prahlad Nagar Garden', parent: 'Suresh Mehta', phone: '98250 22221', allergies: 'Lactose', special: 'Motion sickness — seat near window' },
  { id: 'STU-105', name: 'Vivaan Shah', age: 3, class: 'Playgroup-A', route: 'Prahlad Nagar', stop: 'Thaltej Cross Roads', parent: 'Ketan Shah', phone: '98250 22222', allergies: 'None', special: '-' },
  { id: 'STU-106', name: 'Ishita Joshi', age: 5, class: 'LKG-B', route: 'Satellite', stop: 'Judges Bungalow', parent: 'Dinesh Joshi', phone: '98250 11114', allergies: 'Eggs', special: '-' },
  { id: 'STU-107', name: 'Kabir Raval', age: 4, class: 'Nursery-A', route: 'Prahlad Nagar', stop: 'Sola Bridge', parent: 'Mahesh Raval', phone: '98250 22223', allergies: 'None', special: 'Needs help with seatbelt' },
  { id: 'STU-108', name: 'Myra Pandya', age: 3, class: 'Playgroup-B', route: 'Satellite', stop: 'Prernatirth Derasar', parent: 'Harsh Pandya', phone: '98250 11115', allergies: 'Gluten', special: 'Carries comfort toy' },
];

const mockSafetyChecklist = [
  { id: 'SC-01', item: 'Head count before departure', trip: 'Trip 1 (Morning Pickup)', done: true, time: '06:45 AM', note: '12/12 children boarded' },
  { id: 'SC-02', item: 'Seatbelt check for all children', trip: 'Trip 1 (Morning Pickup)', done: true, time: '06:47 AM', note: 'All secured' },
  { id: 'SC-03', item: 'First-aid kit verified', trip: 'Trip 1 (Morning Pickup)', done: true, time: '06:44 AM', note: 'Complete and in-date' },
  { id: 'SC-04', item: 'Emergency contact list available', trip: 'Trip 1 (Morning Pickup)', done: true, time: '06:43 AM', note: 'Updated list on tablet' },
  { id: 'SC-05', item: 'Vehicle cleanliness check', trip: 'Trip 1 (Morning Pickup)', done: true, time: '06:40 AM', note: 'Clean and sanitized' },
  { id: 'SC-06', item: 'Head count at drop-off', trip: 'Trip 1 (Morning Pickup)', done: true, time: '07:50 AM', note: '12/12 children handed to teachers' },
  { id: 'SC-07', item: 'Head count before departure', trip: 'Trip 2 (Morning Pickup)', done: true, time: '07:55 AM', note: '8/8 children boarded' },
  { id: 'SC-08', item: 'Seatbelt check for all children', trip: 'Trip 2 (Morning Pickup)', done: true, time: '07:57 AM', note: 'All secured' },
  { id: 'SC-09', item: 'Head count at drop-off', trip: 'Trip 2 (Morning Pickup)', done: true, time: '08:40 AM', note: '8/8 children handed to teachers' },
  { id: 'SC-10', item: 'Head count before departure', trip: 'Trip 3 (Afternoon Drop)', done: true, time: '12:30 PM', note: '10/10 children boarded' },
  { id: 'SC-11', item: 'Seatbelt check for all children', trip: 'Trip 3 (Afternoon Drop)', done: true, time: '12:32 PM', note: 'All secured' },
  { id: 'SC-12', item: 'Head count at each stop', trip: 'Trip 3 (Afternoon Drop)', done: true, time: '01:15 PM', note: 'All children handed to parents/guardians' },
  { id: 'SC-13', item: 'Head count before departure', trip: 'Trip 4 (Afternoon Drop)', done: false, time: '-', note: 'In progress' },
  { id: 'SC-14', item: 'Seatbelt check for all children', trip: 'Trip 4 (Afternoon Drop)', done: false, time: '-', note: 'Pending' },
];

// ─── MAIN COMPONENT ─────────────────────────────────

function BusNannyDashboard({ theme, themeIdx, onThemeChange, isPreschool }: { theme?: Theme; themeIdx?: number; onThemeChange?: (idx: number) => void; isPreschool?: boolean }) {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  if (!theme) return null;

  return (
    <div className="flex gap-4 -m-6">
      {/* Module sidebar */}
      <div className={`${sidebarCollapsed ? 'w-14' : 'w-48'} ${theme.cardBg} border-r ${theme.border} min-h-screen p-2 space-y-0.5 shrink-0 transition-all duration-200`}>
        <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} px-2 py-2`}>
          {!sidebarCollapsed && <p className={`text-[10px] font-bold ${theme.iconColor} uppercase px-1`}>Nanny Modules</p>}
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className={`p-1 rounded-lg ${theme.buttonHover} ${theme.iconColor} transition-all`}>
            {sidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={14} />}
          </button>
        </div>
        {modules.map(m => (
          <button
            key={m.id}
            onClick={() => setActiveModule(m.id)}
            title={sidebarCollapsed ? m.label : undefined}
            className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2 py-2.5' : 'gap-2 px-3 py-2'} rounded-lg text-xs font-medium transition-all ${
              activeModule === m.id ? `${theme.primary} text-white` : `${theme.iconColor} ${theme.buttonHover}`
            }`}
          >
            <m.icon size={sidebarCollapsed ? 18 : 14} /> {!sidebarCollapsed && m.label}
          </button>
        ))}
      </div>

      {/* Module content */}
      <div className="flex-1 p-6 space-y-4 overflow-x-hidden">
        {activeModule === 'dashboard' && <DashboardHome theme={theme} onProfileClick={() => setActiveModule('profile')} />}
        {activeModule === 'trip-log' && <TripLogModule theme={theme} />}
        {activeModule === 'safety-checklist' && <SafetyChecklistModule theme={theme} />}
        {activeModule === 'students-assigned' && <StudentsAssignedModule theme={theme} />}
        {activeModule === 'communication' && <CommunicationModule theme={theme} />}
        {activeModule === 'support' && <SupportModule theme={theme} role="bus-nanny" />}
        {activeModule === 'profile' && <StakeholderProfile role="bus-nanny" theme={theme} onClose={() => setActiveModule('dashboard')} themeIdx={themeIdx} onThemeChange={onThemeChange} />}
      </div>
    </div>
  );
}

// ─── DASHBOARD HOME ──────────────────────────────────
function DashboardHome({ theme, onProfileClick }: { theme: Theme; onProfileClick: () => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${theme.highlight}`}>Bus Nanny Dashboard</h1>
          <p className={`text-xs ${theme.iconColor}`}>Trip overview for today &mdash; {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
        <button onClick={onProfileClick} title="My Profile" className={`w-9 h-9 rounded-full ${theme.primary} text-white flex items-center justify-center text-xs font-bold hover:opacity-90 transition-opacity`}>SG</button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Bus} label="Today's Trips" value={4} color="bg-blue-500" sub="2 completed, 1 active" theme={theme} />
        <StatCard icon={Baby} label="Children Assigned" value={28} color="bg-emerald-500" sub="Across all routes" theme={theme} />
        <StatCard icon={ClipboardCheck} label="Safety Checklists Done" value="3/4" color="bg-amber-500" sub="Trip 4 in progress" theme={theme} />
        <StatCard icon={AlertTriangle} label="Incidents Today" value={0} color="bg-red-500" sub="All clear" theme={theme} />
      </div>

      {/* Quick Actions */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { label: 'Start Checklist', icon: ClipboardCheck, color: 'bg-blue-500' },
            { label: 'Log Head Count', icon: Users, color: 'bg-emerald-500' },
            { label: 'Report Incident', icon: AlertTriangle, color: 'bg-red-500' },
            { label: 'Call Parent', icon: Phone, color: 'bg-amber-500' },
          ].map(a => (
            <button key={a.label} className={`flex items-center gap-2 p-3 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} transition-all`}>
              <div className={`w-8 h-8 rounded-lg ${a.color} flex items-center justify-center text-white`}><a.icon size={14} /></div>
              <span className={`text-xs font-bold ${theme.highlight}`}>{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Today's Trip Log */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Today&apos;s Trip Log</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className={theme.secondaryBg}>
              <tr>
                {['Trip #', 'Route', 'Time', 'Children Count', 'Status', 'Checklist'].map(h => (
                  <th key={h} className={`text-left px-4 py-3 text-xs font-bold ${theme.iconColor} uppercase`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockTripLog.slice(0, 4).map((trip, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className={`px-4 py-3 font-mono font-bold ${theme.primaryText}`}>#{trip.tripNo}</td>
                  <td className={`px-4 py-3 font-bold ${theme.highlight}`}>{trip.route}</td>
                  <td className={`px-4 py-3 font-mono text-xs ${theme.iconColor}`}>{trip.time}</td>
                  <td className={`px-4 py-3 ${theme.highlight}`}>{trip.childrenCount} children</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={trip.status === 'Completed' ? 'Active' : trip.status === 'In Progress' ? 'Running' : 'Pending'} theme={theme} />
                  </td>
                  <td className="px-4 py-3">
                    {trip.checklist ? (
                      <span className="flex items-center gap-1 text-xs text-emerald-600 font-bold"><CheckCircle size={14} /> Done</span>
                    ) : (
                      <span className={`flex items-center gap-1 text-xs ${theme.iconColor}`}><CircleDot size={14} /> Pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Children with Special Needs */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Children with Special Notes</h3>
        <div className="space-y-2">
          {mockStudentsAssigned.filter(s => s.special !== '-' || s.allergies !== 'None').map((s, i) => (
            <div key={i} className={`flex items-center gap-3 p-2 rounded-xl ${theme.accentBg}`}>
              <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold">
                {s.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className={`text-xs font-bold ${theme.highlight}`}>{s.name} <span className={`font-normal ${theme.iconColor}`}>({s.class})</span></p>
                <div className="flex flex-wrap gap-2 mt-0.5">
                  {s.allergies !== 'None' && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-red-100 text-red-600">Allergy: {s.allergies}</span>
                  )}
                  {s.special !== '-' && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-blue-100 text-blue-700">{s.special}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Task Tracker */}
      <TaskTrackerPanel theme={theme} role="bus-nanny" />
    </div>
  );
}

// ─── TRIP LOG MODULE ─────────────────────────────────
function TripLogModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Today');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Trip Log</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}>
          <Plus size={14} /> Log New Trip
        </button>
      </div>
      <TabBar tabs={['Today', 'This Week', 'History']} active={tab} onChange={setTab} theme={theme} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Bus} label="Total Trips" value={mockTripLog.length} color="bg-blue-500" theme={theme} />
        <StatCard icon={CheckCircle} label="Completed" value={mockTripLog.filter(t => t.status === 'Completed').length} color="bg-emerald-500" theme={theme} />
        <StatCard icon={Clock} label="In Progress" value={mockTripLog.filter(t => t.status === 'In Progress').length} color="bg-amber-500" theme={theme} />
        <StatCard icon={Baby} label="Total Children" value={mockTripLog.reduce((sum, t) => sum + t.childrenCount, 0)} color="bg-purple-500" theme={theme} />
      </div>

      <DataTable
        headers={['Trip #', 'Route', 'Time', 'Children', 'Status', 'Checklist']}
        rows={mockTripLog.map(trip => [
          <span key="no" className={`font-mono font-bold ${theme.primaryText}`}>#{trip.tripNo}</span>,
          <span key="route" className={`font-bold ${theme.highlight}`}>{trip.route}</span>,
          <span key="time" className={`font-mono text-xs ${theme.iconColor}`}>{trip.time}</span>,
          <span key="children" className={theme.highlight}>{trip.childrenCount}</span>,
          <StatusBadge key="status" status={trip.status === 'Completed' ? 'Active' : trip.status === 'In Progress' ? 'Running' : 'Pending'} theme={theme} />,
          trip.checklist ? (
            <span key="check" className="flex items-center gap-1 text-xs text-emerald-600 font-bold"><CheckCircle size={14} /> Done</span>
          ) : (
            <span key="check" className={`flex items-center gap-1 text-xs ${theme.iconColor}`}><CircleDot size={14} /> Pending</span>
          ),
        ])}
        theme={theme}
      />
    </div>
  );
}

// ─── SAFETY CHECKLIST MODULE ────────────────────────
function SafetyChecklistModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Current Trip');

  const completedCount = mockSafetyChecklist.filter(c => c.done).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Safety Checklist</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}>
          <ClipboardCheck size={14} /> Submit Checklist
        </button>
      </div>
      <TabBar tabs={['Current Trip', 'Completed Trips', 'Standards']} active={tab} onChange={setTab} theme={theme} />

      {tab === 'Current Trip' && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={CheckCircle} label="Items Checked" value={completedCount} color="bg-emerald-500" sub={`of ${mockSafetyChecklist.length} total`} theme={theme} />
            <StatCard icon={Clock} label="Pending Items" value={mockSafetyChecklist.length - completedCount} color="bg-amber-500" theme={theme} />
            <StatCard icon={Shield} label="Compliance" value={`${Math.round((completedCount / mockSafetyChecklist.length) * 100)}%`} color="bg-blue-500" theme={theme} />
            <StatCard icon={AlertTriangle} label="Issues" value={0} color="bg-red-500" sub="All clear" theme={theme} />
          </div>

          {/* Progress Bar */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Checklist Progress</h3>
              <span className={`text-xs font-bold ${theme.primaryText}`}>{completedCount}/{mockSafetyChecklist.length}</span>
            </div>
            <div className={`w-full h-3 rounded-full ${theme.secondaryBg}`}>
              <div
                className={`h-3 rounded-full ${theme.primary} transition-all`}
                style={{ width: `${(completedCount / mockSafetyChecklist.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            {mockSafetyChecklist.map((item, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${item.done ? theme.accentBg : `${theme.cardBg} border ${theme.border}`}`}>
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${item.done ? 'bg-emerald-500 text-white' : `${theme.secondaryBg} ${theme.iconColor}`}`}>
                  {item.done ? <Check size={14} /> : <CircleDot size={14} />}
                </div>
                <div className="flex-1">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{item.item}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{item.trip}</p>
                </div>
                <div className="text-right">
                  <p className={`text-[10px] font-mono ${theme.iconColor}`}>{item.time}</p>
                  <p className={`text-[10px] ${item.done ? 'text-emerald-600 font-bold' : theme.iconColor}`}>{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === 'Completed Trips' && (
        <DataTable
          headers={['Trip', 'Date', 'Items Checked', 'Issues', 'Status']}
          rows={[
            [
              <span key="t" className={`font-bold ${theme.highlight}`}>Trip 1 — Satellite (Morning)</span>,
              <span key="d" className={`text-xs ${theme.iconColor}`}>Today</span>,
              <span key="c" className={`font-bold ${theme.primaryText}`}>6/6</span>,
              <span key="i" className={theme.iconColor}>0</span>,
              <StatusBadge key="s" status="Approved" theme={theme} />,
            ],
            [
              <span key="t" className={`font-bold ${theme.highlight}`}>Trip 2 — Prahlad Nagar (Morning)</span>,
              <span key="d" className={`text-xs ${theme.iconColor}`}>Today</span>,
              <span key="c" className={`font-bold ${theme.primaryText}`}>3/3</span>,
              <span key="i" className={theme.iconColor}>0</span>,
              <StatusBadge key="s" status="Approved" theme={theme} />,
            ],
            [
              <span key="t" className={`font-bold ${theme.highlight}`}>Trip 3 — Satellite (Afternoon)</span>,
              <span key="d" className={`text-xs ${theme.iconColor}`}>Today</span>,
              <span key="c" className={`font-bold ${theme.primaryText}`}>3/3</span>,
              <span key="i" className={theme.iconColor}>0</span>,
              <StatusBadge key="s" status="Approved" theme={theme} />,
            ],
          ]}
          theme={theme}
        />
      )}

      {tab === 'Standards' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Mandatory Safety Standards</h3>
          <div className="space-y-2">
            {[
              { rule: 'Head count must be taken before every departure and at every stop', category: 'Head Count' },
              { rule: 'All children must have seatbelts fastened before the bus moves', category: 'Seatbelt' },
              { rule: 'First-aid kit must be checked and verified before first trip of the day', category: 'First Aid' },
              { rule: 'Emergency contact list must be accessible on tablet at all times', category: 'Contacts' },
              { rule: 'Vehicle must be sanitized before morning pickup trip', category: 'Hygiene' },
              { rule: 'Children must only be handed to authorized persons at drop-off', category: 'Handover' },
              { rule: 'Any incident, however minor, must be reported immediately to the transport head', category: 'Reporting' },
              { rule: 'Bus nanny must remain standing in the aisle during transit for children under 4', category: 'Supervision' },
            ].map((s, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${theme.accentBg}`}>
                <span className={`text-[10px] font-bold ${theme.primaryText} mt-0.5 shrink-0`}>{i + 1}.</span>
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>{s.rule}</p>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-blue-100 text-blue-700 mt-1 inline-block">{s.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── STUDENTS ASSIGNED MODULE ────────────────────────
function StudentsAssignedModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All Students');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Students Assigned</h1>
        <button className={`px-4 py-2.5 rounded-xl border ${theme.border} ${theme.cardBg} text-sm font-bold ${theme.iconColor} flex items-center gap-1`}>
          <Download size={14} /> Export List
        </button>
      </div>
      <TabBar tabs={['All Students', 'By Route', 'Special Needs']} active={tab} onChange={setTab} theme={theme} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Baby} label="Total Children" value={mockStudentsAssigned.length} color="bg-blue-500" theme={theme} />
        <StatCard icon={AlertTriangle} label="Allergies" value={mockStudentsAssigned.filter(s => s.allergies !== 'None').length} color="bg-red-500" theme={theme} />
        <StatCard icon={Heart} label="Special Notes" value={mockStudentsAssigned.filter(s => s.special !== '-').length} color="bg-amber-500" theme={theme} />
        <StatCard icon={MapPin} label="Routes" value={2} color="bg-purple-500" sub="Satellite + Prahlad Nagar" theme={theme} />
      </div>

      {tab === 'All Students' && (
        <>
          <div className="flex gap-3">
            <SearchBar placeholder="Search student name, class, route..." theme={theme} icon={Search} />
            <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Filter size={12} /> Filter</button>
          </div>
          <DataTable
            headers={['ID', 'Name', 'Age', 'Class', 'Route', 'Stop', 'Parent', 'Allergies']}
            rows={mockStudentsAssigned.map(s => [
              <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{s.id}</span>,
              <span key="name" className={`font-bold ${theme.highlight}`}>{s.name}</span>,
              <span key="age" className={theme.iconColor}>{s.age} yrs</span>,
              <span key="class" className={theme.iconColor}>{s.class}</span>,
              <span key="route" className={theme.iconColor}>{s.route}</span>,
              <span key="stop" className={`text-xs ${theme.iconColor}`}>{s.stop}</span>,
              <span key="parent" className={theme.iconColor}>{s.parent}</span>,
              s.allergies !== 'None' ? (
                <span key="allergy" className="text-xs px-2 py-0.5 rounded-full font-bold bg-red-100 text-red-600">{s.allergies}</span>
              ) : (
                <span key="allergy" className={`text-xs ${theme.iconColor}`}>None</span>
              ),
            ])}
            theme={theme}
          />
        </>
      )}

      {tab === 'By Route' && (
        <div className="space-y-4">
          {['Satellite', 'Prahlad Nagar'].map(route => (
            <div key={route} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
              <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>{route} Route</h3>
              <div className="space-y-2">
                {mockStudentsAssigned.filter(s => s.route === route).map((s, i) => (
                  <div key={i} className={`flex items-center gap-3 p-2 rounded-xl ${theme.accentBg}`}>
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                      {s.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className={`text-xs font-bold ${theme.highlight}`}>{s.name}</p>
                      <p className={`text-[10px] ${theme.iconColor}`}>{s.class} &bull; Stop: {s.stop}</p>
                    </div>
                    <span className={`text-[10px] ${theme.iconColor}`}>{s.phone}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'Special Needs' && (
        <div className="space-y-3">
          {mockStudentsAssigned.filter(s => s.special !== '-' || s.allergies !== 'None').map((s, i) => (
            <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white font-bold text-sm">
                  {s.name.charAt(0)}
                </div>
                <div>
                  <p className={`text-sm font-bold ${theme.highlight}`}>{s.name}</p>
                  <p className={`text-xs ${theme.iconColor}`}>{s.class} &bull; {s.route} Route &bull; Age: {s.age}</p>
                </div>
              </div>
              <div className={`p-3 rounded-xl ${theme.accentBg} space-y-1`}>
                <div className="flex justify-between">
                  <span className={`text-xs ${theme.iconColor}`}>Allergies:</span>
                  <span className={`text-xs font-bold ${s.allergies !== 'None' ? 'text-red-600' : theme.iconColor}`}>{s.allergies}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-xs ${theme.iconColor}`}>Special Notes:</span>
                  <span className={`text-xs font-bold ${theme.highlight}`}>{s.special}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-xs ${theme.iconColor}`}>Parent Contact:</span>
                  <span className={`text-xs font-mono ${theme.iconColor}`}>{s.parent} — {s.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── COMMUNICATION MODULE ────────────────────────────

function CommunicationModule({ theme }: { theme: Theme }) {
  const [commTab, setCommTab] = useState('Chat');
  const tabs = ['Alerts', 'Messages', 'Chat'];

  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Communication</h1>
      <TabBar tabs={tabs} active={commTab} onChange={setCommTab} theme={theme} />

      {commTab === 'Chat' && (
        <div className="h-[calc(100vh-220px)]">
          <ChatsView theme={theme} compact />
        </div>
      )}

      {commTab === 'Alerts' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-2`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-2`}>Today&apos;s Alerts</h3>
          {[
            { title: 'Siya Sharma — Peanut allergy reminder', detail: 'Ensure no peanut-based snacks are on board. Parent reminder sent.', time: '06:30 AM', severity: 'Critical' },
            { title: 'Route change — Prahlad Nagar detour', detail: 'Road work near Sola Bridge. Use alternate via Thaltej Gam road.', time: '06:15 AM', severity: 'Warning' },
            { title: 'New student added to Trip 4', detail: 'Myra Pandya (Playgroup-B) added to afternoon drop. Stop: Prernatirth.', time: '11:00 AM', severity: 'Info' },
          ].map((a, i) => (
            <div key={i} className={`p-3 rounded-xl ${theme.accentBg} flex items-center gap-3`}>
              <div className={`w-2 h-2 rounded-full ${a.severity === 'Critical' ? 'bg-red-500' : a.severity === 'Warning' ? 'bg-amber-500' : 'bg-blue-500'}`} />
              <div className="flex-1">
                <p className={`text-xs font-bold ${theme.highlight}`}>{a.title}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{a.detail}</p>
              </div>
              <span className={`text-[10px] ${theme.iconColor}`}>{a.time}</span>
            </div>
          ))}
        </div>
      )}

      {commTab === 'Messages' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-2`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-2`}>Recent Messages</h3>
          {[
            { from: 'Transport Head', text: 'Please confirm all children boarded for Trip 2 before departure.', time: '07:50 AM' },
            { from: 'Rajesh Patel (Parent)', text: 'Aarav will be absent tomorrow. No pickup needed.', time: '09:15 AM' },
            { from: 'School Admin', text: 'Early dismissal on Friday at 12:30 PM. Adjust trip timings.', time: '10:00 AM' },
          ].map((m, i) => (
            <div key={i} className={`p-3 rounded-xl ${theme.accentBg}`}>
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-bold ${theme.highlight}`}>{m.from}</span>
                <span className={`text-[10px] ${theme.iconColor}`}>{m.time}</span>
              </div>
              <p className={`text-xs ${theme.iconColor}`}>{m.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── EXPORT ──────────────────────────────────────────
export default function Page() {
  return (
    <BlueprintLayout>
      <BusNannyDashboard />
    </BlueprintLayout>
  );
}
