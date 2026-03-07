# SSA Configuration vs Stakeholder Dashboard — Gap Analysis Report

**Date**: 2026-03-08
**Scope**: 13 SSA configuration modules cross-referenced against all relevant stakeholder dashboards

---

## Summary by Severity

| Severity | Count | Key Issues |
|----------|-------|------------|
| **HIGH** | 7 | Fee head label mismatch, concession types wrong, GPS/safety config absent, visitor per-type rules flat, exam type mismatch, pipeline stages collapsed, biometric absent from HR |
| **MEDIUM** | 14 | Fee head count text, payment modes count, overtime rules absent, defaulter thresholds absent, grading system not mapped, exam weights not applied, message templates stub, timing sets not differentiated, follow-up auto-rules hidden, documents not shown, CCTV absent, employee attendance config partial, concession approval role-based, academic config not consumed |
| **LOW** | 10 | Receipt template choice, late fee hardcoded text, DM permissions, auto-created groups, bulk limits, substitution, submission mode, department naming, appraisal stages, hardware inventory |
| **NONE (aligned)** | 5 | Salary components, leave types, leave rules, approval chain, peer review/diary |

**Total gaps: 36 (7 HIGH, 14 MEDIUM, 10 LOW, 5 aligned)**

---

## Structural Finding: mock-data.ts as a Broken Bridge

`src/lib/mock-data.ts` was intended as intermediary between SSA config and dashboards. However:
- Fee head labels differ from SSA's
- Payment modes count differs (7 vs 8)
- Several dashboards import from mock-data but also have text annotations claiming SSA config values that don't match
- Some dashboards bypass mock-data entirely with their own hardcoded data

**Recommendation**: Align mock-data.ts with SSA config as single source, then update dashboards to consume consistently.

---

## 1. FeeConfigModule (8 gaps)

### 1.1 Fee Head Label Mismatch — HIGH
- **SSA**: 12 fee heads (Tuition, Admission, Annual Charges, Transport, Activity, Lab, Library, Exam, Development Fund, Smart Class/IT, Uniform/Books, Hostel)
- **mock-data.ts**: 12 fee heads with DIFFERENT names (includes Sports Fee, Technology Fee, Caution Deposit but NOT Smart Class/IT, Uniform/Books, Hostel)
- **Fix**: src/lib/mock-data.ts

### 1.2 Active Fee Head Count Mismatch — MEDIUM
- **SSA**: 8 active (4 disabled)
- **accounts-head**: says "7 active fee heads"
- **school-admin**: says "12 fee heads"
- **Fix**: accounts-head/page.tsx, school-admin/_modules/FeesModule.tsx

### 1.3 Payment Modes Count — MEDIUM
- **SSA**: 8 modes (includes Paytm/PhonePe)
- **mock-data.ts**: 7 modes (no Paytm/PhonePe)
- **Fix**: src/lib/mock-data.ts

### 1.4 Concession Types Wrong — HIGH
- **SSA**: 7 types (Sibling 10%, Merit 25%, Staff 100%, EWS 50%, Sports 15%, SC/ST 25K, Single Parent 20%)
- **accounts-head**: 5 types only, EWS shows 100% (should be 50%), Single Parent shows Rs.5000 (should be 20%)
- **Fix**: accounts-head/page.tsx

### 1.5 Concession Text Annotation Wrong — HIGH
- **accounts-head text**: "EWS 100%, Single Parent Rs.5000" — doesn't match SSA (EWS 50%, Single Parent 20%)
- **Fix**: accounts-head/page.tsx

### 1.6 Fee Receipt Template Not Reflected — LOW
- **SSA**: 3 receipt templates with live preview
- **accounts-head**: Receipt generation but no template selection
- **Fix**: accounts-head/page.tsx

### 1.7 Late Fee Hardcoded — LOW
- **SSA**: Configurable late fee amount/grace/max
- **student + parent**: Hardcoded text "Rs.50/day after 7-day grace"
- **Fix**: student/page.tsx, parent/_modules/FeesModule.tsx

