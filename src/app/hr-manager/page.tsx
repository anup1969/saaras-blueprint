'use client';

import React, { useState } from 'react';
import BlueprintLayout from '@/components/BlueprintLayout';
import StakeholderProfile from '@/components/StakeholderProfile';
import { type Theme } from '@/lib/themes';
import {
  Users, Home, UserPlus, Calendar, Clock, Banknote, Star, FileText, UserMinus, BarChart3,
  Settings, Bell, ChevronLeft, ChevronRight, Check, X, Plus,
  Eye, Edit, Phone, Mail, Trash2, Camera, Award, CheckCircle, XCircle,
  GripVertical, Cake, Briefcase, Upload, MinusCircle, Wallet, GitBranch, Shield, User
} from 'lucide-react';

// ─── MOCK DATA ────────────────────────────────────────
const employees = [
  { id: 'EMP001', name: 'Priya Sharma', init: 'PS', dept: 'Teaching', designation: 'PGT Mathematics', phone: '+91 98765 43210', email: 'priya.sharma@school.edu', joinDate: '15-Jun-2019', status: 'Active' },
  { id: 'EMP002', name: 'Rajesh Kumar', init: 'RK', dept: 'Teaching', designation: 'TGT Science', phone: '+91 98765 43211', email: 'rajesh.kumar@school.edu', joinDate: '01-Apr-2020', status: 'Active' },
  { id: 'EMP003', name: 'Sunita Patel', init: 'SP', dept: 'Administration', designation: 'Office Assistant', phone: '+91 98765 43212', email: 'sunita.patel@school.edu', joinDate: '10-Aug-2018', status: 'Active' },
  { id: 'EMP004', name: 'Mohammed Irfan', init: 'MI', dept: 'Transport', designation: 'Driver', phone: '+91 98765 43213', email: 'mohammed.irfan@school.edu', joinDate: '05-Jan-2021', status: 'Active' },
  { id: 'EMP005', name: 'Kavitha Nair', init: 'KN', dept: 'Teaching', designation: 'PRT English', phone: '+91 98765 43214', email: 'kavitha.nair@school.edu', joinDate: '20-Nov-2024', status: 'Probation' },
  { id: 'EMP006', name: 'Deepak Verma', init: 'DV', dept: 'Security', designation: 'Security Guard', phone: '+91 98765 43215', email: 'deepak.verma@school.edu', joinDate: '15-Mar-2019', status: 'Active' },
];

// ─── MODULE SIDEBAR ───────────────────────────────────
const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'employees', label: 'Employees', icon: Users },
  { id: 'onboarding', label: 'Onboarding', icon: UserPlus },
  { id: 'attendance', label: 'Attendance', icon: Clock },
  { id: 'leave', label: 'Leave', icon: Calendar },
  { id: 'payroll', label: 'Payroll', icon: Banknote },
  { id: 'performance', label: 'Performance', icon: Star },
  { id: 'letters', label: 'HR Letters', icon: FileText },
  { id: 'offboarding', label: 'Offboarding', icon: UserMinus },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'my-profile', label: 'My Profile', icon: User },
];

// ─── SHARED HELPERS ───────────────────────────────────
const fmt = (n: number) => n.toLocaleString('en-IN');

function SC({ icon: Icon, label, value, color, sub, theme }: { icon: React.ElementType; label: string; value: string; color: string; sub?: string; theme: Theme }) {
  return (
    <div className={`${theme.cardBg} rounded-xl border ${theme.border} p-3 flex items-center gap-3`}>
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}><Icon size={18} className="text-white" /></div>
      <div><p className={`text-lg font-bold ${theme.highlight}`}>{value}</p><p className={`text-xs ${theme.iconColor}`}>{label}</p>{sub && <p className="text-xs text-emerald-500">{sub}</p>}</div>
    </div>
  );
}

