# Public Launch Security & Policy Checklist
**Integrity Rising Business Command Center + Integrity Rising — The Wellness & Growth App**

**Owner:** Christina Engel  
**Created:** November 26, 2026  
**Purpose:** One owner-facing launch gate for both products. Track evidence separately for each product. A check on one product never counts as proof for the other.

## Status rules
- **Verified:** The exact control was tested on the live or designated test system and evidence/date are recorded.
- **Owner-confirmed complete:** The owner has confirmed the work is complete. Do not ask the owner to repeat it; retain any separate evidence/reconciliation work that remains.
- **In progress:** Work or review has started, but verification is incomplete.
- **Open:** Not yet verified.
- **Owner approval required:** Do not publish or deploy a significant change without the owner's approval.

A successful GitHub build or deployment is not proof of database security, privacy, authentication, or policy readiness.

## A. Integrity Rising — The Wellness & Growth App

**Repository:** https://github.com/IntegrityRising101/Integrity-Rising-wellness-growth-app  
**Existing launch records:**  
- [App launch to-do list](https://github.com/IntegrityRising101/Integrity-Rising-wellness-growth-app/blob/main/docs/INTEGRITY_RISING_APP_TODO.md)
- [Final launch testing — Issue #16](https://github.com/IntegrityRising101/Integrity-Rising-wellness-growth-app/issues/16)
- [Privacy policy and terms — Issue #18](https://github.com/IntegrityRising101/Integrity-Rising-wellness-growth-app/issues/18)
- [Database security and backups — Issue #19](https://github.com/IntegrityRising101/Integrity-Rising-wellness-growth-app/issues/19)
- [Safety resources — Issue #14](https://github.com/IntegrityRising101/Integrity-Rising-wellness-growth-app/issues/14)
- [Authentication and profile work — Issues #12–#13](https://github.com/IntegrityRising101/Integrity-Rising-wellness-growth-app/issues/12)

| Check | Current status | Evidence / next action |
|---|---|---|
| Account access, authentication, registration, sign-in/out and password recovery | Owner-confirmed complete — November 26, 2026 | Owner confirmed the Wellness & Growth App account access/authentication work is finished. Do not ask for repeat testing. Reconcile related tracker issues separately; this owner confirmation does not certify unrelated security controls. |
| Supabase RLS and member-to-member data isolation | RLS enabled; policy expressions reviewed — targeted verification open | Owner ran read-only live Supabase checks on Nov. 26, 2026: all 21 listed public tables have RLS enabled; 44 policies were inventoried and their `USING` / `WITH CHECK` expressions reviewed. Owner-specific policies are present on personal-data tables; report reads are scoped to the reporter or community moderator. Follow-ups: confirm profile fields exposed by authenticated-member profile reads, confirm whether all active-room messages are intended to be visible to every authenticated member, inspect connection-update field constraints, and test isolation with separate accounts. Duplicate source migration number 005 remains unresolved; do not alter or rerun migrations blindly. |
| Moderator permissions and confidential report access | In progress — function/grant review completed | Owner-reported moderator controls work. Live definitions of `is_moderator()` and `is_community_moderator()` were reviewed read-only: both are `STABLE SECURITY DEFINER` SQL functions with empty `search_path` and check whether `auth.uid()` appears in `public.community_moderators`; no meaningful logic difference was found. Live routine grants match for both: `authenticated`, `postgres`, and `service_role` have EXECUTE; `PUBLIC` was not listed. No function or grant changes made. Still verify confidential report access and separate-account behavior. |
| Privacy policy, terms, community guidelines and consent | Open | Track against Issue #18; verify the published versions are accessible in the app. |
| Data collection, retention, export/deletion and sensitive wellness data | Open | Document what is collected, who can access it, retention/deletion process, and keep private wellness/journal data out of public feeds and AI requests unless separately reviewed and consented. |
| Reporting, blocking, moderation and content removal | In progress | Owner has reported successful checks of blocking/reporting and moderator controls; complete the full member-to-moderator workflow with separate test accounts and record evidence before closing Issues #7–#11. |
| Safety resources, crisis wording and Quick Exit placement | Open | Verify links and phone numbers; confirm emergency-service and clinical-care limitations are clear. Track Issue #14. |
| Secrets and AI provider protections | Open | Confirm no service-role or provider secrets are in frontend code, Git history, or public config; review secure Edge Function, consent, rate limits and cost controls before enabling live AI. |
| Backups and recovery | Open | Review Supabase backup configuration and document a recovery procedure; track Issue #19. |
| Mobile/desktop accessibility and final QA | Open | Test Android/mobile and desktop journeys, navigation, links, forms, error states and accessibility; track Issues #15, #16 and #22. |

## B. Business Command Center

**Repository:** https://github.com/IntegrityRising101/business-command-center  
**Live application:** https://integrityrising101.github.io/business-command-center/  
**Existing records:** [Master Task List](MASTER_TASK_LIST.md) · [Project Progress](PROJECT_PROGRESS.md)

| Check | Current status | Evidence / next action |
|---|---|---|
| Owner/admin access and account separation | Open | Verify authentication and that each business/customer workspace can only access its own records. |
| Database RLS and tenant isolation | Open | Confirm every customer business is isolated server-side; client-side filters are not sufficient. Review Supabase policies with separate test accounts. |
| Secrets and deployment configuration | In progress | README documents required Vite public Supabase configuration and warns against committing private credentials; verify repository secret presence without exposing values. |
| Privacy notice, terms and data handling | Open | Confirm policies explain collection, use, storage, deletion, support and third-party integrations. |
| Bot permissions and approval boundaries | In progress | README documents approval requirements for security, permissions, schema/data changes, spending, external communications and significant publishing/deployment. Verify implemented controls match the documented rules. |
| External integrations and outbound actions | Open | Verify Gmail or other integrations cannot send, publish, spend or modify external systems without explicit owner approval. |
| Backups, recovery and audit trail | Open | Document backup/recovery and verify important owner approvals and changes are recorded. |
| Final browser/device QA | In progress | Live site was owner-confirmed working after PR #9; test current navigation, task persistence, Bot Team, documents and responsive layout before launch. |

## C. Shared launch approval gate

Do not mark either product publicly launch-ready until its own checks above have evidence and the owner approves the release.

- [ ] App security and privacy checks independently verified.
- [ ] Command Center security and privacy checks independently verified.
- [ ] Policies and support/contact information published and reviewed for each product.
- [ ] Critical/high launch blockers resolved or explicitly accepted by the owner.
- [ ] Final mobile and desktop smoke tests completed for each product.
- [ ] Owner gives explicit approval for public launch.

## Working rule
Keep detailed engineering work in each product's existing repository and issue tracker. This document is the shared owner-facing index; it links to existing tasks rather than replacing them or creating duplicate engineering issues. Record the test date, environment, account role used, result, and any follow-up issue before changing a status to Verified.

**Database audit note — November 26, 2026:** Repository SQL was reviewed read-only. The owner ran a live query confirming RLS is enabled (`rowsecurity = true`) on all 21 listed public tables. Policy effectiveness and member data isolation remain unverified. No database changes were made. The migration-history queries returned no rows for the checked `supabase_migrations` schema/table, so the live migration history remains unresolved. Source review found a migration-number collision: 005_auto_create_member_profiles.sql and 005_topic_based_member_chat_rooms.sql. Confirm the target project's migration history before applying or changing either file.


**Additional live policy/function review — November 26, 2026:** Owner queried `pg_policies` and reviewed all 44 policy expressions. Owner also compared both moderator helper definitions and queried `information_schema.routine_privileges`; both functions have matching EXECUTE grants to `authenticated`, `postgres`, and `service_role`, with no `PUBLIC` grant shown. These findings support consistency but do not replace separate-account tests or review of profile field exposure and room visibility. No database changes were made.

**Profile-column review — November 26, 2026:** Owner queried `information_schema.columns` for `public.profiles`. The table contains `id` (uuid), `display_name` (text), `bio` (text), `created_at` and `updated_at` (timestamps), `avatar_path` (text, nullable), and `member_goals` (text, nullable). Because the existing SELECT policy allows authenticated members to read profile rows, confirm whether `member_goals` is intended to be visible to every signed-in member. Column inventory alone does not establish whether the values contain sensitive information. No database changes were made.

**Owner privacy decision — November 26, 2026:** Owner confirmed `member_goals` must be private by default and visible to other members only when the member explicitly chooses to share. The current `profiles` SELECT policy grants authenticated members row-level access, which also exposes every column in those rows; RLS alone does not hide an individual column. Treat this as an open privacy/security item. Before implementation, design and test a safe separation (for example, keep private goals in a separately protected table and expose only explicitly shared goals through a narrowly scoped view or controlled endpoint). Do not change schema, policies, or data until the design is reviewed and owner-approved.

**Community-room message policy review — November 26, 2026:** Owner inspected the live `community_room_messages` policies. INSERT requires `auth.uid() = user_id` and an active parent room; DELETE requires `auth.uid() = user_id`; SELECT allows any signed-in member to read messages when the parent room is active, with no room-membership condition in the displayed policy. This is not necessarily a defect if every active room is intended to be open to all authenticated members, but it does not enforce private/member-restricted room visibility. Confirm intended room model before changing policies. No database changes were made.

**Owner room-visibility decision — November 26, 2026:** Owner chose a mixed community model: some rooms are public to all signed-in members and some are private/restricted to approved members. The current `community_room_messages` SELECT policy only checks that the room is active, so it does not yet enforce the private-room distinction. Treat room visibility enforcement as an open security item. Before implementation, inspect the room schema and any membership/invitation tables, define explicit public/private room visibility, and design matching SELECT/INSERT policies for rooms and messages. No database changes made.

**Community-room schema inspection — November 26, 2026:** Owner inspected `public.community_rooms`. Current columns are `id` (text), `name`, `description`, `guidelines` (text), `sort_order` (integer), `is_active` (boolean), and `created_at` (timestamp). No visibility/type or membership field appears in this table's current column list. This means the inspected room table itself does not currently express public versus private visibility or approved room membership. Next inspect whether any separate room-membership/invitation table or related access mechanism exists before proposing schema or policy changes. No database changes made.

**Room-membership table search — November 26, 2026:** Owner queried `information_schema.tables` for public base tables with names matching `%room%`, `%member%`, or `%invite%`. Results: `community_room_messages`, `community_room_reports`, `community_rooms`, `member_connections`, `member_goals`, and `member_preferences`. No obviously named room-membership or invitation table appeared in this result. This name-based search does not prove that no membership mechanism exists under a different table name or outside the public schema. Next inspect relevant table definitions/foreign keys or application code before concluding. No database changes made.

**Room-related foreign-key review — November 26, 2026:** Owner inspected public-schema foreign keys involving room tables. The results show `community_room_messages.room_id` references `community_rooms.id`, and `community_room_reports.message_id` references `community_room_messages.id`. No room-membership relationship appeared in this result. This supports the need to design explicit private-room membership enforcement for the chosen mixed public/private model, but does not prove there are no other access mechanisms (e.g. application logic or non-FK relationships). Inspect application code and remaining related table definitions before any migration. No database changes made.