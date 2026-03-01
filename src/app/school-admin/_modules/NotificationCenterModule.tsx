'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { StatCard, TabBar, SearchBar, DataTable } from '@/components/shared';
import {
  Bell, Send, Settings, Search, Filter, Eye, BarChart3,
  Mail, MessageSquare, Smartphone, AlertTriangle, Clock,
  X, ChevronDown, RefreshCw, Download, Users, Shield,
  Calendar, Volume2, VolumeX, Zap,
} from 'lucide-react';

// ─── MOCK DATA ──────────────────────────────────────
const notifications = [
  { id: 'NOT-001', title: 'Fee Reminder — March Due', type: 'Auto', category: 'Finance', sentTo: 'All Parents (320)', sentAt: '28 Feb 2026, 09:00 AM', deliveredRate: '98%', readRate: '72%', channel: 'Push + SMS', priority: 'Normal' },
  { id: 'NOT-002', title: 'PTM Reminder — March 5', type: 'Auto', category: 'PTM', sentTo: 'Class 10 Parents (45)', sentAt: '27 Feb 2026, 10:30 AM', deliveredRate: '100%', readRate: '85%', channel: 'Push + Email', priority: 'Important' },
  { id: 'NOT-003', title: 'Bus Route 3 — Delay Alert', type: 'Manual', category: 'Transport', sentTo: 'Route 3 Parents (28)', sentAt: '26 Feb 2026, 07:15 AM', deliveredRate: '96%', readRate: '90%', channel: 'Push + SMS', priority: 'Urgent' },
  { id: 'NOT-004', title: 'Homework Submitted — Aarav Patel', type: 'System', category: 'Academic', sentTo: 'Rajesh Patel (Parent)', sentAt: '25 Feb 2026, 04:00 PM', deliveredRate: '100%', readRate: '100%', channel: 'Push', priority: 'Normal' },
  { id: 'NOT-005', title: 'Staff Meeting Tomorrow 3 PM', type: 'Manual', category: 'Staff', sentTo: 'All Staff (98)', sentAt: '24 Feb 2026, 11:00 AM', deliveredRate: '100%', readRate: '78%', channel: 'Push + Email', priority: 'Normal' },
  { id: 'NOT-006', title: 'Emergency — Water Supply Disruption', type: 'Manual', category: 'Emergency', sentTo: 'All (650)', sentAt: '23 Feb 2026, 08:00 AM', deliveredRate: '99%', readRate: '95%', channel: 'Push + SMS + Email', priority: 'Critical' },
];

const deliveryLog = [
  { recipient: 'Rajesh Patel', channel: 'Push', delivered: 'Yes', read: 'Yes', time: '28 Feb 2026, 09:01 AM' },
  { recipient: 'Meena Shah', channel: 'SMS', delivered: 'Yes', read: 'Yes', time: '28 Feb 2026, 09:02 AM' },
  { recipient: 'Sunil Kumar', channel: 'Push', delivered: 'Yes', read: 'No', time: '28 Feb 2026, 09:01 AM' },
  { recipient: 'Priya Desai', channel: 'SMS', delivered: 'Yes', read: 'Yes', time: '28 Feb 2026, 09:03 AM' },
  { recipient: 'Amit Joshi', channel: 'Push', delivered: 'Failed', read: '-', time: '28 Feb 2026, 09:01 AM' },
  { recipient: 'Kavita Reddy', channel: 'Email', delivered: 'Yes', read: 'No', time: '28 Feb 2026, 09:05 AM' },
];

const priorityColor = (p: string) => {
  if (p === 'Normal') return 'bg-gray-100 text-gray-700';
  if (p === 'Important') return 'bg-amber-100 text-amber-700';
  if (p === 'Urgent') return 'bg-orange-100 text-orange-700';
  if (p === 'Critical') return 'bg-red-100 text-red-700';
  return 'bg-gray-100 text-gray-700';
};

const typeColor = (t: string) => {
  if (t === 'Auto') return 'bg-blue-100 text-blue-700';
  if (t === 'Manual') return 'bg-purple-100 text-purple-700';
  if (t === 'System') return 'bg-emerald-100 text-emerald-700';
  return 'bg-gray-100 text-gray-700';
};

