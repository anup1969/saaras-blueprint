'use client';

import React, { useState, useMemo } from 'react';
import { X, Plus, CheckCircle, Edit, Send, Users, Clock, BarChart3, ShieldCheck, Search, Download, Upload, Save, Check } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import { MasterPermissionGrid } from '@/components/shared';
import type { Theme } from '../_helpers/types';

const PAGE_SIZE = 5;

// ─── Reusable sub-components ───
function TableToolbar({ search, onSearch, count, total, theme }: { search: string; onSearch: (v: string) => void; count: number; total: number; theme: Theme }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className={`flex items-center gap-1.5 flex-1 px-3 py-1.5 rounded-xl border ${theme.border} ${theme.inputBg}`}>
        <Search size={12} className={theme.iconColor} />
        <input value={search} onChange={e => onSearch(e.target.value)} placeholder="Search..."
          className={`flex-1 bg-transparent text-xs ${theme.highlight} outline-none`} />
        {search && <button onClick={() => onSearch('')} className="text-gray-400 hover:text-gray-600"><X size={10} /></button>}
      </div>
      <span className={`text-[10px] font-bold px-2.5 py-1.5 rounded-xl ${theme.secondaryBg} ${theme.iconColor} border ${theme.border} whitespace-nowrap`}>
        {count} / {total}
      </span>
      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-all">
        <Download size={12} /> Export
      </button>
      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-all">
        <Upload size={12} /> Import
      </button>
    </div>
  );
}

function Pagination({ page, totalPages, onPage, theme }: { page: number; totalPages: number; onPage: (p: number) => void; theme: Theme }) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between mt-3">
      <p className={`text-[10px] ${theme.iconColor}`}>Page {page} of {totalPages}</p>
      <div className="flex items-center gap-1">
        <button disabled={page <= 1} onClick={() => onPage(page - 1)}
          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${theme.border} ${page <= 1 ? 'opacity-40 cursor-not-allowed' : `${theme.buttonHover} ${theme.highlight}`}`}>Prev</button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
          <button key={p} onClick={() => onPage(p)}
            className={`w-6 h-6 rounded-lg text-[10px] font-bold ${p === page ? `${theme.primary} text-white` : `${theme.buttonHover} ${theme.highlight}`}`}>{p}</button>
        ))}
        <button disabled={page >= totalPages} onClick={() => onPage(page + 1)}
          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${theme.border} ${page >= totalPages ? 'opacity-40 cursor-not-allowed' : `${theme.buttonHover} ${theme.highlight}`}`}>Next</button>
      </div>
    </div>
  );
}

type TabId = 'messaging' | 'content' | 'notifications' | 'settings';

