'use client';

import { type Theme } from '@/lib/themes';
import { Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ComingSoon({ name, theme }: { name: string; theme?: Theme }) {
  if (!theme) return null;
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className={`w-16 h-16 rounded-2xl ${theme.secondaryBg} flex items-center justify-center mb-4`}>
        <Clock size={28} className={theme.iconColor} />
      </div>
      <h2 className={`text-xl font-bold ${theme.highlight} mb-2`}>{name} Dashboard</h2>
      <p className={`text-sm ${theme.iconColor} mb-6`}>This dashboard is being built. Check back soon.</p>
      <Link href="/" className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-2`}>
        <ArrowLeft size={14} /> Back to All Dashboards
      </Link>
    </div>
  );
}
