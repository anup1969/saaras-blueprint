'use client';
import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

export default function AlumniConfigModule({ theme }: { theme: Theme }) {
  const [selfRegistration, setSelfRegistration] = useState(true);
  const [donationModule, setDonationModule] = useState(false);
  const [jobBoard, setJobBoard] = useState(false);
  const [eventInvitations, setEventInvitations] = useState(true);
  const [directoryAccess, setDirectoryAccess] = useState(true);

  // ─── Mentorship ───
  const [enableMentorship, setEnableMentorship] = useState(true);

  // ─── Mock data ───
  const [alumniDirectory] = useState([
    { name: 'Rajesh Mehta', batch: '1995-97', year: '1997', role: 'CTO, Infosys', city: 'Bangalore', status: 'Active' },
    { name: 'Priya Kapoor', batch: '1998-00', year: '2000', role: 'Doctor, AIIMS', city: 'Delhi', status: 'Active' },
    { name: 'Sanjay Verma', batch: '2000-02', year: '2002', role: 'IAS Officer', city: 'Lucknow', status: 'Active' },
    { name: 'Anita Shah', batch: '2003-05', year: '2005', role: 'Entrepreneur', city: 'Mumbai', status: 'Active' },
    { name: 'Vikram Singh', batch: '2005-07', year: '2007', role: 'Lawyer, Supreme Court', city: 'Delhi', status: 'Inactive' },
    { name: 'Neha Gupta', batch: '2010-12', year: '2012', role: 'Data Scientist, Google', city: 'Hyderabad', status: 'Active' },
  ]);
  const [events] = useState([
    { name: 'Silver Jubilee Reunion', date: 'Mar 15, 2026', rsvps: 45, venue: 'School Auditorium', maxCapacity: 200 },
    { name: 'Annual Alumni Meet 2026', date: 'Jun 20, 2026', rsvps: 120, venue: 'Taj Convention Centre', maxCapacity: 300 },
    { name: 'Career Day — Alumni Talk', date: 'Apr 5, 2026', rsvps: 18, venue: 'School Hall', maxCapacity: 100 },
  ]);
  const [donations] = useState([
    { donor: 'Rajesh Mehta', amount: '5,00,000', date: 'Jan 15, 2026', purpose: 'Computer Lab', receipt: 'RCT-001' },
    { donor: 'Priya Kapoor', amount: '2,00,000', date: 'Feb 2, 2026', purpose: 'Library Fund', receipt: 'RCT-002' },
    { donor: 'Anita Shah', amount: '3,45,000', date: 'Feb 10, 2026', purpose: 'Scholarship Fund', receipt: 'RCT-003' },
    { donor: 'Alumni Association', amount: '2,00,000', date: 'Jan 28, 2026', purpose: 'Sports Equipment', receipt: 'RCT-004' },
  ]);
  const [mentorPairs] = useState([
    { mentor: 'Rajesh Mehta', student: 'Aarav Sharma (12-A)', area: 'Computer Science', status: 'Active' },
    { mentor: 'Priya Kapoor', student: 'Diya Patel (11-B)', area: 'Medical Sciences', status: 'Active' },
    { mentor: 'Sanjay Verma', student: 'Rohan Kumar (12-B)', area: 'Civil Services', status: 'Pending' },
  ]);

  return (
    <div className="space-y-4">
      <ModuleHeader title="Alumni Configuration" subtitle="Manage alumni engagement portal features" theme={theme} />

      <SectionCard title="Alumni Portal Features" subtitle="Features available to school alumni through the alumni engagement portal" theme={theme}>
        <div className="space-y-2">
          {[
            { label: 'Self-registration portal', desc: 'Alumni can sign up themselves through a public registration page — no admin action needed', value: selfRegistration, setter: setSelfRegistration },
            { label: 'Donation module', desc: 'Alumni can make monetary contributions to the school through a secure online form', value: donationModule, setter: setDonationModule },
            { label: 'Job board', desc: 'Alumni can post job openings and current students/alumni can view and apply', value: jobBoard, setter: setJobBoard },
            { label: 'Event invitations', desc: 'School can invite alumni to reunions, annual days, and special events via the portal', value: eventInvitations, setter: setEventInvitations },
            { label: 'Directory access', desc: 'Alumni can browse the alumni directory to reconnect with batchmates and seniors', value: directoryAccess, setter: setDirectoryAccess },
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

      {/* ─── A) Alumni Directory Preview ─── */}
      <SectionCard title="Alumni Directory Preview" subtitle="Browse and search alumni records" theme={theme}>
        <div className={`flex items-center gap-2 mb-3`}>
          <div className={`flex items-center gap-2 flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg}`}>
            <Search size={14} className={theme.iconColor} />
            <input placeholder="Search alumni by name, batch, or city..." className={`flex-1 bg-transparent text-xs ${theme.highlight} outline-none`} />
          </div>
          <select className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
            <option>All Batches</option>
            <option>1995-97</option>
            <option>1998-00</option>
            <option>2000-02</option>
            <option>2003-05</option>
            <option>2005-07</option>
            <option>2010-12</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Name', 'Batch', 'Year', 'Current Role', 'City', 'Status'].map(h => (
                <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {alumniDirectory.map((a, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{a.name}</td>
                  <td className={`px-3 py-2 ${theme.iconColor}`}>{a.batch}</td>
                  <td className={`px-3 py-2 ${theme.iconColor}`}>{a.year}</td>
                  <td className={`px-3 py-2 ${theme.highlight}`}>{a.role}</td>
                  <td className={`px-3 py-2 ${theme.iconColor}`}>{a.city}</td>
                  <td className="px-3 py-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${a.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>{a.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* ─── B) Alumni Events ─── */}
      <SectionCard title="Alumni Events" subtitle="Reunions, meets, and engagement events" theme={theme}>
        <div className="grid grid-cols-3 gap-3 mb-3">
          {events.map((e, i) => (
            <div key={i} className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-xs font-bold ${theme.highlight} mb-1`}>{e.name}</p>
              <p className={`text-[10px] ${theme.iconColor} mb-0.5`}>{e.date}</p>
              <p className={`text-[10px] ${theme.iconColor} mb-1`}>{e.venue}</p>
              <div className="flex items-center justify-between">
                <span className={`px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold`}>{e.rsvps} RSVPs</span>
                <span className={`text-[9px] ${theme.iconColor}`}>Max: {e.maxCapacity}</span>
              </div>
            </div>
          ))}
        </div>
        <button className={`flex items-center gap-1.5 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl border ${theme.border}`}>
          <Plus size={12} /> Create Event
        </button>
      </SectionCard>

      {/* ─── C) Contribution Tracker ─── */}
      <SectionCard title="Contribution Tracker" subtitle="Track alumni donations and contributions" theme={theme}>
        <div className="grid grid-cols-3 gap-3 mb-3">
          {[
            { label: 'Total Collected', value: '\u20B912,45,000', color: 'text-emerald-600' },
            { label: 'Contributors', value: '34', color: 'text-blue-600' },
            { label: 'Average', value: '\u20B936,600', color: 'text-purple-600' },
          ].map((s, i) => (
            <div key={i} className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
              <p className={`text-[10px] ${theme.iconColor} mb-1`}>{s.label}</p>
              <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Donor', 'Amount (\u20B9)', 'Date', 'Purpose', 'Receipt'].map(h => (
                <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {donations.map((d, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{d.donor}</td>
                  <td className={`px-3 py-2 ${theme.highlight}`}>{d.amount}</td>
                  <td className={`px-3 py-2 ${theme.iconColor}`}>{d.date}</td>
                  <td className={`px-3 py-2 ${theme.iconColor}`}>{d.purpose}</td>
                  <td className="px-3 py-2">
                    <span className={`text-[10px] text-blue-500 font-bold`}>{d.receipt}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* ─── D) Mentorship Program ─── */}
      <SectionCard title="Mentorship Program" subtitle="Connect alumni mentors with current students" theme={theme}>
        <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg} mb-3`}>
          <div>
            <p className={`text-xs font-bold ${theme.highlight}`}>Enable Alumni-Student Mentorship</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Allow alumni to mentor current students in their area of expertise</p>
          </div>
          <SSAToggle on={enableMentorship} onChange={() => setEnableMentorship(!enableMentorship)} theme={theme} />
        </div>
        {enableMentorship && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead><tr className={theme.secondaryBg}>
                {['Alumni Mentor', 'Student', 'Subject Area', 'Status'].map(h => (
                  <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor}`}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {mentorPairs.map((m, i) => (
                  <tr key={i} className={`border-t ${theme.border}`}>
                    <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{m.mentor}</td>
                    <td className={`px-3 py-2 ${theme.highlight}`}>{m.student}</td>
                    <td className={`px-3 py-2 ${theme.iconColor}`}>{m.area}</td>
                    <td className="px-3 py-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        m.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>{m.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>

      {/* ─── E) Engagement Summary ─── */}
      <SectionCard title="Engagement Summary" subtitle="Alumni engagement metrics and participation" theme={theme}>
        <div className="grid grid-cols-3 gap-3 mb-3">
          {[
            { label: 'Active Alumni', value: '45%', color: 'text-emerald-600' },
            { label: 'Event Attendance', value: '62%', color: 'text-blue-600' },
            { label: 'Contributing', value: '28%', color: 'text-purple-600' },
          ].map((s, i) => (
            <div key={i} className={`p-3 rounded-xl ${theme.secondaryBg} text-center`}>
              <p className={`text-[10px] ${theme.iconColor} mb-1`}>{s.label}</p>
              <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
        <div className={`p-3 rounded-xl ${theme.accentBg} border ${theme.border}`}>
          <p className={`text-[10px] font-bold ${theme.iconColor} mb-2 uppercase tracking-wide`}>Engagement by Batch Year</p>
          <div className="flex items-end gap-2 h-24">
            {[
              { batch: '1995', pct: 30 },
              { batch: '2000', pct: 45 },
              { batch: '2005', pct: 55 },
              { batch: '2010', pct: 70 },
              { batch: '2015', pct: 85 },
              { batch: '2020', pct: 60 },
            ].map((b, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div className={`w-full rounded-t-lg ${theme.primary}`} style={{ height: `${b.pct}%` }} />
                <span className={`text-[8px] mt-1 ${theme.iconColor}`}>{b.batch}</span>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
