'use client';

import React from 'react';
import { type Theme } from '@/lib/themes';
import { FileText } from 'lucide-react';

export default function CertificatesModule({ theme }: { theme: Theme }) {
  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Certificates</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['Transfer Certificate', 'Bonafide Certificate', 'Character Certificate', 'Study Certificate'].map(c => (
          <div key={c} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 text-center cursor-pointer hover:shadow-md transition-all`}>
            <FileText size={24} className={`${theme.iconColor} mx-auto mb-2`} />
            <p className={`text-xs font-bold ${theme.highlight}`}>{c}</p>
            <button className={`text-[10px] ${theme.primaryText} font-bold mt-2`}>Generate</button>
          </div>
        ))}
      </div>
    </div>
  );
}
