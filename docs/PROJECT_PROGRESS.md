# Integrity Rising — Project Progress Record

Last updated: November 21, 2026

This record keeps the two related but separate products organized. The Business Command Center is the internal business/work management tool. The Integrity Rising Wellness & Growth App is the community-facing wellness platform.

---

## 1. Business Command Center

**Repository:** https://github.com/IntegrityRising101/business-command-center  
**Live app:** https://integrityrising101.github.io/business-command-center/  
**Local development address used:** http://localhost:3000

### Completed

- Created the Business Command Center repository and React/Vite application foundation.
- Set up the main dashboard and work-management structure, including project areas, a Kanban-style task workflow, priorities, search/filtering, and a Focus Today area.
- Added quick links and a daily accomplishment/log area in the command-center structure.
- Configured Supabase as the backend/authentication service and created a separate Supabase project for this application.
- Added the required Supabase project URL and public anon key as GitHub Actions repository secrets (secret values are intentionally not recorded here).
- Configured the GitHub Pages deployment workflow in .github/workflows/deploy.yml.
- Fixed deployment blockers: corrected the index.html document structure, added the required public/ directory, and removed the invalid standalone Cache.yml workflow.
- Confirmed a successful GitHub Actions deployment on November 21, 2026. The build and deploy jobs completed successfully (run 44934799698).
- Confirmed the local app opens, the sign-in screen appears, and the user was able to log in.
- Cleaned up the duplicate and inaccurate README content and documented setup, build, deployment, Supabase configuration, and security notes. README cleanup commit: 86f709f29de291f69c6288696e297283716b5b8c.
- Added this central project progress record for both Integrity Rising apps.
- Recorded Gmail as the selected email provider on November 21, 2026.
- Added a Gmail workspace tab and setup panel to the Command Center UI. It clearly shows that Gmail OAuth is still required and does not claim inbox access is active. The panel includes the selected account, planned workflows, a direct Gmail link, and draft-first/approval-before-send security guidance.

### New requirements requested November 21, 2026

- Add a Books & Publishing workspace to manage both books already published/listed online through Lulu.com:
  - Legacy Within
  - The Architecture Is Yours
- Give each book its own record for Lulu listing URL, publication status, ISBN, edition, trim/format, cover and interior files, manuscript versions, descriptions, pricing, proof/revision notes, marketing assets, sales/royalty tracking, and publishing tasks. Do not invent missing ISBNs, URLs, sales figures, or publication details; fill those in from verified Lulu records.
- Add a Document & Media Center with an upload area, folders, tags, search, preview, download, version history, owner, project association, and created/updated dates.
- Plan support for common business file types: PDF; DOC/DOCX; RTF; TXT/MD; XLS/XLSX/CSV; PPT/PPTX; images such as PNG/JPG/SVG; audio such as MP3/WAV/M4A; and video such as MP4/MOV. Validate file types and size limits, and use appropriate storage for large media.
- Organize the file library by business area and project: Books & Publishing, Business Plans, Legal & Finance, Academy/Courses, Website, Social Media/Marketing, Brand & Design, Audio, Video, and General Operations.
- Plan Google Drive connection for Drive/Docs/Sheets/Slides and Microsoft 365 document access (Word/Excel/PowerPoint via SharePoint/OneDrive for work or school where supported). Also assess Box and Dropbox as optional business storage connections.
- Provide a central place to create, upload, revise, organize, and retrieve documents without treating the Command Center itself as a replacement for Word or Google Docs editing.
- Add an AI Work Center with Meta Muse as a preferred external agent for business tasks, research, files, calendar and email workflows, subject to Muse's available connectors and user-granted permissions. Start with a clearly labeled launch/link and integration assessment; do not claim a direct Muse API integration until one is verified.
- Add an email workspace/assistant for inbox review, search, drafts, follow-ups, contact history, and reminders. The user has an existing Gmail connector available in ChatGPT; Gmail integration in the actual Command Center still requires a separate secure OAuth/API implementation. Outlook can be added if the user uses Microsoft email.
- Require user approval before sending emails, sharing files, publishing book changes, or performing other external actions.

### Remaining / verify next

- Verify the live GitHub Pages app displays the newest version and that sign-in works there, not only locally.
- Verify Supabase Row Level Security (RLS) policies for every user-owned table so each public user can access only their own records. Do not advertise full user-data separation until this is tested.
- Confirm task, project, and daily accomplishment data persists in Supabase across devices and sessions.
- Build out and verify the central project register, business document center, and durable accomplishment history.
- Build Books & Publishing management for Legacy Within and The Architecture Is Yours, then verify each book's Lulu details against the live listings.
- Choose and implement file storage, upload limits, access controls, metadata, preview/download, and version history. Keep large audio/video storage costs and security in view.
- Determine which cloud storage connections to implement first: Google Drive, Microsoft SharePoint/OneDrive for work or school, Box, or Dropbox.
- **Email provider selected November 21, 2026: Gmail**, using the user's Integrity Rising Gmail account. Implement secure Google OAuth with least-privilege scopes, inbox search/read, draft creation, follow-up tracking, and approval-before-send behavior. Do not store Google passwords or OAuth tokens in source code or browser local storage.
- Assess Muse integration options and add an external launch point; only implement direct integration if a supported connector/API becomes available.
- Finish public-user onboarding and test a separate account end-to-end.
- Decide and implement pricing/monetization only after core account separation, file privacy, and persistence are verified.

---

## 2. Integrity Rising — The Wellness & Growth App

**Repository:** https://github.com/IntegrityRising101/Integrity-Rising-wellness-growth-app  
**Live app:** https://integrityrising101.github.io/Integrity-Rising-wellness-growth-app/

### Completed / reported working

- Established the app as a separate community-facing wellness and mental-health support product, not part of the Business Command Center.
- Chosen app name: **Integrity Rising — The Wellness & Growth App**.
- Established the brand direction: professional, easy navigation, teal and gold; “United by Truth, Driven by Purpose.”
- Organized the main areas: Dashboard, Wellness & AI, Community, Academy, and Safety & Support.
- Added the “Four Practices for Your Well-Being” section and confirmed it was visible and working: Values-Based Action; Reframe a Thought; 5-4-3-2-1 Grounding; Self-Compassion Pause.
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
- Require explicit confirmation before sending messages, sharing files externally, or publishing content.

## 4. Updated priority order

1. Verify both live apps and authentication.
2. Complete Business Command Center data persistence and per-user security.
3. Build Books & Publishing management for Legacy Within and The Architecture Is Yours.
4. Build the secure Document & Media Center and choose storage integrations.
5. Add the Gmail email workspace for the selected Integrity Rising account and assess Meta Muse integration.
6. Finish Wellness App home and community navigation refinements.
7. Organize business plans, Academy materials, brand assets, and launch documents.
8. Plan monetization and public launch after security and persistence tests pass.