### 1.8 Concession Approval Role-Based — MEDIUM
- **SSA**: Person-based approval chain (per Piush's remark)
- **accounts-head**: Shows role labels not person names
- **Fix**: accounts-head/page.tsx

---

## 2. AcademicConfigModule (1 gap)

### 2.1 Academic Config Not Consumed — MEDIUM
- **SSA**: Grades, sections, subjects, departments, terms
- **school-admin ConfigModule**: Only label text, no actual SSA data
- **Fix**: school-admin/_modules/ConfigModule.tsx

---

## 3. HRConfigModule (4 gaps)

### 3.1 Salary Components — NONE (aligned)

### 3.2 Department/Designation — LOW (minor naming)

### 3.3 Overtime Rules Not Reflected — MEDIUM
- **SSA**: Full overtime rule builder with presets
- **HR Manager**: No overtime tracking UI
- **Fix**: hr-manager/page.tsx

### 3.4 Appraisal Stages Not Visible — LOW

### 3.5 LOP Calculation Text-Only — LOW

---

## 4. TransportConfigModule (4 gaps)

### 4.1 GPS/Safety Config Absent — HIGH
- **SSA**: Speed alerts, geofence, SOS/panic
- **Transport Head GPS**: Live tracking but NO SSA threshold references
- **Fix**: transport-head/_modules/GPSTrackingModule.tsx

### 4.2 Route/Stop Data Independent — MEDIUM

### 4.3 Transport Fee Not Linked — MEDIUM

### 4.4 Parent Transport Config — NONE (aligned)

---

## 5. AttendanceConfigModule (5 gaps)

### 5.1 Attendance Types — NONE (aligned)

### 5.2 Defaulter Thresholds Not Reflected — MEDIUM
- **SSA**: 3-tier thresholds with uniform/dept/grade granularity
- **Teacher/Principal**: No threshold references
- **Fix**: principal/_modules/AcademicsModule.tsx, teacher/_modules/AttendanceModule.tsx

### 5.3 Auto-Notification Rules Text-Only — LOW

### 5.4 Correction Policy Partial — LOW

### 5.5 Employee Attendance Config Partial — MEDIUM
- **SSA**: In/out times, LOP auto-flag, comp-off rules
- **HR Manager**: Only marking methods shown
- **Fix**: hr-manager/page.tsx

---

## 6. ExamConfigModule (4 gaps)

### 6.1 Exam Types Mismatch — HIGH
- **SSA**: 6 exams (UT1-4, Half Yearly, Annual) with weights
- **Teacher gradebook**: 5 exams (missing UT4)
- **Principal academics**: Completely different names (Mid-Term, Pre-Final, Final)
- **Fix**: teacher/_modules/GradebookModule.tsx, principal/_modules/AcademicsModule.tsx

### 6.2 Grading System Not in Gradebook — MEDIUM
- **SSA**: CBSE 8-grade scale (A1-E)
- **Teacher gradebook**: Raw marks only, no grade mapping
- **Fix**: teacher/_modules/GradebookModule.tsx

### 6.3 Exam Weights Not Applied — MEDIUM

### 6.4 Report Card/Admit Card Generation Absent — MEDIUM
- SSA configures templates but no dashboard has "generate" feature

---

## 7. CommunicationConfigModule (4 gaps)

### 7.1 DM Permissions — LOW
### 7.2 Auto-Created Groups — LOW
### 7.3 Message Templates Stub — MEDIUM
- **SSA**: 8 templates
- **school-admin CommunicateModule**: "Templates" tab is a stub
- **Fix**: school-admin/_modules/CommunicateModule.tsx

### 7.4 Bulk Limits — LOW

---

## 8. TimetableConfigModule (2 gaps)

### 8.1 Timing Sets Not Differentiated — MEDIUM
- **SSA**: 3 timing sets (Primary/Secondary/Sr.Sec)
- **Dashboards**: Single timetable grid
- **Fix**: teacher/_modules/TimetableModule.tsx, student/page.tsx

### 8.2 Substitution Management — LOW

---

## 9. LeaveConfigModule — NONE (fully aligned)

---

## 10. VisitorConfigModule (2 gaps)

### 10.1 Per-Type Rules Flat — HIGH
- **SSA**: 6 visitor types with per-type rules (escort, areas, hours)
- **Security**: One flat policy for all types
- **Fix**: security/page.tsx

### 10.2 Type-Specific Fields Missing — MEDIUM
- **Fix**: receptionist/page.tsx, security/page.tsx

---

## 11. EnquiryAdmissionConfigModule (5 gaps)

### 11.1 Pipeline Stages Collapsed — HIGH
- **SSA**: 8 stages with SLA
- **school-admin**: Only 4 status labels
- **Fix**: school-admin/_modules/EnquiriesModule.tsx

### 11.2 Follow-up Auto-Rules Hidden — MEDIUM
### 11.3 Document Requirements Not Shown — MEDIUM
### 11.4 Waitlist Partial — LOW
### 11.5 APAAR/RTE Lottery — LOW

---

## 12. HomeworkConfigModule (1 gap)

### 12.1 Submission Mode/Grace Period — LOW
### 12.2 Peer Review — NONE
### 12.3 Parent Diary — NONE

---

## 13. BiometricHardwareConfigModule (3 gaps)

### 13.1 Biometric Device Management Absent from HR — HIGH
- **SSA**: 4 device types, 6 registered devices, DPDP compliance
- **HR Manager**: Zero biometric device references
- **Fix**: hr-manager/page.tsx

### 13.2 CCTV Config Not Reflected — MEDIUM
- **SSA**: 24 cameras, retention, motion detection
- **Security**: No CCTV references
- **Fix**: security/page.tsx

### 13.3 Smart Board/ID Printer — LOW
