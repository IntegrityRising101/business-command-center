# Program Manager Bot — Coordination MVP

## Existing architecture
Program Manager Bot already exists in the Bot Team as a rule-based software delivery triage workspace. This increment upgrades that workspace; it does not add a duplicate bot, new chat endpoint, database table, paid service, or background automation.

## Responsibility boundary
- Program Manager Bot coordinates software/app/website/integration/testing/release work only.
- Boss Bot remains the general business priority and task-assignment coordinator.
- Secretary Bot and Build Secretary remain responsible for verified reporting and build records.
- Program Manager Bot reads the task list supplied to the existing Bot Team component and produces a read-only report.
- It does not assign tasks, edit code, alter data or permissions, contact other bots, spend money, or deploy.

## Coordination report
The workspace report now:
- Defines its scope as software delivery.
- Groups open work into security/owner decisions, backend/integrations, frontend/experience, testing/verification, release readiness, and planning/coordination.
- Surfaces high-priority, missing-date, missing-owner, and owner-approval indicators.
- Provides a short prioritized software queue.
- Recommends handoffs to existing bots by specialty.
- Keeps security, privacy, authentication, permissions, database/schema, secrets, spending, and production-release decisions with the owner.
- Includes a release gate for build checks, live owner verification, approvals, and deployment records.

## Chat and connection verification
- The current frontend calls Supabase Edge Function `integrity-bot-chat`.
- The Supabase project reports `integrity-bot-chat` active at version 7 with JWT verification enabled.
- The deployed function reads the signed-in user's task records under RLS and supplies read-only task context to Gemini.
- `super-api`, `gemini-chat`, and `gpt-chat` are not the current frontend endpoint.
- Supabase logs show successful 200 responses for `integrity-bot-chat`; intermittent 502 responses correlate with Gemini upstream HTTP 503 high-demand responses, not the old `super-api` authentication errors.
- No credentials or secrets are stored in this repository change.

## Verification still required
- Run the repository build and PR checks.
- Owner tests the Program Manager workspace with current saved software tasks.
- Owner tests Program Manager chat through `integrity-bot-chat`.
- Confirm report output remains read-only and existing bot workspaces still open.
- Confirm the deployed GitHub Pages version after merge.
