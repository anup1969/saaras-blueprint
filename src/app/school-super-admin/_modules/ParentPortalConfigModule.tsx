'use client';

import React, { useState } from 'react';
import { SSAToggle, SectionCard, ModuleHeader, SelectField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

export default function ParentPortalConfigModule({ theme }: { theme: Theme }) {
  const [multiChild, setMultiChild] = useState(true);
  const [feePayment, setFeePayment] = useState(true);
  const [ptmBooking, setPtmBooking] = useState(true);
  const [leaveApplication, setLeaveApplication] = useState(true);
  const [transportTracking, setTransportTracking] = useState(true);
  const [commMode, setCommMode] = useState('Full Two-Way');
  const [reportCardAccess, setReportCardAccess] = useState(true);
  const [reportCardVisibility, setReportCardVisibility] = useState('After Principal Approval');
  const [moduleToggles, setModuleToggles] = useState<Record<string, boolean>>({
    Fees: true, Attendance: true, Exams: true, LMS: false, Enquiry: true, Visitor: true,
    Transport: true, Library: false, Hostel: false, Canteen: false, Alumni: false,
    Communication: true, HR: false, Certificate: true,
  });

  return (
    <div className="space-y-4">
      <ModuleHeader title="Parent Portal Configuration" subtitle="Control what parents can access and do through their portal" theme={theme} />

      <SectionCard title="Portal Features" subtitle="Toggle features available to parents" theme={theme}>
        <div className="space-y-2">
          {[
            { label: 'Multi-child support (family account with child toggle)', value: multiChild, setter: setMultiChild },
            { label: 'Fee payment via portal', value: feePayment, setter: setFeePayment },
            { label: 'PTM booking', value: ptmBooking, setter: setPtmBooking },
            { label: 'Leave application (for child)', value: leaveApplication, setter: setLeaveApplication },
            { label: 'Transport tracking (live bus location)', value: transportTracking, setter: setTransportTracking },
          ].map(item => (
            <div key={item.label} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <span className={`text-xs ${theme.highlight}`}>{item.label}</span>
              <SSAToggle on={item.value} onChange={() => item.setter(!item.value)} theme={theme} />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Report Card Access" subtitle="Control when parents can view report cards" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Report Card Access via Portal</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Parents can download report cards from the parent portal</p>
            </div>
            <SSAToggle on={reportCardAccess} onChange={() => setReportCardAccess(!reportCardAccess)} theme={theme} />
          </div>
          {reportCardAccess && (
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Report Card Visibility</p>
              <SelectField options={['Immediately', 'After Principal Approval', 'After X Days']} value={reportCardVisibility} onChange={setReportCardVisibility} theme={theme} />
              <p className={`text-[10px] ${theme.iconColor} mt-1`}>
                {reportCardVisibility === 'Immediately' ? 'Report cards are visible as soon as results are published' :
                 reportCardVisibility === 'After Principal Approval' ? 'Principal must approve before parents can view' :
                 'Report cards become visible after a set number of days post-publication'}
              </p>
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Communication Mode" subtitle="How parents interact with school staff" theme={theme}>
        <SelectField options={['Full Two-Way', 'Reply Only', 'Broadcast']} value={commMode} onChange={setCommMode} theme={theme} />
        <p className={`text-[10px] ${theme.iconColor} mt-2`}>
          {commMode === 'Full Two-Way' ? 'Parents can initiate and reply to messages' :
           commMode === 'Reply Only' ? 'Parents can only reply to school-initiated messages' :
           'Parents receive announcements only, no reply option'}
        </p>
      </SectionCard>

      <SectionCard title="Module-Level Feature Toggles" subtitle="Enable or disable entire modules for this portal" theme={theme}>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
          {Object.entries(moduleToggles).map(([mod, enabled]) => (
            <div key={mod} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <span className={`text-xs font-medium ${theme.highlight}`}>{mod}</span>
              <SSAToggle on={enabled} onChange={() => setModuleToggles(p => ({ ...p, [mod]: !p[mod] }))} theme={theme} />
            </div>
          ))}
        </div>
      </SectionCard>

    </div>
  );
}
