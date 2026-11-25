# Integrity Rising — Master Business Task List

Last updated: November 24, 2026

This is the central owner-facing task list for Integrity Rising. Keep completed accomplishments separate from open work. Update this file when work is started, tested, completed, or blocked. Do not mark a task complete based only on a code change: verify the relevant live behavior or automated check.

## Operating rules
- Use the Business Command Center as the internal home for tracking all Integrity Rising work.
- Keep each product's repository, database, user data, visual identity, and safety requirements separate.
- Status meanings: **Todo** = not started; **In Progress** = active; **Testing** = implementation exists but needs verification; **Done** = verified.
- Priority meanings: **P1** = launch/core reliability; **P2** = important product capability; **P3** = growth/automation; **P4** = later enhancement.
- Never put credentials in source files. Test Supabase Row Level Security (RLS) with separate accounts.
- Ask the owner before spending, paid activation, external communication, sharing files, security/permission changes, major data/schema changes, or significant publishing/deployment.
- Program Manager Bot may only auto-fix clearly low-risk issues; it must log and test repairs, and stop if uncertain.

## Priority dashboard

| Priority | Workstream | Current focus |
|---|---|---|
| P1 | Business Command Center | Verify core task workflows, document downloads/folders, and account isolation |
| P1 | Wellness & Growth App | Re-test authentication/profile flows and audit RLS before public use |
| P1 | Project Haven | Physical-device, privacy, threat-model, and survivor-safety review before launch |
| P2 | Business Command Center | Build Program Manager Bot and governance/approval controls |
| P2 | Business workspaces | Finish document/media and book-publishing organization |
| P3 | AI Management Team | Boss Bot reports, research queue, and approved email-draft workflow |
| P3 | Integrations & growth | Evaluate Google Drive/Gmail and subscription readiness |

## 1. Business Command Center
Repository: https://github.com/IntegrityRising101/business-command-center  
Live app: https://integrityrising101.github.io/business-command-center/

### P1 — Core verification (Testing)
- [ ] Verify the Tasks board displays task cards and that tasks remain saved after a page refresh. The owner supplied the current 12-card board contents on November 24; a fresh refresh-and-reopen persistence check is still needed.
- [ ] Test task creation, editing, due dates, and completion.
- [ ] Test custom Project and Assigned To values in the task form and confirm they persist and appear in task filters.
- [ ] Test completion celebrations and confirm dated achievements persist on the Wall of Accomplishments.
- [ ] Test a PDF download; verify it saves with a readable filename.
- [ ] Test folder creation, navigation, and uploads inside folders.
- [ ] Test PDF/image previews and supported audio/video playback, including mobile browsers.
- [ ] Test file access with a second account; confirm users cannot access another account's files.
- [ ] Verify authentication and RLS for tasks, documents, and other user records.

### P2 — Bot character experience (In Progress)
- [ ] Add the owner-provided original AI Bot Team poster to `public/images/integrity-rising-ai-bot-team.png` and verify it displays on desktop and mobile; the code now includes the exact asset location and a graceful fallback, but the binary artwork has not yet been committed.
- [ ] Test optional per-bot speech playback and stop controls in supported browsers; confirm silent operation unless the owner presses Speak.

### P2 — Cheer Bot personalization (Testing)
- [ ] Verify completed tasks generate a project-aware Cheer Bot message using the task title and project, and that the personalized message appears in the Daily Log and Wall of Wins after refresh.

### P2 — Task assignment and organization (Testing)
- [x] Apply the task-assignment database migration in Supabase; verified both `assigned_to` and `approval_required` columns.
- [x] Create a task assigned to Program Manager Bot with owner approval required.
- [x] Confirm the task appears on the Task Board and remains after a browser refresh.
- [x] Mark the test task completed.
- [ ] Verify Bot Team assigned, unassigned, and approval-flagged summary counts against the saved task data.
- [x] Confirm the approval flag is a tracking indicator only and does not grant bot execution authority.

### P2 — Program Manager Bot (Todo)
- [ ] Design its software-management dashboard and task queue.
- [ ] Connect feature requests, bug reports, assignments, test results, and GitHub deployment status.
- [ ] Implement low-risk auto-repair rules, with repair log and automated tests.
- [ ] Implement approval gates for major code, database/Supabase, authentication, security, permissions, spending, external communications, and significant deployments.
- [ ] Implement stop-and-alert behavior for uncertain or failed repairs.

