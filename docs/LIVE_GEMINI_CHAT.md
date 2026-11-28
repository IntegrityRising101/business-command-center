# Gemini Chat (Free-Tier Setup)

The Business Command Center bot chat uses **Google Gemini only**. There is no OpenAI dependency and no paid fallback. The nine Bot Team workspaces retain their rule-based reports if Gemini is unavailable or its free quota is reached.

## What the current repository code uses

- Frontend: `src/components/BotChat.jsx` calls `supabase.functions.invoke('integrity-bot-chat', ...)`.
- Edge Function: `supabase/functions/integrity-bot-chat/index.ts`.
- Provider: Gemini API, using `GEMINI_API_KEY` as a server-side Supabase Function Secret.
- Tracked GitHub source currently names `gemini-3.5-flash-lite`, but the deployed Supabase version 7 source retrieved on November 28, 2026 uses `gemini-3.8-flash`. This is deployment drift. Reconcile the intended model before deploying function code; do not overwrite the live function from stale source.
- Supabase automatically supplies `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEYS`; the function reads the `default` publishable key and forwards the signed-in user's bearer token so Row Level Security remains in effect.
- The function calls `auth.getUser()`, checks conversation ownership, and queries only the signed-in owner's messages and approved memories.

## Configure the Gemini secret

In the Supabase Dashboard for the **Business Command Center's own Supabase project**:

1. Open **Edge Functions → Secrets**.
2. Add a secret named `GEMINI_API_KEY`.
3. Paste the Gemini API key as its value and save.
4. Never put the key in GitHub, React/Vite code, a public website, or a chat message.

No user-created `SUPABASE_*` secret is needed. Supabase injects its project URL and API key variables.

## Deploy the correct Edge Function

From the repository root, after linking the Supabase CLI to the Business Command Center project:

```bash
supabase functions deploy integrity-bot-chat
```

GitHub Pages deployment does **not** deploy Supabase Edge Functions. The app's current source invokes `/functions/v1/integrity-bot-chat`. Do not deploy `gemini-chat` or `gpt-chat`, or troubleshoot `super-api`, as though any were the endpoint invoked by the current `BotChat.jsx` source.

## Latest live diagnostic — November 27, 2026

- Supplied Supabase logs show a `POST | 401` for `/functions/v1/super-api`.
- The supplied diagnostic showed `auth_user: null` and no corresponding function-handler logs. This is consistent with rejection before the handler, such as platform JWT verification, but does not independently prove the exact cause.
- **Important endpoint mismatch:** `super-api` is not the function name invoked by the current repository's `BotChat.jsx`; the current source invokes `gemini-chat`. Therefore the `super-api` 401 does not establish that the current Gemini chat function is failing.
- Next verification: inspect the browser Network request from the current deployed app and confirm whether it calls `/functions/v1/gemini-chat`. Then inspect that exact function's logs.
- For a signed-in user call, `Authorization` must contain the current Supabase user access token (`Bearer <user JWT>`); the publishable key belongs in the `apikey` header. Do not put a Supabase publishable/secret API key in the bearer-token position. Keep JWT verification enabled for this signed-in user function unless the authentication design is deliberately changed and separately secured.
- If the current app really sends a request to `gemini-chat` and that request gets 401, capture its request headers with all secret values redacted and inspect the exact `gemini-chat` function logs before changing code or secrets.

## Free-tier and privacy behavior

- Gemini free-tier access is subject to model availability, rate limits, and daily quotas; it is not unlimited.
- When Gemini returns HTTP 429, the app should show a clear quota message. It must not switch to OpenAI or any paid provider.
- Pending memory suggestions are not sent as approved memory context.
- The function has no tools to move files, change tasks, publish, send email, spend money, change permissions, or deploy code.
- Avoid placing highly sensitive personal or health information in AI chats.

## Verification checklist

- [ ] Confirm `GEMINI_API_KEY` exists in the Business Command Center Supabase project's Function Secrets (never reveal its value).
- [ ] Confirm the deployed app calls `/functions/v1/integrity-bot-chat`, matching `src/components/BotChat.jsx`.
- [ ] Confirm `integrity-bot-chat` is deployed to that same Supabase project.
- [ ] Inspect the exact `gemini-chat` request and function logs; do not use the old `super-api` log as proof of a Gemini failure.
- [ ] Test one signed-in message in each of the nine bot chats and in Team Inbox.
- [ ] Confirm each bot responds with its own specialty.
- [ ] Refresh and confirm chat history persists.
- [ ] Confirm pending memory is excluded and approved memory is included.
- [ ] Test Gemini quota/error handling and cross-account isolation.
- [ ] Confirm rule-based workspace reports remain available when Gemini is unavailable.

**Cost guardrail:** Gemini free-tier only. No OpenAI, no paid fallback, no purchase, and no billing changes. Supabase keys remain platform-injected; the Gemini key remains server-side in Supabase Function Secrets.
