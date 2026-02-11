'use client';

import React, { useState } from 'react';
import BlueprintLayout from '@/components/BlueprintLayout';
import { StatCard, TabBar, StatusBadge, SearchBar, DataTable, Toggle } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import { mockStudents, mockEnquiries, mockStaff, feeStructure, mockRoutes, mockVisitors, mockApprovals, dashboardStats } from '@/lib/mock-data';
import {
  Home, Users, UserPlus, UserCheck, GraduationCap, Briefcase, Calendar, Clock, Shield, Bus,
  MessageSquare, CheckCircle, XCircle, BarChart3, Settings, Search, Bell, Plus, X, Check,
  Eye, Edit, Trash2, Download, Filter, ChevronDown,
  Banknote, DollarSign, TrendingUp, AlertTriangle, FileText, Send, Megaphone, MapPin, Phone,
  Mail, Star, Award, BookOpen, ArrowRight, CreditCard,
  Upload, ClipboardCheck, Receipt, Printer, Hash
} from 'lucide-react';

// ─── MODULE SIDEBAR ────────────────────────────────
const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'students', label: 'Students', icon: Users },
  { id: 'enquiries', label: 'Enquiries', icon: UserPlus },
  { id: 'staff', label: 'Staff', icon: Briefcase },
  { id: 'fees', label: 'Fees', icon: Banknote },
  { id: 'timetable', label: 'Timetable', icon: Calendar },
  { id: 'certificates', label: 'Certificates', icon: Award },
  { id: 'transport', label: 'Transport', icon: Bus },
  { id: 'visitors', label: 'Visitors', icon: Shield },
  { id: 'communicate', label: 'Communicate', icon: Megaphone },
  { id: 'approvals', label: 'Approvals', icon: CheckCircle },
  { id: 'attendance', label: 'Attendance', icon: ClipboardCheck },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'config', label: 'Configuration', icon: Settings },
];

