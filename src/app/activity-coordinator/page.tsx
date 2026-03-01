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
  PanelLeftClose, PanelLeftOpen, Headphones, Award, Camera, Heart, ClipboardCheck,
  Shield, Dumbbell, Swords, Wrench, Trophy, Target, TrendingUp, BarChart3, X
} from 'lucide-react';

// ─── MODULE SIDEBAR ────────────────────────────────
const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'activity-calendar', label: 'Activity Calendar', icon: Calendar },
  { id: 'milestone-curriculum', label: 'Milestones', icon: Star },
  { id: 'events', label: 'Events', icon: Award },
  { id: 'art-gallery', label: 'Art Gallery', icon: Image },
  { id: 'house-system', label: 'House System', icon: Shield },
  { id: 'fitness', label: 'Fitness', icon: Dumbbell },
  { id: 'competitions', label: 'Competitions', icon: Swords },
  { id: 'equipment', label: 'Equipment', icon: Wrench },
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

// ─── MOCK: HOUSE SYSTEM ─────────────────────────────
const mockHouses = [
  { name: 'Red House', color: 'bg-red-500', captain: 'Aarav Patel', points: 110, rank: 1, students: 95, teacher: 'Mr. Sharma', sports: 50, cultural: 30, academic: 20, discipline: 10 },
  { name: 'Blue House', color: 'bg-blue-500', captain: 'Siya Mehta', points: 98, rank: 2, students: 92, teacher: 'Mrs. Iyer', sports: 40, cultural: 28, academic: 18, discipline: 12 },
  { name: 'Green House', color: 'bg-emerald-500', captain: 'Rohan Desai', points: 85, rank: 3, students: 90, teacher: 'Ms. D\'Souza', sports: 35, cultural: 25, academic: 15, discipline: 10 },
  { name: 'Yellow House', color: 'bg-amber-500', captain: 'Ananya Joshi', points: 79, rank: 4, students: 88, teacher: 'Mr. Reddy', sports: 30, cultural: 22, academic: 17, discipline: 10 },
];

// ─── MOCK: FITNESS RECORDS ──────────────────────────
const mockFitnessRecords = [
  { student: 'Aarav Patel', class: '10-A', height: '165 cm', weight: '52 kg', bmi: 19.1, run50m: '7.2s', longJump: '4.1m', flexibility: 'Good', grade: 'A+' },
  { student: 'Siya Mehta', class: '10-A', height: '158 cm', weight: '48 kg', bmi: 19.2, run50m: '7.8s', longJump: '3.5m', flexibility: 'Excellent', grade: 'A' },
  { student: 'Rohan Desai', class: '10-B', height: '170 cm', weight: '60 kg', bmi: 20.8, run50m: '6.9s', longJump: '4.5m', flexibility: 'Fair', grade: 'A' },
  { student: 'Vivaan Shah', class: '9-A', height: '155 cm', weight: '55 kg', bmi: 22.9, run50m: '8.1s', longJump: '3.2m', flexibility: 'Good', grade: 'B' },
  { student: 'Ishita Joshi', class: '9-B', height: '152 cm', weight: '46 kg', bmi: 19.9, run50m: '8.5s', longJump: '3.0m', flexibility: 'Excellent', grade: 'A' },
  { student: 'Krish Patel', class: '8-A', height: '148 cm', weight: '50 kg', bmi: 22.8, run50m: '8.8s', longJump: '2.8m', flexibility: 'Fair', grade: 'C' },
];

// ─── MOCK: COMPETITIONS ─────────────────────────────
const mockCompetitions = [
  { name: 'Inter-House Cricket Tournament', type: 'Inter-house', sport: 'Cricket', date: 'Mar 10-14, 2026', venue: 'School Ground', status: 'Upcoming' },
  { name: 'District Athletics Meet', type: 'Inter-school', sport: 'Athletics', date: 'Mar 20, 2026', venue: 'Rajiv Gandhi Stadium', status: 'Upcoming' },
  { name: 'State Basketball Championship', type: 'State', sport: 'Basketball', date: 'Apr 5-7, 2026', venue: 'Indoor Stadium, Ahmedabad', status: 'Registered' },
  { name: 'Annual Sports Day', type: 'Inter-house', sport: 'Multi-sport', date: 'Feb 28, 2026', venue: 'School Ground', status: 'Completed' },
  { name: 'CBSE National Swimming Meet', type: 'National', sport: 'Swimming', date: 'May 2026', venue: 'TBD', status: 'Selection' },
];

