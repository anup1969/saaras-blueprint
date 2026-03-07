// ─── MOCK DATA FOR BLUEPRINT ─────────────────────────
// All data is static/fake for visual prototype purposes only

export const mockStudents = [
  { id: 'STU001', name: 'Aarav Patel', class: '10-A', roll: 1, gender: 'M', status: 'Active', fee: 'Paid', parent: 'Rajesh Patel', phone: '98765 43210' },
  { id: 'STU002', name: 'Zara Khan', class: '8-B', roll: 3, gender: 'F', status: 'Active', fee: 'Pending', parent: 'Imran Khan', phone: '98765 43211' },
  { id: 'STU003', name: 'Riya Sharma', class: '5-A', roll: 12, gender: 'F', status: 'Active', fee: 'Paid', parent: 'Amit Sharma', phone: '98765 43212' },
  { id: 'STU004', name: 'Arjun Singh', class: '10-A', roll: 5, gender: 'M', status: 'Active', fee: 'Overdue', parent: 'Vikram Singh', phone: '98765 43213' },
  { id: 'STU005', name: 'Meera Nair', class: '7-C', roll: 8, gender: 'F', status: 'Active', fee: 'Paid', parent: 'Suresh Nair', phone: '98765 43214' },
  { id: 'STU006', name: 'Rohan Gupta', class: '3-B', roll: 15, gender: 'M', status: 'Active', fee: 'Paid', parent: 'Sanjay Gupta', phone: '98765 43215' },
  { id: 'STU007', name: 'Ananya Reddy', class: '6-A', roll: 7, gender: 'F', status: 'Active', fee: 'Pending', parent: 'Venkat Reddy', phone: '98765 43216' },
  { id: 'STU008', name: 'Dev Mehta', class: '9-B', roll: 22, gender: 'M', status: 'TC Issued', fee: 'Cleared', parent: 'Deepak Mehta', phone: '98765 43217' },
];

export const mockEnquiries = [
  { id: 'ENQ001', child: 'Vikram Rao', class: 'Nursery', parent: 'Sunil Rao', source: 'Walk-in', date: '15-Jan', status: 'New', phone: '98765 00001' },
  { id: 'ENQ002', child: 'Anita Desai', class: 'KG-1', parent: 'Meena Desai', source: 'Online', date: '12-Jan', status: 'Follow-up', phone: '98765 00002' },
  { id: 'ENQ003', child: 'Kabir Joshi', class: '3rd', parent: 'Suresh Joshi', source: 'Referral', date: '10-Jan', status: 'Converted', phone: '98765 00003' },
  { id: 'ENQ004', child: 'Prachi Mehta', class: '6th', parent: 'Deepak Mehta', source: 'Walk-in', date: '08-Jan', status: 'Lost', phone: '98765 00004' },
  { id: 'ENQ005', child: 'Sanya Iyer', class: '1st', parent: 'Ramesh Iyer', source: 'Online', date: '05-Jan', status: 'Test Scheduled', phone: '98765 00005' },
];

export const mockStaff = [
  { id: 'EMP001', name: 'Priya Sharma', dept: 'Teaching', role: 'PGT Mathematics', status: 'Active', phone: '98765 11001' },
  { id: 'EMP002', name: 'Rajesh Kumar', dept: 'Teaching', role: 'TGT Science', status: 'Active', phone: '98765 11002' },
  { id: 'EMP003', name: 'Sunita Patel', dept: 'Admin', role: 'Office Assistant', status: 'Active', phone: '98765 11003' },
  { id: 'EMP004', name: 'Mohammed Irfan', dept: 'Transport', role: 'Driver', status: 'Active', phone: '98765 11004' },
  { id: 'EMP005', name: 'Kavitha Nair', dept: 'Teaching', role: 'PRT English', status: 'Probation', phone: '98765 11005' },
  { id: 'EMP006', name: 'Arun Verma', dept: 'Teaching', role: 'HOD Science', status: 'Active', phone: '98765 11006' },
];

