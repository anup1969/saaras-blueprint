'use client';

import React, { useState } from 'react';
import BlueprintLayout from '@/components/BlueprintLayout';
import { type Theme } from '@/lib/themes';
import {
  Smartphone, Lock, Eye, EyeOff, LogIn, ArrowRight, ChevronLeft,
  Shield, Key, Users, Settings, CheckCircle, AlertCircle, RefreshCw,
  Building2, User, Mail, Phone, Fingerprint, Hash, Calendar, FileText,
  Download, Printer, UserPlus, Copy, ChevronDown, Info, Zap, KeyRound,
  Briefcase
} from 'lucide-react';

/* ─── TYPES ─────────────────────────────────────────── */
type AuthMode = 'otp' | 'userid';
type LoginView = 'select-school' | 'login' | 'otp-sent' | 'otp-verify' | 'force-change' | 'success';
type ConfigTab = 'auth-method' | 'userid-templates' | 'password-templates' | 'credential-mgmt' | 'security';

/* ─── LOGIN PREVIEW COMPONENT ────────────────────────── */
function LoginPreview({ theme }: { theme: Theme }) {
  const [authMode, setAuthMode] = useState<AuthMode>('otp');
  const [view, setView] = useState<LoginView>('login');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  const schoolName = 'DPS Ahmedabad';
  const schoolLogo = '🏫';

  const reset = () => {
    setView('login');
    setPhone(''); setOtp(''); setUserId(''); setPassword('');
    setNewPw(''); setConfirmPw('');
  };

  return (
    <div className="min-h-[600px] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 rounded-2xl p-6 flex items-center justify-center relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="w-full max-w-sm relative z-10">
        {/* School branding */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl">
            {schoolLogo}
          </div>
          <h1 className="text-xl font-black text-white">{schoolName}</h1>
          <p className="text-xs text-slate-400 mt-1">Powered by Saaras.ai</p>
        </div>

        {/* Auth mode tabs */}
        {view === 'login' && (
          <div className="flex bg-slate-800/50 rounded-xl p-1 mb-5 border border-slate-700/50">
            <button
              onClick={() => { setAuthMode('otp'); reset(); }}
              className={`flex-1 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                authMode === 'otp' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone size={14} /> OTP Login
            </button>
            <button
              onClick={() => { setAuthMode('userid'); reset(); }}
              className={`flex-1 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                authMode === 'userid' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Key size={14} /> User ID &amp; Password
            </button>
          </div>
        )}

        {/* Login Card */}
        <div className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl p-6">

          {/* ── OTP FLOW: Enter Phone ── */}
          {authMode === 'otp' && view === 'login' && (
            <>
              <h2 className="text-base font-bold text-white mb-1">Login with OTP</h2>
              <p className="text-xs text-slate-400 mb-5">Enter the registered mobile number to receive OTP</p>

              <label className="text-[10px] text-slate-400 font-bold block mb-1.5">REGISTERED MOBILE NUMBER</label>
              <div className="relative mb-4">
                <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <div className="absolute left-10 top-1/2 -translate-y-1/2 text-slate-300 text-sm font-medium">+91</div>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="9876543210"
                  maxLength={10}
                  className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-xl pl-[72px] pr-4 py-3 outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 mb-5">
                <p className="text-[10px] text-blue-300 flex items-start gap-2">
                  <Info size={12} className="mt-0.5 shrink-0" />
                  This is the primary number registered during your child&apos;s admission. If changed, contact school admin.
                </p>
              </div>

              <button
                onClick={() => phone.length === 10 && setView('otp-sent')}
                disabled={phone.length !== 10}
                className="w-full py-3 bg-blue-600 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Send OTP <ArrowRight size={16} />
              </button>
            </>
          )}

          {/* ── OTP FLOW: Verify OTP ── */}
          {authMode === 'otp' && view === 'otp-sent' && (
            <>
              <button onClick={() => setView('login')} className="text-blue-400 text-xs flex items-center gap-1 mb-3 hover:underline">
                <ChevronLeft size={14} /> Back
              </button>
              <h2 className="text-base font-bold text-white mb-1">Verify OTP</h2>
              <p className="text-xs text-slate-400 mb-5">
                Enter the 6-digit OTP sent to <span className="text-white font-medium">+91 {phone}</span>
              </p>

              <div className="flex gap-2 mb-4 justify-center">
                {[0,1,2,3,4,5].map(i => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={otp[i] || ''}
                    onChange={e => {
                      const val = e.target.value.replace(/\D/g, '');
                      const newOtp = otp.split('');
                      newOtp[i] = val;
                      setOtp(newOtp.join(''));
                      if (val && i < 5) {
                        const next = e.target.nextElementSibling as HTMLInputElement;
                        next?.focus();
                      }
                    }}
                    className="w-11 h-12 text-center bg-slate-800 border border-slate-700 text-white text-lg font-bold rounded-xl outline-none focus:border-blue-500"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 mb-5">
                <span>Didn&apos;t receive? <button className="text-blue-400 hover:underline">Resend OTP</button></span>
                <span className="text-slate-500">Expires in 2:00</span>
              </div>

              <button
                onClick={() => otp.length === 6 && setView('success')}
                disabled={otp.length !== 6}
                className="w-full py-3 bg-blue-600 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <CheckCircle size={16} /> Verify &amp; Login
              </button>
            </>
          )}

          {/* ── USER ID FLOW: Enter Credentials ── */}
          {authMode === 'userid' && view === 'login' && (
            <>
              <h2 className="text-base font-bold text-white mb-1">Login with User ID</h2>
              <p className="text-xs text-slate-400 mb-5">Enter the credentials provided by your school</p>

              <label className="text-[10px] text-slate-400 font-bold block mb-1.5">USER ID</label>
              <div className="relative mb-1">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={userId}
                  onChange={e => setUserId(e.target.value)}
                  placeholder="e.g. DPS-2026-0001"
                  className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-xl pl-10 pr-4 py-3 outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <p className="text-[10px] text-slate-500 mb-4">Your User ID is your <span className="text-blue-400">Admission Number</span></p>

              <label className="text-[10px] text-slate-400 font-bold block mb-1.5">PASSWORD</label>
              <div className="relative mb-1">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-xl pl-10 pr-10 py-3 outline-none focus:border-blue-500 transition-colors"
                />
                <button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              <p className="text-[10px] text-slate-500 mb-5">Default password: <span className="text-blue-400">Student&apos;s date of birth (DDMMYYYY)</span></p>

              <button
                onClick={() => userId && password && setView('force-change')}
                disabled={!userId || !password}
                className="w-full py-3 bg-blue-600 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <LogIn size={16} /> Sign In
              </button>

              <button className="w-full text-center text-xs text-blue-400 mt-3 hover:underline">
                Forgot Password? Contact School Admin
              </button>
            </>
          )}

          {/* ── FORCE PASSWORD CHANGE ── */}
          {view === 'force-change' && (
            <>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 mb-4 flex items-start gap-2">
                <AlertCircle size={16} className="text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-amber-300 font-bold">First Login — Password Change Required</p>
                  <p className="text-[10px] text-amber-300/70 mt-0.5">For security, please set a new password before continuing.</p>
                </div>
              </div>

              <label className="text-[10px] text-slate-400 font-bold block mb-1.5">NEW PASSWORD</label>
              <div className="relative mb-3">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  value={newPw}
                  onChange={e => setNewPw(e.target.value)}
                  placeholder="Min 8 characters"
                  className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-xl pl-10 pr-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <label className="text-[10px] text-slate-400 font-bold block mb-1.5">CONFIRM PASSWORD</label>
              <div className="relative mb-4">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  value={confirmPw}
                  onChange={e => setConfirmPw(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-xl pl-10 pr-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* Password strength */}
              <div className="mb-5 space-y-1.5">
                {[
                  { label: 'At least 8 characters', met: newPw.length >= 8 },
                  { label: 'Contains a number', met: /\d/.test(newPw) },
                  { label: 'Passwords match', met: newPw.length > 0 && newPw === confirmPw },
                ].map(r => (
                  <div key={r.label} className="flex items-center gap-2 text-[10px]">
                    {r.met ? <CheckCircle size={12} className="text-emerald-400" /> : <Circle size={12} className="text-slate-600" />}
                    <span className={r.met ? 'text-emerald-400' : 'text-slate-500'}>{r.label}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => newPw.length >= 8 && newPw === confirmPw && setView('success')}
                disabled={newPw.length < 8 || newPw !== confirmPw}
                className="w-full py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <CheckCircle size={16} /> Set Password &amp; Continue
              </button>
            </>
          )}

          {/* ── SUCCESS ── */}
          {view === 'success' && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-emerald-400" />
              </div>
              <h2 className="text-lg font-bold text-white mb-1">Welcome!</h2>
              <p className="text-xs text-slate-400 mb-5">
                {authMode === 'otp' ? 'OTP verified successfully.' : 'Password updated successfully.'}
                {' '}Redirecting to dashboard...
              </p>
              <button
                onClick={reset}
                className="text-xs text-blue-400 hover:underline flex items-center gap-1 mx-auto"
              >
                <RefreshCw size={12} /> Try another login flow
              </button>
            </div>
          )}
        </div>

        {/* Staff login link */}
        {view === 'login' && (
          <div className="mt-4 text-center">
            <p className="text-[10px] text-slate-500">Staff / Teacher?</p>
            <button className="text-xs text-blue-400 hover:underline mt-0.5 flex items-center gap-1 mx-auto">
              <Mail size={12} /> Login with Email &amp; Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── CIRCLE ICON COMPONENT ───────────────────────────── */
function Circle({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

/* ─── AUTH CONFIG PANEL (Admin View) ──────────────────── */
function AuthConfigPanel({ theme }: { theme: Theme }) {
  const [configTab, setConfigTab] = useState<ConfigTab>('auth-method');
  const [authMethod, setAuthMethod] = useState<'otp' | 'userid' | 'both'>('both');
  const [userIdTemplate, setUserIdTemplate] = useState('admission_number');
  const [pwTemplate, setPwTemplate] = useState('dob_ddmmyyyy');
  const [forceChange, setForceChange] = useState(true);
  const [lockoutEnabled, setLockoutEnabled] = useState(true);
  const [lockoutAttempts, setLockoutAttempts] = useState('5');
  const [lockoutDuration, setLockoutDuration] = useState('15');
  const [googleSso, setGoogleSso] = useState(false);
  const [microsoftSso, setMicrosoftSso] = useState(false);

  const tabs: { id: ConfigTab; label: string; icon: React.ElementType }[] = [
    { id: 'auth-method', label: 'Auth Method', icon: Shield },
    { id: 'userid-templates', label: 'User ID', icon: Hash },
    { id: 'password-templates', label: 'Password', icon: Key },
    { id: 'credential-mgmt', label: 'Credentials', icon: Users },
    { id: 'security', label: 'Security', icon: Lock },
  ];

  const userIdOptions = [
    { id: 'admission_number', label: 'Admission Number', example: 'DPS-2026-0001', desc: 'Auto-generated during admission. Unique per student.' },
    { id: 'student_name', label: 'Student Full Name', example: 'rahul.sharma', desc: 'Lowercase, dots for spaces. May need suffix if duplicate.' },
    { id: 'name_admno', label: 'Name + Admission No.', example: 'rahul.0001', desc: 'First name + last 4 digits of admission number.' },
    { id: 'phone_number', label: 'Parent Phone Number', example: '9876543210', desc: 'Primary registered number. Same as OTP login.' },
    { id: 'email', label: 'Parent Email', example: 'parent@gmail.com', desc: 'For schools with email-savvy parents.' },
    { id: 'custom', label: 'Custom Format', example: 'SCHOOL-CLASS-ROLL', desc: 'School defines their own format using available fields.' },
  ];

  const passwordOptions = [
    { id: 'dob_ddmmyyyy', label: 'Date of Birth (DDMMYYYY)', example: '15062015', desc: 'Student\'s DOB. Easy to remember, unique per student.' },
    { id: 'name_dob', label: 'Name Initials + DOB', example: 'RS15062015', desc: 'First + last initial + DOB. More secure than DOB alone.' },
    { id: 'static_all', label: 'Static Password for All', example: 'DPS@2026', desc: 'Same password for all students. Simplest but least secure.' },
    { id: 'random', label: 'Random Generated', example: 'xK9#mP2q', desc: 'System generates unique random password. Most secure.' },
    { id: 'admission_dob', label: 'Admission No. + DOB (last 4)', example: '00012015', desc: 'Last 4 of admission + birth year. Balanced security.' },
  ];

  // Mock student data for credential preview
  const mockStudents = [
    { name: 'Rahul Sharma', adm: 'DPS-2026-0001', dob: '15/06/2015', class: '5-A', parent: 'Amit Sharma', phone: '9876543210' },
    { name: 'Priya Patel', adm: 'DPS-2026-0002', dob: '22/11/2014', class: '6-B', parent: 'Rajesh Patel', phone: '9876543211' },
    { name: 'Arjun Singh', adm: 'DPS-2026-0003', dob: '08/03/2015', class: '5-A', parent: 'Gurpreet Singh', phone: '9876543212' },
    { name: 'Ananya Joshi', adm: 'DPS-2026-0004', dob: '30/09/2014', class: '6-B', parent: 'Suresh Joshi', phone: '9876543213' },
  ];

  const getUserId = (s: typeof mockStudents[0]) => {
    switch (userIdTemplate) {
      case 'admission_number': return s.adm;
      case 'student_name': return s.name.toLowerCase().replace(' ', '.');
      case 'name_admno': return s.name.split(' ')[0].toLowerCase() + '.' + s.adm.split('-').pop();
      case 'phone_number': return s.phone;
      case 'email': return s.parent.toLowerCase().replace(' ', '.') + '@gmail.com';
      default: return s.adm;
    }
  };

  const getPassword = (s: typeof mockStudents[0]) => {
    const dob = s.dob.replace(/\//g, '');
    switch (pwTemplate) {
      case 'dob_ddmmyyyy': return dob;
      case 'name_dob': return s.name.split(' ').map(n => n[0]).join('') + dob;
      case 'static_all': return 'DPS@2026';
      case 'random': return Math.random().toString(36).slice(2, 10);
      case 'admission_dob': return (s.adm.split('-').pop() || '') + (s.dob.split('/').pop() || '');
      default: return dob;
    }
  };

  return (
    <div className={`${theme.cardBg} rounded-2xl border ${theme.border}`}>
      {/* Tab header */}
      <div className={`flex border-b ${theme.border} overflow-x-auto`}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setConfigTab(t.id)}
            className={`flex items-center gap-1.5 px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-all ${
              configTab === t.id
                ? `${theme.primaryText} border-current`
                : `${theme.iconColor} border-transparent hover:${theme.highlight}`
            }`}
          >
            <t.icon size={14} /> {t.label}
          </button>
        ))}
      </div>

      <div className="p-5">
        {/* ── AUTH METHOD TAB ── */}
        {configTab === 'auth-method' && (
          <div className="space-y-5">
            <div>
              <h3 className={`text-sm font-bold ${theme.highlight} mb-1`}>Parent / Student Login Method</h3>
              <p className={`text-[10px] ${theme.iconColor} mb-4`}>Choose how parents and students will log into the ERP. This is configured per school during onboarding.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { id: 'otp' as const, label: 'OTP Only', icon: Smartphone, desc: 'Parent enters registered phone → receives OTP → logs in. No password to remember. Simplest for parents.', pros: ['No password management', 'Parent phone = identity', 'Easiest for non-tech parents'], cons: ['SMS cost per login', 'Depends on phone network'] },
                { id: 'userid' as const, label: 'User ID & Password', icon: Key, desc: 'School assigns user ID + default password. Parent logs in and sets new password on first login.', pros: ['No per-login cost', 'Works without phone signal', 'School controls format'], cons: ['Password reset requests', 'Parents may forget'] },
                { id: 'both' as const, label: 'Both Options', icon: Shield, desc: 'Parents can choose either OTP or User ID login. Maximum flexibility. School pays SMS cost only for OTP users.', pros: ['Maximum flexibility', 'Parent chooses preference', 'Fallback if one fails'], cons: ['Slightly complex UI', 'Two flows to maintain'] },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setAuthMethod(opt.id)}
                  className={`text-left p-4 rounded-xl border-2 transition-all ${
                    authMethod === opt.id
                      ? `border-blue-500 ${theme.accentBg}`
                      : `${theme.border} hover:border-slate-400`
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${authMethod === opt.id ? 'bg-blue-500/20' : theme.secondaryBg}`}>
                      <opt.icon size={16} className={authMethod === opt.id ? 'text-blue-400' : theme.iconColor} />
                    </div>
                    <span className={`text-sm font-bold ${theme.highlight}`}>{opt.label}</span>
                    {authMethod === opt.id && <CheckCircle size={14} className="text-blue-400 ml-auto" />}
                  </div>
                  <p className={`text-[10px] ${theme.iconColor} mb-3`}>{opt.desc}</p>
                  <div className="space-y-1">
                    {opt.pros.map(p => (
                      <div key={p} className="flex items-center gap-1.5 text-[10px] text-emerald-500">
                        <CheckCircle size={10} /> {p}
                      </div>
                    ))}
                    {opt.cons.map(c => (
                      <div key={c} className="flex items-center gap-1.5 text-[10px] text-amber-500">
                        <AlertCircle size={10} /> {c}
                      </div>
                    ))}
                  </div>
                </button>
              ))}
            </div>

            {/* Staff login section */}
            <div className={`${theme.accentBg} rounded-xl p-4 border ${theme.border}`}>
              <h4 className={`text-xs font-bold ${theme.highlight} mb-2 flex items-center gap-2`}>
                <Briefcase size={14} /> Staff / Teacher Login (Separate)
              </h4>
              <p className={`text-[10px] ${theme.iconColor} mb-3`}>Staff always uses Email/Phone + Password. Additionally, enable SSO for schools using Google Workspace or Microsoft 365.</p>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input type="checkbox" checked={googleSso} onChange={() => setGoogleSso(!googleSso)} className="accent-blue-500 w-4 h-4 rounded" />
                  <span className={theme.highlight}>Google Sign-In</span>
                </label>
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input type="checkbox" checked={microsoftSso} onChange={() => setMicrosoftSso(!microsoftSso)} className="accent-blue-500 w-4 h-4 rounded" />
                  <span className={theme.highlight}>Microsoft Sign-In</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* ── USER ID TEMPLATES TAB ── */}
        {configTab === 'userid-templates' && (
          <div className="space-y-4">
            <div>
              <h3 className={`text-sm font-bold ${theme.highlight} mb-1`}>User ID Template</h3>
              <p className={`text-[10px] ${theme.iconColor} mb-4`}>Choose what serves as the student/parent login identifier. Auto-generated during admission.</p>
            </div>

            <div className="space-y-2">
              {userIdOptions.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setUserIdTemplate(opt.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center gap-3 ${
                    userIdTemplate === opt.id
                      ? `border-blue-500 ${theme.accentBg}`
                      : `${theme.border} hover:border-slate-400`
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    userIdTemplate === opt.id ? 'border-blue-500 bg-blue-500' : 'border-slate-500'
                  }`}>
                    {userIdTemplate === opt.id && <CheckCircle size={12} className="text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold ${theme.highlight}`}>{opt.label}</span>
                      <code className={`text-[10px] px-2 py-0.5 rounded ${theme.secondaryBg} ${theme.iconColor}`}>{opt.example}</code>
                    </div>
                    <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>{opt.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── PASSWORD TEMPLATES TAB ── */}
        {configTab === 'password-templates' && (
          <div className="space-y-4">
            <div>
              <h3 className={`text-sm font-bold ${theme.highlight} mb-1`}>Default Password Template</h3>
              <p className={`text-[10px] ${theme.iconColor} mb-4`}>The initial password assigned to each student. Parent must change it on first login.</p>
            </div>

            <div className="space-y-2">
              {passwordOptions.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setPwTemplate(opt.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center gap-3 ${
                    pwTemplate === opt.id
                      ? `border-blue-500 ${theme.accentBg}`
                      : `${theme.border} hover:border-slate-400`
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    pwTemplate === opt.id ? 'border-blue-500 bg-blue-500' : 'border-slate-500'
                  }`}>
                    {pwTemplate === opt.id && <CheckCircle size={12} className="text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold ${theme.highlight}`}>{opt.label}</span>
                      <code className={`text-[10px] px-2 py-0.5 rounded ${theme.secondaryBg} ${theme.iconColor}`}>{opt.example}</code>
                    </div>
                    <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>{opt.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Force change toggle */}
            <div className={`${theme.accentBg} rounded-xl p-4 border ${theme.border} flex items-center justify-between`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Force Password Change on First Login</p>
                <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>Parent must set a new password before accessing the app</p>
              </div>
              <button
                onClick={() => setForceChange(!forceChange)}
                className={`w-10 h-5 rounded-full transition-all relative ${forceChange ? 'bg-blue-500' : 'bg-slate-600'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${forceChange ? 'left-5' : 'left-0.5'}`} />
              </button>
            </div>
          </div>
        )}

        {/* ── CREDENTIAL MANAGEMENT TAB ── */}
        {configTab === 'credential-mgmt' && (
          <div className="space-y-5">
            <div>
              <h3 className={`text-sm font-bold ${theme.highlight} mb-1`}>Credential Generation &amp; Distribution</h3>
              <p className={`text-[10px] ${theme.iconColor} mb-4`}>Generate login credentials for all students at once, then print/download slips to distribute to parents.</p>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: Zap, label: 'Generate All', desc: 'Bulk generate for all students', color: 'bg-blue-500/20 text-blue-400' },
                { icon: UserPlus, label: 'Generate New', desc: 'New admissions only', color: 'bg-emerald-500/20 text-emerald-400' },
                { icon: Printer, label: 'Print Slips', desc: 'Printable credential slips', color: 'bg-purple-500/20 text-purple-400' },
                { icon: Download, label: 'Export CSV', desc: 'Download as spreadsheet', color: 'bg-amber-500/20 text-amber-400' },
              ].map(a => (
                <button key={a.label} className={`p-3 rounded-xl border ${theme.border} hover:border-slate-400 transition-all text-center`}>
                  <div className={`w-10 h-10 rounded-xl ${a.color} flex items-center justify-center mx-auto mb-2`}>
                    <a.icon size={18} />
                  </div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>{a.label}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{a.desc}</p>
                </button>
              ))}
            </div>

            {/* Preview table */}
            <div>
              <h4 className={`text-xs font-bold ${theme.highlight} mb-2`}>Credential Preview (Based on selected templates)</h4>
              <div className={`border ${theme.border} rounded-xl overflow-hidden`}>
                <table className="w-full text-xs">
                  <thead>
                    <tr className={theme.secondaryBg}>
                      <th className={`text-left p-3 ${theme.iconColor} font-bold`}>Student</th>
                      <th className={`text-left p-3 ${theme.iconColor} font-bold`}>Class</th>
                      <th className={`text-left p-3 ${theme.iconColor} font-bold`}>User ID</th>
                      <th className={`text-left p-3 ${theme.iconColor} font-bold`}>Default Password</th>
                      <th className={`text-center p-3 ${theme.iconColor} font-bold`}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockStudents.map((s, i) => (
                      <tr key={i} className={`border-t ${theme.border}`}>
                        <td className={`p-3 ${theme.highlight}`}>
                          <div className="font-medium">{s.name}</div>
                          <div className={`text-[10px] ${theme.iconColor}`}>{s.parent} ({s.phone})</div>
                        </td>
                        <td className={`p-3 ${theme.iconColor}`}>{s.class}</td>
                        <td className="p-3">
                          <code className="text-blue-400 text-[11px] font-mono">{getUserId(s)}</code>
                        </td>
                        <td className="p-3">
                          <code className="text-amber-400 text-[11px] font-mono">{getPassword(s)}</code>
                        </td>
                        <td className="p-3 text-center">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            i === 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-500/20 text-slate-400'
                          }`}>
                            {i === 0 ? 'Active' : 'Pending'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Printable slip preview */}
            <div>
              <h4 className={`text-xs font-bold ${theme.highlight} mb-2`}>Credential Slip Preview (for parents)</h4>
              <div className="bg-white rounded-xl p-5 text-slate-900 max-w-xs border-2 border-dashed border-slate-300">
                <div className="text-center border-b border-slate-200 pb-3 mb-3">
                  <p className="text-sm font-black">DPS Ahmedabad</p>
                  <p className="text-[10px] text-slate-500">Parent Portal Login Credentials</p>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Student:</span>
                    <span className="font-bold">Rahul Sharma</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Class:</span>
                    <span className="font-bold">5-A</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">User ID:</span>
                    <span className="font-bold font-mono text-blue-600">{getUserId(mockStudents[0])}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Password:</span>
                    <span className="font-bold font-mono text-red-600">{getPassword(mockStudents[0])}</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-200 text-center">
                  <p className="text-[9px] text-red-500 font-bold">You will be asked to change your password on first login.</p>
                  <p className="text-[9px] text-slate-400 mt-1">Download the app: saaras.ai/app</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── SECURITY TAB ── */}
        {configTab === 'security' && (
          <div className="space-y-5">
            <div>
              <h3 className={`text-sm font-bold ${theme.highlight} mb-1`}>Login Security Settings</h3>
              <p className={`text-[10px] ${theme.iconColor} mb-4`}>Configure security policies for this school&apos;s login system.</p>
            </div>

            <div className="space-y-4">
              {/* Account lockout */}
              <div className={`${theme.accentBg} rounded-xl p-4 border ${theme.border}`}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className={`text-xs font-bold ${theme.highlight}`}>Account Lockout</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>Lock account after failed login attempts</p>
                  </div>
                  <button
                    onClick={() => setLockoutEnabled(!lockoutEnabled)}
                    className={`w-10 h-5 rounded-full transition-all relative ${lockoutEnabled ? 'bg-blue-500' : 'bg-slate-600'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${lockoutEnabled ? 'left-5' : 'left-0.5'}`} />
                  </button>
                </div>
                {lockoutEnabled && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={`text-[10px] ${theme.iconColor} font-bold block mb-1`}>Max Attempts</label>
                      <select value={lockoutAttempts} onChange={e => setLockoutAttempts(e.target.value)} className={`w-full px-3 py-2 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                        {['3', '5', '10'].map(v => <option key={v} value={v}>{v} attempts</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={`text-[10px] ${theme.iconColor} font-bold block mb-1`}>Lockout Duration</label>
                      <select value={lockoutDuration} onChange={e => setLockoutDuration(e.target.value)} className={`w-full px-3 py-2 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                        {['5', '15', '30', '60'].map(v => <option key={v} value={v}>{v} minutes</option>)}
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Session duration */}
              <div className={`${theme.accentBg} rounded-xl p-4 border ${theme.border}`}>
                <p className={`text-xs font-bold ${theme.highlight} mb-3`}>Session Duration (Role-Based)</p>
                <div className="space-y-2">
                  {[
                    { role: 'Admin / Financial', duration: '24 hours', desc: 'Sensitive data access — shorter session' },
                    { role: 'Teacher / Staff', duration: '7 days', desc: 'Daily use — balanced security & convenience' },
                    { role: 'Parent / Student', duration: '30 days', desc: 'Casual use — stay logged in longer' },
                  ].map(s => (
                    <div key={s.role} className={`flex items-center justify-between p-2.5 rounded-lg border ${theme.border}`}>
                      <div>
                        <p className={`text-xs font-bold ${theme.highlight}`}>{s.role}</p>
                        <p className={`text-[10px] ${theme.iconColor}`}>{s.desc}</p>
                      </div>
                      <span className={`text-xs font-bold ${theme.primaryText}`}>{s.duration}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* OTP settings */}
              <div className={`${theme.accentBg} rounded-xl p-4 border ${theme.border}`}>
                <p className={`text-xs font-bold ${theme.highlight} mb-3`}>OTP Settings</p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className={`text-[10px] ${theme.iconColor} font-bold block mb-1`}>OTP Length</label>
                    <select className={`w-full px-3 py-2 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                      <option>4 digits</option>
                      <option selected>6 digits</option>
                    </select>
                  </div>
                  <div>
                    <label className={`text-[10px] ${theme.iconColor} font-bold block mb-1`}>Expiry</label>
                    <select className={`w-full px-3 py-2 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                      <option>1 minute</option>
                      <option selected>2 minutes</option>
                      <option>5 minutes</option>
                    </select>
                  </div>
                  <div>
                    <label className={`text-[10px] ${theme.iconColor} font-bold block mb-1`}>Max Resends/hr</label>
                    <select className={`w-full px-3 py-2 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                      <option selected>3</option>
                      <option>5</option>
                      <option>10</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Password policy */}
              <div className={`${theme.accentBg} rounded-xl p-4 border ${theme.border}`}>
                <p className={`text-xs font-bold ${theme.highlight} mb-3`}>Password Policy (for User ID + Password mode)</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={`text-[10px] ${theme.iconColor} font-bold block mb-1`}>Minimum Length</label>
                    <select className={`w-full px-3 py-2 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                      <option>6 characters</option>
                      <option selected>8 characters</option>
                      <option>10 characters</option>
                    </select>
                  </div>
                  <div>
                    <label className={`text-[10px] ${theme.iconColor} font-bold block mb-1`}>Require Number</label>
                    <select className={`w-full px-3 py-2 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                      <option selected>Yes</option>
                      <option>No</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Forgot password flow */}
              <div className={`${theme.accentBg} rounded-xl p-4 border ${theme.border}`}>
                <p className={`text-xs font-bold ${theme.highlight} mb-2`}>Forgot Password Flow</p>
                <div className="flex items-center gap-2 text-[10px]">
                  <div className={`px-2 py-1 rounded-lg ${theme.secondaryBg} ${theme.highlight} font-bold`}>Parent contacts school</div>
                  <ArrowRight size={12} className={theme.iconColor} />
                  <div className={`px-2 py-1 rounded-lg ${theme.secondaryBg} ${theme.highlight} font-bold`}>Admin verifies identity</div>
                  <ArrowRight size={12} className={theme.iconColor} />
                  <div className={`px-2 py-1 rounded-lg ${theme.secondaryBg} ${theme.highlight} font-bold`}>Admin resets password</div>
                  <ArrowRight size={12} className={theme.iconColor} />
                  <div className={`px-2 py-1 rounded-lg ${theme.secondaryBg} ${theme.highlight} font-bold`}>Force change on login</div>
                </div>
                <p className={`text-[10px] ${theme.iconColor} mt-2`}>No self-service password reset for parents (security: prevents unauthorized access to child&apos;s data).</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── MAIN AUTH PAGE ──────────────────────────────────── */
function AuthPage({ theme }: { theme?: Theme }) {
  if (!theme) return null;
  const [activeView, setActiveView] = useState<'login-preview' | 'admin-config'>('login-preview');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6`}>
        <div className="flex items-center gap-3 mb-2">
          <div className={`w-10 h-10 rounded-xl ${theme.primary} flex items-center justify-center`}>
            <KeyRound size={20} className="text-white" />
          </div>
          <div>
            <h1 className={`text-xl font-bold ${theme.highlight}`}>Authentication System</h1>
            <p className={`text-xs ${theme.iconColor}`}>Login flows for parents, students, and staff — configurable per school during onboarding</p>
          </div>
        </div>
      </div>

      {/* View toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveView('login-preview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeView === 'login-preview'
              ? `${theme.primary} text-white`
              : `${theme.cardBg} ${theme.highlight} border ${theme.border}`
          }`}
        >
          <Eye size={14} /> Login Page Preview
        </button>
        <button
          onClick={() => setActiveView('admin-config')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeView === 'admin-config'
              ? `${theme.primary} text-white`
              : `${theme.cardBg} ${theme.highlight} border ${theme.border}`
          }`}
        >
          <Settings size={14} /> Admin Configuration (Onboarding)
        </button>
      </div>

      {/* Content */}
      {activeView === 'login-preview' ? (
        <div>
          <p className={`text-xs ${theme.iconColor} mb-3`}>
            Interactive preview of what parents/students see when logging in. Toggle between OTP and User ID flows. Try the full flow — it demonstrates OTP entry, password login, and forced password change.
          </p>
          <LoginPreview theme={theme} />
        </div>
      ) : (
        <div>
          <p className={`text-xs ${theme.iconColor} mb-3`}>
            This is what the Super Admin / School Admin configures during onboarding. Each school chooses their auth method, user ID format, password template, and security policies.
          </p>
          <AuthConfigPanel theme={theme} />
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <BlueprintLayout>
      <AuthPage />
    </BlueprintLayout>
  );
}
