'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { StatCard, StatusBadge, TabBar, DataTable } from '@/components/shared';
import { mockRoutes } from '@/lib/mock-data';
import { Bus, MapPin, AlertTriangle } from 'lucide-react';

export default function TransportModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Routes');
  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Transport Management</h1>
      <TabBar tabs={['Routes', 'Vehicles', 'GPS Tracking']} active={tab} onChange={setTab} theme={theme} />
      {tab === 'Routes' && (
        <DataTable
          headers={['Route ID', 'Name', 'Driver', 'Vehicle', 'Students', 'Stops', 'Status']}
          rows={mockRoutes.map(r => [
            <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{r.id}</span>,
            <span key="name" className={`font-bold ${theme.highlight}`}>{r.name}</span>,
            <span key="driver" className={theme.iconColor}>{r.driver}</span>,
            <span key="vehicle" className={theme.iconColor}>{r.vehicle}</span>,
            <span key="students" className={`font-bold ${theme.highlight}`}>{r.students}</span>,
            <span key="stops" className={theme.iconColor}>{r.stops}</span>,
            <StatusBadge key="status" status="Running" theme={theme} />,
          ])}
          theme={theme}
        />
      )}
      {tab === 'Vehicles' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { no: 'GJ-01-AB-1234', type: 'Bus (40 seats)', km: '45,230 km', status: 'Running' },
            { no: 'GJ-01-CD-5678', type: 'Bus (50 seats)', km: '38,120 km', status: 'Running' },
            { no: 'GJ-01-EF-9012', type: 'Mini Bus (30 seats)', km: '52,870 km', status: 'Running' },
          ].map((v, i) => (
            <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
              <div className="flex justify-between items-start mb-2">
                <h4 className={`text-sm font-bold ${theme.highlight}`}>{v.no}</h4>
                <StatusBadge status={v.status} theme={theme} />
              </div>
              <p className={`text-xs ${theme.iconColor}`}>{v.type}</p>
              <p className={`text-xs ${theme.iconColor} mt-1`}>Odometer: <span className="font-bold">{v.km}</span></p>
            </div>
          ))}
        </div>
      )}
      {tab === 'GPS Tracking' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <StatCard icon={Bus} label="On Route" value="3" color="bg-emerald-500" theme={theme} />
            <StatCard icon={MapPin} label="At School" value="1" color="bg-blue-500" theme={theme} />
            <StatCard icon={AlertTriangle} label="Delayed" value="0" color="bg-amber-500" theme={theme} />
          </div>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6`}>
            <div className={`w-full h-64 ${theme.accentBg} rounded-xl flex items-center justify-center`}>
              <div className="text-center">
                <MapPin size={48} className={theme.iconColor} />
                <p className={`text-sm ${theme.iconColor} mt-2`}>Live GPS Map View</p>
                <p className={`text-xs ${theme.iconColor}`}>pompombus.com API integration</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
