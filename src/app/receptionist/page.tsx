'use client';

import React, { useState } from 'react';
import BlueprintLayout from '@/components/BlueprintLayout';
import { StatCard, TabBar, StatusBadge, SearchBar, DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import StakeholderProfile from '@/components/StakeholderProfile';
import TaskTrackerPanel from '@/components/TaskTrackerPanel';
import { ChatsView } from '@/components/ChatModule';
import SupportModule from '@/components/SupportModule';
import YourInputsModule from '@/components/YourInputsModule';
import { type TeamMember } from '@/lib/auth';
import {
  Home, Users, UserPlus, Phone, Mail, Calendar, Clock, Search, Plus, Eye, Edit,
  Filter, Download, CheckCircle, AlertTriangle, ArrowRight, PhoneCall, PhoneIncoming,
  PhoneOutgoing, Package, BookOpen, Shield, UserCheck, Briefcase, Building2,
  MapPin, Bell, MessageSquare, LogIn, LogOut, BadgeCheck, Hash, FileText, Send, User,
  PanelLeftClose, PanelLeftOpen, Headphones, Banknote, CreditCard, X, IndianRupee, ClipboardCheck
} from 'lucide-react';

// ─── MODULE SIDEBAR ────────────────────────────────
const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'visitors', label: 'Visitors', icon: Shield },
  { id: 'enquiries', label: 'Enquiries', icon: UserPlus },
  { id: 'calls', label: 'Calls', icon: Phone },
  { id: 'fee-counter', label: 'Fee Counter', icon: Banknote },
  { id: 'courier', label: 'Courier/Mail', icon: Package },
  { id: 'appointments', label: 'Appointments', icon: Calendar },
  { id: 'search-dir', label: 'Search Directory', icon: Search },
  { id: 'directory', label: 'Staff Directory', icon: BookOpen },
  { id: 'communication', label: 'Communication', icon: MessageSquare },
  { id: 'your-inputs', label: 'Your Inputs', icon: ClipboardCheck },
  { id: 'support', label: 'Support', icon: Headphones },
];

// ─── MOCK DATA ──────────────────────────────────────

const mockVisitors = [
  { id: 'V001', name: 'Rajesh Sharma', purpose: 'Parent Meeting', host: 'Mrs. Sunita Rao (Class Teacher)', phone: '98765-43210', idType: 'Aadhaar', badge: 'B-12', timeIn: '09:15 AM', timeOut: '10:05 AM', status: 'Checked Out' },
  { id: 'V002', name: 'Amit Patel', purpose: 'Fee Payment Query', host: 'Mr. Dinesh (Accounts)', phone: '87654-32109', idType: 'Driving License', badge: 'B-14', timeIn: '09:40 AM', timeOut: '—', status: 'In Campus' },
  { id: 'V003', name: 'Smt. Kavita Joshi', purpose: 'Admission Enquiry', host: 'Receptionist', phone: '99887-65432', idType: 'Aadhaar', badge: 'B-07', timeIn: '10:00 AM', timeOut: '10:30 AM', status: 'Checked Out' },
  { id: 'V004', name: 'Suresh Verma (Vendor)', purpose: 'Stationery Delivery', host: 'Mr. Prakash (Store)', phone: '97654-12345', idType: 'Vendor ID', badge: 'B-21', timeIn: '10:20 AM', timeOut: '—', status: 'In Campus' },
  { id: 'V005', name: 'Inspector R.K. Singh', purpose: 'CBSE Inspection', host: 'Principal', phone: '90123-45678', idType: 'Govt. ID', badge: 'B-01', timeIn: '11:00 AM', timeOut: '—', status: 'In Campus' },
  { id: 'V006', name: 'Dr. Meena Kulkarni', purpose: 'Health Checkup Camp', host: 'Mrs. Anita (Nurse)', phone: '91234-56789', idType: 'Medical ID', badge: 'B-09', timeIn: '08:30 AM', timeOut: '12:00 PM', status: 'Checked Out' },
];

const mockEnquiries = [
  { id: 'ENQ-101', child: 'Aarav Mehta', parent: 'Mr. Vikram Mehta', class: 'Nursery', source: 'Walk-in', phone: '98765-11223', followUp: '14 Feb 2026', status: 'New' },
  { id: 'ENQ-102', child: 'Ishita Reddy', parent: 'Mrs. Lakshmi Reddy', class: 'LKG', source: 'Phone Call', phone: '87654-22334', followUp: '13 Feb 2026', status: 'Follow-up' },
  { id: 'ENQ-103', child: 'Reyansh Gupta', parent: 'Mr. Sanjay Gupta', class: 'Class 3', source: 'Website', phone: '99887-33445', followUp: '12 Feb 2026', status: 'Follow-up' },
  { id: 'ENQ-104', child: 'Ananya Desai', parent: 'Mr. Ravi Desai', class: 'Class 6', source: 'Referral', phone: '97654-44556', followUp: '10 Feb 2026', status: 'Converted' },
  { id: 'ENQ-105', child: 'Dhruv Singhania', parent: 'Mrs. Pooja Singhania', class: 'Class 1', source: 'Walk-in', phone: '90123-55667', followUp: '08 Feb 2026', status: 'Lost' },
  { id: 'ENQ-106', child: 'Myra Kapoor', parent: 'Mr. Ashish Kapoor', class: 'UKG', source: 'Social Media', phone: '91234-66778', followUp: '15 Feb 2026', status: 'New' },
];

const mockCalls = [
  { id: 'CL-301', caller: 'Mrs. Priya Nair', purpose: 'Absent child - Arjun (Class 4-B)', time: '08:15 AM', duration: '3 min', action: 'Informed class teacher', forwardedTo: 'Mrs. Sunita Rao', type: 'Incoming' },
  { id: 'CL-302', caller: 'Mr. Ramesh (Transport)', purpose: 'Bus #7 delayed by 20 min', time: '08:30 AM', duration: '2 min', action: 'Announced to parents at gate', forwardedTo: '—', type: 'Incoming' },
  { id: 'CL-303', caller: 'Receptionist', purpose: 'Fee reminder - Aditya Jain (Class 8)', time: '09:00 AM', duration: '4 min', action: 'Parent confirmed payment by Friday', forwardedTo: '—', type: 'Outgoing' },
  { id: 'CL-304', caller: 'CBSE Regional Office', purpose: 'Document verification query', time: '09:45 AM', duration: '6 min', action: 'Forwarded to Principal office', forwardedTo: 'Principal', type: 'Incoming' },
  { id: 'CL-305', caller: 'Mr. Vikram Mehta', purpose: 'Admission process enquiry', time: '10:15 AM', duration: '5 min', action: 'Scheduled campus visit for 14 Feb', forwardedTo: '—', type: 'Incoming' },
  { id: 'CL-306', caller: 'Receptionist', purpose: 'Vendor follow-up - Science lab equipment', time: '11:00 AM', duration: '3 min', action: 'Delivery confirmed for 16 Feb', forwardedTo: '—', type: 'Outgoing' },
];

