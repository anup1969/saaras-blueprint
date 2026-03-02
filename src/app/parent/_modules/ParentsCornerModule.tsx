'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import {
  Lock, Unlock, Shield, FileText, MessageSquare, CreditCard,
  Calendar, AlertTriangle, Eye, EyeOff, Fingerprint, CheckCircle,
} from 'lucide-react';
import type { ChildProfile } from '../_components/types';

export default function ParentsCornerModule({ theme, child }: { theme: Theme; child: ChildProfile }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [authMethod, setAuthMethod] = useState<'pin' | 'biometric'>('pin');

  const handleUnlock = () => {
    if (pin === '1234' || authMethod === 'biometric') {
      setIsUnlocked(true);
      setPin('');
    }
  };

  if (!isUnlocked) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-2xl ${theme.primary} text-white flex items-center justify-center`}>
            <Lock size={20} />
          </div>
          <div>
            <h2 className={`text-lg font-bold ${theme.highlight}`}>Parents Corner</h2>
            <p className={`text-xs ${theme.iconColor}`}>Secure area for parents only — not accessible by students</p>
          </div>
        </div>

        <div className={`${theme.cardBg} rounded-2xl border-2 border-amber-200 p-6 max-w-md mx-auto`}>
          <div className="text-center mb-6">
            <div className={`w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-3`}>
              <Shield size={28} className="text-amber-600" />
            </div>
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Authentication Required</h3>
            <p className={`text-[10px] ${theme.iconColor} mt-1`}>
              This section contains critical actions like leave applications, fee payments, and direct communication with teachers. Verify your identity to continue.
            </p>
          </div>

          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setAuthMethod('pin')}
              className={`flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-bold transition-all ${
                authMethod === 'pin' ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.iconColor}`
              }`}
            >
              <Lock size={14} /> PIN Code
            </button>
            <button
              onClick={() => setAuthMethod('biometric')}
              className={`flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-bold transition-all ${
                authMethod === 'biometric' ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.iconColor}`
              }`}
            >
              <Fingerprint size={14} /> Biometric
            </button>
          </div>

          {authMethod === 'pin' ? (
            <div className="space-y-3">
              <div className="relative">
                <input
                  type={showPin ? 'text' : 'password'}
                  value={pin}
                  onChange={e => setPin(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleUnlock()}
                  placeholder="Enter 4-digit PIN"
                  maxLength={4}
                  className={`w-full text-center text-lg tracking-[0.5em] px-4 py-3 rounded-xl border ${theme.border} ${theme.cardBg} ${theme.highlight} outline-none`}
                />
                <button onClick={() => setShowPin(!showPin)} className={`absolute right-3 top-1/2 -translate-y-1/2 ${theme.iconColor}`}>
                  {showPin ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <button
                onClick={handleUnlock}
                disabled={pin.length < 4}
                className={`w-full py-3 rounded-xl text-sm font-bold text-white ${theme.primary} ${pin.length < 4 ? 'opacity-50' : ''}`}
              >
                Unlock Parents Corner
              </button>
              <p className={`text-[9px] ${theme.iconColor} text-center`}>Demo PIN: 1234</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className={`p-6 rounded-xl ${theme.secondaryBg} text-center`}>
                <Fingerprint size={48} className={`${theme.iconColor} mx-auto mb-2`} />
                <p className={`text-xs ${theme.iconColor}`}>Place your finger on the sensor</p>
              </div>
              <button
                onClick={handleUnlock}
                className={`w-full py-3 rounded-xl text-sm font-bold text-white ${theme.primary}`}
              >
                Simulate Biometric Unlock
              </button>
            </div>
          )}
        </div>

        <div className={`flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200 max-w-md mx-auto`}>
          <AlertTriangle size={14} className="text-amber-600 shrink-0" />
          <p className="text-[10px] text-amber-700">
            This area is protected to prevent students from accessing critical school communication, leave applications, or fee payment features when using a shared device.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center`}>
            <Unlock size={20} />
          </div>
          <div>
            <h2 className={`text-lg font-bold ${theme.highlight}`}>Parents Corner</h2>
            <p className={`text-xs ${theme.iconColor}`}>Secure area — verified as Parent of {child.name}</p>
          </div>
        </div>
        <button
          onClick={() => setIsUnlocked(false)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-100 text-red-700 text-xs font-bold"
        >
          <Lock size={12} /> Lock
        </button>
      </div>

      <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
        <CheckCircle size={14} className="text-emerald-600 shrink-0" />
        <p className="text-[10px] text-emerald-700 font-bold">Identity verified. Auto-locks after 10 minutes of inactivity.</p>
      </div>

      {/* Leave Application */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center gap-2 mb-3">
          <Calendar size={14} className={theme.iconColor} />
          <h3 className={`text-sm font-bold ${theme.highlight}`}>Leave Application</h3>
        </div>
        <div className="space-y-2">
          {[
            { type: 'Sick Leave', dates: '28 Feb - 01 Mar 2026', status: 'Approved', reason: 'Fever and cold' },
            { type: 'Family Event', dates: '15 Mar 2026', status: 'Pending', reason: 'Family wedding' },
          ].map((leave, i) => (
            <div key={i} className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>{leave.type}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{leave.dates} — {leave.reason}</p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                leave.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
              }`}>{leave.status}</span>
            </div>
          ))}
          <button className={`w-full py-2.5 rounded-xl text-xs font-bold text-white ${theme.primary} mt-2`}>
            + Apply for New Leave
          </button>
        </div>
      </div>

      {/* Direct Communication with Teachers */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare size={14} className={theme.iconColor} />
          <h3 className={`text-sm font-bold ${theme.highlight}`}>Direct Communication with Teachers</h3>
          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 font-bold">Parent-Only</span>
        </div>
        <div className="space-y-2">
          {[
            { teacher: child.classTeacher, role: 'Class Teacher', lastMsg: 'Thank you for attending the PTM. Aarav is doing well.', time: '2 days ago', unread: false },
            { teacher: 'Mr. Vikram Desai', role: 'Mathematics', lastMsg: 'Please ensure Aarav practices trigonometry daily.', time: '4 days ago', unread: true },
            { teacher: 'Dr. Meena Joshi', role: 'Science', lastMsg: 'Science project materials list shared.', time: '1 week ago', unread: false },
          ].map((chat, i) => (
            <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${theme.secondaryBg} cursor-pointer ${theme.buttonHover} transition-all ${chat.unread ? `border-l-2 border-blue-500` : ''}`}>
              <div className={`w-8 h-8 rounded-full ${theme.primary} text-white flex items-center justify-center text-[10px] font-bold shrink-0`}>
                {chat.teacher.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{chat.teacher}</p>
                  <span className={`text-[9px] ${theme.iconColor}`}>{chat.role}</span>
                </div>
                <p className={`text-[10px] ${theme.iconColor} truncate`}>{chat.lastMsg}</p>
              </div>
              <span className={`text-[9px] ${theme.iconColor} shrink-0`}>{chat.time}</span>
              {chat.unread && <span className="w-2 h-2 bg-blue-500 rounded-full shrink-0" />}
            </div>
          ))}
        </div>
      </div>

      {/* Fee Payment (Quick Pay) */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center gap-2 mb-3">
          <CreditCard size={14} className={theme.iconColor} />
          <h3 className={`text-sm font-bold ${theme.highlight}`}>Fee Payment</h3>
          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 font-bold">Parent-Only</span>
        </div>
        <div className="space-y-2">
          <div className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Term 4 — Tuition + Transport</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Due: 10 Mar 2026</p>
            </div>
            <div className="text-right">
              <p className={`text-sm font-bold text-red-600`}>{'\u20B9'}18,500</p>
              <button className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-[10px] font-bold mt-1">Pay Now</button>
            </div>
          </div>
        </div>
      </div>

      {/* Sensitive Documents */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center gap-2 mb-3">
          <FileText size={14} className={theme.iconColor} />
          <h3 className={`text-sm font-bold ${theme.highlight}`}>Sensitive Documents</h3>
        </div>
        <div className="space-y-2">
          {[
            { name: 'Transfer Certificate Request', date: '--', status: 'Not Applied' },
            { name: 'Bonafide Certificate', date: '15 Jan 2026', status: 'Downloaded' },
            { name: 'Fee Receipt — Term 3', date: '12 Jan 2026', status: 'Downloaded' },
            { name: 'Report Card — Mid-Term', date: '20 Nov 2025', status: 'Downloaded' },
          ].map((doc, i) => (
            <div key={i} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex items-center gap-2">
                <FileText size={12} className={theme.iconColor} />
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>{doc.name}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{doc.date}</p>
                </div>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                doc.status === 'Downloaded' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
              }`}>{doc.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Edit Request */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center gap-2 mb-3">
          <Shield size={14} className={theme.iconColor} />
          <h3 className={`text-sm font-bold ${theme.highlight}`}>Profile & Contact Updates</h3>
          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 font-bold">Parent-Only</span>
        </div>
        <p className={`text-[10px] ${theme.iconColor} mb-3`}>Changes require admin verification before taking effect.</p>
        <div className="grid grid-cols-2 gap-2">
          <button className={`p-3 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} text-left transition-all`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Update Phone Number</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Current: +91 98250 12345</p>
          </button>
          <button className={`p-3 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} text-left transition-all`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Update Email</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Current: rajesh@email.com</p>
          </button>
          <button className={`p-3 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} text-left transition-all`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Update Address</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Request change</p>
          </button>
          <button className={`p-3 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} text-left transition-all`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Update Emergency Contact</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Request change</p>
          </button>
        </div>
      </div>
    </div>
  );
}
