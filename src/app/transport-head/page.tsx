'use client';

import React, { useState } from 'react';
import BlueprintLayout from '@/components/BlueprintLayout';
import { StatCard, TabBar, StatusBadge, SearchBar, DataTable, Toggle } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import StakeholderProfile from '@/components/StakeholderProfile';
import TaskTrackerPanel from '@/components/TaskTrackerPanel';
import { ChatsView } from '@/components/ChatModule';
import SupportModule from '@/components/SupportModule';
import {
  Home, Bus, Route, Car, Users, MapPin, Wrench, Search, Plus, Filter, Download,
  Eye, Edit, Trash2, Phone, Clock, Shield, AlertTriangle, CheckCircle, Navigation,
  Fuel, Calendar, FileText, IndianRupee, User, MapPinned, CircleDot, Timer,
  Gauge, Bell, TrendingUp, ChevronDown, BarChart3, MessageSquare,
  PanelLeftClose, PanelLeftOpen, Headphones, UserCheck, UserPlus, X, GraduationCap
} from 'lucide-react';

// ─── MODULE SIDEBAR ────────────────────────────────
const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'routes', label: 'Routes', icon: Route },
  { id: 'stops', label: 'Stops', icon: MapPinned },
  { id: 'vehicles', label: 'Vehicles', icon: Car },
  { id: 'drivers', label: 'Drivers', icon: Users },
  { id: 'lady-attendant', label: 'Lady Attendants', icon: UserCheck },
  { id: 'driver-assistant', label: 'Driver Assistants', icon: UserPlus },
  { id: 'students', label: 'Students', icon: GraduationCap },
  { id: 'gps-tracking', label: 'GPS Tracking', icon: Navigation },
  { id: 'maintenance', label: 'Maintenance', icon: Wrench },
  { id: 'communication', label: 'Communication', icon: MessageSquare },
  { id: 'support', label: 'Support', icon: Headphones },
];

// ─── MOCK DATA ──────────────────────────────────────

const mockRoutes = [
  { id: 'RT-001', name: 'Route A', area: 'Satellite - Jodhpur', stops: 8, students: 38, driver: 'Ramesh Kumar', vehicle: 'GJ-01-AB-1234', timing: '7:00 AM / 3:30 PM', status: 'Active' },
  { id: 'RT-002', name: 'Route B', area: 'Prahlad Nagar - Thaltej', stops: 12, students: 46, driver: 'Suresh Patel', vehicle: 'GJ-01-CD-5678', timing: '6:45 AM / 3:45 PM', status: 'Active' },
  { id: 'RT-003', name: 'Route C', area: 'SG Highway - Bodakdev', stops: 6, students: 28, driver: 'Mahesh Singh', vehicle: 'GJ-01-EF-9012', timing: '7:15 AM / 3:15 PM', status: 'Active' },
  { id: 'RT-004', name: 'Route D', area: 'Maninagar - Isanpur', stops: 7, students: 38, driver: 'Jayesh Patel', vehicle: 'GJ-01-GH-3456', timing: '6:40 AM / 3:40 PM', status: 'Active' },
  { id: 'RT-005', name: 'Route E', area: 'Navrangpura - Paldi', stops: 5, students: 28, driver: 'Dinesh Raval', vehicle: 'GJ-01-IJ-7890', timing: '7:00 AM / 3:30 PM', status: 'Active' },
  { id: 'RT-006', name: 'Route F', area: 'Chandkheda - Motera', stops: 9, students: 44, driver: 'Prakash Bhatt', vehicle: 'GJ-01-KL-2345', timing: '6:35 AM / 3:35 PM', status: 'Active' },
];

