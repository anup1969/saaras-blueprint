'use client';

import React, { useState } from 'react';
import BlueprintLayout from '@/components/BlueprintLayout';
import { StatCard, TabBar, StatusBadge, SearchBar, DataTable, Toggle } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import StakeholderProfile from '@/components/StakeholderProfile';
import TaskTrackerPanel from '@/components/TaskTrackerPanel';
import {
  Home, Bus, Route, Car, Users, MapPin, Wrench, Search, Plus, Filter, Download,
  Eye, Edit, Trash2, Phone, Clock, Shield, AlertTriangle, CheckCircle, Navigation,
  Fuel, Calendar, FileText, IndianRupee, User, MapPinned, CircleDot, Timer,
  Gauge, Bell, TrendingUp, ChevronDown, BarChart3,
  PanelLeftClose, PanelLeftOpen
} from 'lucide-react';

// ─── MODULE SIDEBAR ────────────────────────────────
const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'routes', label: 'Routes', icon: Route },
  { id: 'vehicles', label: 'Vehicles', icon: Car },
  { id: 'drivers', label: 'Drivers', icon: Users },
  { id: 'gps-tracking', label: 'GPS Tracking', icon: Navigation },
  { id: 'students-by-route', label: 'Students by Route', icon: MapPin },
  { id: 'maintenance', label: 'Maintenance', icon: Wrench },
];

// ─── MOCK DATA ──────────────────────────────────────

const mockRoutes = [
  { id: 'RT-001', name: 'Satellite', area: 'Satellite - Jodhpur', stops: 8, students: 42, driver: 'Ramesh Prajapati', vehicle: 'GJ-01-AB-1234', timing: '6:45 AM - 8:00 AM', status: 'Active' },
  { id: 'RT-002', name: 'Prahlad Nagar', area: 'Prahlad Nagar - Thaltej', stops: 6, students: 35, driver: 'Mahendra Solanki', vehicle: 'GJ-01-CD-5678', timing: '6:50 AM - 7:55 AM', status: 'Active' },
  { id: 'RT-003', name: 'SG Highway', area: 'SG Highway - Bodakdev', stops: 10, students: 48, driver: 'Bhavesh Thakor', vehicle: 'GJ-01-EF-9012', timing: '6:30 AM - 8:10 AM', status: 'Active' },
  { id: 'RT-004', name: 'Maninagar', area: 'Maninagar - Isanpur', stops: 7, students: 38, driver: 'Suresh Parmar', vehicle: 'GJ-01-GH-3456', timing: '6:40 AM - 7:50 AM', status: 'Active' },
  { id: 'RT-005', name: 'Navrangpura', area: 'Navrangpura - Paldi', stops: 5, students: 28, driver: 'Dinesh Raval', vehicle: 'GJ-01-IJ-7890', timing: '7:00 AM - 7:45 AM', status: 'Active' },
  { id: 'RT-006', name: 'Chandkheda', area: 'Chandkheda - Motera', stops: 9, students: 44, driver: 'Jayesh Patel', vehicle: 'GJ-01-KL-2345', timing: '6:35 AM - 8:05 AM', status: 'Active' },
  { id: 'RT-007', name: 'Vastral', area: 'Vastral - Odhav', stops: 6, students: 30, driver: 'Prakash Bhatt', vehicle: 'GJ-01-MN-6789', timing: '6:55 AM - 7:50 AM', status: 'Maintenance' },
  { id: 'RT-008', name: 'Bopal', area: 'Bopal - South Bopal', stops: 7, students: 36, driver: 'Ketan Joshi', vehicle: 'GJ-01-OP-1122', timing: '6:45 AM - 7:55 AM', status: 'Active' },
];

const mockVehicles = [
  { id: 'GJ-01-AB-1234', type: 'Bus', capacity: 52, driver: 'Ramesh Prajapati', route: 'Satellite', insurance: '2026-08-15', puc: '2026-05-20', fitness: '2027-01-10', km: '45,230', status: 'Active' },
  { id: 'GJ-01-CD-5678', type: 'Bus', capacity: 52, driver: 'Mahendra Solanki', route: 'Prahlad Nagar', insurance: '2026-11-02', puc: '2026-07-14', fitness: '2027-03-22', km: '38,120', status: 'Active' },
  { id: 'GJ-01-EF-9012', type: 'Bus', capacity: 56, driver: 'Bhavesh Thakor', route: 'SG Highway', insurance: '2026-06-30', puc: '2026-04-10', fitness: '2026-12-05', km: '52,870', status: 'Active' },
  { id: 'GJ-01-GH-3456', type: 'Van', capacity: 26, driver: 'Suresh Parmar', route: 'Maninagar', insurance: '2026-09-18', puc: '2026-06-25', fitness: '2027-02-14', km: '31,450', status: 'Active' },
  { id: 'GJ-01-IJ-7890', type: 'Van', capacity: 26, driver: 'Dinesh Raval', route: 'Navrangpura', insurance: '2026-10-05', puc: '2026-08-01', fitness: '2027-04-20', km: '28,670', status: 'Active' },
  { id: 'GJ-01-KL-2345', type: 'Bus', capacity: 52, driver: 'Jayesh Patel', route: 'Chandkheda', insurance: '2026-07-22', puc: '2026-03-15', fitness: '2026-11-30', km: '48,910', status: 'Active' },
  { id: 'GJ-01-MN-6789', type: 'Bus', capacity: 48, driver: 'Prakash Bhatt', route: 'Vastral', insurance: '2026-12-10', puc: '2026-09-05', fitness: '2027-05-18', km: '55,320', status: 'Maintenance' },
  { id: 'GJ-01-OP-1122', type: 'Van', capacity: 26, driver: 'Ketan Joshi', route: 'Bopal', insurance: '2026-08-28', puc: '2026-05-12', fitness: '2027-01-25', km: '22,140', status: 'Active' },
];

