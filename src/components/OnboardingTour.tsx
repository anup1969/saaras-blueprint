'use client';

import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import type { Theme } from '@/lib/themes';

const TOUR_STEPS = [
  { title: 'Welcome to Your Dashboard!', description: 'This is your central hub. All key metrics, alerts, and quick actions are here at a glance.', area: 'Dashboard' },
  { title: 'Navigation Sidebar', description: 'Use the sidebar to switch between modules — Academics, Staff, Reports, Communication, and more.', area: 'Sidebar' },
  { title: 'Quick Actions', description: 'Common tasks like marking attendance, sending messages, or approving leaves are one click away.', area: 'Quick Actions' },
  { title: 'Notifications', description: 'The bell icon shows pending approvals, new messages, and system alerts. Red badge = needs attention.', area: 'Notifications' },
  { title: 'Your Profile', description: 'Access your profile, preferences, and logout from here. You can also switch themes!', area: 'Profile' },
];

export default function OnboardingTour({ theme, onDismiss }: { theme: Theme; onDismiss: () => void }) {
  const [step, setStep] = useState(0);
  const current = TOUR_STEPS[step];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onDismiss} />
      {/* Tour Card */}
      <div className={`relative ${theme.cardBg} rounded-2xl border-2 ${theme.border} shadow-2xl p-6 max-w-md w-full mx-4 z-10`}>
        <button onClick={onDismiss} className={`absolute top-3 right-3 p-1 rounded-full ${theme.buttonHover}`}>
          <X size={16} className={theme.iconColor} />
        </button>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={16} className="text-amber-500" />
          <span className={`text-[10px] font-bold ${theme.iconColor} uppercase tracking-wide`}>Step {step + 1} of {TOUR_STEPS.length}</span>
        </div>
        <div className={`inline-block px-2 py-1 rounded-lg ${theme.accentBg} mb-2`}>
          <span className={`text-[10px] font-bold ${theme.iconColor}`}>{current.area}</span>
        </div>
        <h3 className={`text-lg font-bold ${theme.highlight} mb-2`}>{current.title}</h3>
        <p className={`text-xs ${theme.iconColor} leading-relaxed mb-4`}>{current.description}</p>
        {/* Progress dots */}
        <div className="flex items-center gap-1.5 mb-4">
          {TOUR_STEPS.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all ${i === step ? `w-6 ${theme.primary}` : `w-1.5 ${i < step ? 'bg-emerald-400' : 'bg-gray-300'}`}`} />
          ))}
        </div>
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button onClick={onDismiss} className={`text-xs ${theme.iconColor} hover:underline`}>Skip Tour</button>
          <div className="flex gap-2">
            {step > 0 && (
              <button onClick={() => setStep(step - 1)} className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold ${theme.iconColor} ${theme.buttonHover}`}>
                <ChevronLeft size={12} /> Back
              </button>
            )}
            {step < TOUR_STEPS.length - 1 ? (
              <button onClick={() => setStep(step + 1)} className={`flex items-center gap-1 px-4 py-1.5 rounded-xl text-xs font-bold text-white ${theme.primary} hover:opacity-90 transition-all`}>
                Next <ChevronRight size={12} />
              </button>
            ) : (
              <button onClick={onDismiss} className={`flex items-center gap-1 px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition-all`}>
                Get Started!
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
