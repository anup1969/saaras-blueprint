'use client';
import React, { useState } from 'react';
import { SSAToggle, SectionCard, ModuleHeader } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

export default function AlumniConfigModule({ theme }: { theme: Theme }) {
  const [selfRegistration, setSelfRegistration] = useState(true);
  const [donationModule, setDonationModule] = useState(false);
  const [jobBoard, setJobBoard] = useState(false);
  const [eventInvitations, setEventInvitations] = useState(true);
  const [directoryAccess, setDirectoryAccess] = useState(true);

  return (
    <div className="space-y-4">
      <ModuleHeader title="Alumni Configuration" subtitle="Manage alumni engagement portal features" theme={theme} />

      <SectionCard title="Alumni Portal Features" subtitle="Features available to school alumni through the alumni engagement portal" theme={theme}>
        <div className="space-y-2">
          {[
            { label: 'Self-registration portal', desc: 'Alumni can sign up themselves through a public registration page — no admin action needed', value: selfRegistration, setter: setSelfRegistration },
            { label: 'Donation module', desc: 'Alumni can make monetary contributions to the school through a secure online form', value: donationModule, setter: setDonationModule },
            { label: 'Job board', desc: 'Alumni can post job openings and current students/alumni can view and apply', value: jobBoard, setter: setJobBoard },
            { label: 'Event invitations', desc: 'School can invite alumni to reunions, annual days, and special events via the portal', value: eventInvitations, setter: setEventInvitations },
            { label: 'Directory access', desc: 'Alumni can browse the alumni directory to reconnect with batchmates and seniors', value: directoryAccess, setter: setDirectoryAccess },
          ].map(item => (
            <div key={item.label} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>{item.label}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{item.desc}</p>
              </div>
              <SSAToggle on={item.value} onChange={() => item.setter(!item.value)} theme={theme} />
            </div>
          ))}
        </div>
      </SectionCard>

    </div>
  );
}
