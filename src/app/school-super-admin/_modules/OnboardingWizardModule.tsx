'use client';

import React, { useState } from 'react';
import { Upload, CheckCircle } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

export default function OnboardingWizardModule({ theme }: { theme: Theme }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [schoolName, setSchoolName] = useState(''); const [address, setAddress] = useState(''); const [contact, setContact] = useState('');
  const [schoolBoard, setSchoolBoard] = useState('CBSE'); const [schoolType, setSchoolType] = useState('Co-educational');
  const [trustName, setTrustName] = useState(''); const [orgType, setOrgType] = useState('Single School'); const [numSchools, setNumSchools] = useState('1');
  const [academicYear, setAcademicYear] = useState('April-March'); const [gradingScale, setGradingScale] = useState('Percentage');
  const [terms, setTerms] = useState('2'); const [mediumOfInstruction, setMediumOfInstruction] = useState('English');
  const [enabledModules, setEnabledModules] = useState<Record<string, boolean>>({
    Fees: true, Attendance: true, Exams: true, HR: true, Transport: false, Library: false,
    Hostel: false, Canteen: false, Visitor: true, Communication: true, Timetable: true,
    LMS: false, Enquiry: true, Alumni: false, Certificate: true, Inventory: false,
  });
  const [adminName, setAdminName] = useState(''); const [adminEmail, setAdminEmail] = useState('');
  const [adminPhone, setAdminPhone] = useState(''); const [adminPassword, setAdminPassword] = useState('');
  const [schoolLaunched, setSchoolLaunched] = useState(false);
  const [logoFile, setLogoFile] = useState<string | null>(null);

  const steps = [
    { num: 1, label: 'School Basic Info' }, { num: 2, label: 'Organisation Setup' },
    { num: 3, label: 'Academic Config' }, { num: 4, label: 'Module Selection' },
    { num: 5, label: 'Admin Account' }, { num: 6, label: 'Review & Launch' },
  ];

  return (
    <div className="space-y-4">
      <ModuleHeader title="Onboarding Wizard" subtitle="Step-by-step school setup flow" theme={theme} />

      {/* Step Indicators */}
      <div className="flex items-center gap-1">
        {steps.map(s => (
          <button key={s.num} onClick={() => setCurrentStep(s.num)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              currentStep === s.num ? `${theme.primary} text-white` : currentStep > s.num ? 'bg-emerald-100 text-emerald-700' : `${theme.secondaryBg} ${theme.iconColor}`
            }`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
              currentStep === s.num ? 'bg-white/30 text-white' : currentStep > s.num ? 'bg-emerald-500 text-white' : `${theme.cardBg} ${theme.iconColor}`
            }`}>{currentStep > s.num ? '\u2713' : s.num}</span>
            {s.label}
          </button>
        ))}
      </div>

      {/* Step 1: School Basic Info */}
      {currentStep === 1 && (
        <SectionCard title="School Basic Info" subtitle="Enter core school details" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>School Name</p>
              <InputField value={schoolName} onChange={setSchoolName} theme={theme} placeholder="e.g. Delhi Public School, Ahmedabad" />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Address</p>
              <InputField value={address} onChange={setAddress} theme={theme} placeholder="Full school address" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Board</p>
                <SelectField options={['CBSE', 'ICSE', 'State Board', 'IB', 'Custom']} value={schoolBoard} onChange={setSchoolBoard} theme={theme} />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>School Type</p>
                <SelectField options={['Co-educational', 'Boys Only', 'Girls Only']} value={schoolType} onChange={setSchoolType} theme={theme} />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Contact Number</p>
                <InputField value={contact} onChange={setContact} theme={theme} placeholder="+91 98765 43210" />
              </div>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg} flex items-center gap-3`}>
              <Upload size={16} className={theme.iconColor} />
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>School Logo</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{logoFile ? logoFile : 'Upload PNG/JPG, max 2MB'}</p>
              </div>
              <label className={`ml-auto px-3 py-1.5 rounded-xl text-xs font-bold ${theme.primary} text-white cursor-pointer`}>
                {logoFile ? 'Change' : 'Upload'}
                <input type="file" accept="image/png,image/jpeg" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) setLogoFile(f.name); }} />
              </label>
              {logoFile && <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-1"><CheckCircle size={10} /> Selected</span>}
            </div>
          </div>
        </SectionCard>
      )}

      {/* Step 2: Organisation Setup */}
      {currentStep === 2 && (
        <SectionCard title="Organisation Setup" subtitle="Trust/organisation details for multi-school support" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Trust / Organisation Name</p>
              <InputField value={trustName} onChange={setTrustName} theme={theme} placeholder="e.g. Sunrise Education Trust" />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Organisation Type</p>
              <div className="grid grid-cols-2 gap-2">
                {['Single School', 'Sister Concern', 'Chain', 'Franchise'].map(t => (
                  <button key={t} onClick={() => setOrgType(t)}
                    className={`p-2.5 rounded-xl text-left border transition-all ${orgType === t ? `${theme.primary} text-white border-transparent` : `${theme.secondaryBg} ${theme.border}`}`}>
                    <p className={`text-xs font-bold ${orgType === t ? '' : theme.highlight}`}>{t}</p>
                  </button>
                ))}
              </div>
            </div>
            {orgType !== 'Single School' && (
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Number of Schools</p>
                <InputField value={numSchools} onChange={setNumSchools} theme={theme} type="number" placeholder="e.g. 3" />
              </div>
            )}
          </div>
        </SectionCard>
      )}

      {/* Step 3: Academic Config */}
      {currentStep === 3 && (
        <SectionCard title="Academic Configuration" subtitle="Set academic year, grading, and terms" theme={theme}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Academic Year</p>
              <SelectField options={['April-March', 'June-May', 'January-December']} value={academicYear} onChange={setAcademicYear} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Grading Scale</p>
              <SelectField options={['Percentage', 'GPA (10-point)', 'GPA (4-point)', 'Grade Letters (A-F)', 'CGPA']} value={gradingScale} onChange={setGradingScale} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Number of Terms</p>
              <SelectField options={['1', '2', '3', '4']} value={terms} onChange={setTerms} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Medium of Instruction</p>
              <SelectField options={['English', 'Hindi', 'Gujarati', 'Bilingual', 'Trilingual']} value={mediumOfInstruction} onChange={setMediumOfInstruction} theme={theme} />
            </div>
          </div>
        </SectionCard>
      )}

      {/* Step 4: Module Selection */}
      {currentStep === 4 && (
        <SectionCard title="Module Selection" subtitle="Choose which modules to enable from your subscription" theme={theme}>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            {Object.entries(enabledModules).map(([mod, enabled]) => (
              <div key={mod} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <span className={`text-xs font-bold ${theme.highlight}`}>{mod}</span>
                <SSAToggle on={enabled} onChange={() => setEnabledModules(p => ({ ...p, [mod]: !p[mod] }))} theme={theme} />
              </div>
            ))}
          </div>
          <p className={`text-[10px] ${theme.iconColor} mt-2`}>
            {Object.values(enabledModules).filter(Boolean).length} modules enabled out of {Object.keys(enabledModules).length}
          </p>
        </SectionCard>
      )}

      {/* Step 5: Admin Account */}
      {currentStep === 5 && (
        <SectionCard title="Admin Account Creation" subtitle="Create the primary school administrator account" theme={theme}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Full Name</p>
              <InputField value={adminName} onChange={setAdminName} theme={theme} placeholder="Admin full name" />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Email</p>
              <InputField value={adminEmail} onChange={setAdminEmail} theme={theme} type="email" placeholder="admin@school.com" />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Phone</p>
              <InputField value={adminPhone} onChange={setAdminPhone} theme={theme} placeholder="+91 98765 43210" />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Password</p>
              <InputField value={adminPassword} onChange={setAdminPassword} theme={theme} type="password" placeholder="Min 8 characters" />
            </div>
          </div>
        </SectionCard>
      )}

      {/* Step 6: Review & Launch */}
      {currentStep === 6 && (
        <SectionCard title="Review & Launch" subtitle="Verify all settings before going live" theme={theme}>
          <div className="space-y-2">
            {[
              { label: 'School', value: schoolName || '(not set)' },
              { label: 'Board', value: schoolBoard },
              { label: 'Organisation', value: `${orgType}${orgType !== 'Single School' ? ` (${numSchools} schools)` : ''}` },
              { label: 'Trust', value: trustName || '(not set)' },
              { label: 'Academic Year', value: academicYear },
              { label: 'Grading', value: gradingScale },
              { label: 'Terms', value: terms },
              { label: 'Medium', value: mediumOfInstruction },
              { label: 'Modules Enabled', value: `${Object.values(enabledModules).filter(Boolean).length} / ${Object.keys(enabledModules).length}` },
              { label: 'Admin', value: adminName || '(not set)' },
              { label: 'Admin Email', value: adminEmail || '(not set)' },
            ].map(item => (
              <div key={item.label} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <span className={`text-[10px] font-bold ${theme.iconColor}`}>{item.label}</span>
                <span className={`text-xs font-bold ${theme.highlight}`}>{item.value}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <button onClick={() => setCurrentStep(p => Math.max(1, p - 1))} disabled={currentStep === 1}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${currentStep === 1 ? 'opacity-30 cursor-not-allowed' : `${theme.buttonHover} ${theme.iconColor}`} border ${theme.border}`}>
          Previous
        </button>
        <span className={`text-[10px] font-bold ${theme.iconColor}`}>Step {currentStep} of 6</span>
        {currentStep < 6 ? (
          <button onClick={() => setCurrentStep(p => Math.min(6, p + 1))}
            className={`px-4 py-2 rounded-xl text-xs font-bold text-white ${theme.primary} hover:opacity-90 transition-all`}>
            Next
          </button>
        ) : (
          schoolLaunched ? (
            <span className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-500 flex items-center gap-1.5">
              <CheckCircle size={14} /> School Launched Successfully!
            </span>
          ) : (
            <button onClick={() => setSchoolLaunched(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition-all">
              Launch School
            </button>
          )
        )}
      </div>
    </div>
  );
}
