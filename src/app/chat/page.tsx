'use client';

import React, { useState } from 'react';
import BlueprintLayout from '@/components/BlueprintLayout';
import { StatCard, TabBar, StatusBadge, SearchBar, DataTable, Toggle } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  MessageSquare, Users, Megaphone, CheckSquare, Send, Search, Plus, Settings,
  Phone, Video, Paperclip, Image, Smile, MoreVertical, Check, CheckCheck,
  Circle, Clock, Star, Pin, Archive, Trash2, Bell, BellOff, ChevronDown,
  UserPlus, Hash, Lock, Globe, BarChart3, Vote, FileText, Download,
  Camera, Mic, X, Edit, Reply, Forward, Copy, ArrowRight, Filter,
  MessageCircle, Shield, Eye, Briefcase, GraduationCap, BookOpen, User as UserIcon
} from 'lucide-react';

// ─── MOCK DATA ────────────────────────────────────────

// Contacts / People
const contacts = [
  { id: 'u1', name: 'Priya Sharma', role: 'PGT Mathematics', dept: 'Teaching', avatar: 'PS', online: true, lastSeen: 'Online' },
  { id: 'u2', name: 'Rajesh Kumar', role: 'TGT Science', dept: 'Teaching', avatar: 'RK', online: true, lastSeen: 'Online' },
  { id: 'u3', name: 'Dr. Meena Iyer', role: 'Vice Principal', dept: 'Admin', avatar: 'MI', online: false, lastSeen: '10 min ago' },
  { id: 'u4', name: 'Sunita Patel', role: 'Office Assistant', dept: 'Admin', avatar: 'SP', online: false, lastSeen: '1 hour ago' },
  { id: 'u5', name: 'Kavitha Nair', role: 'PRT English', dept: 'Teaching', avatar: 'KN', online: true, lastSeen: 'Online' },
  { id: 'u6', name: 'Arun Verma', role: 'HOD Science', dept: 'Teaching', avatar: 'AV', online: false, lastSeen: '30 min ago' },
  { id: 'u7', name: 'Mohammed Irfan', role: 'Transport Head', dept: 'Transport', avatar: 'MI', online: true, lastSeen: 'Online' },
  { id: 'u8', name: 'Deepak Verma', role: 'Security Head', dept: 'Security', avatar: 'DV', online: true, lastSeen: 'Online' },
];

// Conversations
const conversations = [
  { id: 'c1', type: 'dm', name: 'Priya Sharma', avatar: 'PS', lastMsg: 'Class 10-A test papers are ready for review', time: '2 min', unread: 2, online: true, pinned: true },
  { id: 'c2', type: 'group', name: 'All Teaching Staff', avatar: '48', lastMsg: 'Principal: Staff meeting tomorrow at 3 PM in conference room', time: '15 min', unread: 5, members: 48, icon: Users },
  { id: 'c3', type: 'dm', name: 'Dr. Meena Iyer', avatar: 'MI', lastMsg: 'Substitution schedule updated for tomorrow', time: '30 min', unread: 0, online: false },
  { id: 'c4', type: 'group', name: 'Class 10-A Teachers', avatar: '8', lastMsg: 'Kavitha: Aarav Patel missed 3 assignments this week', time: '1 hr', unread: 3, members: 8, icon: BookOpen },
  { id: 'c5', type: 'group', name: 'Science Department', avatar: '10', lastMsg: 'Lab equipment order confirmed. Delivery by Friday', time: '2 hr', unread: 0, members: 10, icon: Hash },
  { id: 'c6', type: 'dm', name: 'Rajesh Patel (Parent)', avatar: 'RP', lastMsg: 'Thank you for the update on Aarav\'s progress', time: '3 hr', unread: 0, online: false, isParent: true },
  { id: 'c7', type: 'group', name: '10-A Parents', avatar: '42', lastMsg: 'You: Pre-board exam schedule has been shared', time: '5 hr', unread: 0, members: 42, icon: Users, isParent: true },
  { id: 'c8', type: 'dm', name: 'Mohammed Irfan', avatar: 'MI', lastMsg: 'Bus Route 3 will be delayed 15 min tomorrow', time: 'Yesterday', unread: 0, online: true },
  { id: 'c9', type: 'group', name: 'Annual Day Committee', avatar: '12', lastMsg: 'Budget approved! Let\'s finalize the program list', time: 'Yesterday', unread: 0, members: 12, icon: Star },
  { id: 'c10', type: 'group', name: 'Non-Teaching Staff', avatar: '38', lastMsg: 'Admin: Salary slips for January available in HR portal', time: '2 days', unread: 0, members: 38, icon: Briefcase },
];