function SchoolAdminDashboard({ theme }: { theme?: Theme }) {
  const [activeModule, setActiveModule] = useState('dashboard');
  if (!theme) return null;
  const stats = dashboardStats.schoolAdmin;

  return (
    <div className="flex gap-4 -m-6">
      {/* Module sidebar */}
      <div className={`w-48 ${theme.cardBg} border-r ${theme.border} min-h-screen p-2 space-y-0.5 shrink-0`}>
        <p className={`text-[10px] font-bold ${theme.iconColor} uppercase px-3 py-2`}>Modules</p>
        {modules.map(m => (
          <button
            key={m.id}
            onClick={() => setActiveModule(m.id)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activeModule === m.id ? `${theme.primary} text-white` : `${theme.iconColor} ${theme.buttonHover}`
            }`}
          >
            <m.icon size={14} /> {m.label}
          </button>
        ))}
      </div>

      {/* Module content */}
      <div className="flex-1 p-6 space-y-4 overflow-x-hidden">
        {activeModule === 'dashboard' && <DashboardHome theme={theme} stats={stats} />}
        {activeModule === 'students' && <StudentsModule theme={theme} />}
        {activeModule === 'enquiries' && <EnquiriesModule theme={theme} />}
        {activeModule === 'staff' && <StaffModule theme={theme} />}
        {activeModule === 'fees' && <FeesModule theme={theme} />}
        {activeModule === 'timetable' && <TimetableModule theme={theme} />}
        {activeModule === 'certificates' && <CertificatesModule theme={theme} />}
        {activeModule === 'transport' && <TransportModule theme={theme} />}
        {activeModule === 'visitors' && <VisitorsModule theme={theme} />}
        {activeModule === 'communicate' && <CommunicateModule theme={theme} />}
        {activeModule === 'approvals' && <ApprovalsModule theme={theme} />}
        {activeModule === 'attendance' && <AttendanceModule theme={theme} />}
        {activeModule === 'reports' && <ReportsModule theme={theme} />}
        {activeModule === 'config' && <ConfigModule theme={theme} />}
      </div>
    </div>
  );
}

// ─── DASHBOARD HOME ──────────────────────────────────
function DashboardHome({ theme, stats }: { theme: Theme; stats: typeof dashboardStats.schoolAdmin }) {
  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>School Admin Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Students" value={stats.totalStudents} color="bg-blue-500" theme={theme} />
        <StatCard icon={Briefcase} label="Total Staff" value={stats.totalStaff} color="bg-indigo-500" theme={theme} />
        <StatCard icon={Banknote} label="Fee Collected" value={stats.feeCollected} color="bg-emerald-500" sub={stats.feeCollectedPercent} theme={theme} />
        <StatCard icon={CheckCircle} label="Pending Approvals" value={stats.pendingApprovals} color="bg-amber-500" theme={theme} />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={ClipboardCheck} label="Today Attendance" value={stats.todayAttendance} color="bg-teal-500" theme={theme} />
        <StatCard icon={UserPlus} label="New Enquiries" value={stats.newEnquiries} color="bg-purple-500" sub="this month" theme={theme} />
        <StatCard icon={Shield} label="Active Visitors" value={stats.activeVisitors} color="bg-orange-500" theme={theme} />
        <StatCard icon={Bell} label="Notifications" value="5" color="bg-red-500" sub="unread" theme={theme} />
      </div>

      {/* Quick Actions */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { label: 'Add Student', icon: UserPlus, color: 'bg-blue-500' },
            { label: 'Record Payment', icon: CreditCard, color: 'bg-emerald-500' },
            { label: 'Send Circular', icon: Send, color: 'bg-indigo-500' },
            { label: 'View Reports', icon: BarChart3, color: 'bg-purple-500' },
          ].map(a => (
            <button key={a.label} className={`flex items-center gap-2 p-3 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} transition-all`}>
              <div className={`w-8 h-8 rounded-lg ${a.color} flex items-center justify-center text-white`}><a.icon size={14} /></div>
              <span className={`text-xs font-bold ${theme.highlight}`}>{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Recent Activity</h3>
        <div className="space-y-2">
          {[
            { text: 'Fee payment ₹5,800 received from Rajesh Patel (STU001)', time: '10 min ago', type: 'fee' },
            { text: 'New enquiry from Sunil Rao for Nursery admission', time: '25 min ago', type: 'enquiry' },
            { text: 'Leave request from Ms. Priya Sharma — 3 days CL', time: '1 hour ago', type: 'leave' },
            { text: 'Visitor check-in: Amit Gupta — Parent Meeting', time: '2 hours ago', type: 'visitor' },
            { text: 'Attendance marked for Class 10-A (32/35 present)', time: '3 hours ago', type: 'attendance' },
          ].map((a, i) => (
            <div key={i} className={`flex items-center gap-3 p-2 rounded-xl ${theme.accentBg}`}>
              <div className={`w-2 h-2 rounded-full ${a.type === 'fee' ? 'bg-emerald-500' : a.type === 'enquiry' ? 'bg-blue-500' : a.type === 'leave' ? 'bg-amber-500' : a.type === 'visitor' ? 'bg-purple-500' : 'bg-teal-500'}`} />
              <p className={`text-xs ${theme.highlight} flex-1`}>{a.text}</p>
              <span className={`text-[10px] ${theme.iconColor}`}>{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── STUDENTS MODULE ─────────────────────────────────
function StudentsModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All Students');
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Student Management</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> Add Student</button>
      </div>
      <TabBar tabs={['All Students', 'Class-wise', 'Fee Status', 'TC/Inactive']} active={tab} onChange={setTab} theme={theme} />
      <div className="flex gap-3">
        <SearchBar placeholder="Search by name, ID, class..." theme={theme} icon={Search} />
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Filter size={12} /> Filter</button>
        <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Download size={12} /> Export</button>
      </div>
      <DataTable
        headers={['ID', 'Name', 'Class', 'Roll', 'Gender', 'Fee Status', 'Parent', 'Phone', '']}
        rows={mockStudents.map(s => [
          <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{s.id}</span>,
          <span key="name" className={`font-bold ${theme.highlight}`}>{s.name}</span>,
          <span key="class" className={theme.iconColor}>{s.class}</span>,
          <span key="roll" className={theme.iconColor}>{s.roll}</span>,
          <span key="gender" className={theme.iconColor}>{s.gender}</span>,
          <StatusBadge key="fee" status={s.fee} theme={theme} />,
          <span key="parent" className={theme.iconColor}>{s.parent}</span>,
          <span key="phone" className={theme.iconColor}>{s.phone}</span>,
          <div key="actions" className="flex gap-1">
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Edit size={12} className={theme.iconColor} /></button>
          </div>
        ])}
        theme={theme}
      />
      <div className={`flex items-center justify-between text-xs ${theme.iconColor} px-2`}>
        <span>Showing 1-8 of {mockStudents.length} students</span>
        <div className="flex gap-1">
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Previous</button>
          <button className={`px-3 py-1.5 rounded-lg ${theme.primary} text-white`}>1</button>
          <button className={`px-3 py-1.5 rounded-lg ${theme.secondaryBg}`}>Next</button>
        </div>
      </div>
    </div>
  );
}

// ─── ENQUIRIES MODULE ────────────────────────────────
function EnquiriesModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All Enquiries');
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Enquiry Management</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> New Enquiry</button>
      </div>
      <TabBar tabs={['All Enquiries', 'New', 'Follow-up', 'Converted', 'Lost']} active={tab} onChange={setTab} theme={theme} />
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={UserPlus} label="Total Enquiries" value="45" color="bg-blue-500" theme={theme} />
        <StatCard icon={Clock} label="Pending Follow-up" value="12" color="bg-amber-500" theme={theme} />
        <StatCard icon={CheckCircle} label="Converted" value="28" color="bg-emerald-500" theme={theme} />
        <StatCard icon={TrendingUp} label="Conversion Rate" value="62%" color="bg-purple-500" theme={theme} />
      </div>
      <DataTable
        headers={['ID', 'Child Name', 'Class', 'Parent', 'Source', 'Date', 'Status', 'Phone', '']}
        rows={mockEnquiries.map(e => [
          <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{e.id}</span>,
          <span key="name" className={`font-bold ${theme.highlight}`}>{e.child}</span>,
          <span key="class" className={theme.iconColor}>{e.class}</span>,
          <span key="parent" className={theme.iconColor}>{e.parent}</span>,
          <span key="source" className={theme.iconColor}>{e.source}</span>,
          <span key="date" className={theme.iconColor}>{e.date}</span>,
          <StatusBadge key="status" status={e.status} theme={theme} />,
          <span key="phone" className={theme.iconColor}>{e.phone}</span>,
          <button key="action" className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
        ])}
        theme={theme}
      />
    </div>
  );
}

// ─── STAFF MODULE ────────────────────────────────────
function StaffModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All Staff');
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Staff Management</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> Add Employee</button>
      </div>
      <TabBar tabs={['All Staff', 'Teaching', 'Non-Teaching', 'Probation']} active={tab} onChange={setTab} theme={theme} />
      <DataTable
        headers={['ID', 'Name', 'Department', 'Role', 'Status', 'Phone', '']}
        rows={mockStaff.map(s => [
          <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{s.id}</span>,
          <span key="name" className={`font-bold ${theme.highlight}`}>{s.name}</span>,
          <span key="dept" className={theme.iconColor}>{s.dept}</span>,
          <span key="role" className={theme.iconColor}>{s.role}</span>,
          <StatusBadge key="status" status={s.status} theme={theme} />,
          <span key="phone" className={theme.iconColor}>{s.phone}</span>,
          <div key="actions" className="flex gap-1">
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
            <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Edit size={12} className={theme.iconColor} /></button>
          </div>
        ])}
        theme={theme}
      />
    </div>
  );
}

// ─── FEES MODULE ─────────────────────────────────────
function FeesModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Fee Structure');
  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Fees Management</h1>
      <TabBar tabs={['Fee Structure', 'Collection', 'Defaulters', 'Concessions', 'Receipts']} active={tab} onChange={setTab} theme={theme} />
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={Banknote} label="Total Collected" value="₹45.2L" color="bg-emerald-500" theme={theme} />
        <StatCard icon={Clock} label="Pending" value="₹17.8L" color="bg-amber-500" theme={theme} />
        <StatCard icon={AlertTriangle} label="Overdue" value="₹3.2L" color="bg-red-500" theme={theme} />
        <StatCard icon={TrendingUp} label="Collection %" value="72%" color="bg-blue-500" theme={theme} />
      </div>
      {tab === 'Fee Structure' && (
        <DataTable
          headers={['Class Range', 'Tuition (₹/month)', 'Transport', 'Activity', 'Total Monthly']}
          rows={feeStructure.map(f => [
            <span key="cls" className={`font-bold ${theme.highlight}`}>{f.cls}</span>,
            <span key="t" className={theme.iconColor}>₹{f.tuition.toLocaleString()}</span>,
            <span key="tr" className={theme.iconColor}>₹{f.transport.toLocaleString()}</span>,
            <span key="a" className={theme.iconColor}>₹{f.activity.toLocaleString()}</span>,
            <span key="total" className={`font-bold ${theme.highlight}`}>₹{f.total.toLocaleString()}</span>,
          ])}
          theme={theme}
        />
      )}
      {tab === 'Collection' && (
        <div className="space-y-3">
          <div className="flex gap-3">
            <SearchBar placeholder="Search student by name or ID..." theme={theme} icon={Search} />
            <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> Record Payment</button>
          </div>
          <DataTable
            headers={['Student', 'Class', 'Annual Fee', 'Paid', 'Balance', 'Status', '']}
            rows={mockStudents.slice(0, 5).map(s => [
              <span key="name" className={`font-bold ${theme.highlight}`}>{s.name}</span>,
              <span key="class" className={theme.iconColor}>{s.class}</span>,
              <span key="annual" className={theme.iconColor}>₹69,600</span>,
              <span key="paid" className="text-emerald-600 font-bold">₹{s.fee === 'Paid' ? '69,600' : s.fee === 'Pending' ? '34,800' : '23,200'}</span>,
              <span key="bal" className={s.fee !== 'Paid' ? 'text-red-500 font-bold' : theme.iconColor}>₹{s.fee === 'Paid' ? '0' : s.fee === 'Pending' ? '34,800' : '46,400'}</span>,
              <StatusBadge key="status" status={s.fee} theme={theme} />,
              <button key="action" className={`px-2 py-1 rounded-lg text-[10px] font-bold ${theme.secondaryBg} ${theme.iconColor}`}><Receipt size={10} className="inline mr-1" />Receipt</button>,
            ])}
            theme={theme}
          />
        </div>
      )}
      {tab === 'Defaulters' && (
        <DataTable
          headers={['Student', 'Class', 'Outstanding', 'Overdue Since', 'Last Reminder', 'Action']}
          rows={[
            [<span key="n" className={`font-bold ${theme.highlight}`}>Arjun Singh</span>, <span key="c" className={theme.iconColor}>10-A</span>, <span key="o" className="text-red-500 font-bold">₹46,400</span>, <span key="d" className={theme.iconColor}>15-Nov-2025</span>, <span key="r" className={theme.iconColor}>SMS sent 3 days ago</span>, <button key="a" className="px-2 py-1 rounded-lg bg-amber-100 text-amber-700 text-[10px] font-bold">Send Reminder</button>],
            [<span key="n" className={`font-bold ${theme.highlight}`}>Zara Khan</span>, <span key="c" className={theme.iconColor}>8-B</span>, <span key="o" className="text-amber-500 font-bold">₹34,800</span>, <span key="d" className={theme.iconColor}>01-Dec-2025</span>, <span key="r" className={theme.iconColor}>WhatsApp sent 1 week ago</span>, <button key="a" className="px-2 py-1 rounded-lg bg-amber-100 text-amber-700 text-[10px] font-bold">Send Reminder</button>],
          ]}
          theme={theme}
        />
      )}
      {(tab === 'Concessions' || tab === 'Receipts') && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-8 text-center`}>
          <p className={`text-sm ${theme.iconColor}`}>{tab} view — full UI coming in next iteration</p>
        </div>
      )}
    </div>
  );
}

