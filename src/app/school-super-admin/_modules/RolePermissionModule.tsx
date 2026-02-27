'use client';

import React, { useState } from 'react';
import { Plus, X, Edit, Lock, Trash2, Eye, CheckCircle, AlertTriangle, ChevronDown, ChevronUp, Search, LogIn, ShieldAlert } from 'lucide-react';
import { TabBar } from '@/components/shared';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

const MODULE_PERMISSIONS: Record<string, string[]> = {
  'Fees': ['View', 'Create Receipt', 'Edit Structure', 'Delete', 'Export', 'Approve Concession', 'Manage Defaulters', 'View Reports'],
  'Students': ['View', 'Add Student', 'Edit Profile', 'Delete', 'Export', 'View Medical', 'Promote', 'Transfer'],
  'Attendance': ['View', 'Mark Attendance', 'Edit Attendance', 'Delete', 'Export', 'View Reports', 'Configure Rules'],
  'Exams': ['View', 'Create Exam', 'Enter Marks', 'Edit Marks', 'Delete', 'Publish Results', 'Generate Report Card', 'Export'],
  'Visitors': ['View', 'Register Entry', 'Approve Visit', 'Delete', 'Export', 'Manage Pickup', 'View CCTV'],
  'HR': ['View', 'Add Staff', 'Edit Staff', 'Delete', 'Approve Leave', 'Process Payroll', 'View Salary', 'Export', 'Generate Letters'],
  'Transport': ['View', 'Manage Routes', 'Manage Vehicles', 'View Live Map', 'Collect Fees', 'Manage Drivers', 'Export', 'View Reports'],
  'Reports': ['View', 'Generate', 'Export PDF', 'Export Excel', 'Schedule Reports', 'View Financial', 'View Academic'],
  'Communication': ['View', 'Send DM', 'Create Group', 'Broadcast', 'Delete Messages', 'Manage Templates', 'View All Chats'],
  'Timetable': ['View', 'Create Schedule', 'Edit Schedule', 'Swap Periods', 'Manage Substitution', 'Assign Rooms', 'Export'],
  'Library': ['View', 'Issue Book', 'Return Book', 'Add Catalogue', 'Delete', 'Manage Fines', 'Export'],
  'Inventory': ['View', 'Add Asset', 'Edit Asset', 'Delete', 'Raise PO', 'Approve PO', 'Export'],
};
const ALL_MODULE_NAMES = Object.keys(MODULE_PERMISSIONS);
const SCOPE_OPTIONS = ['Own Class', 'Own Department', 'Own Branch', 'Full School', 'Custom'];

