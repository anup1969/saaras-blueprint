'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import {
  User, Mail, Phone, Calendar, Clock, Download, Edit, Bell,
  Lock, Award, Bus, GraduationCap, Shield, Users, Monitor,
  PhoneCall, Briefcase, Calculator, Eye, ShieldCheck, Headphones,
  KeyRound, LogOut, Building2, UserCheck
} from 'lucide-react';

// ─── TYPES ───────────────────────────────────────────
type ProfileTab = 'personal' | 'salary' | 'attendance' | 'leave' | 'fees' | 'account';
type FieldType = 'editable' | 'locked';
type PersonalField = { label: string; value: string; type?: FieldType };

interface ProfileConfig {
  name: string;
  role: string;
  empId: string;
  icon: React.ElementType;
  badges: { text: string; color: string }[];
  quickInfo: { icon: React.ElementType; text: string }[];
  tabs: ProfileTab[];
  personal: { left: PersonalField[]; right: PersonalField[] };
  salary?: { basic: number; hra: number; da: number; allowances: number; pf: number; pt: number; tds: number };
}

// ─── PROFILE CONFIGS ─────────────────────────────────
const profileConfigs: Record<string, ProfileConfig> = {
  teacher: {
    name: 'Priya Sharma', role: 'PGT Mathematics', empId: 'EMP001', icon: GraduationCap,
    badges: [{ text: 'Active', color: 'emerald' }, { text: 'Mathematics', color: 'blue' }],
    quickInfo: [
      { icon: Calendar, text: 'Joined: 15-Jun-2019' }, { icon: Clock, text: '6.5 Yrs' },
      { icon: Phone, text: '+91 98765 43210' }, { icon: Mail, text: 'priya.sharma@school.edu' },
    ],
    tabs: ['personal', 'salary', 'attendance', 'leave', 'account'],
    personal: {
      left: [{ label: 'Full Name', value: 'Priya Sharma' }, { label: 'DOB', value: '15-Mar-1990' }, { label: 'Gender', value: 'Female' }, { label: 'Blood Group', value: 'B+' }, { label: 'Marital Status', value: 'Married' }, { label: 'Nationality', value: 'Indian' }],
      right: [{ label: 'Phone', value: '+91 98765 43210', type: 'editable' }, { label: 'Email', value: 'priya@gmail.com', type: 'editable' }, { label: 'Address', value: '12, Satellite Rd, Ahmedabad', type: 'editable' }, { label: 'Aadhaar', value: 'XXXX-XXXX-1234', type: 'locked' }, { label: 'PAN', value: 'XXXXX4567X', type: 'locked' }, { label: 'Emergency Contact', value: '+91 98765 99999', type: 'editable' }],
    },
    salary: { basic: 35000, hra: 14000, da: 3500, allowances: 5000, pf: 4200, pt: 200, tds: 2500 },
  },
  student: {
    name: 'Arjun Mehta', role: 'Class 10th A • Roll No: 24', empId: 'DPS/2020/1547', icon: GraduationCap,
    badges: [{ text: 'Active', color: 'emerald' }, { text: '2025-26', color: 'blue' }, { text: 'Red House', color: 'red' }],
    quickInfo: [
      { icon: Calendar, text: 'DOB: 12-May-2011' }, { icon: Bus, text: 'Route 7' },
      { icon: Building2, text: 'Admission: DPS/2020/1547' },
    ],
    tabs: ['personal', 'fees', 'account'],
    personal: {
      left: [{ label: 'Full Name', value: 'Arjun Mehta' }, { label: 'DOB', value: '12-May-2011' }, { label: 'Gender', value: 'Male' }, { label: 'Blood Group', value: 'O+' }, { label: 'Nationality', value: 'Indian' }, { label: 'Religion', value: 'Hindu' }, { label: 'Category', value: 'General' }, { label: 'House', value: 'Red House' }],
      right: [{ label: 'Father', value: 'Rajesh Mehta', type: 'locked' }, { label: 'Mother', value: 'Sneha Mehta', type: 'locked' }, { label: 'Parent Phone', value: '+91 99887 76655', type: 'locked' }, { label: 'Parent Email', value: 'rajesh.mehta@gmail.com', type: 'locked' }, { label: 'Address', value: '45, Bodakdev, Ahmedabad', type: 'locked' }, { label: 'Previous School', value: "St. Xavier's Primary", type: 'locked' }, { label: 'Joined', value: '01-Apr-2020', type: 'locked' }],
    },
  },
  parent: {
    name: 'Rajesh Mehta', role: 'Father', empId: '', icon: Users,
    badges: [{ text: 'Active', color: 'emerald' }, { text: '2 Children', color: 'blue' }],
    quickInfo: [
      { icon: Phone, text: '+91 99887 76655' }, { icon: Mail, text: 'rajesh.mehta@gmail.com' },
      { icon: Users, text: 'Arjun (10th A), Riya (7th B)' },
    ],
    tabs: ['personal', 'account'],
    personal: {
      left: [{ label: 'Full Name', value: 'Rajesh Mehta' }, { label: 'DOB', value: '08-Sep-1980' }, { label: 'Gender', value: 'Male' }, { label: 'Relation', value: 'Father' }, { label: 'Occupation', value: 'Business Owner' }, { label: 'Nationality', value: 'Indian' }],
      right: [{ label: 'Phone', value: '+91 99887 76655', type: 'editable' }, { label: 'Email', value: 'rajesh.mehta@gmail.com', type: 'editable' }, { label: 'Address', value: '45, Bodakdev, Ahmedabad 380054', type: 'editable' }, { label: 'Spouse', value: 'Sneha Mehta', type: 'locked' }, { label: 'Spouse Phone', value: '+91 99887 76656', type: 'editable' }, { label: 'Aadhaar', value: 'XXXX-XXXX-9876', type: 'locked' }],
    },
  },
  principal: {
    name: 'Dr. Suresh Mehta', role: 'Principal', empId: 'EMP-PRC-001', icon: Award,
    badges: [{ text: 'Active', color: 'emerald' }, { text: 'Ph.D Education', color: 'blue' }],
    quickInfo: [
      { icon: Calendar, text: 'Joined: 01-Apr-2015' }, { icon: Clock, text: '11 Yrs' },
      { icon: Phone, text: '+91 98765 00001' }, { icon: Mail, text: 'principal@school.edu' },
    ],
    tabs: ['personal', 'salary', 'account'],
    personal: {
      left: [{ label: 'Full Name', value: 'Dr. Suresh Mehta' }, { label: 'DOB', value: '10-Jan-1970' }, { label: 'Gender', value: 'Male' }, { label: 'Blood Group', value: 'A+' }, { label: 'Marital Status', value: 'Married' }, { label: 'Qualification', value: 'Ph.D Education, M.Ed, B.Ed' }],
      right: [{ label: 'Phone', value: '+91 98765 00001', type: 'editable' }, { label: 'Email', value: 'suresh.mehta@gmail.com', type: 'editable' }, { label: 'Address', value: '1, Science City Rd, Ahmedabad', type: 'editable' }, { label: 'Aadhaar', value: 'XXXX-XXXX-0001', type: 'locked' }, { label: 'PAN', value: 'XXXXX0001X', type: 'locked' }, { label: 'Emergency Contact', value: '+91 98765 00002', type: 'editable' }],
    },
    salary: { basic: 75000, hra: 30000, da: 7500, allowances: 12000, pf: 9000, pt: 200, tds: 12000 },
  },
  'vice-principal': {
    name: 'Rekha Joshi', role: 'Vice Principal', empId: 'EMP-VP-001', icon: UserCheck,
    badges: [{ text: 'Active', color: 'emerald' }, { text: 'M.Ed', color: 'blue' }],
    quickInfo: [
      { icon: Calendar, text: 'Joined: 15-Jun-2016' }, { icon: Clock, text: '9.5 Yrs' },
      { icon: Phone, text: '+91 98765 00010' }, { icon: Mail, text: 'vp@school.edu' },
    ],
    tabs: ['personal', 'salary', 'attendance', 'account'],
    personal: {
      left: [{ label: 'Full Name', value: 'Rekha Joshi' }, { label: 'DOB', value: '22-Aug-1975' }, { label: 'Gender', value: 'Female' }, { label: 'Blood Group', value: 'B+' }, { label: 'Marital Status', value: 'Married' }, { label: 'Qualification', value: 'M.Ed, B.Ed' }],
      right: [{ label: 'Phone', value: '+91 98765 00010', type: 'editable' }, { label: 'Email', value: 'rekha.joshi@gmail.com', type: 'editable' }, { label: 'Address', value: '14, Paldi, Ahmedabad', type: 'editable' }, { label: 'Aadhaar', value: 'XXXX-XXXX-0010', type: 'locked' }, { label: 'PAN', value: 'XXXXX0010X', type: 'locked' }, { label: 'Emergency Contact', value: '+91 98765 00011', type: 'editable' }],
    },
    salary: { basic: 55000, hra: 22000, da: 5500, allowances: 8000, pf: 6600, pt: 200, tds: 7000 },
  },
  'hr-manager': {
    name: 'Kavita Reddy', role: 'HR Manager', empId: 'EMP-HR-001', icon: Briefcase,
    badges: [{ text: 'Active', color: 'emerald' }, { text: 'MBA HR', color: 'blue' }],
    quickInfo: [
      { icon: Calendar, text: 'Joined: 12-Feb-2018' }, { icon: Phone, text: '+91 99112 33445' },
      { icon: Mail, text: 'kavita@school.edu' },
    ],
    tabs: ['personal', 'salary', 'attendance', 'account'],
    personal: {
      left: [{ label: 'Full Name', value: 'Kavita Reddy' }, { label: 'DOB', value: '25-Dec-1985' }, { label: 'Gender', value: 'Female' }, { label: 'Blood Group', value: 'O-' }, { label: 'Marital Status', value: 'Married' }, { label: 'Qualification', value: 'MBA (HR), SHRM-CP' }],
      right: [{ label: 'Phone', value: '+91 99112 33445', type: 'editable' }, { label: 'Email', value: 'kavita.reddy@gmail.com', type: 'editable' }, { label: 'Address', value: '34, Thaltej, Ahmedabad', type: 'editable' }, { label: 'Aadhaar', value: 'XXXX-XXXX-6789', type: 'locked' }, { label: 'PAN', value: 'XXXXX6789X', type: 'locked' }, { label: 'Emergency Contact', value: '+91 99112 88888', type: 'editable' }],
    },
    salary: { basic: 45000, hra: 18000, da: 4500, allowances: 7000, pf: 5400, pt: 200, tds: 4500 },
  },
  'accounts-head': {
    name: 'Ramesh Patel', role: 'Accounts Head', empId: 'EMP-ACC-001', icon: Calculator,
    badges: [{ text: 'Active', color: 'emerald' }, { text: 'CA', color: 'blue' }],
    quickInfo: [
      { icon: Calendar, text: 'Joined: 01-Jul-2017' }, { icon: Phone, text: '+91 98765 77701' },
      { icon: Mail, text: 'accounts@school.edu' },
    ],
    tabs: ['personal', 'salary', 'attendance', 'account'],
    personal: {
      left: [{ label: 'Full Name', value: 'Ramesh Patel' }, { label: 'DOB', value: '05-Mar-1978' }, { label: 'Gender', value: 'Male' }, { label: 'Blood Group', value: 'A-' }, { label: 'Marital Status', value: 'Married' }, { label: 'Qualification', value: 'CA, M.Com' }],
      right: [{ label: 'Phone', value: '+91 98765 77701', type: 'editable' }, { label: 'Email', value: 'ramesh.patel@gmail.com', type: 'editable' }, { label: 'Address', value: '67, CG Road, Ahmedabad', type: 'editable' }, { label: 'Aadhaar', value: 'XXXX-XXXX-7701', type: 'locked' }, { label: 'PAN', value: 'XXXXX7701X', type: 'locked' }, { label: 'Emergency Contact', value: '+91 98765 77702', type: 'editable' }],
    },
    salary: { basic: 50000, hra: 20000, da: 5000, allowances: 8000, pf: 6000, pt: 200, tds: 5500 },
  },
  receptionist: {
    name: 'Anita Desai', role: 'Front Desk Executive', empId: 'EMP-REC-001', icon: PhoneCall,
    badges: [{ text: 'Active', color: 'emerald' }, { text: '5 Yrs', color: 'blue' }],
    quickInfo: [
      { icon: Calendar, text: 'Joined: 01-Aug-2021' }, { icon: Phone, text: '+91 77665 54433' },
      { icon: Mail, text: 'anita@school.edu' },
    ],
    tabs: ['personal', 'salary', 'attendance', 'account'],
    personal: {
      left: [{ label: 'Full Name', value: 'Anita Desai' }, { label: 'DOB', value: '30-Apr-1988' }, { label: 'Gender', value: 'Female' }, { label: 'Blood Group', value: 'A+' }, { label: 'Marital Status', value: 'Married' }, { label: 'Qualification', value: 'B.Com' }],
      right: [{ label: 'Phone', value: '+91 77665 54433', type: 'editable' }, { label: 'Email', value: 'anita.desai@gmail.com', type: 'editable' }, { label: 'Address', value: '12, Vastrapur, Ahmedabad', type: 'editable' }, { label: 'Aadhaar', value: 'XXXX-XXXX-2345', type: 'locked' }, { label: 'PAN', value: 'XXXXX2345X', type: 'locked' }, { label: 'Emergency Contact', value: '+91 77665 99999', type: 'editable' }],
    },
    salary: { basic: 22000, hra: 8800, da: 2200, allowances: 3000, pf: 2640, pt: 200, tds: 1000 },
  },
  'transport-head': {
    name: 'Mohammed Irfan', role: 'Transport Manager', empId: 'EMP-TRN-001', icon: Bus,
    badges: [{ text: 'Active', color: 'emerald' }, { text: '10 Yrs', color: 'blue' }],
    quickInfo: [
      { icon: Calendar, text: 'Joined: 05-Jan-2016' }, { icon: Phone, text: '+91 98765 12345' },
      { icon: Mail, text: 'irfan@school.edu' },
    ],
    tabs: ['personal', 'salary', 'attendance', 'account'],
    personal: {
      left: [{ label: 'Full Name', value: 'Mohammed Irfan' }, { label: 'DOB', value: '05-Aug-1980' }, { label: 'Gender', value: 'Male' }, { label: 'Blood Group', value: 'A+' }, { label: 'Marital Status', value: 'Married' }, { label: 'Nationality', value: 'Indian' }],
      right: [{ label: 'Phone', value: '+91 98765 12345', type: 'editable' }, { label: 'Email', value: 'irfan@gmail.com', type: 'editable' }, { label: 'Address', value: '78, Maninagar, Ahmedabad', type: 'editable' }, { label: 'Aadhaar', value: 'XXXX-XXXX-5678', type: 'locked' }, { label: 'Driving License', value: 'GJ01-2015-XXXXX', type: 'locked' }, { label: 'Emergency Contact', value: '+91 98765 11122', type: 'editable' }],
    },
    salary: { basic: 28000, hra: 11200, da: 2800, allowances: 4000, pf: 3360, pt: 200, tds: 1500 },
  },
  security: {
    name: 'Raju Kanabar', role: 'Security Head', empId: 'EMP-SEC-001', icon: ShieldCheck,
    badges: [{ text: 'Active', color: 'emerald' }, { text: 'Ex-Military', color: 'blue' }],
    quickInfo: [
      { icon: Calendar, text: 'Joined: 10-Mar-2019' }, { icon: Phone, text: '+91 98765 44401' },
      { icon: Mail, text: 'security@school.edu' },
    ],
    tabs: ['personal', 'salary', 'attendance', 'account'],
    personal: {
      left: [{ label: 'Full Name', value: 'Raju Kanabar' }, { label: 'DOB', value: '15-Jun-1975' }, { label: 'Gender', value: 'Male' }, { label: 'Blood Group', value: 'O+' }, { label: 'Marital Status', value: 'Married' }, { label: 'Background', value: 'Ex-Army, 12 Yrs' }],
      right: [{ label: 'Phone', value: '+91 98765 44401', type: 'editable' }, { label: 'Email', value: 'raju.k@gmail.com', type: 'editable' }, { label: 'Address', value: '90, Isanpur, Ahmedabad', type: 'editable' }, { label: 'Aadhaar', value: 'XXXX-XXXX-4401', type: 'locked' }, { label: 'PAN', value: 'XXXXX4401X', type: 'locked' }, { label: 'Emergency Contact', value: '+91 98765 44402', type: 'editable' }],
    },
    salary: { basic: 20000, hra: 8000, da: 2000, allowances: 3000, pf: 2400, pt: 200, tds: 800 },
  },
  trustee: {
    name: 'Jayantbhai Shah', role: 'Chairman, Board of Trustees', empId: 'TRUST-001', icon: Eye,
    badges: [{ text: 'Active', color: 'emerald' }, { text: 'Chairman', color: 'purple' }],
    quickInfo: [
      { icon: Calendar, text: 'Since: 2010' }, { icon: Phone, text: '+91 98765 00100' },
      { icon: Mail, text: 'chairman@school.edu' },
    ],
    tabs: ['personal', 'account'],
    personal: {
      left: [{ label: 'Full Name', value: 'Jayantbhai Shah' }, { label: 'DOB', value: '20-Nov-1955' }, { label: 'Gender', value: 'Male' }, { label: 'Designation', value: 'Chairman' }, { label: 'Tenure', value: '2023-2028' }, { label: 'Nationality', value: 'Indian' }],
      right: [{ label: 'Phone', value: '+91 98765 00100', type: 'editable' }, { label: 'Email', value: 'jayant.shah@gmail.com', type: 'editable' }, { label: 'Address', value: 'Shahibaug, Ahmedabad', type: 'locked' }, { label: 'Occupation', value: 'Industrialist', type: 'locked' }, { label: 'Trust Role', value: 'Chairman & Signatory', type: 'locked' }],
    },
  },
  'school-admin': {
    name: 'Deepak Verma', role: 'School Administrator', empId: 'EMP-ADM-001', icon: Building2,
    badges: [{ text: 'Active', color: 'emerald' }, { text: 'Administrator', color: 'blue' }],
    quickInfo: [
      { icon: Calendar, text: 'Joined: 01-Apr-2018' }, { icon: Phone, text: '+91 98765 55501' },
      { icon: Mail, text: 'admin@school.edu' },
    ],
    tabs: ['personal', 'salary', 'account'],
    personal: {
      left: [{ label: 'Full Name', value: 'Deepak Verma' }, { label: 'DOB', value: '12-Feb-1982' }, { label: 'Gender', value: 'Male' }, { label: 'Blood Group', value: 'AB+' }, { label: 'Marital Status', value: 'Married' }, { label: 'Qualification', value: 'MBA, B.Ed' }],
      right: [{ label: 'Phone', value: '+91 98765 55501', type: 'editable' }, { label: 'Email', value: 'deepak.verma@gmail.com', type: 'editable' }, { label: 'Address', value: '22, Satellite, Ahmedabad', type: 'editable' }, { label: 'Aadhaar', value: 'XXXX-XXXX-5501', type: 'locked' }, { label: 'PAN', value: 'XXXXX5501X', type: 'locked' }, { label: 'Emergency Contact', value: '+91 98765 55502', type: 'editable' }],
    },
    salary: { basic: 48000, hra: 19200, da: 4800, allowances: 7500, pf: 5760, pt: 200, tds: 5000 },
  },
  'super-admin': {
    name: 'Piush Thakker', role: 'System Administrator', empId: 'SA-001', icon: Shield,
    badges: [{ text: 'Active', color: 'emerald' }, { text: 'Super Admin', color: 'red' }],
    quickInfo: [
      { icon: Phone, text: '+91 XXXXX XXXXX' }, { icon: Mail, text: 'piush008@gmail.com' },
      { icon: Shield, text: 'Full Access' },
    ],
    tabs: ['personal', 'account'],
    personal: {
      left: [{ label: 'Full Name', value: 'Piush Thakker' }, { label: 'Role', value: 'System Administrator' }, { label: 'Access Level', value: 'Super Admin' }],
      right: [{ label: 'Phone', value: '+91 XXXXX XXXXX', type: 'editable' }, { label: 'Email', value: 'piush008@gmail.com', type: 'editable' }, { label: '2FA', value: 'Enabled', type: 'locked' }],
    },
  },
  'account-manager': {
    name: 'Snehal Parikh', role: 'Account Manager', empId: 'AM-001', icon: Headphones,
    badges: [{ text: 'Active', color: 'emerald' }, { text: 'CSM Certified', color: 'blue' }],
    quickInfo: [
      { icon: Calendar, text: 'Joined: 15-Sep-2023' }, { icon: Phone, text: '+91 98765 88801' },
      { icon: Mail, text: 'snehal@saaras.ai' },
    ],
    tabs: ['personal', 'salary', 'account'],
    personal: {
      left: [{ label: 'Full Name', value: 'Snehal Parikh' }, { label: 'DOB', value: '18-Jul-1990' }, { label: 'Gender', value: 'Female' }, { label: 'Blood Group', value: 'B+' }, { label: 'Marital Status', value: 'Single' }, { label: 'Qualification', value: 'MBA Marketing' }],
      right: [{ label: 'Phone', value: '+91 98765 88801', type: 'editable' }, { label: 'Email', value: 'snehal.p@gmail.com', type: 'editable' }, { label: 'Address', value: '45, SG Highway, Ahmedabad', type: 'editable' }, { label: 'Aadhaar', value: 'XXXX-XXXX-8801', type: 'locked' }, { label: 'PAN', value: 'XXXXX8801X', type: 'locked' }, { label: 'Emergency Contact', value: '+91 98765 88802', type: 'editable' }],
    },
    salary: { basic: 40000, hra: 16000, da: 4000, allowances: 6000, pf: 4800, pt: 200, tds: 3500 },
  },
};

