'use client';

import React, { useState } from 'react';
import { StatCard, DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  BookOpen, Calendar, Clock, Download, Plus, X, Users, Timer
} from 'lucide-react';

// ─── MOCK DATA ──────────────────────────────────────

const timetableData: Record<string, string[]> = {
  Mon: ['10-A Math', '10-B Math', 'Free', '9-A Science', '6-A Math', 'Free', 'Staff Meeting', 'Free'],
  Tue: ['Free', '10-B Math', '9-A Science', 'Free', 'Free', '8-A Math', '9-B Science', 'Free'],
  Wed: ['10-A Math', 'Free', 'Free', '9-B Science', '6-A Math', 'Free', 'Lab Duty', 'Free'],
  Thu: ['Free', '10-B Math', '9-A Science', 'Free', 'Free', '8-A Math', 'Free', 'PTM Slot'],
  Fri: ['10-A Math', 'Free', 'Free', '9-B Science', '6-A Math', 'Free', 'Free', 'Free'],
  Sat: ['8-A Math', '9-A Science', '6-A Math', 'Free', '', '', '', ''],
};

const periodTimings = [
  '7:50 - 8:30', '8:30 - 9:10', '9:10 - 9:50', '10:05 - 10:45',
  '10:45 - 11:25', '12:00 - 12:40', '12:40 - 1:20', '1:20 - 2:00',
];