### P2 — Business workspaces (Todo)
- [ ] Complete the Document & Media Center: secure organization, tags/search, metadata, preview/download, and version history.
- [ ] Verify mobile folder navigation and supported media playback.
- [ ] Build Books & Publishing management for *Legacy Within* and *The Architecture Is Yours*, using verified Lulu specifications.

### P3 — AI Management Team and integrations (Todo)
- [ ] Complete Boss Bot coordination, bot assignments, statuses, deadlines, and blocker reporting.
- [ ] Add daily/weekly progress and recognition reports.
- [ ] Add source-backed prospect research with a review queue.
- [ ] Add optional 14-day competitor/business-gap review with visible provider costs and usage limits.
- [ ] Add Gmail outreach drafts; sending must require explicit owner approval.
- [ ] Evaluate Google Drive/Docs/Sheets/Slides integration and implement supported workflows with sharing approval.
- [ ] Complete Gmail OAuth securely; do not store passwords or tokens in source code or browser local storage.

### P3 — Commercial launch readiness (Todo)
- [ ] Define final plan limits, monthly/annual pricing, trial policy, nonprofit eligibility, cancellation/refunds, taxes, invoices, and support.
- [ ] Configure and test secure production billing before collecting payment details.
- [ ] Test a separate public-user account and verify tenant/data isolation.
- [ ] Complete privacy, security, persistence, and core-workflow checks before public launch.

## 2. Integrity Rising — The Wellness & Growth App
Repository: https://github.com/IntegrityRising101/Integrity-Rising-wellness-growth-app  
Live app: https://integrityrising101.github.io/Integrity-Rising-wellness-growth-app/

### P1 — Authentication and data protection (Testing)
- [ ] Re-test sign-up, sign-in, sign-out, and password recovery.
- [ ] Test profile creation and updates.
- [ ] Audit RLS on every table and verify access with separate accounts before inviting the public.

### P2 — Product experience (Todo)
- [ ] Keep Quick Exit limited to Safety / domestic-abuse support pages.
- [ ] Refine home-screen and community navigation.
- [ ] Continue testing Wellness & AI, Community, Academy, and Safety & Support resources.
- [ ] Confirm independent AI-service links open separately and do not imply connected private accounts.

## 3. Project Haven / LunaSync — Domestic Violence Support App
Repository: https://github.com/IntegrityRising101/Project-Haven-DV-Support-Hidden-Secret-App

### P1 — Safety and privacy gate (Todo / must pass before launch)
- [ ] Verify the active Support tab, official resource links, accessibility, and small-screen layout on physical devices.
- [ ] Threat-model discreet access, app name/icon, notifications, browser history, shared devices, and Quick Exit limitations.
- [ ] Clearly explain that Quick Exit cannot erase device, network, or browser history.
- [ ] Audit local storage, logs, analytics, crash reports, backups, and network traffic for sensitive-data exposure.
- [ ] Verify authentication and access controls for the selected platforms.
- [ ] Protect private journal/incident records with appropriate encryption in transit and at rest, strict access controls, and a documented retention/deletion approach.
- [ ] Test accessibility, mobile layouts, offline behavior, and supported device targets.
- [ ] Complete a survivor-centered safety/privacy review before public launch.

**Safety rule:** Do not describe Project Haven as secure, anonymous, confidential, or ready for high-risk survivor use until the relevant controls and real-device tests have been completed. Do not use real survivor incident data for development testing.

## 4. Shared company operations (P2/P3 — Todo)
- [ ] Implement the Company Rules & Instructions Center with editable templates and rules written from scratch.
- [ ] Implement one Master Company Rulebook per business plus optional department rulebooks.
- [ ] Implement the Bot Permission & Approval Center: owner-controlled bot selection, data access, independent task scope, approvals, and reporting.
- [ ] Ensure conflicting instructions stop and are escalated rather than silently resolved.
- [ ] Maintain auditable records of bot actions, approvals, and applicable rule versions.
- [ ] Enforce separate customer tenants with database/server-side authorization and storage isolation.

