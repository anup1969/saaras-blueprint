'use client';

import React, { useState, useEffect } from 'react';
import { type Theme } from '@/lib/themes';
import { StatCard, Toggle } from '@/components/shared';
import {
  Building2, GraduationCap, Users, Shield, MessageSquare,
  Banknote, Briefcase, Bus, Check, ChevronRight, ChevronLeft, Save, Rocket,
  Upload, Plus, X, Eye, AlertTriangle, CheckCircle, Lock, Circle,
  Layers, ArrowRight, Download, Megaphone, Clock
} from 'lucide-react';

// ─── WIZARD STEPS ─────────────────────────────────────
const steps = [
  { id: 1, label: 'School Identity', icon: Building2, short: 'Identity' },
  { id: 2, label: 'Academic Structure', icon: GraduationCap, short: 'Academic' },
  { id: 3, label: 'Plan & Modules', icon: Layers, short: 'Modules' },
  { id: 4, label: 'Roles & Permissions', icon: Shield, short: 'Roles' },
  { id: 5, label: 'Communication', icon: MessageSquare, short: 'Chat' },
  { id: 6, label: 'Fee Structure', icon: Banknote, short: 'Fees' },
  { id: 7, label: 'HR & Staff', icon: Briefcase, short: 'HR' },
  { id: 8, label: 'Transport', icon: Bus, short: 'Transport' },
  { id: 9, label: 'Review & Launch', icon: Rocket, short: 'Launch' },
];

// ─── HELPER COMPONENTS ────────────────────────────────
function FormField({ label, placeholder, value, type, theme, required, hint, onChange }: {
  label: string; placeholder?: string; value?: string; type?: string; theme: Theme; required?: boolean; hint?: string; onChange?: (v: string) => void;
}) {
  return (
    <div>
      <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type || 'text'}
        defaultValue={value}
        placeholder={placeholder}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className={`w-full px-4 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-slate-300 ${theme.highlight}`}
      />
      {hint && <p className={`text-[10px] ${theme.iconColor} mt-1`}>{hint}</p>}
    </div>
  );
}

function SelectField({ label, options, value, theme, required, hint, onChange }: {
  label: string; options: string[]; value?: string; theme: Theme; required?: boolean; hint?: string; onChange?: (v: string) => void;
}) {
  return (
    <div>
      {label && <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>}
      <select defaultValue={value} onChange={onChange ? (e) => onChange(e.target.value) : undefined} className={`w-full px-4 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none ${theme.highlight}`}>
        <option value="">Select...</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      {hint && <p className={`text-[10px] ${theme.iconColor} mt-1`}>{hint}</p>}
    </div>
  );
}

function SectionTitle({ title, subtitle, theme }: { title: string; subtitle?: string; theme: Theme }) {
  return (
    <div className="mb-4">
      <h3 className={`text-sm font-bold ${theme.highlight}`}>{title}</h3>
      {subtitle && <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>{subtitle}</p>}
    </div>
  );
}