export default function TimetableModule({ theme }: { theme: Theme }) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDay = 'Wed';
  const currentPeriod = 3; // 0-indexed, Period 4
  const [showPTMCreator, setShowPTMCreator] = useState(false);
  const [ptmSlotsGenerated, setPtmSlotsGenerated] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>My Timetable</h1>
        <div className="flex gap-2">
          <button className={`px-4 py-2.5 rounded-xl border ${theme.border} ${theme.cardBg} text-sm font-bold ${theme.iconColor} flex items-center gap-1`}><Download size={14} /> Download</button>
        </div>
      </div>

      <p className="text-[10px] text-amber-600 mb-1">📋 Bell schedule per SSA · Saturday: Half-day (4 periods)</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={BookOpen} label="Classes/Week" value="18" color="bg-blue-500" theme={theme} />
        <StatCard icon={Clock} label="Free Periods" value="14" color="bg-emerald-500" theme={theme} />
        <StatCard icon={Timer} label="Current" value="Period 4" color="bg-purple-500" sub="8-B Math" theme={theme} />
        <StatCard icon={Calendar} label="Next" value="Period 5" color="bg-amber-500" sub="6-A Math" theme={theme} />
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden overflow-x-auto`}>
        <table className="w-full text-sm">
          <thead className={theme.secondaryBg}>
            <tr>
              <th className={`text-left px-3 py-3 text-xs font-bold ${theme.iconColor} uppercase sticky left-0 ${theme.secondaryBg} z-10`}>Day</th>
              {periodTimings.map((t, i) => (
                <th key={i} className={`text-center px-2 py-3 text-xs font-bold ${theme.iconColor}`}>
                  <div>P{i + 1}</div>
                  <div className="text-[9px] font-normal">{t}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map(day => (
              <tr key={day} className={`border-t ${theme.border}`}>
                <td className={`px-3 py-2 text-xs font-bold sticky left-0 ${theme.cardBg} z-10 ${
                  day === currentDay ? theme.primaryText : theme.highlight
                }`}>
                  {day}
                  {day === currentDay && <span className="text-[9px] block text-blue-500">Today</span>}
                </td>
                {timetableData[day].map((period, i) => {
                  const isCurrent = day === currentDay && i === currentPeriod;
                  const isClass = period !== 'Free' && period !== 'Staff Meeting' && period !== 'Lab Duty' && period !== 'PTM Slot';
                  const isSpecial = period === 'Staff Meeting' || period === 'Lab Duty' || period === 'PTM Slot';
                  return (
                    <td key={i} className={`px-2 py-2 text-center`}>
                      <div className={`px-2 py-1.5 rounded-lg text-xs font-medium ${
                        isCurrent
                          ? `${theme.primary} text-white ring-2 ring-blue-400`
                          : isClass
                            ? `${theme.secondaryBg} ${theme.highlight}`
                            : isSpecial
                              ? 'bg-purple-50 text-purple-700'
                              : `${theme.accentBg} ${theme.iconColor}`
                      }`}>
                        {period}
                        {isCurrent && <div className="text-[9px] mt-0.5 text-white/80">Now</div>}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-3`}>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded ${theme.secondaryBg}`} />
            <span className={`text-xs ${theme.iconColor}`}>Teaching Period</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded ${theme.accentBg} border ${theme.border}`} />
            <span className={`text-xs ${theme.iconColor}`}>Free Period</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-purple-50" />
            <span className={`text-xs ${theme.iconColor}`}>Special Duty</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded ${theme.primary}`} />
            <span className={`text-xs ${theme.iconColor}`}>Current Period</span>
          </div>
        </div>
      </div>

      {/* ── PTM Management ── */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-blue-500" />
            <h3 className={`text-sm font-bold ${theme.highlight}`}>PTM Management</h3>
            <span className={`text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold`}>Next: 20 Feb</span>
          </div>
          <button
            onClick={() => { setShowPTMCreator(!showPTMCreator); setPtmSlotsGenerated(false); }}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg ${showPTMCreator ? 'bg-red-100 text-red-700' : `${theme.primary} text-white`} text-xs font-bold`}
          >
            {showPTMCreator ? <><X size={12} /> Cancel</> : <><Plus size={12} /> Create PTM Slots</>}
          </button>
        </div>

        {showPTMCreator && (
          <div className={`p-4 rounded-xl border ${theme.border} ${theme.secondaryBg} space-y-3 mb-4`}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Date *</label>
                <input type="date" defaultValue="2026-02-20" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`} />
              </div>
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Start Time *</label>
                <input type="time" defaultValue="09:00" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`} />
              </div>
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>End Time *</label>
                <input type="time" defaultValue="13:00" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`} />
              </div>
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Slot Duration *</label>
                <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`}>
                  <option>10 minutes</option>
                  <option selected>15 minutes</option>
                  <option>20 minutes</option>
                </select>
              </div>
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Class/Section *</label>
                <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`}>
                  <option>10-A (Class Teacher)</option>
                  <option>10-B</option>
                  <option>9-A</option>
                  <option>9-B</option>
                </select>
              </div>
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Location *</label>
                <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`}>
                  <option>Room 301</option>
                  <option>Room 302</option>
                  <option>Staff Room</option>
                  <option>Conference Room</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setPtmSlotsGenerated(true)}
                className={`flex items-center gap-1 px-4 py-2 ${theme.primary} text-white text-xs font-bold rounded-xl`}
              >
                <Calendar size={12} /> Generate Slots
              </button>
            </div>

            {ptmSlotsGenerated && (
              <div className={`mt-3 p-3 rounded-xl ${theme.cardBg} border ${theme.border}`}>
                <div className="flex items-center justify-between mb-2">
                  <p className={`text-xs font-bold ${theme.highlight}`}>Generated: 16 slots (9:00 AM - 1:00 PM, 15 min each)</p>
                  <button
                    onClick={() => { window.alert('PTM slots published! Parents can now book slots. (Blueprint demo)'); setShowPTMCreator(false); }}
                    className="px-3 py-1.5 bg-emerald-500 text-white text-xs font-bold rounded-lg hover:bg-emerald-600"
                  >
                    Publish Slots
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {['9:00-9:15', '9:15-9:30', '9:30-9:45', '9:45-10:00', '10:00-10:15', '10:15-10:30', '10:30-10:45', '10:45-11:00',
                    '11:00-11:15', '11:15-11:30', '11:30-11:45', '11:45-12:00', '12:00-12:15', '12:15-12:30', '12:30-12:45', '12:45-1:00'
                  ].map((slot, i) => {
                    const isBooked = i < 3; // first 3 booked
                    const bookedNames = ['Aarav Mehta (Parent)', 'Diya Kulkarni (Parent)', 'Nikhil Verma (Parent)'];
                    return (
                      <div key={i} className={`px-2 py-1.5 rounded-lg text-[10px] text-center font-medium ${
                        isBooked ? 'bg-blue-100 text-blue-700 border border-blue-200' : `${theme.secondaryBg} ${theme.iconColor}`
                      }`}>
                        <p className="font-bold">{slot}</p>
                        <p className="mt-0.5">{isBooked ? bookedNames[i] : 'Available'}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* PTM Schedule View */}
        <DataTable
          headers={['Slot', 'Time', 'Student', 'Parent', 'Status']}
          rows={[
            [
              <span key="s" className={`font-bold ${theme.highlight}`}>1</span>,
              <span key="t" className={theme.iconColor}>9:00 - 9:15 AM</span>,
              <span key="st" className={`font-bold ${theme.highlight}`}>Aarav Mehta</span>,
              <span key="p" className={theme.iconColor}>Mr. Suresh Mehta</span>,
              <span key="status" className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">Booked</span>,
            ],
            [
              <span key="s" className={`font-bold ${theme.highlight}`}>2</span>,
              <span key="t" className={theme.iconColor}>9:15 - 9:30 AM</span>,
              <span key="st" className={`font-bold ${theme.highlight}`}>Diya Kulkarni</span>,
              <span key="p" className={theme.iconColor}>Mrs. Asha Kulkarni</span>,
              <span key="status" className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">Booked</span>,
            ],
            [
              <span key="s" className={`font-bold ${theme.highlight}`}>3</span>,
              <span key="t" className={theme.iconColor}>9:30 - 9:45 AM</span>,
              <span key="st" className={`font-bold ${theme.highlight}`}>Nikhil Verma</span>,
              <span key="p" className={theme.iconColor}>Mr. Rajesh Verma</span>,
              <span key="status" className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">Booked</span>,
            ],
            [
              <span key="s" className={`font-bold ${theme.highlight}`}>4</span>,
              <span key="t" className={theme.iconColor}>9:45 - 10:00 AM</span>,
              <span key="st" className={`${theme.iconColor} italic`}>—</span>,
              <span key="p" className={`${theme.iconColor} italic`}>—</span>,
              <span key="status" className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">Available</span>,
            ],
            [
              <span key="s" className={`font-bold ${theme.highlight}`}>5</span>,
              <span key="t" className={theme.iconColor}>10:00 - 10:15 AM</span>,
              <span key="st" className={`${theme.iconColor} italic`}>—</span>,
              <span key="p" className={`${theme.iconColor} italic`}>—</span>,
              <span key="status" className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">Available</span>,
            ],
            [
              <span key="s" className={`font-bold ${theme.highlight}`}>6</span>,
              <span key="t" className={theme.iconColor}>10:15 - 10:30 AM</span>,
              <span key="st" className={`${theme.iconColor} italic`}>—</span>,
              <span key="p" className={`${theme.iconColor} italic`}>—</span>,
              <span key="status" className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">Available</span>,
            ],
            [
              <span key="s" className={`font-bold ${theme.highlight}`}>7</span>,
              <span key="t" className={theme.iconColor}>10:30 - 10:45 AM</span>,
              <span key="st" className={`${theme.iconColor} italic`}>—</span>,
              <span key="p" className={`${theme.iconColor} italic`}>—</span>,
              <span key="status" className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">Available</span>,
            ],
            [
              <span key="s" className={`font-bold ${theme.highlight}`}>8</span>,
              <span key="t" className={theme.iconColor}>10:45 - 11:00 AM</span>,
              <span key="st" className={`${theme.iconColor} italic`}>—</span>,
              <span key="p" className={`${theme.iconColor} italic`}>—</span>,
              <span key="status" className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">Available</span>,
            ],
          ]}
          theme={theme}
        />
        <p className={`text-[10px] ${theme.iconColor} mt-2`}>PTM for Class 10-A on 20 Feb 2026 | 3 booked, 5 available of 8 morning slots shown</p>
      </div>
    </div>
  );
}