function Tgl({ on, theme }: { on: boolean; theme: Theme }) {
  return (
    <button className={`w-9 h-5 rounded-full relative ${on ? theme.primary : 'bg-slate-600'}`}>
      <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${on ? 'translate-x-4' : 'translate-x-0.5'}`} />
    </button>
  );
}

// ─── DASHBOARD ────────────────────────────────────────
function DashboardModule({ theme, setActive }: { theme: Theme; setActive: (s: string) => void }) {
  const weekData = [{ d: 'Mon', p: 125 }, { d: 'Tue', p: 130 }, { d: 'Wed', p: 128 }, { d: 'Thu', p: 126 }, { d: 'Fri', p: 132 }, { d: 'Sat', p: 118 }];
  return (
    <div className="space-y-4">
      <h1 className={`text-xl font-bold ${theme.highlight}`}>HR Dashboard</h1>
      <div className="grid grid-cols-6 gap-3">
        <SC icon={Users} label="Total Staff" value="142" sub="+5 this month" color="bg-indigo-600" theme={theme} />
        <SC icon={CheckCircle} label="Present" value="128" color="bg-emerald-500" theme={theme} />
        <SC icon={Calendar} label="On Leave" value="8" color="bg-amber-500" theme={theme} />
        <SC icon={XCircle} label="Absent" value="6" color="bg-red-500" theme={theme} />
        <SC icon={Briefcase} label="Open Positions" value="3" color="bg-indigo-500" theme={theme} />
        <SC icon={Clock} label="Pending" value="12" color="bg-orange-500" theme={theme} />
      </div>
      <div className="grid grid-cols-5 gap-4">
        <div className={`col-span-3 ${theme.cardBg} rounded-xl border ${theme.border} p-4`}>
          <h3 className={`font-semibold mb-3 ${theme.highlight}`}>Weekly Attendance</h3>
          <div className="flex items-end gap-3 h-32">{weekData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-emerald-500 rounded-t" style={{ height: (d.p - 100) * 2 + 'px' }} />
              <span className={`text-xs ${theme.iconColor} mt-1`}>{d.d}</span>
            </div>
          ))}</div>
        </div>
        <div className={`col-span-2 ${theme.cardBg} rounded-xl border ${theme.border} p-4`}>
          <h3 className={`font-semibold mb-3 ${theme.highlight}`}>Today&apos;s Highlights</h3>
          <div className="space-y-2">
            <div className={`flex items-center gap-2 p-2 rounded-lg text-sm ${theme.secondaryBg}`}><Cake size={14} className="text-pink-500" /><span className={theme.highlight}>Ravi Shankar&apos;s Birthday</span></div>
            <div className={`flex items-center gap-2 p-2 rounded-lg text-sm ${theme.secondaryBg}`}><Award size={14} className="text-amber-500" /><span className={theme.highlight}>Vijay Kumar - 5 years</span></div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className={`${theme.cardBg} rounded-xl border ${theme.border} p-4`}>
          <h3 className={`font-semibold mb-3 ${theme.highlight}`}>Quick Actions</h3>
          <div className="space-y-2">
            <button onClick={() => setActive('addemployee')} className={`w-full flex items-center gap-2 px-3 py-2 ${theme.primary} text-white rounded-lg text-sm`}><UserPlus size={14} />Add Employee</button>
            <button onClick={() => setActive('attendance')} className={`w-full flex items-center gap-2 px-3 py-2 border ${theme.border} rounded-lg text-sm ${theme.highlight}`}><Clock size={14} />Mark Attendance</button>
            <button onClick={() => setActive('payroll')} className={`w-full flex items-center gap-2 px-3 py-2 border ${theme.border} rounded-lg text-sm ${theme.highlight}`}><Banknote size={14} />Process Payroll</button>
          </div>
        </div>
        <div className={`${theme.cardBg} rounded-xl border ${theme.border} p-4`}>
          <h3 className={`font-semibold mb-3 ${theme.highlight}`}>Pending Leaves</h3>
          {[{ n: 'Amit Saxena', t: 'Casual' }, { n: 'Meera Iyer', t: 'Sick' }].map((r, i) => (
            <div key={i} className={`flex items-center justify-between p-2 ${theme.secondaryBg} rounded-lg mb-2`}>
              <div><p className={`text-sm font-medium ${theme.highlight}`}>{r.n}</p><p className={`text-xs ${theme.iconColor}`}>{r.t}</p></div>
              <div className="flex gap-1">
                <button className="p-1 bg-emerald-500/20 text-emerald-400 rounded"><Check size={12} /></button>
                <button className="p-1 bg-red-500/20 text-red-400 rounded"><X size={12} /></button>
              </div>
            </div>
          ))}
        </div>
        <div className={`${theme.cardBg} rounded-xl border ${theme.border} p-4`}>
          <h3 className={`font-semibold mb-3 ${theme.highlight}`}>Department Strength</h3>
          {[{ n: 'Teaching', c: 68 }, { n: 'Admin', c: 22 }, { n: 'Transport', c: 18 }].map((d) => (
            <div key={d.n} className="flex items-center gap-2 mb-2">
              <span className={`text-xs w-16 ${theme.iconColor}`}>{d.n}</span>
              <div className={`flex-1 ${theme.secondaryBg} rounded-full h-2`}><div className={`${theme.primary} h-2 rounded-full`} style={{ width: (d.c / 68) * 100 + '%' }} /></div>
              <span className={`text-xs w-6 ${theme.highlight}`}>{d.c}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── EMPLOYEE LIST ────────────────────────────────────
function EmployeeList({ theme, setActive, setSelectedEmp }: { theme: Theme; setActive: (s: string) => void; setSelectedEmp: (e: typeof employees[0]) => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-xl font-bold ${theme.highlight}`}>Employee Management</h1>
        <button onClick={() => setActive('addemployee')} className={`flex items-center gap-2 px-3 py-2 ${theme.primary} text-white rounded-lg text-sm`}><Plus size={14} />Add Employee</button>
      </div>
      <div className={`${theme.cardBg} rounded-xl border ${theme.border} overflow-hidden`}>
        <table className="w-full text-sm">
          <thead><tr className={theme.secondaryBg}><th className={`p-3 text-left text-xs font-bold ${theme.iconColor}`}>Employee</th><th className={`p-3 text-left text-xs font-bold ${theme.iconColor}`}>Department</th><th className={`p-3 text-left text-xs font-bold ${theme.iconColor}`}>Contact</th><th className={`p-3 text-left text-xs font-bold ${theme.iconColor}`}>Status</th><th className={`p-3 text-center text-xs font-bold ${theme.iconColor}`}>Actions</th></tr></thead>
          <tbody>{employees.map((emp) => (
            <tr key={emp.id} className={`border-t ${theme.border} ${theme.buttonHover} cursor-pointer`} onClick={() => { setSelectedEmp(emp); setActive('profile'); }}>
              <td className="p-3"><div className="flex items-center gap-2"><div className={`w-8 h-8 ${theme.secondaryBg} rounded-full flex items-center justify-center text-xs font-medium ${theme.primaryText}`}>{emp.init}</div><div><p className={`font-medium ${theme.highlight}`}>{emp.name}</p><p className={`text-xs ${theme.iconColor}`}>{emp.id}</p></div></div></td>
              <td className="p-3"><p className={theme.highlight}>{emp.dept}</p><p className={`text-xs ${theme.iconColor}`}>{emp.designation}</p></td>
              <td className={`p-3 ${theme.iconColor}`}>{emp.phone}</td>
              <td className="p-3"><span className={`px-2 py-1 text-xs rounded-full font-bold ${emp.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>{emp.status}</span></td>
              <td className="p-3 text-center"><Eye size={14} className={theme.iconColor} /></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

// ─── EMPLOYEE PROFILE ─────────────────────────────────
function EmployeeProfile({ theme, emp, setActive }: { theme: Theme; emp: typeof employees[0]; setActive: (s: string) => void }) {
  return (
    <div className="space-y-4">
      <button onClick={() => setActive('employees')} className={`flex items-center gap-1 text-sm ${theme.iconColor}`}><ChevronLeft size={14} />Back</button>
      <div className={`${theme.cardBg} rounded-xl border ${theme.border} overflow-hidden`}>
        <div className={`h-20 ${theme.primary}`} />
        <div className="px-4 pb-4 -mt-8 flex items-end gap-4">
          <div className={`w-16 h-16 ${theme.secondaryBg} rounded-full border-4 ${theme.cardBg} flex items-center justify-center text-xl font-bold ${theme.primaryText}`}>{emp.init}</div>
          <div className="pb-1 flex-1"><h2 className={`text-lg font-bold ${theme.highlight}`}>{emp.name}</h2><p className={`text-sm ${theme.iconColor}`}>{emp.designation} &bull; {emp.dept}</p></div>
          <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full font-bold">{emp.status}</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className={`col-span-2 ${theme.cardBg} rounded-xl border ${theme.border} p-4`}>
          <h3 className={`font-semibold mb-2 ${theme.highlight}`}>About</h3>
          <p className={`text-sm ${theme.iconColor}`}>Dedicated educator with expertise in teaching and curriculum development.</p>
          <h3 className={`font-semibold mt-4 mb-2 ${theme.highlight}`}>Skills</h3>
          <div className="flex flex-wrap gap-2">{['Mathematics', 'Vedic Maths', 'CBSE Curriculum', 'Student Mentoring'].map((s) => <span key={s} className={`px-2 py-1 ${theme.secondaryBg} ${theme.primaryText} text-xs rounded-full font-medium`}>{s}</span>)}</div>
        </div>
        <div className={`${theme.cardBg} rounded-xl border ${theme.border} p-4`}>
          <h3 className={`font-semibold mb-3 ${theme.highlight}`}>Quick Info</h3>
          <div className="space-y-2 text-sm">
            <div className={`flex items-center gap-2 ${theme.iconColor}`}><Phone size={14} />{emp.phone}</div>
            <div className={`flex items-center gap-2 ${theme.iconColor}`}><Mail size={14} />{emp.email}</div>
            <div className={`flex items-center gap-2 ${theme.iconColor}`}><Calendar size={14} />{emp.joinDate}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ADD EMPLOYEE (4-step wizard) ─────────────────────
function AddEmployee({ theme, setActive }: { theme: Theme; setActive: (s: string) => void }) {
  const [step, setStep] = useState(1);
  const steps = ['Personal', 'Professional', 'Salary', 'Documents'];
  return (
    <div className="space-y-4">
      <button onClick={() => setActive('employees')} className={`flex items-center gap-1 text-sm ${theme.iconColor}`}><ChevronLeft size={14} />Back</button>
      <h1 className={`text-xl font-bold ${theme.highlight}`}>Add New Employee</h1>
      <div className={`${theme.cardBg} rounded-xl border ${theme.border} p-6`}>
        <div className="flex items-center justify-center mb-6">
          {steps.map((s, i) => (
            <React.Fragment key={i}>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i + 1 < step ? 'bg-emerald-500 text-white' : i + 1 === step ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.iconColor}`}`}>{i + 1 < step ? <Check size={14} /> : i + 1}</div>
                <span className={`ml-2 text-sm ${i + 1 === step ? `${theme.primaryText} font-medium` : theme.iconColor}`}>{s}</span>
              </div>
              {i < 3 && <div className={`w-12 h-1 mx-2 rounded ${i + 1 < step ? 'bg-emerald-500' : theme.secondaryBg}`} />}
            </React.Fragment>
          ))}
        </div>
        {step === 1 && <div className="grid grid-cols-2 gap-4"><div className="col-span-2 flex justify-center"><div className={`w-16 h-16 ${theme.secondaryBg} rounded-full flex items-center justify-center border-2 border-dashed ${theme.border}`}><Camera size={18} className={theme.iconColor} /></div></div>{['First Name *', 'Last Name *', 'Email *', 'Phone *', 'Date of Birth', 'Gender'].map(f => <div key={f}><label className={`block text-sm mb-1 ${theme.iconColor}`}>{f}</label><input className={`w-full px-3 py-2 border ${theme.border} rounded-lg text-sm ${theme.inputBg} ${theme.highlight} outline-none`} placeholder={f.replace(' *', '')} /></div>)}</div>}
        {step === 2 && <div className="grid grid-cols-2 gap-4">{[['Employee ID *', 'EMP143'], ['Department *', ''], ['Designation *', ''], ['Joining Date', ''], ['Reporting To', ''], ['Probation Period', '']].map(([f, v]) => <div key={f}><label className={`block text-sm mb-1 ${theme.iconColor}`}>{f}</label><input defaultValue={v} className={`w-full px-3 py-2 border ${theme.border} rounded-lg text-sm ${theme.inputBg} ${theme.highlight} outline-none`} /></div>)}</div>}
        {step === 3 && <div className="grid grid-cols-2 gap-4">{['Basic Salary *', 'Bank Name *', 'Account Number *', 'IFSC Code *', 'PAN *', 'UAN (PF)'].map(f => <div key={f}><label className={`block text-sm mb-1 ${theme.iconColor}`}>{f}</label><input className={`w-full px-3 py-2 border ${theme.border} rounded-lg text-sm ${theme.inputBg} ${theme.highlight} outline-none`} /></div>)}</div>}
        {step === 4 && <div className="grid grid-cols-3 gap-4">{['Photo', 'Aadhaar Card', 'PAN Card', '10th Marksheet', '12th Marksheet', 'Graduation'].map(d => <div key={d} className={`border-2 border-dashed ${theme.border} rounded-xl p-4 text-center ${theme.buttonHover} cursor-pointer`}><Upload size={18} className={`mx-auto ${theme.iconColor}`} /><p className={`text-xs ${theme.iconColor} mt-1`}>{d}</p></div>)}</div>}
        <div className={`flex justify-between mt-6 pt-4 border-t ${theme.border}`}>
          <button className={`text-sm ${theme.iconColor}`}>Cancel</button>
          <div className="flex gap-2">
            {step > 1 && <button onClick={() => setStep(step - 1)} className={`px-4 py-2 border ${theme.border} rounded-lg text-sm ${theme.highlight}`}>Previous</button>}
            {step < 4 ? <button onClick={() => setStep(step + 1)} className={`px-4 py-2 ${theme.primary} text-white rounded-lg text-sm`}>Next</button> : <button onClick={() => setActive('employees')} className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm">Submit</button>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ONBOARDING (Kanban) ──────────────────────────────
function OnboardingModule({ theme }: { theme: Theme }) {
  const cols = [
    { t: 'Applied', c: 'bg-slate-500', cards: [{ n: 'Meena Devi', r: 'PRT Hindi' }, { n: 'Arjun Rao', r: 'TGT Social Studies' }] },
    { t: 'Interview', c: 'bg-blue-500', cards: [{ n: 'Neha Saxena', r: 'PGT Chemistry' }] },
    { t: 'Selected', c: 'bg-emerald-500', cards: [{ n: 'Pooja Mehta', r: 'Office Assistant' }] },
    { t: 'Documentation', c: 'bg-amber-500', cards: [{ n: 'Ravi Tiwari', r: 'Lab Assistant' }] },
    { t: 'Onboarded', c: 'bg-emerald-600', cards: [{ n: 'Sanjay Mishra', r: 'TGT English' }] },
  ];
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center"><h1 className={`text-xl font-bold ${theme.highlight}`}>Staff Onboarding</h1><button className={`px-3 py-2 ${theme.primary} text-white rounded-lg text-sm`}>Add Candidate</button></div>
      <div className="flex gap-3 overflow-x-auto pb-4">{cols.map((col, i) => (
        <div key={i} className="flex-shrink-0 w-52">
          <div className={`${col.c} text-white px-3 py-2 rounded-t-xl text-sm font-bold`}>{col.t} <span className="opacity-70">({col.cards.length})</span></div>
          <div className={`${theme.secondaryBg} rounded-b-xl p-2 min-h-[160px] space-y-2`}>{col.cards.map((c, j) => (
            <div key={j} className={`${theme.cardBg} rounded-xl p-3 border ${theme.border}`}><p className={`text-sm font-medium ${theme.highlight}`}>{c.n}</p><p className={`text-xs ${theme.iconColor}`}>{c.r}</p></div>
          ))}</div>
        </div>
      ))}</div>
    </div>
  );
}

// ─── ATTENDANCE ───────────────────────────────────────
function AttendanceModule({ theme }: { theme: Theme }) {
  const data = [{ n: 'Priya Sharma', i: 'PS', d: 'Teaching', in_: '7:45 AM', out: '2:10 PM', s: 'Present' }, { n: 'Rajesh Kumar', i: 'RK', d: 'Teaching', in_: '7:52 AM', out: '2:05 PM', s: 'Present' }, { n: 'Sunita Patel', i: 'SP', d: 'Admin', in_: '9:15 AM', out: '-', s: 'Late' }, { n: 'Kavitha Nair', i: 'KN', d: 'Teaching', in_: '-', out: '-', s: 'Absent' }, { n: 'Deepak Verma', i: 'DV', d: 'Security', in_: '-', out: '-', s: 'On Leave' }, { n: 'Mohammed Irfan', i: 'MI', d: 'Transport', in_: '6:30 AM', out: '1:45 PM', s: 'Present' }];
  const sc: Record<string, string> = { Present: 'bg-emerald-500/20 text-emerald-400', Late: 'bg-amber-500/20 text-amber-400', Absent: 'bg-red-500/20 text-red-400', 'On Leave': 'bg-blue-500/20 text-blue-400' };
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center"><h1 className={`text-xl font-bold ${theme.highlight}`}>Attendance</h1><button className={`px-3 py-2 ${theme.primary} text-white rounded-lg text-sm`}>Mark Attendance</button></div>
      <div className="grid grid-cols-4 gap-3"><SC icon={Users} label="Total" value="142" color="bg-indigo-600" theme={theme} /><SC icon={CheckCircle} label="Present" value="128" color="bg-emerald-500" theme={theme} /><SC icon={Calendar} label="Leave" value="8" color="bg-amber-500" theme={theme} /><SC icon={XCircle} label="Absent" value="6" color="bg-red-500" theme={theme} /></div>
      <div className={`${theme.cardBg} rounded-xl border ${theme.border} overflow-hidden`}>
        <table className="w-full text-sm"><thead><tr className={theme.secondaryBg}><th className={`p-3 text-left text-xs font-bold ${theme.iconColor}`}>Employee</th><th className={`p-3 text-left text-xs font-bold ${theme.iconColor}`}>Dept</th><th className={`p-3 text-left text-xs font-bold ${theme.iconColor}`}>Check In</th><th className={`p-3 text-left text-xs font-bold ${theme.iconColor}`}>Check Out</th><th className={`p-3 text-left text-xs font-bold ${theme.iconColor}`}>Status</th></tr></thead>
        <tbody>{data.map((e, i) => <tr key={i} className={`border-t ${theme.border}`}><td className="p-3"><div className="flex items-center gap-2"><div className={`w-7 h-7 ${theme.secondaryBg} rounded-full flex items-center justify-center text-xs font-bold ${theme.primaryText}`}>{e.i}</div><span className={theme.highlight}>{e.n}</span></div></td><td className={`p-3 ${theme.iconColor}`}>{e.d}</td><td className={`p-3 ${theme.highlight}`}>{e.in_}</td><td className={`p-3 ${theme.highlight}`}>{e.out}</td><td className="p-3"><span className={`px-2 py-1 text-xs rounded-full font-bold ${sc[e.s]}`}>{e.s}</span></td></tr>)}</tbody></table>
      </div>
    </div>
  );
}

// ─── LEAVE MANAGEMENT ─────────────────────────────────
function LeaveModule({ theme }: { theme: Theme }) {
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState(0);
  const data = [{ n: 'Priya Sharma', t: 'Casual', f: '03-Feb', to: '03-Feb', d: 1, s: 'Pending' }, { n: 'Kavitha Nair', t: 'Sick', f: '31-Jan', to: '31-Jan', d: 1, s: 'Pending' }, { n: 'Anjali Gupta', t: 'Casual', f: '10-Feb', to: '10-Feb', d: 1, s: 'Approved' }, { n: 'Deepak Verma', t: 'LWP', f: '20-Feb', to: '22-Feb', d: 3, s: 'Rejected' }, { n: 'Amit Saxena', t: 'Earned', f: '25-Feb', to: '28-Feb', d: 4, s: 'Pending' }];
  const sc: Record<string, string> = { Pending: 'bg-amber-500/20 text-amber-400', Approved: 'bg-emerald-500/20 text-emerald-400', Rejected: 'bg-red-500/20 text-red-400' };
  const filters = ['All (25)', 'Pending (8)', 'Approved (14)', 'Rejected (3)'];
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center"><h1 className={`text-xl font-bold ${theme.highlight}`}>Leave Management</h1><button onClick={() => setShowModal(true)} className={`px-3 py-2 ${theme.primary} text-white rounded-lg text-sm`}>Apply Leave</button></div>
      <div className={`${theme.cardBg} rounded-xl border ${theme.border} overflow-hidden`}>
        <div className={`p-3 border-b ${theme.border} flex gap-2`}>{filters.map((f, i) => <button key={f} onClick={() => setFilter(i)} className={`px-3 py-1 text-xs rounded-full font-bold ${i === filter ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.iconColor}`}`}>{f}</button>)}</div>
        <table className="w-full text-sm"><thead><tr className={theme.secondaryBg}><th className={`p-3 text-left text-xs font-bold ${theme.iconColor}`}>Employee</th><th className={`p-3 text-center text-xs font-bold ${theme.iconColor}`}>Type</th><th className={`p-3 text-center text-xs font-bold ${theme.iconColor}`}>From</th><th className={`p-3 text-center text-xs font-bold ${theme.iconColor}`}>To</th><th className={`p-3 text-center text-xs font-bold ${theme.iconColor}`}>Days</th><th className={`p-3 text-center text-xs font-bold ${theme.iconColor}`}>Status</th><th className={`p-3 text-center text-xs font-bold ${theme.iconColor}`}>Actions</th></tr></thead>
        <tbody>{data.map((r, i) => <tr key={i} className={`border-t ${theme.border}`}><td className={`p-3 font-medium ${theme.highlight}`}>{r.n}</td><td className={`p-3 text-center ${theme.iconColor}`}>{r.t}</td><td className={`p-3 text-center ${theme.highlight}`}>{r.f}</td><td className={`p-3 text-center ${theme.highlight}`}>{r.to}</td><td className={`p-3 text-center ${theme.highlight}`}>{r.d}</td><td className="p-3 text-center"><span className={`px-2 py-1 text-xs rounded-full font-bold ${sc[r.s]}`}>{r.s}</span></td><td className="p-3 text-center">{r.s === 'Pending' && <><button className="p-1 bg-emerald-500/20 text-emerald-400 rounded mr-1"><Check size={12} /></button><button className="p-1 bg-red-500/20 text-red-400 rounded"><X size={12} /></button></>}</td></tr>)}</tbody></table>
      </div>
      {showModal && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"><div className={`${theme.cardBg} rounded-2xl p-6 w-96 border ${theme.border}`}><div className="flex justify-between mb-4"><h3 className={`font-semibold ${theme.highlight}`}>Apply Leave</h3><button onClick={() => setShowModal(false)} className={theme.iconColor}><X size={18} /></button></div><div className="space-y-3"><div><label className={`block text-sm mb-1 ${theme.iconColor}`}>Leave Type *</label><select className={`w-full px-3 py-2 border ${theme.border} rounded-lg text-sm ${theme.inputBg} ${theme.highlight}`}><option>Casual</option><option>Sick</option><option>Earned</option><option>LWP</option></select></div><div className="grid grid-cols-2 gap-2"><div><label className={`block text-sm mb-1 ${theme.iconColor}`}>From *</label><input type="date" className={`w-full px-3 py-2 border ${theme.border} rounded-lg text-sm ${theme.inputBg} ${theme.highlight}`} /></div><div><label className={`block text-sm mb-1 ${theme.iconColor}`}>To *</label><input type="date" className={`w-full px-3 py-2 border ${theme.border} rounded-lg text-sm ${theme.inputBg} ${theme.highlight}`} /></div></div><div><label className={`block text-sm mb-1 ${theme.iconColor}`}>Reason *</label><textarea rows={2} className={`w-full px-3 py-2 border ${theme.border} rounded-lg text-sm ${theme.inputBg} ${theme.highlight}`} /></div></div><div className="flex justify-end gap-2 mt-4"><button onClick={() => setShowModal(false)} className={`px-4 py-2 border ${theme.border} rounded-lg text-sm ${theme.highlight}`}>Cancel</button><button className={`px-4 py-2 ${theme.primary} text-white rounded-lg text-sm`}>Submit</button></div></div></div>}
    </div>
  );
}

