# Business Command Center

[![Deploy to GitHub Pages](https://github.com/IntegrityRising101/business-command-center/actions/workflows/deploy.yml/badge.svg)](https://github.com/IntegrityRising101/business-command-center/actions/workflows/deploy.yml)

An all-in-one workspace for organizing business projects, content, social media, website updates, and merchandise launches.

**Live application:** https://integrityrising101.github.io/business-command-center/

## What It Helps You Organize

- **AI projects:** Keep track of AI-assisted projects, tools, prompts, and where finished content will be used.
- **Social media and website work:** Organize posts, campaigns, website updates, and related deadlines.
- **Merchandise launches:** Plan product ideas, mockups, descriptions, promotions, and launch tasks.
- **Task management:** Move work through a simple Planned, In Progress, and Launched/Done workflow.
- **Priorities and focus:** Use priority indicators, categories, search, and a Focus Today view to decide what needs attention.

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