// ─── TRANSPORT MODULE ────────────────────────────────
function TransportModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Routes');
  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Transport Management</h1>
      <TabBar tabs={['Routes', 'Vehicles', 'GPS Tracking']} active={tab} onChange={setTab} theme={theme} />
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
            { no: 'GJ-01-AB-1234', type: 'Bus (45 seats)', km: '45,230 km', status: 'Running' },
            { no: 'GJ-01-CD-5678', type: 'Mini Bus (25 seats)', km: '32,100 km', status: 'Running' },
            { no: 'GJ-01-EF-9012', type: 'Bus (50 seats)', km: '67,800 km', status: 'Maintenance' },
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
    </div>
  );
}

// ─── VISITORS MODULE ─────────────────────────────────
function VisitorsModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Visitor Log');
  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Visitor Management</h1>
      <TabBar tabs={['Visitor Log', 'Check-in', 'Student Pickup']} active={tab} onChange={setTab} theme={theme} />
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={Users} label="Today's Visitors" value="12" color="bg-blue-500" theme={theme} />
        <StatCard icon={UserCheck} label="Checked In" value="3" color="bg-emerald-500" theme={theme} />
        <StatCard icon={Clock} label="Avg Duration" value="45m" color="bg-indigo-500" theme={theme} />
        <StatCard icon={AlertTriangle} label="Overstaying" value="1" color="bg-amber-500" theme={theme} />
      </div>
      {tab === 'Visitor Log' && (
        <DataTable
          headers={['Badge', 'Name', 'Purpose', 'Host', 'Time In', 'Time Out', 'Status']}
          rows={mockVisitors.map(v => [
            <span key="badge" className={`text-xs px-2 py-0.5 rounded-full font-bold ${theme.secondaryBg} ${theme.primaryText}`}>{v.badge}</span>,
            <span key="name" className={`font-bold ${theme.highlight}`}>{v.name}</span>,
            <span key="purpose" className={theme.iconColor}>{v.purpose}</span>,
            <span key="host" className={theme.iconColor}>{v.host}</span>,
            <span key="in" className={theme.iconColor}>{v.timeIn}</span>,
            <span key="out" className={v.timeOut === '-' ? 'text-amber-500 font-bold' : theme.iconColor}>{v.timeOut}</span>,
            <StatusBadge key="status" status={v.timeOut === '-' ? 'Active' : 'Paid'} theme={theme} />,
          ])}
          theme={theme}
        />
      )}
      {tab === 'Check-in' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-4`}>New Visitor Check-in</h3>
          <div className="grid grid-cols-2 gap-4">
            {['Visitor Name', 'Phone Number', 'Purpose of Visit', 'Person to Meet'].map(f => (
              <div key={f}>
                <label className={`text-xs ${theme.iconColor} block mb-1`}>{f}</label>
                <input className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`} placeholder={f} />
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-4">
            <button className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-sm font-bold`}>Check In + Print Badge</button>
            <button className={`px-4 py-2 rounded-xl border ${theme.border} text-sm font-bold ${theme.iconColor}`}>Cancel</button>
          </div>
        </div>
      )}
      {tab === 'Student Pickup' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 text-center`}>
          <p className={`text-sm ${theme.iconColor}`}>Bidirectional Pickup System — School-initiated & Parent-initiated flows</p>
          <p className={`text-xs ${theme.iconColor} mt-2`}>Full UI coming in next iteration</p>
        </div>
      )}
    </div>
  );
}

