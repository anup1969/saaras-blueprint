'use client';

import { useState } from 'react';
import { authenticate, loginUser, type TeamMember } from '@/lib/auth';
import { LogIn, Eye, EyeOff, Shield, User, Lock, Loader2 } from 'lucide-react';

export default function LoginPage({ onLogin }: { onLogin: (user: TeamMember) => void }) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    if (!userId.trim() || !password.trim()) {
      setError('Please enter both User ID and Password.');
      return;
    }
    setLoading(true);
    try {
      const member = await authenticate(userId.trim().toLowerCase(), password);
      if (member) {
        loginUser(member);
        onLogin(member);
      } else {
        setError('Invalid User ID or Password.');
      }
    } catch {
      setError('Login failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-black text-white">Saaras.ai</h1>
          <p className="text-sm text-slate-400 mt-1">ERP Blueprint Review Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-5">Sign in to review</h2>

          {/* User ID */}
          <label className="text-xs text-slate-400 font-bold block mb-2">User ID</label>
          <div className="relative mb-4">
            <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={userId}
              onChange={e => { setUserId(e.target.value); setError(''); }}
              onKeyDown={e => e.key === 'Enter' && document.getElementById('pw-input')?.focus()}
              placeholder="Enter your user ID"
              className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-xl pl-10 pr-4 py-3 outline-none focus:border-purple-500 transition-colors"
              autoFocus
              disabled={loading}
            />
          </div>

          {/* Password */}
          <label className="text-xs text-slate-400 font-bold block mb-2">Password</label>
          <div className="relative mb-4">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              id="pw-input"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => { setPassword(e.target.value); setError(''); }}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder="Enter your password"
              className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-xl pl-10 pr-10 py-3 outline-none focus:border-purple-500 transition-colors"
              disabled={loading}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && <p className="text-red-400 text-xs mb-3">{error}</p>}

          <button
            onClick={handleLogin}
            disabled={!userId.trim() || !password.trim() || loading}
            className="w-full py-3 bg-purple-600 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <LogIn size={16} />}
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>

        <p className="text-center text-[10px] text-slate-600 mt-4">
          Blueprint mode — Internal review only
        </p>
      </div>
    </div>
  );
}
