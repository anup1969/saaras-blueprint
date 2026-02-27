# Stakeholder Report — Saaras School ERP Blueprint

---

## 1. Stakeholder Information

| Field | Detail |
|-------|--------|
| **Name** | Dhaval |
| **Role** | Client / Project Stakeholder (CTO) |
| **Report Date** | 26 February 2026 |
| **Project** | Saaras School ERP — SaaS Platform |
| **Blueprint URL** | https://saaras-blueprint.vercel.app |
| **Total Dashboards** | 18 (14 core + 4 specialized) |
| **Total SSA Config Modules** | 30+ |

---

## 2. Module Inventory by Category

### CATEGORY A: FINANCE

---

#### A1. Fee Configuration (SSA)
**Description:** Sets up the entire school fee structure — what fees to charge, how much per grade, payment methods, late fees, concessions/scholarships, and defaulter blocking rules.

**User Actions:** Add / Edit / Delete / Toggle / View

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| Fee Template | Structure type (Simple Annual / Component-Based / Term-Wise) | Select | Yes |
| Fee Heads | 12 fee categories (Tuition, Admission, Transport, Lab, etc.) | Toggle list | Yes |
| Fee Frequency per Head | Monthly / Quarterly / Term-wise / Yearly / One-time | Dropdown | Yes |
| Grade-wise Amounts | Fee amount per fee head per grade (Nursery to Grade 12) | Number grid (15×7) | Yes |
| Term Selection | Term 1 / Term 2 / Term 3 (for term-wise template) | Tabs | No |
| Payment Modes | UPI, Cash, Cheque, Net Banking, Credit/Debit Card, DD/NEFT | Toggle list | Yes |
| Payment Mode Details | Processing fee %, auto-receipt, reconciliation method, default flag | Table (editable) | Yes |
| Late Fee Enabled | Whether late fee penalty applies | Toggle | No |
| Late Fee Amount | Penalty amount in INR | Number | No |
| Late Fee Grace Period | Days before penalty kicks in | Number | No |
| Late Fee Method | Per-day / Flat / Percentage | Select | No |
| Late Fee Max Cap | Maximum penalty amount | Number | No |
| Billing Cycle | Monthly / Quarterly / Yearly | Dropdown | Yes |
| Due Date | Day of month fees are due | Number | Yes |
| Concessions | 7 types: Sibling, Merit, Staff Child, EWS, Sports, SC/ST, Single Parent | Table (editable) | No |
| Concession Method | Percentage or Fixed amount per concession type | Dropdown | No |
| Concession Approval Mode | None / Admin Only / Principal + Admin | Dropdown | No |
| Max Concession Without Approval | Auto-approve threshold in INR | Number | No |
| Block Rules | Block report card / TC / exam hall ticket for defaulters | Toggle list | No |
| Fee Reminders | 7 automated reminders (7d/3d/1d before, 1d/7d/15d/30d after due) | Read-only | — |

**Relationships:**
- Linked to **Transport Config** (transport fee head)
- Linked to **Exam Config** (block exam hall ticket rule)
- Linked to **Communication Config** (SMS/Push reminder channels)
- Linked to **Student Profiles** (concession eligibility)
- Fee amounts visible on **Student Dashboard**, **Parent Dashboard**, **Accounts Head Dashboard**

---

#### A2. Online Payment Configuration (SSA)
**Description:** Configures which payment gateway the school uses and related payment rules.

**User Actions:** Edit / Toggle

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| Payment Gateway | Razorpay / PayU / CCAvenue / Cashfree | Dropdown | Yes |
| Refund Policy | Manual or Automatic | Dropdown | Yes |
| Convenience Fee | Extra charge amount in INR | Number | No |
| Auto-receipt Generation | Auto-generate receipt after payment | Toggle | No |
| Partial Payment Allowed | Allow paying less than full amount | Toggle | No |

**Relationships:**
- Feeds into **Fee Configuration** payment processing
- Receipt data visible on **Accounts Head Dashboard**

---

#### A3. Accounts Head Dashboard
**Description:** Financial management hub — fee collection tracking, concession management, expense tracking, salary processing, bank reconciliation, receipt management, and financial reports.

**User Actions:** Add / Edit / View / Export / Approve / Generate

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| Collected This Month | Total fee collection for current month | Display | — |
| Pending Fees | Outstanding fee amount | Display | — |
| Expenses This Month | Total expenses | Display | — |
| Bank Balance | Current bank balance | Display | — |
| Collection by Mode | Breakdown: Online/UPI, Cash, Cheque/NEFT | Display | — |
| Fee Collection Table | Receipt, Student, Amount, Mode, Date, Status | Table | — |
| Concession Types | Sibling, EWS, Merit, Staff Child, Single Parent | Table | — |
| Expense Records | Type, Amount, Vendor, Date, Status | Table | — |
| Salary Processing | Department, Staff Count, Basic, Gross, Deductions, Net | Table | — |
| Bank Reconciliation | Transaction log with credits/debits | Table | — |
| Report Types | Fee Summary, Outstanding, Expense, Salary, Concession, P&L, GST, Bank Statement | Buttons | — |
| Receipts | Receipt No, Student, Amount, Mode, Date | Table (searchable) | — |

**Relationships:**
- Reads from **Fee Config** (fee structure, concessions, payment modes)
- Reads from **HR Config** (salary structure for payroll)
- Visible to **Trustee Dashboard** (financial KPIs)
- Links to **Student/Parent Dashboards** (fee status)

---

#### A4. Subscription Management (SSA)
**Description:** View and manage the school's SaaS subscription plan, usage stats, and billing history.

**User Actions:** View / Switch Plan / Download Invoice

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| Current Plan | Starter / Professional / Enterprise | Display | — |
| Plan Validity | Valid until date, auto-renew status | Display | — |
| Selected Plan | Plan to switch to | Card selector | No |
| Usage - Students | Used vs limit | Progress bar | — |
| Usage - Storage | GB used vs limit | Progress bar | — |
| Usage - SMS Credits | Used vs limit | Progress bar | — |
| Billing History | Date, Invoice No, Amount, Status (Paid/Pending) | Table | — |

**Relationships:**
- Controls which modules are available school-wide
- Linked to **Super Admin** plan management

---

### CATEGORY B: ACADEMICS

---

#### B1. Academic Configuration (SSA)
**Description:** Core academic structure — subjects per grade, sections, houses, holidays, terms, academic year, preschool groups, and student demographics options.

**User Actions:** Add / Edit / Delete / Toggle

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| Academic Year | Start and end dates | Date range | Yes |
| Preschool Enabled | Toggle preschool wing | Toggle | No |
| Subjects per Grade | Subject list per grade (Nursery to Grade 12) | Tag list (per grade) | Yes |
| Subject Pool | Cross-grade subject suggestions | Quick-add buttons | — |
| Global Section Names | School-wide section labels (A, B, C, D, E) | Editable list | Yes |
| Sections per Grade | Which sections are active per grade | Toggle buttons | Yes |
| Houses | Name, Color, Mascot, Captain per house | Table (editable) | No |
| Preschool Groups | Age Level, Group Name, Max Children | Table (editable) | No |
| Holidays | Start Date, End Date, Name, Type | Table (editable) | Yes |
| Recurring Holidays | Every Sunday, 2nd/4th Saturday, All Saturdays | Toggle list | Yes |
| Terms | Term Name, Start Date, End Date | Table (editable) | Yes |
| Academic History | Year, Status, Student Count (read-only) | Display | — |
| Religions | Hindu, Muslim, Christian, Sikh, etc. | Toggle list | No |
| Categories | General, OBC, SC, ST, EWS | Toggle list | No |
| Languages | Hindi, English, Gujarati, Tamil, etc. | Toggle list | No |