// ─── COMMUNICATE MODULE ──────────────────────────────
function CommunicateModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Circulars');
  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Communication</h1>
      <TabBar tabs={['Circulars', 'WhatsApp', 'SMS', 'Email', 'Templates']} active={tab} onChange={setTab} theme={theme} />
      {tab === 'Circulars' && (
        <div className="space-y-3">
          <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> New Circular</button>
          {[
            { title: 'Annual Day Celebration', date: '10-Jan', to: 'All Parents', status: 'Sent', via: 'App + WhatsApp' },
            { title: 'PTM Schedule — Class 6-10', date: '08-Jan', to: 'Class 6-10 Parents', status: 'Sent', via: 'App + SMS' },
            { title: 'Winter Uniform Reminder', date: '05-Jan', to: 'All Students', status: 'Draft', via: '—' },
          ].map((c, i) => (
            <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex items-center justify-between`}>
              <div>
                <p className={`text-sm font-bold ${theme.highlight}`}>{c.title}</p>
                <p className={`text-xs ${theme.iconColor}`}>{c.date} • To: {c.to} • Via: {c.via}</p>
              </div>
              <StatusBadge status={c.status === 'Sent' ? 'Active' : 'Pending'} theme={theme} />
            </div>
          ))}
        </div>
      )}
      {(tab === 'WhatsApp' || tab === 'SMS' || tab === 'Email' || tab === 'Templates') && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-8 text-center`}>
          <Megaphone size={32} className={`${theme.iconColor} mx-auto mb-2`} />
          <p className={`text-sm ${theme.iconColor}`}>{tab} — {tab === 'WhatsApp' ? 'School WAPI integration (school buys own subscription)' : tab === 'SMS' ? 'MSG91 integration' : tab === 'Email' ? 'Amazon SES integration' : 'Readymade circular templates'}</p>
        </div>
      )}
    </div>
  );
}