const mockCourier = [
  { id: 'CR-201', type: 'Courier', from: 'CBSE Regional Office', to: 'Principal', date: '12 Feb 2026', receivedBy: 'Receptionist', tracking: 'AWB-7823901', status: 'Delivered' },
  { id: 'CR-202', type: 'Letter', from: 'District Education Office', to: 'School Admin', date: '12 Feb 2026', receivedBy: 'Receptionist', tracking: '—', status: 'Pending Pickup' },
  { id: 'CR-203', type: 'Parcel', from: 'Oxford University Press', to: 'Library', date: '11 Feb 2026', receivedBy: 'Mr. Prakash', tracking: 'TRK-4456123', status: 'Delivered' },
  { id: 'CR-204', type: 'Courier', from: 'School (Outward)', to: 'State Education Board', date: '11 Feb 2026', receivedBy: '—', tracking: 'AWB-9912345', status: 'Dispatched' },
  { id: 'CR-205', type: 'Parcel', from: 'Amazon (Lab Supplies)', to: 'Science Dept.', date: '10 Feb 2026', receivedBy: 'Mr. Jatin (Lab Asst.)', tracking: 'AMZ-112233', status: 'Delivered' },
  { id: 'CR-206', type: 'Letter', from: 'Bank of Baroda', to: 'Accounts Dept.', date: '12 Feb 2026', receivedBy: 'Receptionist', tracking: '—', status: 'Pending Pickup' },
];

const mockAppointments = [
  { id: 'APT-01', visitor: 'Mr. & Mrs. Mehta', purpose: 'Admission Discussion', with: 'Principal', date: '14 Feb 2026', time: '10:00 AM', type: 'Parent Meeting', status: 'Confirmed' },
  { id: 'APT-02', visitor: 'Mr. Suresh (HP Printers)', purpose: 'Printer AMC Renewal', with: 'Admin Officer', date: '13 Feb 2026', time: '02:00 PM', type: 'Vendor Visit', status: 'Confirmed' },
  { id: 'APT-03', visitor: 'DEO Inspector', purpose: 'Annual Compliance Check', with: 'Principal + VP', date: '18 Feb 2026', time: '11:00 AM', type: 'Official Visit', status: 'Pending' },
  { id: 'APT-04', visitor: 'Mrs. Lakshmi Reddy', purpose: 'Student Progress Review', with: 'Class Teacher (LKG)', date: '13 Feb 2026', time: '03:30 PM', type: 'Parent Meeting', status: 'Confirmed' },
  { id: 'APT-05', visitor: 'Fire Safety Officer', purpose: 'Fire Safety Audit', with: 'Admin Officer', date: '20 Feb 2026', time: '10:00 AM', type: 'Official Visit', status: 'Pending' },
  { id: 'APT-06', visitor: 'Mr. Ashish Kapoor', purpose: 'School Tour + Admission', with: 'Counselor', date: '15 Feb 2026', time: '11:30 AM', type: 'Parent Meeting', status: 'Confirmed' },
];

const mockDirectory = [
  { name: 'Dr. Anand Kulkarni', role: 'Principal', dept: 'Administration', ext: '101', phone: '98765-00001', email: 'principal@school.edu' },
  { name: 'Mrs. Meera Iyer', role: 'Vice Principal', dept: 'Administration', ext: '102', phone: '98765-00002', email: 'vp@school.edu' },
  { name: 'Mr. Dinesh Agarwal', role: 'Accounts Head', dept: 'Accounts', ext: '201', phone: '98765-00003', email: 'accounts@school.edu' },
  { name: 'Mrs. Sunita Rao', role: 'HoD - Primary', dept: 'Academics', ext: '301', phone: '98765-00004', email: 'primary@school.edu' },
  { name: 'Mr. Prakash Jain', role: 'Admin Officer', dept: 'Administration', ext: '103', phone: '98765-00005', email: 'admin@school.edu' },
  { name: 'Mr. Ramesh Yadav', role: 'Transport Head', dept: 'Transport', ext: '401', phone: '98765-00006', email: 'transport@school.edu' },
  { name: 'Mrs. Anita Sharma', role: 'School Nurse', dept: 'Medical', ext: '501', phone: '98765-00007', email: 'nurse@school.edu' },
  { name: 'Mr. Jatin Patel', role: 'Lab Assistant', dept: 'Science', ext: '302', phone: '98765-00008', email: 'lab@school.edu' },
  { name: 'Mrs. Rekha Deshmukh', role: 'Librarian', dept: 'Library', ext: '303', phone: '98765-00009', email: 'library@school.edu' },
  { name: 'Mr. Ganesh Patil', role: 'Security Head', dept: 'Security', ext: '601', phone: '98765-00010', email: 'security@school.edu' },
  { name: 'Mrs. Neelam Gupta', role: 'HR Manager', dept: 'HR', ext: '104', phone: '98765-00011', email: 'hr@school.edu' },
  { name: 'Mr. Arvind Saxena', role: 'IT Coordinator', dept: 'IT', ext: '701', phone: '98765-00012', email: 'it@school.edu' },
];

// ─── MAIN COMPONENT ─────────────────────────────────