// Messages for active conversation
const sampleMessages = [
  { id: 'm1', sender: 'Priya Sharma', avatar: 'PS', text: 'Good morning! I\'ve prepared the Class 10-A Unit Test 3 question paper for Mathematics.', time: '9:15 AM', status: 'read', type: 'text' },
  { id: 'm2', sender: 'You', avatar: 'You', text: 'Great! Can you share it for review?', time: '9:18 AM', status: 'read', type: 'text', self: true },
  { id: 'm3', sender: 'Priya Sharma', avatar: 'PS', text: '', time: '9:20 AM', status: 'read', type: 'file', fileName: 'Class10A_UT3_Maths.pdf', fileSize: '245 KB' },
  { id: 'm4', sender: 'You', avatar: 'You', text: 'Looks good. Two suggestions:\n1. Add more MCQs in Section A\n2. Increase marks for the geometry section', time: '9:45 AM', status: 'read', type: 'text', self: true },
  { id: 'm5', sender: 'Priya Sharma', avatar: 'PS', text: 'Sure, I\'ll update and share the revised version by lunch.', time: '9:47 AM', status: 'read', type: 'text' },
  { id: 'm6', sender: 'Priya Sharma', avatar: 'PS', text: 'Also, 3 students from 10-A haven\'t submitted their homework for Chapter 12. Should I send a reminder to parents?', time: '10:30 AM', status: 'read', type: 'text' },
  { id: 'm7', sender: 'You', avatar: 'You', text: 'Yes, please send it via the parent group. Mark it as important.', time: '10:35 AM', status: 'delivered', type: 'text', self: true },
  { id: 'm8', sender: 'Priya Sharma', avatar: 'PS', text: 'Class 10-A test papers are ready for review', time: '11:02 AM', status: 'delivered', type: 'text' },
];

// Tasks from chat
const chatTasks = [
  { id: 't1', title: 'Review Class 10-A UT3 Maths paper', assignedBy: 'Priya Sharma', assignedTo: 'You', due: 'Today, 3 PM', priority: 'High', status: 'In Progress', from: 'DM' },
  { id: 't2', title: 'Submit attendance report for January', assignedBy: 'Principal', assignedTo: 'You', due: 'Tomorrow', priority: 'Urgent', status: 'Pending', from: 'All Teaching Staff' },
  { id: 't3', title: 'Prepare Annual Day program list', assignedBy: 'Dr. Meena Iyer', assignedTo: 'Annual Day Committee', due: 'Feb 20', priority: 'Normal', status: 'Pending', from: 'Annual Day Committee' },
  { id: 't4', title: 'Update student profiles for 10-A', assignedBy: 'You', assignedTo: 'Kavitha Nair', due: 'Feb 15', priority: 'Normal', status: 'Done', from: 'Class 10-A Teachers' },
  { id: 't5', title: 'Send parent reminders for fee payment', assignedBy: 'Accounts Head', assignedTo: 'Class Teachers', due: 'Feb 12', priority: 'High', status: 'Pending', from: 'Broadcast' },
];

// Broadcasts
const broadcasts = [
  { id: 'b1', from: 'Principal', title: 'Staff Meeting - Tomorrow 3 PM', audience: 'All Staff', time: '15 min ago', priority: 'Important', readCount: 32, totalCount: 86 },
  { id: 'b2', from: 'Admin', title: 'Republic Day Celebration - Schedule', audience: 'All Staff + Parents', time: '2 hours ago', priority: 'Normal', readCount: 450, totalCount: 1200 },
  { id: 'b3', from: 'Transport Head', title: 'Bus Route 5 Diverted Due to Road Work', audience: 'Route 5 Parents', time: '3 hours ago', priority: 'Urgent', readCount: 28, totalCount: 35 },
  { id: 'b4', from: 'Accounts Head', title: 'Fee Payment Deadline Extended to Feb 28', audience: 'All Parents', time: 'Yesterday', priority: 'Important', readCount: 680, totalCount: 1050 },
  { id: 'b5', from: 'You (Class Teacher)', title: 'Pre-board Exam Schedule for Class 10-A', audience: '10-A Parents', time: 'Yesterday', priority: 'Important', readCount: 38, totalCount: 42 },
];