const mockDrivers = [
  { id: 'DRV-001', name: 'Ramesh Prajapati', license: 'GJ01-20180045623', phone: '98250 12345', vehicle: 'GJ-01-AB-1234', experience: '12 yrs', documents: 'Complete', bloodGroup: 'B+' },
  { id: 'DRV-002', name: 'Mahendra Solanki', license: 'GJ01-20190078412', phone: '98250 23456', vehicle: 'GJ-01-CD-5678', experience: '8 yrs', documents: 'Complete', bloodGroup: 'O+' },
  { id: 'DRV-003', name: 'Bhavesh Thakor', license: 'GJ01-20170032189', phone: '98250 34567', vehicle: 'GJ-01-EF-9012', experience: '15 yrs', documents: 'Complete', bloodGroup: 'A+' },
  { id: 'DRV-004', name: 'Suresh Parmar', license: 'GJ01-20200091245', phone: '98250 45678', vehicle: 'GJ-01-GH-3456', experience: '6 yrs', documents: 'Pending', bloodGroup: 'AB+' },
  { id: 'DRV-005', name: 'Dinesh Raval', license: 'GJ01-20160054378', phone: '98250 56789', vehicle: 'GJ-01-IJ-7890', experience: '18 yrs', documents: 'Complete', bloodGroup: 'O-' },
  { id: 'DRV-006', name: 'Jayesh Patel', license: 'GJ01-20210012567', phone: '98250 67890', vehicle: 'GJ-01-KL-2345', experience: '5 yrs', documents: 'Complete', bloodGroup: 'B+' },
  { id: 'DRV-007', name: 'Prakash Bhatt', license: 'GJ01-20150089034', phone: '98250 78901', vehicle: 'GJ-01-MN-6789', experience: '20 yrs', documents: 'Complete', bloodGroup: 'A-' },
  { id: 'DRV-008', name: 'Ketan Joshi', license: 'GJ01-20220045890', phone: '98250 89012', vehicle: 'GJ-01-OP-1122', experience: '3 yrs', documents: 'Pending', bloodGroup: 'O+' },
];

const mockGPSVehicles = [
  { vehicle: 'GJ-01-AB-1234', route: 'Satellite', speed: '35 km/h', lastStop: 'Jodhpur Cross Roads', nextStop: 'Satellite Circle', eta: '7:42 AM', progress: 75, status: 'Running' },
  { vehicle: 'GJ-01-CD-5678', route: 'Prahlad Nagar', speed: '28 km/h', lastStop: 'Prahlad Nagar Garden', nextStop: 'Thaltej Cross Roads', eta: '7:38 AM', progress: 60, status: 'Running' },
  { vehicle: 'GJ-01-EF-9012', route: 'SG Highway', speed: '42 km/h', lastStop: 'Bodakdev', nextStop: 'Judges Bungalow', eta: '7:50 AM', progress: 45, status: 'Running' },
  { vehicle: 'GJ-01-GH-3456', route: 'Maninagar', speed: '0 km/h', lastStop: 'Isanpur Circle', nextStop: 'Maninagar Station', eta: '7:35 AM', progress: 30, status: 'Stopped' },
  { vehicle: 'GJ-01-IJ-7890', route: 'Navrangpura', speed: '22 km/h', lastStop: 'Paldi', nextStop: 'Navrangpura BRTS', eta: '7:30 AM', progress: 85, status: 'Running' },
  { vehicle: 'GJ-01-KL-2345', route: 'Chandkheda', speed: '38 km/h', lastStop: 'Motera Stadium', nextStop: 'Chandkheda BRTS', eta: '7:55 AM', progress: 40, status: 'Running' },
  { vehicle: 'GJ-01-OP-1122', route: 'Bopal', speed: '30 km/h', lastStop: 'South Bopal', nextStop: 'Bopal Cross Roads', eta: '7:40 AM', progress: 65, status: 'Running' },
];

