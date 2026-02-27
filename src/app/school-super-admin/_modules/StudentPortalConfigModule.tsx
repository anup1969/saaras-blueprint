'use client';
import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

export default function StudentPortalConfigModule({ theme }: { theme: Theme }) {
  const [homeworkSubmission, setHomeworkSubmission] = useState(true);
  const [showClassRank, setShowClassRank] = useState(false);
  const [showAttendance, setShowAttendance] = useState(true);
  const [digitalLibrary, setDigitalLibrary] = useState(false);
  const [timetableView, setTimetableView] = useState(true);
  const [resultsView, setResultsView] = useState(true);

  return (
    <div className="space-y-4">
      <ModuleHeader title="Student Portal Configuration" subtitle="Control what students can see and do through their portal" theme={theme} />

      <SectionCard title="Portal Features" subtitle="Control what students can see and do when they log in to their portal" theme={theme}>
        <div className="space-y-2">
          {[
            { label: 'Online homework submission', desc: 'Students can upload and submit homework directly through the portal', value: homeworkSubmission, setter: setHomeworkSubmission },
            { label: 'Show class rank', desc: 'Students can see their rank within their class on the results page', value: showClassRank, setter: setShowClassRank },
            { label: 'Show attendance percentage', desc: 'Students can view their attendance percentage and day-wise history', value: showAttendance, setter: setShowAttendance },
            { label: 'Digital library access', desc: 'Students can browse and read eBooks from the digital library', value: digitalLibrary, setter: setDigitalLibrary },
            { label: 'Timetable view', desc: 'Students can view their daily and weekly class timetable', value: timetableView, setter: setTimetableView },
            { label: 'Results view (with PDF download)', desc: 'Students can view exam results and download report card as PDF', value: resultsView, setter: setResultsView },
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

      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex items-start gap-3">
        <AlertTriangle size={16} className="text-amber-500 mt-0.5 shrink-0" />
        <p className="text-xs text-amber-700">Enabling &quot;Show class rank&quot; may be sensitive. Many schools disable this to reduce peer pressure. Consider your school policy before turning it on.</p>
      </div>

    </div>
  );
}
