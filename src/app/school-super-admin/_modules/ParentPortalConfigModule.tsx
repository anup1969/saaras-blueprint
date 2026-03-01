'use client';

import React, { useState } from 'react';
import { SSAToggle, SectionCard, ModuleHeader, SelectField, InputField } from '../_helpers/components';
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
  // AI Chatbot
  const [aiChatbotEnabled, setAiChatbotEnabled] = useState(false);
  const [chatbotLanguage, setChatbotLanguage] = useState('English');
  const [chatbotEscalation, setChatbotEscalation] = useState('5');
  // Parent Directory
  const [parentDirectoryEnabled, setParentDirectoryEnabled] = useState(false);
  const [directoryFields, setDirectoryFields] = useState<Record<string, boolean>>({ 'Name': true, 'Phone': true, 'Email': false, 'Child Class': true });
  const [optInRequired, setOptInRequired] = useState(true);

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

      <SectionCard title="AI Chatbot" subtitle="AI-powered chatbot for common parent queries" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Enable AI Chatbot</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Parents can ask questions about fees, attendance, schedules via AI assistant</p>
            </div>
            <SSAToggle on={aiChatbotEnabled} onChange={() => setAiChatbotEnabled(!aiChatbotEnabled)} theme={theme} />
          </div>
          {aiChatbotEnabled && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Response Language</p>
                <SelectField options={['English', 'Hindi', 'Gujarati', 'Marathi', 'Auto-detect']} value={chatbotLanguage} onChange={setChatbotLanguage} theme={theme} />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Escalate to Human After (messages)</p>
                <InputField value={chatbotEscalation} onChange={setChatbotEscalation} theme={theme} type="number" />
              </div>
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Parent Directory" subtitle="Allow parents to view other parents in same class" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Enable Parent Directory</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Parents can see other parents in the same class for coordination</p>
            </div>
            <SSAToggle on={parentDirectoryEnabled} onChange={() => setParentDirectoryEnabled(!parentDirectoryEnabled)} theme={theme} />
          </div>
          {parentDirectoryEnabled && (
            <>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Visible Fields</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(directoryFields).map(([field, on]) => (
                    <label key={field} className={`flex items-center gap-2 p-2 rounded-lg ${theme.secondaryBg} cursor-pointer`}>
                      <input type="checkbox" checked={on} onChange={() => setDirectoryFields(p => ({ ...p, [field]: !p[field] }))} className="accent-emerald-500 w-3.5 h-3.5" />
                      <span className={`text-[10px] font-medium ${theme.highlight}`}>{field}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>Opt-in Required</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Parents must opt-in before their info is visible to others</p>
                </div>
                <SSAToggle on={optInRequired} onChange={() => setOptInRequired(!optInRequired)} theme={theme} />
              </div>
            </>
          )}
        </div>
      </SectionCard>

    </div>
  );
}
