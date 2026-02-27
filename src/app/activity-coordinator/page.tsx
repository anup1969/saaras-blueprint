'use client';

import React, { useState } from 'react';
import BlueprintLayout from '@/components/BlueprintLayout';
import { StatCard, TabBar, StatusBadge, SearchBar, DataTable, Toggle } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import StakeholderProfile from '@/components/StakeholderProfile';
import TaskTrackerPanel from '@/components/TaskTrackerPanel';
import { ChatsView } from '@/components/ChatModule';
import SupportModule from '@/components/SupportModule';
import YourInputsModule from '@/components/YourInputsModule';
import { type TeamMember } from '@/lib/auth';
import {
  Home, Calendar, Star, Image, MessageSquare, Clock,
  Search, Plus, Filter, Download, Eye, Edit, CheckCircle,
  AlertTriangle, Users, Palette, Music, Dribbble, BookOpen,
  PanelLeftClose, PanelLeftOpen, Headphones, Award, Camera, Heart, ClipboardCheck
} from 'lucide-react';

// ─── MODULE SIDEBAR ────────────────────────────────
const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'activity-calendar', label: 'Activity Calendar', icon: Calendar },
  { id: 'milestone-curriculum', label: 'Milestones', icon: Star },
  { id: 'events', label: 'Events', icon: Award },
  { id: 'art-gallery', label: 'Art Gallery', icon: Image },
  { id: 'communication', label: 'Communication', icon: MessageSquare },
  { id: 'your-inputs', label: 'Your Inputs', icon: ClipboardCheck },
  { id: 'support', label: 'Support', icon: Headphones },
];

// ─── MOCK DATA ──────────────────────────────────────
const mockTodayActivities = [
  { time: '09:00 - 09:30', activity: 'Morning Circle Time', ageGroup: 'All Groups', room: 'Activity Hall', materials: 'Puppets, Song cards', status: 'Completed' },
  { time: '09:30 - 10:15', activity: 'Art & Craft — Paper Collage', ageGroup: 'Nursery (3-4y)', room: 'Art Room', materials: 'Colored paper, Glue, Scissors', status: 'Completed' },
  { time: '09:30 - 10:15', activity: 'Block Building', ageGroup: 'Playgroup (2-3y)', room: 'Play Room A', materials: 'Wooden blocks, Lego', status: 'Completed' },
  { time: '10:30 - 11:15', activity: 'Outdoor Play — Sand Pit', ageGroup: 'All Groups', room: 'Playground', materials: 'Sand toys, Water cups', status: 'In Progress' },
  { time: '11:30 - 12:00', activity: 'Story Time — "The Hungry Caterpillar"', ageGroup: 'LKG (4-5y)', room: 'Library Corner', materials: 'Story book, Felt board', status: 'Upcoming' },
  { time: '02:00 - 02:45', activity: 'Music & Movement', ageGroup: 'All Groups', room: 'Activity Hall', materials: 'Tambourine, Bells, Speaker', status: 'Upcoming' },
];

const mockUpcomingEvents = [
  { date: 'Feb 20', event: 'International Mother Language Day', ageGroup: 'All', lead: 'Ms. Priya', status: 'Planning', budget: '₹5,000' },
  { date: 'Feb 28', event: 'Science Fun Day — Water Experiments', ageGroup: 'LKG & UKG', lead: 'Ms. Kavita', status: 'Confirmed', budget: '₹3,500' },
  { date: 'Mar 8', event: 'Women\'s Day Celebration', ageGroup: 'All', lead: 'Activity Team', status: 'Planning', budget: '₹8,000' },
  { date: 'Mar 14', event: 'Holi Colour Play (Organic)', ageGroup: 'All', lead: 'Ms. Priya', status: 'Planning', budget: '₹6,000' },
];

const mockMilestones = [
  { area: 'Gross Motor', milestone: 'Can hop on one foot', ageGroup: 'LKG (4-5y)', assessed: 18, onTrack: 15, needsSupport: 3 },
  { area: 'Fine Motor', milestone: 'Holds crayon with tripod grip', ageGroup: 'Nursery (3-4y)', assessed: 22, onTrack: 19, needsSupport: 3 },
  { area: 'Social', milestone: 'Shares toys voluntarily', ageGroup: 'Playgroup (2-3y)', assessed: 15, onTrack: 11, needsSupport: 4 },
  { area: 'Language', milestone: 'Speaks in 3-4 word sentences', ageGroup: 'Nursery (3-4y)', assessed: 22, onTrack: 20, needsSupport: 2 },
  { area: 'Cognitive', milestone: 'Sorts objects by colour', ageGroup: 'Playgroup (2-3y)', assessed: 15, onTrack: 13, needsSupport: 2 },
  { area: 'Creative', milestone: 'Draws recognizable shapes', ageGroup: 'LKG (4-5y)', assessed: 18, onTrack: 16, needsSupport: 2 },
];

