# EduNext vs Saaras Blueprint — Student Dashboard Gap Analysis

**Date:** 2026-03-08
**Source:** EduNext PDF "students dashboard edunext.pdf" (8 pages) + Saaras Blueprint student dashboard (`src/app/student/page.tsx`, ~3090 lines)

---

## Summary

| Status   | Count | Description                        |
|----------|-------|------------------------------------|
| BUILT    | 7     | Feature fully present or exceeds   |
| PARTIAL  | 3     | Exists but incomplete vs EduNext   |
| MISSING  | 5     | Not built at all                   |

**Overall verdict:** Saaras Blueprint's student dashboard is significantly richer than EduNext in most areas. EduNext has a few niche modules (Infirmary, Transport tracking, Gallery, E-NACH, Syllabus access) that we lack, but our dashboard has many features EduNext does not offer at all (Study Planner, Wellness, Gamification, Portfolio, Electives, My Exams with online test-taking).

---

## Feature-by-Feature Comparison

### 1. Student Profile Overview
**EduNext:** Name, class, section, admission number, DOB, contact info, academic status (Active badge), mobile number.
**Saaras:** Name, class, section, roll no, board, admission no, house, DOB, blood group, father/mother name, contact. Profile header on dashboard + dedicated StakeholderProfile page with theme customization.

| Rating | Priority | Notes |
|--------|----------|-------|
| **BUILT** | -- | We exceed EduNext. We have more fields (house, blood group, parent names, board). StakeholderProfile is a full dedicated page. |

---

### 2. Academic Results & Performance
**EduNext tabs:** Quiz Result, Progress Report, Subjects Mark, Result Analysis, Self Awareness (5 sub-tabs).
**Saaras tabs/features:**
- Exam selector (Unit Test 1/2/3, Half Yearly, Annual)
- Subject-wise marks table with max/obtained/percentage/grade
- Summary stats (total marks, percentage, class rank, grade)
- Subject-wise performance bar chart
- Download Report Card button

| Rating | Priority | Notes |
|--------|----------|-------|
| **PARTIAL** | P1 | We have solid exam results with marks table, bar charts, rank, and download. **Missing vs EduNext:** (a) Quiz Result as separate tab — we cover quizzes under MyExams module instead, (b) "Self Awareness" insights tab — we have this concept in Portfolio (NEP skill assessment) but not in Results, (c) "Result Analysis" — comparative analysis across exams (trend lines) not explicitly shown, (d) "Progress Report" as a separate printable view. **Recommendation:** Add a "Trend Analysis" view showing performance across all exams for each subject. Self-awareness can stay in Portfolio. |

---

### 3. Attendance Monitoring
**EduNext:** Monthly bar chart (Apr-Feb), Annual donut chart (Present/Absent/Leave %), visual graphs, pattern identification.
**Saaras:**
- Overall stats (total present, absent, late, percentage)
- Calendar view (color-coded daily attendance for current month)
- Monthly breakdown table (11 months with present/absent/late/holidays/percentage)
- Mobile app preview with donut chart + month-wise bar summary
- Legend with Present/Absent/Late/Holiday/Upcoming

| Rating | Priority | Notes |
|--------|----------|-------|
| **BUILT** | -- | We exceed EduNext. We have calendar view (EduNext does not), monthly breakdown table, mobile preview, AND the same charts EduNext has. EduNext only shows bar chart + donut; we have both plus daily calendar granularity. |

---

### 4. Homework & Assignments
**EduNext:** Subject-wise listing, created/due dates, status (Pending), teacher remarks, attachments (with download), calendar sidebar, detail view with description + attachments.
**Saaras:**
- Subject + status filters
- Full homework list with subject, title, assigned by, assigned/due dates, status
- Status badges (Pending/Submitted/Graded) with counts
- Submit button for pending, View Feedback for graded, marks display
- Mobile app preview with Submit + Photo capture buttons

| Rating | Priority | Notes |
|--------|----------|-------|
| **PARTIAL** | P1 | Core feature is strong. **Missing vs EduNext:** (a) File attachments — EduNext shows downloadable attachments on homework; we have Submit/Photo buttons but no attachment viewing/download, (b) Teacher remarks text — we show marks but not written teacher feedback/remarks, (c) Detailed description view — EduNext has an expanded detail panel with full description. **Recommendation:** Add attachment list + teacher remarks text field to homework cards. |