// Polls
const polls = [
  { id: 'p1', question: 'Preferred date for Annual Day?', options: [{ text: 'March 15 (Saturday)', votes: 28 }, { text: 'March 22 (Saturday)', votes: 35 }, { text: 'March 29 (Saturday)', votes: 12 }], createdBy: 'Principal', audience: 'All Staff', totalVotes: 75, status: 'Active', endsIn: '2 days' },
  { id: 'p2', question: 'Will your child attend the Science Exhibition?', options: [{ text: 'Yes, will attend', votes: 32 }, { text: 'No, cannot attend', votes: 6 }, { text: 'Maybe', votes: 4 }], createdBy: 'You', audience: '10-A Parents', totalVotes: 42, status: 'Active', endsIn: '3 days' },
  { id: 'p3', question: 'Should we introduce Saturday extra classes for Board students?', options: [{ text: 'Yes, very helpful', votes: 22 }, { text: 'No, students need rest', votes: 8 }, { text: 'Only for weak students', votes: 15 }], createdBy: 'Vice Principal', audience: 'Teaching Staff', totalVotes: 45, status: 'Closed' },
];

// Default groups
const defaultGroups = [
  { name: 'All Staff', members: 86, type: 'system', editable: false, icon: Users },
  { name: 'All Teaching Staff', members: 48, type: 'system', editable: false, icon: GraduationCap },
  { name: 'Non-Teaching Staff', members: 38, type: 'system', editable: false, icon: Briefcase },
  { name: 'Science Department', members: 10, type: 'system', editable: true, icon: Hash },
  { name: 'Mathematics Department', members: 8, type: 'system', editable: true, icon: Hash },
  { name: 'Class 10-A Teachers', members: 8, type: 'auto', editable: false, icon: BookOpen },
  { name: 'Class 10-B Teachers', members: 8, type: 'auto', editable: false, icon: BookOpen },
  { name: '10-A Parents', members: 42, type: 'auto', editable: false, icon: Users },
  { name: '10-B Parents', members: 40, type: 'auto', editable: false, icon: Users },
  { name: 'Annual Day Committee', members: 12, type: 'custom', editable: true, icon: Star },
  { name: 'Sports Day Planning', members: 8, type: 'custom', editable: true, icon: Star },
];

