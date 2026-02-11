'use client';

import { useState } from 'react';
import { teamMembers, authenticate, loginUser, type TeamMember } from '@/lib/auth';
import { LogIn, Eye, EyeOff, Shield } from 'lucide-react';

export default function LoginPage({ onLogin }: { onLogin: (user: TeamMember) => void }) {
  const [selectedUser, setSelectedUser] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');
    const member = authenticate(selectedUser, password);
    if (member) {
      loginUser(member);
      onLogin(member);
    } else {
      setError('Invalid password. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
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
          <h2 className="text-lg font-bold text-white mb-4">Sign in to review</h2>

          {/* User Selection */}
          <label className="text-xs text-slate-400 font-bold block mb-2">Select your name</label>
          <div className="grid grid-cols-1 gap-2 mb-4">
            {teamMembers.map(m => (
              <button
                key={m.id}
                onClick={() => { setSelectedUser(m.id); setError(''); }}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  selectedUser === m.id
                    ? 'bg-purple-600 text-white border border-purple-500'
                    : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-600'
                }`}
              >
                <span>{m.name}</span>
                <span className={`text-xs ${selectedUser === m.id ? 'text-purple-200' : 'text-slate-500'}`}>{m.role}</span>
              </button>
            ))}
          </div>

          {/* Password */}
          {selectedUser && (
            <>
              <label className="text-xs text-slate-400 font-bold block mb-2">Password</label>
              <div className="relative mb-4">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  placeholder="Enter your password"
                  className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-xl px-4 py-3 pr-10 outline-none focus:border-purple-500"
                  autoFocus
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
                disabled={!password.trim()}
                className="w-full py-3 bg-purple-600 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <LogIn size={16} /> Sign In
              </button>
            </>
          )}
        </div>

        <p className="text-center text-[10px] text-slate-600 mt-4">
          Blueprint mode — Internal review only
        </p>
      </div>
    </div>
  );
}
