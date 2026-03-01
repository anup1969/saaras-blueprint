'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { StatCard, StatusBadge, TabBar, DataTable } from '@/components/shared';
import { mockRoutes } from '@/lib/mock-data';
import { Bus, MapPin, AlertTriangle, ShieldCheck, Key, Clock, CheckCircle, XCircle, Users, Eye, ToggleLeft, ToggleRight, Lock } from 'lucide-react';

// ─── OTP PICKUP MOCK DATA ────────────────────────────
const mockOtpLog = [
  { student: 'Aarav Patel', parent: 'Rajesh Patel', otp: '4829', requestedAt: '02:15 PM', verifiedAt: '02:22 PM', verifiedBy: 'Rajiv Kumar (Guard)', status: 'Verified' },
  { student: 'Siya Sharma', parent: 'Pooja Sharma', otp: '7361', requestedAt: '02:20 PM', verifiedAt: '-', verifiedBy: '-', status: 'Pending' },
  { student: 'Rohan Deshmukh', parent: 'Anil Deshmukh', otp: '5190', requestedAt: '02:10 PM', verifiedAt: '02:18 PM', verifiedBy: 'Driver - Raju', status: 'Verified' },
  { student: 'Ishita Gupta', parent: 'Neha Gupta', otp: '8823', requestedAt: '02:25 PM', verifiedAt: '-', verifiedBy: '-', status: 'Pending' },
  { student: 'Arjun Reddy', parent: 'Suresh Reddy', otp: '-', requestedAt: '02:30 PM', verifiedAt: '02:32 PM', verifiedBy: 'Admin (Override)', status: 'Override' },
  { student: 'Kavya Trivedi', parent: 'Hitesh Trivedi', otp: '3456', requestedAt: '01:45 PM', verifiedAt: '01:52 PM', verifiedBy: 'Manoj Singh (Guard)', status: 'Verified' },
  { student: 'Dev Chauhan', parent: 'Prakash Chauhan', otp: '9012', requestedAt: '02:35 PM', verifiedAt: '-', verifiedBy: '-', status: 'Expired' },
  { student: 'Riya Bhatt', parent: 'Mahesh Bhatt', otp: '6789', requestedAt: '02:40 PM', verifiedAt: '-', verifiedBy: '-', status: 'Pending' },
];