// 12 fee heads as configured in SSA FeeConfigModule
// Active: Tuition, Admission, Annual, Transport, Activity, Lab, Exam (7 active)
// Disabled: Library, Development Fund, Smart Class/IT, Uniform/Books, Hostel (5 disabled)
export const feeHeads = [
  { key: 'tuition', label: 'Tuition Fee', type: 'monthly', appliesTo: 'all', active: true },
  { key: 'admission', label: 'Admission Fee', type: 'one-time', appliesTo: 'all', note: 'New admissions only', active: true },
  { key: 'annual', label: 'Annual Charges', type: 'annual', appliesTo: 'all', active: true },
  { key: 'transport', label: 'Transport Fee', type: 'monthly', appliesTo: 'all', active: true },
  { key: 'activity', label: 'Activity Fee', type: 'quarterly', appliesTo: 'all', active: true },
  { key: 'lab', label: 'Lab Fee', type: 'yearly', appliesTo: '6+', note: 'Grades 6+ only', active: true },
  { key: 'library', label: 'Library Fee', type: 'monthly', appliesTo: 'all', active: false },
  { key: 'exam', label: 'Exam Fee', type: 'term-wise', appliesTo: 'all', active: true },
  { key: 'development', label: 'Development Fund', type: 'annual', appliesTo: 'all', active: false },
  { key: 'smartclass', label: 'Smart Class / IT Fee', type: 'monthly', appliesTo: 'all', active: false },
  { key: 'uniform', label: 'Uniform / Books', type: 'annual', appliesTo: 'all', active: false },
  { key: 'hostel', label: 'Hostel Fee', type: 'monthly', appliesTo: 'boarding', note: 'Boarding students only', active: false },
];

// Fee structure aligned with SSA grade-wise amounts (simplified grade groups)
export const feeStructure = [
  { cls: 'Nursery-KG', tuition: 2500, admission: 12000, annual: 6000, transport: 1800, activity: 1200, lab: 0, library: 0, exam: 800, development: 0, smartclass: 0, uniform: 0, hostel: 0, total: 5000 },
  { cls: '1st-5th', tuition: 3400, admission: 16000, annual: 8500, transport: 2000, activity: 1700, lab: 600, library: 0, exam: 1000, development: 0, smartclass: 0, uniform: 0, hostel: 0, total: 7500 },
  { cls: '6th-8th', tuition: 4200, admission: 18500, annual: 10500, transport: 2200, activity: 2100, lab: 1600, library: 0, exam: 1300, development: 0, smartclass: 0, uniform: 0, hostel: 0, total: 9600 },
  { cls: '9th-10th', tuition: 5000, admission: 22000, annual: 13000, transport: 2500, activity: 2500, lab: 2500, library: 0, exam: 1700, development: 0, smartclass: 0, uniform: 0, hostel: 0, total: 11800 },
  { cls: '11th-12th', tuition: 6500, admission: 28000, annual: 16000, transport: 3000, activity: 3200, lab: 4000, library: 0, exam: 2200, development: 0, smartclass: 0, uniform: 0, hostel: 0, total: 14500 },
];

// 8 payment modes as configured in SSA FeeConfigModule
export const paymentModes = [
  { key: 'cash', label: 'Cash', enabled: true },
  { key: 'cheque', label: 'Cheque', enabled: true },
  { key: 'upi', label: 'UPI', enabled: true },
  { key: 'net_banking', label: 'Net Banking', enabled: true },
  { key: 'credit_card', label: 'Credit Card', enabled: true },
  { key: 'debit_card', label: 'Debit Card', enabled: true },
  { key: 'dd_neft', label: 'DD / NEFT', enabled: true },
  { key: 'paytm_phonepe', label: 'Paytm / PhonePe', enabled: false },
];

