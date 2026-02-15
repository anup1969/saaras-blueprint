'use client';

import React, { useState, useEffect } from 'react';
import { type Theme } from '@/lib/themes';
import { StatCard, Toggle } from '@/components/shared';
import {
  Building2, GraduationCap, Users, Shield, MessageSquare,
  Banknote, Briefcase, Bus, Check, ChevronRight, ChevronLeft, ChevronDown, Save, Rocket,
  Upload, Plus, X, Eye, AlertTriangle, CheckCircle, Lock, Circle, AlertCircle,
  Layers, ArrowRight, Download, Megaphone, Clock, Package, Info,
  Headphones, Bot, Phone, Mail, Video, Sparkles, Calendar, Key
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

// ─── INSTITUTION TYPE DEFINITIONS ─────────────────────
const INSTITUTION_TYPES = [
  {
    id: 'preschool',
    label: 'Preschool / Daycare',
    desc: 'Standalone pre-primary: Playgroup, Nursery, LKG, UKG. No board affiliation, activity-based learning.',
    icon: '🎒',
    grades: 'Playgroup – UKG',
    features: ['Daily Activity Log', 'Meal Tracking', 'Nap Tracker', 'Developmental Milestones', 'Parent Daily Reports'],
  },
  {
    id: 'regular',
    label: 'Regular School',
    desc: 'Traditional school: Pre-primary + Class 1–12 (or subsets). Board affiliated (CBSE, ICSE, State, IB, etc.). May or may not have pre-primary wing.',
    icon: '🏫',
    grades: 'Pre-primary + Class 1–12',
    features: ['Board Exams', 'LMS & Homework', 'Report Cards', 'Streams (11-12)', 'SQAAF Compliance'],
  },
];

// ─── STEP 1: SCHOOL IDENTITY ──────────────────────────
function Step1Identity({ theme, onInstitutionTypeChange }: { theme: Theme; onInstitutionTypeChange?: (type: string) => void }) {
  const [orgName, setOrgName] = useState('');
  const [orgSchoolSame, setOrgSchoolSame] = useState(true);
  const [schoolCount, setSchoolCount] = useState<'single' | 'multiple' | 'existing'>('single');
  const [institutionType, setInstitutionType] = useState('regular');
  const [boardSelection, setBoardSelection] = useState('CBSE');
  const [multiBoards, setMultiBoards] = useState<Record<string, boolean>>({
    'CBSE': true, 'ICSE / ISC': false, 'State Board (Gujarat)': false, 'State Board (Maharashtra)': false,
    'IB (International Baccalaureate)': false, 'Cambridge (IGCSE)': false,
  });
  // Existing organisation state
  const [existingOrg, setExistingOrg] = useState('');
  const MOCK_ORGS = [
    { id: 'org1', name: 'DPS Society', schools: ['DPS CBSE Campus', 'DPS International Wing', 'DPS Pre-Primary'] },
    { id: 'org2', name: 'Ryan International Group', schools: ['Ryan Ahmedabad', 'Ryan Vadodara', 'Ryan Surat', 'Ryan Rajkot'] },
    { id: 'org3', name: 'Udgam Trust', schools: ['Udgam CBSE', 'Udgam IB'] },
  ];
  const selectedOrg = MOCK_ORGS.find(o => o.id === existingOrg);
  // Multi-school (Connected) state
  const [numSchools, setNumSchools] = useState(2);
  const [schoolConfigs, setSchoolConfigs] = useState([
    { name: '', type: 'Regular School', board: 'CBSE', shortName: '' },
    { name: '', type: 'Regular School', board: 'IB (International Baccalaureate)', shortName: '' },
  ]);
  const [sharedRoles, setSharedRoles] = useState<Record<string, boolean>>({
    'Trustee': true, 'School Admin': true, 'HR Manager': true, 'Accounts Head': true,
    'Principal': false, 'Vice Principal': false, 'Receptionist': false, 'Transport Head': false, 'Security': false,
  });
  const updateSchoolConfig = (idx: number, field: string, value: string) => {
    setSchoolConfigs(prev => prev.map((s, i) => i === idx ? { ...s, [field]: value } : s));
  };
  const handleNumSchoolsChange = (n: number) => {
    setNumSchools(n);
    setSchoolConfigs(prev => {
      if (n > prev.length) return [...prev, ...Array(n - prev.length).fill(null).map(() => ({ name: '', type: 'Regular School', board: 'CBSE', shortName: '' }))];
      return prev.slice(0, n);
    });
  };
  // REMARK 10: Multiple boards → different entities/school names
  const [differentEntities, setDifferentEntities] = useState(false);
  const [boardEntityNames, setBoardEntityNames] = useState<Record<string, string>>({});
  // REMARK 13: Custom Start Month picker
  const [academicYearPattern, setAcademicYearPattern] = useState('April - March');
  const [customStartMonth, setCustomStartMonth] = useState('');
  const [includesPrePrimary, setIncludesPrePrimary] = useState(false);
  const [prePrimaryPrograms, setPrePrimaryPrograms] = useState<Record<string, boolean>>({
    'Playgroup': false, 'Nursery': true, 'LKG': true, 'UKG': true,
  });
  const isPreschool = institutionType === 'preschool';
  const isMultiSchool = schoolCount === 'multiple';
  const isExistingOrg = schoolCount === 'existing';
  const selectedBoards = Object.entries(multiBoards).filter(([, v]) => v).map(([k]) => k);
  const multipleSelected = boardSelection === 'Multiple Boards' && selectedBoards.length > 1;

  const handleTypeChange = (type: string) => {
    setInstitutionType(type);
    onInstitutionTypeChange?.(type);
  };

  return (
    <div className="space-y-6">
      <SectionTitle title="School Basic Information" subtitle="Collected from school management during onboarding call" theme={theme} />

      {/* ── ORGANISATION NAME — FIRST QUESTION ── */}
      <div className={`${theme.cardBg} rounded-2xl border-2 border-blue-300 p-4 space-y-4`}>
        <SectionTitle title="Organisation / Entity Name" subtitle="Every school belongs to an organisation — enter the name first" theme={theme} />

        <FormField label="Organisation / Trust Name" placeholder="e.g. DPS Society, Ryan International Group, Udgam Trust" value={orgName} onChange={setOrgName} theme={theme} required />

        {/* Checkbox: Org and School are the same entity */}
        <button onClick={() => { setOrgSchoolSame(!orgSchoolSame); if (!orgSchoolSame) setSchoolCount('single'); }}
          className={`flex items-center gap-3 p-4 rounded-xl border-2 w-full text-left cursor-pointer transition-all ${
            orgSchoolSame ? 'border-emerald-400 bg-emerald-50 ring-1 ring-emerald-200' : `${theme.border} ${theme.cardBg}`
          }`}>
          <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 ${
            orgSchoolSame ? 'bg-emerald-500 border-emerald-500' : theme.border
          }`}>
            {orgSchoolSame && <Check size={14} className="text-white" />}
          </div>
          <div>
            <span className={`text-sm font-bold ${theme.highlight}`}>Organisation and School are the same entity</span>
            <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>
              {orgSchoolSame
                ? 'Single standalone school — the organisation name will be used as the school name.'
                : 'Uncheck this if the org/trust manages multiple schools, or you want to add a school to an existing org.'}
            </p>
          </div>
          {orgSchoolSame && <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold shrink-0">SINGLE SCHOOL</span>}
        </button>

        {/* If NOT same → show multi-school options */}
        {!orgSchoolSame && (
          <div className="space-y-3">
            <p className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>What would you like to do?</p>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setSchoolCount('multiple')}
                className={`p-4 rounded-xl border-2 cursor-pointer text-left transition-all ${
                  schoolCount === 'multiple' ? 'border-blue-400 bg-blue-50 ring-2 ring-blue-200' : `${theme.border} ${theme.cardBg}`
                }`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🔗</span>
                  <span className={`text-sm font-bold ${theme.highlight}`}>New Organisation</span>
                </div>
                {schoolCount === 'multiple' && <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold mb-2 inline-block">SELECTED</span>}
                <p className={`text-[10px] ${theme.iconColor}`}>Set up a new trust/chain with 2+ schools. Shared reporting & admin.</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {['Shared Reporting', 'Group Admin'].map(f => (
                    <span key={f} className={`text-[9px] px-1.5 py-0.5 rounded ${schoolCount === 'multiple' ? 'bg-blue-100 text-blue-700' : `${theme.secondaryBg} ${theme.iconColor}`}`}>{f}</span>
                  ))}
                </div>
              </button>
              <button onClick={() => setSchoolCount('existing')}
                className={`p-4 rounded-xl border-2 cursor-pointer text-left transition-all ${
                  isExistingOrg ? 'border-purple-400 bg-purple-50 ring-2 ring-purple-200' : `${theme.border} ${theme.cardBg}`
                }`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">➕</span>
                  <span className={`text-sm font-bold ${theme.highlight}`}>Add to Existing Org</span>
                </div>
                {isExistingOrg && <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-bold mb-2 inline-block">SELECTED</span>}
                <p className={`text-[10px] ${theme.iconColor}`}>Add a new school to an already onboarded organisation.</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {['Inherit Config', 'Shared Roles'].map(f => (
                    <span key={f} className={`text-[9px] px-1.5 py-0.5 rounded ${isExistingOrg ? 'bg-purple-100 text-purple-700' : `${theme.secondaryBg} ${theme.iconColor}`}`}>{f}</span>
                  ))}
                </div>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── ADD TO EXISTING ORGANISATION — When "Add to Existing Org" selected ── */}
      {isExistingOrg && (
        <div className="space-y-4">
          <div className={`${theme.cardBg} rounded-2xl border-2 border-purple-300 p-4 space-y-3`}>
            <SectionTitle title="Select Existing Organisation" subtitle="Choose the organisation to add a new school to" theme={theme} />
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>
                Organisation <span className="text-red-500">*</span>
              </label>
              <select value={existingOrg} onChange={e => setExistingOrg(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none ${theme.highlight}`}>
                <option value="">Select an organisation...</option>
                {MOCK_ORGS.map(o => (
                  <option key={o.id} value={o.id}>{o.name} ({o.schools.length} schools)</option>
                ))}
              </select>
            </div>

            {selectedOrg && (
              <div className={`p-4 rounded-xl ${theme.secondaryBg} space-y-3`}>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-bold ${theme.highlight}`}>{selectedOrg.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-bold`}>
                    {selectedOrg.schools.length} schools active
                  </span>
                </div>
                <div className="space-y-1">
                  <label className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>Existing Schools</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedOrg.schools.map(s => (
                      <span key={s} className={`text-[10px] px-2 py-1 rounded-lg ${theme.accentBg} ${theme.highlight} font-medium`}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {selectedOrg && (
            <div className={`${theme.cardBg} rounded-2xl border-2 border-emerald-300 p-4 space-y-3`}>
              <SectionTitle title="New School Details" subtitle={`This school will be added to ${selectedOrg.name}`} theme={theme} />
              <div className="grid grid-cols-2 gap-3">
                <FormField label="School Name" placeholder="e.g. DPS Science Academy" theme={theme} required />
                <FormField label="Short Name" placeholder="e.g. DPS-SCI" theme={theme} />
                <SelectField label="School Type" options={['Regular School', 'Preschool / Daycare', 'International School', 'Residential School']} theme={theme} required />
                <SelectField label="Board" options={['CBSE', 'ICSE / ISC', 'State Board', 'IB (International Baccalaureate)', 'Cambridge (IGCSE)', 'No Board (Preschool)']} theme={theme} required />
              </div>
              <div className={`p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2`}>
                <Info size={12} className="text-emerald-500 mt-0.5 shrink-0" />
                <p className="text-[10px] text-emerald-700">
                  This school will inherit the organisation&apos;s shared roles, billing settings, and admin configuration. You can customize modules, fees, and academic structure in the following steps.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── INSTITUTION TYPE — Only for Single School ── */}
      {!isMultiSchool && !isExistingOrg && (
        <div className={`${theme.cardBg} rounded-2xl border-2 border-amber-300 p-4 space-y-3`}>
          <SectionTitle title="Institution Type" subtitle="This determines which modules and features are available" theme={theme} />
          <div className="grid grid-cols-2 gap-3">
            {INSTITUTION_TYPES.map(t => (
              <button key={t.id} onClick={() => handleTypeChange(t.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer text-left transition-all ${
                  institutionType === t.id ? 'border-amber-400 bg-amber-50 ring-2 ring-amber-200' : `${theme.border} ${theme.cardBg}`
                }`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{t.icon}</span>
                  <span className={`text-sm font-bold ${theme.highlight}`}>{t.label}</span>
                </div>
                {institutionType === t.id && <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold mb-2 inline-block">SELECTED</span>}
                <p className={`text-[10px] ${theme.iconColor} mb-2`}>{t.desc}</p>
                <p className={`text-[10px] font-bold ${theme.iconColor}`}>Grades: {t.grades}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {t.features.map(f => (
                    <span key={f} className={`text-[9px] px-1.5 py-0.5 rounded ${institutionType === t.id ? 'bg-amber-100 text-amber-700' : `${theme.secondaryBg} ${theme.iconColor}`}`}>{f}</span>
                  ))}
                </div>
              </button>
            ))}
          </div>
          <p className={`text-[10px] ${theme.iconColor}`}>
            <AlertTriangle size={10} className="inline mr-1 text-amber-500" />
            <strong>Note:</strong> Institution type affects available modules, assessments, student profiles, and reports. Can be changed later by Super Admin.
          </p>
        </div>
      )}

      {/* ── MULTI-SCHOOL CONFIGURATION — Only when Multiple Schools selected ── */}
      {isMultiSchool && (
        <div className="space-y-4">
          {/* Organisation Setup */}
          <div className={`${theme.cardBg} rounded-2xl border-2 border-blue-300 p-4 space-y-3`}>
            <SectionTitle title="Organisation Setup" subtitle="The trust or management entity that owns multiple schools" theme={theme} />
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Organisation / Trust Name" placeholder="e.g. DPS Society, Ryan International Group" theme={theme} required />
              <SelectField label="Organisation Type" options={['Sister Concern (Same Campus)', 'School Chain (Different Cities)', 'Franchise Model', 'Trust / Society']} theme={theme} required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>
                  Number of Schools <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <button onClick={() => numSchools > 2 && handleNumSchoolsChange(numSchools - 1)} className={`w-8 h-8 rounded-lg ${theme.secondaryBg} ${theme.highlight} font-bold text-sm ${theme.buttonHover}`}>−</button>
                  <span className={`text-lg font-bold ${theme.highlight} w-8 text-center`}>{numSchools}</span>
                  <button onClick={() => numSchools < 10 && handleNumSchoolsChange(numSchools + 1)} className={`w-8 h-8 rounded-lg ${theme.secondaryBg} ${theme.highlight} font-bold text-sm ${theme.buttonHover}`}>+</button>
                </div>
              </div>
              <FormField label="Registration Number" placeholder="e.g. Trust/Society registration" theme={theme} />
            </div>
          </div>

          {/* Per-School Configuration Cards */}
          <div className={`${theme.cardBg} rounded-2xl border-2 border-indigo-300 p-4 space-y-3`}>
            <SectionTitle title="Per-School Configuration" subtitle={`Configure each of the ${numSchools} schools individually — each gets its own type, board, and setup`} theme={theme} />
            <div className="space-y-3">
              {schoolConfigs.map((sc, idx) => (
                <div key={idx} className={`p-4 rounded-xl border-2 ${idx === 0 ? 'border-emerald-300 bg-emerald-50/5' : `${theme.border} ${theme.secondaryBg}`}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${idx === 0 ? 'bg-emerald-100 text-emerald-700' : `${theme.accentBg} ${theme.iconColor}`}`}>
                      School {idx + 1} {idx === 0 && '(Primary)'}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    <FormField label="School Name" placeholder={`e.g. DPS ${idx === 0 ? 'CBSE' : 'International'}`} value={sc.name} onChange={(v) => updateSchoolConfig(idx, 'name', v)} theme={theme} required />
                    <FormField label="Short Name" placeholder={`e.g. DPS-${idx === 0 ? 'CBSE' : 'IB'}`} value={sc.shortName} onChange={(v) => updateSchoolConfig(idx, 'shortName', v)} theme={theme} />
                    <SelectField label="School Type" options={['Regular School', 'Preschool / Daycare', 'International School', 'Residential School']} value={sc.type} onChange={(v) => updateSchoolConfig(idx, 'type', v)} theme={theme} required />
                    <SelectField label="Board" options={['CBSE', 'ICSE / ISC', 'State Board', 'IB (International Baccalaureate)', 'Cambridge (IGCSE)', 'No Board (Preschool)']} value={sc.board} onChange={(v) => updateSchoolConfig(idx, 'board', v)} theme={theme} required />
                  </div>
                </div>
              ))}
            </div>
            <p className={`text-[10px] ${theme.iconColor}`}>
              <Info size={10} className="inline mr-1 text-indigo-500" />
              Each school gets its own database schema, principal, teachers, students, and configuration. Academic structure (classes, sections, houses) is set up per school in the next step.
            </p>
          </div>

          {/* Shared Roles Configuration */}
          <div className={`${theme.cardBg} rounded-2xl border-2 border-purple-300 p-4 space-y-3`}>
            <SectionTitle title="Shared Stakeholder Roles" subtitle="Which roles are shared across all schools in this organisation? Shared users see a 'Switch School' dropdown." theme={theme} />
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(sharedRoles).map(([role, isShared]) => (
                <button
                  key={role}
                  onClick={() => setSharedRoles(prev => ({ ...prev, [role]: !prev[role] }))}
                  className={`flex items-center gap-2 p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                    isShared ? 'border-purple-400 bg-purple-50/10' : `${theme.border} ${theme.secondaryBg}`
                  }`}
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${isShared ? 'bg-purple-500 text-white' : `${theme.border} border`}`}>
                    {isShared && <Check size={12} />}
                  </div>
                  <div>
                    <span className={`text-xs font-bold ${theme.highlight}`}>{role}</span>
                    <p className={`text-[9px] ${theme.iconColor}`}>{isShared ? 'One login, all schools' : 'Separate per school'}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className={`p-3 rounded-xl ${theme.accentBg} flex items-start gap-2 mt-2`}>
              <AlertTriangle size={14} className="text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className={`text-[10px] font-bold ${theme.highlight}`}>Shared roles can be changed later</p>
                <p className={`text-[10px] ${theme.iconColor}`}>
                  A shared admin sees all schools and switches between them. Their actions are always scoped to the currently selected school. New schools added to the org later will automatically inherit shared role settings.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* School name & logo — only for single school (multi-school and existing org have their own config) */}
      {!isMultiSchool && !isExistingOrg && (
        <div className="flex gap-4">
          <div className={`w-24 h-24 rounded-2xl border-2 border-dashed ${theme.border} flex flex-col items-center justify-center cursor-pointer ${theme.buttonHover}`}>
            <Upload size={20} className={theme.iconColor} />
            <span className={`text-[10px] ${theme.iconColor} mt-1`}>Logo</span>
          </div>
          <div className="flex-1 space-y-3">
            <FormField label={isPreschool ? 'Preschool / Daycare Name' : 'School Name'} placeholder={isPreschool ? 'e.g. Little Stars Preschool, Ahmedabad' : 'e.g. Delhi Public School, Ahmedabad'} theme={theme} required />
            <FormField label="Short Name / Abbreviation" placeholder={isPreschool ? 'e.g. Little Stars' : 'e.g. DPS Ahmedabad'} theme={theme} hint="Used in reports, receipts, SMS" />
          </div>
        </div>
      )}

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-3`}>
        <SectionTitle title="Address & Contact" theme={theme} />
        <FormField label="Address Line 1" placeholder="Building/Campus name, Street" theme={theme} required />
        <div className="grid grid-cols-3 gap-3">
          <FormField label="City" placeholder="Ahmedabad" theme={theme} required />
          <SelectField label="State" options={['Gujarat', 'Maharashtra', 'Rajasthan', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Uttar Pradesh', 'Other']} theme={theme} required />
          <FormField label="PIN Code" placeholder="380015" type="number" theme={theme} required />
        </div>
        {/* REMARK 11 & 12: Primary/Secondary Phone & Email */}
        <div className="grid grid-cols-3 gap-3">
          <FormField label="Primary Phone" placeholder="+91 79 XXXX XXXX" theme={theme} required />
          <FormField label="Primary Email" placeholder="info@school.edu" type="email" theme={theme} required />
          <FormField label="Website" placeholder="www.school.edu" theme={theme} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Secondary Phone" placeholder="+91 79 XXXX XXXX" theme={theme} hint="Alternate contact number" />
          <FormField label="Secondary Email" placeholder="admin@school.edu" type="email" theme={theme} hint="Alternate email for notifications" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <SelectField label="Academic Year Pattern" options={['April - March', 'June - May', 'January - December', 'Custom Start Month']} value={academicYearPattern} onChange={setAcademicYearPattern} theme={theme} required hint="When does your academic year start?" />
          <SelectField label="Current Academic Year" options={['2024-25', '2025-26', '2026-27']} value="2025-26" theme={theme} required hint="e.g. 2025-26" />
          <FormField label="Year of Establishment" placeholder="e.g. 1985" type="number" theme={theme} />
        </div>
        {/* REMARK 13: Custom Start Month picker */}
        {academicYearPattern === 'Custom Start Month' && (
          <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
            <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-2 block`}>
              Select Start Month <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
                <button
                  key={month}
                  onClick={() => setCustomStartMonth(month)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                    customStartMonth === month
                      ? 'border-emerald-400 bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                      : `${theme.border} ${theme.cardBg} ${theme.highlight} hover:bg-slate-50`
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>
            {customStartMonth && (
              <p className={`text-[10px] ${theme.iconColor} mt-2`}>
                <CheckCircle size={10} className="inline mr-1 text-emerald-500" />
                Academic year will run from <strong>{customStartMonth}</strong> to <strong>{
                  ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][
                    (['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].indexOf(customStartMonth) + 11) % 12
                  ]
                }</strong>.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Board & School Type — shown for Regular School and Connected School */}
      {!isPreschool && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-3`}>
          <SectionTitle title="Board & School Type" theme={theme} />
          <div className="grid grid-cols-2 gap-3">
            <SelectField label="Board Affiliation" options={['CBSE', 'ICSE / ISC', 'State Board (Gujarat)', 'State Board (Maharashtra)', 'IB (International Baccalaureate)', 'Cambridge (IGCSE)', 'Multiple Boards']} value={boardSelection} theme={theme} required onChange={setBoardSelection} />
            <FormField label="Affiliation Number" placeholder="e.g. 430126" theme={theme} hint="CBSE/ICSE affiliation ID" />
          </div>
          {boardSelection === 'Multiple Boards' && (
            <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-2`}>Select all applicable boards <span className="text-red-500">*</span></p>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(multiBoards).map(([board, checked]) => (
                  <button key={board} onClick={() => setMultiBoards(p => ({ ...p, [board]: !p[board] }))}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border ${checked ? 'border-emerald-300 bg-emerald-50' : theme.border} cursor-pointer transition-all text-left`}>
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${checked ? 'bg-emerald-500 border-emerald-500' : theme.border}`}>
                      {checked && <Check size={10} className="text-white" />}
                    </div>
                    <span className={`text-xs font-medium ${theme.highlight}`}>{board}</span>
                  </button>
                ))}
              </div>
              <p className={`text-[10px] ${theme.iconColor} mt-2`}>{Object.values(multiBoards).filter(Boolean).length} board(s) selected. Each board can have separate affiliation numbers and class configurations.</p>

              {/* REMARK 10: Multiple boards → different entities/school names */}
              {multipleSelected && (
                <div className={`mt-3 p-3 rounded-xl border ${theme.border} ${theme.cardBg}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className={`text-xs font-bold ${theme.highlight}`}>Are these boards under different school entities/names?</p>
                      <p className={`text-[10px] ${theme.iconColor}`}>Different boards sometimes operate under separate legal entities or school names</p>
                    </div>
                    <Toggle on={differentEntities} onChange={() => setDifferentEntities(!differentEntities)} theme={theme} />
                  </div>
                  {differentEntities ? (
                    <div className="space-y-2 mt-3 pt-3 border-t border-dashed border-slate-200">
                      <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1`}>School Name / Entity per Board</p>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedBoards.map(board => (
                          <div key={board}>
                            <label className={`text-[10px] ${theme.iconColor} mb-0.5 block`}>{board}</label>
                            <input
                              value={boardEntityNames[board] || ''}
                              onChange={(e) => setBoardEntityNames(prev => ({ ...prev, [board]: e.target.value }))}
                              placeholder={`Entity name for ${board}`}
                              className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs outline-none focus:ring-2 focus:ring-slate-300 ${theme.highlight}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className={`text-[10px] ${theme.iconColor} mt-1`}>
                      <CheckCircle size={10} className="inline mr-1 text-emerald-500" />
                      All boards operate under the same school name.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
          <div className="grid grid-cols-3 gap-3">
            <SelectField label="School Type" options={['K-12 (Nursery to 12th)', 'K-10 (Nursery to 10th)', 'K-8 (Nursery to 8th)', '1-12 (No Pre-primary)', '6-12 (Secondary + Higher)', '11-12 (Higher Secondary only)', 'Custom']} value="K-12 (Nursery to 12th)" theme={theme} required />
            <SelectField label="Medium of Instruction" options={['English Medium', 'Hindi Medium', 'Gujarati Medium', 'Bilingual (English + Hindi)', 'Bilingual (English + Gujarati)', 'Trilingual', 'Other']} value="English Medium" theme={theme} required />
            <SelectField label="School Category" options={['Co-educational', 'Boys Only', 'Girls Only']} value="Co-educational" theme={theme} required />
          </div>
        </div>
      )}

      {/* Preschool-specific config — ONLY for preschool */}
      {isPreschool && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-3`}>
          <SectionTitle title="Preschool Configuration" subtitle="Age groups, programs, and daily schedule" theme={theme} />
          <div className="grid grid-cols-2 gap-3">
            <SelectField label="Programs Offered" options={['Playgroup + Nursery + LKG + UKG', 'Nursery + LKG + UKG', 'Playgroup + Nursery only', 'Daycare + Playgroup + Nursery + LKG + UKG', 'Custom']} value="Playgroup + Nursery + LKG + UKG" theme={theme} required />
            <SelectField label="Age Range" options={['1.5 – 6 years', '2 – 6 years', '2.5 – 5 years', '3 – 6 years']} value="2 – 6 years" theme={theme} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <SelectField label="Medium of Instruction" options={['English', 'Hindi', 'Gujarati', 'Bilingual', 'Trilingual']} value="English" theme={theme} required />
            <SelectField label="School Category" options={['Co-educational', 'Boys Only', 'Girls Only']} value="Co-educational" theme={theme} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <SelectField label="Meals Provided" options={['None (parents send tiffin)', 'Snacks only', 'Breakfast + Lunch', 'All meals + Snacks', 'Optional meal plan']} value="Snacks only" theme={theme} />
            <SelectField label="Daycare / Extended Hours" options={['No — fixed timings only', 'Yes — before school (7 AM)', 'Yes — after school (till 6 PM)', 'Full daycare (7 AM – 7 PM)']} value="No — fixed timings only" theme={theme} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <SelectField label="CCTV for Parents" options={['Not available', 'Live streaming (app)', 'Recorded clips shared daily', 'Phase 2 — planned']} value="Phase 2 — planned" theme={theme} hint="Live classroom viewing for parent assurance" />
          </div>
        </div>
      )}

      {/* Regular School — Pre-Primary Wing toggle */}
      {institutionType === 'regular' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-3`}>
          <div className="flex items-center justify-between">
            <SectionTitle title="Includes Pre-Primary Wing?" subtitle="Does this school have a pre-primary section (Playgroup, Nursery, LKG, UKG)?" theme={theme} />
            <Toggle on={includesPrePrimary} onChange={() => setIncludesPrePrimary(!includesPrePrimary)} theme={theme} />
          </div>
          {includesPrePrimary && (
            <div className="space-y-3 pt-2 border-t border-dashed border-slate-200">
              <p className={`text-[10px] ${theme.iconColor}`}>Select the pre-primary programs offered by this school:</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(prePrimaryPrograms).map(([prog, on]) => (
                  <button key={prog} onClick={() => setPrePrimaryPrograms(p => ({ ...p, [prog]: !p[prog] }))}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${on ? 'border-emerald-300 bg-emerald-50' : theme.border} cursor-pointer transition-all`}>
                    <div className={`w-3.5 h-3.5 rounded border-2 flex items-center justify-center ${on ? 'bg-emerald-500 border-emerald-500' : theme.border}`}>
                      {on && <Check size={8} className="text-white" />}
                    </div>
                    <span className={`text-xs ${theme.highlight}`}>{prog}</span>
                  </button>
                ))}
              </div>
              <p className={`text-[10px] ${theme.iconColor}`}>
                <AlertCircle size={10} className="inline mr-1 text-blue-500" />
                Pre-primary wing will have activity-based learning features alongside the regular board-affiliated academics.
              </p>
            </div>
          )}
        </div>
      )}

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-3`}>
        <SectionTitle title="Key Contacts" subtitle="People SA will coordinate with during onboarding" theme={theme} />
        <div className="grid grid-cols-2 gap-3">
          <FormField label={isPreschool ? 'Director / Head Name' : 'Principal Name'} placeholder={isPreschool ? 'Mrs. Priya Shah' : 'Dr. Ramesh Patel'} theme={theme} required />
          <FormField label={isPreschool ? 'Director Phone' : 'Principal Phone'} placeholder="+91 98765 XXXXX" theme={theme} />
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
type BreakEntry = { id: string; name: string; afterPeriod: number; duration: number };
type DayTimetable = { enabled: boolean; reportingTime: string; firstBell: string; startTime: string; endTime: string; periods: number; periodDuration: number; breaks: BreakEntry[] };
type ShiftEntry = {
  id: string; name: string; level: string;
  // Default day config
  reportingTime: string; firstBell: string; startTime: string; endTime: string;
  periods: number; periodDuration: number;
  breaks: BreakEntry[];
  // Per-day overrides
  useSaturdaySchedule: boolean;
  saturdayConfig: { endTime: string; periods: number; breaks: BreakEntry[] };
};

// ─── STEP 2: ACADEMIC STRUCTURE ───────────────────────
function Step2Academic({ theme, institutionType }: { theme: Theme; institutionType: string }) {
  const isPreschool = institutionType === 'preschool';

  // ─── PRESCHOOL-specific state ───
  const [ageGroups, setAgeGroups] = useState<Record<string, boolean>>({
    'Playgroup (1.5–2.5 yrs)': true,
    'Nursery (2.5–3.5 yrs)': true,
    'Junior KG (3.5–4.5 yrs)': true,
    'Senior KG (4.5–5.5 yrs)': true,
  });
  const [preschoolGroups, setPreschoolGroups] = useState<Record<string, string[]>>({
    'Playgroup': ['Butterflies', 'Sunshine'],
    'Nursery': ['Rainbow', 'Stars'],
    'Junior KG': ['Dolphins', 'Pandas'],
    'Senior KG': ['Eagles', 'Lions'],
  });
  const [preschoolHouseEnabled, setPreschoolHouseEnabled] = useState(false);
  const [preschoolShifts, setPreschoolShifts] = useState([
    { id: 'ps1', name: 'Morning', startTime: '08:00', endTime: '12:00' },
    { id: 'ps2', name: 'Afternoon', startTime: '12:00', endTime: '16:00' },
    { id: 'ps3', name: 'Full Day', startTime: '08:00', endTime: '16:00' },
  ]);

  // ─── Regular school state ───
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
  // REMARKS 6, 7, 8, 9: Per-day schedule for Custom working days
  type DayStatus = 'Regular' | 'Half Day' | 'Holiday for Students' | 'Complete Holiday';
  const [daySchedule, setDaySchedule] = useState<Record<string, { status: DayStatus; halfDayEnd: string }>>({
    'Monday': { status: 'Regular', halfDayEnd: '12:00' },
    'Tuesday': { status: 'Regular', halfDayEnd: '12:00' },
    'Wednesday': { status: 'Regular', halfDayEnd: '12:00' },
    'Thursday': { status: 'Regular', halfDayEnd: '12:00' },
    'Friday': { status: 'Regular', halfDayEnd: '12:00' },
    'Saturday': { status: 'Half Day', halfDayEnd: '12:00' },
  });
  const updateDayStatus = (day: string, status: DayStatus) => {
    setDaySchedule(prev => ({ ...prev, [day]: { ...prev[day], status } }));
  };
  const updateDayHalfEnd = (day: string, halfDayEnd: string) => {
    setDaySchedule(prev => ({ ...prev, [day]: { ...prev[day], halfDayEnd } }));
  };
  const defaultBreaks = (periods: number): BreakEntry[] => [
    { id: 'b1', name: 'Short Break', afterPeriod: Math.floor(periods / 3), duration: 10 },
    { id: 'b2', name: 'Lunch Break', afterPeriod: Math.floor(periods * 2 / 3), duration: 30 },
  ];
  const [shifts, setShifts] = useState<ShiftEntry[]>([
    { id: 's1', name: 'Pre-Primary Morning', level: 'Pre-Primary', reportingTime: '07:45', firstBell: '07:55', startTime: '08:00', endTime: '12:00', periods: 5, periodDuration: 35, breaks: [{ id: 'b1', name: 'Snack Break', afterPeriod: 2, duration: 15 }], useSaturdaySchedule: false, saturdayConfig: { endTime: '11:00', periods: 3, breaks: [] } },
    { id: 's2', name: 'Primary Morning', level: 'Primary', reportingTime: '07:30', firstBell: '07:50', startTime: '08:00', endTime: '14:00', periods: 7, periodDuration: 40, breaks: [{ id: 'b1', name: 'Short Break', afterPeriod: 3, duration: 10 }, { id: 'b2', name: 'Lunch Break', afterPeriod: 5, duration: 30 }], useSaturdaySchedule: true, saturdayConfig: { endTime: '12:00', periods: 5, breaks: [{ id: 'sb1', name: 'Break', afterPeriod: 3, duration: 10 }] } },
    { id: 's3', name: 'Secondary', level: 'Secondary', reportingTime: '07:30', firstBell: '07:50', startTime: '08:00', endTime: '14:30', periods: 8, periodDuration: 40, breaks: [{ id: 'b1', name: 'Short Break', afterPeriod: 3, duration: 10 }, { id: 'b2', name: 'Lunch Break', afterPeriod: 6, duration: 30 }], useSaturdaySchedule: true, saturdayConfig: { endTime: '12:30', periods: 5, breaks: [{ id: 'sb1', name: 'Break', afterPeriod: 3, duration: 15 }] } },
  ]);

  const addShift = () => {
    const newBreaks = defaultBreaks(7);
    setShifts(prev => [...prev, { id: `s${Date.now()}`, name: '', level: '', reportingTime: '07:30', firstBell: '07:50', startTime: '08:00', endTime: '14:00', periods: 7, periodDuration: 40, breaks: newBreaks, useSaturdaySchedule: false, saturdayConfig: { endTime: '12:00', periods: 5, breaks: [] } }]);
  };

  const removeShift = (id: string) => {
    if (shifts.length <= 1) {
      window.alert('At least one shift is required.');
      return;
    }
    setShifts(prev => prev.filter(s => s.id !== id));
  };

  const updateShift = (id: string, field: string, value: string | number | boolean) => {
    setShifts(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };
  const addBreak = (shiftId: string) => {
    setShifts(prev => prev.map(s => s.id === shiftId ? { ...s, breaks: [...s.breaks, { id: `b${Date.now()}`, name: 'Break', afterPeriod: Math.floor(s.periods / 2), duration: 15 }] } : s));
  };
  const removeBreak = (shiftId: string, breakId: string) => {
    setShifts(prev => prev.map(s => s.id === shiftId ? { ...s, breaks: s.breaks.filter(b => b.id !== breakId) } : s));
  };
  const updateBreak = (shiftId: string, breakId: string, field: string, value: string | number) => {
    setShifts(prev => prev.map(s => s.id === shiftId ? { ...s, breaks: s.breaks.map(b => b.id === breakId ? { ...b, [field]: value } : b) } : s));
  };
  const addSatBreak = (shiftId: string) => {
    setShifts(prev => prev.map(s => s.id === shiftId ? { ...s, saturdayConfig: { ...s.saturdayConfig, breaks: [...s.saturdayConfig.breaks, { id: `sb${Date.now()}`, name: 'Break', afterPeriod: 2, duration: 10 }] } } : s));
  };
  const removeSatBreak = (shiftId: string, breakId: string) => {
    setShifts(prev => prev.map(s => s.id === shiftId ? { ...s, saturdayConfig: { ...s.saturdayConfig, breaks: s.saturdayConfig.breaks.filter(b => b.id !== breakId) } } : s));
  };
  const updateSatBreak = (shiftId: string, breakId: string, field: string, value: string | number) => {
    setShifts(prev => prev.map(s => s.id === shiftId ? { ...s, saturdayConfig: { ...s.saturdayConfig, breaks: s.saturdayConfig.breaks.map(b => b.id === breakId ? { ...b, [field]: value } : b) } } : s));
  };
  const updateSatConfig = (shiftId: string, field: string, value: string | number) => {
    setShifts(prev => prev.map(s => s.id === shiftId ? { ...s, saturdayConfig: { ...s.saturdayConfig, [field]: value } } : s));
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

  // ─── PRESCHOOL VERSION ───
  if (isPreschool) {
    const addPreschoolGroup = (level: string) => {
      const name = window.prompt(`Enter new group name for ${level}:`);
      if (name && name.trim()) {
        setPreschoolGroups(prev => {
          const current = prev[level] || [];
          if (current.includes(name.trim())) return prev;
          return { ...prev, [level]: [...current, name.trim()] };
        });
      }
    };
    const removePreschoolGroup = (level: string, groupName: string) => {
      setPreschoolGroups(prev => {
        const current = prev[level] || [];
        if (current.length <= 1) { window.alert('Each age group must have at least 1 group.'); return prev; }
        return { ...prev, [level]: current.filter(g => g !== groupName) };
      });
    };

    return (
      <div className="space-y-6">
        <SectionTitle title="Academic Structure — Preschool" subtitle="Define age groups, activity groups, and daily schedule" theme={theme} />

        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <SectionTitle title="Age Groups" subtitle="Click to toggle which age groups are offered" theme={theme} />
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(ageGroups).map(([name, checked]) => (
              <button key={name} onClick={() => setAgeGroups(p => ({ ...p, [name]: !p[name] }))}
                className={`flex items-center gap-3 p-3 rounded-xl border ${checked ? 'border-emerald-300 bg-emerald-50' : `${theme.border}`} cursor-pointer transition-all`}>
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${checked ? 'bg-emerald-500 border-emerald-500' : theme.border}`}>
                  {checked && <Check size={10} className="text-white" />}
                </div>
                <span className={`text-xs font-medium ${theme.highlight}`}>{name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <SectionTitle title="Groups per Age Level" subtitle="Fun group names for each age level (instead of sections A/B/C)" theme={theme} />
          <div className="space-y-2">
            {Object.entries(preschoolGroups).map(([level, groups]) => (
              <div key={level} className={`flex items-center gap-4 p-3 rounded-xl ${theme.secondaryBg}`}>
                <span className={`text-xs font-bold ${theme.highlight} w-28`}>{level}</span>
                <div className="flex gap-1 flex-wrap">
                  {groups.map(g => (
                    <span key={g} className={`text-[10px] px-2.5 py-1 rounded-lg ${theme.primary} text-white font-bold flex items-center gap-1`}>
                      {g}
                      <button onClick={() => removePreschoolGroup(level, g)} title={`Remove group ${g}`}>
                        <X size={8} className="cursor-pointer opacity-70 hover:opacity-100" />
                      </button>
                    </span>
                  ))}
                  <button onClick={() => addPreschoolGroup(level)}
                    className={`text-[10px] px-2 py-1 rounded-lg border ${theme.border} ${theme.iconColor} hover:bg-slate-100 transition-colors`}
                    title="Add new group">
                    <Plus size={10} />
                  </button>
                </div>
                <span className={`text-[10px] ${theme.iconColor} ml-auto whitespace-nowrap`}>~15 per group</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <div className="flex items-center justify-between mb-3">
            <SectionTitle title="House System" subtitle="Optional — most preschools do not use houses" theme={theme} />
            <Toggle on={preschoolHouseEnabled} onChange={() => setPreschoolHouseEnabled(!preschoolHouseEnabled)} theme={theme} />
          </div>
          {!preschoolHouseEnabled && (
            <p className={`text-[10px] ${theme.iconColor}`}>House system is disabled (default for preschools). Toggle on if your preschool uses house groups.</p>
          )}
          {preschoolHouseEnabled && (
            <p className={`text-[10px] ${theme.iconColor}`}>Configure house names and colors in the same way as regular schools.</p>
          )}
        </div>

        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <SectionTitle title="Daily Schedule / Shifts" subtitle="Preschool timings are typically simpler" theme={theme} />
          <div className="space-y-2">
            {preschoolShifts.map((shift) => (
              <div key={shift.id} className={`flex items-center gap-4 p-3 rounded-xl ${theme.secondaryBg}`}>
                <Clock size={14} className={theme.primaryText} />
                <span className={`text-xs font-bold ${theme.highlight} w-24`}>{shift.name}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] ${theme.iconColor}`}>Start:</span>
                  <input type="time" value={shift.startTime}
                    onChange={(e) => setPreschoolShifts(prev => prev.map(s => s.id === shift.id ? { ...s, startTime: e.target.value } : s))}
                    className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`} />
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] ${theme.iconColor}`}>End:</span>
                  <input type="time" value={shift.endTime}
                    onChange={(e) => setPreschoolShifts(prev => prev.map(s => s.id === shift.id ? { ...s, endTime: e.target.value } : s))}
                    className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`} />
                </div>
              </div>
            ))}
          </div>
          <p className={`text-[10px] ${theme.iconColor} mt-2`}>
            Morning (8–12), Afternoon (12–4), Full Day (8–4) are common preschool timings. Adjust as needed.
          </p>
        </div>
      </div>
    );
  }

  // ─── REGULAR / CONNECTED SCHOOL VERSION ───
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
        <SectionTitle title="School Timings & Shifts" subtitle="Fully configurable: reporting time, bell schedule, breaks, per-day variations — each shift is independent" theme={theme} />
        <div className="mb-4">
          <SelectField label="Working Days (applies to all shifts)" options={['Monday - Friday', 'Monday - Saturday', 'Custom']} value={workingDays} onChange={setWorkingDays} theme={theme} required />
        </div>

        {/* REMARKS 6, 7, 8, 9: Per-day schedule when Custom working days is selected */}
        {workingDays === 'Custom' && (
          <div className={`mb-4 p-4 rounded-xl ${theme.secondaryBg} border ${theme.border}`}>
            <div className="mb-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Per-Day Schedule Configuration</p>
              <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>Configure each day individually — set regular, half-day, or holiday status</p>
            </div>
            <div className="space-y-2">
              <div className="grid grid-cols-6 gap-2 items-center">
                <span className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>Day</span>
                <span className={`text-[10px] font-bold ${theme.iconColor} uppercase text-center`}>Regular</span>
                <span className={`text-[10px] font-bold ${theme.iconColor} uppercase text-center`}>Half Day</span>
                <span className={`text-[10px] font-bold ${theme.iconColor} uppercase text-center`}>Students Off</span>
                <span className={`text-[10px] font-bold ${theme.iconColor} uppercase text-center`}>All Holiday</span>
                <span className={`text-[10px] font-bold ${theme.iconColor} uppercase text-center`}>Half-Day End</span>
              </div>
              {Object.entries(daySchedule).map(([day, config]) => (
                <div key={day} className={`grid grid-cols-6 gap-2 items-center p-2 rounded-lg ${
                  config.status === 'Complete Holiday' ? 'bg-red-50' :
                  config.status === 'Holiday for Students' ? 'bg-amber-50' :
                  config.status === 'Half Day' ? 'bg-blue-50' :
                  theme.cardBg
                }`}>
                  <span className={`text-xs font-bold ${theme.highlight}`}>{day}</span>
                  {(['Regular', 'Half Day', 'Holiday for Students', 'Complete Holiday'] as DayStatus[]).map(status => (
                    <div key={status} className="flex justify-center">
                      <button
                        onClick={() => updateDayStatus(day, status)}
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${
                          config.status === status
                            ? status === 'Complete Holiday' ? 'bg-red-500 border-red-500' :
                              status === 'Holiday for Students' ? 'bg-amber-500 border-amber-500' :
                              status === 'Half Day' ? 'bg-blue-500 border-blue-500' :
                              'bg-emerald-500 border-emerald-500'
                            : theme.border
                        }`}
                      >
                        {config.status === status && <Check size={10} className="text-white" />}
                      </button>
                    </div>
                  ))}
                  <div className="flex justify-center">
                    {config.status === 'Half Day' ? (
                      <input type="time" value={config.halfDayEnd}
                        onChange={(e) => updateDayHalfEnd(day, e.target.value)}
                        className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] outline-none w-full ${theme.highlight}`} />
                    ) : (
                      <span className={`text-[10px] ${theme.iconColor}`}>—</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 space-y-1">
              <p className={`text-[10px] ${theme.iconColor}`}>
                <Info size={10} className="inline mr-1 text-blue-500" />
                <strong>Students Off:</strong> Students have a holiday, but admin/staff are working (e.g., some Saturdays).
              </p>
              <p className={`text-[10px] ${theme.iconColor}`}>
                <AlertCircle size={10} className="inline mr-1 text-amber-500" />
                Saturday schedules can differ — use per-shift Saturday config below for different timings.
              </p>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {shifts.map((shift, idx) => (
            <div key={shift.id} className={`p-4 rounded-xl border-2 ${idx === 0 ? 'border-emerald-300' : `${theme.border}`} ${theme.secondaryBg} relative space-y-4`}>
              <button
                onClick={() => removeShift(shift.id)}
                className={`absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center border ${theme.border} hover:bg-red-100 transition-colors`}
                title="Remove shift"
              >
                <X size={10} className="text-red-500" />
              </button>

              <div className="flex items-center gap-2">
                <Clock size={14} className={theme.primaryText} />
                <span className={`text-sm font-bold ${theme.highlight}`}>Shift {idx + 1}: {shift.name || '(Unnamed)'}</span>
              </div>

              {/* Row 1: Name + Level */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Shift Name <span className="text-red-500">*</span></label>
                  <input value={shift.name} onChange={(e) => updateShift(shift.id, 'name', e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs outline-none ${theme.highlight}`} placeholder="e.g. Primary Morning" />
                </div>
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Level <span className="text-red-500">*</span></label>
                  <select value={shift.level} onChange={(e) => updateShift(shift.id, 'level', e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs outline-none ${theme.highlight}`}>
                    <option value="">Select...</option>
                    <option value="Pre-Primary">Pre-Primary</option>
                    <option value="Primary">Primary</option>
                    <option value="Secondary">Secondary</option>
                    <option value="Senior Secondary">Senior Secondary</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Reporting, First Bell, First Period, End Time */}
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Reporting Time</label>
                  <input type="time" value={shift.reportingTime} onChange={(e) => updateShift(shift.id, 'reportingTime', e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs outline-none ${theme.highlight}`} />
                  <p className={`text-[9px] ${theme.iconColor} mt-0.5`}>Students arrive by</p>
                </div>
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>First Bell</label>
                  <input type="time" value={shift.firstBell} onChange={(e) => updateShift(shift.id, 'firstBell', e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs outline-none ${theme.highlight}`} />
                  <p className={`text-[9px] ${theme.iconColor} mt-0.5`}>Assembly / Line-up bell</p>
                </div>
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>1st Period Starts</label>
                  <input type="time" value={shift.startTime} onChange={(e) => updateShift(shift.id, 'startTime', e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs outline-none ${theme.highlight}`} />
                  <p className={`text-[9px] ${theme.iconColor} mt-0.5`}>Teaching starts</p>
                </div>
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>School Ends</label>
                  <input type="time" value={shift.endTime} onChange={(e) => updateShift(shift.id, 'endTime', e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs outline-none ${theme.highlight}`} />
                  <p className={`text-[9px] ${theme.iconColor} mt-0.5`}>Dismissal bell</p>
                </div>
              </div>

              {/* Row 3: Periods + Duration */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Periods Per Day</label>
                  <input type="number" value={shift.periods} onChange={(e) => updateShift(shift.id, 'periods', parseInt(e.target.value) || 0)}
                    className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs outline-none ${theme.highlight}`} />
                </div>
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>Period Duration (mins)</label>
                  <input type="number" value={shift.periodDuration} onChange={(e) => updateShift(shift.id, 'periodDuration', parseInt(e.target.value) || 0)}
                    className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs outline-none ${theme.highlight}`} />
                </div>
              </div>

              {/* Break Configuration */}
              <div className={`p-3 rounded-xl border ${theme.border} ${theme.cardBg} space-y-2`}>
                <div className="flex items-center justify-between">
                  <p className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>Breaks (Mon–Fri)</p>
                  <button onClick={() => addBreak(shift.id)}
                    className={`text-[10px] px-2 py-1 rounded-lg ${theme.primary} text-white font-bold flex items-center gap-1`}>
                    <Plus size={8} /> Add Break
                  </button>
                </div>
                {shift.breaks.length === 0 && (
                  <p className={`text-[10px] ${theme.iconColor}`}>No breaks configured. Click &quot;Add Break&quot; to add one.</p>
                )}
                {shift.breaks.map(brk => (
                  <div key={brk.id} className={`grid grid-cols-4 gap-2 items-end p-2 rounded-lg ${theme.secondaryBg}`}>
                    <div>
                      <label className={`text-[9px] ${theme.iconColor} font-bold`}>Break Name</label>
                      <input value={brk.name} onChange={(e) => updateBreak(shift.id, brk.id, 'name', e.target.value)}
                        className={`w-full px-2 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight}`} />
                    </div>
                    <div>
                      <label className={`text-[9px] ${theme.iconColor} font-bold`}>After Period #</label>
                      <input type="number" min={1} max={shift.periods} value={brk.afterPeriod}
                        onChange={(e) => updateBreak(shift.id, brk.id, 'afterPeriod', parseInt(e.target.value) || 1)}
                        className={`w-full px-2 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight}`} />
                    </div>
                    <div>
                      <label className={`text-[9px] ${theme.iconColor} font-bold`}>Duration (mins)</label>
                      <input type="number" min={5} value={brk.duration}
                        onChange={(e) => updateBreak(shift.id, brk.id, 'duration', parseInt(e.target.value) || 5)}
                        className={`w-full px-2 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight}`} />
                    </div>
                    <button onClick={() => removeBreak(shift.id, brk.id)}
                      className={`px-2 py-1.5 rounded-lg border ${theme.border} text-red-500 text-[10px] font-bold hover:bg-red-50 transition-colors`}>
                      Remove
                    </button>
                  </div>
                ))}
                {shift.breaks.length > 0 && (
                  <p className={`text-[9px] ${theme.iconColor}`}>
                    Schedule: {Array.from({ length: shift.periods }, (_, i) => {
                      const brk = shift.breaks.find(b => b.afterPeriod === i + 1);
                      return `P${i + 1}${brk ? ` → ${brk.name} (${brk.duration}m)` : ''}`;
                    }).join(' → ')}
                  </p>
                )}
              </div>

              {/* Saturday Different Schedule Toggle */}
              <div className={`p-3 rounded-xl border-2 border-dashed ${shift.useSaturdaySchedule ? 'border-blue-300 bg-blue-50/30' : theme.border} ${theme.cardBg} space-y-2`}>
                <button onClick={() => updateShift(shift.id, 'useSaturdaySchedule', !shift.useSaturdaySchedule)}
                  className="flex items-center gap-2 cursor-pointer w-full text-left">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${shift.useSaturdaySchedule ? 'bg-blue-500 border-blue-500' : theme.border}`}>
                    {shift.useSaturdaySchedule && <Check size={12} className="text-white" />}
                  </div>
                  <span className={`text-[10px] font-bold ${theme.highlight}`}>Different Saturday Schedule</span>
                  <span className={`text-[9px] ${theme.iconColor}`}>(fewer periods, shorter day)</span>
                </button>
                {shift.useSaturdaySchedule && (
                  <div className="mt-2 space-y-2">
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className={`text-[9px] ${theme.iconColor} font-bold`}>Sat End Time</label>
                        <input type="time" value={shift.saturdayConfig.endTime}
                          onChange={(e) => updateSatConfig(shift.id, 'endTime', e.target.value)}
                          className={`w-full px-2 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight}`} />
                      </div>
                      <div>
                        <label className={`text-[9px] ${theme.iconColor} font-bold`}>Sat Periods</label>
                        <input type="number" value={shift.saturdayConfig.periods}
                          onChange={(e) => updateSatConfig(shift.id, 'periods', parseInt(e.target.value) || 0)}
                          className={`w-full px-2 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight}`} />
                      </div>
                      <div className="flex items-end">
                        <button onClick={() => addSatBreak(shift.id)}
                          className={`text-[10px] px-2 py-1.5 rounded-lg ${theme.primary} text-white font-bold flex items-center gap-1`}>
                          <Plus size={8} /> Sat Break
                        </button>
                      </div>
                    </div>
                    {shift.saturdayConfig.breaks.map(brk => (
                      <div key={brk.id} className={`grid grid-cols-4 gap-2 items-end p-2 rounded-lg ${theme.secondaryBg}`}>
                        <div>
                          <label className={`text-[9px] ${theme.iconColor} font-bold`}>Break Name</label>
                          <input value={brk.name} onChange={(e) => updateSatBreak(shift.id, brk.id, 'name', e.target.value)}
                            className={`w-full px-2 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight}`} />
                        </div>
                        <div>
                          <label className={`text-[9px] ${theme.iconColor} font-bold`}>After Period #</label>
                          <input type="number" min={1} value={brk.afterPeriod}
                            onChange={(e) => updateSatBreak(shift.id, brk.id, 'afterPeriod', parseInt(e.target.value) || 1)}
                            className={`w-full px-2 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight}`} />
                        </div>
                        <div>
                          <label className={`text-[9px] ${theme.iconColor} font-bold`}>Duration (mins)</label>
                          <input type="number" min={5} value={brk.duration}
                            onChange={(e) => updateSatBreak(shift.id, brk.id, 'duration', parseInt(e.target.value) || 5)}
                            className={`w-full px-2 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight}`} />
                        </div>
                        <button onClick={() => removeSatBreak(shift.id, brk.id)}
                          className={`px-2 py-1.5 rounded-lg border ${theme.border} text-red-500 text-[10px] font-bold hover:bg-red-50`}>
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
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
          {shifts.length} shift{shifts.length !== 1 ? 's' : ''} configured. Each shift has its own timings, period structure, break schedule, and optional Saturday variation.
        </p>

        {/* Bell Schedule Preview */}
        <div className={`mt-3 p-3 rounded-xl ${theme.accentBg} flex items-start gap-2`}>
          <Info size={12} className={`${theme.iconColor} mt-0.5 shrink-0`} />
          <p className={`text-[10px] ${theme.iconColor}`}>
            <strong>Bell Schedule:</strong> Auto-generated from the above configuration. Bells ring at: Reporting time, First bell (assembly), Period start/end, Break start/end, and Dismissal. Schools can customize bell sounds in settings.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── MODULE SUB-MODULES & RBAC DATA ─────────────────
const MODULE_SUBMODULES: Record<string, string[]> = {
  'Dashboard': ['Overview Cards', 'Quick Actions', 'News Board', 'Analytics Widgets'],
  'Student Management': ['Admission', 'Profile & Documents', 'Promotion', 'TC / Transfer', 'Sibling Linking', 'Bulk Import'],
  'Staff Management': ['Profile & Documents', 'Joining / Exit', 'ID Card Generation', 'Staff Directory', 'Attendance'],
  'Fee Management': ['Fee Structure', 'Collection & Receipts', 'Concessions', 'Late Fee Rules', 'Reports & Ledger', 'Online Payment', 'Reminders'],
  'Attendance': ['Student Attendance', 'Staff Attendance', 'Biometric Integration', 'Reports & Analytics', 'Absent Notifications'],
  'Timetable': ['Class Timetable', 'Teacher Timetable', 'Substitution Management', 'Period Allocation', 'Conflict Detection'],
  'Parent Portal': ['Child Dashboard', 'Fee Payments', 'Communication', 'Homework View', 'Attendance View', 'Report Cards'],
  'Student Portal': ['Dashboard', 'Homework Submission', 'Timetable View', 'Results', 'Library'],
  'Communication / Chat': ['Chat Messaging', 'Announcements', 'Broadcasts', 'Polls & Surveys', 'Notices'],
  'Online Payment': ['Payment Gateway', 'Payment Tracking', 'Refunds', 'Payment Reports'],
  'Enquiry / Admission': ['Lead Capture', 'Follow-up Pipeline', 'Online Form', 'Conversion Tracking', 'Reports'],
  'Homework / Assignments': ['Create & Assign', 'Submission Tracking', 'Grading', 'Reports'],
  'Transport Management': ['Routes & Stops', 'Vehicle Management', 'GPS Tracking', 'Student Mapping', 'Driver App'],
  'Visitor Management': ['Check-in / Check-out', 'Pre-approval', 'Student Pickup', 'Visitor Logs', 'Reports'],
  'Library': ['Book Catalog', 'Issue / Return', 'Fines', 'Reports', 'Barcode Scan'],
  'Examination & Report Cards': ['Exam Schedule', 'Marks Entry', 'Report Card Generation', 'Analytics', 'Board Exam Support'],
  'HR & Payroll': ['Payroll Processing', 'Salary Structure', 'Deductions & Tax', 'Pay Slips', 'Compliance Reports'],
  'Leave Management': ['Apply Leave', 'Approval Workflow', 'Leave Balance', 'Holiday Calendar', 'Reports'],
  'Certificates': ['TC Generation', 'Bonafide', 'Character Certificate', 'Custom Templates', 'Bulk Print'],
  'Canteen Management': ['Menu Management', 'Pre-orders', 'Billing', 'Reports'],
  'SQAAF / Quality Assessment': ['Self Assessment', 'Quality Metrics', 'Improvement Plans', 'Reports'],
  'Inventory Management': ['Asset Tracking', 'Stock Management', 'Purchase Orders', 'Maintenance Logs'],
  'Hostel Management': ['Room Allocation', 'Mess Menu', 'Attendance', 'Fee Integration'],
  'Alumni Management': ['Alumni Directory', 'Events', 'Communication', 'Donations'],
  'Advanced Analytics': ['Custom Dashboards', 'Trend Analysis', 'Predictive Insights', 'Export Tools'],
  'Custom Reports Builder': ['Drag & Drop Builder', 'Scheduled Reports', 'Templates', 'Export Formats'],
  'API Access': ['REST API Keys', 'Webhook Config', 'Rate Limits', 'Documentation'],
  'White Label Branding': ['Logo & Colors', 'Custom Domain', 'Email Templates', 'App Branding'],
};

const STAKEHOLDER_ROLES = [
  'School Admin', 'Principal', 'Vice Principal', 'Teacher', 'HR Manager',
  'Accounts Head', 'Receptionist', 'Transport Head', 'Security', 'Trustee', 'Parent', 'Student',
];

// ─── STEP 3: PLAN & MODULES ──────────────────────────
function Step3Modules({ theme, institutionType }: { theme: Theme; institutionType: string }) {
  const studentLabel = institutionType === 'preschool' ? 'Children' : 'Students';

  // SKU type: 'sms-pack' = software only, 'sms-students' = software + student licenses
  const [skuType, setSkuType] = useState<'sms-pack' | 'sms-students'>('sms-students');
  const [selectedPlan, setSelectedPlan] = useState('powerpack');

  // ─── SEPARATE TIER DEFINITIONS PER SKU ───
  const smsPackTiers = [
    {
      id: 'starter', name: 'Starter', defaultPrice: '25,000', modules: 12,
      desc: 'Small teams, up to 100 employees', staff: '100', storage: '10 GB',
      colorBorder: 'border-blue-300', colorRing: 'ring-blue-200', colorBg: 'bg-blue-50',
      colorBadge: 'bg-blue-100 text-blue-700', colorDot: 'bg-blue-400',
    },
    {
      id: 'professional', name: 'Professional', defaultPrice: '75,000', modules: 18,
      desc: 'Mid-size, up to 150 employees', staff: '150', storage: '25 GB',
      colorBorder: 'border-blue-400', colorRing: 'ring-blue-300', colorBg: 'bg-blue-50',
      colorBadge: 'bg-blue-100 text-blue-700', colorDot: 'bg-blue-500',
    },
    {
      id: 'enterprise', name: 'Enterprise', defaultPrice: '1,50,000', modules: 27,
      desc: 'Large, unlimited employees', staff: 'Unlimited', storage: '50 GB',
      colorBorder: 'border-blue-500', colorRing: 'ring-blue-300', colorBg: 'bg-blue-50',
      colorBadge: 'bg-blue-100 text-blue-700', colorDot: 'bg-blue-600',
    },
  ];

  const smsStudentTiers = [
    {
      id: 'standard', name: 'Standard', defaultPrice: '50,000', modules: 15,
      desc: 'Small school, limited modules', students: '500', staff: '100', storage: '15 GB',
      excludedModules: ['Transport Management', 'HR & Payroll', 'Canteen Management', 'Alumni Management'],
      colorBorder: 'border-emerald-300', colorRing: 'ring-emerald-200', colorBg: 'bg-emerald-50',
      colorBadge: 'bg-emerald-100 text-emerald-700', colorDot: 'bg-emerald-400',
    },
    {
      id: '360', name: '360', defaultPrice: '1,25,000', modules: 27,
      desc: 'All modules for any size school', students: '3,000', staff: '300', storage: '40 GB',
      excludedModules: [] as string[],
      colorBorder: 'border-emerald-400', colorRing: 'ring-emerald-300', colorBg: 'bg-emerald-50',
      colorBadge: 'bg-emerald-100 text-emerald-700', colorDot: 'bg-emerald-500',
    },
    {
      id: 'powerpack', name: 'Power Pack (AI)', defaultPrice: '2,50,000', modules: 27,
      desc: 'All modules + ALL AI features', students: 'Unlimited', staff: 'Unlimited', storage: '100 GB',
      excludedModules: [] as string[],
      colorBorder: 'border-amber-400', colorRing: 'ring-amber-300', colorBg: 'bg-amber-50',
      colorBadge: 'bg-amber-100 text-amber-700', colorDot: 'bg-amber-500',
      aiFeatures: ['AI Timetable', 'AI Question Paper', 'AI Homework', 'AI Support Bot', 'AI Planner'],
    },
  ];

  const activeTiers = skuType === 'sms-pack' ? smsPackTiers : smsStudentTiers;
  const currentTier = activeTiers.find(t => t.id === selectedPlan) || activeTiers[activeTiers.length - 1];

  // ─── EDITABLE PRICING ───
  const [tierPrices, setTierPrices] = useState<Record<string, string>>({
    starter: '25,000', professional: '75,000', enterprise: '1,50,000',
    standard: '50,000', '360': '1,25,000', powerpack: '2,50,000',
  });

  const updateTierPrice = (tierId: string, val: string) => {
    setTierPrices(prev => ({ ...prev, [tierId]: val.replace(/[^0-9,]/g, '') }));
  };

  // ─── EDITABLE LIMITS ───
  const storageDefaults: Record<string, number> = {
    starter: 10, professional: 25, enterprise: 50,
    standard: 15, '360': 40, powerpack: 100,
  };
  const studentDefaults: Record<string, number> = {
    starter: 0, professional: 0, enterprise: 0,
    standard: 500, '360': 3000, powerpack: 99999,
  };
  const staffDefaults: Record<string, number> = {
    starter: 100, professional: 150, enterprise: 99999,
    standard: 100, '360': 300, powerpack: 99999,
  };

  const [storage, setStorage] = useState(storageDefaults['powerpack']);
  const [maxStudents, setMaxStudents] = useState(studentDefaults['powerpack']);
  const [maxStaff, setMaxStaff] = useState(staffDefaults['powerpack']);
  const [dataBucket, setDataBucket] = useState(storageDefaults['powerpack']);

  // ─── SUBSCRIPTION PERIOD ───
  const today = new Date();
  const todayStr = today.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
  const oneYearLater = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
  const twoYearsLater = new Date(today.getFullYear() + 2, today.getMonth(), today.getDate());
  const oneYearStr = oneYearLater.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
  const twoYearsStr = twoYearsLater.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });

  const periodOptions = [
    `Current Academic Year (ends March 2026)`,
    `1 Year from today (${todayStr} - ${oneYearStr})`,
    `2 Years from today (${todayStr} - ${twoYearsStr})`,
    'Custom',
  ];
  const [subscriptionPeriod, setSubscriptionPeriod] = useState(periodOptions[0]);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  // ─── DEMO PERIOD & BILLING ───
  const [demoPeriod, setDemoPeriod] = useState('30 Days');
  const [demoStartDate, setDemoStartDate] = useState('');
  const [billingStartDate, setBillingStartDate] = useState('');
  const [billTo, setBillTo] = useState<'organisation' | 'school'>('organisation');
  const [finalPrice, setFinalPrice] = useState('');
  const [perSchoolConfig, setPerSchoolConfig] = useState([
    { name: 'School 1', students: '500', storage: '15', modules: 'All' },
    { name: 'School 2', students: '300', storage: '10', modules: 'Core + Pro' },
  ]);

  // SMS Pack optional student add-on
  const [addStudentLicenses, setAddStudentLicenses] = useState(false);
  const [addonStudentCount, setAddonStudentCount] = useState(0);
  const [addonPeriod, setAddonPeriod] = useState(periodOptions[0]);

  // ─── MODULE EXPANSION & RBAC ───
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [subModuleToggles, setSubModuleToggles] = useState<Record<string, Record<string, boolean>>>({});
  const [moduleRBAC, setModuleRBAC] = useState<Record<string, Record<string, boolean>>>({});

  const getSubModuleState = (mod: string, sub: string) => subModuleToggles[mod]?.[sub] ?? true;
  const toggleSubModule = (mod: string, sub: string) => {
    setSubModuleToggles(prev => ({
      ...prev,
      [mod]: { ...prev[mod], [sub]: !(prev[mod]?.[sub] ?? true) },
    }));
  };
  const getRBACState = (mod: string, role: string) => moduleRBAC[mod]?.[role] ?? false;
  const toggleRBAC = (mod: string, role: string) => {
    setModuleRBAC(prev => ({
      ...prev,
      [mod]: { ...prev[mod], [role]: !(prev[mod]?.[role] ?? false) },
    }));
  };

  // ─── MODULE TOGGLES ───
  const allModuleNames = [
    'Dashboard', 'Student Management', 'Staff Management', 'Fee Management',
    'Attendance', 'Timetable', 'Parent Portal', 'Student Portal',
    'Communication / Chat', 'Online Payment', 'Enquiry / Admission', 'Homework / Assignments',
    'Transport Management', 'Visitor Management', 'Library',
    'Examination & Report Cards', 'HR & Payroll', 'Leave Management', 'Certificates',
    'Canteen Management', 'SQAAF / Quality Assessment', 'Inventory Management', 'Hostel Management',
    'Alumni Management', 'Advanced Analytics', 'Custom Reports Builder',
    'API Access', 'White Label Branding',
  ];

  const coreModules = ['Dashboard', 'Student Management', 'Staff Management', 'Fee Management', 'Attendance', 'Timetable', 'Parent Portal', 'Student Portal', 'Communication / Chat', 'Online Payment', 'Enquiry / Admission', 'Homework / Assignments'];
  const proModules = ['Transport Management', 'Visitor Management', 'Library', 'Examination & Report Cards', 'HR & Payroll', 'Leave Management', 'Certificates', 'Canteen Management'];
  const entModules = ['SQAAF / Quality Assessment', 'Inventory Management', 'Hostel Management', 'Alumni Management', 'Advanced Analytics', 'Custom Reports Builder', 'API Access', 'White Label Branding'];

  // REMARK 3: Default modules match the default plan (powerpack = all enabled)
  const [modules, setModules] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    allModuleNames.forEach(m => { init[m] = true; });
    return init;
  });

  // ─── SUPPORT OPTIONS ───
  const supportChannels = [
    { id: 'inbuilt-chat', name: 'In-built Chat Support', desc: 'Text chat within ERP', icon: MessageSquare },
    { id: 'live-agent', name: 'Chat with Live Agent', desc: 'Human support agent', icon: Headphones },
    { id: 'ai-chat', name: 'AI-Powered Chat Support', desc: 'Conversational AI bot', icon: Bot },
    { id: 'whatsapp', name: 'WhatsApp Support', desc: 'WhatsApp messaging', icon: MessageSquare },
    { id: 'email', name: 'Email Support', desc: 'Email ticket support', icon: Mail },
    { id: 'phone', name: 'Phone Call Support', desc: 'Direct phone support', icon: Phone },
    { id: 'gmeet', name: 'Google Meet Support', desc: 'Video call support', icon: Video },
  ];

  // Determine which support channels are included (locked ON) based on tier
  const getIncludedSupport = (): string[] => {
    if (skuType === 'sms-pack') {
      if (selectedPlan === 'starter') return ['inbuilt-chat'];
      if (selectedPlan === 'professional') return ['inbuilt-chat', 'live-agent'];
      if (selectedPlan === 'enterprise') return ['inbuilt-chat', 'live-agent', 'ai-chat', 'whatsapp', 'email', 'phone', 'gmeet'];
    } else {
      if (selectedPlan === 'standard') return ['inbuilt-chat'];
      if (selectedPlan === '360') return ['inbuilt-chat', 'live-agent'];
      if (selectedPlan === 'powerpack') return ['inbuilt-chat', 'live-agent', 'ai-chat', 'whatsapp', 'email', 'phone', 'gmeet'];
    }
    return ['inbuilt-chat'];
  };

  const includedSupport = getIncludedSupport();
  const allSupportUnlimited = includedSupport.length === supportChannels.length;

  // REMARK 4: Default support toggles to ONLY tier-included channels (no 7-day trial)
  const [supportToggles, setSupportToggles] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    const defaultIncluded = getIncludedSupport();
    supportChannels.forEach(c => { init[c.id] = defaultIncluded.includes(c.id); });
    return init;
  });

  // When plan changes, reset limits to defaults AND auto-set module toggles
  const handlePlanChange = (planId: string) => {
    setSelectedPlan(planId);
    setStorage(storageDefaults[planId] ?? 10);
    setDataBucket(storageDefaults[planId] ?? 10);
    setMaxStaff(staffDefaults[planId] ?? 100);
    setMaxStudents(studentDefaults[planId] ?? 0);

    // ─── REMARK 3: Auto-set module toggles based on plan ───
    const newModules: Record<string, boolean> = {};
    const standardExcluded = ['Transport Management', 'HR & Payroll', 'Canteen Management', 'Alumni Management'];

    if (skuType === 'sms-students') {
      if (planId === 'standard') {
        // Standard: core + pro enabled EXCEPT excluded ones
        allModuleNames.forEach(m => {
          if (standardExcluded.includes(m)) {
            newModules[m] = false;
          } else if (coreModules.includes(m) || proModules.includes(m)) {
            newModules[m] = true;
          } else {
            newModules[m] = false;
          }
        });
      } else {
        // 360 and Power Pack: ALL modules enabled
        allModuleNames.forEach(m => { newModules[m] = true; });
      }
    } else {
      // SMS Pack tiers
      if (planId === 'starter') {
        // Starter: only core modules checked
        allModuleNames.forEach(m => { newModules[m] = coreModules.includes(m); });
      } else if (planId === 'professional') {
        // Professional: core + pro
        allModuleNames.forEach(m => { newModules[m] = coreModules.includes(m) || proModules.includes(m); });
      } else {
        // Enterprise: all modules
        allModuleNames.forEach(m => { newModules[m] = true; });
      }
    }
    setModules(newModules);

    // ─── REMARK 4: Auto-set support toggles based on plan ───
    const newSupport: Record<string, boolean> = {};
    let included: string[] = ['inbuilt-chat'];
    if (skuType === 'sms-pack') {
      if (planId === 'starter') included = ['inbuilt-chat'];
      else if (planId === 'professional') included = ['inbuilt-chat', 'live-agent'];
      else if (planId === 'enterprise') included = ['inbuilt-chat', 'live-agent', 'ai-chat', 'whatsapp', 'email', 'phone', 'gmeet'];
    } else {
      if (planId === 'standard') included = ['inbuilt-chat'];
      else if (planId === '360') included = ['inbuilt-chat', 'live-agent'];
      else if (planId === 'powerpack') included = ['inbuilt-chat', 'live-agent', 'ai-chat', 'whatsapp', 'email', 'phone', 'gmeet'];
    }
    supportChannels.forEach(c => { newSupport[c.id] = included.includes(c.id); });
    setSupportToggles(newSupport);
  };

  // When SKU type changes, pick the best default tier
  const handleSkuChange = (sku: 'sms-pack' | 'sms-students') => {
    setSkuType(sku);
    if (sku === 'sms-pack') {
      handlePlanChange('enterprise');
      setAddStudentLicenses(false);
      setAddonStudentCount(0);
    } else {
      handlePlanChange('powerpack');
    }
  };

  // Get excluded modules for current tier
  const excludedModules: string[] = (skuType === 'sms-students' && 'excludedModules' in currentTier)
    ? (currentTier as typeof smsStudentTiers[0]).excludedModules
    : [];

  const isModuleExcluded = (name: string) => excludedModules.includes(name);

  const toggleModule = (name: string) => {
    if (coreModules.includes(name)) return;
    if (isModuleExcluded(name)) return;
    setModules(p => ({ ...p, [name]: !p[name] }));
  };

  const enabledCount = Object.entries(modules).filter(([name, on]) => on && !isModuleExcluded(name)).length;

  const toggleSupport = (id: string) => {
    if (includedSupport.includes(id)) return; // locked ON
    setSupportToggles(p => ({ ...p, [id]: !p[id] }));
  };

  // ─── AUTH METHOD CONFIG ───
  const [authMethods, setAuthMethods] = useState<Record<string, boolean>>({
    'email': true, 'phone': true, 'google': false, 'microsoft': false,
  });
  const toggleAuth = (id: string) => {
    if (id === 'email') return; // Email is mandatory
    setAuthMethods(p => ({ ...p, [id]: !p[id] }));
  };

  // Shared input style
  const inputCls = `w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-slate-300 ${theme.highlight}`;
  const labelCls = `text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`;

  return (
    <div className="space-y-6">
      <SectionTitle title="Subscription Plan & Modules" subtitle="Choose your SKU type, plan tier, and customize limits" theme={theme} />

      {/* Preschool notice */}
      {institutionType === 'preschool' && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-start gap-2">
          <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-800">
            <strong>Preschool Mode:</strong> Some modules are not available for preschool (Board Exams, LMS Advanced, SQAAF). Preschool-specific modules will be auto-enabled.
          </p>
        </div>
      )}

      {/* ── SECTION 1: SKU TYPE SELECTION ── */}
      <div>
        <SectionTitle title="Step 1: Choose SKU Type" subtitle="Select the licensing model for this school" theme={theme} />
        <div className="grid grid-cols-2 gap-4">
          {/* SMS Pack card */}
          <button
            onClick={() => handleSkuChange('sms-pack')}
            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all text-left ${
              skuType === 'sms-pack'
                ? `border-blue-400 ${theme.cardBg} ring-2 ring-blue-200`
                : `${theme.border} ${theme.cardBg} hover:border-slate-300`
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${skuType === 'sms-pack' ? 'bg-blue-100' : theme.secondaryBg}`}>
                <Package size={20} className={skuType === 'sms-pack' ? 'text-blue-600' : theme.iconColor} />
              </div>
              <div>
                <span className={`text-sm font-bold ${theme.highlight} block`}>SMS Pack</span>
                <span className={`text-[10px] ${theme.iconColor}`}>School Management Software</span>
              </div>
              {skuType === 'sms-pack' && <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold">SELECTED</span>}
            </div>
            <p className={`text-[11px] ${theme.iconColor} leading-relaxed`}>
              Software-only subscription. Manage staff, operations, fees, and more. No {studentLabel.toLowerCase()} licenses included by default.
            </p>
          </button>

          {/* SMS + Students card */}
          <button
            onClick={() => handleSkuChange('sms-students')}
            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all text-left ${
              skuType === 'sms-students'
                ? `border-emerald-400 ${theme.cardBg} ring-2 ring-emerald-200`
                : `${theme.border} ${theme.cardBg} hover:border-slate-300`
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${skuType === 'sms-students' ? 'bg-emerald-100' : theme.secondaryBg}`}>
                <GraduationCap size={20} className={skuType === 'sms-students' ? 'text-emerald-600' : theme.iconColor} />
              </div>
              <div>
                <span className={`text-sm font-bold ${theme.highlight} block`}>SMS + {studentLabel}</span>
                <span className={`text-[10px] ${theme.iconColor}`}>Complete School Management</span>
              </div>
              {skuType === 'sms-students' && <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">SELECTED</span>}
            </div>
            <p className={`text-[11px] ${theme.iconColor} leading-relaxed`}>
              Complete school management with {studentLabel.toLowerCase()} licenses. Includes all modules plus {studentLabel.toLowerCase()} portal, parent portal, and {studentLabel.toLowerCase()}-specific features.
            </p>
          </button>
        </div>
      </div>

      {/* ── SECTION 2: PLAN TIER SELECTION (SKU-specific tiers) ── */}
      {/* REMARK 2: Compact selector buttons + full detail card for selected tier only */}
      <div>
        <SectionTitle
          title="Step 2: Select Plan Tier"
          subtitle={skuType === 'sms-pack' ? 'Software-only tiers (blue) — no student licenses included' : `SMS+Students tiers (emerald/gold) — includes ${studentLabel.toLowerCase()} licenses`}
          theme={theme}
        />

        {/* Compact tier selector buttons */}
        <div className="flex gap-3 mb-4">
          {activeTiers.map(tier => {
            const isSelected = tier.id === selectedPlan;
            return (
              <button key={tier.id} onClick={() => handlePlanChange(tier.id)}
                className={`flex-1 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all text-center ${
                  isSelected
                    ? `${tier.colorBorder} ${tier.colorBg} ring-2 ${tier.colorRing} shadow-sm`
                    : `${theme.border} ${theme.cardBg} hover:border-slate-300`
                }`}>
                <div className="flex items-center justify-center gap-2">
                  <div className={`w-3 h-3 rounded-full border-2 ${isSelected ? `${tier.colorDot} border-transparent` : theme.border}`} />
                  <span className={`text-sm font-bold ${isSelected ? theme.highlight : theme.iconColor}`}>{tier.name}</span>
                </div>
                <div className="flex items-baseline justify-center gap-1 mt-1">
                  <span className={`text-xs ${theme.iconColor}`}>&#8377;</span>
                  <span className={`text-sm font-bold ${theme.primaryText}`}>{tierPrices[tier.id]}</span>
                  <span className={`text-[10px] ${theme.iconColor}`}>/yr</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Full detail card for selected tier ONLY */}
        <div className={`p-5 rounded-2xl border-2 ${currentTier.colorBorder} ${theme.cardBg} ring-2 ${currentTier.colorRing}`}>
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-3 h-3 rounded-full ${currentTier.colorDot}`} />
            <span className={`text-base font-bold ${theme.highlight}`}>{currentTier.name}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${currentTier.colorBadge}`}>SELECTED</span>
          </div>

          {/* Editable price */}
          <div className="flex items-baseline gap-1 mb-2">
            <span className={`text-lg font-bold ${theme.primaryText}`}>&#8377;</span>
            <input
              type="text"
              value={tierPrices[currentTier.id]}
              onChange={e => updateTierPrice(currentTier.id, e.target.value)}
              className={`text-lg font-bold ${theme.primaryText} bg-transparent border-b border-dashed border-slate-300 focus:border-solid focus:border-blue-400 outline-none w-28 transition-all`}
            />
            <span className={`text-xs ${theme.iconColor}`}>/yr</span>
          </div>

          <p className={`text-xs ${theme.iconColor} mt-1`}>{currentTier.desc}</p>
          <p className={`text-xs ${theme.iconColor}`}>{currentTier.modules} modules &middot; {currentTier.storage}</p>

          {/* SMS-S specific info */}
          {skuType === 'sms-students' && 'students' in currentTier && (
            <div className="mt-3 pt-3 border-t border-dashed border-slate-200 flex gap-6">
              <p className={`text-xs ${theme.iconColor}`}><strong>{(currentTier as typeof smsStudentTiers[0]).students}</strong> {studentLabel.toLowerCase()}</p>
              <p className={`text-xs ${theme.iconColor}`}><strong>{currentTier.staff}</strong> staff</p>
            </div>
          )}

          {/* SMS Pack info */}
          {skuType === 'sms-pack' && (
            <div className="mt-3 pt-3 border-t border-dashed border-slate-200 flex gap-6">
              <p className={`text-xs ${theme.iconColor}`}><strong>0</strong> {studentLabel.toLowerCase()} (SMS Pack)</p>
              <p className={`text-xs ${theme.iconColor}`}><strong>{currentTier.staff}</strong> staff</p>
            </div>
          )}

          {/* Power Pack AI features badge */}
          {'aiFeatures' in currentTier && (currentTier as typeof smsStudentTiers[2]).aiFeatures && (
            <div className="mt-3 pt-3 border-t border-dashed border-amber-200">
              <div className="flex items-center gap-1 mb-2">
                <Sparkles size={12} className="text-amber-500" />
                <span className="text-xs font-bold text-amber-600">AI Features Included</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {(currentTier as typeof smsStudentTiers[2]).aiFeatures!.map((f: string) => (
                  <span key={f} className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-700 font-medium">{f}</span>
                ))}
              </div>
            </div>
          )}

          {/* Excluded modules warning for Standard */}
          {'excludedModules' in currentTier && (currentTier as typeof smsStudentTiers[0]).excludedModules.length > 0 && (
            <div className="mt-3 pt-3 border-t border-dashed border-slate-200">
              <p className="text-[10px] text-red-500 font-medium">Not included: {(currentTier as typeof smsStudentTiers[0]).excludedModules.join(', ')}</p>
            </div>
          )}
        </div>
      </div>

      {/* ── SECTION 3: EDITABLE LIMITS & CUSTOMIZATION ── */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
        <SectionTitle
          title="Customizable Limits"
          subtitle={`Defaults based on ${currentTier.name} plan -- all values editable by Super Admin`}
          theme={theme}
        />

        {/* SMS Pack limits */}
        {skuType === 'sms-pack' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={labelCls}>Storage (GB)</label>
                <input type="number" min={1} value={storage} onChange={e => setStorage(Number(e.target.value))} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Staff / Employees</label>
                <input type="number" min={1} value={maxStaff === 99999 ? '' : maxStaff}
                  placeholder={maxStaff === 99999 ? 'Unlimited' : ''}
                  onChange={e => setMaxStaff(e.target.value === '' ? 99999 : Number(e.target.value))}
                  className={inputCls} />
                {maxStaff === 99999 && <p className={`text-[10px] ${theme.iconColor} mt-1`}>Unlimited (leave blank for unlimited)</p>}
              </div>
              <div>
                <label className={labelCls}>{studentLabel}</label>
                <div className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-sm ${theme.iconColor}`}>
                  0 (SMS Pack -- no {studentLabel.toLowerCase()} licenses)
                </div>
                <p className={`text-[10px] ${theme.iconColor} mt-1`}>Super Admin can add {studentLabel.toLowerCase()} licenses for a dedicated period</p>
              </div>
            </div>

            {/* Optional: Add Student Licenses */}
            <div className={`rounded-xl border-2 border-dashed ${addStudentLicenses ? 'border-blue-300 bg-blue-50/50' : `${theme.border}`} p-4`}>
              <button
                onClick={() => setAddStudentLicenses(!addStudentLicenses)}
                className="flex items-center gap-2 cursor-pointer w-full text-left"
              >
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${addStudentLicenses ? 'bg-blue-500 border-blue-500' : theme.border}`}>
                  {addStudentLicenses && <Check size={12} className="text-white" />}
                </div>
                <span className={`text-xs font-bold ${theme.highlight}`}>Add {studentLabel} Licenses (Optional)</span>
                <Info size={12} className={theme.iconColor} />
              </button>
              {addStudentLicenses && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Number of {studentLabel}</label>
                    <input type="number" min={1} value={addonStudentCount || ''} placeholder="e.g. 500"
                      onChange={e => setAddonStudentCount(Number(e.target.value))}
                      className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Subscription Period</label>
                    <select value={addonPeriod} onChange={e => setAddonPeriod(e.target.value)} className={inputCls}>
                      {periodOptions.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="col-span-2 bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-start gap-2">
                    <Info size={12} className="text-blue-500 mt-0.5 shrink-0" />
                    <p className="text-[10px] text-blue-700">
                      Adding {studentLabel.toLowerCase()} licenses converts this to <strong>SMS + {studentLabel}</strong> pricing for the selected period.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SMS + Students limits */}
        {skuType === 'sms-students' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Storage (GB)</label>
                <input type="number" min={1} value={storage} onChange={e => setStorage(Number(e.target.value))} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Data Bucket (GB)</label>
                <input type="number" min={1} value={dataBucket} onChange={e => setDataBucket(Number(e.target.value))} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Max {studentLabel}</label>
                <input type="number" min={1} value={maxStudents === 99999 ? '' : maxStudents}
                  placeholder={maxStudents === 99999 ? 'Unlimited' : ''}
                  onChange={e => setMaxStudents(e.target.value === '' ? 99999 : Number(e.target.value))}
                  className={inputCls} />
                {maxStudents === 99999 && <p className={`text-[10px] ${theme.iconColor} mt-1`}>Unlimited (leave blank for unlimited)</p>}
              </div>
              <div>
                <label className={labelCls}>Max Staff / Employees</label>
                <input type="number" min={1} value={maxStaff === 99999 ? '' : maxStaff}
                  placeholder={maxStaff === 99999 ? 'Unlimited' : ''}
                  onChange={e => setMaxStaff(e.target.value === '' ? 99999 : Number(e.target.value))}
                  className={inputCls} />
                {maxStaff === 99999 && <p className={`text-[10px] ${theme.iconColor} mt-1`}>Unlimited (leave blank for unlimited)</p>}
              </div>
            </div>
          </div>
        )}

        {/* ── SUBSCRIPTION PERIOD (shared for both SKU types) ── */}
        <div className="mt-4">
          <label className={labelCls}>Subscription Period</label>
          <select value={subscriptionPeriod} onChange={e => setSubscriptionPeriod(e.target.value)} className={inputCls}>
            {periodOptions.map(o => <option key={o} value={o}>{o}</option>)}
          </select>

          {/* Custom date range picker */}
          {subscriptionPeriod === 'Custom' && (
            <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Start Date</label>
                <input type="date" value={customStartDate} onChange={e => setCustomStartDate(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>End Date</label>
                <input type="date" value={customEndDate} onChange={e => setCustomEndDate(e.target.value)} className={inputCls} />
              </div>
            </div>
          )}
        </div>

        {/* ── DEMO PERIOD & BILLING START DATE ── */}
        <div className={`mt-4 p-4 rounded-2xl border-2 border-emerald-300 ${theme.cardBg} space-y-3`}>
          <SectionTitle title="Demo Period & Billing" subtitle="Configure trial period and when billing begins — these can differ" theme={theme} />
          <div>
            <label className={labelCls}>Demo Duration</label>
            <div className="grid grid-cols-5 gap-2">
              {['15 Days', '30 Days', '60 Days', '6 Months', 'No Demo'].map(opt => (
                <button key={opt} onClick={() => setDemoPeriod(opt)}
                  className={`p-2.5 rounded-xl border-2 text-center cursor-pointer transition-all text-xs font-medium ${
                    demoPeriod === opt ? 'border-emerald-400 bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' : `${theme.border} ${theme.cardBg} ${theme.highlight}`
                  }`}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
          {demoPeriod !== 'No Demo' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Demo Start Date</label>
                <input type="date" value={demoStartDate} onChange={e => setDemoStartDate(e.target.value)} className={inputCls} />
                <p className={`text-[10px] ${theme.iconColor} mt-1`}>When the school starts using the system for trial</p>
              </div>
              <div>
                <label className={labelCls}>Billing Start Date</label>
                <input type="date" value={billingStartDate} onChange={e => setBillingStartDate(e.target.value)} className={inputCls} />
                <p className={`text-[10px] ${theme.iconColor} mt-1`}>When paid subscription begins (can differ from demo start)</p>
              </div>
            </div>
          )}
          {demoPeriod === 'No Demo' && (
            <div>
              <label className={labelCls}>Billing Start Date</label>
              <input type="date" value={billingStartDate} onChange={e => setBillingStartDate(e.target.value)} className={inputCls} />
              <p className={`text-[10px] ${theme.iconColor} mt-1`}>Subscription billing begins immediately from this date</p>
            </div>
          )}
          <div className={`p-3 rounded-xl ${theme.accentBg} flex items-start gap-2`}>
            <AlertTriangle size={12} className="text-amber-500 shrink-0 mt-0.5" />
            <p className={`text-[10px] ${theme.iconColor}`}>
              <strong>Demo vs Billing:</strong> During demo, all selected plan features are available. Billing auto-starts after demo period ends unless manually extended by Super Admin. Schools can be converted to paid at any time during the demo.
            </p>
          </div>
        </div>

        {/* ── BILLING CONFIGURATION ── */}
        <div className={`mt-4 p-4 rounded-2xl border-2 border-blue-300 ${theme.cardBg} space-y-3`}>
          <SectionTitle title="Billing Configuration" subtitle="Set billing entity, final negotiated price, and per-school allocations" theme={theme} />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Bill To</label>
              <div className="flex gap-2">
                <button onClick={() => setBillTo('organisation')}
                  className={`flex-1 p-2.5 rounded-xl border-2 text-center cursor-pointer text-xs font-medium transition-all ${
                    billTo === 'organisation' ? 'border-blue-400 bg-blue-50 text-blue-700 ring-1 ring-blue-200' : `${theme.border} ${theme.cardBg} ${theme.highlight}`
                  }`}>Organisation</button>
                <button onClick={() => setBillTo('school')}
                  className={`flex-1 p-2.5 rounded-xl border-2 text-center cursor-pointer text-xs font-medium transition-all ${
                    billTo === 'school' ? 'border-blue-400 bg-blue-50 text-blue-700 ring-1 ring-blue-200' : `${theme.border} ${theme.cardBg} ${theme.highlight}`
                  }`}>Individual School</button>
              </div>
              <p className={`text-[10px] ${theme.iconColor} mt-1`}>
                {billTo === 'organisation' ? 'Single invoice to the trust/org for all schools' : 'Separate invoice per school'}
              </p>
            </div>
            <div>
              <label className={labelCls}>Final Negotiated Price (&#8377;/yr)</label>
              <input type="text" value={finalPrice} placeholder={`e.g. ${tierPrices[currentTier.id]}`}
                onChange={e => setFinalPrice(e.target.value.replace(/[^0-9,]/g, ''))}
                className={inputCls} />
              <p className={`text-[10px] ${theme.iconColor} mt-1`}>Super Admin sets final price per negotiation — overrides tier default</p>
            </div>
          </div>

          {/* Per-School Configuration for multi-school */}
          <div className={`p-3 rounded-xl ${theme.secondaryBg} space-y-2`}>
            <p className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>Per-School Allocation</p>
            <p className={`text-[9px] ${theme.iconColor}`}>Each school in the same org can have different module access, student limits, and storage</p>
            <div className="space-y-2">
              {perSchoolConfig.map((sc, idx) => (
                <div key={idx} className={`grid grid-cols-4 gap-2 p-2 rounded-lg ${theme.cardBg} border ${theme.border}`}>
                  <div>
                    <label className={`text-[9px] ${theme.iconColor} font-bold`}>School</label>
                    <input type="text" value={sc.name}
                      onChange={e => setPerSchoolConfig(prev => prev.map((s, i) => i === idx ? { ...s, name: e.target.value } : s))}
                      className={`w-full px-2 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight}`} />
                  </div>
                  <div>
                    <label className={`text-[9px] ${theme.iconColor} font-bold`}>Students</label>
                    <input type="text" value={sc.students}
                      onChange={e => setPerSchoolConfig(prev => prev.map((s, i) => i === idx ? { ...s, students: e.target.value } : s))}
                      className={`w-full px-2 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight}`} />
                  </div>
                  <div>
                    <label className={`text-[9px] ${theme.iconColor} font-bold`}>Storage (GB)</label>
                    <input type="text" value={sc.storage}
                      onChange={e => setPerSchoolConfig(prev => prev.map((s, i) => i === idx ? { ...s, storage: e.target.value } : s))}
                      className={`w-full px-2 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight}`} />
                  </div>
                  <div>
                    <label className={`text-[9px] ${theme.iconColor} font-bold`}>Module Tier</label>
                    <select value={sc.modules}
                      onChange={e => setPerSchoolConfig(prev => prev.map((s, i) => i === idx ? { ...s, modules: e.target.value } : s))}
                      className={`w-full px-2 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight}`}>
                      <option>All</option><option>Core + Pro</option><option>Core Only</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setPerSchoolConfig(prev => [...prev, { name: `School ${prev.length + 1}`, students: '500', storage: '15', modules: 'All' }])}
              className={`w-full mt-2 flex items-center justify-center gap-1 p-2 rounded-xl border-2 border-dashed ${theme.border} ${theme.iconColor} text-[10px] font-bold hover:bg-slate-50 transition-colors`}>
              <Plus size={10} /> Add School
            </button>
          </div>
        </div>

        <div className={`${theme.secondaryBg} rounded-xl p-3 flex items-start gap-2 mt-3`}>
          <Info size={12} className={`${theme.iconColor} mt-0.5 shrink-0`} />
          <p className={`text-[10px] ${theme.iconColor}`}>
            All values are customizable by Super Admin per school requirements. Defaults are set based on the selected plan tier.
          </p>
        </div>

        <p className={`text-[10px] ${theme.iconColor} mt-3`}>{enabledCount} modules enabled</p>
      </div>

      {/* ── SECTION 3.5: SUPPORT CONFIGURATION ── */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
        <SectionTitle
          title="Support Configuration"
          subtitle={`Configure support channels for the ${currentTier.name} plan`}
          theme={theme}
        />

        {/* REMARK 4: Tier-based defaults notice (no 7-day trial) */}
        {!allSupportUnlimited && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-start gap-2 mb-4">
            <Info size={12} className="text-blue-500 mt-0.5 shrink-0" />
            <p className="text-[10px] text-blue-700">
              <strong>Tier-based defaults:</strong> Only channels included in your {currentTier.name} plan are enabled by default. Additional channels are available as paid add-ons. Super Admin can enable add-on channels.
            </p>
          </div>
        )}

        {allSupportUnlimited && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-start gap-2 mb-4">
            <CheckCircle size={12} className="text-emerald-500 mt-0.5 shrink-0" />
            <p className="text-[10px] text-emerald-700">
              <strong>{currentTier.name} plan:</strong> ALL support channels included unlimited. No add-on required.
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          {supportChannels.map(ch => {
            const isIncluded = includedSupport.includes(ch.id);
            const isOn = isIncluded || supportToggles[ch.id];
            const IconComp = ch.icon;
            return (
              <div key={ch.id}
                className={`flex items-center justify-between p-3 rounded-xl border ${
                  isIncluded ? 'border-emerald-200 bg-emerald-50/50' : `${theme.border} ${theme.secondaryBg}`
                }`}
              >
                <div className="flex items-center gap-2">
                  <IconComp size={14} className={isIncluded ? 'text-emerald-500' : theme.iconColor} />
                  <div>
                    <span className={`text-xs font-medium ${theme.highlight}`}>{ch.name}</span>
                    <p className={`text-[9px] ${theme.iconColor}`}>{ch.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isIncluded && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 font-bold">INCLUDED</span>
                  )}
                  {/* REMARK 4: Show Add-on badge for ALL non-included channels (on or off) */}
                  {!isIncluded && !allSupportUnlimited && (
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${isOn ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>ADD-ON</span>
                  )}
                  {isIncluded ? (
                    <Lock size={10} className="text-emerald-400" />
                  ) : (
                    <Toggle on={isOn} onChange={() => toggleSupport(ch.id)} theme={theme} />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Support tier summary */}
        <div className={`${theme.secondaryBg} rounded-xl p-3 mt-4`}>
          <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1`}>Support Summary for {currentTier.name}</p>
          <p className={`text-[10px] ${theme.iconColor}`}>
            {allSupportUnlimited
              ? 'All 7 support channels included unlimited with this plan.'
              : `${includedSupport.length} channel${includedSupport.length !== 1 ? 's' : ''} included free. ${
                  Object.values(supportToggles).filter(Boolean).length - includedSupport.length
                } add-on${Object.values(supportToggles).filter(Boolean).length - includedSupport.length !== 1 ? 's' : ''} enabled.`
            }
          </p>
        </div>

        {/* REMARK 5: Visibility note for other dashboards */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 flex items-start gap-2 mt-3">
          <Eye size={12} className="text-indigo-500 mt-0.5 shrink-0" />
          <p className="text-[10px] text-indigo-700">
            <strong>Dashboard Visibility:</strong> Support configuration is visible to School Admin, Principal, and Trustees dashboards (read-only). Add-on channels require purchase approval from Super Admin.
          </p>
        </div>
      </div>

      {/* ── SECTION 4: MODULE TOGGLES with Sub-Modules & RBAC ── */}
      {[
        { cat: 'Core (All Plans)', list: coreModules, locked: true },
        { cat: skuType === 'sms-pack' ? 'Professional+' : '360+', list: proModules, locked: false },
        { cat: skuType === 'sms-pack' ? 'Enterprise Only' : 'Power Pack', list: entModules, locked: false },
      ].map(cat => (
        <div key={cat.cat} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <SectionTitle title={cat.cat} subtitle="Click any module to configure sub-modules & role access" theme={theme} />
          <div className="space-y-2">
            {cat.list.map(name => {
              const excluded = isModuleExcluded(name);
              const isExpanded = expandedModule === name && modules[name] && !excluded;
              const subs = MODULE_SUBMODULES[name] || [];
              return (
                <div key={name} className="space-y-0">
                  <div className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                    excluded ? 'bg-slate-100 opacity-60' : isExpanded ? `${theme.accentBg} ring-1 ring-slate-300` : theme.secondaryBg
                  }`}
                    onClick={() => !excluded && modules[name] && setExpandedModule(isExpanded ? null : name)}>
                    <div className="flex items-center gap-2">
                      {cat.locked && <Lock size={10} className={theme.iconColor} />}
                      {!excluded && modules[name] && subs.length > 0 && (
                        <ChevronDown size={12} className={`${theme.iconColor} transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      )}
                      <span className={`text-xs font-medium ${excluded ? 'text-slate-400 line-through' : theme.highlight}`}>{name}</span>
                      {excluded && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-100 text-red-500 font-bold ml-1">
                          Not in {currentTier.name} plan
                        </span>
                      )}
                      {!excluded && modules[name] && subs.length > 0 && (
                        <span className={`text-[9px] px-1.5 py-0.5 rounded ${theme.accentBg} ${theme.iconColor} font-medium`}>
                          {subs.filter(s => getSubModuleState(name, s)).length}/{subs.length} sub-modules
                        </span>
                      )}
                    </div>
                    <div onClick={e => e.stopPropagation()}>
                      {excluded ? (
                        <Lock size={10} className="text-slate-300" />
                      ) : (
                        <Toggle on={modules[name]} onChange={() => toggleModule(name)} theme={theme} />
                      )}
                    </div>
                  </div>

                  {/* Expanded: Sub-modules + RBAC */}
                  {isExpanded && subs.length > 0 && (
                    <div className={`ml-6 mr-2 mt-1 mb-2 p-3 rounded-xl border ${theme.border} ${theme.cardBg} space-y-3`}>
                      {/* Sub-module toggles */}
                      <div>
                        <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-2`}>Sub-Modules</p>
                        <div className="flex flex-wrap gap-1.5">
                          {subs.map(sub => (
                            <button key={sub} onClick={() => toggleSubModule(name, sub)}
                              className={`text-[10px] px-2.5 py-1 rounded-lg border cursor-pointer transition-all font-medium ${
                                getSubModuleState(name, sub)
                                  ? `border-emerald-300 bg-emerald-50 text-emerald-700`
                                  : `${theme.border} ${theme.secondaryBg} text-slate-400 line-through`
                              }`}>
                              {getSubModuleState(name, sub) && <Check size={8} className="inline mr-1" />}
                              {sub}
                            </button>
                          ))}
                        </div>
                      </div>
                      {/* RBAC: Stakeholder access */}
                      <div>
                        <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-2`}>Role-Based Access Control</p>
                        <div className="flex flex-wrap gap-1.5">
                          {STAKEHOLDER_ROLES.map(role => (
                            <button key={role} onClick={() => toggleRBAC(name, role)}
                              className={`text-[10px] px-2 py-1 rounded-lg border cursor-pointer transition-all font-medium flex items-center gap-1 ${
                                getRBACState(name, role)
                                  ? `border-blue-300 bg-blue-50 text-blue-700`
                                  : `${theme.border} ${theme.secondaryBg} ${theme.iconColor}`
                              }`}>
                              <div className={`w-3 h-3 rounded-sm flex items-center justify-center ${
                                getRBACState(name, role) ? 'bg-blue-500 text-white' : `border ${theme.border}`
                              }`}>
                                {getRBACState(name, role) && <Check size={8} />}
                              </div>
                              {role}
                            </button>
                          ))}
                        </div>
                        <p className={`text-[9px] ${theme.iconColor} mt-1.5`}>
                          {STAKEHOLDER_ROLES.filter(r => getRBACState(name, r)).length} of {STAKEHOLDER_ROLES.length} roles have access to {name}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* AI Features section — only for Power Pack */}
      {skuType === 'sms-students' && selectedPlan === 'powerpack' && (
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl border-2 border-amber-300 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={16} className="text-amber-500" />
            <SectionTitle title="AI Features (Power Pack Exclusive)" subtitle="All AI features are included and active in Power Pack tier" theme={theme} />
          </div>
          <div className="space-y-2">
            {['AI Timetable Generator', 'AI Question Paper Generator', 'AI Homework Assistance', 'AI Support Bot (Natural Language)', 'AI Planner (Academic Calendar)'].map(name => (
              <div key={name} className="flex items-center justify-between p-3 rounded-xl bg-amber-100/50">
                <div className="flex items-center gap-2">
                  <Sparkles size={10} className="text-amber-500" />
                  <span className="text-xs font-medium text-amber-900">{name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-200 text-amber-700 font-bold">INCLUDED</span>
                  <Lock size={10} className="text-amber-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── SECTION 5: AUTH METHOD CONFIGURATION ── */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
        <div className="flex items-center gap-2 mb-1">
          <Key size={16} className={theme.iconColor} />
          <SectionTitle title="Authentication Methods" subtitle="Configure how users sign in to this school — detailed config available on the Auth page" theme={theme} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { id: 'email', name: 'Email + Password', desc: 'Standard email/password login', icon: Mail, mandatory: true },
            { id: 'phone', name: 'Phone + OTP', desc: 'Mobile number with OTP verification', icon: Phone, mandatory: false },
            { id: 'google', name: 'Google OAuth', desc: 'Sign in with Google account', icon: Users, mandatory: false },
            { id: 'microsoft', name: 'Microsoft OAuth', desc: 'Sign in with Microsoft/Office 365', icon: Users, mandatory: false },
          ].map(method => {
            const isOn = authMethods[method.id];
            const IconComp = method.icon;
            return (
              <div key={method.id}
                className={`flex items-center justify-between p-3 rounded-xl border ${
                  isOn ? 'border-emerald-200 bg-emerald-50/50' : `${theme.border} ${theme.secondaryBg}`
                }`}>
                <div className="flex items-center gap-2">
                  <IconComp size={14} className={isOn ? 'text-emerald-500' : theme.iconColor} />
                  <div>
                    <span className={`text-xs font-medium ${theme.highlight}`}>{method.name}</span>
                    <p className={`text-[9px] ${theme.iconColor}`}>{method.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {method.mandatory && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 font-bold">REQUIRED</span>
                  )}
                  {method.mandatory ? (
                    <Lock size={10} className="text-emerald-400" />
                  ) : (
                    <Toggle on={isOn} onChange={() => toggleAuth(method.id)} theme={theme} />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className={`${theme.secondaryBg} rounded-xl p-3 flex items-start gap-2 mt-3`}>
          <Info size={12} className={`${theme.iconColor} mt-0.5 shrink-0`} />
          <p className={`text-[10px] ${theme.iconColor}`}>
            OAuth providers require configuration (Client ID, Secret) on the <strong>Auth Configuration</strong> page. Only enabled methods will appear on the school&apos;s login screen. Multiple methods can be active simultaneously.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── STEP 4: ROLES & PERMISSIONS ─────────────────────
function Step4Roles({ theme, institutionType }: { theme: Theme; institutionType: string }) {
  const isPreschool = institutionType === 'preschool';

  // Preschool role definitions
  const preschoolRoles: Record<string, boolean> = {
    'School Admin': true, 'Director / Centre Head': true, 'Coordinator': false, 'Caregiver / Facilitator': true,
    'HR Manager': true, 'Accounts Head': true, 'Receptionist': true, 'Transport Head': false,
    'Security / Gatekeeper': true, 'Trustee': false,
    'Bus Nanny / Attendant': false, 'Nutritionist / Diet Planner': false, 'Activity Coordinator': false,
  };
  const preschoolMandatory = ['School Admin', 'Director / Centre Head', 'Caregiver / Facilitator'];
  const preschoolDescs: Record<string, string> = {
    'School Admin': 'Central operations & configuration',
    'Director / Centre Head': 'Child safety, staff-child ratios, parent satisfaction, milestones',
    'Coordinator': 'Scheduling, parent coordination, events (larger preschools only)',
    'Caregiver / Facilitator': 'Daily activity log, meals, naps, milestones, parent reports',
    'HR Manager': 'Employee lifecycle, payroll', 'Accounts Head': 'Monthly fee collection, expenses',
    'Receptionist': 'Front desk, parent drop-off/pickup log', 'Transport Head': 'Routes, vehicles (if bus service)',
    'Security / Gatekeeper': 'Gate, pickup authorization, photo verification', 'Trustee': 'Governance, financials',
    'Bus Nanny / Attendant': 'Child boarding/drop-off log, safety checklist per trip',
    'Nutritionist / Diet Planner': 'Meal planning, allergy management, weekly menus',
    'Activity Coordinator': 'Activity curriculum, milestone planning, event coordination',
  };

  // Regular school role definitions
  const regularRoles: Record<string, boolean> = {
    'School Admin': true, 'Principal': true, 'Vice Principal': true, 'Teacher': true,
    'HR Manager': true, 'Accounts Head': true, 'Receptionist': true, 'Transport Head': true,
    'Security / Gatekeeper': true, 'Trustee': false, 'Librarian': false, 'Lab Coordinator': false,
  };
  const regularMandatory = ['School Admin', 'Principal', 'Teacher'];
  const regularDescs: Record<string, string> = {
    'School Admin': 'Central operations & configuration', 'Principal': 'Academic oversight & approvals',
    'Vice Principal': 'Substitutions, discipline, exams', 'Teacher': 'Attendance, homework, gradebook',
    'HR Manager': 'Employee lifecycle, payroll', 'Accounts Head': 'Fee collection, expenses',
    'Receptionist': 'Front desk, visitors, enquiries', 'Transport Head': 'Routes, vehicles, tracking',
    'Security / Gatekeeper': 'Gate, visitor check-in, pickup', 'Trustee': 'Governance, financials, compliance',
    'Librarian': 'Books, issuing, catalog', 'Lab Coordinator': 'Lab inventory, scheduling',
  };

  const initialRoles = isPreschool ? preschoolRoles : regularRoles;
  const mandatoryRoles = isPreschool ? preschoolMandatory : regularMandatory;
  const roleDescs = isPreschool ? preschoolDescs : regularDescs;

  const [roles, setRoles] = useState<Record<string, boolean>>(initialRoles);
  const [hrAccess, setHrAccess] = useState<Record<string, boolean>>(
    isPreschool
      ? { 'Director / Centre Head': true, 'School Admin': true, 'Trustee': true }
      : { 'Principal': true, 'School Admin': true, 'Vice Principal': false, 'Trustee': true, 'Accounts Head': false }
  );

  const toggleRole = (role: string) => {
    if (mandatoryRoles.includes(role)) return;
    setRoles(p => ({ ...p, [role]: !p[role] }));
  };

  return (
    <div className="space-y-6">
      <SectionTitle title="Stakeholder Roles & Permissions" subtitle="Activate dashboards and define approval workflows" theme={theme} />

      {isPreschool && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 space-y-2">
          <div className="flex items-start gap-2">
            <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-amber-800 font-bold">Preschool Mode — Roles Adapted</p>
              <p className="text-[10px] text-amber-700 mt-1">
                Principal → <strong>Director / Centre Head</strong> &middot;
                Teacher → <strong>Caregiver / Facilitator</strong> &middot;
                Vice Principal → <strong>Coordinator</strong> (optional)
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 ml-5">
            <span className="text-[9px] px-2 py-0.5 rounded bg-red-100 text-red-600 font-bold">Librarian — Removed</span>
            <span className="text-[9px] px-2 py-0.5 rounded bg-red-100 text-red-600 font-bold">Lab Coordinator — Removed</span>
            <span className="text-[9px] px-2 py-0.5 rounded bg-red-100 text-red-600 font-bold">Student Portal — Removed</span>
            <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 font-bold">+ Bus Nanny / Attendant</span>
            <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 font-bold">+ Nutritionist / Diet Planner</span>
            <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 font-bold">+ Activity Coordinator</span>
          </div>
        </div>
      )}

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
function Step5Communication({ theme, institutionType }: { theme: Theme; institutionType: string }) {
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
function Step6Fees({ theme, institutionType }: { theme: Theme; institutionType: string }) {
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

      {institutionType === 'preschool' && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-start gap-2">
          <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0" />
          <p className={`text-xs text-amber-800`}>
            <strong>Preschool Mode:</strong> Preschool fees typically include: Monthly tuition, Admission, Activity Kit, Meals (if provided). Board exam and lab fees are not applicable.
          </p>
        </div>
      )}

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
function Step7HR({ theme, institutionType }: { theme: Theme; institutionType: string }) {
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
function Step8Transport({ theme, institutionType }: { theme: Theme; institutionType: string }) {
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
// Step completion status: 'complete' | 'partial' | 'empty'
type StepCompletionStatus = 'complete' | 'partial' | 'empty';

export default function OnboardingWizard({ theme, onBack }: { theme: Theme; onBack: () => void }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [institutionType, setInstitutionType] = useState('regular');
  const [visitedSteps, setVisitedSteps] = useState<Set<number>>(new Set([1]));
  // Track completion status per step: simulated for blueprint (in production, would check actual form data)
  const [stepStatus, setStepStatus] = useState<Record<number, StepCompletionStatus>>({
    1: 'partial',  // Identity: partially filled (has defaults but user hasn't completed all)
    2: 'partial',  // Academic: has default classes/sections but timing needs review
    3: 'empty',    // Modules: not yet configured
    4: 'empty',    // Roles: not yet configured
    5: 'empty',    // Communication: not yet configured
    6: 'empty',    // Fees: not yet configured
    7: 'empty',    // HR: not yet configured
    8: 'empty',    // Transport: not yet configured
    9: 'empty',    // Review: not applicable until others are done
  });

  useEffect(() => {
    setVisitedSteps(prev => {
      const next = new Set(prev);
      next.add(currentStep);
      return next;
    });
    // When a step is visited for the first time and was 'empty', mark it as 'partial'
    setStepStatus(prev => {
      if (prev[currentStep] === 'empty') {
        return { ...prev, [currentStep]: 'partial' };
      }
      return prev;
    });
  }, [currentStep]);

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1Identity theme={theme} onInstitutionTypeChange={setInstitutionType} />;
      case 2: return <Step2Academic theme={theme} institutionType={institutionType} />;
      case 3: return <Step3Modules theme={theme} institutionType={institutionType} />;
      case 4: return <Step4Roles theme={theme} institutionType={institutionType} />;
      case 5: return <Step5Communication theme={theme} institutionType={institutionType} />;
      case 6: return <Step6Fees theme={theme} institutionType={institutionType} />;
      case 7: return <Step7HR theme={theme} institutionType={institutionType} />;
      case 8: return <Step8Transport theme={theme} institutionType={institutionType} />;
      case 9: return <Step9Review theme={theme} goToStep={setCurrentStep} />;
      default: return <Step1Identity theme={theme} onInstitutionTypeChange={setInstitutionType} />;
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
            const status = stepStatus[step.id] || 'empty';

            // Icon selection based on completion status
            const StatusIcon = isCurrent
              ? step.icon
              : status === 'complete'
              ? CheckCircle
              : status === 'partial'
              ? AlertCircle
              : Circle;

            // Button styling based on completion status
            const btnClass = isCurrent
              ? `${theme.primary} text-white`
              : status === 'complete'
              ? 'bg-emerald-100 text-emerald-700'
              : status === 'partial'
              ? 'bg-amber-100 text-amber-700'
              : `${theme.secondaryBg} ${theme.iconColor}`;

            // Connector line color based on completion status
            const lineColor = status === 'complete'
              ? 'bg-emerald-400'
              : status === 'partial'
              ? 'bg-amber-300'
              : theme.secondaryBg;

            const titleText = isCurrent
              ? 'Current step'
              : status === 'complete'
              ? 'Complete — all fields filled'
              : status === 'partial'
              ? 'Incomplete — some fields filled'
              : 'Not started — no fields filled';

            return (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all ${btnClass}`}
                  title={titleText}
                >
                  <StatusIcon size={10} />
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
          <span className="flex items-center gap-1 text-[9px] text-emerald-600"><CheckCircle size={8} /> Complete</span>
          <span className="flex items-center gap-1 text-[9px] text-amber-600"><AlertCircle size={8} /> Incomplete</span>
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
