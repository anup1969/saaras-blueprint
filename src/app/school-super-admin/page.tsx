'use client';

import React, { useState } from 'react';
import BlueprintLayout from '@/components/BlueprintLayout';
import { StatCard, Toggle, TabBar, DataTable, SearchBar } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  Home, Banknote, GraduationCap, Briefcase, Bus, ClipboardCheck, FileText,
  MessageSquare, Calendar, Clock, Shield, Award, Upload, ShieldCheck, Headphones,
  Settings, CheckCircle, AlertTriangle, Plus, X, Save, Download, Filter,
  Search, Edit, Trash2, Eye, ChevronDown, ChevronUp, PanelLeftClose, PanelLeftOpen,
  BookOpen, Users, Bell, Mail, Phone, MapPin, Printer, Hash, Lock, Key,
  UtensilsCrossed, Building, Package, Notebook, UserPlus, CreditCard,
  UserCircle, BarChart3, FileBarChart, Webhook, Palette, School, Globe, Plug
} from 'lucide-react';
import SupportModule from '@/components/SupportModule';

// ─── MODULE SIDEBAR ────────────────────────────────
const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'fee-config', label: 'Fee Configuration', icon: Banknote },
  { id: 'academic-config', label: 'Academic Config', icon: GraduationCap },
  { id: 'hr-config', label: 'HR & Payroll', icon: Briefcase },
  { id: 'transport-config', label: 'Transport', icon: Bus },
  { id: 'attendance-config', label: 'Attendance', icon: ClipboardCheck },
  { id: 'exam-config', label: 'Exams & Grading', icon: FileText },
  { id: 'communication-config', label: 'Communication', icon: MessageSquare },
  { id: 'timetable-config', label: 'Timetable & Bell', icon: Calendar },
  { id: 'leave-config', label: 'Leave Policy', icon: Clock },
  { id: 'visitor-config', label: 'Visitor Rules', icon: Shield },
  { id: 'certificate-config', label: 'Certificates', icon: Award },
  { id: 'library-config', label: 'Library', icon: BookOpen },
  { id: 'canteen-config', label: 'Canteen / Meal', icon: UtensilsCrossed },
  { id: 'hostel-config', label: 'Hostel', icon: Building },
  { id: 'inventory-config', label: 'Inventory & Assets', icon: Package },
  { id: 'compliance-config', label: 'Compliance & Quality', icon: ShieldCheck },
  { id: 'homework-config', label: 'Homework & Assignment', icon: Notebook },
  { id: 'enquiry-config', label: 'Enquiry & Admission', icon: UserPlus },
  { id: 'payment-config', label: 'Online Payment', icon: CreditCard },
  { id: 'data-migration', label: 'Data Migration', icon: Upload },
  { id: 'critical-locks', label: 'Critical Locks', icon: Lock },
  { id: 'audit-log', label: 'Audit Log', icon: ShieldCheck },
  { id: 'parent-portal-config', label: 'Parent Portal', icon: UserCircle },
  { id: 'student-portal-config', label: 'Student Portal', icon: Users },
  { id: 'alumni-config', label: 'Alumni', icon: Globe },
  { id: 'analytics-config', label: 'Analytics & BI', icon: BarChart3 },
  { id: 'report-engine-config', label: 'Report Engine', icon: FileBarChart },
  { id: 'api-integration-config', label: 'API & Integrations', icon: Plug },
  { id: 'branding-config', label: 'Branding & White-label', icon: Palette },
  { id: 'school-identity-config', label: 'School Identity', icon: School },
  { id: 'support', label: 'Support', icon: Headphones },
];

// ─── HELPER COMPONENTS ─────────────────────────────
function SSAToggle({ on, onChange, theme }: { on: boolean; onChange: () => void; theme: Theme }) {
  return (
    <button onClick={onChange} className={`w-9 h-5 rounded-full relative transition-colors ${on ? theme.primary : 'bg-gray-300'}`}>
      <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${on ? 'translate-x-4' : 'translate-x-0.5'}`} />
    </button>
  );
}

function SectionCard({ title, subtitle, children, theme }: { title: string; subtitle?: string; children: React.ReactNode; theme: Theme }) {
  return (
    <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
      <h3 className={`text-sm font-bold ${theme.highlight} mb-1`}>{title}</h3>
      {subtitle && <p className={`text-[10px] ${theme.iconColor} mb-3`}>{subtitle}</p>}
      {!subtitle && <div className="mb-3" />}
      {children}
    </div>
  );
}

// ─── MODULE HEADER (Save Changes bar) ──────────────
function ModuleHeader({ title, subtitle, theme, onSave }: { title: string; subtitle?: string; theme: Theme; onSave?: () => void }) {
  const [saved, setSaved] = useState(false);
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h1 className={`text-xl font-bold ${theme.highlight}`}>{title}</h1>
        {subtitle && <p className={`text-xs ${theme.iconColor} mt-0.5`}>{subtitle}</p>}
        <p className={`text-[10px] ${theme.iconColor} flex items-center gap-1 mt-0.5`}>
          <Edit size={10} /> Click any field to configure
        </p>
      </div>
      <div className="flex items-center gap-2">
        {saved && <span className="text-green-500 text-xs font-medium animate-pulse">Saved!</span>}
        <button
          onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); if (onSave) onSave(); }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white ${theme.primary} hover:opacity-90 transition-all`}>
          <Save size={14} /> Save Changes
        </button>
      </div>
    </div>
  );
}

function InputField({ placeholder, value, onChange, theme, type, disabled }: {
  placeholder?: string; value: string; onChange: (v: string) => void; theme: Theme; type?: string; disabled?: boolean;
}) {
  return (
    <input
      type={type || 'text'}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      disabled={disabled}
      className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none focus:ring-2 focus:ring-slate-300 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    />
  );
}

