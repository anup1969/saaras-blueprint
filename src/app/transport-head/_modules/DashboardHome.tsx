'use client';

import React, { useState } from 'react';
import { StatCard, StatusBadge } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import TaskTrackerPanel from '@/components/TaskTrackerPanel';
import {
  Bus, Route, Users, MapPin, Wrench, Plus, CheckCircle, AlertTriangle, Navigation,
  IndianRupee, User, BarChart3
} from 'lucide-react';

// ─── MOCK DATA (used by DashboardHome) ──────────────
const mockRoutes = [
  { id: 'RT-001', name: 'Route A', area: 'Satellite - Jodhpur', stops: 8, students: 38, driver: 'Ramesh Kumar', vehicle: 'GJ-01-AB-1234', timing: '7:00 AM / 3:30 PM', status: 'Active' },
  { id: 'RT-002', name: 'Route B', area: 'Prahlad Nagar - Thaltej', stops: 12, students: 46, driver: 'Suresh Patel', vehicle: 'GJ-01-CD-5678', timing: '6:45 AM / 3:45 PM', status: 'Active' },
  { id: 'RT-003', name: 'Route C', area: 'SG Highway - Bodakdev', stops: 6, students: 28, driver: 'Mahesh Singh', vehicle: 'GJ-01-EF-9012', timing: '7:15 AM / 3:15 PM', status: 'Active' },
  { id: 'RT-004', name: 'Route D', area: 'Maninagar - Isanpur', stops: 7, students: 38, driver: 'Jayesh Patel', vehicle: 'GJ-01-GH-3456', timing: '6:40 AM / 3:40 PM', status: 'Active' },
  { id: 'RT-005', name: 'Route E', area: 'Navrangpura - Paldi', stops: 5, students: 28, driver: 'Dinesh Raval', vehicle: 'GJ-01-IJ-7890', timing: '7:00 AM / 3:30 PM', status: 'Active' },
  { id: 'RT-006', name: 'Route F', area: 'Chandkheda - Motera', stops: 9, students: 44, driver: 'Prakash Bhatt', vehicle: 'GJ-01-KL-2345', timing: '6:35 AM / 3:35 PM', status: 'Active' },
];

const mockDrivers = [
  { id: 'DRV-001', name: 'Ramesh Kumar', license: 'GJ01-20180045623', phone: '98250 12345', vehicle: 'GJ-01-AB-1234', experience: '12 yrs', documents: 'Complete', bloodGroup: 'B+' },
  { id: 'DRV-002', name: 'Suresh Patel', license: 'GJ01-20190078412', phone: '98250 23456', vehicle: 'GJ-01-CD-5678', experience: '8 yrs', documents: 'Complete', bloodGroup: 'O+' },
  { id: 'DRV-003', name: 'Mahesh Singh', license: 'GJ01-20170032189', phone: '98250 34567', vehicle: 'GJ-01-EF-9012', experience: '15 yrs', documents: 'Complete', bloodGroup: 'A+' },
  { id: 'DRV-004', name: 'Jayesh Patel', license: 'GJ01-20200091245', phone: '98250 45678', vehicle: 'GJ-01-GH-3456', experience: '6 yrs', documents: 'Complete', bloodGroup: 'AB+' },
  { id: 'DRV-005', name: 'Dinesh Raval', license: 'GJ01-20160054378', phone: '98250 56789', vehicle: 'GJ-01-IJ-7890', experience: '18 yrs', documents: 'Complete', bloodGroup: 'O-' },
  { id: 'DRV-006', name: 'Prakash Bhatt', license: 'GJ01-20150089034', phone: '98250 67890', vehicle: 'GJ-01-KL-2345', experience: '20 yrs', documents: 'Complete', bloodGroup: 'A-' },
];

const mockGPSVehicles = [
  { vehicle: 'GJ-01-AB-1234', route: 'Route A', speed: '35 km/h', lastStop: 'Jodhpur Cross Roads', nextStop: 'Satellite Circle', eta: '7:42 AM', progress: 75, status: 'Running' },
  { vehicle: 'GJ-01-CD-5678', route: 'Route B', speed: '28 km/h', lastStop: 'Prahlad Nagar Garden', nextStop: 'Thaltej Cross Roads', eta: '7:38 AM', progress: 60, status: 'Running' },
  { vehicle: 'GJ-01-EF-9012', route: 'Route C', speed: '42 km/h', lastStop: 'Bodakdev', nextStop: 'Judges Bungalow', eta: '7:50 AM', progress: 45, status: 'Running' },
  { vehicle: 'GJ-01-GH-3456', route: 'Route D', speed: '0 km/h', lastStop: 'Isanpur Circle', nextStop: 'Maninagar Station', eta: '7:35 AM', progress: 30, status: 'Stopped' },
  { vehicle: 'GJ-01-IJ-7890', route: 'Route E', speed: '22 km/h', lastStop: 'Paldi', nextStop: 'Navrangpura BRTS', eta: '7:30 AM', progress: 85, status: 'Running' },
  { vehicle: 'GJ-01-KL-2345', route: 'Route F', speed: '38 km/h', lastStop: 'Motera Stadium', nextStop: 'Chandkheda BRTS', eta: '7:55 AM', progress: 40, status: 'Running' },
];

