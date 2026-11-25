# Business Command Center — Master Milestones & Setup Plan
Updated: November 21, 2026

This document is the master roadmap for the Business Command Center. Milestones cover both the Integrity Rising business workspace and the long-term product for businesses, independent creators, and nonprofits. This roadmap is a source-of-truth plan; items are not marked complete unless verified.

## Milestone 1 — Foundation & Deployment
- [x] Repository created: IntegrityRising101/business-command-center
- [x] React + Vite app foundation
- [x] Supabase connection foundation
- [x] GitHub Actions workflow and deployment secrets configured
- [x] Master backlog and task/due-date tracking started
- [ ] Resolve current build error and achieve green deployment
- [ ] Verify production site and authentication
- [ ] Verify task create/edit/complete and due-date behavior
- [ ] Review access controls and user data separation

## Milestone 2 — Dashboard & Work Management
- [ ] Dashboard overview with upcoming deadlines, priorities, overdue tasks, progress, and quick actions
- [ ] Projects and task lists with status, priority, owner, due date, notes, and completion date
- [ ] Milestones with target dates, status, progress, and linked tasks
- [ ] Calendar view and reminders
- [ ] Daily accomplishment log
- [ ] Search, filters, and reusable templates

## Milestone 3 — Business Records & Document Hub
- [ ] Central upload/organize area for documents and folders
- [ ] Support common document types: PDF, Word, spreadsheets, presentations, images
- [ ] Add audio and video file organization
- [ ] Preview, download, rename, tag, and search files
- [ ] Google Drive connection and import/export workflow
- [ ] Microsoft Office document workflow / compatibility
- [ ] Backups, retention, and permissions

## Milestone 4 — Email & Communications
- [ ] Gmail workspace connection (user-authorized)
- [ ] Inbox/task linking and follow-up tracking
- [ ] Contact directory
- [ ] Communication notes and templates
- [ ] Calendar scheduling and reminder workflow

## Milestone 5 — Integrity Rising Business Workspace
- [ ] Brand assets and brand guidelines library
- [ ] Website and platform directory (WordPress, Gumroad, Stan Store, Google Sites, Fourthwall)
- [ ] Course and Academy inventory
- [ ] Product catalog and launch checklist
- [ ] Donations, sponsorships, and community outreach tracking
- [ ] Content and social publishing calendar

## Milestone 6 — Books & Publishing Management
- [ ] Manage published books: Legacy Within and The Architecture is Yours
- [ ] Lulu links, product metadata, ISBN/edition details, pricing, and status
- [ ] Manuscript/cover files and revision history
- [ ] Publishing checklist and proof-review tracking
- [ ] Promotion, launch, and sales tracking

## Milestone 7 — Finance & Business Planning
- [ ] Revenue and expense tracking
- [ ] Budget categories and forecasts
- [ ] Sales and product performance
- [ ] Donation and grant tracking for nonprofit use
- [ ] Simple reports and exportable records

## Milestone 8 — Wellness, Community & Nonprofit Tools
- [ ] Workspace templates for nonprofits and community projects
- [ ] Volunteer, outreach, and program tracking
- [ ] Resource directory and referral tracking
- [ ] Privacy-conscious records and access boundaries
- [ ] Accessible, simple mobile-first workflows

## Milestone 9 — Product Readiness, Security & Quality
- [ ] Responsive mobile/tablet/desktop layout
- [ ] Authentication, account recovery, and session checks
- [ ] Row-level security and ownership tests
- [ ] Accessible labels, keyboard navigation, and readable contrast
- [ ] Error states, loading states, empty states, and backups
- [ ] Test suite and deployment checks green

## Milestone 10 — Monetization & Launch
- [ ] Define free tier and paid plans
- [ ] Pricing research and target user interviews
- [ ] Subscription/billing integration (after security and value are validated)
- [ ] Nonprofit pricing/discount policy
- [ ] Landing page, onboarding, help center, and demo
- [ ] Pilot users, feedback loop, launch checklist, and support process

## Operating Rules
- Record completed work in the dated accomplishment log and mark tasks complete only after verification.
- Every milestone has an owner, target date, status, and linked tasks when those fields are available in the app.
- Prioritize launch blockers, data safety, and core task/project/document workflows before advanced features.
- Keep this roadmap updated as scope changes.


## Milestone 11 — AI Bot Team, Reporting & Owner Office
**Status snapshot: November 25, 2026**

### Verified existing capabilities
- [x] Bot Team interface and on-screen bot pop-up/entry point — owner confirmed November 25, 2026; preserve this existing entry point and do not build a duplicate.
- [x] Boss Bot Owner Briefing workspace — owner tested the briefing on November 24, 2026.
- [x] Boss Bot briefing summarizes priorities, approvals, deadlines, team assignments, and progress from saved task data.
- [x] Cheer Bot completion celebrations — repeat completion event tested by owner November 24, 2026.
- [x] Weekly Boss Briefing totals reconciled with Completed Tasks history — owner verified matching counts and task names November 24, 2026.
- [x] Boss Bot task-assignment recommendations and owner-controlled assignment workflow implemented in PR #28; build and deployment completed. Owner live verification of all coordinator behaviors remains tracked separately.
- [x] Bot growth milestone framework documented in GitHub issue #35.

### In progress — Individual bot chat foundation
- [x] Persistent per-bot chat UI and message storage code prepared in draft PR #36.
- [x] Shared Team Inbox foundation and recipient selection prepared in draft PR #36.
- [x] Owner-approved memory suggestion/review controls prepared in draft PR #36.
- [x] Supabase RLS migration and setup/verification guide prepared in draft PR #36.
- [x] GitHub build checks passed for PR #36.
- [ ] Apply the Supabase migration and verify conversation, message, and memory persistence.
- [ ] Test cross-account isolation, owner memory approval/revocation, and Android/desktop layouts.
- [ ] Merge and deploy only after required checks and owner testing.

### Planned — Owner Office & Secretary Bot
- [ ] Add a dedicated Owner Office navigation tab for owner-only reports, approvals, alerts, and report history.
- [ ] Add Secretary Bot with a warm, professional, customizable female-presenting persona.
- [ ] Generate daily and weekly completed-work reports from verified task/completion-history records.
- [ ] Include task, project, assignee, completion date, and evidence/link when available.
- [ ] Flag missing timestamps or incomplete evidence instead of claiming unverified work is complete.
- [ ] Keep Secretary Bot administrative reports distinct from Boss Bot's strategic Owner Briefing.
- [ ] Reconcile completion reports against saved completion history and provide report history.
- [ ] Enforce owner-only access and test privacy on desktop and Android.

**Tracking issue:** [#37 — Build Owner Office tab and Secretary Bot completion reports](https://github.com/IntegrityRising101/business-command-center/issues/37)

