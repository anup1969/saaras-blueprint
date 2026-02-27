'use client';

import React from 'react';
import { type Theme } from '@/lib/themes';
import { Users } from 'lucide-react';
import type { ChildProfile } from './types';

export default function ChildSelector({ children: childList, selected, onChange, theme }: {
  children: ChildProfile[]; selected: string; onChange: (id: string) => void; theme: Theme;
}) {
  return (
    <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-3 mb-4`}>
      <div className="flex items-center gap-2 mb-2">
        <Users size={14} className={theme.iconColor} />
        <p className={`text-xs font-bold ${theme.iconColor} uppercase`}>Select Child</p>
      </div>
      <div className="flex gap-2">
        {childList.map((child) => (
          <button
            key={child.id}
            onClick={() => onChange(child.id)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all ${
              selected === child.id
                ? `${theme.primary} text-white border-transparent shadow-md`
                : `${theme.border} ${theme.buttonHover} ${theme.iconColor}`
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
              selected === child.id ? 'bg-white/20 text-white' : `${theme.secondaryBg} ${theme.highlight}`
            }`}>
              {child.photo}
            </div>
            <div className="text-left">
              <p className={`text-sm font-bold ${selected === child.id ? 'text-white' : theme.highlight}`}>{child.name}</p>
              <p className={`text-[10px] ${selected === child.id ? 'text-white/70' : theme.iconColor}`}>
                Class {child.class}-{child.section} | Roll #{child.roll}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
