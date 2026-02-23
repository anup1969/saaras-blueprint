'use client';

import React, { useState, useEffect } from 'react';
import { type Theme } from '@/lib/themes';
import { StatCard, Toggle } from '@/components/shared';
import {
  Building2, GraduationCap, Users, Shield, MessageSquare,
  Check, ChevronRight, ChevronLeft, ChevronDown, Save, Rocket,
  Upload, Plus, X, Eye, AlertTriangle, CheckCircle, Lock, Circle, AlertCircle,
  Layers, Download, Package, Info,
  Headphones, Bot, Phone, Mail, Video, Sparkles, Key
} from 'lucide-react';

// ─── WIZARD STEPS ─────────────────────────────────────
const steps = [
  { id: 1, label: 'School Identity', icon: Building2, short: 'Identity' },
  { id: 2, label: 'Plan & Modules', icon: Layers, short: 'Modules' },
  { id: 3, label: 'Roles & Permissions', icon: Shield, short: 'Roles' },
  { id: 4, label: 'Review & Launch', icon: Rocket, short: 'Launch' },
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
  // Multi-school (Connected) state — one school per onboarding run
  const [numSchools] = useState(1);
  const [schoolConfigs, setSchoolConfigs] = useState([
    { name: '', type: 'Regular School', board: 'CBSE', shortName: '' },
  ]);
  const [sharedRoles, setSharedRoles] = useState<Record<string, boolean>>({
    'Trustee': true, 'School Admin': true, 'HR Manager': true, 'Accounts Head': true,
    'Principal': false, 'Vice Principal': false, 'Receptionist': false, 'Transport Head': false, 'Security': false,
  });
  const updateSchoolConfig = (idx: number, field: string, value: string) => {
    setSchoolConfigs(prev => prev.map((s, i) => i === idx ? { ...s, [field]: value } : s));
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
                <p className={`text-[10px] ${theme.iconColor}`}>Set up a new trust/org with 1 school. Add more schools later via &quot;Add to Existing Org&quot;.</p>
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
                  School Setup
                </label>
                <p className={`text-xs ${theme.highlight} font-bold`}>1 school per onboarding</p>
                <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>To add more schools, re-run onboarding with &quot;Add to Existing Org&quot;</p>
              </div>
              <FormField label="Registration Number" placeholder="e.g. Trust/Society registration" theme={theme} />
            </div>
          </div>

          {/* Per-School Configuration Cards */}
          <div className={`${theme.cardBg} rounded-2xl border-2 border-indigo-300 p-4 space-y-3`}>
            <SectionTitle title="School Configuration" subtitle="Configure this school — it gets its own database schema, principal, teachers, students, and settings" theme={theme} />
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


// ─── MODULE SUB-MODULES & RBAC DATA ─────────────────
type SubModuleItem =
  | { name: string; type: 'toggle'; default?: boolean; hint?: string }
  | { name: string; type: 'select'; options: string[]; default?: string; hint?: string }
  | { name: string; type: 'multi-select'; options: string[]; default?: string[]; hint?: string };

type ModuleConfig = {
  features: string[];  // basic on/off sub-module toggles (like current)
  decisions?: SubModuleItem[];  // rich sub-module decisions
};

const MODULE_SUBMODULES: Record<string, ModuleConfig> = {
  'Dashboard': {
    features: ['Overview Cards', 'Quick Actions', 'News Board', 'Analytics Widgets'],
  },
  'Student Management': {
    features: ['Admission', 'Profile & Documents', 'Promotion', 'TC / Transfer', 'Sibling Linking', 'Bulk Import', 'Developmental Milestones (Preschool)', 'Daily Activity Log (Preschool)'],
  },
  'Staff Management': {
    features: ['Profile & Documents', 'Joining / Exit', 'ID Card Generation', 'Staff Directory', 'Attendance'],
  },
  'Fee Management': {
    features: ['Fee Structure', 'Collection & Receipts', 'Concessions', 'Late Fee Rules', 'Reports & Ledger', 'Online Payment', 'Reminders'],
  },
  'Attendance': {
    features: ['Student Attendance', 'Staff Attendance', 'Biometric Integration', 'Reports & Analytics', 'Absent Notifications'],
  },
  'Timetable': {
    features: ['Class Timetable', 'Teacher Timetable', 'Substitution Management', 'Period Allocation', 'Conflict Detection', 'Academic Calendar', 'Yearly Planner'],
  },
  'Parent Portal': {
    features: ['Child Dashboard', 'Fee Payments', 'Communication', 'Homework View', 'Attendance View', 'Report Cards'],
  },
  'Student Portal': {
    features: ['Dashboard', 'Homework Submission', 'Timetable View', 'Results', 'Library'],
  },
  'Communication / Chat': {
    features: ['Chat Messaging', 'Announcements', 'Broadcasts', 'Polls & Surveys', 'Notices', 'Circulars & Notices'],
  },
  'Online Payment': {
    features: ['Payment Gateway', 'Payment Tracking', 'Refunds', 'Payment Reports'],
  },
  'Enquiry / Admission': {
    features: ['Lead Capture', 'Follow-up Pipeline', 'Online Form', 'Conversion Tracking', 'Reports'],
  },
  'Homework / Assignments': {
    features: ['Create & Assign', 'Submission Tracking', 'Grading', 'Reports'],
  },
  'Transport Management': {
    features: ['Routes & Stops', 'Vehicle Management', 'GPS Tracking', 'Student Mapping', 'Driver App'],
  },
  'Visitor Management': {
    features: ['Check-in / Check-out', 'Pre-approval', 'Student Pickup', 'Visitor Logs', 'Reports', 'Front Office / Calls Log', 'Courier & Mail Room', 'Appointments', 'Staff Directory'],
  },
  'Library': {
    features: ['Book Catalog', 'Issue / Return', 'Fines', 'Reports', 'Barcode Scan'],
  },
  'Examination & Report Cards': {
    features: ['Exam Schedule', 'Marks Entry', 'Report Card Generation', 'Analytics', 'Board Exam Support'],
  },
  'HR & Payroll': {
    features: ['Payroll Processing', 'Salary Structure', 'Deductions & Tax', 'Pay Slips', 'Compliance Reports', 'Performance Management', 'HR Letters & Documents', 'Offboarding / Exit Management'],
  },
  'Leave Management': {
    features: ['Apply Leave', 'Approval Workflow', 'Leave Balance', 'Holiday Calendar', 'Reports'],
  },
  'Certificates': {
    features: ['TC Generation', 'Bonafide', 'Character Certificate', 'Custom Templates', 'Bulk Print'],
  },
  'Canteen Management': {
    features: ['Menu Management', 'Pre-orders', 'Billing', 'Reports', 'Allergy Register', 'Nutritional Targets & Meal Plans'],
  },
  'SQAAF / Quality Assessment': {
    features: ['Self Assessment', 'Quality Metrics', 'Improvement Plans', 'Reports'],
  },
  'Inventory Management': {
    features: ['Asset Tracking', 'Stock Management', 'Purchase Orders', 'Maintenance Logs'],
  },
  'Hostel Management': {
    features: ['Room Allocation', 'Mess Menu', 'Attendance', 'Fee Integration'],
  },
  'Alumni Management': {
    features: ['Alumni Directory', 'Events', 'Communication', 'Donations'],
  },
  'Advanced Analytics': {
    features: ['Custom Dashboards', 'Trend Analysis', 'Predictive Insights', 'Export Tools'],
  },
  'Custom Reports Builder': {
    features: ['Drag & Drop Builder', 'Scheduled Reports', 'Templates', 'Export Formats'],
    decisions: [
      { name: 'Export Formats', type: 'multi-select', options: ['PDF', 'Excel', 'CSV', 'Google Sheets'], default: ['PDF', 'Excel'] },
    ],
  },
  'API Access': {
    features: ['REST API Keys', 'Webhook Config', 'Rate Limits', 'Documentation'],
  },
  'White Label Branding': {
    features: ['Logo & Colors', 'Custom Domain', 'Email Templates', 'App Branding'],
  },
  'Accounting / Financials': {
    features: ['Expense Management', 'Petty Cash', 'Bank Reconciliation', 'Receipt Management', 'Financial Reports', 'Budget Planning', 'Income & Expenditure'],
  },
  'Discipline Management': {
    features: ['Incident Tracking', 'Conduct Records', 'Warning & Suspension', 'Parent Notifications', 'Behavior Analytics', 'Counselor Referrals'],
  },
  'Compliance & Audit': {
    features: ['CBSE/Board Affiliation', 'RTE Compliance', 'POCSO Compliance', 'Infrastructure Audit', 'Safety Standards', 'Document Repository', 'Audit Trail'],
  },
  'Security Management': {
    features: ['Gate Log', 'Patrol Log', 'Emergency Protocols', 'CCTV Integration', 'Incident Reporting', 'Student Pickup Verification'],
  },
  'Activity & Events Management': {
    features: ['Activity Calendar', 'Event Planning', 'Art Gallery / Portfolio', 'Competition Tracking', 'Achievement Records', 'Annual Day / Sports Day'],
  },
};

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
  const [salesChannel, setSalesChannel] = useState<'direct' | 'reseller'>('direct');
  const [selectedReseller, setSelectedReseller] = useState('');
  const [perSchoolConfig, setPerSchoolConfig] = useState([
    { name: 'School 1', students: '500', storage: '15', modules: 'All' },
    { name: 'School 2', students: '300', storage: '10', modules: 'Core + Pro' },
  ]);

  // SMS Pack optional student add-on
  const [addStudentLicenses, setAddStudentLicenses] = useState(false);
  const [addonStudentCount, setAddonStudentCount] = useState(0);
  const [addonPeriod, setAddonPeriod] = useState(periodOptions[0]);

  // ─── MODULE EXPANSION & SUB-MODULES ───
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [subModuleToggles, setSubModuleToggles] = useState<Record<string, Record<string, boolean>>>({});

  // ─── AI POWER PACK TOGGLES ───
  const AI_FEATURES = [
    { id: 'ai-analytics', label: 'AI-Powered Analytics & Predictions', desc: 'Forecast enrollment, fee defaults, and performance trends using ML models', badge: 'Analytics' },
    { id: 'ai-attendance', label: 'Smart Attendance (Face Recognition)', desc: 'Automated face-scan attendance for students and staff via camera', badge: 'Biometric' },
    { id: 'ai-chatbot', label: 'AI Chatbot for Parents & Students', desc: 'Conversational AI that answers queries 24/7 — fee dues, timetable, results', badge: 'Chatbot' },
    { id: 'ai-reportcard', label: 'Automated Report Card Insights', desc: 'AI-generated narrative comments per student based on marks + attendance + behavior', badge: 'Reports' },
    { id: 'ai-timetable', label: 'AI Timetable Optimization', desc: 'Auto-generate conflict-free timetables factoring room capacity, teacher workload, subject spread', badge: 'Timetable' },
    { id: 'ai-fee-defaulter', label: 'Smart Fee Defaulter Prediction', desc: 'Early warning scores for fee non-payment risk before dues accumulate', badge: 'Fees' },
    { id: 'ai-content', label: 'AI Content Generation', desc: 'Auto-draft homework questions, circular templates, and lesson plan outlines', badge: 'Content' },
  ];
  const [aiToggles, setAiToggles] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    AI_FEATURES.forEach(f => { init[f.id] = true; });
    return init;
  });
  const toggleAiFeature = (id: string) => setAiToggles(prev => ({ ...prev, [id]: !prev[id] }));
  const aiEnabledCount = Object.values(aiToggles).filter(Boolean).length;
  // Whether the current plan includes AI Power Pack
  const isPowerPackPlan = selectedPlan === 'powerpack';
  // Whether user has manually opted into AI add-on (non-powerpack plans)
  const [aiAddonEnabled, setAiAddonEnabled] = useState(false);

  const getSubModuleState = (mod: string, sub: string) => subModuleToggles[mod]?.[sub] ?? true;
  const toggleSubModule = (mod: string, sub: string) => {
    setSubModuleToggles(prev => ({
      ...prev,
      [mod]: { ...prev[mod], [sub]: !(prev[mod]?.[sub] ?? true) },
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
    'Accounting / Financials', 'Discipline Management', 'Compliance & Audit',
    'Security Management', 'Activity & Events Management',
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
    setModules(p => ({ ...p, [name]: !p[name] }));
  };

  const enabledCount = Object.values(modules).filter(Boolean).length;

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

        {/* ── SALES CHANNEL (Reseller Attribution) ── */}
        <div className={`mt-4 p-4 rounded-2xl border-2 border-purple-300 ${theme.cardBg} space-y-3`}>
          <SectionTitle title="Sales Channel" subtitle="How was this school acquired? Direct sale or through a reseller partner" theme={theme} />

          <div>
            <label className={labelCls}>Sales Channel <span className="text-red-500">*</span></label>
            <div className="flex gap-3">
              <button onClick={() => setSalesChannel('direct')}
                className={`flex-1 p-3 rounded-xl border-2 text-center cursor-pointer text-xs font-medium transition-all ${
                  salesChannel === 'direct' ? 'border-emerald-400 bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' : `${theme.border} ${theme.cardBg} ${theme.highlight}`
                }`}>
                <span className="block text-sm font-bold mb-0.5">Direct</span>
                <span className={`text-[10px] ${salesChannel === 'direct' ? 'text-emerald-600' : theme.iconColor}`}>Saaras sales team</span>
              </button>
              <button onClick={() => setSalesChannel('reseller')}
                className={`flex-1 p-3 rounded-xl border-2 text-center cursor-pointer text-xs font-medium transition-all ${
                  salesChannel === 'reseller' ? 'border-purple-400 bg-purple-50 text-purple-700 ring-1 ring-purple-200' : `${theme.border} ${theme.cardBg} ${theme.highlight}`
                }`}>
                <span className="block text-sm font-bold mb-0.5">Reseller</span>
                <span className={`text-[10px] ${salesChannel === 'reseller' ? 'text-purple-600' : theme.iconColor}`}>Channel partner</span>
              </button>
            </div>
          </div>

          {salesChannel === 'reseller' && (
            <div className="space-y-3">
              <div>
                <label className={labelCls}>Select Reseller <span className="text-red-500">*</span></label>
                <select value={selectedReseller} onChange={e => setSelectedReseller(e.target.value)} className={inputCls}>
                  <option value="">Choose a reseller partner...</option>
                  <option value="EduPartners India">EduPartners India (Gujarat &amp; Rajasthan)</option>
                  <option value="SchoolConnect Pro">SchoolConnect Pro (Maharashtra)</option>
                  <option value="LearnBridge">LearnBridge (Karnataka)</option>
                  <option value="EduReach Network">EduReach Network (Tamil Nadu)</option>
                  <option value="SmartSchool Partners">SmartSchool Partners (Delhi NCR)</option>
                  <option value="AcademiX Solutions">AcademiX Solutions (MP &amp; Chhattisgarh)</option>
                  <option value="EduVenture">EduVenture (Rajasthan)</option>
                  <option value="Pioneer Ed">Pioneer Ed (UP)</option>
                </select>
              </div>

              {selectedReseller && (
                <div className={`grid grid-cols-3 gap-3`}>
                  <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
                    <p className={`text-[10px] ${theme.iconColor}`}>Reseller Commission Rate</p>
                    <p className={`text-sm font-bold ${theme.primaryText}`}>
                      {selectedReseller === 'SchoolConnect Pro' ? '20%' :
                       ['EduPartners India', 'EduReach Network', 'AcademiX Solutions'].includes(selectedReseller) ? '18%' : '15%'}
                    </p>
                    <p className={`text-[9px] ${theme.iconColor}`}>Auto-filled from reseller tier</p>
                  </div>
                  <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
                    <p className={`text-[10px] ${theme.iconColor}`}>Partner ID</p>
                    <p className={`text-xs font-bold font-mono ${theme.highlight}`}>
                      {selectedReseller === 'EduPartners India' ? 'RP-2024-047' :
                       selectedReseller === 'SchoolConnect Pro' ? 'RP-2024-012' :
                       selectedReseller === 'LearnBridge' ? 'RP-2024-063' :
                       selectedReseller === 'EduReach Network' ? 'RP-2024-089' :
                       selectedReseller === 'SmartSchool Partners' ? 'RP-2025-003' :
                       selectedReseller === 'AcademiX Solutions' ? 'RP-2024-034' :
                       selectedReseller === 'EduVenture' ? 'RP-2023-091' : 'RP-2024-055'}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
                    <p className={`text-[10px] ${theme.iconColor}`}>Current Schools</p>
                    <p className={`text-xs font-bold ${theme.highlight}`}>
                      {selectedReseller === 'EduPartners India' ? '12' :
                       selectedReseller === 'SchoolConnect Pro' ? '15' :
                       selectedReseller === 'LearnBridge' ? '8' :
                       selectedReseller === 'EduReach Network' ? '10' :
                       selectedReseller === 'SmartSchool Partners' ? '6' :
                       selectedReseller === 'AcademiX Solutions' ? '9' :
                       selectedReseller === 'EduVenture' ? '4' : '3'} schools
                    </p>
                  </div>
                </div>
              )}

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 flex items-start gap-2">
                <Info size={12} className="text-purple-500 mt-0.5 shrink-0" />
                <p className="text-[10px] text-purple-700">
                  <strong>Billing note:</strong> School will be billed directly by Saaras. Commission to reseller is handled separately via the Reseller Management module. Payout processed monthly on the 15th.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className={`${theme.secondaryBg} rounded-xl p-3 flex items-start gap-2 mt-3`}>
          <Info size={12} className={`${theme.iconColor} mt-0.5 shrink-0`} />
          <p className={`text-[10px] ${theme.iconColor}`}>
            All values are customizable by Super Admin per school requirements. Defaults are set based on the selected plan tier.
          </p>
        </div>

        <p className={`text-[10px] ${theme.iconColor} mt-3`}>{enabledCount} modules enabled</p>
      </div>

      {/* Transport & Resource Counts (affects pricing) */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <SectionTitle title="Resource Counts" subtitle="These affect your plan pricing and capacity" theme={theme} />
        <div className="grid grid-cols-3 gap-3">
          <FormField label={`Approx. ${studentLabel} Count`} value="500" type="number" theme={theme} hint="Helps determine plan limits" />
          <FormField label="Approx. Staff Count" value="80" type="number" theme={theme} hint="Teaching + non-teaching" />
          <FormField label="Storage Needed (GB)" value={String(dataBucket)} type="number" theme={theme} hint="Documents, photos, chat" />
        </div>
        <div className="grid grid-cols-3 gap-3 mt-3">
          <FormField label="Transport Students" value="300" type="number" theme={theme} hint="Students using bus service" />
          <FormField label="Transport Routes" value="8" type="number" theme={theme} hint="Number of bus routes" />
          <FormField label="Transport Vehicles" value="8" type="number" theme={theme} hint="Total fleet size" />
        </div>
        <p className={`text-[10px] ${theme.iconColor} mt-2 flex items-center gap-1`}>
          <Info size={10} className="text-blue-500" /> These counts help us recommend the right plan tier and ensure adequate capacity.
        </p>
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

      {/* ── SECTION 4: MODULE TOGGLES — Flat list grouped by functional area ── */}
      {[
        { cat: 'Academic & Students', list: ['Student Management', 'Attendance', 'Timetable', 'Homework / Assignments', 'Examination & Report Cards', 'Discipline Management', 'Library'] },
        { cat: 'Administration', list: ['Staff Management', 'Fee Management', 'Online Payment', 'Accounting / Financials', 'Enquiry / Admission', 'Certificates', 'Visitor Management', 'Security Management'] },
        { cat: 'Communication & Portals', list: ['Communication / Chat', 'Parent Portal', 'Student Portal', 'Activity & Events Management'] },
        { cat: 'HR & Operations', list: ['HR & Payroll', 'Leave Management', 'Transport Management', 'Canteen Management', 'Inventory Management', 'Hostel Management'] },
        { cat: 'Compliance & Analytics', list: ['SQAAF / Quality Assessment', 'Compliance & Audit', 'Advanced Analytics', 'Custom Reports Builder'] },
        { cat: 'Platform & Branding', list: ['Alumni Management', 'API Access', 'White Label Branding', 'Dashboard'] },
      ].map(cat => (
        <div key={cat.cat} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
          <SectionTitle title={cat.cat} subtitle="Click any module to configure sub-modules & role access" theme={theme} />
          <div className="space-y-2">
            {cat.list.map(name => {
              const isExpanded = expandedModule === name && modules[name];
              const subs = MODULE_SUBMODULES[name] || { features: [] };
              return (
                <div key={name} className="space-y-0">
                  <div className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                    isExpanded ? `${theme.accentBg} ring-1 ring-slate-300` : theme.secondaryBg
                  }`}
                    onClick={() => modules[name] && setExpandedModule(isExpanded ? null : name)}>
                    <div className="flex items-center gap-2">
                      {modules[name] && subs.features.length > 0 && (
                        <ChevronDown size={12} className={`${theme.iconColor} transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      )}
                      <span className={`text-xs font-medium ${theme.highlight}`}>{name}</span>
                      {modules[name] && subs.features.length > 0 && (
                        <span className={`text-[9px] px-1.5 py-0.5 rounded ${theme.accentBg} ${theme.iconColor} font-medium`}>
                          {subs.features.filter(s => getSubModuleState(name, s)).length}/{subs.features.length} sub-modules
                          {subs.decisions && subs.decisions.length > 0 && ` \u00b7 ${subs.decisions.length} decisions`}
                        </span>
                      )}
                    </div>
                    <div onClick={e => e.stopPropagation()}>
                      <Toggle on={modules[name]} onChange={() => toggleModule(name)} theme={theme} />
                    </div>
                  </div>

                  {/* Expanded: Sub-modules + Decisions + RBAC */}
                  {isExpanded && subs.features.length > 0 && (
                    <div className={`ml-6 mr-2 mt-1 mb-2 p-3 rounded-xl border ${theme.border} ${theme.cardBg} space-y-3`}>
                      {/* Sub-module feature toggles */}
                      <div>
                        <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-2`}>Sub-Modules</p>
                        <div className="flex flex-wrap gap-1.5">
                          {subs.features.map(sub => (
                            <button key={sub} onClick={() => toggleSubModule(name, sub)}
                              className={`text-[10px] px-2.5 py-1 rounded-lg border cursor-pointer transition-all font-medium ${
                                getSubModuleState(name, sub)
                                  ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                                  : `${theme.border} ${theme.secondaryBg} text-slate-400 line-through`
                              }`}>
                              {getSubModuleState(name, sub) && <Check size={8} className="inline mr-1" />}
                              {sub}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Sub-module decisions (rich options) */}
                      {subs.decisions && subs.decisions.length > 0 && (
                        <div className="border-t border-slate-200 pt-3">
                          <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-2`}>Module Configuration</p>
                          <div className="space-y-2">
                            {subs.decisions.map(decision => (
                              <div key={decision.name} className={`p-2.5 rounded-xl ${theme.secondaryBg}`}>
                                {decision.type === 'toggle' && (
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <span className={`text-[10px] font-bold ${theme.highlight}`}>{decision.name}</span>
                                      {decision.hint && <p className={`text-[9px] ${theme.iconColor}`}>{decision.hint}</p>}
                                    </div>
                                    <Toggle on={decision.default !== false} onChange={() => {}} theme={theme} />
                                  </div>
                                )}
                                {decision.type === 'select' && (
                                  <div>
                                    <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>
                                      {decision.name}
                                    </label>
                                    <select defaultValue={decision.default as string}
                                      className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs outline-none ${theme.highlight}`}>
                                      {decision.options!.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                    </select>
                                    {decision.hint && <p className={`text-[9px] ${theme.iconColor} mt-1`}>{decision.hint}</p>}
                                  </div>
                                )}
                                {decision.type === 'multi-select' && (
                                  <div>
                                    <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>
                                      {decision.name}
                                    </label>
                                    {decision.hint && <p className={`text-[9px] ${theme.iconColor} mb-1.5`}>{decision.hint}</p>}
                                    <div className="flex flex-wrap gap-1.5">
                                      {decision.options!.map(opt => {
                                        const isSelected = (decision.default as string[] || []).includes(opt);
                                        return (
                                          <button key={opt}
                                            className={`text-[10px] px-2.5 py-1 rounded-lg border cursor-pointer transition-all font-medium ${
                                              isSelected
                                                ? 'border-blue-300 bg-blue-50 text-blue-700'
                                                : `${theme.border} ${theme.secondaryBg} ${theme.iconColor}`
                                            }`}>
                                            {isSelected && <Check size={8} className="inline mr-1" />}
                                            {opt}
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}


      {/* ── AI FEATURES (POWER PACK) ── */}
      <div className="relative">
        {/* Gradient border wrapper */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-400 to-purple-500 p-[2px] pointer-events-none" />
        <div className={`relative ${theme.cardBg} rounded-2xl p-5 space-y-4`}>

          {/* Header row */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0 shadow-md">
                <Sparkles size={20} className="text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className={`text-sm font-bold ${theme.highlight}`}>AI Features</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold tracking-wide shadow-sm">
                    POWER PACK
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-bold">
                    PREMIUM ADD-ON
                  </span>
                </div>
                <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>
                  {isPowerPackPlan
                    ? 'Included with your Power Pack (AI) plan. Toggle individual AI capabilities below.'
                    : 'Not included in your current plan. Enable as a premium add-on (+₹50,000/yr) or upgrade to Power Pack.'}
                </p>
              </div>
            </div>

            {/* Plan-aware toggle */}
            {isPowerPackPlan ? (
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[10px] px-2 py-1 rounded-lg bg-amber-100 text-amber-700 font-bold">
                  {aiEnabledCount}/{AI_FEATURES.length} ON
                </span>
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              </div>
            ) : (
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-[10px] font-medium ${theme.iconColor}`}>Add-on</span>
                <Toggle on={aiAddonEnabled} onChange={() => setAiAddonEnabled(!aiAddonEnabled)} theme={theme} />
              </div>
            )}
          </div>

          {/* Pricing / Upgrade nudge (non-powerpack only) */}
          {!isPowerPackPlan && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200">
              <AlertCircle size={12} className="text-amber-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] text-amber-700 font-bold">Add AI Power Pack as an add-on</p>
                <p className="text-[10px] text-amber-600 mt-0.5">
                  +₹50,000/yr on top of your current plan. Or upgrade to{' '}
                  <button onClick={() => {}} className="underline font-bold">Power Pack (₹2,50,000/yr)</button>{' '}
                  to get unlimited students + all AI features in one plan.
                </p>
              </div>
            </div>
          )}

          {/* AI Feature chips — always visible, dimmed when add-on not enabled */}
          <div className={`space-y-2 transition-opacity ${!isPowerPackPlan && !aiAddonEnabled ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
            <p className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>
              Select AI capabilities to activate
            </p>
            <div className="space-y-1.5">
              {AI_FEATURES.map(feature => {
                const isOn = aiToggles[feature.id];
                return (
                  <button
                    key={feature.id}
                    onClick={() => toggleAiFeature(feature.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer text-left transition-all ${
                      isOn
                        ? 'border-amber-300 bg-amber-50/80 ring-1 ring-amber-200'
                        : `${theme.border} ${theme.secondaryBg}`
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                        isOn ? 'bg-amber-500 border-amber-500' : theme.border
                      }`}>
                        {isOn && <Check size={10} className="text-white" />}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`text-xs font-semibold ${isOn ? 'text-amber-800' : theme.highlight}`}>
                            {feature.label}
                          </span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                            isOn ? 'bg-amber-200 text-amber-700' : `${theme.secondaryBg} ${theme.iconColor}`
                          }`}>
                            {feature.badge}
                          </span>
                        </div>
                        <p className={`text-[10px] mt-0.5 ${isOn ? 'text-amber-600' : theme.iconColor}`}>
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                    <Sparkles size={12} className={`shrink-0 ml-2 ${isOn ? 'text-amber-400' : 'text-slate-300'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Summary row */}
          {(isPowerPackPlan || aiAddonEnabled) && (
            <div className={`${theme.secondaryBg} rounded-xl p-3 flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                <Sparkles size={12} className="text-amber-500" />
                <span className={`text-[10px] font-bold ${theme.iconColor}`}>
                  {aiEnabledCount} of {AI_FEATURES.length} AI features active
                </span>
              </div>
              <div className="flex gap-1 flex-wrap justify-end">
                {AI_FEATURES.filter(f => aiToggles[f.id]).map(f => (
                  <span key={f.id} className="text-[9px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-medium">
                    {f.badge}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Footer note */}
          <div className="flex items-start gap-2">
            <Info size={11} className={`${theme.iconColor} mt-0.5 shrink-0`} />
            <p className={`text-[10px] ${theme.iconColor}`}>
              AI features are provisioned at the organisation level. Individual feature access can be restricted per school via School Admin settings.
              Face recognition requires camera hardware at the school premises.
            </p>
          </div>
        </div>
      </div>


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

  // Preschool role definitions — Principal/VP get dual labels, Teacher stays
  const preschoolRoles: Record<string, boolean> = {
    'School Admin': true, 'Principal / Centre Head': true, 'Vice Principal / Coordinator': false, 'Teacher': true,
    'HR Manager': true, 'Accounts Head': true, 'Receptionist': true, 'Transport Head': false,
    'Security / Gatekeeper': true, 'Trustee': false,
    'Bus Nanny / Attendant': false, 'Nutritionist / Diet Planner': false, 'Activity Coordinator': false,
  };
  const preschoolMandatory = ['School Admin', 'Principal / Centre Head', 'Teacher'];
  const preschoolDescs: Record<string, string> = {
    'School Admin': 'Central operations & configuration',
    'Principal / Centre Head': 'Child safety, staff-child ratios, parent satisfaction, milestones',
    'Vice Principal / Coordinator': 'Scheduling, parent coordination, events (larger preschools only)',
    'Teacher': 'Daily activity log, meals, naps, milestones, parent reports',
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
                Principal → <strong>Principal / Centre Head</strong> &middot;
                Vice Principal → <strong>Vice Principal / Coordinator</strong> &middot;
                Teacher stays as <strong>Teacher</strong>
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

      {/* Approval Workflows removed — configured post-onboarding in SSA settings */}
    </div>
  );
}

// ─── CRITICAL FIELD LOCKS SECTION (Step 5) ───────────
function CriticalFieldLocksSection({ theme }: { theme: Theme }) {
  const [authPhone, setAuthPhone] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authRole, setAuthRole] = useState('Trustee');
  const [lockableFields, setLockableFields] = useState<Record<string, boolean>>({
    'Fee Structure Changes': false,
    'Student Profile Deletion': true,
    'Staff Profile Deletion': true,
    'Payment Mode Changes': false,
    'Concession Approval (>25%)': false,
    'Permission/Role Changes': true,
    'Transport Route Deletion': false,
    'Data Export/Migration': false,
    'Audit Log Access': true,
    'Academic Calendar Changes': false,
  });

  const fieldDescriptions: Record<string, string> = {
    'Fee Structure Changes': 'Modify fee heads, amounts',
    'Student Profile Deletion': 'Permanently delete student records',
    'Staff Profile Deletion': 'Permanently delete staff records',
    'Payment Mode Changes': 'Add/remove payment methods',
    'Concession Approval (>25%)': 'Approve large concessions',
    'Permission/Role Changes': 'Modify role permissions',
    'Transport Route Deletion': 'Delete transport routes',
    'Data Export/Migration': 'Export or migrate school data',
    'Audit Log Access': 'View detailed audit logs',
    'Academic Calendar Changes': 'Modify academic calendar dates',
  };

  const lockedCount = Object.values(lockableFields).filter(Boolean).length;

  return (
    <div className={`${theme.cardBg} rounded-2xl border-2 border-rose-300 p-4`}>
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center shrink-0">
          <Lock size={18} className="text-rose-600" />
        </div>
        <div>
          <h3 className={`text-sm font-bold ${theme.highlight}`}>Critical Field Locks (Optional)</h3>
          <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>Lock sensitive SSA fields &mdash; changes will require OTP verification from authorized contact</p>
        </div>
      </div>

      {/* Master Authentication Contact */}
      <div className={`${theme.secondaryBg} rounded-xl p-3 mb-4`}>
        <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-2`}>Master Authentication Contact</p>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>
              Phone (OTP) <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-1">
              <span className={`text-xs ${theme.iconColor} px-2 py-2.5 rounded-l-xl border ${theme.border} ${theme.inputBg}`}>+91</span>
              <input
                type="tel"
                value={authPhone}
                onChange={e => setAuthPhone(e.target.value)}
                placeholder="98765 43210"
                className={`flex-1 px-3 py-2.5 rounded-r-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-slate-300 ${theme.highlight}`}
              />
            </div>
          </div>
          <div>
            <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>
              Email (Backup)
            </label>
            <input
              type="email"
              value={authEmail}
              onChange={e => setAuthEmail(e.target.value)}
              placeholder="trustee@school.edu"
              className={`w-full px-4 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-slate-300 ${theme.highlight}`}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1 block`}>
              Authentication Role <span className="text-red-500">*</span>
            </label>
            <select
              value={authRole}
              onChange={e => setAuthRole(e.target.value)}
              className={`w-full px-4 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none ${theme.highlight}`}
            >
              <option value="Trustee">Trustee</option>
              <option value="Principal">Principal</option>
              <option value="Chairman">Chairman</option>
            </select>
          </div>
          <div className="flex items-end">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-rose-50 border border-rose-200`}>
              <Key size={12} className="text-rose-500" />
              <span className="text-[10px] text-rose-700 font-bold">{lockedCount} fields locked</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lockable Fields */}
      <div className="space-y-1.5">
        <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-2`}>Lockable Fields</p>
        {Object.entries(lockableFields).map(([field, locked]) => (
          <div key={field} className={`flex items-center justify-between p-2.5 rounded-xl ${locked ? 'bg-rose-50 border border-rose-200' : theme.secondaryBg} transition-all`}>
            <div className="flex items-center gap-2.5 flex-1">
              {locked ? <Lock size={12} className="text-rose-500 shrink-0" /> : <Circle size={12} className="text-slate-300 shrink-0" />}
              <div>
                <span className={`text-xs font-medium ${theme.highlight}`}>{field}</span>
                <p className={`text-[10px] ${theme.iconColor}`}>{fieldDescriptions[field]}</p>
              </div>
            </div>
            <button
              onClick={() => setLockableFields(p => ({ ...p, [field]: !p[field] }))}
              className={`w-9 h-5 rounded-full relative transition-colors ${locked ? 'bg-rose-500' : 'bg-gray-300'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${locked ? 'translate-x-4' : 'translate-x-0.5'}`} />
            </button>
          </div>
        ))}
      </div>

      {/* Info Note */}
      <div className="mt-4 flex items-start gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200">
        <Info size={14} className="text-rose-500 mt-0.5 shrink-0" />
        <p className="text-[10px] text-rose-700">
          Locked fields show <span className="font-bold">&#x1f512;</span> in SSA dashboard. Changes require OTP verification from <strong>{authRole}</strong>.
          The {authRole} will receive a 6-digit OTP on their registered phone/email before any locked field can be modified.
        </p>
      </div>
    </div>
  );
}

// ─── STEP 5: REVIEW & LAUNCH ─────────────────────────
function Step9Review({ theme, goToStep }: { theme: Theme; goToStep: (s: number) => void }) {
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    'School basic info entered': true,
    'Academic structure configured': true,
    'Plan selected & modules enabled': true,
    'Sub-module decisions configured': false,
    'Approval workflows set': true,
    'SSA account created': false,
    'Test login as School Admin': false,
    'Test login as SSA': false,
    'Handover document generated': false,
    'Welcome email sent to school': false,
  });

  const sections = [
    { title: 'School Identity', status: 'complete', step: 1, items: ['Delhi Public School, Ahmedabad', 'CBSE \u00b7 K-12 \u00b7 English Medium', 'Academic Year: April - March'] },
    { title: 'Plan & Modules', status: 'complete', step: 2, items: ['Power Pack Plan (\u20b92,50,000/yr)', '27 modules enabled', '100 GB storage, unlimited users', 'Transport: 8 routes, 300 students'] },
    { title: 'Roles & Permissions', status: 'complete', step: 3, items: ['10 stakeholder dashboards active', 'Multi-authority approvals configured post-launch'] },
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
        <StatCard icon={Layers} label="Modules Active" value="27" color="bg-blue-500" theme={theme} />
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
              <button onClick={() => goToStep(s.step)} className={`text-xs ${theme.primaryText} font-bold`}>Edit \u2192</button>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {s.items.map(item => (
                <span key={item} className={`text-[10px] ${item.startsWith('\u26a0') ? 'text-amber-600 font-bold' : theme.iconColor}`}>\u2022 {item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* SSA Account Creation */}
      <div className={`${theme.cardBg} rounded-2xl border-2 border-indigo-300 p-4`}>
        <SectionTitle title="School Super Admin (SSA) Account" subtitle="First login credentials for the school's IT administrator -- included in handover document" theme={theme} />
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 mb-4 flex items-start gap-2">
          <AlertTriangle size={14} className="text-indigo-500 mt-0.5 shrink-0" />
          <p className="text-[10px] text-indigo-700">
            The School Super Admin has access to ALL module configurations. All SSA actions are <strong>immutably logged</strong> in Saaras-controlled storage for audit &amp; compliance. The SSA cannot view, edit, or delete their own audit logs.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="SSA Email" value="ssa@dpsahmedabad.edu" theme={theme} />
          <FormField label="Temporary Password" value="SSA@DPS2026!" type="password" theme={theme} hint="Must change on first login" />
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <FormField label="SSA Name" value="" theme={theme} hint="School's designated IT/admin person" />
          <FormField label="SSA Phone" value="" theme={theme} hint="For 2FA setup" />
        </div>
      </div>

      {/* Master Registered Contact — REQUIRED */}
      <div className={`${theme.cardBg} rounded-2xl border-2 border-rose-300 p-4`}>
        <SectionTitle title="Master Registered Contact" subtitle="REQUIRED — Used for OTP verification (locked fields), SSA credential recovery, and password resets" theme={theme} />
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 mb-4 flex items-start gap-2">
          <Lock size={14} className="text-rose-500 mt-0.5 shrink-0" />
          <p className="text-[10px] text-rose-700">
            This contact <strong>cannot be changed</strong> without Super Admin (Saaras) approval. It is the school&apos;s ultimate recovery key &mdash; used for changing locked SSA fields, resetting SSA/Admin passwords, and emergency account access. Typically the <strong>Trustee or Chairman&apos;s</strong> personal contact.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1`}>Master Email ID <span className="text-red-500">*</span></p>
            <input type="email" defaultValue="chairman@dpstrust.org" placeholder="trustee@school.edu" className={`w-full px-3 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-rose-300 ${theme.highlight}`} />
            <p className={`text-[9px] ${theme.iconColor} mt-1`}>Receives OTPs, password reset links, and security alerts</p>
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1`}>Master Mobile Number <span className="text-red-500">*</span></p>
            <div className="flex items-center gap-1">
              <span className={`text-xs ${theme.iconColor} px-2 py-2.5 rounded-l-xl border ${theme.border} ${theme.inputBg}`}>+91</span>
              <input type="tel" defaultValue="98765 00001" placeholder="98765 43210" className={`flex-1 px-3 py-2.5 rounded-r-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-rose-300 ${theme.highlight}`} />
            </div>
            <p className={`text-[9px] ${theme.iconColor} mt-1`}>Receives OTPs for locked field changes and 2FA</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1`}>Contact Person Name <span className="text-red-500">*</span></p>
            <input type="text" defaultValue="" placeholder="Mr. Rajesh Patel (Chairman)" className={`w-full px-3 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-rose-300 ${theme.highlight}`} />
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1`}>Role / Designation <span className="text-red-500">*</span></p>
            <select defaultValue="Chairman" className={`w-full px-3 py-2.5 rounded-xl border ${theme.border} ${theme.inputBg} text-sm outline-none focus:ring-2 focus:ring-rose-300 ${theme.highlight}`}>
              <option>Chairman</option>
              <option>Trustee</option>
              <option>Principal</option>
              <option>Managing Director</option>
              <option>Secretary</option>
            </select>
            <p className={`text-[9px] ${theme.iconColor} mt-1`}>This person authenticates all critical SSA changes</p>
          </div>
        </div>
        <div className={`mt-3 p-2.5 rounded-xl ${theme.secondaryBg} flex items-center gap-2`}>
          <CheckCircle size={12} className="text-rose-500 shrink-0" />
          <p className={`text-[10px] ${theme.iconColor}`}><strong>Used for:</strong> Locked field OTP verification &middot; SSA password reset &middot; Admin password reset &middot; Emergency account recovery &middot; Security alerts</p>
        </div>
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

      {/* Handover Document */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <SectionTitle title="Handover Document" subtitle="Auto-generated comprehensive document for the school authority" theme={theme} />
        <div className="space-y-2">
          {[
            'School configuration summary (all 4 steps)',
            'Enabled modules & sub-module decisions',
            'Role assignments & approval workflows',
            'SSA login credentials (encrypted)',
            'School Admin & Principal login credentials',
            'Plan details: tier, pricing, validity, storage',
            'Support channels & escalation matrix',
            'SSA responsibilities & audit trail policy',
            'Getting started guide & training resources',
          ].map(item => (
            <div key={item} className={`flex items-center gap-2 p-2 rounded-lg ${theme.secondaryBg}`}>
              <Check size={10} className="text-emerald-500 shrink-0" />
              <span className={`text-[10px] ${theme.highlight}`}>{item}</span>
            </div>
          ))}
        </div>
        <button className={`mt-3 flex items-center gap-2 px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>
          <Download size={12} /> Generate Handover Document (PDF)
        </button>
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

      {/* ── CRITICAL FIELD LOCKS (Optional) ── */}
      <CriticalFieldLocksSection theme={theme} />

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
    2: 'empty',    // Modules: not yet configured (includes sub-module decisions)
    3: 'empty',    // Roles: not yet configured
    4: 'empty',    // Review: not applicable until others are done
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
      case 2: return <Step3Modules theme={theme} institutionType={institutionType} />;
      case 3: return <Step4Roles theme={theme} institutionType={institutionType} />;
      case 4: return <Step9Review theme={theme} goToStep={setCurrentStep} />;
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