const mockLadyAttendants = [
  { id: 'LA-001', name: 'Sunita Devi', phone: '98250 77771', route: 'Route A', vehicle: 'GJ-01-AB-1234', experience: '5 yrs', aadhar: 'Verified', status: 'Active' },
  { id: 'LA-002', name: 'Meena Sharma', phone: '98250 77772', route: 'Route B', vehicle: 'GJ-01-CD-5678', experience: '3 yrs', aadhar: 'Verified', status: 'Active' },
  { id: 'LA-003', name: 'Kavita Patel', phone: '98250 77773', route: 'Route C', vehicle: 'GJ-01-EF-9012', experience: '7 yrs', aadhar: 'Verified', status: 'Active' },
  { id: 'LA-004', name: 'Geeta Raval', phone: '98250 77774', route: 'Route D', vehicle: 'GJ-01-GH-3456', experience: '2 yrs', aadhar: 'Pending', status: 'Active' },
  { id: 'LA-005', name: 'Priya Thakor', phone: '98250 77775', route: 'Route E', vehicle: 'GJ-01-IJ-7890', experience: '4 yrs', aadhar: 'Verified', status: 'On Leave' },
  { id: 'LA-006', name: 'Bhavna Chauhan', phone: '98250 77776', route: 'Route F', vehicle: 'GJ-01-KL-2345', experience: '6 yrs', aadhar: 'Verified', status: 'Active' },
];

const mockDriverAssistants = [
  { id: 'DA-001', name: 'Kishan Patel', phone: '98250 88881', route: 'Route A', vehicle: 'GJ-01-AB-1234', experience: '3 yrs', aadhar: 'Verified', status: 'Active' },
  { id: 'DA-002', name: 'Raju Singh', phone: '98250 88882', route: 'Route B', vehicle: 'GJ-01-CD-5678', experience: '2 yrs', aadhar: 'Verified', status: 'Active' },
  { id: 'DA-003', name: 'Mohan Raval', phone: '98250 88883', route: 'Route C', vehicle: 'GJ-01-EF-9012', experience: '5 yrs', aadhar: 'Verified', status: 'Active' },
  { id: 'DA-004', name: 'Sunil Bhatt', phone: '98250 88884', route: 'Route D', vehicle: 'GJ-01-GH-3456', experience: '1 yr', aadhar: 'Pending', status: 'Active' },
  { id: 'DA-005', name: 'Amit Joshi', phone: '98250 88885', route: 'Route E', vehicle: 'GJ-01-IJ-7890', experience: '4 yrs', aadhar: 'Verified', status: 'On Leave' },
  { id: 'DA-006', name: 'Vijay Solanki', phone: '98250 88886', route: 'Route F', vehicle: 'GJ-01-KL-2345', experience: '6 yrs', aadhar: 'Verified', status: 'Active' },
];

