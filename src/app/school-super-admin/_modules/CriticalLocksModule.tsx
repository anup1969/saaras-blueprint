'use client';

import React, { useState } from 'react';
import { Lock, Key, Phone, Mail, CheckCircle, AlertTriangle, Shield } from 'lucide-react';
import { StatCard } from '@/components/shared';
import { SectionCard } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

// ─── OTP VERIFICATION MODAL (internal, not exported) ──────
function OTPVerificationModal({ theme, onClose, onVerify }: { theme: Theme; onClose: () => void; onVerify: () => void }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [verified, setVerified] = useState(false);

  React.useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [timer]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleVerify = () => {
    setVerified(true);
    setTimeout(() => {
      onVerify();
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className={`${theme.cardBg} rounded-2xl shadow-2xl border ${theme.border} w-full max-w-md p-6`}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
            <Lock size={18} className="text-rose-600" />
          </div>
          <div>
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Critical Change &mdash; OTP Required</h3>
            <p className={`text-[10px] ${theme.iconColor}`}>This field is locked by Super Admin</p>
          </div>
        </div>

        {/* Info */}
        <div className={`${theme.secondaryBg} rounded-xl p-3 mb-4`}>
          <p className={`text-xs ${theme.highlight}`}>An OTP has been sent to the registered Trustee/Principal.</p>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5">
              <Phone size={10} className={theme.iconColor} />
              <span className={`text-[10px] ${theme.iconColor}`}>+91 ****43210</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail size={10} className={theme.iconColor} />
              <span className={`text-[10px] ${theme.iconColor}`}>p****@school.edu</span>
            </div>
          </div>
        </div>

        {verified ? (
          <div className="text-center py-6">
            <CheckCircle size={40} className="text-emerald-500 mx-auto mb-2" />
            <p className={`text-sm font-bold text-emerald-700`}>OTP Verified Successfully</p>
            <p className={`text-[10px] ${theme.iconColor} mt-1`}>Proceeding with the change...</p>
          </div>
        ) : (
          <>
            {/* OTP Input */}
            <div className="mb-4">
              <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-2`}>Enter 6-digit OTP</p>
              <div className="flex gap-2 justify-center">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOtpChange(i, e.target.value)}
                    className={`w-10 h-12 text-center text-lg font-bold rounded-xl border-2 ${digit ? 'border-rose-400 bg-rose-50' : theme.border} ${theme.inputBg} ${theme.highlight} outline-none focus:ring-2 focus:ring-rose-300`}
                  />
                ))}
              </div>
            </div>

            {/* Timer */}
            <div className="text-center mb-4">
              {timer > 0 ? (
                <p className={`text-[10px] ${theme.iconColor}`}>Resend OTP in <span className="font-bold text-rose-600">0:{timer.toString().padStart(2, '0')}</span></p>
              ) : (
                <button className="text-[10px] font-bold text-rose-600 underline" onClick={() => setTimer(30)}>Resend OTP</button>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button onClick={onClose}
                className={`flex-1 px-4 py-2.5 ${theme.secondaryBg} rounded-xl text-xs font-bold ${theme.highlight}`}>
                Cancel
              </button>
              <button onClick={handleVerify}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-500 text-white rounded-xl text-xs font-bold`}>
                <Key size={12} /> Verify &amp; Proceed
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── CRITICAL LOCKS MODULE ──────────────────────────
export default function CriticalLocksModule({ theme }: { theme: Theme }) {
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [lockFields] = useState([
    { field: 'Fee Structure Changes', description: 'Modify fee heads, amounts', locked: true, setBy: 'Super Admin (Onboarding)', lastOTP: '18 Feb 2026, 2:30 PM' },
    { field: 'Student Profile Deletion', description: 'Permanently delete student records', locked: true, setBy: 'Super Admin (Onboarding)', lastOTP: '17 Feb 2026, 11:15 AM' },
    { field: 'Staff Profile Deletion', description: 'Permanently delete staff records', locked: true, setBy: 'Super Admin (Onboarding)', lastOTP: 'Never' },
    { field: 'Payment Mode Changes', description: 'Add/remove payment methods', locked: false, setBy: '-', lastOTP: '-' },
    { field: 'Concession Approval (>25%)', description: 'Approve large concessions', locked: false, setBy: '-', lastOTP: '-' },
    { field: 'Permission/Role Changes', description: 'Modify role permissions', locked: true, setBy: 'Super Admin (Onboarding)', lastOTP: '16 Feb 2026, 4:00 PM' },
    { field: 'Transport Route Deletion', description: 'Delete transport routes', locked: false, setBy: '-', lastOTP: '-' },
    { field: 'Data Export/Migration', description: 'Export or migrate school data', locked: false, setBy: '-', lastOTP: '-' },
    { field: 'Audit Log Access', description: 'View detailed audit logs', locked: true, setBy: 'Super Admin (Onboarding)', lastOTP: '18 Feb 2026, 9:00 AM' },
    { field: 'Academic Calendar Changes', description: 'Modify academic calendar dates', locked: true, setBy: 'Super Admin (Onboarding)', lastOTP: 'Never' },
  ]);

  const [lockEvents] = useState([
    { time: '18 Feb 2026, 2:30 PM', event: 'Fee structure edit attempted', action: 'OTP sent', result: 'Verified by Principal', status: 'success' },
    { time: '18 Feb 2026, 9:00 AM', event: 'Audit log access requested', action: 'OTP sent', result: 'Verified by Trustee', status: 'success' },
    { time: '17 Feb 2026, 3:45 PM', event: 'Student deletion attempted', action: 'OTP sent', result: 'Cancelled by user', status: 'cancelled' },
    { time: '17 Feb 2026, 11:15 AM', event: 'Student profile deletion', action: 'OTP sent', result: 'Verified by Principal', status: 'success' },
    { time: '16 Feb 2026, 4:00 PM', event: 'Role permission change', action: 'OTP sent', result: 'Verified by Trustee', status: 'success' },
    { time: '15 Feb 2026, 2:00 PM', event: 'Fee head modification attempted', action: 'OTP sent', result: 'OTP expired (not entered)', status: 'expired' },
  ]);

  const lockedCount = lockFields.filter(f => f.locked).length;

  return (
    <div className="space-y-4">
      <h2 className={`text-lg font-bold ${theme.highlight}`}>Critical Field Locks</h2>
      <p className={`text-xs ${theme.iconColor}`}>Manage locked fields that require OTP verification for changes</p>

      {/* Info Banner */}
      <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-4 flex items-start gap-3">
        <Lock size={20} className="text-rose-500 mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-bold text-rose-800">Field Locking is Configured by Super Admin</p>
          <p className="text-xs text-rose-700 mt-1">
            Locked fields require OTP verification from the registered Trustee/Principal before any changes can be made.
            Only the Saaras Super Admin can add or remove field locks during onboarding or via support request.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={Lock} label="Fields Locked" value={String(lockedCount)} color="bg-rose-500" theme={theme} />
        <StatCard icon={Key} label="OTP Verifications" value="5" color="bg-emerald-500" theme={theme} />
        <StatCard icon={AlertTriangle} label="Failed / Expired" value="1" color="bg-amber-500" theme={theme} />
        <StatCard icon={Shield} label="Auth Contact" value="Trustee" color="bg-indigo-500" theme={theme} />
      </div>

      {/* Lock Status Table */}
      <SectionCard title="Lockable Fields" subtitle="Current lock status for all critical fields" theme={theme}>
        <div className="space-y-1.5">
          {lockFields.map(f => (
            <div key={f.field} className={`flex items-center justify-between p-3 rounded-xl ${f.locked ? 'bg-rose-50 border border-rose-200' : theme.secondaryBg} transition-all`}>
              <div className="flex items-center gap-3 flex-1">
                {f.locked ? <Lock size={14} className="text-rose-500 shrink-0" /> : <Key size={14} className="text-slate-300 shrink-0" />}
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${theme.highlight}`}>{f.field}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${f.locked ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-500'}`}>
                      {f.locked ? 'LOCKED' : 'UNLOCKED'}
                    </span>
                  </div>
                  <p className={`text-[10px] ${theme.iconColor}`}>{f.description}</p>
                  {f.locked && (
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`text-[9px] ${theme.iconColor}`}>Set by: <strong>{f.setBy}</strong></span>
                      <span className={`text-[9px] ${theme.iconColor}`}>Last OTP: <strong>{f.lastOTP}</strong></span>
                    </div>
                  )}
                </div>
              </div>
              {f.locked && (
                <button onClick={() => setShowOTPModal(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-100 border border-rose-300 text-rose-700 rounded-lg text-[10px] font-bold hover:bg-rose-200 transition-all">
                  <Key size={10} /> Request Unlock
                </button>
              )}
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Recent Lock Events */}
      <SectionCard title="Recent Lock Events" subtitle="OTP verification history for critical field changes" theme={theme}>
        <div className={`rounded-xl border ${theme.border} overflow-hidden`}>
          <table className="w-full text-xs">
            <thead className={theme.secondaryBg}>
              <tr>
                {['Time', 'Event', 'Action', 'Result', 'Status'].map(h => (
                  <th key={h} className={`text-left px-3 py-2.5 font-bold ${theme.iconColor} uppercase text-[10px]`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lockEvents.map((evt, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className={`px-3 py-2.5 ${theme.iconColor} text-[10px] whitespace-nowrap`}>{evt.time}</td>
                  <td className={`px-3 py-2.5 font-medium ${theme.highlight}`}>{evt.event}</td>
                  <td className={`px-3 py-2.5 ${theme.iconColor}`}>{evt.action}</td>
                  <td className={`px-3 py-2.5 ${theme.highlight}`}>{evt.result}</td>
                  <td className="px-3 py-2.5">
                    <span className={`text-[9px] px-2 py-0.5 rounded-lg font-bold ${
                      evt.status === 'success' ? 'bg-emerald-100 text-emerald-700' :
                      evt.status === 'cancelled' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {evt.status === 'success' ? 'VERIFIED' : evt.status === 'cancelled' ? 'CANCELLED' : 'EXPIRED'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* Master Contact Info */}
      <SectionCard title="Authentication Contact" subtitle="OTP is sent to this contact for all locked field changes" theme={theme}>
        <div className={`${theme.secondaryBg} rounded-xl p-4`}>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1`}>Role</p>
              <p className={`text-xs font-bold ${theme.highlight}`}>Trustee</p>
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1`}>Phone</p>
              <div className="flex items-center gap-1.5">
                <Phone size={10} className={theme.iconColor} />
                <p className={`text-xs ${theme.highlight}`}>+91 98765 43210</p>
              </div>
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1`}>Email</p>
              <div className="flex items-center gap-1.5">
                <Mail size={10} className={theme.iconColor} />
                <p className={`text-xs ${theme.highlight}`}>principal@dpsahmedabad.edu</p>
              </div>
            </div>
          </div>
          <p className={`text-[10px] ${theme.iconColor} mt-3`}>To change the authentication contact, please contact Saaras Support with a formal request from the school authority.</p>
        </div>
      </SectionCard>

      {/* OTP Modal */}
      {showOTPModal && (
        <OTPVerificationModal
          theme={theme}
          onClose={() => setShowOTPModal(false)}
          onVerify={() => setShowOTPModal(false)}
        />
      )}
    </div>
  );
}