**Relationships:**
- **Subjects** feed into Timetable and Exam modules
- **Sections** feed into Student assignment and Attendance
- **Houses** link to Student profiles and inter-house events
- **Holidays** affect Attendance calculation and Leave Policy
- **Terms** link to Fee Config (term-wise fees) and Exam scheduling

---

#### B2. Exam Configuration (SSA)
**Description:** Sets up the grading system, grade boundaries, exam schedule, exam types with weightage, report card template, and rank display options. Includes overlap detection and weightage validation.

**User Actions:** Add / Edit / Delete / Toggle / Preview

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| Grading System | Marks / Grades / Both / CBSE CCE | Select buttons | Yes |
| Grade Boundaries | Grade, Min Marks, Max Marks, Grade Points (8 rows) | Table (editable) | Yes |
| Report Card Template | CBSE Standard / ICSE / State Board / Custom | Select buttons | Yes |
| Exam Schedule | Exam Name, Start Date, End Date, Classes, Status | Table (editable) | Yes |
| Rank Display Options | Class rank, Section rank, Percentile, Subject-wise, Grade graph | Toggle list | No |
| Exam Types | Name, Weight %, Schedule, Duration, Active | Table (editable) | Yes |
| Report Card Fields | 10 toggleable fields (Photo, Attendance, Remarks, etc.) | Toggle list | No |
| Grading Display Mode | Marks / Grades / Both | Dropdown | No |
| Report Preview | Live mock report card preview | Button + modal | — |

**Relationships:**
- Grade boundaries overlap detection (highlights conflicts in red)
- Exam schedule overlap detection (warns if same classes overlap)
- Weightage validation (must total 100%, shows error if not)
- Linked to **Academic Config** (terms, calendar)
- Feeds into **Student Dashboard** (results), **Teacher Dashboard** (gradebook), **Parent Dashboard** (academics)

---

#### B3. Homework & Assignment Configuration (SSA)
**Description:** Controls how homework is submitted, late policy, file size limits, and notifications.

**User Actions:** Edit / Toggle

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| Submission Mode | Online Only / Offline Only / Both | Dropdown | Yes |
| Grace Period | Days for late submission | Number | No |
| Max File Size | Upload limit in MB | Number | No |
| Allow Late Submission | Toggle | Toggle | No |
| Parent Notification | Notify parent when homework assigned | Toggle | No |
| Plagiarism Check | Enable plagiarism detection | Toggle | No |

**Relationships:**
- Linked to **Teacher Dashboard** (assign homework)
- Linked to **Student Dashboard** (submit homework)
- Linked to **Parent Dashboard** (view homework status)

---

#### B4. Timetable Configuration (SSA)
**Description:** Configures bell schedule, period timings, Saturday schedule, zero period, assembly, substitution rules, and room/infrastructure management.

**User Actions:** Add / Edit / Delete / Toggle

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| Bell Schedule | Period Name, Start Time, End Time (11 periods) | Table (editable) | Yes |
| Saturday Schedule | Full-day / Half-day / Off | Select buttons | Yes |
| Zero Period | Enable early morning period | Toggle | No |
| Zero Period Times | Start and End time | Time inputs | No |
| Assembly Duration | Minutes | Number | Yes |
| Substitution Mode | Manual / Auto-suggest / Both | Dropdown | Yes |
| Substitution Basis | Free periods / Subject match / Both | Dropdown | No |
| Allow Period Swaps | Teachers can swap periods | Toggle | No |
| Rooms | Name, Type, Capacity, Floor, Equipment, Status (12 rooms) | Table (editable) | Yes |

**Relationships:**
- Bell schedule feeds **Teacher Dashboard** and **Student Dashboard**
- Rooms link to Exam scheduling
- Substitution links to **Vice Principal Dashboard**
- Saturday schedule affects **Attendance** calculation

---

### CATEGORY C: HR & STAFF

---

#### C1. HR Configuration (SSA)
**Description:** Departments, designations, salary structure, pay cycle, attendance methods, onboarding checklist, HR letter templates, and appraisal stages.

**User Actions:** Add / Edit / Delete / Toggle

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| Departments | 11 departments (Admin, Teaching-Primary/Secondary/Senior, etc.) | Tag list | Yes |
| Designations | 12 designations (Principal, HOD, PGT, TGT, PRT, etc.) | Tag list | Yes |
| Salary Components | Name, Type (Earning/Deduction), Percentage (9 components) | Table (editable) | Yes |
| Pay Cycle | Monthly / Bi-weekly / Weekly | Dropdown | Yes |
| Pay Day | 1st / 5th / 10th / Last working day | Dropdown | Yes |
| Staff Attendance Methods | Biometric, Mobile App, RFID, Manual, Geo-fencing | Toggle list | Yes |
| Onboarding Checklist | 8 document/verification items | Editable list | Yes |
| HR Letter Types | 8 types (Offer, Appointment, Confirmation, etc.) | Tag list | Yes |
| Appraisal Stages | 5 stages (Self → HOD → Principal → Management → Letter) | Ordered list | Yes |

**Relationships:**
- **Departments/Designations** feed into all staff-related modules
- **Salary Structure** feeds **HR Manager Dashboard** payroll
- **Attendance Methods** link to **Attendance Config**

---

#### C2. Leave Configuration (SSA)
**Description:** Staff leave types, annual allocation, carry-forward rules, sandwich rule, and separate approval chains for teaching vs non-teaching staff.

**User Actions:** Add / Edit / Delete / Toggle

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| Leave Types | Type, Days/Year, Carry Forward, Max Carry (6 types) | Table (editable) | Yes |
| Sandwich Rule | Count holidays between leave days as leave | Toggle | No |
| Half-Day Leave | Allow half-day leave requests | Toggle | No |
| Max Consecutive Days | Days before special approval needed | Number | Yes |
| LWP Threshold | Days after balance exhausted before LWP | Number | Yes |
| Teaching Approval Chain | Role, Time Limit (3 levels) | Table (editable) | Yes |
| Non-Teaching Approval Chain | Role, Time Limit (2 levels) | Table (editable) | Yes |

**Relationships:**
- Linked to **HR Manager Dashboard** (leave requests, approvals)
- Linked to **Teacher Dashboard** (apply leave, view balance)
- Affects **Payroll** (LWP deductions)

---

#### C3. HR Manager Dashboard
**Description:** Full HR management — employee directory, onboarding pipeline, attendance, leave management, payroll processing, performance appraisals, HR letters, employee lifecycle, document management, offboarding, and HR settings.

**User Actions:** Add / Edit / Delete / View / Approve / Reject / Generate / Export

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| Total Staff | Count with Present/Leave/Absent breakdown | Display | — |
| Employee Directory | Name, ID, Department, Designation, Contact, Status | Table | — |
| Onboarding Pipeline | 5-stage Kanban: Applied → Interview → Selected → Documentation → Onboarded | Kanban board | — |
| Attendance Table | Employee, Dept, Check In, Check Out, Status | Table | — |
| Leave Requests | Employee, Type, From, To, Days, Status | Table (actionable) | — |
| Payroll Table | Employee, Basic, Gross, Deductions, Net, Status | Table | — |
| Performance Appraisal | 5-stage pipeline with department completion tracking | Progress view | — |
| HR Letters | 6 templates: Appointment, Experience, Salary, Relieving, Warning, NOC | Generate modal | — |
| Lifecycle Events | Employee, Event Type, Date, Details, Processed By | Table | — |
| Documents | Employee, Type, Upload Date, Expiry, Status | Table | — |
| Offboarding | Employee, Resignation Date, Last Day, Clearance Progress | Table | — |
| Add Employee Wizard | 4 steps: Personal → Professional → Salary → Documents | Multi-step form | — |
| Settings | 7 sections: General, Employee Info, Attendance, Leave, Workflows, Approvals, Notifications | Config panels | — |

