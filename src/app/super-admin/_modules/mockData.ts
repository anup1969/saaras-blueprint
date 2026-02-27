'use client';

import {
  Home, Building2, CreditCard, Users, Layers, UserPlus, Headphones, BarChart3, Settings, FileText,
  MessageSquare, Handshake, UserCog, HardDrive, ClipboardCheck,
} from 'lucide-react';

// ─── MOCK DATA ────────────────────────────────────────
export const schools = [
  { id: 'SCH001', name: 'Delhi Public School, Ahmedabad', plan: 'Enterprise', students: 2400, staff: 120, status: 'Active', mrr: '₹1,50,000', since: 'Mar 2024', modules: 24 },
  { id: 'SCH002', name: 'Navrachana Vidyani, Vadodara', plan: 'Professional', students: 1800, staff: 85, status: 'Active', mrr: '₹95,000', since: 'Jun 2024', modules: 18 },
  { id: 'SCH003', name: 'Zydus School, Gandhinagar', plan: 'Starter', students: 600, staff: 32, status: 'Active', mrr: '₹35,000', since: 'Sep 2024', modules: 12 },
  { id: 'SCH004', name: 'Udgam School for Children', plan: 'Professional', students: 1500, staff: 72, status: 'Active', mrr: '₹85,000', since: 'Jan 2025', modules: 18 },
  { id: 'SCH005', name: 'Anand Niketan, Satellite', plan: 'Enterprise', students: 3200, staff: 155, status: 'Active', mrr: '₹1,80,000', since: 'Nov 2024', modules: 27 },
  { id: 'SCH006', name: 'SAL International, SG Highway', plan: 'Professional', students: 900, staff: 48, status: 'Trial', mrr: '₹0', since: 'Feb 2026', modules: 18 },
  { id: 'SCH007', name: 'Calorx Olive, Ahmedabad', plan: 'Starter', students: 450, staff: 25, status: 'Churned', mrr: '₹0', since: 'Apr 2024', modules: 0 },
];

export const plans = [
  { id: 'starter', name: 'Starter', price: '₹25,000/yr', modules: 12, maxStudents: 1000, maxStaff: 50, schools: 2, color: 'bg-blue-500' },
  { id: 'professional', name: 'Professional', price: '₹75,000/yr', modules: 18, maxStudents: 3000, maxStaff: 150, schools: 3, color: 'bg-purple-500' },
  { id: 'enterprise', name: 'Enterprise', price: '₹1,50,000/yr', modules: 27, maxStudents: 'Unlimited', maxStaff: 'Unlimited', schools: 2, color: 'bg-amber-500' },
];

export const allModules = [
  { name: 'Dashboard', category: 'Core', plans: ['starter', 'professional', 'enterprise'] },
  { name: 'Student Management', category: 'Core', plans: ['starter', 'professional', 'enterprise'] },
  { name: 'Staff Management', category: 'Core', plans: ['starter', 'professional', 'enterprise'] },
  { name: 'Fee Management', category: 'Core', plans: ['starter', 'professional', 'enterprise'] },
  { name: 'Attendance', category: 'Core', plans: ['starter', 'professional', 'enterprise'] },
  { name: 'Timetable', category: 'Core', plans: ['starter', 'professional', 'enterprise'] },
  { name: 'Enquiry/Admission', category: 'Operations', plans: ['starter', 'professional', 'enterprise'] },
  { name: 'Communication', category: 'Operations', plans: ['starter', 'professional', 'enterprise'] },
  { name: 'Transport', category: 'Operations', plans: ['professional', 'enterprise'] },
  { name: 'Visitor Management', category: 'Operations', plans: ['professional', 'enterprise'] },
  { name: 'Library', category: 'Academic', plans: ['professional', 'enterprise'] },
  { name: 'Examination', category: 'Academic', plans: ['professional', 'enterprise'] },
  { name: 'Homework/Assignments', category: 'Academic', plans: ['starter', 'professional', 'enterprise'] },
  { name: 'Report Cards', category: 'Academic', plans: ['professional', 'enterprise'] },
  { name: 'HR & Payroll', category: 'HR', plans: ['professional', 'enterprise'] },
  { name: 'Leave Management', category: 'HR', plans: ['professional', 'enterprise'] },
  { name: 'Performance (SQAAF)', category: 'Quality', plans: ['enterprise'] },
  { name: 'Certificates', category: 'Operations', plans: ['professional', 'enterprise'] },
  { name: 'Inventory', category: 'Operations', plans: ['enterprise'] },
  { name: 'Hostel Management', category: 'Operations', plans: ['enterprise'] },
  { name: 'Alumni Management', category: 'Engagement', plans: ['enterprise'] },
  { name: 'Parent Portal', category: 'Engagement', plans: ['starter', 'professional', 'enterprise'] },
  { name: 'Student Portal', category: 'Engagement', plans: ['starter', 'professional', 'enterprise'] },
  { name: 'Online Payment', category: 'Core', plans: ['starter', 'professional', 'enterprise'] },
  { name: 'Advanced Analytics', category: 'Intelligence', plans: ['enterprise'] },
  { name: 'Custom Reports', category: 'Intelligence', plans: ['enterprise'] },
  { name: 'API Access', category: 'Integration', plans: ['enterprise'] },
];

