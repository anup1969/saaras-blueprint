'use client';

import React, { useState } from 'react';
import { StatCard, TabBar, StatusBadge, SearchBar, DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  Route, Users, MapPin, Search, Plus, Filter, Download,
  Eye, Edit, Phone, Clock, MapPinned, X, Zap, TrendingDown, Fuel, Merge, ArrowRight, CheckCircle, RotateCcw
} from 'lucide-react';

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

const mockStudentsByRoute = [
  { route: 'Route A', students: [
    { id: 'STU-101', name: 'Arjun Mehta', class: '8-A', stop: 'Jodhpur Cross Roads', pickup: '6:50 AM', dropStop: 'Jodhpur Cross Roads', dropTime: '3:40 PM', phone: '98250 11111' },
    { id: 'STU-102', name: 'Priya Sharma', class: '6-B', stop: 'Satellite Circle', pickup: '6:55 AM', dropStop: 'Jodhpur Cross Roads', dropTime: '3:45 PM', phone: '98250 11112' },
    { id: 'STU-103', name: 'Rohan Desai', class: '9-A', stop: 'Shyamal Cross Roads', pickup: '7:00 AM', dropStop: 'Shyamal Cross Roads', dropTime: '3:50 PM', phone: '98250 11113' },
    { id: 'STU-104', name: 'Ananya Patel', class: '5-C', stop: 'Prernatirth Derasar', pickup: '7:05 AM', dropStop: 'Satellite Circle', dropTime: '3:55 PM', phone: '98250 11114' },
    { id: 'STU-105', name: 'Vivaan Shah', class: '7-A', stop: 'Judges Bungalow', pickup: '7:10 AM', dropStop: 'Judges Bungalow', dropTime: '4:00 PM', phone: '98250 11115' },
  ]},
  { route: 'Route B', students: [
    { id: 'STU-201', name: 'Ishaan Joshi', class: '10-A', stop: 'Prahlad Nagar Garden', pickup: '6:55 AM', dropStop: 'Prahlad Nagar Garden', dropTime: '3:55 PM', phone: '98250 22221' },
    { id: 'STU-202', name: 'Kavya Trivedi', class: '4-B', stop: 'Thaltej Cross Roads', pickup: '7:00 AM', dropStop: 'Prahlad Nagar Garden', dropTime: '4:00 PM', phone: '98250 22222' },
    { id: 'STU-203', name: 'Aditya Pandya', class: '8-C', stop: 'Sola Bridge', pickup: '7:05 AM', dropStop: 'Sola Bridge', dropTime: '4:05 PM', phone: '98250 22223' },
    { id: 'STU-204', name: 'Nisha Raval', class: '6-A', stop: 'Sandesh Press Road', pickup: '7:10 AM', dropStop: 'Sandesh Press Road', dropTime: '4:10 PM', phone: '98250 22224' },
  ]},
  { route: 'Route C', students: [
    { id: 'STU-301', name: 'Dev Chauhan', class: '9-B', stop: 'Bodakdev Circle', pickup: '6:35 AM', dropStop: 'Bodakdev Circle', dropTime: '3:25 PM', phone: '98250 33331' },
    { id: 'STU-302', name: 'Riya Bhatt', class: '7-C', stop: 'Pakwan Cross Roads', pickup: '6:42 AM', dropStop: 'Bodakdev Circle', dropTime: '3:32 PM', phone: '98250 33332' },
    { id: 'STU-303', name: 'Aarav Nair', class: '5-A', stop: 'Rajpath Club', pickup: '6:48 AM', dropStop: 'Rajpath Club', dropTime: '3:38 PM', phone: '98250 33333' },
    { id: 'STU-304', name: 'Meera Iyer', class: '10-B', stop: 'Sola Overbridge', pickup: '6:55 AM', dropStop: 'Sola Overbridge', dropTime: '3:45 PM', phone: '98250 33334' },
  ]},
  { route: 'Route D', students: [
    { id: 'STU-401', name: 'Harsh Panchal', class: '6-A', stop: 'Isanpur Circle', pickup: '6:45 AM', dropStop: 'Isanpur Circle', dropTime: '3:50 PM', phone: '98250 44441' },
    { id: 'STU-402', name: 'Pooja Thakor', class: '9-C', stop: 'Maninagar Station', pickup: '6:52 AM', dropStop: 'Isanpur Circle', dropTime: '3:57 PM', phone: '98250 44442' },
    { id: 'STU-403', name: 'Yash Solanki', class: '4-A', stop: 'Kagdapith', pickup: '7:00 AM', dropStop: 'Kagdapith', dropTime: '4:05 PM', phone: '98250 44443' },
  ]},
  { route: 'Route E', students: [
    { id: 'STU-501', name: 'Tanvi Vyas', class: '7-B', stop: 'Paldi', pickup: '7:05 AM', dropStop: 'Paldi', dropTime: '3:40 PM', phone: '98250 55551' },
    { id: 'STU-502', name: 'Dhruv Parikh', class: '10-A', stop: 'Navrangpura BRTS', pickup: '7:12 AM', dropStop: 'Paldi', dropTime: '3:47 PM', phone: '98250 55552' },
    { id: 'STU-503', name: 'Shreya Dave', class: '5-B', stop: 'CG Road', pickup: '7:18 AM', dropStop: 'CG Road', dropTime: '3:53 PM', phone: '98250 55553' },
  ]},
  { route: 'Route F', students: [
    { id: 'STU-601', name: 'Mihir Acharya', class: '8-B', stop: 'Motera Stadium', pickup: '6:40 AM', dropStop: 'Motera Stadium', dropTime: '3:45 PM', phone: '98250 66661' },
    { id: 'STU-602', name: 'Aishwarya Gajjar', class: '6-C', stop: 'Chandkheda BRTS', pickup: '6:48 AM', dropStop: 'Motera Stadium', dropTime: '3:53 PM', phone: '98250 66662' },
    { id: 'STU-603', name: 'Parth Rana', class: '9-A', stop: 'Sabarmati', pickup: '6:55 AM', dropStop: 'Sabarmati', dropTime: '4:00 PM', phone: '98250 66663' },
    { id: 'STU-604', name: 'Diya Kothari', class: '3-A', stop: 'Kali Circle', pickup: '7:02 AM', dropStop: 'Kali Circle', dropTime: '4:07 PM', phone: '98250 66664' },
  ]},
];

