# Integrity Rising — Project Progress Record

Last updated: November 23, 2026

This record keeps the two related but separate products organized. The Business Command Center is the internal business/work management tool. The Integrity Rising Wellness & Growth App is the community-facing wellness platform.

---

## 1. Business Command Center

**Repository:** https://github.com/IntegrityRising101/business-command-center  
**Live app:** https://integrityrising101.github.io/business-command-center/  
**Local development address used:** http://localhost:3000

### Completed
- Created the Business Command Center repository and React/Vite application foundation.
- Set up the main dashboard and work-management structure, including project areas, a Kanban-style task workflow, priorities, search/filtering, and a Focus Today area.
- Added quick links and a daily accomplishment/log area in the command-center structure.
- Configured Supabase as the backend/authentication service and created a separate Supabase project for this application.
- Added the required Supabase project URL and public anon key as GitHub Actions repository secrets (secret values are intentionally not recorded here).
- Configured the GitHub Pages deployment workflow in .github/workflows/deploy.yml.
- Fixed deployment blockers: corrected the index.html document structure, added the required public/ directory, and removed the invalid standalone Cache.yml workflow.
- Confirmed a successful GitHub Actions deployment on November 21, 2026. The build and deploy jobs completed successfully (run 44934799698).
- Confirmed the local app opens, the sign-in screen appears, and the user was able to log in.
- Cleaned up the README and documented setup, build, deployment, Supabase configuration, and security notes.
- Added this central project progress record for both Integrity Rising apps.
- Recorded Gmail as the selected email provider and added a Gmail workspace tab/setup panel; OAuth connection remains a separate implementation task.
- Added optional task due dates, an overdue count, upcoming deadlines, and due-date indicators. Added the database column and repeat-safe migration.
- User tested a task titled “Test Due Date Feature,” saved a November 22, 2026 deadline, and confirmed the date appeared in the Tasks list.
- Added an idempotent master backlog import in src/App.jsx for outstanding Command Center and Integrity Rising workstreams. Deployment and live import require verification.
- Added the first Bot Team dashboard UI with eight named bot profiles, a Boss Bot welcome panel, team counters, and a Wall of Accomplishments. Task-completion celebrations and dated achievement entries were added to the existing daily_logs table. **Live deployment and end-to-end testing must be verified before treating these features as fully working.**
- User confirmed GitHub Actions run #49 passed on November 21, 2026.

### New requirements and decisions — November 21, 2026

#### Program Manager Bot
- Add a dedicated **Program Manager Bot** to manage the Business Command Center software and its development backlog, separately from the bots that manage day-to-day business operations.
- Track feature requests, bugs, development tasks, testing, deployment checks, documentation, and dated change history.
- Give it limited automatic repair authority for basic, low-risk fixes only: clear spelling/text corrections, known broken links, minor display/layout issues, and straightforward code errors with a clear safe fix.
- Log every automatic repair, test the result, and report what changed.
- Stop and alert the owner if a repair fails, the cause is uncertain, or the fix is outside the approved low-risk scope.
- Require owner approval before major code changes, database/schema or Supabase changes, authentication/security/permission changes, paid services or spending, external communications, and significant publishing/deployment actions.
- These are approved product requirements, not proof that the bot or automated repair system has already been implemented.

#### AI Management Team
- Boss Bot coordinates the bot team, assigns and prioritizes work, monitors deadlines and milestones, flags blockers, and provides daily/weekly summaries.
- Task bots have clear roles, assigned work, status, priorities, due dates, and completion tracking.
- Cheer Bot celebrates progress, completed tasks, milestones, streaks, new customers, and team goals.
- Every 14 days, the optional business review should compare the company with relevant competitors and identify strengths, gaps, missing capabilities, and opportunities.
- Prospect research should produce a reviewable list with source links and relevance notes.
- Email outreach should be drafted for review; sending requires explicit owner approval.
- Competitor research, prospect discovery, and outreach automation are optional premium capabilities. Display estimated AI/provider costs, usage limits, and recurring fees before activation. No paid activation or external email without approval.