const mockStudentsByRoute = [
  { route: 'Satellite', students: [
    { id: 'STU-101', name: 'Arjun Mehta', class: '8-A', stop: 'Jodhpur Cross Roads', pickup: '6:50 AM', phone: '98250 11111' },
    { id: 'STU-102', name: 'Priya Sharma', class: '6-B', stop: 'Satellite Circle', pickup: '6:55 AM', phone: '98250 11112' },
    { id: 'STU-103', name: 'Rohan Desai', class: '9-A', stop: 'Shyamal Cross Roads', pickup: '7:00 AM', phone: '98250 11113' },
    { id: 'STU-104', name: 'Ananya Patel', class: '5-C', stop: 'Prernatirth Derasar', pickup: '7:05 AM', phone: '98250 11114' },
    { id: 'STU-105', name: 'Vivaan Shah', class: '7-A', stop: 'Judges Bungalow', pickup: '7:10 AM', phone: '98250 11115' },
  ]},
  { route: 'Prahlad Nagar', students: [
    { id: 'STU-201', name: 'Ishaan Joshi', class: '10-A', stop: 'Prahlad Nagar Garden', pickup: '6:55 AM', phone: '98250 22221' },
    { id: 'STU-202', name: 'Kavya Trivedi', class: '4-B', stop: 'Thaltej Cross Roads', pickup: '7:00 AM', phone: '98250 22222' },
    { id: 'STU-203', name: 'Aditya Pandya', class: '8-C', stop: 'Sola Bridge', pickup: '7:05 AM', phone: '98250 22223' },
    { id: 'STU-204', name: 'Nisha Raval', class: '6-A', stop: 'Sandesh Press Road', pickup: '7:10 AM', phone: '98250 22224' },
  ]},
  { route: 'SG Highway', students: [
    { id: 'STU-301', name: 'Dev Chauhan', class: '9-B', stop: 'Bodakdev Circle', pickup: '6:35 AM', phone: '98250 33331' },
    { id: 'STU-302', name: 'Riya Bhatt', class: '7-C', stop: 'Pakwan Cross Roads', pickup: '6:42 AM', phone: '98250 33332' },
    { id: 'STU-303', name: 'Aarav Nair', class: '5-A', stop: 'Rajpath Club', pickup: '6:48 AM', phone: '98250 33333' },
    { id: 'STU-304', name: 'Meera Iyer', class: '10-B', stop: 'Sola Overbridge', pickup: '6:55 AM', phone: '98250 33334' },
    { id: 'STU-305', name: 'Kabir Rao', class: '3-B', stop: 'Gota Cross Roads', pickup: '7:02 AM', phone: '98250 33335' },
    { id: 'STU-306', name: 'Sanya Modi', class: '8-A', stop: 'Vaishnodevi Circle', pickup: '7:08 AM', phone: '98250 33336' },
  ]},
  { route: 'Maninagar', students: [
    { id: 'STU-401', name: 'Harsh Panchal', class: '6-A', stop: 'Isanpur Circle', pickup: '6:45 AM', phone: '98250 44441' },
    { id: 'STU-402', name: 'Pooja Thakor', class: '9-C', stop: 'Maninagar Station', pickup: '6:52 AM', phone: '98250 44442' },
    { id: 'STU-403', name: 'Yash Solanki', class: '4-A', stop: 'Kagdapith', pickup: '7:00 AM', phone: '98250 44443' },
  ]},
  { route: 'Navrangpura', students: [
    { id: 'STU-501', name: 'Tanvi Vyas', class: '7-B', stop: 'Paldi', pickup: '7:05 AM', phone: '98250 55551' },
    { id: 'STU-502', name: 'Dhruv Parikh', class: '10-A', stop: 'Navrangpura BRTS', pickup: '7:12 AM', phone: '98250 55552' },
    { id: 'STU-503', name: 'Shreya Dave', class: '5-B', stop: 'CG Road', pickup: '7:18 AM', phone: '98250 55553' },
  ]},
  { route: 'Chandkheda', students: [
    { id: 'STU-601', name: 'Mihir Acharya', class: '8-B', stop: 'Motera Stadium', pickup: '6:40 AM', phone: '98250 66661' },
    { id: 'STU-602', name: 'Aishwarya Gajjar', class: '6-C', stop: 'Chandkheda BRTS', pickup: '6:48 AM', phone: '98250 66662' },
    { id: 'STU-603', name: 'Parth Rana', class: '9-A', stop: 'Sabarmati', pickup: '6:55 AM', phone: '98250 66663' },
    { id: 'STU-604', name: 'Diya Kothari', class: '3-A', stop: 'Kali Circle', pickup: '7:02 AM', phone: '98250 66664' },
  ]},
  { route: 'Bopal', students: [
    { id: 'STU-801', name: 'Arnav Shukla', class: '7-A', stop: 'South Bopal', pickup: '6:50 AM', phone: '98250 88881' },
    { id: 'STU-802', name: 'Kiara Jain', class: '5-C', stop: 'Bopal Cross Roads', pickup: '6:58 AM', phone: '98250 88882' },
    { id: 'STU-803', name: 'Vihan Thakkar', class: '10-C', stop: 'Ghuma', pickup: '7:05 AM', phone: '98250 88883' },
  ]},
];

