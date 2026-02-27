'use client';

import React, { useState } from 'react';
import { StatCard, StatusBadge, SearchBar, DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  Plus, Eye, Edit, Phone, Download, Search, UserCheck, CheckCircle,
  AlertTriangle, FileText, Trash2, Upload, X
} from 'lucide-react';

// ─── MOCK DATA ──────────────────────────────────────
const mockLadyAttendants = [
  { id: 'LA-001', name: 'Sunita Devi', phone: '98250 77771', route: 'Route A', vehicle: 'GJ-01-AB-1234', experience: '5 yrs', aadhar: 'Verified', status: 'Active' },
  { id: 'LA-002', name: 'Meena Sharma', phone: '98250 77772', route: 'Route B', vehicle: 'GJ-01-CD-5678', experience: '3 yrs', aadhar: 'Verified', status: 'Active' },
  { id: 'LA-003', name: 'Kavita Patel', phone: '98250 77773', route: 'Route C', vehicle: 'GJ-01-EF-9012', experience: '7 yrs', aadhar: 'Verified', status: 'Active' },
  { id: 'LA-004', name: 'Geeta Raval', phone: '98250 77774', route: 'Route D', vehicle: 'GJ-01-GH-3456', experience: '2 yrs', aadhar: 'Pending', status: 'Active' },
  { id: 'LA-005', name: 'Priya Thakor', phone: '98250 77775', route: 'Route E', vehicle: 'GJ-01-IJ-7890', experience: '4 yrs', aadhar: 'Verified', status: 'On Leave' },
  { id: 'LA-006', name: 'Bhavna Chauhan', phone: '98250 77776', route: 'Route F', vehicle: 'GJ-01-KL-2345', experience: '6 yrs', aadhar: 'Verified', status: 'Active' },
];

const mockRoutes = [
  { id: 'RT-001', name: 'Route A' }, { id: 'RT-002', name: 'Route B' }, { id: 'RT-003', name: 'Route C' },
  { id: 'RT-004', name: 'Route D' }, { id: 'RT-005', name: 'Route E' }, { id: 'RT-006', name: 'Route F' },
];