// ─── STEP 1: SCHOOL IDENTITY ──────────────────────────
function Step1Identity({ theme }: { theme: Theme }) {
  return (
    <div className="space-y-6">
      <SectionTitle title="School Basic Information" subtitle="Collected from school management during onboarding call" theme={theme} />

      <div className="flex gap-4">
        <div className={`w-24 h-24 rounded-2xl border-2 border-dashed ${theme.border} flex flex-col items-center justify-center cursor-pointer ${theme.buttonHover}`}>
          <Upload size={20} className={theme.iconColor} />
          <span className={`text-[10px] ${theme.iconColor} mt-1`}>Logo</span>
        </div>
        <div className="flex-1 space-y-3">
          <FormField label="School Name" placeholder="e.g. Delhi Public School, Ahmedabad" theme={theme} required />
          <FormField label="Short Name / Abbreviation" placeholder="e.g. DPS Ahmedabad" theme={theme} hint="Used in reports, receipts, SMS" />
        </div>
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-3`}>
        <SectionTitle title="Address & Contact" theme={theme} />
        <FormField label="Address Line 1" placeholder="Building/Campus name, Street" theme={theme} required />
        <div className="grid grid-cols-3 gap-3">
          <FormField label="City" placeholder="Ahmedabad" theme={theme} required />
          <SelectField label="State" options={['Gujarat', 'Maharashtra', 'Rajasthan', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Uttar Pradesh', 'Other']} theme={theme} required />
          <FormField label="PIN Code" placeholder="380015" type="number" theme={theme} required />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <FormField label="Phone" placeholder="+91 79 XXXX XXXX" theme={theme} required />
          <FormField label="Email" placeholder="info@school.edu" type="email" theme={theme} required />
          <FormField label="Website" placeholder="www.school.edu" theme={theme} />
        </div>
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-3`}>
        <SectionTitle title="Board & School Type" theme={theme} />
        <div className="grid grid-cols-2 gap-3">
          <SelectField label="Board Affiliation" options={['CBSE', 'ICSE / ISC', 'State Board (Gujarat)', 'State Board (Maharashtra)', 'IB (International Baccalaureate)', 'Cambridge (IGCSE)', 'Multiple Boards']} value="CBSE" theme={theme} required />
          <FormField label="Affiliation Number" placeholder="e.g. 430126" theme={theme} hint="CBSE/ICSE affiliation ID" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <SelectField label="School Type" options={['K-12 (Nursery to 12th)', 'K-10 (Nursery to 10th)', 'K-8 (Nursery to 8th)', '1-12 (No Pre-primary)', '6-12 (Secondary + Higher)', '11-12 (Higher Secondary only)', 'Custom']} value="K-12 (Nursery to 12th)" theme={theme} required />
          <SelectField label="Medium of Instruction" options={['English Medium', 'Hindi Medium', 'Gujarati Medium', 'Bilingual (English + Hindi)', 'Bilingual (English + Gujarati)', 'Trilingual', 'Other']} value="English Medium" theme={theme} required />
          <SelectField label="School Category" options={['Co-educational', 'Boys Only', 'Girls Only']} value="Co-educational" theme={theme} required />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <SelectField label="Academic Year" options={['April - March', 'June - May', 'January - December']} value="April - March" theme={theme} required hint="When does your academic year start?" />
          <FormField label="Year of Establishment" placeholder="e.g. 1985" type="number" theme={theme} />
        </div>
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-3`}>
        <SectionTitle title="Key Contacts" subtitle="People SA will coordinate with during onboarding" theme={theme} />
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Principal Name" placeholder="Dr. Ramesh Patel" theme={theme} required />
          <FormField label="Principal Phone" placeholder="+91 98765 XXXXX" theme={theme} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="School Admin / IT Contact" placeholder="Name" theme={theme} />
          <FormField label="Admin Phone / Email" placeholder="+91 98765 XXXXX" theme={theme} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Trust / Management Contact" placeholder="Chairman / Secretary name" theme={theme} />
          <FormField label="Trust Phone" placeholder="+91 98765 XXXXX" theme={theme} />
        </div>
      </div>
    </div>
  );
}

// ─── HOUSE COLOR PALETTE ──────────────────────────────
const HOUSE_COLOR_PALETTE = [
  { label: 'Red', bg: 'bg-red-500', ring: 'ring-red-300' },
  { label: 'Blue', bg: 'bg-blue-500', ring: 'ring-blue-300' },
  { label: 'Green', bg: 'bg-emerald-500', ring: 'ring-emerald-300' },
  { label: 'Yellow', bg: 'bg-amber-500', ring: 'ring-amber-300' },
  { label: 'Purple', bg: 'bg-purple-500', ring: 'ring-purple-300' },
  { label: 'Orange', bg: 'bg-orange-500', ring: 'ring-orange-300' },
  { label: 'Pink', bg: 'bg-pink-500', ring: 'ring-pink-300' },
  { label: 'Teal', bg: 'bg-teal-500', ring: 'ring-teal-300' },
  { label: 'Indigo', bg: 'bg-indigo-500', ring: 'ring-indigo-300' },
  { label: 'Cyan', bg: 'bg-cyan-500', ring: 'ring-cyan-300' },
];

type HouseEntry = { id: string; name: string; colorIndex: number; mascot: string };
type ShiftEntry = { id: string; name: string; startTime: string; endTime: string; periods: number; periodDuration: number };

// ─── STEP 2: ACADEMIC STRUCTURE ───────────────────────
function Step2Academic({ theme }: { theme: Theme }) {
  const [classes, setClasses] = useState<Record<string, boolean>>({
    'Nursery': true, 'LKG': true, 'UKG': true,
    'Class 1': true, 'Class 2': true, 'Class 3': true, 'Class 4': true, 'Class 5': true,
    'Class 6': true, 'Class 7': true, 'Class 8': true, 'Class 9': true, 'Class 10': true,
    'Class 11': true, 'Class 12': true,
  });
  const [streams, setStreams] = useState<Record<string, boolean>>({ 'Science': true, 'Commerce': true, 'Arts / Humanities': false });
  const [houseEnabled, setHouseEnabled] = useState(true);

  // State-managed sections per class range
  const [sections, setSections] = useState<Record<string, string[]>>({
    'Nursery - UKG': ['A', 'B'],
    'Class 1 - 5': ['A', 'B', 'C'],
    'Class 6 - 8': ['A', 'B', 'C'],
    'Class 9 - 10': ['A', 'B'],
    'Class 11 - 12': ['Sci', 'Com', 'Arts'],
  });

  const sectionStudents: Record<string, string> = {
    'Nursery - UKG': '~30 per section',
    'Class 1 - 5': '~35 per section',
    'Class 6 - 8': '~40 per section',
    'Class 9 - 10': '~42 per section',
    'Class 11 - 12': '~40 per section',
  };

  const addSection = (range: string) => {
    const name = window.prompt(`Enter new section name for ${range}:`);
    if (name && name.trim()) {
      const trimmed = name.trim();
      setSections(prev => {
        const current = prev[range] || [];
        if (current.includes(trimmed)) {
          window.alert(`Section "${trimmed}" already exists in ${range}.`);
          return prev;
        }
        return { ...prev, [range]: [...current, trimmed] };
      });
    }
  };

  const removeSection = (range: string, sectionName: string) => {
    setSections(prev => {
      const current = prev[range] || [];
      if (current.length <= 1) {
        window.alert('Each class range must have at least 1 section.');
        return prev;
      }
      return { ...prev, [range]: current.filter(s => s !== sectionName) };
    });
  };

  // State-managed house system
  const [houses, setHouses] = useState<HouseEntry[]>([
    { id: 'h1', name: 'Red House', colorIndex: 0, mascot: '' },
    { id: 'h2', name: 'Blue House', colorIndex: 1, mascot: '' },
    { id: 'h3', name: 'Green House', colorIndex: 2, mascot: '' },
    { id: 'h4', name: 'Yellow House', colorIndex: 3, mascot: '' },
  ]);
  const [colorPickerOpen, setColorPickerOpen] = useState<string | null>(null);

  // State-managed shifts
  const [workingDays, setWorkingDays] = useState('Monday - Saturday');
  const [shifts, setShifts] = useState<ShiftEntry[]>([
    { id: 's1', name: 'Pre-Primary', startTime: '08:00', endTime: '12:00', periods: 5, periodDuration: 35 },
    { id: 's2', name: 'Primary', startTime: '08:00', endTime: '14:00', periods: 7, periodDuration: 40 },
    { id: 's3', name: 'Secondary', startTime: '08:00', endTime: '14:30', periods: 8, periodDuration: 40 },
  ]);

  const addShift = () => {
    const name = window.prompt('Enter shift name (e.g. Pre-Primary Morning, Senior Afternoon):');
    if (name && name.trim()) {
      setShifts(prev => [...prev, { id: `s${Date.now()}`, name: name.trim(), startTime: '08:00', endTime: '14:00', periods: 7, periodDuration: 40 }]);
    }
  };

  const removeShift = (id: string) => {
    if (shifts.length <= 1) {
      window.alert('At least one shift is required.');
      return;
    }
    setShifts(prev => prev.filter(s => s.id !== id));
  };

  const updateShift = (id: string, field: keyof ShiftEntry, value: string | number) => {
    setShifts(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const addHouse = () => {
    const newId = `h${Date.now()}`;
    // Pick the first color not already in use, or default to 0
    const usedColors = houses.map(h => h.colorIndex);
    const nextColor = HOUSE_COLOR_PALETTE.findIndex((_, i) => !usedColors.includes(i));
    setHouses(prev => [...prev, { id: newId, name: `House ${prev.length + 1}`, colorIndex: nextColor >= 0 ? nextColor : 0, mascot: '' }]);
  };

  const removeHouse = (id: string) => {
    if (houses.length <= 2) {
      window.alert('A minimum of 2 houses is required.');
      return;
    }
    setHouses(prev => prev.filter(h => h.id !== id));
  };

  const updateHouse = (id: string, field: keyof HouseEntry, value: string | number) => {
    setHouses(prev => prev.map(h => h.id === id ? { ...h, [field]: value } : h));
  };

  return (
    <div className="space-y-6">
      <SectionTitle title="Academic Structure" subtitle="Define classes, sections, streams, and house system" theme={theme} />

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <SectionTitle title="Classes / Grades Offered" subtitle="Click to toggle" theme={theme} />
        <div className="grid grid-cols-5 gap-2">
          {Object.entries(classes).map(([name, checked]) => (
            <button key={name} onClick={() => setClasses(p => ({ ...p, [name]: !p[name] }))}
              className={`flex items-center gap-2 p-2.5 rounded-xl border ${checked ? 'border-emerald-300 bg-emerald-50' : `${theme.border}`} cursor-pointer transition-all`}>
              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${checked ? 'bg-emerald-500 border-emerald-500' : theme.border}`}>
                {checked && <Check size={10} className="text-white" />}
              </div>
              <span className={`text-xs font-medium ${theme.highlight}`}>{name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <SectionTitle title="Sections per Class" subtitle="How many sections does each class have?" theme={theme} />
        <div className="space-y-2">
          {Object.entries(sections).map(([range, sectionList]) => (
            <div key={range} className={`flex items-center gap-4 p-3 rounded-xl ${theme.secondaryBg}`}>
              <span className={`text-xs font-bold ${theme.highlight} w-32`}>{range}</span>
              <div className="flex gap-1 flex-wrap">
                {sectionList.map(s => (
                  <span key={s} className={`text-[10px] px-2.5 py-1 rounded-lg ${theme.primary} text-white font-bold flex items-center gap-1`}>
                    {s}
                    <button onClick={() => removeSection(range, s)} title={`Remove section ${s}`}>
                      <X size={8} className="cursor-pointer opacity-70 hover:opacity-100" />
                    </button>
                  </span>
                ))}
                <button
                  onClick={() => addSection(range)}
                  className={`text-[10px] px-2 py-1 rounded-lg border ${theme.border} ${theme.iconColor} hover:bg-slate-100 transition-colors`}
                  title="Add new section"
                >
                  <Plus size={10} />
                </button>
              </div>
              <span className={`text-[10px] ${theme.iconColor} ml-auto whitespace-nowrap`}>{sectionStudents[range]}</span>
            </div>
          ))}
        </div>
        <p className={`text-[10px] ${theme.iconColor} mt-2`}>
          <Lock size={10} className="inline mr-1 text-amber-500" />
          <strong>Note:</strong> In the live system, only Principals and School Admins can add/modify sections.
        </p>
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <SectionTitle title="Streams (Class 11-12)" subtitle="Click to toggle" theme={theme} />
        <div className="grid grid-cols-3 gap-3">
          {[
            { stream: 'Science', subjects: 'Physics, Chemistry, Maths/Bio' },
            { stream: 'Commerce', subjects: 'Accounts, Economics, Business Studies' },
            { stream: 'Arts / Humanities', subjects: 'History, Geography, Political Science' },
          ].map(s => (
            <button key={s.stream} onClick={() => setStreams(p => ({ ...p, [s.stream]: !p[s.stream] }))}
              className={`p-4 rounded-xl border-2 cursor-pointer text-left transition-all ${streams[s.stream] ? 'border-emerald-300 bg-emerald-50' : `${theme.border} ${theme.cardBg}`}`}>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${streams[s.stream] ? 'bg-emerald-500 border-emerald-500' : theme.border}`}>
                  {streams[s.stream] && <Check size={10} className="text-white" />}
                </div>
                <span className={`text-sm font-bold ${theme.highlight}`}>{s.stream}</span>
              </div>
              <p className={`text-[10px] ${theme.iconColor}`}>{s.subjects}</p>
            </button>
          ))}
        </div>
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center justify-between mb-3">
          <SectionTitle title="House System" subtitle="Inter-house competitions, groups, points" theme={theme} />
          <Toggle on={houseEnabled} onChange={() => setHouseEnabled(!houseEnabled)} theme={theme} />
        </div>
        {houseEnabled && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {houses.map(h => {
                const paletteColor = HOUSE_COLOR_PALETTE[h.colorIndex] || HOUSE_COLOR_PALETTE[0];
                return (
                  <div key={h.id} className={`p-3 rounded-xl ${theme.secondaryBg} relative`}>
                    {/* Remove button */}
                    <button
                      onClick={() => removeHouse(h.id)}
                      className={`absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center ${theme.border} border hover:bg-red-100 transition-colors`}
                      title="Remove house"
                    >
                      <X size={10} className="text-red-500" />
                    </button>

                    {/* Color circle — click to open palette */}
                    <div className="relative flex justify-center mb-2">
                      <button
                        onClick={() => setColorPickerOpen(colorPickerOpen === h.id ? null : h.id)}
                        className={`w-10 h-10 rounded-full ${paletteColor.bg} cursor-pointer ring-2 ring-offset-2 ${colorPickerOpen === h.id ? paletteColor.ring : 'ring-transparent'} transition-all`}
                        title="Click to change color"
                      />
                      {/* Color palette dropdown */}
                      {colorPickerOpen === h.id && (
                        <div className={`absolute top-12 z-10 ${theme.cardBg} border ${theme.border} rounded-xl p-2 shadow-lg flex flex-wrap gap-1.5 w-40`}>
                          {HOUSE_COLOR_PALETTE.map((pc, idx) => (
                            <button
                              key={pc.label}
                              onClick={() => { updateHouse(h.id, 'colorIndex', idx); setColorPickerOpen(null); }}
                              className={`w-6 h-6 rounded-full ${pc.bg} cursor-pointer ${h.colorIndex === idx ? `ring-2 ring-offset-1 ${pc.ring}` : ''} hover:scale-110 transition-transform`}
                              title={pc.label}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* House name input */}
                    <input
                      value={h.name}
                      onChange={(e) => updateHouse(h.id, 'name', e.target.value)}
                      className={`w-full text-center text-xs font-bold ${theme.highlight} bg-transparent outline-none border-b ${theme.border} pb-1 mb-2 focus:border-blue-400`}
                      placeholder="House name"
                    />

                    {/* Mascot input */}
                    <input
                      value={h.mascot}
                      onChange={(e) => updateHouse(h.id, 'mascot', e.target.value)}
                      className={`w-full text-center text-[10px] ${theme.iconColor} bg-transparent outline-none border-b ${theme.border} pb-1 focus:border-blue-400`}
                      placeholder="Mascot / Logo name"
                    />
                  </div>
                );
              })}

              {/* Add new house button */}
              <button
                onClick={addHouse}
                className={`p-3 rounded-xl border-2 border-dashed ${theme.border} flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-50 transition-colors min-h-[120px]`}
              >
                <Plus size={20} className={theme.iconColor} />
                <span className={`text-[10px] font-bold ${theme.iconColor}`}>Add House</span>
              </button>
            </div>
            <p className={`text-[10px] ${theme.iconColor} mt-2`}>
              {houses.length} house{houses.length !== 1 ? 's' : ''} configured. Names, colors, and mascots are editable. Students will be auto-assigned or manually grouped.
            </p>
          </>
        )}
        {!houseEnabled && (
          <p className={`text-[10px] ${theme.iconColor} mt-2`}>House system is disabled. Toggle on to configure houses.</p>
        )}
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <SectionTitle title="School Timings & Shifts" subtitle="Schools can have multiple shifts — e.g. Pre-Primary, Primary, Secondary with different timings" theme={theme} />
        <div className="mb-4">
          <SelectField label="Working Days (applies to all shifts)" options={['Monday - Friday', 'Monday - Saturday', 'Custom']} value={workingDays} onChange={setWorkingDays} theme={theme} required />
        </div>

        <div className="space-y-3">
          {shifts.map((shift, idx) => (
            <div key={shift.id} className={`p-4 rounded-xl ${theme.secondaryBg} relative`}>
              <button
                onClick={() => removeShift(shift.id)}
                className={`absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center border ${theme.border} hover:bg-red-100 transition-colors`}
                title="Remove shift"
              >
                <X size={10} className="text-red-500" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <Clock size={14} className={theme.primaryText} />
                <span className={`text-xs font-bold ${theme.highlight}`}>Shift {idx + 1}</span>
              </div>

              <div className="grid grid-cols-5 gap-3">
                <div className="col-span-1">
                  <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>
                    Shift Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={shift.name}
                    onChange={(e) => updateShift(shift.id, 'name', e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs outline-none focus:ring-2 focus:ring-slate-300 ${theme.highlight}`}
                    placeholder="e.g. Pre-Primary"
                  />
                </div>
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Start Time</label>
                  <input
                    type="time"
                    value={shift.startTime}
                    onChange={(e) => updateShift(shift.id, 'startTime', e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs outline-none ${theme.highlight}`}
                  />
                </div>
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>End Time</label>
                  <input
                    type="time"
                    value={shift.endTime}
                    onChange={(e) => updateShift(shift.id, 'endTime', e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs outline-none ${theme.highlight}`}
                  />
                </div>
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Periods/Day</label>
                  <input
                    type="number"
                    value={shift.periods}
                    onChange={(e) => updateShift(shift.id, 'periods', parseInt(e.target.value) || 0)}
                    className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs outline-none ${theme.highlight}`}
                  />
                </div>
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Period (mins)</label>
                  <input
                    type="number"
                    value={shift.periodDuration}
                    onChange={(e) => updateShift(shift.id, 'periodDuration', parseInt(e.target.value) || 0)}
                    className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs outline-none ${theme.highlight}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addShift}
          className={`w-full mt-3 flex items-center justify-center gap-2 p-2.5 rounded-xl border-2 border-dashed ${theme.border} ${theme.iconColor} text-xs font-bold hover:bg-slate-50 transition-colors`}
        >
          <Plus size={12} /> Add Shift
        </button>
        <p className={`text-[10px] ${theme.iconColor} mt-2`}>
          {shifts.length} shift{shifts.length !== 1 ? 's' : ''} configured. Each shift can have its own class range, timings, and period structure.
        </p>
      </div>
    </div>
  );
}

// ─── STEP 3: PLAN & MODULES ──────────────────────────
function Step3Modules({ theme }: { theme: Theme }) {
  const [selectedPlan, setSelectedPlan] = useState('enterprise');
  const [modules, setModules] = useState<Record<string, boolean>>({
    'Dashboard': true, 'Student Management': true, 'Staff Management': true, 'Fee Management': true,
    'Attendance': true, 'Timetable': true, 'Parent Portal': true, 'Student Portal': true,
    'Communication / Chat': true, 'Online Payment': true, 'Enquiry / Admission': true, 'Homework / Assignments': true,
    'Transport Management': true, 'Visitor Management': true, 'Library': true,
    'Examination & Report Cards': true, 'HR & Payroll': true, 'Leave Management': true, 'Certificates': true,
    'SQAAF / Quality Assessment': true, 'Inventory Management': false, 'Hostel Management': false,
    'Alumni Management': false, 'Advanced Analytics': true, 'Custom Reports Builder': true,
    'API Access': false, 'White Label Branding': true,
  });

  const plans = [
    { id: 'starter', name: 'Starter', price: '₹25,000/yr', modules: 12, color: 'bg-blue-500', desc: 'Small schools up to 1000 students' },
    { id: 'professional', name: 'Professional', price: '₹75,000/yr', modules: 18, color: 'bg-purple-500', desc: 'Mid-size schools up to 3000 students' },
    { id: 'enterprise', name: 'Enterprise', price: '₹1,50,000/yr', modules: 27, color: 'bg-amber-500', desc: 'Large schools, unlimited' },
  ];

  const coreModules = ['Dashboard', 'Student Management', 'Staff Management', 'Fee Management', 'Attendance', 'Timetable', 'Parent Portal', 'Student Portal', 'Communication / Chat', 'Online Payment', 'Enquiry / Admission', 'Homework / Assignments'];
  const proModules = ['Transport Management', 'Visitor Management', 'Library', 'Examination & Report Cards', 'HR & Payroll', 'Leave Management', 'Certificates'];
  const entModules = ['SQAAF / Quality Assessment', 'Inventory Management', 'Hostel Management', 'Alumni Management', 'Advanced Analytics', 'Custom Reports Builder', 'API Access', 'White Label Branding'];

  const toggleModule = (name: string) => {
    if (coreModules.includes(name)) return; // Core modules can't be toggled off
    setModules(p => ({ ...p, [name]: !p[name] }));
  };

  const enabledCount = Object.values(modules).filter(Boolean).length;

  const storageMap: Record<string, string> = { starter: '10 GB', professional: '25 GB', enterprise: '50 GB' };
  const studentMap: Record<string, string> = { starter: '1,000', professional: '3,000', enterprise: 'Unlimited' };
  const staffMap: Record<string, string> = { starter: '50', professional: '150', enterprise: 'Unlimited' };

  return (
    <div className="space-y-6">
      <SectionTitle title="Subscription Plan & Modules" subtitle="Select plan and customize module access" theme={theme} />

      <div className="grid grid-cols-3 gap-4">
        {plans.map(p => (
          <button key={p.id} onClick={() => setSelectedPlan(p.id)}
            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all text-left ${
              p.id === selectedPlan ? `border-amber-400 ${theme.cardBg} ring-2 ring-amber-200` : `${theme.border} ${theme.cardBg}`
            }`}>
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-3 h-3 rounded-full border-2 ${p.id === selectedPlan ? `${p.color} border-transparent` : theme.border}`} />
              <span className={`text-sm font-bold ${theme.highlight}`}>{p.name}</span>
              {p.id === selectedPlan && <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold">SELECTED</span>}
            </div>
            <p className={`text-lg font-bold ${theme.primaryText}`}>{p.price}</p>
            <p className={`text-[10px] ${theme.iconColor} mt-1`}>{p.desc}</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Up to {p.modules} modules</p>
          </button>
        ))}
      </div>

      {[
        { cat: 'Core (All Plans)', list: coreModules, locked: true },
        { cat: 'Professional+', list: proModules, locked: false },
        { cat: 'Enterprise Only', list: entModules, locked: false },
      ].map(cat => (
        <div key={cat.cat} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <SectionTitle title={cat.cat} theme={theme} />
          <div className="space-y-2">
            {cat.list.map(name => (
              <div key={name} className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex items-center gap-2">
                  {cat.locked && <Lock size={10} className={theme.iconColor} />}
                  <span className={`text-xs font-medium ${theme.highlight}`}>{name}</span>
                </div>
                <Toggle on={modules[name]} onChange={() => toggleModule(name)} theme={theme} />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <SectionTitle title="Storage & Limits" subtitle={`Based on ${plans.find(p => p.id === selectedPlan)?.name} plan`} theme={theme} />
        <div className="grid grid-cols-3 gap-3">
          <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-lg font-bold ${theme.highlight}`}>{storageMap[selectedPlan]}</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Total Storage</p>
          </div>
          <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-lg font-bold ${theme.highlight}`}>{studentMap[selectedPlan]}</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Students</p>
          </div>
          <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-lg font-bold ${theme.highlight}`}>{staffMap[selectedPlan]}</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Staff</p>
          </div>
        </div>
        <p className={`text-[10px] ${theme.iconColor} mt-2`}>{enabledCount} modules enabled</p>
      </div>
    </div>
  );
}

