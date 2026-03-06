'use client';

import { useEffect, useState } from 'react';
import { getLoggedInUser, canAccessDashboard, type TeamMember } from '@/lib/auth';

export default function MatDashPage() {
  const [user, setUser] = useState<TeamMember | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const u = getLoggedInUser();
    setUser(u);
    setChecking(false);
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-slate-400 text-sm">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!user || !canAccessDashboard(user, 'matdash')) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10m11-7a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-white text-xl font-bold mb-2">Access Denied</h1>
          <p className="text-slate-400 text-sm mb-6">You don&apos;t have permission to view the UI Template Library. Please contact Piush to get access.</p>
          <a href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-all">
            Go to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Thin header bar */}
      <div className="h-10 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <a href="/" className="text-blue-400 text-xs font-bold hover:text-blue-300 transition-all">&larr; Back to Blueprint</a>
          <span className="text-slate-600">|</span>
          <span className="text-white text-xs font-bold">UI Component & Template Library</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">REFERENCE ONLY</span>
        </div>
        <span className="text-slate-500 text-[10px]">Logged in as {user.name}</span>
      </div>
      {/* Full-screen iframe */}
      <iframe
        src="/_matdash/index.html"
        className="w-full border-0"
        style={{ height: 'calc(100vh - 40px)' }}
        title="UI Template Library"
      />
    </div>
  );
}
