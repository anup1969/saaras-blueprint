'use client';

import React, { useState } from 'react';
import { SSAToggle, SectionCard, ModuleHeader, InputField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

type VisitorTypeRules = {
  toggles: Record<string, boolean>;
  allowedFrom: string;
  allowedTo: string;
  maxDuration: string;
};

const defaultVisitorTypeRules: Record<string, VisitorTypeRules> = {
  'Parent': {
    toggles: {
      'Pre-registration required': true,
      'Photo ID verification': true,
      'Pickup authorization required': true,
      'Escort required': false,
      'Areas allowed: Office': true,
      'Areas allowed: Classroom': false,
      'Areas allowed: Campus': true,
    },
    allowedFrom: '08:00',
    allowedTo: '16:00',
    maxDuration: '60',
  },
  'Vendor / Supplier': {
    toggles: {
      'Pre-registration MANDATORY': true,
      'Photo capture at gate': true,
      'Delivery area only': true,
      'POC (Point of Contact) required': true,
      'Valid ID required': true,
      'Background check status': false,
    },
    allowedFrom: '09:00',
    allowedTo: '15:00',
    maxDuration: '120',
  },
  'General Visitor': {
    toggles: {
      'Pre-registration required': false,
      'Photo capture': true,
      'Purpose of visit required': true,
      'Escort mandatory': true,
      'Restricted areas enforced': true,
    },
    allowedFrom: '09:00',
    allowedTo: '17:00',
    maxDuration: '45',
  },
  'Contractor': {
    toggles: {
      'Pre-registration MANDATORY': true,
      'Safety briefing required': true,
      'Work permit required': true,
      'Designated work area enforced': true,
      'Supervisor contact required': true,
      'Valid insurance': true,
    },
    allowedFrom: '07:00',
    allowedTo: '18:00',
    maxDuration: '480',
  },
  'Government Official': {
    toggles: {
      'Fast-track entry': true,
      'ID verification': true,
      'Principal notification auto-trigger': true,
      'No time limit': true,
      'Escort assigned': true,
    },
    allowedFrom: '08:00',
    allowedTo: '18:00',
    maxDuration: '0',
  },
  'Alumni': {
    toggles: {
      'Pre-registration optional': true,
      'Alumni ID verification': true,
      'Event-based access only': false,
      'Campus tour allowed': true,
      'Classrooms restricted': true,
    },
    allowedFrom: '09:00',
    allowedTo: '17:00',
    maxDuration: '120',
  },
};

export default function VisitorConfigModule({ theme }: { theme: Theme }) {
  const [pickupMethod, setPickupMethod] = useState('otp');
  const [activeVisitorType, setActiveVisitorType] = useState('Parent');
  const [visitorRules, setVisitorRules] = useState<Record<string, VisitorTypeRules>>(defaultVisitorTypeRules);
  const [cctvParentAccess, setCctvParentAccess] = useState(false);
  const [cctvRetentionDays, setCctvRetentionDays] = useState('30');

  const visitorTypes = Object.keys(defaultVisitorTypeRules);
  const currentRules = visitorRules[activeVisitorType];

  function setToggle(rule: string, val: boolean) {
    setVisitorRules(prev => ({
      ...prev,
      [activeVisitorType]: {
        ...prev[activeVisitorType],
        toggles: { ...prev[activeVisitorType].toggles, [rule]: val },
      },
    }));
  }

  function setTimingField(field: 'allowedFrom' | 'allowedTo' | 'maxDuration', val: string) {
    setVisitorRules(prev => ({
      ...prev,
      [activeVisitorType]: { ...prev[activeVisitorType], [field]: val },
    }));
  }

  return (
    <div className="space-y-4">
      <ModuleHeader title="Visitor & Pickup Rules" subtitle="Per-visitor-type rules, verification, and security configuration" theme={theme} />

      <SectionCard title="Pickup Verification Method" subtitle="How student pickup is verified" theme={theme}>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'otp', name: 'OTP Verification', desc: 'Parent receives OTP on phone' },
            { id: 'photo', name: 'Photo Match', desc: 'Guard matches face with registered photo' },
            { id: 'rfid', name: 'RFID/QR Card', desc: 'Parent scans card at gate' },
          ].map(m => (
            <button key={m.id} onClick={() => setPickupMethod(m.id)}
              className={`p-3 rounded-xl text-left border-2 transition-all ${pickupMethod === m.id ? `${theme.primary} text-white border-transparent` : `${theme.secondaryBg} ${theme.border}`}`}>
              <p className={`text-xs font-bold ${pickupMethod === m.id ? '' : theme.highlight}`}>{m.name}</p>
              <p className={`text-[10px] mt-1 ${pickupMethod === m.id ? 'text-white/80' : theme.iconColor}`}>{m.desc}</p>
            </button>
          ))}
        </div>
      </SectionCard>

      {/* Visitor Type Rules */}
      <SectionCard title="Visitor Type Rules" subtitle="Select a visitor type to configure its specific entry rules" theme={theme}>
        {/* Type tab bar */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {visitorTypes.map(vt => (
            <button key={vt} onClick={() => setActiveVisitorType(vt)}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all whitespace-nowrap ${
                activeVisitorType === vt ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.highlight} border ${theme.border}`
              }`}>
              {vt}
            </button>
          ))}
        </div>

        {/* Rules for active type */}
        <div className="grid grid-cols-2 gap-4">
          {/* Toggle rules */}
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-2 uppercase tracking-wide`}>Rules — {activeVisitorType}</p>
            <div className="space-y-1.5">
              {Object.entries(currentRules.toggles).map(([rule, enabled]) => (
                <div key={rule} className={`flex items-center justify-between p-2 rounded-xl ${theme.secondaryBg}`}>
                  <div className="flex-1 mr-2">
                    <p className={`text-xs font-bold ${theme.highlight}`}>{rule}</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>{
                      ({
                        'Pre-registration required': 'Visitor must register in advance via app or website before arriving',
                        'Photo ID verification': 'Gate staff verifies visitor\'s government-issued photo ID before entry',
                        'Pickup authorization required': 'Parent must pre-authorize any non-guardian pickup via the app',
                        'Escort required': 'Visitor must be accompanied by a school staff member on campus',
                        'Areas allowed: Office': 'Visitor can access the admin office area',
                        'Areas allowed: Classroom': 'Visitor can access classroom areas (requires teacher permission)',
                        'Areas allowed: Campus': 'Visitor can move freely across the campus',
                        'PO/Work order mandatory': 'Vendor must have an active purchase order or work order to enter campus',
                        'Delivery only at store': 'Vendor delivery is restricted to the school store/receiving area only',
                        'Contractor badge required': 'Contractor must wear a visible identification badge while on campus',
                        'Work permit on file': 'Contractor must have a work permit uploaded and approved before campus entry',
                        'Safety gear check': 'Gate staff verifies contractor is wearing required safety gear (helmet, vest, etc.)',
                        'Fast-track entry': 'Government officials get expedited entry without standard waiting procedures',
                        'ID verification': 'Government official\'s credentials are verified and logged',
                        'Principal notification auto-trigger': 'Principal is immediately notified via push + SMS when a government official enters',
                        'No time limit': 'No maximum visit duration — visit ends when the official decides to leave',
                        'Escort assigned': 'A designated staff member escorts the official throughout their visit',
                        'Pre-registration optional': 'Alumni may optionally register in advance but walk-ins are also accepted',
                        'Alumni ID verification': 'Alumni must verify identity (batch year, roll number) at the gate',
                        'Event-based access only': 'Alumni can only visit during school events — no casual visits allowed',
                        'Campus tour allowed': 'Alumni can take a tour of the campus to revisit old classrooms and facilities',
                        'Classrooms restricted': 'Alumni cannot enter active classrooms — restricted to common areas only',
                      } as Record<string, string>)[rule] || 'Rule configuration for this visitor type'
                    }</p>
                  </div>
                  <SSAToggle on={enabled} onChange={() => setToggle(rule, !enabled)} theme={theme} />
                </div>
              ))}
            </div>
          </div>

          {/* Timing settings */}
          <div className="space-y-3">
            <p className={`text-[10px] font-bold ${theme.iconColor} uppercase tracking-wide`}>Timing — {activeVisitorType}</p>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Allowed From</p>
              <InputField value={currentRules.allowedFrom} onChange={v => setTimingField('allowedFrom', v)} theme={theme} type="time" />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Allowed To</p>
              <InputField value={currentRules.allowedTo} onChange={v => setTimingField('allowedTo', v)} theme={theme} type="time" />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>
                Max Visit Duration (minutes)
                {activeVisitorType === 'Government Official' && <span className="ml-1 text-amber-500">— 0 = no limit</span>}
              </p>
              <InputField value={currentRules.maxDuration} onChange={v => setTimingField('maxDuration', v)} theme={theme} type="number" placeholder="minutes (0 = no limit)" />
            </div>

            {/* Type-specific notes */}
            <div className={`p-2.5 rounded-xl ${theme.accentBg} border ${theme.border}`}>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Note</p>
              {activeVisitorType === 'Parent' && <p className={`text-[10px] ${theme.iconColor}`}>Parents picking up students go through the standard pickup verification flow (OTP / photo / RFID above).</p>}
              {activeVisitorType === 'Vendor / Supplier' && <p className={`text-[10px] ${theme.iconColor}`}>Vendor entry is logged and linked to Purchase Orders when available.</p>}
              {activeVisitorType === 'General Visitor' && <p className={`text-[10px] ${theme.iconColor}`}>Unregistered visitors must fill a digital form at the gate before entry is approved.</p>}
              {activeVisitorType === 'Contractor' && <p className={`text-[10px] ${theme.iconColor}`}>Work permits are digitally uploaded and verified before the contractor is allowed on campus.</p>}
              {activeVisitorType === 'Government Official' && <p className={`text-[10px] ${theme.iconColor}`}>Principal is auto-notified via push + SMS as soon as entry is logged for this type.</p>}
              {activeVisitorType === 'Alumni' && <p className={`text-[10px] ${theme.iconColor}`}>Alumni can be issued a digital alumni ID card via the app for faster future visits.</p>}
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Campus CCTV" subtitle="Parent access and recording settings for campus cameras" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Live CCTV Access for Parents</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Parents can view designated campus camera feeds via app</p>
            </div>
            <SSAToggle on={cctvParentAccess} onChange={() => setCctvParentAccess(!cctvParentAccess)} theme={theme} />
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>CCTV Recording Retention (days)</p>
            <InputField value={cctvRetentionDays} onChange={setCctvRetentionDays} theme={theme} type="number" placeholder="e.g. 30" />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