// ─── APPROVALS MODULE ────────────────────────────────
function ApprovalsModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Pending');
  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Approvals</h1>
      <TabBar tabs={['Pending', 'Completed', 'Workflows']} active={tab} onChange={setTab} theme={theme} />
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={Clock} label="Pending" value="8" color="bg-amber-500" theme={theme} />
        <StatCard icon={AlertTriangle} label="Urgent" value="2" color="bg-red-500" theme={theme} />
        <StatCard icon={CheckCircle} label="Today Approved" value="5" color="bg-emerald-500" theme={theme} />
        <StatCard icon={XCircle} label="Rejected" value="1" color="bg-slate-500" theme={theme} />
      </div>
      {tab === 'Pending' && mockApprovals.map((a, i) => (
        <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <StatusBadge status={a.priority} theme={theme} />
              <span className={`text-xs ${theme.iconColor}`}>{a.time}</span>
            </div>
            <span className={`text-xs font-bold ${theme.secondaryBg} px-2 py-1 rounded-lg ${theme.iconColor}`}>{a.type}</span>
          </div>
          <p className={`text-sm font-bold ${theme.highlight}`}>{a.detail}</p>
          <p className={`text-xs ${theme.iconColor} mt-1`}>From: {a.from}</p>
          <div className="flex gap-2 mt-3">
            <button className="px-3 py-1.5 rounded-xl bg-emerald-500 text-white text-xs font-bold flex items-center gap-1"><Check size={10} /> Approve</button>
            <button className="px-3 py-1.5 rounded-xl bg-red-500 text-white text-xs font-bold flex items-center gap-1"><X size={10} /> Reject</button>
            <button className={`px-3 py-1.5 rounded-xl border ${theme.border} text-xs font-bold ${theme.highlight}`}>View Details</button>
          </div>
        </div>
      ))}
      {tab === 'Workflows' && (
        <div className="space-y-3">
          {[
            { name: 'Leave Approval', steps: ['Employee', 'HOD', 'Admin/Principal'], active: true },
            { name: 'Purchase Order', steps: ['Requester', 'Admin', 'Trustee (>₹50K)'], active: true },
            { name: 'TC/Certificate', steps: ['Front Desk', 'Admin', 'Principal'], active: true },
          ].map((w, i) => (
            <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className={`text-sm font-bold ${theme.highlight}`}>{w.name}</h4>
                <Toggle on={w.active} onChange={() => {}} theme={theme} />
              </div>
              <div className="flex items-center gap-2">
                {w.steps.map((s, si) => (
                  <React.Fragment key={si}>
                    <span className={`text-xs px-3 py-1.5 rounded-xl ${theme.secondaryBg} ${theme.highlight} font-bold`}>{s}</span>
                    {si < w.steps.length - 1 && <ArrowRight size={14} className={theme.iconColor} />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── ATTENDANCE MODULE ───────────────────────────────
function AttendanceModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Student Attendance');
  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Attendance</h1>
      <TabBar tabs={['Student Attendance', 'Staff Attendance', 'Reports']} active={tab} onChange={setTab} theme={theme} />
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={Users} label="Students Present" value="1,172" color="bg-emerald-500" sub="94.0%" theme={theme} />
        <StatCard icon={XCircle} label="Absent" value="75" color="bg-red-500" theme={theme} />
        <StatCard icon={Briefcase} label="Staff Present" value="82/86" color="bg-blue-500" theme={theme} />
        <StatCard icon={Clock} label="Late Arrivals" value="7" color="bg-amber-500" theme={theme} />
      </div>
      {tab === 'Student Attendance' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center gap-3 mb-4">
            <select className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs`}>
              <option>All Classes</option><option>10-A</option><option>10-B</option><option>9-A</option>
            </select>
            <select className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs`}>
              <option>Today</option><option>Yesterday</option><option>This Week</option>
            </select>
          </div>
          <div className="grid grid-cols-6 gap-2 text-center text-xs">
            {['Aarav P.', 'Zara K.', 'Riya S.', 'Arjun S.', 'Meera N.', 'Rohan G.'].map((n, i) => (
              <div key={i} className={`p-3 rounded-xl ${i === 3 ? 'bg-red-50 border border-red-200' : `${theme.accentBg}`}`}>
                <div className={`w-8 h-8 rounded-full ${i === 3 ? 'bg-red-200' : 'bg-emerald-200'} mx-auto mb-1 flex items-center justify-center text-[10px] font-bold`}>
                  {i === 3 ? 'A' : 'P'}
                </div>
                <p className={`font-bold ${theme.highlight}`}>{n}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── REPORTS MODULE ──────────────────────────────────
function ReportsModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Academic');
  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Reports & Analytics</h1>
      <TabBar tabs={['Academic', 'Financial', 'Administrative']} active={tab} onChange={setTab} theme={theme} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(tab === 'Academic' ? [
          { title: 'Student Strength Report', desc: 'Class-wise, section-wise, gender-wise count', icon: Users },
          { title: 'Exam Results Analysis', desc: 'Subject-wise pass %, toppers, grade distribution', icon: Award },
          { title: 'Attendance Report', desc: 'Monthly/weekly/daily attendance trends', icon: ClipboardCheck },
          { title: 'Student Progress Cards', desc: 'Individual student performance over time', icon: TrendingUp },
          { title: 'Teacher Workload Report', desc: 'Period allocation, free periods analysis', icon: Calendar },
          { title: 'House-wise Performance', desc: 'Inter-house competition scores', icon: Star },
        ] : tab === 'Financial' ? [
          { title: 'Fee Collection Summary', desc: 'Monthly/yearly collection vs outstanding', icon: Banknote },
          { title: 'Defaulters Report', desc: 'Student-wise fee dues with aging analysis', icon: AlertTriangle },
          { title: 'Concession Report', desc: 'All concessions granted with breakdown', icon: DollarSign },
          { title: 'Payment Mode Analysis', desc: 'Cash vs UPI vs Bank transfer breakdown', icon: CreditCard },
        ] : [
          { title: 'Staff Attendance Report', desc: 'Employee attendance trends and patterns', icon: Briefcase },
          { title: 'Visitor Log Report', desc: 'Monthly visitor statistics and purposes', icon: Shield },
          { title: 'Transport Utilization', desc: 'Route-wise bus occupancy and efficiency', icon: Bus },
          { title: 'Enquiry Conversion Report', desc: 'Admission funnel and conversion rates', icon: UserPlus },
        ]).map((r, i) => (
          <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 hover:shadow-md transition-all cursor-pointer`}>
            <r.icon size={28} className={`${theme.iconColor} mb-3`} />
            <h4 className={`text-sm font-bold ${theme.highlight} mb-1`}>{r.title}</h4>
            <p className={`text-xs ${theme.iconColor} mb-3`}>{r.desc}</p>
            <button className={`text-xs ${theme.primaryText} font-bold flex items-center gap-1`}><Download size={12} /> Generate</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── TIMETABLE, CERTIFICATES, CONFIG STUBS ───────────
function TimetableModule({ theme }: { theme: Theme }) {
  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Timetable</h1>
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6`}>
        <p className={`text-sm ${theme.iconColor} mb-2`}>Hierarchy: Principal sets master → VP/Coordinator edits → Teacher adjusts</p>
        <div className={`w-full h-64 ${theme.accentBg} rounded-xl flex items-center justify-center`}>
          <div className="text-center">
            <Calendar size={48} className={theme.iconColor} />
            <p className={`text-sm ${theme.iconColor} mt-2`}>Weekly Timetable Grid View</p>
            <p className={`text-xs ${theme.iconColor}`}>Phase 2: AI auto-generation</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CertificatesModule({ theme }: { theme: Theme }) {
  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Certificates</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['Transfer Certificate', 'Bonafide Certificate', 'Character Certificate', 'Study Certificate'].map(c => (
          <div key={c} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 text-center cursor-pointer hover:shadow-md transition-all`}>
            <FileText size={24} className={`${theme.iconColor} mx-auto mb-2`} />
            <p className={`text-xs font-bold ${theme.highlight}`}>{c}</p>
            <button className={`text-[10px] ${theme.primaryText} font-bold mt-2`}>Generate</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConfigModule({ theme }: { theme: Theme }) {
  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>School Configuration</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: 'School Profile', desc: 'Name, address, logo, board, UDISE code' },
          { title: 'Academic Year', desc: 'Current year, term dates, holidays' },
          { title: 'Class & Sections', desc: 'Class list, section naming, capacity' },
          { title: 'Fee Configuration', desc: 'Fee structure, installments, late fee policy' },
          { title: 'Notification Preferences', desc: 'Email ON/OFF, SMS, WhatsApp, per-event config' },
          { title: 'Permission Profiles', desc: 'Default profiles, custom profiles, module access' },
          { title: 'Attendance Settings', desc: 'Daily vs period-wise, marking rules' },
          { title: 'Visitor Management', desc: 'Pre-registration rules, badge format' },
        ].map((c, i) => (
          <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex items-center gap-3 cursor-pointer hover:shadow-md transition-all`}>
            <Settings size={18} className={theme.iconColor} />
            <div>
              <p className={`text-sm font-bold ${theme.highlight}`}>{c.title}</p>
              <p className={`text-xs ${theme.iconColor}`}>{c.desc}</p>
            </div>
            <ArrowRight size={14} className={`${theme.iconColor} ml-auto`} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── EXPORT ──────────────────────────────────────────
export default function Page() {
  return (
    <BlueprintLayout>
      <SchoolAdminDashboard />
    </BlueprintLayout>
  );
}
