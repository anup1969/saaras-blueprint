'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { TabBar, Toggle } from '@/components/shared';
import {
  Users, MapPin, Bus, FileText, Heart, Building, Landmark,
  ArrowLeft, Save, UserPlus, Plus, Trash2
} from 'lucide-react';
import { FormField, InputField, SelectField, TextAreaField, PhotoUpload, FileUploadArea, FormSection } from '../_components/FormHelpers';
import BulkUploadTab from './BulkUploadTab';

interface SiblingEntry {
  name: string; rollNo: string; admNo: string; className: string;
}

export default function StudentAddForm({ theme, onBack }: { theme: Theme; onBack: () => void }) {
  const [formTab, setFormTab] = useState<'single' | 'bulk'>('single');

  // Personal info state
  const [academicYear, setAcademicYear] = useState('2025-26');
  const [admissionNo] = useState('ADM-2026-0049');
  const [admissionDate, setAdmissionDate] = useState('2026-02-12');
  const [rollNo, setRollNo] = useState('');
  const [status, setStatus] = useState('Active');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [section, setSection] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [house, setHouse] = useState('');
  const [religion, setReligion] = useState('');
  const [category, setCategory] = useState('');
  const [primaryContact, setPrimaryContact] = useState('');
  const [email, setEmail] = useState('');
  const [caste, setCaste] = useState('');
  const [motherTongue, setMotherTongue] = useState('');
  const [languagesKnown, setLanguagesKnown] = useState<string[]>([]);

  // Father
  const [fatherName, setFatherName] = useState('');
  const [fatherPhone, setFatherPhone] = useState('');
  const [fatherEmail, setFatherEmail] = useState('');
  const [fatherOccupation, setFatherOccupation] = useState('');
  const [fatherIncome, setFatherIncome] = useState('');

  // Mother
  const [motherName, setMotherName] = useState('');
  const [motherPhone, setMotherPhone] = useState('');
  const [motherEmail, setMotherEmail] = useState('');
  const [motherOccupation, setMotherOccupation] = useState('');
  const [motherIncome, setMotherIncome] = useState('');

  // Guardian
  const [guardianSameAs, setGuardianSameAs] = useState<'' | 'father' | 'mother'>('');
  const [guardianName, setGuardianName] = useState('');
  const [guardianRelation, setGuardianRelation] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [guardianEmail, setGuardianEmail] = useState('');

  // Siblings
  const [hasSibling, setHasSibling] = useState(false);
  const [siblings, setSiblings] = useState<SiblingEntry[]>([{ name: '', rollNo: '', admNo: '', className: '' }]);

  // Address
  const [currAddr1, setCurrAddr1] = useState('');
  const [currAddr2, setCurrAddr2] = useState('');
  const [currCity, setCurrCity] = useState('');
  const [currState, setCurrState] = useState('');
  const [currPin, setCurrPin] = useState('');
  const [sameAddress, setSameAddress] = useState(false);
  const [permAddr1, setPermAddr1] = useState('');
  const [permAddr2, setPermAddr2] = useState('');
  const [permCity, setPermCity] = useState('');
  const [permState, setPermState] = useState('');
  const [permPin, setPermPin] = useState('');

  // Transport
  const [route, setRoute] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [pickupPoint, setPickupPoint] = useState('');

  // Medical
  const [medicalCondition, setMedicalCondition] = useState('Good');
  const [allergies, setAllergies] = useState('');
  const [medications, setMedications] = useState('');

  // Previous school
  const [prevSchool, setPrevSchool] = useState('');
  const [prevAddress, setPrevAddress] = useState('');
  const [prevBoard, setPrevBoard] = useState('');

  // Bank
  const [bankName, setBankName] = useState('');
  const [bankBranch, setBankBranch] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [accountNo, setAccountNo] = useState('');

  const addSibling = () => setSiblings([...siblings, { name: '', rollNo: '', admNo: '', className: '' }]);
  const removeSibling = (idx: number) => setSiblings(siblings.filter((_, i) => i !== idx));
  const updateSibling = (idx: number, field: keyof SiblingEntry, val: string) => {
    const updated = [...siblings];
    updated[idx] = { ...updated[idx], [field]: val };
    setSiblings(updated);
  };

  const toggleLanguage = (lang: string) => {
    setLanguagesKnown(prev => prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]);
  };

  const classOptions = ['Nursery', 'LKG', 'UKG', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];
  const sectionOptions = ['A', 'B', 'C', 'D'];
  const genderOptions = ['Male', 'Female', 'Other'];
  const bloodGroupOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const houseOptions = ['Red House', 'Blue House', 'Green House', 'Yellow House'];
  const religionOptions = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Jain', 'Buddhist', 'Other'];
  const categoryOptions = ['General', 'OBC', 'SC', 'ST', 'EWS', 'Other'];
  const languageOptions = ['Hindi', 'English', 'Gujarati', 'Marathi', 'Tamil', 'Telugu', 'Kannada', 'Bengali', 'Malayalam', 'Punjabi', 'Urdu', 'Sanskrit'];
  const routeOptions = ['Route A', 'Route B', 'Route C', 'Route D', 'Route E', 'Route F'];
  const boardOptions = ['CBSE', 'ICSE', 'State Board', 'IB', 'IGCSE', 'Other'];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className={`p-2 rounded-xl ${theme.secondaryBg} ${theme.buttonHover}`}>
          <ArrowLeft size={16} className={theme.iconColor} />
        </button>
        <div>
          <h1 className={`text-2xl font-bold ${theme.highlight}`}>Student Registration</h1>
          <p className={`text-xs ${theme.iconColor}`}>Add a new student to the school records</p>
        </div>
      </div>

      {/* Single / Bulk toggle */}
      <TabBar tabs={['Single Entry', 'Bulk Upload']} active={formTab === 'single' ? 'Single Entry' : 'Bulk Upload'} onChange={t => setFormTab(t === 'Single Entry' ? 'single' : 'bulk')} theme={theme} />

      {formTab === 'bulk' ? (
        <BulkUploadTab theme={theme} />
      ) : (
        <div className="space-y-4">
          {/* ─── PERSONAL INFORMATION ─────────────────── */}
          <FormSection title="Personal Information" icon={Users} theme={theme}>
            <div className="flex gap-5">
              <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
                <FormField label="Academic Year" required theme={theme}>
                  <SelectField options={['2024-25', '2025-26', '2026-27']} value={academicYear} onChange={setAcademicYear} theme={theme} />
                </FormField>
                <FormField label="Admission Number" theme={theme}>
                  <InputField value={admissionNo} onChange={() => {}} theme={theme} readOnly />
                </FormField>
                <FormField label="Admission Date" required theme={theme}>
                  <InputField type="date" value={admissionDate} onChange={setAdmissionDate} theme={theme} />
                </FormField>
                <FormField label="Roll Number" theme={theme}>
                  <InputField placeholder="Auto / Manual" value={rollNo} onChange={setRollNo} theme={theme} />
                </FormField>
                <FormField label="Status" required theme={theme}>
                  <SelectField options={['Active', 'Inactive', 'Left']} value={status} onChange={setStatus} theme={theme} />
                </FormField>
                <div /> {/* spacer */}
                <FormField label="First Name" required theme={theme}>
                  <InputField placeholder="First name" value={firstName} onChange={setFirstName} theme={theme} />
                </FormField>
                <FormField label="Last Name" required theme={theme}>
                  <InputField placeholder="Last name" value={lastName} onChange={setLastName} theme={theme} />
                </FormField>
                <FormField label="Class" required theme={theme}>
                  <SelectField options={classOptions} value={studentClass} onChange={setStudentClass} theme={theme} placeholder="Select class" />
                </FormField>
                <FormField label="Section" required theme={theme}>
                  <SelectField options={sectionOptions} value={section} onChange={setSection} theme={theme} placeholder="Select section" />
                </FormField>
                <FormField label="Gender" required theme={theme}>
                  <SelectField options={genderOptions} value={gender} onChange={setGender} theme={theme} placeholder="Select gender" />
                </FormField>
                <FormField label="Date of Birth" required theme={theme}>
                  <InputField type="date" value={dob} onChange={setDob} theme={theme} />
                </FormField>
                <FormField label="Blood Group" theme={theme}>
                  <SelectField options={bloodGroupOptions} value={bloodGroup} onChange={setBloodGroup} theme={theme} placeholder="Select" />
                </FormField>
                <FormField label="House" theme={theme}>
                  <SelectField options={houseOptions} value={house} onChange={setHouse} theme={theme} placeholder="Select house" />
                </FormField>
                <FormField label="Religion" theme={theme}>
                  <SelectField options={religionOptions} value={religion} onChange={setReligion} theme={theme} placeholder="Select" />
                </FormField>
                <FormField label="Category" theme={theme}>
                  <SelectField options={categoryOptions} value={category} onChange={setCategory} theme={theme} placeholder="Select" />
                </FormField>
                <FormField label="Primary Contact" required theme={theme}>
                  <InputField placeholder="10-digit mobile" value={primaryContact} onChange={setPrimaryContact} theme={theme} />
                </FormField>
                <FormField label="Email" theme={theme}>
                  <InputField placeholder="email@example.com" type="email" value={email} onChange={setEmail} theme={theme} />
                </FormField>
                <FormField label="Caste" theme={theme}>
                  <InputField placeholder="Caste" value={caste} onChange={setCaste} theme={theme} />
                </FormField>
                <FormField label="Mother Tongue" theme={theme}>
                  <InputField placeholder="Mother tongue" value={motherTongue} onChange={setMotherTongue} theme={theme} />
                </FormField>
                <FormField label="Languages Known" theme={theme}>
                  <div className="flex flex-wrap gap-1.5">
                    {languageOptions.map(lang => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => toggleLanguage(lang)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                          languagesKnown.includes(lang)
                            ? `${theme.primary} text-white border-transparent`
                            : `${theme.border} ${theme.iconColor} ${theme.buttonHover}`
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </FormField>
              </div>
              <div className="shrink-0">
                <PhotoUpload label="Student Photo" theme={theme} />
              </div>
            </div>
          </FormSection>

          {/* ─── PARENTS & GUARDIAN ────────────────────── */}
          <FormSection title="Parents & Guardian Information" icon={Users} theme={theme} collapsible defaultOpen>
            {/* Father */}
            <div className="mb-5">
              <p className={`text-xs font-bold ${theme.highlight} mb-3`}>Father&apos;s Details</p>
              <div className="flex gap-5">
                <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
                  <FormField label="Father's Name" required theme={theme}>
                    <InputField placeholder="Full name" value={fatherName} onChange={setFatherName} theme={theme} />
                  </FormField>
                  <FormField label="Phone" required theme={theme}>
                    <InputField placeholder="10-digit mobile" value={fatherPhone} onChange={setFatherPhone} theme={theme} />
                  </FormField>
                  <FormField label="Email" theme={theme}>
                    <InputField placeholder="email@example.com" value={fatherEmail} onChange={setFatherEmail} theme={theme} />
                  </FormField>
                  <FormField label="Occupation" theme={theme}>
                    <InputField placeholder="Occupation" value={fatherOccupation} onChange={setFatherOccupation} theme={theme} />
                  </FormField>
                  <FormField label="Annual Income" theme={theme}>
                    <InputField placeholder="e.g. 500000" value={fatherIncome} onChange={setFatherIncome} theme={theme} />
                  </FormField>
                </div>
                <div className="shrink-0"><PhotoUpload label="Father Photo" theme={theme} /></div>
              </div>
            </div>

            {/* Mother */}
            <div className={`mb-5 pt-5 border-t ${theme.border}`}>
              <p className={`text-xs font-bold ${theme.highlight} mb-3`}>Mother&apos;s Details</p>
              <div className="flex gap-5">
                <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
                  <FormField label="Mother's Name" required theme={theme}>
                    <InputField placeholder="Full name" value={motherName} onChange={setMotherName} theme={theme} />
                  </FormField>
                  <FormField label="Phone" theme={theme}>
                    <InputField placeholder="10-digit mobile" value={motherPhone} onChange={setMotherPhone} theme={theme} />
                  </FormField>
                  <FormField label="Email" theme={theme}>
                    <InputField placeholder="email@example.com" value={motherEmail} onChange={setMotherEmail} theme={theme} />
                  </FormField>
                  <FormField label="Occupation" theme={theme}>
                    <InputField placeholder="Occupation" value={motherOccupation} onChange={setMotherOccupation} theme={theme} />
                  </FormField>
                  <FormField label="Annual Income" theme={theme}>
                    <InputField placeholder="e.g. 500000" value={motherIncome} onChange={setMotherIncome} theme={theme} />
                  </FormField>
                </div>
                <div className="shrink-0"><PhotoUpload label="Mother Photo" theme={theme} /></div>
              </div>
            </div>

            {/* Guardian */}
            <div className={`pt-5 border-t ${theme.border}`}>
              <div className="flex items-center gap-4 mb-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>Guardian Details</p>
                <label className={`flex items-center gap-1.5 text-[10px] ${theme.iconColor} cursor-pointer`}>
                  <input type="checkbox" checked={guardianSameAs === 'father'} onChange={() => {
                    if (guardianSameAs === 'father') { setGuardianSameAs(''); setGuardianName(''); setGuardianPhone(''); setGuardianEmail(''); }
                    else { setGuardianSameAs('father'); setGuardianName(fatherName); setGuardianRelation('Father'); setGuardianPhone(fatherPhone); setGuardianEmail(fatherEmail); }
                  }} className="rounded" /> Same as Father
                </label>
                <label className={`flex items-center gap-1.5 text-[10px] ${theme.iconColor} cursor-pointer`}>
                  <input type="checkbox" checked={guardianSameAs === 'mother'} onChange={() => {
                    if (guardianSameAs === 'mother') { setGuardianSameAs(''); setGuardianName(''); setGuardianPhone(''); setGuardianEmail(''); }
                    else { setGuardianSameAs('mother'); setGuardianName(motherName); setGuardianRelation('Mother'); setGuardianPhone(motherPhone); setGuardianEmail(motherEmail); }
                  }} className="rounded" /> Same as Mother
                </label>
              </div>
              <div className="flex gap-5">
                <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
                  <FormField label="Guardian Name" required theme={theme}>
                    <InputField placeholder="Full name" value={guardianName} onChange={setGuardianName} theme={theme} disabled={guardianSameAs !== ''} />
                  </FormField>
                  <FormField label="Relation" required theme={theme}>
                    <InputField placeholder="e.g. Uncle, Grandparent" value={guardianRelation} onChange={setGuardianRelation} theme={theme} disabled={guardianSameAs !== ''} />
                  </FormField>
                  <FormField label="Phone" required theme={theme}>
                    <InputField placeholder="10-digit mobile" value={guardianPhone} onChange={setGuardianPhone} theme={theme} disabled={guardianSameAs !== ''} />
                  </FormField>
                  <FormField label="Email" theme={theme}>
                    <InputField placeholder="email@example.com" value={guardianEmail} onChange={setGuardianEmail} theme={theme} disabled={guardianSameAs !== ''} />
                  </FormField>
                </div>
                <div className="shrink-0"><PhotoUpload label="Guardian Photo" theme={theme} /></div>
              </div>
            </div>
          </FormSection>

          {/* ─── SIBLINGS ─────────────────────────────── */}
          <FormSection title="Sibling Information" icon={Users} theme={theme} collapsible defaultOpen={false}>
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-xs ${theme.highlight} font-bold`}>Sibling studying in this school?</span>
              <Toggle on={hasSibling} onChange={() => setHasSibling(!hasSibling)} theme={theme} />
              <span className={`text-[10px] ${theme.iconColor}`}>{hasSibling ? 'Yes' : 'No'}</span>
            </div>
            {hasSibling && (
              <div className="space-y-3">
                {siblings.map((sib, idx) => (
                  <div key={idx} className={`grid grid-cols-2 md:grid-cols-5 gap-3 p-3 rounded-xl ${theme.accentBg} items-end`}>
                    <FormField label="Sibling Name" theme={theme}>
                      <InputField placeholder="Name" value={sib.name} onChange={v => updateSibling(idx, 'name', v)} theme={theme} />
                    </FormField>
                    <FormField label="Roll No" theme={theme}>
                      <InputField placeholder="Roll no" value={sib.rollNo} onChange={v => updateSibling(idx, 'rollNo', v)} theme={theme} />
                    </FormField>
                    <FormField label="Admission No" theme={theme}>
                      <InputField placeholder="Adm. no" value={sib.admNo} onChange={v => updateSibling(idx, 'admNo', v)} theme={theme} />
                    </FormField>
                    <FormField label="Class" theme={theme}>
                      <SelectField options={classOptions} value={sib.className} onChange={v => updateSibling(idx, 'className', v)} theme={theme} placeholder="Select" />
                    </FormField>
                    <div className="flex items-end pb-0.5">
                      {siblings.length > 1 && (
                        <button type="button" onClick={() => removeSibling(idx)} className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-all">
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button type="button" onClick={addSibling} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} text-xs font-bold ${theme.primaryText}`}>
                  <Plus size={12} /> Add Sibling
                </button>
              </div>
            )}
          </FormSection>

          {/* ─── ADDRESS ──────────────────────────────── */}
          <FormSection title="Address" icon={MapPin} theme={theme} collapsible defaultOpen={false}>
            <p className={`text-xs font-bold ${theme.highlight} mb-3`}>Current Address</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-5">
              <FormField label="Address Line 1" required theme={theme} span={2}>
                <InputField placeholder="House/Flat no, Street" value={currAddr1} onChange={setCurrAddr1} theme={theme} />
              </FormField>
              <FormField label="Address Line 2" theme={theme}>
                <InputField placeholder="Landmark, Area" value={currAddr2} onChange={setCurrAddr2} theme={theme} />
              </FormField>
              <FormField label="City" required theme={theme}>
                <InputField placeholder="City" value={currCity} onChange={setCurrCity} theme={theme} />
              </FormField>
              <FormField label="State" required theme={theme}>
                <InputField placeholder="State" value={currState} onChange={setCurrState} theme={theme} />
              </FormField>
              <FormField label="PIN Code" required theme={theme}>
                <InputField placeholder="6-digit PIN" value={currPin} onChange={setCurrPin} theme={theme} />
              </FormField>
            </div>

            <div className={`pt-5 border-t ${theme.border}`}>
              <div className="flex items-center gap-3 mb-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>Permanent Address</p>
                <label className={`flex items-center gap-1.5 text-[10px] ${theme.iconColor} cursor-pointer`}>
                  <input type="checkbox" checked={sameAddress} onChange={() => {
                    setSameAddress(!sameAddress);
                    if (!sameAddress) { setPermAddr1(currAddr1); setPermAddr2(currAddr2); setPermCity(currCity); setPermState(currState); setPermPin(currPin); }
                    else { setPermAddr1(''); setPermAddr2(''); setPermCity(''); setPermState(''); setPermPin(''); }
                  }} className="rounded" /> Same as Current Address
                </label>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <FormField label="Address Line 1" theme={theme} span={2}>
                  <InputField placeholder="House/Flat no, Street" value={sameAddress ? currAddr1 : permAddr1} onChange={setPermAddr1} theme={theme} disabled={sameAddress} />
                </FormField>
                <FormField label="Address Line 2" theme={theme}>
                  <InputField placeholder="Landmark, Area" value={sameAddress ? currAddr2 : permAddr2} onChange={setPermAddr2} theme={theme} disabled={sameAddress} />
                </FormField>
                <FormField label="City" theme={theme}>
                  <InputField placeholder="City" value={sameAddress ? currCity : permCity} onChange={setPermCity} theme={theme} disabled={sameAddress} />
                </FormField>
                <FormField label="State" theme={theme}>
                  <InputField placeholder="State" value={sameAddress ? currState : permState} onChange={setPermState} theme={theme} disabled={sameAddress} />
                </FormField>
                <FormField label="PIN Code" theme={theme}>
                  <InputField placeholder="6-digit PIN" value={sameAddress ? currPin : permPin} onChange={setPermPin} theme={theme} disabled={sameAddress} />
                </FormField>
              </div>
            </div>
          </FormSection>

          {/* ─── TRANSPORT ────────────────────────────── */}
          <FormSection title="Transport Information" icon={Bus} theme={theme} collapsible defaultOpen={false}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <FormField label="Route" theme={theme}>
                <SelectField options={routeOptions} value={route} onChange={setRoute} theme={theme} placeholder="Select route" />
              </FormField>
              <FormField label="Vehicle Number" theme={theme}>
                <InputField placeholder="Auto-filled from route" value={vehicleNo} onChange={setVehicleNo} theme={theme} />
              </FormField>
              <FormField label="Pickup Point" theme={theme}>
                <InputField placeholder="Nearest stop" value={pickupPoint} onChange={setPickupPoint} theme={theme} />
              </FormField>
            </div>
          </FormSection>

          {/* ─── DOCUMENTS ────────────────────────────── */}
          <FormSection title="Document Uploads" icon={FileText} theme={theme} collapsible defaultOpen={false}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <FileUploadArea label="Transfer Certificate" theme={theme} />
              <FileUploadArea label="Birth Certificate" theme={theme} />
              <FileUploadArea label="Aadhaar Card" theme={theme} />
              <FileUploadArea label="Previous Marksheet" theme={theme} />
            </div>
          </FormSection>

          {/* ─── MEDICAL HISTORY ──────────────────────── */}
          <FormSection title="Medical History" icon={Heart} theme={theme} collapsible defaultOpen={false}>
            <div className="space-y-4">
              <FormField label="Medical Condition" theme={theme}>
                <div className="flex gap-4">
                  {['Good', 'Bad', 'Others'].map(opt => (
                    <label key={opt} className={`flex items-center gap-1.5 text-xs ${theme.highlight} cursor-pointer`}>
                      <input
                        type="radio"
                        name="medicalCondition"
                        value={opt}
                        checked={medicalCondition === opt}
                        onChange={() => setMedicalCondition(opt)}
                        className="accent-slate-600"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </FormField>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Allergies (if any)" theme={theme}>
                  <TextAreaField placeholder="List any known allergies..." value={allergies} onChange={setAllergies} theme={theme} rows={2} />
                </FormField>
                <FormField label="Medications (if any)" theme={theme}>
                  <TextAreaField placeholder="List any regular medications..." value={medications} onChange={setMedications} theme={theme} rows={2} />
                </FormField>
              </div>
            </div>
          </FormSection>

          {/* ─── PREVIOUS SCHOOL ──────────────────────── */}
          <FormSection title="Previous School Details" icon={Building} theme={theme} collapsible defaultOpen={false}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <FormField label="Previous School Name" theme={theme}>
                <InputField placeholder="School name" value={prevSchool} onChange={setPrevSchool} theme={theme} />
              </FormField>
              <FormField label="Address" theme={theme}>
                <InputField placeholder="School address" value={prevAddress} onChange={setPrevAddress} theme={theme} />
              </FormField>
              <FormField label="Board" theme={theme}>
                <SelectField options={boardOptions} value={prevBoard} onChange={setPrevBoard} theme={theme} placeholder="Select board" />
              </FormField>
            </div>
          </FormSection>

          {/* ─── BANK / OTHER DETAILS ─────────────────── */}
          <FormSection title="Other Details (Bank)" icon={Landmark} theme={theme} collapsible defaultOpen={false}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <FormField label="Bank Name" theme={theme}>
                <InputField placeholder="Bank name" value={bankName} onChange={setBankName} theme={theme} />
              </FormField>
              <FormField label="Branch" theme={theme}>
                <InputField placeholder="Branch" value={bankBranch} onChange={setBankBranch} theme={theme} />
              </FormField>
              <FormField label="IFSC Code" theme={theme}>
                <InputField placeholder="e.g. SBIN0001234" value={ifsc} onChange={setIfsc} theme={theme} />
              </FormField>
              <FormField label="Account Number" theme={theme}>
                <InputField placeholder="Account no." value={accountNo} onChange={setAccountNo} theme={theme} />
              </FormField>
            </div>
          </FormSection>

          {/* ─── BOTTOM ACTIONS ───────────────────────── */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex items-center justify-between sticky bottom-0 z-10 shadow-lg`}>
            <button onClick={onBack} className={`px-5 py-2.5 rounded-xl border ${theme.border} text-xs font-bold ${theme.iconColor} ${theme.buttonHover} transition-all`}>
              Cancel
            </button>
            <div className="flex gap-3">
              <button className={`px-5 py-2.5 rounded-xl border ${theme.border} text-xs font-bold ${theme.highlight} ${theme.buttonHover} transition-all flex items-center gap-1.5`}>
                <Save size={12} /> Save as Draft
              </button>
              <button className={`px-6 py-2.5 ${theme.primary} text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm`}>
                <UserPlus size={12} /> Add Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