Specification: [Business Rules, Department Rulebooks & Bot Permissions](BUSINESS_RULES_AND_BOT_PERMISSIONS_SPEC.md).

## Completed accomplishments

### November 23, 2026 — Business Command Center
- [x] Fixed the black-screen startup crash by removing a premature reference to the authenticated-user alias in `src/App.jsx`.
- [x] Repaired PR #9; build checks passed and the owner approved the merge.
- [x] Confirmed GitHub Pages deployment succeeded and the owner opened the live app and confirmed it works.
- [x] Recorded the completion in the central project progress log.
- [x] Kept missing manifest request/performance optimization as follow-up cleanup, not a blocker.

### November 23, 2026 — Business Command Center task board
- [x] Fixed task-board status normalization and backlog seeding in `src/App.jsx` (commit `88cd8a9da18401746a8f69a1df137755ff91318d`).
- [x] Confirmed the deployment workflow completed successfully (run `45333500739`).
- [x] Owner supplied the current Tasks board contents on November 24, showing 12 cards across Planned, In Progress, and Done.
- [ ] Re-test persistence after refresh directly; the supplied task list alone does not verify refresh persistence.
- [ ] Continue testing task creation, editing, due dates, completion, and related persistence separately.

### Previously completed or owner-confirmed
- [x] Business Command Center dashboard foundation, task workflow, priorities, search, and Focus Today.
- [x] Supabase connection and sign-in tested.
- [x] Task due dates and overdue/upcoming indicators; owner tested a saved due date.
- [x] Private document bucket and owner-folder policies configured; owner confirmed uploads work.
- [x] Initial Bot Team dashboard and accomplishment/celebration UI added; live end-to-end behavior still requires testing.
- [x] Wellness & Growth App Four Practices for Your Well-Being added and confirmed working.
- [x] Project Haven emergency-support content updated with official U.S. resource links and survivor-choice language; configured CI/security/secret-scan checks passed for the recorded commit. Physical-device and safety reviews remain open.

## Related records
- [Project progress and detailed work history](PROJECT_PROGRESS.md)
- [Business rules and bot permissions specification](BUSINESS_RULES_AND_BOT_PERMISSIONS_SPEC.md)



## Current Task Board Snapshot — November 24, 2026

Owner-provided snapshot of the Business Command Center Tasks board. This records the visible task names and statuses; it does not independently verify refresh persistence or task-editing behavior.

### Planned (8)
- [ ] **High** — Review Wellness App safety and support experience (Wellness App)
- [ ] **Medium** — Refresh Integrity Rising website pages and navigation (Website)
- [ ] **Medium** — Organize Gumroad, Stan Store, Google Site, and Fourthwall links (Website)
- [ ] **Medium** — Build Academy course catalog (Academy)
- [ ] **Medium** — Refresh website pages and navigation (Website)
- [ ] **Medium** — Plan weekly social content (Marketing)
- [ ] **Low** — Review merch designs and storefronts (Merch)
- [ ] **High** — Organize Legacy Within publishing files (Books)

### In Progress (2)
- [ ] **High** — Complete Wellness and Growth App launch checklist (Wellness App)
- [ ] **High** — Finish Wellness & Growth App launch list (Wellness App); due December 1, 2026

### Done (2)
- [x] **High** — Fix black-screen startup crash, merge PR #9 and verify live deployment (Operations); due November 23, 2026
- [x] **Medium** — Due Date Column (Operations); due January 22, 2026

### Cleanup candidates — review before changing
- The two website refresh/navigation cards may overlap.
- The two Wellness App launch cards may overlap.
- Do not delete, merge, or change statuses until the owner confirms which cards should remain.

## Website Analytics Baseline — November 24, 2026

**Reporting period:** November 17–23, 2026  
**Comparison period:** November 10–16, 2026  
**Source:** Owner-provided Google Analytics screenshot (page-title views report)

- **Total views:** 3 (down 4 / 57.14% from the previous period; previous period was 7 views)
- **Integrity Rising homepage:** 2 views
- **All Products page:** 1 view
- **Winter T-Shirt:** 0 views
- **Your Story Matters T-Shirt:** 0 views
- **Integrity Within:** 0 views

