

## Phase 6 — Company rules, departments & bot governance (approved; not implemented)
- [ ] Build the Master Company Rulebook.
- [ ] Provide editable ready-made policy templates and custom rule creation from scratch.
- [ ] Allow each business to use both templates and custom-written rules.
- [ ] Add separate department rulebooks under the master rules (Marketing, Finance, Customer Service, HR, and custom departments).
- [ ] Define rule inheritance and conflict handling; master rules govern, and conflicts must stop and be reported.
- [ ] Add rule version history, change summaries, and owner approval for important changes.
- [ ] Build the Bot Permission & Approval Center with per-bot access, task scope, autonomy, and reporting controls.
- [ ] Add an owner approval queue for spending, external messages, file sharing, security/permission changes, deletion, commitments, and significant publishing/deployments.
- [ ] Add auditable bot activity and approval history.
- [ ] Enforce business/tenant isolation in database, server-side authorization, and storage; test two businesses and multiple roles.

## Newly approved product decisions — November 23, 2026
- Company rules can be created from editable templates, written from scratch, or both.
- Each business has one Master Company Rulebook plus separate department rulebooks.
- Owners customize bot selection, roles, permissions, reporting schedules, and autonomy.
- Bots follow the approved business plan; conflicting instructions are stopped and reported to the owner.
- Business workspaces must be tenant-isolated so one customer cannot access another customer's records.
- These are approved specifications only; do not mark implementation complete until built and tested.
# Integrity Rising — Business Command Center

## Master To-Do Checklist & Progress Log
**Project start/tracking date:** November 21, 2026
**Rule:** Only mark an item complete when verified. Add the completion date beside each checked item. Dates for earlier work are marked as 'date not confirmed' if we do not have a reliable record.

## Phase 1 — Product foundation
- [x] Create the public GitHub repository — completion date not confirmed
- [x] Build the initial dashboard (Home, Tasks, Projects, Daily Log, Links) — completion date not confirmed
- [x] Save product and monetization roadmap in `docs/PRODUCT_ROADMAP.md` — **Nov 21, 2026**
- [ ] Confirm GitHub Pages deployment is live and working — date completed: ______
- [x] Create separate Supabase project for Business Command Center — **Nov 21, 2026**
- [x] Add GitHub repository secrets and wire them into the deployment build environment — **Nov 21, 2026**

## Phase 2 — Accounts & privacy (launch blocker)
- [ ] Set up email/password sign-up
- [ ] Set up sign-in and sign-out
- [ ] Set up password reset
- [ ] Configure redirect/site URLs
- [ ] Create user-owned database tables
- [ ] Add Row Level Security (RLS) to all user data tables
- [ ] Restrict data access so users can only access their own records
- [ ] Verify privacy using two separate test accounts

## Phase 3 — Cloud saving & core features
- [ ] Replace browser-only storage with secure cloud storage
- [ ] Tasks save and load per account
- [ ] Projects save and load per account
- [ ] Daily logs save and load per account
- [ ] Links/bookmarks save and load per account
- [ ] Add account/profile area
- [ ] Add loading, empty, and error states
- [ ] Check mobile and desktop layouts

## Phase 4 — Free Starter plan
- [ ] Define and implement free plan limits/features
- [ ] Add starter onboarding/welcome guide
- [ ] Add clear help/instructions
- [ ] Make sample content easy to remove

## Phase 5 — Pro features
- [ ] Business goals and milestones
- [ ] Marketing/content calendar
- [ ] Revenue and expense tracker
- [ ] Weekly progress review
- [ ] Business templates
- [ ] Export/backup options

## Phase 6 — Payments & monetization
- [ ] Choose payment platform
- [ ] Confirm final pricing
- [ ] Build upgrade/pricing page
- [ ] Connect checkout
- [ ] Implement paid access/entitlements
- [ ] Test successful payment
- [ ] Test cancellation and access changes
- [ ] Publish refund, support, and billing information

## Phase 7 — Beta & launch
- [ ] Invite small beta group
- [ ] Collect feedback
- [ ] Fix priority issues
- [ ] Create product walkthrough
- [ ] Create launch announcement and marketing content
- [ ] Publish launch
- [ ] Track sign-ups and feedback

## Completion log
- **Nov 21, 2026:** Product monetization and launch roadmap created and committed to GitHub.\n- **Nov 21, 2026:** Separate Supabase project created; project URL obtained.\n- **Nov 21, 2026:** GitHub Actions deployment workflow updated to pass Supabase URL and publishable key secrets into the build.\n- **Nov 21, 2026:** Added `@supabase/supabase-js` dependency and created `src/lib/supabase.js` client initialization.

## Next task
- **Next:** Use the Supabase client in the app UI and verify the GitHub Actions build succeeds. Then implement authentication and user-isolated data.

## Bot chat and approved memory foundation (in development)
- [x] Add per-bot persistent conversation UI and Supabase-backed message storage code.
- [x] Add shared owner-visible Team Inbox thread.
- [x] Add pending / approved / rejected memory suggestions with owner approve, dismiss, and revoke controls.
- [x] Add owner-scoped Supabase RLS migration for conversations, messages, and memories.
- [x] Document database setup, MVP limitations, and verification steps.
- [ ] Apply the migration in the Supabase project.
- [ ] Verify per-bot history, Team Inbox persistence, memory approval/revocation, and cross-account isolation.
- [ ] Run automated build and test Android and desktop layouts.
- [ ] Connect a model-backed response service only after provider disclosure, data-sharing controls, and owner approval are designed.

Status: code is on a draft pull request, not deployed. Current replies are rule-based; this is not yet live generative AI or autonomous bot-to-bot teamwork.
