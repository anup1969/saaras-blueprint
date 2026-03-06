'use client';

import React, { useState, useMemo } from 'react';
import { X, Plus, CheckCircle, ChevronUp, ChevronDown, Copy, CheckSquare, Square, Globe, Link, QrCode, Bell, ArrowRight, FileText, Upload, Download, Search, Edit, Save, Check, Settings, Trash2, Users, Phone, Mail, Calendar, ClipboardList, BarChart3, Filter, AlertCircle, Clock, UserCheck, GripVertical, Eye, MessageSquare } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import { MasterPermissionGrid, BulkImportWizard } from '@/components/shared';
import type { Theme } from '../_helpers/types';

const PAGE_SIZE = 5;

// ─── Reusable sub-components ───
function TableToolbar({ search, onSearch, count, total, theme, label }: { search: string; onSearch: (v: string) => void; count: number; total: number; theme: Theme; label?: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className={`flex items-center gap-1.5 flex-1 px-3 py-1.5 rounded-xl border ${theme.border} ${theme.inputBg}`}>
        <Search size={12} className={theme.iconColor} />
        <input value={search} onChange={e => onSearch(e.target.value)} placeholder={`Search ${label || ''}...`}
          className={`flex-1 bg-transparent text-xs ${theme.highlight} outline-none`} />
        {search && <button onClick={() => onSearch('')} className="text-gray-400 hover:text-gray-600"><X size={10} /></button>}
      </div>
      <span className={`text-[10px] font-bold px-2.5 py-1.5 rounded-xl ${theme.secondaryBg} ${theme.iconColor} border ${theme.border} whitespace-nowrap`}>
        {count} / {total}
      </span>
      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-all">
        <Download size={12} /> Export
      </button>
      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-all">
        <Upload size={12} /> Import
      </button>
    </div>
  );
}

function Pagination({ page, totalPages, onPage, theme }: { page: number; totalPages: number; onPage: (p: number) => void; theme: Theme }) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between mt-3">
      <p className={`text-[10px] ${theme.iconColor}`}>Page {page} of {totalPages}</p>
      <div className="flex items-center gap-1">
        <button disabled={page <= 1} onClick={() => onPage(page - 1)}
          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${theme.border} ${page <= 1 ? 'opacity-40 cursor-not-allowed' : `${theme.buttonHover} ${theme.highlight}`}`}>Prev</button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
          <button key={p} onClick={() => onPage(p)}
            className={`w-6 h-6 rounded-lg text-[10px] font-bold ${p === page ? `${theme.primary} text-white` : `${theme.buttonHover} ${theme.highlight}`}`}>{p}</button>
        ))}
        <button disabled={page >= totalPages} onClick={() => onPage(page + 1)}
          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${theme.border} ${page >= totalPages ? 'opacity-40 cursor-not-allowed' : `${theme.buttonHover} ${theme.highlight}`}`}>Next</button>
      </div>
    </div>
  );
}

type TabId = 'settings' | 'pipeline' | 'intake' | 'sources' | 'process' | 'reports';