**Relationships:**
- Reads from **HR Config** and **Leave Config** (SSA settings)
- Salary data visible to **Accounts Head** and **Trustee Dashboard**
- Leave data links to **Teacher Dashboard** leave module
- Staff data links to **Principal Dashboard** staff overview

---

### CATEGORY D: ATTENDANCE

---

#### D1. Attendance Configuration (SSA)
**Description:** Student attendance marking methods, frequency, grace period, auto-notification rules, and attendance types.

**User Actions:** Edit / Toggle

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| Marking Methods | Biometric, Mobile App, RFID, Manual, QR Code | Toggle list | Yes |
| Marking Frequency | Daily / Twice-daily / Period-wise | Dropdown | Yes |
| Grace Period | Minutes before "Late" marking | Number | No |
| Half-Day Cutoff | Time threshold for half-day | Time | No |
| Consecutive Absent Threshold | Days before alert triggers | Number | No |
| Auto-Notification Rules | 6 rules (parent alert, weekly summary, etc.) | Toggle list | No |
| Attendance Types | Present, Absent, Late, Half-Day, Medical, On-Duty, Excused | Toggle list | Yes |
| Allow Custom Types | Let schools add custom attendance statuses | Toggle | No |

**Relationships:**
- **Teacher Dashboard** uses these settings for marking attendance
- Auto-notifications link to **Communication Config**
- Absence alerts feed **Principal Dashboard**
- Attendance data visible on **Student** and **Parent Dashboards**

---

### CATEGORY E: TRANSPORT

---

#### E1. Transport Configuration (SSA)
**Description:** Complete transport setup — policy, operation type, fee collection, GPS tracking levels, routes with driver/vehicle assignment, vehicle fleet with expiry tracking, driver management, safety features, pickup policies, and Transport Manager permissions.

**User Actions:** Add / Edit / Delete / Toggle / View

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| Transport Policy | Optional (walking allowed) / Mandatory | Select | Yes |
| Operation Type | In-house / Contracted | Select | Yes |
| Contractor Name | Name (if contracted) | Text | No |
| Fee Collected By | School / Contractor | Select | Yes |
| TM Can Accept Fees | Transport Manager fee collection | Toggle | No |
| Auto Receipt | Generate receipt automatically | Toggle | No |
| Receipt Prefix | Receipt number prefix | Text | No |
| Fee Sync to School | Sync transport fee to main fee module | Toggle | No |
| Lady Attendant | Enable lady attendant role | Toggle | No |
| Driver Assistant | Enable driver assistant role | Toggle | No |
| GPS Tracking Level | None / Normal / Premium | Select | Yes |
| Premium Alert Types | Trip Start, Proximity, Reach School, Board/Alight, Delay, Route Deviation | Toggle list | No |
| Routes | Name, Stops, Capacity, Morning/Evening times, Driver, Vehicle | Table (editable) | Yes |
| Vehicle Fleet | Reg No, Type, Capacity, Year, Insurance Expiry, GPS | Table (editable) | Yes |
| Drivers | Name, Phone, License, License Expiry, Badge | Table (editable) | Yes |
| Safety Features | GPS Live, RFID, Speed Alert, SOS, CCTV, Route Deviation, Geo-fence | Toggle list | No |
| Speed Alert Limit | kmph threshold | Number | No |
| Fee Model | Flat / Route-wise / Route+Stop-wise / Distance-based | Select | Yes |
| Pickup Policies | Registered guardians only, OTP, Photo, Pre-registration | Toggle list | No |
| Commute Tagging | Tag student commute mode | Toggle | No |
| Transport Manager Permissions | 19 granular CRUD permissions | Toggle list | No |

**Relationships:**
- Fee sync links to **Fee Config** (transport fee head)
- Routes/Drivers/Vehicles cross-reference each other
- GPS/Alerts link to **Parent Dashboard** (live tracking)
- Pickup policies link to **Visitor Config** and **Security Dashboard**
- Insurance expiry warnings (red if expired, amber if <30 days)

---

#### E2. Transport Head Dashboard
**Description:** Manages the school's transport fleet — routes, stops, vehicles, drivers, lady attendants, driver assistants, student assignments, GPS tracking, maintenance, and transport fees.

**User Actions:** Add / Edit / Delete / View / Track / Log

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| Total Vehicles | Fleet count | Display | — |
| Active Routes | Route count with trip progress | Display | — |
| Students Using Transport | Student count | Display | — |
| Transport Fees Overview | Today's Collection, FY Total, Outstanding | Display | — |
| Routes Table | Name, Area, Type, Vehicle, Driver, Attendant, Stops, Schedule | Table | — |
| Stops Table | Name, Area, Landmark, Routes, Students, Fee/month | Table | — |
| Vehicle Fleet | Number, Type, Capacity, Driver, Route, Insurance/PUC/Fitness Expiry | Table | — |
| Drivers | Photo, Name, Phone, Route, Vehicle, License, Aadhar, Blood Group | Form/Table | — |
| Lady Attendants | Photo, Name, Phone, Route, Experience, Aadhar | Form/Table | — |
| Driver Assistants | Photo, Name, Phone, Route, Experience, Aadhar | Form/Table | — |
| Students (Transport) | Student ID, Name, Class, Route, Pickup/Drop Stop, Fee, Parent Phone | Table | — |
| GPS Live Map | Vehicle positions, speed, ETA, route progress | Map view | — |
| Maintenance Log | Vehicle, Service Type, Date, Cost, Next Due, Vendor | Table | — |
| Staff Attendance | Drivers / Attendants / Assistants with P/H/L/A | Toggle grid | — |

**Relationships:**
- Reads from **Transport Config** (SSA settings)
- Student transport data links to **Student/Parent Dashboards**
- Maintenance costs visible to **Accounts Head**
- GPS data feeds **Parent Dashboard** live tracking

---

#### E3. Bus Nanny Dashboard
**Description:** Bus attendant for young children — manages trips, safety checklists, student tracking, and incident reporting.

**User Actions:** View / Log / Report / Verify

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| Today's Trips | Trip count | Display | — |
| Children Assigned | Child count with special notes | Display | — |
| Safety Checklists | Head count, Seatbelt, First-aid, Emergency contacts, Cleanliness, Drop-off count | Checklist | — |
| Trip Log | Trip #, Route, Time, Children Count, Status, Checklist | Table | — |
| Students Assigned | ID, Name, Age, Class, Route, Stop, Parent Phone, Allergies | Table | — |
| Special Needs Students | Individual cards with requirements | Card list | — |

**Relationships:**
- Reads student data from **Transport Head** module
- Allergy data links to **Student Profiles**

---

### CATEGORY F: COMMUNICATION

---

#### F1. Communication Configuration (SSA)
**Description:** DM permissions (who can message whom), parent communication mode, group creation rules, auto-created groups, chat storage limits, file sharing controls, and message templates.