export const onboardingPipeline = [
  { school: 'Bright Future Academy', stage: 'Demo Done', contact: 'Ramesh Patel', phone: '98765 00001', deal: '₹95,000', days: 3 },
  { school: 'Greenfield International', stage: 'Proposal Sent', contact: 'Meena Shah', phone: '98765 00002', deal: '₹1,50,000', days: 7 },
  { school: 'Sunshine Public School', stage: 'Data Migration', contact: 'Amit Kumar', phone: '98765 00003', deal: '₹75,000', days: 14 },
  { school: 'Heritage School, Rajkot', stage: 'Training', contact: 'Priya Desai', phone: '98765 00004', deal: '₹85,000', days: 5 },
  { school: 'Vibgyor High', stage: 'Go-Live', contact: 'Suresh Nair', phone: '98765 00005', deal: '₹1,20,000', days: 2 },
];

export const supportTickets = [
  { id: 'TKT-001', school: 'Delhi Public School', subject: 'Fee receipt format change', priority: 'Normal', status: 'Open', age: '2h', assignee: 'Farheen' },
  { id: 'TKT-002', school: 'Navrachana Vidyani', subject: 'Transport GPS not updating', priority: 'Urgent', status: 'In Progress', assignee: 'Dhavalbhai', age: '4h' },
  { id: 'TKT-003', school: 'Udgam School', subject: 'Bulk SMS not delivering', priority: 'High', status: 'Open', age: '1d', assignee: 'Unassigned' },
  { id: 'TKT-004', school: 'Anand Niketan', subject: 'Custom report builder query', priority: 'Normal', status: 'Resolved', age: '3d', assignee: 'Kunjal' },
  { id: 'TKT-005', school: 'Zydus School', subject: 'Attendance biometric sync issue', priority: 'High', status: 'Open', age: '5h', assignee: 'Dhavalbhai' },
];

export const auditLogs = [
  { time: '14:32', user: 'Piush Thakker', action: 'Updated plan for SCH002', target: 'Navrachana Vidyani', ip: '103.21.xx.xx' },
  { time: '13:15', user: 'System', action: 'Auto-backup completed', target: 'All Schools', ip: '-' },
  { time: '12:48', user: 'Farheen', action: 'Resolved ticket TKT-004', target: 'Anand Niketan', ip: '103.21.xx.xx' },
  { time: '11:30', user: 'Dhavalbhai', action: 'Deployed hotfix v2.4.1', target: 'Platform', ip: '103.21.xx.xx' },
  { time: '10:05', user: 'Piush Thakker', action: 'Onboarded new school SCH006', target: 'SAL International', ip: '103.21.xx.xx' },
  { time: '09:22', user: 'System', action: 'SSL certificate renewed', target: 'saaras.ai', ip: '-' },
];

// ─── MODULES SIDEBAR ──────────────────────────────────
export const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'schools', label: 'Schools', icon: Building2 },
  { id: 'plans', label: 'Plans & Billing', icon: CreditCard },
  { id: 'users', label: 'User Management', icon: Users },
  { id: 'modules', label: 'Module Config', icon: Layers },
  { id: 'onboarding', label: 'Onboarding', icon: UserPlus },
  { id: 'your-inputs', label: 'Your Inputs', icon: ClipboardCheck },
  { id: 'support', label: 'Support Tickets', icon: Headphones },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'config', label: 'System Config', icon: Settings },
  { id: 'resellers', label: 'Reseller Management', icon: Handshake },
  { id: 'am-assignment', label: 'AM Assignment', icon: UserCog },
  { id: 'data-migration', label: 'Data Migration', icon: HardDrive },
  { id: 'audit', label: 'Audit Logs', icon: FileText },
  { id: 'communication', label: 'Communication', icon: MessageSquare },
];