This is a low-traffic baseline; percentages can swing sharply with a small number of visits. The report shows views only and does not establish visitors, conversions, sales, or why traffic changed.


### Website traffic-growth tasks (P3 — Todo)
- [ ] Improve homepage messaging and make Shop, Academy, Community, and Wellness paths easier to find.
- [ ] Create weekly content/posts with a direct link to a specific product, page, or course.
- [ ] Review product-page photos, descriptions, and calls to action for clarity.
- [ ] Check storefront links across Gumroad, Stan Store, Google Site, and Fourthwall.
- [ ] Record weekly analytics snapshots and compare trends; avoid drawing conclusions from very small samples.
- [ ] Track engagement and conversions when available (not just views).


## November 24, 2026 — Boss Bot Daily Briefing panel
- [x] Build, merge PR #12, deploy, and verify the Boss Bot Daily Briefing panel in the live Business Command Center.
- [x] Owner confirmed the live panel displays Open Tasks, Overdue Tasks, Owner Approvals, Unassigned Tasks, and Top 3 Priorities.
- [x] Owner confirmed Approval Watch is visible.
- [x] Owner confirmed Bot Assignments is visible.
- [ ] Continue deeper data-accuracy checks against saved task records and test responsive layout on mobile.
- The panel summarizes saved tasks, overdue/upcoming due dates, owner-approval flags, bot assignments, and recent accomplishment logs. It is a live dashboard summary, not an autonomous agent executor. Scheduled Boss Bot reporting remains a separate automation.


### November 24, 2026 — Boss Briefing live test follow-up
- [x] Owner confirmed Recent Activity / Recent Wins is visible and displays the completed entry “Test Bot Assignment” with Cheer Bot’s “You did it!” celebration.
- [ ] Improve Recent Wins so each accomplishment is clickable and opens its related task or activity details. Current live entries are display-only; no click action is available yet.

### November 24, 2026 — Cheer Bot on-screen completion celebration
- [x] Implemented and merged PR #13; build checks passed and the GitHub Pages deployment completed.
- [x] Owner tested the live app by creating “Test Cheer Bot Celebration,” marking it Done, and confirming Cheer Bot appeared with its celebration.
- [x] Verified the core completion-celebration flow in the live app. Separate desktop/mobile layout checks remain a follow-up.



### November 24, 2026 — Custom task options improvement
- [ ] Add suggestions with free-text entry for Project and Assigned To, so owners can use existing values or enter a new project, person, team, or bot.
- [ ] Keep Status and Priority as standard workflow choices so dashboard counts, filters, and task automation remain consistent.
- [ ] Verify custom values save, persist after refresh, and appear in task-board project filters.


### November 24, 2026 — Testable bot workspaces (implementation in review)
- [ ] Build nine interactive bot workspaces: Boss Bot, Tasky, Deadline Bot, Doc Bot, Scout, Brainy, Maily, Cheer Bot, and Program Manager Bot.
- [ ] Each workspace runs a rule-based test against saved task/activity data and can save a test report to Daily Log.
- [ ] Maily can create and edit an email draft and copy it; no sending capability is enabled.
- [ ] Scout prepares a research checklist only; live source research is not yet connected.
- [ ] Doc Bot recommends a folder structure only; it does not move, share, rename, or delete files.
- [ ] Program Manager Bot reports software-task risks only; it does not edit code, database settings, permissions, or deploy.
- [x] Verify all nine workspaces on the live app; all nine returned their expected rule-based reports.
- [ ] Confirm reports persist in Daily Log and test the Bot Team layout on mobile.


### November 24, 2026 — Nine bot workspaces live-tested; reporting consistency fix queued
- [x] Owner ran the workspace test for all nine bots on the live Business Command Center: Boss Bot, Tasky, Deadline Bot, Doc Bot, Scout, Brainy, Maily, Cheer Bot, and Program Manager Bot.
- [x] All nine workspaces returned their expected rule-based reports. These are workspace tests, not proof of autonomous background execution.
- [x] Fix Deadline Bot to scan every open task when calculating missing due dates; its prior task selection included only dated tasks, which forced the missing-date count to zero.
- [x] Fix Brainy to report missing owners and due dates across the full open Task Board; its prior report used only keyword-matched tasks.
- [x] Re-run Deadline Bot and Brainy after the correction in a fresh Incognito session; both now agree with Tasky on the shared board-wide totals.
- [ ] Confirm each bot report is recorded in Daily Log and check the Bot Team layout on mobile.
- No task owners, due dates, task statuses, or stored records were changed during the initial tests.