**User Actions:** Edit / Toggle / Add / Delete

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| DM Permissions | 10 permission pairs (Parent↔Teacher, Teacher↔Principal, etc.) | Toggle list | Yes |
| Parent Communication Mode | Full Two-Way / Reply Only / Broadcast Only | Select | Yes |
| Group Creation Permissions | Admin, Principal, Teacher (class/subject), Parent, Student | Toggle list | Yes |
| Auto-Created Groups | 6 default groups (Class Parents, Subject Teachers, Staff, etc.) | Tag list | Yes |
| Message Retention | Duration in years | Text | Yes |
| File Storage per User | MB limit | Text | Yes |
| Max File Size | MB limit | Text | Yes |
| File Sharing Types | Images, Documents, Video, Voice, Location | Toggle list | No |
| Message Templates | 8 templates with channel (SMS/Email/WhatsApp/Push), category, text | Table (editable) | No |

**Relationships:**
- DM permissions affect ALL dashboards with Communication module
- Templates reference **Fee Config** (amounts), **Attendance** (alerts), **Student Profiles** (names)
- Parent mode affects **Parent Dashboard** capabilities

---

#### F2. Chat Module (Shared Component)
**Description:** WhatsApp-like messaging system used across all 18 dashboards. Includes direct messages, group chats, broadcasts, polls, and chat settings.

**User Actions:** Send / Receive / Search / Create Group / Broadcast / Poll / Configure

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| Conversations | 10 conversations (DMs + groups) with unread counts | List | — |
| Messages | Sender, Text, Time, Status (read/delivered), File attachments | Thread | — |
| Contacts | Name, Role, Department, Online status | List | — |
| Groups | System groups (5), Auto groups (4), Custom groups (2), House groups (4) | Categorized list | — |
| Broadcasts | From, Title, Audience, Priority, Read count/total | Table | — |
| Polls | Question, Options, Votes, Status (Active/Closed) | Cards | — |
| Settings | DM permissions, Parent mode, Group authority, Storage, Notifications | Config panel | — |

**Relationships:**
- Used in **ALL 18 dashboards** as embedded Communication tab
- Standalone page at `/chat`
- Floating widget in bottom-right corner of all pages

---

### CATEGORY G: VISITOR & SECURITY

---

#### G1. Visitor Configuration (SSA)
**Description:** Visitor management rules — pickup verification method and per-visitor-type rules (Parent, Vendor, General, Contractor, Government Official, Alumni) with unique security toggles, time windows, and duration limits.

**User Actions:** Edit / Toggle

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| Pickup Verification Method | OTP / Photo Match / RFID-QR | Select | Yes |
| Active Visitor Type | Parent / Vendor / General / Contractor / Government / Alumni | Tabs | — |
| Per-Type Toggles | 5-7 security rules per visitor type | Toggle list | Per type |
| Allowed Hours | From-To time window per type | Time range | Per type |
| Max Visit Duration | Minutes (0 = no limit) | Number | Per type |
| CCTV Parent Access | Allow parents to view designated cameras | Toggle | No |
| CCTV Retention Days | Number of days recordings are kept | Number | No |

**Relationships:**
- Pickup rules link to **Transport Config** pickup policies
- Government official auto-notification links to **Principal Dashboard**
- Feeds into **Receptionist** and **Security Dashboards**

---

#### G2. Receptionist Dashboard
**Description:** Front desk operations — visitor check-in/out, enquiries, call logging, fee counter, courier/mail, appointments, and directory search.

**User Actions:** Add / Edit / View / Search / Check-in / Check-out / Log / Schedule

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| Visitors In Campus | Current count | Display | — |
| Visitor Table | Badge, Name, Purpose, Host, ID Type, Time In/Out, Status | Table | — |
| Enquiry Pipeline | Child, Parent, Class Applied, Source, Follow-up Date, Status | Table | — |
| Call Log | Type, Caller, Purpose, Time, Duration, Action, Forwarded To | Table | — |
| Fee Counter | Student search, Fee Head, Amount, Payment Mode, Receipt | Form | — |
| Courier/Mail | Type, Sender/Receiver, Date, Status | Table | — |
| Appointments | Type, Date, Time, Person, Status | Calendar/Table | — |
| Directory Search | Student / Parent / Staff with Class/Section filters | Search + popup | — |

**Relationships:**
- Reads from **Visitor Config** (rules per type)
- Fee counter links to **Fee Config** (fee heads, payment modes)
- Enquiries link to **School Admin** enquiry module
- Directory links to **Student Profiles** and **Staff Profiles**

---

#### G3. Security Dashboard
**Description:** Campus security — visitor check-in with photo/ID capture, student pickup verification (OTP), gate logs, emergency protocols, patrol management, and gate passes.

**User Actions:** Check-in / Verify / Log / Call / Alert

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| Visitors Inside Campus | Count | Display | — |
| Visitor Check-in Form | Photo, ID Scan, Name, Phone, Purpose, Host, Badge, Vehicle | Form | — |
| Student Pickup | OTP verification, authorized person check, release log | OTP + Queue | — |
| Gate Log | Time, Person, Type, Direction (IN/OUT), Vehicle, Gate | Table | — |
| Emergency Contacts | Police, Fire, Ambulance + school contacts | Contact list | — |
| Emergency Protocols | 4 procedures (Fire, Medical, Intruder, Earthquake) | Step lists | — |
| Panic Button | Sends alert to all staff + emergency services | Button | — |
| Evacuation Points | 4 assembly points with drill history | Table | — |
| Patrol Schedule | ID, Time, Area, Guard, Status, Remarks | Table | — |
| Gate Passes | ID, Name, Type, Purpose, Exit/Return Time, Authorized By | Table | — |

**Relationships:**
- Reads from **Visitor Config** (visitor type rules)
- Pickup OTP links to **Parent App** (parent sends OTP)
- Emergency protocols are standalone safety procedures

---

### CATEGORY H: STUDENT MANAGEMENT

---

#### H1. Student Portal Configuration (SSA)
**Description:** Controls what students can see and do through their portal.

**User Actions:** Toggle

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| Homework Submission | Allow online submission | Toggle | No |
| Show Class Rank | Display rank (with sensitivity warning) | Toggle | No |
| Show Attendance | Show attendance percentage | Toggle | No |
| Digital Library | Access to eBooks | Toggle | No |
| Timetable View | View class timetable | Toggle | No |
| Results View | View exam results with PDF download | Toggle | No |

**Relationships:**
- Controls what appears on **Student Dashboard**

---

#### H2. Student Dashboard
**Description:** Student's personal portal — timetable, homework, results, attendance, fees, library, leave, documents, notices.

**User Actions:** View / Submit / Download / Apply

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| Profile | Name, Class, Roll, Board, Admission No, House | Header card | — |
| Today's Schedule | 8 periods with Subject, Teacher, Room | Table | — |
| Homework | Subject, Title, Due Date, Status, Marks | List | — |
| Results | Subject-wise marks per exam type, Grade, Rank | Table | — |
| Attendance Calendar | Day-by-day status (P/A/L/H) + monthly history | Calendar + Table | — |
| Fee Structure | 7 fee heads with amounts and frequency | Table | — |
| Payment History | Receipt, Date, Amount, Mode, Status | Table | — |
| Library Books | Issued books with due dates + catalog search | Table | — |
| Leave Records | Type, Dates, Reason, Status | Table | — |
| Documents | Certificates with download/request actions | List | — |
| Notices | School notices with categories | List | — |

**Relationships:**
- Timetable from **Timetable Config**, Fees from **Fee Config**, Results from **Exam Config**
- Attendance data from **Teacher Dashboard** marking
- Library data from **Library Config**
- Homework from **Teacher Dashboard** assignment

---

### CATEGORY I: PARENT MANAGEMENT

---

#### I1. Parent Portal Configuration (SSA)
**Description:** Controls what parents can access — multi-child support, fee payment, PTM booking, transport tracking, report card access, and 14 individual module toggles.

