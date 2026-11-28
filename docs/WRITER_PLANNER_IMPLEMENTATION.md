# Writer Studio and Planner — First Implementation Slice

Branch: `feature/writer-planner-workspaces`
Roadmap issue: #45

## Existing architecture verified
- React/Vite application in `src/App.jsx`.
- Supabase auth and task persistence already exist.
- The Documents workspace is built on the user's private Supabase Storage bucket.
- Bot team and chat components already exist.
- The current app has navigation controlled by a `tab` state inside `src/App.jsx`.

## Planned UI integration
Add navigation tabs:
- `Writing Studio`
- `Calendar & Planner`

Do not replace existing Home, Owner Office, Boss Briefing, Master Plan, Tasks, Completed Tasks, Projects, Bot Team, Documents, Email, Daily Log, or Links.

## Writing Studio MVP
- User chooses writing type: business document, manuscript/chapter, workbook/course, social post/newsletter, script, correspondence, or other.
- Form fields: title, project/category, format, audience, tone/brand voice, goal, source notes, content brief.
- Working draft area with editable text and controls for generate/continue, revise, proofread, reorganize, shorten/expand, and outline.
- Drafts must be saved as private owner-scoped records or in an explicitly selected private storage location.
- MVP must not claim the assistant generated a draft until an actual model request succeeds. The existing Gemini chat endpoint is not assumed to support these new writing actions without inspection/testing.
- Draft, review, approved, and archived states; version snapshots before edits.
- Export/copy options using browser-supported capabilities.
- Research mode must show source evidence and citation links. Do not fabricate citations or claim live research if retrieval is unavailable.

## Calendar & Planner MVP
- Monthly/weekly/daily overview with a lightweight agenda.
- Create/edit/remove personal planning items only within an owner-controlled workspace; no external calendar synchronization in MVP.
- Fields: title, start/end date and time, category, notes, optional linked task, reminder preference.
- Daily priorities, weekly review, deadline list, conflict warnings.
- Planner Bot initially provides suggestions and draft plans only; it does not execute event changes.
- Personal planning data is isolated from business bots unless explicitly shared by the owner.

## Future connected workflow
- Task/project due dates can be surfaced in Planner without creating duplicate tasks.
- Boss Bot reviews assignment deliverables against acceptance criteria and returns Approved / Needs Changes / Needs Owner Review.
- Approved documents are filed in a Completed Documents Library reusing existing private Document Center storage and Doc Bot filing conventions.
- Work clock supports sign-in, sign-out, break intervals, assignment start/pause/resume/completion, human elapsed time, and corrections with audit history. Bot runtime is tracked separately.
- Secretary Bot reporting pulls only verified completion and time records.

## Security and reliability
- No personal calendar visibility to business bots by default.
- Never expose Supabase secrets or service-role keys to the client.
- Authenticated owner-scoped records; enforce access with RLS, not UI-only filters.
- No destructive document operations or external publishing/sending without owner approval.
- Free-first/Gemini. Paid services and OAuth integrations require explicit approval.
- Small, testable stages with desktop/mobile and refresh-persistence checks.

## First slice / implementation sequencing
1. Inspect current auth, task data, bot chat, private storage, navigation, and package/build setup.
2. Add shared UI foundations for Writing Studio and Planner.
3. Wire the new workspaces into the main navigation.
4. Implement private persistence and safe schema/RLS, after reviewing current live schema and migration state.
5. Add model-backed Writer Bot actions and source-aware research only after the endpoint contract is verified.
6. Add calendar-to-task connections, manager review, completed library, and time tracking in separate testable phases.