export default function NotificationCenterModule({ theme }: { theme: Theme }) {
  const [activeTab, setActiveTab] = useState('All Notifications');
  const [expandedNotif, setExpandedNotif] = useState<string | null>(null);
  const [showConfirmSend, setShowConfirmSend] = useState(false);
  const [sendCategory, setSendCategory] = useState('Finance');
  const [sendPriority, setSendPriority] = useState('Normal');
  const [sendTarget, setSendTarget] = useState('All');
  const [sendChannels, setSendChannels] = useState({ push: true, sms: false, email: false });
  const [sendSchedule, setSendSchedule] = useState<'now' | 'later'>('now');

  // Settings state
  const [feeReminder, setFeeReminder] = useState(true);
  const [absentAlert, setAbsentAlert] = useState(true);
  const [hwSubmission, setHwSubmission] = useState(true);
  const [busDelay, setBusDelay] = useState(true);
  const [birthdayWish, setBirthdayWish] = useState(false);
  const [quietHoursStart, setQuietHoursStart] = useState('21:00');
  const [quietHoursEnd, setQuietHoursEnd] = useState('07:00');
  const [maxPerDay, setMaxPerDay] = useState('10');
  const [retentionPeriod, setRetentionPeriod] = useState('90');

  const totalSent = notifications.length;
  const avgDelivery = Math.round(notifications.reduce((s, n) => s + parseInt(n.deliveredRate), 0) / totalSent);
  const avgRead = Math.round(notifications.reduce((s, n) => s + parseInt(n.readRate), 0) / totalSent);

  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Notification Center</h1>

      <TabBar tabs={['All Notifications', 'Delivery Log', 'Send Notification', 'Settings']} active={activeTab} onChange={setActiveTab} theme={theme} />

      {/* ─── All Notifications Tab ─── */}
      {activeTab === 'All Notifications' && (
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-3">
            <StatCard icon={Bell} label="Sent This Month" value={String(totalSent)} color="bg-blue-500" sub="notifications" theme={theme} />
            <StatCard icon={Send} label="Avg Delivery Rate" value={`${avgDelivery}%`} color="bg-emerald-500" sub="delivered" theme={theme} />
            <StatCard icon={Eye} label="Avg Read Rate" value={`${avgRead}%`} color="bg-purple-500" sub="opened" theme={theme} />
            <StatCard icon={Clock} label="Pending" value="2" color="bg-amber-500" sub="queued" theme={theme} />
          </div>

          <div className="flex items-center gap-3">
            <SearchBar placeholder="Search notifications..." theme={theme} icon={Search} />
            <select className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
              <option>All Categories</option><option>Finance</option><option>PTM</option><option>Transport</option><option>Academic</option><option>Staff</option><option>Emergency</option>
            </select>
            <select className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
              <option>All Types</option><option>Auto</option><option>Manual</option><option>System</option>
            </select>
            <select className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
              <option>All Priorities</option><option>Normal</option><option>Important</option><option>Urgent</option><option>Critical</option>
            </select>
          </div>

          {/* Notification Table */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className={`border-b ${theme.border}`}>
                    {['Title', 'Type', 'Category', 'Sent To', 'Channel', 'Delivered', 'Read', 'Priority', 'Sent At'].map(h => (
                      <th key={h} className={`text-left py-2 px-2 ${theme.iconColor} font-bold text-[10px]`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {notifications.map(n => (
                    <React.Fragment key={n.id}>
                      <tr className={`border-b ${theme.border} ${theme.buttonHover} cursor-pointer`} onClick={() => setExpandedNotif(expandedNotif === n.id ? null : n.id)}>
                        <td className={`py-2.5 px-2 font-bold ${theme.highlight}`}>{n.title}</td>
                        <td className="py-2.5 px-2"><span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${typeColor(n.type)}`}>{n.type}</span></td>
                        <td className={`py-2.5 px-2 ${theme.iconColor}`}>{n.category}</td>
                        <td className={`py-2.5 px-2 ${theme.iconColor} text-[10px]`}>{n.sentTo}</td>
                        <td className={`py-2.5 px-2 ${theme.iconColor} text-[10px]`}>{n.channel}</td>
                        <td className="py-2.5 px-2"><span className={`text-[10px] font-bold ${parseInt(n.deliveredRate) >= 95 ? 'text-emerald-600' : 'text-amber-600'}`}>{n.deliveredRate}</span></td>
                        <td className="py-2.5 px-2"><span className={`text-[10px] font-bold ${parseInt(n.readRate) >= 80 ? 'text-emerald-600' : parseInt(n.readRate) >= 60 ? 'text-amber-600' : 'text-red-600'}`}>{n.readRate}</span></td>
                        <td className="py-2.5 px-2"><span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${priorityColor(n.priority)}`}>{n.priority}</span></td>
                        <td className={`py-2.5 px-2 ${theme.iconColor} text-[10px]`}>{n.sentAt}</td>
                      </tr>
                      {expandedNotif === n.id && (
                        <tr>
                          <td colSpan={9} className="p-0">
                            <div className={`p-3 ${theme.secondaryBg}`}>
                              <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Delivery Breakdown</p>
                              <div className="grid grid-cols-3 gap-3">
                                <div className={`p-2 rounded-lg ${theme.cardBg} text-center`}>
                                  <p className={`text-lg font-bold text-emerald-600`}>{n.deliveredRate}</p>
                                  <p className={`text-[9px] ${theme.iconColor}`}>Delivered</p>
                                </div>
                                <div className={`p-2 rounded-lg ${theme.cardBg} text-center`}>
                                  <p className={`text-lg font-bold text-blue-600`}>{n.readRate}</p>
                                  <p className={`text-[9px] ${theme.iconColor}`}>Read</p>
                                </div>
                                <div className={`p-2 rounded-lg ${theme.cardBg} text-center`}>
                                  <p className={`text-lg font-bold text-amber-600`}>{100 - parseInt(n.readRate)}%</p>
                                  <p className={`text-[9px] ${theme.iconColor}`}>Unread</p>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ─── Delivery Log Tab ─── */}
      {activeTab === 'Delivery Log' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SearchBar placeholder="Search recipient..." theme={theme} icon={Search} />
              <select className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                <option>All Notifications</option>
                {notifications.map(n => <option key={n.id}>{n.title}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => window.alert('Resending to 2 unread recipients... (Blueprint demo)')} className={`text-[10px] px-3 py-1.5 rounded-lg ${theme.secondaryBg} ${theme.iconColor} font-bold flex items-center gap-1`}>
                <RefreshCw size={10} /> Resend to Unread
              </button>
              <button onClick={() => window.alert('Delivery log exported! (Blueprint demo)')} className={`text-[10px] px-3 py-1.5 rounded-lg ${theme.secondaryBg} ${theme.iconColor} font-bold flex items-center gap-1`}>
                <Download size={10} /> Export Log
              </button>
            </div>
          </div>

          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Delivery Details — Fee Reminder (March Due)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className={`border-b ${theme.border}`}>
                    {['Recipient', 'Channel', 'Delivered', 'Read', 'Time'].map(h => (
                      <th key={h} className={`text-left py-2 px-3 ${theme.iconColor} font-bold`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {deliveryLog.map((d, i) => (
                    <tr key={i} className={`border-b ${theme.border} ${theme.buttonHover}`}>
                      <td className={`py-2.5 px-3 font-bold ${theme.highlight}`}>{d.recipient}</td>
                      <td className={`py-2.5 px-3`}>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                          d.channel === 'Push' ? 'bg-blue-100 text-blue-700' :
                          d.channel === 'SMS' ? 'bg-emerald-100 text-emerald-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>{d.channel}</span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`text-[10px] font-bold ${d.delivered === 'Yes' ? 'text-emerald-600' : 'text-red-600'}`}>{d.delivered}</span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`text-[10px] font-bold ${d.read === 'Yes' ? 'text-emerald-600' : d.read === 'No' ? 'text-amber-600' : 'text-gray-400'}`}>{d.read}</span>
                      </td>
                      <td className={`py-2.5 px-3 ${theme.iconColor} text-[10px]`}>{d.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ─── Send Notification Tab ─── */}
      {activeTab === 'Send Notification' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 max-w-2xl space-y-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight}`}>Create Notification</h3>

          <div>
            <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Title <span className="text-red-500">*</span></label>
            <input placeholder="Notification title..." className={`w-full text-xs p-2.5 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`} />
          </div>

          <div>
            <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Message <span className="text-red-500">*</span></label>
            <textarea rows={4} placeholder="Write your notification message..." className={`w-full text-xs p-2.5 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight} resize-none`} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Category</label>
              <select value={sendCategory} onChange={e => setSendCategory(e.target.value)} className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`}>
                <option>Finance</option><option>Academic</option><option>Transport</option><option>PTM</option><option>Emergency</option><option>Staff</option><option>Custom</option>
              </select>
            </div>
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Priority</label>
              <select value={sendPriority} onChange={e => setSendPriority(e.target.value)} className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`}>
                <option>Normal</option><option>Important</option><option>Urgent</option><option>Critical</option>
              </select>
            </div>
          </div>

          {/* Target */}
          <div>
            <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Target Audience</label>
            <div className="flex gap-2 mb-2">
              {['All', 'Staff', 'Parents', 'Students'].map(t => (
                <button key={t} onClick={() => setSendTarget(t)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all ${sendTarget === t ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.iconColor}`}`}>
                  {t}
                </button>
              ))}
            </div>
            {sendTarget === 'Parents' && (
              <div className="flex gap-2">
                <select className={`flex-1 text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`}>
                  <option>All Classes</option><option>Class 10</option><option>Class 9</option><option>Class 8</option>
                </select>
                <select className={`flex-1 text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`}>
                  <option>All Sections</option><option>A</option><option>B</option><option>C</option>
                </select>
              </div>
            )}
            {sendTarget === 'Parents' && (
              <select className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight} mt-2`}>
                <option>All Routes</option><option>Route 1</option><option>Route 2</option><option>Route 3</option>
              </select>
            )}
          </div>

          {/* Channels */}
          <div>
            <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Channels</label>
            <div className="flex gap-3">
              <label className="flex items-center gap-1.5">
                <input type="checkbox" checked={sendChannels.push} onChange={() => setSendChannels(p => ({ ...p, push: !p.push }))} className="accent-slate-600" />
                <Smartphone size={12} className={theme.iconColor} />
                <span className={`text-xs ${theme.iconColor}`}>Push</span>
              </label>
              <label className="flex items-center gap-1.5">
                <input type="checkbox" checked={sendChannels.sms} onChange={() => setSendChannels(p => ({ ...p, sms: !p.sms }))} className="accent-slate-600" />
                <MessageSquare size={12} className={theme.iconColor} />
                <span className={`text-xs ${theme.iconColor}`}>SMS</span>
              </label>
              <label className="flex items-center gap-1.5">
                <input type="checkbox" checked={sendChannels.email} onChange={() => setSendChannels(p => ({ ...p, email: !p.email }))} className="accent-slate-600" />
                <Mail size={12} className={theme.iconColor} />
                <span className={`text-xs ${theme.iconColor}`}>Email</span>
              </label>
            </div>
          </div>

          {/* Schedule */}
          <div>
            <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Schedule</label>
            <div className="flex gap-2">
              <button onClick={() => setSendSchedule('now')} className={`flex-1 text-xs py-2 rounded-lg font-bold transition-all ${sendSchedule === 'now' ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.iconColor}`}`}>Send Now</button>
              <button onClick={() => setSendSchedule('later')} className={`flex-1 text-xs py-2 rounded-lg font-bold transition-all ${sendSchedule === 'later' ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.iconColor}`}`}>Schedule Later</button>
            </div>
          </div>

          {sendSchedule === 'later' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Date</label>
                <input type="date" className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`} />
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Time</label>
                <input type="time" className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`} />
              </div>
            </div>
          )}

          <button onClick={() => setShowConfirmSend(true)} className={`w-full text-xs py-3 rounded-xl ${theme.primary} text-white font-bold flex items-center justify-center gap-1`}>
            <Send size={14} /> {sendSchedule === 'now' ? 'Send Notification' : 'Schedule Notification'}
          </button>
        </div>
      )}

      {/* ─── Settings Tab ─── */}
      {activeTab === 'Settings' && (
        <div className="space-y-4">
          {/* Auto-notification Triggers */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Auto-notification Triggers</h3>
            <div className="space-y-2">
              {[
                { label: 'Fee reminder (days before due)', state: feeReminder, toggle: () => setFeeReminder(!feeReminder), config: '3 days', channel: 'Push + SMS' },
                { label: 'Attendance absent alert', state: absentAlert, toggle: () => setAbsentAlert(!absentAlert), config: 'Immediate', channel: 'Push + SMS' },
                { label: 'Homework submission', state: hwSubmission, toggle: () => setHwSubmission(!hwSubmission), config: 'On submit', channel: 'Push' },
                { label: 'Bus delay notification', state: busDelay, toggle: () => setBusDelay(!busDelay), config: '> 10 min', channel: 'Push + SMS' },
                { label: 'Birthday wish', state: birthdayWish, toggle: () => setBirthdayWish(!birthdayWish), config: '8:00 AM', channel: 'Push' },
              ].map((trigger, i) => (
                <div key={i} className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
                  <div className="flex-1">
                    <p className={`text-xs font-bold ${theme.highlight}`}>{trigger.label}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className={`text-[9px] ${theme.iconColor}`}>Timing: {trigger.config}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${theme.secondaryBg} border ${theme.border} ${theme.iconColor} font-bold`}>{trigger.channel}</span>
                    </div>
                  </div>
                  <button onClick={trigger.toggle} className={`w-9 h-5 rounded-full relative transition-colors ${trigger.state ? theme.primary : 'bg-gray-300'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${trigger.state ? 'translate-x-4' : 'translate-x-0.5'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quiet Hours & Limits */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
              <div className="flex items-center gap-2 mb-3">
                <VolumeX size={16} className={theme.primaryText} />
                <h3 className={`text-sm font-bold ${theme.highlight}`}>Quiet Hours</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Start Time</label>
                  <input type="time" value={quietHoursStart} onChange={e => setQuietHoursStart(e.target.value)} className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`} />
                </div>
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>End Time</label>
                  <input type="time" value={quietHoursEnd} onChange={e => setQuietHoursEnd(e.target.value)} className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`} />
                </div>
                <p className={`text-[9px] ${theme.iconColor}`}>Notifications will be queued and delivered after quiet hours end</p>
              </div>
            </div>

            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
              <div className="flex items-center gap-2 mb-3">
                <Shield size={16} className={theme.primaryText} />
                <h3 className={`text-sm font-bold ${theme.highlight}`}>Limits & Retention</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Max notifications per user per day</label>
                  <input type="number" value={maxPerDay} onChange={e => setMaxPerDay(e.target.value)} className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`} />
                </div>
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Notification retention period</label>
                  <select value={retentionPeriod} onChange={e => setRetentionPeriod(e.target.value)} className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`}>
                    <option value="30">30 days</option>
                    <option value="60">60 days</option>
                    <option value="90">90 days</option>
                    <option value="180">180 days</option>
                  </select>
                </div>
                <button onClick={() => window.alert('Old notifications purged! (Blueprint demo)')} className={`w-full text-[10px] py-2 rounded-lg ${theme.secondaryBg} ${theme.iconColor} font-bold`}>
                  Purge Notifications Older Than {retentionPeriod} Days
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Confirmation Modal ─── */}
      {showConfirmSend && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowConfirmSend(false)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 w-full max-w-sm shadow-xl`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Confirm Send</h3>
              <button onClick={() => setShowConfirmSend(false)} className={`p-1 rounded-lg ${theme.buttonHover} ${theme.iconColor}`}><X size={14} /></button>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg} mb-4`}>
              <div className="flex items-center gap-2 mb-2">
                <Users size={14} className={theme.primaryText} />
                <span className={`text-xs font-bold ${theme.highlight}`}>Recipients</span>
              </div>
              <p className={`text-[10px] ${theme.iconColor}`}>
                {sendTarget === 'All' ? 'All users (650)' :
                 sendTarget === 'Staff' ? 'All staff (98)' :
                 sendTarget === 'Parents' ? 'All parents (320)' :
                 'All students (232)'}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${priorityColor(sendPriority)}`}>{sendPriority}</span>
                <span className={`text-[9px] ${theme.iconColor}`}>
                  via {[sendChannels.push && 'Push', sendChannels.sms && 'SMS', sendChannels.email && 'Email'].filter(Boolean).join(' + ') || 'No channel'}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowConfirmSend(false)} className={`flex-1 text-xs py-2.5 rounded-xl ${theme.secondaryBg} ${theme.iconColor} font-bold`}>Cancel</button>
              <button onClick={() => { setShowConfirmSend(false); window.alert('Notification sent successfully! (Blueprint demo)'); }}
                className={`flex-1 text-xs py-2.5 rounded-xl ${theme.primary} text-white font-bold flex items-center justify-center gap-1`}>
                <Send size={12} /> Confirm & Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