// ─── PAYROLL ──────────────────────────────────────────
function PayrollModule({ theme }: { theme: Theme }) {
  const data = [{ id: 'EMP001', n: 'Priya Sharma', i: 'PS', b: 35000, g: 57500, de: 6900, net: 50600, s: 'Processed' }, { id: 'EMP002', n: 'Rajesh Kumar', i: 'RK', b: 28000, g: 46000, de: 4760, net: 41240, s: 'Processed' }, { id: 'EMP003', n: 'Sunita Patel', i: 'SP', b: 18000, g: 29000, de: 2360, net: 26640, s: 'Pending' }, { id: 'EMP004', n: 'Mohammed Irfan', i: 'MI', b: 22000, g: 36000, de: 3200, net: 32800, s: 'Processed' }, { id: 'EMP005', n: 'Kavitha Nair', i: 'KN', b: 25000, g: 41000, de: 4100, net: 36900, s: 'Pending' }];
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center"><h1 className={`text-xl font-bold ${theme.highlight}`}>Payroll</h1><div className="flex gap-2"><div className={`flex items-center gap-1 border ${theme.border} rounded-lg px-2 py-1 ${theme.highlight}`}><ChevronLeft size={14} /><span className="text-sm">Jan 2026</span><ChevronRight size={14} /></div><button className={`px-3 py-2 ${theme.primary} text-white rounded-lg text-sm`}>Process Payroll</button></div></div>
      <div className="grid grid-cols-4 gap-3"><SC icon={Banknote} label="Total Payroll" value={'₹'+fmt(2845000)} color="bg-indigo-600" theme={theme} /><SC icon={MinusCircle} label="Deductions" value={'₹'+fmt(412000)} color="bg-red-500" theme={theme} /><SC icon={Wallet} label="Net Payout" value={'₹'+fmt(2433000)} color="bg-emerald-500" theme={theme} /><SC icon={Users} label="Employees" value="142" color="bg-blue-500" theme={theme} /></div>
      <div className={`${theme.cardBg} rounded-xl border ${theme.border} overflow-x-auto`}>
        <table className="w-full text-sm"><thead><tr className={theme.secondaryBg}><th className={`p-3 text-left text-xs font-bold ${theme.iconColor}`}>Employee</th><th className={`p-3 text-right text-xs font-bold ${theme.iconColor}`}>Basic</th><th className={`p-3 text-right text-xs font-bold ${theme.iconColor}`}>Gross</th><th className={`p-3 text-right text-xs font-bold ${theme.iconColor}`}>Deductions</th><th className={`p-3 text-right text-xs font-bold ${theme.iconColor}`}>Net</th><th className={`p-3 text-center text-xs font-bold ${theme.iconColor}`}>Status</th></tr></thead>
        <tbody>{data.map((e) => <tr key={e.id} className={`border-t ${theme.border}`}><td className="p-3"><div className="flex items-center gap-2"><div className={`w-7 h-7 ${theme.secondaryBg} rounded-full flex items-center justify-center text-xs font-bold ${theme.primaryText}`}>{e.i}</div><div><p className={`font-medium ${theme.highlight}`}>{e.n}</p><p className={`text-xs ${theme.iconColor}`}>{e.id}</p></div></div></td><td className={`p-3 text-right ${theme.highlight}`}>₹{fmt(e.b)}</td><td className={`p-3 text-right ${theme.primaryText} font-medium`}>₹{fmt(e.g)}</td><td className="p-3 text-right text-red-400">₹{fmt(e.de)}</td><td className="p-3 text-right text-emerald-400 font-bold">₹{fmt(e.net)}</td><td className="p-3 text-center"><span className={`px-2 py-1 text-xs rounded-full font-bold ${e.s === 'Processed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>{e.s}</span></td></tr>)}</tbody></table>
      </div>
    </div>
  );
}

// ─── PERFORMANCE ──────────────────────────────────────
function PerformanceModule({ theme }: { theme: Theme }) {
  return (
    <div className="space-y-4">
      <h1 className={`text-xl font-bold ${theme.highlight}`}>Performance &amp; Appraisal</h1>
      <div className={`${theme.cardBg} rounded-xl border ${theme.border} p-4`}>
        <div className="flex justify-between mb-3"><div><h3 className={`font-semibold ${theme.highlight}`}>Annual Appraisal 2025-26</h3><p className={`text-sm ${theme.iconColor}`}>Apr 2025 - Mar 2026</p></div><span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full font-bold h-fit">In Progress</span></div>
        <div className="mb-3"><div className="flex justify-between text-sm mb-1"><span className={theme.iconColor}>Progress</span><span className={theme.highlight}>65%</span></div><div className={`h-2 ${theme.secondaryBg} rounded-full`}><div className={`h-2 ${theme.primary} rounded-full`} style={{ width: '65%' }} /></div></div>
        <div className="flex items-center gap-1 flex-wrap">{['Self Review', 'Peer Review', 'HOD Review', 'Principal', 'Final'].map((s, i) => <React.Fragment key={i}><span className={`px-2 py-1 rounded-full text-xs font-bold ${i < 1 ? 'bg-emerald-500/20 text-emerald-400' : i === 1 ? 'bg-blue-500/20 text-blue-400' : `${theme.secondaryBg} ${theme.iconColor}`}`}>{s}</span>{i < 4 && <ChevronRight size={12} className={theme.iconColor} />}</React.Fragment>)}</div>
      </div>
      <div className={`${theme.cardBg} rounded-xl border ${theme.border} p-4`}>
        <h4 className={`font-medium mb-3 ${theme.highlight}`}>Department Completion</h4>
        {[{ n: 'Teaching', s: 45, t: 68 }, { n: 'Admin', s: 18, t: 22 }, { n: 'Transport', s: 10, t: 18 }, { n: 'Security', s: 6, t: 12 }].map((d) => <div key={d.n} className="flex items-center gap-3 mb-2"><span className={`text-sm w-20 ${theme.iconColor}`}>{d.n}</span><div className={`flex-1 h-2 ${theme.secondaryBg} rounded-full`}><div className={`h-2 ${theme.primary} rounded-full`} style={{ width: (d.s / d.t) * 100 + '%' }} /></div><span className={`text-sm w-20 ${theme.highlight}`}>{d.s}/{d.t}</span></div>)}
      </div>
    </div>
  );
}

// ─── HR LETTERS ───────────────────────────────────────
function LettersModule({ theme }: { theme: Theme }) {
  const [showModal, setShowModal] = useState(false);
  const templates = ['Appointment Letter', 'Experience Letter', 'Salary Certificate', 'Relieving Letter', 'Warning Letter', 'NOC'];
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center"><h1 className={`text-xl font-bold ${theme.highlight}`}>HR Letters</h1><button onClick={() => setShowModal(true)} className={`px-3 py-2 ${theme.primary} text-white rounded-lg text-sm`}>Generate Letter</button></div>
      <div className="grid grid-cols-3 gap-4">{templates.map((t) => <div key={t} className={`${theme.cardBg} rounded-xl border ${theme.border} p-4`}><div className="flex items-center gap-3 mb-3"><div className={`w-10 h-10 ${theme.secondaryBg} rounded-lg flex items-center justify-center`}><FileText size={18} className={theme.primaryText} /></div><h4 className={`font-medium ${theme.highlight}`}>{t}</h4></div><button onClick={() => setShowModal(true)} className={`w-full py-1.5 ${theme.primary} text-white rounded-lg text-xs font-bold`}>Generate</button></div>)}</div>
      {showModal && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"><div className={`${theme.cardBg} rounded-2xl p-6 w-96 border ${theme.border}`}><div className="flex justify-between mb-4"><h3 className={`font-semibold ${theme.highlight}`}>Generate Letter</h3><button onClick={() => setShowModal(false)} className={theme.iconColor}><X size={18} /></button></div><div className="space-y-3"><div><label className={`block text-sm mb-1 ${theme.iconColor}`}>Template *</label><select className={`w-full px-3 py-2 border ${theme.border} rounded-lg text-sm ${theme.inputBg} ${theme.highlight}`}>{templates.map((t) => <option key={t}>{t}</option>)}</select></div><div><label className={`block text-sm mb-1 ${theme.iconColor}`}>Employee *</label><select className={`w-full px-3 py-2 border ${theme.border} rounded-lg text-sm ${theme.inputBg} ${theme.highlight}`}>{employees.map((e) => <option key={e.id}>{e.name}</option>)}</select></div></div><div className="flex justify-end gap-2 mt-4"><button onClick={() => setShowModal(false)} className={`px-4 py-2 border ${theme.border} rounded-lg text-sm ${theme.highlight}`}>Cancel</button><button className={`px-4 py-2 ${theme.primary} text-white rounded-lg text-sm`}>Generate</button></div></div></div>}
    </div>
  );
}

// ─── OFFBOARDING ──────────────────────────────────────
function OffboardingModule({ theme }: { theme: Theme }) {
  const exits = [{ id: 'EMP101', n: 'Amit Shah', i: 'AS', d: 'Teaching', r: '15-Jan-2026', l: '15-Feb-2026', c: 3, t: 8 }, { id: 'EMP102', n: 'Rekha Bose', i: 'RB', d: 'Admin', r: '20-Jan-2026', l: '19-Feb-2026', c: 5, t: 8 }];
  return (
    <div className="space-y-4">
      <h1 className={`text-xl font-bold ${theme.highlight}`}>Offboarding</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className={`${theme.cardBg} border border-amber-500/30 rounded-xl p-4 flex items-center gap-3`}><Clock size={20} className="text-amber-400" /><div><p className={`text-xl font-bold ${theme.highlight}`}>2</p><p className={`text-sm ${theme.iconColor}`}>Pending Exits</p></div></div>
        <div className={`${theme.cardBg} border border-blue-500/30 rounded-xl p-4 flex items-center gap-3`}><Calendar size={20} className="text-blue-400" /><div><p className={`text-xl font-bold ${theme.highlight}`}>3</p><p className={`text-sm ${theme.iconColor}`}>Notice Period</p></div></div>
        <div className={`${theme.cardBg} border border-red-500/30 rounded-xl p-4 flex items-center gap-3`}><XCircle size={20} className="text-red-400" /><div><p className={`text-xl font-bold ${theme.highlight}`}>1</p><p className={`text-sm ${theme.iconColor}`}>Pending Clearance</p></div></div>
      </div>
      <div className={`${theme.cardBg} rounded-xl border ${theme.border} overflow-hidden`}>
        <table className="w-full text-sm"><thead><tr className={theme.secondaryBg}><th className={`p-3 text-left text-xs font-bold ${theme.iconColor}`}>Employee</th><th className={`p-3 text-center text-xs font-bold ${theme.iconColor}`}>Resignation</th><th className={`p-3 text-center text-xs font-bold ${theme.iconColor}`}>Last Day</th><th className={`p-3 text-xs font-bold ${theme.iconColor}`}>Clearance</th></tr></thead>
        <tbody>{exits.map((e) => <tr key={e.id} className={`border-t ${theme.border}`}><td className="p-3"><div className="flex items-center gap-2"><div className={`w-7 h-7 ${theme.secondaryBg} rounded-full flex items-center justify-center text-xs font-bold ${theme.primaryText}`}>{e.i}</div><div><p className={`font-medium ${theme.highlight}`}>{e.n}</p><p className={`text-xs ${theme.iconColor}`}>{e.d}</p></div></div></td><td className={`p-3 text-center ${theme.highlight}`}>{e.r}</td><td className={`p-3 text-center ${theme.highlight}`}>{e.l}</td><td className="p-3"><div className="flex items-center gap-2"><div className={`flex-1 h-2 ${theme.secondaryBg} rounded-full`}><div className="h-2 bg-amber-500 rounded-full" style={{ width: (e.c / e.t) * 100 + '%' }} /></div><span className={`text-xs ${theme.highlight}`}>{e.c}/{e.t}</span></div></td></tr>)}</tbody></table>
      </div>
    </div>
  );
}

// ─── REPORTS ──────────────────────────────────────────
function ReportsModule({ theme }: { theme: Theme }) {
  const depts = [{ n: 'Teaching', v: 68, c: '#6366F1' }, { n: 'Admin', v: 22, c: '#3B82F6' }, { n: 'Transport', v: 18, c: '#F59E0B' }, { n: 'Security', v: 12, c: '#EF4444' }, { n: 'Support', v: 15, c: '#6B7280' }];
  return (
    <div className="space-y-4">
      <h1 className={`text-xl font-bold ${theme.highlight}`}>Reports &amp; Analytics</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className={`${theme.cardBg} rounded-xl border ${theme.border} p-4`}><h4 className={`font-medium mb-3 ${theme.highlight}`}>Department Distribution</h4>{depts.map((d) => <div key={d.n} className="flex items-center gap-2 mb-2"><div className="w-3 h-3 rounded" style={{ backgroundColor: d.c }} /><span className={`text-sm flex-1 ${theme.highlight}`}>{d.n}</span><div className={`w-24 h-2 ${theme.secondaryBg} rounded-full`}><div className="h-2 rounded-full" style={{ width: (d.v / 68) * 100 + '%', backgroundColor: d.c }} /></div><span className={`text-sm w-6 ${theme.highlight}`}>{d.v}</span></div>)}</div>
        <div className={`${theme.cardBg} rounded-xl border ${theme.border} p-4`}><h4 className={`font-medium mb-3 ${theme.highlight}`}>Gender Diversity</h4><div className="flex items-center justify-center gap-6 py-4"><div className="text-center"><p className="text-2xl font-bold text-indigo-400">58%</p><p className={`text-sm ${theme.iconColor}`}>Male</p></div><div className="w-20 h-20 rounded-full border-8 border-indigo-500" style={{ borderRightColor: '#10B981', borderBottomColor: '#10B981' }} /><div className="text-center"><p className="text-2xl font-bold text-emerald-400">42%</p><p className={`text-sm ${theme.iconColor}`}>Female</p></div></div></div>
      </div>
      <div className="grid grid-cols-4 gap-4">{['Muster Roll', 'Staff Directory', 'Salary Statement', 'Leave Report'].map((r) => <div key={r} className={`${theme.cardBg} rounded-xl border ${theme.border} p-4`}><h5 className={`font-medium mb-2 ${theme.highlight}`}>{r}</h5><p className={`text-xs ${theme.iconColor} mb-3`}>Generate detailed {r.toLowerCase()}</p><button className={`w-full py-2 ${theme.primary} text-white rounded-lg text-sm font-bold`}>Generate</button></div>)}</div>
    </div>
  );
}

// ─── SETTINGS (7 sub-sections) ────────────────────────
function SettingsModule({ theme }: { theme: Theme }) {
  const [section, setSection] = useState('general');
  const [selectedDept, setSelectedDept] = useState('Teaching');
  const navItems = [{ id: 'general', icon: Settings, label: 'General' }, { id: 'employee', icon: Users, label: 'Employee Info' }, { id: 'attendance', icon: Clock, label: 'Attendance' }, { id: 'leave', icon: Calendar, label: 'Leave Tracker' }, { id: 'workflows', icon: GitBranch, label: 'Workflows' }, { id: 'approvals', icon: Shield, label: 'Approvals' }, { id: 'notifications', icon: Bell, label: 'Notifications' }];
  const departments = [{ n: 'Teaching', c: 68 }, { n: 'Administration', c: 22 }, { n: 'Transport', c: 18 }, { n: 'Security', c: 12 }, { n: 'Support Staff', c: 15 }, { n: 'Lab & Library', c: 7 }];
  const designations: Record<string, string[]> = { Teaching: ['Principal', 'Vice Principal', 'HOD', 'PGT', 'TGT', 'PRT'], Administration: ['Admin Head', 'Accountant', 'Office Assistant'], Transport: ['Driver', 'Helper'], Security: ['Security Guard'], 'Support Staff': ['Peon', 'Sweeper'], 'Lab & Library': ['Lab Assistant', 'Librarian'] };
  const leaves = [{ t: 'Casual Leave', p: 'Paid', d: '12', cf: 'No', e: 'No', a: 'All' }, { t: 'Earned Leave', p: 'Paid', d: '12', cf: 'Yes', e: 'Yes', a: 'Confirmed' }, { t: 'Sick Leave', p: 'Paid', d: '12', cf: 'No', e: 'No', a: 'All' }, { t: 'Maternity', p: 'Paid', d: '180', cf: 'No', e: 'No', a: 'Female' }, { t: 'Paternity', p: 'Paid', d: '15', cf: 'No', e: 'No', a: 'Male' }, { t: 'LWP', p: 'Unpaid', d: '∞', cf: 'No', e: 'No', a: 'All' }];
  const holidays = [{ d: '26-Jan-2026', n: 'Republic Day' }, { d: '14-Mar-2026', n: 'Holi' }, { d: '14-Apr-2026', n: 'Ambedkar Jayanti' }, { d: '15-Aug-2026', n: 'Independence Day' }, { d: '02-Oct-2026', n: 'Gandhi Jayanti' }, { d: '20-Oct-2026', n: 'Dussehra' }, { d: '08-Nov-2026', n: 'Diwali' }, { d: '25-Dec-2026', n: 'Christmas' }];
  const shifts = [{ n: 'Morning', s: '7:00 AM', e: '2:00 PM', a: 'Teaching' }, { n: 'Regular', s: '9:00 AM', e: '6:00 PM', a: 'Admin' }, { n: 'Night', s: '10:00 PM', e: '6:00 AM', a: 'Security' }];
  const workflows = [{ n: 'New Employee', f: 'Employee', t: 'On Create', a: 'Mail HR' }, { n: 'Leave Applied', f: 'Leave', t: 'On Create', a: 'Mail Manager' }, { n: 'Leave Approved', f: 'Leave', t: 'On Approval', a: 'Mail Employee' }, { n: 'Absent Marked', f: 'Attendance', t: 'Auto', a: 'Mail Employee' }];
  const approvals = [{ n: 'Leave', l: 2, f: ['Employee', 'Manager', 'HOD', 'Auto'] }, { n: 'Regularization', l: 1, f: ['Employee', 'Manager'] }, { n: 'Letter Request', l: 2, f: ['Employee', 'HR', 'Principal'] }, { n: 'Resignation', l: 3, f: ['Employee', 'HOD', 'HR', 'Principal'] }];
  const notifs = [{ n: 'New employee onboarded', to: 'HR, Admin' }, { n: 'Leave request', to: 'Manager' }, { n: 'Leave approved/rejected', to: 'Employee' }, { n: 'Absent marked', to: 'Employee, Manager' }, { n: 'Salary processed', to: 'Employee' }, { n: 'Birthday reminder', to: 'All Staff' }, { n: 'Work anniversary', to: 'HR, All' }, { n: 'Probation ending', to: 'HR, Manager' }];

  return (
    <div className="space-y-4">
      <h1 className={`text-xl font-bold ${theme.highlight}`}>Settings</h1>
      <div className="flex gap-4">
        <div className={`w-44 ${theme.cardBg} rounded-xl border ${theme.border} p-2 shrink-0`}>{navItems.map((item) => <button key={item.id} onClick={() => setSection(item.id)} className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm mb-1 ${section === item.id ? `${theme.primary} text-white` : `${theme.iconColor} ${theme.buttonHover}`}`}><item.icon size={16} />{item.label}</button>)}</div>
        <div className="flex-1 space-y-4">
          {section === 'general' && <>
            <div className={`${theme.cardBg} rounded-xl border ${theme.border} p-4`}><h3 className={`font-semibold mb-3 ${theme.highlight}`}>School Information</h3><div className="grid grid-cols-2 gap-4"><div><label className={`block text-sm ${theme.iconColor} mb-1`}>School Name</label><input defaultValue="Delhi Public School, Ahmedabad" className={`w-full px-3 py-2 border ${theme.border} rounded-lg text-sm ${theme.inputBg} ${theme.highlight}`} /></div><div><label className={`block text-sm ${theme.iconColor} mb-1`}>Academic Year</label><select className={`w-full px-3 py-2 border ${theme.border} rounded-lg text-sm ${theme.inputBg} ${theme.highlight}`}><option>2025-26</option></select></div></div></div>
            <div className={`${theme.cardBg} rounded-xl border ${theme.border} p-4`}><h3 className={`font-semibold mb-3 ${theme.highlight}`}>Employee ID Configuration</h3><div className="flex items-center justify-between mb-3"><span className={`text-sm ${theme.highlight}`}>Auto-generate Employee ID</span><Tgl on={true} theme={theme} /></div><div className="grid grid-cols-3 gap-4"><div><label className={`block text-sm ${theme.iconColor} mb-1`}>Prefix</label><input defaultValue="EMP" className={`w-full px-3 py-2 border ${theme.border} rounded-lg text-sm ${theme.inputBg} ${theme.highlight}`} /></div><div><label className={`block text-sm ${theme.iconColor} mb-1`}>Format</label><select className={`w-full px-3 py-2 border ${theme.border} rounded-lg text-sm ${theme.inputBg} ${theme.highlight}`}><option>Sequential</option></select></div><div><label className={`block text-sm ${theme.iconColor} mb-1`}>Starting #</label><input defaultValue="001" className={`w-full px-3 py-2 border ${theme.border} rounded-lg text-sm ${theme.inputBg} ${theme.highlight}`} /></div></div></div>
            <div className={`${theme.cardBg} rounded-xl border ${theme.border} p-4`}><h3 className={`font-semibold mb-3 ${theme.highlight}`}>Employee Statuses</h3><table className="w-full text-sm"><thead><tr className={theme.secondaryBg}><th className={`p-2 text-left text-xs ${theme.iconColor}`}>Status</th><th className={`p-2 text-center text-xs ${theme.iconColor}`}>Type</th><th className={`p-2 text-center text-xs ${theme.iconColor}`}>Actions</th></tr></thead><tbody>{[{ n: 'Active', t: 'Active' }, { n: 'Probation', t: 'Active' }, { n: 'Notice Period', t: 'Active' }, { n: 'Terminated', t: 'Inactive' }, { n: 'Resigned', t: 'Inactive' }].map((s, i) => <tr key={i} className={`border-t ${theme.border}`}><td className={`p-2 ${theme.highlight}`}>{s.n}</td><td className="p-2 text-center"><span className={`px-2 py-0.5 text-xs rounded-full font-bold ${s.t === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>{s.t}</span></td><td className="p-2 text-center"><Edit size={14} className={`inline ${theme.iconColor} mr-1`} /><Trash2 size={14} className={`inline ${theme.iconColor}`} /></td></tr>)}</tbody></table></div>
          </>}
          {section === 'employee' && <div className={`${theme.cardBg} rounded-xl border ${theme.border} p-4`}><h3 className={`font-semibold mb-3 ${theme.highlight}`}>Departments &amp; Designations</h3><div className="grid grid-cols-2 gap-6"><div><h4 className={`text-sm font-medium ${theme.iconColor} mb-2`}>Departments</h4>{departments.map((d) => <div key={d.n} onClick={() => setSelectedDept(d.n)} className={`flex items-center justify-between p-2 rounded-lg mb-1 cursor-pointer ${selectedDept === d.n ? `${theme.secondaryBg} border ${theme.border}` : theme.buttonHover}`}><div className="flex items-center gap-2"><GripVertical size={12} className={theme.iconColor} /><span className={`text-sm ${theme.highlight}`}>{d.n}</span><span className={`text-xs ${theme.iconColor}`}>({d.c})</span></div><div><Edit size={12} className={`inline ${theme.iconColor} mr-1`} /><Trash2 size={12} className={`inline ${theme.iconColor}`} /></div></div>)}<button className={`flex items-center gap-1 text-sm ${theme.primaryText} mt-2`}><Plus size={14} />Add Dept</button></div><div><h4 className={`text-sm font-medium ${theme.iconColor} mb-2`}>Designations — {selectedDept}</h4>{(designations[selectedDept] || []).map((d) => <div key={d} className={`flex items-center justify-between p-2 ${theme.secondaryBg} rounded-lg mb-1`}><span className={`text-sm ${theme.highlight}`}>{d}</span><div><Edit size={12} className={`inline ${theme.iconColor} mr-1`} /><Trash2 size={12} className={`inline ${theme.iconColor}`} /></div></div>)}<button className={`flex items-center gap-1 text-sm ${theme.primaryText} mt-2`}><Plus size={14} />Add Designation</button></div></div></div>}
          {section === 'attendance' && <>
            <div className={`${theme.cardBg} rounded-xl border ${theme.border} p-4`}><h3 className={`font-semibold mb-3 ${theme.highlight}`}>Attendance Methods</h3>{[{ n: 'Biometric Integration', on: false }, { n: 'Manual Check-in (Web)', on: true }, { n: 'Manual Check-in (Mobile)', on: true }, { n: 'Kiosk Mode', on: false }].map((m, i) => <div key={i} className={`flex items-center justify-between p-2 ${theme.secondaryBg} rounded-lg mb-2`}><span className={`text-sm ${theme.highlight}`}>{m.n}</span><Tgl on={m.on} theme={theme} /></div>)}</div>
            <div className={`${theme.cardBg} rounded-xl border ${theme.border} p-4`}><h3 className={`font-semibold mb-3 ${theme.highlight}`}>Shifts / Schedules</h3><table className="w-full text-sm"><thead><tr className={theme.secondaryBg}><th className={`p-2 text-left text-xs ${theme.iconColor}`}>Shift</th><th className={`p-2 text-center text-xs ${theme.iconColor}`}>Start</th><th className={`p-2 text-center text-xs ${theme.iconColor}`}>End</th><th className={`p-2 text-left text-xs ${theme.iconColor}`}>For</th></tr></thead><tbody>{shifts.map((s, i) => <tr key={i} className={`border-t ${theme.border}`}><td className={`p-2 font-medium ${theme.highlight}`}>{s.n}</td><td className={`p-2 text-center ${theme.highlight}`}>{s.s}</td><td className={`p-2 text-center ${theme.highlight}`}>{s.e}</td><td className={`p-2 ${theme.iconColor}`}>{s.a}</td></tr>)}</tbody></table></div>
          </>}
          {section === 'leave' && <>
            <div className={`${theme.cardBg} rounded-xl border ${theme.border} p-4`}><h3 className={`font-semibold mb-3 ${theme.highlight}`}>Leave Policies</h3><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className={theme.secondaryBg}><th className={`p-2 text-left text-xs ${theme.iconColor}`}>Leave Type</th><th className={`p-2 text-center text-xs ${theme.iconColor}`}>Type</th><th className={`p-2 text-center text-xs ${theme.iconColor}`}>Days</th><th className={`p-2 text-center text-xs ${theme.iconColor}`}>Carry</th><th className={`p-2 text-center text-xs ${theme.iconColor}`}>Encash</th><th className={`p-2 text-left text-xs ${theme.iconColor}`}>For</th><th className={`p-2 text-center text-xs ${theme.iconColor}`}>Active</th></tr></thead><tbody>{leaves.map((l, i) => <tr key={i} className={`border-t ${theme.border}`}><td className={`p-2 font-medium ${theme.highlight}`}>{l.t}</td><td className="p-2 text-center"><span className={`px-2 py-0.5 text-xs rounded-full font-bold ${l.p === 'Paid' ? 'bg-emerald-500/20 text-emerald-400' : `${theme.secondaryBg} ${theme.iconColor}`}`}>{l.p}</span></td><td className={`p-2 text-center ${theme.highlight}`}>{l.d}</td><td className={`p-2 text-center ${theme.highlight}`}>{l.cf}</td><td className={`p-2 text-center ${theme.highlight}`}>{l.e}</td><td className={`p-2 ${theme.iconColor}`}>{l.a}</td><td className="p-2 text-center"><Tgl on={true} theme={theme} /></td></tr>)}</tbody></table></div></div>
            <div className={`${theme.cardBg} rounded-xl border ${theme.border} p-4`}><h3 className={`font-semibold mb-3 ${theme.highlight}`}>Holidays 2025-26</h3><table className="w-full text-sm"><thead><tr className={theme.secondaryBg}><th className={`p-2 text-left text-xs ${theme.iconColor}`}>Date</th><th className={`p-2 text-left text-xs ${theme.iconColor}`}>Holiday</th><th className={`p-2 text-center text-xs ${theme.iconColor}`}>Actions</th></tr></thead><tbody>{holidays.map((h, i) => <tr key={i} className={`border-t ${theme.border}`}><td className={`p-2 ${theme.highlight}`}>{h.d}</td><td className={`p-2 font-medium ${theme.highlight}`}>{h.n}</td><td className="p-2 text-center"><Edit size={14} className={`inline ${theme.iconColor} mr-1`} /><Trash2 size={14} className={`inline ${theme.iconColor}`} /></td></tr>)}</tbody></table></div>
          </>}
          {section === 'workflows' && <div className={`${theme.cardBg} rounded-xl border ${theme.border} p-4`}><h3 className={`font-semibold mb-3 ${theme.highlight}`}>Configured Workflows</h3><table className="w-full text-sm"><thead><tr className={theme.secondaryBg}><th className={`p-2 text-left text-xs ${theme.iconColor}`}>Workflow</th><th className={`p-2 text-left text-xs ${theme.iconColor}`}>Form</th><th className={`p-2 text-left text-xs ${theme.iconColor}`}>Trigger</th><th className={`p-2 text-left text-xs ${theme.iconColor}`}>Action</th><th className={`p-2 text-center text-xs ${theme.iconColor}`}>Active</th></tr></thead><tbody>{workflows.map((w, i) => <tr key={i} className={`border-t ${theme.border}`}><td className={`p-2 font-medium ${theme.highlight}`}>{w.n}</td><td className={`p-2 ${theme.iconColor}`}>{w.f}</td><td className={`p-2 ${theme.iconColor}`}>{w.t}</td><td className={`p-2 ${theme.iconColor}`}>{w.a}</td><td className="p-2 text-center"><Tgl on={true} theme={theme} /></td></tr>)}</tbody></table></div>}
          {section === 'approvals' && <div className="space-y-4">{approvals.map((a, i) => <div key={i} className={`${theme.cardBg} rounded-xl border ${theme.border} p-4`}><h3 className={`font-semibold mb-3 ${theme.highlight}`}>{a.n} Approval</h3><div className="flex items-center gap-1 mb-3 flex-wrap">{a.f.map((s, j) => <React.Fragment key={j}><span className={`px-2 py-1 rounded-full text-xs font-bold ${j === 0 ? 'bg-blue-500/20 text-blue-400' : j === a.f.length - 1 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>{s}</span>{j < a.f.length - 1 && <ChevronRight size={12} className={theme.iconColor} />}</React.Fragment>)}</div><div className="flex items-center gap-4"><label className={`text-sm ${theme.iconColor}`}>Levels: <select className={`px-2 py-1 border ${theme.border} rounded-lg text-sm ${theme.inputBg} ${theme.highlight} ml-1`}><option>{a.l}</option></select></label><label className={`text-sm ${theme.iconColor}`}>Auto-approve: <select className={`px-2 py-1 border ${theme.border} rounded-lg text-sm ${theme.inputBg} ${theme.highlight} ml-1`}><option>3 days</option></select></label></div></div>)}</div>}
          {section === 'notifications' && <div className={`${theme.cardBg} rounded-xl border ${theme.border} p-4`}><h3 className={`font-semibold mb-3 ${theme.highlight}`}>Email Notifications</h3><table className="w-full text-sm"><thead><tr className={theme.secondaryBg}><th className={`p-2 text-left text-xs ${theme.iconColor}`}>Notification</th><th className={`p-2 text-left text-xs ${theme.iconColor}`}>Recipients</th><th className={`p-2 text-center text-xs ${theme.iconColor}`}>Enabled</th></tr></thead><tbody>{notifs.map((n, i) => <tr key={i} className={`border-t ${theme.border}`}><td className={`p-2 ${theme.highlight}`}>{n.n}</td><td className={`p-2 ${theme.iconColor}`}>{n.to}</td><td className="p-2 text-center"><Tgl on={true} theme={theme} /></td></tr>)}</tbody></table></div>}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────
function HRManagerDashboard({ theme }: { theme?: Theme }) {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [selectedEmp, setSelectedEmp] = useState(employees[0]);
  if (!theme) return null;

  return (
    <div className="flex gap-4 -m-6">
      <div className={`w-48 ${theme.cardBg} border-r ${theme.border} min-h-screen p-2 space-y-0.5 shrink-0`}>
        <p className={`text-[10px] font-bold ${theme.iconColor} uppercase px-3 py-2`}>HR Modules</p>
        {modules.map(m => (
          <button key={m.id} onClick={() => setActiveModule(m.id)} className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${activeModule === m.id ? `${theme.primary} text-white` : `${theme.iconColor} ${theme.buttonHover}`}`}>
            <m.icon size={14} /> {m.label}
          </button>
        ))}
      </div>
      <div className="flex-1 p-6 space-y-4 overflow-x-hidden">
        {activeModule === 'dashboard' && <DashboardModule theme={theme} setActive={setActiveModule} />}
        {activeModule === 'employees' && <EmployeeList theme={theme} setActive={setActiveModule} setSelectedEmp={setSelectedEmp} />}
        {activeModule === 'profile' && <EmployeeProfile theme={theme} emp={selectedEmp} setActive={setActiveModule} />}
        {activeModule === 'addemployee' && <AddEmployee theme={theme} setActive={setActiveModule} />}
        {activeModule === 'onboarding' && <OnboardingModule theme={theme} />}
        {activeModule === 'attendance' && <AttendanceModule theme={theme} />}
        {activeModule === 'leave' && <LeaveModule theme={theme} />}
        {activeModule === 'payroll' && <PayrollModule theme={theme} />}
        {activeModule === 'performance' && <PerformanceModule theme={theme} />}
        {activeModule === 'letters' && <LettersModule theme={theme} />}
        {activeModule === 'offboarding' && <OffboardingModule theme={theme} />}
        {activeModule === 'reports' && <ReportsModule theme={theme} />}
        {activeModule === 'settings' && <SettingsModule theme={theme} />}
        {activeModule === 'my-profile' && <StakeholderProfile role="hr-manager" theme={theme} />}
      </div>
    </div>
  );
}

export default function HRManagerPage() {
  return <BlueprintLayout><HRManagerDashboard /></BlueprintLayout>;
}