**User Actions:** Toggle / Select

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| Multi-Child Account | Family account for multiple children | Toggle | No |
| Fee Payment | Allow online fee payment | Toggle | No |
| PTM Booking | Allow PTM slot booking | Toggle | No |
| Leave Application | Allow leave requests | Toggle | No |
| Transport Tracking | Live bus location | Toggle | No |
| Communication Mode | Full Two-Way / Reply Only / Broadcast | Dropdown | Yes |
| Report Card Access | Toggle + visibility timing | Toggle + Dropdown | No |
| Module Toggles | 14 modules individually enabled/disabled | Toggle list | No |

**Relationships:**
- Controls what appears on **Parent Dashboard**

---

#### I2. Parent Dashboard
**Description:** Parent's portal with child selector — attendance, academics, fees, homework, communication, transport tracking, and pickup authorization. Supports multiple children.

**User Actions:** View / Pay / Manage / Switch Child

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| Child Selector | Toggle between children | Dropdown | — |
| Child Profile | Name, Class, Roll, Admission No, House, Class Teacher | Card | — |
| Attendance Calendar | Monthly day-by-day status + summary stats | Calendar | — |
| Exam Results | Subject-wise marks per exam, Rank, Remarks | Table | — |
| Fee Summary | Current Due, Total Paid, Next Due Date | Display | — |
| Payment History | ID, Date, Description, Amount, Mode, Receipt | Table | — |
| Homework | Subject, Title, Due, Status, Grade | List | — |
| Transport | Bus No, Route, Driver, Pickup/Drop times, Live tracker | Card + map | — |
| Pickup Authorization | Authorized persons: Name, Relation, Phone, Aadhaar | Table | — |
| PTM Schedule | Date, Time, Teacher, Subject, Status | Table | — |
| Notices | School notices with urgency flags | List | — |

**Relationships:**
- Child data from **Student Profiles**
- Attendance from **Teacher Dashboard** marking
- Fees from **Fee Config** + **Accounts Head**
- Transport from **Transport Config**
- Homework from **Teacher Dashboard**

---

### CATEGORY J: ADMINISTRATION

---

#### J1. School Identity Configuration (SSA)
**Description:** Core school details — name, medium, category, board, working days, shifts, daycare hours, notification templates, and system announcements.

**User Actions:** Edit / Toggle / Add / Delete

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| School Name | Official school name | Text | Yes |
| Medium of Instruction | English / Hindi / Gujarati / Bilingual / Trilingual | Dropdown | Yes |
| Category | Co-educational / Boys Only / Girls Only | Dropdown | Yes |
| Academic Year Pattern | April-March / June-May / January-December | Dropdown | Yes |
| Board Affiliation | CBSE / ICSE / State Board / IB / Custom | Dropdown | Yes |
| Working Days | Mon-Fri / Mon-Sat / Custom | Dropdown | Yes |
| Shifts | Name, Assigned Classes (multiple shifts) | Table (editable) | No |
| Extended Hours / Daycare | Toggle + Start/End times + Fee toggle | Toggle + Time | No |
| Notification Template | Standard / Formal / Minimal / Custom | Dropdown | No |
| System Announcement | School-wide announcement text | Textarea | No |
| School Logo | Upload PNG/JPG file | File input | No |

**Relationships:**
- School name/board/medium appear across all dashboards
- Working days affect **Attendance** and **Timetable** calculations
- Shifts affect **Timetable Config**

---

#### J2. Onboarding Wizard (SSA)
**Description:** 6-step wizard for initial school setup: School Info → Organisation Setup → Academic Config → Module Selection → Admin Account → Review & Launch.

**User Actions:** Fill / Select / Toggle / Launch

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| Step 1 - School Name | Official name | Text | Yes |
| Step 1 - Address | School address | Text | Yes |
| Step 1 - Contact | Phone number | Text | Yes |
| Step 1 - Board | CBSE / ICSE / State / IB | Dropdown | Yes |
| Step 1 - School Type | Co-ed / Boys / Girls | Dropdown | Yes |
| Step 1 - Logo | School logo file | File input | No |
| Step 2 - Trust Name | Organisation/trust name | Text | Yes |
| Step 2 - Org Type | Single School / Sister Concern / Chain / Franchise | Card select | Yes |
| Step 2 - Number of Schools | Count | Number | Yes |
| Step 3 - Academic Year | April-March / June-May / January-December | Dropdown | Yes |
| Step 3 - Grading Scale | Percentage / GPA 10 / GPA 4 / Grade Letters / CGPA | Dropdown | Yes |
| Step 3 - Terms | Number of terms (1-4) | Dropdown | Yes |
| Step 3 - Medium | English / Hindi / etc. | Dropdown | Yes |
| Step 4 - Module Selection | 16 modules with toggle on/off | Toggle list | Yes |
| Step 5 - Admin Name | First admin user name | Text | Yes |
| Step 5 - Admin Email | Admin email | Email | Yes |
| Step 5 - Admin Phone | Admin phone | Phone | Yes |
| Step 5 - Admin Password | Initial password | Password | Yes |
| Step 6 - Review & Launch | Read-only summary + Launch button | Display + Button | — |

**Relationships:**
- Feeds initial settings into ALL SSA config modules
- Org type determines multi-school architecture
- Module selection enables/disables SSA config sections

---

#### J3. Roles & Permissions (SSA)
**Description:** The most complex module — full RBAC system with module-specific permissions (12 modules × 7-9 permissions each), 15 system roles, custom role creation with inheritance, role cloning, multi-role per user, module-wise data scope, user-level overrides, dashboard widget config, audit log, and temporary role elevation.

**User Actions:** Add / Edit / Delete / Disable / Clone / Assign / Override / Compare / Grant Temp

**Tab 1: Permission Matrix**

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| Module Accordion | 12 expandable modules (Fees, Students, Attendance, etc.) | Accordion | — |
| Per-Module Permissions | 7-9 specific permissions per module (e.g., Fees: View, Create Receipt, Edit Structure, Delete, Export, Approve Concession, Manage Defaulters, View Reports) | Checkbox matrix | — |
| Edit/Save/Cancel per Role | Inline editing of role permissions | Buttons | — |
| Disable/Delete Role | Disable system roles, delete custom roles | Buttons | — |

**Tab 2: Roles & Hierarchy**

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| Role Hierarchy | Visual tree of 15 system roles | Display | — |
| Custom Role Creation | Name, Description, Parent Role, Base Permissions | Modal form | — |
| Clone Role | Source role → New role name (copies all permissions) | Form | — |
| User Assignment | Name, Roles (multi-select), Department, Date | Table | — |
| Effective Permissions | Union of all assigned roles | Read-only modal | — |
| Bulk Role Assignment | Select multiple users + assign role | Form | — |

**Tab 3: Access Control**

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| User Overrides | User, Override Type (+/-), Module, Permissions | Table + Form | — |
| Data Scope per Module | Role → Module → Scope (Own Class / Dept / Branch / Full School / Custom) | Dropdown matrix | — |
| Field-Level Access | Salary, Phone, Aadhaar, Fee Defaulter, Medical, Bank Details | Display table | — |
| Dashboard Widgets per Role | Toggle widgets on/off per role | Toggle list | — |

**Tab 4: Audit & Temp**

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| Permission Change Log | Date, User, Action, Details | Table (filterable) | — |
| Temporary Role Grants | User, Temp Role, Start/End Date, Reason, Auto-Revert | Table + Form | — |
| Role Comparison | Side-by-side diff of two roles | Modal | — |