// ─── ROUTE OPTIMIZATION DATA ────────────────────────
const mockOptimizationData = [
  { route: 'Route A', currentDist: 18.5, optimizedDist: 14.2, currentTime: 52, optimizedTime: 40, fuelCost: 285, optimizedFuel: 220, applied: false },
  { route: 'Route B', currentDist: 24.3, optimizedDist: 19.8, currentTime: 65, optimizedTime: 50, fuelCost: 375, optimizedFuel: 305, applied: false },
  { route: 'Route C', currentDist: 12.8, optimizedDist: 11.1, currentTime: 38, optimizedTime: 32, fuelCost: 198, optimizedFuel: 172, applied: false },
  { route: 'Route D', currentDist: 16.2, optimizedDist: 13.5, currentTime: 45, optimizedTime: 37, fuelCost: 250, optimizedFuel: 209, applied: false },
  { route: 'Route E', currentDist: 10.5, optimizedDist: 9.2, currentTime: 30, optimizedTime: 26, fuelCost: 162, optimizedFuel: 142, applied: false },
  { route: 'Route F', currentDist: 22.1, optimizedDist: 17.6, currentTime: 58, optimizedTime: 44, fuelCost: 341, optimizedFuel: 272, applied: false },
];

const mockRouteSuggestions = [
  { suggestion: 'Merge Route A and Route E', reason: 'Overlapping coverage in Satellite-Navrangpura area. Combined route saves 6.8 km daily.', savings: '6.8 km/day', priority: 'High' },
  { suggestion: 'Reorder stops on Route B', reason: 'Thaltej stop before Prahlad Nagar reduces backtracking by 2.1 km.', savings: '2.1 km/day', priority: 'Medium' },
  { suggestion: 'Split Route F into two', reason: 'Route F covers 22 km with 9 stops. Splitting at Chandkheda reduces max travel time to 30 min.', savings: '14 min/trip', priority: 'High' },
  { suggestion: 'Add Bodakdev stop to Route C', reason: 'Nearby student on Route D can be shifted, reducing Route D load by 3 students.', savings: '1.2 km/day', priority: 'Low' },
];