const mockCompetitionResults = [
  { event: '100m Sprint', participant: 'Aarav Patel', house: 'Red House', position: '1st', points: 10, record: 'New School Record (11.2s)' },
  { event: 'Long Jump', participant: 'Rohan Desai', house: 'Green House', position: '1st', points: 10, record: '' },
  { event: '200m Sprint', participant: 'Siya Mehta', house: 'Blue House', position: '2nd', points: 7, record: '' },
  { event: 'Shot Put', participant: 'Vivaan Shah', house: 'Yellow House', position: '3rd', points: 5, record: '' },
  { event: 'Relay 4x100m', participant: 'Red House Team', house: 'Red House', position: '1st', points: 15, record: '' },
];

// ─── MOCK: EQUIPMENT ────────────────────────────────
const mockEquipment = [
  { item: 'Cricket Bats', category: 'Cricket', quantity: 12, condition: 'Good', location: 'Sports Room A', lastChecked: 'Feb 10, 2026' },
  { item: 'Footballs', category: 'Football', quantity: 8, condition: 'Fair', location: 'Sports Room A', lastChecked: 'Feb 08, 2026' },
  { item: 'Basketballs', category: 'Basketball', quantity: 6, condition: 'Good', location: 'Indoor Court', lastChecked: 'Feb 12, 2026' },
  { item: 'Badminton Rackets', category: 'Badminton', quantity: 15, condition: 'Good', location: 'Sports Room B', lastChecked: 'Feb 05, 2026' },
  { item: 'Shuttlecocks (Box)', category: 'Badminton', quantity: 2, condition: 'Low Stock', location: 'Sports Room B', lastChecked: 'Feb 12, 2026' },
  { item: 'Yoga Mats', category: 'Yoga', quantity: 30, condition: 'Good', location: 'Yoga Hall', lastChecked: 'Jan 28, 2026' },
  { item: 'High Jump Pole', category: 'Athletics', quantity: 2, condition: 'Poor', location: 'Ground Store', lastChecked: 'Feb 01, 2026' },
  { item: 'Swimming Goggles', category: 'Swimming', quantity: 20, condition: 'Good', location: 'Pool Store', lastChecked: 'Feb 10, 2026' },
  { item: 'Gym Dumbbells Set', category: 'Gym', quantity: 1, condition: 'Good', location: 'Gym Room', lastChecked: 'Feb 12, 2026' },
];

const mockMaintenanceLog = [
  { item: 'High Jump Pole', issue: 'Cracked base support', reportedDate: 'Feb 01, 2026', status: 'In Repair', cost: '₹2,500' },
  { item: 'Football Net (Goal A)', issue: 'Torn mesh', reportedDate: 'Jan 25, 2026', status: 'Fixed', cost: '₹800' },
  { item: 'Treadmill #2', issue: 'Belt slipping', reportedDate: 'Feb 08, 2026', status: 'Pending', cost: '—' },
  { item: 'Basketball Backboard', issue: 'Loose mounting bolts', reportedDate: 'Feb 05, 2026', status: 'Fixed', cost: '₹350' },
];

