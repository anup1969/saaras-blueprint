'use client';

import React from 'react';
import { type Theme } from '@/lib/themes';
import {
  Bus, Phone, User,
  MapPin, Navigation, Map, CircleDot,
} from 'lucide-react';
import type { ChildProfile } from '../_components/types';
import { transportData } from '../_components/data';

export default function TransportModule({ theme, child }: { theme: Theme; child: ChildProfile }) {
  const tr = transportData[child.id];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className={`text-lg font-bold ${theme.highlight}`}>Transport &amp; Bus Tracking</h2>
        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-1">
          <CircleDot size={10} /> Bus In Transit
        </span>
      </div>

      <p className="text-[10px] text-amber-600 mb-1">Pickup policy: OTP verification required -- Pre-registration: ON -- configured by SSA</p>
      {/* Bus Info Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center">
              <Bus size={18} />
            </div>
            <div>
              <p className={`text-lg font-bold ${theme.highlight}`}>{tr.busNo}</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Route: {tr.routeNo}</p>
              <p className={`text-[10px] ${theme.iconColor}`}>{tr.vehicleNo}</p>
            </div>
          </div>
        </div>
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
              <User size={18} />
            </div>
            <div>
              <p className={`text-sm font-bold ${theme.highlight}`}>{tr.driverName}</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Driver</p>
              <p className={`text-[10px] ${theme.primaryText} font-bold`}>{tr.driverPhone}</p>
            </div>
          </div>
        </div>
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500 text-white flex items-center justify-center">
              <User size={18} />
            </div>
            <div>
              <p className={`text-sm font-bold ${theme.highlight}`}>{tr.conductorName}</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Conductor</p>
              <p className={`text-[10px] ${theme.primaryText} font-bold`}>{tr.conductorPhone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Route + Map Area */}
      <div className="grid grid-cols-2 gap-4">
        {/* Route Details */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-1`}>Route: {tr.routeName}</h3>
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-[10px] ${theme.iconColor}`}>Pickup: {tr.pickupStop} at {tr.pickupTime}</span>
            <span className={`text-[10px] ${theme.iconColor}`}>|</span>
            <span className={`text-[10px] ${theme.iconColor}`}>Drop: {tr.dropStop} at {tr.dropTime}</span>
          </div>

          {/* Stops Timeline */}
          <div className="space-y-0">
            {tr.stops.map((stop, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    stop.isCurrent ? 'border-emerald-500 bg-emerald-500' :
                    stop.isChild ? 'border-blue-500 bg-blue-500' :
                    'border-gray-300 bg-white'
                  }`}>
                    {stop.isCurrent && <Navigation size={8} className="text-white" />}
                    {stop.isChild && <User size={8} className="text-white" />}
                  </div>
                  {i < tr.stops.length - 1 && (
                    <div className={`w-0.5 h-8 ${stop.isCurrent ? 'bg-emerald-300' : 'bg-gray-200'}`} />
                  )}
                </div>
                <div className={`pb-4 ${stop.isChild ? '-mt-0.5' : '-mt-0.5'}`}>
                  <p className={`text-xs font-bold ${stop.isChild ? theme.primaryText : stop.isCurrent ? 'text-emerald-600' : theme.highlight}`}>
                    {stop.name}
                    {stop.isChild && <span className="ml-1 text-[10px] font-bold text-blue-600">(Your Stop)</span>}
                    {stop.isCurrent && <span className="ml-1 text-[10px] font-bold text-emerald-600">(Bus Here)</span>}
                  </p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{stop.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-2 p-2 rounded-xl ${theme.secondaryBg} flex items-center justify-between`}>
            <span className={`text-xs ${theme.iconColor}`}>Estimated Arrival at School</span>
            <span className={`text-xs font-bold text-emerald-600`}>{tr.estimatedArrival}</span>
          </div>
        </div>

        {/* Live Tracking Map Placeholder */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex flex-col`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Live Tracking</h3>
          <div className={`flex-1 rounded-xl ${theme.secondaryBg} border ${theme.border} flex flex-col items-center justify-center min-h-[280px]`}>
            <Map size={48} className={theme.iconColor} />
            <p className={`text-sm font-bold ${theme.highlight} mt-3`}>Live Map View</p>
            <p className={`text-[10px] ${theme.iconColor} mt-1 text-center px-8`}>
              Real-time GPS tracking will be displayed here. The bus location updates every 30 seconds during transit hours.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                <CircleDot size={8} /> Bus Location
              </span>
              <span className="flex items-center gap-1 text-[10px] font-bold text-blue-600">
                <MapPin size={8} /> Your Stop
              </span>
              <span className="flex items-center gap-1 text-[10px] font-bold text-red-600">
                <MapPin size={8} /> School
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <button className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>
              <Phone size={12} /> Call Driver
            </button>
            <button className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-xl ${theme.secondaryBg} ${theme.iconColor} text-xs font-bold`}>
              <Phone size={12} /> Call Conductor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