const mockArtGallery = [
  { id: 'ART-01', child: 'Aarav Patel', activity: 'Paper Collage', date: 'Feb 15', teacher: 'Ms. Priya', likes: 12 },
  { id: 'ART-02', child: 'Siya Sharma', activity: 'Finger Painting', date: 'Feb 14', teacher: 'Ms. Kavita', likes: 18 },
  { id: 'ART-03', child: 'Rohan Desai', activity: 'Clay Modelling', date: 'Feb 14', teacher: 'Ms. Priya', likes: 9 },
  { id: 'ART-04', child: 'Ananya Mehta', activity: 'Block Tower', date: 'Feb 13', teacher: 'Ms. Kavita', likes: 15 },
  { id: 'ART-05', child: 'Vivaan Shah', activity: 'Drawing — My Family', date: 'Feb 13', teacher: 'Ms. Priya', likes: 22 },
  { id: 'ART-06', child: 'Ishita Joshi', activity: 'Paper Plate Craft', date: 'Feb 12', teacher: 'Ms. Kavita', likes: 7 },
];

function ActivityCoordinatorDashboard({ theme, themeIdx, onThemeChange, currentUser }: { theme?: Theme; themeIdx?: number; onThemeChange?: (idx: number) => void; currentUser?: TeamMember }) {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  if (!theme) return null;

  return (
    <div className="flex gap-4 -m-6">
      {/* Module sidebar */}
      <div className={`${sidebarCollapsed ? 'w-14' : 'w-48'} ${theme.cardBg} border-r ${theme.border} min-h-screen p-2 space-y-0.5 shrink-0 transition-all duration-200`}>
        <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} px-2 py-2`}>
          {!sidebarCollapsed && <p className={`text-[10px] font-bold ${theme.iconColor} uppercase px-1`}>Modules</p>}
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className={`p-1 rounded-lg ${theme.buttonHover} ${theme.iconColor} transition-all`}>
            {sidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={14} />}
          </button>
        </div>
        {modules.map(m => (
          <button
            key={m.id}
            onClick={() => setActiveModule(m.id)}
            title={sidebarCollapsed ? m.label : undefined}
            className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2 py-2.5' : 'gap-2 px-3 py-2'} rounded-lg text-xs font-medium transition-all ${
              activeModule === m.id ? `${theme.primary} text-white` : `${theme.iconColor} ${theme.buttonHover}`
            }`}
          >
            <m.icon size={sidebarCollapsed ? 20 : 14} />
            {!sidebarCollapsed && m.label}
          </button>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 space-y-6 min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-xl font-bold ${theme.highlight}`}>Activity Coordinator</h1>
            <p className={`text-xs ${theme.iconColor} mt-0.5`}>Activity curriculum, milestone planning, event coordination</p>
          </div>
          <div className="flex items-center gap-2">
            <StakeholderProfile role="Activity Coordinator" theme={theme} />
          </div>
        </div>

        {activeModule === 'dashboard' && (
          <>
            {/* Stat Cards */}
            <div className="grid grid-cols-4 gap-3">
              <StatCard label="Today's Activities" value="6" sub="2 completed, 1 in progress" icon={Calendar} color="bg-blue-500" theme={theme} />
              <StatCard label="Upcoming Events" value="4" sub="Next: Mother Language Day (Feb 20)" icon={Award} color="bg-amber-500" theme={theme} />
              <StatCard label="Milestones This Week" value="12" sub="85% children on track" icon={Star} color="bg-emerald-500" theme={theme} />
              <StatCard label="Photo Uploads" value="24" sub="Last 7 days — shared with parents" icon={Camera} color="bg-purple-500" theme={theme} />
            </div>

            {/* Today's Activity Schedule */}
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
              <div className="flex items-center justify-between mb-3">
                <h2 className={`text-sm font-bold ${theme.highlight}`}>Today&apos;s Activity Schedule</h2>
                <button className={`text-[10px] px-3 py-1.5 rounded-lg ${theme.primary} text-white font-bold flex items-center gap-1`}>
                  <Plus size={10} /> Add Activity
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className={`border-b ${theme.border}`}>
                      <th className={`text-left py-2 px-3 ${theme.iconColor} font-bold`}>Time</th>
                      <th className={`text-left py-2 px-3 ${theme.iconColor} font-bold`}>Activity</th>
                      <th className={`text-left py-2 px-3 ${theme.iconColor} font-bold`}>Age Group</th>
                      <th className={`text-left py-2 px-3 ${theme.iconColor} font-bold`}>Room</th>
                      <th className={`text-left py-2 px-3 ${theme.iconColor} font-bold`}>Materials</th>
                      <th className={`text-left py-2 px-3 ${theme.iconColor} font-bold`}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockTodayActivities.map((a, i) => (
                      <tr key={i} className={`border-b ${theme.border} ${theme.buttonHover}`}>
                        <td className={`py-2.5 px-3 ${theme.iconColor} font-medium whitespace-nowrap`}>{a.time}</td>
                        <td className={`py-2.5 px-3 ${theme.highlight} font-bold`}>{a.activity}</td>
                        <td className={`py-2.5 px-3 ${theme.iconColor}`}>{a.ageGroup}</td>
                        <td className={`py-2.5 px-3 ${theme.iconColor}`}>{a.room}</td>
                        <td className={`py-2.5 px-3 ${theme.iconColor} text-[10px]`}>{a.materials}</td>
                        <td className="py-2.5 px-3">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            a.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                            a.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                            'bg-slate-100 text-slate-500'
                          }`}>{a.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
              <h2 className={`text-sm font-bold ${theme.highlight} mb-3`}>Upcoming Events</h2>
              <div className="grid grid-cols-2 gap-3">
                {mockUpcomingEvents.map((ev, i) => (
                  <div key={i} className={`${theme.secondaryBg} rounded-xl p-3 border ${theme.border}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] font-bold ${theme.primaryText}`}>{ev.date}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        ev.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>{ev.status}</span>
                    </div>
                    <p className={`text-xs font-bold ${theme.highlight}`}>{ev.event}</p>
                    <div className={`flex items-center gap-3 mt-1.5 text-[10px] ${theme.iconColor}`}>
                      <span>Age: {ev.ageGroup}</span>
                      <span>Lead: {ev.lead}</span>
                      <span>Budget: {ev.budget}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeModule === 'milestone-curriculum' && (
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center justify-between mb-3">
              <h2 className={`text-sm font-bold ${theme.highlight}`}>Developmental Milestones — Current Assessment</h2>
              <button className={`text-[10px] px-3 py-1.5 rounded-lg ${theme.secondaryBg} ${theme.iconColor} font-bold flex items-center gap-1`}>
                <Download size={10} /> Export Report
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className={`border-b ${theme.border}`}>
                    <th className={`text-left py-2 px-3 ${theme.iconColor} font-bold`}>Area</th>
                    <th className={`text-left py-2 px-3 ${theme.iconColor} font-bold`}>Milestone</th>
                    <th className={`text-left py-2 px-3 ${theme.iconColor} font-bold`}>Age Group</th>
                    <th className={`text-left py-2 px-3 ${theme.iconColor} font-bold`}>Assessed</th>
                    <th className={`text-left py-2 px-3 ${theme.iconColor} font-bold`}>On Track</th>
                    <th className={`text-left py-2 px-3 ${theme.iconColor} font-bold`}>Needs Support</th>
                  </tr>
                </thead>
                <tbody>
                  {mockMilestones.map((m, i) => (
                    <tr key={i} className={`border-b ${theme.border} ${theme.buttonHover}`}>
                      <td className={`py-2.5 px-3`}>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          m.area === 'Gross Motor' ? 'bg-blue-100 text-blue-700' :
                          m.area === 'Fine Motor' ? 'bg-purple-100 text-purple-700' :
                          m.area === 'Social' ? 'bg-pink-100 text-pink-700' :
                          m.area === 'Language' ? 'bg-emerald-100 text-emerald-700' :
                          m.area === 'Cognitive' ? 'bg-amber-100 text-amber-700' :
                          'bg-rose-100 text-rose-700'
                        }`}>{m.area}</span>
                      </td>
                      <td className={`py-2.5 px-3 ${theme.highlight} font-medium`}>{m.milestone}</td>
                      <td className={`py-2.5 px-3 ${theme.iconColor}`}>{m.ageGroup}</td>
                      <td className={`py-2.5 px-3 ${theme.iconColor} font-bold`}>{m.assessed}</td>
                      <td className="py-2.5 px-3 text-emerald-600 font-bold">{m.onTrack}</td>
                      <td className="py-2.5 px-3 text-red-500 font-bold">{m.needsSupport}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeModule === 'activity-calendar' && (
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h2 className={`text-sm font-bold ${theme.highlight} mb-3`}>Weekly Activity Calendar</h2>
            <div className="grid grid-cols-5 gap-2">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                <div key={day} className={`${theme.secondaryBg} rounded-xl p-3 border ${theme.border}`}>
                  <p className={`text-[10px] font-bold ${theme.primaryText} mb-2`}>{day}</p>
                  {[
                    { time: '09:00', act: day === 'Monday' ? 'Art & Craft' : day === 'Tuesday' ? 'Music' : day === 'Wednesday' ? 'Dance' : day === 'Thursday' ? 'Yoga' : 'Free Play' },
                    { time: '10:30', act: 'Outdoor Play' },
                    { time: '11:30', act: day === 'Monday' ? 'Story Time' : day === 'Tuesday' ? 'Puppet Show' : day === 'Wednesday' ? 'Science Fun' : day === 'Thursday' ? 'Nature Walk' : 'Movie' },
                    { time: '02:00', act: day === 'Friday' ? 'Show & Tell' : 'Sensory Play' },
                  ].map((slot, i) => (
                    <div key={i} className={`flex items-center gap-2 py-1 border-t ${theme.border}`}>
                      <span className={`text-[9px] ${theme.iconColor} w-10 shrink-0`}>{slot.time}</span>
                      <span className={`text-[10px] ${theme.highlight} font-medium`}>{slot.act}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeModule === 'events' && (
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center justify-between mb-3">
              <h2 className={`text-sm font-bold ${theme.highlight}`}>Events Management</h2>
              <button className={`text-[10px] px-3 py-1.5 rounded-lg ${theme.primary} text-white font-bold flex items-center gap-1`}>
                <Plus size={10} /> New Event
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className={`border-b ${theme.border}`}>
                    <th className={`text-left py-2 px-3 ${theme.iconColor} font-bold`}>Date</th>
                    <th className={`text-left py-2 px-3 ${theme.iconColor} font-bold`}>Event</th>
                    <th className={`text-left py-2 px-3 ${theme.iconColor} font-bold`}>Age Group</th>
                    <th className={`text-left py-2 px-3 ${theme.iconColor} font-bold`}>Lead</th>
                    <th className={`text-left py-2 px-3 ${theme.iconColor} font-bold`}>Budget</th>
                    <th className={`text-left py-2 px-3 ${theme.iconColor} font-bold`}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUpcomingEvents.map((ev, i) => (
                    <tr key={i} className={`border-b ${theme.border} ${theme.buttonHover}`}>
                      <td className={`py-2.5 px-3 ${theme.primaryText} font-bold whitespace-nowrap`}>{ev.date}</td>
                      <td className={`py-2.5 px-3 ${theme.highlight} font-bold`}>{ev.event}</td>
                      <td className={`py-2.5 px-3 ${theme.iconColor}`}>{ev.ageGroup}</td>
                      <td className={`py-2.5 px-3 ${theme.iconColor}`}>{ev.lead}</td>
                      <td className={`py-2.5 px-3 ${theme.iconColor}`}>{ev.budget}</td>
                      <td className="py-2.5 px-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          ev.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>{ev.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeModule === 'art-gallery' && (
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center justify-between mb-3">
              <h2 className={`text-sm font-bold ${theme.highlight}`}>Art Gallery — Child Creations</h2>
              <button className={`text-[10px] px-3 py-1.5 rounded-lg ${theme.primary} text-white font-bold flex items-center gap-1`}>
                <Camera size={10} /> Upload Photo
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {mockArtGallery.map(art => (
                <div key={art.id} className={`${theme.secondaryBg} rounded-xl border ${theme.border} overflow-hidden`}>
                  <div className="h-32 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                    <Image size={32} className="text-purple-300" />
                  </div>
                  <div className="p-3">
                    <p className={`text-xs font-bold ${theme.highlight}`}>{art.activity}</p>
                    <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>by {art.child} &middot; {art.date}</p>
                    <div className={`flex items-center justify-between mt-2`}>
                      <span className={`text-[10px] ${theme.iconColor}`}>Teacher: {art.teacher}</span>
                      <span className="text-[10px] text-pink-500 font-bold flex items-center gap-0.5">
                        <Heart size={10} /> {art.likes}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeModule === 'communication' && <ChatsView theme={theme} />}

        {activeModule === 'your-inputs' && <YourInputsModule theme={theme} userName={currentUser?.name || ''} />}
        {activeModule === 'support' && <SupportModule theme={theme} role="Activity Coordinator" />}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <BlueprintLayout>
      <ActivityCoordinatorDashboard />
    </BlueprintLayout>
  );
}
