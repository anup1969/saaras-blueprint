'use client';

import React, { useState } from 'react';
import { StatCard, TabBar, StatusBadge, SearchBar, DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  Bus, Car, Search, Plus, Filter, Download,
  Eye, Edit, Wrench, CheckCircle, Gauge, X
} from 'lucide-react';

// ─── MOCK DATA ──────────────────────────────────────
const mockVehicles = [
  { id: 'GJ-01-AB-1234', type: 'Bus', capacity: 40, driver: 'Ramesh Kumar', route: 'Route A', insurance: '2026-08-15', puc: '2026-05-20', fitness: '2027-01-10', km: '45,230', status: 'Active', year: 2022 },
  { id: 'GJ-01-CD-5678', type: 'Bus', capacity: 50, driver: 'Suresh Patel', route: 'Route B', insurance: '2026-11-02', puc: '2026-07-14', fitness: '2027-03-22', km: '38,120', status: 'Active', year: 2021 },
  { id: 'GJ-01-EF-9012', type: 'Mini Bus', capacity: 30, driver: 'Mahesh Singh', route: 'Route C', insurance: '2026-06-30', puc: '2026-04-10', fitness: '2026-12-05', km: '52,870', status: 'Active', year: 2023 },
  { id: 'GJ-01-GH-3456', type: 'Van', capacity: 26, driver: 'Jayesh Patel', route: 'Route D', insurance: '2026-09-18', puc: '2026-06-25', fitness: '2027-02-14', km: '31,450', status: 'Active', year: 2020 },
  { id: 'GJ-01-IJ-7890', type: 'Van', capacity: 26, driver: 'Dinesh Raval', route: 'Route E', insurance: '2026-10-05', puc: '2026-08-01', fitness: '2027-04-20', km: '28,670', status: 'Active', year: 2022 },
  { id: 'GJ-01-KL-2345', type: 'Bus', capacity: 52, driver: 'Prakash Bhatt', route: 'Route F', insurance: '2026-07-22', puc: '2026-03-15', fitness: '2026-11-30', km: '48,910', status: 'Active', year: 2019 },
];

const mockDrivers = [
  { id: 'DRV-001', name: 'Ramesh Kumar', experience: '12 yrs' },
  { id: 'DRV-002', name: 'Suresh Patel', experience: '8 yrs' },
  { id: 'DRV-003', name: 'Mahesh Singh', experience: '15 yrs' },
  { id: 'DRV-004', name: 'Jayesh Patel', experience: '6 yrs' },
  { id: 'DRV-005', name: 'Dinesh Raval', experience: '18 yrs' },
  { id: 'DRV-006', name: 'Prakash Bhatt', experience: '20 yrs' },
];

const mockRoutes = [
  { id: 'RT-001', name: 'Route A', area: 'Satellite - Jodhpur' },
  { id: 'RT-002', name: 'Route B', area: 'Prahlad Nagar - Thaltej' },
  { id: 'RT-003', name: 'Route C', area: 'SG Highway - Bodakdev' },
  { id: 'RT-004', name: 'Route D', area: 'Maninagar - Isanpur' },
  { id: 'RT-005', name: 'Route E', area: 'Navrangpura - Paldi' },
  { id: 'RT-006', name: 'Route F', area: 'Chandkheda - Motera' },
];

