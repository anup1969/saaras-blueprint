'use client';

import React, { useState } from 'react';
import BlueprintLayout from '@/components/BlueprintLayout';
import { StatCard, TabBar, StatusBadge, SearchBar, DataTable, Toggle, MobileFrame, MobilePreviewToggle } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import StakeholderProfile from '@/components/StakeholderProfile';
import TaskTrackerPanel from '@/components/TaskTrackerPanel';
import { ChatsView } from '@/components/ChatModule';
import SupportModule from '@/components/SupportModule';
import YourInputsModule from '@/components/YourInputsModule';
import { type TeamMember } from '@/lib/auth';
import {
  Home, Shield, UserCheck, ClipboardList, AlertTriangle, Footprints,
  Search, Plus, Eye, Edit, Filter, Download, ChevronDown,
  Users, Clock, Bell, Phone, MapPin, Camera, CreditCard,
  CheckCircle, XCircle, LogIn, LogOut, Car, Truck,
  ShieldAlert, Siren, Heart, Flame, Building2, Radio, MessageSquare,
  BadgeCheck, Printer, Hash, User, Baby, ArrowRight, FileText, X,
  PanelLeftClose, PanelLeftOpen, Headphones, ClipboardCheck,
  CalendarCheck, Package, IdCard, Mail, Timer
} from 'lucide-react';

// ─── MOCK DATA ──────────────────────────────────────
const mockVisitorsToday = [
  { id: 'VIS001', name: 'Ramesh Gupta', phone: '98765 43210', purpose: 'Parent Meeting', host: 'Mrs. Sunita Deshpande (Class 5-B)', idType: 'Aadhaar', badge: 'V-12', inTime: '09:15 AM', outTime: '10:30 AM', status: 'Checked Out', photo: true },
  { id: 'VIS002', name: 'Priya Sharma', phone: '87654 32109', purpose: 'Fee Payment', host: 'Accounts Office', idType: 'PAN Card', badge: 'V-13', inTime: '09:45 AM', outTime: '-', status: 'Inside', photo: true },
  { id: 'VIS003', name: 'Delivery — Flipkart', phone: '76543 21098', purpose: 'Parcel Delivery', host: 'Admin Office', idType: 'Company ID', badge: 'D-04', inTime: '10:00 AM', outTime: '10:12 AM', status: 'Checked Out', photo: false },
  { id: 'VIS004', name: 'Sunil Mehta', phone: '99887 76655', purpose: 'Maintenance (AC)', host: 'Mr. Rajiv (Maintenance)', idType: 'Aadhaar', badge: 'M-02', inTime: '10:30 AM', outTime: '-', status: 'Inside', photo: false },
  { id: 'VIS005', name: 'Anita Joshi', phone: '88776 65544', purpose: 'Parent Meeting', host: 'Mrs. Kavita Patil (Class 3-A)', idType: 'Driving License', badge: 'V-14', inTime: '11:00 AM', outTime: '-', status: 'Inside', photo: true },
  { id: 'VIS006', name: 'Police Inspector Desai', phone: '100', purpose: 'Safety Audit', host: 'Principal Office', idType: 'Govt. ID', badge: 'G-01', inTime: '11:30 AM', outTime: '-', status: 'Inside', photo: true },
];

const mockPickupQueue = [
  { student: 'Aarav Patel', class: '3-A', roll: 12, authorized: ['Rajesh Patel (Father)', 'Meena Patel (Mother)', 'Sunita Devi (Grandmother)'], otp: '4829', requestedBy: 'Rajesh Patel (Father)', requestTime: '02:15 PM', status: 'Pending' },
  { student: 'Siya Sharma', class: '5-B', roll: 8, authorized: ['Vikram Sharma (Father)', 'Pooja Sharma (Mother)'], otp: '7361', requestedBy: 'Pooja Sharma (Mother)', requestTime: '02:20 PM', status: 'Pending' },
  { student: 'Rohan Deshmukh', class: '8-C', roll: 22, authorized: ['Anil Deshmukh (Father)', 'Kavita Deshmukh (Mother)', 'Driver — Raju (DL: MH12AB1234)'], otp: '5190', requestedBy: 'Driver — Raju', requestTime: '02:10 PM', status: 'Verified' },
  { student: 'Ishita Gupta', class: '1-A', roll: 5, authorized: ['Ramesh Gupta (Father)', 'Neha Gupta (Mother)'], otp: '8823', requestedBy: 'Neha Gupta (Mother)', requestTime: '02:25 PM', status: 'Pending' },
  { student: 'Arjun Reddy', class: '10-A', roll: 1, authorized: ['Self (Class 10+)', 'Suresh Reddy (Father)'], otp: '-', requestedBy: 'Self', requestTime: '02:30 PM', status: 'Released' },
];

const mockGateLog = [
  { time: '07:00 AM', person: 'Rajiv Kumar (Guard B)', type: 'Staff', direction: 'IN', vehicle: '-', gate: 'Main Gate' },
  { time: '07:15 AM', person: 'Bus #3 — MH12PQ7890', type: 'Transport', direction: 'IN', vehicle: 'Bus', gate: 'Main Gate' },
  { time: '07:20 AM', person: 'Bus #7 — MH12RS3456', type: 'Transport', direction: 'IN', vehicle: 'Bus', gate: 'Main Gate' },
  { time: '07:30 AM', person: 'Mrs. Sunita Deshpande', type: 'Staff', direction: 'IN', vehicle: 'Car — MH12AB5678', gate: 'Staff Gate' },
  { time: '07:45 AM', person: 'Mr. Arvind Joshi (Peon)', type: 'Staff', direction: 'IN', vehicle: 'Bike', gate: 'Staff Gate' },
  { time: '08:00 AM', person: 'Principal Dr. Kulkarni', type: 'Staff', direction: 'IN', vehicle: 'Car — MH12CD9012', gate: 'Main Gate' },
  { time: '09:15 AM', person: 'Ramesh Gupta', type: 'Visitor', direction: 'IN', vehicle: '-', gate: 'Main Gate' },
  { time: '09:45 AM', person: 'Priya Sharma', type: 'Visitor', direction: 'IN', vehicle: 'Auto', gate: 'Main Gate' },
  { time: '10:00 AM', person: 'Delivery — Flipkart', type: 'Delivery', direction: 'IN', vehicle: 'Bike', gate: 'Service Gate' },
  { time: '10:12 AM', person: 'Delivery — Flipkart', type: 'Delivery', direction: 'OUT', vehicle: 'Bike', gate: 'Service Gate' },
  { time: '10:30 AM', person: 'Ramesh Gupta', type: 'Visitor', direction: 'OUT', vehicle: '-', gate: 'Main Gate' },
  { time: '10:30 AM', person: 'Sunil Mehta (AC Repair)', type: 'Visitor', direction: 'IN', vehicle: 'Van', gate: 'Service Gate' },
  { time: '11:00 AM', person: 'Anita Joshi', type: 'Parent', direction: 'IN', vehicle: '-', gate: 'Main Gate' },
  { time: '11:30 AM', person: 'Inspector Desai', type: 'Govt. Official', direction: 'IN', vehicle: 'Jeep — MH12GV0001', gate: 'Main Gate' },
  { time: '02:15 PM', person: 'Rajesh Patel', type: 'Parent', direction: 'IN', vehicle: 'Car — MH14KL5678', gate: 'Main Gate' },
  { time: '02:30 PM', person: 'Arjun Reddy (Std 10)', type: 'Student', direction: 'OUT', vehicle: '-', gate: 'Main Gate' },
];

const mockEmergencyContacts = [
  { name: 'Police Control Room', number: '100', type: 'Police', address: 'Nearest: Shivajinagar PS — 1.2 km' },
  { name: 'Fire Brigade', number: '101', type: 'Fire', address: 'Nearest: Station #4 — 2.5 km' },
  { name: 'Ambulance / Medical', number: '108', type: 'Medical', address: 'Nearest: City Hospital — 0.8 km' },
  { name: 'Child Helpline', number: '1098', type: 'Child Safety', address: 'National helpline' },
  { name: 'Women Helpline', number: '1091', type: 'Women Safety', address: 'State helpline' },
  { name: 'Principal — Dr. Kulkarni', number: '98765 00001', type: 'Internal', address: 'Office: Ground Floor' },
  { name: 'Vice Principal — Mrs. Patil', number: '98765 00002', type: 'Internal', address: 'Office: First Floor' },
  { name: 'School Nurse — Sr. Meena', number: '98765 00010', type: 'Medical', address: 'Infirmary: Ground Floor' },
  { name: 'Nearest Hospital — City Hospital', number: '020-2567 8900', type: 'Medical', address: 'MG Road, 0.8 km from school' },
  { name: 'School Security Head — Mr. Rajiv', number: '98765 00015', type: 'Internal', address: 'Security Cabin: Main Gate' },
];

const mockPatrolLog = [
  { id: 'P001', time: '06:00 AM', area: 'Main Gate & Boundary Wall (East)', guard: 'Rajiv Kumar', status: 'Completed', remarks: 'All clear. Gate opened at 06:30.' },
  { id: 'P002', time: '06:30 AM', area: 'Playground & Sports Area', guard: 'Manoj Singh', status: 'Completed', remarks: 'Sprinklers were running. Turned off.' },
  { id: 'P003', time: '07:00 AM', area: 'Parking Lot & Service Gate', guard: 'Rajiv Kumar', status: 'Completed', remarks: 'All vehicles checked. 2 staff arrived early.' },
  { id: 'P004', time: '08:00 AM', area: 'Corridor Check — Ground Floor', guard: 'Manoj Singh', status: 'Completed', remarks: 'Fire extinguisher near Lab-2 expired. Reported.' },
  { id: 'P005', time: '09:00 AM', area: 'Corridor Check — First Floor', guard: 'Suresh Yadav', status: 'Completed', remarks: 'All clear. CCTV #7 angle shifted — reported to IT.' },
  { id: 'P006', time: '10:00 AM', area: 'Boundary Wall (West) & Back Gate', guard: 'Rajiv Kumar', status: 'Completed', remarks: 'Small crack in wall near library. Maintenance notified.' },
  { id: 'P007', time: '11:00 AM', area: 'Canteen & Kitchen Area', guard: 'Manoj Singh', status: 'Completed', remarks: 'Hygiene OK. Gas cylinder count verified.' },
  { id: 'P008', time: '12:00 PM', area: 'All Washrooms Check', guard: 'Suresh Yadav', status: 'Pending', remarks: '-' },
  { id: 'P009', time: '01:00 PM', area: 'Lunch Break — Gate Duty', guard: 'All Guards', status: 'Pending', remarks: '-' },
  { id: 'P010', time: '02:00 PM', area: 'Pickup Zone & Main Gate', guard: 'Rajiv Kumar', status: 'Pending', remarks: '-' },
];

// ─── MODULE SIDEBAR ────────────────────────────────
const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'visitor-checkin', label: 'Visitor Check-in', icon: UserCheck },
  { id: 'student-pickup', label: 'Student Pickup', icon: Baby },
  { id: 'gate-log', label: 'Gate Log', icon: ClipboardList },
  { id: 'pre-approved', label: 'Pre-Approved Visits', icon: CalendarCheck },
  { id: 'delivery-tracking', label: 'Delivery Tracking', icon: Package },
  { id: 'photo-badge', label: 'Photo Badge', icon: IdCard },
  { id: 'emergency', label: 'Emergency', icon: AlertTriangle },
  { id: 'patrol-log', label: 'Patrol Log', icon: Footprints },
  { id: 'gate-pass', label: 'Gate Pass', icon: FileText },
  { id: 'communication', label: 'Communication', icon: MessageSquare },
  { id: 'your-inputs', label: 'Your Inputs', icon: ClipboardCheck },
  { id: 'support', label: 'Support', icon: Headphones },
];