export default function EnquiryAdmissionConfigModule({ theme, activeTab: externalTab, onTabChange }: { theme: Theme; activeTab?: string; onTabChange?: (tab: string) => void }) {
  // ─── Tab state ───
  const [internalTab, setInternalTab] = useState<TabId>('settings');
  const activeTab = (externalTab as TabId) || internalTab;
  const setActiveTab = (tab: TabId) => { if (onTabChange) onTabChange(tab); else setInternalTab(tab); };

  // ─── Save feedback ───
  const [saved, setSaved] = useState(false);
  function handleSave() { setSaved(true); setTimeout(() => setSaved(false), 2500); }

  // ═══════════════════════════════════════════
  // SETTINGS TAB STATE
  // ═══════════════════════════════════════════
  const [admissionMode, setAdmissionMode] = useState('Both Online + Offline');
  const [applicationFee, setApplicationFee] = useState('500');
  const [enqToggles, setEnqToggles] = useState<Record<string, boolean>>({
    'Auto-assign Follow-ups': true, 'Online Application Form': true,
    'Auto-generate Admission Number': true, 'Document Upload Required': true,
  });
  const [photoMandatory, setPhotoMandatory] = useState(true);

  // Provisional Admission
  const [allowProvisional, setAllowProvisional] = useState(true);
  const [provisionalConditions, setProvisionalConditions] = useState<Record<string, boolean>>({
    'Pending documents': true, 'Pending fee payment': true, 'Pending test results': false,
  });
  const [provisionalExpiry, setProvisionalExpiry] = useState('30');

  // RTE 25% Quota
  const [enableRTELottery, setEnableRTELottery] = useState(false);

  // APAAR / ABC ID
  const [enableAPAAR, setEnableAPAAR] = useState(false);
  const [apaarFormat, setApaarFormat] = useState('XXXX-XXXX-XXXX');

  // Auto-assign Section
  const [autoAssignSection, setAutoAssignSection] = useState(false);
  const [sectionMethod, setSectionMethod] = useState('Round Robin');
  const [balanceSections, setBalanceSections] = useState(true);

  // Sibling / Alumni Linking (P1 #12)
  const [enableSiblingLink, setEnableSiblingLink] = useState(true);
  const [siblingDiscount, setSiblingDiscount] = useState('10');
  const [enableAlumniLink, setEnableAlumniLink] = useState(true);
  const [alumniPriority, setAlumniPriority] = useState(true);

  // ═══════════════════════════════════════════
  // PIPELINE TAB STATE (P0 #1, #2, P1 #11)
  // ═══════════════════════════════════════════
  const [pipelineStages, setPipelineStages] = useState([
    { id: 1, name: 'New Enquiry', color: 'bg-blue-500', autoAssign: true, slaHours: 24, actions: ['Call', 'Email', 'WhatsApp'] },
    { id: 2, name: 'Follow-up', color: 'bg-amber-500', autoAssign: true, slaHours: 48, actions: ['Call', 'Email', 'Visit'] },
    { id: 3, name: 'School Visit', color: 'bg-purple-500', autoAssign: false, slaHours: 72, actions: ['Schedule Visit', 'Campus Tour'] },
    { id: 4, name: 'Entrance Test', color: 'bg-orange-500', autoAssign: false, slaHours: 120, actions: ['Schedule Test', 'Send Hall Ticket'] },
    { id: 5, name: 'Interview', color: 'bg-indigo-500', autoAssign: false, slaHours: 72, actions: ['Schedule Interview', 'Panel Notes'] },
    { id: 6, name: 'Offer Made', color: 'bg-emerald-500', autoAssign: true, slaHours: 168, actions: ['Send Offer Letter', 'Call Parent'] },
    { id: 7, name: 'Accepted', color: 'bg-green-600', autoAssign: false, slaHours: 0, actions: ['Process Admission'] },
    { id: 8, name: 'Rejected', color: 'bg-red-500', autoAssign: false, slaHours: 0, actions: ['Send Rejection', 'Feedback'] },
  ]);
  const [editingStage, setEditingStage] = useState<number | null>(null);
  const [newStageName, setNewStageName] = useState('');
  const [stageSearch, setStageSearch] = useState('');

  // Follow-up Rules (P0 #2)
  const [followUpRules, setFollowUpRules] = useState([
    { trigger: 'No response after 24h', action: 'Auto-assign callback', channel: 'Phone', enabled: true },
    { trigger: 'No response after 48h', action: 'Send reminder SMS', channel: 'SMS', enabled: true },
    { trigger: 'No response after 72h', action: 'Escalate to Head', channel: 'Email', enabled: true },
    { trigger: 'Visit scheduled but no-show', action: 'Auto-reschedule + SMS', channel: 'SMS', enabled: true },
    { trigger: 'Test completed', action: 'Notify counselor for result review', channel: 'System', enabled: true },
  ]);
  const [maxFollowUps, setMaxFollowUps] = useState('5');
  const [followUpCooldown, setFollowUpCooldown] = useState('24');

  // Interview Panel (P1 #11)
  const [interviewPanelMembers, setInterviewPanelMembers] = useState([
    { name: 'Principal', role: 'Chair', required: true },
    { name: 'Head of Department', role: 'Member', required: true },
    { name: 'School Counselor', role: 'Observer', required: false },
  ]);
  const [interviewDuration, setInterviewDuration] = useState('30');
  const [interviewSlots, setInterviewSlots] = useState('4');
  const [enablePanelNotes, setEnablePanelNotes] = useState(true);

  // ═══════════════════════════════════════════
  // INTAKE TAB STATE (P0 #3, #4, #5, #7)
  // ═══════════════════════════════════════════
  // Admission Test Config (P0 #3)
  const [enableAdmissionTest, setEnableAdmissionTest] = useState(true);
  const [testSubjects, setTestSubjects] = useState([
    { subject: 'English', maxMarks: 50, passingMarks: 20, duration: 45, enabled: true },
    { subject: 'Mathematics', maxMarks: 50, passingMarks: 20, duration: 45, enabled: true },
    { subject: 'General Knowledge', maxMarks: 25, passingMarks: 10, duration: 30, enabled: true },
    { subject: 'Logical Reasoning', maxMarks: 25, passingMarks: 10, duration: 30, enabled: false },
  ]);
  const [testGradeApplicable, setTestGradeApplicable] = useState('Grade 2 and above');
  const [testScheduleMode, setTestScheduleMode] = useState('Fixed Dates');
  const [testSearch, setTestSearch] = useState('');
  const [testPage, setTestPage] = useState(1);

  const filteredTests = useMemo(() => testSubjects.filter(t => t.subject.toLowerCase().includes(testSearch.toLowerCase())), [testSubjects, testSearch]);
  const testTotalPages = Math.max(1, Math.ceil(filteredTests.length / PAGE_SIZE));

  // Admission Criteria / Eligibility (P0 #4)
  const [eligibilityRules, setEligibilityRules] = useState([
    { grade: 'Nursery', minAge: '2.5', maxAge: '4', docsRequired: ['Birth Certificate', 'Aadhaar'], marksRequired: false, minMarks: 0 },
    { grade: 'LKG', minAge: '3.5', maxAge: '5', docsRequired: ['Birth Certificate', 'Aadhaar'], marksRequired: false, minMarks: 0 },
    { grade: 'Grade 1', minAge: '5.5', maxAge: '7', docsRequired: ['Birth Certificate', 'Aadhaar', 'TC'], marksRequired: false, minMarks: 0 },
    { grade: 'Grade 2-5', minAge: '', maxAge: '', docsRequired: ['Birth Certificate', 'Aadhaar', 'TC', 'Report Card'], marksRequired: true, minMarks: 40 },
    { grade: 'Grade 6-8', minAge: '', maxAge: '', docsRequired: ['Birth Certificate', 'Aadhaar', 'TC', 'Report Card', 'Character Certificate'], marksRequired: true, minMarks: 45 },
    { grade: 'Grade 9-10', minAge: '', maxAge: '', docsRequired: ['Birth Certificate', 'Aadhaar', 'TC', 'Report Card', 'Character Certificate'], marksRequired: true, minMarks: 50 },
    { grade: 'Grade 11-12', minAge: '', maxAge: '', docsRequired: ['Birth Certificate', 'Aadhaar', 'TC', 'Report Card', 'Character Certificate', 'Board Marksheet'], marksRequired: true, minMarks: 55 },
  ]);
  const [eligSearch, setEligSearch] = useState('');
  const [eligPage, setEligPage] = useState(1);
  const filteredElig = useMemo(() => eligibilityRules.filter(e => e.grade.toLowerCase().includes(eligSearch.toLowerCase())), [eligibilityRules, eligSearch]);
  const eligTotalPages = Math.max(1, Math.ceil(filteredElig.length / PAGE_SIZE));

  // Document Requirements (P0 #5)
  const [docRequirements, setDocRequirements] = useState([
    { name: 'Birth Certificate', mandatory: true, format: 'PDF/Image', maxSize: '5 MB', forGrades: 'All' },
    { name: 'Aadhaar Card', mandatory: true, format: 'PDF/Image', maxSize: '5 MB', forGrades: 'All' },
    { name: 'Passport Photo', mandatory: true, format: 'JPG/PNG', maxSize: '2 MB', forGrades: 'All' },
    { name: 'Transfer Certificate', mandatory: true, format: 'PDF', maxSize: '5 MB', forGrades: 'Grade 2+' },
    { name: 'Previous Report Card', mandatory: true, format: 'PDF/Image', maxSize: '10 MB', forGrades: 'Grade 2+' },
    { name: 'Character Certificate', mandatory: false, format: 'PDF', maxSize: '5 MB', forGrades: 'Grade 6+' },
    { name: 'Medical Fitness Certificate', mandatory: false, format: 'PDF', maxSize: '5 MB', forGrades: 'All' },
    { name: 'Caste Certificate', mandatory: false, format: 'PDF', maxSize: '5 MB', forGrades: 'If applicable' },
    { name: 'Income Certificate', mandatory: false, format: 'PDF', maxSize: '5 MB', forGrades: 'RTE applicants' },
    { name: 'Board Marksheet', mandatory: true, format: 'PDF', maxSize: '5 MB', forGrades: 'Grade 11-12' },
  ]);
  const [docSearch, setDocSearch] = useState('');
  const [docPage, setDocPage] = useState(1);
  const filteredDocs = useMemo(() => docRequirements.filter(d => d.name.toLowerCase().includes(docSearch.toLowerCase())), [docRequirements, docSearch]);
  const docTotalPages = Math.max(1, Math.ceil(filteredDocs.length / PAGE_SIZE));

  // Class Capacity & Waitlist (P0 #7 — moved from Academic Config)
  const [enableWaitlist, setEnableWaitlist] = useState(true);
  const [waitlistAutoPromote, setWaitlistAutoPromote] = useState('Automatic');
  const [autoOffer, setAutoOffer] = useState(true);
  const [waitlistNotification, setWaitlistNotification] = useState('Both');
  const [maxWaitlist, setMaxWaitlist] = useState('20');
  const [classCapacity, setClassCapacity] = useState([
    { grade: 'Nursery', sections: 2, maxPerSection: 25, total: 50, current: 48, waitlisted: 3 },
    { grade: 'LKG', sections: 2, maxPerSection: 25, total: 50, current: 50, waitlisted: 5 },
    { grade: 'UKG', sections: 2, maxPerSection: 25, total: 50, current: 47, waitlisted: 1 },
    { grade: 'Grade 1', sections: 3, maxPerSection: 40, total: 120, current: 115, waitlisted: 4 },
    { grade: 'Grade 2', sections: 3, maxPerSection: 40, total: 120, current: 118, waitlisted: 2 },
    { grade: 'Grade 3', sections: 2, maxPerSection: 40, total: 80, current: 78, waitlisted: 0 },
    { grade: 'Grade 4', sections: 2, maxPerSection: 40, total: 80, current: 75, waitlisted: 1 },
    { grade: 'Grade 5', sections: 2, maxPerSection: 40, total: 80, current: 80, waitlisted: 3 },
    { grade: 'Grade 6', sections: 3, maxPerSection: 40, total: 120, current: 112, waitlisted: 0 },
    { grade: 'Grade 7', sections: 3, maxPerSection: 40, total: 120, current: 119, waitlisted: 5 },
    { grade: 'Grade 8', sections: 2, maxPerSection: 40, total: 80, current: 76, waitlisted: 0 },
    { grade: 'Grade 9', sections: 3, maxPerSection: 40, total: 120, current: 110, waitlisted: 1 },
    { grade: 'Grade 10', sections: 3, maxPerSection: 40, total: 120, current: 117, waitlisted: 2 },
    { grade: 'Grade 11', sections: 2, maxPerSection: 40, total: 80, current: 72, waitlisted: 0 },
    { grade: 'Grade 12', sections: 2, maxPerSection: 40, total: 80, current: 68, waitlisted: 0 },
  ]);
  const [capSearch, setCapSearch] = useState('');
  const [capPage, setCapPage] = useState(1);
  const [capEditIdx, setCapEditIdx] = useState<number | null>(null);
  const [capEditRow, setCapEditRow] = useState({ grade: '', sections: 0, maxPerSection: 0, total: 0, current: 0, waitlisted: 0 });
  const filteredCap = useMemo(() => classCapacity.filter(c => c.grade.toLowerCase().includes(capSearch.toLowerCase())), [classCapacity, capSearch]);
  const capTotalPages = Math.max(1, Math.ceil(filteredCap.length / PAGE_SIZE));

  // ═══════════════════════════════════════════
  // SOURCES TAB STATE (existing)
  // ═══════════════════════════════════════════
  const [leadSources, setLeadSources] = useState([
    { name: 'Website', enabled: true }, { name: 'Walk-in', enabled: true }, { name: 'Phone', enabled: true },
    { name: 'Social Media', enabled: true }, { name: 'Referral', enabled: true }, { name: 'Fair', enabled: true },
  ]);
  const [newLeadSource, setNewLeadSource] = useState('');
  const [leadSourceSearch, setLeadSourceSearch] = useState('');
  const [leadSourcePage, setLeadSourcePage] = useState(1);
  const [editingLeadIdx, setEditingLeadIdx] = useState<number | null>(null);
  const [editingLeadName, setEditingLeadName] = useState('');

  const filteredLeadSources = useMemo(() => leadSources.filter(s => s.name.toLowerCase().includes(leadSourceSearch.toLowerCase())), [leadSources, leadSourceSearch]);
  const leadTotalPages = Math.max(1, Math.ceil(filteredLeadSources.length / PAGE_SIZE));
  const pagedLeadSources = filteredLeadSources.slice((leadSourcePage - 1) * PAGE_SIZE, leadSourcePage * PAGE_SIZE);

  const [enquirySources, setEnquirySources] = useState([
    { name: 'Walk-in', active: true, priority: 1 }, { name: 'Phone Call', active: true, priority: 2 },
    { name: 'Website Form', active: true, priority: 3 }, { name: 'Social Media (Facebook/Instagram)', active: true, priority: 4 },
    { name: 'Referral (Parent)', active: true, priority: 5 }, { name: 'Referral (Staff)', active: true, priority: 6 },
    { name: 'Newspaper Ad', active: true, priority: 7 }, { name: 'School Fair / Event', active: true, priority: 8 },
    { name: 'Google Ads', active: false, priority: 9 }, { name: 'WhatsApp', active: true, priority: 10 },
  ]);
  const [newEnqSource, setNewEnqSource] = useState('');
  const [enqSourceSearch, setEnqSourceSearch] = useState('');
  const [enqSourcePage, setEnqSourcePage] = useState(1);

  const filteredEnqSources = useMemo(() => {
    const sorted = [...enquirySources].sort((a, b) => a.priority - b.priority);
    if (!enqSourceSearch) return sorted;
    return sorted.filter(s => s.name.toLowerCase().includes(enqSourceSearch.toLowerCase()));
  }, [enquirySources, enqSourceSearch]);
  const enqTotalPages = Math.max(1, Math.ceil(filteredEnqSources.length / PAGE_SIZE));
  const pagedEnqSources = filteredEnqSources.slice((enqSourcePage - 1) * PAGE_SIZE, enqSourcePage * PAGE_SIZE);

  // ═══════════════════════════════════════════
  // PROCESS TAB STATE (existing + P1 #10)
  // ═══════════════════════════════════════════
  const [enableOnlineForm, setEnableOnlineForm] = useState(true);
  const embedCode = '<iframe src="https://school.saaras.app/apply/demo-school" width="100%" height="700" frameBorder="0"></iframe>';
  const directLink = 'https://school.saaras.app/apply/demo-school';

  // Custom Fields (existing — P1 #8 already done)
  const [customFields, setCustomFields] = useState([
    { label: 'Student Name', type: 'Text', required: true, builtin: true },
    { label: 'Phone Number', type: 'Number', required: true, builtin: true },
    { label: 'Email', type: 'Text', required: true, builtin: true },
    { label: 'Class Applied For', type: 'Dropdown', required: true, builtin: true },
    { label: 'Date of Birth', type: 'Date', required: true, builtin: true },
    { label: 'Previous School', type: 'Text', required: false, builtin: false },
    { label: 'Sibling Studying Here', type: 'Dropdown', required: false, builtin: false },
    { label: "Father's Occupation", type: 'Text', required: false, builtin: false },
    { label: "Mother's Occupation", type: 'Text', required: false, builtin: false },
    { label: 'Address', type: 'Text', required: true, builtin: false },
  ]);
  const [showAddField, setShowAddField] = useState(false);
  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [newFieldType, setNewFieldType] = useState('Text');
  const [newFieldRequired, setNewFieldRequired] = useState(false);
  const [cfSearch, setCfSearch] = useState('');
  const [cfPage, setCfPage] = useState(1);
  const [editingCfIdx, setEditingCfIdx] = useState<number | null>(null);
  const [editingCfLabel, setEditingCfLabel] = useState('');
  const [editingCfType, setEditingCfType] = useState('Text');

  const filteredCustomFields = useMemo(() => customFields.filter(f => f.label.toLowerCase().includes(cfSearch.toLowerCase())), [customFields, cfSearch]);
  const cfTotalPages = Math.max(1, Math.ceil(filteredCustomFields.length / PAGE_SIZE));
  const pagedCustomFields = filteredCustomFields.slice((cfPage - 1) * PAGE_SIZE, cfPage * PAGE_SIZE);

  const admissionSteps = [
    { step: 1, name: 'Online Application', desc: 'Parent fills application form online or in person', status: 'active' },
    { step: 2, name: 'Document Upload', desc: 'Upload birth certificate, photos, previous school records', status: 'active' },
    { step: 3, name: 'Entrance Test', desc: 'Optional entrance/aptitude test for the student', status: 'optional' },
    { step: 4, name: 'Interview', desc: 'Panel interview with student and parents', status: 'optional' },
    { step: 5, name: 'Offer & Acceptance', desc: 'Admission offer sent, parent accepts/declines', status: 'active' },
    { step: 6, name: 'Fee Payment', desc: 'Pay admission fee and first term fee online or offline', status: 'active' },
    { step: 7, name: 'Confirmation', desc: 'Admission confirmed, student ID and class assigned', status: 'active' },
  ];

  // Communication Templates (P1 #10)
  const [commTemplates, setCommTemplates] = useState([
    { stage: 'New Enquiry', channel: 'SMS', subject: '', template: 'Dear {{parent_name}}, thank you for your enquiry about admission to {{school_name}} for {{student_name}} in {{grade}}. Our team will contact you within 24 hours.', enabled: true },
    { stage: 'New Enquiry', channel: 'Email', subject: 'Thank you for your enquiry - {{school_name}}', template: 'Dear {{parent_name}},\n\nThank you for your interest in {{school_name}}. We have received your enquiry for admission to {{grade}} for {{student_name}}.\n\nOur admissions team will reach out to you within 24 hours.\n\nWarm regards,\n{{school_name}} Admissions', enabled: true },
    { stage: 'Follow-up', channel: 'SMS', subject: '', template: 'Dear {{parent_name}}, this is a gentle reminder about your enquiry for {{student_name}} at {{school_name}}. Would you like to schedule a school visit? Reply YES or call us at {{school_phone}}.', enabled: true },
    { stage: 'School Visit', channel: 'SMS', subject: '', template: 'Dear {{parent_name}}, your school visit is confirmed for {{visit_date}} at {{visit_time}}. Please bring original documents for verification. Address: {{school_address}}.', enabled: true },
    { stage: 'Test Scheduled', channel: 'SMS', subject: '', template: 'Dear {{parent_name}}, entrance test for {{student_name}} is scheduled on {{test_date}} at {{test_time}}. Venue: {{school_name}}. Bring hall ticket and ID.', enabled: true },
    { stage: 'Offer Made', channel: 'Email', subject: 'Admission Offer - {{school_name}}', template: 'Dear {{parent_name}},\n\nWe are pleased to offer admission to {{student_name}} in {{grade}} at {{school_name}} for the academic year {{academic_year}}.\n\nPlease accept this offer and complete fee payment by {{deadline}}.\n\nAdmission Number: {{admission_no}}\n\nRegards,\n{{school_name}}', enabled: true },
    { stage: 'Offer Made', channel: 'WhatsApp', subject: '', template: 'Congratulations! {{student_name}} has been offered admission to {{grade}} at {{school_name}}. Accept and pay fees by {{deadline}}. Link: {{payment_link}}', enabled: true },
    { stage: 'Accepted', channel: 'SMS', subject: '', template: 'Welcome to {{school_name}}! {{student_name}} is now admitted in {{grade}}, Section {{section}}. Admission No: {{admission_no}}. First day: {{start_date}}.', enabled: true },
    { stage: 'Rejected', channel: 'Email', subject: 'Admission Update - {{school_name}}', template: 'Dear {{parent_name}},\n\nThank you for applying to {{school_name}}. After careful review, we regret to inform you that we are unable to offer admission at this time.\n\nWe wish {{student_name}} the very best.\n\nRegards,\n{{school_name}}', enabled: true },
  ]);
  const [commSearch, setCommSearch] = useState('');
  const [editingCommIdx, setEditingCommIdx] = useState<number | null>(null);

  // ═══════════════════════════════════════════
  // REPORTS TAB STATE (P1 #9)
  // ═══════════════════════════════════════════
  const [reportToggles, setReportToggles] = useState<Record<string, boolean>>({
    'Enquiry Funnel Report': true,
    'Source-wise Conversion': true,
    'Grade-wise Demand': true,
    'Counselor Performance': true,
    'Follow-up Compliance': true,
    'Waitlist Analytics': true,
    'Time-to-Admission': true,
    'Drop-off Analysis': true,
  });
  const [reportAssignments, setReportAssignments] = useState<Record<string, string[]>>({
    'Enquiry Funnel Report': ['Principal', 'School Admin'],
    'Source-wise Conversion': ['Principal', 'School Admin'],
    'Grade-wise Demand': ['Principal'],
    'Counselor Performance': ['Principal', 'School Admin'],
    'Follow-up Compliance': ['School Admin'],
    'Waitlist Analytics': ['Principal', 'School Admin'],
    'Time-to-Admission': ['Principal'],
    'Drop-off Analysis': ['Principal', 'School Admin'],
  });

  // ═══════════════════════════════════════════
  // R E N D E R
  // ═══════════════════════════════════════════
  return (
    <div className="space-y-4">
      <ModuleHeader title="Enquiry & Admission Configuration" subtitle="Pipeline, intake rules, capacity, sources, forms, and reports" theme={theme} />

      {/* ═══════════════════════════════════════════ */}
      {/* TAB: SETTINGS                              */}
      {/* ═══════════════════════════════════════════ */}
      {activeTab === 'settings' && (
        <div className="space-y-4">
          <SectionCard title="Admission Settings" subtitle="Mode, fees, and automation" theme={theme}>
            <div className="space-y-3">
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Admission Mode</p>
                <SelectField options={['Online Only', 'Offline Only', 'Both Online + Offline']} value={admissionMode} onChange={setAdmissionMode} theme={theme} />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Application Fee ({'\u20B9'})</p>
                <InputField value={applicationFee} onChange={setApplicationFee} theme={theme} type="number" />
              </div>
              {Object.entries(enqToggles).map(([feat, enabled]) => (
                <div key={feat} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <div className="flex-1 mr-3">
                    <p className={`text-xs font-bold ${theme.highlight}`}>{feat}</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>{
                      ({ 'Auto-assign Follow-ups': 'System auto-assigns follow-up tasks to counselors based on enquiry source', 'Online Application Form': 'Parents can fill the admission application form online from school website', 'Auto-generate Admission Number': 'System auto-generates unique admission number when a student is admitted', 'Document Upload Required': 'Parents must upload required documents during admission' } as Record<string, string>)[feat]
                    }</p>
                  </div>
                  <SSAToggle on={enabled} onChange={() => setEnqToggles(p => ({ ...p, [feat]: !p[feat] }))} theme={theme} />
                </div>
              ))}
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div><p className={`text-xs font-bold ${theme.highlight}`}>Photo Mandatory at Admission</p><p className={`text-[10px] ${theme.iconColor}`}>Student photo required to complete admission process</p></div>
                <SSAToggle on={photoMandatory} onChange={() => setPhotoMandatory(!photoMandatory)} theme={theme} />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Provisional Admission" subtitle="Allow conditional admission with pending requirements" theme={theme}>
            <div className="space-y-3">
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div><p className={`text-xs font-bold ${theme.highlight}`}>Allow Provisional Admission</p><p className={`text-[10px] ${theme.iconColor}`}>Admit students conditionally while requirements are pending</p></div>
                <SSAToggle on={allowProvisional} onChange={() => setAllowProvisional(!allowProvisional)} theme={theme} />
              </div>
              {allowProvisional && (
                <>
                  <div className={`p-3 rounded-xl ${theme.accentBg} border ${theme.border}`}>
                    <p className={`text-[10px] font-bold ${theme.iconColor} mb-2 uppercase tracking-wide`}>Conditions</p>
                    <div className="space-y-2">
                      {Object.entries(provisionalConditions).map(([cond, checked]) => (
                        <button key={cond} onClick={() => setProvisionalConditions(p => ({ ...p, [cond]: !p[cond] }))}
                          className={`flex items-center gap-2 w-full text-left p-2 rounded-lg ${theme.secondaryBg}`}>
                          {checked ? <CheckSquare size={14} className="text-emerald-500" /> : <Square size={14} className={theme.iconColor} />}
                          <span className={`text-xs ${theme.highlight}`}>{cond}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Auto-expire provisional after (days)</p>
                    <InputField value={provisionalExpiry} onChange={setProvisionalExpiry} theme={theme} type="number" />
                  </div>
                </>
              )}
            </div>
          </SectionCard>

          <SectionCard title="RTE 25% Quota Settings" subtitle="Right to Education lottery and audit" theme={theme}>
            <div className="space-y-3">
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div><p className={`text-xs font-bold ${theme.highlight}`}>Enable Random Lottery for Oversubscribed Classes</p><p className={`text-[10px] ${theme.iconColor}`}>Transparent random lottery when RTE applicants exceed seats</p></div>
                <SSAToggle on={enableRTELottery} onChange={() => setEnableRTELottery(!enableRTELottery)} theme={theme} />
              </div>
              <div className={`p-2.5 rounded-xl ${theme.accentBg} border ${theme.border}`}>
                <p className={`text-[10px] ${theme.iconColor}`}>Lottery audit trail: All selections logged with timestamp and randomization seed</p>
              </div>
            </div>
          </SectionCard>

          {/* Sibling / Alumni Linking (P1 #12) */}
          <SectionCard title="Sibling & Alumni Linking" subtitle="Auto-detect siblings and alumni children for priority admission" theme={theme}>
            <div className="space-y-3">
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div><p className={`text-xs font-bold ${theme.highlight}`}>Enable Sibling Detection</p><p className={`text-[10px] ${theme.iconColor}`}>Auto-detect if enquiry is from an existing student&apos;s sibling (by parent phone/email)</p></div>
                <SSAToggle on={enableSiblingLink} onChange={() => setEnableSiblingLink(!enableSiblingLink)} theme={theme} />
              </div>
              {enableSiblingLink && (
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Sibling Fee Discount (%)</p>
                  <InputField value={siblingDiscount} onChange={setSiblingDiscount} theme={theme} type="number" />
                </div>
              )}
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div><p className={`text-xs font-bold ${theme.highlight}`}>Enable Alumni Child Detection</p><p className={`text-[10px] ${theme.iconColor}`}>Check if parent is an alumni of the school (by alumni database match)</p></div>
                <SSAToggle on={enableAlumniLink} onChange={() => setEnableAlumniLink(!enableAlumniLink)} theme={theme} />
              </div>
              {enableAlumniLink && (
                <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <div><p className={`text-xs font-bold ${theme.highlight}`}>Priority Processing for Alumni Children</p><p className={`text-[10px] ${theme.iconColor}`}>Move alumni children enquiries to top of queue</p></div>
                  <SSAToggle on={alumniPriority} onChange={() => setAlumniPriority(!alumniPriority)} theme={theme} />
                </div>
              )}
            </div>
          </SectionCard>

          <SectionCard title="Auto-assign Section on Admission" subtitle="Automatically assign sections to students" theme={theme}>
            <div className="space-y-3">
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div><p className={`text-xs font-bold ${theme.highlight}`}>Enable Auto-assign Section</p><p className={`text-[10px] ${theme.iconColor}`}>Automatically place admitted students into a section</p></div>
                <SSAToggle on={autoAssignSection} onChange={() => setAutoAssignSection(!autoAssignSection)} theme={theme} />
              </div>
              {autoAssignSection && (
                <>
                  <div>
                    <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Assignment Method</p>
                    <SelectField options={['Round Robin', 'Alphabetical', 'Manual']} value={sectionMethod} onChange={setSectionMethod} theme={theme} />
                  </div>
                  <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                    <div><p className={`text-xs font-bold ${theme.highlight}`}>Balance sections equally</p><p className={`text-[10px] ${theme.iconColor}`}>Keep student count balanced across all sections</p></div>
                    <SSAToggle on={balanceSections} onChange={() => setBalanceSections(!balanceSections)} theme={theme} />
                  </div>
                </>
              )}
            </div>
          </SectionCard>

          <SectionCard title="APAAR / ABC ID (NEP 2020)" subtitle="Academic Bank of Credits integration" theme={theme}>
            <div className="space-y-3">
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div><p className={`text-xs font-bold ${theme.highlight}`}>Enable APAAR / ABC ID</p><p className={`text-[10px] ${theme.iconColor}`}>Track Academic Bank of Credits ID for students</p></div>
                <SSAToggle on={enableAPAAR} onChange={() => setEnableAPAAR(!enableAPAAR)} theme={theme} />
              </div>
              {enableAPAAR && (
                <div><p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>APAAR ID Format</p><InputField value={apaarFormat} onChange={setApaarFormat} theme={theme} /></div>
              )}
            </div>
          </SectionCard>

          {/* RBAC (P0 #6) */}
          <SectionCard title="Role-Based Access Control" subtitle="Who can view, create, approve enquiries at each pipeline stage" theme={theme}>
            <div className="space-y-4">
              <MasterPermissionGrid masterName="Enquiry Pipeline" roles={['Super Admin', 'Principal', 'School Admin', 'Counselor', 'Receptionist']} theme={theme} />
              <MasterPermissionGrid masterName="Admission Approval" roles={['Super Admin', 'Principal', 'School Admin', 'Accountant']} theme={theme} />
              <MasterPermissionGrid masterName="Waitlist Management" roles={['Super Admin', 'Principal', 'School Admin']} theme={theme} />
            </div>
          </SectionCard>

          <SectionCard title="Bulk Import" subtitle="Import enquiries and admissions from Excel" theme={theme}>
            <BulkImportWizard entityName="Enquiries" templateFields={['Student Name', 'Parent Name', 'Phone', 'Email', 'Class Applied', 'Source', 'Date', 'Status']} sampleData={[['Priya Sharma', 'Rajesh Sharma', '9876543210', 'rajesh@email.com', 'Grade 1', 'Website', '2026-03-01', 'New']]} theme={theme} />
          </SectionCard>
        </div>
      )}

      {/* ═══════════════════════════════════════════ */}
      {/* TAB: PIPELINE (P0 #1, #2, P1 #11)         */}
      {/* ═══════════════════════════════════════════ */}
      {activeTab === 'pipeline' && (
        <div className="space-y-4">
          {/* Pipeline Stages (P0 #1) */}
          <SectionCard title="Enquiry Pipeline Stages" subtitle="Define the stages an enquiry passes through — from first contact to admission or rejection" theme={theme}>
            <div className={`p-3 rounded-xl ${theme.accentBg} border ${theme.border} mb-3`}>
              <p className={`text-[10px] ${theme.iconColor} mb-2`}><strong>Visual Pipeline Flow:</strong></p>
              <div className="flex items-center gap-0 overflow-x-auto pb-1">
                {pipelineStages.map((s, i) => (
                  <React.Fragment key={s.id}>
                    <div className={`flex-shrink-0 px-3 py-1.5 rounded-lg ${s.color} text-white text-[10px] font-bold`}>{s.name}</div>
                    {i < pipelineStages.length - 1 && <ArrowRight size={14} className={theme.iconColor} />}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              {pipelineStages.map((stage, i) => (
                <div key={stage.id} className={`p-3 rounded-xl ${theme.secondaryBg} border ${theme.border}`}>
                  <div className="flex items-center gap-3">
                    <GripVertical size={14} className={theme.iconColor} />
                    <span className={`w-7 h-7 rounded-full ${stage.color} text-white flex items-center justify-center text-[10px] font-bold shrink-0`}>{i + 1}</span>
                    {editingStage === i ? (
                      <input value={stage.name} onChange={e => { const n = [...pipelineStages]; n[i] = { ...n[i], name: e.target.value }; setPipelineStages(n); }} autoFocus
                        className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                    ) : (
                      <span className={`flex-1 text-xs font-bold ${theme.highlight}`}>{stage.name}</span>
                    )}
                    <div className="flex items-center gap-2 text-[9px]">
                      {stage.autoAssign && <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-bold">Auto-assign</span>}
                      {stage.slaHours > 0 && <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-bold flex items-center gap-0.5"><Clock size={9} />{stage.slaHours}h SLA</span>}
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => setEditingStage(editingStage === i ? null : i)} className={`p-1 rounded ${theme.buttonHover}`}><Edit size={11} className={theme.iconColor} /></button>
                      {pipelineStages.length > 3 && <button onClick={() => setPipelineStages(p => p.filter((_, j) => j !== i))} className="p-1 rounded hover:bg-red-50"><Trash2 size={11} className="text-red-400" /></button>}
                    </div>
                  </div>
                  {editingStage === i && (
                    <div className="mt-3 pt-3 border-t border-dashed space-y-3" style={{ borderColor: 'currentColor', opacity: 0.3 }}>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>SLA (hours)</p>
                          <InputField value={String(stage.slaHours)} onChange={v => { const n = [...pipelineStages]; n[i] = { ...n[i], slaHours: parseInt(v) || 0 }; setPipelineStages(n); }} theme={theme} type="number" />
                        </div>
                        <div>
                          <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Auto-assign</p>
                          <SSAToggle on={stage.autoAssign} onChange={() => { const n = [...pipelineStages]; n[i] = { ...n[i], autoAssign: !n[i].autoAssign }; setPipelineStages(n); }} theme={theme} />
                        </div>
                        <div>
                          <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Actions at this stage</p>
                          <div className="flex flex-wrap gap-1">
                            {stage.actions.map((a, ai) => (
                              <span key={ai} className={`text-[9px] px-1.5 py-0.5 rounded-full ${theme.accentBg} ${theme.iconColor} font-bold flex items-center gap-0.5`}>
                                {a} <button onClick={() => { const n = [...pipelineStages]; n[i] = { ...n[i], actions: n[i].actions.filter((_, j) => j !== ai) }; setPipelineStages(n); }}><X size={8} /></button>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-3">
              <input value={newStageName} onChange={e => setNewStageName(e.target.value)} placeholder="New stage name..."
                onKeyDown={e => { if (e.key === 'Enter' && newStageName.trim()) { setPipelineStages(p => [...p, { id: Date.now(), name: newStageName.trim(), color: 'bg-gray-500', autoAssign: false, slaHours: 0, actions: [] }]); setNewStageName(''); } }}
                className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
              <button onClick={() => { if (newStageName.trim()) { setPipelineStages(p => [...p, { id: Date.now(), name: newStageName.trim(), color: 'bg-gray-500', autoAssign: false, slaHours: 0, actions: [] }]); setNewStageName(''); } }}
                className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={14} /></button>
            </div>
          </SectionCard>

          {/* Follow-up Rules (P0 #2) */}
          <SectionCard title="Follow-up Rules & Escalation" subtitle="Automated follow-up triggers, SLA breach escalation, and channel preferences" theme={theme}>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max follow-ups per enquiry</p>
                <InputField value={maxFollowUps} onChange={setMaxFollowUps} theme={theme} type="number" />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Cooldown between follow-ups (hours)</p>
                <InputField value={followUpCooldown} onChange={setFollowUpCooldown} theme={theme} type="number" />
              </div>
            </div>
            <div className="space-y-2">
              {followUpRules.map((rule, i) => (
                <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <AlertCircle size={14} className={rule.enabled ? 'text-amber-500' : theme.iconColor} />
                  <div className="flex-1">
                    <p className={`text-xs font-bold ${theme.highlight}`}>{rule.trigger}</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>Action: {rule.action} via <span className="font-bold">{rule.channel}</span></p>
                  </div>
                  <SSAToggle on={rule.enabled} onChange={() => { const n = [...followUpRules]; n[i] = { ...n[i], enabled: !n[i].enabled }; setFollowUpRules(n); }} theme={theme} />
                  <button onClick={() => setFollowUpRules(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><Trash2 size={11} /></button>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Interview Panel (P1 #11) */}
          <SectionCard title="Interview / Interaction Panel" subtitle="Configure panel members, duration, slots, and notes for parent-student interviews" theme={theme}>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Interview Duration (minutes)</p>
                <InputField value={interviewDuration} onChange={setInterviewDuration} theme={theme} type="number" />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Slots per day</p>
                <InputField value={interviewSlots} onChange={setInterviewSlots} theme={theme} type="number" />
              </div>
            </div>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg} mb-3`}>
              <div><p className={`text-xs font-bold ${theme.highlight}`}>Enable Panel Notes & Scoring</p><p className={`text-[10px] ${theme.iconColor}`}>Panel members can add notes and score candidates during interview</p></div>
              <SSAToggle on={enablePanelNotes} onChange={() => setEnablePanelNotes(!enablePanelNotes)} theme={theme} />
            </div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-2 uppercase tracking-wide`}>Panel Members</p>
            <div className="space-y-1.5">
              {interviewPanelMembers.map((m, i) => (
                <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <UserCheck size={14} className={theme.iconColor} />
                  <input value={m.name} onChange={e => { const n = [...interviewPanelMembers]; n[i] = { ...n[i], name: e.target.value }; setInterviewPanelMembers(n); }}
                    className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                  <select value={m.role} onChange={e => { const n = [...interviewPanelMembers]; n[i] = { ...n[i], role: e.target.value }; setInterviewPanelMembers(n); }}
                    className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] font-bold ${theme.highlight}`}>
                    <option value="Chair">Chair</option><option value="Member">Member</option><option value="Observer">Observer</option>
                  </select>
                  <div className="flex items-center gap-1">
                    <span className={`text-[9px] ${theme.iconColor}`}>Required</span>
                    <SSAToggle on={m.required} onChange={() => { const n = [...interviewPanelMembers]; n[i] = { ...n[i], required: !n[i].required }; setInterviewPanelMembers(n); }} theme={theme} />
                  </div>
                  <button onClick={() => setInterviewPanelMembers(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><Trash2 size={11} /></button>
                </div>
              ))}
            </div>
            <button onClick={() => setInterviewPanelMembers(p => [...p, { name: '', role: 'Member', required: false }])}
              className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl mt-2`}><Plus size={12} /> Add Panel Member</button>
          </SectionCard>
        </div>
      )}

      {/* ═══════════════════════════════════════════ */}
      {/* TAB: INTAKE (P0 #3, #4, #5, #7)           */}
      {/* ═══════════════════════════════════════════ */}
      {activeTab === 'intake' && (
        <div className="space-y-4">
          {/* Admission Test Config (P0 #3) */}
          <SectionCard title="Admission Test Configuration" subtitle="Configure entrance test subjects, passing criteria, and schedule" theme={theme}>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg} mb-3`}>
              <div><p className={`text-xs font-bold ${theme.highlight}`}>Enable Admission / Entrance Test</p><p className={`text-[10px] ${theme.iconColor}`}>Require candidates to pass an entrance test before admission</p></div>
              <SSAToggle on={enableAdmissionTest} onChange={() => setEnableAdmissionTest(!enableAdmissionTest)} theme={theme} />
            </div>
            {enableAdmissionTest && (
              <>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Applicable from</p>
                    <SelectField options={['All Grades', 'Grade 1 and above', 'Grade 2 and above', 'Grade 6 and above', 'Grade 9 and above']} value={testGradeApplicable} onChange={setTestGradeApplicable} theme={theme} />
                  </div>
                  <div>
                    <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Schedule Mode</p>
                    <SelectField options={['Fixed Dates', 'Rolling (anytime)', 'Batch-wise']} value={testScheduleMode} onChange={setTestScheduleMode} theme={theme} />
                  </div>
                </div>
                <TableToolbar search={testSearch} onSearch={v => { setTestSearch(v); setTestPage(1); }} count={filteredTests.length} total={testSubjects.length} theme={theme} label="subjects" />
                <div className={`rounded-xl border ${theme.border} overflow-hidden mb-3`}>
                  <table className="w-full text-xs">
                    <thead className={theme.secondaryBg}>
                      <tr>{['Subject', 'Max Marks', 'Passing Marks', 'Duration (min)', 'Enabled', 'Actions'].map(h => (
                        <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor} text-[10px] uppercase`}>{h}</th>
                      ))}</tr>
                    </thead>
                    <tbody>
                      {filteredTests.slice((testPage - 1) * PAGE_SIZE, testPage * PAGE_SIZE).map((t) => {
                        const i = testSubjects.findIndex(x => x.subject === t.subject);
                        return (
                          <tr key={i} className={`border-t ${theme.border}`}>
                            <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{t.subject}</td>
                            <td className="px-3 py-2"><input type="number" value={t.maxMarks} onChange={e => { const n = [...testSubjects]; n[i] = { ...n[i], maxMarks: parseInt(e.target.value) || 0 }; setTestSubjects(n); }}
                              className={`w-16 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none text-center`} /></td>
                            <td className="px-3 py-2"><input type="number" value={t.passingMarks} onChange={e => { const n = [...testSubjects]; n[i] = { ...n[i], passingMarks: parseInt(e.target.value) || 0 }; setTestSubjects(n); }}
                              className={`w-16 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none text-center`} /></td>
                            <td className="px-3 py-2"><input type="number" value={t.duration} onChange={e => { const n = [...testSubjects]; n[i] = { ...n[i], duration: parseInt(e.target.value) || 0 }; setTestSubjects(n); }}
                              className={`w-16 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none text-center`} /></td>
                            <td className="px-3 py-2"><SSAToggle on={t.enabled} onChange={() => { const n = [...testSubjects]; n[i] = { ...n[i], enabled: !n[i].enabled }; setTestSubjects(n); }} theme={theme} /></td>
                            <td className="px-3 py-2"><button onClick={() => setTestSubjects(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><Trash2 size={11} /></button></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <Pagination page={testPage} totalPages={testTotalPages} onPage={setTestPage} theme={theme} />
                <button onClick={() => setTestSubjects(p => [...p, { subject: 'New Subject', maxMarks: 50, passingMarks: 20, duration: 45, enabled: true }])}
                  className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl mt-2`}><Plus size={12} /> Add Subject</button>
              </>
            )}
          </SectionCard>

          {/* Admission Criteria / Eligibility (P0 #4) */}
          <SectionCard title="Admission Criteria & Eligibility" subtitle="Grade-wise age limits, marks requirements, and mandatory documents" theme={theme}>
            <TableToolbar search={eligSearch} onSearch={v => { setEligSearch(v); setEligPage(1); }} count={filteredElig.length} total={eligibilityRules.length} theme={theme} label="grades" />
            <div className="space-y-2">
              {filteredElig.slice((eligPage - 1) * PAGE_SIZE, eligPage * PAGE_SIZE).map((rule) => {
                const i = eligibilityRules.findIndex(x => x.grade === rule.grade);
                return (
                  <div key={i} className={`p-3 rounded-xl ${theme.secondaryBg} border ${theme.border}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-xs font-bold ${theme.highlight}`}>{rule.grade}</span>
                      <div className="flex-1" />
                      {rule.marksRequired && <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-bold">Min {rule.minMarks}%</span>}
                      <button onClick={() => setEligibilityRules(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><Trash2 size={11} /></button>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <div>
                        <p className={`text-[9px] ${theme.iconColor} mb-0.5`}>Min Age</p>
                        <input value={rule.minAge} onChange={e => { const n = [...eligibilityRules]; n[i] = { ...n[i], minAge: e.target.value }; setEligibilityRules(n); }}
                          placeholder="—" className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight} outline-none`} />
                      </div>
                      <div>
                        <p className={`text-[9px] ${theme.iconColor} mb-0.5`}>Max Age</p>
                        <input value={rule.maxAge} onChange={e => { const n = [...eligibilityRules]; n[i] = { ...n[i], maxAge: e.target.value }; setEligibilityRules(n); }}
                          placeholder="—" className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight} outline-none`} />
                      </div>
                      <div>
                        <p className={`text-[9px] ${theme.iconColor} mb-0.5`}>Marks Required</p>
                        <SSAToggle on={rule.marksRequired} onChange={() => { const n = [...eligibilityRules]; n[i] = { ...n[i], marksRequired: !n[i].marksRequired }; setEligibilityRules(n); }} theme={theme} />
                      </div>
                      {rule.marksRequired && (
                        <div>
                          <p className={`text-[9px] ${theme.iconColor} mb-0.5`}>Min Marks (%)</p>
                          <input type="number" value={rule.minMarks} onChange={e => { const n = [...eligibilityRules]; n[i] = { ...n[i], minMarks: parseInt(e.target.value) || 0 }; setEligibilityRules(n); }}
                            className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight} outline-none`} />
                        </div>
                      )}
                    </div>
                    <div className="mt-2">
                      <p className={`text-[9px] ${theme.iconColor} mb-1`}>Required Documents:</p>
                      <div className="flex flex-wrap gap-1">
                        {rule.docsRequired.map((doc, di) => (
                          <span key={di} className={`text-[9px] px-1.5 py-0.5 rounded-full ${theme.accentBg} ${theme.iconColor} font-bold flex items-center gap-0.5`}>
                            <FileText size={8} /> {doc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <Pagination page={eligPage} totalPages={eligTotalPages} onPage={setEligPage} theme={theme} />
          </SectionCard>

          {/* Document Requirements (P0 #5) */}
          <SectionCard title="Document Requirements" subtitle="Master list of documents required for admission — per-grade applicability" theme={theme}>
            <TableToolbar search={docSearch} onSearch={v => { setDocSearch(v); setDocPage(1); }} count={filteredDocs.length} total={docRequirements.length} theme={theme} label="documents" />
            <div className={`rounded-xl border ${theme.border} overflow-hidden mb-3`}>
              <table className="w-full text-xs">
                <thead className={theme.secondaryBg}>
                  <tr>{['Document', 'Mandatory', 'Format', 'Max Size', 'Applicable Grades', 'Actions'].map(h => (
                    <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor} text-[10px] uppercase`}>{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {filteredDocs.slice((docPage - 1) * PAGE_SIZE, docPage * PAGE_SIZE).map((doc) => {
                    const i = docRequirements.findIndex(x => x.name === doc.name);
                    return (
                      <tr key={i} className={`border-t ${theme.border}`}>
                        <td className={`px-3 py-2 font-bold ${theme.highlight}`}>
                          <div className="flex items-center gap-1.5"><FileText size={11} className={theme.iconColor} />{doc.name}</div>
                        </td>
                        <td className="px-3 py-2"><SSAToggle on={doc.mandatory} onChange={() => { const n = [...docRequirements]; n[i] = { ...n[i], mandatory: !n[i].mandatory }; setDocRequirements(n); }} theme={theme} /></td>
                        <td className={`px-3 py-2 text-[10px] ${theme.iconColor}`}>{doc.format}</td>
                        <td className={`px-3 py-2 text-[10px] ${theme.iconColor}`}>{doc.maxSize}</td>
                        <td className="px-3 py-2"><span className={`text-[9px] px-1.5 py-0.5 rounded-full ${theme.accentBg} ${theme.iconColor} font-bold`}>{doc.forGrades}</span></td>
                        <td className="px-3 py-2"><button onClick={() => setDocRequirements(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><Trash2 size={11} /></button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Pagination page={docPage} totalPages={docTotalPages} onPage={setDocPage} theme={theme} />
            <button onClick={() => setDocRequirements(p => [...p, { name: 'New Document', mandatory: false, format: 'PDF/Image', maxSize: '5 MB', forGrades: 'All' }])}
              className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl mt-2`}><Plus size={12} /> Add Document</button>
          </SectionCard>

          {/* Class Capacity & Waitlist (P0 #7 — moved from Academic Config) */}
          <SectionCard title="Class Capacity & Waitlist" subtitle="Maximum strength per section, current enrollment, and waitlist management" theme={theme}>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg} mb-3`}>
              <div><p className={`text-xs font-bold ${theme.highlight}`}>Enable Waitlist Management</p><p className={`text-[10px] ${theme.iconColor}`}>When a class is full, new applicants are added to a waitlist</p></div>
              <SSAToggle on={enableWaitlist} onChange={() => setEnableWaitlist(!enableWaitlist)} theme={theme} />
            </div>
            {enableWaitlist && (
              <div className="grid grid-cols-3 gap-3 mb-3">
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Auto-Promote</p>
                  <SelectField options={['Automatic', 'Manual Approval', 'Disabled']} value={waitlistAutoPromote} onChange={setWaitlistAutoPromote} theme={theme} />
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Notification</p>
                  <SelectField options={['SMS', 'Email', 'Both']} value={waitlistNotification} onChange={setWaitlistNotification} theme={theme} />
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max Waitlist / Class</p>
                  <InputField value={maxWaitlist} onChange={setMaxWaitlist} theme={theme} type="number" />
                </div>
              </div>
            )}
            <TableToolbar search={capSearch} onSearch={v => { setCapSearch(v); setCapPage(1); }} count={filteredCap.length} total={classCapacity.length} theme={theme} label="grades" />
            <div className={`rounded-xl border ${theme.border} overflow-hidden mb-3`}>
              <table className="w-full text-xs">
                <thead className={theme.secondaryBg}>
                  <tr>{['Grade', 'Sections', 'Max / Section', 'Total Capacity', 'Current', 'Waitlisted', 'Fill %', 'Actions'].map(h => (
                    <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor} text-[10px] uppercase`}>{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {filteredCap.slice((capPage - 1) * PAGE_SIZE, capPage * PAGE_SIZE).map((c) => {
                    const i = classCapacity.findIndex(x => x.grade === c.grade);
                    const fillPct = c.total > 0 ? Math.round((c.current / c.total) * 100) : 0;
                    if (capEditIdx === i) {
                      return (
                        <tr key={i} className={`border-t ${theme.border} bg-blue-50`}>
                          <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{c.grade}</td>
                          <td className="px-3 py-2"><input type="number" value={capEditRow.sections} onChange={e => setCapEditRow(p => ({ ...p, sections: parseInt(e.target.value) || 0, total: (parseInt(e.target.value) || 0) * p.maxPerSection }))}
                            className={`w-14 px-2 py-1 rounded border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none text-center`} /></td>
                          <td className="px-3 py-2"><input type="number" value={capEditRow.maxPerSection} onChange={e => setCapEditRow(p => ({ ...p, maxPerSection: parseInt(e.target.value) || 0, total: p.sections * (parseInt(e.target.value) || 0) }))}
                            className={`w-14 px-2 py-1 rounded border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none text-center`} /></td>
                          <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{capEditRow.sections * capEditRow.maxPerSection}</td>
                          <td className="px-3 py-2"><input type="number" value={capEditRow.current} onChange={e => setCapEditRow(p => ({ ...p, current: parseInt(e.target.value) || 0 }))}
                            className={`w-14 px-2 py-1 rounded border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none text-center`} /></td>
                          <td className="px-3 py-2"><input type="number" value={capEditRow.waitlisted} onChange={e => setCapEditRow(p => ({ ...p, waitlisted: parseInt(e.target.value) || 0 }))}
                            className={`w-14 px-2 py-1 rounded border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none text-center`} /></td>
                          <td className="px-3 py-2">—</td>
                          <td className="px-3 py-2 flex gap-1">
                            <button onClick={() => { const n = [...classCapacity]; n[i] = { ...capEditRow, total: capEditRow.sections * capEditRow.maxPerSection }; setClassCapacity(n); setCapEditIdx(null); }}
                              className="text-[10px] font-bold text-emerald-600 px-2 py-1 rounded-lg hover:bg-emerald-50">Save</button>
                            <button onClick={() => setCapEditIdx(null)} className={`text-[10px] font-bold ${theme.iconColor} px-2 py-1 rounded-lg`}>Cancel</button>
                          </td>
                        </tr>
                      );
                    }
                    return (
                      <tr key={i} className={`border-t ${theme.border}`}>
                        <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{c.grade}</td>
                        <td className={`px-3 py-2 ${theme.iconColor}`}>{c.sections}</td>
                        <td className={`px-3 py-2 ${theme.iconColor}`}>{c.maxPerSection}</td>
                        <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{c.total}</td>
                        <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{c.current}</td>
                        <td className="px-3 py-2">
                          {c.waitlisted > 0 ? <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold">{c.waitlisted}</span>
                            : <span className={`text-[10px] ${theme.iconColor}`}>0</span>}
                        </td>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-1.5">
                            <div className={`w-12 h-1.5 rounded-full ${theme.secondaryBg}`}>
                              <div className={`h-1.5 rounded-full ${fillPct >= 95 ? 'bg-red-500' : fillPct >= 80 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(fillPct, 100)}%` }} />
                            </div>
                            <span className={`text-[9px] font-bold ${fillPct >= 95 ? 'text-red-600' : fillPct >= 80 ? 'text-amber-600' : 'text-emerald-600'}`}>{fillPct}%</span>
                          </div>
                        </td>
                        <td className="px-3 py-2">
                          <button onClick={() => { setCapEditIdx(i); setCapEditRow({ ...c }); }} className={`text-[10px] font-bold ${theme.iconColor} hover:opacity-70 px-2 py-1 rounded-lg ${theme.secondaryBg}`}><Edit size={11} /></button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Pagination page={capPage} totalPages={capTotalPages} onPage={setCapPage} theme={theme} />
            <div className={`mt-3 p-2.5 rounded-xl ${theme.accentBg} border ${theme.border}`}>
              <p className={`text-[10px] ${theme.iconColor}`}>
                <strong>Summary:</strong> {classCapacity.reduce((s, c) => s + c.total, 0)} total seats | {classCapacity.reduce((s, c) => s + c.current, 0)} enrolled | {classCapacity.reduce((s, c) => s + c.waitlisted, 0)} waitlisted | {classCapacity.reduce((s, c) => s + (c.total - c.current), 0)} available
              </p>
            </div>
          </SectionCard>
        </div>
      )}

      {/* ═══════════════════════════════════════════ */}
      {/* TAB: SOURCES (existing)                    */}
      {/* ═══════════════════════════════════════════ */}
      {activeTab === 'sources' && (
        <div className="space-y-4">
          <SectionCard title="Lead Sources" subtitle="Manage enquiry lead sources with enable/disable" theme={theme}>
            <TableToolbar search={leadSourceSearch} onSearch={v => { setLeadSourceSearch(v); setLeadSourcePage(1); }} count={filteredLeadSources.length} total={leadSources.length} theme={theme} />
            <div className={`rounded-xl border ${theme.border} overflow-hidden mb-3`}>
              <table className="w-full text-xs">
                <thead className={theme.secondaryBg}>
                  <tr>{['Source Name', 'Enabled', 'Actions'].map(h => (
                    <th key={h} className={`text-left px-3 py-2.5 font-bold ${theme.iconColor} text-[10px] uppercase`}>{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {pagedLeadSources.map((s) => {
                    const realIdx = leadSources.findIndex(x => x.name === s.name);
                    return (
                      <tr key={realIdx} className={`border-t ${theme.border}`}>
                        <td className="px-3 py-2.5">
                          {editingLeadIdx === realIdx ? (
                            <input value={editingLeadName} onChange={e => setEditingLeadName(e.target.value)} autoFocus
                              className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                          ) : (
                            <div className="flex items-center gap-1.5">
                              <CheckCircle size={10} className={s.enabled ? 'text-emerald-500' : 'text-slate-300'} />
                              <span className={`text-xs font-medium ${theme.highlight}`}>{s.name}</span>
                            </div>
                          )}
                        </td>
                        <td className="px-3 py-2.5"><SSAToggle on={s.enabled} onChange={() => setLeadSources(p => p.map((x, j) => j === realIdx ? { ...x, enabled: !x.enabled } : x))} theme={theme} /></td>
                        <td className="px-3 py-2.5">
                          <div className="flex items-center gap-2">
                            {editingLeadIdx === realIdx ? (
                              <>
                                <button onClick={() => { if (editingLeadName.trim()) setLeadSources(p => p.map((x, j) => j === realIdx ? { ...x, name: editingLeadName.trim() } : x)); setEditingLeadIdx(null); }}
                                  className="text-[10px] font-bold text-emerald-600 hover:text-emerald-800 px-2 py-1 rounded-lg hover:bg-emerald-50">Save</button>
                                <button onClick={() => setEditingLeadIdx(null)} className={`text-[10px] font-bold ${theme.iconColor} px-2 py-1 rounded-lg`}>Cancel</button>
                              </>
                            ) : (
                              <>
                                <button onClick={() => { setEditingLeadIdx(realIdx); setEditingLeadName(s.name); }} className={`text-[10px] font-bold ${theme.iconColor} px-2 py-1 rounded-lg ${theme.secondaryBg}`}><Edit size={11} /></button>
                                <button onClick={() => setLeadSources(p => p.filter((_, j) => j !== realIdx))} className="text-red-400 hover:text-red-600"><X size={11} /></button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {pagedLeadSources.length === 0 && <tr><td colSpan={3} className={`px-3 py-4 text-center text-xs ${theme.iconColor}`}>No lead sources found</td></tr>}
                </tbody>
              </table>
            </div>
            <Pagination page={leadSourcePage} totalPages={leadTotalPages} onPage={setLeadSourcePage} theme={theme} />
            <div className="flex gap-2 mt-3">
              <input value={newLeadSource} onChange={e => setNewLeadSource(e.target.value)} placeholder="Add source..."
                onKeyDown={e => { if (e.key === 'Enter' && newLeadSource.trim()) { setLeadSources(p => [...p, { name: newLeadSource.trim(), enabled: true }]); setNewLeadSource(''); } }}
                className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
              <button onClick={() => { if (newLeadSource.trim()) { setLeadSources(p => [...p, { name: newLeadSource.trim(), enabled: true }]); setNewLeadSource(''); } }}
                className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={14} /></button>
            </div>
          </SectionCard>

          <SectionCard title="Enquiry Sources" subtitle="Detailed source tracking with priority order" theme={theme}>
            <TableToolbar search={enqSourceSearch} onSearch={v => { setEnqSourceSearch(v); setEnqSourcePage(1); }} count={filteredEnqSources.length} total={enquirySources.length} theme={theme} />
            <div className="space-y-1.5">
              {pagedEnqSources.map((s) => {
                const i = enquirySources.findIndex(x => x.name === s.name && x.priority === s.priority);
                return (
                  <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${theme.secondaryBg}`}>
                    <span className={`text-[10px] w-6 h-6 rounded-full ${theme.primary} text-white flex items-center justify-center font-bold shrink-0`}>{s.priority}</span>
                    <input value={s.name} onChange={e => { const n = [...enquirySources]; n[i] = { ...n[i], name: e.target.value }; setEnquirySources(n); }}
                      className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-medium ${theme.highlight} outline-none`} />
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => { if (s.priority > 1) { const n = [...enquirySources]; const idx = n.findIndex(x => x.priority === s.priority - 1); if (idx >= 0) n[idx] = { ...n[idx], priority: s.priority }; n[i] = { ...n[i], priority: s.priority - 1 }; setEnquirySources(n); } }}
                        className={`${theme.buttonHover} p-1 rounded`}><ChevronUp size={12} className={theme.iconColor} /></button>
                      <button onClick={() => { const n = [...enquirySources]; const idx = n.findIndex(x => x.priority === s.priority + 1); if (idx >= 0) n[idx] = { ...n[idx], priority: s.priority }; n[i] = { ...n[i], priority: s.priority + 1 }; setEnquirySources(n); }}
                        className={`${theme.buttonHover} p-1 rounded`}><ChevronDown size={12} className={theme.iconColor} /></button>
                    </div>
                    <SSAToggle on={s.active} onChange={() => { const n = [...enquirySources]; n[i] = { ...n[i], active: !n[i].active }; setEnquirySources(n); }} theme={theme} />
                    <button onClick={() => setEnquirySources(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={12} /></button>
                  </div>
                );
              })}
              {pagedEnqSources.length === 0 && <p className={`text-center text-xs ${theme.iconColor} py-4`}>No enquiry sources found</p>}
            </div>
            <Pagination page={enqSourcePage} totalPages={enqTotalPages} onPage={setEnqSourcePage} theme={theme} />
            <div className="flex gap-2 mt-3">
              <input value={newEnqSource} onChange={e => setNewEnqSource(e.target.value)} placeholder="Add enquiry source..."
                onKeyDown={e => { if (e.key === 'Enter' && newEnqSource.trim()) { setEnquirySources(p => [...p, { name: newEnqSource.trim(), active: true, priority: p.length + 1 }]); setNewEnqSource(''); } }}
                className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
              <button onClick={() => { if (newEnqSource.trim()) { setEnquirySources(p => [...p, { name: newEnqSource.trim(), active: true, priority: p.length + 1 }]); setNewEnqSource(''); } }}
                className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={14} /></button>
            </div>
          </SectionCard>
        </div>
      )}

      {/* ═══════════════════════════════════════════ */}
      {/* TAB: PROCESS (existing + P1 #10)           */}
      {/* ═══════════════════════════════════════════ */}
      {activeTab === 'process' && (
        <div className="space-y-4">
          <SectionCard title="Website Integration" subtitle="Embed enquiry form on school website, share direct link, or QR code" theme={theme}>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg} mb-3`}>
              <div><p className={`text-xs font-bold ${theme.highlight}`}>Enable Online Application Form</p><p className={`text-[10px] ${theme.iconColor}`}>Parents can apply online from your website or via direct link</p></div>
              <SSAToggle on={enableOnlineForm} onChange={() => setEnableOnlineForm(!enableOnlineForm)} theme={theme} />
            </div>
            {enableOnlineForm && (
              <>
                <div className={`p-3 rounded-xl ${theme.secondaryBg} mb-3`}>
                  <div className="flex items-center gap-1.5 mb-2"><Globe size={12} className={theme.iconColor} /><p className={`text-[10px] font-bold ${theme.iconColor} uppercase tracking-wide`}>Embed Code</p></div>
                  <div className={`p-2.5 rounded-lg bg-gray-900 text-green-400 text-[10px] font-mono mb-2 overflow-x-auto`}>{embedCode}</div>
                  <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Copy size={12} /> Copy</button>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
                    <div className="flex items-center gap-1.5 mb-2"><Link size={12} className={theme.iconColor} /><p className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>Direct Link</p></div>
                    <div className={`px-2.5 py-2 rounded-lg ${theme.cardBg} border ${theme.border} text-[10px] ${theme.highlight} font-mono mb-2 break-all`}>{directLink}</div>
                    <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Copy size={12} /> Copy</button>
                  </div>
                  <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
                    <div className="flex items-center gap-1.5 mb-2"><QrCode size={12} className={theme.iconColor} /><p className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>QR Code</p></div>
                    <div className={`h-24 w-24 rounded-lg ${theme.cardBg} border-2 border-dashed ${theme.border} flex items-center justify-center mx-auto mb-2`}>
                      <div className="text-center"><QrCode size={32} className={theme.iconColor} /><p className={`text-[8px] ${theme.iconColor} mt-1`}>QR Preview</p></div>
                    </div>
                    <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${theme.border} ${theme.buttonHover} text-xs font-bold ${theme.highlight} w-full justify-center`}>Download QR</button>
                  </div>
                </div>
              </>
            )}
          </SectionCard>

          <SectionCard title="Custom Form Fields" subtitle="Configure fields on the enquiry/application form — add custom fields per school" theme={theme}>
            <TableToolbar search={cfSearch} onSearch={v => { setCfSearch(v); setCfPage(1); }} count={filteredCustomFields.length} total={customFields.length} theme={theme} />
            <div className="overflow-x-auto mb-3">
              <table className="w-full text-xs">
                <thead><tr className={theme.secondaryBg}>{['Field Label', 'Type', 'Required', 'Actions'].map(h => (
                  <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor}`}>{h}</th>
                ))}</tr></thead>
                <tbody>
                  {pagedCustomFields.map((f) => {
                    const realIdx = customFields.findIndex(x => x.label === f.label && x.type === f.type);
                    return (
                      <tr key={realIdx} className={`border-t ${theme.border}`}>
                        <td className={`px-3 py-2 font-bold ${theme.highlight}`}>
                          {editingCfIdx === realIdx ? (
                            <input value={editingCfLabel} onChange={e => setEditingCfLabel(e.target.value)} autoFocus
                              className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                          ) : (
                            <>{f.label}{f.builtin && <span className={`ml-1.5 text-[8px] px-1 py-0.5 rounded ${theme.accentBg} ${theme.iconColor} font-bold`}>BUILT-IN</span>}</>
                          )}
                        </td>
                        <td className={`px-3 py-2 ${theme.iconColor}`}>
                          {editingCfIdx === realIdx ? (
                            <select value={editingCfType} onChange={e => setEditingCfType(e.target.value)}
                              className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}>
                              {['Text', 'Number', 'Date', 'Dropdown', 'File Upload', 'Textarea', 'Checkbox'].map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                          ) : f.type}
                        </td>
                        <td className="px-3 py-2"><SSAToggle on={f.required} onChange={() => { const n = [...customFields]; n[realIdx] = { ...n[realIdx], required: !n[realIdx].required }; setCustomFields(n); }} theme={theme} /></td>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-2">
                            {editingCfIdx === realIdx ? (
                              <>
                                <button onClick={() => { if (editingCfLabel.trim()) setCustomFields(p => p.map((x, j) => j === realIdx ? { ...x, label: editingCfLabel.trim(), type: editingCfType } : x)); setEditingCfIdx(null); }}
                                  className="text-[10px] font-bold text-emerald-600 px-2 py-1 rounded-lg hover:bg-emerald-50">Save</button>
                                <button onClick={() => setEditingCfIdx(null)} className={`text-[10px] font-bold ${theme.iconColor} px-2 py-1 rounded-lg`}>Cancel</button>
                              </>
                            ) : (
                              <>
                                {!f.builtin && <button onClick={() => { setEditingCfIdx(realIdx); setEditingCfLabel(f.label); setEditingCfType(f.type); }} className={`text-[10px] font-bold ${theme.iconColor} px-2 py-1 rounded-lg ${theme.secondaryBg}`}><Edit size={11} /></button>}
                                {!f.builtin && <button onClick={() => setCustomFields(p => p.filter((_, j) => j !== realIdx))} className="text-red-400 hover:text-red-600"><X size={12} /></button>}
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {pagedCustomFields.length === 0 && <tr><td colSpan={4} className={`px-3 py-4 text-center text-xs ${theme.iconColor}`}>No fields found</td></tr>}
                </tbody>
              </table>
            </div>
            <Pagination page={cfPage} totalPages={cfTotalPages} onPage={setCfPage} theme={theme} />
            {showAddField ? (
              <div className={`p-3 rounded-xl ${theme.accentBg} border ${theme.border} mt-3`}>
                <div className="flex items-center justify-between mb-2">
                  <p className={`text-xs font-bold ${theme.highlight}`}>Add Custom Field</p>
                  <button onClick={() => setShowAddField(false)} className="text-gray-400 hover:text-gray-600"><X size={14} /></button>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div><p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Label</p><InputField value={newFieldLabel} onChange={setNewFieldLabel} theme={theme} placeholder="e.g. Father's Occupation" /></div>
                  <div><p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Type</p><SelectField options={['Text', 'Number', 'Date', 'Dropdown', 'File Upload', 'Textarea', 'Checkbox']} value={newFieldType} onChange={setNewFieldType} theme={theme} /></div>
                  <div><p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Required</p><SSAToggle on={newFieldRequired} onChange={() => setNewFieldRequired(!newFieldRequired)} theme={theme} /></div>
                </div>
                <button onClick={() => { if (newFieldLabel.trim()) { setCustomFields(p => [...p, { label: newFieldLabel.trim(), type: newFieldType, required: newFieldRequired, builtin: false }]); setNewFieldLabel(''); setNewFieldType('Text'); setNewFieldRequired(false); setShowAddField(false); } }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={12} /> Add Field</button>
              </div>
            ) : (
              <button onClick={() => setShowAddField(true)} className={`flex items-center gap-1.5 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl border ${theme.border} mt-3`}><Plus size={12} /> Add Custom Field</button>
            )}
          </SectionCard>

          <SectionCard title="Admission Flow Steps" subtitle="Visual overview of the admission process" theme={theme}>
            <div className="flex items-start gap-0 overflow-x-auto pb-2">
              {admissionSteps.map((step, i) => (
                <React.Fragment key={step.step}>
                  <div className={`flex-shrink-0 w-36 p-3 rounded-xl ${theme.secondaryBg} border ${step.status === 'optional' ? 'border-dashed border-amber-300' : theme.border}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${step.status === 'optional' ? 'bg-amber-400' : theme.primary}`}>{step.step}</span>
                      {step.status === 'optional' && <span className="text-[8px] px-1 py-0.5 rounded bg-amber-100 text-amber-700 font-bold">OPTIONAL</span>}
                    </div>
                    <p className={`text-xs font-bold ${theme.highlight} mb-1`}>{step.name}</p>
                    <p className={`text-[9px] ${theme.iconColor} leading-relaxed`}>{step.desc}</p>
                  </div>
                  {i < admissionSteps.length - 1 && <div className="flex items-center px-1 pt-6 shrink-0"><ArrowRight size={14} className={theme.iconColor} /></div>}
                </React.Fragment>
              ))}
            </div>
          </SectionCard>

          {/* Communication Templates (P1 #10) */}
          <SectionCard title="Communication Templates" subtitle="Auto-SMS, email, and WhatsApp templates at each pipeline stage" theme={theme}>
            <div className="flex items-center gap-2 mb-3">
              <div className={`flex items-center gap-1.5 flex-1 px-3 py-1.5 rounded-xl border ${theme.border} ${theme.inputBg}`}>
                <Search size={12} className={theme.iconColor} />
                <input value={commSearch} onChange={e => setCommSearch(e.target.value)} placeholder="Search templates..."
                  className={`flex-1 bg-transparent text-xs ${theme.highlight} outline-none`} />
              </div>
            </div>
            <div className="space-y-2">
              {commTemplates.filter(t => !commSearch || t.stage.toLowerCase().includes(commSearch.toLowerCase()) || t.channel.toLowerCase().includes(commSearch.toLowerCase())).map((tpl, i) => (
                <div key={i} className={`p-3 rounded-xl ${theme.secondaryBg} border ${theme.border}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                      tpl.channel === 'SMS' ? 'bg-blue-100 text-blue-700' :
                      tpl.channel === 'Email' ? 'bg-purple-100 text-purple-700' :
                      'bg-green-100 text-green-700'
                    }`}>{tpl.channel}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${theme.accentBg} ${theme.iconColor}`}>{tpl.stage}</span>
                    {tpl.subject && <span className={`text-[10px] font-bold ${theme.highlight} flex-1`}>{tpl.subject}</span>}
                    <div className="flex items-center gap-1.5 ml-auto">
                      <SSAToggle on={tpl.enabled} onChange={() => { const n = [...commTemplates]; n[i] = { ...n[i], enabled: !n[i].enabled }; setCommTemplates(n); }} theme={theme} />
                      <button onClick={() => setEditingCommIdx(editingCommIdx === i ? null : i)} className={`p-1 rounded ${theme.buttonHover}`}><Edit size={11} className={theme.iconColor} /></button>
                    </div>
                  </div>
                  {editingCommIdx === i ? (
                    <div className="space-y-2">
                      {tpl.channel === 'Email' && (
                        <div><p className={`text-[9px] ${theme.iconColor} mb-0.5`}>Subject</p>
                          <input value={tpl.subject} onChange={e => { const n = [...commTemplates]; n[i] = { ...n[i], subject: e.target.value }; setCommTemplates(n); }}
                            className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} /></div>
                      )}
                      <div><p className={`text-[9px] ${theme.iconColor} mb-0.5`}>Template Body</p>
                        <textarea value={tpl.template} onChange={e => { const n = [...commTemplates]; n[i] = { ...n[i], template: e.target.value }; setCommTemplates(n); }}
                          rows={4} className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight} outline-none resize-none font-mono`} /></div>
                      <div className={`p-2 rounded-lg ${theme.accentBg}`}>
                        <p className={`text-[9px] ${theme.iconColor}`}><strong>Variables:</strong> {'{{parent_name}}, {{student_name}}, {{school_name}}, {{grade}}, {{academic_year}}, {{admission_no}}, {{school_phone}}, {{school_address}}, {{visit_date}}, {{test_date}}, {{deadline}}, {{payment_link}}'}</p>
                      </div>
                    </div>
                  ) : (
                    <p className={`text-[10px] ${theme.iconColor} line-clamp-2`}>{tpl.template.substring(0, 120)}{tpl.template.length > 120 ? '...' : ''}</p>
                  )}
                </div>
              ))}
            </div>
            <button onClick={() => setCommTemplates(p => [...p, { stage: 'New Enquiry', channel: 'SMS', subject: '', template: '', enabled: true }])}
              className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl mt-3`}><Plus size={12} /> Add Template</button>
          </SectionCard>
        </div>
      )}

      {/* ═══════════════════════════════════════════ */}
      {/* TAB: REPORTS (P1 #9)                       */}
      {/* ═══════════════════════════════════════════ */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          <SectionCard title="Conversion Funnel Configuration" subtitle="Configure which reports are generated and who sees them" theme={theme}>
            <div className={`p-3 rounded-xl ${theme.accentBg} border ${theme.border} mb-3`}>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Visual Funnel Preview:</p>
              <div className="flex flex-col items-center gap-1">
                {[
                  { label: 'Total Enquiries', width: '100%', color: 'bg-blue-400' },
                  { label: 'Follow-ups Done', width: '85%', color: 'bg-blue-500' },
                  { label: 'School Visits', width: '65%', color: 'bg-indigo-500' },
                  { label: 'Tests Taken', width: '50%', color: 'bg-purple-500' },
                  { label: 'Offers Made', width: '35%', color: 'bg-emerald-500' },
                  { label: 'Admitted', width: '25%', color: 'bg-green-600' },
                ].map(f => (
                  <div key={f.label} className={`${f.color} text-white text-[9px] font-bold py-1.5 rounded-lg text-center`} style={{ width: f.width }}>{f.label}</div>
                ))}
              </div>
            </div>

            <p className={`text-[10px] font-bold ${theme.iconColor} mb-2 uppercase tracking-wide`}>Available Reports</p>
            <div className="space-y-2">
              {Object.entries(reportToggles).map(([report, enabled]) => (
                <div key={report} className={`flex items-center gap-3 p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <BarChart3 size={14} className={enabled ? 'text-emerald-500' : theme.iconColor} />
                  <div className="flex-1">
                    <p className={`text-xs font-bold ${theme.highlight}`}>{report}</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>
                      Visible to: {(reportAssignments[report] || []).map(r => (
                        <span key={r} className={`inline-block text-[8px] px-1 py-0.5 rounded ${theme.accentBg} font-bold mr-1`}>{r}</span>
                      ))}
                    </p>
                  </div>
                  <SSAToggle on={enabled} onChange={() => setReportToggles(p => ({ ...p, [report]: !p[report] }))} theme={theme} />
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Report Metrics" subtitle="Key metrics tracked across the enquiry-to-admission journey" theme={theme}>
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: 'Avg. Time to Admission', value: '18 days', icon: Clock },
                { label: 'Conversion Rate', value: '34%', icon: BarChart3 },
                { label: 'Follow-up Compliance', value: '87%', icon: CheckCircle },
                { label: 'Drop-off at Test Stage', value: '22%', icon: AlertCircle },
                { label: 'Top Source', value: 'Website', icon: Globe },
                { label: 'Waitlisted', value: '23', icon: Users },
                { label: 'Pending Follow-ups', value: '12', icon: Phone },
                { label: 'Open Enquiries', value: '45', icon: MessageSquare },
              ].map(m => (
                <div key={m.label} className={`p-3 rounded-xl ${theme.secondaryBg} border ${theme.border} text-center`}>
                  <m.icon size={16} className={`${theme.iconColor} mx-auto mb-1`} />
                  <p className={`text-sm font-bold ${theme.highlight}`}>{m.value}</p>
                  <p className={`text-[9px] ${theme.iconColor}`}>{m.label}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      )}

      {/* ─── Global Save Button ─── */}
      <div className="flex justify-end pt-2 pb-4">
        <button onClick={handleSave}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all ${saved ? 'bg-emerald-500 hover:bg-emerald-600' : `${theme.primary} hover:opacity-90`}`}>
          {saved ? <><Check size={15} /> Saved</> : <><Save size={15} /> Save Configuration</>}
        </button>
      </div>
    </div>
  );
}