### November 24, 2026 — Bot reporting consistency fix merged and live-verified
- [x] Merged PR #17, **Make bot task metrics use a consistent board-wide scope**, into `main`.
- [x] Updated Deadline Bot to count missing due dates across all open Task Board tasks, rather than only dated tasks.
- [x] Updated Brainy to calculate missing-owner and missing-due-date totals across all open Task Board tasks, rather than a keyword-filtered subset.
- [x] Added an explicit scope statement to both reports: all open tasks on the Task Board.
- [x] Owner re-tested Deadline Bot in a fresh Incognito session: 0 overdue, 5 upcoming dated tasks, and 27 open tasks missing due dates.
- [x] Owner re-tested Brainy in the same fresh session: 38 total tasks, 34 open, 4 completed, 34 open tasks missing an owner, and 27 missing a due date.
- [x] Brainy and Deadline Bot now agree with Tasky's board-wide missing-due-date count of 27.
- [x] Confirmed the reporting correction did not modify task records, owners, due dates, statuses, database schema, or permissions.
- [ ] Follow up separately on Daily Log persistence and Bot Team mobile layout.


### November 24, 2026 — Custom task options and dynamic project views
- [x] Confirmed current `main` already supports typing custom Project/category and assignee values in the task form.
- [x] Confirmed custom categories are included in Task Board filters.
- [x] Updated Home project areas and Projects view to use the saved dynamic category list, so owner-created categories appear consistently.
- [x] Kept Status and Priority as controlled choices.
- [ ] Run build checks and owner live test after this follow-up pull request is merged.

## Expanded AI Management Team Roadmap — Owner Approved November 24, 2026

This section expands the existing bot roadmap into a coordinated, phased management system. Approval means the roadmap is authorized for planning and implementation; it does not mean features, integrations, autonomous agents, or paid services are already active.

### Phase 1 — Reliability and shared operating foundation (P1)
- [ ] Verify bot reports persist in Daily Log after refresh and after signing out/in.
- [ ] Verify Daily Log entries show bot name, run time, task/data scope, result, and any errors.
- [ ] Verify Bot Team layout and controls on common mobile screen sizes.
- [ ] Add a shared bot task queue with owner, department, priority, due date, status, dependencies, and blocker fields.
- [ ] Add a durable activity history for assignments, status changes, bot runs, approvals, denials, and failures.
- [ ] Verify the assigned/unassigned/approval-required summary counts against saved task records.
- [ ] Commit and verify the owner-provided Bot Team poster asset if the source file is available.

### Phase 2 — Boss Bot coordination and bot-to-bot handoffs (P2)
- [ ] Give Boss Bot a consolidated view of every enabled bot's assignments, workload, status, deadlines, and blockers.
- [ ] Allow Boss Bot to propose assignments to specialist bots using their approved role and permissions.
- [ ] Add explicit handoff records: sending bot, receiving bot, task, context, expected output, due date, and handoff status.
- [ ] Allow receiving bots to accept, request clarification, report blocked, or return completed work.
- [ ] Prevent circular handoffs, duplicate assignments, and conflicting simultaneous edits.
- [ ] Require owner review for changes to business priorities and high-impact assignments.
- [ ] Produce daily owner briefings and weekly progress/recognition reports from verified activity.

### Phase 3 — Company governance, department rulebooks, and approvals (P1/P2)
- [ ] Implement the Master Company Rulebook and editable department rulebooks from the approved specification.
- [ ] Add bot profiles with enable/disable controls, allowed departments/data, permitted actions, autonomy scope, and reporting cadence.
- [ ] Implement an approval inbox with action summary, requesting bot, business reason, estimated cost, affected records/audience, and approve/deny controls.
- [ ] Enforce approval gates in the backend, not only in the interface.
- [ ] Add rule version history, conflict detection, stop-and-escalate behavior, and auditable decisions.
- [ ] Test tenant isolation and least-privilege access with separate business accounts.
- [ ] Preserve the owner approval requirement for spending, paid activation, sensitive external communications, confidential sharing, legal/financial commitments, security/permission changes, important deletion/retention changes, and significant publishing/deployment.

