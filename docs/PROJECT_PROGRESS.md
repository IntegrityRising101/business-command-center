# Integrity Rising — Project Progress Record

Last updated: November 21, 2026

This record keeps the two related but separate projects organized. The Business Command Center is the internal business/work management tool. The Integrity Rising Wellness & Growth App is the community-facing wellness platform.

---

## 1. Business Command Center

**Repository:** https://github.com/IntegrityRising101/business-command-center  
**Live app:** https://integrityrising101.github.io/business-command-center/  
**Local development address used:** http://localhost:3000

### Completed

- Created the Business Command Center repository and React/Vite application foundation.
- Set up the main dashboard and work-management structure, including project areas, a Kanban-style task workflow, priorities, search/filtering, and a Focus Today area.
- Added quick links and a daily accomplishment/log area in the command-center structure.
- Configured Supabase as the backend/authentication service.
- Created a new Supabase project for this application.
- Added the required Supabase project URL and public anon key as GitHub Actions repository secrets (secret values are intentionally not recorded here).
- Configured the GitHub Pages deployment workflow in .github/workflows/deploy.yml.
- Fixed deployment blockers: corrected the index.html document structure, added the required public/ directory, and removed the invalid standalone Cache.yml workflow.
- Confirmed a successful GitHub Actions deployment on November 21, 2026. The build and deploy jobs completed successfully (run 44934799698).
- Confirmed the local app opens, the sign-in screen appears, and the user was able to log in.
- Cleaned up the duplicate and inaccurate README content and documented setup, build, deployment, Supabase configuration, and security notes. README cleanup commit: 86f709f29de291f69c6288696e297283716b5b8c.

### Remaining / verify next

- Verify the live GitHub Pages app displays the newest version and that sign-in works there, not only locally.
- Verify Supabase Row Level Security (RLS) policies for every user-owned table so each public user can access only their own records. Do not advertise full user-data separation until this is tested.
- Confirm task, project, and daily accomplishment data persists in Supabase across devices and sessions; browser-only storage does not provide cross-device sync.
- Build out and verify the central project register, business document center, and durable accomplishment history.
- Finish the public-user onboarding and test a separate account end-to-end.
- Decide and implement pricing/monetization only after core account separation and persistence are verified.

---

## 2. Integrity Rising — The Wellness & Growth App

**Repository:** https://github.com/IntegrityRising101/Integrity-Rising-wellness-growth-app  
**Live app:** https://integrityrising101.github.io/Integrity-Rising-wellness-growth-app/

### Completed / reported working

- Established the app as a separate community-facing wellness and mental-health support product, not part of the Business Command Center.
- Chosen app name: **Integrity Rising — The Wellness & Growth App**.
- Established the brand direction: professional, easy navigation, teal and gold; “United by Truth, Driven by Purpose.”
- Organized the main areas: Dashboard, Wellness & AI, Community, Academy, and Safety & Support.
- Added the “Four Practices for Your Well-Being” section and confirmed it was visible and working:
  - Values-Based Action
  - Reframe a Thought
  - 5-4-3-2-1 Grounding
  - Self-Compassion Pause
- Added AI Hub references to independent AI services (Meta, Muse, Grok, Manus, GPT, DeepSeek, and Gemini); the intention is to link out to independent services rather than connect users’ private accounts.
- Confirmed the app had a successful deployment and was working after reload.
- Configured Supabase authentication and profile infrastructure.
- Created/used the profiles table with profile fields including id, display_name, bio, created_at, and updated_at.
- Added the profiles_set_updated_at trigger.
- Set up profile policies for signed-in members to create and update their own profile and for signed-in members to view profiles, as previously reported.
- User reported the Supabase setup as green.

### Remaining / verify next

- Re-test sign-up, sign-in, sign-out, password recovery, and expired email-link handling.
- Confirm profile creation and updates work for a new account.
- Audit Row Level Security on all tables, not only profiles, before inviting the public.
- Keep Quick Exit limited to Safety / domestic-abuse support pages, as requested.
- Refine the Community landing sequence: “Ready to Connect,” “You Belong Here,” Welcome Guide, then community chat rooms.
- Verify the home screen hierarchy so sign-in appears first and the welcome content follows it; verify the Home and Quick Access behavior.
- Continue building and testing wellness, AI, academy, community, and safety resources.

---

## 3. Shared brand and operating standards

- Organization / brand: **Integrity Rising — The Integrity Movement**.
- Motto: **United by Truth, Driven by Purpose**.
- Keep the Business Command Center and Wellness & Growth App as separate products with separate repositories, data, and user experiences.
- Use clear dated task tracking and record completed work at the end of each work session.
- Never put passwords, API keys, access tokens, service-role keys, or other credentials in this document, source code, screenshots, or public repository files.
- For public access, use Supabase Row Level Security and test with separate accounts before claiming that user data is isolated.

## 4. Current priority order

1. Confirm both live apps load the latest successful deployments.
2. Finish and test authentication and per-user data protection.
3. Complete the Command Center's durable project/task/accomplishment records.
4. Finish the Wellness App's requested home and community navigation refinements.
5. Organize business documents and launch materials.
6. Plan monetization and public launch after security and persistence tests pass.
