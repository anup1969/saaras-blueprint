'use client';

import React, { useState } from 'react';
import { TabBar, StatusBadge, SearchBar, DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  Search, Plus, Filter, Download, Eye, Edit, Phone, Trash2, Upload, X,
  AlertTriangle, FileCheck, ShieldCheck, Stethoscope, GraduationCap, Bell, CheckCircle, Clock, XCircle
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

// ─── LICENSE & DOCUMENT TRACKING DATA ────────────────
const mockLicenseData = [
  { driverId: 'DRV-001', name: 'Ramesh Kumar', licenseNo: 'GJ01-20180045623', licenseType: 'HTV', expiry: '2027-05-15', documents: [
    { type: 'Driving License', status: 'Verified', expiry: '2027-05-15', uploaded: true },
    { type: 'Medical Certificate', status: 'Verified', expiry: '2026-08-20', uploaded: true },
    { type: 'Police Verification', status: 'Verified', expiry: '2027-01-10', uploaded: true },
    { type: 'Training Certificate', status: 'Verified', expiry: '-', uploaded: true },
  ]},
  { driverId: 'DRV-002', name: 'Suresh Patel', licenseNo: 'GJ01-20190078412', licenseType: 'HTV', expiry: '2026-04-22', documents: [
    { type: 'Driving License', status: 'Verified', expiry: '2026-04-22', uploaded: true },
    { type: 'Medical Certificate', status: 'Expired', expiry: '2026-02-15', uploaded: true },
    { type: 'Police Verification', status: 'Verified', expiry: '2026-12-30', uploaded: true },
    { type: 'Training Certificate', status: 'Pending', expiry: '-', uploaded: false },
  ]},
  { driverId: 'DRV-003', name: 'Mahesh Singh', licenseNo: 'GJ01-20170032189', licenseType: 'HTV', expiry: '2026-06-10', documents: [
    { type: 'Driving License', status: 'Verified', expiry: '2026-06-10', uploaded: true },
    { type: 'Medical Certificate', status: 'Verified', expiry: '2026-09-15', uploaded: true },
    { type: 'Police Verification', status: 'Expired', expiry: '2026-01-05', uploaded: true },
    { type: 'Training Certificate', status: 'Verified', expiry: '-', uploaded: true },
  ]},
  { driverId: 'DRV-004', name: 'Jayesh Patel', licenseNo: 'GJ01-20200091245', licenseType: 'LMV', expiry: '2028-03-18', documents: [
    { type: 'Driving License', status: 'Verified', expiry: '2028-03-18', uploaded: true },
    { type: 'Medical Certificate', status: 'Verified', expiry: '2026-11-22', uploaded: true },
    { type: 'Police Verification', status: 'Verified', expiry: '2027-06-30', uploaded: true },
    { type: 'Training Certificate', status: 'Verified', expiry: '-', uploaded: true },
  ]},
  { driverId: 'DRV-005', name: 'Dinesh Raval', licenseNo: 'GJ01-20160054378', licenseType: 'HTV', expiry: '2026-03-25', documents: [
    { type: 'Driving License', status: 'Verified', expiry: '2026-03-25', uploaded: true },
    { type: 'Medical Certificate', status: 'Pending', expiry: '-', uploaded: false },
    { type: 'Police Verification', status: 'Verified', expiry: '2026-10-15', uploaded: true },
    { type: 'Training Certificate', status: 'Pending', expiry: '-', uploaded: false },
  ]},
  { driverId: 'DRV-006', name: 'Prakash Bhatt', licenseNo: 'GJ01-20150089034', licenseType: 'HTV', expiry: '2026-12-05', documents: [
    { type: 'Driving License', status: 'Verified', expiry: '2026-12-05', uploaded: true },
    { type: 'Medical Certificate', status: 'Verified', expiry: '2027-02-28', uploaded: true },
    { type: 'Police Verification', status: 'Verified', expiry: '2027-04-15', uploaded: true },
    { type: 'Training Certificate', status: 'Verified', expiry: '-', uploaded: true },
  ]},
];

function getDaysUntil(dateStr: string): number {
  if (dateStr === '-') return 999;
  const diff = new Date(dateStr).getTime() - new Date().getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function getLicenseStatusColor(days: number) {
  if (days < 0) return { bg: 'bg-red-100', text: 'text-red-700', label: 'Expired' };
  if (days <= 30) return { bg: 'bg-red-100', text: 'text-red-700', label: 'Expiring Soon' };
  if (days <= 90) return { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Expiring Soon' };
  return { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Valid' };
}

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
      <TabBar tabs={['All Drivers', 'Documents Complete', 'Documents Pending', 'License & Documents']} active={tab} onChange={setTab} theme={theme} />
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

      {/* License & Documents Tab */}
      {tab === 'License & Documents' && (
        <div className="space-y-4">
          {/* Expiring Soon Alert Banner */}
          {(() => {
            const expiringSoon = mockLicenseData.filter(d => {
              const days = getDaysUntil(d.expiry);
              return days >= 0 && days <= 90;
            });
            const expiredDocs = mockLicenseData.flatMap(d => d.documents.filter(doc => doc.status === 'Expired'));
            const pendingDocs = mockLicenseData.flatMap(d => d.documents.filter(doc => doc.status === 'Pending'));
            return (expiringSoon.length > 0 || expiredDocs.length > 0) ? (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3">
                <AlertTriangle size={18} className="text-red-500 shrink-0" />
                <div className="flex-1">
                  <p className="text-xs font-bold text-red-700">
                    {expiringSoon.length} driver(s) with licenses expiring within 90 days {expiredDocs.length > 0 && ` | ${expiredDocs.length} expired document(s)`} {pendingDocs.length > 0 && ` | ${pendingDocs.length} pending document(s)`}
                  </p>
                  <p className="text-[10px] text-red-500">Immediate attention required to ensure compliance</p>
                </div>
                <button
                  onClick={() => window.alert('Bulk reminder sent to all drivers with expiring/pending documents! (Blueprint demo)')}
                  className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-[10px] font-bold flex items-center gap-1 shrink-0"
                >
                  <Bell size={10} /> Send Bulk Reminders
                </button>
              </div>
            ) : null;
          })()}

          {/* License Overview Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-3 text-center`}>
              <FileCheck size={18} className="text-emerald-500 mx-auto mb-1" />
              <p className={`text-lg font-bold ${theme.highlight}`}>{mockLicenseData.filter(d => getDaysUntil(d.expiry) > 90).length}</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Valid Licenses</p>
            </div>
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-3 text-center`}>
              <Clock size={18} className="text-amber-500 mx-auto mb-1" />
              <p className={`text-lg font-bold ${theme.highlight}`}>{mockLicenseData.filter(d => { const days = getDaysUntil(d.expiry); return days > 30 && days <= 90; }).length}</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Expiring 30-90 Days</p>
            </div>
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-3 text-center`}>
              <AlertTriangle size={18} className="text-red-500 mx-auto mb-1" />
              <p className={`text-lg font-bold ${theme.highlight}`}>{mockLicenseData.filter(d => { const days = getDaysUntil(d.expiry); return days >= 0 && days <= 30; }).length}</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Expiring &lt;30 Days</p>
            </div>
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-3 text-center`}>
              <XCircle size={18} className="text-red-600 mx-auto mb-1" />
              <p className={`text-lg font-bold ${theme.highlight}`}>{mockLicenseData.filter(d => getDaysUntil(d.expiry) < 0).length}</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Expired</p>
            </div>
          </div>

          {/* License Table */}
          <DataTable
            headers={['Driver', 'License No', 'Type', 'Expiry Date', 'Days Left', 'Status', '']}
            rows={mockLicenseData.map(d => {
              const days = getDaysUntil(d.expiry);
              const status = getLicenseStatusColor(days);
              return [
                <span key="name" className={`font-bold ${theme.highlight}`}>{d.name}</span>,
                <span key="lic" className={`font-mono text-xs ${theme.iconColor}`}>{d.licenseNo}</span>,
                <span key="type" className={`text-xs px-2 py-0.5 rounded-full font-bold bg-blue-100 text-blue-700`}>{d.licenseType}</span>,
                <span key="exp" className={`text-xs font-mono ${theme.iconColor}`}>{d.expiry}</span>,
                <span key="days" className={`text-xs font-bold ${days < 0 ? 'text-red-600' : days <= 30 ? 'text-red-600' : days <= 90 ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {days < 0 ? `${Math.abs(days)}d overdue` : `${days} days`}
                </span>,
                <span key="status" className={`text-xs px-2 py-0.5 rounded-full font-bold ${status.bg} ${status.text}`}>{status.label}</span>,
                <button key="action" className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>,
              ];
            })}
            theme={theme}
          />

          {/* Document Checklist per Driver */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Document Checklist by Driver</h3>
            <div className="space-y-3">
              {mockLicenseData.map((d, di) => (
                <div key={di} className={`p-3 rounded-xl ${theme.accentBg}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg ${theme.primary} flex items-center justify-center text-white text-xs font-bold`}>
                        {d.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className={`text-xs font-bold ${theme.highlight}`}>{d.name}</p>
                        <p className={`text-[10px] ${theme.iconColor}`}>{d.driverId} | {d.licenseNo}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold ${
                      d.documents.every(doc => doc.status === 'Verified') ? 'text-emerald-600' : 'text-amber-600'
                    }`}>
                      {d.documents.filter(doc => doc.status === 'Verified').length}/{d.documents.length} Verified
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {d.documents.map((doc, doci) => {
                      const docDays = getDaysUntil(doc.expiry);
                      const docIcon = doc.type === 'Driving License' ? FileCheck :
                                      doc.type === 'Medical Certificate' ? Stethoscope :
                                      doc.type === 'Police Verification' ? ShieldCheck : GraduationCap;
                      const DocIcon = docIcon;
                      return (
                        <div key={doci} className={`p-2 rounded-lg border ${theme.border} ${theme.cardBg}`}>
                          <div className="flex items-center gap-1.5 mb-1">
                            <DocIcon size={12} className={
                              doc.status === 'Verified' ? 'text-emerald-500' :
                              doc.status === 'Expired' ? 'text-red-500' : 'text-amber-500'
                            } />
                            <span className={`text-[10px] font-bold ${theme.highlight}`}>{doc.type}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                              doc.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' :
                              doc.status === 'Expired' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                            }`}>{doc.status}</span>
                            {doc.expiry !== '-' && (
                              <span className={`text-[9px] ${docDays < 30 ? 'text-red-600 font-bold' : theme.iconColor}`}>{doc.expiry}</span>
                            )}
                          </div>
                          {!doc.uploaded && (
                            <button className={`mt-1 w-full px-2 py-1 rounded text-[9px] font-bold ${theme.secondaryBg} ${theme.iconColor} flex items-center justify-center gap-0.5`}>
                              <Upload size={8} /> Upload
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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
