'use client';

import { useState } from 'react';
import { StatCard } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  Users, UserCheck, Clock, AlertTriangle, Bell, BarChart3, CheckCircle,
  Send, Calendar, GraduationCap, Briefcase, ChevronRight, Banknote,
  ClipboardCheck, Star, FileText, ShieldCheck, Award, User, Sparkles,
  Radio,
} from 'lucide-react';
import TaskTrackerPanel from '@/components/TaskTrackerPanel';
import RecurringTasksCard from '@/components/RecurringTasksCard';
import DrillDownPanel from './DrillDownPanel';

export default function DashboardHome({ theme, onProfileClick, isPreschool }: { theme: Theme; onProfileClick: () => void; isPreschool?: boolean }) {
  const [drillDown, setDrillDown] = useState<'students' | 'academic' | 'non-academic' | null>(null);
  const [showEnquiryPipeline, setShowEnquiryPipeline] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>{isPreschool ? 'Principal / Centre Head Dashboard' : 'Principal Dashboard'}</h1>
        <div className="flex items-center gap-2">
          {/* Notification Bell */}
          <button title="Notifications" className={`relative w-9 h-9 rounded-full ${theme.secondaryBg} flex items-center justify-center ${theme.buttonHover} transition-all`}>
            <Bell size={16} className={theme.iconColor} />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">3</span>
          </button>
          {/* Profile Avatar */}
          <button onClick={onProfileClick} title="My Profile" className={`w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center hover:opacity-90 transition-opacity ring-2 ring-white shadow-sm`}>
            <User size={16} />
          </button>
        </div>
      </div>
      {/* Preschool Mode Banner */}
      {isPreschool && (
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800">
          <AlertTriangle size={14} className="text-amber-600 shrink-0" />
          <p className="text-xs font-medium">Preschool Mode — Showing Centre Head view with child safety, staff-child ratios, and milestone tracking</p>
        </div>
      )}
      {/* Attendance Row — Student + Academic Staff + Non-Academic Staff (Clickable) */}
      <div className="grid grid-cols-3 gap-3">
        {/* Student Attendance */}
        <button onClick={() => setDrillDown(drillDown === 'students' ? null : 'students')} className={`text-left ${theme.cardBg} rounded-2xl border-2 ${drillDown === 'students' ? 'border-blue-500 ring-1 ring-blue-500/30' : theme.border} p-4 hover:border-blue-400 transition-all cursor-pointer`}>
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Users size={14} className={theme.iconColor} />
                <h3 className={`text-xs font-bold ${theme.highlight}`}>Students</h3>
                <ChevronRight size={10} className={`${theme.iconColor} ${drillDown === 'students' ? 'rotate-90' : ''} transition-transform`} />
              </div>
              <p className={`text-2xl font-bold ${theme.highlight}`}>2,598 / 2,847</p>
              <p className={`text-xs ${theme.iconColor} mt-0.5`}>Enrolled: 3,000</p>
            </div>
            <div className="w-20 h-20 ml-2 shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <circle r="16" cx="18" cy="18" fill="none" stroke="#9ca3af" strokeWidth="4" strokeDasharray={`${(153/3000)*100.53} ${100.53-(153/3000)*100.53}`} strokeDashoffset="25.13" transform="rotate(-90 18 18)" />
                <circle r="16" cx="18" cy="18" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray={`${(249/3000)*100.53} ${100.53-(249/3000)*100.53}`} strokeDashoffset={`${25.13-(153/3000)*100.53}`} transform="rotate(-90 18 18)" />
                <circle r="16" cx="18" cy="18" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray={`${(2598/3000)*100.53} ${100.53-(2598/3000)*100.53}`} strokeDashoffset={`${25.13-(153/3000)*100.53-(249/3000)*100.53}`} transform="rotate(-90 18 18)" />
                <text x="18" y="19" textAnchor="middle" dominantBaseline="middle" className="fill-emerald-600" style={{ fontSize: '10px', fontWeight: 700 }}>87%</text>
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /><span className={`text-xs ${theme.iconColor}`}>2,598</span></span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" /><span className={`text-xs ${theme.iconColor}`}>249</span></span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-400 inline-block" /><span className={`text-xs ${theme.iconColor}`}>153</span></span>
          </div>
        </button>

        {/* Academic Staff */}
        <button onClick={() => setDrillDown(drillDown === 'academic' ? null : 'academic')} className={`text-left ${theme.cardBg} rounded-2xl border-2 ${drillDown === 'academic' ? 'border-blue-500 ring-1 ring-blue-500/30' : theme.border} p-4 hover:border-blue-400 transition-all cursor-pointer`}>
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1.5">
                <GraduationCap size={14} className={theme.iconColor} />
                <h3 className={`text-xs font-bold ${theme.highlight}`}>Academic Staff</h3>
                <ChevronRight size={10} className={`${theme.iconColor} ${drillDown === 'academic' ? 'rotate-90' : ''} transition-transform`} />
              </div>
              <p className={`text-2xl font-bold ${theme.highlight}`}>72 / 78</p>
              <p className={`text-xs text-emerald-600 mt-0.5`}>92% Present</p>
            </div>
            <div className="w-20 h-20 ml-2 shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <circle r="16" cx="18" cy="18" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray={`${(6/78)*100.53} ${100.53-(6/78)*100.53}`} strokeDashoffset="25.13" transform="rotate(-90 18 18)" />
                <circle r="16" cx="18" cy="18" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray={`${(72/78)*100.53} ${100.53-(72/78)*100.53}`} strokeDashoffset={`${25.13-(6/78)*100.53}`} transform="rotate(-90 18 18)" />
                <text x="18" y="19" textAnchor="middle" dominantBaseline="middle" className="fill-emerald-600" style={{ fontSize: '10px', fontWeight: 700 }}>92%</text>
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /><span className={`text-xs ${theme.iconColor}`}>72</span></span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" /><span className={`text-xs ${theme.iconColor}`}>6</span></span>
          </div>
        </button>

        {/* Non-Academic Staff */}
        <button onClick={() => setDrillDown(drillDown === 'non-academic' ? null : 'non-academic')} className={`text-left ${theme.cardBg} rounded-2xl border-2 ${drillDown === 'non-academic' ? 'border-blue-500 ring-1 ring-blue-500/30' : theme.border} p-4 hover:border-blue-400 transition-all cursor-pointer`}>
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Briefcase size={14} className={theme.iconColor} />
                <h3 className={`text-xs font-bold ${theme.highlight}`}>Non-Academic</h3>
                <ChevronRight size={10} className={`${theme.iconColor} ${drillDown === 'non-academic' ? 'rotate-90' : ''} transition-transform`} />
              </div>
              <p className={`text-2xl font-bold ${theme.highlight}`}>56 / 64</p>
              <p className={`text-xs text-emerald-600 mt-0.5`}>88% Present</p>
            </div>
            <div className="w-20 h-20 ml-2 shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <circle r="16" cx="18" cy="18" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray={`${(8/64)*100.53} ${100.53-(8/64)*100.53}`} strokeDashoffset="25.13" transform="rotate(-90 18 18)" />
                <circle r="16" cx="18" cy="18" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray={`${(56/64)*100.53} ${100.53-(56/64)*100.53}`} strokeDashoffset={`${25.13-(8/64)*100.53}`} transform="rotate(-90 18 18)" />
                <text x="18" y="19" textAnchor="middle" dominantBaseline="middle" className="fill-emerald-600" style={{ fontSize: '10px', fontWeight: 700 }}>88%</text>
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /><span className={`text-xs ${theme.iconColor}`}>56</span></span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" /><span className={`text-xs ${theme.iconColor}`}>8</span></span>
          </div>
        </button>
      </div>

      {/* Drill-Down Analytics Panel */}
      {drillDown && (
        <DrillDownPanel type={drillDown} theme={theme} onClose={() => setDrillDown(null)} />
      )}

      {/* Stat Cards + Quick Actions — same row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <StatCard icon={ClipboardCheck} label="Avg Attendance" value="94.2%" color="bg-emerald-500" theme={theme} />
        <button onClick={() => setShowEnquiryPipeline(!showEnquiryPipeline)} className="text-left">
          <StatCard icon={Users} label="New Enquiries" value="12" color="bg-purple-500" sub="Click to view pipeline" theme={theme} />
        </button>
        <StatCard icon={Clock} label="Pending Approvals" value="8" color="bg-amber-500" theme={theme} />
        <StatCard icon={Banknote} label="Today's Collection" value={`\u20B92,45,000`} color="bg-green-500" sub="Outstanding: \u20B918.5L" theme={theme} />
        {/* Quick Actions — compact icon row */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-3 flex flex-col justify-center`}>
          <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-2`}>Quick Actions</p>
          <div className="flex items-center gap-2">
            {[
              { label: 'Reports', icon: BarChart3, color: 'bg-blue-500' },
              { label: 'Approve', icon: CheckCircle, color: 'bg-emerald-500' },
              { label: 'Circular', icon: Send, color: 'bg-indigo-500' },
              { label: 'Meeting', icon: Calendar, color: 'bg-purple-500' },
            ].map(a => (
              <button key={a.label} title={a.label} className={`w-8 h-8 rounded-lg ${a.color} flex items-center justify-center text-white hover:opacity-80 transition-opacity`}>
                <a.icon size={14} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enquiry Pipeline Drill-Down */}
      {showEnquiryPipeline && (
        <div className={`${theme.cardBg} rounded-2xl border-2 border-purple-400 ring-1 ring-purple-400/30 p-4`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Enquiry Pipeline — Today</h3>
            <button onClick={() => setShowEnquiryPipeline(false)} className={`text-xs ${theme.iconColor} hover:text-red-500`}>Close</button>
          </div>
          <div className="grid grid-cols-5 gap-2 mb-3">
            {[
              { stage: 'New', count: 5, color: 'bg-blue-500', sub: '3 walk-in, 2 online' },
              { stage: 'Follow-up', count: 3, color: 'bg-amber-500', sub: 'Call scheduled today' },
              { stage: 'Test Scheduled', count: 2, color: 'bg-purple-500', sub: 'Feb 18 & Feb 20' },
              { stage: 'Converted', count: 1, color: 'bg-emerald-500', sub: 'Admission confirmed' },
              { stage: 'Lost', count: 1, color: 'bg-red-500', sub: 'Fee too high' },
            ].map(s => (
              <div key={s.stage} className={`${theme.secondaryBg} rounded-xl p-3 border ${theme.border} text-center`}>
                <div className={`w-8 h-8 rounded-full ${s.color}/20 mx-auto flex items-center justify-center mb-1.5`}>
                  <span className={`text-sm font-bold ${s.color.replace('bg-', 'text-')}`}>{s.count}</span>
                </div>
                <p className={`text-[10px] font-bold ${theme.highlight}`}>{s.stage}</p>
                <p className={`text-[9px] ${theme.iconColor} mt-0.5`}>{s.sub}</p>
              </div>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className={`border-b ${theme.border}`}>
                  <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Child</th>
                  <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Class</th>
                  <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Parent</th>
                  <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Source</th>
                  <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Stage</th>
                  <th className={`text-left py-1.5 px-2 ${theme.iconColor} font-bold`}>Date</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { child: 'Vikram Rao', cls: 'Nursery', parent: 'Sunil Rao', source: 'Walk-in', stage: 'New', date: 'Today' },
                  { child: 'Anita Desai', cls: 'KG-1', parent: 'Meena Desai', source: 'Online', stage: 'Follow-up', date: 'Yesterday' },
                  { child: 'Kabir Joshi', cls: '3rd', parent: 'Suresh Joshi', source: 'Referral', stage: 'Converted', date: 'Feb 14' },
                  { child: 'Sanya Iyer', cls: '1st', parent: 'Ramesh Iyer', source: 'Online', stage: 'Test Scheduled', date: 'Feb 18' },
                  { child: 'Prachi Mehta', cls: '6th', parent: 'Deepak Mehta', source: 'Walk-in', stage: 'Lost', date: 'Feb 12' },
                ].map((e, i) => (
                  <tr key={i} className={`border-b ${theme.border} ${theme.buttonHover}`}>
                    <td className={`py-2 px-2 ${theme.highlight} font-bold`}>{e.child}</td>
                    <td className={`py-2 px-2 ${theme.iconColor}`}>{e.cls}</td>
                    <td className={`py-2 px-2 ${theme.iconColor}`}>{e.parent}</td>
                    <td className={`py-2 px-2 ${theme.iconColor}`}>{e.source}</td>
                    <td className="py-2 px-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        e.stage === 'New' ? 'bg-blue-100 text-blue-700' :
                        e.stage === 'Follow-up' ? 'bg-amber-100 text-amber-700' :
                        e.stage === 'Test Scheduled' ? 'bg-purple-100 text-purple-700' :
                        e.stage === 'Converted' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-red-100 text-red-700'
                      }`}>{e.stage}</span>
                    </td>
                    <td className={`py-2 px-2 ${theme.iconColor}`}>{e.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Preschool-specific cards removed per PM feedback — will revisit if meaningful KPIs identified */}

      {/* News Board + Task Tracker — Side by Side */}
      <div className="grid grid-cols-2 gap-4">
        {/* News Board — Live School Overview */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <h3 className={`text-sm font-bold ${theme.highlight}`}>News Board</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-base px-3 py-1 rounded-xl ${theme.secondaryBg} ${theme.highlight} font-mono font-bold tracking-wider`}>
                {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}
              </span>
              {!isPreschool && <span className={`text-[10px] px-2 py-0.5 rounded-lg bg-blue-500/20 text-blue-400 font-bold`}>Period 5 of 8</span>}
            </div>
          </div>

          {/* Going On Now */}
          <div className="mb-3">
            <p className={`text-[10px] font-bold uppercase ${theme.iconColor} mb-1.5 flex items-center gap-1`}>
              <Radio size={10} className="text-red-500" /> Going On Now
            </p>
            <div className="space-y-1.5">
              {(isPreschool ? [
                { activity: 'Story Time — "The Hungry Caterpillar"', detail: 'Nursery A & B · Library Corner', icon: Sparkles, color: 'bg-purple-500', pulse: true },
                { activity: 'Art & Craft — Finger Painting', detail: 'LKG · Art Room · Ms. Kavita', icon: FileText, color: 'bg-blue-500', pulse: true },
                { activity: 'Outdoor Play — Sand Pit', detail: 'Playground · All groups · 10:30-11:15', icon: Award, color: 'bg-emerald-500', pulse: true },
                { activity: 'Parent Drop-off Window Closing', detail: 'Gate · 5 children yet to arrive', icon: ShieldCheck, color: 'bg-red-500', pulse: true },
              ] : [
                { activity: 'Science Fair — Hall A', detail: 'Classes 6-8 · Judges evaluating projects', icon: Sparkles, color: 'bg-purple-500', pulse: true },
                { activity: 'Unit Test 3 — Mathematics', detail: 'Class 10-A, 10-B · Period 5 (11:30-12:15)', icon: FileText, color: 'bg-blue-500', pulse: true },
                { activity: 'Sports Practice — Cricket', detail: 'Ground · Inter-school team · Coach Verma', icon: Award, color: 'bg-emerald-500', pulse: false },
                { activity: 'CBSE Inspector Visit', detail: 'Principal Office · Lab inspection at 12:30', icon: ShieldCheck, color: 'bg-red-500', pulse: true },
              ]).map((item, i) => (
                <div key={i} className={`flex items-center gap-2.5 p-2 rounded-xl ${theme.accentBg} border ${theme.border}`}>
                  <div className={`w-7 h-7 rounded-lg ${item.color}/20 flex items-center justify-center shrink-0 relative`}>
                    <item.icon size={13} className={item.color.replace('bg-', 'text-')} />
                    {item.pulse && <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[11px] font-bold ${theme.highlight} truncate`}>{item.activity}</p>
                    <p className={`text-[10px] ${theme.iconColor} truncate`}>{item.detail}</p>
                  </div>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 font-bold shrink-0`}>LIVE</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming */}
          <div>
            <p className={`text-[10px] font-bold uppercase ${theme.iconColor} mb-1.5 flex items-center gap-1`}>
              <Clock size={10} /> Upcoming Today
            </p>
            <div className="space-y-1.5">
              {(isPreschool ? [
                { activity: 'Lunch Time — All Groups', detail: '12:00 PM · Dining Hall · Paneer Rice + Fruit', time: '12:00 PM', icon: Users },
                { activity: 'Nap Time', detail: '12:45 PM · All Rooms · Rest period', time: '12:45 PM', icon: Clock },
                { activity: 'Parent Pickup Window', detail: '3:00 PM · Gate · 56 children expected', time: '3:00 PM', icon: UserCheck },
              ] : [
                { activity: 'Staff Meeting', detail: '3:00 PM · Conference Room · All HODs', time: '3:00 PM', icon: Users },
                { activity: 'PTM — Class 9', detail: '4:00 PM · Classrooms · 42 parents expected', time: '4:00 PM', icon: UserCheck },
                { activity: 'Annual Day Rehearsal', detail: '4:30 PM · Auditorium · Dance + Drama groups', time: '4:30 PM', icon: Star },
              ]).map((item, i) => (
                <div key={i} className={`flex items-center gap-2.5 p-2 rounded-xl ${theme.secondaryBg}`}>
                  <div className={`w-7 h-7 rounded-lg ${theme.accentBg} flex items-center justify-center shrink-0`}>
                    <item.icon size={13} className={theme.iconColor} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[11px] font-bold ${theme.highlight} truncate`}>{item.activity}</p>
                    <p className={`text-[10px] ${theme.iconColor} truncate`}>{item.detail}</p>
                  </div>
                  <span className={`text-[10px] ${theme.iconColor} font-medium shrink-0`}>{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Task Tracker — Full Task Management Dashboard */}
        <TaskTrackerPanel theme={theme} role="principal" />

        {/* Recurring Tasks — Streak Tracking Card */}
        <RecurringTasksCard theme={theme} role="principal" isPreschool={isPreschool} />
      </div>
    </div>
  );
}