### Phase 4 — Specialist bot capability upgrades (P2/P3)
- [ ] Tasky: assignment recommendations, duplicate detection, workload balancing, and task lifecycle reporting.
- [ ] Deadline Bot: configurable reminders, overdue escalation, dependency-aware forecasts, and missing-date queues.
- [ ] Doc Bot: searchable document index, approved folder organization, metadata, version tracking, and safe preview/download workflows.
- [ ] Scout: source-backed live research, prospect/opportunity discovery, citations, relevance notes, and a human review queue.
- [ ] Brainy: verified KPI dashboards, trend analysis, sales/traffic reporting when connected data exists, and clearly scoped recommendations.
- [ ] Maily: personalized draft generation, contact/context review, approval workflow, and sending only after explicit owner approval through a properly authorized integration.
- [ ] Cheer Bot: dated achievements, project-aware celebrations, streaks, milestone tracking, and weekly Wall of Wins reporting.
- [ ] Program Manager Bot: GitHub issue/PR/build monitoring, low-risk repair proposals, repair logs, automated tests, and stop-and-escalate controls. No major code, schema, security, or deployment action without approval.

### Phase 5 — Department manager bots (P2/P3)
- [ ] Marketing Manager: content calendar, campaign planning, brand checks, channel-specific drafts, and performance review.
- [ ] Finance Manager: categorized expense/revenue summaries, budget tracking, invoice/report preparation, and variance alerts; no payments, transfers, or financial commitments.
- [ ] Customer Care Manager: support inbox triage, FAQ suggestions, feedback themes, and response drafts; external replies require approval.
- [ ] Academy Manager: course catalog, lesson/workbook production queue, student-support drafts, and course completion reporting.
- [ ] Publishing Manager: book manuscript status, editorial checklist, Lulu/KDP specifications, cover/interior file tracking, and launch calendar.
- [ ] Website & Store Manager: WordPress/storefront content queue, product-page checks, broken-link monitoring, and analytics summaries when connected.
- [ ] Operations Manager: cross-department workload, SOPs, supply/resource checklists, and weekly operations review.
- [ ] Allow owners to enable only the departments they use and customize responsibilities through the rulebook.

### Phase 6 — Integrations, research, and business intelligence (P2/P3)
- [ ] Evaluate and implement supported Google Drive, Docs, Sheets, and Slides workflows with account authorization and owner-controlled sharing.
- [ ] Evaluate Gmail integration for draft/review/send workflows; never send without explicit approval.
- [ ] Add source links, retrieval date, confidence/limitations, and research history to Scout and Brainy outputs.
- [ ] Add optional 14-day competitor/business-gap reviews and prospect discovery with visible provider pricing, usage limits, and opt-in controls.
- [ ] Add calendar/task reminders only after the owner reviews permissions and any paid costs.
- [ ] Keep each external integration disconnected until the owner explicitly connects and authorizes it.

### Phase 7 — Automation, cost controls, and commercial readiness (P3)
- [ ] Create an automation center for recurring schedules, trigger conditions, run history, failures, and pause/resume controls.
- [ ] Display the current automation-slot limit and require owner choice before replacing an existing active automation.
- [ ] Add a cost dashboard showing free vs paid capabilities, estimated usage, provider fees, and spending caps before activation.
- [ ] Add plan/feature entitlements without implying paid capabilities are active before configuration.
- [ ] Test automation failures, duplicate runs, retries, rate limits, and owner notifications.
- [ ] Complete privacy, security, tenant isolation, billing, and support checks before commercial launch.

### Definition of done for every bot upgrade
- [ ] Role, scope, inputs, outputs, and limitations are documented.
- [ ] Permissions follow least privilege and are enforced server-side.
- [ ] Bot reports distinguish verified facts, recommendations, and unavailable data.
- [ ] Actions and approvals are recorded in an auditable history.
- [ ] Automated tests pass and the owner verifies the live workflow.
- [ ] Mobile usability is checked.
- [ ] Any paid provider, recurring fee, or third-party data access is disclosed before activation.