// ─── STEP 4: ROLES & PERMISSIONS ─────────────────────
function Step4Roles({ theme }: { theme: Theme }) {
  const [roles, setRoles] = useState<Record<string, boolean>>({
    'School Admin': true, 'Principal': true, 'Vice Principal': true, 'Teacher': true,
    'HR Manager': true, 'Accounts Head': true, 'Receptionist': true, 'Transport Head': true,
    'Security / Gatekeeper': true, 'Trustee': false, 'Librarian': false, 'Lab Coordinator': false,
  });
  const [hrAccess, setHrAccess] = useState<Record<string, boolean>>({
    'Principal': true, 'School Admin': true, 'Vice Principal': false, 'Trustee': true, 'Accounts Head': false,
  });

  const mandatoryRoles = ['School Admin', 'Principal', 'Teacher'];
  const roleDescs: Record<string, string> = {
    'School Admin': 'Central operations & configuration', 'Principal': 'Academic oversight & approvals',
    'Vice Principal': 'Substitutions, discipline, exams', 'Teacher': 'Attendance, homework, gradebook',
    'HR Manager': 'Employee lifecycle, payroll', 'Accounts Head': 'Fee collection, expenses',
    'Receptionist': 'Front desk, visitors, enquiries', 'Transport Head': 'Routes, vehicles, tracking',
    'Security / Gatekeeper': 'Gate, visitor check-in, pickup', 'Trustee': 'Governance, financials, compliance',
    'Librarian': 'Books, issuing, catalog', 'Lab Coordinator': 'Lab inventory, scheduling',
  };

  const toggleRole = (role: string) => {
    if (mandatoryRoles.includes(role)) return;
    setRoles(p => ({ ...p, [role]: !p[role] }));
  };

  return (
    <div className="space-y-6">
      <SectionTitle title="Stakeholder Roles & Permissions" subtitle="Activate dashboards and define approval workflows" theme={theme} />

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <SectionTitle title="Active Stakeholder Dashboards" subtitle="Which roles should have their own dashboard?" theme={theme} />
        <div className="space-y-2">
          {Object.entries(roles).map(([role, enabled]) => (
            <div key={role} className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold ${theme.highlight}`}>{role}</span>
                  {mandatoryRoles.includes(role) && <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-600 font-bold">Required</span>}
                </div>
                <p className={`text-[10px] ${theme.iconColor}`}>{roleDescs[role]}</p>
              </div>
              <Toggle on={enabled} onChange={() => toggleRole(role)} theme={theme} />
            </div>
          ))}
        </div>
        <p className={`text-[10px] ${theme.iconColor} mt-2`}>{Object.values(roles).filter(Boolean).length} dashboards active</p>
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <SectionTitle title="Approval Workflows" subtitle="Define who approves what — multiple stakeholders CAN share authority" theme={theme} />
        <div className={`p-2.5 rounded-xl border-2 border-dashed ${theme.border} mb-3`}>
          <p className={`text-[10px] ${theme.iconColor}`}>
            <AlertTriangle size={10} className="inline mr-1 text-amber-500" />
            <strong>Note:</strong> Multiple people can have approval authority for the same function. E.g., both Principal AND Admin can approve leave requests.
          </p>
        </div>
        <div className="space-y-3">
          {[
            { fn: 'Leave Approval (Teaching)', chain: ['Vice Principal', 'Principal'], options: ['VP → Principal', 'Direct to Principal', 'Admin → Principal', 'HOD → VP → Principal'] },
            { fn: 'Leave Approval (Non-Teaching)', chain: ['Admin', 'Principal'], options: ['Admin → Principal', 'HR → Admin', 'Direct to Admin'] },
            { fn: 'Fee Concession', chain: ['Accounts Head', 'Principal', 'Trust'], options: ['Accounts → Principal', 'Accounts → Principal → Trust', 'Direct to Trust'] },
            { fn: 'Purchase / Expense (< ₹50K)', chain: ['Admin', 'Principal'], options: ['Admin Approves', 'Admin → Principal', 'Any HOD → Admin'] },
            { fn: 'Purchase / Expense (> ₹50K)', chain: ['Principal', 'Trust'], options: ['Principal → Trust', 'Admin → Principal → Trust'] },
            { fn: 'Student TC / Transfer', chain: ['Class Teacher', 'Admin', 'Principal'], options: ['CT → Admin → Principal', 'Admin → Principal', 'Direct to Principal'] },
          ].map(a => (
            <div key={a.fn} className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-xs font-bold ${theme.highlight} mb-2`}>{a.fn}</p>
              <div className="flex items-center gap-2 mb-2">
                {a.chain.map((step, i) => (
                  <React.Fragment key={step}>
                    <span className={`text-[10px] px-2 py-1 rounded-lg ${theme.primary} text-white font-bold`}>{step}</span>
                    {i < a.chain.length - 1 && <ArrowRight size={10} className={theme.iconColor} />}
                  </React.Fragment>
                ))}
              </div>
              <SelectField label="" options={a.options} value={a.options[0]} theme={theme} />
            </div>
          ))}
        </div>
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <SectionTitle title="HR Management Access" subtitle="Which stakeholder dashboards should include the HR Management module?" theme={theme} />
        <div className="space-y-2">
          {Object.entries(hrAccess).map(([role, enabled]) => (
            <div key={role} className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <span className={`text-xs font-bold ${theme.highlight}`}>{role}</span>
                {(role === 'Principal' || role === 'School Admin') && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-600 font-bold ml-2">Recommended</span>
                )}
              </div>
              <Toggle on={enabled} onChange={() => setHrAccess(p => ({ ...p, [role]: !p[role] }))} theme={theme} />
            </div>
          ))}
        </div>
        <p className={`text-[10px] ${theme.iconColor} mt-2`}>{Object.values(hrAccess).filter(Boolean).length} dashboards will show the HR Management module</p>
      </div>
    </div>
  );
}

