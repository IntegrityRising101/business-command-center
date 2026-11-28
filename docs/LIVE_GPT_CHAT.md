# Gemini Chat (Free-Tier Setup)

The Business Command Center's live bot chat uses **Google Gemini only**. There is no OpenAI dependency and no paid fallback. The rule-based bot workspace reports remain available if Gemini is unavailable or its free quota is reached.

## One source of truth — current implementation

- Frontend: `src/components/BotChat.jsx`.
- Frontend function call: `supabase.functions.invoke('integrity-bot-chat', ...)`.
- Edge Function source: `supabase/functions/integrity-bot-chat/index.ts`.
- Required function slug: **`integrity-bot-chat`**.
- Provider: Google Gemini API.
- Secret accepted by the current function: **`GEMINI_API_KEY`** (preferred) or the existing case-sensitive legacy name `Gemini_API_Key`.
- Tracked GitHub source currently names `gemini-3.5-flash-lite`, but the deployed Supabase version 7 source retrieved on November 28, 2026 uses `gemini-3.8-flash`. This is deployment drift. Reconcile the intended model before deploying function code; do not overwrite the live function from stale source.

Do not create another function named `super-api` or `gpt-chat` for this current implementation. The current BotChat component does not call either endpoint. A log entry for `/functions/v1/super-api` is from a different/older caller or a manual request; it does not show that `integrity-bot-chat` was reached.

## Authentication flow

The browser must have an active Supabase user session. BotChat obtains the current session access token and sends it as:

```http
Authorization: Bearer <signed-in-user-access-token>
```

The function validates that token with Supabase Auth, checks that the conversation belongs to that user, and queries only that user's chat history and approved memories. Never use the publishable/anon API key as the bearer token. The publishable key belongs in the `apikey` header; the user JWT belongs in `Authorization`.

## Configure the Gemini secret

In the **Business Command Center's own Supabase project** → **Edge Functions** → **Secrets**:

1. Keep one Gemini key secret named `GEMINI_API_KEY` (recommended). The current code also supports `Gemini_API_Key` for backward compatibility.
2. Store the Gemini key as the secret value. Never put it in GitHub source, Vite/browser code, a public website, or chat.
3. Do not create user-defined `SUPABASE_*` secrets. Supabase provides the project URL and API-key environment values to Edge Functions.

The function uses `SUPABASE_URL` and the Supabase publishable-key map, with a legacy anon-key fallback in the current source.

## Deploy the Edge Function

Deploy the function separately from GitHub Pages. GitHub Pages builds/deploys the browser app; it does **not** deploy Supabase Edge Functions.

From the repository root, linked to the correct Business Command Center Supabase project:

```bash
supabase functions deploy integrity-bot-chat
```

Do not deploy `gpt-chat` or `super-api` for the current frontend source.

## Interpret errors correctly

- `GET /functions/v1/super-api` is not the current BotChat request. The current BotChat call is a **POST** to `/functions/v1/gemini-chat`.
- `Please sign in again.` is returned when the function handler receives no `Authorization: Bearer ...` header.
- `Sign-in could not be verified.` means the supplied bearer token could not be validated by Supabase Auth.
- `Conversation not found or access denied.` means the conversation ID is not owned by the authenticated user, or the row is not visible under RLS.
- `AI service configuration is incomplete.` is a function-secret/environment configuration problem, not a sign-in problem.
- HTTP 429 from Gemini means its free-tier quota/rate limit has been reached. There is no paid AI fallback.

## Verification checklist

- [ ] Confirm the live app is the latest build containing the `integrity-bot-chat` invocation.
- [ ] Confirm `integrity-bot-chat` is deployed in the same Supabase project whose URL is used by the app.
- [ ] Confirm a signed-in message creates a **POST** request to `/functions/v1/gemini-chat`, not `super-api`.
- [ ] Confirm the request carries the signed-in user's access token in the Authorization bearer header.
- [ ] Test one signed-in message in each bot chat and Team Inbox.
- [ ] Refresh and confirm conversation history persists.
- [ ] Confirm pending memory is excluded and approved memory is included.
- [ ] Test Gemini quota/error handling and cross-account isolation.
- [ ] Confirm rule-based workspace reports remain available when Gemini is unavailable.

Do not expose API keys, access tokens, or full Authorization headers in screenshots, logs, issues, or chat.