const mockVehicles = [
  { id: 'GJ-01-AB-1234', type: 'Bus', capacity: 40, driver: 'Ramesh Kumar', route: 'Route A', insurance: '2026-08-15', puc: '2026-05-20', fitness: '2027-01-10', km: '45,230', status: 'Active', year: 2022 },
  { id: 'GJ-01-CD-5678', type: 'Bus', capacity: 50, driver: 'Suresh Patel', route: 'Route B', insurance: '2026-11-02', puc: '2026-07-14', fitness: '2027-03-22', km: '38,120', status: 'Active', year: 2021 },
  { id: 'GJ-01-EF-9012', type: 'Mini Bus', capacity: 30, driver: 'Mahesh Singh', route: 'Route C', insurance: '2026-06-30', puc: '2026-04-10', fitness: '2026-12-05', km: '52,870', status: 'Active', year: 2023 },
  { id: 'GJ-01-GH-3456', type: 'Van', capacity: 26, driver: 'Jayesh Patel', route: 'Route D', insurance: '2026-09-18', puc: '2026-06-25', fitness: '2027-02-14', km: '31,450', status: 'Active', year: 2020 },
  { id: 'GJ-01-IJ-7890', type: 'Van', capacity: 26, driver: 'Dinesh Raval', route: 'Route E', insurance: '2026-10-05', puc: '2026-08-01', fitness: '2027-04-20', km: '28,670', status: 'Active', year: 2022 },
  { id: 'GJ-01-KL-2345', type: 'Bus', capacity: 52, driver: 'Prakash Bhatt', route: 'Route F', insurance: '2026-07-22', puc: '2026-03-15', fitness: '2026-11-30', km: '48,910', status: 'Active', year: 2019 },
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

const mockStudentsByRoute = [
  { route: 'Route A', students: [
    { id: 'STU-101', name: 'Arjun Mehta', class: '8-A', stop: 'Jodhpur Cross Roads', pickup: '6:50 AM', phone: '98250 11111' },
    { id: 'STU-102', name: 'Priya Sharma', class: '6-B', stop: 'Satellite Circle', pickup: '6:55 AM', phone: '98250 11112' },
    { id: 'STU-103', name: 'Rohan Desai', class: '9-A', stop: 'Shyamal Cross Roads', pickup: '7:00 AM', phone: '98250 11113' },
    { id: 'STU-104', name: 'Ananya Patel', class: '5-C', stop: 'Prernatirth Derasar', pickup: '7:05 AM', phone: '98250 11114' },
    { id: 'STU-105', name: 'Vivaan Shah', class: '7-A', stop: 'Judges Bungalow', pickup: '7:10 AM', phone: '98250 11115' },
  ]},
  { route: 'Route B', students: [
    { id: 'STU-201', name: 'Ishaan Joshi', class: '10-A', stop: 'Prahlad Nagar Garden', pickup: '6:55 AM', phone: '98250 22221' },
    { id: 'STU-202', name: 'Kavya Trivedi', class: '4-B', stop: 'Thaltej Cross Roads', pickup: '7:00 AM', phone: '98250 22222' },
    { id: 'STU-203', name: 'Aditya Pandya', class: '8-C', stop: 'Sola Bridge', pickup: '7:05 AM', phone: '98250 22223' },
    { id: 'STU-204', name: 'Nisha Raval', class: '6-A', stop: 'Sandesh Press Road', pickup: '7:10 AM', phone: '98250 22224' },
  ]},
  { route: 'Route C', students: [
    { id: 'STU-301', name: 'Dev Chauhan', class: '9-B', stop: 'Bodakdev Circle', pickup: '6:35 AM', phone: '98250 33331' },
    { id: 'STU-302', name: 'Riya Bhatt', class: '7-C', stop: 'Pakwan Cross Roads', pickup: '6:42 AM', phone: '98250 33332' },
    { id: 'STU-303', name: 'Aarav Nair', class: '5-A', stop: 'Rajpath Club', pickup: '6:48 AM', phone: '98250 33333' },
    { id: 'STU-304', name: 'Meera Iyer', class: '10-B', stop: 'Sola Overbridge', pickup: '6:55 AM', phone: '98250 33334' },
  ]},
  { route: 'Route D', students: [
    { id: 'STU-401', name: 'Harsh Panchal', class: '6-A', stop: 'Isanpur Circle', pickup: '6:45 AM', phone: '98250 44441' },
    { id: 'STU-402', name: 'Pooja Thakor', class: '9-C', stop: 'Maninagar Station', pickup: '6:52 AM', phone: '98250 44442' },
    { id: 'STU-403', name: 'Yash Solanki', class: '4-A', stop: 'Kagdapith', pickup: '7:00 AM', phone: '98250 44443' },
  ]},
  { route: 'Route E', students: [
    { id: 'STU-501', name: 'Tanvi Vyas', class: '7-B', stop: 'Paldi', pickup: '7:05 AM', phone: '98250 55551' },
    { id: 'STU-502', name: 'Dhruv Parikh', class: '10-A', stop: 'Navrangpura BRTS', pickup: '7:12 AM', phone: '98250 55552' },
    { id: 'STU-503', name: 'Shreya Dave', class: '5-B', stop: 'CG Road', pickup: '7:18 AM', phone: '98250 55553' },
  ]},
  { route: 'Route F', students: [
    { id: 'STU-601', name: 'Mihir Acharya', class: '8-B', stop: 'Motera Stadium', pickup: '6:40 AM', phone: '98250 66661' },
    { id: 'STU-602', name: 'Aishwarya Gajjar', class: '6-C', stop: 'Chandkheda BRTS', pickup: '6:48 AM', phone: '98250 66662' },
    { id: 'STU-603', name: 'Parth Rana', class: '9-A', stop: 'Sabarmati', pickup: '6:55 AM', phone: '98250 66663' },
    { id: 'STU-604', name: 'Diya Kothari', class: '3-A', stop: 'Kali Circle', pickup: '7:02 AM', phone: '98250 66664' },
  ]},
];

const mockMaintenance = [
  { id: 'MNT-001', vehicle: 'GJ-01-AB-1234', type: 'Tyre Replacement (4x)', date: '2026-02-05', cost: '₹32,000', nextDue: '2027-02-05', vendor: 'Apollo Tyres, Narol', status: 'Completed' },
  { id: 'MNT-002', vehicle: 'GJ-01-EF-9012', type: 'AC Service', date: '2026-01-28', cost: '₹8,500', nextDue: '2026-07-28', vendor: 'CoolAir Services, SG Highway', status: 'Completed' },
  { id: 'MNT-003', vehicle: 'GJ-01-CD-5678', type: 'Brake Pad Replacement', date: '2026-01-20', cost: '₹12,000', nextDue: '2026-07-20', vendor: 'Maruti Service Center, Prahladnagar', status: 'Completed' },
  { id: 'MNT-004', vehicle: 'GJ-01-GH-3456', type: 'Oil Change + Filter', date: '2026-01-15', cost: '₹4,200', nextDue: '2026-04-15', vendor: 'Quick Lube, Maninagar', status: 'Completed' },
  { id: 'MNT-005', vehicle: 'GJ-01-KL-2345', type: 'Battery Replacement', date: '2026-01-10', cost: '₹9,800', nextDue: '2028-01-10', vendor: 'Exide Battery Point, Motera', status: 'Completed' },
  { id: 'MNT-006', vehicle: 'GJ-01-IJ-7890', type: 'GPS Device Repair', date: '2026-01-05', cost: '₹3,800', nextDue: 'N/A', vendor: 'TechTrack Solutions, CG Road', status: 'Completed' },
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
        {activeModule === 'stops' && <StopsModule theme={theme} />}
        {activeModule === 'lady-attendant' && <LadyAttendantModule theme={theme} />}
        {activeModule === 'driver-assistant' && <DriverAssistantModule theme={theme} />}
        {activeModule === 'students' && <TransportStudentsModule theme={theme} />}
        {activeModule === 'maintenance' && <MaintenanceModule theme={theme} />}
        {activeModule === 'communication' && <CommunicationModule theme={theme} />}
        {activeModule === 'support' && <SupportModule theme={theme} role="transport-head" />}
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

// ─── ROUTES MODULE ──────────────────────────────────

function RoutesModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All Routes');
  const [showAddRoute, setShowAddRoute] = useState(false);
  const [selectedRouteStudents, setSelectedRouteStudents] = useState('Route A');
  const [formData, setFormData] = useState({
    name: '', area: '', type: 'both' as 'pickup' | 'drop' | 'both',
    vehicle: '', driver: '', ladyAttendant: '', driverAssistant: '',
    startTime: '07:00', scheduleTime: '15:30', stops: [] as string[], stopSearch: '',
  });
  const routeStudents = mockStudentsByRoute.find(r => r.route === selectedRouteStudents);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Route Management</h1>
        <button onClick={() => setShowAddRoute(true)} className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> Add Route</button>
      </div>
      <TabBar tabs={['All Routes', 'Active', 'Under Maintenance', 'Students by Route']} active={tab} onChange={setTab} theme={theme} />

      {tab === 'Students by Route' ? (
        <div className="space-y-4">
          <div className={`flex gap-1 p-1 ${theme.secondaryBg} rounded-xl overflow-x-auto`}>
            {mockStudentsByRoute.map(r => (
              <button key={r.route} onClick={() => setSelectedRouteStudents(r.route)}
                className={`px-4 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-all ${
                  selectedRouteStudents === r.route ? `${theme.cardBg} ${theme.highlight} shadow-sm` : theme.iconColor
                }`}>{r.route} ({r.students.length})</button>
            ))}
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={MapPin} label="Route" value={selectedRouteStudents} color="bg-blue-500" theme={theme} />
            <StatCard icon={Users} label="Students" value={routeStudents?.students.length || 0} color="bg-emerald-500" theme={theme} />
            <StatCard icon={MapPinned} label="Stops" value={mockRoutes.find(r => r.name === selectedRouteStudents)?.stops || 0} color="bg-purple-500" theme={theme} />
            <StatCard icon={Clock} label="Timing" value={mockRoutes.find(r => r.name === selectedRouteStudents)?.timing || '-'} color="bg-amber-500" theme={theme} />
          </div>
          {routeStudents && (
            <DataTable
              headers={['Student ID', 'Name', 'Class', 'Pickup Stop', 'Pickup Time', 'Parent Phone', '']}
              rows={routeStudents.students.map(s => [
                <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{s.id}</span>,
                <span key="name" className={`font-bold ${theme.highlight}`}>{s.name}</span>,
                <span key="class" className={theme.iconColor}>{s.class}</span>,
                <div key="stop" className="flex items-center gap-1"><MapPin size={10} className={theme.iconColor} /><span className={theme.iconColor}>{s.stop}</span></div>,
                <span key="time" className={`font-bold ${theme.primaryText}`}>{s.pickup}</span>,
                <span key="phone" className={theme.iconColor}>{s.phone}</span>,
                <div key="actions" className="flex gap-1">
                  <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
                  <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Phone size={12} className={theme.iconColor} /></button>
                </div>
              ])}
              theme={theme}
            />
          )}
        </div>
      ) : (
        <>
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
        </>
      )}

      {/* ─── ADD ROUTE FORM (OVERLAY) ─── */}
      {showAddRoute && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-bold ${theme.highlight}`}>Add New Route</h2>
              <button onClick={() => setShowAddRoute(false)} className={`p-2 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Route Name</label>
                <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Route G" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} />
              </div>
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Area Coverage</label>
                <input value={formData.area} onChange={e => setFormData({...formData, area: e.target.value})} placeholder="e.g. Vastrapur - Ambawadi" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} />
              </div>
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Route Type</label>
                <div className="flex gap-2">
                  {(['pickup', 'drop', 'both'] as const).map(t => (
                    <button key={t} onClick={() => setFormData({...formData, type: t})}
                      className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${formData.type === t ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.iconColor}`}`}>
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Vehicle</label>
                <select value={formData.vehicle} onChange={e => setFormData({...formData, vehicle: e.target.value})} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}>
                  <option value="">Select vehicle...</option>
                  {mockVehicles.map(v => <option key={v.id} value={v.id}>{v.id} ({v.type}, {v.capacity} seats)</option>)}
                </select>
              </div>
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Driver</label>
                <select value={formData.driver} onChange={e => setFormData({...formData, driver: e.target.value})} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}>
                  <option value="">Select driver...</option>
                  {mockDrivers.map(d => <option key={d.id} value={d.name}>{d.name} ({d.experience})</option>)}
                </select>
              </div>
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Lady Attendant</label>
                <select value={formData.ladyAttendant} onChange={e => setFormData({...formData, ladyAttendant: e.target.value})} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}>
                  <option value="">Select attendant...</option>
                  {mockLadyAttendants.map(la => <option key={la.id} value={la.name}>{la.name} ({la.experience})</option>)}
                </select>
              </div>
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Driver Assistant</label>
                <select value={formData.driverAssistant} onChange={e => setFormData({...formData, driverAssistant: e.target.value})} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}>
                  <option value="">Select assistant...</option>
                  {mockDriverAssistants.map(da => <option key={da.id} value={da.name}>{da.name} ({da.experience})</option>)}
                </select>
              </div>
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Starting Time</label>
                <input type="time" value={formData.startTime} onChange={e => setFormData({...formData, startTime: e.target.value})} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} />
              </div>
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Schedule / Return Time</label>
                <input type="time" value={formData.scheduleTime} onChange={e => setFormData({...formData, scheduleTime: e.target.value})} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} />
              </div>
            </div>
            <div className="mt-4">
              <label className={`text-xs font-bold ${theme.iconColor} mb-2 block`}>Select Stops</label>
              <input value={formData.stopSearch || ''} onChange={e => setFormData({...formData, stopSearch: e.target.value})} placeholder="Search stops by name, area, landmark..." className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight} mb-2`} />
              <div className="grid grid-cols-2 gap-2 max-h-52 overflow-y-auto">
                {mockStops.filter(s => {
                  const q = (formData.stopSearch || '').toLowerCase();
                  return !q || s.name.toLowerCase().includes(q) || s.area.toLowerCase().includes(q) || s.landmark.toLowerCase().includes(q);
                }).map(s => (
                  <label key={s.id} className={`flex items-center gap-2 p-2 rounded-lg ${theme.accentBg} border ${theme.border} cursor-pointer`}>
                    <input type="checkbox" checked={formData.stops.includes(s.id)} onChange={e => {
                      setFormData({...formData, stops: e.target.checked ? [...formData.stops, s.id] : formData.stops.filter(id => id !== s.id)});
                    }} className="rounded" />
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold ${theme.highlight}`}>{s.name}</p>
                      <p className={`text-[10px] ${theme.iconColor}`}>{s.area} &bull; {s.landmark} &bull; <span className="font-bold">{'\u20B9'}{s.fee}/mo</span></p>
                    </div>
                  </label>
                ))}
              </div>
              {formData.stops.length > 0 && <p className={`text-[10px] ${theme.primaryText} mt-1 font-bold`}>{formData.stops.length} stop(s) selected</p>}
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setShowAddRoute(false)} className={`px-4 py-2 rounded-xl border ${theme.border} text-xs font-bold ${theme.iconColor}`}>Cancel</button>
              <button onClick={() => { setShowAddRoute(false); window.alert('Route created successfully! (Blueprint demo)'); }} className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>Create Route</button>
            </div>
          </div>
        </div>
      )}
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
        <StatCard icon={Navigation} label="Running" value={5} color="bg-emerald-500" theme={theme} />
        <StatCard icon={CircleDot} label="Stopped" value={1} color="bg-red-500" theme={theme} />
        <StatCard icon={Wrench} label="In Garage" value={0} color="bg-amber-500" sub="" theme={theme} />
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
          <div className="absolute top-[20%] left-[30%] w-3 h-3 bg-emerald-500 rounded-full animate-pulse" title="GJ-01-AB-1234 - Route A" />
          <div className="absolute top-[40%] left-[55%] w-3 h-3 bg-emerald-500 rounded-full animate-pulse" title="GJ-01-CD-5678 - Route B" />
          <div className="absolute top-[60%] left-[25%] w-3 h-3 bg-emerald-500 rounded-full animate-pulse" title="GJ-01-EF-9012 - Route C" />
          <div className="absolute top-[35%] left-[70%] w-3 h-3 bg-red-500 rounded-full" title="GJ-01-GH-3456 - Route D - Stopped" />
          <div className="absolute top-[75%] left-[45%] w-3 h-3 bg-emerald-500 rounded-full animate-pulse" title="GJ-01-IJ-7890 - Route E" />
          <div className="absolute top-[15%] left-[65%] w-3 h-3 bg-emerald-500 rounded-full animate-pulse" title="GJ-01-KL-2345 - Route F" />
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
    </div>
  );
}

