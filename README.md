# Business Command Center

[![Deploy to GitHub Pages](https://github.com/IntegrityRising101/business-command-center/actions/workflows/deploy.yml/badge.svg)](https://github.com/IntegrityRising101/business-command-center/actions/workflows/deploy.yml)

An all-in-one workspace for organizing business projects, content, social media, website updates, and merchandise launches.

**Live application:** https://integrityrising101.github.io/business-command-center/

**Project progress record and development to-do list:** [See completed work, open tasks, and next priorities](docs/PROJECT_PROGRESS.md).

## What It Helps You Organize

- **AI projects:** Keep track of AI-assisted projects, tools, prompts, and where finished content will be used.
- **Social media and website work:** Organize posts, campaigns, website updates, and related deadlines.
- **Merchandise launches:** Plan product ideas, mockups, descriptions, promotions, and launch tasks.
- **Task management:** Move work through a simple Planned, In Progress, and Launched/Done workflow.
- **Priorities and focus:** Use priority indicators, categories, search, and a Focus Today view to decide what needs attention.
- **Bot team roadmap:** Plan a team of friendly task bots led by Boss Bot, with a dedicated Program Manager Bot to help manage the Command Center software itself.

## AI Management Team (Planned)

The planned bot team will have visible roles, assigned work, statuses, due dates, and progress reports:

- **Boss Bot:** Coordinates the team, prioritizes work, tracks milestones, flags blockers, and reports progress.
- **Program Manager Bot:** Oversees the Command Center development backlog, feature requests, bug reports, testing, deployment checks, and dated change records.
- **Tasky:** Tracks assigned tasks, priorities, due dates, and completion.
- **Deadline Bot:** Monitors upcoming and overdue work.
- **Doc Bot:** Helps organize business documents and records.
- **Scout / Brainy:** Research prospects, competitors, business gaps, and opportunities.
- **Maily:** Prepares outreach emails for owner review.
- **Cheer Bot:** Celebrates completed tasks, milestones, streaks, and team accomplishments.

### Program Manager Bot permissions

The owner has approved limited automatic repair authority for basic, low-risk fixes, such as clear spelling/text corrections, known broken links, minor display issues, and straightforward code fixes. Each repair must be logged and tested.

Program Manager Bot must request approval before major code changes, database or Supabase changes, authentication/security or permission changes, paid services or spending, external communications, and significant publishing or deployment actions. If a repair fails or the risk is unclear, it must stop and notify the owner. These are planned permissions; they are not active until implemented and tested.

### Optional premium capabilities

Biweekly competitor and business-gap analysis, prospect discovery, and email outreach are planned as optional paid capabilities. Show estimated costs, usage limits, and third-party fees before activation. Research should produce source-backed findings and reviewable prospect lists. Emails must be drafted for owner approval; do not send without explicit approval.

## Account and Data Setup

The application uses [Supabase](https://supabase.com/) for authentication and connected data services. The project is intended to support individual user accounts.

User data must be protected with Supabase Row Level Security (RLS) policies that restrict each signed-in user to their own records. Keep the Supabase service-role key private; the browser application should use only the project's publishable/anonymous key.

## Technology

- React
- Vite
- Supabase
- Tailwind CSS
- GitHub Pages

## Run Locally

1. Install [Node.js](https://nodejs.org/).
2. Clone this repository and open its folder in a terminal.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env.local` file in the project root with your Supabase project settings:

   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_publishable_or_anon_key
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the local URL printed by Vite in your browser.

## Build

To create a production build:

```bash
npm run build
```

The production files are generated in the `dist` folder.

## Deployment

The `.github/workflows/deploy.yml` workflow builds the application and deploys the `dist` folder to GitHub Pages when changes are pushed to the `main` branch. It can also be started manually from the repository's **Actions** tab.

Add the following GitHub Actions repository secrets before deploying:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Do not commit local environment files or private credentials to the repository.

## Project

Maintained by **Integrity Rising**.

**United by Truth, Driven by Purpose.**
