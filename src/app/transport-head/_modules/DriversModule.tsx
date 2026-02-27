'use client';

import React, { useState } from 'react';
import { TabBar, StatusBadge, SearchBar, DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  Search, Plus, Filter, Download, Eye, Edit, Phone, Trash2, Upload, X
} from 'lucide-react';

// ─── MOCK DATA ──────────────────────────────────────
const mockDrivers = [
  { id: 'DRV-001', name: 'Ramesh Kumar', license: 'GJ01-20180045623', phone: '98250 12345', vehicle: 'GJ-01-AB-1234', experience: '12 yrs', documents: 'Complete', bloodGroup: 'B+' },
  { id: 'DRV-002', name: 'Suresh Patel', license: 'GJ01-20190078412', phone: '98250 23456', vehicle: 'GJ-01-CD-5678', experience: '8 yrs', documents: 'Complete', bloodGroup: 'O+' },
  { id: 'DRV-003', name: 'Mahesh Singh', license: 'GJ01-20170032189', phone: '98250 34567', vehicle: 'GJ-01-EF-9012', experience: '15 yrs', documents: 'Complete', bloodGroup: 'A+' },
  { id: 'DRV-004', name: 'Jayesh Patel', license: 'GJ01-20200091245', phone: '98250 45678', vehicle: 'GJ-01-GH-3456', experience: '6 yrs', documents: 'Complete', bloodGroup: 'AB+' },
  { id: 'DRV-005', name: 'Dinesh Raval', license: 'GJ01-20160054378', phone: '98250 56789', vehicle: 'GJ-01-IJ-7890', experience: '18 yrs', documents: 'Complete', bloodGroup: 'O-' },
  { id: 'DRV-006', name: 'Prakash Bhatt', license: 'GJ01-20150089034', phone: '98250 67890', vehicle: 'GJ-01-KL-2345', experience: '20 yrs', documents: 'Complete', bloodGroup: 'A-' },
];

const mockRoutes = [
  { id: 'RT-001', name: 'Route A' }, { id: 'RT-002', name: 'Route B' }, { id: 'RT-003', name: 'Route C' },
  { id: 'RT-004', name: 'Route D' }, { id: 'RT-005', name: 'Route E' }, { id: 'RT-006', name: 'Route F' },
];

