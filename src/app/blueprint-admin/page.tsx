'use client';

import { useState, useEffect } from 'react';
import BlueprintLayout from '@/components/BlueprintLayout';
import { type Theme } from '@/lib/themes';
import { type TeamMember } from '@/lib/auth';
import {
  getUsers, createUser, updateUser, deleteUser,
  getPendingFeedback, getAllFeedbackForAdmin, moderateFeedback,
  getFeedbackDetail,
  type BlueprintUser, type FeedbackItem
} from '@/lib/supabase';
import {
  Users, ShieldAlert, Plus, Pencil, Trash2, Check, X, Eye,
  Clock, CheckCircle, XCircle, MessageSquare, Filter, ChevronDown,
  Camera, ExternalLink, MapPin, Crosshair
} from 'lucide-react';

// All available dashboards for the checklist
const ALL_DASHBOARDS = [
  { id: 'school-admin', label: 'School Admin' },
  { id: 'school-super-admin', label: 'School Super Admin' },
  { id: 'principal', label: 'Principal' },
  { id: 'teacher', label: 'Teacher' },
  { id: 'student', label: 'Student' },
  { id: 'parent', label: 'Parent' },
  { id: 'super-admin', label: 'Super Admin' },
  { id: 'trustee', label: 'Trustee' },
  { id: 'vice-principal', label: 'Vice Principal' },
  { id: 'hr-manager', label: 'HR Manager' },
  { id: 'accounts-head', label: 'Accounts Head' },
  { id: 'receptionist', label: 'Receptionist' },
  { id: 'transport-head', label: 'Transport Head' },
  { id: 'security', label: 'Security' },
  { id: 'account-manager', label: 'Account Manager' },
  { id: 'reseller', label: 'Reseller' },
  { id: 'chat', label: 'Chat' },
  { id: 'auth', label: 'Auth / Login' },
  { id: 'bus-nanny', label: 'Bus Nanny' },
  { id: 'nutritionist', label: 'Nutritionist' },
  { id: 'activity-coordinator', label: 'Activity Coordinator' },
];

const ROLE_OPTIONS = ['PM / Founder', 'Developer', 'Consultant', 'Designer', 'Tester'];

