# Live GPT Chat

## Deploy
1. Install Supabase CLI, sign in, and link this repository to the correct Supabase project.
2. From the repository root run `supabase functions deploy gpt-chat`.
3. Add the OpenAI key as a server-side secret: `supabase secrets set OPENAI_API_KEY=YOUR_OPENAI_API_KEY`.
4. Optional: `supabase secrets set OPENAI_MODEL=gpt-4o-mini` (the function defaults to this model).
5. Test from the live signed-in app.

Supabase provides SUPABASE_URL and SUPABASE_ANON_KEY to the Edge Function. Do not add a service-role key. The function verifies the user's session and conversation ownership and uses owner-scoped RLS.

## Cost and privacy
OpenAI API billing is separate from ChatGPT subscriptions. Check current API pricing and set usage limits/budget alerts. The function sends recent chat messages and approved memory notes to OpenAI to generate responses. Avoid entering sensitive information unless comfortable sharing it with the API provider. Keep the API key only in Supabase Function secrets, never in frontend code, GitHub Pages or browser storage. GPT has no tools here and cannot itself move/delete files, publish, send, spend or deploy.

## Verification checklist
- [ ] Deploy function and set OPENAI_API_KEY.
- [ ] Test live GPT response and follow-up context.
- [ ] Refresh and confirm conversation persistence.
- [ ] Test specialist bots and Team Inbox.
- [ ] Confirm pending memory is excluded and approved memory is included.
- [ ] Test errors and cross-account isolation.