export default function DriversModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All Drivers');
  const [showAddDriver, setShowAddDriver] = useState(false);
  const [customFields, setCustomFields] = useState<{label: string; value: string}[]>([]);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Driver Management</h1>
        <button onClick={() => setShowAddDriver(true)} className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> Add Driver</button>
      </div>
      <TabBar tabs={['All Drivers', 'Documents Complete', 'Documents Pending']} active={tab} onChange={setTab} theme={theme} />
      <div className="flex gap-3">
        <SearchBar placeholder="Search by driver name, license, vehicle..." theme={theme} icon={Search} />
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Filter size={12} /> Filter</button>
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Download size={12} /> Export</button>
      </div>

      <DataTable
        headers={['ID', 'Name', 'License No.', 'Phone', 'Blood Group', 'Vehicle', 'Experience', 'Documents', '']}
        rows={mockDrivers
          .filter(d => tab === 'All Drivers' || (tab === 'Documents Complete' && d.documents === 'Complete') || (tab === 'Documents Pending' && d.documents === 'Pending'))
          .map(d => [
            <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{d.id}</span>,
            <span key="name" className={`font-bold ${theme.highlight}`}>{d.name}</span>,
            <span key="license" className={`font-mono text-xs ${theme.iconColor}`}>{d.license}</span>,
            <span key="phone" className={theme.iconColor}>{d.phone}</span>,
            <span key="blood" className={`text-xs px-2 py-0.5 rounded-full font-bold bg-red-100 text-red-700`}>{d.bloodGroup}</span>,
            <span key="vehicle" className={`font-mono text-xs ${theme.iconColor}`}>{d.vehicle}</span>,
            <span key="exp" className={theme.iconColor}>{d.experience}</span>,
            <StatusBadge key="docs" status={d.documents === 'Complete' ? 'Active' : 'Pending'} theme={theme} />,
            <div key="actions" className="flex gap-1">
              <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
              <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Edit size={12} className={theme.iconColor} /></button>
              <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Phone size={12} className={theme.iconColor} /></button>
            </div>
          ])}
        theme={theme}
      />

      <div className={`flex items-center justify-between text-xs ${theme.iconColor} px-2`}>
        <span>Showing {mockDrivers.filter(d => tab === 'All Drivers' || (tab === 'Documents Complete' && d.documents === 'Complete') || (tab === 'Documents Pending' && d.documents === 'Pending')).length} of {mockDrivers.length} drivers</span>
        <div className="flex gap-1">
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Previous</button>
          <button className={`px-3 py-1.5 rounded-lg ${theme.primary} text-white`}>1</button>
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Next</button>
        </div>
      </div>

      {/* Comprehensive Add Driver Form */}
      {showAddDriver && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-bold ${theme.highlight}`}>Add New Driver</h2>
              <button onClick={() => setShowAddDriver(false)} className={`p-2 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Photo</label>
                <div className={`flex items-center gap-3 p-3 rounded-xl border ${theme.border} ${theme.secondaryBg}`}>
                  <div className={`w-12 h-12 rounded-full ${theme.accentBg} flex items-center justify-center`}><Upload size={16} className={theme.iconColor} /></div>
                  <div><p className={`text-xs ${theme.highlight}`}>Upload photo</p><p className={`text-[10px] ${theme.iconColor}`}>JPG, PNG (max 2MB)</p></div>
                </div>
              </div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Full Name *</label><input placeholder="e.g. Ramesh Kumar" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Phone Number *</label><input placeholder="e.g. 98250 12345" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Secondary Phone</label><input placeholder="e.g. 98250 12346" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Age</label><input type="number" placeholder="e.g. 35" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Gender</label>
                <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}><option value="">Select...</option><option>Male</option><option>Female</option><option>Other</option></select>
              </div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Blood Group</label>
                <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}><option value="">Select...</option>{['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(b => <option key={b}>{b}</option>)}</select>
              </div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Assign to Route</label>
                <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}><option value="">Select route...</option>{mockRoutes.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}</select>
              </div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Experience</label><input placeholder="e.g. 8 yrs" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Salary ({'\u20B9'})</label><input type="number" placeholder="e.g. 18000" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Aadhar Number</label><input placeholder="XXXX XXXX XXXX" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Badge Number</label><input placeholder="e.g. BDG-001" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>License Number *</label><input placeholder="e.g. GJ01-20180045623" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>License Expiry Date</label><input type="date" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Joining Date</label><input type="date" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div className="col-span-2"><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Address</label><textarea placeholder="Full address..." rows={2} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Emergency Contact Name</label><input placeholder="e.g. Sita Devi" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Emergency Contact Phone</label><input placeholder="e.g. 98250 99999" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div className="col-span-2">
                <label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Documents</label>
                <div className={`p-3 rounded-xl ${theme.accentBg} border ${theme.border} space-y-1`}>
                  <p className={`text-[10px] ${theme.iconColor}`}>ID Proof: <span className="text-amber-600 font-bold">Not uploaded</span></p>
                  <p className={`text-[10px] ${theme.iconColor}`}>License Copy: <span className="text-amber-600 font-bold">Not uploaded</span></p>
                </div>
              </div>
              {customFields.map((cf, i) => (
                <React.Fragment key={i}>
                  <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Field Label</label><input value={cf.label} onChange={e => { const n = [...customFields]; n[i].label = e.target.value; setCustomFields(n); }} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
                  <div className="flex gap-2"><div className="flex-1"><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Value</label><input value={cf.value} onChange={e => { const n = [...customFields]; n[i].value = e.target.value; setCustomFields(n); }} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
                    <button onClick={() => setCustomFields(customFields.filter((_, j) => j !== i))} className={`self-end p-2 rounded-lg ${theme.buttonHover}`}><Trash2 size={12} className="text-red-500" /></button>
                  </div>
                </React.Fragment>
              ))}
              <div className="col-span-2">
                <button onClick={() => setCustomFields([...customFields, { label: '', value: '' }])} className={`text-xs font-bold ${theme.primaryText} hover:underline flex items-center gap-1`}><Plus size={12} /> Add Custom Field</button>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setShowAddDriver(false)} className={`px-4 py-2 rounded-xl border ${theme.border} text-xs font-bold ${theme.iconColor}`}>Cancel</button>
              <button onClick={() => { setShowAddDriver(false); window.alert('Driver added! (Blueprint demo)'); }} className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>Add Driver</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
