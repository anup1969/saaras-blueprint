'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { TabBar, StatusBadge, DataTable } from '@/components/shared';
import {
  Calendar, Bell, Check,
  AlertTriangle, Send,
  User, Info,
  CheckCircle, ChevronRight, X,
} from 'lucide-react';
import { ChatsView } from '@/components/ChatModule';
import type { ChildProfile } from '../_components/types';
import { communicationData, childrenData } from '../_components/data';

export default function CommunicationModule({ theme, child }: { theme: Theme; child: ChildProfile }) {
  const comm = communicationData[child.id];
  const [activeTab, setActiveTab] = useState('Notices');
  const [expandedNotice, setExpandedNotice] = useState<string | null>(null);
  const [acknowledgedNotices, setAcknowledgedNotices] = useState<Set<string>>(new Set());
  const [showVisitorForm, setShowVisitorForm] = useState(false);
  const [visitorSubmitted, setVisitorSubmitted] = useState(false);

  // suppress unused variable warning — showVisitorForm/setShowVisitorForm kept for future use
  void showVisitorForm;
  void setShowVisitorForm;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className={`text-lg font-bold ${theme.highlight}`}>Communication</h2>
        <button className={`flex items-center gap-1 px-3 py-1.5 rounded-lg ${theme.primary} text-white text-xs font-bold`}>
          <Send size={12} /> Message Teacher
        </button>
      </div>

      <TabBar tabs={['Notices', 'Messages', 'PTM Schedule', 'Pre-Register Visit', 'Compose', 'Chat']} active={activeTab} onChange={setActiveTab} theme={theme} />
      <p className="text-[10px] text-amber-600 mb-1">Communication mode: Reply Only -- set by SSA. You can reply to teacher messages.</p>

      {activeTab === 'Notices' && (
        <div className="space-y-3">
          {comm.notices.map((notice) => (
            <div key={notice.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden ${notice.urgent ? 'border-l-2 border-l-red-500' : ''}`}>
              <button
                onClick={() => setExpandedNotice(expandedNotice === notice.id ? null : notice.id)}
                className="w-full p-4 flex items-center gap-4 text-left"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  notice.urgent ? 'bg-red-500 text-white' : `${theme.secondaryBg} ${theme.iconColor}`
                }`}>
                  {notice.urgent ? <AlertTriangle size={16} /> : <Bell size={16} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-bold ${theme.highlight}`}>{notice.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-[10px] ${theme.iconColor}`}>{notice.from}</span>
                    <span className={`text-[10px] ${theme.iconColor}`}>{notice.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    notice.category === 'Event' ? 'bg-emerald-100 text-emerald-700' :
                    notice.category === 'Academic' ? 'bg-blue-100 text-blue-700' :
                    notice.category === 'Meeting' ? 'bg-purple-100 text-purple-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>{notice.category}</span>
                  {notice.urgent && <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-red-100 text-red-700">Urgent</span>}
                  <ChevronRight size={14} className={`${theme.iconColor} transition-transform ${expandedNotice === notice.id ? 'rotate-90' : ''}`} />
                </div>
              </button>
              {expandedNotice === notice.id && (
                <div className={`px-4 pb-4 border-t ${theme.border}`}>
                  <p className={`text-xs ${theme.iconColor} leading-relaxed mt-3`}>{notice.content}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className={`text-[10px] ${theme.iconColor}`}>
                      {notice.id === 'N1' ? '245/280' : notice.id === 'N2' ? '198/280' : notice.id === 'N3' ? '260/280' : '172/280'} parents acknowledged
                    </span>
                    {acknowledgedNotices.has(notice.id) ? (
                      <span className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-600 bg-emerald-50 cursor-default">
                        <Check size={12} /> Acknowledged
                      </span>
                    ) : (
                      <button
                        onClick={() => setAcknowledgedNotices(prev => new Set(prev).add(notice.id))}
                        className={`px-3 py-1.5 rounded-lg ${theme.primary} text-white text-xs font-bold hover:opacity-90 transition-all`}
                      >
                        Acknowledge
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'Messages' && (
        <div className="space-y-3">
          {comm.messages.map((msg) => (
            <div key={msg.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 ${!msg.read ? 'border-l-2 border-l-blue-500' : ''}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full ${theme.secondaryBg} flex items-center justify-center`}>
                    <User size={14} className={theme.iconColor} />
                  </div>
                  <div>
                    <p className={`text-xs font-bold ${theme.highlight}`}>{msg.from}</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>{msg.date}</p>
                  </div>
                </div>
                {!msg.read && <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-100 text-blue-700">New</span>}
              </div>
              <h4 className={`text-sm font-bold ${theme.highlight} mb-1`}>{msg.subject}</h4>
              <p className={`text-xs ${theme.iconColor} leading-relaxed`}>{msg.content}</p>
              <div className="flex items-center gap-2 mt-3">
                <button className={`px-3 py-1 rounded-lg ${theme.primary} text-white text-[10px] font-bold`}>Reply</button>
                <button className={`px-3 py-1 rounded-lg ${theme.secondaryBg} ${theme.iconColor} text-[10px] font-bold`}>Mark Read</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'PTM Schedule' && (
        <div className="space-y-3">
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={16} className={theme.primaryText} />
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Upcoming Parent-Teacher Meeting</h3>
            </div>
            <div className="space-y-3">
              {comm.ptm.map((slot, i) => (
                <div key={i} className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${theme.cardBg} border ${theme.border} flex flex-col items-center justify-center`}>
                      <span className={`text-[10px] font-bold ${theme.highlight}`}>{slot.time.split(' ')[0]}</span>
                      <span className={`text-[8px] ${theme.iconColor}`}>{slot.time.split(' ')[1]}</span>
                    </div>
                    <div>
                      <p className={`text-xs font-bold ${theme.highlight}`}>{slot.teacher}</p>
                      <p className={`text-[10px] ${theme.iconColor}`}>{slot.subject}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] ${theme.iconColor}`}>{slot.date}</span>
                    <StatusBadge status={slot.status} theme={theme} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <p className={`text-xs ${theme.iconColor} leading-relaxed`}>
              <Info size={12} className="inline mr-1" />
              Please arrive 10 minutes before your first slot. Carry the student diary. Time slots are approximately 20 minutes each. If you need to reschedule, please contact the class teacher.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'Pre-Register Visit' && (
        <div className="space-y-3">
          {!visitorSubmitted ? (
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
              <h3 className={`text-sm font-bold ${theme.highlight} mb-4`}>Pre-Register Your Visit</h3>
              <p className={`text-xs ${theme.iconColor} mb-4`}>Pre-register your visit to avoid waiting at the gate. Show the confirmation at the school entrance.</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Purpose of Visit *</label>
                  <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`}>
                    <option>Select Purpose...</option>
                    <option>PTM / Parent-Teacher Meeting</option>
                    <option>Fee Payment</option>
                    <option>Meet Class Teacher</option>
                    <option>Meet Principal</option>
                    <option>Document Collection</option>
                    <option>Admission Enquiry</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Preferred Date *</label>
                  <input type="date" defaultValue="2026-02-26" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`} />
                </div>
                <div>
                  <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Preferred Time *</label>
                  <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`}>
                    <option>Select Time Slot...</option>
                    <option>9:00 AM - 10:00 AM</option>
                    <option>10:00 AM - 11:00 AM</option>
                    <option>11:00 AM - 12:00 PM</option>
                    <option>12:00 PM - 1:00 PM</option>
                    <option>2:00 PM - 3:00 PM</option>
                    <option>3:00 PM - 4:00 PM</option>
                  </select>
                </div>
                <div>
                  <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Notes</label>
                  <input placeholder="Any additional details..." className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`} />
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 mt-4">
                <button
                  onClick={() => { setVisitorSubmitted(true); window.alert('Visit pre-registered! Show this confirmation at the gate. (Blueprint demo)'); }}
                  className={`flex items-center gap-1 px-4 py-2 ${theme.primary} text-white text-xs font-bold rounded-xl hover:opacity-90 transition-all`}
                >
                  <Send size={12} /> Pre-Register Visit
                </button>
              </div>
            </div>
          ) : (
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 border-l-4 border-l-emerald-500`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <h3 className={`text-sm font-bold ${theme.highlight}`}>Visit Pre-Registered Successfully!</h3>
                  <p className={`text-[10px] ${theme.iconColor}`}>Show this confirmation at the school gate</p>
                </div>
              </div>
              <div className={`p-3 rounded-xl ${theme.secondaryBg} space-y-1`}>
                <div className="flex justify-between">
                  <span className={`text-xs ${theme.iconColor}`}>Visit ID</span>
                  <span className={`text-xs font-bold font-mono ${theme.primaryText}`}>VPR-2026-0042</span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-xs ${theme.iconColor}`}>Purpose</span>
                  <span className={`text-xs font-bold ${theme.highlight}`}>Meet Class Teacher</span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-xs ${theme.iconColor}`}>Date</span>
                  <span className={`text-xs font-bold ${theme.highlight}`}>26 Feb 2026</span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-xs ${theme.iconColor}`}>Time Slot</span>
                  <span className={`text-xs font-bold ${theme.highlight}`}>10:00 AM - 11:00 AM</span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-xs ${theme.iconColor}`}>Status</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">Confirmed</span>
                </div>
              </div>
              <button
                onClick={() => setVisitorSubmitted(false)}
                className={`mt-3 px-3 py-1.5 rounded-lg ${theme.secondaryBg} ${theme.iconColor} text-xs font-bold`}
              >
                Register Another Visit
              </button>
            </div>
          )}

          {/* Previous Visits */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Previous Pre-Registrations</h3>
            <DataTable
              headers={['Visit ID', 'Date', 'Purpose', 'Time', 'Status']}
              rows={[
                [
                  <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>VPR-2026-0041</span>,
                  <span key="d" className={theme.iconColor}>20 Feb 2026</span>,
                  <span key="p" className={`font-bold ${theme.highlight}`}>PTM</span>,
                  <span key="t" className={theme.iconColor}>10:30 AM</span>,
                  <span key="s" className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">Completed</span>,
                ],
                [
                  <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>VPR-2026-0033</span>,
                  <span key="d" className={theme.iconColor}>05 Feb 2026</span>,
                  <span key="p" className={`font-bold ${theme.highlight}`}>Fee Payment</span>,
                  <span key="t" className={theme.iconColor}>11:00 AM</span>,
                  <span key="s" className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">Completed</span>,
                ],
                [
                  <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>VPR-2026-0028</span>,
                  <span key="d" className={theme.iconColor}>20 Jan 2026</span>,
                  <span key="p" className={`font-bold ${theme.highlight}`}>Document Collection</span>,
                  <span key="t" className={theme.iconColor}>2:00 PM</span>,
                  <span key="s" className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">Completed</span>,
                ],
              ]}
              theme={theme}
            />
          </div>
        </div>
      )}

      {activeTab === 'Compose' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-4`}>Send Message to Teacher</h3>
          <div className="space-y-3">
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>To</label>
              <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`}>
                <option>Select Teacher...</option>
                <option>{child.classTeacher} (Class Teacher)</option>
                {child.id === 'child1' ? (
                  <>
                    <option>Mr. Vikram Desai (Mathematics)</option>
                    <option>Dr. Meena Joshi (Science)</option>
                    <option>Mrs. Kavita Nair (English)</option>
                    <option>Mr. Arjun Rao (Computer Science)</option>
                    <option>Mrs. Rekha Gupta (Hindi)</option>
                  </>
                ) : (
                  <>
                    <option>Mrs. Priya Menon (Mathematics)</option>
                    <option>Mrs. Lakshmi Iyer (Science)</option>
                    <option>Ms. Divya Kapoor (English)</option>
                    <option>Mrs. Asha Tiwari (Hindi)</option>
                  </>
                )}
              </select>
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Subject</label>
              <input
                placeholder="Enter message subject..."
                className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`}
              />
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Message</label>
              <textarea
                placeholder="Type your message here..."
                rows={5}
                className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none resize-none`}
              />
            </div>
            <div className="flex items-center justify-between">
              <p className={`text-[10px] ${theme.iconColor}`}>Messages are reviewed by the school before delivery.</p>
              <button className={`flex items-center gap-1 px-4 py-2 ${theme.primary} text-white text-xs font-bold rounded-xl`}>
                <Send size={12} /> Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Tab */}
      {activeTab === 'Chat' && <ChatsView theme={theme} compact />}
    </div>
  );
}