export const mockRoutes = [
  { id: 'RT-001', name: 'Route A', driver: 'Ramesh Kumar', vehicle: 'GJ-01-AB-1234', students: 38, stops: 8, status: 'Active' },
  { id: 'RT-002', name: 'Route B', driver: 'Suresh Patel', vehicle: 'GJ-01-CD-5678', students: 46, stops: 12, status: 'Active' },
  { id: 'RT-003', name: 'Route C', driver: 'Mahesh Singh', vehicle: 'GJ-01-EF-9012', students: 28, stops: 6, status: 'Active' },
  { id: 'RT-004', name: 'Route D', driver: 'Jayesh Patel', vehicle: 'GJ-01-GH-3456', students: 38, stops: 7, status: 'Active' },
  { id: 'RT-005', name: 'Route E', driver: 'Dinesh Raval', vehicle: 'GJ-01-IJ-7890', students: 28, stops: 5, status: 'Active' },
  { id: 'RT-006', name: 'Route F', driver: 'Prakash Bhatt', vehicle: 'GJ-01-KL-2345', students: 44, stops: 9, status: 'Active' },
];

export const mockVisitors = [
  { id: 'V001', name: 'Amit Gupta', purpose: 'Parent Meeting', host: 'Ms. Priya', timeIn: '09:15', timeOut: '10:30', badge: 'V-12' },
  { id: 'V002', name: 'Ravi Supplier', purpose: 'Stationery Delivery', host: 'Admin Office', timeIn: '10:00', timeOut: '-', badge: 'V-13' },
  { id: 'V003', name: 'Inspector Sharma', purpose: 'CBSE Inspection', host: 'Principal', timeIn: '11:00', timeOut: '13:00', badge: 'V-14' },
];

export const mockApprovals = [
  { type: 'Leave Request', from: 'Ms. Priya Sharma', detail: 'Casual Leave - 3 days (20-22 Jan)', priority: 'Urgent', time: '2 hours ago' },
  { type: 'Purchase Order', from: 'Lab Coordinator', detail: 'Chemistry Lab Equipment - ₹45,000', priority: 'High', time: '5 hours ago' },
  { type: 'TC Request', from: 'Front Desk', detail: 'Arjun Singh (10-A) - Transfer Certificate', priority: 'Normal', time: 'Yesterday' },
  { type: 'Event Budget', from: 'Sports Teacher', detail: 'Annual Sports Day Budget - ₹1,20,000', priority: 'High', time: 'Yesterday' },
  { type: 'Staff Onboarding', from: 'HR Department', detail: 'New PGT Physics joining Feb 1', priority: 'Normal', time: '2 days ago' },
];

export const dashboardStats = {
  schoolAdmin: {
    totalStudents: 1247,
    totalStaff: 86,
    feeCollected: '₹45.2L',
    feeCollectedPercent: '72%',
    pendingApprovals: 8,
    todayAttendance: '94.2%',
    newEnquiries: 12,
    activeVisitors: 3,
  },
  principal: {
    studentStrength: 1247,
    teacherPresent: 42,
    teacherTotal: 48,
    syllabusCompletion: '68%',
    avgAttendance: '92.1%',
    examUpcoming: 'Unit Test 3 - Feb 15',
    sqaafScore: '78/100',
    pendingActions: 5,
  },
};

// 7 concession types as configured in SSA FeeConfigModule
export const concessionTypes = [
  { type: 'Sibling Discount', method: 'percentage', value: 10, maxAmount: null, active: true, appliesTo: 'tuition-only' },
  { type: 'Merit Scholarship', method: 'percentage', value: 25, maxAmount: 50000, active: true, appliesTo: 'all-components' },
  { type: 'Staff Child', method: 'percentage', value: 100, maxAmount: null, active: true, appliesTo: 'all-components' },
  { type: 'Economic Weaker (EWS)', method: 'percentage', value: 50, maxAmount: null, active: true, appliesTo: 'tuition-annual' },
  { type: 'Sports Quota', method: 'percentage', value: 15, maxAmount: 30000, active: true, appliesTo: 'tuition-only' },
  { type: 'SC/ST Scholarship', method: 'fixed', value: 25000, maxAmount: null, active: true, appliesTo: 'all-components' },
  { type: 'Single Parent', method: 'percentage', value: 20, maxAmount: 20000, active: true, appliesTo: 'tuition-annual' },
];