#### Document and business workspaces
- Build a Document & Media Center with secure upload, folders, tags, search, preview, download, metadata, and version history. The user reported that file uploads are not currently working; investigate and resolve this as a priority.
- Continue Books & Publishing workspace for *Legacy Within* and *The Architecture Is Yours* with verified Lulu details.
- Continue Google Drive/Docs/Sheets/Slides and Gmail integration planning. Require approval before sending emails, sharing files, or publishing content.

### Monetization decisions — November 21, 2026

**Proposed public pricing (not yet launched or connected to billing):**
- Starter: $0/month.
- Business: $19/month.
- Professional: $39/month.
- Business Plus: $79/month.
- Nonprofit: $9/month, subject to eligibility and final plan limits.
- Payment preference selected in planning: monthly and annual billing are both under consideration; a 7-day trial was presented as an option but has not yet been confirmed.

**Implementation guardrails:**
- Do not collect or charge payment details until a secure payment processor and production billing flow are configured and tested.
- Recommended architecture to evaluate: Stripe Checkout and Billing, server-side checkout-session creation, verified webhook handling, and Supabase-backed subscription status/entitlements. Never place secret keys in browser code or GitHub source files.
- Keep premium AI research, prospect discovery, and outreach as separately disclosed optional capabilities with visible usage limits and estimated provider costs.
- Before launch, define annual discounts, trial policy, nonprofit eligibility, cancellation/refund handling, taxes, invoices, plan limits, and customer support process.
- Public pricing is a proposal only; do not represent any tier as currently purchasable or active.

- November 21, 2026: Updated the Document & Media Center download action to request a signed URL with an attachment filename and use a clearly labeled **Download** button. Supabase Storage was configured with a private `private-documents` bucket and owner-folder access policies. The user confirmed that file uploads now work. Download behavior still needs a separate live browser test.

- November 21, 2026: Added the first folder and media-preview experience to the Document & Media Center. Users can create and navigate private folders, upload into the current folder, preview PDFs/images, play supported audio/video files, download, and delete. Existing root-level uploads remain in place. Code changes committed in `src/App.jsx`; live deployment and browser testing are still required. Browser preview depends on the file type and browser support.

### Current development to-do list

#### Priority 1 — Verify and repair core functions
- [x] Verify the latest GitHub Pages deployment after PR #9 and confirm the live Business Command Center loads instead of showing a black screen (November 23, 2026).
- [ ] Test task creation, editing, due dates, completion, and persistence after refresh.
- [ ] Test task-completion celebrations and confirm achievements appear on the Wall of Accomplishments after refresh.
- [ ] **Test Document & Media Center downloads** with a PDF first; confirm the browser saves it with a readable filename.
- [ ] Test folder creation, navigation, and uploads inside folders on the live app.
- [ ] Test PDF/image preview and audio/video playback on supported file types and mobile browsers.
- [x] Fix the reported Document & Media Center upload failure by creating the private `private-documents` Supabase Storage bucket and owner-folder access policies. User confirmed uploads now work.
- [ ] Verify upload/download permissions with a second account to confirm users cannot access one another's files.
- [ ] Verify login/authentication and Supabase Row Level Security (RLS) so each account can access only its own records.

#### Priority 2 — Program Manager Bot
- [ ] Design the Program Manager Bot dashboard and its software-management task queue.
- [ ] Connect it to feature requests, bug reports, task assignments, test results, and GitHub deployment status.
- [ ] Implement low-risk automatic repair rules with a repair log and automated tests.
- [ ] Add approval gates for major code, database, security, permissions, spending, external communications, and significant deployments.
- [ ] Add a clear stop-and-alert behavior when a repair is uncertain or fails.

#### Priority 3 — AI Management Team
- [ ] Complete Boss Bot coordination and bot assignment/status views.
- [ ] Add daily/weekly progress and recognition reports.
- [ ] Add the 14-day competitor and business-gap review as an optional paid feature.
- [ ] Add source-backed prospect research and a review queue.
- [ ] Add Gmail-based outreach drafts with owner approval before sending.
- [ ] Add transparent usage estimates, premium feature controls, and cost tracking.

