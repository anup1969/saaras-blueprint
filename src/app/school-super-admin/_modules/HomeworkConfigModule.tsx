'use client';
import React, { useState } from 'react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

export default function HomeworkConfigModule({ theme }: { theme: Theme }) {
  const [submissionMode, setSubmissionMode] = useState('Both');
  const [hwGracePeriod, setHwGracePeriod] = useState('2');
  const [maxFileSize, setMaxFileSize] = useState('10');
  const [hwToggles, setHwToggles] = useState<Record<string, boolean>>({
    'Allow Late Submission': true, 'Parent Notification on Assignment': true,
    'Plagiarism Check': false,
  });

  return (
    <div className="space-y-4">
      <ModuleHeader title="Homework & Assignment Configuration" subtitle="Submission modes, late policies, notifications, and plagiarism checks" theme={theme} />
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Submission Settings" subtitle="Mode, file limits, and late policy" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Submission Mode</p>
              <SelectField options={['Online Only', 'Offline Only', 'Both']} value={submissionMode} onChange={setSubmissionMode} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Late Submission Grace Period (days)</p>
              <InputField value={hwGracePeriod} onChange={setHwGracePeriod} theme={theme} type="number" />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max File Upload Size (MB)</p>
              <InputField value={maxFileSize} onChange={setMaxFileSize} theme={theme} type="number" />
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Assignment Features" subtitle="Notifications, late policy, and quality checks for homework" theme={theme}>
          <div className="space-y-2">
            {Object.entries(hwToggles).map(([feat, enabled]) => (
              <div key={feat} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{feat}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Allow Late Submission': 'Students can submit homework after the deadline within the grace period',
                      'Parent Notification on Assignment': 'Parents receive a notification when a new assignment is posted for their child',
                      'Plagiarism Check': 'System checks submitted assignments for copied content from other students',
                    } as Record<string, string>)[feat]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setHwToggles(p => ({ ...p, [feat]: !p[feat] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