// ─── MODULES SIDEBAR ──────────────────────────────────
const modules = [
  { id: 'chats', label: 'Chats', icon: MessageSquare },
  { id: 'groups', label: 'Groups', icon: Users },
  { id: 'broadcasts', label: 'Broadcasts', icon: Megaphone },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'polls', label: 'Polls', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

// ─── CHATS VIEW ────────────────────────────────────────
function ChatsView({ theme }: { theme: Theme }) {
  const [activeConvo, setActiveConvo] = useState('c1');
  const [tab, setTab] = useState('All');
  const [message, setMessage] = useState('');

  const filtered = tab === 'All' ? conversations
    : tab === 'Unread' ? conversations.filter(c => c.unread > 0)
    : tab === 'Groups' ? conversations.filter(c => c.type === 'group')
    : tab === 'Parents' ? conversations.filter(c => (c as any).isParent)
    : conversations.filter(c => c.pinned);

  const activeChat = conversations.find(c => c.id === activeConvo);

  return (
    <div className="flex gap-0 -m-6 h-[calc(100vh-120px)]">
      {/* Conversation List */}
      <div className={`w-80 border-r ${theme.border} flex flex-col shrink-0`}>
        <div className="p-3 space-y-2">
          <div className="flex items-center justify-between">
            <h2 className={`text-lg font-bold ${theme.highlight}`}>Chats</h2>
            <button className={`p-2 rounded-xl ${theme.secondaryBg}`}><Edit size={14} className={theme.iconColor} /></button>
          </div>
          <SearchBar placeholder="Search conversations..." theme={theme} icon={Search} />
          <TabBar tabs={['All', 'Unread', 'Groups', 'Parents', 'Pinned']} active={tab} onChange={setTab} theme={theme} />
        </div>

        <div className="flex-1 overflow-y-auto">
          {filtered.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveConvo(c.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 transition-all ${
                activeConvo === c.id ? theme.secondaryBg : `${theme.buttonHover}`
              } border-b ${theme.border}`}
            >
              <div className="relative">
                <div className={`w-10 h-10 rounded-full ${c.type === 'group' ? theme.primary : 'bg-slate-300'} text-white flex items-center justify-center text-xs font-bold`}>
                  {c.avatar}
                </div>
                {c.online && <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full absolute -bottom-0.5 -right-0.5 border-2 border-white" />}
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${theme.highlight} truncate`}>
                    {c.pinned && <Pin size={10} className="inline mr-1 text-amber-500" />}
                    {c.name}
                  </span>
                  <span className={`text-[10px] ${c.unread > 0 ? theme.primaryText + ' font-bold' : theme.iconColor}`}>{c.time}</span>
                </div>
                <p className={`text-[10px] ${c.unread > 0 ? `${theme.highlight} font-medium` : theme.iconColor} truncate`}>{c.lastMsg}</p>
              </div>
              {c.unread > 0 && (
                <span className={`w-5 h-5 rounded-full ${theme.primary} text-white text-[10px] font-bold flex items-center justify-center`}>{c.unread}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        {activeChat && (
          <div className={`px-4 py-3 border-b ${theme.border} flex items-center justify-between ${theme.cardBg}`}>
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full ${activeChat.type === 'group' ? theme.primary : 'bg-slate-300'} text-white flex items-center justify-center text-xs font-bold`}>
                {activeChat.avatar}
              </div>
              <div>
                <p className={`text-sm font-bold ${theme.highlight}`}>{activeChat.name}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>
                  {activeChat.type === 'group' ? `${(activeChat as any).members} members` : activeChat.online ? 'Online' : 'Last seen recently'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className={`p-2 rounded-xl ${theme.secondaryBg}`}><Phone size={14} className={theme.iconColor} /></button>
              <button className={`p-2 rounded-xl ${theme.secondaryBg}`}><Video size={14} className={theme.iconColor} /></button>
              <button className={`p-2 rounded-xl ${theme.secondaryBg}`}><Search size={14} className={theme.iconColor} /></button>
              <button className={`p-2 rounded-xl ${theme.secondaryBg}`}><MoreVertical size={14} className={theme.iconColor} /></button>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className={`flex-1 overflow-y-auto p-4 space-y-3 ${theme.accentBg}`}>
          <div className={`text-center`}>
            <span className={`text-[10px] px-3 py-1 rounded-full ${theme.secondaryBg} ${theme.iconColor}`}>Today</span>
          </div>
          {sampleMessages.map(msg => (
            <div key={msg.id} className={`flex ${msg.self ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[65%] ${msg.self ? `${theme.primary} text-white` : `${theme.cardBg} border ${theme.border}`} rounded-2xl ${msg.self ? 'rounded-br-sm' : 'rounded-bl-sm'} px-4 py-2.5`}>
                {!msg.self && <p className={`text-[10px] font-bold ${theme.primaryText} mb-1`}>{msg.sender}</p>}
                {msg.type === 'file' ? (
                  <div className={`flex items-center gap-3 p-2 rounded-xl ${msg.self ? 'bg-white/10' : theme.secondaryBg}`}>
                    <FileText size={20} className={msg.self ? 'text-white' : theme.primaryText} />
                    <div>
                      <p className={`text-xs font-bold`}>{(msg as any).fileName}</p>
                      <p className={`text-[10px] ${msg.self ? 'text-white/70' : theme.iconColor}`}>{(msg as any).fileSize}</p>
                    </div>
                    <Download size={14} className={msg.self ? 'text-white' : theme.iconColor} />
                  </div>
                ) : (
                  <p className="text-xs whitespace-pre-wrap">{msg.text}</p>
                )}
                <div className={`flex items-center justify-end gap-1 mt-1`}>
                  <span className={`text-[9px] ${msg.self ? 'text-white/60' : theme.iconColor}`}>{msg.time}</span>
                  {msg.self && (
                    msg.status === 'read' ? <CheckCheck size={10} className="text-blue-300" /> : <CheckCheck size={10} className="text-white/40" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className={`px-4 py-3 border-t ${theme.border} ${theme.cardBg}`}>
          <div className="flex items-center gap-2">
            <button className={`p-2 rounded-xl ${theme.secondaryBg}`}><Paperclip size={16} className={theme.iconColor} /></button>
            <button className={`p-2 rounded-xl ${theme.secondaryBg}`}><Image size={16} className={theme.iconColor} /></button>
            <button className={`p-2 rounded-xl ${theme.secondaryBg}`}><Camera size={16} className={theme.iconColor} /></button>
            <input
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Type a message..."
              className={`flex-1 px-4 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-slate-300`}
            />
            <button className={`p-2 rounded-xl ${theme.secondaryBg}`}><Mic size={16} className={theme.iconColor} /></button>
            <button className={`p-2.5 rounded-xl ${theme.primary} text-white`}><Send size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── GROUPS VIEW ───────────────────────────────────────
function GroupsView({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All');
  const filtered = tab === 'All' ? defaultGroups
    : tab === 'System' ? defaultGroups.filter(g => g.type === 'system')
    : tab === 'Auto (Class)' ? defaultGroups.filter(g => g.type === 'auto')
    : defaultGroups.filter(g => g.type === 'custom');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-bold ${theme.highlight}`}>Groups</h2>
          <p className={`text-xs ${theme.iconColor}`}>{defaultGroups.length} groups · Configurable per school</p>
        </div>
        <button className={`flex items-center gap-2 px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>
          <Plus size={14} /> Create Group
        </button>
      </div>

      {/* Config Note */}
      <div className={`p-3 rounded-xl border-2 border-dashed ${theme.border} ${theme.accentBg}`}>
        <p className={`text-xs ${theme.iconColor}`}>
          <Settings size={12} className="inline mr-1" />
          <strong>Customization Note:</strong> Schools can enable/disable any default group during onboarding. Group creation authority is set by Super Admin. Account Manager can modify later.
        </p>
      </div>

      <TabBar tabs={['All', 'System', 'Auto (Class)', 'Custom']} active={tab} onChange={setTab} theme={theme} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map(g => (
          <div key={g.name} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex items-center gap-4`}>
            <div className={`w-10 h-10 rounded-xl ${g.type === 'system' ? 'bg-blue-100' : g.type === 'auto' ? 'bg-emerald-100' : 'bg-purple-100'} flex items-center justify-center`}>
              <g.icon size={18} className={g.type === 'system' ? 'text-blue-600' : g.type === 'auto' ? 'text-emerald-600' : 'text-purple-600'} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className={`text-xs font-bold ${theme.highlight}`}>{g.name}</p>
                {g.type === 'system' && <Lock size={10} className={theme.iconColor} />}
              </div>
              <p className={`text-[10px] ${theme.iconColor}`}>{g.members} members · {g.type === 'system' ? 'System default' : g.type === 'auto' ? 'Auto from timetable' : 'Custom created'}</p>
            </div>
            <div className="flex items-center gap-1">
              {g.editable && <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Edit size={12} className={theme.iconColor} /></button>}
              <Toggle on={true} onChange={() => {}} theme={theme} />
            </div>
          </div>
        ))}
      </div>

      {/* House Groups */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>House Groups (Optional)</h3>
        <p className={`text-[10px] ${theme.iconColor} mb-3`}>Enable if your school uses the house system for inter-house activities</p>
        <div className="flex gap-3">
          {[
            { name: 'Red House', color: 'bg-red-500', members: 312 },
            { name: 'Blue House', color: 'bg-blue-500', members: 305 },
            { name: 'Green House', color: 'bg-emerald-500', members: 318 },
            { name: 'Yellow House', color: 'bg-amber-500', members: 312 },
          ].map(h => (
            <div key={h.name} className={`flex-1 p-3 rounded-xl ${theme.secondaryBg} text-center`}>
              <div className={`w-8 h-8 rounded-full ${h.color} mx-auto mb-2`} />
              <p className={`text-xs font-bold ${theme.highlight}`}>{h.name}</p>
              <p className={`text-[10px] ${theme.iconColor}`}>{h.members} students</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── BROADCASTS VIEW ───────────────────────────────────
function BroadcastsView({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-bold ${theme.highlight}`}>Broadcasts</h2>
          <p className={`text-xs ${theme.iconColor}`}>One-way announcements to specific audiences</p>
        </div>
        <button className={`flex items-center gap-2 px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>
          <Megaphone size={14} /> New Broadcast
        </button>
      </div>

      <TabBar tabs={['All', 'Sent by Me', 'Important', 'Urgent']} active={tab} onChange={setTab} theme={theme} />

      <div className="space-y-3">
        {broadcasts.map(b => (
          <div key={b.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  b.priority === 'Urgent' ? 'bg-red-100 text-red-600' : b.priority === 'Important' ? 'bg-amber-100 text-amber-600' : `${theme.secondaryBg} ${theme.iconColor}`
                }`}>{b.priority}</span>
                <span className={`text-[10px] ${theme.iconColor}`}>From: {b.from}</span>
              </div>
              <span className={`text-[10px] ${theme.iconColor}`}>{b.time}</span>
            </div>
            <h4 className={`text-sm font-bold ${theme.highlight}`}>{b.title}</h4>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-3">
                <span className={`text-[10px] px-2 py-1 rounded-lg ${theme.secondaryBg} ${theme.iconColor}`}>
                  <Users size={10} className="inline mr-1" />{b.audience}
                </span>
                <span className={`text-[10px] ${theme.iconColor}`}>
                  <Eye size={10} className="inline mr-1" />{b.readCount}/{b.totalCount} read ({Math.round(b.readCount / b.totalCount * 100)}%)
                </span>
              </div>
              <div className="h-1.5 w-24 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: `${Math.round(b.readCount / b.totalCount * 100)}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Broadcast Form */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Compose Broadcast</h3>
        <div className="space-y-3">
          <div>
            <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Audience</label>
            <div className="flex flex-wrap gap-2">
              {['All Staff', 'All Parents', 'Teaching Staff', 'Class 10-A Parents', 'Red House', 'Custom...'].map(a => (
                <button key={a} className={`text-xs px-3 py-1.5 rounded-lg border ${theme.border} ${theme.buttonHover} ${theme.highlight}`}>{a}</button>
              ))}
            </div>
          </div>
          <div>
            <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Priority</label>
            <div className="flex gap-2">
              {['Normal', 'Important', 'Urgent'].map(p => (
                <button key={p} className={`text-xs px-3 py-1.5 rounded-lg ${p === 'Normal' ? `${theme.primary} text-white` : `border ${theme.border} ${theme.highlight}`}`}>{p}</button>
              ))}
            </div>
          </div>
          <div>
            <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Message</label>
            <textarea rows={3} placeholder="Type your broadcast message..." className={`w-full px-4 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`} />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button className={`p-2 rounded-xl ${theme.secondaryBg}`}><Paperclip size={14} className={theme.iconColor} /></button>
              <button className={`p-2 rounded-xl ${theme.secondaryBg}`}><Image size={14} className={theme.iconColor} /></button>
              <button className={`p-2 rounded-xl ${theme.secondaryBg}`}><Clock size={14} className={theme.iconColor} /></button>
            </div>
            <div className="flex gap-2">
              <button className={`px-4 py-2 ${theme.secondaryBg} rounded-xl text-xs font-bold ${theme.highlight}`}>Schedule</button>
              <button className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold flex items-center gap-1`}><Send size={12} /> Send Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TASKS VIEW ────────────────────────────────────────
function TasksView({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All');
  const filtered = tab === 'All' ? chatTasks
    : tab === 'My Tasks' ? chatTasks.filter(t => t.assignedTo === 'You')
    : tab === 'Assigned by Me' ? chatTasks.filter(t => t.assignedBy === 'You')
    : chatTasks.filter(t => t.status === 'Done');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-bold ${theme.highlight}`}>Tasks from Chat</h2>
          <p className={`text-xs ${theme.iconColor}`}>Track tasks delegated via conversations</p>
        </div>
        <button className={`flex items-center gap-2 px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>
          <Plus size={14} /> Create Task
        </button>
      </div>

      <TabBar tabs={['All', 'My Tasks', 'Assigned by Me', 'Completed']} active={tab} onChange={setTab} theme={theme} />

      <div className="space-y-3">
        {filtered.map(t => (
          <div key={t.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  t.status === 'Done' ? 'bg-emerald-500 border-emerald-500' : t.status === 'In Progress' ? `border-amber-400` : `${theme.border}`
                }`}>
                  {t.status === 'Done' && <Check size={10} className="text-white" />}
                </div>
                <StatusBadge status={t.priority} theme={theme} />
              </div>
              <span className={`text-[10px] ${theme.iconColor}`}>
                <MessageCircle size={10} className="inline mr-1" />from {t.from}
              </span>
            </div>
            <h4 className={`text-sm font-bold ${theme.highlight} mt-2 ${t.status === 'Done' ? 'line-through opacity-60' : ''}`}>{t.title}</h4>
            <div className="flex items-center gap-4 mt-2">
              <span className={`text-[10px] ${theme.iconColor}`}>By: {t.assignedBy}</span>
              <span className={`text-[10px] ${theme.iconColor}`}>To: {t.assignedTo}</span>
              <span className={`text-[10px] font-bold ${t.priority === 'Urgent' ? 'text-red-500' : theme.iconColor}`}>Due: {t.due}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── POLLS VIEW ────────────────────────────────────────
function PollsView({ theme }: { theme: Theme }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-bold ${theme.highlight}`}>Quick Polls</h2>
          <p className={`text-xs ${theme.iconColor}`}>Create polls for staff or parents</p>
        </div>
        <button className={`flex items-center gap-2 px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>
          <Plus size={14} /> Create Poll
        </button>
      </div>

      {/* Config Note */}
      <div className={`p-3 rounded-xl border-2 border-dashed ${theme.border} ${theme.accentBg}`}>
        <p className={`text-xs ${theme.iconColor}`}>
          <Shield size={12} className="inline mr-1" />
          <strong>Who can create polls:</strong> Admin, Principal, Trustee → for staff. Teachers → for their class parents.
        </p>
      </div>

      <div className="space-y-4">
        {polls.map(p => {
          const maxVotes = Math.max(...p.options.map(o => o.votes));
          return (
            <div key={p.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <StatusBadge status={p.status === 'Active' ? 'Active' : 'Pending'} theme={theme} />
                  <span className={`text-[10px] ${theme.iconColor}`}>by {p.createdBy} · {p.audience}</span>
                </div>
                {p.status === 'Active' && <span className={`text-[10px] ${theme.primaryText} font-bold`}>Ends in {p.endsIn}</span>}
              </div>
              <h4 className={`text-sm font-bold ${theme.highlight} mb-3`}>{p.question}</h4>
              <div className="space-y-2">
                {p.options.map(o => {
                  const percent = Math.round(o.votes / p.totalVotes * 100);
                  return (
                    <div key={o.text} className={`relative p-3 rounded-xl ${theme.secondaryBg} overflow-hidden`}>
                      <div className={`absolute inset-0 ${o.votes === maxVotes ? 'bg-emerald-500/10' : 'bg-slate-500/5'}`} style={{ width: `${percent}%` }} />
                      <div className="relative flex items-center justify-between">
                        <span className={`text-xs ${o.votes === maxVotes ? `font-bold ${theme.highlight}` : theme.iconColor}`}>{o.text}</span>
                        <span className={`text-xs font-bold ${theme.highlight}`}>{percent}% ({o.votes})</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className={`text-[10px] ${theme.iconColor} mt-2`}>{p.totalVotes} total votes</p>
            </div>
          );
        })}
      </div>

      {/* Create Poll Form */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Create New Poll</h3>
        <div className="space-y-3">
          <div>
            <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Question</label>
            <input placeholder="Ask a question..." className={`w-full px-4 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`} />
          </div>
          <div>
            <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Options</label>
            {['Option 1', 'Option 2', 'Option 3'].map((o, i) => (
              <input key={i} placeholder={o} className={`w-full px-4 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none mb-2`} />
            ))}
            <button className={`text-xs ${theme.primaryText} font-bold`}>+ Add Option</button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={`text-[10px] ${theme.iconColor}`}>Audience:</span>
              {['My Class Parents', 'Teaching Staff', 'All Staff'].map(a => (
                <button key={a} className={`text-[10px] px-2 py-1 rounded-lg border ${theme.border} ${theme.highlight}`}>{a}</button>
              ))}
            </div>
            <button className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>Create Poll</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SETTINGS VIEW ─────────────────────────────────────
function SettingsView({ theme }: { theme: Theme }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className={`text-lg font-bold ${theme.highlight}`}>Chat Settings</h2>
        <p className={`text-xs ${theme.iconColor}`}>Configured per school during onboarding by Super Admin</p>
      </div>

      {/* DM Permissions */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Direct Message Permissions</h3>
        <p className={`text-[10px] ${theme.iconColor} mb-3`}>Who can initiate DMs with whom (set during school onboarding)</p>
        <div className="space-y-2">
          {[
            { from: 'Teacher', to: 'Teacher', enabled: true },
            { from: 'Teacher', to: 'Parent', enabled: true },
            { from: 'Parent', to: 'Teacher', enabled: true },
            { from: 'Parent', to: 'Admin', enabled: false },
            { from: 'Admin', to: 'Anyone', enabled: true },
            { from: 'Principal', to: 'Anyone', enabled: true },
            { from: 'Staff', to: 'Staff (same dept)', enabled: true },
          ].map(p => (
            <div key={`${p.from}-${p.to}`} className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
              <span className={`text-xs ${theme.highlight}`}>{p.from} → {p.to}</span>
              <Toggle on={p.enabled} onChange={() => {}} theme={theme} />
            </div>
          ))}
        </div>
      </div>

      {/* Parent Communication Mode */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Parent Communication Mode</h3>
        <p className={`text-[10px] ${theme.iconColor} mb-3`}>How parents interact in chat (configurable per school, editable anytime)</p>
        <div className="space-y-2">
          {[
            { mode: 'Two-way (Parent can initiate)', desc: 'Parents can start conversations with class teacher', selected: true },
            { mode: 'Reply-only', desc: 'Parents can only reply to teacher-initiated messages', selected: false },
            { mode: 'Broadcast only', desc: 'One-way — teachers send, parents read only', selected: false },
          ].map(m => (
            <div key={m.mode} className={`flex items-center gap-3 p-3 rounded-xl ${m.selected ? `border-2 ${theme.primary.replace('bg-', 'border-')}` : `border ${theme.border}`} ${theme.cardBg}`}>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${m.selected ? `${theme.primary.replace('bg-', 'border-')}` : theme.border}`}>
                {m.selected && <div className={`w-2 h-2 rounded-full ${theme.primary}`} />}
              </div>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>{m.mode}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Group Creation Authority */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Group Creation Authority</h3>
        <div className="space-y-2">
          {[
            { role: 'Super Admin / Account Manager', can: true, note: 'Always (platform level)' },
            { role: 'School Admin', can: true, note: 'Enabled by default' },
            { role: 'Principal', can: true, note: 'Enabled by default' },
            { role: 'Vice Principal', can: true, note: 'Enabled by default' },
            { role: 'HODs / Teachers', can: false, note: 'Disabled — can be enabled per school' },
          ].map(r => (
            <div key={r.role} className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <span className={`text-xs font-bold ${theme.highlight}`}>{r.role}</span>
                <p className={`text-[10px] ${theme.iconColor}`}>{r.note}</p>
              </div>
              <Toggle on={r.can} onChange={() => {}} theme={theme} />
            </div>
          ))}
        </div>
      </div>

      {/* Storage & Retention */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Storage & Retention</h3>
        <p className={`text-[10px] ${theme.iconColor} mb-3`}>Super Admin sets cap per plan. School Admin manages within limit.</p>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Plan Storage Limit</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Set by Super Admin per plan tier</p>
            </div>
            <span className={`text-xs font-bold ${theme.primaryText}`}>Enterprise: 50 GB</span>
          </div>
          <div className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Current Usage</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Messages + media + files</p>
            </div>
            <span className={`text-xs font-bold ${theme.highlight}`}>12.4 GB / 50 GB</span>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className={`text-[10px] ${theme.iconColor}`}>Storage used</span>
              <span className={`text-[10px] font-bold ${theme.highlight}`}>25%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
              <div className="h-full rounded-full bg-emerald-500" style={{ width: '25%' }} />
            </div>
          </div>
          <div className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Message Retention</p>
              <p className={`text-[10px] ${theme.iconColor}`}>School Admin configures within plan limit</p>
            </div>
            <span className={`text-xs font-bold ${theme.primaryText}`}>1 Year (then archive)</span>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Notification Preferences</h3>
        <div className="space-y-2">
          {[
            { label: 'Push Notifications', on: true },
            { label: 'Email for missed messages (after 1 hour)', on: true },
            { label: 'Sound for new messages', on: true },
            { label: 'Show message preview in notification', on: false },
            { label: 'Do Not Disturb (9 PM - 7 AM)', on: true },
          ].map(n => (
            <div key={n.label} className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
              <span className={`text-xs ${theme.highlight}`}>{n.label}</span>
              <Toggle on={n.on} onChange={() => {}} theme={theme} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────
function ChatModule({ theme }: { theme?: Theme }) {
  const [activeModule, setActiveModule] = useState('chats');
  if (!theme) return null;

  const renderContent = () => {
    switch (activeModule) {
      case 'chats': return <ChatsView theme={theme} />;
      case 'groups': return <GroupsView theme={theme} />;
      case 'broadcasts': return <BroadcastsView theme={theme} />;
      case 'tasks': return <TasksView theme={theme} />;
      case 'polls': return <PollsView theme={theme} />;
      case 'settings': return <SettingsView theme={theme} />;
      default: return <ChatsView theme={theme} />;
    }
  };

  return (
    <div className="flex gap-4 -m-6">
      <div className={`w-48 ${theme.cardBg} border-r ${theme.border} min-h-screen p-2 space-y-0.5 shrink-0`}>
        <p className={`text-[10px] font-bold ${theme.iconColor} uppercase px-3 py-2`}>Communication</p>
        {modules.map(m => (
          <button
            key={m.id}
            onClick={() => setActiveModule(m.id)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activeModule === m.id ? `${theme.primary} text-white` : `${theme.iconColor} ${theme.buttonHover}`
            }`}
          >
            <m.icon size={14} />
            {m.label}
            {m.id === 'chats' && <span className="ml-auto w-4 h-4 rounded-full bg-red-500 text-white text-[9px] flex items-center justify-center">10</span>}
          </button>
        ))}
      </div>
      <div className="flex-1 p-6 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <BlueprintLayout>
      <ChatModule />
    </BlueprintLayout>
  );
}
