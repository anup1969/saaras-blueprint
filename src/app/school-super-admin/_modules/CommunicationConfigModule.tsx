'use client';

import React, { useState } from 'react';
import { X, Plus, CheckCircle, Edit } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

export default function CommunicationConfigModule({ theme }: { theme: Theme }) {
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
  const templateChannels = ['SMS', 'Email', 'WhatsApp', 'Push'];
  const templateCategories = ['Fee Reminder', 'Attendance Alert', 'Circular', 'Welcome', 'Birthday', 'Emergency'];

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

      <SectionCard title="Message Templates" subtitle="SMS, Email, WhatsApp & Push notification templates with variable placeholders" theme={theme}>
        <div className="space-y-1.5">
          {msgTemplates.map((t, i) => (
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
          ))}
        </div>
        <button onClick={() => setMsgTemplates(p => [...p, { name: 'New Template', channel: 'SMS', category: 'Circular', status: 'Draft', text: '' }])}
          className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl mt-2`}>
          <Plus size={12} /> Add Template
        </button>
      </SectionCard>
    </div>
  );
}
