# Public Launch Security & Policy Checklist
**Integrity Rising Business Command Center + Integrity Rising — The Wellness & Growth App**

**Owner:** Christina Engel  
**Created:** November 26, 2026  
**Purpose:** One owner-facing launch gate for both products. Track evidence separately for each product. A check on one product never counts as proof for the other.

## Status rules
- **Verified:** The exact control was tested on the live or designated test system and evidence/date are recorded.
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
| Account access, authentication, registration, sign-in/out and password recovery | In progress | Recovery code exists; verify Supabase URL allowlist, GitHub Actions secrets presence, and full test-account journey. Never expose secret values. |
| Supabase RLS and member-to-member data isolation | Open | Test with separate member accounts and moderator account; inspect policies and confirm private records cannot cross accounts. |
| Moderator permissions and confidential report access | In progress | Existing moderator controls have owner-reported successful tests; still verify authenticated moderator access and confidential report visibility as specified in app TODO. |
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