export default function LadyAttendantModule({ theme }: { theme: Theme }) {
  const [showAdd, setShowAdd] = useState(false);
  const [laCustomFields, setLaCustomFields] = useState<{label: string; value: string}[]>([]);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Lady Attendants</h1>
        <button onClick={() => setShowAdd(true)} className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> Add Attendant</button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={UserCheck} label="Total Attendants" value={mockLadyAttendants.length} color="bg-pink-500" theme={theme} />
        <StatCard icon={CheckCircle} label="Active" value={mockLadyAttendants.filter(a => a.status === 'Active').length} color="bg-emerald-500" theme={theme} />
        <StatCard icon={AlertTriangle} label="On Leave" value={mockLadyAttendants.filter(a => a.status === 'On Leave').length} color="bg-amber-500" theme={theme} />
        <StatCard icon={FileText} label="Docs Pending" value={mockLadyAttendants.filter(a => a.aadhar === 'Pending').length} color="bg-red-500" theme={theme} />
      </div>
      <div className="flex gap-3">
        <SearchBar placeholder="Search by name, phone, route..." theme={theme} icon={Search} />
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Download size={12} /> Export</button>
      </div>
      <DataTable
        headers={['ID', 'Name', 'Phone', 'Route', 'Vehicle', 'Experience', 'Aadhar', 'Status', '']}
        rows={mockLadyAttendants.map(la => [
          <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{la.id}</span>,
          <span key="name" className={`font-bold ${theme.highlight}`}>{la.name}</span>,
          <span key="phone" className={theme.iconColor}>{la.phone}</span>,
          <span key="route" className={`font-bold ${theme.primaryText}`}>{la.route}</span>,
          <span key="vehicle" className={`font-mono text-xs ${theme.iconColor}`}>{la.vehicle}</span>,
          <span key="exp" className={theme.iconColor}>{la.experience}</span>,
          <StatusBadge key="aadhar" status={la.aadhar === 'Verified' ? 'Active' : 'Pending'} theme={theme} />,
          <StatusBadge key="status" status={la.status === 'Active' ? 'Active' : 'Pending'} theme={theme} />,
          <div key="actions" className="flex gap-1">
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Edit size={12} className={theme.iconColor} /></button>
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Phone size={12} className={theme.iconColor} /></button>
          </div>
        ])}
        theme={theme}
      />
      {showAdd && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-bold ${theme.highlight}`}>Add Lady Attendant</h2>
              <button onClick={() => setShowAdd(false)} className={`p-2 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Photo</label>
                <div className={`flex items-center gap-3 p-3 rounded-xl border ${theme.border} ${theme.secondaryBg}`}>
                  <div className={`w-12 h-12 rounded-full ${theme.accentBg} flex items-center justify-center`}><Upload size={16} className={theme.iconColor} /></div>
                  <div><p className={`text-xs ${theme.highlight}`}>Upload photo</p><p className={`text-[10px] ${theme.iconColor}`}>JPG, PNG (max 2MB)</p></div>
                </div>
              </div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Full Name *</label><input placeholder="e.g. Sunita Devi" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Phone Number *</label><input placeholder="e.g. 98250 77777" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Secondary Phone</label><input placeholder="e.g. 98250 77778" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Age</label><input type="number" placeholder="e.g. 30" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Gender</label>
                <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}><option value="">Select...</option><option>Female</option><option>Male</option><option>Other</option></select>
              </div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Blood Group</label>
                <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}><option value="">Select...</option>{['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(b => <option key={b}>{b}</option>)}</select>
              </div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Assign to Route</label>
                <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}><option value="">Select route...</option>{mockRoutes.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}</select>
              </div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Experience</label><input placeholder="e.g. 3 yrs" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Salary ({'\u20B9'})</label><input type="number" placeholder="e.g. 12000" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Aadhar Number</label><input placeholder="XXXX XXXX XXXX" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Joining Date</label><input type="date" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div className="col-span-2"><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Address</label><textarea placeholder="Full address..." rows={2} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Emergency Contact Name</label><input placeholder="e.g. Ramesh Devi" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Emergency Contact Phone</label><input placeholder="e.g. 98250 99999" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div className="col-span-2">
                <label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Documents</label>
                <div className={`p-3 rounded-xl ${theme.accentBg} border ${theme.border}`}><p className={`text-[10px] ${theme.iconColor}`}>ID Proof: <span className="text-amber-600 font-bold">Not uploaded</span></p></div>
              </div>
              {laCustomFields.map((cf, i) => (
                <React.Fragment key={i}>
                  <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Field Label</label><input value={cf.label} onChange={e => { const n = [...laCustomFields]; n[i].label = e.target.value; setLaCustomFields(n); }} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
                  <div className="flex gap-2"><div className="flex-1"><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Value</label><input value={cf.value} onChange={e => { const n = [...laCustomFields]; n[i].value = e.target.value; setLaCustomFields(n); }} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
                    <button onClick={() => setLaCustomFields(laCustomFields.filter((_, j) => j !== i))} className={`self-end p-2 rounded-lg ${theme.buttonHover}`}><Trash2 size={12} className="text-red-500" /></button>
                  </div>
                </React.Fragment>
              ))}
              <div className="col-span-2"><button onClick={() => setLaCustomFields([...laCustomFields, { label: '', value: '' }])} className={`text-xs font-bold ${theme.primaryText} hover:underline flex items-center gap-1`}><Plus size={12} /> Add Custom Field</button></div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setShowAdd(false)} className={`px-4 py-2 rounded-xl border ${theme.border} text-xs font-bold ${theme.iconColor}`}>Cancel</button>
              <button onClick={() => { setShowAdd(false); window.alert('Attendant added! (Blueprint demo)'); }} className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>Add Attendant</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
