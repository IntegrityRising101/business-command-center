# Gemini Chat (Free-Tier Setup)

The Business Command Center chat uses **Google Gemini only**. There is no OpenAI dependency and no paid fallback. The nine Bot Team workspaces still have their rule-based reports if Gemini is unavailable or its free quota is reached.

## What the code currently uses

- Frontend invokes the existing Supabase Edge Function named `gpt-chat` from `src/components/BotChat.jsx`. The function slug is retained for compatibility; it does not mean the provider is GPT.
- Server function: `supabase/functions/gpt-chat/index.ts`.
- Provider: Gemini API, using `GEMINI_API_KEY` as a server-side Supabase Function Secret.
- Default model: `gemini-3.5-flash-lite`. The model can be overridden with `GEMINI_MODEL`, but do not choose a paid-only model.
- Supabase automatically supplies `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEYS`; the function reads the `default` publishable key and uses the signed-in user's bearer token so Row Level Security remains in effect.

## Configure the secret

In the Supabase Dashboard for the **Business Command Center's own Supabase project**:

1. Open **Edge Functions → Secrets**.
2. Add a secret named `GEMINI_API_KEY`.
3. Paste the Gemini API key as its value and save.
4. Do not put the key in GitHub, React/Vite code, a public website, or a chat message.

No user-created `SUPABASE_*` secret is needed. Supabase reserves that prefix and injects its own project URL and API key variables.

## Deploy the Edge Function

From the repository root, after linking the Supabase CLI to the Business Command Center project:

```bash
supabase functions deploy gpt-chat
```

GitHub Pages deployment does **not** deploy Supabase Edge Functions. Deploying this function is a separate step. The app invokes `/functions/v1/gpt-chat`; older logs showing `/functions/v1/super-api` indicate a different or older deployed endpoint and do not prove this function was called.

## Free-tier and privacy behavior

- Gemini free-tier access is subject to model availability, rate limits, and daily quotas. It is not unlimited.
- When Gemini returns HTTP 429, the app should show a clear quota message. It must not switch to OpenAI or any paid provider.
- The function reads only the signed-in owner's conversation and approved memory, checks conversation ownership, and uses the user's authorization token with Supabase Row Level Security.
- Pending memory suggestions are not sent as approved memory context.
- The function has no tools to move files, change tasks, publish, send email, spend money, change permissions, or deploy code.
- Avoid placing highly sensitive personal or health information in AI chats.

## Verification checklist

- [ ] Confirm `GEMINI_API_KEY` exists in the Business Command Center Supabase project's Function Secrets (never reveal its value).
- [ ] Deploy `gpt-chat` to that same project.
- [ ] Confirm the live app request and Supabase logs show `/functions/v1/gpt-chat`, not the old `super-api` endpoint.
- [ ] Test one signed-in message in each of the nine bot chats and in Team Inbox.
- [ ] Confirm each bot responds with its own specialty.
- [ ] Refresh and confirm chat history persists.
- [ ] Confirm pending memory is excluded and approved memory is included.
- [ ] Test Gemini quota/error handling and cross-account isolation.
- [ ] Confirm rule-based workspace reports remain available when Gemini is unavailable.
