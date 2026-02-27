'use client';

import React, { useState } from 'react';
import { StatCard, StatusBadge } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import { Bus, Navigation, Wrench, CircleDot, Timer } from 'lucide-react';

// ─── MOCK DATA ──────────────────────────────────────
const mockGPSVehicles = [
  { vehicle: 'GJ-01-AB-1234', route: 'Route A', speed: '35 km/h', lastStop: 'Jodhpur Cross Roads', nextStop: 'Satellite Circle', eta: '7:42 AM', progress: 75, status: 'Running' },
  { vehicle: 'GJ-01-CD-5678', route: 'Route B', speed: '28 km/h', lastStop: 'Prahlad Nagar Garden', nextStop: 'Thaltej Cross Roads', eta: '7:38 AM', progress: 60, status: 'Running' },
  { vehicle: 'GJ-01-EF-9012', route: 'Route C', speed: '42 km/h', lastStop: 'Bodakdev', nextStop: 'Judges Bungalow', eta: '7:50 AM', progress: 45, status: 'Running' },
  { vehicle: 'GJ-01-GH-3456', route: 'Route D', speed: '0 km/h', lastStop: 'Isanpur Circle', nextStop: 'Maninagar Station', eta: '7:35 AM', progress: 30, status: 'Stopped' },
  { vehicle: 'GJ-01-IJ-7890', route: 'Route E', speed: '22 km/h', lastStop: 'Paldi', nextStop: 'Navrangpura BRTS', eta: '7:30 AM', progress: 85, status: 'Running' },
  { vehicle: 'GJ-01-KL-2345', route: 'Route F', speed: '38 km/h', lastStop: 'Motera Stadium', nextStop: 'Chandkheda BRTS', eta: '7:55 AM', progress: 40, status: 'Running' },
];

export default function GPSTrackingModule({ theme }: { theme: Theme }) {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Live GPS Tracking</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className={`text-xs ${theme.iconColor}`}>Live</span>
          </div>
          <span className={`text-xs ${theme.iconColor}`}>Last updated: 7:35 AM</span>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Navigation} label="Running" value={5} color="bg-emerald-500" theme={theme} />
        <StatCard icon={CircleDot} label="Stopped" value={1} color="bg-red-500" theme={theme} />
        <StatCard icon={Wrench} label="In Garage" value={0} color="bg-amber-500" sub="" theme={theme} />
        <StatCard icon={Timer} label="Avg Speed" value="32 km/h" color="bg-blue-500" theme={theme} />
      </div>

      {/* Map Placeholder */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Live Map View</h3>
        <div className={`w-full h-80 rounded-xl ${theme.secondaryBg} border ${theme.border} relative overflow-hidden`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Navigation size={40} className={theme.iconColor} />
              <p className={`text-sm ${theme.iconColor} mt-2`}>Live GPS Map</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Google Maps with real-time vehicle positions</p>
            </div>
          </div>
          {/* Simulated vehicle dots */}
          <div className="absolute top-[20%] left-[30%] w-3 h-3 bg-emerald-500 rounded-full animate-pulse" title="GJ-01-AB-1234 - Route A" />
          <div className="absolute top-[40%] left-[55%] w-3 h-3 bg-emerald-500 rounded-full animate-pulse" title="GJ-01-CD-5678 - Route B" />
          <div className="absolute top-[60%] left-[25%] w-3 h-3 bg-emerald-500 rounded-full animate-pulse" title="GJ-01-EF-9012 - Route C" />
          <div className="absolute top-[35%] left-[70%] w-3 h-3 bg-red-500 rounded-full" title="GJ-01-GH-3456 - Route D - Stopped" />
          <div className="absolute top-[75%] left-[45%] w-3 h-3 bg-emerald-500 rounded-full animate-pulse" title="GJ-01-IJ-7890 - Route E" />
          <div className="absolute top-[15%] left-[65%] w-3 h-3 bg-emerald-500 rounded-full animate-pulse" title="GJ-01-KL-2345 - Route F" />
        </div>
      </div>

      {/* Vehicle Tracking Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockGPSVehicles.map((v, i) => (
          <div
            key={i}
            onClick={() => setSelectedVehicle(v.vehicle === selectedVehicle ? null : v.vehicle)}
            className={`${theme.cardBg} rounded-2xl border ${v.vehicle === selectedVehicle ? 'border-emerald-400 ring-1 ring-emerald-400' : theme.border} p-4 cursor-pointer transition-all`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg ${v.status === 'Running' ? 'bg-emerald-100' : 'bg-red-100'} flex items-center justify-center`}>
                  <Bus size={14} className={v.status === 'Running' ? 'text-emerald-600' : 'text-red-600'} />
                </div>
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>{v.vehicle}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{v.route} Route</p>
                </div>
              </div>
              <StatusBadge status={v.status === 'Running' ? 'Active' : 'Overdue'} theme={theme} />
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className={`p-2 rounded-lg ${theme.accentBg}`}>
                <p className={`text-[10px] ${theme.iconColor}`}>Speed</p>
                <p className={`text-xs font-bold ${theme.highlight}`}>{v.speed}</p>
              </div>
              <div className={`p-2 rounded-lg ${theme.accentBg}`}>
                <p className={`text-[10px] ${theme.iconColor}`}>ETA to School</p>
                <p className={`text-xs font-bold ${theme.highlight}`}>{v.eta}</p>
              </div>
            </div>

            <div className="mb-2">
              <div className="flex justify-between mb-1">
                <span className={`text-[10px] ${theme.iconColor}`}>Route Progress</span>
                <span className={`text-[10px] font-bold ${theme.primaryText}`}>{v.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className={`h-2 rounded-full ${v.status === 'Running' ? 'bg-emerald-500' : 'bg-red-400'}`} style={{ width: `${v.progress}%` }} />
              </div>
            </div>

            <div className="flex justify-between">
              <span className={`text-[10px] ${theme.iconColor}`}>Last: {v.lastStop}</span>
              <span className={`text-[10px] ${theme.iconColor}`}>Next: {v.nextStop}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
