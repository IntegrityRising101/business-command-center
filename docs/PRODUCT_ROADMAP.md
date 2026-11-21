# Business Command Center — Product & Monetization Roadmap

## Product vision
A simple, mobile-friendly workspace that helps solo entrepreneurs and small organizations organize tasks, projects, goals, marketing, and daily progress in one place.

**Brand:** Integrity Rising Business Command Center  
**Motto:** United by Truth, Driven by Purpose

## Product principles
- Keep the experience easy for first-time and mobile users.
- Protect each user's information with secure accounts and database-level access controls.
- Launch with a small, useful feature set; avoid building too much before validating demand.
- Clearly distinguish free and paid features and disclose pricing before checkout.
- Pricing below is a hypothesis to test, not validated market pricing.

## Proposed offers
### Free Starter
- Basic tasks and priorities
- One workspace
- Simple project tracking
- Daily progress log

### Pro (initial price hypothesis: $9.99/month)
- Unlimited projects and tasks
- Goal and milestone tracking
- Weekly progress summaries
- Marketing/content calendar
- Premium templates and export options

### Lifetime access (initial price hypothesis: $59 one-time)
- Pro features included at purchase (scope and future updates clearly stated)

### Personalized setup service (hypothesis: $49–$199)
- Help users organize their goals, projects, tasks, and launch plan

### Team plans (later)
- Shared workspaces, roles, and team collaboration
- Pricing to be determined after the feature and support costs are understood

## Roadmap
### Phase 1 — Secure foundation (launch blocker)
- [ ] Public landing page explains the product and who it helps
- [ ] Email/password registration, login, logout, and password recovery
- [ ] Each account's records are isolated by user ID
- [ ] Database Row Level Security (RLS) policies protect every user-owned table
- [ ] Cloud sync replaces browser-only persistence
- [ ] Verify data isolation with two separate test accounts
- [ ] Add account/data privacy and basic support information

### Phase 2 — Useful free product
- [ ] Tasks and priorities
- [ ] Project tracking
- [ ] Daily accomplishment log
- [ ] Mobile-friendly layout and accessible controls
- [ ] Starter onboarding and sample data that users can remove

### Phase 3 — Pro features
- [ ] Goals and milestones
- [ ] Weekly review and progress summary
- [ ] Marketing/content calendar
- [ ] Revenue/expense tracking (with clear disclaimer: not accounting/tax advice)
- [ ] Reusable business templates
- [ ] Export/backup

### Phase 4 — Monetization
- [ ] Select payment provider and configure checkout
- [ ] Implement subscription/lifetime purchase entitlement checks
- [ ] Add upgrade page and transparent pricing
- [ ] Add cancellation/refund/help information
- [ ] Test purchase, cancellation, and access changes before launch

### Phase 5 — Launch and validate
- [ ] Invite a small group of beta users
- [ ] Collect feedback and identify usage blockers
- [ ] Test pricing and messaging before committing to a pricing model
- [ ] Publish launch content and product walkthrough
- [ ] Track signup, activation, retention, and conversion (privacy-conscious)

## Security requirements
- Never put a Supabase service-role key in the client app.
- Use only public/anon client keys in frontend build, protected by strict database RLS.
- All user-owned records must include a user ID and policies must require auth.uid() = user_id for access.
- Verify no account can read or change another account's records.
- Avoid collecting unnecessary personal information.

## First next step
Choose whether to use a separate Supabase project for this product or reuse the existing Wellness & Growth App project. Keep the business product data isolated and do not proceed with database setup until the project choice is confirmed.