'use client';
import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

export default function StudentPortalConfigModule({ theme }: { theme: Theme }) {
  const [homeworkSubmission, setHomeworkSubmission] = useState(true);
  const [showClassRank, setShowClassRank] = useState(false);
  const [showAttendance, setShowAttendance] = useState(true);
  const [digitalLibrary, setDigitalLibrary] = useState(false);
  const [timetableView, setTimetableView] = useState(true);
  const [resultsView, setResultsView] = useState(true);

  // Elective Selection
  const [electiveEnabled, setElectiveEnabled] = useState(false);
  const [electiveWindowStart, setElectiveWindowStart] = useState('2026-04-01');
  const [electiveWindowEnd, setElectiveWindowEnd] = useState('2026-04-15');
  const [maxElectives, setMaxElectives] = useState('2');
  // Gamification
  const [gamificationEnabled, setGamificationEnabled] = useState(false);
  const [badgeTypes] = useState(['Academic Star', 'Attendance Champion', 'Sports Achiever', 'Helper Badge', 'Reading Wizard']);
  const [streakTracking, setStreakTracking] = useState(true);
  const [leaderboardVisible, setLeaderboardVisible] = useState(false);
  // AI Study Planner
  const [aiStudyEnabled, setAiStudyEnabled] = useState(false);
  const [subjectPriority, setSubjectPriority] = useState('Equal');
  const [examAwareScheduling, setExamAwareScheduling] = useState(true);
  // Mood Tracker
  const [moodTrackerEnabled, setMoodTrackerEnabled] = useState(false);
  const [dailyCheckInTime, setDailyCheckInTime] = useState('08:30');
  const [moodAlertThreshold, setMoodAlertThreshold] = useState('3');

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

      <SectionCard title="Elective Selection" subtitle="Allow students to choose elective subjects through the portal" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Enable Elective Selection</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Students can browse and choose elective subjects during the selection window</p>
            </div>
            <SSAToggle on={electiveEnabled} onChange={() => setElectiveEnabled(!electiveEnabled)} theme={theme} />
          </div>
          {electiveEnabled && (
            <div className="grid grid-cols-3 gap-3">
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Window Start</p>
                <InputField value={electiveWindowStart} onChange={setElectiveWindowStart} theme={theme} type="date" />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Window End</p>
                <InputField value={electiveWindowEnd} onChange={setElectiveWindowEnd} theme={theme} type="date" />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max Electives</p>
                <InputField value={maxElectives} onChange={setMaxElectives} theme={theme} type="number" />
              </div>
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Gamification" subtitle="Motivate students with badges, streaks, and leaderboards" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Enable Gamification</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Award badges and track streaks to encourage student engagement</p>
            </div>
            <SSAToggle on={gamificationEnabled} onChange={() => setGamificationEnabled(!gamificationEnabled)} theme={theme} />
          </div>
          {gamificationEnabled && (
            <>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Badge Types</p>
                <div className="flex flex-wrap gap-1.5">
                  {badgeTypes.map(b => (
                    <span key={b} className={`px-2.5 py-1 rounded-lg ${theme.secondaryBg} text-xs font-medium ${theme.highlight}`}>{b}</span>
                  ))}
                </div>
              </div>
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-xs font-bold ${theme.highlight}`}>Streak Tracking</p>
                <SSAToggle on={streakTracking} onChange={() => setStreakTracking(!streakTracking)} theme={theme} />
              </div>
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>Leaderboard Visibility</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Show class-level leaderboard to students</p>
                </div>
                <SSAToggle on={leaderboardVisible} onChange={() => setLeaderboardVisible(!leaderboardVisible)} theme={theme} />
              </div>
            </>
          )}
        </div>
      </SectionCard>

      <SectionCard title="AI Study Planner" subtitle="AI-powered personalized study schedule for students" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Enable AI Study Planner</p>
              <p className={`text-[10px] ${theme.iconColor}`}>AI creates personalized study plans based on student performance and upcoming exams</p>
            </div>
            <SSAToggle on={aiStudyEnabled} onChange={() => setAiStudyEnabled(!aiStudyEnabled)} theme={theme} />
          </div>
          {aiStudyEnabled && (
            <>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Subject Priority Weighting</p>
                <SelectField options={['Equal', 'Weak Subjects First', 'Exam Proximity', 'Custom']} value={subjectPriority} onChange={setSubjectPriority} theme={theme} />
              </div>
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-xs font-bold ${theme.highlight}`}>Exam-Aware Scheduling</p>
                <SSAToggle on={examAwareScheduling} onChange={() => setExamAwareScheduling(!examAwareScheduling)} theme={theme} />
              </div>
            </>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Mood Tracker" subtitle="Daily emotional check-in for student wellbeing monitoring" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Enable Mood Tracker</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Students log their mood daily; counselors are alerted on concerning patterns</p>
            </div>
            <SSAToggle on={moodTrackerEnabled} onChange={() => setMoodTrackerEnabled(!moodTrackerEnabled)} theme={theme} />
          </div>
          {moodTrackerEnabled && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Daily Check-in Time</p>
                <InputField value={dailyCheckInTime} onChange={setDailyCheckInTime} theme={theme} type="time" />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Alert Threshold (consecutive low days)</p>
                <InputField value={moodAlertThreshold} onChange={setMoodAlertThreshold} theme={theme} type="number" />
              </div>
            </div>
          )}
        </div>
      </SectionCard>

    </div>
  );
}