export default function VehiclesModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All Vehicles');
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Vehicle Fleet</h1>
        <button onClick={() => setShowAddVehicle(true)} className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> Add Vehicle</button>
      </div>
      <TabBar tabs={['All Vehicles', 'Bus', 'Mini Bus', 'Van', 'Under Maintenance']} active={tab} onChange={setTab} theme={theme} />
      <div className="flex gap-3">
        <SearchBar placeholder="Search by vehicle number, driver, route..." theme={theme} icon={Search} />
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Filter size={12} /> Filter</button>
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Download size={12} /> Export</button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Bus} label="Total Fleet" value={6} color="bg-blue-500" theme={theme} />
        <StatCard icon={CheckCircle} label="Active Vehicles" value={6} color="bg-emerald-500" theme={theme} />
        <StatCard icon={Wrench} label="Under Maintenance" value={0} color="bg-amber-500" theme={theme} />
        <StatCard icon={Gauge} label="Total KM Logged" value="2.45L" color="bg-indigo-500" sub="all vehicles" theme={theme} />
      </div>

      <DataTable
        headers={['Vehicle No.', 'Type', 'Capacity', 'Driver', 'Route', 'KM Run', 'Insurance', 'PUC', 'Fitness', 'Status', '']}
        rows={mockVehicles
          .filter(v => tab === 'All Vehicles' || (tab === 'Bus' && v.type === 'Bus') || (tab === 'Mini Bus' && v.type === 'Mini Bus') || (tab === 'Van' && v.type === 'Van') || (tab === 'Under Maintenance' && v.status === 'Maintenance'))
          .map(v => [
            <span key="id" className={`font-mono text-xs font-bold ${theme.highlight}`}>{v.id}</span>,
            <span key="type" className={`text-xs px-2 py-0.5 rounded-full font-bold ${v.type === 'Bus' ? 'bg-blue-100 text-blue-700' : v.type === 'Mini Bus' ? 'bg-teal-100 text-teal-700' : 'bg-purple-100 text-purple-700'}`}>{v.type}</span>,
            <span key="cap" className={theme.iconColor}>{v.capacity} seats</span>,
            <span key="driver" className={theme.iconColor}>{v.driver}</span>,
            <span key="route" className={`font-bold ${theme.primaryText}`}>{v.route}</span>,
            <span key="km" className={theme.iconColor}>{v.km}</span>,
            <span key="ins" className={`text-xs ${theme.iconColor}`}>{v.insurance}</span>,
            <span key="puc" className={`text-xs ${theme.iconColor}`}>{v.puc}</span>,
            <span key="fit" className={`text-xs ${theme.iconColor}`}>{v.fitness}</span>,
            <StatusBadge key="status" status={v.status} theme={theme} />,
            <div key="actions" className="flex gap-1">
              <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
              <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Edit size={12} className={theme.iconColor} /></button>
            </div>
          ])}
        theme={theme}
      />
      <div className={`flex items-center justify-between text-xs ${theme.iconColor} px-2`}>
        <span>Showing {mockVehicles.filter(v => tab === 'All Vehicles' || (tab === 'Bus' && v.type === 'Bus') || (tab === 'Mini Bus' && v.type === 'Mini Bus') || (tab === 'Van' && v.type === 'Van') || (tab === 'Under Maintenance' && v.status === 'Maintenance')).length} of {mockVehicles.length} vehicles</span>
        <div className="flex gap-1">
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Previous</button>
          <button className={`px-3 py-1.5 rounded-lg ${theme.primary} text-white`}>1</button>
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Next</button>
        </div>
      </div>

      {/* Add Vehicle Form */}
      {showAddVehicle && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-bold ${theme.highlight}`}>Add New Vehicle</h2>
              <button onClick={() => setShowAddVehicle(false)} className={`p-2 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Vehicle Number *</label><input placeholder="e.g. GJ-01-MN-6789" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Vehicle Type *</label>
                <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}><option value="">Select type...</option><option>Bus</option><option>Mini Bus</option><option>Van</option><option>Tempo Traveller</option></select>
              </div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Seating Capacity *</label><input type="number" placeholder="e.g. 40" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Manufacturing Year</label><input type="number" placeholder="e.g. 2023" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Assign Driver</label>
                <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}><option value="">Select driver...</option>{mockDrivers.map(d => <option key={d.id} value={d.name}>{d.name} ({d.experience})</option>)}</select>
              </div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Assign to Route</label>
                <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}><option value="">Select route...</option>{mockRoutes.map(r => <option key={r.id} value={r.name}>{r.name} — {r.area}</option>)}</select>
              </div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Insurance Expiry</label><input type="date" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>PUC Expiry</label><input type="date" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Fitness Certificate Expiry</label><input type="date" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Current KM Reading</label><input type="number" placeholder="e.g. 25000" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Fuel Type</label>
                <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}><option value="">Select...</option><option>Diesel</option><option>Petrol</option><option>CNG</option><option>Electric</option></select>
              </div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Owner</label>
                <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}><option value="">Select...</option><option>School Owned</option><option>Rented</option><option>Contractor</option></select>
              </div>
              <div className="col-span-2">
                <label className={`text-xs font-bold ${theme.iconColor} mb-2 block`}>GPS System</label>
                <div className={`p-3 rounded-xl ${theme.accentBg} border ${theme.border} grid grid-cols-2 gap-3`}>
                  <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>GPS Installed?</label>
                    <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}><option>Yes</option><option>No</option><option>Planned</option></select>
                  </div>
                  <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>GPS Device ID</label><input placeholder="e.g. GPS-2026-001" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
                  <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>GPS Provider</label><input placeholder="e.g. TechTrack Solutions" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
                  <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>GPS SIM Number</label><input placeholder="e.g. 98250 00001" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
                </div>
              </div>
              <div className="col-span-2"><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Notes</label><textarea placeholder="Any additional notes about the vehicle..." rows={2} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setShowAddVehicle(false)} className={`px-4 py-2 rounded-xl border ${theme.border} text-xs font-bold ${theme.iconColor}`}>Cancel</button>
              <button onClick={() => { setShowAddVehicle(false); window.alert('Vehicle added! (Blueprint demo)'); }} className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>Add Vehicle</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
