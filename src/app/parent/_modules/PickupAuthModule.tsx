'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { DataTable } from '@/components/shared';
import {
  Clock, Shield,
  CheckCircle, Plus, X,
  Phone, User,
  Camera,
} from 'lucide-react';
import type { ChildProfile } from '../_components/types';
import { pickupAuthData, childrenData } from '../_components/data';

export default function PickupAuthModule({ theme, child }: { theme: Theme; child: ChildProfile }) {
  const pickup = pickupAuthData[child.id];
  const [showAddForm, setShowAddForm] = useState(false);
  const [showPickupRequest, setShowPickupRequest] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className={`text-lg font-bold ${theme.highlight}`}>Pickup Authorization</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setShowPickupRequest(!showPickupRequest); if (!showPickupRequest) setShowAddForm(false); }}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg ${showPickupRequest ? 'bg-red-100 text-red-700' : 'bg-amber-500 text-white'} text-xs font-bold`}
          >
            {showPickupRequest ? <X size={12} /> : <Clock size={12} />}
            {showPickupRequest ? 'Cancel' : 'Request Early Pickup'}
          </button>
          <button
            onClick={() => { setShowAddForm(!showAddForm); if (!showAddForm) setShowPickupRequest(false); }}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg ${theme.primary} text-white text-xs font-bold`}
          >
            {showAddForm ? <X size={12} /> : <Plus size={12} />}
            {showAddForm ? 'Cancel' : 'Add Person'}
          </button>
        </div>
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center gap-2 mb-3">
          <Shield size={14} className={theme.primaryText} />
          <p className={`text-xs ${theme.iconColor} leading-relaxed`}>
            Only authorized persons listed below can pick up {child.name} from school. School security verifies identity before releasing the child. Changes require 24 hours to take effect.
          </p>
        </div>
      </div>

      {/* Add Person Form */}
      {showAddForm && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 border-l-2 border-l-blue-500`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-4`}>Add Authorized Person</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Full Name *</label>
              <input placeholder="Enter full name" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`} />
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Relation to Child *</label>
              <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`}>
                <option>Select Relation...</option>
                <option>Uncle (Kaka)</option>
                <option>Uncle (Mama)</option>
                <option>Aunt (Kaki)</option>
                <option>Aunt (Mami)</option>
                <option>Aunt (Foi)</option>
                <option>Grandparent</option>
                <option>Family Driver</option>
                <option>Neighbour</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Phone Number *</label>
              <input placeholder="+91 XXXXX XXXXX" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`} />
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Aadhaar Last 4 Digits *</label>
              <input placeholder="XXXX" maxLength={4} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`} />
            </div>
            <div className="col-span-2">
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Photo (for verification)</label>
              <div className={`border-2 border-dashed ${theme.border} rounded-xl p-4 text-center cursor-pointer ${theme.buttonHover} transition-all`}>
                <Camera size={20} className={`${theme.iconColor} mx-auto mb-1`} />
                <p className={`text-xs ${theme.iconColor}`}>Click to upload photo or drag and drop</p>
                <p className={`text-[10px] ${theme.iconColor} mt-0.5 opacity-60`}>JPG, PNG up to 2MB</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 mt-4">
            <button onClick={() => setShowAddForm(false)} className={`px-4 py-2 rounded-xl ${theme.secondaryBg} ${theme.iconColor} text-xs font-bold`}>
              Cancel
            </button>
            <button className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>
              Submit for Approval
            </button>
          </div>
        </div>
      )}

      {/* Early Pickup Request Form */}
      {showPickupRequest && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5 border-l-2 border-l-amber-500`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-4`}>Request Early Pickup</h3>
          <div className="grid grid-cols-2 gap-3">
            {childrenData.length > 1 && (
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Select Child *</label>
                <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`}>
                  {childrenData.map(c => (
                    <option key={c.id}>{c.name} (Class {c.class}-{c.section})</option>
                  ))}
                </select>
              </div>
            )}
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Pickup Date *</label>
              <input type="date" defaultValue="2026-02-25" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`} />
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Pickup Time *</label>
              <input type="time" defaultValue="11:30" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`} />
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Reason *</label>
              <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`}>
                <option>Select Reason...</option>
                <option>Medical Appointment</option>
                <option>Family Emergency</option>
                <option>Doctor/Dentist Appointment</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Person Picking Up *</label>
              <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`}>
                <option>Self</option>
                {pickup.persons.map(p => (
                  <option key={p.id}>{p.name} ({p.relation})</option>
                ))}
              </select>
            </div>
            <div className={childrenData.length > 1 ? '' : 'col-span-2'}>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Notes</label>
              <input placeholder="Any additional information..." className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none`} />
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 mt-4">
            <button onClick={() => setShowPickupRequest(false)} className={`px-4 py-2 rounded-xl ${theme.secondaryBg} ${theme.iconColor} text-xs font-bold`}>Cancel</button>
            <button onClick={() => { window.alert('Pickup request sent to class teacher for approval! (Blueprint demo)'); setShowPickupRequest(false); }} className="px-4 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 transition-all">
              Submit Request
            </button>
          </div>

          {/* Recent Pickup Requests */}
          <div className={`mt-4 pt-4 border-t ${theme.border}`}>
            <h4 className={`text-xs font-bold ${theme.highlight} mb-2`}>Recent Pickup Requests</h4>
            <DataTable
              headers={['Date', 'Child', 'Time', 'Status', 'Approved By']}
              rows={[
                [
                  <span key="d" className={theme.iconColor}>20 Feb 2026</span>,
                  <span key="c" className={`font-bold ${theme.highlight}`}>Aarav Patel</span>,
                  <span key="t" className={theme.highlight}>11:00 AM</span>,
                  <span key="s" className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">Approved</span>,
                  <span key="a" className={theme.iconColor}>Mrs. Sunita Sharma</span>,
                ],
                [
                  <span key="d" className={theme.iconColor}>15 Feb 2026</span>,
                  <span key="c" className={`font-bold ${theme.highlight}`}>Ananya Patel</span>,
                  <span key="t" className={theme.highlight}>12:30 PM</span>,
                  <span key="s" className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">Approved</span>,
                  <span key="a" className={theme.iconColor}>Mr. Ramesh Iyer</span>,
                ],
                [
                  <span key="d" className={theme.iconColor}>10 Feb 2026</span>,
                  <span key="c" className={`font-bold ${theme.highlight}`}>Aarav Patel</span>,
                  <span key="t" className={theme.highlight}>10:45 AM</span>,
                  <span key="s" className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700">Rejected</span>,
                  <span key="a" className={theme.iconColor}>-</span>,
                ],
              ]}
              theme={theme}
            />
          </div>
        </div>
      )}

      {/* Authorized Persons List */}
      <div className="space-y-3">
        {pickup.persons.map((person) => (
          <div key={person.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex items-center gap-4`}>
            {/* Photo Placeholder */}
            <div className={`w-14 h-14 rounded-xl ${theme.secondaryBg} flex items-center justify-center border ${theme.border}`}>
              <User size={24} className={theme.iconColor} />
            </div>

            {/* Details */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className={`text-sm font-bold ${theme.highlight}`}>{person.name}</p>
                {person.isDefault && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-700">Primary</span>
                )}
              </div>
              <div className="flex items-center gap-4 mt-1">
                <span className={`text-xs ${theme.iconColor}`}>{person.relation}</span>
                <span className={`text-xs ${theme.iconColor} flex items-center gap-1`}><Phone size={10} /> {person.phone}</span>
                <span className={`text-xs ${theme.iconColor}`}>Aadhaar: ****{person.aadhaarLast4}</span>
              </div>
              <p className={`text-[10px] ${theme.iconColor} mt-1 opacity-60`}>Added: {person.addedOn}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center gap-1">
                <CheckCircle size={10} /> Verified
              </span>
              {!person.isDefault && (
                <button className={`p-2 rounded-lg ${theme.secondaryBg} ${theme.iconColor} hover:text-red-500 transition-all`} title="Remove">
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Pickup Log */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Recent Pickup Log</h3>
        <DataTable
          headers={['Date', 'Time', 'Picked Up By', 'Relation', 'Verified By']}
          rows={[
            [
              <span key="d" className={theme.iconColor}>12 Feb 2026</span>,
              <span key="t" className={theme.highlight}>2:50 PM</span>,
              <span key="n" className={`font-bold ${theme.highlight}`}>Rajesh Patel</span>,
              <span key="r" className={theme.iconColor}>Father</span>,
              <span key="v" className={theme.iconColor}>Gate Security - Raju</span>,
            ],
            [
              <span key="d" className={theme.iconColor}>11 Feb 2026</span>,
              <span key="t" className={theme.highlight}>2:45 PM</span>,
              <span key="n" className={`font-bold ${theme.highlight}`}>Meena Patel</span>,
              <span key="r" className={theme.iconColor}>Mother</span>,
              <span key="v" className={theme.iconColor}>Gate Security - Raju</span>,
            ],
            [
              <span key="d" className={theme.iconColor}>10 Feb 2026</span>,
              <span key="t" className={theme.highlight}>3:10 PM</span>,
              <span key="n" className={`font-bold ${theme.highlight}`}>School Bus</span>,
              <span key="r" className={theme.iconColor}>Transport</span>,
              <span key="v" className={theme.iconColor}>Conductor - Sunil</span>,
            ],
            [
              <span key="d" className={theme.iconColor}>07 Feb 2026</span>,
              <span key="t" className={theme.highlight}>2:55 PM</span>,
              <span key="n" className={`font-bold ${theme.highlight}`}>Suresh Patel</span>,
              <span key="r" className={theme.iconColor}>Grandfather</span>,
              <span key="v" className={theme.iconColor}>Gate Security - Manoj</span>,
            ],
          ]}
          theme={theme}
        />
      </div>
    </div>
  );
}