// Concession approval chain — person-based (not role-based) per SSA
export const concessionApprovalChain = [
  { name: 'Mrs. Meera Shah', role: 'Accounts Officer', avatar: 'MS' },
  { name: 'Dr. Rajesh Kumar', role: 'Principal', avatar: 'RK' },
  { name: 'Mr. Amit Patel', role: 'Trust Secretary', avatar: 'AP' },
];

// 6 exam types as configured in SSA ExamConfigModule
export const examTypes = [
  { key: 'ut1', label: 'Unit Test 1', weight: 5, term: 'Term 1' },
  { key: 'ut2', label: 'Unit Test 2', weight: 5, term: 'Term 1' },
  { key: 'half_yearly', label: 'Half Yearly', weight: 30, term: 'Term 1' },
  { key: 'ut3', label: 'Unit Test 3', weight: 5, term: 'Term 2' },
  { key: 'ut4', label: 'Unit Test 4', weight: 5, term: 'Term 2' },
  { key: 'annual', label: 'Annual', weight: 50, term: 'Term 2' },
];

// CBSE 8-grade scale as configured in SSA ExamConfigModule
export const gradingScale = [
  { grade: 'A1', minMarks: 91, maxMarks: 100, gp: 10, remark: 'Outstanding' },
  { grade: 'A2', minMarks: 81, maxMarks: 90, gp: 9, remark: 'Excellent' },
  { grade: 'B1', minMarks: 71, maxMarks: 80, gp: 8, remark: 'Very Good' },
  { grade: 'B2', minMarks: 61, maxMarks: 70, gp: 7, remark: 'Good' },
  { grade: 'C1', minMarks: 51, maxMarks: 60, gp: 6, remark: 'Above Average' },
  { grade: 'C2', minMarks: 41, maxMarks: 50, gp: 5, remark: 'Average' },
  { grade: 'D', minMarks: 33, maxMarks: 40, gp: 4, remark: 'Below Average' },
  { grade: 'E', minMarks: 0, maxMarks: 32, gp: 0, remark: 'Needs Improvement' },
];

// Late fee config from SSA
export const lateFeeConfig = {
  enabled: true,
  amount: 50,
  gracedays: 7,
  method: 'per-day',
  maxAmount: 500,
};

// 3 timing sets from SSA TimetableConfigModule
export const timingSets = [
  { key: 'primary', label: 'Primary (1-5)', startTime: '08:00', endTime: '13:30', periods: 7, periodDuration: 35 },
  { key: 'secondary', label: 'Secondary (6-10)', startTime: '08:00', endTime: '14:30', periods: 8, periodDuration: 40 },
  { key: 'senior', label: 'Sr. Secondary (11-12)', startTime: '08:00', endTime: '15:00', periods: 8, periodDuration: 45 },
];

// 3 attendance defaulter thresholds from SSA AttendanceConfigModule
export const defaulterThresholds = [
  { level: 'Warning', threshold: 75, action: 'SMS to parent', color: 'yellow' },
  { level: 'Serious', threshold: 65, action: 'Parent meeting + letter', color: 'orange' },
  { level: 'Critical', threshold: 50, action: 'TC warning + counselor referral', color: 'red' },
];

// 8 enquiry pipeline stages from SSA EnquiryAdmissionConfigModule
export const enquiryPipelineStages = [
  { key: 'new', label: 'New Enquiry', sla: '24 hours', order: 1 },
  { key: 'contacted', label: 'Contacted', sla: '48 hours', order: 2 },
  { key: 'visit_scheduled', label: 'Visit Scheduled', sla: '3 days', order: 3 },
  { key: 'visit_done', label: 'Visit Done', sla: '24 hours', order: 4 },
  { key: 'test_scheduled', label: 'Test Scheduled', sla: '5 days', order: 5 },
  { key: 'test_done', label: 'Test Done', sla: '48 hours', order: 6 },
  { key: 'offer_made', label: 'Offer Made', sla: '3 days', order: 7 },
  { key: 'converted', label: 'Converted / Lost', sla: '-', order: 8 },
];

