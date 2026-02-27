'use client';

import { type Theme } from '@/lib/themes';
import { Star } from 'lucide-react';
import { plans, schools } from './mockData';

export default function PlansView({ theme }: { theme: Theme }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className={`text-lg font-bold ${theme.highlight}`}>Plans & Billing</h2>
        <p className={`text-xs ${theme.iconColor}`}>Manage subscription plans and pricing</p>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map(p => (
          <div key={p.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
            <div className={`w-10 h-10 rounded-xl ${p.color} text-white flex items-center justify-center mb-3`}>
              <Star size={18} />
            </div>
            <h3 className={`text-lg font-bold ${theme.highlight}`}>{p.name}</h3>
            <p className={`text-sm font-bold ${theme.primaryText} mt-1`}>{p.price}</p>
            <div className={`mt-4 space-y-2 text-xs ${theme.iconColor}`}>
              <p>✓ {p.modules} modules included</p>
              <p>✓ Up to {p.maxStudents} students</p>
              <p>✓ Up to {p.maxStaff} staff</p>
              <p>✓ Email + chat support</p>
              {p.id === 'enterprise' && <p>✓ Dedicated account manager</p>}
              {p.id === 'enterprise' && <p>✓ API access + custom reports</p>}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className={`text-xs font-bold ${theme.highlight}`}>{schools.filter(s => s.plan === p.name).length} schools</span>
              <button className={`text-xs ${theme.primaryText} font-bold`}>Edit →</button>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Summary */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Revenue Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-lg font-bold ${theme.highlight}`}>₹5.45L</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Current MRR</p>
          </div>
          <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-lg font-bold ${theme.highlight}`}>₹65.4L</p>
            <p className={`text-[10px] ${theme.iconColor}`}>ARR</p>
          </div>
          <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-lg font-bold text-emerald-600`}>+12%</p>
            <p className={`text-[10px] ${theme.iconColor}`}>MoM Growth</p>
          </div>
          <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-lg font-bold text-red-500`}>1</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Churned (Lifetime)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