export default function RoutesModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All Routes');
  const [showAddRoute, setShowAddRoute] = useState(false);
  const [selectedRouteStudents, setSelectedRouteStudents] = useState('Route A');
  const [optimizationData, setOptimizationData] = useState(mockOptimizationData);
  const [optimized, setOptimized] = useState(false);
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
      <TabBar tabs={['All Routes', 'Active', 'Under Maintenance', 'Students by Route', 'Route Optimization']} active={tab} onChange={setTab} theme={theme} />

      {tab === 'Route Optimization' ? (
        <div className="space-y-4">
          {/* Route Map Visualization */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Route Optimization Visualization</h3>
              <button
                onClick={() => {
                  setOptimized(true);
                  setOptimizationData(prev => prev.map(r => ({ ...r })));
                }}
                className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold flex items-center gap-1.5`}
              >
                <Zap size={12} /> Optimize Routes
              </button>
            </div>
            <div className={`w-full h-56 rounded-xl ${theme.secondaryBg} border ${theme.border} relative overflow-hidden`}>
              {/* Simulated map with route paths */}
              <svg className="w-full h-full" viewBox="0 0 500 220" fill="none">
                {/* School marker */}
                <circle cx="250" cy="110" r="8" fill="#3b82f6" stroke="white" strokeWidth="2" />
                <text x="250" y="135" textAnchor="middle" fontSize="8" fill="#6b7280" fontWeight="bold">SCHOOL</text>
                {/* Route lines */}
                <path d="M250 110 L120 40 L60 55 L30 30" stroke="#ef4444" strokeWidth="2.5" strokeDasharray={optimized ? '' : '4 2'} opacity="0.8" />
                <circle cx="120" cy="40" r="4" fill="#ef4444" /><circle cx="60" cy="55" r="4" fill="#ef4444" /><circle cx="30" cy="30" r="4" fill="#ef4444" />
                <text x="30" y="22" fontSize="7" fill="#ef4444" fontWeight="bold">Route A</text>
                <path d="M250 110 L350 40 L420 50 L470 25" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray={optimized ? '' : '4 2'} opacity="0.8" />
                <circle cx="350" cy="40" r="4" fill="#f59e0b" /><circle cx="420" cy="50" r="4" fill="#f59e0b" /><circle cx="470" cy="25" r="4" fill="#f59e0b" />
                <text x="470" y="17" fontSize="7" fill="#f59e0b" fontWeight="bold">Route B</text>
                <path d="M250 110 L180 160 L100 180 L40 195" stroke="#10b981" strokeWidth="2.5" strokeDasharray={optimized ? '' : '4 2'} opacity="0.8" />
                <circle cx="180" cy="160" r="4" fill="#10b981" /><circle cx="100" cy="180" r="4" fill="#10b981" /><circle cx="40" cy="195" r="4" fill="#10b981" />
                <text x="40" y="210" fontSize="7" fill="#10b981" fontWeight="bold">Route C</text>
                <path d="M250 110 L330 160 L400 175 L460 195" stroke="#8b5cf6" strokeWidth="2.5" strokeDasharray={optimized ? '' : '4 2'} opacity="0.8" />
                <circle cx="330" cy="160" r="4" fill="#8b5cf6" /><circle cx="400" cy="175" r="4" fill="#8b5cf6" /><circle cx="460" cy="195" r="4" fill="#8b5cf6" />
                <text x="460" y="210" fontSize="7" fill="#8b5cf6" fontWeight="bold">Route D</text>
                <path d="M250 110 L200 80 L140 95" stroke="#06b6d4" strokeWidth="2.5" strokeDasharray={optimized ? '' : '4 2'} opacity="0.8" />
                <circle cx="200" cy="80" r="4" fill="#06b6d4" /><circle cx="140" cy="95" r="4" fill="#06b6d4" />
                <text x="140" y="115" fontSize="7" fill="#06b6d4" fontWeight="bold">Route E</text>
                <path d="M250 110 L310 85 L380 105 L450 90" stroke="#ec4899" strokeWidth="2.5" strokeDasharray={optimized ? '' : '4 2'} opacity="0.8" />
                <circle cx="310" cy="85" r="4" fill="#ec4899" /><circle cx="380" cy="105" r="4" fill="#ec4899" /><circle cx="450" cy="90" r="4" fill="#ec4899" />
                <text x="450" y="82" fontSize="7" fill="#ec4899" fontWeight="bold">Route F</text>
              </svg>
              {optimized && (
                <div className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-emerald-500 text-white text-[10px] font-bold flex items-center gap-1">
                  <CheckCircle size={10} /> Optimized
                </div>
              )}
              {!optimized && (
                <div className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-amber-100 text-amber-700 text-[10px] font-bold">
                  Dashed = Unoptimized
                </div>
              )}
            </div>
          </div>

          {/* Before/After Comparison */}
          {optimized && (
            <div className="grid grid-cols-3 gap-4">
              <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 text-center`}>
                <TrendingDown size={20} className="text-emerald-500 mx-auto mb-1" />
                <p className={`text-lg font-bold ${theme.highlight}`}>
                  {(optimizationData.reduce((s, r) => s + r.currentDist, 0) - optimizationData.reduce((s, r) => s + r.optimizedDist, 0)).toFixed(1)} km
                </p>
                <p className={`text-[10px] ${theme.iconColor}`}>Total Distance Saved</p>
              </div>
              <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 text-center`}>
                <Clock size={20} className="text-blue-500 mx-auto mb-1" />
                <p className={`text-lg font-bold ${theme.highlight}`}>
                  {optimizationData.reduce((s, r) => s + r.currentTime, 0) - optimizationData.reduce((s, r) => s + r.optimizedTime, 0)} min
                </p>
                <p className={`text-[10px] ${theme.iconColor}`}>Total Time Saved</p>
              </div>
              <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 text-center`}>
                <Fuel size={20} className="text-amber-500 mx-auto mb-1" />
                <p className={`text-lg font-bold ${theme.highlight}`}>
                  {'\u20B9'}{optimizationData.reduce((s, r) => s + r.fuelCost, 0) - optimizationData.reduce((s, r) => s + r.optimizedFuel, 0)}/day
                </p>
                <p className={`text-[10px] ${theme.iconColor}`}>Fuel Cost Savings</p>
              </div>
            </div>
          )}

          {/* Optimization Table */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Route-wise Optimization</h3>
            <DataTable
              headers={['Route', 'Current Distance', 'Optimized Distance', 'Time Saved', 'Fuel Savings', 'Status', '']}
              rows={optimizationData.map((r, idx) => [
                <span key="name" className={`font-bold ${theme.highlight}`}>{r.route}</span>,
                <span key="curr" className={theme.iconColor}>{r.currentDist} km ({r.currentTime} min)</span>,
                <span key="opt" className={`font-bold text-emerald-600`}>{r.optimizedDist} km ({r.optimizedTime} min)</span>,
                <span key="time" className="text-xs font-bold text-blue-600">{r.currentTime - r.optimizedTime} min</span>,
                <span key="fuel" className="text-xs font-bold text-amber-600">{'\u20B9'}{r.fuelCost - r.optimizedFuel}</span>,
                r.applied ? (
                  <span key="status" className="text-xs px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-700">Applied</span>
                ) : optimized ? (
                  <span key="status" className="text-xs px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-700">Ready</span>
                ) : (
                  <span key="status" className={`text-xs ${theme.iconColor}`}>-</span>
                ),
                <div key="actions">
                  {optimized && !r.applied && (
                    <button
                      onClick={() => {
                        const updated = [...optimizationData];
                        updated[idx] = { ...updated[idx], applied: true };
                        setOptimizationData(updated);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center gap-1"
                    >
                      <CheckCircle size={10} /> Apply
                    </button>
                  )}
                  {r.applied && (
                    <button
                      onClick={() => {
                        const updated = [...optimizationData];
                        updated[idx] = { ...updated[idx], applied: false };
                        setOptimizationData(updated);
                      }}
                      className={`px-2.5 py-1 rounded-lg ${theme.secondaryBg} text-[10px] font-bold ${theme.iconColor} flex items-center gap-1`}
                    >
                      <RotateCcw size={10} /> Revert
                    </button>
                  )}
                </div>,
              ])}
              theme={theme}
            />
          </div>

          {/* Route Suggestions */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Route Recommendations</h3>
            <div className="space-y-2">
              {mockRouteSuggestions.map((s, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${theme.accentBg}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0 ${
                    s.priority === 'High' ? 'bg-red-500' : s.priority === 'Medium' ? 'bg-amber-500' : 'bg-blue-500'
                  }`}>
                    <Merge size={14} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-xs font-bold ${theme.highlight}`}>{s.suggestion}</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>{s.reason}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-emerald-600">{s.savings}</span>
                    <p className={`text-[10px] px-2 py-0.5 rounded-full font-bold mt-0.5 ${
                      s.priority === 'High' ? 'bg-red-100 text-red-700' : s.priority === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                    }`}>{s.priority}</p>
                  </div>
                  <button className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold ${theme.primary} text-white flex items-center gap-1 shrink-0`}>
                    <ArrowRight size={10} /> Review
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : tab === 'Students by Route' ? (
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