// 6 visitor types with per-type rules from SSA VisitorConfigModule
export const visitorTypes = [
  { key: 'parent', label: 'Parent/Guardian', escort: false, allowedAreas: ['Reception', 'Meeting Room', 'Principal Office'], maxHours: 2, badge: 'Green' },
  { key: 'vendor', label: 'Vendor/Supplier', escort: true, allowedAreas: ['Reception', 'Admin Office', 'Store'], maxHours: 1, badge: 'Yellow' },
  { key: 'official', label: 'Government Official', escort: true, allowedAreas: ['All'], maxHours: 4, badge: 'Red (VIP)' },
  { key: 'alumni', label: 'Alumni', escort: false, allowedAreas: ['Reception', 'Meeting Room', 'Campus'], maxHours: 3, badge: 'Blue' },
  { key: 'guest', label: 'Guest Speaker/Event', escort: true, allowedAreas: ['Auditorium', 'Classroom', 'Reception'], maxHours: 6, badge: 'Purple' },
  { key: 'maintenance', label: 'Maintenance/Service', escort: true, allowedAreas: ['Specific Work Area'], maxHours: 4, badge: 'Orange' },
];

// Stakeholder dashboard definitions
export const stakeholders = [
  { id: 'school-admin', name: 'School Admin', icon: 'Building2', desc: 'Central operations hub — students, staff, fees, enquiries, visitors, reports', phase: 1, status: 'built' },
  { id: 'principal', name: 'Principal', icon: 'GraduationCap', desc: 'Academic oversight, SQAAF compliance, timetable, MIS reports', phase: 1, status: 'built' },
  { id: 'teacher', name: 'Teacher', icon: 'BookOpen', desc: 'Attendance, homework, assignments, class management', phase: 1, status: 'built' },
  { id: 'student', name: 'Student', icon: 'User', desc: 'Self-service portal — homework, results, fees, timetable', phase: 1, status: 'built' },
  { id: 'parent', name: 'Parent', icon: 'Users', desc: 'Child monitoring, fees, communication, pickup authorization', phase: 1, status: 'built' },
  { id: 'super-admin', name: 'Super Admin', icon: 'Shield', desc: 'Platform management — schools, plans, billing, onboarding, analytics', phase: 1, status: 'built' },
  { id: 'trustee', name: 'Trustee', icon: 'Eye', desc: 'Governance — SQAAF, financials, compliance, board results, approvals', phase: 1, status: 'built' },
  { id: 'vice-principal', name: 'Vice Principal', icon: 'UserCheck', desc: 'Substitutions, discipline, exams, timetable, staff duties', phase: 1, status: 'built' },
  { id: 'hr-manager', name: 'HR Manager', icon: 'Briefcase', desc: 'Employee lifecycle, attendance, leaves, payroll, performance', phase: 1, status: 'built' },
  { id: 'accounts-head', name: 'Accounts Head', icon: 'Calculator', desc: 'Fee collection, concessions, expenses, salary, bank reconciliation', phase: 1, status: 'built' },
  { id: 'receptionist', name: 'Receptionist', icon: 'Phone', desc: 'Front office — visitors, enquiries, calls, courier, appointments', phase: 1, status: 'built' },
  { id: 'transport-head', name: 'Transport Head', icon: 'Bus', desc: 'Routes, vehicles, GPS tracking, drivers, maintenance', phase: 1, status: 'built' },
  { id: 'security', name: 'Security / Gatekeeper', icon: 'ShieldCheck', desc: 'Visitor check-in, student pickup, gate log, emergency, patrol', phase: 1, status: 'built' },
  { id: 'account-manager', name: 'Account Manager', icon: 'Headphones', desc: 'Company-side — assigned schools, tickets, usage, renewals', phase: 1, status: 'built' },
];