#### Priority 4 — Business workspaces and launch readiness
- [ ] Complete Books & Publishing management for both books using verified Lulu information.
- [ ] Complete secure document/media organization, preview/download, and version history; verify folder navigation and media playback on mobile.
- [ ] Assess and implement Google Drive and other storage integrations where supported.
- [ ] Complete Gmail OAuth securely; never store passwords or tokens in source code or browser local storage.
- [ ] Test a separate public user account end-to-end and verify data isolation.
- [ ] Plan subscription tiers and public launch only after privacy, security, persistence, and core workflows are tested.

---

## 2. Integrity Rising — The Wellness & Growth App

**Repository:** https://github.com/IntegrityRising101/Integrity-Rising-wellness-growth-app  
**Live app:** https://integrityrising101.github.io/Integrity-Rising-wellness-growth-app/

### Completed / reported working
- Established this as a separate community-facing wellness and mental-health support product, not part of the Business Command Center.
- Chosen app name: **Integrity Rising — The Wellness & Growth App**.
- Established the teal-and-gold brand direction and main areas: Dashboard, Wellness & AI, Community, Academy, and Safety & Support.
- Added the “Four Practices for Your Well-Being”: Values-Based Action; Reframe a Thought; 5-4-3-2-1 Grounding; Self-Compassion Pause.
- Added links to independent AI services; the intention is to link out rather than connect users’ private accounts.
- Confirmed a successful deployment and working reload in a prior test.
- Configured Supabase authentication and profile infrastructure; user reported the setup as green.

### Remaining / verify next
- Re-test sign-up, sign-in, sign-out, password recovery, and profile creation/update.
- Audit Row Level Security on all tables before inviting the public.
- Keep Quick Exit limited to Safety / domestic-abuse support pages.
- Refine community and home-screen navigation.
- Continue building and testing wellness, AI, academy, community, and safety resources.

---

## 3. Project Haven — Domestic Violence Support App

**Repository:** https://github.com/IntegrityRising101/Project-Haven-DV-Support-Hidden-Secret-App

**Product identity:** Project Haven / LunaSync — a privacy-first, discreet wellness and safety-support application for people experiencing domestic violence. This is a separate product from the Business Command Center and the Integrity Rising Wellness & Growth App.

### Previously reported progress (verify against the current repository)
- User selected support for all device types and a complete build approach.
- App foundation and initial screens were started.
- A discreet wellness-style presentation and safety-support direction were established.
- Earlier project discussion reported a home/secret dashboard, emergency-resources screen foundation, and Quick Exit.
- Earlier discussion reported Android, iOS, and web export checks passing, and GitHub Actions quality run #19 passing. These historical reports are not a substitute for a fresh build or safety review.

### Work session — November 22, 2026
- Resumed work on Project Haven at the user's request.
- Identified Emergency Resources as the next screen to inspect before making code changes.
- Planned content includes discreet emergency support, domestic-violence hotlines and shelter resources, survivor-led safety planning, and private journaling/incident records.
- Requested review of `src/screens/EmergencyResourcesScreen.js`; GitHub file retrieval temporarily disconnected, so no code changes were made in this session.
- User requested that Project Haven work and next steps also be recorded in the Business Command Center progress record.

### Work session — November 22, 2026: configuration cleanup