export default function RolePermissionModule({ theme }: { theme: Theme }) {
  const systemRoles = [
    'Super Admin', 'Principal', 'Vice Principal', 'Teacher', 'Class Teacher',
    'School Admin', 'Account Head', 'HR Manager', 'Transport Head', 'Receptionist',
    'Security Guard', 'Librarian', 'Hostel Warden', 'Parent', 'Student',
  ];

  // ── Build initial module-specific permission matrix ──
  const buildInitial = () => {
    const m: Record<string, Record<string, Record<string, boolean>>> = {};
    systemRoles.forEach(role => {
      m[role] = {};
      ALL_MODULE_NAMES.forEach(mod => {
        m[role][mod] = {};
        MODULE_PERMISSIONS[mod].forEach(p => { m[role][mod][p] = role === 'Super Admin'; });
      });
    });
    // Principal/VP get all
    ['Principal', 'Vice Principal'].forEach(r => { ALL_MODULE_NAMES.forEach(mod => { MODULE_PERMISSIONS[mod].forEach(p => { m[r][mod][p] = true; }); }); });
    // Teacher/Class Teacher
    ['Teacher', 'Class Teacher'].forEach(r => {
      m[r]['Attendance'] = { ...m[r]['Attendance'], 'View': true, 'Mark Attendance': true, 'Edit Attendance': true, 'View Reports': true };
      m[r]['Exams'] = { ...m[r]['Exams'], 'View': true, 'Enter Marks': true, 'Edit Marks': true };
      m[r]['Communication'] = { ...m[r]['Communication'], 'View': true, 'Send DM': true, 'Create Group': true };
      m[r]['Timetable'] = { ...m[r]['Timetable'], 'View': true, 'Swap Periods': true };
      m[r]['Students'] = { ...m[r]['Students'], 'View': true, 'Edit Profile': true, 'View Medical': true };
    });
    m['Account Head']['Fees'] = { 'View': true, 'Create Receipt': true, 'Edit Structure': true, 'Delete': false, 'Export': true, 'Approve Concession': true, 'Manage Defaulters': true, 'View Reports': true };
    m['Account Head']['Reports'] = { ...m['Account Head']['Reports'], 'View': true, 'Generate': true, 'Export PDF': true, 'Export Excel': true, 'View Financial': true };
    m['HR Manager']['HR'] = { 'View': true, 'Add Staff': true, 'Edit Staff': true, 'Delete': false, 'Approve Leave': true, 'Process Payroll': true, 'View Salary': true, 'Export': true, 'Generate Letters': true };
    m['Transport Head']['Transport'] = { 'View': true, 'Manage Routes': true, 'Manage Vehicles': true, 'View Live Map': true, 'Collect Fees': true, 'Manage Drivers': true, 'Export': true, 'View Reports': true };
    m['Receptionist']['Visitors'] = { 'View': true, 'Register Entry': true, 'Approve Visit': true, 'Delete': false, 'Export': true, 'Manage Pickup': false, 'View CCTV': false };
    m['Security Guard']['Visitors'] = { 'View': true, 'Register Entry': true, 'Approve Visit': false, 'Delete': false, 'Export': false, 'Manage Pickup': true, 'View CCTV': true };
    m['Librarian']['Library'] = { 'View': true, 'Issue Book': true, 'Return Book': true, 'Add Catalogue': true, 'Delete': false, 'Manage Fines': true, 'Export': true };
    m['Librarian']['Students'] = { ...m['Librarian']['Students'], 'View': true };
    m['Parent']['Fees'] = { ...m['Parent']['Fees'], 'View': true, 'View Reports': true };
    m['Parent']['Attendance'] = { ...m['Parent']['Attendance'], 'View': true };
    m['Parent']['Exams'] = { ...m['Parent']['Exams'], 'View': true };
    m['Parent']['Communication'] = { ...m['Parent']['Communication'], 'View': true, 'Send DM': true };
    m['Student']['Attendance'] = { ...m['Student']['Attendance'], 'View': true };
    m['Student']['Exams'] = { ...m['Student']['Exams'], 'View': true };
    m['Student']['Timetable'] = { ...m['Student']['Timetable'], 'View': true };
    m['Student']['Communication'] = { ...m['Student']['Communication'], 'View': true, 'Send DM': true };
    return m;
  };

  const [matrix, setMatrix] = useState(buildInitial);
  const [customRoles, setCustomRoles] = useState<string[]>([]);
  const [customRolesMeta, setCustomRolesMeta] = useState<Record<string, { description: string; parent: string; inheritedPerms: Record<string, Record<string, boolean>> }>>({});
  const [disabledRoles, setDisabledRoles] = useState<string[]>([]);
  const [rpTab, setRpTab] = useState('Permission Matrix');
  const rpTabs = ['Permission Matrix', 'Roles & Hierarchy', 'Access Control', 'Audit & Temp'];

  // A1: Role editing state
  const [editingRole, setEditingRole] = useState<string | null>(null);
  const [editingRoleBackup, setEditingRoleBackup] = useState<Record<string, Record<string, boolean>> | null>(null);

  // A2: Accordion state for permission matrix
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({ 'Fees': true });

  // A3: Custom role creation modal
  const [showCreateRoleModal, setShowCreateRoleModal] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDesc, setNewRoleDesc] = useState('');
  const [newRoleParent, setNewRoleParent] = useState('');
  const [newRoleBase, setNewRoleBase] = useState<'blank' | 'parent' | 'existing'>('blank');
  const [newRoleCopyFrom, setNewRoleCopyFrom] = useState('Teacher');

  // A4: Clone role
  const [cloneSource, setCloneSource] = useState('Teacher');
  const [cloneName, setCloneName] = useState('');
  const [recentClones, setRecentClones] = useState<{ name: string; from: string }[]>([]);
  const [cloneBanner, setCloneBanner] = useState('');

  // A5: Multi-role per user
  const [mockUsers, setMockUsers] = useState([
    { name: 'Dr. Ramesh Gupta', roles: ['Principal'], dept: 'Administration', date: '01 Apr 2025', by: 'Super Admin' },
    { name: 'Mrs. Priya Sharma', roles: ['Teacher'], dept: 'Science', date: '15 Jun 2025', by: 'Principal' },
    { name: 'Mr. Rajesh Kumar', roles: ['Teacher'], dept: 'Mathematics', date: '15 Jun 2025', by: 'Principal' },
    { name: 'Ms. Anita Desai', roles: ['Class Teacher'], dept: 'English', date: '01 Jul 2025', by: 'Principal' },
    { name: 'Mr. Vikram Singh', roles: ['School Admin'], dept: 'Administration', date: '01 Apr 2025', by: 'Super Admin' },
    { name: 'Mr. Suresh Patel', roles: ['Account Head'], dept: 'Accounts', date: '01 Apr 2025', by: 'Super Admin' },
    { name: 'Mrs. Kavita Nair', roles: ['HR Manager'], dept: 'HR', date: '01 May 2025', by: 'Principal' },
    { name: 'Mr. Anil Joshi', roles: ['Transport Head'], dept: 'Transport', date: '01 Apr 2025', by: 'Super Admin' },
  ]);
  const [roleModalUser, setRoleModalUser] = useState<string | null>(null);
  const [roleModalSelections, setRoleModalSelections] = useState<Record<string, boolean>>({});
  const [effectivePermsUser, setEffectivePermsUser] = useState<string | null>(null);

  // A6: Module-wise data scope
  const [roleScopes, setRoleScopes] = useState<Record<string, Record<string, string>>>(() => {
    const s: Record<string, Record<string, string>> = {};
    systemRoles.forEach(r => {
      s[r] = {};
      ALL_MODULE_NAMES.forEach(m => {
        if (r === 'Super Admin' || r === 'Principal' || r === 'Vice Principal' || r === 'School Admin') s[r][m] = 'Full School';
        else if (r === 'Teacher' || r === 'Class Teacher') s[r][m] = m === 'Library' ? 'Full School' : 'Own Class';
        else if (r === 'Account Head') s[r][m] = (m === 'Fees' || m === 'Reports') ? 'Full School' : 'Own Department';
        else if (r === 'HR Manager') s[r][m] = m === 'HR' ? 'Full School' : 'Own Department';
        else if (r === 'Transport Head') s[r][m] = m === 'Transport' ? 'Full School' : 'Own Department';
        else if (r === 'Receptionist') s[r][m] = m === 'Visitors' ? 'Full School' : 'Own Department';
        else if (r === 'Parent' || r === 'Student') s[r][m] = 'Own Class';
        else s[r][m] = 'Own Department';
      });
    });
    return s;
  });
  const [editingScopeRole, setEditingScopeRole] = useState<string | null>(null);

  // A7: Override form state (replaces alert)
  const [showOverrideForm, setShowOverrideForm] = useState(false);
  const [overrideUser, setOverrideUser] = useState('');
  const [overrideType, setOverrideType] = useState<'+' | '-'>('+');
  const [overrideModule, setOverrideModule] = useState('Fees');
  const [overridePerms, setOverridePerms] = useState<Record<string, boolean>>({});
  const [overrides, setOverrides] = useState([
    { user: 'Mrs. Priya Sharma', role: 'Teacher', type: '+' as const, mod: 'Fees', perm: 'View Reports', by: 'Principal', date: '10 Jan 2026' },
    { user: 'Mrs. Priya Sharma', role: 'Teacher', type: '+' as const, mod: 'HR', perm: 'Approve Leave', by: 'Principal', date: '10 Jan 2026' },
    { user: 'Mr. Vikram Singh', role: 'School Admin', type: '-' as const, mod: 'HR', perm: 'Delete', by: 'Super Admin', date: '05 Dec 2025' },
    { user: 'Ms. Anita Desai', role: 'Class Teacher', type: '+' as const, mod: 'Transport', perm: 'View Reports', by: 'Principal', date: '15 Feb 2026' },
  ]);

  // Widget editing state
  const [editingWidgetRole, setEditingWidgetRole] = useState<string | null>(null);
  const [dashboardWidgets, setDashboardWidgets] = useState<Record<string, string[]>>({
    'Principal': ['KPI Cards', 'Attendance', 'Fee Overview', 'Approvals', 'SQAAF', 'News Board'],
    'Teacher': ['Timetable', 'Attendance', 'Homework', 'Gradebook', 'Leave', 'Notices'],
    'Parent': ['Child Attendance', 'Fee Due', 'Homework', 'Timetable', 'Bus Tracker', 'PTM'],
    'Student': ['Timetable', 'Homework', 'Results', 'Attendance', 'Notices', 'Fee Status'],
    'Account Head': ['Fee Collection', 'Defaulters', 'Receipt Summary', 'Cash Flow', 'Concessions'],
    'HR Manager': ['Staff Attendance', 'Leave Requests', 'Payroll', 'Recruitment', 'Performance'],
  });
  const allWidgetOptions = ['KPI Cards', 'Attendance', 'Fee Overview', 'Approvals', 'SQAAF', 'News Board', 'Timetable', 'Homework', 'Gradebook', 'Leave', 'Notices', 'Child Attendance', 'Fee Due', 'Bus Tracker', 'PTM', 'Results', 'Fee Status', 'Fee Collection', 'Defaulters', 'Receipt Summary', 'Cash Flow', 'Concessions', 'Staff Attendance', 'Leave Requests', 'Payroll', 'Recruitment', 'Performance'];

  // Misc existing state
  const [compareA, setCompareA] = useState('Teacher');
  const [compareB, setCompareB] = useState('Class Teacher');
  const [bulkRole, setBulkRole] = useState('Teacher');
  const [bulkSelected, setBulkSelected] = useState<Record<string, boolean>>({ 'Mrs. Priya Sharma': true, 'Mr. Rajesh Kumar': true, 'Ms. Anita Desai': false, 'Mr. Vikram Singh': true, 'Mrs. Kavita Nair': false, 'Mr. Suresh Patel': true, 'Ms. Deepa Iyer': false, 'Mr. Anil Joshi': true });
  const [bulkBanner, setBulkBanner] = useState('');
  const [overrideSearch, setOverrideSearch] = useState('');
  const [tempRoleUser, setTempRoleUser] = useState('');
  const [tempRoleRole, setTempRoleRole] = useState('');
  const [tempRoleStart, setTempRoleStart] = useState('');
  const [tempRoleEnd, setTempRoleEnd] = useState('');
  const [tempRoleReason, setTempRoleReason] = useState('');
  const [tempRoles, setTempRoles] = useState([
    { user: 'Mrs. Kavita Nair', base: 'Teacher', temp: 'Acting Vice Principal', start: '15 Feb', end: '15 Mar', reason: 'VP on medical leave', status: 'Active' as const },
    { user: 'Mr. Suresh Patel', base: 'Account Head', temp: 'Acting Admin', start: '10 Jan', end: '20 Jan', reason: 'Admin on vacation', status: 'Expired' as const },
    { user: 'Ms. Deepa Iyer', base: 'Teacher', temp: 'Exam Coordinator', start: '01 Feb', end: '28 Feb', reason: 'Board exams', status: 'Active' as const },
  ]);
  const [tempRoleBanner, setTempRoleBanner] = useState('');

  // Confirmation modal state (A1/A7)
  const [confirmModal, setConfirmModal] = useState<{ title: string; message: string; onConfirm: () => void } | null>(null);

  // Gap 18: Field-Level Data Masking toggles
  const [maskingToggles, setMaskingToggles] = useState<Record<string, boolean>>({
    'Aadhaar Number (show as ****1234)': true,
    'Phone Number (show as ****5678)': true,
    'Email (show as a***@school.edu)': false,
    'Salary / CTC': true,
    'Bank Account Number': true,
    'Parent Income Details': false,
  });

  // Gap 27: Support Impersonation
  const [impersonateSearch, setImpersonateSearch] = useState('');
  const impersonateUsers = [
    { name: 'Rajesh Kumar', role: 'Teacher', dept: 'Mathematics', email: 'rajesh.k@school.edu' },
    { name: 'Priya Sharma', role: 'Parent', dept: '—', email: 'priya.s@gmail.com' },
    { name: 'Admin01', role: 'School Admin', dept: 'Administration', email: 'admin01@school.edu' },
    { name: 'Suresh Patel', role: 'Account Head', dept: 'Accounts', email: 'suresh.p@school.edu' },
  ];

  // ── Permission toggle ──
  const togglePerm = (role: string, mod: string, perm: string) => {
    setMatrix(prev => ({
      ...prev,
      [role]: { ...prev[role], [mod]: { ...prev[role][mod], [perm]: !prev[role]?.[mod]?.[perm] } },
    }));
  };

  // ── A3: Add custom role with full form ──
  const addCustomRole = () => {
    const role = newRoleName.trim();
    if (!role || systemRoles.includes(role) || customRoles.includes(role)) return;
    setCustomRoles(p => [...p, role]);
    // Build initial perms based on selection
    const init: Record<string, Record<string, boolean>> = {};
    let inheritedPerms: Record<string, Record<string, boolean>> = {};
    if (newRoleBase === 'parent' && newRoleParent && matrix[newRoleParent]) {
      ALL_MODULE_NAMES.forEach(mod => {
        init[mod] = { ...matrix[newRoleParent][mod] };
        inheritedPerms[mod] = { ...matrix[newRoleParent][mod] };
      });
    } else if (newRoleBase === 'existing' && matrix[newRoleCopyFrom]) {
      ALL_MODULE_NAMES.forEach(mod => { init[mod] = { ...matrix[newRoleCopyFrom][mod] }; });
    } else {
      ALL_MODULE_NAMES.forEach(mod => {
        init[mod] = {};
        MODULE_PERMISSIONS[mod].forEach(p => { init[mod][p] = false; });
      });
    }
    setMatrix(prev => ({ ...prev, [role]: init }));
    setCustomRolesMeta(prev => ({ ...prev, [role]: { description: newRoleDesc, parent: newRoleParent, inheritedPerms } }));
    // Setup scope for new role
    setRoleScopes(prev => {
      const s = { ...prev };
      s[role] = {};
      ALL_MODULE_NAMES.forEach(m => { s[role][m] = newRoleParent && prev[newRoleParent] ? prev[newRoleParent][m] : 'Own Department'; });
      return s;
    });
    // Reset form
    setNewRoleName(''); setNewRoleDesc(''); setNewRoleParent(''); setNewRoleBase('blank'); setShowCreateRoleModal(false);
    // Switch to permission matrix and highlight
    setRpTab('Permission Matrix');
    setEditingRole(role);
  };

  // ── A4: Clone role functionally ──
  const cloneRole = () => {
    const name = cloneName.trim();
    if (!name || systemRoles.includes(name) || customRoles.includes(name) || !matrix[cloneSource]) return;
    setCustomRoles(p => [...p, name]);
    const clonedPerms: Record<string, Record<string, boolean>> = {};
    ALL_MODULE_NAMES.forEach(mod => { clonedPerms[mod] = { ...matrix[cloneSource][mod] }; });
    setMatrix(prev => ({ ...prev, [name]: clonedPerms }));
    setRoleScopes(prev => {
      const s = { ...prev };
      s[name] = { ...(prev[cloneSource] || {}) };
      return s;
    });
    setRecentClones(p => [{ name, from: cloneSource }, ...p].slice(0, 5));
    setCloneBanner(`Role "${name}" created with permissions copied from "${cloneSource}". Review and adjust permissions below.`);
    setCloneName('');
    setTimeout(() => setCloneBanner(''), 5000);
    setRpTab('Permission Matrix');
    setEditingRole(name);
  };

  const allRoles = [...systemRoles, ...customRoles];

  return (
    <div className="space-y-4">
      <ModuleHeader title="Roles & Permissions" subtitle="Configure module-specific access permissions for each role" theme={theme} />

      <TabBar tabs={rpTabs} active={rpTab} onChange={setRpTab} theme={theme} />

      {/* ── Confirmation Modal (A1/A7) ── */}
      {confirmModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center" onClick={() => setConfirmModal(null)}>
          <div className={`${theme.cardBg} rounded-2xl p-5 w-96 shadow-2xl border ${theme.border}`} onClick={e => e.stopPropagation()}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-2`}>{confirmModal.title}</h3>
            <p className={`text-xs ${theme.iconColor} mb-4`}>{confirmModal.message}</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setConfirmModal(null)} className={`px-4 py-2 rounded-xl text-xs font-bold ${theme.secondaryBg} ${theme.highlight}`}>Cancel</button>
              <button onClick={() => { confirmModal.onConfirm(); setConfirmModal(null); }} className="px-4 py-2 rounded-xl text-xs font-bold bg-red-500 text-white hover:bg-red-600">Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Role Selector Modal (A5 — multi-role assignment) ── */}
      {roleModalUser && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center" onClick={() => setRoleModalUser(null)}>
          <div className={`${theme.cardBg} rounded-2xl p-5 w-[420px] shadow-2xl border ${theme.border} max-h-[80vh] overflow-y-auto`} onClick={e => e.stopPropagation()}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-1`}>Assign Roles — {roleModalUser}</h3>
            <p className={`text-[10px] ${theme.iconColor} mb-3`}>Select one or more roles for this user</p>
            <div className="space-y-1 mb-4">
              {allRoles.filter(r => !disabledRoles.includes(r)).map(role => (
                <label key={role} className={`flex items-center gap-2 p-2 rounded-xl ${theme.secondaryBg} cursor-pointer hover:opacity-80`}>
                  <input type="checkbox" checked={!!roleModalSelections[role]} onChange={() => setRoleModalSelections(p => ({ ...p, [role]: !p[role] }))} className="w-3.5 h-3.5 rounded accent-emerald-500" />
                  <span className={`text-xs font-medium ${theme.highlight}`}>{role}</span>
                  {systemRoles.includes(role) && <span className={`text-[8px] px-1.5 py-0.5 rounded ${theme.secondaryBg} ${theme.iconColor}`}>System</span>}
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setRoleModalUser(null)} className={`px-4 py-2 rounded-xl text-xs font-bold ${theme.secondaryBg} ${theme.highlight}`}>Cancel</button>
              <button onClick={() => {
                const selected = Object.entries(roleModalSelections).filter(([, v]) => v).map(([k]) => k);
                if (selected.length > 0) {
                  setMockUsers(prev => prev.map(u => u.name === roleModalUser ? { ...u, roles: selected } : u));
                }
                setRoleModalUser(null);
              }} className={`px-4 py-2 rounded-xl text-xs font-bold ${theme.primary} text-white`}>Save Roles</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Effective Permissions Modal (A5) ── */}
      {effectivePermsUser && (() => {
        const user = mockUsers.find(u => u.name === effectivePermsUser);
        if (!user) return null;
        const combined: Record<string, Record<string, boolean>> = {};
        ALL_MODULE_NAMES.forEach(mod => {
          combined[mod] = {};
          MODULE_PERMISSIONS[mod].forEach(p => {
            combined[mod][p] = user.roles.some(r => matrix[r]?.[mod]?.[p]);
          });
        });
        return (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center" onClick={() => setEffectivePermsUser(null)}>
            <div className={`${theme.cardBg} rounded-2xl p-5 w-[600px] shadow-2xl border ${theme.border} max-h-[85vh] overflow-y-auto`} onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className={`text-sm font-bold ${theme.highlight}`}>Effective Permissions — {effectivePermsUser}</h3>
                  <p className={`text-[10px] ${theme.iconColor}`}>Combined view from roles: {user.roles.join(', ')}</p>
                </div>
                <button onClick={() => setEffectivePermsUser(null)} className={`p-1 rounded-lg ${theme.buttonHover}`}><X size={14} className={theme.iconColor} /></button>
              </div>
              {ALL_MODULE_NAMES.map(mod => {
                const activePerms = MODULE_PERMISSIONS[mod].filter(p => combined[mod][p]);
                if (activePerms.length === 0) return null;
                return (
                  <div key={mod} className={`p-2.5 rounded-xl ${theme.secondaryBg} mb-1.5`}>
                    <p className={`text-[10px] font-bold ${theme.highlight} mb-1`}>{mod}</p>
                    <div className="flex flex-wrap gap-1">{activePerms.map(p => (
                      <span key={p} className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-emerald-100 text-emerald-700">{p}</span>
                    ))}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}

      {/* ── Create Custom Role Modal (A3) ── */}
      {showCreateRoleModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center" onClick={() => setShowCreateRoleModal(false)}>
          <div className={`${theme.cardBg} rounded-2xl p-5 w-[440px] shadow-2xl border ${theme.border}`} onClick={e => e.stopPropagation()}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Create Custom Role</h3>
            <div className="space-y-3">
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Role Name *</p>
                <InputField value={newRoleName} onChange={setNewRoleName} theme={theme} placeholder="e.g. Exam Coordinator" />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Description</p>
                <InputField value={newRoleDesc} onChange={setNewRoleDesc} theme={theme} placeholder="What is this role for?" />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Parent Role (inherits permissions)</p>
                <SelectField options={['(None)', ...allRoles]} value={newRoleParent || '(None)'} onChange={v => setNewRoleParent(v === '(None)' ? '' : v)} theme={theme} />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Base Permissions</p>
                <div className="space-y-1">
                  {[
                    { id: 'blank' as const, label: 'Start blank', desc: 'No permissions — add manually' },
                    { id: 'parent' as const, label: 'Copy from parent', desc: newRoleParent ? `Inherit all permissions from ${newRoleParent}` : 'Select a parent role first' },
                    { id: 'existing' as const, label: 'Copy from existing role', desc: 'Start with another role\'s permissions' },
                  ].map(opt => (
                    <label key={opt.id} className={`flex items-center gap-2 p-2 rounded-xl ${theme.secondaryBg} cursor-pointer ${opt.id === 'parent' && !newRoleParent ? 'opacity-50' : ''}`}>
                      <input type="radio" name="basePerms" checked={newRoleBase === opt.id} disabled={opt.id === 'parent' && !newRoleParent}
                        onChange={() => setNewRoleBase(opt.id)} className="accent-emerald-500" />
                      <div>
                        <p className={`text-xs font-bold ${theme.highlight}`}>{opt.label}</p>
                        <p className={`text-[10px] ${theme.iconColor}`}>{opt.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
                {newRoleBase === 'existing' && (
                  <div className="mt-2">
                    <SelectField options={allRoles} value={newRoleCopyFrom} onChange={setNewRoleCopyFrom} theme={theme} />
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowCreateRoleModal(false)} className={`px-4 py-2 rounded-xl text-xs font-bold ${theme.secondaryBg} ${theme.highlight}`}>Cancel</button>
              <button onClick={addCustomRole} disabled={!newRoleName.trim()} className={`px-4 py-2 rounded-xl text-xs font-bold ${theme.primary} text-white disabled:opacity-50`}>Create Role</button>
            </div>
          </div>
        </div>
      )}

      {/* ────── TAB 1: Permission Matrix (A1 + A2 accordion) ────── */}
      {rpTab === 'Permission Matrix' && <>
        {/* Editing banner */}
        {editingRole && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Edit size={14} className="text-blue-500" />
              <p className="text-xs text-blue-700"><strong>Editing:</strong> {editingRole} — modify permissions below, then save or cancel.</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => {
                if (editingRoleBackup) setMatrix(prev => ({ ...prev, [editingRole]: editingRoleBackup }));
                setEditingRole(null); setEditingRoleBackup(null);
              }} className="px-3 py-1.5 rounded-xl text-xs font-bold bg-gray-200 text-gray-700">Cancel</button>
              <button onClick={() => { setEditingRole(null); setEditingRoleBackup(null); }}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500 text-white">Save Changes</button>
            </div>
          </div>
        )}

        <SectionCard title="Permission Matrix" subtitle="Click a module to expand its specific permissions per role. Click 'Edit' on any role to modify." theme={theme}>
          {/* Module accordion headers */}
          <div className="space-y-1">
            {ALL_MODULE_NAMES.map(mod => {
              const isExpanded = !!expandedModules[mod];
              const perms = MODULE_PERMISSIONS[mod];
              return (
                <div key={mod} className={`rounded-xl border ${theme.border} overflow-hidden`}>
                  {/* Module header row */}
                  <button onClick={() => setExpandedModules(prev => ({ ...prev, [mod]: !prev[mod] }))}
                    className={`w-full flex items-center justify-between px-3 py-2 ${isExpanded ? theme.primary + ' text-white' : theme.secondaryBg} transition-all`}>
                    <div className="flex items-center gap-2">
                      {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                      <span className={`text-xs font-bold ${isExpanded ? '' : theme.highlight}`}>{mod}</span>
                      <span className={`text-[9px] ${isExpanded ? 'text-white/70' : theme.iconColor}`}>({perms.length} permissions)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {/* Quick summary: count of roles with any permission */}
                      <span className={`text-[9px] ${isExpanded ? 'text-white/70' : theme.iconColor}`}>
                        {allRoles.filter(r => !disabledRoles.includes(r) && perms.some(p => matrix[r]?.[mod]?.[p])).length} roles active
                      </span>
                    </div>
                  </button>

                  {/* Expanded permission grid */}
                  {isExpanded && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-[10px]">
                        <thead>
                          <tr className={theme.secondaryBg}>
                            <th className={`text-left px-2 py-2 font-bold ${theme.iconColor} sticky left-0 ${theme.secondaryBg} min-w-[140px]`}>Role</th>
                            {perms.map(p => (
                              <th key={p} className={`text-center px-1 py-2 font-bold ${theme.iconColor} whitespace-nowrap text-[8px]`}>{p}</th>
                            ))}
                            <th className={`text-center px-2 py-2 font-bold ${theme.iconColor} text-[8px]`}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allRoles.filter(r => !disabledRoles.includes(r)).map(role => {
                            const isEditing = editingRole === role;
                            const inherited = customRolesMeta[role]?.inheritedPerms?.[mod] || {};
                            return (
                              <tr key={role} className={`border-t ${theme.border} ${isEditing ? 'bg-blue-50/50 ring-1 ring-blue-200' : ''}`}>
                                <td className={`px-2 py-1.5 font-bold ${theme.highlight} sticky left-0 ${isEditing ? 'bg-blue-50' : theme.cardBg} whitespace-nowrap`}>
                                  {role}
                                  {customRolesMeta[role]?.parent && <span className={`ml-1 text-[8px] ${theme.iconColor}`}>({customRolesMeta[role].parent})</span>}
                                </td>
                                {perms.map(perm => {
                                  const isInherited = inherited[perm];
                                  const isOn = matrix[role]?.[mod]?.[perm];
                                  return (
                                    <td key={perm} className="px-0 py-1 text-center">
                                      <button onClick={() => togglePerm(role, mod, perm)}
                                        className={`w-5 h-5 rounded text-[8px] font-bold inline-flex items-center justify-center transition-all ${
                                          isOn ? (isInherited ? 'bg-emerald-300 text-white opacity-70' : 'bg-emerald-500 text-white') : `${theme.secondaryBg} ${theme.iconColor}`
                                        }`}
                                        title={isInherited ? 'Inherited from parent' : ''}>
                                        {isOn ? '\u2713' : ''}
                                      </button>
                                    </td>
                                  );
                                })}
                                <td className="px-1 py-1 text-center">
                                  <div className="flex items-center justify-center gap-1">
                                    {!isEditing ? (
                                      <button onClick={() => { setEditingRole(role); setEditingRoleBackup(matrix[role] ? JSON.parse(JSON.stringify(matrix[role])) : {}); }}
                                        className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${theme.iconColor} hover:underline`}>Edit</button>
                                    ) : (
                                      <span className="text-[8px] text-blue-500 font-bold">Editing</span>
                                    )}
                                    {customRoles.includes(role) ? (
                                      <button onClick={() => setConfirmModal({
                                        title: `Delete "${role}"?`,
                                        message: 'This custom role and all its permissions will be permanently removed. Users assigned to this role will need reassignment.',
                                        onConfirm: () => { setCustomRoles(p => p.filter(x => x !== role)); setMatrix(p => { const n = { ...p }; delete n[role]; return n; }); }
                                      })} className="text-red-400 hover:text-red-600"><Trash2 size={10} /></button>
                                    ) : (
                                      <button onClick={() => setConfirmModal({
                                        title: `Disable "${role}"?`,
                                        message: 'This system role will be hidden from role assignment dropdowns. It can be re-enabled later. Existing users with this role will keep it.',
                                        onConfirm: () => setDisabledRoles(p => [...p, role])
                                      })} className={`text-[8px] ${theme.iconColor} hover:text-amber-600`} title="Disable role">
                                        <Lock size={9} />
                                      </button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Disabled roles list */}
          {disabledRoles.length > 0 && (
            <div className="mt-3">
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Disabled Roles (hidden from assignment)</p>
              <div className="flex flex-wrap gap-1.5">
                {disabledRoles.map(r => (
                  <span key={r} className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-gray-100 text-gray-500 text-[10px] font-medium">
                    <Lock size={8} /> {r}
                    <button onClick={() => setDisabledRoles(p => p.filter(x => x !== r))} className="text-emerald-500 hover:text-emerald-700 ml-1" title="Re-enable">
                      <CheckCircle size={9} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </SectionCard>

        {/* Custom Roles section (A3) */}
        <SectionCard title="Custom Roles" subtitle="Create roles with specific permissions, hierarchy, and descriptions" theme={theme}>
          <div className="space-y-2">
            {customRoles.length > 0 && (
              <div className="space-y-1 mb-2">
                {customRoles.map(r => (
                  <div key={r} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                    <div>
                      <span className={`text-xs font-bold ${theme.highlight}`}>{r}</span>
                      {customRolesMeta[r]?.description && <p className={`text-[10px] ${theme.iconColor}`}>{customRolesMeta[r].description}</p>}
                      {customRolesMeta[r]?.parent && <p className={`text-[9px] ${theme.iconColor}`}>Inherits from: {customRolesMeta[r].parent}</p>}
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => { setEditingRole(r); setRpTab('Permission Matrix'); }}
                        className={`px-2 py-0.5 rounded-lg text-[9px] font-bold ${theme.iconColor} hover:underline`}>Edit Perms</button>
                      <button onClick={() => setConfirmModal({
                        title: `Delete "${r}"?`,
                        message: 'This custom role and all its permissions will be permanently removed.',
                        onConfirm: () => {
                          setCustomRoles(p => p.filter(x => x !== r));
                          setMatrix(p => { const n = { ...p }; delete n[r]; return n; });
                          const meta = { ...customRolesMeta }; delete meta[r]; setCustomRolesMeta(meta);
                        }
                      })} className="text-red-400 hover:text-red-600"><X size={10} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button onClick={() => setShowCreateRoleModal(true)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>
              <Plus size={14} /> Create Custom Role
            </button>
          </div>
        </SectionCard>
      </>}

      {/* ────── TAB 2: Roles & Hierarchy (A1, A3, A4, A5) ────── */}
      {rpTab === 'Roles & Hierarchy' && <>
        {/* Role Hierarchy */}
        <SectionCard title="Role Hierarchy" subtitle="Parent-child role relationships. Child roles inherit all parent permissions + their own additions." theme={theme}>
          <div className={`p-3 rounded-xl ${theme.secondaryBg} text-xs space-y-0.5`}>
            {[
              { role: 'Super Admin', depth: 0, parent: null },
              { role: 'Principal', depth: 1, parent: 'Super Admin' },
              { role: 'Vice Principal', depth: 2, parent: 'Principal' },
              { role: 'Teacher', depth: 3, parent: 'Vice Principal' },
              { role: 'Class Teacher', depth: 4, parent: 'Teacher (variant)' },
              { role: 'School Admin', depth: 1, parent: 'Super Admin' },
              { role: 'Receptionist', depth: 2, parent: 'School Admin' },
              { role: 'Account Head', depth: 2, parent: 'School Admin' },
              { role: 'HR Manager', depth: 1, parent: 'Super Admin' },
              { role: 'Transport Head', depth: 1, parent: 'Super Admin' },
              { role: 'Security Guard', depth: 1, parent: 'Super Admin' },
              { role: 'Librarian', depth: 1, parent: 'Super Admin' },
              { role: 'Hostel Warden', depth: 1, parent: 'Super Admin' },
              { role: 'Parent', depth: 0, parent: null },
              { role: 'Student', depth: 0, parent: null },
              ...customRoles.map(r => ({ role: r, depth: customRolesMeta[r]?.parent ? 2 : 1, parent: customRolesMeta[r]?.parent || 'Custom' })),
            ].map((item, i) => (
              <div key={i} className={`flex items-center ${disabledRoles.includes(item.role) ? 'opacity-40' : ''}`} style={{ paddingLeft: `${item.depth * 20}px` }}>
                {item.depth > 0 && <div className={`border-l-2 border-b-2 ${theme.border} w-3 h-3 mr-1.5 rounded-bl-sm shrink-0`} />}
                <span className={`font-bold ${theme.highlight}`}>{item.role}</span>
                {disabledRoles.includes(item.role) && <span className="ml-1.5 text-[8px] px-1.5 py-0.5 rounded bg-gray-200 text-gray-500 font-bold">DISABLED</span>}
                {item.parent && <span className={`ml-2 text-[10px] ${theme.iconColor}`}>Inherits from: <span className={`font-medium ${theme.highlight}`}>{item.parent}</span></span>}
              </div>
            ))}
          </div>
          <p className={`text-[10px] ${theme.iconColor} mt-2 italic`}>Parent/Student roles are standalone with limited, scoped access.</p>
        </SectionCard>

        {/* Clone Role (A4 — functional) */}
        <SectionCard title="Clone Role" subtitle="Duplicate an existing role — permissions are actually copied to the new role" theme={theme}>
          <div className="space-y-3">
            {cloneBanner && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 flex items-start gap-2">
                <CheckCircle size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                <p className="text-xs text-emerald-700">{cloneBanner}</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Source Role</p>
                <SelectField options={allRoles} value={cloneSource} onChange={setCloneSource} theme={theme} />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>New Role Name</p>
                <InputField value={cloneName} onChange={setCloneName} theme={theme} placeholder="e.g. Sports Coach" />
              </div>
            </div>
            <button onClick={cloneRole} disabled={!cloneName.trim()}
              className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold disabled:opacity-50`}>Clone Role</button>
            <p className={`text-[10px] ${theme.iconColor}`}>Cloned role starts with all permissions of the source role. Modify as needed in Permission Matrix.</p>
            {recentClones.length > 0 && (
              <div className={`p-2.5 rounded-xl ${theme.secondaryBg} space-y-1`}>
                <p className={`text-[10px] font-bold ${theme.iconColor}`}>Recently Cloned</p>
                {recentClones.map((c, i) => (
                  <div key={i} className={`flex items-center gap-1.5 text-[10px] ${theme.highlight}`}>
                    <CheckCircle size={10} className="text-emerald-500 shrink-0" /> {c.name} (cloned from {c.from})
                  </div>
                ))}
              </div>
            )}
          </div>
        </SectionCard>

        {/* Assign Roles to Users (A5 — multi-role) */}
        <SectionCard title="Assign Roles to Users" subtitle="Users can have multiple roles. Click Change/+Role to open the role selector." theme={theme}>
          <div className={`rounded-xl border ${theme.border} overflow-hidden`}>
            <table className="w-full text-[10px]">
              <thead className={theme.secondaryBg}>
                <tr>
                  {['User Name', 'Roles', 'Department', 'Assigned', 'By', 'Actions'].map(h => (
                    <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor} text-[9px] uppercase`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockUsers.map((u, i) => (
                  <tr key={i} className={`border-t ${theme.border}`}>
                    <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{u.name}</td>
                    <td className="px-3 py-2">
                      <div className="flex flex-wrap gap-1">
                        {u.roles.map(r => (
                          <span key={r} className={`flex items-center gap-0.5 px-2 py-0.5 rounded-lg ${theme.secondaryBg} font-bold ${theme.highlight} text-[9px]`}>
                            {r}
                            {u.roles.length > 1 && (
                              <button onClick={() => setMockUsers(prev => prev.map(mu => mu.name === u.name ? { ...mu, roles: mu.roles.filter(x => x !== r) } : mu))}
                                className="text-red-400 hover:text-red-600 ml-0.5"><X size={8} /></button>
                            )}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className={`px-3 py-2 ${theme.iconColor}`}>{u.dept}</td>
                    <td className={`px-3 py-2 ${theme.iconColor}`}>{u.date}</td>
                    <td className={`px-3 py-2 ${theme.iconColor}`}>{u.by}</td>
                    <td className="px-3 py-2">
                      <div className="flex gap-1">
                        <button onClick={() => {
                          setRoleModalUser(u.name);
                          const sel: Record<string, boolean> = {};
                          u.roles.forEach(r => { sel[r] = true; });
                          setRoleModalSelections(sel);
                        }} className={`px-2 py-0.5 rounded-lg text-[9px] font-bold ${theme.primary} text-white`}>Change</button>
                        <button onClick={() => {
                          setRoleModalUser(u.name);
                          const sel: Record<string, boolean> = {};
                          u.roles.forEach(r => { sel[r] = true; });
                          setRoleModalSelections(sel);
                        }} className={`px-2 py-0.5 rounded-lg text-[9px] font-bold ${theme.secondaryBg} ${theme.highlight}`}>+Role</button>
                        <button onClick={() => setEffectivePermsUser(u.name)}
                          className={`px-2 py-0.5 rounded-lg text-[9px] font-bold ${theme.secondaryBg} ${theme.iconColor}`} title="View combined permissions">
                          <Eye size={10} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Bulk Role Assignment */}
        <SectionCard title="Bulk Operations" subtitle="Assign a role to multiple users at once" theme={theme}>
          <div className="space-y-3">
            {bulkBanner && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 flex items-start gap-2">
                <CheckCircle size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                <p className="text-xs text-emerald-700">{bulkBanner}</p>
              </div>
            )}
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Step 1: Select Role to Assign</p>
              <SelectField options={allRoles.filter(r => !disabledRoles.includes(r))} value={bulkRole} onChange={setBulkRole} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Step 2: Select Users</p>
              <div className="flex gap-2 mb-2">
                <button onClick={() => setBulkSelected(prev => { const n = { ...prev }; mockUsers.filter(u => u.roles.some(r => ['Teacher', 'Class Teacher'].includes(r))).forEach(u => { n[u.name] = true; }); return n; })}
                  className={`px-2.5 py-1 rounded-lg text-[9px] font-bold ${theme.secondaryBg} ${theme.highlight}`}>Select All Teaching Staff</button>
                <button onClick={() => setBulkSelected(prev => { const n = { ...prev }; mockUsers.filter(u => !u.roles.some(r => ['Teacher', 'Class Teacher', 'Principal', 'Vice Principal'].includes(r))).forEach(u => { n[u.name] = true; }); return n; })}
                  className={`px-2.5 py-1 rounded-lg text-[9px] font-bold ${theme.secondaryBg} ${theme.highlight}`}>Select All Non-Teaching</button>
              </div>
              <div className={`rounded-xl border ${theme.border} overflow-hidden`}>
                {mockUsers.map((u, i) => (
                  <div key={i} className={`flex items-center gap-2 px-3 py-1.5 ${i > 0 ? `border-t ${theme.border}` : ''}`}>
                    <input type="checkbox" checked={!!bulkSelected[u.name]} onChange={() => setBulkSelected(prev => ({ ...prev, [u.name]: !prev[u.name] }))}
                      className="w-3.5 h-3.5 rounded accent-emerald-500" />
                    <span className={`text-[10px] font-bold ${theme.highlight} flex-1`}>{u.name}</span>
                    <span className={`text-[10px] ${theme.iconColor}`}>{u.dept}</span>
                    <div className="flex gap-0.5">{u.roles.map(r => <span key={r} className={`text-[9px] px-2 py-0.5 rounded-lg ${theme.secondaryBg} ${theme.iconColor}`}>{r}</span>)}</div>
                  </div>
                ))}
              </div>
              <p className={`text-[10px] ${theme.iconColor} mt-1`}>{Object.values(bulkSelected).filter(Boolean).length} of {mockUsers.length} selected</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-2 flex items-start gap-1.5">
              <AlertTriangle size={12} className="text-amber-500 mt-0.5 shrink-0" />
              <p className="text-[10px] text-amber-700">This will add the selected role to all chosen users (existing roles are kept).</p>
            </div>
            <button onClick={() => {
              const selectedUsers = Object.entries(bulkSelected).filter(([, v]) => v).map(([k]) => k);
              if (selectedUsers.length === 0) return;
              setMockUsers(prev => prev.map(u => selectedUsers.includes(u.name) && !u.roles.includes(bulkRole) ? { ...u, roles: [...u.roles, bulkRole] } : u));
              setBulkBanner(`Assigned "${bulkRole}" to ${selectedUsers.length} users successfully.`);
              setTimeout(() => setBulkBanner(''), 5000);
            }} className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>Apply Role to Selected</button>
          </div>
        </SectionCard>
      </>}

      {/* ────── TAB 3: Access Control (A6, A7, overrides, widgets) ────── */}
      {rpTab === 'Access Control' && <>
        {/* User-Level Permission Override (A7 — real form) */}
        <SectionCard title="User Permission Override" subtitle="Grant or restrict specific permissions for individual users beyond their base role" theme={theme}>
          <div className="space-y-3">
            <InputField value={overrideSearch} onChange={setOverrideSearch} theme={theme} placeholder="Find user to override..." />
            <div className={`rounded-xl border ${theme.border} overflow-hidden`}>
              <table className="w-full text-[10px]">
                <thead className={theme.secondaryBg}>
                  <tr>
                    {['User', 'Base Role', 'Type', 'Module', 'Permission', 'Granted By', 'Date', ''].map(h => (
                      <th key={h} className={`text-left px-2.5 py-2 font-bold ${theme.iconColor} text-[9px] uppercase`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {overrides.filter(o => !overrideSearch || o.user.toLowerCase().includes(overrideSearch.toLowerCase())).map((o, i) => (
                    <tr key={i} className={`border-t ${theme.border}`}>
                      <td className={`px-2.5 py-2 font-bold ${theme.highlight}`}>{o.user}</td>
                      <td className={`px-2.5 py-2 ${theme.iconColor}`}>{o.role}</td>
                      <td className="px-2.5 py-2"><span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${o.type === '+' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>{o.type === '+' ? 'Additive' : 'Restrictive'}</span></td>
                      <td className={`px-2.5 py-2 ${theme.iconColor}`}>{o.mod}</td>
                      <td className={`px-2.5 py-2 font-bold ${theme.highlight}`}>{o.perm}</td>
                      <td className={`px-2.5 py-2 ${theme.iconColor}`}>{o.by}</td>
                      <td className={`px-2.5 py-2 ${theme.iconColor}`}>{o.date}</td>
                      <td className="px-2.5 py-2"><button onClick={() => setOverrides(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={10} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Override — inline form (A7) */}
            {!showOverrideForm ? (
              <button onClick={() => { setShowOverrideForm(true); setOverridePerms({}); }}
                className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold flex items-center gap-1.5`}><Plus size={12} /> Add Override</button>
            ) : (
              <div className={`p-3 rounded-xl border-2 border-blue-200 ${theme.secondaryBg} space-y-3`}>
                <p className={`text-xs font-bold ${theme.highlight}`}>New Permission Override</p>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>User</p>
                    <SelectField options={mockUsers.map(u => u.name)} value={overrideUser} onChange={setOverrideUser} theme={theme} placeholder="Select user..." />
                  </div>
                  <div>
                    <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Type</p>
                    <div className="flex gap-1">
                      <button onClick={() => setOverrideType('+')} className={`flex-1 px-2 py-1.5 rounded-lg text-[10px] font-bold ${overrideType === '+' ? 'bg-emerald-500 text-white' : `${theme.secondaryBg} ${theme.highlight}`}`}>Additive (+)</button>
                      <button onClick={() => setOverrideType('-')} className={`flex-1 px-2 py-1.5 rounded-lg text-[10px] font-bold ${overrideType === '-' ? 'bg-red-500 text-white' : `${theme.secondaryBg} ${theme.highlight}`}`}>Restrictive (-)</button>
                    </div>
                  </div>
                  <div>
                    <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Module</p>
                    <SelectField options={ALL_MODULE_NAMES} value={overrideModule} onChange={v => { setOverrideModule(v); setOverridePerms({}); }} theme={theme} />
                  </div>
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Permissions</p>
                  <div className="flex flex-wrap gap-1">
                    {MODULE_PERMISSIONS[overrideModule]?.map(p => (
                      <label key={p} className={`flex items-center gap-1 px-2 py-1 rounded-lg ${theme.cardBg} border ${theme.border} cursor-pointer text-[9px]`}>
                        <input type="checkbox" checked={!!overridePerms[p]} onChange={() => setOverridePerms(prev => ({ ...prev, [p]: !prev[p] }))} className="w-3 h-3 accent-emerald-500" />
                        <span className={theme.highlight}>{p}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setShowOverrideForm(false)} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${theme.secondaryBg} ${theme.highlight}`}>Cancel</button>
                  <button onClick={() => {
                    const selectedPerms = Object.entries(overridePerms).filter(([, v]) => v).map(([k]) => k);
                    if (!overrideUser || selectedPerms.length === 0) return;
                    const userObj = mockUsers.find(u => u.name === overrideUser);
                    selectedPerms.forEach(perm => {
                      setOverrides(p => [...p, { user: overrideUser, role: userObj?.roles[0] || '', type: overrideType, mod: overrideModule, perm, by: 'Super Admin', date: '26 Feb 2026' }]);
                    });
                    setShowOverrideForm(false); setOverrideUser(''); setOverridePerms({});
                  }} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${theme.primary} text-white`}>Add Override</button>
                </div>
              </div>
            )}
          </div>
        </SectionCard>

        {/* Data Scope Configuration (A6 — module-wise per role) */}
        <SectionCard title="Data Scope Configuration" subtitle="Define what data each role can access per module. Click 'Edit' to set module-wise scope." theme={theme}>
          <div className={`rounded-xl border ${theme.border} overflow-hidden`}>
            <table className="w-full text-[10px]">
              <thead className={theme.secondaryBg}>
                <tr>
                  <th className={`text-left px-3 py-2 font-bold ${theme.iconColor} text-[9px] uppercase`}>Role</th>
                  <th className={`text-left px-3 py-2 font-bold ${theme.iconColor} text-[9px] uppercase`}>Scope Summary</th>
                  <th className={`text-center px-3 py-2 font-bold ${theme.iconColor} text-[9px] uppercase`}>Action</th>
                </tr>
              </thead>
              <tbody>
                {allRoles.filter(r => !disabledRoles.includes(r)).map((role) => {
                  const scopes = roleScopes[role] || {};
                  const uniqueScopes = [...new Set(Object.values(scopes))];
                  const isEditing = editingScopeRole === role;
                  return (
                    <React.Fragment key={role}>
                      <tr className={`border-t ${theme.border} ${isEditing ? 'bg-blue-50/50' : ''}`}>
                        <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{role}</td>
                        <td className="px-3 py-2">
                          <div className="flex flex-wrap gap-0.5">
                            {uniqueScopes.map(s => (
                              <span key={s} className={`px-2 py-0.5 rounded-lg ${theme.secondaryBg} text-[9px] font-bold ${theme.highlight}`}>{s}</span>
                            ))}
                          </div>
                        </td>
                        <td className="px-3 py-2 text-center">
                          <button onClick={() => setEditingScopeRole(isEditing ? null : role)} className={`text-[9px] font-bold ${isEditing ? 'text-blue-500' : theme.iconColor} hover:underline`}>
                            {isEditing ? 'Close' : 'Edit Scope'}
                          </button>
                        </td>
                      </tr>
                      {isEditing && (
                        <tr className="bg-blue-50/30">
                          <td colSpan={3} className="px-3 py-3">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between mb-2">
                                <p className={`text-[10px] font-bold ${theme.highlight}`}>Module-wise Scope for {role}</p>
                                <div className="flex gap-1">
                                  {SCOPE_OPTIONS.map(s => (
                                    <button key={s} onClick={() => {
                                      setRoleScopes(prev => {
                                        const updated = { ...prev, [role]: { ...prev[role] } };
                                        ALL_MODULE_NAMES.forEach(m => { updated[role][m] = s; });
                                        return updated;
                                      });
                                    }} className={`px-2 py-0.5 rounded text-[8px] font-bold ${theme.secondaryBg} ${theme.iconColor} hover:opacity-80`}>
                                      All → {s}
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <div className="grid grid-cols-2 lg:grid-cols-3 gap-1.5">
                                {ALL_MODULE_NAMES.map(mod => (
                                  <div key={mod} className={`flex items-center justify-between p-2 rounded-xl ${theme.secondaryBg}`}>
                                    <span className={`text-[10px] font-bold ${theme.highlight}`}>{mod}</span>
                                    <select value={scopes[mod] || 'Own Department'} onChange={e => {
                                      setRoleScopes(prev => ({ ...prev, [role]: { ...prev[role], [mod]: e.target.value } }));
                                    }} className={`text-[9px] px-1.5 py-0.5 rounded-lg border ${theme.border} ${theme.inputBg} ${theme.highlight}`}>
                                      {SCOPE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                  </div>
                                ))}
                              </div>
                              <div className={`p-2 rounded-xl bg-blue-50 border border-blue-100 mt-2`}>
                                <p className="text-[10px] text-blue-700">
                                  <strong>Scope preview:</strong> With these settings, a {role} would see:{' '}
                                  {ALL_MODULE_NAMES.filter(m => scopes[m] && scopes[m] !== 'Full School').slice(0, 3).map(m => `${m} for ${scopes[m]}`).join(', ')}
                                  {ALL_MODULE_NAMES.filter(m => scopes[m] === 'Full School').length > 0 && `, and full school data for ${ALL_MODULE_NAMES.filter(m => scopes[m] === 'Full School').join(', ')}`}
                                </p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Field-Level Permissions (unchanged) */}
        <SectionCard title="Field-Level Access" subtitle="Control visibility and masking of sensitive data fields per role" theme={theme}>
          <div className={`rounded-xl border ${theme.border} overflow-hidden`}>
            <table className="w-full text-[10px]">
              <thead className={theme.secondaryBg}>
                <tr>
                  {['Sensitive Field', 'Visible To', 'Hidden From', 'Masking'].map(h => (
                    <th key={h} className={`text-left px-2.5 py-2 font-bold ${theme.iconColor} text-[9px] uppercase`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { field: 'Salary / CTC', visible: ['Account Head', 'HR', 'Principal'], hidden: ['Teacher', 'Admin', 'Student'], mask: 'Full' },
                  { field: 'Parent Phone/Email', visible: ['Teacher', 'Admin', 'Principal'], hidden: ['Student'], mask: 'None' },
                  { field: 'Aadhaar Number', visible: ['Admin', 'HR'], hidden: ['Teacher', 'Student', 'Parent'], mask: 'Partial (****1234)' },
                  { field: 'Fee Defaulter Status', visible: ['Account Head', 'Admin', 'Principal'], hidden: ['Teacher', 'Parent'], mask: 'Full' },
                  { field: 'Medical Records', visible: ['Admin', 'Principal', 'Class Teacher'], hidden: ['Teacher', 'Student'], mask: 'Full' },
                  { field: 'Bank Details', visible: ['Account Head', 'HR'], hidden: ['Teacher', 'Admin', 'Student'], mask: 'Partial' },
                ].map((f, i) => (
                  <tr key={i} className={`border-t ${theme.border}`}>
                    <td className={`px-2.5 py-2 font-bold ${theme.highlight}`}>{f.field}</td>
                    <td className="px-2.5 py-2">
                      <div className="flex flex-wrap gap-0.5">{f.visible.map(r => <span key={r} className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-emerald-100 text-emerald-700">{r}</span>)}</div>
                    </td>
                    <td className="px-2.5 py-2">
                      <div className="flex flex-wrap gap-0.5">{f.hidden.map(r => <span key={r} className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-gray-200 text-gray-500">{r}</span>)}</div>
                    </td>
                    <td className={`px-2.5 py-2 text-[9px] font-bold ${theme.iconColor}`}>{f.mask}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Dashboard Layout Per Role (A7 — real widget editor) */}
        <SectionCard title="Default Dashboard Widgets" subtitle="Configure which widgets appear on each role's dashboard. Click Edit to toggle widgets." theme={theme}>
          <div className="space-y-2">
            {Object.entries(dashboardWidgets).map(([role, widgets]) => (
              <div key={role} className={`rounded-xl ${theme.secondaryBg}`}>
                <div className="flex items-center gap-3 p-2.5">
                  <span className={`text-[10px] font-bold ${theme.highlight} min-w-[90px]`}>{role}</span>
                  <div className="flex flex-wrap gap-1 flex-1">
                    {widgets.map(w => <span key={w} className={`px-2 py-0.5 rounded-lg text-[9px] font-medium ${theme.cardBg} ${theme.highlight} border ${theme.border}`}>{w}</span>)}
                  </div>
                  <button onClick={() => setEditingWidgetRole(editingWidgetRole === role ? null : role)} className={`text-[9px] font-bold ${editingWidgetRole === role ? 'text-blue-500' : theme.iconColor} hover:underline shrink-0`}>
                    {editingWidgetRole === role ? 'Done' : 'Edit'}
                  </button>
                </div>
                {editingWidgetRole === role && (
                  <div className="px-2.5 pb-2.5">
                    <div className="flex flex-wrap gap-1">
                      {allWidgetOptions.map(w => {
                        const isOn = widgets.includes(w);
                        return (
                          <button key={w} onClick={() => {
                            setDashboardWidgets(prev => ({
                              ...prev,
                              [role]: isOn ? prev[role].filter(x => x !== w) : [...prev[role], w]
                            }));
                          }} className={`px-2 py-0.5 rounded-lg text-[9px] font-medium border transition-all ${isOn ? 'bg-emerald-100 border-emerald-300 text-emerald-700' : `${theme.cardBg} ${theme.border} ${theme.iconColor}`}`}>
                            {isOn ? '\u2713 ' : ''}{w}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Gap 18: Field-Level Data Masking */}
        <SectionCard title="Field-Level Data Masking" subtitle="Configure which sensitive fields are masked when displayed to users. Masking format is shown next to each field." theme={theme}>
          <div className="space-y-2">
            {Object.entries(maskingToggles).map(([field, enabled]) => (
              <div key={field} className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex items-center gap-3">
                  <ShieldAlert size={14} className={enabled ? 'text-emerald-500' : theme.iconColor} />
                  <div>
                    <p className={`text-xs font-bold ${theme.highlight}`}>{field.split(' (')[0]}</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>
                      {field.includes('(') ? field.match(/\(([^)]+)\)/)?.[1] : 'Hidden from unauthorized roles'}
                    </p>
                  </div>
                </div>
                <SSAToggle
                  on={enabled}
                  onChange={() => setMaskingToggles(prev => ({ ...prev, [field]: !prev[field] }))}
                  theme={theme}
                />
              </div>
            ))}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 flex items-start gap-2 mt-2">
              <AlertTriangle size={12} className="text-amber-500 mt-0.5 shrink-0" />
              <p className="text-[10px] text-amber-700">Masking applies to all roles except Super Admin and Principal. Individual overrides can be configured in User Permission Override above.</p>
            </div>
          </div>
        </SectionCard>

        {/* Gap 27: Support Impersonation */}
        <SectionCard title="Support Impersonation" subtitle="Log in as any user to troubleshoot their experience. All sessions are fully audited." theme={theme}>
          <div className="space-y-3">
            <div className="bg-red-50 border border-red-200 rounded-xl p-2.5 flex items-start gap-2">
              <ShieldAlert size={14} className="text-red-500 mt-0.5 shrink-0" />
              <p className="text-[10px] text-red-700 font-medium">All impersonation sessions are logged with admin ID, target user, start time, and end time. This feature is restricted to Super Admin only.</p>
            </div>
            <div className="relative">
              <Search size={14} className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.iconColor}`} />
              <input
                type="text"
                value={impersonateSearch}
                onChange={e => setImpersonateSearch(e.target.value)}
                placeholder="Search user by name, role, or email..."
                className={`w-full pl-9 pr-4 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} placeholder:${theme.iconColor}`}
              />
            </div>
            <div className={`rounded-xl border ${theme.border} overflow-hidden`}>
              {impersonateUsers
                .filter(u => !impersonateSearch || u.name.toLowerCase().includes(impersonateSearch.toLowerCase()) || u.role.toLowerCase().includes(impersonateSearch.toLowerCase()) || u.email.toLowerCase().includes(impersonateSearch.toLowerCase()))
                .map((user, i) => (
                <div key={i} className={`flex items-center justify-between px-4 py-3 ${i > 0 ? `border-t ${theme.border}` : ''} ${theme.buttonHover} transition-all`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${theme.primary} text-white flex items-center justify-center text-[10px] font-bold`}>
                      {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <p className={`text-xs font-bold ${theme.highlight}`}>{user.name}</p>
                      <p className={`text-[10px] ${theme.iconColor}`}>{user.role} {user.dept !== '—' ? `| ${user.dept}` : ''} | {user.email}</p>
                    </div>
                  </div>
                  <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 text-white text-[10px] font-bold hover:bg-amber-600 transition-all`}>
                    <LogIn size={12} /> Login As
                  </button>
                </div>
              ))}
              {impersonateSearch && impersonateUsers.filter(u => u.name.toLowerCase().includes(impersonateSearch.toLowerCase()) || u.role.toLowerCase().includes(impersonateSearch.toLowerCase()) || u.email.toLowerCase().includes(impersonateSearch.toLowerCase())).length === 0 && (
                <div className={`px-4 py-6 text-center ${theme.iconColor} text-xs`}>No users found matching &quot;{impersonateSearch}&quot;</div>
              )}
            </div>
            <p className={`text-[10px] ${theme.iconColor} italic`}>Recent impersonation sessions: Rajesh Kumar (2 days ago, 4 min), Admin01 (5 days ago, 12 min)</p>
          </div>
        </SectionCard>
      </>}

      {/* ────── TAB 4: Audit & Temp (A7 — all functional) ────── */}
      {rpTab === 'Audit & Temp' && <>
        {/* Permission Audit Log */}
        <SectionCard title="Permission Change Log" subtitle="Track all role and permission changes with full audit trail" theme={theme}>
          <div className="flex gap-2 mb-3">
            <InputField value="" onChange={() => {}} theme={theme} placeholder="Filter by date range..." type="date" />
            <SelectField options={['All Actions', 'Grant', 'Revoke', 'Create Role', 'Assign Role', 'Clone Role']} value="All Actions" onChange={() => {}} theme={theme} />
          </div>
          <div className={`rounded-xl border ${theme.border} overflow-hidden`}>
            <table className="w-full text-[10px]">
              <thead className={theme.secondaryBg}>
                <tr>
                  {['Date/Time', 'Changed By', 'Action', 'Role Affected', 'Details', 'IP'].map(h => (
                    <th key={h} className={`text-left px-2.5 py-2 font-bold ${theme.iconColor} text-[9px] uppercase`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { date: '25 Feb 10:15', by: 'Admin', action: 'Grant', role: 'Teacher', detail: 'Granted "View Reports" in Fees to Teacher role', ip: '192.168.1.45' },
                  { date: '24 Feb 16:30', by: 'Principal', action: 'Revoke', role: 'Receptionist', detail: 'Revoked "Delete" in Students from Receptionist', ip: '192.168.1.12' },
                  { date: '23 Feb 11:00', by: 'Admin', action: 'Create', role: 'Lab Coordinator', detail: 'Created custom role "Lab Coordinator" (parent: Teacher)', ip: '192.168.1.45' },
                  { date: '22 Feb 09:45', by: 'Admin', action: 'Assign', role: 'Class Teacher', detail: 'Assigned "Class Teacher" to Mrs. Priya Sharma', ip: '192.168.1.45' },
                  { date: '20 Feb 08:00', by: 'System', action: 'Auto-Grant', role: 'Class Teacher', detail: 'Auto-granted batch permissions to new Class Teacher', ip: 'System' },
                  { date: '18 Feb 14:20', by: 'Admin', action: 'Clone', role: 'Sports Coach', detail: 'Cloned "Teacher" role to create "Sports Coach"', ip: '192.168.1.45' },
                ].map((log, i) => (
                  <tr key={i} className={`border-t ${theme.border}`}>
                    <td className={`px-2.5 py-2 ${theme.iconColor} whitespace-nowrap`}>{log.date}</td>
                    <td className={`px-2.5 py-2 font-bold ${theme.highlight}`}>{log.by}</td>
                    <td className="px-2.5 py-2">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                        log.action === 'Grant' || log.action === 'Auto-Grant' ? 'bg-emerald-100 text-emerald-700' :
                        log.action === 'Revoke' ? 'bg-red-100 text-red-700' :
                        log.action === 'Create' || log.action === 'Clone' ? 'bg-blue-100 text-blue-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>{log.action}</span>
                    </td>
                    <td className={`px-2.5 py-2 font-bold ${theme.highlight}`}>{log.role}</td>
                    <td className={`px-2.5 py-2 ${theme.iconColor}`}>{log.detail}</td>
                    <td className={`px-2.5 py-2 ${theme.iconColor} text-[9px]`}>{log.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Temporary Role Elevation (A7 — functional) */}
        <SectionCard title="Temporary Roles" subtitle="Grant time-bound role elevations that auto-revert on expiry" theme={theme}>
          <div className="space-y-3">
            {tempRoleBanner && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 flex items-start gap-2">
                <CheckCircle size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                <p className="text-xs text-emerald-700">{tempRoleBanner}</p>
              </div>
            )}
            <p className={`text-[10px] font-bold ${theme.iconColor}`}>Active & Recent Elevations</p>
            <div className={`rounded-xl border ${theme.border} overflow-hidden`}>
              <table className="w-full text-[10px]">
                <thead className={theme.secondaryBg}>
                  <tr>
                    {['User', 'Base Role', 'Temp Role', 'Start', 'End', 'Reason', 'Status', ''].map(h => (
                      <th key={h} className={`text-left px-2.5 py-2 font-bold ${theme.iconColor} text-[9px] uppercase`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tempRoles.map((t, i) => (
                    <tr key={i} className={`border-t ${theme.border}`}>
                      <td className={`px-2.5 py-2 font-bold ${theme.highlight}`}>{t.user}</td>
                      <td className={`px-2.5 py-2 ${theme.iconColor}`}>{t.base}</td>
                      <td className={`px-2.5 py-2 font-bold ${theme.highlight}`}>{t.temp}</td>
                      <td className={`px-2.5 py-2 ${theme.iconColor}`}>{t.start}</td>
                      <td className={`px-2.5 py-2 ${theme.iconColor}`}>{t.end}</td>
                      <td className={`px-2.5 py-2 ${theme.iconColor}`}>{t.reason}</td>
                      <td className="px-2.5 py-2">
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${t.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-500'}`}>{t.status}</span>
                      </td>
                      <td className="px-2.5 py-2">
                        {t.status === 'Active' && (
                          <button onClick={() => setTempRoles(p => p.map((tr, j) => j === i ? { ...tr, status: 'Expired' as const } : tr))}
                            className="text-[9px] font-bold text-red-400 hover:text-red-600">Revoke</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={`text-[10px] ${theme.iconColor} italic`}>Role automatically reverts on end date. Revoke early if needed.</p>
            <div className={`p-3 rounded-xl ${theme.secondaryBg} space-y-2`}>
              <p className={`text-[10px] font-bold ${theme.highlight}`}>Grant Temporary Role</p>
              <div className="grid grid-cols-2 gap-2">
                <SelectField options={mockUsers.map(u => u.name)} value={tempRoleUser} onChange={setTempRoleUser} theme={theme} placeholder="Select user..." />
                <SelectField options={['Acting Principal', 'Acting Vice Principal', 'Acting Admin', 'Exam Coordinator', 'Event Coordinator']} value={tempRoleRole} onChange={setTempRoleRole} theme={theme} placeholder="Select temp role..." />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <InputField value={tempRoleStart} onChange={setTempRoleStart} theme={theme} type="date" placeholder="Start" />
                <InputField value={tempRoleEnd} onChange={setTempRoleEnd} theme={theme} type="date" placeholder="End" />
                <InputField value={tempRoleReason} onChange={setTempRoleReason} theme={theme} placeholder="Reason..." />
              </div>
              <button onClick={() => {
                if (!tempRoleUser || !tempRoleRole) return;
                const userObj = mockUsers.find(u => u.name === tempRoleUser);
                setTempRoles(p => [...p, {
                  user: tempRoleUser, base: userObj?.roles[0] || '', temp: tempRoleRole,
                  start: tempRoleStart || '26 Feb', end: tempRoleEnd || '26 Mar',
                  reason: tempRoleReason || 'Temporary assignment', status: 'Active' as const
                }]);
                setTempRoleBanner(`Temporary role "${tempRoleRole}" granted to "${tempRoleUser}" successfully.`);
                setTempRoleUser(''); setTempRoleRole(''); setTempRoleStart(''); setTempRoleEnd(''); setTempRoleReason('');
                setTimeout(() => setTempRoleBanner(''), 5000);
              }} className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>Grant Temporary Role</button>
            </div>
          </div>
        </SectionCard>

        {/* Role Comparison (updated for module-specific perms) */}
        <SectionCard title="Compare Roles" subtitle="Side-by-side permission comparison highlighting differences" theme={theme}>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Role A</p>
                <SelectField options={allRoles} value={compareA} onChange={setCompareA} theme={theme} />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Role B</p>
                <SelectField options={allRoles} value={compareB} onChange={setCompareB} theme={theme} />
              </div>
            </div>
            <p className={`text-[10px] ${theme.iconColor} italic`}>Showing modules where permissions differ between {compareA} and {compareB}.</p>
            <div className="space-y-1">
              {ALL_MODULE_NAMES.map(mod => {
                const perms = MODULE_PERMISSIONS[mod];
                const diffs = perms.filter(p => !!matrix[compareA]?.[mod]?.[p] !== !!matrix[compareB]?.[mod]?.[p]);
                if (diffs.length === 0) return null;
                return (
                  <div key={mod} className={`rounded-xl border ${theme.border} p-2.5`}>
                    <p className={`text-[10px] font-bold ${theme.highlight} mb-1`}>{mod} ({diffs.length} differences)</p>
                    <div className="grid grid-cols-3 gap-1 text-[9px]">
                      <div className={`font-bold ${theme.iconColor}`}>Permission</div>
                      <div className={`font-bold ${theme.iconColor}`}>{compareA}</div>
                      <div className={`font-bold ${theme.iconColor}`}>{compareB}</div>
                      {diffs.map(p => (
                        <React.Fragment key={p}>
                          <div className={theme.highlight}>{p}</div>
                          <div><span className={`px-1.5 py-0.5 rounded font-bold ${matrix[compareA]?.[mod]?.[p] ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>{matrix[compareA]?.[mod]?.[p] ? 'Yes' : 'No'}</span></div>
                          <div><span className={`px-1.5 py-0.5 rounded font-bold ${matrix[compareB]?.[mod]?.[p] ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>{matrix[compareB]?.[mod]?.[p] ? 'Yes' : 'No'}</span></div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                );
              }).filter(Boolean)}
              {ALL_MODULE_NAMES.every(mod => {
                const perms = MODULE_PERMISSIONS[mod];
                return perms.every(p => !!matrix[compareA]?.[mod]?.[p] === !!matrix[compareB]?.[mod]?.[p]);
              }) && (
                <div className={`p-4 text-center ${theme.iconColor} text-xs`}>No differences found. These roles have identical permissions.</div>
              )}
            </div>
          </div>
        </SectionCard>
      </>}
    </div>
  );
}
