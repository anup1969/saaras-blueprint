'use client';

import React, { useState } from 'react';
import { StatCard, TabBar, StatusBadge, SearchBar, DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  Search, Plus, Filter, Download, Eye, Edit, Wrench, AlertTriangle,
  IndianRupee, Calendar, X
} from 'lucide-react';

// ─── MOCK DATA ──────────────────────────────────────
const mockMaintenance = [
  { id: 'MNT-001', vehicle: 'GJ-01-AB-1234', type: 'Tyre Replacement (4x)', date: '2026-02-05', cost: '₹32,000', nextDue: '2027-02-05', vendor: 'Apollo Tyres, Narol', status: 'Completed' },
  { id: 'MNT-002', vehicle: 'GJ-01-EF-9012', type: 'AC Service', date: '2026-01-28', cost: '₹8,500', nextDue: '2026-07-28', vendor: 'CoolAir Services, SG Highway', status: 'Completed' },
  { id: 'MNT-003', vehicle: 'GJ-01-CD-5678', type: 'Brake Pad Replacement', date: '2026-01-20', cost: '₹12,000', nextDue: '2026-07-20', vendor: 'Maruti Service Center, Prahladnagar', status: 'Completed' },
  { id: 'MNT-004', vehicle: 'GJ-01-GH-3456', type: 'Oil Change + Filter', date: '2026-01-15', cost: '₹4,200', nextDue: '2026-04-15', vendor: 'Quick Lube, Maninagar', status: 'Completed' },
  { id: 'MNT-005', vehicle: 'GJ-01-KL-2345', type: 'Battery Replacement', date: '2026-01-10', cost: '₹9,800', nextDue: '2028-01-10', vendor: 'Exide Battery Point, Motera', status: 'Completed' },
  { id: 'MNT-006', vehicle: 'GJ-01-IJ-7890', type: 'GPS Device Repair', date: '2026-01-05', cost: '₹3,800', nextDue: 'N/A', vendor: 'TechTrack Solutions, CG Road', status: 'Completed' },
];

const mockVehicles = [
  { id: 'GJ-01-AB-1234', type: 'Bus' }, { id: 'GJ-01-CD-5678', type: 'Bus' },
  { id: 'GJ-01-EF-9012', type: 'Mini Bus' }, { id: 'GJ-01-GH-3456', type: 'Van' },
  { id: 'GJ-01-IJ-7890', type: 'Van' }, { id: 'GJ-01-KL-2345', type: 'Bus' },
];