- Inspected the live Project Haven repository files: `package.json`, `app.json`, `.github/workflows/quality.yml`, `App.tsx`, and the existing safety requirements.
- Confirmed that `package.json`, `app.json`, and the quality workflow contained duplicated/conflicting declarations or malformed trailing content.
- Replaced `package.json` with one valid Expo SDK 58 dependency/script definition, retaining the repository's declared React 19.3 / React Native 0.88 stack and TypeScript check. No lockfile was present.
- Rebuilt `app.json` as valid JSON, retaining the LunaSync app identity, Android/iOS identifiers, disabled Android backups, SecureStore, SQLCipher plugin configuration, and Metro web bundler.
- Consolidated `.github/workflows/quality.yml` into one read-only workflow using Node.js 22, dependency installation, Expo config validation, and TypeScript checks.
- Re-fetched both JSON files and parsed them successfully. The workflow file was re-fetched and inspected, but GitHub Actions has not yet reported a run result; CI/build success is **not yet verified**.
- No user-data storage, encryption implementation, Quick Exit behavior, emergency-resource content, or survivor-facing safety claims were changed.
- Project Haven commits:
  - `0aae95893472407bb7db2e1bad784cb4a91c6e6e` — package configuration
  - `8344c62bafc32f9254457f51239dcb1b34be60fe` — Expo app configuration
  - `057836c3114bba69f3e27e272aeaefcbd3de1a42` — consolidated quality workflow
  - `01deba0d301f87c3b69ac5c6ccffcd6bf3318bbf` — removed npm cache configuration because the repository has no lockfile

### Work session — November 22, 2026: CI diagnosis and TypeScript repair

