'use client';

import React, { useState } from 'react';
import { StatCard, StatusBadge, SearchBar, DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  Plus, Eye, Edit, Phone, Download, Search, UserPlus, CheckCircle,
  AlertTriangle, FileText, Trash2, Upload, X
} from 'lucide-react';

// ─── MOCK DATA ──────────────────────────────────────
const mockDriverAssistants = [
  { id: 'DA-001', name: 'Kishan Patel', phone: '98250 88881', route: 'Route A', vehicle: 'GJ-01-AB-1234', experience: '3 yrs', aadhar: 'Verified', status: 'Active' },
  { id: 'DA-002', name: 'Raju Singh', phone: '98250 88882', route: 'Route B', vehicle: 'GJ-01-CD-5678', experience: '2 yrs', aadhar: 'Verified', status: 'Active' },
  { id: 'DA-003', name: 'Mohan Raval', phone: '98250 88883', route: 'Route C', vehicle: 'GJ-01-EF-9012', experience: '5 yrs', aadhar: 'Verified', status: 'Active' },
  { id: 'DA-004', name: 'Sunil Bhatt', phone: '98250 88884', route: 'Route D', vehicle: 'GJ-01-GH-3456', experience: '1 yr', aadhar: 'Pending', status: 'Active' },
  { id: 'DA-005', name: 'Amit Joshi', phone: '98250 88885', route: 'Route E', vehicle: 'GJ-01-IJ-7890', experience: '4 yrs', aadhar: 'Verified', status: 'On Leave' },
  { id: 'DA-006', name: 'Vijay Solanki', phone: '98250 88886', route: 'Route F', vehicle: 'GJ-01-KL-2345', experience: '6 yrs', aadhar: 'Verified', status: 'Active' },
];

const mockRoutes = [
  { id: 'RT-001', name: 'Route A' }, { id: 'RT-002', name: 'Route B' }, { id: 'RT-003', name: 'Route C' },
  { id: 'RT-004', name: 'Route D' }, { id: 'RT-005', name: 'Route E' }, { id: 'RT-006', name: 'Route F' },
];

export default function DriverAssistantModule({ theme }: { theme: Theme }) {
  const [showAdd, setShowAdd] = useState(false);
  const [daCustomFields, setDaCustomFields] = useState<{label: string; value: string}[]>([]);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Driver Assistants</h1>
        <button onClick={() => setShowAdd(true)} className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> Add Assistant</button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={UserPlus} label="Total Assistants" value={mockDriverAssistants.length} color="bg-cyan-500" theme={theme} />
        <StatCard icon={CheckCircle} label="Active" value={mockDriverAssistants.filter(a => a.status === 'Active').length} color="bg-emerald-500" theme={theme} />
        <StatCard icon={AlertTriangle} label="On Leave" value={mockDriverAssistants.filter(a => a.status === 'On Leave').length} color="bg-amber-500" theme={theme} />
        <StatCard icon={FileText} label="Docs Pending" value={mockDriverAssistants.filter(a => a.aadhar === 'Pending').length} color="bg-red-500" theme={theme} />
      </div>
      <div className="flex gap-3">
        <SearchBar placeholder="Search by name, phone, route..." theme={theme} icon={Search} />
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Download size={12} /> Export</button>
      </div>
      <DataTable
        headers={['ID', 'Name', 'Phone', 'Route', 'Vehicle', 'Experience', 'Aadhar', 'Status', '']}
        rows={mockDriverAssistants.map(da => [
          <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{da.id}</span>,
          <span key="name" className={`font-bold ${theme.highlight}`}>{da.name}</span>,
          <span key="phone" className={theme.iconColor}>{da.phone}</span>,
          <span key="route" className={`font-bold ${theme.primaryText}`}>{da.route}</span>,
          <span key="vehicle" className={`font-mono text-xs ${theme.iconColor}`}>{da.vehicle}</span>,
          <span key="exp" className={theme.iconColor}>{da.experience}</span>,
          <StatusBadge key="aadhar" status={da.aadhar === 'Verified' ? 'Active' : 'Pending'} theme={theme} />,
          <StatusBadge key="status" status={da.status === 'Active' ? 'Active' : 'Pending'} theme={theme} />,
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
              <h2 className={`text-lg font-bold ${theme.highlight}`}>Add Driver Assistant</h2>
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
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Full Name *</label><input placeholder="e.g. Kishan Patel" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Phone Number *</label><input placeholder="e.g. 98250 88887" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Secondary Phone</label><input placeholder="e.g. 98250 88888" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Age</label><input type="number" placeholder="e.g. 28" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Gender</label>
                <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}><option value="">Select...</option><option>Male</option><option>Female</option><option>Other</option></select>
              </div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Blood Group</label>
                <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}><option value="">Select...</option>{['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(b => <option key={b}>{b}</option>)}</select>
              </div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Assign to Route</label>
                <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}><option value="">Select route...</option>{mockRoutes.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}</select>
              </div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Experience</label><input placeholder="e.g. 2 yrs" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Salary ({'\u20B9'})</label><input type="number" placeholder="e.g. 10000" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Aadhar Number</label><input placeholder="XXXX XXXX XXXX" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Joining Date</label><input type="date" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div className="col-span-2"><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Address</label><textarea placeholder="Full address..." rows={2} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Emergency Contact Name</label><input placeholder="e.g. Sita Devi" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Emergency Contact Phone</label><input placeholder="e.g. 98250 99999" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div className="col-span-2">
                <label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Documents</label>
                <div className={`p-3 rounded-xl ${theme.accentBg} border ${theme.border}`}><p className={`text-[10px] ${theme.iconColor}`}>ID Proof: <span className="text-amber-600 font-bold">Not uploaded</span></p></div>
              </div>
              {daCustomFields.map((cf, i) => (
                <React.Fragment key={i}>
                  <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Field Label</label><input value={cf.label} onChange={e => { const n = [...daCustomFields]; n[i].label = e.target.value; setDaCustomFields(n); }} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
                  <div className="flex gap-2"><div className="flex-1"><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Value</label><input value={cf.value} onChange={e => { const n = [...daCustomFields]; n[i].value = e.target.value; setDaCustomFields(n); }} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
                    <button onClick={() => setDaCustomFields(daCustomFields.filter((_, j) => j !== i))} className={`self-end p-2 rounded-lg ${theme.buttonHover}`}><Trash2 size={12} className="text-red-500" /></button>
                  </div>
                </React.Fragment>
              ))}
              <div className="col-span-2"><button onClick={() => setDaCustomFields([...daCustomFields, { label: '', value: '' }])} className={`text-xs font-bold ${theme.primaryText} hover:underline flex items-center gap-1`}><Plus size={12} /> Add Custom Field</button></div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setShowAdd(false)} className={`px-4 py-2 rounded-xl border ${theme.border} text-xs font-bold ${theme.iconColor}`}>Cancel</button>
              <button onClick={() => { setShowAdd(false); window.alert('Assistant added! (Blueprint demo)'); }} className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>Add Assistant</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