---

### 5. Time Table Access
**EduNext:** Weekly grid (Mon-Sat), period-wise with subject, teacher name (with initials), period timing, color-coded subject cards, Download button.
**Saaras:**
- Full weekly timetable grid (Mon-Sat, 8 periods)
- Color-coded subject pills with legend
- Today's schedule on dashboard (period, time, subject, teacher, room)
- Break schedule (Short Break, Lunch, Dismissal)
- Mobile app preview with day selector + period list + current period highlight

| Rating | Priority | Notes |
|--------|----------|-------|
| **BUILT** | -- | We exceed EduNext. We have room assignments (EduNext does not), break schedule, mobile preview with "NOW" indicator, subject color legend, and today's schedule on dashboard home. EduNext has a Download button we lack, but that is minor. |

---

### 6. Fees & Payment Tracking
**EduNext tabs:** Fee Details, Fee Statement, Imprest/Wallet, Fee Challan, E-NACH Information. Shows: Total Fee, Paid Fees (donut), Due Fee, Late Fee, Advance Fee.
**Saaras tabs:** Overview, Fee Structure, Payment History. Shows:
- Current dues with amount, due month, due date
- Total paid, last payment stats
- Pay Online + Fee Challan download buttons
- Fee structure table (head, amount, frequency) with monthly/annual totals
- Payment history table (receipt no, date, amount, mode, month, status, download receipt)

| Rating | Priority | Notes |
|--------|----------|-------|
| **PARTIAL** | P1 | Core fees are well-built. **Missing vs EduNext:** (a) Fee Statement — formal statement/ledger view (separate from payment history), (b) Imprest/Wallet — prepaid wallet balance concept, (c) E-NACH Information — auto-debit mandate details, (d) Visual donut chart showing paid vs due vs late vs advance breakdown, (e) Advance fee tracking, (f) Late fee calculation display. **Recommendation:** Add Fee Statement tab and Late Fee/Advance Fee display. E-NACH and Wallet are P2 (not all schools use them). |

---

### 7. Communication & Circulars
**EduNext tabs:** Circular/News, Mail Box, SMS History, Feedback, Discussion Board, Achievement, PTM, Remarks, Other Reports (9 sub-tabs!). Shows circulars with date, description, attachments.
**Saaras:**
- Notices module with category filter (Event/Exam/Meeting/Academic/General/Sports)
- Expandable notice cards with full content
- NEW badge for recent notices
- Communication module with Chat (via shared ChatModule) + Notices tabs

| Rating | Priority | Notes |
|--------|----------|-------|
| **PARTIAL** (for sub-features) | P1 | Our notices/circulars are solid. Chat is better than EduNext (they have no real-time chat). **Missing vs EduNext:** (a) Mail Box — inbox/outbox messaging, (b) SMS History — log of all SMS sent to parent, (c) Feedback — formal feedback submission form, (d) Discussion Board — forum-style discussions, (e) PTM — dedicated PTM schedule/booking, (f) Remarks — teacher remarks on student behavior/performance, (g) Other Reports. **However:** Our ChatModule provides real-time messaging that EduNext completely lacks. Our Communication module partially covers Mail Box via Chat. **Recommendation:** Add PTM schedule view (P1), Teacher Remarks section (P1). Discussion Board, SMS History, and Feedback are P2. |

---

### 8. Digital Learning Integration
**EduNext tabs:** E-Connect, E-Learning, Quiz, Quiz Result, Discussion, Syllabus, E-Resource, Question Bank (8 sub-tabs). Supports blended education.
**Saaras:**
- MyExams module with online test-taking (MCQ with timer, question navigation, review)
- Study Planner (AI-powered weekly plan)
- Library module (book catalog, issued books)
- No dedicated e-learning, syllabus, or question bank module