**15 System Roles:** Super Admin, Principal, Vice Principal, Teacher, Class Teacher, School Admin, Account Head, HR Manager, Transport Head, Receptionist, Security Guard, Librarian, Hostel Warden, Parent, Student

**12 Permission Modules (with specific permissions):**
- Fees: View, Create Receipt, Edit Structure, Delete, Export, Approve Concession, Manage Defaulters, View Reports
- Students: View, Add Student, Edit Profile, Delete, Export, View Medical, Promote, Transfer
- Attendance: View, Mark, Edit, Delete, Export, View Reports, Configure Rules
- Exams: View, Create Exam, Enter Marks, Edit Marks, Delete, Publish Results, Generate Report Card, Export
- Visitors: View, Register Entry, Approve Visit, Delete, Export, Manage Pickup, View CCTV
- HR: View, Add Staff, Edit Staff, Delete, Approve Leave, Process Payroll, View Salary, Export, Generate Letters
- Transport: View, Manage Routes, Manage Vehicles, View Live Map, Collect Fees, Manage Drivers, Export, View Reports
- Reports: View, Generate, Export PDF, Export Excel, Schedule Reports, View Financial, View Academic
- Communication: View, Send DM, Create Group, Broadcast, Delete Messages, Manage Templates, View All Chats
- Timetable: View, Create Schedule, Edit Schedule, Swap Periods, Manage Substitution, Assign Rooms, Export
- Library: View, Issue Book, Return Book, Add Catalogue, Delete, Manage Fines, Export
- Inventory: View, Add Asset, Edit Asset, Delete, Raise PO, Approve PO, Export

**Relationships:**
- Governs access to ALL modules across ALL dashboards
- Every feature/button should have a corresponding permission here

---

#### J4. Critical Locks (SSA)
**Description:** OTP-protected locks on critical fields (fee structure, deletion, payment modes, etc.) requiring Trustee/Principal verification to change.

**User Actions:** View / Request Unlock (OTP)

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| Lock Fields | 10 lockable fields with lock status | Table | — |
| Lock Events | Time, Event, Action, Result, Status | Table | — |
| OTP Verification | 6-digit OTP with countdown timer | Modal | — |

**Relationships:**
- Protects **Fee Config**, **Student/Staff deletion**, **Permission changes**

---

#### J5. Audit Log (SSA)
**Description:** Read-only log of all SSA configuration changes with module filtering.

**User Actions:** View / Filter

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| Filter Module | All / Fees / Transport / Leave / Exams / Communication / HR / Attendance | Filter buttons | — |
| Log Table | Date, Action, Module, Details, User | Table | — |

---

#### J6. Data Migration (SSA)
**Description:** 4-step import wizard (Upload → Map Fields → Validate → Import) for 6 data types with template download and rollback capability.

**User Actions:** Upload / Map / Validate / Import / Rollback / Download Template

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| Import Cards | 6 types: Students, Staff, Fee Records, Library, Transport, Attendance | Cards | — |
| File Upload | CSV/Excel file per data type | File input | — |
| Step Progress | 4-step indicator (Upload → Map → Validate → Import) | Progress | — |
| Validation Results | Record count, Error count | Display | — |
| Recent Imports | Type, Date, Records, Status + Rollback button | Table | — |
| Template Download | CSV template per data type | Download button | — |

---

#### J7. Backup & Export (SSA)
**Description:** Data backup (auto/manual), export in multiple formats, restore from backup with confirmation.

**User Actions:** Backup / Export / Restore / Download

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| Auto Backup | Enable + frequency (Daily/Weekly/Monthly) | Toggle + Dropdown | No |
| Manual Backup | Run now with progress bar | Button | — |
| Export Modules | Students, Staff, Fees, Attendance, All | Toggle list | — |
| Export Format | CSV / Excel / JSON | Button group | — |
| Export Date Range | From and To dates | Date pickers | — |
| Restore | Upload .sql/.gz/.zip file + 2-step confirmation | File input + modal | — |
| Backup History | Date, Type, Size, Status + Download | Table | — |

---

### CATEGORY K: SCHOOL DASHBOARDS

---

#### K1. Principal Dashboard
**Description:** School head's command center — attendance drill-downs (class-wise, house-wise, absent-today), enquiry pipeline, news board, staff overview, HR, compliance, approvals, reports, and calendar.

**User Actions:** View / Drill-down / Approve / Navigate

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| Student Attendance | Present/Total with drill-down to class/house/absent-today | Clickable cards | — |
| Staff Present | Academic + Non-Academic with drill-down | Clickable cards | — |
| Enquiry Pipeline | 5 stages: New → Follow-up → Test → Converted → Lost | Pipeline cards + Table | — |
| News Board | "Going On Now" (live) + "Upcoming Today" | Feed | — |
| Staff Overview | Department-wise, Syllabus Completion, Substitution Summary | Tables | — |
| Compliance | Overdue, Due This Month, Upcoming items | Checklist | — |

**Relationships:**
- Attendance data from **Teacher marking**
- Enquiries from **School Admin**
- Staff data from **HR Manager**

---

#### K2. Vice Principal Dashboard
**Description:** Academic operations — substitution management, discipline cases, timetable, exam scheduling, staff duties, circulars, approvals.

**User Actions:** Assign / Edit / View / Create / Approve

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| Substitutions | Absent Teacher, Substitute, Period, Class, Subject, Status | Table | — |
| Discipline Cases | Student, Incident, Reported By, Action Taken, Status | Table | — |
| Timetable | Class-wise, Teacher-wise, Room Allocation views | Tables | — |
| Exam Schedule | Exam, Subject, Class, Date, Room, Invigilator | Table | — |
| Staff Duties | Duty, Assigned To, Date, Time, Location, Status | Table | — |
| Circulars | Title, Category, Audience, Read Count, Status | Table | — |

---

#### K3. School Admin Dashboard
**Description:** Day-to-day school operations — student registration (full wizard), enquiries, staff, fees, timetable, certificates, transport, visitors, communication, approvals, attendance, reports, HR, and configuration.

**User Actions:** Add / Edit / Delete / View / Approve / Generate / Export

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| Student Registration | Full multi-section form: Personal, Parent, Sibling, Address, Transport, Medical, Previous School, Bank, Documents | Multi-step wizard | — |
| Bulk Student Upload | Excel template upload | File input | — |
| Fee Collection | Today's, FY Total, Outstanding | Display + Table | — |
| News Board | Live school activities | Feed | — |

**Relationships:**
- Central operations hub linking to ALL other modules

---

#### K4. Teacher Dashboard
**Description:** Teacher's daily workflow — timetable (with current period highlighting), classes, attendance marking, homework, gradebook, leave, diary, reports, communication.

**User Actions:** Mark / Assign / Grade / Apply / Write / View

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| Today's Timetable | 8 periods with current/next highlighting | Schedule | — |
| My Classes | 6 class cards with subject, students, room | Cards | — |
| Mark Attendance | Roll-call with P/L/A per student | Form | — |
| Homework List | Subject, Title, Due, Status, Submissions | Table | — |
| Gradebook | Student marks across exam types | Table (editable) | — |
| Leave Balance | CL/SL/EL/ML with usage bars | Cards | — |
| Diary Entries | Date, Class, Subject, Message | List | — |

---

#### K5. Trustee Dashboard
**Description:** Board-level oversight — financial KPIs, academic performance, SQAAF quality scores, staff metrics, compliance, enrollment trends, and board meeting management.

