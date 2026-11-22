# Integrity Rising — Project Progress Record

Last updated: November 21, 2026

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

### Current development to-do list

#### Priority 1 — Verify and repair core functions
- [ ] Verify the latest GitHub Pages deployment and test the Bot Team tab on the live app.
- [ ] Test task creation, editing, due dates, completion, and persistence after refresh.
- [ ] Test task-completion celebrations and confirm achievements appear on the Wall of Accomplishments after refresh.
- [ ] **Investigate and fix the Document & Media Center file-upload failure.** Check the upload UI, Supabase Storage bucket, policies, file-size/type validation, and user-visible error handling.
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
- [ ] Build secure document/media organization, preview/download, and version history.
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

## 3. Shared brand and operating standards
- Organization / brand: **Integrity Rising — The Integrity Movement**.
- Motto: **United by Truth, Driven by Purpose**.
- Keep the Business Command Center and Wellness & Growth App as separate products with separate repositories, data, and user experiences.
- Use clear dated task tracking and record completed work at the end of each work session.
- Never put passwords, API keys, access tokens, service-role keys, or other credentials in repository files.
- Use Supabase RLS and test with separate accounts before claiming user data is isolated.
- Require explicit confirmation before sending messages, sharing files externally, or publishing content.
- Keep premium automation costs visible and obtain approval before paid activation.

