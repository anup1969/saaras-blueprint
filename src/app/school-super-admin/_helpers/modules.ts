import {
  Home, Banknote, GraduationCap, Briefcase, Bus, ClipboardCheck, FileText,
  MessageSquare, Calendar, Clock, Shield, Award, Upload, ShieldCheck, Headphones,
  Download, BookOpen, Users, Lock, Key,
  UtensilsCrossed, Building, Package, Notebook, UserPlus, CreditCard,
  UserCircle, BarChart3, FileBarChart, Plug, Palette, School, Globe,
  Database, Smartphone, MessageSquareText, MonitorPlay,
  CalendarCog, FolderOpen, Heart,
  Fingerprint, GitBranch, BadgeCheck, FileSignature, FileInput
} from 'lucide-react';

export const modules = [
  { id: 'onboarding-wizard', label: 'Onboarding Wizard', icon: School },
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'subscription-mgmt', label: 'Subscriptions', icon: CreditCard, children: [
    { id: 'subscription-mgmt:plans', label: 'Plans' },
    { id: 'subscription-mgmt:billing', label: 'Billing' },
  ] },
  { id: 'fee-config', label: 'Fee Management', icon: Banknote, children: [
    { id: 'fee-config:structure', label: 'Fee Structure' },
    { id: 'fee-config:concessions', label: 'Concessions' },
    { id: 'fee-config:payments', label: 'Payments' },
    { id: 'fee-config:reports', label: 'Reports' },
    { id: 'fee-config:settings', label: 'Settings' },
  ] },
  { id: 'academic-config', label: 'Academic Config', icon: GraduationCap, children: [
    { id: 'academic-config:structure', label: 'Structure' },
    { id: 'academic-config:subjects', label: 'Subjects' },
    { id: 'academic-config:calendar', label: 'Calendar' },
    { id: 'academic-config:rules', label: 'Rules' },
    { id: 'academic-config:settings', label: 'Settings' },
  ] },
  { id: 'hr-config', label: 'HR & Payroll', icon: Briefcase, children: [
    { id: 'hr-config:masters', label: 'Masters' },
    { id: 'hr-config:salary', label: 'Salary' },
    { id: 'hr-config:staff', label: 'Staff' },
    { id: 'hr-config:compliance', label: 'Compliance' },
    { id: 'hr-config:settings', label: 'Settings' },
  ] },
  { id: 'transport-config', label: 'Transport', icon: Bus, children: [
    { id: 'transport-config:policy', label: 'Policy' },
    { id: 'transport-config:fleet', label: 'Fleet' },
    { id: 'transport-config:safety', label: 'Safety' },
    { id: 'transport-config:settings', label: 'Settings' },
  ] },
  { id: 'attendance-config', label: 'Attendance', icon: ClipboardCheck, children: [
    { id: 'attendance-config:config', label: 'Config' },
    { id: 'attendance-config:rules', label: 'Rules' },
    { id: 'attendance-config:settings', label: 'Settings' },
  ] },
  { id: 'exam-config', label: 'Exams & Grading', icon: FileText, children: [
    { id: 'exam-config:grading', label: 'Grading' },
    { id: 'exam-config:scheduling', label: 'Scheduling' },
    { id: 'exam-config:marks', label: 'Marks' },
    { id: 'exam-config:reports', label: 'Reports' },
    { id: 'exam-config:settings', label: 'Settings' },
  ] },
  { id: 'communication-config', label: 'Communication', icon: MessageSquare, children: [
    { id: 'communication-config:messaging', label: 'Messaging' },
    { id: 'communication-config:content', label: 'Content' },
    { id: 'communication-config:notifications', label: 'Notifications' },
    { id: 'communication-config:settings', label: 'Settings' },
  ] },
  { id: 'timetable-config', label: 'Timetable & Bell', icon: Calendar, children: [
    { id: 'timetable-config:schedule', label: 'Schedule' },
    { id: 'timetable-config:builder', label: 'Builder' },
    { id: 'timetable-config:substitution', label: 'Substitution' },
    { id: 'timetable-config:settings', label: 'Settings' },
  ] },
  { id: 'leave-config', label: 'Leave Policy', icon: Clock, children: [
    { id: 'leave-config:types', label: 'Types' },
    { id: 'leave-config:approval', label: 'Approval' },
    { id: 'leave-config:settings', label: 'Settings' },
  ] },
  { id: 'visitor-config', label: 'Visitor Rules', icon: Shield, children: [
    { id: 'visitor-config:management', label: 'Management' },
    { id: 'visitor-config:settings', label: 'Settings' },
  ] },
  { id: 'certificate-config', label: 'Certificates', icon: Award, children: [
    { id: 'certificate-config:templates', label: 'Templates' },
    { id: 'certificate-config:settings', label: 'Settings' },
  ] },
  { id: 'library-config', label: 'Library', icon: BookOpen, children: [
    { id: 'library-config:catalog', label: 'Catalog' },
    { id: 'library-config:operations', label: 'Operations' },
    { id: 'library-config:settings', label: 'Settings' },
  ] },
  { id: 'canteen-config', label: 'Canteen / Meal', icon: UtensilsCrossed, children: [
    { id: 'canteen-config:menu', label: 'Menu' },
    { id: 'canteen-config:pricing', label: 'Pricing' },
    { id: 'canteen-config:settings', label: 'Settings' },
  ] },
  { id: 'hostel-config', label: 'Hostel', icon: Building, children: [
    { id: 'hostel-config:setup', label: 'Setup' },
    { id: 'hostel-config:inventory', label: 'Inventory' },
    { id: 'hostel-config:settings', label: 'Settings' },
  ] },
  { id: 'inventory-config', label: 'Inventory & Assets', icon: Package, children: [
    { id: 'inventory-config:assets', label: 'Assets' },
    { id: 'inventory-config:procurement', label: 'Procurement' },
    { id: 'inventory-config:settings', label: 'Settings' },
  ] },
  { id: 'compliance-config', label: 'Compliance & Quality', icon: ShieldCheck, children: [
    { id: 'compliance-config:frameworks', label: 'Frameworks' },
    { id: 'compliance-config:monitoring', label: 'Monitoring' },
    { id: 'compliance-config:tools', label: 'Tools' },
  ] },
  { id: 'role-management', label: 'Roles & Permissions', icon: Key, children: [
    { id: 'role-management:matrix', label: 'Matrix' },
    { id: 'role-management:roles', label: 'Roles' },
    { id: 'role-management:users', label: 'Users' },
    { id: 'role-management:settings', label: 'Settings' },
  ] },
  { id: 'homework-config', label: 'Homework & Assignment', icon: Notebook, children: [
    { id: 'homework-config:assignments', label: 'Assignments' },
    { id: 'homework-config:review', label: 'Review' },
    { id: 'homework-config:settings', label: 'Settings' },
  ] },
  { id: 'enquiry-config', label: 'Enquiry & Admission', icon: UserPlus, children: [
    { id: 'enquiry-config:settings', label: 'Settings' },
    { id: 'enquiry-config:sources', label: 'Sources' },
    { id: 'enquiry-config:process', label: 'Process' },
    { id: 'enquiry-config:notifications', label: 'Notifications' },
  ] },
  { id: 'data-migration', label: 'Data Migration', icon: Upload },
  { id: 'critical-locks', label: 'Critical Locks', icon: Lock },
  { id: 'audit-log', label: 'Audit Log', icon: ShieldCheck },
  { id: 'backup-export', label: 'Backup & Export', icon: Download, children: [
    { id: 'backup-export:backup', label: 'Backup' },
    { id: 'backup-export:export', label: 'Export' },
    { id: 'backup-export:settings', label: 'Settings' },
  ] },
  { id: 'parent-portal-config', label: 'Parent Portal', icon: UserCircle, children: [
    { id: 'parent-portal-config:features', label: 'Features' },
    { id: 'parent-portal-config:settings', label: 'Settings' },
  ] },
  { id: 'student-portal-config', label: 'Student Portal', icon: Users, children: [
    { id: 'student-portal-config:features', label: 'Features' },
    { id: 'student-portal-config:settings', label: 'Settings' },
  ] },
  { id: 'alumni-config', label: 'Alumni', icon: Globe, children: [
    { id: 'alumni-config:portal', label: 'Portal' },
    { id: 'alumni-config:engagement', label: 'Engagement' },
  ] },
  { id: 'analytics-config', label: 'Analytics & BI', icon: BarChart3, children: [
    { id: 'analytics-config:dashboards', label: 'Dashboards' },
    { id: 'analytics-config:metrics', label: 'Metrics' },
    { id: 'analytics-config:settings', label: 'Settings' },
  ] },
  { id: 'report-engine-config', label: 'Report Engine', icon: FileBarChart, children: [
    { id: 'report-engine-config:builder', label: 'Builder' },
    { id: 'report-engine-config:scheduling', label: 'Scheduling' },
    { id: 'report-engine-config:settings', label: 'Settings' },
  ] },
  { id: 'api-integration-config', label: 'API & Integrations', icon: Plug, children: [
    { id: 'api-integration-config:integrations', label: 'Integrations' },
    { id: 'api-integration-config:settings', label: 'Settings' },
  ] },
  { id: 'branding-config', label: 'Branding & White-label', icon: Palette, children: [
    { id: 'branding-config:identity', label: 'Identity' },
    { id: 'branding-config:domain', label: 'Domain' },
  ] },
  { id: 'school-identity-config', label: 'School Identity', icon: School, children: [
    { id: 'school-identity-config:basic', label: 'Basic' },
    { id: 'school-identity-config:schedule', label: 'Schedule' },
    { id: 'school-identity-config:system', label: 'System' },
  ] },
  { id: 'data-privacy-config', label: 'Data Privacy', icon: Shield, children: [
    { id: 'data-privacy-config:consent', label: 'Consent' },
    { id: 'data-privacy-config:compliance', label: 'Compliance' },
    { id: 'data-privacy-config:security', label: 'Security' },
  ] },
  { id: 'demo-data-seeder', label: 'Demo Data Seeder', icon: Database },
  { id: 'mobile-app-config', label: 'Mobile App', icon: Smartphone, children: [
    { id: 'mobile-app-config:dashboard', label: 'Dashboard' },
    { id: 'mobile-app-config:features', label: 'Features' },
    { id: 'mobile-app-config:management', label: 'Management' },
  ] },
  { id: 'remark-bank-config', label: 'Remark Bank', icon: MessageSquareText, children: [
    { id: 'remark-bank-config:bank', label: 'Bank' },
    { id: 'remark-bank-config:settings', label: 'Settings' },
  ] },
  { id: 'lms-config', label: 'LMS / E-Learning', icon: MonitorPlay, children: [
    { id: 'lms-config:content', label: 'Content' },
    { id: 'lms-config:engagement', label: 'Engagement' },
    { id: 'lms-config:settings', label: 'Settings' },
  ] },
  { id: 'year-end-ops', label: 'Year-End Operations', icon: CalendarCog, children: [
    { id: 'year-end-ops:rollover', label: 'Rollover' },
    { id: 'year-end-ops:copy', label: 'Copy' },
    { id: 'year-end-ops:finalize', label: 'Finalize' },
  ] },
  { id: 'id-card-config', label: 'ID Cards', icon: CreditCard, children: [
    { id: 'id-card-config:design', label: 'Design' },
    { id: 'id-card-config:fields', label: 'Fields' },
    { id: 'id-card-config:print', label: 'Print' },
  ] },
  { id: 'doc-mgmt-config', label: 'Documents', icon: FolderOpen, children: [
    { id: 'doc-mgmt-config:categories', label: 'Categories' },
    { id: 'doc-mgmt-config:storage', label: 'Storage' },
    { id: 'doc-mgmt-config:distribution', label: 'Distribution' },
  ] },
  { id: 'health-config', label: 'Health & Infirmary', icon: Heart, children: [
    { id: 'health-config:setup', label: 'Setup' },
    { id: 'health-config:tracking', label: 'Tracking' },
    { id: 'health-config:settings', label: 'Settings' },
  ] },
  { id: 'biometric-config', label: 'Biometric & Devices', icon: Fingerprint, children: [
    { id: 'biometric-config:devices', label: 'Devices' },
    { id: 'biometric-config:management', label: 'Management' },
  ] },
  { id: 'workflow-config', label: 'Workflow Engine', icon: GitBranch, children: [
    { id: 'workflow-config:builder', label: 'Builder' },
    { id: 'workflow-config:rules', label: 'Rules' },
  ] },
  { id: 'accreditation-config', label: 'Accreditation', icon: BadgeCheck, children: [
    { id: 'accreditation-config:frameworks', label: 'Frameworks' },
    { id: 'accreditation-config:assessment', label: 'Assessment' },
  ] },
  { id: 'consent-config', label: 'Consent & E-Sign', icon: FileSignature, children: [
    { id: 'consent-config:consent', label: 'Consent' },
    { id: 'consent-config:settings', label: 'Settings' },
  ] },
  { id: 'form-builder-config', label: 'Form Builder', icon: FileInput, children: [
    { id: 'form-builder-config:builder', label: 'Builder' },
    { id: 'form-builder-config:management', label: 'Management' },
  ] },
  { id: 'support', label: 'Support', icon: Headphones },
];
