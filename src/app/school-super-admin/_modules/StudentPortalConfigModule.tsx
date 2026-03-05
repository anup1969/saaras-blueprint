'use client';
import React, { useState, useRef, useEffect } from 'react';
import { AlertTriangle, Plus, X, Pencil, Check, Save } from 'lucide-react';
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
  const [badgeTypes, setBadgeTypes] = useState([
    'Academic Star',
    'Attendance Champion',
    'Sports Achiever',
    'Helper Badge',
    'Reading Wizard',
  ]);
  // Chip edit state: null = not editing; number = index being edited
  const [editingBadgeIdx, setEditingBadgeIdx] = useState<number | null>(null);
  const [editingBadgeValue, setEditingBadgeValue] = useState('');
  const [newBadgeValue, setNewBadgeValue] = useState('');
  const [addingBadge, setAddingBadge] = useState(false);
  const editInputRef = useRef<HTMLInputElement>(null);
  const addInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingBadgeIdx !== null && editInputRef.current) editInputRef.current.focus();
  }, [editingBadgeIdx]);

  useEffect(() => {
    if (addingBadge && addInputRef.current) addInputRef.current.focus();
  }, [addingBadge]);

  const startEditBadge = (idx: number) => {
    setEditingBadgeIdx(idx);
    setEditingBadgeValue(badgeTypes[idx]);
  };

  const confirmEditBadge = () => {
    if (editingBadgeIdx === null) return;
    const trimmed = editingBadgeValue.trim();
    if (trimmed) {
      setBadgeTypes(prev => prev.map((b, i) => (i === editingBadgeIdx ? trimmed : b)));
    }
    setEditingBadgeIdx(null);
    setEditingBadgeValue('');
  };

  const deleteBadge = (idx: number) => {
    setBadgeTypes(prev => prev.filter((_, i) => i !== idx));
    if (editingBadgeIdx === idx) setEditingBadgeIdx(null);
  };

  const confirmAddBadge = () => {
    const trimmed = newBadgeValue.trim();
    if (trimmed && !badgeTypes.includes(trimmed)) {
      setBadgeTypes(prev => [...prev, trimmed]);
    }
    setNewBadgeValue('');
    setAddingBadge(false);
  };

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
              {/* Badge Types — chip CRUD */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className={`text-[10px] font-bold ${theme.iconColor}`}>Badge Types</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${theme.accentBg} ${theme.iconColor}`}>
                    {badgeTypes.length} badge{badgeTypes.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 items-center">
                  {badgeTypes.map((b, idx) => (
                    <span key={idx} className={`inline-flex items-center gap-1 pl-2.5 pr-1.5 py-1 rounded-lg ${theme.secondaryBg} border ${theme.border}`}>
                      {editingBadgeIdx === idx ? (
                        <>
                          <input
                            ref={editInputRef}
                            value={editingBadgeValue}
                            onChange={e => setEditingBadgeValue(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') confirmEditBadge(); if (e.key === 'Escape') setEditingBadgeIdx(null); }}
                            className={`text-xs font-medium ${theme.highlight} bg-transparent outline-none w-28`}
                          />
                          <button onClick={confirmEditBadge} className="text-emerald-500 hover:text-emerald-700 ml-0.5">
                            <Check size={11} />
                          </button>
                          <button onClick={() => setEditingBadgeIdx(null)} className={`${theme.iconColor} hover:text-red-500 ml-0.5`}>
                            <X size={11} />
                          </button>
                        </>
                      ) : (
                        <>
                          <span className={`text-xs font-medium ${theme.highlight}`}>{b}</span>
                          <button
                            onClick={() => startEditBadge(idx)}
                            className={`${theme.iconColor} hover:${theme.highlight} ml-0.5 transition-colors`}
                            title="Edit badge name"
                          >
                            <Pencil size={10} />
                          </button>
                          <button
                            onClick={() => deleteBadge(idx)}
                            className="text-red-400 hover:text-red-600 ml-0.5 transition-colors"
                            title="Remove badge"
                          >
                            <X size={10} />
                          </button>
                        </>
                      )}
                    </span>
                  ))}

                  {/* Add new badge chip */}
                  {addingBadge ? (
                    <span className={`inline-flex items-center gap-1 pl-2.5 pr-1.5 py-1 rounded-lg border-2 border-dashed ${theme.border} ${theme.secondaryBg}`}>
                      <input
                        ref={addInputRef}
                        value={newBadgeValue}
                        onChange={e => setNewBadgeValue(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') confirmAddBadge(); if (e.key === 'Escape') { setAddingBadge(false); setNewBadgeValue(''); } }}
                        placeholder="Badge name..."
                        className={`text-xs font-medium ${theme.highlight} bg-transparent outline-none w-28`}
                      />
                      <button onClick={confirmAddBadge} className="text-emerald-500 hover:text-emerald-700 ml-0.5">
                        <Check size={11} />
                      </button>
                      <button onClick={() => { setAddingBadge(false); setNewBadgeValue(''); }} className={`${theme.iconColor} hover:text-red-500 ml-0.5`}>
                        <X size={11} />
                      </button>
                    </span>
                  ) : (
                    <button
                      onClick={() => setAddingBadge(true)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border-2 border-dashed ${theme.border} text-xs font-bold ${theme.iconColor} hover:${theme.highlight} transition-colors`}
                    >
                      <Plus size={11} /> Add Badge
                    </button>
                  )}
                </div>
                <p className={`text-[10px] ${theme.iconColor} mt-1.5`}>Click the pencil to rename a badge. Click &times; to remove it.</p>
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

      {/* Save Bar */}
      <div className={`flex items-center justify-between p-3 rounded-2xl border-2 ${theme.border} ${theme.secondaryBg}`}>
        <div>
          <p className={`text-sm font-bold ${theme.highlight}`}>Save Student Portal Settings</p>
          <p className={`text-[10px] ${theme.iconColor}`}>Save portal features, elective windows, badge types, and wellbeing settings</p>
        </div>
        <button className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white ${theme.primary} shadow-sm hover:opacity-90 transition-opacity`}>
          <Save size={16} /> Save Changes
        </button>
      </div>
    </div>
  );
}
