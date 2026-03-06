'use client';

import { useState } from 'react';
import { Plus, X, Upload, Download, Copy, CheckSquare, Square, BookOpen, ArrowRight, Search, Pencil, Trash2, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import { MasterPermissionGrid, BulkImportWizard } from '@/components/shared';
import type { Theme } from '../_helpers/types';

const PAGE_SIZE = 5;

/* ─── Local Sub-Components: TableToolbar + Pagination ─── */
function TableToolbar({ label, count, search, onSearch, onExport, onImport, theme }: {
  label: string; count: number; search: string; onSearch: (v: string) => void;
  onExport: () => void; onImport: () => void; theme: Theme;
}) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
      <div className="flex items-center gap-2">
        <span className={`text-xs font-bold ${theme.highlight}`}>{label}</span>
        <span className={`text-[9px] px-2 py-0.5 rounded-full ${theme.primary} text-white font-bold`}>{count}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search size={12} className={`absolute left-2 top-1/2 -translate-y-1/2 ${theme.iconColor}`} />
          <input value={search} onChange={e => onSearch(e.target.value)} placeholder="Search..."
            className={`pl-7 pr-7 py-1.5 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none w-44`} />
          {search && (
            <button onClick={() => onSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X size={10} />
            </button>
          )}
        </div>
        <button onClick={onExport} className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-emerald-600 text-white text-[10px] font-bold hover:bg-emerald-700 transition-colors">
          <Download size={10} /> Export
        </button>
        <button onClick={onImport} className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-blue-600 text-white text-[10px] font-bold hover:bg-blue-700 transition-colors">
          <Upload size={10} /> Import
        </button>
      </div>
    </div>
  );
}

