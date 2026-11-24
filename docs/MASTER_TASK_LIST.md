# Integrity Rising — Master Business Task List

Last updated: November 23, 2026

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
- [ ] Test task creation, editing, due dates, completion, and persistence after refresh.
- [ ] Test completion celebrations and confirm dated achievements persist on the Wall of Accomplishments.
- [ ] Test a PDF download; verify it saves with a readable filename.
- [ ] Test folder creation, navigation, and uploads inside folders.
- [ ] Test PDF/image previews and supported audio/video playback, including mobile browsers.
- [ ] Test file access with a second account; confirm users cannot access another account's files.
- [ ] Verify authentication and RLS for tasks, documents, and other user records.

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