function SelectField({ options, value, onChange, theme, placeholder }: {
  options: string[]; value: string; onChange: (v: string) => void; theme: Theme; placeholder?: string;
}) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none focus:ring-2 focus:ring-slate-300`}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────
function SchoolSuperAdminDashboard({ theme }: { theme?: Theme }) {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  if (!theme) return null;

  return (
    <div className="flex gap-4 -m-6">
      <div className={`${sidebarCollapsed ? 'w-14' : 'w-48'} ${theme.cardBg} border-r ${theme.border} min-h-screen p-2 space-y-0.5 shrink-0 transition-all duration-200`}>
        <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} px-2 py-2`}>
          {!sidebarCollapsed && <p className={`text-[10px] font-bold ${theme.iconColor} uppercase px-1`}>Modules</p>}
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className={`p-1 rounded-lg ${theme.buttonHover} ${theme.iconColor} transition-all`}>
            {sidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={14} />}
          </button>
        </div>
        {modules.map(m => (
          <button key={m.id} onClick={() => setActiveModule(m.id)} title={sidebarCollapsed ? m.label : undefined}
            className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2 py-2.5' : 'gap-2 px-3 py-2'} rounded-lg text-xs font-medium transition-all ${
              activeModule === m.id ? `${theme.primary} text-white` : `${theme.iconColor} ${theme.buttonHover}`
            }`}>
            <m.icon size={sidebarCollapsed ? 18 : 14} /> {!sidebarCollapsed && m.label}
          </button>
        ))}
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-x-hidden">
        {activeModule === 'dashboard' && <SSADashboardHome theme={theme} onNavigate={setActiveModule} />}
        {activeModule === 'fee-config' && <FeeConfigModule theme={theme} />}
        {activeModule === 'academic-config' && <AcademicConfigModule theme={theme} />}
        {activeModule === 'hr-config' && <HRConfigModule theme={theme} />}
        {activeModule === 'transport-config' && <TransportConfigModule theme={theme} />}
        {activeModule === 'attendance-config' && <AttendanceConfigModule theme={theme} />}
        {activeModule === 'exam-config' && <ExamConfigModule theme={theme} />}
        {activeModule === 'communication-config' && <CommunicationConfigModule theme={theme} />}
        {activeModule === 'timetable-config' && <TimetableConfigModule theme={theme} />}
        {activeModule === 'leave-config' && <LeaveConfigModule theme={theme} />}
        {activeModule === 'visitor-config' && <VisitorConfigModule theme={theme} />}
        {activeModule === 'certificate-config' && <CertificateConfigModule theme={theme} />}
        {activeModule === 'library-config' && <LibraryConfigModule theme={theme} />}
        {activeModule === 'canteen-config' && <CanteenConfigModule theme={theme} />}
        {activeModule === 'hostel-config' && <HostelConfigModule theme={theme} />}
        {activeModule === 'inventory-config' && <InventoryConfigModule theme={theme} />}
        {activeModule === 'compliance-config' && <ComplianceConfigModule theme={theme} />}
        {activeModule === 'homework-config' && <HomeworkConfigModule theme={theme} />}
        {activeModule === 'enquiry-config' && <EnquiryAdmissionConfigModule theme={theme} />}
        {activeModule === 'payment-config' && <OnlinePaymentConfigModule theme={theme} />}
        {activeModule === 'data-migration' && <DataMigrationModule theme={theme} />}
        {activeModule === 'critical-locks' && <CriticalLocksModule theme={theme} />}
        {activeModule === 'audit-log' && <AuditLogModule theme={theme} />}
        {activeModule === 'parent-portal-config' && <ParentPortalConfigModule theme={theme} />}
        {activeModule === 'student-portal-config' && <StudentPortalConfigModule theme={theme} />}
        {activeModule === 'alumni-config' && <AlumniConfigModule theme={theme} />}
        {activeModule === 'analytics-config' && <AnalyticsBIConfigModule theme={theme} />}
        {activeModule === 'report-engine-config' && <ReportEngineConfigModule theme={theme} />}
        {activeModule === 'api-integration-config' && <APIIntegrationConfigModule theme={theme} />}
        {activeModule === 'branding-config' && <BrandingWhitelabelConfigModule theme={theme} />}
        {activeModule === 'school-identity-config' && <SchoolIdentityConfigModule theme={theme} />}
        {activeModule === 'support' && <SupportModule theme={theme} role="school-super-admin" />}
      </div>
    </div>
  );
}

// ─── DASHBOARD HOME ────────────────────────────────
function SSADashboardHome({ theme, onNavigate }: { theme: Theme; onNavigate: (moduleId: string) => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${theme.highlight}`}>School Super Admin</h1>
          <p className={`text-xs ${theme.iconColor}`}>Deep module configuration &mdash; all changes are audit-logged</p>
        </div>
      </div>

      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex items-start gap-3">
        <ShieldCheck size={20} className="text-amber-500 mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-bold text-amber-800">All Actions Are Immutably Logged</p>
          <p className="text-xs text-amber-700 mt-1">Every configuration change you make is recorded with timestamp, before/after values, and your IP address. Audit logs are stored in Saaras-controlled storage and cannot be modified or deleted by anyone at the school level.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard icon={Settings} label="Modules Configured" value="18 / 27" color="bg-indigo-500" theme={theme} />
        <StatCard icon={CheckCircle} label="Config Complete" value="67%" color="bg-emerald-500" theme={theme} />
        <StatCard icon={Clock} label="Last Change" value="2 hrs ago" color="bg-blue-500" theme={theme} />
        <StatCard icon={AlertTriangle} label="Pending Setup" value="9" color="bg-amber-500" theme={theme} />
        <StatCard icon={Lock} label="Critical Locks Active" value="6" color="bg-rose-500" theme={theme} />
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Module Configuration Status</h3>
        <p className={`text-[10px] ${theme.iconColor} mb-3`}>Click any card to open that module's configuration</p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { name: 'Fee Structure', status: 'complete', items: '8 fee heads, 5 class groups', icon: Banknote, moduleId: 'fee-config' },
            { name: 'Academic Calendar', status: 'complete', items: 'Holidays, exam dates set', icon: Calendar, moduleId: 'academic-config' },
            { name: 'HR & Payroll', status: 'partial', items: '11 depts, payroll pending', icon: Briefcase, moduleId: 'hr-config' },
            { name: 'Transport Routes', status: 'pending', items: 'Not yet configured', icon: Bus, moduleId: 'transport-config' },
            { name: 'Attendance Rules', status: 'complete', items: 'Daily marking, bio + app', icon: ClipboardCheck, moduleId: 'attendance-config' },
            { name: 'Exam & Report Cards', status: 'partial', items: 'Schedule done, templates pending', icon: FileText, moduleId: 'exam-config' },
            { name: 'Leave Policy', status: 'complete', items: '6 types, approval chain set', icon: Clock, moduleId: 'leave-config' },
            { name: 'Timetable & Bell', status: 'pending', items: 'Not yet configured', icon: Calendar, moduleId: 'timetable-config' },
            { name: 'Communication Rules', status: 'complete', items: 'DM rules, groups configured', icon: MessageSquare, moduleId: 'communication-config' },
            { name: 'Visitor Policy', status: 'partial', items: 'Check-in done, pickup pending', icon: Shield, moduleId: 'visitor-config' },
            { name: 'Certificates', status: 'pending', items: 'Templates not uploaded', icon: Award, moduleId: 'certificate-config' },
            { name: 'Data Migration', status: 'pending', items: 'No data imported yet', icon: Upload, moduleId: 'data-migration' },
          ].map(mod => (
            <button key={mod.name} onClick={() => onNavigate(mod.moduleId)}
              className={`p-3 rounded-xl ${theme.secondaryBg} flex items-start gap-2 text-left w-full hover:ring-2 hover:ring-offset-1 transition-all group ${
                mod.status === 'complete' ? 'hover:ring-emerald-400' :
                mod.status === 'partial' ? 'hover:ring-amber-400' : 'hover:ring-slate-300'
              }`}>
              <mod.icon size={14} className={
                mod.status === 'complete' ? 'text-emerald-500 mt-0.5 shrink-0' :
                mod.status === 'partial' ? 'text-amber-500 mt-0.5 shrink-0' : 'text-slate-400 mt-0.5 shrink-0'
              } />
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-bold ${theme.highlight}`}>{mod.name}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{mod.items}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded inline-block font-bold ${
                    mod.status === 'complete' ? 'bg-emerald-100 text-emerald-700' :
                    mod.status === 'partial' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {mod.status === 'complete' ? 'COMPLETE' : mod.status === 'partial' ? 'IN PROGRESS' : 'NOT STARTED'}
                  </span>
                  <span className={`text-[9px] ${theme.iconColor} opacity-0 group-hover:opacity-100 transition-opacity`}>Configure →</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Recent Configuration Changes</h3>
        <div className="space-y-2">
          {[
            { action: 'Updated fee structure for Class 9-10', time: '2 hours ago', module: 'Fees' },
            { action: 'Added 3 new bus routes (Route D, E, F)', time: '5 hours ago', module: 'Transport' },
            { action: 'Modified leave approval chain', time: '1 day ago', module: 'Leave' },
            { action: 'Uploaded report card template', time: '1 day ago', module: 'Exams' },
            { action: 'Set DM permissions for Parent to Teacher', time: '2 days ago', module: 'Chat' },
          ].map((activity, i) => (
            <div key={i} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs ${theme.highlight}`}>{activity.action}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{activity.time}</p>
              </div>
              <span className={`text-[9px] px-2 py-0.5 rounded-lg ${theme.accentBg} ${theme.iconColor} font-bold`}>{activity.module}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── FEE CONFIGURATION MODULE ──────────────────────
function FeeConfigModule({ theme }: { theme: Theme }) {
  const [feeTemplate, setFeeTemplate] = useState('component-based');
  const [feeHeads, setFeeHeads] = useState<Record<string, boolean>>({
    'Tuition Fee': true, 'Admission Fee': true, 'Annual Charges': true, 'Transport Fee': true,
    'Activity Fee': true, 'Lab Fee': true, 'Library Fee': false, 'Exam Fee': true,
    'Development Fund': false, 'Smart Class / IT Fee': false, 'Uniform / Books': false, 'Hostel Fee': false,
  });
  const [feeFrequency, setFeeFrequency] = useState<Record<string, string>>({
    'Tuition Fee': 'Monthly', 'Admission Fee': 'One-time', 'Annual Charges': 'Yearly',
    'Transport Fee': 'Monthly', 'Activity Fee': 'Quarterly', 'Lab Fee': 'Yearly', 'Exam Fee': 'Term-wise',
  });
  const classGroups = ['Pre-Primary (NUR-KG)', 'Primary (1-5)', 'Middle (6-8)', 'Secondary (9-10)', 'Senior (11-12)'];
  const [classAmounts, setClassAmounts] = useState<Record<string, Record<string, string>>>({
    'Pre-Primary (NUR-KG)': { 'Tuition Fee': '3000', 'Admission Fee': '15000', 'Annual Charges': '8000', 'Transport Fee': '2000', 'Activity Fee': '1500', 'Lab Fee': '0', 'Exam Fee': '1000' },
    'Primary (1-5)': { 'Tuition Fee': '3500', 'Admission Fee': '18000', 'Annual Charges': '10000', 'Transport Fee': '2000', 'Activity Fee': '2000', 'Lab Fee': '1000', 'Exam Fee': '1200' },
    'Middle (6-8)': { 'Tuition Fee': '4500', 'Admission Fee': '20000', 'Annual Charges': '12000', 'Transport Fee': '2500', 'Activity Fee': '2500', 'Lab Fee': '2000', 'Exam Fee': '1500' },
    'Secondary (9-10)': { 'Tuition Fee': '5500', 'Admission Fee': '25000', 'Annual Charges': '15000', 'Transport Fee': '2500', 'Activity Fee': '3000', 'Lab Fee': '3000', 'Exam Fee': '2000' },
    'Senior (11-12)': { 'Tuition Fee': '7000', 'Admission Fee': '30000', 'Annual Charges': '18000', 'Transport Fee': '3000', 'Activity Fee': '3500', 'Lab Fee': '5000', 'Exam Fee': '2500' },
  });
  const [paymentModes, setPaymentModes] = useState<Record<string, boolean>>({ UPI: true, 'Net Banking': true, 'Credit Card': true, 'Debit Card': true, Cash: true, Cheque: true, 'DD/NEFT': true });
  const [lateFeeEnabled, setLateFeeEnabled] = useState(true);
  const [lateFeeAmount, setLateFeeAmount] = useState('50');
  const [lateFeeGrace, setLateFeeGrace] = useState('7');
  const [lateFeeMethod, setLateFeeMethod] = useState('per-day');
  const [lateFeeMax, setLateFeeMax] = useState('500');
  const [billingCycle, setBillingCycle] = useState('Monthly');
  const [dueDate, setDueDate] = useState('10');
  const [concessions, setConcessions] = useState([
    { type: 'Sibling Discount', method: 'percentage', value: '10' },
    { type: 'Staff Child', method: 'percentage', value: '100' },
    { type: 'Merit Scholarship', method: 'percentage', value: '25' },
    { type: 'EWS Quota', method: 'percentage', value: '100' },
    { type: 'Single Parent', method: 'fixed', value: '5000' },
  ]);
  const [concessionApprovalRequired, setConcessionApprovalRequired] = useState(true);
  const [concessionApprovalChain] = useState(['Accounts Officer', 'Principal', 'Trust / Management']);
  const [maxConcessionWithoutApproval, setMaxConcessionWithoutApproval] = useState('5000');
  const [blockRules, setBlockRules] = useState<Record<string, boolean>>({
    'Block report card if fees overdue > 60 days': true,
    'Block TC generation if outstanding > 0': true,
    'Block exam hall ticket if current term unpaid': false,
    'Send auto-reminder before blocking': true,
  });
  const [reminders] = useState([
    { timing: '7 days before due', channel: 'Push + SMS', enabled: true },
    { timing: '3 days before due', channel: 'Push', enabled: true },
    { timing: '1 day before due', channel: 'Push + SMS', enabled: true },
    { timing: '1 day after due', channel: 'Push + SMS + Email', enabled: true },
    { timing: '7 days after due', channel: 'Push + SMS', enabled: true },
    { timing: '15 days after due', channel: 'Push + SMS + Call', enabled: true },
    { timing: '30 days after due', channel: 'Push + SMS + Email + Call', enabled: true },
  ]);

  const activeHeads = Object.entries(feeHeads).filter(([, v]) => v).map(([k]) => k);
  const frequencies = ['Monthly', 'Quarterly', 'Term-wise', 'Half-yearly', 'Yearly', 'One-time'];

  return (
    <div className="space-y-4">
      <ModuleHeader title="Fee Configuration" subtitle="Configure fee structure, class-wise amounts, payment rules, and concessions" theme={theme} />

      {/* Critical Lock Banner for Fee Module */}
      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3 flex items-center gap-3">
        <Lock size={14} className="text-rose-500 shrink-0" />
        <p className="text-xs text-rose-700"><strong>Fee Structure Changes</strong> is a locked field. Editing fee heads or amounts will require OTP verification from the registered Trustee.</p>
      </div>

      <div className="relative">
        <span className="absolute -top-1 right-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-100 border border-rose-300 text-[9px] font-bold text-rose-700">
          <Lock size={9} /> LOCKED
        </span>
        <SectionCard title="Fee Template" subtitle="Choose how fees are structured for your school" theme={theme}>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'simple-annual', name: 'Simple Annual', desc: 'One lump-sum fee per year per class' },
            { id: 'component-based', name: 'Component-Based', desc: 'Multiple fee heads with individual amounts' },
            { id: 'term-wise', name: 'Term-Wise', desc: 'Split by terms (Term 1, Term 2, etc.)' },
          ].map(t => (
            <button key={t.id} onClick={() => setFeeTemplate(t.id)}
              className={`p-3 rounded-xl text-left border-2 transition-all ${feeTemplate === t.id ? `${theme.primary} text-white border-transparent` : `${theme.secondaryBg} ${theme.border} ${theme.highlight}`}`}>
              <p className="text-xs font-bold">{t.name}</p>
              <p className={`text-[10px] mt-1 ${feeTemplate === t.id ? 'text-white/80' : theme.iconColor}`}>{t.desc}</p>
            </button>
          ))}
        </div>
      </SectionCard>
      </div>

      <SectionCard title="Fee Heads" subtitle="Toggle fee components on/off and set frequency" theme={theme}>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
          {Object.entries(feeHeads).map(([head, enabled]) => (
            <div key={head} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <SSAToggle on={enabled} onChange={() => setFeeHeads(p => ({ ...p, [head]: !p[head] }))} theme={theme} />
                <span className={`text-xs font-medium ${theme.highlight} truncate`}>{head}</span>
              </div>
              {enabled && (
                <select value={feeFrequency[head] || 'Yearly'} onChange={e => setFeeFrequency(p => ({ ...p, [head]: e.target.value }))}
                  className={`text-[10px] px-1.5 py-0.5 rounded-lg border ${theme.border} ${theme.inputBg} ${theme.highlight} ml-2`}>
                  {frequencies.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              )}
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="relative">
        <span className="absolute -top-1 right-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-100 border border-rose-300 text-[9px] font-bold text-rose-700">
          <Lock size={9} /> LOCKED
        </span>
        <SectionCard title="Class-wise Fee Amounts" subtitle="Set amounts per class group for each active fee head (values in INR)" theme={theme}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className={theme.secondaryBg}>
                <th className={`text-left px-3 py-2 font-bold ${theme.iconColor} sticky left-0 ${theme.secondaryBg}`}>Class Group</th>
                {activeHeads.map(h => (
                  <th key={h} className={`text-center px-2 py-2 font-bold ${theme.iconColor} whitespace-nowrap`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {classGroups.map(cg => (
                <tr key={cg} className={`border-t ${theme.border}`}>
                  <td className={`px-3 py-2 font-bold ${theme.highlight} sticky left-0 ${theme.cardBg} whitespace-nowrap`}>{cg}</td>
                  {activeHeads.map(h => (
                    <td key={h} className="px-2 py-1.5">
                      <div className="flex items-center gap-0.5">
                        <span className={`text-[10px] ${theme.iconColor}`}>{'\u20B9'}</span>
                        <input type="text" value={classAmounts[cg]?.[h] || ''}
                          onChange={e => setClassAmounts(p => ({ ...p, [cg]: { ...p[cg], [h]: e.target.value } }))}
                          className={`w-16 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none focus:ring-1 focus:ring-slate-300`} />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Payment Configuration" subtitle="Modes, billing cycle, and due dates" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Accepted Payment Modes</p>
              <div className="grid grid-cols-2 gap-1.5">
                {Object.entries(paymentModes).map(([mode, enabled]) => (
                  <div key={mode} className={`flex items-center gap-2 p-2 rounded-lg ${theme.secondaryBg}`}>
                    <SSAToggle on={enabled} onChange={() => setPaymentModes(p => ({ ...p, [mode]: !p[mode] }))} theme={theme} />
                    <div>
                      <p className={`text-xs font-bold ${theme.highlight}`}>{mode}</p>
                      <p className={`text-[9px] ${theme.iconColor}`}>{
                        ({
                          'UPI': 'Google Pay, PhonePe, Paytm etc.',
                          'Net Banking': 'Direct bank transfer via internet banking',
                          'Credit Card': 'Visa, Mastercard credit cards',
                          'Debit Card': 'Bank debit/ATM cards',
                          'Cash': 'Cash payment at school counter',
                          'Cheque': 'Bank cheque/demand draft',
                          'DD/NEFT': 'Bank wire transfer (NEFT/RTGS/IMPS)',
                        } as Record<string, string>)[mode]
                      }</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Billing Cycle</p>
                <SelectField options={['Monthly', 'Quarterly', 'Term-wise', 'Half-yearly', 'Yearly']} value={billingCycle} onChange={setBillingCycle} theme={theme} />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Due Date (day of month)</p>
                <InputField value={dueDate} onChange={setDueDate} theme={theme} type="number" />
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Late Fee Rules" subtitle="Penalties for overdue payments" theme={theme}>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <span className={`text-xs font-bold ${theme.highlight}`}>Enable Late Fee</span>
              <SSAToggle on={lateFeeEnabled} onChange={() => setLateFeeEnabled(!lateFeeEnabled)} theme={theme} />
            </div>
            {lateFeeEnabled && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Amount ({'\u20B9'})</p>
                  <InputField value={lateFeeAmount} onChange={setLateFeeAmount} theme={theme} type="number" />
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Grace Period (days)</p>
                  <InputField value={lateFeeGrace} onChange={setLateFeeGrace} theme={theme} type="number" />
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Calculation</p>
                  <SelectField options={['per-day', 'per-week', 'flat']} value={lateFeeMethod} onChange={setLateFeeMethod} theme={theme} />
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max Late Fee ({'\u20B9'})</p>
                  <InputField value={lateFeeMax} onChange={setLateFeeMax} theme={theme} type="number" />
                </div>
              </div>
            )}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Concession Configuration" subtitle="Discount types with percentage or fixed amounts" theme={theme}>
        <div className="space-y-2">
          {concessions.map((c, i) => (
            <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <input value={c.type} onChange={e => { const n = [...concessions]; n[i] = { ...n[i], type: e.target.value }; setConcessions(n); }}
                className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
              <select value={c.method} onChange={e => { const n = [...concessions]; n[i] = { ...n[i], method: e.target.value }; setConcessions(n); }}
                className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                <option value="percentage">%</option>
                <option value="fixed">{'\u20B9'} Fixed</option>
              </select>
              <input value={c.value} onChange={e => { const n = [...concessions]; n[i] = { ...n[i], value: e.target.value }; setConcessions(n); }}
                className={`w-20 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
              <button onClick={() => setConcessions(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={14} /></button>
            </div>
          ))}
          <button onClick={() => setConcessions(p => [...p, { type: '', method: 'percentage', value: '0' }])}
            className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
            <Plus size={12} /> Add Concession
          </button>
        </div>
      </SectionCard>

      <SectionCard title="Concession Approval Workflow" subtitle="Require approval before applying fee concessions" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Concession Approval Required</p>
              <p className={`text-[10px] ${theme.iconColor}`}>All concessions must go through approval chain</p>
            </div>
            <SSAToggle on={concessionApprovalRequired} onChange={() => setConcessionApprovalRequired(!concessionApprovalRequired)} theme={theme} />
          </div>
          {concessionApprovalRequired && (
            <>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Approval Chain</p>
                <div className="space-y-1.5">
                  {concessionApprovalChain.map((step, i) => (
                    <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${theme.secondaryBg}`}>
                      <span className={`text-[10px] w-6 h-6 rounded-full ${theme.primary} text-white flex items-center justify-center font-bold shrink-0`}>{i + 1}</span>
                      <span className={`text-xs font-bold ${theme.highlight} flex-1`}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max Concession Without Approval ({'\u20B9'})</p>
                <InputField value={maxConcessionWithoutApproval} onChange={setMaxConcessionWithoutApproval} theme={theme} type="number" placeholder="e.g. 5000" />
                <p className={`text-[10px] ${theme.iconColor} mt-1`}>Concessions below this amount are auto-approved</p>
              </div>
            </>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Fee Defaulter Blocking Rules" subtitle="Restrict access to services when fees are overdue" theme={theme}>
        <div className="space-y-2">
          {Object.entries(blockRules).map(([rule, enabled]) => (
            <div key={rule} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>{rule}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{
                  ({
                    'Block report card if fees overdue > 60 days': 'Report card download/view is blocked if any fee is unpaid for more than 60 days',
                    'Block TC generation if outstanding > 0': 'Transfer Certificate cannot be generated until all outstanding dues are cleared',
                    'Block exam hall ticket if current term unpaid': 'Student cannot receive hall ticket for exams if current term fees are unpaid',
                    'Send auto-reminder before blocking': 'System sends an automatic warning to parents before any blocking action takes effect',
                  } as Record<string, string>)[rule]
                }</p>
              </div>
              <SSAToggle on={enabled} onChange={() => setBlockRules(p => ({ ...p, [rule]: !p[rule] }))} theme={theme} />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Fee Reminder Schedule" subtitle="Automated reminders before and after due date" theme={theme}>
        <div className="space-y-1.5">
          {reminders.map((r, i) => (
            <div key={i} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold ${theme.highlight}`}>{r.timing}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-lg ${theme.accentBg} ${theme.iconColor}`}>{r.channel}</span>
              </div>
              <div className={`w-2 h-2 rounded-full ${r.enabled ? 'bg-emerald-500' : 'bg-slate-300'}`} />
            </div>
          ))}
        </div>
      </SectionCard>

    </div>
  );
}

// ─── ACADEMIC CONFIG MODULE ────────────────────────
function AcademicConfigModule({ theme }: { theme: Theme }) {
  const [preschoolEnabled, setPreschoolEnabled] = useState(true);
  const allGrades = preschoolEnabled
    ? ['Nursery', 'Jr. KG', 'Sr. KG', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']
    : ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
  const [subjects, setSubjects] = useState<Record<string, string[]>>({
    'Nursery': ['English', 'Hindi', 'EVS', 'Art', 'Music', 'Physical Ed.'],
    'Jr. KG': ['English', 'Hindi', 'Mathematics', 'EVS', 'Art', 'Music', 'Physical Ed.'],
    'Sr. KG': ['English', 'Hindi', 'Mathematics', 'EVS', 'Art', 'Computer', 'Physical Ed.'],
    'Grade 1': ['English', 'Hindi', 'Mathematics', 'EVS', 'Computer', 'Art', 'Physical Ed.'],
    'Grade 2': ['English', 'Hindi', 'Mathematics', 'EVS', 'Computer', 'Art', 'Physical Ed.'],
    'Grade 3': ['English', 'Hindi', 'Mathematics', 'EVS', 'Computer', 'Art', 'Physical Ed.'],
    'Grade 4': ['English', 'Hindi', 'Mathematics', 'EVS', 'Computer', 'Art', 'Physical Ed.'],
    'Grade 5': ['English', 'Hindi', 'Mathematics', 'EVS', 'Computer', 'Art', 'Physical Ed.'],
    'Grade 6': ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Sanskrit', 'Computer', 'Art', 'Physical Ed.'],
    'Grade 7': ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Sanskrit', 'Computer', 'Art', 'Physical Ed.'],
    'Grade 8': ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Sanskrit', 'Computer', 'Art', 'Physical Ed.'],
    'Grade 9': ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'IT', 'Physical Ed.'],
    'Grade 10': ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'IT', 'Physical Ed.'],
    'Grade 11': ['English', 'Physics', 'Chemistry', 'Mathematics', 'Biology/CS', 'Physical Ed.'],
    'Grade 12': ['English', 'Physics', 'Chemistry', 'Mathematics', 'Biology/CS', 'Physical Ed.'],
  });
  const [newSubject, setNewSubject] = useState('');
  const [activeGrade, setActiveGrade] = useState('Grade 1');
  // Global section names defined once, applied per grade
  const [globalSectionNames, setGlobalSectionNames] = useState(['A', 'B', 'C', 'D', 'E']);
  const [newSectionName, setNewSectionName] = useState('');
  const [sections, setSections] = useState<Record<string, string[]>>({
    'Nursery': ['A'], 'Jr. KG': ['A'], 'Sr. KG': ['A'],
    'Grade 1': ['A', 'B', 'C'], 'Grade 2': ['A', 'B', 'C'], 'Grade 3': ['A', 'B'],
    'Grade 4': ['A', 'B'], 'Grade 5': ['A', 'B'], 'Grade 6': ['A', 'B', 'C'],
    'Grade 7': ['A', 'B', 'C'], 'Grade 8': ['A', 'B'], 'Grade 9': ['A', 'B', 'C'],
    'Grade 10': ['A', 'B', 'C'], 'Grade 11': ['A', 'B'], 'Grade 12': ['A', 'B'],
  });
  // Compute master subject pool from all grades
  const allSubjectsPool = Array.from(new Set(Object.values(subjects).flat())).sort();
  const [preschoolGroups, setPreschoolGroups] = useState([
    { ageLevel: 'Nursery (2-3 yrs)', groupName: 'Butterflies', maxChildren: '20' },
    { ageLevel: 'Jr. KG (3-4 yrs)', groupName: 'Sunshine', maxChildren: '22' },
    { ageLevel: 'Sr. KG (4-5 yrs)', groupName: 'Explorers', maxChildren: '25' },
  ]);
  const [houses, setHouses] = useState([
    { name: 'Red House', color: 'bg-red-500', captain: 'Aarav Sharma', mascot: 'Phoenix' },
    { name: 'Blue House', color: 'bg-blue-500', captain: 'Priya Patel', mascot: 'Dolphin' },
    { name: 'Green House', color: 'bg-emerald-500', captain: 'Rohan Kumar', mascot: 'Eagle' },
    { name: 'Yellow House', color: 'bg-amber-500', captain: 'Ananya Singh', mascot: 'Tiger' },
  ]);
  const houseColorOptions = [
    { label: 'Red', value: 'bg-red-500' },
    { label: 'Blue', value: 'bg-blue-500' },
    { label: 'Green', value: 'bg-emerald-500' },
    { label: 'Yellow', value: 'bg-amber-500' },
    { label: 'Purple', value: 'bg-purple-500' },
    { label: 'Orange', value: 'bg-orange-500' },
    { label: 'Pink', value: 'bg-pink-500' },
    { label: 'Teal', value: 'bg-teal-500' },
    { label: 'Indigo', value: 'bg-indigo-500' },
    { label: 'Cyan', value: 'bg-cyan-500' },
  ];
  const [holidays, setHolidays] = useState([
    { startDate: '2026-01-26', endDate: '2026-01-26', name: 'Republic Day', type: 'National' },
    { startDate: '2026-03-14', endDate: '2026-03-14', name: 'Holi', type: 'Festival' },
    { startDate: '2026-08-15', endDate: '2026-08-15', name: 'Independence Day', type: 'National' },
    { startDate: '2026-10-02', endDate: '2026-10-02', name: 'Gandhi Jayanti', type: 'National' },
    { startDate: '2026-10-20', endDate: '2026-10-25', name: 'Diwali Vacation', type: 'Festival' },
    { startDate: '2026-12-25', endDate: '2027-01-02', name: 'Christmas & New Year Vacation', type: 'Festival' },
    { startDate: '2026-05-01', endDate: '2026-06-15', name: 'Summer Vacation', type: 'School' },
  ]);
  const [academicYear, setAcademicYear] = useState({ start: '2025-04-01', end: '2026-03-31' });

  return (
    <div className="space-y-4">
      <ModuleHeader title="Academic Configuration" subtitle="Subjects, sections, houses, holidays, and academic calendar" theme={theme} />

      <SectionCard title="Academic Year" subtitle="Set start and end dates" theme={theme}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Start Date</p>
            <InputField value={academicYear.start} onChange={v => setAcademicYear(p => ({ ...p, start: v }))} theme={theme} type="date" />
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>End Date</p>
            <InputField value={academicYear.end} onChange={v => setAcademicYear(p => ({ ...p, end: v }))} theme={theme} type="date" />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Subject Master List" subtitle="Add subjects per grade — subjects from other grades appear as quick-add suggestions" theme={theme}>
        {/* Preschool toggle */}
        <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg} mb-3`}>
          <div>
            <p className={`text-xs font-bold ${theme.highlight}`}>Preschool Wing</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Show Nursery, Jr. KG, Sr. KG grades</p>
          </div>
          <SSAToggle on={preschoolEnabled} onChange={() => { setPreschoolEnabled(!preschoolEnabled); if (preschoolEnabled && ['Nursery','Jr. KG','Sr. KG'].includes(activeGrade)) setActiveGrade('Grade 1'); }} theme={theme} />
        </div>
        {/* Grade tab bar — scrollable */}
        <div className="flex gap-1.5 mb-3 flex-wrap">
          {allGrades.map(g => (
            <button key={g} onClick={() => setActiveGrade(g)}
              className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all whitespace-nowrap ${activeGrade === g ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.highlight}`}`}>
              {g}
            </button>
          ))}
        </div>
        {/* Subjects for selected grade */}
        <div className={`p-3 rounded-xl ${theme.secondaryBg} mb-3`}>
          <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Subjects — {activeGrade}</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {(subjects[activeGrade] || []).map(s => (
              <span key={s} className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${theme.cardBg} border ${theme.border} text-xs font-medium ${theme.highlight}`}>
                {s}
                <button onClick={() => setSubjects(p => ({ ...p, [activeGrade]: (p[activeGrade] || []).filter(x => x !== s) }))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2 mb-2">
            <input value={newSubject} onChange={e => setNewSubject(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && newSubject.trim()) { setSubjects(p => ({ ...p, [activeGrade]: [...(p[activeGrade] || []), newSubject.trim()] })); setNewSubject(''); } }}
              placeholder="Type new subject or click from pool below..."
              className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
            <button onClick={() => { if (newSubject.trim()) { setSubjects(p => ({ ...p, [activeGrade]: [...(p[activeGrade] || []), newSubject.trim()] })); setNewSubject(''); } }}
              className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={14} /></button>
          </div>
          {/* Subject pool — quick-add from other grades */}
          {(() => {
            const currentSubs = subjects[activeGrade] || [];
            const available = allSubjectsPool.filter(s => !currentSubs.includes(s));
            if (available.length === 0) return null;
            return (
              <div>
                <p className={`text-[9px] font-bold ${theme.iconColor} mb-1.5 uppercase tracking-wide`}>Quick-add from subject pool (used in other grades)</p>
                <div className="flex flex-wrap gap-1">
                  {available.map(s => (
                    <button key={s} onClick={() => setSubjects(p => ({ ...p, [activeGrade]: [...(p[activeGrade] || []), s] }))}
                      className={`px-2 py-0.5 rounded-lg border border-dashed ${theme.border} text-[10px] ${theme.iconColor} hover:${theme.primary} hover:text-white transition-all`}>
                      + {s}
                    </button>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </SectionCard>

      <SectionCard title="Section Configuration" subtitle="Define section names once (school-wide), then assign per grade" theme={theme}>
        {/* Global section names */}
        <div className={`p-3 rounded-xl ${theme.accentBg} border ${theme.border} mb-4`}>
          <p className={`text-[10px] font-bold ${theme.iconColor} mb-2 uppercase tracking-wide`}>School-wide Section Names (defined once, used across all grades)</p>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {globalSectionNames.map((name, i) => (
              <span key={i} className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${theme.cardBg} border ${theme.border} text-xs font-bold ${theme.highlight}`}>
                <input value={name} onChange={e => { const n = [...globalSectionNames]; n[i] = e.target.value; setGlobalSectionNames(n); }}
                  className={`w-16 bg-transparent text-xs font-bold ${theme.highlight} outline-none text-center`} placeholder="Name" />
                <button onClick={() => {
                  const removed = globalSectionNames[i];
                  setGlobalSectionNames(p => p.filter((_, j) => j !== i));
                  setSections(p => {
                    const updated = { ...p };
                    for (const grade of Object.keys(updated)) { updated[grade] = updated[grade].filter(s => s !== removed); }
                    return updated;
                  });
                }} className="text-red-400 hover:text-red-600"><X size={10} /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={newSectionName} onChange={e => setNewSectionName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && newSectionName.trim()) { setGlobalSectionNames(p => [...p, newSectionName.trim()]); setNewSectionName(''); } }}
              placeholder="Add section name (e.g. F, Rose, Lily)..."
              className={`flex-1 px-3 py-1.5 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
            <button onClick={() => { if (newSectionName.trim()) { setGlobalSectionNames(p => [...p, newSectionName.trim()]); setNewSectionName(''); } }}
              className={`px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={12} /></button>
          </div>
        </div>

        {/* Per-grade section assignment */}
        <p className={`text-[10px] font-bold ${theme.iconColor} mb-2 uppercase tracking-wide`}>Assign sections per grade (toggle which sections are active)</p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
          {allGrades.map(grade => {
            const gradeSecs = sections[grade] || [];
            return (
              <div key={grade} className={`p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex items-center justify-between mb-1.5">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{grade}</p>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded ${theme.accentBg} ${theme.iconColor} font-bold`}>
                    {gradeSecs.length} {gradeSecs.length === 1 ? 'section' : 'sections'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {globalSectionNames.map(name => {
                    const isActive = gradeSecs.includes(name);
                    return (
                      <button key={name} onClick={() => {
                        setSections(p => ({
                          ...p,
                          [grade]: isActive ? (p[grade] || []).filter(s => s !== name) : [...(p[grade] || []), name],
                        }));
                      }}
                        className={`text-[10px] px-2 py-1 rounded-lg font-bold transition-all ${
                          isActive ? `${theme.primary} text-white` : `${theme.cardBg} border ${theme.border} ${theme.iconColor}`
                        }`}>
                        {name}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>

      <SectionCard title="House System" subtitle="School houses for inter-house activities — add, edit, or delete houses freely" theme={theme}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
          {houses.map((h, i) => (
            <div key={i} className={`p-3 rounded-xl ${theme.secondaryBg} relative`}>
              {/* Delete button */}
              <button
                onClick={() => setHouses(p => p.filter((_, idx) => idx !== i))}
                className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 text-red-500 hover:text-red-700 transition-colors">
                <X size={10} />
              </button>
              {/* Color swatch + name */}
              <div className="flex items-center gap-2 mb-2 pr-5">
                <div className={`w-7 h-7 rounded-lg ${h.color} shrink-0`} />
                <input
                  value={h.name}
                  onChange={e => { const n = [...houses]; n[i] = { ...n[i], name: e.target.value }; setHouses(n); }}
                  className={`flex-1 min-w-0 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`}
                  placeholder="House name" />
              </div>
              {/* Color picker */}
              <div className="mb-2">
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Color</p>
                <select
                  value={h.color}
                  onChange={e => { const n = [...houses]; n[i] = { ...n[i], color: e.target.value }; setHouses(n); }}
                  className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}>
                  {houseColorOptions.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              {/* Mascot */}
              <div className="mb-2">
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Mascot</p>
                <input
                  value={h.mascot}
                  onChange={e => { const n = [...houses]; n[i] = { ...n[i], mascot: e.target.value }; setHouses(n); }}
                  className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}
                  placeholder="e.g. Phoenix" />
              </div>
              {/* Captain */}
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Captain</p>
                <input
                  value={h.captain}
                  onChange={e => { const n = [...houses]; n[i] = { ...n[i], captain: e.target.value }; setHouses(n); }}
                  className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}
                  placeholder="Captain name" />
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setHouses(p => [...p, { name: 'New House', color: 'bg-indigo-500', captain: '', mascot: '' }])}
          className={`flex items-center gap-1.5 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl border ${theme.border}`}>
          <Plus size={12} /> Add House
        </button>
      </SectionCard>

      <SectionCard title="Preschool Groups" subtitle="Age-based group names and capacity (for preschool wings)" theme={theme}>
        <div className="space-y-2">
          {preschoolGroups.map((g, i) => (
            <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="w-32 shrink-0">
                <p className={`text-[10px] ${theme.iconColor} mb-0.5`}>Age Level</p>
                <input value={g.ageLevel} onChange={e => { const n = [...preschoolGroups]; n[i] = { ...n[i], ageLevel: e.target.value }; setPreschoolGroups(n); }}
                  className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} placeholder="e.g. Nursery (2-3 yrs)" />
              </div>
              <div className="flex-1">
                <p className={`text-[10px] ${theme.iconColor} mb-0.5`}>Group Name</p>
                <input value={g.groupName} onChange={e => { const n = [...preschoolGroups]; n[i] = { ...n[i], groupName: e.target.value }; setPreschoolGroups(n); }}
                  className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}
                  placeholder="e.g. Butterflies" />
              </div>
              <div className="w-24">
                <p className={`text-[10px] ${theme.iconColor} mb-0.5`}>Max Children</p>
                <input type="number" value={g.maxChildren} onChange={e => { const n = [...preschoolGroups]; n[i] = { ...n[i], maxChildren: e.target.value }; setPreschoolGroups(n); }}
                  className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
              </div>
              <button onClick={() => setPreschoolGroups(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600 mt-4"><X size={12} /></button>
            </div>
          ))}
          <button onClick={() => setPreschoolGroups(p => [...p, { ageLevel: '', groupName: '', maxChildren: '20' }])}
            className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
            <Plus size={12} /> Add Group
          </button>
        </div>
      </SectionCard>

      <SectionCard title="Holiday Calendar" subtitle="School holidays, vacations & observances — supports single-day holidays and multi-day vacation ranges" theme={theme}>
        <div className="space-y-1.5">
          {holidays.map((h, i) => {
            const isRange = h.startDate !== h.endDate;
            return (
            <div key={i} className={`flex items-center gap-2 p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex items-center gap-1">
                <input type="date" value={h.startDate} onChange={e => { const n = [...holidays]; n[i] = { ...n[i], startDate: e.target.value }; setHolidays(n); }}
                  className={`w-[120px] px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[11px] font-bold ${theme.highlight} outline-none`} />
                <span className={`text-[10px] ${theme.iconColor}`}>to</span>
                <input type="date" value={h.endDate} onChange={e => { const n = [...holidays]; n[i] = { ...n[i], endDate: e.target.value }; setHolidays(n); }}
                  className={`w-[120px] px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[11px] font-bold ${theme.highlight} outline-none`} />
              </div>
              {isRange && <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${theme.primary} text-white`}>
                {Math.ceil((new Date(h.endDate).getTime() - new Date(h.startDate).getTime()) / 86400000) + 1}d
              </span>}
              <input value={h.name} onChange={e => { const n = [...holidays]; n[i] = { ...n[i], name: e.target.value }; setHolidays(n); }}
                className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} placeholder="Holiday / Vacation name" />
              <select value={h.type} onChange={e => { const n = [...holidays]; n[i] = { ...n[i], type: e.target.value }; setHolidays(n); }}
                className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] font-bold ${theme.highlight}`}>
                <option value="National">National</option>
                <option value="Festival">Festival</option>
                <option value="School">School</option>
                <option value="Vacation">Vacation</option>
                <option value="Other">Other</option>
              </select>
              <button onClick={() => setHolidays(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={12} /></button>
            </div>
            );
          })}
          <button onClick={() => setHolidays(p => [...p, { startDate: '', endDate: '', name: '', type: 'School' }])}
            className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
            <Plus size={12} /> Add Holiday / Vacation
          </button>
        </div>
      </SectionCard>
    </div>
  );
}

// ─── HR & PAYROLL CONFIG MODULE ────────────────────
function HRConfigModule({ theme }: { theme: Theme }) {
  const [departments, setDepartments] = useState(['Administration', 'Teaching - Primary', 'Teaching - Secondary', 'Teaching - Senior', 'Accounts', 'IT', 'Transport', 'Housekeeping', 'Security', 'Library', 'Lab']);
  const [designations, setDesignations] = useState(['Principal', 'Vice Principal', 'HOD', 'PGT', 'TGT', 'PRT', 'Lab Assistant', 'Librarian', 'Accountant', 'Driver', 'Peon', 'Security Guard']);
  const [newDept, setNewDept] = useState('');
  const [newDesig, setNewDesig] = useState('');
  const [salaryComponents, setSalaryComponents] = useState([
    { name: 'Basic Salary', type: 'earning', percentage: '40%' },
    { name: 'HRA', type: 'earning', percentage: '20%' },
    { name: 'DA', type: 'earning', percentage: '15%' },
    { name: 'Transport Allowance', type: 'earning', percentage: '5%' },
    { name: 'Special Allowance', type: 'earning', percentage: '10%' },
    { name: 'PF (Employee)', type: 'deduction', percentage: '12%' },
    { name: 'ESI', type: 'deduction', percentage: '0.75%' },
    { name: 'Professional Tax', type: 'deduction', percentage: 'Fixed' },
    { name: 'TDS', type: 'deduction', percentage: 'Slab' },
  ]);
  const [payCycle, setPayCycle] = useState('Monthly');
  const [payDay, setPayDay] = useState('Last working day');
  const [staffAttendance, setStaffAttendance] = useState<Record<string, boolean>>({
    'Biometric': true, 'Mobile App': true, 'RFID': false, 'Manual Register': true, 'Geo-fencing': false,
  });
  const [onboardingChecklist, setOnboardingChecklist] = useState([
    'Document verification (Aadhaar, PAN, Degree certificates)',
    'Police verification submission',
    'Bank account details for salary',
    'PF & ESI registration',
    'Photo ID card generation',
    'System login creation',
    'Assign department & reporting manager',
    'Probation period agreement',
  ]);
  const [newChecklistItem, setNewChecklistItem] = useState('');
  const [hrLetters, setHrLetters] = useState(['Offer Letter', 'Appointment Letter', 'Confirmation Letter', 'Experience Letter', 'Relieving Letter', 'Salary Slip', 'Warning Letter', 'Termination Letter']);
  const [newHrLetter, setNewHrLetter] = useState('');
  const [appraisalStages, setAppraisalStages] = useState(['Self Assessment', 'HOD Review', 'Principal Review', 'Management Approval', 'Letter Generation']);

  return (
    <div className="space-y-4">
      <ModuleHeader title="HR & Payroll Configuration" subtitle="Departments, salary structure, pay cycle, attendance, and HR processes" theme={theme} />

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Departments" subtitle="Add or remove departments" theme={theme}>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {departments.map(d => (
              <span key={d} className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${theme.secondaryBg} text-xs font-medium ${theme.highlight}`}>
                {d}
                <button onClick={() => setDepartments(p => p.filter(x => x !== d))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={newDept} onChange={e => setNewDept(e.target.value)} placeholder="Add department..."
              className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
            <button onClick={() => { if (newDept.trim()) { setDepartments(p => [...p, newDept.trim()]); setNewDept(''); } }}
              className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={14} /></button>
          </div>
        </SectionCard>

        <SectionCard title="Designations" subtitle="Add or remove designations" theme={theme}>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {designations.map(d => (
              <span key={d} className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${theme.secondaryBg} text-xs font-medium ${theme.highlight}`}>
                {d}
                <button onClick={() => setDesignations(p => p.filter(x => x !== d))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={newDesig} onChange={e => setNewDesig(e.target.value)} placeholder="Add designation..."
              className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
            <button onClick={() => { if (newDesig.trim()) { setDesignations(p => [...p, newDesig.trim()]); setNewDesig(''); } }}
              className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={14} /></button>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Salary Structure" subtitle="Earning and deduction components — edit name, type, and percentage" theme={theme}>
        <div className="space-y-1.5">
          {salaryComponents.map((c, i) => (
            <div key={i} className={`flex items-center gap-2 p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <select value={c.type} onChange={e => { const n = [...salaryComponents]; n[i] = { ...n[i], type: e.target.value }; setSalaryComponents(n); }}
                className={`text-[9px] px-1.5 py-1 rounded font-bold ${c.type === 'earning' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'} border-0 outline-none`}>
                <option value="earning">EARN</option>
                <option value="deduction">DED</option>
              </select>
              <input value={c.name} onChange={e => { const n = [...salaryComponents]; n[i] = { ...n[i], name: e.target.value }; setSalaryComponents(n); }}
                className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-medium ${theme.highlight} outline-none`} />
              <input value={c.percentage} onChange={e => { const n = [...salaryComponents]; n[i] = { ...n[i], percentage: e.target.value }; setSalaryComponents(n); }}
                className={`w-16 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center font-bold ${theme.iconColor} outline-none`} />
              <button onClick={() => setSalaryComponents(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
            </div>
          ))}
          <button onClick={() => setSalaryComponents(p => [...p, { name: '', type: 'earning', percentage: '' }])}
            className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
            <Plus size={12} /> Add Component
          </button>
        </div>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Pay Cycle" subtitle="Payment schedule and processing" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Cycle</p>
              <SelectField options={['Monthly', 'Bi-weekly', 'Weekly']} value={payCycle} onChange={setPayCycle} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Pay Day</p>
              <SelectField options={['1st of month', '5th of month', '10th of month', 'Last working day']} value={payDay} onChange={setPayDay} theme={theme} />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Staff Attendance Methods" subtitle="How staff check-in/out is recorded daily" theme={theme}>
          <div className="space-y-2">
            {Object.entries(staffAttendance).map(([method, enabled]) => (
              <div key={method} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{method}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Biometric': 'Staff marks attendance via fingerprint or face recognition device at school entrance',
                      'Mobile App': 'Staff checks in/out using the school mobile app with GPS verification',
                      'RFID': 'Staff taps RFID card at entry point — auto-records time of arrival/departure',
                      'Manual Register': 'Traditional sign-in register maintained by admin office',
                      'Geo-fencing': 'Auto-marks attendance when staff\'s phone enters school campus geo-fence',
                    } as Record<string, string>)[method]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setStaffAttendance(p => ({ ...p, [method]: !p[method] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Staff Onboarding Checklist" subtitle="Required steps for new staff — edit or remove items" theme={theme}>
        <div className="space-y-1.5">
          {onboardingChecklist.map((item, i) => (
            <div key={i} className={`flex items-center gap-2 p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <CheckCircle size={14} className="text-emerald-500 shrink-0" />
              <input value={item} onChange={e => { const n = [...onboardingChecklist]; n[i] = e.target.value; setOnboardingChecklist(n); }}
                className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
              <button onClick={() => setOnboardingChecklist(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
            </div>
          ))}
          <div className="flex gap-2">
            <input value={newChecklistItem} onChange={e => setNewChecklistItem(e.target.value)} placeholder="Add checklist item..."
              onKeyDown={e => { if (e.key === 'Enter' && newChecklistItem.trim()) { setOnboardingChecklist(p => [...p, newChecklistItem.trim()]); setNewChecklistItem(''); } }}
              className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
            <button onClick={() => { if (newChecklistItem.trim()) { setOnboardingChecklist(p => [...p, newChecklistItem.trim()]); setNewChecklistItem(''); } }}
              className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={14} /></button>
          </div>
        </div>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="HR Letter Templates" subtitle="Add or remove letter types" theme={theme}>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {hrLetters.map(l => (
              <span key={l} className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${theme.secondaryBg} text-xs font-medium ${theme.highlight}`}>
                {l}
                <button onClick={() => setHrLetters(p => p.filter(x => x !== l))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={newHrLetter} onChange={e => setNewHrLetter(e.target.value)} placeholder="Add letter type..."
              className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
            <button onClick={() => { if (newHrLetter.trim()) { setHrLetters(p => [...p, newHrLetter.trim()]); setNewHrLetter(''); } }}
              className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={14} /></button>
          </div>
        </SectionCard>

        <SectionCard title="Performance Appraisal Stages" subtitle="Multi-level review — edit, reorder, or remove" theme={theme}>
          <div className="space-y-1.5">
            {appraisalStages.map((s, i) => (
              <div key={i} className={`flex items-center gap-2 p-2 rounded-xl ${theme.secondaryBg}`}>
                <span className={`text-[10px] w-5 h-5 rounded-full ${theme.primary} text-white flex items-center justify-center font-bold shrink-0`}>{i + 1}</span>
                <input value={s} onChange={e => { const n = [...appraisalStages]; n[i] = e.target.value; setAppraisalStages(n); }}
                  className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                <button onClick={() => setAppraisalStages(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
              </div>
            ))}
            <button onClick={() => setAppraisalStages(p => [...p, ''])}
              className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
              <Plus size={12} /> Add Stage
            </button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

// ─── TRANSPORT CONFIG MODULE ───────────────────────
function TransportConfigModule({ theme }: { theme: Theme }) {
  const [routes, setRoutes] = useState([
    { name: 'Route A', stops: '8', capacity: '40', morning: '7:00 AM', evening: '3:30 PM', driver: 'Ramesh Kumar', vehicle: 'GJ-01-AB-1234' },
    { name: 'Route B', stops: '12', capacity: '50', morning: '6:45 AM', evening: '3:45 PM', driver: 'Suresh Patel', vehicle: 'GJ-01-CD-5678' },
    { name: 'Route C', stops: '6', capacity: '30', morning: '7:15 AM', evening: '3:15 PM', driver: 'Mahesh Singh', vehicle: 'GJ-01-EF-9012' },
  ]);
  const [vehicles, setVehicles] = useState([
    { reg: 'GJ-01-AB-1234', type: 'Bus', capacity: '40', year: '2022', insurance: 'Valid till Dec 2025', gps: true },
    { reg: 'GJ-01-CD-5678', type: 'Bus', capacity: '50', year: '2021', insurance: 'Valid till Mar 2025', gps: true },
    { reg: 'GJ-01-EF-9012', type: 'Mini Bus', capacity: '30', year: '2023', insurance: 'Valid till Jun 2026', gps: true },
    { reg: 'GJ-01-GH-3456', type: 'Van', capacity: '15', year: '2023', insurance: 'Valid till Sep 2025', gps: false },
  ]);
  const [drivers, setDrivers] = useState([
    { name: 'Ramesh Kumar', phone: '98765-43210', license: 'GJ-01-2020-1234', expiry: 'Mar 2027', badge: true },
    { name: 'Suresh Patel', phone: '98765-43211', license: 'GJ-01-2019-5678', expiry: 'Dec 2026', badge: true },
    { name: 'Mahesh Singh', phone: '98765-43212', license: 'GJ-01-2021-9012', expiry: 'Jun 2028', badge: true },
  ]);
  const [transportPolicy, setTransportPolicy] = useState<'optional' | 'mandatory'>('optional');
  const [transportOperation, setTransportOperation] = useState<'in-house' | 'contract'>('in-house');
  const [contractorName, setContractorName] = useState('');
  const [feeCollectedBy, setFeeCollectedBy] = useState<'school' | 'contractor'>('school');
  const [ladyAttendant, setLadyAttendant] = useState(false);
  const [driverAssistant, setDriverAssistant] = useState(false);
  const [parentGpsTracking, setParentGpsTracking] = useState<'none' | 'normal' | 'premium'>('normal');
  const [premiumAlerts, setPremiumAlerts] = useState<Record<string, boolean>>({
    'Trip Start Alert': true, 'Proximity Alert (nearing stop)': true,
    'Reach School Confirmation': true, 'Student Board/Alight Alert': true,
    'Delay Alert (> 10 min late)': true, 'Route Deviation Alert': false,
  });
  const [safetyToggles, setSafetyToggles] = useState<Record<string, boolean>>({
    'GPS Live Tracking': true, 'RFID Student Tap': false,
    'Speed Alert': true, 'SOS Button in Vehicle': true,
    'CCTV Recording': false, 'Route Deviation Alert': true, 'Geo-fence Alert': true,
  });
  const [speedAlertLimit, setSpeedAlertLimit] = useState('40');
  const [feeModel, setFeeModel] = useState('route-wise');
  const [pickupPolicy, setPickupPolicy] = useState<Record<string, boolean>>({
    'Only registered guardians can pick up': true, 'OTP verification for pickup': true,
    'Photo verification at gate': false, 'Pre-registration for non-guardian pickup': true,
  });
  const [commuteTagging, setCommuteTagging] = useState(true);
  const [defaultCommuteMode, setDefaultCommuteMode] = useState('School Bus');

  return (
    <div className="space-y-4">
      <ModuleHeader title="Transport Configuration" subtitle="Routes, vehicles, drivers, safety, and fee structure" theme={theme} />

      <SectionCard title="Transport Policy" subtitle="Define your school's student commute and transport operation policy" theme={theme}>
        <div className="space-y-4">
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Student Commute Policy</p>
            <p className={`text-[10px] ${theme.iconColor} mb-2`}>Does your school allow students to walk or use private vehicles, or is school transport mandatory for all?</p>
            <div className="flex gap-2">
              {[
                { id: 'optional' as const, label: 'Walking / Private Allowed', desc: 'Students may walk, use private vehicles, or opt for school transport' },
                { id: 'mandatory' as const, label: 'School Transport Mandatory', desc: 'All students must use school-provided transport — no walk-ins allowed' },
              ].map(opt => (
                <button key={opt.id} onClick={() => setTransportPolicy(opt.id)}
                  className={`flex-1 text-left p-3 rounded-xl border transition-all ${transportPolicy === opt.id ? `border-2 ${theme.primary} text-white` : `${theme.secondaryBg} ${theme.border}`}`}>
                  <p className={`text-xs font-bold ${transportPolicy === opt.id ? '' : theme.highlight}`}>{opt.label}</p>
                  <p className={`text-[10px] ${transportPolicy === opt.id ? 'text-white/80' : theme.iconColor}`}>{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Transport Operation Type</p>
            <p className={`text-[10px] ${theme.iconColor} mb-2`}>Is transport managed by the school directly, or outsourced to a contractor?</p>
            <div className="flex gap-2">
              {[
                { id: 'in-house' as const, label: 'In-house (School-managed)', desc: 'School owns vehicles and employs drivers directly' },
                { id: 'contract' as const, label: 'Contracted (Outsourced)', desc: 'Transport is outsourced to a third-party contractor' },
              ].map(opt => (
                <button key={opt.id} onClick={() => setTransportOperation(opt.id)}
                  className={`flex-1 text-left p-3 rounded-xl border transition-all ${transportOperation === opt.id ? `border-2 ${theme.primary} text-white` : `${theme.secondaryBg} ${theme.border}`}`}>
                  <p className={`text-xs font-bold ${transportOperation === opt.id ? '' : theme.highlight}`}>{opt.label}</p>
                  <p className={`text-[10px] ${transportOperation === opt.id ? 'text-white/80' : theme.iconColor}`}>{opt.desc}</p>
                </button>
              ))}
            </div>
            {transportOperation === 'contract' && (
              <div className="mt-3">
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Contractor Name</p>
                <InputField value={contractorName} onChange={setContractorName} theme={theme} placeholder="Enter transport contractor name" />
              </div>
            )}
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Transport Fee Collection</p>
            <p className={`text-[10px] ${theme.iconColor} mb-2`}>Who collects the transport fees from parents?</p>
            <div className="flex gap-2">
              {[
                { id: 'school' as const, label: 'School Collects', desc: 'School collects transport fees as part of the school fee invoice' },
                { id: 'contractor' as const, label: 'Contractor / Transporter Collects', desc: 'Transport provider collects fees directly from parents' },
              ].map(opt => (
                <button key={opt.id} onClick={() => setFeeCollectedBy(opt.id)}
                  className={`flex-1 text-left p-2.5 rounded-xl border transition-all ${feeCollectedBy === opt.id ? `border-2 ${theme.primary} text-white` : `${theme.secondaryBg} ${theme.border}`}`}>
                  <p className={`text-xs font-bold ${feeCollectedBy === opt.id ? '' : theme.highlight}`}>{opt.label}</p>
                  <p className={`text-[10px] ${feeCollectedBy === opt.id ? 'text-white/80' : theme.iconColor}`}>{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Vehicle Attendant Policy</p>
            <p className={`text-[10px] ${theme.iconColor} mb-2`}>Does your school provide attendants along with the driver in school vehicles?</p>
            <div className="space-y-2">
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>Lady Attendant</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>A female attendant accompanies students on the bus for safety (recommended for younger students)</p>
                </div>
                <SSAToggle on={ladyAttendant} onChange={() => setLadyAttendant(!ladyAttendant)} theme={theme} />
              </div>
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>Driver Assistant</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>A helper/assistant accompanies the driver to manage boarding, alighting, and discipline</p>
                </div>
                <SSAToggle on={driverAssistant} onChange={() => setDriverAssistant(!driverAssistant)} theme={theme} />
              </div>
            </div>
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Parent GPS Tracking Level</p>
            <p className={`text-[10px] ${theme.iconColor} mb-2`}>What level of GPS tracking do you provide to parents via the app?</p>
            <div className="flex gap-2">
              {[
                { id: 'none' as const, label: 'No Tracking', desc: 'Parents do not get GPS tracking access' },
                { id: 'normal' as const, label: 'Normal Tracking', desc: 'Parents see live bus location on map' },
                { id: 'premium' as const, label: 'Premium Tracking', desc: 'Live location + alerts (trip start, proximity, attendance)' },
              ].map(opt => (
                <button key={opt.id} onClick={() => setParentGpsTracking(opt.id)}
                  className={`flex-1 text-left p-2.5 rounded-xl border transition-all ${parentGpsTracking === opt.id ? `border-2 ${theme.primary} text-white` : `${theme.secondaryBg} ${theme.border}`}`}>
                  <p className={`text-xs font-bold ${parentGpsTracking === opt.id ? '' : theme.highlight}`}>{opt.label}</p>
                  <p className={`text-[10px] ${parentGpsTracking === opt.id ? 'text-white/80' : theme.iconColor}`}>{opt.desc}</p>
                </button>
              ))}
            </div>
            {parentGpsTracking === 'premium' && (
              <div className="mt-3">
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Premium Alert Types — select which alerts parents receive</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {Object.entries(premiumAlerts).map(([alert, enabled]) => (
                    <div key={alert} className={`flex items-center justify-between p-2 rounded-xl ${theme.secondaryBg}`}>
                      <span className={`text-[11px] ${theme.highlight}`}>{alert}</span>
                      <SSAToggle on={enabled} onChange={() => setPremiumAlerts(p => ({ ...p, [alert]: !p[alert] }))} theme={theme} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Routes" subtitle="Bus routes — click any field to edit, X to delete" theme={theme}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Route', 'Stops', 'Capacity', 'Morning', 'Evening', 'Driver', 'Vehicle', ''].map(h => (
                <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {routes.map((r, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  {(['name', 'stops', 'capacity', 'morning', 'evening', 'driver', 'vehicle'] as const).map(field => (
                    <td key={field} className="px-1 py-1.5">
                      <input value={r[field]} onChange={e => { const n = [...routes]; n[i] = { ...n[i], [field]: e.target.value }; setRoutes(n); }}
                        className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${field === 'name' ? `font-bold ${theme.highlight}` : theme.highlight} outline-none`} />
                    </td>
                  ))}
                  <td className="px-1 py-1.5"><button onClick={() => setRoutes(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={12} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={() => setRoutes(p => [...p, { name: '', stops: '', capacity: '', morning: '', evening: '', driver: '', vehicle: '' }])}
          className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl mt-2`}>
          <Plus size={12} /> Add Route
        </button>
      </SectionCard>

      <SectionCard title="Vehicle Fleet" subtitle="Click any field to edit, toggle GPS, X to delete" theme={theme}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Registration', 'Type', 'Capacity', 'Year', 'Insurance', 'GPS', ''].map(h => (
                <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {vehicles.map((v, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  {(['reg', 'type', 'capacity', 'year', 'insurance'] as const).map(field => (
                    <td key={field} className="px-1 py-1.5">
                      <input value={v[field]} onChange={e => { const n = [...vehicles]; n[i] = { ...n[i], [field]: e.target.value }; setVehicles(n); }}
                        className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                    </td>
                  ))}
                  <td className="px-2 py-1.5"><SSAToggle on={v.gps} onChange={() => { const n = [...vehicles]; n[i] = { ...n[i], gps: !n[i].gps }; setVehicles(n); }} theme={theme} /></td>
                  <td className="px-1 py-1.5"><button onClick={() => setVehicles(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={12} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={() => setVehicles(p => [...p, { reg: '', type: 'Bus', capacity: '', year: '', insurance: '', gps: true }])}
          className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl mt-2`}>
          <Plus size={12} /> Add Vehicle
        </button>
      </SectionCard>

      <SectionCard title="Driver Details" subtitle="Click any field to edit, toggle badge, X to delete" theme={theme}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Name', 'Phone', 'License No.', 'License Expiry', 'Badge', ''].map(h => (
                <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {drivers.map((d, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  {(['name', 'phone', 'license', 'expiry'] as const).map(field => (
                    <td key={field} className="px-1 py-1.5">
                      <input value={d[field]} onChange={e => { const n = [...drivers]; n[i] = { ...n[i], [field]: e.target.value }; setDrivers(n); }}
                        className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                    </td>
                  ))}
                  <td className="px-2 py-1.5"><SSAToggle on={d.badge} onChange={() => { const n = [...drivers]; n[i] = { ...n[i], badge: !n[i].badge }; setDrivers(n); }} theme={theme} /></td>
                  <td className="px-1 py-1.5"><button onClick={() => setDrivers(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={12} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={() => setDrivers(p => [...p, { name: '', phone: '', license: '', expiry: '', badge: true }])}
          className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl mt-2`}>
          <Plus size={12} /> Add Driver
        </button>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Tracking &amp; Safety" subtitle="Safety features and alerts for school transport" theme={theme}>
          <div className="space-y-2">
            {Object.entries(safetyToggles).map(([feature, enabled]) => (
              <div key={feature} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{feature}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'GPS Live Tracking': 'Track real-time location of all school vehicles on a live map',
                      'Parent App Tracking': 'Parents can see their child\'s bus location and ETA on their mobile app',
                      'RFID Student Tap': 'Students tap RFID card when boarding/alighting — auto-notifies parents',
                      'Speed Alert': 'Alert admin when vehicle exceeds the set speed limit in school zones',
                      'SOS Button in Vehicle': 'Emergency panic button in each vehicle — triggers instant alert to admin & parents',
                      'CCTV Recording': 'In-vehicle CCTV cameras record footage during all trips',
                      'Route Deviation Alert': 'Alert when a vehicle deviates from its assigned route',
                      'Geo-fence Alert': 'Alert when a vehicle enters or exits a defined geo-fence zone (e.g., school campus)',
                    } as Record<string, string>)[feature]
                  }</p>
                  {feature === 'Speed Alert' && enabled && (
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={`text-[10px] font-bold ${theme.iconColor}`}>Limit:</span>
                      <input value={speedAlertLimit} onChange={e => setSpeedAlertLimit(e.target.value.replace(/\D/g, ''))}
                        className={`w-16 px-2 py-0.5 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none text-center`} />
                      <span className={`text-[10px] ${theme.iconColor}`}>kmph in school zone</span>
                    </div>
                  )}
                </div>
                <SSAToggle on={enabled} onChange={() => setSafetyToggles(p => ({ ...p, [feature]: !p[feature] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>

        <div className="space-y-4">
          <SectionCard title="Transport Fee Model" subtitle="How transport fees are calculated" theme={theme}>
            <div className="space-y-2">
              {[
                { id: 'flat', name: 'Flat Rate', desc: 'Same fee for all routes — simplest to manage' },
                { id: 'route-wise', name: 'Route-wise', desc: 'Different fee per route based on route length/area' },
                { id: 'route-stop-wise', name: 'Route + Stop-wise', desc: 'Fee varies per stop on each route — closer stops pay less, farther stops pay more' },
                { id: 'distance-based', name: 'Distance-based', desc: 'Fee calculated by km distance of student\'s stop from school' },
              ].map(m => (
                <button key={m.id} onClick={() => setFeeModel(m.id)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all ${feeModel === m.id ? `border-2 ${theme.primary} text-white` : `${theme.secondaryBg} ${theme.border}`}`}>
                  <p className={`text-xs font-bold ${feeModel === m.id ? '' : theme.highlight}`}>{m.name}</p>
                  <p className={`text-[10px] ${feeModel === m.id ? 'text-white/80' : theme.iconColor}`}>{m.desc}</p>
                </button>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Pickup Policies" subtitle="Student pickup verification rules at dismissal" theme={theme}>
            <div className="space-y-2">
              {Object.entries(pickupPolicy).map(([policy, enabled]) => (
                <div key={policy} className={`flex items-center justify-between p-2 rounded-xl ${theme.secondaryBg}`}>
                  <div className="flex-1 mr-3">
                    <p className={`text-[11px] font-bold ${theme.highlight}`}>{policy}</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>{
                      ({
                        'Only registered guardians can pick up': 'Only guardians listed in the student profile can collect the child',
                        'OTP verification for pickup': 'Guardian must enter a one-time password at gate before child is released',
                        'Photo verification at gate': 'Gate staff verifies guardian photo from student profile before releasing child',
                        'Pre-registration for non-guardian pickup': 'If someone other than registered guardian picks up, parent must pre-register them via app',
                      } as Record<string, string>)[policy]
                    }</p>
                  </div>
                  <SSAToggle on={enabled} onChange={() => setPickupPolicy(p => ({ ...p, [policy]: !p[policy] }))} theme={theme} />
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>

      <SectionCard title="Student Commute Tagging" subtitle="Tag how each student commutes to school" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Tag Students as Walk-in / Transport</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Enables commute-mode field on each student profile</p>
            </div>
            <SSAToggle on={commuteTagging} onChange={() => setCommuteTagging(!commuteTagging)} theme={theme} />
          </div>
          {commuteTagging && (
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Default Commute Mode</p>
              <SelectField options={['Walk-in', 'School Bus', 'Private Vehicle']} value={defaultCommuteMode} onChange={setDefaultCommuteMode} theme={theme} />
            </div>
          )}
        </div>
      </SectionCard>
    </div>
  );
}

// ─── ATTENDANCE CONFIG MODULE ──────────────────────
function AttendanceConfigModule({ theme }: { theme: Theme }) {
  const [markingMethods, setMarkingMethods] = useState<Record<string, boolean>>({
    'Biometric (Fingerprint/Face)': true, 'Mobile App (Teacher)': true, 'RFID Card': false,
    'Manual Register': true, 'QR Code Scan': false,
  });
  const [frequency, setFrequency] = useState('daily');
  const [gracePeriod, setGracePeriod] = useState('15');
  const [halfDayCutoff, setHalfDayCutoff] = useState('11:30');
  const [absentThreshold, setAbsentThreshold] = useState('3');
  const [autoNotify, setAutoNotify] = useState<Record<string, boolean>>({
    'Notify parent on absence (immediate)': true,
    'Notify parent on late arrival': true,
    'Weekly attendance summary to parents': true,
    'Alert class teacher if absent > 3 consecutive days': true,
    'Alert principal if attendance < 75%': true,
    'Auto-mark absent if not marked by 10 AM': false,
  });
  const [attendanceTypes, setAttendanceTypes] = useState<Record<string, boolean>>({
    'Present': true, 'Absent': true, 'Late': true, 'Half-Day': true,
    'Medical Leave': true, 'On-Duty': true, 'Excused': false,
  });
  const [allowCustomAttendanceTypes, setAllowCustomAttendanceTypes] = useState(false);

  return (
    <div className="space-y-4">
      <ModuleHeader title="Attendance Configuration" subtitle="Marking methods, frequency, grace periods, and notification rules" theme={theme} />

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Marking Methods" subtitle="How student attendance is recorded each day" theme={theme}>
          <div className="space-y-2">
            {Object.entries(markingMethods).map(([method, enabled]) => (
              <div key={method} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{method}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Biometric (Fingerprint/Face)': 'Students mark attendance via biometric device at school entrance',
                      'Mobile App (Teacher)': 'Class teacher marks attendance from their mobile app during first period',
                      'RFID Card': 'Students tap RFID card at school gate — auto-records entry/exit time',
                      'Manual Register': 'Traditional paper-based attendance register maintained by class teacher',
                      'QR Code Scan': 'Students scan a QR code displayed in classroom to mark their presence',
                    } as Record<string, string>)[method]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setMarkingMethods(p => ({ ...p, [method]: !p[method] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Frequency &amp; Timing" subtitle="When and how often attendance is marked" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Marking Frequency</p>
              <SelectField options={['daily', 'twice-daily', 'period-wise']} value={frequency} onChange={setFrequency} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Grace Period for Late (minutes)</p>
              <InputField value={gracePeriod} onChange={setGracePeriod} theme={theme} type="number" />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Half-Day Cutoff Time</p>
              <InputField value={halfDayCutoff} onChange={setHalfDayCutoff} theme={theme} type="time" />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Consecutive Absent Days for Alert</p>
              <InputField value={absentThreshold} onChange={setAbsentThreshold} theme={theme} type="number" />
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Auto-Notification Rules" subtitle="Automated alerts sent to parents and staff based on attendance events" theme={theme}>
        <div className="space-y-2">
          {Object.entries(autoNotify).map(([rule, enabled]) => (
            <div key={rule} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>{rule}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{
                  ({
                    'Notify parent on absence (immediate)': 'Parents receive instant SMS/app notification when their child is marked absent',
                    'Notify parent on late arrival': 'Parents are notified when their child arrives after the grace period',
                    'Weekly attendance summary to parents': 'Parents receive a weekly digest showing their child\'s attendance for the week',
                    'Alert class teacher if absent > 3 consecutive days': 'Class teacher gets an alert when a student is absent for 3+ consecutive days',
                    'Alert principal if attendance < 75%': 'Principal is notified when any student\'s attendance drops below 75%',
                    'Auto-mark absent if not marked by 10 AM': 'System automatically marks students as absent if teacher hasn\'t marked attendance by 10 AM',
                  } as Record<string, string>)[rule]
                }</p>
              </div>
              <SSAToggle on={enabled} onChange={() => setAutoNotify(p => ({ ...p, [rule]: !p[rule] }))} theme={theme} />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Attendance Types" subtitle="Named attendance statuses available to teachers when marking attendance" theme={theme}>
        <div className="space-y-2">
          {Object.entries(attendanceTypes).map(([type, enabled]) => (
            <div key={type} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>{type}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{
                  ({
                    'Present': 'Student is present in class for the full day',
                    'Absent': 'Student did not attend school at all',
                    'Late': 'Student arrived after the grace period — counts as present but flagged',
                    'Half-Day': 'Student attended only half the school day (morning or afternoon)',
                    'Medical Leave': 'Absent due to illness — requires medical certificate for extended leave',
                    'On-Duty': 'Student is absent from class but on official school duty (sports, events, etc.)',
                    'Excused': 'Pre-approved absence (family event, religious observance, etc.)',
                  } as Record<string, string>)[type]
                }</p>
              </div>
              <SSAToggle on={enabled} onChange={() => setAttendanceTypes(p => ({ ...p, [type]: !p[type] }))} theme={theme} />
            </div>
          ))}
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Allow Custom Types</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Let school admins define additional attendance statuses</p>
            </div>
            <SSAToggle on={allowCustomAttendanceTypes} onChange={() => setAllowCustomAttendanceTypes(!allowCustomAttendanceTypes)} theme={theme} />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

// ─── EXAM & GRADING CONFIG MODULE ──────────────────
function ExamConfigModule({ theme }: { theme: Theme }) {
  const [gradingSystem, setGradingSystem] = useState('cbse');
  const [gradeBoundaries, setGradeBoundaries] = useState([
    { grade: 'A1', min: '91', max: '100', gp: '10' },
    { grade: 'A2', min: '81', max: '90', gp: '9' },
    { grade: 'B1', min: '71', max: '80', gp: '8' },
    { grade: 'B2', min: '61', max: '70', gp: '7' },
    { grade: 'C1', min: '51', max: '60', gp: '6' },
    { grade: 'C2', min: '41', max: '50', gp: '5' },
    { grade: 'D', min: '33', max: '40', gp: '4' },
    { grade: 'E (Fail)', min: '0', max: '32', gp: '0' },
  ]);
  const [reportTemplate, setReportTemplate] = useState('cbse-standard');
  const [examSchedule, setExamSchedule] = useState([
    { exam: 'Unit Test 1', startDate: '15 Jun', endDate: '20 Jun', classes: 'All', status: 'Completed' },
    { exam: 'Unit Test 2', startDate: '25 Aug', endDate: '30 Aug', classes: 'All', status: 'Completed' },
    { exam: 'Half Yearly', startDate: '01 Oct', endDate: '15 Oct', classes: 'All', status: 'Upcoming' },
    { exam: 'Unit Test 3', startDate: '10 Dec', endDate: '15 Dec', classes: 'All', status: 'Scheduled' },
    { exam: 'Annual Exam', startDate: '01 Mar', endDate: '15 Mar', classes: 'All', status: 'Scheduled' },
  ]);
  const [rankDisplay, setRankDisplay] = useState<Record<string, boolean>>({
    'Show class rank': true, 'Show section rank': true, 'Show percentile': false,
    'Show subject-wise rank': false, 'Show grade distribution graph': true,
  });

  return (
    <div className="space-y-4">
      <ModuleHeader title="Exams & Grading Configuration" subtitle="Grading system, grade boundaries, report cards, and exam schedules" theme={theme} />

      <SectionCard title="Grading System" subtitle="Select the grading methodology" theme={theme}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {[
            { id: 'marks', name: 'Marks Only' },
            { id: 'grades', name: 'Grades Only' },
            { id: 'both', name: 'Marks + Grades' },
            { id: 'cbse', name: 'CBSE CCE Pattern' },
          ].map(g => (
            <button key={g.id} onClick={() => setGradingSystem(g.id)}
              className={`p-2.5 rounded-xl text-xs font-bold transition-all ${gradingSystem === g.id ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.highlight}`}`}>
              {g.name}
            </button>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Grade Boundaries" subtitle="Edit grade name, marks, and grade points — add or delete grades" theme={theme}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Grade', 'Min Marks', 'Max Marks', 'Grade Points', ''].map(h => (
                <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {gradeBoundaries.map((g, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className="px-2 py-1.5">
                    <input value={g.grade} onChange={e => { const n = [...gradeBoundaries]; n[i] = { ...n[i], grade: e.target.value }; setGradeBoundaries(n); }}
                      className={`w-20 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <input value={g.min} onChange={e => { const n = [...gradeBoundaries]; n[i] = { ...n[i], min: e.target.value }; setGradeBoundaries(n); }}
                      className={`w-16 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <input value={g.max} onChange={e => { const n = [...gradeBoundaries]; n[i] = { ...n[i], max: e.target.value }; setGradeBoundaries(n); }}
                      className={`w-16 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <input value={g.gp} onChange={e => { const n = [...gradeBoundaries]; n[i] = { ...n[i], gp: e.target.value }; setGradeBoundaries(n); }}
                      className={`w-16 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5"><button onClick={() => setGradeBoundaries(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={12} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={() => setGradeBoundaries(p => [...p, { grade: '', min: '', max: '', gp: '' }])}
          className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl mt-2`}>
          <Plus size={12} /> Add Grade
        </button>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Report Card Template" subtitle="Select template for printing" theme={theme}>
          <div className="space-y-2">
            {['cbse-standard', 'icse-format', 'state-board', 'custom'].map(t => (
              <button key={t} onClick={() => setReportTemplate(t)}
                className={`w-full text-left p-2.5 rounded-xl border transition-all ${reportTemplate === t ? `border-2 ${theme.primary} text-white` : `${theme.secondaryBg} ${theme.border}`}`}>
                <p className={`text-xs font-bold capitalize ${reportTemplate === t ? '' : theme.highlight}`}>{t.replace('-', ' ')}</p>
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Rank Display Options" subtitle="Control what ranking information appears on student report cards" theme={theme}>
          <div className="space-y-2">
            {Object.entries(rankDisplay).map(([opt, enabled]) => (
              <div key={opt} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{opt}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Show class rank': 'Display student\'s rank among all students in their class (e.g., 5th out of 40)',
                      'Show section rank': 'Display student\'s rank within their specific section (e.g., 3rd in Section A)',
                      'Show percentile': 'Show the percentile score indicating performance relative to peers',
                      'Show subject-wise rank': 'Show individual rank for each subject alongside the overall rank',
                      'Show grade distribution graph': 'Include a visual bar chart showing how grades are distributed across the class',
                    } as Record<string, string>)[opt]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setRankDisplay(p => ({ ...p, [opt]: !p[opt] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Exam Schedule" subtitle="Click to edit exam details, X to delete" theme={theme}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Exam', 'Start', 'End', 'Classes', 'Status', ''].map(h => (
                <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {examSchedule.map((ex, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className="px-1 py-1.5">
                    <input value={ex.exam} onChange={e => { const n = [...examSchedule]; n[i] = { ...n[i], exam: e.target.value }; setExamSchedule(n); }}
                      className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-1 py-1.5">
                    <input value={ex.startDate} onChange={e => { const n = [...examSchedule]; n[i] = { ...n[i], startDate: e.target.value }; setExamSchedule(n); }}
                      className={`w-20 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-1 py-1.5">
                    <input value={ex.endDate} onChange={e => { const n = [...examSchedule]; n[i] = { ...n[i], endDate: e.target.value }; setExamSchedule(n); }}
                      className={`w-20 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-1 py-1.5">
                    <input value={ex.classes} onChange={e => { const n = [...examSchedule]; n[i] = { ...n[i], classes: e.target.value }; setExamSchedule(n); }}
                      className={`w-16 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-1 py-1.5">
                    <select value={ex.status} onChange={e => { const n = [...examSchedule]; n[i] = { ...n[i], status: e.target.value }; setExamSchedule(n); }}
                      className={`px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] font-bold ${theme.highlight}`}>
                      <option value="Scheduled">Scheduled</option>
                      <option value="Upcoming">Upcoming</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td className="px-1 py-1.5"><button onClick={() => setExamSchedule(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={12} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={() => setExamSchedule(p => [...p, { exam: '', startDate: '', endDate: '', classes: 'All', status: 'Scheduled' }])}
          className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl mt-2`}>
          <Plus size={12} /> Add Exam
        </button>
      </SectionCard>
    </div>
  );
}

// ─── COMMUNICATION CONFIG MODULE ───────────────────
function CommunicationConfigModule({ theme }: { theme: Theme }) {
  const [dmPermissions, setDmPermissions] = useState<Record<string, boolean>>({
    'Parent to Class Teacher': true,
    'Parent to Subject Teacher': false,
    'Parent to Principal': false,
    'Parent to Admin': true,
    'Teacher to Parent': true,
    'Teacher to Teacher': true,
    'Teacher to Principal': true,
    'Student to Teacher (Sr. Sec only)': false,
    'Staff to HR': true,
    'Anyone to Transport Helpdesk': true,
  });
  const [parentMode, setParentMode] = useState('reply-only');
  const [groupPerms, setGroupPerms] = useState<Record<string, boolean>>({
    'Admin can create any group': true,
    'Principal can create any group': true,
    'Teacher can create class groups': true,
    'Teacher can create subject groups': true,
    'Parent can create groups': false,
    'Student can create groups': false,
  });
  const [autoGroups, setAutoGroups] = useState([
    'Class-wise Parent Groups (auto per section)',
    'Subject Teacher Groups',
    'Staff Announcements',
    'Transport Route Groups',
    'PTA Group',
    'Management Group',
  ]);
  const [newAutoGroup, setNewAutoGroup] = useState('');
  const [chatStorage, setChatStorage] = useState<Record<string, string>>({
    'Message retention': '1 year',
    'File storage per user': '500 MB',
    'Max file size': '25 MB',
    'Allowed file types': 'PDF, DOC, JPG, PNG, MP4',
  });
  const [fileSharing, setFileSharing] = useState<Record<string, boolean>>({
    'Allow image sharing': true,
    'Allow document sharing': true,
    'Allow video sharing': false,
    'Allow voice messages': true,
    'Allow location sharing': false,
  });

  return (
    <div className="space-y-4">
      <ModuleHeader title="Communication Configuration" subtitle="DM permissions, group rules, storage limits, and file sharing" theme={theme} />

      <SectionCard title="DM Permission Matrix" subtitle="Control who can initiate direct messages to whom in the school chat system" theme={theme}>
        <div className="space-y-1.5">
          {Object.entries(dmPermissions).map(([perm, enabled]) => (
            <div key={perm} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>{perm}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{
                  ({
                    'Parent to Class Teacher': 'Parents can directly message their child\'s class teacher',
                    'Parent to Subject Teacher': 'Parents can message any subject teacher of their child',
                    'Parent to Principal': 'Parents can send direct messages to the school principal',
                    'Parent to Admin': 'Parents can message the school admin office for queries',
                    'Teacher to Parent': 'Teachers can initiate direct messages to any parent',
                    'Teacher to Teacher': 'Teachers can message each other for collaboration',
                    'Teacher to Principal': 'Teachers can directly message the principal',
                    'Student to Teacher (Sr. Sec only)': 'Senior secondary students can message their teachers (disabled for younger students)',
                    'Staff to HR': 'Non-teaching staff can message HR department for leave/payroll queries',
                    'Anyone to Transport Helpdesk': 'Any user can message the transport helpdesk for bus-related queries',
                  } as Record<string, string>)[perm]
                }</p>
              </div>
              <SSAToggle on={enabled} onChange={() => setDmPermissions(p => ({ ...p, [perm]: !p[perm] }))} theme={theme} />
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Parent Communication Mode" subtitle="Level of parent messaging access" theme={theme}>
          <div className="space-y-2">
            {[
              { id: 'full-two-way', name: 'Full Two-Way', desc: 'Parents can initiate and reply' },
              { id: 'reply-only', name: 'Reply Only', desc: 'Parents can only reply to teacher messages' },
              { id: 'broadcast-only', name: 'Broadcast Only', desc: 'School sends, parents read (no replies)' },
            ].map(m => (
              <button key={m.id} onClick={() => setParentMode(m.id)}
                className={`w-full text-left p-2.5 rounded-xl border transition-all ${parentMode === m.id ? `border-2 ${theme.primary} text-white` : `${theme.secondaryBg} ${theme.border}`}`}>
                <p className={`text-xs font-bold ${parentMode === m.id ? '' : theme.highlight}`}>{m.name}</p>
                <p className={`text-[10px] ${parentMode === m.id ? 'text-white/80' : theme.iconColor}`}>{m.desc}</p>
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Group Creation Permissions" subtitle="Control who can create group chats within the school communication system" theme={theme}>
          <div className="space-y-2">
            {Object.entries(groupPerms).map(([perm, enabled]) => (
              <div key={perm} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{perm}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Admin can create any group': 'School admin can create groups for any purpose (announcements, committees, etc.)',
                      'Principal can create any group': 'Principal can create groups like staff meetings, parent forums, etc.',
                      'Teacher can create class groups': 'Teachers can create groups for their own class (e.g., "Class 5A Parents")',
                      'Teacher can create subject groups': 'Teachers can create subject-specific groups (e.g., "Grade 10 Physics")',
                      'Parent can create groups': 'Parents can create informal groups (e.g., carpool, study circles)',
                      'Student can create groups': 'Senior students can create study groups or project groups',
                    } as Record<string, string>)[perm]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setGroupPerms(p => ({ ...p, [perm]: !p[perm] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Default Auto-created Groups" subtitle="Groups auto-created by the system — add or remove" theme={theme}>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {autoGroups.map(g => (
            <span key={g} className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${theme.secondaryBg} text-xs font-medium ${theme.highlight}`}>
              <CheckCircle size={10} className="text-emerald-500" /> {g}
              <button onClick={() => setAutoGroups(p => p.filter(x => x !== g))} className="text-red-400 hover:text-red-600 ml-1"><X size={10} /></button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input value={newAutoGroup} onChange={e => setNewAutoGroup(e.target.value)} placeholder="Add auto-group..."
            className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
          <button onClick={() => { if (newAutoGroup.trim()) { setAutoGroups(p => [...p, newAutoGroup.trim()]); setNewAutoGroup(''); } }}
            className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={14} /></button>
        </div>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Chat Storage &amp; Retention" subtitle="Click values to edit storage limits" theme={theme}>
          <div className="space-y-2">
            {Object.entries(chatStorage).map(([key, val]) => (
              <div key={key} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <span className={`text-xs ${theme.highlight}`}>{key}</span>
                <input value={val} onChange={e => setChatStorage(p => ({ ...p, [key]: e.target.value }))}
                  className={`w-32 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-right font-bold ${theme.iconColor} outline-none`} />
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="File Sharing" subtitle="Control what file types users can share in chat conversations" theme={theme}>
          <div className="space-y-2">
            {Object.entries(fileSharing).map(([opt, enabled]) => (
              <div key={opt} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{opt}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Allow image sharing': 'Users can share photos and images (JPG, PNG) in chat — useful for homework, notices',
                      'Allow document sharing': 'Users can share PDFs, Word docs, and spreadsheets in conversations',
                      'Allow video sharing': 'Users can share video files — useful for recorded lectures or events',
                      'Allow voice messages': 'Users can record and send voice notes instead of typing messages',
                      'Allow location sharing': 'Users can share their live location — useful for field trips or transport tracking',
                    } as Record<string, string>)[opt]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setFileSharing(p => ({ ...p, [opt]: !p[opt] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

// ─── TIMETABLE & BELL SCHEDULE CONFIG MODULE ───────
function TimetableConfigModule({ theme }: { theme: Theme }) {
  const [bellSchedule, setBellSchedule] = useState([
    { period: 'Assembly', start: '07:30', end: '07:50' },
    { period: 'Period 1', start: '07:50', end: '08:30' },
    { period: 'Period 2', start: '08:30', end: '09:10' },
    { period: 'Period 3', start: '09:10', end: '09:50' },
    { period: 'Short Break', start: '09:50', end: '10:05' },
    { period: 'Period 4', start: '10:05', end: '10:45' },
    { period: 'Period 5', start: '10:45', end: '11:25' },
    { period: 'Lunch Break', start: '11:25', end: '12:00' },
    { period: 'Period 6', start: '12:00', end: '12:40' },
    { period: 'Period 7', start: '12:40', end: '01:20' },
    { period: 'Period 8', start: '01:20', end: '02:00' },
  ]);
  const [saturdaySchedule, setSaturdaySchedule] = useState('half-day');
  const [zeroPeriod, setZeroPeriod] = useState(false);
  const [zeroPeriodTime, setZeroPeriodTime] = useState({ start: '07:00', end: '07:30' });
  const [assemblyTime, setAssemblyTime] = useState('15');
  const [substitutionMode, setSubstitutionMode] = useState('Both');
  const [substitutionBasis, setSubstitutionBasis] = useState('Both');
  const [allowPeriodSwaps, setAllowPeriodSwaps] = useState(true);

  return (
    <div className="space-y-4">
      <ModuleHeader title="Timetable & Bell Schedule" subtitle="Bell timings, breaks, Saturday schedule, and special periods" theme={theme} />

      <SectionCard title="Bell Schedule" subtitle="Period-wise start and end times" theme={theme}>
        <div className="space-y-1.5">
          {bellSchedule.map((p, i) => (
            <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${p.period.includes('Break') || p.period === 'Assembly' ? 'bg-amber-50 border border-amber-200' : theme.secondaryBg}`}>
              <span className={`text-xs font-bold ${theme.highlight} w-24`}>{p.period}</span>
              <input type="time" value={p.start} onChange={e => { const n = [...bellSchedule]; n[i] = { ...n[i], start: e.target.value }; setBellSchedule(n); }}
                className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
              <span className={`text-xs ${theme.iconColor}`}>to</span>
              <input type="time" value={p.end} onChange={e => { const n = [...bellSchedule]; n[i] = { ...n[i], end: e.target.value }; setBellSchedule(n); }}
                className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
              <span className={`text-[10px] ${theme.iconColor}`}>
                {(() => { const [sh, sm] = p.start.split(':').map(Number); const [eh, em] = p.end.split(':').map(Number); return `${(eh * 60 + em) - (sh * 60 + sm)} min`; })()}
              </span>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="grid grid-cols-3 gap-4">
        <SectionCard title="Saturday Schedule" theme={theme}>
          <div className="space-y-2">
            {['full-day', 'half-day', 'off'].map(s => (
              <button key={s} onClick={() => setSaturdaySchedule(s)}
                className={`w-full text-left p-2.5 rounded-xl text-xs font-bold transition-all capitalize ${saturdaySchedule === s ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.highlight}`}`}>
                {s.replace('-', ' ')}
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Zero Period" subtitle="Optional early morning period" theme={theme}>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <span className={`text-xs font-bold ${theme.highlight}`}>Enable Zero Period</span>
              <SSAToggle on={zeroPeriod} onChange={() => setZeroPeriod(!zeroPeriod)} theme={theme} />
            </div>
            {zeroPeriod && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Start</p>
                  <InputField value={zeroPeriodTime.start} onChange={v => setZeroPeriodTime(p => ({ ...p, start: v }))} theme={theme} type="time" />
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>End</p>
                  <InputField value={zeroPeriodTime.end} onChange={v => setZeroPeriodTime(p => ({ ...p, end: v }))} theme={theme} type="time" />
                </div>
              </div>
            )}
          </div>
        </SectionCard>

        <SectionCard title="Assembly" subtitle="Morning assembly duration" theme={theme}>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Duration (minutes)</p>
            <InputField value={assemblyTime} onChange={setAssemblyTime} theme={theme} type="number" />
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Teacher Substitution" subtitle="How absent teacher periods are handled" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Substitution Mode</p>
              <SelectField options={['Manual', 'Auto-suggest', 'Both']} value={substitutionMode} onChange={setSubstitutionMode} theme={theme} />
            </div>
            {(substitutionMode === 'Auto-suggest' || substitutionMode === 'Both') && (
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Auto-suggest Based On</p>
                <SelectField options={['Free periods', 'Subject match', 'Both']} value={substitutionBasis} onChange={setSubstitutionBasis} theme={theme} />
              </div>
            )}
          </div>
        </SectionCard>

        <SectionCard title="Period Swaps" subtitle="Teacher-initiated period exchange" theme={theme}>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Allow Teachers to Swap Periods</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Teachers can request mutual period swaps for a given day</p>
            </div>
            <SSAToggle on={allowPeriodSwaps} onChange={() => setAllowPeriodSwaps(!allowPeriodSwaps)} theme={theme} />
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

// ─── LEAVE POLICY MODULE ───────────────────────────
function LeaveConfigModule({ theme }: { theme: Theme }) {
  const [leaveTypes, setLeaveTypes] = useState([
    { type: 'Casual Leave (CL)', days: '12', carryForward: false, maxCarry: '0' },
    { type: 'Sick Leave (SL)', days: '10', carryForward: true, maxCarry: '5' },
    { type: 'Earned Leave (EL)', days: '15', carryForward: true, maxCarry: '30' },
    { type: 'Maternity Leave', days: '180', carryForward: false, maxCarry: '0' },
    { type: 'Paternity Leave', days: '15', carryForward: false, maxCarry: '0' },
    { type: 'Compensatory Off', days: '0', carryForward: false, maxCarry: '0' },
  ]);
  const [sandwichRule, setSandwichRule] = useState(true);
  const [halfDayLeave, setHalfDayLeave] = useState(true);
  const [approvalChain, setApprovalChain] = useState([
    { level: 1, approver: 'HOD / Coordinator', timeLimit: '24 hours' },
    { level: 2, approver: 'Vice Principal', timeLimit: '48 hours' },
    { level: 3, approver: 'Principal', timeLimit: '72 hours' },
  ]);
  const [nonTeachingApprovalChain, setNonTeachingApprovalChain] = useState([
    { level: 1, approver: 'Department Head / Supervisor', timeLimit: '24 hours' },
    { level: 2, approver: 'Admin Officer', timeLimit: '48 hours' },
  ]);
  const [maxConsecutive, setMaxConsecutive] = useState('5');
  const [lwpThreshold, setLwpThreshold] = useState('3');

  return (
    <div className="space-y-4">
      <ModuleHeader title="Leave Policy Configuration" subtitle="Leave types, carry-forward rules, approval chain, and thresholds" theme={theme} />

      <SectionCard title="Leave Types &amp; Annual Allocation" subtitle="Edit leave type names, days, carry-forward — add or delete" theme={theme}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Leave Type', 'Days/Year', 'Carry Forward', 'Max Carry', ''].map(h => (
                <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {leaveTypes.map((lt, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className="px-2 py-1.5">
                    <input value={lt.type} onChange={e => { const n = [...leaveTypes]; n[i] = { ...n[i], type: e.target.value }; setLeaveTypes(n); }}
                      className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <input value={lt.days} onChange={e => { const n = [...leaveTypes]; n[i] = { ...n[i], days: e.target.value }; setLeaveTypes(n); }}
                      className={`w-16 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-3 py-2">
                    <SSAToggle on={lt.carryForward} onChange={() => { const n = [...leaveTypes]; n[i] = { ...n[i], carryForward: !n[i].carryForward }; setLeaveTypes(n); }} theme={theme} />
                  </td>
                  <td className="px-2 py-1.5">
                    <input value={lt.maxCarry} onChange={e => { const n = [...leaveTypes]; n[i] = { ...n[i], maxCarry: e.target.value }; setLeaveTypes(n); }}
                      disabled={!lt.carryForward}
                      className={`w-16 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none ${!lt.carryForward ? 'opacity-30' : ''}`} />
                  </td>
                  <td className="px-2 py-1.5"><button onClick={() => setLeaveTypes(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={12} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={() => setLeaveTypes(p => [...p, { type: '', days: '0', carryForward: false, maxCarry: '0' }])}
          className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl mt-2`}>
          <Plus size={12} /> Add Leave Type
        </button>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Leave Rules" subtitle="Special rules for leave calculation" theme={theme}>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Sandwich Rule</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Holidays between leave days count as leave</p>
              </div>
              <SSAToggle on={sandwichRule} onChange={() => setSandwichRule(!sandwichRule)} theme={theme} />
            </div>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Half-Day Leave</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Allow staff to take half-day leave</p>
              </div>
              <SSAToggle on={halfDayLeave} onChange={() => setHalfDayLeave(!halfDayLeave)} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max Consecutive Leave Days (without special approval)</p>
              <InputField value={maxConsecutive} onChange={setMaxConsecutive} theme={theme} type="number" />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>LWP Threshold (days after leave balance exhausted)</p>
              <InputField value={lwpThreshold} onChange={setLwpThreshold} theme={theme} type="number" />
            </div>
          </div>
        </SectionCard>

        <div className="space-y-4">
          <SectionCard title="Teaching Staff Approval Chain" subtitle="Edit approver name and time limit — add or remove steps" theme={theme}>
            <div className="space-y-2">
              {approvalChain.map((a, i) => (
                <div key={i} className={`flex items-center gap-2 p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <span className={`text-[10px] w-6 h-6 rounded-full ${theme.primary} text-white flex items-center justify-center font-bold shrink-0`}>{i + 1}</span>
                  <input value={a.approver} onChange={e => { const n = [...approvalChain]; n[i] = { ...n[i], approver: e.target.value }; setApprovalChain(n); }}
                    className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} placeholder="Approver role" />
                  <input value={a.timeLimit} onChange={e => { const n = [...approvalChain]; n[i] = { ...n[i], timeLimit: e.target.value }; setApprovalChain(n); }}
                    className={`w-24 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.iconColor} outline-none`} placeholder="e.g. 24 hours" />
                  <button onClick={() => setApprovalChain(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
                </div>
              ))}
              <button onClick={() => setApprovalChain(p => [...p, { level: p.length + 1, approver: '', timeLimit: '24 hours' }])}
                className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
                <Plus size={12} /> Add Step
              </button>
            </div>
          </SectionCard>

          <SectionCard title="Non-Teaching Staff Approval Chain" subtitle="Edit approver name and time limit — add or remove steps" theme={theme}>
            <div className="space-y-2">
              {nonTeachingApprovalChain.map((a, i) => (
                <div key={i} className={`flex items-center gap-2 p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <span className={`text-[10px] w-6 h-6 rounded-full ${theme.primary} text-white flex items-center justify-center font-bold shrink-0`}>{i + 1}</span>
                  <input value={a.approver} onChange={e => { const n = [...nonTeachingApprovalChain]; n[i] = { ...n[i], approver: e.target.value }; setNonTeachingApprovalChain(n); }}
                    className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} placeholder="Approver role" />
                  <input value={a.timeLimit} onChange={e => { const n = [...nonTeachingApprovalChain]; n[i] = { ...n[i], timeLimit: e.target.value }; setNonTeachingApprovalChain(n); }}
                    className={`w-24 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.iconColor} outline-none`} placeholder="e.g. 24 hours" />
                  <button onClick={() => setNonTeachingApprovalChain(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
                </div>
              ))}
              <button onClick={() => setNonTeachingApprovalChain(p => [...p, { level: p.length + 1, approver: '', timeLimit: '24 hours' }])}
                className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
                <Plus size={12} /> Add Step
              </button>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

// ─── VISITOR RULES CONFIG MODULE ───────────────────
type VisitorTypeRules = {
  toggles: Record<string, boolean>;
  allowedFrom: string;
  allowedTo: string;
  maxDuration: string;
};

const defaultVisitorTypeRules: Record<string, VisitorTypeRules> = {
  'Parent': {
    toggles: {
      'Pre-registration required': true,
      'Photo ID verification': true,
      'Pickup authorization required': true,
      'Escort required': false,
      'Areas allowed: Office': true,
      'Areas allowed: Classroom': false,
      'Areas allowed: Campus': true,
    },
    allowedFrom: '08:00',
    allowedTo: '16:00',
    maxDuration: '60',
  },
  'Vendor / Supplier': {
    toggles: {
      'Pre-registration MANDATORY': true,
      'Photo capture at gate': true,
      'Delivery area only': true,
      'POC (Point of Contact) required': true,
      'Valid ID required': true,
      'Background check status': false,
    },
    allowedFrom: '09:00',
    allowedTo: '15:00',
    maxDuration: '120',
  },
  'General Visitor': {
    toggles: {
      'Pre-registration required': false,
      'Photo capture': true,
      'Purpose of visit required': true,
      'Escort mandatory': true,
      'Restricted areas enforced': true,
    },
    allowedFrom: '09:00',
    allowedTo: '17:00',
    maxDuration: '45',
  },
  'Contractor': {
    toggles: {
      'Pre-registration MANDATORY': true,
      'Safety briefing required': true,
      'Work permit required': true,
      'Designated work area enforced': true,
      'Supervisor contact required': true,
      'Valid insurance': true,
    },
    allowedFrom: '07:00',
    allowedTo: '18:00',
    maxDuration: '480',
  },
  'Government Official': {
    toggles: {
      'Fast-track entry': true,
      'ID verification': true,
      'Principal notification auto-trigger': true,
      'No time limit': true,
      'Escort assigned': true,
    },
    allowedFrom: '08:00',
    allowedTo: '18:00',
    maxDuration: '0',
  },
  'Alumni': {
    toggles: {
      'Pre-registration optional': true,
      'Alumni ID verification': true,
      'Event-based access only': false,
      'Campus tour allowed': true,
      'Classrooms restricted': true,
    },
    allowedFrom: '09:00',
    allowedTo: '17:00',
    maxDuration: '120',
  },
};

function VisitorConfigModule({ theme }: { theme: Theme }) {
  const [pickupMethod, setPickupMethod] = useState('otp');
  const [activeVisitorType, setActiveVisitorType] = useState('Parent');
  const [visitorRules, setVisitorRules] = useState<Record<string, VisitorTypeRules>>(defaultVisitorTypeRules);
  const [cctvParentAccess, setCctvParentAccess] = useState(false);
  const [cctvRetentionDays, setCctvRetentionDays] = useState('30');

  const visitorTypes = Object.keys(defaultVisitorTypeRules);
  const currentRules = visitorRules[activeVisitorType];

  function setToggle(rule: string, val: boolean) {
    setVisitorRules(prev => ({
      ...prev,
      [activeVisitorType]: {
        ...prev[activeVisitorType],
        toggles: { ...prev[activeVisitorType].toggles, [rule]: val },
      },
    }));
  }

  function setTimingField(field: 'allowedFrom' | 'allowedTo' | 'maxDuration', val: string) {
    setVisitorRules(prev => ({
      ...prev,
      [activeVisitorType]: { ...prev[activeVisitorType], [field]: val },
    }));
  }

  return (
    <div className="space-y-4">
      <ModuleHeader title="Visitor & Pickup Rules" subtitle="Per-visitor-type rules, verification, and security configuration" theme={theme} />

      <SectionCard title="Pickup Verification Method" subtitle="How student pickup is verified" theme={theme}>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'otp', name: 'OTP Verification', desc: 'Parent receives OTP on phone' },
            { id: 'photo', name: 'Photo Match', desc: 'Guard matches face with registered photo' },
            { id: 'rfid', name: 'RFID/QR Card', desc: 'Parent scans card at gate' },
          ].map(m => (
            <button key={m.id} onClick={() => setPickupMethod(m.id)}
              className={`p-3 rounded-xl text-left border-2 transition-all ${pickupMethod === m.id ? `${theme.primary} text-white border-transparent` : `${theme.secondaryBg} ${theme.border}`}`}>
              <p className={`text-xs font-bold ${pickupMethod === m.id ? '' : theme.highlight}`}>{m.name}</p>
              <p className={`text-[10px] mt-1 ${pickupMethod === m.id ? 'text-white/80' : theme.iconColor}`}>{m.desc}</p>
            </button>
          ))}
        </div>
      </SectionCard>

      {/* Visitor Type Rules */}
      <SectionCard title="Visitor Type Rules" subtitle="Select a visitor type to configure its specific entry rules" theme={theme}>
        {/* Type tab bar */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {visitorTypes.map(vt => (
            <button key={vt} onClick={() => setActiveVisitorType(vt)}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all whitespace-nowrap ${
                activeVisitorType === vt ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.highlight} border ${theme.border}`
              }`}>
              {vt}
            </button>
          ))}
        </div>

        {/* Rules for active type */}
        <div className="grid grid-cols-2 gap-4">
          {/* Toggle rules */}
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-2 uppercase tracking-wide`}>Rules — {activeVisitorType}</p>
            <div className="space-y-1.5">
              {Object.entries(currentRules.toggles).map(([rule, enabled]) => (
                <div key={rule} className={`flex items-center justify-between p-2 rounded-xl ${theme.secondaryBg}`}>
                  <div className="flex-1 mr-2">
                    <p className={`text-xs font-bold ${theme.highlight}`}>{rule}</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>{
                      ({
                        'Pre-registration required': 'Visitor must register in advance via app or website before arriving',
                        'Photo ID verification': 'Gate staff verifies visitor\'s government-issued photo ID before entry',
                        'Pickup authorization required': 'Parent must pre-authorize any non-guardian pickup via the app',
                        'Escort required': 'Visitor must be accompanied by a school staff member on campus',
                        'Areas allowed: Office': 'Visitor can access the admin office area',
                        'Areas allowed: Classroom': 'Visitor can access classroom areas (requires teacher permission)',
                        'Areas allowed: Campus': 'Visitor can move freely across the campus',
                        'PO/Work order mandatory': 'Vendor must have an active purchase order or work order to enter campus',
                        'Delivery only at store': 'Vendor delivery is restricted to the school store/receiving area only',
                        'Contractor badge required': 'Contractor must wear a visible identification badge while on campus',
                        'Work permit on file': 'Contractor must have a work permit uploaded and approved before campus entry',
                        'Safety gear check': 'Gate staff verifies contractor is wearing required safety gear (helmet, vest, etc.)',
                        'Fast-track entry': 'Government officials get expedited entry without standard waiting procedures',
                        'ID verification': 'Government official\'s credentials are verified and logged',
                        'Principal notification auto-trigger': 'Principal is immediately notified via push + SMS when a government official enters',
                        'No time limit': 'No maximum visit duration — visit ends when the official decides to leave',
                        'Escort assigned': 'A designated staff member escorts the official throughout their visit',
                        'Pre-registration optional': 'Alumni may optionally register in advance but walk-ins are also accepted',
                        'Alumni ID verification': 'Alumni must verify identity (batch year, roll number) at the gate',
                        'Event-based access only': 'Alumni can only visit during school events — no casual visits allowed',
                        'Campus tour allowed': 'Alumni can take a tour of the campus to revisit old classrooms and facilities',
                        'Classrooms restricted': 'Alumni cannot enter active classrooms — restricted to common areas only',
                      } as Record<string, string>)[rule] || 'Rule configuration for this visitor type'
                    }</p>
                  </div>
                  <SSAToggle on={enabled} onChange={() => setToggle(rule, !enabled)} theme={theme} />
                </div>
              ))}
            </div>
          </div>

          {/* Timing settings */}
          <div className="space-y-3">
            <p className={`text-[10px] font-bold ${theme.iconColor} uppercase tracking-wide`}>Timing — {activeVisitorType}</p>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Allowed From</p>
              <InputField value={currentRules.allowedFrom} onChange={v => setTimingField('allowedFrom', v)} theme={theme} type="time" />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Allowed To</p>
              <InputField value={currentRules.allowedTo} onChange={v => setTimingField('allowedTo', v)} theme={theme} type="time" />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>
                Max Visit Duration (minutes)
                {activeVisitorType === 'Government Official' && <span className="ml-1 text-amber-500">— 0 = no limit</span>}
              </p>
              <InputField value={currentRules.maxDuration} onChange={v => setTimingField('maxDuration', v)} theme={theme} type="number" placeholder="minutes (0 = no limit)" />
            </div>

            {/* Type-specific notes */}
            <div className={`p-2.5 rounded-xl ${theme.accentBg} border ${theme.border}`}>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Note</p>
              {activeVisitorType === 'Parent' && <p className={`text-[10px] ${theme.iconColor}`}>Parents picking up students go through the standard pickup verification flow (OTP / photo / RFID above).</p>}
              {activeVisitorType === 'Vendor / Supplier' && <p className={`text-[10px] ${theme.iconColor}`}>Vendor entry is logged and linked to Purchase Orders when available.</p>}
              {activeVisitorType === 'General Visitor' && <p className={`text-[10px] ${theme.iconColor}`}>Unregistered visitors must fill a digital form at the gate before entry is approved.</p>}
              {activeVisitorType === 'Contractor' && <p className={`text-[10px] ${theme.iconColor}`}>Work permits are digitally uploaded and verified before the contractor is allowed on campus.</p>}
              {activeVisitorType === 'Government Official' && <p className={`text-[10px] ${theme.iconColor}`}>Principal is auto-notified via push + SMS as soon as entry is logged for this type.</p>}
              {activeVisitorType === 'Alumni' && <p className={`text-[10px] ${theme.iconColor}`}>Alumni can be issued a digital alumni ID card via the app for faster future visits.</p>}
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Campus CCTV" subtitle="Parent access and recording settings for campus cameras" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Live CCTV Access for Parents</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Parents can view designated campus camera feeds via app</p>
            </div>
            <SSAToggle on={cctvParentAccess} onChange={() => setCctvParentAccess(!cctvParentAccess)} theme={theme} />
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>CCTV Recording Retention (days)</p>
            <InputField value={cctvRetentionDays} onChange={setCctvRetentionDays} theme={theme} type="number" placeholder="e.g. 30" />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

// ─── CERTIFICATE CONFIG MODULE ─────────────────────
function CertificateConfigModule({ theme }: { theme: Theme }) {
  const [templates, setTemplates] = useState([
    { name: 'Transfer Certificate (TC)', status: 'uploaded', lastModified: '15 Jan 2025' },
    { name: 'Character Certificate', status: 'uploaded', lastModified: '15 Jan 2025' },
    { name: 'Bonafide Certificate', status: 'uploaded', lastModified: '10 Feb 2025' },
    { name: 'Migration Certificate', status: 'pending', lastModified: '-' },
    { name: 'Sports Certificate', status: 'pending', lastModified: '-' },
    { name: 'Merit Certificate', status: 'uploaded', lastModified: '20 Jan 2025' },
  ]);
  const [features, setFeatures] = useState<Record<string, boolean>>({
    'Auto-numbering (sequential)': true,
    'Digital signature': true,
    'QR code verification': true,
    'Watermark on PDF': true,
    'Approval required before generation': true,
    'Duplicate certificate tracking': true,
  });
  const [approvalWorkflow, setApprovalWorkflow] = useState(['Class Teacher Initiates', 'Admin Verifies Details', 'Principal Approves', 'Certificate Generated']);

  return (
    <div className="space-y-4">
      <ModuleHeader title="Certificate Configuration" subtitle="Templates, auto-numbering, digital signatures, and approval workflow" theme={theme} />

      <SectionCard title="Certificate Templates" subtitle="Edit name, upload template, or delete — add new certificate types" theme={theme}>
        <div className="space-y-2">
          {templates.map((t, i) => (
            <div key={i} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <Award size={14} className={`${t.status === 'uploaded' ? 'text-emerald-500' : 'text-slate-400'} shrink-0`} />
                <input value={t.name} onChange={e => { const n = [...templates]; n[i] = { ...n[i], name: e.target.value }; setTemplates(n); }}
                  className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
              </div>
              <div className="flex items-center gap-2 ml-2">
                <select value={t.status} onChange={e => { const n = [...templates]; n[i] = { ...n[i], status: e.target.value }; setTemplates(n); }}
                  className={`text-[9px] px-1.5 py-0.5 rounded-lg font-bold ${t.status === 'uploaded' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'} border-0 outline-none`}>
                  <option value="uploaded">UPLOADED</option>
                  <option value="pending">PENDING</option>
                </select>
                <button className={`p-1 rounded-lg ${theme.buttonHover}`}><Upload size={12} className={theme.iconColor} /></button>
                <button onClick={() => setTemplates(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={12} /></button>
              </div>
            </div>
          ))}
          <button onClick={() => setTemplates(p => [...p, { name: '', status: 'pending', lastModified: '-' }])}
            className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
            <Plus size={12} /> Add Certificate Type
          </button>
        </div>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Certificate Features" subtitle="Security and workflow features applied to all certificate types" theme={theme}>
          <div className="space-y-2">
            {Object.entries(features).map(([feat, enabled]) => (
              <div key={feat} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{feat}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Auto-numbering (sequential)': 'Each certificate gets a unique sequential number (e.g., TC-2026-001)',
                      'Digital signature': 'Principal\'s digital signature is automatically embedded on generated certificates',
                      'QR code verification': 'A QR code is printed on each certificate for authenticity verification',
                      'Watermark on PDF': 'School watermark is overlaid on PDF certificates to prevent forgery',
                      'Approval required before generation': 'Certificates must be approved by designated authority before printing',
                      'Duplicate certificate tracking': 'System tracks if duplicate certificates are requested and logs the reason',
                    } as Record<string, string>)[feat]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setFeatures(p => ({ ...p, [feat]: !p[feat] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Approval Workflow" subtitle="Edit, reorder, or remove approval steps" theme={theme}>
          <div className="space-y-2">
            {approvalWorkflow.map((step, i) => (
              <div key={i} className={`flex items-center gap-2 p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <span className={`text-[10px] w-6 h-6 rounded-full ${theme.primary} text-white flex items-center justify-center font-bold shrink-0`}>{i + 1}</span>
                <input value={step} onChange={e => { const n = [...approvalWorkflow]; n[i] = e.target.value; setApprovalWorkflow(n); }}
                  className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                <button onClick={() => setApprovalWorkflow(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
              </div>
            ))}
            <button onClick={() => setApprovalWorkflow(p => [...p, ''])}
              className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
              <Plus size={12} /> Add Step
            </button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

// ─── LIBRARY CONFIG MODULE ─────────────────────────
function LibraryConfigModule({ theme }: { theme: Theme }) {
  const [maxBooks, setMaxBooks] = useState('2');
  const [loanPeriod, setLoanPeriod] = useState('14');
  const [finePerDay, setFinePerDay] = useState('2');
  const [libToggles, setLibToggles] = useState<Record<string, boolean>>({
    'Digital Library (eBooks)': false, 'Barcode/QR Scanning': true,
  });
  const [categories, setCategories] = useState(['Textbook', 'Reference', 'Fiction', 'Non-fiction', 'Periodical']);
  const [newCategory, setNewCategory] = useState('');

  return (
    <div className="space-y-4">
      <ModuleHeader title="Library Configuration" subtitle="Book limits, loan rules, fines, and digital library settings" theme={theme} />
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Loan Rules" subtitle="Limits and durations for book lending" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max Books per Student</p>
              <InputField value={maxBooks} onChange={setMaxBooks} theme={theme} type="number" />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Loan Period (days)</p>
              <InputField value={loanPeriod} onChange={setLoanPeriod} theme={theme} type="number" />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Fine per Day ({'\u20B9'})</p>
              <InputField value={finePerDay} onChange={setFinePerDay} theme={theme} type="number" />
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Library Features" subtitle="Toggle digital library and scanning" theme={theme}>
          <div className="space-y-2">
            {Object.entries(libToggles).map(([feat, enabled]) => (
              <div key={feat} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{feat}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Digital Library (eBooks)': 'Enable digital eBook library — students can read books online without physical copies',
                      'Barcode/QR Scanning': 'Use barcode or QR code scanner for quick book issue/return at the library counter',
                    } as Record<string, string>)[feat]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setLibToggles(p => ({ ...p, [feat]: !p[feat] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
      <SectionCard title="Book Categories" subtitle="Add or remove catalogue categories" theme={theme}>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {categories.map(c => (
            <span key={c} className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${theme.secondaryBg} text-xs font-medium ${theme.highlight}`}>
              {c}
              <button onClick={() => setCategories(p => p.filter(x => x !== c))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input value={newCategory} onChange={e => setNewCategory(e.target.value)} placeholder="Add category..."
            className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
          <button onClick={() => { if (newCategory.trim()) { setCategories(p => [...p, newCategory.trim()]); setNewCategory(''); } }}
            className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={14} /></button>
        </div>
      </SectionCard>
    </div>
  );
}

// ─── CANTEEN / MEAL CONFIG MODULE ──────────────────
function CanteenConfigModule({ theme }: { theme: Theme }) {
  const [menuCycle, setMenuCycle] = useState('Weekly');
  const [canteenToggles, setCanteenToggles] = useState<Record<string, boolean>>({
    'Pre-order System': true, 'Wallet / Prepaid': false, 'Allergy Tracking': true,
  });
  const [mealTypes, setMealTypes] = useState<Record<string, boolean>>({
    Breakfast: true, Lunch: true, Snack: true,
  });
  const [preschoolMealPlan, setPreschoolMealPlan] = useState('None');
  const [dietaryPrefTracking, setDietaryPrefTracking] = useState(true);

  return (
    <div className="space-y-4">
      <ModuleHeader title="Canteen / Meal Configuration" subtitle="Pre-orders, wallet, allergy tracking, and meal scheduling" theme={theme} />
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Canteen Features" subtitle="Ordering, wallet, and dietary safety features for school canteen" theme={theme}>
          <div className="space-y-2">
            {Object.entries(canteenToggles).map(([feat, enabled]) => (
              <div key={feat} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{feat}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Pre-order System': 'Parents/students can order meals in advance via app — reduces canteen queues',
                      'Wallet / Prepaid': 'Students use a prepaid digital wallet to pay at canteen — no cash handling',
                      'Allergy Tracking': 'Track student allergies and auto-flag menu items that contain allergens',
                    } as Record<string, string>)[feat]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setCanteenToggles(p => ({ ...p, [feat]: !p[feat] }))} theme={theme} />
              </div>
            ))}
            <div className="pt-1">
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Menu Cycle</p>
              <SelectField options={['Weekly', 'Bi-weekly', 'Monthly']} value={menuCycle} onChange={setMenuCycle} theme={theme} />
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Meal Types" subtitle="Which meals does the school canteen serve?" theme={theme}>
          <div className="space-y-2">
            {Object.entries(mealTypes).map(([meal, enabled]) => (
              <div key={meal} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{meal}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Breakfast': 'Morning meal served before school hours (typically 7:30–8:30 AM)',
                      'Lunch': 'Mid-day meal served during lunch break',
                      'Snack': 'Light snack or tiffin served during short break',
                    } as Record<string, string>)[meal]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setMealTypes(p => ({ ...p, [meal]: !p[meal] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Preschool Meal Plan" subtitle="Meal plan type for nursery and kindergarten students" theme={theme}>
        <div className="space-y-3">
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Meal Plan Type</p>
            <SelectField options={['None', 'Snacks Only', 'Breakfast + Lunch', 'Full Day Meals']} value={preschoolMealPlan} onChange={setPreschoolMealPlan} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Dietary Preferences Tracking</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Record dietary restrictions or preferences per preschool child</p>
            </div>
            <SSAToggle on={dietaryPrefTracking} onChange={() => setDietaryPrefTracking(!dietaryPrefTracking)} theme={theme} />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

// ─── HOSTEL CONFIG MODULE ──────────────────────────
function HostelConfigModule({ theme }: { theme: Theme }) {
  const [curfewTime, setCurfewTime] = useState('21:00');
  const [hostelToggles, setHostelToggles] = useState<Record<string, boolean>>({
    'Mess Management': true, 'Visitor Log for Hostellers': true,
    'Fee Integration with Main Fee': true, 'Warden Assignment': true,
  });
  const [roomTypes, setRoomTypes] = useState(['Single', 'Double', 'Dormitory']);
  const [newRoomType, setNewRoomType] = useState('');

  return (
    <div className="space-y-4">
      <ModuleHeader title="Hostel Configuration" subtitle="Room types, mess, visitor log, warden, and curfew settings" theme={theme} />
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Hostel Features" subtitle="Core hostel management features for boarding students" theme={theme}>
          <div className="space-y-2">
            {Object.entries(hostelToggles).map(([feat, enabled]) => (
              <div key={feat} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{feat}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Mess Management': 'Manage daily mess menu, meal schedules, and dietary preferences for hostellers',
                      'Visitor Log for Hostellers': 'Track all visitors to the hostel — log entry time, purpose, and exit time',
                      'Fee Integration with Main Fee': 'Hostel fees are combined with school fees in a single invoice to parents',
                      'Warden Assignment': 'Assign wardens to specific floors or wings — wardens get access to their students\' data',
                    } as Record<string, string>)[feat]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setHostelToggles(p => ({ ...p, [feat]: !p[feat] }))} theme={theme} />
              </div>
            ))}
            <div className="pt-1">
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Curfew Time</p>
              <InputField value={curfewTime} onChange={setCurfewTime} theme={theme} type="time" />
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Room Types" subtitle="Add or remove accommodation categories" theme={theme}>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {roomTypes.map(r => (
              <span key={r} className={`flex items-center gap-1 px-3 py-1.5 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.highlight}`}>
                {r}
                <button onClick={() => setRoomTypes(p => p.filter(x => x !== r))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={newRoomType} onChange={e => setNewRoomType(e.target.value)} placeholder="Add room type..."
              className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
            <button onClick={() => { if (newRoomType.trim()) { setRoomTypes(p => [...p, newRoomType.trim()]); setNewRoomType(''); } }}
              className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={14} /></button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

// ─── INVENTORY & ASSET CONFIG MODULE ───────────────
function InventoryConfigModule({ theme }: { theme: Theme }) {
  const [lowStockThreshold, setLowStockThreshold] = useState('10');
  const [invToggles, setInvToggles] = useState<Record<string, boolean>>({
    'Barcode/QR Asset Tagging': true, 'Low Stock Alerts': true,
    'Depreciation Tracking': false,
  });
  const [assetCategories, setAssetCategories] = useState(['Furniture', 'Electronics', 'Lab Equipment', 'Sports', 'Books', 'Vehicles']);
  const [newAssetCat, setNewAssetCat] = useState('');
  const [autoApproveThreshold, setAutoApproveThreshold] = useState('5000');

  return (
    <div className="space-y-4">
      <ModuleHeader title="Inventory & Asset Configuration" subtitle="Asset tagging, stock alerts, purchase workflows, and depreciation" theme={theme} />
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Inventory Features" subtitle="Asset tracking, stock alerts, and depreciation management" theme={theme}>
          <div className="space-y-2">
            {Object.entries(invToggles).map(([feat, enabled]) => (
              <div key={feat} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{feat}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Barcode/QR Asset Tagging': 'Each asset gets a unique barcode/QR label — scan to view details, location, and condition',
                      'Low Stock Alerts': 'Auto-alert admin when consumable items (stationery, lab supplies) fall below threshold',
                      'Depreciation Tracking': 'Automatically calculate asset depreciation over time for accounting and budgeting',
                    } as Record<string, string>)[feat]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setInvToggles(p => ({ ...p, [feat]: !p[feat] }))} theme={theme} />
              </div>
            ))}
            <div className="pt-1">
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Low Stock Alert Threshold</p>
              <InputField value={lowStockThreshold} onChange={setLowStockThreshold} theme={theme} type="number" />
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Asset Categories" subtitle="Add or remove inventory categories" theme={theme}>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {assetCategories.map(c => (
              <span key={c} className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${theme.secondaryBg} text-xs font-medium ${theme.highlight}`}>
                {c}
                <button onClick={() => setAssetCategories(p => p.filter(x => x !== c))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={newAssetCat} onChange={e => setNewAssetCat(e.target.value)} placeholder="Add category..."
              className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
            <button onClick={() => { if (newAssetCat.trim()) { setAssetCategories(p => [...p, newAssetCat.trim()]); setNewAssetCat(''); } }}
              className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={14} /></button>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Purchase Approval Tiers" subtitle="Tiered approval chains based on purchase value" theme={theme}>
        <div className="space-y-3">
          <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight} mb-1`}>Purchase &lt; {'\u20B9'}50,000</p>
            <div className="flex items-center gap-2 flex-wrap">
              {['Admin', 'Principal'].map((step, i) => (
                <React.Fragment key={step}>
                  <span className={`text-[10px] px-2.5 py-1 rounded-lg ${theme.accentBg} ${theme.iconColor} font-bold`}>{step}</span>
                  {i < 1 && <span className={`text-[10px] ${theme.iconColor}`}>{'\u2192'}</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight} mb-1`}>Purchase &gt; {'\u20B9'}50,000</p>
            <div className="flex items-center gap-2 flex-wrap">
              {['Principal', 'Trust / Management'].map((step, i) => (
                <React.Fragment key={step}>
                  <span className={`text-[10px] px-2.5 py-1 rounded-lg ${theme.accentBg} ${theme.iconColor} font-bold`}>{step}</span>
                  {i < 1 && <span className={`text-[10px] ${theme.iconColor}`}>{'\u2192'}</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Auto-Approve Threshold ({'\u20B9'}) — purchases below this are auto-approved</p>
            <InputField value={autoApproveThreshold} onChange={setAutoApproveThreshold} theme={theme} type="number" placeholder="e.g. 5000" />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

// ─── COMPLIANCE & QUALITY CONFIG MODULE ────────────
function ComplianceConfigModule({ theme }: { theme: Theme }) {
  const [framework, setFramework] = useState('SQAAF');
  const [auditSchedule, setAuditSchedule] = useState('Quarterly');
  const [compToggles, setCompToggles] = useState<Record<string, boolean>>({
    'Auto-collect Data from Modules': true, 'Document Checklist': true,
  });
  const [domains, setDomains] = useState([
    { name: 'Curricular Aspects', score: '3.5/4' },
    { name: 'Teaching-Learning', score: '3.2/4' },
    { name: 'Infrastructure', score: '3.0/4' },
    { name: 'Student Support', score: '2.8/4' },
    { name: 'Governance & Leadership', score: '3.4/4' },
  ]);

  return (
    <div className="space-y-4">
      <ModuleHeader title="Compliance & Quality Configuration" subtitle="Assessment frameworks, audit schedules, and compliance domains" theme={theme} />
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Framework & Schedule" subtitle="Assessment standard and audit frequency" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Assessment Framework</p>
              <SelectField options={['SQAAF', 'NAAC', 'Custom']} value={framework} onChange={setFramework} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Audit Schedule</p>
              <SelectField options={['Quarterly', 'Bi-annual', 'Annual']} value={auditSchedule} onChange={setAuditSchedule} theme={theme} />
            </div>
            {Object.entries(compToggles).map(([feat, enabled]) => (
              <div key={feat} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{feat}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Auto-collect Data from Modules': 'Automatically pull compliance data from attendance, fees, academics etc. — no manual entry',
                      'Document Checklist': 'Maintain a checklist of required documents for each compliance domain (NOCs, licenses, etc.)',
                    } as Record<string, string>)[feat]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setCompToggles(p => ({ ...p, [feat]: !p[feat] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Compliance Domains" subtitle="Edit domain names and scores — add or remove" theme={theme}>
          <div className="space-y-2">
            {domains.map((d, i) => (
              <div key={i} className={`flex items-center gap-2 p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <input value={d.name} onChange={e => { const n = [...domains]; n[i] = { ...n[i], name: e.target.value }; setDomains(n); }}
                  className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-medium ${theme.highlight} outline-none`} />
                <input value={d.score} onChange={e => { const n = [...domains]; n[i] = { ...n[i], score: e.target.value }; setDomains(n); }}
                  className={`w-20 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center font-bold ${theme.iconColor} outline-none`} />
                <button onClick={() => setDomains(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
              </div>
            ))}
            <button onClick={() => setDomains(p => [...p, { name: '', score: '' }])}
              className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
              <Plus size={12} /> Add Domain
            </button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

// ─── HOMEWORK & ASSIGNMENT CONFIG MODULE ───────────
function HomeworkConfigModule({ theme }: { theme: Theme }) {
  const [submissionMode, setSubmissionMode] = useState('Both');
  const [hwGracePeriod, setHwGracePeriod] = useState('2');
  const [maxFileSize, setMaxFileSize] = useState('10');
  const [hwToggles, setHwToggles] = useState<Record<string, boolean>>({
    'Allow Late Submission': true, 'Parent Notification on Assignment': true,
    'Plagiarism Check': false,
  });

  return (
    <div className="space-y-4">
      <ModuleHeader title="Homework & Assignment Configuration" subtitle="Submission modes, late policies, notifications, and plagiarism checks" theme={theme} />
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Submission Settings" subtitle="Mode, file limits, and late policy" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Submission Mode</p>
              <SelectField options={['Online Only', 'Offline Only', 'Both']} value={submissionMode} onChange={setSubmissionMode} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Late Submission Grace Period (days)</p>
              <InputField value={hwGracePeriod} onChange={setHwGracePeriod} theme={theme} type="number" />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max File Upload Size (MB)</p>
              <InputField value={maxFileSize} onChange={setMaxFileSize} theme={theme} type="number" />
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Assignment Features" subtitle="Notifications, late policy, and quality checks for homework" theme={theme}>
          <div className="space-y-2">
            {Object.entries(hwToggles).map(([feat, enabled]) => (
              <div key={feat} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{feat}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Allow Late Submission': 'Students can submit homework after the deadline within the grace period',
                      'Parent Notification on Assignment': 'Parents receive a notification when a new assignment is posted for their child',
                      'Plagiarism Check': 'System checks submitted assignments for copied content from other students',
                    } as Record<string, string>)[feat]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setHwToggles(p => ({ ...p, [feat]: !p[feat] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

// ─── ENQUIRY & ADMISSION CONFIG MODULE ─────────────
function EnquiryAdmissionConfigModule({ theme }: { theme: Theme }) {
  const [admissionMode, setAdmissionMode] = useState('Both Online + Offline');
  const [applicationFee, setApplicationFee] = useState('500');
  const [enqToggles, setEnqToggles] = useState<Record<string, boolean>>({
    'Auto-assign Follow-ups': true, 'Online Application Form': true,
    'Auto-generate Admission Number': true, 'Document Upload Required': true,
  });
  const [photoMandatory, setPhotoMandatory] = useState(true);
  const [leadSources, setLeadSources] = useState(['Website', 'Walk-in', 'Phone', 'Social Media', 'Referral', 'Fair']);
  const [newLeadSource, setNewLeadSource] = useState('');

  return (
    <div className="space-y-4">
      <ModuleHeader title="Enquiry & Admission Configuration" subtitle="Lead sources, follow-ups, application forms, and admission settings" theme={theme} />
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Admission Settings" subtitle="Mode, fees, and automation" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Admission Mode</p>
              <SelectField options={['Online Only', 'Offline Only', 'Both Online + Offline']} value={admissionMode} onChange={setAdmissionMode} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Application Fee ({'\u20B9'})</p>
              <InputField value={applicationFee} onChange={setApplicationFee} theme={theme} type="number" />
            </div>
            {Object.entries(enqToggles).map(([feat, enabled]) => (
              <div key={feat} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{feat}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Auto-assign Follow-ups': 'System auto-assigns follow-up tasks to counselors based on enquiry source and age',
                      'Online Application Form': 'Parents can fill the admission application form online from school website',
                      'Auto-generate Admission Number': 'System auto-generates unique admission number when a student is admitted',
                      'Document Upload Required': 'Parents must upload required documents (birth certificate, photos, etc.) during admission',
                    } as Record<string, string>)[feat]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setEnqToggles(p => ({ ...p, [feat]: !p[feat] }))} theme={theme} />
              </div>
            ))}
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Photo Mandatory at Admission</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Student photo required to complete admission process</p>
              </div>
              <SSAToggle on={photoMandatory} onChange={() => setPhotoMandatory(!photoMandatory)} theme={theme} />
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Lead Sources" subtitle="Add or remove enquiry sources" theme={theme}>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {leadSources.map(s => (
              <span key={s} className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${theme.secondaryBg} text-xs font-medium ${theme.highlight}`}>
                <CheckCircle size={10} className="text-emerald-500" /> {s}
                <button onClick={() => setLeadSources(p => p.filter(x => x !== s))} className="text-red-400 hover:text-red-600 ml-1"><X size={10} /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={newLeadSource} onChange={e => setNewLeadSource(e.target.value)} placeholder="Add source..."
              className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
            <button onClick={() => { if (newLeadSource.trim()) { setLeadSources(p => [...p, newLeadSource.trim()]); setNewLeadSource(''); } }}
              className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={14} /></button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

// ─── ONLINE PAYMENT CONFIG MODULE ──────────────────
function OnlinePaymentConfigModule({ theme }: { theme: Theme }) {
  const [gateway, setGateway] = useState('Razorpay');
  const [refundPolicy, setRefundPolicy] = useState('Manual');
  const [convenienceFeeAmt, setConvenienceFeeAmt] = useState('0');
  const [payToggles, setPayToggles] = useState<Record<string, boolean>>({
    'Auto-receipt Generation': true, 'Partial Payment Allowed': false,
    'Convenience Fee': false,
  });

  return (
    <div className="space-y-4">
      <ModuleHeader title="Online Payment Configuration" subtitle="Payment gateway, receipts, partial payments, and refund policy" theme={theme} />
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Gateway & Policy" subtitle="Payment provider and refund settings" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Payment Gateway</p>
              <SelectField options={['Razorpay', 'PayU', 'CCAvenue', 'Cashfree']} value={gateway} onChange={setGateway} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Refund Policy</p>
              <SelectField options={['Manual', 'Auto']} value={refundPolicy} onChange={setRefundPolicy} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Convenience Fee Amount ({'\u20B9'})</p>
              <InputField value={convenienceFeeAmt} onChange={setConvenienceFeeAmt} theme={theme} type="number" />
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Payment Features" subtitle="Receipt generation, partial payments, and convenience fees" theme={theme}>
          <div className="space-y-2">
            {Object.entries(payToggles).map(([feat, enabled]) => (
              <div key={feat} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{feat}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Auto-receipt Generation': 'System automatically generates a payment receipt and sends it to parents after successful payment',
                      'Partial Payment Allowed': 'Parents can pay a portion of the total fee instead of the full amount at once',
                      'Convenience Fee': 'Add a small processing fee on online payments to cover payment gateway charges',
                    } as Record<string, string>)[feat]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setPayToggles(p => ({ ...p, [feat]: !p[feat] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

// ─── DATA MIGRATION MODULE ─────────────────────────
function DataMigrationModule({ theme }: { theme: Theme }) {
  const [imports] = useState([
    { type: 'Students', template: 'students-template.xlsx', status: 'not-started', records: 0, errors: 0 },
    { type: 'Staff', template: 'staff-template.xlsx', status: 'not-started', records: 0, errors: 0 },
    { type: 'Fee Records', template: 'fees-template.xlsx', status: 'not-started', records: 0, errors: 0 },
    { type: 'Library Books', template: 'library-template.xlsx', status: 'not-started', records: 0, errors: 0 },
    { type: 'Transport Data', template: 'transport-template.xlsx', status: 'not-started', records: 0, errors: 0 },
    { type: 'Attendance History', template: 'attendance-template.xlsx', status: 'not-started', records: 0, errors: 0 },
  ]);

  return (
    <div className="space-y-4">
      <h2 className={`text-lg font-bold ${theme.highlight}`}>Data Migration</h2>
      <p className={`text-xs ${theme.iconColor}`}>Import existing data from CSV/Excel files</p>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3">
        <AlertTriangle size={16} className="text-blue-500 mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-bold text-blue-800">Before You Import</p>
          <p className="text-xs text-blue-700 mt-1">Download the template for each data type, fill it following the format exactly, then upload. Validation runs automatically. You can rollback any import within 24 hours.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {imports.map((imp, i) => (
          <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className={`text-sm font-bold ${theme.highlight}`}>{imp.type}</h3>
              <span className={`text-[9px] px-2 py-0.5 rounded-lg font-bold ${
                imp.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                imp.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
              }`}>
                {imp.status === 'not-started' ? 'NOT STARTED' : imp.status.toUpperCase()}
              </span>
            </div>

            <button className={`w-full flex items-center justify-center gap-2 p-2.5 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} mb-2 transition-all`}>
              <Download size={14} className={theme.iconColor} />
              <span className={`text-xs font-bold ${theme.iconColor}`}>Download Template</span>
            </button>

            <div className={`w-full border-2 border-dashed ${theme.border} rounded-xl p-4 text-center cursor-pointer ${theme.buttonHover} transition-all`}>
              <Upload size={20} className={`mx-auto mb-1 ${theme.iconColor}`} />
              <p className={`text-[10px] ${theme.iconColor}`}>Drop CSV/Excel file here or click to browse</p>
            </div>

            {imp.records > 0 && (
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className={theme.iconColor}>Records: {imp.records}</span>
                  {imp.errors > 0 && <span className="text-red-500">Errors: {imp.errors}</span>}
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200">
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: `${((imp.records - imp.errors) / imp.records) * 100}%` }} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── OTP VERIFICATION MODAL ─────────────────────────
function OTPVerificationModal({ theme, onClose, onVerify }: { theme: Theme; onClose: () => void; onVerify: () => void }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [verified, setVerified] = useState(false);

  React.useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [timer]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleVerify = () => {
    setVerified(true);
    setTimeout(() => {
      onVerify();
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className={`${theme.cardBg} rounded-2xl shadow-2xl border ${theme.border} w-full max-w-md p-6`}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
            <Lock size={18} className="text-rose-600" />
          </div>
          <div>
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Critical Change &mdash; OTP Required</h3>
            <p className={`text-[10px] ${theme.iconColor}`}>This field is locked by Super Admin</p>
          </div>
        </div>

        {/* Info */}
        <div className={`${theme.secondaryBg} rounded-xl p-3 mb-4`}>
          <p className={`text-xs ${theme.highlight}`}>An OTP has been sent to the registered Trustee/Principal.</p>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5">
              <Phone size={10} className={theme.iconColor} />
              <span className={`text-[10px] ${theme.iconColor}`}>+91 ****43210</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail size={10} className={theme.iconColor} />
              <span className={`text-[10px] ${theme.iconColor}`}>p****@school.edu</span>
            </div>
          </div>
        </div>

        {verified ? (
          <div className="text-center py-6">
            <CheckCircle size={40} className="text-emerald-500 mx-auto mb-2" />
            <p className={`text-sm font-bold text-emerald-700`}>OTP Verified Successfully</p>
            <p className={`text-[10px] ${theme.iconColor} mt-1`}>Proceeding with the change...</p>
          </div>
        ) : (
          <>
            {/* OTP Input */}
            <div className="mb-4">
              <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-2`}>Enter 6-digit OTP</p>
              <div className="flex gap-2 justify-center">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOtpChange(i, e.target.value)}
                    className={`w-10 h-12 text-center text-lg font-bold rounded-xl border-2 ${digit ? 'border-rose-400 bg-rose-50' : theme.border} ${theme.inputBg} ${theme.highlight} outline-none focus:ring-2 focus:ring-rose-300`}
                  />
                ))}
              </div>
            </div>

            {/* Timer */}
            <div className="text-center mb-4">
              {timer > 0 ? (
                <p className={`text-[10px] ${theme.iconColor}`}>Resend OTP in <span className="font-bold text-rose-600">0:{timer.toString().padStart(2, '0')}</span></p>
              ) : (
                <button className="text-[10px] font-bold text-rose-600 underline" onClick={() => setTimer(30)}>Resend OTP</button>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button onClick={onClose}
                className={`flex-1 px-4 py-2.5 ${theme.secondaryBg} rounded-xl text-xs font-bold ${theme.highlight}`}>
                Cancel
              </button>
              <button onClick={handleVerify}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-500 text-white rounded-xl text-xs font-bold`}>
                <Key size={12} /> Verify &amp; Proceed
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── CRITICAL LOCKS MODULE ──────────────────────────
function CriticalLocksModule({ theme }: { theme: Theme }) {
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [lockFields] = useState([
    { field: 'Fee Structure Changes', description: 'Modify fee heads, amounts', locked: true, setBy: 'Super Admin (Onboarding)', lastOTP: '18 Feb 2026, 2:30 PM' },
    { field: 'Student Profile Deletion', description: 'Permanently delete student records', locked: true, setBy: 'Super Admin (Onboarding)', lastOTP: '17 Feb 2026, 11:15 AM' },
    { field: 'Staff Profile Deletion', description: 'Permanently delete staff records', locked: true, setBy: 'Super Admin (Onboarding)', lastOTP: 'Never' },
    { field: 'Payment Mode Changes', description: 'Add/remove payment methods', locked: false, setBy: '-', lastOTP: '-' },
    { field: 'Concession Approval (>25%)', description: 'Approve large concessions', locked: false, setBy: '-', lastOTP: '-' },
    { field: 'Permission/Role Changes', description: 'Modify role permissions', locked: true, setBy: 'Super Admin (Onboarding)', lastOTP: '16 Feb 2026, 4:00 PM' },
    { field: 'Transport Route Deletion', description: 'Delete transport routes', locked: false, setBy: '-', lastOTP: '-' },
    { field: 'Data Export/Migration', description: 'Export or migrate school data', locked: false, setBy: '-', lastOTP: '-' },
    { field: 'Audit Log Access', description: 'View detailed audit logs', locked: true, setBy: 'Super Admin (Onboarding)', lastOTP: '18 Feb 2026, 9:00 AM' },
    { field: 'Academic Calendar Changes', description: 'Modify academic calendar dates', locked: true, setBy: 'Super Admin (Onboarding)', lastOTP: 'Never' },
  ]);

  const [lockEvents] = useState([
    { time: '18 Feb 2026, 2:30 PM', event: 'Fee structure edit attempted', action: 'OTP sent', result: 'Verified by Principal', status: 'success' },
    { time: '18 Feb 2026, 9:00 AM', event: 'Audit log access requested', action: 'OTP sent', result: 'Verified by Trustee', status: 'success' },
    { time: '17 Feb 2026, 3:45 PM', event: 'Student deletion attempted', action: 'OTP sent', result: 'Cancelled by user', status: 'cancelled' },
    { time: '17 Feb 2026, 11:15 AM', event: 'Student profile deletion', action: 'OTP sent', result: 'Verified by Principal', status: 'success' },
    { time: '16 Feb 2026, 4:00 PM', event: 'Role permission change', action: 'OTP sent', result: 'Verified by Trustee', status: 'success' },
    { time: '15 Feb 2026, 2:00 PM', event: 'Fee head modification attempted', action: 'OTP sent', result: 'OTP expired (not entered)', status: 'expired' },
  ]);

  const lockedCount = lockFields.filter(f => f.locked).length;

  return (
    <div className="space-y-4">
      <h2 className={`text-lg font-bold ${theme.highlight}`}>Critical Field Locks</h2>
      <p className={`text-xs ${theme.iconColor}`}>Manage locked fields that require OTP verification for changes</p>

      {/* Info Banner */}
      <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-4 flex items-start gap-3">
        <Lock size={20} className="text-rose-500 mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-bold text-rose-800">Field Locking is Configured by Super Admin</p>
          <p className="text-xs text-rose-700 mt-1">
            Locked fields require OTP verification from the registered Trustee/Principal before any changes can be made.
            Only the Saaras Super Admin can add or remove field locks during onboarding or via support request.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={Lock} label="Fields Locked" value={String(lockedCount)} color="bg-rose-500" theme={theme} />
        <StatCard icon={Key} label="OTP Verifications" value="5" color="bg-emerald-500" theme={theme} />
        <StatCard icon={AlertTriangle} label="Failed / Expired" value="1" color="bg-amber-500" theme={theme} />
        <StatCard icon={Shield} label="Auth Contact" value="Trustee" color="bg-indigo-500" theme={theme} />
      </div>

      {/* Lock Status Table */}
      <SectionCard title="Lockable Fields" subtitle="Current lock status for all critical fields" theme={theme}>
        <div className="space-y-1.5">
          {lockFields.map(f => (
            <div key={f.field} className={`flex items-center justify-between p-3 rounded-xl ${f.locked ? 'bg-rose-50 border border-rose-200' : theme.secondaryBg} transition-all`}>
              <div className="flex items-center gap-3 flex-1">
                {f.locked ? <Lock size={14} className="text-rose-500 shrink-0" /> : <Key size={14} className="text-slate-300 shrink-0" />}
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${theme.highlight}`}>{f.field}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${f.locked ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-500'}`}>
                      {f.locked ? 'LOCKED' : 'UNLOCKED'}
                    </span>
                  </div>
                  <p className={`text-[10px] ${theme.iconColor}`}>{f.description}</p>
                  {f.locked && (
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`text-[9px] ${theme.iconColor}`}>Set by: <strong>{f.setBy}</strong></span>
                      <span className={`text-[9px] ${theme.iconColor}`}>Last OTP: <strong>{f.lastOTP}</strong></span>
                    </div>
                  )}
                </div>
              </div>
              {f.locked && (
                <button onClick={() => setShowOTPModal(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-100 border border-rose-300 text-rose-700 rounded-lg text-[10px] font-bold hover:bg-rose-200 transition-all">
                  <Key size={10} /> Request Unlock
                </button>
              )}
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Recent Lock Events */}
      <SectionCard title="Recent Lock Events" subtitle="OTP verification history for critical field changes" theme={theme}>
        <div className={`rounded-xl border ${theme.border} overflow-hidden`}>
          <table className="w-full text-xs">
            <thead className={theme.secondaryBg}>
              <tr>
                {['Time', 'Event', 'Action', 'Result', 'Status'].map(h => (
                  <th key={h} className={`text-left px-3 py-2.5 font-bold ${theme.iconColor} uppercase text-[10px]`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lockEvents.map((evt, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className={`px-3 py-2.5 ${theme.iconColor} text-[10px] whitespace-nowrap`}>{evt.time}</td>
                  <td className={`px-3 py-2.5 font-medium ${theme.highlight}`}>{evt.event}</td>
                  <td className={`px-3 py-2.5 ${theme.iconColor}`}>{evt.action}</td>
                  <td className={`px-3 py-2.5 ${theme.highlight}`}>{evt.result}</td>
                  <td className="px-3 py-2.5">
                    <span className={`text-[9px] px-2 py-0.5 rounded-lg font-bold ${
                      evt.status === 'success' ? 'bg-emerald-100 text-emerald-700' :
                      evt.status === 'cancelled' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {evt.status === 'success' ? 'VERIFIED' : evt.status === 'cancelled' ? 'CANCELLED' : 'EXPIRED'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* Master Contact Info */}
      <SectionCard title="Authentication Contact" subtitle="OTP is sent to this contact for all locked field changes" theme={theme}>
        <div className={`${theme.secondaryBg} rounded-xl p-4`}>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1`}>Role</p>
              <p className={`text-xs font-bold ${theme.highlight}`}>Trustee</p>
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1`}>Phone</p>
              <div className="flex items-center gap-1.5">
                <Phone size={10} className={theme.iconColor} />
                <p className={`text-xs ${theme.highlight}`}>+91 98765 43210</p>
              </div>
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1`}>Email</p>
              <div className="flex items-center gap-1.5">
                <Mail size={10} className={theme.iconColor} />
                <p className={`text-xs ${theme.highlight}`}>principal@dpsahmedabad.edu</p>
              </div>
            </div>
          </div>
          <p className={`text-[10px] ${theme.iconColor} mt-3`}>To change the authentication contact, please contact Saaras Support with a formal request from the school authority.</p>
        </div>
      </SectionCard>

      {/* OTP Modal */}
      {showOTPModal && (
        <OTPVerificationModal
          theme={theme}
          onClose={() => setShowOTPModal(false)}
          onVerify={() => setShowOTPModal(false)}
        />
      )}
    </div>
  );
}

// ─── AUDIT LOG MODULE ──────────────────────────────
function AuditLogModule({ theme }: { theme: Theme }) {
  const [filterModule, setFilterModule] = useState('All');
  const [logs] = useState([
    { date: '18 Feb 2026 14:30', action: 'Updated', module: 'Fees', details: 'Changed Class 9-10 Tuition Fee: 5000 to 5500', user: 'admin@school.com' },
    { date: '18 Feb 2026 11:15', action: 'Created', module: 'Transport', details: 'Added Route D: 10 stops, 45 capacity', user: 'admin@school.com' },
    { date: '17 Feb 2026 16:45', action: 'Updated', module: 'Leave', details: 'Modified approval chain: Added VP as Level 2', user: 'admin@school.com' },
    { date: '17 Feb 2026 10:20', action: 'Uploaded', module: 'Exams', details: 'Report card template: CBSE standard v2', user: 'admin@school.com' },
    { date: '16 Feb 2026 09:00', action: 'Updated', module: 'Communication', details: 'DM permission: Parent to Teacher set to ON', user: 'admin@school.com' },
    { date: '15 Feb 2026 15:30', action: 'Created', module: 'HR', details: 'New department: Sports', user: 'admin@school.com' },
    { date: '15 Feb 2026 11:00', action: 'Updated', module: 'Attendance', details: 'Grace period changed: 10 min to 15 min', user: 'admin@school.com' },
    { date: '14 Feb 2026 14:00', action: 'Deleted', module: 'Transport', details: 'Removed Route X (no students assigned)', user: 'admin@school.com' },
  ]);

  const filteredLogs = filterModule === 'All' ? logs : logs.filter(l => l.module === filterModule);
  const allModules = ['All', ...Array.from(new Set(logs.map(l => l.module)))];

  return (
    <div className="space-y-4">
      <h2 className={`text-lg font-bold ${theme.highlight}`}>Audit Log</h2>
      <p className={`text-xs ${theme.iconColor}`}>Read-only view of configuration changes (limited subset for SSA)</p>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-start gap-2">
        <Lock size={14} className="text-amber-500 mt-0.5 shrink-0" />
        <p className="text-xs text-amber-700">Full audit logs with IP addresses and before/after values are accessible only to Saaras Account Manager. You can view a summary of recent changes here.</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          {allModules.map(m => (
            <button key={m} onClick={() => setFilterModule(m)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filterModule === m ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.highlight}`}`}>
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden`}>
        <table className="w-full text-xs">
          <thead className={theme.secondaryBg}>
            <tr>
              {['Date / Time', 'Action', 'Module', 'Details', 'User'].map(h => (
                <th key={h} className={`text-left px-4 py-3 font-bold ${theme.iconColor} uppercase text-[10px]`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log, i) => (
              <tr key={i} className={`border-t ${theme.border}`}>
                <td className={`px-4 py-3 ${theme.iconColor} text-[10px] whitespace-nowrap`}>{log.date}</td>
                <td className="px-4 py-3">
                  <span className={`text-[9px] px-2 py-0.5 rounded-lg font-bold ${
                    log.action === 'Created' ? 'bg-emerald-100 text-emerald-700' :
                    log.action === 'Updated' ? 'bg-blue-100 text-blue-700' :
                    log.action === 'Deleted' ? 'bg-red-100 text-red-700' : 'bg-purple-100 text-purple-700'
                  }`}>{log.action}</span>
                </td>
                <td className={`px-4 py-3 font-bold ${theme.highlight}`}>{log.module}</td>
                <td className={`px-4 py-3 ${theme.highlight}`}>{log.details}</td>
                <td className={`px-4 py-3 ${theme.iconColor} text-[10px]`}>{log.user}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── PARENT PORTAL CONFIG MODULE ──────────────────
function ParentPortalConfigModule({ theme }: { theme: Theme }) {
  const [multiChild, setMultiChild] = useState(true);
  const [feePayment, setFeePayment] = useState(true);
  const [ptmBooking, setPtmBooking] = useState(true);
  const [leaveApplication, setLeaveApplication] = useState(true);
  const [transportTracking, setTransportTracking] = useState(true);
  const [commMode, setCommMode] = useState('Full Two-Way');
  const [reportCardAccess, setReportCardAccess] = useState(true);
  const [reportCardVisibility, setReportCardVisibility] = useState('After Principal Approval');

  return (
    <div className="space-y-4">
      <ModuleHeader title="Parent Portal Configuration" subtitle="Control what parents can access and do through their portal" theme={theme} />

      <SectionCard title="Portal Features" subtitle="Toggle features available to parents" theme={theme}>
        <div className="space-y-2">
          {[
            { label: 'Multi-child support (family account with child toggle)', value: multiChild, setter: setMultiChild },
            { label: 'Fee payment via portal', value: feePayment, setter: setFeePayment },
            { label: 'PTM booking', value: ptmBooking, setter: setPtmBooking },
            { label: 'Leave application (for child)', value: leaveApplication, setter: setLeaveApplication },
            { label: 'Transport tracking (live bus location)', value: transportTracking, setter: setTransportTracking },
          ].map(item => (
            <div key={item.label} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <span className={`text-xs ${theme.highlight}`}>{item.label}</span>
              <SSAToggle on={item.value} onChange={() => item.setter(!item.value)} theme={theme} />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Report Card Access" subtitle="Control when parents can view report cards" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Report Card Access via Portal</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Parents can download report cards from the parent portal</p>
            </div>
            <SSAToggle on={reportCardAccess} onChange={() => setReportCardAccess(!reportCardAccess)} theme={theme} />
          </div>
          {reportCardAccess && (
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Report Card Visibility</p>
              <SelectField options={['Immediately', 'After Principal Approval', 'After X Days']} value={reportCardVisibility} onChange={setReportCardVisibility} theme={theme} />
              <p className={`text-[10px] ${theme.iconColor} mt-1`}>
                {reportCardVisibility === 'Immediately' ? 'Report cards are visible as soon as results are published' :
                 reportCardVisibility === 'After Principal Approval' ? 'Principal must approve before parents can view' :
                 'Report cards become visible after a set number of days post-publication'}
              </p>
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Communication Mode" subtitle="How parents interact with school staff" theme={theme}>
        <SelectField options={['Full Two-Way', 'Reply Only', 'Broadcast']} value={commMode} onChange={setCommMode} theme={theme} />
        <p className={`text-[10px] ${theme.iconColor} mt-2`}>
          {commMode === 'Full Two-Way' ? 'Parents can initiate and reply to messages' :
           commMode === 'Reply Only' ? 'Parents can only reply to school-initiated messages' :
           'Parents receive announcements only, no reply option'}
        </p>
      </SectionCard>

    </div>
  );
}

// ─── STUDENT PORTAL CONFIG MODULE ─────────────────
function StudentPortalConfigModule({ theme }: { theme: Theme }) {
  const [homeworkSubmission, setHomeworkSubmission] = useState(true);
  const [showClassRank, setShowClassRank] = useState(false);
  const [showAttendance, setShowAttendance] = useState(true);
  const [digitalLibrary, setDigitalLibrary] = useState(false);
  const [timetableView, setTimetableView] = useState(true);
  const [resultsView, setResultsView] = useState(true);

  return (
    <div className="space-y-4">
      <ModuleHeader title="Student Portal Configuration" subtitle="Control what students can see and do through their portal" theme={theme} />

      <SectionCard title="Portal Features" subtitle="Control what students can see and do when they log in to their portal" theme={theme}>
        <div className="space-y-2">
          {[
            { label: 'Online homework submission', desc: 'Students can upload and submit homework directly through the portal', value: homeworkSubmission, setter: setHomeworkSubmission },
            { label: 'Show class rank', desc: 'Students can see their rank within their class on the results page', value: showClassRank, setter: setShowClassRank },
            { label: 'Show attendance percentage', desc: 'Students can view their attendance percentage and day-wise history', value: showAttendance, setter: setShowAttendance },
            { label: 'Digital library access', desc: 'Students can browse and read eBooks from the digital library', value: digitalLibrary, setter: setDigitalLibrary },
            { label: 'Timetable view', desc: 'Students can view their daily and weekly class timetable', value: timetableView, setter: setTimetableView },
            { label: 'Results view (with PDF download)', desc: 'Students can view exam results and download report card as PDF', value: resultsView, setter: setResultsView },
          ].map(item => (
            <div key={item.label} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>{item.label}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{item.desc}</p>
              </div>
              <SSAToggle on={item.value} onChange={() => item.setter(!item.value)} theme={theme} />
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex items-start gap-3">
        <AlertTriangle size={16} className="text-amber-500 mt-0.5 shrink-0" />
        <p className="text-xs text-amber-700">Enabling &quot;Show class rank&quot; may be sensitive. Many schools disable this to reduce peer pressure. Consider your school policy before turning it on.</p>
      </div>

    </div>
  );
}

// ─── ALUMNI CONFIG MODULE ─────────────────────────
function AlumniConfigModule({ theme }: { theme: Theme }) {
  const [selfRegistration, setSelfRegistration] = useState(true);
  const [donationModule, setDonationModule] = useState(false);
  const [jobBoard, setJobBoard] = useState(false);
  const [eventInvitations, setEventInvitations] = useState(true);
  const [directoryAccess, setDirectoryAccess] = useState(true);

  return (
    <div className="space-y-4">
      <ModuleHeader title="Alumni Configuration" subtitle="Manage alumni engagement portal features" theme={theme} />

      <SectionCard title="Alumni Portal Features" subtitle="Features available to school alumni through the alumni engagement portal" theme={theme}>
        <div className="space-y-2">
          {[
            { label: 'Self-registration portal', desc: 'Alumni can sign up themselves through a public registration page — no admin action needed', value: selfRegistration, setter: setSelfRegistration },
            { label: 'Donation module', desc: 'Alumni can make monetary contributions to the school through a secure online form', value: donationModule, setter: setDonationModule },
            { label: 'Job board', desc: 'Alumni can post job openings and current students/alumni can view and apply', value: jobBoard, setter: setJobBoard },
            { label: 'Event invitations', desc: 'School can invite alumni to reunions, annual days, and special events via the portal', value: eventInvitations, setter: setEventInvitations },
            { label: 'Directory access', desc: 'Alumni can browse the alumni directory to reconnect with batchmates and seniors', value: directoryAccess, setter: setDirectoryAccess },
          ].map(item => (
            <div key={item.label} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>{item.label}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{item.desc}</p>
              </div>
              <SSAToggle on={item.value} onChange={() => item.setter(!item.value)} theme={theme} />
            </div>
          ))}
        </div>
      </SectionCard>

    </div>
  );
}

// ─── ANALYTICS & BI CONFIG MODULE ─────────────────
function AnalyticsBIConfigModule({ theme }: { theme: Theme }) {
  const [predictiveAI, setPredictiveAI] = useState(false);
  const [comparativeAnalysis, setComparativeAnalysis] = useState(true);
  const [autoMonthlyReports, setAutoMonthlyReports] = useState(true);
  const [dataRetention, setDataRetention] = useState('5 years');
  const [widgets, setWidgets] = useState<Record<string, boolean>>({
    'Attendance Trends': true, 'Fee Collection': true, 'Exam Performance': true, 'Staff Metrics': false,
  });

  return (
    <div className="space-y-4">
      <ModuleHeader title="Analytics & BI Configuration" subtitle="Business intelligence, predictive analytics, and dashboard widgets" theme={theme} />

      <SectionCard title="Core Analytics" subtitle="Enable or disable analytics features" theme={theme}>
        <div className="space-y-2">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <span className={`text-xs font-bold ${theme.highlight}`}>Predictive Analytics (AI)</span>
              <p className={`text-[10px] ${theme.iconColor}`}>Uses ML to predict dropout risk, fee defaults, attendance patterns</p>
            </div>
            <SSAToggle on={predictiveAI} onChange={() => setPredictiveAI(!predictiveAI)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Comparative analysis (cross-section / cross-year)</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Compare performance across sections (A vs B) or academic years (2025 vs 2026)</p>
            </div>
            <SSAToggle on={comparativeAnalysis} onChange={() => setComparativeAnalysis(!comparativeAnalysis)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Auto-generated monthly reports</p>
              <p className={`text-[10px] ${theme.iconColor}`}>System automatically generates and emails monthly analytics summary to admin & principal</p>
            </div>
            <SSAToggle on={autoMonthlyReports} onChange={() => setAutoMonthlyReports(!autoMonthlyReports)} theme={theme} />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Dashboard Widgets" subtitle="Choose which analytics widgets appear on the admin/principal dashboard" theme={theme}>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(widgets).map(([widget, enabled]) => (
            <div key={widget} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>{widget}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{
                  ({
                    'Attendance Trends': 'Visual chart showing daily/weekly/monthly attendance patterns across classes',
                    'Fee Collection': 'Real-time fee collection dashboard with pending vs collected breakdown',
                    'Exam Performance': 'Grade distribution, pass rates, and topper lists across all exams',
                    'Staff Metrics': 'Staff attendance, workload distribution, and leave utilization stats',
                  } as Record<string, string>)[widget]
                }</p>
              </div>
              <SSAToggle on={enabled} onChange={() => setWidgets(p => ({ ...p, [widget]: !p[widget] }))} theme={theme} />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Data Retention" subtitle="How long analytics data is stored" theme={theme}>
        <SelectField options={['1 year', '3 years', '5 years', '10 years', 'Unlimited']} value={dataRetention} onChange={setDataRetention} theme={theme} />
      </SectionCard>

    </div>
  );
}

// ─── REPORT ENGINE CONFIG MODULE ──────────────────
function ReportEngineConfigModule({ theme }: { theme: Theme }) {
  const [scheduledEmail, setScheduledEmail] = useState(true);
  const [exportFormats, setExportFormats] = useState<Record<string, boolean>>({
    'PDF': true, 'Excel': true, 'CSV': true, 'Google Sheets': false,
  });
  const [recipients, setRecipients] = useState<Record<string, boolean>>({
    'Admin': true, 'Principal': true, 'Trustee': false,
  });
  const [autoGenerate, setAutoGenerate] = useState<Record<string, boolean>>({
    'Daily summary': false, 'Weekly summary': true, 'Monthly summary': true,
  });

  return (
    <div className="space-y-4">
      <ModuleHeader title="Report Engine Configuration" subtitle="Scheduled reports, export formats, recipients, and auto-generation" theme={theme} />

      <SectionCard title="Email Reports" subtitle="Schedule automatic email delivery of reports" theme={theme}>
        <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
          <div className="flex-1 mr-3">
            <p className={`text-xs font-bold ${theme.highlight}`}>Scheduled email reports</p>
            <p className={`text-[10px] ${theme.iconColor}`}>System automatically emails report summaries to recipients on schedule</p>
          </div>
          <SSAToggle on={scheduledEmail} onChange={() => setScheduledEmail(!scheduledEmail)} theme={theme} />
        </div>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Export Formats" subtitle="Which file formats are available when downloading reports" theme={theme}>
          <div className="space-y-2">
            {Object.entries(exportFormats).map(([fmt, enabled]) => (
              <div key={fmt} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{fmt}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'PDF': 'Download reports as formatted PDF documents — best for printing and sharing',
                      'Excel': 'Download as Excel spreadsheets — best for further analysis and filtering',
                      'CSV': 'Download as CSV files — lightweight format for data import/export',
                      'Google Sheets': 'Export directly to Google Sheets — best for collaborative editing',
                    } as Record<string, string>)[fmt]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setExportFormats(p => ({ ...p, [fmt]: !p[fmt] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Report Recipients" subtitle="Who receives scheduled reports via email" theme={theme}>
          <div className="space-y-2">
            {Object.entries(recipients).map(([role, enabled]) => (
              <div key={role} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{role}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Admin': 'School admin receives operational reports (attendance, fees, inventory)',
                      'Principal': 'Principal receives academic and performance summary reports',
                      'Trustee': 'Trustee/management receives financial and compliance overview reports',
                    } as Record<string, string>)[role]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setRecipients(p => ({ ...p, [role]: !p[role] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Auto-Generate Reports" subtitle="System automatically creates reports on a schedule — no manual effort needed" theme={theme}>
        <div className="space-y-2">
          {Object.entries(autoGenerate).map(([period, enabled]) => (
            <div key={period} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>{period}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{
                  ({
                    'Daily summary': 'End-of-day report covering attendance, fee collection, and key events',
                    'Weekly summary': 'Weekly digest with attendance trends, pending fees, and upcoming deadlines',
                    'Monthly summary': 'Comprehensive monthly report with analytics across all modules',
                  } as Record<string, string>)[period]
                }</p>
              </div>
              <SSAToggle on={enabled} onChange={() => setAutoGenerate(p => ({ ...p, [period]: !p[period] }))} theme={theme} />
            </div>
          ))}
        </div>
      </SectionCard>

    </div>
  );
}

// ─── API & INTEGRATION CONFIG MODULE ──────────────
function APIIntegrationConfigModule({ theme }: { theme: Theme }) {
  const [thirdParty, setThirdParty] = useState(false);
  const [webhookNotifications, setWebhookNotifications] = useState(false);
  const [apiRateLimit, setApiRateLimit] = useState('1000');
  const [integrations, setIntegrations] = useState<Record<string, boolean>>({
    'Tally (Accounting)': false, 'WhatsApp Business': false, 'SMS Gateway': false,
    'Google Workspace': false, 'Microsoft 365': false,
  });

  return (
    <div className="space-y-4">
      <ModuleHeader title="API & Integration Configuration" subtitle="Third-party integrations, webhooks, and API rate limits" theme={theme} />

      <SectionCard title="Integration Master Switch" subtitle="Enable or disable all external integrations" theme={theme}>
        <div className="space-y-2">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <span className={`text-xs font-bold ${theme.highlight}`}>Third-party integrations</span>
              <p className={`text-[10px] ${theme.iconColor}`}>Master switch to allow external services to connect</p>
            </div>
            <SSAToggle on={thirdParty} onChange={() => setThirdParty(!thirdParty)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <span className={`text-xs font-bold ${theme.highlight}`}>Webhook notifications</span>
              <p className={`text-[10px] ${theme.iconColor}`}>Send event data to external URLs on triggers</p>
            </div>
            <SSAToggle on={webhookNotifications} onChange={() => setWebhookNotifications(!webhookNotifications)} theme={theme} />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Available Integrations" subtitle="Connect your school ERP with external tools and services" theme={theme}>
        <div className="space-y-2">
          {Object.entries(integrations).map(([name, enabled]) => (
            <div key={name} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg} ${!thirdParty ? 'opacity-50' : ''}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>{name}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{
                  ({
                    'Tally (Accounting)': 'Sync fee collection and payroll data directly to Tally accounting software',
                    'WhatsApp Business': 'Send fee reminders, attendance alerts, and notices via WhatsApp Business API',
                    'SMS Gateway': 'Send SMS notifications to parents for attendance, fees, and emergencies',
                    'Google Workspace': 'Integrate with Google Classroom, Drive, and Calendar for academics',
                    'Microsoft 365': 'Connect with Microsoft Teams, OneDrive, and Outlook for collaboration',
                  } as Record<string, string>)[name]
                }</p>
              </div>
              <SSAToggle on={enabled} onChange={() => { if (thirdParty) setIntegrations(p => ({ ...p, [name]: !p[name] })); }} theme={theme} />
            </div>
          ))}
          {!thirdParty && <p className={`text-[10px] ${theme.iconColor} italic`}>Enable &quot;Third-party integrations&quot; above to toggle individual services</p>}
        </div>
      </SectionCard>

      <SectionCard title="API Rate Limit" subtitle="Maximum API requests per minute" theme={theme}>
        <div className="flex items-center gap-3">
          <InputField value={apiRateLimit} onChange={setApiRateLimit} theme={theme} type="number" placeholder="Requests per minute" />
          <span className={`text-xs ${theme.iconColor} whitespace-nowrap`}>req/min</span>
        </div>
      </SectionCard>

    </div>
  );
}

// ─── BRANDING & WHITE-LABEL CONFIG MODULE ─────────
function BrandingWhitelabelConfigModule({ theme }: { theme: Theme }) {
  const [customDomain, setCustomDomain] = useState(false);
  const [domainValue, setDomainValue] = useState('');
  const [whitelabelApp, setWhitelabelApp] = useState(false);
  const [customEmailTemplates, setCustomEmailTemplates] = useState(true);
  const [loginPageCustomization, setLoginPageCustomization] = useState(true);
  const [primaryColor, setPrimaryColor] = useState('#4F46E5');
  const [logoUploaded] = useState(false);

  return (
    <div className="space-y-4">
      <ModuleHeader title="Branding & White-label Configuration" subtitle="Custom domain, branding, logo, and white-label settings" theme={theme} />

      <SectionCard title="Custom Domain" subtitle="Use your own domain for the school portal" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Enable custom domain</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Use your own domain (e.g., portal.yourschool.edu.in) instead of the default Saaras URL</p>
            </div>
            <SSAToggle on={customDomain} onChange={() => setCustomDomain(!customDomain)} theme={theme} />
          </div>
          {customDomain && (
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Domain Name</p>
              <InputField value={domainValue} onChange={setDomainValue} theme={theme} placeholder="e.g. portal.yourschool.edu.in" />
              <p className={`text-[10px] ${theme.iconColor} mt-1`}>Point your CNAME record to saaras-portal.app</p>
            </div>
          )}
        </div>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="White-label &amp; Templates" subtitle="Customize appearance and communication templates" theme={theme}>
          <div className="space-y-2">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>White-label mobile app</p>
                <p className={`text-[10px] ${theme.iconColor}`}>School-branded mobile app with your logo, name, and colors — no Saaras branding visible</p>
              </div>
              <SSAToggle on={whitelabelApp} onChange={() => setWhitelabelApp(!whitelabelApp)} theme={theme} />
            </div>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>Custom email templates</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Customize the email templates sent for fee reminders, reports, and notifications</p>
              </div>
              <SSAToggle on={customEmailTemplates} onChange={() => setCustomEmailTemplates(!customEmailTemplates)} theme={theme} />
            </div>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>Login page customization</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Customize the school portal login page with your logo, background, and welcome message</p>
              </div>
              <SSAToggle on={loginPageCustomization} onChange={() => setLoginPageCustomization(!loginPageCustomization)} theme={theme} />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Visual Identity" subtitle="Logo and primary color" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>School Logo</p>
              <div className={`w-full border-2 border-dashed ${theme.border} rounded-xl p-4 text-center cursor-pointer ${theme.buttonHover} transition-all`}>
                <Upload size={20} className={`mx-auto mb-1 ${theme.iconColor}`} />
                <p className={`text-[10px] ${theme.iconColor}`}>{logoUploaded ? 'Logo uploaded - click to replace' : 'Click to upload logo (PNG/SVG, max 2MB)'}</p>
              </div>
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Primary Brand Color</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg border border-slate-300" style={{ backgroundColor: primaryColor }} />
                <InputField value={primaryColor} onChange={setPrimaryColor} theme={theme} placeholder="#4F46E5" />
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

    </div>
  );
}

// ─── SCHOOL IDENTITY CONFIG MODULE ────────────────
function SchoolIdentityConfigModule({ theme }: { theme: Theme }) {
  const [schoolName, setSchoolName] = useState('Delhi Public School, Ahmedabad');
  const [medium, setMedium] = useState('English');
  const [category, setCategory] = useState('Co-educational');
  const [academicPattern, setAcademicPattern] = useState('April-March');
  const [board, setBoard] = useState('CBSE');
  const [workingDays, setWorkingDays] = useState('Mon-Sat');
  const [shifts, setShifts] = useState([
    { name: 'Morning Shift', classes: 'Pre-Primary, Class 1-5' },
    { name: 'Regular Shift', classes: 'Class 6-12' },
  ]);
  const [extendedHours, setExtendedHours] = useState(false);
  const [daycareStart, setDaycareStart] = useState('06:30');
  const [daycareEnd, setDaycareEnd] = useState('19:00');
  const [extendedHoursFee, setExtendedHoursFee] = useState(false);

  return (
    <div className="space-y-4">
      <ModuleHeader title="School Identity Configuration" subtitle="Core school details captured during onboarding — editable by SSA" theme={theme} />

      <SectionCard title="Basic Information" subtitle="School name and classification" theme={theme}>
        <div className="space-y-3">
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>School Name</p>
            <InputField value={schoolName} onChange={setSchoolName} theme={theme} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Medium of Instruction</p>
              <SelectField options={['English', 'Hindi', 'Gujarati', 'Bilingual', 'Trilingual']} value={medium} onChange={setMedium} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>School Category</p>
              <SelectField options={['Co-educational', 'Boys Only', 'Girls Only']} value={category} onChange={setCategory} theme={theme} />
            </div>
          </div>
        </div>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Academic Configuration" subtitle="Year pattern and board affiliation" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Academic Year Pattern</p>
              <SelectField options={['April-March', 'June-May', 'January-December']} value={academicPattern} onChange={setAcademicPattern} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Board Affiliation</p>
              <SelectField options={['CBSE', 'ICSE', 'State Board', 'IB', 'Custom']} value={board} onChange={setBoard} theme={theme} />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Working Days" subtitle="Weekly schedule pattern" theme={theme}>
          <div className="space-y-3">
            <SelectField options={['Mon-Fri', 'Mon-Sat', 'Custom']} value={workingDays} onChange={setWorkingDays} theme={theme} />
            {workingDays === 'Custom' && (
              <div className="grid grid-cols-3 gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className={`flex items-center gap-2 p-2 rounded-lg ${theme.secondaryBg}`}>
                    <SSAToggle on={day !== 'Sat'} onChange={() => {}} theme={theme} />
                    <span className={`text-xs ${theme.highlight}`}>{day}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Shift Configuration" subtitle="Define shifts and assigned classes" theme={theme}>
        <div className="space-y-2">
          {shifts.map((shift, i) => (
            <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <input value={shift.name} onChange={e => { const n = [...shifts]; n[i] = { ...n[i], name: e.target.value }; setShifts(n); }}
                className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
              <input value={shift.classes} onChange={e => { const n = [...shifts]; n[i] = { ...n[i], classes: e.target.value }; setShifts(n); }}
                className={`flex-[2] px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
              <button onClick={() => setShifts(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={14} /></button>
            </div>
          ))}
          <button onClick={() => setShifts(p => [...p, { name: '', classes: '' }])}
            className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
            <Plus size={12} /> Add Shift
          </button>
        </div>
      </SectionCard>

      <SectionCard title="Daycare &amp; Extended Hours" subtitle="Before/after-school care and extended hours configuration" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Extended Hours Available</p>
              <p className={`text-[10px] ${theme.iconColor}`}>School offers before/after-school daycare or extended care</p>
            </div>
            <SSAToggle on={extendedHours} onChange={() => setExtendedHours(!extendedHours)} theme={theme} />
          </div>
          {extendedHours && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Daycare Start Time</p>
                  <InputField value={daycareStart} onChange={setDaycareStart} theme={theme} type="time" />
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Daycare End Time</p>
                  <InputField value={daycareEnd} onChange={setDaycareEnd} theme={theme} type="time" />
                </div>
              </div>
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>Extended Hours Fee</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Charge a separate fee for extended / daycare hours</p>
                </div>
                <SSAToggle on={extendedHoursFee} onChange={() => setExtendedHoursFee(!extendedHoursFee)} theme={theme} />
              </div>
            </>
          )}
        </div>
      </SectionCard>

    </div>
  );
}

// ─── EXPORT ──────────────────────────────────────────
export default function Page() {
  return (
    <BlueprintLayout>
      <SchoolSuperAdminDashboard />
    </BlueprintLayout>
  );
}
