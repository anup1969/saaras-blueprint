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

// 12 fee heads as configured in SSA
export const feeHeads = [
  { key: 'tuition', label: 'Tuition Fee', type: 'monthly', appliesTo: 'all' },
  { key: 'admission', label: 'Admission Fee', type: 'one-time', appliesTo: 'all', note: 'New admissions only' },
  { key: 'annual', label: 'Annual Charges', type: 'annual', appliesTo: 'all' },
  { key: 'transport', label: 'Transport Fee', type: 'monthly', appliesTo: 'all' },
  { key: 'activity', label: 'Activity Fee', type: 'monthly', appliesTo: 'all' },
  { key: 'lab', label: 'Lab Fee', type: 'monthly', appliesTo: '6+', note: 'Grades 6+ only' },
  { key: 'library', label: 'Library Fee', type: 'monthly', appliesTo: 'all' },
  { key: 'sports', label: 'Sports Fee', type: 'monthly', appliesTo: 'all' },
  { key: 'technology', label: 'Smart Class / IT Fee', type: 'monthly', appliesTo: 'all' },
  { key: 'exam', label: 'Exam Fee', type: 'quarterly', appliesTo: 'all' },
  { key: 'development', label: 'Development Fee', type: 'annual', appliesTo: 'all' },
  { key: 'caution', label: 'Caution Deposit', type: 'one-time', appliesTo: 'all', note: 'Refundable' },
];

export const feeStructure = [
  { cls: 'Nursery-KG', tuition: 2000, admission: 5000, annual: 3000, transport: 1000, activity: 300, lab: 0, library: 200, sports: 200, technology: 300, exam: 400, development: 500, caution: 2000, total: 5000 },
  { cls: '1st-5th', tuition: 2500, admission: 6000, annual: 3500, transport: 1000, activity: 400, lab: 0, library: 200, sports: 300, technology: 400, exam: 500, development: 500, caution: 2500, total: 5900 },
  { cls: '6th-8th', tuition: 3200, admission: 8000, annual: 4000, transport: 1200, activity: 500, lab: 500, library: 300, sports: 300, technology: 500, exam: 600, development: 600, caution: 3000, total: 7800 },
  { cls: '9th-10th', tuition: 4000, admission: 10000, annual: 5000, transport: 1200, activity: 600, lab: 600, library: 300, sports: 400, technology: 600, exam: 800, development: 800, caution: 3500, total: 9500 },
  { cls: '11th-12th', tuition: 5000, admission: 12000, annual: 6000, transport: 1500, activity: 800, lab: 800, library: 400, sports: 500, technology: 800, exam: 1000, development: 1000, caution: 4000, total: 12000 },
];

export const paymentModes = [
  { key: 'cash', label: 'Cash', enabled: true },
  { key: 'cheque', label: 'Cheque', enabled: true },
  { key: 'upi', label: 'UPI', enabled: true },
  { key: 'net_banking', label: 'Net Banking', enabled: true },
  { key: 'credit_card', label: 'Credit Card', enabled: false },
  { key: 'debit_card', label: 'Debit Card', enabled: true },
  { key: 'dd_neft', label: 'DD / NEFT', enabled: true },
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