**User Actions:** View / Approve / Analyze

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| Revenue / Expenses / Surplus | Financial KPIs | Stat cards | — |
| Fee Collection | Today + FY totals | Display | — |
| SQAAF Score | Composite score + 7 domains | Score card + Table | — |
| Board Exam Results | 3-year trend | Table | — |
| Staff Metrics | Attrition, Ratios, PhD holders, Satisfaction | Metrics | — |
| Enrollment Trends | 4-year chart + grade distribution | Chart + Table | — |

---

### CATEGORY L: PLATFORM MANAGEMENT

---

#### L1. Super Admin Dashboard (Platform-level)
**Description:** Platform administration — manage all schools, subscription plans, user management, module configuration, onboarding pipeline, support tickets, analytics (with per-school drill-down), system config, reseller management, audit logs.

**User Actions:** Add / Edit / View / Configure / Onboard / Analyze

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| Active Schools | Count + plan breakdown | Display | — |
| Total Users | Platform-wide user count | Display | — |
| MRR | Monthly Recurring Revenue | Display | — |
| School Management | Detail view per school with config sections | Cards + Tables | — |
| Plans & Billing | 3 plans: Starter / Professional / Enterprise | Cards | — |
| Module Config | 27 modules across 8 categories with plan checkboxes | Matrix | — |
| Onboarding Pipeline | 5 stages: Demo → Proposal → Migration → Training → Go-Live | Pipeline | — |
| Analytics | Platform overview + per-school drill-down (DAU/MAU, module usage, alerts) | Dashboard | — |
| System Config | General, Security, Notifications, Integrations | Config panels | — |
| Reseller Management | Create/manage resellers, commission tiers, payouts | Table + Form | — |
| Audit Logs | Time, User, Action, Target, IP | Table | — |

---

#### L2. Reseller Dashboard
**Description:** Channel partner portal — track onboarded schools, commissions, leads pipeline, earnings.

**User Actions:** View / Add Lead / Track

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| Schools Onboarded | Count + list with plan, fee, commission | Table | — |
| Earnings | This Month, Last Month, YTD, Pending Payout | Display | — |
| Commission Structure | Tiered: Bronze 15% / Silver 18% / Gold 20% / Platinum 22% | Table | — |
| Leads Pipeline | 6 stages: Enquiry → Demo → Proposal → Negotiation → Onboarded → Lost | Kanban + Table | — |

---

#### L3. Account Manager Dashboard
**Description:** Customer success management — school portfolio health, support tickets, usage analytics (heatmap), renewals, and onboarding pipeline.

**User Actions:** View / Manage / Analyze / Upsell

| Field Name | Description | Type | Required |
|------------|-------------|------|----------|
| Assigned Schools | School cards with MRR, Adoption %, NPS, Health Score | Cards | — |
| Support Tickets | ID, School, Subject, Priority, SLA, Status | Table | — |
| Usage Analytics | Login frequency, Module adoption heatmap, Low adoption alerts | Charts | — |
| Renewals | School, Plan, Date, Risk Level, Sentiment, Tenure | Table | — |
| Upsell Opportunities | Current → Target plan, Additional MRR, Reason | Cards | — |
| Onboarding Pipeline | 5 stages with school progress tracking | Pipeline | — |

---

### CATEGORY M: ADDITIONAL MODULES (SSA Config)

---

#### M1. Library Configuration
| Field | Type | Description |
|-------|------|-------------|
| Max Books per Student | Number | Loan limit (default: 2) |
| Loan Period | Number | Days (default: 14) |
| Fine per Day | Number | INR (default: 2) |
| Digital Library | Toggle | eBook access |
| Barcode/QR Scanning | Toggle | Scanning support |
| Book Categories | Tag list | Textbook, Reference, Fiction, etc. |

#### M2. Canteen/Meal Configuration
| Field | Type | Description |
|-------|------|-------------|
| Menu Cycle | Dropdown | Weekly / Bi-weekly / Monthly |
| Pre-order System | Toggle | Advance ordering |
| Wallet/Prepaid | Toggle | Prepaid meal account |
| Allergy Tracking | Toggle | Track student allergies |
| Meal Types | Toggle list | Breakfast, Lunch, Snack |
| Preschool Meal Plan | Dropdown | None / Snacks / Breakfast+Lunch / Full Day |

#### M3. Hostel Configuration
| Field | Type | Description |
|-------|------|-------------|
| Curfew Time | Time | Default 21:00 |
| Mess Management | Toggle | Hostel meal management |
| Visitor Log for Hostellers | Toggle | Hostel visitor tracking |
| Fee Integration | Toggle | Sync with main fee module |
| Warden Assignment | Toggle | Assign wardens |
| Room Types | Tag list | Single, Double, Dormitory |

#### M4. Inventory & Asset Configuration
| Field | Type | Description |
|-------|------|-------------|
| Low Stock Threshold | Number | Alert trigger (default: 10) |
| Barcode/QR Asset Tagging | Toggle | Asset identification |
| Low Stock Alerts | Toggle | Automated alerts |
| Depreciation Tracking | Toggle | Asset depreciation |
| Asset Categories | Tag list | Furniture, Electronics, Lab, Sports, etc. |
| Auto-Approve Threshold | Number | INR limit for auto-approval |
| Approval Tiers | Display | <50K Admin→Principal, >50K Principal→Trust |

#### M5. Compliance & Quality Configuration
| Field | Type | Description |
|-------|------|-------------|
| Assessment Framework | Dropdown | SQAAF / NAAC / Custom |
| Audit Schedule | Dropdown | Quarterly / Bi-annual / Annual |
| Compliance Domains | Table | Domain Name, Score (5 domains) |
| Student Documents | Table | 8 doc types with required/mandatory toggles |
| Staff Documents | Table | 8 doc types with required/mandatory toggles |

#### M6. Certificate Configuration
| Field | Type | Description |
|-------|------|-------------|
| Templates | Table | TC, Character, Bonafide, Migration, Sports, Merit |
| Auto-numbering | Toggle | Sequential certificate numbers |
| Digital Signature | Toggle | Electronic signatures |
| QR Code Verification | Toggle | Anti-forgery QR codes |
| Approval Workflow | Ordered list | Class Teacher → Admin → Principal → Generated |

#### M7. Enquiry & Admission Configuration
| Field | Type | Description |
|-------|------|-------------|
| Admission Mode | Dropdown | Online / Offline / Both |
| Application Fee | Number | INR amount |
| Auto-assign Follow-ups | Toggle | Auto-assign enquiry follow-ups |
| Online Application Form | Toggle | Enable online forms |
| Lead Sources | Tag list | Website, Walk-in, Phone, Social Media, etc. |
| Enquiry Sources | Table | 10 sources with active toggle and priority order |

#### M8. Alumni Configuration
| Field | Type | Description |
|-------|------|-------------|
| Self-Registration | Toggle | Alumni can register themselves |
| Donation Module | Toggle | Accept donations |
| Job Board | Toggle | Alumni job postings |
| Event Invitations | Toggle | Invite alumni to events |
| Directory Access | Toggle | Alumni directory |

#### M9. Analytics & BI Configuration
| Field | Type | Description |
|-------|------|-------------|
| Predictive AI | Toggle | AI/ML for dropout risk, fee defaults |
| Comparative Analysis | Toggle | Cross-section/cross-year |
| Auto Monthly Reports | Toggle | Scheduled report generation |
| Dashboard Widgets | Toggle list | Attendance Trends, Fee Collection, Exam Performance, Staff Metrics |
| Data Retention | Dropdown | 1/3/5/10 years / Unlimited |

#### M10. Report Engine Configuration
| Field | Type | Description |
|-------|------|-------------|
| Scheduled Email Reports | Toggle | Auto-email reports |
| Export Formats | Toggle list | PDF, Excel, CSV, Google Sheets |
| Recipients | Toggle list | Admin, Principal, Trustee |
| Auto-Generation | Toggle list | Daily, Weekly, Monthly summaries |