const mockMaintenance = [
  { id: 'MNT-001', vehicle: 'GJ-01-MN-6789', type: 'Engine Overhaul', date: '2026-02-10', cost: '₹45,000', nextDue: '2026-08-10', vendor: 'Tata Motors Service, Naroda', status: 'In Progress' },
  { id: 'MNT-002', vehicle: 'GJ-01-AB-1234', type: 'Tyre Replacement (4x)', date: '2026-02-05', cost: '₹32,000', nextDue: '2027-02-05', vendor: 'Apollo Tyres, Narol', status: 'Completed' },
  { id: 'MNT-003', vehicle: 'GJ-01-EF-9012', type: 'AC Service', date: '2026-01-28', cost: '₹8,500', nextDue: '2026-07-28', vendor: 'CoolAir Services, SG Highway', status: 'Completed' },
  { id: 'MNT-004', vehicle: 'GJ-01-CD-5678', type: 'Brake Pad Replacement', date: '2026-01-20', cost: '₹12,000', nextDue: '2026-07-20', vendor: 'Maruti Service Center, Prahladnagar', status: 'Completed' },
  { id: 'MNT-005', vehicle: 'GJ-01-GH-3456', type: 'Oil Change + Filter', date: '2026-01-15', cost: '₹4,200', nextDue: '2026-04-15', vendor: 'Quick Lube, Maninagar', status: 'Completed' },
  { id: 'MNT-006', vehicle: 'GJ-01-KL-2345', type: 'Battery Replacement', date: '2026-01-10', cost: '₹9,800', nextDue: '2028-01-10', vendor: 'Exide Battery Point, Motera', status: 'Completed' },
  { id: 'MNT-007', vehicle: 'GJ-01-OP-1122', type: 'Full Body Wash + Polish', date: '2026-01-08', cost: '₹2,500', nextDue: '2026-04-08', vendor: 'Sparkle Auto Spa, Bopal', status: 'Completed' },
  { id: 'MNT-008', vehicle: 'GJ-01-IJ-7890', type: 'GPS Device Repair', date: '2026-01-05', cost: '₹3,800', nextDue: 'N/A', vendor: 'TechTrack Solutions, CG Road', status: 'Completed' },
];

// ─── MAIN COMPONENT ─────────────────────────────────

function TransportHeadDashboard({ theme, themeIdx, onThemeChange }: { theme?: Theme; themeIdx?: number; onThemeChange?: (idx: number) => void }) {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  if (!theme) return null;

  return (
    <div className="flex gap-4 -m-6">
      {/* Module sidebar */}
      <div className={`${sidebarCollapsed ? 'w-14' : 'w-48'} ${theme.cardBg} border-r ${theme.border} min-h-screen p-2 space-y-0.5 shrink-0 transition-all duration-200`}>
        <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} px-2 py-2`}>
          {!sidebarCollapsed && <p className={`text-[10px] font-bold ${theme.iconColor} uppercase px-1`}>Modules</p>}
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className={`p-1 rounded-lg ${theme.buttonHover} ${theme.iconColor} transition-all`}>
            {sidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={14} />}
          </button>
        </div>
        {modules.map(m => (
          <button
            key={m.id}
            onClick={() => setActiveModule(m.id)}
            title={sidebarCollapsed ? m.label : undefined}
            className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2 py-2.5' : 'gap-2 px-3 py-2'} rounded-lg text-xs font-medium transition-all ${
              activeModule === m.id ? `${theme.primary} text-white` : `${theme.iconColor} ${theme.buttonHover}`
            }`}
          >
            <m.icon size={sidebarCollapsed ? 18 : 14} /> {!sidebarCollapsed && m.label}
          </button>
        ))}
      </div>

      {/* Module content */}
      <div className="flex-1 p-6 space-y-4 overflow-x-hidden">
        {activeModule === 'dashboard' && <DashboardHome theme={theme} onProfileClick={() => setActiveModule('profile')} />}
        {activeModule === 'routes' && <RoutesModule theme={theme} />}
        {activeModule === 'vehicles' && <VehiclesModule theme={theme} />}
        {activeModule === 'drivers' && <DriversModule theme={theme} />}
        {activeModule === 'gps-tracking' && <GPSTrackingModule theme={theme} />}
        {activeModule === 'students-by-route' && <StudentsByRouteModule theme={theme} />}
        {activeModule === 'maintenance' && <MaintenanceModule theme={theme} />}
        {activeModule === 'profile' && <StakeholderProfile role="transport-head" theme={theme} onClose={() => setActiveModule('dashboard')} themeIdx={themeIdx} onThemeChange={onThemeChange} />}
      </div>
    </div>
  );
}