function ReceptionistDashboard({ theme, themeIdx, onThemeChange, currentUser }: { theme?: Theme; themeIdx?: number; onThemeChange?: (idx: number) => void; currentUser?: TeamMember }) {
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
        {activeModule === 'visitors' && <VisitorsModule theme={theme} />}
        {activeModule === 'enquiries' && <EnquiriesModule theme={theme} />}
        {activeModule === 'calls' && <CallsModule theme={theme} />}
        {activeModule === 'fee-counter' && <FeeCounterModule theme={theme} />}
        {activeModule === 'courier' && <CourierModule theme={theme} />}
        {activeModule === 'search-dir' && <StudentParentSearch theme={theme} />}
        {activeModule === 'appointments' && <AppointmentsModule theme={theme} />}
        {activeModule === 'directory' && <DirectoryModule theme={theme} />}
        {activeModule === 'communication' && <CommunicationModule theme={theme} />}
        {activeModule === 'your-inputs' && <YourInputsModule theme={theme} userName={currentUser?.name || ''} />}
        {activeModule === 'support' && <SupportModule theme={theme} role="receptionist" />}
        {activeModule === 'profile' && <StakeholderProfile role="receptionist" theme={theme} onClose={() => setActiveModule('dashboard')} themeIdx={themeIdx} onThemeChange={onThemeChange} />}
      </div>
    </div>
  );
}

// ─── DASHBOARD HOME ─────────────────────────────────

function DashboardHome({ theme, onProfileClick }: { theme: Theme; onProfileClick: () => void }) {
  const inCampus = mockVisitors.filter(v => v.status === 'In Campus').length;
  const newEnquiries = mockEnquiries.filter(e => e.status === 'New').length;
  const todayAppointments = mockAppointments.filter(a => a.date === '14 Feb 2026' || a.date === '13 Feb 2026').length;
  const todayCalls = mockCalls.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${theme.highlight}`}>Front Desk Overview</h1>
          <p className={`text-xs ${theme.iconColor}`}>Thursday, 12 February 2026 — Good Morning!</p>
        </div>
        <button onClick={onProfileClick} title="My Profile" className={`w-9 h-9 rounded-full ${theme.primary} text-white flex items-center justify-center text-xs font-bold hover:opacity-90 transition-opacity`}>AD</button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Shield} label="Visitors In Campus" value={inCampus} color="bg-orange-500" sub="3 checked out" theme={theme} />
        <StatCard icon={UserPlus} label="Pending Enquiries" value={newEnquiries} color="bg-blue-500" sub="2 follow-ups today" theme={theme} />
        <StatCard icon={Calendar} label="Today's Appointments" value={todayAppointments} color="bg-purple-500" sub="next at 10:00 AM" theme={theme} />
        <StatCard icon={PhoneCall} label="Calls Logged" value={todayCalls} color="bg-teal-500" sub="4 incoming, 2 outgoing" theme={theme} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Package} label="Pending Pickups" value="2" color="bg-amber-500" sub="courier/mail" theme={theme} />
        <StatCard icon={Bell} label="Reminders" value="3" color="bg-red-500" sub="follow-ups due" theme={theme} />
        <StatCard icon={CheckCircle} label="Enquiries Converted" value="1" color="bg-emerald-500" sub="this week" theme={theme} />
        <StatCard icon={BadgeCheck} label="Badges Issued" value="6" color="bg-indigo-500" sub="today" theme={theme} />
      </div>

      {/* Quick Actions */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { label: 'Check-in Visitor', icon: LogIn, color: 'bg-orange-500' },
            { label: 'New Enquiry', icon: UserPlus, color: 'bg-blue-500' },
            { label: 'Log Call', icon: PhoneCall, color: 'bg-teal-500' },
            { label: 'Schedule Appointment', icon: Calendar, color: 'bg-purple-500' },
            { label: 'Register Courier', icon: Package, color: 'bg-amber-500' },
            { label: 'Search Directory', icon: BookOpen, color: 'bg-indigo-500' },
            { label: 'Send SMS to Parent', icon: Send, color: 'bg-emerald-500' },
            { label: 'Print Badge', icon: BadgeCheck, color: 'bg-slate-500' },
          ].map(a => (
            <button key={a.label} className={`flex items-center gap-2 p-3 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} transition-all`}>
              <div className={`w-8 h-8 rounded-lg ${a.color} flex items-center justify-center text-white`}><a.icon size={14} /></div>
              <span className={`text-xs font-bold ${theme.highlight}`}>{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Today's Activity Feed */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Today&apos;s Activity</h3>
        <div className="space-y-2">
          {[
            { text: 'Visitor check-in: Inspector R.K. Singh — CBSE Inspection (Badge B-01)', time: '11:00 AM', type: 'visitor' },
            { text: 'Outgoing call: Vendor follow-up for Science lab equipment delivery', time: '11:00 AM', type: 'call' },
            { text: 'Courier received from CBSE Regional Office — handed to Principal', time: '10:45 AM', type: 'courier' },
            { text: 'New enquiry: Mr. Vikram Mehta for Nursery admission (walk-in)', time: '10:15 AM', type: 'enquiry' },
            { text: 'Visitor check-out: Smt. Kavita Joshi — Admission Enquiry completed', time: '10:30 AM', type: 'visitor' },
            { text: 'Stationery delivery received from Suresh Verma (Vendor)', time: '10:20 AM', type: 'courier' },
            { text: 'Bus #7 delay announced — informed waiting parents at gate', time: '08:30 AM', type: 'call' },
            { text: 'Dr. Meena Kulkarni checked in for Health Checkup Camp', time: '08:30 AM', type: 'visitor' },
          ].map((a, i) => (
            <div key={i} className={`flex items-center gap-3 p-2 rounded-xl ${theme.accentBg}`}>
              <div className={`w-2 h-2 rounded-full ${a.type === 'visitor' ? 'bg-orange-500' : a.type === 'call' ? 'bg-teal-500' : a.type === 'courier' ? 'bg-amber-500' : 'bg-blue-500'}`} />
              <p className={`text-xs ${theme.highlight} flex-1`}>{a.text}</p>
              <span className={`text-[10px] ${theme.iconColor} whitespace-nowrap`}>{a.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Appointments Today */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className={`text-sm font-bold ${theme.highlight}`}>Upcoming Appointments</h3>
          <span className={`text-[10px] ${theme.iconColor}`}>Next 3 days</span>
        </div>
        <div className="space-y-2">
          {mockAppointments.filter(a => a.status === 'Confirmed').slice(0, 4).map(a => (
            <div key={a.id} className={`flex items-center gap-3 p-3 rounded-xl ${theme.accentBg}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${a.type === 'Parent Meeting' ? 'bg-purple-100 text-purple-600' : a.type === 'Vendor Visit' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                {a.type === 'Parent Meeting' ? <Users size={16} /> : a.type === 'Vendor Visit' ? <Briefcase size={16} /> : <Building2 size={16} />}
              </div>
              <div className="flex-1">
                <p className={`text-xs font-bold ${theme.highlight}`}>{a.visitor}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{a.purpose} — with {a.with}</p>
              </div>
              <div className="text-right">
                <p className={`text-xs font-bold ${theme.primaryText}`}>{a.time}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{a.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Task Tracker */}
      <TaskTrackerPanel theme={theme} role="receptionist" />
    </div>
  );
}

