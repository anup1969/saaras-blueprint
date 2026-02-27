'use client';

import React, { useState } from 'react';
import { StatCard, DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  Route, MapPin, Search, Plus, Filter, Download, Eye, Phone, Clock,
  IndianRupee, MapPinned, GraduationCap, X
} from 'lucide-react';

// ─── MOCK DATA ──────────────────────────────────────
const mockRoutes = [
  { id: 'RT-001', name: 'Route A', area: 'Satellite - Jodhpur' },
  { id: 'RT-002', name: 'Route B', area: 'Prahlad Nagar - Thaltej' },
  { id: 'RT-003', name: 'Route C', area: 'SG Highway - Bodakdev' },
  { id: 'RT-004', name: 'Route D', area: 'Maninagar - Isanpur' },
  { id: 'RT-005', name: 'Route E', area: 'Navrangpura - Paldi' },
  { id: 'RT-006', name: 'Route F', area: 'Chandkheda - Motera' },
];

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

const mockStudentsByRoute = [
  { route: 'Route A', students: [
    { id: 'STU-101', name: 'Arjun Mehta', class: '8-A', stop: 'Jodhpur Cross Roads', pickup: '6:50 AM', dropStop: 'Jodhpur Cross Roads', dropTime: '3:40 PM', phone: '98250 11111' },
    { id: 'STU-102', name: 'Priya Sharma', class: '6-B', stop: 'Satellite Circle', pickup: '6:55 AM', dropStop: 'Jodhpur Cross Roads', dropTime: '3:45 PM', phone: '98250 11112' },
    { id: 'STU-103', name: 'Rohan Desai', class: '9-A', stop: 'Shyamal Cross Roads', pickup: '7:00 AM', dropStop: 'Shyamal Cross Roads', dropTime: '3:50 PM', phone: '98250 11113' },
    { id: 'STU-104', name: 'Ananya Patel', class: '5-C', stop: 'Prernatirth Derasar', pickup: '7:05 AM', dropStop: 'Satellite Circle', dropTime: '3:55 PM', phone: '98250 11114' },
    { id: 'STU-105', name: 'Vivaan Shah', class: '7-A', stop: 'Judges Bungalow', pickup: '7:10 AM', dropStop: 'Judges Bungalow', dropTime: '4:00 PM', phone: '98250 11115' },
  ]},
  { route: 'Route B', students: [
    { id: 'STU-201', name: 'Ishaan Joshi', class: '10-A', stop: 'Prahlad Nagar Garden', pickup: '6:55 AM', dropStop: 'Prahlad Nagar Garden', dropTime: '3:55 PM', phone: '98250 22221' },
    { id: 'STU-202', name: 'Kavya Trivedi', class: '4-B', stop: 'Thaltej Cross Roads', pickup: '7:00 AM', dropStop: 'Prahlad Nagar Garden', dropTime: '4:00 PM', phone: '98250 22222' },
    { id: 'STU-203', name: 'Aditya Pandya', class: '8-C', stop: 'Sola Bridge', pickup: '7:05 AM', dropStop: 'Sola Bridge', dropTime: '4:05 PM', phone: '98250 22223' },
    { id: 'STU-204', name: 'Nisha Raval', class: '6-A', stop: 'Sandesh Press Road', pickup: '7:10 AM', dropStop: 'Sandesh Press Road', dropTime: '4:10 PM', phone: '98250 22224' },
  ]},
  { route: 'Route C', students: [
    { id: 'STU-301', name: 'Dev Chauhan', class: '9-B', stop: 'Bodakdev Circle', pickup: '6:35 AM', dropStop: 'Bodakdev Circle', dropTime: '3:25 PM', phone: '98250 33331' },
    { id: 'STU-302', name: 'Riya Bhatt', class: '7-C', stop: 'Pakwan Cross Roads', pickup: '6:42 AM', dropStop: 'Bodakdev Circle', dropTime: '3:32 PM', phone: '98250 33332' },
    { id: 'STU-303', name: 'Aarav Nair', class: '5-A', stop: 'Rajpath Club', pickup: '6:48 AM', dropStop: 'Rajpath Club', dropTime: '3:38 PM', phone: '98250 33333' },
    { id: 'STU-304', name: 'Meera Iyer', class: '10-B', stop: 'Sola Overbridge', pickup: '6:55 AM', dropStop: 'Sola Overbridge', dropTime: '3:45 PM', phone: '98250 33334' },
  ]},
  { route: 'Route D', students: [
    { id: 'STU-401', name: 'Harsh Panchal', class: '6-A', stop: 'Isanpur Circle', pickup: '6:45 AM', dropStop: 'Isanpur Circle', dropTime: '3:50 PM', phone: '98250 44441' },
    { id: 'STU-402', name: 'Pooja Thakor', class: '9-C', stop: 'Maninagar Station', pickup: '6:52 AM', dropStop: 'Isanpur Circle', dropTime: '3:57 PM', phone: '98250 44442' },
    { id: 'STU-403', name: 'Yash Solanki', class: '4-A', stop: 'Kagdapith', pickup: '7:00 AM', dropStop: 'Kagdapith', dropTime: '4:05 PM', phone: '98250 44443' },
  ]},
  { route: 'Route E', students: [
    { id: 'STU-501', name: 'Tanvi Vyas', class: '7-B', stop: 'Paldi', pickup: '7:05 AM', dropStop: 'Paldi', dropTime: '3:40 PM', phone: '98250 55551' },
    { id: 'STU-502', name: 'Dhruv Parikh', class: '10-A', stop: 'Navrangpura BRTS', pickup: '7:12 AM', dropStop: 'Paldi', dropTime: '3:47 PM', phone: '98250 55552' },
    { id: 'STU-503', name: 'Shreya Dave', class: '5-B', stop: 'CG Road', pickup: '7:18 AM', dropStop: 'CG Road', dropTime: '3:53 PM', phone: '98250 55553' },
  ]},
  { route: 'Route F', students: [
    { id: 'STU-601', name: 'Mihir Acharya', class: '8-B', stop: 'Motera Stadium', pickup: '6:40 AM', dropStop: 'Motera Stadium', dropTime: '3:45 PM', phone: '98250 66661' },
    { id: 'STU-602', name: 'Aishwarya Gajjar', class: '6-C', stop: 'Chandkheda BRTS', pickup: '6:48 AM', dropStop: 'Motera Stadium', dropTime: '3:53 PM', phone: '98250 66662' },
    { id: 'STU-603', name: 'Parth Rana', class: '9-A', stop: 'Sabarmati', pickup: '6:55 AM', dropStop: 'Sabarmati', dropTime: '4:00 PM', phone: '98250 66663' },
    { id: 'STU-604', name: 'Diya Kothari', class: '3-A', stop: 'Kali Circle', pickup: '7:02 AM', dropStop: 'Kali Circle', dropTime: '4:07 PM', phone: '98250 66664' },
  ]},
];