- Inspected GitHub Actions run [#44993401736](https://github.com/IntegrityRising101/Project-Haven-DV-Support-Hidden-Secret-App/actions/runs/44993401736), which checked out the corrected workflow commit `01deba0d301f87c3b69ac5c6ccffcd6bf3318bbf`.
- Verified that Node.js setup, `npm install`, and `npx expo config --type public` all passed. This confirms the missing-lockfile/cache issue is resolved for this run.
- TypeScript validation then failed at `App.tsx:80`: the installed React Native StatusBar type does not accept the supplied `backgroundColor` prop.
- Removed that unsupported prop while retaining `barStyle="dark-content"`; the app's root view already supplies the cream background.
- Project Haven repair commit: `f4320f0ea6b81a9ebdbddf733816afd82b79fc4d` — **StatusBar TypeScript compatibility fix**.
- Dependency installation reported **3 moderate severity vulnerabilities**. This is recorded for a separate dependency audit; no automatic force-upgrade was run.
- User confirmed that Project Haven Quality Checks run **#29 is green (successful)** after commit `f4320f0ea6b81a9ebdbddf733816afd82b79fc4d`. This verifies that the workflow passed after the StatusBar TypeScript fix. The workflow is a configuration/TypeScript quality check, not a full device, security, or survivor-safety certification.
- No survivor-facing feature, data storage, encryption, authentication, Quick Exit, or emergency-resource behavior was changed.

### Work session — November 22, 2026: security audit workflow

- User approved adding an automated security workflow to Project Haven.
- Added `.github/workflows/security-audit.yml` in commit `7c02ce3e43afebfac3941e0fa7ff847a28999908`.
- Workflow uses Node.js 22 and installs dependencies without lifecycle scripts; runs `npm audit --audit-level=high`; checks declared dependencies against a list of common analytics/tracking SDKs; and scans full repository history with Gitleaks.
- Workflow runs on pushes and pull requests to `main`, weekly on Monday, and by manual dispatch.
- User confirmed the first Security and Privacy Audit workflow run is **green (successful)** on November 22, 2026.
- This confirms the configured dependency-audit threshold, package-name telemetry screening, and Gitleaks scan passed for that run. The dependency audit fails on high/critical findings; moderate findings may be reported without failing the gate. The telemetry scan is a package-name screening rule, not proof that runtime telemetry is absent. A passing secret scan is limited to the history scanned by that run.
- No application code, survivor data, storage, encryption, authentication, or safety-planning behavior was changed.

### Priority task backlog
- [ ] Inspect the current repository structure and the actual Emergency Resources screen before editing.
- [ ] Verify emergency contact details and resource links using authoritative, current sources; make clear that emergency services may not be safe or appropriate for every survivor.
- [ ] Design survivor-led safety planning with neutral language and no pressure to take actions that could increase danger.
- [ ] Threat-model discreet access, app naming/icon behavior, notifications, browser history, shared devices, and Quick Exit limitations. Clearly explain that Quick Exit cannot erase device, network, or browser history.
- [ ] Audit local storage, logs, analytics, crash reports, backups, and network traffic for sensitive-data exposure.
- [ ] Implement and test secure authentication/access controls appropriate to the chosen platform; do not claim end-to-end encryption unless it is actually implemented and independently verified.
- [ ] Protect private journal and incident records with encryption in transit and at rest, strict access controls, and a documented retention/deletion approach.
- [ ] Test accessibility, mobile layouts, offline behavior, and all supported device targets.
- [ ] Complete a survivor-centered safety and privacy review before any public launch or claims that the app is safe for high-risk use.

**Safety gate:** Project Haven is a sensitive safety-support product. Do not publish or describe it as secure, anonymous, confidential, or ready for survivor use until the relevant technical controls and real-device tests have been completed. Do not collect real survivor incident data during development/testing.

---

## 4. Shared brand and operating standards
- Organization / brand: **Integrity Rising — The Integrity Movement**.
- Motto: **United by Truth, Driven by Purpose**.
- Keep the Business Command Center and Wellness & Growth App as separate products with separate repositories, data, and user experiences.
- Never put passwords, API keys, access tokens, service-role keys, or other credentials in repository files.
- Use Supabase RLS and test with separate accounts before claiming user data is isolated.
- Require explicit confirmation before sending messages, sharing files externally, or publishing content.
- Keep premium automation costs visible and obtain approval before paid activation.


### Work session — November 22, 2026: Emergency support resources reviewed and updated

- Inspected the repository structure and confirmed the current user-facing experience is implemented in the root `App.tsx`; the older `src/screens/EmergencyResourcesScreen.js` is a separate legacy screen and is not the active Support tab.
- Reviewed the active Support tab and found it previously contained only general hotline guidance, without direct official resource links.
- Verified current U.S. National Domestic Violence Hotline contact details against its official website: call 1-800-799-SAFE (7233), text START to 88788, and use its official website for chat and local resources.
- Verified current 988 Lifeline guidance against its official website: call or text 988 for free, confidential support, 24 hours a day.
- Updated the active Support tab in `App.tsx` with official resource links, clear contact details, survivor-choice language, a device/browser/phone/carrier activity warning, and a reminder that emergency services may not feel safe or be appropriate for every person or situation.
- Change commit: `c53ce7020bf53998b502c0dff9a52bdb8f463c03`.
- The update adds links to official external websites; it does not automatically call or text a service and does not collect or store survivor information.
- **Pending verification:** GitHub Actions quality checks and a real-device review of link behavior, accessibility, and layout. This content update does not make Project Haven a secure vault or certify it for high-risk use.

### Work session — November 22, 2026: Project Haven emergency-support update passed CI

- User confirmed all three latest GitHub Actions checks are green for Project Haven commit `c53ce7020bf53998b502c0dff9a52bdb8f463c03`:
  - Project Haven Quality Checks #31 — successful.
  - Security and Privacy Audit #2 — successful.
  - Secret Scanning #15 — successful.
- This supersedes the earlier pending-CI note for the emergency-support content update above.
- The checks confirm the configured automated workflows passed. They do not establish that the app is secure, anonymous, confidential, production-ready, or certified for survivor use.
- Next: test the active Support tab and official links on physical devices, verify accessibility and small-screen layout, then continue the broader privacy, threat-model, and independent safety review.


### Work session — November 22, 2026: Business Command Center brand palette approved

- Owner approved a distinct Business Command Center palette: navy blue, silver, white, and copper.
- Added the palette and the three-product brand separation to the repository README.
- Updated the Business Command Center CSS theme toward navy surfaces, silver typography, and copper highlights while retaining the existing layout and features.
- The other products remain distinct: Project Haven uses purple/lavender; the Wellness & Growth App uses teal/gold/white.
- **Pending verification:** GitHub Actions build/deployment and a live visual check on desktop and mobile. This commit does not change application data, authentication, permissions, or the other apps.


### Work session — November 22, 2026: Project Haven purple theme applied

- Updated the active Project Haven / LunaSync interface in `App.tsx` from the prior teal/mint palette to deep purple, lavender, warm white, and soft gold.
- Documented the palette and its intended high-contrast use in the Project Haven README.
- App theme commit: `5d9ff015ace956ff31ad5a19efa3036f467a9174`.
- README commit: `8caf4035f8c12135d898541d4d377a0f4c011c0f`.
- This is a visual brand change only; no survivor data, storage, authentication, emergency contacts, or safety behavior was changed.
- **Pending verification:** GitHub Actions checks and visual/accessibility review on physical Android and iOS devices. Do not treat the new color palette as a privacy or safety control.

## 2026-11-22 — Project Haven home-screen welcome update
- Confirmed Project Haven Quality Checks #33, Security and Privacy Audit #4, and Secret Scanning #17 passed on commit `8caf4035f8c12135d898541d4d377a0f4c011c0f`.
- Updated Project Haven `App.tsx` home-screen welcome copy to feel warmer and more inviting, emphasizing user choice, no pressure, and personal pace.
- Preserved the early-preview notice and existing Support navigation and hotline resources.
- New Project Haven commit: `0d443a733beaa277b187d8e91acf7deccd443f82`.
- Follow-up GitHub checks for the new commit were queued at the time of this entry; results still need verification.
- This is a copy/layout update only. It does not add secure storage, encryption, account protection, or guarantee device privacy.


### Work session — November 23, 2026: Company rules and bot governance approved

- Owner approved a **Company Rules & Instructions Center** with both editable ready-made templates and the ability to write rules from scratch.
- Each business will have one Master Company Rulebook and may create separate department rulebooks for Marketing, Finance, Customer Service, HR, and custom departments.
- The Master Company Rulebook sets company-wide standards. Department instructions add detail but must not contradict master rules. Bots stop and report conflicts rather than silently choosing or changing a rule.
- Owner-approved **Bot Permission & Approval Center** requirements: business owners control bot selection, information access, independent task scope, approval requirements, reporting schedules, and activity review.
- Approval gates are required for spending/paid activation, external communications, file sharing, security or permission changes, legal/financial commitments, deletion of important records, and significant publishing/deployment.
- Bot actions, approvals, and applicable rule versions must be auditable. Boss Bot provides oversight and weekly accountability/recognition reporting.
- Multi-business requirement: each customer company has a separate tenant/workspace with database/server-side authorization and storage isolation. A business name or client-side filter is not sufficient.
- Full specification: [Business Rules, Department Rulebooks & Bot Permissions](BUSINESS_RULES_AND_BOT_PERMISSIONS_SPEC.md).
- **Status:** Requirements approved and documented. These features are planned; they have not yet been implemented or tested in the application.


### Work session — November 23, 2026: Business Command Center startup crash fixed and live site verified

- Diagnosed the live application's black-screen startup failure: a JavaScript temporal-dead-zone error, `ReferenceError: Cannot access 'Rt' before initialization`, caused by referencing the local `user` alias before it was initialized in `src/App.jsx`.
- Corrected the folder-path expression to read the authenticated user ID directly from `session?.user?.id`, avoiding the premature alias reference.
- Fixed the pull-request build workflow by removing npm dependency caching where the repository did not contain a package lockfile.
- Pull request [#9 — Fix Command Center black-screen startup crash](https://github.com/IntegrityRising101/business-command-center/pull/9) passed its build checks and was merged with owner approval.
- Merge commit: `126df4f1c537bcb2311e148ecaabbf53605d696e`.
- GitHub Pages deployment workflow completed successfully after the merge.
- Owner opened the live site and confirmed that the Business Command Center now works. **The black-screen startup issue is resolved and the live app is verified by the owner.**
- Live application: https://integrityrising101.github.io/business-command-center/
- No database schema, Supabase permissions, authentication configuration, or stored user data was changed as part of this repair.
- Follow-up cleanup (not a launch blocker): investigate the missing `manifest.webmanifest` request and continue performance optimization after the core app remains stable.