// ─── VISITORS MODULE ────────────────────────────────

function VisitorsModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All Visitors');
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Visitor Management</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><LogIn size={14} /> Check-in Visitor</button>
      </div>
      <TabBar tabs={['All Visitors', 'In Campus', 'Checked Out', 'Pre-approved']} active={tab} onChange={setTab} theme={theme} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Shield} label="Total Today" value={mockVisitors.length} color="bg-orange-500" theme={theme} />
        <StatCard icon={LogIn} label="In Campus" value={mockVisitors.filter(v => v.status === 'In Campus').length} color="bg-emerald-500" theme={theme} />
        <StatCard icon={LogOut} label="Checked Out" value={mockVisitors.filter(v => v.status === 'Checked Out').length} color="bg-slate-500" theme={theme} />
        <StatCard icon={BadgeCheck} label="Badges Active" value={mockVisitors.filter(v => v.status === 'In Campus').length} color="bg-indigo-500" theme={theme} />
      </div>
      <div className="flex gap-3">
        <SearchBar placeholder="Search visitor name, purpose, host..." theme={theme} icon={Search} />
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Filter size={12} /> Filter</button>
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Download size={12} /> Export</button>
      </div>
      <DataTable
        headers={['Badge', 'Visitor', 'Purpose', 'Host', 'ID Type', 'Time In', 'Time Out', 'Status', '']}
        rows={(tab === 'In Campus' ? mockVisitors.filter(v => v.status === 'In Campus') : tab === 'Checked Out' ? mockVisitors.filter(v => v.status === 'Checked Out') : mockVisitors).map(v => [
          <span key="badge" className={`font-mono text-xs font-bold ${theme.primaryText}`}>{v.badge}</span>,
          <div key="name">
            <span className={`font-bold ${theme.highlight} block`}>{v.name}</span>
            <span className={`text-[10px] ${theme.iconColor}`}>{v.phone}</span>
          </div>,
          <span key="purpose" className={theme.iconColor}>{v.purpose}</span>,
          <span key="host" className={`text-xs ${theme.iconColor}`}>{v.host}</span>,
          <span key="id" className={theme.iconColor}>{v.idType}</span>,
          <span key="in" className={`text-xs font-bold ${theme.highlight}`}>{v.timeIn}</span>,
          <span key="out" className={`text-xs ${v.timeOut === '—' ? theme.iconColor : theme.highlight}`}>{v.timeOut}</span>,
          <StatusBadge key="status" status={v.status} theme={theme} />,
          <div key="actions" className="flex gap-1">
            {v.status === 'In Campus' && (
              <button className={`px-2 py-1 rounded-lg text-[10px] font-bold bg-red-50 text-red-600 hover:bg-red-100`}>Check Out</button>
            )}
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
          </div>
        ])}
        theme={theme}
      />
      <div className={`flex items-center justify-between text-xs ${theme.iconColor} px-2`}>
        <span>Showing {mockVisitors.length} visitors today</span>
        <div className="flex gap-1">
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Previous</button>
          <button className={`px-3 py-1.5 rounded-lg ${theme.primary} text-white`}>1</button>
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Next</button>
        </div>
      </div>
    </div>
  );
}

// ─── ENQUIRIES MODULE ───────────────────────────────

function EnquiriesModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All Enquiries');
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Admission Enquiries</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> New Enquiry</button>
      </div>
      <TabBar tabs={['All Enquiries', 'New', 'Follow-up', 'Converted', 'Lost']} active={tab} onChange={setTab} theme={theme} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={UserPlus} label="Total Enquiries" value={mockEnquiries.length} color="bg-blue-500" theme={theme} />
        <StatCard icon={Clock} label="Follow-ups Due" value={mockEnquiries.filter(e => e.status === 'Follow-up').length} color="bg-amber-500" theme={theme} />
        <StatCard icon={CheckCircle} label="Converted" value={mockEnquiries.filter(e => e.status === 'Converted').length} color="bg-emerald-500" theme={theme} />
        <StatCard icon={AlertTriangle} label="Lost" value={mockEnquiries.filter(e => e.status === 'Lost').length} color="bg-red-500" theme={theme} />
      </div>
      <div className="flex gap-3">
        <SearchBar placeholder="Search by child name, parent, class..." theme={theme} icon={Search} />
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Filter size={12} /> Filter</button>
      </div>
      <DataTable
        headers={['ID', 'Child Name', 'Parent', 'Class', 'Source', 'Follow-up', 'Status', 'Phone', '']}
        rows={(tab === 'All Enquiries' ? mockEnquiries : mockEnquiries.filter(e => e.status === tab)).map(e => [
          <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{e.id}</span>,
          <span key="child" className={`font-bold ${theme.highlight}`}>{e.child}</span>,
          <span key="parent" className={theme.iconColor}>{e.parent}</span>,
          <span key="class" className={theme.iconColor}>{e.class}</span>,
          <span key="source" className={theme.iconColor}>{e.source}</span>,
          <span key="followup" className={`text-xs ${theme.iconColor}`}>{e.followUp}</span>,
          <StatusBadge key="status" status={e.status} theme={theme} />,
          <span key="phone" className={theme.iconColor}>{e.phone}</span>,
          <div key="actions" className="flex gap-1">
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Phone size={12} className={theme.iconColor} /></button>
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Edit size={12} className={theme.iconColor} /></button>
          </div>
        ])}
        theme={theme}
      />
      <div className={`flex items-center justify-between text-xs ${theme.iconColor} px-2`}>
        <span>Showing {mockEnquiries.length} enquiries</span>
        <div className="flex gap-1">
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Previous</button>
          <button className={`px-3 py-1.5 rounded-lg ${theme.primary} text-white`}>1</button>
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Next</button>
        </div>
      </div>
    </div>
  );
}