#### M11. API & Integration Configuration
| Field | Type | Description |
|-------|------|-------------|
| Third-Party Master Switch | Toggle | Enable/disable all integrations |
| Webhook Notifications | Toggle | Event webhooks |
| API Rate Limit | Number | Requests per minute |
| Integrations | Toggle list | Tally, WhatsApp Business, SMS Gateway, Google Workspace, Microsoft 365 |

#### M12. Branding & White-label Configuration
| Field | Type | Description |
|-------|------|-------------|
| Custom Domain | Toggle + Text | e.g., portal.yourschool.edu.in |
| White-label App | Toggle | Custom-branded mobile app |
| Custom Email Templates | Toggle | Branded email templates |
| Login Page Customization | Toggle | Custom login page |
| Primary Brand Color | Color picker | Hex color code |
| School Logo | File upload | PNG/SVG, max 2MB |

---

### CATEGORY N: SPECIALIZED ROLES

---

#### N1. Activity Coordinator Dashboard
**Description:** Early childhood / school activities, milestones, events, and art gallery management.

| Field | Type | Description |
|-------|------|-------------|
| Activity Schedule | Table | Time, Activity, Age Group, Room, Materials, Status |
| Developmental Milestones | Table | Area, Milestone, Age Group, Assessed, On Track, Needs Support |
| Events | Table | Date, Event, Age Group, Lead, Budget, Status |
| Art Gallery | Photo grid | Child Name, Activity, Date, Teacher, Likes |

#### N2. Nutritionist Dashboard
**Description:** School/preschool nutrition — meal plans, allergy tracking, weekly menus, kitchen inventory.

| Field | Type | Description |
|-------|------|-------------|
| Meal Plans | Cards | 6 plans: Standard, Nut-Free, Lactose-Free, Gluten-Free, Jain, Diabetic |
| Allergy Register | Table | Student, Allergy, Severity, Action, Parent Contact |
| Weekly Menu | Grid | Mon-Fri × Breakfast/Lunch/Snack |
| Nutritional Targets | Table | Calories, Protein, Carbs, Fat, Calcium, Iron, Vitamin C, Fiber |
| Kitchen Inventory | Table | Item, Unit, Stock, Min Required, Status, Last Refill |

---

### CATEGORY O: SHARED COMPONENTS

---

#### O1. Chat Module
- Used in **ALL 18 dashboards** + standalone `/chat` page
- 5 tabs: Chats, Groups, Broadcasts, Polls, Settings
- 152+ FAQ questions across 13 roles in Support Module

#### O2. Support Module (AI Help Desk)
- Used in **17 dashboards**
- Role-specific FAQs (13 role sets, 152 total questions)
- AI Chat Support bot with quick prompts

#### O3. Task Tracker Popup
- Used on **ALL dashboards** via BlueprintLayout
- Login greeting + Idle reminder with pending tasks
- 6 mock tasks with priority badges and completion tracking

#### O4. Auth System
- Standalone page at `/auth`
- 3 views: Login Preview (OTP + Password flows), Admin Configuration (5 tabs), Staff Reference Document (21 FAQs)
- 6 User ID templates, 5 Password templates, Security settings

---

## 3. Summary Table

| Module Name | Total Fields | Linked Modules |
|-------------|-------------|----------------|
| Fee Configuration | 20+ | Transport, Exam, Communication, Student, Parent, Accounts |
| Online Payment Config | 5 | Fee Config, Accounts Head |
| Accounts Head Dashboard | 12 | Fee Config, HR Config, Trustee, Student, Parent |
| Subscription Management | 7 | Super Admin |
| Academic Configuration | 17 | Timetable, Exam, Fee, Attendance, Student |
| Exam Configuration | 9 | Academic, Attendance, Student, Teacher, Parent |
| Homework Configuration | 6 | Teacher, Student, Parent |
| Timetable Configuration | 9 | Academic, HR, Teacher, Student, VP |
| HR Configuration | 12 | Payroll, Attendance, Leave, Appraisal |
| Leave Configuration | 7 | HR, Payroll, Teacher, Timetable |
| HR Manager Dashboard | 13 | HR Config, Leave Config, Accounts, Principal |
| Attendance Configuration | 8 | Communication, Fee, Teacher, Student, Parent |
| Transport Configuration | 23 | Fee, Communication, Student, Parent, Visitor |
| Transport Head Dashboard | 14 | Transport Config, Student, Parent, Accounts |
| Bus Nanny Dashboard | 6 | Transport Head, Student Profiles |
| Communication Configuration | 8 | All dashboards, Fee, Attendance, Transport |
| Chat Module (Shared) | 40+ | All 18 dashboards |
| Visitor Configuration | 7 | Transport, Communication, Principal, Security |
| Receptionist Dashboard | 8 | Visitor Config, Fee, Student, Staff |
| Security Dashboard | 10 | Visitor Config, Parent App |
| Student Portal Config | 6 | Student Dashboard |
| Student Dashboard | 11 | Timetable, Fee, Exam, Teacher, Library |
| Parent Portal Config | 8 | Parent Dashboard |
| Parent Dashboard | 11 | Student, Teacher, Fee, Transport |
| School Identity Config | 11 | All dashboards (name/board/medium) |
| Onboarding Wizard | 18 | All SSA config modules |
| Roles & Permissions | 90+ | ALL modules across ALL dashboards |
| Critical Locks | 10 | Fee, Student, Staff deletion |
| Audit Log | 2 | All SSA modules |
| Data Migration | 6 | Students, Staff, Fees, Library, Transport, Attendance |
| Backup & Export | 7 | All data modules |
| Principal Dashboard | 6 | Attendance, Enquiry, HR, Staff |
| Vice Principal Dashboard | 6 | Substitution, Discipline, Timetable, Exam |
| School Admin Dashboard | 4+ | All operational modules |
| Teacher Dashboard | 7 | Attendance, Homework, Gradebook, Leave |
| Trustee Dashboard | 6 | Finance, Academic, SQAAF, Compliance |
| Super Admin Dashboard | 11 | Schools, Plans, Analytics, Resellers |
| Reseller Dashboard | 4 | Schools, Commissions, Leads |
| Account Manager Dashboard | 6 | Schools, Tickets, Analytics, Renewals |
| Library Config | 6 | Student, Fines |
| Canteen Config | 6 | Student allergies |
| Hostel Config | 6 | Fee, Visitor |
| Inventory Config | 6 | Procurement |
| Compliance Config | 5 | Attendance, Fees, Academics |
| Certificate Config | 5 | Student, Principal approval |
| Enquiry & Admission Config | 6 | School Admin |
| Alumni Config | 5 | Events, Community |
| Analytics & BI Config | 5 | All data modules |
| Report Engine Config | 4 | All modules (data source) |
| API & Integration Config | 4 | External systems |
| Branding & White-label | 6 | Login page, Mobile app |
| Activity Coordinator | 4 | Milestones, Events |
| Nutritionist | 5 | Student allergies, Kitchen |
| Support Module (Shared) | 152 FAQs | All 17 dashboards |
| Task Tracker (Shared) | 6 | All dashboards |
| Auth System | 21 FAQs | Standalone |

---

**Total Modules/Sections: 55+**
**Total Fields: 600+**
**Total Dashboards: 18**
**Total System Roles: 15**
**Total Permission Entries: 90+ (12 modules × 7-9 each)**

---

*Generated: 26 February 2026 | Source: Saaras Blueprint Codebase (saaras-blueprint.vercel.app)*