// ─── STEP 5: COMMUNICATION ───────────────────────────
function Step5Communication({ theme }: { theme: Theme }) {
  const [dmPerms, setDmPerms] = useState<Record<string, boolean>>({
    'Teacher→Teacher (Same Dept)': true, 'Teacher→Teacher (Any Dept)': true,
    'Teacher→Admin / Office': true, 'Teacher→Principal / VP': true,
    'Parent→Class Teacher': true, 'Parent→Any Teacher': false,
    'Parent→Admin / Office': false, 'Non-Teaching Staff→Teaching Staff': false,
    'Admin→Anyone': true, 'Principal / VP→Anyone': true,
  });
  const [parentMode, setParentMode] = useState('Full Two-Way');
  const [groupCreators, setGroupCreators] = useState<Record<string, boolean>>({
    'School Admin': true, 'Principal / VP': true, 'HODs': false, 'Teachers': false,
  });
  const [defaultGroups, setDefaultGroups] = useState<Record<string, boolean>>({
    'All Staff': true, 'Teaching Staff': true, 'Non-Teaching Staff': true,
    'Class-wise Teacher Groups': true, 'Department Groups': true,
    'Class-wise Parent Groups': true, 'House Groups': true,
  });

  const parentModes = [
    { mode: 'Full Two-Way', desc: 'Parents can initiate AND reply to conversations with permitted teachers', icon: MessageSquare },
    { mode: 'Reply Only', desc: 'Parents can only reply to messages initiated by teachers', icon: ArrowRight },
    { mode: 'Broadcast Only', desc: 'One-way: teachers/admin send, parents can only read', icon: Megaphone },
  ];

  return (
    <div className="space-y-6">
      <SectionTitle title="Communication & Chat Configuration" subtitle="Set messaging rules, parent communication, and group policies" theme={theme} />

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <SectionTitle title="Direct Message Permissions" subtitle="Who can initiate conversations with whom?" theme={theme} />
        <div className="space-y-2">
          {Object.entries(dmPerms).map(([key, on]) => (
            <div key={key} className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
              <span className={`text-xs ${theme.highlight}`}>{key.replace('→', ' → ')}</span>
              <Toggle on={on} onChange={() => setDmPerms(p => ({ ...p, [key]: !p[key] }))} theme={theme} />
            </div>
          ))}
        </div>
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <SectionTitle title="Parent Communication Mode" subtitle="How should parents interact in the chat system?" theme={theme} />
        <div className="space-y-2">
          {parentModes.map(m => (
            <button key={m.mode} onClick={() => setParentMode(m.mode)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all text-left ${
                parentMode === m.mode ? 'border-emerald-400 bg-emerald-50' : `${theme.border} ${theme.cardBg}`
              }`}>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${parentMode === m.mode ? 'border-emerald-500' : theme.border}`}>
                {parentMode === m.mode && <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />}
              </div>
              <m.icon size={18} className={parentMode === m.mode ? 'text-emerald-600' : theme.iconColor} />
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>{m.mode}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{m.desc}</p>
              </div>
            </button>
          ))}
        </div>
        <p className={`text-[10px] ${theme.iconColor} mt-2`}>This can be changed anytime by SA or Account Manager.</p>
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <SectionTitle title="Group Creation & Defaults" theme={theme} />
        <div className="space-y-2">
          <p className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>Who can create groups?</p>
          {Object.entries(groupCreators).map(([role, can]) => (
            <div key={role} className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
              <span className={`text-xs ${theme.highlight}`}>{role}</span>
              <Toggle on={can} onChange={() => setGroupCreators(p => ({ ...p, [role]: !p[role] }))} theme={theme} />
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-2">
          <p className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>Auto-create these default groups?</p>
          {Object.entries(defaultGroups).map(([group, auto]) => (
            <div key={group} className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
              <span className={`text-xs ${theme.highlight}`}>{group}</span>
              <Toggle on={auto} onChange={() => setDefaultGroups(p => ({ ...p, [group]: !p[group] }))} theme={theme} />
            </div>
          ))}
        </div>
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <SectionTitle title="Chat Storage & Retention" theme={theme} />
        <div className="grid grid-cols-2 gap-3">
          <SelectField label="Chat Storage Limit" options={['10 GB (Starter)', '25 GB (Professional)', '50 GB (Enterprise)', 'Custom']} value="50 GB (Enterprise)" theme={theme} hint="Set by plan tier" />
          <SelectField label="Message Retention" options={['6 months', '1 year (then archive)', '2 years', 'Forever', 'School decides']} value="1 year (then archive)" theme={theme} hint="School Admin manages within this cap" />
        </div>
      </div>
    </div>
  );
}

// ─── STEP 6: FEE STRUCTURE ───────────────────────────
function Step6Fees({ theme }: { theme: Theme }) {
  const [feeHeads, setFeeHeads] = useState<Record<string, boolean>>({
    'Tuition Fee': true, 'Admission Fee': true, 'Annual Charges': true, 'Transport Fee': true,
    'Activity / Extra-curricular Fee': true, 'Lab Fee': true, 'Library Fee': false, 'Exam Fee': true,
    'Development Fund': false, 'Smart Class / IT Fee': false, 'Uniform / Books': false, 'Hostel Fee': false,
  });
  const [payModes, setPayModes] = useState<Record<string, boolean>>({
    'Online (Razorpay)': true, 'UPI': true, 'Cash': true, 'Cheque': true, 'NEFT / RTGS': true, 'Demand Draft': true,
  });
  const [lateFeeOn, setLateFeeOn] = useState(true);
  const [concessions, setConcessions] = useState<Record<string, boolean>>({
    'Sibling Discount': true, 'EWS / RTE (25%)': true, 'Merit Scholarship': true,
    'Staff Child Discount': true, 'Financial Hardship': true, 'Sports Quota': true, 'Custom': false,
  });

  const feeFreqs: Record<string, string> = {
    'Tuition Fee': 'Monthly', 'Admission Fee': 'One-time', 'Annual Charges': 'Annual', 'Transport Fee': 'Monthly',
    'Activity / Extra-curricular Fee': 'Monthly', 'Lab Fee': 'Annual', 'Library Fee': 'Annual', 'Exam Fee': 'Per Exam',
    'Development Fund': 'Annual', 'Smart Class / IT Fee': 'Annual', 'Uniform / Books': 'Annual', 'Hostel Fee': 'Monthly',
  };

  return (
    <div className="space-y-6">
      <SectionTitle title="Fee Structure (Basic Setup)" subtitle="Define fee heads and class categories — detailed amounts can be configured later" theme={theme} />

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <SectionTitle title="Fee Heads" subtitle="What fees does the school charge?" theme={theme} />
        <div className="space-y-2">
          {Object.entries(feeHeads).map(([head, on]) => (
            <div key={head} className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-medium ${theme.highlight}`}>{head}</span>
                {head === 'Tuition Fee' && <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-600 font-bold">Core</span>}
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-[10px] ${theme.iconColor}`}>{feeFreqs[head]}</span>
                <Toggle on={on} onChange={() => head !== 'Tuition Fee' && setFeeHeads(p => ({ ...p, [head]: !p[head] }))} theme={theme} />
              </div>
            </div>
          ))}
          <button className={`w-full flex items-center justify-center gap-2 p-2.5 rounded-xl border-2 border-dashed ${theme.border} ${theme.iconColor} text-xs font-bold`}>
            <Plus size={12} /> Add Custom Fee Head
          </button>
        </div>
        <p className={`text-[10px] ${theme.iconColor} mt-2`}>{Object.values(feeHeads).filter(Boolean).length} fee heads active</p>
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <SectionTitle title="Payment Configuration" theme={theme} />
        <div className="grid grid-cols-2 gap-3">
          <SelectField label="Payment Frequency" options={['Monthly', 'Quarterly', 'Term-wise (3 terms)', 'Half-yearly', 'Annual', 'Flexible / Custom']} value="Quarterly" theme={theme} required />
          <SelectField label="Payment Due Day" options={['1st of month', '5th of month', '10th of month', '15th of month', 'Custom']} value="10th of month" theme={theme} />
        </div>
        <div className="mt-3 space-y-2">
          <p className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>Accepted Payment Modes</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(payModes).map(([mode, on]) => (
              <button key={mode} onClick={() => setPayModes(p => ({ ...p, [mode]: !p[mode] }))}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${on ? 'border-emerald-300 bg-emerald-50' : theme.border} cursor-pointer transition-all`}>
                <div className={`w-3.5 h-3.5 rounded border-2 flex items-center justify-center ${on ? 'bg-emerald-500 border-emerald-500' : theme.border}`}>
                  {on && <Check size={8} className="text-white" />}
                </div>
                <span className={`text-xs ${theme.highlight}`}>{mode}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center justify-between mb-3">
            <SectionTitle title="Late Fee Policy" theme={theme} />
            <Toggle on={lateFeeOn} onChange={() => setLateFeeOn(!lateFeeOn)} theme={theme} />
          </div>
          {lateFeeOn && (
            <div className="space-y-2">
              <FormField label="Grace Period (days)" value="15" type="number" theme={theme} />
              <FormField label="Late Fee Amount" value="₹50 per month" theme={theme} />
              <SelectField label="Calculation" options={['Fixed amount per month', 'Percentage of due amount', 'Slab-wise']} value="Fixed amount per month" theme={theme} />
            </div>
          )}
        </div>
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <SectionTitle title="Concession Types Available" theme={theme} />
          <div className="space-y-2">
            {Object.entries(concessions).map(([c, on]) => (
              <div key={c} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <span className={`text-xs ${theme.highlight}`}>{c}</span>
                <Toggle on={on} onChange={() => setConcessions(p => ({ ...p, [c]: !p[c] }))} theme={theme} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── STEP 7: HR & STAFF ─────────────────────────────
function Step7HR({ theme }: { theme: Theme }) {
  const [departments, setDepartments] = useState(['Teaching', 'Administration', 'Accounts', 'IT / Computer', 'Library', 'Transport', 'Security', 'Housekeeping', 'Lab', 'Sports', 'Medical']);
  const [leaveCarry, setLeaveCarry] = useState<Record<string, boolean>>({
    'Casual Leave (CL)': false, 'Sick Leave (SL)': false, 'Earned Leave (EL)': true,
    'Maternity Leave (ML)': false, 'Paternity Leave': false, 'Compensatory Off': false,
  });

  const removeDept = (d: string) => setDepartments(prev => prev.filter(x => x !== d));
  const addDept = () => {
    const name = prompt('Enter department name:');
    if (name && !departments.includes(name)) setDepartments(prev => [...prev, name]);
  };

  return (
    <div className="space-y-6">
      <SectionTitle title="HR & Staff Configuration" subtitle="Departments, designations, leave policies, and attendance" theme={theme} />

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <SectionTitle title="Departments" subtitle="Staff departments — click X to remove, + to add" theme={theme} />
        <div className="flex flex-wrap gap-2">
          {departments.map(d => (
            <span key={d} className={`text-xs px-3 py-1.5 rounded-xl ${theme.primary} text-white font-bold flex items-center gap-1`}>
              {d} <button onClick={() => removeDept(d)}><X size={10} className="cursor-pointer" /></button>
            </span>
          ))}
          <button onClick={addDept} className={`text-xs px-3 py-1.5 rounded-xl border-2 border-dashed ${theme.border} ${theme.iconColor} font-bold`}>+ Add</button>
        </div>
        <p className={`text-[10px] ${theme.iconColor} mt-2`}>{departments.length} departments</p>
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <SectionTitle title="Leave Policy" subtitle="Annual leave allocation per staff member" theme={theme} />
        <div className="space-y-2">
          {[
            { type: 'Casual Leave (CL)', days: 12 },
            { type: 'Sick Leave (SL)', days: 6 },
            { type: 'Earned Leave (EL)', days: 15 },
            { type: 'Maternity Leave (ML)', days: 180 },
            { type: 'Paternity Leave', days: 15 },
            { type: 'Compensatory Off', days: 0 },
          ].map(l => (
            <div key={l.type} className={`flex items-center gap-4 p-3 rounded-xl ${theme.secondaryBg}`}>
              <span className={`text-xs font-bold ${theme.highlight} flex-1`}>{l.type}</span>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] ${theme.iconColor}`}>Days/year:</span>
                <input type="number" defaultValue={l.days} className={`w-16 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight}`} />
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] ${theme.iconColor}`}>Carry forward:</span>
                <Toggle on={leaveCarry[l.type]} onChange={() => setLeaveCarry(p => ({ ...p, [l.type]: !p[l.type] }))} theme={theme} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <SectionTitle title="Staff Attendance Method" theme={theme} />
        <div className="grid grid-cols-2 gap-3">
          <SelectField label="Primary Method" options={['Biometric (Fingerprint)', 'Biometric (Face)', 'App-based (GPS)', 'RFID Card', 'Manual Register', 'Hybrid (Bio + App)']} value="Biometric (Fingerprint)" theme={theme} required />
          <SelectField label="Fallback Method" options={['App-based', 'Manual Register', 'None']} value="App-based" theme={theme} />
        </div>
        <div className="grid grid-cols-3 gap-3 mt-3">
          <FormField label="Check-in Time" value="07:45" type="time" theme={theme} />
          <FormField label="Grace Period (mins)" value="15" type="number" theme={theme} />
          <FormField label="Half-day After (mins late)" value="60" type="number" theme={theme} />
        </div>
      </div>
    </div>
  );
}

// ─── STEP 8: TRANSPORT ───────────────────────────────
function Step8Transport({ theme }: { theme: Theme }) {
  const [transportOn, setTransportOn] = useState(true);
  const [tracking, setTracking] = useState<Record<string, boolean>>({
    'GPS Live Tracking': true, 'Parent Tracking App': true, 'Auto-notification on Arrival': true,
    'Speed Alert': false, 'Route Deviation Alert': false, 'RFID Student Boarding': false,
  });
  const [pickupPolicies, setPickupPolicies] = useState<Record<string, boolean>>({
    'OTP-based pickup verification': true, 'Photo ID verification at gate': true,
    'Only pre-authorized persons can pick up': true, 'Parent must authorize via app for non-regular pickup': true,
  });

  const trackingDescs: Record<string, string> = {
    'GPS Live Tracking': 'Real-time vehicle location', 'Parent Tracking App': 'Parents can see bus location on their app',
    'Auto-notification on Arrival': 'SMS/push when bus reaches stop', 'Speed Alert': 'Notify if vehicle exceeds speed limit',
    'Route Deviation Alert': 'Notify if bus goes off defined route', 'RFID Student Boarding': 'Track which students boarded/alighted',
  };

  return (
    <div className="space-y-6">
      <SectionTitle title="Transport Configuration" subtitle="Bus routes, vehicles, and tracking setup" theme={theme} />

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center justify-between mb-4">
          <SectionTitle title="Transport Module" subtitle="Does this school provide bus/van service?" theme={theme} />
          <Toggle on={transportOn} onChange={() => setTransportOn(!transportOn)} theme={theme} />
        </div>
        {transportOn && (
          <div className="grid grid-cols-3 gap-3">
            <FormField label="Approx. Number of Routes" value="8" type="number" theme={theme} />
            <FormField label="Total Vehicles" value="8" type="number" theme={theme} />
            <FormField label="Students Using Transport" value="~300" theme={theme} />
          </div>
        )}
      </div>

      {transportOn && (
        <>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <SectionTitle title="Tracking & Safety" theme={theme} />
            <div className="space-y-2">
              {Object.entries(tracking).map(([feature, on]) => (
                <div key={feature} className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
                  <div>
                    <span className={`text-xs font-bold ${theme.highlight}`}>{feature}</span>
                    <p className={`text-[10px] ${theme.iconColor}`}>{trackingDescs[feature]}</p>
                  </div>
                  <Toggle on={on} onChange={() => setTracking(p => ({ ...p, [feature]: !p[feature] }))} theme={theme} />
                </div>
              ))}
            </div>
          </div>

          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <SectionTitle title="Student Pickup Policy" theme={theme} />
            <div className="space-y-2">
              {Object.entries(pickupPolicies).map(([policy, on]) => (
                <div key={policy} className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
                  <span className={`text-xs ${theme.highlight}`}>{policy}</span>
                  <Toggle on={on} onChange={() => setPickupPolicies(p => ({ ...p, [policy]: !p[policy] }))} theme={theme} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── STEP 9: REVIEW & LAUNCH ─────────────────────────
function Step9Review({ theme, goToStep }: { theme: Theme; goToStep: (s: number) => void }) {
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    'School basic info entered': true, 'Academic structure configured': true,
    'Plan selected & modules enabled': true, 'Approval workflows set': true,
    'Communication rules configured': true, 'Fee heads defined': true,
    'Class-wise fee amounts entered': false, 'Staff data imported (CSV/Excel)': false,
    'Student data imported': false, 'Route details entered': false,
    'Test login as School Admin': false, 'Welcome email sent to school': false,
  });

  const sections = [
    { title: 'School Identity', status: 'complete', step: 1, items: ['Delhi Public School, Ahmedabad', 'CBSE · K-12 · English Medium', 'Academic Year: April - March'] },
    { title: 'Academic Structure', status: 'complete', step: 2, items: ['15 classes (Nursery to 12th)', '2-3 sections per class', 'House System: 4 houses', 'Mon-Sat, 8:00 - 14:30'] },
    { title: 'Plan & Modules', status: 'complete', step: 3, items: ['Enterprise Plan (₹1,50,000/yr)', '24 of 27 modules enabled', '50 GB storage, unlimited users'] },
    { title: 'Roles & Permissions', status: 'complete', step: 4, items: ['10 stakeholder dashboards active', '6 approval workflows configured', 'Multi-authority approvals enabled'] },
    { title: 'Communication', status: 'complete', step: 5, items: ['Full two-way parent communication', '7 default groups auto-created', 'DM permissions set for 10 role pairs'] },
    { title: 'Fee Structure', status: 'partial', step: 6, items: ['8 fee heads configured', 'Quarterly payment · 10th due date', 'Late fee: ₹50/month after 15 days', '⚠ Class-wise amounts not yet entered'] },
    { title: 'HR & Staff', status: 'complete', step: 7, items: ['11 departments', '6 leave types configured', 'Biometric attendance + App fallback'] },
    { title: 'Transport', status: 'partial', step: 8, items: ['8 routes, 8 vehicles', 'GPS tracking enabled', '⚠ Route details not yet entered'] },
  ];

  const completedCount = sections.filter(s => s.status === 'complete').length;
  const partialCount = sections.filter(s => s.status === 'partial').length;
  const checkDone = Object.values(checklist).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <SectionTitle title="Review & Launch" subtitle="Verify all configurations before going live" theme={theme} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={CheckCircle} label="Steps Complete" value={`${completedCount} / ${sections.length}`} color="bg-emerald-500" theme={theme} />
        <StatCard icon={AlertTriangle} label="Needs Attention" value={String(partialCount)} color="bg-amber-500" theme={theme} />
        <StatCard icon={Layers} label="Modules Active" value="24" color="bg-blue-500" theme={theme} />
        <StatCard icon={Users} label="Dashboards Active" value="10" color="bg-purple-500" theme={theme} />
      </div>

      <div className="space-y-3">
        {sections.map(s => (
          <div key={s.title} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {s.status === 'complete' ? <CheckCircle size={16} className="text-emerald-500" /> : <AlertTriangle size={16} className="text-amber-500" />}
                <span className={`text-sm font-bold ${theme.highlight}`}>{s.title}</span>
              </div>
              <button onClick={() => goToStep(s.step)} className={`text-xs ${theme.primaryText} font-bold`}>Edit →</button>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {s.items.map(item => (
                <span key={item} className={`text-[10px] ${item.startsWith('⚠') ? 'text-amber-600 font-bold' : theme.iconColor}`}>• {item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <SectionTitle title="School Admin Credentials" subtitle="Auto-generated login for the School Admin dashboard" theme={theme} />
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Admin Username" value="admin@dpsahmedabad.edu" theme={theme} />
          <FormField label="Temporary Password" value="DPS@2026!" type="password" theme={theme} hint="School Admin will be forced to change on first login" />
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <FormField label="Principal Username" value="principal@dpsahmedabad.edu" theme={theme} />
          <FormField label="Temporary Password" value="DPS@Prin2026!" type="password" theme={theme} />
        </div>
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <SectionTitle title="Go-Live Checklist" subtitle="Click to check/uncheck items" theme={theme} />
        <div className="space-y-2">
          {Object.entries(checklist).map(([task, done]) => (
            <button key={task} onClick={() => setChecklist(p => ({ ...p, [task]: !p[task] }))}
              className={`w-full flex items-center gap-3 p-2.5 rounded-xl ${done ? 'bg-emerald-50' : theme.secondaryBg} transition-all text-left`}>
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${done ? 'bg-emerald-500 border-emerald-500' : theme.border}`}>
                {done && <Check size={10} className="text-white" />}
              </div>
              <span className={`text-xs ${done ? 'text-emerald-700 line-through' : `${theme.highlight} font-medium`}`}>{task}</span>
            </button>
          ))}
        </div>
        <p className={`text-[10px] ${theme.iconColor} mt-2`}>{checkDone} / {Object.keys(checklist).length} completed</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button className={`flex items-center gap-2 px-4 py-2.5 ${theme.secondaryBg} rounded-xl text-xs font-bold ${theme.highlight}`}>
            <Save size={14} /> Save as Draft
          </button>
          <button className={`flex items-center gap-2 px-4 py-2.5 ${theme.secondaryBg} rounded-xl text-xs font-bold ${theme.highlight}`}>
            <Download size={14} /> Export Config
          </button>
        </div>
        <div className="flex gap-2">
          <button className={`flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-white rounded-xl text-xs font-bold`}>
            <Eye size={14} /> Preview as School Admin
          </button>
          <button className={`flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white rounded-xl text-xs font-bold`}>
            <Rocket size={14} /> Launch School
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN WIZARD COMPONENT ────────────────────────────
export default function OnboardingWizard({ theme, onBack }: { theme: Theme; onBack: () => void }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [visitedSteps, setVisitedSteps] = useState<Set<number>>(new Set([1]));

  useEffect(() => {
    setVisitedSteps(prev => {
      const next = new Set(prev);
      next.add(currentStep);
      return next;
    });
  }, [currentStep]);

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1Identity theme={theme} />;
      case 2: return <Step2Academic theme={theme} />;
      case 3: return <Step3Modules theme={theme} />;
      case 4: return <Step4Roles theme={theme} />;
      case 5: return <Step5Communication theme={theme} />;
      case 6: return <Step6Fees theme={theme} />;
      case 7: return <Step7HR theme={theme} />;
      case 8: return <Step8Transport theme={theme} />;
      case 9: return <Step9Review theme={theme} goToStep={setCurrentStep} />;
      default: return <Step1Identity theme={theme} />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <button onClick={onBack} className={`text-xs ${theme.primaryText} font-bold mb-1`}>← Back to Onboarding</button>
          <h2 className={`text-xl font-bold ${theme.highlight}`}>School Onboarding Wizard</h2>
          <p className={`text-xs ${theme.iconColor}`}>Step {currentStep} of {steps.length} — {steps[currentStep - 1].label}</p>
        </div>
        <button className={`flex items-center gap-2 px-4 py-2 ${theme.secondaryBg} rounded-xl text-xs font-bold ${theme.highlight}`}>
          <Save size={14} /> Save Progress
        </button>
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-3`}>
        <div className="flex items-center gap-1">
          {steps.map((step, i) => {
            const isCurrent = currentStep === step.id;
            const isVisited = visitedSteps.has(step.id) && !isCurrent;
            const isPast = step.id < currentStep;
            // Visited past steps = complete (green), skipped past steps = warning (amber), future unvisited = gray
            const btnClass = isCurrent
              ? `${theme.primary} text-white`
              : isPast && isVisited
              ? 'bg-emerald-100 text-emerald-700'
              : isPast && !isVisited
              ? 'bg-amber-100 text-amber-700'
              : isVisited
              ? 'bg-blue-100 text-blue-600'
              : `${theme.secondaryBg} ${theme.iconColor}`;

            const StepIcon = isCurrent
              ? step.icon
              : isPast && isVisited
              ? CheckCircle
              : isPast && !isVisited
              ? AlertTriangle
              : isVisited
              ? CheckCircle
              : Circle;

            const lineColor = isPast && visitedSteps.has(step.id) ? 'bg-emerald-400' : isPast ? 'bg-amber-300' : theme.secondaryBg;

            return (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all ${btnClass}`}
                  title={isCurrent ? 'Current step' : isVisited ? 'Visited' : isPast ? 'Skipped — not yet filled' : 'Not started'}
                >
                  <StepIcon size={10} />
                  <span className="hidden lg:inline">{step.short}</span>
                  <span className="lg:hidden">{step.id}</span>
                </button>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 rounded ${lineColor}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
        <div className={`flex items-center gap-4 mt-2 px-1`}>
          <span className="flex items-center gap-1 text-[9px] text-emerald-600"><CheckCircle size={8} /> Completed</span>
          <span className="flex items-center gap-1 text-[9px] text-amber-600"><AlertTriangle size={8} /> Skipped</span>
          <span className={`flex items-center gap-1 text-[9px] ${theme.iconColor}`}><Circle size={8} /> Not started</span>
        </div>
      </div>

      <div className="min-h-[60vh]">
        {renderStep()}
      </div>

      <div className={`flex items-center justify-between pt-4 border-t ${theme.border}`}>
        <button
          onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
          disabled={currentStep === 1}
          className={`flex items-center gap-2 px-5 py-2.5 ${theme.secondaryBg} rounded-xl text-xs font-bold ${currentStep === 1 ? 'opacity-30' : theme.highlight}`}
        >
          <ChevronLeft size={14} /> Previous
        </button>
        <span className={`text-xs ${theme.iconColor}`}>Step {currentStep} of {steps.length}</span>
        <button
          onClick={() => currentStep < steps.length && setCurrentStep(currentStep + 1)}
          className={`flex items-center gap-2 px-5 py-2.5 ${currentStep === steps.length ? 'bg-emerald-500' : theme.primary} text-white rounded-xl text-xs font-bold`}
        >
          {currentStep === steps.length ? 'Launch School' : 'Next Step'} <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
