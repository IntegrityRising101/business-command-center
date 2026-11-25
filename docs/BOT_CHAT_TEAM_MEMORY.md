# Bot Chat, Team Inbox, and Owner-Approved Memory

## What this foundation adds
- A separate persistent conversation for each bot.
- A shared, owner-visible Team Inbox thread.
- Persistent message history stored in Supabase.
- Memory suggestions that start as `pending` and require the owner to approve them.
- Approved memory notes are supplied as guidance to the starter response logic.
- Owners can dismiss pending suggestions or revoke previously approved notes.
- Chat data is protected by per-owner Row Level Security (RLS) policies.

## Required database setup
The application code alone does not create Supabase tables. Before using chat, apply:

`supabase/migrations/20261125_bot_chat_team_memory.sql`

Open the Business Command Center Supabase project → SQL Editor → New query, paste the migration contents, and run it. Confirm the three tables exist:
- `bot_conversations`
- `bot_messages`
- `bot_memories`

The migration enables RLS and limits each table to rows belonging to the signed-in owner. Do not disable RLS or expose the service-role key in the browser.

## Important MVP limitations
- The chat interface persists messages, but it is **not connected to a generative AI model or external AI provider**. Replies are local, rule-based starter responses.
- The Team Inbox is a shared message thread and handoff-planning surface. Independent bots do not yet converse with one another or run background jobs.
- Approved memories are shown to the local starter-response logic as guidance; this is not yet a model-backed adaptive learning system.
- No chat content is sent to a third-party AI provider in this MVP.
- Task execution, external communication, publishing, deployment, spending, and permission changes are not authorized by chat.

## Verification checklist
1. Apply the migration in Supabase.
2. Sign in to the Command Center and open Bot Team.
3. Open two different bot profiles; send a message in each and confirm their histories remain separate after refresh.
4. Open Team Inbox and send a message; confirm it remains in the Team Inbox thread.
5. Submit a message as a memory suggestion; confirm it appears under Pending Approval.
6. Approve the note; confirm it appears under Approved Memories and is included in subsequent starter responses for that bot.
7. Revoke the note; confirm it no longer appears as approved guidance.
8. Test with a second account and confirm it cannot read the first account's conversations, messages, or memories.
9. Test Android and desktop layouts.

Do not call the feature production-ready until database setup, cross-account isolation, and mobile/desktop checks pass.