export default function MaintenanceModule({ theme, showLogMaintenance, setShowLogMaintenance }: { theme: Theme; showLogMaintenance: boolean; setShowLogMaintenance: (v: boolean) => void }) {
  const [tab, setTab] = useState('All Records');
  const defaultServiceTypes = ['Oil Change', 'Battery Replacement', 'Tyre Replacement', 'AC Service', 'Brake Pad', 'GPS Repair', 'PUC Renewal', 'Insurance Renewal', 'Engine Overhaul'];
  const [serviceTypes, setServiceTypes] = useState(defaultServiceTypes);
  const [showCustomType, setShowCustomType] = useState(false);
  const [customType, setCustomType] = useState('');
  const [selectedServiceType, setSelectedServiceType] = useState('');
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Vehicle Maintenance</h1>
        <button onClick={() => setShowLogMaintenance(true)} className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> Log Maintenance</button>
      </div>
      <TabBar tabs={['All Records', 'In Progress', 'Completed']} active={tab} onChange={setTab} theme={theme} />
      <div className="flex gap-3">
        <SearchBar placeholder="Search by vehicle, service type, vendor..." theme={theme} icon={Search} />
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Filter size={12} /> Filter</button>
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Download size={12} /> Export</button>
      </div>

      {/* Maintenance Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Wrench} label="Total Records" value={mockMaintenance.length} color="bg-blue-500" theme={theme} />
        <StatCard icon={IndianRupee} label="Total Spend" value="₹1.18L" color="bg-emerald-500" sub="this year" theme={theme} />
        <StatCard icon={AlertTriangle} label="In Progress" value={1} color="bg-amber-500" theme={theme} />
        <StatCard icon={Calendar} label="Next Service Due" value="Apr 8" color="bg-red-500" sub="GJ-01-OP-1122" theme={theme} />
      </div>

      <DataTable
        headers={['ID', 'Vehicle', 'Service Type', 'Date', 'Cost', 'Next Due', 'Vendor', 'Status', '']}
        rows={mockMaintenance
          .filter(m => tab === 'All Records' || (tab === 'In Progress' && m.status === 'In Progress') || (tab === 'Completed' && m.status === 'Completed'))
          .map(m => [
            <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{m.id}</span>,
            <span key="vehicle" className={`font-mono text-xs font-bold ${theme.highlight}`}>{m.vehicle}</span>,
            <span key="type" className={`font-bold ${theme.highlight}`}>{m.type}</span>,
            <span key="date" className={theme.iconColor}>{m.date}</span>,
            <span key="cost" className={`font-bold ${theme.highlight}`}>{m.cost}</span>,
            <span key="next" className={`text-xs ${m.nextDue === 'N/A' ? theme.iconColor : theme.primaryText}`}>{m.nextDue}</span>,
            <span key="vendor" className={`text-xs ${theme.iconColor}`}>{m.vendor}</span>,
            <StatusBadge key="status" status={m.status === 'In Progress' ? 'Pending' : 'Active'} theme={theme} />,
            <div key="actions" className="flex gap-1">
              <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
              <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Edit size={12} className={theme.iconColor} /></button>
            </div>
          ])}
        theme={theme}
      />

      {/* Upcoming Maintenance */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Upcoming Maintenance Due</h3>
        <div className="space-y-2">
          {[
            { vehicle: 'GJ-01-KL-2345', service: 'PUC Renewal', due: 'Mar 15, 2026', urgency: 'Urgent' },
            { vehicle: 'GJ-01-EF-9012', service: 'PUC Renewal', due: 'Apr 10, 2026', urgency: 'Normal' },
            { vehicle: 'GJ-01-GH-3456', service: 'Oil Change + Filter', due: 'Apr 15, 2026', urgency: 'Normal' },
            { vehicle: 'GJ-01-AB-1234', service: 'Insurance Renewal', due: 'Aug 15, 2026', urgency: 'Normal' },
          ].map((item, i) => (
            <div key={i} className={`flex items-center justify-between p-3 rounded-xl ${theme.accentBg} border ${theme.border}`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg ${item.urgency === 'Urgent' ? 'bg-red-100' : 'bg-blue-100'} flex items-center justify-center`}>
                  <Wrench size={14} className={item.urgency === 'Urgent' ? 'text-red-600' : 'text-blue-600'} />
                </div>
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>{item.vehicle} - {item.service}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Due: {item.due}</p>
                </div>
              </div>
              <StatusBadge status={item.urgency} theme={theme} />
            </div>
          ))}
        </div>
      </div>

      <div className={`flex items-center justify-between text-xs ${theme.iconColor} px-2`}>
        <span>Showing {mockMaintenance.filter(m => tab === 'All Records' || (tab === 'In Progress' && m.status === 'In Progress') || (tab === 'Completed' && m.status === 'Completed')).length} of {mockMaintenance.length} records</span>
        <div className="flex gap-1">
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Previous</button>
          <button className={`px-3 py-1.5 rounded-lg ${theme.primary} text-white`}>1</button>
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Next</button>
        </div>
      </div>

      {/* Log Maintenance Form */}
      {showLogMaintenance && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-bold ${theme.highlight}`}>Log Maintenance</h2>
              <button onClick={() => setShowLogMaintenance(false)} className={`p-2 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Vehicle *</label>
                <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}>
                  <option value="">Select vehicle...</option>
                  {mockVehicles.map(v => <option key={v.id} value={v.id}>{v.id} ({v.type})</option>)}
                </select>
              </div>
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Service Type *</label>
                <select value={selectedServiceType} onChange={e => { if (e.target.value === '__custom__') { setShowCustomType(true); setSelectedServiceType(''); } else { setSelectedServiceType(e.target.value); setShowCustomType(false); }}} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}>
                  <option value="">Select type...</option>
                  {serviceTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  <option value="__custom__">+ Add Custom</option>
                </select>
                {showCustomType && (
                  <div className="flex gap-2 mt-2">
                    <input value={customType} onChange={e => setCustomType(e.target.value)} placeholder="Enter custom type..." className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} />
                    <button onClick={() => { if (customType.trim()) { setServiceTypes([...serviceTypes, customType.trim()]); setSelectedServiceType(customType.trim()); setCustomType(''); setShowCustomType(false); }}} className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>Add</button>
                  </div>
                )}
              </div>
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Date *</label>
                <input type="date" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} />
              </div>
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Cost ({'\u20B9'}) *</label>
                <input type="number" placeholder="e.g. 12000" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} />
              </div>
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Next Due Date</label>
                <input type="date" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} />
              </div>
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Vendor Name</label>
                <input placeholder="e.g. Apollo Tyres, Narol" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} />
              </div>
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Serviceman / Contractor Name</label>
                <input placeholder="e.g. Rajesh Mechanic" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} />
              </div>
              <div className="col-span-2">
                <label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Notes</label>
                <textarea placeholder="Additional notes about the maintenance..." rows={3} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setShowLogMaintenance(false)} className={`px-4 py-2 rounded-xl border ${theme.border} text-xs font-bold ${theme.iconColor}`}>Cancel</button>
              <button onClick={() => { setShowLogMaintenance(false); window.alert('Maintenance logged! (Blueprint demo)'); }} className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>Log Maintenance</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
