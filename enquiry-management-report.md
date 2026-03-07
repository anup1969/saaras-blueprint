# Enquiry & Admission Management — Blueprint Report

**Project:** Saaras Blueprint
**Generated:** 7 March 2026
**Total Code:** ~2,400 lines across 7 files
**Feature Completeness:** ~85-90% (blueprint/UI level, awaiting backend)

---

## 1. Where It Lives — Dashboard Mapping

| Dashboard | What It Shows | File Path | Lines |
|-----------|--------------|-----------|-------|
| **School Super Admin** | Full configuration (6 tabs) | `src/app/school-super-admin/_modules/EnquiryAdmissionConfigModule.tsx` | 1,226 |
| **School Admin** | Operational management | `src/app/school-admin/_modules/EnquiriesModule.tsx` | 372 |
| **Principal** | Pipeline overview + drill-down | `src/app/principal/_modules/DashboardHomeNew.tsx` | 391-512 |
| **Receptionist** | Quick enquiry list + daily feed | `src/app/receptionist/page.tsx` | 47-54, 215 |

---

## 2. SSA Configuration Module — 6 Tabs

### Tab 1: Settings (Lines 350-497)

- **Admission Mode:** Online Only / Offline Only / Both
- **Application Fee:** Configurable (e.g., ₹500)
- **Feature Toggles:**
  - Auto-assign follow-ups to counselors
  - Online Application Form
  - Auto-generate Admission Number
  - Document Upload Required
  - Photo Mandatory at Admission
- **Provisional Admission:**
  - Allow admission while pending: documents, fee payment, test results
  - Configurable expiry (e.g., 30 days)
- **RTE 25% Quota:** Enable/disable lottery system
- **APAAR / ABC ID:** Student identity configuration
- **Auto-assign Section:** Round Robin or manual assignment
- **Sibling/Alumni Linking:**
  - Sibling discount (e.g., 10%)
  - Alumni priority in seat allocation

### Tab 2: Pipeline (Lines 498-635)

**8 Pipeline Stages (editable, drag-to-reorder):**

| Stage | SLA | Auto-assign | Actions |
|-------|-----|-------------|---------|
| New Enquiry | 24h | Yes | Call, Email, WhatsApp |
| Follow-up | 48h | Yes | Call, Email, WhatsApp |
| School Visit | 72h | No | Visit, Schedule |
| Entrance Test | 120h | No | Schedule, Email |
| Interview | 72h | No | Schedule |
| Offer Made | 168h | Yes | Email, WhatsApp |
| Accepted | — | No | — |
| Rejected | — | No | — |

**Follow-up Rules & Escalation:**
- Max follow-ups per enquiry: 5 (default)
- Cooldown between follow-ups: 24 hours (default)
- Automated triggers:
  - No response after 24h → Auto-assign callback
  - No response after 48h → Send reminder SMS
  - No response after 72h → Escalate to Head
  - Visit scheduled but no-show → Auto-reschedule + SMS
  - Test completed → Notify counselor for result review

**Interview/Interaction Panel:**
- Interview duration: 30 min (configurable)
- Slots per day: 4 (configurable)
- Panel members:
  - Principal (Chair, required)
  - Head of Department (Member, required)
  - School Counselor (Observer, optional)
- Enable/disable panel notes & scoring

### Tab 3: Intake (Lines 641-880)

**Admission Test Configuration:**
- Enable/disable entrance test
- 4 default subjects: English, Math, GK, Logical Reasoning
- Per-subject: max marks, passing marks, duration
- Test grade applicable (e.g., "Grade 2 and above")
- Schedule mode: Fixed Dates / Rolling

**Admission Eligibility Rules (per-grade):**

| Grade | Min Age | Max Age | Min Marks | Required Docs |
|-------|---------|---------|-----------|---------------|
| Nursery | 2.5 yrs | 4 yrs | — | Birth Certificate |
| Grade 1 | 5.5 yrs | 7 yrs | — | Birth Certificate, Aadhaar |
| Grade 2-5 | — | — | 40 marks | TC, Report Card |
| Grade 6-8 | — | — | 45 marks | TC, Report Card |
| Grade 9-10 | — | — | 50 marks | TC, Report Card, Board Marksheet |