export default function CommunicationConfigModule({ theme, activeTab: externalTab, onTabChange }: { theme: Theme; activeTab?: string; onTabChange?: (tab: string) => void }) {
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

  // ─── Auto-Created Groups (full master table) ───
  const [autoGroups, setAutoGroups] = useState([
    { name: 'Class-wise Parent Groups (auto per section)', type: 'Class', enabled: true },
    { name: 'Subject Teacher Groups', type: 'Subject', enabled: true },
    { name: 'Staff Announcements', type: 'Staff', enabled: true },
    { name: 'Transport Route Groups', type: 'Transport', enabled: true },
    { name: 'PTA Group', type: 'Committee', enabled: true },
    { name: 'Management Group', type: 'Admin', enabled: true },
  ]);
  const [autoGroupSearch, setAutoGroupSearch] = useState('');
  const [autoGroupPage, setAutoGroupPage] = useState(1);
  const [newAutoGroup, setNewAutoGroup] = useState('');
  const [newAutoGroupType, setNewAutoGroupType] = useState('Class');
  const [editingAutoGroupIdx, setEditingAutoGroupIdx] = useState<number | null>(null);
  const [editingAutoGroupName, setEditingAutoGroupName] = useState('');
  const [editingAutoGroupType, setEditingAutoGroupType] = useState('');

  const autoGroupTypes = ['Class', 'Subject', 'Staff', 'Transport', 'Committee', 'Admin', 'Custom'];

  const filteredAutoGroups = useMemo(() => autoGroups.filter(g => g.name.toLowerCase().includes(autoGroupSearch.toLowerCase()) || g.type.toLowerCase().includes(autoGroupSearch.toLowerCase())), [autoGroups, autoGroupSearch]);
  const autoGroupTotalPages = Math.max(1, Math.ceil(filteredAutoGroups.length / PAGE_SIZE));
  const pagedAutoGroups = filteredAutoGroups.slice((autoGroupPage - 1) * PAGE_SIZE, autoGroupPage * PAGE_SIZE);

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

  // Gallery allowed formats — controlled state (was defaultChecked)
  const [galleryFormats, setGalleryFormats] = useState<Record<string, boolean>>({
    JPG: true,
    PNG: true,
    MP4: true,
    YouTube: true,
  });

  // ─── Message Templates (keep expand-to-edit, add pagination) ───
  const [msgTemplates, setMsgTemplates] = useState([
    { name: 'Fee Reminder SMS', channel: 'SMS', category: 'Fee Reminder', status: 'Active', text: 'Dear {{parent_name}}, fee of \u20B9{{amount}} for {{student_name}} (Class {{class}}) is due on {{due_date}}. Pay online: {{link}}' },
    { name: 'Absent Alert SMS', channel: 'SMS', category: 'Attendance Alert', status: 'Active', text: 'Dear {{parent_name}}, {{student_name}} is marked absent today ({{date}}). Contact school for details.' },
    { name: 'Welcome Email', channel: 'Email', category: 'Welcome', status: 'Active', text: 'Welcome to {{school_name}}! Your child {{student_name}} has been admitted to Class {{class}}.' },
    { name: 'Birthday Wish', channel: 'WhatsApp', category: 'Birthday', status: 'Active', text: 'Happy Birthday, {{student_name}}! Wishing you a wonderful year ahead. - {{school_name}}' },
    { name: 'Emergency Alert', channel: 'SMS', category: 'Emergency', status: 'Active', text: 'URGENT: {{message}} - {{school_name}}. Please contact {{contact}} immediately.' },
    { name: 'Fee Receipt', channel: 'Email', category: 'Fee Reminder', status: 'Active', text: 'Receipt No: {{receipt_no}}. Payment of \u20B9{{amount}} received for {{student_name}} on {{date}}.' },
    { name: 'PTM Reminder', channel: 'Push', category: 'Circular', status: 'Active', text: 'Reminder: PTM scheduled on {{date}} at {{time}} for {{student_name}} (Class {{class}}).' },
    { name: 'Circular', channel: 'Email', category: 'Circular', status: 'Draft', text: 'New circular: {{title}}. {{message}} - {{school_name}}' },
  ]);
  const [editingTemplate, setEditingTemplate] = useState<number | null>(null);
  const [templateSearch, setTemplateSearch] = useState('');
  const [templatePage, setTemplatePage] = useState(1);
  const templateChannels = ['SMS', 'Email', 'WhatsApp', 'Push'];
  const templateCategories = ['Fee Reminder', 'Attendance Alert', 'Circular', 'Welcome', 'Birthday', 'Emergency'];

  const filteredTemplates = useMemo(() => msgTemplates.filter(t =>
    t.name.toLowerCase().includes(templateSearch.toLowerCase()) ||
    t.channel.toLowerCase().includes(templateSearch.toLowerCase()) ||
    t.category.toLowerCase().includes(templateSearch.toLowerCase())
  ), [msgTemplates, templateSearch]);
  const templateTotalPages = Math.max(1, Math.ceil(filteredTemplates.length / PAGE_SIZE));
  const pagedTemplates = filteredTemplates.slice((templatePage - 1) * PAGE_SIZE, templatePage * PAGE_SIZE);

  // Gap 17: Auto-Archive Announcements
  const [autoArchive, setAutoArchive] = useState(true);
  const [archiveDays, setArchiveDays] = useState('7');
  const [notifySender, setNotifySender] = useState(true);

  // Gallery & Media Settings
  const [galleryStorageQuota, setGalleryStorageQuota] = useState('10');
  const [galleryMaxFileSize, setGalleryMaxFileSize] = useState('10');
  const [galleryCompress, setGalleryCompress] = useState(true);
  const [galleryAutoApprove, setGalleryAutoApprove] = useState(false);
  const [galleryAiTag, setGalleryAiTag] = useState(false);
  const [galleryDisplayLocations, setGalleryDisplayLocations] = useState('Main Hall, Lobby, Corridor, Cafeteria');
  const [galleryDefaultDuration, setGalleryDefaultDuration] = useState('7');

  // News Publishing Settings
  const [newsApprovalRequired, setNewsApprovalRequired] = useState(true);
  const [newsDefaultAudience, setNewsDefaultAudience] = useState('All');
  const [newsAutoArchiveDays, setNewsAutoArchiveDays] = useState('30');
  const [newsNotifPush, setNewsNotifPush] = useState(true);
  const [newsNotifSms, setNewsNotifSms] = useState(false);
  const [newsNotifEmail, setNewsNotifEmail] = useState(false);
  const [newsFeaturedLimit, setNewsFeaturedLimit] = useState('3');
  const [newsEngagementTracking, setNewsEngagementTracking] = useState(true);

  // Notification Center Settings
  const [notifMaxPerDay, setNotifMaxPerDay] = useState('10');
  const [notifQuietStart, setNotifQuietStart] = useState('21:00');
  const [notifQuietEnd, setNotifQuietEnd] = useState('07:00');
  const [notifRetention, setNotifRetention] = useState('90 days');
  const [notifCriticalBypass, setNotifCriticalBypass] = useState(true);
  const [notifAutoReport, setNotifAutoReport] = useState(true);

  // Bulk Communication Settings
  const [bulkEmailEnabled, setBulkEmailEnabled] = useState(true);
  const [bulkEmailMaxRecipients, setBulkEmailMaxRecipients] = useState('500');
  const [bulkSmsEnabled, setBulkSmsEnabled] = useState(true);
  const [bulkSmsMaxRecipients, setBulkSmsMaxRecipients] = useState('500');
  const [bulkWhatsappEnabled, setBulkWhatsappEnabled] = useState(false);
  const [bulkWhatsappMaxRecipients, setBulkWhatsappMaxRecipients] = useState('250');
  const [bulkRateLimit, setBulkRateLimit] = useState('50');
  const [bulkScheduleEnabled, setBulkScheduleEnabled] = useState(true);
  const [bulkDeliveryTracking, setBulkDeliveryTracking] = useState(true);
  const [bulkBounceHandling, setBulkBounceHandling] = useState(true);
  const [bulkOptOutManagement, setBulkOptOutManagement] = useState(true);
  const [bulkRecipientGroups, setBulkRecipientGroups] = useState<Record<string, boolean>>({
    'All Parents': true,
    'All Staff': true,
    'Class-wise': true,
    'Section-wise': true,
    'Custom List': false,
  });

  // Save feedback
  const [saved, setSaved] = useState(false);

  // Tab state
  const [internalTab, setInternalTab] = useState<TabId>('messaging');
  const activeTab = (externalTab as TabId) || internalTab;
  const setActiveTab = (tab: TabId) => { if (onTabChange) onTabChange(tab); else setInternalTab(tab); };

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="space-y-4">
      <ModuleHeader title="Communication Configuration" subtitle="DM permissions, group rules, storage limits, and file sharing" theme={theme} />

      {activeTab === 'messaging' && (<div className="space-y-4">
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

      {/* ─── Auto-Created Groups (full master table with Type column) ─── */}
      <SectionCard title="Default Auto-created Groups" subtitle="Groups auto-created by the system — manage, enable/disable, or add new ones" theme={theme}>
        <TableToolbar search={autoGroupSearch} onSearch={v => { setAutoGroupSearch(v); setAutoGroupPage(1); }} count={filteredAutoGroups.length} total={autoGroups.length} theme={theme} />

        <div className={`rounded-xl border ${theme.border} overflow-hidden mb-3`}>
          <table className="w-full text-xs">
            <thead className={theme.secondaryBg}>
              <tr>
                {['Group Name', 'Type', 'Enabled', 'Actions'].map(h => (
                  <th key={h} className={`text-left px-3 py-2.5 font-bold ${theme.iconColor} text-[10px] uppercase`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pagedAutoGroups.map((g) => {
                const realIdx = autoGroups.findIndex(x => x.name === g.name);
                return (
                  <tr key={realIdx} className={`border-t ${theme.border}`}>
                    <td className="px-3 py-2.5">
                      {editingAutoGroupIdx === realIdx ? (
                        <input value={editingAutoGroupName} onChange={e => setEditingAutoGroupName(e.target.value)} autoFocus
                          className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <CheckCircle size={10} className={g.enabled ? 'text-emerald-500' : 'text-slate-300'} />
                          <span className={`text-xs font-medium ${theme.highlight}`}>{g.name}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-2.5">
                      {editingAutoGroupIdx === realIdx ? (
                        <select value={editingAutoGroupType} onChange={e => setEditingAutoGroupType(e.target.value)}
                          className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}>
                          {autoGroupTypes.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      ) : (
                        <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${theme.accentBg} ${theme.iconColor}`}>{g.type}</span>
                      )}
                    </td>
                    <td className="px-3 py-2.5">
                      <SSAToggle on={g.enabled} onChange={() => setAutoGroups(p => p.map((x, j) => j === realIdx ? { ...x, enabled: !x.enabled } : x))} theme={theme} />
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        {editingAutoGroupIdx === realIdx ? (
                          <>
                            <button onClick={() => {
                              if (editingAutoGroupName.trim()) {
                                setAutoGroups(p => p.map((x, j) => j === realIdx ? { ...x, name: editingAutoGroupName.trim(), type: editingAutoGroupType } : x));
                              }
                              setEditingAutoGroupIdx(null);
                            }} className="text-[10px] font-bold text-emerald-600 hover:text-emerald-800 px-2 py-1 rounded-lg hover:bg-emerald-50 transition-all">Save</button>
                            <button onClick={() => setEditingAutoGroupIdx(null)}
                              className={`text-[10px] font-bold ${theme.iconColor} hover:opacity-70 px-2 py-1 rounded-lg transition-all`}>Cancel</button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => { setEditingAutoGroupIdx(realIdx); setEditingAutoGroupName(g.name); setEditingAutoGroupType(g.type); }}
                              className={`text-[10px] font-bold ${theme.iconColor} hover:opacity-70 px-2 py-1 rounded-lg ${theme.secondaryBg} transition-all`}><Edit size={11} /></button>
                            <button onClick={() => setAutoGroups(p => p.filter((_, j) => j !== realIdx))}
                              className="text-[10px] font-bold text-red-400 hover:text-red-600 px-1 py-1 rounded-lg transition-all"><X size={11} /></button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {pagedAutoGroups.length === 0 && (
                <tr><td colSpan={4} className={`px-3 py-4 text-center text-xs ${theme.iconColor}`}>No groups found</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination page={autoGroupPage} totalPages={autoGroupTotalPages} onPage={setAutoGroupPage} theme={theme} />

        {/* Add new group row */}
        <div className="flex gap-2 mt-3">
          <input value={newAutoGroup} onChange={e => setNewAutoGroup(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && newAutoGroup.trim()) {
                setAutoGroups(p => [...p, { name: newAutoGroup.trim(), type: newAutoGroupType, enabled: true }]);
                setNewAutoGroup('');
              }
            }}
            placeholder="Add new auto-group name..."
            className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
          <select value={newAutoGroupType} onChange={e => setNewAutoGroupType(e.target.value)}
            className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}>
            {autoGroupTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <button onClick={() => {
            if (newAutoGroup.trim()) {
              setAutoGroups(p => [...p, { name: newAutoGroup.trim(), type: newAutoGroupType, enabled: true }]);
              setNewAutoGroup('');
            }
          }} className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={14} /></button>
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
      </div>)}

      {activeTab === 'content' && (<div className="space-y-4">
      {/* ─── Message Templates (keep expand-to-edit, with search, count, export/import, pagination) ─── */}
      <SectionCard title="Message Templates" subtitle="SMS, Email, WhatsApp & Push notification templates with variable placeholders" theme={theme}>
        <TableToolbar search={templateSearch} onSearch={v => { setTemplateSearch(v); setTemplatePage(1); }} count={filteredTemplates.length} total={msgTemplates.length} theme={theme} />

        <div className="space-y-1.5">
          {pagedTemplates.map((t) => {
            const i = msgTemplates.findIndex(x => x.name === t.name && x.channel === t.channel && x.text === t.text);
            return (
              <div key={i} className={`p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold ${theme.highlight} flex-1`}>{t.name}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                    t.channel === 'SMS' ? 'bg-blue-100 text-blue-700' : t.channel === 'Email' ? 'bg-purple-100 text-purple-700' :
                    t.channel === 'WhatsApp' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>{t.channel}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${theme.accentBg} ${theme.iconColor} font-bold`}>{t.category}</span>
                  <select value={t.status} onChange={e => { const n = [...msgTemplates]; n[i] = { ...n[i], status: e.target.value }; setMsgTemplates(n); }}
                    className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold border-0 outline-none ${t.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                    <option value="Active">Active</option><option value="Draft">Draft</option>
                  </select>
                  <button onClick={() => setEditingTemplate(editingTemplate === i ? null : i)}
                    className={`text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-2 py-1 rounded-lg`}><Edit size={12} /></button>
                  <button onClick={() => setMsgTemplates(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={12} /></button>
                </div>
                {editingTemplate === i && (
                  <div className="mt-2 space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                      <input value={t.name} onChange={e => { const n = [...msgTemplates]; n[i] = { ...n[i], name: e.target.value }; setMsgTemplates(n); }}
                        placeholder="Template Name" className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                      <select value={t.channel} onChange={e => { const n = [...msgTemplates]; n[i] = { ...n[i], channel: e.target.value }; setMsgTemplates(n); }}
                        className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                        {templateChannels.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <select value={t.category} onChange={e => { const n = [...msgTemplates]; n[i] = { ...n[i], category: e.target.value }; setMsgTemplates(n); }}
                        className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                        {templateCategories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <textarea value={t.text} onChange={e => { const n = [...msgTemplates]; n[i] = { ...n[i], text: e.target.value }; setMsgTemplates(n); }}
                      rows={3} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none resize-none`} />
                    <p className={`text-[9px] ${theme.iconColor}`}>Variables: {'{{parent_name}} {{student_name}} {{class}} {{amount}} {{date}} {{due_date}} {{school_name}} {{link}} {{message}} {{contact}} {{receipt_no}} {{time}} {{title}}'}</p>
                  </div>
                )}
              </div>
            );
          })}
          {pagedTemplates.length === 0 && (
            <p className={`text-center text-xs ${theme.iconColor} py-4`}>No templates found</p>
          )}
        </div>
        <Pagination page={templatePage} totalPages={templateTotalPages} onPage={setTemplatePage} theme={theme} />
        <button onClick={() => setMsgTemplates(p => [...p, { name: 'New Template', channel: 'SMS', category: 'Circular', status: 'Draft', text: '' }])}
          className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl mt-3`}>
          <Plus size={12} /> Add Template
        </button>
      </SectionCard>

      <SectionCard title="Announcement Lifecycle" subtitle="Auto-manage announcement visibility and archival" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Auto-archive announcements after expiry</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Expired announcements are automatically moved to archive and hidden from all dashboards</p>
            </div>
            <SSAToggle on={autoArchive} onChange={() => setAutoArchive(!autoArchive)} theme={theme} />
          </div>
          {autoArchive && (
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Archive after X days</p>
              <InputField value={archiveDays} onChange={setArchiveDays} theme={theme} type="number" placeholder="7" />
            </div>
          )}
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Notify sender before archiving</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Send a notification to the announcement creator 24 hours before auto-archival</p>
            </div>
            <SSAToggle on={notifySender} onChange={() => setNotifySender(!notifySender)} theme={theme} />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Gallery & Media Settings" subtitle="Photo albums, video gallery, and digital notice board configuration" theme={theme}>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Storage Quota (GB)</p>
              <InputField value={galleryStorageQuota} onChange={setGalleryStorageQuota} theme={theme} type="number" placeholder="10" />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max File Size (MB)</p>
              <InputField value={galleryMaxFileSize} onChange={setGalleryMaxFileSize} theme={theme} type="number" placeholder="10" />
            </div>
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Image Compression</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Automatically compress uploaded images to save storage</p>
            </div>
            <SSAToggle on={galleryCompress} onChange={() => setGalleryCompress(!galleryCompress)} theme={theme} />
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Allowed Formats</p>
            <div className="flex gap-3">
              {(Object.keys(galleryFormats) as string[]).map(fmt => (
                <label key={fmt} className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    className="accent-slate-600"
                    checked={galleryFormats[fmt]}
                    onChange={() => setGalleryFormats(p => ({ ...p, [fmt]: !p[fmt] }))}
                  />
                  <span className={`text-xs ${theme.iconColor}`}>{fmt}</span>
                </label>
              ))}
            </div>
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Auto-approve Teacher Uploads</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Teacher-uploaded albums go live without admin approval</p>
            </div>
            <SSAToggle on={galleryAutoApprove} onChange={() => setGalleryAutoApprove(!galleryAutoApprove)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>AI Auto-tagging</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Automatically tag photos by faces and objects (future feature)</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-700">Coming Soon</span>
              <SSAToggle on={galleryAiTag} onChange={() => setGalleryAiTag(!galleryAiTag)} theme={theme} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Display Locations (Digital Notice Board)</p>
              <InputField value={galleryDisplayLocations} onChange={setGalleryDisplayLocations} theme={theme} placeholder="Main Hall, Lobby, Corridor, Cafeteria" />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Default Display Duration (days)</p>
              <InputField value={galleryDefaultDuration} onChange={setGalleryDefaultDuration} theme={theme} type="number" placeholder="7" />
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="News Publishing Settings" subtitle="Configure news article publishing and distribution" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Approval Required for Teacher-authored News</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Articles by teachers need admin/principal approval before publishing</p>
            </div>
            <SSAToggle on={newsApprovalRequired} onChange={() => setNewsApprovalRequired(!newsApprovalRequired)} theme={theme} />
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Default Audience</p>
            <SelectField options={['All', 'Students', 'Parents', 'Staff']} value={newsDefaultAudience} onChange={setNewsDefaultAudience} theme={theme} />
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Auto-archive after (days)</p>
            <InputField value={newsAutoArchiveDays} onChange={setNewsAutoArchiveDays} theme={theme} type="number" placeholder="30" />
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Notification Channels on Publish</p>
            <div className="space-y-2">
              {[
                { label: 'Push notification', state: newsNotifPush, toggle: () => setNewsNotifPush(!newsNotifPush) },
                { label: 'SMS', state: newsNotifSms, toggle: () => setNewsNotifSms(!newsNotifSms) },
                { label: 'Email', state: newsNotifEmail, toggle: () => setNewsNotifEmail(!newsNotifEmail) },
              ].map(ch => (
                <div key={ch.label} className={`flex items-center justify-between p-2 rounded-xl ${theme.secondaryBg}`}>
                  <span className={`text-xs font-bold ${theme.highlight}`}>{ch.label}</span>
                  <SSAToggle on={ch.state} onChange={ch.toggle} theme={theme} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Featured Article Limit</p>
            <InputField value={newsFeaturedLimit} onChange={setNewsFeaturedLimit} theme={theme} type="number" placeholder="3" />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Engagement Tracking</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Track views, read time, and clicks on news articles</p>
            </div>
            <SSAToggle on={newsEngagementTracking} onChange={() => setNewsEngagementTracking(!newsEngagementTracking)} theme={theme} />
          </div>
        </div>
      </SectionCard>
      </div>)}

      {activeTab === 'notifications' && (<div className="space-y-4">
      <SectionCard title="Notification Center Settings" subtitle="Global notification delivery and channel configuration" theme={theme}>
        <div className="space-y-3">
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max Notifications per User per Day</p>
            <InputField value={notifMaxPerDay} onChange={setNotifMaxPerDay} theme={theme} type="number" placeholder="10" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Quiet Hours Start</p>
              <InputField value={notifQuietStart} onChange={setNotifQuietStart} theme={theme} type="time" />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Quiet Hours End</p>
              <InputField value={notifQuietEnd} onChange={setNotifQuietEnd} theme={theme} type="time" />
            </div>
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Channel Priority Order</p>
            <div className="space-y-1.5">
              {['1. Push Notification', '2. SMS', '3. Email'].map((ch) => (
                <div key={ch} className={`flex items-center gap-2 p-2 rounded-xl ${theme.secondaryBg}`}>
                  <span className={`text-xs font-bold ${theme.primaryText}`}>{ch}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Notification Retention Period</p>
            <SelectField options={['30 days', '60 days', '90 days', '180 days']} value={notifRetention} onChange={setNotifRetention} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Critical Notifications Bypass Quiet Hours</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Emergency and critical priority notifications ignore quiet hours</p>
            </div>
            <SSAToggle on={notifCriticalBypass} onChange={() => setNotifCriticalBypass(!notifCriticalBypass)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Delivery Report Auto-generation</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Automatically generate delivery reports after each batch notification</p>
            </div>
            <SSAToggle on={notifAutoReport} onChange={() => setNotifAutoReport(!notifAutoReport)} theme={theme} />
          </div>
        </div>
      </SectionCard>
      </div>)}

      {activeTab === 'settings' && (<div className="space-y-4">
      <SectionCard title="Role-Based Permissions" subtitle="Control who can view, create, edit, delete, import, and export" theme={theme}>
        <div className="space-y-4">
          <MasterPermissionGrid masterName="Communication Templates" roles={['Super Admin', 'Principal', 'School Admin', 'Teacher', 'Accountant']} theme={theme} />
        </div>
      </SectionCard>

      {/* ─── Bulk Communication (Gap Feature) ─── */}
      <SectionCard title="Bulk Communication" subtitle="Configure mass messaging via Email, SMS, and WhatsApp channels" theme={theme}>
        <div className="space-y-3">
          {/* Channel toggles with max recipients */}
          <div className="space-y-2">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}><Send size={12} className="inline mr-1" />Bulk Email Sending</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Send bulk emails to selected recipient groups</p>
              </div>
              <SSAToggle on={bulkEmailEnabled} onChange={() => setBulkEmailEnabled(!bulkEmailEnabled)} theme={theme} />
            </div>
            {bulkEmailEnabled && (
              <div className="ml-4">
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max Recipients per Batch</p>
                <SelectField options={['100', '500', '1000', 'All']} value={bulkEmailMaxRecipients} onChange={setBulkEmailMaxRecipients} theme={theme} />
              </div>
            )}

            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}><Send size={12} className="inline mr-1" />Bulk SMS Sending</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Send bulk SMS messages to parents and staff</p>
              </div>
              <SSAToggle on={bulkSmsEnabled} onChange={() => setBulkSmsEnabled(!bulkSmsEnabled)} theme={theme} />
            </div>
            {bulkSmsEnabled && (
              <div className="ml-4">
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max Recipients per Batch</p>
                <SelectField options={['100', '500', '1000', 'All']} value={bulkSmsMaxRecipients} onChange={setBulkSmsMaxRecipients} theme={theme} />
              </div>
            )}

            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}><Send size={12} className="inline mr-1" />Bulk WhatsApp</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Send bulk WhatsApp messages via approved templates</p>
              </div>
              <SSAToggle on={bulkWhatsappEnabled} onChange={() => setBulkWhatsappEnabled(!bulkWhatsappEnabled)} theme={theme} />
            </div>
            {bulkWhatsappEnabled && (
              <div className="ml-4">
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max Recipients per Batch</p>
                <SelectField options={['100', '250', '500']} value={bulkWhatsappMaxRecipients} onChange={setBulkWhatsappMaxRecipients} theme={theme} />
              </div>
            )}
          </div>

          {/* Rate Limiting */}
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}><Clock size={10} className="inline mr-1" />Rate Limiting (Messages per Minute)</p>
            <SelectField options={['10', '50', '100']} value={bulkRateLimit} onChange={setBulkRateLimit} theme={theme} />
          </div>

          {/* Scheduling */}
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}><Clock size={12} className="inline mr-1" />Allow Scheduled Bulk Messages</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Schedule bulk messages for future delivery at a specific date and time</p>
            </div>
            <SSAToggle on={bulkScheduleEnabled} onChange={() => setBulkScheduleEnabled(!bulkScheduleEnabled)} theme={theme} />
          </div>

          {/* Recipient Groups */}
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}><Users size={10} className="inline mr-1" />Recipient Groups</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(bulkRecipientGroups).map(([group, enabled]) => (
                <div key={group} className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border ${enabled ? 'border-emerald-300 bg-emerald-50' : `${theme.border} ${theme.cardBg}`}`}>
                  <span className={`text-[10px] font-medium ${enabled ? 'text-emerald-700' : theme.iconColor}`}>{group}</span>
                  <SSAToggle on={enabled} onChange={() => setBulkRecipientGroups(p => ({ ...p, [group]: !p[group] }))} theme={theme} />
                </div>
              ))}
            </div>
          </div>

          {/* Tracking & Management */}
          <div className="space-y-2">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}><BarChart3 size={12} className="inline mr-1" />Delivery Tracking</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Track sent, delivered, opened, and failed message counts</p>
              </div>
              <SSAToggle on={bulkDeliveryTracking} onChange={() => setBulkDeliveryTracking(!bulkDeliveryTracking)} theme={theme} />
            </div>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}><ShieldCheck size={12} className="inline mr-1" />Bounce Handling</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Auto-remove invalid email addresses and phone numbers after bounces</p>
              </div>
              <SSAToggle on={bulkBounceHandling} onChange={() => setBulkBounceHandling(!bulkBounceHandling)} theme={theme} />
            </div>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}><ShieldCheck size={12} className="inline mr-1" />Opt-out Management</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Respect unsubscribe requests and maintain opt-out lists automatically</p>
              </div>
              <SSAToggle on={bulkOptOutManagement} onChange={() => setBulkOptOutManagement(!bulkOptOutManagement)} theme={theme} />
            </div>
          </div>
        </div>
      </SectionCard>
      </div>)}

      {/* ─── Global Save Button ─── */}
      <div className="flex justify-end pt-2 pb-4">
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all ${saved ? 'bg-emerald-500 hover:bg-emerald-600' : `${theme.primary} hover:opacity-90`}`}
        >
          {saved ? <><Check size={15} /> Saved</> : <><Save size={15} /> Save Communication Config</>}
        </button>
      </div>
    </div>
  );
}