// ─── STOPS MODULE ───────────────────────────────────

function StopsModule({ theme }: { theme: Theme }) {
  const [showAddStop, setShowAddStop] = useState(false);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Stop Management</h1>
        <button onClick={() => setShowAddStop(true)} className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> Add Stop</button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={MapPinned} label="Total Stops" value={mockStops.length} color="bg-blue-500" theme={theme} />
        <StatCard icon={Route} label="Routes Covered" value={6} color="bg-emerald-500" theme={theme} />
        <StatCard icon={Users} label="Total Students" value={mockStops.reduce((s, st) => s + st.students, 0)} color="bg-indigo-500" theme={theme} />
        <StatCard icon={MapPin} label="Areas" value={new Set(mockStops.map(s => s.area)).size} color="bg-purple-500" theme={theme} />
      </div>
      <div className="flex gap-3">
        <SearchBar placeholder="Search by stop name, area, landmark..." theme={theme} icon={Search} />
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Filter size={12} /> Filter</button>
      </div>
      <DataTable
        headers={['Stop ID', 'Stop Name', 'Area', 'Landmark', 'Routes', 'Students', 'Fee/mo', '']}
        rows={mockStops.map(s => [
          <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{s.id}</span>,
          <span key="name" className={`font-bold ${theme.highlight}`}>{s.name}</span>,
          <span key="area" className={theme.iconColor}>{s.area}</span>,
          <span key="landmark" className={`text-xs ${theme.iconColor}`}>{s.landmark}</span>,
          <span key="routes" className={`text-xs font-bold ${theme.primaryText}`}>{s.routes.join(', ')}</span>,
          <span key="students" className={`font-bold ${theme.highlight}`}>{s.students}</span>,
          <span key="fee" className={`font-bold ${theme.primaryText}`}>{'\u20B9'}{s.fee.toLocaleString()}</span>,
          <div key="actions" className="flex gap-1">
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Edit size={12} className={theme.iconColor} /></button>
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Trash2 size={12} className={theme.iconColor} /></button>
          </div>
        ])}
        theme={theme}
      />
      {showAddStop && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 w-full max-w-md`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-bold ${theme.highlight}`}>Add New Stop</h2>
              <button onClick={() => setShowAddStop(false)} className={`p-2 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
            </div>
            <div className="space-y-3">
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Stop Name</label><input placeholder="e.g. Vastrapur Lake" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Area</label><input placeholder="e.g. Vastrapur" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Landmark</label><input placeholder="e.g. Near lake entrance" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Assign to Route</label>
                <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}>
                  <option value="">Select route...</option>
                  {mockRoutes.map(r => <option key={r.id} value={r.name}>{r.name} — {r.area}</option>)}
                </select>
              </div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Monthly Transport Fee ({'\u20B9'})</label><input type="number" placeholder="e.g. 2500" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowAddStop(false)} className={`px-4 py-2 rounded-xl border ${theme.border} text-xs font-bold ${theme.iconColor}`}>Cancel</button>
              <button onClick={() => { setShowAddStop(false); window.alert('Stop added! (Blueprint demo)'); }} className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>Add Stop</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── LADY ATTENDANT MODULE ──────────────────────────

function LadyAttendantModule({ theme }: { theme: Theme }) {
  const [showAdd, setShowAdd] = useState(false);
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
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 w-full max-w-md`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-bold ${theme.highlight}`}>Add Lady Attendant</h2>
              <button onClick={() => setShowAdd(false)} className={`p-2 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
            </div>
            <div className="space-y-3">
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Full Name</label><input placeholder="e.g. Sunita Devi" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Phone Number</label><input placeholder="e.g. 98250 77777" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Assign to Route</label>
                <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}>
                  <option value="">Select route...</option>
                  {mockRoutes.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
                </select>
              </div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Experience</label><input placeholder="e.g. 3 yrs" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Aadhar Number</label><input placeholder="XXXX XXXX XXXX" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowAdd(false)} className={`px-4 py-2 rounded-xl border ${theme.border} text-xs font-bold ${theme.iconColor}`}>Cancel</button>
              <button onClick={() => { setShowAdd(false); window.alert('Attendant added! (Blueprint demo)'); }} className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>Add Attendant</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── DRIVER ASSISTANT MODULE ────────────────────────

function DriverAssistantModule({ theme }: { theme: Theme }) {
  const [showAdd, setShowAdd] = useState(false);
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
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 w-full max-w-md`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-bold ${theme.highlight}`}>Add Driver Assistant</h2>
              <button onClick={() => setShowAdd(false)} className={`p-2 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
            </div>
            <div className="space-y-3">
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Full Name</label><input placeholder="e.g. Kishan Patel" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Phone Number</label><input placeholder="e.g. 98250 88887" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Assign to Route</label>
                <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}>
                  <option value="">Select route...</option>
                  {mockRoutes.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
                </select>
              </div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Experience</label><input placeholder="e.g. 2 yrs" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Aadhar Number</label><input placeholder="XXXX XXXX XXXX" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} /></div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowAdd(false)} className={`px-4 py-2 rounded-xl border ${theme.border} text-xs font-bold ${theme.iconColor}`}>Cancel</button>
              <button onClick={() => { setShowAdd(false); window.alert('Assistant added! (Blueprint demo)'); }} className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>Add Assistant</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── TRANSPORT STUDENTS MODULE ──────────────────────

function TransportStudentsModule({ theme }: { theme: Theme }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoute, setSelectedRoute] = useState('All');
  const allStudents = mockStudentsByRoute.flatMap(r => r.students.map(s => {
    const stop = mockStops.find(st => st.name === s.stop);
    return { ...s, route: r.route, fee: stop?.fee || 0, stopId: stop?.id || '' };
  }));
  const filtered = allStudents.filter(s => {
    const matchesRoute = selectedRoute === 'All' || s.route === selectedRoute;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || s.name.toLowerCase().includes(q) || s.class.toLowerCase().includes(q) || s.stop.toLowerCase().includes(q) || s.id.toLowerCase().includes(q);
    return matchesRoute && matchesSearch;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Transport Students</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> Enroll Student</button>
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
        headers={['Student ID', 'Name', 'Class', 'Route', 'Pickup Stop', 'Pickup Time', 'Fee/mo', 'Parent Phone', '']}
        rows={filtered.map(s => [
          <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{s.id}</span>,
          <span key="name" className={`font-bold ${theme.highlight}`}>{s.name}</span>,
          <span key="class" className={theme.iconColor}>{s.class}</span>,
          <span key="route" className={`text-xs font-bold ${theme.primaryText}`}>{s.route}</span>,
          <div key="stop" className="flex items-center gap-1"><MapPin size={10} className={theme.iconColor} /><span className={theme.iconColor}>{s.stop}</span></div>,
          <span key="time" className={`font-bold ${theme.primaryText}`}>{s.pickup}</span>,
          <span key="fee" className={`font-bold ${theme.highlight}`}>{s.fee > 0 ? `\u20B9${s.fee.toLocaleString()}` : <span className={`text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-700`}>Not set</span>}</span>,
          <span key="phone" className={theme.iconColor}>{s.phone}</span>,
          <div key="actions" className="flex gap-1">
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`} title="View details"><Eye size={12} className={theme.iconColor} /></button>
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`} title="Edit fee"><Edit size={12} className={theme.iconColor} /></button>
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
    </div>
  );
}

// ─── COMMUNICATION MODULE ────────────────────────────

function CommunicationModule({ theme }: { theme: Theme }) {
  const [commTab, setCommTab] = useState('Chat');
  const tabs = ['Messages', 'Route Alerts', 'Chat'];

  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Communication</h1>
      <TabBar tabs={tabs} active={commTab} onChange={setCommTab} theme={theme} />

      {commTab === 'Chat' && (
        <div className="h-[calc(100vh-220px)]">
          <ChatsView theme={theme} compact />
        </div>
      )}

      {commTab === 'Messages' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-2`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-2`}>Recent Messages</h3>
          {[
            { from: 'Ramesh Kumar (Driver)', text: 'Route A bus has a flat tyre near Jodhpur Cross Roads. Need replacement.', time: '07:45 AM' },
            { from: 'Mrs. Priya Nair (Parent)', text: 'Arjun will not be taking the bus this week. Please note.', time: '08:10 AM' },
            { from: 'Admin Office', text: 'New student added to Route A — pickup from Shyamal Cross Roads.', time: '09:30 AM' },
          ].map((m, i) => (
            <div key={i} className={`p-3 rounded-xl ${theme.accentBg}`}>
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-bold ${theme.highlight}`}>{m.from}</span>
                <span className={`text-[10px] ${theme.iconColor}`}>{m.time}</span>
              </div>
              <p className={`text-xs ${theme.iconColor}`}>{m.text}</p>
            </div>
          ))}
        </div>
      )}

      {commTab === 'Route Alerts' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-2`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-2`}>Route Alerts</h3>
          {[
            { route: 'Route A (RT-001)', alert: 'Bus delayed by 15 min due to traffic at SG Highway', time: '07:30 AM', severity: 'Warning' },
            { route: 'Route D (RT-004)', alert: 'Vehicle stopped at Isanpur Circle — minor engine issue', time: '06:00 AM', severity: 'Critical' },
            { route: 'Route F (RT-006)', alert: 'Alternate route active due to road construction near Motera', time: 'Yesterday', severity: 'Info' },
          ].map((a, i) => (
            <div key={i} className={`p-3 rounded-xl ${theme.accentBg} flex items-center gap-3`}>
              <div className={`w-2 h-2 rounded-full ${a.severity === 'Critical' ? 'bg-red-500' : a.severity === 'Warning' ? 'bg-amber-500' : 'bg-blue-500'}`} />
              <div className="flex-1">
                <p className={`text-xs font-bold ${theme.highlight}`}>{a.route}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{a.alert}</p>
              </div>
              <span className={`text-[10px] ${theme.iconColor}`}>{a.time}</span>
            </div>
          ))}
        </div>
      )}
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