function AdminPage({ theme, currentUser }: { theme?: Theme; currentUser?: TeamMember }) {
  const [activeTab, setActiveTab] = useState<'users' | 'moderation'>('users');

  if (!theme) return null;

  // Non-admin protection (already blocked by layout, but double-safe)
  if (!currentUser?.is_admin) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <ShieldAlert size={48} className="text-red-400 mb-4" />
        <h2 className={`text-xl font-bold ${theme.highlight}`}>Admin Access Required</h2>
        <p className={`text-sm ${theme.iconColor} mt-2`}>Only administrators can access this panel.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6`}>
        <h1 className={`text-2xl font-bold ${theme.highlight} flex items-center gap-3`}>
          <ShieldAlert size={24} className="text-amber-500" />
          Blueprint Admin Panel
        </h1>
        <p className={`text-sm ${theme.iconColor} mt-1`}>Manage users, dashboard access, and moderate remarks.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'users' ? `${theme.primary} text-white` : `${theme.cardBg} border ${theme.border} ${theme.iconColor}`
          }`}
        >
          <Users size={16} /> User Management
        </button>
        <button
          onClick={() => setActiveTab('moderation')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'moderation' ? `${theme.primary} text-white` : `${theme.cardBg} border ${theme.border} ${theme.iconColor}`
          }`}
        >
          <MessageSquare size={16} /> Remark Moderation
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'users' && <UserManagementTab theme={theme} />}
      {activeTab === 'moderation' && <ModerationTab theme={theme} currentUser={currentUser} />}
    </div>
  );
}

// ─── User Management Tab ─────────────────────────────

function UserManagementTab({ theme }: { theme: Theme }) {
  const [users, setUsers] = useState<BlueprintUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<BlueprintUser | null>(null);
  const [toast, setToast] = useState('');

  // Form state
  const [formUserId, setFormUserId] = useState('');
  const [formName, setFormName] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formRole, setFormRole] = useState('Consultant');
  const [formDashboards, setFormDashboards] = useState<string[]>([]);
  const [formIsAdmin, setFormIsAdmin] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadUsers = async () => {
    setLoading(true);
    const data = await getUsers();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => { loadUsers(); }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const openCreate = () => {
    setEditingUser(null);
    setFormUserId('');
    setFormName('');
    setFormPassword('');
    setFormRole('Consultant');
    setFormDashboards([]);
    setFormIsAdmin(false);
    setShowModal(true);
  };

  const openEdit = (u: BlueprintUser) => {
    setEditingUser(u);
    setFormUserId(u.user_id);
    setFormName(u.name);
    setFormPassword(u.password);
    setFormRole(u.role);
    setFormDashboards(u.allowed_dashboards || []);
    setFormIsAdmin(u.is_admin);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formUserId.trim() || !formName.trim() || !formPassword.trim()) return;
    setSaving(true);

    if (editingUser) {
      const ok = await updateUser(editingUser.user_id, {
        name: formName,
        password: formPassword,
        role: formRole,
        allowed_dashboards: formDashboards,
        is_admin: formIsAdmin,
      });
      showToast(ok ? 'User updated' : 'Error updating user');
    } else {
      const created = await createUser({
        user_id: formUserId.toLowerCase().trim(),
        name: formName.trim(),
        password: formPassword,
        role: formRole,
        allowed_dashboards: formDashboards,
        is_admin: formIsAdmin,
      });
      showToast(created ? 'User created' : 'Error creating user');
    }

    setSaving(false);
    setShowModal(false);
    loadUsers();
  };

  const handleDelete = async (userId: string) => {
    if (userId === 'piush') { showToast('Cannot delete primary admin'); return; }
    if (!confirm(`Delete user "${userId}"?`)) return;
    const ok = await deleteUser(userId);
    showToast(ok ? 'User deleted' : 'Error deleting user');
    loadUsers();
  };

  const toggleDashboard = (id: string) => {
    setFormDashboards(prev => prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]);
  };

  const selectAllDashboards = () => {
    if (formDashboards.length === ALL_DASHBOARDS.length) {
      setFormDashboards([]);
    } else {
      setFormDashboards(ALL_DASHBOARDS.map(d => d.id));
    }
  };

  return (
    <div className="space-y-4">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <h2 className={`text-lg font-bold ${theme.highlight}`}>Users ({users.length})</h2>
        <button onClick={openCreate} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold ${theme.primary} text-white hover:opacity-90 transition-all`}>
          <Plus size={16} /> Create User
        </button>
      </div>

      {/* Users table */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden`}>
        {loading ? (
          <div className="p-8 text-center"><p className={`text-sm ${theme.iconColor}`}>Loading users...</p></div>
        ) : users.length === 0 ? (
          <div className="p-8 text-center"><p className={`text-sm ${theme.iconColor}`}>No users found. Create the Supabase table first.</p></div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className={`border-b ${theme.border} ${theme.secondaryBg}`}>
                <th className={`px-4 py-3 text-left text-[10px] font-bold uppercase ${theme.iconColor}`}>Name</th>
                <th className={`px-4 py-3 text-left text-[10px] font-bold uppercase ${theme.iconColor}`}>User ID</th>
                <th className={`px-4 py-3 text-left text-[10px] font-bold uppercase ${theme.iconColor}`}>Role</th>
                <th className={`px-4 py-3 text-left text-[10px] font-bold uppercase ${theme.iconColor}`}>Dashboards</th>
                <th className={`px-4 py-3 text-left text-[10px] font-bold uppercase ${theme.iconColor}`}>Admin</th>
                <th className={`px-4 py-3 text-right text-[10px] font-bold uppercase ${theme.iconColor}`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.user_id} className={`border-b ${theme.border} hover:${theme.secondaryBg} transition-colors`}>
                  <td className={`px-4 py-3 text-sm font-bold ${theme.highlight}`}>{u.name}</td>
                  <td className={`px-4 py-3 text-xs ${theme.iconColor} font-mono`}>{u.user_id}</td>
                  <td className={`px-4 py-3 text-xs ${theme.iconColor}`}>{u.role}</td>
                  <td className={`px-4 py-3`}>
                    {u.is_admin && (!u.allowed_dashboards || u.allowed_dashboards.length === 0) ? (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">All Access</span>
                    ) : u.allowed_dashboards && u.allowed_dashboards.length > 0 ? (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${theme.secondaryBg} ${theme.iconColor} font-bold`}>
                        {u.allowed_dashboards.length} dashboards
                      </span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-bold">No access</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {u.is_admin ? (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold">Admin</span>
                    ) : (
                      <span className={`text-[10px] ${theme.iconColor}`}>—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(u)} className={`p-1.5 rounded-lg ${theme.secondaryBg} ${theme.iconColor} hover:text-blue-400 transition-all`} title="Edit">
                        <Pencil size={12} />
                      </button>
                      {u.user_id !== 'piush' && (
                        <button onClick={() => handleDelete(u.user_id)} className={`p-1.5 rounded-lg ${theme.secondaryBg} ${theme.iconColor} hover:text-red-400 transition-all`} title="Delete">
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowModal(false)}>
          <div className={`${theme.cardBg} border ${theme.border} rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-6`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className={`text-lg font-bold ${theme.highlight}`}>{editingUser ? 'Edit User' : 'Create User'}</h3>
              <button onClick={() => setShowModal(false)} className={`${theme.iconColor} hover:text-red-400`}><X size={18} /></button>
            </div>

            {/* User ID */}
            <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>User ID</label>
            <input
              value={formUserId}
              onChange={e => setFormUserId(e.target.value)}
              disabled={!!editingUser}
              placeholder="e.g. kshama"
              className={`w-full ${theme.secondaryBg} border ${theme.border} ${theme.highlight} text-sm rounded-xl px-3 py-2.5 outline-none focus:border-purple-500 mb-3 ${editingUser ? 'opacity-50' : ''}`}
            />

            {/* Name */}
            <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Full Name</label>
            <input
              value={formName}
              onChange={e => setFormName(e.target.value)}
              placeholder="e.g. Kshama Patel"
              className={`w-full ${theme.secondaryBg} border ${theme.border} ${theme.highlight} text-sm rounded-xl px-3 py-2.5 outline-none focus:border-purple-500 mb-3`}
            />

            {/* Password */}
            <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Password</label>
            <input
              value={formPassword}
              onChange={e => setFormPassword(e.target.value)}
              placeholder="e.g. kshama2026"
              className={`w-full ${theme.secondaryBg} border ${theme.border} ${theme.highlight} text-sm rounded-xl px-3 py-2.5 outline-none focus:border-purple-500 mb-3`}
            />

            {/* Role */}
            <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Role</label>
            <select
              value={formRole}
              onChange={e => setFormRole(e.target.value)}
              className={`w-full ${theme.secondaryBg} border ${theme.border} ${theme.highlight} text-sm rounded-xl px-3 py-2.5 outline-none focus:border-purple-500 mb-3`}
            >
              {ROLE_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>

            {/* Admin toggle */}
            <div className="flex items-center gap-3 mb-4">
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>Admin Access</label>
              <button
                onClick={() => setFormIsAdmin(!formIsAdmin)}
                className={`relative w-10 h-5 rounded-full transition-colors ${formIsAdmin ? 'bg-amber-500' : theme.secondaryBg + ' border ' + theme.border}`}
              >
                <span className={`absolute top-0.5 ${formIsAdmin ? 'left-5' : 'left-0.5'} w-4 h-4 rounded-full bg-white shadow transition-all`} />
              </button>
              <span className={`text-xs ${formIsAdmin ? 'text-amber-400 font-bold' : theme.iconColor}`}>{formIsAdmin ? 'Yes' : 'No'}</span>
            </div>

            {/* Dashboard checklist */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>Allowed Dashboards</label>
                <button onClick={selectAllDashboards} className={`text-[10px] font-bold ${theme.primaryText}`}>
                  {formDashboards.length === ALL_DASHBOARDS.length ? 'Deselect All' : 'Select All'}
                </button>
              </div>
              {formIsAdmin && formDashboards.length === 0 && (
                <p className="text-[10px] text-amber-400 mb-2">Admin with empty list = full access to all dashboards</p>
              )}
              <div className={`grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto p-2 rounded-xl ${theme.secondaryBg} border ${theme.border}`}>
                {ALL_DASHBOARDS.map(d => (
                  <label key={d.id} className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer text-[11px] ${theme.iconColor} hover:${theme.highlight} transition-colors`}>
                    <input
                      type="checkbox"
                      checked={formDashboards.includes(d.id)}
                      onChange={() => toggleDashboard(d.id)}
                      className="w-3.5 h-3.5 rounded accent-purple-500"
                    />
                    {d.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button onClick={() => setShowModal(false)} className={`flex-1 py-2.5 rounded-xl text-sm font-bold ${theme.secondaryBg} ${theme.iconColor} border ${theme.border}`}>
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!formUserId.trim() || !formName.trim() || !formPassword.trim() || saving}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 transition-all"
              >
                {saving ? 'Saving...' : editingUser ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-purple-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}

// ─── Moderation Tab ──────────────────────────────────

function ModerationTab({ theme, currentUser }: { theme: Theme; currentUser: TeamMember }) {
  const [pending, setPending] = useState<FeedbackItem[]>([]);
  const [allFeedback, setAllFeedback] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [historyFilter, setHistoryFilter] = useState<'all' | 'approved' | 'rejected' | 'modified'>('all');
  const [toast, setToast] = useState('');

  // Per-card state for moderation actions
  const [actionNotes, setActionNotes] = useState<Record<string, string>>({});
  const [editedRemarks, setEditedRemarks] = useState<Record<string, string>>({});
  const [showEditFor, setShowEditFor] = useState<string | null>(null);

  // Screenshot modal state
  const [screenshotModal, setScreenshotModal] = useState<{ id: string; loading: boolean; base64: string | null } | null>(null);

  const openScreenshot = async (id: string) => {
    setScreenshotModal({ id, loading: true, base64: null });
    const detail = await getFeedbackDetail(id);
    setScreenshotModal({ id, loading: false, base64: detail?.screenshot_base64 || null });
  };

  // Build dashboard URL from page name
  const getDashboardUrl = (page: string) => {
    const slug = page.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    return `/${slug}`;
  };

  const loadData = async () => {
    setLoading(true);
    const [p, all] = await Promise.all([getPendingFeedback(), getAllFeedbackForAdmin()]);
    setPending(p);
    setAllFeedback(all);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const handleModerate = async (id: string, action: 'approved' | 'rejected' | 'modified') => {
    const notes = actionNotes[id] || '';
    const edited = editedRemarks[id];
    const ok = await moderateFeedback(id, action, currentUser.name, notes, edited);
    showToast(ok ? `Remark ${action}` : 'Error moderating');
    setShowEditFor(null);
    loadData();
  };

  // Stats
  const approvedToday = allFeedback.filter(f =>
    f.moderation_status === 'approved' && f.moderated_at &&
    new Date(f.moderated_at).toDateString() === new Date().toDateString()
  ).length;
  const rejectedTotal = allFeedback.filter(f => f.moderation_status === 'rejected').length;

  // History (non-pending, already moderated)
  const history = allFeedback.filter(f => f.moderation_status !== 'pending' && f.moderated_by);
  const filteredHistory = historyFilter === 'all'
    ? history
    : history.filter(f => f.moderation_status === historyFilter);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 text-center`}>
          <Clock size={20} className="text-yellow-400 mx-auto mb-1" />
          <p className={`text-2xl font-bold ${theme.highlight}`}>{pending.length}</p>
          <p className={`text-[10px] ${theme.iconColor} font-bold uppercase`}>Pending</p>
        </div>
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 text-center`}>
          <CheckCircle size={20} className="text-emerald-400 mx-auto mb-1" />
          <p className={`text-2xl font-bold ${theme.highlight}`}>{approvedToday}</p>
          <p className={`text-[10px] ${theme.iconColor} font-bold uppercase`}>Approved Today</p>
        </div>
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 text-center`}>
          <XCircle size={20} className="text-red-400 mx-auto mb-1" />
          <p className={`text-2xl font-bold ${theme.highlight}`}>{rejectedTotal}</p>
          <p className={`text-[10px] ${theme.iconColor} font-bold uppercase`}>Rejected Total</p>
        </div>
      </div>

      {/* Pending Remarks */}
      <div>
        <h2 className={`text-lg font-bold ${theme.highlight} mb-3`}>Pending Remarks ({pending.length})</h2>
        {loading ? (
          <p className={`text-sm ${theme.iconColor}`}>Loading...</p>
        ) : pending.length === 0 ? (
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-8 text-center`}>
            <CheckCircle size={32} className="text-emerald-400 mx-auto mb-2" />
            <p className={`text-sm ${theme.iconColor}`}>All remarks are moderated. Nothing pending.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pending.map(item => (
              <div key={item.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
                {/* Header */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${theme.secondaryBg} ${theme.iconColor}`}>
                      {item.page}
                    </span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      item.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                      item.priority === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-slate-700 text-slate-400'
                    }`}>{item.priority}</span>
                    <span className="text-purple-400 text-[10px] font-bold">{item.feedback_type}</span>
                  </div>
                  <span className={`text-[10px] ${theme.iconColor}`}>
                    {item.created_at ? new Date(item.created_at).toLocaleDateString() : ''}
                  </span>
                </div>

                {/* Element + Visual Context */}
                {item.element_label && (
                  <p className={`text-[10px] ${theme.iconColor} mb-1`}>
                    On: <span className="text-purple-400">{item.element_label.slice(0, 60)}</span>
                  </p>
                )}
                {item.element_selector && (
                  <p className={`text-[9px] font-mono ${theme.iconColor} opacity-60 mb-1 truncate`} title={item.element_selector}>
                    <Crosshair size={9} className="inline mr-1" />{item.element_selector}
                  </p>
                )}

                {/* Position + Actions row */}
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  {item.click_x != null && item.click_y != null && (
                    <span className={`flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.5 rounded ${theme.secondaryBg} ${theme.iconColor}`}>
                      <MapPin size={9} />
                      ({item.click_x}, {item.click_y})
                      {item.viewport_width && item.viewport_height && (
                        <span className="opacity-60"> on {item.viewport_width}x{item.viewport_height}</span>
                      )}
                    </span>
                  )}
                  {item.id && (
                    <button
                      onClick={() => openScreenshot(item.id!)}
                      className={`flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-all`}
                    >
                      <Camera size={9} /> Screenshot
                    </button>
                  )}
                  <a
                    href={getDashboardUrl(item.page)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all`}
                  >
                    <ExternalLink size={9} /> Open Page
                  </a>
                </div>

                {/* Remark */}
                <p className={`text-sm ${theme.highlight} mb-2`}>{item.remark}</p>
                <p className={`text-[10px] ${theme.iconColor} mb-3`}>By: <span className="font-bold">{item.submitted_by}</span></p>

                {/* Edit area for "Approve with Notes" */}
                {showEditFor === item.id && (
                  <div className="mb-3 space-y-2">
                    <label className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>Edit Remark (optional)</label>
                    <textarea
                      value={editedRemarks[item.id!] ?? item.remark}
                      onChange={e => setEditedRemarks(p => ({ ...p, [item.id!]: e.target.value }))}
                      className={`w-full ${theme.secondaryBg} border ${theme.border} ${theme.highlight} text-xs rounded-xl p-2.5 outline-none focus:border-purple-500 resize-none`}
                      rows={2}
                    />
                    <label className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>Admin Notes</label>
                    <input
                      value={actionNotes[item.id!] || ''}
                      onChange={e => setActionNotes(p => ({ ...p, [item.id!]: e.target.value }))}
                      placeholder="Add a note..."
                      className={`w-full ${theme.secondaryBg} border ${theme.border} ${theme.highlight} text-xs rounded-xl px-2.5 py-2 outline-none focus:border-purple-500`}
                    />
                  </div>
                )}

                {/* Rejection reason */}
                {showEditFor === `reject-${item.id}` && (
                  <div className="mb-3">
                    <label className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>Rejection Reason</label>
                    <input
                      value={actionNotes[item.id!] || ''}
                      onChange={e => setActionNotes(p => ({ ...p, [item.id!]: e.target.value }))}
                      placeholder="Why are you rejecting this?"
                      className={`w-full ${theme.secondaryBg} border ${theme.border} ${theme.highlight} text-xs rounded-xl px-2.5 py-2 mt-1 outline-none focus:border-purple-500`}
                      autoFocus
                    />
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleModerate(item.id!, 'approved')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-all"
                  >
                    <Check size={12} /> Approve
                  </button>
                  {showEditFor === `reject-${item.id}` ? (
                    <button
                      onClick={() => handleModerate(item.id!, 'rejected')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
                    >
                      <X size={12} /> Confirm Reject
                    </button>
                  ) : (
                    <button
                      onClick={() => { setShowEditFor(`reject-${item.id}`); }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
                    >
                      <X size={12} /> Reject
                    </button>
                  )}
                  {showEditFor === item.id ? (
                    <button
                      onClick={() => handleModerate(item.id!, 'modified')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all"
                    >
                      <Check size={12} /> Save & Approve
                    </button>
                  ) : (
                    <button
                      onClick={() => { setShowEditFor(item.id!); setEditedRemarks(p => ({ ...p, [item.id!]: item.remark })); }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all"
                    >
                      <Pencil size={12} /> Approve with Notes
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* History */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className={`text-lg font-bold ${theme.highlight}`}>Moderation History</h2>
          <div className="flex gap-1">
            {(['all', 'approved', 'rejected', 'modified'] as const).map(f => (
              <button
                key={f}
                onClick={() => setHistoryFilter(f)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                  historyFilter === f ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.iconColor}`
                }`}
              >
                {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden`}>
          {filteredHistory.length === 0 ? (
            <div className="p-8 text-center"><p className={`text-sm ${theme.iconColor}`}>No moderated remarks yet.</p></div>
          ) : (
            <div className="divide-y" style={{ borderColor: 'inherit' }}>
              {filteredHistory.slice(0, 20).map(item => (
                <div key={item.id} className="px-4 py-3 flex items-start gap-3">
                  <div className="mt-0.5">
                    {item.moderation_status === 'approved' ? <CheckCircle size={14} className="text-emerald-400" /> :
                     item.moderation_status === 'rejected' ? <XCircle size={14} className="text-red-400" /> :
                     <Eye size={14} className="text-blue-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-[10px] font-bold ${theme.iconColor}`}>{item.page}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                        item.moderation_status === 'approved' ? 'bg-emerald-500/20 text-emerald-400' :
                        item.moderation_status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>{item.moderation_status}</span>
                      {item.click_x != null && (
                        <span className={`text-[9px] font-mono ${theme.iconColor} opacity-50`}>
                          ({item.click_x},{item.click_y})
                        </span>
                      )}
                      {item.id && (
                        <button onClick={() => openScreenshot(item.id!)} className="text-[9px] text-purple-400 hover:text-purple-300">
                          <Camera size={10} />
                        </button>
                      )}
                      <a href={getDashboardUrl(item.page)} target="_blank" rel="noopener noreferrer" className="text-[9px] text-blue-400 hover:text-blue-300">
                        <ExternalLink size={10} />
                      </a>
                    </div>
                    <p className={`text-xs ${theme.highlight} truncate`}>{item.remark}</p>
                    {item.admin_notes && <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>Note: {item.admin_notes}</p>}
                    <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>
                      By {item.submitted_by} · Moderated by {item.moderated_by}
                      {item.moderated_at ? ` · ${new Date(item.moderated_at).toLocaleDateString()}` : ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Screenshot Modal */}
      {screenshotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setScreenshotModal(null)}>
          <div className={`${theme.cardBg} border ${theme.border} rounded-2xl shadow-2xl w-full max-w-lg p-5`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-sm font-bold ${theme.highlight} flex items-center gap-2`}>
                <Camera size={16} className="text-purple-400" /> Remark Screenshot
              </h3>
              <button onClick={() => setScreenshotModal(null)} className={`${theme.iconColor} hover:text-red-400`}><X size={16} /></button>
            </div>
            {screenshotModal.loading ? (
              <div className="flex items-center justify-center py-12">
                <span className="w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
                <span className={`ml-2 text-sm ${theme.iconColor}`}>Loading screenshot...</span>
              </div>
            ) : screenshotModal.base64 ? (
              <img
                src={screenshotModal.base64}
                alt="Remark screenshot"
                className="w-full rounded-xl border border-slate-700"
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <Camera size={32} className={`${theme.iconColor} opacity-30 mb-2`} />
                <p className={`text-sm ${theme.iconColor}`}>No screenshot available</p>
                <p className={`text-[10px] ${theme.iconColor} opacity-60 mt-1`}>This remark was submitted before screenshot capture was added.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-purple-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <BlueprintLayout>
      <AdminPage />
    </BlueprintLayout>
  );
}
