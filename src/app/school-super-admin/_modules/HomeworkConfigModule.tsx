'use client';
import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import { MasterPermissionGrid, BulkImportWizard } from '@/components/shared';
import type { Theme } from '../_helpers/types';

function InfoIcon({ tip }: { tip: string }) {
  return <span title={tip} className="inline-flex ml-1.5 shrink-0 cursor-help"><Info size={13} className="text-blue-400 hover:text-blue-600" /></span>;
}
function MobileBadge() {
  return <span className="ml-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-green-100 text-green-700 whitespace-nowrap">{'\uD83D\uDCF1'} Mobile</span>;
}

export default function HomeworkConfigModule({ theme }: { theme: Theme }) {
  const [submissionMode, setSubmissionMode] = useState('Both');
  const [hwGracePeriod, setHwGracePeriod] = useState('2');
  const [maxFileSize, setMaxFileSize] = useState('10');
  const [hwToggles, setHwToggles] = useState<Record<string, boolean>>({
    'Allow Late Submission': true, 'Parent Notification on Assignment': true,
    'Plagiarism Check': false,
  });

  // --- NEW STATE ---
  // Assignment Enhancements
  const [allowAttachments, setAllowAttachments] = useState(true);
  const [maxAttachMB, setMaxAttachMB] = useState('10');
  const [allowedTypes, setAllowedTypes] = useState<Record<string, boolean>>({ PDF: true, Image: true, Video: false, Doc: true });
  const [difficultyTagging, setDifficultyTagging] = useState(false);
  // Grading & Review
  const [teacherGradingUI, setTeacherGradingUI] = useState(true);
  const [marksPerAssignment, setMarksPerAssignment] = useState(true);
  const [remarksPerSubmission, setRemarksPerSubmission] = useState(true);
  const [autoFeedInternal, setAutoFeedInternal] = useState(false);
  // Peer Review
  const [peerReviewEnabled, setPeerReviewEnabled] = useState(false);
  const [maxReviewers, setMaxReviewers] = useState('2');
  const [anonymousReview, setAnonymousReview] = useState(false);
  // Reports
  const [completionRate, setCompletionRate] = useState(true);
  const [submissionPattern, setSubmissionPattern] = useState(false);
  const [teacherFrequency, setTeacherFrequency] = useState(false);
  const [exportPDF, setExportPDF] = useState(true);
  // Parent Diary
  const [parentAckRequired, setParentAckRequired] = useState(false);
  const [ackViaApp, setAckViaApp] = useState(true);
  const [reminderHours, setReminderHours] = useState('24');

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

      {/* ═══════════════════════════════════════════════════════════════
          NEW SECTIONS
          ═══════════════════════════════════════════════════════════════ */}

      <SectionCard title="Assignment Enhancements" subtitle="File attachments, type restrictions, and difficulty tagging" theme={theme}>
        <div className="flex items-center mb-3">
          <p className={`text-[10px] font-bold ${theme.iconColor}`}>Configure attachment and tagging options</p>
          <InfoIcon tip="Control what students can attach to assignments and how assignments are categorized" />
        </div>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex items-center">
              <p className={`text-xs font-bold ${theme.highlight}`}>Allow file attachments</p>
              <MobileBadge />
            </div>
            <SSAToggle on={allowAttachments} onChange={() => setAllowAttachments(!allowAttachments)} theme={theme} />
          </div>
          {allowAttachments && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max attachment size (MB)</p>
                  <InputField value={maxAttachMB} onChange={setMaxAttachMB} theme={theme} type="number" />
                </div>
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Allowed types</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(allowedTypes).map(([type, on]) => (
                    <label key={type} className={`flex items-center gap-2 p-2 rounded-lg ${theme.secondaryBg} cursor-pointer`}>
                      <input type="checkbox" checked={on} onChange={() => setAllowedTypes(p => ({ ...p, [type]: !p[type] }))} className="accent-emerald-500 w-3.5 h-3.5" />
                      <span className={`text-[10px] font-medium ${theme.highlight}`}>{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Difficulty level tagging</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Tag each assignment as Easy / Medium / Hard</p>
            </div>
            <SSAToggle on={difficultyTagging} onChange={() => setDifficultyTagging(!difficultyTagging)} theme={theme} />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Grading & Review" subtitle="Assignment grades feed into gradebook internal marks" theme={theme}>
        <div className="flex items-center mb-3">
          <p className={`text-[10px] font-bold ${theme.iconColor}`}>Teacher grading and assessment integration</p>
          <InfoIcon tip="Assignment grades feed into gradebook internal marks" />
        </div>
        <div className="space-y-2">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Teacher grading UI</p>
            <SSAToggle on={teacherGradingUI} onChange={() => setTeacherGradingUI(!teacherGradingUI)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Marks per assignment</p>
            <SSAToggle on={marksPerAssignment} onChange={() => setMarksPerAssignment(!marksPerAssignment)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Remarks per submission</p>
            <SSAToggle on={remarksPerSubmission} onChange={() => setRemarksPerSubmission(!remarksPerSubmission)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Auto-feed to internal assessment</p>
            <SSAToggle on={autoFeedInternal} onChange={() => setAutoFeedInternal(!autoFeedInternal)} theme={theme} />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Peer Review" subtitle="Enable students to review each other's submissions" theme={theme}>
        <div className="flex items-center mb-3">
          <p className={`text-[10px] font-bold ${theme.iconColor}`}>Peer assessment settings</p>
          <InfoIcon tip="Allow students to assess and provide feedback on classmates' assignments" />
        </div>
        <div className="space-y-2">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Enable peer assessment</p>
            <SSAToggle on={peerReviewEnabled} onChange={() => setPeerReviewEnabled(!peerReviewEnabled)} theme={theme} />
          </div>
          {peerReviewEnabled && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max reviewers per submission</p>
                  <InputField value={maxReviewers} onChange={setMaxReviewers} theme={theme} type="number" />
                </div>
              </div>
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-xs font-bold ${theme.highlight}`}>Anonymous review</p>
                <SSAToggle on={anonymousReview} onChange={() => setAnonymousReview(!anonymousReview)} theme={theme} />
              </div>
            </>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Reports" subtitle="Homework analytics and export options" theme={theme}>
        <div className="flex items-center mb-3">
          <p className={`text-[10px] font-bold ${theme.iconColor}`}>Configure homework reports</p>
          <InfoIcon tip="Track completion rates, submission patterns, and teacher assignment frequency" />
        </div>
        <div className="space-y-2">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Completion rate report</p>
            <SSAToggle on={completionRate} onChange={() => setCompletionRate(!completionRate)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Submission pattern analysis</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Late / On-time / Never submitted</p>
            </div>
            <SSAToggle on={submissionPattern} onChange={() => setSubmissionPattern(!submissionPattern)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Teacher assignment frequency report</p>
            <SSAToggle on={teacherFrequency} onChange={() => setTeacherFrequency(!teacherFrequency)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight}`}>Export as PDF</p>
            <SSAToggle on={exportPDF} onChange={() => setExportPDF(!exportPDF)} theme={theme} />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Parent Diary" subtitle="Parent acknowledgement and reminders for homework" theme={theme}>
        <div className="flex items-center mb-3">
          <p className={`text-[10px] font-bold ${theme.iconColor}`}>Configure parent notification and acknowledgement</p>
          <InfoIcon tip="Require parents to acknowledge they have seen their child's homework via app" />
        </div>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex items-center">
              <p className={`text-xs font-bold ${theme.highlight}`}>Parent acknowledgement required</p>
              <MobileBadge />
            </div>
            <SSAToggle on={parentAckRequired} onChange={() => setParentAckRequired(!parentAckRequired)} theme={theme} />
          </div>
          {parentAckRequired && (
            <>
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-xs font-bold ${theme.highlight}`}>Acknowledge via app</p>
                <SSAToggle on={ackViaApp} onChange={() => setAckViaApp(!ackViaApp)} theme={theme} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Reminder if unread after (hours)</p>
                  <InputField value={reminderHours} onChange={setReminderHours} theme={theme} type="number" />
                </div>
              </div>
            </>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Role-Based Permissions" subtitle="Control who can view, create, edit, delete, import, and export" theme={theme}>
        <div className="space-y-4">
          <MasterPermissionGrid masterName="Assignment Types" roles={['Super Admin', 'Principal', 'School Admin', 'Teacher', 'Accountant']} theme={theme} />
        </div>
      </SectionCard>

      <SectionCard title="Bulk Import" subtitle="Import data from Excel templates" theme={theme}>
        <BulkImportWizard entityName="Assignments" templateFields={['Class', 'Section', 'Subject', 'Title', 'Due Date', 'Max Marks']} sampleData={[['Grade 8', 'A', 'Science', 'Chapter 5 Worksheet', '2026-04-20', '25']]} theme={theme} />
      </SectionCard>
    </div>
  );
}