export default function TransportStudentsModule({ theme }: { theme: Theme }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoute, setSelectedRoute] = useState('All');
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<null | (typeof allStudents)[number]>(null);
  const [addPickupRoute, setAddPickupRoute] = useState('');
  const [addDropRoute, setAddDropRoute] = useState('');
  const allStudents = mockStudentsByRoute.flatMap(r => r.students.map(s => {
    const stop = mockStops.find(st => st.name === s.stop);
    return { ...s, route: r.route, fee: stop?.fee || 0, stopId: stop?.id || '', stopName: stop?.name || s.stop };
  }));
  const filtered = allStudents.filter(s => {
    const matchesRoute = selectedRoute === 'All' || s.route === selectedRoute;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || s.name.toLowerCase().includes(q) || s.class.toLowerCase().includes(q) || s.stop.toLowerCase().includes(q) || s.id.toLowerCase().includes(q);
    return matchesRoute && matchesSearch;
  });

  const pickupStopsForRoute = (routeName: string) => mockStops.filter(s => s.routes.includes(routeName));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Transport Students</h1>
        <button onClick={() => setShowAddStudent(true)} className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> Add Student</button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={GraduationCap} label="Total Enrolled" value={allStudents.length} color="bg-indigo-500" theme={theme} />
        <StatCard icon={Route} label="Across Routes" value={mockStudentsByRoute.length} color="bg-emerald-500" theme={theme} />
        <StatCard icon={IndianRupee} label="Total Monthly Fee" value={`\u20B9${(allStudents.reduce((s, st) => s + st.fee, 0) / 1000).toFixed(1)}K`} color="bg-amber-500" theme={theme} />
        <StatCard icon={MapPinned} label="Stops Covered" value={new Set(allStudents.map(s => s.stop)).size} color="bg-purple-500" theme={theme} />
      </div>

      <div className={`flex gap-1 p-1 ${theme.secondaryBg} rounded-xl overflow-x-auto`}>
        {['All', ...mockStudentsByRoute.map(r => r.route)].map(r => (
          <button key={r} onClick={() => setSelectedRoute(r)}
            className={`px-4 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-all ${
              selectedRoute === r ? `${theme.cardBg} ${theme.highlight} shadow-sm` : theme.iconColor
            }`}>{r} {r !== 'All' ? `(${mockStudentsByRoute.find(rt => rt.route === r)?.students.length || 0})` : `(${allStudents.length})`}</button>
        ))}
      </div>

      <div className="flex gap-3">
        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} flex-1`}><Search size={12} className={theme.iconColor} /><input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search by name, class, stop, ID..." className={`bg-transparent text-xs ${theme.highlight} outline-none flex-1`} /></div>
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Filter size={12} /> Filter</button>
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Download size={12} /> Export</button>
      </div>

      <DataTable
        headers={['Student ID', 'Name', 'Class', 'Route', 'Pickup Stop', 'Pickup Time', 'Drop Stop', 'Fee/mo', 'Parent Phone', '']}
        rows={filtered.map(s => [
          <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{s.id}</span>,
          <button key="name" onClick={() => setSelectedStudent(s)} className={`font-bold ${theme.primaryText} hover:underline text-left`}>{s.name}</button>,
          <span key="class" className={theme.iconColor}>{s.class}</span>,
          <span key="route" className={`text-xs font-bold ${theme.primaryText}`}>{s.route}</span>,
          <div key="stop" className="flex items-center gap-1"><MapPin size={10} className={theme.iconColor} /><span className={theme.iconColor}>{s.stop}</span></div>,
          <span key="time" className={`font-bold ${theme.primaryText}`}>{s.pickup}</span>,
          <div key="drop" className="flex items-center gap-1"><MapPin size={10} className={theme.iconColor} /><span className={theme.iconColor}>{s.dropStop}{s.dropStop !== s.stop && <span className="text-amber-600 text-[9px] ml-1">(diff)</span>}</span></div>,
          <span key="fee" className={`font-bold ${theme.highlight}`}>{s.fee > 0 ? <span>{'\u20B9'}{s.fee.toLocaleString()}/mo <span className={`text-[9px] ${theme.iconColor} font-normal`}>(from stop config)</span></span> : <span className={`text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-700`}>Not set</span>}</span>,
          <span key="phone" className={theme.iconColor}>{s.phone}</span>,
          <div key="actions" className="flex gap-1">
            <button onClick={() => setSelectedStudent(s)} className={`p-1.5 rounded-lg ${theme.secondaryBg}`} title="View details"><Eye size={12} className={theme.iconColor} /></button>
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`} title="Call parent"><Phone size={12} className={theme.iconColor} /></button>
          </div>
        ])}
        theme={theme}
      />

      {/* Fee Summary Card */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Route-wise Fee Summary</h3>
        <p className={`text-[10px] ${theme.iconColor} mb-3`}>Fees are assigned per stop (configured in SSA). Transport Head can override for special cases.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {mockStudentsByRoute.map(r => {
            const routeStudents = r.students.map(s => ({ ...s, fee: mockStops.find(st => st.name === s.stop)?.fee || 0 }));
            const totalFee = routeStudents.reduce((sum, s) => sum + s.fee, 0);
            return (
              <div key={r.route} className={`p-3 rounded-xl ${theme.accentBg} border ${theme.border}`}>
                <p className={`text-xs font-bold ${theme.highlight}`}>{r.route}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{r.students.length} students</p>
                <p className={`text-sm font-bold ${theme.primaryText} mt-1`}>{'\u20B9'}{totalFee.toLocaleString()}/mo</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className={`flex items-center justify-between text-xs ${theme.iconColor} px-2`}>
        <span>Showing {filtered.length} of {allStudents.length} students</span>
        <div className="flex gap-1">
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Previous</button>
          <button className={`px-3 py-1.5 rounded-lg ${theme.primary} text-white`}>1</button>
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Next</button>
        </div>
      </div>

      {/* Student Detail View */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-bold ${theme.highlight}`}>Student Details</h2>
              <button onClick={() => setSelectedStudent(null)} className={`p-2 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
            </div>
            {/* Student Info */}
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-16 h-16 rounded-full ${theme.accentBg} flex items-center justify-center`}><GraduationCap size={24} className={theme.iconColor} /></div>
              <div>
                <p className={`text-lg font-bold ${theme.highlight}`}>{selectedStudent.name}</p>
                <p className={`text-xs ${theme.iconColor}`}>{selectedStudent.id} &bull; Class {selectedStudent.class}</p>
              </div>
            </div>
            {/* Transport Details */}
            <div className={`p-4 rounded-xl ${theme.accentBg} border ${theme.border} mb-4`}>
              <h3 className={`text-xs font-bold ${theme.highlight} mb-3`}>Transport Details</h3>
              <div className="grid grid-cols-2 gap-3">
                <div><p className={`text-[10px] ${theme.iconColor}`}>Pickup Route</p><p className={`text-xs font-bold ${theme.highlight}`}>{selectedStudent.route}</p></div>
                <div><p className={`text-[10px] ${theme.iconColor}`}>Pickup Stop</p><p className={`text-xs font-bold ${theme.highlight}`}>{selectedStudent.stop}</p></div>
                <div><p className={`text-[10px] ${theme.iconColor}`}>Pickup Time</p><p className={`text-xs font-bold ${theme.highlight}`}>{selectedStudent.pickup}</p></div>
                <div><p className={`text-[10px] ${theme.iconColor}`}>Drop Route</p><p className={`text-xs font-bold ${theme.highlight}`}>{selectedStudent.route}{selectedStudent.dropStop !== selectedStudent.stop ? ' (same route)' : ''}</p></div>
                <div><p className={`text-[10px] ${theme.iconColor}`}>Drop Stop</p><p className={`text-xs font-bold ${theme.highlight}`}>{selectedStudent.dropStop}{selectedStudent.dropStop !== selectedStudent.stop && <span className="text-amber-600 text-[10px] ml-1">(different from pickup)</span>}</p></div>
                <div><p className={`text-[10px] ${theme.iconColor}`}>Drop Time</p><p className={`text-xs font-bold ${theme.highlight}`}>{selectedStudent.dropTime}</p></div>
                <div><p className={`text-[10px] ${theme.iconColor}`}>Monthly Fee</p><p className={`text-xs font-bold ${theme.primaryText}`}>{'\u20B9'}{selectedStudent.fee.toLocaleString()}/mo</p><p className={`text-[9px] ${theme.iconColor}`}>Source: {selectedStudent.stopName} stop fee {selectedStudent.fee > 0 && '(can override)'}</p></div>
              </div>
            </div>
            {/* Parent Contact */}
            <div className={`p-4 rounded-xl ${theme.accentBg} border ${theme.border} mb-4`}>
              <h3 className={`text-xs font-bold ${theme.highlight} mb-2`}>Parent Contact</h3>
              <div className="flex items-center gap-2"><Phone size={12} className={theme.iconColor} /><span className={`text-xs ${theme.highlight}`}>{selectedStudent.phone}</span></div>
            </div>
            {/* History */}
            <div className={`p-4 rounded-xl ${theme.accentBg} border ${theme.border}`}>
              <h3 className={`text-xs font-bold ${theme.highlight} mb-2`}>History</h3>
              <div className="space-y-2">
                {[
                  { date: 'Jan 15, 2026', event: 'Enrolled in transport — ' + selectedStudent.route },
                  { date: 'Feb 1, 2026', event: 'Fee payment received — ' + '\u20B9' + (selectedStudent.fee || 0).toLocaleString() },
                  { date: 'Feb 10, 2026', event: 'Route change request (if applicable)' },
                ].map((h, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className={`text-[10px] ${theme.iconColor} w-24 shrink-0`}>{h.date}</span>
                    <span className={`text-xs ${theme.highlight}`}>{h.event}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Form */}
      {showAddStudent && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-bold ${theme.highlight}`}>Add Student</h2>
              <button onClick={() => setShowAddStudent(false)} className={`p-2 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
            </div>
            <p className={`text-[10px] ${theme.iconColor} mb-4 p-2 rounded-lg bg-blue-50 border border-blue-200`}>Note: Students added from Admin / Front Office will appear here automatically.</p>
            <div className="grid grid-cols-2 gap-4">
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Student Name *</label><input placeholder="e.g. Aarav Patel" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Student ID *</label><input placeholder="e.g. STU-701" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Class *</label><input placeholder="e.g. 5-A" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Parent Phone *</label><input placeholder="e.g. 98250 12345" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Pickup Route *</label>
                <select value={addPickupRoute} onChange={e => { setAddPickupRoute(e.target.value); if (!addDropRoute) setAddDropRoute(e.target.value); }} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}>
                  <option value="">Select route...</option>{mockRoutes.map(r => <option key={r.id} value={r.name}>{r.name} — {r.area}</option>)}</select>
              </div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Pickup Stop *</label>
                <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}>
                  <option value="">Select stop...</option>{addPickupRoute && pickupStopsForRoute(addPickupRoute).map(s => <option key={s.id} value={s.name}>{s.name} ({'\u20B9'}{s.fee}/mo)</option>)}</select>
              </div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Pickup Time</label><input type="time" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Drop Route</label>
                <select value={addDropRoute} onChange={e => setAddDropRoute(e.target.value)} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}>
                  <option value="">Same as pickup</option>{mockRoutes.map(r => <option key={r.id} value={r.name}>{r.name} — {r.area}</option>)}</select>
              </div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Drop Stop</label>
                <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}>
                  <option value="">Select stop...</option>{(addDropRoute || addPickupRoute) && pickupStopsForRoute(addDropRoute || addPickupRoute).map(s => <option key={s.id} value={s.name}>{s.name}</option>)}</select>
              </div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Monthly Fee ({'\u20B9'})</label>
                <input type="number" placeholder="Auto-filled from stop" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} />
                <p className={`text-[9px] ${theme.iconColor} mt-1`}>Auto-filled from stop config. Edit for special cases.</p>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setShowAddStudent(false)} className={`px-4 py-2 rounded-xl border ${theme.border} text-xs font-bold ${theme.iconColor}`}>Cancel</button>
              <button onClick={() => { setShowAddStudent(false); window.alert('Student added! (Blueprint demo)'); }} className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>Add Student</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