**Document Requirements (10 configurable):**
- Birth Certificate, Aadhaar Card, Passport Photo
- Transfer Certificate, Previous Report Card, Character Certificate
- Medical Fitness, Caste Certificate, Income Certificate, Board Marksheet
- Each has: mandatory flag, format (PDF/Image/JPG/PNG), max file size, applicable grades

**Class Capacity & Waitlist:**
- Per-grade: sections, max per section, total capacity
- Current enrollment tracking
- Waitlist: enable/disable, auto-promote (Automatic/Manual), notification (Email/SMS/Both), max size (20)

### Tab 4: Sources (Lines 881-978)

**10 Lead Sources (with priority ranking):**
1. Walk-in
2. Phone Call
3. Website Form
4. Social Media (Facebook/Instagram)
5. Referral (Parent)
6. Referral (Staff)
7. Newspaper Ad
8. School Fair/Event
9. Google Ads
10. WhatsApp

**Website Integration:**
- Embed enquiry form on school website
- Direct link: `https://school.saaras.app/apply/demo-school`
- QR code generation

### Tab 5: Process (Lines 980-1155)

**7 Admission Steps:**
1. Online Application
2. Document Upload
3. Entrance Test (optional)
4. Interview (optional)
5. Offer & Acceptance
6. Fee Payment
7. Confirmation

**Custom Form Fields (10 fields):**
- Built-in: Student Name, Phone, Email, Class Applied For, Date of Birth
- Custom: Previous School, Sibling Studying Here, Father's Occupation, Mother's Occupation, Address
- Each field: type (Text/Number/Date/Dropdown), required toggle

**Communication Templates (9 templates):**

| Stage | Channel | Content |
|-------|---------|---------|
| New Enquiry | SMS | Welcome + next steps |
| New Enquiry | Email | Detailed admission info |
| Follow-up | SMS | Reminder to visit |
| School Visit | SMS | Confirmation + directions |
| Test Scheduled | SMS | Hall ticket + date |
| Offer Made | Email | Congratulations + fee details |
| Offer Made | WhatsApp | Quick acceptance link |
| Accepted | SMS | Admission number + fee payment |
| Rejected | Email | Regret message |

All templates support variables: `{{parent_name}}`, `{{student_name}}`, `{{grade}}`, `{{school_name}}`, etc.

### Tab 6: Reports (Lines 1156-end)

**8 Built-in Reports:**

| Report | Access |
|--------|--------|
| Enquiry Funnel Report | Principal + School Admin |
| Source-wise Conversion | Principal + School Admin |
| Grade-wise Demand | Principal |
| Counselor Performance | Principal |
| Follow-up Compliance | School Admin |
| Waitlist Analytics | Principal + School Admin |
| Time-to-Admission | Principal |
| Drop-off Analysis | Principal + School Admin |

---

## 3. School Admin — Operational Dashboard

### Dashboard Stats (4 cards)
- Total Enquiries: 45
- Pending Follow-up: 12
- Converted: 28
- Conversion Rate: 62%

### Enquiry Table Features
- **Tabs:** All Enquiries | New | Follow-up | Converted | Lost
- **Columns:** ID, Child Name, Class, Lead Score, Counselor, Source, Date, Status, Actions
- **Lead Scoring:**
  - Hot (85+) — red badge
  - Warm (60-84) — amber badge
  - Cold (<60) — blue badge
  - Based on: engagement, response time, form completeness
- **Counselor Assignment:** Dropdown per row with instant feedback
- **Quick Actions:** View Details, Convert to Admission, Reject, Delete, Archive

### Referral Tracking Detail Panel
- Referred By (name)
- Referral Type (Parent / Staff / Alumni / Advertisement)
- Referral Chain (ancestor → current)
- Reward Status (Pending / Paid / Expired)

### Fee Estimation Calculator
- Estimated annual fee breakdown:
  - Tuition Fee: ₹35,000
  - Activity Fee: ₹5,000
  - Transport (if opted): ₹18,000
  - Uniform: ₹3,500
  - **Gross Total: ₹61,500**
- Applicable Concessions:
  - EWS (if eligible): -₹35,000
  - Sibling (if applicable): -₹3,500
- **Net Estimated Fee: ₹23,000**
- Share with Parent (WhatsApp/Email)

### Available Scholarships
- Merit Scholarship: Top 10% in test → ₹5,000/year
- EWS Scholarship: Family income <₹3L → 100% waiver
- Sports Scholarship: State-level player → ₹10,000/year
- Eligibility auto-detection based on category