| Rating | Priority | Notes |
|--------|----------|-------|
| **MISSING** (as dedicated module) | P1 | We have excellent exam/quiz functionality in MyExams (EduNext's Quiz Result is just results — we have full test-taking UI). But we lack: (a) Syllabus access — structured syllabus per subject/chapter, (b) E-Learning resources — video/content library, (c) Question Bank — practice questions by chapter/topic, (d) E-Resource — downloadable study materials, (e) E-Connect — virtual classroom integration. **Recommendation:** Add Syllabus module (P0 — simple, high value). E-Learning/Question Bank are P1 for Phase 1. E-Connect is Phase 2. |

---

### 9. Calendar & Events
**EduNext:** Full monthly calendar with event markers, events sidebar listing (National Science Day, Scouts Day, etc.), event badges.
**Saaras:**
- Dashboard widget "Events Calendar" (configurable)
- Notices module covers event announcements
- No dedicated calendar module with visual monthly view

| Rating | Priority | Notes |
|--------|----------|-------|
| **MISSING** (as dedicated view) | P1 | We show events as notices but lack a visual calendar view. EduNext has a proper monthly calendar with event dots + sidebar event list. **Recommendation:** Add a Calendar module to the student sidebar — reuse the attendance calendar component pattern, overlay event data. This is high-value, low-effort. |

---

### 10. Achievements & Co-curricular Records
**EduNext:** Simple table with Sr.No, Date, Activity, Level, Description, Position (medal icon). Basic.
**Saaras:**
- Achievement list with Gold/Silver/Bronze medals, levels (School/District/State)
- Summary stats (Gold/Silver/Bronze counts)
- NCC/Scouts/NSS Activity Log with date, activity, program, hours, instructor, status
- Total hours by program
- Full Gamification system (XP, levels, badges, streaks, class leaderboard, recent activity)

| Rating | Priority | Notes |
|--------|----------|-------|
| **BUILT** | -- | We massively exceed EduNext. Their achievements is a basic table. Ours has medals, activity logs, gamification with XP/levels/badges/streaks/leaderboard — an entire engagement system. No gaps here. |

---

### 11. School Gallery
**EduNext:** Month-wise photo gallery (Apr-Mar tabs), year selector. Shows event/activity/celebration photos.
**Saaras:** No gallery module.

| Rating | Priority | Notes |
|--------|----------|-------|
| **MISSING** | P2 | Nice-to-have for engagement. Photos from events, annual day, sports day. Low priority for student dashboard — more relevant for parent dashboard or school website. **Recommendation:** Phase 2. Can be added as a simple grid with month tabs. |

---

## Additional EduNext Features (discovered from screenshots, not in original list)

### 12. Infirmary / Health Records
**EduNext:** Table with medicine name, visit date, departure date, reason, checked by, prescription, documents. Tracks student health visits.
**Saaras:** No infirmary module. Wellness module covers mood/mental health but not physical health visits.

| Rating | Priority | Notes |
|--------|----------|-------|
| **MISSING** | P2 | Useful for school nurse/medical room tracking. Can be a simple log. **Recommendation:** Phase 2. Could be a sub-tab under Wellness. |

---

### 13. Transport Tracking
**EduNext:** Shows pick-up/drop-up location, bus route (AP-01), vehicle number, timing, live location tab.
**Saaras:** No transport module on student dashboard (exists on Transport Head dashboard).

| Rating | Priority | Notes |
|--------|----------|-------|
| **MISSING** | P1 | Parents/students need to see their bus route, pickup time, and live location. Transport Head dashboard has this data — need to expose a read-only student view. **Recommendation:** Add Transport sub-module showing assigned route, bus, driver, timing. Live tracking is Phase 2. |

---

### 14. Request Module
**EduNext:** Unified request hub with tabs: Apply Leave, Transport Request, Profile Update, Reserve Book Request, Certificate Requests, Consent Form, Student ID Card Verification, Apply Withdrawal.
**Saaras:** We have separate modules — Leave (full module), Documents/Certificates (full module), Library (book reservations). Not unified.

| Rating | Priority | Notes |
|--------|----------|-------|
| **BUILT** (distributed) | P2 | We cover all these requests but across separate modules (Leave, Documents, Library). EduNext's unified "Request" hub is a UX convenience, not a feature gap. Our approach (dedicated modules) is arguably better for discoverability. **No action needed** unless user prefers a unified request center. |

---

### 15. Food Menu
**EduNext:** Today's food menu with calendar view. Shows daily meal plan.
**Saaras:** No food menu module.

| Rating | Priority | Notes |
|--------|----------|-------|
| **MISSING** (minor) | P2 | Only relevant for schools with canteen/mess. Low priority. Phase 2 or configurable. |

---

## Features Saaras Has That EduNext Does NOT

These are areas where Saaras Blueprint exceeds EduNext:

| Saaras Feature | Description |
|---|---|
| **Study Planner (AI)** | AI-generated weekly study schedule with subject priorities, planned vs actual hours, task tracking |
| **Wellness & Mood Tracker** | Daily mood check-in, 30-day mood calendar, journal, sleep tracker, wellbeing tips, counselor access |
| **Gamification System** | XP, levels, badges, streaks, class leaderboard — full engagement loop |
| **Portfolio (NEP 2020)** | Project showcase, skill tags, self-reflection, NEP skill assessment |
| **Electives Module** | Available electives with seats, prerequisites, enrollment |
| **My Exams (Online)** | Full online test-taking with MCQ, timer, question navigation, auto-grading |
| **Mobile App Preview** | Every module has a mobile frame preview showing how it looks on phone |
| **Widget Customization** | Students can show/hide dashboard widgets |
| **Leave Management** | Full leave application with balance tracking (EduNext has it under Request but simpler) |
| **Library Catalog** | Browse + search library catalog (EduNext only shows issued books) |
| **Support Module** | Dedicated support/helpdesk module |
| **Real-time Chat** | ChatModule with messaging (EduNext has no chat) |
| **Dashboard Quick Actions** | Submit Homework, View Results, Pay Fees, Library Catalog — one-click actions |

---

## Priority Summary — Action Items

### P0 (Must Have — High value, relatively easy)
| # | Gap | Effort | Notes |
|---|-----|--------|-------|
| 1 | **Syllabus Access** | Low | Simple per-subject chapter list with topics, weightage. New module or sub-tab under Library. |

### P1 (Should Have — Important for parity)
| # | Gap | Effort | Notes |
|---|-----|--------|-------|
| 2 | **Homework attachments + teacher remarks** | Low | Add attachment list + remarks text to existing HomeworkModule |
| 3 | **Result trend analysis** | Medium | Cross-exam comparison charts for each subject |
| 4 | **Calendar & Events module** | Medium | Reuse attendance calendar pattern + event data overlay |
| 5 | **Fee Statement + Late/Advance fee display** | Low | Add Fee Statement tab, show late fee rules |
| 6 | **PTM Schedule** | Low | Add PTM section to Communication or Notices |
| 7 | **Teacher Remarks** | Low | Behavioral/performance remarks from teachers |
| 8 | **Transport view (read-only)** | Medium | Student's assigned bus route, timing, driver info |

### P2 (Nice to Have — Phase 2)
| # | Gap | Effort | Notes |
|---|-----|--------|-------|
| 9 | **School Gallery** | Medium | Month-wise photo gallery |
| 10 | **Infirmary/Health Records** | Low | Sub-tab under Wellness |
| 11 | **E-Learning / Question Bank** | High | Video content + practice question library |
| 12 | **Food Menu** | Low | Daily menu display |
| 13 | **E-NACH / Wallet** | Medium | Auto-debit + prepaid wallet for fees |
| 14 | **Discussion Board** | Medium | Forum-style discussions per subject |

---

## Reusable Components from Other Dashboards

| Gap | Existing Source | Reuse Strategy |
|-----|----------------|----------------|
| Transport view | Transport Head dashboard (`/transport-head`) | Extract route/bus assignment data, create read-only student widget |
| Calendar & Events | Attendance calendar in student dashboard | Same grid pattern, different data source (events instead of attendance) |
| PTM Schedule | Parent dashboard likely has PTM | Share PTM data component |
| Teacher Remarks | Teacher dashboard has remark entry | Student sees read-only view of remarks written on Teacher dashboard |
| Gallery | Could reuse across Student + Parent dashboards | Shared component |

---

## Conclusion

Saaras Blueprint's student dashboard is **substantially more feature-rich** than EduNext in 10 out of 15 areas. EduNext's main advantages are its Communication sub-tabs (PTM, Remarks, Discussion Board, SMS History) and a few niche modules (Infirmary, Transport, Gallery, Food Menu, E-NACH).

The 8 P1 gaps are all low-to-medium effort and would bring full feature parity. The P0 item (Syllabus) is a quick win. The P2 items can be deferred to Phase 2 without impacting the core student experience.
