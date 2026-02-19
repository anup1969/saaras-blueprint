'use client';

import React, { useState } from 'react';
import BlueprintLayout from '@/components/BlueprintLayout';
import { StatCard, TabBar, StatusBadge, SearchBar, DataTable, Toggle } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import { mockStudents, mockEnquiries, mockStaff, feeStructure, mockRoutes, mockVisitors, mockApprovals, dashboardStats } from '@/lib/mock-data';
import {
  Home, Users, UserPlus, UserCheck, GraduationCap, Briefcase, Calendar, Clock, Shield, Bus,
  MessageSquare, CheckCircle, XCircle, BarChart3, Settings, Search, Bell, Plus, X, Check,
  Eye, Edit, Trash2, Download, Filter, ChevronDown, ChevronUp, Camera, File,
  Banknote, DollarSign, TrendingUp, AlertTriangle, FileText, Send, Megaphone, MapPin, Phone,
  Mail, Star, Award, BookOpen, ArrowRight, CreditCard, ArrowLeft, Save,
  Upload, ClipboardCheck, Receipt, Printer, Hash, Heart, Building, Landmark, User,
  PanelLeftClose, PanelLeftOpen, Headphones, Radio, Sparkles, ShieldCheck
} from 'lucide-react';
import { ChatsView } from '@/components/ChatModule';
import StakeholderProfile from '@/components/StakeholderProfile';
import TaskTrackerPanel from '@/components/TaskTrackerPanel';
import RecurringTasksCard from '@/components/RecurringTasksCard';
import SupportModule from '@/components/SupportModule';

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
  { id: 'hr', label: 'HR Management', icon: Briefcase },
  { id: 'config', label: 'Configuration', icon: Settings },
  { id: 'support', label: 'Support', icon: Headphones },
];

function SchoolAdminDashboard({ theme, themeIdx, onThemeChange }: { theme?: Theme; themeIdx?: number; onThemeChange?: (idx: number) => void }) {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  if (!theme) return null;
  const stats = dashboardStats.schoolAdmin;

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
        {activeModule === 'dashboard' && <DashboardHome theme={theme} stats={stats} onProfileClick={() => setActiveModule('profile')} />}
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
        {activeModule === 'hr' && <HRManagementModule theme={theme} />}
        {activeModule === 'config' && <ConfigModule theme={theme} />}
        {activeModule === 'support' && <SupportModule theme={theme} role="school-admin" />}
        {activeModule === 'profile' && <StakeholderProfile role="school-admin" theme={theme} onClose={() => setActiveModule('dashboard')} themeIdx={themeIdx} onThemeChange={onThemeChange} />}
      </div>
    </div>
  );
}