function PaginationBar({ page, totalPages, onPage, theme }: {
  page: number; totalPages: number; onPage: (p: number) => void; theme: Theme;
}) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between mt-2">
      <span className={`text-[10px] ${theme.iconColor}`}>Page {page} of {totalPages}</span>
      <div className="flex items-center gap-1">
        <button onClick={() => onPage(Math.max(1, page - 1))} disabled={page <= 1}
          className={`p-1 rounded-lg border ${theme.border} ${page <= 1 ? 'opacity-30 cursor-not-allowed' : theme.buttonHover}`}>
          <ChevronLeft size={12} className={theme.iconColor} />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
          <button key={p} onClick={() => onPage(p)}
            className={`w-6 h-6 rounded-lg text-[10px] font-bold transition-all ${p === page ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.highlight}`}`}>
            {p}
          </button>
        ))}
        <button onClick={() => onPage(Math.min(totalPages, page + 1))} disabled={page >= totalPages}
          className={`p-1 rounded-lg border ${theme.border} ${page >= totalPages ? 'opacity-30 cursor-not-allowed' : theme.buttonHover}`}>
          <ChevronRight size={12} className={theme.iconColor} />
        </button>
      </div>
    </div>
  );
}

type TabId = 'structure' | 'subjects' | 'calendar' | 'rules' | 'settings';

export default function AcademicConfigModule({ theme, activeTab: externalTab, onTabChange }: { theme: Theme; activeTab?: string; onTabChange?: (tab: string) => void }) {
  const [preschoolEnabled, setPreschoolEnabled] = useState(true);
  const [gradeMaster, setGradeMaster] = useState([
    { name: 'Nursery', hasStreams: false, preschool: true },
    { name: 'Jr. KG', hasStreams: false, preschool: true },
    { name: 'Sr. KG', hasStreams: false, preschool: true },
    { name: 'Grade 1', hasStreams: false, preschool: false },
    { name: 'Grade 2', hasStreams: false, preschool: false },
    { name: 'Grade 3', hasStreams: false, preschool: false },
    { name: 'Grade 4', hasStreams: false, preschool: false },
    { name: 'Grade 5', hasStreams: false, preschool: false },
    { name: 'Grade 6', hasStreams: false, preschool: false },
    { name: 'Grade 7', hasStreams: false, preschool: false },
    { name: 'Grade 8', hasStreams: false, preschool: false },
    { name: 'Grade 9', hasStreams: false, preschool: false },
    { name: 'Grade 10', hasStreams: false, preschool: false },
    { name: 'Grade 11', hasStreams: true, preschool: false },
    { name: 'Grade 12', hasStreams: true, preschool: false },
  ]);
  const [addingGrade, setAddingGrade] = useState(false);
  const [newGradeName, setNewGradeName] = useState('');
  const allGrades = gradeMaster
    .filter(g => !g.preschool || preschoolEnabled)
    .map(g => g.name);
  const [subjects, setSubjects] = useState<Record<string, string[]>>({
    'Nursery': ['English', 'Hindi', 'EVS', 'Art', 'Music', 'Physical Ed.'],
    'Jr. KG': ['English', 'Hindi', 'Mathematics', 'EVS', 'Art', 'Music', 'Physical Ed.'],
    'Sr. KG': ['English', 'Hindi', 'Mathematics', 'EVS', 'Art', 'Computer', 'Physical Ed.'],
    'Grade 1': ['English', 'Hindi', 'Mathematics', 'EVS', 'Computer', 'Art', 'Physical Ed.'],
    'Grade 2': ['English', 'Hindi', 'Mathematics', 'EVS', 'Computer', 'Art', 'Physical Ed.'],
    'Grade 3': ['English', 'Hindi', 'Mathematics', 'EVS', 'Computer', 'Art', 'Physical Ed.'],
    'Grade 4': ['English', 'Hindi', 'Mathematics', 'EVS', 'Computer', 'Art', 'Physical Ed.'],
    'Grade 5': ['English', 'Hindi', 'Mathematics', 'EVS', 'Computer', 'Art', 'Physical Ed.'],
    'Grade 6': ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Sanskrit', 'Computer', 'Art', 'Physical Ed.'],
    'Grade 7': ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Sanskrit', 'Computer', 'Art', 'Physical Ed.'],
    'Grade 8': ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Sanskrit', 'Computer', 'Art', 'Physical Ed.'],
    'Grade 9': ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'IT', 'Physical Ed.'],
    'Grade 10': ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'IT', 'Physical Ed.'],
    'Grade 11': ['English', 'Physics', 'Chemistry', 'Mathematics', 'Biology/CS', 'Physical Ed.'],
    'Grade 12': ['English', 'Physics', 'Chemistry', 'Mathematics', 'Biology/CS', 'Physical Ed.'],
  });
  const [newSubject, setNewSubject] = useState('');
  const [activeGrade, setActiveGrade] = useState('Grade 1');
  // Global section names defined once, applied per grade
  const [globalSectionNames, setGlobalSectionNames] = useState(['A', 'B', 'C', 'D', 'E']);
  const [newSectionName, setNewSectionName] = useState('');
  const [sections, setSections] = useState<Record<string, string[]>>({
    'Nursery': ['A'], 'Jr. KG': ['A'], 'Sr. KG': ['A'],
    'Grade 1': ['A', 'B', 'C'], 'Grade 2': ['A', 'B', 'C'], 'Grade 3': ['A', 'B'],
    'Grade 4': ['A', 'B'], 'Grade 5': ['A', 'B'], 'Grade 6': ['A', 'B', 'C'],
    'Grade 7': ['A', 'B', 'C'], 'Grade 8': ['A', 'B'], 'Grade 9': ['A', 'B', 'C'],
    'Grade 10': ['A', 'B', 'C'], 'Grade 11': ['A', 'B'], 'Grade 12': ['A', 'B'],
  });
  // Compute master subject pool from all grades
  const allSubjectsPool = Array.from(new Set(Object.values(subjects).flat())).sort();
  const [preschoolGroups, setPreschoolGroups] = useState([
    { ageLevel: 'Nursery (2-3 yrs)', groupName: 'Butterflies', maxChildren: '20' },
    { ageLevel: 'Jr. KG (3-4 yrs)', groupName: 'Sunshine', maxChildren: '22' },
    { ageLevel: 'Sr. KG (4-5 yrs)', groupName: 'Explorers', maxChildren: '25' },
  ]);
  const [houses, setHouses] = useState([
    { name: 'Red House', color: 'bg-red-500', captain: 'Aarav Sharma', mascot: 'Phoenix' },
    { name: 'Blue House', color: 'bg-blue-500', captain: 'Priya Patel', mascot: 'Dolphin' },
    { name: 'Green House', color: 'bg-emerald-500', captain: 'Rohan Kumar', mascot: 'Eagle' },
    { name: 'Yellow House', color: 'bg-amber-500', captain: 'Ananya Singh', mascot: 'Tiger' },
  ]);
  const houseColorOptions = [
    { label: 'Red', value: 'bg-red-500' },
    { label: 'Blue', value: 'bg-blue-500' },
    { label: 'Green', value: 'bg-emerald-500' },
    { label: 'Yellow', value: 'bg-amber-500' },
    { label: 'Purple', value: 'bg-purple-500' },
    { label: 'Orange', value: 'bg-orange-500' },
    { label: 'Pink', value: 'bg-pink-500' },
    { label: 'Teal', value: 'bg-teal-500' },
    { label: 'Indigo', value: 'bg-indigo-500' },
    { label: 'Cyan', value: 'bg-cyan-500' },
  ];
  const [holidays, setHolidays] = useState([
    { startDate: '2026-01-26', endDate: '2026-01-26', name: 'Republic Day', type: 'National' },
    { startDate: '2026-03-14', endDate: '2026-03-14', name: 'Holi', type: 'Festival' },
    { startDate: '2026-08-15', endDate: '2026-08-15', name: 'Independence Day', type: 'National' },
    { startDate: '2026-10-02', endDate: '2026-10-02', name: 'Gandhi Jayanti', type: 'National' },
    { startDate: '2026-10-20', endDate: '2026-10-25', name: 'Diwali Vacation', type: 'Festival' },
    { startDate: '2026-12-25', endDate: '2027-01-02', name: 'Christmas & New Year Vacation', type: 'Festival' },
    { startDate: '2026-05-01', endDate: '2026-06-15', name: 'Summer Vacation', type: 'School' },
  ]);
  const [academicYear, setAcademicYear] = useState({ start: '2025-04-01', end: '2026-03-31' });

  // Department Master
  const [departments, setDepartments] = useState([
    { name: 'Pre-Primary', grades: ['Nursery', 'Jr. KG', 'Sr. KG'], color: 'bg-pink-100 text-pink-700' },
    { name: 'Primary', grades: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5'], color: 'bg-blue-100 text-blue-700' },
    { name: 'Secondary', grades: ['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10'], color: 'bg-emerald-100 text-emerald-700' },
    { name: 'Higher Secondary', grades: ['Grade 11', 'Grade 12'], color: 'bg-purple-100 text-purple-700' },
  ]);
  const [addingDepartment, setAddingDepartment] = useState(false);
  const [newDeptName, setNewDeptName] = useState('');
  const [editingDeptIdx, setEditingDeptIdx] = useState<number | null>(null);

  // Uniform vs Separate Academic Year per department
  const [separateAcademicYear, setSeparateAcademicYear] = useState(false);
  const [deptAcademicYears, setDeptAcademicYears] = useState<Record<string, { start: string; end: string }>>({
    'Pre-Primary': { start: '2025-06-01', end: '2026-04-30' },
    'Primary': { start: '2025-04-01', end: '2026-03-31' },
    'Secondary': { start: '2025-04-01', end: '2026-03-31' },
    'Higher Secondary': { start: '2025-06-15', end: '2026-05-31' },
  });

  // Separate terms per department
  const [separateTerms, setSeparateTerms] = useState(false);
  const [deptTerms, setDeptTerms] = useState<Record<string, { name: string; start: string; end: string }[]>>({
    'Pre-Primary': [{ name: 'Term 1', start: '2025-06-01', end: '2025-10-31' }, { name: 'Term 2', start: '2025-11-01', end: '2026-04-30' }],
    'Primary': [{ name: 'Term 1', start: '2025-04-01', end: '2025-09-30' }, { name: 'Term 2', start: '2025-10-01', end: '2026-03-31' }],
    'Secondary': [{ name: 'Term 1', start: '2025-04-01', end: '2025-09-30' }, { name: 'Term 2', start: '2025-10-01', end: '2026-03-31' }],
    'Higher Secondary': [{ name: 'Sem 1', start: '2025-06-15', end: '2025-11-30' }, { name: 'Sem 2', start: '2025-12-01', end: '2026-05-31' }],
  });

  const [terms, setTerms] = useState([
    { name: 'Term 1', start: '2025-04-01', end: '2025-09-30' },
    { name: 'Term 2', start: '2025-10-01', end: '2026-03-31' },
  ]);
  const [academicHistory] = useState([
    { year: '2025-26', status: 'Current', students: '1,850' },
    { year: '2024-25', status: 'Completed', students: '1,780' },
    { year: '2023-24', status: 'Archived', students: '1,720' },
  ]);
  const [recurringHolidays, setRecurringHolidays] = useState<Record<string, boolean>>({
    'Every Sunday': true,
    'Every Saturday (2nd & 4th)': true,
    'Every Saturday (all)': false,
  });
  const [recurringHolidayScope, setRecurringHolidayScope] = useState<'uniform' | 'per-department' | 'per-grade'>('uniform');
  const [deptRecurringHolidays, setDeptRecurringHolidays] = useState<Record<string, Record<string, boolean>>>({});
  const [religions, setReligions] = useState<Record<string, boolean>>({
    'Hindu': true, 'Muslim': true, 'Christian': true, 'Sikh': true,
    'Buddhist': true, 'Jain': true, 'Parsi': true, 'Other': true,
  });
  const [categories, setCategories] = useState<Record<string, boolean>>({
    'General': true, 'OBC': true, 'SC': true, 'ST': true, 'EWS': true, 'Other': true,
  });
  const [languages, setLanguages] = useState<Record<string, boolean>>({
    'Hindi': true, 'English': true, 'Gujarati': true, 'Marathi': true, 'Tamil': true,
    'Telugu': true, 'Kannada': true, 'Malayalam': true, 'Bengali': true, 'Punjabi': true, 'Urdu': true,
  });
  const [newReligion, setNewReligion] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newLanguage, setNewLanguage] = useState('');

  // ─── Streams / Subject Groups (Class 11-12) ───
  const [streams, setStreams] = useState([
    { name: 'Science', subjects: 'Phy, Chem, Math, Bio/CS', maxSeats: '120', enabled: true },
    { name: 'Commerce', subjects: 'Accts, BSt, Eco, Math/IP', maxSeats: '80', enabled: true },
    { name: 'Arts', subjects: 'Hist, Geo, Pol Sci, Eco/Psych', maxSeats: '40', enabled: true },
  ]);
  const [allowStreamChoice, setAllowStreamChoice] = useState(true);

  // ─── Class Capacity & Waitlist ───
  const [enableWaitlist, setEnableWaitlist] = useState(true);
  const [waitlistAutoPromote, setWaitlistAutoPromote] = useState('Automatic');
  const [classCapacity, setClassCapacity] = useState([
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

  // ─── Year Rollover Wizard ───
  const [rolloverChecks, setRolloverChecks] = useState<Record<string, boolean>>({
    'Grades & Sections': true, 'Subjects': true, 'Fee Structure': true, 'Timetable Template': true, 'Staff Assignments': false,
  });

  // ─── GPA & Credit System ───
  const [enableCreditGrading, setEnableCreditGrading] = useState(false);
  const [creditData] = useState([
    { subject: 'Physics', credits: '5', weightage: '1.0', maxMarks: '100' },
    { subject: 'Chemistry', credits: '5', weightage: '1.0', maxMarks: '100' },
    { subject: 'Mathematics', credits: '5', weightage: '1.0', maxMarks: '100' },
    { subject: 'Biology/CS', credits: '4', weightage: '0.8', maxMarks: '100' },
    { subject: 'English', credits: '4', weightage: '0.8', maxMarks: '100' },
    { subject: 'Physical Ed.', credits: '2', weightage: '0.5', maxMarks: '50' },
  ]);

  // ─── Class Teacher Assignment ───
  const [classTeachers] = useState([
    { classSection: '10-A', teacher: 'Mrs. Iyer', since: 'Apr 2025', status: 'Active' },
    { classSection: '10-B', teacher: 'Mr. Sharma', since: 'Apr 2025', status: 'Active' },
    { classSection: '10-C', teacher: 'Ms. Desai', since: 'Apr 2025', status: 'Active' },
    { classSection: '9-A', teacher: 'Mr. Patel', since: 'Apr 2025', status: 'Active' },
    { classSection: '9-B', teacher: 'Mrs. Gupta', since: 'Apr 2024', status: 'Active' },
    { classSection: '9-C', teacher: 'Mr. Reddy', since: 'Apr 2025', status: 'Active' },
  ]);

  // ─── Gap #4: Copy from Previous Year ───
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [copyChecks, setCopyChecks] = useState<Record<string, boolean>>({
    'Grades & Sections': true, 'Subjects & Electives': true, 'Fee Structure': false, 'Staff Assignments': false,
  });

  // ─── Gap #6: Class Teacher per Section (inline dropdown) ───
  const mockTeachers = ['Mrs. Sharma', 'Mr. Patel', 'Ms. Gupta', 'Mr. Reddy', 'Mrs. Iyer', 'Ms. Desai', 'Mr. Kumar', 'Mrs. Joshi'];
  const [sectionTeachers, setSectionTeachers] = useState<Record<string, string>>({
    'Grade 1-A': 'Mrs. Sharma', 'Grade 1-B': 'Mr. Patel', 'Grade 1-C': 'Ms. Gupta',
    'Grade 2-A': 'Mr. Reddy', 'Grade 2-B': 'Mrs. Iyer', 'Grade 2-C': 'Ms. Desai',
  });

  // ─── Gap #12/#23: Max Strength + Admission Status ───
  const [gradeAdmission, setGradeAdmission] = useState<Record<string, { maxStrength: string; current: number; admissionOpen: boolean }>>({
    'Grade 1': { maxStrength: '40', current: 38, admissionOpen: true },
    'Grade 2': { maxStrength: '40', current: 40, admissionOpen: false },
    'Grade 3': { maxStrength: '40', current: 35, admissionOpen: true },
    'Grade 4': { maxStrength: '40', current: 37, admissionOpen: true },
    'Grade 5': { maxStrength: '40', current: 40, admissionOpen: false },
    'Grade 6': { maxStrength: '45', current: 42, admissionOpen: true },
    'Grade 7': { maxStrength: '45', current: 44, admissionOpen: true },
    'Grade 8': { maxStrength: '45', current: 38, admissionOpen: true },
    'Grade 9': { maxStrength: '40', current: 36, admissionOpen: true },
    'Grade 10': { maxStrength: '40', current: 39, admissionOpen: true },
    'Grade 11': { maxStrength: '40', current: 36, admissionOpen: true },
    'Grade 12': { maxStrength: '40', current: 34, admissionOpen: true },
  });

  // ─── Gap #17: Subject-Teacher Mapping ───
  const [subjectTeacherMap, setSubjectTeacherMap] = useState([
    { grade: 'Grade 9', section: 'A', subject: 'Mathematics', teacher: 'Mr. Patel', periods: '6' },
    { grade: 'Grade 9', section: 'A', subject: 'Science', teacher: 'Mrs. Sharma', periods: '6' },
    { grade: 'Grade 9', section: 'B', subject: 'Mathematics', teacher: 'Mr. Patel', periods: '6' },
    { grade: 'Grade 10', section: 'A', subject: 'English', teacher: 'Ms. Gupta', periods: '5' },
    { grade: 'Grade 10', section: 'B', subject: 'Hindi', teacher: 'Mrs. Joshi', periods: '5' },
    { grade: 'Grade 10', section: 'C', subject: 'Science', teacher: 'Mr. Kumar', periods: '6' },
  ]);

  // ─── Gap #18: Elective Subject Type ───
  const [subjectTypes, setSubjectTypes] = useState<Record<string, { type: 'Compulsory' | 'Elective'; maxSeats: string; studentSelection: boolean }>>({
    'English': { type: 'Compulsory', maxSeats: '', studentSelection: false },
    'Hindi': { type: 'Compulsory', maxSeats: '', studentSelection: false },
    'Mathematics': { type: 'Compulsory', maxSeats: '', studentSelection: false },
    'Science': { type: 'Compulsory', maxSeats: '', studentSelection: false },
    'Social Science': { type: 'Compulsory', maxSeats: '', studentSelection: false },
    'Sanskrit': { type: 'Elective', maxSeats: '30', studentSelection: true },
    'IT': { type: 'Elective', maxSeats: '25', studentSelection: true },
    'Art': { type: 'Elective', maxSeats: '20', studentSelection: true },
    'Computer': { type: 'Compulsory', maxSeats: '', studentSelection: false },
    'Physical Ed.': { type: 'Compulsory', maxSeats: '', studentSelection: false },
  });

  // ─── Gap #22: Streams for 11-12 (enhanced) ───
  const [streamConfig, setStreamConfig] = useState([
    { name: 'Science', core: 'Physics, Chemistry, English', optional: 'Mathematics, Biology, Computer Science', maxSeats: '120' },
    { name: 'Commerce', core: 'Accountancy, Business Studies, English', optional: 'Economics, Mathematics, Informatics Practices', maxSeats: '80' },
    { name: 'Arts', core: 'History, Political Science, English', optional: 'Geography, Economics, Psychology, Sociology', maxSeats: '40' },
    { name: 'Humanities', core: 'Sociology, Psychology, English', optional: 'History, Political Science, Economics', maxSeats: '30' },
  ]);

  const sectionGrades = gradeMaster
    .filter(g => !g.preschool || preschoolEnabled)
    .flatMap(g => g.hasStreams && streamConfig.length > 0
      ? streamConfig.map(s => `${g.name} (${s.name})`)
      : [g.name]
    );

  // ─── Gap #83: Promotion Rules ───
  const [promotionRules, setPromotionRules] = useState({
    minAttendance: '75',
    minMarks: '33',
    allSubjectsPass: true,
    autoPromote: false,
  });

  // ─── Master Table CRUD State ───
  // Subjects master
  const [subjectSearch, setSubjectSearch] = useState('');
  const [subjectPage, setSubjectPage] = useState(1);
  const [subjectEnabled, setSubjectEnabled] = useState<Record<string, boolean>>({});
  // Sections master
  const [sectionSearch, setSectionSearch] = useState('');
  const [sectionPage, setSectionPage] = useState(1);
  const [sectionEnabled, setSectionEnabled] = useState<Record<string, boolean>>({});
  // Houses master
  const [houseSearch, setHouseSearch] = useState('');
  const [housePage, setHousePage] = useState(1);
  const [houseEnabled, setHouseEnabled] = useState<Record<number, boolean>>(() => {
    const m: Record<number, boolean> = {}; for (let i = 0; i < 10; i++) m[i] = true; return m;
  });
  // Holidays master
  const [holidaySearch, setHolidaySearch] = useState('');
  const [holidayPage, setHolidayPage] = useState(1);
  const [holidayEnabled, setHolidayEnabled] = useState<Record<number, boolean>>(() => {
    const m: Record<number, boolean> = {}; for (let i = 0; i < 20; i++) m[i] = true; return m;
  });
  // Holiday scope (uniform / per-department / per-grade)
  const [holidayScope, setHolidayScope] = useState<'uniform' | 'per-department' | 'per-grade'>('uniform');
  const [deptHolidays, setDeptHolidays] = useState<Record<string, { startDate: string; endDate: string; name: string; type: string }[]>>({});
  // Terms master
  const [termSearch, setTermSearch] = useState('');
  const [termPage, setTermPage] = useState(1);
  const [termEnabled, setTermEnabled] = useState<Record<number, boolean>>(() => {
    const m: Record<number, boolean> = {}; for (let i = 0; i < 10; i++) m[i] = true; return m;
  });
  // Streams master
  const [streamSearch, setStreamSearch] = useState('');
  const [streamPage, setStreamPage] = useState(1);
  // Demographics master
  const [demoSearch, setDemoSearch] = useState({ religion: '', category: '', language: '' });
  const [demoPage, setDemoPage] = useState({ religion: 1, category: 1, language: 1 });
  const [demoEdit, setDemoEdit] = useState<{ type: string; key: string; value: string } | null>(null);
  // Class Capacity table
  const [capSearch, setCapSearch] = useState('');
  const [capPage, setCapPage] = useState(1);
  const [capEditIdx, setCapEditIdx] = useState<number | null>(null);
  const [capEditRow, setCapEditRow] = useState({ grade: '', sections: 0, maxPerSection: 0, total: 0, current: 0, waitlisted: 0 });
  // Subject-Teacher Mapping table
  const [stmSearch, setStmSearch] = useState('');
  const [stmPage, setStmPage] = useState(1);
  const [stmEditIdx, setStmEditIdx] = useState<number | null>(null);
  const [stmEditRow, setStmEditRow] = useState({ grade: '', section: '', subject: '', teacher: '', periods: '' });

  const [internalTab, setInternalTab] = useState<TabId>('structure');
  const activeTab = (externalTab as TabId) || internalTab;
  const setActiveTab = (tab: TabId) => { if (onTabChange) onTabChange(tab); else setInternalTab(tab); };

  return (
    <div className="space-y-4">
      <ModuleHeader title="Academic Configuration" subtitle="Subjects, sections, houses, holidays, and academic calendar" theme={theme} />

      {activeTab === 'structure' && (<div className="space-y-4">
      {/* Department Master */}
      <SectionCard title="Department Master" subtitle="Create departments and assign grades — departments define organizational structure" theme={theme}>
        <div className="space-y-3">
          {departments.map((dept, i) => (
            <div key={dept.name} className={`p-3 rounded-xl border ${theme.border} ${theme.secondaryBg}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${dept.color}`}>{dept.name}</span>
                  <span className={`text-[9px] ${theme.iconColor}`}>{dept.grades.length} grade(s)</span>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => setEditingDeptIdx(editingDeptIdx === i ? null : i)}
                    className={`text-[9px] px-2 py-1 rounded-lg ${theme.buttonHover} ${theme.iconColor} border ${theme.border}`}>
                    {editingDeptIdx === i ? 'Done' : 'Edit Grades'}
                  </button>
                  <button onClick={() => setDepartments(p => p.filter((_, j) => j !== i))}
                    className="text-[9px] px-2 py-1 rounded-lg text-red-500 hover:bg-red-50 border border-red-200">
                    <Trash2 size={10} />
                  </button>
                </div>
              </div>
              {editingDeptIdx === i ? (
                <div className="space-y-2">
                  <div>
                    <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Department Name</p>
                    <input value={dept.name} onChange={e => { const n = [...departments]; n[i] = { ...n[i], name: e.target.value }; setDepartments(n); }}
                      className={`w-48 px-2.5 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                  </div>
                  <div>
                    <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Assigned Grades (click to toggle)</p>
                    <div className="flex flex-wrap gap-1.5">
                      {allGrades.map(g => {
                        const isAssigned = dept.grades.includes(g);
                        const usedElsewhere = departments.some((d, j) => j !== i && d.grades.includes(g));
                        return (
                          <button key={g} onClick={() => {
                            if (usedElsewhere && !isAssigned) return;
                            const n = [...departments];
                            n[i] = { ...n[i], grades: isAssigned ? n[i].grades.filter(x => x !== g) : [...n[i].grades, g] };
                            setDepartments(n);
                          }}
                            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                              isAssigned ? `${theme.primary} text-white` :
                              usedElsewhere ? 'bg-gray-100 text-gray-300 cursor-not-allowed' :
                              `${theme.secondaryBg} ${theme.highlight} ${theme.buttonHover}`
                            }`}>
                            {g}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-1">
                  {dept.grades.map(g => (
                    <span key={g} className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${dept.color}`}>{g}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
          {addingDepartment ? (
            <div className={`p-3 rounded-xl border-2 border-dashed ${theme.border}`}>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>New Department Name</p>
              <div className="flex items-center gap-2">
                <input value={newDeptName} onChange={e => setNewDeptName(e.target.value)} placeholder="e.g., Diploma, ITI Wing"
                  className={`px-2.5 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none w-48`} />
                <button onClick={() => {
                  if (newDeptName.trim()) {
                    const colors = ['bg-amber-100 text-amber-700', 'bg-cyan-100 text-cyan-700', 'bg-rose-100 text-rose-700', 'bg-teal-100 text-teal-700'];
                    setDepartments(p => [...p, { name: newDeptName.trim(), grades: [], color: colors[p.length % colors.length] }]);
                    setNewDeptName(''); setAddingDepartment(false);
                    setEditingDeptIdx(departments.length);
                  }
                }} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold ${theme.primary} text-white`}>
                  <Plus size={12} /> Add
                </button>
                <button onClick={() => { setAddingDepartment(false); setNewDeptName(''); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${theme.iconColor} ${theme.buttonHover}`}>Cancel</button>
              </div>
            </div>
          ) : (
            <button onClick={() => setAddingDepartment(true)}
              className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
              <Plus size={12} /> Add Department
            </button>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Academic Year" subtitle="Set start and end dates — uniform or per-department" theme={theme}>
        {/* Toggle: Uniform vs Separate */}
        <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg} mb-3`}>
          <div>
            <p className={`text-xs font-bold ${theme.highlight}`}>Separate Academic Year per Department</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Different departments can have different start/end dates</p>
          </div>
          <SSAToggle on={separateAcademicYear} onChange={() => setSeparateAcademicYear(!separateAcademicYear)} theme={theme} />
        </div>

        {!separateAcademicYear ? (
          <>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Start Date</p>
                <InputField value={academicYear.start} onChange={v => setAcademicYear(p => ({ ...p, start: v }))} theme={theme} type="date" />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>End Date</p>
                <InputField value={academicYear.end} onChange={v => setAcademicYear(p => ({ ...p, end: v }))} theme={theme} type="date" />
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-2">
            {departments.map(dept => (
              <div key={dept.name} className={`flex items-center gap-3 p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${dept.color} shrink-0 w-32 text-center`}>{dept.name}</span>
                <div className="flex items-center gap-2 flex-1">
                  <input type="date" value={deptAcademicYears[dept.name]?.start || ''} onChange={e => setDeptAcademicYears(p => ({ ...p, [dept.name]: { ...p[dept.name], start: e.target.value } }))}
                    className={`px-2 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                  <span className={`text-[10px] ${theme.iconColor}`}>to</span>
                  <input type="date" value={deptAcademicYears[dept.name]?.end || ''} onChange={e => setDeptAcademicYears(p => ({ ...p, [dept.name]: { ...p[dept.name], end: e.target.value } }))}
                    className={`px-2 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Copy from Previous Year */}
        <button onClick={() => setShowCopyModal(!showCopyModal)}
          className={`mt-3 flex items-center gap-1.5 px-3 py-2 rounded-xl border ${theme.border} ${theme.buttonHover} text-xs font-bold ${theme.highlight}`}>
          <Copy size={12} /> Copy from Previous Year
        </button>
        {showCopyModal && (
          <div className={`mt-3 p-4 rounded-xl ${theme.accentBg} border ${theme.border}`}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Copy 2024-25 Structure to 2025-26</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Select which structures to copy forward</p>
              </div>
              <button onClick={() => setShowCopyModal(false)} className="text-gray-400 hover:text-gray-600"><X size={14} /></button>
            </div>
            <div className="space-y-2 mb-3">
              {Object.entries(copyChecks).map(([item, checked]) => (
                <button key={item} onClick={() => setCopyChecks(p => ({ ...p, [item]: !p[item] }))}
                  className={`flex items-center gap-2 w-full text-left p-2 rounded-lg ${theme.secondaryBg} transition-all`}>
                  {checked ? <CheckSquare size={14} className="text-emerald-500" /> : <Square size={14} className={theme.iconColor} />}
                  <span className={`text-xs font-medium ${theme.highlight}`}>{item}</span>
                </button>
              ))}
            </div>
            <button className={`flex items-center gap-1.5 px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>
              <Copy size={12} /> Start Copy
            </button>
          </div>
        )}
      </SectionCard>

      {/* Terms / Semesters — moved from Calendar tab */}
      <SectionCard title="Terms / Semesters" subtitle="Define academic terms — uniform or per-department" theme={theme}>
        {/* Toggle: Separate terms per department */}
        <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg} mb-3`}>
          <div>
            <p className={`text-xs font-bold ${theme.highlight}`}>Separate Terms per Department</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Each department can have its own term structure (e.g., semesters vs trimesters)</p>
          </div>
          <SSAToggle on={separateTerms} onChange={() => setSeparateTerms(!separateTerms)} theme={theme} />
        </div>

        {!separateTerms ? (
          <>
            <div className="space-y-2">
              {terms.map((t, i) => {
                const isEnabled = termEnabled[i] !== false;
                return (
                  <div key={i} className={`flex items-center gap-2 p-2.5 rounded-xl ${theme.secondaryBg} ${!isEnabled ? 'opacity-50' : ''}`}>
                    <input value={t.name} onChange={e => { const n = [...terms]; n[i] = { ...n[i], name: e.target.value }; setTerms(n); }}
                      className={`w-24 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                    <input type="date" value={t.start} onChange={e => { const n = [...terms]; n[i] = { ...n[i], start: e.target.value }; setTerms(n); }}
                      className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                    <span className={`text-[10px] ${theme.iconColor}`}>to</span>
                    <input type="date" value={t.end} onChange={e => { const n = [...terms]; n[i] = { ...n[i], end: e.target.value }; setTerms(n); }}
                      className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                    <SSAToggle on={isEnabled} onChange={() => setTermEnabled(p => ({ ...p, [i]: !isEnabled }))} theme={theme} />
                    <button onClick={() => setTerms(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><Trash2 size={12} /></button>
                  </div>
                );
              })}
            </div>
            <button onClick={() => setTerms(p => [...p, { name: `Term ${p.length + 1}`, start: '', end: '' }])}
              className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl mt-2`}>
              <Plus size={12} /> Add Term
            </button>
          </>
        ) : (
          <div className="space-y-3">
            {departments.map(dept => (
              <div key={dept.name} className={`p-3 rounded-xl border ${theme.border}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${dept.color}`}>{dept.name}</span>
                  <span className={`text-[9px] ${theme.iconColor}`}>{(deptTerms[dept.name] || []).length} term(s)</span>
                </div>
                <div className="space-y-1.5">
                  {(deptTerms[dept.name] || []).map((t, i) => (
                    <div key={i} className={`flex items-center gap-2 p-2 rounded-lg ${theme.secondaryBg}`}>
                      <input value={t.name} onChange={e => {
                        setDeptTerms(p => ({ ...p, [dept.name]: p[dept.name].map((x, j) => j === i ? { ...x, name: e.target.value } : x) }));
                      }}
                        className={`w-20 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                      <input type="date" value={t.start} onChange={e => {
                        setDeptTerms(p => ({ ...p, [dept.name]: p[dept.name].map((x, j) => j === i ? { ...x, start: e.target.value } : x) }));
                      }}
                        className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                      <span className={`text-[10px] ${theme.iconColor}`}>to</span>
                      <input type="date" value={t.end} onChange={e => {
                        setDeptTerms(p => ({ ...p, [dept.name]: p[dept.name].map((x, j) => j === i ? { ...x, end: e.target.value } : x) }));
                      }}
                        className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                      <button onClick={() => setDeptTerms(p => ({ ...p, [dept.name]: p[dept.name].filter((_, j) => j !== i) }))}
                        className="text-red-400 hover:text-red-600"><Trash2 size={12} /></button>
                    </div>
                  ))}
                  <button onClick={() => setDeptTerms(p => ({
                    ...p, [dept.name]: [...(p[dept.name] || []), { name: `Term ${(p[dept.name] || []).length + 1}`, start: '', end: '' }]
                  }))}
                    className={`flex items-center gap-1 text-[10px] font-bold ${theme.iconColor} ${theme.buttonHover} px-2 py-1.5 rounded-lg`}>
                    <Plus size={10} /> Add Term
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      {/* Grade Master */}
      <SectionCard title="Grade Master" subtitle="Create, rename, and manage grades — link streams to higher secondary grades" theme={theme}>
        <div className="space-y-3">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead><tr className={theme.secondaryBg}>
                {['#', 'Grade Name', 'Department', 'Streams', 'Actions'].map(h => (
                  <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor}`}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {gradeMaster.filter(g => !g.preschool || preschoolEnabled).map((g, idx) => {
                  const dept = departments.find(d => d.grades.includes(g.name));
                  return (
                    <tr key={g.name} className={`border-t ${theme.border}`}>
                      <td className={`px-3 py-2 ${theme.iconColor}`}>{idx + 1}</td>
                      <td className="px-3 py-2">
                        <input value={g.name} onChange={e => {
                          const oldName = g.name;
                          const newName = e.target.value;
                          setGradeMaster(p => p.map(x => x.name === oldName ? { ...x, name: newName } : x));
                          setDepartments(p => p.map(d => ({ ...d, grades: d.grades.map(gr => gr === oldName ? newName : gr) })));
                        }}
                          className={`w-32 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                      </td>
                      <td className="px-3 py-2">
                        {dept ? <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${dept.color}`}>{dept.name}</span> : <span className={`text-[9px] ${theme.iconColor}`}>Unassigned</span>}
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2">
                          <SSAToggle on={g.hasStreams} onChange={() => setGradeMaster(p => p.map(x => x.name === g.name ? { ...x, hasStreams: !x.hasStreams } : x))} theme={theme} />
                          {g.hasStreams && (
                            <span className={`text-[9px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-bold`}>
                              {streamConfig.map(s => s.name).join(', ')}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <button onClick={() => {
                          setGradeMaster(p => p.filter(x => x.name !== g.name));
                          setDepartments(p => p.map(d => ({ ...d, grades: d.grades.filter(gr => gr !== g.name) })));
                        }} className="text-red-400 hover:text-red-600"><Trash2 size={12} /></button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {addingGrade ? (
            <div className={`p-3 rounded-xl border-2 border-dashed ${theme.border}`}>
              <div className="flex items-center gap-2">
                <input value={newGradeName} onChange={e => setNewGradeName(e.target.value)} placeholder="e.g., Grade 13, Diploma Year 1"
                  className={`px-2.5 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none w-48`} />
                <button onClick={() => {
                  if (newGradeName.trim()) {
                    setGradeMaster(p => [...p, { name: newGradeName.trim(), hasStreams: false, preschool: false }]);
                    setNewGradeName(''); setAddingGrade(false);
                  }
                }} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold ${theme.primary} text-white`}>
                  <Plus size={12} /> Add
                </button>
                <button onClick={() => { setAddingGrade(false); setNewGradeName(''); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${theme.iconColor} ${theme.buttonHover}`}>Cancel</button>
              </div>
            </div>
          ) : (
            <button onClick={() => setAddingGrade(true)}
              className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
              <Plus size={12} /> Add Grade
            </button>
          )}

          <div className={`p-2 rounded-lg bg-blue-50 border border-blue-200`}>
            <p className="text-[9px] text-blue-700"><span className="font-bold">Stream-enabled grades</span> (toggle ON) will auto-split in Section Configuration below. E.g., &quot;Grade 11&quot; becomes &quot;Grade 11 (Science)&quot;, &quot;Grade 11 (Commerce)&quot;, &quot;Grade 11 (Arts)&quot;.</p>
          </div>
        </div>
      </SectionCard>
      </div>)}

      {activeTab === 'subjects' && (<div className="space-y-4">
      <SectionCard title="Subject Master List" subtitle="Add subjects per grade — subjects from other grades appear as quick-add suggestions" theme={theme}>
        {/* Preschool toggle */}
        <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg} mb-3`}>
          <div>
            <p className={`text-xs font-bold ${theme.highlight}`}>Preschool Wing</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Show Nursery, Jr. KG, Sr. KG grades</p>
          </div>
          <SSAToggle on={preschoolEnabled} onChange={() => { setPreschoolEnabled(!preschoolEnabled); if (preschoolEnabled && ['Nursery','Jr. KG','Sr. KG'].includes(activeGrade)) setActiveGrade('Grade 1'); }} theme={theme} />
        </div>
        {/* Grade tab bar — scrollable */}
        <div className="flex gap-1.5 mb-3 flex-wrap">
          {allGrades.map(g => (
            <button key={g} onClick={() => setActiveGrade(g)}
              className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all whitespace-nowrap ${activeGrade === g ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.highlight}`}`}>
              {g}
            </button>
          ))}
        </div>
        {/* Subjects for selected grade — with toolbar */}
        {(() => {
          const gradeSubjects = subjects[activeGrade] || [];
          const filtered = gradeSubjects.filter(s => s.toLowerCase().includes(subjectSearch.toLowerCase()));
          const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
          const safePage = Math.min(subjectPage, totalPages);
          const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
          return (
            <div className={`p-3 rounded-xl ${theme.secondaryBg} mb-3`}>
              <TableToolbar label={`Subjects — ${activeGrade}`} count={gradeSubjects.length} search={subjectSearch}
                onSearch={v => { setSubjectSearch(v); setSubjectPage(1); }} onExport={() => {}} onImport={() => {}} theme={theme} />
              <div className="overflow-x-auto mb-2">
                <table className="w-full text-xs">
                  <thead><tr className={theme.accentBg || theme.secondaryBg}>
                    {['#', 'Subject', 'Type', 'Enabled', 'Actions'].map(h => (
                      <th key={h} className={`text-left px-3 py-1.5 font-bold ${theme.iconColor}`}>{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {paged.map((s, pi) => {
                      const idx = (safePage - 1) * PAGE_SIZE + pi;
                      const isEnabled = subjectEnabled[`${activeGrade}::${s}`] !== false;
                      const st = subjectTypes[s] || { type: 'Compulsory' as const, maxSeats: '', studentSelection: false };
                      return (
                        <tr key={s} className={`border-t ${theme.border} ${!isEnabled ? 'opacity-50' : ''}`}>
                          <td className={`px-3 py-1.5 ${theme.iconColor}`}>{idx + 1}</td>
                          <td className={`px-3 py-1.5 font-bold ${theme.highlight}`}>{s}</td>
                          <td className="px-3 py-1.5">
                            <select value={st.type} onChange={e => setSubjectTypes(p => ({ ...p, [s]: { ...st, type: e.target.value as 'Compulsory' | 'Elective' } }))}
                              className={`px-1.5 py-0.5 rounded-lg border ${theme.border} ${theme.inputBg} text-[9px] font-bold ${theme.highlight}`}>
                              <option value="Compulsory">Compulsory</option>
                              <option value="Elective">Elective</option>
                            </select>
                          </td>
                          <td className="px-3 py-1.5">
                            <SSAToggle on={isEnabled} onChange={() => setSubjectEnabled(p => ({ ...p, [`${activeGrade}::${s}`]: !isEnabled }))} theme={theme} />
                          </td>
                          <td className="px-3 py-1.5">
                            <button onClick={() => setSubjects(p => ({ ...p, [activeGrade]: (p[activeGrade] || []).filter(x => x !== s) }))}
                              className="text-red-400 hover:text-red-600"><Trash2 size={12} /></button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <PaginationBar page={safePage} totalPages={totalPages} onPage={setSubjectPage} theme={theme} />
              <div className="flex gap-2 mt-2 mb-2">
                <input value={newSubject} onChange={e => setNewSubject(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && newSubject.trim()) { setSubjects(p => ({ ...p, [activeGrade]: [...(p[activeGrade] || []), newSubject.trim()] })); setNewSubject(''); } }}
                  placeholder="Type new subject or click from pool below..."
                  className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                <button onClick={() => { if (newSubject.trim()) { setSubjects(p => ({ ...p, [activeGrade]: [...(p[activeGrade] || []), newSubject.trim()] })); setNewSubject(''); } }}
                  className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={14} /></button>
              </div>
              {/* Subject pool — quick-add from other grades */}
              {(() => {
                const currentSubs = subjects[activeGrade] || [];
                const available = allSubjectsPool.filter(s => !currentSubs.includes(s));
                if (available.length === 0) return null;
                return (
                  <div>
                    <p className={`text-[9px] font-bold ${theme.iconColor} mb-1.5 uppercase tracking-wide`}>Quick-add from subject pool (used in other grades)</p>
                    <div className="flex flex-wrap gap-1">
                      {available.map(s => (
                        <button key={s} onClick={() => setSubjects(p => ({ ...p, [activeGrade]: [...(p[activeGrade] || []), s] }))}
                          className={`px-2 py-0.5 rounded-lg border border-dashed ${theme.border} text-[10px] ${theme.iconColor} hover:${theme.primary} hover:text-white transition-all`}>
                          + {s}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          );
        })()}
      </SectionCard>
      </div>)}

      {activeTab === 'structure' && (<div className="space-y-4">
      <SectionCard title="Section Configuration" subtitle="Define section names once (school-wide), then assign per grade" theme={theme}>
        {/* Global section names with toolbar */}
        <TableToolbar label="School-wide Section Names" count={globalSectionNames.length} search={sectionSearch}
          onSearch={v => { setSectionSearch(v); setSectionPage(1); }} onExport={() => {}} onImport={() => {}} theme={theme} />
        <div className={`p-3 rounded-xl ${theme.accentBg} border ${theme.border} mb-4`}>
          {(() => {
            const filtered = globalSectionNames.filter(n => n.toLowerCase().includes(sectionSearch.toLowerCase()));
            const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
            const safePage = Math.min(sectionPage, totalPages);
            const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
            return (
              <>
                <div className="overflow-x-auto mb-2">
                  <table className="w-full text-xs">
                    <thead><tr className={theme.secondaryBg}>
                      {['#', 'Section Name', 'Enabled', 'Actions'].map(h => (
                        <th key={h} className={`text-left px-3 py-1.5 font-bold ${theme.iconColor}`}>{h}</th>
                      ))}
                    </tr></thead>
                    <tbody>
                      {paged.map((name) => {
                        const realIdx = globalSectionNames.indexOf(name);
                        const isEnabled = sectionEnabled[name] !== false;
                        return (
                          <tr key={realIdx} className={`border-t ${theme.border} ${!isEnabled ? 'opacity-50' : ''}`}>
                            <td className={`px-3 py-1.5 ${theme.iconColor}`}>{realIdx + 1}</td>
                            <td className="px-3 py-1.5">
                              <input value={name} onChange={e => { const n = [...globalSectionNames]; n[realIdx] = e.target.value; setGlobalSectionNames(n); }}
                                className={`w-24 px-2 py-0.5 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none text-center`} />
                            </td>
                            <td className="px-3 py-1.5">
                              <SSAToggle on={isEnabled} onChange={() => setSectionEnabled(p => ({ ...p, [name]: !isEnabled }))} theme={theme} />
                            </td>
                            <td className="px-3 py-1.5">
                              <button onClick={() => {
                                const removed = globalSectionNames[realIdx];
                                setGlobalSectionNames(p => p.filter((_, j) => j !== realIdx));
                                setSections(p => {
                                  const updated = { ...p };
                                  for (const grade of Object.keys(updated)) { updated[grade] = updated[grade].filter(s => s !== removed); }
                                  return updated;
                                });
                              }} className="text-red-400 hover:text-red-600"><Trash2 size={12} /></button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <PaginationBar page={safePage} totalPages={totalPages} onPage={setSectionPage} theme={theme} />
              </>
            );
          })()}
          <div className="flex gap-2 mt-2">
            <input value={newSectionName} onChange={e => setNewSectionName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && newSectionName.trim()) { setGlobalSectionNames(p => [...p, newSectionName.trim()]); setNewSectionName(''); } }}
              placeholder="Add section name (e.g. F, Rose, Lily)..."
              className={`flex-1 px-3 py-1.5 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
            <button onClick={() => { if (newSectionName.trim()) { setGlobalSectionNames(p => [...p, newSectionName.trim()]); setNewSectionName(''); } }}
              className={`px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={12} /></button>
          </div>
        </div>

        {/* Per-grade section assignment */}
        <p className={`text-[10px] font-bold ${theme.iconColor} mb-2 uppercase tracking-wide`}>Assign sections per grade (toggle which sections are active)</p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
          {sectionGrades.map(grade => {
            const gradeSecs = sections[grade] || [];
            return (
              <div key={grade} className={`p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex items-center justify-between mb-1.5">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{grade}</p>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded ${theme.accentBg} ${theme.iconColor} font-bold`}>
                    {gradeSecs.length} {gradeSecs.length === 1 ? 'section' : 'sections'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {globalSectionNames.map(name => {
                    const isActive = gradeSecs.includes(name);
                    return (
                      <button key={name} onClick={() => {
                        setSections(p => ({
                          ...p,
                          [grade]: isActive ? (p[grade] || []).filter(s => s !== name) : [...(p[grade] || []), name],
                        }));
                      }}
                        className={`text-[10px] px-2 py-1 rounded-lg font-bold transition-all ${
                          isActive ? `${theme.primary} text-white` : `${theme.cardBg} border ${theme.border} ${theme.iconColor}`
                        }`}>
                        {name}
                      </button>
                    );
                  })}
                </div>
                {/* Gap #6: Class Teacher per section */}
                {gradeSecs.length > 0 && (
                  <div className="space-y-1">
                    {gradeSecs.map(sec => {
                      const key = `${grade}-${sec}`;
                      return (
                        <div key={key} className="flex items-center gap-1.5">
                          <span className={`text-[9px] font-bold ${theme.iconColor} w-5`}>{sec}:</span>
                          <select value={sectionTeachers[key] || ''} onChange={e => setSectionTeachers(p => ({ ...p, [key]: e.target.value }))}
                            className={`flex-1 px-1.5 py-0.5 rounded-lg border ${theme.border} ${theme.inputBg} text-[9px] ${theme.highlight} outline-none`}>
                            <option value="">-- Class Teacher --</option>
                            {mockTeachers.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </SectionCard>

      <SectionCard title="House System" subtitle="School houses for inter-house activities — add, edit, or delete houses freely" theme={theme}>
        <TableToolbar label="Houses" count={houses.length} search={houseSearch}
          onSearch={v => { setHouseSearch(v); setHousePage(1); }} onExport={() => {}} onImport={() => {}} theme={theme} />
        {(() => {
          const filtered = houses.filter((h, _i) => h.name.toLowerCase().includes(houseSearch.toLowerCase()) || h.mascot.toLowerCase().includes(houseSearch.toLowerCase()));
          const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
          const safePage = Math.min(housePage, totalPages);
          const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
          return (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-2">
                {paged.map((h) => {
                  const i = houses.indexOf(h);
                  const isEnabled = houseEnabled[i] !== false;
                  return (
                    <div key={i} className={`p-3 rounded-xl ${theme.secondaryBg} relative ${!isEnabled ? 'opacity-50' : ''}`}>
                      <button onClick={() => setHouses(p => p.filter((_, idx) => idx !== i))}
                        className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 text-red-500 hover:text-red-700 transition-colors">
                        <Trash2 size={10} />
                      </button>
                      <div className="flex items-center gap-2 mb-2 pr-5">
                        <div className={`w-7 h-7 rounded-lg ${h.color} shrink-0`} />
                        <input value={h.name} onChange={e => { const n = [...houses]; n[i] = { ...n[i], name: e.target.value }; setHouses(n); }}
                          className={`flex-1 min-w-0 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} placeholder="House name" />
                      </div>
                      <div className="mb-2">
                        <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Color</p>
                        <select value={h.color} onChange={e => { const n = [...houses]; n[i] = { ...n[i], color: e.target.value }; setHouses(n); }}
                          className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}>
                          {houseColorOptions.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                        </select>
                      </div>
                      <div className="mb-2">
                        <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Mascot</p>
                        <input value={h.mascot} onChange={e => { const n = [...houses]; n[i] = { ...n[i], mascot: e.target.value }; setHouses(n); }}
                          className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} placeholder="e.g. Phoenix" />
                      </div>
                      <div className="mb-2">
                        <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Captain</p>
                        <input value={h.captain} onChange={e => { const n = [...houses]; n[i] = { ...n[i], captain: e.target.value }; setHouses(n); }}
                          className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} placeholder="Captain name" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-[9px] ${theme.iconColor}`}>Enabled</span>
                        <SSAToggle on={isEnabled} onChange={() => setHouseEnabled(p => ({ ...p, [i]: !isEnabled }))} theme={theme} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <PaginationBar page={safePage} totalPages={totalPages} onPage={setHousePage} theme={theme} />
            </>
          );
        })()}
        <button onClick={() => setHouses(p => [...p, { name: 'New House', color: 'bg-indigo-500', captain: '', mascot: '' }])}
          className={`flex items-center gap-1.5 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl border ${theme.border} mt-2`}>
          <Plus size={12} /> Add House
        </button>
      </SectionCard>

      <SectionCard title="Preschool Groups" subtitle="Age-based group names and capacity (for preschool wings)" theme={theme}>
        <div className="space-y-2">
          {preschoolGroups.map((g, i) => (
            <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="w-32 shrink-0">
                <p className={`text-[10px] ${theme.iconColor} mb-0.5`}>Age Level</p>
                <input value={g.ageLevel} onChange={e => { const n = [...preschoolGroups]; n[i] = { ...n[i], ageLevel: e.target.value }; setPreschoolGroups(n); }}
                  className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} placeholder="e.g. Nursery (2-3 yrs)" />
              </div>
              <div className="flex-1">
                <p className={`text-[10px] ${theme.iconColor} mb-0.5`}>Group Name</p>
                <input value={g.groupName} onChange={e => { const n = [...preschoolGroups]; n[i] = { ...n[i], groupName: e.target.value }; setPreschoolGroups(n); }}
                  className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}
                  placeholder="e.g. Butterflies" />
              </div>
              <div className="w-24">
                <p className={`text-[10px] ${theme.iconColor} mb-0.5`}>Max Children</p>
                <input type="number" value={g.maxChildren} onChange={e => { const n = [...preschoolGroups]; n[i] = { ...n[i], maxChildren: e.target.value }; setPreschoolGroups(n); }}
                  className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
              </div>
              <button onClick={() => setPreschoolGroups(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600 mt-4"><X size={12} /></button>
            </div>
          ))}
          <button onClick={() => setPreschoolGroups(p => [...p, { ageLevel: '', groupName: '', maxChildren: '20' }])}
            className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
            <Plus size={12} /> Add Group
          </button>
        </div>
      </SectionCard>
      </div>)}

      {activeTab === 'calendar' && (<div className="space-y-4">
      <SectionCard title="Holiday Calendar" subtitle="School holidays, vacations & observances — supports single-day holidays and multi-day vacation ranges" theme={theme}>
        {/* Holiday Scope Toggle */}
        <div className={`flex items-center gap-2 p-2.5 rounded-xl ${theme.secondaryBg} mb-3`}>
          <span className={`text-[10px] font-bold ${theme.iconColor}`}>Holiday scope:</span>
          {(['uniform', 'per-department', 'per-grade'] as const).map(scope => (
            <button key={scope} onClick={() => setHolidayScope(scope)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                holidayScope === scope ? `${theme.primary} text-white` : `${theme.cardBg} border ${theme.border} ${theme.highlight} ${theme.buttonHover}`
              }`}>
              {scope === 'uniform' ? 'Uniform (All)' : scope === 'per-department' ? 'Per Department' : 'Per Grade'}
            </button>
          ))}
        </div>
        {holidayScope === 'uniform' && <p className={`text-[10px] ${theme.iconColor} mb-2`}>These holidays apply to ALL departments and grades.</p>}
        {holidayScope === 'per-department' && (
          <div className={`p-3 rounded-xl bg-blue-50 border border-blue-200 mb-3`}>
            <p className="text-[10px] text-blue-700 mb-2"><span className="font-bold">Per-Department Mode:</span> Common holidays (below) apply to all. Each department can have additional holidays.</p>
            <div className="space-y-2">
              {departments.map(dept => (
                <div key={dept.name} className="flex items-center justify-between">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${dept.color}`}>{dept.name}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] ${theme.iconColor}`}>{(deptHolidays[dept.name] || []).length} extra holidays</span>
                    <button onClick={() => setDeptHolidays(p => ({ ...p, [dept.name]: [...(p[dept.name] || []), { startDate: '', endDate: '', name: '', type: 'School-specific' }] }))}
                      className={`flex items-center gap-1 text-[9px] font-bold ${theme.primaryText} ${theme.buttonHover} px-2 py-1 rounded-lg`}>
                      <Plus size={10} /> Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {Object.entries(deptHolidays).some(([, h]) => h.length > 0) && (
              <div className="mt-2 space-y-1">
                {Object.entries(deptHolidays).map(([dept, hols]) => hols.map((h, i) => (
                  <div key={`${dept}-${i}`} className={`flex items-center gap-2 p-1.5 rounded-lg ${theme.secondaryBg}`}>
                    <span className={`text-[9px] font-bold ${theme.iconColor} w-28 shrink-0`}>{dept}:</span>
                    <input type="date" value={h.startDate} onChange={e => setDeptHolidays(p => ({ ...p, [dept]: p[dept].map((x, j) => j === i ? { ...x, startDate: e.target.value } : x) }))}
                      className={`w-[100px] px-1 py-0.5 rounded border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight} outline-none`} />
                    <span className={`text-[9px] ${theme.iconColor}`}>to</span>
                    <input type="date" value={h.endDate} onChange={e => setDeptHolidays(p => ({ ...p, [dept]: p[dept].map((x, j) => j === i ? { ...x, endDate: e.target.value } : x) }))}
                      className={`w-[100px] px-1 py-0.5 rounded border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight} outline-none`} />
                    <input value={h.name} onChange={e => setDeptHolidays(p => ({ ...p, [dept]: p[dept].map((x, j) => j === i ? { ...x, name: e.target.value } : x) }))}
                      placeholder="Holiday name" className={`flex-1 px-1.5 py-0.5 rounded border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight} outline-none`} />
                    <button onClick={() => setDeptHolidays(p => ({ ...p, [dept]: p[dept].filter((_, j) => j !== i) }))}
                      className="text-red-400 hover:text-red-600"><Trash2 size={10} /></button>
                  </div>
                )))}
              </div>
            )}
          </div>
        )}
        {holidayScope === 'per-grade' && (
          <div className={`p-3 rounded-xl bg-purple-50 border border-purple-200 mb-3`}>
            <p className="text-[10px] text-purple-700"><span className="font-bold">Per-Grade Mode:</span> Common holidays (below) apply to all. You can add grade-specific holidays (e.g., preschool sports day, Grade 12 board prep leave) using the &quot;type&quot; column — select &quot;School-specific&quot; and note the grade in the holiday name.</p>
          </div>
        )}
        <TableToolbar label="Holidays" count={holidays.length} search={holidaySearch}
          onSearch={v => { setHolidaySearch(v); setHolidayPage(1); }} onExport={() => {}} onImport={() => {}} theme={theme} />
        {(() => {
          const filtered = holidays.map((h, i) => ({ ...h, _i: i })).filter(h => h.name.toLowerCase().includes(holidaySearch.toLowerCase()) || h.type.toLowerCase().includes(holidaySearch.toLowerCase()));
          const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
          const safePage = Math.min(holidayPage, totalPages);
          const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
          return (
            <>
              <div className="space-y-1.5">
                {paged.map((h) => {
                  const i = h._i;
                  const isRange = h.startDate !== h.endDate;
                  const isEnabled = holidayEnabled[i] !== false;
                  return (
                    <div key={i} className={`flex items-center gap-2 p-2.5 rounded-xl ${theme.secondaryBg} ${!isEnabled ? 'opacity-50' : ''}`}>
                      <div className="flex items-center gap-1">
                        <input type="date" value={h.startDate} onChange={e => { const n = [...holidays]; n[i] = { ...n[i], startDate: e.target.value }; setHolidays(n); }}
                          className={`w-[120px] px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[11px] font-bold ${theme.highlight} outline-none`} />
                        <span className={`text-[10px] ${theme.iconColor}`}>to</span>
                        <input type="date" value={h.endDate} onChange={e => { const n = [...holidays]; n[i] = { ...n[i], endDate: e.target.value }; setHolidays(n); }}
                          className={`w-[120px] px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[11px] font-bold ${theme.highlight} outline-none`} />
                      </div>
                      {isRange && <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${theme.primary} text-white`}>
                        {Math.ceil((new Date(h.endDate).getTime() - new Date(h.startDate).getTime()) / 86400000) + 1}d
                      </span>}
                      <input value={h.name} onChange={e => { const n = [...holidays]; n[i] = { ...n[i], name: e.target.value }; setHolidays(n); }}
                        className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} placeholder="Holiday / Vacation name" />
                      <select value={h.type} onChange={e => { const n = [...holidays]; n[i] = { ...n[i], type: e.target.value }; setHolidays(n); }}
                        className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] font-bold ${theme.highlight}`}>
                        <option value="National">National</option>
                        <option value="Festival">Festival</option>
                        <option value="School-specific">School-specific</option>
                        <option value="Weather/Emergency">Weather/Emergency</option>
                        <option value="Vacation">Vacation</option>
                        <option value="Other">Other</option>
                      </select>
                      <SSAToggle on={isEnabled} onChange={() => setHolidayEnabled(p => ({ ...p, [i]: !isEnabled }))} theme={theme} />
                      <button onClick={() => setHolidays(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><Trash2 size={12} /></button>
                    </div>
                  );
                })}
              </div>
              <PaginationBar page={safePage} totalPages={totalPages} onPage={setHolidayPage} theme={theme} />
            </>
          );
        })()}
        <div className="mt-2">
          <button onClick={() => setHolidays(p => [...p, { startDate: '', endDate: '', name: '', type: 'School' }])}
            className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
            <Plus size={12} /> Add Holiday / Vacation
          </button>
        </div>
      </SectionCard>

      <SectionCard title="Recurring Holidays" subtitle="Weekly off-days — uniform or per department/grade" theme={theme}>
        {/* Scope toggle */}
        <div className={`flex items-center gap-2 p-2.5 rounded-xl ${theme.secondaryBg} mb-3`}>
          <span className={`text-[10px] font-bold ${theme.iconColor}`}>Weekly off scope:</span>
          {(['uniform', 'per-department', 'per-grade'] as const).map(scope => (
            <button key={scope} onClick={() => setRecurringHolidayScope(scope)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                recurringHolidayScope === scope ? `${theme.primary} text-white` : `${theme.cardBg} border ${theme.border} ${theme.highlight} ${theme.buttonHover}`
              }`}>
              {scope === 'uniform' ? 'Uniform (All)' : scope === 'per-department' ? 'Per Department' : 'Per Grade'}
            </button>
          ))}
        </div>

        {recurringHolidayScope === 'uniform' && (
          <>
            <div className="space-y-2 mb-3">
              {Object.entries(recurringHolidays).map(([day, enabled]) => (
                <div key={day} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <span className={`text-xs font-bold ${theme.highlight}`}>{day}</span>
                  <SSAToggle on={enabled} onChange={() => setRecurringHolidays(p => ({ ...p, [day]: !p[day] }))} theme={theme} />
                </div>
              ))}
            </div>
          </>
        )}

        {recurringHolidayScope === 'per-department' && (
          <div className="space-y-3">
            {departments.map(dept => (
              <div key={dept.name} className={`p-3 rounded-xl border ${theme.border}`}>
                <p className={`text-[10px] font-bold mb-2`}><span className={`px-2 py-0.5 rounded-lg ${dept.color}`}>{dept.name}</span></p>
                <div className="space-y-1.5">
                  {Object.keys(recurringHolidays).map(day => {
                    const isOn = deptRecurringHolidays[dept.name]?.[day] ?? recurringHolidays[day];
                    return (
                      <div key={day} className={`flex items-center justify-between p-2 rounded-lg ${theme.secondaryBg}`}>
                        <span className={`text-[10px] font-bold ${theme.highlight}`}>{day}</span>
                        <SSAToggle on={isOn} onChange={() => setDeptRecurringHolidays(p => ({
                          ...p, [dept.name]: { ...(p[dept.name] || {}), [day]: !isOn }
                        }))} theme={theme} />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {recurringHolidayScope === 'per-grade' && (
          <div className="space-y-2">
            <p className={`text-[10px] ${theme.iconColor} mb-2`}>Configure weekly offs for each grade. Inherits from department setting if not customized.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead><tr className={theme.secondaryBg}>
                  <th className={`text-left px-2 py-2 font-bold ${theme.iconColor} sticky left-0 ${theme.secondaryBg}`}>Grade</th>
                  {Object.keys(recurringHolidays).map(day => (
                    <th key={day} className={`text-center px-2 py-2 font-bold ${theme.iconColor} text-[9px]`}>{day.replace('Every ', '')}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {allGrades.map(grade => {
                    const dept = departments.find(d => d.grades.includes(grade));
                    return (
                      <tr key={grade} className={`border-t ${theme.border}`}>
                        <td className={`px-2 py-1.5 font-bold ${theme.highlight} sticky left-0 ${theme.cardBg} text-[10px] whitespace-nowrap`}>
                          {grade}
                          {dept && <span className={`ml-1 text-[8px] ${dept.color} px-1 py-0.5 rounded`}>{dept.name.substring(0, 3)}</span>}
                        </td>
                        {Object.keys(recurringHolidays).map(day => {
                          const isOn = deptRecurringHolidays[`grade:${grade}`]?.[day] ?? deptRecurringHolidays[dept?.name || '']?.[day] ?? recurringHolidays[day];
                          return (
                            <td key={day} className="px-2 py-1.5 text-center">
                              <SSAToggle on={isOn} onChange={() => setDeptRecurringHolidays(p => ({
                                ...p, [`grade:${grade}`]: { ...(p[`grade:${grade}`] || {}), [day]: !isOn }
                              }))} theme={theme} />
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Working Days Calculator */}
        <div className={`p-3 rounded-xl ${theme.accentBg} border ${theme.border} mt-3`}>
          <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Working Days Calculator</p>
          <div className="flex gap-4">
            <span className={`text-xs ${theme.highlight}`}>Total days: <strong>365</strong></span>
            <span className={`text-xs ${theme.highlight}`}>Holidays: <strong>{holidays.length + (recurringHolidays['Every Sunday'] ? 52 : 0) + (recurringHolidays['Every Saturday (2nd & 4th)'] ? 24 : recurringHolidays['Every Saturday (all)'] ? 52 : 0)}</strong></span>
            <span className={`text-xs font-bold text-emerald-600`}>Working days: <strong>{365 - holidays.length - (recurringHolidays['Every Sunday'] ? 52 : 0) - (recurringHolidays['Every Saturday (2nd & 4th)'] ? 24 : recurringHolidays['Every Saturday (all)'] ? 52 : 0)}</strong></span>
          </div>
        </div>
      </SectionCard>

      </div>)}

      {activeTab === 'rules' && (<div className="space-y-4">
      <SectionCard title="Demographics Configuration" subtitle="Religion, caste category, and mother tongue options for student profiles" theme={theme}>
        <div className="grid grid-cols-3 gap-4">
          {/* ─── Religions Column ─── */}
          <div>
            {(() => {
              const entries = Object.entries(religions);
              const filtered = entries.filter(([r]) => r.toLowerCase().includes(demoSearch.religion.toLowerCase()));
              const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
              const safePage = Math.min(demoPage.religion, totalPages);
              const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
              return (
                <>
                  <TableToolbar label="Religions" count={entries.length} search={demoSearch.religion}
                    onSearch={v => setDemoSearch(p => ({ ...p, religion: v }))} onExport={() => {}} onImport={() => {}} theme={theme} />
                  <div className="space-y-1">
                    {paged.map(([r, active]) => (
                      <div key={r} className={`flex items-center justify-between p-2 rounded-lg ${theme.secondaryBg} ${!active ? 'opacity-50' : ''}`}>
                        {demoEdit?.type === 'religion' && demoEdit.key === r ? (
                          <div className="flex items-center gap-1 flex-1">
                            <input value={demoEdit.value} onChange={e => setDemoEdit(p => p ? { ...p, value: e.target.value } : p)}
                              className={`flex-1 px-1.5 py-0.5 rounded border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} autoFocus />
                            <button onClick={() => {
                              if (demoEdit.value.trim() && demoEdit.value !== r) {
                                setReligions(p => { const n: Record<string, boolean> = {}; for (const [k, v] of Object.entries(p)) { n[k === r ? demoEdit.value.trim() : k] = v; } return n; });
                              }
                              setDemoEdit(null);
                            }} className="text-emerald-500 hover:text-emerald-700"><Check size={12} /></button>
                          </div>
                        ) : (
                          <>
                            <span className={`text-xs ${theme.highlight}`}>{r}</span>
                            <div className="flex items-center gap-1.5">
                              <button onClick={() => setDemoEdit({ type: 'religion', key: r, value: r })} className={`${theme.iconColor} hover:text-blue-500`}><Pencil size={10} /></button>
                              <SSAToggle on={active} onChange={() => setReligions(p => ({ ...p, [r]: !p[r] }))} theme={theme} />
                              <button onClick={() => setReligions(p => { const n = { ...p }; delete n[r]; return n; })} className="text-red-400 hover:text-red-600"><Trash2 size={10} /></button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                  <PaginationBar page={safePage} totalPages={totalPages} onPage={p => setDemoPage(prev => ({ ...prev, religion: p }))} theme={theme} />
                </>
              );
            })()}
            <div className="flex gap-1 mt-2">
              <input value={newReligion} onChange={e => setNewReligion(e.target.value)} placeholder="Add..."
                className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
              <button onClick={() => { if (newReligion.trim()) { setReligions(p => ({ ...p, [newReligion.trim()]: true })); setNewReligion(''); } }}
                className={`px-2 py-1 rounded-lg ${theme.primary} text-white text-xs font-bold`}><Plus size={10} /></button>
            </div>
          </div>
          {/* ─── Categories Column ─── */}
          <div>
            {(() => {
              const entries = Object.entries(categories);
              const filtered = entries.filter(([c]) => c.toLowerCase().includes(demoSearch.category.toLowerCase()));
              const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
              const safePage = Math.min(demoPage.category, totalPages);
              const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
              return (
                <>
                  <TableToolbar label="Categories" count={entries.length} search={demoSearch.category}
                    onSearch={v => setDemoSearch(p => ({ ...p, category: v }))} onExport={() => {}} onImport={() => {}} theme={theme} />
                  <div className="space-y-1">
                    {paged.map(([c, active]) => (
                      <div key={c} className={`flex items-center justify-between p-2 rounded-lg ${theme.secondaryBg} ${!active ? 'opacity-50' : ''}`}>
                        {demoEdit?.type === 'category' && demoEdit.key === c ? (
                          <div className="flex items-center gap-1 flex-1">
                            <input value={demoEdit.value} onChange={e => setDemoEdit(p => p ? { ...p, value: e.target.value } : p)}
                              className={`flex-1 px-1.5 py-0.5 rounded border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} autoFocus />
                            <button onClick={() => {
                              if (demoEdit.value.trim() && demoEdit.value !== c) {
                                setCategories(p => { const n: Record<string, boolean> = {}; for (const [k, v] of Object.entries(p)) { n[k === c ? demoEdit.value.trim() : k] = v; } return n; });
                              }
                              setDemoEdit(null);
                            }} className="text-emerald-500 hover:text-emerald-700"><Check size={12} /></button>
                          </div>
                        ) : (
                          <>
                            <span className={`text-xs ${theme.highlight}`}>{c}</span>
                            <div className="flex items-center gap-1.5">
                              <button onClick={() => setDemoEdit({ type: 'category', key: c, value: c })} className={`${theme.iconColor} hover:text-blue-500`}><Pencil size={10} /></button>
                              <SSAToggle on={active} onChange={() => setCategories(p => ({ ...p, [c]: !p[c] }))} theme={theme} />
                              <button onClick={() => setCategories(p => { const n = { ...p }; delete n[c]; return n; })} className="text-red-400 hover:text-red-600"><Trash2 size={10} /></button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                  <PaginationBar page={safePage} totalPages={totalPages} onPage={p => setDemoPage(prev => ({ ...prev, category: p }))} theme={theme} />
                </>
              );
            })()}
            <div className="flex gap-1 mt-2">
              <input value={newCategory} onChange={e => setNewCategory(e.target.value)} placeholder="Add..."
                className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
              <button onClick={() => { if (newCategory.trim()) { setCategories(p => ({ ...p, [newCategory.trim()]: true })); setNewCategory(''); } }}
                className={`px-2 py-1 rounded-lg ${theme.primary} text-white text-xs font-bold`}><Plus size={10} /></button>
            </div>
          </div>
          {/* ─── Languages Column ─── */}
          <div>
            {(() => {
              const entries = Object.entries(languages);
              const filtered = entries.filter(([l]) => l.toLowerCase().includes(demoSearch.language.toLowerCase()));
              const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
              const safePage = Math.min(demoPage.language, totalPages);
              const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
              return (
                <>
                  <TableToolbar label="Languages" count={entries.length} search={demoSearch.language}
                    onSearch={v => setDemoSearch(p => ({ ...p, language: v }))} onExport={() => {}} onImport={() => {}} theme={theme} />
                  <div className="space-y-1">
                    {paged.map(([l, active]) => (
                      <div key={l} className={`flex items-center justify-between p-2 rounded-lg ${theme.secondaryBg} ${!active ? 'opacity-50' : ''}`}>
                        {demoEdit?.type === 'language' && demoEdit.key === l ? (
                          <div className="flex items-center gap-1 flex-1">
                            <input value={demoEdit.value} onChange={e => setDemoEdit(p => p ? { ...p, value: e.target.value } : p)}
                              className={`flex-1 px-1.5 py-0.5 rounded border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} autoFocus />
                            <button onClick={() => {
                              if (demoEdit.value.trim() && demoEdit.value !== l) {
                                setLanguages(p => { const n: Record<string, boolean> = {}; for (const [k, v] of Object.entries(p)) { n[k === l ? demoEdit.value.trim() : k] = v; } return n; });
                              }
                              setDemoEdit(null);
                            }} className="text-emerald-500 hover:text-emerald-700"><Check size={12} /></button>
                          </div>
                        ) : (
                          <>
                            <span className={`text-xs ${theme.highlight}`}>{l}</span>
                            <div className="flex items-center gap-1.5">
                              <button onClick={() => setDemoEdit({ type: 'language', key: l, value: l })} className={`${theme.iconColor} hover:text-blue-500`}><Pencil size={10} /></button>
                              <SSAToggle on={active} onChange={() => setLanguages(p => ({ ...p, [l]: !p[l] }))} theme={theme} />
                              <button onClick={() => setLanguages(p => { const n = { ...p }; delete n[l]; return n; })} className="text-red-400 hover:text-red-600"><Trash2 size={10} /></button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                  <PaginationBar page={safePage} totalPages={totalPages} onPage={p => setDemoPage(prev => ({ ...prev, language: p }))} theme={theme} />
                </>
              );
            })()}
            <div className="flex gap-1 mt-2">
              <input value={newLanguage} onChange={e => setNewLanguage(e.target.value)} placeholder="Add..."
                className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
              <button onClick={() => { if (newLanguage.trim()) { setLanguages(p => ({ ...p, [newLanguage.trim()]: true })); setNewLanguage(''); } }}
                className={`px-2 py-1 rounded-lg ${theme.primary} text-white text-xs font-bold`}><Plus size={10} /></button>
            </div>
          </div>
        </div>
      </SectionCard>
      </div>)}

      {activeTab === 'structure' && (<div className="space-y-4">
      <SectionCard title="Streams Configuration (Class 11-12)" subtitle="Define streams with core & optional subjects and seat limits for higher secondary" theme={theme}>
        <TableToolbar label="Streams" count={streamConfig.length} search={streamSearch}
          onSearch={v => { setStreamSearch(v); setStreamPage(1); }} onExport={() => {}} onImport={() => {}} theme={theme} />
        {(() => {
          const filtered = streamConfig.map((s, i) => ({ ...s, _i: i })).filter(s => s.name.toLowerCase().includes(streamSearch.toLowerCase()) || s.core.toLowerCase().includes(streamSearch.toLowerCase()));
          const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
          const safePage = Math.min(streamPage, totalPages);
          const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
          return (
            <>
              <div className="overflow-x-auto mb-2">
                <table className="w-full text-xs">
                  <thead><tr className={theme.secondaryBg}>
                    {['Stream Name', 'Core Subjects', 'Optional Subjects', 'Max Seats', 'Enabled', ''].map(h => (
                      <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor}`}>{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {paged.map((s) => {
                      const i = s._i;
                      const isEnabled = streams[i]?.enabled !== false;
                      return (
                        <tr key={i} className={`border-t ${theme.border} ${!isEnabled ? 'opacity-50' : ''}`}>
                          <td className="px-3 py-2">
                            <input value={s.name} onChange={e => { const n = [...streamConfig]; n[i] = { ...n[i], name: e.target.value }; setStreamConfig(n); }}
                              className={`w-24 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                          </td>
                          <td className="px-3 py-2">
                            <input value={s.core} onChange={e => { const n = [...streamConfig]; n[i] = { ...n[i], core: e.target.value }; setStreamConfig(n); }}
                              className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight} outline-none`} />
                          </td>
                          <td className="px-3 py-2">
                            <input value={s.optional} onChange={e => { const n = [...streamConfig]; n[i] = { ...n[i], optional: e.target.value }; setStreamConfig(n); }}
                              className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.iconColor} outline-none`} />
                          </td>
                          <td className="px-3 py-2">
                            <input type="number" value={s.maxSeats} onChange={e => { const n = [...streamConfig]; n[i] = { ...n[i], maxSeats: e.target.value }; setStreamConfig(n); }}
                              className={`w-16 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                          </td>
                          <td className="px-3 py-2">
                            <SSAToggle on={isEnabled} onChange={() => {
                              const n = [...streams]; if (n[i]) n[i] = { ...n[i], enabled: !isEnabled }; setStreams(n);
                            }} theme={theme} />
                          </td>
                          <td className="px-3 py-2">
                            <button onClick={() => setStreamConfig(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><Trash2 size={12} /></button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <PaginationBar page={safePage} totalPages={totalPages} onPage={setStreamPage} theme={theme} />
            </>
          );
        })()}
        <div className="flex items-center justify-between mt-2">
          <button onClick={() => setStreamConfig(p => [...p, { name: '', core: '', optional: '', maxSeats: '40' }])}
            className={`flex items-center gap-1.5 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl border ${theme.border}`}>
            <Plus size={12} /> Add Stream
          </button>
          <div className={`flex items-center gap-3 p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <span className={`text-xs font-bold ${theme.highlight}`}>Allow students to choose stream during admission</span>
            <SSAToggle on={allowStreamChoice} onChange={() => setAllowStreamChoice(!allowStreamChoice)} theme={theme} />
          </div>
        </div>
      </SectionCard>

      {/* ─── Gap #12/#23: Max Strength + Admission Status per Grade ─── */}
      <SectionCard title="Grade Strength & Admission Status" subtitle="Assign this report to dashboard(s) — not an SSA-level config" theme={theme}>
        <div className="space-y-3">
          <div className={`p-2.5 rounded-xl bg-amber-50 border border-amber-200`}>
            <p className="text-[10px] text-amber-700"><span className="font-bold">Note:</span> This is a report, not a configuration. SSA can assign which dashboard(s) display this report.</p>
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Show &quot;Grade Strength &amp; Admission Status&quot; on:</p>
            <div className="space-y-1.5">
              {[
                { role: 'Principal', default: true },
                { role: 'School Admin', default: false },
                { role: 'Trustee', default: false },
                { role: 'Vice Principal', default: false },
                { role: 'HR Manager', default: false },
              ].map(r => (
                <div key={r.role} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${theme.highlight}`}>{r.role}</span>
                    {r.default && <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold">DEFAULT</span>}
                  </div>
                  <SSAToggle on={r.default} onChange={() => {}} theme={theme} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>
      </div>)}

      {activeTab === 'subjects' && (<div className="space-y-4">
      <SectionCard title="Subject-Teacher Allocation" subtitle="Map subjects to teachers per grade and section with period counts" theme={theme}>
        <TableToolbar label="Mappings" count={subjectTeacherMap.length} search={stmSearch}
          onSearch={v => { setStmSearch(v); setStmPage(1); }} onExport={() => {}} onImport={() => {}} theme={theme} />
        {(() => {
          const filtered = subjectTeacherMap.map((r, i) => ({ ...r, _i: i })).filter(r =>
            r.grade.toLowerCase().includes(stmSearch.toLowerCase()) ||
            r.subject.toLowerCase().includes(stmSearch.toLowerCase()) ||
            r.teacher.toLowerCase().includes(stmSearch.toLowerCase())
          );
          const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
          const safePage = Math.min(stmPage, totalPages);
          const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
          return (
            <>
              <div className="overflow-x-auto mb-2">
                <table className="w-full text-xs">
                  <thead><tr className={theme.secondaryBg}>
                    {['Grade', 'Section', 'Subject', 'Assigned Teacher', 'Periods/Week', 'Actions'].map(h => (
                      <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor}`}>{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {paged.map((row) => {
                      const i = row._i;
                      const isEditing = stmEditIdx === i;
                      return (
                        <tr key={i} className={`border-t ${theme.border}`}>
                          {isEditing ? (
                            <>
                              <td className="px-3 py-2">
                                <select value={stmEditRow.grade} onChange={e => setStmEditRow(p => ({ ...p, grade: e.target.value }))}
                                  className={`px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight} outline-none`}>
                                  {allGrades.map(g => <option key={g} value={g}>{g}</option>)}
                                </select>
                              </td>
                              <td className="px-3 py-2">
                                <input value={stmEditRow.section} onChange={e => setStmEditRow(p => ({ ...p, section: e.target.value }))}
                                  className={`w-12 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight} outline-none`} />
                              </td>
                              <td className="px-3 py-2">
                                <input value={stmEditRow.subject} onChange={e => setStmEditRow(p => ({ ...p, subject: e.target.value }))}
                                  className={`w-24 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight} outline-none`} />
                              </td>
                              <td className="px-3 py-2">
                                <select value={stmEditRow.teacher} onChange={e => setStmEditRow(p => ({ ...p, teacher: e.target.value }))}
                                  className={`px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight} outline-none`}>
                                  {mockTeachers.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                              </td>
                              <td className="px-3 py-2">
                                <input type="number" value={stmEditRow.periods} onChange={e => setStmEditRow(p => ({ ...p, periods: e.target.value }))}
                                  className={`w-12 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] text-center ${theme.highlight} outline-none`} />
                              </td>
                              <td className="px-3 py-2">
                                <button onClick={() => { const n = [...subjectTeacherMap]; n[i] = { ...stmEditRow }; setSubjectTeacherMap(n); setStmEditIdx(null); }}
                                  className="text-emerald-500 hover:text-emerald-700 mr-1"><Check size={12} /></button>
                                <button onClick={() => setStmEditIdx(null)} className="text-gray-400 hover:text-gray-600"><X size={12} /></button>
                              </td>
                            </>
                          ) : (
                            <>
                              <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{row.grade}</td>
                              <td className={`px-3 py-2 ${theme.iconColor}`}>{row.section}</td>
                              <td className={`px-3 py-2 ${theme.highlight}`}>{row.subject}</td>
                              <td className={`px-3 py-2 ${theme.highlight}`}>{row.teacher}</td>
                              <td className={`px-3 py-2 ${theme.iconColor}`}>{row.periods}</td>
                              <td className="px-3 py-2 flex items-center gap-1">
                                <button onClick={() => { setStmEditIdx(i); setStmEditRow({ ...row }); }}
                                  className={`${theme.iconColor} hover:text-blue-500`}><Pencil size={12} /></button>
                                <button onClick={() => setSubjectTeacherMap(p => p.filter((_, j) => j !== i))}
                                  className="text-red-400 hover:text-red-600"><Trash2 size={12} /></button>
                              </td>
                            </>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <PaginationBar page={safePage} totalPages={totalPages} onPage={setStmPage} theme={theme} />
            </>
          );
        })()}
        <button onClick={() => setSubjectTeacherMap(p => [...p, { grade: 'Grade 1', section: 'A', subject: '', teacher: mockTeachers[0], periods: '5' }])}
          className={`flex items-center gap-1.5 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl border ${theme.border} mt-2`}>
          <Plus size={12} /> Add Allocation
        </button>
      </SectionCard>
      </div>)}

      {activeTab === 'rules' && (<div className="space-y-4">
      <SectionCard title="Class Capacity & Waitlist" subtitle="Maximum strength per section and waitlist management" theme={theme}>
        <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg} mb-3`}>
          <div>
            <p className={`text-xs font-bold ${theme.highlight}`}>Enable Waitlist Management</p>
            <p className={`text-[10px] ${theme.iconColor}`}>When a class is full, new applicants are added to a waitlist</p>
          </div>
          <SSAToggle on={enableWaitlist} onChange={() => setEnableWaitlist(!enableWaitlist)} theme={theme} />
        </div>
        {enableWaitlist && (
          <div className={`flex items-center gap-3 p-2.5 rounded-xl ${theme.secondaryBg} mb-3`}>
            <span className={`text-xs font-bold ${theme.highlight}`}>Waitlist Auto-Promote</span>
            <SelectField options={['Automatic', 'Manual Approval', 'Disabled']} value={waitlistAutoPromote} onChange={setWaitlistAutoPromote} theme={theme} />
          </div>
        )}
        <TableToolbar label="Class Capacity" count={classCapacity.length} search={capSearch}
          onSearch={v => { setCapSearch(v); setCapPage(1); }} onExport={() => {}} onImport={() => {}} theme={theme} />
        {(() => {
          const filtered = classCapacity.map((c, i) => ({ ...c, _i: i })).filter(c => c.grade.toLowerCase().includes(capSearch.toLowerCase()));
          const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
          const safePage = Math.min(capPage, totalPages);
          const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
          return (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead><tr className={theme.secondaryBg}>
                    {['Grade', 'Sections', 'Max / Section', 'Total Capacity', 'Current', 'Waitlisted', 'Actions'].map(h => (
                      <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {paged.map((c) => {
                      const i = c._i;
                      const isEditing = capEditIdx === i;
                      return (
                        <tr key={i} className={`border-t ${theme.border}`}>
                          {isEditing ? (
                            <>
                              <td className="px-2 py-1.5">
                                <input value={capEditRow.grade} onChange={e => setCapEditRow(p => ({ ...p, grade: e.target.value }))}
                                  className={`w-20 px-1 py-0.5 rounded border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                              </td>
                              <td className="px-2 py-1.5">
                                <input type="number" value={capEditRow.sections} onChange={e => setCapEditRow(p => ({ ...p, sections: parseInt(e.target.value) || 0 }))}
                                  className={`w-12 px-1 py-0.5 rounded border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                              </td>
                              <td className="px-2 py-1.5">
                                <input type="number" value={capEditRow.maxPerSection} onChange={e => setCapEditRow(p => ({ ...p, maxPerSection: parseInt(e.target.value) || 0 }))}
                                  className={`w-12 px-1 py-0.5 rounded border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                              </td>
                              <td className={`px-2 py-1.5 ${theme.highlight}`}>{capEditRow.sections * capEditRow.maxPerSection}</td>
                              <td className="px-2 py-1.5">
                                <input type="number" value={capEditRow.current} onChange={e => setCapEditRow(p => ({ ...p, current: parseInt(e.target.value) || 0 }))}
                                  className={`w-12 px-1 py-0.5 rounded border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                              </td>
                              <td className="px-2 py-1.5">
                                <input type="number" value={capEditRow.waitlisted} onChange={e => setCapEditRow(p => ({ ...p, waitlisted: parseInt(e.target.value) || 0 }))}
                                  className={`w-12 px-1 py-0.5 rounded border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                              </td>
                              <td className="px-2 py-1.5">
                                <button onClick={() => {
                                  const n = [...classCapacity];
                                  n[i] = { ...capEditRow, total: capEditRow.sections * capEditRow.maxPerSection };
                                  setClassCapacity(n); setCapEditIdx(null);
                                }} className="text-emerald-500 hover:text-emerald-700 mr-1"><Check size={12} /></button>
                                <button onClick={() => setCapEditIdx(null)} className="text-gray-400 hover:text-gray-600"><X size={12} /></button>
                              </td>
                            </>
                          ) : (
                            <>
                              <td className={`px-2 py-1.5 font-bold ${theme.highlight}`}>{c.grade}</td>
                              <td className={`px-2 py-1.5 ${theme.iconColor}`}>{c.sections}</td>
                              <td className={`px-2 py-1.5 ${theme.iconColor}`}>{c.maxPerSection}</td>
                              <td className={`px-2 py-1.5 ${theme.highlight}`}>{c.total}</td>
                              <td className={`px-2 py-1.5 ${c.current >= c.total ? 'text-red-600 font-bold' : theme.iconColor}`}>{c.current}</td>
                              <td className="px-2 py-1.5">
                                {c.waitlisted > 0 ? (
                                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold">{c.waitlisted}</span>
                                ) : (
                                  <span className={`text-[10px] ${theme.iconColor}`}>--</span>
                                )}
                              </td>
                              <td className="px-2 py-1.5 flex items-center gap-1">
                                <button onClick={() => { setCapEditIdx(i); setCapEditRow({ ...c }); }}
                                  className={`${theme.iconColor} hover:text-blue-500`}><Pencil size={12} /></button>
                                <button onClick={() => setClassCapacity(p => p.filter((_, j) => j !== i))}
                                  className="text-red-400 hover:text-red-600"><Trash2 size={12} /></button>
                              </td>
                            </>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <PaginationBar page={safePage} totalPages={totalPages} onPage={setCapPage} theme={theme} />
            </>
          );
        })()}
        <button onClick={() => setClassCapacity(p => [...p, { grade: 'New Grade', sections: 1, maxPerSection: 40, total: 40, current: 0, waitlisted: 0 }])}
          className={`flex items-center gap-1.5 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl border ${theme.border} mt-2`}>
          <Plus size={12} /> Add Class Row
        </button>
      </SectionCard>

      {/* ─── C) Year Rollover Wizard ─── */}
      <SectionCard title="Year Rollover Wizard" subtitle="Moved to Year-End Operations module" theme={theme}>
        <div className={`p-3 rounded-xl ${theme.accentBg} border ${theme.border}`}>
          <p className={`text-xs ${theme.iconColor}`}>Year rollover has moved to <span className={`font-bold ${theme.primaryText}`}>Year-End Operations</span> module in the sidebar for better organization with promotion, archival, and finalization.</p>
        </div>
      </SectionCard>
      </div>)}

      {activeTab === 'settings' && (<div className="space-y-4">
      <SectionCard title="Bulk Import / Export" subtitle="Import courses and batches via CSV or export the current academic structure" theme={theme}>
        <div className="grid grid-cols-2 gap-4 mb-3">
          <button className={`flex items-center justify-center gap-2 p-3 rounded-xl border ${theme.border} ${theme.buttonHover} transition-all`}>
            <Upload size={14} className={theme.iconColor} />
            <span className={`text-xs font-bold ${theme.highlight}`}>Import Courses & Batches (CSV)</span>
          </button>
          <button className={`flex items-center justify-center gap-2 p-3 rounded-xl border ${theme.border} ${theme.buttonHover} transition-all`}>
            <Download size={14} className={theme.iconColor} />
            <span className={`text-xs font-bold ${theme.highlight}`}>Export Structure (Excel)</span>
          </button>
        </div>
        <div className={`p-4 rounded-xl border-2 border-dashed ${theme.border} text-center`}>
          <Upload size={24} className={`mx-auto mb-2 ${theme.iconColor}`} />
          <p className={`text-xs font-bold ${theme.highlight} mb-1`}>Drag & drop CSV file here</p>
          <p className={`text-[10px] ${theme.iconColor} mb-2`}>or click to browse files</p>
          <a href="#" className={`text-[10px] font-bold text-blue-500 hover:underline`}>Download Template</a>
        </div>
      </SectionCard>
      </div>)}

      {activeTab === 'rules' && (<div className="space-y-4">
      <SectionCard title="GPA & Credit System (Higher Secondary)" subtitle="Credit-based grading configuration" theme={theme}>
        <div className="relative">
          <div className="absolute -top-1 right-0 z-10">
            <span className="px-3 py-1 rounded-full bg-purple-100 border border-purple-300 text-[10px] font-bold text-purple-700">PHASE 2</span>
          </div>
          <div className="opacity-40 pointer-events-none">
            <p className={`text-xs ${theme.iconColor}`}>Credit-based grading, GPA calculation, and weighted subject scoring for Class 11-12 will be available in Phase 2.</p>
            <div className={`mt-2 grid grid-cols-3 gap-2`}>
              <div className={`p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-[10px] font-bold ${theme.iconColor}`}>GPA Scale</p>
                <p className={`text-xs font-bold ${theme.highlight}`}>10-point</p>
              </div>
              <div className={`p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-[10px] font-bold ${theme.iconColor}`}>Credit Hours</p>
                <p className={`text-xs font-bold ${theme.highlight}`}>Per subject</p>
              </div>
              <div className={`p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-[10px] font-bold ${theme.iconColor}`}>Weighted GPA</p>
                <p className={`text-xs font-bold ${theme.highlight}`}>Configurable</p>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>
      </div>)}

      {activeTab === 'subjects' && (<div className="space-y-4">
      <SectionCard title="Class Teacher Assignment" subtitle="Assign class teachers to each section" theme={theme}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Class-Section', 'Assigned Teacher', 'Since', 'Status', 'Action'].map(h => (
                <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {classTeachers.map((ct, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{ct.classSection}</td>
                  <td className={`px-3 py-2 ${theme.highlight}`}>{ct.teacher}</td>
                  <td className={`px-3 py-2 ${theme.iconColor}`}>{ct.since}</td>
                  <td className="px-3 py-2">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">{ct.status}</span>
                  </td>
                  <td className="px-3 py-2">
                    <select className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight}`}>
                      <option>Assign</option>
                      <option>Mrs. Iyer</option>
                      <option>Mr. Sharma</option>
                      <option>Ms. Desai</option>
                      <option>Mr. Patel</option>
                      <option>Mrs. Gupta</option>
                      <option>Mr. Reddy</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
      </div>)}

      {activeTab === 'rules' && (<div className="space-y-4">
      <SectionCard title="Promotion Rules" subtitle="Moved to Year-End Operations module" theme={theme}>
        <div className={`p-3 rounded-xl ${theme.accentBg} border ${theme.border}`}>
          <p className={`text-xs ${theme.iconColor}`}>Promotion rules have moved to <span className={`font-bold ${theme.primaryText}`}>Year-End Operations &rarr; Rollover</span> tab where they are applied alongside the academic year transition.</p>
        </div>
      </SectionCard>
      </div>)}

      {activeTab === 'settings' && (<div className="space-y-4">
      <SectionCard title="Role-Based Permissions" subtitle="Moved to Roles & Permission module" theme={theme}>
        <div className={`p-3 rounded-xl ${theme.accentBg} border ${theme.border}`}>
          <p className={`text-xs ${theme.iconColor}`}>Role-based permissions for Academic Config have moved to the <span className={`font-bold ${theme.primaryText}`}>Roles & Permission Management</span> module in the sidebar. All module-level RBAC is centralized there.</p>
        </div>
      </SectionCard>

      <SectionCard title="Bulk Import" subtitle="Import data from Excel templates" theme={theme}>
        <BulkImportWizard entityName="Subject Allocation" templateFields={['Class', 'Section', 'Subject', 'Teacher', 'Periods/Week']} sampleData={[['Grade 9', 'A', 'Mathematics', 'Mr. Patel', '6']]} theme={theme} />
      </SectionCard>
      </div>)}
    </div>
  );
}