### Marketing ROI Report

| Channel | Spend | Enquiries | Conversions | Cost/Lead | ROI |
|---------|-------|-----------|-------------|-----------|-----|
| Google Ads | ₹15,000 | 18 | 8 | ₹833 | 267% |
| Facebook | ₹8,000 | 12 | 5 | ₹667 | 213% |
| Newspaper | ₹25,000 | 8 | 3 | ₹3,125 | 96% |
| Referral Program | ₹2,000 | 15 | 12 | ₹133 | 720% |
| Walk-in | ₹0 | 20 | 10 | ₹0 | — |

### New Enquiry Modal
- Fields: Student Name, DOB, Gender, Class Seeking, Parent Name, Phone, Email, Source, Notes

---

## 4. Principal Dashboard — Pipeline View

### Enquiry Pipeline Bar Chart (5 stages)

| Stage | Count | Details |
|-------|-------|---------|
| New | 5 | 3 walk-in, 2 online |
| Follow-up | 3 | Call today |
| Test | 2 | Feb 18 & 20 |
| Converted | 1 | Confirmed |
| Lost | 1 | Fee too high |

- Summary: "45 seats available across all grades"

### Drill-Down Panel (expandable)
- Admission Vacancies: KG: 8 | Class I: 5 | Class VI: 12 | Total: 45 seats
- Detailed enquiry table: Child, Class, Parent, Source, Stage, Date

### Pending Approvals (alongside, 6 items)
- Leave requests, fee concessions, transfer certificates, budget approvals

---

## 5. Receptionist Dashboard

- 6 mock enquiries with status tracking (New, Follow-up, Converted, Lost)
- Daily activity feed: "New enquiry: Mr. Vikram Mehta for Nursery admission (walk-in)"
- Linked calls: "Admission process enquiry" with scheduled visit notes
- Linked appointments: "Admission Discussion" with Principal/Counselor

---

## 6. Feature Checklist

### Pipeline & Workflow
- [x] Multi-stage pipeline (8 stages)
- [x] SLA management per stage (24h-168h)
- [x] Auto-assign follow-ups based on source
- [x] Automated escalation triggers (24h/48h/72h)
- [x] Drag-to-reorder stages

### Enquiry Intake
- [x] Online application form with custom fields
- [x] Document upload requirements (10+ types)
- [x] Grade-wise eligibility (age, marks, docs)
- [x] Entrance test configuration (4 subjects)
- [x] Interview panel setup with scoring

### Conversion & Admission
- [x] Enquiry-to-admission conversion workflow
- [x] Lead scoring (Hot/Warm/Cold)
- [x] Counselor assignment per enquiry
- [x] Offer generation and tracking
- [x] Fee estimation with concessions
- [x] Scholarship eligibility auto-detection

### Capacity Management
- [x] Class-wise capacity configuration
- [x] Waitlist management with auto-promotion
- [x] Seat availability tracking per grade

### Sources & Tracking
- [x] 10+ lead source tracking
- [x] Source priority ranking
- [x] Referral chain tracking
- [x] Referral reward status
- [x] Website embed + QR code

### Reporting
- [x] 8 built-in reports
- [x] Marketing ROI report
- [x] Role-based report access

### Communication
- [x] 9 communication templates (SMS/Email/WhatsApp)
- [x] Stage-based auto-triggers
- [x] Variable substitution

### Special Features
- [x] Provisional admission with expiry
- [x] RTE lottery support
- [x] APAAR/ABC ID configuration
- [x] Sibling detection & linking (discount)
- [x] Alumni priority in allocation
- [x] Auto-section assignment (Round Robin)

---

## 7. Known Gaps (Pending Backend)

| Gap | Status | Notes |
|-----|--------|-------|
| CSV export | Mock alert only | Needs backend endpoint |
| Lead scoring logic | UI only | Algorithm not implemented |
| Marketing ROI calculations | Hardcoded demo data | Needs real spend tracking |
| Referral chain detail | Basic mock UI | Needs recursive query |
| Test scheduling interface | Config only | No calendar/booking UI |
| Interview notes persistence | UI only | Needs storage |
| Dynamic fee calculation | Mock amounts | Needs fee engine integration |
| Scholarship computation | Mock eligibility | Needs rules engine |