function SecurityDashboard({ theme, themeIdx, onThemeChange, currentUser }: { theme?: Theme; themeIdx?: number; onThemeChange?: (idx: number) => void; currentUser?: TeamMember }) {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  if (!theme) return null;

  return (
    <div className="flex gap-4 -m-6">
      {/* Module sidebar */}
      <div className={`${sidebarCollapsed ? 'w-14' : 'w-48'} ${theme.cardBg} border-r ${theme.border} min-h-screen p-2 space-y-0.5 shrink-0 transition-all duration-200`}>
        <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} px-2 py-2`}>
          {!sidebarCollapsed && <p className={`text-[10px] font-bold ${theme.iconColor} uppercase px-1`}>Security Modules</p>}
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
        {activeModule === 'dashboard' && <DashboardHome theme={theme} onProfileClick={() => setActiveModule('profile')} onNavigate={setActiveModule} />}
        {activeModule === 'visitor-checkin' && <VisitorCheckinModule theme={theme} />}
        {activeModule === 'student-pickup' && <StudentPickupModule theme={theme} />}
        {activeModule === 'gate-log' && <GateLogModule theme={theme} />}
        {activeModule === 'pre-approved' && <PreApprovedModule theme={theme} />}
        {activeModule === 'delivery-tracking' && <DeliveryTrackingModule theme={theme} />}
        {activeModule === 'photo-badge' && <PhotoBadgeModule theme={theme} />}
        {activeModule === 'emergency' && <EmergencyModule theme={theme} />}
        {activeModule === 'patrol-log' && <PatrolLogModule theme={theme} />}
        {activeModule === 'gate-pass' && <GatePassModule theme={theme} />}
        {activeModule === 'communication' && <CommunicationModule theme={theme} />}
        {activeModule === 'your-inputs' && <YourInputsModule theme={theme} userName={currentUser?.name || ''} />}
        {activeModule === 'support' && <SupportModule theme={theme} role="security" />}
        {activeModule === 'profile' && <StakeholderProfile role="security" theme={theme} onClose={() => setActiveModule('dashboard')} themeIdx={themeIdx} onThemeChange={onThemeChange} />}
      </div>
    </div>
  );
}

// ─── DASHBOARD HOME ──────────────────────────────────
function DashboardHome({ theme, onProfileClick, onNavigate }: { theme: Theme; onProfileClick: () => void; onNavigate?: (id: string) => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${theme.highlight}`}>Security Dashboard</h1>
          <p className={`text-xs ${theme.iconColor}`}>Gate overview for today &mdash; {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
        <button onClick={onProfileClick} title="My Profile" className={`w-9 h-9 rounded-full ${theme.primary} text-white flex items-center justify-center text-xs font-bold hover:opacity-90 transition-opacity`}>RK</button>
      </div>

      {/* Mobile App Preview */}
      <MobilePreviewToggle theme={theme} mobileContent={
        <MobileFrame title="Security Dashboard" theme={theme}>
          <div className="bg-emerald-500 text-white rounded-xl p-3 flex items-center justify-between">
            <div>
              <p className="text-[10px] opacity-80">Gate Status</p>
              <p className="text-sm font-bold">Main Gate: OPEN</p>
            </div>
            <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-blue-50 rounded-xl p-2.5 text-center">
              <p className="text-lg font-bold text-blue-600">4</p>
              <p className="text-[9px] text-blue-500">Visitors Inside</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-2.5 text-center">
              <p className="text-lg font-bold text-amber-600">3</p>
              <p className="text-[9px] text-amber-500">Pending Checkouts</p>
            </div>
            <div className="bg-emerald-50 rounded-xl p-2.5 text-center">
              <p className="text-lg font-bold text-emerald-600">16</p>
              <p className="text-[9px] text-emerald-500">Today&apos;s Entries</p>
            </div>
            <div className="bg-red-50 rounded-xl p-2.5 text-center">
              <p className="text-lg font-bold text-red-600">1</p>
              <p className="text-[9px] text-red-500">Active Alerts</p>
            </div>
          </div>
          <div className="space-y-1.5">
            <p className="text-[10px] font-bold text-gray-500 uppercase">Quick Actions</p>
            <button className="w-full py-3 bg-blue-500 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2">&#128100; Check-in Visitor</button>
            <button className="w-full py-3 bg-emerald-500 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2">&#9989; Verify Pickup</button>
            <button className="w-full py-3 bg-indigo-500 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2">&#128694; Log Patrol</button>
          </div>
          <div className="space-y-1.5">
            <p className="text-[10px] font-bold text-gray-500 uppercase">Recent Entries</p>
            {[
              { name: 'Priya Sharma', purpose: 'Fee Payment', time: '09:45 AM', dir: 'IN' },
              { name: 'Inspector Desai', purpose: 'Govt. Visit', time: '11:30 AM', dir: 'IN' },
              { name: 'Ramesh Gupta', purpose: 'Parent Meet', time: '10:30 AM', dir: 'OUT' },
            ].map((e, i) => (
              <div key={i} className="bg-white rounded-xl p-2.5 border border-gray-100 flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold ${e.dir === 'IN' ? 'bg-emerald-500' : 'bg-red-400'}`}>
                  {e.dir === 'IN' ? '\u2192' : '\u2190'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold text-gray-800 truncate">{e.name}</p>
                  <p className="text-[9px] text-gray-500">{e.purpose}</p>
                </div>
                <span className="text-[9px] text-gray-400">{e.time}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <div className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center text-white shadow-lg shadow-red-200 animate-pulse">
              <span className="text-[10px] font-black">SOS</span>
            </div>
          </div>
        </MobileFrame>
      } />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Visitors Inside Campus" value={4} color="bg-blue-500" sub="6 total today" theme={theme} onClick={() => onNavigate?.('visitor-checkin')} />
        <StatCard icon={LogIn} label="Today's Entries" value={16} color="bg-emerald-500" sub="All gates" theme={theme} onClick={() => onNavigate?.('gate-log')} />
        <StatCard icon={Baby} label="Pending Pickups" value={3} color="bg-amber-500" sub="2 verified" theme={theme} onClick={() => onNavigate?.('student-pickup')} />
        <StatCard icon={AlertTriangle} label="Active Alerts" value={1} color="bg-red-500" sub="Fire ext. expired" theme={theme} onClick={() => onNavigate?.('emergency')} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Car} label="Vehicles Inside" value={8} color="bg-indigo-500" theme={theme} onClick={() => onNavigate?.('gate-log')} />
        <StatCard icon={Shield} label="Guards On Duty" value={3} color="bg-teal-500" sub="of 4 total" theme={theme} />
        <StatCard icon={Footprints} label="Patrols Completed" value="7/10" color="bg-purple-500" theme={theme} onClick={() => onNavigate?.('patrol-log')} />
        <StatCard icon={Camera} label="CCTV Active" value="11/12" color="bg-orange-500" sub="#7 shifted" theme={theme} />
      </div>

      {/* Quick Actions */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { label: 'Check-in Visitor', icon: UserCheck, color: 'bg-blue-500' },
            { label: 'Verify Pickup', icon: BadgeCheck, color: 'bg-emerald-500' },
            { label: 'Log Patrol', icon: Footprints, color: 'bg-indigo-500' },
            { label: 'Emergency Call', icon: Siren, color: 'bg-red-500' },
          ].map(a => (
            <button key={a.label} className={`flex items-center gap-2 p-3 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} transition-all`}>
              <div className={`w-8 h-8 rounded-lg ${a.color} flex items-center justify-center text-white`}><a.icon size={14} /></div>
              <span className={`text-xs font-bold ${theme.highlight}`}>{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Currently Inside Campus */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Currently Inside Campus</h3>
        <div className="space-y-2">
          {mockVisitorsToday.filter(v => v.status === 'Inside').map((v, i) => (
            <div key={i} className={`flex items-center gap-3 p-2 rounded-xl ${theme.accentBg}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                v.purpose.includes('Parent') ? 'bg-blue-500' : v.purpose.includes('Maintenance') ? 'bg-amber-500' : v.purpose.includes('Safety') ? 'bg-red-500' : 'bg-purple-500'
              }`}>
                {v.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className={`text-xs font-bold ${theme.highlight}`}>{v.name}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{v.purpose} &bull; Host: {v.host}</p>
              </div>
              <span className={`text-[10px] ${theme.iconColor}`}>Since {v.inTime}</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-blue-100 text-blue-700">Badge {v.badge}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Gate Activity */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Recent Gate Activity</h3>
        <div className="space-y-2">
          {mockGateLog.slice(-5).reverse().map((g, i) => (
            <div key={i} className={`flex items-center gap-3 p-2 rounded-xl ${theme.accentBg}`}>
              <div className={`w-2 h-2 rounded-full ${g.direction === 'IN' ? 'bg-emerald-500' : 'bg-red-400'}`} />
              <span className={`text-[10px] font-mono ${theme.iconColor} w-16`}>{g.time}</span>
              <p className={`text-xs ${theme.highlight} flex-1`}>{g.person}</p>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                g.direction === 'IN' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'
              }`}>{g.direction}</span>
              <span className={`text-[10px] ${theme.iconColor}`}>{g.type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Active Alerts</h3>
        <div className="space-y-2">
          <div className={`flex items-center gap-3 p-3 rounded-xl bg-red-50 border border-red-200`}>
            <AlertTriangle size={16} className="text-red-500" />
            <div className="flex-1">
              <p className="text-xs font-bold text-red-700">Fire Extinguisher Expired — Lab-2 (Ground Floor)</p>
              <p className="text-[10px] text-red-500">Reported by Manoj Singh during 08:00 AM patrol. Maintenance notified.</p>
            </div>
            <span className="text-[10px] text-red-400">2h ago</span>
          </div>
          <div className={`flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200`}>
            <Camera size={16} className="text-amber-500" />
            <div className="flex-1">
              <p className="text-xs font-bold text-amber-700">CCTV #7 — Angle Shifted (First Floor Corridor)</p>
              <p className="text-[10px] text-amber-500">Reported by Suresh Yadav. IT team informed.</p>
            </div>
            <span className="text-[10px] text-amber-400">1h ago</span>
          </div>
          <div className={`flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200`}>
            <Building2 size={16} className="text-amber-500" />
            <div className="flex-1">
              <p className="text-xs font-bold text-amber-700">Boundary Wall Crack — Near Library (West Side)</p>
              <p className="text-[10px] text-amber-500">Small crack found during 10:00 AM patrol. Maintenance notified.</p>
            </div>
            <span className="text-[10px] text-amber-400">45m ago</span>
          </div>
        </div>
      </div>

      {/* Task Tracker */}
      <TaskTrackerPanel theme={theme} role="security" />
    </div>
  );
}

// ─── VISITOR CHECK-IN MODULE ─────────────────────────
function VisitorCheckinModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Check-in Form');
  const [showForm, setShowForm] = useState(true);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Visitor Check-in</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}>
          <Plus size={14} /> New Visitor
        </button>
      </div>

      {/* Mobile App Preview */}
      <MobilePreviewToggle theme={theme} mobileContent={
        <MobileFrame title="Visitor Check-in" theme={theme}>
          <div className="bg-gray-900 rounded-xl h-36 relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-3 border-2 border-white/30 rounded-lg" />
            <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-white rounded-tl-md" />
            <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-white rounded-tr-md" />
            <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-white rounded-bl-md" />
            <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-white rounded-br-md" />
            <div className="text-center">
              <span className="text-white/50 text-2xl">&#128247;</span>
              <p className="text-[9px] text-white/60 mt-1">Tap to capture visitor photo</p>
            </div>
          </div>
          <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
            <p className="text-[10px] font-bold text-blue-700 mb-2">OTP Verification</p>
            <div className="flex gap-1.5 justify-center mb-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-lg border-2 border-blue-300 bg-white flex items-center justify-center text-lg font-bold text-blue-600">
                  {i <= 2 ? '\u2022' : ''}
                </div>
              ))}
            </div>
            <p className="text-[9px] text-blue-500 text-center">OTP sent to +91 98765&bull;&bull;&bull;&bull;&bull;</p>
          </div>
          <div className="bg-white rounded-xl p-3 border border-gray-200 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center text-gray-400 text-lg">&#128100;</div>
              <div>
                <p className="text-[11px] font-bold text-gray-800">Priya Sharma</p>
                <p className="text-[9px] text-gray-500">Fee Payment &bull; Accounts Office</p>
              </div>
              <div className="ml-auto w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-300">
                <span className="text-[8px] text-gray-400 text-center leading-tight">QR Code</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 font-bold">Badge V-13</span>
              <span className="text-[9px] text-gray-400">09:45 AM</span>
            </div>
          </div>
          <button className="w-full py-4 bg-emerald-500 text-white rounded-xl text-base font-bold flex items-center justify-center gap-2 shadow-lg">&#10003; CHECK IN</button>
          <button className="w-full py-4 bg-red-500 text-white rounded-xl text-base font-bold flex items-center justify-center gap-2 shadow-lg">&#10005; CHECK OUT</button>
        </MobileFrame>
      } />
      <TabBar tabs={['Check-in Form', 'Today\'s Visitors', 'Pre-Approved']} active={tab} onChange={setTab} theme={theme} />
      <p className="text-[10px] text-amber-600 mb-2">📋 Visitor policy per SSA: Photo capture ON · Badge printing ON · ID mandatory · Restricted hours: 11:00-12:00 · Max duration: 60 min</p>

      {tab === 'Check-in Form' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-4`}>Quick Visitor Entry</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Photo placeholder */}
            <div className="md:col-span-2 flex items-center gap-4">
              <div className={`w-24 h-24 rounded-2xl border-2 border-dashed ${theme.border} flex flex-col items-center justify-center ${theme.accentBg}`}>
                <Camera size={24} className={theme.iconColor} />
                <p className={`text-[10px] ${theme.iconColor} mt-1`}>Tap to capture</p>
              </div>
              <div className="flex-1">
                <p className={`text-xs ${theme.iconColor} mb-1`}>Photo is captured automatically via tablet camera at gate</p>
                <div className="flex gap-2">
                  <button className={`px-3 py-1.5 rounded-lg text-xs font-bold ${theme.secondaryBg} ${theme.iconColor}`}>
                    <Camera size={12} className="inline mr-1" /> Capture Photo
                  </button>
                  <button className={`px-3 py-1.5 rounded-lg text-xs font-bold ${theme.secondaryBg} ${theme.iconColor}`}>
                    <CreditCard size={12} className="inline mr-1" /> Scan ID
                  </button>
                </div>
              </div>
            </div>

            {/* Form fields */}
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Visitor Name *</label>
              <input placeholder="Enter full name" className={`w-full px-3 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-slate-300`} />
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Phone Number *</label>
              <input placeholder="+91 98765 43210" className={`w-full px-3 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-slate-300`} />
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Purpose of Visit *</label>
              <select className={`w-full px-3 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-slate-300`}>
                <option>Parent Meeting</option>
                <option>Fee Payment</option>
                <option>Delivery</option>
                <option>Maintenance / Repair</option>
                <option>Government Official</option>
                <option>Interview / Recruitment</option>
                <option>Student Pickup (Early)</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>ID Type</label>
              <select className={`w-full px-3 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-slate-300`}>
                <option>Aadhaar Card</option>
                <option>PAN Card</option>
                <option>Driving License</option>
                <option>Voter ID</option>
                <option>Company ID</option>
                <option>Government ID</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Host / Whom to Meet *</label>
              <input placeholder="Teacher name, Office, etc." className={`w-full px-3 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-slate-300`} />
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Badge Number</label>
              <div className="flex gap-2">
                <input placeholder="Auto: V-15" className={`flex-1 px-3 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-slate-300`} readOnly />
                <button className={`px-3 py-2.5 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.iconColor}`}>
                  <Hash size={12} className="inline mr-1" /> Assign
                </button>
              </div>
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Vehicle (if any)</label>
              <input placeholder="e.g. Car — MH12AB1234" className={`w-full px-3 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-slate-300`} />
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>No. of Persons</label>
              <input placeholder="1" type="number" defaultValue={1} min={1} className={`w-full px-3 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-slate-300`} />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button className={`px-6 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}>
              <CheckCircle size={14} /> Check-in & Print Pass
            </button>
            <button className={`px-4 py-2.5 rounded-xl border ${theme.border} text-sm font-bold ${theme.iconColor} flex items-center gap-1`}>
              <Printer size={14} /> Print Pass Only
            </button>
          </div>
        </div>
      )}

      {tab === 'Today\'s Visitors' && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={Users} label="Total Visitors" value={mockVisitorsToday.length} color="bg-blue-500" theme={theme} />
            <StatCard icon={LogIn} label="Currently Inside" value={mockVisitorsToday.filter(v => v.status === 'Inside').length} color="bg-emerald-500" theme={theme} />
            <StatCard icon={LogOut} label="Checked Out" value={mockVisitorsToday.filter(v => v.status === 'Checked Out').length} color="bg-slate-500" theme={theme} />
            <StatCard icon={BadgeCheck} label="Badges Active" value={mockVisitorsToday.filter(v => v.status === 'Inside').length} color="bg-purple-500" theme={theme} />
          </div>
          <div className="flex gap-3">
            <SearchBar placeholder="Search visitor by name, phone, badge..." theme={theme} icon={Search} />
            <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Filter size={12} /> Filter</button>
          </div>
          <DataTable
            headers={['Badge', 'Name', 'Phone', 'Purpose', 'Host', 'In Time', 'Out Time', 'Status', '']}
            rows={mockVisitorsToday.map(v => [
              <span key="badge" className={`font-mono text-xs font-bold ${theme.primaryText}`}>{v.badge}</span>,
              <span key="name" className={`font-bold ${theme.highlight}`}>{v.name}</span>,
              <span key="phone" className={theme.iconColor}>{v.phone}</span>,
              <span key="purpose" className={theme.iconColor}>{v.purpose}</span>,
              <span key="host" className={`text-xs ${theme.iconColor}`}>{v.host}</span>,
              <span key="in" className={`font-mono text-xs ${theme.iconColor}`}>{v.inTime}</span>,
              <span key="out" className={`font-mono text-xs ${theme.iconColor}`}>{v.outTime}</span>,
              <StatusBadge key="status" status={v.status === 'Inside' ? 'Active' : 'Cleared'} theme={theme} />,
              <div key="actions" className="flex gap-1">
                {v.status === 'Inside' && (
                  <button className={`px-2 py-1 rounded-lg text-xs font-bold bg-red-100 text-red-600`}>Check Out</button>
                )}
                <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
              </div>
            ])}
            theme={theme}
          />
        </>
      )}

      {tab === 'Pre-Approved' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Pre-Approved Visitors for Today</h3>
          <p className={`text-xs ${theme.iconColor} mb-4`}>These visitors have been pre-approved by staff/admin. They can be checked in with minimal verification.</p>
          <div className="space-y-2">
            {[
              { name: 'Suresh Electricals (2 persons)', approvedBy: 'Admin Office', purpose: 'Electrical Maintenance — Auditorium', time: '02:00 PM - 05:00 PM' },
              { name: 'Mrs. Rekha Iyer (Parent)', approvedBy: 'Mrs. Kavita Patil', purpose: 'PTM Follow-up for Aditya Iyer (7-B)', time: '03:00 PM - 03:30 PM' },
            ].map((v, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${theme.accentBg}`}>
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">
                  <CheckCircle size={14} />
                </div>
                <div className="flex-1">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{v.name}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{v.purpose}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Approved by: {v.approvedBy} &bull; Time: {v.time}</p>
                </div>
                <button className={`px-3 py-1.5 rounded-lg text-xs font-bold ${theme.primary} text-white`}>Quick Check-in</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── STUDENT PICKUP MODULE ───────────────────────────
function StudentPickupModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Pickup Queue');
  const [otpInput, setOtpInput] = useState('');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Student Pickup</h1>
        <div className="flex gap-2">
          <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}>
            <BadgeCheck size={14} /> Verify & Release
          </button>
        </div>
      </div>
      <TabBar tabs={['Pickup Queue', 'Release Log', 'Authorized Persons']} active={tab} onChange={setTab} theme={theme} />
      <p className="text-[10px] text-amber-600 mb-1">📋 Pickup: OTP verification ON · Registered guardians only · Pre-registration required — per SSA config</p>

      {tab === 'Pickup Queue' && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={Clock} label="Pending Pickups" value={mockPickupQueue.filter(p => p.status === 'Pending').length} color="bg-amber-500" theme={theme} />
            <StatCard icon={CheckCircle} label="Verified" value={mockPickupQueue.filter(p => p.status === 'Verified').length} color="bg-emerald-500" theme={theme} />
            <StatCard icon={LogOut} label="Released Today" value={mockPickupQueue.filter(p => p.status === 'Released').length} color="bg-blue-500" theme={theme} />
            <StatCard icon={AlertTriangle} label="Flagged" value={0} color="bg-red-500" sub="All clear" theme={theme} />
          </div>

          {/* OTP Verification Box */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Quick OTP / Code Verification</h3>
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Enter Pickup Code</label>
                <input
                  placeholder="Enter 4-digit OTP"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  maxLength={4}
                  className={`w-full px-4 py-3 rounded-xl border ${theme.border} ${theme.inputBg} text-lg font-mono font-bold text-center tracking-widest outline-none focus:ring-2 focus:ring-slate-300`}
                />
              </div>
              <button className={`px-6 py-3 ${theme.primary} text-white rounded-xl text-sm font-bold`}>
                Verify
              </button>
            </div>
          </div>

          {/* Pickup Queue Cards */}
          <div className="space-y-3">
            {mockPickupQueue.map((p, i) => (
              <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm ${
                      p.status === 'Verified' ? 'bg-emerald-500' : p.status === 'Released' ? 'bg-blue-500' : 'bg-amber-500'
                    }`}>
                      {p.student.charAt(0)}
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${theme.highlight}`}>{p.student}</p>
                      <p className={`text-xs ${theme.iconColor}`}>Class {p.class} &bull; Roll #{p.roll}</p>
                    </div>
                  </div>
                  <StatusBadge status={p.status} theme={theme} />
                </div>
                <div className={`p-3 rounded-xl ${theme.accentBg} space-y-1`}>
                  <div className="flex justify-between">
                    <span className={`text-xs ${theme.iconColor}`}>Requested by:</span>
                    <span className={`text-xs font-bold ${theme.highlight}`}>{p.requestedBy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-xs ${theme.iconColor}`}>Request Time:</span>
                    <span className={`text-xs font-mono ${theme.iconColor}`}>{p.requestTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-xs ${theme.iconColor}`}>OTP Code:</span>
                    <span className={`text-xs font-mono font-bold ${theme.primaryText}`}>{p.otp}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className={`text-xs ${theme.iconColor}`}>Authorized:</span>
                    <div className="text-right">
                      {p.authorized.map((a, j) => (
                        <p key={j} className={`text-[10px] ${theme.iconColor}`}>{a}</p>
                      ))}
                    </div>
                  </div>
                </div>
                {p.status === 'Pending' && (
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 px-3 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-white flex items-center justify-center gap-1">
                      <CheckCircle size={12} /> Verify & Release
                    </button>
                    <button className="px-3 py-2 rounded-xl text-xs font-bold bg-red-100 text-red-600 flex items-center gap-1">
                      <XCircle size={12} /> Reject
                    </button>
                    <button className={`px-3 py-2 rounded-xl text-xs font-bold ${theme.secondaryBg} ${theme.iconColor} flex items-center gap-1`}>
                      <Phone size={12} /> Call Parent
                    </button>
                  </div>
                )}
                {p.status === 'Verified' && (
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 px-3 py-2 rounded-xl text-xs font-bold bg-blue-500 text-white flex items-center justify-center gap-1">
                      <LogOut size={12} /> Mark Released
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {tab === 'Release Log' && (
        <>
          <div className="flex gap-3">
            <SearchBar placeholder="Search student, parent name..." theme={theme} icon={Search} />
            <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Download size={12} /> Export</button>
          </div>
          <DataTable
            headers={['Time', 'Student', 'Class', 'Released To', 'OTP Match', 'Guard', 'Method']}
            rows={[
              [
                <span key="t" className={`font-mono text-xs ${theme.iconColor}`}>02:35 PM</span>,
                <span key="s" className={`font-bold ${theme.highlight}`}>Arjun Reddy</span>,
                <span key="c" className={theme.iconColor}>10-A</span>,
                <span key="r" className={theme.iconColor}>Self (Class 10+)</span>,
                <span key="o" className="text-xs px-2 py-0.5 rounded-full font-bold bg-slate-100 text-slate-600">N/A</span>,
                <span key="g" className={theme.iconColor}>Rajiv Kumar</span>,
                <span key="m" className={theme.iconColor}>Self-release (Sr. Student)</span>,
              ],
              [
                <span key="t" className={`font-mono text-xs ${theme.iconColor}`}>02:30 PM</span>,
                <span key="s" className={`font-bold ${theme.highlight}`}>Rohan Deshmukh</span>,
                <span key="c" className={theme.iconColor}>8-C</span>,
                <span key="r" className={theme.iconColor}>Driver — Raju</span>,
                <span key="o" className="text-xs px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-700">Matched</span>,
                <span key="g" className={theme.iconColor}>Rajiv Kumar</span>,
                <span key="m" className={theme.iconColor}>OTP Verified + DL Check</span>,
              ],
            ]}
            theme={theme}
          />
        </>
      )}

      {tab === 'Authorized Persons' && (
        <>
          <div className="flex gap-3">
            <SearchBar placeholder="Search student or authorized person..." theme={theme} icon={Search} />
          </div>
          <DataTable
            headers={['Student', 'Class', 'Authorized Persons', 'Total']}
            rows={mockPickupQueue.map(p => [
              <span key="s" className={`font-bold ${theme.highlight}`}>{p.student}</span>,
              <span key="c" className={theme.iconColor}>{p.class}</span>,
              <div key="a" className="space-y-0.5">
                {p.authorized.map((a, j) => (
                  <p key={j} className={`text-xs ${theme.iconColor}`}>{a}</p>
                ))}
              </div>,
              <span key="t" className={`font-bold ${theme.primaryText}`}>{p.authorized.length}</span>,
            ])}
            theme={theme}
          />
        </>
      )}
    </div>
  );
}

// ─── GATE LOG MODULE ─────────────────────────────────
function GateLogModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All Entries');
  const [filterType, setFilterType] = useState('All');

  const filteredLog = filterType === 'All' ? mockGateLog : mockGateLog.filter(g => g.type === filterType);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Gate Log</h1>
        <button className={`px-4 py-2.5 rounded-xl border ${theme.border} ${theme.cardBg} text-sm font-bold ${theme.iconColor} flex items-center gap-1`}>
          <Download size={14} /> Export Today
        </button>
      </div>

      {/* Mobile App Preview */}
      <MobilePreviewToggle theme={theme} mobileContent={
        <MobileFrame title="Vehicle Entry" theme={theme}>
          <div className="bg-gray-900 rounded-xl h-36 relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 h-14 border-2 border-amber-400/60 rounded-lg" />
            <div className="absolute top-3 right-3 w-6 h-6 bg-amber-500/30 rounded-full flex items-center justify-center">
              <span className="text-[8px] text-amber-300">&#9679;</span>
            </div>
            <div className="text-center relative z-10">
              <p className="text-[10px] text-white/80 font-bold">Capture Number Plate</p>
              <p className="text-[8px] text-white/50 mt-1">Align plate within frame</p>
            </div>
          </div>
          <div className="bg-amber-50 rounded-xl p-3 border border-amber-200">
            <p className="text-[9px] font-bold text-amber-600 uppercase mb-1">Detected Number Plate</p>
            <div className="bg-white rounded-lg p-2 border-2 border-gray-800 text-center">
              <p className="text-lg font-black text-gray-900 tracking-widest">MH12AB5678</p>
            </div>
          </div>
          <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200 space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[10px]">&#10003;</div>
              <p className="text-[11px] font-bold text-emerald-700">Vehicle Found in Records</p>
            </div>
            <div className="ml-8 space-y-0.5">
              <p className="text-[10px] text-gray-700"><span className="font-bold">Owner:</span> Mrs. Sunita Deshpande</p>
              <p className="text-[10px] text-gray-700"><span className="font-bold">Role:</span> Staff (Teacher) &bull; Class 5-B</p>
              <p className="text-[10px] text-gray-700"><span className="font-bold">Vehicle:</span> Car &bull; White Maruti Swift</p>
              <p className="text-[10px] text-gray-700"><span className="font-bold">Parking:</span> Staff Lot &bull; Slot #12</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 border border-gray-200">
            <p className="text-[10px] font-bold text-gray-600 mb-2">Driver Verification</p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-400">
                <span className="text-lg">&#128100;</span>
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-gray-700">Photo matches registered driver</p>
                <div className="flex gap-1 mt-1">
                  <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-600 font-bold">ID Verified</span>
                  <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-600 font-bold">Regular</span>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full py-3.5 bg-emerald-500 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg">&#10003; Allow Entry</button>
          <div className="grid grid-cols-2 gap-2">
            <button className="py-3 bg-amber-100 text-amber-700 rounded-xl text-[10px] font-bold text-center">&#128247; Retake Photo</button>
            <button className="py-3 bg-red-100 text-red-600 rounded-xl text-[10px] font-bold text-center">&#128683; Deny Entry</button>
          </div>
        </MobileFrame>
      } />
      <TabBar tabs={['All Entries', 'Visitors', 'Parents', 'Staff', 'Transport', 'Delivery']} active={tab} onChange={(t) => {
        setTab(t);
        const typeMap: Record<string, string> = { 'All Entries': 'All', 'Visitors': 'Visitor', 'Parents': 'Parent', 'Staff': 'Staff', 'Transport': 'Transport', 'Delivery': 'Delivery' };
        setFilterType(typeMap[t] || 'All');
      }} theme={theme} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={LogIn} label="Total IN" value={mockGateLog.filter(g => g.direction === 'IN').length} color="bg-emerald-500" theme={theme} />
        <StatCard icon={LogOut} label="Total OUT" value={mockGateLog.filter(g => g.direction === 'OUT').length} color="bg-red-400" theme={theme} />
        <StatCard icon={Car} label="Vehicles" value={mockGateLog.filter(g => g.vehicle !== '-').length} color="bg-indigo-500" theme={theme} />
        <StatCard icon={Clock} label="Last Entry" value={mockGateLog[mockGateLog.length - 1].time} color="bg-blue-500" theme={theme} />
      </div>

      <div className="flex gap-3">
        <SearchBar placeholder="Search person, vehicle, gate..." theme={theme} icon={Search} />
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Filter size={12} /> Filter</button>
      </div>

      <DataTable
        headers={['Time', 'Person', 'Type', 'Direction', 'Vehicle', 'Gate']}
        rows={filteredLog.map(g => [
          <span key="time" className={`font-mono text-xs ${theme.iconColor}`}>{g.time}</span>,
          <span key="person" className={`font-bold ${theme.highlight}`}>{g.person}</span>,
          <span key="type" className={`text-xs px-2 py-0.5 rounded-full font-bold ${
            g.type === 'Staff' ? 'bg-blue-100 text-blue-700' :
            g.type === 'Visitor' ? 'bg-purple-100 text-purple-700' :
            g.type === 'Parent' ? 'bg-emerald-100 text-emerald-700' :
            g.type === 'Transport' ? 'bg-amber-100 text-amber-700' :
            g.type === 'Delivery' ? 'bg-orange-100 text-orange-700' :
            g.type === 'Student' ? 'bg-teal-100 text-teal-700' :
            'bg-red-100 text-red-700'
          }`}>{g.type}</span>,
          <span key="dir" className={`text-xs px-2 py-0.5 rounded-full font-bold ${
            g.direction === 'IN' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'
          }`}>{g.direction}</span>,
          <span key="vehicle" className={`text-xs ${theme.iconColor}`}>{g.vehicle}</span>,
          <span key="gate" className={`text-xs ${theme.iconColor}`}>{g.gate}</span>,
        ])}
        theme={theme}
      />

      <div className={`flex items-center justify-between text-xs ${theme.iconColor} px-2`}>
        <span>Showing {filteredLog.length} entries for today</span>
        <div className="flex gap-1">
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Previous</button>
          <button className={`px-3 py-1.5 rounded-lg ${theme.primary} text-white`}>1</button>
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Next</button>
        </div>
      </div>
    </div>
  );
}

// ─── EMERGENCY MODULE ────────────────────────────────
function EmergencyModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Emergency Contacts');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Emergency</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2.5 bg-red-500 text-white rounded-xl text-sm font-bold flex items-center gap-1 animate-pulse">
            <Siren size={14} /> PANIC BUTTON
          </button>
        </div>
      </div>

      {/* Mobile App Preview */}
      <MobilePreviewToggle theme={theme} mobileContent={
        <MobileFrame title="Emergency Alert" theme={theme}>
          <div className="flex flex-col items-center py-4">
            <div className="w-32 h-32 rounded-full bg-red-500 flex items-center justify-center text-white shadow-xl shadow-red-300 animate-pulse border-4 border-red-300">
              <div className="text-center">
                <p className="text-3xl font-black">SOS</p>
                <p className="text-[8px] font-bold mt-0.5">TAP FOR EMERGENCY</p>
              </div>
            </div>
            <p className="text-[9px] text-gray-400 mt-2">Sends alert to all staff + admin + police</p>
          </div>
          <div className="space-y-1.5">
            <p className="text-[10px] font-bold text-gray-500 uppercase">Select Alert Type</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Fire', icon: '\uD83D\uDD25', color: 'bg-red-100 border-red-300 text-red-700' },
                { label: 'Medical', icon: '\uD83C\uDFE5', color: 'bg-blue-100 border-blue-300 text-blue-700' },
                { label: 'Intruder', icon: '\u26A0\uFE0F', color: 'bg-amber-100 border-amber-300 text-amber-700' },
                { label: 'Other', icon: '\uD83D\uDCE2', color: 'bg-purple-100 border-purple-300 text-purple-700' },
              ].map((t, i) => (
                <button key={i} className={`p-3 rounded-xl border-2 ${t.color} flex flex-col items-center gap-1 ${i === 0 ? 'ring-2 ring-red-400' : ''}`}>
                  <span className="text-xl">{t.icon}</span>
                  <span className="text-[10px] font-bold">{t.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="bg-red-50 rounded-xl p-3 border border-red-200 space-y-2">
            <p className="text-[10px] font-bold text-red-700">Auto-Notify Stakeholders</p>
            <div className="space-y-1">
              {[
                { who: 'Principal & Vice Principal', status: 'Will be notified' },
                { who: 'All Teaching Staff (78)', status: 'Will be notified' },
                { who: 'Police \u2014 100', status: 'Auto-call if Intruder' },
                { who: 'Fire Brigade \u2014 101', status: 'Auto-call if Fire' },
                { who: 'Ambulance \u2014 108', status: 'Auto-call if Medical' },
                { who: 'All Parents (via SMS)', status: 'After admin approval' },
              ].map((n, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-[9px] text-gray-700">{n.who}</span>
                  <span className="text-[8px] text-red-500 font-bold">{n.status}</span>
                </div>
              ))}
            </div>
          </div>
          <button className="w-full py-4 bg-red-600 text-white rounded-xl text-base font-bold animate-pulse shadow-lg shadow-red-300">&#128680; CONFIRM EMERGENCY ALERT</button>
        </MobileFrame>
      } />
      <TabBar tabs={['Emergency Contacts', 'Protocols', 'Evacuation']} active={tab} onChange={setTab} theme={theme} />

      {tab === 'Emergency Contacts' && (
        <>
          {/* Priority Emergency Numbers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center text-white">
                <Shield size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-red-700">Police — 100</p>
                <p className="text-[10px] text-red-500">Shivajinagar PS — 1.2 km</p>
              </div>
              <button className="ml-auto px-3 py-2 rounded-xl bg-red-500 text-white text-xs font-bold flex items-center gap-1">
                <Phone size={12} /> Call
              </button>
            </div>
            <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center text-white">
                <Flame size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-orange-700">Fire — 101</p>
                <p className="text-[10px] text-orange-500">Station #4 — 2.5 km</p>
              </div>
              <button className="ml-auto px-3 py-2 rounded-xl bg-orange-500 text-white text-xs font-bold flex items-center gap-1">
                <Phone size={12} /> Call
              </button>
            </div>
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center text-white">
                <Heart size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-blue-700">Ambulance — 108</p>
                <p className="text-[10px] text-blue-500">City Hospital — 0.8 km</p>
              </div>
              <button className="ml-auto px-3 py-2 rounded-xl bg-blue-500 text-white text-xs font-bold flex items-center gap-1">
                <Phone size={12} /> Call
              </button>
            </div>
          </div>

          {/* All Contacts Table */}
          <DataTable
            headers={['Name', 'Number', 'Type', 'Location / Address', '']}
            rows={mockEmergencyContacts.map(c => [
              <span key="name" className={`font-bold ${theme.highlight}`}>{c.name}</span>,
              <span key="num" className={`font-mono font-bold text-sm ${theme.primaryText}`}>{c.number}</span>,
              <span key="type" className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                c.type === 'Police' ? 'bg-red-100 text-red-700' :
                c.type === 'Fire' ? 'bg-orange-100 text-orange-700' :
                c.type === 'Medical' ? 'bg-blue-100 text-blue-700' :
                c.type === 'Internal' ? 'bg-purple-100 text-purple-700' :
                'bg-amber-100 text-amber-700'
              }`}>{c.type}</span>,
              <span key="addr" className={`text-xs ${theme.iconColor}`}>{c.address}</span>,
              <button key="call" className={`px-2 py-1 rounded-lg text-xs font-bold ${theme.secondaryBg} ${theme.iconColor} flex items-center gap-1`}>
                <Phone size={10} /> Call
              </button>,
            ])}
            theme={theme}
          />
        </>
      )}

      {tab === 'Protocols' && (
        <div className="space-y-3">
          {[
            {
              title: 'Fire Emergency',
              icon: Flame,
              color: 'bg-red-500',
              steps: [
                'Sound fire alarm immediately (red button at every floor)',
                'Call Fire Brigade — 101',
                'Evacuate all students class-wise to Assembly Point (Playground)',
                'Inform Principal and Vice Principal',
                'Security to open ALL gates, direct fire trucks',
                'Do NOT use elevators. Use staircase only.',
                'Class teachers to take attendance at Assembly Point',
                'Wait for All-Clear signal from Fire Department',
              ],
            },
            {
              title: 'Medical Emergency',
              icon: Heart,
              color: 'bg-blue-500',
              steps: [
                'Call School Nurse (Ext. 110) and Ambulance — 108',
                'Administer first aid if trained (First Aid kit at every floor)',
                'Do NOT move injured person unless immediate danger',
                'Inform parents/guardian immediately',
                'Inform Principal — Dr. Kulkarni',
                'Security to clear path for ambulance at Main Gate',
                'Document incident details for records',
              ],
            },
            {
              title: 'Intruder / Threat Alert',
              icon: ShieldAlert,
              color: 'bg-amber-500',
              steps: [
                'Press PANIC BUTTON (sends alert to all staff + police)',
                'Lock ALL gates immediately',
                'Teachers: Lock classrooms, keep students inside, away from windows',
                'Security: Do NOT confront armed intruder',
                'Call Police — 100 immediately',
                'Maintain radio/phone communication with Principal',
                'Wait for Police All-Clear before unlocking',
                'Document all observations (description, time, direction)',
              ],
            },
            {
              title: 'Natural Disaster (Earthquake)',
              icon: AlertTriangle,
              color: 'bg-purple-500',
              steps: [
                'Announce: "DROP, COVER, HOLD ON" over PA system',
                'Students to take shelter under desks away from windows',
                'After shaking stops: Evacuate to open ground (Playground)',
                'Do NOT re-enter building until structural check done',
                'Class teachers to take attendance at Assembly Point',
                'Check for injuries, administer first aid',
                'Call emergency services if needed',
              ],
            },
          ].map((protocol, i) => (
            <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl ${protocol.color} flex items-center justify-center text-white`}>
                  <protocol.icon size={18} />
                </div>
                <h3 className={`text-sm font-bold ${theme.highlight}`}>{protocol.title}</h3>
              </div>
              <div className="space-y-1.5">
                {protocol.steps.map((step, j) => (
                  <div key={j} className={`flex items-start gap-2 p-2 rounded-lg ${theme.accentBg}`}>
                    <span className={`text-[10px] font-bold ${theme.primaryText} mt-0.5 shrink-0`}>{j + 1}.</span>
                    <p className={`text-xs ${theme.highlight}`}>{step}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'Evacuation' && (
        <div className="space-y-4">
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Evacuation Plan</h3>
            {/* Placeholder for evacuation map */}
            <div className={`w-full h-64 rounded-2xl border-2 border-dashed ${theme.border} flex flex-col items-center justify-center ${theme.accentBg}`}>
              <MapPin size={32} className={theme.iconColor} />
              <p className={`text-sm font-bold ${theme.iconColor} mt-2`}>Evacuation Map</p>
              <p className={`text-xs ${theme.iconColor}`}>Floor-wise evacuation routes will be displayed here</p>
              <p className={`text-[10px] ${theme.iconColor} mt-1`}>(Upload via Admin Panel)</p>
            </div>
          </div>

          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Assembly Points</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { point: 'Primary Assembly Point', location: 'Main Playground (Behind Building A)', capacity: '1200 persons', classes: 'All classes Nursery to Class 12' },
                { point: 'Secondary Assembly Point', location: 'Parking Area (Near Main Gate)', capacity: '400 persons', classes: 'Overflow / Staff / Visitors' },
                { point: 'Medical Triage Area', location: 'Near Infirmary (Ground Floor Exit)', capacity: '50 persons', classes: 'Injured / Needing medical attention' },
                { point: 'Parent Reunion Point', location: 'Main Gate — Outside', capacity: '-', classes: 'Parents collect children after All-Clear' },
              ].map((ap, i) => (
                <div key={i} className={`p-3 rounded-xl ${theme.accentBg} space-y-1`}>
                  <p className={`text-xs font-bold ${theme.highlight}`}>{ap.point}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}><MapPin size={10} className="inline mr-1" />{ap.location}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Capacity: {ap.capacity}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{ap.classes}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Drill History</h3>
            <DataTable
              headers={['Date', 'Type', 'Duration', 'Persons Evacuated', 'Issues Found', 'Status']}
              rows={[
                [
                  <span key="d" className={`text-xs ${theme.iconColor}`}>15 Jan 2026</span>,
                  <span key="t" className={`font-bold ${theme.highlight}`}>Fire Drill</span>,
                  <span key="dur" className={theme.iconColor}>4 min 32 sec</span>,
                  <span key="p" className={theme.iconColor}>987</span>,
                  <span key="i" className={`text-xs ${theme.iconColor}`}>Staircase B congested. Need better flow.</span>,
                  <StatusBadge key="s" status="Approved" theme={theme} />,
                ],
                [
                  <span key="d" className={`text-xs ${theme.iconColor}`}>10 Dec 2025</span>,
                  <span key="t" className={`font-bold ${theme.highlight}`}>Earthquake Drill</span>,
                  <span key="dur" className={theme.iconColor}>6 min 15 sec</span>,
                  <span key="p" className={theme.iconColor}>1,024</span>,
                  <span key="i" className={`text-xs ${theme.iconColor}`}>Class 2 took too long. Teachers retrained.</span>,
                  <StatusBadge key="s" status="Approved" theme={theme} />,
                ],
                [
                  <span key="d" className={`text-xs ${theme.iconColor}`}>01 Nov 2025</span>,
                  <span key="t" className={`font-bold ${theme.highlight}`}>Intruder Alert Drill</span>,
                  <span key="dur" className={theme.iconColor}>2 min 45 sec</span>,
                  <span key="p" className={theme.iconColor}>-</span>,
                  <span key="i" className={`text-xs ${theme.iconColor}`}>All classrooms locked within target time.</span>,
                  <StatusBadge key="s" status="Approved" theme={theme} />,
                ],
              ]}
              theme={theme}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PATROL LOG MODULE ───────────────────────────────
function PatrolLogModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Today\'s Schedule');

  const completedCount = mockPatrolLog.filter(p => p.status === 'Completed').length;
  const pendingCount = mockPatrolLog.filter(p => p.status === 'Pending').length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Patrol Log</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}>
          <Plus size={14} /> Log Patrol
        </button>
      </div>
      <TabBar tabs={['Today\'s Schedule', 'Guards', 'History']} active={tab} onChange={setTab} theme={theme} />

      {tab === 'Today\'s Schedule' && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={CheckCircle} label="Completed" value={completedCount} color="bg-emerald-500" theme={theme} />
            <StatCard icon={Clock} label="Pending" value={pendingCount} color="bg-amber-500" theme={theme} />
            <StatCard icon={AlertTriangle} label="Issues Found" value={2} color="bg-red-500" sub="Fire ext. + CCTV" theme={theme} />
            <StatCard icon={Footprints} label="Progress" value={`${Math.round((completedCount / mockPatrolLog.length) * 100)}%`} color="bg-blue-500" theme={theme} />
          </div>

          {/* Progress Bar */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Today&apos;s Progress</h3>
              <span className={`text-xs font-bold ${theme.primaryText}`}>{completedCount}/{mockPatrolLog.length} patrols</span>
            </div>
            <div className={`w-full h-3 rounded-full ${theme.secondaryBg}`}>
              <div
                className={`h-3 rounded-full ${theme.primary} transition-all`}
                style={{ width: `${(completedCount / mockPatrolLog.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Patrol Schedule */}
          <DataTable
            headers={['ID', 'Time', 'Area', 'Guard', 'Status', 'Remarks']}
            rows={mockPatrolLog.map(p => [
              <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{p.id}</span>,
              <span key="time" className={`font-mono text-xs ${theme.iconColor}`}>{p.time}</span>,
              <span key="area" className={`font-bold ${theme.highlight}`}>{p.area}</span>,
              <span key="guard" className={theme.iconColor}>{p.guard}</span>,
              <StatusBadge key="status" status={p.status === 'Completed' ? 'Active' : 'Pending'} theme={theme} />,
              <span key="remarks" className={`text-xs ${p.remarks.includes('expired') || p.remarks.includes('crack') || p.remarks.includes('shifted') ? 'text-amber-600 font-bold' : theme.iconColor}`}>{p.remarks}</span>,
            ])}
            theme={theme}
          />
        </>
      )}

      {tab === 'Guards' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Rajiv Kumar', role: 'Head Guard', shift: '06:00 AM - 02:00 PM', phone: '98765 00015', patrols: 4, status: 'On Duty', area: 'Main Gate + Boundary' },
              { name: 'Manoj Singh', role: 'Guard', shift: '06:00 AM - 02:00 PM', phone: '98765 00016', patrols: 3, status: 'On Duty', area: 'Internal + Canteen' },
              { name: 'Suresh Yadav', role: 'Guard', shift: '06:00 AM - 02:00 PM', phone: '98765 00017', patrols: 2, status: 'On Duty', area: 'Corridors + Washrooms' },
              { name: 'Dinesh Patil', role: 'Night Guard', shift: '10:00 PM - 06:00 AM', phone: '98765 00018', patrols: 0, status: 'Off Duty', area: 'Full Campus (Night)' },
            ].map((guard, i) => (
              <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-xl ${guard.status === 'On Duty' ? 'bg-emerald-500' : 'bg-slate-400'} flex items-center justify-center text-white font-bold text-sm`}>
                    {guard.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${theme.highlight}`}>{guard.name}</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>{guard.role}</p>
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${theme.accentBg} space-y-1`}>
                  <div className="flex justify-between">
                    <span className={`text-xs ${theme.iconColor}`}>Shift:</span>
                    <span className={`text-xs font-bold ${theme.highlight}`}>{guard.shift}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-xs ${theme.iconColor}`}>Area:</span>
                    <span className={`text-xs ${theme.highlight}`}>{guard.area}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-xs ${theme.iconColor}`}>Phone:</span>
                    <span className={`text-xs font-mono ${theme.iconColor}`}>{guard.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-xs ${theme.iconColor}`}>Patrols Today:</span>
                    <span className={`text-xs font-bold ${theme.primaryText}`}>{guard.patrols}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-xs ${theme.iconColor}`}>Status:</span>
                    <StatusBadge status={guard.status === 'On Duty' ? 'Active' : 'Cleared'} theme={theme} />
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button className={`flex-1 px-3 py-2 rounded-xl text-xs font-bold ${theme.secondaryBg} ${theme.iconColor} flex items-center justify-center gap-1`}>
                    <Phone size={10} /> Call
                  </button>
                  <button className={`flex-1 px-3 py-2 rounded-xl text-xs font-bold ${theme.secondaryBg} ${theme.iconColor} flex items-center justify-center gap-1`}>
                    <Radio size={10} /> Walkie
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === 'History' && (
        <>
          <div className="flex gap-3">
            <SearchBar placeholder="Search by date, guard, area..." theme={theme} icon={Search} />
            <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Filter size={12} /> Filter</button>
            <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Download size={12} /> Export</button>
          </div>
          <DataTable
            headers={['Date', 'Total Patrols', 'Completed', 'Issues', 'Guards On Duty', 'Status']}
            rows={[
              [
                <span key="d" className={`font-bold ${theme.highlight}`}>Today</span>,
                <span key="t" className={theme.iconColor}>10</span>,
                <span key="c" className={`font-bold ${theme.primaryText}`}>{completedCount}</span>,
                <span key="i" className="text-xs text-amber-600 font-bold">2</span>,
                <span key="g" className={theme.iconColor}>3</span>,
                <StatusBadge key="s" status="Running" theme={theme} />,
              ],
              [
                <span key="d" className={`font-bold ${theme.highlight}`}>11 Feb 2026</span>,
                <span key="t" className={theme.iconColor}>10</span>,
                <span key="c" className={`font-bold ${theme.primaryText}`}>10</span>,
                <span key="i" className={theme.iconColor}>0</span>,
                <span key="g" className={theme.iconColor}>3</span>,
                <StatusBadge key="s" status="Approved" theme={theme} />,
              ],
              [
                <span key="d" className={`font-bold ${theme.highlight}`}>10 Feb 2026</span>,
                <span key="t" className={theme.iconColor}>10</span>,
                <span key="c" className={`font-bold ${theme.primaryText}`}>10</span>,
                <span key="i" className="text-xs text-amber-600 font-bold">1</span>,
                <span key="g" className={theme.iconColor}>4</span>,
                <StatusBadge key="s" status="Approved" theme={theme} />,
              ],
              [
                <span key="d" className={`font-bold ${theme.highlight}`}>9 Feb 2026</span>,
                <span key="t" className={theme.iconColor}>10</span>,
                <span key="c" className={`font-bold ${theme.primaryText}`}>9</span>,
                <span key="i" className={theme.iconColor}>0</span>,
                <span key="g" className={theme.iconColor}>3</span>,
                <StatusBadge key="s" status="Pending" theme={theme} />,
              ],
              [
                <span key="d" className={`font-bold ${theme.highlight}`}>8 Feb 2026</span>,
                <span key="t" className={theme.iconColor}>10</span>,
                <span key="c" className={`font-bold ${theme.primaryText}`}>10</span>,
                <span key="i" className={theme.iconColor}>0</span>,
                <span key="g" className={theme.iconColor}>4</span>,
                <StatusBadge key="s" status="Approved" theme={theme} />,
              ],
            ]}
            theme={theme}
          />
        </>
      )}
    </div>
  );
}

// ─── GATE PASS MODULE ────────────────────────────────
function GatePassModule({ theme }: { theme: Theme }) {
  const [showForm, setShowForm] = useState(false);
  const passes = [
    { id: 'GP-001', name: 'Aarav Patel', type: 'Student', purpose: 'Medical', exit: '10:30 AM', expected: '12:00 PM', auth: 'Mrs. Sunita Rao', status: 'Active' },
    { id: 'GP-002', name: 'Mr. Arvind Joshi', type: 'Staff', purpose: 'Official', exit: '11:00 AM', expected: '02:00 PM', auth: 'Principal', status: 'Active' },
    { id: 'GP-003', name: 'Ramesh Gupta', type: 'Visitor', purpose: 'Personal', exit: '09:45 AM', expected: '10:30 AM', auth: 'Admin Officer', status: 'Returned' },
    { id: 'GP-004', name: 'Siya Sharma', type: 'Student', purpose: 'Emergency', exit: '09:15 AM', expected: '11:00 AM', auth: 'VP', status: 'Returned' },
    { id: 'GP-005', name: 'Mrs. Kavitha Nair', type: 'Staff', purpose: 'Personal', exit: '10:00 AM', expected: '11:30 AM', auth: 'HOD', status: 'Active' },
    { id: 'GP-006', name: 'Rohan Deshmukh', type: 'Student', purpose: 'Medical', exit: '08:30 AM', expected: '10:00 AM', auth: 'Class Teacher', status: 'Overdue' },
  ];
  const sc: Record<string, string> = { Active: 'bg-blue-500/20 text-blue-400', Returned: 'bg-emerald-500/20 text-emerald-400', Overdue: 'bg-red-500/20 text-red-400' };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Gate Pass Management</h1>
        <button onClick={() => setShowForm(true)} className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}>
          <Plus size={14} /> Issue Gate Pass
        </button>
      </div>

      {/* Mobile App Preview */}
      <MobilePreviewToggle theme={theme} mobileContent={
        <MobileFrame title="Gate Pass Scanner" theme={theme}>
          <div className="bg-gray-900 rounded-xl h-44 relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-4 border-2 border-emerald-400/40 rounded-lg" />
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-emerald-400 rounded-tl-md" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-emerald-400 rounded-tr-md" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-emerald-400 rounded-bl-md" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-emerald-400 rounded-br-md" />
            <div className="absolute left-6 right-6 h-0.5 bg-emerald-400/60 top-1/2 animate-pulse" />
            <div className="text-center relative z-10">
              <p className="text-[10px] text-white/80 font-bold">Scan QR Code / Barcode</p>
              <p className="text-[8px] text-white/50 mt-1">Point camera at gate pass</p>
            </div>
          </div>
          <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm">&#10003;</div>
              <div>
                <p className="text-[11px] font-bold text-emerald-700">Pass Verified</p>
                <p className="text-[9px] text-emerald-500">GP-002 &bull; Valid</p>
              </div>
            </div>
            <div className="space-y-1 ml-10">
              <p className="text-[10px] text-gray-700"><span className="font-bold">Name:</span> Mr. Arvind Joshi</p>
              <p className="text-[10px] text-gray-700"><span className="font-bold">Type:</span> Staff &bull; Official Work</p>
              <p className="text-[10px] text-gray-700"><span className="font-bold">Exit:</span> 11:00 AM &bull; <span className="font-bold">Return:</span> 02:00 PM</p>
              <p className="text-[10px] text-gray-700"><span className="font-bold">Auth:</span> Principal</p>
            </div>
          </div>
          <div className="bg-red-50 rounded-xl p-3 border border-red-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-sm">&#10005;</div>
              <div>
                <p className="text-[11px] font-bold text-red-700">Invalid / Expired Pass</p>
                <p className="text-[9px] text-red-500">Pass expired or not found. Deny exit.</p>
              </div>
            </div>
          </div>
          <button className="w-full py-3.5 bg-emerald-500 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2">&#10003; Allow Exit</button>
          <button className="w-full py-3.5 bg-amber-500 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2">&#128221; Mark Return</button>
          <button className="w-full py-3.5 bg-red-100 text-red-600 rounded-xl text-sm font-bold flex items-center justify-center gap-2">&#128683; Deny &mdash; Invalid Pass</button>
        </MobileFrame>
      } />

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard icon={FileText} label="Active Passes" value={passes.filter(p => p.status === 'Active').length} color="bg-blue-500" theme={theme} />
        <StatCard icon={CheckCircle} label="Returned Today" value={passes.filter(p => p.status === 'Returned').length} color="bg-emerald-500" theme={theme} />
        <StatCard icon={AlertTriangle} label="Overdue" value={passes.filter(p => p.status === 'Overdue').length} color="bg-red-500" sub="needs attention" theme={theme} />
      </div>

      {/* Passes Table */}
      <DataTable
        headers={['Pass No', 'Name', 'Type', 'Purpose', 'Exit Time', 'Expected Return', 'Authorized By', 'Status', '']}
        rows={passes.map(p => [
          <span key="id" className={`font-mono text-xs font-bold ${theme.primaryText}`}>{p.id}</span>,
          <span key="name" className={`font-bold ${theme.highlight}`}>{p.name}</span>,
          <span key="type" className={`text-xs px-2 py-0.5 rounded-full font-bold ${p.type === 'Student' ? 'bg-blue-100 text-blue-700' : p.type === 'Staff' ? 'bg-purple-100 text-purple-700' : 'bg-amber-100 text-amber-700'}`}>{p.type}</span>,
          <span key="purpose" className={theme.iconColor}>{p.purpose}</span>,
          <span key="exit" className={`text-xs font-mono ${theme.iconColor}`}>{p.exit}</span>,
          <span key="expected" className={`text-xs font-mono ${theme.iconColor}`}>{p.expected}</span>,
          <span key="auth" className={`text-xs ${theme.iconColor}`}>{p.auth}</span>,
          <span key="status" className={`text-xs px-2 py-0.5 rounded-full font-bold ${sc[p.status]}`}>{p.status}</span>,
          <div key="actions" className="flex gap-1">
            {p.status === 'Active' && <button onClick={() => window.alert('Marked as returned (Blueprint demo)')} className="px-2 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-700">Mark Return</button>}
            {p.status === 'Overdue' && <button onClick={() => window.alert('Marked as returned (Blueprint demo)')} className="px-2 py-1 rounded-lg text-xs font-bold bg-red-100 text-red-600 animate-pulse">Mark Return</button>}
          </div>,
        ])}
        theme={theme}
      />

      {/* Issue Gate Pass Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowForm(false)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 w-full max-w-md space-y-4`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Issue Gate Pass</h3>
              <button onClick={() => setShowForm(false)} className={theme.iconColor}><X size={18} /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Person Type *</label>
                <select className={`w-full px-3 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm`}>
                  <option>Student</option><option>Staff</option><option>Visitor</option>
                </select>
              </div>
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Name *</label>
                <input placeholder="Full name" className={`w-full px-3 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm`} />
              </div>
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Purpose *</label>
                <select className={`w-full px-3 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm`}>
                  <option>Medical</option><option>Personal</option><option>Official</option><option>Emergency</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Exit Time *</label>
                  <input type="time" className={`w-full px-3 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm`} />
                </div>
                <div>
                  <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Expected Return *</label>
                  <input type="time" className={`w-full px-3 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm`} />
                </div>
              </div>
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Authorized By *</label>
                <select className={`w-full px-3 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm`}>
                  <option>Principal</option><option>Vice Principal</option><option>HOD</option><option>Class Teacher</option><option>Admin Officer</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => setShowForm(false)} className={`flex-1 py-2.5 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.highlight}`}>Cancel</button>
              <button onClick={() => { setShowForm(false); window.alert('Gate pass GP-007 issued successfully (Blueprint demo)'); }} className={`flex-1 py-2.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}>Issue Pass</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── COMMUNICATION MODULE ────────────────────────────

function CommunicationModule({ theme }: { theme: Theme }) {
  const [commTab, setCommTab] = useState('Chat');
  const tabs = ['Alerts', 'Messages', 'Chat'];

  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Communication</h1>
      <TabBar tabs={tabs} active={commTab} onChange={setCommTab} theme={theme} />

      {commTab === 'Chat' && (
        <div className="h-[calc(100vh-220px)]">
          <ChatsView theme={theme} compact />
        </div>
      )}

      {commTab === 'Alerts' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-2`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-2`}>Gate Alerts</h3>
          {[
            { title: 'Unauthorized Vehicle at Service Gate', detail: 'Unknown van attempted entry without pass. Turned away.', time: '11:45 AM', severity: 'Critical' },
            { title: 'Fire Extinguisher Expired — Lab 2', detail: 'Found during morning patrol. Maintenance team notified.', time: '08:15 AM', severity: 'Warning' },
            { title: 'CCTV #7 Angle Shifted', detail: 'First floor corridor camera needs adjustment. IT informed.', time: '09:00 AM', severity: 'Info' },
          ].map((a, i) => (
            <div key={i} className={`p-3 rounded-xl ${theme.accentBg} flex items-center gap-3`}>
              <div className={`w-2 h-2 rounded-full ${a.severity === 'Critical' ? 'bg-red-500' : a.severity === 'Warning' ? 'bg-amber-500' : 'bg-blue-500'}`} />
              <div className="flex-1">
                <p className={`text-xs font-bold ${theme.highlight}`}>{a.title}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{a.detail}</p>
              </div>
              <span className={`text-[10px] ${theme.iconColor}`}>{a.time}</span>
            </div>
          ))}
        </div>
      )}

      {commTab === 'Messages' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-2`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-2`}>Recent Messages</h3>
          {[
            { from: 'Principal Office', text: 'CBSE inspector arriving at 11 AM. Ensure VIP parking is clear.', time: '09:00 AM' },
            { from: 'Admin Officer', text: 'Vendor delivery expected at Service Gate between 2-3 PM.', time: '08:30 AM' },
            { from: 'Transport Head', text: 'Bus #7 delayed. Inform parents waiting at main gate.', time: '07:45 AM' },
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
    </div>
  );
}

// ─── PRE-APPROVED APPOINTMENTS MODULE ────────────────
function PreApprovedModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Today');
  const [appointments, setAppointments] = useState([
    { id: 'PA-001', name: 'Mrs. Rekha Iyer', purpose: 'PTM Follow-up', host: 'Mrs. Kavita Patil', approvedBy: 'Admin Office', validDate: '2026-03-01', validTime: '03:00 PM - 03:30 PM', status: 'Expected' as string },
    { id: 'PA-002', name: 'Suresh Electricals (2 persons)', purpose: 'Electrical Maintenance', host: 'Maintenance Dept', approvedBy: 'Admin Officer', validDate: '2026-03-01', validTime: '02:00 PM - 05:00 PM', status: 'Expected' as string },
    { id: 'PA-003', name: 'Dr. Ravi Kumar', purpose: 'Health Camp Setup', host: 'School Nurse', approvedBy: 'Principal', validDate: '2026-03-01', validTime: '10:00 AM - 12:00 PM', status: 'Arrived' as string },
    { id: 'PA-004', name: 'Rajesh Patel (Parent)', purpose: 'Admission Discussion', host: 'Vice Principal', approvedBy: 'Reception', validDate: '2026-03-01', validTime: '11:00 AM - 11:30 AM', status: 'Expired' as string },
    { id: 'PA-005', name: 'CBSE Inspector', purpose: 'Annual Inspection', host: 'Principal', approvedBy: 'Principal', validDate: '2026-03-03', validTime: '10:00 AM - 02:00 PM', status: 'Expected' as string },
    { id: 'PA-006', name: 'Neha Kapoor (Parent)', purpose: 'Report Card Discussion', host: 'Class Teacher 7-B', approvedBy: 'Coordinator', validDate: '2026-03-02', validTime: '09:30 AM - 10:00 AM', status: 'Expected' as string },
  ]);
  const [pendingApprovals, setPendingApprovals] = useState([
    { id: 'PR-001', name: 'Kiran Desai (Parent)', purpose: 'Fee Discussion', host: 'Accounts', requestedAt: '09:15 AM', status: 'Pending' as string },
    { id: 'PR-002', name: 'Amazon Delivery', purpose: 'Bulk Stationery', host: 'Admin Office', requestedAt: '10:00 AM', status: 'Pending' as string },
  ]);

  const todayAppts = appointments.filter(a => a.validDate === '2026-03-01');
  const weekAppts = appointments;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Pre-Approved Appointments</h1>
        <button onClick={() => {
          const name = 'Walk-in #' + Math.floor(Math.random() * 900 + 100);
          setAppointments([...appointments, { id: 'PA-' + Math.floor(Math.random() * 900 + 100), name, purpose: 'Walk-in', host: 'TBD', approvedBy: 'Guard', validDate: '2026-03-01', validTime: 'Now - 1hr', status: 'Arrived' }]);
          window.alert(`Quick approval created for ${name}! (Blueprint demo)`);
        }} className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}>
          <Plus size={14} /> Approve Walk-in
        </button>
      </div>
      <TabBar tabs={['Today', 'This Week', 'Pending Approval']} active={tab} onChange={setTab} theme={theme} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={CalendarCheck} label="Expected Today" value={todayAppts.filter(a => a.status === 'Expected').length} color="bg-blue-500" theme={theme} />
        <StatCard icon={CheckCircle} label="Arrived" value={todayAppts.filter(a => a.status === 'Arrived').length} color="bg-emerald-500" theme={theme} />
        <StatCard icon={Clock} label="Expired" value={todayAppts.filter(a => a.status === 'Expired').length} color="bg-slate-500" theme={theme} />
        <StatCard icon={Bell} label="Pending Approval" value={pendingApprovals.filter(p => p.status === 'Pending').length} color="bg-amber-500" theme={theme} />
      </div>

      {(tab === 'Today' || tab === 'This Week') && (
        <DataTable
          headers={['ID', 'Visitor', 'Purpose', 'Host', 'Approved By', 'Date', 'Valid Time', 'Status', '']}
          rows={(tab === 'Today' ? todayAppts : weekAppts).map((a, idx) => [
            <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{a.id}</span>,
            <span key="name" className={`font-bold ${theme.highlight}`}>{a.name}</span>,
            <span key="purpose" className={theme.iconColor}>{a.purpose}</span>,
            <span key="host" className={theme.iconColor}>{a.host}</span>,
            <span key="approved" className={`text-xs ${theme.iconColor}`}>{a.approvedBy}</span>,
            <span key="date" className={`text-xs font-mono ${theme.iconColor}`}>{a.validDate}</span>,
            <span key="time" className={`text-xs ${theme.iconColor}`}>{a.validTime}</span>,
            <span key="status" className={`text-xs px-2 py-0.5 rounded-full font-bold ${
              a.status === 'Expected' ? 'bg-blue-100 text-blue-700' : a.status === 'Arrived' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
            }`}>{a.status}</span>,
            <div key="actions" className="flex gap-1">
              {a.status === 'Expected' && (
                <button onClick={() => {
                  const updated = [...appointments];
                  const i = appointments.indexOf(a);
                  updated[i] = { ...a, status: 'Arrived' };
                  setAppointments(updated);
                }} className="px-2 py-1 rounded-lg bg-emerald-100 text-emerald-700 text-[10px] font-bold">Check In</button>
              )}
            </div>,
          ])}
          theme={theme}
        />
      )}

      {tab === 'Pending Approval' && (
        <div className="space-y-3">
          <p className={`text-xs ${theme.iconColor}`}>These visitors are requesting appointment approval from parents/staff portal:</p>
          {pendingApprovals.map((p, idx) => (
            <div key={idx} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex items-center gap-3`}>
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white font-bold text-sm">{p.name.charAt(0)}</div>
              <div className="flex-1">
                <p className={`text-xs font-bold ${theme.highlight}`}>{p.name}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{p.purpose} | Host: {p.host} | Requested: {p.requestedAt}</p>
              </div>
              {p.status === 'Pending' ? (
                <div className="flex gap-1">
                  <button onClick={() => {
                    const updated = [...pendingApprovals]; updated[idx] = { ...p, status: 'Approved' }; setPendingApprovals(updated);
                    setAppointments([...appointments, { id: p.id, name: p.name, purpose: p.purpose, host: p.host, approvedBy: 'Guard', validDate: '2026-03-01', validTime: 'Now - 1hr', status: 'Expected' }]);
                  }} className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-700 text-[10px] font-bold">Approve</button>
                  <button onClick={() => { const updated = [...pendingApprovals]; updated[idx] = { ...p, status: 'Denied' }; setPendingApprovals(updated); }} className="px-3 py-1.5 rounded-lg bg-red-100 text-red-600 text-[10px] font-bold">Deny</button>
                </div>
              ) : (
                <span className={`text-xs font-bold ${p.status === 'Approved' ? 'text-emerald-600' : 'text-red-500'}`}>{p.status}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── DELIVERY TRACKING MODULE ────────────────────────
function DeliveryTrackingModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Active Deliveries');
  const [deliveries, setDeliveries] = useState([
    { id: 'DEL-001', company: 'Flipkart', item: 'Lab Equipment (3 boxes)', receivedBy: 'Rajiv Kumar (Guard)', timeIn: '10:00 AM', timeOut: '10:12 AM', recipient: 'Admin Office', photo: true, status: 'Picked Up' as string },
    { id: 'DEL-002', company: 'Amazon', item: 'Office Stationery', receivedBy: 'Manoj Singh (Guard)', timeIn: '11:30 AM', timeOut: '-', recipient: 'Accounts Dept', photo: true, status: 'Pending Pickup' as string },
    { id: 'DEL-003', company: 'Scholastic Books', item: 'Library Books (15 sets)', receivedBy: 'Rajiv Kumar (Guard)', timeIn: '09:45 AM', timeOut: '-', recipient: 'Library', photo: false, status: 'Pending Pickup' as string },
    { id: 'DEL-004', company: 'Local Vendor', item: 'Sports Equipment', receivedBy: 'Suresh Yadav (Guard)', timeIn: '08:30 AM', timeOut: '09:15 AM', recipient: 'Sports Dept', photo: true, status: 'Picked Up' as string },
    { id: 'DEL-005', company: 'Xerox Service', item: 'Exam Papers (confidential)', receivedBy: 'Rajiv Kumar (Guard)', timeIn: '12:15 PM', timeOut: '-', recipient: 'Principal Office', photo: true, status: 'Notified' as string },
    { id: 'DEL-006', company: 'Food Supplier', item: 'Canteen Supplies (daily)', receivedBy: 'Manoj Singh (Guard)', timeIn: '06:30 AM', timeOut: '07:00 AM', recipient: 'Canteen', photo: false, status: 'Picked Up' as string },
  ]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Delivery Tracking</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}>
          <Plus size={14} /> Log Delivery
        </button>
      </div>
      <TabBar tabs={['Active Deliveries', 'Completed', 'All Deliveries']} active={tab} onChange={setTab} theme={theme} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Package} label="Total Today" value={deliveries.length} color="bg-blue-500" theme={theme} />
        <StatCard icon={Clock} label="Pending Pickup" value={deliveries.filter(d => d.status === 'Pending Pickup').length} color="bg-amber-500" sub="Awaiting recipient" theme={theme} />
        <StatCard icon={Mail} label="Notified" value={deliveries.filter(d => d.status === 'Notified').length} color="bg-purple-500" theme={theme} />
        <StatCard icon={CheckCircle} label="Picked Up" value={deliveries.filter(d => d.status === 'Picked Up').length} color="bg-emerald-500" theme={theme} />
      </div>

      {/* Pending Pickup Alert */}
      {deliveries.filter(d => d.status === 'Pending Pickup').length > 0 && (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-3">
          <Package size={18} className="text-amber-500" />
          <div className="flex-1">
            <p className="text-xs font-bold text-amber-700">{deliveries.filter(d => d.status === 'Pending Pickup').length} package(s) awaiting pickup by recipient</p>
            <p className="text-[10px] text-amber-500">Notification will be sent to recipients</p>
          </div>
          <button onClick={() => window.alert('Notification sent to all recipients! (Blueprint demo)')} className="px-3 py-1.5 rounded-lg bg-amber-500 text-white text-[10px] font-bold flex items-center gap-1">
            <Bell size={10} /> Notify All
          </button>
        </div>
      )}

      <DataTable
        headers={['ID', 'Company', 'Item Description', 'Received By', 'Time In', 'Time Out', 'Recipient', 'Status', '']}
        rows={deliveries
          .filter(d => tab === 'All Deliveries' || (tab === 'Active Deliveries' && d.status !== 'Picked Up') || (tab === 'Completed' && d.status === 'Picked Up'))
          .map((d, idx) => [
            <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{d.id}</span>,
            <span key="company" className={`font-bold ${theme.highlight}`}>{d.company}</span>,
            <span key="item" className={`text-xs ${theme.iconColor}`}>{d.item}</span>,
            <span key="received" className={`text-xs ${theme.iconColor}`}>{d.receivedBy}</span>,
            <span key="in" className={`font-mono text-xs ${theme.iconColor}`}>{d.timeIn}</span>,
            <span key="out" className={`font-mono text-xs ${d.timeOut === '-' ? 'text-amber-600 font-bold' : theme.iconColor}`}>{d.timeOut}</span>,
            <span key="recip" className={theme.iconColor}>{d.recipient}</span>,
            <span key="status" className={`text-xs px-2 py-0.5 rounded-full font-bold ${
              d.status === 'Picked Up' ? 'bg-emerald-100 text-emerald-700' : d.status === 'Notified' ? 'bg-purple-100 text-purple-700' : 'bg-amber-100 text-amber-700'
            }`}>{d.status}</span>,
            <div key="actions" className="flex gap-1">
              {d.status === 'Pending Pickup' && (
                <>
                  <button onClick={() => {
                    const all = [...deliveries]; const i = deliveries.indexOf(d);
                    all[i] = { ...d, status: 'Notified' }; setDeliveries(all);
                  }} className="px-2 py-1 rounded-lg bg-purple-100 text-purple-700 text-[10px] font-bold flex items-center gap-0.5"><Bell size={10} /> Notify</button>
                  <button onClick={() => {
                    const all = [...deliveries]; const i = deliveries.indexOf(d);
                    all[i] = { ...d, status: 'Picked Up', timeOut: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }) }; setDeliveries(all);
                  }} className="px-2 py-1 rounded-lg bg-emerald-100 text-emerald-700 text-[10px] font-bold">Picked Up</button>
                </>
              )}
              {d.status === 'Notified' && (
                <button onClick={() => {
                  const all = [...deliveries]; const i = deliveries.indexOf(d);
                  all[i] = { ...d, status: 'Picked Up', timeOut: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }) }; setDeliveries(all);
                }} className="px-2 py-1 rounded-lg bg-emerald-100 text-emerald-700 text-[10px] font-bold">Mark Picked Up</button>
              )}
            </div>,
          ])}
        theme={theme}
      />
    </div>
  );
}

// ─── PHOTO BADGE PRINTING MODULE ─────────────────────
function PhotoBadgeModule({ theme }: { theme: Theme }) {
  const [printBatch, setPrintBatch] = useState<string[]>([]);
  const purposeDuration: Record<string, string> = { 'Delivery': '1 hr', 'Parent Meeting': '2 hrs', 'Fee Payment': '1 hr', 'Maintenance (AC)': '3 hrs', 'Safety Audit': '4 hrs', 'Default': '2 hrs' };

  const visitorsToPrint = mockVisitorsToday.filter(v => v.status === 'Inside');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Photo Badge Printing</h1>
        {printBatch.length > 0 && (
          <button onClick={() => { window.alert(`Printing ${printBatch.length} badge(s)! (Blueprint demo)`); setPrintBatch([]); }}
            className="px-4 py-2.5 bg-amber-500 text-white rounded-xl text-sm font-bold flex items-center gap-1">
            <Printer size={14} /> Print Batch ({printBatch.length})
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={IdCard} label="Badges Issued Today" value={mockVisitorsToday.length} color="bg-blue-500" theme={theme} />
        <StatCard icon={Users} label="Currently Inside" value={visitorsToPrint.length} color="bg-emerald-500" theme={theme} />
        <StatCard icon={Printer} label="Print Queue" value={printBatch.length} color="bg-amber-500" theme={theme} />
        <StatCard icon={Timer} label="Avg. Duration" value="45 min" color="bg-purple-500" theme={theme} />
      </div>

      {/* Badge Preview Cards */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className={`text-sm font-bold ${theme.highlight}`}>Active Visitor Badges</h3>
          <button onClick={() => setPrintBatch(visitorsToPrint.map(v => v.id))} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${theme.secondaryBg} ${theme.iconColor} flex items-center gap-1`}>
            <CheckCircle size={10} /> Select All for Print
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {visitorsToPrint.map((v, i) => {
            const duration = purposeDuration[v.purpose] || purposeDuration['Default'];
            return (
              <div key={i} className={`p-4 rounded-2xl border-2 ${printBatch.includes(v.id) ? 'border-blue-400 shadow-md' : theme.border} ${theme.cardBg} relative`}>
                <input type="checkbox" checked={printBatch.includes(v.id)} onChange={(e) => {
                  if (e.target.checked) setPrintBatch([...printBatch, v.id]);
                  else setPrintBatch(printBatch.filter(p => p !== v.id));
                }} className="absolute top-3 right-3 rounded" />
                {/* Badge content */}
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-14 h-14 rounded-xl ${theme.secondaryBg} flex items-center justify-center ${v.photo ? 'bg-blue-100' : ''}`}>
                    {v.photo ? (
                      <User size={24} className="text-blue-500" />
                    ) : (
                      <Camera size={20} className={theme.iconColor} />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-bold ${theme.highlight}`}>{v.name}</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>{v.purpose}</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>Host: {v.host}</p>
                  </div>
                </div>
                <div className={`p-2 rounded-lg ${theme.accentBg} space-y-1`}>
                  <div className="flex justify-between">
                    <span className={`text-[10px] ${theme.iconColor}`}>Badge No:</span>
                    <span className={`text-[10px] font-bold ${theme.primaryText}`}>{v.badge}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-[10px] ${theme.iconColor}`}>Date:</span>
                    <span className={`text-[10px] ${theme.highlight}`}>{new Date().toLocaleDateString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-[10px] ${theme.iconColor}`}>Time In:</span>
                    <span className={`text-[10px] font-mono ${theme.highlight}`}>{v.inTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-[10px] ${theme.iconColor}`}>Expires:</span>
                    <span className="text-[10px] font-bold text-red-600">{duration} from check-in</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-[10px] ${theme.iconColor}`}>ID Type:</span>
                    <span className={`text-[10px] ${theme.highlight}`}>{v.idType}</span>
                  </div>
                </div>
                <button onClick={() => window.alert(`Printing badge ${v.badge} for ${v.name}! (Blueprint demo)`)}
                  className={`mt-2 w-full py-2 rounded-xl text-xs font-bold ${theme.primary} text-white flex items-center justify-center gap-1`}>
                  <Printer size={12} /> Print Badge
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* All Visitors (for reprinting) */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>All Badges Issued Today</h3>
        <DataTable
          headers={['Badge', 'Visitor', 'Purpose', 'ID Type', 'Time In', 'Expires', 'Status', '']}
          rows={mockVisitorsToday.map(v => {
            const duration = purposeDuration[v.purpose] || purposeDuration['Default'];
            return [
              <span key="badge" className={`font-mono text-xs font-bold ${theme.primaryText}`}>{v.badge}</span>,
              <span key="name" className={`font-bold ${theme.highlight}`}>{v.name}</span>,
              <span key="purpose" className={theme.iconColor}>{v.purpose}</span>,
              <span key="id" className={theme.iconColor}>{v.idType}</span>,
              <span key="in" className={`font-mono text-xs ${theme.iconColor}`}>{v.inTime}</span>,
              <span key="exp" className="text-xs text-red-600 font-bold">{duration}</span>,
              <StatusBadge key="status" status={v.status === 'Inside' ? 'Active' : 'Cleared'} theme={theme} />,
              <button key="reprint" onClick={() => window.alert(`Reprinting badge ${v.badge}! (Blueprint demo)`)} className={`px-2 py-1 rounded-lg ${theme.secondaryBg} text-[10px] font-bold ${theme.iconColor} flex items-center gap-0.5`}>
                <Printer size={10} /> Reprint
              </button>,
            ];
          })}
          theme={theme}
        />
      </div>
    </div>
  );
}

// ─── EXPORT ──────────────────────────────────────────
export default function Page() {
  return (
    <BlueprintLayout>
      <SecurityDashboard />
    </BlueprintLayout>
  );
}