// ─── DASHBOARD HOME ─────────────────────────────────

function DashboardHome({ theme, onProfileClick }: { theme: Theme; onProfileClick: () => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Transport Dashboard</h1>
        <button onClick={onProfileClick} title="My Profile" className={`w-9 h-9 rounded-full ${theme.primary} text-white flex items-center justify-center text-xs font-bold hover:opacity-90 transition-opacity`}>MI</button>
      </div>

      {/* Stats Row 1 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Bus} label="Total Vehicles" value={8} color="bg-blue-500" theme={theme} />
        <StatCard icon={Route} label="Active Routes" value={7} color="bg-emerald-500" sub="1 under maintenance" theme={theme} />
        <StatCard icon={Users} label="Students Using Transport" value={301} color="bg-indigo-500" theme={theme} />
        <StatCard icon={Navigation} label="Vehicles On Road" value={7} color="bg-teal-500" sub="all running on time" theme={theme} />
      </div>

      {/* Stats Row 2 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={User} label="Drivers Present" value="8/8" color="bg-purple-500" sub="100% attendance" theme={theme} />
        <StatCard icon={CheckCircle} label="Trips Completed Today" value={14} color="bg-emerald-500" sub="7 morning + 7 pickup" theme={theme} />
        <StatCard icon={AlertTriangle} label="Maintenance Due" value={2} color="bg-amber-500" sub="next 30 days" theme={theme} />
        <StatCard icon={IndianRupee} label="Monthly Fuel Cost" value="₹1.85L" color="bg-orange-500" sub="Feb 2026" theme={theme} />
      </div>

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

      {/* Quick Actions */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { label: 'Add Vehicle', icon: Plus, color: 'bg-blue-500' },
            { label: 'Add Route', icon: Route, color: 'bg-emerald-500' },
            { label: 'Log Maintenance', icon: Wrench, color: 'bg-amber-500' },
            { label: 'View Reports', icon: BarChart3, color: 'bg-purple-500' },
          ].map(a => (
            <button key={a.label} className={`flex items-center gap-2 p-3 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} transition-all`}>
              <div className={`w-8 h-8 rounded-lg ${a.color} flex items-center justify-center text-white`}><a.icon size={14} /></div>
              <span className={`text-xs font-bold ${theme.highlight}`}>{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity + Task Tracker — Side by Side */}
      <div className="grid grid-cols-2 gap-4">
        {/* Recent Activity */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Recent Activity</h3>
          <div className="space-y-2">
            {[
              { text: 'GJ-01-MN-6789 (Vastral route) sent for engine overhaul at Tata Motors Service', time: '2 hours ago', type: 'maintenance' },
              { text: 'All morning pickup trips completed - 7/7 routes on time', time: '8:15 AM', type: 'trip' },
              { text: 'New student Aarohi Patel (Class 3-B) added to Satellite route', time: 'Yesterday', type: 'student' },
              { text: 'PUC renewal completed for GJ-01-KL-2345 (Chandkheda route)', time: 'Yesterday', type: 'document' },
              { text: 'Driver Suresh Parmar documents pending - license renewal due Mar 2026', time: '2 days ago', type: 'alert' },
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

// ─── ROUTES MODULE ──────────────────────────────────

function RoutesModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All Routes');
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Route Management</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> Add Route</button>
      </div>
      <TabBar tabs={['All Routes', 'Active', 'Under Maintenance']} active={tab} onChange={setTab} theme={theme} />
      <div className="flex gap-3">
        <SearchBar placeholder="Search by route name, area, driver..." theme={theme} icon={Search} />
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Filter size={12} /> Filter</button>
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Download size={12} /> Export</button>
      </div>

      <DataTable
        headers={['Route ID', 'Route Name', 'Area Coverage', 'Stops', 'Students', 'Driver', 'Vehicle', 'Timing', 'Status', '']}
        rows={mockRoutes
          .filter(r => tab === 'All Routes' || (tab === 'Active' && r.status === 'Active') || (tab === 'Under Maintenance' && r.status === 'Maintenance'))
          .map(r => [
            <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{r.id}</span>,
            <span key="name" className={`font-bold ${theme.highlight}`}>{r.name}</span>,
            <span key="area" className={theme.iconColor}>{r.area}</span>,
            <span key="stops" className={theme.iconColor}>{r.stops}</span>,
            <span key="students" className={`font-bold ${theme.highlight}`}>{r.students}</span>,
            <span key="driver" className={theme.iconColor}>{r.driver}</span>,
            <span key="vehicle" className={`font-mono text-xs ${theme.iconColor}`}>{r.vehicle}</span>,
            <span key="timing" className={`text-xs ${theme.iconColor}`}>{r.timing}</span>,
            <StatusBadge key="status" status={r.status} theme={theme} />,
            <div key="actions" className="flex gap-1">
              <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
              <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Edit size={12} className={theme.iconColor} /></button>
            </div>
          ])}
        theme={theme}
      />

      {/* Route Map Placeholder */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Route Map Overview</h3>
        <div className={`w-full h-64 rounded-xl ${theme.secondaryBg} border ${theme.border} flex items-center justify-center`}>
          <div className="text-center">
            <MapPin size={32} className={theme.iconColor} />
            <p className={`text-sm ${theme.iconColor} mt-2`}>Interactive Route Map</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Google Maps integration will display all {mockRoutes.length} routes with stops</p>
          </div>
        </div>
      </div>

      <div className={`flex items-center justify-between text-xs ${theme.iconColor} px-2`}>
        <span>Showing {mockRoutes.filter(r => tab === 'All Routes' || (tab === 'Active' && r.status === 'Active') || (tab === 'Under Maintenance' && r.status === 'Maintenance')).length} of {mockRoutes.length} routes</span>
        <div className="flex gap-1">
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Previous</button>
          <button className={`px-3 py-1.5 rounded-lg ${theme.primary} text-white`}>1</button>
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Next</button>
        </div>
      </div>
    </div>
  );
}

// ─── VEHICLES MODULE ────────────────────────────────

function VehiclesModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All Vehicles');
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Vehicle Fleet</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> Add Vehicle</button>
      </div>
      <TabBar tabs={['All Vehicles', 'Bus', 'Van', 'Under Maintenance']} active={tab} onChange={setTab} theme={theme} />
      <div className="flex gap-3">
        <SearchBar placeholder="Search by vehicle number, driver, route..." theme={theme} icon={Search} />
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Filter size={12} /> Filter</button>
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Download size={12} /> Export</button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Bus} label="Total Fleet" value={8} color="bg-blue-500" theme={theme} />
        <StatCard icon={CheckCircle} label="Active Vehicles" value={7} color="bg-emerald-500" theme={theme} />
        <StatCard icon={Wrench} label="Under Maintenance" value={1} color="bg-amber-500" theme={theme} />
        <StatCard icon={Gauge} label="Total KM Logged" value="3.22L" color="bg-indigo-500" sub="all vehicles" theme={theme} />
      </div>

      <DataTable
        headers={['Vehicle No.', 'Type', 'Capacity', 'Driver', 'Route', 'KM Run', 'Insurance', 'PUC', 'Fitness', 'Status', '']}
        rows={mockVehicles
          .filter(v => tab === 'All Vehicles' || (tab === 'Bus' && v.type === 'Bus') || (tab === 'Van' && v.type === 'Van') || (tab === 'Under Maintenance' && v.status === 'Maintenance'))
          .map(v => [
            <span key="id" className={`font-mono text-xs font-bold ${theme.highlight}`}>{v.id}</span>,
            <span key="type" className={`text-xs px-2 py-0.5 rounded-full font-bold ${v.type === 'Bus' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>{v.type}</span>,
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
        <span>Showing {mockVehicles.filter(v => tab === 'All Vehicles' || (tab === 'Bus' && v.type === 'Bus') || (tab === 'Van' && v.type === 'Van') || (tab === 'Under Maintenance' && v.status === 'Maintenance')).length} of {mockVehicles.length} vehicles</span>
        <div className="flex gap-1">
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Previous</button>
          <button className={`px-3 py-1.5 rounded-lg ${theme.primary} text-white`}>1</button>
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Next</button>
        </div>
      </div>
    </div>
  );
}

// ─── DRIVERS MODULE ─────────────────────────────────

function DriversModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All Drivers');
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Driver Management</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> Add Driver</button>
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

      {/* Driver Attendance Card */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Today&apos;s Driver Attendance</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {mockDrivers.map((d, i) => (
            <div key={i} className={`p-3 rounded-xl ${theme.accentBg} border ${theme.border} flex items-center gap-3`}>
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle size={14} className="text-emerald-600" />
              </div>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>{d.name.split(' ')[0]}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Checked in 6:30 AM</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`flex items-center justify-between text-xs ${theme.iconColor} px-2`}>
        <span>Showing {mockDrivers.filter(d => tab === 'All Drivers' || (tab === 'Documents Complete' && d.documents === 'Complete') || (tab === 'Documents Pending' && d.documents === 'Pending')).length} of {mockDrivers.length} drivers</span>
        <div className="flex gap-1">
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Previous</button>
          <button className={`px-3 py-1.5 rounded-lg ${theme.primary} text-white`}>1</button>
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Next</button>
        </div>
      </div>
    </div>
  );
}

// ─── GPS TRACKING MODULE ────────────────────────────

function GPSTrackingModule({ theme }: { theme: Theme }) {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Live GPS Tracking</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className={`text-xs ${theme.iconColor}`}>Live</span>
          </div>
          <span className={`text-xs ${theme.iconColor}`}>Last updated: 7:35 AM</span>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Navigation} label="Running" value={6} color="bg-emerald-500" theme={theme} />
        <StatCard icon={CircleDot} label="Stopped" value={1} color="bg-red-500" theme={theme} />
        <StatCard icon={Wrench} label="In Garage" value={1} color="bg-amber-500" sub="maintenance" theme={theme} />
        <StatCard icon={Timer} label="Avg Speed" value="32 km/h" color="bg-blue-500" theme={theme} />
      </div>

      {/* Map Placeholder */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Live Map View</h3>
        <div className={`w-full h-80 rounded-xl ${theme.secondaryBg} border ${theme.border} relative overflow-hidden`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Navigation size={40} className={theme.iconColor} />
              <p className={`text-sm ${theme.iconColor} mt-2`}>Live GPS Map</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Google Maps with real-time vehicle positions</p>
            </div>
          </div>
          {/* Simulated vehicle dots */}
          <div className="absolute top-[20%] left-[30%] w-3 h-3 bg-emerald-500 rounded-full animate-pulse" title="GJ-01-AB-1234" />
          <div className="absolute top-[40%] left-[55%] w-3 h-3 bg-emerald-500 rounded-full animate-pulse" title="GJ-01-CD-5678" />
          <div className="absolute top-[60%] left-[25%] w-3 h-3 bg-emerald-500 rounded-full animate-pulse" title="GJ-01-EF-9012" />
          <div className="absolute top-[35%] left-[70%] w-3 h-3 bg-red-500 rounded-full" title="GJ-01-GH-3456 - Stopped" />
          <div className="absolute top-[75%] left-[45%] w-3 h-3 bg-emerald-500 rounded-full animate-pulse" title="GJ-01-IJ-7890" />
          <div className="absolute top-[15%] left-[65%] w-3 h-3 bg-emerald-500 rounded-full animate-pulse" title="GJ-01-KL-2345" />
          <div className="absolute top-[50%] left-[80%] w-3 h-3 bg-emerald-500 rounded-full animate-pulse" title="GJ-01-OP-1122" />
        </div>
      </div>

      {/* Vehicle Tracking Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockGPSVehicles.map((v, i) => (
          <div
            key={i}
            onClick={() => setSelectedVehicle(v.vehicle === selectedVehicle ? null : v.vehicle)}
            className={`${theme.cardBg} rounded-2xl border ${v.vehicle === selectedVehicle ? 'border-emerald-400 ring-1 ring-emerald-400' : theme.border} p-4 cursor-pointer transition-all`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg ${v.status === 'Running' ? 'bg-emerald-100' : 'bg-red-100'} flex items-center justify-center`}>
                  <Bus size={14} className={v.status === 'Running' ? 'text-emerald-600' : 'text-red-600'} />
                </div>
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>{v.vehicle}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{v.route} Route</p>
                </div>
              </div>
              <StatusBadge status={v.status === 'Running' ? 'Active' : 'Overdue'} theme={theme} />
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className={`p-2 rounded-lg ${theme.accentBg}`}>
                <p className={`text-[10px] ${theme.iconColor}`}>Speed</p>
                <p className={`text-xs font-bold ${theme.highlight}`}>{v.speed}</p>
              </div>
              <div className={`p-2 rounded-lg ${theme.accentBg}`}>
                <p className={`text-[10px] ${theme.iconColor}`}>ETA to School</p>
                <p className={`text-xs font-bold ${theme.highlight}`}>{v.eta}</p>
              </div>
            </div>

            <div className="mb-2">
              <div className="flex justify-between mb-1">
                <span className={`text-[10px] ${theme.iconColor}`}>Route Progress</span>
                <span className={`text-[10px] font-bold ${theme.primaryText}`}>{v.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className={`h-2 rounded-full ${v.status === 'Running' ? 'bg-emerald-500' : 'bg-red-400'}`} style={{ width: `${v.progress}%` }} />
              </div>
            </div>

            <div className="flex justify-between">
              <span className={`text-[10px] ${theme.iconColor}`}>Last: {v.lastStop}</span>
              <span className={`text-[10px] ${theme.iconColor}`}>Next: {v.nextStop}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── STUDENTS BY ROUTE MODULE ───────────────────────

function StudentsByRouteModule({ theme }: { theme: Theme }) {
  const [selectedRoute, setSelectedRoute] = useState('Satellite');
  const routeData = mockStudentsByRoute.find(r => r.route === selectedRoute);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Students by Route</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> Assign Student</button>
      </div>

      {/* Route Selector */}
      <div className={`flex gap-1 p-1 ${theme.secondaryBg} rounded-xl overflow-x-auto`}>
        {mockStudentsByRoute.map(r => (
          <button
            key={r.route}
            onClick={() => setSelectedRoute(r.route)}
            className={`px-4 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-all ${
              selectedRoute === r.route ? `${theme.cardBg} ${theme.highlight} shadow-sm` : theme.iconColor
            }`}
          >
            {r.route} ({r.students.length})
          </button>
        ))}
      </div>

      {/* Route Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={MapPin} label="Route" value={selectedRoute} color="bg-blue-500" theme={theme} />
        <StatCard icon={Users} label="Students" value={routeData?.students.length || 0} color="bg-emerald-500" theme={theme} />
        <StatCard icon={MapPinned} label="Stops" value={mockRoutes.find(r => r.name === selectedRoute)?.stops || 0} color="bg-purple-500" theme={theme} />
        <StatCard icon={Clock} label="Timing" value={mockRoutes.find(r => r.name === selectedRoute)?.timing || '-'} color="bg-amber-500" theme={theme} />
      </div>

      <div className="flex gap-3">
        <SearchBar placeholder="Search student by name, class, stop..." theme={theme} icon={Search} />
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Filter size={12} /> Filter</button>
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Download size={12} /> Export</button>
      </div>

      {routeData && (
        <DataTable
          headers={['Student ID', 'Name', 'Class', 'Pickup Stop', 'Pickup Time', 'Parent Phone', '']}
          rows={routeData.students.map(s => [
            <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{s.id}</span>,
            <span key="name" className={`font-bold ${theme.highlight}`}>{s.name}</span>,
            <span key="class" className={theme.iconColor}>{s.class}</span>,
            <div key="stop" className="flex items-center gap-1">
              <MapPin size={10} className={theme.iconColor} />
              <span className={theme.iconColor}>{s.stop}</span>
            </div>,
            <span key="time" className={`font-bold ${theme.primaryText}`}>{s.pickup}</span>,
            <span key="phone" className={theme.iconColor}>{s.phone}</span>,
            <div key="actions" className="flex gap-1">
              <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
              <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Edit size={12} className={theme.iconColor} /></button>
              <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Phone size={12} className={theme.iconColor} /></button>
            </div>
          ])}
          theme={theme}
        />
      )}

      {/* Route Driver Info */}
      {routeData && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Route Driver & Vehicle</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-3 rounded-xl ${theme.accentBg} border ${theme.border}`}>
              <p className={`text-[10px] ${theme.iconColor} uppercase font-bold mb-1`}>Driver</p>
              <p className={`text-sm font-bold ${theme.highlight}`}>{mockRoutes.find(r => r.name === selectedRoute)?.driver}</p>
              <p className={`text-xs ${theme.iconColor}`}>Phone: {mockDrivers.find(d => d.name === mockRoutes.find(r => r.name === selectedRoute)?.driver)?.phone || 'N/A'}</p>
            </div>
            <div className={`p-3 rounded-xl ${theme.accentBg} border ${theme.border}`}>
              <p className={`text-[10px] ${theme.iconColor} uppercase font-bold mb-1`}>Vehicle</p>
              <p className={`text-sm font-bold ${theme.highlight}`}>{mockRoutes.find(r => r.name === selectedRoute)?.vehicle}</p>
              <p className={`text-xs ${theme.iconColor}`}>Capacity: {mockVehicles.find(v => v.id === mockRoutes.find(r => r.name === selectedRoute)?.vehicle)?.capacity || 'N/A'} seats</p>
            </div>
          </div>
        </div>
      )}

      <div className={`flex items-center justify-between text-xs ${theme.iconColor} px-2`}>
        <span>Showing {routeData?.students.length || 0} students on {selectedRoute} route</span>
        <div className="flex gap-1">
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Previous</button>
          <button className={`px-3 py-1.5 rounded-lg ${theme.primary} text-white`}>1</button>
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Next</button>
        </div>
      </div>
    </div>
  );
}

// ─── MAINTENANCE MODULE ─────────────────────────────

function MaintenanceModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All Records');
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Vehicle Maintenance</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> Log Maintenance</button>
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
            { vehicle: 'GJ-01-OP-1122', service: 'Full Body Wash + Polish', due: 'Apr 8, 2026', urgency: 'Normal' },
            { vehicle: 'GJ-01-EF-9012', service: 'PUC Renewal', due: 'Apr 10, 2026', urgency: 'Normal' },
            { vehicle: 'GJ-01-GH-3456', service: 'Oil Change + Filter', due: 'Apr 15, 2026', urgency: 'Normal' },
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
    </div>
  );
}

// ─── EXPORT ─────────────────────────────────────────
export default function Page() {
  return (
    <BlueprintLayout>
      <TransportHeadDashboard />
    </BlueprintLayout>
  );
}