export default function DashboardHome({ theme, onProfileClick, setActiveModule, onLogMaintenance }: { theme: Theme; onProfileClick: () => void; setActiveModule: (m: string) => void; onLogMaintenance: () => void }) {
  type AttStatus = 'P' | 'H' | 'L' | 'A';
  const [driverAtt, setDriverAtt] = useState<Record<string, AttStatus>>(Object.fromEntries(mockDrivers.map(d => [d.id, 'P' as AttStatus])));
  const [attendantAtt, setAttendantAtt] = useState<Record<string, AttStatus>>(Object.fromEntries(mockLadyAttendants.map(a => [a.id, 'P' as AttStatus])));
  const [assistantAtt, setAssistantAtt] = useState<Record<string, AttStatus>>(Object.fromEntries(mockDriverAssistants.map(a => [a.id, 'P' as AttStatus])));
  const attColors: Record<AttStatus, string> = { P: 'bg-emerald-500 text-white', H: 'bg-amber-500 text-white', L: 'bg-blue-500 text-white', A: 'bg-red-500 text-white' };
  const attLabels: AttStatus[] = ['P', 'H', 'L', 'A'];
  const countPresent = (att: Record<string, AttStatus>) => Object.values(att).filter(v => v === 'P').length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Transport Dashboard</h1>
        <button onClick={onProfileClick} title="My Profile" className={`w-9 h-9 rounded-full ${theme.primary} text-white flex items-center justify-center text-xs font-bold hover:opacity-90 transition-opacity`}>MI</button>
      </div>

      {/* Stats Row 1 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Bus} label="Total Vehicles" value={6} color="bg-blue-500" theme={theme} />
        <StatCard icon={Route} label="Active Routes" value={6} color="bg-emerald-500" sub="all active" theme={theme} />
        <StatCard icon={Users} label="Students Using Transport" value={222} color="bg-indigo-500" theme={theme} />
        <StatCard icon={Navigation} label="Vehicles On Road" value={6} color="bg-teal-500" sub="all running on time" theme={theme} />
      </div>

      {/* Stats Row 2 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={User} label="Drivers Present" value="6/6" color="bg-purple-500" sub="100% attendance" theme={theme} />
        <StatCard icon={CheckCircle} label="Trips Completed Today" value={12} color="bg-emerald-500" sub="6 morning + 6 pickup" theme={theme} />
        <StatCard icon={AlertTriangle} label="Maintenance Due" value={2} color="bg-amber-500" sub="next 30 days" theme={theme} />
        <StatCard icon={IndianRupee} label="Monthly Fuel Cost" value="₹1.85L" color="bg-orange-500" sub="Feb 2026" theme={theme} />
      </div>

      {/* Fees Overview Card (clickable → fees module) */}
      <button onClick={() => setActiveModule('fees')} className={`w-full text-left ${theme.cardBg} rounded-2xl border ${theme.border} p-4 hover:ring-2 hover:ring-emerald-400 transition-all`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className={`text-sm font-bold ${theme.highlight}`}>Transport Fees Overview</h3>
          <span className={`text-[10px] ${theme.primaryText} font-bold`}>View Details →</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className={`p-3 rounded-xl ${theme.accentBg}`}>
            <p className={`text-[10px] ${theme.iconColor}`}>Total Collected</p>
            <p className={`text-lg font-bold text-emerald-600`}>{'\u20B9'}2.8L</p>
          </div>
          <div className={`p-3 rounded-xl ${theme.accentBg}`}>
            <p className={`text-[10px] ${theme.iconColor}`}>Total Pending</p>
            <p className={`text-lg font-bold text-amber-600`}>{'\u20B9'}1.2L</p>
          </div>
          <div className={`p-3 rounded-xl ${theme.accentBg}`}>
            <p className={`text-[10px] ${theme.iconColor}`}>Outstanding</p>
            <p className={`text-lg font-bold text-red-600`}>{'\u20B9'}45K</p>
          </div>
          <div className={`p-3 rounded-xl ${theme.accentBg}`}>
            <p className={`text-[10px] ${theme.iconColor}`}>Collection Rate</p>
            <p className={`text-lg font-bold ${theme.primaryText}`}>70%</p>
          </div>
        </div>
      </button>

      {/* Today's Trip Status */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Today&apos;s Trip Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {mockGPSVehicles.map((v, i) => (
            <div key={i} className={`p-3 rounded-xl ${theme.accentBg} border ${theme.border}`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-bold ${theme.highlight}`}>{v.route}</span>
                <StatusBadge status={v.status === 'Running' ? 'Active' : 'Pending'} theme={theme} />
              </div>
              <p className={`text-[10px] ${theme.iconColor} mb-1`}>{v.vehicle} | {v.speed}</p>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${v.progress}%` }} />
              </div>
              <div className="flex justify-between">
                <span className={`text-[10px] ${theme.iconColor}`}>Next: {v.nextStop}</span>
                <span className={`text-[10px] font-bold ${theme.primaryText}`}>ETA: {v.eta}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transport Staff Attendance */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-1`}>Transport Staff Attendance</h3>
        <p className={`text-[10px] ${theme.iconColor} mb-3`}>
          {countPresent(driverAtt)}/{mockDrivers.length} Drivers Present, {countPresent(attendantAtt)}/{mockLadyAttendants.length} Attendants Present, {countPresent(assistantAtt)}/{mockDriverAssistants.length} Assistants Present
        </p>
        {/* Drivers */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold ${theme.highlight}`}>Drivers</span>
            <button onClick={() => setDriverAtt(Object.fromEntries(mockDrivers.map(d => [d.id, 'P' as AttStatus])))} className={`text-[10px] ${theme.primaryText} font-bold hover:underline`}>Mark All Present</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {mockDrivers.map(d => (
              <div key={d.id} className={`p-2 rounded-lg ${theme.accentBg} border ${theme.border} flex items-center justify-between`}>
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>{d.name.split(' ')[0]}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{mockRoutes.find(r => r.driver === d.name)?.name || '-'}</p>
                </div>
                <div className="flex gap-0.5">
                  {attLabels.map(s => (
                    <button key={s} onClick={() => setDriverAtt(prev => ({...prev, [d.id]: s}))}
                      className={`w-6 h-6 rounded text-[10px] font-bold transition-all ${driverAtt[d.id] === s ? attColors[s] : `${theme.secondaryBg} ${theme.iconColor}`}`}>{s}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Lady Attendants */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold ${theme.highlight}`}>Lady Attendants</span>
            <button onClick={() => setAttendantAtt(Object.fromEntries(mockLadyAttendants.map(a => [a.id, 'P' as AttStatus])))} className={`text-[10px] ${theme.primaryText} font-bold hover:underline`}>Mark All Present</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {mockLadyAttendants.map(a => (
              <div key={a.id} className={`p-2 rounded-lg ${theme.accentBg} border ${theme.border} flex items-center justify-between`}>
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>{a.name.split(' ')[0]}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{a.route}</p>
                </div>
                <div className="flex gap-0.5">
                  {attLabels.map(s => (
                    <button key={s} onClick={() => setAttendantAtt(prev => ({...prev, [a.id]: s}))}
                      className={`w-6 h-6 rounded text-[10px] font-bold transition-all ${attendantAtt[a.id] === s ? attColors[s] : `${theme.secondaryBg} ${theme.iconColor}`}`}>{s}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Driver Assistants */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold ${theme.highlight}`}>Driver Assistants</span>
            <button onClick={() => setAssistantAtt(Object.fromEntries(mockDriverAssistants.map(a => [a.id, 'P' as AttStatus])))} className={`text-[10px] ${theme.primaryText} font-bold hover:underline`}>Mark All Present</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {mockDriverAssistants.map(a => (
              <div key={a.id} className={`p-2 rounded-lg ${theme.accentBg} border ${theme.border} flex items-center justify-between`}>
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>{a.name.split(' ')[0]}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{a.route}</p>
                </div>
                <div className="flex gap-0.5">
                  {attLabels.map(s => (
                    <button key={s} onClick={() => setAssistantAtt(prev => ({...prev, [a.id]: s}))}
                      className={`w-6 h-6 rounded text-[10px] font-bold transition-all ${assistantAtt[a.id] === s ? attColors[s] : `${theme.secondaryBg} ${theme.iconColor}`}`}>{s}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <button onClick={() => setActiveModule('vehicles')} className={`flex items-center gap-2 p-3 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} transition-all`}>
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white"><Plus size={14} /></div>
            <span className={`text-xs font-bold ${theme.highlight}`}>Add Vehicle</span>
          </button>
          <button onClick={() => setActiveModule('routes')} className={`flex items-center gap-2 p-3 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} transition-all`}>
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white"><Route size={14} /></div>
            <span className={`text-xs font-bold ${theme.highlight}`}>Add Route</span>
          </button>
          <button onClick={onLogMaintenance} className={`flex items-center gap-2 p-3 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} transition-all`}>
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white"><Wrench size={14} /></div>
            <span className={`text-xs font-bold ${theme.highlight}`}>Log Maintenance</span>
          </button>
          <button onClick={() => window.alert('Reports module coming soon! (Blueprint demo)')} className={`flex items-center gap-2 p-3 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} transition-all`}>
            <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center text-white"><BarChart3 size={14} /></div>
            <span className={`text-xs font-bold ${theme.highlight}`}>View Reports</span>
          </button>
        </div>
      </div>

      {/* Recent Activity + Task Tracker — Side by Side */}
      <div className="grid grid-cols-2 gap-4">
        {/* Recent Activity */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Recent Activity</h3>
          <div className="space-y-2">
            {[
              { text: 'GJ-01-EF-9012 (Route C) AC service completed at CoolAir Services', time: '2 hours ago', type: 'maintenance' },
              { text: 'All morning pickup trips completed - 6/6 routes on time', time: '8:15 AM', type: 'trip' },
              { text: 'New student Aarohi Patel (Class 3-B) added to Route A', time: 'Yesterday', type: 'student' },
              { text: 'PUC renewal completed for GJ-01-KL-2345 (Route F)', time: 'Yesterday', type: 'document' },
              { text: 'Tyre replacement completed for GJ-01-AB-1234 (Route A)', time: '2 days ago', type: 'maintenance' },
            ].map((a, i) => (
              <div key={i} className={`flex items-center gap-3 p-2 rounded-xl ${theme.accentBg}`}>
                <div className={`w-2 h-2 rounded-full ${
                  a.type === 'maintenance' ? 'bg-amber-500' :
                  a.type === 'trip' ? 'bg-emerald-500' :
                  a.type === 'student' ? 'bg-blue-500' :
                  a.type === 'document' ? 'bg-purple-500' :
                  'bg-red-500'
                }`} />
                <p className={`text-xs ${theme.highlight} flex-1`}>{a.text}</p>
                <span className={`text-[10px] ${theme.iconColor} whitespace-nowrap`}>{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Task Tracker */}
        <TaskTrackerPanel theme={theme} role="transport-head" />
      </div>
    </div>
  );
}