// ─── BADGE COLORS ────────────────────────────────────
const badgeColors: Record<string, string> = {
  emerald: 'bg-emerald-100 text-emerald-700',
  blue: 'bg-blue-100 text-blue-700',
  red: 'bg-red-100 text-red-700',
  purple: 'bg-purple-100 text-purple-700',
  amber: 'bg-amber-100 text-amber-700',
};

// ─── TAB COMPONENTS ──────────────────────────────────

function PersonalTab({ config, theme }: { config: ProfileConfig; theme: Theme }) {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-2">
        {config.personal.left.map(f => (
          <div key={f.label} className={`flex justify-between border-b ${theme.border} pb-1.5 text-xs`}>
            <span className={theme.iconColor}>{f.label}</span>
            <span className={`font-medium ${theme.highlight}`}>{f.value}</span>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {config.personal.right.map(f => (
          <div key={f.label} className={`flex justify-between border-b ${theme.border} pb-1.5 text-xs`}>
            <span className={`${theme.iconColor} flex items-center gap-1`}>
              {f.label}
              {f.type === 'editable' && <Edit size={8} className="text-blue-500" />}
              {f.type === 'locked' && <Lock size={8} className="text-slate-400" />}
            </span>
            <span className={`font-medium ${theme.highlight}`}>{f.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SalaryTab({ salary, theme }: { salary: NonNullable<ProfileConfig['salary']>; theme: Theme }) {
  const gross = salary.basic + salary.hra + salary.da + salary.allowances;
  const net = gross - (salary.pf + salary.pt + salary.tds);
  return (
    <div className="space-y-4">
      <div className={`${theme.secondaryBg} rounded-xl p-4`}>
        <p className={`text-xs font-bold ${theme.iconColor} uppercase mb-3`}>January 2026</p>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1.5 text-xs">
            {[['Basic', salary.basic], ['HRA', salary.hra], ['DA', salary.da], ['Allowances', salary.allowances]].map(([l, v]) => (
              <div key={l as string} className="flex justify-between"><span className={theme.iconColor}>{l}</span><span className={theme.highlight}>₹{(v as number).toLocaleString()}</span></div>
            ))}
            <div className={`flex justify-between font-bold border-t ${theme.border} pt-1.5`}><span className={theme.highlight}>Gross</span><span className={theme.highlight}>₹{gross.toLocaleString()}</span></div>
          </div>
          <div className="space-y-1.5 text-xs">
            {[['PF', salary.pf], ['PT', salary.pt], ['TDS', salary.tds]].map(([l, v]) => (
              <div key={l as string} className="flex justify-between"><span className={theme.iconColor}>{l}</span><span className="text-red-500">-₹{(v as number).toLocaleString()}</span></div>
            ))}
            <div className={`flex justify-between font-bold border-t ${theme.border} pt-1.5 text-emerald-600`}><span>Net Pay</span><span>₹{net.toLocaleString()}</span></div>
          </div>
        </div>
      </div>
      <div className={`${theme.secondaryBg} rounded-xl p-4`}>
        <p className={`text-xs font-bold ${theme.iconColor} uppercase mb-3`}>Payslips</p>
        <div className="space-y-1.5">
          {['Jan 2026', 'Dec 2025', 'Nov 2025', 'Oct 2025'].map(m => (
            <div key={m} className={`flex items-center justify-between p-2.5 rounded-lg ${theme.cardBg} text-xs`}>
              <span className={theme.highlight}>{m}</span>
              <span className={`font-medium ${theme.highlight}`}>₹{net.toLocaleString()}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 font-bold">Paid</span>
              <button className={`${theme.primaryText} flex items-center gap-1 text-[10px] font-bold`}><Download size={10} /> PDF</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AttendanceTab({ theme }: { theme: Theme }) {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const getStatus = (d: number) => { if (d === 15) return 'A'; if (d === 8) return 'L'; if ([3, 10, 26].includes(d)) return 'H'; return 'P'; };
  const getColor = (s: string) => { if (s === 'P') return 'bg-emerald-100 text-emerald-700'; if (s === 'A') return 'bg-red-100 text-red-700'; if (s === 'L') return 'bg-amber-100 text-amber-700'; return 'bg-blue-100 text-blue-700'; };

  return (
    <div className="space-y-4">
      <div className="flex gap-3 text-[10px]">
        {[['Present', 'bg-emerald-500'], ['Absent', 'bg-red-500'], ['Leave', 'bg-amber-500'], ['Holiday', 'bg-blue-500']].map(([l, c]) => (
          <div key={l} className={`flex items-center gap-1 ${theme.iconColor}`}><div className={`w-2 h-2 rounded ${c}`} />{l}</div>
        ))}
      </div>
      <div className={`${theme.secondaryBg} rounded-xl p-4`}>
        <p className={`text-xs font-bold ${theme.iconColor} uppercase mb-3`}>January 2026</p>
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {days.map((d, i) => <div key={i} className={`font-bold ${theme.iconColor} py-0.5`}>{d}</div>)}
          {[null, null, null].map((_, i) => <div key={`e${i}`} />)}
          {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
            <div key={d} className={`p-1.5 rounded ${getColor(getStatus(d))} font-medium`}>{d}</div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {[['22', 'Present', 'text-emerald-600'], ['1', 'Absent', 'text-red-600'], ['1', 'Leave', 'text-amber-600'], ['3', 'Holiday', 'text-blue-600']].map(([v, l, c]) => (
          <div key={l} className={`${theme.secondaryBg} rounded-xl p-3 text-center`}>
            <div className={`text-lg font-bold ${c}`}>{v}</div>
            <div className={`text-[10px] ${theme.iconColor}`}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LeaveTab({ theme }: { theme: Theme }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {[['Casual', 8, 12], ['Earned', 10, 12], ['Sick', 11, 12]].map(([t, u, m]) => (
          <div key={t as string} className={`${theme.secondaryBg} rounded-xl p-3 text-center`}>
            <div className={`text-lg font-bold ${theme.highlight}`}>{u}<span className={`text-xs ${theme.iconColor}`}>/{m}</span></div>
            <div className={`text-[10px] ${theme.iconColor}`}>{t}</div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
              <div className="h-1.5 rounded-full bg-blue-500" style={{ width: `${((u as number) / (m as number)) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <button className={`px-3 py-1.5 ${theme.primary} text-white rounded-lg text-xs font-bold`}>+ Apply Leave</button>
      </div>
      <div className={`${theme.secondaryBg} rounded-xl p-4`}>
        <p className={`text-xs font-bold ${theme.iconColor} uppercase mb-3`}>Leave History</p>
        <div className="space-y-1.5">
          {[['Casual', '15-Jan', '15-Jan', 'Approved'], ['Earned', '20-Dec', '22-Dec', 'Approved'], ['Sick', '05-Nov', '05-Nov', 'Approved']].map(([t, f, to, s], i) => (
            <div key={i} className={`flex items-center justify-between p-2.5 rounded-lg ${theme.cardBg} text-xs`}>
              <span className={`font-medium ${theme.highlight}`}>{t}</span>
              <span className={theme.iconColor}>{f} → {to}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 font-bold">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeesTab({ theme }: { theme: Theme }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className={`${theme.secondaryBg} rounded-xl p-4`}>
          <p className={`text-xs font-bold ${theme.iconColor} uppercase mb-3`}>Fee Structure</p>
          <div className="space-y-1.5 text-xs">
            {[['Tuition', '₹60,000'], ['Transport', '₹30,000'], ['Others', '₹35,000']].map(([l, v]) => (
              <div key={l} className={`flex justify-between border-b ${theme.border} pb-1`}><span className={theme.iconColor}>{l}</span><span className={theme.highlight}>{v}</span></div>
            ))}
            <div className={`flex justify-between font-bold pt-1 ${theme.primaryText}`}><span>Total</span><span>₹1,25,000</span></div>
          </div>
        </div>
        <div className={`${theme.secondaryBg} rounded-xl p-4`}>
          <p className={`text-xs font-bold ${theme.iconColor} uppercase mb-3`}>Payment Summary</p>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs mb-1"><span className={theme.iconColor}>Paid</span><span className="text-emerald-600 font-bold">₹93,750 (75%)</span></div>
              <div className="w-full bg-slate-200 rounded-full h-1.5"><div className="h-1.5 rounded-full bg-emerald-500" style={{ width: '75%' }} /></div>
            </div>
            <div className="flex justify-between text-xs"><span className={theme.iconColor}>Outstanding</span><span className="text-red-500 font-bold">₹31,250</span></div>
            <div className="flex justify-between text-xs"><span className={theme.iconColor}>Next Due</span><span className={`font-medium ${theme.highlight}`}>01-Mar-2026</span></div>
          </div>
        </div>
      </div>
      <div className={`${theme.secondaryBg} rounded-xl p-4`}>
        <p className={`text-xs font-bold ${theme.iconColor} uppercase mb-3`}>Payment History</p>
        <div className="space-y-1.5">
          {[['15-Jan-2026', '₹31,250', 'UPI', 'RCP-2026-003'], ['15-Oct-2025', '₹31,250', 'Cheque', 'RCP-2025-002'], ['15-Jul-2025', '₹31,250', 'Cash', 'RCP-2025-001']].map(([d, a, m, r], i) => (
            <div key={i} className={`flex items-center justify-between p-2.5 rounded-lg ${theme.cardBg} text-xs`}>
              <span className={theme.highlight}>{d}</span>
              <span className={`font-medium ${theme.highlight}`}>{a}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-bold">{m}</span>
              <button className={`${theme.primaryText} flex items-center gap-1 text-[10px] font-bold`}><Download size={10} />{r}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AccountTab({ theme }: { theme: Theme }) {
  return (
    <div className="space-y-2">
      {[
        { icon: KeyRound, label: 'Reset Password', desc: 'Change your login password', color: theme.primaryText },
        { icon: Bell, label: 'Notification Preferences', desc: 'Manage how you receive alerts', color: theme.primaryText },
      ].map(item => (
        <button key={item.label} className={`w-full flex items-center gap-3 p-4 ${theme.secondaryBg} rounded-xl text-left transition-all hover:opacity-80`}>
          <item.icon size={18} className={item.color} />
          <div>
            <div className={`text-xs font-bold ${theme.highlight}`}>{item.label}</div>
            <div className={`text-[10px] ${theme.iconColor}`}>{item.desc}</div>
          </div>
        </button>
      ))}
      <button className="w-full flex items-center gap-3 p-4 bg-red-50 rounded-xl text-left hover:bg-red-100 transition-all">
        <LogOut size={18} className="text-red-500" />
        <div>
          <div className="text-xs font-bold text-red-700">Logout</div>
          <div className="text-[10px] text-red-500">Sign out of your account</div>
        </div>
      </button>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────
const tabLabels: Record<ProfileTab, string> = {
  personal: 'Personal', salary: 'Salary', attendance: 'Attendance',
  leave: 'Leave', fees: 'Fees', account: 'Account',
};

export default function StakeholderProfile({ role, theme }: { role: string; theme: Theme }) {
  const config = profileConfigs[role];
  const [activeTab, setActiveTab] = useState<ProfileTab>(config?.tabs[0] || 'personal');

  if (!config) return <div className={`text-xs ${theme.iconColor}`}>Profile not configured for role: {role}</div>;

  const Icon = config.icon;

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className={`relative rounded-2xl overflow-hidden`}>
        <div className={`h-28 ${theme.primary} relative`}>
          <Icon size={80} className="absolute right-6 top-1/2 -translate-y-1/2 text-white/10" />
        </div>
        <div className={`${theme.cardBg} border ${theme.border} rounded-b-2xl px-5 pt-12 pb-4 -mt-8 relative`}>
          {/* Avatar */}
          <div className={`absolute -top-10 left-5 w-20 h-20 rounded-full border-4 ${theme.cardBg} ${theme.primary} flex items-center justify-center text-2xl font-bold text-white shadow-lg`}>
            {config.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex items-start justify-between">
            <div>
              <h2 className={`text-lg font-bold ${theme.highlight}`}>{config.name}</h2>
              <p className={`text-xs ${theme.iconColor}`}>{config.role}{config.empId ? ` • ${config.empId}` : ''}</p>
              <div className="flex gap-1.5 mt-1.5">
                {config.badges.map(b => (
                  <span key={b.text} className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${badgeColors[b.color] || badgeColors.blue}`}>{b.text}</span>
                ))}
              </div>
            </div>
            <button className={`px-3 py-1.5 ${theme.secondaryBg} rounded-xl text-xs font-bold ${theme.highlight} flex items-center gap-1.5`}>
              <Edit size={12} /> Edit Profile
            </button>
          </div>
          {/* Quick info */}
          <div className="flex flex-wrap gap-3 mt-3">
            {config.quickInfo.map(qi => (
              <span key={qi.text} className={`text-[10px] ${theme.iconColor} flex items-center gap-1`}>
                <qi.icon size={10} /> {qi.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={`${theme.cardBg} border ${theme.border} rounded-2xl`}>
        <div className={`flex gap-1 px-3 pt-2 border-b ${theme.border} overflow-x-auto`}>
          {config.tabs.map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-3 py-2 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === t ? `${theme.primaryText} border-current` : `${theme.iconColor} border-transparent`
              }`}
            >
              {tabLabels[t]}
            </button>
          ))}
        </div>
        <div className="p-4">
          {activeTab === 'personal' && <PersonalTab config={config} theme={theme} />}
          {activeTab === 'salary' && config.salary && <SalaryTab salary={config.salary} theme={theme} />}
          {activeTab === 'attendance' && <AttendanceTab theme={theme} />}
          {activeTab === 'leave' && <LeaveTab theme={theme} />}
          {activeTab === 'fees' && <FeesTab theme={theme} />}
          {activeTab === 'account' && <AccountTab theme={theme} />}
        </div>
      </div>
    </div>
  );
}