// ─── DASHBOARD HOME ──────────────────────────────────
function DashboardHome({ theme, stats, onProfileClick }: { theme: Theme; stats: typeof dashboardStats.schoolAdmin; onProfileClick: () => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>School Admin Dashboard</h1>
        <button onClick={onProfileClick} title="My Profile" className={`w-9 h-9 rounded-full ${theme.primary} text-white flex items-center justify-center text-xs font-bold hover:opacity-90 transition-opacity`}>DV</button>
      </div>
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

      {/* Fees Card */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center gap-2 mb-3">
          <Banknote size={16} className={theme.iconColor} />
          <h3 className={`text-sm font-bold ${theme.highlight}`}>Fees Overview</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className={`${theme.secondaryBg} rounded-xl p-3 text-center`}>
            <p className={`text-[10px] ${theme.iconColor} mb-1`}>Today&apos;s Collection</p>
            <p className="text-lg font-bold text-emerald-600">{'\u20B9'}2,45,000</p>
          </div>
          <div className={`${theme.secondaryBg} rounded-xl p-3 text-center`}>
            <p className={`text-[10px] ${theme.iconColor} mb-1`}>Total Collected (FY)</p>
            <p className={`text-lg font-bold ${theme.highlight}`}>{'\u20B9'}1.2 Cr</p>
          </div>
          <div className={`${theme.secondaryBg} rounded-xl p-3 text-center`}>
            <p className={`text-[10px] ${theme.iconColor} mb-1`}>Outstanding</p>
            <p className="text-lg font-bold text-red-500">{'\u20B9'}18.5L</p>
          </div>
        </div>
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

      {/* News Board + Task Tracker — Side by Side */}
      <div className="grid grid-cols-2 gap-4">
        {/* News Board — Live School Overview */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <h3 className={`text-sm font-bold ${theme.highlight}`}>News Board</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] px-2 py-0.5 rounded-lg ${theme.secondaryBg} ${theme.highlight} font-mono font-bold`}>
                {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-lg bg-blue-500/20 text-blue-400 font-bold`}>Period 5 of 8</span>
            </div>
          </div>

          {/* Going On Now */}
          <div className="mb-3">
            <p className={`text-[10px] font-bold uppercase ${theme.iconColor} mb-1.5 flex items-center gap-1`}>
              <Radio size={10} className="text-red-500" /> Going On Now
            </p>
            <div className="space-y-1.5">
              {[
                { activity: 'Fee Collection Drive — Counter 1 & 2', detail: '47 payments processed · ₹2.1L collected today', icon: Banknote, color: 'bg-emerald-500', pulse: true },
                { activity: 'Unit Test 3 — Mathematics', detail: 'Class 10-A, 10-B · Period 5 (11:30-12:15)', icon: FileText, color: 'bg-blue-500', pulse: true },
                { activity: 'Visitor — Mr. Amit Gupta', detail: 'Reception · Parent meeting with Class Teacher', icon: Users, color: 'bg-purple-500', pulse: false },
                { activity: 'CBSE Inspector Visit', detail: 'Principal Office · Lab inspection at 12:30', icon: ShieldCheck, color: 'bg-red-500', pulse: true },
              ].map((item, i) => (
                <div key={i} className={`flex items-center gap-2.5 p-2 rounded-xl ${theme.accentBg} border ${theme.border}`}>
                  <div className={`w-7 h-7 rounded-lg ${item.color}/20 flex items-center justify-center shrink-0 relative`}>
                    <item.icon size={13} className={item.color.replace('bg-', 'text-')} />
                    {item.pulse && <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[11px] font-bold ${theme.highlight} truncate`}>{item.activity}</p>
                    <p className={`text-[10px] ${theme.iconColor} truncate`}>{item.detail}</p>
                  </div>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 font-bold shrink-0`}>LIVE</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming */}
          <div>
            <p className={`text-[10px] font-bold uppercase ${theme.iconColor} mb-1.5 flex items-center gap-1`}>
              <Clock size={10} /> Upcoming Today
            </p>
            <div className="space-y-1.5">
              {[
                { activity: 'Staff Meeting', detail: '3:00 PM · Conference Room · All HODs', time: '3:00 PM', icon: Users },
                { activity: 'Fee Deadline — Class 8', detail: '5:00 PM · 12 students with pending dues', time: '5:00 PM', icon: Banknote },
                { activity: 'Transport Schedule Change', detail: 'Route E & F — modified pickup from tomorrow', time: '4:30 PM', icon: Bus },
              ].map((item, i) => (
                <div key={i} className={`flex items-center gap-2.5 p-2 rounded-xl ${theme.secondaryBg}`}>
                  <div className={`w-7 h-7 rounded-lg ${theme.accentBg} flex items-center justify-center shrink-0`}>
                    <item.icon size={13} className={theme.iconColor} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[11px] font-bold ${theme.highlight} truncate`}>{item.activity}</p>
                    <p className={`text-[10px] ${theme.iconColor} truncate`}>{item.detail}</p>
                  </div>
                  <span className={`text-[10px] ${theme.iconColor} font-medium shrink-0`}>{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Task Tracker */}
        <TaskTrackerPanel theme={theme} role="school-admin" />

        {/* Recurring Tasks — Streak Tracking Card */}
        <RecurringTasksCard theme={theme} role="school-admin" />
      </div>
    </div>
  );
}

// ─── FORM FIELD HELPERS ──────────────────────────────
function FormField({ label, required, children, theme, span }: {
  label: string; required?: boolean; children: React.ReactNode; theme: Theme; span?: number;
}) {
  return (
    <div className={span === 2 ? 'col-span-2' : span === 3 ? 'col-span-3' : ''}>
      <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function InputField({ placeholder, value, onChange, theme, type, disabled, readOnly }: {
  placeholder?: string; value: string; onChange: (v: string) => void; theme: Theme; type?: string; disabled?: boolean; readOnly?: boolean;
}) {
  return (
    <input
      type={type || 'text'}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      disabled={disabled}
      readOnly={readOnly}
      className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none focus:ring-2 focus:ring-slate-300 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${readOnly ? 'cursor-default' : ''}`}
    />
  );
}

function SelectField({ options, value, onChange, theme, placeholder }: {
  options: string[]; value: string; onChange: (v: string) => void; theme: Theme; placeholder?: string;
}) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none focus:ring-2 focus:ring-slate-300`}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

function TextAreaField({ placeholder, value, onChange, theme, rows }: {
  placeholder?: string; value: string; onChange: (v: string) => void; theme: Theme; rows?: number;
}) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      rows={rows || 3}
      className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none focus:ring-2 focus:ring-slate-300 resize-none`}
    />
  );
}

function PhotoUpload({ label, theme }: { label: string; theme: Theme }) {
  return (
    <div className={`w-24 h-28 rounded-xl border-2 border-dashed ${theme.border} flex flex-col items-center justify-center cursor-pointer ${theme.buttonHover} transition-all`}>
      <Camera size={20} className={theme.iconColor} />
      <span className={`text-[10px] ${theme.iconColor} mt-1 text-center`}>{label}</span>
    </div>
  );
}

function FileUploadArea({ label, theme }: { label: string; theme: Theme }) {
  return (
    <div className={`border-2 border-dashed ${theme.border} rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer ${theme.buttonHover} transition-all`}>
      <Upload size={18} className={theme.iconColor} />
      <span className={`text-[10px] ${theme.iconColor} mt-1`}>{label}</span>
      <span className={`text-[9px] ${theme.iconColor}`}>PDF, JPG, PNG (max 5MB)</span>
    </div>
  );
}

function FormSection({ title, icon: Icon, children, theme, collapsible, defaultOpen }: {
  title: string; icon: React.ElementType; children: React.ReactNode; theme: Theme; collapsible?: boolean; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen !== false);
  return (
    <div className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden`}>
      <button
        type="button"
        onClick={() => collapsible && setOpen(!open)}
        className={`w-full flex items-center gap-2 px-5 py-3 ${theme.secondaryBg} ${collapsible ? 'cursor-pointer' : 'cursor-default'}`}
      >
        <Icon size={14} className={theme.primaryText} />
        <span className={`text-xs font-bold ${theme.highlight}`}>{title}</span>
        {collapsible && (
          <span className="ml-auto">{open ? <ChevronUp size={14} className={theme.iconColor} /> : <ChevronDown size={14} className={theme.iconColor} />}</span>
        )}
      </button>
      {open && <div className="p-5">{children}</div>}
    </div>
  );
}

// ─── STUDENT ADD / ONBOARDING FORM ──────────────────
interface SiblingEntry {
  name: string; rollNo: string; admNo: string; className: string;
}

function StudentAddForm({ theme, onBack }: { theme: Theme; onBack: () => void }) {
  const [formTab, setFormTab] = useState<'single' | 'bulk'>('single');

  // Personal info state
  const [academicYear, setAcademicYear] = useState('2025-26');
  const [admissionNo] = useState('ADM-2026-0049');
  const [admissionDate, setAdmissionDate] = useState('2026-02-12');
  const [rollNo, setRollNo] = useState('');
  const [status, setStatus] = useState('Active');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [section, setSection] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [house, setHouse] = useState('');
  const [religion, setReligion] = useState('');
  const [category, setCategory] = useState('');
  const [primaryContact, setPrimaryContact] = useState('');
  const [email, setEmail] = useState('');
  const [caste, setCaste] = useState('');
  const [motherTongue, setMotherTongue] = useState('');
  const [languagesKnown, setLanguagesKnown] = useState<string[]>([]);

  // Father
  const [fatherName, setFatherName] = useState('');
  const [fatherPhone, setFatherPhone] = useState('');
  const [fatherEmail, setFatherEmail] = useState('');
  const [fatherOccupation, setFatherOccupation] = useState('');
  const [fatherIncome, setFatherIncome] = useState('');

  // Mother
  const [motherName, setMotherName] = useState('');
  const [motherPhone, setMotherPhone] = useState('');
  const [motherEmail, setMotherEmail] = useState('');
  const [motherOccupation, setMotherOccupation] = useState('');
  const [motherIncome, setMotherIncome] = useState('');

  // Guardian
  const [guardianSameAs, setGuardianSameAs] = useState<'' | 'father' | 'mother'>('');
  const [guardianName, setGuardianName] = useState('');
  const [guardianRelation, setGuardianRelation] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [guardianEmail, setGuardianEmail] = useState('');

  // Siblings
  const [hasSibling, setHasSibling] = useState(false);
  const [siblings, setSiblings] = useState<SiblingEntry[]>([{ name: '', rollNo: '', admNo: '', className: '' }]);

  // Address
  const [currAddr1, setCurrAddr1] = useState('');
  const [currAddr2, setCurrAddr2] = useState('');
  const [currCity, setCurrCity] = useState('');
  const [currState, setCurrState] = useState('');
  const [currPin, setCurrPin] = useState('');
  const [sameAddress, setSameAddress] = useState(false);
  const [permAddr1, setPermAddr1] = useState('');
  const [permAddr2, setPermAddr2] = useState('');
  const [permCity, setPermCity] = useState('');
  const [permState, setPermState] = useState('');
  const [permPin, setPermPin] = useState('');

  // Transport
  const [route, setRoute] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [pickupPoint, setPickupPoint] = useState('');

  // Medical
  const [medicalCondition, setMedicalCondition] = useState('Good');
  const [allergies, setAllergies] = useState('');
  const [medications, setMedications] = useState('');

  // Previous school
  const [prevSchool, setPrevSchool] = useState('');
  const [prevAddress, setPrevAddress] = useState('');
  const [prevBoard, setPrevBoard] = useState('');

  // Bank
  const [bankName, setBankName] = useState('');
  const [bankBranch, setBankBranch] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [accountNo, setAccountNo] = useState('');

  const addSibling = () => setSiblings([...siblings, { name: '', rollNo: '', admNo: '', className: '' }]);
  const removeSibling = (idx: number) => setSiblings(siblings.filter((_, i) => i !== idx));
  const updateSibling = (idx: number, field: keyof SiblingEntry, val: string) => {
    const updated = [...siblings];
    updated[idx] = { ...updated[idx], [field]: val };
    setSiblings(updated);
  };

  const toggleLanguage = (lang: string) => {
    setLanguagesKnown(prev => prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]);
  };

  const classOptions = ['Nursery', 'LKG', 'UKG', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];
  const sectionOptions = ['A', 'B', 'C', 'D'];
  const genderOptions = ['Male', 'Female', 'Other'];
  const bloodGroupOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const houseOptions = ['Red House', 'Blue House', 'Green House', 'Yellow House'];
  const religionOptions = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Jain', 'Buddhist', 'Other'];
  const categoryOptions = ['General', 'OBC', 'SC', 'ST', 'EWS', 'Other'];
  const languageOptions = ['Hindi', 'English', 'Gujarati', 'Marathi', 'Tamil', 'Telugu', 'Kannada', 'Bengali', 'Malayalam', 'Punjabi', 'Urdu', 'Sanskrit'];
  const routeOptions = ['Route A', 'Route B', 'Route C', 'Route D', 'Route E', 'Route F'];
  const boardOptions = ['CBSE', 'ICSE', 'State Board', 'IB', 'IGCSE', 'Other'];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className={`p-2 rounded-xl ${theme.secondaryBg} ${theme.buttonHover}`}>
          <ArrowLeft size={16} className={theme.iconColor} />
        </button>
        <div>
          <h1 className={`text-2xl font-bold ${theme.highlight}`}>Student Registration</h1>
          <p className={`text-xs ${theme.iconColor}`}>Add a new student to the school records</p>
        </div>
      </div>

      {/* Single / Bulk toggle */}
      <TabBar tabs={['Single Entry', 'Bulk Upload']} active={formTab === 'single' ? 'Single Entry' : 'Bulk Upload'} onChange={t => setFormTab(t === 'Single Entry' ? 'single' : 'bulk')} theme={theme} />

      {formTab === 'bulk' ? (
        <BulkUploadTab theme={theme} />
      ) : (
        <div className="space-y-4">
          {/* ─── PERSONAL INFORMATION ─────────────────── */}
          <FormSection title="Personal Information" icon={Users} theme={theme}>
            <div className="flex gap-5">
              <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
                <FormField label="Academic Year" required theme={theme}>
                  <SelectField options={['2024-25', '2025-26', '2026-27']} value={academicYear} onChange={setAcademicYear} theme={theme} />
                </FormField>
                <FormField label="Admission Number" theme={theme}>
                  <InputField value={admissionNo} onChange={() => {}} theme={theme} readOnly />
                </FormField>
                <FormField label="Admission Date" required theme={theme}>
                  <InputField type="date" value={admissionDate} onChange={setAdmissionDate} theme={theme} />
                </FormField>
                <FormField label="Roll Number" theme={theme}>
                  <InputField placeholder="Auto / Manual" value={rollNo} onChange={setRollNo} theme={theme} />
                </FormField>
                <FormField label="Status" required theme={theme}>
                  <SelectField options={['Active', 'Inactive', 'Left']} value={status} onChange={setStatus} theme={theme} />
                </FormField>
                <div /> {/* spacer */}
                <FormField label="First Name" required theme={theme}>
                  <InputField placeholder="First name" value={firstName} onChange={setFirstName} theme={theme} />
                </FormField>
                <FormField label="Last Name" required theme={theme}>
                  <InputField placeholder="Last name" value={lastName} onChange={setLastName} theme={theme} />
                </FormField>
                <FormField label="Class" required theme={theme}>
                  <SelectField options={classOptions} value={studentClass} onChange={setStudentClass} theme={theme} placeholder="Select class" />
                </FormField>
                <FormField label="Section" required theme={theme}>
                  <SelectField options={sectionOptions} value={section} onChange={setSection} theme={theme} placeholder="Select section" />
                </FormField>
                <FormField label="Gender" required theme={theme}>
                  <SelectField options={genderOptions} value={gender} onChange={setGender} theme={theme} placeholder="Select gender" />
                </FormField>
                <FormField label="Date of Birth" required theme={theme}>
                  <InputField type="date" value={dob} onChange={setDob} theme={theme} />
                </FormField>
                <FormField label="Blood Group" theme={theme}>
                  <SelectField options={bloodGroupOptions} value={bloodGroup} onChange={setBloodGroup} theme={theme} placeholder="Select" />
                </FormField>
                <FormField label="House" theme={theme}>
                  <SelectField options={houseOptions} value={house} onChange={setHouse} theme={theme} placeholder="Select house" />
                </FormField>
                <FormField label="Religion" theme={theme}>
                  <SelectField options={religionOptions} value={religion} onChange={setReligion} theme={theme} placeholder="Select" />
                </FormField>
                <FormField label="Category" theme={theme}>
                  <SelectField options={categoryOptions} value={category} onChange={setCategory} theme={theme} placeholder="Select" />
                </FormField>
                <FormField label="Primary Contact" required theme={theme}>
                  <InputField placeholder="10-digit mobile" value={primaryContact} onChange={setPrimaryContact} theme={theme} />
                </FormField>
                <FormField label="Email" theme={theme}>
                  <InputField placeholder="email@example.com" type="email" value={email} onChange={setEmail} theme={theme} />
                </FormField>
                <FormField label="Caste" theme={theme}>
                  <InputField placeholder="Caste" value={caste} onChange={setCaste} theme={theme} />
                </FormField>
                <FormField label="Mother Tongue" theme={theme}>
                  <InputField placeholder="Mother tongue" value={motherTongue} onChange={setMotherTongue} theme={theme} />
                </FormField>
                <FormField label="Languages Known" theme={theme}>
                  <div className="flex flex-wrap gap-1.5">
                    {languageOptions.map(lang => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => toggleLanguage(lang)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                          languagesKnown.includes(lang)
                            ? `${theme.primary} text-white border-transparent`
                            : `${theme.border} ${theme.iconColor} ${theme.buttonHover}`
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </FormField>
              </div>
              <div className="shrink-0">
                <PhotoUpload label="Student Photo" theme={theme} />
              </div>
            </div>
          </FormSection>

          {/* ─── PARENTS & GUARDIAN ────────────────────── */}
          <FormSection title="Parents & Guardian Information" icon={Users} theme={theme} collapsible defaultOpen>
            {/* Father */}
            <div className="mb-5">
              <p className={`text-xs font-bold ${theme.highlight} mb-3`}>Father&apos;s Details</p>
              <div className="flex gap-5">
                <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
                  <FormField label="Father's Name" required theme={theme}>
                    <InputField placeholder="Full name" value={fatherName} onChange={setFatherName} theme={theme} />
                  </FormField>
                  <FormField label="Phone" required theme={theme}>
                    <InputField placeholder="10-digit mobile" value={fatherPhone} onChange={setFatherPhone} theme={theme} />
                  </FormField>
                  <FormField label="Email" theme={theme}>
                    <InputField placeholder="email@example.com" value={fatherEmail} onChange={setFatherEmail} theme={theme} />
                  </FormField>
                  <FormField label="Occupation" theme={theme}>
                    <InputField placeholder="Occupation" value={fatherOccupation} onChange={setFatherOccupation} theme={theme} />
                  </FormField>
                  <FormField label="Annual Income" theme={theme}>
                    <InputField placeholder="e.g. 500000" value={fatherIncome} onChange={setFatherIncome} theme={theme} />
                  </FormField>
                </div>
                <div className="shrink-0"><PhotoUpload label="Father Photo" theme={theme} /></div>
              </div>
            </div>

            {/* Mother */}
            <div className={`mb-5 pt-5 border-t ${theme.border}`}>
              <p className={`text-xs font-bold ${theme.highlight} mb-3`}>Mother&apos;s Details</p>
              <div className="flex gap-5">
                <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
                  <FormField label="Mother's Name" required theme={theme}>
                    <InputField placeholder="Full name" value={motherName} onChange={setMotherName} theme={theme} />
                  </FormField>
                  <FormField label="Phone" theme={theme}>
                    <InputField placeholder="10-digit mobile" value={motherPhone} onChange={setMotherPhone} theme={theme} />
                  </FormField>
                  <FormField label="Email" theme={theme}>
                    <InputField placeholder="email@example.com" value={motherEmail} onChange={setMotherEmail} theme={theme} />
                  </FormField>
                  <FormField label="Occupation" theme={theme}>
                    <InputField placeholder="Occupation" value={motherOccupation} onChange={setMotherOccupation} theme={theme} />
                  </FormField>
                  <FormField label="Annual Income" theme={theme}>
                    <InputField placeholder="e.g. 500000" value={motherIncome} onChange={setMotherIncome} theme={theme} />
                  </FormField>
                </div>
                <div className="shrink-0"><PhotoUpload label="Mother Photo" theme={theme} /></div>
              </div>
            </div>

            {/* Guardian */}
            <div className={`pt-5 border-t ${theme.border}`}>
              <div className="flex items-center gap-4 mb-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>Guardian Details</p>
                <label className={`flex items-center gap-1.5 text-[10px] ${theme.iconColor} cursor-pointer`}>
                  <input type="checkbox" checked={guardianSameAs === 'father'} onChange={() => {
                    if (guardianSameAs === 'father') { setGuardianSameAs(''); setGuardianName(''); setGuardianPhone(''); setGuardianEmail(''); }
                    else { setGuardianSameAs('father'); setGuardianName(fatherName); setGuardianRelation('Father'); setGuardianPhone(fatherPhone); setGuardianEmail(fatherEmail); }
                  }} className="rounded" /> Same as Father
                </label>
                <label className={`flex items-center gap-1.5 text-[10px] ${theme.iconColor} cursor-pointer`}>
                  <input type="checkbox" checked={guardianSameAs === 'mother'} onChange={() => {
                    if (guardianSameAs === 'mother') { setGuardianSameAs(''); setGuardianName(''); setGuardianPhone(''); setGuardianEmail(''); }
                    else { setGuardianSameAs('mother'); setGuardianName(motherName); setGuardianRelation('Mother'); setGuardianPhone(motherPhone); setGuardianEmail(motherEmail); }
                  }} className="rounded" /> Same as Mother
                </label>
              </div>
              <div className="flex gap-5">
                <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
                  <FormField label="Guardian Name" required theme={theme}>
                    <InputField placeholder="Full name" value={guardianName} onChange={setGuardianName} theme={theme} disabled={guardianSameAs !== ''} />
                  </FormField>
                  <FormField label="Relation" required theme={theme}>
                    <InputField placeholder="e.g. Uncle, Grandparent" value={guardianRelation} onChange={setGuardianRelation} theme={theme} disabled={guardianSameAs !== ''} />
                  </FormField>
                  <FormField label="Phone" required theme={theme}>
                    <InputField placeholder="10-digit mobile" value={guardianPhone} onChange={setGuardianPhone} theme={theme} disabled={guardianSameAs !== ''} />
                  </FormField>
                  <FormField label="Email" theme={theme}>
                    <InputField placeholder="email@example.com" value={guardianEmail} onChange={setGuardianEmail} theme={theme} disabled={guardianSameAs !== ''} />
                  </FormField>
                </div>
                <div className="shrink-0"><PhotoUpload label="Guardian Photo" theme={theme} /></div>
              </div>
            </div>
          </FormSection>

          {/* ─── SIBLINGS ─────────────────────────────── */}
          <FormSection title="Sibling Information" icon={Users} theme={theme} collapsible defaultOpen={false}>
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-xs ${theme.highlight} font-bold`}>Sibling studying in this school?</span>
              <Toggle on={hasSibling} onChange={() => setHasSibling(!hasSibling)} theme={theme} />
              <span className={`text-[10px] ${theme.iconColor}`}>{hasSibling ? 'Yes' : 'No'}</span>
            </div>
            {hasSibling && (
              <div className="space-y-3">
                {siblings.map((sib, idx) => (
                  <div key={idx} className={`grid grid-cols-2 md:grid-cols-5 gap-3 p-3 rounded-xl ${theme.accentBg} items-end`}>
                    <FormField label="Sibling Name" theme={theme}>
                      <InputField placeholder="Name" value={sib.name} onChange={v => updateSibling(idx, 'name', v)} theme={theme} />
                    </FormField>
                    <FormField label="Roll No" theme={theme}>
                      <InputField placeholder="Roll no" value={sib.rollNo} onChange={v => updateSibling(idx, 'rollNo', v)} theme={theme} />
                    </FormField>
                    <FormField label="Admission No" theme={theme}>
                      <InputField placeholder="Adm. no" value={sib.admNo} onChange={v => updateSibling(idx, 'admNo', v)} theme={theme} />
                    </FormField>
                    <FormField label="Class" theme={theme}>
                      <SelectField options={classOptions} value={sib.className} onChange={v => updateSibling(idx, 'className', v)} theme={theme} placeholder="Select" />
                    </FormField>
                    <div className="flex items-end pb-0.5">
                      {siblings.length > 1 && (
                        <button type="button" onClick={() => removeSibling(idx)} className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-all">
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button type="button" onClick={addSibling} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} text-xs font-bold ${theme.primaryText}`}>
                  <Plus size={12} /> Add Sibling
                </button>
              </div>
            )}
          </FormSection>

          {/* ─── ADDRESS ──────────────────────────────── */}
          <FormSection title="Address" icon={MapPin} theme={theme} collapsible defaultOpen={false}>
            <p className={`text-xs font-bold ${theme.highlight} mb-3`}>Current Address</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-5">
              <FormField label="Address Line 1" required theme={theme} span={2}>
                <InputField placeholder="House/Flat no, Street" value={currAddr1} onChange={setCurrAddr1} theme={theme} />
              </FormField>
              <FormField label="Address Line 2" theme={theme}>
                <InputField placeholder="Landmark, Area" value={currAddr2} onChange={setCurrAddr2} theme={theme} />
              </FormField>
              <FormField label="City" required theme={theme}>
                <InputField placeholder="City" value={currCity} onChange={setCurrCity} theme={theme} />
              </FormField>
              <FormField label="State" required theme={theme}>
                <InputField placeholder="State" value={currState} onChange={setCurrState} theme={theme} />
              </FormField>
              <FormField label="PIN Code" required theme={theme}>
                <InputField placeholder="6-digit PIN" value={currPin} onChange={setCurrPin} theme={theme} />
              </FormField>
            </div>

            <div className={`pt-5 border-t ${theme.border}`}>
              <div className="flex items-center gap-3 mb-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>Permanent Address</p>
                <label className={`flex items-center gap-1.5 text-[10px] ${theme.iconColor} cursor-pointer`}>
                  <input type="checkbox" checked={sameAddress} onChange={() => {
                    setSameAddress(!sameAddress);
                    if (!sameAddress) { setPermAddr1(currAddr1); setPermAddr2(currAddr2); setPermCity(currCity); setPermState(currState); setPermPin(currPin); }
                    else { setPermAddr1(''); setPermAddr2(''); setPermCity(''); setPermState(''); setPermPin(''); }
                  }} className="rounded" /> Same as Current Address
                </label>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <FormField label="Address Line 1" theme={theme} span={2}>
                  <InputField placeholder="House/Flat no, Street" value={sameAddress ? currAddr1 : permAddr1} onChange={setPermAddr1} theme={theme} disabled={sameAddress} />
                </FormField>
                <FormField label="Address Line 2" theme={theme}>
                  <InputField placeholder="Landmark, Area" value={sameAddress ? currAddr2 : permAddr2} onChange={setPermAddr2} theme={theme} disabled={sameAddress} />
                </FormField>
                <FormField label="City" theme={theme}>
                  <InputField placeholder="City" value={sameAddress ? currCity : permCity} onChange={setPermCity} theme={theme} disabled={sameAddress} />
                </FormField>
                <FormField label="State" theme={theme}>
                  <InputField placeholder="State" value={sameAddress ? currState : permState} onChange={setPermState} theme={theme} disabled={sameAddress} />
                </FormField>
                <FormField label="PIN Code" theme={theme}>
                  <InputField placeholder="6-digit PIN" value={sameAddress ? currPin : permPin} onChange={setPermPin} theme={theme} disabled={sameAddress} />
                </FormField>
              </div>
            </div>
          </FormSection>

          {/* ─── TRANSPORT ────────────────────────────── */}
          <FormSection title="Transport Information" icon={Bus} theme={theme} collapsible defaultOpen={false}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <FormField label="Route" theme={theme}>
                <SelectField options={routeOptions} value={route} onChange={setRoute} theme={theme} placeholder="Select route" />
              </FormField>
              <FormField label="Vehicle Number" theme={theme}>
                <InputField placeholder="Auto-filled from route" value={vehicleNo} onChange={setVehicleNo} theme={theme} />
              </FormField>
              <FormField label="Pickup Point" theme={theme}>
                <InputField placeholder="Nearest stop" value={pickupPoint} onChange={setPickupPoint} theme={theme} />
              </FormField>
            </div>
          </FormSection>

          {/* ─── DOCUMENTS ────────────────────────────── */}
          <FormSection title="Document Uploads" icon={FileText} theme={theme} collapsible defaultOpen={false}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <FileUploadArea label="Transfer Certificate" theme={theme} />
              <FileUploadArea label="Birth Certificate" theme={theme} />
              <FileUploadArea label="Aadhaar Card" theme={theme} />
              <FileUploadArea label="Previous Marksheet" theme={theme} />
            </div>
          </FormSection>

          {/* ─── MEDICAL HISTORY ──────────────────────── */}
          <FormSection title="Medical History" icon={Heart} theme={theme} collapsible defaultOpen={false}>
            <div className="space-y-4">
              <FormField label="Medical Condition" theme={theme}>
                <div className="flex gap-4">
                  {['Good', 'Bad', 'Others'].map(opt => (
                    <label key={opt} className={`flex items-center gap-1.5 text-xs ${theme.highlight} cursor-pointer`}>
                      <input
                        type="radio"
                        name="medicalCondition"
                        value={opt}
                        checked={medicalCondition === opt}
                        onChange={() => setMedicalCondition(opt)}
                        className="accent-slate-600"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </FormField>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Allergies (if any)" theme={theme}>
                  <TextAreaField placeholder="List any known allergies..." value={allergies} onChange={setAllergies} theme={theme} rows={2} />
                </FormField>
                <FormField label="Medications (if any)" theme={theme}>
                  <TextAreaField placeholder="List any regular medications..." value={medications} onChange={setMedications} theme={theme} rows={2} />
                </FormField>
              </div>
            </div>
          </FormSection>

          {/* ─── PREVIOUS SCHOOL ──────────────────────── */}
          <FormSection title="Previous School Details" icon={Building} theme={theme} collapsible defaultOpen={false}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <FormField label="Previous School Name" theme={theme}>
                <InputField placeholder="School name" value={prevSchool} onChange={setPrevSchool} theme={theme} />
              </FormField>
              <FormField label="Address" theme={theme}>
                <InputField placeholder="School address" value={prevAddress} onChange={setPrevAddress} theme={theme} />
              </FormField>
              <FormField label="Board" theme={theme}>
                <SelectField options={boardOptions} value={prevBoard} onChange={setPrevBoard} theme={theme} placeholder="Select board" />
              </FormField>
            </div>
          </FormSection>

          {/* ─── BANK / OTHER DETAILS ─────────────────── */}
          <FormSection title="Other Details (Bank)" icon={Landmark} theme={theme} collapsible defaultOpen={false}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <FormField label="Bank Name" theme={theme}>
                <InputField placeholder="Bank name" value={bankName} onChange={setBankName} theme={theme} />
              </FormField>
              <FormField label="Branch" theme={theme}>
                <InputField placeholder="Branch" value={bankBranch} onChange={setBankBranch} theme={theme} />
              </FormField>
              <FormField label="IFSC Code" theme={theme}>
                <InputField placeholder="e.g. SBIN0001234" value={ifsc} onChange={setIfsc} theme={theme} />
              </FormField>
              <FormField label="Account Number" theme={theme}>
                <InputField placeholder="Account no." value={accountNo} onChange={setAccountNo} theme={theme} />
              </FormField>
            </div>
          </FormSection>

          {/* ─── BOTTOM ACTIONS ───────────────────────── */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex items-center justify-between sticky bottom-0 z-10 shadow-lg`}>
            <button onClick={onBack} className={`px-5 py-2.5 rounded-xl border ${theme.border} text-xs font-bold ${theme.iconColor} ${theme.buttonHover} transition-all`}>
              Cancel
            </button>
            <div className="flex gap-3">
              <button className={`px-5 py-2.5 rounded-xl border ${theme.border} text-xs font-bold ${theme.highlight} ${theme.buttonHover} transition-all flex items-center gap-1.5`}>
                <Save size={12} /> Save as Draft
              </button>
              <button className={`px-6 py-2.5 ${theme.primary} text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm`}>
                <UserPlus size={12} /> Add Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── BULK UPLOAD TAB ────────────────────────────────
function BulkUploadTab({ theme }: { theme: Theme }) {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const previewRows = [
    { name: 'Aarav Mehta', class: '5-A', gender: 'Male', dob: '2016-03-15', father: 'Rajesh Mehta', phone: '9876543210' },
    { name: 'Priya Sharma', class: '3-B', gender: 'Female', dob: '2018-07-22', father: 'Amit Sharma', phone: '9876543211' },
    { name: 'Rohan Patel', class: '7-C', gender: 'Male', dob: '2014-11-08', father: 'Suresh Patel', phone: '9876543212' },
    { name: 'Ananya Gupta', class: '1-A', gender: 'Female', dob: '2020-01-30', father: 'Vivek Gupta', phone: '9876543213' },
    { name: 'Kabir Singh', class: '9-A', gender: 'Male', dob: '2012-06-05', father: 'Harpreet Singh', phone: '9876543214' },
  ];

  return (
    <div className="space-y-4">
      {/* Step 1: Download Template */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-2`}>Step 1: Download Template</h3>
        <p className={`text-xs ${theme.iconColor} mb-3`}>Download the template file, fill in student details, and upload it below.</p>
        <div className="flex gap-3">
          <button className={`px-4 py-2.5 rounded-xl border ${theme.border} text-xs font-bold ${theme.highlight} ${theme.buttonHover} flex items-center gap-1.5 transition-all`}>
            <Download size={12} /> Download CSV Template
          </button>
          <button className={`px-4 py-2.5 rounded-xl border ${theme.border} text-xs font-bold ${theme.highlight} ${theme.buttonHover} flex items-center gap-1.5 transition-all`}>
            <Download size={12} /> Download Excel Template
          </button>
        </div>
      </div>

      {/* Step 2: Upload File */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-2`}>Step 2: Upload File</h3>
        <div
          onClick={() => { setUploadedFile('students_batch_feb2026.csv'); setShowPreview(true); }}
          className={`border-2 border-dashed ${theme.border} rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer ${theme.buttonHover} transition-all`}
        >
          {uploadedFile ? (
            <>
              <File size={32} className="text-emerald-500 mb-2" />
              <p className={`text-xs font-bold ${theme.highlight}`}>{uploadedFile}</p>
              <p className={`text-[10px] ${theme.iconColor} mt-1`}>5 records detected. Click to change file.</p>
            </>
          ) : (
            <>
              <Upload size={32} className={theme.iconColor} />
              <p className={`text-xs font-bold ${theme.highlight} mt-2`}>Drag & drop your file here</p>
              <p className={`text-[10px] ${theme.iconColor} mt-1`}>or click to browse. Supported: CSV, XLSX (max 10MB)</p>
            </>
          )}
        </div>
      </div>

      {/* Step 3: Preview */}
      {showPreview && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Step 3: Preview (First 5 Rows)</h3>
            <span className={`text-[10px] px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 font-bold`}>5 records found</span>
          </div>
          <DataTable
            headers={['Student Name', 'Class', 'Gender', 'DOB', 'Father Name', 'Phone']}
            rows={previewRows.map(r => [
              <span key="n" className={`font-bold ${theme.highlight}`}>{r.name}</span>,
              <span key="c" className={theme.iconColor}>{r.class}</span>,
              <span key="g" className={theme.iconColor}>{r.gender}</span>,
              <span key="d" className={theme.iconColor}>{r.dob}</span>,
              <span key="f" className={theme.iconColor}>{r.father}</span>,
              <span key="p" className={theme.iconColor}>{r.phone}</span>,
            ])}
            theme={theme}
          />
          <div className="flex gap-3 mt-4">
            <button className={`px-5 py-2.5 rounded-xl border ${theme.border} text-xs font-bold ${theme.highlight} ${theme.buttonHover} flex items-center gap-1.5 transition-all`}>
              <CheckCircle size={12} /> Upload & Validate
            </button>
            <button className={`px-6 py-2.5 ${theme.primary} text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm`}>
              <Upload size={12} /> Import Students
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── STUDENTS MODULE ─────────────────────────────────
function StudentsModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All Students');
  const [showAddStudent, setShowAddStudent] = useState(false);

  if (showAddStudent) {
    return <StudentAddForm theme={theme} onBack={() => setShowAddStudent(false)} />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Student Management</h1>
        <button onClick={() => setShowAddStudent(true)} className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> Add Student</button>
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
  const [tab, setTab] = useState('Announcements');
  const [showNewAnnouncement, setShowNewAnnouncement] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [announcementForm, setAnnouncementForm] = useState({
    title: '', message: '', audience: 'All Staff', priority: 'Normal' as 'Normal' | 'Important' | 'Urgent', scheduleMode: 'now' as 'now' | 'later', scheduleDate: '',
    studentFilters: { grades: [] as string[], divisions: [] as string[], sectionGroups: [] as string[], houses: [] as string[] },
  });

  const announcements = [
    { id: 1, title: 'Annual Day Celebration — 28 February 2026', message: 'All students from Class I to X are expected to participate. Parents are cordially invited.', sentTo: 'All', date: '10-Feb-2026', sentBy: 'Admin Office' },
    { id: 2, title: 'Fee Payment Reminder — Last Date 15 Feb', message: 'Parents are requested to clear all pending fee dues by 15-Feb-2026. Late fee applicable.', sentTo: 'Parents', date: '08-Feb-2026', sentBy: 'Accounts Dept.' },
    { id: 3, title: 'PTM Schedule — Classes VI to X', message: 'PTM for classes VI to X will be held on 15-Feb (Saturday). Parents requested to attend.', sentTo: 'Parents', date: '07-Feb-2026', sentBy: 'Admin Office' },
    { id: 4, title: 'Revised School Timings — Effective 1 March', message: 'Summer timings effective 1-Mar-2026. School hours: 7:00 AM to 1:00 PM.', sentTo: 'All', date: '05-Feb-2026', sentBy: 'Admin Office' },
  ];

  const audienceColor = (audience: string) => {
    if (audience === 'All') return 'bg-blue-100 text-blue-700';
    if (audience === 'Teachers') return 'bg-purple-100 text-purple-700';
    return 'bg-emerald-100 text-emerald-700';
  };

  const priorityStyle = (p: string) => {
    if (p === 'Urgent') return 'bg-red-500 text-white';
    if (p === 'Important') return 'bg-amber-500 text-white';
    return 'bg-blue-100 text-blue-700';
  };

  const getRecipientCounts = () => {
    const counts: { group: string; count: number }[] = [];
    const audience = announcementForm.audience;
    if (audience === 'All Staff' || audience === 'Selected Groups') { counts.push({ group: 'Academic Staff', count: 78 }); counts.push({ group: 'Non-Academic Staff', count: 38 }); }
    if (audience === 'Teachers') { counts.push({ group: 'Teaching Staff', count: 78 }); }
    if (audience === 'Parents' || audience === 'Selected Groups') { counts.push({ group: 'Parents', count: 2847 }); }
    if (audience === 'Students' || audience === 'Selected Groups') {
      const sf = announcementForm.studentFilters;
      const hasFilters = sf.grades.length > 0 || sf.divisions.length > 0 || sf.sectionGroups.length > 0 || sf.houses.length > 0;
      if (audience === 'Students' && hasFilters) {
        let studentCount = sf.grades.length > 0 ? sf.grades.length * 120 : 2847;
        if (sf.divisions.length > 0) studentCount = Math.round(studentCount * sf.divisions.length / 4);
        if (sf.sectionGroups.length > 0) studentCount = Math.round(studentCount * sf.sectionGroups.length / 4);
        if (sf.houses.length > 0) studentCount = Math.round(studentCount * sf.houses.length / 4);
        counts.push({ group: 'Students (filtered)', count: Math.min(studentCount, 2847) });
      } else { counts.push({ group: 'Students', count: 2847 }); }
    }
    return counts;
  };
  const totalRecipients = getRecipientCounts().reduce((sum, r) => sum + r.count, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Communication</h1>
        <div className="flex gap-2">
          {tab === 'Circulars' && (
            <button className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold flex items-center gap-1`}><Plus size={12} /> New Circular</button>
          )}
          {tab === 'Announcements' && (
            <button onClick={() => setShowNewAnnouncement(true)} className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold flex items-center gap-1`}><Plus size={12} /> New Announcement</button>
          )}
        </div>
      </div>

      <TabBar tabs={['Announcements', 'Circulars', 'Notices', 'WhatsApp', 'SMS', 'Email', 'Templates', 'Chat']} active={tab} onChange={setTab} theme={theme} />

      {/* Announcements Tab */}
      {tab === 'Announcements' && (
        <>
          <div className="grid grid-cols-3 gap-4">
            <StatCard icon={Megaphone} label="Total Sent" value="28" color="bg-blue-500" sub="this month" theme={theme} />
            <StatCard icon={Users} label="Reach" value="2,847" color="bg-emerald-500" sub="students + parents" theme={theme} />
            <StatCard icon={Bell} label="Scheduled" value="2" color="bg-amber-500" sub="upcoming" theme={theme} />
          </div>
          <div className="space-y-3">
            {announcements.map(a => (
              <div key={a.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`text-sm font-bold ${theme.highlight}`}>{a.title}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${audienceColor(a.sentTo)}`}>{a.sentTo}</span>
                </div>
                <p className={`text-xs ${theme.iconColor} leading-relaxed mb-3`}>{a.message}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] ${theme.iconColor}`}>{a.date}</span>
                    <span className={`text-[10px] ${theme.iconColor}`}>Sent by: <span className="font-bold">{a.sentBy}</span></span>
                  </div>
                  <div className="flex gap-1">
                    <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
                    <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Send size={12} className={theme.iconColor} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Circulars Tab */}
      {tab === 'Circulars' && (
        <div className="space-y-3">
          {[
            { title: 'Annual Day Celebration', date: '10-Jan', to: 'All Parents', status: 'Sent', via: 'App + WhatsApp' },
            { title: 'PTM Schedule — Class 6-10', date: '08-Jan', to: 'Class 6-10 Parents', status: 'Sent', via: 'App + SMS' },
            { title: 'Winter Uniform Reminder', date: '05-Jan', to: 'All Students', status: 'Draft', via: '—' },
          ].map((c, i) => (
            <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex items-center justify-between`}>
              <div>
                <p className={`text-sm font-bold ${theme.highlight}`}>{c.title}</p>
                <p className={`text-xs ${theme.iconColor}`}>{c.date} &bull; To: {c.to} &bull; Via: {c.via}</p>
              </div>
              <StatusBadge status={c.status === 'Sent' ? 'Active' : 'Pending'} theme={theme} />
            </div>
          ))}
        </div>
      )}

      {/* Notices Tab */}
      {tab === 'Notices' && (
        <div className="space-y-3">
          {[
            { title: 'School Closed — Republic Day', date: '24-Jan', type: 'Holiday', status: 'Published' },
            { title: 'Exam Schedule — Final Term', date: '20-Jan', type: 'Academic', status: 'Published' },
            { title: 'Library Books Return Deadline', date: '15-Jan', type: 'General', status: 'Published' },
            { title: 'Sports Day Participation List', date: '12-Jan', type: 'Event', status: 'Draft' },
          ].map((n, i) => (
            <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex items-center justify-between`}>
              <div>
                <p className={`text-sm font-bold ${theme.highlight}`}>{n.title}</p>
                <p className={`text-xs ${theme.iconColor}`}>{n.date} &bull; {n.type}</p>
              </div>
              <StatusBadge status={n.status === 'Published' ? 'Active' : 'Pending'} theme={theme} />
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

      {/* ── Chat Tab ── */}
      {tab === 'Chat' && <ChatsView theme={theme} compact />}

      {/* New Announcement Modal */}
      {showNewAnnouncement && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowNewAnnouncement(false)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} shadow-2xl w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-9 h-9 rounded-xl ${theme.primary} flex items-center justify-center text-white`}><Megaphone size={18} /></div>
                <h2 className={`text-lg font-bold ${theme.highlight}`}>New Announcement</h2>
              </div>
              <button onClick={() => setShowNewAnnouncement(false)} className={`p-1.5 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
            </div>

            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Title</label>
              <input type="text" value={announcementForm.title} onChange={e => setAnnouncementForm(prev => ({ ...prev, title: e.target.value }))} placeholder="Enter announcement title..." className={`w-full px-3 py-2.5 rounded-xl text-sm ${theme.inputBg} border ${theme.border} ${theme.highlight} outline-none focus:ring-2 focus:ring-blue-300`} />
            </div>

            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Message</label>
              <textarea value={announcementForm.message} onChange={e => setAnnouncementForm(prev => ({ ...prev, message: e.target.value }))} placeholder="Type your announcement message..." rows={4} className={`w-full px-3 py-2.5 rounded-xl text-sm ${theme.inputBg} border ${theme.border} ${theme.highlight} outline-none focus:ring-2 focus:ring-blue-300 resize-none`} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Audience</label>
                <select value={announcementForm.audience} onChange={e => setAnnouncementForm(prev => ({ ...prev, audience: e.target.value, studentFilters: { grades: [], divisions: [], sectionGroups: [], houses: [] } }))} className={`w-full px-3 py-2.5 rounded-xl text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight} outline-none focus:ring-2 focus:ring-blue-300`}>
                  <option>All Staff</option>
                  <option>Teachers</option>
                  <option>Parents</option>
                  <option>Students</option>
                  <option>Selected Groups</option>
                </select>
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Priority</label>
                <div className="flex gap-1.5">
                  {(['Normal', 'Important', 'Urgent'] as const).map(p => (
                    <button key={p} onClick={() => setAnnouncementForm(prev => ({ ...prev, priority: p }))} className={`flex-1 px-2 py-2 rounded-xl text-[10px] font-bold transition-all ${announcementForm.priority === p ? priorityStyle(p) : `${theme.secondaryBg} ${theme.iconColor} ${theme.buttonHover}`}`}>{p}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Student Sub-Filters */}
            {announcementForm.audience === 'Students' && (
              <div className={`p-3 rounded-xl border ${theme.border} ${theme.secondaryBg} space-y-3`}>
                <p className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>Student Filters</p>
                <div>
                  <label className={`text-[10px] font-medium ${theme.iconColor} block mb-1`}>Grade-wise</label>
                  <div className="flex flex-wrap gap-1">
                    {Array.from({ length: 12 }, (_, i) => `Grade ${i + 1}`).map(g => (
                      <button key={g} onClick={() => setAnnouncementForm(prev => ({ ...prev, studentFilters: { ...prev.studentFilters, grades: prev.studentFilters.grades.includes(g) ? prev.studentFilters.grades.filter(x => x !== g) : [...prev.studentFilters.grades, g] } }))} className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${announcementForm.studentFilters.grades.includes(g) ? `${theme.primary} text-white` : `${theme.cardBg} ${theme.iconColor} border ${theme.border}`}`}>{g.replace('Grade ', '')}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={`text-[10px] font-medium ${theme.iconColor} block mb-1`}>Division</label>
                  <div className="flex gap-1.5">
                    {['A', 'B', 'C', 'D'].map(d => (
                      <button key={d} onClick={() => setAnnouncementForm(prev => ({ ...prev, studentFilters: { ...prev.studentFilters, divisions: prev.studentFilters.divisions.includes(d) ? prev.studentFilters.divisions.filter(x => x !== d) : [...prev.studentFilters.divisions, d] } }))} className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${announcementForm.studentFilters.divisions.includes(d) ? `${theme.primary} text-white` : `${theme.cardBg} ${theme.iconColor} border ${theme.border}`}`}>{d}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={`text-[10px] font-medium ${theme.iconColor} block mb-1`}>Section Group</label>
                  <div className="flex flex-wrap gap-1.5">
                    {['Pre-Primary', 'Primary', 'Secondary', 'Senior Secondary'].map(s => (
                      <button key={s} onClick={() => setAnnouncementForm(prev => ({ ...prev, studentFilters: { ...prev.studentFilters, sectionGroups: prev.studentFilters.sectionGroups.includes(s) ? prev.studentFilters.sectionGroups.filter(x => x !== s) : [...prev.studentFilters.sectionGroups, s] } }))} className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${announcementForm.studentFilters.sectionGroups.includes(s) ? `${theme.primary} text-white` : `${theme.cardBg} ${theme.iconColor} border ${theme.border}`}`}>{s}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={`text-[10px] font-medium ${theme.iconColor} block mb-1`}>House-wise</label>
                  <div className="flex flex-wrap gap-1.5">
                    {[{ name: 'Red House', color: 'bg-red-500' }, { name: 'Blue House', color: 'bg-blue-500' }, { name: 'Green House', color: 'bg-green-500' }, { name: 'Yellow House', color: 'bg-yellow-500' }].map(h => (
                      <button key={h.name} onClick={() => setAnnouncementForm(prev => ({ ...prev, studentFilters: { ...prev.studentFilters, houses: prev.studentFilters.houses.includes(h.name) ? prev.studentFilters.houses.filter(x => x !== h.name) : [...prev.studentFilters.houses, h.name] } }))} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${announcementForm.studentFilters.houses.includes(h.name) ? `${theme.primary} text-white` : `${theme.cardBg} ${theme.iconColor} border ${theme.border}`}`}><span className={`w-2 h-2 rounded-full ${h.color}`} />{h.name}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Schedule Toggle */}
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-2`}>Schedule</label>
              <div className="flex items-center gap-3">
                <button onClick={() => setAnnouncementForm(prev => ({ ...prev, scheduleMode: 'now' }))} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${announcementForm.scheduleMode === 'now' ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.iconColor}`}`}><Send size={12} /> Send Now</button>
                <button onClick={() => setAnnouncementForm(prev => ({ ...prev, scheduleMode: 'later' }))} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${announcementForm.scheduleMode === 'later' ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.iconColor}`}`}><Clock size={12} /> Schedule for Later</button>
              </div>
              {announcementForm.scheduleMode === 'later' && (
                <input type="datetime-local" value={announcementForm.scheduleDate} onChange={e => setAnnouncementForm(prev => ({ ...prev, scheduleDate: e.target.value }))} className={`mt-2 w-full px-3 py-2 rounded-xl text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight} outline-none focus:ring-2 focus:ring-blue-300`} />
              )}
            </div>

            <button onClick={() => setShowPreview(true)} className={`w-full py-3 rounded-xl ${theme.primary} text-white text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity`}>
              <Eye size={14} /> Preview &amp; Confirm
            </button>
          </div>
        </div>
      )}

      {/* Preview / Confirmation Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4" onClick={() => setShowPreview(false)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} shadow-2xl w-full max-w-md p-6 space-y-4`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center text-white`}><Eye size={16} /></div>
                <h2 className={`text-base font-bold ${theme.highlight}`}>Confirm Announcement</h2>
              </div>
              <button onClick={() => setShowPreview(false)} className={`p-1.5 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
            </div>
            <div className={`p-4 rounded-xl ${theme.secondaryBg} border ${theme.border} space-y-2`}>
              <h3 className={`text-sm font-bold ${theme.highlight}`}>{announcementForm.title || '(No title)'}</h3>
              <p className={`text-xs ${theme.iconColor} leading-relaxed`}>{announcementForm.message || '(No message)'}</p>
              <div className="flex items-center gap-2 pt-1">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${priorityStyle(announcementForm.priority)}`}>{announcementForm.priority}</span>
                <span className={`text-[10px] ${theme.iconColor}`}>{announcementForm.scheduleMode === 'now' ? 'Send immediately' : `Scheduled: ${announcementForm.scheduleDate || 'Not set'}`}</span>
              </div>
            </div>
            <div className={`p-4 rounded-xl border-2 border-dashed ${theme.border} space-y-2`}>
              <p className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>This will be sent to:</p>
              <div className="space-y-1.5">
                {getRecipientCounts().map(r => (
                  <div key={r.group} className="flex items-center justify-between">
                    <span className={`text-xs font-medium ${theme.highlight}`}>{r.group}</span>
                    <span className={`text-xs font-bold ${theme.primaryText}`}>{r.count.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className={`flex items-center justify-between pt-2 border-t ${theme.border}`}>
                <span className={`text-xs font-bold ${theme.highlight}`}>Total Recipients</span>
                <span className={`text-sm font-bold ${theme.primaryText}`}>{totalRecipients.toLocaleString()}</span>
              </div>
            </div>
            {announcementForm.audience === 'Students' && (
              <div className={`text-[10px] ${theme.iconColor} space-y-0.5`}>
                {announcementForm.studentFilters.grades.length > 0 && <p>Grades: {announcementForm.studentFilters.grades.join(', ')}</p>}
                {announcementForm.studentFilters.divisions.length > 0 && <p>Divisions: {announcementForm.studentFilters.divisions.join(', ')}</p>}
                {announcementForm.studentFilters.sectionGroups.length > 0 && <p>Sections: {announcementForm.studentFilters.sectionGroups.join(', ')}</p>}
                {announcementForm.studentFilters.houses.length > 0 && <p>Houses: {announcementForm.studentFilters.houses.join(', ')}</p>}
              </div>
            )}
            <div className="flex gap-2">
              <button onClick={() => setShowPreview(false)} className={`flex-1 py-2.5 rounded-xl ${theme.secondaryBg} ${theme.highlight} text-xs font-bold flex items-center justify-center gap-1.5 ${theme.buttonHover} transition-all`}>
                <Edit size={12} /> Edit
              </button>
              <button onClick={() => { setShowPreview(false); setShowNewAnnouncement(false); setAnnouncementForm({ title: '', message: '', audience: 'All Staff', priority: 'Normal', scheduleMode: 'now', scheduleDate: '', studentFilters: { grades: [], divisions: [], sectionGroups: [], houses: [] } }); }} className={`flex-1 py-2.5 rounded-xl ${theme.primary} text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity`}>
                <Send size={12} /> {announcementForm.scheduleMode === 'now' ? 'Confirm & Send' : 'Confirm & Schedule'}
              </button>
            </div>
          </div>
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

// ─── HR MANAGEMENT MODULE ────────────────────────────
function HRManagementModule({ theme }: { theme: Theme }) {
  const staffList = [
    { name: 'Dr. Priya Sharma', designation: 'HOD - Science', department: 'Teaching', status: 'Active' },
    { name: 'Rajesh Kumar', designation: 'Admin Manager', department: 'Administration', status: 'Active' },
    { name: 'Ms. Kavita Desai', designation: 'Counselor', department: 'Student Support', status: 'On Leave' },
    { name: 'Mohammed Irfan', designation: 'Transport Head', department: 'Transport', status: 'Active' },
    { name: 'Vikram Singh', designation: 'IT Coordinator', department: 'IT & Lab', status: 'Active' },
    { name: 'Sunita Verma', designation: 'TGT - Hindi', department: 'Teaching', status: 'On Leave' },
  ];

  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>HR Management</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Staff" value="124" color="bg-blue-500" theme={theme} />
        <StatCard icon={GraduationCap} label="Teaching" value="78" color="bg-emerald-500" theme={theme} />
        <StatCard icon={Briefcase} label="Non-Teaching" value="46" color="bg-purple-500" theme={theme} />
        <StatCard icon={Calendar} label="On Leave Today" value="5" color="bg-amber-500" theme={theme} />
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Staff Directory</h3>
        <DataTable
          headers={['Name', 'Designation', 'Department', 'Status']}
          rows={staffList.map(s => [
            <span key="name" className={`font-bold ${theme.highlight}`}>{s.name}</span>,
            <span key="desig" className={theme.iconColor}>{s.designation}</span>,
            <span key="dept" className={theme.iconColor}>{s.department}</span>,
            <StatusBadge key="status" status={s.status === 'Active' ? 'Active' : 'Pending'} theme={theme} />,
          ])}
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
      <SchoolAdminDashboard />
    </BlueprintLayout>
  );
}
