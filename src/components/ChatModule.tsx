'use client';

import React, { useState } from 'react';
import { TabBar, StatusBadge, SearchBar, Toggle } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  MessageSquare, Users, Megaphone, Send, Search, Plus, Settings,
  Phone, Video, Paperclip, Image, MoreVertical, Check, CheckCheck,
  Clock, Star, Pin, Hash, Lock, BarChart3, FileText, Download,
  Camera, Mic, X, Edit, Shield, Eye, Briefcase, GraduationCap, BookOpen,
  Archive, Trash2, Info, ChevronUp, ChevronDown, Save
} from 'lucide-react';

// ─── MOCK DATA ────────────────────────────────────────

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

export const conversations = [
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

const archivedConversations = [
  { id: 'a1', type: 'dm' as const, name: 'Former Teacher - Sunil', avatar: 'FS', lastMsg: 'Best wishes for the new school year', time: '3 months', unread: 0, online: false },
  { id: 'a2', type: 'group' as const, name: 'Science Fair 2025', avatar: '15', lastMsg: 'Event completed successfully!', time: '2 months', unread: 0, members: 15, icon: Star },
];

const broadcastRecipients = [
  { name: 'Priya Sharma', role: 'PGT Mathematics', delivered: true, read: true, time: '15 min ago' },
  { name: 'Rajesh Kumar', role: 'TGT Science', delivered: true, read: true, time: '20 min ago' },
  { name: 'Dr. Meena Iyer', role: 'Vice Principal', delivered: true, read: false, time: '15 min ago' },
  { name: 'Sunita Patel', role: 'Office Assistant', delivered: true, read: true, time: '30 min ago' },
  { name: 'Kavitha Nair', role: 'PRT English', delivered: true, read: false, time: '16 min ago' },
  { name: 'Arun Verma', role: 'HOD Science', delivered: false, read: false, time: '—' },
  { name: 'Mohammed Irfan', role: 'Transport Head', delivered: true, read: true, time: '18 min ago' },
  { name: 'Deepak Verma', role: 'Security Head', delivered: false, read: false, time: '—' },
];

const broadcasts = [
  { id: 'b1', from: 'Principal', title: 'Staff Meeting - Tomorrow 3 PM', audience: 'All Staff', time: '15 min ago', priority: 'Important', readCount: 32, totalCount: 86 },
  { id: 'b2', from: 'Admin', title: 'Republic Day Celebration - Schedule', audience: 'All Staff + Parents', time: '2 hours ago', priority: 'Normal', readCount: 450, totalCount: 1200 },
  { id: 'b3', from: 'Transport Head', title: 'Bus Route 5 Diverted Due to Road Work', audience: 'Route 5 Parents', time: '3 hours ago', priority: 'Urgent', readCount: 28, totalCount: 35 },
  { id: 'b4', from: 'Accounts Head', title: 'Fee Payment Deadline Extended to Feb 28', audience: 'All Parents', time: 'Yesterday', priority: 'Important', readCount: 680, totalCount: 1050 },
  { id: 'b5', from: 'You (Class Teacher)', title: 'Pre-board Exam Schedule for Class 10-A', audience: '10-A Parents', time: 'Yesterday', priority: 'Important', readCount: 38, totalCount: 42 },
];

const polls = [
  { id: 'p1', question: 'Preferred date for Annual Day?', options: [{ text: 'March 15 (Saturday)', votes: 28 }, { text: 'March 22 (Saturday)', votes: 35 }, { text: 'March 29 (Saturday)', votes: 12 }], createdBy: 'Principal', audience: 'All Staff', totalVotes: 75, status: 'Active', endsIn: '2 days' },
  { id: 'p2', question: 'Will your child attend the Science Exhibition?', options: [{ text: 'Yes, will attend', votes: 32 }, { text: 'No, cannot attend', votes: 6 }, { text: 'Maybe', votes: 4 }], createdBy: 'You', audience: '10-A Parents', totalVotes: 42, status: 'Active', endsIn: '3 days' },
  { id: 'p3', question: 'Should we introduce Saturday extra classes for Board students?', options: [{ text: 'Yes, very helpful', votes: 22 }, { text: 'No, students need rest', votes: 8 }, { text: 'Only for weak students', votes: 15 }], createdBy: 'Vice Principal', audience: 'Teaching Staff', totalVotes: 45, status: 'Closed' },
];

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

// ─── EXPORTED SUB-MODULES ──────────────────────────────

const chatModules = [
  { id: 'chats', label: 'Chats', icon: MessageSquare },
  { id: 'groups', label: 'Groups', icon: Users },
  { id: 'broadcasts', label: 'Broadcasts', icon: Megaphone },
  { id: 'polls', label: 'Polls', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

// ─── CHATS VIEW (exported for embedding in dashboards) ─
export function ChatsView({ theme, compact }: { theme: Theme; compact?: boolean }) {
  const [activeConvo, setActiveConvo] = useState('c1');
  const [tab, setTab] = useState('All');
  const [message, setMessage] = useState('');
  const [kebabOpen, setKebabOpen] = useState<string | null>(null);
  const [editingMsg, setEditingMsg] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [editedMessages, setEditedMessages] = useState<Record<string, string>>({});
  const [deletedMessages, setDeletedMessages] = useState<string[]>([]);
  const [importantMessages, setImportantMessages] = useState<string[]>([]);
  const [pinnedMessages, setPinnedMessages] = useState<string[]>([]);
  const [archivedConvos, setArchivedConvos] = useState<string[]>([]);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [convoSearch, setConvoSearch] = useState('');
  const [showConvoSearch, setShowConvoSearch] = useState(false);
  const [retentionDismissed, setRetentionDismissed] = useState(false);

  // Separate pinned and unpinned conversations for display
  const activeConversations = conversations.filter(c => !archivedConvos.includes(c.id));
  const pinnedConvos = activeConversations.filter(c => c.pinned);
  const unpinnedConvos = activeConversations.filter(c => !c.pinned);

  const filtered = tab === 'All' ? activeConversations
    : tab === 'Unread' ? activeConversations.filter(c => c.unread > 0)
    : tab === 'Groups' ? activeConversations.filter(c => c.type === 'group')
    : tab === 'Parents' ? activeConversations.filter(c => (c as any).isParent)
    : tab === 'Pinned' ? pinnedConvos
    : tab === 'Archived' ? [...archivedConversations, ...conversations.filter(c => archivedConvos.includes(c.id))]
    : activeConversations;

  const activeChat = [...conversations, ...archivedConversations].find(c => c.id === activeConvo);

  // Filter messages for in-conversation search
  const visibleMessages = sampleMessages.filter(m => !deletedMessages.includes(m.id));
  const searchResults = convoSearch
    ? visibleMessages.filter(m => (editedMessages[m.id] || m.text).toLowerCase().includes(convoSearch.toLowerCase()))
    : [];

  // Render a single conversation row (reusable for pinned section + main list)
  const renderConvoRow = (c: typeof conversations[0] & { members?: number; icon?: any; isParent?: boolean }, showUnarchive?: boolean) => (
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
        <span className={`w-5 h-5 rounded-full ${theme.primary} text-white text-[10px] font-bold flex items-center justify-center shrink-0`}>{c.unread}</span>
      )}
      {showUnarchive && (
        <button
          onClick={e => { e.stopPropagation(); setArchivedConvos(prev => prev.filter(id => id !== c.id)); }}
          className={`text-[9px] px-2 py-1 rounded-lg ${theme.secondaryBg} ${theme.primaryText} font-bold shrink-0`}
        >Unarchive</button>
      )}
    </button>
  );

  return (
    <div className={`flex gap-0 ${compact ? '' : '-m-6'} h-[calc(100vh-${compact ? '200px' : '120px'})]`}>
      {/* Conversation List */}
      <div className={`w-80 border-r ${theme.border} flex flex-col shrink-0`}>
        <div className="p-3 space-y-2">
          <div className="flex items-center justify-between">
            <h2 className={`text-lg font-bold ${theme.highlight}`}>Chats</h2>
            <button className={`p-2 rounded-xl ${theme.secondaryBg}`}><Edit size={14} className={theme.iconColor} /></button>
          </div>
          <SearchBar placeholder="Search conversations..." theme={theme} icon={Search} />
          <TabBar tabs={['All', 'Unread', 'Groups', 'Parents', 'Pinned', 'Archived']} active={tab} onChange={setTab} theme={theme} />
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Pinned Section (show in All / Unread tabs, not in Archived/Pinned-only) */}
          {tab !== 'Archived' && tab !== 'Pinned' && pinnedConvos.length > 0 && (
            <>
              <div className={`px-3 py-1.5 ${theme.accentBg} border-b ${theme.border}`}>
                <span className={`text-[9px] font-bold uppercase ${theme.iconColor}`}><Pin size={8} className="inline mr-1" />Pinned</span>
              </div>
              {pinnedConvos.map(c => renderConvoRow(c as any))}
              <div className={`px-3 py-1.5 ${theme.accentBg} border-b ${theme.border}`}>
                <span className={`text-[9px] font-bold uppercase ${theme.iconColor}`}>All Messages</span>
              </div>
            </>
          )}

          {/* Main conversation list */}
          {tab === 'Archived' ? (
            filtered.length > 0 ? filtered.map(c => renderConvoRow(c as any, true))
            : <p className={`text-xs ${theme.iconColor} text-center py-8`}>No archived conversations</p>
          ) : (
            (tab === 'All' ? unpinnedConvos : filtered.filter(c => !(c as any).pinned)).map(c => renderConvoRow(c as any))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
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
              <button
                onClick={() => setShowConvoSearch(!showConvoSearch)}
                className={`p-2 rounded-xl ${showConvoSearch ? theme.primary + ' text-white' : theme.secondaryBg}`}
              ><Search size={14} className={showConvoSearch ? 'text-white' : theme.iconColor} /></button>
              <button className={`p-2 rounded-xl ${theme.secondaryBg}`}><MoreVertical size={14} className={theme.iconColor} /></button>
            </div>
          </div>
        )}

        {/* In-Conversation Search Bar */}
        {showConvoSearch && (
          <div className={`px-4 py-2 border-b ${theme.border} ${theme.cardBg} flex items-center gap-2`}>
            <Search size={14} className={theme.iconColor} />
            <input
              value={convoSearch}
              onChange={e => setConvoSearch(e.target.value)}
              placeholder="Search in this conversation..."
              className={`flex-1 px-3 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-xs outline-none`}
              autoFocus
            />
            {convoSearch && (
              <span className={`text-[10px] ${theme.primaryText} font-bold whitespace-nowrap`}>
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
              </span>
            )}
            <button onClick={() => { setShowConvoSearch(false); setConvoSearch(''); }} className={`p-1 rounded-lg ${theme.secondaryBg}`}>
              <X size={12} className={theme.iconColor} />
            </button>
          </div>
        )}

        {/* Retention Banner */}
        {!retentionDismissed && (
          <div className={`px-4 py-2 ${theme.accentBg} border-b ${theme.border} flex items-center gap-2`}>
            <Info size={12} className={theme.iconColor} />
            <span className={`text-[10px] ${theme.iconColor} flex-1`}>
              Messages older than 1 year are auto-archived. Change retention in{' '}
              <button className={`${theme.primaryText} font-bold underline`}>Settings</button>.
            </span>
            <button onClick={() => setRetentionDismissed(true)} className={`p-0.5 rounded ${theme.secondaryBg}`}>
              <X size={10} className={theme.iconColor} />
            </button>
          </div>
        )}

        {/* Messages */}
        <div className={`flex-1 overflow-y-auto p-4 space-y-3 ${theme.accentBg}`}>
          <div className={`text-center`}>
            <span className={`text-[10px] px-3 py-1 rounded-full ${theme.secondaryBg} ${theme.iconColor}`}>Today</span>
          </div>
          {visibleMessages.map(msg => {
            const isHighlighted = convoSearch && (editedMessages[msg.id] || msg.text).toLowerCase().includes(convoSearch.toLowerCase());
            const isEditing = editingMsg === msg.id;
            const displayText = editedMessages[msg.id] || msg.text;
            const wasEdited = !!editedMessages[msg.id];
            const isImportant = importantMessages.includes(msg.id);
            const isPinned = pinnedMessages.includes(msg.id);

            return (
              <div key={msg.id} className={`flex ${msg.self ? 'justify-end' : 'justify-start'} ${isHighlighted ? 'ring-2 ring-amber-400 rounded-2xl' : ''}`}>
                <div className={`relative group max-w-[65%] ${msg.self ? `${theme.primary} text-white` : `${theme.cardBg} border ${theme.border}`} rounded-2xl ${msg.self ? 'rounded-br-sm' : 'rounded-bl-sm'} px-4 py-2.5`}>
                  {/* Important / Pinned indicators */}
                  {(isImportant || isPinned) && (
                    <div className="flex items-center gap-1 mb-1">
                      {isPinned && <Pin size={9} className={msg.self ? 'text-amber-300' : 'text-amber-500'} />}
                      {isImportant && <Star size={9} className={msg.self ? 'text-yellow-300' : 'text-yellow-500'} />}
                    </div>
                  )}

                  {!msg.self && <p className={`text-[10px] font-bold ${theme.primaryText} mb-1`}>{msg.sender}</p>}

                  {/* Kebab Menu Button */}
                  <button
                    onClick={() => setKebabOpen(kebabOpen === msg.id ? null : msg.id)}
                    className={`absolute top-1 ${msg.self ? 'left-1' : 'right-1'} opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full ${msg.self ? 'hover:bg-white/20' : `hover:${theme.secondaryBg}`}`}
                  >
                    <MoreVertical size={10} className={msg.self ? 'text-white/70' : theme.iconColor} />
                  </button>

                  {/* Kebab Dropdown */}
                  {kebabOpen === msg.id && (
                    <div className={`absolute z-20 top-6 ${msg.self ? 'left-0' : 'right-0'} ${theme.cardBg} border ${theme.border} rounded-xl shadow-lg py-1 w-36`}>
                      {msg.self && msg.status !== 'read' && (
                        <button onClick={() => { setEditingMsg(msg.id); setEditText(displayText); setKebabOpen(null); }}
                          className={`w-full flex items-center gap-2 px-3 py-1.5 text-[10px] ${theme.highlight} ${theme.buttonHover}`}>
                          <Edit size={10} /> Edit
                        </button>
                      )}
                      <button onClick={() => { setPinnedMessages(prev => prev.includes(msg.id) ? prev.filter(i => i !== msg.id) : [...prev, msg.id]); setKebabOpen(null); }}
                        className={`w-full flex items-center gap-2 px-3 py-1.5 text-[10px] ${theme.highlight} ${theme.buttonHover}`}>
                        <Pin size={10} /> {isPinned ? 'Unpin' : 'Pin'}
                      </button>
                      <button onClick={() => { setImportantMessages(prev => prev.includes(msg.id) ? prev.filter(i => i !== msg.id) : [...prev, msg.id]); setKebabOpen(null); }}
                        className={`w-full flex items-center gap-2 px-3 py-1.5 text-[10px] ${theme.highlight} ${theme.buttonHover}`}>
                        <Star size={10} /> {isImportant ? 'Unmark Important' : 'Mark as Important'}
                      </button>
                      <button onClick={() => { setDeleteConfirm(msg.id); setKebabOpen(null); }}
                        className={`w-full flex items-center gap-2 px-3 py-1.5 text-[10px] text-red-500 ${theme.buttonHover}`}>
                        <Trash2 size={10} /> Delete
                      </button>
                      <button onClick={() => { setArchivedConvos(prev => [...prev, activeConvo]); setKebabOpen(null); }}
                        className={`w-full flex items-center gap-2 px-3 py-1.5 text-[10px] ${theme.highlight} ${theme.buttonHover}`}>
                        <Archive size={10} /> Archive Chat
                      </button>
                    </div>
                  )}

                  {/* Message Content — edit mode or display */}
                  {msg.type === 'file' ? (
                    <div className={`flex items-center gap-3 p-2 rounded-xl ${msg.self ? 'bg-white/10' : theme.secondaryBg}`}>
                      <FileText size={20} className={msg.self ? 'text-white' : theme.primaryText} />
                      <div>
                        <p className={`text-xs font-bold`}>{(msg as any).fileName}</p>
                        <p className={`text-[10px] ${msg.self ? 'text-white/70' : theme.iconColor}`}>{(msg as any).fileSize}</p>
                      </div>
                      <Download size={14} className={msg.self ? 'text-white' : theme.iconColor} />
                    </div>
                  ) : isEditing ? (
                    <div className="space-y-1.5">
                      <textarea
                        value={editText}
                        onChange={e => setEditText(e.target.value)}
                        rows={2}
                        className={`w-full px-2 py-1.5 rounded-lg text-xs text-slate-800 outline-none border ${theme.border}`}
                        autoFocus
                      />
                      <div className="flex items-center gap-1 justify-end">
                        <button onClick={() => setEditingMsg(null)}
                          className="text-[9px] px-2 py-0.5 rounded bg-white/20 text-white">Cancel</button>
                        <button onClick={() => { setEditedMessages(prev => ({ ...prev, [msg.id]: editText })); setEditingMsg(null); }}
                          className="text-[9px] px-2 py-0.5 rounded bg-white/30 text-white font-bold flex items-center gap-1">
                          <Save size={8} /> Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs whitespace-pre-wrap">{displayText}</p>
                  )}

                  <div className={`flex items-center justify-end gap-1 mt-1`}>
                    {wasEdited && <span className={`text-[8px] italic ${msg.self ? 'text-white/50' : theme.iconColor}`}>(edited)</span>}
                    <span className={`text-[9px] ${msg.self ? 'text-white/60' : theme.iconColor}`}>{msg.time}</span>
                    {msg.self && (
                      msg.status === 'read' ? <CheckCheck size={10} className="text-blue-300" /> : <CheckCheck size={10} className="text-white/40" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Delete Confirmation Modal */}
          {deleteConfirm && (
            <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
              <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 w-80 shadow-xl`}>
                <h4 className={`text-sm font-bold ${theme.highlight} mb-2`}>Delete Message?</h4>
                <p className={`text-xs ${theme.iconColor} mb-4`}>This message will be permanently removed from the conversation.</p>
                <div className="flex justify-end gap-2">
                  <button onClick={() => setDeleteConfirm(null)} className={`px-3 py-1.5 rounded-lg text-xs ${theme.secondaryBg} ${theme.highlight}`}>Cancel</button>
                  <button onClick={() => { setDeletedMessages(prev => [...prev, deleteConfirm]); setDeleteConfirm(null); }}
                    className="px-3 py-1.5 rounded-lg text-xs bg-red-500 text-white font-bold">Delete</button>
                </div>
              </div>
            </div>
          )}
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
export function GroupsView({ theme }: { theme: Theme }) {
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
export function BroadcastsView({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All');
  const [showCompose, setShowCompose] = useState(false);
  const [reportBroadcast, setReportBroadcast] = useState<string | null>(null);

  const reportTarget = broadcasts.find(b => b.id === reportBroadcast);
  const deliveredCount = broadcastRecipients.filter(r => r.delivered).length;
  const readCount = broadcastRecipients.filter(r => r.read).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-bold ${theme.highlight}`}>Broadcasts</h2>
          <p className={`text-xs ${theme.iconColor}`}>One-way announcements to specific audiences</p>
        </div>
        <button
          onClick={() => setShowCompose(!showCompose)}
          className={`flex items-center gap-2 px-4 py-2 ${showCompose ? theme.secondaryBg + ' ' + theme.highlight : theme.primary + ' text-white'} rounded-xl text-xs font-bold`}
        >
          {showCompose ? <><X size={14} /> Cancel</> : <><Megaphone size={14} /> New Broadcast</>}
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
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setReportBroadcast(b.id)}
                  className={`text-[10px] px-2.5 py-1 rounded-lg ${theme.secondaryBg} ${theme.primaryText} font-bold flex items-center gap-1`}
                >
                  <BarChart3 size={10} /> View Report
                </button>
                <div className="h-1.5 w-24 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: `${Math.round(b.readCount / b.totalCount * 100)}%` }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delivery & Read Report Modal */}
      {reportBroadcast && reportTarget && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 w-[600px] max-h-[80vh] overflow-y-auto shadow-xl`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className={`text-sm font-bold ${theme.highlight}`}>Delivery Report</h3>
                <p className={`text-[10px] ${theme.iconColor}`}>{reportTarget.title}</p>
              </div>
              <button onClick={() => setReportBroadcast(null)} className={`p-1.5 rounded-lg ${theme.secondaryBg}`}>
                <X size={14} className={theme.iconColor} />
              </button>
            </div>

            {/* Summary Row */}
            <div className="flex gap-3 mb-4">
              <div className={`flex-1 p-3 rounded-xl ${theme.secondaryBg} text-center`}>
                <p className={`text-lg font-bold ${theme.highlight}`}>{deliveredCount}/{broadcastRecipients.length}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Delivered</p>
              </div>
              <div className={`flex-1 p-3 rounded-xl ${theme.secondaryBg} text-center`}>
                <p className={`text-lg font-bold ${theme.primaryText}`}>{readCount}/{broadcastRecipients.length}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Read</p>
              </div>
              <div className={`flex-1 p-3 rounded-xl ${theme.secondaryBg} text-center`}>
                <p className={`text-lg font-bold text-red-500`}>{broadcastRecipients.length - deliveredCount}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Undelivered</p>
              </div>
            </div>

            {/* Recipient Table */}
            <div className={`rounded-xl border ${theme.border} overflow-hidden`}>
              <table className="w-full">
                <thead>
                  <tr className={`${theme.accentBg} border-b ${theme.border}`}>
                    <th className={`text-[10px] font-bold ${theme.iconColor} text-left px-3 py-2`}>Name</th>
                    <th className={`text-[10px] font-bold ${theme.iconColor} text-left px-3 py-2`}>Role</th>
                    <th className={`text-[10px] font-bold ${theme.iconColor} text-center px-3 py-2`}>Delivered</th>
                    <th className={`text-[10px] font-bold ${theme.iconColor} text-center px-3 py-2`}>Read</th>
                    <th className={`text-[10px] font-bold ${theme.iconColor} text-right px-3 py-2`}>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {broadcastRecipients.map(r => (
                    <tr key={r.name} className={`border-b ${theme.border}`}>
                      <td className={`text-xs ${theme.highlight} px-3 py-2`}>{r.name}</td>
                      <td className={`text-[10px] ${theme.iconColor} px-3 py-2`}>{r.role}</td>
                      <td className="text-center px-3 py-2">
                        {r.delivered ? <Check size={12} className="text-emerald-500 mx-auto" /> : <X size={12} className="text-red-400 mx-auto" />}
                      </td>
                      <td className="text-center px-3 py-2">
                        {r.read ? <CheckCheck size={12} className="text-blue-500 mx-auto" /> : <X size={12} className="text-red-400 mx-auto" />}
                      </td>
                      <td className={`text-[10px] ${theme.iconColor} text-right px-3 py-2`}>{r.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2 mt-4">
              <button className={`flex items-center gap-1 px-3 py-2 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.highlight}`}>
                <Download size={12} /> Export Report
              </button>
              <button className={`flex items-center gap-1 px-3 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold`}>
                <Send size={12} /> Resend to Undelivered ({broadcastRecipients.length - deliveredCount})
              </button>
            </div>
          </div>
        </div>
      )}

      {showCompose && (
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
      )}
    </div>
  );
}

// ─── POLLS VIEW ────────────────────────────────────────
export function PollsView({ theme }: { theme: Theme }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-bold ${theme.highlight}`}>Quick Polls</h2>
          <p className={`text-xs ${theme.iconColor}`}>Create polls for staff or parents</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 px-4 py-2 ${showForm ? theme.secondaryBg + ' ' + theme.highlight : theme.primary + ' text-white'} rounded-xl text-xs font-bold`}
        >
          {showForm ? <><X size={14} /> Cancel</> : <><Plus size={14} /> Create Poll</>}
        </button>
      </div>

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

      {showForm && (
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
      )}
    </div>
  );
}

// ─── SETTINGS VIEW ─────────────────────────────────────
export function ChatSettingsView({ theme }: { theme: Theme }) {
  const [dmPerms, setDmPerms] = useState<Record<string, boolean>>({
    'Teacher-Teacher': true, 'Teacher-Parent': true, 'Parent-Teacher': true,
    'Parent-Admin': false, 'Admin-Anyone': true, 'Principal-Anyone': true,
    'Staff-Staff (same dept)': true,
  });
  const [parentMode, setParentMode] = useState('Two-way (Parent can initiate)');
  const [groupAuth, setGroupAuth] = useState<Record<string, boolean>>({
    'Super Admin / Account Manager': true, 'School Admin': true, 'Principal': true,
    'Vice Principal': true, 'HODs / Teachers': false,
  });
  const [notifPrefs, setNotifPrefs] = useState<Record<string, boolean>>({
    'Push Notifications': true, 'Email for missed messages (after 1 hour)': true,
    'Sound for new messages': true, 'Show message preview in notification': false,
    'Do Not Disturb (9 PM - 7 AM)': true,
  });

  const dmPermsList = [
    { from: 'Teacher', to: 'Teacher' }, { from: 'Teacher', to: 'Parent' },
    { from: 'Parent', to: 'Teacher' }, { from: 'Parent', to: 'Admin' },
    { from: 'Admin', to: 'Anyone' }, { from: 'Principal', to: 'Anyone' },
    { from: 'Staff', to: 'Staff (same dept)' },
  ];
  const groupAuthList = [
    { role: 'Super Admin / Account Manager', note: 'Always (platform level)' },
    { role: 'School Admin', note: 'Enabled by default' },
    { role: 'Principal', note: 'Enabled by default' },
    { role: 'Vice Principal', note: 'Enabled by default' },
    { role: 'HODs / Teachers', note: 'Disabled — can be enabled per school' },
  ];
  const parentModes = [
    { mode: 'Two-way (Parent can initiate)', desc: 'Parents can start conversations with class teacher' },
    { mode: 'Reply-only', desc: 'Parents can only reply to teacher-initiated messages' },
    { mode: 'Broadcast only', desc: 'One-way — teachers send, parents read only' },
  ];
  const notifList = ['Push Notifications', 'Email for missed messages (after 1 hour)', 'Sound for new messages', 'Show message preview in notification', 'Do Not Disturb (9 PM - 7 AM)'];

  return (
    <div className="space-y-4">
      <div>
        <h2 className={`text-lg font-bold ${theme.highlight}`}>Chat Settings</h2>
        <p className={`text-xs ${theme.iconColor}`}>Configured per school during onboarding by Super Admin</p>
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Direct Message Permissions</h3>
        <p className={`text-[10px] ${theme.iconColor} mb-3`}>Who can initiate DMs with whom (set during school onboarding)</p>
        <div className="space-y-2">
          {dmPermsList.map(p => {
            const key = `${p.from}-${p.to}`;
            return (
              <div key={key} className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
                <span className={`text-xs ${theme.highlight}`}>{p.from} → {p.to}</span>
                <Toggle on={dmPerms[key]} onChange={() => setDmPerms(prev => ({ ...prev, [key]: !prev[key] }))} theme={theme} />
              </div>
            );
          })}
        </div>
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Parent Communication Mode</h3>
        <p className={`text-[10px] ${theme.iconColor} mb-3`}>How parents interact in chat (configurable per school, editable anytime)</p>
        <div className="space-y-2">
          {parentModes.map(m => (
            <button key={m.mode} onClick={() => setParentMode(m.mode)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl text-left ${parentMode === m.mode ? `border-2 ${theme.primary.replace('bg-', 'border-')}` : `border ${theme.border}`} ${theme.cardBg}`}>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${parentMode === m.mode ? `${theme.primary.replace('bg-', 'border-')}` : theme.border}`}>
                {parentMode === m.mode && <div className={`w-2 h-2 rounded-full ${theme.primary}`} />}
              </div>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>{m.mode}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{m.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Group Creation Authority</h3>
        <div className="space-y-2">
          {groupAuthList.map(r => (
            <div key={r.role} className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <span className={`text-xs font-bold ${theme.highlight}`}>{r.role}</span>
                <p className={`text-[10px] ${theme.iconColor}`}>{r.note}</p>
              </div>
              <Toggle on={groupAuth[r.role]} onChange={() => setGroupAuth(prev => ({ ...prev, [r.role]: !prev[r.role] }))} theme={theme} />
            </div>
          ))}
        </div>
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Storage & Retention</h3>
        <p className={`text-[10px] ${theme.iconColor} mb-3`}>Super Admin sets cap per plan. School Admin manages within limit.</p>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
            <div><p className={`text-xs font-bold ${theme.highlight}`}>Plan Storage Limit</p><p className={`text-[10px] ${theme.iconColor}`}>Set by Super Admin per plan tier</p></div>
            <span className={`text-xs font-bold ${theme.primaryText}`}>Enterprise: 50 GB</span>
          </div>
          <div className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
            <div><p className={`text-xs font-bold ${theme.highlight}`}>Current Usage</p><p className={`text-[10px] ${theme.iconColor}`}>Messages + media + files</p></div>
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
            <div><p className={`text-xs font-bold ${theme.highlight}`}>Message Retention</p><p className={`text-[10px] ${theme.iconColor}`}>School Admin configures within plan limit</p></div>
            <span className={`text-xs font-bold ${theme.primaryText}`}>1 Year (then archive)</span>
          </div>
        </div>
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Notification Preferences</h3>
        <div className="space-y-2">
          {notifList.map(label => (
            <div key={label} className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
              <span className={`text-xs ${theme.highlight}`}>{label}</span>
              <Toggle on={notifPrefs[label]} onChange={() => setNotifPrefs(prev => ({ ...prev, [label]: !prev[label] }))} theme={theme} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── FULL CHAT MODULE (with own sidebar — used on /chat page) ──────
export default function ChatModule({ theme }: { theme?: Theme }) {
  const [activeModule, setActiveModule] = useState('chats');
  if (!theme) return null;

  const renderContent = () => {
    switch (activeModule) {
      case 'chats': return <ChatsView theme={theme} />;
      case 'groups': return <GroupsView theme={theme} />;
      case 'broadcasts': return <BroadcastsView theme={theme} />;
      case 'polls': return <PollsView theme={theme} />;
      case 'settings': return <ChatSettingsView theme={theme} />;
      default: return <ChatsView theme={theme} />;
    }
  };

  return (
    <div className="flex gap-4 -m-6">
      <div className={`w-48 ${theme.cardBg} border-r ${theme.border} min-h-screen p-2 space-y-0.5 shrink-0`}>
        <p className={`text-[10px] font-bold ${theme.iconColor} uppercase px-3 py-2`}>Communication</p>
        {chatModules.map(m => (
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