export default function TransportModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Routes');
  const [otpEnabled, setOtpEnabled] = useState(true);
  const [showOverrideForm, setShowOverrideForm] = useState(false);
  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Transport Management</h1>
      <TabBar tabs={['Routes', 'Vehicles', 'GPS Tracking', 'OTP Pickup']} active={tab} onChange={setTab} theme={theme} />
      {tab === 'Routes' && (
        <DataTable
          headers={['Route ID', 'Name', 'Driver', 'Vehicle', 'Students', 'Stops', 'Status']}
          rows={mockRoutes.map(r => [
            <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{r.id}</span>,
            <span key="name" className={`font-bold ${theme.highlight}`}>{r.name}</span>,
            <span key="driver" className={theme.iconColor}>{r.driver}</span>,
            <span key="vehicle" className={theme.iconColor}>{r.vehicle}</span>,
            <span key="students" className={`font-bold ${theme.highlight}`}>{r.students}</span>,
            <span key="stops" className={theme.iconColor}>{r.stops}</span>,
            <StatusBadge key="status" status="Running" theme={theme} />,
          ])}
          theme={theme}
        />
      )}
      {tab === 'Vehicles' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { no: 'GJ-01-AB-1234', type: 'Bus (40 seats)', km: '45,230 km', status: 'Running' },
            { no: 'GJ-01-CD-5678', type: 'Bus (50 seats)', km: '38,120 km', status: 'Running' },
            { no: 'GJ-01-EF-9012', type: 'Mini Bus (30 seats)', km: '52,870 km', status: 'Running' },
          ].map((v, i) => (
            <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
              <div className="flex justify-between items-start mb-2">
                <h4 className={`text-sm font-bold ${theme.highlight}`}>{v.no}</h4>
                <StatusBadge status={v.status} theme={theme} />
              </div>
              <p className={`text-xs ${theme.iconColor}`}>{v.type}</p>
              <p className={`text-xs ${theme.iconColor} mt-1`}>Odometer: <span className="font-bold">{v.km}</span></p>
            </div>
          ))}
        </div>
      )}
      {tab === 'GPS Tracking' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <StatCard icon={Bus} label="On Route" value="3" color="bg-emerald-500" theme={theme} />
            <StatCard icon={MapPin} label="At School" value="1" color="bg-blue-500" theme={theme} />
            <StatCard icon={AlertTriangle} label="Delayed" value="0" color="bg-amber-500" theme={theme} />
          </div>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6`}>
            <div className={`w-full h-64 ${theme.accentBg} rounded-xl flex items-center justify-center`}>
              <div className="text-center">
                <MapPin size={48} className={theme.iconColor} />
                <p className={`text-sm ${theme.iconColor} mt-2`}>Live GPS Map View</p>
                <p className={`text-xs ${theme.iconColor}`}>pompombus.com API integration</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* OTP Pickup Verification Tab */}
      {tab === 'OTP Pickup' && (
        <div className="space-y-4">
          {/* Toggle + Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => setOtpEnabled(!otpEnabled)} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                otpEnabled ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'
              }`}>
                {otpEnabled ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                OTP Verification: {otpEnabled ? 'ENABLED' : 'DISABLED'}
              </button>
            </div>
            <button onClick={() => setShowOverrideForm(true)} className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}>
              <Lock size={14} /> Admin Override
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={Users} label="Total Pickups Today" value={mockOtpLog.length} color="bg-blue-500" theme={theme} />
            <StatCard icon={CheckCircle} label="OTP Verified" value={mockOtpLog.filter(o => o.status === 'Verified').length} color="bg-emerald-500"
              sub={`${Math.round((mockOtpLog.filter(o => o.status === 'Verified').length / mockOtpLog.length) * 100)}%`} theme={theme} />
            <StatCard icon={Clock} label="Pending" value={mockOtpLog.filter(o => o.status === 'Pending').length} color="bg-amber-500" theme={theme} />
            <StatCard icon={ShieldCheck} label="Manual Overrides" value={mockOtpLog.filter(o => o.status === 'Override').length} color="bg-purple-500" theme={theme} />
          </div>

          {/* How it works */}
          <div className={`p-3 rounded-xl ${theme.accentBg} border ${theme.border}`}>
            <p className={`text-xs font-bold ${theme.highlight} mb-1`}>How OTP Pickup Works</p>
            <div className="flex items-center gap-3 text-[10px]">
              <span className={`px-2 py-1 rounded-lg ${theme.primary} text-white font-bold`}>1</span>
              <span className={theme.iconColor}>Parent requests pickup</span>
              <span className={theme.iconColor}>&rarr;</span>
              <span className={`px-2 py-1 rounded-lg ${theme.primary} text-white font-bold`}>2</span>
              <span className={theme.iconColor}>4-digit OTP sent to parent</span>
              <span className={theme.iconColor}>&rarr;</span>
              <span className={`px-2 py-1 rounded-lg ${theme.primary} text-white font-bold`}>3</span>
              <span className={theme.iconColor}>Guard/driver verifies OTP</span>
              <span className={theme.iconColor}>&rarr;</span>
              <span className={`px-2 py-1 rounded-lg ${theme.primary} text-white font-bold`}>4</span>
              <span className={theme.iconColor}>Student released</span>
            </div>
          </div>

          {/* OTP Log Table */}
          <DataTable
            headers={['Student', 'Parent', 'OTP', 'Requested At', 'Verified At', 'Verified By', 'Status']}
            rows={mockOtpLog.map(o => [
              <span key="student" className={`font-bold ${theme.highlight}`}>{o.student}</span>,
              <span key="parent" className={theme.iconColor}>{o.parent}</span>,
              <span key="otp" className={`font-mono font-bold text-sm ${
                o.otp === '-' ? theme.iconColor : theme.primaryText
              }`}>{o.otp}</span>,
              <span key="req" className={`font-mono text-xs ${theme.iconColor}`}>{o.requestedAt}</span>,
              <span key="ver" className={`font-mono text-xs ${o.verifiedAt === '-' ? 'text-amber-600' : theme.iconColor}`}>{o.verifiedAt}</span>,
              <span key="by" className={`text-xs ${theme.iconColor}`}>{o.verifiedBy}</span>,
              <span key="status" className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                o.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' :
                o.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                o.status === 'Override' ? 'bg-purple-100 text-purple-700' :
                'bg-red-100 text-red-600'
              }`}>{o.status}</span>,
            ])}
            theme={theme}
          />

          {/* Verification Stats Summary */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Verification Summary</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className={`p-3 rounded-xl ${theme.accentBg} text-center`}>
                <p className={`text-lg font-bold text-emerald-600`}>{Math.round((mockOtpLog.filter(o => o.status === 'Verified').length / mockOtpLog.length) * 100)}%</p>
                <p className={`text-[10px] ${theme.iconColor}`}>OTP Verified Rate</p>
              </div>
              <div className={`p-3 rounded-xl ${theme.accentBg} text-center`}>
                <p className={`text-lg font-bold text-purple-600`}>{mockOtpLog.filter(o => o.status === 'Override').length}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Manual Overrides</p>
              </div>
              <div className={`p-3 rounded-xl ${theme.accentBg} text-center`}>
                <p className={`text-lg font-bold text-amber-600`}>~7 min</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Avg. Verification Time</p>
              </div>
            </div>
          </div>

          {/* Admin Override Modal */}
          {showOverrideForm && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowOverrideForm(false)}>
              <div className={`${theme.cardBg} rounded-2xl border ${theme.border} shadow-2xl w-full max-w-md p-6 space-y-4`} onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between">
                  <h2 className={`text-lg font-bold ${theme.highlight}`}>Admin Override — Release Without OTP</h2>
                  <button onClick={() => setShowOverrideForm(false)} className={theme.iconColor}><XCircle size={18} /></button>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                  <p className="text-xs text-amber-700 font-bold">This will release the student without OTP verification. A reason must be provided.</p>
                </div>
                <div>
                  <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Student Name *</label>
                  <input placeholder="Search student..." className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg || theme.secondaryBg} text-sm outline-none`} />
                </div>
                <div>
                  <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Reason for Override *</label>
                  <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg || theme.secondaryBg} text-sm outline-none`}>
                    <option value="">Select reason...</option>
                    <option>Parent phone unreachable</option>
                    <option>OTP system down</option>
                    <option>Emergency release</option>
                    <option>Known parent — ID verified manually</option>
                    <option>Other (specify in notes)</option>
                  </select>
                </div>
                <div>
                  <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Notes</label>
                  <textarea placeholder="Additional details..." rows={2} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg || theme.secondaryBg} text-sm outline-none`} />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setShowOverrideForm(false)} className={`flex-1 py-2 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.highlight}`}>Cancel</button>
                  <button onClick={() => { setShowOverrideForm(false); window.alert('Student released with admin override. Logged for audit. (Blueprint demo)'); }} className="flex-1 py-2 rounded-xl bg-purple-500 text-white text-xs font-bold">Override & Release</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