function ActivityCoordinatorDashboard({ theme, themeIdx, onThemeChange, currentUser }: { theme?: Theme; themeIdx?: number; onThemeChange?: (idx: number) => void; currentUser?: TeamMember }) {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAwardPoints, setShowAwardPoints] = useState(false);
  const [showFitnessForm, setShowFitnessForm] = useState(false);
  const [showCreateCompetition, setShowCreateCompetition] = useState(false);
  const [showAddEquipment, setShowAddEquipment] = useState(false);
  const [fitnessTab, setFitnessTab] = useState('Records');
  const [competitionTab, setCompetitionTab] = useState('Competitions');
  const [equipmentTab, setEquipmentTab] = useState('Inventory');
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

        {/* ─── HOUSE SYSTEM MODULE ──────────────────────── */}
        {activeModule === 'house-system' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className={`text-lg font-bold ${theme.highlight}`}>House System</h2>
              <button onClick={() => setShowAwardPoints(true)} className={`text-[10px] px-3 py-1.5 rounded-lg ${theme.primary} text-white font-bold flex items-center gap-1`}>
                <Plus size={10} /> Award Points
              </button>
            </div>

            {/* House Cards */}
            <div className="grid grid-cols-4 gap-3">
              {mockHouses.map((h, i) => (
                <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 relative overflow-hidden`}>
                  <div className={`absolute top-0 left-0 w-full h-1 ${h.color}`} />
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-8 h-8 rounded-lg ${h.color} flex items-center justify-center text-white text-[10px] font-bold`}>#{h.rank}</div>
                    <div>
                      <p className={`text-xs font-bold ${theme.highlight}`}>{h.name}</p>
                      <p className={`text-[10px] ${theme.iconColor}`}>Captain: {h.captain}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-lg font-bold ${theme.highlight}`}>{h.points}</span>
                    <span className={`text-[10px] ${theme.iconColor}`}>points</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px]"><span className={theme.iconColor}>Sports</span><span className={`font-bold ${theme.highlight}`}>{h.sports}</span></div>
                    <div className="flex justify-between text-[10px]"><span className={theme.iconColor}>Cultural</span><span className={`font-bold ${theme.highlight}`}>{h.cultural}</span></div>
                    <div className="flex justify-between text-[10px]"><span className={theme.iconColor}>Academic</span><span className={`font-bold ${theme.highlight}`}>{h.academic}</span></div>
                    <div className="flex justify-between text-[10px]"><span className={theme.iconColor}>Discipline</span><span className={`font-bold ${theme.highlight}`}>{h.discipline}</span></div>
                  </div>
                  <div className={`mt-2 pt-2 border-t ${theme.border} text-[10px] ${theme.iconColor}`}>
                    <p>{h.students} students | TIC: {h.teacher}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Leaderboard Table */}
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
              <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>House Leaderboard</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className={`border-b ${theme.border}`}>
                      <th className={`text-left py-2 px-3 ${theme.iconColor} font-bold`}>Rank</th>
                      <th className={`text-left py-2 px-3 ${theme.iconColor} font-bold`}>House</th>
                      <th className={`text-center py-2 px-3 ${theme.iconColor} font-bold`}>Total Points</th>
                      <th className={`text-center py-2 px-3 ${theme.iconColor} font-bold`}>Sports</th>
                      <th className={`text-center py-2 px-3 ${theme.iconColor} font-bold`}>Cultural</th>
                      <th className={`text-center py-2 px-3 ${theme.iconColor} font-bold`}>Academic</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockHouses.sort((a, b) => a.rank - b.rank).map((h, i) => (
                      <tr key={i} className={`border-b ${theme.border} ${theme.buttonHover}`}>
                        <td className={`py-2.5 px-3`}>
                          <span className={`w-6 h-6 inline-flex items-center justify-center rounded-full text-white text-[10px] font-bold ${i === 0 ? 'bg-amber-500' : i === 1 ? 'bg-slate-400' : i === 2 ? 'bg-orange-500' : 'bg-gray-300'}`}>{h.rank}</span>
                        </td>
                        <td className={`py-2.5 px-3`}>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${h.color}`} />
                            <span className={`font-bold ${theme.highlight}`}>{h.name}</span>
                          </div>
                        </td>
                        <td className={`py-2.5 px-3 text-center font-bold ${theme.highlight}`}>{h.points}</td>
                        <td className={`py-2.5 px-3 text-center ${theme.iconColor}`}>{h.sports}</td>
                        <td className={`py-2.5 px-3 text-center ${theme.iconColor}`}>{h.cultural}</td>
                        <td className={`py-2.5 px-3 text-center ${theme.iconColor}`}>{h.academic}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* House Allocation Summary */}
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
              <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>House Allocation Summary</h3>
              <div className="grid grid-cols-4 gap-3">
                {mockHouses.map((h, i) => (
                  <div key={i} className={`${theme.secondaryBg} rounded-xl p-3 border ${theme.border} text-center`}>
                    <div className={`w-6 h-6 rounded-full ${h.color} mx-auto mb-1`} />
                    <p className={`text-xs font-bold ${theme.highlight}`}>{h.name}</p>
                    <p className={`text-lg font-bold ${theme.highlight}`}>{h.students}</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>students</p>
                    <p className={`text-[10px] ${theme.iconColor} mt-1`}>TIC: {h.teacher}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Award Points Modal */}
            {showAwardPoints && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowAwardPoints(false)}>
                <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 w-full max-w-md shadow-xl`} onClick={e => e.stopPropagation()}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-sm font-bold ${theme.highlight}`}>Award House Points</h3>
                    <button onClick={() => setShowAwardPoints(false)} className={`p-1 rounded-lg ${theme.buttonHover} ${theme.iconColor}`}><X size={14} /></button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Select House</label>
                      <select className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`}>
                        <option>Red House</option><option>Blue House</option><option>Green House</option><option>Yellow House</option>
                      </select>
                    </div>
                    <div>
                      <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Category</label>
                      <select className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`}>
                        <option>Sports</option><option>Cultural</option><option>Academic</option><option>Discipline</option>
                      </select>
                    </div>
                    <div>
                      <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Points</label>
                      <input type="number" defaultValue={5} className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`} />
                    </div>
                    <div>
                      <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Reason</label>
                      <input type="text" placeholder="e.g. Won inter-house relay" className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`} />
                    </div>
                    <div>
                      <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Event (Optional)</label>
                      <input type="text" placeholder="e.g. Annual Sports Day" className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`} />
                    </div>
                    <button onClick={() => { alert('Points awarded! (Blueprint demo)'); setShowAwardPoints(false); }} className={`w-full text-xs py-2.5 rounded-xl ${theme.primary} text-white font-bold`}>
                      Award Points
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── FITNESS TRACKING MODULE ──────────────────── */}
        {activeModule === 'fitness' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className={`text-lg font-bold ${theme.highlight}`}>Fitness Tracking</h2>
              <button onClick={() => setShowFitnessForm(true)} className={`text-[10px] px-3 py-1.5 rounded-lg ${theme.primary} text-white font-bold flex items-center gap-1`}>
                <Plus size={10} /> Record Fitness Test
              </button>
            </div>

            <TabBar tabs={['Records', 'Class Summary', 'Annual Comparison']} active={fitnessTab} onChange={setFitnessTab} theme={theme} />

            {fitnessTab === 'Records' && (
              <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`text-sm font-bold ${theme.highlight}`}>Student Fitness Records</h3>
                  <button className={`text-[10px] px-3 py-1.5 rounded-lg ${theme.secondaryBg} ${theme.iconColor} font-bold flex items-center gap-1`}>
                    <Download size={10} /> Export
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className={`border-b ${theme.border}`}>
                        {['Student', 'Class', 'Height', 'Weight', 'BMI', '50m Run', 'Long Jump', 'Flexibility', 'Grade'].map(h => (
                          <th key={h} className={`text-left py-2 px-3 ${theme.iconColor} font-bold`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {mockFitnessRecords.map((r, i) => (
                        <tr key={i} className={`border-b ${theme.border} ${theme.buttonHover}`}>
                          <td className={`py-2.5 px-3 font-bold ${theme.highlight}`}>{r.student}</td>
                          <td className={`py-2.5 px-3 ${theme.iconColor}`}>{r.class}</td>
                          <td className={`py-2.5 px-3 ${theme.iconColor}`}>{r.height}</td>
                          <td className={`py-2.5 px-3 ${theme.iconColor}`}>{r.weight}</td>
                          <td className={`py-2.5 px-3 font-bold ${r.bmi < 18.5 || r.bmi > 24.9 ? 'text-amber-600' : 'text-emerald-600'}`}>{r.bmi}</td>
                          <td className={`py-2.5 px-3 ${theme.iconColor}`}>{r.run50m}</td>
                          <td className={`py-2.5 px-3 ${theme.iconColor}`}>{r.longJump}</td>
                          <td className={`py-2.5 px-3`}>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                              r.flexibility === 'Excellent' ? 'bg-emerald-100 text-emerald-700' : r.flexibility === 'Good' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                            }`}>{r.flexibility}</span>
                          </td>
                          <td className={`py-2.5 px-3`}>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                              r.grade === 'A+' ? 'bg-emerald-100 text-emerald-700' : r.grade === 'A' ? 'bg-blue-100 text-blue-700' : r.grade === 'B' ? 'bg-amber-100 text-amber-700' : r.grade === 'C' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                            }`}>{r.grade}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {fitnessTab === 'Class Summary' && (
              <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
                <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Class-wise Fitness Summary</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { class: 'Class 8', avgBMI: 20.1, fitnessZone: 78, students: 45 },
                    { class: 'Class 9', avgBMI: 20.5, fitnessZone: 82, students: 42 },
                    { class: 'Class 10', avgBMI: 19.8, fitnessZone: 85, students: 40 },
                  ].map((c, i) => (
                    <div key={i} className={`${theme.secondaryBg} rounded-xl p-4 border ${theme.border}`}>
                      <p className={`text-xs font-bold ${theme.highlight} mb-2`}>{c.class}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px]">
                          <span className={theme.iconColor}>Students</span>
                          <span className={`font-bold ${theme.highlight}`}>{c.students}</span>
                        </div>
                        <div className="flex justify-between text-[10px]">
                          <span className={theme.iconColor}>Avg BMI</span>
                          <span className={`font-bold ${theme.highlight}`}>{c.avgBMI}</span>
                        </div>
                        <div className="flex justify-between text-[10px]">
                          <span className={theme.iconColor}>% in Fitness Zone</span>
                          <span className="font-bold text-emerald-600">{c.fitnessZone}%</span>
                        </div>
                        <div className={`h-2 rounded-full ${theme.secondaryBg} border ${theme.border}`}>
                          <div className="h-full rounded-full bg-emerald-500" style={{ width: `${c.fitnessZone}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {fitnessTab === 'Annual Comparison' && (
              <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
                <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Annual Fitness Comparison (This Year vs Last Year)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className={`border-b ${theme.border}`}>
                        <th className={`text-left py-2 px-3 ${theme.iconColor} font-bold`}>Metric</th>
                        <th className={`text-center py-2 px-3 ${theme.iconColor} font-bold`}>2024-25</th>
                        <th className={`text-center py-2 px-3 ${theme.iconColor} font-bold`}>2025-26</th>
                        <th className={`text-center py-2 px-3 ${theme.iconColor} font-bold`}>Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { metric: 'Average BMI', last: '21.2', current: '20.5', change: '-0.7', positive: true },
                        { metric: '% in Fitness Zone', last: '74%', current: '82%', change: '+8%', positive: true },
                        { metric: 'Avg 50m Run', last: '8.4s', current: '7.9s', change: '-0.5s', positive: true },
                        { metric: 'Avg Long Jump', last: '3.1m', current: '3.5m', change: '+0.4m', positive: true },
                        { metric: 'Flexibility (Good+)', last: '68%', current: '75%', change: '+7%', positive: true },
                      ].map((r, i) => (
                        <tr key={i} className={`border-b ${theme.border} ${theme.buttonHover}`}>
                          <td className={`py-2.5 px-3 font-bold ${theme.highlight}`}>{r.metric}</td>
                          <td className={`py-2.5 px-3 text-center ${theme.iconColor}`}>{r.last}</td>
                          <td className={`py-2.5 px-3 text-center font-bold ${theme.highlight}`}>{r.current}</td>
                          <td className="py-2.5 px-3 text-center">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${r.positive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                              {r.change}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Record Fitness Test Modal */}
            {showFitnessForm && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowFitnessForm(false)}>
                <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 w-full max-w-lg shadow-xl max-h-[85vh] overflow-y-auto`} onClick={e => e.stopPropagation()}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-sm font-bold ${theme.highlight}`}>Record Fitness Test</h3>
                    <button onClick={() => setShowFitnessForm(false)} className={`p-1 rounded-lg ${theme.buttonHover} ${theme.iconColor}`}><X size={14} /></button>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: 'Student Name', type: 'text', placeholder: 'Search student...' },
                      { label: 'Class', type: 'text', placeholder: 'e.g. 10-A' },
                      { label: 'Height (cm)', type: 'number', placeholder: '165' },
                      { label: 'Weight (kg)', type: 'number', placeholder: '52' },
                      { label: '50m Run Time (seconds)', type: 'text', placeholder: '7.2' },
                      { label: 'Long Jump (meters)', type: 'text', placeholder: '4.1' },
                      { label: 'Flexibility', type: 'select', options: ['Excellent', 'Good', 'Fair', 'Poor'] },
                    ].map((f, i) => (
                      <div key={i}>
                        <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>{f.label}</label>
                        {f.type === 'select' ? (
                          <select className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`}>
                            {f.options?.map(o => <option key={o}>{o}</option>)}
                          </select>
                        ) : (
                          <input type={f.type} placeholder={f.placeholder} className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`} />
                        )}
                      </div>
                    ))}
                    <button onClick={() => { alert('Fitness test recorded! (Blueprint demo)'); setShowFitnessForm(false); }} className={`w-full text-xs py-2.5 rounded-xl ${theme.primary} text-white font-bold`}>
                      Save Record
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── COMPETITION MANAGEMENT MODULE ────────────── */}
        {activeModule === 'competitions' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className={`text-lg font-bold ${theme.highlight}`}>Competition Management</h2>
              <button onClick={() => setShowCreateCompetition(true)} className={`text-[10px] px-3 py-1.5 rounded-lg ${theme.primary} text-white font-bold flex items-center gap-1`}>
                <Plus size={10} /> Create Competition
              </button>
            </div>

            <TabBar tabs={['Competitions', 'Results', 'Awards Tally']} active={competitionTab} onChange={setCompetitionTab} theme={theme} />

            {competitionTab === 'Competitions' && (
              <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className={`border-b ${theme.border}`}>
                        {['Name', 'Type', 'Sport', 'Date', 'Venue', 'Status', 'Actions'].map(h => (
                          <th key={h} className={`text-left py-2 px-3 ${theme.iconColor} font-bold`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {mockCompetitions.map((c, i) => (
                        <tr key={i} className={`border-b ${theme.border} ${theme.buttonHover}`}>
                          <td className={`py-2.5 px-3 font-bold ${theme.highlight}`}>{c.name}</td>
                          <td className="py-2.5 px-3">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                              c.type === 'Inter-house' ? 'bg-blue-100 text-blue-700' : c.type === 'Inter-school' ? 'bg-purple-100 text-purple-700' : c.type === 'State' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                            }`}>{c.type}</span>
                          </td>
                          <td className={`py-2.5 px-3 ${theme.iconColor}`}>{c.sport}</td>
                          <td className={`py-2.5 px-3 ${theme.iconColor}`}>{c.date}</td>
                          <td className={`py-2.5 px-3 ${theme.iconColor}`}>{c.venue}</td>
                          <td className="py-2.5 px-3">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                              c.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : c.status === 'Upcoming' ? 'bg-blue-100 text-blue-700' : c.status === 'Registered' ? 'bg-purple-100 text-purple-700' : 'bg-amber-100 text-amber-700'
                            }`}>{c.status}</span>
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="flex items-center gap-1">
                              <button className={`p-1 rounded ${theme.buttonHover}`}><Eye size={12} className={theme.iconColor} /></button>
                              <button className={`p-1 rounded ${theme.buttonHover}`}><Edit size={12} className={theme.iconColor} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {competitionTab === 'Results' && (
              <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
                <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Annual Sports Day Results</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className={`border-b ${theme.border}`}>
                        {['Event', 'Participant', 'House', 'Position', 'Points', 'Record'].map(h => (
                          <th key={h} className={`text-left py-2 px-3 ${theme.iconColor} font-bold`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {mockCompetitionResults.map((r, i) => (
                        <tr key={i} className={`border-b ${theme.border} ${theme.buttonHover}`}>
                          <td className={`py-2.5 px-3 font-bold ${theme.highlight}`}>{r.event}</td>
                          <td className={`py-2.5 px-3 ${theme.iconColor}`}>{r.participant}</td>
                          <td className={`py-2.5 px-3 ${theme.iconColor}`}>{r.house}</td>
                          <td className="py-2.5 px-3">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                              r.position === '1st' ? 'bg-amber-100 text-amber-700' : r.position === '2nd' ? 'bg-slate-100 text-slate-600' : 'bg-orange-100 text-orange-700'
                            }`}>{r.position}</span>
                          </td>
                          <td className={`py-2.5 px-3 font-bold ${theme.highlight}`}>{r.points}</td>
                          <td className={`py-2.5 px-3`}>
                            {r.record ? <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-red-100 text-red-700">{r.record}</span> : <span className={`text-[10px] ${theme.iconColor}`}>—</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {competitionTab === 'Awards Tally' && (
              <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
                <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Awards / Medals Tally by House</h3>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { house: 'Red House', color: 'bg-red-500', gold: 5, silver: 3, bronze: 2 },
                    { house: 'Blue House', color: 'bg-blue-500', gold: 3, silver: 4, bronze: 3 },
                    { house: 'Green House', color: 'bg-emerald-500', gold: 2, silver: 2, bronze: 4 },
                    { house: 'Yellow House', color: 'bg-amber-500', gold: 2, silver: 3, bronze: 1 },
                  ].map((h, i) => (
                    <div key={i} className={`${theme.secondaryBg} rounded-xl p-4 border ${theme.border} text-center`}>
                      <div className={`w-6 h-6 rounded-full ${h.color} mx-auto mb-2`} />
                      <p className={`text-xs font-bold ${theme.highlight} mb-2`}>{h.house}</p>
                      <div className="flex justify-center gap-3">
                        <div>
                          <p className="text-lg font-bold text-amber-500">{h.gold}</p>
                          <p className={`text-[10px] ${theme.iconColor}`}>Gold</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-slate-400">{h.silver}</p>
                          <p className={`text-[10px] ${theme.iconColor}`}>Silver</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-orange-500">{h.bronze}</p>
                          <p className={`text-[10px] ${theme.iconColor}`}>Bronze</p>
                        </div>
                      </div>
                      <p className={`text-xs font-bold ${theme.highlight} mt-2 pt-2 border-t ${theme.border}`}>Total: {h.gold + h.silver + h.bronze}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Create Competition Modal */}
            {showCreateCompetition && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowCreateCompetition(false)}>
                <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 w-full max-w-md shadow-xl`} onClick={e => e.stopPropagation()}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-sm font-bold ${theme.highlight}`}>Create Competition</h3>
                    <button onClick={() => setShowCreateCompetition(false)} className={`p-1 rounded-lg ${theme.buttonHover} ${theme.iconColor}`}><X size={14} /></button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Competition Name</label>
                      <input type="text" placeholder="e.g. Inter-House Cricket Tournament" className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`} />
                    </div>
                    <div>
                      <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Type</label>
                      <select className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`}>
                        <option>Inter-house</option><option>Inter-school</option><option>State</option><option>National</option>
                      </select>
                    </div>
                    <div>
                      <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Sport</label>
                      <input type="text" placeholder="e.g. Cricket" className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`} />
                    </div>
                    <div>
                      <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Date</label>
                      <input type="text" placeholder="e.g. Mar 10-14, 2026" className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`} />
                    </div>
                    <div>
                      <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Venue</label>
                      <input type="text" placeholder="e.g. School Ground" className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`} />
                    </div>
                    <button onClick={() => { alert('Competition created! (Blueprint demo)'); setShowCreateCompetition(false); }} className={`w-full text-xs py-2.5 rounded-xl ${theme.primary} text-white font-bold`}>
                      Create Competition
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── EQUIPMENT MANAGEMENT MODULE ──────────────── */}
        {activeModule === 'equipment' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className={`text-lg font-bold ${theme.highlight}`}>Equipment Management</h2>
              <div className="flex items-center gap-2">
                <button onClick={() => alert('Damage report submitted (Blueprint demo)')} className={`text-[10px] px-3 py-1.5 rounded-lg ${theme.secondaryBg} ${theme.iconColor} font-bold flex items-center gap-1`}>
                  <AlertTriangle size={10} /> Report Damage
                </button>
                <button onClick={() => setShowAddEquipment(true)} className={`text-[10px] px-3 py-1.5 rounded-lg ${theme.primary} text-white font-bold flex items-center gap-1`}>
                  <Plus size={10} /> Add Equipment
                </button>
              </div>
            </div>

            <TabBar tabs={['Inventory', 'Maintenance Log', 'Budget']} active={equipmentTab} onChange={setEquipmentTab} theme={theme} />

            {/* Low Stock Alerts */}
            {equipmentTab === 'Inventory' && (
              <>
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-amber-50 border border-amber-200">
                  <AlertTriangle size={16} className="text-amber-600 shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-bold text-amber-800">Low Stock Alert</p>
                    <p className="text-[10px] text-amber-600">Shuttlecocks (2 boxes remaining), High Jump Pole needs replacement</p>
                  </div>
                </div>

                <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
                  <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Equipment Inventory</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className={`border-b ${theme.border}`}>
                          {['Item', 'Category', 'Qty', 'Condition', 'Location', 'Last Checked'].map(h => (
                            <th key={h} className={`text-left py-2 px-3 ${theme.iconColor} font-bold`}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {mockEquipment.map((eq, i) => (
                          <tr key={i} className={`border-b ${theme.border} ${theme.buttonHover}`}>
                            <td className={`py-2.5 px-3 font-bold ${theme.highlight}`}>{eq.item}</td>
                            <td className={`py-2.5 px-3`}>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold bg-blue-100 text-blue-700`}>{eq.category}</span>
                            </td>
                            <td className={`py-2.5 px-3 font-bold ${theme.highlight}`}>{eq.quantity}</td>
                            <td className="py-2.5 px-3">
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                eq.condition === 'Good' ? 'bg-emerald-100 text-emerald-700' : eq.condition === 'Fair' ? 'bg-amber-100 text-amber-700' : eq.condition === 'Poor' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                              }`}>{eq.condition}</span>
                            </td>
                            <td className={`py-2.5 px-3 ${theme.iconColor}`}>{eq.location}</td>
                            <td className={`py-2.5 px-3 ${theme.iconColor}`}>{eq.lastChecked}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {equipmentTab === 'Maintenance Log' && (
              <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
                <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Maintenance Log</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className={`border-b ${theme.border}`}>
                        {['Item', 'Issue', 'Reported Date', 'Status', 'Cost'].map(h => (
                          <th key={h} className={`text-left py-2 px-3 ${theme.iconColor} font-bold`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {mockMaintenanceLog.map((m, i) => (
                        <tr key={i} className={`border-b ${theme.border} ${theme.buttonHover}`}>
                          <td className={`py-2.5 px-3 font-bold ${theme.highlight}`}>{m.item}</td>
                          <td className={`py-2.5 px-3 ${theme.iconColor}`}>{m.issue}</td>
                          <td className={`py-2.5 px-3 ${theme.iconColor}`}>{m.reportedDate}</td>
                          <td className="py-2.5 px-3">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                              m.status === 'Fixed' ? 'bg-emerald-100 text-emerald-700' : m.status === 'In Repair' ? 'bg-blue-100 text-blue-700' : m.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                            }`}>{m.status}</span>
                          </td>
                          <td className={`py-2.5 px-3 ${theme.iconColor}`}>{m.cost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {equipmentTab === 'Budget' && (
              <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
                <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Annual Equipment Budget — 2025-26</h3>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className={`${theme.secondaryBg} rounded-xl p-4 border ${theme.border} text-center`}>
                    <p className={`text-[10px] ${theme.iconColor}`}>Total Budget</p>
                    <p className={`text-lg font-bold ${theme.highlight}`}>₹2,50,000</p>
                  </div>
                  <div className={`${theme.secondaryBg} rounded-xl p-4 border ${theme.border} text-center`}>
                    <p className={`text-[10px] ${theme.iconColor}`}>Spent</p>
                    <p className="text-lg font-bold text-amber-600">₹1,65,000</p>
                  </div>
                  <div className={`${theme.secondaryBg} rounded-xl p-4 border ${theme.border} text-center`}>
                    <p className={`text-[10px] ${theme.iconColor}`}>Remaining</p>
                    <p className="text-lg font-bold text-emerald-600">₹85,000</p>
                  </div>
                </div>
                <div className={`h-3 rounded-full ${theme.secondaryBg} border ${theme.border} mb-2`}>
                  <div className="h-full rounded-full bg-amber-500" style={{ width: '66%' }} />
                </div>
                <p className={`text-[10px] ${theme.iconColor} text-right`}>66% utilized</p>
                <div className="mt-4 space-y-2">
                  {[
                    { category: 'Cricket', spent: '₹45,000', pct: 27 },
                    { category: 'Athletics', spent: '₹35,000', pct: 21 },
                    { category: 'Basketball', spent: '₹25,000', pct: 15 },
                    { category: 'Badminton', spent: '₹20,000', pct: 12 },
                    { category: 'Swimming', spent: '₹18,000', pct: 11 },
                    { category: 'Others', spent: '₹22,000', pct: 14 },
                  ].map((c, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className={`text-[10px] w-20 ${theme.iconColor}`}>{c.category}</span>
                      <div className={`flex-1 h-2 rounded-full ${theme.secondaryBg}`}>
                        <div className="h-full rounded-full bg-blue-500" style={{ width: `${c.pct}%` }} />
                      </div>
                      <span className={`text-[10px] font-bold ${theme.highlight} w-16 text-right`}>{c.spent}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add Equipment Modal */}
            {showAddEquipment && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowAddEquipment(false)}>
                <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 w-full max-w-md shadow-xl`} onClick={e => e.stopPropagation()}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-sm font-bold ${theme.highlight}`}>Add Equipment</h3>
                    <button onClick={() => setShowAddEquipment(false)} className={`p-1 rounded-lg ${theme.buttonHover} ${theme.iconColor}`}><X size={14} /></button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Item Name</label>
                      <input type="text" placeholder="e.g. Football" className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`} />
                    </div>
                    <div>
                      <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Category</label>
                      <select className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`}>
                        {['Cricket', 'Football', 'Basketball', 'Badminton', 'Athletics', 'Yoga', 'Swimming', 'Gym'].map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Quantity</label>
                      <input type="number" defaultValue={1} className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`} />
                    </div>
                    <div>
                      <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Location</label>
                      <input type="text" placeholder="e.g. Sports Room A" className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`} />
                    </div>
                    <button onClick={() => { alert('Equipment added! (Blueprint demo)'); setShowAddEquipment(false); }} className={`w-full text-xs py-2.5 rounded-xl ${theme.primary} text-white font-bold`}>
                      Add Equipment
                    </button>
                  </div>
                </div>
              </div>
            )}
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
