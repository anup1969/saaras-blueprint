'use client';

import React, { useState, useRef, useEffect } from 'react';
import BlueprintLayout from '@/components/BlueprintLayout';
import { StatCard, Toggle, TabBar, DataTable, SearchBar } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  Home, Banknote, GraduationCap, Briefcase, Bus, ClipboardCheck, FileText,
  MessageSquare, Calendar, Clock, Shield, Award, Upload, ShieldCheck, Headphones,
  Settings, CheckCircle, AlertTriangle, Plus, X, Save, Download, Filter,
  Search, Edit, Trash2, Eye, ChevronDown, ChevronUp, PanelLeftClose, PanelLeftOpen,
  BookOpen, Users, Bell, Mail, Phone, MapPin, Printer, Hash, Lock, Key,
  UtensilsCrossed, Building, Package, Notebook, UserPlus, CreditCard,
  UserCircle, BarChart3, FileBarChart, Webhook, Palette, School, Globe, Plug, Info
} from 'lucide-react';
import SupportModule from '@/components/SupportModule';

// ─── INFO TOOLTIP COMPONENT ──────────────────────────
function InfoTooltip({ text, theme }: { text: string; theme: Theme }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);
  // Split text on "|" — first part = what it does, second part = who it affects
  const parts = text.split('|');
  const what = parts[0]?.trim();
  const affects = parts[1]?.trim();
  return (
    <div ref={ref} className="relative inline-flex">
      <button onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        className={`ml-1.5 p-0.5 rounded-full hover:bg-blue-100 transition-colors ${open ? 'bg-blue-100' : ''}`}
        title="Click for info">
        <Info size={13} className="text-blue-400 hover:text-blue-600" />
      </button>
      {open && (
        <div className="absolute left-6 top-0 z-50 w-72 p-3 rounded-xl bg-white border border-blue-200 shadow-xl text-left animate-in fade-in" style={{ animation: 'fadeIn 0.15s ease-out' }}>
          <div className="flex items-start justify-between mb-1.5">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide flex items-center gap-1"><Info size={10} /> Configuration Info</span>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={12} /></button>
          </div>
          <p className="text-[11px] text-gray-700 leading-relaxed">{what}</p>
          {affects && (
            <div className="mt-2 pt-2 border-t border-blue-100">
              <p className="text-[9px] font-bold text-blue-500 uppercase tracking-wider mb-0.5">Affects</p>
              <p className="text-[10px] text-gray-600 leading-relaxed">{affects}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── INFO MAPS: What each config does + which dashboards/stakeholders it affects ───
const MODULE_INFO: Record<string, string> = {
  'Fee Configuration': 'This is where you set up your entire school fee structure. Define what fees you charge (tuition, transport, lab, etc.), how much each grade pays, which payment methods parents can use, and what happens when fees are overdue. Every fee receipt, parent payment screen, and accounts report pulls from these settings.|When parents open their fee portal, they see the fee heads and amounts you configure here. The Account Head uses these settings to collect fees, generate receipts, and run defaulter reports. The Principal sees fee analytics on their dashboard. If you change a fee head here, it updates everywhere automatically.',
  'Academic Configuration': 'Set up your school\'s academic backbone here \u2014 which subjects each grade studies, how many sections per class, house names for inter-house competitions, holidays, and term dates. If your school has a preschool wing, you can configure that too.|Teachers see their assigned subjects and class lists based on what you set here. The timetable module uses your subject list to build period schedules. Exam modules pull subject names for marks entry. Even the student admission form uses your grade and section data.',
  'HR & Payroll Configuration': 'Configure everything related to your staff \u2014 departments (Teaching, Admin, Accounts), designations (Teacher, Clerk, Peon), salary components (Basic, HRA, DA), and how often salary is processed. You can also set up staff attendance methods and onboarding checklists for new hires.|The HR Manager uses these settings daily for attendance, leave, and payroll. Teachers see their salary slips based on the components you define here. The Account Head processes payroll disbursement using your pay cycle settings.',
  'Transport Configuration': 'If your school runs buses, configure everything here \u2014 routes with stops and timings, vehicle details, driver assignments, GPS tracking, and how transport fees are calculated (flat rate, distance-based, or per-stop). Also set up student pickup verification rules for dismissal time.|Parents can track their child\'s bus in real-time using settings you enable here. The Transport Head manages daily operations, route changes, and driver schedules. Security guards use your pickup verification rules at the school gate.',
  'Attendance Configuration': 'Choose how attendance is marked in your school \u2014 biometric, RFID card tap, manual register, or mobile app. Set whether attendance is taken once daily, twice (morning/afternoon), or every period. Configure what happens when a student is absent \u2014 should parents get an instant SMS? After how many continuous absences should the Principal be alerted?|Teachers see the marking interface you configure here. Parents receive absence notifications based on your rules. The Principal\'s dashboard shows attendance trends from this data.',
  'Exams & Grading Configuration': 'Define your school\'s examination system \u2014 whether you use percentage marks, letter grades (A, B, C), CGPA, or competency-based assessment. Set grade boundaries (e.g., A1 = 91-100), exam types (Unit Test, Mid-Term, Final) with their weightage, and what your printed report card looks like.|Teachers enter marks using the grading system you set here. Students and parents see results, grades, and report cards in the format you choose. The Principal gets exam analytics based on your grade boundaries.',
  'Communication Configuration': 'Control who can message whom in your school. Can parents directly chat with teachers, or only view announcements? Can students message the Principal? Set up auto-created groups (like class-wise parent groups), file sharing limits, and pre-built message templates for common notifications.|Every user\'s chat experience depends on these settings. Parents see messaging options based on your permission matrix. Teachers get auto-created class groups. The school admin can send broadcast messages using your templates.',
  'Timetable & Bell Schedule': 'Set your school\'s daily rhythm \u2014 when each period starts and ends, break timings, assembly duration, and whether Saturday is a working day. Configure substitution rules for when a teacher is absent, and whether teachers can swap periods among themselves.|Teachers see their daily schedule based on your bell timings. Students see their class timetable. The Vice Principal uses your substitution rules to handle absent teacher periods. If you change a period timing here, the entire school schedule adjusts.',
  'Leave Policy Configuration': 'Define leave rules for your staff \u2014 how many casual leaves, sick leaves, and earned leaves per year. Set special rules like the sandwich rule (do weekends between leave days count?), carry-forward limits, and who approves whose leave (e.g., HOD approves teacher leave, then Principal gives final approval).|Teachers apply for leave and see their balance based on your settings. The HR Manager tracks all leave records. Principals and Vice Principals see approval queues based on the approval chain you define here.',
  'Visitor & Pickup Rules': 'Configure how visitors enter your campus and how students are released at dismissal. Set verification methods \u2014 should parents show OTP, photo ID, or be on an authorized person list? Define different rules for different visitor types (parents, vendors, government officials). Control whether parents can access campus CCTV feeds.|Security guards follow these rules at the gate. Parents get OTP or pre-register visits through their portal. The Receptionist uses these settings when logging visitors. The Principal can review visitor reports.',
  'Certificate Configuration': 'Set up the certificates your school issues \u2014 Transfer Certificate (TC), Bonafide, Character Certificate, Migration Certificate, etc. Configure auto-numbering (so each certificate gets a unique serial number), digital signatures, QR codes for verification, and the approval chain before a certificate is printed.|When a parent or student requests a certificate through the portal, the system follows your approval workflow. The school office generates certificates using your templates. QR codes let anyone verify a certificate is authentic.',
  'Library Configuration': 'Configure your school library \u2014 how many books a student can borrow, loan duration, renewal limits, and overdue fines. Enable digital library access and barcode scanning if your library uses it.|Students search and borrow books based on your rules. Parents get notified about overdue books. The library staff uses your scanning and cataloguing settings daily.',
  'Canteen / Meal Configuration': 'If your school has a canteen, set up pre-ordering, wallet system for cashless payments, and allergy tracking (important for student safety). Configure meal types \u2014 does your canteen serve breakfast, lunch, snacks? If you have a preschool wing, set up special meal plans for young children.|Parents can top up their child\'s meal wallet and track what they eat. Students order meals through the portal. Teachers on canteen duty use these settings for supervision.',
  'Hostel Configuration': 'For boarding schools \u2014 configure room types (single, double, dormitory), mess management, visitor rules for hostel visitors, warden assignments, and curfew timings. Set up emergency contacts and hostel-specific fee components.|The Hostel Warden manages daily operations using these settings. Boarding students see their room and mess details. Parents of hostellers can view hostel fees and communicate with the warden.',
  'Inventory & Asset Configuration': 'Track your school\'s physical assets \u2014 furniture, computers, lab equipment, sports gear, stationery. Set up asset tagging, stock alerts (when items run low), purchase approval chains (small purchases approved by HOD, large ones need Trust approval), and depreciation tracking.|The school admin tracks all assets. Department heads request purchases that flow through your approval chain. The Account Head processes purchase orders and tracks depreciation for accounting.',
  'Compliance & Quality Configuration': 'If your school follows a quality assessment framework like SQAAF, NAAC, or CBSE affiliation norms, configure it here. Set audit schedules, compliance domains (academic quality, infrastructure, safety), and maintain required documents.|The Principal prepares for audits using your compliance checklist. The school admin collects and uploads required documents. Trustees can review compliance scores and audit readiness.',
  'Homework & Assignment Configuration': 'Set rules for homework \u2014 can students submit online, offline, or both? What\'s the file size limit for uploads? Is there a grace period for late submissions? Enable plagiarism checks if needed.|Teachers create and grade assignments using your rules. Students see submission deadlines and upload homework through the portal. Parents track pending homework and get notifications based on your settings.',
  'Enquiry & Admission Configuration': 'Manage the entire journey from enquiry to admission. Configure lead sources (walk-in, website, referral), follow-up reminders, application form fields, required documents, and how seats are allocated per grade.|The Receptionist registers enquiries and tags their source. The School Admin processes applications and manages seat allocation. Parents fill out the online application form you configure here. The Principal monitors conversion rates.',
  'Online Payment Configuration': 'Set up your payment gateway (Razorpay, PayU, CCAvenue) and payment policies \u2014 can parents make partial payments? Is there a convenience fee for online payments? What\'s the refund policy? Configure auto-receipt generation after successful payment.|Parents use your gateway settings when paying fees online. The Account Head reconciles payments and processes refunds. Auto-generated receipts are available to parents instantly after payment.',
  'Parent Portal Configuration': 'Control exactly what parents see when they log in \u2014 fee payment, attendance records, homework tracker, exam results, communication, transport tracking. You can disable any feature to simplify the parent experience. Set when report cards become visible and how parents communicate with staff.|Every toggle here directly shows or hides a feature on the parent\'s login screen. Teachers\' interaction options with parents also depend on your communication mode setting.',
  'Student Portal Configuration': 'Control what students can access in their portal \u2014 attendance history, library, homework submissions, exam results, timetable. Disable modules that aren\'t relevant for your students.|Each toggle directly controls whether a student sees that module when they log in. Keeping it simple helps students focus on what matters.',
  'Alumni Configuration': 'Set up an alumni engagement portal \u2014 networking directory, donation collection, mentorship programs, job board, and event registration. Keep your school connected with former students.|Alumni access the portal features you enable here. The school admin manages alumni records. Trustees can track donations and alumni engagement metrics.',
  'Analytics & BI Configuration': 'Enable advanced analytics \u2014 predictive insights (which students are at risk of dropping out?), trend analysis (how has attendance changed over 3 years?), and custom dashboard widgets. Configure how long historical data is retained for analysis.|The Principal and Trustee see analytics dashboards based on your settings. Data retention affects how far back reports can go. Some features may require a higher subscription tier.',
  'Report Engine Configuration': 'Automate report generation \u2014 schedule daily attendance summaries, weekly fee collection reports, or monthly HR reports to be emailed automatically. Configure export formats (PDF, Excel, CSV) and who receives each report.|Principals receive scheduled reports in their inbox without asking. The Account Head gets financial reports on their schedule. Any admin can download reports in the formats you enable.',
  'API & Integration Configuration': 'Connect your school ERP with third-party tools \u2014 Tally for accounting, SMS providers for notifications, biometric devices for attendance, GPS providers for transport tracking. Set API rate limits to prevent misuse. There is a master switch to disable all integrations in case of emergency.|The Account Head benefits from Tally integration. Communication module uses your SMS/email provider. Attendance and transport modules connect to hardware devices through settings here.',
  'Branding & White-label Configuration': 'Make the ERP look like your school\'s own platform. Set your school logo, brand colors, and custom domain (e.g., portal.yourschool.com instead of a generic URL). Customize email and SMS templates with your school branding.|Parents, students, and staff all see your school branding when they log in. Email notifications carry your school logo and colors. Certificates and reports use your letterhead.',
  'School Identity Configuration': 'Enter your school\'s core details \u2014 official name, board affiliation (CBSE, ICSE, State Board), address, contact information, trust name, and established year. Set up working days, shifts (if you run morning and afternoon shifts), and daycare/extended hours for working parents.|This information appears on every certificate, report card, and official communication. It is the foundation that all other modules reference for your school\'s identity.',
  'Onboarding Wizard': 'A guided step-by-step setup for new schools joining the platform. Walk through entering school info, choosing your academic structure, selecting which modules you need, and creating the first admin account. Complete this once \u2014 everything else builds on top of it.|All dashboards and modules depend on the onboarding data. The School Admin you create here is the first user who can access the system and start detailed configuration.',
  'Subscription Management': 'View your current plan, check how much of your quota you are using (active users, storage, SMS), compare available plans, and manage billing. Upgrade or downgrade as your school\'s needs change.|The features available across every module depend on your subscription plan. Usage limits (number of students, SMS count, storage) are enforced based on what is shown here.',
  'Roles & Permissions': 'Define who can do what in the system. For each role (Teacher, Principal, Account Head, etc.), toggle View, Create, Edit, Delete permissions per module. Create custom roles, set up role hierarchy (child roles inherit parent permissions), and control data visibility \u2014 for example, a teacher sees only their class, but a Principal sees all classes.|Every button, page, and data element across all 14 dashboards is controlled by permissions set here. If a teacher cannot see exam results, this is where you check and fix it.',
  'Backup & Export': 'Set up automatic data backups (daily, weekly, or custom schedule) so your school data is always safe. Export data in CSV, Excel, or JSON format for migration or external reporting. Restore from a backup if something goes wrong.|The school admin gets peace of mind with automatic backups. Data export is useful for board submissions, auditor requests, or migrating to a new system.',
};

const SECTION_INFO: Record<string, string> = {
  // ── Fee Configuration ──
  'Fee Template': 'Choose how your school charges fees. "Simple Annual" means one lump-sum amount per grade per year \u2014 simplest for small schools. "Component-Based" means you break fees into parts (tuition, transport, lab, etc.) with separate amounts \u2014 best for schools that want detailed receipts. "Term-Wise" splits the year into terms with separate billing per term.|Parents see their fee structure differently based on your choice. Simple Annual shows one total. Component-Based shows a detailed breakdown on every receipt. Term-Wise shows payment due per term. The Account Head\'s collection workflow also changes accordingly.',
  'Fee Heads': 'These are the individual fee components you charge \u2014 like Tuition Fee, Transport Fee, Lab Fee, Activity Fee, etc. Toggle each one on or off, and set how often it is billed (monthly, quarterly, yearly, or one-time). Only the fee heads you enable here will appear when setting grade-wise amounts.|When parents view their fee breakdown, they see exactly these heads. The Account Head collects against these heads. If you turn off "Lab Fee" here, it disappears from everywhere \u2014 receipts, reports, and the payment portal.',
  'Grade-wise Fee Amounts': 'This is the actual money table \u2014 how much each grade pays for each fee head. Nursery typically has the lowest fees and Grade 12 the highest, with gradual increases. These values drive every fee receipt, payment request, and financial report in the system.|Parents see these exact amounts on their fee portal. The Account Head uses these for collection targets. Concession calculations are applied on top of these base amounts. If you change an amount here, all pending invoices update.',
  'Payment Configuration': 'Choose which payment methods your school accepts \u2014 UPI, cash, cheque, net banking, credit/debit cards. Set the billing cycle (how often bills are generated) and the due date (day of month by which parents should pay).|Parents see only the payment options you enable here. The Account Head\'s counter shows your accepted modes. The billing cycle determines when the system generates new invoices automatically.',
  'Late Fee Rules': 'If you want to penalize late payments, enable this and set the amount (per day, per week, or flat), grace period (how many days after due date before penalty kicks in), and a maximum cap so penalties don\'t become unreasonable.|Parents see late fee charges added to their pending amount after the grace period. The Account Head\'s collection reports include late fee calculations. The cap ensures penalties stay fair.',
  'Concession & Scholarship Master': 'If your school offers fee discounts \u2014 like sibling discount for parents with multiple children, merit scholarships for toppers, or staff child concessions \u2014 enable them here. Set the discount percentage or fixed amount, and whether principal approval is needed before applying.|When the Account Head or School Admin applies a concession to a student, only the types enabled here will appear as options. Parents will see the concession on their fee receipts.',
  'Concession Approval Workflow': 'Enable this if you want concessions to go through an approval chain before they take effect \u2014 for example, Accounts Officer recommends, Principal approves, and Trust gives final sign-off. Set a threshold below which concessions auto-approve without waiting.|The Principal sees pending concession approvals in their queue. The Account Head can only apply approved concessions. Parents see "Pending Approval" status until the chain completes.',
  'Fee Defaulter Blocking Rules': 'Decide what happens when parents don\'t pay fees on time. You can block report card downloads, prevent Transfer Certificate generation, or hold back exam hall tickets. Enable the auto-reminder option so parents get a warning before any blocking action kicks in.|Students and parents see a message explaining why a service is blocked. Teachers are prevented from releasing report cards for blocked students. The School Admin can see a full defaulter list.',
  'Fee Reminder Schedule': 'Set up automatic reminders that go out before and after the fee due date. For example: 7 days before due date via SMS, 1 day after via SMS + Email, 15 days after via SMS + Phone call. Escalating channels help ensure parents don\'t miss payments.|Parents receive these reminders on their phone and email. The Account Head can track which reminders have been sent. The system handles this automatically \u2014 no manual effort needed.',
  'Payment Modes': 'Detailed settings for each payment method \u2014 processing fees (does UPI have a 0.5% charge?), whether a receipt is generated automatically, and whether reconciliation is automatic or needs manual verification. Set one mode as the default for the school counter.|The Account Head uses these settings for daily reconciliation. Processing fees may be absorbed by the school or shown to parents. Auto-receipt saves time at the fee counter.',

  // ── Academic Configuration ──
  'Academic Year': 'Set the start and end dates of your current academic year (e.g., April 1 to March 31, or June 1 to May 31). Every date-dependent feature in the ERP \u2014 attendance calculations, exam scheduling, fee billing cycles, promotions \u2014 uses these dates as boundaries.|All dashboards show the current academic year context. Exam scheduling is bounded by these dates. Attendance working-day counts are calculated within this range.',
  'Subject Master List': 'Add the subjects taught in each grade. When you add a subject to one grade, it appears as a suggestion for other grades so you can quickly add it. You can rename or remove subjects per grade. This list drives subject dropdowns across the entire ERP.|Teachers see their assigned subjects from this list. The timetable uses these subjects to create period schedules. Exam marks entry shows these subject names. Report cards list these subjects.',
  'Section Configuration': 'Define section names for your school (A, B, C, D...) and assign them to each grade with a student capacity per section. For example, Grade 5 might have sections A, B, C with 40 students each.|Teachers are assigned to class-sections from this list. Attendance is taken section-wise. The timetable creates separate schedules per section. Student allocation during admission uses these capacities.',
  'House System': 'If your school has an inter-house system for sports day, cultural events, or competitions, set up house names, colors, and captains here. Students are assigned to houses for team activities throughout the year.|Students see their house assignment in their profile. Teachers use houses for organizing inter-house events. The Principal can view house-wise participation reports.',
  'Preschool Groups': 'If you have a preschool wing, configure age-based group names and maximum capacity for each level \u2014 Nursery (2-3 years), Jr. KG (3-4 years), Sr. KG (4-5 years). Give them friendly names like "Butterflies" or "Explorers".|Teachers see these group names instead of formal class names for preschool. Parents of preschoolers see the group name on their child\'s profile. Capacity limits help manage admissions.',
  'Holiday Calendar': 'Enter all school holidays and vacations for the academic year \u2014 national holidays, religious observances, Diwali break, summer vacation, etc. You can add single-day holidays or multi-day ranges.|The attendance module automatically skips holidays. Teachers see holidays on their calendar. Parents get holiday notifications. Working day calculations exclude these dates from attendance percentage.',
  'Recurring Holidays': 'Set weekly off-days \u2014 like every Sunday off, or alternate Saturdays off. These combine with the holiday calendar to calculate total working days for the year.|Timetable skips these days when generating weekly schedules. Attendance calculations use this to determine the correct "total working days" denominator.',
  'Terms / Semesters': 'Divide your academic year into terms or semesters with specific start and end dates \u2014 for example, Term 1 (April-July), Term 2 (August-November), Term 3 (December-March). Exams, report cards, and fee billing can all be term-wise.|Term-wise exams are scheduled within these date ranges. Report cards can show term-wise results. Fee billing generates invoices per term if you chose the term-wise fee template.',
  'Academic Year History': 'View past academic years and whether students were promoted/rolled over. This is a reference log \u2014 useful for auditing and understanding historical data when migrating or looking at multi-year trends.|School Admin can reference previous years\' data. Data migration uses this as a reference for importing historical records.',
  'Demographics Configuration': 'Set the dropdown options for religion, caste category (General, OBC, SC, ST), and mother tongue that appear during student admission and profile editing. These should match your local government requirements (e.g., RTE quota categories).|These options appear on the student admission form. The School Admin uses them for RTE compliance reporting. Government reports and demographic analysis use this data.',

  // ── HR & Payroll ──
  'Departments': 'List your school\'s departments \u2014 Teaching, Administration, Accounts, IT, Housekeeping, Sports, etc. Every staff member is assigned to one department, which is used for HR reports, leave policies, and departmental budgeting.|HR Manager filters staff by department. Leave policies can differ by department. The Principal sees department-wise reports. Payroll can be processed department by department.',
  'Designations': 'List staff designations/titles used in your school \u2014 Principal, Vice Principal, Senior Teacher, Teacher, Lab Assistant, Accountant, Peon, etc. These appear on staff profiles, ID cards, and are used for salary structures.|HR Manager assigns designations to staff profiles. Certificates show the signatory\'s designation. The staff directory displays designations. Salary structures can vary by designation.',
  'Salary Structure': 'Define earning components (Basic Pay, HRA, Dearness Allowance, Special Allowance) and deductions (PF, Professional Tax, TDS, ESI) with their percentages of basic pay. This creates the payslip template for all staff.|Teachers and staff see their payslips broken down by these components. The Account Head processes salary using this structure. PF and TDS filings use the deduction percentages you set.',
  'Pay Cycle': 'Set how often salary is paid (monthly or bi-weekly) and on which date of the month it is processed. For example, "Monthly, processed on 28th" means salary is calculated and disbursed on the 28th of every month.|The HR Manager follows this schedule for payroll processing. Teachers know when to expect their salary. The Account Head schedules disbursement on this date.',
  'Staff Attendance Methods': 'Choose how staff check-in and check-out is recorded \u2014 biometric fingerprint, RFID card, manual register, mobile app GPS, or a combination. You can enable multiple methods simultaneously.|Teachers and staff use the method(s) you enable here. The HR Manager reconciles attendance from these devices. The Principal sees staff attendance overview. Security guards manage biometric/RFID devices at entry.',
  'Staff Onboarding Checklist': 'Create a checklist of steps every new hire must complete \u2014 submit documents (ID proof, qualification certificates), attend orientation training, receive laptop/ID card, complete background verification, sign appointment letter.|The HR Manager tracks each new hire\'s checklist progress. New staff see their pending tasks. The Principal can see onboarding status for recent hires.',
  'HR Letter Templates': 'Define the types of HR letters your school issues \u2014 offer letter, appointment letter, relieving letter, experience certificate, increment letter, warning letter. Templates are used when generating these letters for staff.|The HR Manager generates letters from these templates. Staff can access their letters (offer, appointment) through their dashboard. The Principal approves certain letter types.',
  'Performance Appraisal Stages': 'Set up the multi-stage appraisal process \u2014 for example: (1) Teacher fills self-assessment, (2) HOD reviews and scores, (3) Principal gives final rating, (4) Management review. Each stage has a time limit for completion.|Teachers fill in their self-appraisal during review season. HODs and Principals see their review queues. The HR Manager tracks completion across all staff.',

  // ── Transport ──
  'Transport Policy': 'Set your school\'s transport ground rules \u2014 do you operate your own fleet or use contracted vehicles? Is a lady attendant required on every bus? Is GPS tracking mandatory? Can transport fees be collected at the counter or only online?|The Transport Head follows these policies for daily operations. Parents see whether live GPS tracking is available. Security guards check vehicles against your fleet policy.',
  'Routes': 'Add bus routes with stop names, pickup/drop timings, assigned vehicle, and driver. Each route serves a geographic area. Students are mapped to routes based on their home address.|The Transport Head manages daily route operations. Parents see their child\'s route, stop, and timing. Students know their bus number and pickup time. Security guards verify vehicles by route.',
  'Vehicle Fleet': 'Register all school vehicles \u2014 bus number, type (bus/van/tempo), seating capacity, GPS device status, insurance expiry, and PUC validity. Keep this updated for compliance.|The Transport Head schedules maintenance based on vehicle data. Security guards verify vehicle registration at the gate. Compliance tracking alerts you before insurance or PUC expires.',
  'Driver Details': 'Enter driver information \u2014 name, phone number, license number, assigned route, and badge status. Parents need to know who is driving their child.|The Transport Head assigns drivers to routes. Parents can see the driver\'s name and contact for their child\'s bus. Security guards verify driver identity. License expiry is tracked for compliance.',
  'Tracking & Safety': 'Enable safety features \u2014 speed alerts (notify if bus exceeds speed limit), SOS panic button, real-time GPS tracking, geo-fencing (alert if bus deviates from route), girl child safety protocols, and first aid kit tracking on every vehicle.|Parents can track the bus live on a map. The Transport Head gets speed and route deviation alerts. The Principal sees a safety compliance dashboard.',
  'Transport Fee Model': 'Choose how transport fees are calculated \u2014 flat rate (same for everyone), distance-based (farther stops pay more), or stop-based (fixed price per stop). This determines each student\'s transport fee amount.|The Account Head collects transport fees based on this model. Parents see their transport fee calculated according to their child\'s stop distance. Fee reports separate transport revenue.',
  'Pickup Policies': 'Set rules for releasing students at dismissal \u2014 should parents verify via OTP sent to their phone? Must they be on a pre-authorized person list? Is photo ID matching required? These rules protect student safety at pickup time.|Security guards follow these steps before releasing any student. Parents receive OTPs or pre-register authorized persons through their portal. The Transport Head oversees the dismissal process.',
  'Student Commute Tagging': 'Tag how each student gets to and from school \u2014 school bus, walk-in, private vehicle, or auto-rickshaw. This helps with transport planning and managing the dismissal process.|The school admin uses this for transport planning and bus allocation. Security guards know which students are bus riders vs. walkers at dismissal. Transport fee applies only to bus-tagged students.',
  'Transport Manager Permissions': 'Control what the Transport Manager role can do \u2014 edit routes, manage drivers, schedule maintenance, view transport fees, assign students to routes, and run reports. Toggle each permission on or off.|The Transport Head sees only the features you enable here. The school admin can adjust these permissions if the transport manager\'s responsibilities change.',

  // ── Attendance ──
  'Marking Methods': 'Select which attendance marking methods your school uses \u2014 biometric scanner, RFID card tap, manual register entry, mobile app (teacher marks from phone), or QR code scan. You can enable more than one method.|Teachers see the marking interface matching your selected method. If you enable biometric, students scan their finger. If you enable mobile app, teachers mark attendance from their phone.',
  'Frequency & Timing': 'Choose how often attendance is taken \u2014 once a day (morning roll call), twice a day (morning + afternoon), or every period (period-wise tracking). Set the grace period for late arrivals and the half-day cutoff time.|Teachers follow this marking frequency. Period-wise tracking means every teacher marks attendance at the start of their class. Parents get notifications based on the timing you set.',
  'Auto-Notification Rules': 'Set up automatic alerts that fire when attendance events happen \u2014 instant SMS when a child is absent, email after 3 continuous absences, alert to Principal after 7 continuous absences. Each rule can be toggled independently.|Parents get real-time absence alerts on their phone. Teachers trigger these notifications just by marking attendance. The Principal gets escalation alerts for chronic absentees.',
  'Attendance Types': 'Define the statuses teachers can choose when marking attendance \u2014 Present, Absent, Late, Half-day, Excused Absence, Medical Leave, On Duty, etc. You can add custom types specific to your school.|Teachers see these status options in their marking dropdown. Parent notifications mention the specific status. Reports show breakdowns by attendance type.',

  // ── Exams & Grading ──
  'Grading System': 'Choose your fundamental grading method \u2014 Percentage (marks out of 100), Grade-Based (A, B, C letter grades), CGPA (cumulative grade point average), or Competency-Based (skill levels). This affects how all results are displayed school-wide.|Teachers enter marks/grades matching your chosen system. Students and parents see results in this format. Report cards display the grading method you select here.',
  'Grade Boundaries': 'Define what each grade means in terms of marks and grade points \u2014 for example, A1 = 91-100 marks = 10.0 grade points, A2 = 81-90 = 9.0, B1 = 71-80 = 8.0, and so on. The system automatically assigns grades based on marks entered by teachers.|Teachers just enter raw marks \u2014 grades are calculated automatically using your boundaries. Students see both marks and grades. Report cards show the complete grade table.',
  'Report Card Template': 'Choose the visual layout of your printed report card \u2014 where the school logo goes, how subjects are listed, whether to include co-curricular grades, attendance summary, teacher remarks, and principal signature. Preview before finalizing.|Students and parents see report cards in this exact format. Teachers know which fields they need to fill (remarks, co-curricular grades). The Principal approves the final template.',
  'Rank Display Options': 'Decide whether to show student rankings on report cards \u2014 class rank, section rank, and overall percentile. Some education boards discourage ranking. You can toggle each ranking type independently.|If enabled, students and parents see rank on report cards. If disabled, no ranking appears. Teachers may still see internal rankings for their reference even if hidden from report cards.',
  'Exam Schedule': 'Enter specific exam dates, times, and subjects \u2014 for example, "Unit Test 1: English on March 15, 9:00-10:30 AM." This drives the exam timetable for students and invigilation duties for teachers.|Students and parents see the exam timetable. Teachers get invigilation duty assignments based on this schedule. The Principal coordinates exam logistics using these dates.',
  'Exam Types': 'Define your exam categories and their weightage toward the final result \u2014 for example, Unit Test (20%), Mid-Term (30%), Final (50%). The total should add up to 100%. This determines how term-wise marks combine into cumulative results.|Teachers create exams under these categories. Students see results broken down by exam type. Report cards calculate cumulative scores using your weightages.',
  'Report Card Template Fields': 'Toggle which information appears on the printed report card \u2014 school logo, principal\'s signature, attendance summary, co-curricular grades, teacher remarks, health record, parent signature field. Turn off anything you don\'t need.|The printed report card includes only the fields you enable here. Teachers are asked to fill only the enabled fields (like remarks). Parents see exactly what you choose to show.',

  // ── Communication ──
  'DM Permission Matrix': 'Control who can send direct messages to whom. For example: parents can message their child\'s class teacher but not the Principal directly. Teachers can message parents but students cannot initiate DMs to teachers. Set these rules to maintain appropriate communication boundaries.|Every user\'s "New Message" button shows only the people they\'re allowed to contact based on this matrix. If you block Student\u2192Principal, students won\'t even see the Principal in their contact list.',
  'Parent Communication Mode': 'Set the level of communication access for parents \u2014 Full Chat (parents can message freely), Announcement-Only (parents can only view school announcements, no two-way messaging), or Emergency-Only (parents can only send urgent messages).|Parents see messaging capabilities matching your setting. Full Chat gives parents a complete chat experience. Announcement-Only makes the parent portal read-only for communications.',
  'Group Creation Permissions': 'Decide who can create group chats \u2014 Admin Only (tightest control), Admin + Teachers (teachers can create class groups), or All Roles (everyone can create groups). Prevents unnecessary group proliferation.|Teachers see the "Create Group" button only if you allow it. Admin-only means the school admin manually creates all groups. This controls group chat creation across all dashboards.',
  'Default Auto-created Groups': 'The system can automatically create groups when classes and staff are set up \u2014 one parent group per class (e.g., "Grade 5-A Parents"), a staff room group, and department groups. These save time and ensure standard groups exist.|Teachers find their class parent groups ready-made. Parents are automatically added to their child\'s class group. Staff see a common staff room group for school-wide communication.',
  'Chat Storage & Retention': 'Set how long chat messages and shared files are stored before the system archives or deletes them \u2014 for example, 1 year, 2 years, or unlimited. Longer retention means more storage usage but better history.|Users can scroll back through messages within your retention period. Old messages beyond the retention period are archived. This affects storage costs on your subscription plan.',
  'File Sharing': 'Control what file types users can share in chat \u2014 images, PDFs, Word documents, videos, audio files, spreadsheets. Block file types you don\'t want shared to prevent misuse and manage storage.|Users see upload restrictions matching your settings. Teachers can share worksheets and PDFs if enabled. Blocking videos saves storage. This applies to all chat conversations.',
  'Message Templates': 'Create pre-built message templates with variable placeholders like {student_name}, {class}, {due_date}, {amount}. Use them for fee reminders, absence notifications, event invitations, and more. Templates work across SMS, email, WhatsApp, and push notifications.|The system uses these templates for automated messages. Teachers can pick templates for quick communication. The school admin manages and updates template content.',

  // ── Timetable & Bell ──
  'Bell Schedule': 'Set the start and end time for every period in the school day \u2014 Period 1 (8:00-8:40), Period 2 (8:40-9:20), Recess (10:00-10:30), etc. This is the heartbeat of your school\'s daily schedule.|Teachers see their period timings based on this schedule. Students see when each class starts. The school bell system (if automated) follows these timings exactly.',
  'Saturday Schedule': 'Choose whether Saturday is a full working day, an off day, or an alternate Saturday (working on 1st and 3rd Saturdays, off on 2nd and 4th). This affects the weekly timetable pattern.|Teachers\' weekly schedule includes or excludes Saturday based on this. Attendance calculations factor in Saturday status. Parents see the correct school calendar.',
  'Zero Period': 'Enable an optional early-morning period before regular school hours \u2014 useful for remedial classes, special coaching for board exam students, or extra subjects like music/art. Not all students need to attend.|Teachers assigned to zero period see it on their schedule. Students in remedial or coaching programs have an earlier start time. Parents are informed of the adjusted timing.',
  'Assembly': 'Set the duration of morning assembly (e.g., 15 minutes or 20 minutes). The first academic period starts after assembly ends. This time is deducted from the available teaching time.|Teachers on assembly duty see this in their schedule. Students\' first period adjusts based on assembly duration. The timetable automatically accounts for assembly time.',
  'Teacher Substitution': 'When a teacher is absent, how should their periods be covered? Choose manual assignment (Vice Principal picks a substitute), auto-suggest (system recommends teachers with free periods who teach the same subject), or both.|The Vice Principal uses this to fill absent teacher slots every morning. Substitute teachers see the duty on their dashboard. Students see the updated schedule for the day.',
  'Period Swaps': 'Allow teachers to exchange periods with each other \u2014 for example, the English teacher and Math teacher swap their 2nd period with 5th period. Both teachers must agree. This provides flexibility without needing admin intervention.|Teachers see a "Request Swap" option on their timetable. The other teacher gets a notification to accept or decline. The Vice Principal can see all swaps for oversight.',
  'Rooms & Infrastructure': 'List all rooms, labs, and facilities in your school with their capacity and equipment (projector, smart board, etc.). The timetable uses this for room allocation \u2014 ensuring a physics lab period is scheduled in the actual physics lab.|Teachers see their assigned room for each period. The timetable generator ensures no two classes are assigned the same room at the same time. The school admin tracks facility usage.',

  // ── Leave Policy ──
  'Leave Types & Annual Allocation': 'Define leave categories and how many days each staff member gets per year \u2014 for example, 12 Casual Leaves, 10 Sick Leaves, 15 Earned Leaves. Set whether unused leaves carry forward to next year or can be encashed.|Teachers and staff see their leave balance per type. The HR Manager tracks consumption. At year-end, carry-forward rules determine what rolls over. Encashment affects payroll calculations.',
  'Leave Rules': 'Set special rules for leave calculation \u2014 does half-day count as 0.5 or 1 day? If someone takes Friday and Monday off, do Saturday-Sunday count as leave days (sandwich rule)? Is a medical certificate required after 3 consecutive sick days? Are leave rules different during the probation period?|The HR Manager applies these rules when processing leave. Teachers see their effective leave balance reflecting these rules. Payroll deductions follow the rules you set.',
  'Teaching Staff Approval Chain': 'Set the approval hierarchy for teacher leave requests \u2014 for example: HOD approves first, then Vice Principal, then Principal. Each level has a time limit (e.g., 2 days) before the request auto-escalates to the next level.|Teachers submit leave and see it move through this chain. Each approver sees requests in their queue. If an approver doesn\'t act in time, the request escalates automatically.',
  'Non-Teaching Staff Approval Chain': 'Set a separate approval hierarchy for non-teaching staff (admin, peon, security, etc.) \u2014 for example: Department Head approves, then HR Manager gives final approval. This is separate from the teaching staff chain.|Non-teaching staff submit leave through this chain. The admin supervisor and HR Manager see their approval queues. Different rules may apply for different staff categories.',

  // ── Visitor & Pickup ──
  'Pickup Verification Method': 'Choose how the school verifies identity during student pickup \u2014 OTP sent to parent\'s phone, photo matching from pre-uploaded photos, pre-authorized person list, or RFID card tap. Multiple methods can be combined for extra safety.|Security guards follow this verification process at the gate. Parents receive OTPs or pre-register authorized persons through the parent portal. This is a critical child safety feature.',
  'Visitor Type Rules': 'Set different rules for different types of visitors \u2014 parents may enter freely with phone OTP, vendors need prior appointment, government officials get immediate access, alumni can visit during designated hours. Each type can have different ID requirements and time limits.|Security guards see type-specific instructions when registering a visitor. The Receptionist follows different protocols per visitor type. The Principal can review visitor logs by type.',
  'Campus CCTV': 'Control whether parents can access live CCTV feeds of common areas (NOT classrooms \u2014 only playground, corridors, cafeteria). Set whether recording access is available and how long recordings are retained.|Parents see a "Live Campus View" option in their portal if enabled. This builds trust with parents while maintaining privacy. The school admin manages camera configurations.',

  // ── Certificates ──
  'Certificate Templates': 'Configure the certificate types your school issues \u2014 Transfer Certificate (TC), Bonafide Certificate, Character Certificate, Conduct Certificate, Migration Certificate. Each type has its own template layout, auto-numbering format, and issuing authority (who signs it).|The school office generates certificates from these templates. Students and parents request certificates through the portal. Auto-numbering ensures every certificate has a unique serial.',
  'Certificate Features': 'Enable security features on your certificates \u2014 digital signature (valid without physical signature), QR code (anyone can scan to verify authenticity), watermark, and anti-tampering measures. These make your certificates trustworthy and verifiable.|Parents and students receive certificates with these security features. External institutions can scan the QR code to verify a certificate is genuine. Digital signatures speed up the issuance process.',
  'Approval Workflow': 'Set the approval chain before a certificate is printed and issued \u2014 for example: Class Teacher verifies student details, Principal approves, Admin prints and dispatches. This ensures accuracy and proper authorization.|Class Teachers see certificate requests for their students. The Principal sees an approval queue. Office staff print only approved certificates. Parents see status updates at each stage.',

  // ── Library ──
  'Loan Rules': 'Set borrowing limits \u2014 how many books can a student borrow at once (e.g., 3), for how many days (e.g., 14 days), how many renewals are allowed, and what is the overdue fine per day.|Students see their borrowing limit when they search for books. Parents get overdue notifications. The library staff enforces these rules at the counter. Fines appear on the student\'s account.',
  'Library Features': 'Enable advanced library features \u2014 digital library (e-books and online resources), barcode scanning (quick check-in/check-out), and reading analytics (track how much each student reads).|Students access the digital library through the student portal if enabled. Library staff scan barcodes for faster processing. The Principal can see reading habit reports.',
  'Book Categories': 'Define how your library catalogue is organized \u2014 Fiction, Non-fiction, Reference, Textbook, Magazine, Science, History, etc. Books are tagged with these categories for easy search and browsing.|Students search and filter books by these categories. Library staff catalogue new books using this list. The school admin sees category-wise collection reports.',

  // ── Canteen ──
  'Canteen Features': 'Enable canteen capabilities \u2014 pre-ordering (students order before break time), digital wallet (cashless payments from a prepaid balance), allergy tracking (flag allergens in each menu item), and dietary safety alerts.|Students use pre-ordering to skip the queue. Parents top up their child\'s wallet and set allergy restrictions. Canteen staff see orders with allergy warnings highlighted.',
  'Meal Types': 'Select which meals your canteen serves \u2014 Breakfast, Morning Snacks, Lunch, Evening Snacks. This determines your menu structure and ordering windows.|Students see ordering options for each enabled meal type. Canteen staff prepare meals based on this schedule. The menu changes per meal type.',
  'Preschool Meal Plan': 'Special meal configuration for nursery and KG children \u2014 smaller portions, allergen-free options by default, and meal tracking so parents know what their toddler ate. This is separate from the main canteen menu.|Parents of preschoolers see daily meal reports. Teachers on preschool duty supervise meals using these settings. The nutritionist plans age-appropriate menus.',

  // ── Hostel ──
  'Hostel Features': 'Configure boarding facilities \u2014 room allocation system, mess management (meal schedules), hostel visitor log, warden assignment per floor/wing, curfew timings, and emergency contact list.|The Hostel Warden uses these settings to manage daily operations. Boarding students see their room, mess schedule, and curfew times. Parents can view hostel details through the parent portal.',
  'Room Types': 'Define accommodation categories \u2014 single room, double sharing, triple sharing, dormitory. Set capacity and monthly charges for each type. This determines room allocation and hostel fee calculation.|The Warden allocates rooms based on available types. Hostel fee is calculated from the room type charge. Students see their room type and roommate details.',

  // ── Inventory ──
  'Inventory Features': 'Enable asset tracking capabilities \u2014 asset tagging (label every item with a unique code), stock alerts (get notified when supplies run low), depreciation tracking (calculate asset value over time), and barcode scanning for quick inventory audits.|The school admin tracks all physical assets. Department heads see their allocated assets. The Account Head tracks depreciation for financial records.',
  'Asset Categories': 'Organize your inventory by categories \u2014 Furniture, IT Equipment (computers, projectors), Lab Apparatus, Sports Equipment, Stationery, Vehicles. Each category can have different depreciation rates and maintenance schedules.|The school admin runs category-wise reports. Purchase requests are categorized for easier approval. Budget allocation can be tracked per category.',
  'Purchase Approval Tiers': 'Set who approves purchases based on amount \u2014 for example, items under \u20B95,000 approved by HOD, \u20B95,000-50,000 by Principal, above \u20B950,000 by Trust. This controls procurement workflow and prevents unauthorized spending.|Purchase requests route through the correct approver based on amount. The Account Head processes only approved purchases. The Principal and Trust see their approval queues.',

  // ── Compliance ──
  'Framework & Schedule': 'Select your school\'s assessment framework \u2014 SQAAF (School Quality Assessment and Accreditation Framework), NAAC, or CBSE affiliation norms. Set how often audits happen (annually, bi-annually). The system prepares compliance checklists based on your framework.|The Principal uses this to prepare for upcoming audits. The school admin tracks which compliance items are complete. Trustees see audit readiness scores.',
  'Compliance Domains': 'These are the specific areas assessed during audits \u2014 Academic Quality, Infrastructure, Safety & Security, Governance, Teacher Quality, Student Outcomes, etc. Each domain gets a score during assessment.|The Principal prepares evidence for each domain before an audit. The school admin uploads supporting documents per domain. Inspectors evaluate domain-by-domain during visits.',
  'Required Documents': 'List documents required for student admission (birth certificate, Aadhar card, previous school TC, photos) and staff joining (qualification certificates, ID proof, experience letters). The system creates upload checklists from this list.|Parents see this checklist during admission and upload documents accordingly. HR uses the staff checklist during onboarding. The school admin verifies document completeness.',

  // ── Homework ──
  'Submission Settings': 'Set homework submission rules \u2014 can students submit online (upload files), offline (submit in class), or both? What is the maximum file size for uploads? Is there a grace period after the deadline? What penalty applies for late submissions?|Teachers create assignments following these rules. Students see submission options and deadlines. Parents get notifications about pending and overdue homework.',
  'Assignment Features': 'Enable advanced homework features \u2014 plagiarism detection (check if students copied), auto-grading for multiple-choice assignments, peer review (students evaluate each other), and parent notifications for every assignment.|Teachers get plagiarism reports alongside submissions. Students receive auto-graded results instantly for MCQ assignments. Parents are notified when homework is assigned and when results are shared.',

  // ── Enquiry & Admission ──
  'Admission Settings': 'Configure the admission process \u2014 what fields appear on the application form, which documents are required, whether fees are collected at admission, and how seats are managed per grade.|The Receptionist and School Admin follow this workflow. Parents fill out the application form you design here. Seat availability is tracked automatically based on your grade-wise capacity.',
  'Lead Sources': 'Define where enquiries come from \u2014 Walk-in, School Website, Parent Referral, Newspaper Advertisement, Social Media, Education Fair, etc. Tagging sources helps you understand which marketing channels bring the most admissions.|The Receptionist tags every enquiry with its source. The School Admin runs source-wise conversion reports. The Principal sees which channels are most effective.',
  'Enquiry Sources': 'Detailed tracking of how enquiries are categorized and prioritized for follow-up. Higher-priority sources (like personal referrals) can be set to trigger faster follow-ups than lower-priority ones (like walk-ins).|The Receptionist categorizes enquiries by source. Follow-up reminders fire based on the priority you assign to each source. The school admin reviews source performance regularly.',

  // ── Online Payment ──
  'Gateway & Policy': 'Select your payment gateway provider \u2014 Razorpay, PayU, or CCAvenue \u2014 and set your refund policy (how many days for refund processing, auto-refund for duplicate payments). This is the infrastructure parents use to pay online.|Parents use this gateway when they click "Pay Now" in the fee portal. The Account Head reconciles gateway transactions. Refund requests follow your policy settings.',
  'Payment Features': 'Configure payment behavior \u2014 should receipts be generated automatically after payment? Can parents make partial payments (pay some now, rest later)? Is there a convenience fee for online payments? How is reconciliation handled?|Parents see partial payment options if enabled. Auto-receipts mean instant proof of payment. The Account Head\'s reconciliation process depends on these settings.',

  // ── Critical Locks ──
  'Lockable Fields': 'These are high-impact fields that require OTP verification before changes can be made \u2014 fee structure (prevents accidental fee changes), salary components (prevents payroll errors), and bank details (prevents fraud). Only the registered Trustee\'s phone receives the OTP.|The SSA must request an OTP from the Trustee before editing these fields. This prevents unauthorized changes. The audit log records every locked-field change with before/after values.',
  'Recent Lock Events': 'A tamper-proof history of every OTP-verified change \u2014 who requested the change, what field was changed, when, and the before/after values. Use this to audit sensitive changes.|The SSA can review past changes. Trustees can monitor what has been modified. External auditors can verify the integrity of sensitive data changes.',
  'Authentication Contact': 'The phone number or email that receives OTP codes when someone tries to change a locked field. This should be the Trustee or a senior management representative \u2014 not the SSA themselves.|The Trustee receives OTP requests on this contact. If this number changes, it requires a separate verification process to prevent unauthorized reassignment.',

  // ── Parent Portal ──
  'Portal Features': 'Toggle which features parents can access \u2014 fee payment, attendance tracking, homework viewer, exam results, communication, transport tracking, canteen ordering, certificate requests. Turning off a feature completely hides it from the parent\'s screen.|Parents see only the modules you enable. If you disable "Transport Tracking," parents won\'t see any bus-related features. Teachers\' interaction scope with parents also depends on what is enabled.',
  'Report Card Access': 'Control when parents can see report cards \u2014 immediately after the teacher publishes results, after a set delay (e.g., 3 days for review), or only after the Principal manually approves release. This prevents premature result leaks.|Parents see "Results Available" based on your timing. Teachers have a deadline to enter results before publish. The Principal has control over the release if approval mode is enabled.',
  'Communication Mode': 'Set the messaging level for parents \u2014 Full Chat (parents can message teachers and staff freely), Announcement-Only (parents can only read school announcements, no two-way messaging), or Emergency-Only (parents can only send urgent messages).|Parents\' messaging capabilities match this setting exactly. Full Chat gives a WhatsApp-like experience. Announcement-Only makes the communication tab read-only for parents.',

  // ── Student Portal ──
  'Module-Level Feature Toggles': 'Enable or disable entire modules for the student portal \u2014 attendance history, library catalogue, homework submissions, exam results, timetable view, and more. Keep the student experience focused by disabling modules they don\'t need.|Students see only the modules you turn on. Disabling "Library" hides the entire library section. This helps keep the student portal clean and focused.',

  // ── Alumni ──
  'Alumni Portal Features': 'Configure alumni engagement tools \u2014 networking directory (alumni can find and connect with each other), donation portal (accept contributions for school development), mentorship program (alumni mentor current students), job board (alumni post job opportunities), event registration (reunions, annual days).|Alumni access these features when they log in. The school admin manages alumni records and events. Trustees can track donation amounts and alumni engagement levels.',

  // ── Analytics ──
  'Core Analytics': 'Enable analytics capabilities \u2014 predictive analytics (identify students at risk of dropout or failure), trend analysis (multi-year comparison), benchmarking (compare with other schools on the platform), and custom dashboards. Some features may require a higher subscription tier.|The Principal and Trustee see these analytics on their dashboards. Data-driven insights help with decision-making. The school admin configures which widgets appear.',
  'Dashboard Widgets': 'Choose which analytics widgets show on admin dashboards \u2014 enrollment trends (are admissions going up or down?), fee collection rate, attendance patterns, exam performance distribution, staff attendance, and more.|Principals see their customized dashboard with selected widgets. Trustees see high-level KPI widgets. The school admin can configure different widget sets for different roles.',
  'Data Retention': 'Set how many years of historical data is kept for analytics \u2014 1 year, 3 years, 5 years, or unlimited. Longer retention enables deeper trend analysis but uses more storage (which may affect your subscription tier).|Longer retention means you can compare this year\'s performance with 5 years ago. Compliance requirements may dictate minimum retention periods. Storage usage is tracked in your subscription.',

  // ── Report Engine ──
  'Email Reports': 'Schedule automatic email delivery of reports \u2014 for example, send the daily attendance summary to the Principal at 10 AM, weekly fee collection report to the Account Head every Monday, monthly staff report to HR on the 1st.|Recipients get reports in their inbox automatically without requesting them. The school admin manages schedules and recipient lists.',
  'Export Formats': 'Choose which file formats are available for report downloads \u2014 PDF (best for printing and sharing), Excel (best for further analysis and accounting), CSV (best for data import/export), Word (best for editing and customizing).|All admin users see download buttons for your enabled formats. The Account Head typically needs Excel for accounting software. The Principal prefers PDF for sharing.',
  'Report Recipients': 'Configure who receives each scheduled report \u2014 select from your staff directory. Different reports go to different people. For example, fee reports go to Account Head and Principal, while HR reports go to HR Manager only.|Selected recipients get reports automatically. The school admin manages these lists. New staff can be added to relevant report distributions.',
  'Auto-Generate Reports': 'Enable automatic report creation on a schedule \u2014 the system generates reports without anyone clicking a button. Set which reports are generated (attendance, fees, HR, compliance) and how often (daily, weekly, monthly).|Reports appear in each recipient\'s dashboard automatically. No manual effort required. The school admin sets the schedule and the system handles the rest.',

  // ── API & Integrations ──
  'Integration Master Switch': 'A global on/off switch for all external integrations. When turned off, no third-party service can connect to your school ERP. Use this as an emergency kill-switch if you suspect a security issue with any integration.|Turning this off immediately disconnects all integrations \u2014 Tally sync stops, SMS delivery pauses, biometric devices disconnect. Only use this in emergencies.',
  'Available Integrations': 'See and manage all third-party services you can connect \u2014 Tally (accounting software sync), Razorpay/PayU (payment gateway), SMS providers (Twilio, MSG91), CCTV systems, biometric devices, and GPS tracking hardware.|The Account Head benefits from Tally integration for automatic accounting entries. The communication module sends SMS through your connected provider. Attendance syncs from biometric devices.',
  'API Rate Limit': 'Set the maximum number of API requests per minute \u2014 prevents any single integration from overloading your system. Higher limits are available on premium plans. Default of 60 requests/minute is sufficient for most schools.|This protects your system from being overwhelmed. If you have many integrations running simultaneously, you may need a higher limit. This is a technical safety setting.',

  // ── Branding ──
  'Custom Domain': 'Use your own web address (e.g., portal.delhipublicschool.edu.in) instead of the default Saaras URL. Parents and staff access the ERP through your school\'s branded URL. Requires DNS configuration (your IT team or Saaras support can help).|Parents type your school\'s URL to access the portal. It looks professional and builds trust. All email links also use your custom domain.',
  'White-label & Templates': 'Remove Saaras branding and use your school\'s identity throughout \u2014 custom email templates (with your logo in the header), SMS templates (school name as sender), and interface branding (your colors on the login page and dashboards).|Every notification email and SMS carries your school\'s branding. The login page shows your school\'s visual identity. Users don\'t see Saaras branding at all.',
  'Visual Identity': 'Upload your school logo and set your primary brand color (e.g., navy blue for Delhi Public School, maroon for Ryan International). These appear on login pages, dashboards, certificates, reports, and all portals.|Every user sees your logo in the header when they log in. Certificates carry your logo. Reports use your brand color for headings and accents.',

  // ── School Identity ──
  'Basic Information': 'Enter your school\'s official name, complete address, phone number, email, principal\'s name, and year of establishment. This information appears on certificates, report cards, letterheads, and official communications.|Every certificate shows this as the school header. Fee receipts carry your school name and address. The parent portal displays your school\'s contact information.',
  'Academic Configuration': 'Set your board affiliation (CBSE, ICSE, State Board, IB), medium of instruction (English, Hindi, regional), and academic pattern (10+2, K-12). These are foundational academic identity details.|The exam module follows board-specific grading norms. Student profiles show the board. Certificates mention affiliation number. Transfer certificates include board details.',
  'Working Days': 'Set your weekly working pattern \u2014 which days is the school open? Most schools work Monday to Saturday or Monday to Friday. This is used for attendance percentage calculation and timetable generation.|Attendance calculates "present out of working days" using this pattern. The timetable generates schedules only for working days. Parents see the correct school calendar.',
  'Shift Configuration': 'If your school runs multiple shifts (Morning Shift: 7 AM - 12 PM, Afternoon Shift: 12:30 PM - 5:30 PM), configure them here with class assignments per shift. This is for schools that share infrastructure across two batches of students.|Teachers are assigned to shifts. Students see their shift timing. The timetable creates separate schedules per shift. Transport runs different routes per shift.',
  'Daycare & Extended Hours': 'If your school offers before-school or after-school care for children of working parents, configure the timings, capacity, and additional charges here.|Parents see daycare booking options. The Account Head collects daycare fees separately. Teachers on extended-hour duty see their assignments.',
  'System Configuration': 'Platform-level settings \u2014 notification channels (enable push, SMS, email, WhatsApp), default timezone, date format (DD/MM/YYYY or MM/DD/YYYY), session timeout (auto-logout after inactivity), and API access permissions.|All notifications follow your channel settings. Every user sees dates in your chosen format. Inactive sessions auto-logout for security.',

  // ── Onboarding Wizard ──
  'School Basic Info': 'First step of setup \u2014 enter your school name, type (day school, boarding, day-boarding), address, and primary contact. This is the foundation everything else builds on.|This information is used across all modules \u2014 on certificates, reports, communication, and every portal.',
  'Organisation Setup': 'Define your trust or management structure \u2014 single school, group of sister-concern schools under one trust, chain of schools with the same brand, or franchise model. This determines how schools share data and roles.|If you run multiple schools, this enables shared Trustee views across schools. Shared roles (like a common Account Head) are configured based on your org structure.',
  'Module Selection': 'Choose which ERP modules to activate based on your subscription plan. Unused modules are hidden from all dashboards to keep the interface clean. You can always enable more later.|Only selected modules appear in the sidebar navigation. Users see a focused interface without clutter. Your subscription determines which modules are available to select.',
  'Admin Account Creation': 'Create the first School Admin user who will handle day-to-day configuration and operations. This account gets full access to all school-level settings.|The School Admin you create here is the primary operator \u2014 they manage users, run reports, handle admissions, and configure modules. This is the most important account after SSA.',
  'Review & Launch': 'Final review of all your setup choices before the school goes live on the platform. Check school info, selected modules, and admin account. Once launched, all dashboards become accessible.|This is the point of no return \u2014 after launch, staff can start logging in and using the system. All modules you selected become active.',

  // ── Subscription ──
  'Current Plan': 'View your active subscription \u2014 plan name (Starter, Professional, Enterprise), billing period (monthly/yearly), renewal date, student limit, and included features. Know exactly what you are paying for and when it renews.|All module features are limited by your plan. If a feature is grayed out, it may require a plan upgrade. The school admin should review this periodically.',
  'Plan Comparison': 'See all available plans side by side \u2014 what each plan includes, how many students and staff it supports, storage limits, and pricing. Helps you decide whether to upgrade.|The school admin and Trustee review this when considering an upgrade. Features differ significantly between plans. Annual billing is usually cheaper than monthly.',
  'Usage Stats': 'Monitor your consumption against plan limits \u2014 active students, active staff, storage used, SMS sent this month, API calls made. Green means within limits, yellow means approaching, red means exceeded.|The school admin should check this monthly. Exceeding limits may degrade service or trigger upgrade prompts. Storage and SMS are the most common limits reached.',
  'Billing History': 'View past invoices and payment records \u2014 date, amount, plan, and payment status. Download invoices for accounting records.|The Account Head downloads invoices for record-keeping. Trustees can review subscription spending. Tax filing may require these invoices.',

  // ── Roles & Permissions ──
  'Permission Matrix': 'The core access control grid \u2014 for each role, toggle View (V), Create (C), Edit (E), Delete (D) permissions per module. For example, a Teacher might have V+C for Homework but only V for Fee Reports. This controls every action across the ERP.|If a user cannot see a button or access a page, check their role\'s permissions here. Every screen in the system checks this matrix before showing content.',
  'Custom Roles': 'Create roles specific to your school beyond the 15 built-in roles. For example, "Exam Coordinator" or "Sports Incharge" with specific permissions tailored to their duties.|Custom roles appear in the role assignment dropdown. The school admin creates these for special positions that don\'t fit standard roles.',
  'Role Hierarchy': 'Set parent-child relationships between roles \u2014 a child role automatically inherits all permissions of its parent plus any additional ones you add. For example, "Senior Teacher" inherits from "Teacher" but also gets exam creation access.|Inheritance simplifies permission management. When you update a parent role, all child roles automatically get those changes too.',
  'Clone Role': 'Duplicate an existing role as a starting point for a new one. For example, clone "Teacher" to create "Lab Instructor" and then add lab-specific permissions. Saves time compared to building from scratch.|The school admin uses this for quick role creation. The cloned role starts with identical permissions, which you can then customize.',
  'Assign Roles to Users': 'View all staff members and their current roles. Search, filter by role or department, and reassign roles as needed. This is where you connect people to their permissions.|The school admin manages all role assignments here. When a teacher takes on exam coordinator duties, reassign their role here. The change takes effect immediately.',
  'Bulk Operations': 'Assign a role to many users at once \u2014 for example, assign "Exam Invigilator" to 20 teachers before exam week, then remove it after exams. Much faster than editing one user at a time.|The school admin uses this before events or exam seasons. The exam coordinator can bulk-assign invigilation duties. Roles can be bulk-removed after the event.',
  'User Permission Override': 'Give or restrict specific permissions for individual users without changing their base role. For example, one teacher might need delete access to the homework module even though teachers normally cannot delete. This creates an exception for just that person.|The school admin creates overrides for special cases. The audit log tracks all overrides. Overrides appear highlighted on the user\'s permission view.',
  'Data Scope Configuration': 'Define what data each role can see \u2014 a class teacher sees only their class, a department HOD sees their entire department, a branch principal sees their branch, and the school admin sees everything. This controls data visibility boundaries.|Teachers cannot access data from other classes. HODs see aggregate department data. The Principal sees all-school data. This prevents unauthorized data access.',
  'Field-Level Access': 'Control visibility of sensitive fields per role \u2014 hide salary details from teachers, mask Aadhar numbers from non-HR staff, hide parent phone numbers from students. Sensitive fields can be fully hidden or partially masked (e.g., ****1234).|Teachers don\'t see salary columns in any reports. Only HR sees full Aadhar numbers. Privacy is maintained automatically based on your field-level settings.',
  'Default Dashboard Widgets': 'Pre-configure which widgets appear when each role logs in \u2014 teachers see attendance summary and upcoming classes, accountants see fee collection and pending receipts, principals see school-wide KPIs.|New users of each role see a relevant dashboard from day one. The school admin customizes this to match each role\'s daily needs.',
  'Permission Change Log': 'A complete audit trail of every role and permission change \u2014 who changed what, when, the before and after values. Tamper-proof and used for compliance audits.|The school admin reviews this to track recent changes. External auditors verify access control compliance using this log. Any unauthorized changes are immediately visible.',
  'Temporary Roles': 'Grant time-bound role elevations that automatically revert after expiry. For example, give a teacher "Exam Coordinator" access for 2 weeks during exams, and it auto-reverts to normal "Teacher" after the exam period.|The school admin sets the expiry date when granting temp roles. The system automatically reverts permissions \u2014 no manual cleanup needed. The audit log records the temporary grant.',
  'Compare Roles': 'View two roles side by side and see exactly where their permissions differ \u2014 highlighted in green (has permission) and red (does not). Useful for troubleshooting access issues or auditing role configurations.|The school admin uses this when a user reports they cannot access something \u2014 compare their role with one that can. Also useful during role audits.',

  // ── Backup & Export ──
  'Last Backup': 'Shows the most recent successful backup \u2014 date, time, file size, and status (success/failed). A quick health check to ensure your data is being backed up properly.|The school admin should check this regularly. If the last backup is old or failed, investigate immediately.',
  'Backup Schedule': 'Set automatic backup frequency \u2014 daily (recommended), weekly, or custom. Automated backups run without manual effort and ensure your data is always recoverable.|Daily backups mean you never lose more than 24 hours of data. The system handles this in the background. No action needed from the school admin after setup.',
  'Export Data': 'Download your school data in CSV, Excel, or JSON format \u2014 useful for board submissions, auditor requests, or migrating data to another system. Select which modules\' data to export.|The Account Head exports financial data for chartered accountants. The school admin exports student data for government submissions. HR exports staff data for compliance.',
  'Restore from Backup': 'Upload a backup file to restore your data to a previous state. This is the disaster recovery option \u2014 use it only if data has been accidentally deleted or corrupted. Requires verification before restore begins.|This is a critical safety net. The school admin uses this only in emergencies. Verification prevents accidental restores that could overwrite current data.',
  'Backup History': 'View a log of all past backups \u2014 date, size, type (automatic or manual), and status. Track backup consistency and spot failures early.|The school admin reviews this periodically to ensure backups are running consistently. Failed backups are flagged for investigation.',
};

const FIELD_INFO: Record<string, string> = {
  // Fee Heads
  'Tuition Fee': 'The core monthly or annual teaching fee charged to every student. This is usually the largest fee component and covers classroom instruction costs.',
  'Admission Fee': 'One-time fee charged when a student joins the school for the first time. Not charged again in subsequent years unless re-admission occurs.',
  'Annual Charges': 'Yearly charges covering general school maintenance, infrastructure upkeep, and administrative costs. Billed once per academic year.',
  'Transport Fee': 'Monthly fee for students using school bus service. The amount may vary based on the route or stop distance if you chose distance-based transport pricing.',
  'Activity Fee': 'Covers extra-curricular activities \u2014 sports equipment, art supplies, club activities, and field trips. Usually charged quarterly or yearly.',
  'Lab Fee': 'For students who use science labs, computer labs, or other specialized facilities. Typically applicable from middle school onwards when lab work begins.',
  'Library Fee': 'Covers library access, new book purchases, and digital resources. Some schools include this in annual charges instead of charging separately.',
  'Exam Fee': 'Charged per exam cycle (term-wise or yearly) to cover question paper printing, answer sheet costs, invigilation, and result processing.',
  'Development Fund': 'One-time or annual contribution towards school expansion, new building construction, playground development, or infrastructure upgrades.',
  'Smart Class / IT Fee': 'For schools with digital classrooms, smart boards, or IT-enabled learning. Covers technology maintenance, software licenses, and internet costs.',
  'Uniform / Books': 'Enable this if your school collects uniform and textbook charges as part of the fee structure rather than having parents buy them separately.',
  'Hostel Fee': 'For boarding students \u2014 covers room, mess (meals), laundry, and other hostel services. Only relevant if your school has a hostel wing.',
  // Block rules
  'Block report card if fees overdue > 60 days': 'If enabled, the system will automatically prevent report card generation and download for students whose fees are overdue by more than 60 days. Parents will see a message asking them to clear dues before accessing results.',
  'Block TC generation if outstanding > 0': 'Transfer Certificate cannot be generated if the student has any unpaid fees. This ensures complete fee clearance before a student leaves the school.',
  'Block exam hall ticket if current term unpaid': 'Students with unpaid current-term fees will not receive exam hall tickets. Use with caution \u2014 this is a strong enforcement measure that directly affects students.',
  'Send auto-reminder before blocking': 'When enabled, the system sends a warning SMS and notification to parents a few days before any blocking action takes effect, giving them time to pay and avoid disruption.',
  // Concessions
  'Sibling Discount': 'Enable this if your school gives a fee discount when a parent has more than one child enrolled. The percentage you set will be automatically deducted from the second child onwards. Use the "Applies To" dropdown to choose which fee components get discounted — e.g., Tuition Only means only tuition is discounted, while All Components means every fee head gets the discount.',
  'Merit Scholarship': 'For students who score above a threshold in exams. Set the percentage discount and maximum amount. Requires principal approval before it reflects in fees.',
  'Staff Child': 'Full or partial fee waiver for children of school staff members. Enable this for automatic concession \u2014 the system detects staff-parent relationships.',
  'Economic Weaker (EWS)': 'For students admitted under the economically weaker section quota (RTE Act). Set the concession percentage as per government norms applicable to your state.',
  'Sports Quota': 'Discount for students selected under sports quota admission. Set percentage and cap amount. Typically requires documentation of sports achievements.',
  'SC/ST Scholarship': 'Fixed amount scholarship for SC/ST category students as per government scheme. This is usually a fixed rupee amount, not a percentage.',
  'Single Parent': 'Fee concession for students from single-parent families. Requires approval from the principal before applying to the student\'s account.',
  // Late Fee
  'Enable Late Fee': 'Turn on penalty charges for parents who pay after the due date. You can set the amount per day or per week, a grace period before penalties start, and a maximum cap so penalties stay reasonable.',
  // Payment modes
  'UPI': 'Allow parents to pay via UPI apps like Google Pay, PhonePe, or Paytm. This is the fastest online payment method with near-zero processing fees for the school.',
  'Net Banking': 'Allow direct bank transfers through internet banking. Takes 1-2 business days for reconciliation but is reliable for large payments.',
  'Credit Card': 'Accept Visa/Mastercard credit card payments. Higher processing fees (1-2%) but convenient for parents who want to use credit or EMI options.',
  'Debit Card': 'Accept bank debit/ATM card payments. Lower processing fees than credit cards and familiar to most parents.',
  'Cash': 'Accept cash payments at the school fee counter. Requires manual entry by the accountant or receptionist. Generates a paper receipt.',
  'Cheque': 'Accept bank cheques. Requires manual reconciliation after cheque clearance (2-3 working days). Risk of cheque bounce.',
  'DD/NEFT': 'Accept demand drafts or bank wire transfers (NEFT/RTGS/IMPS). Used for large payments or when parents bank from a different city.',
};

// ─── MODULE SIDEBAR ────────────────────────────────
const modules = [
  { id: 'onboarding-wizard', label: 'Onboarding Wizard', icon: School },
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'subscription-mgmt', label: 'Subscriptions', icon: CreditCard },
  { id: 'fee-config', label: 'Fee Configuration', icon: Banknote },
  { id: 'academic-config', label: 'Academic Config', icon: GraduationCap },
  { id: 'hr-config', label: 'HR & Payroll', icon: Briefcase },
  { id: 'transport-config', label: 'Transport', icon: Bus },
  { id: 'attendance-config', label: 'Attendance', icon: ClipboardCheck },
  { id: 'exam-config', label: 'Exams & Grading', icon: FileText },
  { id: 'communication-config', label: 'Communication', icon: MessageSquare },
  { id: 'timetable-config', label: 'Timetable & Bell', icon: Calendar },
  { id: 'leave-config', label: 'Leave Policy', icon: Clock },
  { id: 'visitor-config', label: 'Visitor Rules', icon: Shield },
  { id: 'certificate-config', label: 'Certificates', icon: Award },
  { id: 'library-config', label: 'Library', icon: BookOpen },
  { id: 'canteen-config', label: 'Canteen / Meal', icon: UtensilsCrossed },
  { id: 'hostel-config', label: 'Hostel', icon: Building },
  { id: 'inventory-config', label: 'Inventory & Assets', icon: Package },
  { id: 'compliance-config', label: 'Compliance & Quality', icon: ShieldCheck },
  { id: 'role-management', label: 'Roles & Permissions', icon: Key },
  { id: 'homework-config', label: 'Homework & Assignment', icon: Notebook },
  { id: 'enquiry-config', label: 'Enquiry & Admission', icon: UserPlus },
  { id: 'payment-config', label: 'Online Payment', icon: CreditCard },
  { id: 'data-migration', label: 'Data Migration', icon: Upload },
  { id: 'critical-locks', label: 'Critical Locks', icon: Lock },
  { id: 'audit-log', label: 'Audit Log', icon: ShieldCheck },
  { id: 'backup-export', label: 'Backup & Export', icon: Download },
  { id: 'parent-portal-config', label: 'Parent Portal', icon: UserCircle },
  { id: 'student-portal-config', label: 'Student Portal', icon: Users },
  { id: 'alumni-config', label: 'Alumni', icon: Globe },
  { id: 'analytics-config', label: 'Analytics & BI', icon: BarChart3 },
  { id: 'report-engine-config', label: 'Report Engine', icon: FileBarChart },
  { id: 'api-integration-config', label: 'API & Integrations', icon: Plug },
  { id: 'branding-config', label: 'Branding & White-label', icon: Palette },
  { id: 'school-identity-config', label: 'School Identity', icon: School },
  { id: 'support', label: 'Support', icon: Headphones },
];

// ─── HELPER COMPONENTS ─────────────────────────────
function SSAToggle({ on, onChange, theme, label }: { on: boolean; onChange: () => void; theme: Theme; label?: string }) {
  const fieldInfo = label ? FIELD_INFO[label] : undefined;
  return (
    <div className="flex items-center gap-1">
      <button onClick={onChange} className={`w-9 h-5 rounded-full relative transition-colors ${on ? theme.primary : 'bg-gray-300'}`}>
        <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${on ? 'translate-x-4' : 'translate-x-0.5'}`} />
      </button>
      {fieldInfo && <InfoTooltip text={fieldInfo} theme={theme} />}
    </div>
  );
}

function SectionCard({ title, subtitle, children, theme }: { title: string; subtitle?: string; children: React.ReactNode; theme: Theme }) {
  const infoText = SECTION_INFO[title];
  return (
    <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
      <div className="flex items-center">
        <h3 className={`text-sm font-bold ${theme.highlight} mb-1`}>{title}</h3>
        {infoText && <InfoTooltip text={infoText} theme={theme} />}
      </div>
      {subtitle && <p className={`text-[10px] ${theme.iconColor} mb-3`}>{subtitle}</p>}
      {!subtitle && <div className="mb-3" />}
      {children}
    </div>
  );
}

// ─── MODULE HEADER (Save Changes bar) ──────────────
function ModuleHeader({ title, subtitle, theme, onSave }: { title: string; subtitle?: string; theme: Theme; onSave?: () => void }) {
  const [saved, setSaved] = useState(false);
  const moduleInfoText = MODULE_INFO[title];
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <div className="flex items-center">
          <h1 className={`text-xl font-bold ${theme.highlight}`}>{title}</h1>
          {moduleInfoText && <InfoTooltip text={moduleInfoText} theme={theme} />}
        </div>
        {subtitle && <p className={`text-xs ${theme.iconColor} mt-0.5`}>{subtitle}</p>}
        <p className={`text-[10px] ${theme.iconColor} flex items-center gap-1 mt-0.5`}>
          <Edit size={10} /> Click any field to configure
        </p>
      </div>
      <div className="flex items-center gap-2">
        {saved && <span className="text-green-500 text-xs font-medium animate-pulse">Saved!</span>}
        <button
          onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); if (onSave) onSave(); }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white ${theme.primary} hover:opacity-90 transition-all`}>
          <Save size={14} /> Save Changes
        </button>
      </div>
    </div>
  );
}

function InputField({ placeholder, value, onChange, theme, type, disabled }: {
  placeholder?: string; value: string; onChange: (v: string) => void; theme: Theme; type?: string; disabled?: boolean;
}) {
  return (
    <input
      type={type || 'text'}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      disabled={disabled}
      className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none focus:ring-2 focus:ring-slate-300 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    />
  );
}

function SelectField({ options, value, onChange, theme, placeholder }: {
  options: string[]; value: string; onChange: (v: string) => void; theme: Theme; placeholder?: string;
}) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none focus:ring-2 focus:ring-slate-300`}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────
function SchoolSuperAdminDashboard({ theme }: { theme?: Theme }) {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  if (!theme) return null;

  return (
    <div className="flex gap-4 -m-6">
      <div className={`${sidebarCollapsed ? 'w-14' : 'w-48'} ${theme.cardBg} border-r ${theme.border} min-h-screen p-2 space-y-0.5 shrink-0 transition-all duration-200`}>
        <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} px-2 py-2`}>
          {!sidebarCollapsed && <p className={`text-[10px] font-bold ${theme.iconColor} uppercase px-1`}>Modules</p>}
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className={`p-1 rounded-lg ${theme.buttonHover} ${theme.iconColor} transition-all`}>
            {sidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={14} />}
          </button>
        </div>
        {modules.map(m => (
          <button key={m.id} onClick={() => setActiveModule(m.id)} title={sidebarCollapsed ? m.label : undefined}
            className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2 py-2.5' : 'gap-2 px-3 py-2'} rounded-lg text-xs font-medium transition-all ${
              activeModule === m.id ? `${theme.primary} text-white` : `${theme.iconColor} ${theme.buttonHover}`
            }`}>
            <m.icon size={sidebarCollapsed ? 18 : 14} /> {!sidebarCollapsed && m.label}
          </button>
        ))}
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-x-hidden">
        {activeModule === 'onboarding-wizard' && <OnboardingWizardModule theme={theme} />}
        {activeModule === 'dashboard' && <SSADashboardHome theme={theme} onNavigate={setActiveModule} />}
        {activeModule === 'subscription-mgmt' && <SubscriptionMgmtModule theme={theme} />}
        {activeModule === 'fee-config' && <FeeConfigModule theme={theme} />}
        {activeModule === 'academic-config' && <AcademicConfigModule theme={theme} />}
        {activeModule === 'hr-config' && <HRConfigModule theme={theme} />}
        {activeModule === 'transport-config' && <TransportConfigModule theme={theme} />}
        {activeModule === 'attendance-config' && <AttendanceConfigModule theme={theme} />}
        {activeModule === 'exam-config' && <ExamConfigModule theme={theme} />}
        {activeModule === 'communication-config' && <CommunicationConfigModule theme={theme} />}
        {activeModule === 'timetable-config' && <TimetableConfigModule theme={theme} />}
        {activeModule === 'leave-config' && <LeaveConfigModule theme={theme} />}
        {activeModule === 'visitor-config' && <VisitorConfigModule theme={theme} />}
        {activeModule === 'certificate-config' && <CertificateConfigModule theme={theme} />}
        {activeModule === 'library-config' && <LibraryConfigModule theme={theme} />}
        {activeModule === 'canteen-config' && <CanteenConfigModule theme={theme} />}
        {activeModule === 'hostel-config' && <HostelConfigModule theme={theme} />}
        {activeModule === 'inventory-config' && <InventoryConfigModule theme={theme} />}
        {activeModule === 'compliance-config' && <ComplianceConfigModule theme={theme} />}
        {activeModule === 'role-management' && <RolePermissionModule theme={theme} />}
        {activeModule === 'homework-config' && <HomeworkConfigModule theme={theme} />}
        {activeModule === 'enquiry-config' && <EnquiryAdmissionConfigModule theme={theme} />}
        {activeModule === 'payment-config' && <OnlinePaymentConfigModule theme={theme} />}
        {activeModule === 'data-migration' && <DataMigrationModule theme={theme} />}
        {activeModule === 'critical-locks' && <CriticalLocksModule theme={theme} />}
        {activeModule === 'audit-log' && <AuditLogModule theme={theme} />}
        {activeModule === 'backup-export' && <BackupExportModule theme={theme} />}
        {activeModule === 'parent-portal-config' && <ParentPortalConfigModule theme={theme} />}
        {activeModule === 'student-portal-config' && <StudentPortalConfigModule theme={theme} />}
        {activeModule === 'alumni-config' && <AlumniConfigModule theme={theme} />}
        {activeModule === 'analytics-config' && <AnalyticsBIConfigModule theme={theme} />}
        {activeModule === 'report-engine-config' && <ReportEngineConfigModule theme={theme} />}
        {activeModule === 'api-integration-config' && <APIIntegrationConfigModule theme={theme} />}
        {activeModule === 'branding-config' && <BrandingWhitelabelConfigModule theme={theme} />}
        {activeModule === 'school-identity-config' && <SchoolIdentityConfigModule theme={theme} />}
        {activeModule === 'support' && <SupportModule theme={theme} role="school-super-admin" />}
      </div>
    </div>
  );
}

// ─── DASHBOARD HOME ────────────────────────────────
function SSADashboardHome({ theme, onNavigate }: { theme: Theme; onNavigate: (moduleId: string) => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${theme.highlight}`}>School Super Admin</h1>
          <p className={`text-xs ${theme.iconColor}`}>Deep module configuration &mdash; all changes are audit-logged</p>
        </div>
      </div>

      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex items-start gap-3">
        <ShieldCheck size={20} className="text-amber-500 mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-bold text-amber-800">All Actions Are Immutably Logged</p>
          <p className="text-xs text-amber-700 mt-1">Every configuration change you make is recorded with timestamp, before/after values, and your IP address. Audit logs are stored in Saaras-controlled storage and cannot be modified or deleted by anyone at the school level.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard icon={Settings} label="Modules Configured" value="18 / 27" color="bg-indigo-500" theme={theme} />
        <StatCard icon={CheckCircle} label="Config Complete" value="67%" color="bg-emerald-500" theme={theme} />
        <StatCard icon={Clock} label="Last Change" value="2 hrs ago" color="bg-blue-500" theme={theme} />
        <StatCard icon={AlertTriangle} label="Pending Setup" value="9" color="bg-amber-500" theme={theme} />
        <StatCard icon={Lock} label="Critical Locks Active" value="6" color="bg-rose-500" theme={theme} />
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Module Configuration Status</h3>
        <p className={`text-[10px] ${theme.iconColor} mb-3`}>Click any card to open that module's configuration</p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { name: 'Fee Structure', status: 'complete', items: '8 fee heads, 5 class groups', icon: Banknote, moduleId: 'fee-config' },
            { name: 'Academic Calendar', status: 'complete', items: 'Holidays, exam dates set', icon: Calendar, moduleId: 'academic-config' },
            { name: 'HR & Payroll', status: 'partial', items: '11 depts, payroll pending', icon: Briefcase, moduleId: 'hr-config' },
            { name: 'Transport Routes', status: 'pending', items: 'Not yet configured', icon: Bus, moduleId: 'transport-config' },
            { name: 'Attendance Rules', status: 'complete', items: 'Daily marking, bio + app', icon: ClipboardCheck, moduleId: 'attendance-config' },
            { name: 'Exam & Report Cards', status: 'partial', items: 'Schedule done, templates pending', icon: FileText, moduleId: 'exam-config' },
            { name: 'Leave Policy', status: 'complete', items: '6 types, approval chain set', icon: Clock, moduleId: 'leave-config' },
            { name: 'Timetable & Bell', status: 'pending', items: 'Not yet configured', icon: Calendar, moduleId: 'timetable-config' },
            { name: 'Communication Rules', status: 'complete', items: 'DM rules, groups configured', icon: MessageSquare, moduleId: 'communication-config' },
            { name: 'Visitor Policy', status: 'partial', items: 'Check-in done, pickup pending', icon: Shield, moduleId: 'visitor-config' },
            { name: 'Certificates', status: 'pending', items: 'Templates not uploaded', icon: Award, moduleId: 'certificate-config' },
            { name: 'Data Migration', status: 'pending', items: 'No data imported yet', icon: Upload, moduleId: 'data-migration' },
          ].map(mod => (
            <button key={mod.name} onClick={() => onNavigate(mod.moduleId)}
              className={`p-3 rounded-xl ${theme.secondaryBg} flex items-start gap-2 text-left w-full hover:ring-2 hover:ring-offset-1 transition-all group ${
                mod.status === 'complete' ? 'hover:ring-emerald-400' :
                mod.status === 'partial' ? 'hover:ring-amber-400' : 'hover:ring-slate-300'
              }`}>
              <mod.icon size={14} className={
                mod.status === 'complete' ? 'text-emerald-500 mt-0.5 shrink-0' :
                mod.status === 'partial' ? 'text-amber-500 mt-0.5 shrink-0' : 'text-slate-400 mt-0.5 shrink-0'
              } />
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-bold ${theme.highlight}`}>{mod.name}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{mod.items}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded inline-block font-bold ${
                    mod.status === 'complete' ? 'bg-emerald-100 text-emerald-700' :
                    mod.status === 'partial' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {mod.status === 'complete' ? 'COMPLETE' : mod.status === 'partial' ? 'IN PROGRESS' : 'NOT STARTED'}
                  </span>
                  <span className={`text-[9px] ${theme.iconColor} opacity-0 group-hover:opacity-100 transition-opacity`}>Configure →</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Recent Configuration Changes</h3>
        <div className="space-y-2">
          {[
            { action: 'Updated fee structure for Class 9-10', time: '2 hours ago', module: 'Fees' },
            { action: 'Added 3 new bus routes (Route D, E, F)', time: '5 hours ago', module: 'Transport' },
            { action: 'Modified leave approval chain', time: '1 day ago', module: 'Leave' },
            { action: 'Uploaded report card template', time: '1 day ago', module: 'Exams' },
            { action: 'Set DM permissions for Parent to Teacher', time: '2 days ago', module: 'Chat' },
          ].map((activity, i) => (
            <div key={i} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs ${theme.highlight}`}>{activity.action}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{activity.time}</p>
              </div>
              <span className={`text-[9px] px-2 py-0.5 rounded-lg ${theme.accentBg} ${theme.iconColor} font-bold`}>{activity.module}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── FEE CONFIGURATION MODULE ──────────────────────
function FeeConfigModule({ theme }: { theme: Theme }) {
  const [feeTemplate, setFeeTemplate] = useState('component-based');
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  const [feeHeads, setFeeHeads] = useState<Record<string, boolean>>({
    'Tuition Fee': true, 'Admission Fee': true, 'Annual Charges': true, 'Transport Fee': true,
    'Activity Fee': true, 'Lab Fee': true, 'Library Fee': false, 'Exam Fee': true,
    'Development Fund': false, 'Smart Class / IT Fee': false, 'Uniform / Books': false, 'Hostel Fee': false,
  });
  const [feeFrequency, setFeeFrequency] = useState<Record<string, string>>({
    'Tuition Fee': 'Monthly', 'Admission Fee': 'One-time', 'Annual Charges': 'Yearly',
    'Transport Fee': 'Monthly', 'Activity Fee': 'Quarterly', 'Lab Fee': 'Yearly', 'Exam Fee': 'Term-wise',
  });
  const allGrades = ['Nursery', 'Jr. KG', 'Sr. KG', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
  const [gradeAmounts, setGradeAmounts] = useState<Record<string, Record<string, string>>>({
    'Nursery': { 'Tuition Fee': '2500', 'Admission Fee': '12000', 'Annual Charges': '6000', 'Transport Fee': '1800', 'Activity Fee': '1200', 'Lab Fee': '0', 'Exam Fee': '800' },
    'Jr. KG': { 'Tuition Fee': '2800', 'Admission Fee': '13000', 'Annual Charges': '6500', 'Transport Fee': '1800', 'Activity Fee': '1300', 'Lab Fee': '0', 'Exam Fee': '800' },
    'Sr. KG': { 'Tuition Fee': '3000', 'Admission Fee': '14000', 'Annual Charges': '7000', 'Transport Fee': '1800', 'Activity Fee': '1400', 'Lab Fee': '0', 'Exam Fee': '900' },
    'Grade 1': { 'Tuition Fee': '3200', 'Admission Fee': '15000', 'Annual Charges': '8000', 'Transport Fee': '2000', 'Activity Fee': '1600', 'Lab Fee': '500', 'Exam Fee': '1000' },
    'Grade 2': { 'Tuition Fee': '3300', 'Admission Fee': '15500', 'Annual Charges': '8200', 'Transport Fee': '2000', 'Activity Fee': '1600', 'Lab Fee': '500', 'Exam Fee': '1000' },
    'Grade 3': { 'Tuition Fee': '3400', 'Admission Fee': '16000', 'Annual Charges': '8500', 'Transport Fee': '2000', 'Activity Fee': '1700', 'Lab Fee': '600', 'Exam Fee': '1000' },
    'Grade 4': { 'Tuition Fee': '3500', 'Admission Fee': '16500', 'Annual Charges': '9000', 'Transport Fee': '2000', 'Activity Fee': '1800', 'Lab Fee': '700', 'Exam Fee': '1100' },
    'Grade 5': { 'Tuition Fee': '3600', 'Admission Fee': '17000', 'Annual Charges': '9500', 'Transport Fee': '2000', 'Activity Fee': '1900', 'Lab Fee': '800', 'Exam Fee': '1100' },
    'Grade 6': { 'Tuition Fee': '4000', 'Admission Fee': '18000', 'Annual Charges': '10000', 'Transport Fee': '2200', 'Activity Fee': '2000', 'Lab Fee': '1500', 'Exam Fee': '1200' },
    'Grade 7': { 'Tuition Fee': '4200', 'Admission Fee': '18500', 'Annual Charges': '10500', 'Transport Fee': '2200', 'Activity Fee': '2100', 'Lab Fee': '1600', 'Exam Fee': '1300' },
    'Grade 8': { 'Tuition Fee': '4500', 'Admission Fee': '19000', 'Annual Charges': '11000', 'Transport Fee': '2500', 'Activity Fee': '2200', 'Lab Fee': '1800', 'Exam Fee': '1400' },
    'Grade 9': { 'Tuition Fee': '5000', 'Admission Fee': '22000', 'Annual Charges': '13000', 'Transport Fee': '2500', 'Activity Fee': '2500', 'Lab Fee': '2500', 'Exam Fee': '1700' },
    'Grade 10': { 'Tuition Fee': '5500', 'Admission Fee': '24000', 'Annual Charges': '14000', 'Transport Fee': '2500', 'Activity Fee': '2800', 'Lab Fee': '3000', 'Exam Fee': '2000' },
    'Grade 11': { 'Tuition Fee': '6500', 'Admission Fee': '28000', 'Annual Charges': '16000', 'Transport Fee': '3000', 'Activity Fee': '3200', 'Lab Fee': '4000', 'Exam Fee': '2200' },
    'Grade 12': { 'Tuition Fee': '7000', 'Admission Fee': '30000', 'Annual Charges': '18000', 'Transport Fee': '3000', 'Activity Fee': '3500', 'Lab Fee': '5000', 'Exam Fee': '2500' },
  });
  const [paymentModes, setPaymentModes] = useState<Record<string, boolean>>({ UPI: true, 'Net Banking': true, 'Credit Card': true, 'Debit Card': true, Cash: true, Cheque: true, 'DD/NEFT': true });
  const [paymentModesTable, setPaymentModesTable] = useState([
    { name: 'Cash', active: true, processingFee: '0', autoReceipt: true, reconciliation: 'Auto', isDefault: true },
    { name: 'Cheque', active: true, processingFee: '0', autoReceipt: false, reconciliation: 'Manual', isDefault: false },
    { name: 'UPI', active: true, processingFee: '0.5', autoReceipt: true, reconciliation: 'Auto', isDefault: false },
    { name: 'Net Banking', active: true, processingFee: '1', autoReceipt: true, reconciliation: 'Auto', isDefault: false },
    { name: 'Credit Card', active: true, processingFee: '1.5', autoReceipt: true, reconciliation: 'Auto', isDefault: false },
    { name: 'Debit Card', active: true, processingFee: '0.8', autoReceipt: true, reconciliation: 'Auto', isDefault: false },
    { name: 'DD/NEFT', active: true, processingFee: '0', autoReceipt: false, reconciliation: 'Manual', isDefault: false },
    { name: 'Paytm/PhonePe', active: false, processingFee: '0.5', autoReceipt: true, reconciliation: 'Auto', isDefault: false },
  ]);
  const [lateFeeEnabled, setLateFeeEnabled] = useState(true);
  const [lateFeeAmount, setLateFeeAmount] = useState('50');
  const [lateFeeGrace, setLateFeeGrace] = useState('7');
  const [lateFeeMethod, setLateFeeMethod] = useState('per-day');
  const [lateFeeMax, setLateFeeMax] = useState('500');
  const [billingCycle, setBillingCycle] = useState('Monthly');
  const [dueDate, setDueDate] = useState('10');
  const [concessions, setConcessions] = useState([
    { type: 'Sibling Discount', method: 'percentage', value: '10', maxAmount: '', approvalRequired: false, active: true, appliesTo: 'tuition-only' },
    { type: 'Merit Scholarship', method: 'percentage', value: '25', maxAmount: '50000', approvalRequired: true, active: true, appliesTo: 'all-components' },
    { type: 'Staff Child', method: 'percentage', value: '100', maxAmount: '', approvalRequired: false, active: true, appliesTo: 'all-components' },
    { type: 'Economic Weaker (EWS)', method: 'percentage', value: '50', maxAmount: '', approvalRequired: true, active: true, appliesTo: 'tuition-annual' },
    { type: 'Sports Quota', method: 'percentage', value: '15', maxAmount: '30000', approvalRequired: true, active: true, appliesTo: 'tuition-only' },
    { type: 'SC/ST Scholarship', method: 'fixed', value: '25000', maxAmount: '', approvalRequired: true, active: true, appliesTo: 'all-components' },
    { type: 'Single Parent', method: 'percentage', value: '20', maxAmount: '20000', approvalRequired: true, active: true, appliesTo: 'tuition-annual' },
  ]);
  const [concessionApprovalMode, setConcessionApprovalMode] = useState('Principal + Admin');
  const [concessionApprovalRequired, setConcessionApprovalRequired] = useState(true);
  const [concessionApprovalChain] = useState(['Accounts Officer', 'Principal', 'Trust / Management']);
  const [maxConcessionWithoutApproval, setMaxConcessionWithoutApproval] = useState('5000');
  const [blockRules, setBlockRules] = useState<Record<string, boolean>>({
    'Block report card if fees overdue > 60 days': true,
    'Block TC generation if outstanding > 0': true,
    'Block exam hall ticket if current term unpaid': false,
    'Send auto-reminder before blocking': true,
  });
  const [reminders] = useState([
    { timing: '7 days before due', channel: 'Push + SMS', enabled: true },
    { timing: '3 days before due', channel: 'Push', enabled: true },
    { timing: '1 day before due', channel: 'Push + SMS', enabled: true },
    { timing: '1 day after due', channel: 'Push + SMS + Email', enabled: true },
    { timing: '7 days after due', channel: 'Push + SMS', enabled: true },
    { timing: '15 days after due', channel: 'Push + SMS + Call', enabled: true },
    { timing: '30 days after due', channel: 'Push + SMS + Email + Call', enabled: true },
  ]);

  const activeHeads = Object.entries(feeHeads).filter(([, v]) => v).map(([k]) => k);
  const frequencies = ['Monthly', 'Quarterly', 'Term-wise', 'Half-yearly', 'Yearly', 'One-time'];

  return (
    <div className="space-y-4">
      <ModuleHeader title="Fee Configuration" subtitle="Configure fee structure, class-wise amounts, payment rules, and concessions" theme={theme} />

      {/* Critical Lock Banner for Fee Module */}
      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3 flex items-center gap-3">
        <Lock size={14} className="text-rose-500 shrink-0" />
        <p className="text-xs text-rose-700"><strong>Fee Structure Changes</strong> is a locked field. Editing fee heads or amounts will require OTP verification from the registered Trustee.</p>
      </div>

      <div className="relative">
        <span className="absolute -top-1 right-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-100 border border-rose-300 text-[9px] font-bold text-rose-700">
          <Lock size={9} /> LOCKED
        </span>
        <SectionCard title="Fee Template" subtitle="Choose how fees are structured for your school" theme={theme}>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'simple-annual', name: 'Simple Annual', desc: 'One lump-sum fee per year per class' },
            { id: 'component-based', name: 'Component-Based', desc: 'Multiple fee heads with individual amounts' },
            { id: 'term-wise', name: 'Term-Wise', desc: 'Split by terms (Term 1, Term 2, etc.)' },
          ].map(t => (
            <button key={t.id} onClick={() => setFeeTemplate(t.id)}
              className={`p-3 rounded-xl text-left border-2 transition-all ${feeTemplate === t.id ? `${theme.primary} text-white border-transparent` : `${theme.secondaryBg} ${theme.border} ${theme.highlight}`}`}>
              <p className="text-xs font-bold">{t.name}</p>
              <p className={`text-[10px] mt-1 ${feeTemplate === t.id ? 'text-white/80' : theme.iconColor}`}>{t.desc}</p>
            </button>
          ))}
        </div>
      </SectionCard>
      </div>

      {feeTemplate !== 'simple-annual' && (
      <SectionCard title="Fee Heads" subtitle="Toggle fee components on/off and set frequency" theme={theme}>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
          {Object.entries(feeHeads).map(([head, enabled]) => (
            <div key={head} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <SSAToggle on={enabled} onChange={() => setFeeHeads(p => ({ ...p, [head]: !p[head] }))} theme={theme} label={head} />
                <span className={`text-xs font-medium ${theme.highlight} truncate`}>{head}</span>
              </div>
              {enabled && (
                <select value={feeFrequency[head] || 'Yearly'} onChange={e => setFeeFrequency(p => ({ ...p, [head]: e.target.value }))}
                  className={`text-[10px] px-1.5 py-0.5 rounded-lg border ${theme.border} ${theme.inputBg} ${theme.highlight} ml-2`}>
                  {(feeTemplate === 'term-wise' ? ['Term 1', 'Term 2', 'Term 3', 'All Terms'] : frequencies).map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              )}
            </div>
          ))}
        </div>

      </SectionCard>
      )}

      <div className="relative">
        <span className="absolute -top-1 right-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-100 border border-rose-300 text-[9px] font-bold text-rose-700">
          <Lock size={9} /> LOCKED
        </span>
        <SectionCard title="Grade-wise Fee Amounts" subtitle="Set amounts per grade for each active fee head (values in INR)" theme={theme}>
        {feeTemplate === 'term-wise' && (
          <div className="flex items-center gap-2 mb-3">
            <p className={`text-[10px] font-bold ${theme.iconColor}`}>Term:</p>
            {['Term 1', 'Term 2', 'Term 3'].map(t => (
              <button key={t} onClick={() => setSelectedTerm(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedTerm === t ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.highlight} ${theme.border} border`}`}>
                {t}
              </button>
            ))}
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className={theme.secondaryBg}>
                <th className={`text-left px-3 py-2 font-bold ${theme.iconColor} sticky left-0 ${theme.secondaryBg}`}>Grade</th>
                {feeTemplate === 'simple-annual' ? (
                  <th className={`text-center px-2 py-2 font-bold ${theme.iconColor} whitespace-nowrap`}>Annual Fee</th>
                ) : activeHeads.map(h => (
                  <th key={h} className={`text-center px-2 py-2 font-bold ${theme.iconColor} whitespace-nowrap`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allGrades.map(cg => (
                <tr key={cg} className={`border-t ${theme.border}`}>
                  <td className={`px-3 py-2 font-bold ${theme.highlight} sticky left-0 ${theme.cardBg} whitespace-nowrap`}>{cg}</td>
                  {feeTemplate === 'simple-annual' ? (
                    <td className="px-2 py-1.5">
                      <div className="flex items-center gap-0.5">
                        <span className={`text-[10px] ${theme.iconColor}`}>{'\u20B9'}</span>
                        <input type="text" value={gradeAmounts[cg]?.['Annual Fee'] || ''}
                          onChange={e => setGradeAmounts(p => ({ ...p, [cg]: { ...p[cg], 'Annual Fee': e.target.value } }))}
                          className={`w-20 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none focus:ring-1 focus:ring-slate-300`} />
                      </div>
                    </td>
                  ) : activeHeads.map(h => {
                    const val = gradeAmounts[cg]?.[h] || '';
                    const isInvalid = val !== '' && (isNaN(Number(val)) || Number(val) < 0);
                    return (
                    <td key={h} className="px-2 py-1.5">
                      <div className="flex flex-col items-center gap-0">
                        <div className="flex items-center gap-0.5">
                          <span className={`text-[10px] ${theme.iconColor}`}>{'\u20B9'}</span>
                          <input type="text" value={val}
                            onChange={e => setGradeAmounts(p => ({ ...p, [cg]: { ...p[cg], [h]: e.target.value } }))}
                            className={`w-16 px-1.5 py-1 rounded-lg border ${isInvalid ? 'border-red-400 bg-red-50' : `${theme.border} ${theme.inputBg}`} text-xs text-center ${theme.highlight} outline-none focus:ring-1 ${isInvalid ? 'focus:ring-red-300' : 'focus:ring-slate-300'}`} />
                        </div>
                        {isInvalid && <span className="text-[7px] text-red-500 font-bold">Invalid</span>}
                      </div>
                    </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Payment Configuration" subtitle="Modes, billing cycle, and due dates" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Accepted Payment Modes</p>
              <div className="grid grid-cols-2 gap-1.5">
                {Object.entries(paymentModes).map(([mode, enabled]) => (
                  <div key={mode} className={`flex items-center gap-2 p-2 rounded-lg ${theme.secondaryBg}`}>
                    <SSAToggle on={enabled} onChange={() => setPaymentModes(p => ({ ...p, [mode]: !p[mode] }))} theme={theme} label={mode} />
                    <div>
                      <p className={`text-xs font-bold ${theme.highlight}`}>{mode}</p>
                      <p className={`text-[9px] ${theme.iconColor}`}>{
                        ({
                          'UPI': 'Google Pay, PhonePe, Paytm etc.',
                          'Net Banking': 'Direct bank transfer via internet banking',
                          'Credit Card': 'Visa, Mastercard credit cards',
                          'Debit Card': 'Bank debit/ATM cards',
                          'Cash': 'Cash payment at school counter',
                          'Cheque': 'Bank cheque/demand draft',
                          'DD/NEFT': 'Bank wire transfer (NEFT/RTGS/IMPS)',
                        } as Record<string, string>)[mode]
                      }</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Billing Cycle</p>
                {feeTemplate === 'term-wise' ? (
                  <InputField value="Term-wise" onChange={() => {}} theme={theme} disabled />
                ) : (
                  <SelectField options={['Monthly', 'Quarterly', 'Term-wise', 'Half-yearly', 'Yearly']} value={billingCycle} onChange={setBillingCycle} theme={theme} />
                )}
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Due Date (day of month)</p>
                <InputField value={dueDate} onChange={setDueDate} theme={theme} type="number" />
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Late Fee Rules" subtitle="Penalties for overdue payments" theme={theme}>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <span className={`text-xs font-bold ${theme.highlight}`}>Enable Late Fee</span>
              <SSAToggle on={lateFeeEnabled} onChange={() => setLateFeeEnabled(!lateFeeEnabled)} theme={theme} label="Enable Late Fee" />
            </div>
            {lateFeeEnabled && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Amount ({'\u20B9'})</p>
                  <InputField value={lateFeeAmount} onChange={setLateFeeAmount} theme={theme} type="number" />
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Grace Period (days)</p>
                  <InputField value={lateFeeGrace} onChange={setLateFeeGrace} theme={theme} type="number" />
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Calculation</p>
                  <SelectField options={['per-day', 'per-week', 'flat']} value={lateFeeMethod} onChange={setLateFeeMethod} theme={theme} />
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max Late Fee ({'\u20B9'})</p>
                  <InputField value={lateFeeMax} onChange={setLateFeeMax} theme={theme} type="number" />
                </div>
              </div>
            )}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Concession & Scholarship Master" subtitle="Configure discount types, approval requirements, and maximum limits" theme={theme}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Type Name', 'Applies To', 'Method', 'Value', 'Max Amt', 'Approval', 'Active', ''].map(h => (
                <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {concessions.map((c, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className="px-2 py-1.5">
                    <input value={c.type} onChange={e => { const n = [...concessions]; n[i] = { ...n[i], type: e.target.value }; setConcessions(n); }}
                      className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <select value={c.appliesTo || 'all-components'} onChange={e => { const n = [...concessions]; n[i] = { ...n[i], appliesTo: e.target.value }; setConcessions(n); }}
                      className={`px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight}`}>
                      <option value="all-components">All Components</option>
                      <option value="tuition-only">Tuition Only</option>
                      <option value="tuition-annual">Tuition + Annual</option>
                      <option value="excluding-transport">Excl. Transport</option>
                      <option value="custom">Custom Selection</option>
                    </select>
                  </td>
                  <td className="px-2 py-1.5">
                    <select value={c.method} onChange={e => { const n = [...concessions]; n[i] = { ...n[i], method: e.target.value }; setConcessions(n); }}
                      className={`px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight}`}>
                      <option value="percentage">%</option>
                      <option value="fixed">{'\u20B9'} Fixed</option>
                    </select>
                  </td>
                  <td className="px-2 py-1.5">
                    <input value={c.value} onChange={e => { const n = [...concessions]; n[i] = { ...n[i], value: e.target.value }; setConcessions(n); }}
                      className={`w-14 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <input value={c.maxAmount} onChange={e => { const n = [...concessions]; n[i] = { ...n[i], maxAmount: e.target.value }; setConcessions(n); }}
                      placeholder="-" className={`w-16 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <SSAToggle on={c.approvalRequired} onChange={() => { const n = [...concessions]; n[i] = { ...n[i], approvalRequired: !n[i].approvalRequired }; setConcessions(n); }} theme={theme} />
                  </td>
                  <td className="px-2 py-1.5">
                    <SSAToggle on={c.active} onChange={() => { const n = [...concessions]; n[i] = { ...n[i], active: !n[i].active }; setConcessions(n); }} theme={theme} label={c.type} />
                  </td>
                  <td className="px-2 py-1.5"><button onClick={() => setConcessions(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={12} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <button onClick={() => setConcessions(p => [...p, { type: '', method: 'percentage', value: '0', maxAmount: '', approvalRequired: false, active: true, appliesTo: 'all-components' }])}
              className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
              <Plus size={12} /> Add Concession Type
            </button>
            {/* Bulk operations (B4) */}
            <button onClick={() => setConcessions(p => p.map(c => ({ ...c, active: true })))}
              className={`px-2.5 py-1.5 rounded-lg text-[9px] font-bold bg-emerald-100 text-emerald-700 hover:bg-emerald-200`}>Activate All</button>
            <button onClick={() => setConcessions(p => p.map(c => ({ ...c, active: false })))}
              className={`px-2.5 py-1.5 rounded-lg text-[9px] font-bold bg-gray-100 text-gray-600 hover:bg-gray-200`}>Deactivate All</button>
            <button onClick={() => setConcessions(p => p.filter(c => c.active))}
              className={`px-2.5 py-1.5 rounded-lg text-[9px] font-bold bg-red-100 text-red-600 hover:bg-red-200`}>Delete Inactive</button>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold ${theme.iconColor}`}>Approval Workflow:</span>
            <select value={concessionApprovalMode} onChange={e => setConcessionApprovalMode(e.target.value)}
              className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] font-bold ${theme.highlight}`}>
              <option value="None">None</option>
              <option value="Admin Only">Admin Only</option>
              <option value="Principal + Admin">Principal + Admin</option>
            </select>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Concession Approval Workflow" subtitle="Require approval before applying fee concessions" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Concession Approval Required</p>
              <p className={`text-[10px] ${theme.iconColor}`}>All concessions must go through approval chain</p>
            </div>
            <SSAToggle on={concessionApprovalRequired} onChange={() => setConcessionApprovalRequired(!concessionApprovalRequired)} theme={theme} />
          </div>
          {concessionApprovalRequired && (
            <>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Approval Chain</p>
                <div className="space-y-1.5">
                  {concessionApprovalChain.map((step, i) => (
                    <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${theme.secondaryBg}`}>
                      <span className={`text-[10px] w-6 h-6 rounded-full ${theme.primary} text-white flex items-center justify-center font-bold shrink-0`}>{i + 1}</span>
                      <span className={`text-xs font-bold ${theme.highlight} flex-1`}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max Concession Without Approval ({'\u20B9'})</p>
                <InputField value={maxConcessionWithoutApproval} onChange={setMaxConcessionWithoutApproval} theme={theme} type="number" placeholder="e.g. 5000" />
                <p className={`text-[10px] ${theme.iconColor} mt-1`}>Concessions below this amount are auto-approved</p>
              </div>
            </>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Fee Defaulter Blocking Rules" subtitle="Restrict access to services when fees are overdue" theme={theme}>
        <div className="space-y-2">
          {Object.entries(blockRules).map(([rule, enabled]) => (
            <div key={rule} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>{rule}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{
                  ({
                    'Block report card if fees overdue > 60 days': 'Report card download/view is blocked if any fee is unpaid for more than 60 days',
                    'Block TC generation if outstanding > 0': 'Transfer Certificate cannot be generated until all outstanding dues are cleared',
                    'Block exam hall ticket if current term unpaid': 'Student cannot receive hall ticket for exams if current term fees are unpaid',
                    'Send auto-reminder before blocking': 'System sends an automatic warning to parents before any blocking action takes effect',
                  } as Record<string, string>)[rule]
                }</p>
              </div>
              <SSAToggle on={enabled} onChange={() => setBlockRules(p => ({ ...p, [rule]: !p[rule] }))} theme={theme} label={rule} />
            </div>
          ))}
        </div>
      </SectionCard>

      {feeTemplate !== 'simple-annual' && (
      <SectionCard title="Fee Reminder Schedule" subtitle="Automated reminders before and after due date" theme={theme}>
        <div className="space-y-1.5">
          {reminders.map((r, i) => (
            <div key={i} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold ${theme.highlight}`}>{r.timing}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-lg ${theme.accentBg} ${theme.iconColor}`}>{r.channel}</span>
              </div>
              <div className={`w-2 h-2 rounded-full ${r.enabled ? 'bg-emerald-500' : 'bg-slate-300'}`} />
            </div>
          ))}
        </div>
      </SectionCard>
      )}

      <SectionCard title="Payment Modes" subtitle="Configure accepted payment modes with processing fees and reconciliation settings" theme={theme}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Mode', 'Active', 'Fee (%)', 'Auto Receipt', 'Reconciliation', 'Default', ''].map(h => (
                <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {paymentModesTable.map((m, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className="px-2 py-1.5">
                    <input value={m.name} onChange={e => { const n = [...paymentModesTable]; n[i] = { ...n[i], name: e.target.value }; setPaymentModesTable(n); }}
                      className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <SSAToggle on={m.active} onChange={() => { const n = [...paymentModesTable]; n[i] = { ...n[i], active: !n[i].active }; setPaymentModesTable(n); }} theme={theme} />
                  </td>
                  <td className="px-2 py-1.5">
                    <input value={m.processingFee} onChange={e => { const n = [...paymentModesTable]; n[i] = { ...n[i], processingFee: e.target.value }; setPaymentModesTable(n); }}
                      className={`w-12 px-1 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <SSAToggle on={m.autoReceipt} onChange={() => { const n = [...paymentModesTable]; n[i] = { ...n[i], autoReceipt: !n[i].autoReceipt }; setPaymentModesTable(n); }} theme={theme} />
                  </td>
                  <td className="px-2 py-1.5">
                    <select value={m.reconciliation} onChange={e => { const n = [...paymentModesTable]; n[i] = { ...n[i], reconciliation: e.target.value }; setPaymentModesTable(n); }}
                      className={`px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] font-bold ${theme.highlight}`}>
                      <option value="Auto">Auto</option><option value="Manual">Manual</option>
                    </select>
                  </td>
                  <td className="px-2 py-1.5">
                    <input type="radio" name="defaultPayMode" checked={m.isDefault}
                      onChange={() => setPaymentModesTable(p => p.map((x, j) => ({ ...x, isDefault: j === i })))} className="accent-emerald-500" />
                  </td>
                  <td className="px-2 py-1.5"><button onClick={() => setPaymentModesTable(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={12} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={() => setPaymentModesTable(p => [...p, { name: '', active: true, processingFee: '0', autoReceipt: true, reconciliation: 'Auto', isDefault: false }])}
          className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl mt-2`}>
          <Plus size={12} /> Add Mode
        </button>
      </SectionCard>

    </div>
  );
}

// ─── ACADEMIC CONFIG MODULE ────────────────────────
function AcademicConfigModule({ theme }: { theme: Theme }) {
  const [preschoolEnabled, setPreschoolEnabled] = useState(true);
  const allGrades = preschoolEnabled
    ? ['Nursery', 'Jr. KG', 'Sr. KG', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']
    : ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
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

  return (
    <div className="space-y-4">
      <ModuleHeader title="Academic Configuration" subtitle="Subjects, sections, houses, holidays, and academic calendar" theme={theme} />

      <SectionCard title="Academic Year" subtitle="Set start and end dates" theme={theme}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Start Date</p>
            <InputField value={academicYear.start} onChange={v => setAcademicYear(p => ({ ...p, start: v }))} theme={theme} type="date" />
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>End Date</p>
            <InputField value={academicYear.end} onChange={v => setAcademicYear(p => ({ ...p, end: v }))} theme={theme} type="date" />
          </div>
        </div>
      </SectionCard>

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
        {/* Subjects for selected grade */}
        <div className={`p-3 rounded-xl ${theme.secondaryBg} mb-3`}>
          <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Subjects — {activeGrade}</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {(subjects[activeGrade] || []).map(s => (
              <span key={s} className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${theme.cardBg} border ${theme.border} text-xs font-medium ${theme.highlight}`}>
                {s}
                <button onClick={() => setSubjects(p => ({ ...p, [activeGrade]: (p[activeGrade] || []).filter(x => x !== s) }))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2 mb-2">
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
      </SectionCard>

      <SectionCard title="Section Configuration" subtitle="Define section names once (school-wide), then assign per grade" theme={theme}>
        {/* Global section names */}
        <div className={`p-3 rounded-xl ${theme.accentBg} border ${theme.border} mb-4`}>
          <p className={`text-[10px] font-bold ${theme.iconColor} mb-2 uppercase tracking-wide`}>School-wide Section Names (defined once, used across all grades)</p>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {globalSectionNames.map((name, i) => (
              <span key={i} className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${theme.cardBg} border ${theme.border} text-xs font-bold ${theme.highlight}`}>
                <input value={name} onChange={e => { const n = [...globalSectionNames]; n[i] = e.target.value; setGlobalSectionNames(n); }}
                  className={`w-16 bg-transparent text-xs font-bold ${theme.highlight} outline-none text-center`} placeholder="Name" />
                <button onClick={() => {
                  const removed = globalSectionNames[i];
                  setGlobalSectionNames(p => p.filter((_, j) => j !== i));
                  setSections(p => {
                    const updated = { ...p };
                    for (const grade of Object.keys(updated)) { updated[grade] = updated[grade].filter(s => s !== removed); }
                    return updated;
                  });
                }} className="text-red-400 hover:text-red-600"><X size={10} /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
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
          {allGrades.map(grade => {
            const gradeSecs = sections[grade] || [];
            return (
              <div key={grade} className={`p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex items-center justify-between mb-1.5">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{grade}</p>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded ${theme.accentBg} ${theme.iconColor} font-bold`}>
                    {gradeSecs.length} {gradeSecs.length === 1 ? 'section' : 'sections'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
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
              </div>
            );
          })}
        </div>
      </SectionCard>

      <SectionCard title="House System" subtitle="School houses for inter-house activities — add, edit, or delete houses freely" theme={theme}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
          {houses.map((h, i) => (
            <div key={i} className={`p-3 rounded-xl ${theme.secondaryBg} relative`}>
              {/* Delete button */}
              <button
                onClick={() => setHouses(p => p.filter((_, idx) => idx !== i))}
                className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 text-red-500 hover:text-red-700 transition-colors">
                <X size={10} />
              </button>
              {/* Color swatch + name */}
              <div className="flex items-center gap-2 mb-2 pr-5">
                <div className={`w-7 h-7 rounded-lg ${h.color} shrink-0`} />
                <input
                  value={h.name}
                  onChange={e => { const n = [...houses]; n[i] = { ...n[i], name: e.target.value }; setHouses(n); }}
                  className={`flex-1 min-w-0 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`}
                  placeholder="House name" />
              </div>
              {/* Color picker */}
              <div className="mb-2">
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Color</p>
                <select
                  value={h.color}
                  onChange={e => { const n = [...houses]; n[i] = { ...n[i], color: e.target.value }; setHouses(n); }}
                  className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}>
                  {houseColorOptions.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              {/* Mascot */}
              <div className="mb-2">
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Mascot</p>
                <input
                  value={h.mascot}
                  onChange={e => { const n = [...houses]; n[i] = { ...n[i], mascot: e.target.value }; setHouses(n); }}
                  className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}
                  placeholder="e.g. Phoenix" />
              </div>
              {/* Captain */}
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Captain</p>
                <input
                  value={h.captain}
                  onChange={e => { const n = [...houses]; n[i] = { ...n[i], captain: e.target.value }; setHouses(n); }}
                  className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}
                  placeholder="Captain name" />
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setHouses(p => [...p, { name: 'New House', color: 'bg-indigo-500', captain: '', mascot: '' }])}
          className={`flex items-center gap-1.5 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl border ${theme.border}`}>
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

      <SectionCard title="Holiday Calendar" subtitle="School holidays, vacations & observances — supports single-day holidays and multi-day vacation ranges" theme={theme}>
        <div className="space-y-1.5">
          {holidays.map((h, i) => {
            const isRange = h.startDate !== h.endDate;
            return (
            <div key={i} className={`flex items-center gap-2 p-2.5 rounded-xl ${theme.secondaryBg}`}>
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
              <button onClick={() => setHolidays(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={12} /></button>
            </div>
            );
          })}
          <button onClick={() => setHolidays(p => [...p, { startDate: '', endDate: '', name: '', type: 'School' }])}
            className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
            <Plus size={12} /> Add Holiday / Vacation
          </button>
        </div>
      </SectionCard>

      <SectionCard title="Recurring Holidays" subtitle="Weekly off-days and working day summary" theme={theme}>
        <div className="space-y-2 mb-3">
          {Object.entries(recurringHolidays).map(([day, enabled]) => (
            <div key={day} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <span className={`text-xs font-bold ${theme.highlight}`}>{day}</span>
              <SSAToggle on={enabled} onChange={() => setRecurringHolidays(p => ({ ...p, [day]: !p[day] }))} theme={theme} />
            </div>
          ))}
        </div>
        <div className={`p-3 rounded-xl ${theme.accentBg} border ${theme.border}`}>
          <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Working Days Calculator</p>
          <div className="flex gap-4">
            <span className={`text-xs ${theme.highlight}`}>Total days: <strong>365</strong></span>
            <span className={`text-xs ${theme.highlight}`}>Holidays: <strong>{holidays.length + (recurringHolidays['Every Sunday'] ? 52 : 0) + (recurringHolidays['Every Saturday (2nd & 4th)'] ? 24 : recurringHolidays['Every Saturday (all)'] ? 52 : 0)}</strong></span>
            <span className={`text-xs font-bold text-emerald-600`}>Working days: <strong>{365 - holidays.length - (recurringHolidays['Every Sunday'] ? 52 : 0) - (recurringHolidays['Every Saturday (2nd & 4th)'] ? 24 : recurringHolidays['Every Saturday (all)'] ? 52 : 0)}</strong></span>
          </div>
        </div>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Terms / Semesters" subtitle="Define academic terms within the year" theme={theme}>
          <div className="space-y-2">
            {terms.map((t, i) => (
              <div key={i} className={`flex items-center gap-2 p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <input value={t.name} onChange={e => { const n = [...terms]; n[i] = { ...n[i], name: e.target.value }; setTerms(n); }}
                  className={`w-20 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                <input type="date" value={t.start} onChange={e => { const n = [...terms]; n[i] = { ...n[i], start: e.target.value }; setTerms(n); }}
                  className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                <span className={`text-[10px] ${theme.iconColor}`}>to</span>
                <input type="date" value={t.end} onChange={e => { const n = [...terms]; n[i] = { ...n[i], end: e.target.value }; setTerms(n); }}
                  className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                <button onClick={() => setTerms(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={12} /></button>
              </div>
            ))}
            <button onClick={() => setTerms(p => [...p, { name: `Term ${p.length + 1}`, start: '', end: '' }])}
              className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
              <Plus size={12} /> Add Term
            </button>
          </div>
        </SectionCard>

        <SectionCard title="Academic Year History" subtitle="Past academic years and rollover status" theme={theme}>
          <div className="space-y-1.5">
            {academicHistory.map((y, i) => (
              <div key={i} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <span className={`text-xs font-bold ${theme.highlight}`}>{y.year}</span>
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                  y.status === 'Current' ? 'bg-emerald-100 text-emerald-700' : y.status === 'Completed' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
                }`}>{y.status}</span>
                <span className={`text-xs ${theme.iconColor}`}>{y.students} students</span>
              </div>
            ))}
          </div>
          <div className={`mt-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200`}>
            <p className="text-[10px] font-bold text-emerald-700">Year Rollover: Ready for 2026-27</p>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Demographics Configuration" subtitle="Religion, caste category, and mother tongue options for student profiles" theme={theme}>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-2 uppercase tracking-wide`}>Religions</p>
            <div className="space-y-1">
              {Object.entries(religions).map(([r, active]) => (
                <div key={r} className={`flex items-center justify-between p-2 rounded-lg ${theme.secondaryBg}`}>
                  <span className={`text-xs ${theme.highlight}`}>{r}</span>
                  <SSAToggle on={active} onChange={() => setReligions(p => ({ ...p, [r]: !p[r] }))} theme={theme} />
                </div>
              ))}
            </div>
            <div className="flex gap-1 mt-2">
              <input value={newReligion} onChange={e => setNewReligion(e.target.value)} placeholder="Add..."
                className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
              <button onClick={() => { if (newReligion.trim()) { setReligions(p => ({ ...p, [newReligion.trim()]: true })); setNewReligion(''); } }}
                className={`px-2 py-1 rounded-lg ${theme.primary} text-white text-xs font-bold`}><Plus size={10} /></button>
            </div>
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-2 uppercase tracking-wide`}>Categories</p>
            <div className="space-y-1">
              {Object.entries(categories).map(([c, active]) => (
                <div key={c} className={`flex items-center justify-between p-2 rounded-lg ${theme.secondaryBg}`}>
                  <span className={`text-xs ${theme.highlight}`}>{c}</span>
                  <SSAToggle on={active} onChange={() => setCategories(p => ({ ...p, [c]: !p[c] }))} theme={theme} />
                </div>
              ))}
            </div>
            <div className="flex gap-1 mt-2">
              <input value={newCategory} onChange={e => setNewCategory(e.target.value)} placeholder="Add..."
                className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
              <button onClick={() => { if (newCategory.trim()) { setCategories(p => ({ ...p, [newCategory.trim()]: true })); setNewCategory(''); } }}
                className={`px-2 py-1 rounded-lg ${theme.primary} text-white text-xs font-bold`}><Plus size={10} /></button>
            </div>
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-2 uppercase tracking-wide`}>Mother Tongue / Languages</p>
            <div className="space-y-1">
              {Object.entries(languages).map(([l, active]) => (
                <div key={l} className={`flex items-center justify-between p-2 rounded-lg ${theme.secondaryBg}`}>
                  <span className={`text-xs ${theme.highlight}`}>{l}</span>
                  <SSAToggle on={active} onChange={() => setLanguages(p => ({ ...p, [l]: !p[l] }))} theme={theme} />
                </div>
              ))}
            </div>
            <div className="flex gap-1 mt-2">
              <input value={newLanguage} onChange={e => setNewLanguage(e.target.value)} placeholder="Add..."
                className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
              <button onClick={() => { if (newLanguage.trim()) { setLanguages(p => ({ ...p, [newLanguage.trim()]: true })); setNewLanguage(''); } }}
                className={`px-2 py-1 rounded-lg ${theme.primary} text-white text-xs font-bold`}><Plus size={10} /></button>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

// ─── HR & PAYROLL CONFIG MODULE ────────────────────
function HRConfigModule({ theme }: { theme: Theme }) {
  const [departments, setDepartments] = useState(['Administration', 'Teaching - Primary', 'Teaching - Secondary', 'Teaching - Senior', 'Accounts', 'IT', 'Transport', 'Housekeeping', 'Security', 'Library', 'Lab']);
  const [designations, setDesignations] = useState(['Principal', 'Vice Principal', 'HOD', 'PGT', 'TGT', 'PRT', 'Lab Assistant', 'Librarian', 'Accountant', 'Driver', 'Peon', 'Security Guard']);
  const [newDept, setNewDept] = useState('');
  const [newDesig, setNewDesig] = useState('');
  const [salaryComponents, setSalaryComponents] = useState([
    { name: 'Basic Salary', type: 'earning', percentage: '40%' },
    { name: 'HRA', type: 'earning', percentage: '20%' },
    { name: 'DA', type: 'earning', percentage: '15%' },
    { name: 'Transport Allowance', type: 'earning', percentage: '5%' },
    { name: 'Special Allowance', type: 'earning', percentage: '10%' },
    { name: 'PF (Employee)', type: 'deduction', percentage: '12%' },
    { name: 'ESI', type: 'deduction', percentage: '0.75%' },
    { name: 'Professional Tax', type: 'deduction', percentage: 'Fixed' },
    { name: 'TDS', type: 'deduction', percentage: 'Slab' },
  ]);
  const [payCycle, setPayCycle] = useState('Monthly');
  const [payDay, setPayDay] = useState('Last working day');
  const [staffAttendance, setStaffAttendance] = useState<Record<string, boolean>>({
    'Biometric': true, 'Mobile App': true, 'RFID': false, 'Manual Register': true, 'Geo-fencing': false,
  });
  const [onboardingChecklist, setOnboardingChecklist] = useState([
    'Document verification (Aadhaar, PAN, Degree certificates)',
    'Police verification submission',
    'Bank account details for salary',
    'PF & ESI registration',
    'Photo ID card generation',
    'System login creation',
    'Assign department & reporting manager',
    'Probation period agreement',
  ]);
  const [newChecklistItem, setNewChecklistItem] = useState('');
  const [hrLetters, setHrLetters] = useState(['Offer Letter', 'Appointment Letter', 'Confirmation Letter', 'Experience Letter', 'Relieving Letter', 'Salary Slip', 'Warning Letter', 'Termination Letter']);
  const [newHrLetter, setNewHrLetter] = useState('');
  const [appraisalStages, setAppraisalStages] = useState(['Self Assessment', 'HOD Review', 'Principal Review', 'Management Approval', 'Letter Generation']);

  return (
    <div className="space-y-4">
      <ModuleHeader title="HR & Payroll Configuration" subtitle="Departments, salary structure, pay cycle, attendance, and HR processes" theme={theme} />

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Departments" subtitle="Add or remove departments" theme={theme}>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {departments.map(d => (
              <span key={d} className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${theme.secondaryBg} text-xs font-medium ${theme.highlight}`}>
                {d}
                <button onClick={() => setDepartments(p => p.filter(x => x !== d))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={newDept} onChange={e => setNewDept(e.target.value)} placeholder="Add department..."
              className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
            <button onClick={() => { if (newDept.trim()) { setDepartments(p => [...p, newDept.trim()]); setNewDept(''); } }}
              className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={14} /></button>
          </div>
        </SectionCard>

        <SectionCard title="Designations" subtitle="Add or remove designations" theme={theme}>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {designations.map(d => (
              <span key={d} className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${theme.secondaryBg} text-xs font-medium ${theme.highlight}`}>
                {d}
                <button onClick={() => setDesignations(p => p.filter(x => x !== d))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={newDesig} onChange={e => setNewDesig(e.target.value)} placeholder="Add designation..."
              className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
            <button onClick={() => { if (newDesig.trim()) { setDesignations(p => [...p, newDesig.trim()]); setNewDesig(''); } }}
              className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={14} /></button>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Salary Structure" subtitle="Earning and deduction components — edit name, type, and percentage" theme={theme}>
        <div className="space-y-1.5">
          {salaryComponents.map((c, i) => (
            <div key={i} className={`flex items-center gap-2 p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <select value={c.type} onChange={e => { const n = [...salaryComponents]; n[i] = { ...n[i], type: e.target.value }; setSalaryComponents(n); }}
                className={`text-[9px] px-1.5 py-1 rounded font-bold ${c.type === 'earning' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'} border-0 outline-none`}>
                <option value="earning">EARN</option>
                <option value="deduction">DED</option>
              </select>
              <input value={c.name} onChange={e => { const n = [...salaryComponents]; n[i] = { ...n[i], name: e.target.value }; setSalaryComponents(n); }}
                className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-medium ${theme.highlight} outline-none`} />
              <input value={c.percentage} onChange={e => { const n = [...salaryComponents]; n[i] = { ...n[i], percentage: e.target.value }; setSalaryComponents(n); }}
                className={`w-16 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center font-bold ${theme.iconColor} outline-none`} />
              <button onClick={() => setSalaryComponents(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
            </div>
          ))}
          <button onClick={() => setSalaryComponents(p => [...p, { name: '', type: 'earning', percentage: '' }])}
            className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
            <Plus size={12} /> Add Component
          </button>
        </div>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Pay Cycle" subtitle="Payment schedule and processing" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Cycle</p>
              <SelectField options={['Monthly', 'Bi-weekly', 'Weekly']} value={payCycle} onChange={setPayCycle} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Pay Day</p>
              <SelectField options={['1st of month', '5th of month', '10th of month', 'Last working day']} value={payDay} onChange={setPayDay} theme={theme} />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Staff Attendance Methods" subtitle="How staff check-in/out is recorded daily" theme={theme}>
          <div className="space-y-2">
            {Object.entries(staffAttendance).map(([method, enabled]) => (
              <div key={method} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{method}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Biometric': 'Staff marks attendance via fingerprint or face recognition device at school entrance',
                      'Mobile App': 'Staff checks in/out using the school mobile app with GPS verification',
                      'RFID': 'Staff taps RFID card at entry point — auto-records time of arrival/departure',
                      'Manual Register': 'Traditional sign-in register maintained by admin office',
                      'Geo-fencing': 'Auto-marks attendance when staff\'s phone enters school campus geo-fence',
                    } as Record<string, string>)[method]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setStaffAttendance(p => ({ ...p, [method]: !p[method] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Staff Onboarding Checklist" subtitle="Required steps for new staff — edit or remove items" theme={theme}>
        <div className="space-y-1.5">
          {onboardingChecklist.map((item, i) => (
            <div key={i} className={`flex items-center gap-2 p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <CheckCircle size={14} className="text-emerald-500 shrink-0" />
              <input value={item} onChange={e => { const n = [...onboardingChecklist]; n[i] = e.target.value; setOnboardingChecklist(n); }}
                className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
              <button onClick={() => setOnboardingChecklist(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
            </div>
          ))}
          <div className="flex gap-2">
            <input value={newChecklistItem} onChange={e => setNewChecklistItem(e.target.value)} placeholder="Add checklist item..."
              onKeyDown={e => { if (e.key === 'Enter' && newChecklistItem.trim()) { setOnboardingChecklist(p => [...p, newChecklistItem.trim()]); setNewChecklistItem(''); } }}
              className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
            <button onClick={() => { if (newChecklistItem.trim()) { setOnboardingChecklist(p => [...p, newChecklistItem.trim()]); setNewChecklistItem(''); } }}
              className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={14} /></button>
          </div>
        </div>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="HR Letter Templates" subtitle="Add or remove letter types" theme={theme}>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {hrLetters.map(l => (
              <span key={l} className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${theme.secondaryBg} text-xs font-medium ${theme.highlight}`}>
                {l}
                <button onClick={() => setHrLetters(p => p.filter(x => x !== l))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={newHrLetter} onChange={e => setNewHrLetter(e.target.value)} placeholder="Add letter type..."
              className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
            <button onClick={() => { if (newHrLetter.trim()) { setHrLetters(p => [...p, newHrLetter.trim()]); setNewHrLetter(''); } }}
              className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={14} /></button>
          </div>
        </SectionCard>

        <SectionCard title="Performance Appraisal Stages" subtitle="Multi-level review — edit, reorder, or remove" theme={theme}>
          <div className="space-y-1.5">
            {appraisalStages.map((s, i) => (
              <div key={i} className={`flex items-center gap-2 p-2 rounded-xl ${theme.secondaryBg}`}>
                <span className={`text-[10px] w-5 h-5 rounded-full ${theme.primary} text-white flex items-center justify-center font-bold shrink-0`}>{i + 1}</span>
                <input value={s} onChange={e => { const n = [...appraisalStages]; n[i] = e.target.value; setAppraisalStages(n); }}
                  className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                <button onClick={() => setAppraisalStages(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
              </div>
            ))}
            <button onClick={() => setAppraisalStages(p => [...p, ''])}
              className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
              <Plus size={12} /> Add Stage
            </button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

// ─── TRANSPORT CONFIG MODULE ───────────────────────
function TransportConfigModule({ theme }: { theme: Theme }) {
  const [routes, setRoutes] = useState([
    { name: 'Route A', stops: '8', capacity: '40', morning: '7:00 AM', evening: '3:30 PM', driver: 'Ramesh Kumar', vehicle: 'GJ-01-AB-1234' },
    { name: 'Route B', stops: '12', capacity: '50', morning: '6:45 AM', evening: '3:45 PM', driver: 'Suresh Patel', vehicle: 'GJ-01-CD-5678' },
    { name: 'Route C', stops: '6', capacity: '30', morning: '7:15 AM', evening: '3:15 PM', driver: 'Mahesh Singh', vehicle: 'GJ-01-EF-9012' },
  ]);
  const [vehicles, setVehicles] = useState([
    { reg: 'GJ-01-AB-1234', type: 'Bus', capacity: '40', year: '2022', insurance: 'Valid till Dec 2025', gps: true },
    { reg: 'GJ-01-CD-5678', type: 'Bus', capacity: '50', year: '2021', insurance: 'Valid till Mar 2025', gps: true },
    { reg: 'GJ-01-EF-9012', type: 'Mini Bus', capacity: '30', year: '2023', insurance: 'Valid till Jun 2026', gps: true },
    { reg: 'GJ-01-GH-3456', type: 'Van', capacity: '15', year: '2023', insurance: 'Valid till Sep 2025', gps: false },
  ]);
  const [drivers, setDrivers] = useState([
    { name: 'Ramesh Kumar', phone: '98765-43210', license: 'GJ-01-2020-1234', expiry: 'Mar 2027', badge: true },
    { name: 'Suresh Patel', phone: '98765-43211', license: 'GJ-01-2019-5678', expiry: 'Dec 2026', badge: true },
    { name: 'Mahesh Singh', phone: '98765-43212', license: 'GJ-01-2021-9012', expiry: 'Jun 2028', badge: true },
  ]);
  const [transportPolicy, setTransportPolicy] = useState<'optional' | 'mandatory'>('optional');
  const [transportOperation, setTransportOperation] = useState<'in-house' | 'contract'>('in-house');
  const [contractorName, setContractorName] = useState('');
  const [feeCollectedBy, setFeeCollectedBy] = useState<'school' | 'contractor'>('school');
  const [tmCanAcceptFees, setTmCanAcceptFees] = useState(true);
  const [autoReceipt, setAutoReceipt] = useState(true);
  const [receiptPrefix, setReceiptPrefix] = useState('RCP-TRANS');
  const [feeSyncToSchool, setFeeSyncToSchool] = useState(true);
  const [ladyAttendant, setLadyAttendant] = useState(false);
  const [driverAssistant, setDriverAssistant] = useState(false);
  const [parentGpsTracking, setParentGpsTracking] = useState<'none' | 'normal' | 'premium'>('normal');
  const [premiumAlerts, setPremiumAlerts] = useState<Record<string, boolean>>({
    'Trip Start Alert': true, 'Proximity Alert (nearing stop)': true,
    'Reach School Confirmation': true, 'Student Board/Alight Alert': true,
    'Delay Alert (> 10 min late)': true, 'Route Deviation Alert': false,
  });
  const [safetyToggles, setSafetyToggles] = useState<Record<string, boolean>>({
    'GPS Live Tracking': true, 'RFID Student Tap': false,
    'Speed Alert': true, 'SOS Button in Vehicle': true,
    'CCTV Recording': false, 'Route Deviation Alert': true, 'Geo-fence Alert': true,
  });
  const [speedAlertLimit, setSpeedAlertLimit] = useState('40');
  const [feeModel, setFeeModel] = useState('route-wise');
  const [pickupPolicy, setPickupPolicy] = useState<Record<string, boolean>>({
    'Only registered guardians can pick up': true, 'OTP verification for pickup': true,
    'Photo verification at gate': false, 'Pre-registration for non-guardian pickup': true,
  });
  const [commuteTagging, setCommuteTagging] = useState(true);
  const [defaultCommuteMode, setDefaultCommuteMode] = useState('School Bus');
  const [hasTransportManager, setHasTransportManager] = useState(true);
  const [tmPermissions, setTmPermissions] = useState<Record<string, boolean>>({
    'View all routes & stops': true, 'Add/edit routes & stops': true, 'Delete routes': false,
    'View vehicle fleet': true, 'Add/edit vehicles': true, 'Delete vehicles': false,
    'View driver details': true, 'Add/edit drivers': true, 'Delete drivers': false,
    'Assign students to routes': true, 'Change student route/stop': true,
    'View transport fees': true, 'Modify transport fees': false, 'Accept/record fee payments': true,
    'View GPS tracking': true, 'Configure safety alerts': false,
    'Send notifications to parents': true, 'View attendance reports': true,
    'Export transport data': true, 'Manage pickup policies': false,
  });

  return (
    <div className="space-y-4">
      <ModuleHeader title="Transport Configuration" subtitle="Routes, vehicles, drivers, safety, and fee structure" theme={theme} />

      <SectionCard title="Transport Policy" subtitle="Define your school's student commute and transport operation policy" theme={theme}>
        <div className="space-y-4">
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Student Commute Policy</p>
            <p className={`text-[10px] ${theme.iconColor} mb-2`}>Does your school allow students to walk or use private vehicles, or is school transport mandatory for all?</p>
            <div className="flex gap-2">
              {[
                { id: 'optional' as const, label: 'Walking / Private Allowed', desc: 'Students may walk, use private vehicles, or opt for school transport' },
                { id: 'mandatory' as const, label: 'School Transport Mandatory', desc: 'All students must use school-provided transport — no walk-ins allowed' },
              ].map(opt => (
                <button key={opt.id} onClick={() => setTransportPolicy(opt.id)}
                  className={`flex-1 text-left p-3 rounded-xl border transition-all ${transportPolicy === opt.id ? `border-2 ${theme.primary} text-white` : `${theme.secondaryBg} ${theme.border}`}`}>
                  <p className={`text-xs font-bold ${transportPolicy === opt.id ? '' : theme.highlight}`}>{opt.label}</p>
                  <p className={`text-[10px] ${transportPolicy === opt.id ? 'text-white/80' : theme.iconColor}`}>{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Transport Operation Type</p>
            <p className={`text-[10px] ${theme.iconColor} mb-2`}>Is transport managed by the school directly, or outsourced to a contractor?</p>
            <div className="flex gap-2">
              {[
                { id: 'in-house' as const, label: 'In-house (School-managed)', desc: 'School owns vehicles and employs drivers directly' },
                { id: 'contract' as const, label: 'Contracted (Outsourced)', desc: 'Transport is outsourced to a third-party contractor' },
              ].map(opt => (
                <button key={opt.id} onClick={() => setTransportOperation(opt.id)}
                  className={`flex-1 text-left p-3 rounded-xl border transition-all ${transportOperation === opt.id ? `border-2 ${theme.primary} text-white` : `${theme.secondaryBg} ${theme.border}`}`}>
                  <p className={`text-xs font-bold ${transportOperation === opt.id ? '' : theme.highlight}`}>{opt.label}</p>
                  <p className={`text-[10px] ${transportOperation === opt.id ? 'text-white/80' : theme.iconColor}`}>{opt.desc}</p>
                </button>
              ))}
            </div>
            {transportOperation === 'contract' && (
              <div className="mt-3">
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Contractor Name</p>
                <InputField value={contractorName} onChange={setContractorName} theme={theme} placeholder="Enter transport contractor name" />
              </div>
            )}
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Transport Fee Collection</p>
            <p className={`text-[10px] ${theme.iconColor} mb-2`}>Who collects the transport fees from parents?</p>
            <div className="flex gap-2">
              {[
                { id: 'school' as const, label: 'School Collects', desc: 'School collects transport fees as part of the school fee invoice' },
                { id: 'contractor' as const, label: 'Contractor / Transporter Collects', desc: 'Transport provider collects fees directly from parents' },
              ].map(opt => (
                <button key={opt.id} onClick={() => setFeeCollectedBy(opt.id)}
                  className={`flex-1 text-left p-2.5 rounded-xl border transition-all ${feeCollectedBy === opt.id ? `border-2 ${theme.primary} text-white` : `${theme.secondaryBg} ${theme.border}`}`}>
                  <p className={`text-xs font-bold ${feeCollectedBy === opt.id ? '' : theme.highlight}`}>{opt.label}</p>
                  <p className={`text-[10px] ${feeCollectedBy === opt.id ? 'text-white/80' : theme.iconColor}`}>{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Transport Head — Fee Acceptance</p>
            <p className={`text-[10px] ${theme.iconColor} mb-2`}>Can the Transport Manager / Transport Head accept and record fee payments directly from parents?</p>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>Allow Transport Head to Accept Fees</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Transport Manager can record cash, UPI, cheque payments from parents and issue receipts</p>
              </div>
              <SSAToggle on={tmCanAcceptFees} onChange={() => setTmCanAcceptFees(!tmCanAcceptFees)} theme={theme} />
            </div>
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Receipt Generation</p>
            <p className={`text-[10px] ${theme.iconColor} mb-2`}>Automatically generate receipts when transport fees are recorded?</p>
            <div className="space-y-2">
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>Auto-generate Receipt</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>System generates a numbered receipt on every payment entry — printable &amp; shareable via SMS/WhatsApp</p>
                </div>
                <SSAToggle on={autoReceipt} onChange={() => setAutoReceipt(!autoReceipt)} theme={theme} />
              </div>
              {autoReceipt && (
                <div className="ml-4">
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Receipt Number Prefix</p>
                  <InputField value={receiptPrefix} onChange={setReceiptPrefix} theme={theme} placeholder="e.g. RCP-TRANS" />
                  <p className={`text-[9px] ${theme.iconColor} mt-1`}>Receipt numbers will be: {receiptPrefix}-0001, {receiptPrefix}-0002, ...</p>
                </div>
              )}
            </div>
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Fee Sync to School Fees Module</p>
            <p className={`text-[10px] ${theme.iconColor} mb-2`}>Should transport fee payments automatically sync to the main school fees module?</p>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>Sync Transport Fees → School Fees Module</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Every transport fee recorded here will automatically reflect in the school&apos;s main Fees module under &quot;Transport Fee&quot; head. Avoids double-entry.</p>
              </div>
              <SSAToggle on={feeSyncToSchool} onChange={() => setFeeSyncToSchool(!feeSyncToSchool)} theme={theme} />
            </div>
            {feeSyncToSchool && (
              <p className={`text-[9px] text-emerald-600 mt-1.5 flex items-center gap-1`}>
                <CheckCircle size={10} /> Transport fees will auto-appear under the &quot;Transport Fee&quot; head in the school&apos;s Fees module.
              </p>
            )}
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Vehicle Attendant Policy</p>
            <p className={`text-[10px] ${theme.iconColor} mb-2`}>Does your school provide attendants along with the driver in school vehicles?</p>
            <div className="space-y-2">
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>Lady Attendant</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>A female attendant accompanies students on the bus for safety (recommended for younger students)</p>
                </div>
                <SSAToggle on={ladyAttendant} onChange={() => setLadyAttendant(!ladyAttendant)} theme={theme} />
              </div>
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>Driver Assistant</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>A helper/assistant accompanies the driver to manage boarding, alighting, and discipline</p>
                </div>
                <SSAToggle on={driverAssistant} onChange={() => setDriverAssistant(!driverAssistant)} theme={theme} />
              </div>
            </div>
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Parent GPS Tracking Level</p>
            <p className={`text-[10px] ${theme.iconColor} mb-2`}>What level of GPS tracking do you provide to parents via the app?</p>
            <div className="flex gap-2">
              {[
                { id: 'none' as const, label: 'No Tracking', desc: 'Parents do not get GPS tracking access' },
                { id: 'normal' as const, label: 'Normal Tracking', desc: 'Parents see live bus location on map' },
                { id: 'premium' as const, label: 'Premium Tracking', desc: 'Live location + alerts (trip start, proximity, attendance)' },
              ].map(opt => (
                <button key={opt.id} onClick={() => setParentGpsTracking(opt.id)}
                  className={`flex-1 text-left p-2.5 rounded-xl border transition-all ${parentGpsTracking === opt.id ? `border-2 ${theme.primary} text-white` : `${theme.secondaryBg} ${theme.border}`}`}>
                  <p className={`text-xs font-bold ${parentGpsTracking === opt.id ? '' : theme.highlight}`}>{opt.label}</p>
                  <p className={`text-[10px] ${parentGpsTracking === opt.id ? 'text-white/80' : theme.iconColor}`}>{opt.desc}</p>
                </button>
              ))}
            </div>
            <div className="mt-3">
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Premium Alert Types {parentGpsTracking !== 'premium' && <span className="text-amber-500">(Premium feature)</span>}</p>
              <div className={`grid grid-cols-2 gap-1.5 ${parentGpsTracking !== 'premium' ? 'opacity-60' : ''}`}>
                {Object.entries(premiumAlerts).map(([alert, enabled]) => (
                  <div key={alert} className={`flex items-center justify-between p-2 rounded-xl ${theme.secondaryBg} cursor-pointer group relative`}>
                    <span className={`text-[11px] ${theme.highlight}`}>{alert}</span>
                    <SSAToggle on={parentGpsTracking === 'premium' ? enabled : false}
                      onChange={() => { if (parentGpsTracking === 'premium') { setPremiumAlerts(p => ({ ...p, [alert]: !p[alert] })); } }} theme={theme} />
                    {parentGpsTracking !== 'premium' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-amber-50/80 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[9px] font-bold text-amber-700">Premium feature — contact saaras.in</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {parentGpsTracking !== 'premium' && (
                <p className={`text-[10px] text-amber-600 mt-2 flex items-center gap-1`}>
                  <AlertTriangle size={10} /> Select &quot;Premium Tracking&quot; above to enable these alerts, or contact saaras.in for details.
                </p>
              )}
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Routes" subtitle="Bus routes — assign drivers and vehicles from dropdowns (B2)" theme={theme}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Route', 'Stops', 'Capacity', 'Morning', 'Evening', 'Driver', 'Vehicle', ''].map(h => (
                <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {routes.map((r, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  {(['name', 'stops', 'capacity', 'morning', 'evening'] as const).map(field => (
                    <td key={field} className="px-1 py-1.5">
                      <input value={r[field]} onChange={e => { const n = [...routes]; n[i] = { ...n[i], [field]: e.target.value }; setRoutes(n); }}
                        className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${field === 'name' ? `font-bold ${theme.highlight}` : theme.highlight} outline-none`} />
                    </td>
                  ))}
                  {/* B2: Driver dropdown */}
                  <td className="px-1 py-1.5">
                    <select value={r.driver} onChange={e => { const n = [...routes]; n[i] = { ...n[i], driver: e.target.value }; setRoutes(n); }}
                      className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                      <option value="">Assign Driver</option>
                      {drivers.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
                    </select>
                  </td>
                  {/* B2: Vehicle dropdown */}
                  <td className="px-1 py-1.5">
                    <select value={r.vehicle} onChange={e => { const n = [...routes]; n[i] = { ...n[i], vehicle: e.target.value }; setRoutes(n); }}
                      className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                      <option value="">Assign Vehicle</option>
                      {vehicles.map(v => <option key={v.reg} value={v.reg}>{v.reg} ({v.type})</option>)}
                    </select>
                  </td>
                  <td className="px-1 py-1.5"><button onClick={() => setRoutes(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={12} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={() => setRoutes(p => [...p, { name: '', stops: '', capacity: '', morning: '', evening: '', driver: '', vehicle: '' }])}
          className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl mt-2`}>
          <Plus size={12} /> Add Route
        </button>
      </SectionCard>

      <SectionCard title="Vehicle Fleet" subtitle="Insurance/PUC expiry within 30 days is highlighted in red (B2)" theme={theme}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Registration', 'Type', 'Capacity', 'Year', 'Insurance Expiry', 'Route', 'GPS', ''].map(h => (
                <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {vehicles.map((v, i) => {
                // B2: Check if insurance is expiring soon
                const insText = v.insurance.toLowerCase();
                const isExpiringSoon = insText.includes('mar 2025') || insText.includes('feb 2026') || insText.includes('mar 2026');
                const isExpired = insText.includes('dec 2025') || insText.includes('mar 2025') || insText.includes('sep 2025');
                const assignedRoute = routes.find(r => r.vehicle === v.reg);
                return (
                <tr key={i} className={`border-t ${theme.border} ${isExpired ? 'bg-red-50/50' : ''}`}>
                  {(['reg', 'type', 'capacity', 'year'] as const).map(field => (
                    <td key={field} className="px-1 py-1.5">
                      <input value={v[field]} onChange={e => { const n = [...vehicles]; n[i] = { ...n[i], [field]: e.target.value }; setVehicles(n); }}
                        className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                    </td>
                  ))}
                  <td className="px-1 py-1.5">
                    <div className="flex flex-col">
                      <input value={v.insurance} onChange={e => { const n = [...vehicles]; n[i] = { ...n[i], insurance: e.target.value }; setVehicles(n); }}
                        className={`w-full px-1.5 py-1 rounded-lg border ${isExpired ? 'border-red-400 bg-red-50' : isExpiringSoon ? 'border-amber-400 bg-amber-50' : `${theme.border} ${theme.inputBg}`} text-xs ${theme.highlight} outline-none`} />
                      {isExpired && <span className="text-[7px] text-red-600 font-bold mt-0.5 flex items-center gap-0.5"><AlertTriangle size={7} /> EXPIRED</span>}
                      {isExpiringSoon && !isExpired && <span className="text-[7px] text-amber-600 font-bold mt-0.5 flex items-center gap-0.5"><AlertTriangle size={7} /> Expiring soon</span>}
                    </div>
                  </td>
                  {/* B2: Route assignment display */}
                  <td className="px-1 py-1.5">
                    <span className={`text-[10px] ${assignedRoute ? theme.highlight : theme.iconColor}`}>
                      {assignedRoute ? assignedRoute.name : 'Unassigned'}
                    </span>
                  </td>
                  <td className="px-2 py-1.5"><SSAToggle on={v.gps} onChange={() => { const n = [...vehicles]; n[i] = { ...n[i], gps: !n[i].gps }; setVehicles(n); }} theme={theme} /></td>
                  <td className="px-1 py-1.5"><button onClick={() => setVehicles(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={12} /></button></td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <button onClick={() => setVehicles(p => [...p, { reg: '', type: 'Bus', capacity: '', year: '', insurance: '', gps: true }])}
          className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl mt-2`}>
          <Plus size={12} /> Add Vehicle
        </button>
      </SectionCard>

      <SectionCard title="Driver Details" subtitle="Click any field to edit, toggle badge, X to delete" theme={theme}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Name', 'Phone', 'License No.', 'License Expiry', 'Badge', ''].map(h => (
                <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {drivers.map((d, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  {(['name', 'phone', 'license', 'expiry'] as const).map(field => (
                    <td key={field} className="px-1 py-1.5">
                      <input value={d[field]} onChange={e => { const n = [...drivers]; n[i] = { ...n[i], [field]: e.target.value }; setDrivers(n); }}
                        className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                    </td>
                  ))}
                  <td className="px-2 py-1.5"><SSAToggle on={d.badge} onChange={() => { const n = [...drivers]; n[i] = { ...n[i], badge: !n[i].badge }; setDrivers(n); }} theme={theme} /></td>
                  <td className="px-1 py-1.5"><button onClick={() => setDrivers(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={12} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={() => setDrivers(p => [...p, { name: '', phone: '', license: '', expiry: '', badge: true }])}
          className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl mt-2`}>
          <Plus size={12} /> Add Driver
        </button>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Tracking &amp; Safety" subtitle="Safety features and alerts for school transport" theme={theme}>
          <div className="space-y-2">
            {Object.entries(safetyToggles).map(([feature, enabled]) => (
              <div key={feature} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{feature}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'GPS Live Tracking': 'Track real-time location of all school vehicles on a live map',
                      'Parent App Tracking': 'Parents can see their child\'s bus location and ETA on their mobile app',
                      'RFID Student Tap': 'Students tap RFID card when boarding/alighting — auto-notifies parents',
                      'Speed Alert': 'Alert admin when vehicle exceeds the set speed limit in school zones',
                      'SOS Button in Vehicle': 'Emergency panic button in each vehicle — triggers instant alert to admin & parents',
                      'CCTV Recording': 'In-vehicle CCTV cameras record footage during all trips',
                      'Route Deviation Alert': 'Alert when a vehicle deviates from its assigned route',
                      'Geo-fence Alert': 'Alert when a vehicle enters or exits a defined geo-fence zone (e.g., school campus)',
                    } as Record<string, string>)[feature]
                  }</p>
                  {feature === 'Speed Alert' && enabled && (
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={`text-[10px] font-bold ${theme.iconColor}`}>Limit:</span>
                      <input value={speedAlertLimit} onChange={e => setSpeedAlertLimit(e.target.value.replace(/\D/g, ''))}
                        className={`w-16 px-2 py-0.5 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none text-center`} />
                      <span className={`text-[10px] ${theme.iconColor}`}>kmph in school zone</span>
                    </div>
                  )}
                </div>
                <SSAToggle on={enabled} onChange={() => setSafetyToggles(p => ({ ...p, [feature]: !p[feature] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>

        <div className="space-y-4">
          <SectionCard title="Transport Fee Model" subtitle="How transport fees are calculated" theme={theme}>
            <div className="space-y-2">
              {[
                { id: 'flat', name: 'Flat Rate', desc: 'Same fee for all routes — simplest to manage' },
                { id: 'route-wise', name: 'Route-wise', desc: 'Different fee per route based on route length/area' },
                { id: 'route-stop-wise', name: 'Route + Stop-wise', desc: 'Fee varies per stop on each route — closer stops pay less, farther stops pay more' },
                { id: 'distance-based', name: 'Distance-based', desc: 'Fee calculated by km distance of student\'s stop from school' },
              ].map(m => (
                <button key={m.id} onClick={() => setFeeModel(m.id)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all ${feeModel === m.id ? `border-2 ${theme.primary} text-white` : `${theme.secondaryBg} ${theme.border}`}`}>
                  <p className={`text-xs font-bold ${feeModel === m.id ? '' : theme.highlight}`}>{m.name}</p>
                  <p className={`text-[10px] ${feeModel === m.id ? 'text-white/80' : theme.iconColor}`}>{m.desc}</p>
                </button>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Pickup Policies" subtitle="Student pickup verification rules at dismissal" theme={theme}>
            <div className="space-y-2">
              {Object.entries(pickupPolicy).map(([policy, enabled]) => (
                <div key={policy} className={`flex items-center justify-between p-2 rounded-xl ${theme.secondaryBg}`}>
                  <div className="flex-1 mr-3">
                    <p className={`text-[11px] font-bold ${theme.highlight}`}>{policy}</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>{
                      ({
                        'Only registered guardians can pick up': 'Only guardians listed in the student profile can collect the child',
                        'OTP verification for pickup': 'Guardian must enter a one-time password at gate before child is released',
                        'Photo verification at gate': 'Gate staff verifies guardian photo from student profile before releasing child',
                        'Pre-registration for non-guardian pickup': 'If someone other than registered guardian picks up, parent must pre-register them via app',
                      } as Record<string, string>)[policy]
                    }</p>
                  </div>
                  <SSAToggle on={enabled} onChange={() => setPickupPolicy(p => ({ ...p, [policy]: !p[policy] }))} theme={theme} />
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>

      <SectionCard title="Student Commute Tagging" subtitle="Tag how each student commutes to school" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Tag Students as Walk-in / Transport</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Enables commute-mode field on each student profile</p>
            </div>
            <SSAToggle on={commuteTagging} onChange={() => setCommuteTagging(!commuteTagging)} theme={theme} />
          </div>
          {commuteTagging && (
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Default Commute Mode</p>
              <SelectField options={['Walk-in', 'School Bus', 'Private Vehicle']} value={defaultCommuteMode} onChange={setDefaultCommuteMode} theme={theme} />
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Transport Manager Permissions" subtitle="Define what the Transport Manager role can access and modify" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Transport Manager Role</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Enable a dedicated Transport Manager role with configurable permissions</p>
            </div>
            <SSAToggle on={hasTransportManager} onChange={() => setHasTransportManager(!hasTransportManager)} theme={theme} />
          </div>
          {hasTransportManager && (
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>CRUD Permissions — toggle what the Transport Manager can do</p>
              <div className="grid grid-cols-2 gap-1.5">
                {Object.entries(tmPermissions).map(([perm, enabled]) => (
                  <div key={perm} className={`flex items-center justify-between p-2 rounded-xl ${theme.secondaryBg}`}>
                    <span className={`text-[11px] ${theme.highlight}`}>{perm}</span>
                    <SSAToggle on={enabled} onChange={() => setTmPermissions(p => ({ ...p, [perm]: !p[perm] }))} theme={theme} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </SectionCard>
    </div>
  );
}

// ─── ATTENDANCE CONFIG MODULE ──────────────────────
function AttendanceConfigModule({ theme }: { theme: Theme }) {
  const [markingMethods, setMarkingMethods] = useState<Record<string, boolean>>({
    'Biometric (Fingerprint/Face)': true, 'Mobile App (Teacher)': true, 'RFID Card': false,
    'Manual Register': true, 'QR Code Scan': false,
  });
  const [frequency, setFrequency] = useState('daily');
  const [gracePeriod, setGracePeriod] = useState('15');
  const [halfDayCutoff, setHalfDayCutoff] = useState('11:30');
  const [absentThreshold, setAbsentThreshold] = useState('3');
  const [autoNotify, setAutoNotify] = useState<Record<string, boolean>>({
    'Notify parent on absence (immediate)': true,
    'Notify parent on late arrival': true,
    'Weekly attendance summary to parents': true,
    'Alert class teacher if absent > 3 consecutive days': true,
    'Alert principal if attendance < 75%': true,
    'Auto-mark absent if not marked by 10 AM': false,
  });
  const [attendanceTypes, setAttendanceTypes] = useState<Record<string, boolean>>({
    'Present': true, 'Absent': true, 'Late': true, 'Half-Day': true,
    'Medical Leave': true, 'On-Duty': true, 'Excused': false,
  });
  const [allowCustomAttendanceTypes, setAllowCustomAttendanceTypes] = useState(false);

  return (
    <div className="space-y-4">
      <ModuleHeader title="Attendance Configuration" subtitle="Marking methods, frequency, grace periods, and notification rules" theme={theme} />

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Marking Methods" subtitle="How student attendance is recorded each day" theme={theme}>
          <div className="space-y-2">
            {Object.entries(markingMethods).map(([method, enabled]) => (
              <div key={method} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{method}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Biometric (Fingerprint/Face)': 'Students mark attendance via biometric device at school entrance',
                      'Mobile App (Teacher)': 'Class teacher marks attendance from their mobile app during first period',
                      'RFID Card': 'Students tap RFID card at school gate — auto-records entry/exit time',
                      'Manual Register': 'Traditional paper-based attendance register maintained by class teacher',
                      'QR Code Scan': 'Students scan a QR code displayed in classroom to mark their presence',
                    } as Record<string, string>)[method]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setMarkingMethods(p => ({ ...p, [method]: !p[method] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Frequency &amp; Timing" subtitle="When and how often attendance is marked" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Marking Frequency</p>
              <SelectField options={['daily', 'twice-daily', 'period-wise']} value={frequency} onChange={setFrequency} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Grace Period for Late (minutes)</p>
              <InputField value={gracePeriod} onChange={setGracePeriod} theme={theme} type="number" />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Half-Day Cutoff Time</p>
              <InputField value={halfDayCutoff} onChange={setHalfDayCutoff} theme={theme} type="time" />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Consecutive Absent Days for Alert</p>
              <InputField value={absentThreshold} onChange={setAbsentThreshold} theme={theme} type="number" />
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Auto-Notification Rules" subtitle="Automated alerts sent to parents and staff based on attendance events" theme={theme}>
        <div className="space-y-2">
          {Object.entries(autoNotify).map(([rule, enabled]) => (
            <div key={rule} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>{rule}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{
                  ({
                    'Notify parent on absence (immediate)': 'Parents receive instant SMS/app notification when their child is marked absent',
                    'Notify parent on late arrival': 'Parents are notified when their child arrives after the grace period',
                    'Weekly attendance summary to parents': 'Parents receive a weekly digest showing their child\'s attendance for the week',
                    'Alert class teacher if absent > 3 consecutive days': 'Class teacher gets an alert when a student is absent for 3+ consecutive days',
                    'Alert principal if attendance < 75%': 'Principal is notified when any student\'s attendance drops below 75%',
                    'Auto-mark absent if not marked by 10 AM': 'System automatically marks students as absent if teacher hasn\'t marked attendance by 10 AM',
                  } as Record<string, string>)[rule]
                }</p>
              </div>
              <SSAToggle on={enabled} onChange={() => setAutoNotify(p => ({ ...p, [rule]: !p[rule] }))} theme={theme} />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Attendance Types" subtitle="Named attendance statuses available to teachers when marking attendance" theme={theme}>
        <div className="space-y-2">
          {Object.entries(attendanceTypes).map(([type, enabled]) => (
            <div key={type} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>{type}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{
                  ({
                    'Present': 'Student is present in class for the full day',
                    'Absent': 'Student did not attend school at all',
                    'Late': 'Student arrived after the grace period — counts as present but flagged',
                    'Half-Day': 'Student attended only half the school day (morning or afternoon)',
                    'Medical Leave': 'Absent due to illness — requires medical certificate for extended leave',
                    'On-Duty': 'Student is absent from class but on official school duty (sports, events, etc.)',
                    'Excused': 'Pre-approved absence (family event, religious observance, etc.)',
                  } as Record<string, string>)[type]
                }</p>
              </div>
              <SSAToggle on={enabled} onChange={() => setAttendanceTypes(p => ({ ...p, [type]: !p[type] }))} theme={theme} />
            </div>
          ))}
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Allow Custom Types</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Let school admins define additional attendance statuses</p>
            </div>
            <SSAToggle on={allowCustomAttendanceTypes} onChange={() => setAllowCustomAttendanceTypes(!allowCustomAttendanceTypes)} theme={theme} />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

// ─── EXAM & GRADING CONFIG MODULE ──────────────────
function ExamConfigModule({ theme }: { theme: Theme }) {
  const [gradingSystem, setGradingSystem] = useState('cbse');
  const [gradeBoundaries, setGradeBoundaries] = useState([
    { grade: 'A1', min: '91', max: '100', gp: '10' },
    { grade: 'A2', min: '81', max: '90', gp: '9' },
    { grade: 'B1', min: '71', max: '80', gp: '8' },
    { grade: 'B2', min: '61', max: '70', gp: '7' },
    { grade: 'C1', min: '51', max: '60', gp: '6' },
    { grade: 'C2', min: '41', max: '50', gp: '5' },
    { grade: 'D', min: '33', max: '40', gp: '4' },
    { grade: 'E (Fail)', min: '0', max: '32', gp: '0' },
  ]);
  const [reportTemplate, setReportTemplate] = useState('cbse-standard');
  const [examSchedule, setExamSchedule] = useState([
    { exam: 'Unit Test 1', startDate: '15 Jun', endDate: '20 Jun', classes: 'All', status: 'Completed' },
    { exam: 'Unit Test 2', startDate: '25 Aug', endDate: '30 Aug', classes: 'All', status: 'Completed' },
    { exam: 'Half Yearly', startDate: '01 Oct', endDate: '15 Oct', classes: 'All', status: 'Upcoming' },
    { exam: 'Unit Test 3', startDate: '10 Dec', endDate: '15 Dec', classes: 'All', status: 'Scheduled' },
    { exam: 'Annual Exam', startDate: '01 Mar', endDate: '15 Mar', classes: 'All', status: 'Scheduled' },
  ]);
  const [rankDisplay, setRankDisplay] = useState<Record<string, boolean>>({
    'Show class rank': true, 'Show section rank': true, 'Show percentile': false,
    'Show subject-wise rank': false, 'Show grade distribution graph': true,
  });
  const [examTypes, setExamTypes] = useState([
    { name: 'Unit Test 1', weight: '10', schedule: 'Term 1', duration: '1 hr', active: true },
    { name: 'Unit Test 2', weight: '10', schedule: 'Term 1', duration: '1 hr', active: true },
    { name: 'Half Yearly', weight: '30', schedule: 'Term 1', duration: '3 hrs', active: true },
    { name: 'Unit Test 3', weight: '10', schedule: 'Term 2', duration: '1 hr', active: true },
    { name: 'Unit Test 4', weight: '10', schedule: 'Term 2', duration: '1 hr', active: true },
    { name: 'Annual / Final', weight: '30', schedule: 'Both', duration: '3 hrs', active: true },
  ]);
  const [reportFields, setReportFields] = useState<Record<string, boolean>>({
    'Student Photo': true, 'Attendance %': true, 'Teacher Remarks': true, 'Principal Signature': true,
    'Co-Scholastic Grades': true, 'Discipline Grade': true, 'Health & Physical Education': true,
    'House Points': false, 'Class Rank': false, 'Parent Signature Line': false,
  });
  const [reportGradingMode, setReportGradingMode] = useState('Both');
  const [showReportPreview, setShowReportPreview] = useState(false);

  return (
    <div className="space-y-4">
      <ModuleHeader title="Exams & Grading Configuration" subtitle="Grading system, grade boundaries, report cards, and exam schedules" theme={theme} />

      <SectionCard title="Grading System" subtitle="Select the grading methodology" theme={theme}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {[
            { id: 'marks', name: 'Marks Only' },
            { id: 'grades', name: 'Grades Only' },
            { id: 'both', name: 'Marks + Grades' },
            { id: 'cbse', name: 'CBSE CCE Pattern' },
          ].map(g => (
            <button key={g.id} onClick={() => setGradingSystem(g.id)}
              className={`p-2.5 rounded-xl text-xs font-bold transition-all ${gradingSystem === g.id ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.highlight}`}`}>
              {g.name}
            </button>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Grade Boundaries" subtitle="Edit grade name, marks, and grade points — overlapping ranges are highlighted in red" theme={theme}>
        {/* B5: Overlap detection */}
        {(() => {
          const overlaps: number[] = [];
          gradeBoundaries.forEach((g, i) => {
            const gMin = parseInt(g.min); const gMax = parseInt(g.max);
            if (isNaN(gMin) || isNaN(gMax)) return;
            gradeBoundaries.forEach((g2, j) => {
              if (i >= j) return;
              const g2Min = parseInt(g2.min); const g2Max = parseInt(g2.max);
              if (isNaN(g2Min) || isNaN(g2Max)) return;
              if (gMin <= g2Max && g2Min <= gMax) { if (!overlaps.includes(i)) overlaps.push(i); if (!overlaps.includes(j)) overlaps.push(j); }
            });
          });
          return (
            <>
              {overlaps.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-2 flex items-start gap-1.5 mb-3">
                  <AlertTriangle size={12} className="text-red-500 mt-0.5 shrink-0" />
                  <p className="text-[10px] text-red-700 font-bold">Overlapping grade ranges detected! Rows highlighted in red have mark ranges that overlap with other grades.</p>
                </div>
              )}
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead><tr className={theme.secondaryBg}>
                    {['Grade', 'Min Marks', 'Max Marks', 'Grade Points', ''].map(h => (
                      <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor}`}>{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {gradeBoundaries.map((g, i) => {
                      const hasOverlap = overlaps.includes(i);
                      return (
                      <tr key={i} className={`border-t ${hasOverlap ? 'bg-red-50 border-red-200' : theme.border}`}>
                        <td className="px-2 py-1.5">
                          <input value={g.grade} onChange={e => { const n = [...gradeBoundaries]; n[i] = { ...n[i], grade: e.target.value }; setGradeBoundaries(n); }}
                            className={`w-20 px-2 py-1 rounded-lg border ${hasOverlap ? 'border-red-400' : theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                        </td>
                        <td className="px-2 py-1.5">
                          <input value={g.min} onChange={e => { const n = [...gradeBoundaries]; n[i] = { ...n[i], min: e.target.value }; setGradeBoundaries(n); }}
                            className={`w-16 px-2 py-1 rounded-lg border ${hasOverlap ? 'border-red-400' : theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                        </td>
                        <td className="px-2 py-1.5">
                          <input value={g.max} onChange={e => { const n = [...gradeBoundaries]; n[i] = { ...n[i], max: e.target.value }; setGradeBoundaries(n); }}
                            className={`w-16 px-2 py-1 rounded-lg border ${hasOverlap ? 'border-red-400' : theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                        </td>
                        <td className="px-2 py-1.5">
                          <input value={g.gp} onChange={e => { const n = [...gradeBoundaries]; n[i] = { ...n[i], gp: e.target.value }; setGradeBoundaries(n); }}
                            className={`w-16 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                        </td>
                        <td className="px-2 py-1.5"><button onClick={() => setGradeBoundaries(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={12} /></button></td>
                      </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          );
        })()}
        <button onClick={() => setGradeBoundaries(p => [...p, { grade: '', min: '', max: '', gp: '' }])}
          className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl mt-2`}>
          <Plus size={12} /> Add Grade
        </button>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Report Card Template" subtitle="Select template for printing" theme={theme}>
          <div className="space-y-2">
            {['cbse-standard', 'icse-format', 'state-board', 'custom'].map(t => (
              <button key={t} onClick={() => setReportTemplate(t)}
                className={`w-full text-left p-2.5 rounded-xl border transition-all ${reportTemplate === t ? `border-2 ${theme.primary} text-white` : `${theme.secondaryBg} ${theme.border}`}`}>
                <p className={`text-xs font-bold capitalize ${reportTemplate === t ? '' : theme.highlight}`}>{t.replace('-', ' ')}</p>
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Rank Display Options" subtitle="Control what ranking information appears on student report cards" theme={theme}>
          <div className="space-y-2">
            {Object.entries(rankDisplay).map(([opt, enabled]) => (
              <div key={opt} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{opt}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Show class rank': 'Display student\'s rank among all students in their class (e.g., 5th out of 40)',
                      'Show section rank': 'Display student\'s rank within their specific section (e.g., 3rd in Section A)',
                      'Show percentile': 'Show the percentile score indicating performance relative to peers',
                      'Show subject-wise rank': 'Show individual rank for each subject alongside the overall rank',
                      'Show grade distribution graph': 'Include a visual bar chart showing how grades are distributed across the class',
                    } as Record<string, string>)[opt]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setRankDisplay(p => ({ ...p, [opt]: !p[opt] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Exam Schedule" subtitle="Click to edit exam details. Overlapping date ranges are flagged with a warning." theme={theme}>
        {/* B5: Schedule overlap detection */}
        {(() => {
          const scheduleOverlaps: number[] = [];
          examSchedule.forEach((ex, i) => {
            examSchedule.forEach((ex2, j) => {
              if (i >= j) return;
              if (ex.startDate && ex.endDate && ex2.startDate && ex2.endDate && ex.classes === ex2.classes) {
                // Simple string comparison for demo (month-day format)
                if (ex.startDate <= ex2.endDate && ex2.startDate <= ex.endDate) {
                  if (!scheduleOverlaps.includes(i)) scheduleOverlaps.push(i);
                  if (!scheduleOverlaps.includes(j)) scheduleOverlaps.push(j);
                }
              }
            });
          });
          return scheduleOverlaps.length > 0 ? (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-2 flex items-start gap-1.5 mb-3">
              <AlertTriangle size={12} className="text-amber-500 mt-0.5 shrink-0" />
              <p className="text-[10px] text-amber-700 font-bold">Warning: Some exam date ranges overlap for the same class group. Check highlighted rows.</p>
            </div>
          ) : null;
        })()}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Exam', 'Start', 'End', 'Classes', 'Status', ''].map(h => (
                <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {examSchedule.map((ex, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className="px-1 py-1.5">
                    <input value={ex.exam} onChange={e => { const n = [...examSchedule]; n[i] = { ...n[i], exam: e.target.value }; setExamSchedule(n); }}
                      className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-1 py-1.5">
                    <input value={ex.startDate} onChange={e => { const n = [...examSchedule]; n[i] = { ...n[i], startDate: e.target.value }; setExamSchedule(n); }}
                      className={`w-20 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-1 py-1.5">
                    <input value={ex.endDate} onChange={e => { const n = [...examSchedule]; n[i] = { ...n[i], endDate: e.target.value }; setExamSchedule(n); }}
                      className={`w-20 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-1 py-1.5">
                    <input value={ex.classes} onChange={e => { const n = [...examSchedule]; n[i] = { ...n[i], classes: e.target.value }; setExamSchedule(n); }}
                      className={`w-16 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-1 py-1.5">
                    <select value={ex.status} onChange={e => { const n = [...examSchedule]; n[i] = { ...n[i], status: e.target.value }; setExamSchedule(n); }}
                      className={`px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] font-bold ${theme.highlight}`}>
                      <option value="Scheduled">Scheduled</option>
                      <option value="Upcoming">Upcoming</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td className="px-1 py-1.5"><button onClick={() => setExamSchedule(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={12} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={() => setExamSchedule(p => [...p, { exam: '', startDate: '', endDate: '', classes: 'All', status: 'Scheduled' }])}
          className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl mt-2`}>
          <Plus size={12} /> Add Exam
        </button>
      </SectionCard>

      <SectionCard title="Exam Types" subtitle="Define exam types with weightage and scheduling — total weight should sum to 100%" theme={theme}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Type Name', 'Weight (%)', 'Schedule', 'Duration', 'Status', ''].map(h => (
                <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {examTypes.map((et, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className="px-2 py-1.5">
                    <input value={et.name} onChange={e => { const n = [...examTypes]; n[i] = { ...n[i], name: e.target.value }; setExamTypes(n); }}
                      className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <input value={et.weight} onChange={e => { const n = [...examTypes]; n[i] = { ...n[i], weight: e.target.value }; setExamTypes(n); }}
                      className={`w-14 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <select value={et.schedule} onChange={e => { const n = [...examTypes]; n[i] = { ...n[i], schedule: e.target.value }; setExamTypes(n); }}
                      className={`px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] font-bold ${theme.highlight}`}>
                      <option value="Term 1">Term 1</option><option value="Term 2">Term 2</option><option value="Both">Both</option>
                    </select>
                  </td>
                  <td className="px-2 py-1.5">
                    <input value={et.duration} onChange={e => { const n = [...examTypes]; n[i] = { ...n[i], duration: e.target.value }; setExamTypes(n); }}
                      className={`w-16 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <SSAToggle on={et.active} onChange={() => { const n = [...examTypes]; n[i] = { ...n[i], active: !n[i].active }; setExamTypes(n); }} theme={theme} />
                  </td>
                  <td className="px-2 py-1.5"><button onClick={() => setExamTypes(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={12} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* B5: Weightage check */}
        {(() => {
          const total = examTypes.filter(e => e.active).reduce((s, e) => s + (parseInt(e.weight) || 0), 0);
          const isValid = total === 100;
          return (
            <div className="flex items-center justify-between mt-2">
              <button onClick={() => setExamTypes(p => [...p, { name: '', weight: '0', schedule: 'Term 1', duration: '1 hr', active: true }])}
                className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
                <Plus size={12} /> Add Exam Type
              </button>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold ${isValid ? 'text-emerald-600' : 'text-red-600'}`}>
                  Total Weight: {total}%
                  {isValid ? ' \u2713' : ''}
                </span>
                {!isValid && (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-red-50 border border-red-200">
                    <AlertTriangle size={10} className="text-red-500" />
                    <span className="text-[9px] text-red-600 font-bold">{total > 100 ? `Exceeds 100% by ${total - 100}%` : `Missing ${100 - total}% — must total 100%`}</span>
                  </span>
                )}
              </div>
            </div>
          );
        })()}
      </SectionCard>

      <SectionCard title="Report Card Template Fields" subtitle="Toggle which fields appear on the printed report card" theme={theme}>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 mb-3">
          {Object.entries(reportFields).map(([field, enabled]) => (
            <div key={field} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <span className={`text-xs font-medium ${theme.highlight}`}>{field}</span>
              <SSAToggle on={enabled} onChange={() => setReportFields(p => ({ ...p, [field]: !p[field] }))} theme={theme} />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mb-3">
          <div className="flex-1">
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Grading Display on Report</p>
            <SelectField options={['Marks', 'Grades', 'Both']} value={reportGradingMode} onChange={setReportGradingMode} theme={theme} />
          </div>
          <button onClick={() => setShowReportPreview(!showReportPreview)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold ${theme.primary} text-white`}>
            <Eye size={14} /> {showReportPreview ? 'Hide Preview' : 'Preview Template'}
          </button>
        </div>
        {showReportPreview && (
          <div className={`p-4 rounded-xl border-2 ${theme.border} ${theme.secondaryBg}`}>
            <div className="text-center mb-3">
              <p className={`text-sm font-bold ${theme.highlight}`}>Saaras International School</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Progress Report 2025-26</p>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {reportFields['Student Photo'] && <div className={`w-12 h-14 rounded-lg ${theme.cardBg} border ${theme.border} flex items-center justify-center`}><UserCircle size={20} className={theme.iconColor} /></div>}
              <div className="col-span-2 space-y-1">
                <p className={`text-[10px] ${theme.highlight}`}><strong>Name:</strong> Aarav Sharma</p>
                <p className={`text-[10px] ${theme.highlight}`}><strong>Class:</strong> 8-A &nbsp; <strong>Roll:</strong> 12</p>
                {reportFields['Attendance %'] && <p className={`text-[10px] ${theme.highlight}`}><strong>Attendance:</strong> 94%</p>}
              </div>
            </div>
            <div className={`text-[9px] ${theme.iconColor} border-t ${theme.border} pt-2 space-y-1`}>
              <p>Maths: 85 {reportGradingMode !== 'Marks' && '(A2)'} | Science: 78 {reportGradingMode !== 'Marks' && '(B1)'} | English: 92 {reportGradingMode !== 'Marks' && '(A1)'}</p>
              {reportFields['Co-Scholastic Grades'] && <p>Co-Scholastic: Art (A) | Music (B) | Sports (A)</p>}
              {reportFields['Discipline Grade'] && <p>Discipline: A</p>}
              {reportFields['Teacher Remarks'] && <p className="italic">Remarks: Excellent student with consistent performance.</p>}
              {reportFields['Class Rank'] && <p>Class Rank: 5/40</p>}
              {reportFields['Principal Signature'] && <p className="mt-2 text-right">_______________<br/>Principal</p>}
              {reportFields['Parent Signature Line'] && <p className="mt-1 text-left">_______________<br/>Parent Signature</p>}
            </div>
          </div>
        )}
      </SectionCard>
    </div>
  );
}

// ─── COMMUNICATION CONFIG MODULE ───────────────────
function CommunicationConfigModule({ theme }: { theme: Theme }) {
  const [dmPermissions, setDmPermissions] = useState<Record<string, boolean>>({
    'Parent to Class Teacher': true,
    'Parent to Subject Teacher': false,
    'Parent to Principal': false,
    'Parent to Admin': true,
    'Teacher to Parent': true,
    'Teacher to Teacher': true,
    'Teacher to Principal': true,
    'Student to Teacher (Sr. Sec only)': false,
    'Staff to HR': true,
    'Anyone to Transport Helpdesk': true,
  });
  const [parentMode, setParentMode] = useState('reply-only');
  const [groupPerms, setGroupPerms] = useState<Record<string, boolean>>({
    'Admin can create any group': true,
    'Principal can create any group': true,
    'Teacher can create class groups': true,
    'Teacher can create subject groups': true,
    'Parent can create groups': false,
    'Student can create groups': false,
  });
  const [autoGroups, setAutoGroups] = useState([
    'Class-wise Parent Groups (auto per section)',
    'Subject Teacher Groups',
    'Staff Announcements',
    'Transport Route Groups',
    'PTA Group',
    'Management Group',
  ]);
  const [newAutoGroup, setNewAutoGroup] = useState('');
  const [chatStorage, setChatStorage] = useState<Record<string, string>>({
    'Message retention': '1 year',
    'File storage per user': '500 MB',
    'Max file size': '25 MB',
    'Allowed file types': 'PDF, DOC, JPG, PNG, MP4',
  });
  const [fileSharing, setFileSharing] = useState<Record<string, boolean>>({
    'Allow image sharing': true,
    'Allow document sharing': true,
    'Allow video sharing': false,
    'Allow voice messages': true,
    'Allow location sharing': false,
  });
  const [msgTemplates, setMsgTemplates] = useState([
    { name: 'Fee Reminder SMS', channel: 'SMS', category: 'Fee Reminder', status: 'Active', text: 'Dear {{parent_name}}, fee of \u20B9{{amount}} for {{student_name}} (Class {{class}}) is due on {{due_date}}. Pay online: {{link}}' },
    { name: 'Absent Alert SMS', channel: 'SMS', category: 'Attendance Alert', status: 'Active', text: 'Dear {{parent_name}}, {{student_name}} is marked absent today ({{date}}). Contact school for details.' },
    { name: 'Welcome Email', channel: 'Email', category: 'Welcome', status: 'Active', text: 'Welcome to {{school_name}}! Your child {{student_name}} has been admitted to Class {{class}}.' },
    { name: 'Birthday Wish', channel: 'WhatsApp', category: 'Birthday', status: 'Active', text: 'Happy Birthday, {{student_name}}! Wishing you a wonderful year ahead. - {{school_name}}' },
    { name: 'Emergency Alert', channel: 'SMS', category: 'Emergency', status: 'Active', text: 'URGENT: {{message}} - {{school_name}}. Please contact {{contact}} immediately.' },
    { name: 'Fee Receipt', channel: 'Email', category: 'Fee Reminder', status: 'Active', text: 'Receipt No: {{receipt_no}}. Payment of \u20B9{{amount}} received for {{student_name}} on {{date}}.' },
    { name: 'PTM Reminder', channel: 'Push', category: 'Circular', status: 'Active', text: 'Reminder: PTM scheduled on {{date}} at {{time}} for {{student_name}} (Class {{class}}).' },
    { name: 'Circular', channel: 'Email', category: 'Circular', status: 'Draft', text: 'New circular: {{title}}. {{message}} - {{school_name}}' },
  ]);
  const [editingTemplate, setEditingTemplate] = useState<number | null>(null);
  const templateChannels = ['SMS', 'Email', 'WhatsApp', 'Push'];
  const templateCategories = ['Fee Reminder', 'Attendance Alert', 'Circular', 'Welcome', 'Birthday', 'Emergency'];

  return (
    <div className="space-y-4">
      <ModuleHeader title="Communication Configuration" subtitle="DM permissions, group rules, storage limits, and file sharing" theme={theme} />

      <SectionCard title="DM Permission Matrix" subtitle="Control who can initiate direct messages to whom in the school chat system" theme={theme}>
        <div className="space-y-1.5">
          {Object.entries(dmPermissions).map(([perm, enabled]) => (
            <div key={perm} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>{perm}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{
                  ({
                    'Parent to Class Teacher': 'Parents can directly message their child\'s class teacher',
                    'Parent to Subject Teacher': 'Parents can message any subject teacher of their child',
                    'Parent to Principal': 'Parents can send direct messages to the school principal',
                    'Parent to Admin': 'Parents can message the school admin office for queries',
                    'Teacher to Parent': 'Teachers can initiate direct messages to any parent',
                    'Teacher to Teacher': 'Teachers can message each other for collaboration',
                    'Teacher to Principal': 'Teachers can directly message the principal',
                    'Student to Teacher (Sr. Sec only)': 'Senior secondary students can message their teachers (disabled for younger students)',
                    'Staff to HR': 'Non-teaching staff can message HR department for leave/payroll queries',
                    'Anyone to Transport Helpdesk': 'Any user can message the transport helpdesk for bus-related queries',
                  } as Record<string, string>)[perm]
                }</p>
              </div>
              <SSAToggle on={enabled} onChange={() => setDmPermissions(p => ({ ...p, [perm]: !p[perm] }))} theme={theme} />
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Parent Communication Mode" subtitle="Level of parent messaging access" theme={theme}>
          <div className="space-y-2">
            {[
              { id: 'full-two-way', name: 'Full Two-Way', desc: 'Parents can initiate and reply' },
              { id: 'reply-only', name: 'Reply Only', desc: 'Parents can only reply to teacher messages' },
              { id: 'broadcast-only', name: 'Broadcast Only', desc: 'School sends, parents read (no replies)' },
            ].map(m => (
              <button key={m.id} onClick={() => setParentMode(m.id)}
                className={`w-full text-left p-2.5 rounded-xl border transition-all ${parentMode === m.id ? `border-2 ${theme.primary} text-white` : `${theme.secondaryBg} ${theme.border}`}`}>
                <p className={`text-xs font-bold ${parentMode === m.id ? '' : theme.highlight}`}>{m.name}</p>
                <p className={`text-[10px] ${parentMode === m.id ? 'text-white/80' : theme.iconColor}`}>{m.desc}</p>
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Group Creation Permissions" subtitle="Control who can create group chats within the school communication system" theme={theme}>
          <div className="space-y-2">
            {Object.entries(groupPerms).map(([perm, enabled]) => (
              <div key={perm} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{perm}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Admin can create any group': 'School admin can create groups for any purpose (announcements, committees, etc.)',
                      'Principal can create any group': 'Principal can create groups like staff meetings, parent forums, etc.',
                      'Teacher can create class groups': 'Teachers can create groups for their own class (e.g., "Class 5A Parents")',
                      'Teacher can create subject groups': 'Teachers can create subject-specific groups (e.g., "Grade 10 Physics")',
                      'Parent can create groups': 'Parents can create informal groups (e.g., carpool, study circles)',
                      'Student can create groups': 'Senior students can create study groups or project groups',
                    } as Record<string, string>)[perm]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setGroupPerms(p => ({ ...p, [perm]: !p[perm] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Default Auto-created Groups" subtitle="Groups auto-created by the system — add or remove" theme={theme}>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {autoGroups.map(g => (
            <span key={g} className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${theme.secondaryBg} text-xs font-medium ${theme.highlight}`}>
              <CheckCircle size={10} className="text-emerald-500" /> {g}
              <button onClick={() => setAutoGroups(p => p.filter(x => x !== g))} className="text-red-400 hover:text-red-600 ml-1"><X size={10} /></button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input value={newAutoGroup} onChange={e => setNewAutoGroup(e.target.value)} placeholder="Add auto-group..."
            className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
          <button onClick={() => { if (newAutoGroup.trim()) { setAutoGroups(p => [...p, newAutoGroup.trim()]); setNewAutoGroup(''); } }}
            className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={14} /></button>
        </div>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Chat Storage &amp; Retention" subtitle="Click values to edit storage limits" theme={theme}>
          <div className="space-y-2">
            {Object.entries(chatStorage).map(([key, val]) => (
              <div key={key} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <span className={`text-xs ${theme.highlight}`}>{key}</span>
                <input value={val} onChange={e => setChatStorage(p => ({ ...p, [key]: e.target.value }))}
                  className={`w-32 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-right font-bold ${theme.iconColor} outline-none`} />
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="File Sharing" subtitle="Control what file types users can share in chat conversations" theme={theme}>
          <div className="space-y-2">
            {Object.entries(fileSharing).map(([opt, enabled]) => (
              <div key={opt} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{opt}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Allow image sharing': 'Users can share photos and images (JPG, PNG) in chat — useful for homework, notices',
                      'Allow document sharing': 'Users can share PDFs, Word docs, and spreadsheets in conversations',
                      'Allow video sharing': 'Users can share video files — useful for recorded lectures or events',
                      'Allow voice messages': 'Users can record and send voice notes instead of typing messages',
                      'Allow location sharing': 'Users can share their live location — useful for field trips or transport tracking',
                    } as Record<string, string>)[opt]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setFileSharing(p => ({ ...p, [opt]: !p[opt] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Message Templates" subtitle="SMS, Email, WhatsApp & Push notification templates with variable placeholders" theme={theme}>
        <div className="space-y-1.5">
          {msgTemplates.map((t, i) => (
            <div key={i} className={`p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold ${theme.highlight} flex-1`}>{t.name}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                  t.channel === 'SMS' ? 'bg-blue-100 text-blue-700' : t.channel === 'Email' ? 'bg-purple-100 text-purple-700' :
                  t.channel === 'WhatsApp' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}>{t.channel}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${theme.accentBg} ${theme.iconColor} font-bold`}>{t.category}</span>
                <select value={t.status} onChange={e => { const n = [...msgTemplates]; n[i] = { ...n[i], status: e.target.value }; setMsgTemplates(n); }}
                  className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold border-0 outline-none ${t.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                  <option value="Active">Active</option><option value="Draft">Draft</option>
                </select>
                <button onClick={() => setEditingTemplate(editingTemplate === i ? null : i)}
                  className={`text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-2 py-1 rounded-lg`}><Edit size={12} /></button>
                <button onClick={() => setMsgTemplates(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={12} /></button>
              </div>
              {editingTemplate === i && (
                <div className="mt-2 space-y-2">
                  <div className="grid grid-cols-3 gap-2">
                    <input value={t.name} onChange={e => { const n = [...msgTemplates]; n[i] = { ...n[i], name: e.target.value }; setMsgTemplates(n); }}
                      placeholder="Template Name" className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                    <select value={t.channel} onChange={e => { const n = [...msgTemplates]; n[i] = { ...n[i], channel: e.target.value }; setMsgTemplates(n); }}
                      className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                      {templateChannels.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select value={t.category} onChange={e => { const n = [...msgTemplates]; n[i] = { ...n[i], category: e.target.value }; setMsgTemplates(n); }}
                      className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                      {templateCategories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <textarea value={t.text} onChange={e => { const n = [...msgTemplates]; n[i] = { ...n[i], text: e.target.value }; setMsgTemplates(n); }}
                    rows={3} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none resize-none`} />
                  <p className={`text-[9px] ${theme.iconColor}`}>Variables: {'{{parent_name}} {{student_name}} {{class}} {{amount}} {{date}} {{due_date}} {{school_name}} {{link}} {{message}} {{contact}} {{receipt_no}} {{time}} {{title}}'}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <button onClick={() => setMsgTemplates(p => [...p, { name: 'New Template', channel: 'SMS', category: 'Circular', status: 'Draft', text: '' }])}
          className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl mt-2`}>
          <Plus size={12} /> Add Template
        </button>
      </SectionCard>
    </div>
  );
}

// ─── TIMETABLE & BELL SCHEDULE CONFIG MODULE ───────
function TimetableConfigModule({ theme }: { theme: Theme }) {
  const [bellSchedule, setBellSchedule] = useState([
    { period: 'Assembly', start: '07:30', end: '07:50' },
    { period: 'Period 1', start: '07:50', end: '08:30' },
    { period: 'Period 2', start: '08:30', end: '09:10' },
    { period: 'Period 3', start: '09:10', end: '09:50' },
    { period: 'Short Break', start: '09:50', end: '10:05' },
    { period: 'Period 4', start: '10:05', end: '10:45' },
    { period: 'Period 5', start: '10:45', end: '11:25' },
    { period: 'Lunch Break', start: '11:25', end: '12:00' },
    { period: 'Period 6', start: '12:00', end: '12:40' },
    { period: 'Period 7', start: '12:40', end: '01:20' },
    { period: 'Period 8', start: '01:20', end: '02:00' },
  ]);
  const [saturdaySchedule, setSaturdaySchedule] = useState('half-day');
  const [zeroPeriod, setZeroPeriod] = useState(false);
  const [zeroPeriodTime, setZeroPeriodTime] = useState({ start: '07:00', end: '07:30' });
  const [assemblyTime, setAssemblyTime] = useState('15');
  const [substitutionMode, setSubstitutionMode] = useState('Both');
  const [substitutionBasis, setSubstitutionBasis] = useState('Both');
  const [allowPeriodSwaps, setAllowPeriodSwaps] = useState(true);
  const [rooms, setRooms] = useState([
    { name: 'Room 101', type: 'Classroom', capacity: '40', floor: 'Ground', equipment: 'Projector, Whiteboard', status: 'Available' },
    { name: 'Room 102', type: 'Classroom', capacity: '40', floor: 'Ground', equipment: 'Projector, Whiteboard', status: 'Available' },
    { name: 'Room 103', type: 'Classroom', capacity: '40', floor: 'Ground', equipment: 'Whiteboard', status: 'Available' },
    { name: 'Room 104', type: 'Classroom', capacity: '40', floor: '1st', equipment: 'Projector, Whiteboard', status: 'Available' },
    { name: 'Room 105', type: 'Classroom', capacity: '40', floor: '1st', equipment: 'Whiteboard', status: 'Available' },
    { name: 'Room 106', type: 'Classroom', capacity: '40', floor: '1st', equipment: 'Projector, Whiteboard', status: 'Available' },
    { name: 'Science Lab', type: 'Lab', capacity: '30', floor: '2nd', equipment: 'Lab Tables, Fume Hood, Microscopes', status: 'Available' },
    { name: 'Computer Lab', type: 'Lab', capacity: '35', floor: '2nd', equipment: '35 PCs, Projector, AC', status: 'Available' },
    { name: 'Library', type: 'Library', capacity: '60', floor: 'Ground', equipment: 'Reading Tables, PCs, AC', status: 'Available' },
    { name: 'Auditorium', type: 'Auditorium', capacity: '500', floor: 'Ground', equipment: 'Stage, Sound System, Projector', status: 'Available' },
    { name: 'Staff Room', type: 'Staff Room', capacity: '50', floor: '1st', equipment: 'Desks, PCs, Printer', status: 'Available' },
    { name: 'Principal Office', type: 'Office', capacity: '5', floor: 'Ground', equipment: 'Desk, PC, AC, CCTV', status: 'Available' },
  ]);
  const roomTypes = ['Classroom', 'Lab', 'Library', 'Auditorium', 'Playground', 'Office', 'Staff Room'];
  const roomStatuses = ['Available', 'Under Maintenance', 'Reserved'];

  return (
    <div className="space-y-4">
      <ModuleHeader title="Timetable & Bell Schedule" subtitle="Bell timings, breaks, Saturday schedule, and special periods" theme={theme} />

      <SectionCard title="Bell Schedule" subtitle="Period-wise start and end times" theme={theme}>
        <div className="space-y-1.5">
          {bellSchedule.map((p, i) => (
            <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${p.period.includes('Break') || p.period === 'Assembly' ? 'bg-amber-50 border border-amber-200' : theme.secondaryBg}`}>
              <span className={`text-xs font-bold ${theme.highlight} w-24`}>{p.period}</span>
              <input type="time" value={p.start} onChange={e => { const n = [...bellSchedule]; n[i] = { ...n[i], start: e.target.value }; setBellSchedule(n); }}
                className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
              <span className={`text-xs ${theme.iconColor}`}>to</span>
              <input type="time" value={p.end} onChange={e => { const n = [...bellSchedule]; n[i] = { ...n[i], end: e.target.value }; setBellSchedule(n); }}
                className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
              <span className={`text-[10px] ${theme.iconColor}`}>
                {(() => { const [sh, sm] = p.start.split(':').map(Number); const [eh, em] = p.end.split(':').map(Number); return `${(eh * 60 + em) - (sh * 60 + sm)} min`; })()}
              </span>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="grid grid-cols-3 gap-4">
        <SectionCard title="Saturday Schedule" theme={theme}>
          <div className="space-y-2">
            {['full-day', 'half-day', 'off'].map(s => (
              <button key={s} onClick={() => setSaturdaySchedule(s)}
                className={`w-full text-left p-2.5 rounded-xl text-xs font-bold transition-all capitalize ${saturdaySchedule === s ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.highlight}`}`}>
                {s.replace('-', ' ')}
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Zero Period" subtitle="Optional early morning period" theme={theme}>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <span className={`text-xs font-bold ${theme.highlight}`}>Enable Zero Period</span>
              <SSAToggle on={zeroPeriod} onChange={() => setZeroPeriod(!zeroPeriod)} theme={theme} />
            </div>
            {zeroPeriod && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Start</p>
                  <InputField value={zeroPeriodTime.start} onChange={v => setZeroPeriodTime(p => ({ ...p, start: v }))} theme={theme} type="time" />
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>End</p>
                  <InputField value={zeroPeriodTime.end} onChange={v => setZeroPeriodTime(p => ({ ...p, end: v }))} theme={theme} type="time" />
                </div>
              </div>
            )}
          </div>
        </SectionCard>

        <SectionCard title="Assembly" subtitle="Morning assembly duration" theme={theme}>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Duration (minutes)</p>
            <InputField value={assemblyTime} onChange={setAssemblyTime} theme={theme} type="number" />
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Teacher Substitution" subtitle="How absent teacher periods are handled" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Substitution Mode</p>
              <SelectField options={['Manual', 'Auto-suggest', 'Both']} value={substitutionMode} onChange={setSubstitutionMode} theme={theme} />
            </div>
            {(substitutionMode === 'Auto-suggest' || substitutionMode === 'Both') && (
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Auto-suggest Based On</p>
                <SelectField options={['Free periods', 'Subject match', 'Both']} value={substitutionBasis} onChange={setSubstitutionBasis} theme={theme} />
              </div>
            )}
          </div>
        </SectionCard>

        <SectionCard title="Period Swaps" subtitle="Teacher-initiated period exchange" theme={theme}>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Allow Teachers to Swap Periods</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Teachers can request mutual period swaps for a given day</p>
            </div>
            <SSAToggle on={allowPeriodSwaps} onChange={() => setAllowPeriodSwaps(!allowPeriodSwaps)} theme={theme} />
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Rooms & Infrastructure" subtitle="Manage school rooms, labs, and facilities with capacity and status" theme={theme}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Room Name', 'Type', 'Capacity', 'Floor', 'Equipment', 'Status', ''].map(h => (
                <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {rooms.map((r, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className="px-2 py-1.5">
                    <input value={r.name} onChange={e => { const n = [...rooms]; n[i] = { ...n[i], name: e.target.value }; setRooms(n); }}
                      className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <select value={r.type} onChange={e => { const n = [...rooms]; n[i] = { ...n[i], type: e.target.value }; setRooms(n); }}
                      className={`px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight}`}>
                      {roomTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </td>
                  <td className="px-2 py-1.5">
                    <input value={r.capacity} onChange={e => { const n = [...rooms]; n[i] = { ...n[i], capacity: e.target.value }; setRooms(n); }}
                      className={`w-12 px-1 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <input value={r.floor} onChange={e => { const n = [...rooms]; n[i] = { ...n[i], floor: e.target.value }; setRooms(n); }}
                      className={`w-16 px-1 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <input value={r.equipment} onChange={e => { const n = [...rooms]; n[i] = { ...n[i], equipment: e.target.value }; setRooms(n); }}
                      className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <select value={r.status} onChange={e => { const n = [...rooms]; n[i] = { ...n[i], status: e.target.value }; setRooms(n); }}
                      className={`px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] font-bold ${
                        r.status === 'Available' ? 'text-emerald-600' : r.status === 'Under Maintenance' ? 'text-amber-600' : 'text-blue-600'
                      }`}>
                      {roomStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-2 py-1.5"><button onClick={() => setRooms(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={12} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={() => setRooms(p => [...p, { name: '', type: 'Classroom', capacity: '40', floor: '', equipment: '', status: 'Available' }])}
          className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl mt-2`}>
          <Plus size={12} /> Add Room
        </button>
      </SectionCard>
    </div>
  );
}

// ─── LEAVE POLICY MODULE ───────────────────────────
function LeaveConfigModule({ theme }: { theme: Theme }) {
  const [leaveTypes, setLeaveTypes] = useState([
    { type: 'Casual Leave (CL)', days: '12', carryForward: false, maxCarry: '0' },
    { type: 'Sick Leave (SL)', days: '10', carryForward: true, maxCarry: '5' },
    { type: 'Earned Leave (EL)', days: '15', carryForward: true, maxCarry: '30' },
    { type: 'Maternity Leave', days: '180', carryForward: false, maxCarry: '0' },
    { type: 'Paternity Leave', days: '15', carryForward: false, maxCarry: '0' },
    { type: 'Compensatory Off', days: '0', carryForward: false, maxCarry: '0' },
  ]);
  const [sandwichRule, setSandwichRule] = useState(true);
  const [halfDayLeave, setHalfDayLeave] = useState(true);
  const [approvalChain, setApprovalChain] = useState([
    { level: 1, approver: 'HOD / Coordinator', timeLimit: '24 hours' },
    { level: 2, approver: 'Vice Principal', timeLimit: '48 hours' },
    { level: 3, approver: 'Principal', timeLimit: '72 hours' },
  ]);
  const [nonTeachingApprovalChain, setNonTeachingApprovalChain] = useState([
    { level: 1, approver: 'Department Head / Supervisor', timeLimit: '24 hours' },
    { level: 2, approver: 'Admin Officer', timeLimit: '48 hours' },
  ]);
  const [maxConsecutive, setMaxConsecutive] = useState('5');
  const [lwpThreshold, setLwpThreshold] = useState('3');

  return (
    <div className="space-y-4">
      <ModuleHeader title="Leave Policy Configuration" subtitle="Leave types, carry-forward rules, approval chain, and thresholds" theme={theme} />

      <SectionCard title="Leave Types &amp; Annual Allocation" subtitle="Edit leave type names, days, carry-forward — add or delete" theme={theme}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Leave Type', 'Days/Year', 'Carry Forward', 'Max Carry', ''].map(h => (
                <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {leaveTypes.map((lt, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className="px-2 py-1.5">
                    <input value={lt.type} onChange={e => { const n = [...leaveTypes]; n[i] = { ...n[i], type: e.target.value }; setLeaveTypes(n); }}
                      className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <input value={lt.days} onChange={e => { const n = [...leaveTypes]; n[i] = { ...n[i], days: e.target.value }; setLeaveTypes(n); }}
                      className={`w-16 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-3 py-2">
                    <SSAToggle on={lt.carryForward} onChange={() => { const n = [...leaveTypes]; n[i] = { ...n[i], carryForward: !n[i].carryForward }; setLeaveTypes(n); }} theme={theme} />
                  </td>
                  <td className="px-2 py-1.5">
                    <input value={lt.maxCarry} onChange={e => { const n = [...leaveTypes]; n[i] = { ...n[i], maxCarry: e.target.value }; setLeaveTypes(n); }}
                      disabled={!lt.carryForward}
                      className={`w-16 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center ${theme.highlight} outline-none ${!lt.carryForward ? 'opacity-30' : ''}`} />
                  </td>
                  <td className="px-2 py-1.5"><button onClick={() => setLeaveTypes(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={12} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={() => setLeaveTypes(p => [...p, { type: '', days: '0', carryForward: false, maxCarry: '0' }])}
          className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl mt-2`}>
          <Plus size={12} /> Add Leave Type
        </button>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Leave Rules" subtitle="Special rules for leave calculation" theme={theme}>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Sandwich Rule</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Holidays between leave days count as leave</p>
              </div>
              <SSAToggle on={sandwichRule} onChange={() => setSandwichRule(!sandwichRule)} theme={theme} />
            </div>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Half-Day Leave</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Allow staff to take half-day leave</p>
              </div>
              <SSAToggle on={halfDayLeave} onChange={() => setHalfDayLeave(!halfDayLeave)} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max Consecutive Leave Days (without special approval)</p>
              <InputField value={maxConsecutive} onChange={setMaxConsecutive} theme={theme} type="number" />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>LWP Threshold (days after leave balance exhausted)</p>
              <InputField value={lwpThreshold} onChange={setLwpThreshold} theme={theme} type="number" />
            </div>
          </div>
        </SectionCard>

        <div className="space-y-4">
          <SectionCard title="Teaching Staff Approval Chain" subtitle="Edit approver name and time limit — add or remove steps" theme={theme}>
            <div className="space-y-2">
              {approvalChain.map((a, i) => (
                <div key={i} className={`flex items-center gap-2 p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <span className={`text-[10px] w-6 h-6 rounded-full ${theme.primary} text-white flex items-center justify-center font-bold shrink-0`}>{i + 1}</span>
                  <input value={a.approver} onChange={e => { const n = [...approvalChain]; n[i] = { ...n[i], approver: e.target.value }; setApprovalChain(n); }}
                    className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} placeholder="Approver role" />
                  <input value={a.timeLimit} onChange={e => { const n = [...approvalChain]; n[i] = { ...n[i], timeLimit: e.target.value }; setApprovalChain(n); }}
                    className={`w-24 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.iconColor} outline-none`} placeholder="e.g. 24 hours" />
                  <button onClick={() => setApprovalChain(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
                </div>
              ))}
              <button onClick={() => setApprovalChain(p => [...p, { level: p.length + 1, approver: '', timeLimit: '24 hours' }])}
                className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
                <Plus size={12} /> Add Step
              </button>
            </div>
          </SectionCard>

          <SectionCard title="Non-Teaching Staff Approval Chain" subtitle="Edit approver name and time limit — add or remove steps" theme={theme}>
            <div className="space-y-2">
              {nonTeachingApprovalChain.map((a, i) => (
                <div key={i} className={`flex items-center gap-2 p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <span className={`text-[10px] w-6 h-6 rounded-full ${theme.primary} text-white flex items-center justify-center font-bold shrink-0`}>{i + 1}</span>
                  <input value={a.approver} onChange={e => { const n = [...nonTeachingApprovalChain]; n[i] = { ...n[i], approver: e.target.value }; setNonTeachingApprovalChain(n); }}
                    className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} placeholder="Approver role" />
                  <input value={a.timeLimit} onChange={e => { const n = [...nonTeachingApprovalChain]; n[i] = { ...n[i], timeLimit: e.target.value }; setNonTeachingApprovalChain(n); }}
                    className={`w-24 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.iconColor} outline-none`} placeholder="e.g. 24 hours" />
                  <button onClick={() => setNonTeachingApprovalChain(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
                </div>
              ))}
              <button onClick={() => setNonTeachingApprovalChain(p => [...p, { level: p.length + 1, approver: '', timeLimit: '24 hours' }])}
                className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
                <Plus size={12} /> Add Step
              </button>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

// ─── VISITOR RULES CONFIG MODULE ───────────────────
type VisitorTypeRules = {
  toggles: Record<string, boolean>;
  allowedFrom: string;
  allowedTo: string;
  maxDuration: string;
};

const defaultVisitorTypeRules: Record<string, VisitorTypeRules> = {
  'Parent': {
    toggles: {
      'Pre-registration required': true,
      'Photo ID verification': true,
      'Pickup authorization required': true,
      'Escort required': false,
      'Areas allowed: Office': true,
      'Areas allowed: Classroom': false,
      'Areas allowed: Campus': true,
    },
    allowedFrom: '08:00',
    allowedTo: '16:00',
    maxDuration: '60',
  },
  'Vendor / Supplier': {
    toggles: {
      'Pre-registration MANDATORY': true,
      'Photo capture at gate': true,
      'Delivery area only': true,
      'POC (Point of Contact) required': true,
      'Valid ID required': true,
      'Background check status': false,
    },
    allowedFrom: '09:00',
    allowedTo: '15:00',
    maxDuration: '120',
  },
  'General Visitor': {
    toggles: {
      'Pre-registration required': false,
      'Photo capture': true,
      'Purpose of visit required': true,
      'Escort mandatory': true,
      'Restricted areas enforced': true,
    },
    allowedFrom: '09:00',
    allowedTo: '17:00',
    maxDuration: '45',
  },
  'Contractor': {
    toggles: {
      'Pre-registration MANDATORY': true,
      'Safety briefing required': true,
      'Work permit required': true,
      'Designated work area enforced': true,
      'Supervisor contact required': true,
      'Valid insurance': true,
    },
    allowedFrom: '07:00',
    allowedTo: '18:00',
    maxDuration: '480',
  },
  'Government Official': {
    toggles: {
      'Fast-track entry': true,
      'ID verification': true,
      'Principal notification auto-trigger': true,
      'No time limit': true,
      'Escort assigned': true,
    },
    allowedFrom: '08:00',
    allowedTo: '18:00',
    maxDuration: '0',
  },
  'Alumni': {
    toggles: {
      'Pre-registration optional': true,
      'Alumni ID verification': true,
      'Event-based access only': false,
      'Campus tour allowed': true,
      'Classrooms restricted': true,
    },
    allowedFrom: '09:00',
    allowedTo: '17:00',
    maxDuration: '120',
  },
};

function VisitorConfigModule({ theme }: { theme: Theme }) {
  const [pickupMethod, setPickupMethod] = useState('otp');
  const [activeVisitorType, setActiveVisitorType] = useState('Parent');
  const [visitorRules, setVisitorRules] = useState<Record<string, VisitorTypeRules>>(defaultVisitorTypeRules);
  const [cctvParentAccess, setCctvParentAccess] = useState(false);
  const [cctvRetentionDays, setCctvRetentionDays] = useState('30');

  const visitorTypes = Object.keys(defaultVisitorTypeRules);
  const currentRules = visitorRules[activeVisitorType];

  function setToggle(rule: string, val: boolean) {
    setVisitorRules(prev => ({
      ...prev,
      [activeVisitorType]: {
        ...prev[activeVisitorType],
        toggles: { ...prev[activeVisitorType].toggles, [rule]: val },
      },
    }));
  }

  function setTimingField(field: 'allowedFrom' | 'allowedTo' | 'maxDuration', val: string) {
    setVisitorRules(prev => ({
      ...prev,
      [activeVisitorType]: { ...prev[activeVisitorType], [field]: val },
    }));
  }

  return (
    <div className="space-y-4">
      <ModuleHeader title="Visitor & Pickup Rules" subtitle="Per-visitor-type rules, verification, and security configuration" theme={theme} />

      <SectionCard title="Pickup Verification Method" subtitle="How student pickup is verified" theme={theme}>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'otp', name: 'OTP Verification', desc: 'Parent receives OTP on phone' },
            { id: 'photo', name: 'Photo Match', desc: 'Guard matches face with registered photo' },
            { id: 'rfid', name: 'RFID/QR Card', desc: 'Parent scans card at gate' },
          ].map(m => (
            <button key={m.id} onClick={() => setPickupMethod(m.id)}
              className={`p-3 rounded-xl text-left border-2 transition-all ${pickupMethod === m.id ? `${theme.primary} text-white border-transparent` : `${theme.secondaryBg} ${theme.border}`}`}>
              <p className={`text-xs font-bold ${pickupMethod === m.id ? '' : theme.highlight}`}>{m.name}</p>
              <p className={`text-[10px] mt-1 ${pickupMethod === m.id ? 'text-white/80' : theme.iconColor}`}>{m.desc}</p>
            </button>
          ))}
        </div>
      </SectionCard>

      {/* Visitor Type Rules */}
      <SectionCard title="Visitor Type Rules" subtitle="Select a visitor type to configure its specific entry rules" theme={theme}>
        {/* Type tab bar */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {visitorTypes.map(vt => (
            <button key={vt} onClick={() => setActiveVisitorType(vt)}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all whitespace-nowrap ${
                activeVisitorType === vt ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.highlight} border ${theme.border}`
              }`}>
              {vt}
            </button>
          ))}
        </div>

        {/* Rules for active type */}
        <div className="grid grid-cols-2 gap-4">
          {/* Toggle rules */}
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-2 uppercase tracking-wide`}>Rules — {activeVisitorType}</p>
            <div className="space-y-1.5">
              {Object.entries(currentRules.toggles).map(([rule, enabled]) => (
                <div key={rule} className={`flex items-center justify-between p-2 rounded-xl ${theme.secondaryBg}`}>
                  <div className="flex-1 mr-2">
                    <p className={`text-xs font-bold ${theme.highlight}`}>{rule}</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>{
                      ({
                        'Pre-registration required': 'Visitor must register in advance via app or website before arriving',
                        'Photo ID verification': 'Gate staff verifies visitor\'s government-issued photo ID before entry',
                        'Pickup authorization required': 'Parent must pre-authorize any non-guardian pickup via the app',
                        'Escort required': 'Visitor must be accompanied by a school staff member on campus',
                        'Areas allowed: Office': 'Visitor can access the admin office area',
                        'Areas allowed: Classroom': 'Visitor can access classroom areas (requires teacher permission)',
                        'Areas allowed: Campus': 'Visitor can move freely across the campus',
                        'PO/Work order mandatory': 'Vendor must have an active purchase order or work order to enter campus',
                        'Delivery only at store': 'Vendor delivery is restricted to the school store/receiving area only',
                        'Contractor badge required': 'Contractor must wear a visible identification badge while on campus',
                        'Work permit on file': 'Contractor must have a work permit uploaded and approved before campus entry',
                        'Safety gear check': 'Gate staff verifies contractor is wearing required safety gear (helmet, vest, etc.)',
                        'Fast-track entry': 'Government officials get expedited entry without standard waiting procedures',
                        'ID verification': 'Government official\'s credentials are verified and logged',
                        'Principal notification auto-trigger': 'Principal is immediately notified via push + SMS when a government official enters',
                        'No time limit': 'No maximum visit duration — visit ends when the official decides to leave',
                        'Escort assigned': 'A designated staff member escorts the official throughout their visit',
                        'Pre-registration optional': 'Alumni may optionally register in advance but walk-ins are also accepted',
                        'Alumni ID verification': 'Alumni must verify identity (batch year, roll number) at the gate',
                        'Event-based access only': 'Alumni can only visit during school events — no casual visits allowed',
                        'Campus tour allowed': 'Alumni can take a tour of the campus to revisit old classrooms and facilities',
                        'Classrooms restricted': 'Alumni cannot enter active classrooms — restricted to common areas only',
                      } as Record<string, string>)[rule] || 'Rule configuration for this visitor type'
                    }</p>
                  </div>
                  <SSAToggle on={enabled} onChange={() => setToggle(rule, !enabled)} theme={theme} />
                </div>
              ))}
            </div>
          </div>

          {/* Timing settings */}
          <div className="space-y-3">
            <p className={`text-[10px] font-bold ${theme.iconColor} uppercase tracking-wide`}>Timing — {activeVisitorType}</p>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Allowed From</p>
              <InputField value={currentRules.allowedFrom} onChange={v => setTimingField('allowedFrom', v)} theme={theme} type="time" />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Allowed To</p>
              <InputField value={currentRules.allowedTo} onChange={v => setTimingField('allowedTo', v)} theme={theme} type="time" />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>
                Max Visit Duration (minutes)
                {activeVisitorType === 'Government Official' && <span className="ml-1 text-amber-500">— 0 = no limit</span>}
              </p>
              <InputField value={currentRules.maxDuration} onChange={v => setTimingField('maxDuration', v)} theme={theme} type="number" placeholder="minutes (0 = no limit)" />
            </div>

            {/* Type-specific notes */}
            <div className={`p-2.5 rounded-xl ${theme.accentBg} border ${theme.border}`}>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Note</p>
              {activeVisitorType === 'Parent' && <p className={`text-[10px] ${theme.iconColor}`}>Parents picking up students go through the standard pickup verification flow (OTP / photo / RFID above).</p>}
              {activeVisitorType === 'Vendor / Supplier' && <p className={`text-[10px] ${theme.iconColor}`}>Vendor entry is logged and linked to Purchase Orders when available.</p>}
              {activeVisitorType === 'General Visitor' && <p className={`text-[10px] ${theme.iconColor}`}>Unregistered visitors must fill a digital form at the gate before entry is approved.</p>}
              {activeVisitorType === 'Contractor' && <p className={`text-[10px] ${theme.iconColor}`}>Work permits are digitally uploaded and verified before the contractor is allowed on campus.</p>}
              {activeVisitorType === 'Government Official' && <p className={`text-[10px] ${theme.iconColor}`}>Principal is auto-notified via push + SMS as soon as entry is logged for this type.</p>}
              {activeVisitorType === 'Alumni' && <p className={`text-[10px] ${theme.iconColor}`}>Alumni can be issued a digital alumni ID card via the app for faster future visits.</p>}
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Campus CCTV" subtitle="Parent access and recording settings for campus cameras" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Live CCTV Access for Parents</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Parents can view designated campus camera feeds via app</p>
            </div>
            <SSAToggle on={cctvParentAccess} onChange={() => setCctvParentAccess(!cctvParentAccess)} theme={theme} />
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>CCTV Recording Retention (days)</p>
            <InputField value={cctvRetentionDays} onChange={setCctvRetentionDays} theme={theme} type="number" placeholder="e.g. 30" />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

// ─── CERTIFICATE CONFIG MODULE ─────────────────────
function CertificateConfigModule({ theme }: { theme: Theme }) {
  const [templates, setTemplates] = useState([
    { name: 'Transfer Certificate (TC)', status: 'uploaded', lastModified: '15 Jan 2025' },
    { name: 'Character Certificate', status: 'uploaded', lastModified: '15 Jan 2025' },
    { name: 'Bonafide Certificate', status: 'uploaded', lastModified: '10 Feb 2025' },
    { name: 'Migration Certificate', status: 'pending', lastModified: '-' },
    { name: 'Sports Certificate', status: 'pending', lastModified: '-' },
    { name: 'Merit Certificate', status: 'uploaded', lastModified: '20 Jan 2025' },
  ]);
  const [features, setFeatures] = useState<Record<string, boolean>>({
    'Auto-numbering (sequential)': true,
    'Digital signature': true,
    'QR code verification': true,
    'Watermark on PDF': true,
    'Approval required before generation': true,
    'Duplicate certificate tracking': true,
  });
  const [approvalWorkflow, setApprovalWorkflow] = useState(['Class Teacher Initiates', 'Admin Verifies Details', 'Principal Approves', 'Certificate Generated']);

  return (
    <div className="space-y-4">
      <ModuleHeader title="Certificate Configuration" subtitle="Templates, auto-numbering, digital signatures, and approval workflow" theme={theme} />

      <SectionCard title="Certificate Templates" subtitle="Edit name, upload template, or delete — add new certificate types" theme={theme}>
        <div className="space-y-2">
          {templates.map((t, i) => (
            <div key={i} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <Award size={14} className={`${t.status === 'uploaded' ? 'text-emerald-500' : 'text-slate-400'} shrink-0`} />
                <input value={t.name} onChange={e => { const n = [...templates]; n[i] = { ...n[i], name: e.target.value }; setTemplates(n); }}
                  className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
              </div>
              <div className="flex items-center gap-2 ml-2">
                <select value={t.status} onChange={e => { const n = [...templates]; n[i] = { ...n[i], status: e.target.value }; setTemplates(n); }}
                  className={`text-[9px] px-1.5 py-0.5 rounded-lg font-bold ${t.status === 'uploaded' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'} border-0 outline-none`}>
                  <option value="uploaded">UPLOADED</option>
                  <option value="pending">PENDING</option>
                </select>
                <button className={`p-1 rounded-lg ${theme.buttonHover}`}><Upload size={12} className={theme.iconColor} /></button>
                <button onClick={() => setTemplates(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={12} /></button>
              </div>
            </div>
          ))}
          <button onClick={() => setTemplates(p => [...p, { name: '', status: 'pending', lastModified: '-' }])}
            className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
            <Plus size={12} /> Add Certificate Type
          </button>
        </div>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Certificate Features" subtitle="Security and workflow features applied to all certificate types" theme={theme}>
          <div className="space-y-2">
            {Object.entries(features).map(([feat, enabled]) => (
              <div key={feat} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{feat}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Auto-numbering (sequential)': 'Each certificate gets a unique sequential number (e.g., TC-2026-001)',
                      'Digital signature': 'Principal\'s digital signature is automatically embedded on generated certificates',
                      'QR code verification': 'A QR code is printed on each certificate for authenticity verification',
                      'Watermark on PDF': 'School watermark is overlaid on PDF certificates to prevent forgery',
                      'Approval required before generation': 'Certificates must be approved by designated authority before printing',
                      'Duplicate certificate tracking': 'System tracks if duplicate certificates are requested and logs the reason',
                    } as Record<string, string>)[feat]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setFeatures(p => ({ ...p, [feat]: !p[feat] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Approval Workflow" subtitle="Edit, reorder, or remove approval steps" theme={theme}>
          <div className="space-y-2">
            {approvalWorkflow.map((step, i) => (
              <div key={i} className={`flex items-center gap-2 p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <span className={`text-[10px] w-6 h-6 rounded-full ${theme.primary} text-white flex items-center justify-center font-bold shrink-0`}>{i + 1}</span>
                <input value={step} onChange={e => { const n = [...approvalWorkflow]; n[i] = e.target.value; setApprovalWorkflow(n); }}
                  className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                <button onClick={() => setApprovalWorkflow(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
              </div>
            ))}
            <button onClick={() => setApprovalWorkflow(p => [...p, ''])}
              className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
              <Plus size={12} /> Add Step
            </button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

// ─── LIBRARY CONFIG MODULE ─────────────────────────
function LibraryConfigModule({ theme }: { theme: Theme }) {
  const [maxBooks, setMaxBooks] = useState('2');
  const [loanPeriod, setLoanPeriod] = useState('14');
  const [finePerDay, setFinePerDay] = useState('2');
  const [libToggles, setLibToggles] = useState<Record<string, boolean>>({
    'Digital Library (eBooks)': false, 'Barcode/QR Scanning': true,
  });
  const [categories, setCategories] = useState(['Textbook', 'Reference', 'Fiction', 'Non-fiction', 'Periodical']);
  const [newCategory, setNewCategory] = useState('');

  return (
    <div className="space-y-4">
      <ModuleHeader title="Library Configuration" subtitle="Book limits, loan rules, fines, and digital library settings" theme={theme} />
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Loan Rules" subtitle="Limits and durations for book lending" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max Books per Student</p>
              <InputField value={maxBooks} onChange={setMaxBooks} theme={theme} type="number" />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Loan Period (days)</p>
              <InputField value={loanPeriod} onChange={setLoanPeriod} theme={theme} type="number" />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Fine per Day ({'\u20B9'})</p>
              <InputField value={finePerDay} onChange={setFinePerDay} theme={theme} type="number" />
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Library Features" subtitle="Toggle digital library and scanning" theme={theme}>
          <div className="space-y-2">
            {Object.entries(libToggles).map(([feat, enabled]) => (
              <div key={feat} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{feat}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Digital Library (eBooks)': 'Enable digital eBook library — students can read books online without physical copies',
                      'Barcode/QR Scanning': 'Use barcode or QR code scanner for quick book issue/return at the library counter',
                    } as Record<string, string>)[feat]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setLibToggles(p => ({ ...p, [feat]: !p[feat] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
      <SectionCard title="Book Categories" subtitle="Add or remove catalogue categories" theme={theme}>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {categories.map(c => (
            <span key={c} className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${theme.secondaryBg} text-xs font-medium ${theme.highlight}`}>
              {c}
              <button onClick={() => setCategories(p => p.filter(x => x !== c))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input value={newCategory} onChange={e => setNewCategory(e.target.value)} placeholder="Add category..."
            className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
          <button onClick={() => { if (newCategory.trim()) { setCategories(p => [...p, newCategory.trim()]); setNewCategory(''); } }}
            className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={14} /></button>
        </div>
      </SectionCard>
    </div>
  );
}

// ─── CANTEEN / MEAL CONFIG MODULE ──────────────────
function CanteenConfigModule({ theme }: { theme: Theme }) {
  const [menuCycle, setMenuCycle] = useState('Weekly');
  const [canteenToggles, setCanteenToggles] = useState<Record<string, boolean>>({
    'Pre-order System': true, 'Wallet / Prepaid': false, 'Allergy Tracking': true,
  });
  const [mealTypes, setMealTypes] = useState<Record<string, boolean>>({
    Breakfast: true, Lunch: true, Snack: true,
  });
  const [preschoolMealPlan, setPreschoolMealPlan] = useState('None');
  const [dietaryPrefTracking, setDietaryPrefTracking] = useState(true);

  return (
    <div className="space-y-4">
      <ModuleHeader title="Canteen / Meal Configuration" subtitle="Pre-orders, wallet, allergy tracking, and meal scheduling" theme={theme} />
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Canteen Features" subtitle="Ordering, wallet, and dietary safety features for school canteen" theme={theme}>
          <div className="space-y-2">
            {Object.entries(canteenToggles).map(([feat, enabled]) => (
              <div key={feat} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{feat}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Pre-order System': 'Parents/students can order meals in advance via app — reduces canteen queues',
                      'Wallet / Prepaid': 'Students use a prepaid digital wallet to pay at canteen — no cash handling',
                      'Allergy Tracking': 'Track student allergies and auto-flag menu items that contain allergens',
                    } as Record<string, string>)[feat]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setCanteenToggles(p => ({ ...p, [feat]: !p[feat] }))} theme={theme} />
              </div>
            ))}
            <div className="pt-1">
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Menu Cycle</p>
              <SelectField options={['Weekly', 'Bi-weekly', 'Monthly']} value={menuCycle} onChange={setMenuCycle} theme={theme} />
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Meal Types" subtitle="Which meals does the school canteen serve?" theme={theme}>
          <div className="space-y-2">
            {Object.entries(mealTypes).map(([meal, enabled]) => (
              <div key={meal} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{meal}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Breakfast': 'Morning meal served before school hours (typically 7:30–8:30 AM)',
                      'Lunch': 'Mid-day meal served during lunch break',
                      'Snack': 'Light snack or tiffin served during short break',
                    } as Record<string, string>)[meal]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setMealTypes(p => ({ ...p, [meal]: !p[meal] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Preschool Meal Plan" subtitle="Meal plan type for nursery and kindergarten students" theme={theme}>
        <div className="space-y-3">
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Meal Plan Type</p>
            <SelectField options={['None', 'Snacks Only', 'Breakfast + Lunch', 'Full Day Meals']} value={preschoolMealPlan} onChange={setPreschoolMealPlan} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Dietary Preferences Tracking</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Record dietary restrictions or preferences per preschool child</p>
            </div>
            <SSAToggle on={dietaryPrefTracking} onChange={() => setDietaryPrefTracking(!dietaryPrefTracking)} theme={theme} />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

// ─── HOSTEL CONFIG MODULE ──────────────────────────
function HostelConfigModule({ theme }: { theme: Theme }) {
  const [curfewTime, setCurfewTime] = useState('21:00');
  const [hostelToggles, setHostelToggles] = useState<Record<string, boolean>>({
    'Mess Management': true, 'Visitor Log for Hostellers': true,
    'Fee Integration with Main Fee': true, 'Warden Assignment': true,
  });
  const [roomTypes, setRoomTypes] = useState(['Single', 'Double', 'Dormitory']);
  const [newRoomType, setNewRoomType] = useState('');

  return (
    <div className="space-y-4">
      <ModuleHeader title="Hostel Configuration" subtitle="Room types, mess, visitor log, warden, and curfew settings" theme={theme} />
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Hostel Features" subtitle="Core hostel management features for boarding students" theme={theme}>
          <div className="space-y-2">
            {Object.entries(hostelToggles).map(([feat, enabled]) => (
              <div key={feat} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{feat}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Mess Management': 'Manage daily mess menu, meal schedules, and dietary preferences for hostellers',
                      'Visitor Log for Hostellers': 'Track all visitors to the hostel — log entry time, purpose, and exit time',
                      'Fee Integration with Main Fee': 'Hostel fees are combined with school fees in a single invoice to parents',
                      'Warden Assignment': 'Assign wardens to specific floors or wings — wardens get access to their students\' data',
                    } as Record<string, string>)[feat]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setHostelToggles(p => ({ ...p, [feat]: !p[feat] }))} theme={theme} />
              </div>
            ))}
            <div className="pt-1">
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Curfew Time</p>
              <InputField value={curfewTime} onChange={setCurfewTime} theme={theme} type="time" />
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Room Types" subtitle="Add or remove accommodation categories" theme={theme}>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {roomTypes.map(r => (
              <span key={r} className={`flex items-center gap-1 px-3 py-1.5 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.highlight}`}>
                {r}
                <button onClick={() => setRoomTypes(p => p.filter(x => x !== r))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={newRoomType} onChange={e => setNewRoomType(e.target.value)} placeholder="Add room type..."
              className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
            <button onClick={() => { if (newRoomType.trim()) { setRoomTypes(p => [...p, newRoomType.trim()]); setNewRoomType(''); } }}
              className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={14} /></button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

// ─── INVENTORY & ASSET CONFIG MODULE ───────────────
function InventoryConfigModule({ theme }: { theme: Theme }) {
  const [lowStockThreshold, setLowStockThreshold] = useState('10');
  const [invToggles, setInvToggles] = useState<Record<string, boolean>>({
    'Barcode/QR Asset Tagging': true, 'Low Stock Alerts': true,
    'Depreciation Tracking': false,
  });
  const [assetCategories, setAssetCategories] = useState(['Furniture', 'Electronics', 'Lab Equipment', 'Sports', 'Books', 'Vehicles']);
  const [newAssetCat, setNewAssetCat] = useState('');
  const [autoApproveThreshold, setAutoApproveThreshold] = useState('5000');

  return (
    <div className="space-y-4">
      <ModuleHeader title="Inventory & Asset Configuration" subtitle="Asset tagging, stock alerts, purchase workflows, and depreciation" theme={theme} />
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Inventory Features" subtitle="Asset tracking, stock alerts, and depreciation management" theme={theme}>
          <div className="space-y-2">
            {Object.entries(invToggles).map(([feat, enabled]) => (
              <div key={feat} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{feat}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Barcode/QR Asset Tagging': 'Each asset gets a unique barcode/QR label — scan to view details, location, and condition',
                      'Low Stock Alerts': 'Auto-alert admin when consumable items (stationery, lab supplies) fall below threshold',
                      'Depreciation Tracking': 'Automatically calculate asset depreciation over time for accounting and budgeting',
                    } as Record<string, string>)[feat]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setInvToggles(p => ({ ...p, [feat]: !p[feat] }))} theme={theme} />
              </div>
            ))}
            <div className="pt-1">
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Low Stock Alert Threshold</p>
              <InputField value={lowStockThreshold} onChange={setLowStockThreshold} theme={theme} type="number" />
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Asset Categories" subtitle="Add or remove inventory categories" theme={theme}>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {assetCategories.map(c => (
              <span key={c} className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${theme.secondaryBg} text-xs font-medium ${theme.highlight}`}>
                {c}
                <button onClick={() => setAssetCategories(p => p.filter(x => x !== c))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={newAssetCat} onChange={e => setNewAssetCat(e.target.value)} placeholder="Add category..."
              className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
            <button onClick={() => { if (newAssetCat.trim()) { setAssetCategories(p => [...p, newAssetCat.trim()]); setNewAssetCat(''); } }}
              className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={14} /></button>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Purchase Approval Tiers" subtitle="Tiered approval chains based on purchase value" theme={theme}>
        <div className="space-y-3">
          <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight} mb-1`}>Purchase &lt; {'\u20B9'}50,000</p>
            <div className="flex items-center gap-2 flex-wrap">
              {['Admin', 'Principal'].map((step, i) => (
                <React.Fragment key={step}>
                  <span className={`text-[10px] px-2.5 py-1 rounded-lg ${theme.accentBg} ${theme.iconColor} font-bold`}>{step}</span>
                  {i < 1 && <span className={`text-[10px] ${theme.iconColor}`}>{'\u2192'}</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
            <p className={`text-xs font-bold ${theme.highlight} mb-1`}>Purchase &gt; {'\u20B9'}50,000</p>
            <div className="flex items-center gap-2 flex-wrap">
              {['Principal', 'Trust / Management'].map((step, i) => (
                <React.Fragment key={step}>
                  <span className={`text-[10px] px-2.5 py-1 rounded-lg ${theme.accentBg} ${theme.iconColor} font-bold`}>{step}</span>
                  {i < 1 && <span className={`text-[10px] ${theme.iconColor}`}>{'\u2192'}</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Auto-Approve Threshold ({'\u20B9'}) — purchases below this are auto-approved</p>
            <InputField value={autoApproveThreshold} onChange={setAutoApproveThreshold} theme={theme} type="number" placeholder="e.g. 5000" />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

// ─── COMPLIANCE & QUALITY CONFIG MODULE ────────────
function ComplianceConfigModule({ theme }: { theme: Theme }) {
  const [framework, setFramework] = useState('SQAAF');
  const [auditSchedule, setAuditSchedule] = useState('Quarterly');
  const [compToggles, setCompToggles] = useState<Record<string, boolean>>({
    'Auto-collect Data from Modules': true, 'Document Checklist': true,
  });
  const [domains, setDomains] = useState([
    { name: 'Curricular Aspects', score: '3.5/4' },
    { name: 'Teaching-Learning', score: '3.2/4' },
    { name: 'Infrastructure', score: '3.0/4' },
    { name: 'Student Support', score: '2.8/4' },
    { name: 'Governance & Leadership', score: '3.4/4' },
  ]);
  const [studentDocs, setStudentDocs] = useState([
    { name: 'Birth Certificate', required: true, mandatory: true },
    { name: 'Aadhaar Card', required: true, mandatory: true },
    { name: 'Previous School TC', required: true, mandatory: true },
    { name: 'Passport Photo', required: true, mandatory: true },
    { name: 'Caste Certificate', required: false, mandatory: false },
    { name: 'Income Certificate', required: false, mandatory: false },
    { name: 'Medical Certificate', required: true, mandatory: false },
    { name: 'Address Proof', required: true, mandatory: true },
  ]);
  const [staffDocs, setStaffDocs] = useState([
    { name: 'Aadhaar Card', required: true, mandatory: true },
    { name: 'PAN Card', required: true, mandatory: true },
    { name: 'Resume / CV', required: true, mandatory: true },
    { name: 'Degree Certificates', required: true, mandatory: true },
    { name: 'Experience Letters', required: true, mandatory: false },
    { name: 'Police Verification', required: true, mandatory: true },
    { name: 'Medical Fitness', required: true, mandatory: false },
    { name: 'NDA / Agreement', required: false, mandatory: false },
  ]);
  const [newStudentDoc, setNewStudentDoc] = useState('');
  const [newStaffDoc, setNewStaffDoc] = useState('');

  return (
    <div className="space-y-4">
      <ModuleHeader title="Compliance & Quality Configuration" subtitle="Assessment frameworks, audit schedules, and compliance domains" theme={theme} />
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Framework & Schedule" subtitle="Assessment standard and audit frequency" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Assessment Framework</p>
              <SelectField options={['SQAAF', 'NAAC', 'Custom']} value={framework} onChange={setFramework} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Audit Schedule</p>
              <SelectField options={['Quarterly', 'Bi-annual', 'Annual']} value={auditSchedule} onChange={setAuditSchedule} theme={theme} />
            </div>
            {Object.entries(compToggles).map(([feat, enabled]) => (
              <div key={feat} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{feat}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Auto-collect Data from Modules': 'Automatically pull compliance data from attendance, fees, academics etc. — no manual entry',
                      'Document Checklist': 'Maintain a checklist of required documents for each compliance domain (NOCs, licenses, etc.)',
                    } as Record<string, string>)[feat]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setCompToggles(p => ({ ...p, [feat]: !p[feat] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Compliance Domains" subtitle="Edit domain names and scores — add or remove" theme={theme}>
          <div className="space-y-2">
            {domains.map((d, i) => (
              <div key={i} className={`flex items-center gap-2 p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <input value={d.name} onChange={e => { const n = [...domains]; n[i] = { ...n[i], name: e.target.value }; setDomains(n); }}
                  className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-medium ${theme.highlight} outline-none`} />
                <input value={d.score} onChange={e => { const n = [...domains]; n[i] = { ...n[i], score: e.target.value }; setDomains(n); }}
                  className={`w-20 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs text-center font-bold ${theme.iconColor} outline-none`} />
                <button onClick={() => setDomains(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
              </div>
            ))}
            <button onClick={() => setDomains(p => [...p, { name: '', score: '' }])}
              className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
              <Plus size={12} /> Add Domain
            </button>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Required Documents" subtitle="Document requirements for student admission and staff joining" theme={theme}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-2 uppercase tracking-wide`}>Student Documents</p>
            <div className="space-y-1.5">
              {studentDocs.map((d, i) => (
                <div key={i} className={`flex items-center gap-2 p-2 rounded-xl ${theme.secondaryBg}`}>
                  <span className={`text-xs font-medium ${theme.highlight} flex-1`}>{d.name}</span>
                  <div className="flex items-center gap-1">
                    <span className={`text-[9px] ${theme.iconColor}`}>Req</span>
                    <SSAToggle on={d.required} onChange={() => { const n = [...studentDocs]; n[i] = { ...n[i], required: !n[i].required }; setStudentDocs(n); }} theme={theme} />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`text-[9px] ${theme.iconColor}`}>Mand</span>
                    <SSAToggle on={d.mandatory} onChange={() => { const n = [...studentDocs]; n[i] = { ...n[i], mandatory: !n[i].mandatory }; setStudentDocs(n); }} theme={theme} />
                  </div>
                  <button onClick={() => setStudentDocs(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <input value={newStudentDoc} onChange={e => setNewStudentDoc(e.target.value)} placeholder="Add document..."
                className={`flex-1 px-3 py-1.5 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
              <button onClick={() => { if (newStudentDoc.trim()) { setStudentDocs(p => [...p, { name: newStudentDoc.trim(), required: true, mandatory: false }]); setNewStudentDoc(''); } }}
                className={`px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={12} /></button>
            </div>
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-2 uppercase tracking-wide`}>Staff Documents</p>
            <div className="space-y-1.5">
              {staffDocs.map((d, i) => (
                <div key={i} className={`flex items-center gap-2 p-2 rounded-xl ${theme.secondaryBg}`}>
                  <span className={`text-xs font-medium ${theme.highlight} flex-1`}>{d.name}</span>
                  <div className="flex items-center gap-1">
                    <span className={`text-[9px] ${theme.iconColor}`}>Req</span>
                    <SSAToggle on={d.required} onChange={() => { const n = [...staffDocs]; n[i] = { ...n[i], required: !n[i].required }; setStaffDocs(n); }} theme={theme} />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`text-[9px] ${theme.iconColor}`}>Mand</span>
                    <SSAToggle on={d.mandatory} onChange={() => { const n = [...staffDocs]; n[i] = { ...n[i], mandatory: !n[i].mandatory }; setStaffDocs(n); }} theme={theme} />
                  </div>
                  <button onClick={() => setStaffDocs(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <input value={newStaffDoc} onChange={e => setNewStaffDoc(e.target.value)} placeholder="Add document..."
                className={`flex-1 px-3 py-1.5 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
              <button onClick={() => { if (newStaffDoc.trim()) { setStaffDocs(p => [...p, { name: newStaffDoc.trim(), required: true, mandatory: false }]); setNewStaffDoc(''); } }}
                className={`px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={12} /></button>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

// ─── HOMEWORK & ASSIGNMENT CONFIG MODULE ───────────
function HomeworkConfigModule({ theme }: { theme: Theme }) {
  const [submissionMode, setSubmissionMode] = useState('Both');
  const [hwGracePeriod, setHwGracePeriod] = useState('2');
  const [maxFileSize, setMaxFileSize] = useState('10');
  const [hwToggles, setHwToggles] = useState<Record<string, boolean>>({
    'Allow Late Submission': true, 'Parent Notification on Assignment': true,
    'Plagiarism Check': false,
  });

  return (
    <div className="space-y-4">
      <ModuleHeader title="Homework & Assignment Configuration" subtitle="Submission modes, late policies, notifications, and plagiarism checks" theme={theme} />
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Submission Settings" subtitle="Mode, file limits, and late policy" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Submission Mode</p>
              <SelectField options={['Online Only', 'Offline Only', 'Both']} value={submissionMode} onChange={setSubmissionMode} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Late Submission Grace Period (days)</p>
              <InputField value={hwGracePeriod} onChange={setHwGracePeriod} theme={theme} type="number" />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max File Upload Size (MB)</p>
              <InputField value={maxFileSize} onChange={setMaxFileSize} theme={theme} type="number" />
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Assignment Features" subtitle="Notifications, late policy, and quality checks for homework" theme={theme}>
          <div className="space-y-2">
            {Object.entries(hwToggles).map(([feat, enabled]) => (
              <div key={feat} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{feat}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Allow Late Submission': 'Students can submit homework after the deadline within the grace period',
                      'Parent Notification on Assignment': 'Parents receive a notification when a new assignment is posted for their child',
                      'Plagiarism Check': 'System checks submitted assignments for copied content from other students',
                    } as Record<string, string>)[feat]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setHwToggles(p => ({ ...p, [feat]: !p[feat] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

// ─── ENQUIRY & ADMISSION CONFIG MODULE ─────────────
function EnquiryAdmissionConfigModule({ theme }: { theme: Theme }) {
  const [admissionMode, setAdmissionMode] = useState('Both Online + Offline');
  const [applicationFee, setApplicationFee] = useState('500');
  const [enqToggles, setEnqToggles] = useState<Record<string, boolean>>({
    'Auto-assign Follow-ups': true, 'Online Application Form': true,
    'Auto-generate Admission Number': true, 'Document Upload Required': true,
  });
  const [photoMandatory, setPhotoMandatory] = useState(true);
  const [leadSources, setLeadSources] = useState(['Website', 'Walk-in', 'Phone', 'Social Media', 'Referral', 'Fair']);
  const [newLeadSource, setNewLeadSource] = useState('');
  const [enquirySources, setEnquirySources] = useState([
    { name: 'Walk-in', active: true, priority: 1 },
    { name: 'Phone Call', active: true, priority: 2 },
    { name: 'Website Form', active: true, priority: 3 },
    { name: 'Social Media (Facebook/Instagram)', active: true, priority: 4 },
    { name: 'Referral (Parent)', active: true, priority: 5 },
    { name: 'Referral (Staff)', active: true, priority: 6 },
    { name: 'Newspaper Ad', active: true, priority: 7 },
    { name: 'School Fair / Event', active: true, priority: 8 },
    { name: 'Google Ads', active: false, priority: 9 },
    { name: 'WhatsApp', active: true, priority: 10 },
  ]);
  const [newEnqSource, setNewEnqSource] = useState('');

  return (
    <div className="space-y-4">
      <ModuleHeader title="Enquiry & Admission Configuration" subtitle="Lead sources, follow-ups, application forms, and admission settings" theme={theme} />
      <div className="grid grid-cols-2 gap-4">
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
                    ({
                      'Auto-assign Follow-ups': 'System auto-assigns follow-up tasks to counselors based on enquiry source and age',
                      'Online Application Form': 'Parents can fill the admission application form online from school website',
                      'Auto-generate Admission Number': 'System auto-generates unique admission number when a student is admitted',
                      'Document Upload Required': 'Parents must upload required documents (birth certificate, photos, etc.) during admission',
                    } as Record<string, string>)[feat]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setEnqToggles(p => ({ ...p, [feat]: !p[feat] }))} theme={theme} />
              </div>
            ))}
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Photo Mandatory at Admission</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Student photo required to complete admission process</p>
              </div>
              <SSAToggle on={photoMandatory} onChange={() => setPhotoMandatory(!photoMandatory)} theme={theme} />
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Lead Sources" subtitle="Add or remove enquiry sources" theme={theme}>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {leadSources.map(s => (
              <span key={s} className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${theme.secondaryBg} text-xs font-medium ${theme.highlight}`}>
                <CheckCircle size={10} className="text-emerald-500" /> {s}
                <button onClick={() => setLeadSources(p => p.filter(x => x !== s))} className="text-red-400 hover:text-red-600 ml-1"><X size={10} /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={newLeadSource} onChange={e => setNewLeadSource(e.target.value)} placeholder="Add source..."
              className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
            <button onClick={() => { if (newLeadSource.trim()) { setLeadSources(p => [...p, newLeadSource.trim()]); setNewLeadSource(''); } }}
              className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={14} /></button>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Enquiry Sources" subtitle="Detailed source tracking with priority order for lead management" theme={theme}>
        <div className="space-y-1.5">
          {enquirySources.sort((a, b) => a.priority - b.priority).map((s, i) => (
            <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <span className={`text-[10px] w-6 h-6 rounded-full ${theme.primary} text-white flex items-center justify-center font-bold shrink-0`}>{s.priority}</span>
              <input value={s.name} onChange={e => { const n = [...enquirySources]; n[i] = { ...n[i], name: e.target.value }; setEnquirySources(n); }}
                className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-medium ${theme.highlight} outline-none`} />
              <div className="flex items-center gap-1.5">
                <button onClick={() => { if (s.priority > 1) { const n = [...enquirySources]; const idx = n.findIndex(x => x.priority === s.priority - 1); if (idx >= 0) { n[idx] = { ...n[idx], priority: s.priority }; } n[i] = { ...n[i], priority: s.priority - 1 }; setEnquirySources(n); } }}
                  className={`${theme.buttonHover} p-1 rounded`}><ChevronUp size={12} className={theme.iconColor} /></button>
                <button onClick={() => { const n = [...enquirySources]; const idx = n.findIndex(x => x.priority === s.priority + 1); if (idx >= 0) { n[idx] = { ...n[idx], priority: s.priority }; } n[i] = { ...n[i], priority: s.priority + 1 }; setEnquirySources(n); }}
                  className={`${theme.buttonHover} p-1 rounded`}><ChevronDown size={12} className={theme.iconColor} /></button>
              </div>
              <SSAToggle on={s.active} onChange={() => { const n = [...enquirySources]; n[i] = { ...n[i], active: !n[i].active }; setEnquirySources(n); }} theme={theme} />
              <button onClick={() => setEnquirySources(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={12} /></button>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-2">
          <input value={newEnqSource} onChange={e => setNewEnqSource(e.target.value)} placeholder="Add enquiry source..."
            className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
          <button onClick={() => { if (newEnqSource.trim()) { setEnquirySources(p => [...p, { name: newEnqSource.trim(), active: true, priority: p.length + 1 }]); setNewEnqSource(''); } }}
            className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={14} /></button>
        </div>
      </SectionCard>
    </div>
  );
}

// ─── ONLINE PAYMENT CONFIG MODULE ──────────────────
function OnlinePaymentConfigModule({ theme }: { theme: Theme }) {
  const [gateway, setGateway] = useState('Razorpay');
  const [refundPolicy, setRefundPolicy] = useState('Manual');
  const [convenienceFeeAmt, setConvenienceFeeAmt] = useState('0');
  const [payToggles, setPayToggles] = useState<Record<string, boolean>>({
    'Auto-receipt Generation': true, 'Partial Payment Allowed': false,
    'Convenience Fee': false,
  });

  return (
    <div className="space-y-4">
      <ModuleHeader title="Online Payment Configuration" subtitle="Payment gateway, receipts, partial payments, and refund policy" theme={theme} />
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Gateway & Policy" subtitle="Payment provider and refund settings" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Payment Gateway</p>
              <SelectField options={['Razorpay', 'PayU', 'CCAvenue', 'Cashfree']} value={gateway} onChange={setGateway} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Refund Policy</p>
              <SelectField options={['Manual', 'Auto']} value={refundPolicy} onChange={setRefundPolicy} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Convenience Fee Amount ({'\u20B9'})</p>
              <InputField value={convenienceFeeAmt} onChange={setConvenienceFeeAmt} theme={theme} type="number" />
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Payment Features" subtitle="Receipt generation, partial payments, and convenience fees" theme={theme}>
          <div className="space-y-2">
            {Object.entries(payToggles).map(([feat, enabled]) => (
              <div key={feat} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{feat}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Auto-receipt Generation': 'System automatically generates a payment receipt and sends it to parents after successful payment',
                      'Partial Payment Allowed': 'Parents can pay a portion of the total fee instead of the full amount at once',
                      'Convenience Fee': 'Add a small processing fee on online payments to cover payment gateway charges',
                    } as Record<string, string>)[feat]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setPayToggles(p => ({ ...p, [feat]: !p[feat] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

// ─── DATA MIGRATION MODULE (B1 — file upload + step wizard) ─────────────────────────
function DataMigrationModule({ theme }: { theme: Theme }) {
  const [imports, setImports] = useState([
    { type: 'Students', template: 'students-template.xlsx', status: 'not-started' as string, records: 0, errors: 0, fileName: '', step: 0 },
    { type: 'Staff', template: 'staff-template.xlsx', status: 'not-started' as string, records: 0, errors: 0, fileName: '', step: 0 },
    { type: 'Fee Records', template: 'fees-template.xlsx', status: 'not-started' as string, records: 0, errors: 0, fileName: '', step: 0 },
    { type: 'Library Books', template: 'library-template.xlsx', status: 'not-started' as string, records: 0, errors: 0, fileName: '', step: 0 },
    { type: 'Transport Data', template: 'transport-template.xlsx', status: 'not-started' as string, records: 0, errors: 0, fileName: '', step: 0 },
    { type: 'Attendance History', template: 'attendance-template.xlsx', status: 'not-started' as string, records: 0, errors: 0, fileName: '', step: 0 },
  ]);
  const [recentImports, setRecentImports] = useState([
    { type: 'Students', date: '20 Feb 2026', records: 450, status: 'completed' },
    { type: 'Staff', date: '20 Feb 2026', records: 98, status: 'completed' },
  ]);
  const steps = ['Upload', 'Map Fields', 'Validate', 'Import'];

  const handleFileSelect = (index: number) => {
    setImports(p => {
      const n = [...p];
      n[index] = { ...n[index], fileName: `${n[index].type.toLowerCase().replace(/ /g, '-')}-data.xlsx`, step: 1, status: 'uploading' };
      return n;
    });
    // Simulate upload progression
    setTimeout(() => {
      setImports(p => { const n = [...p]; n[index] = { ...n[index], step: 2, status: 'mapping' }; return n; });
    }, 800);
  };

  const advanceStep = (index: number) => {
    setImports(p => {
      const n = [...p];
      const imp = n[index];
      if (imp.step === 2) { n[index] = { ...imp, step: 3, status: 'validating', records: Math.floor(Math.random() * 400) + 100, errors: Math.floor(Math.random() * 5) }; }
      else if (imp.step === 3) { n[index] = { ...imp, step: 4, status: 'completed' }; setRecentImports(prev => [{ type: imp.type, date: '26 Feb 2026', records: imp.records, status: 'completed' }, ...prev]); }
      return n;
    });
  };

  const rollbackImport = (type: string) => {
    setRecentImports(p => p.filter(r => r.type !== type));
    setImports(p => p.map(imp => imp.type === type ? { ...imp, status: 'not-started', step: 0, records: 0, errors: 0, fileName: '' } : imp));
  };

  return (
    <div className="space-y-4">
      <ModuleHeader title="Data Migration" subtitle="Import existing data with step-by-step validation — Upload, Map Fields, Validate, Import" theme={theme} />

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3">
        <AlertTriangle size={16} className="text-blue-500 mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-bold text-blue-800">Before You Import</p>
          <p className="text-xs text-blue-700 mt-1">Download the template for each data type, fill it following the format exactly, then upload. Validation runs automatically. You can rollback any import within 24 hours.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {imports.map((imp, i) => (
          <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className={`text-sm font-bold ${theme.highlight}`}>{imp.type}</h3>
              <span className={`text-[9px] px-2 py-0.5 rounded-lg font-bold ${
                imp.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                imp.status === 'not-started' ? 'bg-slate-100 text-slate-500' : 'bg-blue-100 text-blue-700'
              }`}>
                {imp.status === 'not-started' ? 'NOT STARTED' : imp.status.toUpperCase()}
              </span>
            </div>

            {/* Step progress indicator */}
            {imp.step > 0 && (
              <div className="flex items-center gap-1 mb-3">
                {steps.map((s, si) => (
                  <React.Fragment key={s}>
                    <div className={`flex items-center justify-center w-5 h-5 rounded-full text-[8px] font-bold ${
                      si < imp.step ? 'bg-emerald-500 text-white' : si === imp.step ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.iconColor}`
                    }`}>{si < imp.step ? '\u2713' : si + 1}</div>
                    {si < steps.length - 1 && <div className={`flex-1 h-0.5 ${si < imp.step ? 'bg-emerald-500' : theme.secondaryBg}`} />}
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* Download Template */}
            <button onClick={() => {
              const link = document.createElement('a');
              link.href = `data:text/csv;charset=utf-8,${encodeURIComponent(`ID,Name,${imp.type === 'Students' ? 'Class,Section,Roll No,Parent Name,Phone' : 'Department,Designation,Phone,Email'}\n`)}`;
              link.download = imp.template.replace('.xlsx', '.csv');
              link.click();
            }} className={`w-full flex items-center justify-center gap-2 p-2.5 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} mb-2 transition-all`}>
              <Download size={14} className={theme.iconColor} />
              <span className={`text-xs font-bold ${theme.iconColor}`}>Download Template</span>
            </button>

            {/* File upload area */}
            {imp.step === 0 && (
              <label className={`w-full border-2 border-dashed ${theme.border} rounded-xl p-4 text-center cursor-pointer ${theme.buttonHover} transition-all block`}>
                <input type="file" accept=".csv,.xlsx,.xls" className="hidden" onChange={() => handleFileSelect(i)} />
                <Upload size={20} className={`mx-auto mb-1 ${theme.iconColor}`} />
                <p className={`text-[10px] ${theme.iconColor}`}>Drop CSV/Excel file here or click to browse</p>
              </label>
            )}

            {/* File selected — show step actions */}
            {imp.step > 0 && imp.fileName && (
              <div className={`p-2.5 rounded-xl ${theme.secondaryBg} space-y-2`}>
                <div className="flex items-center gap-2">
                  <FileText size={12} className={theme.iconColor} />
                  <span className={`text-[10px] font-bold ${theme.highlight} flex-1 truncate`}>{imp.fileName}</span>
                  {imp.step < 4 && (
                    <button onClick={() => setImports(p => { const n = [...p]; n[i] = { ...n[i], step: 0, status: 'not-started', fileName: '', records: 0, errors: 0 }; return n; })}
                      className="text-red-400 hover:text-red-600"><X size={10} /></button>
                  )}
                </div>
                {imp.step === 2 && (
                  <div>
                    <p className={`text-[10px] ${theme.iconColor} mb-1`}>Map your file columns to system fields:</p>
                    <div className={`text-[9px] ${theme.iconColor} space-y-0.5`}>
                      <div className="flex justify-between"><span>Column A → Name</span><span className="text-emerald-500 font-bold">Mapped</span></div>
                      <div className="flex justify-between"><span>Column B → Class/Dept</span><span className="text-emerald-500 font-bold">Mapped</span></div>
                      <div className="flex justify-between"><span>Column C → Phone</span><span className="text-emerald-500 font-bold">Mapped</span></div>
                    </div>
                    <button onClick={() => advanceStep(i)} className={`mt-2 w-full px-3 py-1.5 rounded-xl text-[10px] font-bold ${theme.primary} text-white`}>Validate Data</button>
                  </div>
                )}
                {imp.step === 3 && (
                  <div>
                    <div className="flex justify-between text-[10px] mb-1">
                      <span className={theme.iconColor}>Records: <strong>{imp.records}</strong></span>
                      {imp.errors > 0 && <span className="text-amber-600">Warnings: {imp.errors}</span>}
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-200 mb-2">
                      <div className="h-full rounded-full bg-emerald-500" style={{ width: `${((imp.records - imp.errors) / imp.records) * 100}%` }} />
                    </div>
                    <button onClick={() => advanceStep(i)} className={`w-full px-3 py-1.5 rounded-xl text-[10px] font-bold ${theme.primary} text-white`}>Import {imp.records} Records</button>
                  </div>
                )}
                {imp.step === 4 && (
                  <div className="flex items-center gap-1.5 text-[10px]">
                    <CheckCircle size={12} className="text-emerald-500" />
                    <span className="text-emerald-700 font-bold">{imp.records} records imported successfully</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Recent imports with rollback */}
      {recentImports.length > 0 && (
        <SectionCard title="Recent Imports" subtitle="Rollback any import within 24 hours" theme={theme}>
          <div className={`rounded-xl border ${theme.border} overflow-hidden`}>
            <table className="w-full text-[10px]">
              <thead className={theme.secondaryBg}>
                <tr>
                  {['Data Type', 'Date', 'Records', 'Status', 'Action'].map(h => (
                    <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor} text-[9px] uppercase`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentImports.map((r, i) => (
                  <tr key={i} className={`border-t ${theme.border}`}>
                    <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{r.type}</td>
                    <td className={`px-3 py-2 ${theme.iconColor}`}>{r.date}</td>
                    <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{r.records}</td>
                    <td className="px-3 py-2"><span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-700">Completed</span></td>
                    <td className="px-3 py-2">
                      <button onClick={() => rollbackImport(r.type)} className="text-[9px] font-bold text-red-500 hover:underline">Rollback</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}
    </div>
  );
}

// ─── OTP VERIFICATION MODAL ─────────────────────────
function OTPVerificationModal({ theme, onClose, onVerify }: { theme: Theme; onClose: () => void; onVerify: () => void }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [verified, setVerified] = useState(false);

  React.useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [timer]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleVerify = () => {
    setVerified(true);
    setTimeout(() => {
      onVerify();
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className={`${theme.cardBg} rounded-2xl shadow-2xl border ${theme.border} w-full max-w-md p-6`}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
            <Lock size={18} className="text-rose-600" />
          </div>
          <div>
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Critical Change &mdash; OTP Required</h3>
            <p className={`text-[10px] ${theme.iconColor}`}>This field is locked by Super Admin</p>
          </div>
        </div>

        {/* Info */}
        <div className={`${theme.secondaryBg} rounded-xl p-3 mb-4`}>
          <p className={`text-xs ${theme.highlight}`}>An OTP has been sent to the registered Trustee/Principal.</p>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5">
              <Phone size={10} className={theme.iconColor} />
              <span className={`text-[10px] ${theme.iconColor}`}>+91 ****43210</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail size={10} className={theme.iconColor} />
              <span className={`text-[10px] ${theme.iconColor}`}>p****@school.edu</span>
            </div>
          </div>
        </div>

        {verified ? (
          <div className="text-center py-6">
            <CheckCircle size={40} className="text-emerald-500 mx-auto mb-2" />
            <p className={`text-sm font-bold text-emerald-700`}>OTP Verified Successfully</p>
            <p className={`text-[10px] ${theme.iconColor} mt-1`}>Proceeding with the change...</p>
          </div>
        ) : (
          <>
            {/* OTP Input */}
            <div className="mb-4">
              <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-2`}>Enter 6-digit OTP</p>
              <div className="flex gap-2 justify-center">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOtpChange(i, e.target.value)}
                    className={`w-10 h-12 text-center text-lg font-bold rounded-xl border-2 ${digit ? 'border-rose-400 bg-rose-50' : theme.border} ${theme.inputBg} ${theme.highlight} outline-none focus:ring-2 focus:ring-rose-300`}
                  />
                ))}
              </div>
            </div>

            {/* Timer */}
            <div className="text-center mb-4">
              {timer > 0 ? (
                <p className={`text-[10px] ${theme.iconColor}`}>Resend OTP in <span className="font-bold text-rose-600">0:{timer.toString().padStart(2, '0')}</span></p>
              ) : (
                <button className="text-[10px] font-bold text-rose-600 underline" onClick={() => setTimer(30)}>Resend OTP</button>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button onClick={onClose}
                className={`flex-1 px-4 py-2.5 ${theme.secondaryBg} rounded-xl text-xs font-bold ${theme.highlight}`}>
                Cancel
              </button>
              <button onClick={handleVerify}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-500 text-white rounded-xl text-xs font-bold`}>
                <Key size={12} /> Verify &amp; Proceed
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── CRITICAL LOCKS MODULE ──────────────────────────
function CriticalLocksModule({ theme }: { theme: Theme }) {
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [lockFields] = useState([
    { field: 'Fee Structure Changes', description: 'Modify fee heads, amounts', locked: true, setBy: 'Super Admin (Onboarding)', lastOTP: '18 Feb 2026, 2:30 PM' },
    { field: 'Student Profile Deletion', description: 'Permanently delete student records', locked: true, setBy: 'Super Admin (Onboarding)', lastOTP: '17 Feb 2026, 11:15 AM' },
    { field: 'Staff Profile Deletion', description: 'Permanently delete staff records', locked: true, setBy: 'Super Admin (Onboarding)', lastOTP: 'Never' },
    { field: 'Payment Mode Changes', description: 'Add/remove payment methods', locked: false, setBy: '-', lastOTP: '-' },
    { field: 'Concession Approval (>25%)', description: 'Approve large concessions', locked: false, setBy: '-', lastOTP: '-' },
    { field: 'Permission/Role Changes', description: 'Modify role permissions', locked: true, setBy: 'Super Admin (Onboarding)', lastOTP: '16 Feb 2026, 4:00 PM' },
    { field: 'Transport Route Deletion', description: 'Delete transport routes', locked: false, setBy: '-', lastOTP: '-' },
    { field: 'Data Export/Migration', description: 'Export or migrate school data', locked: false, setBy: '-', lastOTP: '-' },
    { field: 'Audit Log Access', description: 'View detailed audit logs', locked: true, setBy: 'Super Admin (Onboarding)', lastOTP: '18 Feb 2026, 9:00 AM' },
    { field: 'Academic Calendar Changes', description: 'Modify academic calendar dates', locked: true, setBy: 'Super Admin (Onboarding)', lastOTP: 'Never' },
  ]);

  const [lockEvents] = useState([
    { time: '18 Feb 2026, 2:30 PM', event: 'Fee structure edit attempted', action: 'OTP sent', result: 'Verified by Principal', status: 'success' },
    { time: '18 Feb 2026, 9:00 AM', event: 'Audit log access requested', action: 'OTP sent', result: 'Verified by Trustee', status: 'success' },
    { time: '17 Feb 2026, 3:45 PM', event: 'Student deletion attempted', action: 'OTP sent', result: 'Cancelled by user', status: 'cancelled' },
    { time: '17 Feb 2026, 11:15 AM', event: 'Student profile deletion', action: 'OTP sent', result: 'Verified by Principal', status: 'success' },
    { time: '16 Feb 2026, 4:00 PM', event: 'Role permission change', action: 'OTP sent', result: 'Verified by Trustee', status: 'success' },
    { time: '15 Feb 2026, 2:00 PM', event: 'Fee head modification attempted', action: 'OTP sent', result: 'OTP expired (not entered)', status: 'expired' },
  ]);

  const lockedCount = lockFields.filter(f => f.locked).length;

  return (
    <div className="space-y-4">
      <h2 className={`text-lg font-bold ${theme.highlight}`}>Critical Field Locks</h2>
      <p className={`text-xs ${theme.iconColor}`}>Manage locked fields that require OTP verification for changes</p>

      {/* Info Banner */}
      <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-4 flex items-start gap-3">
        <Lock size={20} className="text-rose-500 mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-bold text-rose-800">Field Locking is Configured by Super Admin</p>
          <p className="text-xs text-rose-700 mt-1">
            Locked fields require OTP verification from the registered Trustee/Principal before any changes can be made.
            Only the Saaras Super Admin can add or remove field locks during onboarding or via support request.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={Lock} label="Fields Locked" value={String(lockedCount)} color="bg-rose-500" theme={theme} />
        <StatCard icon={Key} label="OTP Verifications" value="5" color="bg-emerald-500" theme={theme} />
        <StatCard icon={AlertTriangle} label="Failed / Expired" value="1" color="bg-amber-500" theme={theme} />
        <StatCard icon={Shield} label="Auth Contact" value="Trustee" color="bg-indigo-500" theme={theme} />
      </div>

      {/* Lock Status Table */}
      <SectionCard title="Lockable Fields" subtitle="Current lock status for all critical fields" theme={theme}>
        <div className="space-y-1.5">
          {lockFields.map(f => (
            <div key={f.field} className={`flex items-center justify-between p-3 rounded-xl ${f.locked ? 'bg-rose-50 border border-rose-200' : theme.secondaryBg} transition-all`}>
              <div className="flex items-center gap-3 flex-1">
                {f.locked ? <Lock size={14} className="text-rose-500 shrink-0" /> : <Key size={14} className="text-slate-300 shrink-0" />}
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${theme.highlight}`}>{f.field}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${f.locked ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-500'}`}>
                      {f.locked ? 'LOCKED' : 'UNLOCKED'}
                    </span>
                  </div>
                  <p className={`text-[10px] ${theme.iconColor}`}>{f.description}</p>
                  {f.locked && (
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`text-[9px] ${theme.iconColor}`}>Set by: <strong>{f.setBy}</strong></span>
                      <span className={`text-[9px] ${theme.iconColor}`}>Last OTP: <strong>{f.lastOTP}</strong></span>
                    </div>
                  )}
                </div>
              </div>
              {f.locked && (
                <button onClick={() => setShowOTPModal(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-100 border border-rose-300 text-rose-700 rounded-lg text-[10px] font-bold hover:bg-rose-200 transition-all">
                  <Key size={10} /> Request Unlock
                </button>
              )}
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Recent Lock Events */}
      <SectionCard title="Recent Lock Events" subtitle="OTP verification history for critical field changes" theme={theme}>
        <div className={`rounded-xl border ${theme.border} overflow-hidden`}>
          <table className="w-full text-xs">
            <thead className={theme.secondaryBg}>
              <tr>
                {['Time', 'Event', 'Action', 'Result', 'Status'].map(h => (
                  <th key={h} className={`text-left px-3 py-2.5 font-bold ${theme.iconColor} uppercase text-[10px]`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lockEvents.map((evt, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className={`px-3 py-2.5 ${theme.iconColor} text-[10px] whitespace-nowrap`}>{evt.time}</td>
                  <td className={`px-3 py-2.5 font-medium ${theme.highlight}`}>{evt.event}</td>
                  <td className={`px-3 py-2.5 ${theme.iconColor}`}>{evt.action}</td>
                  <td className={`px-3 py-2.5 ${theme.highlight}`}>{evt.result}</td>
                  <td className="px-3 py-2.5">
                    <span className={`text-[9px] px-2 py-0.5 rounded-lg font-bold ${
                      evt.status === 'success' ? 'bg-emerald-100 text-emerald-700' :
                      evt.status === 'cancelled' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {evt.status === 'success' ? 'VERIFIED' : evt.status === 'cancelled' ? 'CANCELLED' : 'EXPIRED'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* Master Contact Info */}
      <SectionCard title="Authentication Contact" subtitle="OTP is sent to this contact for all locked field changes" theme={theme}>
        <div className={`${theme.secondaryBg} rounded-xl p-4`}>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1`}>Role</p>
              <p className={`text-xs font-bold ${theme.highlight}`}>Trustee</p>
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1`}>Phone</p>
              <div className="flex items-center gap-1.5">
                <Phone size={10} className={theme.iconColor} />
                <p className={`text-xs ${theme.highlight}`}>+91 98765 43210</p>
              </div>
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-1`}>Email</p>
              <div className="flex items-center gap-1.5">
                <Mail size={10} className={theme.iconColor} />
                <p className={`text-xs ${theme.highlight}`}>principal@dpsahmedabad.edu</p>
              </div>
            </div>
          </div>
          <p className={`text-[10px] ${theme.iconColor} mt-3`}>To change the authentication contact, please contact Saaras Support with a formal request from the school authority.</p>
        </div>
      </SectionCard>

      {/* OTP Modal */}
      {showOTPModal && (
        <OTPVerificationModal
          theme={theme}
          onClose={() => setShowOTPModal(false)}
          onVerify={() => setShowOTPModal(false)}
        />
      )}
    </div>
  );
}

// ─── AUDIT LOG MODULE ──────────────────────────────
function AuditLogModule({ theme }: { theme: Theme }) {
  const [filterModule, setFilterModule] = useState('All');
  const [logs] = useState([
    { date: '18 Feb 2026 14:30', action: 'Updated', module: 'Fees', details: 'Changed Class 9-10 Tuition Fee: 5000 to 5500', user: 'admin@school.com' },
    { date: '18 Feb 2026 11:15', action: 'Created', module: 'Transport', details: 'Added Route D: 10 stops, 45 capacity', user: 'admin@school.com' },
    { date: '17 Feb 2026 16:45', action: 'Updated', module: 'Leave', details: 'Modified approval chain: Added VP as Level 2', user: 'admin@school.com' },
    { date: '17 Feb 2026 10:20', action: 'Uploaded', module: 'Exams', details: 'Report card template: CBSE standard v2', user: 'admin@school.com' },
    { date: '16 Feb 2026 09:00', action: 'Updated', module: 'Communication', details: 'DM permission: Parent to Teacher set to ON', user: 'admin@school.com' },
    { date: '15 Feb 2026 15:30', action: 'Created', module: 'HR', details: 'New department: Sports', user: 'admin@school.com' },
    { date: '15 Feb 2026 11:00', action: 'Updated', module: 'Attendance', details: 'Grace period changed: 10 min to 15 min', user: 'admin@school.com' },
    { date: '14 Feb 2026 14:00', action: 'Deleted', module: 'Transport', details: 'Removed Route X (no students assigned)', user: 'admin@school.com' },
  ]);

  const filteredLogs = filterModule === 'All' ? logs : logs.filter(l => l.module === filterModule);
  const allModules = ['All', ...Array.from(new Set(logs.map(l => l.module)))];

  return (
    <div className="space-y-4">
      <h2 className={`text-lg font-bold ${theme.highlight}`}>Audit Log</h2>
      <p className={`text-xs ${theme.iconColor}`}>Read-only view of configuration changes (limited subset for SSA)</p>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-start gap-2">
        <Lock size={14} className="text-amber-500 mt-0.5 shrink-0" />
        <p className="text-xs text-amber-700">Full audit logs with IP addresses and before/after values are accessible only to Saaras Account Manager. You can view a summary of recent changes here.</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          {allModules.map(m => (
            <button key={m} onClick={() => setFilterModule(m)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filterModule === m ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.highlight}`}`}>
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden`}>
        <table className="w-full text-xs">
          <thead className={theme.secondaryBg}>
            <tr>
              {['Date / Time', 'Action', 'Module', 'Details', 'User'].map(h => (
                <th key={h} className={`text-left px-4 py-3 font-bold ${theme.iconColor} uppercase text-[10px]`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log, i) => (
              <tr key={i} className={`border-t ${theme.border}`}>
                <td className={`px-4 py-3 ${theme.iconColor} text-[10px] whitespace-nowrap`}>{log.date}</td>
                <td className="px-4 py-3">
                  <span className={`text-[9px] px-2 py-0.5 rounded-lg font-bold ${
                    log.action === 'Created' ? 'bg-emerald-100 text-emerald-700' :
                    log.action === 'Updated' ? 'bg-blue-100 text-blue-700' :
                    log.action === 'Deleted' ? 'bg-red-100 text-red-700' : 'bg-purple-100 text-purple-700'
                  }`}>{log.action}</span>
                </td>
                <td className={`px-4 py-3 font-bold ${theme.highlight}`}>{log.module}</td>
                <td className={`px-4 py-3 ${theme.highlight}`}>{log.details}</td>
                <td className={`px-4 py-3 ${theme.iconColor} text-[10px]`}>{log.user}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── PARENT PORTAL CONFIG MODULE ──────────────────
function ParentPortalConfigModule({ theme }: { theme: Theme }) {
  const [multiChild, setMultiChild] = useState(true);
  const [feePayment, setFeePayment] = useState(true);
  const [ptmBooking, setPtmBooking] = useState(true);
  const [leaveApplication, setLeaveApplication] = useState(true);
  const [transportTracking, setTransportTracking] = useState(true);
  const [commMode, setCommMode] = useState('Full Two-Way');
  const [reportCardAccess, setReportCardAccess] = useState(true);
  const [reportCardVisibility, setReportCardVisibility] = useState('After Principal Approval');
  const [moduleToggles, setModuleToggles] = useState<Record<string, boolean>>({
    Fees: true, Attendance: true, Exams: true, LMS: false, Enquiry: true, Visitor: true,
    Transport: true, Library: false, Hostel: false, Canteen: false, Alumni: false,
    Communication: true, HR: false, Certificate: true,
  });

  return (
    <div className="space-y-4">
      <ModuleHeader title="Parent Portal Configuration" subtitle="Control what parents can access and do through their portal" theme={theme} />

      <SectionCard title="Portal Features" subtitle="Toggle features available to parents" theme={theme}>
        <div className="space-y-2">
          {[
            { label: 'Multi-child support (family account with child toggle)', value: multiChild, setter: setMultiChild },
            { label: 'Fee payment via portal', value: feePayment, setter: setFeePayment },
            { label: 'PTM booking', value: ptmBooking, setter: setPtmBooking },
            { label: 'Leave application (for child)', value: leaveApplication, setter: setLeaveApplication },
            { label: 'Transport tracking (live bus location)', value: transportTracking, setter: setTransportTracking },
          ].map(item => (
            <div key={item.label} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <span className={`text-xs ${theme.highlight}`}>{item.label}</span>
              <SSAToggle on={item.value} onChange={() => item.setter(!item.value)} theme={theme} />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Report Card Access" subtitle="Control when parents can view report cards" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Report Card Access via Portal</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Parents can download report cards from the parent portal</p>
            </div>
            <SSAToggle on={reportCardAccess} onChange={() => setReportCardAccess(!reportCardAccess)} theme={theme} />
          </div>
          {reportCardAccess && (
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Report Card Visibility</p>
              <SelectField options={['Immediately', 'After Principal Approval', 'After X Days']} value={reportCardVisibility} onChange={setReportCardVisibility} theme={theme} />
              <p className={`text-[10px] ${theme.iconColor} mt-1`}>
                {reportCardVisibility === 'Immediately' ? 'Report cards are visible as soon as results are published' :
                 reportCardVisibility === 'After Principal Approval' ? 'Principal must approve before parents can view' :
                 'Report cards become visible after a set number of days post-publication'}
              </p>
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Communication Mode" subtitle="How parents interact with school staff" theme={theme}>
        <SelectField options={['Full Two-Way', 'Reply Only', 'Broadcast']} value={commMode} onChange={setCommMode} theme={theme} />
        <p className={`text-[10px] ${theme.iconColor} mt-2`}>
          {commMode === 'Full Two-Way' ? 'Parents can initiate and reply to messages' :
           commMode === 'Reply Only' ? 'Parents can only reply to school-initiated messages' :
           'Parents receive announcements only, no reply option'}
        </p>
      </SectionCard>

      <SectionCard title="Module-Level Feature Toggles" subtitle="Enable or disable entire modules for this portal" theme={theme}>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
          {Object.entries(moduleToggles).map(([mod, enabled]) => (
            <div key={mod} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <span className={`text-xs font-medium ${theme.highlight}`}>{mod}</span>
              <SSAToggle on={enabled} onChange={() => setModuleToggles(p => ({ ...p, [mod]: !p[mod] }))} theme={theme} />
            </div>
          ))}
        </div>
      </SectionCard>

    </div>
  );
}

// ─── STUDENT PORTAL CONFIG MODULE ─────────────────
function StudentPortalConfigModule({ theme }: { theme: Theme }) {
  const [homeworkSubmission, setHomeworkSubmission] = useState(true);
  const [showClassRank, setShowClassRank] = useState(false);
  const [showAttendance, setShowAttendance] = useState(true);
  const [digitalLibrary, setDigitalLibrary] = useState(false);
  const [timetableView, setTimetableView] = useState(true);
  const [resultsView, setResultsView] = useState(true);

  return (
    <div className="space-y-4">
      <ModuleHeader title="Student Portal Configuration" subtitle="Control what students can see and do through their portal" theme={theme} />

      <SectionCard title="Portal Features" subtitle="Control what students can see and do when they log in to their portal" theme={theme}>
        <div className="space-y-2">
          {[
            { label: 'Online homework submission', desc: 'Students can upload and submit homework directly through the portal', value: homeworkSubmission, setter: setHomeworkSubmission },
            { label: 'Show class rank', desc: 'Students can see their rank within their class on the results page', value: showClassRank, setter: setShowClassRank },
            { label: 'Show attendance percentage', desc: 'Students can view their attendance percentage and day-wise history', value: showAttendance, setter: setShowAttendance },
            { label: 'Digital library access', desc: 'Students can browse and read eBooks from the digital library', value: digitalLibrary, setter: setDigitalLibrary },
            { label: 'Timetable view', desc: 'Students can view their daily and weekly class timetable', value: timetableView, setter: setTimetableView },
            { label: 'Results view (with PDF download)', desc: 'Students can view exam results and download report card as PDF', value: resultsView, setter: setResultsView },
          ].map(item => (
            <div key={item.label} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>{item.label}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{item.desc}</p>
              </div>
              <SSAToggle on={item.value} onChange={() => item.setter(!item.value)} theme={theme} />
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex items-start gap-3">
        <AlertTriangle size={16} className="text-amber-500 mt-0.5 shrink-0" />
        <p className="text-xs text-amber-700">Enabling &quot;Show class rank&quot; may be sensitive. Many schools disable this to reduce peer pressure. Consider your school policy before turning it on.</p>
      </div>

    </div>
  );
}

// ─── ALUMNI CONFIG MODULE ─────────────────────────
function AlumniConfigModule({ theme }: { theme: Theme }) {
  const [selfRegistration, setSelfRegistration] = useState(true);
  const [donationModule, setDonationModule] = useState(false);
  const [jobBoard, setJobBoard] = useState(false);
  const [eventInvitations, setEventInvitations] = useState(true);
  const [directoryAccess, setDirectoryAccess] = useState(true);

  return (
    <div className="space-y-4">
      <ModuleHeader title="Alumni Configuration" subtitle="Manage alumni engagement portal features" theme={theme} />

      <SectionCard title="Alumni Portal Features" subtitle="Features available to school alumni through the alumni engagement portal" theme={theme}>
        <div className="space-y-2">
          {[
            { label: 'Self-registration portal', desc: 'Alumni can sign up themselves through a public registration page — no admin action needed', value: selfRegistration, setter: setSelfRegistration },
            { label: 'Donation module', desc: 'Alumni can make monetary contributions to the school through a secure online form', value: donationModule, setter: setDonationModule },
            { label: 'Job board', desc: 'Alumni can post job openings and current students/alumni can view and apply', value: jobBoard, setter: setJobBoard },
            { label: 'Event invitations', desc: 'School can invite alumni to reunions, annual days, and special events via the portal', value: eventInvitations, setter: setEventInvitations },
            { label: 'Directory access', desc: 'Alumni can browse the alumni directory to reconnect with batchmates and seniors', value: directoryAccess, setter: setDirectoryAccess },
          ].map(item => (
            <div key={item.label} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>{item.label}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{item.desc}</p>
              </div>
              <SSAToggle on={item.value} onChange={() => item.setter(!item.value)} theme={theme} />
            </div>
          ))}
        </div>
      </SectionCard>

    </div>
  );
}

// ─── ANALYTICS & BI CONFIG MODULE ─────────────────
function AnalyticsBIConfigModule({ theme }: { theme: Theme }) {
  const [predictiveAI, setPredictiveAI] = useState(false);
  const [comparativeAnalysis, setComparativeAnalysis] = useState(true);
  const [autoMonthlyReports, setAutoMonthlyReports] = useState(true);
  const [dataRetention, setDataRetention] = useState('5 years');
  const [widgets, setWidgets] = useState<Record<string, boolean>>({
    'Attendance Trends': true, 'Fee Collection': true, 'Exam Performance': true, 'Staff Metrics': false,
  });

  return (
    <div className="space-y-4">
      <ModuleHeader title="Analytics & BI Configuration" subtitle="Business intelligence, predictive analytics, and dashboard widgets" theme={theme} />

      <SectionCard title="Core Analytics" subtitle="Enable or disable analytics features" theme={theme}>
        <div className="space-y-2">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <span className={`text-xs font-bold ${theme.highlight}`}>Predictive Analytics (AI)</span>
              <p className={`text-[10px] ${theme.iconColor}`}>Uses ML to predict dropout risk, fee defaults, attendance patterns</p>
            </div>
            <SSAToggle on={predictiveAI} onChange={() => setPredictiveAI(!predictiveAI)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Comparative analysis (cross-section / cross-year)</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Compare performance across sections (A vs B) or academic years (2025 vs 2026)</p>
            </div>
            <SSAToggle on={comparativeAnalysis} onChange={() => setComparativeAnalysis(!comparativeAnalysis)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Auto-generated monthly reports</p>
              <p className={`text-[10px] ${theme.iconColor}`}>System automatically generates and emails monthly analytics summary to admin & principal</p>
            </div>
            <SSAToggle on={autoMonthlyReports} onChange={() => setAutoMonthlyReports(!autoMonthlyReports)} theme={theme} />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Dashboard Widgets" subtitle="Choose which analytics widgets appear on the admin/principal dashboard" theme={theme}>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(widgets).map(([widget, enabled]) => (
            <div key={widget} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>{widget}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{
                  ({
                    'Attendance Trends': 'Visual chart showing daily/weekly/monthly attendance patterns across classes',
                    'Fee Collection': 'Real-time fee collection dashboard with pending vs collected breakdown',
                    'Exam Performance': 'Grade distribution, pass rates, and topper lists across all exams',
                    'Staff Metrics': 'Staff attendance, workload distribution, and leave utilization stats',
                  } as Record<string, string>)[widget]
                }</p>
              </div>
              <SSAToggle on={enabled} onChange={() => setWidgets(p => ({ ...p, [widget]: !p[widget] }))} theme={theme} />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Data Retention" subtitle="How long analytics data is stored" theme={theme}>
        <SelectField options={['1 year', '3 years', '5 years', '10 years', 'Unlimited']} value={dataRetention} onChange={setDataRetention} theme={theme} />
      </SectionCard>

    </div>
  );
}

// ─── REPORT ENGINE CONFIG MODULE ──────────────────
function ReportEngineConfigModule({ theme }: { theme: Theme }) {
  const [scheduledEmail, setScheduledEmail] = useState(true);
  const [exportFormats, setExportFormats] = useState<Record<string, boolean>>({
    'PDF': true, 'Excel': true, 'CSV': true, 'Google Sheets': false,
  });
  const [recipients, setRecipients] = useState<Record<string, boolean>>({
    'Admin': true, 'Principal': true, 'Trustee': false,
  });
  const [autoGenerate, setAutoGenerate] = useState<Record<string, boolean>>({
    'Daily summary': false, 'Weekly summary': true, 'Monthly summary': true,
  });

  return (
    <div className="space-y-4">
      <ModuleHeader title="Report Engine Configuration" subtitle="Scheduled reports, export formats, recipients, and auto-generation" theme={theme} />

      <SectionCard title="Email Reports" subtitle="Schedule automatic email delivery of reports" theme={theme}>
        <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
          <div className="flex-1 mr-3">
            <p className={`text-xs font-bold ${theme.highlight}`}>Scheduled email reports</p>
            <p className={`text-[10px] ${theme.iconColor}`}>System automatically emails report summaries to recipients on schedule</p>
          </div>
          <SSAToggle on={scheduledEmail} onChange={() => setScheduledEmail(!scheduledEmail)} theme={theme} />
        </div>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Export Formats" subtitle="Which file formats are available when downloading reports" theme={theme}>
          <div className="space-y-2">
            {Object.entries(exportFormats).map(([fmt, enabled]) => (
              <div key={fmt} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{fmt}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'PDF': 'Download reports as formatted PDF documents — best for printing and sharing',
                      'Excel': 'Download as Excel spreadsheets — best for further analysis and filtering',
                      'CSV': 'Download as CSV files — lightweight format for data import/export',
                      'Google Sheets': 'Export directly to Google Sheets — best for collaborative editing',
                    } as Record<string, string>)[fmt]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setExportFormats(p => ({ ...p, [fmt]: !p[fmt] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Report Recipients" subtitle="Who receives scheduled reports via email" theme={theme}>
          <div className="space-y-2">
            {Object.entries(recipients).map(([role, enabled]) => (
              <div key={role} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{role}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Admin': 'School admin receives operational reports (attendance, fees, inventory)',
                      'Principal': 'Principal receives academic and performance summary reports',
                      'Trustee': 'Trustee/management receives financial and compliance overview reports',
                    } as Record<string, string>)[role]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setRecipients(p => ({ ...p, [role]: !p[role] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Auto-Generate Reports" subtitle="System automatically creates reports on a schedule — no manual effort needed" theme={theme}>
        <div className="space-y-2">
          {Object.entries(autoGenerate).map(([period, enabled]) => (
            <div key={period} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>{period}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{
                  ({
                    'Daily summary': 'End-of-day report covering attendance, fee collection, and key events',
                    'Weekly summary': 'Weekly digest with attendance trends, pending fees, and upcoming deadlines',
                    'Monthly summary': 'Comprehensive monthly report with analytics across all modules',
                  } as Record<string, string>)[period]
                }</p>
              </div>
              <SSAToggle on={enabled} onChange={() => setAutoGenerate(p => ({ ...p, [period]: !p[period] }))} theme={theme} />
            </div>
          ))}
        </div>
      </SectionCard>

    </div>
  );
}

// ─── API & INTEGRATION CONFIG MODULE ──────────────
function APIIntegrationConfigModule({ theme }: { theme: Theme }) {
  const [thirdParty, setThirdParty] = useState(false);
  const [webhookNotifications, setWebhookNotifications] = useState(false);
  const [apiRateLimit, setApiRateLimit] = useState('1000');
  const [integrations, setIntegrations] = useState<Record<string, boolean>>({
    'Tally (Accounting)': false, 'WhatsApp Business': false, 'SMS Gateway': false,
    'Google Workspace': false, 'Microsoft 365': false,
  });

  return (
    <div className="space-y-4">
      <ModuleHeader title="API & Integration Configuration" subtitle="Third-party integrations, webhooks, and API rate limits" theme={theme} />

      <SectionCard title="Integration Master Switch" subtitle="Enable or disable all external integrations" theme={theme}>
        <div className="space-y-2">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <span className={`text-xs font-bold ${theme.highlight}`}>Third-party integrations</span>
              <p className={`text-[10px] ${theme.iconColor}`}>Master switch to allow external services to connect</p>
            </div>
            <SSAToggle on={thirdParty} onChange={() => setThirdParty(!thirdParty)} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <span className={`text-xs font-bold ${theme.highlight}`}>Webhook notifications</span>
              <p className={`text-[10px] ${theme.iconColor}`}>Send event data to external URLs on triggers</p>
            </div>
            <SSAToggle on={webhookNotifications} onChange={() => setWebhookNotifications(!webhookNotifications)} theme={theme} />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Available Integrations" subtitle="Connect your school ERP with external tools and services" theme={theme}>
        <div className="space-y-2">
          {Object.entries(integrations).map(([name, enabled]) => (
            <div key={name} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg} ${!thirdParty ? 'opacity-50' : ''}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>{name}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{
                  ({
                    'Tally (Accounting)': 'Sync fee collection and payroll data directly to Tally accounting software',
                    'WhatsApp Business': 'Send fee reminders, attendance alerts, and notices via WhatsApp Business API',
                    'SMS Gateway': 'Send SMS notifications to parents for attendance, fees, and emergencies',
                    'Google Workspace': 'Integrate with Google Classroom, Drive, and Calendar for academics',
                    'Microsoft 365': 'Connect with Microsoft Teams, OneDrive, and Outlook for collaboration',
                  } as Record<string, string>)[name]
                }</p>
              </div>
              <SSAToggle on={enabled} onChange={() => { if (thirdParty) setIntegrations(p => ({ ...p, [name]: !p[name] })); }} theme={theme} />
            </div>
          ))}
          {!thirdParty && <p className={`text-[10px] ${theme.iconColor} italic`}>Enable &quot;Third-party integrations&quot; above to toggle individual services</p>}
        </div>
      </SectionCard>

      <SectionCard title="API Rate Limit" subtitle="Maximum API requests per minute" theme={theme}>
        <div className="flex items-center gap-3">
          <InputField value={apiRateLimit} onChange={setApiRateLimit} theme={theme} type="number" placeholder="Requests per minute" />
          <span className={`text-xs ${theme.iconColor} whitespace-nowrap`}>req/min</span>
        </div>
      </SectionCard>

    </div>
  );
}

// ─── BRANDING & WHITE-LABEL CONFIG MODULE ─────────
function BrandingWhitelabelConfigModule({ theme }: { theme: Theme }) {
  const [customDomain, setCustomDomain] = useState(false);
  const [domainValue, setDomainValue] = useState('');
  const [whitelabelApp, setWhitelabelApp] = useState(false);
  const [customEmailTemplates, setCustomEmailTemplates] = useState(true);
  const [loginPageCustomization, setLoginPageCustomization] = useState(true);
  const [primaryColor, setPrimaryColor] = useState('#4F46E5');
  const [logoUploaded] = useState(false);

  return (
    <div className="space-y-4">
      <ModuleHeader title="Branding & White-label Configuration" subtitle="Custom domain, branding, logo, and white-label settings" theme={theme} />

      <SectionCard title="Custom Domain" subtitle="Use your own domain for the school portal" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Enable custom domain</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Use your own domain (e.g., portal.yourschool.edu.in) instead of the default Saaras URL</p>
            </div>
            <SSAToggle on={customDomain} onChange={() => setCustomDomain(!customDomain)} theme={theme} />
          </div>
          {customDomain && (
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Domain Name</p>
              <InputField value={domainValue} onChange={setDomainValue} theme={theme} placeholder="e.g. portal.yourschool.edu.in" />
              <p className={`text-[10px] ${theme.iconColor} mt-1`}>Point your CNAME record to saaras-portal.app</p>
            </div>
          )}
        </div>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="White-label &amp; Templates" subtitle="Customize appearance and communication templates" theme={theme}>
          <div className="space-y-2">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>White-label mobile app</p>
                <p className={`text-[10px] ${theme.iconColor}`}>School-branded mobile app with your logo, name, and colors — no Saaras branding visible</p>
              </div>
              <SSAToggle on={whitelabelApp} onChange={() => setWhitelabelApp(!whitelabelApp)} theme={theme} />
            </div>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>Custom email templates</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Customize the email templates sent for fee reminders, reports, and notifications</p>
              </div>
              <SSAToggle on={customEmailTemplates} onChange={() => setCustomEmailTemplates(!customEmailTemplates)} theme={theme} />
            </div>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>Login page customization</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Customize the school portal login page with your logo, background, and welcome message</p>
              </div>
              <SSAToggle on={loginPageCustomization} onChange={() => setLoginPageCustomization(!loginPageCustomization)} theme={theme} />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Visual Identity" subtitle="Logo and primary color" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>School Logo</p>
              <div className={`w-full border-2 border-dashed ${theme.border} rounded-xl p-4 text-center cursor-pointer ${theme.buttonHover} transition-all`}>
                <Upload size={20} className={`mx-auto mb-1 ${theme.iconColor}`} />
                <p className={`text-[10px] ${theme.iconColor}`}>{logoUploaded ? 'Logo uploaded - click to replace' : 'Click to upload logo (PNG/SVG, max 2MB)'}</p>
              </div>
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Primary Brand Color</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg border border-slate-300" style={{ backgroundColor: primaryColor }} />
                <InputField value={primaryColor} onChange={setPrimaryColor} theme={theme} placeholder="#4F46E5" />
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

    </div>
  );
}

// ─── SCHOOL IDENTITY CONFIG MODULE ────────────────
function SchoolIdentityConfigModule({ theme }: { theme: Theme }) {
  const [schoolName, setSchoolName] = useState('Delhi Public School, Ahmedabad');
  const [medium, setMedium] = useState('English');
  const [category, setCategory] = useState('Co-educational');
  const [academicPattern, setAcademicPattern] = useState('April-March');
  const [board, setBoard] = useState('CBSE');
  const [workingDays, setWorkingDays] = useState('Mon-Sat');
  const [shifts, setShifts] = useState([
    { name: 'Morning Shift', classes: 'Pre-Primary, Class 1-5' },
    { name: 'Regular Shift', classes: 'Class 6-12' },
  ]);
  const [extendedHours, setExtendedHours] = useState(false);
  const [daycareStart, setDaycareStart] = useState('06:30');
  const [daycareEnd, setDaycareEnd] = useState('19:00');
  const [extendedHoursFee, setExtendedHoursFee] = useState(false);
  const [notifTemplate, setNotifTemplate] = useState('Standard');
  const [permissionProfile, setPermissionProfile] = useState(true);
  const [sysAnnouncement, setSysAnnouncement] = useState('');
  const [apiRateLimit, setApiRateLimit] = useState('100');
  const [logoFile, setLogoFile] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <ModuleHeader title="School Identity Configuration" subtitle="Core school details captured during onboarding — editable by SSA" theme={theme} />

      <SectionCard title="Basic Information" subtitle="School name and classification" theme={theme}>
        <div className="space-y-3">
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>School Name</p>
            <InputField value={schoolName} onChange={setSchoolName} theme={theme} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Medium of Instruction</p>
              <SelectField options={['English', 'Hindi', 'Gujarati', 'Bilingual', 'Trilingual']} value={medium} onChange={setMedium} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>School Category</p>
              <SelectField options={['Co-educational', 'Boys Only', 'Girls Only']} value={category} onChange={setCategory} theme={theme} />
            </div>
          </div>
        </div>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Academic Configuration" subtitle="Year pattern and board affiliation" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Academic Year Pattern</p>
              <SelectField options={['April-March', 'June-May', 'January-December']} value={academicPattern} onChange={setAcademicPattern} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Board Affiliation</p>
              <SelectField options={['CBSE', 'ICSE', 'State Board', 'IB', 'Custom']} value={board} onChange={setBoard} theme={theme} />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Working Days" subtitle="Weekly schedule pattern" theme={theme}>
          <div className="space-y-3">
            <SelectField options={['Mon-Fri', 'Mon-Sat', 'Custom']} value={workingDays} onChange={setWorkingDays} theme={theme} />
            {workingDays === 'Custom' && (
              <div className="grid grid-cols-3 gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className={`flex items-center gap-2 p-2 rounded-lg ${theme.secondaryBg}`}>
                    <SSAToggle on={day !== 'Sat'} onChange={() => {}} theme={theme} />
                    <span className={`text-xs ${theme.highlight}`}>{day}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Shift Configuration" subtitle="Define shifts and assigned classes" theme={theme}>
        <div className="space-y-2">
          {shifts.map((shift, i) => (
            <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <input value={shift.name} onChange={e => { const n = [...shifts]; n[i] = { ...n[i], name: e.target.value }; setShifts(n); }}
                className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
              <input value={shift.classes} onChange={e => { const n = [...shifts]; n[i] = { ...n[i], classes: e.target.value }; setShifts(n); }}
                className={`flex-[2] px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
              <button onClick={() => setShifts(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={14} /></button>
            </div>
          ))}
          <button onClick={() => setShifts(p => [...p, { name: '', classes: '' }])}
            className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
            <Plus size={12} /> Add Shift
          </button>
        </div>
      </SectionCard>

      <SectionCard title="Daycare &amp; Extended Hours" subtitle="Before/after-school care and extended hours configuration" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Extended Hours Available</p>
              <p className={`text-[10px] ${theme.iconColor}`}>School offers before/after-school daycare or extended care</p>
            </div>
            <SSAToggle on={extendedHours} onChange={() => setExtendedHours(!extendedHours)} theme={theme} />
          </div>
          {extendedHours && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Daycare Start Time</p>
                  <InputField value={daycareStart} onChange={setDaycareStart} theme={theme} type="time" />
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Daycare End Time</p>
                  <InputField value={daycareEnd} onChange={setDaycareEnd} theme={theme} type="time" />
                </div>
              </div>
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>Extended Hours Fee</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Charge a separate fee for extended / daycare hours</p>
                </div>
                <SSAToggle on={extendedHoursFee} onChange={() => setExtendedHoursFee(!extendedHoursFee)} theme={theme} />
              </div>
            </>
          )}
        </div>
      </SectionCard>

      <SectionCard title="System Configuration" subtitle="Platform-level settings for notifications, permissions, and API" theme={theme}>
        <div className="space-y-3">
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Default Notification Templates</p>
            <SelectField options={['Standard', 'Formal', 'Minimal', 'Custom']} value={notifTemplate} onChange={setNotifTemplate} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Default Permission Profiles</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Apply standard role-based permission templates on new user creation</p>
            </div>
            <SSAToggle on={permissionProfile} onChange={() => setPermissionProfile(!permissionProfile)} theme={theme} />
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>System Announcements</p>
            <textarea value={sysAnnouncement} onChange={e => setSysAnnouncement(e.target.value)} placeholder="Type a system-wide announcement visible to all users..."
              className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none focus:ring-2 focus:ring-slate-300 min-h-[60px]`} />
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>API Rate Limit (requests/min)</p>
            <InputField value={apiRateLimit} onChange={setApiRateLimit} theme={theme} type="number" placeholder="e.g. 100" />
            <p className={`text-[10px] ${theme.iconColor} mt-1`}>Maximum API requests allowed per minute per user</p>
          </div>
        </div>
      </SectionCard>

    </div>
  );
}

// ─── ONBOARDING WIZARD MODULE ─────────────────────
function OnboardingWizardModule({ theme }: { theme: Theme }) {
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

// ─── SUBSCRIPTION MANAGEMENT MODULE ───────────────
function SubscriptionMgmtModule({ theme }: { theme: Theme }) {
  const [selectedPlan, setSelectedPlan] = useState('Professional');
  const [planChangeSuccess, setPlanChangeSuccess] = useState<string | null>(null);
  const plans = [
    { name: 'Starter', price: '\u20B95/student/mo', students: '500', storage: '10 GB', sms: '1,000', features: ['Fees', 'Attendance', 'Exams', 'Communication', 'Basic Reports'] },
    { name: 'Professional', price: '\u20B98/student/mo', students: '2,000', storage: '50 GB', sms: '5,000', features: ['All Starter +', 'HR & Payroll', 'Transport', 'Timetable', 'Visitor', 'Advanced Reports', 'Parent Portal'] },
    { name: 'Enterprise', price: '\u20B912/student/mo', students: 'Unlimited', storage: '200 GB', sms: '20,000', features: ['All Professional +', 'LMS', 'Library', 'Hostel', 'Canteen', 'Alumni', 'API Access', 'White-label', 'Priority Support'] },
  ];
  const billingHistory = [
    { date: '01 Feb 2026', invoice: 'INV-2026-0201', amount: '\u20B916,000', status: 'Paid' },
    { date: '01 Jan 2026', invoice: 'INV-2026-0101', amount: '\u20B916,000', status: 'Paid' },
    { date: '01 Dec 2025', invoice: 'INV-2025-1201', amount: '\u20B916,000', status: 'Paid' },
    { date: '01 Nov 2025', invoice: 'INV-2025-1101', amount: '\u20B916,000', status: 'Paid' },
    { date: '01 Oct 2025', invoice: 'INV-2025-1001', amount: '\u20B914,000', status: 'Pending' },
  ];

  return (
    <div className="space-y-4">
      <ModuleHeader title="Subscription Management" subtitle="View your plan, usage, and billing history" theme={theme} />

      <SectionCard title="Current Plan" subtitle="Your active subscription details" theme={theme}>
        <div className={`p-4 rounded-xl ${theme.secondaryBg} flex items-center justify-between`}>
          <div>
            <p className={`text-lg font-bold ${theme.highlight}`}>Professional Plan</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Valid until: 31 Mar 2026 | Auto-renew: ON</p>
          </div>
          <div className="text-right">
            <p className={`text-xs font-bold ${theme.highlight}`}>2,000 students allowed</p>
            <p className={`text-[10px] ${theme.iconColor}`}>12 modules included</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Plan Comparison" subtitle="Compare plans and upgrade/downgrade" theme={theme}>
        <div className="grid grid-cols-3 gap-3">
          {plans.map(p => (
            <div key={p.name} onClick={() => setSelectedPlan(p.name)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedPlan === p.name ? `${theme.primary} text-white border-transparent` : `${theme.secondaryBg} ${theme.border}`}`}>
              <p className={`text-sm font-bold ${selectedPlan === p.name ? '' : theme.highlight}`}>{p.name}</p>
              <p className={`text-lg font-bold mt-1 ${selectedPlan === p.name ? '' : theme.highlight}`}>{p.price}</p>
              <p className={`text-[10px] mt-1 ${selectedPlan === p.name ? 'text-white/80' : theme.iconColor}`}>Up to {p.students} students</p>
              <div className="mt-3 space-y-1">
                {p.features.map(f => (
                  <p key={f} className={`text-[10px] flex items-center gap-1 ${selectedPlan === p.name ? 'text-white/90' : theme.iconColor}`}>
                    <CheckCircle size={10} /> {f}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
        {planChangeSuccess ? (
          <div className="mt-3 flex items-center gap-2 p-2 rounded-xl bg-emerald-50 border border-emerald-200">
            <CheckCircle size={14} className="text-emerald-600" />
            <span className="text-xs font-bold text-emerald-700">Plan change to {planChangeSuccess} requested. You&apos;ll receive a confirmation email shortly.</span>
            <button onClick={() => setPlanChangeSuccess(null)} className="ml-auto text-emerald-400 hover:text-emerald-600 text-xs">Dismiss</button>
          </div>
        ) : (
          <button onClick={() => { if (selectedPlan !== 'Professional') setPlanChangeSuccess(selectedPlan); }}
            className={`mt-3 px-4 py-2 rounded-xl text-xs font-bold text-white ${selectedPlan === 'Professional' ? 'bg-gray-400 cursor-not-allowed' : `${theme.primary} hover:opacity-90`} transition-all`}>
            {selectedPlan === 'Professional' ? 'Current Plan' : `Switch to ${selectedPlan}`}
          </button>
        )}
      </SectionCard>

      <SectionCard title="Usage Stats" subtitle="Current consumption against plan limits" theme={theme}>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Students', used: '1,247', limit: '2,000', pct: 62 },
            { label: 'Storage', used: '18.5 GB', limit: '50 GB', pct: 37 },
            { label: 'SMS Credits', used: '3,120', limit: '5,000', pct: 62 },
          ].map(u => (
            <div key={u.label} className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-[10px] font-bold ${theme.iconColor}`}>{u.label}</p>
              <p className={`text-sm font-bold ${theme.highlight} mt-1`}>{u.used} <span className={`text-[10px] font-normal ${theme.iconColor}`}>/ {u.limit}</span></p>
              <div className={`w-full h-1.5 rounded-full bg-gray-200 mt-2`}>
                <div className={`h-full rounded-full ${u.pct > 80 ? 'bg-rose-500' : u.pct > 50 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${u.pct}%` }} />
              </div>
              <p className={`text-[9px] ${theme.iconColor} mt-1`}>{u.pct}% used</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Billing History" subtitle="Past invoices and payment status" theme={theme}>
        <div className={`rounded-xl border ${theme.border} overflow-hidden`}>
          <table className="w-full text-xs">
            <thead className={theme.secondaryBg}>
              <tr>
                {['Date', 'Invoice', 'Amount', 'Status', 'Action'].map(h => (
                  <th key={h} className={`text-left px-4 py-2.5 font-bold ${theme.iconColor} text-[10px] uppercase`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {billingHistory.map((b, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className={`px-4 py-2.5 ${theme.iconColor} text-[10px]`}>{b.date}</td>
                  <td className={`px-4 py-2.5 font-bold ${theme.highlight}`}>{b.invoice}</td>
                  <td className={`px-4 py-2.5 font-bold ${theme.highlight}`}>{b.amount}</td>
                  <td className="px-4 py-2.5">
                    <span className={`text-[9px] px-2 py-0.5 rounded-lg font-bold ${b.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{b.status}</span>
                  </td>
                  <td className="px-4 py-2.5">
                    <button onClick={() => {
                      const a = document.createElement('a');
                      a.href = `data:text/plain;charset=utf-8,${encodeURIComponent(`Invoice: ${b.invoice}\nDate: ${b.date}\nAmount: ${b.amount}\nStatus: ${b.status}\n\nThis is a blueprint demo invoice.`)}`;
                      a.download = `${b.invoice}.txt`;
                      a.click();
                    }} className={`text-[10px] font-bold ${theme.iconColor} hover:underline flex items-center gap-1`}>
                      <Download size={10} /> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}

// ─── ROLE & PERMISSION MODULE ─────────────────────

/* Module-specific permission definitions (not just VCED) */
const MODULE_PERMISSIONS: Record<string, string[]> = {
  'Fees': ['View', 'Create Receipt', 'Edit Structure', 'Delete', 'Export', 'Approve Concession', 'Manage Defaulters', 'View Reports'],
  'Students': ['View', 'Add Student', 'Edit Profile', 'Delete', 'Export', 'View Medical', 'Promote', 'Transfer'],
  'Attendance': ['View', 'Mark Attendance', 'Edit Attendance', 'Delete', 'Export', 'View Reports', 'Configure Rules'],
  'Exams': ['View', 'Create Exam', 'Enter Marks', 'Edit Marks', 'Delete', 'Publish Results', 'Generate Report Card', 'Export'],
  'Visitors': ['View', 'Register Entry', 'Approve Visit', 'Delete', 'Export', 'Manage Pickup', 'View CCTV'],
  'HR': ['View', 'Add Staff', 'Edit Staff', 'Delete', 'Approve Leave', 'Process Payroll', 'View Salary', 'Export', 'Generate Letters'],
  'Transport': ['View', 'Manage Routes', 'Manage Vehicles', 'View Live Map', 'Collect Fees', 'Manage Drivers', 'Export', 'View Reports'],
  'Reports': ['View', 'Generate', 'Export PDF', 'Export Excel', 'Schedule Reports', 'View Financial', 'View Academic'],
  'Communication': ['View', 'Send DM', 'Create Group', 'Broadcast', 'Delete Messages', 'Manage Templates', 'View All Chats'],
  'Timetable': ['View', 'Create Schedule', 'Edit Schedule', 'Swap Periods', 'Manage Substitution', 'Assign Rooms', 'Export'],
  'Library': ['View', 'Issue Book', 'Return Book', 'Add Catalogue', 'Delete', 'Manage Fines', 'Export'],
  'Inventory': ['View', 'Add Asset', 'Edit Asset', 'Delete', 'Raise PO', 'Approve PO', 'Export'],
};
const ALL_MODULE_NAMES = Object.keys(MODULE_PERMISSIONS);
const SCOPE_OPTIONS = ['Own Class', 'Own Department', 'Own Branch', 'Full School', 'Custom'];

function RolePermissionModule({ theme }: { theme: Theme }) {
  const systemRoles = [
    'Super Admin', 'Principal', 'Vice Principal', 'Teacher', 'Class Teacher',
    'School Admin', 'Account Head', 'HR Manager', 'Transport Head', 'Receptionist',
    'Security Guard', 'Librarian', 'Hostel Warden', 'Parent', 'Student',
  ];

  // ── Build initial module-specific permission matrix ──
  const buildInitial = () => {
    const m: Record<string, Record<string, Record<string, boolean>>> = {};
    systemRoles.forEach(role => {
      m[role] = {};
      ALL_MODULE_NAMES.forEach(mod => {
        m[role][mod] = {};
        MODULE_PERMISSIONS[mod].forEach(p => { m[role][mod][p] = role === 'Super Admin'; });
      });
    });
    // Principal/VP get all
    ['Principal', 'Vice Principal'].forEach(r => { ALL_MODULE_NAMES.forEach(mod => { MODULE_PERMISSIONS[mod].forEach(p => { m[r][mod][p] = true; }); }); });
    // Teacher/Class Teacher
    ['Teacher', 'Class Teacher'].forEach(r => {
      m[r]['Attendance'] = { ...m[r]['Attendance'], 'View': true, 'Mark Attendance': true, 'Edit Attendance': true, 'View Reports': true };
      m[r]['Exams'] = { ...m[r]['Exams'], 'View': true, 'Enter Marks': true, 'Edit Marks': true };
      m[r]['Communication'] = { ...m[r]['Communication'], 'View': true, 'Send DM': true, 'Create Group': true };
      m[r]['Timetable'] = { ...m[r]['Timetable'], 'View': true, 'Swap Periods': true };
      m[r]['Students'] = { ...m[r]['Students'], 'View': true, 'Edit Profile': true, 'View Medical': true };
    });
    m['Account Head']['Fees'] = { 'View': true, 'Create Receipt': true, 'Edit Structure': true, 'Delete': false, 'Export': true, 'Approve Concession': true, 'Manage Defaulters': true, 'View Reports': true };
    m['Account Head']['Reports'] = { ...m['Account Head']['Reports'], 'View': true, 'Generate': true, 'Export PDF': true, 'Export Excel': true, 'View Financial': true };
    m['HR Manager']['HR'] = { 'View': true, 'Add Staff': true, 'Edit Staff': true, 'Delete': false, 'Approve Leave': true, 'Process Payroll': true, 'View Salary': true, 'Export': true, 'Generate Letters': true };
    m['Transport Head']['Transport'] = { 'View': true, 'Manage Routes': true, 'Manage Vehicles': true, 'View Live Map': true, 'Collect Fees': true, 'Manage Drivers': true, 'Export': true, 'View Reports': true };
    m['Receptionist']['Visitors'] = { 'View': true, 'Register Entry': true, 'Approve Visit': true, 'Delete': false, 'Export': true, 'Manage Pickup': false, 'View CCTV': false };
    m['Security Guard']['Visitors'] = { 'View': true, 'Register Entry': true, 'Approve Visit': false, 'Delete': false, 'Export': false, 'Manage Pickup': true, 'View CCTV': true };
    m['Librarian']['Library'] = { 'View': true, 'Issue Book': true, 'Return Book': true, 'Add Catalogue': true, 'Delete': false, 'Manage Fines': true, 'Export': true };
    m['Librarian']['Students'] = { ...m['Librarian']['Students'], 'View': true };
    m['Parent']['Fees'] = { ...m['Parent']['Fees'], 'View': true, 'View Reports': true };
    m['Parent']['Attendance'] = { ...m['Parent']['Attendance'], 'View': true };
    m['Parent']['Exams'] = { ...m['Parent']['Exams'], 'View': true };
    m['Parent']['Communication'] = { ...m['Parent']['Communication'], 'View': true, 'Send DM': true };
    m['Student']['Attendance'] = { ...m['Student']['Attendance'], 'View': true };
    m['Student']['Exams'] = { ...m['Student']['Exams'], 'View': true };
    m['Student']['Timetable'] = { ...m['Student']['Timetable'], 'View': true };
    m['Student']['Communication'] = { ...m['Student']['Communication'], 'View': true, 'Send DM': true };
    return m;
  };

  const [matrix, setMatrix] = useState(buildInitial);
  const [customRoles, setCustomRoles] = useState<string[]>([]);
  const [customRolesMeta, setCustomRolesMeta] = useState<Record<string, { description: string; parent: string; inheritedPerms: Record<string, Record<string, boolean>> }>>({});
  const [disabledRoles, setDisabledRoles] = useState<string[]>([]);
  const [rpTab, setRpTab] = useState('Permission Matrix');
  const rpTabs = ['Permission Matrix', 'Roles & Hierarchy', 'Access Control', 'Audit & Temp'];

  // A1: Role editing state
  const [editingRole, setEditingRole] = useState<string | null>(null);
  const [editingRoleBackup, setEditingRoleBackup] = useState<Record<string, Record<string, boolean>> | null>(null);

  // A2: Accordion state for permission matrix
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({ 'Fees': true });

  // A3: Custom role creation modal
  const [showCreateRoleModal, setShowCreateRoleModal] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDesc, setNewRoleDesc] = useState('');
  const [newRoleParent, setNewRoleParent] = useState('');
  const [newRoleBase, setNewRoleBase] = useState<'blank' | 'parent' | 'existing'>('blank');
  const [newRoleCopyFrom, setNewRoleCopyFrom] = useState('Teacher');

  // A4: Clone role
  const [cloneSource, setCloneSource] = useState('Teacher');
  const [cloneName, setCloneName] = useState('');
  const [recentClones, setRecentClones] = useState<{ name: string; from: string }[]>([]);
  const [cloneBanner, setCloneBanner] = useState('');

  // A5: Multi-role per user
  const [mockUsers, setMockUsers] = useState([
    { name: 'Dr. Ramesh Gupta', roles: ['Principal'], dept: 'Administration', date: '01 Apr 2025', by: 'Super Admin' },
    { name: 'Mrs. Priya Sharma', roles: ['Teacher'], dept: 'Science', date: '15 Jun 2025', by: 'Principal' },
    { name: 'Mr. Rajesh Kumar', roles: ['Teacher'], dept: 'Mathematics', date: '15 Jun 2025', by: 'Principal' },
    { name: 'Ms. Anita Desai', roles: ['Class Teacher'], dept: 'English', date: '01 Jul 2025', by: 'Principal' },
    { name: 'Mr. Vikram Singh', roles: ['School Admin'], dept: 'Administration', date: '01 Apr 2025', by: 'Super Admin' },
    { name: 'Mr. Suresh Patel', roles: ['Account Head'], dept: 'Accounts', date: '01 Apr 2025', by: 'Super Admin' },
    { name: 'Mrs. Kavita Nair', roles: ['HR Manager'], dept: 'HR', date: '01 May 2025', by: 'Principal' },
    { name: 'Mr. Anil Joshi', roles: ['Transport Head'], dept: 'Transport', date: '01 Apr 2025', by: 'Super Admin' },
  ]);
  const [roleModalUser, setRoleModalUser] = useState<string | null>(null);
  const [roleModalSelections, setRoleModalSelections] = useState<Record<string, boolean>>({});
  const [effectivePermsUser, setEffectivePermsUser] = useState<string | null>(null);

  // A6: Module-wise data scope
  const [roleScopes, setRoleScopes] = useState<Record<string, Record<string, string>>>(() => {
    const s: Record<string, Record<string, string>> = {};
    systemRoles.forEach(r => {
      s[r] = {};
      ALL_MODULE_NAMES.forEach(m => {
        if (r === 'Super Admin' || r === 'Principal' || r === 'Vice Principal' || r === 'School Admin') s[r][m] = 'Full School';
        else if (r === 'Teacher' || r === 'Class Teacher') s[r][m] = m === 'Library' ? 'Full School' : 'Own Class';
        else if (r === 'Account Head') s[r][m] = (m === 'Fees' || m === 'Reports') ? 'Full School' : 'Own Department';
        else if (r === 'HR Manager') s[r][m] = m === 'HR' ? 'Full School' : 'Own Department';
        else if (r === 'Transport Head') s[r][m] = m === 'Transport' ? 'Full School' : 'Own Department';
        else if (r === 'Receptionist') s[r][m] = m === 'Visitors' ? 'Full School' : 'Own Department';
        else if (r === 'Parent' || r === 'Student') s[r][m] = 'Own Class';
        else s[r][m] = 'Own Department';
      });
    });
    return s;
  });
  const [editingScopeRole, setEditingScopeRole] = useState<string | null>(null);

  // A7: Override form state (replaces alert)
  const [showOverrideForm, setShowOverrideForm] = useState(false);
  const [overrideUser, setOverrideUser] = useState('');
  const [overrideType, setOverrideType] = useState<'+' | '-'>('+');
  const [overrideModule, setOverrideModule] = useState('Fees');
  const [overridePerms, setOverridePerms] = useState<Record<string, boolean>>({});
  const [overrides, setOverrides] = useState([
    { user: 'Mrs. Priya Sharma', role: 'Teacher', type: '+' as const, mod: 'Fees', perm: 'View Reports', by: 'Principal', date: '10 Jan 2026' },
    { user: 'Mrs. Priya Sharma', role: 'Teacher', type: '+' as const, mod: 'HR', perm: 'Approve Leave', by: 'Principal', date: '10 Jan 2026' },
    { user: 'Mr. Vikram Singh', role: 'School Admin', type: '-' as const, mod: 'HR', perm: 'Delete', by: 'Super Admin', date: '05 Dec 2025' },
    { user: 'Ms. Anita Desai', role: 'Class Teacher', type: '+' as const, mod: 'Transport', perm: 'View Reports', by: 'Principal', date: '15 Feb 2026' },
  ]);

  // Widget editing state
  const [editingWidgetRole, setEditingWidgetRole] = useState<string | null>(null);
  const [dashboardWidgets, setDashboardWidgets] = useState<Record<string, string[]>>({
    'Principal': ['KPI Cards', 'Attendance', 'Fee Overview', 'Approvals', 'SQAAF', 'News Board'],
    'Teacher': ['Timetable', 'Attendance', 'Homework', 'Gradebook', 'Leave', 'Notices'],
    'Parent': ['Child Attendance', 'Fee Due', 'Homework', 'Timetable', 'Bus Tracker', 'PTM'],
    'Student': ['Timetable', 'Homework', 'Results', 'Attendance', 'Notices', 'Fee Status'],
    'Account Head': ['Fee Collection', 'Defaulters', 'Receipt Summary', 'Cash Flow', 'Concessions'],
    'HR Manager': ['Staff Attendance', 'Leave Requests', 'Payroll', 'Recruitment', 'Performance'],
  });
  const allWidgetOptions = ['KPI Cards', 'Attendance', 'Fee Overview', 'Approvals', 'SQAAF', 'News Board', 'Timetable', 'Homework', 'Gradebook', 'Leave', 'Notices', 'Child Attendance', 'Fee Due', 'Bus Tracker', 'PTM', 'Results', 'Fee Status', 'Fee Collection', 'Defaulters', 'Receipt Summary', 'Cash Flow', 'Concessions', 'Staff Attendance', 'Leave Requests', 'Payroll', 'Recruitment', 'Performance'];

  // Misc existing state
  const [compareA, setCompareA] = useState('Teacher');
  const [compareB, setCompareB] = useState('Class Teacher');
  const [bulkRole, setBulkRole] = useState('Teacher');
  const [bulkSelected, setBulkSelected] = useState<Record<string, boolean>>({ 'Mrs. Priya Sharma': true, 'Mr. Rajesh Kumar': true, 'Ms. Anita Desai': false, 'Mr. Vikram Singh': true, 'Mrs. Kavita Nair': false, 'Mr. Suresh Patel': true, 'Ms. Deepa Iyer': false, 'Mr. Anil Joshi': true });
  const [bulkBanner, setBulkBanner] = useState('');
  const [overrideSearch, setOverrideSearch] = useState('');
  const [tempRoleUser, setTempRoleUser] = useState('');
  const [tempRoleRole, setTempRoleRole] = useState('');
  const [tempRoleStart, setTempRoleStart] = useState('');
  const [tempRoleEnd, setTempRoleEnd] = useState('');
  const [tempRoleReason, setTempRoleReason] = useState('');
  const [tempRoles, setTempRoles] = useState([
    { user: 'Mrs. Kavita Nair', base: 'Teacher', temp: 'Acting Vice Principal', start: '15 Feb', end: '15 Mar', reason: 'VP on medical leave', status: 'Active' as const },
    { user: 'Mr. Suresh Patel', base: 'Account Head', temp: 'Acting Admin', start: '10 Jan', end: '20 Jan', reason: 'Admin on vacation', status: 'Expired' as const },
    { user: 'Ms. Deepa Iyer', base: 'Teacher', temp: 'Exam Coordinator', start: '01 Feb', end: '28 Feb', reason: 'Board exams', status: 'Active' as const },
  ]);
  const [tempRoleBanner, setTempRoleBanner] = useState('');

  // Confirmation modal state (A1/A7)
  const [confirmModal, setConfirmModal] = useState<{ title: string; message: string; onConfirm: () => void } | null>(null);

  // ── Permission toggle ──
  const togglePerm = (role: string, mod: string, perm: string) => {
    setMatrix(prev => ({
      ...prev,
      [role]: { ...prev[role], [mod]: { ...prev[role][mod], [perm]: !prev[role]?.[mod]?.[perm] } },
    }));
  };

  // ── A3: Add custom role with full form ──
  const addCustomRole = () => {
    const role = newRoleName.trim();
    if (!role || systemRoles.includes(role) || customRoles.includes(role)) return;
    setCustomRoles(p => [...p, role]);
    // Build initial perms based on selection
    const init: Record<string, Record<string, boolean>> = {};
    let inheritedPerms: Record<string, Record<string, boolean>> = {};
    if (newRoleBase === 'parent' && newRoleParent && matrix[newRoleParent]) {
      ALL_MODULE_NAMES.forEach(mod => {
        init[mod] = { ...matrix[newRoleParent][mod] };
        inheritedPerms[mod] = { ...matrix[newRoleParent][mod] };
      });
    } else if (newRoleBase === 'existing' && matrix[newRoleCopyFrom]) {
      ALL_MODULE_NAMES.forEach(mod => { init[mod] = { ...matrix[newRoleCopyFrom][mod] }; });
    } else {
      ALL_MODULE_NAMES.forEach(mod => {
        init[mod] = {};
        MODULE_PERMISSIONS[mod].forEach(p => { init[mod][p] = false; });
      });
    }
    setMatrix(prev => ({ ...prev, [role]: init }));
    setCustomRolesMeta(prev => ({ ...prev, [role]: { description: newRoleDesc, parent: newRoleParent, inheritedPerms } }));
    // Setup scope for new role
    setRoleScopes(prev => {
      const s = { ...prev };
      s[role] = {};
      ALL_MODULE_NAMES.forEach(m => { s[role][m] = newRoleParent && prev[newRoleParent] ? prev[newRoleParent][m] : 'Own Department'; });
      return s;
    });
    // Reset form
    setNewRoleName(''); setNewRoleDesc(''); setNewRoleParent(''); setNewRoleBase('blank'); setShowCreateRoleModal(false);
    // Switch to permission matrix and highlight
    setRpTab('Permission Matrix');
    setEditingRole(role);
  };

  // ── A4: Clone role functionally ──
  const cloneRole = () => {
    const name = cloneName.trim();
    if (!name || systemRoles.includes(name) || customRoles.includes(name) || !matrix[cloneSource]) return;
    setCustomRoles(p => [...p, name]);
    const clonedPerms: Record<string, Record<string, boolean>> = {};
    ALL_MODULE_NAMES.forEach(mod => { clonedPerms[mod] = { ...matrix[cloneSource][mod] }; });
    setMatrix(prev => ({ ...prev, [name]: clonedPerms }));
    setRoleScopes(prev => {
      const s = { ...prev };
      s[name] = { ...(prev[cloneSource] || {}) };
      return s;
    });
    setRecentClones(p => [{ name, from: cloneSource }, ...p].slice(0, 5));
    setCloneBanner(`Role "${name}" created with permissions copied from "${cloneSource}". Review and adjust permissions below.`);
    setCloneName('');
    setTimeout(() => setCloneBanner(''), 5000);
    setRpTab('Permission Matrix');
    setEditingRole(name);
  };

  const allRoles = [...systemRoles, ...customRoles];

  return (
    <div className="space-y-4">
      <ModuleHeader title="Roles & Permissions" subtitle="Configure module-specific access permissions for each role" theme={theme} />

      <TabBar tabs={rpTabs} active={rpTab} onChange={setRpTab} theme={theme} />

      {/* ── Confirmation Modal (A1/A7) ── */}
      {confirmModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center" onClick={() => setConfirmModal(null)}>
          <div className={`${theme.cardBg} rounded-2xl p-5 w-96 shadow-2xl border ${theme.border}`} onClick={e => e.stopPropagation()}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-2`}>{confirmModal.title}</h3>
            <p className={`text-xs ${theme.iconColor} mb-4`}>{confirmModal.message}</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setConfirmModal(null)} className={`px-4 py-2 rounded-xl text-xs font-bold ${theme.secondaryBg} ${theme.highlight}`}>Cancel</button>
              <button onClick={() => { confirmModal.onConfirm(); setConfirmModal(null); }} className="px-4 py-2 rounded-xl text-xs font-bold bg-red-500 text-white hover:bg-red-600">Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Role Selector Modal (A5 — multi-role assignment) ── */}
      {roleModalUser && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center" onClick={() => setRoleModalUser(null)}>
          <div className={`${theme.cardBg} rounded-2xl p-5 w-[420px] shadow-2xl border ${theme.border} max-h-[80vh] overflow-y-auto`} onClick={e => e.stopPropagation()}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-1`}>Assign Roles — {roleModalUser}</h3>
            <p className={`text-[10px] ${theme.iconColor} mb-3`}>Select one or more roles for this user</p>
            <div className="space-y-1 mb-4">
              {allRoles.filter(r => !disabledRoles.includes(r)).map(role => (
                <label key={role} className={`flex items-center gap-2 p-2 rounded-xl ${theme.secondaryBg} cursor-pointer hover:opacity-80`}>
                  <input type="checkbox" checked={!!roleModalSelections[role]} onChange={() => setRoleModalSelections(p => ({ ...p, [role]: !p[role] }))} className="w-3.5 h-3.5 rounded accent-emerald-500" />
                  <span className={`text-xs font-medium ${theme.highlight}`}>{role}</span>
                  {systemRoles.includes(role) && <span className={`text-[8px] px-1.5 py-0.5 rounded ${theme.secondaryBg} ${theme.iconColor}`}>System</span>}
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setRoleModalUser(null)} className={`px-4 py-2 rounded-xl text-xs font-bold ${theme.secondaryBg} ${theme.highlight}`}>Cancel</button>
              <button onClick={() => {
                const selected = Object.entries(roleModalSelections).filter(([, v]) => v).map(([k]) => k);
                if (selected.length > 0) {
                  setMockUsers(prev => prev.map(u => u.name === roleModalUser ? { ...u, roles: selected } : u));
                }
                setRoleModalUser(null);
              }} className={`px-4 py-2 rounded-xl text-xs font-bold ${theme.primary} text-white`}>Save Roles</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Effective Permissions Modal (A5) ── */}
      {effectivePermsUser && (() => {
        const user = mockUsers.find(u => u.name === effectivePermsUser);
        if (!user) return null;
        const combined: Record<string, Record<string, boolean>> = {};
        ALL_MODULE_NAMES.forEach(mod => {
          combined[mod] = {};
          MODULE_PERMISSIONS[mod].forEach(p => {
            combined[mod][p] = user.roles.some(r => matrix[r]?.[mod]?.[p]);
          });
        });
        return (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center" onClick={() => setEffectivePermsUser(null)}>
            <div className={`${theme.cardBg} rounded-2xl p-5 w-[600px] shadow-2xl border ${theme.border} max-h-[85vh] overflow-y-auto`} onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className={`text-sm font-bold ${theme.highlight}`}>Effective Permissions — {effectivePermsUser}</h3>
                  <p className={`text-[10px] ${theme.iconColor}`}>Combined view from roles: {user.roles.join(', ')}</p>
                </div>
                <button onClick={() => setEffectivePermsUser(null)} className={`p-1 rounded-lg ${theme.buttonHover}`}><X size={14} className={theme.iconColor} /></button>
              </div>
              {ALL_MODULE_NAMES.map(mod => {
                const activePerms = MODULE_PERMISSIONS[mod].filter(p => combined[mod][p]);
                if (activePerms.length === 0) return null;
                return (
                  <div key={mod} className={`p-2.5 rounded-xl ${theme.secondaryBg} mb-1.5`}>
                    <p className={`text-[10px] font-bold ${theme.highlight} mb-1`}>{mod}</p>
                    <div className="flex flex-wrap gap-1">{activePerms.map(p => (
                      <span key={p} className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-emerald-100 text-emerald-700">{p}</span>
                    ))}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}

      {/* ── Create Custom Role Modal (A3) ── */}
      {showCreateRoleModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center" onClick={() => setShowCreateRoleModal(false)}>
          <div className={`${theme.cardBg} rounded-2xl p-5 w-[440px] shadow-2xl border ${theme.border}`} onClick={e => e.stopPropagation()}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Create Custom Role</h3>
            <div className="space-y-3">
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Role Name *</p>
                <InputField value={newRoleName} onChange={setNewRoleName} theme={theme} placeholder="e.g. Exam Coordinator" />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Description</p>
                <InputField value={newRoleDesc} onChange={setNewRoleDesc} theme={theme} placeholder="What is this role for?" />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Parent Role (inherits permissions)</p>
                <SelectField options={['(None)', ...allRoles]} value={newRoleParent || '(None)'} onChange={v => setNewRoleParent(v === '(None)' ? '' : v)} theme={theme} />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Base Permissions</p>
                <div className="space-y-1">
                  {[
                    { id: 'blank' as const, label: 'Start blank', desc: 'No permissions — add manually' },
                    { id: 'parent' as const, label: 'Copy from parent', desc: newRoleParent ? `Inherit all permissions from ${newRoleParent}` : 'Select a parent role first' },
                    { id: 'existing' as const, label: 'Copy from existing role', desc: 'Start with another role\'s permissions' },
                  ].map(opt => (
                    <label key={opt.id} className={`flex items-center gap-2 p-2 rounded-xl ${theme.secondaryBg} cursor-pointer ${opt.id === 'parent' && !newRoleParent ? 'opacity-50' : ''}`}>
                      <input type="radio" name="basePerms" checked={newRoleBase === opt.id} disabled={opt.id === 'parent' && !newRoleParent}
                        onChange={() => setNewRoleBase(opt.id)} className="accent-emerald-500" />
                      <div>
                        <p className={`text-xs font-bold ${theme.highlight}`}>{opt.label}</p>
                        <p className={`text-[10px] ${theme.iconColor}`}>{opt.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
                {newRoleBase === 'existing' && (
                  <div className="mt-2">
                    <SelectField options={allRoles} value={newRoleCopyFrom} onChange={setNewRoleCopyFrom} theme={theme} />
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowCreateRoleModal(false)} className={`px-4 py-2 rounded-xl text-xs font-bold ${theme.secondaryBg} ${theme.highlight}`}>Cancel</button>
              <button onClick={addCustomRole} disabled={!newRoleName.trim()} className={`px-4 py-2 rounded-xl text-xs font-bold ${theme.primary} text-white disabled:opacity-50`}>Create Role</button>
            </div>
          </div>
        </div>
      )}

      {/* ────── TAB 1: Permission Matrix (A1 + A2 accordion) ────── */}
      {rpTab === 'Permission Matrix' && <>
        {/* Editing banner */}
        {editingRole && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Edit size={14} className="text-blue-500" />
              <p className="text-xs text-blue-700"><strong>Editing:</strong> {editingRole} — modify permissions below, then save or cancel.</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => {
                if (editingRoleBackup) setMatrix(prev => ({ ...prev, [editingRole]: editingRoleBackup }));
                setEditingRole(null); setEditingRoleBackup(null);
              }} className="px-3 py-1.5 rounded-xl text-xs font-bold bg-gray-200 text-gray-700">Cancel</button>
              <button onClick={() => { setEditingRole(null); setEditingRoleBackup(null); }}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500 text-white">Save Changes</button>
            </div>
          </div>
        )}

        <SectionCard title="Permission Matrix" subtitle="Click a module to expand its specific permissions per role. Click 'Edit' on any role to modify." theme={theme}>
          {/* Module accordion headers */}
          <div className="space-y-1">
            {ALL_MODULE_NAMES.map(mod => {
              const isExpanded = !!expandedModules[mod];
              const perms = MODULE_PERMISSIONS[mod];
              return (
                <div key={mod} className={`rounded-xl border ${theme.border} overflow-hidden`}>
                  {/* Module header row */}
                  <button onClick={() => setExpandedModules(prev => ({ ...prev, [mod]: !prev[mod] }))}
                    className={`w-full flex items-center justify-between px-3 py-2 ${isExpanded ? theme.primary + ' text-white' : theme.secondaryBg} transition-all`}>
                    <div className="flex items-center gap-2">
                      {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                      <span className={`text-xs font-bold ${isExpanded ? '' : theme.highlight}`}>{mod}</span>
                      <span className={`text-[9px] ${isExpanded ? 'text-white/70' : theme.iconColor}`}>({perms.length} permissions)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {/* Quick summary: count of roles with any permission */}
                      <span className={`text-[9px] ${isExpanded ? 'text-white/70' : theme.iconColor}`}>
                        {allRoles.filter(r => !disabledRoles.includes(r) && perms.some(p => matrix[r]?.[mod]?.[p])).length} roles active
                      </span>
                    </div>
                  </button>

                  {/* Expanded permission grid */}
                  {isExpanded && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-[10px]">
                        <thead>
                          <tr className={theme.secondaryBg}>
                            <th className={`text-left px-2 py-2 font-bold ${theme.iconColor} sticky left-0 ${theme.secondaryBg} min-w-[140px]`}>Role</th>
                            {perms.map(p => (
                              <th key={p} className={`text-center px-1 py-2 font-bold ${theme.iconColor} whitespace-nowrap text-[8px]`}>{p}</th>
                            ))}
                            <th className={`text-center px-2 py-2 font-bold ${theme.iconColor} text-[8px]`}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allRoles.filter(r => !disabledRoles.includes(r)).map(role => {
                            const isEditing = editingRole === role;
                            const inherited = customRolesMeta[role]?.inheritedPerms?.[mod] || {};
                            return (
                              <tr key={role} className={`border-t ${theme.border} ${isEditing ? 'bg-blue-50/50 ring-1 ring-blue-200' : ''}`}>
                                <td className={`px-2 py-1.5 font-bold ${theme.highlight} sticky left-0 ${isEditing ? 'bg-blue-50' : theme.cardBg} whitespace-nowrap`}>
                                  {role}
                                  {customRolesMeta[role]?.parent && <span className={`ml-1 text-[8px] ${theme.iconColor}`}>({customRolesMeta[role].parent})</span>}
                                </td>
                                {perms.map(perm => {
                                  const isInherited = inherited[perm];
                                  const isOn = matrix[role]?.[mod]?.[perm];
                                  return (
                                    <td key={perm} className="px-0 py-1 text-center">
                                      <button onClick={() => togglePerm(role, mod, perm)}
                                        className={`w-5 h-5 rounded text-[8px] font-bold inline-flex items-center justify-center transition-all ${
                                          isOn ? (isInherited ? 'bg-emerald-300 text-white opacity-70' : 'bg-emerald-500 text-white') : `${theme.secondaryBg} ${theme.iconColor}`
                                        }`}
                                        title={isInherited ? 'Inherited from parent' : ''}>
                                        {isOn ? '\u2713' : ''}
                                      </button>
                                    </td>
                                  );
                                })}
                                <td className="px-1 py-1 text-center">
                                  <div className="flex items-center justify-center gap-1">
                                    {!isEditing ? (
                                      <button onClick={() => { setEditingRole(role); setEditingRoleBackup(matrix[role] ? JSON.parse(JSON.stringify(matrix[role])) : {}); }}
                                        className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${theme.iconColor} hover:underline`}>Edit</button>
                                    ) : (
                                      <span className="text-[8px] text-blue-500 font-bold">Editing</span>
                                    )}
                                    {customRoles.includes(role) ? (
                                      <button onClick={() => setConfirmModal({
                                        title: `Delete "${role}"?`,
                                        message: 'This custom role and all its permissions will be permanently removed. Users assigned to this role will need reassignment.',
                                        onConfirm: () => { setCustomRoles(p => p.filter(x => x !== role)); setMatrix(p => { const n = { ...p }; delete n[role]; return n; }); }
                                      })} className="text-red-400 hover:text-red-600"><Trash2 size={10} /></button>
                                    ) : (
                                      <button onClick={() => setConfirmModal({
                                        title: `Disable "${role}"?`,
                                        message: 'This system role will be hidden from role assignment dropdowns. It can be re-enabled later. Existing users with this role will keep it.',
                                        onConfirm: () => setDisabledRoles(p => [...p, role])
                                      })} className={`text-[8px] ${theme.iconColor} hover:text-amber-600`} title="Disable role">
                                        <Lock size={9} />
                                      </button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Disabled roles list */}
          {disabledRoles.length > 0 && (
            <div className="mt-3">
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Disabled Roles (hidden from assignment)</p>
              <div className="flex flex-wrap gap-1.5">
                {disabledRoles.map(r => (
                  <span key={r} className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-gray-100 text-gray-500 text-[10px] font-medium">
                    <Lock size={8} /> {r}
                    <button onClick={() => setDisabledRoles(p => p.filter(x => x !== r))} className="text-emerald-500 hover:text-emerald-700 ml-1" title="Re-enable">
                      <CheckCircle size={9} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </SectionCard>

        {/* Custom Roles section (A3) */}
        <SectionCard title="Custom Roles" subtitle="Create roles with specific permissions, hierarchy, and descriptions" theme={theme}>
          <div className="space-y-2">
            {customRoles.length > 0 && (
              <div className="space-y-1 mb-2">
                {customRoles.map(r => (
                  <div key={r} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                    <div>
                      <span className={`text-xs font-bold ${theme.highlight}`}>{r}</span>
                      {customRolesMeta[r]?.description && <p className={`text-[10px] ${theme.iconColor}`}>{customRolesMeta[r].description}</p>}
                      {customRolesMeta[r]?.parent && <p className={`text-[9px] ${theme.iconColor}`}>Inherits from: {customRolesMeta[r].parent}</p>}
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => { setEditingRole(r); setRpTab('Permission Matrix'); }}
                        className={`px-2 py-0.5 rounded-lg text-[9px] font-bold ${theme.iconColor} hover:underline`}>Edit Perms</button>
                      <button onClick={() => setConfirmModal({
                        title: `Delete "${r}"?`,
                        message: 'This custom role and all its permissions will be permanently removed.',
                        onConfirm: () => {
                          setCustomRoles(p => p.filter(x => x !== r));
                          setMatrix(p => { const n = { ...p }; delete n[r]; return n; });
                          const meta = { ...customRolesMeta }; delete meta[r]; setCustomRolesMeta(meta);
                        }
                      })} className="text-red-400 hover:text-red-600"><X size={10} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button onClick={() => setShowCreateRoleModal(true)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>
              <Plus size={14} /> Create Custom Role
            </button>
          </div>
        </SectionCard>
      </>}

      {/* ────── TAB 2: Roles & Hierarchy (A1, A3, A4, A5) ────── */}
      {rpTab === 'Roles & Hierarchy' && <>
        {/* Role Hierarchy */}
        <SectionCard title="Role Hierarchy" subtitle="Parent-child role relationships. Child roles inherit all parent permissions + their own additions." theme={theme}>
          <div className={`p-3 rounded-xl ${theme.secondaryBg} text-xs space-y-0.5`}>
            {[
              { role: 'Super Admin', depth: 0, parent: null },
              { role: 'Principal', depth: 1, parent: 'Super Admin' },
              { role: 'Vice Principal', depth: 2, parent: 'Principal' },
              { role: 'Teacher', depth: 3, parent: 'Vice Principal' },
              { role: 'Class Teacher', depth: 4, parent: 'Teacher (variant)' },
              { role: 'School Admin', depth: 1, parent: 'Super Admin' },
              { role: 'Receptionist', depth: 2, parent: 'School Admin' },
              { role: 'Account Head', depth: 2, parent: 'School Admin' },
              { role: 'HR Manager', depth: 1, parent: 'Super Admin' },
              { role: 'Transport Head', depth: 1, parent: 'Super Admin' },
              { role: 'Security Guard', depth: 1, parent: 'Super Admin' },
              { role: 'Librarian', depth: 1, parent: 'Super Admin' },
              { role: 'Hostel Warden', depth: 1, parent: 'Super Admin' },
              { role: 'Parent', depth: 0, parent: null },
              { role: 'Student', depth: 0, parent: null },
              ...customRoles.map(r => ({ role: r, depth: customRolesMeta[r]?.parent ? 2 : 1, parent: customRolesMeta[r]?.parent || 'Custom' })),
            ].map((item, i) => (
              <div key={i} className={`flex items-center ${disabledRoles.includes(item.role) ? 'opacity-40' : ''}`} style={{ paddingLeft: `${item.depth * 20}px` }}>
                {item.depth > 0 && <div className={`border-l-2 border-b-2 ${theme.border} w-3 h-3 mr-1.5 rounded-bl-sm shrink-0`} />}
                <span className={`font-bold ${theme.highlight}`}>{item.role}</span>
                {disabledRoles.includes(item.role) && <span className="ml-1.5 text-[8px] px-1.5 py-0.5 rounded bg-gray-200 text-gray-500 font-bold">DISABLED</span>}
                {item.parent && <span className={`ml-2 text-[10px] ${theme.iconColor}`}>Inherits from: <span className={`font-medium ${theme.highlight}`}>{item.parent}</span></span>}
              </div>
            ))}
          </div>
          <p className={`text-[10px] ${theme.iconColor} mt-2 italic`}>Parent/Student roles are standalone with limited, scoped access.</p>
        </SectionCard>

        {/* Clone Role (A4 — functional) */}
        <SectionCard title="Clone Role" subtitle="Duplicate an existing role — permissions are actually copied to the new role" theme={theme}>
          <div className="space-y-3">
            {cloneBanner && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 flex items-start gap-2">
                <CheckCircle size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                <p className="text-xs text-emerald-700">{cloneBanner}</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Source Role</p>
                <SelectField options={allRoles} value={cloneSource} onChange={setCloneSource} theme={theme} />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>New Role Name</p>
                <InputField value={cloneName} onChange={setCloneName} theme={theme} placeholder="e.g. Sports Coach" />
              </div>
            </div>
            <button onClick={cloneRole} disabled={!cloneName.trim()}
              className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold disabled:opacity-50`}>Clone Role</button>
            <p className={`text-[10px] ${theme.iconColor}`}>Cloned role starts with all permissions of the source role. Modify as needed in Permission Matrix.</p>
            {recentClones.length > 0 && (
              <div className={`p-2.5 rounded-xl ${theme.secondaryBg} space-y-1`}>
                <p className={`text-[10px] font-bold ${theme.iconColor}`}>Recently Cloned</p>
                {recentClones.map((c, i) => (
                  <div key={i} className={`flex items-center gap-1.5 text-[10px] ${theme.highlight}`}>
                    <CheckCircle size={10} className="text-emerald-500 shrink-0" /> {c.name} (cloned from {c.from})
                  </div>
                ))}
              </div>
            )}
          </div>
        </SectionCard>

        {/* Assign Roles to Users (A5 — multi-role) */}
        <SectionCard title="Assign Roles to Users" subtitle="Users can have multiple roles. Click Change/+Role to open the role selector." theme={theme}>
          <div className={`rounded-xl border ${theme.border} overflow-hidden`}>
            <table className="w-full text-[10px]">
              <thead className={theme.secondaryBg}>
                <tr>
                  {['User Name', 'Roles', 'Department', 'Assigned', 'By', 'Actions'].map(h => (
                    <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor} text-[9px] uppercase`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockUsers.map((u, i) => (
                  <tr key={i} className={`border-t ${theme.border}`}>
                    <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{u.name}</td>
                    <td className="px-3 py-2">
                      <div className="flex flex-wrap gap-1">
                        {u.roles.map(r => (
                          <span key={r} className={`flex items-center gap-0.5 px-2 py-0.5 rounded-lg ${theme.secondaryBg} font-bold ${theme.highlight} text-[9px]`}>
                            {r}
                            {u.roles.length > 1 && (
                              <button onClick={() => setMockUsers(prev => prev.map(mu => mu.name === u.name ? { ...mu, roles: mu.roles.filter(x => x !== r) } : mu))}
                                className="text-red-400 hover:text-red-600 ml-0.5"><X size={8} /></button>
                            )}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className={`px-3 py-2 ${theme.iconColor}`}>{u.dept}</td>
                    <td className={`px-3 py-2 ${theme.iconColor}`}>{u.date}</td>
                    <td className={`px-3 py-2 ${theme.iconColor}`}>{u.by}</td>
                    <td className="px-3 py-2">
                      <div className="flex gap-1">
                        <button onClick={() => {
                          setRoleModalUser(u.name);
                          const sel: Record<string, boolean> = {};
                          u.roles.forEach(r => { sel[r] = true; });
                          setRoleModalSelections(sel);
                        }} className={`px-2 py-0.5 rounded-lg text-[9px] font-bold ${theme.primary} text-white`}>Change</button>
                        <button onClick={() => {
                          setRoleModalUser(u.name);
                          const sel: Record<string, boolean> = {};
                          u.roles.forEach(r => { sel[r] = true; });
                          setRoleModalSelections(sel);
                        }} className={`px-2 py-0.5 rounded-lg text-[9px] font-bold ${theme.secondaryBg} ${theme.highlight}`}>+Role</button>
                        <button onClick={() => setEffectivePermsUser(u.name)}
                          className={`px-2 py-0.5 rounded-lg text-[9px] font-bold ${theme.secondaryBg} ${theme.iconColor}`} title="View combined permissions">
                          <Eye size={10} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Bulk Role Assignment */}
        <SectionCard title="Bulk Operations" subtitle="Assign a role to multiple users at once" theme={theme}>
          <div className="space-y-3">
            {bulkBanner && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 flex items-start gap-2">
                <CheckCircle size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                <p className="text-xs text-emerald-700">{bulkBanner}</p>
              </div>
            )}
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Step 1: Select Role to Assign</p>
              <SelectField options={allRoles.filter(r => !disabledRoles.includes(r))} value={bulkRole} onChange={setBulkRole} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Step 2: Select Users</p>
              <div className="flex gap-2 mb-2">
                <button onClick={() => setBulkSelected(prev => { const n = { ...prev }; mockUsers.filter(u => u.roles.some(r => ['Teacher', 'Class Teacher'].includes(r))).forEach(u => { n[u.name] = true; }); return n; })}
                  className={`px-2.5 py-1 rounded-lg text-[9px] font-bold ${theme.secondaryBg} ${theme.highlight}`}>Select All Teaching Staff</button>
                <button onClick={() => setBulkSelected(prev => { const n = { ...prev }; mockUsers.filter(u => !u.roles.some(r => ['Teacher', 'Class Teacher', 'Principal', 'Vice Principal'].includes(r))).forEach(u => { n[u.name] = true; }); return n; })}
                  className={`px-2.5 py-1 rounded-lg text-[9px] font-bold ${theme.secondaryBg} ${theme.highlight}`}>Select All Non-Teaching</button>
              </div>
              <div className={`rounded-xl border ${theme.border} overflow-hidden`}>
                {mockUsers.map((u, i) => (
                  <div key={i} className={`flex items-center gap-2 px-3 py-1.5 ${i > 0 ? `border-t ${theme.border}` : ''}`}>
                    <input type="checkbox" checked={!!bulkSelected[u.name]} onChange={() => setBulkSelected(prev => ({ ...prev, [u.name]: !prev[u.name] }))}
                      className="w-3.5 h-3.5 rounded accent-emerald-500" />
                    <span className={`text-[10px] font-bold ${theme.highlight} flex-1`}>{u.name}</span>
                    <span className={`text-[10px] ${theme.iconColor}`}>{u.dept}</span>
                    <div className="flex gap-0.5">{u.roles.map(r => <span key={r} className={`text-[9px] px-2 py-0.5 rounded-lg ${theme.secondaryBg} ${theme.iconColor}`}>{r}</span>)}</div>
                  </div>
                ))}
              </div>
              <p className={`text-[10px] ${theme.iconColor} mt-1`}>{Object.values(bulkSelected).filter(Boolean).length} of {mockUsers.length} selected</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-2 flex items-start gap-1.5">
              <AlertTriangle size={12} className="text-amber-500 mt-0.5 shrink-0" />
              <p className="text-[10px] text-amber-700">This will add the selected role to all chosen users (existing roles are kept).</p>
            </div>
            <button onClick={() => {
              const selectedUsers = Object.entries(bulkSelected).filter(([, v]) => v).map(([k]) => k);
              if (selectedUsers.length === 0) return;
              setMockUsers(prev => prev.map(u => selectedUsers.includes(u.name) && !u.roles.includes(bulkRole) ? { ...u, roles: [...u.roles, bulkRole] } : u));
              setBulkBanner(`Assigned "${bulkRole}" to ${selectedUsers.length} users successfully.`);
              setTimeout(() => setBulkBanner(''), 5000);
            }} className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>Apply Role to Selected</button>
          </div>
        </SectionCard>
      </>}

      {/* ────── TAB 3: Access Control (A6, A7, overrides, widgets) ────── */}
      {rpTab === 'Access Control' && <>
        {/* User-Level Permission Override (A7 — real form) */}
        <SectionCard title="User Permission Override" subtitle="Grant or restrict specific permissions for individual users beyond their base role" theme={theme}>
          <div className="space-y-3">
            <InputField value={overrideSearch} onChange={setOverrideSearch} theme={theme} placeholder="Find user to override..." />
            <div className={`rounded-xl border ${theme.border} overflow-hidden`}>
              <table className="w-full text-[10px]">
                <thead className={theme.secondaryBg}>
                  <tr>
                    {['User', 'Base Role', 'Type', 'Module', 'Permission', 'Granted By', 'Date', ''].map(h => (
                      <th key={h} className={`text-left px-2.5 py-2 font-bold ${theme.iconColor} text-[9px] uppercase`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {overrides.filter(o => !overrideSearch || o.user.toLowerCase().includes(overrideSearch.toLowerCase())).map((o, i) => (
                    <tr key={i} className={`border-t ${theme.border}`}>
                      <td className={`px-2.5 py-2 font-bold ${theme.highlight}`}>{o.user}</td>
                      <td className={`px-2.5 py-2 ${theme.iconColor}`}>{o.role}</td>
                      <td className="px-2.5 py-2"><span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${o.type === '+' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>{o.type === '+' ? 'Additive' : 'Restrictive'}</span></td>
                      <td className={`px-2.5 py-2 ${theme.iconColor}`}>{o.mod}</td>
                      <td className={`px-2.5 py-2 font-bold ${theme.highlight}`}>{o.perm}</td>
                      <td className={`px-2.5 py-2 ${theme.iconColor}`}>{o.by}</td>
                      <td className={`px-2.5 py-2 ${theme.iconColor}`}>{o.date}</td>
                      <td className="px-2.5 py-2"><button onClick={() => setOverrides(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={10} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Override — inline form (A7) */}
            {!showOverrideForm ? (
              <button onClick={() => { setShowOverrideForm(true); setOverridePerms({}); }}
                className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold flex items-center gap-1.5`}><Plus size={12} /> Add Override</button>
            ) : (
              <div className={`p-3 rounded-xl border-2 border-blue-200 ${theme.secondaryBg} space-y-3`}>
                <p className={`text-xs font-bold ${theme.highlight}`}>New Permission Override</p>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>User</p>
                    <SelectField options={mockUsers.map(u => u.name)} value={overrideUser} onChange={setOverrideUser} theme={theme} placeholder="Select user..." />
                  </div>
                  <div>
                    <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Type</p>
                    <div className="flex gap-1">
                      <button onClick={() => setOverrideType('+')} className={`flex-1 px-2 py-1.5 rounded-lg text-[10px] font-bold ${overrideType === '+' ? 'bg-emerald-500 text-white' : `${theme.secondaryBg} ${theme.highlight}`}`}>Additive (+)</button>
                      <button onClick={() => setOverrideType('-')} className={`flex-1 px-2 py-1.5 rounded-lg text-[10px] font-bold ${overrideType === '-' ? 'bg-red-500 text-white' : `${theme.secondaryBg} ${theme.highlight}`}`}>Restrictive (-)</button>
                    </div>
                  </div>
                  <div>
                    <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Module</p>
                    <SelectField options={ALL_MODULE_NAMES} value={overrideModule} onChange={v => { setOverrideModule(v); setOverridePerms({}); }} theme={theme} />
                  </div>
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Permissions</p>
                  <div className="flex flex-wrap gap-1">
                    {MODULE_PERMISSIONS[overrideModule]?.map(p => (
                      <label key={p} className={`flex items-center gap-1 px-2 py-1 rounded-lg ${theme.cardBg} border ${theme.border} cursor-pointer text-[9px]`}>
                        <input type="checkbox" checked={!!overridePerms[p]} onChange={() => setOverridePerms(prev => ({ ...prev, [p]: !prev[p] }))} className="w-3 h-3 accent-emerald-500" />
                        <span className={theme.highlight}>{p}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setShowOverrideForm(false)} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${theme.secondaryBg} ${theme.highlight}`}>Cancel</button>
                  <button onClick={() => {
                    const selectedPerms = Object.entries(overridePerms).filter(([, v]) => v).map(([k]) => k);
                    if (!overrideUser || selectedPerms.length === 0) return;
                    const userObj = mockUsers.find(u => u.name === overrideUser);
                    selectedPerms.forEach(perm => {
                      setOverrides(p => [...p, { user: overrideUser, role: userObj?.roles[0] || '', type: overrideType, mod: overrideModule, perm, by: 'Super Admin', date: '26 Feb 2026' }]);
                    });
                    setShowOverrideForm(false); setOverrideUser(''); setOverridePerms({});
                  }} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${theme.primary} text-white`}>Add Override</button>
                </div>
              </div>
            )}
          </div>
        </SectionCard>

        {/* Data Scope Configuration (A6 — module-wise per role) */}
        <SectionCard title="Data Scope Configuration" subtitle="Define what data each role can access per module. Click 'Edit' to set module-wise scope." theme={theme}>
          <div className={`rounded-xl border ${theme.border} overflow-hidden`}>
            <table className="w-full text-[10px]">
              <thead className={theme.secondaryBg}>
                <tr>
                  <th className={`text-left px-3 py-2 font-bold ${theme.iconColor} text-[9px] uppercase`}>Role</th>
                  <th className={`text-left px-3 py-2 font-bold ${theme.iconColor} text-[9px] uppercase`}>Scope Summary</th>
                  <th className={`text-center px-3 py-2 font-bold ${theme.iconColor} text-[9px] uppercase`}>Action</th>
                </tr>
              </thead>
              <tbody>
                {allRoles.filter(r => !disabledRoles.includes(r)).map((role, i) => {
                  const scopes = roleScopes[role] || {};
                  const uniqueScopes = [...new Set(Object.values(scopes))];
                  const summary = uniqueScopes.length === 1 ? uniqueScopes[0] : `Mixed (${uniqueScopes.length} scope types)`;
                  const isEditing = editingScopeRole === role;
                  return (
                    <React.Fragment key={role}>
                      <tr className={`border-t ${theme.border} ${isEditing ? 'bg-blue-50/50' : ''}`}>
                        <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{role}</td>
                        <td className="px-3 py-2">
                          <div className="flex flex-wrap gap-0.5">
                            {uniqueScopes.map(s => (
                              <span key={s} className={`px-2 py-0.5 rounded-lg ${theme.secondaryBg} text-[9px] font-bold ${theme.highlight}`}>{s}</span>
                            ))}
                          </div>
                        </td>
                        <td className="px-3 py-2 text-center">
                          <button onClick={() => setEditingScopeRole(isEditing ? null : role)} className={`text-[9px] font-bold ${isEditing ? 'text-blue-500' : theme.iconColor} hover:underline`}>
                            {isEditing ? 'Close' : 'Edit Scope'}
                          </button>
                        </td>
                      </tr>
                      {isEditing && (
                        <tr className="bg-blue-50/30">
                          <td colSpan={3} className="px-3 py-3">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between mb-2">
                                <p className={`text-[10px] font-bold ${theme.highlight}`}>Module-wise Scope for {role}</p>
                                <div className="flex gap-1">
                                  {SCOPE_OPTIONS.map(s => (
                                    <button key={s} onClick={() => {
                                      setRoleScopes(prev => {
                                        const updated = { ...prev, [role]: { ...prev[role] } };
                                        ALL_MODULE_NAMES.forEach(m => { updated[role][m] = s; });
                                        return updated;
                                      });
                                    }} className={`px-2 py-0.5 rounded text-[8px] font-bold ${theme.secondaryBg} ${theme.iconColor} hover:opacity-80`}>
                                      All → {s}
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <div className="grid grid-cols-2 lg:grid-cols-3 gap-1.5">
                                {ALL_MODULE_NAMES.map(mod => (
                                  <div key={mod} className={`flex items-center justify-between p-2 rounded-xl ${theme.secondaryBg}`}>
                                    <span className={`text-[10px] font-bold ${theme.highlight}`}>{mod}</span>
                                    <select value={scopes[mod] || 'Own Department'} onChange={e => {
                                      setRoleScopes(prev => ({ ...prev, [role]: { ...prev[role], [mod]: e.target.value } }));
                                    }} className={`text-[9px] px-1.5 py-0.5 rounded-lg border ${theme.border} ${theme.inputBg} ${theme.highlight}`}>
                                      {SCOPE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                  </div>
                                ))}
                              </div>
                              <div className={`p-2 rounded-xl bg-blue-50 border border-blue-100 mt-2`}>
                                <p className="text-[10px] text-blue-700">
                                  <strong>Scope preview:</strong> With these settings, a {role} would see:{' '}
                                  {ALL_MODULE_NAMES.filter(m => scopes[m] && scopes[m] !== 'Full School').slice(0, 3).map(m => `${m} for ${scopes[m]}`).join(', ')}
                                  {ALL_MODULE_NAMES.filter(m => scopes[m] === 'Full School').length > 0 && `, and full school data for ${ALL_MODULE_NAMES.filter(m => scopes[m] === 'Full School').join(', ')}`}
                                </p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Field-Level Permissions (unchanged) */}
        <SectionCard title="Field-Level Access" subtitle="Control visibility and masking of sensitive data fields per role" theme={theme}>
          <div className={`rounded-xl border ${theme.border} overflow-hidden`}>
            <table className="w-full text-[10px]">
              <thead className={theme.secondaryBg}>
                <tr>
                  {['Sensitive Field', 'Visible To', 'Hidden From', 'Masking'].map(h => (
                    <th key={h} className={`text-left px-2.5 py-2 font-bold ${theme.iconColor} text-[9px] uppercase`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { field: 'Salary / CTC', visible: ['Account Head', 'HR', 'Principal'], hidden: ['Teacher', 'Admin', 'Student'], mask: 'Full' },
                  { field: 'Parent Phone/Email', visible: ['Teacher', 'Admin', 'Principal'], hidden: ['Student'], mask: 'None' },
                  { field: 'Aadhaar Number', visible: ['Admin', 'HR'], hidden: ['Teacher', 'Student', 'Parent'], mask: 'Partial (****1234)' },
                  { field: 'Fee Defaulter Status', visible: ['Account Head', 'Admin', 'Principal'], hidden: ['Teacher', 'Parent'], mask: 'Full' },
                  { field: 'Medical Records', visible: ['Admin', 'Principal', 'Class Teacher'], hidden: ['Teacher', 'Student'], mask: 'Full' },
                  { field: 'Bank Details', visible: ['Account Head', 'HR'], hidden: ['Teacher', 'Admin', 'Student'], mask: 'Partial' },
                ].map((f, i) => (
                  <tr key={i} className={`border-t ${theme.border}`}>
                    <td className={`px-2.5 py-2 font-bold ${theme.highlight}`}>{f.field}</td>
                    <td className="px-2.5 py-2">
                      <div className="flex flex-wrap gap-0.5">{f.visible.map(r => <span key={r} className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-emerald-100 text-emerald-700">{r}</span>)}</div>
                    </td>
                    <td className="px-2.5 py-2">
                      <div className="flex flex-wrap gap-0.5">{f.hidden.map(r => <span key={r} className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-gray-200 text-gray-500">{r}</span>)}</div>
                    </td>
                    <td className={`px-2.5 py-2 text-[9px] font-bold ${theme.iconColor}`}>{f.mask}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Dashboard Layout Per Role (A7 — real widget editor) */}
        <SectionCard title="Default Dashboard Widgets" subtitle="Configure which widgets appear on each role's dashboard. Click Edit to toggle widgets." theme={theme}>
          <div className="space-y-2">
            {Object.entries(dashboardWidgets).map(([role, widgets]) => (
              <div key={role} className={`rounded-xl ${theme.secondaryBg}`}>
                <div className="flex items-center gap-3 p-2.5">
                  <span className={`text-[10px] font-bold ${theme.highlight} min-w-[90px]`}>{role}</span>
                  <div className="flex flex-wrap gap-1 flex-1">
                    {widgets.map(w => <span key={w} className={`px-2 py-0.5 rounded-lg text-[9px] font-medium ${theme.cardBg} ${theme.highlight} border ${theme.border}`}>{w}</span>)}
                  </div>
                  <button onClick={() => setEditingWidgetRole(editingWidgetRole === role ? null : role)} className={`text-[9px] font-bold ${editingWidgetRole === role ? 'text-blue-500' : theme.iconColor} hover:underline shrink-0`}>
                    {editingWidgetRole === role ? 'Done' : 'Edit'}
                  </button>
                </div>
                {editingWidgetRole === role && (
                  <div className="px-2.5 pb-2.5">
                    <div className="flex flex-wrap gap-1">
                      {allWidgetOptions.map(w => {
                        const isOn = widgets.includes(w);
                        return (
                          <button key={w} onClick={() => {
                            setDashboardWidgets(prev => ({
                              ...prev,
                              [role]: isOn ? prev[role].filter(x => x !== w) : [...prev[role], w]
                            }));
                          }} className={`px-2 py-0.5 rounded-lg text-[9px] font-medium border transition-all ${isOn ? 'bg-emerald-100 border-emerald-300 text-emerald-700' : `${theme.cardBg} ${theme.border} ${theme.iconColor}`}`}>
                            {isOn ? '\u2713 ' : ''}{w}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </SectionCard>
      </>}

      {/* ────── TAB 4: Audit & Temp (A7 — all functional) ────── */}
      {rpTab === 'Audit & Temp' && <>
        {/* Permission Audit Log */}
        <SectionCard title="Permission Change Log" subtitle="Track all role and permission changes with full audit trail" theme={theme}>
          <div className="flex gap-2 mb-3">
            <InputField value="" onChange={() => {}} theme={theme} placeholder="Filter by date range..." type="date" />
            <SelectField options={['All Actions', 'Grant', 'Revoke', 'Create Role', 'Assign Role', 'Clone Role']} value="All Actions" onChange={() => {}} theme={theme} />
          </div>
          <div className={`rounded-xl border ${theme.border} overflow-hidden`}>
            <table className="w-full text-[10px]">
              <thead className={theme.secondaryBg}>
                <tr>
                  {['Date/Time', 'Changed By', 'Action', 'Role Affected', 'Details', 'IP'].map(h => (
                    <th key={h} className={`text-left px-2.5 py-2 font-bold ${theme.iconColor} text-[9px] uppercase`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { date: '25 Feb 10:15', by: 'Admin', action: 'Grant', role: 'Teacher', detail: 'Granted "View Reports" in Fees to Teacher role', ip: '192.168.1.45' },
                  { date: '24 Feb 16:30', by: 'Principal', action: 'Revoke', role: 'Receptionist', detail: 'Revoked "Delete" in Students from Receptionist', ip: '192.168.1.12' },
                  { date: '23 Feb 11:00', by: 'Admin', action: 'Create', role: 'Lab Coordinator', detail: 'Created custom role "Lab Coordinator" (parent: Teacher)', ip: '192.168.1.45' },
                  { date: '22 Feb 09:45', by: 'Admin', action: 'Assign', role: 'Class Teacher', detail: 'Assigned "Class Teacher" to Mrs. Priya Sharma', ip: '192.168.1.45' },
                  { date: '20 Feb 08:00', by: 'System', action: 'Auto-Grant', role: 'Class Teacher', detail: 'Auto-granted batch permissions to new Class Teacher', ip: 'System' },
                  { date: '18 Feb 14:20', by: 'Admin', action: 'Clone', role: 'Sports Coach', detail: 'Cloned "Teacher" role to create "Sports Coach"', ip: '192.168.1.45' },
                ].map((log, i) => (
                  <tr key={i} className={`border-t ${theme.border}`}>
                    <td className={`px-2.5 py-2 ${theme.iconColor} whitespace-nowrap`}>{log.date}</td>
                    <td className={`px-2.5 py-2 font-bold ${theme.highlight}`}>{log.by}</td>
                    <td className="px-2.5 py-2">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                        log.action === 'Grant' || log.action === 'Auto-Grant' ? 'bg-emerald-100 text-emerald-700' :
                        log.action === 'Revoke' ? 'bg-red-100 text-red-700' :
                        log.action === 'Create' || log.action === 'Clone' ? 'bg-blue-100 text-blue-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>{log.action}</span>
                    </td>
                    <td className={`px-2.5 py-2 font-bold ${theme.highlight}`}>{log.role}</td>
                    <td className={`px-2.5 py-2 ${theme.iconColor}`}>{log.detail}</td>
                    <td className={`px-2.5 py-2 ${theme.iconColor} text-[9px]`}>{log.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Temporary Role Elevation (A7 — functional) */}
        <SectionCard title="Temporary Roles" subtitle="Grant time-bound role elevations that auto-revert on expiry" theme={theme}>
          <div className="space-y-3">
            {tempRoleBanner && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 flex items-start gap-2">
                <CheckCircle size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                <p className="text-xs text-emerald-700">{tempRoleBanner}</p>
              </div>
            )}
            <p className={`text-[10px] font-bold ${theme.iconColor}`}>Active & Recent Elevations</p>
            <div className={`rounded-xl border ${theme.border} overflow-hidden`}>
              <table className="w-full text-[10px]">
                <thead className={theme.secondaryBg}>
                  <tr>
                    {['User', 'Base Role', 'Temp Role', 'Start', 'End', 'Reason', 'Status', ''].map(h => (
                      <th key={h} className={`text-left px-2.5 py-2 font-bold ${theme.iconColor} text-[9px] uppercase`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tempRoles.map((t, i) => (
                    <tr key={i} className={`border-t ${theme.border}`}>
                      <td className={`px-2.5 py-2 font-bold ${theme.highlight}`}>{t.user}</td>
                      <td className={`px-2.5 py-2 ${theme.iconColor}`}>{t.base}</td>
                      <td className={`px-2.5 py-2 font-bold ${theme.highlight}`}>{t.temp}</td>
                      <td className={`px-2.5 py-2 ${theme.iconColor}`}>{t.start}</td>
                      <td className={`px-2.5 py-2 ${theme.iconColor}`}>{t.end}</td>
                      <td className={`px-2.5 py-2 ${theme.iconColor}`}>{t.reason}</td>
                      <td className="px-2.5 py-2">
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${t.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-500'}`}>{t.status}</span>
                      </td>
                      <td className="px-2.5 py-2">
                        {t.status === 'Active' && (
                          <button onClick={() => setTempRoles(p => p.map((tr, j) => j === i ? { ...tr, status: 'Expired' as const } : tr))}
                            className="text-[9px] font-bold text-red-400 hover:text-red-600">Revoke</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={`text-[10px] ${theme.iconColor} italic`}>Role automatically reverts on end date. Revoke early if needed.</p>
            <div className={`p-3 rounded-xl ${theme.secondaryBg} space-y-2`}>
              <p className={`text-[10px] font-bold ${theme.highlight}`}>Grant Temporary Role</p>
              <div className="grid grid-cols-2 gap-2">
                <SelectField options={mockUsers.map(u => u.name)} value={tempRoleUser} onChange={setTempRoleUser} theme={theme} placeholder="Select user..." />
                <SelectField options={['Acting Principal', 'Acting Vice Principal', 'Acting Admin', 'Exam Coordinator', 'Event Coordinator']} value={tempRoleRole} onChange={setTempRoleRole} theme={theme} placeholder="Select temp role..." />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <InputField value={tempRoleStart} onChange={setTempRoleStart} theme={theme} type="date" placeholder="Start" />
                <InputField value={tempRoleEnd} onChange={setTempRoleEnd} theme={theme} type="date" placeholder="End" />
                <InputField value={tempRoleReason} onChange={setTempRoleReason} theme={theme} placeholder="Reason..." />
              </div>
              <button onClick={() => {
                if (!tempRoleUser || !tempRoleRole) return;
                const userObj = mockUsers.find(u => u.name === tempRoleUser);
                setTempRoles(p => [...p, {
                  user: tempRoleUser, base: userObj?.roles[0] || '', temp: tempRoleRole,
                  start: tempRoleStart || '26 Feb', end: tempRoleEnd || '26 Mar',
                  reason: tempRoleReason || 'Temporary assignment', status: 'Active' as const
                }]);
                setTempRoleBanner(`Temporary role "${tempRoleRole}" granted to "${tempRoleUser}" successfully.`);
                setTempRoleUser(''); setTempRoleRole(''); setTempRoleStart(''); setTempRoleEnd(''); setTempRoleReason('');
                setTimeout(() => setTempRoleBanner(''), 5000);
              }} className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>Grant Temporary Role</button>
            </div>
          </div>
        </SectionCard>

        {/* Role Comparison (updated for module-specific perms) */}
        <SectionCard title="Compare Roles" subtitle="Side-by-side permission comparison highlighting differences" theme={theme}>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Role A</p>
                <SelectField options={allRoles} value={compareA} onChange={setCompareA} theme={theme} />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Role B</p>
                <SelectField options={allRoles} value={compareB} onChange={setCompareB} theme={theme} />
              </div>
            </div>
            <p className={`text-[10px] ${theme.iconColor} italic`}>Showing modules where permissions differ between {compareA} and {compareB}.</p>
            <div className="space-y-1">
              {ALL_MODULE_NAMES.map(mod => {
                const perms = MODULE_PERMISSIONS[mod];
                const diffs = perms.filter(p => !!matrix[compareA]?.[mod]?.[p] !== !!matrix[compareB]?.[mod]?.[p]);
                if (diffs.length === 0) return null;
                return (
                  <div key={mod} className={`rounded-xl border ${theme.border} p-2.5`}>
                    <p className={`text-[10px] font-bold ${theme.highlight} mb-1`}>{mod} ({diffs.length} differences)</p>
                    <div className="grid grid-cols-3 gap-1 text-[9px]">
                      <div className={`font-bold ${theme.iconColor}`}>Permission</div>
                      <div className={`font-bold ${theme.iconColor}`}>{compareA}</div>
                      <div className={`font-bold ${theme.iconColor}`}>{compareB}</div>
                      {diffs.map(p => (
                        <React.Fragment key={p}>
                          <div className={theme.highlight}>{p}</div>
                          <div><span className={`px-1.5 py-0.5 rounded font-bold ${matrix[compareA]?.[mod]?.[p] ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>{matrix[compareA]?.[mod]?.[p] ? 'Yes' : 'No'}</span></div>
                          <div><span className={`px-1.5 py-0.5 rounded font-bold ${matrix[compareB]?.[mod]?.[p] ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>{matrix[compareB]?.[mod]?.[p] ? 'Yes' : 'No'}</span></div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                );
              }).filter(Boolean)}
              {ALL_MODULE_NAMES.every(mod => {
                const perms = MODULE_PERMISSIONS[mod];
                return perms.every(p => !!matrix[compareA]?.[mod]?.[p] === !!matrix[compareB]?.[mod]?.[p]);
              }) && (
                <div className={`p-4 text-center ${theme.iconColor} text-xs`}>No differences found. These roles have identical permissions.</div>
              )}
            </div>
          </div>
        </SectionCard>
      </>}
    </div>
  );
}

// ─── BACKUP & EXPORT MODULE (B3 — real UI, no alerts) ──────────────────────
function BackupExportModule({ theme }: { theme: Theme }) {
  const [autoBackup, setAutoBackup] = useState(true);
  const [backupFreq, setBackupFreq] = useState('Daily');
  const [exportModules, setExportModules] = useState<Record<string, boolean>>({
    Students: true, Staff: true, Fees: true, Attendance: true, All: false,
  });
  const [exportFormat, setExportFormat] = useState('Excel');
  const [exportDateFrom, setExportDateFrom] = useState('2025-04-01');
  const [exportDateTo, setExportDateTo] = useState('2026-03-31');
  const [backupProgress, setBackupProgress] = useState<number | null>(null);
  const [backupSuccess, setBackupSuccess] = useState(false);
  const [exportProgress, setExportProgress] = useState<number | null>(null);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [restoreFile, setRestoreFile] = useState('');
  const [restoreConfirm, setRestoreConfirm] = useState(false);
  const [restoreProgress, setRestoreProgress] = useState<number | null>(null);
  const backupHistory = [
    { date: '25 Feb 2026 02:00', type: 'Auto', size: '2.3 GB', status: 'Complete' },
    { date: '24 Feb 2026 02:00', type: 'Auto', size: '2.3 GB', status: 'Complete' },
    { date: '23 Feb 2026 15:30', type: 'Manual', size: '2.2 GB', status: 'Complete' },
    { date: '23 Feb 2026 02:00', type: 'Auto', size: '2.2 GB', status: 'Complete' },
    { date: '22 Feb 2026 02:00', type: 'Auto', size: '2.1 GB', status: 'Failed' },
  ];

  const runManualBackup = () => {
    setBackupProgress(0); setBackupSuccess(false);
    const iv = setInterval(() => {
      setBackupProgress(p => {
        if (p !== null && p >= 100) { clearInterval(iv); setBackupSuccess(true); return 100; }
        return (p || 0) + 20;
      });
    }, 400);
  };

  const runExport = () => {
    setExportProgress(0); setExportSuccess(false);
    const iv = setInterval(() => {
      setExportProgress(p => {
        if (p !== null && p >= 100) { clearInterval(iv); setExportSuccess(true); return 100; }
        return (p || 0) + 25;
      });
    }, 300);
  };

  const runRestore = () => {
    setRestoreConfirm(false); setRestoreProgress(0);
    const iv = setInterval(() => {
      setRestoreProgress(p => {
        if (p !== null && p >= 100) { clearInterval(iv); return 100; }
        return (p || 0) + 10;
      });
    }, 500);
  };

  return (
    <div className="space-y-4">
      <ModuleHeader title="Backup & Export" subtitle="Data backup scheduling, manual backup, and data export tools" theme={theme} />

      <SectionCard title="Last Backup" subtitle="Most recent successful backup" theme={theme}>
        <div className={`p-4 rounded-xl ${theme.secondaryBg} flex items-center justify-between`}>
          <div>
            <p className={`text-sm font-bold ${theme.highlight}`}>25 Feb 2026, 02:00 AM</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Auto backup | Size: 2.3 GB | Status: Complete</p>
          </div>
          <span className="text-[9px] px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-700 font-bold">SUCCESS</span>
        </div>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Backup Schedule" subtitle="Configure automatic backup frequency" theme={theme}>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Auto Backup</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Automatically backup data on schedule</p>
              </div>
              <SSAToggle on={autoBackup} onChange={() => setAutoBackup(!autoBackup)} theme={theme} />
            </div>
            {autoBackup && (
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Frequency</p>
                <SelectField options={['Daily', 'Weekly', 'Monthly']} value={backupFreq} onChange={setBackupFreq} theme={theme} />
              </div>
            )}
            {/* Manual backup with progress */}
            {backupProgress !== null && (
              <div className="space-y-1">
                <div className="w-full h-2 rounded-full bg-slate-200">
                  <div className={`h-full rounded-full transition-all duration-300 ${backupSuccess ? 'bg-emerald-500' : theme.primary}`} style={{ width: `${backupProgress}%` }} />
                </div>
                <p className={`text-[10px] ${backupSuccess ? 'text-emerald-600 font-bold' : theme.iconColor}`}>
                  {backupSuccess ? 'Backup completed successfully! Size: 2.3 GB' : `Backing up... ${backupProgress}%`}
                </p>
              </div>
            )}
            <button onClick={runManualBackup} disabled={backupProgress !== null && !backupSuccess}
              className={`w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white ${theme.primary} hover:opacity-90 transition-all disabled:opacity-50`}>
              <Download size={14} /> {backupSuccess ? 'Run Another Backup' : 'Run Manual Backup Now'}
            </button>
          </div>
        </SectionCard>

        <SectionCard title="Export Data" subtitle="Export school data in various formats" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Select Data</p>
              <div className="grid grid-cols-3 gap-1.5">
                {Object.entries(exportModules).map(([mod, enabled]) => (
                  <div key={mod} className={`flex items-center gap-1.5 p-1.5 rounded-lg ${theme.secondaryBg}`}>
                    <SSAToggle on={enabled} onChange={() => setExportModules(p => ({ ...p, [mod]: !p[mod] }))} theme={theme} />
                    <span className={`text-[10px] font-medium ${theme.highlight}`}>{mod}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Format</p>
              <div className="flex gap-1">
                {['CSV', 'Excel', 'JSON'].map(f => (
                  <button key={f} onClick={() => setExportFormat(f)}
                    className={`flex-1 px-2 py-1.5 rounded-lg text-[10px] font-bold transition-all ${exportFormat === f ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.highlight}`}`}>{f}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>From</p>
                <InputField value={exportDateFrom} onChange={setExportDateFrom} theme={theme} type="date" />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>To</p>
                <InputField value={exportDateTo} onChange={setExportDateTo} theme={theme} type="date" />
              </div>
            </div>
            {exportProgress !== null && (
              <div className="space-y-1">
                <div className="w-full h-2 rounded-full bg-slate-200">
                  <div className={`h-full rounded-full transition-all duration-300 ${exportSuccess ? 'bg-emerald-500' : theme.primary}`} style={{ width: `${exportProgress}%` }} />
                </div>
                <p className={`text-[10px] ${exportSuccess ? 'text-emerald-600 font-bold' : theme.iconColor}`}>
                  {exportSuccess ? `${exportFormat} export ready for download!` : `Exporting ${exportFormat}... ${exportProgress}%`}
                </p>
              </div>
            )}
            <button onClick={runExport} disabled={exportProgress !== null && !exportSuccess}
              className={`w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white ${theme.primary} hover:opacity-90 transition-all disabled:opacity-50`}>
              <Download size={14} /> {exportSuccess ? 'Download Export' : 'Export Data'}
            </button>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Restore from Backup" subtitle="Upload a backup file to restore data" theme={theme}>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2 mb-3">
          <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-700"><strong>Warning:</strong> Restoring from backup will overwrite current data. This action cannot be undone. Ensure you have a recent backup before proceeding.</p>
        </div>
        <div className={`p-3 rounded-xl ${theme.secondaryBg} space-y-3`}>
          <div className="flex items-center gap-3">
            <label className="flex-1 cursor-pointer">
              <input type="file" accept=".sql,.gz,.zip" className="hidden" onChange={(e) => setRestoreFile(e.target.files?.[0]?.name || '')} />
              <div className={`flex items-center gap-2 p-2.5 rounded-xl border-2 border-dashed ${theme.border} ${theme.buttonHover} transition-all`}>
                <Upload size={16} className={theme.iconColor} />
                <div className="flex-1">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{restoreFile || 'Click to select backup file'}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Accepted formats: .sql, .gz, .zip</p>
                </div>
              </div>
            </label>
          </div>
          {restoreProgress !== null && (
            <div className="space-y-1">
              <div className="w-full h-2 rounded-full bg-slate-200">
                <div className={`h-full rounded-full transition-all duration-500 ${restoreProgress >= 100 ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ width: `${restoreProgress}%` }} />
              </div>
              <p className={`text-[10px] ${restoreProgress >= 100 ? 'text-emerald-600 font-bold' : 'text-rose-600'}`}>
                {restoreProgress >= 100 ? 'Restore completed successfully!' : `Restoring data... ${restoreProgress}%`}
              </p>
            </div>
          )}
          {!restoreConfirm ? (
            <button onClick={() => { if (restoreFile) setRestoreConfirm(true); }} disabled={!restoreFile}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 transition-all disabled:opacity-50">
              Restore
            </button>
          ) : (
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 space-y-2">
              <p className="text-xs text-rose-700 font-bold">Are you sure? This will overwrite all current data with the backup.</p>
              <div className="flex gap-2">
                <button onClick={() => setRestoreConfirm(false)} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${theme.secondaryBg} ${theme.highlight}`}>Cancel</button>
                <button onClick={runRestore} className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700">Yes, Restore Now</button>
              </div>
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Backup History" subtitle="Recent backup records" theme={theme}>
        <div className={`rounded-xl border ${theme.border} overflow-hidden`}>
          <table className="w-full text-xs">
            <thead className={theme.secondaryBg}>
              <tr>
                {['Date', 'Type', 'Size', 'Status', 'Action'].map(h => (
                  <th key={h} className={`text-left px-4 py-2.5 font-bold ${theme.iconColor} text-[10px] uppercase`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {backupHistory.map((b, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className={`px-4 py-2.5 ${theme.iconColor} text-[10px]`}>{b.date}</td>
                  <td className={`px-4 py-2.5`}>
                    <span className={`text-[9px] px-2 py-0.5 rounded-lg font-bold ${b.type === 'Auto' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>{b.type}</span>
                  </td>
                  <td className={`px-4 py-2.5 font-bold ${theme.highlight}`}>{b.size}</td>
                  <td className="px-4 py-2.5">
                    <span className={`text-[9px] px-2 py-0.5 rounded-lg font-bold ${b.status === 'Complete' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>{b.status}</span>
                  </td>
                  <td className="px-4 py-2.5">
                    {b.status === 'Complete' && (
                      <button onClick={() => {
                        const link = document.createElement('a');
                        link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(`Backup from ${b.date} (Blueprint demo)`)}`;
                        link.download = `backup-${b.date.replace(/[: ]/g, '-')}.sql`;
                        link.click();
                      }} className={`text-[10px] font-bold ${theme.iconColor} hover:underline flex items-center gap-1`}>
                        <Download size={10} /> Download
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}

// ─── EXPORT ──────────────────────────────────────────
export default function Page() {
  return (
    <BlueprintLayout>
      <SchoolSuperAdminDashboard />
    </BlueprintLayout>
  );
}