// ─── CALLS MODULE ───────────────────────────────────

function CallsModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All Calls');
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Phone Call Log</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> Log Call</button>
      </div>
      <TabBar tabs={['All Calls', 'Incoming', 'Outgoing']} active={tab} onChange={setTab} theme={theme} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={PhoneCall} label="Total Calls" value={mockCalls.length} color="bg-teal-500" sub="today" theme={theme} />
        <StatCard icon={PhoneIncoming} label="Incoming" value={mockCalls.filter(c => c.type === 'Incoming').length} color="bg-blue-500" theme={theme} />
        <StatCard icon={PhoneOutgoing} label="Outgoing" value={mockCalls.filter(c => c.type === 'Outgoing').length} color="bg-emerald-500" theme={theme} />
        <StatCard icon={ArrowRight} label="Forwarded" value={mockCalls.filter(c => c.forwardedTo !== '—').length} color="bg-purple-500" theme={theme} />
      </div>
      <div className="flex gap-3">
        <SearchBar placeholder="Search by caller, purpose..." theme={theme} icon={Search} />
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Filter size={12} /> Filter</button>
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Download size={12} /> Export</button>
      </div>
      <DataTable
        headers={['ID', 'Type', 'Caller', 'Purpose', 'Time', 'Duration', 'Action Taken', 'Forwarded To', '']}
        rows={(tab === 'All Calls' ? mockCalls : mockCalls.filter(c => c.type === tab)).map(c => [
          <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{c.id}</span>,
          <span key="type" className={`text-xs font-bold flex items-center gap-1 ${c.type === 'Incoming' ? 'text-blue-600' : 'text-emerald-600'}`}>
            {c.type === 'Incoming' ? <PhoneIncoming size={12} /> : <PhoneOutgoing size={12} />}
            {c.type}
          </span>,
          <span key="caller" className={`font-bold ${theme.highlight}`}>{c.caller}</span>,
          <span key="purpose" className={`text-xs ${theme.iconColor}`}>{c.purpose}</span>,
          <span key="time" className={`text-xs font-bold ${theme.highlight}`}>{c.time}</span>,
          <span key="dur" className={theme.iconColor}>{c.duration}</span>,
          <span key="action" className={`text-xs ${theme.iconColor}`}>{c.action}</span>,
          <span key="fwd" className={c.forwardedTo === '—' ? theme.iconColor : `font-bold ${theme.primaryText}`}>{c.forwardedTo}</span>,
          <button key="actions" className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
        ])}
        theme={theme}
      />
    </div>
  );
}

// ─── COURIER/MAIL MODULE ────────────────────────────

function CourierModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All');
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Courier & Mail Register</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> Register Entry</button>
      </div>
      <TabBar tabs={['All', 'Courier', 'Letter', 'Parcel', 'Outward']} active={tab} onChange={setTab} theme={theme} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Package} label="Total Today" value={mockCourier.filter(c => c.date === '12 Feb 2026').length} color="bg-amber-500" theme={theme} />
        <StatCard icon={Mail} label="Pending Pickup" value={mockCourier.filter(c => c.status === 'Pending Pickup').length} color="bg-red-500" sub="needs attention" theme={theme} />
        <StatCard icon={CheckCircle} label="Delivered" value={mockCourier.filter(c => c.status === 'Delivered').length} color="bg-emerald-500" theme={theme} />
        <StatCard icon={Send} label="Dispatched" value={mockCourier.filter(c => c.status === 'Dispatched').length} color="bg-indigo-500" theme={theme} />
      </div>
      <div className="flex gap-3">
        <SearchBar placeholder="Search by sender, tracking, department..." theme={theme} icon={Search} />
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Filter size={12} /> Filter</button>
      </div>
      <DataTable
        headers={['ID', 'Type', 'From', 'To', 'Date', 'Tracking', 'Received By', 'Status', '']}
        rows={(tab === 'All' ? mockCourier : tab === 'Outward' ? mockCourier.filter(c => c.status === 'Dispatched') : mockCourier.filter(c => c.type === tab)).map(c => [
          <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{c.id}</span>,
          <span key="type" className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.type === 'Courier' ? 'bg-blue-100 text-blue-700' : c.type === 'Letter' ? 'bg-amber-100 text-amber-700' : 'bg-purple-100 text-purple-700'}`}>{c.type}</span>,
          <span key="from" className={`font-bold ${theme.highlight}`}>{c.from}</span>,
          <span key="to" className={theme.iconColor}>{c.to}</span>,
          <span key="date" className={`text-xs ${theme.iconColor}`}>{c.date}</span>,
          <span key="track" className={`font-mono text-[10px] ${theme.iconColor}`}>{c.tracking}</span>,
          <span key="recv" className={theme.iconColor}>{c.receivedBy}</span>,
          <StatusBadge key="status" status={c.status} theme={theme} />,
          <div key="actions" className="flex gap-1">
            {c.status === 'Pending Pickup' && (
              <button className={`px-2 py-1 rounded-lg text-[10px] font-bold bg-emerald-50 text-emerald-600 hover:bg-emerald-100`}>Mark Picked</button>
            )}
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
          </div>
        ])}
        theme={theme}
      />
    </div>
  );
}

// ─── APPOINTMENTS MODULE ────────────────────────────

function AppointmentsModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All');
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Appointments</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> Schedule Appointment</button>
      </div>
      <TabBar tabs={['All', 'Parent Meeting', 'Vendor Visit', 'Official Visit', 'Today']} active={tab} onChange={setTab} theme={theme} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Calendar} label="Total Scheduled" value={mockAppointments.length} color="bg-purple-500" theme={theme} />
        <StatCard icon={CheckCircle} label="Confirmed" value={mockAppointments.filter(a => a.status === 'Confirmed').length} color="bg-emerald-500" theme={theme} />
        <StatCard icon={Clock} label="Pending" value={mockAppointments.filter(a => a.status === 'Pending').length} color="bg-amber-500" theme={theme} />
        <StatCard icon={Users} label="Parent Meetings" value={mockAppointments.filter(a => a.type === 'Parent Meeting').length} color="bg-blue-500" theme={theme} />
      </div>
      <div className="flex gap-3">
        <SearchBar placeholder="Search by visitor, purpose, host..." theme={theme} icon={Search} />
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Filter size={12} /> Filter</button>
      </div>
      <DataTable
        headers={['ID', 'Visitor', 'Purpose', 'Meeting With', 'Date', 'Time', 'Type', 'Status', '']}
        rows={(tab === 'All' ? mockAppointments : tab === 'Today' ? mockAppointments.filter(a => a.date === '12 Feb 2026') : mockAppointments.filter(a => a.type === tab)).map(a => [
          <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{a.id}</span>,
          <span key="visitor" className={`font-bold ${theme.highlight}`}>{a.visitor}</span>,
          <span key="purpose" className={`text-xs ${theme.iconColor}`}>{a.purpose}</span>,
          <span key="with" className={`font-bold ${theme.primaryText}`}>{a.with}</span>,
          <span key="date" className={`text-xs ${theme.iconColor}`}>{a.date}</span>,
          <span key="time" className={`text-xs font-bold ${theme.highlight}`}>{a.time}</span>,
          <span key="type" className={`text-xs font-bold px-2 py-0.5 rounded-full ${a.type === 'Parent Meeting' ? 'bg-purple-100 text-purple-700' : a.type === 'Vendor Visit' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>{a.type}</span>,
          <StatusBadge key="status" status={a.status} theme={theme} />,
          <div key="actions" className="flex gap-1">
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Edit size={12} className={theme.iconColor} /></button>
          </div>
        ])}
        theme={theme}
      />

      {/* Calendar-style view hint */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>This Week&apos;s Schedule</h3>
        <div className="grid grid-cols-5 gap-2">
          {['Mon 10', 'Tue 11', 'Wed 12', 'Thu 13', 'Fri 14'].map((day, i) => (
            <div key={day} className={`p-3 rounded-xl ${i === 2 ? theme.primary + ' text-white' : theme.accentBg}`}>
              <p className={`text-[10px] font-bold ${i === 2 ? 'text-white/70' : theme.iconColor} uppercase`}>{day.split(' ')[0]}</p>
              <p className={`text-lg font-bold ${i === 2 ? 'text-white' : theme.highlight}`}>{day.split(' ')[1]}</p>
              <p className={`text-[10px] font-bold mt-1 ${i === 2 ? 'text-white/80' : theme.primaryText}`}>
                {i === 0 ? '—' : i === 1 ? '—' : i === 2 ? 'Today' : i === 3 ? '2 appts' : '2 appts'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── DIRECTORY MODULE ───────────────────────────────

function DirectoryModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All');
  const departments = ['All', 'Administration', 'Academics', 'Accounts', 'Transport', 'Medical', 'Science', 'Library', 'Security', 'HR', 'IT'];
  const filtered = tab === 'All' ? mockDirectory : mockDirectory.filter(d => d.dept === tab);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Staff & Parent Directory</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Download size={14} /> Export Directory</button>
      </div>
      <TabBar tabs={['All', 'Administration', 'Academics', 'Accounts', 'Transport', 'Other']} active={tab === 'All' || ['Administration', 'Academics', 'Accounts', 'Transport'].includes(tab) ? tab : 'Other'} onChange={(t) => setTab(t === 'Other' ? 'Medical' : t)} theme={theme} />
      <div className="flex gap-3">
        <SearchBar placeholder="Search by name, department, extension..." theme={theme} icon={Search} />
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Filter size={12} /> Department</button>
      </div>

      {/* Quick Contacts */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Quick Dial — Frequently Contacted</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {mockDirectory.slice(0, 4).map(d => (
            <div key={d.name} className={`p-3 rounded-xl ${theme.accentBg} flex items-center gap-3`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${theme.primary} text-white`}>
                {d.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-bold ${theme.highlight} truncate`}>{d.name}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{d.role}</p>
                <p className={`text-[10px] font-bold ${theme.primaryText}`}>Ext. {d.ext}</p>
              </div>
              <button className={`p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100`}><Phone size={14} /></button>
            </div>
          ))}
        </div>
      </div>

      {/* Full Directory Table */}
      <DataTable
        headers={['Name', 'Role', 'Department', 'Extension', 'Phone', 'Email', '']}
        rows={filtered.map(d => [
          <div key="name" className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${theme.secondaryBg} ${theme.primaryText}`}>
              {d.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <span className={`font-bold ${theme.highlight}`}>{d.name}</span>
          </div>,
          <span key="role" className={theme.iconColor}>{d.role}</span>,
          <span key="dept" className={`text-xs font-bold px-2 py-0.5 rounded-full ${theme.secondaryBg} ${theme.primaryText}`}>{d.dept}</span>,
          <span key="ext" className={`font-mono font-bold ${theme.primaryText}`}>Ext. {d.ext}</span>,
          <span key="phone" className={theme.iconColor}>{d.phone}</span>,
          <span key="email" className={`text-xs ${theme.iconColor}`}>{d.email}</span>,
          <div key="actions" className="flex gap-1">
            <button className={`p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100`}><Phone size={12} /></button>
            <button className={`p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100`}><Mail size={12} /></button>
          </div>
        ])}
        theme={theme}
      />
      <div className={`flex items-center justify-between text-xs ${theme.iconColor} px-2`}>
        <span>Showing {filtered.length} of {mockDirectory.length} contacts</span>
        <div className="flex gap-1">
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Previous</button>
          <button className={`px-3 py-1.5 rounded-lg ${theme.primary} text-white`}>1</button>
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Next</button>
        </div>
      </div>
    </div>
  );
}

// ─── FEE COUNTER MODULE ─────────────────────────────
function FeeCounterModule({ theme }: { theme: Theme }) {
  const [showForm, setShowForm] = useState(false);
  const transactions = [
    { receipt: 'RCP-2601', student: 'Aarav Patel (3-A)', amount: '₹8,500', mode: 'Cash', time: '09:12 AM' },
    { receipt: 'RCP-2602', student: 'Siya Sharma (5-B)', amount: '₹12,000', mode: 'Cheque', time: '09:28 AM' },
    { receipt: 'RCP-2603', student: 'Rohan Deshmukh (8-C)', amount: '₹6,200', mode: 'Online', time: '09:45 AM' },
    { receipt: 'RCP-2604', student: 'Ishita Gupta (1-A)', amount: '₹15,000', mode: 'Cash', time: '10:05 AM' },
    { receipt: 'RCP-2605', student: 'Arjun Reddy (10-A)', amount: '₹9,800', mode: 'Online', time: '10:22 AM' },
    { receipt: 'RCP-2606', student: 'Ananya Desai (6-B)', amount: '₹7,500', mode: 'Cash', time: '10:40 AM' },
    { receipt: 'RCP-2607', student: 'Dhruv Singhania (1-C)', amount: '₹5,200', mode: 'DD', time: '11:05 AM' },
    { receipt: 'RCP-2608', student: 'Myra Kapoor (UKG)', amount: '₹11,500', mode: 'Online', time: '11:30 AM' },
    { receipt: 'RCP-2609', student: 'Reyansh Gupta (3-B)', amount: '₹4,800', mode: 'Cash', time: '11:50 AM' },
    { receipt: 'RCP-2610', student: 'Priya Nair (4-B)', amount: '₹5,200', mode: 'Cash', time: '12:10 PM' },
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Fee Collection Counter</h1>
        <button onClick={() => setShowForm(true)} className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> Record Payment</button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Banknote} label="Cash" value="₹45,200" color="bg-emerald-500" sub="today" theme={theme} />
        <StatCard icon={FileText} label="Cheque" value="₹12,000" color="bg-blue-500" sub="today" theme={theme} />
        <StatCard icon={CreditCard} label="Online" value="₹28,500" color="bg-purple-500" sub="today" theme={theme} />
        <StatCard icon={IndianRupee} label="Total" value="₹85,700" color="bg-amber-500" sub="today" theme={theme} />
      </div>
      <DataTable
        headers={['Receipt No', 'Student', 'Amount', 'Mode', 'Time']}
        rows={transactions.map(t => [
          <span key="r" className={`font-mono text-xs font-bold ${theme.primaryText}`}>{t.receipt}</span>,
          <span key="s" className={`font-bold ${theme.highlight}`}>{t.student}</span>,
          <span key="a" className={`text-xs font-bold ${theme.highlight}`}>{t.amount}</span>,
          <span key="m" className={`text-xs px-2 py-0.5 rounded-full font-bold ${t.mode === 'Cash' ? 'bg-emerald-100 text-emerald-700' : t.mode === 'Online' ? 'bg-purple-100 text-purple-700' : t.mode === 'Cheque' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>{t.mode}</span>,
          <span key="t" className={`text-xs font-mono ${theme.iconColor}`}>{t.time}</span>,
        ])}
        theme={theme}
      />
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowForm(false)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 w-full max-w-md space-y-4`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between"><h3 className={`text-sm font-bold ${theme.highlight}`}>Record Payment</h3><button onClick={() => setShowForm(false)} className={theme.iconColor}><X size={18} /></button></div>
            <div className="space-y-3">
              <div><label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Student Name / ID *</label><input placeholder="Search student..." className={`w-full px-3 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Class</label><input placeholder="Auto-fill after search" readOnly className={`w-full px-3 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Fee Head *</label><select className={`w-full px-3 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm`}><option>Tuition Fee</option><option>Transport Fee</option><option>Lab Fee</option><option>Activity Fee</option><option>Exam Fee</option><option>Late Fee</option></select></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Amount *</label><input type="number" placeholder="₹" className={`w-full px-3 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm`} /></div>
                <div><label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Payment Mode *</label><select className={`w-full px-3 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm`}><option>Cash</option><option>Cheque</option><option>Online</option><option>DD</option></select></div>
              </div>
              <div><label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Receipt Number</label><input defaultValue="RCP-2611 (auto)" readOnly className={`w-full px-3 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm`} /></div>
              <div><label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Collected By</label><input defaultValue="Receptionist — Ms. Anita" readOnly className={`w-full px-3 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm`} /></div>
            </div>
            <div className="flex gap-2"><button onClick={() => setShowForm(false)} className={`flex-1 py-2.5 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.highlight}`}>Cancel</button><button onClick={() => { setShowForm(false); window.alert('Payment recorded. Receipt RCP-2611 generated (Blueprint demo)'); }} className={`flex-1 py-2.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}>Record & Print Receipt</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── STUDENT/PARENT SEARCH ──────────────────────────
function StudentParentSearch({ theme }: { theme: Theme }) {
  const [searchType, setSearchType] = useState('Student');
  const [selectedPerson, setSelectedPerson] = useState<typeof searchResults[0] | null>(null);
  const searchResults = [
    { name: 'Aarav Patel', id: 'STU-1001', classSection: '3-A', phone: '98765-43210', parent: 'Rajesh Patel', status: 'Active', email: 'rajesh.patel@gmail.com', address: '12 Satellite Road, Ahmedabad', feeStatus: 'Paid' },
    { name: 'Siya Sharma', id: 'STU-1002', classSection: '5-B', phone: '87654-32109', parent: 'Pooja Sharma', status: 'Active', email: 'pooja.sharma@gmail.com', address: '45 SG Highway, Ahmedabad', feeStatus: 'Pending' },
    { name: 'Rohan Deshmukh', id: 'STU-1003', classSection: '8-C', phone: '76543-21098', parent: 'Anil Deshmukh', status: 'Active', email: 'anil.d@gmail.com', address: '78 Paldi, Ahmedabad', feeStatus: 'Paid' },
    { name: 'Ishita Gupta', id: 'STU-1004', classSection: '1-A', phone: '99887-76655', parent: 'Ramesh Gupta', status: 'Active', email: 'ramesh.gupta@yahoo.com', address: '23 Vastrapur, Ahmedabad', feeStatus: 'Overdue' },
    { name: 'Arjun Reddy', id: 'STU-1005', classSection: '10-A', phone: '88776-65544', parent: 'Suresh Reddy', status: 'Active', email: 'suresh.r@gmail.com', address: '56 Navrangpura, Ahmedabad', feeStatus: 'Paid' },
    { name: 'Ananya Desai', id: 'STU-1006', classSection: '6-B', phone: '97654-44556', parent: 'Ravi Desai', status: 'Active', email: 'ravi.desai@gmail.com', address: '89 Bodakdev, Ahmedabad', feeStatus: 'Paid' },
    { name: 'Dhruv Singhania', id: 'STU-1007', classSection: '1-C', phone: '90123-55667', parent: 'Pooja Singhania', status: 'Active', email: 'pooja.s@gmail.com', address: '34 Thaltej, Ahmedabad', feeStatus: 'Pending' },
    { name: 'Myra Kapoor', id: 'STU-1008', classSection: 'UKG', phone: '91234-66778', parent: 'Ashish Kapoor', status: 'Active', email: 'ashish.k@gmail.com', address: '67 Prahlad Nagar, Ahmedabad', feeStatus: 'Paid' },
    { name: 'Reyansh Gupta', id: 'STU-1009', classSection: '3-B', phone: '99887-33445', parent: 'Sanjay Gupta', status: 'Active', email: 'sanjay.g@gmail.com', address: '12 Maninagar, Ahmedabad', feeStatus: 'Paid' },
    { name: 'Priya Nair', id: 'STU-1010', classSection: '4-B', phone: '98765-11223', parent: 'Mrs. Priya Nair', status: 'Active', email: 'priya.n@gmail.com', address: '45 Ambawadi, Ahmedabad', feeStatus: 'Paid' },
  ];

  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Student / Parent / Staff Search</h1>
      <div className="flex gap-3">
        <div className="flex gap-1">
          {['Student', 'Parent', 'Staff'].map(t => (
            <button key={t} onClick={() => setSearchType(t)} className={`px-3 py-2 rounded-xl text-xs font-bold ${searchType === t ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.iconColor}`}`}>{t}</button>
          ))}
        </div>
        <SearchBar placeholder={`Search ${searchType.toLowerCase()} by name, ID, phone...`} theme={theme} icon={Search} />
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Filter size={12} /> Class</button>
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Filter size={12} /> Section</button>
      </div>
      <DataTable
        headers={['Name', 'ID', 'Class/Section', 'Phone', 'Parent Name', 'Status', '']}
        rows={searchResults.map(r => [
          <span key="name" className={`font-bold ${theme.highlight} cursor-pointer`} onClick={() => setSelectedPerson(r)}>{r.name}</span>,
          <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{r.id}</span>,
          <span key="class" className={theme.iconColor}>{r.classSection}</span>,
          <span key="phone" className={theme.iconColor}>{r.phone}</span>,
          <span key="parent" className={theme.iconColor}>{r.parent}</span>,
          <StatusBadge key="status" status={r.status} theme={theme} />,
          <button key="view" onClick={() => setSelectedPerson(r)} className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>,
        ])}
        theme={theme}
      />

      {/* Mini Profile Card */}
      {selectedPerson && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedPerson(null)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 w-full max-w-sm space-y-4`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Student Profile</h3>
              <button onClick={() => setSelectedPerson(null)} className={theme.iconColor}><X size={18} /></button>
            </div>
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl ${theme.secondaryBg} flex items-center justify-center`}>
                <User size={28} className={theme.iconColor} />
              </div>
              <div>
                <p className={`text-sm font-bold ${theme.highlight}`}>{selectedPerson.name}</p>
                <p className={`text-xs ${theme.iconColor}`}>{selectedPerson.id} &bull; Class {selectedPerson.classSection}</p>
              </div>
            </div>
            <div className={`p-4 rounded-xl ${theme.secondaryBg} space-y-2`}>
              <div className="flex justify-between"><span className={`text-xs ${theme.iconColor}`}>Parent:</span><span className={`text-xs font-bold ${theme.highlight}`}>{selectedPerson.parent}</span></div>
              <div className="flex justify-between"><span className={`text-xs ${theme.iconColor}`}>Phone:</span><span className={`text-xs font-mono ${theme.highlight}`}>{selectedPerson.phone}</span></div>
              <div className="flex justify-between"><span className={`text-xs ${theme.iconColor}`}>Email:</span><span className={`text-xs ${theme.highlight}`}>{selectedPerson.email}</span></div>
              <div className="flex justify-between"><span className={`text-xs ${theme.iconColor}`}>Address:</span><span className={`text-xs ${theme.highlight} text-right max-w-[180px]`}>{selectedPerson.address}</span></div>
              <div className="flex justify-between"><span className={`text-xs ${theme.iconColor}`}>Fee Status:</span><span className={`text-xs px-2 py-0.5 rounded-full font-bold ${selectedPerson.feeStatus === 'Paid' ? 'bg-emerald-100 text-emerald-700' : selectedPerson.feeStatus === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{selectedPerson.feeStatus}</span></div>
            </div>
            <div className="flex gap-2">
              <button className={`flex-1 py-2 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.iconColor} flex items-center justify-center gap-1`}><Phone size={12} /> Call</button>
              <button className={`flex-1 py-2 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.iconColor} flex items-center justify-center gap-1`}><Mail size={12} /> Email</button>
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
  const tabs = ['Messages', 'Notices', 'Chat'];

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
            { from: 'Mrs. Priya Nair (Parent)', text: 'My son Arjun will be absent tomorrow due to a doctor appointment.', time: '10:15 AM' },
            { from: 'Mr. Dinesh (Accounts)', text: 'Please send the fee query parent to accounts window 2.', time: '09:45 AM' },
            { from: 'Principal Office', text: 'CBSE inspector arriving at 11 AM. Please arrange visitor pass.', time: '09:00 AM' },
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

      {commTab === 'Notices' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-2`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-2`}>Recent Notices</h3>
          {[
            { title: 'Republic Day Celebration', date: '26 Jan 2026', status: 'Published' },
            { title: 'Annual Sports Day - Schedule', date: '15 Feb 2026', status: 'Draft' },
            { title: 'PTM Notice - Class 1 to 5', date: '20 Feb 2026', status: 'Published' },
          ].map((n, i) => (
            <div key={i} className={`p-3 rounded-xl ${theme.accentBg} flex items-center justify-between`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>{n.title}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{n.date}</p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${n.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{n.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── EXPORT ──────────────────────────────────────────
export default function Page() {
  return (
    <BlueprintLayout>
      <ReceptionistDashboard />
    </BlueprintLayout>
  );
}
