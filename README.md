# Business Command Center

[![Deploy to GitHub Pages](https://github.com/IntegrityRising101/business-command-center/actions/workflows/deploy.yml/badge.svg)](https://github.com/IntegrityRising101/business-command-center/actions/workflows/deploy.yml)

An all-in-one workspace for organizing business projects, content, social media, website updates, and merchandise launches.

**Live application:** https://integrityrising101.github.io/business-command-center/

## Business Command Center Brand Identity

**Palette:** Navy blue #0B1424 and deep navy panels #172943, silver #C7D0DF, white #E8EDF5, and copper #C47C52 accents.

**Keep the three products visually distinct:**
- Project Haven — purple and lavender, with warm white and soft gold.
- Integrity Rising — The Wellness & Growth App — teal, gold, and white.
- Business Command Center — navy blue, silver, white, and copper.

These are separate product identities; do not merge their codebases, databases, or private user data.

**Central task list:** [Integrity Rising Master Business Task List](docs/MASTER_TASK_LIST.md) — the owner-facing priorities and tasks across all three projects, with completed accomplishments separated from open work.

**Detailed progress history:** [Project progress record](docs/PROJECT_PROGRESS.md).

## What It Helps You Organize
- **AI projects:** Track AI-assisted projects, tools, prompts, and where finished content will be used.
- **Social media and website work:** Organize posts, campaigns, updates, and deadlines.
- **Merchandise launches:** Plan ideas, mockups, descriptions, promotions, and launch tasks.
- **Task management:** Move work through Planned, In Progress, and Launched/Done.
- **Priorities and focus:** Use priority indicators, categories, search, and Focus Today.
- **Bot team roadmap:** Plan friendly task bots led by Boss Bot, plus a Program Manager Bot for software operations.

## AI Management Team (Planned)
- **Boss Bot:** Coordinates the team, prioritizes work, tracks milestones, flags blockers, and reports progress.
- **Program Manager Bot:** Oversees development tasks, bug reports, testing, deployment checks, and change records.
- **Tasky:** Tracks assignments, priorities, due dates, and completion.
- **Deadline Bot:** Monitors upcoming and overdue work.
- **Doc Bot:** Organizes business documents and records. The Document Center includes owner-controlled automatic filing suggestions based on filenames and file types, a Needs Review folder for uncertain matches, and explicit move controls. Doc Bot never deletes files.
- **Scout:** Researches prospects, competitors, business gaps, and opportunities.
- **Brainy:** Provides business analysis and source-grounded reporting.
- **Maily:** Prepares outreach emails for owner review.
- **Cheer Bot:** Celebrates tasks, milestones, streaks, and team accomplishments.

### Program Manager Bot permissions
The owner has approved limited automatic repair authority for basic, low-risk fixes, such as clear spelling/text corrections, known broken links, minor display issues, and straightforward code fixes. Each repair must be logged and tested.

Approval is required before major code changes, database or Supabase changes, authentication/security or permission changes, paid services or spending, external communications, and significant publishing or deployment actions. If a repair fails or risk is unclear, the bot must stop and notify the owner. These permissions apply to implemented features; planned features remain inactive until built and tested.

### Company rules and bot permissions (Planned)
Each business will have one **Master Company Rulebook** and may create separate department rulebooks for Marketing, Finance, Customer Service, HR, and custom departments. Owners can start with editable templates, write rules from scratch, or combine both approaches.

Owners control which bots they use, what information each bot can access, which tasks it can complete independently, and which actions require approval. Bots follow the approved business plan, stop and report conflicting instructions, and keep an auditable record of important actions and approvals.

See the complete [Business Rules, Department Rulebooks & Bot Permissions specification](docs/BUSINESS_RULES_AND_BOT_PERMISSIONS_SPEC.md). This is an approved product specification, not a claim that the controls are already implemented.

### Optional premium capabilities
Competitor and business-gap analysis, prospect discovery, and email outreach are planned as optional paid capabilities. Show estimated costs, usage limits, and third-party fees before activation. Research must provide source-backed findings. Emails must be drafted for owner approval; do not send without explicit approval.

## Accounts, privacy, and data
The application uses [Supabase](https://supabase.com/) for authentication and connected data services. User data must be protected with Supabase Row Level Security (RLS). Keep the Supabase service-role key private; the browser application should use only the publishable/anonymous key.

**Multi-business requirement:** Each customer business must have an isolated tenant/workspace. Database and server-side access controls must prevent cross-business data access. A business name or client-side filter is not sufficient security.

## Technology
- React
- Vite
- Supabase
- Tailwind CSS
- GitHub Pages

## Run locally
1. Install [Node.js](https://nodejs.org/).
2. Clone this repository and open its folder in a terminal.
3. Install dependencies with npm install.
4. Create a .env.local file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
5. Run npm run dev and open the local URL printed by Vite.

## Build
Run npm run build. Production files are generated in the dist folder.

## Deployment
The .github/workflows/deploy.yml workflow builds the application and deploys dist to GitHub Pages when changes are pushed to main. It can also be started manually from the repository Actions tab.

Required GitHub Actions repository secrets:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

Do not commit local environment files or private credentials.

## Project
Maintained by **Integrity Rising**.

**United by Truth, Driven by Purpose.**


## Bot chat foundation
Individual bot conversations, a shared Team Inbox, and owner-approved memory are being introduced in the current development branch. The Supabase migration and required setup, privacy notes, limitations, and verification checklist are documented in [Bot Chat, Team Inbox, and Owner-Approved Memory](docs/BOT_CHAT_TEAM_MEMORY.md). This MVP uses local rule-based starter replies; it is not yet connected to a generative AI provider or independent background agents.


## Live GPT Chat
Bot Team chat uses a secure Supabase Edge Function. See [docs/LIVE_GPT_CHAT.md](docs/LIVE_GPT_CHAT.md). Store the OpenAI API key only as a Supabase Function secret.
