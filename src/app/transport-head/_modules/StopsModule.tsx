'use client';

import React, { useState } from 'react';
import { StatCard, SearchBar, DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  Route, Users, MapPin, Search, Plus, Filter, Edit, Trash2, MapPinned, X
} from 'lucide-react';

// ─── MOCK DATA ──────────────────────────────────────
const mockStops = [
  { id: 'STP-001', name: 'Jodhpur Cross Roads', area: 'Satellite', routes: ['Route A'], landmark: 'Near BRTS Stop', students: 8, fee: 2500 },
  { id: 'STP-002', name: 'Satellite Circle', area: 'Satellite', routes: ['Route A'], landmark: 'Opposite Rajpath Club', students: 6, fee: 2200 },
  { id: 'STP-003', name: 'Prahlad Nagar Garden', area: 'Prahlad Nagar', routes: ['Route B'], landmark: 'Garden main gate', students: 7, fee: 2800 },
  { id: 'STP-004', name: 'Thaltej Cross Roads', area: 'Thaltej', routes: ['Route B'], landmark: 'Near D-Mart', students: 5, fee: 3000 },
  { id: 'STP-005', name: 'Bodakdev Circle', area: 'Bodakdev', routes: ['Route C'], landmark: 'Circle main road', students: 6, fee: 2000 },
  { id: 'STP-006', name: 'Isanpur Circle', area: 'Isanpur', routes: ['Route D'], landmark: 'Near petrol pump', students: 8, fee: 3200 },
  { id: 'STP-007', name: 'Paldi Cross Roads', area: 'Paldi', routes: ['Route E'], landmark: 'Paldi bus stop', students: 5, fee: 1800 },
  { id: 'STP-008', name: 'Motera Stadium', area: 'Motera', routes: ['Route F'], landmark: 'Gate 3 entrance', students: 9, fee: 3500 },
  { id: 'STP-009', name: 'Chandkheda BRTS', area: 'Chandkheda', routes: ['Route F'], landmark: 'BRTS platform', students: 7, fee: 3000 },
  { id: 'STP-010', name: 'Navrangpura BRTS', area: 'Navrangpura', routes: ['Route E'], landmark: 'Main BRTS stop', students: 4, fee: 1500 },
];

const mockRoutes = [
  { id: 'RT-001', name: 'Route A', area: 'Satellite - Jodhpur' },
  { id: 'RT-002', name: 'Route B', area: 'Prahlad Nagar - Thaltej' },
  { id: 'RT-003', name: 'Route C', area: 'SG Highway - Bodakdev' },
  { id: 'RT-004', name: 'Route D', area: 'Maninagar - Isanpur' },
  { id: 'RT-005', name: 'Route E', area: 'Navrangpura - Paldi' },
  { id: 'RT-006', name: 'Route F', area: 'Chandkheda - Motera' },
];

export default function StopsModule({ theme }: { theme: Theme }) {
  const [showAddStop, setShowAddStop] = useState(false);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Stop Management</h1>
        <button onClick={() => setShowAddStop(true)} className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> Add Stop</button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={MapPinned} label="Total Stops" value={mockStops.length} color="bg-blue-500" theme={theme} />
        <StatCard icon={Route} label="Routes Covered" value={6} color="bg-emerald-500" theme={theme} />
        <StatCard icon={Users} label="Total Students" value={mockStops.reduce((s, st) => s + st.students, 0)} color="bg-indigo-500" theme={theme} />
        <StatCard icon={MapPin} label="Areas" value={new Set(mockStops.map(s => s.area)).size} color="bg-purple-500" theme={theme} />
      </div>
      <div className="flex gap-3">
        <SearchBar placeholder="Search by stop name, area, landmark..." theme={theme} icon={Search} />
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Filter size={12} /> Filter</button>
      </div>
      <DataTable
        headers={['Stop ID', 'Stop Name', 'Area', 'Landmark', 'Routes', 'Students', 'Fee/mo', '']}
        rows={mockStops.map(s => [
          <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{s.id}</span>,
          <span key="name" className={`font-bold ${theme.highlight}`}>{s.name}</span>,
          <span key="area" className={theme.iconColor}>{s.area}</span>,
          <span key="landmark" className={`text-xs ${theme.iconColor}`}>{s.landmark}</span>,
          <span key="routes" className={`text-xs font-bold ${theme.primaryText}`}>{s.routes.join(', ')}</span>,
          <span key="students" className={`font-bold ${theme.highlight}`}>{s.students}</span>,
          <span key="fee" className={`font-bold ${theme.primaryText}`}>{'\u20B9'}{s.fee.toLocaleString()}</span>,
          <div key="actions" className="flex gap-1">
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Edit size={12} className={theme.iconColor} /></button>
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Trash2 size={12} className={theme.iconColor} /></button>
          </div>
        ])}
        theme={theme}
      />
      {showAddStop && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 w-full max-w-md`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-bold ${theme.highlight}`}>Add New Stop</h2>
              <button onClick={() => setShowAddStop(false)} className={`p-2 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
            </div>
            <div className="space-y-3">
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Stop Name</label><input placeholder="e.g. Vastrapur Lake" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Area</label><input placeholder="e.g. Vastrapur" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Landmark</label><input placeholder="e.g. Near lake entrance" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Assign to Route</label>
                <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}>
                  <option value="">Select route...</option>
                  {mockRoutes.map(r => <option key={r.id} value={r.name}>{r.name} — {r.area}</option>)}
                </select>
              </div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Monthly Transport Fee ({'\u20B9'})</label><input type="number" placeholder="e.g. 2500" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowAddStop(false)} className={`px-4 py-2 rounded-xl border ${theme.border} text-xs font-bold ${theme.iconColor}`}>Cancel</button>
              <button onClick={() => { setShowAddStop(false); window.alert('Stop added! (Blueprint demo)'); }} className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>Add Stop</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
