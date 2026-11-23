# Business Rules, Department Rulebooks & Bot Permissions
**Status:** Owner-approved product requirements — planned, not yet implemented
**Decision date:** November 23, 2026

## Purpose
Give each customer business control over its operating rules, department instructions, AI bot responsibilities, and approval boundaries. Each independent business must have an isolated workspace and data.

## 1. Company Rules & Instructions Center
Every business receives one **Master Company Rulebook** covering:
- Mission, values, purpose, approved business plan, goals, and priorities
- Customer-service standards and communications
- Professional conduct and team expectations
- Brand voice, marketing, and public representation
- Document handling, privacy, confidentiality, and retention
- Financial controls and spending approvals
- AI bot responsibilities and escalation requirements

### Rule creation options
Owners can use both:
1. Editable ready-made templates for common business policies and procedures.
2. Custom rules written from scratch.

Templates are starting points, not legal advice or a guarantee of regulatory compliance. Owners are responsible for reviewing and adapting them.

## 2. Department rulebooks
Owners may create separate rulebooks for Marketing, Finance, Customer Service, Human Resources, Products/Services, Documents/Administration, and custom departments.

The Master Company Rulebook sets company-wide standards. Department rulebooks add detail but must not contradict master rules. If instructions conflict, bots stop the conflicting action and notify the owner instead of silently choosing an interpretation.

## 3. Owner customization and version history
- Owners can add, edit, organize, enable, disable, and retire rules.
- Owners can customize templates or create rules from scratch.
- Record the editor, date/time, change summary, affected departments, and affected bots.
- Keep prior versions available for review.
- Require owner approval for important rule or business-plan changes.
- Bots must never silently rewrite company rules.

## 4. Bot Permission & Approval Center
Owners configure each bot's:
- Authorized departments, records, and information access
- Tasks it may perform independently
- Actions requiring owner or authorized manager approval
- Reporting schedule and escalation route
- Enabled/disabled status

Use clear permission levels such as View, Prepare, Edit, Execute with approval, and Independent execution within scope. Apply least-privilege access.

### Approval required
Require explicit approval before spending or purchases, activating paid services, sending external messages, sharing confidential files, changing security or permissions, making legal/financial/contractual commitments, deleting important records, changing retention rules, or significant publishing/deployment. Owners may impose stricter limits.

Custom rules cannot override platform security, privacy, or access controls.

## 5. Bot accountability
Every bot must follow the approved business plan and applicable rulebooks, access only authorized information, report work and failures honestly, ask when instructions are unclear, stop and escalate conflicts, seek approval outside its authority, and never fabricate records, sales, progress, sources, or reports.

Keep an auditable history of relevant bot actions, approvals, and rule versions. Boss Bot oversees accountability and weekly recognition reports.

## 6. Multi-business privacy and tenant isolation
This product serves multiple independent companies. Implementation must:
- Give each business a unique tenant/workspace identifier.
- Enforce isolation in database policies and server-side authorization, not just the UI.
- Apply Supabase Row Level Security (RLS) or equivalent to every tenant-owned table and storage object.
- Restrict employee/collaborator access by business and role.
- Prevent cross-business access even if a URL, request parameter, or client-side state is changed.
- Test with at least two separate businesses and multiple roles.
- Keep audit records tenant-scoped and access-controlled.

A business name alone is not a security boundary.

## 7. Implementation checklist
- [ ] Design the Master Company Rulebook data model and owner interface.
- [ ] Build editable templates and custom rule creation.
- [ ] Build department rulebooks and conflict handling.
- [ ] Add version history and approval for important rule changes.
- [ ] Build per-bot permissions and an owner approval queue.
- [ ] Add bot action/audit history with rule and approval references.
- [ ] Enforce tenant isolation in database, APIs, and storage.
- [ ] Test conflicting master, department, and bot instructions.
- [ ] Test approval gates for spending, communications, permissions, deletion, and publishing.
- [ ] Test two businesses and multiple roles for cross-tenant data exposure.

## Related bot team
- **Boss Bot:** oversight, coordination, escalation, and weekly reports.
- **Program Manager Bot:** software backlog and low-risk repair workflow; approval for major, sensitive, paid, or significant deployment changes.
- **Tasky:** task assignments and status.
- **Deadline Bot:** due dates and reminders.
- **Doc Bot:** document organization and records.
- **Scout:** research and opportunities aligned with the approved plan.
- **Brainy:** analysis and source-grounded reporting.
- **Maily:** drafts communications; sending requires approval.
- **Cheer Bot:** celebrates progress, streaks, milestones, customer wins, and team goals.

## Owner-approved decisions — November 23, 2026
- Owner customization: **Custom** — each company selects bots and customizes responsibilities, permissions, reporting schedules, and autonomy.
- Conflicting instructions: **Follow the approved business plan** — stop and report conflicts; the owner may approve a plan update.
- Rule creation: **Both** — editable templates and rules written from scratch.
- Department rulebooks: **Yes** — separate department rulebooks under one master rulebook.
- Bot permissions: **Owner-controlled** — access, independent tasks, approval requirements, and activity review.

**Important:** These are approved product specifications. They are not claims that the features have been implemented.
