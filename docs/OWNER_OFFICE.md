# Owner Office and Secretary Bot

## Purpose
Owner Office is the authenticated owner's oversight workspace. It brings together task-derived status, approvals, Boss Bot's existing strategic briefing, and Secretary Bot's verified administrative reports.

## Role separation
- **Boss Bot:** priorities, workload, blockers, and recommendations.
- **Secretary Bot:** daily/weekly accomplishment reports, verification flags, and report history.
- Secretary Bot is deterministic and free-first. It reads saved task records; it does not require Gemini or paid AI credits.

## Reporting rules
- Count a completion as verified only when the task is marked Done and has a saved completed_at timestamp inside the selected period.
- A task marked Done without completed_at is flagged as needing verification and excluded from confirmed completion totals.
- In-progress work, overdue tasks, upcoming deadlines, owner approval flags, and unassigned work are reported separately.
- Include task ID, title, project, assignee, completion date, and evidence/follow-up fields when present.
- Never infer dates, evidence, approvals, or deliverables.

## Persistence and privacy
- Report snapshots are stored as tagged entries in the existing daily_logs table.
- The current daily_logs Row Level Security policy scopes every report to auth.uid() = user_id.
- Owner Office is rendered only inside the authenticated workspace after cloud data has loaded.
- No new table, service-role key, paid provider, or external send permission is introduced.

## Limitations / next phase
- Current report evidence fields are included only if present on task records; the current task editor does not yet collect evidence links.
- Reports are point-in-time snapshots; refreshing a report creates a new history entry and does not overwrite prior reports.
- Owner should verify the live account access and Android/desktop layout after deployment.
